# 冻结与公开发布流程

当前版本：`2026.09.21-rc4`。可以建立经过校验的**私有候选快照**；尚未具备“整仓公开开源正式发布”的条件。详见 [审查结论](FREEZE-REVIEW.md) 和 [权利清单](RIGHTS.md)。

## 1. 先区分三件事

- **文件冻结**：内容有清单/哈希，能重查；不代表Git已提交/打tag。
- **可运行分发**：一个skill资源完整、命令可执行；不代表所有机器/模型均已测。
- **公开开源发布**：还要明确许可证、第三方分发权、隐私、大文件和干净历史。当前未满足。

本次未进行git暂存/提交、tag、LFS初始化/迁移、强推、远程上传或为权利人选择许可证。

## 2. 检查并锁定私有候选

在本仓库根运行：

```bash
python3 scripts/audit_packages.py
python3 -B scripts/test_release_tools.py
# 只有维护者审查完所有差异、确认要建立新的候选时才执行：
python3 scripts/audit_packages.py --write-lock
python3 scripts/audit_packages.py --check-lock
```

`packages.json`固定12包的ID、大小及ZIP SHA-256；`release-manifest.json`记录发行集每个文件的大小及SHA-256，自身不递归纳入。不是数字签名。改一个文件就必须显示差异，不能为了变绿直接重写所有校验。

各skill还有自己的清单：只改根文档不应改游戏包。修改skill时须先生成并校验新的skill manifest，再重打相应ZIP、更新sidecar和packages.json，说明版本与内容差异。

## 3. 导出不带垃圾和Git历史的目录

```bash
python3 scripts/export_release.py --out ../game-skill-packages-2026.09.21-rc4
# 再在导出目录执行
python3 scripts/audit_packages.py --check-lock
```

输出必须是包外尚不存在的目录。保留十二个完整ZIP、完整skill、根文档、脚本、CI、预览与清单；**不复制`.git`、verification、playable-games、node_modules和临时文件**。不使用`git archive`或`git ls-files`来推断当前发行集，避免丢掉新文件/被内层.gitignore忽略的必需dist。

干净导出约1.03GB（十进制），是完整skill与其ZIP同时保留的有意重复；用户只需取一个ZIP。体积大不等于还有依赖垃圾。导出不会自动脱敏或改变有争议资产，故仍是私有候选。

## 4. Git历史：不能只加.gitignore就算清干净

2026-09-21复核时Git索引跟踪51,857路径，其中48,107在node_modules，50,316在verification（后两项有重叠）；本机verification约1.65GB。新的`.gitignore`对**已跟踪文件/历史提交不生效**。

推荐在公开权利/隐私问题处理完后，使用上面的干净导出建立一个**新的发布仓库**，保留原仓库做私有备份。这样不改写用户旧历史，也不把旧日志/依赖带到公开仓库。

如果必须保留原历史，由维护者先备份，再评估 `git filter-repo` 等清理方案并协调所有协作者。只执行`git rm --cached`只能改变后续快照，旧提交还在；不要在没有批准时强推或自动重写。当前未执行这些动作。

`skills/maomao3dgame.zip`旧文件与根`maomao3Dgame.zip`哈希不同，已移动到本地`verification/legacy-archives/`保留；旧Git索引仍会显示原路径删除，需由维护者最终提交确认。

## 5. GitHub大文件与LFS

当前三份文件超过普通Git的100MiB限制：

| 文件 | 字节 |
|---|---:|
| `quanwangGame.zip` | 173,200,783 |
| `yimoGame.zip` | 171,266,327 |
| `skills/yimogame/vendor/npm-cache.tar.gz` | 140,602,813 |

GitHub官方说明：普通Git超过50MiB警告，超过100MiB阻止；GitHub Releases附件和Git LFS是不同分发机制。

- [官方大文件说明](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [官方README说明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [官方许可证说明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

本次已配置`.gitattributes`，将上述三个路径声明为LFS对象，并关闭文本换行转换以保护冻结字节。**配置不是已经上传LFS实体**，需要维护者确认LFS额度和使用方式；不要把缓存删掉后仍称独立离线大包。

推荐公开渠道：Git保存经授权/脱敏后的完整源码（大缓存用LFS），十二份ZIP＋SHA-256作为Release附件，下载者不用克隆所有包。若选择不在Git保留ZIP，须同时调整清单、校验/CI流程与README下载链接并建立新候选；不要只删文件。

### 在干净新仓库中正确暂存（授权后手动执行）

先安装Git LFS。在新目录中初始化仓库，再运行 `git lfs install --local`。注意skill内部历史`.gitignore`可能忽略dist或source-cache，不能靠普通`git add .`判断内容完整。

可将**已经审核的发行清单**转换为pathspec，再显式暂存，避免被嵌套忽略规则遗漏：

```bash
# 在导出的新目录；不在旧仓库自动执行
python3 -c 'import json; print("\n".join(list(json.load(open("release-manifest.json"))["files"])+["release-manifest.json"]))' > ../reviewed-release-paths.txt
# 先人工检查清单，确认未包含私密数据，再执行：
git add -f --pathspec-from-file=../reviewed-release-paths.txt
git lfs ls-files
git diff --cached --stat
```

`-f`仅用于已审核的精确清单，不要无差别`git add -f .`。确认LFS属性实际生效、普通Git没有大二进制、所有必需文件都已暂存后，再由维护者提交、打tag和发布。

## 6. 正式发布门槛

- [ ] 自有代码/美术/skill层版权人及许可证确认，LICENSE/README更新。
- [ ] 商业游戏研究图、品牌、设定的分发权限确认，或做独立公开版替换并重建基线。
- [ ] 历史机器路径、原始日志与研究页面中可能的身份信息完成公开检查。
- [ ] 完成依赖漏洞/许可证告知复核；当前只有锁文件/完整性检查，不是完整安全认证。
- [ ] 干净Git历史、LFS实体和所有必需dist/source-cache可从新克隆恢复。
- [ ] CI在真实远端运行通过（本次只本地校验，不伪造徽章）。
- [ ] 在全新环境下载一个Release ZIP，单包安装、触发、生成、启动成功。
- [ ] 十二包目录表、版本、ZIP哈希、许可、限制与变更记录一致。
- [ ] 将仓库状态从私有候选改为实际公开发行，建立真实Release链接和维护/安全联系渠道。

CI执行的是包与清单一致性，不是上述法律/隐私/玩法门槛的自动替代。
