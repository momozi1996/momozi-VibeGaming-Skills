import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=metal']});
const context=await browser.newContext({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const p=await context.newPage();p.on('pageerror',e=>console.log('ERROR',e.message));await p.goto('http://localhost:5173/?test=1',{waitUntil:'commit',timeout:0});
for(let i=0;i<40;i++){if(await p.evaluate(()=>window.__ready))break;await new Promise(r=>setTimeout(r,500));}
await new Promise(r=>setTimeout(r,600));await p.screenshot({path:'screenshots/01-menu.png'});
await p.evaluate(()=>{window.__game.start('mochi');window.__game.step(3.1,{});window.__game.step(6,{throttle:1,assist:true});window.__autoDrive=true;});
await new Promise(r=>setTimeout(r,1600));await p.screenshot({path:'screenshots/08-live-race.png'});console.log('LIVE',await p.evaluate(()=>window.__game.stats));
await p.evaluate(()=>{window.__autoDrive=false;window.__game.menu();});await new Promise(r=>setTimeout(r,800));
const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});const m=await mobile.newPage();await m.goto('http://localhost:5173/?test=1',{waitUntil:'commit',timeout:0});for(let i=0;i<40;i++){if(await m.evaluate(()=>window.__ready))break;await new Promise(r=>setTimeout(r,500));}
await new Promise(r=>setTimeout(r,500));await m.screenshot({path:'screenshots/06-mobile-menu.png'});await m.locator('[data-action="start"]').click({force:true});await m.evaluate(()=>window.__game.step(3.1,{}));
const btn=m.locator('[data-touch="throttle"]');await btn.dispatchEvent('pointerdown',{pointerId:1,pointerType:'touch',bubbles:true});await new Promise(r=>setTimeout(r,1200));
console.log('TOUCH',await m.evaluate(()=>({input:window.__touchInput,speed:window.__game.snapshot.speed})));await m.screenshot({path:'screenshots/07-mobile-race.png'});await btn.dispatchEvent('pointerup',{pointerId:1,pointerType:'touch',bubbles:true});
await browser.close();
