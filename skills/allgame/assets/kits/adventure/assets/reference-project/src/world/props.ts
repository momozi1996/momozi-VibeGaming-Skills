import { Scene } from "@babylonjs/core/scene.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData.js";
import { Builder } from "./geometry";
import type { Palette } from "./materials";
import { heightAt } from "./terrain";
export function createProps(scene: Scene, m: Palette) {
  const b = new Builder(scene),
    flags: Mesh[] = [];
  function fence(x: number, z: number, length: number, angle = 0) {
    const local = (xx: number, yy: number, zz: number) => [
      x + Math.cos(angle) * xx - Math.sin(angle) * zz,
      heightAt(x, z) + yy,
      z + Math.sin(angle) * xx + Math.cos(angle) * zz,
    ];
    for (let i = 0; i <= length; i += 2.8) {
      b.box("Hewn fence post", local(i, 0.7, 0), [0.2, 1.5, 0.2], m.wood, [
        0,
        -angle,
        0,
      ]);
      b.cylinder(
        "Fence post cap",
        local(i, 1.42, 0),
        local(i, 1.65, 0),
        0.14,
        0.02,
        m.wood,
        4,
      );
    }
    for (const y of [0.55, 1.08])
      b.cylinder(
        "Rough fence rail",
        local(0, y, 0),
        local(length, y, 0),
        0.095,
        0.095,
        m.wood,
        6,
      );
  }
  fence(-10, -69, 25, Math.PI / 2);
  fence(11, -67, 29, Math.PI / 2);
  fence(11, -14, 12, 0);
  fence(-23, -13, 12, 0);
  fence(53, -10, 25, Math.PI / 2);
  function lantern(x: number, z: number) {
    const y = heightAt(x, z);
    b.box("Lantern stone base", [x, y + 0.18, z], [0.8, 0.36, 0.8], m.trim);
    b.cylinder(
      "Lantern wrought iron post",
      [x, y + 0.3, z],
      [x, y + 3.6, z],
      0.1,
      0.065,
      m.metal,
    );
    b.cylinder(
      "Lantern arm",
      [x, y + 3.5, z],
      [x + 0.6, y + 3.5, z],
      0.055,
      0.055,
      m.metal,
    );
    b.box("Lantern glass", [x + 0.6, y + 3.12, z], [0.34, 0.48, 0.34], m.glow);
    b.box(
      "Lantern upper cornice",
      [x + 0.6, y + 3.42, z],
      [0.48, 0.1, 0.48],
      m.metal,
    );
    b.box(
      "Lantern base frame",
      [x + 0.6, y + 2.84, z],
      [0.42, 0.08, 0.42],
      m.metal,
    );
    for (const dx of [-0.19, 0.19])
      for (const dz of [-0.19, 0.19])
        b.box(
          "Lantern iron glazing bar",
          [x + 0.6 + dx, y + 3.12, z + dz],
          [0.025, 0.55, 0.025],
          m.metal,
        );
  }
  lantern(-7.5, -13);
  lantern(7.5, -13);
  lantern(-6, 1);
  lantern(6, 1);
  function banner(x: number, z: number) {
    const y = heightAt(x, z);
    b.cylinder(
      "Standard pole",
      [x, y, z],
      [x, y + 5.6, z],
      0.067,
      0.043,
      m.metal,
    );
    b.cylinder(
      "Standard crosspiece",
      [x - 0.8, y + 5.12, z],
      [x + 0.8, y + 5.12, z],
      0.042,
      0.042,
      m.gold,
    );
    b.cylinder(
      "Standard spearhead",
      [x, y + 5.57, z],
      [x, y + 5.95, z],
      0.15,
      0,
      m.gold,
      6,
    );
    const positions: number[] = [],
      indices: number[] = [],
      uvs: number[] = [];
    const n = 18;
    for (let j = 0; j <= n; j++)
      for (let i = 0; i <= 6; i++) {
        const u = i / 6,
          v = j / n;
        positions.push(
          x + (u - 0.5) * 1.45,
          y + 5.02 - v * 2.85,
          z + Math.sin(u * 4 + v * 2) * 0.08 * v,
        );
        uvs.push(u, 1 - v);
        if (j < n && i < 6) {
          let a = j * 7 + i;
          indices.push(a, a + 1, a + 8, a, a + 8, a + 7);
        }
      }
    const normals: number[] = [];
    VertexData.ComputeNormals(positions, indices, normals);
    const d = new VertexData();
    Object.assign(d, { positions, indices, normals, uvs });
    const flag = new Mesh("Blue embroidered standard", scene);
    d.applyToMesh(flag, true);
    flag.material = m.cloth;
    flag.receiveShadows = true;
    flag.metadata = { base: positions.slice() };
    flags.push(flag);
  }
  banner(-7.7, -5.5);
  banner(7.7, -5.5);
  // A hand-built wagon, with spokes, hoops, boards and axle hardware.
  const wx = -15,
    wz = -8,
    wy = heightAt(wx, wz);
  for (let i = 0; i < 8; i++)
    b.box(
      "Wagon floor board",
      [wx - 1.05 + i * 0.3, wy + 0.83, wz],
      [0.28, 0.12, 3.3],
      m.wood,
    );
  for (const side of [-1, 1]) {
    for (let j = 0; j < 3; j++)
      b.box(
        "Wagon side board",
        [wx + side * 1.2, wy + 1.05 + j * 0.23, wz],
        [0.1, 0.2, 3.45],
        m.wood,
      );
    for (const dz of [-1.22, 1.22]) {
      b.box(
        "Wagon corner post",
        [wx + side * 1.2, wy + 1.22, wz + dz],
        [0.15, 1.13, 0.15],
        m.wood,
      );
      const cx = wx + side * 1.38,
        cz = wz + dz;
      for (const [rad, thick, mat] of [
        [0.69, 0.085, m.wood],
        [0.75, 0.035, m.metal],
      ] as const) {
        const t = MeshBuilder.CreateTorus(
          "Wagon wheel hoop",
          { diameter: rad * 2, thickness: thick, tessellation: 32 },
          scene,
        );
        t.rotation.z = Math.PI / 2;
        t.position.set(cx, wy + 0.75, cz);
        b.add(t, mat);
      }
      b.cylinder(
        "Wheel hub",
        [cx - 0.13, wy + 0.75, cz],
        [cx + 0.13, wy + 0.75, cz],
        0.15,
        0.15,
        m.wood,
      );
      for (let k = 0; k < 12; k++) {
        const a = (k * Math.PI) / 6;
        b.cylinder(
          "Wheel spoke",
          [cx, wy + 0.75, cz],
          [cx, wy + 0.75 + Math.sin(a) * 0.67, cz + Math.cos(a) * 0.67],
          0.035,
          0.025,
          m.wood,
          6,
        );
      }
    }
    b.cylinder(
      "Wagon shaft",
      [wx + side * 0.8, wy + 0.76, wz - 1.4],
      [wx + side * 0.72, wy + 0.43, wz - 4.3],
      0.06,
      0.045,
      m.wood,
      8,
    );
  }
  // Crates and barrels with stave texture and metal bands.
  for (const [x, z, s] of [
    [-14, -7, 1],
    [-15, -8, 1.15],
    [-14.3, -9, 0.8],
    [10, 2, 1],
    [11.2, 2.3, 0.85],
  ]) {
    const y = heightAt(x, z) + (x < -12 ? 0.93 : 0);
    b.box("Supply crate", [x, y + s * 0.43, z], [s, 0.86 * s, s], m.wood);
    for (const zz of [-1, 1])
      for (const yy of [-1, 1])
        b.box(
          "Crate batten",
          [x, y + s * 0.43 + yy * s * 0.3, z + zz * s * 0.51],
          [s * 1.05, 0.1, 0.06],
          m.wood,
        );
  }
  for (const [x, z] of [
    [-11, -5],
    [-11.8, -4.8],
    [11.5, 1],
  ]) {
    const y = heightAt(x, z);
    const barrel = MeshBuilder.CreateLathe(
      "Coopered oak barrel",
      {
        shape: [
          new Vector3(0.37, 0, 0),
          new Vector3(0.46, 0.2, 0),
          new Vector3(0.49, 0.6, 0),
          new Vector3(0.45, 1, 0),
          new Vector3(0.37, 1.17, 0),
        ],
        radius: 1,
        tessellation: 20,
        cap: Mesh.CAP_ALL,
      },
      scene,
    );
    barrel.position.set(x, y, z);
    b.add(barrel, m.wood);
    for (const yy of [0.15, 0.4, 0.82, 1.05]) {
      const tor = MeshBuilder.CreateTorus(
        "Barrel iron hoop",
        {
          diameter: yy < 0.3 || yy > 1 ? 0.84 : 0.95,
          thickness: 0.065,
          tessellation: 24,
        },
        scene,
      );
      tor.position.set(x, y + yy, z);
      b.add(tor, m.metal);
    }
  }
  // A quiet wayside shrine and herb garden along the woodland path.
  for (const [x, z] of [
    [29, -23],
    [42, -25],
    [32, -34],
  ]) {
    for (let i = 0; i < 9; i++) {
      const a = i * 2.399;
      const rx = x + Math.cos(a) * 0.7,
        rz = z + Math.sin(a) * 0.6;
      const stone = MeshBuilder.CreateIcoSphere(
        "Herb garden fieldstone",
        { radius: 0.16, subdivisions: 2 },
        scene,
      );
      stone.position.set(rx, heightAt(rx, rz) + 0.07, rz);
      stone.scaling.set(1.3, 0.65, 1);
      stone.rotation.y = a;
      b.add(stone, m.rock);
    }
  }
  b.cylinder("Signpost shaft", [10, 0, -31], [10, 3.2, -31], 0.1, 0.08, m.wood);
  b.box(
    "Carved signboard",
    [10.1, 2.7, -31],
    [2.3, 0.6, 0.16],
    m.wood,
    [0, -0.14, 0.03],
  );
  const meshes = b.merge("Handcrafted village props");
  return {
    meshes,
    flags,
    update(t: number) {
      for (const f of flags) {
        const base = f.metadata.base as number[];
        const p = base.slice();
        for (let i = 0; i < p.length; i += 3) {
          const v = (5.02 - p[i + 1]) / 2.85;
          p[i + 2] +=
            Math.sin(t * 1.65 + p[i] * 2.7 - v * 3) * 0.14 * Math.max(0, v);
        }
        f.updateVerticesData("position", p);
      }
    },
  };
}
