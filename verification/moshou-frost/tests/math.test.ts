import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp, lerp, distance, angleLerp, seeded } from "../src/core/math.ts";
test("clamp, lerp and horizontal distances", () => {
  assert.equal(clamp(-1, 0, 100), 0);
  assert.equal(clamp(500, 0, 100), 100);
  assert.equal(lerp(2, 10, 0.25), 4);
  assert.equal(distance({ x: 0, z: 0 }, { x: 3, z: 4 }), 5);
});
test("angles interpolate over the short arc across the 360 degree seam", () => {
  assert(
    Math.abs(angleLerp(Math.PI - 0.1, -Math.PI + 0.1, 0.5) - Math.PI) < 1e-10,
  );
});
test("seeded world placement is reproducible and bounded", () => {
  const a = seeded(417),
    b = seeded(417);
  for (let i = 0; i < 1000; i++) {
    const x = a();
    assert.equal(x, b());
    assert(x >= 0 && x < 1);
  }
});
