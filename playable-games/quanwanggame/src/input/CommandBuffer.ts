import type { Action, InputFrame } from '../combat/types';
export class CommandBuffer {
 private history: {direction:number;frame:number}[]=[];
 private queue: {action:Action;frame:number}[]=[];
 reset(){this.history=[];this.queue=[];}
 update(input:InputFrame,facing:number,frame:number){
  const x=input.x*facing; const direction=input.y>0?(x>0?3:x<0?1:2):(x>0?6:x<0?4:5);
  if(this.history.at(-1)?.direction!==direction)this.history.push({direction,frame});
  this.history=this.history.filter(h=>frame-h.frame<=24);
  for(const action of input.buttons){
   const motion=(action==='lp'||action==='hp')&&this.quarterCircle(frame);
   this.queue.push({action:motion?'special':action,frame});
   if(motion)this.history=[];
  }
  this.queue=this.queue.filter(h=>frame-h.frame<=6);
 }
 private quarterCircle(frame:number){
  let goal=2;
  const seq=[2,3,6];
  for(let i=this.history.length-1;i>=0;i--){
   const h=this.history[i];if(frame-h.frame>20)break;
   if(h.direction===seq[goal])goal--;
   if(goal<0)return true;
  }
  return false;
 }
 peek():Action|undefined {return this.queue.find(h=>h.action==='special')?.action??this.queue[0]?.action;}
 consume(){const action=this.peek();this.queue=[];return action;}
 get directions(){return this.history.map(h=>h.direction);}
}
