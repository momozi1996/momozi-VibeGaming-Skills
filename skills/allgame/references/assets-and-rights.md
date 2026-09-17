# 全部素材随包，不依赖另外两个技能

## 两类基础的真实位置

| 用途 | 本skill内位置 |
|---|---|
| 赛车完整工程 | `assets/kits/racing/assets/reference-project/` |
| 猫/车/动画程序 | 上述工程`src/racers.js` |
| 海岛/道路/道具/地标/贴图程序 | `src/track.js` |
| 程序音效/粒子 | `src/audio.js` / `effects.js` |
| 4款本地字体＋OFL | `public/assets/barlow-*.ttf` / `OFL-Barlow.txt` |
| 冒险完整工程 | `assets/kits/adventure/assets/reference-project/` |
| 2模型/31纹理HDR/12UI/13音频 | 上述工程`public/assets/`，共58项 |
| 建筑/地形/植物工艺 | `src/world/`，Actor/移动在`src/actors/` |
| 素材目录/联系表/GLB元数据 | `assets/kits/adventure/references/materials/` |
| 原创制作工具/部分源文件 | 冒险工程`tools/`，平常不用重跑 |
| 受控golden／换肤例图 | 两个kit各自`assets/golden/`与`variant-preview.jpg` |

赛车没有猫咪GLB/音频MP3不是缺文件，程序本身是素材工艺。冒险狼实际0skin/0clip，骑士1skin/6clip；以二进制核验优先，旧脚本注释不构成动画已导出的证据。

要跨引擎使用模型/图标/纹理，在新输出复制对应文件及来源记录，修改该引擎的loader/材质与动画映射；不要直接import另一引擎源码类。所有资源都内置不等于所有源大ZIP齐全：冒险大型外部原始素材压缩包有些未重复收录，成品运行不需要下载它们。

## 许可边界

- 冒险代码MIT，见基线LICENSE；外部与原创美术范围看ASSETS-LICENSE.md、public/assets/manifest.json以及docs/licenses。代码/引擎不因美术CC0而自动CC0。
- `docs/references/abbey-gameplay.jpg`原作研究图不是运行美术或CC0资产，不得把它作为新游戏贴图/宣传素材随意商用。角色/地名/品牌涉及第三方权利，本包不赋予官方魔兽授权。
- 猫猫用户提供项目没有独立顶层LICENSE，本包不擅自宣称其代码/美术MIT或CC0；按用户授权范围使用，对外或商业再分发需确认权属。保留字体OFL和引擎许可证。
- 原复现包指令/工具许可说明保留在冒险kit的references/SOURCE-KIT-LICENSE.md；allGame新增组织不改变上游许可。

扩展优先用户授权素材、程序化原创或具体条目明确许可的资源。新下载记录URL/作者/许可证据/bytes/hash/处理过程；不以网站名/免费字样推断CC0。修改后仅生成新输出的清单，不重写skill里的基准。完整性核验不是法律保证。
