/** Runs unchanged baseline assertions against only the candidate HTML in isolation. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';
import {args,required,fresh,skill,sha,chrome,projectRequire} from './runtime.mjs';
const a=args(),project=required(a,'project'),html=path.join(project,'cloudline.html');if(!fs.existsSync(html))throw Error('Build candidate cloudline.html first');
const report=fresh(required(a,'out')),isolated=path.join(report,'isolated-project');fs.mkdirSync(path.join(isolated,'tests'),{recursive:true});fs.mkdirSync(path.join(isolated,'screenshots'));
fs.copyFileSync(html,path.join(isolated,'cloudline.html'));
const require=projectRequire(project),pw=pathToFileURL(path.join(path.dirname(require.resolve('playwright-core')),'index.mjs')).href;
const summary={project,inputSha256:sha(html),started:new Date().toISOString(),chrome:chrome(),assertionsModified:false,adaptations:['absolute Playwright import','portable file URL','Metal only on macOS'],suites:[]};
let failed=false;
for(const suite of['gameplay','edges']){
 const original=path.join(skill,'assets/reference-project/tests',suite+'.mjs');let source=fs.readFileSync(original,'utf8');
 source=source.replace('from "playwright-core"',`from ${JSON.stringify(pw)}`);
 source=source.replace('import { fileURLToPath } from "node:url";','import { fileURLToPath, pathToFileURL } from "node:url";');
 source=source.replace('"file://" + path.resolve("cloudline.html")','pathToFileURL(path.resolve("cloudline.html")).href');
 source=source.replaceAll('"--use-angle=metal",','...(process.platform === "darwin" ? ["--use-angle=metal"] : []),');
 const script=path.join(isolated,'tests',suite+'.mjs');fs.writeFileSync(script,source);
 const result=spawnSync(process.execPath,[script],{cwd:isolated,encoding:'utf8',env:{...process.env,CHROME_PATH:summary.chrome},timeout:240000,maxBuffer:10*1024*1024});
 fs.writeFileSync(path.join(report,suite+'.log'),(result.stdout||'')+'\n'+(result.stderr||'')+(result.error?'\n'+result.error.stack:''));
 process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
 const file=path.join(isolated,'tests',suite==='gameplay'?'report.json':'edge-report.json');let details=null;if(fs.existsSync(file)){details=JSON.parse(fs.readFileSync(file));fs.copyFileSync(file,path.join(report,path.basename(file)));}
 const ok=result.status===0&&details?.results?.length===(suite==='gameplay'?17:7)&&details.results.every(t=>t.pass);
 summary.suites.push({name:suite,ok:!!ok,exitCode:result.status,signal:result.signal,passed:details?.results?.filter(t=>t.pass).length||0,total:details?.results?.length||0,sourceTestSha256:sha(original)});if(!ok)failed=true;
}
summary.finished=new Date().toISOString();summary.ok=!failed;fs.writeFileSync(path.join(report,'summary.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));if(failed)process.exitCode=1;
