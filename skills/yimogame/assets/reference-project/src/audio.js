export class Audio{
 constructor(){this.enabled=false;this.ctx=null;}
 unlock(){if(!this.ctx)this.ctx=new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume();}
 play(type){if(!this.enabled)return;this.unlock();const c=this.ctx;const notes={capture:[523,659,784,1046],twine:[392,587,784],scan:[880,1175],jump:[330,495],complete:[523,659,784,1046,1318],select:[660],error:[220,196]};(notes[type]||notes.select).forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(f,c.currentTime+i*.09);g.gain.setValueAtTime(0,c.currentTime+i*.09);g.gain.linearRampToValueAtTime(.065,c.currentTime+i*.09+.015);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+i*.09+.45);o.connect(g);g.connect(c.destination);o.start(c.currentTime+i*.09);o.stop(c.currentTime+i*.09+.5);});}
 toggle(){this.enabled=!this.enabled;if(this.enabled)this.play('select');return this.enabled;}
}
