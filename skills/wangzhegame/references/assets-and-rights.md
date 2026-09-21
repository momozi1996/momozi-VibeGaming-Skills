# 资产清单与许可边界

所有运行素材实际位于 `assets/reference-project/public/assets`；完整dist也内置同批素材。无符号链接指向原机器，无外部运行美术CDN依赖。npm依赖/浏览器本体不在素材包，按runtime安装。

## 数量与用途

59个public文件：44个Riot原始文件（5 JSON、5头像、5插画、20技能图标、9装备图标）+ champions.json + manifest.json + 12纹理 + 纹理manifest。技能文件名由spells[].image.full取，不假定每英雄只用ID+Q等名称。

程序几何/动画/地形/针叶材质位于world.js；HUD与菜单设计位于ui.js；音效是main.js的Web Audio振荡器。没有本来应该存在却没给的GLB/FBX/PSD或官方网格。

## 原始与派生数据

- Riot原始数据和图片有原URL、bytes、SHA：`public/assets/manifest.json`。
- `champions.json`是合并的运行派生；不要再访问versions.json自动刷新。
- `download_assets.py`仅供追溯获取方式；恢复时不执行，避免splash源变化或“latest”漂移。要重新下载须仍用锁定URL并逐项校验，不能假定远端永远字节相同。
- `public/assets/textures/manifest.json`记录12纹理本地上游出处；allgame目录只是来源字符串，不是运行依赖。

## 许可证据

- 当前工程 `ASSETS.md` 说明Riot为专有内容、非CC0、无商业授权。
- `docs/licenses/upstream-asset-manifest.json`、`texture-assets-license.md`、`upstream-evidence/`保留每张纹理的来源与证据。
- 纹理来自上游收录的ambientCG/Poly Haven/Kenney/OpenGameArt具体条目，按清单与证据判断，不能根据网站名笼统推断所有素材可商用。
- 上游说明里“本项目原创模型/代码MIT/CC0”等指**那个上游工程**。本包未把其所有模型复制进来，更不把该段话应用于Riot插画或当前全部源码/IP。
- `THREE-LICENSE.txt`随包。Three0.180.0 MIT；Vite6.3.5 MIT；Playwright1.55.0 Apache-2.0，开发依赖license在npm包内。

保留来源/署名/许可证，不移除Riot非官方提示，不将项目标为全原创或已获商业发行许可。公开发布或商用前应另行确认权利与允许范围；本任务只打包当前本地项目，不自动上传。

## 完整性检查

`reproduce.py verify`对189文件全校验，包括源码、public、dist、原证据。`compare --project`默认验证reproduction组（src/public/tests/文档/锁文件），忽略重建dist与运行后证据变化；它比较清单中的文件，不声明输出目录没有新增开发日志。

机器清单的哈希是损坏/版本核对依据，不是数字签名或独立版权证明。不要重签原manifest来掩盖文件错误。skill单独移植时必须连assets一起拷走。
