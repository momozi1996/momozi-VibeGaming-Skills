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
export const CROPS = {
  carrot: { name: "蜜糖萝卜", cost: 3, sell: 9, grow: 26 },
  berry: { name: "蓝星莓", cost: 5, sell: 15, grow: 39 },
  flower: { name: "晚风花", cost: 4, sell: 12, grow: 32 },
};
const iso = (col, row) => ({
  x: 650 + (col - row) * 65,
  y: 378 + (col + row) * 32,
});
export class Game {
  constructor(p, api) {
    this.p = p;
    this.api = api;
    this.time = 0;
    this.day = 1;
    this.dayTime = 0;
    this.gold = 35;
    this.energy = 40;
    this.tool = "carrot";
    this.inventory = { carrot: 0, berry: 0, flower: 0 };
    this.harvested = { carrot: 0, berry: 0, flower: 0 };
    this.plots = Array.from({ length: 24 }, (_, i) => ({
      col: i % 6,
      row: Math.floor(i / 6),
      crop: null,
      growth: 0,
      water: false,
    }));
    this.plots
      .slice(0, 3)
      .forEach((q) =>
        Object.assign(q, { crop: "carrot", growth: 0.65, water: true }),
      );
    this.plots
      .slice(6, 8)
      .forEach((q) =>
        Object.assign(q, { crop: "berry", growth: 0.3, water: true }),
      );
    this.fx = new Effects();
    this.level = 0;
    this.order = 0;
    this.totalSold = 0;
    this.finished = false;
    this.player = { x: 920, y: 605 };
    this.saveKey =
      "creative-farm-v1-" +
      p.id +
      "-" +
      encodeURIComponent(globalThis.location?.pathname || "/");
    this.saveTimer = 0;
    this.waterFX = [];
  }
  start() {
    this.api.toast("先选种子，再点击田地；浇水后生长，成熟后点击收获。");
    this.toolbar();
  }
  hasSave() {
    try {
      return !!this.valid(JSON.parse(localStorage.getItem(this.saveKey)));
    } catch {
      return false;
    }
  }
  valid(d) {
    if (
      !d ||
      d.version !== 1 ||
      !Array.isArray(d.plots) ||
      d.plots.length !== 24
    )
      return null;
    const n = (v, a, b) => Number.isFinite(v) && v >= a && v <= b;
    for (let k of ["day", "gold", "energy", "order", "level", "totalSold"])
      if (!n(d[k], 0, k === "energy" ? 40 : 1e7) || !Number.isInteger(d[k]))
        return null;
    if (d.order > 3 || d.level > 2 || d.day < 1) return null;
    for (let inv of [d.inventory, d.harvested])
      for (let k of Object.keys(CROPS))
        if (!inv || !n(inv[k], 0, 1e6) || !Number.isInteger(inv[k]))
          return null;
    for (let q of d.plots)
      if (
        !q ||
        !(
          q.crop === null || Object.prototype.hasOwnProperty.call(CROPS, q.crop)
        ) ||
        !n(q.growth, 0, 1) ||
        typeof q.water !== "boolean"
      )
        return null;
    return d;
  }
  save() {
    try {
      let d = {
        version: 1,
        day: this.day,
        gold: this.gold,
        energy: this.energy,
        order: this.order,
        level: this.level,
        totalSold: this.totalSold,
        inventory: this.inventory,
        harvested: this.harvested,
        plots: this.plots.map(({ crop, growth, water }) => ({
          crop,
          growth,
          water,
        })),
      };
      localStorage.setItem(this.saveKey, JSON.stringify(d));
    } catch {
      if (!this.warnedStorage) {
        this.warnedStorage = true;
        this.api.toast("浏览器无法保存，小镇仍可继续游玩。");
      }
    }
  }
  load() {
    try {
      let d = this.valid(JSON.parse(localStorage.getItem(this.saveKey)));
      if (!d) {
        this.api.toast("旧存档不可用，已安全开始新花园。");
        return;
      }
      for (let k of ["day", "gold", "energy", "order", "level", "totalSold"])
        this[k] = d[k];
      this.finished = d.order >= 3 && d.level >= 2;
      this.inventory = Object.fromEntries(
        Object.keys(CROPS).map((k) => [k, d.inventory[k]]),
      );
      this.harvested = Object.fromEntries(
        Object.keys(CROPS).map((k) => [k, d.harvested[k]]),
      );
      this.plots.forEach((q, i) => {
        const { crop, growth, water } = d.plots[i];
        Object.assign(q, { crop, growth, water });
      });
    } catch {
      this.api.toast("未能读取存档，已开始新花园。");
    }
  }
  hud() {
    return [
      ["小镇日历", "第 " + this.day + " 天"],
      ["口袋金币", this.gold + " ✧"],
      ["今日体力", this.energy + " / 40"],
      ["小镇心愿", this.order + " / 3"],
    ];
  }
  toolbar() {
    let items = Object.entries(CROPS).map(([id, d]) => ({
      id,
      label: d.name + " " + d.cost + "✧",
      active: this.tool === id,
    }));
    items.push(
      { id: "water", label: "浇水", active: this.tool === "water" },
      { id: "sell", label: "售出篮中作物" },
      { id: "order", label: "交付心愿" },
      {
        id: "build",
        label: this.level < 2 ? `修缮 ${this.level ? 100 : 65}✧` : "花园已修缮",
        disabled: this.level >= 2,
      },
      { id: "sleep", label: "休息到明天" },
    );
    this.api.setToolbar(items);
  }
  action(id) {
    if (id in CROPS || id === "water") {
      this.tool = id;
      return;
    }
    if (id === "sell") {
      let earned = 0;
      for (let [k, v] of Object.entries(this.inventory)) {
        earned += v * CROPS[k].sell;
        this.inventory[k] = 0;
      }
      if (earned) {
        this.gold += earned;
        this.totalSold += earned;
        this.fx.label(1000, 500, "+" + earned + " ✧");
        this.api.audio.play("pick");
        this.api.toast("小推车卖出了新鲜收成，获得 " + earned + " 金币。");
      } else this.api.toast("篮子还是空的，先收获成熟作物。");
    } else if (id === "sleep") {
      this.day++;
      this.dayTime = 0;
      this.energy = 40;
      if (
        this.gold < 3 &&
        !this.plots.some((q) => q.crop) &&
        !Object.values(this.inventory).some((v) => v > 0)
      )
        this.gold = 3;
      for (let q of this.plots)
        if (q.crop) {
          if (q.water) q.growth = Math.min(1, q.growth + 0.6);
          q.water = false;
        }
      this.api.toast("早安，第 " + this.day + " 天。浇水让作物继续长大。");
      this.api.audio.play("plant");
    } else if (id === "build") {
      let cost = this.level ? 100 : 65;
      if (this.level < 2 && this.gold >= cost) {
        this.gold -= cost;
        this.level++;
        this.api.audio.play("build");
        this.fx.burst(1020, 325, "#f8de9c", 35);
        this.api.toast(
          this.level === 1
            ? "风车修好了！作物生长加快 20%。"
            : "温室点亮了！小镇又暖和了一些。",
        );
      } else this.api.toast("金币还不够，完成心愿或售出收成吧。");
    } else if (id === "order") {
      const orders = this.p.orders;
      if (this.order >= orders.length) {
        this.api.toast("所有心愿都完成了，享受你的花园吧。");
        return;
      }
      let o = orders[this.order];
      if (Object.entries(o.need).every(([k, v]) => this.inventory[k] >= v)) {
        for (let [k, v] of Object.entries(o.need)) this.inventory[k] -= v;
        this.gold += o.reward;
        this.order++;
        this.api.audio.play("win");
        this.fx.burst(1030, 455, "#edd59e", 28);
        this.api.toast("心愿交付完成，获得 " + o.reward + " 金币！");
      } else
        this.api.toast(
          "这个心愿需要：" +
            Object.entries(o.need)
              .map(([k, v]) => CROPS[k].name + " ×" + v)
              .join("、"),
        );
    }
    this.save();
    this.checkWin();
  }
  click(x, y) {
    let q = this.plots.find((q) => {
      let p = iso(q.col, q.row);
      return Math.abs(x - p.x) / 59 + Math.abs(y - p.y) / 29 < 1;
    });
    if (!q) return;
    let p = iso(q.col, q.row);
    this.player = { x: p.x + 66, y: p.y + 45 };
    if (q.crop && q.growth >= 1) {
      let type = q.crop;
      this.inventory[type]++;
      this.harvested[type]++;
      q.crop = null;
      q.growth = 0;
      q.water = false;
      this.fx.burst(p.x, p.y - 20, "#f3d892", 14);
      this.fx.label(p.x, p.y - 35, "+1 " + CROPS[type].name);
      this.api.audio.play("pick");
    } else if (this.tool === "water") {
      if (!q.crop) {
        this.api.toast("先种下一颗种子。");
        return;
      }
      if (q.water) {
        this.api.toast("这块田已经喝饱水了。");
        return;
      }
      if (this.energy <= 0) {
        this.api.toast("体力用完啦，休息到明天吧。");
        return;
      }
      q.water = true;
      this.energy--;
      this.fx.burst(p.x, p.y - 10, "#cce9e2", 10);
      this.api.audio.play("plant");
    } else if (!q.crop) {
      let d = CROPS[this.tool];
      if (this.gold < d.cost) {
        this.api.toast("金币不够；先收成卖出，或交付心愿。");
        return;
      }
      if (this.energy <= 0) {
        this.api.toast("今天忙够了，休息到明天。");
        return;
      }
      this.gold -= d.cost;
      this.energy--;
      q.crop = this.tool;
      q.growth = 0;
      q.water = false;
      this.api.audio.play("plant");
      this.fx.burst(p.x, p.y, "#e6d3a0", 7);
    } else
      this.api.toast(
        q.water ? "作物正在慢慢长大。" : "选择浇水，让它喝一点水。",
      );
    this.save();
  }
  checkWin() {
    if (!this.finished && this.order >= 3 && this.level >= 2) {
      this.finished = true;
      this.save();
      this.api.finish(
        true,
        `你用 ${this.day} 天完成了三份心愿，修好了风车与温室。\n小镇恢复了生机。存档已经留下，回到扉页可以继续照料花园。`,
      );
    }
  }
  update(dt) {
    this.time += dt;
    this.dayTime += dt;
    this.saveTimer += dt;
    for (let q of this.plots)
      if (q.crop && q.water)
        q.growth = Math.min(
          1,
          q.growth +
            (dt / CROPS[q.crop].grow) *
              (this.level ? 1.2 : 1) *
              this.p.growthRate,
        );
    this.fx.update(dt);
    if (this.dayTime >= 150) this.action("sleep");
    if (this.saveTimer >= 5) {
      this.saveTimer = 0;
      this.save();
    }
    this.checkWin();
  }
  plot(c, q, t, preview) {
    let p = iso(q.col, q.row);
    let crop = q.crop,
      growth = q.growth,
      water = q.water;
    if (preview) {
      crop = ["carrot", "berry", "flower"][(q.col + q.row) % 3];
      growth = 0.5 + ((q.col * 7 + q.row) % 4) * 0.16;
      water = true;
    }
    c.fillStyle = water ? "#847867" : "#a58d72";
    c.beginPath();
    c.moveTo(p.x, p.y - 27);
    c.lineTo(p.x + 59, p.y);
    c.lineTo(p.x, p.y + 27);
    c.lineTo(p.x - 59, p.y);
    c.closePath();
    c.fill();
    line(
      c,
      [
        [p.x - 58, p.y],
        [p.x, p.y + 28],
        [p.x + 59, p.y],
      ],
      "#6c776833",
      5,
    );
    for (let i = -2; i <= 2; i++)
      line(
        c,
        [
          [p.x - 38 + i * 10, p.y - 9 - i * 5],
          [p.x + 1 + i * 10, p.y + 10 - i * 5],
        ],
        water ? "#d5b88c44" : "#dac3a05a",
        2,
      );
    if (crop) {
      for (let [ox, oy] of [
        [-19, 0],
        [10, -8],
        [13, 10],
      ]) {
        if (growth < 0.25) {
          grass(c, p.x + ox, p.y + oy, 8, "#a5bc8b");
        } else sprite(c, crop, p.x + ox, p.y + oy + 10, 30 + growth * 37);
      }
      if (growth >= 1) {
        star(
          c,
          p.x + 29,
          p.y - 26 + Math.sin(t * 2 + q.col) * 3,
          5,
          "#ffe1a1",
          t,
        );
      } else if (!water) {
        text(c, "◌", p.x, p.y - 28, 16, "#e9dfb2", "center");
      } else {
        round(c, p.x - 18, p.y + 16, 36, 3, 2, "#5c6d6266");
        round(c, p.x - 18, p.y + 16, 36 * growth, 3, 2, "#d4d899");
      }
    }
  }
  render(c, t, preview) {
    sky(c, t, this.p, false);
    let g = c.createLinearGradient(0, 240, 0, 800);
    g.addColorStop(0, this.p.ground);
    g.addColorStop(1, this.p.floor);
    ellipse(c, 640, 750, 1000, 470, g);
    line(
      c,
      [
        [0, 482],
        [175, 417],
        [265, 450],
        [260, 560],
        [372, 657],
        [570, 753],
        [830, 800],
      ],
      this.p.water,
      70,
    );
    line(
      c,
      [
        [0, 482],
        [175, 417],
        [265, 450],
        [260, 560],
        [372, 657],
        [570, 753],
        [830, 800],
      ],
      "#e2ecd128",
      43,
    );
    for (let i = 0; i < 25; i++) {
      let x = (i * 41 + t * 9) % 290,
        y = 450 + (i % 5) * 30;
      line(
        c,
        [
          [x, y],
          [x + 15, y - 3],
        ],
        "#dfecc85c",
        2,
      );
    }
    let r = rng(this.p.seed);
    for (let i = 0; i < 190; i++) {
      let x = r() * W,
        y = 300 + r() * 500;
      grass(c, x, y, 3 + r() * 7, "#d9dba254");
    }
    line(
      c,
      [
        [385, 450],
        [640, 335],
        [970, 422],
        [1080, 580],
      ],
      this.p.road,
      36,
    );
    line(
      c,
      [
        [950, 422],
        [1050, 326],
      ],
      this.p.road,
      33,
    );
    for (let [x, y, size] of [
      [60, 392, 166],
      [187, 365, 143],
      [1210, 410, 159],
      [1210, 687, 171],
      [385, 774, 160],
      [75, 785, 183],
      [910, 279, 102],
      [1070, 755, 149],
    ])
      sprite(c, this.p.tree, x, y, size);
    sprite(c, "cottage", 440, 384, 213);
    sprite(c, "windmill", 1048, 335, this.level || preview ? 171 : 125);
    if (this.level === 0 && !preview)
      text(c, "待修缮", 1048, 345, 12, "#f6e4ba", "center");
    if (this.level >= 2 || preview) {
      round(c, 1058, 394, 121, 81, 4, "#aacac079", "#648b8c");
      line(
        c,
        [
          [1058, 394],
          [1119, 354],
          [1179, 394],
        ],
        "#d6d8b5",
        7,
      );
      for (let x of [1086, 1118, 1150])
        line(
          c,
          [
            [x, 397],
            [x, 475],
          ],
          "#e0d6ae",
          4,
        );
      for (let i = 0; i < 3; i++) sprite(c, "flower", 1081 + i * 32, 470, 48);
    }
    for (let i = 0; i < 10; i++) {
      let x = 570 + i * 52,
        y = 306 + i * 12;
      line(
        c,
        [
          [x, y],
          [x, y - 30],
        ],
        "#c5c09b",
        6,
      );
      if (i < 9)
        line(
          c,
          [
            [x, y - 20],
            [x + 52, y - 8],
          ],
          "#e2d6b0",
          5,
        );
    }
    for (let q of this.plots) this.plot(c, q, t, preview);
    sprite(
      c,
      "farmer",
      preview ? 956 : this.player.x,
      preview ? 609 : this.player.y,
      94,
    );
    sprite(c, "fox", 370, 547 + Math.sin(t * 2), 65, true);
    for (let i = 0; i < 8; i++) {
      let x = 360 + i * 92 + Math.sin(t + i) * 20,
        y = 370 + ((i * 47) % 260);
      star(c, x, y, 2, "#f4df9c99", t);
    }
    // Roadside market cart, not a clickable web-card stand-in.
    round(c, 989, 482, 83, 43, 4, "#ac8866");
    ellipse(c, 1003, 535, 10, 10, "#626d66");
    ellipse(c, 1059, 535, 10, 10, "#626d66");
    line(
      c,
      [
        [985, 483],
        [985, 440],
        [1077, 440],
        [1077, 484],
      ],
      "#96836b",
      5,
    );
    c.fillStyle = "#edc6a1";
    c.beginPath();
    c.moveTo(978, 449);
    c.lineTo(991, 430);
    c.lineTo(1069, 430);
    c.lineTo(1085, 449);
    c.closePath();
    c.fill();
    for (let i = 0; i < 4; i++)
      round(c, 983 + i * 24, 448, 16, 9, 2, i % 2 ? "#d3d3ad" : "#e8bd9b");
    sprite(c, "carrot", 1015, 495, 42);
    sprite(c, "berry", 1045, 495, 40);
    for (let [x, y] of [
      [334, 596],
      [459, 322],
      [1136, 630],
      [958, 325],
    ]) {
      sprite(c, "mushrooms", x, y, 48);
      botanical(c, x + 33, y, 29, "#698a71", t);
    }
    for (let i = 0; i < 8; i++)
      butterfly(
        c,
        320 + i * 105,
        330 + ((i * 61) % 300),
        t,
        i % 2 ? "#f1d695" : "#f6d3c1",
      );
    this.fx.draw(c);
    if (!preview) {
      let order = this.p.orders[this.order];
      round(c, 50, 168, 246, 185, 17, "#f0dfb5ed", "#fbefd166");
      text(c, "村口的心愿板", 73, 196, 18, "#526b65");
      line(
        c,
        [
          [73, 218],
          [270, 218],
        ],
        "#aaa57b66",
        1,
      );
      text(
        c,
        order ? order.title : "谢谢你，花园守护者",
        73,
        240,
        14,
        "#716e57",
      );
      if (order) {
        let i = 0;
        for (let [k, v] of Object.entries(order.need))
          text(
            c,
            `${CROPS[k].name}  ${this.inventory[k]} / ${v}`,
            73,
            271 + i++ * 23,
            13,
            "#5d7468",
          );
        text(c, "谢礼 " + order.reward + " 金币", 73, 328, 12, "#9a7f58");
      } else text(c, "修缮风车与温室，完成小镇故事", 73, 279, 12, "#5d7468");
      round(c, 50, 370, 246, 130, 16, "#24494ddd", "#d5d6ac44");
      text(c, "采收篮", 72, 395, 16, "#e9d8ac");
      let i = 0;
      for (let [k, v] of Object.entries(this.inventory)) {
        sprite(c, k, 88 + i * 72, 461, 48);
        text(c, String(v), 88 + i * 72, 478, 16, "#f4ddaa", "center");
        i++;
      }
      text(c, "成熟作物可直接点击收获", 640, 152, 13, "#f6e7c2", "center");
    }
    frame(c, this.p);
  }
}
