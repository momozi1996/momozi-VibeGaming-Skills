/** Fixed-state comparison only. This is deliberately not a gameplay pass/fail test. */
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {args,required,fresh,sha,browserOptions,projectRequire} from './runtime.mjs';
const a=args(),project=required(a,'project'),html=path.join(project,'cloudline.html'),out=fresh(required(a,'out'));
const {chromium}=projectRequire(project)('playwright-core');
const browser=await chromium.launch(browserOptions());const meta={browser:await browser.version(),platform:process.platform,inputSha256:sha(html),dpr:1,fixture:'Explicit real-state test fixtures, simulation frozen, camera converged using step(0); not gameplay verification.',shots:[]};
const recipes=[['01-ready','ready',1440,1000],['02-bridge','bridge',1440,1000],['03-mango','mango',1440,1000],['04-workshop','workshop',1440,1000],['05-mobile-ready','ready',390,844],['06-mobile-workshop','workshop',390,844]];
try{for(const [name,pose,width,height]of recipes){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:width<600,offline:true});const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(html).href+'?test');await page.waitForFunction(()=>window.__cloudline);await page.waitForSelector('#loading',{state:'detached'});
 await page.evaluate(async pose=>{
  const g=window.__cloudline,s=g.state;s.paused=false;s.sound=false;s.time=0;
  if(pose==='bridge'){document.getElementById('start').click();Object.assign(s,{distance:126,speed:8,comfort:94,acceleration:0,wind:.6,view:0,orbit:0});}
  if(pose==='mango'){document.getElementById('start').click();Object.assign(s,{distance:s.legEnd-5,speed:1,comfort:98,legMinComfort:94,legRoughness:10});g.simulate(1/60);}
  if(pose==='workshop'){document.getElementById('welcomeWorkshop').click();document.getElementById('upgrade1').click();g.step(4.1);document.getElementById('upgrade2').click();g.step(5.1);}
  Object.assign(s,{time:pose==='bridge'?65:0,paused:true,toastTime:0,subtitleTime:0});
  document.getElementById('toast').classList.remove('show');document.getElementById('subtitle').style.opacity='0';
  // step(0) shares original present() without advancing any simulation timer.
  for(let i=0;i<300;i++)g.step(0);g.updateUI();
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 },pose);
 await page.waitForTimeout(350);if(errors.length)throw Error(errors.join('\n'));
 const file=name+'.png';await page.screenshot({path:path.join(out,file),animations:'disabled'});meta.shots.push({name,file,pose,width,height,state:await page.evaluate(()=>__cloudline.snapshot())});await ctx.close();console.log('Captured',file);
}}finally{await browser.close();}
fs.writeFileSync(path.join(out,'metadata.json'),JSON.stringify(meta,null,2)+'\n');
