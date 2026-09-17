import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { GameState } from "../core/state";
import type { Actor, Enemy } from "../actors/actor";
import type { AudioSystem } from "../presentation/audio";
import type { Effects } from "../presentation/effects";
import { SKILLS } from "../data/content";
import { clamp, distance, angleLerp } from "../core/math";
import { heightAt } from "../world/terrain";
export class Combat {
  onToast: (t: string) => void = () => {};
  onNumber: (p: Vector3, text: string, heal?: boolean) => void = () => {};
  onHurt: () => void = () => {};
  lastCombat = -10;
  private attackAt = 0;
  constructor(
    public state: GameState,
    public player: Actor,
    public enemies: Enemy[],
    public audio: AudioSystem,
    public effects: Effects,
  ) {}
  get target() {
    return this.enemies.find((e) => e.id === this.state.targetId) || null;
  }
  select(id: string | null) {
    this.state.targetId = id;
    this.state.autoAttack = false;
    this.state.emit();
    if (id) this.audio.play("metalClick", 0.3);
  }
  nextTarget() {
    const candidates = this.enemies
      .filter(
        (e) =>
          e.hp > 0 && distance(e.actor.position, this.player.position) < 45,
      )
      .sort(
        (a, b) =>
          distance(a.actor.position, this.player.position) -
          distance(b.actor.position, this.player.position),
      );
    if (!candidates.length) {
      this.onToast("附近没有可选择的目标");
      return;
    }
    const ix = candidates.findIndex((e) => e.id === this.state.targetId);
    this.select(candidates[(ix + 1) % candidates.length].id);
  }
  use(id: string) {
    const state = this.state;
    if (!state.started || state.dead) return;
    const skill = SKILLS.find((s) => s.id === id);
    if (!skill) return;
    const now = state.time;
    // Auto-attack is a command toggle, not a cooldown-gated skill.
    if (id === "attack") {
      if (state.paused) return;
      if (!this.target || this.target.hp <= 0) this.nextTarget();
      if (!this.target) return;
      state.autoAttack = !state.autoAttack;
      if (distance(this.target.actor.position, this.player.position) > 3.1)
        this.onToast("已选中目标，靠近至 3 米内攻击");
      state.emit();
      return;
    }
    if ((state.cooldowns[id] || 0) > now) {
      this.onToast("技能尚未准备好");
      return;
    }
    if (id === "potion") {
      if (state.data.potions < 1) {
        this.onToast("药水用尽，去找军需官补给");
        return;
      }
      if (state.data.hp >= state.maxHp) {
        this.onToast("生命值已满");
        return;
      }
      state.data.potions--;
      state.heal(55);
      state.cooldowns[id] = now + skill.cooldown;
      this.audio.play("cloth1", 0.7);
      this.effects.burst(this.player.position, true);
      this.onNumber(this.player.position, "+55", true);
      this.onToast("使用治疗药水 · 恢复 55 生命");
      state.emit();
      return;
    }
    if (state.paused) return;
    const target = this.target;
    if (!target || target.hp <= 0) {
      this.onToast("先点击森林狼或按 Tab 选择目标");
      return;
    }
    if (distance(target.actor.position, this.player.position) > 3.3) {
      this.onToast("距离太远，需要靠近目标");
      return;
    }
    if (state.rage < skill.cost) {
      this.onToast(`怒气不足，需要 ${skill.cost} 点怒气`);
      return;
    }
    state.rage -= skill.cost;
    state.cooldowns[id] = now + skill.cooldown;
    if (id === "shield") {
      this.hit(target, 24);
      target.stunUntil = now + 2;
      this.player.play("Block", now, 0.55);
      this.audio.play("impactMetal_heavy_000", 0.8);
    }
    if (id === "whirl") {
      for (const e of this.enemies)
        if (e.hp > 0 && distance(e.actor.position, this.player.position) < 3.8)
          this.hit(e, 38);
      this.player.play("Attack", now, 0.65);
      this.effects.burst(this.player.position);
      this.audio.play("knifeSlice2", 0.9);
    }
    state.emit();
  }
  hit(enemy: Enemy, amount: number) {
    if (enemy.hp <= 0) return;
    const now = this.state.time;
    this.lastCombat = now;
    enemy.hp = Math.max(0, enemy.hp - amount);
    this.onNumber(enemy.actor.position, `${amount}`);
    enemy.attackAt = Math.max(enemy.attackAt, now + 0.35);
    this.effects.burst(enemy.actor.position);
    if (enemy.hp <= 0) {
      enemy.deadAt = now;
      enemy.actor.play("Death", now, 999);
      this.state.autoAttack = false;
      this.state.gainXp(30);
      this.state.log("击败森林狼 · +30 经验");
      if (this.state.data.quest === "active") {
        this.state.data.kills = clamp(this.state.data.kills + 1, 0, 3);
        this.state.questProgress();
      }
      this.audio.play("chop", 0.6);
    }
    this.state.emit();
  }
  loot(enemy: Enemy) {
    if (enemy.hp > 0 || enemy.looted) return;
    enemy.looted = true;
    this.state.data.gold += 3;
    this.audio.play("handleCoins", 0.8);
    this.state.log("拾取战利品 · 3 铜币");
    this.onToast("获得 3 铜币");
    this.state.emit();
  }
  update(dt: number) {
    const now = this.state.time,
      p = this.player.position,
      state = this.state;
    const target = this.target;
    this.effects.target(
      target?.hp && target.hp > 0 ? target.actor.position : null,
    );
    if (
      state.autoAttack &&
      target &&
      target.hp > 0 &&
      distance(target.actor.position, p) < 3.15 &&
      now >= this.attackAt
    ) {
      this.attackAt = now + 1.05;
      state.cooldowns.attack = now + 1.05;
      const dir = target.actor.position.subtract(p);
      this.player.root.rotation.y = Math.atan2(dir.x, dir.z);
      this.player.play("Attack", now, 0.72);
      this.audio.play("knifeSlice", 0.78);
      this.hit(target, 18);
      state.rage = clamp(state.rage + 12, 0, 100);
      state.emit();
    }
    for (const e of this.enemies) {
      if (e.hp <= 0) {
        if (now - e.deadAt > 15) e.actor.root.setEnabled(false);
        if (now - e.deadAt > 55 && distance(e.home, p) > 12) {
          e.hp = e.maxHp;
          e.looted = false;
          e.actor.lockUntil = 0;
          e.actor.position.copyFrom(e.home);
          e.actor.root.setEnabled(true);
          e.actor.play("Idle", now);
        }
        continue;
      }
      if (e.stunUntil > now) {
        e.actor.play("Idle", now);
        continue;
      }
      let moving = false;
      const dist = distance(e.actor.position, p),
        homeDist = distance(e.actor.position, e.home);
      if (!state.dead && dist < 7.8 && homeDist < 19) {
        const dir = p.subtract(e.actor.position);
        dir.y = 0;
        dir.normalize();
        e.actor.root.rotation.y = angleLerp(
          e.actor.root.rotation.y,
          Math.atan2(dir.x, dir.z),
          Math.min(1, dt * 7),
        );
        if (dist > 2.0) {
          e.actor.position.addInPlace(dir.scale(dt * 2.65));
          moving = true;
        } else if (now > e.attackAt) {
          e.attackAt = now + 1.75;
          e.actor.play("Attack", now, 0.62);
          state.damage(10);
          this.lastCombat = now;
          this.onNumber(p, "−10");
          this.onHurt();
          this.audio.play("chop", 0.4);
        }
      } else {
        const angle = now * 0.14 + Number(e.id.slice(-1)),
          destination = e.home.add(
            new Vector3(Math.sin(angle) * 2.1, 0, Math.cos(angle) * 2.1),
          );
        const dir = destination.subtract(e.actor.position);
        dir.y = 0;
        if (dir.length() > 0.2) {
          dir.normalize();
          e.actor.position.addInPlace(dir.scale(dt * 0.7));
          e.actor.root.rotation.y = angleLerp(
            e.actor.root.rotation.y,
            Math.atan2(dir.x, dir.z),
            Math.min(1, dt * 3),
          );
          moving = true;
        }
        if (homeDist > 18) e.hp = e.maxHp;
      }
      e.actor.position.y = heightAt(e.actor.position.x, e.actor.position.z);
      e.actor.play(moving ? "Run" : "Idle", now);
    }
    if (
      now - this.lastCombat > 9 &&
      state.data.hp < state.maxHp &&
      !state.dead
    ) {
      state.data.hp = Math.min(state.maxHp, state.data.hp + dt * 2.5);
      state.emit();
    }
    if (now - this.lastCombat > 12 && state.rage > 0) {
      state.rage = Math.max(0, state.rage - dt * 3);
      state.emit();
    }
  }
  reset() {
    for (const e of this.enemies) {
      e.actor.position.copyFrom(e.home);
      e.hp = e.maxHp;
      e.actor.lockUntil = 0;
      e.actor.root.setEnabled(true);
      e.deadAt = 0;
      e.looted = false;
      e.attackAt = this.state.time + 2;
    }
    this.state.targetId = null;
    this.state.autoAttack = false;
    this.effects.target(null);
  }
}
