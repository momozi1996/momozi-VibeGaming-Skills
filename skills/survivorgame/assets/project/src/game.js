import {
  W,
  H,
  clamp,
  dist,
  rng,
  sprite,
  ellipse,
  line,
  text,
  glow,
  star,
  sky,
  grass,
  frame,
  round,
  Effects,
  botanical,
  butterfly,
} from "./art.js";
export class Game {
  constructor(p, api) {
    this.p = p;
    this.api = api;
    this.r = rng(p.seed);
    this.time = 0;
    this.player = {
      x: 640,
      y: 435,
      hp: 100,
      max: 100,
      speed: 205,
      damage: 24,
      rate: 0.55,
      shots: 1,
    };
    this.enemies = [];
    this.bullets = [];
    this.gems = [];
    this.fx = new Effects();
    this.kills = 0;
    this.level = 1;
    this.xp = 0;
    this.need = 7;
    this.fire = 0;
    this.spawn = 0.3;
    this.inv = 0;
    this.dashCD = 0;
    this.dash = 0;
    this.pulseCD = 0;
    this.boss = false;
    this.finished = false;
    this.lastDir = { x: 1, y: 0 };
    this.scenery = [];
    let r = rng(p.seed);
    for (let i = 0; i < 85; i++) {
      let x = r() * W,
        y = 210 + r() * H;
      if (x < 150 || x > 1150 || y > 740 || y < 275)
        this.scenery.push({
          x,
          y,
          size: 80 + r() * 110,
          id: i % 6 === 0 ? "blossom" : p.tree,
        });
    }
    this.scenery.sort((a, b) => a.y - b.y);
  }
  start() {
    this.api.toast("收集星砂，选择祝福；坚持到守门人出现。");
  }
  action(id) {
    if (id === "pulse" && this.pulseCD <= 0) {
      this.pulseCD = 12;
      this.api.audio.play("build");
      this.fx.burst(this.player.x, this.player.y, "#f8d695", 45);
      for (let e of this.enemies)
        if (dist(e, this.player) < 230) {
          e.hp -= 90;
          let a = Math.atan2(e.y - this.player.y, e.x - this.player.x);
          e.x += Math.cos(a) * 70;
          e.y += Math.sin(a) * 70;
        }
      this.ring = 0.7;
    }
  }
  toolbar() {
    this.api.setToolbar([
      {
        id: "pulse",
        label:
          this.pulseCD > 0
            ? `星环 · ${Math.ceil(this.pulseCD)}s`
            : "E 星环绽放",
        disabled: this.pulseCD > 0,
      },
    ]);
  }
  hud() {
    return [
      [
        "生命",
        Math.max(0, Math.ceil(this.player.hp)) + " / " + this.player.max,
      ],
      ["星光祝福", "Lv. " + this.level],
      [
        "夜行时间",
        Math.floor(this.time / 60) +
          ":" +
          String(Math.floor(this.time % 60)).padStart(2, "0"),
      ],
      ["驱散梦魇", this.kills],
    ];
  }
  addEnemy(boss = false) {
    let a = this.r() * Math.PI * 2;
    let x = clamp(640 + Math.cos(a) * 650, 100, 1180),
      y = clamp(460 + Math.sin(a) * 380, 265, 725);
    if (dist({ x, y }, this.player) < 180) x = this.player.x < 640 ? 1150 : 130;
    let type = boss ? "golem" : this.r() < this.p.mothRatio ? "moth" : "slime";
    let hp = boss ? this.p.bossHP : 28 + Math.floor(this.time / 24) * 9;
    this.enemies.push({
      x,
      y,
      hp,
      max: hp,
      type,
      boss,
      speed: boss ? 47 : type === "moth" ? 72 : 43,
      phase: this.r() * 6.28,
    });
  }
  update(dt, input) {
    if (this.finished) return;
    this.time += dt;
    this.inv -= dt;
    this.dashCD -= dt;
    this.dash -= dt;
    this.pulseCD -= dt;
    this.ring = Math.max(0, (this.ring || 0) - dt);
    const p = this.player;
    let dx =
        (input.keys.has("KeyD") || input.keys.has("ArrowRight") ? 1 : 0) -
        (input.keys.has("KeyA") || input.keys.has("ArrowLeft") ? 1 : 0) +
        input.x,
      dy =
        (input.keys.has("KeyS") || input.keys.has("ArrowDown") ? 1 : 0) -
        (input.keys.has("KeyW") || input.keys.has("ArrowUp") ? 1 : 0) +
        input.y;
    let l = Math.hypot(dx, dy);
    if (l > 0) {
      dx /= Math.max(1, l);
      dy /= Math.max(1, l);
      this.lastDir = { x: dx, y: dy };
    }
    if (input.pressed.has("Space") && this.dashCD <= 0) {
      this.dash = 0.18;
      this.inv = 0.3;
      this.dashCD = 2.5;
      this.api.audio.play("jump");
    }
    if (input.pressed.has("KeyE")) this.action("pulse");
    let m = this.dash > 0 ? 3.6 : 1;
    if (this.dash > 0 && l === 0) {
      dx = this.lastDir.x;
      dy = this.lastDir.y;
    }
    p.x = clamp(p.x + dx * p.speed * m * dt, 130, 1150);
    p.y = clamp(p.y + dy * p.speed * m * dt, 280, 715);
    this.walk = l > 0 ? this.time * 10 : 0;
    if (this.dash > 0) this.fx.burst(p.x, p.y - 12, "#bde4d0", 2);
    this.spawn -= dt;
    if (this.spawn <= 0 && this.enemies.length < 80) {
      this.spawn = Math.max(0.22, 1.35 - this.time * 0.009) * this.p.spawnRate;
      this.addEnemy();
    }
    if (this.time >= this.p.duration && !this.boss) {
      this.boss = true;
      this.addEnemy(true);
      this.api.toast("守门人苏醒了 · 驱散它，天就会亮");
    }
    this.fire -= dt;
    if (this.fire <= 0 && this.enemies.length) {
      this.fire = p.rate;
      let target = this.enemies.reduce((a, b) =>
        dist(a, p) < dist(b, p) ? a : b,
      );
      let a = Math.atan2(target.y - p.y, target.x - p.x);
      for (let i = 0; i < p.shots; i++) {
        let q = a + (i - (p.shots - 1) / 2) * 0.16;
        this.bullets.push({
          x: p.x,
          y: p.y - 20,
          vx: Math.cos(q) * 500,
          vy: Math.sin(q) * 500,
          life: 2,
          damage: p.damage,
        });
      }
      this.api.audio.play("shoot");
    }
    for (let e of this.enemies) {
      let d = dist(e, p),
        a = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(a) * e.speed * dt;
      e.y += Math.sin(a) * e.speed * dt;
      if (d < (e.boss ? 46 : 24) && this.inv <= 0) {
        p.hp -= e.boss ? 24 : 10;
        this.inv = 0.8;
        this.fx.burst(p.x, p.y, "#efac9a");
        this.api.audio.play("hit");
        e.x -= Math.cos(a) * 30;
        e.y -= Math.sin(a) * 30;
      }
    }
    for (let b of this.bullets) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      for (let e of this.enemies) {
        if (e.hp > 0 && dist(b, e) < (e.boss ? 42 : 24)) {
          e.hp -= b.damage;
          b.life = 0;
          this.fx.burst(b.x, b.y, "#ffe3a3", 5);
          break;
        }
      }
    }
    this.bullets = this.bullets.filter((b) => b.life > 0);
    for (let e of this.enemies.filter((e) => e.hp <= 0)) {
      this.kills++;
      this.fx.burst(e.x, e.y, "#c9e3c5", 14);
      this.gems.push({ x: e.x, y: e.y, heal: this.kills % 11 === 0 });
      if (e.boss) {
        this.finished = true;
        this.api.finish(
          true,
          `你驱散了 ${this.kills} 只梦魇，带着 ${this.level} 级星光迎来了黎明。\n森林记住了这盏小灯。`,
        );
      }
    }
    this.enemies = this.enemies.filter((e) => e.hp > 0);
    for (let g of this.gems) {
      let d = dist(g, p);
      if (d < 105) {
        g.x += (p.x - g.x) * dt * 7;
        g.y += (p.y - g.y) * dt * 7;
      }
      if (d < 22 && !g.gone) {
        g.gone = true;
        if (g.heal) {
          p.hp = Math.min(p.max, p.hp + 20);
          this.fx.label(p.x, p.y - 65, "+20");
        } else this.xp++;
        this.api.audio.play("pick");
      }
    }
    this.gems = this.gems.filter((g) => !g.gone);
    if (this.xp >= this.need && !this.finished) {
      this.xp -= this.need;
      this.level++;
      this.need = 5 + this.level * 3;
      const options = [
        {
          icon: "✧",
          title: "星芒分岔",
          text: "多发一枚星弹（最多 5 枚）",
          kind: "shots",
        },
        { icon: "☽", title: "月火共鸣", text: "星弹伤害 +12", kind: "damage" },
        {
          icon: "❧",
          title: "森林拥抱",
          text: "生命上限 +20，恢复 45 点",
          kind: "health",
        },
        {
          icon: "⌁",
          title: "风的回信",
          text: "移动速度 +20，攻击间隔缩短",
          kind: "speed",
        },
      ];
      let offset = (this.level + this.p.seed) % 4;
      const choices = [0, 1, 2].map((i) => options[(offset + i) % 4]);
      this.api.choose(choices, (index) => {
        switch (choices[index].kind) {
          case "shots":
            p.shots = Math.min(5, p.shots + 1);
            break;
          case "damage":
            p.damage += 12;
            break;
          case "health":
            p.max += 20;
            p.hp = Math.min(p.max, p.hp + 45);
            break;
          case "speed":
            p.speed += 20;
            p.rate = Math.max(0.18, p.rate - 0.055);
            break;
        }
      });
    }
    if (p.hp <= 0 && !this.finished) {
      this.finished = true;
      this.api.finish(
        false,
        `星灯暂时熄灭了。你守护森林 ${Math.floor(this.time)} 秒，驱散 ${this.kills} 只梦魇。\n试试边移动边收集星砂，用空格冲刺脱离包围。`,
      );
    }
    this.fx.update(dt);
  }
  render(c, t, preview) {
    sky(c, t, this.p, true);
    let g = c.createLinearGradient(0, 230, 0, 800);
    g.addColorStop(0, this.p.ground);
    g.addColorStop(1, this.p.floor);
    ellipse(c, 660, 610, 880, 385, g);
    ellipse(c, 650, 486, 459, 210, "#9eb8a50b");
    ellipse(c, 650, 486, 310, 150, "#a1d4c308");
    c.strokeStyle = "#c3cfa224";
    c.lineWidth = 2;
    for (let r of [165, 340]) {
      c.beginPath();
      c.ellipse(650, 487, r, r * 0.5, 0, 0, Math.PI * 2);
      c.stroke();
    }
    let r = rng(this.p.seed);
    for (let i = 0; i < 260; i++) {
      let x = 110 + r() * 1080,
        y = 275 + r() * 465;
      grass(c, x, y, 3 + r() * 7, i % 4 ? "#abc7a22b" : "#d9d3a94d");
      if (i % 8 === 0) star(c, x, y - 3, 2, "#dfd4a8aa");
    }
    for (let s of this.scenery.filter((s) => s.y < 390))
      sprite(c, s.id, s.x, s.y, s.size);
    sprite(c, "portal", 1060, 360, 142);
    for (let [x, y] of [
      [180, 580],
      [1120, 680],
      [370, 300],
      [950, 710],
    ]) {
      sprite(c, "mushrooms", x, y, 62);
      botanical(c, x - 30, y, 35, "#87b6a3", t);
    }
    for (let [x, y] of [
      [260, 360],
      [990, 625],
    ]) {
      sprite(c, "lantern", x, y, 112);
      glow(c, x + 15, y - 76, 75, "#ffdc8e3b");
    }
    glow(c, 1060, 290, 100, "#acd9bd27");
    for (let i = 0; i < 35; i++) {
      let x = 120 + ((i * 133 + t * (i % 2 ? 6 : -3)) % 1100),
        y = 300 + ((i * 79) % 400) + Math.sin(t + i) * 15;
      star(c, x, y, 2 + Math.sin(t + i), "#e3db9e77");
    }
    if (preview) {
      sprite(c, "witch", 860, 535 + Math.sin(t * 2) * 3, 160);
      glow(c, 891, 488, 100, "#f9d2952a");
      sprite(c, "moth", 1070, 530 + Math.sin(t * 3) * 8, 95);
      sprite(c, "slime", 755, 645, 76);
      for (let i = 0; i < 7; i++)
        star(c, 820 + i * 33, 580 + Math.sin(i + t) * 30, 6, "#f3d495", t);
    } else {
      for (let g of this.gems) {
        glow(c, g.x, g.y, 17, g.heal ? "#eca88d40" : "#a1dbd230");
        star(c, g.x, g.y, 7, g.heal ? "#eead97" : "#b2e0c8", t);
      }
      let objects = [
        ...this.enemies.map((e) => ({ ...e, who: "enemy" })),
        { ...this.player, who: "player" },
      ].sort((a, b) => a.y - b.y);
      for (let o of objects) {
        if (o.who === "player") {
          if (this.inv > 0 && Math.sin(t * 40) > 0) c.globalAlpha = 0.55;
          glow(c, o.x, o.y - 30, 70, "#ffdc9a17");
          sprite(
            c,
            "witch",
            o.x,
            o.y + Math.sin(this.walk) * 2,
            88,
            this.lastDir.x < 0,
          );
          c.globalAlpha = 1;
        } else {
          sprite(
            c,
            o.type,
            o.x,
            o.y + Math.sin(t * 4 + o.phase) * 3,
            o.boss ? 143 : 64,
          );
          if (o.hp < o.max) {
            round(c, o.x - 22, o.y - 63, 44, 4, 2, "#182d3b");
            round(
              c,
              o.x - 22,
              o.y - 63,
              44 * Math.max(0, o.hp / o.max),
              4,
              2,
              "#e4b39a",
            );
          }
        }
      }
      for (let b of this.bullets) {
        line(
          c,
          [
            [b.x - b.vx * 0.025, b.y - b.vy * 0.025],
            [b.x, b.y],
          ],
          "#edd6a47a",
          4,
        );
        star(c, b.x, b.y, 9, "#ffefbd", t * 4);
      }
      if (this.ring > 0) {
        c.strokeStyle = `rgba(251,221,157,${this.ring})`;
        c.lineWidth = 5;
        c.beginPath();
        c.arc(
          this.player.x,
          this.player.y,
          230 * (1 - this.ring / 0.7),
          0,
          Math.PI * 2,
        );
        c.stroke();
      }
      this.fx.draw(c);
      round(c, 370, 115, 540, 5, 3, "#122e4166");
      round(
        c,
        370,
        115,
        540 * clamp(this.xp / this.need, 0, 1),
        5,
        3,
        "#d5ce9d",
      );
      text(
        c,
        `${this.boss ? "终章 · 守门人" : "第 " + (Math.floor(this.time / 25) + 1) + " 夜 · 追随星光"}`,
        640,
        146,
        13,
        "#d8dbc0",
        "center",
      );
    }
    for (let i = 0; i < 10; i++)
      botanical(c, 50 + i * 139, 795, 50 + (i % 3) * 24, "#183f49", t);
    for (let s of this.scenery.filter((s) => s.y >= 390))
      sprite(c, s.id, s.x, s.y, s.size);
    frame(c, this.p);
  }
}
