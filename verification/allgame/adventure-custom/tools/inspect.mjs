import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--ignore-gpu-blocklist','--enable-webgl']});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});const errors=[];
page.on('pageerror',e=>{errors.push(e.stack);console.log('ERROR',e.stack)});page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});page.on('requestfailed',r=>console.log('REQUEST_FAILED',r.url(),r.failure()));
await page.goto('http://127.0.0.1:4173/?test=1',{waitUntil:'domcontentloaded',timeout:60000});
try{await page.waitForFunction(()=>window.__northshire?.snapshot().ready,{timeout:120000});await page.waitForTimeout(1200);await page.screenshot({path:'screenshots/01-title.png'});await page.getByRole('button',{name:'开始冒险'}).click();await page.waitForTimeout(6500);console.log('SNAPSHOT',JSON.stringify(await page.evaluate(()=>window.__northshire.snapshot())));await page.screenshot({path:'screenshots/02-courtyard.png'});
await page.evaluate(()=>window.__northshire.teleport(0,-10));await page.waitForTimeout(1200);await page.screenshot({path:'screenshots/03-abbey.png'});
}catch(e){process.exitCode=1;console.log('INSPECTION_FAILED',e);await page.screenshot({path:'screenshots/error.png'});}
fs.writeFileSync('screenshots/console-errors.json',JSON.stringify(errors,null,2));await browser.close();
