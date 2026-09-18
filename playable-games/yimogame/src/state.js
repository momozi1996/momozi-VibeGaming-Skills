export const SAVE_KEY = 'windmeadow-aniimo-prototype-v1';
export const SPECIES = [
 {id:'cloud',name:'绵云',tag:'风',color:'#d7f4ed',accent:'#6dc2b3',note:'一朵不肯回到天空的云。喜欢花香，也喜欢慢慢靠近它的你。',ability:'轻盈跳跃',where:'初遇花甸'},
 {id:'fox',name:'焰尾',tag:'火',color:'#ffd4a5',accent:'#eb9364',note:'尾巴里藏着一整个日落。奔跑时，草叶会被它染成温暖的金色。',ability:'疾风奔跑',where:'日光小径'},
 {id:'aqua',name:'泡泡',tag:'水',color:'#b4e9f2',accent:'#63bad1',note:'河湾里的小小旅行家。头顶的鳍会随着流水轻轻摇摆。',ability:'水上漫步',where:'映蓝河湾'},
 {id:'leaf',name:'芽芽',tag:'木',color:'#e1edb3',accent:'#9db66a',note:'森林写给春天的一封信。头上的叶子总指向最有生机的地方。',ability:'轻盈跳跃',where:'风语林地'}
];
export const WILD = [
 {id:'c1',species:0,x:1,z:7,phase:0}, {id:'f1',species:1,x:13,z:-4,phase:2},
 {id:'a1',species:2,x:29,z:2,phase:4}, {id:'l1',species:3,x:-18,z:-13,phase:1},
 {id:'c2',species:0,x:-15,z:14,phase:3},{id:'f2',species:1,x:8,z:-37,phase:5},
 {id:'a2',species:2,x:34,z:-31,phase:2},{id:'l2',species:3,x:-31,z:-40,phase:5}
];
export const PORTAL = {x:-13,z:-33};
export function createState(){return {version:1,x:0,z:19,y:0,vy:0,yaw:Math.PI,time:0,captured:[],selected:0,twined:false,completed:false,reward:0,orbs:20,capture:null,paused:false,steps:0};}
export function uniqueSpecies(state){return [...new Set(state.captured.map(id=>WILD.find(w=>w.id===id)?.species).filter(v=>v!==undefined))];}
export function canCapture(state,id,distance){return !state.paused&&!state.twined&&!state.capture&&state.orbs>0&&distance<=8&&!state.captured.includes(id)&&WILD.some(w=>w.id===id);}
export function startCapture(state,id,distance){if(!canCapture(state,id,distance))return false;state.capture={id,progress:0};state.orbs--;return true;}
export function stepCapture(state,dt){if(state.paused||!state.capture)return null;state.capture.progress+=dt/1.5;if(state.capture.progress>=1){const id=state.capture.id;state.captured.push(id);state.capture=null;const sp=WILD.find(w=>w.id===id).species;state.selected=sp;return sp;}return null;}
export function completeQuest(state,distance){if(state.paused||state.completed||uniqueSpecies(state).length<3||distance>7)return false;state.completed=true;state.reward=300;state.orbs+=10;return true;}
export function toggleTwine(state){if(state.paused||state.capture||!uniqueSpecies(state).includes(state.selected))return false;state.twined=!state.twined;return true;}
export function selectSpecies(state,index){if(!uniqueSpecies(state).includes(index))return false;state.selected=index;return true;}
export function serialize(state){return JSON.stringify({version:1,x:state.x,z:state.z,captured:state.captured,selected:state.selected,completed:state.completed,reward:state.reward,orbs:state.orbs,steps:state.steps});}
export function restore(raw){const s=createState();try{const d=JSON.parse(raw);if(d?.version!==1)return s;s.captured=[...new Set((Array.isArray(d.captured)?d.captured:[]).filter(v=>WILD.some(w=>w.id===v)))];s.selected=uniqueSpecies(s).includes(d.selected)?d.selected:(uniqueSpecies(s)[0]??0);s.x=Number.isFinite(d.x)?Math.max(-65,Math.min(65,d.x)):0;s.z=Number.isFinite(d.z)?Math.max(-80,Math.min(60,d.z)):19;s.orbs=Number.isInteger(d.orbs)?Math.max(1,Math.min(40,d.orbs)):20;s.completed=d.completed===true&&uniqueSpecies(s).length>=3;s.reward=s.completed?300:0;s.steps=Number.isFinite(d.steps)?Math.max(0,d.steps):0;return s;}catch{return s;}}
export function readSave(storage){try{return restore(storage.getItem(SAVE_KEY));}catch{return createState();}}
export function save(state,storage){try{storage.setItem(SAVE_KEY,serialize(state));return true;}catch{return false;}}
