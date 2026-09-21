import './style.css';
import * as THREE from 'three';
import {buildWorld} from './world.js';
import {makeWeapon,makeBot} from './models.js';
import {BLOCKS,SITE,SPAWN} from './map.js';
import {createState,startMatch,update,shoot,reload,switchWeapon,buy,hitBot,hurtPlayer,WEAPONS} from './simulation.js';
import {AudioSystem} from './audio.js';
const $=id=>document.getElementById(id),show=(id,on)=>$(id).classList.toggle('hidden',!on);
const state=createState(),audio=new AudioSystem(),keys=new Set();
let renderer,scene,camera,world,weaponScene,weaponCamera,weapons={},botModels=[],yaw=0,pitch=0,last=performance.now(),visualTime=0,fire=false,fireOnce=false,aim=false,locked=false,activeOverlay=null,settingsFrom='menu',sensitivity=1,flashTime=0,hitTime=0,damageTime=0,toastTime=0,beepTime=0,lockIntent=false;
let shotCount=0,frameSamples=[];
const raycaster=new THREE.Raycaster(),tmpVec=new THREE.Vector3();
const worldBoxes=BLOCKS.map(b=>new THREE.Box3(new THREE.Vector3(b.x-b.w/2,b.y||0,b.z-b.d/2),new THREE.Vector3(b.x+b.w/2,(b.y||0)+b.h,b.z+b.d/2)));
const effects=[],feed=[];
function clearInput(){keys.clear();fire=false;fireOnce=false;aim=false;show('scoreboard',false);}
function toast(text){$('toast').textContent=text;toastTime=2.6;}
function init(){
 try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch(e){throw new Error('WebGL2 is required. Please open this game in a current desktop Chrome, Edge, or Firefox browser.');}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.autoClear=false;$('game').appendChild(renderer.domElement);
 scene=new THREE.Scene();scene.background=new THREE.Color(0xb7ced1);scene.fog=new THREE.FogExp2(0xc7c6ad,.007);
 camera=new THREE.PerspectiveCamera(78,innerWidth/innerHeight,.06,180);camera.rotation.order='YXZ';
 const hemi=new THREE.HemisphereLight(0xd8eaf2,0x887553,2);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffe0a7,3.4);sun.position.set(-24,36,20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-36,right:36,top:36,bottom:-36,near:1,far:100});sun.shadow.normalBias=.045;sun.shadow.bias=-.00015;sun.shadow.radius=3;sun.target.position.set(0,0,-4);scene.add(sun,sun.target);
 world=buildWorld(scene);
 // Hazy distant ridge silhouettes, all real geometry.
 const mountainMat=new THREE.MeshStandardMaterial({color:0x9caa9d,roughness:1});for(let i=0;i<18;i++){const mesh=new THREE.Mesh(new THREE.ConeGeometry(17+Math.sin(i)*4,18+Math.cos(i*3)*6,5),mountainMat);mesh.position.set((i-9)*17,0,-92-Math.cos(i)*9);mesh.rotation.y=i;scene.add(mesh);}
 weaponScene=new THREE.Scene();weaponCamera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.01,10);weaponScene.add(new THREE.HemisphereLight(0xf0f1e3,0x404b54,2.7));const keyLight=new THREE.DirectionalLight(0xffe4bc,3.5);keyLight.position.set(-3,5,4);weaponScene.add(keyLight);
 for(const type of Object.keys(WEAPONS)){const model=makeWeapon(type);model.visible=false;weapons[type]=model;weaponScene.add(model);}
 for(let i=0;i<3;i++){const b=makeBot();b.visible=false;botModels.push(b);scene.add(b);}
 bind();loadSettings();show('loading',false);requestAnimationFrame(loop);
}
function loadSettings(){try{const data=JSON.parse(localStorage.getItem('counterline.settings.v1')||'null');if(data){sensitivity=Number.isFinite(data.sensitivity)?THREE.MathUtils.clamp(data.sensitivity,.3,2.5):1;audio.setVolume(Number.isFinite(data.volume)?THREE.MathUtils.clamp(data.volume,0,1):.6);state.difficulty=['easy','normal','hard'].includes(data.difficulty)?data.difficulty:'normal';}}catch{}$('sensitivity').value=sensitivity;$('volume').value=audio.volume;$('difficulty').value=state.difficulty;$('sensitivity-out').value=sensitivity.toFixed(1);$('volume-out').value=`${Math.round(audio.volume*100)}%`;}
function saveSettings(){try{localStorage.setItem('counterline.settings.v1',JSON.stringify({sensitivity,volume:audio.volume,difficulty:state.difficulty}));}catch{}}
function setOverlay(name){for(const id of ['menu','pause','settings','armory','result'])show(id,id===name);activeOverlay=name;}
async function requestLock(){audio.init();lockIntent=true;try{await renderer.domElement.requestPointerLock();}catch{lockIntent=false;state.paused=true;setOverlay('pause');toast('Click Back to Operation to capture your mouse.');}}
function begin(){clearInput();startMatch(state);yaw=0;pitch=0;setOverlay(null);show('hud',true);document.body.classList.add('playing');beepTime=0;requestLock();}
function pause(name='pause'){if(['menu','matchEnd'].includes(state.phase))return;state.paused=true;clearInput();setOverlay(name);if(document.pointerLockElement)document.exitPointerLock();}
function resume(){state.paused=false;setOverlay(null);clearInput();requestLock();}
function menu(){clearInput();state.phase='menu';state.paused=false;state.events.length=0;setOverlay('menu');show('hud',false);document.body.classList.remove('playing');if(document.pointerLockElement)document.exitPointerLock();effects.forEach(e=>{scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();});effects.length=0;}
function openSettings(from){settingsFrom=from;setOverlay('settings');}
function bind(){
 $('start').onclick=begin;$('resume').onclick=resume;$('restart').onclick=begin;$('quit').onclick=menu;$('play-again').onclick=begin;$('result-menu').onclick=menu;
 $('settings-open').onclick=()=>openSettings('menu');$('pause-settings').onclick=()=>openSettings('pause');$('settings-close').onclick=()=>{saveSettings();setOverlay(settingsFrom);};
 $('sensitivity').oninput=e=>{$('sensitivity-out').value=(sensitivity=+e.target.value).toFixed(1);};$('volume').oninput=e=>{audio.init();audio.setVolume(+e.target.value);$('volume-out').value=`${Math.round(audio.volume*100)}%`;};$('difficulty').onchange=e=>{state.difficulty=e.target.value;};
 $('buy-close').onclick=resume;document.querySelectorAll('[data-buy]').forEach(btn=>btn.onclick=()=>{const result=buy(state,btn.dataset.buy);toast(result.message);updateBuy();});
 document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;if(locked){lockIntent=false;if(state.phase!=='menu'&&state.phase!=='matchEnd'){state.paused=false;setOverlay(null);}}else{lockIntent=false;clearInput();if(!activeOverlay&&state.phase!=='menu'&&state.phase!=='matchEnd')pause();}});
 document.addEventListener('pointerlockerror',()=>{lockIntent=false;if(!activeOverlay)pause();});
 document.addEventListener('mousemove',e=>{if(!locked||state.paused||state.phase==='menu')return;const factor=(aim&&state.slot==='sniper'?.00062:.0019)*sensitivity;state.player.yaw-=e.movementX*factor;state.player.pitch=THREE.MathUtils.clamp(state.player.pitch-e.movementY*factor,-1.45,1.45);});
 document.addEventListener('mousedown',e=>{if(!locked||state.paused)return;if(e.button===0){fire=true;fireOnce=true;}if(e.button===2)aim=true;});document.addEventListener('mouseup',e=>{if(e.button===0){fire=false;fireOnce=false;}if(e.button===2)aim=false;});document.addEventListener('contextmenu',e=>e.preventDefault());
 document.addEventListener('wheel',e=>{if(locked&&!state.paused){e.preventDefault();switchWeapon(state,state.slot==='pistol'?1:2);}},{passive:false});
 document.addEventListener('keydown',e=>{
  if(['Tab','Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)&&state.phase!=='menu')e.preventDefault();
  if(e.code==='Escape'&&!locked){if(activeOverlay==='settings')setOverlay(settingsFrom);else if(activeOverlay==='armory')setOverlay('pause');return;}
  if(!locked||state.paused)return;keys.add(e.code);if(e.repeat)return;
  if(e.code==='KeyR')reload(state);if(e.code==='Digit1')switchWeapon(state,1);if(e.code==='Digit2')switchWeapon(state,2);
  if(e.code==='KeyB'){if(Math.hypot(state.player.x-SPAWN.x,state.player.z-SPAWN.z)<=6&&['active','deploy'].includes(state.phase)){pause('armory');updateBuy();}else toast('Return to CT spawn to access the armory.');}
  if(e.code==='Tab')show('scoreboard',true);
 });document.addEventListener('keyup',e=>{keys.delete(e.code);if(e.code==='Tab')show('scoreboard',false);});
 window.addEventListener('blur',()=>{clearInput();if(!activeOverlay&&state.phase!=='menu'&&state.phase!=='matchEnd')pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&!activeOverlay&&state.phase!=='menu'&&state.phase!=='matchEnd')pause();});
 window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=weaponCamera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();weaponCamera.updateProjectionMatrix();});
}
function updateBuy(){$('buy-cash').textContent=`$ ${state.money.toLocaleString()}`;document.querySelectorAll('[data-buy]').forEach(b=>{const cost=b.dataset.buy==='armor'?650:WEAPONS[b.dataset.buy].price;b.disabled=state.money<cost||(b.dataset.buy==='armor'&&state.player.armor>=100);});}
function getInput(){return{forward:(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0),side:(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0),crouch:keys.has('ControlLeft')||keys.has('KeyC'),walk:keys.has('ShiftLeft')||keys.has('ShiftRight'),jump:keys.has('Space'),defuse:keys.has('KeyE'),fire};}
function traceShot(shot){shotCount++;const dir=new THREE.Vector3(-Math.sin(shot.yaw)*Math.cos(shot.pitch),Math.sin(shot.pitch),-Math.cos(shot.yaw)*Math.cos(shot.pitch));raycaster.ray.set(new THREE.Vector3(shot.x,shot.y,shot.z),dir);let distance=100,target=null,headshot=false;
 for(const b of worldBoxes){const hit=raycaster.ray.intersectBox(b,tmpVec);if(hit)distance=Math.min(distance,hit.distanceTo(raycaster.ray.origin));}
 for(const bot of state.bots){if(!bot.alive)continue;const head=new THREE.Sphere(new THREE.Vector3(bot.x,1.69,bot.z),.19);const headHit=raycaster.ray.intersectSphere(head,new THREE.Vector3());const body=new THREE.Box3(new THREE.Vector3(bot.x-.25,.18,bot.z-.22),new THREE.Vector3(bot.x+.25,1.51,bot.z+.22));const bodyHit=raycaster.ray.intersectBox(body,new THREE.Vector3());for(const [hit,isHead] of [[headHit,true],[bodyHit,false]])if(hit&&hit.distanceTo(raycaster.ray.origin)<distance){distance=hit.distanceTo(raycaster.ray.origin);target=bot;headshot=isHead;}}
 if(target)hitBot(state,target.id,shot.damage,headshot);
 const end=raycaster.ray.at(distance,new THREE.Vector3());const start=new THREE.Vector3(.19,-.17,-.6).applyQuaternion(camera.quaternion).add(camera.position);if(shotCount%2===0||state.slot==='sniper')lineEffect(start,end,0xffd292,.065);
 if(!target&&distance<100){const spark=new THREE.Mesh(new THREE.SphereGeometry(.035,5,5),new THREE.MeshBasicMaterial({color:0xffda91}));spark.position.copy(end);scene.add(spark);effects.push({mesh:spark,life:.12});}
}
function lineEffect(a,b,color,life){const mesh=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({color,transparent:true,opacity:.55}));scene.add(mesh);effects.push({mesh,life});}
function processEvents(){for(const e of state.events){audio.play(e.type,e);if(e.type==='shot')flashTime=.055;if(e.type==='hit'){hitTime=.15;$('hitmarker').style.color=e.headshot?'#efb36b':'#fff';}if(e.type==='hurt')damageTime=.4;
 if(e.type==='kill'){feed.push({name:e.name,headshot:e.headshot,time:5});renderFeed();toast(state.bots.every(b=>!b.alive)?'All hostiles down. Defuse the bomb at A.':`${e.name} eliminated · +$300`);}
 if(e.type==='round'){flashTime=hitTime=damageTime=0;beepTime=0;feed.length=0;renderFeed();yaw=state.player.yaw;pitch=state.player.pitch;clearInput();for(const e of effects){scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();}effects.length=0;}
 if(e.type==='botShot'){const b=state.bots[e.id];botModels[e.id].userData.flash.visible=true;botModels[e.id].userData.flashTime=.06;const a=new THREE.Vector3(b.x,1.2,b.z),p=state.player;lineEffect(a,new THREE.Vector3(p.x+(Math.random()-.5)*1.2,p.y+p.eye-.3,p.z),0xffc580,.07);}
 if(e.type==='explosion'){damageTime=1.5;for(let i=0;i<32;i++){const smoke=i>9,mesh=new THREE.Mesh(new THREE.SphereGeometry(smoke?.4:.16,7,5),new THREE.MeshBasicMaterial({color:smoke?0x565957:0xffa451,transparent:true,opacity:.8,depthWrite:false}));mesh.position.set(SITE.x,.4,SITE.z);scene.add(mesh);effects.push({mesh,life:smoke?2.5:.7,velocity:new THREE.Vector3((Math.random()-.5)*6,1+Math.random()*4,(Math.random()-.5)*6),smoke});}}
 if(e.type==='matchEnd'){state.paused=false;clearInput();setOverlay('result');if(document.pointerLockElement)document.exitPointerLock();const won=state.ct>state.t;$('result-title').textContent=won?'SITE SECURED.':'OPERATION LOST.';$('result-eyebrow').textContent=won?'COUNTER-TERRORISTS WIN':'HOSTILES HOLD THE COMPOUND';$('result-text').textContent=`${state.round} rounds · ${state.kills} eliminations · ${state.deaths} deaths. ${won?'Good work, operative.':'Regroup, rearm, and try again.'}`;$('final-score').textContent=`${state.ct} : ${state.t}`;}
 }state.events.length=0;}
