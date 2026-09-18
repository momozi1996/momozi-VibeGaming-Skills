// Deterministic VISUAL fixture. Frozen rAF and RNG are never used for gameplay/performance certification.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {args,dependencies,launchOptions,server,freshReport} from './browser-common.mjs';
const a=args();if(!a.project||!a.out)throw Error('Usage: node capture.mjs --project /output --out /fresh-report [--port 4374]');const project=path.resolve(a.project),out=path.resolve(a.out);freshReport(out);const {chromium}=dependencies(project);const srv=await server(project,Number(a.port||4374));const b=await chromium.launch(launchOptions());const errors=[];const captures=[];const baseState={version:1,x:0,z:19,captured:[],selected:0,completed:false,reward:0,orbs:20,steps:0};
const cases=[
 {name:'01-field',viewport:[1440,900]},
 {name:'02-encounter',viewport:[1440,900],save:{z:12}},
 {name:'03-linked',viewport:[1440,900],save:{captured:['c1'],orbs:19},key:'q'},
 {name:'04-dex',viewport:[1440,900],save:{captured:['c1','f1','a1'],orbs:17},key:'b'},
 {name:'05-map',viewport:[1440,900],save:{captured:['c1','f1','a1'],orbs:17},key:'m'},
 {name:'06-complete',viewport:[1440,900],save:{captured:['c1','f1','a1'],orbs:17,x:-13,z:-29},key:'e'},
 {name:'07-mobile',viewport:[390,844],mobile:true},
 {name:'08-mobile-map',viewport:[390,844],mobile:true,key:'m'}
];
try{for(const c of cases){const context=await b.newContext({viewport:{width:c.viewport[0],height:c.viewport[1]},deviceScaleFactor:1,isMobile:!!c.mobile,hasTouch:!!c.mobile});const page=await context.newPage();page.on('pageerror',e=>errors.push({case:c.name,message:e.message}));page.on('response',r=>{if(r.status()>=400)errors.push({case:c.name,status:r.status(),url:r.url()});});
 await page.addInitScript(({save})=>{
  let seed=19427,now=0,id=0,rafs=new Map(),timers=new Map();Math.random=()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  performance.now=()=>now;window.requestAnimationFrame=fn=>{rafs.set(++id,fn);return id;};window.cancelAnimationFrame=i=>rafs.delete(i);
  window.setTimeout=(fn,delay=0,...args)=>{timers.set(++id,{at:now+Number(delay),fn,args});return id;};window.clearTimeout=i=>timers.delete(i);
  window.__VISUAL_ADVANCE__=(frames=1)=>{for(let n=0;n<frames;n++){now+=1000/60;for(const [key,t] of [...timers])if(t.at<=now){timers.delete(key);if(typeof t.fn==='function')t.fn(...t.args);}const current=[...rafs.values()];rafs.clear();for(const fn of current)fn(now);}};
  try{localStorage.setItem('windmeadow-aniimo-prototype-v1',JSON.stringify(save));}catch{}
 },{save:{...baseState,...(c.save||{})}});
 await page.goto(srv.url);await page.waitForFunction(()=>!!window.__ANIIMO__,{},{polling:100,timeout:45000});await page.evaluate(()=>window.__VISUAL_ADVANCE__(300));
 if(c.key){await page.keyboard.press(c.key);await page.evaluate(()=>window.__VISUAL_ADVANCE__(240));}
 await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);await page.screenshot({path:path.join(out,c.name+'.png')});const snapshot=await page.evaluate(()=>window.__ANIIMO__.snapshot());captures.push({case:c.name,viewport:c.viewport,mobile:!!c.mobile,save:{...baseState,...(c.save||{})},key:c.key||null,snapshot});
 if(c.name==='04-dex'){const portraits=await page.locator('.partner img').evaluateAll(images=>images.map(i=>i.src));for(let i=0;i<portraits.length;i++)fs.writeFileSync(path.join(out,`portrait-${i}.png`),Buffer.from(portraits[i].split(',')[1],'base64'));}
 if(c.name==='01-field'){await page.evaluate(()=>{const a=document.createElement('a');});const info=await page.evaluate(()=>({ua:navigator.userAgent,platform:navigator.platform,dpr:devicePixelRatio,font:getComputedStyle(document.body).fontFamily}));fs.writeFileSync(path.join(out,'environment.json'),JSON.stringify({...info,browser:await b.version(),launch:launchOptions(),fixture:'Seed19427; requestAnimationFrame exactly1/60s; timer queue virtual; immutable source; screenshot at t5s initial or t9s following modal/action. Do not interpret fixture fps as real performance.'},null,2));}
 await context.close();console.log('captured',c.name);
 }}finally{await b.close();srv.child.kill();fs.writeFileSync(path.join(out,'capture-report.json'),JSON.stringify({captures,errors,fixture:true},null,2));}
if(errors.length)throw Error(JSON.stringify(errors));
