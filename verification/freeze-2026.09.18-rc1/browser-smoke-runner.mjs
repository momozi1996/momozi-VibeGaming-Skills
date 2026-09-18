import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {spawn} from 'node:child_process';
const root=process.cwd(),reportDir=path.join(root,'verification/freeze-2026.09.18-rc1');
const summary=JSON.parse(fs.readFileSync(path.join(reportDir,'install-restore-summary.json')));
const {chromium}=createRequire(path.join(root,'verification/quanwanggame/project/package.json'))('@playwright/test');
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=metal','--enable-webgl','--ignore-gpu-blocklist']});const rows=[];
try{for(const skill of summary.skills)for(const output of skill.outputs){const project=output.path;const dir=fs.existsSync(path.join(project,'dist/index.html'))?path.join(project,'dist'):project;
 const server=spawn('python3',['-u','-c',`from functools import partial\nfrom http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler\ns=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=${JSON.stringify(dir)}))\nprint('http://127.0.0.1:'+str(s.server_port),flush=True)\ns.serve_forever()`],{stdio:['ignore','pipe','pipe']});
 let requestLog='';server.stderr.on('data',b=>requestLog+=b);
 const url=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('server timeout')),10000);server.on('error',e=>{clearTimeout(timer);reject(e)});server.stdout.on('data',b=>{const u=String(b).match(/http:\/\/127\.0\.0\.1:\d+/);if(u){clearTimeout(timer);resolve(u[0])}})});
 const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});const page=await ctx.newPage();const errors=[],blocked=[],http=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)http.push({url:r.url(),status:r.status()})});
 await ctx.route('**/*',route=>{const u=route.request().url();if(new URL(u).origin===new URL(url).origin)return route.continue();blocked.push(u);return route.abort()});
 let row={id:skill.id,family:output.family,url,passed:false,errors,blocked,http};
 try{await page.goto(url,{waitUntil:'networkidle',timeout:60000});await page.waitForSelector('canvas',{state:'visible',timeout:60000});await page.waitForTimeout(6000);const name=skill.id+(output.family?'-'+output.family:'');
 await page.screenshot({path:path.join(reportDir,name+'-boot.png')});
 row.canvases=await page.locator('canvas').evaluateAll(cs=>cs.map(c=>({width:c.width,height:c.height,visible:c.getBoundingClientRect().width>0})));
 row.title=await page.title();row.passed=row.canvases.some(c=>c.width>0&&c.height>0&&c.visible)&&!errors.length&&!blocked.length&&http.every(r=>r.url.endsWith('/favicon.ico'));
 }catch(e){row.failure=String(e)}finally{await ctx.close();server.kill();fs.writeFileSync(path.join(reportDir,skill.id+(output.family?'-'+output.family:'')+'-http.log'),requestLog)}
 rows.push(row);console.log(row.passed?'PASS':'FAIL',skill.id,output.family??'',row.failure??'',JSON.stringify(errors));
 }}finally{await browser.close();fs.writeFileSync(path.join(reportDir,'browser-boot-summary.json'),JSON.stringify({success:rows.length===10&&rows.every(r=>r.passed),rows,note:'Freshly restored/built projects served on isolated localhost ports, nonlocal requests blocked. Desktop boot/canvas smoke only, not full gameplay, all-model, real-phone or performance certification.'},null,2))}
if(rows.length!==10||rows.some(r=>!r.passed))process.exitCode=1;
