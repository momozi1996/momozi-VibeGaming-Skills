import test from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { createSimulation } from '../src/simulation.js';

// Clockwise circle: +Z at the line, +X is the right-hand normal.
function circleTrack(radius = 140, extras = {}) {
  const length = Math.PI * 2 * radius;
  return {
    length, width: 16, pickups: [], boosts: [], ...extras,
    sample(u, lateral = 0) {
      const theta = u * Math.PI * 2;
      return {
        position: new Vector3(radius - (radius - lateral) * Math.cos(theta), 0.2, (radius - lateral) * Math.sin(theta)),
        tangent: new Vector3(Math.sin(theta), 0, Math.cos(theta)),
        normal: new Vector3(Math.cos(theta), 0, -Math.sin(theta)), yaw: theta,
      };
    },
    nearest(x, z) {
      const angle = Math.atan2(z, radius - x);
      return { u: ((angle / (Math.PI * 2)) + 1) % 1, lateral: radius - Math.hypot(radius - x, z) };
    },
  };
}

function fixture(track = circleTrack()) {
  const events = [];
  const simulation = createSimulation(track, { onEvent: event => events.push(event) });
  return { simulation, track, events, player: simulation.racers[0] };
}
function begin(simulation) { simulation.start(); simulation.update(3); }
function advance(simulation, seconds, input = {}, step = 1 / 60) {
  for (let remaining = seconds; remaining > 1e-8; remaining -= step) simulation.update(Math.min(step, remaining), input);
}
function alone(simulation, except = null) {
  for (const racer of simulation.racers.slice(1)) {
    if (racer !== except) { racer.finished = true; racer.finishTime = Infinity; }
  }
}
const almost = (actual, expected, epsilon = 1e-7) => assert.ok(Math.abs(actual - expected) < epsilon, `${actual} ≈ ${expected}`);

test('contract: 8 stable racers, exact characters, fresh state and defensive inputs', () => {
  const { simulation } = fixture();
  const references = [...simulation.racers];
  const positions = references.map(racer => racer.position);
  assert.equal(simulation.racers.length, 8);
  assert.deepEqual(simulation.racers.map(r => r.id), ['player', 'ai0', 'ai1', 'ai2', 'ai3', 'ai4', 'ai5', 'ai6']);
  assert.ok(simulation.racers.every(r => ['mochi', 'mango', 'luna', 'oreo', 'sakura', 'coco'].includes(r.characterId)));
  assert.ok(simulation.racers.every(r => r.position instanceof Vector3 && r.progress < 0 && r.lap === 1));
  simulation.reset('sakura');
  assert.equal(simulation.racers[0].characterId, 'sakura');
  simulation.racers.forEach((r, i) => { assert.equal(r, references[i]); assert.equal(r.position, positions[i]); });
  simulation.update(NaN, null);
  simulation.update(Infinity, { steer: NaN });
  simulation.update(-1);
  assert.equal(simulation.state.elapsed, 0);
  assert.equal(simulation.state.phase, 'menu');
  simulation.reset('not-a-cat');
  assert.equal(simulation.racers[0].characterId, 'mochi');
  assert.throws(() => createSimulation({ length: 0 }), /track/);
});

test('countdown emits 3, 2, 1, GO; pause restores the exact countdown and racing clock', () => {
  const { simulation, events, player } = fixture();
  simulation.start();
  simulation.update(1);
  assert.equal(simulation.state.countdown, 2);
  assert.equal(simulation.state.elapsed, 0);
  const progress = player.progress;
  simulation.togglePause();
  simulation.update(5, { throttle: 1 });
  assert.equal(simulation.state.phase, 'paused');
  assert.equal(simulation.state.countdown, 2);
  assert.equal(player.progress, progress);
  assert.equal(simulation.togglePause(), 'countdown');
  simulation.update(1);
  simulation.update(1.2, { throttle: 1 });
  assert.equal(simulation.state.phase, 'racing');
  almost(simulation.state.elapsed, 0.2);
  assert.deepEqual(events.filter(e => e.type === 'countdown').map(e => e.value), [3, 2, 1]);
  assert.equal(events.filter(e => e.type === 'go').length, 1);
  const frozen = simulation.getSnapshot();
  const position = player.position.clone();
  simulation.togglePause(); simulation.update(8, { throttle: 1, drift: true, item: true });
  almost(simulation.state.elapsed, frozen.elapsed);
  assert.ok(player.position.equals(position));
  assert.equal(simulation.togglePause(), 'racing');
  simulation.update(0.1, { throttle: 1 });
  almost(simulation.state.elapsed, 0.3);
});

