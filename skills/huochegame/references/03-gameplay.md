# 03 · 物理 / 状态 / 奖励 / 声音

可执行真值：`game.js` 6–9 区。以下是精确到关键系数的摘要。

## 状态机

```text
ready --启程/W/触屏--> driving --低速进站或高速安全制动--> docked
  |                                                              |
  +--> workshop --返回--> ready             E开门 --> boarding --7秒--> driving
                                          docked --> workshop --> docked
```

`paused` 是独立布尔值，冻结 simulation 时钟。初始 state 见完整源码；核心字段包括 mode/distance/speed/acceleration/throttle/brake/comfort/coins/streak/passengers/nextStation/lastStation/legStart/legEnd/dockedStation/dwell/doorPhase/doorOpen/rewarded/streakBroken/legMinComfort/legRoughness/upgraded/workStage/workStep/workProgress。

只允许 driving 积分轨道物理。ready静止，docked静止，boarding只推进门/人，workshop只推进工坊。

## 固定时间步

rAF墙钟增量 clamp到.15秒，accumulator以1/60推进，最多9次；暂停清 accumulator。画面 present 和 UI 不自行加钱或推进换客。手机慢帧不能每帧算固定距离。

## 驾驶公式（dt 秒）

```js
throttle = lerp(throttle, power ? 1 : 0, 1-exp(-dt*1.8));
brake    = lerp(brake, brakeHeld ? 1 : 0, 1-exp(-dt*3.7));
motor = throttle * (upgraded ? 2.85 : 2.65) * (1-.45*speed/17);
drag = .09 + .0015*speed*speed;
acceleration = motor - brake*5.7 - drag - tangent.y*2.7;
if (speed<=.01 && !power) acceleration=0; // 坡上驻车
speed = clamp(speed + acceleration*dt, 0, 16.67);
distance += speed*dt;
```

HUD仅一次 `km/h=speed*3.6`；释放动力后平缓减速，不要立即归零；W与S同时按时制动覆盖大部分动力，参考上述算式。

## 路况与舒适度

```js
curvature = length(tangent(s+2.5)-tangent(s-2.5))/5;
curveForce = speed*speed*curvature;
exposed = (p.y>37 && p.z<65) || (p.z>90 && p.x<60);
wind = exposed ? .32+.68*(.5+.5*sin(time*.36+u*11)) : 0;
jerk = abs(acceleration-oldAcceleration)/max(dt,.001);
roughAccel  = max(0,abs(acceleration)-1.55)*1.45;
roughCorner = max(0,curveForce-1.6)*2.4;
roughWind   = wind*max(0,speed-6)*.22;
roughJerk   = max(0,jerk-4.4)*.07;
roughness=(roughAccel+roughCorner+roughWind+roughJerk)*(upgraded?.78:1);
recovery=(speed>.8 && roughness<.35) ? .6 : 0;
comfort=clamp(comfort+(recovery-roughness)*dt,0,100);
legRoughness+=roughness*dt;
legMinComfort=min(legMinComfort,comfort);
```

comfort<56 且本程尚未中断时，`streakBroken=true; streak=0`，显示“连胜中断。找到平衡，重新赚取小费。”，每程只提示一次。

HUD路况优先级：wind>.4侧风；curveForce>1.7高架弯道；grade>.055上坡、<-.055下坡；否则平稳。

## 停站与下一程

- `remaining=legEnd-distance`；remaining<11且≥-1、speed<1.95 m/s→吸附legEnd，合法停站。
- 如果前一帧还小于legEnd+1而这帧越过→吸附legEnd、安全制动，comfort至少扣32（最低12），streakBroken=true、streak=0、misses++。
- 两种停靠均进入docked，速度/油门/刹车归零，清输入；还没开门，不发钱。
- 从docked开门时进入boarding、设置boardingStart、开始字幕并结算一次。
- 开门0–1秒、保持1–5.8秒、5.8–6.9关门，第7秒转driving。
- 排队6人各延迟.55秒，用1.4秒移向车门并隐藏；座位人数随dwell变化；最终Mango出发14人、Saltlight出发12人。
- 完成后`lastStation=dockedStation; nextStation=1-lastStation; legStart=distance`；目标s加当前圈号L，若≤distance+10再加L。
- reset本程roughness和broken、comfort+14（最多100），legMinComfort=comfort。更新路线和字幕，不能立即重复靠同一站。

## 一次性奖励

`rewarded`在开门结算函数开头检查并设置；arrivals++。平稳要求同时满足：comfort≥75、legMinComfort≥58、legRoughness<30、!streakBroken。

- 车费 `fare=passengers*4`（乘客上下客前的人数）。
- 平稳：streak++，tip=75+max(0,streak-1)*15；否则streak=0、tip=0。
- coins+=fare+tip，然后save。第1次初始12人平稳到Mango应+48车费+75小费=123。
- 多按E、等候、工坊往返不能重复发钱。失败也有基本车费，但没有小费。

## 存档与重开

key=`cloudline.v1`；`{version:1,coins:<integer>,upgrade:<boolean>}`。仅当version=1、coins有限且0..9999999、upgrade为boolean时读取；coin向下取整。try/catch访问localStorage，坏JSON或禁用不崩溃。restart重置旅程、时间/门/人数/连胜/待客位置，保留钱和已完整改装。

## 声音

首个用户交互才create/resume AudioContext；不以“音效加载完”阻塞游戏。

- master .25；电机triangle，freq=38+speed*5；增益min(.14,speed*.014)。
- 轨道咔嗒 freq=90+speed*3、duration .045、gain .11，间隔max(.085,1.55/speed)。
- 铃声音两频：830 Hz/.8秒/.2 与1244 Hz/.95秒/.08。
- 用gain包络到.001后stop，结束disconnect；不无限累积节点。
- 静音/暂停主gain到0；所有声音内生，无文件下载。
