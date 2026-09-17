> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 驾驶与比赛规则

## 速度单位

物理积分和racers[i].speed为m/s；同步给UI的state.speed / snapshot.speed已经是round(player.speed×3.6)的km/h。不要二次转换。

## 真实控制，而非过场动画

固定子步1/120秒；外层 dt限制0..10秒，renderer实际每帧dt≤.05。Frenet赛道坐标 `_distance/lateral/heading` 积分，真人不转向时保持世界方向，不能偷偷吸到赛道中线。assist是显式测试选项。

8车，3圈，24检查点/圈。player从第8位出发；其grid7，其余grid0..6。纵向起始`-6-floor(grid/2)*6`，横向±2.4（受道路限制）。PLAYER _baseSpeed39.5m/s，AI32.6+((i*7)%9)*.37；硬速度上限66。

## 转向 / 加速度

turnRate = `1.8*clamp(speed/10,0,1)/(1+max(0,speed-15)*.021)`。
steer指数平滑11；yawRate平滑10。漂移steer*1.12 + driftDirection*.09。

玩家accel24，AI21.5；drive=throttle*(1-brake)*accel*(1-.34*clamp(speed/topSpeed,0,1))。
拖曳=(throttle>0?2.5:5.8)+speed*.04+sand*9+(drift?.8:0)；brake减速40。
最高速度=(baseSpeed+coins*.18+boostPower)*(1-sand*.59)。boost时最低油门.85。

roadEdge=width/2-.8=7.2，outerEdge=width/2+min(9,width*.55)=16.8。sand=clamp((abs(lateral)-roadEdge)/3.8,0,1)。越出outerEdge有温和边界回弹，不掉入水里。

## 漂移

速度>12、非offroad、非stun，按drift且|steer|>.14开始。仅在|steer|>.12且speed>13时蓄力，直线按住不能刷boost。

0.6/1.3/2.25秒→三级；charge=seconds/2.25，上限1。松开drift且速度>9、非offroad释放，对应boost .85/1.45/2.15秒。漂移方向固定开始转向的符号。

## AI

同一转向/加减速积分，pure pursuit。lookahead=10+speed*.33，目标道含不同baseLane+轻微正弦；近前车绕行，必要时减油。角速度目标=2*max(8,speed)*sin(error)/look。

按前方曲率控制弯道速度，允许短漂移。不把AI位置每帧直接设为u+=constant的动画，也不让它们只在玩家可见时跑。

## 拾取 / 道具 / 碰撞

拾取沿帧间轨迹跨越检测，不能只测端点导致高速穿过。金币上限10，会微增最高速度；道具有boost/shield/projectile。item按键边沿触发，长按不重复使用。

- 道具boost：2.5秒、power16。
- shield：6秒，吸收一次攻击后消失。
- projectile：速度76，life2.5，寻找前方目标；追踪位置和命中模拟可运行；main渲染橙色多面体。
- 加速板：入区触发，duration1.05，pad冷却.8秒；不能每一子步重复刷新。
- kart contact 基于纵3.65/横2.35的椭圆范围与0.75秒接触冷却，轻推/扣速。
- projectile命中速度×.52，stun.6，掉2币，中止boost/drift；护盾时免伤一次。

精确冷却、赔率、各种碰撞边界以 snapshot `simulation.js` 及 tests 为准。

## 圈数与排名

只在顺序检查点前向跨越时累计；start line是同一套检查点。重置/倒着穿线/伪造progress不能增加圈数。

R救援：在**已有distance**对应中心线，清heading/kick/yawRate/boost，speed0，有.35秒锁定；不能使用nearest把人传到一条邻近更靠前的道路。

排序：已完赛按finishTime；未完赛按受nextCheckpoint限制的progress。玩家到终点停止比赛，以观测pace估算其他AI未完成时间，保持 `estimated:true`。HUD/结果必须显示≈。

## 暂停 / 重新开始

暂停恢复之前的countdown/racing，不重置计时；pausing不推进道具冷却。reset清空projectiles/pickup/contact timers/input边沿，重新激活全部拾取。

## 行为测试即边界示例

16项原 tests覆盖：合同/倒计时暂停/真人vsassist/转向刹车/漂移/直线防刷/拾取冷却/道具单次/追踪命中/护盾/加速板单次/越界救援/车碰撞/检查点防作弊/完整比赛/AI与帧率一致性。不要删除测试来“兼容”自己的实现。
