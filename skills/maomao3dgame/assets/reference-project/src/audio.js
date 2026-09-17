// Original synthesized island music and kart audio. Nothing is fetched or played
// before a real interaction. AudioBufferSources are single-use WebAudio nodes;
// reusable gain/pan voice strips enforce a hard limit on simultaneous sources.
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const finite = (n, fallback = 0) => Number.isFinite(n) ? n : fallback;
const TAU = Math.PI * 2;
const MASTER_LEVEL = 0.32;
const MUSIC_VOICES = 16;
const SFX_VOICES = 10;
const STEP_SECONDS = 60 / 88 / 2;
const LOOKAHEAD = 0.16;
const MELODY = [
  76, 0, 79, 76, 74, 0, 72, 0,
  69, 0, 72, 74, 76, 0, 72, 0,
  74, 0, 76, 79, 76, 74, 72, 0,
  69, 72, 0, 67, 0, 69, 72, 0,
  79, 0, 81, 79, 76, 0, 74, 0,
  76, 74, 72, 0, 69, 0, 67, 0,
  72, 0, 74, 76, 79, 0, 76, 74,
  72, 0, 69, 67, 0, 69, 72, 0,
];
// All pitch classes stay in C-major pentatonic (C, D, E, G, A).
const HARMONIES = [
  [48, 60, 64, 69], [45, 57, 60, 67],
  [48, 55, 62, 64], [43, 55, 60, 62],
];

function makeRandom(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296 * 2 - 1;
  };
}

/**
 * unlock(): Promise<boolean> — invoke from pointer/key/touch interaction.
 * update(snapshot, dt): snapshot is the simulation getSnapshot(), dt in seconds.
 * event({type, ...}): countdown/go/coin/item/boost/drift/lap/finish/hit.
 * setMuted(boolean), dispose(). Safe when WebAudio or a browser is unavailable.
 */
