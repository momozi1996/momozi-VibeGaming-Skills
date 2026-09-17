import { Scene } from "@babylonjs/core/scene.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Vector3, Quaternion } from "@babylonjs/core/Maths/math.vector.js";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData.js";
import { Material } from "@babylonjs/core/Materials/material.js";
export class Builder {
  batches = new Map<Material, Mesh[]>();
  constructor(public scene: Scene) {}
  add(m: Mesh, mat: Material) {
    m.material = mat;
    const list = this.batches.get(mat) || [];
    list.push(m);
    this.batches.set(mat, list);
    return m;
  }
  box(
    name: string,
    pos: number[],
    size: number[],
    mat: Material,
    rot?: number[],
  ) {
    const m = MeshBuilder.CreateBox(
      name,
      { width: size[0], height: size[1], depth: size[2] },
      this.scene,
    );
    m.position.set(pos[0], pos[1], pos[2]);
    if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
    return this.add(m, mat);
  }
  cylinder(
    name: string,
    a: number[],
    b: number[],
    r1: number,
    r2: number,
    mat: Material,
    sides = 12,
  ) {
    const av = Vector3.FromArray(a),
      bv = Vector3.FromArray(b),
      v = bv.subtract(av);
    const m = MeshBuilder.CreateCylinder(
      name,
      {
        height: v.length(),
        diameterBottom: r1 * 2,
        diameterTop: r2 * 2,
        tessellation: sides,
      },
      this.scene,
    );
    m.position = av.add(bv).scale(0.5);
    m.rotationQuaternion = Quaternion.FromUnitVectorsToRef(
      Vector3.Up(),
      v.normalize(),
      new Quaternion(),
    );
    return this.add(m, mat);
  }
  tube(name: string, points: Vector3[], r: number, mat: Material, sides = 8) {
    return this.add(
      MeshBuilder.CreateTube(
        name,
        { path: points, radius: r, tessellation: sides, cap: Mesh.CAP_ALL },
        this.scene,
      ),
      mat,
    );
  }
  quad(
    name: string,
    corners: number[][],
    mat: Material,
    uvScale: number[] = [1, 1],
  ) {
    const positions = corners.flat(),
      indices = [0, 1, 2, 0, 2, 3],
      normals: number[] = [];
    VertexData.ComputeNormals(positions, indices, normals);
    const d = new VertexData();
    Object.assign(d, {
      positions,
      indices,
      normals,
      uvs: [0, 0, uvScale[0], 0, uvScale[0], uvScale[1], 0, uvScale[1]],
    });
    const mesh = new Mesh(name, this.scene);
    d.applyToMesh(mesh);
    return this.add(mesh, mat);
  }
  merge(prefix: string) {
    const result: Mesh[] = [];
    this.batches.forEach((meshes, mat) => {
      if (!meshes.length) return;
      const m = Mesh.MergeMeshes(meshes, true, true, undefined, false, false);
      if (m) {
        m.name = prefix + " | " + mat.name;
        m.material = mat;
        m.receiveShadows = true;
        m.freezeWorldMatrix();
        result.push(m);
      }
    });
    this.batches.clear();
    return result;
  }
}
