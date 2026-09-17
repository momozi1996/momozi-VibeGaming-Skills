---
name: moshougame
description: 构建或改造魔兽风格的单人第三人称 3D 奇幻任务游戏；内置完整 Babylon.js/TypeScript 工程、骑士与狼模型、纹理图标音效、场景构建方法及测试。用于复刻 shibing/北郡 Demo 或换风格、场景、角色与任务，不是完整 MMO 或官方魔兽客户端。
---

# moshougame · 可移植 3D 奇幻任务工坊

交付**能移动、战斗、接任务、交付奖励和保存的游戏**，不是游戏风格的落地页。所有路径相对本文件目录 `SKILL`。模型、贴图、图标、音效、代码、测试均在此 skill 中，不需要 `shibing-note`、`NORTHSHIRE_KIT`、其他 skill 或模型 API。可交给任何能读写文件、执行命令、操作浏览器的 code agent；不支持 skill 的工具直接读取本文件。

## 三种路线

- **exact**：用户要原样／1:1，恢复 `assets/reference-project/` 的北郡单人 Demo。不要把它称为完整《魔兽世界》。
- **variant（创作默认）**：换主题、场景、角色或任务。先得到完整工程，再按 [remix.md](references/remix.md) 变更。基线参考中的“不改美术／坐标”只约束 exact，不能拿来阻止用户创作。
- **rebuild**：用户明确要求重新实现，初始化依赖、真实素材和测试，不带 src 实现。按 [build-method.md](references/build-method.md) 逐系统构建；允许查源码，因此不是盲测。

未指定新主题时沿用基线。`autumn` / `frost` 是真实材质和照明换肤的启动预设，仍有原建筑／骑士／狼；不是一条命令自动生成任意城堡／雪山／完整新职业。新场景需完成几何、碰撞、任务坐标和美术的一致改造。

## 执行

1. 读 [runtime.md](references/runtime.md)，实际查看 `assets/golden/01-courtyard.png`、`04-quest.png` 与 `references/materials/` 联系表。记录输出项目 `DESIGN-BRIEF.md`：新题材、地标、主角、敌人、任务循环、设备和验收镜头。
2. 核验并生成到 skill 之外的新目录；不覆盖用户旧工程或安装目录。

```bash
python3 "<SKILL>/scripts/project.py" verify
python3 "<SKILL>/scripts/project.py" presets
python3 "<SKILL>/scripts/project.py" create --mode variant --preset autumn --out "<OUTPUT>"
# 原版用 --mode exact（不带 --preset）；从空实现用 --mode rebuild
cd "<OUTPUT>"
npm ci --no-audit --no-fund
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4302 --strictPort
```

3. 变体的 `src/theme.ts` 接入真实天空雾、阳光、地面／建筑／植物纹理材质和布置种子；标题是生成时写入 UI/index，后续要同步。主题需求不等于自动完成，按 [remix.md](references/remix.md) 改完场景、角色、叙事和 UI。
4. 按 [acceptance.md](references/acceptance.md) 跑新测试和浏览器闭环，交付命令、截图、功能结果、素材许可及偏差。无浏览器就列为未验证，不引用旧报告冒充本次测试。

## 可迁移的关键工艺

- `core/world/actors/gameplay/data/presentation/ui/app` 真正分工；Game 组装，不把全部代码塞回入口。
- XZ世界＋共享 `heightAt(x,z)`；地形顶点可更新，移动、道具、NPC和碰撞使用同一高度规则。
- 地标由建筑构件、纹理、细部和合批构建；植物透明裁切与 thin instances；GLB 骑士的骨骼动作。别退化成灰盒或一张参考截图。
- 跟随相机 `setTarget` 保留 alpha/beta/radius；摄影暂停玩法与骨骼，但仍允许转镜头。
- 普通攻击开关先于通用冷却门禁。任务只奖励一次；死亡／重置／异常存储可恢复；模态窗口暂停和焦点 Esc 均回归。
- 纹理加载失败必须拦截进入游戏，不悄悄换成纯色。保留 Babylon 细粒度导入与 loader/ray/animation/thin-instance 注册副作用。
- 默认保留3狼+2草药的完整任务闭环；用户可以改变目标与题材，但同步数据、逻辑、存档版本、UI和测试。

## 按需路由

- 构建和续跑：[build-method.md](references/build-method.md)；主题／场景／角色替换：[remix.md](references/remix.md)。
- 真实架构与数值：[specification.md](references/specification.md)；常见失败：[pitfalls.md](references/pitfalls.md)。
- 素材位置／许可：[provenance.md](references/provenance.md)；仅需要重新生产素材时才读 [asset-pipeline.md](references/asset-pipeline.md)。普通构建无需 Blender。

只做用户请求的范围，不自动加入联机、账号、付费或远程部署。无需多 agent。基线狼 GLB **没有 skin／动画**，骑士有6段；不要依据制作脚本把狼说成已带骨骼动作。可在变体增加，但必须实测。任何模型都能读指令不等于保证任何模型都能一次生成同样品质。
