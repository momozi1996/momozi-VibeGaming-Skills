---
name: allgame
description: 构建、复刻或改造可玩的浏览器3D游戏。内置赛车和第三人称冒险两套完整工程、程序化与GLB美术、统一脚手架、主题定制和验收工具，可迁移到计时赛、驾驶投递、探索收集与小型战斗等相近玩法。用于实际游戏开发与换场景，不是静态游戏首页或现成全类型游戏引擎。
---

# allGame · 独立 3D 游戏构建工坊

把用户的玩法与美术目标变成**能操作、能完成目标、能重新开始**的游戏。它既是方法库，也是两套完整可运行工程的独立大包；不用安装maomao3dgame或moshougame，不需要原始note目录、专有模型API、其他skill或MCP。任意能读写文件、执行终端并使用浏览器的code agent可顺序执行；不支持skill的工具可直接读本文件。

`SKILL`指本文件所在目录，所有输入均在这里。通用指**架构、工艺、素材与验证方法可迁移**，不代表已打包任意类型游戏或保证所有模型一次成功。

## 1. 先按“玩家主要在做什么”选择基础

| 主循环 | 基础 `family` | 复用范围 |
|---|---|---|
| 驾驶、漂移、过点、竞赛；计时挑战、赛道投递 | `racing` | Three.js：程序化角色/车辆/场景、驾驶AI、比赛、触控、摄影 |
| 徒步探索、第三人称交互、战斗、收集、任务 | `adventure` | Babylon.js/TS：GLB角色、纹理建筑/植被、角色移动、战斗任务、存档、摄影 |
| 射击、平台跳跃、塔防、2D、联机等明显不同核心 | 先看 [玩法路由](references/routing.md) | 复用方法或子系统；本包没有现成成品，不强塞已有游戏、不承诺一键生成 |

用户已给代码／引擎时尊重其选择，按 [通用架构](references/architecture.md) 增量改造，不为使用模板而覆盖旧工程。混合玩法默认选一个主引擎；不要将Three和Babylon直接拼在同一循环里。

## 2. 选工作模式，再建一个可玩的起点

- **exact**：原样恢复内置基线，字节可核验；不能同时要求新主题／新玩法。
- **variant（通常默认）**：复制完整工程，接入配色／灯光／部分文案定制；再由agent实现用户的新场景、角色和玩法。
- **rebuild**：用户明确要重新编写时，只取依赖、素材、测试，src为空；按 [构建流程](references/workflow.md) 补齐。它允许查源，不是隔离盲测。
- **已有工程改造**：不执行create，先备份/分支并建立当前基线，选择性移植工艺；不要重装另一套工程覆盖现有内容。

先查看所选工艺包的 `assets/golden/` 和 `assets/variant-preview.jpg`，记录可保留的视觉层次。写一份新项目设计合同（见 [brief与主题配置](references/configuration.md)），区分“继承已有”“本轮新增”“不做”。缺失细节有合理默认就继续，不反复要求用户指定所有颜色坐标。

```bash
python3 "<SKILL>/scripts/game.py" list
python3 "<SKILL>/scripts/game.py" verify
python3 "<SKILL>/scripts/game.py" create --family racing --mode variant \
  --preset sakura --out "<OUTPUT>"
# 第三人称用 --family adventure --preset autumn
cd "<OUTPUT>"
npm ci --no-audit --no-fund
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4301 --strictPort
```

OUTPUT必须在skill之外且不存在或为空；不覆盖用户旧项目。不在内置基线安装依赖或开发。首次npm安装需网络／缓存；全部运行美术已在包内，普通构建不需要Blender。

## 3. 从起点改到目标，不能停在换标题

1. 阅读 [构建流程](references/workflow.md)：先最小可玩切片，再逐模块美术／玩法／UI集成，每个阶段有可观察验收。
2. 阅读当前目标的 [玩法配方](references/recipes.md) 与 [场景角色改造](references/art-and-world.md)。非原版玩法需要真实状态机、胜负/完成条件、反馈和重开，不是改文案。
3. 只加载选中基础的 [赛车工艺入口](assets/kits/racing/GUIDE.md) 或 [冒险工艺入口](assets/kits/adventure/GUIDE.md)，再按当前模块读其中references和源码。它们是本包内置材料，**不是外部技能依赖**。旧文档的“不能改变”只约束exact，创作按新合同改。
4. UI、素材、世界坐标、碰撞、相机、状态、测试同步；保留单一玩法状态源和输入释放。别用静态参考图、假进度或自动驾驶冒充可玩。

## 4. 实测后才交付

```bash
# 原版/只改外观的基线回归：默认含单元、构建、开发及生产浏览器
node "<SKILL>/scripts/check.mjs" --family racing --project "<OUTPUT>" --out "<REPORT>"
# 任意改造游戏的通用冒烟：开发服务需先启动；不代表玩法通过
node "<SKILL>/scripts/probe.mjs" --project "<OUTPUT>" \
  --url http://127.0.0.1:4301 --out "<PROBE_REPORT>"
```

`check`验证内置基线契约；改地图、存档、数量或玩法后读 [验收](references/acceptance.md)，为变体建立对应测试，不删旧断言伪装通过。`probe`只检查可见canvas、错误、请求和截图，**不证明游戏循环或画面质量**。实际看新截图；没有浏览器或图像能力就明确相关项未验证。

交付可运行项目、启动命令、新测试/截图、许可记录、继承与新增范围、已知局限。读输出 `PROGRESS.md` 续跑，不重新create覆盖成果。制作游戏不授权自动部署、上传或安装全局依赖。

## 按需资源

- [环境与便携](references/runtime.md)：Python/Node/浏览器、端口、路径、常见启动故障。
- [配置合同](references/configuration.md)：可执行主题覆盖与只描述目标的brief的区别。
- [素材与许可](references/assets-and-rights.md)：运行素材在哪、跨引擎移植、权利边界。
- [验收策略](references/acceptance.md)：基线／衍生／性能／视觉分层验证。

本包不要求多agent；单agent即可执行。没有源码或工具的纯聊天模型无法代替实际构建。没有打包MMO、账号服务器、万能物理或现成射击/塔防系统。
