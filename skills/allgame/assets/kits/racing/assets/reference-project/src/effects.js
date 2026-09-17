import * as THREE from 'three';

// Five fixed-capacity batches; no lights, custom shaders, or per-frame GPU resources.
const EMPTY = Object.freeze([]);
const TAU = Math.PI * 2;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const finite = (n, fallback = 0) => Number.isFinite(n) ? n : fallback;
const COLORS = {
  sand: new THREE.Color('#eed4a0'),
  sandLight: new THREE.Color('#fff0ce'),
  blue: new THREE.Color('#65cfff'),
  blueWhite: new THREE.Color('#d0f4ff'),
  pink: new THREE.Color('#ff71ca'),
  pinkWhite: new THREE.Color('#ffe0f6'),
  orange: new THREE.Color('#ff9b42'),
  teal: new THREE.Color('#69ffe0'),
  gold: new THREE.Color('#ffda65'),
  white: new THREE.Color('#fff6d7'),
};
const CONFETTI = ['#ff7d97', '#62e8d1', '#ffd46b', '#8acbff', '#e1a0ff', '#fff6d7']
  .map((color) => new THREE.Color(color));

function spriteTexture(star = false) {
  const size = 32;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x + 0.5) / size * 2 - 1;
      const v = (y + 0.5) / size * 2 - 1;
      const radius = Math.hypot(u, v);
      let alpha = Math.pow(Math.max(0, 1 - radius), star ? 1.7 : 2.1);
      if (star) {
        const arms = Math.exp(-Math.min(u * u, v * v) * 150)
          * Math.max(0, 1 - radius) * 0.55;
        alpha = Math.min(1, alpha + arms);
      }
      const i = (y * size + x) * 4;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
      pixels[i + 3] = Math.round(alpha * 255);
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat);
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function makePointPool(root, name, capacity, texture, size, opacity, additive, gravity, drag) {
  const position = new Float32Array(capacity * 3);
  const color = new Float32Array(capacity * 3);
  const baseColor = new Float32Array(capacity * 3);
  const velocity = new Float32Array(capacity * 3);
  const life = new Float32Array(capacity);
  const duration = new Float32Array(capacity);
  const floor = new Float32Array(capacity);
  const geometry = new THREE.BufferGeometry();
  const positions = new THREE.BufferAttribute(position, 3).setUsage(THREE.DynamicDrawUsage);
  const colors = new THREE.BufferAttribute(color, 3).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positions);
  geometry.setAttribute('color', colors);
  geometry.setDrawRange(0, capacity);
  const material = new THREE.PointsMaterial({
    map: texture, size, opacity, transparent: true, depthWrite: false,
    vertexColors: true, sizeAttenuation: true, toneMapped: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const mesh = new THREE.Points(geometry, material);
  mesh.name = `aloha-fx-${name}`;
  mesh.frustumCulled = false;
  mesh.renderOrder = additive ? 4 : 2;
  mesh.visible = false;
  root.add(mesh);
  for (let i = 0; i < capacity; i++) position[i * 3 + 1] = -10000;
  let cursor = 0;
  let active = 0;
  let dirty = false;

  return {
    emit(x, y, z, vx, vy, vz, seconds, tint, groundY = y - 0.2) {
      const i = cursor;
      cursor = (cursor + 1) % capacity;
      if (life[i] <= 0) active++;
      const j = i * 3;
      position[j] = x; position[j + 1] = y; position[j + 2] = z;
      velocity[j] = vx; velocity[j + 1] = vy; velocity[j + 2] = vz;
      baseColor[j] = color[j] = tint.r;
      baseColor[j + 1] = color[j + 1] = tint.g;
      baseColor[j + 2] = color[j + 2] = tint.b;
      life[i] = duration[i] = seconds;
      floor[i] = groundY;
      dirty = true;
      mesh.visible = true;
    },
    update(dt) {
      if (!active && !dirty) return;
      const damping = Math.exp(-drag * dt);
      for (let i = 0; i < capacity; i++) {
        if (life[i] <= 0) continue;
        const j = i * 3;
        life[i] -= dt;
        if (life[i] <= 0) {
          life[i] = 0;
          active--;
          position[j + 1] = -10000;
          continue;
        }
        velocity[j] *= damping;
        velocity[j + 2] *= damping;
        velocity[j + 1] -= gravity * dt;
        position[j] += velocity[j] * dt;
        position[j + 1] += velocity[j + 1] * dt;
        position[j + 2] += velocity[j + 2] * dt;
        if (position[j + 1] < floor[i]) {
          position[j + 1] = floor[i];
          velocity[j + 1] = Math.abs(velocity[j + 1]) * 0.22;
        }
        // Additive sparks fade to black; sand keeps its warm, low-opacity pigment.
        if (additive) {
          const fade = Math.min(1, life[i] / duration[i] * 2.3);
          color[j] = baseColor[j] * fade;
          color[j + 1] = baseColor[j + 1] * fade;
          color[j + 2] = baseColor[j + 2] * fade;
        }
      }
      positions.needsUpdate = true;
      if (additive || dirty) colors.needsUpdate = true;
      dirty = false;
      mesh.visible = active > 0;
    },
    clear() {
      life.fill(0);
      for (let i = 0; i < capacity; i++) position[i * 3 + 1] = -10000;
      active = 0; dirty = true; mesh.visible = false;
    },
    dispose() { root.remove(mesh); geometry.dispose(); material.dispose(); },
  };
}

function makeInstancePool(root, name, capacity, confetti = false) {
  const geometry = confetti ? new THREE.PlaneGeometry(1, 1) : new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: !confetti, opacity: confetti ? 1 : 0.78,
    depthWrite: confetti, toneMapped: false,
    side: confetti ? THREE.DoubleSide : THREE.FrontSide,
    blending: confetti ? THREE.NormalBlending : THREE.AdditiveBlending,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, capacity);
  mesh.name = `aloha-fx-${name}`;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = confetti ? 1 : 3;
  mesh.visible = false;
  root.add(mesh);
  const particles = Array.from({ length: capacity }, () => ({
    life: 0, duration: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
    yaw: 0, rotation: 0, spin: 0, size: 1, length: 1, ground: 0,
  }));
  const dummy = new THREE.Object3D();
  dummy.scale.set(0, 0, 0);
  dummy.updateMatrix();
  for (let i = 0; i < capacity; i++) {
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, COLORS.white);
  }
  mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
  let cursor = 0;
  let active = 0;
  let dirty = false;

  return {
    emit(x, y, z, vx, vy, vz, seconds, tint, yaw, size, length, spin = 0, ground = y - 1) {
      const i = cursor;
      cursor = (cursor + 1) % capacity;
      const p = particles[i];
      if (p.life <= 0) active++;
      p.x = x; p.y = y; p.z = z; p.vx = vx; p.vy = vy; p.vz = vz;
      p.life = p.duration = seconds; p.yaw = yaw; p.size = size; p.length = length;
      p.spin = spin; p.rotation = yaw; p.ground = ground;
      mesh.setColorAt(i, tint);
      dirty = true;
      mesh.visible = true;
    },
    update(dt, time) {
      if (!active && !dirty) return;
      for (let i = 0; i < capacity; i++) {
        const p = particles[i];
        if (p.life <= 0) continue;
        p.life -= dt;
        if (p.life <= 0) {
          p.life = 0; active--;
          dummy.position.set(0, -10000, 0);
          dummy.scale.set(0, 0, 0);
        } else {
          p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
          const fade = Math.min(1, p.life / p.duration * (confetti ? 4 : 1.5));
          if (confetti) {
            p.vy = Math.max(-3.8, p.vy - 7 * dt);
            p.vx *= Math.exp(-0.75 * dt); p.vz *= Math.exp(-0.75 * dt);
            p.rotation += p.spin * dt;
            p.x += Math.sin(time * 3.5 + i * 1.7) * 0.8 * dt;
            if (p.y < p.ground) { p.y = p.ground; p.life = Math.min(p.life, 0.35); }
            dummy.rotation.set(p.rotation, p.yaw + p.rotation * 0.7, p.rotation * 0.45);
            dummy.scale.set(p.size * fade, p.size * 0.48 * fade, 1);
          } else {
            dummy.rotation.set(0, p.yaw, 0);
            dummy.scale.set(p.size * fade, p.size * 0.6 * fade, p.length * fade);
          }
          dummy.position.set(p.x, p.y, p.z);
        }
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (dirty) mesh.instanceColor.needsUpdate = true;
      dirty = false;
      mesh.visible = active > 0;
    },
    clear() {
      dummy.position.set(0, -10000, 0); dummy.scale.set(0, 0, 0); dummy.updateMatrix();
      for (let i = 0; i < capacity; i++) { particles[i].life = 0; mesh.setMatrixAt(i, dummy.matrix); }
      active = 0; dirty = true; mesh.instanceMatrix.needsUpdate = true; mesh.visible = false;
    },
    dispose() { root.remove(mesh); mesh.dispose(); geometry.dispose(); material.dispose(); },
  };
}

