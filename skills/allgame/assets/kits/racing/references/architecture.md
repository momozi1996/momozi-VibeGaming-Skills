> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 最终架构与责任边界

## 技术栈 / 文件

原生 HTML + ES modules + CSS，Three.js 0.180.0，Vite 6.3.5，@playwright/test 1.51.1。源码约 9 个 JS 文件、3 个 CSS 文件（以 manifest 为准）。不需要 React、服务器 API、数据库、外部模型服务。

```text
index.html (#game-canvas, #ui-root, #boot)
  └─ src/main.js
      ├─ Three WebGLRenderer / Scene / PerspectiveCamera
      ├─ Three addons: OrbitControls, postprocessing, RoomEnvironment
      ├─ track.js          -> 场景、弧长采样、收集品 mesh
      ├─ racers.js         -> CHARACTERS / 每台车的 Group
      ├─ simulation.js     -> 唯一玩法状态、AI、道具、排名
      ├─ effects.js        -> 粒子池
      ├─ audio.js          -> 用户手势后 WebAudio
      ├─ ui.js             -> DOM、HUD、菜单、模态框、触控
      └─ ui.css / shell.css / fonts.css
```

## 初始化与每帧

1. renderer → scene/sky/lights/PMREM → track → effects/audio → simulation。
2. Composer 的顺序是 RenderPass → UnrealBloomPass → 自定义 ShaderPass → OutputPass。`setQuality()` 必须在 composer/bloom 存在后调用。
3. OrbitControls 创建后才让 UI onPhoto/onStart 等能执行；避免暂时性死区。
4. createUI → 初始 loading=1 → menu → hero + 8 racer 实例。
5. 每帧：读取输入 → simulation.update → snapshot → UI phase → 更新模型/场景/镜头 → HUD/地图 → audio → composer.render → `window.__ready=true`。

## 状态所有权

- `simulation.state` 只有 menu/countdown/racing/paused/finished。photo 是 main 的正交状态，不要硬塞成模拟状态机第六态。
- `main` 管 selected、muted、quality、cameraMode、photo、keys、meshById、盾牌/投射物 mesh。
- `simulation` 管 speed/lap/progress/coins/item/boost/driftCharge/shield/active/respawn 和物理。
- `track` 不推进比赛，只通过 `update(time,dt)` 更新海面/摇摆/道具旋转与 visibility。
- `UI` 从 snapshot 渲染，不自己累加时间/排名。touch 只写 `window.__touchInput`。

## 坐标与单位

+Y 朝上，车头 +Z。yaw=atan2(tangent.x,tangent.z)。右向量=(tangent.z,0,-tangent.x)。转向 +1 表示向右。距离米、内部速度 m/s、时间秒、角度弧度；HUD speed 为 m/s×3.6 后取整。

`u` 为弧长归一化 `getPointAt(u)`，不是曲线节点下标；`progress` 是未包裹圈数，可从负值开始。采样 `u` 可 wrap，lap/rank 检查点不能因此 wrap 丢掉圈数。

## 输入 / 对外测试入口

main 统一 keyboard、touch、gamepad。普通调用 assist=false；`?autoplay` / `window.__autoDrive` 仅显式自动演示/测试。`?test=1` 仅防测试失焦自动暂停，不自动加油。

暴露 `window.__game`：scene, renderer, camera, track, simulation, ui, CHARACTERS, start, menu, pause, resume, setQuality, chooseCharacter, togglePhoto, savePhoto, step, snapshot getter, stats getter。

`step(dt,input)` 只推进 simulation；dt>1 让下帧摄像机重新定位。测试要再渲染帧才能截到新状态。

## 生命周期

换角色/重开移除旧 Group，调用 `userData.dispose()`，不要手动销毁所有共享 geometry/material。race/reset 清空 touch/keys、effects reset、toast；丢失指针/页面隐藏释放触控。原项目不提供完整顶层 dispose；资料包不擅自补新特性到精确快照。
