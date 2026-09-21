# 从完整电车游戏创作变体

先用game.py create复制完整工程，在输出里改动；默认不是prepare空实现。先实际驾驶和停站，再定一个主题，避免改完美术才发现车站不可达。

## 改哪些文件

| 目标 | 输出源码入口 | 同时维护 |
|---|---|---|
| 雪山/夜市/海滨色调 | src/game.js 的 M、天空/水/云、灯光和雾 | 车与轨道对比、灯光强度、远近景可读性；非只改背景色 |
| 地形/建筑与地标 | island/house/tree/lighthouse/platform/resident | 主岛与远岛层次、乘客尺度、房屋不挡轨道；程序几何不是外部GLB |
| 新线路 | controlPoints、frame、nearestDistance、stations | 所有站台/路轨/车辆方向共享弧长；新增站数需修改原两站往返状态机 |
| 新电车与改装 | makeTram、decor/roof/door/passengers、workshopScene、syncUpgrade | 正式车和工坊车同步、门有真实运动、两阶段外观可见、返回状态不刷钱 |
| 新驾驶任务 | state、simulate、dock、operateDoors、finishBoarding | 距离/速度单位、舒适度、低速停靠、一次性奖励、暂停和存档 |
| 界面和主题文案 | src/shell.html、src/style.css、updateUI | 桌面横构图与手机竖构图、触控踏板、键帽、对比度；不挡车体 |
| 声音 | initAudio/tone/playBell/updateAudio | 用户手势激活、静音、一套音频上下文；不引入远程播放依赖 |

索引见source-map.md，精确比例见02-world-art.md，输入见05-ui-input.md。

## 视觉优先次序

1. 先锁定镜头：车身约占主视觉区域，轨道导向远岛；工坊是独立展示场景，不在驾驶HUD上硬叠工作台。
2. 改轮廓与大形：至少车体、主站、关键地标真的体现新题材，再处理配色。保留桥墩、坡度、站台与轨道的空间关系。
3. 保持前景车、中景轨道与主岛、远景云海分层。小装饰不能遮挡车门与停靠标识。
4. 让视觉响应玩法：轮转/侧倾随速度，车门随状态，改装完成后真实增加几何；不靠文字伪装功能。

## 示例需求

“改成雪山邮政电车”：先维持原两站和奖励，改雪岩、木屋、暖灯、邮袋车厢和工坊零件；再把载客目标调整成邮袋交付时，联动UI、奖励、存档结构与测试，不宣称已有一键snow皮肤。

## 构建与交付

在OUT执行 `node build.mjs`，刷新新cloudline.html；源码变化不会自动写入旧HTML。驾驶完整去回、低速开门结算、进出工坊、重载存档，再看驾驶/到站/改装三个画面。新存档schema宜换SAVE_KEY，不能偷偷污染用户原游戏存档。报告哪些来自原版、哪些新实现及未验证项；不编辑skill的冻结参考工程。
