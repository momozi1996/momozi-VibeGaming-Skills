import { THEME } from "../theme";
import { Scene } from "@babylonjs/core/scene.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { clamp } from "../core/math";
export function heightAt(x: number, z: number) {
  const edge = clamp((Math.abs(x) - 22) / 38, 0, 1),
    back = clamp((z - 43) / 35, 0, 1);
  return (
    (Math.sin(x * 0.045 + 1.5) * Math.cos(z * 0.043) * 2.6 +
      Math.sin(z * 0.11 + x * 0.037) * 0.8) *
      edge +
    Math.max(0, back) * 9 +
    Math.max(0, Math.abs(x) - 72) * 0.24
  );
}
export function pathX(z: number) {
  return Math.sin((z + 24) * 0.028) * 3.1;
}
export function onPath(x: number, z: number) {
  return (
    Math.abs(x - pathX(z)) < 4.1 ||
    Math.hypot(x, z + 3) < 13 ||
    (z > -28 && z < -20 && x > 0 && x < 47)
  );
}
export function createTerrain(scene: Scene) {
  const ground = MeshBuilder.CreateGround(
    "Sculpted terrain",
    { width: 240, height: 250, subdivisions: 160, updatable: true },
    scene,
  );
  ground.position.z = 8;
  const p = ground.getVerticesData("position")!;
  for (let i = 0; i < p.length; i += 3) p[i + 1] = heightAt(p[i], p[i + 2] + 8);
  ground.updateVerticesData("position", p);
  const normals: number[] = [];
  VertexData.ComputeNormals(p, ground.getIndices()!, normals);
  ground.updateVerticesData("normal", normals);
  const mat = new StandardMaterial("Meadow | CC0 ground detail", scene);
  mat.diffuseTexture = new Texture("/assets/textures/ground.jpg", scene);
  (mat.diffuseTexture as Texture).uScale = 43;
  (mat.diffuseTexture as Texture).vScale = 45;
  mat.bumpTexture = new Texture("/assets/textures/ground-normal.jpg", scene);
  (mat.bumpTexture as Texture).uScale = 43;
  (mat.bumpTexture as Texture).vScale = 45;
  mat.bumpTexture.level = 0.45;
  mat.diffuseColor = Color3.FromHexString(THEME.ground);
  mat.specularColor = Color3.Black();
  ground.material = mat;
  ground.receiveShadows = true;
  const pathmat = new StandardMaterial("Blended gravel path", scene);
  pathmat.diffuseTexture = new Texture("/assets/textures/path.jpg", scene);
  pathmat.specularColor = Color3.Black();
  pathmat.transparencyMode = 2;
  pathmat.zOffset = -1;
  pathmat.disableDepthWrite = true;
  function strip(name: string, centers: Vector3[], width: number) {
    const positions: number[] = [],
      uvs: number[] = [],
      indices: number[] = [],
      colors: number[] = [];
    centers.forEach((c, i) => {
      const next = centers[Math.min(i + 1, centers.length - 1)],
        prev = centers[Math.max(0, i - 1)];
      const tangent = next.subtract(prev).normalize();
      const across = new Vector3(-tangent.z, 0, tangent.x);
      [-1, -0.72, 0.72, 1].forEach((q, j) => {
        const x = c.x + (across.x * q * width) / 2,
          z = c.z + (across.z * q * width) / 2;
        positions.push(x, heightAt(x, z) + 0.028, z);
        uvs.push((q + 1) * 0.6, i * 0.5);
        colors.push(1, 1, 1, j === 0 || j === 3 ? 0 : 1);
      });
      if (i > 0)
        for (let j = 0; j < 3; j++) {
          const a = (i - 1) * 4 + j,
            b = i * 4 + j;
          indices.push(a, b, a + 1, a + 1, b, b + 1);
        }
    });
    const mesh = new Mesh(name, scene),
      n: number[] = [];
    VertexData.ComputeNormals(positions, indices, n);
    const data = new VertexData();
    Object.assign(data, { positions, indices, normals: n, uvs, colors });
    data.applyToMesh(mesh);
    mesh.material = pathmat;
    mesh.hasVertexAlpha = true;
    mesh.receiveShadows = true;
    return mesh;
  }
  strip(
    "Northshire road",
    Array.from({ length: 85 }, (_, i) => {
      let z = -110 + i * 1.6;
      return new Vector3(pathX(z), 0, z);
    }),
    8.8,
  );
  strip(
    "Woodland trail",
    Array.from(
      { length: 36 },
      (_, i) => new Vector3(i * 1.55, 0, -24 + Math.sin(i * 0.13) * 2),
    ),
    4.6,
  );
  // Textured radial courtyard with a feathered edge.
  const pos = [0, 0.038, -3],
    uv = [0, 0],
    col = [1, 1, 1, 1],
    ind: number[] = [];
  const seg = 80;
  for (const [r, a] of [
    [11.6, 1],
    [13, 0],
  ])
    for (let j = 0; j <= seg; j++) {
      const t = (j / seg) * Math.PI * 2,
        x = Math.cos(t) * r,
        z = -3 + Math.sin(t) * r;
      pos.push(x, heightAt(x, z) + 0.034, z);
      uv.push(x / 5, z / 5);
      col.push(1, 1, 1, a);
    }
  for (let j = 0; j < seg; j++) {
    ind.push(0, j + 2, j + 1);
    let a = j + 1,
      b = j + seg + 2;
    ind.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const mesh = new Mesh("Courtyard worn earth", scene),
    n: number[] = [];
  VertexData.ComputeNormals(pos, ind, n);
  const d = new VertexData();
  Object.assign(d, {
    positions: pos,
    indices: ind,
    normals: n,
    uvs: uv,
    colors: col,
  });
  d.applyToMesh(mesh);
  mesh.material = pathmat;
  mesh.hasVertexAlpha = true;
  mesh.receiveShadows = true;
  return ground;
}
