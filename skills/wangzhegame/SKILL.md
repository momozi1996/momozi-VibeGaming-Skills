---
name: wangzhegame
description: 复刻或改造可玩的3D单机5v5 MOBA；内置wangzhe-Game-note的RIFT FORGE峡谷演武v0.1.1完整工程、英雄图片纹理、成品、三路兵线、技能装备、AI推塔与胜负。用于完整复刻或同类游戏创作，不是官方王者荣耀或英雄联盟客户端，也不是多人服务。
---

# wangzheGame · RIFT FORGE / 峡谷演武

默认生成能开局、控制角色、施法购买、推塔并结束对局的完整游戏，不是宣传页面或空脚手架。精确目标为本包 **v0.1.1键鼠修复版**；名称wangzhegame来自资料目录，不将游戏改成官方王者荣耀。

`KIT` 是本文件目录，`OUT` 是用户工作区里**尚不存在**的新目录。完整源码、59个public素材文件、相应dist素材、许可证据、截图与玩法经验都在包内。不依赖原note、原工作区、另一个skill、生图API或外部CDN。

## 一条命令恢复并启动

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4422
```

仅需Python3.9+、支持WebGL2的桌面浏览器和键鼠，**直接试玩不用先装npm**。打开 `http://127.0.0.1:4422/`，选择英雄/模式并进入峡谷。保持服务运行，Ctrl+C停止；端口占用可用 `--port 0`，不结束其他服务。

```bash
# 分开生成和重启
python3 "$KIT/scripts/game.py" create --out "$OUT"
python3 "$OUT/start-demo.py" --port 4422
```

已有作品只启动/增量修改，不重复create。生成项目脱离skill也可运行；dist必须作为HTTP根目录，不能双击index.html，也不默认支持子路径部署。Windows用 `py -3`，变量换真实路径。

## 完整游戏范围与输入约束

先看 `assets/reference-project/artifacts/controls/fixed-game.png`、`assets/reference-project/artifacts/menu.png`、`assets/reference-project/artifacts/shop.png`；按需读 [版本](references/version-contract.md)、[机制](references/mechanics.md)、[操作](references/controls.md)。

- 五名可选英雄Garen/Ashe/Annie/Lux/MasterYi；玩家与九名本地AI构成5v5；三路、兵线、22塔、6水晶、2枢纽和8营地，标准/训练模式。
- 普攻、20技能分支、闪现/治疗、经验等级、击杀经济、九种商店物品、回城/死亡复活、建筑保护与枢纽胜负、结束后重开。
- 一份Match为模拟真值；输入→模拟→3D与UI显示。菜单/HUD/商店是同一个WebGL canvas内的原生UI，无HTML HUD；不能用DOM面板替换全部设计。
- **默认WASD/方向键移动，1–4技能，F/G闪现/治疗；C切经典QWER+D/F。** 不回退到W/D既移动又施法的旧错误。
- 左/右键点击移动与追击普攻，按住右键持续更新目标；按钮技能可进入选目标；X停止，B回城，P商店，Tab战绩，Esc取消目标/关弹层/暂停，Space跟随，Y锁定相机，滚轮缩放。
- 模态UI拦截输入、普通UI右键不购买、失焦释放；观察真实角色位置而不是相机移动。生产没有 `window.__RIFT` 调试接口。

**仅桌面键鼠，未实现手机触屏或多人联机。** 角色/地形为程序化几何，英雄插画/头像/图标和数据含Riot版权内容，不能称全原创或已获商业发行许可；不能去掉原有非官方声明。

## 创作另一种场景／英雄／玩法

先跑完整起点，再按 [创作指南](references/remix-guide.md) 在OUT修改；原样复刻不改版本、数值或美术。变体需同时改地图/导航/小地图、角色与技能/图标、规则/胜负/UI；仅换标题不算完成。

```bash
cd "$OUT"
npm ci --no-audit --no-fund
npm run dev -- --host 127.0.0.1 --port 4421 --strictPort
npm run build
```

开发需要Node20.19+（建议22/24 LTS），首次npm安装需网络/缓存。本包没有完整离线开发缓存；美术和成品离线可用。锁定Three0.180.0/Vite6.3.5与Data Dragon16.18.1，不重新抓latest、不执行素材下载脚本。源码修改后务必重建dist，否则start-demo展示旧版。

只有明确从零重写才用 `reproduce.py restore --mode rebuild`，空src起点不是完整交付。版权素材替换必须使用新授权资产并连同派生数据/UI引用一起修改。

## 实际交付与资料

从新工程启动，检查菜单→开局→真实WASD/鼠标移动→技能/商店→暂停/返回及画面；给出实际地址、重启命令、截图、操作和未测项。不把189个原文件中的历史报告当作本轮结果。

```bash
python3 "$KIT/scripts/game.py" verify
# 可选回归，需先在OUT安装依赖与本机浏览器
python3 "$KIT/scripts/check.py" --project "$OUT" --out "$NEW_REPORT" --suite all
```

rules仅规则/构建；core增加键鼠/生产/故障检查；all再加稳定性与自然模拟对局。夹具缩短场景测试不等于自然试玩，完整范围见 [验收](references/acceptance.md)。浏览器不可用就披露未测，不伪造通过。

按需读：[架构](references/architecture.md)、[画面](references/visuals.md)、[运行](references/runtime.md)、[重建流程](references/workflow.md)、[素材与权利](references/assets-and-rights.md)、[封装来源](references/provenance.md)。

这是有限范围的单机MOBA，不是官方LOL/王者客户端；没有匹配服务、网络同步、完整迷雾/草丛、全装备树/技能加点或官方地图网格。不承诺任何模型一次生成任意游戏或官方等价效果。
