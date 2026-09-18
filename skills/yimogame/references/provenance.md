# 来源与分发范围

- 来源：用户提供的 `yimo-note` 1.0.0 复现包。本包规范名 `yimogame`，显示名 `yimoGame`，纳入 game-skill-packages。无需来源目录即可运行。
- `assets/reference-project` 的66个文件、project-manifest、golden、静态GLB和离线npm缓存保持来源内容不变；不是重新做了一套低配美术。
- 调整仅在技能入口、UI元信息、创作/调用文档与可移植工具层；新增一条命令生成并启动，增加输出符号链接/路径重叠保护。
- 原验证记录移到 `references/source-verification` 并标注历史性质；冻结工程内原reports也只作来源记录。当前分发测试在包外进行。
- 外层 MANIFEST.sha256.json 是本skill文件清单；assets/project-manifest.json继续校验原66文件。ZIP另附SHA-256，均为完整性校验而非外部签名。
- 没有为用户源代码擅自添加MIT或CC0授权。模型/场景为来源包的程序化创作；品牌与官方研究图权利另见 rights.md。公开/商用前确认用户源项目授权并替换未获许可的品牌与研究材料。
