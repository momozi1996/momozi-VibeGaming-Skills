---
name: quanwanggame
description: 复刻或改造可玩的2D街机格斗游戏；内置quanwang-note霓虹对决完整源码、原生精灵、雨夜街景、音效、成品和离线依赖，覆盖人机、本地双人、训练、轻重拳脚、必杀连击和回合胜负。用于完整复刻或同类格斗创作，不是官方拳皇移植或游戏宣传网页。
---

# quanwangGame · 霓虹对决

交付能直接操作的完整游戏，不是方案、网页门面或空脚手架。默认恢复 **NEON IMPACT 原生精灵＋街机界面 v2**，不换角色、不把原生图集降采样、不重新设计已完成的游戏。

`KIT` 是本文件所在目录，`OUT` 是用户工作区里**尚不存在**的新项目目录。全部资源随这个skill提供，不依赖原quanwang-note、原会话、其他skill、外部生图/模型服务或原作者机器路径。

## 一条命令生成并启动（默认）

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4496
```

自动校验包、恢复完整源码和成品、启动本机HTTP。打开 `http://127.0.0.1:4496/`，让服务保持运行，给用户地址与操作说明；Ctrl+C停止。只需要Python3.9+和现代WebGL浏览器，**试玩不需要先安装npm、联网找素材或重画角色**。

没有指定OUT时选用户工作区下不存在的名字，不能放进技能目录或覆盖已有作品。端口被占用时换空闲端口，也可用 `--port 0` 由系统选择；不关闭其他服务。

也可拆开生成与启动：

```bash
python3 "$KIT/scripts/game.py" create --out "$OUT"
python3 "$KIT/scripts/verify.py" --target "$OUT" --scope all
python3 "$OUT/start-demo.py" --port 4496 --no-open
```

已有作品只运行自己的 `start-demo.py`，不重复create/play。生成工程能脱离skill继续运行；dist使用根路径资源，必须作为HTTP站点根，不双击HTML或直接挂到未经适配的子路径。

## 完整目标与画面

先看 `assets/baseline/refresh-select.png` 和 `refresh-fight.png`，按需读 [画面规格](references/02-visual-spec.md)、[玩法](references/03-gameplay.md)。`assets/reference-project` 是实现真值，122个冻结文件完整保留。

- 全窗口16:9街机选人和战斗，雨夜街道、动态角色、小头像、VS、金色血条，不出现营销导航/卡片/网站页脚。
- 两名角色AVA/赤燕、REN/玄武；P1选定后另一角色成为P2/CPU。原生清晰精灵与固定脚底锚点，不能换成方块、Emoji或低清旧版人物。
- ARCADE人机、VERSUS同键盘双人、TRAINING训练。轻重拳脚、跳跃/蹲攻/空中攻击、相对后方向防御、必杀、命中取消、连击、击退、hitstop。
- AVA前冲裂空踢，REN远程破空劲。固定60Hz逻辑、真实判定和伤害；两胜结果、再战、回选人、暂停、训练重置/逐帧、音效与P1触控。
- 角色动作按帧数据与图集元数据驱动；输入、FSM、碰撞、动画、渲染、音频、UI分层，Match是唯一战斗真值，不能由血条UI决定伤害。

操作：P1 A/D/W/S，J/K/L/I轻拳/轻脚/重拳/重脚，U必杀；P2方向键和数字小键盘1/2/4/5/0。菜单左右选人、上下选模式、Enter开始；Esc暂停，F2判定框，暂停N逐帧，R训练重置。笔记本无小键盘时优先人机/训练，不把数字行当作P2键。

## 用户要求换主题或角色时

先恢复完整可玩起点，再读 [创作改造指南](references/10-remix-guide.md)，在OUT中实际修改并构建。不要仅改标题就算新场景，也不要把每个新题材都当作从零重写。

```bash
node "$KIT/scripts/install-offline.mjs" "$OUT"
cd "$OUT"
npm run dev -- --host 127.0.0.1 --port 4497 --strictPort
# 修改后必须重新生成dist：
npm run build
```

开发需要Node20.19+（兼容22.12+等）和npm。包内85份锁定tarball按SRI/哈希校验后离线安装，只写项目内缓存；不升级依赖、不修改全局npm设置。Node/Python/浏览器/系统字体未打包。重导素材需要可选Pillow/requests，**现成游戏运行和JS构建不需要这些Python包**。

仅明确要求独立重写时走 [重写提示词](prompts/03-独立重写提示词.md)，保持完整行为和素材合同。安装包、冻结项目、基准和哈希不作为开发工作区。

## 交付确认

至少实际启动副本，确认选人→进入战斗→移动/攻击→暂停/返回及画面可用；不以构建成功代替试玩。开发后可直接用包内验证，不需要另装测试skill：

```bash
node "$KIT/scripts/run-checks.mjs" "$OUT"
```

执行29单测、构建、15玩法及8生产/尺寸检查，启动自己的随机端口服务，新证据写到OUT/evidence。进阶固定截图/像素比较见 [步骤](references/06-reproduction-steps.md) 和 [验收](references/07-acceptance.md)；摆姿势截图不是自然通关或实测帧率。新主题不套原主题像素阈值，必要的新测试合同只改输出副本。

交付工程目录、可访问地址/重启命令、操作、真实截图及实际验证范围。有缺失前置条件或未测项明确说明；历史baseline报告不是当前项目通过的证明。

## 按需资料与边界

- 复刻优先级：[01目标](references/01-target-and-workflow.md)；完整一次提示词：[prompts/01](prompts/01-完整复现提示词.md)。
- 战斗与数值：[04架构](references/04-architecture-and-frames.md)、`references/combat-data.json`。
- 精灵/场景/授权：[05素材](references/05-assets-and-animation.md)、项目`docs/ASSETS.md`及`docs/licenses/`。
- 文件入口：[09地图](references/09-file-map.md)；故障：[08陷阱](references/08-pitfalls.md)；分发来源：[provenance](references/provenance.md)。

本包是两角色完整短篇格斗Demo，不是SNK官方KOF资源或完整拳皇。无联网回滚、3v3、投技、翻滚、手柄、同角色对战或存档系统；不要虚构功能。素材CC0与依赖软件许可证分别保留，系统字体不再分发。

能读写文件、执行命令的模型＋code agent均可按本地流程使用，不绑定厂商；不保证所有模型一次完成任意新玩法，亦不保证跨字体/GPU逐像素一致。
