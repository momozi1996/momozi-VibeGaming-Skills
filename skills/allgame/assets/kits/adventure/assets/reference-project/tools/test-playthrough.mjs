import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';import fs from 'node:fs';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--ignore-gpu-blocklist','--enable-webgl']});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});const errors=[],external=[],checks=[];
page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173')&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))external.push(r.url())});
const report=(name,data=true)=>{checks.push({name,data});console.log('PASS',name,typeof data==='object'?JSON.stringify(data):data)};
const snap=()=>page.evaluate(()=>window.__northshire.snapshot());
const teleport=async(x,z)=>{assert(await page.evaluate(([x,z])=>window.__northshire.teleport(x,z),[x,z]));await page.waitForTimeout(350)};
async function load(){await page.goto('http://127.0.0.1:4173/?test=1');await page.waitForFunction(()=>window.__northshire?.game.ready,{timeout:120000});await page.waitForTimeout(800);}
try{
 await load();await page.getByRole('button',{name:'开始冒险'}).click();await page.waitForTimeout(800);
 const start=await snap();await page.keyboard.down('w');await page.waitForTimeout(1000);await page.keyboard.up('w');const moved=await snap();assert(moved.player.z>start.player.z+2);report('WASD moves player',moved.player);
 await page.keyboard.press('Space');await page.waitForTimeout(150);assert((await snap()).player.y>.25);await page.waitForTimeout(1000);assert(Math.abs((await snap()).player.y)<.05);report('Jump and landing');
 await teleport(0,2);await page.keyboard.down('w');await page.waitForTimeout(1600);await page.keyboard.up('w');assert((await snap()).player.z<4);report('Abbey collision blocks passage', (await snap()).player);
 await teleport(-4.8,-9);await page.keyboard.press('e');await page.getByRole('button',{name:'接受任务'}).click();assert.equal((await snap()).state.quest,'active');report('Quest accepted through NPC dialogue');
 await page.keyboard.press('l');await page.screenshot({path:'screenshots/04-quest-dialogue.png'});await page.keyboard.press('Escape');
 await page.keyboard.press('m');await page.waitForSelector('#large-map');const beforeMap=await snap();await page.keyboard.down('w');await page.waitForTimeout(500);await page.keyboard.up('w');assert.equal((await snap()).player.z,beforeMap.player.z);await page.screenshot({path:'screenshots/05-map.png'});await page.keyboard.press('Escape');report('Map renders and pauses world');
 for(let i=1;i<=3;i++){
  const enemy=(await snap()).enemies.find(e=>e.id==='wolf-'+i);await teleport(enemy.x,enemy.z-2.7);await page.keyboard.press('Tab');await page.keyboard.press('1');
  if(i===1){await page.waitForTimeout(1600);await page.screenshot({path:'screenshots/06-combat.png'});}
  if(i===2){await page.waitForTimeout(1200);await page.keyboard.press('2');}
  if(i===3){await page.waitForTimeout(500);await page.keyboard.press('3');}
  await page.waitForFunction(i=>window.__northshire.state.data.kills>=i,i,{timeout:18000});report('Defeated wolf '+i,(await snap()).state);
  if(i===1){await page.keyboard.press('4');assert.equal((await snap()).state.potions,2);report('Potion heals and is consumed');await page.keyboard.press('e');}
 }
 await teleport(29,-23);await page.keyboard.press('e');await page.waitForTimeout(200);await teleport(42,-25);await page.keyboard.press('e');await page.waitForTimeout(200);assert.equal((await snap()).state.herbs,2);assert.equal((await snap()).state.quest,'return');report('Gathering advances quest to return');
 await teleport(-4.8,-9);await page.keyboard.press('e');await page.getByRole('button',{name:'完成任务'}).click();const completed=await snap();assert.equal(completed.state.quest,'complete');assert.equal(completed.state.level,2);assert(completed.state.gold>=15);report('Quest completion, XP, level and rewards',completed.state);
 await page.keyboard.press('b');await page.screenshot({path:'screenshots/07-inventory.png'});assert(await page.getByRole('dialog').isVisible());await page.keyboard.press('Escape');
 await page.evaluate(()=>window.__northshire.state.save());await load();await page.getByRole('button',{name:'继续上次旅程'}).click();await page.waitForTimeout(500);assert.equal((await snap()).state.quest,'complete');assert.equal((await snap()).state.level,2);report('Save survives reload and continue');
 await page.evaluate(()=>window.__northshire.damage(999));await page.getByRole('button',{name:'返回修道院',exact:true}).click();assert.equal((await snap()).state.hp,120);assert.equal((await snap()).state.quest,'complete');report('Death/respawn retains progress');
 await page.keyboard.press('Escape');await page.selectOption('#quality','balanced');await page.locator('#volume').fill('25');await page.keyboard.press('Escape');report('Quality and volume controls');
 await teleport(0,-27);await page.waitForTimeout(1500);await page.screenshot({path:'screenshots/08-completed-courtyard.png'});
 const alpha=await page.evaluate(()=>window.__northshire.game.camera.alpha);await page.mouse.move(900,600);await page.mouse.down({button:'right'});await page.mouse.move(1030,600,{steps:10});await page.mouse.up({button:'right'});assert.notEqual(await page.evaluate(()=>window.__northshire.game.camera.alpha),alpha);report('Mouse orbit camera');
 await page.keyboard.press('p');assert(await page.locator('#photo-ui').isVisible());await page.screenshot({path:'screenshots/09-photo-mode.png'});await page.keyboard.press('p');
 await page.setViewportSize({width:1280,height:720});await page.waitForTimeout(1000);await page.screenshot({path:'screenshots/10-1280x720.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),1280);report('1280×720 layout has no horizontal overflow');
 const gl=await page.evaluate(()=>{const g=window.__northshire.game.engine._gl;const d=g.getExtension('WEBGL_debug_renderer_info');return d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):'not disclosed';});report('Renderer',gl);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);report('No runtime console errors or external asset requests');
 fs.writeFileSync('screenshots/playthrough-report.json',JSON.stringify({date:'2026-09-14',checks,errors,external,final:await snap()},null,2));
}catch(e){console.error('FAIL',e);console.log('STATE',JSON.stringify(await snap().catch(()=>null)));await page.screenshot({path:'screenshots/playthrough-failure.png'});fs.writeFileSync('screenshots/playthrough-report.json',JSON.stringify({checks,errors,external,error:String(e)},null,2));process.exitCode=1;}
await browser.close();
