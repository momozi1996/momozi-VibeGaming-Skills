#!/usr/bin/env node
/** Genre-independent browser smoke, NOT a gameplay acceptance test. Starts no server. */
import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
import {assertExternal} from '../assets/kits/racing/scripts/paths.mjs';
const args=process.argv.slice(2),opts={canvas:'canvas',angle:process.platform==='darwin'?'metal':'default'};
for(let i=0;i<args.length;i++){
 if(args[i]==='--help'){console.log('node probe.mjs --project DIR --url http://127.0.0.1:PORT --out NEW_DIR [--canvas SELECTOR] [--start SELECTOR] [--mobile] [--angle BACKEND]\nObserves canvas, errors, network and real screenshots; does not prove gameplay.');process.exit(0);}
 if(args[i]==='--mobile'){opts.mobile=true;continue;}
 if(!['--project','--url','--out','--canvas','--start','--angle'].includes(args[i])||!args[i+1])throw Error('Unknown/incomplete option');opts[args[i].slice(2)]=args[++i];
}
if(!opts.project||!opts.url||!opts.out)throw Error('project/url/out required');
const url=new URL(opts.url);if(!['http:','https:'].includes(url.protocol)||!['localhost','127.0.0.1','[::1]'].includes(url.hostname)||url.username||url.password)throw Error('Use a loopback HTTP URL for a local generated game');
if(!['default','metal','swiftshader','gl','vulkan','d3d11'].includes(opts.angle)||(opts.angle==='metal'&&process.platform!=='darwin'))throw Error('Invalid ANGLE backend');
const project=fs.realpathSync(path.resolve(opts.project)),out=assertExternal(opts.out);assertExternal(project);
if(out===project||out.startsWith(project+path.sep)||project.startsWith(out+path.sep))throw Error('Evidence must be separate');
if(fs.existsSync(opts.out)&&fs.lstatSync(opts.out).isSymbolicLink())throw Error('No symlink output');
if(fs.existsSync(out)&&(!fs.statSync(out).isDirectory()||fs.readdirSync(out).length))throw Error('Output must be new/empty');fs.mkdirSync(out,{recursive:true});
const report={date:new Date().toISOString(),project,url:String(url),smokeOnly:true,mobile:!!opts.mobile,angle:opts.angle,errors:[],failedRequests:[],httpErrors:[],externalRequests:[],checks:[],screenshots:[],unverified:['win/lose loop','collision','save integrity','visual quality','actual device performance','audio listening']};
let browser,error=null;
try{
 const require=createRequire(path.join(project,'package.json'));const {chromium}=require('@playwright/test');
 const launchArgs=['--enable-webgl','--ignore-gpu-blocklist',...(opts.angle==='default'?[]:['--use-angle='+opts.angle])];
 browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'}),args:launchArgs});
 const context=await browser.newContext({viewport:opts.mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,hasTouch:!!opts.mobile,isMobile:!!opts.mobile,acceptDownloads:true});
 const page=await context.newPage();page.setDefaultTimeout(120000);
 page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
 page.on('requestfailed',r=>report.failedRequests.push({url:r.url(),error:r.failure()}));
 page.on('response',r=>{if(r.status()>=400)report.httpErrors.push({url:r.url(),status:r.status()})});
 page.on('request',r=>{if(!r.url().startsWith(url.origin+'/')&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))report.externalRequests.push(r.url())});
 await page.goto(String(url),{waitUntil:'domcontentloaded',timeout:120000});
 const canvas=page.locator(opts.canvas).first();await canvas.waitFor({state:'visible'});await page.waitForTimeout(5000);
 report.checks.push({name:'visible canvas',pass:true});
 await page.screenshot({path:path.join(out,'01-initial.png')});report.screenshots.push('01-initial.png');
 if(opts.start){await page.locator(opts.start).click();await page.waitForTimeout(6000);await page.screenshot({path:path.join(out,'02-started.png')});report.screenshots.push('02-started.png');report.checks.push({name:'native start click',pass:true});}
 report.canvas=await canvas.evaluate(c=>({width:c.width,height:c.height,displayWidth:c.getBoundingClientRect().width,displayHeight:c.getBoundingClientRect().height}));
 if(report.canvas.width<1||report.canvas.height<1)throw Error('Canvas buffer has no area');
 report.pageTitle=await page.title();report.horizontalOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 report.browser=browser.version();
 if(report.errors.length||report.failedRequests.length||report.httpErrors.length)throw Error('Runtime/browser requests contain errors; inspect report');
 report.checks.push({name:'no observed runtime or HTTP failures',pass:true});
 // External URLs and overflow are observations, not universal failures for every genre/UI.
}catch(e){error=String(e);process.exitCode=1;console.error(e)}
finally{if(browser)await browser.close();report.status=error?'failed':'passed';report.error=error;fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');console.log('Probe report:',out)}
