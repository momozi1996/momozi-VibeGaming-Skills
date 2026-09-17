#!/usr/bin/env node
import { assertExternal } from './paths.mjs';
/** Execute the BASELINE assertions against a separate target; never test the old original by mistake. */
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import net from 'node:net';import {fileURLToPath} from 'node:url';import {spawn} from 'node:child_process';
const kit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const args=process.argv.slice(2);
function opt(k,d){let i=args.indexOf(k);return i<0?d:args[i+1]}
if(args.includes('--help')){console.log('node scripts/run_acceptance.mjs --project DIR [--suite all|smoke|core] [--dev-port 4283] [--prod-port 4284] [--report-dir DIR] [--angle default|metal|swiftshader|gl|vulkan|d3d11]\nRequires target npm ci. CHROME_PATH overrides auto-detected Chrome. Does not install dependencies.');process.exit(0)}
const angle=opt('--angle',process.platform==='darwin'?'metal':'default');
if(!['default','metal','swiftshader','gl','vulkan','d3d11'].includes(angle)||(angle==='metal'&&process.platform!=='darwin'))throw Error('Unsupported ANGLE backend');
const target=fs.realpathSync(path.resolve(opt('--project',path.join(kit,'reproduced')))),suite=opt('--suite','all');
if(!['all','core','smoke'].includes(suite))throw Error('Unknown suite');
if(target===kit||['assets','references','scripts','agents'].some(d=>target===path.join(kit,d)||target.startsWith(path.join(kit,d)+path.sep)))throw Error('Never execute against immutable reference/; restore to a new project first');
const stamp=new Date().toISOString().replace(/[:.]/g,'-'),out=path.resolve(opt('--report-dir',path.join(path.dirname(target),'moshou-check-'+stamp)));
if(out===kit||['assets','references','scripts','agents'].some(d=>out===path.join(kit,d)||out.startsWith(path.join(kit,d)+path.sep)))throw Error('Report directory is immutable');
assertExternal(target); assertExternal(out);
if(fs.existsSync(out)&&fs.readdirSync(out).length)throw Error('Use a new report directory; existing evidence will not be overwritten');
fs.mkdirSync(out,{recursive:true});const snapshots=path.join(out,'screenshots');fs.mkdirSync(snapshots,{recursive:true});
const devPort=Number(opt('--dev-port','4283')),prodPort=Number(opt('--prod-port','4284'));
if(![devPort,prodPort].every(n=>Number.isInteger(n)&&n>1024&&n<65536)||devPort===prodPort)throw Error('Invalid/distinct ports required');
const chrome=process.env.CHROME_PATH||[
 '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
 '/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser',
 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find(p=>fs.existsSync(p));
const children=[],stages=[];let temporary;
function exec(cmd,argv,stage,env={}){return new Promise((resolve,reject)=>{
 const log=fs.createWriteStream(path.join(out,stage+'.log'));const p=spawn(cmd,argv,{cwd:target,env:{...process.env,...env},stdio:['ignore','pipe','pipe']});
 p.stdout.on('data',d=>{process.stdout.write(d);log.write(d)});p.stderr.on('data',d=>{process.stderr.write(d);log.write(d)});p.on('error',e=>{log.end();reject(e)});p.on('close',code=>{log.end();stages.push({name:stage,exitCode:code});code===0?resolve():reject(Error(stage+' failed: '+code))});
})}
async function freePort(port){await new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',()=>reject(Error('Port '+port+' is already occupied; choose other ports. Existing processes will not be killed.')));s.listen(port,'127.0.0.1',()=>s.close(resolve));})}
async function server(port,preview=false){await freePort(port);const bin=path.join(target,'node_modules/vite/bin/vite.js');
 const p=spawn(process.execPath,[bin,...(preview?['preview']:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:target,stdio:['ignore','pipe','pipe']});children.push(p);
 const log=fs.createWriteStream(path.join(out,preview?'preview-server.log':'dev-server.log'));p.stdout.pipe(log,{end:false});p.stderr.pipe(log,{end:false});p.on('error',()=>{});p.on('close',()=>log.end());
 for(let i=0;i<200;i++){if(p.exitCode!==null)throw Error('Server exited early');try{const r=await fetch('http://127.0.0.1:'+port+'/');if(r.ok)return}catch{}await new Promise(r=>setTimeout(r,150));}throw Error('Server not ready');
}
async function baselineTest(file,port){let text=fs.readFileSync(path.join(kit,'assets/reference-project/tools',file),'utf8');
 // Adapt browser backend/transport/output only. All assertions and gameplay operations remain unchanged.
 if(angle!=='default')text=text.replace("args:['--ignore-gpu-blocklist','--enable-webgl']","args:['--ignore-gpu-blocklist','--enable-webgl','--use-angle="+angle+"']");
 text=text.replaceAll('http://127.0.0.1:4173','http://127.0.0.1:'+devPort).replaceAll('http://localhost:4173','http://127.0.0.1:'+devPort).replaceAll('http://127.0.0.1:4174','http://127.0.0.1:'+prodPort);
 text=text.replace(/(['"])screenshots\/([^'"]+)\1/g,(_match,_quote,name)=>JSON.stringify(path.join(snapshots,name)));
 text=text.replaceAll("'2026-09-14'",JSON.stringify(new Date().toISOString().slice(0,10)));
 const f=path.join(temporary,file);fs.writeFileSync(f,text);
 await exec(process.execPath,[f],file.replace('.mjs',''),{CHROME_PATH:chrome,BASE_URL:'http://127.0.0.1:'+port});
}
let error=null;
try{
 if(!fs.existsSync(path.join(target,'node_modules/vite/bin/vite.js')))throw Error('Run npm ci in the restored project first');
 const npm=process.platform==='win32'?'npm.cmd':'npm';
 await exec(process.env.PYTHON||'python3',[path.join(kit,'scripts/project.py'),'compare','--project',target],'preflight-asset-tests-pins');
 await exec(npm,['test'],'unit-tests');await exec(npm,['run','build'],'build');
 await exec(process.env.PYTHON||'python3',[path.join(kit,'assets/reference-project/tools/audit_assets.py'),'--check'],'baseline-art-audit');
 // The baseline audit above protects the source kit. Check target assets independently below.
 await exec(process.env.PYTHON||'python3',[path.join(kit,'scripts/project.py'),'compare','--project',target],'target-asset-pins');
 if(suite!=='core'){
  if(!chrome)throw Error('Chrome not found; set CHROME_PATH');
  temporary=fs.mkdtempSync(path.join(target,'.shibing-tests-'));
  if(suite==='all'){await server(devPort);await baselineTest('test-playthrough.mjs',devPort);await baselineTest('test-edges.mjs',devPort);}
  await server(prodPort,true);await baselineTest('test-production.mjs',prodPort);
 }
}catch(e){error=String(e);console.error('FAIL',error);process.exitCode=1}
finally{
 for(const p of children){p.kill('SIGTERM');await Promise.race([new Promise(r=>p.once('close',r)),new Promise(r=>setTimeout(r,1500))]);if(p.exitCode===null)p.kill('SIGKILL')}
 if(temporary)fs.rmSync(temporary,{recursive:true,force:true});
 const report={date:new Date().toISOString(),project:target,suite,devPort,prodPort,chrome,platform:os.platform(),node:process.version,angle,stages,status:error?'failed':'passed',error};
 fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(report,null,2)+'\n');console.log('Report:',out);
}
