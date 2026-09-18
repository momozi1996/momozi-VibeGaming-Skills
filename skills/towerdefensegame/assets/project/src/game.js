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
export const TOWERS = {
  arrow: {
    name: "星晶",
    icon: "tower",
    cost: 65,
    range: 180,
    rate: 0.65,
    damage: 24,
    color: "#bce6dc",
  },
  frost: {
    name: "霜铃",
    icon: "frost",
    cost: 80,
    range: 150,
    rate: 1.15,
    damage: 10,
    color: "#d0deef",
  },
  flame: {
    name: "烛火",
    icon: "flame",
    cost: 110,
    range: 145,
    rate: 1.25,
    damage: 32,
    color: "#f2cb91",
  },
};
export class Game {
  constructor(p, api) {
    this.p = p;
    this.api = api;
    this.time = 0;
    this.gold = 200;
    this.lives = 15;
    this.wave = 0;
    this.total = p.waves;
    this.enemies = [];
    this.towers = [];
    this.shots = [];
    this.fx = new Effects();
    this.selected = "arrow";
    this.selectedPad = -1;
    this.active = false;
    this.queue = 0;
    this.spawn = 0;
    this.finished = false;
    this.kills = 0;
    this.path = p.path;
    this.pads = p.pads.map(([x, y]) => ({ x, y }));
    this.lengths = [0];
    for (let i = 1; i < this.path.length; i++)
      this.lengths.push(
        this.lengths[i - 1] +
          Math.hypot(
            this.path[i][0] - this.path[i - 1][0],
            this.path[i][1] - this.path[i - 1][1],
          ),
      );
    this.length = this.lengths.at(-1);
  }
  point(s) {
    let i = this.lengths.findIndex((v, j) => j > 0 && s <= v);
    if (i < 0) i = this.path.length - 1;
    let u = clamp(
      (s - this.lengths[i - 1]) / (this.lengths[i] - this.lengths[i - 1]),
      0,
      1,
    );
    return {
      x: this.path[i - 1][0] + (this.path[i][0] - this.path[i - 1][0]) * u,
      y: this.path[i - 1][1] + (this.path[i][1] - this.path[i - 1][1]) * u,
    };
  }
  start() {
    this.api.toast("选择晶塔，点击金色地基建造，然后迎接第一波。");
  }
  action(id) {
    if (id in TOWERS) {
      this.selected = id;
      this.selectedPad = -1;
    } else if (id === "wave" && !this.active && this.wave < this.total) {
      this.wave++;
      this.active = true;
      this.queue = 6 + this.wave * 2;
      this.spawn = 0.3;
      this.api.toast(`第 ${this.wave} 波来了，守住村庄！`);
    } else if (id === "upgrade") {
      let t = this.towers.find((t) => t.pad === this.selectedPad);
      if (t && t.level < 3) {
        let cost = 45 * t.level;
        if (this.gold >= cost) {
          this.gold -= cost;
          t.level++;
          this.api.audio.play("build");
          this.fx.burst(t.x, t.y - 55, "#efdb9e", 20);
        } else this.api.toast("星币还不够，击退梦魇就能获得。");
      }
    } else if (id === "sell") {
      let i = this.towers.findIndex((t) => t.pad === this.selectedPad);
      if (i >= 0) {
        let t = this.towers[i];
        this.gold += Math.floor(
          (TOWERS[t.type].cost + (45 * (t.level - 1) * t.level) / 2) * 0.65,
        );
        this.towers.splice(i, 1);
        this.selectedPad = -1;
        this.api.audio.play("pick");
      }
    }
  }
  click(x, y) {
    let i = this.pads.findIndex((p) => dist(p, { x, y }) < 38);
    if (i < 0) {
      this.selectedPad = -1;
      return;
    }
    let existing = this.towers.find((t) => t.pad === i);
    if (existing) {
      this.selectedPad = i;
      return;
    }
    let def = TOWERS[this.selected];
    if (this.gold < def.cost) {
      this.api.toast(`需要 ${def.cost} 星币才能建造${def.name}塔。`);
      return;
    }
    this.gold -= def.cost;
    this.towers.push({
      ...this.pads[i],
      pad: i,
      type: this.selected,
      level: 1,
      cooldown: 0,
    });
    this.selectedPad = i;
    this.api.audio.play("build");
    this.fx.burst(x, y, "#e4d598", 24);
  }
  toolbar() {
    let t = this.towers.find((t) => t.pad === this.selectedPad);
    let items = Object.entries(TOWERS).map(([id, d]) => ({
      id,
      label: `${d.name} ${d.cost}✧`,
      active: this.selected === id,
    }));
    if (t)
      items.push(
        {
          id: "upgrade",
          label: t.level >= 3 ? "已满级" : `升级 ${45 * t.level}✧`,
          disabled: t.level >= 3 || this.gold < 45 * t.level,
        },
        { id: "sell", label: "拆除返还" },
      );
    items.push({
      id: "wave",
      label: this.active ? "守护进行中" : `迎接第 ${this.wave + 1} 波 ↗`,
      disabled: this.active || this.wave >= this.total,
    });
    this.api.setToolbar(items);
  }
  hud() {
    return [
      ["村庄灯火", "♥ " + Math.max(0, this.lives)],
      ["可用星币", this.gold + " ✧"],
      ["守护波次", this.wave + " / " + this.total],
      ["击退梦魇", this.kills],
    ];
  }
  update(dt) {
    if (this.finished) return;
    this.time += dt;
    this.fx.update(dt);
    if (this.active && this.queue > 0) {
      this.spawn -= dt;
      if (this.spawn <= 0) {
        this.spawn = this.p.spawnGap;
        this.queue--;
        let boss = this.wave === this.total && this.queue === 0;
        let fast = this.queue % 4 === 0 && !boss;
        let hp = (40 + this.wave * 23) * this.p.health * (boss ? 5 : 1);
        this.enemies.push({
          ...this.point(0),
          progress: 0,
          hp,
          max: hp,
          speed: boss ? 34 : fast ? 76 : 47,
          type: boss ? "golem" : fast ? "moth" : "slime",
          slow: 0,
          boss,
        });
      }
    }
    for (let e of this.enemies) {
      e.slow -= dt;
      e.progress += e.speed * (e.slow > 0 ? 0.45 : 1) * dt;
      Object.assign(e, this.point(e.progress));
      if (e.progress >= this.length) {
        e.gone = true;
        this.lives -= e.boss ? 5 : 1;
        this.api.audio.play("hit");
        this.fx.burst(e.x, e.y, "#eead93", 14);
      }
    }
    for (let t of this.towers) {
      t.cooldown -= dt;
      let d = TOWERS[t.type],
        range = d.range + (t.level - 1) * 16;
      let target = this.enemies
        .filter((e) => !e.gone && e.hp > 0 && dist(e, t) < range)
        .sort((a, b) => b.progress - a.progress)[0];
      if (t.cooldown <= 0 && target) {
        t.cooldown = d.rate / (1 + (t.level - 1) * 0.18);
        this.shots.push({
          x: t.x,
          y: t.y - 58,
          tx: target.x,
          ty: target.y - 15,
          life: 0.25,
          color: d.color,
        });
        let damage = d.damage * (1 + (t.level - 1) * 0.65);
        if (t.type === "flame") {
          for (let e of this.enemies) if (dist(e, target) < 65) e.hp -= damage;
          this.fx.burst(target.x, target.y, "#f6ca92", 9);
        } else target.hp -= damage;
        if (t.type === "frost") {
          for (let e of this.enemies) if (dist(e, target) < 42) e.slow = 2.2;
        }
        this.api.audio.play("shoot");
      }
    }
    for (let e of this.enemies)
      if (e.hp <= 0 && !e.gone) {
        e.gone = true;
        this.kills++;
        this.gold += e.boss ? 65 : 12;
        this.fx.burst(e.x, e.y, "#e4d09b", 10);
        this.fx.label(e.x, e.y - 35, e.boss ? "+65" : "+12");
      }
    this.enemies = this.enemies.filter((e) => !e.gone);
    this.shots = this.shots.filter((s) => (s.life -= dt) > 0);
    if (this.lives <= 0) {
      this.finished = true;
      this.api.finish(
        false,
        `村庄的灯火暗了下来。你守到了第 ${this.wave} 波。\n霜铃减速搭配烛火范围攻击，能让弯道成为更好的防线。`,
      );
      return;
    }
    if (this.active && this.queue === 0 && !this.enemies.length) {
      this.active = false;
      this.gold += 35;
      this.api.audio.play("win");
      if (this.wave >= this.total) {
        this.finished = true;
        this.api.finish(
          true,
          `${this.total} 波梦魇都已散去，村庄还亮着 ${this.lives} 盏灯。\n你建造了 ${this.towers.length} 座晶塔，击退 ${this.kills} 只梦魇。`,
        );
      } else this.api.toast("这一波守住了！获得 35 星币，修整好再出发。");
    }
  }
  render(c, t, preview) {
    sky(c, t, this.p, false);
    let g = c.createLinearGradient(0, 240, 0, 800);
    g.addColorStop(0, this.p.ground);
    g.addColorStop(1, this.p.floor);
    ellipse(c, 665, 670, 970, 425, g);
    let river = [
      [0, 380],
      [140, 365],
      [190, 305],
      [350, 320],
      [520, 260],
      [750, 275],
      [870, 245],
      [1280, 300],
    ];
    line(c, river, this.p.water, 67);
    line(c, river, "#d4e3c132", 46);
    for (let i = 0; i < 17; i++) {
      let x = (i * 87 + t * 7) % W;
      line(
        c,
        [
          [x, 285 + (i % 3) * 21],
          [x + 19, 284 + (i % 3) * 21],
        ],
        "#e5f0d45c",
        2,
      );
    }
    let r = rng(this.p.seed);
    for (let i = 0; i < 160; i++) {
      let x = r() * W,
        y = 325 + r() * 460;
      grass(c, x, y, 4 + r() * 6, "#d3dda34c");
    }
    line(c, this.path, "#607c7666", 66);
    line(c, this.path, this.p.road, 53);
    line(c, this.path, "#fae5b755", 35);
    for (let s = 0; s < this.length; s += 24) {
      let q = this.point(s),
        a = r();
      ellipse(
        c,
        q.x + (a - 0.5) * 16,
        q.y,
        5 + r() * 7,
        2 + r() * 3,
        "#b2947750",
      );
    }
    sprite(c, "cottage", 1150, 355, 200);
    sprite(c, "windmill", 1120, 638, 143);
    for (let [x, y, s] of [
      [85, 330, 190],
      [35, 530, 180],
      [1200, 490, 173],
      [330, 278, 130],
      [880, 280, 122],
      [750, 775, 153],
      [1260, 763, 190],
      [180, 765, 153],
    ])
      sprite(c, this.p.tree, x, y, s);
    for (let i = 0; i < this.pads.length; i++) {
      let p = this.pads[i];
      ellipse(c, p.x, p.y, 33, 18, "#395e6544");
      ellipse(c, p.x, p.y - 4, 30, 17, "#d1c9a1");
      ellipse(c, p.x, p.y - 7, 24, 12, "#e9d9af");
      c.strokeStyle = "#fff1bd";
      c.lineWidth = 1;
      c.beginPath();
      c.ellipse(p.x, p.y - 7, 20, 9, 0, 0, Math.PI * 2);
      c.stroke();
      if (!this.towers.some((t) => t.pad === i))
        text(c, "+", p.x, p.y - 8, 25, "#8f8d6c", "center");
    }
    let towers = preview
      ? [
          { ...this.pads[1], type: "arrow", level: 2 },
          { ...this.pads[3], type: "frost", level: 1 },
          { ...this.pads[5], type: "flame", level: 3 },
        ]
      : this.towers;
    let selected = this.towers.find((t) => t.pad === this.selectedPad);
    if (selected && !preview) {
      let d = TOWERS[selected.type];
      ellipse(
        c,
        selected.x,
        selected.y,
        d.range + (selected.level - 1) * 16,
        d.range + (selected.level - 1) * 16,
        "#ede8bf12",
      );
      c.strokeStyle = "#e8e2b666";
      c.setLineDash([4, 8]);
      c.beginPath();
      c.arc(
        selected.x,
        selected.y,
        d.range + (selected.level - 1) * 16,
        0,
        Math.PI * 2,
      );
      c.stroke();
      c.setLineDash([]);
    }
    for (let o of [
      ...towers.map((x) => ({ ...x, tower: true })),
      ...(preview
        ? [
            { ...this.point(this.length * 0.58), type: "slime" },
            { ...this.point(this.length * 0.69), type: "moth" },
            { ...this.point(this.length * 0.42), type: "slime" },
          ]
        : this.enemies),
    ].sort((a, b) => a.y - b.y)) {
      if (o.tower) {
        glow(c, o.x, o.y - 70, 45, "#ffedb530");
        sprite(c, TOWERS[o.type].icon, o.x, o.y + 4, 115);
        for (let i = 0; i < o.level; i++)
          star(c, o.x + (i - (o.level - 1) / 2) * 11, o.y + 10, 4, "#f9df9c");
      } else {
        sprite(
          c,
          o.type,
          o.x,
          o.y + Math.sin(t * 4 + o.x) * 2,
          o.boss ? 118 : 68,
        );
        if (o.hp < o.max) {
          round(c, o.x - 20, o.y - 59, 40, 4, 2, "#3c565b");
          round(
            c,
            o.x - 20,
            o.y - 59,
            40 * clamp(o.hp / o.max, 0, 1),
            4,
            2,
            "#e4c49a",
          );
        }
      }
    }
    for (let s of this.shots) {
      c.globalAlpha = s.life / 0.25;
      line(
        c,
        [
          [s.x, s.y],
          [s.tx, s.ty],
        ],
        s.color,
        3,
      );
      star(c, s.tx, s.ty, 13, s.color, t);
      c.globalAlpha = 1;
    }
    this.fx.draw(c);
    for (let [x, y] of [
      [380, 680],
      [930, 710],
      [110, 350],
    ]) {
      sprite(c, "mushrooms", x, y, 54);
      botanical(c, x + 35, y, 30, "#668d79", t);
    }
    for (let [x, y] of [
      [270, 360],
      [1090, 405],
    ]) {
      sprite(c, "lantern", x, y, 90);
      glow(c, x + 8, y - 59, 45, "#ffe3a82f");
    }
    for (let i = 0; i < 17; i++) {
      let x = 50 + i * 79,
        y = 290 + ((i * 43) % 460);
      star(c, x + Math.sin(t + i) * 10, y, 2, "#f2dfa477", t);
    }
    frame(c, this.p);
    if (!preview && !this.wave)
      text(
        c,
        "点击空地基，点亮你的第一座晶塔",
        640,
        153,
        15,
        "#f3e4bd",
        "center",
      );
  }
}
