export type CharacterId = 'ava' | 'ren';
export type Action = 'lp' | 'lk' | 'hp' | 'hk' | 'special';
export type State = 'idle' | 'walk' | 'crouch' | 'jump' | 'attack' | 'hit' | 'block' | 'down' | 'win';
export type Mode = 'cpu' | 'versus' | 'training';
export interface InputFrame { x: number; y: number; jump: boolean; buttons: Action[] }
export const neutralInput = (): InputFrame => ({ x: 0, y: 0, jump: false, buttons: [] });
export interface Box { x: number; y: number; w: number; h: number }
export interface Move {
  id: string; clip: string; startup: number; active: number; recovery: number;
  damage: number; stun: number; blockstun: number; stop: number; knockback: number;
  level: 'mid' | 'low' | 'high'; box: Box; reach?: number; launch?: boolean;
  velocity?: number; cancel?: [number, number]; cost?: number; projectile?: boolean;
}
export interface Fighter {
  player: number; character: CharacterId; x: number; y: number; vx: number; vy: number;
  facing: 1 | -1; state: State; age: number; health: number; meter: number; stun: number;
  move: Move | null; serial: number; connected: boolean; invulnerable: number;
  combo: number; comboDamage: number; lastHit: number; input: InputFrame;
}
export interface Projectile { owner: number; x: number; y: number; vx: number; age: number; serial: number; hit: boolean }
export interface CombatEvent { type: 'hit' | 'block' | 'whiff' | 'land' | 'special' | 'round' | 'fight' | 'ko' | 'result'; x?: number; y?: number; power?: number; player?: number; text?: string }
export interface MatchSnapshot { fighters: Fighter[]; frame: number; clock: number; phase: 'intro' | 'fight' | 'ending' | 'result'; phaseAge: number; wins: number[]; round: number; hitstop: number; projectiles: Projectile[]; winner: number | null; mode: Mode; events: CombatEvent[] }
