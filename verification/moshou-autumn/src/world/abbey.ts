import { Scene } from "@babylonjs/core/scene.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Builder } from "./geometry";
import type { Palette } from "./materials";
export type Obstacle = { x: number; z: number; w: number; d: number };
export function buildAbbey(scene: Scene, m: Palette) {
  const b = new Builder(scene);
  const obstacles: Obstacle[] = [];
  function block(x: number, z: number, w: number, d: number, h: number) {
    b.box("Masonry mass", [x, h / 2 + 0.5, z], [w, h, d], m.stone);
    obstacles.push({ x, z, w: w + 0.8, d: d + 0.8 });
    for (const yy of [0.3, 0.75, h - 1, h + 0.1])
      b.box(
        "Stone string course",
        [x, yy, z],
        [w + 0.32, 0.2, d + 0.32],
        m.trim,
      );
    b.box("Foundation", [x, 0.19, z], [w + 0.9, 0.4, d + 0.9], m.trim);
  }
  function gable(
    x: number,
    z: number,
    w: number,
    d: number,
    eave: number,
    rise: number,
  ) {
    b.quad(
      "Roof south slope",
      [
        [x - w / 2 - 0.5, eave, z - d / 2 - 0.6],
        [x, eave + rise, z - d / 2 - 0.6],
        [x, eave + rise, z + d / 2 + 0.6],
        [x - w / 2 - 0.5, eave, z + d / 2 + 0.6],
      ],
      m.roof,
      [w / 5, d / 5],
    );
    b.quad(
      "Roof north slope",
      [
        [x, eave + rise, z - d / 2 - 0.6],
        [x + w / 2 + 0.5, eave, z - d / 2 - 0.6],
        [x + w / 2 + 0.5, eave, z + d / 2 + 0.6],
        [x, eave + rise, z + d / 2 + 0.6],
      ],
      m.roof,
      [w / 5, d / 5],
    );
    b.cylinder(
      "Ridge coping",
      [x, eave + rise + 0.05, z - d / 2 - 0.8],
      [x, eave + rise + 0.05, z + d / 2 + 0.8],
      0.16,
      0.16,
      m.roof,
    );
    for (const zz of [z - d / 2 - 0.14, z + d / 2 + 0.14]) {
      b.quad(
        "Gable masonry",
        [
          [x - w / 2, eave - 0.15, zz],
          [x + w / 2, eave - 0.15, zz],
          [x, eave + rise - 0.05, zz],
          [x - w / 2, eave - 0.15, zz],
        ],
        m.stone,
        [w / 5, rise / 4],
      );
      for (const side of [-1, 1])
        b.cylinder(
          "Gable carved coping",
          [x + side * (w / 2 + 0.4), eave, zz - 0.16],
          [x, eave + rise + 0.2, zz - 0.16],
          0.25,
          0.25,
          m.trim,
          8,
        );
    }
  }
  function crossRoof(
    x: number,
    z: number,
    w: number,
    d: number,
    eave: number,
    rise: number,
  ) {
    b.quad(
      "Long terracotta aisle roof",
      [
        [x - w / 2 - 0.5, eave, z - d / 2 - 0.5],
        [x + w / 2 + 0.5, eave, z - d / 2 - 0.5],
        [x + w / 2 + 0.5, eave + rise, z],
        [x - w / 2 - 0.5, eave + rise, z],
      ],
      m.roof,
      [w / 4, d / 6],
    );
    b.quad(
      "Aisle rear roof",
      [
        [x - w / 2 - 0.5, eave + rise, z],
        [x + w / 2 + 0.5, eave + rise, z],
        [x + w / 2 + 0.5, eave, z + d / 2 + 0.5],
        [x - w / 2 - 0.5, eave, z + d / 2 + 0.5],
      ],
      m.roof,
      [w / 4, d / 6],
    );
    b.cylinder(
      "Terracotta ridge",
      [x - w / 2 - 0.65, eave + rise, z],
      [x + w / 2 + 0.65, eave + rise, z],
      0.19,
      0.19,
      m.roof,
    );
    for (const xx of [x - w / 2 - 0.07, x + w / 2 + 0.07]) {
      b.quad(
        "Aisle end gable",
        [
          [xx, eave, z - d / 2],
          [xx, eave + rise, z],
          [xx, eave, z + d / 2],
          [xx, eave, z - d / 2],
        ],
        m.stone,
        [d / 5, rise / 3],
      );
      b.cylinder(
        "Aisle end coping",
        [xx, eave, z - d / 2 - 0.5],
        [xx, eave + rise + 0.15, z],
        0.19,
        0.19,
        m.trim,
        8,
      );
      b.cylinder(
        "Aisle back coping",
        [xx, eave + rise + 0.15, z],
        [xx, eave, z + d / 2 + 0.5],
        0.19,
        0.19,
        m.trim,
        8,
      );
    }
  }
  function hipRoof(
    x: number,
    z: number,
    w: number,
    d: number,
    y: number,
    h: number,
  ) {
    const bottom = [
      [-w / 2 - 0.4, -d / 2 - 0.4],
      [w / 2 + 0.4, -d / 2 - 0.4],
      [w / 2 + 0.4, d / 2 + 0.4],
      [-w / 2 - 0.4, d / 2 + 0.4],
    ];
    const top = [
      [-w * 0.23, -d * 0.23],
      [w * 0.23, -d * 0.23],
      [w * 0.23, d * 0.23],
      [-w * 0.23, d * 0.23],
    ];
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      b.quad(
        "Belltower hipped terracotta roof",
        [
          [x + bottom[i][0], y, z + bottom[i][1]],
          [x + bottom[j][0], y, z + bottom[j][1]],
          [x + top[j][0], y + h, z + top[j][1]],
          [x + top[i][0], y + h, z + top[i][1]],
        ],
        m.roof,
        [w / 5, h / 5],
      );
      b.cylinder(
        "Hip ridge tiles",
        [x + bottom[i][0], y, z + bottom[i][1]],
        [x + top[i][0], y + h, z + top[i][1]],
        0.12,
        0.09,
        m.roof,
      );
    }
  }
  // Main nave, lower aisles, transept, and belltower: red tiled / pale stone reference.
  block(0, 24, 13, 31, 11.7);
  gable(0, 24, 13, 31, 12, 7.2);
  block(-12.1, 26, 10.8, 23, 7.4);
  crossRoof(-12.1, 26, 10.8, 23, 7.7, 4.1);
  block(12, 29, 10.8, 17, 6.5);
  crossRoof(12, 29, 10.8, 17, 6.8, 4.1);
  block(-8.3, 36.2, 8, 9, 20.2);
  hipRoof(-8.3, 36.2, 8, 9, 20.5, 4.1);
  // Dormer at belltower peak and metal finial.
  block(-8.3, 36.2, 3.4, 3.8, 25);
  hipRoof(-8.3, 36.2, 3.4, 3.8, 25.3, 2.2);
  b.cylinder(
    "Belltower spire",
    [-8.3, 27.4, 36.2],
    [-8.3, 30.1, 36.2],
    0.1,
    0.035,
    m.metal,
  );
  b.cylinder(
    "Spire cross",
    [-8.85, 29.1, 36.2],
    [-7.75, 29.1, 36.2],
    0.045,
    0.045,
    m.metal,
  );
  // Front portico: pointed gable, three lancets, large carved rose.
  block(0, 6.7, 9.5, 4.6, 9.2);
  gable(0, 6.7, 9.5, 4.6, 9.5, 5.2);
  // Recessed door at front, wooden planks, framed portal and stairs.
  b.box("Door recess", [0, 2.5, 4.34], [3.8, 4.8, 0.12], m.metal);
  for (let i = 0; i < 12; i++)
    b.box(
      "Individual oak door plank",
      [-1.65 + i * 0.3, 2.05, 4.23],
      [0.275, 3.7, 0.12],
      m.wood,
    );
  for (const x of [-0.9, 0.9])
    for (const y of [0.95, 2.7])
      b.box(
        "Wrought iron door strap",
        [x, y, 4.13],
        [1.55, 0.13, 0.05],
        m.metal,
      );
  for (const x of [-0.2, 0.2]) {
    const ring = MeshBuilder.CreateTorus(
      "Door pull",
      { diameter: 0.28, thickness: 0.043, tessellation: 18 },
      scene,
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, 1.96, 4.06);
    b.add(ring, m.gold);
  }
  function arch(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    glass = true,
    side = false,
  ) {
    const points: Vector3[] = [
      new Vector3(x - w / 2, y, z),
      new Vector3(x - w / 2, y + h * 0.66, z),
    ];
    for (let i = 0; i <= 16; i++) {
      const xx = -w / 2 + (i / 16) * w;
      points.push(
        new Vector3(
          x + xx,
          y + h * 0.66 + Math.pow(1 - Math.abs(xx) / (w / 2), 0.68) * h * 0.34,
          z,
        ),
      );
    }
    points.push(new Vector3(x + w / 2, y, z));
    const transform = (p: Vector3) =>
      side ? new Vector3(x, p.y, z + (p.x - x)) : p;
    b.tube(
      "Carved pointed arch",
      points.map(transform),
      w > 0.9 ? 0.14 : 0.1,
      m.trim,
      10,
    );
    if (glass) {
      const q = side
        ? [
            [x, y, z - w / 2],
            [x, y, z + w / 2],
            [x, y + h, z + w / 2],
            [x, y + h, z - w / 2],
          ]
        : [
            [x - w / 2, y, z],
            [x + w / 2, y, z],
            [x + w / 2, y + h, z],
            [x - w / 2, y + h, z],
          ];
      b.quad("Stained glass lancet", q, m.glass);
      for (const k of [-0.22, 0.22]) {
        const p1 = transform(new Vector3(x + w * k, y, z - 0.035)),
          p2 = transform(new Vector3(x + w * k, y + h * 0.78, z - 0.035));
        b.cylinder(
          "Stone mullion",
          p1.asArray(),
          p2.asArray(),
          0.038,
          0.038,
          m.trim,
        );
      }
      const p1 = transform(new Vector3(x - w * 0.47, y + h * 0.4, z - 0.055)),
        p2 = transform(new Vector3(x + w * 0.47, y + h * 0.4, z - 0.055));
      b.cylinder(
        "Window transom",
        p1.asArray(),
        p2.asArray(),
        0.05,
        0.05,
        m.trim,
      );
    }
  }
  arch(0, 0.4, 4.04, 3.7, 5.6, false);
  for (const x of [-3.45, 3.45]) arch(x, 1.5, 4.22, 1.3, 5.6);
  for (const x of [-1.65, 0, 1.65]) arch(x, 6.1, 4.12, 1.15, 3.3);
  // Rose window with 16 carved stone spokes and a stained glass disc.
  const rose = MeshBuilder.CreateDisc(
    "Rose stained glass",
    { radius: 1.08, tessellation: 64, sideOrientation: Mesh.DOUBLESIDE },
    scene,
  );
  rose.position.set(0, 11.35, 4.24);
  b.add(rose, m.glass);
  for (const radius of [1.11, 1.3]) {
    const tor = MeshBuilder.CreateTorus(
      "Rose stone tracery",
      { diameter: radius * 2, thickness: 0.14, tessellation: 48 },
      scene,
    );
    tor.rotation.x = Math.PI / 2;
    tor.position.set(0, 11.35, 4.09);
    b.add(tor, m.trim);
  }
  for (let j = 0; j < 16; j++) {
    const a = (j * Math.PI) / 8;
    b.cylinder(
      "Rose radial tracery",
      [Math.cos(a) * 0.23, 11.35 + Math.sin(a) * 0.23, 4.05],
      [Math.cos(a) * 1.09, 11.35 + Math.sin(a) * 1.09, 4.05],
      0.047,
      0.036,
      m.trim,
    );
  }
  // Stepped entrance and flanking garden walls.
  for (let i = 0; i < 4; i++)
    b.box(
      "Worn entrance step",
      [0, 0.12 + i * 0.12, 3.1 + i * 0.3],
      [5.5, 0.24 + i * 0.24, 1.25],
      m.trim,
    );
  for (const side of [-1, 1])
    for (let i = 0; i < 6; i++) {
      const x = side * 6.76,
        z = 11 + i * 5.1;
      b.box("Nave buttress", [x, 4.9, z], [0.95, 9.8, 1.2], m.stone);
      b.box("Buttress foot", [x, 0.55, z], [1.3, 1.1, 1.7], m.trim);
      b.box("Buttress cap", [x, 9.95, z], [1.18, 0.3, 1.5], m.trim);
      if (i < 5) arch(x + side * 0.01, 5, z + 2.5, 1.7, 5.1, true, true);
    }
  for (const [start, count, front] of [
    [-16.3, 4, 14.35],
    [8, 4, 20.35],
  ])
    for (let j = 0; j < count; j++) {
      const x = start + j * 2.6;
      arch(x, 1.6, front, 1.25, 3.9);
      arch(x, 5.65, front, 1.0, 1.6);
      b.box(
        "Aisle pilaster",
        [x + 1.16, 3.7, front - 0.12],
        [0.25, 7.4, 0.33],
        m.trim,
      );
    }
  for (const x of [-11, -8.3, -5.6]) arch(x, 16.8, 31.59, 1.35, 2.6);
  arch(-8.3, 22.6, 34.23, 1.7, 2.1);
  // Dentils below the nave and tower cornices.
  for (let x = -6; x <= 6; x += 0.72)
    b.box("Facade dentil", [x, 11.66, 8.1], [0.38, 0.5, 0.48], m.trim);
  for (let x = -11.9; x <= -4.7; x += 0.72)
    b.box("Tower corbel", [x, 19.8, 31.5], [0.4, 0.56, 0.56], m.trim);
  // Forecourt stone edging with individual capstones.
  for (const side of [-1, 1])
    for (let i = 0; i < 8; i++)
      b.box(
        "Garden coping",
        [side * (6 + i * 0.95), 0.18, 1.4],
        [0.89, 0.34, 0.66],
        m.trim,
      );
  const meshes = b.merge("Northshire Abbey");
  return { meshes, obstacles };
}
