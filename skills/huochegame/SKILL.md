---
name: huochegame
description: 复刻或改造可玩的3D群岛电车游戏；内置huoche-Game-note的CLOUDLINE云间慢行完整工程、离线单文件、程序化场景与电车、停站换客、驾驶奖励和工坊改装。用于完整复刻或换场景的轻驾驶创作，不是写实火车模拟器或静态游戏页面。
---

# huocheGame · CLOUDLINE / 云间慢行

直接交付可驾驶、可停站换客、可完成工坊改装的完整游戏。默认恢复已完成工程，不要求模型先重写，不把重建脚手架或截图页面当成品。

`KIT` 是本文件目录，`OUT` 是用户工作区中**尚不存在**的新项目目录。引擎、程序化美术/音效、源码、成品、参考图和经验都内置；不依赖原huoche-Game-note、cloudline目录、其他skill、外部API或联网素材。

## 一条命令恢复并启动

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4430
```

打开打印的 `http://127.0.0.1:4430/cloudline.html`。仅需Python3.9+与支持WebGL的现代浏览器；无需Node/npm、下载模型或重画美术。保持服务运行，Ctrl+C停止；端口冲突可用 `--port 0`，不停止其他服务。

也可分开执行：

```bash
python3 "$KIT/scripts/game.py" create --out "$OUT"
python3 "$OUT/start-demo.py" --port 4430
```

已有项目只重启，不重复create/play。输出可脱离skill运行；**`cloudline.html`本身内嵌Three.js r160和全部素材，也可以直接双击离线玩**。HTTP和file://的存档域不同，不承诺二者共享进度。Windows用 `py -3` 与真实路径替换示例。

## 必须保留的玩法与视觉

先看 `assets/reference-project/screenshots/01-departure.png`、`04-mango-docked.png`、`06-workshop-upgraded.png`，按需读 [契约](references/01-contract.md)、[玩法](references/03-gameplay.md)。

- 群岛、房屋、海天、云朵、电车、居民、轨道和独立工坊是实际3D程序模型，不是背景截图。CatmullRom三维闭环约725m，以弧长驱动电车和相机。
- 初始静止、240钱、12/16乘客、100舒适度；手动动力/制动、坡度、弯道和侧风影响体验；两站往返、低速停靠、开门上下客、关门发车。
- 车费与平稳小费只在开门时结算一次；高速过站安全制动且失去平稳奖励；工坊往返和重复按键不能刷钱。
- 工坊两阶段改装、车体可见变化、回到出发/停站状态；保存钱和完整改装，重开旅程不抹掉已保存进展。
- 固定1/60模拟步长，一份state管理驾驶、舒适度、乘客和奖励；暂停冻结真实计时，失焦与触屏cancel释放输入。

操作：W/↑动力，S/↓/空格制动，←/→环绕相机，V切视角，E车门，M静音，Esc/P暂停；屏幕有触控踏板和交互按钮。详见 [UI输入](references/05-ui-input.md)。不要把空格误写成暂停，也没有H鸣笛、C相机或R重开快捷键。

## 换场景与风格

先恢复完整工程，再读 [创作改造](references/12-remix-guide.md)，实际改输出的 `src/game.js`、`src/shell.html`、`src/style.css`。保住驾驶→停站→换客→奖励→改装闭环；不能只改名字或背景色。

```bash
cd "$OUT"
node build.mjs
# 重启/刷新cloudline.html查看新成品，不要一直看旧构建
```

构建只需Node，无需npm安装；引擎已内嵌。新轨道必须联动站台位置、车朝向、相机与停站参数。原版没有预制“雪山/太空”等主题开关，需Agent实作。只在用户明确要求从空实现重写时用 `pack.py prepare --out "$OUT"`，详见 [重建流程](references/06-workflow.md)；它不是默认可玩路线。

## 交付与按需检查

实际启动副本，检查启程、动力/制动、开门/工坊入口、画面与暂停，交付地址、独立HTML/源码、重启方式、操作和未测项。没有浏览器工具则明确未实际试玩，不把旧截图/旧passed当新结果。

```bash
python3 "$KIT/scripts/game.py" verify
# 可选完整回归：只在输出项目tooling里装测试依赖，不在skill里装
cd "$OUT/tooling"
npm ci --no-audit --no-fund
node "$KIT/scripts/run-checks.mjs" --project "$OUT" --out "$NEW_REPORT"
```

测试需要Node和本机Chrome；首次测试安装需网络/缓存，但试玩/恢复/构建无需网络。默认运行原24项检查，不要求其他测试skill。固定状态截图/差分见 [验收](references/07-acceptance.md)，图片对比不是独立通关证明。

按需读：[世界与美术](references/02-world-art.md)、[车体/工坊](references/04-tram-workshop.md)、[源码导航](references/source-map.md)、[运行](references/09-runtime.md)、[排错](references/08-pitfalls.md)、[素材](references/10-assets.md)、[来源/授权](references/provenance.md)。

范围：两站共用闭环、轻驾驶与改装，没有道岔/独立路网、脱轨刚体、全乘客寻路或多人联机。所谓“炉火叶片”是原版车顶材质/抬升表现，不是独立涡轮资产。支持能读写文件和运行命令的不同模型＋code agent，不保证任意模型一次实现任意新创意。
