# 权利与第三方内容清单

状态：公开分发阻塞项尚未关闭。以下是文件证据审查，不是法律认证；不擅自给未知内容添加MIT或CC0。

| 包 | 已有证据 | 公开冻结前仍须处理 |
|---|---|---|
| maomao3dgame | [来源说明](../skills/maomao3dgame/references/provenance.md)，字体OFL；dist保留Three的版权/SPDX注释 | 原项目缺完整顶层代码/原创美术LICENSE；核实已捆绑Three成品的完整许可告知是否充分，不能只靠SPDX一句替代许可原文 |
| moshougame | [代码MIT](../skills/moshougame/assets/reference-project/LICENSE)、[素材声明](../skills/moshougame/assets/reference-project/ASSETS-LICENSE.md)、[来源说明](../skills/moshougame/references/provenance.md) | `docs/references/abbey-gameplay.jpg`研究图分发权及魔兽/北郡名称、设定；MIT不覆盖这些第三方权利 |
| allgame | [组合包范围](../skills/allgame/references/assets-and-rights.md)，内部赛车/冒险各自许可 | 同时继承猫猫代码授权缺口、奇幻研究图和品牌边界；组织成新包不消除上游限制 |
| survivorgame | [工程MIT](../skills/survivorgame/assets/project/LICENSE)、[来源说明](../skills/survivorgame/references/rights.md)、字体OFL | MIT版权行只有年份，维护者应确认并补足实际权利人；新增skill层文件需明确范围 |
| towerdefensegame | [工程MIT](../skills/towerdefensegame/assets/project/LICENSE)、[来源说明](../skills/towerdefensegame/references/rights.md)、字体OFL | 同上，不自动覆盖用户后来加入的美术 |
| platformgame | [工程MIT](../skills/platformgame/assets/project/LICENSE)、[来源说明](../skills/platformgame/references/rights.md)、字体OFL | 同上 |
| farmgame | [工程MIT](../skills/farmgame/assets/project/LICENSE)、[来源说明](../skills/farmgame/references/rights.md)、字体OFL | 同上 |
| yimogame | [来源/权利](../skills/yimogame/references/rights.md)，Three许可原文、依赖许可、原创几何源码 | 用户原创代码授权未单独明确；14张官方Steam研究图、伊莫/Aniimo品牌与设定的再分发范围。研究图不进入dist不代表可随skill公开转载 |
| quanwanggame | [CC0素材证据](../skills/quanwanggame/references/05-assets-and-animation.md)、[依赖许可清单](../skills/quanwanggame/references/software-licenses.json)及tarball内LICENSE | 原游戏完整代码许可与新增skill工具许可仍须确认；不能将素材CC0扩大为全部源码、字体或依赖CC0 |

## 隐私与机器路径

本轮发现3个分发skill文件携带历史机器路径：

- `skills/moshougame/assets/golden/capture.json`
- `skills/allgame/assets/kits/adventure/assets/golden/capture.json`
- `skills/yimogame/references/source-verification/cache-build.log`

它们是历史元数据/日志，不是运行依赖，也不是已发现的密钥。但公开前应决定是否脱敏或移出**新分发基线**，重算对应包清单/ZIP/哈希。为保留已有九包字节证据，本次没有偷偷改写旧记录。

本地`verification/`还有机器路径与原始日志，明确排除在公开发行集外。扫描未命中常见密钥模式不是“绝无秘密”保证，二进制、压缩包、历史提交和第三方内容没有完成法证级秘密扫描。

## 维护者需明确的决定

1. 确认所有自有源代码、美术和技能文档/脚本的权属、版权名及希望采用的许可证。
2. 对第三方研究图和品牌选择“有明确许可继续分发”或“从公开版移除/替换”，保留审查依据。
3. 核实所有捆绑成品中的引擎/依赖告知；字体和外部素材不套用全仓许可证。
4. 处理历史机器标识后建立新基线，不能重写旧证明以宣称原哈希不变。
5. 在LICENSE和README中清楚写开放范围后，才允许标记为公开开源正式版本。
