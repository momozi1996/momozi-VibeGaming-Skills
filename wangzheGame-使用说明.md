# wangzheGame 使用说明

[返回README：安装、十二包选择与调用](README.md) · [交付记录](wangzheGame-交付记录.md)

## 包里有什么

完整 **RIFT FORGE／峡谷演武 v0.1.1** 游戏、源码、成品、美术/声音、原始参考图、玩法/场景制作经验、独立生成启动工具及全文件清单。一个 `wangzheGame.zip` 即可安装；不依赖原note或其他skill。不是只发提示词、菜单或空脚手架。

## 安装与调用

手动校验同名.sha256，解压得到 `wangzhegame/`，整个目录复制进Agent实际skills目录。不要只拷SKILL.md，也不要双层嵌套。刷新技能列表或新开会话。Codex使用实际 `$CODEX_HOME/skills`，未设置通常为 `~/.codex/skills`；其他Agent以其文档为准。

已有完整仓库可在仓库根运行：

```bash
python3 scripts/install_skill.py --skill wangzhegame --skills-dir "/你的Agent技能目录" --dry-run
python3 scripts/install_skill.py --skill wangzhegame --skills-dir "/你的Agent技能目录"
```

同名目标已存在会拒绝覆盖；先自行备份/移走旧版。此任务未替读者全局安装。

在**聊天框**（不是终端）输入：

```text
使用 $wangzhegame，在新目录 my-wangzhegame 完整复刻 RIFT FORGE／峡谷演武 v0.1.1。
直接恢复完整成品并启动，保留全部现有玩法和画面，不只做首页。
```

不支持显式技能调用的Agent：让它“读取 /实际路径/wangzhegame/SKILL.md，以此目录为资源根，在新目录生成完整游戏并运行”。需要有本地读写和终端能力；不要求某个专属模型，不保证任意模型一次实现任意变体。

## 直接运行（不经过模型）

```bash
KIT="/实际路径/wangzhegame"
OUT="$HOME/game-projects/my-wangzhegame"
python3 "$KIT/scripts/game.py" verify
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4422
```

OUT必须是**尚不存在**的新目录。仅需Python3.9+及支持WebGL2的现代浏览器；直接试玩无需npm。打开 `http://127.0.0.1:4422/`；端口占用可用 `--port 0`。服务保持运行，Ctrl+C停止。这是启动后的本机地址，不是线上Demo。

下次只重启：

```bash
python3 "$OUT/start-demo.py" --port 4422
```

也可先 `game.py create --out "$OUT"` 只生成。Windows把python3换为py -3，使用真实路径替换变量。已有作品增量修改，不重复play/create；输出可以脱离skill目录独立运行。

## 操作与改造

默认WASD/方向键移动，1–4技能，F/G召唤师技能，C切经典QWER+D/F；P商店、B回城、Esc取消/暂停，左右点击移动追击。

修改OUT/src后 `npm ci --no-audit --no-fund`、`npm run build`；需要Node20.19+，建议22/24 LTS。首次开发安装需网络/已有缓存，没有随包npm离线缓存。不要执行素材重新下载脚本。

改场景请以完整工程为起点，联动真实模型/地图、玩法状态、镜头与UI；具体源码入口和美术经验见skill里的创作指南。没有通用“随便换一个风格”的现成开关，Agent需真正修改代码并重新构建。技能里的原始工程保持冻结。

## 限制与权利

仅桌面键鼠、单机5v5，无移动端/匹配/多人服务，不是官方王者或LOL客户端。包含Riot专有图像和数据，公开或商业分发需另行确认。

跨浏览器/GPU/字体不保证逐像素相同，自动检查不是人工全程通关或实机手机认证。详细测试见交付记录；不能把旧报告当成本机通过。许可证据与公开门槛见 [RIGHTS](docs/RIGHTS.md)，本包仍属于私有候选，未自动公开上传。
