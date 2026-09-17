# ALOHA KART — integration contract
Original Hawaii cats arcade kart racer, Three.js ES modules. Workspace `aloha-kart`. +Y up, forward +Z, yaw=atan2(tangent.x,tangent.z). All modules `import * as THREE from 'three'`. No external runtime assets or framework needed. Parent owns src/main.js, index.html, package config, tests. Do not edit others' files.

## Track (track.js) owner agent1
`export function createTrack(scene)` -> `{curve,length,width, sample(u,lateral=0), nearest(x,z), update(t,dt), pickups, boosts, mapPoints}`.
- curve closed CatmullRomCurve3; normalized ARCLENGTH parameter u [0,1).
- width full road width ~16; length ~850-1000. y~0.2 sandy course on island terrain y≤0 with ocean y=-1.2. Curved course oriented at start +Z, mostly flat slight elevation okay if terrain matches.
- sample(u,lateral=0) => `{position:Vector3,tangent:Vector3,normal:Vector3,yaw}`. lateral positive to right normal=(tangent.z,0,-tangent.x). nearest(x,z)=> `{u,lateral,distance,position:Vector3}` accurate and cheap sampled segments.
- pickups array objects `{u,lateral,kind:'coin'|'item',mesh,active:true,respawn:0}`. Parent updates visuals visibility and respawn; track.update animates only rotations/floats. Coins main=gold fish coin, items iridescent floating capsules.
- boosts array `{u,lateral,width,length}`.
- mapPoints: [{x,z}] ~100 centerline samples.
Scene big enough for menu hero camera looking from start. Coral/cream curbs, Hawaii beach palms, umbrellas, tiki, lighthouse, offshore volcanic islands, turquoise ocean with animated white surf. Safe vehicle road. Prefer merged/instanced scenery and budget draw calls <350.

## Racers (racers.js) owner agent2
`export const CHARACTERS = [{id,name,subtitle,color,fur,...}]` 6 characters ids `mochi`,`mango`,`luna`,`oreo`,`sakura`,`coco`; mint kart default mochi.
`export function createKart(characterId='mochi', options={})` returns THREE.Group with `.userData.animate({time,speed,steer,drift,boost,dt})` and optional `.userData.setCharacter(id)`; group origin wheel floor, size ~2.5 wide ×3.8 long, cat reaches y~3.3. Forward +Z. Detailed charming cat exposed visible behind, silhouette ears/fluffy tail, bespoke kart chrome wheels/tire treads/lights/exhaust/decal. Cat face facing +Z so front hero view needed. Materials physically pleasing. No import other custom modules. `export function createPortrait(id)` returns inline SVG markup or data URI for UI if desired (avoid dependency; UI has own icon).

## Simulation (simulation.js) owner agent3
`export function createSimulation(track, {onEvent}={})` => `{racers,state,reset(characterId),start(),update(dt,input),useItem(),togglePause(),getSnapshot()}`.
- `racers`:8 entries `{id,name,characterId,isPlayer,position:Vector3,yaw,speed,steer,drift,boost,progress,lap,coins,item,finished}` id player='player', others ai0... . progress unwrapped lap-normalized starting slightly negative for grid; 3 laps. Use sample to place. update position from motion, track nearest or track relative arcade smooth steering; don't force player autopilot except explicit input.assist.
- input `{throttle:0..1, brake:0..1, steer:-1..1, drift:boolean, item:boolean, reset:boolean,assist:boolean}` steering positive right. Turning factor consistent with +Z; heading/right-handed.
- `state` phase 'menu'|'countdown'|'racing'|'paused'|'finished', elapsed, countdown (3→0), lap,totalLaps:3,position,totalRacers:8,speed (kmh),coins,item,boost,driftCharge,results and finishTime; getSnapshot includes racers and these state fields. Events callback `{type:'countdown'|'go'|'coin'|'item'|'boost'|'drift'|'lap'|'finish'|'hit', ...}`.
- start resets phase countdown; toggle pause restores previous. reset phase menu. AI follow different lanes, competitive. Booster/coin/item and drift charged release boost. Respawn action repositions nearest centerline. Keep implement playable physics and lap accounting checkpoint-safe.

## UI (ui.js/ui.css) owner agent4
`export function createUI({characters,onStart,onCharacter,onPause,onResume,onRestart,onMenu,onMute,onQuality,onCamera,onFullscreen,onPhoto})` returns `{update(snapshot),setPhase(phase),setLoading(progress),setMuted(bool),setToast(text),drawMap(points,racers), getSelectedCharacter()}`. Can accept safe extras.
App canvas id='game-canvas', UI mount id='ui-root'. Main imports './ui.css'. UI has original premium summer kart race game aesthetic, cream/mint/navy/coral, italic oversized playful athletic typography, not generic dashboard. Fullscreen 3D background, hero menu left ~40% with ALOHA / KART title and Chinese tagline 夏日猫猫大奖赛, small top brand and season, right center mostly CLEAR to see 3D hero cat kart; bottom horizontal 6 cute selectable cat character chips and big '开始比赛' button, mode selects if functional. Small settings/help panel. Racing HUD speed lower-right, lap/place top-left, coins/timer top-right, circular item, minimap lower-left and controls hint bottom center. Pause/results overlays functional, touch inputs buttons writing window.__touchInput={throttle,brake,steer,drift,item}, keyboard help. Responsive 16:9 desktop and mobile. CSS self-contained, no external images, font may parent fetch. onStart selected ID; onQuality quality key; onCamera and onPhoto callbacks. Main calls update every frame. Accessible labels.

## FX (effects.js/audio.js) owner agent5
`export function createEffects(scene)` => `{update(dt,time,racers),event(event,racers),dispose()}` world-space lightweight drift sparks, tire dust, boost trails, optional celebratory confetti. Efficient pooled points, add no global lights. racer carries position,yaw,speed,drift,boost,isPlayer.
`export function createAudio()` => `{unlock(),update(snapshot,dt),event(event),setMuted(bool),dispose()}` procedural WebAudio relaxing Hawaiian plucked/pentatonic BGM and engine/coin/countdown/drift/boost SFX. Starts only gesture, no autoplay errors, master volume moderate. state racing controls engine. No external assets.
