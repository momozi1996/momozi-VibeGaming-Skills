# quanwangGame · 独立完整街机格斗 Skill

> 新用户请先看根 [README.md](README.md)：包含当前全部游戏包的安装、调用和启动命令。下文保留该批次详细/历史说明；“已安装/已启动”仅指作者当时机器，不是下载后的自动状态。

将用户提供的 `quanwang-note` 按统一规则纳入本目录。显示名 **quanwangGame**，标准调用ID **`quanwanggame`**。默认完整恢复 **NEON IMPACT / 霓虹对决 · 原生精灵＋街机界面 v2**，不重新设计、不降级美术、不从空壳重写。

## 交付位置

- `quanwangGame.zip` 和 `quanwangGame.zip.sha256`：独立安装大包及校验。
- `skills/quanwanggame/`：完整skill源目录，与ZIP一致。
- `playable-games/quanwanggame/`：已恢复的完整可玩工程。
- `quanwangGame-实机预览.jpg`、`quanwangGame-交付记录.md`。
- `verification/quanwanggame/`：本轮独立解压、恢复、安装和运行记录，不进入skill ZIP。

包中有完整TypeScript/PixiJS源码、处理好的PNG图集/JSON、街景、音效、原始GIF/ZIP、授权证据、成品dist、截图基准、85份锁定npm tarball、恢复启动脚本及创作指南。体积主要来自离线开发依赖，不需要再携带原quanwang-note或其他skill。没有打包node_modules。

## 安装与触发

将ZIP解压后的整个 **quanwanggame** 文件夹放进目标Agent的技能目录；不能只复制SKILL.md。Codex通常为 `$CODEX_HOME/skills/`，未设置时为 `~/.codex/skills/`，其他Agent按各自规则。按需刷新技能列表或重开会话。

**本次只纳入game-skill-packages，没有额外全局安装、git提交或远程发布。**

聊天触发：

```text
使用 $quanwanggame，在当前工作区新建 neon-fighter，完整复刻霓虹对决。
保留原生角色动画、街机选人、人机/本地双人/训练、轻重拳脚、必杀连击和回合胜负。
不要从空壳重写，直接生成并启动让我玩。
```

换场景：

```text
使用 $quanwanggame，做一个黄昏港口主题街机格斗游戏。
从内置完整工程开始，真正改造分层场景、标题配色、HUD和命中特效，
保留原生角色动画与完整攻防、三种模式和胜负再战流程。
在新目录修改、构建并启动，提供实际游戏截图。
```

新主题是Agent基于完整工程继续创作，**不是声称包内已有港口等主题预设**。无技能发现功能的code agent直接读取安装目录的SKILL.md即可，不绑定模型厂商。

## 不通过模型也能生成并玩

将KIT与OUT改成真实路径；OUT必须在包外且尚不存在：

```bash
KIT="/实际安装路径/quanwanggame"
OUT="/工作区/新的neon-fighter"
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4496
```

打开 **http://127.0.0.1:4496/**。自动校验、复制完整工程并启动成品，不需要npm安装、联网下载素材或API Key。只需 **Python3.9+ 和现代WebGL浏览器**。命令保持前台运行，Ctrl+C关闭；端口冲突可换端口或用`--port 0`自动选择。

再次打开已有工程，不重跑play/create：

```bash
python3 "$OUT/start-demo.py" --port 4496 --no-open
```

本分发目录附带的试玩工程可直接启动：

```bash
python3 playable-games/quanwanggame/start-demo.py --port 4496 --no-open
```

地址仅本机访问，不是公开上线网站。不要直接双击HTML。dist的资源使用站点根路径，不直接挂到原4492四款2D试玩站的子路径；原有入口不修改。

## 游戏范围与操作

- AVA/赤燕、REN/玄武，两种真实原生精灵动画。AVA前冲裂空踢，REN远程破空劲。
- 街机选人、雨夜像素街景、金色HUD、命中白闪/火花/震屏/停顿与本地音效。
- 人机、本地双人、训练；移动、跳跃、蹲攻、空攻、防御、轻重拳脚、指令必杀和辅助必杀、命中确认取消、连击、击退、两胜结算、再战、回选人。
- 训练重置、暂停、判定框/逐帧、帮助、全屏和P1触屏控制。

| 操作 | 按键 |
|---|---|
| 菜单 | 左右选人、上下模式、Enter开始 |
| P1移动/跳/蹲 | A/D、W、S |
| P1轻拳/轻脚/重拳/重脚/必杀 | J/K/L/I/U |
| P2 | 方向键、数字小键盘1/2/4/5/0 |
| 防御 | 相对敌人按后；下后防低段 |
| 暂停/判定框/逐帧/训练重置 | Esc / F2 / 暂停时N / R |

P2必须数字小键盘，普通数字行不等同；触屏只控制P1，横屏更合适。失焦会暂停，恢复焦点后需手动继续。

## 修改源码

Node20.19+（或兼容22.12+等）与npm是开发前置，不随包提供：

```bash
node "$KIT/scripts/install-offline.mjs" "$OUT"
cd "$OUT"
npm run dev -- --host 127.0.0.1 --port 4497 --strictPort
# 修改完成后：
npm run build
```

默认离线使用随包tarball，保持锁文件版本。重新构建后再启动dist，否则看到的仍是原版。重新导入原始素材可选需要Pillow/requests，这两项Python依赖未打包，直接复刻和JS构建不需要。

## 边界

完整是指**这款两角色街机Demo的完整玩法与效果**，不是SNK官方拳皇。无联网回滚、3v3、投技、翻滚、手柄、同角色对战或存档系统。素材CC0依据和软件许可证分别保留，不把所有代码/字体一概称为CC0；系统字体、浏览器和运行时安装器不再分发。

具备文件与终端能力的模型+code agent可以使用同一套工程和脚本，不保证所有模型一次完成任意新创意或跨GPU/字体逐像素一致。实际封装验证见交付记录。
