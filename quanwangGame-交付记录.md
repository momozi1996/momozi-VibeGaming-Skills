# quanwangGame 纳入交付记录

日期：2026-09-18。范围：将quanwang-note封装为单个独立skill，更新到game-skill-packages；没有额外全局安装、git提交或远程发布。

## 交付

- `skills/quanwanggame/`：完整skill，显示名quanwangGame，调用ID`quanwanggame`。
- `quanwangGame.zip`：173,200,783字节，约165.2MiB；另附同名SHA-256。
- 265个文件（264个受全包清单校验，外加清单本身），只有一个SKILL.md；全部工程、已处理素材、原始素材、授权、成品、离线依赖、创作说明包含在一个包中。
- `quanwangGame-使用说明.md`、本记录、实机预览；总`使用说明.md`已更新为9个独立包。
- `playable-games/quanwanggame/`：从独立解压的skill通过play命令恢复的完整工程，本机试玩4496。
- `verification/quanwanggame/`：新验证记录，不打入skill ZIP。原有试玩页和八个ZIP不修改。

## 封装变化

原quanwang-note包含外层README/prompts与内层quanwang-reproduce。此次把外层提示词整合到新skill内部，修正引用路径，重写简洁创作入口，加入agents元信息、完整包清单、一键create/play工具和同类场景/角色改造指南。

冻结项目122文件、原生精灵PNG/JSON、原始GIF/ZIP、背景与音效、原baseline、85份npm tarball和项目清单保持原字节，不另写低配替代品。只在工具层补充输出符号链接检查和安装目录真实路径/重叠检查；未更改原玩法、美术或测试断言。

## 本轮真实验证

| 项目 | 结果 / 证据 |
|---|---|
| 源包校验 | 原VERIFY-PACKAGE.py：282文件通过 |
| Skill格式 | quick_validate通过 |
| 新包完整性 | game.py verify：264清单文件通过 |
| 安全恢复工具 | 7项通过：完整生成、拒绝已有目录、拒绝包内路径、拒绝悬空输出链接、拒绝链接祖先绕入包、无效端口、源码篡改检出；tool-safety.json |
| ZIP移位 | 系统临时新路径解压，所有265文件与skill源目录逐字节一致，只有一个SKILL.md；delivery-audit.json |
| 独立生成 | 从解压包恢复验证工程及持久试玩工程，均122/122文件哈希一致；exact-restore.json / playable-compare.json |
| 离线依赖 | 85份tarball校验后，macOS arm64离线安装36个适用包；offline-install.log |
| 构建与玩法 | 29单测 + 15玩法 + 8生产/尺寸检查，52/52通过；full-checks.log、project/evidence中的新报告 |
| 构建后一致性 | core 78/78、dist 43/43与冻结基线一致；core-after-build.json / dist-after-build.json |
| 同环境固定截图 | 原封dist生成7张固定画面，7/7比较通过，RGB MAE均0；captures / visual-diff/report.json |
| 读图检查 | 实际查看选人和AVA必杀新截图，原生角色、街景、街机布局、HUD与动作完整；预览JPEG由这两张拼合 |
| 原输入与旧包 | 299份输入哈希保持一致，覆盖原quanwang-note及此前8组ZIP/校验文件；input-baseline.json / delivery-audit.json |

生产检查包含阻断非本站请求；玩法记录无外部运行请求、无页面JS错误。服务器日志出现浏览器自动请求`/favicon.ico`的404，原包未提供该图标，不影响游戏资源和玩法；为保持原样复刻未修改冻结源码，也不将其隐藏表述为服务器绝无404。

运行环境：macOS arm64、Node25.8.1、npm11.11.0、系统Chrome；版本详情见原环境及本轮captures/capture.json。没有实测其他OS、实体手机或所有键盘/显卡组合。

## 证据的边界

- 固定截图使用debug接口冻结时间并摆放状态，是画面夹具，不是自然通关或真实性能测量；MAE0只适用于本轮同环境，不承诺跨字体/GPU相同。
- 原玩法检查包含真实键盘/菜单输入，也使用debug定位和设置末回合状态验证结果分支；不是完整人工打满所有回合。
- 移动布局和触控按钮测试在桌面Chrome模拟，其中按钮用指针操作，不是实体手机多指认证。
- 两角色完整Demo，不是官方拳皇、联网回滚或3v3。换主题指南不等于预先完成所有主题；代码和依赖许可证不得被素材CC0一概替代。

## 试玩和触发

本轮启动本机服务：**http://127.0.0.1:4496/**。停止后在game-skill-packages目录运行：

```bash
python3 playable-games/quanwanggame/start-demo.py --port 4496 --no-open
```

安装完整skill后，在聊天中输入：

```text
使用 $quanwanggame，在新目录完整复刻霓虹对决，保留街机画面、角色动画和全部格斗玩法，直接生成并启动让我玩。
```
