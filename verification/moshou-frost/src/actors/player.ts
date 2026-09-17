import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import type { Actor } from "./actor";
import type { Input } from "../core/input";
import { heightAt } from "../world/terrain";
import { clamp, angleLerp } from "../core/math";
import type { Obstacle } from "../world/abbey";
export class PlayerController {
  velocityY = 0;
  grounded = true;
  moving = false;
  constructor(
    public actor: Actor,
    public camera: ArcRotateCamera,
    public input: Input,
    private obstacles: Obstacle[],
    private trees: { x: number; z: number; r: number }[],
  ) {}
  blocked(x: number, z: number) {
    return (
      this.obstacles.some(
        (o) =>
          Math.abs(x - o.x) < o.w / 2 + 0.35 &&
          Math.abs(z - o.z) < o.d / 2 + 0.35,
      ) || this.trees.some((t) => Math.hypot(x - t.x, z - t.z) < t.r + 0.32)
    );
  }
  update(dt: number, time: number, enabled: boolean) {
    const p = this.actor.position,
      axis = enabled ? this.input.axis() : { x: 0, z: 0 };
    this.moving = !!(axis.x || axis.z);
    if (this.moving) {
      const forward = this.camera.target.subtract(this.camera.position);
      forward.y = 0;
      forward.normalize();
      const right = new Vector3(forward.z, 0, -forward.x);
      const dir = forward.scale(axis.z).add(right.scale(axis.x)).normalize(),
        speed = this.input.keys.has("shift") ? 6.3 : 4.6;
      const nx = clamp(p.x + dir.x * speed * dt, -70, 70),
        nz = clamp(p.z + dir.z * speed * dt, -88, 60);
      if (!this.blocked(nx, p.z)) p.x = nx;
      if (!this.blocked(p.x, nz)) p.z = nz;
      this.actor.root.rotation.y = angleLerp(
        this.actor.root.rotation.y,
        Math.atan2(dir.x, dir.z),
        Math.min(1, dt * 11),
      );
    }
    const ground =
      heightAt(p.x, p.z) +
      (Math.abs(p.x) < 2.7 && p.z >= 2.475 && p.z <= 4.625
        ? Math.min(4, Math.floor((p.z - 2.475) / 0.3) + 1) * 0.24
        : 0);
    if (!this.grounded) {
      this.velocityY -= 17 * dt;
      p.y += this.velocityY * dt;
      if (p.y <= ground) {
        p.y = ground;
        this.grounded = true;
        this.velocityY = 0;
      }
    } else p.y = ground;
    if (enabled) this.actor.play(this.moving ? "Run" : "Idle", time);
    const target = p.add(new Vector3(0, 1.7, 0));
    this.camera.setTarget(
      Vector3.Lerp(this.camera.target, target, Math.min(1, dt * 10)),
      false,
      true,
      true,
    );
    const camGround =
      heightAt(this.camera.position.x, this.camera.position.z) + 0.8;
    if (this.camera.position.y < camGround)
      this.camera.beta = Math.max(0.45, this.camera.beta - dt * 1.5);
  }
  jump() {
    if (this.grounded) {
      this.velocityY = 6.2;
      this.grounded = false;
    }
  }
  teleport(x: number, z: number) {
    if (this.blocked(x, z)) return false;
    this.actor.position.set(x, heightAt(x, z), z);
    this.camera.setTarget(
      this.actor.position.add(new Vector3(0, 1.7, 0)),
      false,
      true,
      true,
    );
    return true;
  }
}
