# 玩法、规则与存档的完整规格

## 1. 空间与角色

XZ水平、Y向上，单位米/秒。初始(x,z)=(0,19)，yaw=π，状态初始y=0但boot马上设为max(.25,heightAt)。初始时间0，20个球，无伙伴，无奖励。

运行边界：x∈[-67,67]，z∈[-87,64]。每帧先clamp，后按世界obstacles圆形推开，玩家附加半径.3；这是轻量碰撞，不是闭合物理边界。

| 动作 | 数值 |
|---|---|
| 普通步行 | 4.6m/s |
| Shift疾跑 | 7.2m/s |
| 一般合体 | 7.8m/s |
| 焰尾合体 | 11.5m/s，不需Shift |
| 普通起跳vy | 6.1m/s |
| 合体首次起跳vy | 8m/s |
| 二段跳vy | 6.8m/s |
| 重力 | 18m/s² |
| 玩法dt封顶 | 0.05s |
| 朝向收敛 | 最短角差 × min(1,dt×12) |

水中减速条件同时满足riverDist<5、heightAt<.3，并且不是泡泡合体；速度乘.46。泡泡合体地面保底Y=.34，其他形态保底.13。没有游泳体力/溺水。

绵云(index0)或芽芽(index3)合体可二段跳，其他只一次。落地清jumpCount；capture或pause拒绝jump。角色可以落地于任何可采样地面，没有完整攀爬/斜坡限制。

## 2. 物种与实例

| index / id | 名称/属性 | 色/辅色 | 提示区域 | 合体能力 |
|---|---|---|---|---|
| 0 cloud | 绵云/风 | #d7f4ed / #6dc2b3 | 初遇花甸 | 二段跳，文案“轻盈跳跃” |
| 1 fox | 焰尾/火 | #ffd4a5 / #eb9364 | 日光小径 | 11.5m/s |
| 2 aqua | 泡泡/水 | #b4e9f2 / #63bad1 | 映蓝河湾 | 水上通行不减速 |
| 3 leaf | 芽芽/木 | #e1edb3 / #9db66a | 风语林地 | 二段跳 |

| 实例 | 物种index | 基准x,z | phase |
|---|---:|---|---:|
| c1 | 0 | 1,7 | 0 |
| f1 | 1 | 13,-4 | 2 |
| a1 | 2 | 29,2 | 4 |
| l1 | 3 | -18,-13 | 1 |
| c2 | 0 | -15,14 | 3 |
| f2 | 1 | 8,-37 | 5 |
| a2 | 2 | 34,-31 | 2 |
| l2 | 3 | -31,-40 | 5 |

真实闲逛：x=baseX+sin(time×.21+phase)×.75；z=baseZ+cos(time×.18+phase)×.75。y=max(.31,heightAt)。capture目标冻结位置；距离玩家<9m时转向玩家，其余有缓慢转向和body摇摆。不可将存档捕捉ID换成单纯计数。

## 3. 捕捉状态机

触发：E、场景左键轻点（拖动总量<5像素）、HUD捕捉按钮。触屏场景轻点不捕捉，使用按钮。

- 选择：每帧从未捕捉个体中选XZ最近者；距离>8则near=null。不需要准星精确射线命中，这是当前原型规则。
- `canCapture`：未暂停、未合体、当前无capture、球>0、distance<=8、ID有效、未捕捉此实例。
- `startCapture`：设 `{id,progress:0}`，立即减1球，不能重入。
- `stepCapture`：未暂停每帧progress+=dt/1.5；>=1追加实例ID，清capture，自动选中捕捉物种，返回species index供一次性表现消费。
- 概率：100%，没有原版眩晕/生命/概率规则。球飞向目标有抛物线视觉，不用弹道碰撞决定结果。
- capture中移动速度0，jump/twine/换伙伴被应用层阻止；pause冻结capture。
- 结算：野生隐藏、粒子、合成提示音（已开启时）、新伙伴通知、替换跟随与合体模型、立即存档。
- 同种第二个实例仍能捕捉和扣球，但uniqueSpecies不增加。

