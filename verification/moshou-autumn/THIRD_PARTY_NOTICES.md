# 第三方软件

以下版本读取自本项目实际安装的 package.json，与 package-lock.json 一致：

| 包 | 版本 | 软件许可证 |
|---|---|---|
| @babylonjs/core | 9.26.0 | Apache-2.0 |
| @babylonjs/loaders | 9.26.0 | Apache-2.0 |
| Vite | 8.3.0 | MIT |
| TypeScript | 7.0.2 | Apache-2.0 |
| @playwright/test | 1.63.0 | Apache-2.0 |

完整的直接与传递依赖以 `package-lock.json` 为准；各包的 LICENSE/NOTICE 在 npm 安装目录中保留。网页生产包主要包含 Babylon.js 运行时代码以及本项目代码，开发和测试工具不作为游戏功能运行。

Babylon.js 的 Apache 2.0 全文与 NOTICE 随生产版本放在 `public/licenses/`（构建后为 `dist/licenses/`）。这些软件不属于 CC0 美术资源。美术许可详见 `ASSETS-LICENSE.md` 和逐文件清单。
