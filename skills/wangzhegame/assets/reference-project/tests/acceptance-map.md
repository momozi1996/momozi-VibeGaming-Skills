# 需求 → 验收入口

| 需求 / 规则 | 入口 | 断言 / 证据 |
|---|---|---|
| 先计划 | PLAN.md | 创建顺序先于 src 实现 |
| 5 英雄 | rules roster, browser hero-card | 原始 stats 相等、引擎内点击选人 |
| 真实移动单位 | rules movement | 盖伦 340 单位/秒，轴向/对角向相等 |
| 共享障碍 | rules routing | A* 输出路径点可行走；不是原版地图网格验证 |
| 普攻/伤害 | rules mitigation / bounty | 抗性减伤、击杀奖励一次 |
| 20 主动分支 | rules ability branches | 训练等级、合法目标与资源下可触发；不声明完整伤害公式精确 |
| 兵线 | rules waves / browser army | 首波 65 秒，间隔 30 秒，三路单位出现 |
| 商店 | rules buy / browser real click | 扣钱、加属性、余额不足和离泉水拒绝 |
| 复活 | rules death / browser death fixture | 一次奖励、倒计时、恢复存活 |
| 建筑保护 | rules chain | 受保护枢纽不掉血，摧毁保护后进入结算 |
| 闭环 | browser victory fixture + natural-match | 重开清空库存、金币与波次；未修改伤害的闲置玩家模拟最终自然败北 |
| 暂停/失焦 | rules pause / browser Escape+blur | 时间和冷却冻结、释放输入 |
| 引擎内 UI | browser DOM inventory | 一个 canvas；零 button/input/div 等 DOM UI |
| 正常生产运行 | production.mjs | dist 开始/商店/暂停，无 JS/HTTP 错误，开发 API 不存在 |
| 资源失败门禁 | fault.mjs | 阻断 Garen.png，启动终止，显示原生画布错误帧 |
| 性能 | browser rAF sample | 真实短时 rAF 墙钟样本，不用模拟 dt 伪造 FPS |
| 精确原版地图/真实模型尺寸/画质 | FIDELITY.md | **未通过，不以当前截图冒充原版对齐验收** |

当前无持久化功能，因此没有伪造存档恢复测试。当前仅桌面目标，不宣称移动端验收通过。

## v0.1.1 键鼠操作修复
- `tests/controls.test.js`：方向映射、相反方向抵消、340 单位/秒、斜向归一化、松键停止、回城/冥想取消、控制/碰撞/暂停/死亡限制。
- `tests/controls-browser.mjs`：114 项真实键盘/鼠标/原生 UI 操作断言；首项 W 使用真实出生点，其余部分使用明确的隔离夹具；不以注入状态代替输入。
- `tests/controls-production.mjs`：17 项实际生产构建断言，无游戏状态注入。仅旁观 Canvas 文字绘制位置，以玩家名称标签的屏幕位移证实键鼠移动。
- WASD 模式热键与经典 QWER 模式有意不同；旧回归将物理 KeyQ/KeyE 替换为默认模式的 Digit1/Digit3，原有冷却/伤害/位移断言仍保留。
