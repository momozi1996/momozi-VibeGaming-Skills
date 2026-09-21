export const BOUNDS = { minX: -26, maxX: 26, minZ: -26, maxZ: 29 };
export const SPAWN = { x: 0, z: 24 };
export const SITE = { x: -6, z: -6, radius: 2.8 };
// One geometry definition drives collision, navigation, ray occlusion and radar.
export const BLOCKS = [
 {x:-26.5,z:1.5,w:1,h:8,d:57,kind:'boundary'}, {x:26.5,z:1.5,w:1,h:8,d:57,kind:'boundary'},
 {x:0,z:-26.5,w:54,h:8,d:1,kind:'boundary'}, {x:0,z:29.5,w:54,h:7,d:1,kind:'boundary'},
 {x:-16,z:12,w:22,h:6.3,d:3,kind:'gate'}, {x:16,z:12,w:22,h:6.3,d:3,kind:'gate'},
 {x:0,z:12,w:10,h:1.9,d:3,y:4.4,kind:'lintel'},
 {x:-22,z:-8,w:8,h:8.3,d:34,kind:'building'}, {x:22,z:-8,w:8,h:6.6,d:34,kind:'building'},
 {x:0,z:-24,w:36,h:7.7,d:4,kind:'building'},
 {x:-20,z:25,w:12,h:5.5,d:8,kind:'building'}, {x:21,z:25,w:10,h:6.4,d:8,kind:'building'},
 {x:-10,z:-7.5,w:3.5,h:2.8,d:3.5,kind:'crate'}, {x:-7,z:-11,w:3.2,h:2.8,d:3.2,kind:'crate'},
 {x:-10,z:-11,w:3,h:5.4,d:3,kind:'stack'}, {x:6.8,z:0,w:3.8,h:2.5,d:3.4,kind:'crate'},
 {x:-11.5,z:4,w:3.5,h:1.7,d:2,kind:'sandbag'}, {x:11,z:-14,w:4.6,h:2.3,d:3,kind:'crate'},
 {x:-1,z:-16,w:4,h:1.3,d:1.5,kind:'sandbag'}, {x:14.5,z:6,w:3.2,h:1.6,d:3,kind:'crate'},
 {x:-8,z:20,w:2.5,h:2.1,d:2.5,kind:'crate'}, {x:8.5,z:20,w:1.8,h:1.35,d:1.8,kind:'barrel'}
];
export const BOT_SPAWNS = [{x:-14,z:-13,name:'VIPER'},{x:12,z:-7,name:'ROOK'},{x:2,z:-20,name:'GHOST'}];
export function insideBlock(x,z,r=.35,bottom=0,top=1.75){return BLOCKS.some(b=>top>(b.y||0)&&bottom<(b.y||0)+b.h&&x>b.x-b.w/2-r&&x<b.x+b.w/2+r&&z>b.z-b.d/2-r&&z<b.z+b.d/2+r);}
export function moveCircle(p, dx, dz, r=.35, height=1.75){
 const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dz))/.15));
 for(let i=0;i<steps;i++){const nx=p.x+dx/steps;if(nx>=BOUNDS.minX+r&&nx<=BOUNDS.maxX-r&&!insideBlock(nx,p.z,r,p.y||0,(p.y||0)+height))p.x=nx;const nz=p.z+dz/steps;if(nz>=BOUNDS.minZ+r&&nz<=BOUNDS.maxZ-r&&!insideBlock(p.x,nz,r,p.y||0,(p.y||0)+height))p.z=nz;}
}
export function segmentBlocked(a,b){
 const dir={x:b.x-a.x,y:b.y-a.y,z:b.z-a.z};
 return BLOCKS.some(o=>{let lo=0,hi=1;for(const [axis,min,max] of [['x',o.x-o.w/2,o.x+o.w/2],['y',o.y||0,(o.y||0)+o.h],['z',o.z-o.d/2,o.z+o.d/2]]){if(Math.abs(dir[axis])<1e-8){if(a[axis]<min||a[axis]>max)return false;}else{let t1=(min-a[axis])/dir[axis],t2=(max-a[axis])/dir[axis];if(t1>t2)[t1,t2]=[t2,t1];lo=Math.max(lo,t1);hi=Math.min(hi,t2);if(lo>hi)return false;}}return hi>0.001&&lo<.999;});
}
// A* over a shared, collision-derived grid. No diagonal corner cutting.
export function findPath(from,to){
 const key=(x,z)=>`${x},${z}`,sx=Math.round(from.x),sz=Math.round(from.z),tx=Math.round(to.x),tz=Math.round(to.z);
 const open=[{x:sx,z:sz,g:0,f:0}],best=new Map([[key(sx,sz),0]]),parent=new Map();let end=null;
 for(let iter=0;open.length&&iter<2400;iter++){
  let bi=0;for(let i=1;i<open.length;i++)if(open[i].f<open[bi].f)bi=i;const n=open.splice(bi,1)[0];
  if(Math.hypot(n.x-tx,n.z-tz)<1.5){end=n;break;}
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=n.x+dx,z=n.z+dz,k=key(x,z),g=n.g+1;if(x<-25||x>25||z<-25||z>28||insideBlock(x,z,.44)||g>=(best.get(k)??Infinity))continue;best.set(k,g);parent.set(k,n);open.push({x,z,g,f:g+Math.abs(tx-x)+Math.abs(tz-z)});}
 }
 const out=[];while(end&&(end.x!==sx||end.z!==sz)){out.push({x:end.x,z:end.z});end=parent.get(key(end.x,end.z));}return out.reverse();
}
