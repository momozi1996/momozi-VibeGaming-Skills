# 可迁移的第三人称奇幻游戏构建法

完整游戏＝统一世界坐标＋真实素材工艺＋状态机＋玩家反馈。variant逐系统替换，rebuild先建立垂直可玩切片，不让模型一次重写138个基准文件。

| 阶段 | 实现边界 | 当阶段可验证结果 |
|---|---|---|
| 0 合同 | 读specification；HTML canvas/world与app；锁定版本；保留Babylon必要side-effect imports | WebGL正常、错误页可读；src按core/world/actors/gameplay/data/presentation/ui/app分工 |
| 1 世界骨架 | 共用heightAt/onPath；updatable地形、道路、camera、阴影/HDR；素材错误门禁 | 地形确实有GPU高差；跟随相机运动不改变radius；资源全部来自本地 |
| 2 地标与植被 | Builder构件合批，建筑屋顶/墙/门窗/台阶与bounds；带seed树草thin instances | 轮廓、法线、透明裁切与碰撞正确；远景近景均看，不只前立面 |
| 3 主角 | LoadAssetContainerAsync；Actor克隆、动画分组与状态；PlayerController | WASD/奔跑/跳跃/落地/墙边滑动；动作与位置一致；旋转/缩放镜头不穿主角 |
| 4 可玩切片 | GameState、Combat、NPC与目标、受击与掉落 | 从守卫接任务，击杀1只狼，采1束草，显示进度；此时才扩完整目标 |
| 5 完整任务 | active→return→complete；3狼+2草；奖励/升级/死亡/重生/保存 | 15个单元；完整任务只领一次；localStorage失败不崩；刷新后继续 |
| 6 UI和反馈 | 中文皮革/羊皮纸HUD、动态地图、任务/背包/设置；音效、伤害/选中特效 | UI变化来自State；背包喝药当场更新；Esc先于表单焦点过滤 |
| 7 交付 | 摄影暂停骨骼与玩法但保留相机、真实PNG、重置确认、production | 完整playthrough+edges+production，受控六镜头，生产无debug，无未解释错误/外站资源 |

## 美术制作工艺而非资产堆砌

- 大轮廓用模块建筑真实几何；瓦顶方向、墙角/扶壁/门廊/窗棂靠构件，不用单方块一贴了事。
- 场景主要StandardMaterial＋本地diffuse/normal；角色glTF PBR＋HDR。保持材质色空间和曝光的区别，不通过把所有灯加亮掩盖材质丢失。
- 植物用带alpha纹理的平面簇和thin instances；clone后注意共享薄实例buffer污染；透明裁切保留纹理alpha，不能把整棵树变绿方片。
- 骑士已有6段动作；狼冻结GLB只有静态几何，AI可移动但不是已完成骨骼动作。升级狼动画须验skin/clip、速度、接地、死亡与恢复。

## 图像修正

固定镜头、画质、DPR、人物状态与动画帧后看大形／人物比例 → 镜头与道路导视 → 光色材质 → UI →细部。AO内核含随机数，capture脚本固定seed只作截图夹具，不篡改运行逻辑。新的场景用新机位，不能以旧golden的绝对像素阈值限制创作。

## 续接记录

输出PROGRESS.md：目标与模式、路径/端口、已完成系统、最后运行命令及失败、素材替换清单、存档schema决定、下一步具体文件。完成一个可玩增量就构建、截图，再继续。复制得到的内容标继承；自己新写标改造；没执行测试标未验证。
