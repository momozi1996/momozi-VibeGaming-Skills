import type {Fighter,Box} from '../combat/types';
export const GROUND=455;
export function worldBox(f:Fighter,b:Box):Box{return {x:f.x+(f.facing===1?b.x:-b.x-b.w),y:GROUND-f.y+b.y,w:b.w,h:b.h};}
export function overlaps(a:Box,b:Box){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
export function active(f:Fighter){return f.state==='attack'&&f.move!==null&&f.age>=f.move.startup&&f.age<f.move.startup+f.move.active;}
export function attackBox(f:Fighter):Box|null{return active(f)&&!f.move!.projectile?worldBox(f,f.move!.box):null;}
export function hurtBoxes(f:Fighter):Box[]{
 if(f.state==='down'||f.state==='win'||f.invulnerable>0)return [];
 const crouch=f.state==='crouch'||(f.state==='attack'&&f.move?.id==='low')||(f.state==='block'&&f.input.y>0);
 const boxes=crouch?[{x:-28,y:-100,w:56,h:54},{x:-32,y:-46,w:64,h:46}]:[{x:-22,y:-182,w:44,h:47},{x:-27,y:-137,w:54,h:74},{x:-31,y:-63,w:62,h:63}];
 // The attacker's limb remains vulnerable during startup/active/recovery; no giant full-sprite box.
 if(f.state==='attack'&&f.move&&f.age>=Math.max(0,f.move.startup-2)&&f.age<f.move.startup+f.move.active+4){const b=f.move.box;boxes.push({x:20,y:b.y+8,w:b.w*.65,h:Math.max(18,b.h*.65)});}
 return boxes.map(b=>worldBox(f,b));
}
export function pushBox(f:Fighter){return worldBox(f,{x:-27,y:-135,w:54,h:135});}
export function separate(a:Fighter,b:Fighter){
 const aa=pushBox(a),bb=pushBox(b);if(!overlaps(aa,bb))return;
 const left=a.x<=b.x?a:b,right=left===a?b:a;const penetration=54-(right.x-left.x);
 if(penetration>0){left.x-=penetration/2;right.x+=penetration/2;
  if(left.x<65){right.x+=65-left.x;left.x=65;}if(right.x>895){left.x-=right.x-895;right.x=895;}}
}
