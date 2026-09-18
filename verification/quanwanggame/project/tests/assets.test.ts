import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {animationFrame,type Atlas} from '../src/animation/Animator';
import {createFighter} from '../src/fighters/FighterFSM';
import {MOVES} from '../src/fighters/definitions';
for(const id of ['ava','ren'] as const){
 const atlas:Atlas=JSON.parse(readFileSync(`public/assets/fighters/${id}.json`,'utf8'));
 test(`${id}: native-resolution, tightly packed textures have no overlaps or lost margins`,()=>{
  assert.ok(atlas.sourceSize[1]>=238);assert.ok(atlas.scale<1.3);
  const png=readFileSync(`public/assets/fighters/${id}.png`),width=png.readUInt32BE(16),height=png.readUInt32BE(20);
  assert.ok(width<=4096&&height<=4096);
  const frames=Object.values(atlas.frames);
  for(let i=0;i<frames.length;i++){
   const {rect:[x,y,w,h],bounds:[bx,by,bw,bh]}=frames[i];
   assert.equal(w,bw);assert.equal(h,bh);assert.ok(x>=2&&y>=2&&x+w<=width-2&&y+h<=height-2);
   assert.ok(bx+atlas.sourceRoot[0]>=0&&by+atlas.sourceRoot[1]>=0);
   assert.ok(bx+atlas.sourceRoot[0]+w<=atlas.sourceSize[0]);
   assert.ok(by+atlas.sourceRoot[1]+h<=atlas.sourceSize[1]);
   for(let j=0;j<i;j++){const [a,b,c,d]=frames[j].rect;assert.ok(!(x<a+c&&x+w>a&&y<b+d&&y+h>b));}
  }
  for(const clip of Object.values(atlas.clips)){assert.ok(clip.length);for(const n of clip)assert.ok(atlas.frames[n]);}
 });
 test(`${id}: animation startup / contact / recovery use exact combat ages`,()=>{
  const f=createFighter(id,0);f.state='attack';
  for(const m of Object.values(MOVES[id])){
   f.move=m;const frames=atlas.clips[m.clip],timing=atlas.timings[m.clip]??[Math.floor(frames.length*.38),Math.floor(frames.length*.59)];
   f.age=0;assert.equal(animationFrame(f,atlas),frames[0]);
   f.age=m.startup;assert.equal(animationFrame(f,atlas),frames[timing[0]]);
   f.age=m.startup+m.active;assert.equal(animationFrame(f,atlas),frames[timing[1]]);
   for(let age=0;age<m.startup+m.active+m.recovery;age++){f.age=age;assert.ok(atlas.frames[animationFrame(f,atlas)]);}
  }
 });
 test(`${id}: idle ping-pong includes descending frames`,()=>{assert.ok(atlas.clips.idle.some((n,i,a)=>i>0&&n<a[i-1]));});
}
