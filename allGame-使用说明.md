# allGame · 独立通用3D游戏大包

> 新用户请先看根 [README.md](README.md)：包含全部9包的安装、调用和启动命令。下文保留该批次详细/历史说明；“已安装/已启动”仅指作者当时机器，不是下载后的自动状态。

## 文件

- [allGame.zip](allGame.zip)：一个独立skill安装包；内层文件夹/调用ID为标准小写`allgame`，显示名`allGame`。
- [SKILL.md](skills/allgame/SKILL.md)：未压缩的完整skill入口。
- [SHA-256](allGame.zip.sha256)：压缩包完整性校验。
- `verification/allgame/`：本次真实生成项目、单元/构建/浏览器报告和截图，不在skill ZIP中。

**只安装allGame即可**，不需要maomao3dgame、moshougame或原note。包内不是指向另外两个skill的快捷方式，而是实际复制了两套完整工程、素材、工艺文档和工具。它没有修改前两个安装包，也没有替用户更改全局Agent配置。

把ZIP内的`allgame/`整个文件夹放到目标Agent支持的skill目录，按该工具要求刷新/重开会话。不同Agent目录规则不同，不虚构一个所有软件都通用的全局路径。不支持skills的code agent直接读本包SKILL.md即可。

## 能做什么

### 两套可直接生成的完整基础

- 赛车：真实手动驾驶、漂移、道具、AI比赛、完赛/重开、触控和摄影；Three.js程序化角色/载具/场景。
- 第三人称冒险：移动、交互、战斗、任务、背包、保存/继续、复活与摄影；Babylon.js/TypeScript、GLB/纹理/图标/音效。

保留原样exact、完整改造variant、从空实现rebuild三种模式；提供sakura/sunset/autumn/frost四个主题起点。

### 不是简单合并压缩包

新增统一的family路由、生成入口、可执行主题JSON覆盖、设计brief校验/合同生成、共通系统架构、场景/角色改造流程、基线测试调度和不依赖原游戏debug接口的通用浏览器probe。

还有7条具体玩法路线：内置的卡丁车竞赛/第三人称任务，以及需要agent继续实现的计时赛、驾驶投递、和平探索、收集寻宝和小型竞技场。**这不是7个都已写好的游戏模板。** 每条配方写了状态、修改入口、联动系统与测试标准，不把“换标题”当新玩法。

## 给模型的提示词

```text
使用 $allgame，制作一款森林兔兔卡丁车游戏。
先选择合适基础并跑通，再把角色、树木、地标、道路和UI改成森林主题。
保留真实手动驾驶、漂移、道具、完整比赛和重开，支持桌面和触屏。
写入新的 forest-kart 目录，交付实际测试与截图。
```

```text
使用 $allgame，制作雪谷遗迹寻宝游戏。
选择第三人称冒险基础，改造地形、建筑、碰撞与地图；
以探索并收集3块符石、回营地提交为核心循环，保留保存/继续和摄影。
不要只改任务文案，实际实现新目标状态与测试，输出到新目录。
```

已有项目也可以：

```text
使用 $allgame 的构建与验收方法，在我的现有项目上改造，不替换引擎或覆盖工程。
先运行当前基线，再增加以下玩法：……。
```

没有skill语法：

```text
读取 /实际路径/allgame/SKILL.md，按里面的流程完成我的游戏需求：……。
所有内置素材相对该目录定位，不依赖其他技能。
```

## 不经模型直接生成可运行主题起点

```bash
python3 "<SKILL>/scripts/game.py" list
python3 "<SKILL>/scripts/game.py" verify
python3 "<SKILL>/scripts/game.py" create --family racing --mode variant \
  --preset sakura --theme-json "<SKILL>/assets/examples/racing-theme.json" --out "<OUTPUT>"
cd "<OUTPUT>"
npm ci --no-audit --no-fund
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4301 --strictPort
```

第三人称改为`--family adventure --preset frost --theme-json "<SKILL>/assets/examples/adventure-theme.json"`。

`--theme-json`真正改材质/照明/部分文字；`--brief`只是新游戏需求合同，不会自动把原玩法改为投递或寻宝。输出拒绝非空目录；rebuild只给依赖/素材/测试，需agent写实现才能运行。

## 通用能力边界

不绑定模型品牌、IDE、MCP或付费生成服务，但必须有文件读写、终端与浏览器能力。首次npm ci需要网络/缓存；不包含node_modules，不是完全离线编译环境。普通构建无需Blender。

通用指相近游戏可迁移的工程/美术/玩法/验证方法，不保证任意模型一次成品，也不是预制完整MMO/射击/塔防/2D引擎。超出两类基础时会指导agent保留用户引擎、选用合适子系统并实现缺失部分。

授权边界保留：冒险代码MIT与逐项素材许可，猫猫原工程未附独立顶层LICENSE，商用/公开分发需确认权属。详情见skill内references/assets-and-rights.md。

[本次验证报告](allGame-验证报告.md)
