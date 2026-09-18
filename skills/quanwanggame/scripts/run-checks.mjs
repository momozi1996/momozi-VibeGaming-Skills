#!/usr/bin/env node
// Isolated verification: test the supplied target, not a pre-existing localhost game.
import fs from 'node:fs';import path from 'node:path';import {spawn,spawnSync} from 'node:child_process';
const project=path.resolve(process.argv[2]??'');if(!process.argv[2]||!fs.existsSync(path.join(project,'package.json')))throw Error('Usage: node run-checks.mjs TARGET');
if(project.includes(path.join('assets','reference-project')))throw Error('Use a working copy.');
const npm=process.platform==='win32'?'npm.cmd':'npm';
for(const command of ['test','build']){const r=spawnSync(npm,['run',command],{cwd:project,stdio:'inherit',shell:process.platform==='win32'});if(r.status!==0)process.exit(r.status??1);}
fs.mkdirSync(path.join(project,'evidence'),{recursive:true});
const server=spawn(process.env.PYTHON??'python3',['start-demo.py','--port','0','--no-open'],{cwd:project,stdio:['ignore','pipe','pipe']});
const temp=[];const run=(cmd,args)=>new Promise((resolve,reject)=>{const p=spawn(cmd,args,{cwd:project,stdio:'inherit'});p.once('error',reject);p.once('exit',c=>c===0?resolve():reject(Error(`${cmd} exited ${c}`)));});
try{
 const url=await new Promise((resolve,reject)=>{let text='';const t=setTimeout(()=>reject(Error('Server start timeout')),15000);server.once('error',e=>{clearTimeout(t);reject(e);});server.once('exit',c=>{clearTimeout(t);reject(Error('Server exited '+c));});server.stdout.on('data',d=>{text+=d;const m=text.match(/http:\/\/127\.0\.0\.1:\d+/);if(m){clearTimeout(t);resolve(m[0]);}});server.stderr.on('data',d=>process.stderr.write(d));});
 console.log('Testing isolated production URL:',url);
 for(const name of ['browser-test.mjs','refresh-test.mjs']){
  const src=fs.readFileSync(path.join(project,'tools',name),'utf8').replaceAll('http://localhost:5196',url).replaceAll('http://127.0.0.1:5197',url);
  const file=path.join(project,'tools','.quanwang-'+name);fs.writeFileSync(file,src);temp.push(file);await run(process.execPath,[file]);
 }
 console.log('PASS: unit tests, production build, 15 gameplay checks, 8 visual/resizing checks.');
}finally{server.kill();for(const f of temp)fs.rmSync(f,{force:true});}
