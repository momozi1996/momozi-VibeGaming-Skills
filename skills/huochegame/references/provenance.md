# 封装来源与边界

- 来源：用户提供的huoche-Game-note/skills/huoche-game-repro。适配名称为huochegame，默认从重建改为完整恢复并启动。
- assets/reference-project内29个文件逐字节保留，assets/baseline-manifest.json保留原哈希；单文件cloudline.html内嵌Three.js r160。原源目录不被修改。
- 新增game.py/start-demo.py、工具测试、完整SKILL-MANIFEST、创作指引；旧测试工具改为从输出tooling解析依赖，避免在安装的skill里写node_modules。
- 原图与validation目录为上游历史证据，不是本次安装机器的实测结论。上游报告/源码测试里的临时绝对路径只是原始记录；新工具会适配候选URL与浏览器路径，不需要原机器目录。
- 三维模型、场景、标签及音频由代码生成，无必需外部美术API或其他skill；没有遗漏待下载的GLB/贴图。

## 权利

保留reference-project/LICENSE.txt和内嵌Three.js MIT版权。该文件的CLOUDLINE段说明游戏为程序化素材、无商业游戏资产，不等于整个游戏源码、截图和新封装工具已经得到明确统一MIT授权。公开分发或商用前由权利人确认；本包仅纳入私有冻结候选，不自动上传或扩大授权。

哈希证明内容完整，非来源真实性签名或法律意见。当前范围见仓库本批交付记录；单独安装不需要该记录才能运行。
