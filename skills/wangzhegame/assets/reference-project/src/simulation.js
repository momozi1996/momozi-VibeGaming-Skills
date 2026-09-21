import {BASES,SPAWNS,LANES,CHAMPIONS,ITEMS,distance,clamp,pathPoint,segmentDistance,moveToward,navigable,WALLS} from './config.js';
export const mitigated=(raw,resist)=>raw*(resist>=0?100/(100+resist):2-100/(100-resist));
export const growth=(level)=>.7025*(level-1)+.0175*(level-1)**2;
export function route(from,to){
 if(!navigable(to))return [];
 if(!WALLS.some(w=>segmentDistance(w,from,to)<w.r+110))return [to];
 const size=50,cell=300,key=(x,z)=>z*size+x,point=(k)=>({x:(k%size+.5)*cell,z:(Math.floor(k/size)+.5)*cell});
 const start=key(clamp(Math.floor(from.x/cell),1,48),clamp(Math.floor(from.z/cell),1,48)),goal=key(clamp(Math.floor(to.x/cell),1,48),clamp(Math.floor(to.z/cell),1,48));
 let open=[start],came=new Map(),g=new Map([[start,0]]),f=new Map([[start,distance(from,to)]]),closed=new Set();
 while(open.length){open.sort((a,b)=>f.get(a)-f.get(b));let k=open.shift();if(k===goal){let out=[to];while(k!==start){out.unshift(point(k));k=came.get(k)}return out}closed.add(k);let x=k%size,z=Math.floor(k/size);for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){if(!dx&&!dz)continue;let nx=x+dx,nz=z+dz,n=key(nx,nz);if(nx<1||nx>48||nz<1||nz>48||closed.has(n)||!navigable(point(n),110))continue;if(dx&&dz&&(!navigable(point(key(x+dx,z)),110)||!navigable(point(key(x,z+dz)),110)))continue;let ng=g.get(k)+Math.hypot(dx,dz)*cell;if(ng<(g.get(n)??Infinity)){came.set(n,k);g.set(n,ng);f.set(n,ng+distance(point(n),to));if(!open.includes(n))open.push(n)}}}
 return [];
}
export class Match{
 constructor(data,champion='Garen',mode='standard'){
  this.data=data;this.mode=mode;this.time=0;this.status='playing';this.paused=false;this.entities=[];this.projectiles=[];this.zones=[];this.events=[];this.feed=[];this.nextId=1;this.kills=[0,0];this.towerKills=[0,0];this.nextWave=mode==='practice'?5:65;this.wave=0;this.winner=null;this.announced=false;
  for(let team=0;team<2;team++){
   for(let lane=0;lane<3;lane++){
    [.16,.255,.365].forEach((t,i)=>{let p=pathPoint(LANES[lane],team?1-t:t);this.add({kind:'tower',team,lane,tier:i,...p,hp:3500,maxHp:3500,ad:152,armor:40,mr:40,range:775,radius:90,attackSpeed:.833,atk:0})});
    this.add({kind:'inhibitor',team,lane,...pathPoint(LANES[lane],team?.90:.10),hp:4000,maxHp:4000,armor:20,mr:20,radius:110});
   }
   for(let i=0;i<2;i++)this.add({kind:'tower',team,lane:-1,tier:-1,x:BASES[team].x+(team?-1:1)*(i?740:200),z:BASES[team].z+(team?1:-1)*(i?200:740),hp:3000,maxHp:3000,ad:165,armor:50,mr:50,range:775,radius:90,attackSpeed:.833,atk:0});
   this.add({kind:'nexus',team,...BASES[team],hp:5500,maxHp:5500,armor:20,mr:20,radius:180});
   for(let i=0;i<5;i++){
    let id=team===0&&i===0?champion:CHAMPIONS[(i+(team?2:0))%5].id;
    if(team===0&&i>0)id=CHAMPIONS.filter(c=>c.id!==champion)[i-1].id;
    let a=this.hero(id,team,team===0&&i===0);a.lane=[1,0,2,1,2][i];a.x+=(i%3)*225*(team?-1:1);a.z+=Math.floor(i/3)*260*(team?1:-1);
   }
  }
  [[4200,9300,'blue'],[5800,11400,'red'],[5600,5700,'wolf'],[10800,5700,'blue'],[9200,3600,'red'],[9400,9400,'wolf'],[10500,10300,'dragon'],[4500,4700,'baron']].forEach(([x,z,type])=>{let boss=['dragon','baron'].includes(type);this.add({kind:'monster',team:2,monster:type,x,z,home:{x,z},hp:boss?5500:1400,maxHp:boss?5500:1400,ad:boss?95:45,range:200,speed:220,radius:boss?160:90,armor:20,mr:20,attackSpeed:.65,atk:0})});
  this.player=this.entities.find(e=>e.player);this.note('欢迎来到峡谷演武',mode==='practice'?'训练：6 级 · 1500 金币 · 5 秒出兵':'标准节奏：01:05 出兵 · 每 30 秒一波');
 }
 add(o){let a={id:this.nextId++,alive:true,shield:0,stun:0,slow:0,buffs:{},cd:[0,0,0,0],target:null,move:null,route:[],lastHit:-999,attackAnim:0,facing:0,...o};this.entities.push(a);return a}
 hero(champion,team,player=false){let s=this.data[champion].stats,l=this.mode==='practice'?6:1,g=growth(l);let h=this.add({kind:'hero',champion,name:CHAMPIONS.find(c=>c.id===champion).name,player,team,...SPAWNS[team],stats:s,level:l,xp:0,gold:this.mode==='practice'?1500:500,inventory:[],maxHp:s.hp+s.hpperlevel*g,hp:s.hp+s.hpperlevel*g,maxMp:s.mp+s.mpperlevel*g,mp:s.mp+s.mpperlevel*g,ad:s.attackdamage+s.attackdamageperlevel*g,ap:0,armor:s.armor+s.armorperlevel*g,mr:s.spellblock+s.spellblockperlevel*g,speed:s.movespeed,range:s.attackrange,attackSpeed:s.attackspeed*(1+s.attackspeedperlevel*g/100),atk:0,radius:65,kills:0,deaths:0,cs:0,assists:0,casts:0,autos:0,flash:0,heal:0,revive:0});return h}
 note(title,sub=''){this.events.push({type:'announce',title,sub});this.feed.unshift({text:title,time:this.time});this.feed=this.feed.slice(0,5)}
 enemies(a,r,kind){return this.entities.filter(b=>b.alive&&b.team!==a.team&&(b.team!==2||a.target===b.id)&&(!kind||b.kind===kind)&&distance(a,b)<=r+(b.radius||0))}
 entity(id){return this.entities.find(e=>e.id===id)}
 protected(a){if(a.kind==='tower'){if(a.tier===2)return false;if(a.lane===-1)return !this.entities.some(e=>e.team===a.team&&e.kind==='inhibitor'&&!e.alive);return this.entities.some(e=>e.alive&&e.team===a.team&&e.kind==='tower'&&e.lane===a.lane&&e.tier>a.tier)}if(a.kind==='inhibitor')return this.entities.some(e=>e.alive&&e.team===a.team&&e.kind==='tower'&&e.lane===a.lane);if(a.kind==='nexus')return this.entities.some(e=>e.alive&&e.team===a.team&&e.kind==='tower'&&e.lane===-1);return false}
 steer(x,z){let p=this.player,n=Math.hypot(x,z);if(this.paused||this.status!=='playing'||!p.alive)n=0;p.manual=n?{x:x/n,z:z/n}:null;if(n){p.target=null;p.route=[];p.move=null;p.recall=0;p.buffs.meditate=0}}
 command(point,target=null){let p=this.player;if(!p.alive||this.paused||this.status!=='playing')return;p.manual=null;p.recall=0;p.buffs.meditate=0;if(target&&target.team!==p.team&&target.alive){p.target=target.id;p.move=null;p.route=[]}else{p.target=null;p.move=point;p.route=route(p,point)}this.events.push({type:'click',...point,color:target?'#f5686f':'#88e2c3'})}
 stop(){this.player.manual=null;this.player.target=null;this.player.move=null;this.player.route=[];this.player.recall=0}
 attack(a,b){if(!b?.alive||a.atk>0||this.protected(b))return;a.atk=1/(a.attackSpeed*(a.buffs.rapid>0?1.5:1));a.attackAnim=.45;a.facing=Math.atan2(b.x-a.x,b.z-a.z);a.autos=(a.autos||0)+1;let damage=a.ad;if(a.buffs.empower>0){damage+=30+a.ad*.5;a.buffs.empower=0;b.stun=.8}if(a.champion==='MasterYi'&&a.autos%4===0)damage*=1.5;if(a.champion==='Ashe')b.slow=2;
  let magic=a.kind==='tower'||a.kind==='monster';
  if(a.range>300||a.kind==='tower')this.projectiles.push({x:a.x,z:a.z,source:a.id,target:b.id,team:a.team,speed:a.kind==='tower'?1500:1800,damage,damageType:'physical',color:a.kind==='tower'?(a.team?'#ff6773':'#69caff'):a.champion==='Annie'?'#ff9a58':a.champion==='Lux'?'#fff0a6':'#91d8ff',size:a.kind==='tower'?34:15,life:4});
  else{this.damage(b,damage,'physical',a);if(a.buffs.true>0)this.damage(b,30+a.ad*.3,'true',a);this.events.push({type:'slash',x:b.x,z:b.z,color:a.team?'#ff9696':'#e9f8ee',radius:150})}
 }
 damage(b,amount,type,a){if(!b?.alive||this.protected(b)||amount<=0)return;let d=type==='true'?amount:mitigated(amount,type==='magic'?b.mr||0:b.armor||0);if(b.buffs.guard>0)d*=.7;if(b.buffs.meditate>0)d*=.45;let shield=Math.min(b.shield,d);b.shield-=shield;d-=shield;b.hp-=d;b.lastHit=this.time;b.recall=0;this.events.push({type:'damage',x:b.x,z:b.z,amount:Math.round(d),color:type==='magic'?'#b7acff':type==='true'?'#fff1b5':'#fff0d6'});
  if(b.kind==='monster')b.target=a?.id;
  if(a?.kind==='hero'&&b.kind==='hero'){b.contributors??={};b.contributors[a.id]=this.time;b.lastAttacker=a.id;for(let t of this.entities)if(t.alive&&t.team===b.team&&t.kind==='tower'&&distance(a,t)<t.range)t.target=a.id}
  if(b.hp<=0)this.die(b,a);
 }
 die(b,a){b.hp=0;b.alive=false;b.manual=null;b.target=null;b.move=null;this.events.push({type:'death',x:b.x,z:b.z,color:b.team?'#f07486':'#83d8f5',radius:b.kind==='hero'?230:110});
  if(b.kind==='hero'){b.deaths++;for(let [id,time] of Object.entries(b.contributors||{})){let helper=this.entity(Number(id));if(helper?.kind==='hero'&&helper.id!==a?.id&&this.time-time<10){helper.assists++;helper.gold+=150}}b.contributors={};b.revive=this.mode==='practice'?10:6+b.level*2;this.kills[1-b.team]++;if(a?.kind==='hero'){a.kills++;a.gold+=300;this.addXp(a,180+b.level*35)}this.note(`${a?.name||'防御方'} 击败了 ${b.name}`);}
  else if(b.kind==='minion'){if(a?.kind==='hero'){a.gold+=b.cannon?60:21;a.cs++}for(let h of this.entities)if(h.alive&&h.kind==='hero'&&h.team!==b.team&&distance(h,b)<1600)this.addXp(h,b.cannon?93:60)}
  else if(b.kind==='monster'){b.revive=b.monster==='baron'?360:120;if(a?.kind==='hero'){a.gold+=b.maxHp>2000?180:90;this.addXp(a,b.maxHp>2000?350:160);a.buffs[b.monster]=90;this.note(`${a.name} 击败了${b.monster==='dragon'?'巨龙':b.monster==='baron'?'峡谷巨兽':'野怪'}`)}}
  else if(b.kind==='tower'){this.towerKills[1-b.team]++;for(let h of this.entities)if(h.kind==='hero'&&h.team!==b.team)h.gold+=100;this.note(`${b.team===1?'赤红':'苍蓝'}方防御塔被摧毁`)}
  else if(b.kind==='inhibitor'){b.revive=300;this.note('召唤水晶被摧毁','该路将出现超级兵')}
  else if(b.kind==='nexus'){this.winner=1-b.team;this.status='ended';this.note(this.winner===0?'胜利':'失败')}
 }
 addXp(a,xp){if(a.level>=18)return;a.xp+=xp;while(a.level<18&&a.xp>=180+a.level*100){a.xp-=180+a.level*100;a.level++;let g=growth(a.level)-growth(a.level-1),s=a.stats;a.maxHp+=s.hpperlevel*g;a.hp+=s.hpperlevel*g;a.maxMp+=s.mpperlevel*g;a.mp+=s.mpperlevel*g;a.ad+=s.attackdamageperlevel*g;a.armor+=s.armorperlevel*g;a.mr+=s.spellblockperlevel*g;a.attackSpeed+=s.attackspeed*s.attackspeedperlevel*g/100;this.events.push({type:'level',x:a.x,z:a.z,color:'#eaca77',radius:200});if(a.player)this.note(`等级提升 · ${a.level}`,a.level===6?'终极技能已解锁':'生命值与基础属性提升')}}
 skillInfo(a,i){let s=this.data[a.champion].spells[i];return{cost:s.cost[0]||0,cd:s.cooldown[0]||0,range:s.range[0]||0}}
 cast(a,i,aim){if(this.paused||this.status!=='playing'||!a.alive||a.stun>0||a.cd[i]>0)return false;if(i===3&&a.level<6||i===2&&a.level<3||i===1&&a.level<2){if(a.player)this.note(i===3?'终极技能需要 6 级':`技能需要 ${i+1} 级`);return false}let s=this.skillInfo(a,i);if(a.mp<s.cost){if(a.player)this.note('法力不足');return false}
  let dx=aim.x-a.x,dz=aim.z-a.z,d=Math.hypot(dx,dz)||1,dir={x:dx/d,z:dz/d};let point={x:a.x+dir.x*Math.min(d,Math.max(s.range,600)),z:a.z+dir.z*Math.min(d,Math.max(s.range,600))};let near=this.enemies(a,s.range>100?s.range:600).filter(e=>!['tower','inhibitor','nexus'].includes(e.kind)).sort((x,y)=>distance(x,aim)-distance(y,aim));let target=near[0];
  if((a.champion==='Garen'&&i===3||a.champion==='Annie'&&i===0||a.champion==='MasterYi'&&i===0)&&!target){if(a.player)this.note('范围内没有可选目标');return false}
  if(a.champion==='Ashe'&&i===0&&a.autos<4){if(a.player)this.note('射手的专注需要 4 次普攻');return false}
  a.mp-=s.cost;a.cd[i]=s.cd;a.recall=0;a.attackAnim=.6;a.facing=Math.atan2(dir.x,dir.z);a.casts++;let col=CHAMPIONS.find(c=>c.id===a.champion).color;this.events.push({type:'cast',x:a.x,z:a.z,color:col,radius:160});
  const hit=(b,damage,type='magic')=>{this.damage(b,damage,type,a);if(a.champion==='Annie'&&a.casts%4===0)b.stun=1.25};
  const area=(p,r,damage,type='magic')=>{for(let b of this.enemies(a,30000))if(distance(p,b)<r+b.radius)hit(b,damage,type);this.events.push({type:'burst',...p,color:col,radius:r})};
  const bolt=(angle,range,width,damage,opts={})=>{let an=Math.atan2(dir.x,dir.z)+angle;this.projectiles.push({x:a.x,z:a.z,source:a.id,team:a.team,dx:Math.sin(an),dz:Math.cos(an),speed:1300,life:range/1300,damage,damageType:'magic',color:col,size:width,hit:[],pierce:1,...opts})};
  if(a.champion==='Garen'){
   if(i===0){a.buffs.empower=4;a.buffs.haste=3;a.slow=0}
   if(i===1){a.shield=80+a.maxHp*.1;a.buffs.guard=4;a.buffs.shield=4}
   if(i===2){a.buffs.spin=3;a.spinTick=0}
   if(i===3){hit(target,150+.25*(target.maxHp-target.hp),'true');this.events.push({type:'execute',x:target.x,z:target.z,color:'#fff4b4',radius:220})}
  }
  if(a.champion==='Ashe'){
   if(i===0){a.buffs.rapid=4;a.autos=0;a.cd[0]=4}
   if(i===1)for(let k=-4;k<=4;k++)bolt(k*.12,1200,28,20+a.ad,{damageType:'physical',slow:2});
   if(i===2){a.buffs.reveal=8;this.events.push({type:'reveal',...point,color:col,radius:900})}
   if(i===3)bolt(0,25000,90,200+a.ap,{stun:2.5,speed:1600,life:25000/1600,heroesOnly:true})
  }
  if(a.champion==='Annie'){
   if(i===0){hit(target,80+a.ap*.75);if(!target.alive)a.mp+=s.cost;this.events.push({type:'beam',x:a.x,z:a.z,to:{x:target.x,z:target.z},color:'#ff975e',radius:38})}
   if(i===1){for(let b of near){let q=(b.x-a.x)*dir.x+(b.z-a.z)*dir.z;if(q>0&&q<600&&Math.abs((b.x-a.x)*dir.z-(b.z-a.z)*dir.x)<q*.7)hit(b,100+a.ap*.85)}this.events.push({type:'cone',x:a.x,z:a.z,to:point,color:'#fb7f45',radius:360})}
   if(i===2){a.shield=60+a.ap*.4;a.buffs.shield=3;a.buffs.haste=1.5}
   if(i===3){area(point,300,150+a.ap*.75);this.add({kind:'bear',team:a.team,owner:a.id,...point,hp:1200,maxHp:1200,ad:70+a.ap*.15,armor:30,mr:30,range:150,speed:360,radius:100,attackSpeed:.7,atk:0,ttl:45})}
  }
  if(a.champion==='Lux'){
   if(i===0)bolt(0,1175,70,80+a.ap*.65,{stun:2,pierce:2});
   if(i===1){for(let b of this.entities)if(b.alive&&b.team===a.team&&distance(b,a)<1150){b.shield+=70+a.ap*.35;b.buffs.shield=3}this.events.push({type:'ring',x:a.x,z:a.z,color:col,radius:500})}
   if(i===2){this.zones.push({source:a.id,team:a.team,...point,radius:310,life:3,damage:65+a.ap*.8,color:col})}
   if(i===3){let end={x:a.x+dir.x*3340,z:a.z+dir.z*3340};for(let b of this.enemies(a,3600))if(segmentDistance(b,a,end)<110+b.radius)hit(b,300+a.ap);this.events.push({type:'beam',x:a.x,z:a.z,to:end,color:'#fff4ba',radius:85})}
  }
  if(a.champion==='MasterYi'){
   if(i===0){let prev={x:a.x,z:a.z};near.slice(0,4).forEach(b=>hit(b,30+a.ad,'physical'));let dest={x:target.x-dir.x*125,z:target.z-dir.z*125};if(navigable(dest))Object.assign(a,dest);this.events.push({type:'beam',...prev,to:{x:a.x,z:a.z},color:col,radius:25})}
   if(i===1){a.buffs.meditate=4;a.target=null;a.move=null;a.route=[]}
   if(i===2)a.buffs.true=5;
   if(i===3){a.buffs.haste=7;a.buffs.rapid=7;a.slow=0}
  }
  return true;
 }
 summoner(which,aim){let a=this.player;if(!a.alive||this.paused||a.stun>0)return false;if(which==='flash'){if(a.flash>0)return false;let d=distance(a,aim)||1,p={x:a.x+(aim.x-a.x)/d*Math.min(d,400),z:a.z+(aim.z-a.z)/d*Math.min(d,400)};if(!navigable(p))return false;this.events.push({type:'burst',x:a.x,z:a.z,color:'#fff8b4',radius:180});Object.assign(a,p);a.flash=300;a.recall=0;a.route=[];a.move=null;return true}if(a.heal>0)return false;a.hp=Math.min(a.maxHp,a.hp+80+20*a.level);a.buffs.haste=1;a.heal=240;this.events.push({type:'ring',x:a.x,z:a.z,color:'#8bffc7',radius:250});return true}
 recall(){if(this.player.alive){this.stop();this.player.recall=8;this.events.push({type:'ring',x:this.player.x,z:this.player.z,color:'#78d8ff',radius:180})}}
 buy(id){let a=this.player,item=ITEMS.find(i=>i.id===id);if(!item)return false;if(distance(a,BASES[a.team])>1300&&a.alive){this.note('需要返回泉水购买装备','按 B 引导回城');return false}if(a.gold<item.cost){this.note('金币不足');return false}if(a.inventory.length>=6&&!item.heal){this.note('装备栏已满');return false}if(item.id==='boots'&&a.inventory.includes('boots')){this.note('已经拥有速度之靴');return false}a.gold-=item.cost;if(!item.heal)a.inventory.push(id);a.ad+=item.ad||0;a.ap+=item.ap||0;a.speed+=item.speed||0;a.maxHp+=item.hp||0;a.hp=Math.min(a.maxHp,a.hp+(item.hp||item.heal||0));a.armor+=item.armor||0;a.attackSpeed+=(item.as||0)*a.stats.attackspeed;this.events.push({type:'purchase'});return true}
 spawnWave(){this.wave++;for(let team=0;team<2;team++)for(let lane=0;lane<3;lane++){let path=team?[...LANES[lane]].reverse():LANES[lane],superMinion=this.entities.some(e=>e.kind==='inhibitor'&&e.team!==team&&!e.alive&&e.lane===lane);for(let i=0;i<6+(this.wave%3===0?1:0);i++){let ranged=i>=3,cannon=i===6,superUnit=superMinion&&i===0;this.add({kind:'minion',team,lane,x:path[0][0]+(i%3-1)*95,z:path[0][1]+(team?1:-1)*Math.floor(i/3)*160,path,pathIndex:1,hp:superUnit?1500:cannon?912:ranged?296:477,maxHp:superUnit?1500:cannon?912:ranged?296:477,ad:superUnit?130:cannon?41:ranged?24:12,armor:superUnit?80:0,mr:0,speed:325,range:ranged?550:110,attackSpeed:ranged?.667:1.25,atk:0,radius:35,ranged,cannon,superUnit})}}this.events.push({type:'wave',wave:this.wave});if(this.wave===1)this.note('全军出击','跟随兵线推进，摧毁敌方枢纽')}
 step(dt){if(this.paused||this.status!=='playing')return;dt=Math.min(dt,.1);this.time+=dt;if(this.time>=this.nextWave){this.spawnWave();this.nextWave+=30}
  for(let a of [...this.entities]){
   if(!a.alive){if(a.revive>0){a.revive-=dt;if(a.revive<=0){a.alive=true;a.hp=a.maxHp;a.shield=0;a.stun=0;a.slow=0;a.buffs={};if(a.kind==='hero'){Object.assign(a,SPAWNS[a.team]);a.mp=a.maxMp;a.waypoint=1;a.target=null;a.move=null;a.route=[]}if(a.kind==='monster')Object.assign(a,a.home)}}continue}
   a.atk=Math.max(0,(a.atk||0)-dt);a.attackAnim=Math.max(0,a.attackAnim-dt);a.stun=Math.max(0,a.stun-dt);a.slow=Math.max(0,a.slow-dt);for(let k in a.buffs)a.buffs[k]=Math.max(0,a.buffs[k]-dt);if(!a.buffs.shield)a.shield=0;
   if(a.kind==='hero'){
    a.gold+=2.04*dt;a.cd=a.cd.map(c=>Math.max(0,c-dt));a.flash=Math.max(0,a.flash-dt);a.heal=Math.max(0,a.heal-dt);a.hp=Math.min(a.maxHp,a.hp+(a.stats.hpregen/5+(a.champion==='Garen'&&this.time-a.lastHit>8?a.maxHp*.015:0))*dt);a.mp=Math.min(a.maxMp,a.mp+a.stats.mpregen/5*dt);
    if(distance(a,BASES[a.team])<1050){a.hp=Math.min(a.maxHp,a.hp+a.maxHp*.16*dt);a.mp=Math.min(a.maxMp,a.mp+a.maxMp*.2*dt)}
    if(a.recall>0){a.recall-=dt;if(a.recall<=0){Object.assign(a,SPAWNS[a.team]);a.move=null;a.route=[];this.events.push({type:'burst',x:a.x,z:a.z,color:'#92d3ff',radius:250})}continue}
    if(a.buffs.spin>0){a.spinTick-=dt;if(a.spinTick<=0){a.spinTick=.43;for(let b of this.enemies(a,325))this.damage(b,14+a.ad*.36,'physical',a);this.events.push({type:'spin',x:a.x,z:a.z,color:'#f4e5a0',radius:325})}}
    if(a.buffs.meditate>0){a.hp=Math.min(a.maxHp,a.hp+(40+a.maxHp*.04)*dt);continue}
   }
   if(a.stun>0)continue;
   if(a.kind==='tower'){
    let target=this.entity(a.target);if(!target?.alive||distance(a,target)>a.range+(target.radius||0)){let es=this.enemies(a,a.range).filter(e=>['hero','minion','bear'].includes(e.kind));es.sort((b,c)=>(b.kind==='hero'?1:0)-(c.kind==='hero'?1:0)||distance(a,b)-distance(a,c));target=es[0];a.target=target?.id}if(target)this.attack(a,target);continue;
   }
   if(['nexus','inhibitor'].includes(a.kind))continue;
   if(a.kind==='monster'){let t=this.entity(a.target);if(t?.alive&&distance(a,a.home)<1600){if(distance(a,t)<=a.range+t.radius)this.attack(a,t);else moveToward(a,t,a.speed*dt)}else{a.target=null;moveToward(a,a.home,a.speed*dt);a.hp=Math.min(a.maxHp,a.hp+30*dt)}continue}
   if(a.kind==='bear'){a.ttl-=dt;if(a.ttl<=0){a.alive=false;continue}}
   let target=this.entity(a.target);
   if(a.player){if(a.manual){moveToward(a,{x:a.x+a.manual.x*1000,z:a.z+a.manual.z*1000},this.speed(a)*dt);continue}if(target?.alive&&target.team!==a.team){if(distance(a,target)<=a.range+target.radius)this.attack(a,target);else {if(!a.route.length||distance(a.route.at(-1),target)>250)a.route=route(a,{x:target.x,z:target.z});if(a.route.length){moveToward(a,a.route[0],this.speed(a)*dt);if(distance(a,a.route[0])<45)a.route.shift()}}}else{a.target=null;if(a.route.length){let p=a.route[0];if(distance(a,p)<45)a.route.shift();else moveToward(a,p,this.speed(a)*dt);if(!a.route.length)a.move=null}else{let es=this.enemies(a,a.range).filter(e=>!this.protected(e));if(es[0])this.attack(a,es[0])}}continue}
   let scan=a.kind==='hero'?1000:700;
   if(!target?.alive||distance(a,target)>scan*1.5||this.protected(target)){let es=this.enemies(a,scan).filter(e=>e.kind!=='monster'&&!this.protected(e));es.sort((b,c)=>(b.kind==='minion'?0:1)-(c.kind==='minion'?0:1)||distance(a,b)-distance(a,c));target=es[0];a.target=target?.id}
   const objective=this.entities.find(e=>e.alive&&e.kind==='nexus'&&e.team!==a.team&&!this.protected(e)&&distance(a,e)<1100);if(objective){target=objective;a.target=objective.id}
   if(a.kind==='hero'){
    if(a.hp<a.maxHp*.22){a.target=null;a.waypoint=1;let home=BASES[a.team];if(distance(a,home)>1000){if(!a.route.length)a.route=route(a,home);if(a.route.length){moveToward(a,a.route[0],this.speed(a)*dt);if(distance(a,a.route[0])<60)a.route.shift()}}continue}
    if(target){a.aiCast=(a.aiCast||0)-dt;if(a.aiCast<=0){a.aiCast=2.5;let idx=Math.floor((this.time+a.id)%4);this.cast(a,idx,target)}}
    if(this.time<Math.min(25,this.nextWave))continue;
   }
   if(target){if(distance(a,target)<=a.range+target.radius)this.attack(a,target);else{let danger=this.entities.find(e=>e.alive&&e.kind==='tower'&&e.team!==a.team&&e.team!==2&&distance(e,a)<850);let cover=danger&&this.entities.some(e=>e.alive&&e.kind==='minion'&&e.team===a.team&&distance(e,danger)<800);if(a.kind!=='hero'||!danger||cover)moveToward(a,target,this.speed(a)*dt)}}
   else if(a.kind==='minion'){let p=a.path[a.pathIndex];if(p){let q={x:p[0],z:p[1]};if(distance(a,q)<90)a.pathIndex++;else moveToward(a,q,a.speed*dt)}}
   else if(a.kind==='hero'){let path=a.team?[...LANES[a.lane]].reverse():LANES[a.lane];let wp=a.waypoint||1,p={x:path[wp][0],z:path[wp][1]};if(distance(a,p)<180){a.waypoint=Math.min(wp+1,path.length-1)}else moveToward(a,p,this.speed(a)*dt)}
   else if(a.kind==='bear'){let owner=this.entity(a.owner);if(owner&&distance(a,owner)>220)moveToward(a,owner,a.speed*dt)}
  }
  for(let p of this.projectiles){p.life-=dt;let a=this.entity(p.source);if(p.target){let b=this.entity(p.target);if(!b?.alive){p.life=0;continue}let d=distance(p,b);if(d<=p.speed*dt+b.radius){this.damage(b,p.damage,p.damageType,a);p.life=0}else{p.x+=(b.x-p.x)/d*p.speed*dt;p.z+=(b.z-p.z)/d*p.speed*dt}}else{let old={x:p.x,z:p.z};p.x+=p.dx*p.speed*dt;p.z+=p.dz*p.speed*dt;for(let b of this.entities){if(!b.alive||b.team===p.team||b.team===2||p.hit.includes(b.id)||['tower','nexus','inhibitor'].includes(b.kind)||p.heroesOnly&&b.kind!=='hero')continue;if(segmentDistance(b,old,p)<p.size+b.radius){this.damage(b,p.damage,p.damageType,a);if(p.stun)b.stun=p.stun;if(p.slow)b.slow=p.slow;p.hit.push(b.id);p.pierce--;if(p.pierce<=0){p.life=0;break}}}}}
  this.projectiles=this.projectiles.filter(p=>p.life>0);
  for(let z of this.zones){z.life-=dt;for(let b of this.entities)if(b.alive&&b.team!==z.team&&distance(z,b)<z.radius)b.slow=.3;if(z.life<=0){let a=this.entity(z.source);for(let b of this.entities)if(b.alive&&b.team!==z.team&&distance(z,b)<z.radius)this.damage(b,z.damage,'magic',a);this.events.push({type:'burst',...z})}}
  this.zones=this.zones.filter(z=>z.life>0);
  this.entities=this.entities.filter(e=>e.alive||['hero','tower','nexus','inhibitor','monster'].includes(e.kind));
 }
 speed(a){return a.speed*(a.buffs.haste>0?1.35:1)*(a.slow>0?.65:1)}
}
