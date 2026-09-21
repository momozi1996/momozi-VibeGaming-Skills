// Observes only text positions actually drawn into the engine's UI canvas.
// No simulation debug API, teleport, state mutation, or fixture is used in dist.
import {chromium} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';
const browser=await chromium.launch({"headless": true, "args": ["--use-angle=metal"], "channel": "chrome"});const page=await browser.newPage({viewport:{width:1600,height:1000}});page.setDefaultTimeout(30000);let checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));const check=(n,v)=>{assert.ok(v,n);checks.push(n);console.log('PASS',n)};
await page.addInitScript(()=>{window.__drawnText={};const fill=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(text,x,y,...rest){window.__drawnText[String(text)]={x,y,at:performance.now()};return fill.call(this,text,x,y,...rest)}});
const label=async(text)=>{await page.waitForFunction(text=>window.__drawnText[text]&&performance.now()-window.__drawnText[text].at<250,text);return page.evaluate(text=>window.__drawnText[text],text)};
const clickText=async(text)=>{let p=await label(text);await page.mouse.click(p.x,p.y);await page.waitForTimeout(150)};
try{
 await page.goto('http://127.0.0.1:60076/?controls=20260921');await label('进 入 峡 谷');check('Production debug API absent',await page.evaluate(()=>typeof window.__RIFT==='undefined'));await clickText('进 入 峡 谷');await label('盖伦 · 你');
 for(let [key,axis,sign] of [['KeyW','y',-1],['KeyS','y',1],['KeyA','x',-1],['KeyD','x',1],['ArrowUp','y',-1],['ArrowDown','y',1],['ArrowLeft','x',-1],['ArrowRight','x',1]]){let before=await label('盖伦 · 你');await page.keyboard.down(key);await page.waitForTimeout(480);await page.keyboard.up(key);await page.waitForTimeout(100);let after=await label('盖伦 · 你');check(`Production ${key} changes rendered hero position correctly`,(after[axis]-before[axis])*sign>10)}
 await page.screenshot({path:'artifacts/controls/production-movement.png'});
 for(let button of ['left','right']){let before=await label('盖伦 · 你');await page.mouse.click(before.x+140,before.y-90,{button});await page.waitForTimeout(600);await page.keyboard.press('KeyX');await page.waitForTimeout(100);let after=await label('盖伦 · 你');check(`Production ${button} world click moves hero`,Math.hypot(after.x-before.x,after.y-before.y)>10)}
 await page.keyboard.press('Digit1');await label('8');check('Production skill key renders cooldown',true);
 await clickText('商店 [P]');await label('装备商店');await page.keyboard.press('Escape');await page.waitForTimeout(150);check('Production shop opens and closes through real input',await page.evaluate(()=>performance.now()-window.__drawnText['装备商店'].at>100));
 await clickText('Ⅱ');await label('战场已暂停');await clickText('继 续 对 局');await page.waitForTimeout(150);check('Production pause/resume buttons work',await page.evaluate(()=>performance.now()-window.__drawnText['战场已暂停'].at>100));
 await page.keyboard.press('KeyC');await label('经典 QWER · C 切换');check('Production C switch updates native UI bindings',true);await page.keyboard.press('KeyC');await label('WASD 移动 · C 切换');
 await page.screenshot({path:'artifacts/controls/production-final.png'});check('Production contains no HTML UI',await page.locator('button,input,div').count()===0);check('No production runtime errors',errors.length===0);
 fs.writeFileSync('artifacts/controls/production-report.json',JSON.stringify({checks,errors,browser:await browser.version(),scope:'Actual dist, real keys/mouse, unmodified match starting at spawn. Test observes drawText positions to verify visible character movement; no simulation debug API.'},null,2));
}finally{await browser.close()}