没有取消按钮。中途刷新存档不持久化capture；球可能因自动保存已扣除但目标未收服，是基线边界，exact不静默修规则。

## 4. 联结与伙伴

Q仅可对已拥有的selected物种切换。合体不是骑乘：隐藏探险家、显示scale1.6的宠物形态；退出恢复人形。不同形态切换发粒子、音效和toast。

1—4按键选物种index；UI伙伴头像/图鉴也可选择。未获得者只提示去对应区域；不会免费授予。非合体时显示scale.8跟随宠物，落地heightAt。

跟随目标：
```
tx = playerX - sin(yaw)*2 + cos(yaw)*1.05
tz = playerZ - cos(yaw)*2 - sin(yaw)*1.05
```
XZ指数插值系数1-exp(-dt×3)，偏离>.5时播放行走摆腿。不含跟随伙伴完整避障AI。

## 5. 探索委托与完成

开放世界出生即激活，无强制标题菜单。左边委托可打开说明。

1. 初始提示“与原野的伊莫成为伙伴”，进度0/3。
2. uniqueSpecies>=3后提示“循着微风，前往风之门”，显示导航距离和世界锚点。
3. 风之门(x,z)=(-13,-33)，E在7m内提交。
4. 提交条件：未pause、未completed、种类>=3、distance<=7。
5. 一次性将completed=true，reward=300，orbs+=10；立即保存，弹完成窗口并暂停。
6. “继续在原野漫游”关闭窗口；“重新开始旅途”进入确认。
7. 再按E不能重复奖励。所有8个个体可捕捉，不必停止世界。

星屑只是奖励记录，没有货币商店或消费系统。生命/体力条当前固定满，不应编造受伤或体力逻辑。

## 6. 感知与摄影

C：寻找最近未捕捉个体，toast显示名字、四舍五入距离和地图提示，生成持续1.7s的扩散ring（最大约35m）。没有独立冷却或透视高亮系统。

P：暂停state，隐藏HUD、显示摄影边框与“保存照片”；相机仍可拖动/滚轮。导出实际renderer canvas PNG（不含DOM界面），文件名“风栖原野-时间戳.png”。退出恢复。

## 7. 暂停、输入释放、重开

Esc打开pause；modal或photo中Esc关闭相应界面。map/dex/quest/reset/complete也是pause。modal中相机锁住，photo可转。仅关闭窗口会恢复，没有嵌套返回栈。

blur清held keys/move/drag并save；仅blur本身不自动pause。document.hidden触发pause（如果没有其他窗口）。pointercancel/触控失去捕获释放输入，防止卡方向。

reset确认后Object.assign同一state对象，清捕捉、奖励、步数、time、形态、粒子、scan、球动画、input、jumpCount；回起点和默认镜头，显示野生个体并立即保存。

## 8. 存档

key：`windmeadow-aniimo-prototype-v1`，schema version1。
序列化字段：version,x,z,captured,selected,completed,reward,orbs,steps。
不保存：y,vy,yaw,time,twined,capture,paused,相机位置、质量、音效。刷新以普通人形和默认相机继续。

恢复：
- 无效JSON/未知version→初始state；storage.getItem或setItem抛异常不崩溃。
- captured过滤未知ID并去重；selected必须属于owned，否则取首个owned或0。
- x clamp[-65,65]、z clamp[-80,60]，注意比运行边界更窄，exact保留。
- orbs为整数时clamp[1,40]，否则20。允许游玩状态0但读档最低1，是基线容错行为。
- completed仅当d.completed===true且owned>=3；reward不信任传入值，完成固定300否则0。
- steps必须有限且>=0。

每state.time超过lastSave+6秒自动保存；capture/完成/reset即时保存；beforeunload与blur也保存。只是本机存档，不是账号或云端。
