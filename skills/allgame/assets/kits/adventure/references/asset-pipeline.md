> 基线参考：exact 保持原参数；variant 可改变美术、场景、角色和任务，遵循新设计合同。下文“不改”指原样复现，不限制创作；旧历史测试不代表本轮通过。

# 成品素材与可选再生产

## 常规复现：使用已附带的字节

58个文件在 `assets/reference-project/public/assets/`；完整表和授权入口见`references/materials/ASSET-CATALOG.md`。恢复后素材在新项目的`public/assets/`。无需联网下载美术、无需运行Blender、无需AI图片生成服务。

`public/assets/manifest.json` 每项包含源/作者/CC0证据/校验日期/bytes/SHA256。`docs/download-audit.json`是实际历史下载证据；`docs/licenses/`和`docs/license-*.txt`是存档页面/包内许可。

**许可记录的事实边界**：清单声称并保存了2026-09-14验证证据，不意味着现在每个地区/网络都稳定可访问。文件完整性验证≠重新作法律保证。代码/引擎依赖不因美术CC0而自动变成CC0。

## 什么确实随包附带

- 最终knight.glb/wolf.glb、纹理、UI图标与音效。
- `tools/build_knight.py`与原创`knight-source.blend`。
- `tools/source-wolf.zip`、`tools/wolf-source/wolf.blend`与再制作脚本。
- 纹理/UI/天空等离线生成Python源码。
- 外部原始Ground/Wood/Kenney/HDR等大压缩包没有全量重复收录，成品全部收录；如要重做使用固定下载器。

## 可选重做（不属于exact）

只在新复制的工作工程执行，并先备份原成品。重做会改动manifest和图片/GLB；Blender、Pillow、NumPy、字体和压缩器版本均可能改变字节，不能继续保证旧hash。

原环境Blender5.2.1；当前包未锁定所有美术生产依赖，不宣称该路线跨环境逐字节确定。需要Python Pillow、NumPy；Blender脚本在Blender内部Python运行。

```bash
# 当前目录必须是新工作工程，不是reference/project
python3 tools/download_sources.py
python3 tools/prepare_assets.py
python3 tools/build_ui.py
python3 tools/build_surface_details.py
blender --background --python tools/build_knight.py
blender --background --python tools/build_wolf.py
# 看清每个变更后，仅为新项目生成新的素材记录
python3 tools/audit_assets.py
python3 tools/audit_assets.py --check
```

- 下载器默认写`tools/.sources/`，可设`NORTHSHIRE_SOURCE_DIR`；读取固定download-audit并核对原哈希，文件变动就停止，不自行接受新源。
- `prepare_assets.py`从外部ZIP提取Ground037/Wood051贴图、音效/边框/HDR，再生成原创纹理；它会写过渡manifest，所以后续必须完成所有生产步骤与最终审计。
- knight脚本生成网格/骨骼/动作/portrait；wolf脚本打开随包wolf.blend，重新做UV/皮毛/动作/portrait，不读取原包缺失照片参考。但实际冻结wolf.glb没有skin/动画：制作脚本的意图不等于导出结果，需实际检查每次新GLB。
- `audit_assets.py`不带`--check`是**写入新清单**，不能用于“修复”基准哈希失败。基准只运行只读检查。
- 产物里没有与原包字节一致性相关的秘密API；不需要用户的模型密钥。

## 如果用户另要求换素材

这已经是衍生版本，不是1:1。优先查用户列出的站点，但只接受**具体条目明确CC0且实际下载成功**的资源；没有通过的条目不进入运行包。

- Poly Haven、ambientCG、Kenney、Quaternius：仍保留具体条目及对应许可证据，不凭名字略过核验。
- OpenGameArt/Freesound：有多种许可证，必须核对具体作品。
- Game-Icons的“免费可用”、Pixabay/Unsplash的免费站点许可，不能直接当CC0；不满足用户的CC0硬要求时跳过，而非当作自动合规备选。
- 不用Sketchfab，不移植原作客户端文件。新的下载记录包括URL、实际bytes、hash、许可正文、作者和处理过程。

联网失败时记录“失败/未确认”，保留已验证本地素材；不能编造下载成功。上述流程不会自动启动，因为本次复现所需素材已经齐备。
