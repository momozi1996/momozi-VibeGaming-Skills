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
| csgame | [工程MIT](../skills/csgame/assets/project/LICENSE)、[Three许可原文与原创素材声明](../skills/csgame/assets/project/THIRD_PARTY.md)、[封装来源](../skills/csgame/references/provenance.md) | 原项目版权人为Counterline contributors；新增skill工具/文档层仍需维护者明确许可，不代表Valve授权或整仓MIT |
| huochegame | [来源说明](../skills/huochegame/references/provenance.md)、[Three许可/程序素材说明](../skills/huochegame/assets/reference-project/LICENSE.txt) | CLOUDLINE游戏与新增封装层完整许可仍需权利人确认；程序化素材声明不是全仓MIT |
| wangzhegame | [素材权利](../skills/wangzhegame/references/assets-and-rights.md)、[来源说明](../skills/wangzhegame/references/provenance.md)、[原项目ASSETS](../skills/wangzhegame/assets/reference-project/ASSETS.md) | Riot英雄插画/头像/技能装备图标/JSON及派生数据为专有内容，含在public/dist及截图；公开/商用须确认，或做真正授权替换的新基线；纹理/Three许可不扩大到Riot |

## 隐私与机器路径

2026-09-21十二包复核：发行文本中的机器路径按内容区分，不把文档示例误报为泄漏。

- `skills/moshougame/assets/golden/capture.json`、`skills/allgame/assets/kits/adventure/assets/golden/capture.json`：原制作机器的用户目录与项目路径。
- `skills/yimogame/references/source-verification/cache-build.log`：原系统临时目录标识。
- `skills/yimogame/assets/reference-project/references/official-site.html`：保存的上游网页中包含其Jenkins构建目录，不是本机运行依赖。

以上四份均为原始证据/元数据。公开前应决定是否脱敏或移出新的分发基线，并重算对应skill清单、ZIP和哈希；本轮为保持12包内容不变，没有静默改写。封装完整不意味着这些记录适合直接公开。

文本扫描未命中本轮定义的常见私钥、GitHub令牌、AWS访问Key和API Key模式；这不是“绝无秘密”保证，依赖压缩包内部、二进制和Git历史未做法证级秘密/漏洞审计。`verification/`本地日志和依赖明确排除在发行集外。

## 新增电车/MOBA包的历史元数据

电车validation中三个JSON保留 `/tmp/huoche-note-*` 历史路径，MOBA保留上游来源字符串与测试环境证据；均不是原机器目录依赖。新封装工具相对自身定位，实际恢复和浏览器检查在独立输出运行。公开前还须复核/脱敏这些历史标识，并生成新的分发基线；本次为保持原项目字节未静默更改。扫描范围/数量见本批交付记录，不把旧“3个”当作十二包最终统计。

## 维护者需明确的决定

1. 确认所有自有源代码、美术和技能文档/脚本的权属、版权名及希望采用的许可证。
2. 对第三方研究图和品牌选择“有明确许可继续分发”或“从公开版移除/替换”，保留审查依据。
3. 核实所有捆绑成品中的引擎/依赖告知；字体和外部素材不套用全仓许可证。
4. 处理历史机器标识后建立新基线，不能重写旧证明以宣称原哈希不变。
5. 在LICENSE和README中清楚写开放范围后，才允许标记为公开开源正式版本。
