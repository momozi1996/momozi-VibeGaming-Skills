export const W = 1280,
  H = 800;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function rng(seed = 13) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const assets = {};
export async function loadArt() {
  await Promise.all(
    [
      "witch",
      "fox",
      "farmer",
      "moth",
      "slime",
      "golem",
      "pine",
      "autumn",
      "blossom",
      "cottage",
      "windmill",
      "tower",
      "flame",
      "frost",
      "carrot",
      "berry",
      "flower",
      "portal",
      "mushrooms",
      "lantern",
    ].map(
      (name) =>
        new Promise((resolve, reject) => {
          let im = new Image();
          im.onload = () => {
            assets[name] = im;
            resolve();
          };
          im.onerror = () => reject(Error("Missing art: " + name));
          im.src = "./public/art/" + name + ".svg";
        }),
    ),
  );
}
export function sprite(c, id, x, y, size = 100, flip = false, rotation = 0) {
  const im = assets[id];
  if (!im) return;
  const w = (size * im.width) / im.height;
  c.save();
  c.translate(x, y);
  c.rotate(rotation);
  if (flip) c.scale(-1, 1);
  c.drawImage(im, -w / 2, -size, w, size);
  c.restore();
}
export function ellipse(c, x, y, rx, ry, color) {
  c.fillStyle = color;
  c.beginPath();
  c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  c.fill();
}
export function line(c, pts, color, width = 2) {
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.beginPath();
  pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  c.stroke();
}
export function round(c, x, y, w, h, r, color, stroke) {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
  if (color) {
    c.fillStyle = color;
    c.fill();
  }
  if (stroke) {
    c.strokeStyle = stroke;
    c.stroke();
  }
}
export function text(
  c,
  value,
  x,
  y,
  size = 20,
  color = "#fff0cd",
  align = "left",
) {
  c.font = `${size >= 24 ? "800" : "600"} ${size}px Barlow, "PingFang SC", sans-serif`;
  c.fillStyle = color;
  c.textAlign = align;
  c.textBaseline = "middle";
  c.fillText(value, x, y);
}
export function glow(c, x, y, r, color) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "transparent");
  ellipse(c, x, y, r, r, g);
}
export function star(c, x, y, r, color = "#ffe5ab", spin = 0) {
  c.save();
  c.translate(x, y);
  c.rotate(spin);
  c.beginPath();
  for (let i = 0; i < 8; i++) {
    let a = (i * Math.PI) / 4;
    let rr = i % 2 ? r * 0.28 : r;
    let xx = Math.cos(a) * rr,
      yy = Math.sin(a) * rr;
    i ? c.lineTo(xx, yy) : c.moveTo(xx, yy);
  }
  c.closePath();
  c.fillStyle = color;
  c.fill();
  c.restore();
}
export function sky(c, t, p, night = false) {
  let g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, p.sky);
  g.addColorStop(1, p.horizon);
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
  glow(c, 1030, 150, 240, night ? "#d4e9cf25" : "#fff1c654");
  ellipse(
    c,
    1030,
    152,
    night ? 58 : 42,
    night ? 58 : 42,
    night ? "#ece9cc" : "#ffedc8",
  );
  if (night) {
    ellipse(c, 1047, 141, 51, 51, p.sky);
    let r = rng(421);
    for (let i = 0; i < 100; i++) {
      let x = r() * W,
        y = r() * 420;
      star(c, x, y, 1 + r() * 2, "#dce8e1" + (i % 2 ? "bb" : "55"), t * 0.07);
    }
  }
  for (let j = 0; j < 3; j++) {
    c.fillStyle = [p.mountain, p.far, p.mid][j];
    c.beginPath();
    c.moveTo(0, 540);
    let r = rng(9 + j);
    for (let x = -150; x < W + 200; x += 180) {
      let y = 255 + j * 95 + r() * 115;
      c.quadraticCurveTo(x - 90, y - 60, x, y);
    }
    c.lineTo(W, 800);
    c.lineTo(0, 800);
    c.fill();
  }
  for (let i = 0; i < 5; i++) {
    let x = ((i * 307 + t * (3 + i * 0.2)) % (W + 400)) - 200,
      y = 100 + (i % 3) * 72;
    c.globalAlpha = night ? 0.025 : 0.16;
    ellipse(c, x, y, 112, 16, "#fff6dd");
    ellipse(c, x + 22, y - 12, 60, 23, "#fff6dd");
    c.globalAlpha = 1;
  }
}
export function grain(c, seed, area, color = "#ffffff09", count = 400) {
  let r = rng(seed);
  c.fillStyle = color;
  for (let i = 0; i < count; i++) {
    let x = area.x + r() * area.w,
      y = area.y + r() * area.h;
    c.fillRect(x, y, 1 + r() * 2, 1 + r() * 2);
  }
}
export function grass(c, x, y, size = 8, color = "#abc5a2") {
  line(
    c,
    [
      [x - size / 2, y],
      [x - size, y - size],
      [x, y],
      [x + size / 2, y - size * 1.2],
    ],
    color,
    1.5,
  );
}
export function frame(c, p) {
  let g = c.createRadialGradient(640, 380, 300, 640, 380, 800);
  g.addColorStop(0, "transparent");
  g.addColorStop(1, p.vignette || "#132d4e55");
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
  c.strokeStyle = "#fff4d41c";
  c.lineWidth = 1;
  c.strokeRect(18, 18, W - 36, H - 36);
}
export class Effects {
  constructor() {
    this.items = [];
  }
  burst(x, y, color, n = 12) {
    let r = rng(Math.floor(x * 10 + y * 3) + this.items.length);
    for (let i = 0; i < n; i++) {
      let a = r() * Math.PI * 2,
        s = 30 + r() * 95;
      this.items.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 20,
        life: 0.4 + r() * 0.6,
        max: 1,
        color,
        r: 2 + r() * 4,
      });
    }
  }
  label(x, y, label, color = "#ffdc99") {
    this.items.push({ x, y, vx: 0, vy: -32, life: 1, max: 1, color, label });
  }
  update(dt) {
    this.items = this.items.filter((p) => p.life > 0);
    for (let p of this.items) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }
  draw(c) {
    for (let p of this.items) {
      c.globalAlpha = clamp(p.life / p.max, 0, 1);
      if (p.label) text(c, p.label, p.x, p.y, 18, p.color, "center");
      else star(c, p.x, p.y, p.r, p.color, p.life);
    }
    c.globalAlpha = 1;
  }
}

