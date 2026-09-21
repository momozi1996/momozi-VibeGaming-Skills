# 验收矩阵与证据解释

## 推荐命令

```sh
python3 "<SKILL>/scripts/check.py" --project "<OUTPUT>" --out "<NEW_REPORT>" --suite all
```

前置：新输出已npm ci，完成源码，输出目录不在skill内，报告路径不存在且不在project/skill内。

| suite | 实际执行 |
|---|---|
| rules | npm test + npm run build；不证明浏览器可玩 |
| core（默认） | rules + 开发键鼠/生产键鼠/流程浏览器/生产冒烟/故障注入 |
| all | core + soak + natural-match |

## 逐项门禁

| 测试 | 基线结果 / 范围 | 注意 |
|---|---|---|
| npm test | 25项规则+控制单测 | 属性/成长/距离/寻路/波次/技能/购买/建筑/复活/输入 |
| controls-browser.mjs | 114项键盘、鼠标和原生按钮 | 第一W从真实出生；后续部分有明确位置/HP/CD夹具 |
| controls-production.mjs | 17项实际dist输入断言 | 无__RIFT、无游戏状态修改，仅旁观Canvas fillText位置 |
| browser.mjs | 14项完整流程断言 | 真实选人/开始/点击/购买/热键；战斗/死亡/胜利用显式fixture |
| production.mjs | dist菜单/开始/商店/暂停截图、正常错误为空 | 无开发API、1canvas、报告HTML控件数 |
| fault.mjs | 拦截Garen.png，启动门禁与错误帧 | 预期资源错误，不计入“正常无错误” |
| soak.mjs | 300模拟秒，状态数值有限 | 加速纯模拟，不是5分钟真实墙钟浏览器 |
| natural-match.mjs | ≤1800模拟秒内自然终局 | 玩家idle，无瞬移/改伤害/加钱；runner额外断言ended/winner有效 |
| npm run build | 正常产出dist | >500KB Three chunk警告仍保留 |

任何失败都保留日志并非零退出。不得删断言/阉割feature、给__RIFT伪状态、硬写PASS报告或更改冻结hash。测试计数只描述基线集合，并非覆盖所有边界或原版精确度证明。

## 新runner如何避免测到旧游戏

1. 用OUTPUT本地依赖执行npm test/build。
2. 创建OUTPUT内临时 `.reproducer-check-*`，拷贝当前src/public与原测试；不带旧artifacts。测试从父目录解析OUTPUT锁定的Playwright。
3. 自己启动Vite dev/preview，用动态空闲端口+strictPort，并确认自己的进程存活；不连4411/4412上的旧服务。
4. 临时测试副本**只改**硬编码URL、chromium.launch配置，断言/操作/fixture不改。summary记录原/副本SHA与修改说明；副本保存在report/test-harness用于审计。
5. 在临时目录运行，所有artifacts全新生成，再拷到新报告；自动清理本次临时目录，只停自己的服务。
6. summary保存环境、命令、退出码、时长、源hash、浏览器配置；失败也输出，不把无报告看成通过。

测试副本和summary里绝对路径/临时端口是**这一次测试证据**，不是其他电脑运行依赖。重跑使用check.py自动生成新路径，不直接执行已保存的test-harness连过期端口。

## 视觉与手动复核

查看本轮至少：menu、spawn/production-movement、shop、pause、combat、victory。核对单canvas、文字/图标清晰、五英雄可区分、塔/兵有深度与阴影、道路/河流正确、商店布局不穿透、技能有冷却/效果。

还要在真实页面从出生点按W/S/A/D与四箭头、左右键点击：观察英雄标签/角色在世界移动；释放/切窗口/暂停后不粘键。不能用移动相机、写player坐标、静态截图替代输入链。

performance是browser.mjs短rAF样本（median/p95、GPU字符串），没有硬性跨硬件60FPS保证；不能将“动态计时数字显示60”当性能证据。

## 版本与完整性

exact：恢复后compare --all，重建后compare默认；同一源码/素材是硬门禁。rebuild：源码不同预期，不以compare全部通过为目标，但素材/测试/依赖仍应保留且不改原断言。

本包原 `artifacts/verification-summary.json` 可查看v0.1.1修复记录。原before-fix和旧自然报告只做历史档案。本次打包后新结果在外层validation目录；其他模型复现仍必须再跑，不用本次结果冒充它的新结果。
