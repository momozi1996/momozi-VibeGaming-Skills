# 04｜架构与逐帧合同

精确数值：`combat-data.json` 是从 `fighters/definitions.ts` 导出的完整 Move 对象；不要把下表当作省略其它属性的理由。源代码路径均相对 `assets/reference-project/`。

## 模块责任

| 模块 | 责任 / 不可跨越的边界 |
|---|---|
| `main.ts` | 实例连接、模式切换、全局控制、调试API；不塞具体招式判定 |
| `combat/types.ts` | CharacterId、State、Move、InputFrame、Fighter、MatchSnapshot、Event |
| `input/KeyboardInput.ts` | 实体/触控held与edge，finishFrame清edge；不直接扣血 |
| `input/CommandBuffer.ts` | 朝向相对方向history、动作queue、QCF识别，独立于DOM |
| `input/CPU.ts` | seeded决策输出InputFrame，不能读玩家尚未提交输入 |
| `fighters/FighterFSM.ts` | 状态/age、位移、重力、取消/转身/攻击推进 |
| `fighters/definitions.ts` | 人物参数与Move配置 |
| `collision/boxes.ts` | 局部→世界矩形、重叠、有效期、受击框、推挤 |
| `combat/Match.ts` | 唯一权威战斗状态、回合、tick、伤害/防御/相杀/事件 |
| `combat/FixedLoop.ts` | 60Hz accumulator，不直接改变动画数据 |
| `animation/Animator.ts` | 根据同一战斗age及metadata选择绘制帧，不决定命中 |
| `rendering/Renderer.ts` | Pixi图层、纹理、缩放、粒子、调试框，只读snapshot |
| `audio/AudioSystem.ts` | CombatEvent→声音；失败不阻断对战 |
| `ui/UI.ts`, `ui/styles.css` | 独立HUD/菜单读取快照，按钮发动作；血条过渡不影响生命值 |
| `debug/DebugView.ts` | 训练用状态/输入文本 |

## 固定帧循环

每RAF：delta=min(100ms, now−last)，未暂停时累加；以1000/60ms为步长，最多6 tick/RAF，然后render(delta/1000)。暂停清accumulator但仍render；恢复resetClock。渲染频率30/60/144Hz不能改变每秒60个战斗tick。性能不足时可落后，不能靠一次超大物理delta跳过招式有效帧。

## FSM与坐标

State = idle/walk/crouch/jump/attack/hit/block/down/win。x向右为正，y是**离地高度，向上为正**；screenY=455−y。世界左右边界65..895。

`tickFighter` **先age++**，再处理状态。新出招明确设置age=0，serial++，connected=false。因此绘制时的age就是刚执行碰撞时的age，不领先一帧。transition到不同状态重置age；离开attack清move。

hit/block：stun--，x+=vx，vx*=.85；stun结束回idle/jump。down：vx*.87，65帧后如果允许恢复且有血，回idle并12帧无敌。ending阶段不允许恢复。

行走前进=人物speed，后退×.72；跳跃水平input.x×3.7。攻击velocity只在有效期生效。重力vy−=.66，y+=vy；落地y=0，空中攻击结束。推挤后夹回边界。

## 每次Match.step的顺序（不可随意调换）

1. 清events；frame++；只有hitstop==0时commandFrame++。
2. 设置双方input，以commandFrame更新commands；**先录入，再判断Hitstop**。
3. hitstop>0则减1并return，冻结物理/FSM/clock，但缓冲不会白白过期。
4. intro/ending/result分支；fight阶段phaseAge++、非训练clock--。
5. 更新两方FSM，生成whiff/special/land事件，REN首有效帧生成投射物。
6. separate推挤；**收集两边contact，不立刻写伤害**。
7. 推进投射物并收集命中；提前计算全部guard结果。
8. 统一resolve：保证同帧相杀，不让先处理的P1天然占优。
9. 清已命中/过期投射物，判断KO/超时，训练回血或结束回合。

## 输入缓冲

