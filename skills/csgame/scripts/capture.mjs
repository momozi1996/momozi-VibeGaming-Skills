#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {args,projectPath,freshDir,deps,chromePath,browserArgs,startServer} from './common.mjs';
const a=args();if(a.help){console.log('node capture.mjs --project PROJECT --out NEW_DIR [--chrome EXECUTABLE]\nControlled DEV-only visual inspection views, not gameplay-completion evidence. 1440x900, DPR1.');process.exit(0);}
let server,browser,out;
try{
 const project=projectPath(a.project);out=await freshDir(a.out);const {chromium}=deps(project);server=await startServer(project,'development',path.join(out,'server.log'));browser=await chromium.launch({executablePath:chromePath(chromium,a.chrome),headless:true,args:browserArgs()});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});const views=[];
 await page.goto(server.url);await page.waitForSelector('#loading',{state:'hidden'});await page.waitForTimeout(300);
 async function shot(name){await page.waitForTimeout(180);const file=`inspect-${name}.png`;await page.screenshot({path:path.join(out,file)});views.push({file,state:await page.evaluate(()=>window.__counterline.snapshot())});}
 await shot('menu');await page.click('#start');await page.waitForFunction(()=>document.pointerLockElement!==null);await page.waitForTimeout(150);
 // Freeze simulation without a pause overlay to compare the same visual state.
 await page.evaluate(()=>{const s=window.__counterline.state;s.phase='active';s.paused=true;s.time=50;s.elapsed=2;for(const b of s.bots){b.fire=100;b.repath=100;b.walk=0;b.path=[];}Object.assign(s.player,{x:0,z:24,y:0,pitch:0,yaw:0,moving:false});});
 await shot('spawn');await page.evaluate(()=>{const s=window.__counterline.state;Object.assign(s.player,{x:0,z:5,y:0,yaw:.15,pitch:0});const poses=[[-4,-7],[9,-8],[2,-18]];s.bots.forEach((b,i)=>Object.assign(b,{x:poses[i][0],z:poses[i][1],yaw:Math.atan2(s.player.x-poses[i][0],s.player.z-poses[i][1])}));});await shot('site');
 await page.evaluate(()=>{const s=window.__counterline.state;Object.assign(s.player,{x:-6,z:-6,y:0,yaw:0,pitch:-.08});s.defuse=2.5;});await shot('defuse');
 await page.evaluate(()=>{const s=window.__counterline.state;s.paused=false;s.defuse=0;Object.assign(s.player,{x:0,z:24,y:0,yaw:0,pitch:0});});await page.keyboard.press('KeyB');await page.waitForSelector('#armory:not(.hidden)');await shot('armory');await page.click('[data-buy="sniper"]');await page.click('#buy-close');await page.waitForFunction(()=>document.pointerLockElement!==null);await page.waitForTimeout(150);await page.mouse.down({button:'right'});await page.waitForTimeout(300);await page.evaluate(()=>{window.__counterline.state.paused=true;});await shot('scope');await page.mouse.up({button:'right'});
 await page.evaluate(()=>{const s=window.__counterline.state;s.paused=false;s.phase='roundEnd';s.phaseTime=.01;s.ct=5;s.t=2;s.round=7;s.winner='CT';s.reason='Bomb defused. Compound secured.';});await page.waitForSelector('#result:not(.hidden)');await shot('result');
 if(errors.length)throw Error(errors.join('\n'));await fs.writeFile(path.join(out,'capture-report.json'),JSON.stringify({viewport:{width:1440,height:900},dpr:1,browser:await browser.version(),platform:process.platform,views,errors,notes:'Controlled visual fixtures: simulation is deliberately frozen and state is placed directly. These screenshots are not evidence of unaided gameplay completion. Menu drift, flash animation and platform font/raster differences prevent unconditional pixel-identity claims.'},null,2)+'\n');console.log(`Captured ${views.length} reference views to ${out}`);
}catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();if(server)await server.stop();}