export function createAudio() {
  const host = typeof window !== 'undefined' ? window : null;
  const doc = typeof document !== 'undefined' ? document : null;
  let context = null;
  let graph = null;
  let muted = false;
  let disposed = false;
  let unlocked = false;
  let unlockPending = null;
  let timer = null;
  let step = 0;
  let nextStepAt = 0;
  let lastUpdateAt = -Infinity;
  let lastPhase = 'menu';
  let lastCoinAt = -Infinity;
  let coinRun = 0;
  let latestSnapshot = null;
  const buffers = new Map();
  const nodes = [];
  const persistentSources = [];
  const voices = [];
  const cooldowns = new Map();
  const pendingEvents = [];

  const remember = (node) => { nodes.push(node); return node; };
  const wallTime = () => typeof performance !== 'undefined' ? performance.now() / 1000 : Date.now() / 1000;

  function gain(value, destination) {
    const node = remember(context.createGain());
    node.gain.value = value;
    if (destination) node.connect(destination);
    return node;
  }

  function filter(type, frequency, q, destination) {
    const node = remember(context.createBiquadFilter());
    node.type = type;
    node.frequency.value = frequency;
    node.Q.value = q;
    if (destination) node.connect(destination);
    return node;
  }

  function smooth(param, value, seconds = 0.08) {
    if (!context || !param) return;
    const now = context.currentTime;
    param.cancelScheduledValues(now);
    param.setTargetAtTime(value, now, seconds);
  }

  function stopSource(source) {
    if (!source) return;
    source.onended = null;
    try { source.stop(); } catch { /* An ended source is already silent. */ }
    try { source.disconnect(); } catch { /* Idempotent cleanup. */ }
  }

  function releaseVoice(voice) {
    stopSource(voice.source);
    voice.source = null;
    voice.endsAt = 0;
    voice.priority = -Infinity;
    if (context && context.state !== 'closed') {
      voice.gain.gain.cancelScheduledValues(context.currentTime);
      voice.gain.gain.setValueAtTime(0, context.currentTime);
    }
  }

  function silenceVoices() {
    for (const voice of voices) releaseVoice(voice);
  }

  function buffer(key, duration, fill, channels = 1) {
    if (buffers.has(key)) return buffers.get(key);
    const result = context.createBuffer(channels,
      Math.ceil(duration * context.sampleRate), context.sampleRate);
    for (let channel = 0; channel < channels; channel++) {
      fill(result.getChannelData(channel), context.sampleRate, channel);
    }
    buffers.set(key, result);
    return result;
  }

  function pluck(midi) {
    return buffer(`pluck-${midi}`, 1.65, (data, sampleRate) => {
      const random = makeRandom(71417 + midi * 319);
      const frequency = 440 * Math.pow(2, (midi - 69) / 12);
      // Fractional-delay Karplus–Strong keeps the upper pentatonic notes in tune.
      const delay = sampleRate / frequency - 0.5;
      const period = Math.floor(delay);
      const fraction = delay - period;
      const ring = new Float32Array(period + 2);
      for (let i = 0; i < ring.length; i++) {
        ring[i] = random() * 0.65 + Math.sin(TAU * i / period) * 0.35;
      }
      let previous = 0;
      let peak = 0;
      for (let i = 0; i < data.length; i++) {
        const index = i % ring.length;
        const read = (index - period + ring.length) % ring.length;
        const older = (read - 1 + ring.length) % ring.length;
        const excitation = i < ring.length ? ring[index]
          : ring[read] * (1 - fraction) + ring[older] * fraction;
        const sample = (excitation + previous) * 0.4987;
        previous = excitation;
        ring[index] = sample;
        const t = i / sampleRate;
        const envelope = Math.min(1, t / 0.003) * Math.exp(-t * 1.35)
          * Math.min(1, (data.length - i) / (sampleRate * 0.07));
        // A quiet sine body makes the instrument rounded rather than metallic.
        data[i] = (sample + Math.sin(TAU * frequency * t) * Math.exp(-t * 10) * 0.07) * envelope;
        peak = Math.max(peak, Math.abs(data[i]));
      }
      const normalization = 0.78 / Math.max(peak, 0.01);
      for (let i = 0; i < data.length; i++) data[i] *= normalization;
    });
  }

  function percussion(kind) {
    const duration = kind === 'kick' ? 0.28 : kind === 'rim' ? 0.12 : 0.11;
    return buffer(kind, duration, (data, sampleRate) => {
      const random = makeRandom(kind === 'kick' ? 701 : kind === 'rim' ? 907 : 1201);
      let phase = 0;
      let previousNoise = 0;
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        const noise = random();
        const attack = Math.min(1, t / 0.002);
        if (kind === 'kick') {
          phase += TAU * (65 + 67 * Math.exp(-t * 38)) / sampleRate;
          data[i] = Math.sin(phase) * Math.exp(-t * 19) * attack * 0.72;
        } else if (kind === 'rim') {
          data[i] = (Math.sin(TAU * 470 * t) * 0.5 + Math.sin(TAU * 730 * t) * 0.2
            + noise * 0.16) * Math.exp(-t * 48) * attack;
        } else {
          data[i] = (noise - previousNoise) * 0.23 * Math.exp(-t * 40) * attack;
        }
        previousNoise = noise;
      }
    });
  }

  function noiseBuffer() {
    return buffer('surf-loop', 3, (data, sampleRate, channel) => {
      const random = makeRandom(49313 + channel * 9007);
      let low = 0;
      let lower = 0;
      for (let i = 0; i < data.length; i++) {
        low = low * 0.86 + random() * 0.14;
        lower = lower * 0.985 + low * 0.015;
        data[i] = low * 0.8 + lower * 1.5;
      }
      // Crossfade the join without making a repetitive silence in the surf.
      const crossfade = Math.floor(sampleRate * 0.12);
      for (let i = 0; i < crossfade; i++) {
        const mix = i / crossfade;
        const tail = data.length - crossfade + i;
        data[tail] = data[tail] * (1 - mix) + data[i] * mix;
      }
    }, 2);
  }

  function tone(key, duration, from, to, harmonics = false) {
    return buffer(key, duration, (data, sampleRate) => {
      let phase = 0;
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        const progress = t / duration;
        phase += TAU * (from * Math.pow(to / from, progress)) / sampleRate;
        const envelope = Math.min(1, t / 0.005) * Math.pow(1 - progress, 1.55);
        data[i] = (Math.sin(phase) * 0.7 + (harmonics ? Math.sin(phase * 2) * 0.13 : 0)) * envelope;
      }
    });
  }

  function whoosh() {
    return buffer('boost-whoosh', 0.65, (data, sampleRate) => {
      const random = makeRandom(851111);
      let low = 0;
      let phase = 0;
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        const progress = t / 0.65;
        low = low * 0.78 + random() * 0.22;
        phase += TAU * (180 + progress * 350) / sampleRate;
        data[i] = (low * 1.2 + Math.sin(phase) * 0.08)
          * Math.sin(Math.PI * progress) * Math.pow(1 - progress, 0.65);
      }
    });
  }

  function buildGraph() {
    const master = gain(0);
    const limiter = remember(context.createDynamicsCompressor());
    limiter.threshold.value = -16;
    limiter.knee.value = 18;
    limiter.ratio.value = 5;
    limiter.attack.value = 0.004;
    limiter.release.value = 0.22;
    master.connect(limiter);
    limiter.connect(context.destination);
    const music = gain(0.42, master);
    const sfx = gain(0.58, master);
    const vehicle = gain(0.26, master);
    const ambience = gain(0.18, master);
    const engineGain = gain(0, vehicle);
    const engineFilter = filter('lowpass', 390, 0.35, engineGain);
    const engine1 = remember(context.createOscillator());
    engine1.type = 'triangle'; engine1.frequency.value = 48;
    engine1.connect(gain(0.58, engineFilter));
    const engine2 = remember(context.createOscillator());
    engine2.type = 'triangle'; engine2.frequency.value = 96.6;
    engine2.connect(gain(0.16, engineFilter));
    const driftGain = gain(0, vehicle);
    const driftFilter = filter('bandpass', 1500, 0.65, driftGain);
    const driftToneGain = gain(0, vehicle);
    const driftTone = remember(context.createOscillator());
    driftTone.type = 'sine'; driftTone.frequency.value = 660;
    driftTone.connect(driftToneGain);
    const boostGain = gain(0, vehicle);
    const boostFilter = filter('highpass', 850, 0.5, boostGain);
    const roadNoise = remember(context.createBufferSource());
    roadNoise.buffer = noiseBuffer(); roadNoise.loop = true;
    roadNoise.loopStart = 0.12; roadNoise.loopEnd = 3;
    roadNoise.connect(driftFilter); roadNoise.connect(boostFilter);
    const surfGain = gain(0.28, ambience);
    const surfFilter = filter('lowpass', 850, 0.45, surfGain);
    const surfHighPass = filter('highpass', 90, 0.5, surfFilter);
    const surf = remember(context.createBufferSource());
    surf.buffer = noiseBuffer(); surf.loop = true;
    surf.loopStart = 0.12; surf.loopEnd = 3;
    surf.connect(surfHighPass);
    for (const source of [engine1, engine2, driftTone, roadNoise, surf]) {
      persistentSources.push(source);
      source.start();
    }
    for (let i = 0; i < MUSIC_VOICES + SFX_VOICES; i++) {
      const kind = i < MUSIC_VOICES ? 'music' : 'sfx';
      const destination = kind === 'music' ? music : sfx;
      const envelope = gain(0);
      const pan = typeof context.createStereoPanner === 'function'
        ? remember(context.createStereoPanner()) : null;
      if (pan) { envelope.connect(pan); pan.connect(destination); }
      else envelope.connect(destination);
      voices.push({ kind, gain: envelope, pan, source: null, endsAt: 0, priority: -Infinity });
    }
    // Warm up the finite instrument bank outside the frame/update path.
    for (const midi of [43, 45, 48, 55, 57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91]) pluck(midi);
    percussion('kick'); percussion('rim'); percussion('shaker'); whoosh();
    tone('tick', 0.15, 660, 660);
    tone('go', 0.43, 880, 1174.66, true);
    tone('hit', 0.22, 130, 58);
    graph = { master, music, sfx, vehicle, ambience, engineGain, engineFilter,
      engine1, engine2, driftGain, driftFilter, driftTone, driftToneGain,
      boostGain, surfGain, surfFilter };
  }

  function play(sound, at, level, duration, kind = 'sfx', pan = 0, priority = 1, rate = 1) {
    if (!context || disposed || muted || context.state !== 'running') return;
    const now = context.currentTime;
    at = Math.max(at, now + 0.004);
    let candidate = null;
    for (const voice of voices) {
      if (voice.kind !== kind) continue;
      if (!voice.source || voice.endsAt <= now) { candidate = voice; break; }
      if (voice.priority <= priority && (!candidate || voice.priority < candidate.priority
        || (voice.priority === candidate.priority && voice.endsAt < candidate.endsAt))) candidate = voice;
    }
    if (!candidate) return;
    const voice = candidate;
    releaseVoice(voice);
    const source = context.createBufferSource();
    const length = Math.min(duration, sound.duration / rate);
    source.buffer = sound;
    source.playbackRate.value = rate;
    source.connect(voice.gain);
    voice.source = source;
    voice.endsAt = at + length + 0.025;
    voice.priority = priority;
    if (voice.pan) voice.pan.pan.setValueAtTime(clamp(pan, -1, 1), now);
    const envelope = voice.gain.gain;
    envelope.setValueAtTime(0, at);
    envelope.linearRampToValueAtTime(level, at + Math.min(0.006, length * 0.1));
    envelope.setValueAtTime(level, at + Math.max(0.006, length * 0.5));
    envelope.exponentialRampToValueAtTime(0.0001, at + length);
    source.onended = () => {
      source.disconnect();
      if (voice.source === source) { voice.source = null; voice.endsAt = 0; voice.priority = -Infinity; }
    };
    source.start(at);
    source.stop(at + length + 0.02);
  }

  function note(midi, at, level, duration = 0.7, kind = 'music', pan = 0, priority = 0) {
    play(pluck(midi), at, level, duration, kind, pan, priority);
  }

  function scheduleStep(index, at) {
    const withinBar = index % 8;
    const chord = HARMONIES[Math.floor(index / 8) % HARMONIES.length];
    if (withinBar === 0) {
      note(chord[0], at, 0.30, 0.9, 'music', -0.05);
    }
    if (withinBar === 0 || withinBar === 3 || withinBar === 6) {
      for (let i = 1; i < chord.length; i++) {
        note(chord[i], at + i * 0.015, withinBar === 0 ? 0.13 : 0.095,
          withinBar === 0 ? 0.66 : 0.42, 'music', -0.32 + i * 0.12);
      }
    }
    const midi = MELODY[index % MELODY.length];
    if (midi) note(midi, at + 0.009, 0.23, 0.82, 'music', 0.24);
    play(percussion('shaker'), at + (withinBar % 2 ? 0.013 : 0),
      withinBar % 2 ? 0.09 : 0.042, 0.105, 'music', -0.38, -1);
    if (withinBar === 0 || withinBar === 4) {
      play(percussion('kick'), at, 0.24, 0.27, 'music', 0, -1);
    }
    if (withinBar === 2 || withinBar === 6) {
      play(percussion('rim'), at + 0.008, 0.14, 0.115, 'music', 0.35, -1);
    }
  }

  function stopVehicle() {
    if (!graph) return;
    smooth(graph.engineGain.gain, 0, 0.07);
    smooth(graph.driftGain.gain, 0, 0.05);
    smooth(graph.driftToneGain.gain, 0, 0.05);
    smooth(graph.boostGain.gain, 0, 0.05);
  }

  function scheduler() {
    if (!context || !graph || disposed || context.state !== 'running') return;
    const now = context.currentTime;
    if (wallTime() - lastUpdateAt > 0.65) stopVehicle();
    if (muted || doc?.hidden) { nextStepAt = now + 0.06; return; }
    // Quiet, slow waves instead of a short, conspicuous repeating surf sample.
    smooth(graph.surfGain.gain,
      0.24 + Math.sin(now * 0.39) * 0.07 + Math.sin(now * 0.173 + 1.4) * 0.035, 0.3);
    smooth(graph.surfFilter.frequency, 800 + Math.sin(now * 0.31) * 240, 0.3);
    if (nextStepAt < now - 0.1) nextStepAt = now + 0.035;
    let scheduled = 0;
    while (nextStepAt < now + LOOKAHEAD && scheduled < 4) {
      scheduleStep(step, nextStepAt);
      step = (step + 1) % MELODY.length;
      nextStepAt += STEP_SECONDS;
      scheduled++;
    }
  }

  function startScheduler() {
    if (timer == null) timer = setInterval(scheduler, 30);
    scheduler();
  }

  function endScheduler() {
    if (timer != null) clearInterval(timer);
    timer = null;
  }

  function teardownGraph() {
    endScheduler();
    silenceVoices();
    for (const source of persistentSources) stopSource(source);
    for (const node of nodes) {
      try { node.disconnect(); } catch { /* Partial graph construction is safe. */ }
    }
    voices.length = 0; persistentSources.length = 0; nodes.length = 0;
    buffers.clear(); graph = null;
  }

  function unlock() {
    if (disposed || !host || muted) return Promise.resolve(false);
    if (context?.state === 'running' && graph) {
      unlocked = true;
      smooth(graph.master.gain, MASTER_LEVEL, 0.08);
      startScheduler();
      return Promise.resolve(true);
    }
    if (unlockPending) return unlockPending;
    // Never call resume from animation updates, timers, synthetic clicks, or a
    // programmatic unmute. Older browsers without userActivation rely on caller.
    if (host.navigator?.userActivation && !host.navigator.userActivation.isActive) {
      return Promise.resolve(false);
    }
    const Context = host.AudioContext || host.webkitAudioContext;
    if (!Context) return Promise.resolve(false);
    try {
      if (!context || context.state === 'closed') {
        context = new Context({ latencyHint: 'interactive' });
      }
      // Request resume synchronously within the gesture, before warming buffers.
      const resumed = context.state === 'running' ? Promise.resolve() : context.resume();
      // Attach a rejection handler even if graph construction subsequently fails.
      Promise.resolve(resumed).catch(() => {});
      if (!graph) buildGraph();
      unlockPending = Promise.resolve(resumed).then(() => {
        if (disposed || !context || !graph || context.state !== 'running') return false;
        unlocked = true;
        nextStepAt = context.currentTime + 0.045;
        smooth(graph.master.gain, muted ? 0 : MASTER_LEVEL, 0.12);
        if (latestSnapshot) update(latestSnapshot, 0);
        startScheduler();
        const pending = pendingEvents.splice(0);
        for (const queued of pending) if (wallTime() - queued.at < 0.4) event(queued.event);
        return true;
      }).catch(() => false).finally(() => { unlockPending = null; pendingEvents.length = 0; });
      return unlockPending;
    } catch {
      // Unsupported devices or denied audio must never prevent the race.
      teardownGraph();
      if (context && context.state !== 'closed') {
        try { Promise.resolve(context.close()).catch(() => {}); } catch { /* No audio device. */ }
      }
      context = null;
      return Promise.resolve(false);
    }
  }

  function update(snapshot, dt = 0) {
    if (disposed || !snapshot) return;
    latestSnapshot = snapshot;
    lastUpdateAt = wallTime();
    if (!context || !graph || context.state !== 'running') return;
    const state = snapshot.state ?? snapshot;
    const phase = state.phase ?? 'menu';
    const racerList = snapshot.racers ?? state.racers;
    const player = Array.isArray(racerList)
      ? racerList.find((r) => r.isPlayer || r.id === 'player') : null;
    const racing = phase === 'racing' && !player?.finished;
    const speed = Math.abs(finite(state.speed, finite(player?.speed) * 3.6));
    const normalized = clamp(speed / 165, 0, 1.3);
    const drifting = racing && !!(player?.drift ?? state.drift ?? (finite(state.driftCharge) > 0.02));
    const boost = racing && (state.boost === true || finite(state.boost, finite(player?.boost)) > 0);
    const charge = clamp(finite(state.driftCharge, finite(player?.driftCharge)), 0, 1);
    const pinkCharge = finite(player?.driftTier ?? player?.driftLevel) >= 2 || charge >= 0.58;
    const now = context.currentTime;
    const response = clamp(finite(dt, 0.08) * 2, 0.045, 0.15);
    const pitch = 44 + normalized * 110 + Math.sin(now * 17) * (racing ? 1.4 : 0) + (boost ? 17 : 0);
    smooth(graph.engine1.frequency, pitch, response);
    smooth(graph.engine2.frequency, pitch * 2.014, response);
    smooth(graph.engineFilter.frequency, 230 + normalized * 650 + (boost ? 160 : 0), 0.12);
    smooth(graph.engineGain.gain, racing ? 0.13 + normalized * 0.29 : 0, 0.09);
    smooth(graph.driftGain.gain, drifting ? 0.24 + normalized * 0.16 : 0, 0.08);
    smooth(graph.driftFilter.frequency, 1100 + charge * 410, 0.14);
    smooth(graph.driftTone.frequency, pinkCharge ? 1046.5 : 783.99, 0.1);
    smooth(graph.driftToneGain.gain, drifting ? 0.023 + charge * 0.012 : 0, 0.08);
    smooth(graph.boostGain.gain, boost ? 0.38 : 0, 0.08);
    smooth(graph.music.gain, phase === 'paused' ? 0.24 : racing ? 0.36 : 0.42, 0.25);
    if (phase !== lastPhase) {
      if (phase === 'menu' || phase === 'countdown') {
        cooldowns.clear(); coinRun = 0; lastCoinAt = -Infinity;
      }
      if (phase === 'paused' || phase === 'menu') {
        for (const voice of voices) if (voice.kind === 'sfx') releaseVoice(voice);
      }
      lastPhase = phase;
    }
  }

  function event(evt) {
    if (disposed || !evt || muted) return;
    if (typeof evt === 'string') evt = { type: evt };
    const id = evt.racerId ?? evt.racer?.id ?? (typeof evt.racer === 'string' ? evt.racer : undefined);
    if (evt.isPlayer === false || evt.racer?.isPlayer === false || (id != null && id !== 'player')) return;
    if (!context || !graph || context.state !== 'running' || doc?.hidden) {
      if (unlockPending && pendingEvents.length < 8) pendingEvents.push({ event: { ...evt }, at: wallTime() });
      return;
    }
    const now = context.currentTime;
    const type = evt.type;
    if (type === 'reset' || type === 'restart' || type === 'menu') {
      silenceVoices(); stopVehicle(); cooldowns.clear(); coinRun = 0;
      return;
    }
    const cooldown = type === 'coin' ? 0.045 : type === 'finish' ? 3 : type === 'countdown' ? 0.12 : 0.16;
    if (now - (cooldowns.get(type) ?? -Infinity) < cooldown) return;
    // Only retain recognized event types, keeping the cooldown map bounded.
    if (!['countdown', 'go', 'coin', 'item', 'boost', 'drift', 'drift-charge', 'driftCharge', 'lap', 'finish', 'hit'].includes(type)) return;
    cooldowns.set(type, now);
    const at = now + 0.008;
    switch (type) {
      case 'countdown': {
        const value = evt.value ?? evt.count ?? evt.countdown ?? evt.number;
        const isGo = value === 0 || value === 'go' || value === 'GO';
        play(isGo ? tone('go', 0.43, 880, 1174.66, true) : tone('tick', 0.15, 660, 660),
          at, isGo ? 0.40 : 0.32, isGo ? 0.43 : 0.15, 'sfx', 0, 3);
        break;
      }
      case 'go':
        play(tone('go', 0.43, 880, 1174.66, true), at, 0.42, 0.43, 'sfx', 0, 3);
        note(72, at + 0.03, 0.34, 0.48, 'sfx', -0.12, 3);
        note(79, at + 0.13, 0.26, 0.46, 'sfx', 0.12, 3);
        break;
      case 'coin': {
        coinRun = now - lastCoinAt < 0.75 ? (coinRun + 1) % 5 : 0;
        lastCoinAt = now;
        const midi = [72, 74, 76, 79, 81][coinRun];
        note(midi, at, 0.43, 0.36, 'sfx', -0.08, 2);
        note(midi === 81 ? 84 : midi + 12, at + 0.065, 0.21, 0.30, 'sfx', 0.12, 2);
        break;
      }
      case 'item':
        [72, 76, 79, 81].forEach((midi, i) => note(midi, at + i * 0.065, 0.32, 0.42, 'sfx', (i - 1.5) * 0.13, 2));
        break;
      case 'boost':
        play(whoosh(), at, 0.66, 0.65, 'sfx', 0, 2);
        note(67, at, 0.28, 0.32, 'sfx', -0.1, 2);
        note(79, at + 0.08, 0.22, 0.38, 'sfx', 0.1, 2);
        break;
      case 'drift':
      case 'drift-charge':
      case 'driftCharge': {
        const charged = finite(evt.tier ?? evt.level ?? evt.stage) >= 2 || finite(evt.charge ?? evt.driftCharge) >= 0.58;
        note(charged ? 79 : 74, at, 0.25, 0.28, 'sfx', -0.16, 1);
        note(charged ? 81 : 76, at + 0.085, 0.26, 0.38, 'sfx', 0.16, 1);
        break;
      }
      case 'lap':
        [72, 76, 79].forEach((midi, i) => note(midi, at + i * 0.11, 0.34, 0.58, 'sfx', (i - 1) * 0.14, 3));
        break;
      case 'finish':
        // A short original pentatonic cadence, not a borrowed race-game fanfare.
        [72, 76, 79, 81, 79, 84].forEach((midi, i) => note(midi, at + i * 0.14,
          0.32, i === 5 ? 1.05 : 0.48, 'sfx', (i % 3 - 1) * 0.16, 4));
        [60, 64, 67].forEach((midi, i) => note(midi, at + 0.72 + i * 0.018, 0.25, 1.1, 'sfx', (i - 1) * 0.2, 4));
        stopVehicle();
        break;
      case 'hit':
        play(tone('hit', 0.22, 130, 58), at, 0.36, 0.22, 'sfx', 0, 2);
        play(percussion('rim'), at, 0.22, 0.10, 'sfx', 0, 2);
        break;
      default: break;
    }
  }

  function setMuted(value) {
    if (disposed) return;
    muted = !!value;
    if (graph && context?.state !== 'closed') smooth(graph.master.gain, muted ? 0 : MASTER_LEVEL, 0.035);
    if (muted) { silenceVoices(); pendingEvents.length = 0; }
    else if (host?.navigator?.userActivation?.isActive) void unlock();
  }

  function onGesture(evt) {
    if (evt.isTrusted === false || disposed || muted) return;
    if (evt.type === 'keydown' && (evt.repeat || ['Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(evt.key))) return;
    if (!unlocked || context?.state !== 'running') void unlock();
  }

  function onVisibility() {
    if (!context || !graph || disposed) return;
    if (doc?.hidden) {
      endScheduler(); silenceVoices(); stopVehicle();
      smooth(graph.master.gain, 0, 0.025);
      if (context.state === 'running') {
        try { Promise.resolve(context.suspend()).catch(() => {}); } catch { /* Device was removed. */ }
      }
    }
    // Returning to a hidden/interrupted tab requires a fresh gesture; do not
    // auto-resume a suspended context and produce an autoplay-policy warning.
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    for (const name of ['pointerdown', 'touchend', 'keydown']) host?.removeEventListener(name, onGesture, true);
    doc?.removeEventListener('visibilitychange', onVisibility);
    teardownGraph(); cooldowns.clear(); pendingEvents.length = 0;
    latestSnapshot = null;
    if (context && context.state !== 'closed') {
      try { Promise.resolve(context.close()).catch(() => {}); } catch { /* Already closed. */ }
    }
    context = null;
  }

  for (const name of ['pointerdown', 'touchend', 'keydown']) {
    host?.addEventListener(name, onGesture, { capture: true, passive: true });
  }
  doc?.addEventListener('visibilitychange', onVisibility);
  return { unlock, update, event, setMuted, dispose };
}
