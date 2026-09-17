import { clamp } from "./math.ts";
export type QuestStage = "available" | "active" | "return" | "complete";
export interface SaveData {
  version: 1;
  level: number;
  xp: number;
  hp: number;
  gold: number;
  potions: number;
  herbs: number;
  kills: number;
  quest: QuestStage;
  position: { x: number; z: number };
  elapsed: number;
}
export const SAVE_KEY = "northshire.save.v1";
export const initialSave = (): SaveData => ({
  version: 1,
  level: 1,
  xp: 0,
  hp: 100,
  gold: 0,
  potions: 3,
  herbs: 0,
  kills: 0,
  quest: "available",
  position: { x: 0, z: -27 },
  elapsed: 0,
});
export function parseSave(raw: string | null): SaveData | null {
  try {
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (
      d.version !== 1 ||
      !["available", "active", "return", "complete"].includes(d.quest)
    )
      return null;
    for (const k of [
      "level",
      "xp",
      "hp",
      "gold",
      "potions",
      "herbs",
      "kills",
      "elapsed",
    ])
      if (typeof d[k] !== "number" || !Number.isFinite(d[k]) || d[k] < 0)
        return null;
    if (
      !d.position ||
      !Number.isFinite(d.position.x) ||
      !Number.isFinite(d.position.z)
    )
      return null;
    return {
      ...d,
      level: clamp(Math.floor(d.level), 1, 3),
      hp: clamp(d.hp, 0, 100 + (clamp(Math.floor(d.level), 1, 3) - 1) * 20),
      potions: clamp(Math.floor(d.potions), 0, 99),
      herbs: clamp(Math.floor(d.herbs), 0, 2),
      kills: clamp(Math.floor(d.kills), 0, 3),
      position: {
        x: clamp(d.position.x, -70, 70),
        z: clamp(d.position.z, -88, 60),
      },
    };
  } catch {
    return null;
  }
}
export class GameState {
  data = initialSave();
  rage = 0;
  started = false;
  paused = false;
  dead = false;
  targetId: string | null = null;
  autoAttack = false;
  time = 0;
  cooldowns: Record<string, number> = {};
  listeners = new Set<() => void>();
  lastSave = 0;
  logs: string[] = ["北郡的钟声从林间传来。"];
  get maxHp() {
    return 100 + (this.data.level - 1) * 20;
  }
  get xpGoal() {
    return this.data.level * 100;
  }
  get questReady() {
    return this.data.kills >= 3 && this.data.herbs >= 2;
  }
  emit() {
    this.listeners.forEach((f) => f());
  }
  log(text: string) {
    this.logs.push(text);
    this.logs = this.logs.slice(-20);
    this.emit();
  }
  load() {
    try {
      return parseSave(localStorage.getItem(SAVE_KEY));
    } catch {
      return null;
    }
  }
  save() {
    if (!this.started) return false;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
      this.lastSave = this.time;
      return true;
    } catch {
      return false;
    }
  }
  start(continueGame = false) {
    const old = continueGame ? this.load() : null;
    this.data = old || initialSave();
    if (this.data.hp <= 0) this.data.hp = this.maxHp;
    this.started = true;
    this.dead = false;
    this.rage = 0;
    this.emit();
  }
  questProgress() {
    if (this.data.quest === "active" && this.questReady) {
      this.data.quest = "return";
      this.log("任务目标已完成。返回修道院，向守卫报告。");
    }
    this.emit();
  }
  gainXp(amount: number) {
    this.data.xp += amount;
    while (this.data.xp >= this.xpGoal && this.data.level < 3) {
      this.data.xp -= this.xpGoal;
      this.data.level++;
      this.data.hp = this.maxHp;
      this.log(`你升到了 ${this.data.level} 级。生命值已恢复。`);
    }
    this.data.xp = Math.min(this.data.xp, this.xpGoal);
    this.emit();
  }
  damage(n: number) {
    if (this.dead) return;
    this.data.hp = Math.max(0, this.data.hp - n);
    this.rage = clamp(this.rage + n * 0.6, 0, 100);
    if (this.data.hp <= 0) {
      this.dead = true;
      this.autoAttack = false;
      this.log("你倒下了。修道院的守卫会接应你。");
    }
    this.emit();
  }
  heal(n: number) {
    this.data.hp = Math.min(this.maxHp, this.data.hp + n);
    this.emit();
  }
}
