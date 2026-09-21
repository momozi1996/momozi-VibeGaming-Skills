# huocheGame 使用说明

[返回README：安装、十二包选择与调用](README.md) · [交付记录](huocheGame-交付记录.md)

## 包里有什么

完整 **CLOUDLINE／云间慢行** 游戏、源码、成品、美术/声音、原始参考图、玩法/场景制作经验、独立生成启动工具及全文件清单。一个 `huocheGame.zip` 即可安装；不依赖原note或其他skill。不是只发提示词、菜单或空脚手架。

## 安装与调用

手动校验同名.sha256，解压得到 `huochegame/`，整个目录复制进Agent实际skills目录。不要只拷SKILL.md，也不要双层嵌套。刷新技能列表或新开会话。Codex使用实际 `$CODEX_HOME/skills`，未设置通常为 `~/.codex/skills`；其他Agent以其文档为准。

已有完整仓库可在仓库根运行：

```bash
python3 scripts/install_skill.py --skill huochegame --skills-dir "/你的Agent技能目录" --dry-run
python3 scripts/install_skill.py --skill huochegame --skills-dir "/你的Agent技能目录"
```

同名目标已存在会拒绝覆盖；先自行备份/移走旧版。此任务未替读者全局安装。

在**聊天框**（不是终端）输入：

```text
使用 $huochegame，在新目录 my-huochegame 完整复刻 CLOUDLINE／云间慢行。
直接恢复完整成品并启动，保留全部现有玩法和画面，不只做首页。
```

不支持显式技能调用的Agent：让它“读取 /实际路径/huochegame/SKILL.md，以此目录为资源根，在新目录生成完整游戏并运行”。需要有本地读写和终端能力；不要求某个专属模型，不保证任意模型一次实现任意变体。

## 直接运行（不经过模型）

```bash
KIT="/实际路径/huochegame"
OUT="$HOME/game-projects/my-huochegame"
python3 "$KIT/scripts/game.py" verify
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4430
```

OUT必须是**尚不存在**的新目录。仅需Python3.9+及支持WebGL的现代浏览器；直接试玩无需npm。打开 `http://127.0.0.1:4430/cloudline.html`；端口占用可用 `--port 0`。服务保持运行，Ctrl+C停止。这是启动后的本机地址，不是线上Demo。

下次只重启：

```bash
python3 "$OUT/start-demo.py" --port 4430
```

也可先 `game.py create --out "$OUT"` 只生成。Windows把python3换为py -3，使用真实路径替换变量。已有作品增量修改，不重复play/create；输出可以脱离skill目录独立运行。

## 操作与改造

W/↑动力，S/↓/空格制动，←/→环绕相机，V切视角，E车门，M静音，Esc/P暂停。支持屏幕踏板与交互按钮。

修改OUT/src/game.js、shell.html、style.css后执行 `node build.mjs`。构建无npm依赖；单文件HTML可直接双击离线玩，HTTP/file存档不共享。

改场景请以完整工程为起点，联动真实模型/地图、玩法状态、镜头与UI；具体源码入口和美术经验见skill里的创作指南。没有通用“随便换一个风格”的现成开关，Agent需真正修改代码并重新构建。技能里的原始工程保持冻结。

## 限制与权利

两站闭环的轻驾驶游戏，不是写实路网/多人火车模拟器。Three MIT不等于全游戏已统一MIT授权。

跨浏览器/GPU/字体不保证逐像素相同，自动检查不是人工全程通关或实机手机认证。详细测试见交付记录；不能把旧报告当成本机通过。许可证据与公开门槛见 [RIGHTS](docs/RIGHTS.md)，本包仍属于私有候选，未自动公开上传。