function renderFeed(){$('killfeed').innerHTML=feed.map(e=>`<div class="kill-entry"><b>YOU</b><i>${e.headshot?'⌖ HEADSHOT':'━╦━'}</i>${e.name}</div>`).join('');}
function loop(now){const wallDt=Math.max(0,(now-last)/1000);last=now;const dt=Math.min(wallDt,.05);visualTime+=dt;frameSamples.push(wallDt);if(frameSamples.length>180)frameSamples.shift();
 try{
 if(state.phase!=='menu'){update(state,getInput(),dt);if(fire&&locked&&!state.paused&&(state.slot==='rifle'||fireOnce)){const shot=shoot(state,aim);if(shot){traceShot(shot);fireOnce=false;}}processEvents();}
 updateVisuals(dt);updateHUD(dt);renderer.clear();renderer.render(scene,camera);if(state.phase!=='menu'&&state.phase!=='matchEnd'&&state.player?.health>0&&!(aim&&state.slot==='sniper')){renderer.clearDepth();renderer.render(weaponScene,weaponCamera);}requestAnimationFrame(loop);
 }catch(e){fatal(e);}
}
function updateVisuals(dt){
 if(state.phase==='menu'){
 camera.position.set(12+Math.sin(visualTime*.05)*1.3,6.5,8);camera.lookAt(-5,1.5,-11);camera.fov=62;camera.updateProjectionMatrix();for(const b of botModels)b.visible=false;for(const w of Object.values(weapons))w.visible=false;world.bomb.visible=true;
 }else if(state.player){const p=state.player;yaw=p.yaw;pitch=p.pitch;const bob=p.moving&&!state.paused?Math.sin(state.elapsed*13)*.025:0;const dead=p.health<=0;camera.position.set(p.x,p.y+p.eye+bob-(dead?.9:0),p.z);camera.rotation.set(p.pitch,p.yaw,dead?.13:0,'YXZ');const targetFov=aim?(state.slot==='sniper'?23:64):78;camera.fov+=(targetFov-camera.fov)*Math.min(1,dt*14);camera.updateProjectionMatrix();
 for(const [type,w] of Object.entries(weapons)){w.visible=type===state.slot;const reloadProgress=state.reload>0?1-state.reload/WEAPONS[state.slot].reload:0;const reloadDip=Math.sin(reloadProgress*Math.PI);const ads=aim?1:0;w.position.set(.28*(1-ads*.95)+Math.sin(state.elapsed*6)*Math.abs(bob),-.27+ads*.09-reloadDip*.22-(state.defuse>0?.2:0),-.68+state.recoil*.13);w.rotation.set(state.recoil*.16+reloadDip*.48+Math.abs(bob),.10*(1-ads)-reloadDip*.45,-.015-reloadDip*.33);w.scale.setScalar(.72);w.userData.flash.visible=flashTime>0&&w.visible;w.userData.flash.rotation.z=Math.random()*6.28;}
 for(let i=0;i<state.bots.length;i++){const b=state.bots[i],model=botModels[i];model.visible=true;model.position.set(b.x,b.alive?0:-Math.min(.7,b.death*.6),b.z);model.rotation.set(b.alive?0:-Math.min(Math.PI/2,b.death*4),b.yaw,0);model.userData.legs.forEach((leg,j)=>leg.rotation.x=b.alive?Math.sin(b.walk+j*Math.PI)*.36:0);model.userData.flashTime=Math.max(0,(model.userData.flashTime||0)-dt);model.userData.flash.visible=model.userData.flashTime>0&&b.alive;}
 world.bomb.visible=!(state.winner==='CT'||state.reason==='The bomb detonated.');
 }
 if(!state.paused){flashTime=Math.max(0,flashTime-dt);hitTime=Math.max(0,hitTime-dt);damageTime=Math.max(0,damageTime-dt);for(let i=effects.length-1;i>=0;i--){const e=effects[i];e.life-=dt;if(e.velocity){e.mesh.position.addScaledVector(e.velocity,dt);e.mesh.scale.multiplyScalar(1+dt*(e.smoke?.7:1.2));e.mesh.material.opacity=Math.min(.8,e.life*.4);}if(e.life<=0){scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();effects.splice(i,1);}}}
 world.led.visible=Math.sin(visualTime*(state.time<12?17:5))>0;world.light.intensity=world.led.visible?1.2:0;
}
function updateHUD(dt){if(state.phase==='menu')return;const p=state.player,w=WEAPONS[state.slot],a=state.ammo[state.slot];if(!p)return;
 $('ct-score').textContent=state.ct;$('t-score').textContent=state.t;$('round-number').textContent=`ROUND ${String(state.round).padStart(2,'0')}`;const time=state.phase==='deploy'?Math.ceil(state.phaseTime):Math.ceil(state.time);$('clock').textContent=`${Math.floor(time/60)}:${String(time%60).padStart(2,'0')}`;$('clock').style.color=time<=10&&state.phase==='active'?'#ff8d69':'';
 const alive=state.bots.filter(b=>b.alive).length;$('alive').innerHTML=`YOU <i>◆</i> <span>${alive} HOSTILE${alive===1?'':'S'}</span>`;$('health').textContent=Math.ceil(p.health);$('health').style.color=p.health<30?'#ff8766':'';$('armor').textContent=Math.ceil(p.armor);$('cash').textContent=`$ ${state.money.toLocaleString()}`;$('weapon-label').textContent=`${w.name} / ${w.type}`;$('mag').textContent=a.mag;$('reserve').textContent=a.reserve;
 $('reload-label').innerHTML=state.reload>0?`RELOADING ${state.reload.toFixed(1)}s`:a.mag===0?'EMPTY · PRESS R TO RELOAD':`${state.slot==='rifle'?'FULL AUTO':state.slot==='sniper'?'BOLT ACTION':'SEMI AUTO'} <span>1 — PRIMARY &nbsp; 2 — SIDEARM</span>`;
 $('crosshair').style.setProperty('--gap',`${6+state.recoil*17+(p.moving?4:0)}px`);show('crosshair',!(aim&&state.slot==='sniper')&&p.health>0);$('scope').style.display=aim&&state.slot==='sniper'&&p.health>0?'block':'none';$('hitmarker').style.opacity=hitTime>0?'1':'0';$('damage').style.opacity=Math.min(.65,damageTime*.9);
 const near=Math.hypot(p.x-SITE.x,p.z-SITE.z)<SITE.radius&&state.phase==='active'&&p.y<.1;show('interaction',near);$('interaction-label').textContent=state.defuse>0?'DEFUSING — STAY STILL':'HOLD TO DEFUSE';$('defuse-time').textContent=(5-state.defuse).toFixed(1);$('defuse-progress').style.width=`${state.defuse/5*100}%`;
 $('location').textContent=p.z>14?'CT APPROACH':p.z>8?'LONG ARCH':p.x<1?'BOMBSITE A':'EAST COURTYARD';$('objective').style.opacity=state.phase==='active'?'1':'.4';
 let title='',label='',desc='';if(state.phase==='deploy'){label='COUNTER-TERRORIST INSERTION';title=`READY IN ${Math.ceil(state.phaseTime)}`;desc='Clear the compound. Hold E at the bomb to defuse.';}if(state.phase==='roundEnd'){label=`${state.winner==='CT'?'COUNTER-TERRORISTS':'TERRORISTS'} WIN`;title=state.winner==='CT'?'SITE SECURED':'ROUND LOST';desc=`${state.reason} · Next round in ${Math.ceil(state.phaseTime)}`;}
 $('center-note').style.opacity=title?'1':'0';$('center-title').textContent=title;$('center-label').textContent=label;$('center-desc').textContent=desc;
 if(!state.paused){toastTime=Math.max(0,toastTime-dt);let removed=false;for(let i=feed.length-1;i>=0;i--){feed[i].time-=dt;if(feed[i].time<=0){feed.splice(i,1);removed=true;}}if(removed)renderFeed();if(state.phase==='active'){beepTime-=dt;if(beepTime<=0){audio.play('beep');beepTime=state.time<10?.35:state.time<25?.7:1.3;}}}
 $('toast').style.opacity=toastTime>0?'1':'0';$('stat-kills').textContent=state.kills;$('stat-deaths').textContent=state.deaths;$('stat-score').textContent=state.kills*100+state.ct*300;$('score-summary').textContent=`COUNTER-TERRORISTS ${state.ct} : ${state.t} TERRORISTS · ${alive} hostiles remaining · ${state.difficulty.toUpperCase()}`;drawRadar();
}
function drawRadar(){const c=$('radar').getContext('2d'),w=240;c.clearRect(0,0,w,w);c.save();c.beginPath();c.arc(120,120,118,0,Math.PI*2);c.clip();c.fillStyle='#10212bd9';c.fillRect(0,0,w,w);const scale=3.7,x=v=>120+v*scale,z=v=>115+v*scale;c.strokeStyle='#55717b20';c.lineWidth=1;for(let i=0;i<w;i+=20){c.beginPath();c.moveTo(i,0);c.lineTo(i,w);c.moveTo(0,i);c.lineTo(w,i);c.stroke();}
 for(const b of BLOCKS){if(b.y)continue;c.fillStyle=['crate','stack','sandbag','barrel'].includes(b.kind)?'#8c94777a':'#91a5a664';c.fillRect(x(b.x-b.w/2),z(b.z-b.d/2),b.w*scale,b.d*scale);c.strokeStyle='#b4c1b73a';c.strokeRect(x(b.x-b.w/2),z(b.z-b.d/2),b.w*scale,b.d*scale);}
 c.beginPath();c.arc(x(SITE.x),z(SITE.z),12,0,Math.PI*2);c.fillStyle='#efb36b30';c.fill();c.fillStyle='#efb36b';c.font='bold 13px Arial';c.textAlign='center';c.fillText('A',x(SITE.x),z(SITE.z)+4);
 for(const b of state.bots){if(b.alive&&b.seen){c.fillStyle='#e98d68';c.beginPath();c.arc(x(b.x),z(b.z),3,0,7);c.fill();}}
 const p=state.player;c.save();c.translate(x(p.x),z(p.z));c.rotate(-p.yaw);c.beginPath();c.moveTo(0,-7);c.lineTo(4,5);c.lineTo(0,3);c.lineTo(-4,5);c.closePath();c.fillStyle='#c4e8f1';c.shadowColor='#83d9f2';c.shadowBlur=8;c.fill();c.beginPath();c.moveTo(0,0);c.arc(0,0,27,-Math.PI*.68,-Math.PI*.32);c.closePath();c.fillStyle='#addcea20';c.fill();c.restore();c.restore();c.font='9px Arial';c.fillStyle='#bdc9c4';c.fillText('N',116,15);}
function fatal(e){console.error(e);show('loading',false);show('error',true);$('error').textContent=`Unable to start the operation. ${e.message} Reload the page to retry.`;}
// Explicit development fixture, tree-shaken out of production builds.
if(import.meta.env.DEV){window.__counterline={state,snapshot:()=>JSON.parse(JSON.stringify({phase:state.phase,paused:state.paused,player:state.player,ct:state.ct,t:state.t,round:state.round,reason:state.reason,kills:state.kills,deaths:state.deaths,time:state.time,defuse:state.defuse,ammo:state.ammo,slot:state.slot,money:state.money,bots:state.bots,shots:shotCount,fps:frameSamples.length/frameSamples.reduce((a,b)=>a+b,0)})),fixture:(options)=>{if(options.player)Object.assign(state.player,options.player);for(const k of ['phase','time','ct','t','round','phaseTime'])if(k in options)state[k]=options[k];if(options.bots)options.bots.forEach((b,i)=>Object.assign(state.bots[i],b));},hurt:damage=>hurtPlayer(state,damage),hit:(id,damage,head=false)=>hitBot(state,id,damage,head)};}
try{init();}catch(e){fatal(e);}
