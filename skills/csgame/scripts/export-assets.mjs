#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {args,projectPath,freshDir,deps,chromePath,browserArgs,startServer} from './common.mjs';
const a=args();if(a.help){console.log('node export-assets.mjs --project RESTORED_PROJECT --out NEW_DIR [--chrome EXECUTABLE]\nExports current procedural world, weapons and soldier to static GLB; canvas textures to PNG; map data to SVG. No animations or audio recordings are invented.');process.exit(0);}
let server,browser,out;
try{
 const project=projectPath(a.project);out=await freshDir(a.out);const {chromium}=deps(project);
 server=await startServer(project,'development',path.join(out,'server.log'));
 browser=await chromium.launch({executablePath:chromePath(chromium,a.chrome),headless:true,args:browserArgs()});
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(server.url);await page.waitForSelector('#loading',{state:'hidden'});
 const exported=await page.evaluate(async()=>{
  const {buildWorld}=await import('/src/world.js?asset-export=1');
  const {makeWeapon,makeBot}=await import('/src/models.js?asset-export=1');
  const map=await import('/src/map.js');
  const {GLTFExporter}=await import('/node_modules/three/examples/jsm/exporters/GLTFExporter.js');
  const soldier=makeBot();const world=new soldier.constructor();world.name='Counterline procedural world';buildWorld(world);
  const groups=[['world',world],['weapon-rifle',makeWeapon('rifle')],['weapon-pistol',makeWeapon('pistol')],['weapon-sniper',makeWeapon('sniper')],['soldier',soldier]];
  const textures=[],seen=new Map();
  for(const [name,root] of groups)root.traverse(o=>{for(const material of (Array.isArray(o.material)?o.material:o.material?[o.material]:[]))for(const slot of ['map','bumpMap']){const t=material[slot];if(t?.image?.toDataURL){if(seen.has(t)){textures[seen.get(t)].uses.push({group:name,slot,materialType:material.type});continue;}const id=textures.length;seen.set(t,id);textures.push({file:`textures/texture-${String(id).padStart(3,'0')}.png`,width:t.image.width,height:t.image.height,repeat:[t.repeat.x,t.repeat.y],colorSpace:t.colorSpace,uses:[{group:name,slot,materialType:material.type}],png:t.image.toDataURL('image/png').split(',')[1]});}}});
  const exporter=new GLTFExporter(),models=[];
  function base64(buffer){const bytes=new Uint8Array(buffer);let text='';for(let i=0;i<bytes.length;i+=8192)text+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(text);}
  for(const [name,root] of groups){let meshes=0,vertices=0;const refs=[];root.traverse(o=>{refs.push([o,o.userData]);o.userData={};if(o.isMesh){meshes++;vertices+=o.geometry.attributes.position?.count||0;}});
   let glb;try{glb=await exporter.parseAsync(root,{binary:true,onlyVisible:true,animations:[]});}finally{for(const [o,u] of refs)o.userData=u;}
   models.push({file:`${name}.glb`,meshes,vertices,animationClips:0,bytes:glb.byteLength,data:base64(glb)});
  }
  return{models,textures,map:{bounds:map.BOUNDS,spawn:map.SPAWN,site:map.SITE,blocks:map.BLOCKS,botSpawns:map.BOT_SPAWNS}};
 });
 if(errors.length)throw Error(errors.join('\n'));await fs.mkdir(path.join(out,'textures'));
 for(const m of exported.models){await fs.writeFile(path.join(out,m.file),Buffer.from(m.data,'base64'));delete m.data;}
 for(const t of exported.textures){await fs.writeFile(path.join(out,t.file),Buffer.from(t.png,'base64'));delete t.png;}
 const map=exported.map,s=10,x=v=>300+v*s,z=v=>285+v*s;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="620" viewBox="0 0 600 620"><rect width="600" height="620" fill="#11232d"/><g font-family="Arial" font-size="12"><text x="20" y="24" fill="#efb36b">COUNTERLINE / AL SAFRA · XZ plan · north = -Z</text>`;
 for(const b of map.blocks){if(b.y)continue;svg+=`<rect x="${x(b.x-b.w/2)}" y="${z(b.z-b.d/2)}" width="${b.w*s}" height="${b.d*s}" fill="${['crate','stack','sandbag','barrel'].includes(b.kind)?'#857757':'#57717a'}" stroke="#a7b7b4" stroke-width="1"/>`;}
 svg+=`<circle cx="${x(map.site.x)}" cy="${z(map.site.z)}" r="${map.site.radius*s}" fill="#efb36b33" stroke="#efb36b"/><text x="${x(map.site.x)-4}" y="${z(map.site.z)+4}" fill="#efb36b">A</text><circle cx="${x(map.spawn.x)}" cy="${z(map.spawn.z)}" r="5" fill="#aee3f3"/><text x="${x(map.spawn.x)+9}" y="${z(map.spawn.z)+4}" fill="#aee3f3">CT SPAWN (0,24)</text>`;
 for(const b of map.botSpawns)svg+=`<circle cx="${x(b.x)}" cy="${z(b.z)}" r="4" fill="#f18f66"/><text x="${x(b.x)+7}" y="${z(b.z)+4}" fill="#f18f66">${b.name}</text>`;
 svg+='</g></svg>';await fs.writeFile(path.join(out,'map-topdown.svg'),svg);
 const index={createdAt:new Date().toISOString(),sourceProject:project,browser:await browser.version(),models:exported.models,textures:exported.textures,notes:['Original source remains authoritative.','GLBs are static exports. No skeletal animations or AnimationClips exist in this project.','world.glb excludes main.js sky/fog/distant ridges/render lights. Dynamic renderer settings are documented separately.','Original audio is WebAudio synthesis in audio.js, not WAV samples.','Texture slots may share a PNG and repeat values are recorded.'],errors};
 await fs.writeFile(path.join(out,'asset-index.json'),JSON.stringify(index,null,2)+'\n');console.log(`Exported ${index.models.length} GLBs and ${index.textures.length} PNG textures to ${out}`);
}catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();if(server)await server.stop();}
