#!/usr/bin/env node
// All tarballs are matched to the original lockfile SRI before populating a project-local npm cache.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {spawnSync} from 'node:child_process';
const skill=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const project=process.argv[2]&&fs.existsSync(process.argv[2])?fs.realpathSync(process.argv[2]):path.resolve(process.argv[2]??'');
if(!process.argv[2]||!fs.existsSync(path.join(project,'package-lock.json')))throw Error('Usage: node install-offline.mjs /absolute/path/to/new-project');
if(project===skill||project.startsWith(skill+path.sep)||skill.startsWith(project+path.sep))throw Error('Install only into a working copy, not the reference skill.');
const npm=process.platform==='win32'?'npm.cmd':'npm';const folder=path.join(skill,'assets/npm-tarballs');const entries=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json')));const lock=JSON.parse(fs.readFileSync(path.join(project,'package-lock.json')));
const needed=Object.values(lock.packages).filter(p=>p.resolved);for(const p of needed){if(!entries.some(e=>e.url===p.resolved&&e.integrity===p.integrity))throw Error('Lockfile not covered by bundled tarballs: '+p.resolved);}
for(const e of entries){const bytes=fs.readFileSync(path.join(folder,e.file));const [algo,sri]=e.integrity.split('-');if(createHash(algo).update(bytes).digest('base64')!==sri||createHash('sha256').update(bytes).digest('hex')!==e.sha256)throw Error('Corrupt tarball: '+e.file);}
const cache=path.join(project,'.quanwang-npm-cache');const run=args=>{const r=spawnSync(npm,args,{cwd:project,stdio:'inherit',shell:process.platform==='win32',env:{...process.env,PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD:'1'}});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);};
run(['cache','add',...entries.map(e=>path.join(folder,e.file)),'--cache',cache,'--offline','--ignore-scripts']);
run(['ci','--offline','--cache',cache,'--no-audit','--no-fund']);
console.log('Offline dependency install complete. Node/npm and a Chrome executable are system prerequisites, not included.');
