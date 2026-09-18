# 项目地图与真值优先级

## 项目身份

- package：`aniimo-windmeadow@1.0.0`，ES modules。
- 网页标题：`伊莫 · 风栖原野 | 可玩风格原型`。
- 运行技术：Three.js **0.180.0**、Vite **6.3.5**；测试 **@playwright/test 1.51.1**。
- Vite 生产拆出engine chunk，未放宽500k警告阈值。基线dist总量约584KB（未压缩，随平台微变）。
- 完整快照66文件，包含源文件、public、dist、README/报告/原研究资料。node_modules由69个锁定包中适用于平台的依赖恢复；macOS arm64实际安装19包。

## 文件责任与接口

| 文件 | 关键导出/入口 | 责任 |
|---|---|---|
| `src/state.js` | SAVE_KEY, SPECIES, WILD, PORTAL, createState, uniqueSpecies, canCapture, startCapture, stepCapture, completeQuest, toggleTwine, selectSpecies, serialize, restore, readSave, save | 唯一逻辑数据/状态机/存档，不依赖Three |
| `src/terrain.js` | riverX, riverDist, heightAt, pathDist, rng | 地形、河流、小径、伪随机数真值 |
| `src/world.js` | mat, ball, link, createWorld | 天空/光/地面/草/花/水/树/石/远山/浮空城/风门；共享材质与合批 |
| `src/actors.js` | bake, makeExplorer, makePet, createPortraits | 程序模型，返回`{root,update}`；GLB不是运行依赖 |
| `src/input.js` | Input class | keys、axes、release、joystick；鼠标环视和语义动作 |
| `src/audio.js` | Audio class | 合成事件音，默认关闭，不含背景音乐 |
| `src/ui.js` | icon, UI class | DOM、窗口、state投影、小地图/大地图、toast/reveal |
| `src/style.css` | 桌面/触屏/竖屏断点 | 所有HUD/弹层视觉，含SVG尺寸、字体、布局 |
| `src/main.js` | boot及内部loop/actions | 初始化、限定dt、移动/碰撞/重力、动画、近邻、捕捉/事件、相机、UI、render |
| `index.html` | #world canvas、#ui容器、#loading | 页面加载骨架、中文locale、favicon |
| `vite.config.js` | manualChunks.engine | 分离three依赖 |

### `createWorld(scene)`返回值
`{sun,grass,trees,obstacles,gate,water,update(t),quality(high)}`。`obstacles`由树干/石头/门柱构造；物理只在XZ圆形推开，不是复杂刚体。

### Actor接口
`makeExplorer()` → `{root, update(t,moving,air,capturing)}`。
`makePet(index,scale=1)` → `{root, update(t,moving=false)}`。
外层root的position/yaw是世界位姿；内部body/leg/arm动画不能覆盖root水平位置。`bake`只合并适合静态合并的mesh，保留动态pivot。

### Input接口
`new Input(canvas,onAction,onOrbit,onZoom)`；`axes()`返回归一化{x,z,sprint}；`joystick()`在UI建好后接入；`release()`清键、拖拽和触控位移。

### UI接口
`new UI(state,portraits,actions)`；`open/close/togglePhoto/update/drawMap/toast/reveal/renderModal`。
它持有同一个state引用，因此重置用`Object.assign`而非用新对象替换state导致UI读旧数据。

## 每帧顺序

1. rawDt来自真实performance.now；玩法dt上限0.05秒。独立wallTime只供界面更新节流。
2. 未暂停：推进state.time → 输入转世界速度 → 世界边界/圆形障碍 → 朝向/跳跃/地面 → 人物/合体/跟随伙伴 → 野生个体 → nearest → ring/capture球 → capture结算 → scan/particles → world shader → 6s自动保存。
3. 无论暂停与否：相机插值、UI投影、renderer.render，调度下一帧。
4. 模态输入阻止世界动作；摄影虽暂停玩法仍可环视与缩放。

## Source vs derived

真值顺序：原源码和锁文件 → 数值合同 → 固定golden → 历史截图/说明。若Markdown与实际代码有不一致，以冻结源为准，记录差异，不用文字描述编造不存在的功能。

`assets/derived/*.glb`是对actors生成结果额外导出的静态备份。不能从这些无动画GLB反推“有原版骨骼”，也不需要让运行项目改为GLB加载。

## DEV调试桥

仅`import.meta.env.DEV`时存在 `window.__ANIIMO__`：
- snapshot()：可序列化state、owned、fps、drawCalls、triangles、camera、near。
- teleport(x,z)：测试定位、地面高度和相机同步。
- actions：真实语义动作。
- world()：实际野生位置、风门。
- setCamera(yaw,pitch,distance)。

重写版保持这个接口以运行原验收；生产必须没有它。测试传送不是游戏玩法，也不是完整手动路线验收。
