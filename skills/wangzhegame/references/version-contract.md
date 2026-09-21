# 版本合同与恢复边界

## 版本锚点

- 项目名 / package：`rift-forge`；界面标题 RIFT FORGE · 峡谷演武。
- 项目版本：**0.1.1**；冻结日期 **2026-09-21（Asia/Shanghai）**。
- 英雄数据：Data Dragon **16.18.1**；不是运行时查询 latest。
- Three.js **0.180.0**；Vite **6.3.5**；Playwright **1.55.0**；npm lockfile 随包。
- 冻结工程：`SKILL/assets/reference-project`。逐文件清单以 `SKILL/assets/reference-manifest.json` 为准。
- 189文件、31,745,357字节；不包含 node_modules、系统缓存。dist 与原历史 screenshots 已包含。

## 精确度的三层，不混为一谈

1. **文件精确**：exact 源代码、资产、测试、锁文件与基线哈希相同。初始恢复可连 dist/history 一起逐字节验证。
2. **行为与视觉复现**：相同规则与输入在同样环境下工作；重写通过测试并对照参考截图。GPU、字体、浏览器、随机序列调用时机、帧时长会影响逐像素结果，不能无条件保证不同机器的 PNG 哈希一样。
3. **原版 LoL 精确度**：当前未达到。15000方形域是本工程坐标约定，程序人物不是官方模型，技能/AI/装备只是当前实现。原需求中“LOL有什么它就有什么”未完成。必须保留原 `docs/FIDELITY.md` 的差异声明。

## 最新输入修复不能丢

v0.1.1 新增 controls.js，修正模拟手动移动、输入/按键冲突、角色动作和原生UI标签；同时更新真实生产构建与测试。默认从“QWER技能/方向镜头”变为“WASD/方向角色移动，1–4技能，F/G召唤师”，C可切经典。

原工程某些早期规划、差异账本中的 `D闪现/F治疗` 表述属于经典键位或历史说明；最新操作以 `src/controls.js`、README、controls测试为准。不要为了消除文档历史措辞差异，篡改被冻结的文件后仍宣称字节一致；本包新说明已明确解释。

## 证据优先级

- 文件版本：manifest + package + `artifacts/verification-summary.json`。
- 执行行为：冻结源码 + 对应测试；新测试只在新输出运行。
- 说明：本 references；原 README；原 PLAN/PROGRESS/FIDELITY。
- `artifacts/controls/before-fix-source.zip`、`before-fix.json`、`tests/repro-controls.mjs` 是历史问题档案，不是最新来源，不作为验收运行。
- 原自然对局/soak报告是历史记录；本包 `validation/fresh-run` 是打包后新跑的结果，两者不混用。

## 不在本轮添加

账号、匹配、网络同步、排行榜、排位、皮肤、完整符文/装备/视野/迷雾、技能加点、全部英雄、移动端触屏、原版游戏引擎或反作弊。也不将程序化模型替换为别的模板；任何此类改动都应另开 variant 版本与合同。
