import { seeded } from "../core/math";
export interface MapEntity {
  x: number;
  z: number;
  dead?: boolean;
}
export class Minimap {
  private paper = new Image();
  private treeArt = new Image();
  private trees: { x: number; z: number; s: number }[] = [];
  setTrees(trees: { x: number; z: number; r: number }[]) {
    this.trees = trees.map((t) => ({ ...t, s: t.r * 7 }));
  }
  constructor() {
    this.treeArt.src = "/assets/ui/map-tree.png";
    this.paper.src = "/assets/textures/parchment.jpg";
    const r = seeded(172);
    for (let i = 0; i < 260; i++) {
      const x = (r() - 0.5) * 155,
        z = (r() - 0.5) * 165;
      if (Math.abs(x) < 22 && z > 0 && z < 52) continue;
      if (Math.abs(x) < 6) continue;
      this.trees.push({ x, z, s: 2 + r() * 2 });
    }
  }
  draw(
    canvas: HTMLCanvasElement,
    player: MapEntity,
    yaw: number,
    enemies: MapEntity[],
    large = false,
  ) {
    const ctx = canvas.getContext("2d")!,
      w = canvas.width,
      h = canvas.height,
      scale = large ? w / 165 : w / 88,
      cx = large ? 0 : player.x,
      cz = large ? -3 : player.z;
    const point = (x: number, z: number) => ({
      x: w / 2 + (x - cx) * scale,
      y: h / 2 - (z - cz) * scale,
    });
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#b7b289";
    ctx.fillRect(0, 0, w, h);
    if (this.paper.complete) {
      ctx.globalAlpha = 0.65;
      ctx.drawImage(this.paper, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }
    const shadow = ctx.createRadialGradient(
      w * 0.35,
      h * 0.3,
      20,
      w / 2,
      h / 2,
      w * 0.8,
    );
    shadow.addColorStop(0, "#89987933");
    shadow.addColorStop(1, "#35452e88");
    ctx.fillStyle = shadow;
    ctx.fillRect(0, 0, w, h);
    for (const t of this.trees) {
      const p = point(t.x, t.z);
      if (this.treeArt.complete && this.treeArt.naturalWidth)
        ctx.drawImage(
          this.treeArt,
          p.x - t.s * scale,
          p.y - t.s * scale,
          t.s * scale * 2,
          t.s * scale * 2,
        );
    }
    function line(points: [number, number][], width: number, color: string) {
      ctx.beginPath();
      points.forEach(([x, z], i) => {
        const p = point(x, z);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.lineWidth = width * scale;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    const road = Array.from({ length: 50 }, (_, i) => {
      const z = -100 + i * 2.45;
      return [Math.sin((z + 24) * 0.028) * 3.1, z] as [number, number];
    });
    line(road, 5.9, "#8a805c");
    line(road, 4.2, "#ccbb8b");
    line(
      [
        [0, -24],
        [14, -22],
        [32, -23],
        [51, -24],
      ],
      3.8,
      "#c2b383",
    );
    const court = point(0, -3);
    ctx.fillStyle = "#b9ae86";
    ctx.beginPath();
    ctx.ellipse(court.x, court.y, 12 * scale, 11 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    // Illustrated terracotta roof plan, masonry outline and ridge highlights.
    for (const [x, z, ww, dd] of [
      [0, 24, 13, 31],
      [-12, 26, 11, 23],
      [12, 29, 11, 17],
      [-8, 36, 8, 9],
      [0, 6, 10, 5],
    ]) {
      const p = point(x - ww / 2, z + dd / 2);
      ctx.fillStyle = "#77725d";
      ctx.fillRect(p.x - 1, p.y - 1, ww * scale + 2, dd * scale + 2);
      ctx.fillStyle = "#914f36";
      ctx.fillRect(p.x, p.y, ww * scale, dd * scale);
      ctx.fillStyle = "#c07c51";
      ctx.fillRect(p.x, p.y, (ww * scale) / 2, dd * scale);
      ctx.strokeStyle = "#754b37";
      ctx.lineWidth = 0.7;
      for (let zz = 0; zz < dd; zz += 1.8) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + zz * scale);
        ctx.lineTo(p.x + ww * scale, p.y + zz * scale);
        ctx.stroke();
      }
    }
    const n = point(-4.8, -7);
    ctx.fillStyle = "#f3d174";
    ctx.strokeStyle = "#594827";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(n.x, n.y - 7);
    ctx.lineTo(n.x + 6, n.y);
    ctx.lineTo(n.x, n.y + 7);
    ctx.lineTo(n.x - 6, n.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    for (const e of enemies) {
      if (e.dead) continue;
      const p = point(e.x, e.z);
      ctx.fillStyle = "#8f3025";
      ctx.strokeStyle = "#e0b093";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, large ? 4 : 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    const p = point(player.x, player.z);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(yaw);
    ctx.fillStyle = "#f7f2c8";
    ctx.strokeStyle = "#373b31";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(6, 7);
    ctx.lineTo(0, 4);
    ctx.lineTo(-6, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    if (large) {
      ctx.font = "600 21px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#433d2b";
      const a = point(0, 53);
      ctx.fillText("北 郡 修 道 院", a.x, a.y);
      const b = point(40, -53);
      ctx.font = "15px Georgia, serif";
      ctx.fillText("东部林地", b.x, b.y);
      const c = point(-32, -40);
      ctx.fillText("艾尔文森林", c.x, c.y);
      ctx.font = "12px Georgia, serif";
      ctx.textAlign = "left";
      ctx.fillText("◆ 任务   ● 森林狼   ▲ 你的位置", 20, h - 20);
    }
  }
}
