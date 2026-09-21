import { chromium } from "file:///private/var/folders/l8/h72qrnhj4zz59b1h_qb6rv940000gn/T/train-moba-skills-m12o2j_z/huoche-output/tooling/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath, pathToFileURL } from "node:url";
process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : chromium.executablePath()),
  headless: true,
  args: [...(process.platform === "darwin" ? ["--use-angle=metal"] : []), "--allow-file-access-from-files"],
});
const results = [];
async function check(name, fn) {
  try {
    const detail = await fn();
    results.push({ name, pass: true, detail });
    console.log("PASS", name, detail ?? "");
  } catch (e) {
    results.push({ name, pass: false, error: e.stack });
    console.log("FAIL", name, e.message);
  }
}
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const url = pathToFileURL(path.resolve("cloudline.html")).href;
const errors = [];
page.on("pageerror", (e) => errors.push(e.stack));
await page.goto(url + "?test");
await page.waitForFunction(() => window.__cloudline);
await page.waitForSelector("#loading", { state: "detached" });
const cdp = await context.newCDPSession(page);
await check("actual emulated touch hold, release and cancel", async () => {
  const b = await page.locator("#power").boundingBox(),
    x = b.x + b.width / 2,
    y = b.y + b.height / 2;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y, id: 1 }],
  });
  await page.waitForTimeout(1300);
  assert.equal(await page.evaluate(() => __cloudline.input.power), true);
  assert.ok((await page.evaluate(() => __cloudline.state.speed)) > 1);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(100);
  assert.equal(await page.evaluate(() => __cloudline.input.power), false);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y, id: 2 }],
  });
  await page.waitForTimeout(100);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  assert.equal(await page.evaluate(() => __cloudline.input.power), false);
  return { speed: await page.evaluate(() => __cloudline.state.speed) };
});
await check("simultaneous touch pedals and release outside", async () => {
  const a = await page.locator("#power").boundingBox(),
    b = await page.locator("#brake").boundingBox();
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [
      { x: a.x + 30, y: a.y + 30, id: 3 },
      { x: b.x + 30, y: b.y + 30, id: 4 },
    ],
  });
  await page.waitForTimeout(100);
  assert.ok(
    await page.evaluate(
      () => __cloudline.input.power && __cloudline.input.brake,
    ),
  );
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [
      { x: 380, y: 500, id: 3 },
      { x: 10, y: 500, id: 4 },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(100);
  assert.ok(
    await page.evaluate(
      () => !__cloudline.input.power && !__cloudline.input.brake,
    ),
  );
});
await check(
  "wide and narrow layouts do not horizontally overflow",
  async () => {
    for (const [width, height] of [
      [844, 390],
      [360, 740],
      [768, 1024],
      [1920, 1080],
    ]) {
      await page.setViewportSize({ width, height });
      await page.waitForFunction((w) => innerWidth === w, width);
      await page.evaluate(
        () =>
          new Promise((r) =>
            requestAnimationFrame(() => requestAnimationFrame(r)),
          ),
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
  },
);
await check(
  "station payout remains once-only during workshop visits",
  async () => {
    await page.evaluate(() => {
      const g = __cloudline,
        s = g.state;
      s.mode = "driving";
      s.distance = s.legEnd - 5;
      s.speed = 1;
      s.comfort = 100;
      s.legMinComfort = 100;
      s.legRoughness = 0;
      s.streakBroken = false;
      g.simulate(1 / 60);
      g.updateUI();
    });
    const before = await page.evaluate(() => __cloudline.state.coins);
    await page.click("#workshop");
    await page.click("#leaveWorkshop");
    await page.evaluate(() => __cloudline.step(2.4));
    assert.equal(await page.evaluate(() => __cloudline.state.mode), "docked");
    assert.equal(await page.evaluate(() => __cloudline.state.coins), before);
    await page.click("#doors");
    const after = await page.evaluate(() => __cloudline.state.coins);
    await page.evaluate(() => __cloudline.step(2));
    await page.keyboard.press("KeyE");
    assert.equal(await page.evaluate(() => __cloudline.state.coins), after);
  },
);
await check("storage-denied browser still loads and plays", async () => {
  const noStore = await browser.newContext({
    viewport: { width: 800, height: 600 },
  });
  await noStore.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Denied", "SecurityError");
      },
    });
  });
  const p = await noStore.newPage();
  await p.goto(url + "?test");
  await p.waitForFunction(() => window.__cloudline);
  await p.click("#start");
  await p.keyboard.down("KeyW");
  await p.waitForTimeout(450);
  await p.keyboard.up("KeyW");
  assert.equal(await p.evaluate(() => __cloudline.state.mode), "driving");
  await noStore.close();
});
await check("production file has no debug hook and works offline", async () => {
  const prod = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    offline: true,
  });
  const p = await prod.newPage();
  const err = [];
  p.on("pageerror", (e) => err.push(e.message));
  await p.goto(url);
  await p.waitForSelector("#loading", { state: "detached" });
  assert.equal(await p.evaluate(() => typeof window.__cloudline), "undefined");
  await p.click("#start");
  await p.keyboard.down("KeyW");
  await p.waitForTimeout(1400);
  await p.keyboard.up("KeyW");
  assert.ok(Number(await p.locator("#speed").textContent()) > 0);
  assert.deepEqual(err, []);
  const timing = await p.evaluate(
    () =>
      new Promise((resolve) => {
        let stamps = [];
        const begin = performance.now();
        function f(t) {
          stamps.push(t);
          if (t - begin < 2100) requestAnimationFrame(f);
          else {
            const intervals = stamps
              .slice(1)
              .map((v, i) => v - stamps[i])
              .sort((a, b) => a - b);
            resolve({
              frames: stamps.length,
              elapsedMs: t - begin,
              meanFPS: Math.round(
                ((stamps.length - 1) / (stamps.at(-1) - stamps[0])) * 1000,
              ),
              p95FrameMs: Math.round(
                intervals[Math.floor(intervals.length * 0.95)],
              ),
              viewport: [innerWidth, innerHeight],
              dpr: devicePixelRatio,
            });
          }
        }
        requestAnimationFrame(f);
      }),
  );
  await p.screenshot({ path: "screenshots/10-production-offline.png" });
  await prod.close();
  return timing;
});
await check("all edge-case browser errors", async () =>
  assert.deepEqual(errors, []),
);
fs.writeFileSync(
  "tests/edge-report.json",
  JSON.stringify(
    {
      browser: await browser.version(),
      results,
      note: "Touch is Chrome CDP emulation, not a physical phone. FPS is a short local headless run, not a universal device claim.",
    },
    null,
    2,
  ),
);
await browser.close();
if (results.some((r) => !r.pass)) process.exitCode = 1;
