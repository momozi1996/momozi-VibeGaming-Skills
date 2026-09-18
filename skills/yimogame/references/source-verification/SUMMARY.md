# 复现包实际验证记录

日期：2026-09-18。对象：本包冻结的「伊莫·风栖原野」单人浏览器项目，**不是Steam原版完整MMO**。

## 实际方法

从 `yimo-note/assets/reference-project` 恢复到一个新临时工程，只从本包读取输入。使用 `vendor/npm-cache.tar.gz` 中的锁定缓存离线安装，未引用旧工程的node_modules。恢复工程、测试报告和截图均放在包外；验证完成后只将证据复制到本目录。

已实测环境：macOS arm64、Node25.8.1、npm11.11.0、Python3.9.6、Chrome153.0.8010.50、ANGLE Metal。浏览器和系统字体为本机已有软件，不在包中。

## 结果

| 项目 | 实测结果 | 证据 |
|---|---|---|
| 原项目保持不变 | 全部66个冻结文件SHA-256一致 | `original-intact.txt` |
| 全新exact恢复 | 恢复后66/66字节一致；工具自测也独立复验 | `toolkit-selftest.json` |
| 离线依赖 | 缓存69个锁定tarball；当前平台npm ci --offline安装19个包成功 | `offline-install.log`、`cache-build.log`、`../vendor/npm-cache-index.json` |
| 原有玩法回归 | 11项状态 + 25项开发浏览器 + 12项生产/模拟触屏 = 48项通过；build通过 | `fresh-check-report.json` |
| 重复画面采集 | 8个固定镜头连续采集两次，同环境每图MAE=0、全部像素一致 | `repeat-capture-diff.json`、`../assets/golden/` |
| 角色备份 | 5个真实GLB头/大小/mesh检查通过；没有skin或动画clip | `glb-check.json` |
| 工具自测 | 8项通过：校验、恢复、拒绝覆盖/包内输出、篡改/额外源码检测、空src重写起点、PNG正反例 | `toolkit-selftest.json` |
| 不用npm启动成品 | Python HTTP服务打开冻结dist；真实WASD、捕捉、Q联结、图鉴正常；外部请求被明确阻止时仍通过6项检查 | `zero-network-smoke.json`、`zero-network-smoke.png` |
| 执行工具后源文件 | 44个非reports/dist参考文件仍字节一致 | `restored-source-intact.txt` |
| Skill格式 | 官方skill-creator quick_validate通过 | 本轮直接执行；不是游戏功能证据 |

零网络检查采用浏览器请求路由：只允许当次127.0.0.1本地服务，所有外部URL一律abort。实际没有尝试外部请求。这不是操作系统断网认证；测试装置需要已安装的Playwright/Chrome，但被测成品服务只依赖Python。

`offline-install.log`来自同一恢复目录使用已解压的包内缓存再次执行npm ci --offline的成功输出。首次安装同样离线成功。缓存覆盖Windows/Linux等optional依赖不等于这些平台已经实测。

## 保留真实失败，不掩盖竞态

首次生产检查在按Q后**立即读DOM**，偶发早于下一渲染帧，导致“联结形态”断言失败。记录保留在 `first-run-hud-race.json`。

仅修改复现工具生成的临时测试启动器：按Q后等待原HUD字段变成“联结形态”，再执行原断言。未删除断言，未改变游戏源码，未改冻结原测试文件。修正后完整回归通过；`fresh-check-report.json`记录了这个测试适配。

## 结论及不能声称的内容

- **exact**：提供了全量源码、运行资产生成器、锁文件、离线依赖与dist，已实证可独立恢复参考项目并逐文件验真。
- **画面**：只证明本轮同环境、固定时间/状态的8张图可逐像素重复；不是所有设备或任意时刻画面100%一致。
- **rebuild**：已提供详尽规格、源代码可查的重写提示词和验收条件；没有做独立模型的盲重写评测，不能保证任意模型一次重写达到95%—100%。
- 未实测Windows/Linux、物理手机、所有GPU/字体/浏览器、长时间压力、所有地形角落、真实听感。Chrome模拟触屏不能替代真机性能测试。
- 原型没有真实多人服务端、战斗、可进入的都市；包不会凭空补出这些内容。

重新使用本包时，请把新报告放在包外，重新执行验收；这里的报告只证明作者这一次运行，不可充作接收者的执行结果。