test('manual throttle is not auto-driving; explicit assist follows the course', () => {
  const manual = fixture(); begin(manual.simulation);
  advance(manual.simulation, 1, {});
  assert.equal(manual.player.speed, 0);
  advance(manual.simulation, 9, { throttle: 1 });
  assert.equal(manual.player.offroad, true);
  const assisted = fixture(); begin(assisted.simulation);
  advance(assisted.simulation, 10, { assist: true });
  assert.equal(assisted.player.offroad, false);
  assert.ok(Math.abs(assisted.player.lateral) < 6);
  assert.ok(assisted.player.progress > manual.player.progress + 0.08);
});

test('positive steering turns right, negative turns left, brake slows and controls remain analog', () => {
  const right = fixture(circleTrack(1000)); begin(right.simulation); alone(right.simulation);
  const left = fixture(circleTrack(1000)); begin(left.simulation); alone(left.simulation);
  for (const f of [right, left]) { f.player.speed = 24; f.player.lateral = 0; }
  advance(right.simulation, 0.5, { throttle: 1, steer: 0.6 });
  advance(left.simulation, 0.5, { throttle: 1, steer: -0.6 });
  assert.ok(right.player.heading > 0.15 && right.player.lateral > 0.5);
  assert.ok(left.player.heading < -0.15 && left.player.lateral < -0.5);
  const before = right.player.speed;
  advance(right.simulation, 0.5, { brake: 1 });
  assert.ok(right.player.speed < before - 15);
});

test('drift charges in a turn, announces tiers, and releases a temporary boost', () => {
  const { simulation, player, events } = fixture(); begin(simulation); alone(simulation);
  player.speed = 25; player.lateral = 0;
  advance(simulation, 0.85, { throttle: 1, steer: 0.3, drift: true });
  assert.equal(player.drift, true);
  assert.ok(player.driftCharge > 0.3);
  assert.ok(events.some(e => e.type === 'drift' && e.action === 'charge' && e.tier === 1));
  simulation.update(1 / 60, { throttle: 1, steer: 0.15, drift: false });
  assert.equal(player.drift, false);
  assert.equal(player.driftCharge, 0);
  assert.ok(player.boost > 0.7);
  assert.ok(events.some(e => e.type === 'boost' && e.source === 'drift'));
  advance(simulation, 1, { throttle: 1, assist: true });
  assert.equal(player.boost, 0);
});

test('holding drift in a straight line does not farm boost', () => {
  const { simulation, player } = fixture(circleTrack(1000)); begin(simulation); alone(simulation);
  player.speed = 25; player.lateral = 0;
  advance(simulation, 1, { throttle: 1, drift: true, steer: 0 });
  assert.equal(player.driftCharge, 0);
  simulation.update(1 / 60, { throttle: 1 });
  assert.equal(player.boost, 0);
});

test('coins/items collect by proximity, cooldown is simulation-owned and pauses freeze it', () => {
  const track = circleTrack();
  const u = ((-24 / track.length) + 1) % 1;
  track.pickups.push({ u, lateral: 2.4, kind: 'coin', active: true, respawn: 0 });
  track.pickups.push({ u, lateral: 2.4, kind: 'item', active: true, respawn: 0 });
  const { simulation, player, events } = fixture(track); begin(simulation); alone(simulation);
  simulation.update(1 / 60);
  assert.equal(player.coins, 1);
  assert.ok(['boost', 'shield', 'projectile'].includes(player.item));
  assert.ok(track.pickups.every(pickup => pickup.active === false && pickup.respawn > 0));
  assert.ok(events.some(e => e.type === 'coin' && e.racerId === 'player'));
  const cooldown = track.pickups[0].respawn;
  simulation.togglePause(); simulation.update(3); simulation.togglePause();
  assert.equal(track.pickups[0].respawn, cooldown);
  advance(simulation, 7.2, { assist: true });
  assert.ok(track.pickups.every(pickup => pickup.active && pickup.respawn === 0));
  simulation.reset();
  assert.ok(track.pickups.every(pickup => pickup.active && pickup.respawn === 0));
});

