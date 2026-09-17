import * as THREE from 'three';

// Metres, seconds and radians throughout; only the HUD speed is km/h.
// Motion is integrated in the track's Frenet frame, NOT snapped to an AI lane.
// A manual kart keeps its world heading on a bend until its driver steers.
const TAU = Math.PI * 2;
const STEP = 1 / 120;
const LAPS = 3;
const CHECKPOINTS = 24;
const CHARACTERS = ['mochi', 'mango', 'luna', 'oreo', 'sakura', 'coco'];
const NAMES = { mochi: 'Mochi', mango: 'Mango', luna: 'Luna', oreo: 'Oreo', sakura: 'Sakura', coco: 'Coco' };
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const wrap = value => ((value % 1) + 1) % 1;
const angle = value => ((value + Math.PI) % TAU + TAU) % TAU - Math.PI;
const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const approach = (value, target, amount) => value < target ? Math.min(target, value + amount) : Math.max(target, value - amount);

export function createSimulation(track, { onEvent, seed = 0xa10a } = {}) {
  if (!track || typeof track.sample !== 'function' || !(track.length > 0)) {
    throw new TypeError('createSimulation requires a positive track.length and track.sample(u, lateral).');
  }
  const length = track.length;
  const width = Math.max(4, finite(track.width, 16));
  const roadEdge = width / 2 - 0.8;
  const outerEdge = width / 2 + Math.min(9, width * 0.55);
  const laneLimit = Math.max(0.7, roadEdge - 1.2);
  const pickups = track.pickups || [];
  const pads = track.boosts || [];
  const racers = [];
  const projectiles = [];
  const pickupTimers = new Map();
  const contactTimers = new Map();
  const state = {
    phase: 'menu', elapsed: 0, countdown: 3, lap: 1, totalLaps: LAPS,
    position: 8, totalRacers: 8, speed: 0, coins: 0, item: null,
    boost: 0, driftCharge: 0, results: [], finishTime: null,
    shield: 0, offroad: false, wrongWay: false, pausedFrom: null,
  };
  let selectedCharacter = 'mochi';
  let resumePhase = 'menu';
  let randomState = 1;
  let projectileId = 0;
  let lastInput = { item: false, reset: false };

  function random() {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState / 4294967296;
  }
  const sample = (distance, lateral = 0) => track.sample(wrap(distance / length), lateral);
  const separation = distance => ((distance + length / 2) % length + length) % length - length / 2;
  const aheadDistance = distance => ((distance % length) + length) % length;
  const yawOf = frame => Number.isFinite(frame.yaw) ? frame.yaw : Math.atan2(frame.tangent.x, frame.tangent.z);

  function emit(type, racer = null, extra = {}) {
    if (typeof onEvent !== 'function') return;
    onEvent({
      type, time: state.elapsed,
      ...(racer ? {
        racerId: racer.id, id: racer.id, racer, isPlayer: racer.isPlayer,
        position: racer.position.clone(),
      } : {}),
      ...extra,
    });
  }

  function place(racer) {
    const frame = sample(racer._distance, racer.lateral);
    racer.position.copy(frame.position);
    racer.yaw = yawOf(frame) + racer.heading + (racer.drift ? racer._driftDirection * 0.12 : 0);
    racer.progress = racer.finished ? LAPS : racer._distance / length;
    racer.offroad = Math.abs(racer.lateral) > roadEdge;
  }

  function rankRacers() {
    const order = racers.slice().sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime || a._grid - b._grid;
      if (a.finished !== b.finished) return a.finished ? -1 : 1;
      // The next ordered checkpoint bounds rank credit, even if state is tampered with.
      const aProgress = Math.min(a.progress, a._nextCheckpoint / CHECKPOINTS);
      const bProgress = Math.min(b.progress, b._nextCheckpoint / CHECKPOINTS);
      return bProgress - aProgress || a._grid - b._grid;
    });
    order.forEach((racer, index) => { racer.rank = index + 1; });
    return order;
  }

  function syncState() {
    const player = racers[0];
    state.lap = player.lap;
    state.position = player.rank;
    state.speed = Math.round(player.speed * 3.6);
    state.coins = player.coins;
    state.item = player.item;
    state.boost = player.boost;
    state.driftCharge = player.driftCharge;
    state.shield = player.shield;
    state.offroad = player.offroad;
    state.wrongWay = Math.cos(player.heading) < -0.2 && player.speed > 3;
  }

  function reset(characterId = selectedCharacter) {
    selectedCharacter = CHARACTERS.includes(characterId) ? characterId : 'mochi';
    randomState = (finite(seed, 0xa10a) >>> 0) || 1;
    projectileId = 0;
    projectiles.length = 0;
    pickupTimers.clear();
    contactTimers.clear();
    lastInput = { item: false, reset: false };
    resumePhase = 'menu';
    Object.assign(state, {
      phase: 'menu', elapsed: 0, countdown: 3, lap: 1, position: 8,
      totalLaps: LAPS, totalRacers: 8, speed: 0, coins: 0, item: null,
      boost: 0, driftCharge: 0, results: [], finishTime: null,
      shield: 0, offroad: false, wrongWay: false, pausedFrom: null,
    });
    const usedNames = {};
    for (let i = 0; i < 8; i++) {
      const character = i === 0 ? selectedCharacter : CHARACTERS[i % CHARACTERS.length];
      const count = (usedNames[character] || 0) + 1;
      usedNames[character] = count;
      const grid = i === 0 ? 7 : i - 1;
      const racer = racers[i] || { position: new THREE.Vector3() };
      Object.assign(racer, {
        id: i === 0 ? 'player' : `ai${i - 1}`,
        name: NAMES[character] + (count > 1 ? ' Jr.' : ''), characterId: character,
        isPlayer: i === 0, yaw: 0, speed: 0, steer: 0, drift: false,
        boost: 0, progress: 0, lap: 1, coins: 0, item: null, finished: false,
        finishTime: null, rank: grid + 1, driftCharge: 0, driftTier: 0,
        shield: 0, hit: 0, offroad: false, heading: 0,
        lateral: (grid % 2 === 0 ? -1 : 1) * Math.min(2.4, laneLimit),
        _grid: grid, _distance: -6 - Math.floor(grid / 2) * 6,
        _nextCheckpoint: 0, _completedLaps: 0, _yawRate: 0, _lateralKick: 0,
        _driftSeconds: 0, _driftDirection: 0, _driftTier: 0, _boostPower: 0,
        _stun: 0, _respawnLock: 0, _boundaryCooldown: 0,
        _baseSpeed: i === 0 ? 39.5 : 32.6 + ((i * 7) % 9) * 0.37,
        _baseLane: i === 0 ? -0.5 : [-0.65, 0.45, -0.18, 0.76, -0.45, 0.1, 0.55][i - 1] * laneLimit,
        _personality: random() * TAU, _itemUseAt: Infinity,
        _pace: i === 0 ? 37 : 32, _padsInside: new Set(), _padCooldowns: new Map(),
      });
      racers[i] = racer;
      place(racer);
    }
    for (const pickup of pickups) {
      pickup.active = true;
      pickup.respawn = 0;
    }
    rankRacers();
    syncState();
    return api;
  }

  function start() {
    reset(selectedCharacter);
    state.phase = 'countdown';
    emit('countdown', racers[0], { value: 3, count: 3, countdown: 3 });
    return api;
  }

  function togglePause() {
    if (state.phase === 'paused') {
      state.phase = resumePhase;
      state.pausedFrom = null;
    } else if (state.phase === 'racing' || state.phase === 'countdown') {
      resumePhase = state.phase;
      state.pausedFrom = resumePhase;
      state.phase = 'paused';
    }
    return state.phase;
  }

  function addBoost(racer, duration, source, tier = 1) {
    const power = source === 'item' ? 16 : 9 + tier * 2;
    racer.boost = Math.min(3.5, Math.max(racer.boost, duration));
    racer._boostPower = Math.max(racer._boostPower, power);
    racer.speed = Math.min(racer._baseSpeed + power, racer.speed + 4 + tier);
    emit('boost', racer, { source, tier, duration, strength: tier });
  }

  function endDrift(racer, allowBoost = true) {
    if (!racer.drift) return;
    const tier = racer._driftSeconds >= 2.25 ? 3 : racer._driftSeconds >= 1.3 ? 2 : racer._driftSeconds >= 0.6 ? 1 : 0;
    racer.drift = false;
    if (allowBoost && tier && !racer.offroad && racer.speed > 9) {
      addBoost(racer, [0, 0.85, 1.45, 2.15][tier], 'drift', tier);
    }
    emit('drift', racer, { action: 'release', tier: allowBoost ? tier : 0, charge: racer.driftCharge });
    racer._driftSeconds = 0;
    racer._driftTier = 0;
    racer.driftTier = 0;
    racer.driftCharge = 0;
    racer._driftDirection = 0;
  }

  function respawnPlayer() {
    const player = racers[0];
    if (state.phase !== 'racing' || player.finished) return false;
    endDrift(player, false);
    // Never use nearest().u to grant distance: nearby crossing track sections can
    // otherwise skip checkpoints. Respawn on the center of our existing section.
    player.lateral = 0;
    player.heading = 0;
    player._yawRate = 0;
    player._lateralKick = 0;
    player.steer = 0;
    player.speed = 0;
    player.boost = 0;
    player._boostPower = 0;
    player._stun = 0;
    player.hit = 0;
    player._respawnLock = 0.35;
    place(player);
    emit('hit', player, { source: 'respawn', reason: 'respawn', respawn: true, strength: 0 });
    syncState();
    return true;
  }

  function targetAhead(racer, range = 155) {
    let target = null;
    let nearest = range;
    for (const other of racers) {
      if (other === racer || other.finished) continue;
      const distance = aheadDistance(other._distance - racer._distance);
      if (distance > 2 && distance < nearest) { nearest = distance; target = other; }
    }
    return target;
  }

  function fireItem(racer) {
    if (state.phase !== 'racing' || racer.finished || !racer.item) return false;
    const item = racer.item;
    if (!['boost', 'shield', 'projectile'].includes(item)) return false;
    racer.item = null;
    racer._itemUseAt = Infinity;
    emit('item', racer, { action: 'use', item });
    if (item === 'boost') addBoost(racer, 2.5, 'item', 3);
    if (item === 'shield') racer.shield = Math.max(racer.shield, 6);
    if (item === 'projectile') {
      const target = targetAhead(racer);
      const distance = racer._distance + 3;
      projectiles.push({
        id: `shell${projectileId++}`, ownerId: racer.id, targetId: target?.id || null,
        position: sample(distance, racer.lateral).position.clone(), yaw: racer.yaw,
        lateral: racer.lateral, speed: 76, life: 2.5, _distance: distance,
      });
    }
    return true;
  }

  function useItem() {
    const used = fireItem(racers[0]);
    syncState();
    return used;
  }

  function damage(racer, source, attacker = null, kick = 0) {
    if (racer.shield > 0) {
      // A shield absorbs one attack, rather than hiding every hit for six seconds.
      racer.shield = 0;
      emit('hit', racer, { source, reason: source, attackerId: attacker?.id || null, blocked: true, shield: true, strength: 0.25 });
      return;
    }
    racer.speed *= source === 'projectile' ? 0.52 : 0.83;
    racer._stun = source === 'projectile' ? 0.6 : 0.12;
    racer.hit = source === 'projectile' ? 0.7 : 0.28;
    racer._lateralKick += kick;
    if (source === 'projectile') {
      racer.coins = Math.max(0, racer.coins - 2);
      racer.boost = 0;
      racer._boostPower = 0;
      endDrift(racer, false);
    }
    emit('hit', racer, { source, reason: source, attackerId: attacker?.id || null, blocked: false, strength: source === 'projectile' ? 1 : 0.4 });
  }

  function turnRate(racer) {
    return 1.8 * clamp(racer.speed / 10, 0, 1) / (1 + Math.max(0, racer.speed - 15) * 0.021);
  }

  function drivingPlan(racer, autoDrift) {
    const look = 10 + racer.speed * 0.33;
    const frame = sample(racer._distance);
    const preview = sample(racer._distance + look);
    const curve = angle(yawOf(preview) - yawOf(frame)) / look;
    let lane = racer._baseLane + Math.sin(state.elapsed * 0.39 + racer._personality) * 0.38;
    let trafficThrottle = 1;
    for (const other of racers) {
      if (other === racer || other.finished) continue;
      const gap = aheadDistance(other._distance - racer._distance);
      if (gap < 15 && gap > 0.25 && Math.abs(other.lateral - racer.lateral) < 2.5) {
        const passSide = other.lateral > 0 ? -1 : 1;
        lane = clamp(other.lateral + passSide * 3.3, -laneLimit, laneLimit);
        if (gap < 5 && racer.speed > other.speed + 1) trafficThrottle = 0.45;
      }
    }
    lane = clamp(lane, -laneLimit, laneLimit);
    const aim = sample(racer._distance + look, lane).position;
    const aimYaw = Math.atan2(aim.x - racer.position.x, aim.z - racer.position.z);
    const actualYaw = yawOf(frame) + racer.heading;
    const error = angle(aimYaw - actualYaw);
    // Pure pursuit uses the SAME steering and acceleration as the human driver.
    const desiredRate = 2 * Math.max(8, racer.speed) * Math.sin(error) / look;
    let steer = clamp(desiredRate / Math.max(0.2, turnRate(racer)), -1, 1);
    if (racer.drift) steer = (steer - racer._driftDirection * 0.09) / 1.12;
    const cornerSpeed = clamp(Math.sqrt(28 / Math.max(0.006, Math.abs(curve))), 22, racer._baseSpeed + 18);
    const brake = racer.speed > cornerSpeed + 2 ? clamp((racer.speed - cornerSpeed - 2) / 9, 0, 0.55) : 0;
    const driftWindow = (state.elapsed + racer._personality * 2) % 10;
    const drift = autoDrift && Math.abs(curve) > 0.01 && Math.abs(curve) < 0.035 &&
      Math.abs(steer) > 0.22 && racer.speed > 22 && !racer.offroad &&
      Math.abs(racer.lateral) < laneLimit && driftWindow > 3 && driftWindow < 4.55;
    return { throttle: trafficThrottle, brake, steer, drift, curve };
  }

  function processDrift(racer, control, dt) {
    const wantsDrift = control.drift && racer.speed > 12 && !racer.offroad && racer._stun <= 0;
    if (!racer.drift && wantsDrift && Math.abs(control.steer) > 0.14) {
      racer.drift = true;
      racer._driftDirection = Math.sign(control.steer);
      racer._driftSeconds = 0;
      emit('drift', racer, { action: 'start', tier: 0, direction: racer._driftDirection });
    } else if (racer.drift && !wantsDrift) {
      endDrift(racer, !control.drift);
    }
    if (racer.drift) {
      // Holding drift while going straight or grinding the sand earns nothing.
      if (Math.abs(control.steer) > 0.12 && racer.speed > 13) {
        racer._driftSeconds = Math.min(2.7, racer._driftSeconds + dt);
      }
      racer.driftCharge = clamp(racer._driftSeconds / 2.25, 0, 1);
      const tier = racer._driftSeconds >= 2.25 ? 3 : racer._driftSeconds >= 1.3 ? 2 : racer._driftSeconds >= 0.6 ? 1 : 0;
      racer.driftTier = tier;
      if (tier > racer._driftTier) {
        racer._driftTier = tier;
        emit('drift', racer, { action: 'charge', tier, charge: racer.driftCharge });
      }
    }
  }

  function updateCheckpoints(racer, previousDistance, stepStart, dt) {
    const previous = previousDistance / length;
    const next = racer._distance / length;
    if (next > previous) {
      while (racer._nextCheckpoint <= LAPS * CHECKPOINTS) {
        const boundary = racer._nextCheckpoint / CHECKPOINTS;
        if (previous > boundary + 1e-7 || next + 1e-10 < boundary) break;
        racer._nextCheckpoint++;
        if (boundary > 0 && Number.isInteger(boundary)) {
          racer._completedLaps = boundary;
          racer.lap = Math.min(LAPS, boundary + 1);
          emit('lap', racer, { lap: racer.lap, completedLaps: boundary, totalLaps: LAPS });
        }
      }
    }
    if (racer._nextCheckpoint > LAPS * CHECKPOINTS && !racer.finished) {
      const fraction = clamp((LAPS * length - previousDistance) / Math.max(1e-8, racer._distance - previousDistance), 0, 1);
      racer.finishTime = stepStart + dt * fraction;
      racer.finished = true;
      racer._distance = LAPS * length;
      racer.lap = LAPS;
      racer.speed = 0;
      racer.boost = 0;
      endDrift(racer, false);
    }
  }

  // A swept test prevents missed boxes/pads at boost speed or with a long frame.
  function crosses(previous, current, u, longitudinalRadius) {
    const delta = current - previous;
    const relative = separation(wrap(finite(u)) * length - previous);
    if (relative < Math.min(0, delta) - longitudinalRadius || relative > Math.max(0, delta) + longitudinalRadius) return null;
    return Math.abs(delta) < 1e-7 ? 1 : clamp(relative / delta, 0, 1);
  }

  function collectAndBoost(racer, previousDistance, previousLateral) {
    for (const pickup of pickups) {
      if (pickup.active === false || (pickup.kind === 'item' && racer.item)) continue;
      if (pickup.kind !== 'coin' && pickup.kind !== 'item') continue;
      const t = crosses(previousDistance, racer._distance, pickup.u, 2);
      if (t === null) continue;
      const lateral = previousLateral + (racer.lateral - previousLateral) * t;
      if (Math.abs(lateral - finite(pickup.lateral)) > (pickup.kind === 'coin' ? 1.65 : 2)) continue;
      pickup.active = false;
      pickup.respawn = pickup.kind === 'coin' ? 7 : 6;
      pickupTimers.set(pickup, state.elapsed + pickup.respawn);
      if (pickup.kind === 'coin') {
        racer.coins = Math.min(10, racer.coins + 1);
        racer.speed = Math.min(racer.speed + 0.75, racer._baseSpeed + racer._boostPower + 2);
        emit('coin', racer, { coins: racer.coins, amount: 1, pickup });
      } else {
        const roll = random();
        const boostOdds = racer.rank >= 5 ? 0.5 : 0.35;
        const shieldOdds = racer.rank <= 2 ? 0.43 : 0.23;
        racer.item = roll < boostOdds ? 'boost' : roll < boostOdds + shieldOdds ? 'shield' : 'projectile';
        racer._itemUseAt = state.elapsed + 0.85 + random() * 1.2;
        emit('item', racer, { action: 'collect', item: racer.item, pickup });
      }
    }
    for (let index = 0; index < pads.length; index++) {
      const pad = pads[index];
      const halfLength = finite(pad.length, 5) / 2 + 1.2;
      const halfWidth = finite(pad.width, 4) / 2 + 0.75;
      const t = crosses(previousDistance, racer._distance, pad.u, halfLength);
      const lateral = t === null ? racer.lateral : previousLateral + (racer.lateral - previousLateral) * t;
      const touching = t !== null && Math.abs(lateral - finite(pad.lateral)) < halfWidth;
      if (touching && !racer._padsInside.has(index) && (racer._padCooldowns.get(index) || 0) <= state.elapsed) {
        addBoost(racer, 1.05, 'pad', 1);
        racer._padCooldowns.set(index, state.elapsed + 0.8);
      }
      const inside = Math.abs(separation(wrap(pad.u) * length - racer._distance)) < halfLength &&
        Math.abs(racer.lateral - finite(pad.lateral)) < halfWidth;
      if (inside) racer._padsInside.add(index);
      else racer._padsInside.delete(index);
    }
  }

  function moveRacer(racer, control, dt, stepStart) {
    if (racer.finished) return;
    racer.boost = Math.max(0, racer.boost - dt);
    if (!racer.boost) racer._boostPower = 0;
    racer.shield = Math.max(0, racer.shield - dt);
    racer.hit = Math.max(0, racer.hit - dt);
    racer._stun = Math.max(0, racer._stun - dt);
    racer._respawnLock = Math.max(0, racer._respawnLock - dt);
    racer._boundaryCooldown = Math.max(0, racer._boundaryCooldown - dt);
    const previousDistance = racer._distance;
    const previousLateral = racer.lateral;
    const frame = sample(racer._distance);
    const ahead = sample(racer._distance + 5);
    const curvature = angle(yawOf(ahead) - yawOf(frame)) / 5;
    const sand = clamp((Math.abs(racer.lateral) - roadEdge) / 3.8, 0, 1);
    processDrift(racer, control, dt);

    let throttle = Math.max(control.throttle, racer.boost > 0 ? 0.85 : 0);
    if (racer._respawnLock > 0) throttle = 0;
    const brake = control.brake;
    const topSpeed = (racer._baseSpeed + racer.coins * 0.18 + racer._boostPower) * (1 - sand * 0.59);
    const acceleration = racer.isPlayer ? 24 : 21.5;
    const drive = throttle * (1 - brake) * acceleration * (1 - 0.34 * clamp(racer.speed / topSpeed, 0, 1));
    const drag = (throttle > 0 ? 2.5 : 5.8) + racer.speed * 0.04 + sand * 9 + (racer.drift ? 0.8 : 0);
    racer.speed = Math.max(0, racer.speed + (drive * (racer._stun > 0 ? 0.3 : 1) - drag - brake * 40) * dt);
    if (racer.speed > topSpeed) racer.speed = Math.max(topSpeed, racer.speed - (sand ? 26 : 18) * dt);
    racer.speed = clamp(racer.speed, 0, 66);
    racer._pace += (racer.speed - racer._pace) * (1 - Math.exp(-dt / 7));

    racer.steer += (control.steer - racer.steer) * (1 - Math.exp(-11 * dt));
    let steering = racer.steer;
    if (racer.drift) steering = steering * 1.12 + racer._driftDirection * 0.09;
    const targetYawRate = steering * turnRate(racer) * (racer._stun > 0 ? 0.65 : 1);
    racer._yawRate += (targetYawRate - racer._yawRate) * (1 - Math.exp(-10 * dt));
    const metric = clamp(1 - curvature * racer.lateral, 0.45, 1.8);
    const approximateAdvance = racer.speed * Math.cos(racer.heading) / metric;
    const motionHeading = racer.heading + (racer._yawRate - curvature * approximateAdvance) * dt / 2;
    const worldYaw = yawOf(frame) + racer.heading + racer._yawRate * dt;
    racer._distance += racer.speed * Math.cos(motionHeading) / metric * dt;
    const driftSlide = racer.drift ? racer._driftDirection * racer.speed * 0.025 : 0;
    racer.lateral += (racer.speed * Math.sin(motionHeading) + driftSlide + racer._lateralKick) * dt;
    racer._lateralKick *= Math.exp(-5 * dt);
    racer.heading = angle(worldYaw - yawOf(sample(racer._distance)));

    if (Math.abs(racer.lateral) > outerEdge) {
      const side = Math.sign(racer.lateral);
      racer.lateral = side * outerEdge;
      // Forgiving boundary bounce, not invisible continuous lane-following.
      if (Math.sin(racer.heading) * side > 0) racer.heading = -side * 0.2;
      racer._lateralKick = -side * 3;
      racer._yawRate = 0;
      if (racer._boundaryCooldown <= 0) {
        racer.speed *= 0.6;
        racer.hit = 0.22;
        racer._boundaryCooldown = 0.8;
        endDrift(racer, false);
        emit('hit', racer, { source: 'boundary', reason: 'boundary', strength: 0.25 });
      }
    }
    updateCheckpoints(racer, previousDistance, stepStart, dt);
    place(racer);
    if (!racer.finished) collectAndBoost(racer, previousDistance, previousLateral);
  }

  function kartContacts() {
    for (let i = 0; i < racers.length; i++) {
      const a = racers[i];
      if (a.finished) continue;
      for (let j = i + 1; j < racers.length; j++) {
        const b = racers[j];
        if (b.finished) continue;
        const longitudinal = separation(a._distance - b._distance);
        const lateral = a.lateral - b.lateral;
        if (Math.abs(longitudinal) > 3.65 || Math.abs(lateral) > 2.35) continue;
        const overlap = 1 - (longitudinal / 3.65) ** 2 - (lateral / 2.35) ** 2;
        if (overlap <= 0) continue;
        const side = Math.abs(lateral) > 0.1 ? Math.sign(lateral) : (i % 2 ? -1 : 1);
        const push = Math.min(0.12, overlap * 0.18);
        a.lateral += side * push;
        b.lateral -= side * push;
        const key = `${i}:${j}`;
        if ((contactTimers.get(key) || 0) <= state.elapsed) {
          contactTimers.set(key, state.elapsed + 0.75);
          const rear = longitudinal > 0 ? b : a;
          const front = rear === a ? b : a;
          const closingSpeed = rear.speed - front.speed;
          a._lateralKick += side * 2.4;
          b._lateralKick -= side * 2.4;
          if (closingSpeed > 2.5) {
            damage(rear, 'contact', front);
            if (front.shield <= 0) front.speed = Math.min(front.speed + 0.9, front._baseSpeed + front._boostPower + 1);
          } else {
            a.hit = b.hit = 0.22;
            emit('hit', a, { source: 'contact', reason: 'contact', otherId: b.id, strength: 0.3 });
            emit('hit', b, { source: 'contact', reason: 'contact', otherId: a.id, strength: 0.3 });
          }
        }
        place(a);
        place(b);
      }
    }
  }

  function updateProjectiles(dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
      projectile.life -= dt;
      const previous = projectile._distance;
      const target = racers.find(racer => racer.id === projectile.targetId && !racer.finished);
      if (target && aheadDistance(target._distance - previous) < 170) {
        projectile.lateral = approach(projectile.lateral, target.lateral, 6.5 * dt);
      }
      projectile._distance += projectile.speed * dt;
      const frame = sample(projectile._distance, projectile.lateral);
      projectile.position.copy(frame.position);
      projectile.position.y += 0.75;
      projectile.yaw = yawOf(frame);
      let collided = false;
      for (const racer of racers) {
        if (racer.id === projectile.ownerId || racer.finished) continue;
        const t = crosses(previous, projectile._distance, racer._distance / length, 2.1);
        if (t !== null && Math.abs(projectile.lateral - racer.lateral) < 1.9) {
          const attacker = racers.find(other => other.id === projectile.ownerId);
          damage(racer, 'projectile', attacker, projectile.lateral >= racer.lateral ? -3.5 : 3.5);
          collided = true;
          break;
        }
      }
      if (collided || projectile.life <= 0) projectiles.splice(i, 1);
    }
  }

  function finishRace() {
    const player = racers[0];
    state.finishTime = player.finishTime;
    state.elapsed = player.finishTime;
    state.phase = 'finished';
    state.countdown = 0;
    state.results = racers.map(racer => {
      const actuallyFinished = racer.finished && racer.finishTime <= player.finishTime + 1e-7;
      const remaining = Math.max(0, LAPS * length - racer._distance);
      const observed = (Math.max(0, racer._distance) + 6 + Math.floor(racer._grid / 2) * 6) / Math.max(1, state.elapsed);
      const pace = clamp(observed * 0.65 + racer._pace * 0.35, 12, racer._baseSpeed + 6);
      const time = actuallyFinished ? racer.finishTime : Math.max(state.elapsed + 0.001, racer.finishTime ?? state.elapsed + remaining / pace);
      return {
        id: racer.id, name: racer.name, characterId: racer.characterId,
        isPlayer: racer.isPlayer, coins: racer.coins, progress: racer.progress,
        finished: actuallyFinished, estimated: !actuallyFinished,
        time, finishTime: time, lap: racer.lap,
      };
    }).sort((a, b) => a.time - b.time || a.id.localeCompare(b.id));
    const winningTime = state.results[0].time;
    state.results.forEach((result, index) => {
      result.rank = index + 1;
      result.position = index + 1;
      result.gap = result.time - winningTime;
      racers.find(racer => racer.id === result.id).rank = result.rank;
    });
    syncState();
    emit('finish', player, { finishTime: player.finishTime, rank: player.rank, results: state.results });
  }

  function raceStep(dt, input) {
    const stepStart = state.elapsed;
    state.elapsed += dt;
    for (const [pickup, readyAt] of pickupTimers) {
      pickup.respawn = Math.max(0, readyAt - state.elapsed);
      if (pickup.respawn <= 1e-8) {
        pickup.respawn = 0;
        pickup.active = true;
        pickupTimers.delete(pickup);
      }
    }
    for (const racer of racers) {
      if (racer.finished) continue;
      let control;
      if (racer.isPlayer) {
        const plan = input.assist ? drivingPlan(racer, false) : null;
        control = {
          throttle: clamp(finite(input.throttle, input.assist ? 1 : 0), 0, 1),
          brake: clamp(finite(input.brake), 0, 1),
          steer: clamp(finite(input.steer), -1, 1), drift: !!input.drift,
        };
        if (plan) {
          if (Math.abs(control.steer) < 0.05) control.steer = plan.steer;
          control.brake = Math.max(control.brake, plan.brake);
          control.throttle *= plan.throttle;
        }
      } else {
        control = drivingPlan(racer, true);
        if (racer.item && state.elapsed >= racer._itemUseAt) {
          if (racer.item !== 'projectile' || targetAhead(racer) || state.elapsed > racer._itemUseAt + 2) fireItem(racer);
        }
      }
      const wasFinished = racer.finished;
      moveRacer(racer, control, dt, stepStart);
      if (!wasFinished && racer.finished && !racer.isPlayer) {
        emit('finish', racer, { finishTime: racer.finishTime, rank: racers.filter(other => other.finished && other.finishTime < racer.finishTime).length + 1 });
      }
    }
    kartContacts();
    updateProjectiles(dt);
    rankRacers();
    if (racers[0].finished) finishRace();
  }

  function update(dt, input = {}) {
    input = input || {};
    const itemPressed = !!input.item && !lastInput.item;
    const resetPressed = !!input.reset && !lastInput.reset;
    lastInput.item = !!input.item;
    lastInput.reset = !!input.reset;
    if (state.phase === 'racing') {
      if (resetPressed) respawnPlayer();
      if (itemPressed) useItem();
    }
    // Large test frames remain deterministic; pathological hidden-tab gaps are
    // bounded. Pausing does not consume countdown, race time, or item timers.
    let remaining = clamp(finite(dt), 0, 10);
    if (state.phase === 'countdown' && remaining > 0) {
      const old = state.countdown;
      const consumed = Math.min(remaining, old);
      state.countdown = Math.max(0, old - consumed);
      remaining -= consumed;
      for (const value of [2, 1]) {
        if (old > value && state.countdown <= value) emit('countdown', racers[0], { value, count: value, countdown: value });
      }
      if (state.countdown <= 1e-8) {
        state.countdown = 0;
        state.phase = 'racing';
        emit('go', racers[0], { value: 0, count: 0, countdown: 0 });
      }
    }
    while (remaining > 1e-9 && state.phase === 'racing') {
      const step = Math.min(STEP, remaining);
      raceStep(step, input);
      remaining -= step;
    }
    syncState();
    return getSnapshot();
  }

  function getSnapshot() {
    return { ...state, racers, projectiles };
  }

  const api = { racers, state, reset, start, update, useItem, togglePause, getSnapshot, projectiles };
  reset();
  return api;
}
