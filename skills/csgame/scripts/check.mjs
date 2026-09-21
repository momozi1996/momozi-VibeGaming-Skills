#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {args,projectPath,freshDir,BASE,deps,chromePath,browserArgs,run,startServer} from './common.mjs';
const a=args();
if(a.help){console.log('node check.mjs --project PATH --out NEW_REPORT_DIR [--suite all|core] [--chrome EXECUTABLE]\nUses bundled immutable test contracts. Runs units/build/dev/prod sequentially. Reports never overwrite baseline artifacts.');process.exit(0);}
let out,server;
const summary={startedAt:new Date().toISOString(),phases:[],passed:false,notes:'Tests use the bundled immutable contracts, relocated to the candidate source. Browser fixtures are DEV-only; screenshots/reports are written outside the project. Platform, URL and page-before-browser cleanup adaptations do not remove assertions.'};
try{
 const project=projectPath(a.project);out=await freshDir(a.out);summary.project=project;summary.platform=process.platform;summary.node=process.version;
 if(a.suite&&!['core','all'].includes(a.suite))throw Error('--suite must be all or core');
 const runtime=path.join(out,'.runner');await fs.mkdir(runtime);await fs.mkdir(path.join(out,'artifacts'));
 const unitOriginal=await fs.readFile(path.join(BASE,'tests/simulation.test.js'),'utf8');
 const unit=unitOriginal.replaceAll("'../src/simulation.js'",JSON.stringify(pathToFileURL(path.join(project,'src/simulation.js')).href)).replaceAll("'../src/map.js'",JSON.stringify(pathToFileURL(path.join(project,'src/map.js')).href));
 const unitPath=path.join(runtime,'baseline.test.mjs');await fs.writeFile(unitPath,unit);
 async function phase(name,params,cwd=project,timeout=180000){console.log(`Running ${name}...`);const result=await run(process.execPath,params,{cwd,log:path.join(out,`${name}.log`),timeout});summary.phases.push({name,code:result.code,timedOut:result.timedOut,log:`${name}.log`});if(result.code!==0)throw Error(`${name} failed\n${result.text.slice(-7000)}`);console.log(`PASS ${name}`);}
 await phase('unit',['--test',unitPath]);await phase('build',[path.join(project,'node_modules/vite/bin/vite.js'),'build']);
 if(a.suite!=='core'){
  const {chromium}=deps(project),chrome=chromePath(chromium,a.chrome);summary.chrome=chrome;summary.browserArgs=browserArgs();
  for(const mode of ['development','production']){
   server=await startServer(project,mode,path.join(out,`${mode}-server.log`));
   const original=await fs.readFile(path.join(BASE,`tests/${mode==='development'?'browser':'production'}.mjs`),'utf8');
   let script=original.replace("import {chromium} from 'playwright';",`import {createRequire as __require} from 'node:module';\nconst {chromium}=__require(${JSON.stringify(path.join(project,'package.json'))})('playwright');`);
   script=script.replace("process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'",JSON.stringify(chrome));
   script=script.replace("args:['--use-angle=metal']",`args:${JSON.stringify(browserArgs())}`);
   script=script.replace("process.env.TEST_URL||'http://127.0.0.1:4399'",JSON.stringify(server.url));
   script=script.replaceAll('http://127.0.0.1:4400',server.url);
   // Close the active WebGL page before Chrome; avoids a Metal renderer shutdown hang.
   // Assertions and the exit status are unchanged; a shutdown timeout still fails.
   script=script.replace('finally{await browser.close();}', 'finally{await page.close();await browser.close();}');
   const scriptPath=path.join(runtime,`${mode}.mjs`);await fs.writeFile(scriptPath,script);
   summary.phases.push({name:`${mode}-server`,url:server.url});
   await phase(mode,[scriptPath],out,240000);await server.stop();server=null;
  }
 }
 summary.passed=true;
}catch(e){summary.error=e.message;console.error(e.message);process.exitCode=1;}
finally{if(server)await server.stop();summary.finishedAt=new Date().toISOString();if(out)await fs.writeFile(path.join(out,'summary.json'),JSON.stringify(summary,null,2)+'\n');}