export function botanical(c, x, y, size, color = "#54796c", time = 0) {
  c.save();
  c.translate(x, y);
  c.rotate(Math.sin(time * 0.4 + x) * 0.018);
  for (let side of [-1, 1]) {
    line(
      c,
      [
        [0, 0],
        [side * size * 0.13, -size * 0.6],
        [side * size * 0.3, -size],
      ],
      color,
      2,
    );
    for (let i = 1; i < 6; i++) {
      let yy = -i * size * 0.14,
        xx = side * i * size * 0.035;
      c.save();
      c.translate(xx, yy);
      c.rotate(side * -0.6);
      ellipse(c, side * size * 0.11, 0, size * 0.15, size * 0.045, color);
      c.restore();
    }
  }
  c.restore();
}
export function butterfly(c, x, y, t, color = "#f0d198") {
  let flap = 0.35 + Math.abs(Math.sin(t * 8 + x)) * 0.65;
  c.save();
  c.translate(x + Math.sin(t + x) * 8, y + Math.cos(t * 0.8 + x) * 6);
  ellipse(c, -5 * flap, 0, 6 * flap, 4, color);
  ellipse(c, 5 * flap, 0, 6 * flap, 4, color);
  line(
    c,
    [
      [0, -3],
      [0, 4],
    ],
    "#807267",
    1,
  );
  c.restore();
}
