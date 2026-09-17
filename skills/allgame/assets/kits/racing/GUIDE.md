> allGame 内置工艺包。此目录不是另一个需安装的skill；下文SKILL指本工艺包目录。统一入口在allGame根目录，优先使用其scripts/game.py。

# maomao3Dgame · 可移植 3D 卡丁车工坊

用随包工程交付**真正可驾驶、可完赛**的游戏。所有路径相对本 `GUIDE.md` 所在目录（下称 `SKILL`），没有外部素材包路径、专有模型 API、其他 skill 或 MCP 依赖。任何具备文件读写、终端和浏览器能力的 code agent 可顺序执行；不支持 skill 的 agent 直接阅读本文件。不承诺任何模型零失误生成，也不把复制称为从零创作。

## 按用户目标选路线

- **exact**：原样、1:1、先打开原版。恢复冻结工程，不改美术或依赖；相同源码不保证跨 GPU 像素相同。
- **variant（创作默认）**：相近效果、换风格／场景／角色。先生成完整可运行变体，再按 [remix.md](references/remix.md) 改造；不要因为基线文档写“不能换风格”拒绝用户的新主题。
- **rebuild**：用户明确要求重新编写。只取依赖、字体和测试，没有游戏实现；读 [build-method.md](references/build-method.md)，按模块建设。不是源码隔离盲测，不能用它证明独立模型的盲写能力。

未指定创作主题时沿用海岛猫猫；`variant --preset sakura` 是可运行换肤起点，不代表已经完成用户要求的新场景。只要请求明确就执行，缺失细节用合理假设记录，不反复追问。

## 最短执行路径

1. 定位 `SKILL`，读 [runtime.md](references/runtime.md)，查看 `assets/golden/01-menu.png`、`02-race.png` 和 `assets/six-cats.jpg`。先确认画面目标，再写新项目的 `DESIGN-BRIEF.md`：风格、地标、角色、玩法保留项、设备、验收视角。
2. 核验并生成到**技能目录之外的新目录**；不在基线或安装目录里开发。

```bash
python3 "<SKILL>/scripts/project.py" verify
python3 "<SKILL>/scripts/project.py" presets
python3 "<SKILL>/scripts/project.py" create --mode variant --preset sakura --out "<OUTPUT>"
# 原版用 --mode exact（不带 --preset）；从空实现用 --mode rebuild
cd "<OUTPUT>"
npm ci --no-audit --no-fund
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4301 --strictPort
```

3. 修改只发生在 OUTPUT。变体已有 `src/theme.js` 的颜色、随机种子和赛道控制点；UI 色在 `ui.css` 末尾，标题是生成时写入，改 theme.title 不会自动同步所有文案。完整换场景必须继续修改几何和布置，不止改颜色。
4. 依 [acceptance.md](references/acceptance.md) 执行本次真实回归与截图，失败修实现；无浏览器时明确“未验证”。输出项目路径、运行命令、新截图、测试结果与基线差异。

## 保留体验，而非锁死题材

完整闭环是选角色 → 倒计时 → 手动驾驶／漂移／道具 → 顺序过点 → 完赛排名 → 重开；暂停、触控、摄影导出都应真实工作。默认沿用6角色、8车、3圈；用户另有要求可以改，同时修改玩法配置、HUD和验收，不保留冲突硬编码。

- 唯一比赛状态源 `simulation.js`；UI 不自建第二份计时／排名。
- +Y向上、车头+Z、弧长 `getPointAt`；右法线 `(t.z,0,-t.x)`。内部 m/s；snapshot.speed 已是 km/h。
- 真实手动开局，自动驾驶只作显式演示／测试。估算 AI 成绩保留 `estimated`／`≈`。
- 世界、AI、道具、小地图共用同一赛道采样；镜头先补偿玩家当帧位移再平滑，避免高速掉队。
- 保留程序化圆润猫咪/车辆工艺、静态合批、共享资源生命周期；换角色仍须完整造型和动画，不交付占位方块。
- 修改新资源时保留许可；见 [provenance.md](references/provenance.md)。不要声称整个素材包 CC0。

## 按需阅读

- 构建／中断续跑：[build-method.md](references/build-method.md)；改主题／角色／场景：[remix.md](references/remix.md)。
- 接口：[architecture.md](references/architecture.md)、[contracts.md](references/contracts.md)。
- 当前修改哪个模块，再读对应 `world-spec.md`、`racer-spec.md`、`gameplay-spec.md`、`visual-spec.md` 或 `audio-fx-spec.md`；精确值在 `project-spec.json` 和 `assets/reference-project/src/`。
- 白屏／镜头／平台问题：`troubleshooting.md`；基线能力边界：`known-limits.md`。

不用一次加载全部源码。单 agent 即可完成，不要求多 agent、联网生成图或 Blender；不要把其他项目的绝对路径写进产物。
