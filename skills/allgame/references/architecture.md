# 共同架构：跨题材可迁移的工程合同

## 七个系统与所有权

| 系统 | 拥有什么 | 不应做什么 |
|---|---|---|
| app/loop | 初始化、逐帧顺序、场景切换、销毁 | 把所有战斗/任务塞入入口 |
| input | 键鼠/触控/手柄转为语义输入，blur/cancel释放 | 直接改奖励、UI显示决定技能是否可用 |
| simulation/state | 唯一玩法时间、目标、冷却、胜负、奖励 | 每个UI组件再维护一份计时或进度 |
| world | 共享地形/路径/采样、障碍、交互区域、布局seed | 视觉几何和碰撞/小地图使用不同坐标 |
| actors | 模型、动画、生命周期、位置表现 | 动画重置角色世界位姿或销毁其他角色共享资源 |
| presentation | 相机、粒子、声音、打击反馈 | 特效计时推进真实战斗；静态图片冒充场景 |
| ui/persistence | 状态投影、输入意图；可序列化存档+校验 | 存引擎对象、DOM或把保存失败变成游戏崩溃 |

建议每帧：采样输入→固定/受限dt推进simulation→处理一次性事件→同步实体transform→相机跟随→FX/audio→UI投影→render。暂停必须定义哪类时间停止；摄影是“冻结玩法+可转相机”，不是把所有输入禁用。

两个基线的接口不同。不要假设Babylon.Game或Three.__game是同一API，也不要把原内部调试接口当生产公共API。新增统一适配器可用`input/action/snapshot/reset`思想，但须实做并仅在DEV显式启用，不能宣称模板已有它。

## 单位和空间

- 两套基线都是XZ水平/Y高度，但手性、yaw、动画朝向以各引擎实现为准。赛车前向+Z、右法线(t.z,0,-t.x)；不要无验证直接复用给Babylon移动。
- 米、秒、弧度写进合同。赛车内部speed=m/s，snapshot.speed已经是km/h，HUD不能二次乘3.6。
- 赛车getPointAt弧长与不wrap的progress区分；立交不能只靠XZ最近点。
- 冒险heightAt供地形/玩家/道具/NPC共用；台阶附加逻辑、存档bounds、地图坐标也必须一起改。
- 角色尺寸改变要同步脚底原点、碰撞体、交互/命中距离、血条高度、镜头target、相机阻挡。

## 数据、事件和存档

不要先追求“万物JSON化”。先让一个可玩闭环成立，再提炼确实会改变的WorldConfig、ActorCatalog、Objectives与UI文案；基线部分数值散落源文件，修改时列出所有消费端。

事件包含type、source/targetId、time和不可变位置副本，消费方不能重复领奖。任务状态建议available/active/return/complete，竞技波次建议ready/running/intermission/won/lost。状态转换明确合法边及重开入口；输入的技能触发是边沿还是持续要分清。

新衍生游戏隔离save key和schema版本，验证损坏JSON、未知version、非有限数、越界坐标、负数量、storage抛错。需要迁移就写显式迁移，不能以删用户旧档替代兼容。重置后阻断beforeunload把内存旧状态再写回。

## 性能与生命周期

静态物体按材质合批，重复物体实例化，动态特效池化；角色几何共享但动画状态实例独立。换关时释放事件监听、控制器、WebAudio、render target和实例资源；共享缓存只在拥有者不再使用时释放。移动设备降低阴影/DPR是策略，不是伪造性能。

优先沿用锁文件，不为了统一API升级引擎。跨引擎移植优先GLB/纹理/配置概念，不直接复制ShaderMaterial/节点类/渲染循环。具体工艺读选中kit的architecture/specification而不是一次读两套源码。
