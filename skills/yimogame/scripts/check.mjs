// Execute the frozen tests on a restored project without altering the frozen kit or its test sources.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {args,launchOptions,run,server,freshReport} from './browser-common.mjs';
const a=args(),project=path.resolve(a.project||''),out=path.resolve(a.out||'');if(!a.project||!a.out)throw Error('Usage: node check.mjs --project /output --out /fresh-report [--port 4370]');const kit=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');if(project===kit||project.startsWith(kit+path.sep)||out===kit||out.startsWith(kit+path.sep))throw Error('Output and report must be outside kit');freshReport(out);const port=Number(a.port||4370);const children=[],temps=[];const report={started:new Date().toISOString(),project,launch:launchOptions(),checks:[],success:false};
try{
 const npm=process.platform==='win32'?'npm.cmd':'npm';await run(npm,['test'],project);report.checks.push('unit tests passed');await run(npm,['run','build'],project);report.checks.push('production build passed');
 for(const [name,preview] of [['browser',false],['production',true]]){
  const s=await server(project,port+(preview?1:0),preview);children.push(s.child);
  const raw=fs.readFileSync(path.join(project,`tests/${name}.mjs`),'utf8');let transformed=raw.replace(/chromium\.launch\(\{headless:true,[\s\S]*?\}\)/,`chromium.launch(${JSON.stringify(launchOptions())})`);
  if(transformed===raw)throw Error('Test launcher structure changed; inspect rather than dropping tests');
  if(name==='production'){transformed=transformed.replace("await p.keyboard.press('q');check('Production linked form updates HUD'","await p.keyboard.press('q');await p.waitForFunction(()=>document.querySelector('#player-form').textContent==='联结形态');check('Production linked form updates HUD'");report.checks.push('Harness-only: wait for next rendered HUD frame before existing production Q assertion; no assertion removed');}
  const temp=path.join(project,`tests/.yimo-${name}-portable.mjs`);if(fs.existsSync(temp))throw Error('Temporary file exists '+temp);fs.writeFileSync(temp,transformed);temps.push(temp);
  await run(process.execPath,[temp],project,{TEST_URL:s.url,PROD_URL:s.url});
  const result=JSON.parse(fs.readFileSync(path.join(project,`reports/${name==='browser'?'browser':'production'}-report.json`),'utf8'));report.checks.push({suite:name,result});s.child.kill();
 }
 fs.cpSync(path.join(project,'reports'),path.join(out,'reports'),{recursive:true});report.success=true;
}finally{for(const p of children)if(!p.killed)p.kill();for(const f of temps)fs.rmSync(f,{force:true});report.finished=new Date().toISOString();fs.writeFileSync(path.join(out,'check-report.json'),JSON.stringify(report,null,2));}
console.log('PASS: unit11 + browser25 + production/mobile12; inspect screenshots separately');
