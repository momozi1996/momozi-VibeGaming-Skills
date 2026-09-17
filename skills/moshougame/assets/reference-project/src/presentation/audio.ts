export class AudioSystem {
  enabled = true;
  volume = 0.4;
  ambient: HTMLAudioElement;
  step = 0;
  private cache = new Map<string, HTMLAudioElement>();
  constructor() {
    this.ambient = new Audio("/assets/audio/forest.mp3");
    this.ambient.loop = true;
    this.ambient.volume = 0.23;
  }
  start() {
    if (this.enabled) this.ambient.play().catch(() => {});
  }
  play(name: string, volume = 0.5) {
    if (!this.enabled) return;
    const audio = new Audio("/assets/audio/" + name + ".ogg");
    audio.volume = Math.min(1, volume * this.volume);
    audio.play().catch(() => {});
  }
  walk(time: number) {
    if (time - this.step > 0.34) {
      this.step = time;
      this.play(
        time % 1 > 0.5 ? "footstep_grass_000" : "footstep_grass_001",
        0.48,
      );
    }
  }
  setVolume(value: number) {
    this.volume = value;
    this.ambient.volume = value * 0.55;
  }
  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.start();
    else this.ambient.pause();
    return this.enabled;
  }
  pause(paused: boolean) {
    if (paused) this.ambient.pause();
    else this.start();
  }
}
