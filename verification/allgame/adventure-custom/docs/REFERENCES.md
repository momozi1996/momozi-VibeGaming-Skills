# 参考、授权和事实边界

核验日期：2026-09-14。

## 原作视觉参考

`references/abbey-gameplay.jpg` 是网上实机视频的封面参考图，仅放在制作记录中，**不进入 public/assets、不进入 dist，不列为 CC0**。

- 来源视频缩略图：`https://i.ytimg.com/vi/wtIZEr-EbAU/maxresdefault.jpg`
- 能从该图直接观察到的特征：浅灰砌石、红色瓦顶、钟楼与多翼体量、玫瑰窗和尖拱彩窗。
- 不能从一张图确认完整平面、精确尺寸、整个区域道路、所有视角；因此本项目不声称 1:1 还原。
- 抓取的 `abbey-page.html` 是受访问限制的页面返回，**不作为成功读取原作资料的证据**。
- 原作图不是发布游戏的贴图，也不是原创资源授权依据。

## 使用的外部美术

| 实际来源 | 用途 | CC0证据 |
|---|---|---|
| ambientCG Ground037 | 地面、土路、法线 | `licenses/ambientcg-license.html`；下载ZIP与哈希 |
| ambientCG Wood051 | 木门、木件、盾牌背板 | 同上 |
| Poly Haven forest_slope | PBR环境照明 | `licenses/polyhaven-license.html`；下载HDR与哈希 |
| Kenney RPG Audio | 翻书、武器、布料、拾取 | 包内 `License.txt` 已单独保存 |
| Kenney Impact Sounds | 脚步、金属撞击 | 包内 `License.txt` 已单独保存 |
| Kenney Fantasy UI Borders | 弹窗边框切片 | 包内 `License.txt` 已单独保存 |
| OpenGameArt `wolf-1` | 狼基础几何 | `licenses/wolf.html` 页面CC0；下载ZIP有效 |
| OpenGameArt `forest-ambience` | 森林环境音 | `licenses/forest-ambience.html` 页面CC0；MP3哈希 |

狼原始模型自带的外部照片路径不能解析；这些图片没有下载、没有使用。最终狼的皮毛由原创程序生成，动画重新编制。狼的衍生模型与头像依照源 CC0 资源处理，不误列为完全从零建模。

`licenses/verification.json` 记录了授权页请求状态、页面哈希和核验提示。
`download-audit.json` 记录候选下载状态，包括失败候选；**该表不等于已采用列表**。真正随游戏发布的是 `../public/assets/manifest.json`。

## 未采用/失败候选

- Quaternius 自然资源包下载未成功，未拿空文件当素材，也未声称使用。
- Poly Haven 木箱与若干 ambientCG 砖材曾下载比较，最终未进入运行时。
- Game-Icons、Freesound、Pixabay、Unsplash 未被当作默认 CC0；本轮没有引入它们的素材。
- 没有使用 Sketchfab。

## 本地网络与授权分开验证

核验范围是制作时本机能实际下载且授权页面明确 CC0，不代表所有中国大陆网络/运营商永久可达。运行时不依赖以上网站，资源一并本地交付。

CC0 资产许可不自动授予对原作名称、场景设定或第三方标识的权利。本 Demo 以明确非官方的方式呈现，不使用官方Logo或原版音画文件。
