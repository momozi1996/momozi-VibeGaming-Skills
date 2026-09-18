import './ui/styles.css';
import {Match} from './combat/Match';
import {FixedLoop} from './combat/FixedLoop';
import {KeyboardInput} from './input/KeyboardInput';
import {CPU} from './input/CPU';
import {Renderer} from './rendering/Renderer';
import {AudioSystem} from './audio/AudioSystem';
import {UI} from './ui/UI';
import {debugText} from './debug/DebugView';
import {neutralInput,type CharacterId,type Mode} from './combat/types';
const input=new KeyboardInput(),renderer=new Renderer(),audio=new AudioSystem();
let match=new Match(),cpu=new CPU(),playing=false,ready=false,paused=false,starting=false;let updateCount=0;
const ui=new UI({start,pause:()=>setPause(true),resume:()=>setPause(false),rematch:()=>start(ui.selected,ui.mode),menu:()=>{
 playing=false;paused=false;loop.paused=false;renderer.menu=true;ui.showMenu();input.clear();audio.setMusic(false);
},mute:()=>audio.toggle(),music:on=>{void audio.unlock().then(()=>audio.setMusic(on));},debug:()=>{renderer.debug=!renderer.debug;ui.setDebug(renderer.debug,debugText(match));return renderer.debug;},step:()=>tick(true),reset:()=>match.resetTraining(),touch:(n,d)=>input.setTouch(n,d),select:()=>{renderer.menuSelection=ui.selected;audio.select();}});
const loop=new FixedLoop(()=>tick(),dt=>{
 renderer.render(match.state,dt);
 if(playing)ui.update(match.state);
 if(renderer.debug)ui.setDebug(true,debugText(match));
 if(updateCount++%30===0)ui.fps(loop.fps);
});
async function start(character:CharacterId,mode:Mode){
 if(!ready||starting)return;starting=true;
 try{await audio.unlock();match=new Match(character,character==='ava'?'ren':'ava',mode);cpu=new CPU();playing=true;paused=false;input.clear();loop.paused=false;loop.resetClock();renderer.menu=false;ui.showGame();}
 finally{starting=false;}
}
function tick(single=false){
 if(!playing){match.state.fighters.forEach(f=>f.age++);input.finishFrame();return;}
 if(paused&&!single)return;
 const p1=input.sample(0),p2=match.state.mode==='versus'?input.sample(1):match.state.mode==='training'?neutralInput():match.state.phase==='fight'?cpu.sample(match.state.fighters[1],match.state.fighters[0]):neutralInput();
 match.step([p1,p2]);input.finishFrame();renderer.events(match.state.events);audio.events(match.state.events);
}
function setPause(value:boolean){if(!playing||match.state.phase==='result')return;paused=value;loop.paused=value;input.clear();loop.resetClock();ui.pause(value);}
window.addEventListener('keydown',e=>{
 if(document.querySelector('dialog[open]'))return;
 if(e.repeat)return;
 if(!playing&&ready){if(e.code==='Enter'){e.preventDefault();void start(ui.selected,ui.mode);}if(e.code==='ArrowUp'||e.code==='ArrowDown'){e.preventDefault();ui.cycleMode(e.code==='ArrowDown'?1:-1);}if(e.code==='ArrowLeft'||e.code==='ArrowRight')ui.select(ui.selected==='ava'?'ren':'ava');}
 if(e.code==='Escape'){e.preventDefault();setPause(!paused);}
 if(e.code==='F2'){e.preventDefault();renderer.debug=!renderer.debug;ui.setDebug(renderer.debug,debugText(match));}
 if(e.code==='KeyN'&&paused)tick(true);
 if(e.code==='KeyR'&&playing)match.resetTraining();
});
window.addEventListener('blur',()=>setPause(true));document.addEventListener('visibilitychange',()=>{if(document.hidden)setPause(true);});
renderer.init(ui.stage).then(()=>{ready=true;ui.ready();loop.start();(window as any).__ready=true;}).catch(err=>{console.error(err);ui.error(String(err));});
// Opt-in automation API. Not part of normal controls; allows reproducible boundary scenarios.
if(import.meta.env.DEV||new URLSearchParams(location.search).has('debug'))Object.assign(window,{neon:{get match(){return match;},get paused(){return paused;},start,setPause,tick:()=>tick(true),get renderer(){return renderer;},get loop(){return loop;}}});
