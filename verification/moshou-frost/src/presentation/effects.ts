import { Scene } from "@babylonjs/core/scene.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
export class Effects {
  private selection: Mesh;
  private bursts: { mesh: Mesh; age: number; duration: number }[] = [];
  constructor(private scene: Scene) {
    const mat = new StandardMaterial("Target rune ring", scene);
    mat.diffuseTexture = new Texture("/assets/textures/rune.png", scene);
    mat.diffuseTexture.hasAlpha = true;
    mat.useAlphaFromDiffuseTexture = true;
    mat.emissiveColor = new Color3(0.6, 0.41, 0.13);
    mat.disableLighting = true;
    mat.backFaceCulling = false;
    mat.zOffset = -3;
    this.selection = MeshBuilder.CreateGround(
      "Selected target",
      { width: 2.2, height: 2.2 },
      scene,
    );
    this.selection.material = mat;
    this.selection.isPickable = false;
    this.selection.setEnabled(false);
  }
  target(p: Vector3 | null) {
    this.selection.setEnabled(!!p);
    if (p) this.selection.position.copyFrom(p.add(new Vector3(0, 0.06, 0)));
  }
  burst(p: Vector3, heal = false) {
    const mesh = this.selection.clone("Skill ground effect")!;
    mesh.setEnabled(true);
    mesh.position = p.add(new Vector3(0, 0.07, 0));
    mesh.material = this.selection.material!.clone("Transient rune");
    const m = mesh.material as StandardMaterial;
    m.emissiveColor = heal
      ? new Color3(0.4, 0.9, 0.34)
      : new Color3(1, 0.64, 0.19);
    mesh.scaling.setAll(0.5);
    this.bursts.push({ mesh, age: 0, duration: 0.7 });
  }
  update(dt: number) {
    this.selection.rotation.y += dt * 0.23;
    for (const b of this.bursts) {
      b.age += dt;
      const t = b.age / b.duration;
      b.mesh.scaling.setAll(0.8 + t * 1.6);
      (b.mesh.material as StandardMaterial).alpha = 1 - t;
      b.mesh.rotation.y += dt * 2;
      if (t >= 1) {
        b.mesh.material!.dispose();
        b.mesh.dispose();
      }
    }
    this.bursts = this.bursts.filter((b) => b.age < b.duration);
  }
}
