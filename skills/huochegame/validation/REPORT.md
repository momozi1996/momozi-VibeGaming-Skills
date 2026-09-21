# 本复现包的本轮验证

日期：2026-09-21。环境：macOS、Chrome 153.0.8010.50、Node.js v25.8.1、Python3。本报告验证复现包与恢复工具，**没有宣称已经用用户自己的模型完成一次独立重写**。

## 通过

1. Skill frontmatter / 命名 / 结构校验通过：`skill-validation.txt`。
2. Python工具7项自测通过：输入校验、完整原样恢复、重新build仍字节相同、拒绝非空目录、拒绝改坏源码、重建起点不带游戏实现、禁止写进参考目录。见`pack-selftest.json`。
3. 原样恢复的新目录重新跑 **17/17 主流程 + 7/7 边界，共24/24**。不是复制原版历史报告；见本目录summary/report/edge-report和两个日志。
4. 参考项目和恢复项目同机各拍6张固定状态图片，6/6 RGB MAE=0、像素差=0。见`exact-visual-diff.json`。这证明本拍摄管线在此环境可重复，不保证不同GPU/操作系统或模型重写结果为0。
5. 图片差分负例：主动改变候选PNG一个像素，`--max-mae 0`非零退出，判定失败符合预期。见`diff-negative-test.json`。
6. 独立Skill目录移到另一临时路径（不复制node_modules），verify/restore/compare/build后compare全部通过。见`relocation-test.json`。
7. 新增工具JS语法检查通过；本包文档相对链接检查通过。完整源码/原版截图已用SHA清单钉住。
8. 已实际查看固定状态桥段、手机工坊图；原版关键画面在原制作阶段也已看过。本次新增canonical共6张，加原版截图10张，gallery可直接浏览。

## 调试记录（不掩盖失败）

第一次隔离测试包装器指向Playwright的CommonJS入口，named chromium import失败；已经改为锁定包的index.mjs ES module入口，重新执行完整24项成功。只调整依赖路径、file URL、平台Chrome参数，没有删除或弱化断言。

## 未验证 / 非承诺

- 用户的另一个模型能否按rebuild提示词完成全部重写，需要之后实际执行；本包没有把exact恢复当成模型独立编码能力证明。
- 未在Windows/Linux实体机、iPhone/Android真机、Safari/Firefox进行本轮全面验证。工具有可移植路径/平台处理，不能称所有平台已通过。
- 包不包含浏览器本体或node_modules；首次装测试依赖需网络/缓存。成品游戏、Python校验/恢复离线可用。
- 短时间无头rAF测量只描述本机运行，非所有设备帧率承诺。音效不以自动化测试代替听感验收。
- 17+7并非穷尽所有游戏边界；本Skill保留原版轻量物理、工坊抽象、乘客表现等限制。
