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
    this.time = 0;
    this.level = 1;
    this.lives = 5;
    this.collected = 0;
    this.fx = new Effects();
    this.finished = false;
    this.camera = 0;
    this.build();
  }
  build() {
    this.platforms = this.p.layout.map(([x, y, w], i) => ({
      x,
      y: y + (this.level > 1 && i > 0 ? Math.sin(i * 2 + this.level) * 28 : 0),
      baseX: x,
      w,
      moving: i === 4 && this.level > 1,
    }));
    this.worldEnd = this.platforms.at(-1).x + this.platforms.at(-1).w;
    this.player = {
      x: 150,
      y: this.platforms[0].y,
      vx: 0,
      vy: 0,
      ground: true,
      jumps: 2,
    };
    this.checkpoint = { x: 150, y: this.platforms[0].y };
    this.key = false;
    this.keyPos = { x: this.platforms[6].x + 120, y: this.platforms[6].y - 90 };
    this.goal = {
      x: this.platforms.at(-1).x + 240,
      y: this.platforms.at(-1).y,
    };
    this.inv = 0;
    this.buffer = 0;
    this.coyote = 0.1;
    this.camera = 0;
    this.coins = [];
    this.enemies = [];
    for (let i = 1; i < this.platforms.length; i++) {
      let q = this.platforms[i];
      for (let j = 0; j < 3; j++)
        this.coins.push({
          x: q.x + 45 + j * 50,
          y: q.y - 60 - Math.sin((j * Math.PI) / 2) * 30,
          taken: false,
        });
      if (i % 2 === 0 && i !== 6)
        this.enemies.push({
          x: q.x + 100,
          y: q.y,
          left: q.x + 30,
          right: q.x + q.w - 30,
          dir: 1,
          alive: true,
        });
    }
  }
  start() {
    this.api.toast("空格可二段跳。找到金钥匙，把星光送到终点。");
  }
  action(id) {
    if (id === "return") {
      this.player.x = this.checkpoint.x;
      this.player.y = this.checkpoint.y;
      this.player.vx = this.player.vy = 0;
      this.player.ground = true;
      this.player.jumps = 2;
      this.inv = 1;
    }
  }
  toolbar() {
    this.api.setToolbar([{ id: "return", label: "回到路标 · 不扣生命" }]);
  }
  hud() {
    return [
      ["云端驿站", this.level + " / 3"],
      ["旅途心意", "♥ " + Math.max(0, this.lives)],
      ["收集星邮", this.collected + " ✧"],
      ["通行钥匙", this.key ? "已找到" : "未找到"],
    ];
  }
  hurt() {
    if (this.inv > 0 || this.finished) return;
    this.lives--;
    this.api.audio.play("hit");
    this.fx.burst(this.player.x, this.player.y - 20, "#efae9b", 16);
    if (this.lives <= 0) {
      this.finished = true;
      this.api.finish(
        false,
        `你走过了 ${this.level} 座云岛，收集 ${this.collected} 枚星邮。\n空格可以二段跳，亮起的路标会保存本关落脚点。`,
      );
    } else {
      this.action("return");
      this.inv = 1.5;
    }
  }
  update(dt, input) {
    if (this.finished) return;
    this.time += dt;
    this.inv -= dt;
    this.buffer -= dt;
    this.coyote -= dt;
    const p = this.player,
      oldY = p.y;
    let move =
      (input.keys.has("KeyD") || input.keys.has("ArrowRight") ? 1 : 0) -
      (input.keys.has("KeyA") || input.keys.has("ArrowLeft") ? 1 : 0) +
      input.x;
    p.vx += (clamp(move, -1, 1) * this.p.speed - p.vx) * Math.min(1, dt * 13);
    if (Math.abs(move) > 0.05) this.face = move < 0;
    if (
      input.pressed.has("Space") ||
      input.pressed.has("ArrowUp") ||
      input.pressed.has("KeyW")
    )
      this.buffer = 0.14;
    if (this.buffer > 0 && (p.jumps > 0 || this.coyote > 0)) {
      p.vy = -this.p.jump;
      p.jumps = Math.max(0, p.jumps - 1);
      p.ground = false;
      this.coyote = 0;
      this.buffer = 0;
      this.api.audio.play("jump");
      this.fx.burst(p.x, p.y, "#f8e1a0", 6);
    }
    if (
      !input.keys.has("Space") &&
      !input.keys.has("ArrowUp") &&
      !input.keys.has("KeyW") &&
      p.vy < -230
    )
      p.vy += this.p.gravity * 0.6 * dt;
    p.vy += this.p.gravity * dt;
    p.x = clamp(p.x + p.vx * dt, 20, this.worldEnd - 20);
    p.y += p.vy * dt;
    p.ground = false;
    for (let q of this.platforms) {
      let lastX = q.x;
      if (q.moving) q.x = q.baseX + Math.sin(this.time * 0.8) * 45;
      if (
        p.vy >= 0 &&
        oldY <= q.y + 5 &&
        p.y >= q.y &&
        p.x > q.x - 12 &&
        p.x < q.x + q.w + 12
      ) {
        p.y = q.y;
        p.vy = 0;
        p.ground = true;
        p.jumps = 2;
        this.coyote = 0.11;
        if (q.moving) p.x += q.x - lastX;
      }
    }
    if (p.y > 850) this.hurt();
    let cp = this.platforms[4];
    if (
      p.x > cp.x + 40 &&
      p.x < cp.x + cp.w &&
      p.ground &&
      this.checkpoint.x < cp.x
    ) {
      this.checkpoint = { x: cp.x + 100, y: cp.y };
      this.api.toast("云端路标已点亮。");
      this.api.audio.play("build");
    }
    for (let coin of this.coins) {
      if (!coin.taken && Math.hypot(p.x - coin.x, p.y - 28 - coin.y) < 38) {
        coin.taken = true;
        this.collected++;
        this.api.audio.play("pick");
        this.fx.burst(coin.x, coin.y, "#f9de9f", 8);
      }
    }
    if (
      !this.key &&
      Math.hypot(p.x - this.keyPos.x, p.y - 30 - this.keyPos.y) < 42
    ) {
      this.key = true;
      this.api.audio.play("build");
      this.fx.burst(this.keyPos.x, this.keyPos.y, "#f9da96", 22);
      this.api.toast("找到了钥匙！前往亮着灯的星门。");
    }
    for (let e of this.enemies) {
      if (!e.alive) continue;
      e.x += e.dir * (42 + this.level * 8) * dt;
      if (e.x > e.right) e.dir = -1;
      if (e.x < e.left) e.dir = 1;
      if (Math.abs(p.x - e.x) < 32 && Math.abs(p.y - 25 - (e.y - 20)) < 36) {
        if (p.vy > 60 && oldY < e.y - 30) {
          e.alive = false;
          p.vy = -360;
          p.jumps = 1;
          this.collected += 2;
          this.api.audio.play("pick");
          this.fx.burst(e.x, e.y - 20, "#f7dc9e", 15);
        } else this.hurt();
      }
    }
    if (Math.abs(p.x - this.goal.x) < 42 && Math.abs(p.y - this.goal.y) < 50) {
      if (this.key) {
        this.api.audio.play("win");
        if (this.level >= 3) {
          this.finished = true;
          this.api.finish(
            true,
            `三封星光信件都送到了。你带回 ${this.collected} 枚星邮，留下 ${this.lives} 颗旅途之心。\n云海的那一边，又多了一位等待你的朋友。`,
          );
        } else {
          this.level++;
          this.lives = Math.min(5, this.lives + 1);
          this.build();
          this.api.toast(`抵达第 ${this.level} 座云岛 · 新的航路展开了`);
        }
      } else if (!this.warn || this.time - this.warn > 3) {
        this.warn = this.time;
        this.api.toast("星门需要金钥匙，再看看前面的高台。");
      }
    }
    this.camera +=
      (clamp(p.x - W * 0.36, 0, this.worldEnd - W) - this.camera) *
      Math.min(1, dt * 5);
    this.fx.update(dt);
  }
  island(c, q, t) {
    let x = q.x,
      y = q.y,
      w = q.w;
    c.fillStyle = "#8d867a";
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + w, y);
    c.lineTo(x + w - 17, y + 55);
    c.lineTo(x + w * 0.72, y + 88);
    c.lineTo(x + w * 0.43, y + 114);
    c.lineTo(x + 22, y + 66);
    c.closePath();
    c.fill();
    c.fillStyle = "#aaa08c";
    c.beginPath();
    c.moveTo(x + 20, y + 14);
    c.lineTo(x + w * 0.48, y + 15);
    c.lineTo(x + w * 0.43, y + 114);
    c.lineTo(x + 22, y + 66);
    c.fill();
    line(
      c,
      [
        [x + 40, y + 22],
        [x + 80, y + 40],
        [x + 68, y + 71],
      ],
      "#d5c4a254",
      3,
    );
    line(
      c,
      [
        [x + w * 0.75, y + 25],
        [x + w * 0.61, y + 56],
        [x + w * 0.64, y + 77],
      ],
      "#5e6b7044",
      3,
    );
    round(c, x - 5, y - 4, w + 10, 17, 9, this.p.grass);
    round(c, x - 2, y - 7, w + 4, 7, 4, "#d3d6a7");
    let r = rng(q.baseX + 7);
    for (let i = 0; i < w / 17; i++) {
      let xx = x + 10 + r() * (w - 20);
      grass(c, xx, y - 7, 5 + r() * 8, "#f2dfad77");
      if (i % 3 === 0) {
        let yy = 25 + r() * 35;
        line(
          c,
          [
            [xx, y + 8],
            [xx - 4, y + yy],
            [xx + 7, y + yy + 15],
          ],
          "#739b89",
          3,
        );
        ellipse(c, xx - 6, y + yy, 7, 3, "#9bbb93");
      }
    }
  }
  render(c, t, preview) {
    sky(c, t, this.p, false);
    let cam = preview ? 580 : this.camera;
    for (let j = 0; j < 3; j++) {
      c.globalAlpha = 0.09 + j * 0.025;
      let offset = cam * (0.08 + j * 0.07);
      for (let i = 0; i < 7; i++) {
        let x = i * 320 - offset;
        ellipse(c, x, 540 + j * 75, 230, 28, "#fff5de");
        ellipse(c, x + 50, 520 + j * 75, 100, 30, "#fff5de");
      }
    }
    c.globalAlpha = 1;
    c.save();
    c.translate(-cam, 0);
    for (let q of this.platforms) {
      if (q.x + q.w < cam - 100 || q.x > cam + W + 100) continue;
      this.island(c, q, t);
      if (q === this.platforms[0]) sprite(c, "cottage", q.x + 115, q.y, 165);
      if (q.w > 250) {
        sprite(c, "mushrooms", q.x + q.w - 40, q.y, 48);
        botanical(c, q.x + 28, q.y, 34, "#83a58a", t);
      }
      if (q === this.platforms[3])
        sprite(c, this.p.tree, q.x + q.w - 35, q.y, 150);
      if (q === this.platforms[7]) sprite(c, "windmill", q.x + 65, q.y, 133);
    }
    for (let coin of this.coins)
      if (!coin.taken) {
        glow(c, coin.x, coin.y, 22, "#fbd69520");
        star(
          c,
          coin.x,
          coin.y + Math.sin(t * 2 + coin.x) * 5,
          10,
          "#f6d992",
          t * 0.5,
        );
        star(
          c,
          coin.x - 2,
          coin.y - 3 + Math.sin(t * 2 + coin.x) * 5,
          4,
          "#fff5cd",
          t * 0.5,
        );
      }
    let cp = this.platforms[4];
    line(
      c,
      [
        [cp.x + 80, cp.y],
        [cp.x + 80, cp.y - 104],
      ],
      "#8b8178",
      5,
    );
    c.fillStyle = this.checkpoint.x > 150 ? "#f1d392" : "#a6c3ba";
    c.beginPath();
    c.moveTo(cp.x + 80, cp.y - 100);
    c.lineTo(cp.x + 127, cp.y - 87);
    c.lineTo(cp.x + 80, cp.y - 72);
    c.fill();
    if (!this.key) {
      let x = this.keyPos.x,
        y = this.keyPos.y + Math.sin(t * 2) * 6;
      glow(c, x, y, 40, "#f9dc9a33");
      c.strokeStyle = "#efd28c";
      c.lineWidth = 6;
      c.beginPath();
      c.arc(x, y - 10, 10, 0, Math.PI * 2);
      c.stroke();
      line(
        c,
        [
          [x, y],
          [x, y + 23],
          [x + 11, y + 23],
          [x + 11, y + 17],
        ],
        "#efd28c",
        6,
      );
    }
    sprite(c, "portal", this.goal.x, this.goal.y, 168);
    if (this.key) glow(c, this.goal.x, this.goal.y - 70, 90, "#dbecd438");
    for (let e of this.enemies) if (e.alive) sprite(c, "slime", e.x, e.y, 61);
    if (preview) {
      sprite(c, "fox", 1400, 505 + Math.sin(t * 2) * 5, 105);
      line(
        c,
        [
          [1340, 511],
          [1300, 523],
          [1270, 520],
        ],
        "#fff5cd66",
        3,
      );
    } else {
      if (this.inv > 0 && Math.sin(t * 40) > 0) c.globalAlpha = 0.45;
      sprite(
        c,
        "fox",
        this.player.x,
        this.player.y +
          (this.player.ground
            ? (Math.sin(t * 12) * Math.abs(this.player.vx)) / 180
            : 0),
        82,
        this.face || false,
        this.player.ground ? 0 : clamp(this.player.vy / 2000, -0.15, 0.15),
      );
      c.globalAlpha = 1;
      this.fx.draw(c);
    }
    c.restore();
    for (let i = 0; i < 17; i++) {
      let x = (i * 149 - t * 11) % 1380,
        y = 190 + ((i * 71) % 500);
      star(c, x, y, 2, "#f6e3b55a", t);
    }
    for (let i = 0; i < 5; i++)
      butterfly(c, 200 + i * 233, 300 + (i % 3) * 91, t, "#f6dfae");
    frame(c, this.p);
    if (!preview)
      text(
        c,
        "有些信，只有勇敢的小狐狸能送到。",
        640,
        148,
        13,
        "#fff0ce",
        "center",
      );
  }
}
