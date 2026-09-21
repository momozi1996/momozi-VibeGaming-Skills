import { fileURLToPath } from "node:url";
process.chdir(fileURLToPath(new URL("../", import.meta.url)));
import { chromium } from "playwright-core";
import path from "node:path";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : chromium.executablePath()),
  headless: true,
  args: ["--use-angle=metal", "--allow-file-access-from-files"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (e) => console.log("ERROR", e.stack));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});
await page.goto("file://" + path.resolve("cloudline.html") + "?test");
await page.waitForTimeout(3500);
await page.screenshot({ path: "screenshots/01-departure.png" });
console.log(
  await page.evaluate(() => ({
    state: __cloudline.snapshot(),
    info: __cloudline.renderer.info.render,
    geo: __cloudline.renderer.info.memory,
  })),
);
await page.click("#start");
await page.keyboard.down("KeyW");
await page.waitForTimeout(3500);
await page.keyboard.up("KeyW");
await page.screenshot({ path: "screenshots/02-driving.png" });
await page.evaluate(() => {
  __cloudline.input.power = false;
  __cloudline.state.speed = 0;
  __cloudline.state.mode = "ready";
  document.getElementById("welcome").style.display = "block";
});
await page.click("#welcomeWorkshop");
await page.waitForTimeout(1500);
await page.screenshot({ path: "screenshots/03-workshop.png" });
await browser.close();
