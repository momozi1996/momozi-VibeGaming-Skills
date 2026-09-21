import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const m={gun:mat(0x263237,.39,.78),edge:mat(0x59656a,.45,.8),black:mat(0x121b20,.85),wood:mat(0x895137,.7),woodDark:mat(0x563a29,.8),skin:mat(0x9c7755,.9),glove:mat(0x3d4946,.94),cloth:mat(0x747968,.95),vest:mat(0x343f3d,.9),tan:mat(0xa18a61,.92),boot:mat(0x333a37,.95),glass:mat(0x222e30,.22,.5)};
// Fine deterministic surface detail keeps the close-up viewmodel from reading as flat plastic.
function surface(material,base,grain=false){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=base;ctx.fillRect(0,0,256,256);let n=91;const rng=()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296;};for(let i=0;i<5000;i++){ctx.fillStyle=`rgba(20,19,15,${rng()*.19})`;ctx.fillRect(rng()*256,rng()*256,grain?.5:1,grain?rng()*65:1);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;material.color.set(0xffffff);material.map=t;material.bumpMap=t;material.bumpScale=.004;}
surface(m.wood,'#805237',true);surface(m.woodDark,'#513d2c',true);surface(m.cloth,'#747968');surface(m.vest,'#343f3d');
function box(g,x,y,z,w,h,d,material){const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,1,Math.min(w,h,d)*.12),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function cyl(g,x,y,z,r,h,material,axis='z',r2=r){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r2,h,12),material);if(axis==='z')o.rotation.x=Math.PI/2;o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
function capsule(g,x,y,z,r,length,material){const o=new THREE.Mesh(new THREE.CapsuleGeometry(r,length,4,8),material);o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
export function makeWeapon(type='rifle',hands=true){const g=new THREE.Group();
 if(type==='pistol'){
  box(g,0,0,-.06,.1,.13,.34,m.gun);box(g,0,.073,-.055,.094,.025,.32,m.edge);box(g,0,-.12,.055,.085,.19,.13,m.black).rotation.x=-.17;box(g,0,-.095,-.06,.015,.04,.025,m.edge);box(g,0,-.15,-.06,.012,.014,.1,m.gun);cyl(g,0,.01,-.24,.026,.06,m.black);box(g,0,.094,-.16,.018,.02,.02,m.black);box(g,0,.094,.07,.07,.023,.025,m.black);
 }else{
  const sn=type==='sniper';box(g,0,0,0,.13,.15,.44,m.gun);box(g,0,.085,-.05,.105,.035,.5,m.edge);box(g,0,.1,-.045,.035,.015,.45,m.black);
  // Receiver machining, bolt handle, charging latch and pins.
  box(g,.071,.015,.02,.012,.05,.17,m.black);cyl(g,.08,-.025,.13,.017,.018,m.edge,'x');box(g,.106,.03,.025,.065,.024,.036,m.edge);for(let j=0;j<3;j++)cyl(g,.077,-.04,-.14+j*.105,.008,.014,m.edge,'y');
  const guard=box(g,0,-.19,.08,.09,.26,.125,m.black);guard.rotation.x=-.24;
  box(g,0,-.105,-.075,.018,.025,.033,m.edge);box(g,0,-.145,-.08,.022,.018,.17,m.gun);box(g,0,-.105,-.157,.021,.07,.025,m.gun);
  box(g,0,.003,.35,.12,.15,.35,sn?m.black:m.wood);box(g,0,-.035,.56,.145,.21,.09,m.black);box(g,0,.025,.34,.133,.06,.27,sn?m.gun:m.woodDark);
  box(g,0,.008,-.39,.15,.16,.32,sn?m.black:m.wood);for(let i=0;i<5;i++){box(g,.078,.022,-.5+i*.045,.015,.055,.013,m.black);box(g,-.078,.022,-.5+i*.045,.015,.055,.013,m.black);}
  cyl(g,0,.04,-.77,.031,sn?.71:.52,m.gun);cyl(g,0,.09,-.54,.022,.32,m.black);cyl(g,0,.04,sn?-1.17:-1.06,sn?.045:.036,.13,m.black);cyl(g,0,.04,sn?-1.238:-1.129,.022,.01,m.edge);cyl(g,0,.04,sn?-1.245:-1.135,.016,.01,m.black);
  box(g,0,.12,-.89,.023,.15,.035,m.gun);box(g,0,.205,-.89,.084,.02,.038,m.gun);for(const x of [-.034,.034])box(g,x,.18,-.89,.016,.06,.025,m.gun);box(g,0,.175,-.89,.01,.035,.013,m.edge);box(g,0,.14,-.075,.105,.03,.04,m.black);
  const shape=new THREE.Shape();shape.moveTo(-.11,0);shape.lineTo(.07,0);shape.bezierCurveTo(.07,-.16,.17,-.31,.23,-.39);shape.lineTo(.045,-.44);shape.bezierCurveTo(-.065,-.28,-.1,-.12,-.11,0);const mag=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.09,bevelEnabled:true,bevelSize:.012,bevelThickness:.005,bevelSegments:1,steps:1}),m.black);mag.rotation.y=Math.PI/2;mag.position.set(-.045,-.08,-.18);g.add(mag);for(let i=0;i<3;i++)box(g,.052,-.15-i*.07,-.12-i*.029,.008,.03,.15,m.gun);
  if(sn){box(g,0,.17,.05,.14,.14,.23,m.gun);cyl(g,0,.27,-.07,.067,.48,m.black);cyl(g,0,.27,-.33,.095,.13,m.gun);cyl(g,0,.27,-.401,.076,.008,m.glass);cyl(g,0,.27,.19,.076,.08,m.black);cyl(g,0,.36,-.03,.04,.075,m.edge,'y');box(g,.11,.025,.12,.14,.045,.04,m.gun);}
 }
 if(hands){const right=new THREE.Group();capsule(right,.025,-.23,.2,.063,.28,m.glove).rotation.x=-.52;const arm=capsule(right,.06,-.4,.36,.074,.35,m.cloth);arm.rotation.x=-.58;box(right,.025,-.15,.1,.11,.13,.11,m.glove);for(let i=0;i<4;i++)box(right,-.045,-.13+i*.023,.08,.028,.017,.075,m.black);g.add(right);
 if(type!=='pistol'){const arm=capsule(g,-.14,-.31,-.19,.07,.38,m.cloth);arm.rotation.z=-.5;arm.rotation.x=.55;box(g,-.045,-.096,-.36,.135,.11,.15,m.glove);for(let i=0;i<4;i++)box(g,.03,-.09,-.42+i*.027,.03,.07,.024,m.black);}}
 const flash=new THREE.Group();const flashMat=new THREE.MeshBasicMaterial({color:0xffd88c,transparent:true,opacity:.95,depthWrite:false,side:THREE.DoubleSide});for(let i=0;i<3;i++){const p=new THREE.Mesh(new THREE.PlaneGeometry(.24,.24),flashMat);p.rotation.z=i*Math.PI/3;flash.add(p);}flash.position.set(0,type==='pistol'?.01:.04,type==='pistol'?-.3:type==='sniper'?-1.33:-1.21);flash.visible=false;g.add(flash);g.userData.flash=flash;return g;
}
export function makeBot(){const g=new THREE.Group();
 const torso=capsule(g,0,1.18,0,.22,.3,m.cloth);torso.scale.set(1,.98,.7);box(g,0,1.19,.105,.4,.4,.13,m.vest);box(g,0,1.2,-.13,.36,.36,.1,m.vest);for(const x of [-.12,0,.12])box(g,x,1.13,.194,.095,.17,.07,m.tan);for(const x of [-.16,.16])box(g,x,1.36,.15,.07,.19,.035,m.vest);box(g,0,.96,0,.4,.065,.25,m.boot);for(const x of [-.14,.14])box(g,x,.94,.16,.09,.08,.055,m.black);
 capsule(g,0,1.54,0,.088,.08,m.skin);const head=new THREE.Mesh(new THREE.SphereGeometry(.145,14,10),m.skin);head.scale.set(.9,1.14,.95);head.position.set(0,1.68,0);g.add(head);const helmet=new THREE.Mesh(new THREE.SphereGeometry(.165,14,10,0,Math.PI*2,0,Math.PI*.6),m.tan);helmet.position.set(0,1.72,-.014);g.add(helmet);box(g,0,1.7,.137,.255,.065,.07,m.glass);box(g,0,1.62,.12,.22,.065,.075,m.tan);for(const x of [-.165,.165])box(g,x,1.67,0,.04,.12,.09,m.vest);
 const legs=[];for(const x of [-.115,.115]){const leg=new THREE.Group();leg.position.set(x,.94,0);capsule(leg,0,-.23,0,.095,.3,m.cloth);capsule(leg,0,-.62,0,.08,.3,m.cloth);box(leg,0,-.43,.072,.13,.15,.08,m.vest);box(leg,0,-.855,.058,.17,.17,.31,m.boot);g.add(leg);legs.push(leg);}
 const arms=[];for(const side of [-1,1]){const arm=new THREE.Group();arm.position.set(side*.25,1.4,0);capsule(arm,0,-.17,0,.08,.19,m.cloth);capsule(arm,0,-.33,.12,.065,.18,m.cloth).rotation.x=-1;box(arm,0,-.35,.27,.11,.1,.13,m.glove);arm.rotation.x=-.3;arm.rotation.z=side*.08;g.add(arm);arms.push(arm);}
 const gun=makeWeapon('rifle',false);gun.scale.setScalar(.68);gun.rotation.y=Math.PI;gun.position.set(.13,1.07,.48);g.add(gun);g.userData={legs,arms,gun,flash:gun.userData.flash};return g;
}
