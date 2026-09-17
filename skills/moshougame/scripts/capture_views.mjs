#!/usr/bin/env node
import { assertExternal } from './paths.mjs';
/** Controlled-state screenshots for side-by-side fidelity review. */
import path from 'node:path';import fs from 'node:fs';import {fileURLToPath} from 'node:url';import {createRequire} from 'node:module';
const kit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2);
const opt=(k,d)=>{const i=args.indexOf(k);return i<0?d:args[i+1]};
if(args.includes('--help')){console.log('node scripts/capture_views.mjs --project DIR --url http://127.0.0.1:PORT --output DIR\nRequires a dev server and ?test=1 debug API; output is never written to reference/.');process.exit(0)}
const project=path.resolve(opt('--project',path.join(kit,'reproduced'))),output=path.resolve(opt('--output',path.join(path.dirname(project),'moshou-capture'))),url=opt('--url','http://127.0.0.1:4283');
assertExternal(project); assertExternal(output);
if(output.startsWith(path.join(kit,'assets')+path.sep))throw Error('Capture into reports/; immutable goldens must not be automatically overwritten');
if(fs.existsSync(output)&&fs.readdirSync(output).length)throw Error('Output must be new or empty');fs.mkdirSync(output,{recursive:true});
const require=createRequire(path.join(project,'package.json'));const {chromium}=require('@playwright/test');
const chrome=process.env.CHROME_PATH||['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/chromium'].find(p=>fs.existsSync(p));if(!chrome)throw Error('Set CHROME_PATH');
const angle=opt('--angle',process.platform==='darwin'?'metal':'default');
if(!['default','metal','swiftshader','gl','vulkan','d3d11'].includes(angle)||(angle==='metal'&&process.platform!=='darwin'))throw Error('Unsupported ANGLE backend');
const browser=await chromium.launch({headless:true,executablePath:chrome,args:['--ignore-gpu-blocklist','--enable-webgl',...(angle==='default'?[]:['--use-angle='+angle])]});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(String(e)));const views=[];
try{
 // Seed rendering-kernel randomness before any app imports. This affects capture only, not game files.
 await page.addInitScript(()=>{let seed=20260914;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
 await page.goto(url.replace(/\/$/,'')+'/?test=1');await page.waitForFunction(()=>window.__northshire?.game.ready,{timeout:120000});await page.getByRole('button',{name:'开始冒险'}).click();await page.waitForTimeout(6500);
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}#fps{visibility:hidden}#discovery,#toast,#tooltip,#damage-vignette{display:none!important}'});
 await page.evaluate(()=>{const g=window.__northshire.game;g.engine.stopRenderLoop();g.state.time=0;g.state.paused=true;g.scene.animationsEnabled=false;g.state.data.elapsed=0;g.state.logs=['北郡的钟声从林间传来。','已进入北郡修道院。按 E 与附近的人交谈。'];g.combat.reset();g.props.update(0);for(const actor of [g.player,...g.npcs,...g.enemies.map(e=>e.actor)]){actor.groups.forEach(x=>x.stop());const idle=actor.groups.find(x=>x.name.endsWith('Idle'));idle?.start(true);idle?.goToFrame(0);idle?.pause();}});
 for(const view of [
  {name:'01-courtyard',x:0,z:-27,alpha:-Math.PI/2+.025,beta:1.48,radius:10.8},
  {name:'02-abbey-close',x:0,z:-10,alpha:-Math.PI/2+.025,beta:1.48,radius:10.8},
  {name:'03-east-forest',x:30,z:-24,alpha:-1.72,beta:1.30,radius:10.8},
  {name:'04-quest',x:-4.8,z:-9,alpha:-Math.PI/2+.025,beta:1.48,radius:10.8,modal:'npc'},
  {name:'05-map',x:0,z:-27,alpha:-Math.PI/2+.025,beta:1.48,radius:10.8,modal:'map'},
  {name:'06-bag',x:0,z:-27,alpha:-Math.PI/2+.025,beta:1.48,radius:10.8,modal:'bag'},
 ]){
  await page.evaluate(v=>{const g=window.__northshire.game;g.ui.close();g.state.paused=true;if(!g.controller.teleport(v.x,v.z))throw Error('Capture blocked coordinate');g.player.root.rotation.y=0;g.camera.alpha=v.alpha;g.camera.beta=v.beta;g.camera.radius=v.radius;g.state.data.quest='available';g.state.data.kills=0;g.state.data.herbs=0;g.state.data.level=1;g.state.data.xp=0;g.state.data.hp=100;g.state.data.gold=0;g.state.data.potions=3;g.state.rage=0;g.state.targetId=null;g.ui.renderState();if(v.modal)g.ui.open(v.modal);},view);
  for(let i=0;i<25;i++){
   await page.evaluate(()=>{const g=window.__northshire.game;g.scene.render();g.updateProximity();g.updateLabels();g.ui.frame(60,g.player.position,g.player.root.rotation.y,g.enemies.map(e=>({x:e.actor.position.x,z:e.actor.position.z,dead:false})),null)});
   await page.waitForTimeout(35);
  }
  await page.screenshot({path:path.join(output,view.name+'.png'),animations:'disabled'});views.push({...view,actual:await page.evaluate(()=>{const g=window.__northshire.game;return {alpha:g.camera.alpha,beta:g.camera.beta,radius:g.camera.radius,player:g.player.position.asArray(),target:g.camera.target.asArray(),time:g.state.time,hp:g.state.data.hp,quest:g.state.data.quest};})});
 }
 if(errors.length)throw Error(errors.join('\n'));
 const renderer=await page.evaluate(()=>{const gl=window.__northshire.game.engine._gl;const ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable';});
 const meta={renderer,angle,date:new Date().toISOString(),project,url,browser:await browser.version(),viewport:{width:1600,height:1000},dpr:1,randomSeed:20260914,freeze:'game time=0; simulation + bone animation paused; idle frame=0; CSS animation disabled; FPS/discovery/toast masked',views,errors};fs.writeFileSync(path.join(output,'capture.json'),JSON.stringify(meta,null,2)+'\n');console.log('Captured',views.length,'controlled screenshots:',output);
}catch(e){process.exitCode=1;console.error(e)}finally{await browser.close()}