- held控制方向；edge控制攻击/跳跃。每个tick结束清edge和一次性touch按钮。
- 方向数字：下后1、下2、下前3、后4、中立5、前6，按当前facing镜像。
- 方向变化才记history，保留24帧。
- 轻/重拳输入时逆向查序列2→3→6，20 commandFrame窗口；成功改为special并清history。
- action queue生存条件frame−记录frame≤6；special优先，consume清整个queue。
- 长Hitstop不能用真实frame计算queue寿命；这是本项目曾修过的关键bug。

## 招式参数摘要

启动为**纯无判定持续时长**，age0..startup−1无Hitbox；age==startup首有效。轻拳第5次step命中，age=4，不要把两种启动记法混用。

| Move | 启动/有效/恢复 | 基础伤害 | stun/blockstun/stop | 击退 | 局部Hitbox[x,y,w,h] | 取消窗口 |
|---|---|---|---|---|---|---|
| lp | 4/3/10 | 42 | 17/10/5 | 4 | [22,-146,75,32] | [4,13] |
| lk | 6/4/13 | 58 | 20/10/5 | 5 | [15,-125,111,38] | [6,16] |
| hp | 9/4/20 | 94 | 24/15/8 | 7 | [15,-149,98,43] | [9,19] |
| hk | 11/5/23 | 112 | 27/16/9 | 8 | [20,-145,126,45] | [11,21] |
| low | 7/4/18 | 65 | 17/10/5 | 4 | [15,-48,104,35] | [7,17] |
| air | 5/11/12 | 72 | 22/10/5 | 4 | [15,-95,112,56] | 无 |
| AVA special | 10/13/25 | 174 | 35/10/11 | 12 | [5,-146,149,110] | 无 |
| REN special | 14/1/28 | 145 | 29/10/10 | 9 | [30,-115,100,60]配置但不做近身框 | 无 |

AVA special有效期velocity6.5、launch=true；命中给目标vy5。REN projectile在age14生成，根偏移facing×65，screenY=455−y−100，vx=facing×8，命中矩形56×52，最多130tick或飞出−80..1040后清除。

## 判定框

局部box镜像：朝右x=f.x+b.x；朝左x=f.x−b.x−b.w；y=455−f.y+b.y。AABB使用严格 `<` / `>`，仅边缘接触不算重叠。

站立Hurtbox组：[-22,-182,44,47]、[-27,-137,54,74]、[-31,-63,62,63]。
蹲/low/下防：[-28,-100,56,54]、[-32,-46,64,46]。
攻击在startup−2到startup+active+4之间，追加延伸肢体受击框，精确公式见boxes.ts。
down/win或invulnerable>0返回空hurtBoxes。
推挤框[-27,-135,54,135]，重叠时各推一半，靠墙时另一方承担余量。

这些是按状态/招式阶段配置的矩形组，**不是每像素轮廓追踪，更不是KOF官方逆向框**。严格复现不重新拟合框；若要升级逐精灵帧判定，应单独立项而非改当前目标。

## 战斗与视觉计时

攻击动画按启动/有效/恢复段映射clip，而不是整条均匀播放；AVA显式timings，REN缺省38%/59%分界。命中时停顿从snapshot读，不能继续动画age。

FX的rainTime/dt是独立视觉时间；正常暂停仍可有雨和特效余波。为截图回归，应停止FixedLoop和Pixi ticker、设rainTime=0、去CSS动画，然后显式render，不要按随机超时截取帧差。

## CPU / 调试接口

CPU种子82917，LCG乘数1664525、增量1013904223，决策冷却9+floor(rand×14)。具体距离阈值及抽样顺序沿用CPU.ts，重排随机调用也会改变行为。

`?debug=1` 或开发模式暴露 `window.neon`：match、paused、start、setPause、tick、renderer、loop。正常生产URL不暴露。`window.__ready=true`标记图集/场景加载完成。测试脚本依赖这些接口，但不构成正常玩家操作。
