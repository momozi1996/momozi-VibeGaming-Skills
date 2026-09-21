# 资产和依赖来源

## Riot / Data Dragon

44 个原始下载文件（5 份英雄 JSON、5 份头像、5 份 splash、20 份技能图标、9 份装备图标），固定版本 16.18.1。

- 元数据：https://ddragon.leagueoflegends.com/cdn/16.18.1/data/zh_CN/champion/{id}.json
- 官方公开开发资料：https://developer.riotgames.com/docs/lol#data-dragon
- 完整 URL、字节与 SHA-256：`public/assets/manifest.json`。
- `champions.json` 是五份原始数据合并的运行派生文件。
- Riot Games / 各权利人所有；不是 CC0。本地引用不构成商业使用、商标使用或完整游戏 IP 授权。工程非 Riot 认可或出品。

## 纹理

12 张来自本地 allgame 冒险工艺包的已完成纹理。仅复制纹理，不使用其游戏代码、地图或模型。具体条目来源/作者/许可见：

- `docs/licenses/upstream-asset-manifest.json`
- `docs/licenses/texture-assets-license.md`
- `docs/licenses/upstream-evidence/`
- `public/assets/textures/manifest.json`：本工程实际复制清单与哈希。

## 本轮新增

`src/world.js` 中的几何、角色部件、地图绘制、针叶 alpha 纹理、动作与特效为本轮程序化创建。UI 布局和音效为本轮实现。名称/参考角色仍可能涉及第三方 IP，不据此声称“全项目原创且可商用”。

## 依赖

- Three.js 0.180.0 — MIT
- Vite 6.3.5 — MIT
- Playwright 1.55.0 — Apache-2.0

对应运行引擎许可证保留于 `docs/licenses/THREE-LICENSE.txt`，开发依赖许可证在 npm 包中。