test('item input is edge-triggered; boost and shield work and cannot be spent while paused', () => {
  const { simulation, player, events } = fixture(); begin(simulation);
  player.item = 'boost';
  simulation.update(0, { item: true });
  assert.equal(player.item, null);
  assert.equal(player.boost, 2.5);
  player.item = 'shield';
  simulation.update(0, { item: true });
  assert.equal(player.item, 'shield');
  simulation.update(0, { item: false });
  simulation.togglePause();
  assert.equal(simulation.useItem(), false);
  assert.equal(player.item, 'shield');
  simulation.togglePause();
  simulation.update(0, { item: true });
  assert.equal(player.shield, 6);
  assert.equal(player.item, null);
  assert.equal(events.filter(e => e.type === 'item' && e.action === 'use').length, 2);
  simulation.start(); simulation.update(3); player.item = 'boost';
  simulation.update(0, { item: true });
  assert.equal(player.item, null, 'restart clears the old key latch');
});

for (const shield of [false, true]) {
  test(`projectiles travel, home and ${shield ? 'are blocked by a shield' : 'hit and slow another kart'}`, () => {
    const { simulation, player, track, events } = fixture(); begin(simulation);
    const target = simulation.racers[1]; alone(simulation, target);
    player.lateral = 0; player.speed = 24;
    target._distance = player._distance + 28; target.lateral = 0; target.heading = 0; target.speed = 25;
    target.position.copy(track.sample(((target._distance / track.length) + 1) % 1).position);
    target.coins = 5; target.shield = shield ? 6 : 0;
    player.item = 'projectile';
    assert.equal(simulation.useItem(), true);
    assert.equal(simulation.projectiles.length, 1);
    let hit;
    for (let i = 0; i < 120; i++) {
      simulation.update(1 / 120, { assist: true });
      hit = events.find(e => e.type === 'hit' && e.source === 'projectile' && e.racerId === target.id);
      if (hit) break;
    }
    assert.ok(hit, 'projectile should reach the kart ahead');
    assert.equal(hit.blocked, shield);
    assert.equal(target.coins, shield ? 5 : 3);
    assert.equal(target.shield, 0);
    assert.equal(simulation.projectiles.length, 0);
    if (!shield) assert.ok(target.speed < 25);
  });
}

test('boost pads activate once on entry, rather than on every physics tick', () => {
  const track = circleTrack();
  track.boosts.push({ u: ((-24 / track.length) + 1) % 1, lateral: 2.4, width: 4, length: 8 });
  const { simulation, player, events } = fixture(track); begin(simulation); alone(simulation);
  advance(simulation, 0.25, { throttle: 1 });
  assert.ok(player.boost > 0.7);
  assert.equal(events.filter(e => e.type === 'boost' && e.source === 'pad').length, 1);
  advance(simulation, 1.5, { assist: true });
  assert.equal(events.filter(e => e.type === 'boost' && e.source === 'pad').length, 1);
});

test('sand is slower; respawn centers safely without granting checkpoints or a boost', () => {
  const road = fixture(circleTrack(1000)); begin(road.simulation); alone(road.simulation);
  const sand = fixture(circleTrack(1000)); begin(sand.simulation); alone(sand.simulation);
  road.player.speed = sand.player.speed = 35;
  road.player.lateral = 0; sand.player.lateral = 12;
  advance(road.simulation, 0.6, { throttle: 1 });
  advance(sand.simulation, 0.6, { throttle: 1 });
  assert.ok(sand.player.speed < road.player.speed - 10);
  const progress = sand.player.progress;
  const checkpoint = sand.player._nextCheckpoint;
  sand.player.heading = 1; sand.player.item = 'shield'; sand.player.boost = 2;
  sand.player.drift = true; sand.player._driftSeconds = 2;
  sand.simulation.update(0, { reset: true });
  assert.equal(sand.player.lateral, 0);
  assert.equal(sand.player.heading, 0);
  assert.equal(sand.player.progress, progress);
  assert.equal(sand.player._nextCheckpoint, checkpoint);
  assert.equal(sand.player.boost, 0);
  assert.equal(sand.player.drift, false);
  assert.equal(sand.player.item, 'shield');
  advance(sand.simulation, 0.8, { throttle: 1, assist: true, reset: true });
  assert.ok(sand.player.speed > 4, 'a held respawn button must not reset every frame');
});

