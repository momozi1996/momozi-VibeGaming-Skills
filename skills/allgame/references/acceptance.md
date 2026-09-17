# 分层验收：不要混淆包、起点和新游戏

## A. 包自身

`python3 "<SKILL>/scripts/game.py" verify`核对全包SHA；`scripts/selftest.py`检查恢复、主题和防覆盖。它们证明资料完整，不证明游戏在当前GPU运行，也不是模型独立创作能力测试。

## B. 原版或只改外观

```bash
node "<SKILL>/scripts/check.mjs" --family racing --project "<OUTPUT>" --out "<REPORT>"
# adventure同样；只跑核心用--suite core，只跑核心+生产用--suite production
```

前提OUTPUT npm ci。report必须是技能与项目之外的新目录。

- racing all：public/tests/依赖核验→16单元→build→开发浏览器13组→生产浏览器13组；只要一阶段失败即非通过。
- adventure all：15单元/build/58资产与pins→试玩18组→边界9组→生产6组。
- 以上是基线契约的预期项目数，不是未执行时可以填写的成绩。新功能不会因为这些旧检查通过就自动被验证。
- wrapper只启动/关闭自己的服务器，严格端口；冒险默认4383/4384可改，赛车自动选空闲端口。Chromium需要支持WebGL2；macOS默认ANGLE Metal，其他平台default；可传--angle。
- macOS默认后端曾只有约7–10FPS，游戏dt封顶导致固定一秒移动断言失败。先记录GPU/负载，尝试Metal和串行测试，不删距离断言或伪改state使其通过。
- 浏览器夹具会显式设置道具/传送/加速时间以缩短测试；报告这种范围，不把它说成数小时真人步行/驾驶。

exact比较 `game.py compare --family ... --project ... --exact`。合法变体用diff记录差异；不要要求新玩法源码hash等于旧版，也别重签技能输入来接受污染。

## C. 任意游戏通用冒烟

```bash
# 已有本地HTTP服务；可加--start '开始按钮的CSS选择器'执行真实点击
node "<SKILL>/scripts/probe.mjs" --project "<OUTPUT>" --url http://127.0.0.1:4301 \
  --out "<PROBE_REPORT>" --canvas canvas
```

probe不依赖__game/__northshire，只找可见canvas，抓错误/失败请求/HTTP错误、初始/点击后截图、画布尺寸与viewport。`--mobile`模拟390×844触屏，`--canvas`与`--start`可适配新工程；CHROME_PATH可指定浏览器。它不启动服务器，也不会自动判断加载完成/世界已渲染，只等待固定观察窗口；晚加载/错误后出现的画面需重新观察。

**visible canvas不等于非白屏，不等于可玩。** 页面可能是空canvas、显示错误UI或只有菜单，需实际看截图并按下一层验证。外部URL与横向溢出是报告观察项，不普遍认为每个游戏都禁止它；本地运行资产项目应自行检查无热链。

## D. 改了玩法/地图/存档后的新测试

先建立“需求→规则→入口→断言→证据”表。旧基线断言留在技能不动，在输出追加新测试；不适用项写原因与等价替代。比如新地图不能沿用旧NPC坐标，改坐标是正确夹具迁移，删碰撞/任务断言不是。

最低覆盖：
1. 真输入导致位移/转向/动作；取消/失焦释放；对角速度一致。
2. 世界限制：碰撞/可达路径/重生；角色不会穿关键地标或掉无穷深。
3. 主循环：目标可开始、推进、合法完成、奖励一次；有失败条件则覆盖失败与恢复。
4. 暂停冻结正确的时间；摄影还能转相机；重开清计时/对象/粒子/input。
5. 新持久化：刷新继续、损坏数据、版本/命名空间、删除确认与beforeunload。
6. UI来源于实际state；看背包/任务/结果而非仅看HUD。
7. 真实PNG等导出；正常流程无未解释错误/404；故障注入缺资产有错误门禁。
8. 生产运行及调试边界；不能只构建成功却未打开dist。

## E. 视觉与性能

截图环境记录browser/OS/GPU/DPR/viewport/画质/相机/状态/动画。exact可对受控golden，variant按新设计审查，不能用旧主题像素阈值限制创作。看菜单主角、近远景、核心交互、地图、结果、手机；不遮盖失败区域或缩小截图作弊。

测性能用真实rAF墙钟和设备，不用固定时间夹具的FPS。不隐藏大bundle警告或以调高阈值假装优化。没有真机、真人音频、长时压力测试就标未验证；Chrome模拟手机不等于所有手机通过。

最终报告区分继承/新增、自动/人工、已跑/未跑、失败/预期故障。旧日期的docs与tests日志都是历史参考。
