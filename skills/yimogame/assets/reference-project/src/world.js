import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {heightAt,riverX,riverDist,pathDist,rng} from './terrain.js';
import {PORTAL} from './state.js';
const rand=rng(2489), dummy=new T.Object3D();
const mats={};
export function mat(c,rough=1){return mats[c+rough]??=new T.MeshStandardMaterial({color:c,roughness:rough});}
export function ball(parent,c,x,y,z,sx,sy=sx,sz=sx){const m=new T.Mesh(sphere,typeof c==='string'||typeof c==='number'?mat(c):c);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const sphere=new T.SphereGeometry(1,16,12);
export function link(parent,a,b,r1,r2,c){const v1=new T.Vector3(...a),v2=new T.Vector3(...b);const mesh=new T.Mesh(new T.CylinderGeometry(r2,r1,v1.distanceTo(v2),9),mat(c));mesh.position.copy(v1).add(v2).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v2.sub(v1).normalize());mesh.castShadow=true;parent.add(mesh);return mesh;}
function mesh(parent,g,c,x,y,z){const m=new T.Mesh(g,typeof c==='string'?mat(c):c);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
export function createWorld(scene){
 const wind={value:0}; const obstacles=[];
 scene.background=new T.Color('#9adbea');scene.fog=new T.FogExp2('#bbdef0',.0037);
 const skyMat=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{},vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vP;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 float fbm(vec2 p){float v=0.,a=.52;for(int i=0;i<5;i++){v+=noise(p)*a;p=p*2.03+vec2(21.3,17.1);a*=.5;}return v;}
 void main(){vec3 d=normalize(vP);float h=d.y;vec3 c=mix(vec3(.74,.9,.95),vec3(.19,.61,.86),smoothstep(-.06,.8,h));
 vec2 q=d.xz/(max(h,.03)+.19)*2.4;float n=fbm(q+vec2(3.8,1.7));float wisps=smoothstep(.53,.7,n);float clouds=wisps*smoothstep(.01,.13,h);vec3 cloudColor=mix(vec3(.85,.93,.97),vec3(1.,1.,.98),smoothstep(.54,.7,n));c=mix(c,cloudColor,clouds);gl_FragColor=vec4(c,1.);}`});
 const sky=new T.Mesh(new T.SphereGeometry(700,32,20),skyMat);scene.add(sky);
 scene.add(new T.HemisphereLight('#e6f6ff','#849b60',1.7));
 const sun=new T.DirectionalLight('#fff4dc',2.5);sun.position.set(-45,75,40);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-65,right:65,top:65,bottom:-65,near:1,far:190});sun.shadow.bias=-.0003;sun.shadow.normalBias=.045;sun.shadow.radius=3;scene.add(sun);scene.add(sun.target);
 const groundGeo=new T.PlaneGeometry(360,360,240,240);groundGeo.rotateX(-Math.PI/2);
 const p=groundGeo.attributes.position, cols=new Float32Array(p.count*3);const color=new T.Color();
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),h=heightAt(x,z);p.setY(i,h);const d=pathDist(x,z),v=(Math.sin(x*.2+z*.17)+Math.cos(z*.22))*.035+rand()*.035;const base=d<1.2&&z<28&&z>-65?'#baac79':riverDist(x,z)<7?'#b3be8a':'#779d48';color.set(base);color.offsetHSL(v*.1,v*.2,v);color.toArray(cols,i*3);}
 groundGeo.setAttribute('color',new T.BufferAttribute(cols,3));groundGeo.computeVertexNormals();const groundMat=new T.MeshStandardMaterial({vertexColors:true,roughness:1});
 groundMat.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 groundPos;').replace('#include <begin_vertex>','#include <begin_vertex>\ngroundPos=position;');s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 groundPos;').replace('#include <color_fragment>','#include <color_fragment>\nfloat n=fract(sin(dot(floor(groundPos.xz*14.),vec2(12.9898,78.233)))*43758.5453);diffuseColor.rgb*=.93+n*.13;');};
 const terrain=new T.Mesh(groundGeo,groundMat);terrain.receiveShadow=true;scene.add(terrain);
 // Fine, wind-bent grass: instancing keeps the meadow genuinely three-dimensional.
 const blade=new T.BufferGeometry();blade.setAttribute('position',new T.Float32BufferAttribute([-.034,0,0,.034,0,0,-.019,.3,.025,.019,.3,.025,.035,.64,.11],3));blade.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,0,.5,1,.5,.5,1],2));blade.setIndex([0,1,2,1,3,2,2,3,4]);blade.computeVertexNormals();for(let i=0;i<5;i++)blade.attributes.normal.setXYZ(i,0,1,0);
 const grassMat=new T.MeshStandardMaterial({color:'#ffffff',side:T.DoubleSide,roughness:1});grassMat.onBeforeCompile=s=>{s.uniforms.uWind=wind;s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nuniform float uWind; varying float vBlade;').replace('#include <begin_vertex>',`#include <begin_vertex>
 vBlade=position.y;vec3 worldBase=instanceMatrix[3].xyz;float sway=sin(uWind*1.6+worldBase.x*.3+worldBase.z*.18);transformed.x+=sway*.17*position.y*position.y;transformed.z+=cos(uWind+worldBase.x*.18)*.1*position.y;`);s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying float vBlade;').replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(vec3(.64,.79,.53),vec3(1.2,1.22,.8),vBlade);');};
 const max=160000;const grass=new T.InstancedMesh(blade,grassMat,max);let n=0;
 for(let i=0;i<max*1.4&&n<max;i++){const near=i<max*.65;const x=(rand()-.5)*(near?120:280),z=(rand()-.55)*(near?140:280);const h=heightAt(x,z);if(h<.35||pathDist(x,z)<1.5&&z<28&&z>-65||Math.hypot(x-PORTAL.x,z-PORTAL.z)<4)continue;dummy.position.set(x,h-.05,z);dummy.rotation.set(0,rand()*Math.PI*2,0);const s=.45+rand()*.65;dummy.scale.set(s,s,s);dummy.updateMatrix();grass.setMatrixAt(n,dummy.matrix);color.setHSL(.2+rand()*.035,.45+rand()*.12,.34+rand()*.16);grass.setColorAt(n,color);n++;}grass.count=n;grass.receiveShadow=true;scene.add(grass);
 // Daisies, lavender and their thin stalks, with asymmetric planted patches.
 const petalParts=[];for(let i=0;i<5;i++){const geo=new T.SphereGeometry(1,5,3);geo.scale(.07,.025,.12);geo.translate(0,.49,.075);geo.rotateY(i*Math.PI*2/5);petalParts.push(geo);}const petals=mergeGeometries(petalParts);const fl=new T.InstancedMesh(petals,mat('#fffdeb'),6000);const stems=new T.InstancedMesh(new T.CylinderGeometry(.009,.013,.46,3).translate(0,.23,0),mat('#7b9d50'),6000);const pollen=new T.InstancedMesh(new T.SphereGeometry(.034,5,3).translate(0,.515,0),mat('#e9c658'),6000);
 let fi=0;for(let i=0;i<18000&&fi<6000;i++){const x=(rand()-.5)*150,z=(rand()-.5)*155;const h=heightAt(x,z);if(h<.7||pathDist(x,z)<3||Math.hypot(x-PORTAL.x,z-PORTAL.z)<4)continue;const density=Math.sin(x*.18)*Math.cos(z*.14)+Math.sin(z*.08);if(density<.15)continue;dummy.position.set(x,h,z);dummy.rotation.set(rand()*.15,rand()*6.28,rand()*.15);dummy.scale.setScalar(.65+rand()*.85);dummy.updateMatrix();fl.setMatrixAt(fi,dummy.matrix);stems.setMatrixAt(fi,dummy.matrix);pollen.setMatrixAt(fi,dummy.matrix);if(x<-15&&z<5)fl.setColorAt(fi,new T.Color().setHSL(.7+rand()*.08,.43,.74+rand()*.15));else fl.setColorAt(fi,new T.Color('#fffbed'));fi++;}for(const f of [fl,stems,pollen]){f.count=fi;scene.add(f);}
 // River is an actual surface following the meandering river centre line.
 const verts=[],uvs=[],inds=[];for(let i=0;i<=180;i++){const z=-180+i*2,x=riverX(z);for(const side of [-1,1]){verts.push(x+side*8,.26,z);uvs.push((side+1)/2,i/20);}if(i<180){const j=i*2;inds.push(j,j+2,j+1,j+1,j+2,j+3);}}
 const waterGeo=new T.BufferGeometry();waterGeo.setAttribute('position',new T.Float32BufferAttribute(verts,3));waterGeo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));waterGeo.setIndex(inds);waterGeo.computeVertexNormals();
 const waterMat=new T.ShaderMaterial({transparent:true,uniforms:{time:wind},vertexShader:`varying vec2 vUv;varying vec3 vPos;void main(){vUv=uv;vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time;varying vec2 vUv;varying vec3 vPos;void main(){float a=sin(vPos.z*3.+vPos.x*.6-time*1.3)*sin(vPos.x*2.+time*.6);float glint=pow(max(a,0.),16.);vec3 c=mix(vec3(.19,.58,.64),vec3(.42,.83,.82),.45+.2*sin(vPos.z*.3+vPos.x*.3));c+=glint*.28;float foam=smoothstep(.81,1.,abs(vUv.x-.5)*2.);c=mix(c,vec3(.8,.91,.8),foam*.45);gl_FragColor=vec4(c,.9);}`});const water=new T.Mesh(waterGeo,waterMat);water.receiveShadow=true;scene.add(water);
 // Stepping stones give the river crossing a clear walkable visual rhythm.
 for(let i=0;i<8;i++){const x=21+i*2.3,z=19+Math.sin(i)*.5;const rock=mesh(scene,new T.DodecahedronGeometry(1,1),'#b1bab0',x,.48,z);rock.scale.set(1.15,.48,.95);}
 // Rounded, layered tree silhouettes rather than single cone placeholder trees.
 const leavesGeo=new T.IcosahedronGeometry(1,1),leafMat=mat('#d4e8a7');const crowns=[];
 const lc=document.createElement('canvas');lc.width=512;lc.height=512;const lctx=lc.getContext('2d');lctx.fillStyle='#647d42';lctx.fillRect(0,0,512,512);
 for(let i=0;i<4600;i++){const x=rand()*512,y=rand()*512,r=rand()*6.28;const len=4+rand()*9;lctx.save();lctx.translate(x,y);lctx.rotate(r);lctx.fillStyle=`hsl(${75+rand()*30},${25+rand()*25}%,${22+rand()*37}%)`;lctx.beginPath();lctx.ellipse(0,0,len,len*.4,0,0,Math.PI*2);lctx.fill();lctx.restore();}
 const leafTexture=new T.CanvasTexture(lc);leafTexture.colorSpace=T.SRGBColorSpace;leafTexture.wrapS=leafTexture.wrapT=T.RepeatWrapping;leafTexture.repeat.set(2,1.5);leafMat.map=leafTexture;

 function tree(x,z,size=1,hue=0){const y=heightAt(x,z),g=new T.Group();g.position.set(x,y,z);scene.add(g);obstacles.push({x,z,r:.52*size});link(g,[0,0,0],[.15*size,4.8*size,0],.52*size,.19*size,'#7f8370');for(let b=0;b<5;b++){const a=b*2.4;const bx=Math.cos(a)*2.4*size,bz=Math.sin(a)*2.4*size;link(g,[.1*size,2.7*size,0],[bx,5.3*size,bz],.2*size,.05*size,'#7d8270');for(let j=0;j<9;j++){const lx=bx+(rand()-.5)*3.3*size,ly=(5.6+rand()*1.8)*size,lz=bz+(rand()-.5)*3.3*size;const r=(.7+rand()*.7)*size;crowns.push({x:x+lx,y:y+ly,z:z+lz,sx:r*1.4,sy:r*.9,sz:r,c:new T.Color().setHSL(.23+hue+rand()*.035,.3+rand()*.15,.28+rand()*.12)});}}}
 tree(-28,-22,2.4);tree(-28,7,1.25);tree(48,-10,1.9);tree(47,34,1.65);tree(-40,40,2);tree(-48,-55,2.2);tree(11,-67,1.65);tree(-52,-7,1.6);
 for(let i=0;i<48;i++){const x=(rand()-.5)*300,z=-70-rand()*95;if(riverDist(x,z)<12||Math.hypot(x-PORTAL.x,z-PORTAL.z)<12)continue;tree(x,z,.65+rand()*1.5,rand()>.8?.03:0);}
 const trees=new T.InstancedMesh(leavesGeo,leafMat,crowns.length);crowns.forEach((c,i)=>{dummy.position.set(c.x,c.y,c.z);dummy.rotation.set(rand(),rand(),rand());dummy.scale.set(c.sx,c.sy,c.sz);dummy.updateMatrix();trees.setMatrixAt(i,dummy.matrix);trees.setColorAt(i,c.c);});trees.castShadow=true;trees.receiveShadow=true;scene.add(trees);
 const sprigGeo=new T.BufferGeometry();sprigGeo.setAttribute('position',new T.Float32BufferAttribute([0,0,0,-.12,.06,.13,0,.025,.38,.12,.06,.13],3));sprigGeo.setIndex([0,1,2,0,2,3]);sprigGeo.computeVertexNormals();const sprigs=new T.InstancedMesh(sprigGeo,new T.MeshStandardMaterial({color:'#a7c473',side:T.DoubleSide,roughness:1}),crowns.length*13);
 let si=0;for(const c of crowns){for(let j=0;j<13;j++){const a=rand()*6.28,b=rand()*Math.PI;dummy.position.set(c.x+Math.cos(a)*Math.sin(b)*c.sx,c.y+Math.cos(b)*c.sy,c.z+Math.sin(a)*Math.sin(b)*c.sz);dummy.rotation.set(rand()*6.28,rand()*6.28,rand()*6.28);dummy.scale.setScalar(1.1+rand()*1.1);dummy.updateMatrix();sprigs.setMatrixAt(si,dummy.matrix);sprigs.setColorAt(si,new T.Color().setHSL(.21+rand()*.055,.35,.4+rand()*.12));si++;}}scene.add(sprigs);

 // Soft green bushes and slate outcrops anchor the foreground.
 for(let i=0;i<125;i++){const x=(rand()-.5)*160,z=(rand()-.5)*150;if(pathDist(x,z)<5||riverDist(x,z)<8)continue;const y=heightAt(x,z);if(i%3===0){const rock=mesh(scene,new T.DodecahedronGeometry(1,1),'#a1ada3',x,y+.2,z);rock.scale.set(1+rand()*2,.5+rand()*1.3,1+rand());rock.rotation.set(rand(),rand(),rand());obstacles.push({x,z,r:.9});}else{for(let b=0;b<3;b++)ball(scene,['#6d9658','#8aaa59','#a6b661'][i%3],x+(rand()-.5)*1.6,y+.35,z+(rand()-.5)*1.6,.6+rand()*.45,.4+rand()*.3,.7);}}
 // Scenic chalk escarpments and blue mountain ranges.
 mat('#91b4b7').flatShading=true;mat('#a1ada3').flatShading=true;const ridge=new T.Group();scene.add(ridge);for(let i=0;i<40;i++){const x=-230+i*12+rand()*5,z=-153-rand()*26,y=heightAt(x,z)-3;const stone=mesh(ridge,new T.DodecahedronGeometry(1,1),'#91b4b7',x,y,z);stone.scale.set(9+rand()*7,8+rand()*13,9+rand()*9);stone.rotation.y=rand()*6;}
 for(let i=0;i<22;i++){const x=-300+i*30,z=-260-rand()*80;const m=mesh(scene,new T.ConeGeometry(45+rand()*35,22+rand()*55,9),'#96c1cd',x,10,z);m.rotation.y=rand()*6;}
 // Floating city: suspended pale platforms, tapered architecture and luminous orbital rings.
 const city=new T.Group();city.position.set(64,39,-208);city.scale.setScalar(.7);scene.add(city);
 const island=mesh(city,new T.ConeGeometry(29,39,8),'#9ca9bd',0,-19,0);island.rotation.z=Math.PI;
 mesh(city,new T.CylinderGeometry(29,26,3,48),'#e0e9dc',0,1,0);
 const skyline=new T.Group();city.add(skyline);for(let i=0;i<28;i++){const a=rand()*Math.PI*2,r=rand()*21,h=8+rand()*22;const b=mesh(skyline,new T.CylinderGeometry(1.3,2.1,h,6),'#eaf5ee',Math.cos(a)*r,h/2+2,Math.sin(a)*r);const top=mesh(skyline,new T.ConeGeometry(1.35,4,6),'#a4dbe1',b.position.x,h+4,b.position.z);}
 mesh(city,new T.CylinderGeometry(3,5,44,8),'#edf9f6',0,24,0);mesh(city,new T.ConeGeometry(3,18,8),'#a2d2e0',0,55,0);
 const orbit=new T.Mesh(new T.TorusGeometry(40,.38,8,100),new T.MeshBasicMaterial({color:'#c4f9fb'}));orbit.rotation.x=1.35;city.add(orbit);
 for(let i=0;i<4;i++){const tiny=mesh(scene,new T.ConeGeometry(6+i,13,6),'#a2b7c1',45+i*26,42+i*8,-190-i*15);tiny.rotation.z=Math.PI;}
 // A physically walkable arch at the end of the first expedition.
 const gate=new T.Group();gate.position.set(PORTAL.x,heightAt(PORTAL.x,PORTAL.z),PORTAL.z);scene.add(gate);
 mesh(gate,new T.CylinderGeometry(4.4,4.8,.45,40),'#cbd2b8',0,.1,0);mesh(gate,new T.CylinderGeometry(3.7,4.1,.2,40),'#e2e2cd',0,.42,0);
 const arch=new T.Mesh(new T.TorusGeometry(3.1,.38,10,64),mat('#dbe6da'));arch.position.y=3.55;gate.add(arch);
 const ringMat=new T.MeshStandardMaterial({color:'#b5f2e3',emissive:'#61d5be',emissiveIntensity:1.7});const ring=new T.Mesh(new T.TorusGeometry(2.77,.065,8,72),ringMat);ring.position.y=3.55;gate.add(ring);
 for(const x of [-3.15,3.15]){mesh(gate,new T.CylinderGeometry(.42,.65,2.5,6),'#c7d2bd',x,1.3,0);ball(gate,ringMat,x,2.8,0,.24);obstacles.push({x:PORTAL.x+x,z:PORTAL.z,r:.55});}
 const portalMat=new T.ShaderMaterial({transparent:true,side:T.DoubleSide,depthWrite:false,uniforms:{time:wind},vertexShader:`varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time;varying vec2 u;void main(){float r=length(u-.5)*2.;float waves=sin(r*35.-time*2.)*.08;vec3 c=mix(vec3(.8,1.,.92),vec3(.1,.7,.65),r);gl_FragColor=vec4(c,(.07+pow(r,5.)*.33+waves*.12)*smoothstep(1.,.93,r));}`});const portal=new T.Mesh(new T.CircleGeometry(2.72,64),portalMat);portal.position.y=3.55;gate.add(portal);
 for(let i=0;i<7;i++){const stone=mesh(gate,new T.BoxGeometry(.3,.1,1),'#a0b5a0',Math.sin(i)*3,.56,Math.cos(i)*3);stone.rotation.y=i;}
 // Pollen drifting through the meadow.
 const motesGeo=new T.BufferGeometry(),mp=[];for(let i=0;i<300;i++)mp.push((rand()-.5)*120,1+rand()*9,(rand()-.5)*120);motesGeo.setAttribute('position',new T.Float32BufferAttribute(mp,3));const motes=new T.Points(motesGeo,new T.PointsMaterial({color:'#fffac5',size:.075,transparent:true,opacity:.72,depthWrite:false}));scene.add(motes);
 // Bake static scenery by material to avoid hundreds of individual tree draw calls.
 scene.updateMatrixWorld(true);const batches=new Map(),toRemove=[];
 scene.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o===orbit||o===terrain||o.material.isShaderMaterial)return;const key=o.material.uuid+o.castShadow;const b=batches.get(key)||{mat:o.material,cast:o.castShadow,g:[]};let g=o.geometry.clone().applyMatrix4(o.matrixWorld);if(g.index)g=g.toNonIndexed();g.deleteAttribute('uv');g.deleteAttribute('color');b.g.push(g);batches.set(key,b);toRemove.push(o);});
 toRemove.forEach(o=>o.removeFromParent());for(const b of batches.values()){const m=new T.Mesh(mergeGeometries(b.g),b.mat);m.castShadow=b.cast;m.receiveShadow=true;scene.add(m);b.g.forEach(g=>g.dispose());}
 return {sun,grass,trees,obstacles,gate,water,update(t){wind.value=t;motes.rotation.y=t*.004;orbit.rotation.z=t*.035;},quality(high){grass.count=high?n:Math.floor(n*.5);sun.shadow.mapSize.set(high?2048:1024,high?2048:1024);sun.shadow.map?.dispose();sun.shadow.map=null;}};
}
