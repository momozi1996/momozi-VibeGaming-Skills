---
name: yimogame
description: 复刻或改造可玩的第三人称3D萌宠探索游戏；内置伊莫·风栖原野完整源码、成品、程序化角色场景和离线依赖，支持捕捉、伙伴联结变身、地图图鉴、委托通关、存档与触屏。用于复刻yimo-note或换角色、换场景的同类创作，不是官方伊莫MMO。
---

# yimoGame · 萌宠原野探索

交付**能实际操作的完整游戏工程和启动方式**，不是策划案、宣传页、静态截图或空脚手架。默认保留《伊莫·风栖原野》的真实3D画面和全部已有玩法，再按用户要求改造。

`KIT` 是本文件所在目录，`OUT` 是用户工作区中包外的新目录。没有用户指定路径时选工作区下未使用的目录，不把作品生成到全局技能目录。整个 skill 自包含，不依赖原 `yimo-note`、其他 skill、原会话、外部素材服务或模型 API。

## 默认：一次命令生成并启动

只需 Python 3.9+ 和支持 WebGL2 的现代浏览器；**直接试玩无需 Node/npm、联网下载或生成美术**。完整源码、编译好的 dist 和引擎均已内置。

```bash
python3 "$KIT/scripts/reproduce.py" play --out "$OUT" --port 4493
```

此命令先校验包，完整恢复源码和成品，再以前台服务打开 `http://127.0.0.1:4493`。让服务保持运行并把地址交给用户；Ctrl+C 关闭。非空输出拒绝覆盖。端口冲突换未用端口，不杀其他服务。

若 Agent 需要分别安排生成和后台服务：

```bash
python3 "$KIT/scripts/reproduce.py" restore --mode exact --out "$OUT"
python3 "$KIT/scripts/reproduce.py" compare --project "$OUT" --all
python3 "$KIT/scripts/reproduce.py" serve --project "$OUT" --port 4493
```

已经生成的工程直接用 `serve --project` 重开，不对非空目录再次 `play/restore`。生成后不需要 KIT 也能启动：在工程中运行 `python3 -m http.server 4493 --bind 127.0.0.1 --directory dist`。不能双击 file://。

首次先看 `assets/golden/01-field.png`、`04-dex.png`，了解应保留的实机画面；源码和资源的真值是 `assets/reference-project/`。不要用重新生图替换已经完整的角色和场景。

## 不能缩水的可玩闭环

- 第三人称探索、WASD/触屏摇杆、Shift 疾跑、Space 跳跃、鼠标镜头；地形高度和碰撞真实响应。
- 4种生物、8个野生实例；8米内 E 捕捉，消耗球，1.5秒完成；伙伴跟随。
- Q 联结切换成真正的生物模型，绵云/芽芽二段跳、焰尾疾跑、泡泡水上通行；1—4选伙伴。
- 集齐至少3种（不是3只）后，到风之门按 E 提交；300星屑和10球一次性奖励，之后可继续探索。
- B 图鉴、M 地图、C 感知、P 摄影并保存真实PNG、Esc 暂停、确认重开、本地存档。
- 保留白花草甸、风动植被、树冠、水面、远景浮空城、风门、角色动作和完整HUD，不能用大平面或背景图替代。

详细规则按需读 [玩法](references/gameplay.md)、[界面与输入](references/ui-and-controls.md)。

## 换主题 / 换场景 / 换主角

仍从 `exact` 的完整可玩工程开始，**不是从 rebuild 空 src 开始**。读 [创作改造指南](references/remix-guide.md)、[文件地图](references/project-map.md)、[美术工艺](references/art-and-scene.md)。用户要求新造型时实际修改几何、动画或地形，不只改标题或色值。

开发需要 Node20+ / npm；包内有锁定依赖的离线缓存：

```bash
python3 "$KIT/scripts/reproduce.py" install --project "$OUT"
cd "$OUT"
npm run dev -- --host 127.0.0.1 --port 4494 --strictPort
# 修改完成后构建新的成品，否则 dist 仍是原版：
npm run build
```

`install` 默认离线，缓存含69个锁定 tarball；不升级依赖，不做全局安装。只有明确选择联网安装时才用 `--online`。Node/Python/浏览器/系统字体不随包分发，跨系统运行边界见 [环境](references/runtime.md)。

`rebuild` 仅在用户明确要求参照重写时使用，详见 [逐步实施](references/rebuild-steps.md)；该模式的 src 是空的，不得当作完成品交付。修改只发生在 OUT，安装包基线和 golden 保持不动。

## 交付前确认（不是另装一个测试 skill）

先启动并检查可玩场景、移动捕捉、真实联结、任务/存档；看实际截图确认画面没有丢失。开发/改造后可以直接用包内工具：

```bash
node "$KIT/scripts/check.mjs" --project "$OUT" --out "$REPORT" --port 4370
node "$KIT/scripts/capture.mjs" --project "$OUT" --out "$SHOTS" --port 4374
```

REPORT/SHOTS 必须是包外的新路径。原样模式还可用 `visual_diff.py` 对比 `assets/golden`，改造模式不能硬套原主题像素阈值。固定截图含存档夹具和虚拟时间，不等于自然通关或真实帧率。

交付工程路径、可访问地址/重启命令、操作方法、实际完成的玩法和截图；有未验证项直说。包内历史记录不是当前项目测试结果。完整检查定义见 [验收](references/acceptance.md)，工具不需要其他 skill。

## 范围与进一步参考

这是一款完整闭环的**单人浏览器原型**，不是官方《伊莫》客户端；没有战斗/伤害、联网多人、可进入浮空城或完整MMO。音效默认关闭，没有背景音乐。品牌与第三方研究图不自动获得商用权利。

- 可直接交给其他模型的指令：[完整复刻](prompts/01-完整复现提示词.md)、[换主题创作](prompts/04-换主题创作提示词.md)、[续跑](prompts/03-续跑与纠偏提示词.md)。
- 角色/场景资产：[素材](references/assets.md)、`references/asset-catalog.json`；GLB备份是静态模型，动画来自源码。
- 规则接口：`references/contract.json`；偏差排查：[pitfalls](references/pitfalls.md)。
- 来源与版权：[provenance](references/provenance.md)、[rights](references/rights.md)。

任何能读文件、执行命令的 code agent 都可按此流程使用；不绑定模型厂商，但不保证任意模型的新创意一次完成或跨GPU逐像素一致。
