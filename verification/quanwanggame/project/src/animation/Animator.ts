import type {Fighter} from '../combat/types';
export interface Atlas {scale:number;sourceSize:number[];sourceRoot:number[];timings:Record<string,[number,number]>;clips:Record<string,number[]>;frames:Record<string,{bounds:number[];rect:number[];sourceFrame:number}>}
export function animationFrame(f:Fighter,atlas:Atlas){
 let clip=f.state as string,index=0;
 if(f.state==='attack'&&f.move){const m=f.move;clip=m.clip;const frames=atlas.clips[clip];
  const [peak,end]=atlas.timings[clip]??[Math.floor(frames.length*.38),Math.floor(frames.length*.59)];
  if(f.age<m.startup)index=Math.floor(f.age/Math.max(1,m.startup)*peak);
  else if(f.age<m.startup+m.active)index=peak+Math.floor((f.age-m.startup)/m.active*(end-peak));
  else index=end+Math.floor((f.age-m.startup-m.active)/m.recovery*(frames.length-end));
 }else{
  if(f.state==='jump')clip=f.vy>=0?'jump':'fall';
  if(f.state==='hit')clip='hurt';if(f.state==='block')clip='guard';
  const frames=atlas.clips[clip]??atlas.clips.idle;
  if(clip==='jump'||clip==='fall')index=Math.min(frames.length-1,Math.max(0,Math.floor((clip==='jump'?1-f.vy/12.5:-f.vy/12.5)*frames.length)));
  else if(['down','hurt','guard','crouch'].includes(clip))index=Math.min(frames.length-1,Math.floor(f.age/2));
  else index=Math.floor(f.age/(clip==='walk'?1.8:5))%frames.length;
 }
 const frames=atlas.clips[clip]??atlas.clips.idle;
 return frames[Math.min(frames.length-1,index)];
}
