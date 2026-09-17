# allGame 本次实测与独立打包报告

日期：2026-09-16。环境：macOS、Node25.8.1、npm11.11.0、Chrome、Apple M3／ANGLE Metal。测试由本agent执行，没有调用其他厂商模型或另一个实现agent。

## 包与结构

- 一个可发现入口SKILL.md，调用ID `allgame`，显示名allGame。
- ZIP为46,600,004字节（44.44 MiB），280个文件；不含node_modules、pycache或本次测试产物。
- 两个内置工艺包及其运行资源均实际随包，不依赖已安装maomao3dgame、moshougame或原note。
- 两套基线共183个工程文件与前两个完整包的源文件hash一致；没有修改原项目或前两个包。
- 新入口/当前工艺说明的Markdown本地链接检查通过，Python工具编译检查与Node辅助脚本语法检查通过。
- skill-creator结构/frontmatter校验通过。

## 实际生成与运行

通过allGame自己的 `scripts/game.py`，分别从完整基础生成了**自定义配色的赛车**与**自定义配色的冒险**，不是直接复用前一轮测试目录：

| 产物 | 已执行 |
|---|---|
| racing-custom | npm ci；16项模拟单元；生产构建；开发版13组浏览器检查；生产版13组浏览器检查，全部通过 |
| adventure-custom | npm ci；15项单元；TypeScript与生产构建；58资产/依赖核验；试玩18组、边界9组、生产6组，全部通过 |
| 通用probe：赛车 | 390×844触屏模拟，真实点击开始、可见canvas、请求/错误检查、新截图通过 |
| 通用probe：冒险 | 1440×900桌面，真实点击开始、可见canvas、请求/错误检查、新截图通过 |

通用probe不证明完整玩法；完整流程验证来自上面的基线浏览器断言。两张开始后的实际画面已经查看，确认呈现真正3D场景、角色与HUD；自定义配色未被描述为已经完成松树林或全新遗迹地图。

## 工具与移位

48项自检覆盖：两个family的exact复制与字节比较、rebuild空src及素材保留、4个预设、自定义主题与brief、差异报告、非法family/主题/代码文本/颜色/seed/退化赛道、非空与symlink路径拒绝、跨工艺包只读保护。

最终ZIP在新的临时目录单独解压，再从该处执行48项自检全部通过。随后只在这个可丢弃副本里故意修改一个文件，verify确实报出hash变化；并未修改交付包。这是可移植资源/脚本验证，不是“所有模型生成同样游戏”的证明。

## 证据

- [打包与SHA报告](verification/allgame/package-report.json)
- [源码目录工具自检](verification/allgame/selftest.json)
- [最终ZIP独立解压48项自检](verification/allgame/zip-isolated-selftest.json)
- [污染副本确实被检测](verification/allgame/isolated-corruption-detected.json)
- [赛车完整调度报告](verification/allgame/racing-check/summary.json)
- [赛车开发13组](verification/allgame/racing-check/development/report.json) · [生产13组](verification/allgame/racing-check/production/report.json)
- [冒险完整调度报告](verification/allgame/adventure-check/summary.json)
- [冒险分阶段汇总](verification/allgame/adventure-check/baseline/summary.json)
- [冒险试玩18组](verification/allgame/adventure-check/baseline/screenshots/playthrough-report.json)
- [边界9组](verification/allgame/adventure-check/baseline/screenshots/edge-report.json) · [生产6组](verification/allgame/adventure-check/baseline/screenshots/production-report.json)
- [赛车通用probe](verification/allgame/racing-probe/report.json) · [冒险通用probe](verification/allgame/adventure-probe/report.json)
- [手机赛车截图](verification/allgame/racing-probe/02-started.png) · [桌面冒险截图](verification/allgame/adventure-probe/02-started.png)

## 能力边界与未验证项

- 内置完整玩法是赛车与第三人称任务两类。计时、投递、探索、收集、竞技场为明确的实施配方，不是已经全部预制/实测的5种新游戏。
- brief只生成需求合同；theme-json接入真实材质/灯光/部分文案，但不会自动创造新角色、树种、建筑拓扑或任务逻辑。
- 没有证明任意模型一次成功、全平台像素一致、真手机性能、音效真人听感、长时间稳定性或所有手柄/全屏行为。
- 两个构建的较大chunk警告保留，没有以提高阈值假装优化。
- 不含node_modules，首次npm安装需网络/缓存。普通游戏运行资源本地齐备，不需要模型API或Blender。
- 冒险狼模型仍无skin/clip，骑士6clip；单人原型不是MMO或官方魔兽客户端。
- 代码/美术/字体/研究图/品牌权利区分保留；不能把整个大包说成统一CC0或自动可商用。
- 按用户要求放在当前交付目录，本轮未更改全局Agent配置；安装时复制ZIP内完整allgame文件夹。
