> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 最终模块合同（高于开工草案）

所有模块为 ES module。向量用 THREE.Vector3。不要在重建中自选另一套命名。

## track.js

```js
createTrack(scene) => {
  curve, length, width, sample, nearest, update,
  pickups, boosts, mapPoints, coastRadius
}
sample(u, lateral=0) => {position,tangent,normal,yaw}
nearest(x,z) => {u,lateral,distance,position}
update(timeSeconds, deltaSeconds)
```

- sample 返回可独立修改的向量，不能把所有调用共享成同一个 temp。
- pickups: `{u,lateral,kind:'coin'|'item',mesh,active:true,respawn:0,baseY,phase}`。
- boosts: `{u,lateral,width,length,mesh}`。
- simulation 更新 active/respawn，track.update 读取 active 显隐并旋转/浮动。
- mapPoints 160 个 `{x,z}`；nearest 1200 段投影。

## racers.js

```js
export const CHARACTERS; // mochi,mango,luna,oreo,sakura,coco
createKart(characterId='mochi',options={}) => THREE.Group
createPortrait(characterId='mochi') => inlineSVGString
kart.userData.animate({time,speed,steer,drift,boost,dt})
kart.userData.dispose()
kart.userData.characterId
kart.userData.character
kart.userData.parts // body,cat,head,tail,eyes,ears,wheels,steering,frontPivots
```

实际支持 options 为 `{color,scale,shadows,accessories}`；main 传入的 `{hero:true,isPlayer:...}` 不被该模块消费。**没有 setCharacter**。换猫重新 createKart；不改变 userData 字符串却继续显示同一模型。

## simulation.js

```js
createSimulation(track,{onEvent,seed=0xa10a}={}) => {
  racers,state,projectiles,reset,start,update,useItem,togglePause,getSnapshot
}
reset(characterId) // phase menu
start() // reset selected + countdown 3
update(dt,input={}) => snapshot
useItem() => boolean
getSnapshot() => {...state,racers,projectiles}
```

input: `{throttle:0..1,brake:0..1,steer:-1..1,drift:boolean,item:boolean,reset:boolean,assist:boolean}`。

state 包含 phase/elapsed/countdown/lap/totalLaps/position/totalRacers/speed/coins/item/boost/driftCharge/results/finishTime/shield/offroad/wrongWay/pausedFrom。这里 `position` 是名次数字，不是 Vector3。**state.speed / snapshot.speed 已是 round(player.speed×3.6) 的 km/h；racers[i].speed 才是 m/s**。UI 不应再乘3.6。

racers 为稳定数组，8 项：player、ai0..ai6。字段含 id/name/characterId/isPlayer/position(Vector3)/yaw/speed(m/s)/steer/drift/boost/progress/lap/coins/item/finished/finishTime/rank/driftCharge/driftTier/shield/hit/offroad/heading/lateral；内部还维护 `_distance/_nextCheckpoint/...`。

events: `countdown/go/coin/item/boost/drift/lap/finish/hit`，含 type/time；针对车的事件另有 racerId/id/racer/isPlayer/position(clone)。`item.action` collect/use，`drift.action` start/charge/release；boost source/tier/duration，hit reason/strength/blocked。

projectiles 包含 id/ownerId/targetId/position/yaw/lateral/speed/life/_distance。simulation 管运动/碰撞，main 管可见网格。

## ui.js

```js
createUI({characters,onStart,onCharacter,onPause,onResume,onRestart,onMenu,
 onMute,onQuality,onCamera,onFullscreen,onPhoto}) => {
 update,setPhase,setLoading,setMuted,setToast,drawMap,getSelectedCharacter,dispose
}
update(snapshot)
setPhase('menu'|'countdown'|'racing'|'paused'|'finished')
setLoading(1) // 1 表示完成，不是 1%
drawMap(points,racers)
```

挂载 #ui-root，canvas 是 #game-canvas。`onStart(selectedId)`，`onCharacter(id)`，onMute(bool)，onQuality('high'|'balanced'|'low')。UI toast/倒计时显示动画可用定时器，但不能改变比赛逻辑时间。触控为 window.__touchInput，按下/松开/取消/失焦都有处理。

## effects.js / audio.js

```js
createEffects(scene) => {update(dt,time,racers),event(event,racers),dispose()}
createAudio() => {unlock(),update(snapshot,dt),event(event),setMuted(bool),dispose()}
```

effects 识别 reset/restart/menu 来清空池。暂停时 main 不推进 effects。Audio unlock 返回 Promise<boolean>，必须通过用户手势，setMuted 不能假装结束所有浏览器 autoplay 限制。

## 严禁的模块漂移

不要混淆 update 参数次序；不要将 snapshot.position 当位置向量；不要删除 main 需要的 projectiles；不要把相机设为 kat.children[0]；不要把草案可选 API 当存在。需要新增字段时保持旧调用仍可执行，并把更改写进差异报告。
