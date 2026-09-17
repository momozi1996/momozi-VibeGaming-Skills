# 新主题／新地图／新角色／新任务

## 初始成品与创作自由

`variant --preset autumn|frost` 会生成可玩工程和 `src/theme.ts`。autumn把环境变暖、叶片黄褐；frost偏冷、雾青蓝。改变的是实际灯光／材质，保留纹理细节、GLB、动画、战斗和任务。**它们不是一键新关卡生成器，也没有自动添加积雪／枫树模型／新故事。** 接下来按设计合同实施对应系统。

在DESIGN-BRIEF.md写清：主题、地标轮廓、道路走向、主角／敌人造型、任务目标、表现语汇、保留行为、目标设备和新验收镜头。用户没要求就保留单人任务原型，不暗加MMO/后端。

## 修改地图：一份世界合同驱动所有系统

| 入口 | 用途 | 联动约束 |
|---|---|---|
| `theme.ts` | 雾、阳光、曝光、材质tint、植被seed | 保留贴图；不是调CSS滤镜；改seed后仍要验通路和任务点净空 |
| `world/terrain.ts` | heightAt、onPath、道路strip、庭院 | player、props、vegetation、NPC/怪都要同一高度；小地图道路不能停留旧位置 |
| `world/abbey.ts` + geometry.ts | 建筑组装／材质／bounds | 新形状同步碰撞；台阶高度另在player.ts；不可仅平移画面中的模型 |
| `world/vegetation.ts` | 树／草／花分布、treeBounds | thin instances buffer独立性；路径净空和碰撞半径；草木alpha |
| `world/props.ts` | 路标／旗／车／灯／其他导视 | 标牌方向和地名指向新目标；合批、阴影与拾取配置 |
| `data/content.ts` | NPCS/ENEMIES/HERBS坐标与任务文本 | Game初始化、交互距离、出生复活坐标、地图标记、E2E传送夹具 |
| `actors/player.ts` | 移动范围、stairs、初生/复活/相机 | 新地图bounds需同步core/state.ts存档坐标clamp；不把玩家卡在旧边界 |
| `ui/minimap.ts` + ui.ts | 大/小地图和地名、任务追踪 | 修改世界坐标映射／道路／标记；真实玩家与新任务目标可见 |

建议把新关卡参数抽为 `data/world.ts`（bounds、spawn、respawn、landmarks、roads、npcs、enemies、collectibles），再让上述模块消费；这是需要agent完成的重构，不是假称基线已数据驱动。X/Z平移、旋转、比例涉及建筑和bounds都要一致变换；不能只移动scene mesh。

### 安全拓扑

入口→NPC→战斗区→采集→交付的路线必须可徒步通行，不被树干/新建筑挡住。新台阶要做可达坡度；水面或峡谷要有真实阻挡/桥/重生规则。每个地标看正侧背和collision；只看主镜头无法发现背面缺面。

## 换角色／敌人

1. 保留基线作回退，在输出新增GLB（不是覆盖技能内基线）。用包里模型inspect工具或加载结果确认mesh/bounds、skin、animationGroups实际存在。
2. 读Actor如何克隆、命名clip、播放/锁定/淡入。建立新clip映射 Idle/Walk/Run/Attack/Hurt/Death 等，不假设下载角色同名；找不到clip时决定补做动画还是明确限制。
3. 在独立展示场景检查身高、脚底原点、朝向、武器位置、材质和HDR。调模型scale同时检查角色碰撞、攻击距离、血条高度、相机target及UI portrait。
4. 不同敌人需要不同container/Actor工厂和技能反馈；不要只改`wolf`标签而继续显示狼。
5. 小型变体优先用现有CC0模型；用户要求新模型时可手工程序化或使用用户给的授权资产。外部工具是可选，不得把某个收费生成API变为安装硬依赖。

## 换故事和玩法

- 只改文本：content.ts的QUEST/SKILLS/NPCS与UI内地名、提示、任务追踪、重生按钮一起改。title预设只改UI/index部分品牌，基线叙事仍须完整本地化。
- 改目标数量：core/state.ts的任务门槛／限制、content.ts叙事、ui.ts追踪、Combat击杀和采集事件、新测试全部同步；不能只把“3狼”改成“5狼”。
- 新技能：SKILLS UI配置不是伤害逻辑源；Combat里花费、命中距离、AoE、stun/CD和FX/audio也要改。普通攻击开关不得被其他技能CD挡住。
- 新存档：独立命名空间如`ambervale.save.v1`，新schema升版本并迁移或明确要求重置，不加载另一个变体的旧坐标。预设为基线回归保留`northshire.save.v1`；真正发布衍生版时必须隔离，测试也同步其期望，不伪报基线全过。
- 数值更改仍保证奖励只一次、死亡恢复、补给可用、暂停时间不跑、存储异常不崩。

## 示例创作路线

- 「秋日边境哨站」：autumn启动；建筑从修道院改为木石哨站/瞭望塔与栅门，跟着修bounds和stairs；换路标/旗；任务叫“失踪的补给”，敌人和收集物必须体现新文本，不能只更名；地图与存档隔离；完整步行路线、任务、重置、摄影验收。
- 「雪山遗迹探险」：frost启动；保留冷色作为调色基础，新增合法雪地/冰岩材质或本地生成纹理；阶梯遗迹、针叶树、雪坡与洞口；更新heightAt/碰撞/出生/路径；新雪狼可以复用狼几何但不可声称已新增骨骼动作；换UI纹样仍保持读图对比度。

## 测试迁移

预设仅改色/题头，可继续跑不变的基线测试；地图、按键、存档key或任务真变了，旧fixture可能不适用。保留基线不改，在输出新增变体测试，逐项映射移动/碰撞/战斗/奖励/存档/摄影/缺素材门禁/生产无debug；修改的是需求映射和操作坐标，不删除核心断言或偷降判定。新授权清单只在输出生成，保留旧来源记录；不通过重签技能哈希掩盖素材污染。

本次实拍换肤示例：[variant-preview.jpg](../assets/variant-preview.jpg)。仅展示预设起点，不是用户未来新主题的完成证明。
