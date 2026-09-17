# 环境与独立安装

- Python3.9+；恢复/校验/主题合并只用标准库，不需要pip。
- 现代Node/npm；本包基线实测Node25.8.1/npm11.11.0。冒险的原生TS测试需要strip-types支持，可用Node22.18+／24+；Vite按锁文件对应Node要求安装，不盲目升级依赖。
- Chrome/Chromium＋WebGL2与硬件加速；浏览器验证从输出project/node_modules加载Playwright。macOS默认Metal，其他平台默认后端；probe/冒险runner可用CHROME_PATH指定可执行文件，赛车runner默认Chrome channel或内置工具的--browser chromium。
- 首次npm ci需要网络或缓存；包不含node_modules，不是跨平台离线编译环境。游戏美术本地读取，没有必需模型API/联网CDN/Blender。
- 可选图像比较脚本需要Pillow+NumPy；这不影响游戏生成、构建或浏览器。可用项目独立Python虚拟环境。

SKILL为allgame目录；内部kit指`SKILL/assets/kits/racing`或adventure，不是用户还要找的其他skill。只复制SKILL.md不能带走几十MB素材，须复制整个文件夹。只要工具支持读Markdown/源码，忽略可选agents/openai.yaml即可。

本包目录可放到任意Agent支持的skill位置；另一个模型调用时读取该位置的SKILL.md。没有宣称全部模型／IDE／操作系统实测。纯聊天模型没有文件/执行工具就不能真的交付本地运行结果。

默认只绑定127.0.0.1和strictPort。勿双击index.html；必须HTTP。原基线很多资源以`/assets/`开头，部署子目录要同步修资源URL与base。开发/生产构建分开验证，启动新输出而非错误连接原项目。

Windows把python3换成py -3；wrapper的PYTHON环境变量需是可执行文件路径而非含参数的字符串。若npm.cmd进程启动方式受工具限制，用本机shell实际运行等价命令并保留输出，不把“给了跨平台命令”说成已跨平台测试。

文件/hash损坏停止恢复；npm错误查Node/registry；白屏先查JS/module/shader/404再改颜色；浏览器无GPU先查真实renderer；端口占用换端口，不杀未知进程；没有工具则报告未验证与补测命令。

本skill制作游戏不授权联网发布、上传素材、安装全局包或调用付费API。所有新输出和报告写到技能目录之外；恢复脚本拒绝重叠路径、symlink输出与非空目录。

工具自检：`python3 "<SKILL>/scripts/selftest.py"` 在临时目录执行48项检查，含两套exact字节、4预设、自定义主题、brief、空实现rebuild、拒绝覆盖/污染、错误输入和跨工艺包路径保护；不联网、不执行游戏。
