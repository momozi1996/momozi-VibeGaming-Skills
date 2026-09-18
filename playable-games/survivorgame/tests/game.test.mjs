import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from '../src/game.js';
const config=JSON.parse(fs.readFileSync(new URL('../game-config.json',import.meta.url)));
function setup(){const log={choices:null,finish:null,toasts:[]};const api={audio:{play(){}},toast(s){log.toasts.push(s);},finish(win,s){log.finish={win,s};},choose(opts,cb){log.choices={opts,cb};},setToolbar(){}};const game=new Game(Object.values(config.themes)[0],api);return{game,log};}
const input=()=>({keys:new Set(),pressed:new Set(),x:0,y:0});
const storage=new Map();globalThis.localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};

test('diagonal movement is normalized',()=>{let{game:g}=setup(),i=input();i.x=i.y=1;let{x,y}=g.player;g.update(.1,i);assert.ok(Math.abs(Math.hypot(g.player.x-x,g.player.y-y)-20.5)<.01);});
test('dash consumes cooldown and cannot immediately repeat',()=>{let{game:g}=setup(),i=input();i.pressed.add('Space');g.update(.02,i);assert.equal(g.dashCD,2.5);g.update(.02,i);assert.ok(g.dashCD<2.5);});
test('pulse has cost-free but enforced cooldown',()=>{let{game:g}=setup();g.enemies=[{x:650,y:435,hp:200}];g.action('pulse');assert.equal(g.enemies[0].hp,110);g.action('pulse');assert.equal(g.enemies[0].hp,110);});
test('XP opens actual upgrade and applies selected effect',()=>{let{game:g,log}=setup();g.xp=g.need;g.update(.01,input());assert.equal(g.level,2);assert.equal(log.choices.opts.length,3);let k=log.choices.opts.findIndex(o=>o.kind==='damage');let before=g.player.damage;log.choices.cb(k);assert.equal(g.player.damage,before+12);});
test('boss death yields one victory',()=>{let{game:g,log}=setup();g.enemies=[{x:900,y:400,hp:0,boss:true,speed:0}];g.update(.01,input());assert.equal(log.finish.win,true);let kills=g.kills;g.update(1,input());assert.equal(g.kills,kills);});
test('lethal damage ends run',()=>{let{game:g,log}=setup();g.player.hp=0;g.update(.01,input());assert.equal(log.finish.win,false);});
test('player cannot leave the arena',()=>{let{game:g}=setup(),i=input();i.x=1;for(let j=0;j<1000;j++)g.update(.02,i);assert.ok(g.player.x<=1150);});
