import type {Match} from '../combat/Match';
export function debugText(match:Match){const s=match.state;return [`FRAME ${s.frame}  |  HITSTOP ${s.hitstop}  |  ${s.phase.toUpperCase()}`,...s.fighters.map(f=>{
 const m=f.move;const phase=m?(f.age<m.startup?'STARTUP':f.age<m.startup+m.active?'ACTIVE':'RECOVERY'):f.state;
 return `P${f.player+1} ${f.character.toUpperCase()}  ${phase} / ${f.age}  HP ${f.health}\n  INPUT ${match.commands[f.player].directions.join(' ')}  ${m?`${m.startup} + ${m.active} + ${m.recovery}F`:''}`;
}),'GREEN hurt  /  RED hit  /  BLUE push  |  ESC pause + N step'].join('\n');}
