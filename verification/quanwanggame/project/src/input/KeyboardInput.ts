import {neutralInput, type Action, type InputFrame} from '../combat/types';
const MAPS=[{left:'KeyA',right:'KeyD',up:'KeyW',down:'KeyS',actions:{KeyJ:'lp',KeyK:'lk',KeyL:'hp',KeyI:'hk',KeyU:'special'}},
 {left:'ArrowLeft',right:'ArrowRight',up:'ArrowUp',down:'ArrowDown',actions:{Numpad1:'lp',Numpad2:'lk',Numpad4:'hp',Numpad5:'hk',Numpad0:'special'}}] as const;
export class KeyboardInput {
 private held=new Set<string>();private edges=new Set<string>();
 private virtual=[neutralInput(),neutralInput()];
 constructor(){
  window.addEventListener('keydown',e=>{if(e.target instanceof HTMLSelectElement||e.target instanceof HTMLInputElement)return;
   if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Tab'].includes(e.code))e.preventDefault();
   if(!this.held.has(e.code))this.edges.add(e.code);this.held.add(e.code);
  });
  window.addEventListener('keyup',e=>this.held.delete(e.code));window.addEventListener('blur',()=>this.clear());
 }
 sample(player:number):InputFrame {
  const m=MAPS[player],v=this.virtual[player]; const buttons:Action[]=[];
  for(const [code,action] of Object.entries(m.actions))if(this.edges.has(code))buttons.push(action);
  return {x:(Number(this.held.has(m.right))-Number(this.held.has(m.left)))||v.x,y:Number(this.held.has(m.down))||v.y,jump:this.edges.has(m.up)||v.jump,buttons:[...buttons,...v.buttons]};
 }
 finishFrame(){this.edges.clear();for(const v of this.virtual){v.jump=false;v.buttons=[];}}
 clear(){this.held.clear();this.edges.clear();this.virtual=[neutralInput(),neutralInput()];}
 setTouch(name:string,down:boolean){const v=this.virtual[0];if(name==='left')v.x=down?-1:(v.x<0?0:v.x);else if(name==='right')v.x=down?1:(v.x>0?0:v.x);else if(name==='down')v.y=down?1:0;else if(name==='jump')v.jump=down;else if(down)v.buttons.push(name as Action);}
}
