import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from '../src/game.js';
const config=JSON.parse(fs.readFileSync(new URL('../game-config.json',import.meta.url)));
function setup(){const log={choices:null,finish:null,toasts:[]};const api={audio:{play(){}},toast(s){log.toasts.push(s);},finish(win,s){log.finish={win,s};},choose(opts,cb){log.choices={opts,cb};},setToolbar(){}};const game=new Game(Object.values(config.themes)[0],api);return{game,log};}
const input=()=>({keys:new Set(),pressed:new Set(),x:0,y:0});
const storage=new Map();globalThis.localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};

test('build charges and same pad cannot duplicate',()=>{let{game:g}=setup(),p=g.pads[0];g.click(p.x,p.y);assert.equal(g.gold,135);g.click(p.x,p.y);assert.equal(g.towers.length,1);assert.equal(g.gold,135);});
test('insufficient currency is refused',()=>{let{game:g}=setup();g.gold=0;g.click(g.pads[0].x,g.pads[0].y);assert.equal(g.towers.length,0);});
test('upgrade cap and sale refund are consistent',()=>{let{game:g}=setup();g.click(g.pads[0].x,g.pads[0].y);g.action('upgrade');g.action('upgrade');assert.equal(g.towers[0].level,3);assert.equal(g.gold,0);g.action('upgrade');assert.equal(g.towers[0].level,3);g.action('sell');assert.equal(g.gold,130);assert.equal(g.towers.length,0);});
test('active wave cannot start twice',()=>{let{game:g}=setup();g.action('wave');let q=g.queue;g.action('wave');assert.equal(g.wave,1);assert.equal(g.queue,q);});
test('route interpolation reaches endpoints',()=>{let{game:g}=setup();assert.deepEqual(g.point(0),{x:g.path[0][0],y:g.path[0][1]});assert.deepEqual(g.point(g.length),{x:g.path.at(-1)[0],y:g.path.at(-1)[1]});});
test('frost tower really slows targets',()=>{let{game:g}=setup();g.action('frost');let p=g.pads[0];g.click(p.x,p.y);g.enemies=[{x:p.x,y:p.y,hp:100,max:100,progress:100,speed:0,slow:0}];g.point=()=>({x:p.x,y:p.y});g.update(.01);assert.ok(g.enemies[0].slow>0);assert.ok(g.enemies[0].hp<100);});
test('zero village lives loses, final empty wave wins',()=>{let{game:g,log}=setup();g.lives=0;g.update(.01);assert.equal(log.finish.win,false);({game:g,log}=setup());g.wave=g.total;g.active=true;g.update(.01);assert.equal(log.finish.win,true);});
