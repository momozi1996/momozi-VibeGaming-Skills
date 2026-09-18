import type {CombatEvent} from '../combat/types';
const FILES=['impactPunch_medium_000','impactPunch_heavy_000','impactSoft_heavy_000','footstep_concrete_000','choose_your_character','round_1','round_2','round_3','fight','you_win','you_lose'];
export class AudioSystem {
 private context:AudioContext|null=null;private master:GainNode|null=null;private buffers=new Map<string,AudioBuffer>();private timer=0;private beat=0;muted=false;music=false;
 async unlock(){
  if(!this.context){this.context=new AudioContext();this.master=this.context.createGain();this.master.gain.value=this.muted?0:.55;this.master.connect(this.context.destination);
   await Promise.all(FILES.map(async name=>{try{const r=await fetch(`/assets/audio/${name}.ogg`);if(r.ok)this.buffers.set(name,await this.context!.decodeAudioData(await r.arrayBuffer()));}catch{ /* Sound failure never blocks a match. */ }}));
  }
  if(this.context.state==='suspended')await this.context.resume();
 }
 toggle(){this.muted=!this.muted;if(this.master)this.master.gain.setTargetAtTime(this.muted?0:.55,this.context!.currentTime,.03);return this.muted;}
 private play(name:string,volume=1){if(!this.context||!this.master||!this.buffers.has(name))return;const src=this.context.createBufferSource();src.buffer=this.buffers.get(name)!;const g=this.context.createGain();g.gain.value=volume;src.connect(g);g.connect(this.master);src.start();}
 select(){this.tone(500,.06,.1,'square');}
 events(events:CombatEvent[]){for(const e of events){
  if(e.type==='hit')this.play((e.power??0)>85?'impactPunch_heavy_000':'impactPunch_medium_000',.85);
  if(e.type==='block'){this.play('impactSoft_heavy_000',.6);this.tone(150,.045,.1,'square');}
  if(e.type==='whiff')this.tone(95,.06,.05,'triangle');
  if(e.type==='special'){this.tone(60,.22,.16,'sawtooth');this.tone(420,.16,.05,'triangle');}
  if(e.type==='land')this.play('footstep_concrete_000',.25);
  if(e.type==='round')this.play(`round_${Math.min(3,Number(e.text))}`,.9);
  if(e.type==='fight')this.play('fight',1);
  if(e.type==='ko'){this.tone(65,.55,.15,'sawtooth');this.tone(130,.5,.08,'triangle');}
  if(e.type==='result')this.play(e.player===0?'you_win':'you_lose',1);
 }}
 private tone(freq:number,duration:number,volume:number,wave:OscillatorType){if(!this.context||!this.master||this.context.state!=='running')return;const o=this.context.createOscillator(),g=this.context.createGain();const now=this.context.currentTime;o.type=wave;o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(Math.max(20,freq*.6),now+duration);g.gain.setValueAtTime(volume,now);g.gain.exponentialRampToValueAtTime(.001,now+duration);o.connect(g);g.connect(this.master);o.start(now);o.stop(now+duration+.02);}
 setMusic(on:boolean){this.music=on;window.clearInterval(this.timer);if(on)this.timer=window.setInterval(()=>{const notes=[110,110,164.81,130.81,110,98,146.83,98];this.tone(notes[this.beat%8],.18,.045,'triangle');if(this.beat%2===0)this.tone(52,.12,.09,'sine');this.beat++;},250);}
}
