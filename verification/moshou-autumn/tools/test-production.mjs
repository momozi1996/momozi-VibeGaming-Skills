import {chromium} from '@playwright/test';import assert from 'node:assert/strict';import fs from 'node:fs';
const base=process.env.BASE_URL||'http://127.0.0.1:4174';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--ignore-gpu-blocklist','--enable-webgl']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});const errors=[],external=[];
page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('requestfailed',r=>errors.push(r.url()));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:')&&!r.url().startsWith('data:'))external.push(r.url())});
try{
 const start=Date.now();await page.goto(base+'/?test=1');await page.getByRole('button',{name:'开始冒险'}).waitFor({state:'visible',timeout:120000});await page.waitForTimeout(700);const startupMs=Date.now()-start;
 assert.equal(await page.evaluate(()=>typeof window.__northshire),'undefined');await page.screenshot({path:'screenshots/12-production-title.png'});await page.getByRole('button',{name:'开始冒险'}).click();await page.waitForTimeout(6400);await page.screenshot({path:'screenshots/13-production-game.png'});
 const fps=await page.locator('#fps').textContent();await page.keyboard.press('m');await page.waitForSelector('#large-map');await page.screenshot({path:'screenshots/14-production-map.png'});await page.keyboard.press('Escape');
 await page.keyboard.press('b');assert(await page.getByRole('dialog').isVisible());await page.keyboard.press('Escape');await page.keyboard.press('Escape');await page.getByRole('button',{name:'保存旅程',exact:true}).click();assert(await page.evaluate(()=>localStorage.getItem('northshire.save.v1')!==null));await page.keyboard.press('Escape');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);const textures=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/assets/')).length);
 const report={date:'2026-09-14',startupMs,fps,assetRequests:textures,productionDebugInterface:false,errors,external,checks:['Production load','Title and world screenshot','Map and bag','Settings and save','No dev-only debug API','No external runtime asset requests']};fs.writeFileSync('screenshots/production-report.json',JSON.stringify(report,null,2));console.log('PASS production',report);
}catch(e){console.error(e);await page.screenshot({path:'screenshots/production-failure.png'});process.exitCode=1;}
await browser.close();
