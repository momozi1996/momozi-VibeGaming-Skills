---
name: csgame
description: 复刻或改造可玩的3D单人战术FPS；内置CSGame-note的COUNTERLINE完整Three.js工程、程序化地图与武器角色、音效、离线成品和创作指南，包含1对3 AI、买枪、狙击、拆弹与回合胜负。用于完整复刻或换场景的同类射击游戏，不是官方CS2客户端或多人联机服务。
---

# CSGame · COUNTERLINE — Dust Protocol

直接交付能操作、能完成回合并重玩的完整游戏，不是静态截图、菜单网页或待实现脚手架。默认保留本包的地图、美术和玩法；不需要先让模型重新写一遍。

`KIT` 是本文件所在目录，`OUT` 是用户工作区中**尚不存在的新目录**。源码、成品、程序化素材及文档都在本包；不依赖原 `CSGame-note`、`cs2-three`、其他 skill、收费 API、Blender 或原会话。

## 默认：一条命令恢复并启动

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4410
```

需要 Python 3.9+、支持 WebGL2 的桌面浏览器和键鼠。**试玩不需要 Node/npm 或联网找素材。** 打开打印的 `http://127.0.0.1:4410/`，保持服务运行；真实点击 **DEPLOY TO SITE** 获取鼠标锁定与音效权限。端口占用可用 `--port 0` 自动选空闲端口，不关闭其他服务。

拆开生成／重启也可以：

```bash
python3 "$KIT/scripts/game.py" create --out "$OUT"
python3 "$OUT/start-demo.py" --port 4410
```

生成工程可脱离 skill 运行。已有作品只启动 `start-demo.py`，不要重复 create/play；工具拒绝覆盖已有路径。成品 `dist` 必须作为 HTTP 根目录，不双击 HTML。Windows 用 `py -3` 代替 `python3`，用实际路径代替变量。

## 游戏与画面必须保住什么

先看 `assets/project/artifacts/menu.png`、`gameplay.png`、`scope.png`。按需要读 [玩法合同](references/02-玩法与数据合同.md) 与 [画面/输入](references/05-画面UI与输入.md)。

- 原创 Al Safra 沙色院落：拱门、楼体窗格、木箱、沙袋、棕榈、电线、远景，带真实阴影、雾与程序纹理，不用背景截图冒充3D。
- 第一人称武器和双臂独立相机渲染；步枪 AR-47、手枪 P-12、狙击 SR-08，开镜、后坐、换弹动作与 WebAudio 合成音。
- 单人1对3：敌人避障寻路、视线遮挡、命中/伤害、难度选择；玩家子弹和AI视线共用墙体。不是正式竞技游戏物理。
- 3秒部署 → 65秒炸弹倒计时 → 接近A点持续按E拆弹5秒 → 回合结算4秒 → 先得5分的比赛结果 → 再玩。
- 全灭敌人**仍须拆弹**；移动、射击或松E会打断；死亡/超时判负。购买武器/护甲、金币、雷达、记分板、暂停/恢复、设置保留。
- 真正状态在 `simulation.js`；UI只展示，不另造一套倒计时或由血条决定伤害。生产成品不暴露 `window.__counterline` 调试接口。

操作：WASD移动，鼠标看向，左键射击，右键瞄准，R换弹，1/2主副武器，Shift慢走，Ctrl/C蹲下，Space跳，E拆弹，B军械库，按住Tab记分，Esc暂停。只有设置存档，没有比赛进度存档。**仅桌面键鼠，不将响应式布局当作手机触控支持。**

## 换风格／场景／玩法

先恢复并运行完整起点，再按 [创作改造指南](references/10-remix-guide.md) 在OUT修改。不要仅换标题或颜色便称完成新地图。开发需要Node、npm网络或已有缓存；开发依赖没有打包为完整离线缓存。

```bash
cd "$OUT"
npm ci --no-audit --no-fund
npm run dev -- --host 127.0.0.1 --port 4411 --strictPort
# 修改源码后重新生成试玩成品，否则start-demo仍显示旧版：
npm run build
```

保留锁定 Three.js 0.180.0 / Vite 6.3.5。锁文件使用 npmmirror；遇网络问题按 [运行说明](references/01-运行与原样恢复.md) 处理，不默默删锁或升级。地图同时改视觉、碰撞、导航、雷达、出生和目标位置；武器同时改模型、数值、HUD、命中反馈。新增主题没有预制一键开关，需 Agent 实作。

原始40文件完全按字节恢复可用 `scripts/repro.py restore`；默认 create 在其上仅加一个便携启动器。只有用户明确要求从空实现重写时用 `repro.py scaffold` 和 [逐阶段重建](references/06-逐阶段重建.md)，不能把脚手架当成默认可玩交付。

## 交付检查与资料

实际启动输出项目，检查开局、鼠标视角、移动/射击、购买/暂停及可见画面，给出地址、重启命令、操作和未测项。需要完整回归时，用包内工具，不要求另装测试skill：

```bash
python3 "$KIT/scripts/game.py" verify
node "$KIT/scripts/check.mjs" --project "$OUT" --out "$NEW_REPORT"
```

后者需要输出项目已装依赖和本机Chrome；依次执行单元、构建、开发/生产浏览器检查，新报告不能覆盖历史素材。旧 `artifacts` 是参考证据，不冒充本轮通过。无浏览器工具就明确未实际试玩，不把构建成功说成通关。

按需读取：
- [地图与导航](references/03-地图与导航.md)、[程序化美术](references/04-程序化素材.md)：保持几何、材质和性能经验。
- [验收与证据](references/07-验收与证据.md)、[排错](references/08-排错与已知边界.md)、[工具定位](references/09-工具参数与文件定位.md)。
- [来源与许可](references/provenance.md)：原项目MIT及Three许可原文保留；静态GLB是辅助导出，没有骨骼动画，runtime以程序化源码为准。

这是原创短篇单人战术FPS，不是Valve CS2、Dust II或联网匹配。没有手雷、刀、捡枪、破坏系统、可行走屋顶或服务器；新机制需实际开发。支持能读写文件和执行命令的不同模型＋code agent，不承诺任意模型一次完成任意创意或跨GPU逐像素一致。