test('kart contacts separate overlapping karts and report a knock', () => {
  const { simulation, player, events } = fixture(); begin(simulation);
  const other = simulation.racers[1]; alone(simulation, other);
  player.lateral = 0; player.speed = 30;
  other.lateral = 0.1; other._distance = player._distance + 2; other.speed = 18;
  simulation.update(1 / 60, { throttle: 1 });
  assert.ok(events.some(e => e.type === 'hit' && e.source === 'contact'));
  assert.ok(Math.abs(player.lateral - other.lateral) > 0.1);
  assert.ok(player.speed < 29);
});

test('reverse movement and respawn cannot farm start-line laps or forged progress', () => {
  const { simulation, player } = fixture(circleTrack(1000)); begin(simulation); alone(simulation);
  const start = player.progress;
  player.speed = 20; player.heading = Math.PI; player.lateral = 0;
  advance(simulation, 0.5, {});
  assert.ok(player.progress < start);
  assert.equal(player.lap, 1);
  assert.equal(player._nextCheckpoint, 0);
  player.progress = 900;
  simulation.update(0, { reset: true });
  assert.ok(player.progress < 0);
  assert.equal(player.lap, 1);
  assert.equal(player._nextCheckpoint, 0);
});

test('a complete race has correct ordered checkpoints, ranks and meaningful estimated results', () => {
  const { simulation, player, events } = fixture(); begin(simulation);
  for (let i = 0; i < 100 * 30 && simulation.state.phase === 'racing'; i++) simulation.update(1 / 30, { assist: true });
  assert.equal(simulation.state.phase, 'finished');
  assert.equal(player.progress, 3);
  assert.equal(player._nextCheckpoint, 73);
  assert.equal(player.lap, 3);
  assert.ok(player.rank <= 3, 'player must be competitive without secret speed boosts');
  assert.ok(simulation.state.finishTime > 55 && simulation.state.finishTime < 90);
  almost(simulation.state.elapsed, simulation.state.finishTime);
  assert.equal(simulation.state.results.length, 8);
  assert.deepEqual(simulation.state.results.map(r => r.position), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.ok(simulation.state.results.some(r => r.estimated));
  for (const result of simulation.state.results) {
    assert.ok(Number.isFinite(result.time) && result.time > 0);
    if (result.estimated) assert.ok(result.time > simulation.state.finishTime);
  }
  assert.deepEqual(events.filter(e => e.type === 'lap' && e.isPlayer).map(e => e.completedLaps), [1, 2, 3]);
  assert.equal(events.filter(e => e.type === 'finish' && e.isPlayer).length, 1);
  const finishTime = simulation.state.elapsed;
  simulation.update(10, { assist: true });
  assert.equal(simulation.state.elapsed, finishTime);
  simulation.reset('coco');
  assert.equal(simulation.state.phase, 'menu');
  assert.equal(simulation.state.finishTime, null);
  assert.deepEqual(simulation.state.results, []);
  assert.equal(simulation.projectiles.length, 0);
  assert.ok(simulation.racers.every(r => !r.finished && r.lap === 1 && r.progress < 0));
});

test('AI hold varied road lanes and fixed substeps agree at 30/120 fps', () => {
  const a = fixture(); const b = fixture(); begin(a.simulation); begin(b.simulation);
  advance(a.simulation, 12, { assist: true }, 1 / 30);
  advance(b.simulation, 12, { assist: true }, 1 / 120);
  almost(a.player.progress, b.player.progress, 1e-6);
  almost(a.player.speed, b.player.speed, 1e-5);
  const ai = a.simulation.racers.slice(1);
  assert.ok(ai.every(r => Math.abs(r.lateral) < 7.2 && r.speed > 24 && r.speed < 43));
  assert.ok(new Set(ai.map(r => Math.round(r.lateral))).size >= 4);
});
