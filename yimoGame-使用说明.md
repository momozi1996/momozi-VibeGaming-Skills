# yimoGame · 独立完整萌宠探索 Skill

> 新用户请先看根 [README.md](README.md)：包含当前全部游戏包的安装、调用和启动命令。下文保留该批次详细/历史说明；“已安装/已启动”仅指作者当时机器，不是下载后的自动状态。

本包把你提供的 `yimo-note` 纳入统一交付，标准调用ID为 **`yimogame`**，显示名 **yimoGame**。默认完整恢复《伊莫·风栖原野》，不是另做一款低配示意游戏，也不是只有提示词。

## 文件在哪里

- `yimoGame.zip` / `yimoGame.zip.sha256`：独立分发包和校验。
- `skills/yimogame/`：完整skill源目录，与ZIP内容一致。
- `playable-games/yimogame/`：从分发包恢复的完整可玩工程。
- `yimoGame-实机预览.jpg`：本轮实际打开成品得到的画面。
- `verification/yimogame/`：本轮移位解压、离线安装、玩法和截图记录，**不在skill ZIP里**。

ZIP约163MiB。体积主要来自完整离线npm缓存（约134MiB）、工程与素材，而非只有一份SKILL.md。未包含node_modules、Python、Node、浏览器或系统字体。

## 一次安装怎么使用

将ZIP解压后的整个 `yimogame` 文件夹放入目标Agent的技能目录。Codex通常为 `$CODEX_HOME/skills/`，未设置时为 `~/.codex/skills/`；其他Agent遵循各自规则。按需刷新技能列表或重开会话。本次按要求仅更新分发目录，**未执行全局安装**。

在聊天中输入，不是在终端输入：

```text
使用 $yimogame，在当前工作区新建 my-yimo-game，完整复刻风栖原野。
保留原有3D美术、4种伙伴、捕捉联结、地图图鉴、委托通关、摄影和存档。
不要从空壳重写，直接生成并启动让我玩。
```

换主题：

```text
使用 $yimogame，制作月光海岛萌宠探索游戏。
从内置完整工程开始，真正更换主角和伙伴造型、海岛地形与灯塔任务点，
协调天空光照、水面和HUD，保留捕捉—联结—收集3种—提交奖励—存档闭环。
在新目录完成开发、构建并启动，给我实际游戏画面。
```

不支持skill调用但能执行代码的模型：让它读取安装目录里的 `SKILL.md`，以该目录为KIT。包里有完整复刻和换主题的可复制提示词。

## 不经过模型也能直接出游戏

把下面KIT/OUT换成真实路径，OUT须在包外且不存在或为空：

```bash
KIT="/实际路径/yimogame"
OUT="/工作区/新的my-yimo-game"
python3 "$KIT/scripts/reproduce.py" play --out "$OUT" --port 4493
```

打开 **http://127.0.0.1:4493/**。命令自动校验并恢复完整工程，直接启动随包dist；只需要Python3.9+和WebGL2浏览器，**试玩不需要npm安装、不访问外部素材站、不需要API Key**。

服务停下后，不再对已有目录play/restore，直接重开：

```bash
python3 "$KIT/scripts/reproduce.py" serve --project "$OUT" --port 4493
# 或完全不依赖skill目录，在生成工程中：
python3 -m http.server 4493 --bind 127.0.0.1 --directory dist
```

本目录已附生成工程，直接运行：

```bash
python3 playable-games/yimogame/start.py --port 4493
```

上述地址仅本机可访问，不是已公开上线网站。成品使用根路径资源，需以dist为站点根，不能直接挂到原4492服务的 `/yimogame/dist/` 子路径。原四款2D入口不受影响。

## 完整玩法和效果

- 第三人称真实3D探索；程序化探险家、4种伙伴、风动草花、叶片树冠、河水、风门、浮空城远景与柔和光影。
- 8个野生实例，近距离捕捉、伙伴跟随；Q真实变成伙伴，不只是UI换字。
- 不同伙伴具备疾跑、二段跳、水上通行差异；集齐至少3种去风门提交，一次奖励300星屑和10球，可继续探索。
- 图鉴、地图、感知、摄影PNG、暂停、确认重开、本地存档、桌面与触屏控制。
- WASD移动、Shift疾跑、Space跳跃、E捕捉/提交、Q联结、1—4换伙伴、B图鉴、M地图、C感知、P摄影、Esc暂停。

要改源码：在新工程上执行包内 `reproduce.py install --project "$OUT"`，默认离线安装锁定依赖；随后 `npm run dev` 开发，完成后 `npm run build`，否则dist仍是原版。新主题需要Agent实际编写，**包里没有假称已经完成的海岛预设**。

## 边界与权利

这是来源包已有的完整**单人浏览器原型闭环**，不是官方伊莫MMO；没有联网多人、战斗、伤害系统或可进入的浮空城。音效默认关闭，无背景音乐。GLB是静态备份，程序化源码才包含动作。

完整工程字节保持一致，不等于跨显卡、字体和浏览器逐像素一致。支持能读写文件、运行命令的模型+code agent，不承诺所有模型首次实现任意新玩法或相同审美质量。

品牌、官方研究图和用户原代码的分发/商用权利应分别确认；本包没有擅自给所有内容加MIT授权。详见skill内 `references/rights.md` 和 `provenance.md`。
