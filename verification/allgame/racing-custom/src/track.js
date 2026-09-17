import { THEME } from './theme.js';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const TAU=Math.PI*2;
let seed=THEME.seed;
const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const between=(a,b)=>a+(b-a)*rand();
const wrap=u=>THREE.MathUtils.euclideanModulo(u,1);
const smooth=(a,b,t)=>THREE.MathUtils.smoothstep(t,a,b);
function texture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');draw(ctx,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
function mesh(geo,mat,scene,p=[0,0,0],rotation=[0,0,0]){const m=new THREE.Mesh(geo,mat);m.position.set(...p);m.rotation.set(...rotation);scene.add(m);return m;}
function standard(color,extra={}){return new THREE.MeshStandardMaterial({color,roughness:.85,...extra});}
// Static scenery is welded by material, not drawn one leaf or coconut at a time.
class Batch {
 constructor(scene){this.scene=scene;this.parts=new Map();this.matrix=new THREE.Matrix4();this.euler=new THREE.Euler();this.quat=new THREE.Quaternion();}
 add(geo,mat,p=[0,0,0],s=[1,1,1],r=[0,0,0]){this.euler.set(...r);this.quat.setFromEuler(this.euler);this.matrix.compose(new THREE.Vector3(...p),this.quat,new THREE.Vector3(...s));const g=geo.index?geo.toNonIndexed():geo.clone();g.applyMatrix4(this.matrix);g.deleteAttribute('uv');g.deleteAttribute('color');if(!this.parts.has(mat))this.parts.set(mat,[]);this.parts.get(mat).push(g);}
 flush(){for(const [mat,gs]of this.parts){const g=mergeGeometries(gs);gs.forEach(x=>x.dispose());const m=new THREE.Mesh(g,mat);m.castShadow=true;m.receiveShadow=true;this.scene.add(m);}this.parts.clear();}
}
export function createTrack(scene){
 seed=THEME.seed;
 const points=THEME.trackPoints.map(([x,z])=>new THREE.Vector3(x,.24,z));
 const curve=new THREE.CatmullRomCurve3(points,true,'centripetal',.5);curve.arcLengthDivisions=4096;curve.updateArcLengths();
 const length=curve.getLength(),width=16;
 function sample(u,lateral=0){u=wrap(u);const position=curve.getPointAt(u);const tangent=curve.getTangentAt(u).normalize();const normal=new THREE.Vector3(tangent.z,0,-tangent.x).normalize();position.addScaledVector(normal,lateral);return{position,tangent,normal,yaw:Math.atan2(tangent.x,tangent.z)};}
 const nearestPoints=Array.from({length:1201},(_,i)=>curve.getPointAt(i/1200));
 function nearest(x,z){let best=Infinity,result;for(let i=0;i<1200;i++){const a=nearestPoints[i],b=nearestPoints[i+1],dx=b.x-a.x,dz=b.z-a.z;const t=THREE.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1),px=a.x+dx*t,pz=a.z+dz*t,d=(x-px)**2+(z-pz)**2;if(d<best){best=d;result={u:wrap((i+t)/1200),position:new THREE.Vector3(px,.24,pz),lateral:((x-px)*dz-(z-pz)*dx)/Math.hypot(dx,dz),distance:Math.sqrt(d)};}}return result;}
 const mapPoints=Array.from({length:160},(_,i)=>{const p=curve.getPointAt(i/160);return{x:p.x,z:p.z};});
 const batch=new Batch(scene);
 const box=new THREE.BoxGeometry(1,1,1),sphere=new THREE.SphereGeometry(1,12,9),cylinder=new THREE.CylinderGeometry(1,1,1,10),cone=new THREE.ConeGeometry(1,1,12);
 const mat={wood:standard('#aa7044'),lightWood:standard('#d6a567'),darkWood:standard('#674839'),cream:standard('#fff0cd'),coral:standard(THEME.colors.accent),mint:standard('#69cbb8'),navy:standard('#244d59'),yellow:standard('#ffc970'),green:standard(THEME.colors.leaves),darkGreen:standard(THEME.colors.leavesDark),lime:standard(THEME.colors.leavesLight),rock:standard('#a8a798'),darkRock:standard('#777f6f'),pink:standard('#f2a1a2'),white:standard('#fff9e8')};
 for(const m of [mat.cream,mat.coral,mat.mint,mat.yellow])m.side=THREE.DoubleSide;
 const wind={value:0};
 for(const m of [mat.green,mat.darkGreen,mat.lime]){m.side=THREE.DoubleSide;m.onBeforeCompile=s=>{s.uniforms.windTime=wind;s.vertexShader='uniform float windTime;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n transformed.x += sin(windTime*1.2+position.x*.14+position.z*.11)*smoothstep(6.,18.,position.y)*.24;');};m.customProgramCacheKey=()=>`aloha-frond-wind`;}
 // Coastline radius is derived from the actual course, keeping sand beneath every bend.
 const coastBins=new Float32Array(256);
 for(let i=0;i<2048;i++){const p=curve.getPointAt(i/2048);const a=wrap(Math.atan2(p.z,p.x)/TAU);const bin=Math.floor(a*256)%256;coastBins[bin]=Math.max(coastBins[bin],Math.hypot(p.x,p.z));}
 for(let i=0;i<256;i++)if(!coastBins[i]){for(let d=1;d<40;d++){const v=coastBins[(i+d)%256]||coastBins[(i-d+256)%256];if(v){coastBins[i]=v;break;}}}
 function radius(a){const f=wrap(a/TAU)*256,i=Math.floor(f);return THREE.MathUtils.lerp(coastBins[i],coastBins[(i+1)%256],f-i)+28+Math.sin(a*5)*2;}
 const sandTex=texture(512,512,(ctx,w,h)=>{ctx.fillStyle=THEME.colors.sandTexture;ctx.fillRect(0,0,w,h);for(let i=0;i<42000;i++){ctx.fillStyle=rand()>.5?`rgba(255,250,220,${between(.08,.3)})`:`rgba(147,111,62,${between(.03,.15)})`;const s=between(.4,1.5);ctx.fillRect(rand()*w,rand()*h,s,s);}});sandTex.wrapS=sandTex.wrapT=THREE.RepeatWrapping;sandTex.repeat.set(30,30);
 const groundPositions=[],groundColors=[],groundUV=[],groundIndices=[];
 const cSand=new THREE.Color(THEME.colors.sand),cWet=new THREE.Color(THEME.colors.wetSand),cGrass=new THREE.Color(THEME.colors.grass);
 const rings=24,segs=256;
 for(let j=0;j<=rings;j++)for(let i=0;i<=segs;i++){const a=i/segs*TAU,f=j/rings,r=radius(a)*f;let y=-.08;if(f>.89)y-=smooth(.89,1,f)*1.27;const x=Math.cos(a)*r,z=Math.sin(a)*r;groundPositions.push(x,y,z);groundUV.push((x+220)/440,(z+220)/440);const grass=1-smooth(.5,.70,f+Math.sin(a*4)*.035);const color=cSand.clone().lerp(cGrass,grass).lerp(cWet,smooth(.92,1,f)*.65);color.multiplyScalar(.98+Math.sin(x*.8+z*.5)*.02);groundColors.push(color.r,color.g,color.b);if(j<rings&&i<segs){const q=j*(segs+1)+i;groundIndices.push(q,q+1,q+segs+1,q+1,q+segs+2,q+segs+1);}}
 const groundGeo=new THREE.BufferGeometry();groundGeo.setAttribute('position',new THREE.Float32BufferAttribute(groundPositions,3));groundGeo.setAttribute('color',new THREE.Float32BufferAttribute(groundColors,3));groundGeo.setAttribute('uv',new THREE.Float32BufferAttribute(groundUV,2));groundGeo.setIndex(groundIndices);groundGeo.computeVertexNormals();
 const ground=mesh(groundGeo,new THREE.MeshStandardMaterial({color:'#ffffff',vertexColors:true,roughness:1,map:sandTex}),scene);ground.receiveShadow=true;
 // Shallow reef under an animated, translucent-looking (opaque for performance) sea.
 const seaUniforms={time:{value:0}};
 const oceanMaterial=new THREE.ShaderMaterial({uniforms:seaUniforms,side:THREE.DoubleSide,vertexShader:`varying vec3 vWorld; uniform float time; void main(){vec3 p=position;p.y+=sin(p.x*.075+time*.8)*cos(p.z*.095+time*.6)*.065;vWorld=(modelMatrix*vec4(p,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}`,
 fragmentShader:`varying vec3 vWorld;uniform float time;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
 void main(){vec2 p=vWorld.xz;float r=length(p/vec2(1.,1.1));float deep=smoothstep(135.,510.,r);float n=noise(p*.025+time*.025);vec3 col=mix(vec3(.09,.72,.67),vec3(.04,.39,.61),deep);col=mix(col,vec3(.27,.84,.78),(1.-deep)*n*.7);float wave=sin(p.x*.25+sin(p.y*.16+time)*2.+time*.9)*sin(p.y*.27-time*.8);float sparkle=pow(max(0.,wave),22.)*(.4+noise(p*.13+time*.1)*.6);col+=vec3(.42,.66,.57)*sparkle*.23;float farAway=smoothstep(450.,1300.,length(p));col=mix(col,vec3(.64,.81,.85),farAway);gl_FragColor=vec4(col,1.);}`});
 const seaGeo=new THREE.PlaneGeometry(3600,3600,100,100);seaGeo.rotateX(-Math.PI/2);mesh(seaGeo,oceanMaterial,scene,[0,-1.34,0]);
 const foamMeshes=[];
 for(let ring=0;ring<4;ring++){
  const pos=[],uv=[],idx=[];for(let i=0;i<=512;i++){const a=i/512*TAU;for(let j=0;j<2;j++){const r=radius(a)+2.0+ring*5.2+j*(1.7+ring*.7)+Math.sin(a*19+ring)*.7;pos.push(Math.cos(a)*r,-1.17-ring*.025,Math.sin(a)*r);uv.push(i/512,j);}if(i<512){let q=i*2;idx.push(q,q+2,q+1,q+1,q+2,q+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:seaUniforms.time,offset:{value:ring}},vertexShader:'varying vec2 vUv;uniform float time,offset;void main(){vUv=uv;vec3 p=position;p.xz*=1.+sin(time*.35+offset*.9)*.009;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',fragmentShader:'varying vec2 vUv;uniform float time,offset;void main(){float edge=sin(vUv.y*3.14159);float bits=.55+.45*sin(vUv.x*580.+sin(time+vUv.x*140.));float fade=.6+.4*sin(time*.7+offset);gl_FragColor=vec4(.94,1.,.88,edge*bits*fade*(.55-offset*.1));}'});const f=mesh(g,m,scene);foamMeshes.push(f);
 }
 // Continuous warm sand racing surface, a slightly raised ribbon with soft tire grooves.
 function ribbon(offset,w,material,y=.0){const pos=[],uv=[],idx=[];for(let i=0;i<=1000;i++){const u=i/1000;for(let j=0;j<2;j++){const p=sample(u,offset+(j-.5)*w).position;pos.push(p.x,p.y+y,p.z);uv.push(j,i/25);}if(i<1000){const q=i*2;idx.push(q,q+2,q+1,q+1,q+2,q+3);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();const m=mesh(g,material,scene);m.receiveShadow=true;return m;}
 const roadTex=sandTex.clone();roadTex.repeat.set(1,1);roadTex.needsUpdate=true;
 ribbon(0,width,new THREE.MeshStandardMaterial({color:THEME.colors.road,roughness:.96,map:roadTex}));
 const grooveMat=standard('#e0bc88',{transparent:true,opacity:.16,depthWrite:false});ribbon(-2.25,.55,grooveMat,.006);ribbon(2.25,.55,grooveMat,.006);
 const matrix=new THREE.Matrix4(),quat=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0);
 const curbCount=Math.floor(length/2.25),curbGeo=new THREE.BoxGeometry(.55,.24,2.2);
 for(let color=0;color<2;color++){
  const count=Math.ceil(curbCount/2)*2,inst=new THREE.InstancedMesh(curbGeo,color?mat.cream:mat.coral,count);let k=0;
  for(let i=color;i<curbCount;i+=2)for(const side of[-1,1]){const f=sample(i/curbCount,side*(width/2+.1));f.position.y+=.03;quat.setFromAxisAngle(up,f.yaw);matrix.compose(f.position,quat,new THREE.Vector3(1,1,1));inst.setMatrixAt(k++,matrix);}inst.count=k;inst.castShadow=true;inst.receiveShadow=true;scene.add(inst);
 }
 // Reusable hand-cut tropical props.
 function palm(x,z,height=10,lean=1,rot=0){
  const dir=new THREE.Vector3(Math.cos(rot),0,Math.sin(rot));const pts=[];
  for(let j=0;j<=7;j++){const t=j/7;pts.push(new THREE.Vector3(x+dir.x*lean*t*t,height*t,z+dir.z*lean*t*t));}
  const trunk=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),10,.25,7,false);batch.add(trunk,mat.wood);trunk.dispose();
  for(let j=1;j<11;j++){const t=j/11;batch.add(new THREE.TorusGeometry(.265,.026,3,8),mat.lightWood,[x+dir.x*lean*t*t,height*t,z+dir.z*lean*t*t],[1,1,1],[Math.PI/2,0,0]);}
  const top=pts[7];
  for(let f=0;f<9;f++){
   const angle=rot+f*TAU/9+between(-.12,.12),len=between(4.7,6.6)*(height/11)**.35;const dx=Math.cos(angle),dz=Math.sin(angle),nx=-dz,nz=dx;const ps=[],uv=[];
   function center(t){return new THREE.Vector3(top.x+dx*len*t,top.y+Math.sin(t*Math.PI)*1.5-t*t*2.45,top.z+dz*len*t);}
   for(let j=0;j<13;j++){const t=.03+j*.07;const a=center(t),b=center(t+.075);const wide=Math.sin(t*Math.PI)*1.1*(1-t*.35);for(const sign of[-1,1]){const tip=new THREE.Vector3(a.x+nx*wide*sign-dx*.4,a.y-.08-wide*.12,a.z+nz*wide*sign-dz*.4);ps.push(a.x,a.y,a.z,tip.x,tip.y,tip.z,b.x,b.y,b.z);uv.push(0,0,1,0,0,1);}}
   // The solid tapered blade gives each frond a lush readable silhouette; fine leaflets provide cuts.
   for(let j=0;j<12;j++){
    const t=j/12,t2=(j+1)/12,a=center(t),b=center(t2);
    const w1=Math.sin(t*Math.PI)*.57,w2=Math.sin(t2*Math.PI)*.57;
    const v1=[a.x+nx*w1,a.y-.08,a.z+nz*w1],v2=[a.x-nx*w1,a.y-.08,a.z-nz*w1],v3=[b.x+nx*w2,b.y-.08,b.z+nz*w2],v4=[b.x-nx*w2,b.y-.08,b.z-nz*w2];
    ps.push(...v1,...v3,...v2,...v2,...v3,...v4);uv.push(0,0,0,1,1,0,1,0,0,1,1,1);
   }
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(ps,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();batch.add(g,[mat.green,mat.darkGreen,mat.lime][f%3]);g.dispose();
  }
  for(let n=0;n<3;n++)batch.add(sphere,mat.darkWood,[top.x+Math.cos(n*2.2)*.35,top.y-.45,top.z+Math.sin(n*2.2)*.35],[.25,.33,.25]);
 }
 for(let i=0;i<69;i++){const u=wrap(i/69+between(-.004,.004)),side=i%3===0?-1:1,lateral=side*between(13.5,23);const p=sample(u,lateral).position;palm(p.x,p.z,between(8.5,13.5),between(.6,2.9),rand()*TAU);}
 function sign(text,x,y,z,yaw,w=4,h=1.2,bg=THEME.colors.accent,fg='#fff4d7'){
  const tex=texture(1024,256,(ctx,W,H)=>{ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.strokeStyle=fg;ctx.lineWidth=6;ctx.strokeRect(14,14,W-28,H-28);ctx.fillStyle=fg;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`900 ${text.length>12?68:92}px Trebuchet MS`;ctx.fillText(text,W/2,H/2+4,W-75);});
  const m=mesh(new THREE.BoxGeometry(w,h,.14),new THREE.MeshStandardMaterial({map:tex,roughness:.85}),scene,[x,y,z],[0,yaw,0]);m.castShadow=true;return m;
 }
 function umbrella(x,z,color=mat.coral,scale=1){
  batch.add(cylinder,mat.lightWood,[x,2.1*scale,z],[.065,4.2*scale,.065]);
  for(let i=0;i<12;i++){const a=i/12*TAU,b=(i+1)/12*TAU;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([x,4.55*scale,z,x+Math.cos(a)*2.65*scale,3.6*scale,z+Math.sin(a)*2.65*scale,x+Math.cos(b)*2.65*scale,3.6*scale,z+Math.sin(b)*2.65*scale],3));g.computeVertexNormals();batch.add(g,i%2?mat.cream:color);g.dispose();}
  batch.add(sphere,mat.cream,[x,4.6*scale,z],[.13,.13,.13]);
  for(let k=0;k<2;k++){const cx=x+(k?1.2:-1.2),cz=z+.5;batch.add(box,k?mat.cream:color,[cx,.37,cz],[.9,.12,2.4]);batch.add(box,k?mat.cream:color,[cx,.85,cz-1.0],[.9,.12,1.3],[.75,0,0]);for(const d of[-1,1])batch.add(box,mat.lightWood,[cx,.2,cz+d*.7],[.82,.32,.08]);}
 }
 for(const u of[.024,.064,.104,.186,.247,.345,.471,.645,.732,.78,.88,.94]){const p=sample(u,-19).position;umbrella(p.x,p.z,rand()>.5?mat.coral:mat.mint,between(.7,1.1));}
 function hut(u,side=1,size=1){const f=sample(u,side*24),p=f.position;
  batch.add(box,mat.lightWood,[p.x,.35,p.z],[7*size,.55,6*size]);batch.add(box,mat.wood,[p.x,2.15*size,p.z],[5.9*size,3.6*size,4.7*size]);
  for(let n=0;n<5;n++)batch.add(box,n%2?mat.lightWood:mat.wood,[p.x+(n-2)*1.18*size,2.15*size,p.z+2.4*size],[1.04*size,3.6*size,.1]);
  for(const side of[-1,1]){batch.add(box,mat.darkWood,[p.x+side*3.1*size,2.25*size,p.z+2.9*size],[.22,4.1*size,.22]);batch.add(box,mat.navy,[p.x+side*1.7*size,2.3*size,p.z+2.5*size],[1.4*size,1.2*size,.12]);}
  batch.add(box,mat.darkWood,[p.x,1.6*size,p.z+2.5*size],[1.05*size,2.6*size,.12]);
  for(let n=0;n<5;n++)batch.add(new THREE.ConeGeometry(5.2*size-n*.18,2.8*size,4),n%2?mat.lightWood:mat.wood,[p.x,(5.1+n*.16)*size,p.z],[1,1,.86],[0,Math.PI/4,0]);
  sign(u<.1?'SURF & PURR':'PINE CLUB',p.x,3.4*size,p.z+3.05*size,0,3.1*size,.7*size);
  for(let b=0;b<3;b++){batch.add(sphere,[mat.coral,mat.mint,mat.yellow][b],[p.x+4.1*size+b*.45,1.5,p.z+1.2],[.26,1.7,.095],[0,0,(-.15+b*.1)]);}
 }
 hut(.025,1,1.1);hut(.14,1,.9);hut(.71,1,1);hut(.85,-1,.72);
 // Plumeria flower beds, sea grapes and dune boulders.
 function flower(x,y,z,color,size=.25){batch.add(sphere,mat.yellow,[x,y,z],[size*.36,size*.3,size*.36]);for(let j=0;j<5;j++){const a=j*TAU/5;batch.add(sphere,color,[x+Math.cos(a)*size*.6,y+.03,z+Math.sin(a)*size*.6],[size*.55,size*.19,size*.32],[0,-a,0]);}}
 for(let i=0;i<145;i++){const p=sample(rand(),between(11,22)*(rand()>.7?-1:1)).position;const s=between(.35,1.2);batch.add(sphere,[mat.green,mat.darkGreen,mat.lime][i%3],[p.x,s*.55-.08,p.z],[s,s*.65,s*.9]);if(i%2===0){for(let n=0;n<3;n++)flower(p.x+between(-s,s),s*.95,p.z+between(-s,s),i%4?mat.pink:mat.white,between(.2,.34));}}
 for(let i=0;i<57;i++){const p=sample(rand(),-between(13,25)).position;const s=between(.35,1.5);batch.add(new THREE.DodecahedronGeometry(1,0),i%3?mat.rock:mat.darkRock,[p.x,s*.42-.1,p.z],[s,s*.6,s*.78],[rand(),rand(),rand()]);}
 // Start gantry: wood, checkers and a postcard sign.
 const start=sample(0),root=start.position,yaw=start.yaw;
 function at(l,z=0,y=0){return root.clone().addScaledVector(start.normal,l).addScaledVector(start.tangent,z).add(new THREE.Vector3(0,y,0));}
 for(let row=0;row<2;row++)for(let col=0;col<12;col++){const p=at((col-5.5)*width/12,(row-.5)*1.1,.027);batch.add(box,(col+row)%2?mat.navy:mat.cream,p.toArray(),[width/12,.025,1.1],[0,yaw,0]);}
 for(const side of[-1,1]){const p=at(side*9.8,0,4);batch.add(cylinder,mat.wood,p.toArray(),[.38,8,.38]);const foot=at(side*9.8,0,.2);batch.add(box,mat.coral,foot.toArray(),[1.3,.5,1.3],[0,yaw,0]);const top=at(side*9.8,0,8);batch.add(sphere,mat.yellow,top.toArray(),[.53,.53,.53]);}
 const beam=at(0,0,7.4);batch.add(box,mat.lightWood,beam.toArray(),[20.3,.6,.5],[0,yaw,0]);
 const panel=at(0,.38,7.8);sign('PINE  COAST',panel.x,panel.y,panel.z,yaw,10,1.6,'#386d64','#fff0cd');
 // Bunting across start, with a little sag.
 for(let i=0;i<21;i++){const p=at((i-10)*.86,.36,6.65+Math.abs(i-10)*.024);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-.35,0,0,.35,0,0,0,-.65,0],3));g.computeVertexNormals();batch.add(g,[mat.coral,mat.cream,mat.mint,mat.yellow][i%4],p.toArray(),[1,1,1],[0,yaw,0]);}
 for(const u of[.105,.19,.30,.39,.5,.6,.68,.8,.92]){const f=sample(u,-10);batch.add(cylinder,mat.lightWood,[f.position.x,1.5,f.position.z],[.08,3,.08]);sign('› › ›',f.position.x,2.5,f.position.z,f.yaw+Math.PI/2,3.4,1.2);}
 // Interior Hawaiian volcanic garden. Rich layered silhouettes, away from the road.
 function mountain(x,z,s=1){batch.add(new THREE.IcosahedronGeometry(1,2),mat.darkRock,[x,8*s,z],[29*s,31*s,29*s],[0,.3,.07]);batch.add(new THREE.IcosahedronGeometry(1,2),mat.green,[x-7*s,8*s,z+6*s],[29*s,20*s,24*s],[.2,.4,-.1]);batch.add(new THREE.IcosahedronGeometry(1,2),mat.lime,[x+3*s,19*s,z+1*s],[15*s,17*s,14*s],[.2,1,.1]);batch.add(new THREE.IcosahedronGeometry(1,1),mat.darkRock,[x+14*s,8*s,z-9*s],[15*s,27*s,17*s],[0,.9,-.2]);}
 mountain(6,-25,1.25);mountain(420,170,2.7);mountain(-365,-320,2.1);mountain(70,-480,1.7);
 // A candy-striped lighthouse overlooks the eastern turquoise bay.
 const lp=sample(.405,-20).position;batch.add(cylinder,mat.cream,[lp.x,.25,lp.z],[4.7,.8,4.7]);
 for(let j=0;j<5;j++)batch.add(new THREE.CylinderGeometry(1.25-j*.055,1.45-j*.055,2.6,16),j%2?mat.coral:mat.cream,[lp.x,1.8+j*2.6,lp.z]);
 batch.add(cylinder,mat.navy,[lp.x,14.5,lp.z],[2.05,.3,2.05]);batch.add(cylinder,mat.mint,[lp.x,15.55,lp.z],[1.4,1.8,1.4]);batch.add(cone,mat.coral,[lp.x,17.1,lp.z],[2.1,1.3,2.1]);
 for(let i=0;i<10;i++){const a=i*TAU/10;batch.add(cylinder,mat.cream,[lp.x+Math.cos(a)*1.85,15.1,lp.z+Math.sin(a)*1.85],[.055,1.2,.055]);}
 batch.add(new THREE.TorusGeometry(1.85,.065,5,20),mat.cream,[lp.x,15.65,lp.z],[1,1,1],[Math.PI/2,0,0]);
 const boats=[];
 for(const [x,z,s]of[[-238,110,1.3],[-290,-82,.9],[245,110,1.2]]){
  const b=new THREE.Group();b.position.set(x,-.5,z);b.rotation.y=.5;scene.add(b);
  mesh(new THREE.SphereGeometry(1,12,8),mat.cream,b,[0,.1,0]).scale.set(1.3*s,.6*s,3.1*s);
  mesh(cylinder,mat.wood,b,[0,4*s,0]).scale.set(.06,8*s,.06);
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute([.1,1,0,.1,7*s,0,.1,1,3*s],3));sg.computeVertexNormals();const sm=new THREE.MeshStandardMaterial({color:'#fff6d7',side:THREE.DoubleSide,roughness:1});mesh(sg,sm,b);boats.push(b);
 }
 batch.flush();
 // Pickup geometry stays individually addressable for simulation-owned cooldowns.
 const pickups=[],boosts=[];
 const gold=new THREE.MeshPhysicalMaterial({color:'#ffcf58',metalness:.55,roughness:.23,clearcoat:.6,emissive:'#9d5809',emissiveIntensity:.09});
 const coinTex=texture(128,128,(c,w,h)=>{c.fillStyle='#ffc846';c.beginPath();c.arc(64,64,62,0,TAU);c.fill();c.strokeStyle='#ffeeb0';c.lineWidth=7;c.beginPath();c.arc(64,64,52,0,TAU);c.stroke();c.fillStyle='#9f652b';c.beginPath();c.ellipse(59,64,24,15,0,0,TAU);c.fill();c.beginPath();c.moveTo(75,64);c.lineTo(98,46);c.lineTo(98,82);c.fill();c.fillStyle='#ffe8a2';c.beginPath();c.arc(47,60,4,0,TAU);c.fill();});
 const coinFace=new THREE.MeshStandardMaterial({map:coinTex,metalness:.3,roughness:.4,side:THREE.DoubleSide,transparent:true});
 const coinGeo=new THREE.CylinderGeometry(.6,.6,.15,24);coinGeo.rotateX(Math.PI/2);
 const faceGeo=new THREE.CircleGeometry(.59,24);
 for(const u of[.045,.085,.17,.245,.31,.36,.43,.485,.55,.62,.70,.76,.825,.91,.96])for(let j=0;j<3;j++){
  const uu=wrap(u+j*.0065),lateral=Math.sin(u*31)*3.3;const p=sample(uu,lateral).position;const g=new THREE.Group();g.position.copy(p);g.position.y+=1.25;const body=mesh(coinGeo,gold,g);body.castShadow=false;mesh(faceGeo,coinFace,g,[0,0,.08]);mesh(faceGeo,coinFace,g,[0,0,-.08],[0,Math.PI,0]);scene.add(g);pickups.push({u:uu,lateral,kind:'coin',mesh:g,active:true,respawn:0,baseY:g.position.y,phase:rand()*TAU});
 }
 const itemMaterial=new THREE.MeshPhysicalMaterial({color:'#a1f1e5',metalness:.15,roughness:.12,clearcoat:1,transparent:true,opacity:.77,emissive:'#77d8c8',emissiveIntensity:.2});
 const itemTex=texture(256,256,(c,w,h)=>{c.clearRect(0,0,w,h);c.fillStyle='#fff8dd';c.font='900 190px Trebuchet MS';c.textAlign='center';c.textBaseline='middle';c.fillText('?',w/2,h/2+9);});const itemFace=new THREE.MeshBasicMaterial({map:itemTex,transparent:true,side:THREE.DoubleSide,depthWrite:false});
 const itemGeo=new RoundedBoxGeometry(1.45,1.45,1.45,2,.2),questionGeo=new THREE.PlaneGeometry(1.2,1.2);
 for(const u of[.125,.285,.455,.655,.855])for(const lateral of[-4.8,0,4.8]){const p=sample(u,lateral).position;const g=new THREE.Group();g.position.copy(p);g.position.y+=1.45;mesh(itemGeo,itemMaterial,g);mesh(questionGeo,itemFace,g,[0,0,.74]);mesh(questionGeo,itemFace,g,[0,0,-.74],[0,Math.PI,0]);g.rotation.z=.14;scene.add(g);pickups.push({u,lateral,kind:'item',mesh:g,active:true,respawn:0,baseY:g.position.y,phase:rand()*TAU});}
 const boostTex=texture(256,256,(c,w,h)=>{c.fillStyle='#46bda9';c.fillRect(0,0,w,h);c.strokeStyle='#a7eada';c.lineWidth=7;c.strokeRect(5,5,w-10,h-10);c.fillStyle='#ffffd9';for(let j=0;j<3;j++){const y=35+j*70;c.beginPath();c.moveTo(35,y+35);c.lineTo(128,y);c.lineTo(221,y+35);c.lineTo(221,y+55);c.lineTo(128,y+20);c.lineTo(35,y+55);c.fill();}});
 const boostMat=new THREE.MeshStandardMaterial({map:boostTex,roughness:.5,emissive:'#6febc8',emissiveIntensity:.26});
 for(const u of[.205,.52,.805]){const f=sample(u,0);const m=mesh(new THREE.PlaneGeometry(8,5),boostMat,scene,[f.position.x,f.position.y+.035,f.position.z],[-Math.PI/2,0,-f.yaw]);m.receiveShadow=true;boosts.push({u,lateral:0,width:8,length:5,mesh:m});}
 function update(t,dt){seaUniforms.time.value=t;wind.value=t;for(const p of pickups){p.mesh.visible=p.active!==false;p.mesh.rotation.y=t*(p.kind==='coin'?1.2:.6)+p.phase;p.mesh.position.y=p.baseY+Math.sin(t*2+p.phase)*.13;}for(let i=0;i<boats.length;i++){boats[i].rotation.z=Math.sin(t*.65+i)*.055;boats[i].position.y=-.5+Math.sin(t*.8+i)*.12;}}
 return{curve,length,width,sample,nearest,update,pickups,boosts,mapPoints,coastRadius:radius};
}
