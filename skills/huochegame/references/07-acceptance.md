# 07 · 验收方法、接口与证据

## 五层证据

1. 包校验：完整输入SHA-256无损。
2. exact：恢复后的所有清单文件相同；这不等于当前机器GPU运行正常。
3. 功能：在候选上重新运行17+7项；以本轮报告为准，不沿用历史通过数。
4. 视觉：原版和候选在同环境固定状态对比，并实际查看图片。
5. 运行：断网file://、正常输入、窗口缩放、无运行错误；手机仍需实机补测。

## 24项原版断言

| 主流程17项 | 意义 |
|---|---|
| 离线初始 | ready、无外链/异常、场景存在 |
| W/松开/S | 真位移、惯性、制动 |
| 行驶开门 | 拒绝非法操作 |
| pause | 距离/时间不动、输入清空 |
| 相机 | 方向键与V真改变state |
| Saltlight→Mango | 控制器沿整段积分，无传送，平稳到站 |
| doors/reward | +123首次、不能重复、实际门状态/14人返程 |
| Mango→Saltlight | 整段积分、回起站、第二次连胜 |
| 颠簸高速 | comfort<56、emergency、无小费 |
| restart | 初始位移/人数/舒适度恢复，保留钱 |
| workshop | 顺序/锁定/真实装饰/驶出 |
| persistence | reload保留钱与完整改装 |
| blur | 清输入并暂停 |
| 坏存档 | 安全回退 |
| 手机指针 | 390宽不溢出，长按移动、释放 |
| 手机工坊 | 完整改装能操作 |
| browser errors | 无未解释异常/外链 |

边界7项：真实CDP touch hold/end/cancel；双指踩踏板并移出释放；844↔360↔768↔1920视口切换；工坊往返不发钱；拒绝localStorage仍可玩；offline正式文件无debug且可驾驶/rAF测量；本轮边界异常为空。

## 测试适配契约（仅?test）

原版提供 `window.__cloudline`：

- `state`：可读写真实状态，不是UI快照伪数据。
- `input`：真实power/brake/left/right布尔值。
- `stations`：两个含s/index/name的站；`trackLength`。
- `frame(distance)`：返回含p/t/r/n/u的真实Three向量。
- `simulate(dt)`：正常物理状态机的同一函数，不能在测试中特殊“自动成功”。
- `updateUI()`、`snapshot()`：真实state投影/可JSON克隆状态。
- `step(seconds)`：按1/60调用simulate，然后同步present/UI。`step(0)`不积分但刷新呈现。
- `renderer`、`tram`、`workTram`，其中车体对象有 `root`, `decor`, `roof`；用于检查真实几何。
- `setDistance(d)`, `save()`原版附带，可参考但正常路程测试不用传送。

正常URL没有该接口。rebuild可重组内部架构，但需薄适配读取同一真实对象。保留shell的id是最简单兼容法；若改变，用清晰映射调整测试定位，并保留所有语义断言，另记差异。

## 自动运行

```sh
# 在输出项目的tooling目录安装测试工具，不修改skill
cd "$OUTPUT/tooling"
npm ci
cd "$OUTPUT"
node "$SKILL/scripts/run-checks.mjs" --project /path/to/candidate --out /path/to/new-report
```

run-checks会复制原版测试到报告内的隔离project，只使用候选`cloudline.html`作为执行对象；自动调整测试import、file URL与Chrome平台参数，**不改断言**。测试进程失败/超时会非零退出并保存日志。报告目录必须新的，不覆盖输入。

原版报告位于assets/reference-project/tests，属于制作原游戏时的历史记录；本工具报告位于你指定的新目录。

## 固定帧与图片差分

```sh
# 先另行create一个未修改的REF输出，并在REF/tooling装依赖
node "$SKILL/scripts/capture.mjs" --project "$REF" --out /tmp/ref-shots
node "$SKILL/scripts/capture.mjs" --project /path/to/candidate --out /tmp/new-shots
node "$SKILL/scripts/image-diff.mjs" --project "$OUTPUT" --reference /tmp/ref-shots --candidate /tmp/new-shots --out /tmp/diff
```

capture使用显式?test夹具：设置真实游戏状态、暂停simulation、让相机收敛；拍ready、bridge、Mango dock、completed workshop和两个mobile画面。它不是功能通过证明。fixed time=0或指定值、DPR=1、same platform/Chrome是对比前提。

基线历史10张截图包含真实运行时的非确定时刻，可用于美术目标；`assets/canonical`是上游封装时的固定状态截图。不要拿不同时间的移动视角直接做零像素差验收。

image-diff输出RGB平均误差、最大差、超过阈值像素比例与亮差分图；默认只报告，不决定视觉通过。`--max-mae 0`可用来验证同机exact固定帧完全相同，不应用到未匹配字体/GPU的跨平台画面。

## 人工必看

- 初始：车体足够大，轨道引向远岛，欢迎卡不遮核心操作。
- 桥段：上下坡可见、桥墩不穿车、远景不空白。
- Mango：站台、人、居民村和灯塔，门实际移动。
- 工坊：电车/棚在左而UI在右；装饰变化真实可见，移动端上画面下操作。
- 三种视角、完整去回、夜色都能读清路线。
- 不以无控制台报错证明没有黑屏；不以一个golden首屏证明全局1:1。
