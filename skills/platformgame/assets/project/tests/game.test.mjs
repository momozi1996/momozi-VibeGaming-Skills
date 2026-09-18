import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from '../src/game.js';
const config=JSON.parse(fs.readFileSync(new URL('../game-config.json',import.meta.url)));
function setup(){const log={choices:null,finish:null,toasts:[]};const api={audio:{play(){}},toast(s){log.toasts.push(s);},finish(win,s){log.finish={win,s};},choose(opts,cb){log.choices={opts,cb};},setToolbar(){}};const game=new Game(Object.values(config.themes)[0],api);return{game,log};}
const input=()=>({keys:new Set(),pressed:new Set(),x:0,y:0});
const storage=new Map();globalThis.localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};

test('jump changes vertical speed, second jump consumed',()=>{let{game:g}=setup(),i=input();i.pressed.add('Space');i.keys.add('Space');g.update(.01,i);assert.ok(g.player.vy<0);assert.equal(g.player.jumps,1);g.update(.01,i);assert.equal(g.player.jumps,0);});
test('release causes lower jump than holding',()=>{let{game:a}=setup(),{game:b}=setup(),ia=input(),ib=input();ia.pressed.add('Space');ib.pressed.add('Space');ia.keys.add('Space');ib.keys.add('Space');a.update(.01,ia);b.update(.01,ib);ia.pressed.clear();ib.pressed.clear();ib.keys.clear();for(let j=0;j<15;j++){a.update(.01,ia);b.update(.01,ib);}assert.ok(a.player.y<b.player.y);});
test('fall respawns at checkpoint and costs one life',()=>{let{game:g}=setup();g.player.y=860;g.update(.01,input());assert.equal(g.lives,4);assert.equal(g.player.y,g.checkpoint.y);});
test('landing uses feet and restores two jumps',()=>{let{game:g}=setup();g.player.x=200;g.player.y=g.platforms[0].y-1;g.player.vy=300;g.player.jumps=0;g.update(.01,input());assert.equal(g.player.y,g.platforms[0].y);assert.equal(g.player.jumps,2);});
test('portal requires key',()=>{let{game:g}=setup();Object.assign(g.player,g.goal);g.update(.01,input());assert.equal(g.level,1);g.key=true;g.update(.01,input());assert.equal(g.level,2);});
test('third level portal completes game',()=>{let{game:g,log}=setup();g.level=3;g.build();g.key=true;Object.assign(g.player,g.goal);g.update(.01,input());assert.equal(log.finish.win,true);});
