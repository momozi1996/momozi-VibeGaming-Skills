export const PATCH='16.18.1';
export const WORLD=15000, SCALE=.01;
export const CHAMPIONS=[
 {id:'Garen',name:'盖伦',title:'德玛西亚之力',role:'战士',color:'#66b5ef',lane:0,desc:'以钢铁之躯守住前线。近身切入，旋转压制，以正义之剑终结敌人。',skills:['致命打击','勇气','审判','德玛西亚正义']},
 {id:'Ashe',name:'艾希',title:'寒冰射手',role:'射手',color:'#81dcff',lane:2,desc:'每一支箭都是寒冬。保持距离，以冰霜减速掌控战场，用魔法水晶箭发起进攻。',skills:['射手的专注','万箭齐发','鹰击长空','魔法水晶箭']},
 {id:'Annie',name:'安妮',title:'黑暗之女',role:'法师',color:'#ee9277',lane:1,desc:'不要小看火焰。积蓄嗜火的力量，释放烈焰，在敌阵中召唤提伯斯。',skills:['碎裂之火','焚烧','熔岩护盾','提伯斯之怒']},
 {id:'Lux',name:'拉克丝',title:'光辉女郎',role:'法师 · 辅助',color:'#f5df9c',lane:1,desc:'让光穿透阴影。束缚敌人、守护盟友，最后用一道终极闪光划破战场。',skills:['光之束缚','曲光屏障','透光奇点','终极闪光']},
 {id:'MasterYi',name:'易',title:'无极剑圣',role:'刺客',color:'#97d9a9',lane:0,desc:'剑随心动，身随剑行。快速接近目标，以无极剑道和高原血统完成收割。',skills:['阿尔法突袭','冥想','无极剑道','高原血统']}
];
export const BASES=[{x:1450,z:13550},{x:13550,z:1450}];
export const SPAWNS=[{x:1900,z:13100},{x:13100,z:1900}];
export const LANES=[
 [[1450,13550],[1550,11500],[1400,8300],[1500,4700],[1800,2100],[3700,1550],[7400,1400],[11000,1500],[13550,1450]],
 [[1450,13550],[3600,11400],[5600,9400],[7500,7500],[9400,5600],[11400,3600],[13550,1450]],
 [[1450,13550],[4000,13500],[7400,13600],[11000,13500],[13100,13000],[13500,10900],[13600,7400],[13500,4000],[13550,1450]]
];
export function distance(a,b){return Math.hypot(a.x-b.x,a.z-b.z)}
export function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
export function pathPoint(path,t){let ds=[],total=0;for(let i=1;i<path.length;i++){let d=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]);ds.push(d);total+=d}let r=total*t;for(let i=0;i<ds.length;i++){if(r<=ds[i]){let k=r/ds[i];return{x:path[i][0]+(path[i+1][0]-path[i][0])*k,z:path[i][1]+(path[i+1][1]-path[i][1])*k}}r-=ds[i]}return{x:path.at(-1)[0],z:path.at(-1)[1]}}
export function segmentDistance(p,a,b){let dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz)}
export const ITEMS=[
 {id:'sword',image:'item-1036.png',name:'长剑',cost:350,icon:'⚔',text:'+10 攻击力',ad:10,color:'#b3c9d4'},
 {id:'tome',image:'item-1052.png',name:'增幅典籍',cost:400,icon:'✧',text:'+20 法术强度',ap:20,color:'#ca9df2'},
 {id:'boots',image:'item-1001.png',name:'速度之靴',cost:300,icon:'➤',text:'+25 移动速度',speed:25,color:'#cfb87d'},
 {id:'ruby',image:'item-1028.png',name:'红水晶',cost:400,icon:'◆',text:'+150 生命值',hp:150,color:'#e97289'},
 {id:'dagger',image:'item-1042.png',name:'短剑',cost:250,icon:'†',text:'+10% 攻击速度',as:.1,color:'#8bcacd'},
 {id:'armor',image:'item-1029.png',name:'布甲',cost:300,icon:'⬡',text:'+15 护甲',armor:15,color:'#a5b1c1'},
 {id:'edge',image:'item-3031.png',name:'演武 · 无尽之刃',cost:2500,icon:'⚔',text:'+65 攻击力 · 原型装备',ad:65,color:'#efcb6f'},
 {id:'staff',image:'item-3089.png',name:'演武 · 灭世之杖',cost:2500,icon:'✦',text:'+110 法术强度 · 原型装备',ap:110,color:'#d895ed'},
 {id:'potion',image:'item-2003.png',name:'生命药水',cost:50,icon:'♥',text:'立即恢复 120 生命 · 简化',heal:120,color:'#e38491'}
];
// Non-walkable jungle rock clusters. All render/collision consumers use this same list.
export const WALLS=[
 {x:4200,z:6900,r:590},{x:3600,z:7600,r:490},{x:3800,z:5400,r:520},
 {x:7300,z:11000,r:600},{x:8100,z:11400,r:510},{x:10000,z:11300,r:490},
 {x:8100,z:4000,r:590},{x:7400,z:3500,r:480},{x:5100,z:3700,r:500},
 {x:11300,z:8100,r:620},{x:11400,z:7200,r:430},{x:11000,z:9900,r:460},
 {x:2100,z:9900,r:400},{x:5100,z:12100,r:460},{x:9800,z:2400,r:440},{x:12600,z:5100,r:420}
];
export function navigable(p,r=65){return p.x>350+r&&p.z>350+r&&p.x<WORLD-350-r&&p.z<WORLD-350-r&&!WALLS.some(w=>distance(w,p)<w.r+r)}
export function moveToward(a,p,step){let d=distance(a,p);if(d<1)return;let nx=a.x+(p.x-a.x)/d*Math.min(d,step),nz=a.z+(p.z-a.z)/d*Math.min(d,step);if(navigable({x:nx,z:nz},a.radius||50)){a.x=nx;a.z=nz}else if(navigable({x:nx,z:a.z},a.radius||50)){a.x=nx}else if(navigable({x:a.x,z:nz},a.radius||50)){a.z=nz}a.facing=Math.atan2(p.x-a.x,p.z-a.z)}
