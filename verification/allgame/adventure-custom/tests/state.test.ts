import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  GameState,
  initialSave,
  parseSave,
  SAVE_KEY,
} from "../src/core/state.ts";

const storage = new Map<string, string>();
beforeEach(() => {
  storage.clear();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
});

test("fresh saves do not share nested position state", () => {
  const a = initialSave(),
    b = initialSave();
  a.position.x = 10;
  assert.equal(b.position.x, 0);
  assert.equal(b.quest, "available");
});
test("save parser rejects malformed, unsupported and nonfinite input", () => {
  for (const raw of [
    null,
    "",
    "{broken",
    "null",
    "{}",
    JSON.stringify({ ...initialSave(), version: 2 }),
    JSON.stringify({ ...initialSave(), gold: -1 }),
    JSON.stringify({ ...initialSave(), quest: "unknown" }),
    JSON.stringify({ ...initialSave(), position: { x: "30", z: 0 } }),
    JSON.stringify({ ...initialSave(), hp: Infinity }),
  ])
    assert.equal(parseSave(raw), null);
});
test("save parser clamps health to current level, counts and world coordinates", () => {
  const d = parseSave(
    JSON.stringify({
      ...initialSave(),
      level: 1,
      hp: 500,
      potions: 120.5,
      kills: 90,
      herbs: 9,
      position: { x: 200, z: -300 },
    }),
  )!;
  assert.equal(d.hp, 100);
  assert.equal(d.potions, 99);
  assert.equal(d.kills, 3);
  assert.equal(d.herbs, 2);
  assert.deepEqual(d.position, { x: 70, z: -88 });
});
test("quest only enters return stage when BOTH objectives are met", () => {
  const s = new GameState();
  s.data.quest = "active";
  s.data.kills = 3;
  s.questProgress();
  assert.equal(s.data.quest, "active");
  s.data.herbs = 2;
  s.questProgress();
  assert.equal(s.data.quest, "return");
});
test("available and completed quests cannot be reactivated by objective updates", () => {
  const s = new GameState();
  s.data.kills = 3;
  s.data.herbs = 2;
  s.questProgress();
  assert.equal(s.data.quest, "available");
  s.data.quest = "complete";
  s.questProgress();
  assert.equal(s.data.quest, "complete");
});
test("XP from the playable quest causes one level-up and full healing", () => {
  const s = new GameState();
  s.start();
  s.damage(35);
  for (let i = 0; i < 3; i++) s.gainXp(30);
  assert.equal(s.data.level, 1);
  s.gainXp(80);
  assert.equal(s.data.level, 2);
  assert.equal(s.data.xp, 70);
  assert.equal(s.data.hp, 120);
});
test("large XP grants respect the demo level cap and do not overflow the UI bar", () => {
  const s = new GameState();
  s.gainXp(10000);
  assert.equal(s.data.level, 3);
  assert(s.data.xp <= s.xpGoal);
});
test("damage and healing are bounded, death disables auto-attack", () => {
  const s = new GameState();
  s.autoAttack = true;
  s.damage(200);
  assert(s.dead);
  assert.equal(s.data.hp, 0);
  assert.equal(s.autoAttack, false);
  assert.equal(s.rage, 100);
  s.damage(10);
  assert.equal(s.data.hp, 0);
  const other = new GameState();
  other.damage(30);
  other.heal(200);
  assert.equal(other.data.hp, 100);
});
test("save/load and continue preserve quest and position", () => {
  const s = new GameState();
  assert.equal(s.save(), false);
  s.start();
  s.data.quest = "return";
  s.data.position = { x: 29, z: -23 };
  assert(s.save());
  const s2 = new GameState();
  s2.start(true);
  assert.equal(s2.data.quest, "return");
  assert.deepEqual(s2.data.position, { x: 29, z: -23 });
  assert(storage.has(SAVE_KEY));
});
test("blocked browser storage does not crash loading or saving", () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() {
      throw Error("storage disabled");
    },
  });
  const s = new GameState();
  s.start(true);
  assert.equal(s.data.quest, "available");
  assert.equal(s.save(), false);
});
test("death save resumes at full health instead of getting stuck dead", () => {
  const s = new GameState();
  s.start();
  s.data.level = 2;
  s.damage(200);
  s.save();
  const t = new GameState();
  t.start(true);
  assert(!t.dead);
  assert.equal(t.data.hp, 120);
});
test("log history stays bounded", () => {
  const s = new GameState();
  for (let i = 0; i < 60; i++) s.log(String(i));
  assert.equal(s.logs.length, 20);
  assert.equal(s.logs.at(-1), "59");
});
