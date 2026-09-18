# 素材与权利记录

## 官方资料（仅研究）

- 来源：用户指定的 Steam app 4126040、其公开 appdetails JSON，以及其列出的官网 `https://www.aniimo.com/`。
- 抓取日期：2026-09-18。页面记录开发商/发行商为 Pawprint Studio。
- `references/steam-00.jpg` 至 `steam-13.jpg` 是官方宣传截图，版权保留在原权利人，不是 CC0，不被当作可商用素材或原游戏3D资产。
- `references/index.html` 只供本地对照；每张图原始地址、实际大小与 SHA-256 在 `references/sources.json`。
- 原游戏名、品牌和世界设定没有因为本原型而获得第三方授权。公开发布或商业使用前，应替换品牌并确认许可；参考截图不进入生产运行目录 `dist`。

## 本轮原创运行内容

`src/world.js` / `actors.js` / `terrain.js` 的几何、叶片绘制、草地、水面、云层、地标、人物、生物、SVG图标、界面与合成音效为本轮编写。没有从原作截图切取贴图，没有下载或使用原作角色模型。四种伙伴为简化原创外观与演示名称，不声称是原版角色。

参考了本地 allgame 工艺的架构、实例化、第三人称交互、共享地形和验收方法；未移入其骑士/狼、美术文件或原游戏基线代码。

## 软件

- Three.js 0.180.0：MIT，原文 `public/licenses/THREE-LICENSE.txt`（随构建复制）。
- Vite 6.3.5、Playwright 1.51.1：开发/测试依赖；相应完整许可保留于各 npm 包。
- 浏览器系统中文字体，无外部字体加载。

游戏所需的唯一文件素材 `public/favicon.svg` 是本轮绘制的简单叶片图标；其余运行图形由本地源码生成。依赖精确版本及完整性由 package-lock.json 记录。
