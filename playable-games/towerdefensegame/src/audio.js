export class Audio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  unlock() {
    if (!this.ctx) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (A) this.ctx = new A();
    }
    this.ctx?.resume().catch(() => {});
  }
  play(kind = "pick") {
    if (this.muted || !this.ctx) return;
    const notes = {
      pick: [659, 880],
      hit: [125, 80],
      shoot: [480, 310],
      plant: [370, 554],
      win: [523, 659, 784, 1047],
      lose: [294, 233, 196],
      build: [392, 523, 784],
      jump: [330, 660],
    };
    const seq = notes[kind] || notes.pick;
    seq.forEach((n, i) => {
      const o = this.ctx.createOscillator(),
        g = this.ctx.createGain(),
        t = this.ctx.currentTime + i * 0.055;
      o.type = kind === "hit" ? "triangle" : "sine";
      o.frequency.setValueAtTime(n, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start(t);
      o.stop(t + 0.18);
    });
  }
}
