export function riverX(z){return 31+Math.sin(z*.039)*10+Math.sin(z*.095)*3;}
export function riverDist(x,z){return Math.abs(x-riverX(z));}
export function heightAt(x,z){const base=1.15+Math.sin(x*.038+.4)*1.5+Math.cos(z*.043)*1.1+Math.sin(x*.078+z*.045)*.55;const d=riverDist(x,z);const cut=Math.exp(-d*d/70)*4;const hills=Math.max(0,-z-62)*(.13+.065*Math.sin(x*.031))+Math.max(0,Math.abs(x)-62)*.11;return base-cut+hills;}
export function pathDist(x,z){const route= -3 + Math.sin(z*.045)*5;return Math.abs(x-route);}
export function rng(seed=9918){return()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
