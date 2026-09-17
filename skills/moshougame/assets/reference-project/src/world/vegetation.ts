import { Scene } from "@babylonjs/core/scene.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import {
  Matrix,
  Quaternion,
  Vector3,
} from "@babylonjs/core/Maths/math.vector.js";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData.js";
import { Builder } from "./geometry";
import type { Palette } from "./materials";
import { heightAt, onPath } from "./terrain";
import { seeded } from "../core/math";
export function vegetation(scene: Scene, m: Palette) {
  const r = seeded(417),
    b = new Builder(scene),
    treeBounds: { x: number; z: number; r: number }[] = [];
  // Full branch structures and hundreds of individually oriented textured leaf clusters.
  const trunkPath = [];
  for (let j = 0; j < 10; j++)
    trunkPath.push(
      new Vector3(Math.sin(j * 0.38) * 0.3, j * 0.8, Math.sin(j * 0.62) * 0.16),
    );
  const trunk = MeshBuilder.CreateTube(
    "Oak tapered trunk",
    {
      path: trunkPath,
      radiusFunction: (i) => 0.46 * (1 - i / 13),
      tessellation: 12,
      cap: Mesh.CAP_ALL,
    },
    scene,
  );
  b.add(trunk, m.bark);
  for (let j = 0; j < 7; j++) {
    const a = j * 2.4;
    b.cylinder(
      "Oak buttress root",
      [Math.cos(a) * 1.0, 0.02, Math.sin(a) * 1.0],
      [0, 1.1, 0],
      0.1,
      0.27,
      m.bark,
      8,
    );
  }
  const leafB = new Builder(scene);
  for (let j = 0; j < 15; j++) {
    const a = j * 2.399,
      h = 3.0 + r() * 3.1,
      len = 1.8 + r() * 2.5,
      tip = new Vector3(Math.cos(a) * len, h + 1.2 + r(), Math.sin(a) * len);
    const base = new Vector3(0.2, h, 0),
      mid = Vector3.Lerp(base, tip, 0.55);
    mid.y += 0.24;
    b.tube("Oak bough", [base, mid, tip], 0.11 + r() * 0.055, m.bark, 8);
    for (let k = 0; k < 3; k++) {
      const end = tip.add(
        new Vector3((r() - 0.5) * 2, r() * 1.4, (r() - 0.5) * 2),
      );
      b.cylinder(
        "Oak twig",
        Vector3.Lerp(mid, tip, 0.4).asArray(),
        end.asArray(),
        0.06,
        0.015,
        m.bark,
        6,
      );
    }
  }
  for (let j = 0; j < 330; j++) {
    const a = r() * Math.PI * 2,
      rr = Math.sqrt(r()),
      x = Math.cos(a) * rr * 4.4,
      z = Math.sin(a) * rr * 4.1,
      y = 6.2 + (r() - 0.25) * 3.3 + (0.4 - rr) * 0.9;
    const yaw = r() * Math.PI * 2,
      pitch = (r() - 0.5) * 1.9,
      size = 0.82 + r() * 0.82;
    const mat = Matrix.Compose(
      new Vector3(size, size, 1),
      Quaternion.RotationYawPitchRoll(yaw, pitch, 0),
      new Vector3(x, y, z),
    );
    const points = [
      new Vector3(-0.7, -0.7, 0),
      new Vector3(0.7, -0.7, 0),
      new Vector3(0.7, 0.7, 0),
      new Vector3(-0.7, 0.7, 0),
    ].map((p) => Vector3.TransformCoordinates(p, mat).asArray());
    leafB.quad("Veined foliage spray", points, m.leaves);
  }
  const trunks = b.merge("Oak tree bark")[0],
    leaves = leafB.merge("Oak tree canopy")[0];
  const transforms: Matrix[] = [];
  function tree(x: number, z: number, s: number) {
    const y = heightAt(x, z);
    transforms.push(
      Matrix.Compose(
        new Vector3(s, s, s),
        Quaternion.RotationYawPitchRoll(r() * 6.28, 0, (r() - 0.5) * 0.05),
        new Vector3(x, y, z),
      ),
    );
    treeBounds.push({ x, z, r: 0.45 * s });
  }
  tree(-20, -21, 1.4);
  tree(19, -17, 1.5);
  tree(-23, -40, 1.2);
  tree(25, -44, 1.2);
  tree(-26, 3, 1.1);
  tree(24, 1, 1.25);
  for (let i = 0; i < 120; i++) {
    const x = (r() - 0.5) * 175,
      z = -91 + r() * 180;
    if (
      onPath(x, z) ||
      (Math.abs(x) < 25 && z > -15 && z < 56) ||
      (Math.abs(x - 37) < 14 && Math.abs(z + 23) < 16)
    )
      continue;
    tree(x, z, 0.85 + r() * 0.68);
  }
  // Planted cypress-like shrubs along the abbey façade, made of textured foliage.
  const shrubTransforms = [];
  for (const x of [-15, -11, -7, 7, 11, 15])
    shrubTransforms.push(
      Matrix.Compose(
        new Vector3(0.2, 0.53, 0.2),
        Quaternion.Identity(),
        new Vector3(x, -1.4, 1.8),
      ),
    );
  for (const mesh of [trunks, leaves]) {
    const buf = new Float32Array(transforms.length * 16);
    transforms.forEach((t, i) => t.copyToArray(buf, i * 16));
    mesh.thinInstanceSetBuffer("matrix", buf, 16, true);
    mesh.thinInstanceRefreshBoundingInfo(true);
    mesh.receiveShadows = true;
    mesh.isPickable = false;
  }
  const shrub = leaves.clone("Cypress foliage")!;
  shrub.makeGeometryUnique();
  const sb = new Float32Array(shrubTransforms.length * 16);
  shrubTransforms.forEach((t, i) => t.copyToArray(sb, i * 16));
  shrub.thinInstanceSetBuffer("matrix", sb, 16, true);
  shrub.thinInstanceRefreshBoundingInfo(true);
  // Ground vegetation uses alpha-tested artwork, not solid-color triangles.
  function scatter(
    name: string,
    material: typeof m.grass,
    count: number,
    flower = false,
  ) {
    const builder = new Builder(scene);
    for (const a of [0, Math.PI / 2]) {
      const v = (x: number, y: number) => [Math.cos(a) * x, y, Math.sin(a) * x];
      builder.quad(
        name,
        [
          v(-0.48, 0),
          v(0.48, 0),
          v(0.48, flower ? 0.76 : 0.6),
          v(-0.48, flower ? 0.76 : 0.6),
        ],
        material,
      );
    }
    const mesh = builder.merge(name)[0],
      arr: number[] = [];
    for (let i = 0; i < count; i++) {
      const x = (r() - 0.5) * 125,
        z = -78 + r() * 131;
      if (onPath(x, z) || (Math.abs(x) < 19 && z > 3 && z < 51)) continue;
      const s = 0.55 + r() * 0.85;
      Matrix.Compose(
        new Vector3(s, s, s),
        Quaternion.RotationYawPitchRoll(r() * 6.28, 0, 0),
        new Vector3(x, heightAt(x, z) - 0.02, z),
      ).copyToArray(arr, arr.length);
    }
    mesh.thinInstanceSetBuffer("matrix", new Float32Array(arr), 16, true);
    mesh.thinInstanceRefreshBoundingInfo(true);
    mesh.isPickable = false;
    mesh.receiveShadows = true;
    return mesh;
  }
  const grass = scatter("Meadow tufts", m.grass, 6800),
    flowers = scatter("Wildflower clusters", m.flowers, 520, true);
  // Detailed, uneven textured boulders.
  const rockBuilder = new Builder(scene);
  for (let i = 0; i < 35; i++) {
    const x = (r() - 0.5) * 120,
      z = -70 + r() * 125;
    if (onPath(x, z) || (Math.abs(x) < 23 && z > 0)) continue;
    const rock = MeshBuilder.CreateSphere(
      "Weathered fieldstone",
      { diameter: 1, segments: 8, updatable: true },
      scene,
    );
    const pos = rock.getVerticesData("position")!;
    for (let j = 0; j < pos.length; j += 3) {
      const q = 0.8 + r() * 0.35;
      pos[j] *= q;
      pos[j + 1] *= q;
      pos[j + 2] *= q;
    }
    rock.updateVerticesData("position", pos);
    const normals: number[] = [];
    VertexData.ComputeNormals(pos, rock.getIndices()!, normals);
    rock.updateVerticesData("normal", normals);
    const s = 0.8 + r() * 2.6;
    rock.scaling.set(s, s * 0.7, s * 1.1);
    rock.position.set(x, heightAt(x, z) + s * 0.13, z);
    rockBuilder.add(rock, m.rock);
  }
  const rocks = rockBuilder.merge("Fieldstones");
  return {
    casters: [trunks, leaves, ...rocks],
    grass,
    flowers,
    treeBounds,
    leaves,
  };
}
