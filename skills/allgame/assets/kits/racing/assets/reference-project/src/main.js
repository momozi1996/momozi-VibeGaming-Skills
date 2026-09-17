import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createTrack } from './track.js';
import { createKart, CHARACTERS } from './racers.js';
import { createSimulation } from './simulation.js';
import { createUI } from './ui.js';
import { createEffects } from './effects.js';
import { createAudio } from './audio.js';
import './ui.css';

const canvas = document.querySelector('#game-canvas');
const boot = document.querySelector('#boot');
const parameters = new URLSearchParams(location.search);
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
} catch (err) {
  boot.innerHTML = '<strong>夏天还在等你</strong><p>需要支持 WebGL 2 的浏览器，请启用硬件加速后重试。</p>';
  throw err;
}
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.info.autoReset = false;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#a1dfe9');
scene.fog = new THREE.FogExp2('#b8e4e9', 0.00165);
const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.15, 1900);
const sky = new THREE.Mesh(new THREE.SphereGeometry(1300, 36, 20), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { topColor: { value: new THREE.Color('#399fde') }, horizonColor: { value: new THREE.Color('#b1dfeb') }, sunDirection: { value: new THREE.Vector3(-0.35, 0.48, -0.6).normalize() } },
  vertexShader: 'varying vec3 vWorld; void main(){vWorld=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader: `uniform vec3 topColor; uniform vec3 horizonColor; uniform vec3 sunDirection; varying vec3 vWorld;
  void main(){vec3 d=normalize(vWorld); float h=max(d.y,0.0); vec3 col=mix(horizonColor,topColor,pow(h,0.46)); float sun=max(dot(d,sunDirection),0.); col+=vec3(1.,.67,.32)*pow(sun,14.)*.12; col+=vec3(1.8,1.5,.9)*pow(sun,700.); gl_FragColor=vec4(col,1.);}`
}));
sky.renderOrder = -100; scene.add(sky);
const hemisphere = new THREE.HemisphereLight('#c4f1ff', '#c49867', 1.7); scene.add(hemisphere);
const sun = new THREE.DirectionalLight('#fff1d5', 2.9);
sun.position.set(-90, 145, -80); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -65; sun.shadow.camera.right = 65;
sun.shadow.camera.top = 65; sun.shadow.camera.bottom = -65;
sun.shadow.camera.near = 5; sun.shadow.camera.far = 320;
sun.shadow.normalBias = 0.055; sun.shadow.bias = -0.00015; sun.shadow.radius = 3;
scene.add(sun, sun.target);
const pmrem = new THREE.PMREMGenerator(renderer);
const studio = new RoomEnvironment();
const env = pmrem.fromScene(studio, 0.025);
scene.environment = env.texture; scene.environmentIntensity = 0.32;
studio.dispose(); pmrem.dispose();

// Puffy clouds belong to the sky, not a flat painted backdrop.
const cloudGeometry = new THREE.SphereGeometry(1, 14, 9);
const cloudMaterial = new THREE.MeshStandardMaterial({ color: '#fffdf1', roughness: 1, metalness: 0, flatShading: false, fog: true });
const clouds = new THREE.Group();
for (let c=0;c<20;c++) {
  const angle = c*2.39996;
  const group = new THREE.Group();
  group.position.set(Math.sin(angle)*(460+(c%3)*125), 85+(c%5)*18, Math.cos(angle)*(460+(c%3)*125));
  for(let j=0;j<6;j++) {
    const puff = new THREE.Mesh(cloudGeometry,cloudMaterial);
    puff.position.set((j-2.5)*13, Math.sin(j*1.8+c)*5, Math.cos(j*2.2)*8);
    puff.scale.set(17+Math.sin(j+c)*5, 10+Math.cos(j*3)*4, 14); group.add(puff);
  }
  clouds.add(group);
}
scene.add(clouds);

const track = createTrack(scene);
const effects = createEffects(scene);
const audio = createAudio();
let ui, selected = 'mochi', muted = localStorage.getItem('aloha-muted') === '1';
let quality = localStorage.getItem('aloha-quality') || (innerWidth < 800 ? 'balanced' : 'high');
let cameraMode=0, photo=false, photoPrevPhase=null, visualTime=0, lastPhase='menu', snap;
let noticeTimeout=0, menuOrbit=0, fps=60, frames=0, elapsedFrames=0;
const meshById = new Map();
const projectileMeshes=new Map();
const projectileGeometry=new THREE.IcosahedronGeometry(.42,1);
const projectileMaterial=new THREE.MeshStandardMaterial({color:'#fbaf79',emissive:'#db7741',emissiveIntensity:.25,roughness:.45});
const shieldGeometry=new THREE.SphereGeometry(2.05,20,14);
const shieldMaterial=new THREE.MeshPhysicalMaterial({color:'#78e3dc',transparent:true,opacity:.16,roughness:.1,metalness:.12,side:THREE.DoubleSide,depthWrite:false});
const shieldMeshes=new Map();
let hero;
const markerCanvas=document.createElement('canvas');markerCanvas.width=192;markerCanvas.height=96;
const markerContext=markerCanvas.getContext('2d');
markerContext.fillStyle='#173d45';markerContext.beginPath();markerContext.roundRect(38,8,116,48,15);markerContext.fill();
markerContext.beginPath();markerContext.moveTo(83,54);markerContext.lineTo(109,54);markerContext.lineTo(96,71);markerContext.fill();
markerContext.font='900 29px Trebuchet MS';markerContext.fillStyle='#fff4db';markerContext.textAlign='center';markerContext.fillText('YOU',96,42);
const markerTexture=new THREE.CanvasTexture(markerCanvas);markerTexture.colorSpace=THREE.SRGBColorSpace;
const playerMarker=new THREE.Sprite(new THREE.SpriteMaterial({map:markerTexture,transparent:true,depthTest:false,depthWrite:false}));playerMarker.scale.set(2.2,1.1,1);playerMarker.renderOrder=10;scene.add(playerMarker);
const keys = new Set();
const simulation = createSimulation(track, {onEvent(event) {
  audio.event(event); effects.event(event,simulation.racers);
  if(event.isPlayer===false)return;
  if(event.type==='lap') toast(event.lap>=3 ? '最后一圈 · 让夏天加速！' : '新的一圈，继续乘风！');
  if(event.type==='item' && event.action!=='use') toast('获得道具 · 按 E 使用');
  if(event.type==='boost') toast('冲刺！');
  if(event.type==='hit') shake = .3;
  if(event.type==='finish') {
    const now=simulation.state.finishTime || simulation.state.elapsed;
    const previous=Number(localStorage.getItem('aloha-best')||Infinity);
    if(now>0 && now<previous) localStorage.setItem('aloha-best',String(now));
  }
}});
let shake=0;

function toast(message) {
  if(ui?.setToast) ui.setToast(message);
}
function makeHero(id) {
  if(hero) {scene.remove(hero);hero.userData.dispose?.();}
  hero = createKart(id, {hero:true});
  const p = track.sample(0.006,-1.0);
  hero.position.copy(p.position); hero.rotation.y=p.yaw;
  hero.scale.setScalar(innerWidth<700?1.15:1.52);
  scene.add(hero);
}
function rebuildRacers() {
  for(const mesh of meshById.values()) {scene.remove(mesh);mesh.userData.dispose?.();}
  meshById.clear();
  for(const racer of simulation.racers) {
    const mesh = createKart(racer.characterId || (racer.isPlayer?selected:CHARACTERS[meshById.size%CHARACTERS.length].id), { isPlayer:racer.isPlayer });
    mesh.position.copy(racer.position); mesh.rotation.y=racer.yaw;
    meshById.set(racer.id,mesh); scene.add(mesh);
  }
}
function chooseCharacter(id) {
  selected=id; simulation.reset(id); rebuildRacers(); makeHero(id); audio.unlock();
}
function startRace(id) {
  if(typeof id==='string' && CHARACTERS.some(c=>c.id===id)) selected=id;
  photo=false; controls.enabled=false; document.body.classList.remove('photo-mode');
  keys.clear(); window.__touchInput={};
  effects.event({type:'reset'},[]);ui?.setToast('');
  simulation.reset(selected); rebuildRacers(); simulation.start();
  audio.unlock(); audio.setMuted(muted); ui?.setPhase('countdown');
  cameraSettled=false;
  canvas.focus({preventScroll:true});
}
function returnMenu() {
  photo=false; controls.enabled=false; document.body.classList.remove('photo-mode');
  keys.clear(); window.__touchInput={};
  effects.event({type:'reset'},[]);ui?.setToast('');
  simulation.reset(selected); rebuildRacers(); makeHero(selected); ui?.setPhase('menu'); cameraSettled=false;
}
function pause() {
  if(photo) {togglePhoto();return;}
  if(simulation.state.phase==='racing'||simulation.state.phase==='countdown') {
    simulation.togglePause(); keys.clear(); window.__touchInput={}; ui?.setPhase('paused');
  }
}
function resume() {
  if(simulation.state.phase==='paused')simulation.togglePause();
  audio.unlock(); ui?.setPhase(simulation.state.phase); canvas.focus({preventScroll:true});
}
function setMute(value) {
  muted=typeof value==='boolean'?value:!muted;
  audio.unlock(); audio.setMuted(muted); ui?.setMuted(muted);
  localStorage.setItem('aloha-muted',muted?'1':'0');
}
function setQuality(value) {
  quality=(['high','ultra','balanced','low','medium'].includes(value))?value:'high';
  const low=quality==='low', high=quality==='high'||quality==='ultra';
  renderer.setPixelRatio(Math.min(devicePixelRatio,low?0.85:high?1.5:1.1));
  renderer.shadowMap.enabled=!low; sun.castShadow=!low;
  const n=high?2048:1024;
  if(sun.shadow.mapSize.x!==n) {sun.shadow.mapSize.set(n,n);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}}
  bloom.enabled=!low;
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(innerWidth,innerHeight);
  localStorage.setItem('aloha-quality',quality);
}
function cycleCamera() {
  cameraMode=(cameraMode+1)%3; toast(['追逐视角','远景视角','车手视角'][cameraMode]);
}
async function fullscreen() {
  try {if(!document.fullscreenElement) await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{toast('浏览器暂不支持全屏，可使用 F11');}
}
function togglePhoto() {
  if(photo) {
    photo=false; controls.enabled=false; document.body.classList.remove('photo-mode');
    if(photoPrevPhase==='racing'||photoPrevPhase==='countdown') simulation.togglePause();
    ui?.setPhase(simulation.state.phase); cameraSettled=false; return;
  }
  photoPrevPhase=simulation.state.phase;
  if(photoPrevPhase==='racing'||photoPrevPhase==='countdown') simulation.togglePause();
  photo=true; document.body.classList.add('photo-mode');
  const subject=simulation.state.phase==='menu'?hero:meshById.get('player');
  controls.target.copy(subject?.position || new THREE.Vector3()).add(new THREE.Vector3(0,1.4,0));
  controls.enabled=true; controls.update();
}
function savePhoto() {
  const a=document.createElement('a'); a.download=`Aloha-Kart-${new Date().toISOString().replaceAll(':','-')}.png`;
  a.href=canvas.toDataURL('image/png'); a.click();
}

const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.16,.4,1.35);
composer.addPass(bloom);
const finishShader={
  uniforms:{tDiffuse:{value:null},time:{value:0},boost:{value:0},aspect:{value:innerWidth/innerHeight}},
  vertexShader:'varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:`uniform sampler2D tDiffuse; uniform float time,boost,aspect; varying vec2 vUv;
  float hash(float n){return fract(sin(n)*43758.5453);}
  void main(){vec2 p=vUv-.5; vec3 col=texture2D(tDiffuse,vUv).rgb; float edge=dot(p,p); col*=1.-edge*.22;
  float a=atan(p.y,p.x);float id=floor(a*80.);float rays=step(.87,hash(id))*pow(smoothstep(.12,.48,length(p)),3.); float pulse=pow(fract(length(p)*2.-time*2.+hash(id)),12.); col+=vec3(.32,.68,.68)*rays*pulse*boost*.35;
  gl_FragColor=vec4(col,1.);}`
};
const finishPass=new ShaderPass(finishShader); composer.addPass(finishPass);
composer.addPass(new OutputPass());
setQuality(quality);
const controls=new OrbitControls(camera,canvas); controls.enabled=false; controls.enableDamping=true;
controls.minDistance=3;controls.maxDistance=180;controls.maxPolarAngle=Math.PI*.485;controls.target.set(0,2,0);
ui=createUI({characters:CHARACTERS,onStart:startRace,onCharacter:chooseCharacter,onPause:pause,onResume:resume,onRestart:()=>startRace(selected),onMenu:returnMenu,onMute:setMute,onQuality:setQuality,onCamera:cycleCamera,onFullscreen:fullscreen,onPhoto:togglePhoto});
ui.setMuted?.(muted);audio.setMuted(muted);ui.setLoading?.(1);ui.setPhase('menu');
const photoBar=document.createElement('div');photoBar.className='photo-bar';photoBar.innerHTML='<span>POSTCARD MODE <small>拖动环绕 · 滚轮缩放</small></span><button id="photo-save">保存明信片 ↓</button><button id="photo-close">返回游戏 <kbd>P</kbd></button>';
document.body.appendChild(photoBar);
photoBar.querySelector('#photo-save').onclick=savePhoto;photoBar.querySelector('#photo-close').onclick=togglePhoto;
makeHero(selected); rebuildRacers();

const actionKeys=new Set(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','KeyE','KeyR','KeyC','KeyP','Escape']);
window.addEventListener('keydown',e=>{
  if(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement)return;
  if(actionKeys.has(e.code))e.preventDefault();
  keys.add(e.code); if(e.repeat)return;
  if(e.code==='Escape'){if(photo)togglePhoto();else if(simulation.state.phase==='paused')resume();else pause();}
  if(e.code==='KeyM')setMute();
  if(e.code==='KeyC')cycleCamera();
  if(e.code==='KeyP')togglePhoto();
  if(e.code==='KeyF')fullscreen();
  if(e.code==='Enter' && simulation.state.phase==='menu')startRace(ui.getSelectedCharacter?.()||selected);
});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>{keys.clear();window.__touchInput={};if(!parameters.has('test'))pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden && !parameters.has('test'))pause();});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('resize',()=>{if(hero)hero.scale.setScalar(innerWidth<700?1.15:1.52);cameraSettled=false;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight);finishShader.uniforms.aspect.value=camera.aspect;});
function readInput() {
  const t=window.__touchInput||{};
  const gp=navigator.getGamepads?.()?.find(g=>g?.connected);
  let steer=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
  if(Math.abs(gp?.axes[0]||0)>.12)steer=gp.axes[0];
  return {
    throttle:Math.max(keys.has('KeyW')||keys.has('ArrowUp')||parameters.has('autoplay')||window.__autoDrive?1:0,t.throttle||0,gp?.buttons[7]?.value||0),
    brake:Math.max(keys.has('KeyS')||keys.has('ArrowDown')?1:0,t.brake||0,gp?.buttons[6]?.value||0),
    steer:Math.max(-1,Math.min(1,steer+(t.steer||0))),
    drift:keys.has('Space')||keys.has('ShiftLeft')||!!t.drift||!!gp?.buttons[0]?.pressed,
    item:keys.has('KeyE')||!!t.item||!!gp?.buttons[2]?.pressed,
    reset:keys.has('KeyR'),assist:parameters.has('autoplay')||!!window.__autoDrive
  };
}

const forward=new THREE.Vector3(),right=new THREE.Vector3(),desiredCamera=new THREE.Vector3(),desiredLook=new THREE.Vector3(),smoothLook=new THREE.Vector3();
let cameraSettled=false;let lastChasePosition=null;
function updateCamera(dt,time) {
  if(photo){controls.update();return;}
  const phase=simulation.state.phase;
  if(phase==='menu') {
    lastChasePosition=null;
    const yaw=hero.rotation.y;
    forward.set(Math.sin(yaw),0,Math.cos(yaw));right.set(Math.cos(yaw),0,-Math.sin(yaw));
    // Front three-quarter portrait: the cat is center-right; text occupies the negative space.
    const portrait=innerWidth<700;
    const orbit=Math.sin(time*.11)*.75;
    desiredCamera.copy(hero.position).addScaledVector(forward,portrait?12.5:12.4).addScaledVector(right,8+orbit);desiredCamera.y+=portrait?7.8:6.6;
    desiredLook.copy(hero.position).addScaledVector(right,portrait?-0.7:-5.1);desiredLook.y+=portrait?1.7:1.8;
    camera.fov=THREE.MathUtils.damp(camera.fov,portrait?57:44,3,dt);
  } else {
    const p=simulation.racers.find(r=>r.isPlayer)||simulation.racers[0];
    if(lastChasePosition && cameraSettled){const motion=p.position.clone().sub(lastChasePosition);camera.position.add(motion);smoothLook.add(motion);}
    if(!lastChasePosition)lastChasePosition=p.position.clone();else lastChasePosition.copy(p.position);
    forward.set(Math.sin(p.yaw),0,Math.cos(p.yaw));right.set(Math.cos(p.yaw),0,-Math.sin(p.yaw));
    const boosted=(typeof p.boost==='number'?p.boost:0)>0;
    const portrait=innerWidth<700;
    const back=cameraMode===2?1.5:cameraMode===1?15.5:8.3;
    const height=cameraMode===2?3.05:cameraMode===1?8.8:4.7;
    desiredCamera.copy(p.position).addScaledVector(forward,-back).addScaledVector(right,-(p.drift?Number(p.steer||0)*1.2:0));desiredCamera.y+=height;
    desiredLook.copy(p.position).addScaledVector(forward,cameraMode===2?20:11);desiredLook.y+=cameraMode===2?1.8:1.05;
    const fov=cameraMode===2?79:portrait?73:58;
    camera.fov=THREE.MathUtils.damp(camera.fov,fov+(boosted?8:0)+Math.min(p.speed||0,40)*.075,3,dt);
    if(phase==='finished') {
      desiredCamera.copy(p.position).addScaledVector(forward,11).addScaledVector(right,9);desiredCamera.y+=6;
      desiredLook.copy(p.position);desiredLook.y+=1.7;
    }
  }
  if(!cameraSettled){camera.position.copy(desiredCamera);smoothLook.copy(desiredLook);cameraSettled=true;}
  else {camera.position.lerp(desiredCamera,1-Math.exp(-dt*6));smoothLook.lerp(desiredLook,1-Math.exp(-dt*8));}
  if(shake>0){camera.position.x+=Math.sin(time*80)*shake*.14;camera.position.y+=Math.cos(time*69)*shake*.08;shake=Math.max(0,shake-dt);}
  camera.lookAt(smoothLook);camera.updateProjectionMatrix();
}
function updateWorld(dt,time) {
  const phase=simulation.state.phase;
  const player=simulation.racers.find(r=>r.isPlayer);
  playerMarker.visible=!photo && ['racing','countdown'].includes(phase);
  if(player){playerMarker.position.copy(player.position);playerMarker.position.y+=4.15;}
  hero.visible=phase==='menu';
  if(hero.visible)hero.userData.animate?.({time,speed:0,steer:Math.sin(time*.8)*.12,drift:false,boost:0,dt});
  for(const r of simulation.racers) {
    const mesh=meshById.get(r.id);if(!mesh)continue;
    mesh.visible=phase!=='menu';mesh.position.copy(r.position);
    // Near-camera opponents must not cover the local driver's entire silhouette.
    if(player && !r.isPlayer && !photo && phase!=='finished' && phase!=='menu'){
      const dx=r.position.x-player.position.x,dz=r.position.z-player.position.z;
      const behind=dx*Math.sin(player.yaw)+dz*Math.cos(player.yaw);
      const side=dx*Math.cos(player.yaw)-dz*Math.sin(player.yaw);
      if(behind < -2.5 && behind > -15 && Math.abs(side)<4.2)mesh.visible=false;
    }
    const target=r.yaw;
    mesh.rotation.y+=THREE.MathUtils.euclideanModulo(target-mesh.rotation.y+Math.PI,Math.PI*2)-Math.PI;
    mesh.userData.animate?.({time,speed:r.speed||0,steer:r.steer||0,drift:r.drift||false,boost:r.boost||0,dt});
  }
  if(!photo && phase!=='paused')track.update?.(time,dt);
  for(const r of simulation.racers){
    let shield=shieldMeshes.get(r.id);
    if(!shield){shield=new THREE.Mesh(shieldGeometry,shieldMaterial);shieldMeshes.set(r.id,shield);scene.add(shield);}
    shield.visible=phase!=='menu' && r.shield>0;shield.position.copy(r.position);shield.position.y+=1.5;
    shield.scale.setScalar(1+Math.sin(time*5)*.025);
  }
  const activeProjectileIds=new Set();
  for(const p of simulation.projectiles||[]){
    activeProjectileIds.add(p.id);let m=projectileMeshes.get(p.id);
    if(!m){m=new THREE.Mesh(projectileGeometry,projectileMaterial);projectileMeshes.set(p.id,m);scene.add(m);}
    m.position.copy(p.position);m.position.y+=.7;m.rotation.set(time*8,time*10,0);
  }
  for(const [id,m]of projectileMeshes)if(!activeProjectileIds.has(id)){scene.remove(m);projectileMeshes.delete(id);}
  if(phase!=='paused' && !photo)effects.update(dt,time,phase==='menu'?[]:simulation.racers);
  clouds.rotation.y=Math.sin(time*.007)*.025;
  const subject=phase==='menu'?hero.position:(simulation.racers.find(r=>r.isPlayer)?.position || hero.position);
  sun.target.position.copy(subject);sun.position.copy(subject).add(new THREE.Vector3(-75,120,-55));
}
let previous=performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt=Math.min((now-previous)/1000,.05);previous=now;
  visualTime+=dt;
  if(!photo)simulation.update(dt,readInput());
  snap=simulation.getSnapshot();
  if(snap.phase!==lastPhase){ui.setPhase(snap.phase);lastPhase=snap.phase;}
  updateWorld(dt,visualTime);updateCamera(dt,visualTime);
  if(!photo)ui.update(snap);
  if((frames%3)===0)ui.drawMap?.(track.mapPoints,simulation.racers);
  audio.update(snap,dt);
  finishPass.uniforms.time.value=visualTime;
  finishPass.uniforms.boost.value=THREE.MathUtils.damp(finishPass.uniforms.boost.value,(snap.boost||0)>0?1:0,5,dt);
  renderer.info.reset();composer.render(dt);
  frames++;elapsedFrames+=dt;
  if(elapsedFrames>1){fps=frames/elapsedFrames;frames=0;elapsedFrames=0;}
  window.__ready=true;
}
requestAnimationFrame(frame);
boot.style.opacity='0';setTimeout(()=>boot.hidden=true,650);

// Deliberate test hooks, also useful for local tuning. No network or telemetry.
window.__game={scene,renderer,camera,track,simulation,ui,CHARACTERS,start:startRace,menu:returnMenu,pause,resume,setQuality,chooseCharacter,togglePhoto,savePhoto,step:(dt,input)=>{const result=simulation.update(dt,input);if(dt>1)cameraSettled=false;return result;},get snapshot(){return simulation.getSnapshot();},get stats(){return{fps,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,quality,phase:simulation.state.phase,meshes:meshById.size};}};
if(parameters.has('autoplay'))setTimeout(()=>startRace(selected),1500);

import './shell.css';

import './fonts.css';
