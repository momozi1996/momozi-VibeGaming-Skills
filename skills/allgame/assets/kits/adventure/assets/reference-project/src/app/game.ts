import { Engine } from "@babylonjs/core/Engines/engine.js";
import { Scene } from "@babylonjs/core/scene.js";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import { Vector3, Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color.js";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight.js";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { HDRCubeTexture } from "@babylonjs/core/Materials/Textures/hdrCubeTexture.js";
import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader.js";
import { SSAO2RenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/ssao2RenderingPipeline.js";
import { DefaultRenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline.js";
import "@babylonjs/loaders/glTF/2.0/glTFLoader.js";
import "@babylonjs/core/Culling/ray.js";
import "@babylonjs/core/Collisions/collisionCoordinator.js";
import "@babylonjs/core/Meshes/thinInstanceMesh.js";
import "@babylonjs/core/Animations/animatable.js";
import { UI } from "../ui/ui";
import { GameState } from "../core/state";
import { Input } from "../core/input";
import { AudioSystem } from "../presentation/audio";
import { Effects } from "../presentation/effects";
import { Combat } from "../gameplay/combat";
import { createTerrain, heightAt } from "../world/terrain";
import { createMaterials } from "../world/materials";
import { buildAbbey } from "../world/abbey";
import { vegetation } from "../world/vegetation";
import { createProps } from "../world/props";
import { Builder } from "../world/geometry";
import { Actor, type Enemy } from "../actors/actor";
import { PlayerController } from "../actors/player";
import { NPCS, ENEMIES, HERBS } from "../data/content";
import { distance } from "../core/math";
type Herb = { id: string; x: number; z: number; mesh: Mesh; taken: boolean };
export class Game {
  engine: Engine;
  scene: Scene;
  camera: ArcRotateCamera;
  state = new GameState();
  ui = new UI(this.state);
  input: Input;
  audio = new AudioSystem();
  shadow: ShadowGenerator;
  effects: Effects;
  player!: Actor;
  controller!: PlayerController;
  combat!: Combat;
  npcs: Actor[] = [];
  enemies: Enemy[] = [];
  herbs: Herb[] = [];
  private props!: ReturnType<typeof createProps>;
  private plants!: ReturnType<typeof vegetation>;
  private near: { id: string; type: "npc" | "herb" | "loot" } | null = null;
  private labels = new Map<string, HTMLElement>();
  private lastUi = 0;
  ready = false;
  quality = "high";
  private assetError = false;
  constructor(public canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      powerPreference: "high-performance",
      antialias: true,
    });
    this.engine.setHardwareScalingLevel(Math.max(1, devicePixelRatio / 1.2));
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.48, 0.6, 0.57, 1);
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogDensity = 0.008;
    this.scene.fogColor = new Color3(0.53, 0.62, 0.56);
    this.scene.collisionsEnabled = true;
    this.scene.skipPointerMovePicking = true;
    this.scene.imageProcessingConfiguration.exposure = 1.08;
    this.scene.imageProcessingConfiguration.contrast = 1.09;
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
    this.scene.imageProcessingConfiguration.toneMappingType = 1;
    this.camera = new ArcRotateCamera(
      "Third person camera",
      -Math.PI / 2,
      1.48,
      10.8,
      new Vector3(0, 1.7, -27),
      this.scene,
    );
    this.camera.minZ = 0.12;
    this.camera.maxZ = 340;
    this.camera.lowerBetaLimit = 0.38;
    this.camera.upperBetaLimit = 1.54;
    this.camera.lowerRadiusLimit = 4;
    this.camera.upperRadiusLimit = 23;
    this.camera.fov = 0.95;
    this.camera.checkCollisions = true;
    this.camera.collisionRadius = new Vector3(0.45, 0.45, 0.45);
    const hemi = new HemisphericLight(
      "Sky bounce",
      new Vector3(0.2, 1, 0),
      this.scene,
    );
    hemi.intensity = 0.93;
    hemi.diffuse = new Color3(0.87, 0.94, 0.96);
    hemi.groundColor = new Color3(0.38, 0.42, 0.25);
    const sun = new DirectionalLight(
      "Morning sun",
      new Vector3(-0.65, -1, 0.47),
      this.scene,
    );
    sun.position = new Vector3(48, 68, -35);
    sun.intensity = 1.85;
    sun.diffuse = new Color3(1, 0.94, 0.8);
    sun.shadowMinZ = 1;
    sun.shadowMaxZ = 180;
    sun.orthoLeft = -68;
    sun.orthoRight = 68;
    sun.orthoTop = 68;
    sun.orthoBottom = -68;
    sun.autoUpdateExtends = false;
    this.shadow = new ShadowGenerator(2048, sun);
    this.shadow.usePercentageCloserFiltering = true;
    this.shadow.filteringQuality = ShadowGenerator.QUALITY_MEDIUM;
    this.shadow.bias = 0.0015;
    this.shadow.normalBias = 0.025;
    this.shadow.darkness = 0.18;
    const pipeline = new DefaultRenderingPipeline(
      "Northshire antialiasing",
      true,
      this.scene,
      [this.camera],
    );
    pipeline.fxaaEnabled = true;
    pipeline.imageProcessingEnabled = false;
    const ao = new SSAO2RenderingPipeline(
      "Contact occlusion",
      this.scene,
      { ssaoRatio: 0.5, blurRatio: 0.5 },
      [this.camera],
    );
    ao.radius = 1.8;
    ao.totalStrength = 0.85;
    ao.samples = 8;
    ao.expensiveBlur = false;
    ao.maxZ = 100;
    Texture.OnTextureLoadErrorObservable.add((texture) => {
      if (texture.getScene() !== this.scene) return;
      this.assetError = true;
      this.ready = false;
      console.error("Required texture failed:", texture.name);
      this.ui.error("贴图加载失败，请重新加载。不会以纯色占位材质替代。");
    });
    this.input = new Input(canvas);
    this.input.isModalOpen = () => !!this.ui.modal;
    this.effects = new Effects(this.scene);
    this.input.onOrbit = (x, y) => {
      if (this.state.paused && !this.ui.photo) return;
      this.camera.alpha -= x * 0.004;
      this.camera.beta = Math.max(
        0.38,
        Math.min(1.54, this.camera.beta + y * 0.003),
      );
    };
    this.input.onZoom = (n) => {
      this.camera.radius = Math.max(
        4,
        Math.min(23, this.camera.radius + n * 0.012),
      );
    };
    this.input.onAction = (k) => this.key(k);
    this.input.onClick = (x, y) => this.click(x, y);
    this.ui.actions = {
      start: (c) => this.start(c),
      skill: (id) => this.combat?.use(id),
      accept: () => this.acceptQuest(),
      complete: () => this.completeQuest(),
      supply: () => {
        this.state.heal(this.state.maxHp);
        this.state.data.potions = Math.max(3, this.state.data.potions);
        this.state.emit();
        this.ui.toast("已休整完毕 · 生命与药水已补充");
        this.audio.play("cloth1");
      },
      quality: (q) => this.setQuality(q),
      volume: (n) => this.audio.setVolume(n),
      mute: () => this.audio.toggle(),
      photo: () => this.ui.photoMode(!this.ui.photo),
      screenshot: () => this.screenshot(),
    };
    window.addEventListener("resize", () => this.engine.resize());
    window.addEventListener("beforeunload", () => this.state.save());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.state.save();
        this.audio.pause(true);
      } else if (this.state.started) this.audio.pause(false);
    });
    window.addEventListener("northshire-respawn", () => this.respawn());
    this.engine.runRenderLoop(() => {
      const dt = Math.min(0.05, this.engine.getDeltaTime() / 1000);
      this.update(dt);
      this.scene.render();
    });
  }
  async init() {
    try {
      this.ui.loading("雕琢石墙，铺开林间的小路…", 10);
      await new Promise((r) => setTimeout(r, 35));
      const sky = MeshBuilder.CreateSphere(
        "Painted Elwynn sky",
        { diameter: 600, segments: 24, sideOrientation: Mesh.BACKSIDE },
        this.scene,
      );
      const sm = new StandardMaterial("Atmospheric sky", this.scene);
      sm.emissiveTexture = new Texture("/assets/textures/sky.jpg", this.scene);
      (sm.emissiveTexture as Texture).vScale = -1;
      (sm.emissiveTexture as Texture).vOffset = 1;
      sm.diffuseColor = Color3.Black();
      sm.specularColor = Color3.Black();
      sm.disableLighting = true;
      sm.fogEnabled = false;
      sky.material = sm;
      sky.infiniteDistance = true;
      sky.isPickable = false;
      const hdr = new HDRCubeTexture(
        "/assets/textures/forest.hdr",
        this.scene,
        64,
        false,
        true,
        false,
        true,
      );
      this.scene.environmentTexture = hdr;
      this.scene.environmentIntensity = 0.65;
      const mats = createMaterials(this.scene);
      createTerrain(this.scene);
      const abbey = buildAbbey(this.scene, mats);
      abbey.meshes.forEach((m) => {
        this.shadow.addShadowCaster(m);
        m.checkCollisions = true;
      });
      this.ui.loading("树影正在落向北郡庭院…", 32);
      await new Promise((r) => setTimeout(r, 25));
      this.plants = vegetation(this.scene, mats);
      this.ui.map.setTrees(this.plants.treeBounds);
      this.plants.casters.forEach((m) => this.shadow.addShadowCaster(m));
      this.props = createProps(this.scene, mats);
      this.props.meshes.forEach((m) => this.shadow.addShadowCaster(m));
      // Pickable, hand-assembled herb plants at their actual quest locations.
      for (const h of HERBS) {
        const b = new Builder(this.scene),
          y = heightAt(h.x, h.z);
        for (const angle of [0, Math.PI / 2, Math.PI / 4]) {
          const p = (x: number, yy: number) => [
            h.x + Math.cos(angle) * x,
            y + yy,
            h.z + Math.sin(angle) * x,
          ];
          b.quad(
            "Ning-shen herb",
            [p(-0.56, 0), p(0.56, 0), p(0.56, 1.08), p(-0.56, 1.08)],
            mats.flowers,
          );
        }
        const mesh = b.merge(h.id)[0];
        mesh.metadata = { herbId: h.id };
        this.herbs.push({ ...h, mesh, taken: false });
      }
      this.ui.loading("唤醒守卫与林地中的生灵…", 58);
      await new Promise((r) => setTimeout(r, 20));
      const [knight, wolf] = await Promise.all([
        LoadAssetContainerAsync("/assets/models/knight.glb", this.scene),
        LoadAssetContainerAsync("/assets/models/wolf.glb", this.scene),
      ]);
      this.player = new Actor(
        knight,
        this.scene,
        "player",
        0,
        heightAt(0, -27),
        -27,
        this.shadow,
        1.2,
      );
      this.player.meshes.forEach((m) => (m.isPickable = false));
      this.controller = new PlayerController(
        this.player,
        this.camera,
        this.input,
        abbey.obstacles,
        this.plants.treeBounds,
      );
      for (const n of NPCS) {
        const actor = new Actor(
          knight,
          this.scene,
          n.id,
          n.x,
          heightAt(n.x, n.z),
          n.z,
          this.shadow,
          1.25,
        );
        actor.root.rotation.y = Math.PI + n.yaw;
        this.npcs.push(actor);
        this.label(
          n.id,
          `<span class="quest-mark">${n.id === "guard" ? "!" : ""}</span><strong>${n.name}</strong><small>〈${n.role}〉</small>`,
        );
      }
      for (const e of ENEMIES) {
        const home = new Vector3(e.x, heightAt(e.x, e.z), e.z);
        const actor = new Actor(
          wolf,
          this.scene,
          e.id,
          home.x,
          home.y,
          home.z,
          this.shadow,
          0.86,
        );
        this.enemies.push({
          id: e.id,
          name: "森林狼",
          actor,
          hp: 70,
          maxHp: 70,
          home,
          attackAt: 0,
          stunUntil: 0,
          deadAt: 0,
          looted: false,
        });
        this.label(
          e.id,
          '<strong>森林狼</strong><div class="small-health"><i></i></div>',
          "enemy",
        );
      }
      this.combat = new Combat(
        this.state,
        this.player,
        this.enemies,
        this.audio,
        this.effects,
      );
      this.combat.onToast = (t) => this.ui.toast(t);
      this.combat.onNumber = (p, t, h) => this.floating(p, t, h);
      this.combat.onHurt = () => this.ui.hurt();
      this.ui.loading("整理行囊，聆听修道院的钟声…", 90);
      await this.scene.whenReadyAsync();
      if (this.assetError)
        throw new Error("Required scene textures did not load");
      this.ready = true;
      this.ui.loading("欢迎来到北郡", 100);
      this.ui.ready();
      this.registerDebug();
    } catch (error) {
      console.error("Northshire initialization failed", error);
      this.ui.error("资源加载失败，请检查连接并重试。不会以占位模型替代。");
    }
  }
  label(id: string, html: string, kind = "npc") {
    const el = document.createElement("div");
    el.className = "actor-label " + kind;
    el.innerHTML = html;
    this.ui.el("labels").append(el);
    this.labels.set(id, el);
  }
  start(cont: boolean) {
    if (!this.ready || this.state.started) return;
    this.state.start(cont);
    if (
      !this.controller.teleport(
        this.state.data.position.x,
        this.state.data.position.z,
      )
    )
      this.controller.teleport(0, -27);
    this.camera.setTarget(
      this.player.position.add(new Vector3(0, 1.7, 0)),
      false,
      true,
      true,
    );
    this.ui.enter();
    this.audio.start();
    this.state.log("已进入北郡修道院。按 E 与附近的人交谈。");
    this.state.save();
  }
  key(key: string) {
    if (!this.state.started) return;
    if (key === "escape") {
      if (this.ui.photo) this.ui.photoMode(false);
      else if (this.ui.modal) this.ui.close();
      else this.ui.open("settings");
      return;
    }
    if (key === "p") {
      this.ui.photoMode(!this.ui.photo);
      return;
    }
    if (key === "b" || key === "m" || key === "l" || key === "q") {
      this.ui.open(key === "b" ? "bag" : key === "m" ? "map" : "quest");
      this.audio.play("bookOpen", 0.5);
      return;
    }
    if (this.state.paused || this.state.dead) return;
    if (key === "e") this.interact();
    else if (key === "tab") this.combat.nextTarget();
    else if (key === " ") this.controller.jump();
    else if (["1", "2", "3", "4"].includes(key))
      this.combat.use(["attack", "shield", "whirl", "potion"][Number(key) - 1]);
  }
  click(x: number, y: number) {
    if (!this.state.started || this.state.paused || this.state.dead) return;
    const rect = this.canvas.getBoundingClientRect();
    const pick = this.scene.pick(
      x - rect.left,
      y - rect.top,
      (m) => !!(m.metadata?.actorId || m.metadata?.herbId),
    );
    const id = pick?.pickedMesh?.metadata?.actorId;
    if (id?.startsWith("wolf")) this.combat.select(id);
    else if (id) {
      if (this.near?.id === id) this.interact();
      else this.ui.toast("靠近角色后按 E 交谈");
    } else if (
      pick?.pickedMesh?.metadata?.herbId &&
      this.near?.id === pick.pickedMesh.metadata.herbId
    )
      this.interact();
  }
  acceptQuest() {
    if (this.state.data.quest !== "available") return;
    this.state.data.quest = "active";
    this.state.log("接受任务：林地的骚动");
    this.ui.toast("任务已接受 · 林地的骚动");
    this.audio.play("bookOpen", 0.8);
    this.state.emit();
    this.state.save();
  }
  completeQuest() {
    if (this.state.data.quest !== "return") return;
    this.state.data.quest = "complete";
    this.state.data.gold += 15;
    this.state.data.potions += 2;
    this.state.gainXp(80);
    this.state.log("完成任务：林地的骚动 · +80经验，+15铜币");
    this.ui.toast("任务完成 · 愿圣光照亮你的旅途");
    this.audio.play("handleCoins", 1);
    this.effects.burst(this.player.position, true);
    this.state.save();
    this.state.emit();
  }
  interact() {
    if (!this.near) {
      this.ui.toast("靠近守卫、草药或战利品后按 E 交互");
      return;
    }
    if (this.near.type === "npc") {
      this.ui.open(this.near.id === "guard" ? "npc" : "quartermaster");
      this.audio.play("bookOpen", 0.5);
      return;
    }
    if (this.near.type === "loot") {
      const e = this.enemies.find((e) => e.id === this.near!.id);
      if (e) this.combat.loot(e);
      return;
    }
    const herb = this.herbs.find((h) => h.id === this.near!.id);
    if (!herb || herb.taken) return;
    if (this.state.data.quest !== "active") {
      this.ui.toast(
        this.state.data.quest === "available"
          ? "先与修道院守卫交谈，接受任务"
          : "你已经采集了足够的宁神花",
      );
      return;
    }
    if (this.state.data.herbs >= 2) {
      this.ui.toast("宁神花已采集完毕");
      return;
    }
    herb.taken = true;
    herb.mesh.setEnabled(false);
    this.state.data.herbs++;
    this.state.log(`采集宁神花 · ${this.state.data.herbs} / 2`);
    this.audio.play("cloth1", 0.8);
    this.state.questProgress();
    this.ui.toast("获得宁神花 × 1");
    this.state.save();
  }
  update(dt: number) {
    if (!this.ready) return;
    const state = this.state;
    const active = state.started && !state.paused && !document.hidden;
    this.scene.animationsEnabled = !state.paused && !document.hidden;
    if (active) {
      state.time += dt;
      state.data.elapsed += dt;
      if (!state.dead) {
        this.controller.update(dt, state.time, true);
        this.combat.update(dt);
        if (this.controller.moving) this.audio.walk(state.time);
      } else if (this.ui.modal !== "death") {
        this.player.play("Death", state.time, 999);
        this.ui.open("death");
      }
      this.props.update(state.time);
      this.effects.update(dt);
      state.data.position = {
        x: this.player.position.x,
        z: this.player.position.z,
      };
      if (state.time - state.lastSave > 6) state.save();
    }
    if (!state.started) {
      this.camera.alpha = -Math.PI / 2 + 0.025;
    }
    if (state.started) {
      this.updateProximity();
      this.updateLabels();
      const target = this.combat.target;
      this.ui.frame(
        this.engine.getFps(),
        this.player.position,
        this.player.root.rotation.y,
        this.enemies.map((e) => ({
          x: e.actor.position.x,
          z: e.actor.position.z,
          dead: e.hp <= 0,
        })),
        target
          ? {
              hp: target.hp,
              maxHp: target.maxHp,
              distance: distance(target.actor.position, this.player.position),
            }
          : null,
      );
    }
  }
  updateProximity() {
    const p = this.player.position;
    let best = 3.25;
    this.near = null;
    let name = "",
      kind = "";
    for (const n of this.npcs) {
      const d = distance(n.position, p);
      if (d < best) {
        best = d;
        this.near = { id: n.root.name, type: "npc" };
        name = NPCS.find((v) => v.id === n.root.name)!.name;
        kind = "交谈 · 任务与补给";
      }
    }
    for (const h of this.herbs) {
      const d = distance(h, p);
      if (!h.taken && d < best && d < 2.6) {
        best = d;
        this.near = { id: h.id, type: "herb" };
        name = "宁神花";
        kind = "采集 · 任务物品";
      }
    }
    for (const e of this.enemies) {
      const d = distance(e.actor.position, p);
      if (e.hp <= 0 && !e.looted && d < best) {
        best = d;
        this.near = { id: e.id, type: "loot" };
        name = "森林狼的战利品";
        kind = "拾取 · 3 铜币";
      }
    }
    this.ui.interaction(stateDead(this.state) ? "" : name, kind);
  }
  project(p: Vector3) {
    const s = Vector3.Project(
      p,
      Matrix.IdentityReadOnly,
      this.scene.getTransformMatrix(),
      this.camera.viewport.toGlobal(
        this.engine.getRenderWidth(),
        this.engine.getRenderHeight(),
      ),
    );
    return {
      x: (s.x / this.engine.getRenderWidth()) * innerWidth,
      y: (s.y / this.engine.getRenderHeight()) * innerHeight,
      z: s.z,
    };
  }
  updateLabels() {
    const now = performance.now();
    if (now - this.lastUi < 50) return;
    this.lastUi = now;
    for (const n of this.npcs) {
      const el = this.labels.get(n.root.name)!,
        p = this.project(n.position.add(new Vector3(0, 2.8, 0))),
        d = distance(n.position, this.player.position);
      el.style.display = p.z > 0 && p.z < 1 && d < 30 ? "" : "none";
      el.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-100%)`;
      if (n.root.name === "guard") {
        const mark = el.querySelector(".quest-mark")!;
        mark.textContent =
          this.state.data.quest === "available"
            ? "!"
            : this.state.data.quest === "return"
              ? "?"
              : "";
      }
    }
    for (const e of this.enemies) {
      const el = this.labels.get(e.id)!,
        p = this.project(e.actor.position.add(new Vector3(0, 1.55, 0))),
        d = distance(e.actor.position, this.player.position);
      el.style.display = p.z > 0 && p.z < 1 && d < 24 && e.hp > 0 ? "" : "none";
      el.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-100%)`;
      (el.querySelector("i") as HTMLElement).style.width =
        `${(e.hp / e.maxHp) * 100}%`;
    }
  }
  floating(p: Vector3, text: string, heal = false) {
    const pos = this.project(p.add(new Vector3(0, 2.0, 0)));
    const el = document.createElement("div");
    el.className = "damage-number" + (heal ? " heal" : "");
    el.textContent = text;
    el.style.left = pos.x + "px";
    el.style.top = pos.y + "px";
    this.ui.el("damage-numbers").append(el);
    setTimeout(() => el.remove(), 1150);
  }
  respawn() {
    this.state.dead = false;
    this.state.data.hp = this.state.maxHp;
    this.player.lockUntil = 0;
    this.player.root.rotation.x = 0;
    this.controller.teleport(0, -15);
    this.player.play("Idle", this.state.time);
    this.combat.reset();
    this.ui.close();
    this.state.emit();
    this.state.save();
  }
  setQuality(q: string) {
    this.quality = q;
    const scaling = q === "low" ? 1.6 : q === "balanced" ? 1.2 : 1;
    this.engine.setHardwareScalingLevel(scaling);
    this.shadow.getShadowMap()!.resize(q === "high" ? 2048 : 1024);
    this.plants.grass.setEnabled(q !== "low");
    this.plants.flowers.setEnabled(q !== "low");
    this.ui.toast(
      q === "high"
        ? "已切换高画质"
        : q === "balanced"
          ? "已切换均衡画质"
          : "已切换流畅画质",
    );
  }
  screenshot() {
    this.scene.render();
    this.canvas.toBlob((blob) => {
      if (!blob) {
        this.ui.toast("截图未能生成，请重试");
        return;
      }
      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download =
        "Northshire-" + new Date().toISOString().slice(0, 10) + ".png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      this.ui.toast("已保存游戏画面");
    });
  }
  private registerDebug() {
    if (
      !import.meta.env.DEV ||
      !new URLSearchParams(location.search).has("test")
    )
      return;
    (window as any).__northshire = {
      game: this,
      state: this.state,
      teleport: (x: number, z: number) => this.controller.teleport(x, z),
      snapshot: () => ({
        state: this.state.data,
        player: {
          x: this.player.position.x,
          y: this.player.position.y,
          z: this.player.position.z,
        },
        enemies: this.enemies.map((e) => ({
          id: e.id,
          hp: e.hp,
          x: e.actor.position.x,
          z: e.actor.position.z,
        })),
        meshes: this.scene.meshes.length,
        fps: this.engine.getFps(),
        drawCalls: this.engine._drawCalls.current,
        ready: this.ready,
        animations: this.player.groups.map((g) => g.name),
      }),
      select: (id: string) => this.combat.select(id),
      damage: (n: number) => this.state.damage(n),
      camera: (alpha: number, beta: number, radius: number) => {
        this.camera.alpha = alpha;
        this.camera.beta = beta;
        this.camera.radius = radius;
      },
    };
  }
}
function stateDead(s: GameState) {
  return s.dead;
}
