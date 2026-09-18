import {neutralInput,type Fighter,type InputFrame,type Action} from '../combat/types';
// Seeded AI; decisions use last observed positions, never the opponent's unsubmitted input.
export class CPU {
 private seed=82917;private cooldown=0;private decision=neutralInput();
 private rand(){this.seed=(Math.imul(this.seed,1664525)+1013904223)|0;return (this.seed>>>0)/4294967296;}
 sample(self:Fighter,enemy:Fighter):InputFrame{
  const out={...this.decision,jump:false,buttons:[] as Action[]};
  if(this.cooldown-->0)return out;
  this.cooldown=9+Math.floor(this.rand()*14);
  const d=Math.abs(enemy.x-self.x),toward=enemy.x>self.x?1:-1,r=this.rand();
  this.decision=neutralInput();
  if(self.state==='hit'||self.state==='down')return neutralInput();
  if(enemy.state==='attack'&&d<190&&r<.6){this.decision.x=-toward;this.decision.y=enemy.move?.level==='low'?1:0;}
  else if(d>170){this.decision.x=toward;if(r<.1)this.decision.jump=true;if(r>.75&&d<460)this.decision.buttons=['special'];}
  else if(r<.65){this.decision.buttons=[(['lp','lk','hp','hk','special'] as Action[])[Math.floor(this.rand()*5)]];}
  else if(r<.8){this.decision.x=-toward;}else if(r<.91){this.decision.x=toward;this.decision.jump=true;}else this.decision.y=1;
  return {...this.decision,buttons:[...this.decision.buttons]};
 }
}
