import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {ball,link,mat} from './world.js';
import {SPECIES} from './state.js';
export function bake(root){root.updateMatrixWorld(true);const inv=root.matrixWorld.clone().invert(), buckets=new Map(),remove=[];root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const key=o.material.uuid;const b=buckets.get(key)||{m:o.material,g:[]};const g=o.geometry.clone();g.applyMatrix4(inv.clone().multiply(o.matrixWorld));b.g.push(g);buckets.set(key,b);remove.push(o);});remove.forEach(o=>o.removeFromParent());for(const b of buckets.values()){const m=new T.Mesh(mergeGeometries(b.g.map(g=>g.index?g.toNonIndexed():g)),b.m);m.castShadow=true;m.receiveShadow=true;root.add(m);b.g.forEach(g=>g.dispose());}}
function group(parent,x=0,y=0,z=0){const g=new T.Group();g.position.set(x,y,z);parent.add(g);return g;}
function torus(parent,color,r,t,x,y,z,rotation=0){const m=new T.Mesh(new T.TorusGeometry(r,t,8,24),mat(color));m.position.set(x,y,z);m.rotation.x=rotation;m.castShadow=true;parent.add(m);return m;}
function eye(parent,x,y,z,s=.08){ball(parent,'#303e4a',x,y,z,s,s*1.25,s*.55);ball(parent,'#ffffff',x-s*.26,y+s*.36,z+s*.52,s*.27);}
export function makeExplorer(){const root=new T.Group();const body=group(root);const pink='#df9b85',cream='#fff7e7',skin='#f5cdb0',hair='#514641',navy='#40556a',blue='#4281ad';
 // An actual layered little explorer: ponytail, jacket, harness, backpack, socks and trainers.
 const torso=group(body,0,1.24,0);ball(torso,pink,0,.16,0,.37,.4,.23);ball(torso,cream,0,.2,.205,.24,.32,.035);ball(torso,skin,0,.54,0,.12,.14,.12);
 for(const s of [-1,1]){link(torso,[s*.12,.45,.2],[s*.27,.16,.22],.065,.04,cream);link(torso,[s*.27,.4,-.14],[s*.25,-.17,-.18],.045,.045,navy);ball(torso,cream,s*.26,.14,.223,.02,.09,.025);}
 ball(torso,navy,0,-.24,0,.31,.22,.23);torus(torso,'#a78d63',.26,.035,0,-.18,0,Math.PI/2);
 ball(torso,blue,0,.14,-.3,.32,.37,.18);ball(torso,'#70b5d5',0,.16,-.435,.245,.26,.05);ball(torso,blue,0,-.04,-.47,.2,.095,.04);link(torso,[-.3,-.09,-.44],[.3,-.09,-.44],.035,.035,'#b07e51');ball(torso,'#e9e5c8',.18,-.08,-.49,.034,.05,.02);ball(torso,'#b9d5d8',-.34,-.06,-.32,.07,.16,.07);
 const head=group(body,0,1.98,.015);ball(head,skin,0,0,0,.3,.34,.27);ball(head,hair,0,.095,-.08,.315,.3,.23);
 for(const s of [-1,1]){ball(head,skin,s*.3,-.035,0,.055,.085,.045);ball(head,hair,s*.25,-.015,.03,.075,.19,.12);eye(head,s*.11,.025,.25,.048);ball(head,'#eaa895',s*.17,-.08,.231,.052,.024,.022);}
 ball(head,skin,0,-.055,.279,.04,.045,.035);ball(head,'#aa6f67',0,-.145,.24,.045,.014,.015);
 for(let i=-2;i<=2;i++){const lock=ball(head,hair,i*.093,.19,.19,.071,.17,.077);lock.rotation.z=i*.15;}
 ball(head,pink,0,.255,-.015,.33,.17,.28);ball(head,'#edb29b',0,.216,.24,.31,.035,.21);ball(head,'#c68774',0,.427,-.03,.035,.018,.035);ball(head,cream,0,.31,.24,.065,.052,.016);
 const pony=group(body,0,2.01,-.26);ball(pony,hair,0,-.19,-.04,.15,.31,.15);const strand=ball(pony,hair,0,-.46,-.085,.1,.26,.105);strand.rotation.x=-.15;torus(pony,'#dfb065',.095,.021,0,-.005,0,Math.PI/2);bake(pony);
 const arms=[],legs=[];
 for(const s of [-1,1]){const arm=group(body,s*.39,1.57,0);arm.rotation.z=-s*.12;ball(arm,pink,0,-.18,0,.13,.25,.14);ball(arm,cream,0,-.37,0,.13,.048,.137);ball(arm,skin,0,-.51,.02,.095,.16,.095);ball(arm,skin,0,-.66,.025,.09,.12,.085);bake(arm);arms.push(arm);
 const leg=group(root,s*.18,1.02,0);ball(leg,navy,0,-.12,0,.15,.21,.19);ball(leg,skin,0,-.38,0,.103,.22,.11);ball(leg,cream,0,-.64,0,.112,.15,.112);torus(leg,blue,.11,.02,0,-.61,0,Math.PI/2);ball(leg,cream,0,-.87,.067,.145,.13,.24);ball(leg,navy,0,-.97,.066,.148,.035,.24);ball(leg,blue,0,-.79,-.05,.13,.07,.1);for(let j=0;j<3;j++)link(leg,[-.075,-.77-j*.03,.15],[.075,-.77-j*.03,.15],.012,.012,navy);bake(leg);legs.push(leg);}
 // Bake only the static body pieces, retaining animation pivots.
 bake(torso);bake(head);
 return {root,update(t,moving,air,capturing){const v=moving?Math.sin(t*10):0;legs[0].rotation.x=v*.64;legs[1].rotation.x=-v*.64;arms[0].rotation.x=-v*.45;arms[1].rotation.x=capturing?-1.25:v*.45;body.position.y=moving?Math.abs(Math.sin(t*10))*.045:Math.sin(t*2)*.014;pony.rotation.x=v*.08+.08;root.rotation.z=air?-.04:0;}};
}
export function makePet(index,scale=1){const root=new T.Group();root.scale.setScalar(scale);const body=group(root),legs=[],ears=[];const colors=[['#f4f5df','#89c8bc'],['#eba367','#fff0d4'],['#9ad7e1','#ddeef1'],['#c4d798','#f6f0ce']][index];
 if(index===0){
 ball(body,colors[0],0,.69,0,.59,.51,.49);
 const puffs=[[0,1.08,0,.29],[-.38,.9,.15,.26],[.36,.89,.14,.28],[-.42,.66,-.1,.29],[.42,.68,-.11,.27],[-.2,.99,-.29,.28],[.23,1,-.3,.26],[0,.72,-.43,.3],[-.27,.5,.18,.26],[.28,.51,.18,.27]];
 puffs.forEach(([x,y,z,s])=>ball(body,'#fbf9e9',x,y,z,s));ball(body,colors[1],0,.8,.43,.345,.3,.14);ball(body,'#d2e5c9',0,.67,.52,.235,.13,.07);
 for(const s of [-1,1]){const ear=group(body,s*.43,.97,.25);const e=ball(ear,colors[1],s*.08,0,0,.19,.09,.11);ear.rotation.z=s*.28;ears.push(ear);eye(body,s*.115,.83,.565,.054);ball(body,'#f2bfac',s*.21,.729,.534,.065,.04,.023);const horn=new T.Mesh(new T.TorusGeometry(.12,.043,7,18,Math.PI*1.7),mat('#bca77a'));horn.position.set(s*.38,1.07,.34);horn.rotation.y=s*.2;body.add(horn);}
 ball(body,'#506662',0,.725,.603,.034,.02,.017);ball(body,'#f3f4de',0,1.025,.445,.19,.14,.12);
 } else if(index===1){
 ball(body,colors[0],0,.53,-.1,.36,.42,.5);ball(body,colors[1],0,.54,.3,.27,.34,.1);ball(body,colors[0],0,1.06,.23,.43,.4,.36);ball(body,colors[1],0,.88,.48,.3,.18,.18);
 for(const s of [-1,1]){const ear=group(body,s*.29,1.33,.18);ball(ear,colors[0],0,.16,0,.17,.34,.115).rotation.z=-s*.22;ball(ear,'#824d4b',0,.2,.09,.084,.18,.027).rotation.z=-s*.22;ears.push(ear);eye(body,s*.15,1.075,.541,.064);ball(body,'#d98262',s*.28,.96,.475,.071,.03,.024);ball(body,colors[1],s*.28,.85,.31,.21,.08,.18).rotation.z=s*.4;}
 ball(body,'#3d4647',0,.915,.651,.06,.043,.031);const tail=group(root,0,.57,-.44);const t=ball(tail,colors[0],.15,.28,-.34,.26,.47,.35);t.rotation.x=-.7;const tip=ball(tail,colors[1],.18,.57,-.55,.23,.23,.23);ears.push(tail);bake(tail);
 } else if(index===2){
 ball(body,colors[0],0,.48,0,.45,.39,.54);ball(body,colors[1],0,.42,.39,.3,.25,.11);ball(body,colors[0],0,.88,.21,.43,.32,.34);
 for(const s of [-1,1]){eye(body,s*.16,.91,.513,.064);ball(body,'#dca8bb',s*.29,.805,.444,.07,.037,.023);const fin=group(body,s*.38,.92,.04);for(let j=0;j<3;j++){const f=ball(fin,j%2?'#e4afcc':'#a5bada',s*(.12+j*.04),.15-j*.12,0,.18,.095,.054);f.rotation.z=s*(.5-j*.5);}ears.push(fin);}
 ball(body,'#65718a',0,.8,.547,.045,.018,.02);const crest=ball(body,'#b7b8dc',0,1.19,.08,.12,.2,.12);crest.rotation.x=-.4;const tail=ball(body,colors[0],0,.43,-.63,.21,.15,.47);ball(body,'#afbbe0',0,.46,-.94,.24,.12,.17);
 } else {
 ball(body,colors[0],0,.59,0,.47,.5,.39);ball(body,colors[1],0,.55,.32,.33,.32,.12);ball(body,colors[0],0,1,.04,.38,.33,.32);
 for(const s of [-1,1]){eye(body,s*.135,1.04,.332,.065);ball(body,'#d8b599',s*.22,.92,.305,.065,.038,.024);const wing=group(body,s*.4,.64,0);ball(wing,'#83ad6b',s*.06,0,0,.15,.28,.21).rotation.z=s*.3;ears.push(wing);}
 ball(body,'#d2aa68',0,.919,.397,.083,.048,.07);link(body,[0,1.24,0],[0,1.56,0],.035,.025,'#76925d');for(const s of [-1,1]){const l=ball(body,'#8db36a',s*.16,1.52,0,.24,.08,.12);l.rotation.z=s*.3;}
 }
 for(const s of [-1,1]){const leg=group(root,s*(index===0?.26:.23),.3,.17);ball(leg,index===0?'#91b8a9':colors[0],0,-.12,0,.115,.17,.145);if(index===3)ball(leg,'#bc985c',0,-.21,.07,.125,.045,.14);bake(leg);legs.push(leg);}
 bake(body); // ears are now part of the baked head silhouette; animate the whole body softly.
 return {root,update(t,moving=false){body.position.y=Math.sin(t*2.3)*.035+(moving?Math.abs(Math.sin(t*9))*.09:0);body.rotation.z=Math.sin(t*1.7)*.025;legs[0].rotation.x=moving?Math.sin(t*9)*.55:0;legs[1].rotation.x=moving?-Math.sin(t*9)*.55:0;}};
}
export function createPortraits(renderer){const output=[];const scene=new T.Scene();scene.add(new T.HemisphereLight('#ffffff','#9dad95',2.5));const l=new T.DirectionalLight('#fff2df',3);l.position.set(-3,5,4);scene.add(l);const camera=new T.PerspectiveCamera(30,1,.1,20);camera.position.set(1.7,1.55,3.7);camera.lookAt(0,.85,0);const oldSize=renderer.getSize(new T.Vector2()),dpr=renderer.getPixelRatio(),alpha=renderer.getClearAlpha(),color=renderer.getClearColor(new T.Color());renderer.setPixelRatio(1);renderer.setSize(360,360,false);renderer.setClearColor(0,0);
 for(let i=0;i<4;i++){const pet=makePet(i);scene.add(pet.root);renderer.render(scene,camera);output.push(renderer.domElement.toDataURL('image/png'));scene.remove(pet.root);}renderer.setSize(oldSize.x,oldSize.y,false);renderer.setPixelRatio(dpr);renderer.setClearColor(color,alpha);return output;}
