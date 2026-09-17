import { AssetContainer } from "@babylonjs/core/assetContainer.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Scene } from "@babylonjs/core/scene.js";
import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator.js";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
export class Actor {
  root: TransformNode;
  groups: AnimationGroup[];
  current = "";
  lockUntil = 0;
  meshes: AbstractMesh[];
  constructor(
    container: AssetContainer,
    scene: Scene,
    id: string,
    x: number,
    y: number,
    z: number,
    shadow: ShadowGenerator,
    scale = 1,
  ) {
    const instance = container.instantiateModelsToScene(
      (n) => id + "_" + n,
      false,
      { doNotInstantiate: true },
    );
    this.root = new TransformNode(id, scene);
    instance.rootNodes.forEach((n) => (n.parent = this.root));
    this.root.position.set(x, y, z);
    this.root.scaling.setAll(scale);
    this.groups = instance.animationGroups;
    this.groups.forEach((g) => g.stop());
    this.meshes = this.root.getChildMeshes();
    this.meshes.forEach((mesh) => {
      mesh.metadata = { actorId: id };
      mesh.receiveShadows = true;
      shadow.addShadowCaster(mesh);
    });
    const blob = MeshBuilder.CreateGround(
      id + " contact shadow",
      {
        width: id.startsWith("wolf") ? 1.7 : 1.2,
        height: id.startsWith("wolf") ? 1.4 : 1.2,
      },
      scene,
    );
    const bm = new StandardMaterial(id + " contact shadow material", scene);
    bm.diffuseTexture = new Texture("/assets/textures/contact.png", scene);
    bm.diffuseTexture.hasAlpha = true;
    bm.useAlphaFromDiffuseTexture = true;
    bm.disableLighting = true;
    bm.emissiveColor = Color3.Black();
    bm.diffuseColor = Color3.Black();
    bm.zOffset = -1;
    blob.material = bm;
    blob.parent = this.root;
    blob.position.y = 0.022;
    blob.isPickable = false;
    this.play("Idle", 0);
  }
  get position() {
    return this.root.position;
  }
  play(name: string, time: number, lock = 0) {
    if (time < this.lockUntil && name !== "Death") return;
    if (this.current === name) return;
    const group = this.groups.find((g) =>
      g.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (!group) return;
    this.groups.forEach((g) => g.stop());
    group.start(name === "Run" || name === "Idle", name === "Run" ? 1.3 : 1);
    this.current = name;
    this.lockUntil = time + lock;
  }
  dispose() {
    this.groups.forEach((g) => g.dispose());
    this.root.dispose(false, true);
  }
}
export interface Enemy {
  actor: Actor;
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  home: Vector3;
  attackAt: number;
  stunUntil: number;
  deadAt: number;
  looted: boolean;
}
