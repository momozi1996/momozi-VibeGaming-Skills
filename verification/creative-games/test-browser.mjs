import {createRequire} from 'node:module';import fs from 'node:fs';
const require=createRequire('/Users/jyxc-dz-0100378/TESTBMK/game-skill-packages/verification/allgame/racing-custom/package.json');const {chromium}=require('playwright');
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--use-angle=metal']});
const reports=[];const out='/tmp/creative-game-authoring/screens';
const assert=(v,msg)=>{if(!v)throw Error(msg);};
for(const id of ['survivorgame','towerdefensegame','platformgame','farmgame']){
 let page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url());});const result={id,checks:[],errors};
 try{await page.goto('http://127.0.0.1:4491/'+id+'/?dev=1');await page.waitForSelector('[data-do=start]');await page.click('[data-do=start]');await page.click('#sound');
 let before=await page.evaluate(()=>__GAME__.game.time);await page.keyboard.press('Escape');await page.waitForTimeout(150);let paused=await page.evaluate(()=>__GAME__.game.time);await page.waitForTimeout(150);assert(paused===await page.evaluate(()=>__GAME__.game.time),'pause froze gameplay');await page.click('[data-do=resume]');result.checks.push('pause/resume');
 if(id==='survivorgame'){
  let x=await page.evaluate(()=>__GAME__.game.player.x);await page.keyboard.down('KeyD');await page.waitForTimeout(300);await page.keyboard.up('KeyD');assert(await page.evaluate(()=>__GAME__.game.player.x)>x+30,'native movement');result.checks.push('real keyboard movement');
  // Normal gameplay simulation with an input bot; no health, damage, enemy or reward overrides.
  for(let batch=0;batch<600;batch++){
   let st=await page.evaluate(()=>{let d=__GAME__,g=d.game;for(let i=0;i<24&&d.stage==='playing';i++){let p=g.player;let target=g.gems.reduce((a,b)=>!a||Math.hypot(a.x-p.x,a.y-p.y)>Math.hypot(b.x-p.x,b.y-p.y)?b:a,null);let a=g.time*.35;let tx=target?.x??(640+Math.cos(a)*220),ty=target?.y??(490+Math.sin(a)*150);let dx=tx-p.x,dy=ty-p.y;for(let e of g.enemies){let ex=p.x-e.x,ey=p.y-e.y,r=Math.hypot(ex,ey);if(r<130){dx+=ex/Math.max(r,1)*(130-r)*3;dy+=ey/Math.max(r,1)*(130-r)*3;}}let l=Math.hypot(dx,dy)||1;d.input.x=dx/l;d.input.y=dy/l;if(g.enemies.some(e=>Math.hypot(e.x-p.x,e.y-p.y)<110))g.action('pulse');g.update(1/60,d.input);}return {stage:d.stage,time:g.time,hp:g.player.hp,kills:g.kills,level:g.level};});
   if(st.stage==='choice')await page.locator('[data-choice]').first().click();
   if(st.time>25&&!result.actionScreenshot){await page.screenshot({path:out+'/'+id+'-action.png'});result.actionScreenshot=true;}
   if(st.stage==='result'){result.playthrough=st;break;}
  }assert(result.playthrough,'survivor terminal state');result.checks.push('input-bot full run, including XP choices and terminal state');
 }
 if(id==='towerdefensegame'){
  // Native pointer placement and upgrade. No money injection.
  const rect=await page.locator('canvas').boundingBox();let pad=await page.evaluate(()=>__GAME__.game.pads[1]);await page.mouse.click(rect.x+pad.x/1280*rect.width,rect.y+pad.y/800*rect.height);assert(await page.evaluate(()=>__GAME__.game.towers.length)===1,'tower native placement');result.checks.push('real pointer build');
  result.playthrough=await page.evaluate(()=>{let d=__GAME__,g=d.game;const order=[4,6,2,0,3,5,7];let pos=0;for(let i=0;i<24000&&d.stage==='playing';i++){if(pos<order.length){let idx=order[pos];g.action(pos===2?'frost':pos===4?'flame':'arrow');let costs=g.selected==='frost'?80:g.selected==='flame'?110:65;if(g.gold>=costs){g.click(g.pads[idx].x,g.pads[idx].y);pos++;}}else{let t=g.towers.find(t=>t.level<3&&g.gold>=45*t.level);if(t){g.selectedPad=t.pad;g.action('upgrade');}}if(!g.active)g.action('wave');g.update(1/60);}return {stage:d.stage,lives:g.lives,wave:g.wave,kills:g.kills,towers:g.towers.length};});assert(result.playthrough.stage==='result','TD terminal result');result.checks.push('full normal-budget tower strategy');await page.screenshot({path:out+'/'+id+'-result.png'});
  await page.click('[data-do=restart]');await page.evaluate(()=>{let g=__GAME__.game;for(let i of[1,4,6])g.click(g.pads[i].x,g.pads[i].y);g.action('wave');__GAME__.step(13);});await page.screenshot({path:out+'/'+id+'-action.png'});
 }
 if(id==='platformgame'){
  let x=await page.evaluate(()=>__GAME__.game.player.x);await page.keyboard.down('KeyD');await page.waitForTimeout(220);await page.keyboard.up('KeyD');assert(await page.evaluate(()=>__GAME__.game.player.x)>x+20,'platform native movement');await page.keyboard.down('Space');await page.waitForTimeout(180);await page.keyboard.up('Space');assert(await page.evaluate(()=>__GAME__.game.player.y)<600,'native jump');result.checks.push('real keyboard run and jump');
  await page.evaluate(()=>__GAME__.start());
  result.playthrough=await page.evaluate(()=>{let d=__GAME__,g=d.game,frames=0,hold=0,lastPlatform=0,level=1,trace=[];for(;frames<30000&&d.stage==='playing';frames++){let p=g.player;if(level!==g.level){lastPlatform=0;level=g.level;}d.input.keys.clear();d.input.pressed.clear();if(hold>0){d.input.keys.add('Space');hold--;}
   let current=g.platforms.findIndex(q=>Math.abs(p.y-q.y)<3&&p.x>=q.x-12&&p.x<=q.x+q.w+12);if(p.ground&&current>=0)lastPlatform=current;
   let next=g.platforms[Math.min(lastPlatform+1,g.platforms.length-1)],here=g.platforms[lastPlatform];let goal=next.x+Math.min(90,next.w*.4);let dir=1;
   const jump=()=>{d.input.pressed.add('Space');d.input.keys.add('Space');hold=27;};
   if(lastPlatform===6&&!g.key){goal=g.keyPos.x;dir=Math.abs(goal-p.x)<8?0:Math.sign(goal-p.x);if(p.ground&&Math.abs(goal-p.x)<20)jump();if(!p.ground&&p.vy>100&&p.jumps>0)jump();}
   else if(p.ground){if(lastPlatform===g.platforms.length-1){goal=g.goal.x;dir=Math.abs(goal-p.x)<5?0:Math.sign(goal-p.x);}else{dir=1;if(p.x>=here.x+here.w-47)jump();else if(g.enemies.some(e=>e.alive&&e.x>p.x&&e.x-p.x<85))jump();}}
   else{dir=Math.abs(goal-p.x)<12?0:Math.sign(goal-p.x);if(p.vy>80&&p.jumps>0&&(p.x<next.x+8||p.y>next.y-65))jump();}
   let before=g.lives;d.input.x=dir;d.input.y=0;g.update(1/60,d.input);if(g.lives!==before){trace.push({x:p.x,y:p.y,lastPlatform});lastPlatform=g.checkpoint.x>150?4:0;}
  }return {stage:d.stage,level:g.level,lives:g.lives,stars:g.collected,frames,trace,x:g.player.x,key:g.key};});assert(result.playthrough.stage==='result'&&result.playthrough.level===3&&result.playthrough.lives>0,'platform full three-level win');result.checks.push('normal movement/jump input bot, full three-level win');await page.screenshot({path:out+'/'+id+'-action.png'});
 }
 if(id==='farmgame'){
  const rect=await page.locator('canvas').boundingBox();const click=async(x,y)=>page.mouse.click(rect.x+x/1280*rect.width,rect.y+y/800*rect.height);
  await click(650+3*65,378+3*32);assert(await page.evaluate(()=>__GAME__.game.plots[3].crop)==='carrot','plant via native pointer');await page.click('[data-action=water]');await click(845,474);assert(await page.evaluate(()=>__GAME__.game.plots[3].water),'water pointer');result.checks.push('native plant + watering');
  result.playthrough=await page.evaluate(()=>{let d=__GAME__,g=d.game;for(let order=0;order<3;order++){let req=g.p.orders[order].need;for(let[k,n]of Object.entries(req)){while(g.inventory[k]<n){let q=g.plots.find(q=>q.crop===k)||g.plots.find(q=>!q.crop);let x=650+(q.col-q.row)*65,y=378+(q.col+q.row)*32;if(!q.crop){g.action(k);g.click(x,y);}g.action('water');if(!q.water)g.click(x,y);for(let i=0;i<6000&&q.growth<1;i++)g.update(1/60);g.click(x,y);}}g.action('order');}g.action('build');g.action('build');return {stage:d.stage,day:g.day,order:g.order,level:g.level,gold:g.gold};});assert(result.playthrough.order===3&&result.playthrough.level===2,'farm orders+restoration');result.checks.push('grow, harvest, 3 orders, both restorations, normal economy');await page.screenshot({path:out+'/'+id+'-result.png'});
  await page.reload();await page.waitForSelector('[data-do=continue]');await page.click('[data-do=continue]');await page.waitForTimeout(200);assert(await page.evaluate(()=>__GAME__.game.level)===2,'persist restored garden');assert(await page.evaluate(()=>__GAME__.stage)==='playing','post-win garden playable');result.checks.push('reload save + post-win continuation');await page.screenshot({path:out+'/'+id+'-action.png'});
 }
 assert(errors.length===0,'no browser errors');result.ok=true;
 }catch(e){result.ok=false;result.error=String(e);await page.screenshot({path:out+'/'+id+'-failure.png'});}
 reports.push(result);console.log(JSON.stringify(result));await page.close();
}
fs.writeFileSync('/tmp/creative-game-authoring/browser-report.json',JSON.stringify(reports,null,2));await browser.close();
