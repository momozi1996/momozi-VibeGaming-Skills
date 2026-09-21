# 来源、封装与许可边界

## 原始材料与完整性

源资料为用户提供的 `CSGame-note/skills/counterline-repro`。本次以 `csgame` 作为独立安装ID，展示名 CSGame；没有保留一个嵌套的第二SKILL入口。

- `assets/project` 的40文件及 `assets/BASELINE-MANIFEST.json` **原字节保留**：完整源码、dist、测试、许可证、历史截图和报告。
- `assets/data` 保留地图、枪械、初始状态与版本数据；源代码仍是行为真值。
- 原资料提到 `assets/extracted`，但交接目录实际未包含。本次从字节一致的恢复副本实际执行 `export-assets.mjs`，补齐5个静态GLB、23张纹理PNG、地图SVG及索引；索引中的临时机器路径改成相对来源。没有把未生成的文件写成已包含。
- 验收适配器在不改变断言的前提下先关闭WebGL页面再关闭Chrome；原始测试文件字节仍保留。
- 新增 `game.py` 和便携 `start-demo.py`，默认不经过npm即可恢复/运行已有成品；原始repro接口继续支持精确恢复/显式重写。
- 改为本skill内 `SKILL-MANIFEST.json` 校验，不读取安装目录上方无关仓库的manifest；补充创作工作流与玩法/美术改造指南。
- 没有复制原note根README里不存在的 `validation/REPORT.md` 或 `PACKAGE-MANIFEST.json` 声明；本包使用自己的实际清单。
- 原 `assets/project/artifacts/*` 是历史证据，本轮结果在仓库 `CSGame-交付记录.md` 及本地verification/csgame；用户运行时需报告自己的实测结果。

## 权利范围

- 原游戏 `assets/project/LICENSE` 为 MIT，版权行为 `2026 Counterline contributors`，原文不改。
- 原创程序几何、纹理、武器/角色、界面、合成音来源见 `assets/project/THIRD_PARTY.md`；导出资产来自这些程序源，不引入第三方模型。
- Three.js 0.180.0 的MIT原文随 THIRD_PARTY 保留。Vite为MIT开发工具、Playwright为Apache-2.0测试工具；本包不分发node_modules或完整npm缓存。
- 系统Arial/Impact字体不再分发，跨系统外观可能有差别。
- 没有Valve/Counter-Strike/CS2官方模型、地图、代码或授权；不得将原创院落称为Dust II或官方复刻客户端。
- 新增/原skill文档、工具层的统一公开许可仍由维护者确认；原项目MIT不自动等于整个game-skill-packages仓库MIT。公开发布遵循仓库RIGHTS清单。

程序化源是完整运行美术；导出的GLB只作为辅助资产，没有骨骼AnimationClip，不代表新增了运行时功能。Node/Python/Chrome仍由运行环境提供，开发首次装依赖需npm网络或已有缓存，不能宣传完全离线开发环境。
