#!/usr/bin/env node
/** Baseline regression dispatcher. It does not certify new gameplay recipes. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {assertExternal} from '../assets/kits/racing/scripts/paths.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),opts={suite:'all'};
for(let i=0;i<args.length;i++){
 if(args[i]==='--help'){console.log('node check.mjs --family racing|adventure --project DIR --out NEW_DIR [--suite all|core|production] [--angle metal|default|swiftshader|gl|vulkan|d3d11] [--dev-port 4383] [--prod-port 4384]\nRequires project npm ci. Only bundled baseline behavior is covered.');process.exit(0);}
 if(!['--family','--project','--out','--suite','--angle','--dev-port','--prod-port'].includes(args[i])||!args[i+1]||args[i+1].startsWith('--'))throw Error('Unknown/incomplete option '+args[i]);
 opts[args[i].slice(2)]=args[++i];
}
if(!['racing','adventure'].includes(opts.family)||!opts.project||!opts.out||!['all','core','production'].includes(opts.suite))throw Error('family/project/out and a valid suite required');
const target=fs.realpathSync(path.resolve(opts.project)),out=assertExternal(opts.out);
assertExternal(target);
if(out===target||out.startsWith(target+path.sep)||target.startsWith(out+path.sep))throw Error('Evidence must be separate from target');
if(fs.existsSync(opts.out)&&fs.lstatSync(opts.out).isSymbolicLink())throw Error('No symlink evidence destination');
if(fs.existsSync(out)&&(!fs.statSync(out).isDirectory()||fs.readdirSync(out).length))throw Error('Use a new evidence directory');
fs.mkdirSync(out,{recursive:true});
const stages=[],kit=path.join(root,'assets/kits',opts.family),python=process.env.PYTHON||'python3';
async function run(command,argv,name){
 const log=fs.createWriteStream(path.join(out,name+'.log'));
 await new Promise((resolve,reject)=>{
  const child=spawn(command,argv,{cwd:target,stdio:['ignore','pipe','pipe'],env:process.env});
  child.stdout.on('data',d=>{log.write(d);process.stdout.write(d)});child.stderr.on('data',d=>{log.write(d);process.stderr.write(d)});
  child.once('error',e=>{log.end();stages.push({name,command,args:argv,error:String(e),exitCode:null});reject(e)});
  child.once('close',code=>{log.end();stages.push({name,command,args:argv,exitCode:code});code===0?resolve():reject(Error(name+' exited '+code))});
 });
}
let error=null;
try{
 await run(python,[path.join(root,'scripts/game.py'),'verify'],'package-integrity');
 if(opts.family==='adventure'){
  const extra=['--dev-port',opts['dev-port']||'4383','--prod-port',opts['prod-port']||'4384'];
  if(opts.angle)extra.push('--angle',opts.angle);
  await run(process.execPath,[path.join(kit,'scripts/run_acceptance.mjs'),'--project',target,'--suite',opts.suite==='production'?'smoke':opts.suite,'--report-dir',path.join(out,'baseline'),...extra],'adventure');
 }else{
  await run(python,[path.join(root,'scripts/game.py'),'compare','--family','racing','--project',target],'asset-tests-pins');
  const npm=process.platform==='win32'?'npm.cmd':'npm';
  await run(npm,['test'],'unit');await run(npm,['run','build'],'build');
  const common=[path.join(kit,'scripts/browser_verify.mjs'),'--project',target];if(opts.angle)common.push('--angle',opts.angle);
  if(opts.suite==='all')await run(process.execPath,[...common,'--out',path.join(out,'development')],'development');
  if(opts.suite!=='core')await run(process.execPath,[...common,'--preview','--out',path.join(out,'production')],'production');
 }
}catch(e){error=String(e);process.exitCode=1;console.error(error)}
finally{
 fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify({skill:'allgame',date:new Date().toISOString(),project:target,family:opts.family,suite:opts.suite,status:error?'failed':'passed',error,stages,
  scope:'Bundled baseline behavior and unchanged runtime assets/pins; new mechanics/maps require their own tests.',node:process.version,platform:process.platform},null,2)+'\n');
 console.log('Report:',out);
}
