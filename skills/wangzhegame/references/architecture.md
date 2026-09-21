# 架构、接口与状态流

## 工程树

```text
index.html                     一个 #game canvas + Vite入口，基础全屏样式
src/config.js                  数据常量、共享地图/几何/碰撞
src/simulation.js              纯JS模拟，不依赖DOM/Three
src/world.js                   Three世界、程序模型与视觉事件
src/ui.js                      CanvasTexture正交UI与命中区域
src/controls.js                双输入方案、按键状态、鼠标/UI分发
src/main.js                    装配、加载、渲染、相机、音效、主循环
public/assets/                 数据与全部运行图片/纹理
tests/                         Node规则与Playwright浏览器验收
vite.config.js                 本地服务与build
```

不依赖React/Vue、UI组件库、状态管理框架、物理引擎或后端。Three负责场景，业务状态只有Match一份。

## 导出与主调用链

- `config.js`：PATCH、WORLD、SCALE、CHAMPIONS、BASES、SPAWNS、LANES、ITEMS、WALLS；distance/clamp/pathPoint/segmentDistance/navigable/moveToward。
- `simulation.js`：`mitigated(raw,resist)`、`growth(level)`、`route(from,to)`、`class Match(data,champion,mode)`。
- `world.js`：prepareArt、material、part、buildWorld、heroModel、structureModel、minionModel、monsterModel、WorldView。WorldView持有models Map，以实体id对应网格，reset/event/update连接生命周期。
- `ui.js`：`loadImages(data)`，`GameUI(renderer,images,data)`。resize、draw、event、hit；menu/hud/shop/scoreboard/pause/end。`hits = [{id,x,y,w,h,data}]` 仅逻辑坐标，不能靠DOM按钮。
- `controls.js`：CONTROL_SCHEMES、movementVector、GameControls；用注入的app/canvas/ui/aimAt/targeted/sound，不自建第二份match。
- `main.js`：加载数据/images/textures → 创建WorldView/GameUI → app → GameControls → requestAnimationFrame。

```text
keydown/up + mouse
   ↓ GameControls（先处理UI、模态与模式）
Match.steer / command / stop / cast / summoner / recall / buy
   ↓ Match.step(dt) 修改唯一状态、产生events
WorldView.update(match,dt,aim) / event(event)
GameUI.draw(app,dt) / event(event)
renderer: 3D scene → clearDepth → 正交UI scene
```

## Match状态约定

- 顶层：data、mode、time、status(`playing/ended`)、paused、entities、projectiles、zones、events、feed、nextId、kills[2]、towerKills[2]、nextWave、wave、winner、player。
- 实体公共：id、kind、team(0蓝1红2中立)、alive、x/z、hp/maxHp、radius、shield、stun/slow、buffs、cd[4]、target(id)、move(point)、route(points)、lastHit、attackAnim、facing。
- 英雄：champion/name/player、stats、level/xp/gold/inventory、maxMp/mp、ad/ap/armor/mr/speed/range/attackSpeed/atk、kills/deaths/assists/cs/casts/autos、flash/heal/recall/revive、manual(归一方向或null)。
- 小兵：lane/path/pathIndex、ranged/cannon/superUnit。建筑：lane/tier。怪物：monster/home；熊：owner/ttl。
- 事件：announce/damage/death/click/cast/slash/burst/beam/cone/execute/ring/spin/level/reveal/wave/purchase等；主循环一次分发到world/ui/audio后清空，不让event无限积累。

主要方法：add、hero、note、entity、enemies、protected、steer、command、stop、attack、damage、die、addXp、skillInfo、cast、summoner、recall、buy、spawnWave、step、speed。细节规则见mechanics；字段与构造精确数据见game-contract。

## app与输入兼容面

screen=`menu/game`、controlMode、selected、mode、match、shop、scoreboard、help、world/ui/camera、focus、lockCamera、zoom、fps、aim、controls。

- `start()` 重建Match，重置世界、UI命中/公告/浮字、商店/战绩、镜头/输入，canvas focus；不要重开后残留旧实体。
- `menu()` 清match与世界、弹层、按键。菜单相机观察地图中部，但菜单本身使用插画纹理。
- `project(e,height)`：游戏坐标×.01转Three，透视投影转UI1600宽逻辑坐标。
- `aimAt(clientX,clientY)`：鼠标NDC → Raycaster与y=0平面相交 → ×100还原游戏坐标并clamp。
- `targeted()`：在敌对存活实体投影附近32逻辑像素内选最近，英雄采height1.5，塔/枢纽2.5。

## 时间与渲染

真实帧dt上限.1s，累积器以1/30s调用Match.step；模拟自身也cap .1。暂停/ended不前进模拟。UI纹理约每50ms重绘，其他帧重用纹理但仍render UI场景。相机跟随用dt*9平滑，UI与世界坐标分离但共用投影。性能采样是rAF墙钟，不用模拟时间伪造FPS。

## 开发/生产边界

只有 `import.meta.env.DEV` 下提供 `window.__RIFT={app,Match,data,snapshot,hit,step,renderStats}`。生产从构建中移除分支；不能为方便测试在dist加回该API。测试fixture通过dev接口隔离场景，真实dist测试旁观实际drawText位置而不改游戏状态。
