# yimoGame 纳入交付记录

日期：2026-09-18。范围：将用户提供的 yimo-note 封装纳入 game-skill-packages；不全局安装、不提交git、不远程发布。

## 本轮交付

- `skills/yimogame/`：一个独立skill，134个受清单校验的文件，另附MANIFEST本身。显示名yimoGame，调用ID为`yimogame`。
- `yimoGame.zip`：171,266,327字节，约163.3MiB；同名`.sha256`校验文件。
- `yimoGame-使用说明.md`、本记录、`yimoGame-实机预览.jpg`；主`使用说明.md`已更新为8包总目录。
- `playable-games/yimogame/`：实际从ZIP移位解压后的skill恢复的完整工程，加包外的独立`start.py`便利入口。源码与成品不依赖yimo-note。
- `verification/yimogame/`：本轮真实日志、截图、报告、恢复工程和完整性审计；不包含在ZIP。

## 保留与适配

保留来源快照66文件（含源码、成品、许可、原项目文档/研究材料）、完整程序化场景角色、静态GLB、golden和离线缓存。没有降级重写游戏或替换画面。原测试断言保持不变。

适配技能入口、元信息和调用路径；新增换场景/角色创作指南；增加`play --out --port`一条命令恢复并启动成品；增加非空、符号链接输出、路径重叠和端口保护。原包验证记录移至`references/source-verification`并注明历史性质。

工具自测首次发现macOS临时目录的系统符号链接会被过严规则拒绝，已修正为拒绝输出自身符号链接、解析祖先后检查是否重叠技能目录；重新自测11项通过。未为修正工具修改任何冻结游戏源码。

## 实际执行结果

| 项目 | 结果 / 证据 |
|---|---|
| Skill格式 | quick_validate通过 |
| 全包完整性 | reproduce verify：134文件及66文件快照通过 |
| ZIP独立性 | 在系统临时新目录解压，只有一个SKILL.md，所有135文件与源skill逐字节一致 |
| 一命令出游戏 | 从移位后的skill运行play，恢复完整项目并成功服务dist |
| 原样工程 | 恢复时compare --all：66/66字节相同；另一个持久试玩工程也为66/66 |
| 离线开发依赖 | 新工程执行默认离线install，macOS arm64成功安装19个当前平台依赖，见offline-install.log |
| 构建与玩法 | 11项状态单测 + 25项开发浏览器 + 12项生产/模拟触屏，48/48通过；见check/check-report.json及check.log |
| 零外网成品试玩 | 阻断全部非本站HTTP，在原封dist上真实键盘移动、首次捕捉、Q联结、图鉴、地图、刷新读档，10/10通过；无DEV接口、无存档注入、无外部请求、无JS/HTTP错误 |
| 实机画面 | 已查看bundled-smoke/01-bundled-field.png，主角、花草、风门、河流、树冠、远城和HUD完整；JPEG预览来自此新截图 |
| 原素材与旧包不变 | 输入基线146个文件哈希一致，包含整个原yimo-note及之前7组ZIP/校验文件，见delivery-audit.json |

生产与移动端截图在`verification/yimogame/check/reports/`；成品无外网测试在`bundled-smoke/report.json`。开发测试中的部分远处目标/门使用原DEV定位，不宣称所有路线人工走完。触屏是Chrome模拟，不是实体手机认证。本次没有重跑8张固定时间像素差异测试，不把源码一致或截图目测表述成跨设备像素一致。

环境：macOS arm64 / Apple M3，Node25.8.1，npm11.11.0，系统Chrome、ANGLE Metal。其他OS/浏览器/GPU未实机覆盖。

## 试玩 / 重开

本轮启动： http://127.0.0.1:4493/ （本机服务，非公开网站）。服务退出后，在game-skill-packages目录运行：

```bash
python3 playable-games/yimogame/start.py --port 4493
```

原4492的四款2D试玩服务和入口不修改。yimogame需要以dist为站点根，不直接作为其子路径挂载。

## 完整的边界

本包完整复刻的是来源中的单人浏览器探索原型，非官方完整MMO。换主题提供完整工程起点和具体创作路线，仍需Agent实际修改并重新构建，不虚构海岛等预设已经存在。公开/商用前确认品牌、用户源代码与第三方研究材料权利。
