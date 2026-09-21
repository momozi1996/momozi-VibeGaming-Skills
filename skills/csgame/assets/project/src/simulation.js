import {SPAWN,SITE,BOT_SPAWNS,moveCircle,segmentBlocked,findPath} from './map.js';
export const WEAPONS={rifle:{name:'AR-47',type:'ASSAULT RIFLE',mag:30,reserve:90,damage:34,rate:.105,reload:2.25,spread:.005,recoil:.015,price:1800},pistol:{name:'P-12',type:'SIDEARM',mag:12,reserve:48,damage:26,rate:.23,reload:1.5,spread:.003,recoil:.011,price:0},sniper:{name:'SR-08',type:'PRECISION RIFLE',mag:5,reserve:20,damage:105,rate:1.25,reload:2.8,spread:.001,recoil:.045,price:2400}};
export function createState(){return{phase:'menu',paused:false,round:0,ct:0,t:0,kills:0,deaths:0,money:2400,difficulty:'normal',primary:'rifle',slot:'rifle',events:[],rng:15324};}
export function random(s){s.rng=(Math.imul(1664525,s.rng)+1013904223)>>>0;return s.rng/4294967296;}
export function event(s,type,data={}){s.events.push({type,...data});}
export function startMatch(s){Object.assign(s,{ct:0,t:0,kills:0,deaths:0,money:2400,round:0,primary:'rifle',paused:false,events:[]});startRound(s);}
export function startRound(s){
 s.round++;s.phase='deploy';s.phaseTime=3;s.time=65;s.defuse=0;s.winner=null;s.reason='';s.slot=s.primary;
 s.player={x:SPAWN.x,z:SPAWN.z,y:0,vy:0,yaw:0,pitch:0,health:100,armor:50,moving:false,crouched:false,eye:1.7};
 s.ammo={};for(const [k,w] of Object.entries(WEAPONS))s.ammo[k]={mag:w.mag,reserve:w.reserve};
 s.reload=0;s.cooldown=0;s.recoil=0;s.stepTime=0;s.elapsed=0;
 s.bots=BOT_SPAWNS.map((b,i)=>({...b,id:i,y:0,hp:100,alive:true,yaw:0,fire:1.5+i*.4,path:[],repath:i*.3,alert:0,seen:false,walk:0,death:0}));event(s,'round');
}
export function endRound(s,won,reason){if(s.phase!=='active')return;s.phase='roundEnd';s.phaseTime=4;s.winner=won?'CT':'T';s.reason=reason;s.defuse=0;s.reload=0;if(won){s.ct++;s.money+=2000;}else{s.t++;s.money+=1400;}event(s,'roundEnd',{won,reason});}
export function switchWeapon(s,slot){if(!['active','deploy'].includes(s.phase)||s.paused)return;const wanted=slot===1?s.primary:'pistol';if(s.slot===wanted)return;s.slot=wanted;s.reload=0;s.cooldown=.3;event(s,'equip');}
export function reload(s){const a=s.ammo?.[s.slot],w=WEAPONS[s.slot];if(s.paused||!['active','deploy'].includes(s.phase)||s.reload>0||!a||a.mag===w.mag||a.reserve===0||s.defuse>0)return false;s.reload=w.reload;event(s,'reload');return true;}
export function buy(s,item){
 if(!['active','deploy'].includes(s.phase)||Math.hypot(s.player.x-SPAWN.x,s.player.z-SPAWN.z)>6)return{ok:false,message:'Armory available only at CT spawn.'};
 const cost=item==='armor'?650:WEAPONS[item]?.price;if(!cost)return{ok:false,message:'Unavailable equipment.'};if(s.money<cost)return{ok:false,message:'Not enough funds.'};
 if(item==='armor'){if(s.player.armor>=100)return{ok:false,message:'Armor is already full.'};s.player.armor=100;}else{if(!['rifle','sniper'].includes(item))return{ok:false,message:'Unavailable equipment.'};s.primary=item;s.slot=item;s.ammo[item]={mag:WEAPONS[item].mag,reserve:WEAPONS[item].reserve};s.reload=0;s.cooldown=.3;}
 s.money-=cost;event(s,'equip');return{ok:true,message:item==='armor'?'Kevlar equipped.':`${WEAPONS[item].name} equipped.`};
}
export function shoot(s,aim=false){
 if(s.phase!=='active'||s.paused||s.player.health<=0||s.reload>0||s.cooldown>0||s.defuse>0)return null;
 const a=s.ammo[s.slot],w=WEAPONS[s.slot];if(a.mag<=0){s.cooldown=.25;event(s,'empty');return null;}a.mag--;s.cooldown=w.rate;
 const spread=w.spread*(s.player.moving?3.8:1)*(s.player.crouched?.6:1)*(aim?.45:1)+(s.slot==='sniper'&&!aim?.035:0);
 const shot={x:s.player.x,y:s.player.y+s.player.eye,z:s.player.z,yaw:s.player.yaw+(random(s)-.5)*spread*2,pitch:s.player.pitch+(random(s)-.5)*spread*2,damage:w.damage};
 s.player.pitch=Math.min(1.4,s.player.pitch+w.recoil);s.player.yaw+=(random(s)-.5)*w.recoil*.3;s.recoil=Math.min(1,s.recoil+.22);event(s,'shot',{weapon:s.slot});return shot;
}
export function hitBot(s,id,damage,headshot=false){const b=s.bots.find(b=>b.id===id);if(s.phase!=='active'||!b?.alive)return;b.hp-=damage*(headshot?3:1);b.alert=5;b.seen=true;event(s,'hit',{id,headshot});if(b.hp<=0){b.alive=false;b.death=0;s.kills++;s.money+=300;event(s,'kill',{name:b.name,headshot});}}
export function hurtPlayer(s,damage){if(s.phase!=='active'||s.player.health<=0)return;const absorbed=Math.min(s.player.armor,damage*.55);s.player.armor=Math.max(0,s.player.armor-absorbed);s.player.health=Math.max(0,s.player.health-(damage-absorbed));event(s,'hurt');if(s.player.health<=0){s.deaths++;endRound(s,false,'You were eliminated.');}}
export function update(s,input,dt){
 if(s.paused||s.phase==='menu'||s.phase==='matchEnd')return;dt=Math.min(.05,Math.max(0,dt));s.elapsed+=dt;
 if(s.phase==='roundEnd'){for(const b of s.bots)if(!b.alive)b.death+=dt;s.phaseTime-=dt;if(s.phaseTime<=0){if(s.ct>=5||s.t>=5){s.phase='matchEnd';event(s,'matchEnd');}else startRound(s);}return;}
 if(s.phase==='deploy'){s.phaseTime-=dt;if(s.phaseTime<=0){s.phase='active';event(s,'go');}return;}
 s.time=Math.max(0,s.time-dt);s.cooldown=Math.max(0,s.cooldown-dt);s.recoil=Math.max(0,s.recoil-dt*2);
 if(s.reload>0){s.reload=Math.max(0,s.reload-dt);if(s.reload===0){const w=WEAPONS[s.slot],a=s.ammo[s.slot],n=Math.min(w.mag-a.mag,a.reserve);a.mag+=n;a.reserve-=n;event(s,'loaded');}}
 const p=s.player;p.crouched=!!input.crouch;p.eye+=( (p.crouched?1.13:1.7)-p.eye)*Math.min(1,dt*13);
 const near=Math.hypot(p.x-SITE.x,p.z-SITE.z)<SITE.radius&&p.y<.1;
 const defusing=!!input.defuse&&near&&!input.fire&&!input.forward&&!input.side&&!input.jump;
 let f=input.forward||0,r=input.side||0;const norm=Math.hypot(f,r);if(norm>1){f/=norm;r/=norm;}
 p.moving=norm>0&&!defusing;const speed=p.crouched?2.05:input.walk?2.65:5.6;
 if(!defusing)moveCircle(p,(-Math.sin(p.yaw)*f+Math.cos(p.yaw)*r)*speed*dt,(-Math.cos(p.yaw)*f-Math.sin(p.yaw)*r)*speed*dt,.35,p.crouched?1.15:1.75);
 if(input.jump&&p.y===0&&!p.crouched&&!defusing){p.vy=5.2;event(s,'jump');}p.vy-=15*dt;p.y=Math.max(0,p.y+p.vy*dt);if(p.y===0)p.vy=0;
 if(p.moving&&p.y===0){s.stepTime-=dt;if(s.stepTime<=0){s.stepTime=input.walk||p.crouched?.5:.34;event(s,'step',{quiet:input.walk||p.crouched});}}
 if(defusing){s.reload=0;s.defuse+=dt;if(s.defuse>=5&&s.time>0){endRound(s,true,'Bomb defused. Compound secured.');return;}}else s.defuse=0;
 if(s.time<=0){event(s,'explosion');endRound(s,false,'The bomb detonated.');return;}
 for(const b of s.bots){
  if(!b.alive){b.death+=dt;continue;}const dist=Math.hypot(p.x-b.x,p.z-b.z);const visible=dist<34&&!segmentBlocked({x:b.x,y:1.6,z:b.z},{x:p.x,y:p.y+p.eye,z:p.z});
  b.seen=visible;b.alert=Math.max(0,b.alert-dt);if(visible)b.alert=4;
  const tx=visible?p.x:(s.elapsed>13?p.x:SITE.x+(b.id-1)*5),tz=visible?p.z:(s.elapsed>13?p.z:SITE.z-3);
  b.yaw=Math.atan2(tx-b.x,tz-b.z);b.fire-=dt;b.repath-=dt;
  if(visible&&dist<28){
   if(b.fire<=0){const settings={easy:[1.45,.36,10],normal:[1.05,.48,13],hard:[.72,.67,17]}[s.difficulty]||[1.05,.48,13];b.fire=settings[0]+random(s)*.55;event(s,'botShot',{id:b.id});const chance=settings[1]*(dist>18?.65:1)*(p.moving?.8:1)*(p.crouched?.85:1);if(random(s)<chance)hurtPlayer(s,settings[2]);if(s.phase!=='active')return;}
   // Strafe around cover, never slide through collision geometry.
   if(dist>9){const sign=b.id%2?1:-1;moveCircle(b,Math.cos(b.yaw)*sign*.7*dt,-Math.sin(b.yaw)*sign*.7*dt,.4);b.walk+=dt*4;}
  }else{
   if(b.repath<=0){b.path=findPath(b,{x:tx,z:tz});b.repath=1.6+random(s);}
   if(b.path.length){const next=b.path[0],dx=next.x-b.x,dz=next.z-b.z,len=Math.hypot(dx,dz);if(len<.16)b.path.shift();else{const step=Math.min(len,2.3*dt);moveCircle(b,dx/len*step,dz/len*step,.4);b.yaw=Math.atan2(dx,dz);b.walk+=dt*7;}}
  }
 }
}
