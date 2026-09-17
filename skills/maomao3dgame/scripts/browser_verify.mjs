#!/usr/bin/env node
import { assertExternal } from './paths.mjs';
/** Portable fixed-frame regression harness. No changes to the game's source files.
 * Uses target-project node_modules; starts and owns one loopback Vite subprocess.
 * Usage: node browser_verify.mjs --project DIR --out NEW_DIR [--gallery]
 *        [--browser chrome|chromium] [--angle metal|swiftshader|default]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const args = process.argv.slice(2), options = { browser: 'chrome', angle: process.platform === 'darwin' ? 'metal' : 'default', gallery: false, preview: false };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--gallery') options.gallery = true;
  else if (args[i] === '--preview') options.preview = true;
  else if (args[i] === '--help') {
    console.log('node browser_verify.mjs --project DIR --out NEW_DIR [--gallery] [--preview] [--browser chrome|chromium] [--angle metal|swiftshader|default]');
    process.exit(0);
  } else if (['--project', '--out', '--browser', '--angle'].includes(args[i]) && args[i+1]) options[args[i].slice(2)] = args[++i];
  else throw new Error(`Unknown or incomplete option: ${args[i]}`);
}
assert(options.project && options.out, '--project and --out required');
assert(['chrome', 'chromium'].includes(options.browser), 'browser must be chrome or chromium');
assert(['default', 'metal', 'swiftshader', 'gl', 'vulkan', 'd3d11'].includes(options.angle), 'unsupported ANGLE option');
assert(options.angle !== 'metal' || process.platform === 'darwin', 'ANGLE metal is macOS only');
const project = await fs.realpath(path.resolve(options.project));
async function canonicalFuturePath(raw) {
  let cursor = path.resolve(raw); const tail = [];
  for (;;) {
    try { return path.join(await fs.realpath(cursor), ...tail.reverse()); }
    catch (error) { if (error.code !== 'ENOENT') throw error; tail.push(path.basename(cursor)); const parent=path.dirname(cursor); if(parent===cursor)throw error; cursor=parent; }
  }
}
const rawOut = path.resolve(options.out);
const rawStat = await fs.lstat(rawOut).catch(e => { if(e.code!=='ENOENT')throw e; return null; });
assert(!rawStat?.isSymbolicLink(), 'Output may not be a symlink');
const out = await canonicalFuturePath(rawOut);
assertExternal(project); assertExternal(out);
const inside = (child, parent) => child === parent || child.startsWith(parent + path.sep);
assert(!inside(out, project) && !inside(project, out), 'Use an evidence output directory separate from the target project');
const existing = await fs.lstat(out).catch(e => { if (e.code !== 'ENOENT') throw e; return null; });
assert(!existing || existing.isDirectory() && !existing.isSymbolicLink() && (await fs.readdir(out)).length === 0, 'Report directory must be new or empty, never a symlink');
await fs.mkdir(out, { recursive: true });
const report = {
  schemaVersion: 1, startedAt: new Date().toISOString(), ok: false,
  project, options, environment: { node: process.version, platform: process.platform, release: os.release(), arch: process.arch },
  fixture: { version: 1, scriptSha256: crypto.createHash('sha256').update(await fs.readFile(fileURLToPath(import.meta.url))).digest('hex'), stepSeconds: 1/60, startMilliseconds: 1000, randomSeed: 6202611, dpr: 1, cssAnimations: false, virtualRafAndTimeouts: true, realPerformanceMeasurement: false },
  checks: [], screenshots: [], errors: [], warnings: [],
  unverified: ['音频听感/混音', '真实手机/GPU性能', '全屏权限与真机手柄', '跨平台像素一致性'],
};
let server, browser, serverLog = '';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function freePort() {
  const s = net.createServer(); await new Promise((resolve, reject) => { s.once('error', reject); s.listen(0, '127.0.0.1', resolve); });
  const port = s.address().port; await new Promise((resolve, reject) => s.close(e => e ? reject(e) : resolve())); return port;
}
async function poll(fn, message, timeout = 180000) {
  const deadline = Date.now() + timeout; let last;
  while (Date.now() < deadline) {
    try { const value = await fn(); if (value) return value; } catch (e) { last = e; }
    await sleep(100);
  }
  throw new Error(`Timed out: ${message}${last ? '\n' + last.message : ''}`);
}
async function check(name, fn) {
  console.log('CHECK', name); const begin = Date.now();
  try { const detail = await fn(); report.checks.push({ name, pass: true, wallMs: Date.now()-begin, detail: detail ?? null }); }
  catch (e) { report.checks.push({ name, pass: false, error: e.stack }); throw e; }
}
function fixture() {
  localStorage.clear(); sessionStorage.clear();
  let now = 1000, nextId = 1, seed = 6202611;
  const frames = new Map(), timers = new Map();
  Object.defineProperty(performance, 'now', { configurable: true, value: () => now });
  Math.random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  window.requestAnimationFrame = fn => { const id = nextId++; frames.set(id, fn); return id; };
  window.cancelAnimationFrame = id => frames.delete(id);
  const schedule = (fn, delay, repeat, params) => {
    const id = nextId++, ms = Math.max(0, Number(delay) || 0);
    timers.set(id, { fn, due: now+ms, repeat: repeat ? Math.max(ms, 1) : 0, params }); return id;
  };
  window.setTimeout = (fn, delay, ...params) => schedule(fn, delay, false, params);
  window.setInterval = (fn, delay, ...params) => schedule(fn, delay, true, params);
  window.clearTimeout = window.clearInterval = id => timers.delete(id);
  window.__audioContexts = [];
  if (window.AudioContext) {
    window.AudioContext = new Proxy(window.AudioContext, { construct(Target, args) {
      const context = new Target(...args); window.__audioContexts.push(context); return context;
    } });
  }
  window.__captureTick = async (count = 1) => {
    for (let n = 0; n < count; n++) {
      now += 1000/60;
      const due = [...timers.entries()].filter(([,timer]) => timer.due <= now).sort((a,b) => a[1].due-b[1].due || a[0]-b[0]);
      for (const [id,timer] of due) {
        if (!timers.has(id)) continue;
        if (timer.repeat) timer.due = now+timer.repeat; else timers.delete(id);
        if (typeof timer.fn === 'function') timer.fn(...timer.params); else (0,eval)(String(timer.fn));
      }
      const queue = [...frames.entries()];
      for (const [id,fn] of queue) { if (!frames.has(id)) continue; frames.delete(id); fn(now); }
      await Promise.resolve();
    }
    return { now, pendingRaf: frames.size, pendingTimers: timers.size };
  };
}
async function tick(page, count = 1) {
  // Yield to protocol after bounded batches; simulation time remains fixed.
  for (let n = 0; n < count; n += 30) await page.evaluate(n => window.__captureTick(n), Math.min(30,count-n));
}
async function nativeClick(page, selector) {
  const locator = page.locator(selector).first();
  assert(await locator.isVisible(), `Not visible: ${selector}`);
  assert(await locator.isEnabled(), `Not enabled: ${selector}`);
  const box = await locator.boundingBox(); assert(box, `No box: ${selector}`);
  const x = box.x+box.width/2, y = box.y+box.height/2;
  assert(await locator.evaluate((el,p) => el.contains(document.elementFromPoint(p.x,p.y)), {x,y}), `Click intercepted: ${selector}`);
  // Native browser input, not force-click or DOM .click(). Locator stable checks need rAF, intentionally controlled here.
  await page.mouse.click(x,y);
}
async function hold(page, key, frames) { await page.keyboard.down(key); await tick(page,frames); await page.keyboard.up(key); }
async function shot(page, name) {
  const destination = path.join(out,name); await fs.mkdir(path.dirname(destination), {recursive:true});
  await page.screenshot({path:destination, timeout:60000});
  const state = await page.evaluate(() => ({ phase:window.__game.snapshot.phase, elapsed:window.__game.snapshot.elapsed, visualClock:performance.now(), character:window.__game.snapshot.racers[0].characterId, stats:window.__game.stats }));
  report.screenshots.push({file:name, viewport:page.viewportSize(), ...state, statsWarning:'fps is fixture-derived, NOT measured throughput'});
}
async function openPage(mobile = false) {
  const context = await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1600,height:1000}, deviceScaleFactor:1, hasTouch:mobile, isMobile:mobile, locale:'zh-CN', timezoneId:'Asia/Shanghai', acceptDownloads:true});
  await context.addInitScript(fixture);
  const page = await context.newPage(); page.setDefaultTimeout(20000);
  page.on('pageerror', e => report.errors.push({source:mobile?'mobile':'desktop', type:'pageerror', message:e.message}));
  page.on('console', m => { if(m.type()==='error') report.errors.push({source:mobile?'mobile':'desktop',type:'console',message:m.text()}); if(m.type()==='warning')report.warnings.push(m.text()); });
  await page.goto(report.url+'?test=1', {waitUntil:'domcontentloaded', timeout:180000});
  await poll(() => page.evaluate(() => !!window.__game), 'window.__game');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({content:'*,*::before,*::after { animation:none!important; transition:none!important; caret-color:transparent!important; }'});
  await tick(page,90);
  assert(await page.evaluate(() => window.__ready), '__ready not set after rendering');
  return {context,page};
}
try {
  const require = createRequire(path.join(project,'package.json'));
  const { chromium } = require('@playwright/test');
  const vite = path.join(path.dirname(require.resolve('vite/package.json')),'bin/vite.js');
  if(options.preview)assert((await fs.stat(path.join(project,'dist/index.html')).catch(()=>null))?.isFile(),'Run npm run build before --preview');
  const port = await freePort(); report.url = `http://127.0.0.1:${port}/`;
  server = spawn(process.execPath,[vite,...(options.preview?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:project,stdio:['ignore','pipe','pipe']});
  let serverError;
  server.on('error', error => {serverError=error;});
  for(const stream of [server.stdout,server.stderr]) stream.on('data',data => {serverLog += data.toString();});
  await poll(async () => {if(serverError)throw serverError;if(server.exitCode!==null)throw new Error('Vite exited: '+serverLog);return (await fetch(report.url,{signal:AbortSignal.timeout(1500)})).ok;}, 'owned Vite startup',30000);
  const launchArgs = ['--enable-webgl','--ignore-gpu-blocklist'];
  if(options.angle!=='default')launchArgs.push('--use-angle='+options.angle);
  if(options.angle==='swiftshader')launchArgs.push('--enable-unsafe-swiftshader');
  browser = await chromium.launch({headless:true,...(options.browser==='chrome'?{channel:'chrome'}:{}),args:launchArgs,timeout:90000});
  report.environment.browserVersion=browser.version();
  let {context,page} = await openPage();
  report.environment.webgl=await page.evaluate(()=>{const gl=window.__game.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return {vendor:gl.getParameter(gl.VENDOR),renderer:gl.getParameter(gl.RENDERER),unmasked:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null};});
  await check('menu_ready_and_six_characters',async()=>{assert.equal(await page.locator('[data-character]').count(),6);assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'menu');await shot(page,'01-menu.png');});
  await check('all_character_choices_change_simulation_and_hero',async()=>{
    for(const id of ['mochi','mango','luna','oreo','sakura','coco']) {
      await nativeClick(page,`[data-character="${id}"]`); await tick(page,2);
      const selected=await page.evaluate(()=>{const g=window.__game;return {simulation:g.snapshot.racers[0].characterId,heroes:g.scene.children.filter(o=>o.visible&&o.userData.characterId).map(o=>o.userData.characterId),ui:g.ui.getSelectedCharacter()};});
      assert.equal(selected.simulation,id);assert.equal(selected.ui,id);assert(selected.heroes.includes(id), 'Actual visible hero did not change');
    }
    await nativeClick(page,'[data-character="mochi"]');await tick(page,2);
  });
  await check('help_dialog',async()=>{await nativeClick(page,'[data-action="help"]');assert(await page.locator('dialog').evaluate(e=>e.open));await nativeClick(page,'[data-action="close-dialog"]');assert(!(await page.locator('dialog').evaluate(e=>e.open)));});
  await check('mute_and_quality_settings',async()=>{
    await nativeClick(page,'[data-action="mute"]');assert.equal(await page.evaluate(()=>localStorage.getItem('aloha-muted')),'1');
    await nativeClick(page,'[data-action="mute"]');assert.equal(await page.evaluate(()=>localStorage.getItem('aloha-muted')),'0');
    await nativeClick(page,'[data-action="settings"]');
    for(const quality of ['low','balanced','high']){await page.locator('[data-ui="quality"]').selectOption(quality);await tick(page,1);const current=await page.evaluate(()=>({quality:window.__game.stats.quality,shadows:window.__game.renderer.shadowMap.enabled}));assert.equal(current.quality,quality);assert.equal(current.shadows,quality!=='low');}
    await nativeClick(page,'[data-action="close-dialog"]');
    return {audioContexts:await page.evaluate(()=>window.__audioContexts.map(c=>({state:c.state,sampleRate:c.sampleRate}))),audition:'not performed'};
  });
  await check('countdown_and_no_implicit_autopilot',async()=>{
    await nativeClick(page,'[data-action="start"]');assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'countdown');
    await tick(page,181);assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'racing');
    assert.equal(await page.evaluate(()=>window.__game.snapshot.speed),0);
    await tick(page,30);assert.equal(await page.evaluate(()=>window.__game.snapshot.speed),0);
  });
  await check('native_keyboard_acceleration_steering_brake_rescue',async()=>{
    await hold(page,'w',90); const moving=await page.evaluate(()=>({speedMps:window.__game.snapshot.racers[0].speed,speedKmh:window.__game.snapshot.speed,progress:window.__game.snapshot.racers[0].progress}));assert(moving.speedMps>5);
    const hud=Number(await page.locator('[data-ui="speed"]').textContent());assert(hud===moving.speedKmh && Math.abs(hud-Math.round(moving.speedMps*3.6))<=1,'HUD speed mismatch');
    await hold(page,'d',12);assert((await page.evaluate(()=>window.__game.snapshot.racers[0].steer))>0.1);
    await hold(page,'a',18);assert((await page.evaluate(()=>window.__game.snapshot.racers[0].steer))<-.1);
    const beforeBrake=await page.evaluate(()=>window.__game.snapshot.speed);await hold(page,'s',20);assert((await page.evaluate(()=>window.__game.snapshot.speed))<beforeBrake);
    await hold(page,'r',1);const reset=await page.evaluate(()=>({speed:window.__game.snapshot.speed,lateral:window.__game.snapshot.racers[0].lateral}));assert(reset.speed<.1);assert(Math.abs(reset.lateral)<.1);await tick(page,24);
    return {moving,hudKmh:hud,reset};
  });
  await check('race_camera_and_pause_freeze_resume',async()=>{
    await page.evaluate(()=>{window.__game.step(6,{throttle:1,assist:true});window.__autoDrive=true;});await tick(page,45);await page.evaluate(()=>window.__autoDrive=false);
    await shot(page,'02-race.png');
    await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'paused');
    const elapsed=await page.evaluate(()=>window.__game.snapshot.elapsed);await tick(page,45);assert.equal(await page.evaluate(()=>window.__game.snapshot.elapsed),elapsed);await shot(page,'03-pause.png');
    await nativeClick(page,'[data-action="resume"]');assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'racing');
  });
  await check('item_key_consumes_explicit_fixture_item',async()=>{
    // Explicitly seed one item to isolate the input chain. Pickup behavior is covered by unit tests.
    await page.evaluate(()=>{window.__game.simulation.racers[0].item='boost';});await tick(page,1);
    await hold(page,'e',2);const item=await page.evaluate(()=>({item:window.__game.snapshot.item,boost:window.__game.snapshot.boost}));assert(!item.item);assert(item.boost>0);return {...item,itemSource:'test fixture; not claimed to be naturally collected'};
  });
  await check('three_laps_and_eight_result_entries',async()=>{
    const finish=await page.evaluate(()=>{const g=window.__game;for(let i=0;i<45&&g.snapshot.phase!=='finished';i++)g.step(10,{throttle:1,assist:true,item:i%2===0});return {phase:g.snapshot.phase,lap:g.snapshot.lap,elapsed:g.snapshot.elapsed,position:g.snapshot.position,results:g.snapshot.results};});
    assert.equal(finish.phase,'finished');assert.equal(finish.results.length,8);assert.equal(finish.lap,3);await tick(page,60);
    assert(await page.locator('[data-ui="results"]').isVisible());await shot(page,'04-results.png');return {...finish,completionInput:'explicit assist, not human-driven footage'};
  });
  await check('restart_and_return_to_menu',async()=>{
    await nativeClick(page,'[data-ui="results"] [data-action="restart"]');assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'countdown');
    await tick(page,2);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'paused');
    await nativeClick(page,'[data-ui="pause"] [data-action="menu"]');await tick(page,60);assert.equal(await page.evaluate(()=>window.__game.snapshot.phase),'menu');
  });
  await check('photo_mode_orbit_and_real_png_download',async()=>{
    await page.keyboard.press('p');assert(await page.locator('body').evaluate(e=>e.classList.contains('photo-mode')));await tick(page,30);
    await shot(page,'05-postcard.png');const before=await page.evaluate(()=>window.__game.camera.position.toArray());
    await page.mouse.move(900,500);await page.mouse.down();await page.mouse.move(1020,530,{steps:8});await page.mouse.up();await tick(page,30);
    const after=await page.evaluate(()=>window.__game.camera.position.toArray());assert(before.some((v,i)=>Math.abs(v-after[i])>.01),'Orbit did not move camera');
    const downloadPromise=page.waitForEvent('download');await nativeClick(page,'#photo-save');const download=await downloadPromise;
    const file=path.join(out,'05-postcard-download.png');await download.saveAs(file);const bytes=await fs.readFile(file);assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert(bytes.length>10000);
    await page.keyboard.press('p');assert(!(await page.locator('body').evaluate(e=>e.classList.contains('photo-mode'))));return {bytes:bytes.length,suggestedFilename:download.suggestedFilename()};
  });
  await context.close();
  ({context,page}=await openPage(true));
  await check('mobile_layout_and_native_touch_press_release',async()=>{
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await shot(page,'06-mobile-menu.png');
    await nativeClick(page,'[data-action="start"]');await tick(page,181);
    const button=page.locator('[data-touch="throttle"]');assert(await button.isVisible());const box=await button.boundingBox();
    const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width/2,y:box.y+box.height/2,id:1}]});
    await tick(page,90);const pressed=await page.evaluate(()=>({speedKmh:window.__game.snapshot.speed,speedMps:window.__game.snapshot.racers[0].speed,input:{...window.__touchInput}}));assert.equal(pressed.input.throttle,1);assert(pressed.speedMps>5);await shot(page,'07-mobile-race.png');
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await tick(page,1);assert.equal(await page.evaluate(()=>window.__touchInput.throttle),0);await cdp.detach();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);return {pressed,releaseThrottle:0,touchMethod:'trusted Chromium CDP touch events, not dispatchEvent'};
  });
  await context.close();
  if(options.gallery)await check('six_character_fixed_frame_gallery',async()=>{
    for(const id of ['mochi','mango','luna','oreo','sakura','coco']){const g=await openPage();await nativeClick(g.page,`[data-character="${id}"]`);await tick(g.page,30);await shot(g.page,`gallery/${id}.png`);await g.context.close();}
  });
  await check('no_runtime_javascript_or_console_errors',async()=>{assert.equal(report.errors.length,0,JSON.stringify(report.errors));return {warnings:report.warnings.length};});
  report.ok=true;
} catch(error) {
  report.failure=error.stack;console.error(error.stack);process.exitCode=1;
} finally {
  if(browser)await browser.close().catch(e=>{report.cleanupBrowserError=e.message;});
  if(server && server.exitCode===null && server.signalCode===null) {
    server.kill('SIGTERM');await Promise.race([new Promise(r=>server.once('exit',r)),sleep(3000)]);
    if(server.exitCode===null && server.signalCode===null)server.kill('SIGKILL');
  }
  report.finishedAt=new Date().toISOString();
  await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
  await fs.writeFile(path.join(out,'server.log'),serverLog);
  console.log(`Report: ${path.join(out,'report.json')}\n${report.ok?'PASS':'FAIL'}`);
}
