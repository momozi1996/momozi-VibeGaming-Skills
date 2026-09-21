// Physical keyboard codes avoid Chinese/IME layout differences. All movement is
// sampled by the fixed simulation step, not by OS key repeat or render FPS.
export const CONTROL_SCHEMES = {
  wasd: {name:'WASD 移动',skills:['1','2','3','4'],skillCodes:['Digit1','Digit2','Digit3','Digit4'],summoners:['F','G'],summonerCodes:['KeyF','KeyG']},
  classic: {name:'经典 QWER',skills:['Q','W','E','R'],skillCodes:['KeyQ','KeyW','KeyE','KeyR'],summoners:['D','F'],summonerCodes:['KeyD','KeyF']}
};
export function movementVector(keys,mode){
  if(keys.has('AltLeft')||keys.has('AltRight'))return {x:0,z:0};
  const down=(arrow,letter)=>keys.has(arrow)||(mode==='wasd'&&keys.has(letter));
  let x=Number(down('ArrowRight','KeyD'))-Number(down('ArrowLeft','KeyA'));
  let z=Number(down('ArrowDown','KeyS'))-Number(down('ArrowUp','KeyW'));
  const n=Math.hypot(x,z);return n?{x:x/n,z:z/n}:{x:0,z:0};
}
export class GameControls {
  constructor({app,canvas,ui,aimAt,targeted,sound}){
    Object.assign(this,{app,canvas,ui,aimAt,targeted,sound});this.keys=new Set();this.pointer={x:innerWidth/2,y:innerHeight/2};this.rightHeld=false;this.drag=null;this.lastCommand=0;this.pendingSkill=null;
    canvas.addEventListener('contextmenu',e=>e.preventDefault());
    canvas.addEventListener('pointermove',e=>this.pointerMove(e));
    canvas.addEventListener('pointerdown',e=>this.pointerDown(e));
    window.addEventListener('pointerup',()=>{this.rightHeld=false;this.drag=null});
    canvas.addEventListener('pointercancel',()=>this.release());
    canvas.addEventListener('lostpointercapture',()=>{this.rightHeld=false;this.drag=null});
    canvas.addEventListener('wheel',e=>{e.preventDefault();if(this.canPlay())app.zoom=Math.max(27,Math.min(85,app.zoom+e.deltaY*.025))},{passive:false});
    window.addEventListener('keydown',e=>this.keyDown(e));
    window.addEventListener('keyup',e=>{this.keys.delete(e.code);if(e.code==='Tab'){app.scoreboard=false;ui.hits=[]}this.syncMovement()});
    window.addEventListener('blur',()=>{this.release();if(app.match?.status==='playing'){app.match.paused=true;ui.hits=[]}});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){this.release();if(app.match?.status==='playing'){app.match.paused=true;ui.hits=[]}}});
  }
  canPlay(){let a=this.app;return a.screen==='game'&&a.match?.status==='playing'&&!a.match.paused&&!a.shop&&!a.scoreboard}
  release(){this.keys.clear();this.rightHeld=false;this.drag=null;this.pendingSkill=null;this.app.match?.steer(0,0)}
  syncMovement(){const v=this.canPlay()?movementVector(this.keys,this.app.controlMode):{x:0,z:0};this.app.match?.steer(v.x,v.z)}
  setPaused(value){this.release();this.app.match.paused=value;this.ui.hits=[]}
  toggleShop(){if(this.app.match?.paused||this.app.match?.status!=='playing')return;this.release();this.app.match.stop();this.app.shop=!this.app.shop;this.app.scoreboard=false;this.ui.hits=[]}
  toggleScheme(){this.release();this.app.controlMode=this.app.controlMode==='wasd'?'classic':'wasd';this.ui.hits=[];this.app.match?.note(`操作：${CONTROL_SCHEMES[this.app.controlMode].name}`,'两种模式均支持方向键和鼠标走位 · C 切换')}
  commandAtPointer(){if(!this.canPlay()||!this.app.match.player.alive)return;this.pendingSkill=null;this.app.aim=this.aimAt(this.pointer.x,this.pointer.y);this.app.match.command(this.app.aim,this.targeted(this.pointer.x,this.pointer.y));this.lastCommand=performance.now()}
  pointerMove(e){
    this.pointer={x:e.clientX,y:e.clientY};let hit=this.ui.pointer(e.clientX,e.clientY);
    this.canvas.style.cursor=this.pendingSkill?'crosshair':hit&&hit.id!=='block'?'pointer':this.targeted(e.clientX,e.clientY)?'crosshair':'default';
    if(this.canPlay()&&!hit){this.app.aim=this.aimAt(e.clientX,e.clientY);if(this.rightHeld&&performance.now()-this.lastCommand>120)this.commandAtPointer()}
    if(this.drag&&this.canPlay()){this.app.lockCamera=false;this.app.focus.x-=(e.clientX-this.drag.x)*7;this.app.focus.z-=(e.clientY-this.drag.y)*10;this.drag={x:e.clientX,y:e.clientY}}
  }
  pointerDown(e){
    this.canvas.focus();this.pointer={x:e.clientX,y:e.clientY};let hit=this.ui.pointer(e.clientX,e.clientY);
    if(hit){if(e.button===0||hit.id==='minimap'&&e.button===2)this.handleHit(hit,e);return}
    if(!this.canPlay())return;
    if(e.button===1){e.preventDefault();this.drag={x:e.clientX,y:e.clientY};this.canvas.setPointerCapture(e.pointerId);return}
    if(e.button!==0&&e.button!==2)return;
    this.app.aim=this.aimAt(e.clientX,e.clientY);
    if(e.button===0&&this.pendingSkill!==null){this.cast(this.pendingSkill);this.pendingSkill=null;return}
    this.rightHeld=e.button===2;this.commandAtPointer();this.sound(500,.04,'sine',.008);
  }
  handleHit(hit,e){
    let {app:a,ui}=this,m=a.match,id=hit.id;
    if(id==='block')return;
    if(a.screen==='menu'){
      if(id==='select'){a.selected=hit.data;this.sound(440+hit.data*60)}
      if(id==='mode-standard')a.mode='standard';if(id==='mode-practice')a.mode='practice';
      if(id==='controls')this.toggleScheme();if(id==='start')a.start();return;
    }
    if(!m)return;
    if(id==='menu'){a.menu();return}if(id==='restart'){a.start();return}
    if(id==='resume'){this.setPaused(false);return}if(id==='pause'){this.setPaused(true);return}
    if(id==='controls'){this.toggleScheme();return}
    if(m.paused||m.status!=='playing')return;
    if(id==='shop'||id==='close-shop'){this.toggleShop();return}
    if(id==='buy'&&a.shop){if(m.buy(hit.data))this.sound(850,.15,'triangle');return}
    if(a.shop)return;
    if(id==='score'){this.release();a.scoreboard=!a.scoreboard;ui.hits=[];return}
    if(a.scoreboard)return;
    if(id==='recall'){this.release();m.recall();return}
    if(id==='skill'){
      // Ground-targeted buttons enter aim mode instead of firing at an old cursor point.
      const self={Garen:[0,1,2],Ashe:[0,2],Annie:[2],Lux:[1],MasterYi:[1,2,3]};
      if(self[m.player.champion].includes(hit.data))this.cast(hit.data);
      else{this.pendingSkill=hit.data;m.note('选择技能目标','左键施放 · 右键或 Esc 取消')}return;
    }
    if(id==='summoner'){if(hit.data===0){this.pendingSkill='flash';m.note('选择闪现位置','左键施放 · 右键或 Esc 取消')}else m.summoner('heal',a.aim);return}
    if(id==='minimap'){
      const {mx,my,size}=hit.data,p={x:Math.max(420,Math.min(14580,(ui.mouse.x-mx)/size*15000)),z:Math.max(420,Math.min(14580,(ui.mouse.y-my)/size*15000))};
      if(e.button===2)m.command(p);else{a.focus=p;a.lockCamera=false}return;
    }
  }
  cast(index){let m=this.app.match;if(!this.canPlay())return;if(index==='flash')return m.summoner('flash',this.app.aim);if(m.cast(m.player,index,this.app.aim))this.sound(380+index*120,.18,'triangle')}
  keyDown(e){
    if(['Tab','Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
    if(e.repeat)return;
    let a=this.app,m=a.match;
    if(a.screen==='menu'){if(e.code==='Enter')a.start();if(e.code==='ArrowRight')a.selected=(a.selected+1)%5;if(e.code==='ArrowLeft')a.selected=(a.selected+4)%5;if(e.code==='KeyC')this.toggleScheme();return}
    if(!m)return;
    if(e.code==='Escape'){
      if(this.pendingSkill!==null){this.pendingSkill=null;return}
      if(a.shop){this.toggleShop();return}if(a.scoreboard){a.scoreboard=false;this.release();this.ui.hits=[];return}
      if(m.status==='playing')this.setPaused(!m.paused);return;
    }
    if(m.status!=='playing')return;
    if(e.code==='KeyP'){this.toggleShop();return}
    if(e.code==='KeyC'){this.toggleScheme();return}
    if(e.code==='KeyM'){a.toggleMute();return}
    if(e.code==='Tab'&&!m.paused&&!a.shop){this.release();a.scoreboard=true;this.ui.hits=[];return}
    if(!this.canPlay())return;
    this.keys.add(e.code);this.syncMovement();
    const scheme=CONTROL_SCHEMES[a.controlMode];let index=scheme.skillCodes.indexOf(e.code);
    if(index<0&&e.code.startsWith('Numpad'))index=['Numpad1','Numpad2','Numpad3','Numpad4'].indexOf(e.code);
    if(index>=0){this.cast(index);return}
    let summon=scheme.summonerCodes.indexOf(e.code);if(summon>=0){this.pendingSkill=null;m.summoner(summon===0?'flash':'heal',a.aim);return}
    if(e.code==='KeyB'){this.release();m.recall()}
    if(e.code==='KeyX'||a.controlMode==='classic'&&e.code==='KeyS'){this.release();m.stop()}
    if(e.code==='KeyY')a.lockCamera=!a.lockCamera;
    if(e.code==='KeyH')a.help=!a.help;
    if(e.code==='Space'){a.focus={x:m.player.x,z:m.player.z};a.lockCamera=true}
  }
  update(){
    this.syncMovement();
    // Camera movement changes the ground under a stationary mouse cursor.
    if(this.canPlay()&&!this.ui.pointer(this.pointer.x,this.pointer.y)){this.app.aim=this.aimAt(this.pointer.x,this.pointer.y);if(this.rightHeld&&performance.now()-this.lastCommand>120)this.commandAtPointer()}
  }
}
