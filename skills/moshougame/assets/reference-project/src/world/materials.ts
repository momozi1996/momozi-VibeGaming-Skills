import { Scene } from "@babylonjs/core/scene.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
export type Palette = ReturnType<typeof createMaterials>;
export function createMaterials(scene: Scene) {
  const make = (name: string, file: string, scale = 1, tint = "#ffffff") => {
    const m = new StandardMaterial(name, scene);
    m.diffuseTexture = new Texture("/assets/textures/" + file, scene);
    (m.diffuseTexture as Texture).uScale = scale;
    (m.diffuseTexture as Texture).vScale = scale;
    m.diffuseColor = Color3.FromHexString(tint);
    m.specularColor = new Color3(0.07, 0.065, 0.045);
    return m;
  };
  const stone = make("Weathered limestone", "limestone.jpg", 3);
  stone.bumpTexture = new Texture(
    "/assets/textures/limestone-normal.jpg",
    scene,
  );
  stone.bumpTexture.level = 0.32;
  (stone.bumpTexture as Texture).uScale = 3;
  (stone.bumpTexture as Texture).vScale = 3;
  const trim = make("Carved stone mouldings", "limestone.jpg", 0.6, "#e1ddcb");
  const roof = make("Terracotta tiles", "roof.jpg", 2);
  roof.backFaceCulling = false;
  roof.twoSidedLighting = true;
  const rock = make("Mottled fieldstone", "rock.jpg");
  rock.bumpTexture = new Texture("/assets/textures/rock-normal.jpg", scene);
  rock.bumpTexture.level = 0.55;
  const wood = make("Oak beams · ambientCG", "wood.jpg", 1);
  wood.diffuseColor = Color3.FromHexString("#b6a891");
  const bark = make("Deeply furrowed bark", "bark.jpg", 2);
  const gold = make("Forged bronze trim", "gold.jpg");
  gold.specularColor = new Color3(0.43, 0.32, 0.16);
  gold.specularPower = 40;
  const metal = make("Blackened wrought iron", "steel.jpg", 1, "#515956");
  metal.specularPower = 48;
  const cloth = make("Embroidered cloth standard", "banner.jpg");
  cloth.backFaceCulling = false;
  const glass = make("Leaded stained glass", "glass.png");
  glass.diffuseTexture!.hasAlpha = true;
  glass.useAlphaFromDiffuseTexture = true;
  glass.transparencyMode = 1;
  glass.emissiveColor = new Color3(0.12, 0.15, 0.06);
  glass.backFaceCulling = false;
  const leaves = make("Painted oak leaves", "leaves.png");
  leaves.diffuseTexture!.hasAlpha = true;
  leaves.transparencyMode = 1;
  leaves.useAlphaFromDiffuseTexture = true;
  leaves.alphaCutOff = 0.42;
  leaves.backFaceCulling = false;
  leaves.twoSidedLighting = true;
  leaves.specularColor = Color3.Black();
  leaves.ambientColor = new Color3(0.3, 0.34, 0.18);
  const grass = make("Individual grass blades", "grass.png");
  grass.diffuseTexture!.hasAlpha = true;
  grass.transparencyMode = 1;
  grass.useAlphaFromDiffuseTexture = true;
  grass.alphaCutOff = 0.48;
  grass.backFaceCulling = false;
  grass.twoSidedLighting = true;
  grass.specularColor = Color3.Black();
  const flowers = make("Meadow flowers", "flowers.png");
  flowers.diffuseTexture!.hasAlpha = true;
  flowers.transparencyMode = 1;
  flowers.useAlphaFromDiffuseTexture = true;
  flowers.backFaceCulling = false;
  flowers.specularColor = Color3.Black();
  const glow = make("Lantern wax-glass", "parchment.jpg");
  glow.emissiveColor = new Color3(0.95, 0.53, 0.14);
  glow.diffuseColor = new Color3(1, 0.74, 0.3);
  return {
    stone,
    trim,
    roof,
    rock,
    wood,
    bark,
    gold,
    metal,
    cloth,
    glass,
    leaves,
    grass,
    flowers,
    glow,
  };
}
