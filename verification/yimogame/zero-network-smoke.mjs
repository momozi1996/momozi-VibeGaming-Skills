// Delivery verification only. No source/state injection; production runs from bundled dist.
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const [project,url,out]=process.argv.slice(2);
if(!project||!url||!out)throw Error('Usage: node zero-network-smoke.mjs PROJECT URL REPORTDIR');
fs.mkdirSync(out,{recursive:true});
const {chromium}=createRequire(path.join(path.resolve(project),'package.json'))('@playwright/test');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--use-angle=metal','--enable-webgl','--ignore-gpu-blocklist']});
const report={started:new Date().toISOString(),url,production:true,fixtures:false,checks:[],requests:[],blocked:[],errors:[],success:false};
const check=(name,value)=>{assert.ok(value,name);report.checks.push(name)};
try{
 const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,serviceWorkers:'block'});
 await context.route('**/*',async route=>{const u=route.request().url();report.requests.push(u);if(new URL(u).origin!==new URL(url).origin){report.blocked.push(u);await route.abort();}else await route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`)});
 await page.goto(url);await page.waitForSelector('.hud');await page.waitForTimeout(6500);
 check('Bundled production WebGL boots without DEV bridge',await page.evaluate(()=>!window.__ANIIMO__&&document.querySelector('#world').width>0));
 check('Fresh start has no companions',(await page.locator('#discover').textContent())==='0');
 await page.screenshot({path:path.join(out,'01-bundled-field.png')});
 await page.keyboard.down('w');await page.waitForTimeout(1400);await page.keyboard.up('w');
 check('Real keyboard moves player',parseInt(await page.locator('#steps').textContent())>=4);
 await page.keyboard.press('e');await page.waitForFunction(()=>document.querySelector('#discover').textContent==='1');
 check('Native first capture consumes exactly one orb',(await page.locator('#orbs').textContent())==='19');
 await page.keyboard.press('q');await page.waitForFunction(()=>document.querySelector('#player-form').textContent==='联结形态');
 check('Native Q switches linked form',true);await page.screenshot({path:path.join(out,'02-bundled-linked.png')});
 await page.keyboard.press('b');check('Dex opens',await page.locator('.modal.dex').isVisible());
 await page.keyboard.press('Escape');await page.keyboard.press('m');check('Map opens',await page.locator('.modal.map').isVisible());await page.keyboard.press('Escape');
 await page.reload();await page.waitForSelector('.hud');await page.waitForFunction(()=>document.querySelector('#discover').textContent==='1');
 check('Capture persists through reload',(await page.locator('#orbs').textContent())==='19');
 check('No external runtime requests',report.blocked.length===0);check('No JS/HTTP failures',report.errors.length===0);
 report.success=true;report.browser=await browser.version();await context.close();
}finally{report.finished=new Date().toISOString();fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));await browser.close();}
console.log('PASS',report.checks.length,'bundled-dist checks with nonlocal HTTP blocked');
