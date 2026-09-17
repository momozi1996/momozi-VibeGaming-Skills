# 素材入口：真实文件已随包提供

## 不要在这里重新下载一套

权威成品位于 **`../../assets/reference-project/public/assets/`**，共58个文件：2模型、31纹理/HDR、12 UI图片、13音频，总计16,945,697字节。此目录是导航和可视化，不再复制第二份素材以免版本分叉。

- [逐项素材目录](ASSET-CATALOG.md)：用途、来源、许可证据、尺寸、校验hash。
- [纹理接触表](textures-contact-sheet.jpg)：所有可预览JPG/PNG纹理；不把HDR伪装成普通位图。
- [图标与肖像接触表](ui-contact-sheet.jpg)：真实PNG，包括实际渲染的角色肖像。
- [GLB二进制元数据](MODEL-METADATA.json)：从随包GLB实际解析，不依赖生成脚本注释。
- [成品清单](../../assets/reference-project/public/assets/manifest.json)、[下载审计](../../assets/reference-project/docs/download-audit.json)。
- [授权范围](../../assets/reference-project/ASSETS-LICENSE.md)、[第三方声明](../../assets/reference-project/THIRD_PARTY_NOTICES.md)。

接触表缩略图仅供查找；游戏始终读取原分辨率成品，不能用接触表替换贴图。

## 必须知道的基线局限

实际`knight.glb`有1套skin、6段动画：Attack/Block/Death/Hit/Idle/Run。

实际`wolf.glb`是1个mesh、**0套skin、0段GLB动画**。虽然原制作脚本与历史清单文字描述了新动作制作，但最终随包GLB没有导出这些动画。狼AI的移动/追击/伤害/死亡状态仍存在；不能因此声称狼在成品中有完整骨骼跑步/死亡动画。**exact复现保留原文件；若要补狼动画，这是另一个明确记录的修复分支，不偷偷换基准。**

原工程的历史文档和manifest原样保存，用以确保可复现；本包以实际文件为准纠正上述能力描述。

## 授权与来源证据

已采用外部源：ambientCG Ground037/Wood051，Poly Haven forest_slope，Kenney RPG Audio/Impact Sounds/Fantasy UI Borders，OpenGameArt的Micket狼与TinyWorlds森林环境音。每个外部条目对应CC0证据；原创贴图/图标/人物由基准的ASSETS-LICENSE声明贡献CC0。

源页面和下载结果是2026-09-14存档；不把它说成所有国内网络都永远可达。复现运行依靠本地文件，不需要这些站点可访问。

`docs/references/abbey-gameplay.jpg`是原作研究参照，**不是CC0素材**，不用于游戏，不进入public或生产运行包；不要把整个reference目录当素材资产库。

## 要重做美术时

读 `../asset-pipeline.md`。成品文件、原脚本与狼/骑士源文件均在包内，但部分大型外部原下载ZIP需按审计重新拉取。exact和通常rebuild都不需要重跑这条流程。
