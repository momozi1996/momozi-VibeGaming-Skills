# 05｜素材、图集、帧序列与授权

## 两套资产都提供

- **可直接使用**：`assets/reference-project/public/assets/`。恢复路线必须直接复用，全部同源加载，不需访问OpenGameArt/Kenney。
- **可重新导入**：`assets/reference-project/tools/source-cache/`。原始GIF/ZIP本地齐全；对应importer为`tools/prepare-assets.py`。
- 下载URL/作者/SHA256：`docs/asset-manifest.json`，运行时同内容`public/assets/credits.json`。
- 原页授权证据：`docs/licenses/`。原素材包内许可证也随stage/audio/icons部署。

原始资产来源：

| 用途 | 原文件 / 作者 | 核查页 |
|---|---|---|
| AVA v2 | human-fighter.gif / Puffolotti，246×254，561帧 | https://opengameart.org/content/generic-woman-for-fighting-games-stardrinkers-style |
| REN | karate.gif（原名1_8.gif）/ Puffolotti，229×238，997帧 | https://opengameart.org/content/fighting-character-template-mustermann-2-a001aaaa001-karate |
| 街道/建筑/道具 | streets-of-fight.zip / ansimuz | https://opengameart.org/content/streets-of-fight |
| 轻重打击/落地声 | impact-sounds.zip / Kenney | https://kenney.nl/assets/impact-sounds |
| Round/Fight/胜负 | voiceover-fighter.zip / Kenney | https://kenney.nl/assets/voiceover-pack-fighter |
| 拳脚图标备用 | fighter-icons.zip / Kenney | https://opengameart.org/content/game-icons-fighter-expansion |

均有CC0依据。Unsplash/Pixabay不是全站CC0，Game-Icons.net默认CC BY，本项目没有使用它们。不要因为用户最早提过这些站就重新替换已经核查的资源。素材下载可用是当时实测，不保证未来所有国内网络；本地交付消除了运行时下载风险。

## 清晰度修复必须保留

旧AVA人体约46px高；旧REN导入时被缩成73×76画布，再4×放大，丢失了大量细节。**v2不走该管线**：
- AVA原始站姿人体约144px；固定sourceRoot=[104,233]，scale=184/144。
- REN约152px（不同帧略有身高变化）；sourceRoot=[104,222]，scale=184/152。
- 原始GIF seek后convert RGBA，**不resize角色源图**。
- AVA上衣绿色像素按照importer中HSV规则改为绯红，非生成式补画。不能误用原绿色立绘或旧黑发AVA。
- 仅裁透明边装箱，每帧2px留白； atlas宽2048，AVA高906、116独立帧；REN高2341、267独立帧。
- 动画可复用同一sourceFrame。JPEG或统一等宽栅格假设都会损坏透明度或纹理定位。

## JSON字段合同

```text
scale                   角色世界缩放
sourceSize              原始GIF画布尺寸
sourceRoot              原GIF共享脚底根坐标
packing                 trimmed-native-with-fixed-root
timings                 clip -> [首有效序列索引,首恢复序列索引]
clips                   clip -> 图集逻辑帧索引列表
frames[index].sourceFrame   原GIF的0起始帧号
frames[index].rect          [atlasX,atlasY,croppedWidth,croppedHeight]
frames[index].bounds        [sourceLeft-rootX,sourceTop-rootY,width,height]
```

Pixi Texture.frame 使用rect；Sprite.anchor = (−bounds.x/bounds.w, −bounds.y/bounds.h)。position就是角色世界根坐标；x scale×facing，y scale不镜像。这能在透明裁边不同的情况下稳定脚底。不能将每帧独立bbox中心当anchor。

角色texture.source.scaleMode='linear'，背景为nearest。线性采样用于实际非整数显示倍数，不是blur滤镜；源细节已保留。菜单仍使用同一图集动画，不重新制作超低清放大头像。

## AVA完整源帧编排（0起始，区间含两端）

| clip | sourceFrame列表 |
|---|---|
| idle | 0..6 + 5..1倒序 |
| walk | 70..78 |
| jump / fall | 257..264 / 265..271 |
| crouch | [256,360] |
| guard / hurt / down / win | 375..381 / 333..338 / 339..348 / 327..332 |
| lp / hp | 7..12 / 17..25 |
| lk / hk | 26..32 / 49..54+[62] |
| air / low | 300..307 / 409..414+[360] |
| special | 33..43+[31,32] |

AVA timing：lp[2,3]、hp[5,7]、lk[3,4]、hk[2,4]、air[3,5]、low[2,4]、special[4,8]。timing指**clip内位置**，不是原GIF frame。

## REN完整源帧编排

idle 6..15+14..7倒序；walk480..507；jump576..582；fall584..590；crouch826..829；guard475..480；hurt532..544；down978..988；win369..380；lp17..36；hp45..61；lk151..182；hk183..215；air749..776；low851..881；special360..380。

REN无显式timing，使用clip长度floor(.38)、floor(.59)。严格复现就保留，不能凭感觉重定时。

## 背景处理

Importer读取Streets of Fight原Aseprite二进制图层，导出1200×176街景与道具，去除调色板和不使用部分；skyline/foreground/car/hydrant/road来自包内PNG。道路使用atlas中的指定小矩形而非全部tileset。图层位置见02。`foreground.png`和部分图标/语音是打包保留但当前渲染没有使用，不能自动加到场景里。

## 重新导入（可选，不是启动前置）

在**输出副本**使用Python 3.9+，Pillow11.3.0、requests2.32.5，执行`python3 tools/prepare-assets.py`。缓存齐全则不请求外站。不要从别的目录执行导致路径错判，脚本本身以__file__解析项目根。

跨Pillow/zlib版本可能产生不同PNG压缩字节，即使RGBA像素一致；严格SHA256恢复应直接复制随包生成好的PNG，而不是强制重跑importer。

## 许可区分

原素材CC0证据与许可证保留在项目。UI/粒子/合成节拍为原Demo新增表达；项目ASSETS.md将这些美术/音乐表达部分按CC0提供。**不要将此扩张成第三方软件和系统字体全部CC0**。npm tarballs内部许可证保留，见`software-licenses.json`。本包不包含商用KOF人物、原声或品牌logo。
