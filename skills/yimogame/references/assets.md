# 素材完整清单与复用方式

逐文件路径、用途、大小与哈希：`asset-catalog.json`。原快照完整性：`assets/project-manifest.json`。所有素材都在包里，不要求联网寻找缺失主角/贴图。

## 真正运行所需

| 资产 | 来源/位置 | 生成方式 |
|---|---|---|
| 探险家 | reference-project/src/actors.js makeExplorer | 原创sphere/cylinder/torus组合、颜色材质、bake静态部分、pivot动画 |
| 绵云/焰尾/泡泡/芽芽 | 同文件makePet(0..3) | 原创程序几何与JS帧动画 |
| 伙伴/图鉴头像 | createPortraits(renderer) | 从同模型360²渲染data URL，不是下载图片 |
| 草/白花/紫花 | world.js | 实例几何+shader，固定seed |
| 树冠纹理 | world.js createElement(canvas) | 512²绘制4600片叶，再CanvasTexture |
| 树/灌木/石/山/城/门 | world.js | 几何、合批、实例化、着色器 |
| 水/云/微粒 | world.js | 本地GLSL及点几何，非图片背景 |
| UI图标 | ui.js icon与paths | 内联SVG路径 |
| 地图 | ui.js drawMap | heightAt/riverX/WILD/PORTAL实时Canvas绘制 |
| 音效 | audio.js | WebAudio sine notes，5类事件+select/error |
| favicon | public/favicon.svg | 独立叶片SVG |
| 字体 | 系统字体 | 不随包重新授权/分发，不用远程字体 |

运行依赖的软件库被锁定在package-lock，离线缓存包内包含原包LICENSE文件。runtime dist已包含引擎chunk，不依赖node_modules才能预览。

## 额外静态模型备份

`assets/derived/`：explorer.glb、cloud.glb、fox.glb、aqua.glb、leaf.glb。

这些是本轮用Three.GLTFExporter对原工厂构建结果实际导出的**静态glTF2二进制**，不是占位名称。已检查文件头、总大小、JSON chunks、mesh数量；`references/source-verification/glb-check.json`记录结果。

**没有skin，没有animation clips。** 原游戏动态动作由JS实现，所以不将GLB加载作为exact路线；重写需要时可拿来对照形体，但要补同等动作并核对动画pivot/材质/scale。GLB的用途和大小见derived/manifest。

`assets/golden/portrait-0.png`至`portrait-3.png`是与原游戏同模型渲染出来的360²备份头像，实际游戏仍动态生成，防止模型姿态与UI分离。

## 美术参考与基准

- `assets/golden/01..08*.png`：新固定镜头基准，包含环境和输入元数据。
- `assets/review/golden-contact-sheet.jpg`：8图总览。
- `assets/review/index.html`：可浏览的基准页。
- `assets/reference-project/reports`：制作原项目时的历史画面/测试。
- `assets/reference-project/references`：14张Steam官方截图和真实来源，**仅研究、不进入游戏运行包**。

## 自行重新导出

```bash
node "$KIT/scripts/export-assets.mjs" --project "$OUT" --out "/新目录/yimo-derived" --port 4376
```

先装输出工程依赖，已有Chrome；输出需空目录。它只在浏览器读取工厂函数和GLTFExporter，不修改源代码、不调用云端模型API。
