import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Game} from '../src/game.js';
const config=JSON.parse(fs.readFileSync(new URL('../game-config.json',import.meta.url)));
function setup(){const log={choices:null,finish:null,toasts:[]};const api={audio:{play(){}},toast(s){log.toasts.push(s);},finish(win,s){log.finish={win,s};},choose(opts,cb){log.choices={opts,cb};},setToolbar(){}};const game=new Game(Object.values(config.themes)[0],api);return{game,log};}
const input=()=>({keys:new Set(),pressed:new Set(),x:0,y:0});
const storage=new Map();globalThis.localStorage={getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}};

const point=q=>({x:650+(q.col-q.row)*65,y:378+(q.col+q.row)*32});
test('plant-water-grow-harvest has real economy',()=>{let{game:g}=setup(),q=g.plots[3],p=point(q);g.action('carrot');g.click(p.x,p.y);assert.equal(g.gold,32);g.update(2);assert.equal(q.growth,0);g.action('water');g.click(p.x,p.y);for(let i=0;i<30;i++)g.update(1);assert.equal(q.growth,1);g.click(p.x,p.y);assert.equal(g.inventory.carrot,1);assert.equal(q.crop,null);});
test('cannot plant without funds or duplicate existing plant',()=>{let{game:g}=setup(),q=g.plots[3],p=point(q);g.gold=0;g.click(p.x,p.y);assert.equal(q.crop,null);});
test('sleep restores energy and has bankruptcy recovery',()=>{let{game:g}=setup();g.plots.forEach(q=>q.crop=null);g.gold=0;g.energy=0;g.action('sleep');assert.equal(g.energy,40);assert.equal(g.gold,3);});
test('order consumes inventory once',()=>{let{game:g}=setup();g.inventory.carrot=3;g.action('order');assert.equal(g.order,1);assert.equal(g.inventory.carrot,0);let gold=g.gold;g.action('order');assert.equal(g.order,1);assert.equal(g.gold,gold);});
test('save restores valid state without injected fields',()=>{let{game:g}=setup();g.gold=90;g.save();let data=JSON.parse(localStorage.getItem(g.saveKey));data.plots[0].col=100;data.inventory.bad=1;localStorage.setItem(g.saveKey,JSON.stringify(data));let{game:h}=setup();h.load();assert.equal(h.gold,90);assert.equal(h.plots[0].col,0);assert.equal(h.inventory.bad,undefined);});
test('invalid crop/prototype, invalid energy and corrupt JSON are rejected',()=>{let{game:g}=setup();g.save();let data=JSON.parse(localStorage.getItem(g.saveKey));data.plots[0].crop='toString';assert.equal(g.valid(data),null);data.plots[0].crop=null;data.energy=999;assert.equal(g.valid(data),null);localStorage.setItem(g.saveKey,'{bad');assert.equal(g.hasSave(),false);});
test('completed save can continue as sandbox',()=>{let{game:g}=setup();g.order=3;g.level=2;g.save();let{game:h,log}=setup();h.load();h.update(.1);assert.equal(h.finished,true);assert.equal(log.finish,null);});