/**
 * World-space kart effects. dt/time are seconds; racers use contract position/yaw.
 * Extra supported racer fields: driftCharge (0..1), driftTier/driftLevel, offroad.
 * Events accept racerId/racer/isPlayer plus an optional world-space position.
 */
export function createEffects(scene) {
  const root = new THREE.Group();
  root.name = 'aloha-effects';
  scene.add(root);
  const soft = spriteTexture();
  const star = spriteTexture(true);
  const dust = makePointPool(root, 'sand', 320, soft, 0.95, 0.29, false, -0.2, 2.4);
  const sparks = makePointPool(root, 'drift-sparks', 480, star, 0.36, 0.92, true, 6.5, 1.1);
  const pops = makePointPool(root, 'pickup-pops', 160, star, 0.56, 0.95, true, 3.2, 1.2);
  const streaks = makeInstancePool(root, 'boost-streaks', 144);
  const confetti = makeInstancePool(root, 'finish-confetti', 240, true);
  const pools = [dust, sparks, pops, streaks, confetti];
  const emitters = new Map();
  let disposed = false;
  let clock = 0;
  let frame = 0;
  let lastRacers = EMPTY;

  function emitterFor(racer, index = 0) {
    const key = racer.id ?? racer;
    let e = emitters.get(key);
    if (!e) {
      e = { dust: 0, spark: 0, boost: 0, charge: 0, flashUntil: 0,
        flashLevel: 0, seen: frame, x: racer.position.x, z: racer.position.z, side: index % 2 };
      emitters.set(key, e);
    }
    e.seen = frame;
    return e;
  }

  function burst(position, tint, count, energy = 1, height = 1) {
    if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.z)) return;
    const ground = finite(position.y) + 0.08;
    for (let i = 0; i < count; i++) {
      const angle = TAU * i / count + Math.random() * 0.3;
      const velocity = (1.4 + Math.random() * 2.9) * energy;
      pops.emit(position.x, ground + height, position.z,
        Math.cos(angle) * velocity, (1.5 + Math.random() * 3) * energy,
        Math.sin(angle) * velocity, 0.38 + Math.random() * 0.45,
        i % 4 === 0 ? COLORS.white : tint, ground);
    }
  }

  function finishBurst(racer, position) {
    const yaw = finite(racer?.yaw);
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    const ground = finite(position.y) + 0.1;
    for (let i = 0; i < 160; i++) {
      const side = i % 2 ? -1 : 1;
      const spread = (Math.random() - 0.5) * 9;
      const sideways = -side * (1 + Math.random() * 4.5);
      const forward = (Math.random() - 0.2) * 6;
      confetti.emit(position.x + cos * side * 4 + sin * spread,
        ground + 1.4 + Math.random() * 2.5,
        position.z - sin * side * 4 + cos * spread,
        cos * sideways + sin * forward, 5 + Math.random() * 7,
        -sin * sideways + cos * forward,
        2.2 + Math.random() * 2, CONFETTI[i % CONFETTI.length],
        Math.random() * TAU, 0.13 + Math.random() * 0.17, 1,
        (Math.random() - 0.5) * 14, ground);
    }
    burst(position, COLORS.gold, 32, 1.2, 2);
  }

  function update(dt, time, racers = EMPTY) {
    if (disposed) return;
    dt = clamp(finite(dt), 0, 0.075);
    clock = Number.isFinite(time) ? time : clock + dt;
    lastRacers = Array.isArray(racers) ? racers : EMPTY;
    frame++;
    for (let index = 0; index < lastRacers.length; index++) {
      const racer = lastRacers[index];
      const p = racer?.position;
      if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.z)) continue;
      const e = emitterFor(racer, index);
      const speed = Math.abs(finite(racer.speed));
      const player = racer.isPlayer === true || racer.id === 'player';
      // Nearby opponents retain readable trails without competing with the player.
      const importance = player ? 1 : 0.32;
      const sin = Math.sin(finite(racer.yaw)), cos = Math.cos(finite(racer.yaw));
      const floor = finite(p.y) + 0.09;
      const drifting = !!racer.drift && speed > 3 && !racer.finished;
      const boosting = (racer.boost === true || finite(racer.boost) > 0) && speed > 2;
      const distance = Math.hypot(p.x - e.x, p.z - e.z);
      if (distance > Math.max(20, speed * dt * 4)) {
        // Respawn/teleport: never connect the old position to the new one.
        e.dust = e.spark = e.boost = e.charge = 0;
      }
      e.x = p.x; e.z = p.z;
      e.charge = drifting ? e.charge + dt : 0;
      const charge = finite(racer.driftCharge, e.charge);
      const pink = finite(racer.driftTier ?? racer.driftLevel) >= 2
        || (Number.isFinite(racer.driftCharge) ? charge >= 0.58 : charge >= 1.3)
        || (e.flashUntil > clock && e.flashLevel >= 2);
      const sparkTint = pink ? COLORS.pink : COLORS.blue;
      const sparkHighlight = pink ? COLORS.pinkWhite : COLORS.blueWhite;

      if (speed > 3 && !racer.finished) {
        e.dust += dt * (drifting ? 56 : racer.offroad ? 32 : 13) * importance
          * clamp(speed / 18, 0.25, 1.4);
        for (let n = Math.min(12, Math.floor(e.dust)); n > 0; n--) {
          e.dust--;
          const side = (e.side++ % 2 ? 1 : -1) * 1.02;
          const back = -1.35 - Math.random() * 0.4;
          dust.emit(p.x + cos * side + sin * back, floor + 0.05,
            p.z - sin * side + cos * back,
            -sin * speed * 0.1 + cos * side * (drifting ? 1.8 : 0.5),
            0.35 + Math.random() * 0.7,
            -cos * speed * 0.1 - sin * side * (drifting ? 1.8 : 0.5),
            (player ? 0.62 : 0.42) + Math.random() * 0.2,
            n % 3 ? COLORS.sand : COLORS.sandLight, floor);
        }
      } else e.dust = 0;

      if (drifting || e.flashUntil > clock) {
        e.spark += dt * (pink ? 112 : 74) * importance;
        for (let n = Math.min(18, Math.floor(e.spark)); n > 0; n--) {
          e.spark--;
          const side = e.side++ % 2 ? 1 : -1;
          const outward = side * (1.5 + Math.random() * 2.7);
          const back = 2.2 + Math.random() * 4;
          sparks.emit(p.x + cos * side * 1.1 - sin * 1.32,
            floor + 0.13, p.z - sin * side * 1.1 - cos * 1.32,
            cos * outward - sin * back, 0.6 + Math.random() * 1.8,
            -sin * outward - cos * back, 0.22 + Math.random() * 0.26,
            n % 3 ? sparkTint : sparkHighlight, floor);
        }
      } else e.spark = 0;

      if (boosting) {
        e.boost += dt * 65 * importance;
        for (let n = Math.min(12, Math.floor(e.boost)); n > 0; n--) {
          e.boost--;
          const side = (e.side++ % 2 ? 1 : -1) * (0.55 + Math.random() * 0.3);
          const back = -1.85 - Math.random() * 0.7;
          streaks.emit(p.x + cos * side + sin * back,
            floor + 0.3 + Math.random() * 0.42, p.z - sin * side + cos * back,
            -sin * 8, 0.05, -cos * 8,
            player ? 0.26 + Math.random() * 0.12 : 0.22,
            e.side % 3 === 0 ? COLORS.teal : COLORS.orange, finite(racer.yaw),
            player ? 0.10 + Math.random() * 0.09 : 0.07,
            clamp(speed * 0.07, 0.65, 3.2));
        }
      } else e.boost = 0;
    }
    for (const pool of pools) pool.update(dt, clock);
    if (frame % 120 === 0) {
      for (const [key, e] of emitters) if (frame - e.seen > 120) emitters.delete(key);
    }
  }

  function event(evt, racers = lastRacers) {
    if (disposed || !evt) return;
    if (typeof evt === 'string') evt = { type: evt };
    const list = Array.isArray(racers) ? racers : lastRacers;
    const type = evt.type;
    if (type === 'reset' || type === 'restart' || type === 'menu') {
      for (const pool of pools) pool.clear();
      emitters.clear();
      return;
    }
    const id = evt.racerId ?? evt.racer?.id ?? (typeof evt.racer === 'string' ? evt.racer : undefined);
    const racer = (evt.racer?.position ? evt.racer : null)
      ?? (id != null ? list.find((r) => r.id === id) : list.find((r) => r.isPlayer || r.id === 'player'));
    const position = evt.position ?? racer?.position;
    if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.z)) return;
    const player = evt.isPlayer ?? (racer ? !!(racer.isPlayer || racer.id === 'player') : id == null || id === 'player');
    switch (type) {
      case 'coin': burst(position, COLORS.gold, player ? 22 : 7, 0.8, 1.2); break;
      case 'item': burst(position, COLORS.teal, player ? 28 : 9, 1, 1.6); break;
      case 'boost': burst(position, COLORS.orange, player ? 20 : 6, 0.7, 0.45); break;
      case 'drift':
      case 'drift-charge':
      case 'driftCharge': {
        if (racer) {
          const e = emitterFor(racer);
          e.flashUntil = clock + 0.4;
          e.flashLevel = finite(evt.tier ?? evt.level ?? evt.stage, finite(evt.charge) >= 0.58 ? 2 : 1);
          burst(position, e.flashLevel >= 2 ? COLORS.pink : COLORS.blue,
            player ? 20 : 6, 0.65, 0.25);
        }
        break;
      }
      case 'hit': burst(position, COLORS.white, player ? 18 : 7, 1.1, 0.8); break;
      case 'lap': if (player) burst(position, COLORS.teal, 30, 1.2, 2); break;
      case 'go': if (player) burst(position, COLORS.teal, 24, 0.8, 0.65); break;
      case 'finish': if (player) finishBurst(racer, position); break;
      default: break;
    }
    // Events remain visible even when the simulation stops updating on finish.
    for (const pool of pools) pool.update(0, clock);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    for (const pool of pools) pool.dispose();
    soft.dispose(); star.dispose(); emitters.clear();
    lastRacers = EMPTY;
    scene.remove(root);
  }

  return { update, event, dispose };
}
