# momozi · VibeGaming · Skills

- VibeGaming · Game Skill Packages
- <img width="1672" height="941" alt="VibeGaming 游戏技能包架构图" src="https://github.com/user-attachments/assets/f08ec552-c588-4b21-997c-d1ddc0941650" />


**安装一个 skill，从完整工程出发，和 AI 一起做出真正能玩的游戏。**

VibeGaming 是面向游戏创作者与 Code Agent 的独立游戏技能库。每个包都把**完整源码、本地美术、游戏机制、启动工具和制作经验**放在一起：可以先复刻成品，再换角色、改场景、设计新的玩法。

**12 个独立包 · 3D / 2D 多种玩法 · 30 张实机截图 · 按需安装**

[快速开始](#快速开始) · [游戏目录](#游戏目录) · [安装与更新](#安装与更新) · [调用示例](#调用示例) · [看实际画面](#看实际画面) · [直接运行](#不经过模型直接生成和启动) · [常见问题](#常见问题)

[![六款游戏实机画面：赛车、云海电车、峡谷、农场、平台跳跃与格斗](docs/images/game-skill-cover.jpg)](#看实际画面)

## 你会得到什么

- **一个可玩的起点**：赛车、冒险、格斗、经营、MOBA等，每个包包含自己对应的完整玩法，而不只是菜单或提示词。
- **配套画面与资源**：角色、场景、UI、音效及制作资料随包提供，常规运行无需再搜集素材或调用生图服务。
- **可以继续创作的源码**：从已完成工程改造，而不是每次从空白页面重写；包内指引解释玩法、美术、镜头与UI如何一起改。
- **独立安装、跨 Agent 使用**：只选一个包即可，不依赖其他skill或原始note。支持读取本地文件、执行命令的Code Agent；不支持技能发现时也可以直接读取 `SKILL.md`。

> 当前版本：**`2026.09.21-rc4`（预发布）**。各包的运行前置和许可范围不同；请先查看[环境要求](#环境与离线能力)与[使用许可](#使用许可)。本项目不代表任何游戏厂商的官方客户端或授权。

## 快速开始

### 1. 选一个游戏包

第一次尝试可选 [huocheGame.zip](huocheGame.zip)：云海电车、停站换客和工坊改装。直接试玩只需Python 3.9+与WebGL浏览器，无需npm。也可以从下方[游戏目录](#游戏目录)选择其他类型。

### 2. 安装完整 skill

下载ZIP及对应的 [SHA-256文件](huocheGame.zip.sha256)，校验后解压。把整个 `huochegame/` 放入你的Agent技能目录，刷新技能列表或新开会话。**不要只复制SKILL.md。** [完整安装步骤](#安装与更新)

### 3. 在聊天框调用

```text
使用 $huochegame，在新目录 my-cloudline 完整生成云间慢行。
保留群岛、电车、手动驾驶、停站换客、工坊改装与存档，直接启动让我玩。
```

Agent会读取技能、生成独立项目并启动本地游戏。首次运行完成后，你可以继续说：

```text
把它改成雪山邮政电车：改造车厢、站台、建筑和灯光，保留驾驶与停站闭环。
修改源码后重新构建，给我可玩的地址和新截图。
```

**安装skill不是运行游戏本身**；调用后由Agent执行生成/启动步骤。仅能聊天、不能操作本地文件和终端的模型，需要由你按[直接运行](#不经过模型直接生成和启动)中的命令操作。

## 游戏目录

| 独立包 | 安装文件夹 / 调用 ID | 完整游戏起点 | ZIP 大小 | 详细说明 |
|---|---|---|---:|---|
| [maomao3Dgame.zip](maomao3Dgame.zip) | `maomao3dgame` / `$maomao3dgame` | 3D猫猫卡丁车；选人、漂移道具、完赛、触屏、摄影 | 17.3 MiB | [说明](使用说明.md) |
| [moshougame.zip](moshougame.zip) | `moshougame` / `$moshougame` | 3D奇幻冒险；战斗、采集、任务、奖励、存档 | 27.1 MiB | [说明](使用说明.md) |
| [allGame.zip](allGame.zip) | `allgame` / `$allgame` | 赛车＋第三人称冒险两套基础与通用创作方法 | 44.4 MiB | [说明](allGame-使用说明.md) |
| [survivorGame.zip](survivorGame.zip) | `survivorgame` / `$survivorgame` | 月灯守夜人；自动攻击、升级选卡、首领终局 | 0.8 MiB | [说明](创作游戏-使用说明.md) |
| [towerDefenseGame.zip](towerDefenseGame.zip) | `towerdefensegame` / `$towerdefensegame` | 灯火小径；建塔、升级拆除、敌潮和胜负 | 0.8 MiB | [说明](创作游戏-使用说明.md) |
| [platformGame.zip](platformGame.zip) | `platformgame` / `$platformgame` | 云屿邮差；三关、二段跳、收集、检查点、终点 | 0.6 MiB | [说明](创作游戏-使用说明.md) |
| [farmGame.zip](farmGame.zip) | `farmgame` / `$farmgame` | 风物小园；种植、浇水、收获、订单、修缮、存档 | 0.8 MiB | [说明](创作游戏-使用说明.md) |
| [yimoGame.zip](bigfiles-split/README.md) | `yimogame` / `$yimogame` | 风栖原野；3D探索、捕捉、联结变身、委托完成 | 163.3 MiB · 分片 | [说明](yimoGame-使用说明.md) |
| [quanwangGame.zip](bigfiles-split/README.md) | `quanwanggame` / `$quanwanggame` | 霓虹对决；街机格斗、人机/双人/训练、必杀连击 | 165.2 MiB · 分片 | [说明](quanwangGame-使用说明.md) |
| [CSGame.zip](CSGame.zip) | `csgame` / `$csgame` | 3D单人战术FPS；AI射击、买枪、狙击、拆弹和回合胜负 | 17.5 MiB | [说明](CSGame-使用说明.md) |
| [huocheGame.zip](huocheGame.zip) | `huochegame` / `$huochegame` | 3D电车驾驶；群岛线路、停站换客、奖励、工坊改装 | 7.8 MiB | [说明](huocheGame-使用说明.md) |
| [wangzheGame.zip](wangzheGame.zip) | `wangzhegame` / `$wangzhegame` | 3D单机5v5 MOBA；五英雄、三路兵线、技能装备、推塔胜负 | 29.4 MiB | [说明](wangzheGame-使用说明.md) |

**选择建议：** 明确要某种游戏就选对应专用包；赛车/探索混合创作可选 allgame。allgame 提供赛车和第三人称冒险两种基础，适合延展相近玩法。

原样复刻从完整实现开始；内置主题可以直接选用；新的场景、角色和机制由 Agent 在此基础上继续实现。显示名/ZIP 保留大小写，安装目录和调用 ID 统一小写。


## 安装与更新

> **大文件说明**：yimoGame 与 quanwangGame 因 GitHub 单文件 100MB 限制，
> 以分片形式存放。安装前先执行：
> ```bash
> cd bigfiles-split && bash restore.sh   # 生成 .restored/ 并自动校验 SHA-256
> ```
> 再用还原出的 `.restored/yimoGame.zip`、`.restored/quanwangGame.zip` 继续安装。


### 方式一：安装独立 ZIP

1. 取得表中的ZIP和同名 `.zip.sha256`，只下载需要的一个包即可。
2. 校验完整性。以电车包为例：

   ```bash
   # macOS
   shasum -a 256 -c huocheGame.zip.sha256
   # Linux
   sha256sum -c huocheGame.zip.sha256
   ```

   Windows PowerShell：`Get-FileHash .\huocheGame.zip -Algorithm SHA256`，对照 `.sha256` 中的值。哈希用于检测下载损坏或内容变更，不是作者签名。
3. 解压得到小写名称的目录，例如 `huochegame/`，把**整个目录**复制到Agent的技能目录。
4. 刷新技能列表或新开会话，然后在聊天框输入调用示例。

Codex使用实际 `$CODEX_HOME/skills/`，未设置时通常为 `~/.codex/skills/`。其他Agent使用其文档指定的目录；不同客户端不必相同。

正确结构如下，不要多嵌套一层同名目录：

```text
<你的Agent技能目录>/
└── huochegame/
    ├── SKILL.md
    ├── agents/
    ├── assets/
    ├── references/
    └── scripts/
```

### 方式二：从完整仓库安装

在本仓库根目录执行。安装器只校验和复制一个本地skill，不联网、不启动游戏，也不安装全局依赖。

```bash
# macOS / Linux：预览，再安装
python3 scripts/install_skill.py --skill huochegame \
  --skills-dir "${CODEX_HOME:-$HOME/.codex}/skills" --dry-run
python3 scripts/install_skill.py --skill huochegame \
  --skills-dir "${CODEX_HOME:-$HOME/.codex}/skills"
```

```powershell
# Windows PowerShell
$SkillDir = if ($env:CODEX_HOME) { Join-Path $env:CODEX_HOME "skills" } else { Join-Path $HOME ".codex/skills" }
py -3 scripts/install_skill.py --skill huochegame --skills-dir $SkillDir
```

把 `--skill` 换成游戏目录中的任一小写ID。**升级时先备份并移走旧版同名skill**，安装器不会覆盖已有目录。已经生成的游戏项目是独立副本，更新skill不会自动修改它。

### 不支持自动发现 skills 的 Agent

将路径替换成你实际安装的位置，发送：

```text
读取 /实际路径/huochegame/SKILL.md，以该目录为资源根。
在工作区新目录完整生成并启动游戏，使用包内资源，不只给方案。
```

`agents/openai.yaml`为支持它的客户端提供展示元信息；其他Agent可直接使用SKILL.md与随包文件。

### Git 克隆与大文件

仓库中三个大文件使用Git LFS属性。通过Git获取时，需要完整的LFS实体；只有 `version https://git-lfs.github.com/spec/v1` 开头的小文本不能作为ZIP或离线缓存使用。不要默认GitHub的“Download ZIP”包含所有LFS内容。

本README中的下载链接指向**仓库内的文件**，当前没有另设公开Release或在线Demo地址。分发前的LFS准备、干净导出和发布检查见[维护指南](docs/PUBLISHING.md)。

## 调用示例


以下均为**聊天提示词**。安装名小写、`$` 是支持该语法的 Agent 的显式调用标记；其他 Agent 用“读取对应 SKILL.md”替代。

### 1. maomao3dgame — 猫猫赛车

```text
使用 $maomao3dgame，在新目录 my-kart 按 exact 模式完整复刻猫猫赛车。
保留选人、漂移、道具、完赛和触屏；生成并启动让我驾驶，不要只做主页。
```

换主题：要求“樱花山谷”，先用 `sakura` 可运行换肤，再让 Agent 实际改树木、赛道地标和 UI；不要把换配色等同于已经换了整个世界。

### 2. moshougame — 奇幻任务

```text
使用 $moshougame，在新目录 my-adventure 完整生成第三人称奇幻任务游戏。
保留移动战斗、采集、接交任务、奖励和存档，安装项目依赖并启动让我玩。
```

### 3. allgame — 通用3D创作

```text
使用 $allgame，选择 racing 基础，在新目录 my-island-race 制作海岛计时赛。
先运行完整赛车工程，再实际实现计时目标、结果界面和重开，交付可玩的地址。
```

探索任务用 `adventure` 基础。不是要求它凭空同时实现所有游戏类型。

### 4. survivorgame — 生存割草

```text
使用 $survivorgame，在新目录 my-survivor 生成月灯守夜人。
保留自动攻击、升级选卡、冲刺星环和首领终局，直接启动让我玩。
```

### 5. towerdefensegame — 塔防

```text
使用 $towerdefensegame，在新目录 my-tower-defense 生成灯火小径。
保留建造、升级拆除、完整敌潮和胜负结算，直接启动让我玩。
```

### 6. platformgame — 平台跳跃

```text
使用 $platformgame，在新目录 my-platform 生成云屿邮差。
保留三关、二段跳、收集、敌人、检查点、钥匙和终点，直接启动让我玩。
```

### 7. farmgame — 农场

```text
使用 $farmgame，在新目录 my-farm 生成风物小园。
保留种植浇水、生长收获、售卖订单、修缮和本地存档，直接启动让我玩。
```

### 8. yimogame — 3D萌宠探索

```text
使用 $yimogame，在新目录 my-yimo 完整复刻风栖原野。
保留3D角色场景、捕捉、伙伴联结、地图图鉴、委托通关和存档，直接生成并启动。
```

### 9. quanwanggame — 街机格斗

```text
使用 $quanwanggame，在新目录 my-fighter 完整复刻霓虹对决。
保留原生角色动画、街机选人、人机/双人/训练、必杀连击与回合胜负，直接生成并启动。
```

### 10. csgame — 单人战术FPS

```text
使用 $csgame，在新目录 my-counterline 完整复刻 COUNTERLINE — Dust Protocol。
保留原创3D地图、武器与敌人、买枪、狙击、拆弹和回合胜负，直接生成并启动让我玩。
不要只做菜单；先用包内成品运行，不必先装npm或从零重写。
```

改造示例：“以完整游戏为起点做冬日仓库拆弹，实际改建筑、地标、材质和光照，保留射击与回合闭环。”新主题需要 Agent 修改源码并重建，不是现成一键皮肤。

### 11. huochegame — 云海电车

```text
使用 $huochegame，在新目录 my-cloudline 完整复刻 CLOUDLINE／云间慢行。
保留群岛、电车、手动驾驶、停站换客、奖励、工坊改装与存档，直接生成并启动让我玩。
先恢复包内完整成品，不要只写方案或从零搭空架子。
```

改造示例：“改成雪山邮政电车，实际改车体、主站、地标和灯光，保留驾驶→停站→交付→改装闭环。”新主题需改代码，不是已内置snow皮肤。

### 12. wangzhegame — 单机5v5 MOBA

```text
使用 $wangzhegame，在新目录 my-rift 完整复刻 RIFT FORGE／峡谷演武 v0.1.1。
保留五英雄、三路AI与兵线、技能、商店、推塔和枢纽胜负，直接生成并启动让我玩。
保持默认WASD移动、1–4技能，不退回旧键位；先运行完整dist，不只做菜单。
```

改造示例：“改为冰原峡谷，联动地形、导航、小地图和阵营地标，保留单机对局闭环。”原创发行还须替换Riot版权资产及衍生数据，不能只改标题后称全原创。

### 换风格/角色/地图的通用补充

```text
以完整可玩工程为起点，把主题改成【你的设定】。
真正修改角色轮廓、场景布局、光色和HUD，不只改名字。
保留【需要的玩法闭环】，全部修改在新项目目录中进行；重新构建并启动，
提供实际截图、操作方法与未完成项，不修改skill里的冻结参考工程。
```


## 看实际画面


**12 个 skill，30 张实机截图。** 展示包内工程的场景、玩法和主题变化。图片来自实际运行与验收基线；部分采用固定测试状态，不代表完整人工通关。

点击图片查看大图。所有展示图随仓库提供，不依赖外部图床。[截图来源](docs/images/README.md)。

快速跳到：[猫猫赛车](#maomao3dgame--猫猫卡丁车) · [奇幻任务](#moshougame--第三人称奇幻任务) · [通用3D](#allgame--两套可改造的-3d-基础) · [生存](#survivorgame--月灯守夜人) · [塔防](#towerdefensegame--灯火小径) · [平台](#platformgame--云屿邮差) · [农场](#farmgame--风物小园) · [萌宠探索](#yimogame--风栖原野) · [格斗](#quanwanggame--霓虹对决) · [战术FPS](#csgame--单人战术fps) · [云海电车](#huochegame--云间慢行) · [单机MOBA](#wangzhegame--峡谷演武)

### maomao3dgame — 猫猫卡丁车

选角色、驶入赛道；展示完整工程的选人界面和实际驾驶画面。

**角色选择：猫猫车手与卡丁车**

[![角色选择：猫猫车手与卡丁车](docs/images/maomao-select.jpg)](docs/images/maomao-select.jpg)

**比赛中：海岛赛道、驾驶 HUD 与道具入口**

[![比赛中：海岛赛道、驾驶 HUD 与道具入口](docs/images/maomao-race.jpg)](docs/images/maomao-race.jpg)

### moshougame — 第三人称奇幻任务

不只看建筑：同时展示修道院庭院与森林探索场景。

**庭院：第三人称角色、修道院与任务 HUD**

[![庭院：第三人称角色、修道院与任务 HUD](docs/images/moshou-courtyard.jpg)](docs/images/moshou-courtyard.jpg)

**森林：户外探索、植被层次与角色视角**

[![森林：户外探索、植被层次与角色视角](docs/images/moshou-forest.jpg)](docs/images/moshou-forest.jpg)

### allgame — 两套可改造的 3D 基础

同一个 skill 内含 racing 与 adventure 两套起点。以下为内置换肤实拍；不是另外两款新玩法，也不代表任意主题已经实现。

**racing 基础：樱花配色的猫猫赛车选人界面**

[![racing 基础：樱花配色的猫猫赛车选人界面](docs/images/allgame-racing.jpg)](docs/images/allgame-racing.jpg)

**adventure 基础：第三人称庭院的环境换肤示例**

[![adventure 基础：第三人称庭院的环境换肤示例](docs/images/allgame-adventure.jpg)](docs/images/allgame-adventure.jpg)

### survivorgame — 月灯守夜人

生存战斗和另一套主题分别展示，不再缩在四合一拼图里。

**战斗中：夜色场景、敌潮、角色与状态 HUD**

[![战斗中：夜色场景、敌潮、角色与状态 HUD](docs/images/survivor-play.jpg)](docs/images/survivor-play.jpg)

**另一主题：余烬守夜人的开始界面**

[![另一主题：余烬守夜人的开始界面](docs/images/survivor-theme.jpg)](docs/images/survivor-theme.jpg)

### towerdefensegame — 灯火小径

展示实际防守路线、建塔界面，以及另一套主题的开始画面。

**防守中：村庄路线、晶塔、敌人和建造操作**

[![防守中：村庄路线、晶塔、敌人和建造操作](docs/images/tower-defense-play.jpg)](docs/images/tower-defense-play.jpg)

**另一主题：雪原灯径的开始界面**

[![另一主题：雪原灯径的开始界面](docs/images/tower-defense-theme.jpg)](docs/images/tower-defense-theme.jpg)

### platformgame — 云屿邮差

展示角色跑跳的关卡场景，以及暮色主题。

**关卡中：狐狸邮差、浮岛、收集物和终点路线**

[![关卡中：狐狸邮差、浮岛、收集物和终点路线](docs/images/platform-play.jpg)](docs/images/platform-play.jpg)

**另一主题：晚霞邮差的开始界面**

[![另一主题：晚霞邮差的开始界面](docs/images/platform-theme.jpg)](docs/images/platform-theme.jpg)

### farmgame — 风物小园

展示可操作的农田与经营 HUD，再对照另一套季节主题。

**经营中：田地作物、小镇建筑、订单与种植操作**

[![经营中：田地作物、小镇建筑、订单与种植操作](docs/images/farm-play.jpg)](docs/images/farm-play.jpg)

**另一主题：丰物小园的秋色开始界面**

[![另一主题：丰物小园的秋色开始界面](docs/images/farm-theme.jpg)](docs/images/farm-theme.jpg)

### yimogame — 风栖原野

除了草地风景，也展示联结后的角色变化与伙伴图鉴。

**探索中：角色、原野、伙伴与任务界面**

[![探索中：角色、原野、伙伴与任务界面](docs/images/yimo-field.jpg)](docs/images/yimo-field.jpg)

**联结后：以伙伴形态在原野中行动**

[![联结后：以伙伴形态在原野中行动](docs/images/yimo-linked.jpg)](docs/images/yimo-linked.jpg)

**伙伴图鉴：已发现伙伴与资料面板**

[![伙伴图鉴：已发现伙伴与资料面板](docs/images/yimo-dex.jpg)](docs/images/yimo-dex.jpg)

### quanwanggame — 霓虹对决

选人、近身攻击和必杀分别展示；保留 PNG，避免有损压缩抹糊像素角色。

**街机选人：AVA 与 REN、模式与操作入口**

[![街机选人：AVA 与 REN、模式与操作入口](docs/images/quanwang-select.png)](docs/images/quanwang-select.png)

**对战中：重攻击动作、生命条和对战 HUD**

[![对战中：重攻击动作、生命条和对战 HUD](docs/images/quanwang-kick.png)](docs/images/quanwang-kick.png)

**必杀演示：角色动作与攻击特效**

[![必杀演示：角色动作与攻击特效](docs/images/quanwang-special.png)](docs/images/quanwang-special.png)

### csgame — 单人战术FPS

COUNTERLINE — Dust Protocol：原创沙色院落、1对3 AI与拆弹回合。下图来自包内原工程实机基线；不是官方CS2画面。仅桌面键鼠。

**菜单：真实3D院落与部署入口**

[![菜单：真实3D院落与部署入口](docs/images/csgame-menu.jpg)](docs/images/csgame-menu.jpg)

**交战：第一人称武器、敌人与战术HUD**

[![交战：第一人称武器、敌人与战术HUD](docs/images/csgame-gameplay.jpg)](docs/images/csgame-gameplay.jpg)

**目标交互：A点持续拆弹与进度条**

[![目标交互：A点持续拆弹与进度条](docs/images/csgame-defusing.jpg)](docs/images/csgame-defusing.jpg)

**狙击：开镜视野与瞄准HUD**

[![狙击：开镜视野与瞄准HUD](docs/images/csgame-scope.jpg)](docs/images/csgame-scope.jpg)

### huochegame — 云间慢行

CLOUDLINE：完整3D群岛电车、手动驾驶、停站换客和工坊改装。程序化美术与声音，离线单文件可玩；下图为包内原工程实机基线。

**驾驶：悬空轨道、群岛云海、电车与驾驶HUD**

[![驾驶：悬空轨道、群岛云海、电车与驾驶HUD](docs/images/huoche-driving.jpg)](docs/images/huoche-driving.jpg)

**到站：Mango站台、停靠车辆与换客操作**

[![到站：Mango站台、停靠车辆与换客操作](docs/images/huoche-docked.jpg)](docs/images/huoche-docked.jpg)

**工坊：独立立体场景、改装车体与完成状态**

[![工坊：独立立体场景、改装车体与完成状态](docs/images/huoche-workshop.jpg)](docs/images/huoche-workshop.jpg)

### wangzhegame — 峡谷演武

RIFT FORGE v0.1.1：单机5v5 MOBA。菜单/HUD均在游戏canvas中，只有桌面键鼠，无多人服务。**插画、头像、技能/装备图标含Riot专有内容，不是全原创，也不是官方王者/LOL客户端。** 以下为包内实机基线，战场图含测试固定状态，不是新一轮自然对局截图。

**选人：五英雄入口、插画与模式选择**

[![选人：五英雄入口、插画与模式选择](docs/images/wangzhe-menu.jpg)](docs/images/wangzhe-menu.jpg)

**峡谷：程序化3D英雄、基地、兵线与原生HUD**

[![峡谷：程序化3D英雄、基地、兵线与原生HUD](docs/images/wangzhe-battle.jpg)](docs/images/wangzhe-battle.jpg)

**商店：完整装备面板与对局场景**

[![商店：完整装备面板与对局场景](docs/images/wangzhe-shop.jpg)](docs/images/wangzhe-shop.jpg)

不同 GPU、浏览器与字体可能带来视觉差异；建议在目标设备上实际试玩。


## 不经过模型：直接生成和启动

先令 `KIT` 指向**一个完整 skill 的目录**，`OUT` 指向**工作区中尚不存在的新目录**。macOS/Linux示例：

```bash
KIT="/实际路径/quanwanggame"
OUT="$HOME/game-projects/my-new-game"
```

只执行所选包的小节。Windows用真实路径替换变量，`python3` 改成 `py -3`；Node命令不变。路径含空格时保留引号。

### 猫猫 / 奇幻：`maomao3dgame`、`moshougame`

```bash
python3 "$KIT/scripts/project.py" verify
python3 "$KIT/scripts/project.py" create --mode exact --out "$OUT"
cd "$OUT"
npm ci --no-audit --no-fund
npm run build
npm run dev -- --host 127.0.0.1 --port 4301 --strictPort
```

打开 `http://127.0.0.1:4301/`。这两个包首次重编译需要npm网络或已有缓存。猫猫exact另有预编译dist，可在恢复目录执行 `python3 -m http.server 4301 --bind 127.0.0.1 --directory dist`；moshougame基线不含dist，首次需要安装依赖并构建。

### allgame

```bash
python3 "$KIT/scripts/game.py" verify
python3 "$KIT/scripts/game.py" create --family racing --mode exact --out "$OUT"
# 或 --family adventure
cd "$OUT"
npm ci --no-audit --no-fund
npm run build
npm run dev -- --host 127.0.0.1 --port 4301 --strictPort
```

### 四款2D创作包

```bash
python3 "$KIT/scripts/game.py" verify
python3 "$KIT/scripts/game.py" create --out "$OUT"
python3 "$OUT/start.py" --port 4310
```

打开 `http://127.0.0.1:4310/`。不需要Node/npm。支持的主题：

| skill | 默认 / 另一主题 |
|---|---|
| survivorgame | `moon` / `ember` |
| towerdefensegame | `lantern` / `snow` |
| platformgame | `cloud` / `dusk` |
| farmgame | `spring` / `autumn` |

可加 `--theme`，如 `create --theme dusk --out "$OUT"`；仅用于相应skill。标题选项不会自动生成新人物或关卡。

### yimogame

```bash
python3 "$KIT/scripts/reproduce.py" play --out "$OUT" --port 4493
```

打开 `http://127.0.0.1:4493/`，Python直接服务随包成品，无需先装Node。下次重开：

```bash
python3 "$KIT/scripts/reproduce.py" serve --project "$OUT" --port 4493
```

### quanwanggame

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4496
```

打开 `http://127.0.0.1:4496/`。下次重开：

```bash
python3 "$OUT/start-demo.py" --port 4496 --no-open
```

### csgame

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4410
```

打开 `http://127.0.0.1:4410/`，真实点击 **DEPLOY TO SITE**。只需Python3.9+、WebGL2桌面浏览器和键鼠，无需先装npm；端口占用可用 `--port 0`。下次重开：

```bash
python3 "$OUT/start-demo.py" --port 4410
```

WASD移动、鼠标瞄准、左键射击、右键开镜、R换弹、1/2切枪、E拆弹、B买枪、Tab记分、Esc暂停。修改源码时在OUT执行 `npm ci --no-audit --no-fund` 和 `npm run build`；首次开发安装需要网络或已有缓存，没有完整离线npm缓存。

### huochegame

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4430
```

打开 `http://127.0.0.1:4430/cloudline.html`。只需Python与WebGL浏览器，无需npm；也可双击生成的 `cloudline.html` 完全离线游玩。下次启动用 `python3 "$OUT/start-demo.py" --port 4430`，不重复play。

W/↑动力，S/↓/空格制动，←/→环绕相机，V视角，E车门，M静音，Esc/P暂停；有触屏踏板。改源码后在OUT运行 `node build.mjs`，不需要npm依赖；HTTP/file存档域不同。

### wangzhegame

```bash
python3 "$KIT/scripts/game.py" play --out "$OUT" --port 4422
```

打开 `http://127.0.0.1:4422/`，选英雄并进入峡谷。Python直接服务dist，无需先装npm；必须HTTP根路径，不能双击HTML。下次启动用 `python3 "$OUT/start-demo.py" --port 4422`。

默认WASD/方向键移动，1–4技能，F/G闪现/治疗；C切经典QWER+D/F，P商店，B回城，Esc关弹层/暂停，左右点击移动/追击。仅桌面键鼠。修改需在OUT执行 `npm ci --no-audit --no-fund` 和 `npm run build`，首次开发安装需网络/缓存，Node20.19+。没有多人服务器或手机控制。

两包均可用 `--port 0` 自动选空闲端口，或 `game.py create --out "$OUT"` 只生成，不启动。OUT必须尚不存在；输出独立运行，不依赖原note或另一个skill。

以上服务需保持运行，Ctrl+C停止；端口占用就换端口，不结束其他项目进程。**这些localhost地址是运行命令后的本机地址，不是面向所有读者的在线演示链接。**

有开发需求时，yimogame 用 `python3 "$KIT/scripts/reproduce.py" install --project "$OUT"`；quanwanggame 用 `node "$KIT/scripts/install-offline.mjs" "$OUT"`，使用各自随包离线缓存。之后在OUT修改并 `npm run build`，否则dist还是原版。


## 环境与离线能力

| 包 | 直接试玩 | 修改/重编译 | 美术/声音运行时 |
|---|---|---|---|
| maomao3dgame | exact dist可用Python服务；变体须构建 | Node/npm；首次需网络/已有缓存 | 本地程序化几何、字体、合成声音 |
| moshougame | 须先npm安装/构建或启动Vite | Node/npm；首次需网络/已有缓存 | 本地GLB、纹理、图标、声音 |
| allgame | 按racing/adventure基础分别处理 | Node/npm；首次需网络/已有缓存 | 素材全部内置 |
| 四款2D | Python＋现代浏览器，无npm | 改ES modules/SVG即可；无需打包器 | 本地SVG、字体、Canvas和合成声音 |
| yimogame | Python＋WebGL2浏览器，无npm | Node/npm；69份锁定包的离线缓存 | 本地3D几何/着色器，声音默认关 |
| quanwanggame | Python＋WebGL浏览器，无npm | Node/npm；85份锁定tarball | 本地图集、街景、OGG音效 |
| csgame | Python＋WebGL2桌面浏览器，无npm；仅键鼠 | Node/npm；首次需网络/已有缓存 | 本地程序化3D地图、枪械/角色、纹理与合成声音 |
| huochegame | 单文件可双击离线；也可Python服务，键鼠/触屏 | Node内置模块构建，无npm；可选自动测试需装依赖 | 内嵌Three、程序化群岛/电车/人物与合成声音 |
| wangzhegame | Python＋WebGL2桌面浏览器，无npm；仅键鼠 | Node20.19+/npm；首次需网络/已有缓存 | 本地程序化3D、Riot图片/数据、纹理与合成声音 |

- Python建议3.9+。3D包启用浏览器硬件加速；Chrome为当前主要验证浏览器，现代Edge/Safari等未穷尽实测。
- 开发建议兼容Node 22/24 LTS并满足各锁定工具要求；冒险原生TS测试需Node22.18+ / 24+；quanwang要求Node20.19+或兼容22.12+。不要擅自 `npm update`。
- Python、Node、浏览器安装器和部分系统字体不随包提供。离线大包不等于整个操作系统开发环境也被打包。
- 无必需的模型API Key、账号、MCP、生图服务或Blender；可选重导素材/像素差异工具有Pillow、NumPy、requests等额外前置，见各包说明。
- 功能测试、哈希一致和画面审美是不同指标；测试截图夹具不等于真实帧率或人工全程通关。


## 常见问题

**安装后找不到 skill？** 检查小写文件夹/ID、是否多嵌套一层、整个assets是否齐全、Agent实际技能目录和重扫机制。可先直接读取SKILL.md使用。

**只有源码、没有画面？** 保持本地服务运行，通过HTTP打开；只有huochegame明确支持直接双击离线HTML。moshou/变体需安装和构建；修改源码后不要误看旧dist。

**哈希不符或缺素材？** 重新取完整分发文件；检查Git LFS指针。不改manifest“消除错误”，不随意换CDN或生成占位素材。

**输出目录已存在？** 脚本为防覆盖而停止。新建不同路径；续作在已有工程增量修改，不再次create/play。

**macOS 的 `/tmp`、符号链接路径被四款2D工具拒绝？** 这些生成器采取严格符号链接保护，可选工作区的真实路径，例如 `~/game-projects/新目录`，或把父路径解析为真实路径再传入；不要为方便删除安全检查。

**手机能玩？** 各包支持范围不同；四款2D和格斗推荐横屏。格斗触控只控制P1，P2需要数字小键盘。模拟触屏测试不是实体手机认证。**csgame和wangzhegame仅桌面键鼠，没有触屏控制；huochegame有触屏踏板，但不代表实体手机已全面实测。**

**能做官方魔兽/伊莫/拳皇/CS2/王者荣耀完整版吗？** 不能这么表述。这里是有限范围的单人原型、赛车/小游戏或两角色原创素材格斗Demo，没有自动提供官方授权、MMO服务器、联网回滚等。

**可以商用/公开转载整个包吗？** 不能一概回答可以。需按包确认源代码、美术、字体、研究截图、品牌与依赖各自权利，见下节。


## 项目结构

```text
skills/<id>/                 完整skill：指令、工程、素材、制作经验与工具
*.zip + *.zip.sha256          对应的独立安装包与校验值
packages.json                游戏包目录、大小和SHA-256
release-manifest.json        当前版本的逐文件清单
scripts/                     仓库校验、安装和干净导出
.github/                     校验流程与问题模板
docs/images/                 README展示图与来源
*-使用说明.md                 分包使用说明
```

`verification/`和`playable-games/`为维护者本地验证/演示目录，不属于发行内容。历史交付记录中的本机路径与服务状态，不是下载者的环境；新用户以本README为入口。

检查一份完整仓库是否与版本清单一致：

```bash
python3 scripts/audit_packages.py --check-lock
```

它检查ZIP、源目录、调用ID、文档链接和发行清单，不替代实际试玩。[本版检查范围](docs/FREEZE-REVIEW.md) · [版本变更](CHANGELOG.md)

## 参与项目

欢迎提供具体的运行问题、游戏创作需求和改进建议。提交问题时请附上skill ID、操作系统、浏览器、复现命令和必要截图，不上传密钥、私人存档或完整依赖目录。

- [贡献指南](CONTRIBUTING.md)：如何新增游戏包、修改资源和同步分发文件。
- [安全说明](SECURITY.md)：安装与本地执行边界、敏感问题处理。
- [维护与发布](docs/PUBLISHING.md)：版本冻结、干净导出与公开分发检查。


## 使用许可

本仓库采用**分层授权**：
- **自有代码与原创内容**：MIT License（详见 [LICENSE.md](LICENSE.md) 第一部分）。
- **随包第三方内容**：按各自许可，使用前请阅读对应 `assets/**/LICENSE` 与
  [逐包权利清单](docs/RIGHTS.md)。
- **wangzhegame 等致敬包**：含 Riot 专有素材，仅供本地演示与学习，不含任何
  官方授权，不可商用或再分发。

开源不等于可任意商用：发布前请确认你使用的包与素材的授权范围。

