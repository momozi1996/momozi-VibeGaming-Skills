#!/usr/bin/env node
// Deterministic scene captures. Test-only API, no edits to the game source.
import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,all)=>{if(v.startsWith('--'))a.push([v.slice(2),all[i+1]]);return a;},[]));
if(!args.project||!args.url||!args.out)throw Error('Usage: node capture.mjs --project TARGET --url http://127.0.0.1:PORT --out OUTPUT');
const target=path.resolve(args.project),out=path.resolve(args.out),require=createRequire(path.join(target,'package.json'));const {chromium}=require('@playwright/test');fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(args.url+'/?debug=1');await page.waitForFunction(()=>window.__ready);await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'});
 const freeze=async()=>{await page.evaluate(()=>{const n=window.neon;n.loop.stop();n.renderer.app.ticker.stop();n.renderer.rainTime=0;n.renderer.shake=0;n.renderer.flash=0;n.renderer.bursts=[];n.loop.render(0);n.renderer.app.renderer.render(n.renderer.app.stage);});};
 await freeze();await page.screenshot({path:path.join(out,'01-select.png')});
 await page.locator('[data-mode=training]').click();await page.locator('#start-button').click();await page.waitForFunction(()=>window.neon.renderer.menu===false&&window.neon.match.state.mode==='training');
 await page.evaluate(()=>{const n=window.neon;for(let i=0;i<150;i++)n.tick();n.match.state.fighters.forEach(f=>{f.age=0;});});
 await freeze();await page.screenshot({path:path.join(out,'02-idle.png')});
 const setups=[['03-light-contact.png','lp',4],['04-heavy-kick.png','hk',11],['05-ava-special.png','special',10]];
 for(const [file,move,age] of setups){
  await page.evaluate(({move,age})=>{const n=window.neon;n.match.resetTraining();const [a,b]=n.match.state.fighters;a.x=390;b.x=620;a.age=b.age=0;n.match.state.hitstop=0;n.match.step([{x:0,y:0,jump:false,buttons:[move]},{x:0,y:0,jump:false,buttons:[]}]);a.age=age;n.match.state.events=[];},{move,age});
  await freeze();await page.screenshot({path:path.join(out,file)});
 }
 await page.evaluate(()=>{window.neon.renderer.debug=true;});await freeze();await page.screenshot({path:path.join(out,'06-debug-boxes.png')});
 await page.evaluate(()=>{const n=window.neon;n.renderer.debug=false;n.match.resetTraining();n.match.state.fighters.forEach(f=>f.age=0);});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);await freeze();await page.screenshot({path:path.join(out,'07-mobile.png')});
 fs.writeFileSync(path.join(out,'capture.json'),JSON.stringify({browser:await browser.version(),viewport:[1280,800],dpr:1,mobile:[390,844],rainTime:0,cssAnimations:false,errors,note:'Posed active frames are visual references, not hit/damage tests. Use run-checks.mjs for gameplay.'},null,2));
 if(errors.length)throw Error(errors.join('\n'));console.log('Captured 7 deterministic views:',out);
}finally{await browser.close();}
