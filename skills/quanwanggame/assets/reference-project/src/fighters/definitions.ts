import type { CharacterId, Move } from '../combat/types';
export const CHARACTERS = {
  ava: { name: 'AVA', chinese: '赤燕', style: 'CRIMSON TEMPO', color: '#ff6557', speed: 3.8, jump: 12.5, special: '赤燕 · 裂空踢', description: '迅疾、凌厉。以连续踢击撕开防线。', stats: [5, 3, 4] },
  ren: { name: 'REN', chinese: '玄武', style: 'IRON CURRENT', color: '#c9f660', speed: 3.2, jump: 12.1, special: '玄武 · 破空劲', description: '沉稳、强劲。以气劲掌控战斗距离。', stats: [3, 5, 4] }
} as const;
// Startup is PRE-active duration (frame 0..startup-1), not Dustloop's time-to-hit notation.
const base: Move = {id:'lp',clip:'lp',startup:4,active:3,recovery:10,damage:42,stun:17,blockstun:10,stop:5,knockback:4,level:'mid',box:{x:22,y:-146,w:75,h:32},cancel:[4,13]};
export function movesFor(id: CharacterId): Record<string,Move> {
 const ava=id==='ava';
 return {
  lp: {...base},
  lk: {...base,id:'lk',clip:'lk',startup:6,active:4,recovery:13,damage:58,stun:20,knockback:5,box:{x:15,y:-125,w:111,h:38},cancel:[6,16]},
  hp: {...base,id:'hp',clip:'hp',startup:9,active:4,recovery:20,damage:94,stun:24,blockstun:15,stop:8,knockback:7,box:{x:15,y:-149,w:98,h:43},cancel:[9,19]},
  hk: {...base,id:'hk',clip:'hk',startup:11,active:5,recovery:23,damage:112,stun:27,blockstun:16,stop:9,knockback:8,box:{x:20,y:-145,w:126,h:45},cancel:[11,21]},
  low: {...base,id:'low',clip:'low',startup:7,active:4,recovery:18,damage:65,level:'low',box:{x:15,y:-48,w:104,h:35},cancel:[7,17]},
  air: {...base,id:'air',clip:'air',startup:5,active:11,recovery:12,damage:72,stun:22,level:'high',box:{x:15,y:-95,w:112,h:56},cancel:undefined},
  special: ava ? {...base,id:'special',clip:'special',startup:10,active:13,recovery:25,damage:174,stun:35,stop:11,knockback:12,velocity:6.5,launch:true,cost:0,box:{x:5,y:-146,w:149,h:110},cancel:undefined} :
   {...base,id:'special',clip:'special',startup:14,active:1,recovery:28,damage:145,stun:29,stop:10,knockback:9,projectile:true,cost:0,box:{x:30,y:-115,w:100,h:60},cancel:undefined}
 };
}
export const MOVES = {ava:movesFor('ava'),ren:movesFor('ren')};
