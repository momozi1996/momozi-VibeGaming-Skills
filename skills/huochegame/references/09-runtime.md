# 09 · 环境与可移植运行

## 玩/复制/重建

- 原成品直接双击`assets/reference-project/cloudline.html`；无需Node/Python服务器。
- pack.py需要Python3标准库，无pip依赖。
- build.mjs需要Node.js（建议20+），只用内置fs/path/url；不需npm或网络。
- 浏览器需要支持WebGL，推荐Chromium/Chrome。音效要一次真实用户手势。

## 测试工具

在已生成输出的`tooling/`目录执行`npm ci --no-audit --no-fund`，下载锁定版本playwright-core与pngjs。`node_modules`不随包重复打包，也不会安装全局工具。原版游戏运行不依赖它们。

浏览器查找：优先环境变量CHROME_PATH；macOS默认Google Chrome；Linux尝试google-chrome/chromium可执行路径；Windows尝试Program Files下Chrome/Edge。不自动下载浏览器；找不到时明确提示设置路径。

```sh
# macOS/Linux
CHROME_PATH="/path/to/chrome" node scripts/run-checks.mjs --project /path/to/game --out /tmp/report-01
```

```powershell
# Windows PowerShell
$env:CHROME_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
node scripts/run-checks.mjs --project C:\work\huoche-rebuild --out C:\work\report-01
```

macOS使用`--use-angle=metal`；其他平台不强制Metal。无头Chrome音频可能静音，音效事件通过不等于真人试听。Windows/macOS默认字体不一致，不保证图像0差。

## 安装成Skill（可选，不自动做）

将整个`huochegame`文件夹复制到你代码助手支持的技能目录，不要只复制SKILL.md。`agents/openai.yaml`只是支持该元数据的宿主用；其他模型忽略它不影响工作。不能读文件的纯聊天模型需要你上传整个包，至少提示词/规格/截图/源文件；不要一次粘贴压缩引擎淹没上下文。

## 路径与安全

材料包位置可移动；工具相对自身文件定位基线。game.py的输出必须在Skill包外且尚不存在；旧pack.py允许新/空目录，报告目录须新建；复现不意味着授权删除已有项目。restore无force开关；防止误覆盖。测试结果写新目录并保留输入哈希，参考文件不被原始测试重写。

## 断网范围

HTML游玩、verify、restore、prepare、build可离线（本机已装相应Python/Node）。首次npm测试依赖或浏览器安装可能联网。包不含Chrome本体，不把“游戏离线”说成“全开发工具无依赖”。
