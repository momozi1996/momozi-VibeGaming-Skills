import { fileURLToPath, pathToFileURL } from "node:url";
process.chdir(fileURLToPath(new URL("../", import.meta.url)));
import { chromium } from "file:///private/var/folders/l8/h72qrnhj4zz59b1h_qb6rv940000gn/T/train-moba-skills-m12o2j_z/huoche-output/tooling/node_modules/playwright-core/index.mjs";
import path from "node:path";
import fs from "node:fs";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : chromium.executablePath()),
  headless: true,
  args: [...(process.platform === "darwin" ? ["--use-angle=metal"] : []), "--allow-file-access-from-files"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage(),
  errors = [],
  external = [];
page.on("pageerror", (e) => errors.push(e.stack));
page.on("request", (r) => {
  if (r.url().startsWith("http")) external.push(r.url());
});
const url = pathToFileURL(path.resolve("cloudline.html")).href + "?test";
const results = [];
async function check(name, fn) {
  try {
    const result = await fn();
    results.push({ name, pass: true, detail: result });
    console.log("PASS", name, result ?? "");
  } catch (e) {
    results.push({ name, pass: false, error: e.stack });
    console.log("FAIL", name, e.message);
  }
}
const snap = () => page.evaluate(() => __cloudline.snapshot());
await page.goto(url);
await page.waitForFunction(() => window.__cloudline);
await page.waitForTimeout(800);
await check("offline initial scene and no runtime errors", async () => {
  assert.equal((await snap()).mode, "ready");
  assert.equal(errors.length, 0);
  assert.equal(external.length, 0);
  return await page.evaluate(() => ({
    length: __cloudline.trackLength,
    render: __cloudline.renderer.info.render,
  }));
});
await page.screenshot({ path: "screenshots/01-departure.png" });
await check("real W input moves, release coasts, S brakes", async () => {
  await page.click("#start");
  const before = await snap();
  await page.keyboard.down("KeyW");
  await page.waitForTimeout(1600);
  await page.keyboard.up("KeyW");
  const after = await snap();
  assert.ok(after.speed > 1);
  assert.ok(after.distance > before.distance + 1);
  await page.waitForTimeout(500);
  const coast = await snap();
  assert.ok(coast.speed > 0);
  await page.keyboard.down("KeyS");
  await page.waitForTimeout(1500);
  await page.keyboard.up("KeyS");
  const stopped = await snap();
  assert.ok(stopped.speed < coast.speed);
  return {
    before: before.speed,
    power: after.speed,
    coast: coast.speed,
    brake: stopped.speed,
  };
});
await check("door cannot open in motion", async () => {
  const coins = (await snap()).coins;
  await page.keyboard.press("KeyE");
  assert.equal((await snap()).mode, "driving");
  assert.equal((await snap()).coins, coins);
});
await check("pause freezes simulation and releases input", async () => {
  await page.keyboard.down("KeyW");
  await page.keyboard.press("Escape");
  const a = await snap();
  await page.waitForTimeout(300);
  const b = await snap();
  assert.equal(a.distance, b.distance);
  assert.equal(a.time, b.time);
  assert.equal(await page.evaluate(() => __cloudline.input.power), false);
  await page.keyboard.up("KeyW");
  await page.click("#resume");
  assert.equal((await snap()).paused, false);
});
await check("camera orbit and preset controls", async () => {
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(300);
  await page.keyboard.up("ArrowRight");
  assert.ok((await snap()).orbit > 0);
  await page.keyboard.press("KeyV");
  assert.equal((await snap()).view, 1);
  await page.keyboard.press("KeyV");
  assert.equal((await snap()).view, 2);
  await page.keyboard.press("KeyV");
});
// Explicit time-compressed controller fixture: real physics, no travel teleport or fake arrival.
await check("full Saltlight → Mango route, gentle arrival", async () => {
  const result = await page.evaluate(() => {
    const g = __cloudline,
      s = g.state;
    let ticks = 0,
      min = 100;
    while (s.mode === "driving" && ticks < 24000) {
      const rem = s.legEnd - s.distance;
      const f = g.frame(s.distance),
        near = g.frame(s.distance + 5);
      const curv = near.t.clone().sub(f.t).length() / 5;
      const bendSpeed = Math.sqrt(1.2 / Math.max(0.002, curv));
      const safeSpeed = Math.min(
        8.2,
        bendSpeed,
        Math.sqrt(Math.max(0, rem - 3) * 1.8),
      );
      g.input.power = s.speed < safeSpeed - 0.4;
      g.input.brake = s.speed > safeSpeed + 1;
      g.simulate(1 / 60);
      min = Math.min(min, s.comfort);
      ticks++;
    }
    g.input.power = false;
    g.input.brake = false;
    g.updateUI();
    return {
      mode: s.mode,
      comfort: s.comfort,
      min,
      ticks,
      misses: s.misses,
      dist: s.distance,
      remaining: s.legEnd - s.distance,
      rough: s.legRoughness,
    };
  });
  assert.equal(result.mode, "docked");
  assert.equal(result.misses, 0);
  assert.ok(result.comfort > 75);
  return result;
});
await page.waitForTimeout(350);
await page.screenshot({ path: "screenshots/04-mango-docked.png" });
await check("doors, boarding, +75 bonus, no repeated payout", async () => {
  const before = await snap();
  await page.click("#doors");
  const a = await snap();
  assert.equal(a.mode, "boarding");
  assert.equal(a.coins, before.coins + before.passengers * 4 + 75);
  assert.equal(a.streak, 1);
  await page.keyboard.press("KeyE");
  assert.equal((await snap()).coins, a.coins);
  await page.evaluate(() => __cloudline.step(2));
  const during = await snap();
  assert.ok(during.doorOpen > 0.9);
  await page.screenshot({ path: "screenshots/05-boarding.png" });
  await page.evaluate(() => __cloudline.step(5.1));
  const b = await snap();
  assert.equal(b.mode, "driving");
  assert.equal(b.nextStation, 0);
  assert.equal(b.passengers, 14);
  assert.equal(b.doorOpen, 0);
  return { earned: a.coins - before.coins, passengers: b.passengers };
});
await check(
  "full return route reaches Saltlight and increments streak",
  async () => {
    const res = await page.evaluate(() => {
      const g = __cloudline,
        s = g.state;
      let n = 0;
      while (s.mode === "driving" && n < 30000) {
        const rem = s.legEnd - s.distance;
        const f = g.frame(s.distance),
          f2 = g.frame(s.distance + 5);
        const k = f2.t.clone().sub(f.t).length() / 5;
        const goal = Math.min(
          8,
          Math.sqrt(1.2 / Math.max(k, 0.002)),
          Math.sqrt(Math.max(0, rem - 3) * 1.8),
        );
        g.input.power = s.speed < goal - 0.4;
        g.input.brake = s.speed > goal + 1;
        g.simulate(1 / 60);
        n++;
      }
      g.input.power = g.input.brake = false;
      g.updateUI();
      return {
        mode: s.mode,
        station: s.dockedStation,
        comfort: s.comfort,
        misses: s.misses,
        ticks: n,
      };
    });
    assert.equal(res.mode, "docked");
    assert.equal(res.station, 0);
    assert.equal(res.misses, 0);
    await page.keyboard.press("KeyE");
    assert.equal((await snap()).streak, 2);
    await page.evaluate(() => __cloudline.step(7.1));
    return res;
  },
);
await check(
  "fast driving loses comfort and emergency stop denies bonus",
  async () => {
    const res = await page.evaluate(() => {
      const g = __cloudline,
        s = g.state;
      s.speed = 0;
      g.input.power = true;
      let n = 0;
      while (s.mode === "driving" && n < 12000) {
        g.simulate(1 / 60);
        n++;
      }
      g.input.power = false;
      g.updateUI();
      return {
        mode: s.mode,
        comfort: s.comfort,
        misses: s.misses,
        broken: s.streakBroken,
      };
    });
    assert.equal(res.mode, "docked");
    assert.ok(res.comfort < 56);
    assert.equal(res.broken, true);
    assert.equal(res.misses, 1);
    const before = await snap();
    await page.keyboard.press("KeyE");
    const after = await snap();
    assert.equal(after.coins - before.coins, before.passengers * 4);
    assert.equal(after.streak, 0);
    return res;
  },
);
await check("restart resets journey but keeps earned currency", async () => {
  const money = (await snap()).coins;
  await page.keyboard.press("Escape");
  await page.click("#restart");
  const s = await snap();
  assert.equal(s.mode, "ready");
  assert.equal(s.distance, 4);
  assert.equal(s.comfort, 100);
  assert.equal(s.passengers, 12);
  assert.equal(s.coins, money);
  assert.equal(s.arrivals, 0);
});
await check("workshop sequential parts, actual geometry and exit", async () => {
  await page.click("#welcomeWorkshop");
  assert.equal((await snap()).mode, "workshop");
  assert.equal(await page.locator("#upgrade2").isDisabled(), true);
  await page.click("#upgrade1");
  assert.equal(await page.locator("#leaveWorkshop").isDisabled(), true);
  await page.evaluate(() => __cloudline.step(4.1));
  assert.equal((await snap()).workStep, 1);
  await page.click("#upgrade2");
  await page.evaluate(() => __cloudline.step(5.1));
  const s = await snap();
  assert.equal(s.upgraded, true);
  assert.equal(s.workStep, 2);
  assert.equal(
    await page.evaluate(() => __cloudline.workTram.decor.visible),
    true,
  );
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/06-workshop-upgraded.png" });
  await page.click("#leaveWorkshop");
  await page.evaluate(() => __cloudline.step(1));
  assert.ok(
    (await page.evaluate(() => __cloudline.workTram.root.position.z)) > 2,
  );
  await page.evaluate(() => __cloudline.step(1.4));
  assert.equal((await snap()).mode, "ready");
  assert.equal(await page.evaluate(() => __cloudline.tram.decor.visible), true);
});
await check("upgrade and wallet persist on reload", async () => {
  const a = await snap();
  await page.reload();
  await page.waitForFunction(() => window.__cloudline);
  const b = await snap();
  assert.equal(b.upgraded, true);
  assert.equal(b.coins, a.coins);
});
await page.click("#start");
await page.keyboard.down("KeyW");
await page.waitForTimeout(2600);
await page.keyboard.up("KeyW");
await page.waitForTimeout(1600);
await page.screenshot({ path: "screenshots/02-driving.png" });
await check("blur pauses and clears held buttons", async () => {
  await page.keyboard.down("KeyW");
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  assert.equal((await snap()).paused, true);
  assert.equal(await page.evaluate(() => __cloudline.input.power), false);
  await page.keyboard.up("KeyW");
  await page.click("#resume");
});
await check("malformed save is safely ignored", async () => {
  await page.evaluate(() =>
    localStorage.setItem(
      "cloudline.v1",
      '{"version":1,"coins":-12,"upgrade":"yes"}',
    ),
  );
  await page.reload();
  await page.waitForFunction(() => window.__cloudline);
  assert.equal((await snap()).coins, 240);
  assert.equal((await snap()).upgraded, false);
});
// Mobile viewport and real pointer hold/release. Screenshot, rather than CSS alone, is inspected.
const mp = await context.newPage();
await mp.setViewportSize({ width: 390, height: 844 });
mp.on("pageerror", (e) => errors.push(e.stack));
await mp.goto(url);
await mp.waitForFunction(() => window.__cloudline);
await mp.waitForTimeout(900);
await mp.screenshot({ path: "screenshots/07-mobile-ready.png" });
await check("mobile layout and pointer pedal release", async () => {
  assert.equal(
    await mp.evaluate(() => document.documentElement.scrollWidth),
    390,
  );
  await mp.click("#start");
  const b = await mp.locator("#power").boundingBox();
  await mp.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await mp.mouse.down();
  await mp.waitForTimeout(1200);
  await mp.mouse.up();
  const s = await mp.evaluate(() => __cloudline.snapshot());
  assert.ok(s.speed > 0);
  assert.equal(await mp.evaluate(() => __cloudline.input.power), false);
  await mp.screenshot({ path: "screenshots/08-mobile-driving.png" });
});
await check("mobile workshop is operable", async () => {
  await mp.keyboard.press("Escape");
  await mp.click("#restart");
  await mp.click("#welcomeWorkshop");
  await mp.click("#upgrade1");
  await mp.evaluate(() => __cloudline.step(4.1));
  await mp.click("#upgrade2");
  await mp.evaluate(() => __cloudline.step(5.1));
  assert.equal(await mp.evaluate(() => __cloudline.state.upgraded), true);
  await mp.screenshot({ path: "screenshots/09-mobile-workshop.png" });
});
await check("all browser errors and external requests", async () => {
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
});
fs.writeFileSync(
  "tests/report.json",
  JSON.stringify(
    {
      browser: await browser.version(),
      os: process.platform,
      viewport: "1440x1000 / 390x844",
      fixture:
        "Time-compressed 60Hz simulation controller for route completion; keyboard and pointer tests run in real browser time.",
      results,
      errors,
      external,
    },
    null,
    2,
  ),
);
await browser.close();
if (results.some((r) => !r.pass)) process.exitCode = 1;
