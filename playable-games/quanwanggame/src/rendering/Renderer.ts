import {Application,Assets,Container,Graphics,Sprite,Texture,Rectangle} from 'pixi.js';
import type {MatchSnapshot,Fighter,CombatEvent} from '../combat/types';
import {animationFrame,type Atlas} from '../animation/Animator';
import {attackBox,hurtBoxes,pushBox,GROUND} from '../collision/boxes';
interface Burst {x:number;y:number;age:number;life:number;power:number;kind:string;color:number}
export class Renderer {
 app=new Application();private scene=new Container();private stageLayer=new Container();private actorLayer=new Container();private fx=new Graphics();private backdrop=new Graphics();private environment=new Graphics();private debugGraphic=new Graphics();
 private atlases:Record<string,Atlas>={};private textures:Record<string,Texture[]>={};private actors:Sprite[]=[];private shadows=new Graphics();private bursts:Burst[]=[];private rainTime=0;private shake=0;private flash=0;
 debug=false;menu=true;menuSelection='ava';private ready=false;
 async init(host:HTMLElement){
  await this.app.init({width:960,height:540,background:0x111923,antialias:false,resolution:Math.min(window.devicePixelRatio||1,2),autoDensity:true,preference:'webgl'});
  host.appendChild(this.app.canvas);
  // Match the backing store to the FINAL CSS display size, not just the 960px logical world.
  const resize=()=>{const r=host.getBoundingClientRect();const resolution=Math.min(4,Math.max(.1,r.width/960*(window.devicePixelRatio||1)));this.app.renderer.resize(960,540,resolution);};
  window.addEventListener('resize',()=>requestAnimationFrame(resize));new ResizeObserver(resize).observe(host.parentElement!.parentElement!);resize();
  this.app.canvas.setAttribute('aria-label','霓虹街道格斗场景');
  this.app.stage.addChild(this.scene);this.scene.addChild(this.backdrop,this.stageLayer,this.environment,this.shadows,this.actorLayer,this.fx,this.debugGraphic);
  await this.buildStage();
  for(const name of ['ava','ren']){
   const a:Atlas=await fetch(`/assets/fighters/${name}.json`).then(r=>r.json());this.atlases[name]=a;
   const texture=await Assets.load<Texture>(`/assets/fighters/${name}.png`);texture.source.scaleMode='linear';
   this.textures[name]=Object.values(a.frames).map(f=>new Texture({source:texture.source,frame:new Rectangle(...f.rect as [number,number,number,number])}));
  }
  for(let i=0;i<2;i++){const sp=new Sprite();this.actors.push(sp);this.actorLayer.addChild(sp);}
  this.ready=true;
 }
 private async image(path:string){const t=await Assets.load<Texture>(path);t.source.scaleMode='nearest';return t;}
 private async buildStage(){
  const skyCanvas=document.createElement('canvas');skyCanvas.width=960;skyCanvas.height=540;const ctx=skyCanvas.getContext('2d')!;
  const gr=ctx.createLinearGradient(0,0,0,540);gr.addColorStop(0,'#111326');gr.addColorStop(.44,'#4a263a');gr.addColorStop(1,'#0b2027');ctx.fillStyle=gr;ctx.fillRect(0,0,960,540);
  this.stageLayer.addChild(new Sprite(Texture.from(skyCanvas)));
  const skyline=await this.image('/assets/stage/skyline.png');
  for(let i=0;i<5;i++){const s=new Sprite(skyline);s.scale.set(2.8);s.position.set(i*268-20,-12);s.alpha=.65;this.stageLayer.addChild(s);}
  const street=new Sprite(await this.image('/assets/stage/street.png'));street.scale.set(2);street.position.set(-230,135);this.stageLayer.addChild(street);
  const roadAtlas=await this.image('/assets/stage/road.png');const road=new Texture({source:roadAtlas.source,frame:new Rectangle(48,288,112,78)});
  for(let i=0;i<5;i++){const s=new Sprite(road);s.scale.set(2);s.position.set(i*224-60,452);s.alpha=.92;this.stageLayer.addChild(s);}
  const props=new Sprite(await this.image('/assets/stage/props.png'));props.scale.set(2);props.position.set(-230,135);props.alpha=.9;this.stageLayer.addChild(props);
  const car=new Sprite(await this.image('/assets/stage/car.png'));car.scale.set(1.4);car.position.set(70,353);this.stageLayer.addChild(car);
  const hydrant=new Sprite(await this.image('/assets/stage/hydrant.png'));hydrant.scale.set(1.8);hydrant.position.set(794,354);this.stageLayer.addChild(hydrant);
  // Gentle atmosphere; all buildings, pavement, props and characters remain sourced pixel artwork.
  this.backdrop.rect(0,0,960,540).fill(0x111923);
 }
 render(s:MatchSnapshot,dt:number){
  if(!this.ready)return;this.rainTime+=dt;
  this.scene.x=this.shake?(Math.sin(this.rainTime*139)*this.shake):0;this.scene.y=this.shake?(Math.cos(this.rainTime*113)*this.shake*.45):0;this.shake=Math.max(0,this.shake-dt*38);this.flash=Math.max(0,this.flash-dt*3);
  this.environment.clear();this.shadows.clear();this.fx.clear();this.debugGraphic.clear();
  const e=this.environment;
  for(let i=0;i<70;i++){const x=(i*137.7+this.rainTime*27)%990-15,y=(i*81.3+this.rainTime*290)%550;e.moveTo(x,y).lineTo(x-4,y+11).stroke({width:1,color:0xaad4df,alpha:.09});}
  // Wet-road reflections and occasional neon sign shimmer.
  for(let i=0;i<20;i++){const x=30+i*48,y=460+(i*17)%70;e.rect(x,y,14+(i%4)*11,2).fill({color:i%2?0xf48c4d:0x719eca,alpha:.13});}
  e.rect(0,132,960,3).fill({color:0xff9873,alpha:.12+.04*Math.sin(this.rainTime*2)});
  if(this.menu)e.rect(0,0,960,540).fill({color:0x061027,alpha:.57});
  for(const f of s.fighters){
   const name=this.menu?(f.player===0?'ava':'ren'):f.character,a=this.atlases[name];
   const index=this.menu?a.clips.idle[Math.floor(this.rainTime*12)%a.clips.idle.length]:animationFrame(f,a);
   const sp=this.actors[f.player],bounds=a.frames[index].bounds;
   sp.texture=this.textures[name][index];sp.anchor.set(-bounds[0]/bounds[2],-bounds[1]/bounds[3]);
   const facing=this.menu?(f.player===0?1:-1):f.facing;
   const scale=a.scale*(this.menu?1.25:1);
   const x=this.menu?(f.player===0?238:722):f.x,y=this.menu?391:GROUND-f.y;
   sp.position.set(x,y);sp.scale.set(scale*facing,scale);
   sp.alpha=this.menu?(name===this.menuSelection?1:.8):f.invulnerable>0&&s.frame%4<2?.48:1;
   sp.tint=!this.menu&&f.state==='hit'&&s.hitstop>0?0xffc6bb:0xffffff;sp.visible=true;
   if(this.menu){
    this.shadows.ellipse(x,397,99,14).fill({color:f.player===0?0xff3f4f:0x377dff,alpha:.15}).stroke({color:f.player===0?0xff5566:0x76b9ff,width:1,alpha:.6});
    this.shadows.ellipse(x,395,53,6).fill({color:0x030810,alpha:.65});
   }else{this.shadows.ellipse(f.x,GROUND+4,48-Math.min(20,f.y*.1),7).fill({color:0x030d12,alpha:.48});if(this.debug)this.drawBoxes(f);}
  }
  for(const p of s.projectiles){const g=this.fx;const color=0xc9ff70;g.ellipse(p.x,p.y,35,21).fill({color,alpha:.12});g.ellipse(p.x,p.y,25,15).fill({color,alpha:.4});
   g.moveTo(p.x-24,p.y-11).lineTo(p.x+20,p.y).lineTo(p.x-24,p.y+11).stroke({width:4,color:0xeeffd0});
   for(let j=0;j<5;j++)g.moveTo(p.x-Math.sign(p.vx)*(30+j*11),p.y+(j%2?1:-1)*j*5).lineTo(p.x-Math.sign(p.vx)*(42+j*11),p.y+(j%2?1:-1)*j*5).stroke({width:2,color,alpha:.7-j*.1});
  }
  this.bursts=this.bursts.filter(b=>b.age<b.life);
  for(const b of this.bursts){b.age+=dt;this.drawBurst(b);}
  if(this.flash)this.fx.rect(0,0,960,540).fill({color:0xfff4d2,alpha:this.flash*.13});

 }
 events(events:CombatEvent[]){for(const event of events){
  if(event.type==='hit'||event.type==='block'){
   this.bursts.push({x:event.x!,y:event.y!,age:0,life:.38,power:event.power??60,kind:event.type,color:event.type==='block'?0x8bceff:0xffeabd});
   this.shake=event.type==='hit'?Math.min(8,(event.power??60)/23):2;this.flash=event.type==='hit'?.6:0;
  }else if(event.type==='land'){this.bursts.push({x:event.x!,y:GROUND,age:0,life:.4,power:40,kind:'dust',color:0xc1c2b0});}
  else if(event.type==='special'){this.bursts.push({x:event.x!,y:event.y!,age:0,life:.7,power:150,kind:'special',color:event.player===0?0xff745e:0xc9f660});this.shake=3;}
  else if(event.type==='ko'){this.shake=11;this.flash=1;}
 }}
 private drawBurst(b:Burst){const g=this.fx,t=b.age/b.life,alpha=1-t;
  if(b.kind==='dust'){for(let j=0;j<8;j++){g.ellipse(b.x+(j-4)*t*16,b.y-Math.sin(t*Math.PI)*j*2,2+j*.5,1+j*.3).fill({color:b.color,alpha:alpha*.28});}return;}
  if(b.kind==='special'){g.circle(b.x,b.y,12+t*90).stroke({color:b.color,width:Math.max(1,5*(1-t)),alpha:alpha*.6});for(let j=0;j<10;j++){const angle=j*.628;g.moveTo(b.x+Math.cos(angle)*(20+t*60),b.y+Math.sin(angle)*(20+t*60)).lineTo(b.x+Math.cos(angle)*(30+t*100),b.y+Math.sin(angle)*(30+t*100)).stroke({color:b.color,width:2,alpha});}return;}
  const radius=(18+b.power*.2)*(.3+t*1.5);
  if(b.kind==='block'){g.arc(b.x,b.y,radius,-1.6,1.6).stroke({width:4*(1-t)+1,color:0x81d4ff,alpha});return;}
  g.circle(b.x,b.y,Math.max(1,12*(1-t))).fill({color:0xfffcdf,alpha});
  for(let j=0;j<12;j++){const angle=j*2.399+(j%2)*.25;const r=radius*(.55+(j%3)*.25);const x=b.x+Math.cos(angle)*r,y=b.y+Math.sin(angle)*r;
   g.moveTo(b.x+Math.cos(angle)*r*.28,b.y+Math.sin(angle)*r*.28).lineTo(x,y).stroke({width:j%3===0?4:2,color:j%2?0xffaf5f:0xfff9cc,alpha});
   g.rect(x,y,3,3).fill({color:0xffedb0,alpha});
  }
 }
 private drawBoxes(f:Fighter){const g=this.debugGraphic;for(const b of hurtBoxes(f))g.rect(b.x,b.y,b.w,b.h).fill({color:0x3bff9d,alpha:.1}).stroke({color:0x3bff9d,width:1});const a=attackBox(f);if(a)g.rect(a.x,a.y,a.w,a.h).fill({color:0xff4058,alpha:.22}).stroke({color:0xff4058,width:2});const p=pushBox(f);g.rect(p.x,p.y,p.w,p.h).stroke({color:0x85baff,width:1});}
}
