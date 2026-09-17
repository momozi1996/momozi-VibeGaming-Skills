# 素材与来源

本skill基线取自用户提供的maomaoGame-note，内部45文件快照完整保留于 `assets/reference-project/`；每个文件hash见 `assets/baseline-manifest.json`。不依赖原note目录。

- `src/racers.js`：猫和车辆程序化造型/动画；不是缺少GLB。
- `src/track.js`：海岸、地面、道路、植物、建筑、金币/箱子、shader/Canvas贴图。
- `src/audio.js`：WebAudio生成，非缺失MP3；`effects.js`是粒子。
- `public/assets/barlow-*.ttf` 与 `public/assets/OFL-Barlow.txt`：Barlow Condensed字体及随附OFL许可；字体具体名字以实际文件为准。
- `assets/golden/`和six-cats.jpg是设计/回归参考，不当作可玩游戏或纹理背景。
- 已构建dist随exact基线保留；variant不复制旧dist，必须重新build，以免新源码配旧画面。

用户提供的猫猫项目没有独立顶层LICENSE；本skill不为未知权属擅自补MIT/CC0授权。可按用户授权范围复现和改造，但对外／商业再分发前应确认原创代码和美术权利，保留字体及第三方引擎许可。框架许可不覆盖用户项目版权；不冒充任何已有赛车品牌的官方作品。

技能新增指令/恢复工具与原项目来源分开记录；不改变任何上游素材条款。对外发包不要带测试的node_modules、密钥、用户存档或开发者本机路径。`project.py verify`仅证明打包完整性，不证明法律许可或游戏已通过本轮测试。
