# 统一配置与生成命令

## 1. 可执行主题：theme-json

`--theme-json`是**对某个预设的部分覆盖**，已连接到真实材质/照明/部分文案。工具拒绝未知字段、不合法颜色/范围/文本，失败发生在创建输出之前。颜色仅`#RRGGBB`；展示文字为纯文本，当前生成器不接受引号、HTML或模板代码符号。

```bash
python3 "<SKILL>/scripts/game.py" create --family racing --mode variant \
  --preset sakura --theme-json "<SKILL>/assets/examples/racing-theme.json" --out "<OUTPUT>"
```

- racing：title、brand、season、tagline；seed（uint32）；trackPoints（4..64个XZ控制点）；colors和ui键见 `assets/kits/racing/assets/presets/sakura.json`。
- adventure：title、brand、fog/sun/ground、fogDensity[0,.05]、exposure[.2,3]、sunIntensity[0,6]、seed；materials的stone/trim/roof/leaves/grass/cloth见autumn.json。
- theme-json只对variant有效。exact不允许主题；rebuild缺src不能装运行时hooks。
- theme颜色在src/theme.js或theme.ts生效；标题与UI部分是生成时替换，改theme.title不会动态更新所有文案。racing UI色在ui.css末尾；海洋shader颜色仍在track.js。
- 示例新名字不能掩盖旧地名/故事仍存在；完整本地化要按引用逐项改。adventure预设保留旧存档key作原回归兼容，真正发布不同游戏时隔离key/schema并适配测试。
- trackPoints几何检查只防明显退化/相邻重合，不能保证无交叉/急弯/AI可行。海岸原算法接近星形；任意路网/立交需重构，详见对应kit的remix.md。

生成不会安装npm、运行Blender、下载图片、调用模型或部署。输出已有内容就拒绝，不能用force覆盖。

## 2. 只描述目标：brief

示例：[赛车投递目标](../assets/examples/racing-brief.json)、[冒险寻宝目标](../assets/examples/adventure-brief.json)。它们是新玩法的**任务合同**，不声明生成器已经实现投递/寻宝。

字段schemaVersion=1；family；recipe；title/style（单行文本）；coreLoop/keep/change/targetDevices/acceptance/nonGoals（各1..30项文本数组）。未知字段与family/recipe冲突会报错。两个JSON输入不同：brief.title是目标描述，不自动覆盖运行标题；运行标题使用theme-json。

```bash
python3 "<SKILL>/scripts/game.py" validate-brief --brief "<BRIEF_JSON>"
python3 "<SKILL>/scripts/game.py" create --brief "<BRIEF_JSON>" --mode variant \
  --theme-json "<THEME_PATCH_JSON>" --out "<OUTPUT>"
```

提供brief时family可从里面读取；也显式给family必须一致。exact拒绝brief以保留逐文件原样语义。无需brief也可create，之后由agent填写生成的GAME-CONTRACT。

输出新增：
- GAME-BRIEF.json：设计目标；GAME-CONTRACT.md：保留/变更/设备/验收与待实施勾选。
- THEME-SOURCE.json：这次主题合并快照；src/theme为运行配置。
- PROGRESS.md：起步及续跑；GENERATION.json：family/mode/preset、基线hash、tested=false。

这几项不是自动生成新玩法的引擎数据；agent应按recipes.md写实际状态机并更新自己的实现证据。

## 3. 核验与差异

```bash
python3 "<SKILL>/scripts/game.py" verify
python3 "<SKILL>/scripts/game.py" compare --family racing --project "<OUTPUT>" --exact
python3 "<SKILL>/scripts/game.py" diff --family adventure --project "<OUTPUT>"
```

compare --exact仅对exact输出核对全部基线；不带--exact检查保留的public/tests/依赖，合法的新资产或测试也可能导致不同。diff列差异不作为玩法通过判定。修改文件不等于可以更新安装包的只读manifest。
