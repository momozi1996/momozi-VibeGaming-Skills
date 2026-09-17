# 素材内置与授权边界

基线取自用户提供的shibing-note/reference/project。138个工程文件完整收录于 `assets/reference-project/`，其中真实运行美术在public/assets：58文件（2模型、31纹理/HDR、12UI图、13音频）。源文件逐项hash为 `assets/baseline-manifest.json`；不依赖外部shibing-note。

- 成品索引：[materials/README.md](materials/README.md)、[ASSET-CATALOG.md](materials/ASSET-CATALOG.md)。
- 实际模型元数据：[MODEL-METADATA.json](materials/MODEL-METADATA.json)；骑士1skin/6clip，狼0skin/0clip，胜于旧脚本注释。
- 原始代码MIT：`assets/reference-project/LICENSE`；美术范围：`ASSETS-LICENSE.md`；每项来源/哈希/许可证据：`public/assets/manifest.json` 与 docs/licenses/。
- 允许复现包指令/脚本修改和再分发的原说明：[SOURCE-KIT-LICENSE.md](SOURCE-KIT-LICENSE.md)。

外部模型纹理等具体条目的CC0证据已在基线记录；不是“所有免费站点都CC0”。代码、引擎、品牌、研究截图不因美术声明自动变为CC0。`docs/references/abbey-gameplay.jpg`是原作研究参考，绝不作为游戏运行素材或当作可商用美术分发；确需对外分发研究资料应另确认权限。魔兽/World of Warcraft/北郡等名称及设定的第三方权利不被本包授予。

独立题材优先用新名称/故事和用户拥有权利的角色。新素材记录URL、作者、许可正文/证据、实际bytes/sha256与处理方法；只更新OUTPUT的manifest，不更新技能的只读基线。无网络时可使用已内置美术；不凭空声称新素材已下载或许可已核实。

普通构建不用Blender，也不用重新下载纹理。仅用户要再生产美术时读asset-pipeline.md；部分大型外部原始ZIP不随包重复收录，但全部运行成品与本地原创制作脚本在包内。对制作链的描述不等于保证任意Blender版本导出字节一致。
