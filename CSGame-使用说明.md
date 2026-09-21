# CSGame · 单人战术FPS完整独立包

安装入口以 [根README](README.md) 为准。显示名 **CSGame**，文件 **CSGame.zip**，安装目录和调用ID **csgame**。源资料来自用户提供的CSGame-note；无需将原note交给使用者。

## 装一次，直接生成可玩的完整游戏

1. 下载 `CSGame.zip` 和 `CSGame.zip.sha256`，按根README校验。
2. 解压得到 `csgame/`，把整个文件夹放到你的Agent技能目录，刷新技能列表或开启新会话。不要只复制SKILL.md，不要多套一层同名目录。
3. 在Agent聊天框输入：

```text
使用 $csgame，在新目录 my-counterline 完整复刻 COUNTERLINE — Dust Protocol。
保留3D院落、武器与敌人、购买、狙击、拆弹和回合胜负，直接生成并启动让我玩。
不要只做主页；使用包内完整成品，不需要先装npm或重写游戏。
```

不支持 `$` 技能语法的code agent：让它读取 `/实际路径/csgame/SKILL.md` 并按本目录为资源根执行。纯聊天模型不能读文件/运行命令时，无法独自完成本地启动。

已有完整仓库时也可以使用安全安装器：

```bash
python3 scripts/install_skill.py --skill csgame \
  --skills-dir "${CODEX_HOME:-$HOME/.codex}/skills" --dry-run
# 检查后去掉 --dry-run 执行安装；已有同名目录时拒绝覆盖
```

其他Agent按其实际技能目录安装，不照抄作者机器路径。本次纳入仓库不代表已经全局安装到读者机器。

## 不经过模型，直接生成和启动

```bash
KIT="/实际路径/csgame"
OUT="$HOME/game-projects/my-counterline"
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4410
```

OUT必须是skill之外不存在的新目录。打开 `http://127.0.0.1:4410/`，真实点击 **DEPLOY TO SITE**。保持终端运行；Ctrl+C停止。端口冲突可指定 `--port 0` 自动选端口；不要关闭其他项目服务。Windows把python3换成py -3，变量换成实际路径。

下次重启已有作品：

```bash
python3 "$OUT/start-demo.py" --port 4410
```

生成作品不再依赖skill路径；40个原项目文件全部保留，仅额外加入启动器。`repro.py restore`可只恢复原始40文件。源码开发后须 `npm run build` 更新dist，否则上述命令展示的仍是旧成品。

## 可玩的完整内容

- 原创沙色Al Safra院落，程序化建筑、木箱、沙袋、棕榈、窗格、电线与远景。
- 第一人称步枪、手枪、狙击枪，双臂、装填/开镜动作、射线命中和音效。
- 1对3敌人AI、视线遮挡、寻路、难度、血甲、金钱、军械库购买。
- 3秒部署、65秒炸弹倒计时、A点持续拆弹5秒、回合结算4秒、先5分比赛结果与重玩。
- 暂停/恢复、记分、雷达、设置存档。全灭敌人不自动胜利，仍需拆弹。

操作：WASD移动，鼠标看向，左键射击，右键瞄准，R装填，1/2切枪，Shift慢走，Ctrl/C蹲下，Space跳，E拆弹，B购买，按住Tab记分，Esc暂停。

**仅桌面键鼠。** 手机响应式菜单不等于可触控游玩。不是官方CS2、Dust II或多人联网，没有手雷/刀/捡枪/账号匹配；比赛进度不存档。

## 改成另一个风格或场景

```text
使用 $csgame，以完整游戏为起点制作冬日仓库拆弹。
实际改建筑、地标、场景材质、雾和灯光；保留完整射击、AI、购买与拆弹回合。
修改在新项目中进行，重新构建、启动，提供截图和操作说明。
```

没有预制winter主题开关，新场景需Agent实作。开发在OUT内执行：

```bash
npm ci --no-audit --no-fund
npm run dev -- --host 127.0.0.1 --port 4411 --strictPort
npm run build
```

Node建议22/24 LTS；Three0.180.0、Vite6.3.5锁定。第一次npm安装需要网络或已有缓存；原锁为npmmirror，网络问题见包内运行说明，不擅自升级依赖。**离线试玩与离线开发安装是两回事。**

## 包里有什么

完整原工程与dist、40文件原始基线、程序美术/音效源码、5个静态GLB、23张纹理PNG、地图/枪械JSON、实机截图、按需创作/架构/排错文档、启动/恢复/校验工具和许可证。GLB无骨骼动画，runtime仍以程序化源码为真值。

运行只需Python3.9+和WebGL2桌面浏览器，无API Key、生图服务、Blender、外部图床或其他skill。Node、Chrome安装器、Python、系统字体不随包提供。

[本轮交付记录](CSGame-交付记录.md) · [源码/美术来源与权利](skills/csgame/references/provenance.md) · [仓库权利清单](docs/RIGHTS.md)。项目MIT和Three许可原文保留，不因此把整个仓库或商标权说成统一MIT。
