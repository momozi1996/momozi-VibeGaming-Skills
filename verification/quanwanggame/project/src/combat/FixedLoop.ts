export class FixedLoop {
 private last=0;private accumulator=0;private raf=0;paused=false;fps=60;slowFrames=0;
 constructor(private tick:()=>void,private render:(dt:number)=>void){}
 start(){const loop=(now:number)=>{const delta=this.last?Math.min(100,now-this.last):0;this.last=now;this.fps=this.fps*.95+(delta?1000/delta:60)*.05;
  if(!this.paused){this.accumulator+=delta;let steps=0;while(this.accumulator+1e-8>=1000/60&&steps<6){this.tick();this.accumulator=Math.max(0,this.accumulator-1000/60);steps++;}if(steps===6)this.slowFrames++;}else this.accumulator=0;
  this.render(delta/1000);this.raf=requestAnimationFrame(loop);};this.raf=requestAnimationFrame(loop);}
 resetClock(){this.last=0;this.accumulator=0;}
 stop(){cancelAnimationFrame(this.raf);}
}
