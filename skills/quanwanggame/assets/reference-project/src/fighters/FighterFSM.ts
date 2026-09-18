import type {Fighter, CharacterId, State} from '../combat/types';
import {neutralInput} from '../combat/types';
import {CHARACTERS,MOVES} from './definitions';
import type {CommandBuffer} from '../input/CommandBuffer';
export function createFighter(character:CharacterId,player:number):Fighter {return {character,player,x:player===0?290:670,y:0,vx:0,vy:0,facing:player===0?1:-1,state:'idle',age:0,health:1000,meter:0,stun:0,move:null,serial:0,connected:false,invulnerable:0,combo:0,comboDamage:0,lastHit:-200,input:neutralInput()};}
export function transition(f:Fighter,state:State){if(f.state!==state){f.state=state;f.age=0;}if(state!=='attack')f.move=null;}
export function tickFighter(f:Fighter,other:Fighter,commands:CommandBuffer,canRecover=true){
 f.age++; // Advance at the beginning: rendered age is exactly the age used for collision.
 const input=f.input;const airborne=f.y>0||f.vy>0;
 if(f.invulnerable>0)f.invulnerable--;
 if(f.state==='hit'||f.state==='block'){
  f.stun--;f.x+=f.vx;f.vx*=.85;
  if(f.stun<=0){transition(f,airborne?'jump':'idle');}
 }else if(f.state==='down'){
  f.x+=f.vx;f.vx*=.87;
  if(canRecover&&f.age>=65&&f.health>0){transition(f,'idle');f.invulnerable=12;}
 }else if(f.state!=='win'){
  const m=f.move;
  const cancel=m&&f.connected&&m.cancel&&f.age>=m.cancel[0]&&f.age<=m.cancel[1]&&commands.peek()==='special';
  if(m&&f.age>=m.startup+m.active+m.recovery)transition(f,airborne?'jump':'idle');
  const actionable=f.state!=='attack';
  if(actionable||cancel){
   if(!airborne)f.facing=other.x>=f.x?1:-1;
   const action=commands.peek();
   if(action&&(!airborne||action!=='special')){
    commands.consume();const id=airborne?'air':input.y>0&&action!=='special'?'low':action;
    f.move=MOVES[f.character][id];f.state='attack';f.age=0;f.serial++;f.connected=false;
   }else if(actionable){
    if(!airborne&&input.jump){f.vy=CHARACTERS[f.character].jump;f.vx=input.x*3.7;transition(f,'jump');}
    else if(!airborne){
     if(input.y>0){transition(f,'crouch');f.vx=0;}
     else if(input.x){transition(f,'walk');f.vx=input.x*CHARACTERS[f.character].speed*(input.x===f.facing?1:.72);f.x+=f.vx;}
     else {transition(f,'idle');f.vx=0;}
    }
   }
  }
  if(f.state==='attack'&&f.move?.velocity&&f.age>=f.move.startup&&f.age<f.move.startup+f.move.active)f.x+=f.facing*f.move.velocity;
 }
 if(f.y>0||f.vy>0){
  f.y+=f.vy;f.vy-=.66;
  if(f.state!=='hit'&&f.state!=='down')f.x+=f.vx;
  if(f.y<=0){f.y=0;f.vy=0;f.vx=0;if(f.state==='jump'||(f.state==='attack'&&f.move?.id==='air'))transition(f,'idle');}
 }
 f.x=Math.max(65,Math.min(895,f.x));
}
