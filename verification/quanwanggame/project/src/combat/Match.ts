import {type CharacterId,type Mode,type MatchSnapshot,type InputFrame,type Fighter,type Move,type CombatEvent,neutralInput} from './types';
import {createFighter,tickFighter,transition} from '../fighters/FighterFSM';
import {CommandBuffer} from '../input/CommandBuffer';
import {attackBox,hurtBoxes,overlaps,separate,GROUND} from '../collision/boxes';
import {MOVES} from '../fighters/definitions';
export class Match {
 state:MatchSnapshot;private commandFrame=0;commands=[new CommandBuffer(),new CommandBuffer()];
 constructor(p1:CharacterId='ava',p2:CharacterId='ren',mode:Mode='cpu'){
  this.state={fighters:[createFighter(p1,0),createFighter(p2,1)],frame:0,clock:60*60,phase:'intro',phaseAge:0,wins:[0,0],round:1,hitstop:0,projectiles:[],winner:null,mode,events:[]};
 }
 step(inputs:InputFrame[]=[neutralInput(),neutralInput()]){
  const s=this.state;s.events=[];s.frame++;if(s.hitstop===0)this.commandFrame++;
  s.fighters.forEach((f,i)=>{f.input=inputs[i];this.commands[i].update(inputs[i],f.facing,this.commandFrame);});
  if(s.hitstop>0){s.hitstop--;return;}
  if(s.phase==='result')return;
  if(s.phase==='intro'){
   if(s.phaseAge===0)s.events.push({type:'round',text:String(s.round)});
   if(s.phaseAge===105)s.events.push({type:'fight'});
   if(++s.phaseAge>=150){s.phase='fight';s.phaseAge=0;this.commands.forEach(c=>c.reset());}
   s.fighters.forEach(f=>f.age++);return;
  }
  if(s.phase==='ending'){
   for(const f of s.fighters)tickFighter(f,s.fighters[1-f.player],new CommandBuffer(),false);
   if(++s.phaseAge>=165){
    if(s.wins.some(w=>w>=2)){s.phase='result';s.events.push({type:'result',player:s.winner??0});}
    else this.nextRound();
   }return;
  }
  s.phaseAge++;
  if(s.mode!=='training')s.clock--;
  s.fighters.forEach((f,i)=>{
   const before=f.serial;const lastY=f.y;
   tickFighter(f,s.fighters[1-i],this.commands[i]);
   if(f.serial!==before)s.events.push({type:f.move?.id==='special'?'special':'whiff',x:f.x,y:GROUND-f.y-100,player:i,power:f.move?.damage});
   if(lastY>0&&f.y===0)s.events.push({type:'land',x:f.x,y:GROUND});
   if(f.move?.projectile&&f.age===f.move.startup)s.projectiles.push({owner:i,x:f.x+f.facing*65,y:GROUND-f.y-100,vx:f.facing*8,age:0,serial:f.serial,hit:false});
   if(s.frame-f.lastHit>100){f.combo=0;f.comboDamage=0;}
  });
  separate(s.fighters[0],s.fighters[1]);
  // Gather before applying: both attacks on this logical frame can trade fairly.
  const contacts:{attacker:Fighter;target:Fighter;move:Move;x:number;y:number;projectile?:number}[]=[];
  for(const a of s.fighters){const target=s.fighters[1-a.player],box=attackBox(a);
   if(box&&!a.connected&&hurtBoxes(target).some(h=>overlaps(box,h)))contacts.push({attacker:a,target,move:a.move!,x:(a.x+target.x)/2,y:Math.max(box.y,GROUND-target.y-140)+20});
  }
  s.projectiles.forEach((p,index)=>{
   p.x+=p.vx;p.age++;const target=s.fighters[1-p.owner];
   if(!p.hit&&hurtBoxes(target).some(h=>overlaps({x:p.x-28,y:p.y-26,w:56,h:52},h))){p.hit=true;contacts.push({attacker:s.fighters[p.owner],target,move:MOVES.ren.special,x:p.x,y:p.y,projectile:index});}
  });
  // Guard decisions are captured before damage changes either state.
  const resolutions=contacts.map(c=>({...c,guard:this.canGuard(c.target,c.attacker,c.move)}));
  for(const c of resolutions)this.resolve(c.attacker,c.target,c.move,c.guard,c.x,c.y,c.projectile!==undefined);
  s.projectiles=s.projectiles.filter(p=>!p.hit&&p.age<130&&p.x>-80&&p.x<1040);
  const dead=s.fighters.filter(f=>f.health<=0);
  if(dead.length||s.clock<=0){
   if(s.mode==='training'){s.fighters.forEach(f=>{f.health=1000;f.meter=0;});}
   else {
    const [a,b]=s.fighters;s.winner=a.health===b.health?null:a.health>b.health?0:1;
    if(s.winner!==null)s.wins[s.winner]++;
    s.phase='ending';s.phaseAge=0;s.projectiles=[];
    s.fighters.forEach(f=>{const lost=f.health<=0||(s.winner!==null&&f.player!==s.winner);transition(f,lost?'down':'win');f.age=0;f.vx=lost?-f.facing*4:0;});
    s.events.push({type:'ko',text:dead.length?'K.O.':'TIME UP',player:s.winner??undefined});
   }
  }
 }
 private canGuard(t:Fighter,a:Fighter,m:Move){
  if(t.y>0||!['idle','walk','crouch','block'].includes(t.state))return false;
  const back=a.x>t.x?-1:1;
  return t.input.x===back&&(m.level!=='low'||t.input.y>0)&&(m.level!=='high'||t.input.y===0);
 }
 private resolve(a:Fighter,t:Fighter,m:Move,guard:boolean,x:number,y:number,projectile:boolean){
  const s=this.state;if(!projectile)a.connected=true;
  const direction=t.x>=a.x?1:-1;
  s.hitstop=Math.max(s.hitstop,guard?Math.max(3,m.stop-2):m.stop);
  if(guard){
   transition(t,'block');t.age=0;t.stun=m.blockstun;t.vx=direction*m.knockback*.55;
   if(m.id==='special')t.health=Math.max(1,t.health-9);
   s.events.push({type:'block',x,y,power:m.damage,player:a.player});
  }else{
   const continuing=t.state==='hit'||t.state==='down';a.combo=continuing?a.combo+1:1;if(!continuing)a.comboDamage=0;
   const damage=Math.round(m.damage*Math.max(.5,1-(a.combo-1)*.1));a.comboDamage+=damage;a.lastHit=s.frame;
   t.health=Math.max(0,t.health-damage);transition(t,'hit');t.age=0;t.stun=m.stun;t.vx=direction*m.knockback;
   if(m.launch){t.vy=5;t.y=Math.max(1,t.y);}
   a.meter=Math.min(100,a.meter+damage*.16);t.meter=Math.min(100,t.meter+damage*.07);
   s.events.push({type:'hit',x,y,power:m.damage,player:a.player});
  }
 }
 private nextRound(){const s=this.state;s.round++;s.clock=3600;s.phase='intro';s.phaseAge=0;s.hitstop=0;s.projectiles=[];s.fighters=s.fighters.map(f=>createFighter(f.character,f.player));this.commands.forEach(c=>c.reset());}
 resetTraining(){if(this.state.mode==='training'){this.state.fighters=this.state.fighters.map(f=>createFighter(f.character,f.player));this.state.projectiles=[];this.state.hitstop=0;this.commands.forEach(c=>c.reset());}}
}
