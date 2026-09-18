# 环境、离线运行与可迁移执行

## 实际已测试环境

macOS arm64；Node25.8.1、npm11.11.0、Python3.9.6，已安装Google Chrome，ANGLE Metal。
源码要求Node20+；推荐22/24/25且满足锁定Vite版本运行要求。其他Node版本不承诺字节相同build。Windows/Linux的依赖tarball已随包缓存，但本轮没有实机执行这些OS。

不包含Node、Python、Chrome二进制，也不包含商用系统字体。不需要Blender、GPU模型API、图片生成服务、飞书工具、其他Skill、在线Steam或原作者旧目录。

## 零依赖查看成品

```bash
python3 "$KIT/scripts/reproduce.py" serve --port 4368
```

本地HTTP只绑定127.0.0.1，内容为冻结dist。用支持WebGL2且启用硬件加速的Chrome/Edge/Safari打开；不能双击file://，不能把dist/index.html单独移走。Ctrl+C关闭自己启动的服务。

## 源码恢复和安装

`restore`强制包外新目录，所有文件拷贝后不依赖KIT运行。`install`默认将vendor/npm-cache.tar.gz解压到**输出目录**的`.yimo-npm-cache`，执行：

```bash
npm ci --offline --cache /输出目录/.yimo-npm-cache --no-audit --no-fund
```

69个resolved URLs（含各平台optional package）缓存，当前平台只安装所需部分。不会复制平台不匹配的node_modules，不会用npm update。

离线缓存已存在时install拒绝覆盖；重试请在输出目录直接运行上面的npm ci（使用已有缓存）。如需网络安装，显式 `reproduce.py install --project OUT --online`；普通原样恢复不需要此分支。

用不同registry重写过的lock可能不命中缓存，应先恢复原锁文件，而不是静默升级依赖。若npm报版本/架构不支持，应报告精确命令、Node/npm/OS/CPU和错误日志。

## 浏览器测试

`check.mjs`和`capture.mjs`从**输出工程**node_modules解析Playwright，因此依赖安装必须先完成。浏览器选择：
1. `CHROME_PATH`环境变量；
2. 常见OS位置的系统Chrome/Chromium/Edge；
3. Playwright默认浏览器（须已安装）。

若找不到浏览器，先指定已有可执行路径；测试脚本不会自动联网下载。若由用户决定下载，可在输出工程运行`npx playwright install chromium`，明确这一步需要网络与额外磁盘。

macOS默认`--use-angle=metal`；其他平台default。可用`ANGLE=swiftshader`做无硬件GPU冒烟，但帧率和像素可能变化，不能与Metal基准混比。

## 命令行（Windows PowerShell）

```powershell
$KIT = "C:\work\yimogame"
$OUT = "C:\work\yimo-recreated"
py -3 "$KIT\scripts\reproduce.py" verify
py -3 "$KIT\scripts\reproduce.py" restore --mode exact --out "$OUT"
py -3 "$KIT\scripts\reproduce.py" install --project "$OUT"
$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
node "$KIT\scripts\check.mjs" --project "$OUT" --out "C:\work\yimo-report" --port 4370
```

本页为可迁移操作说明，未宣称本轮Windows实测。空格路径必须加引号。Python命令可能为python、python3或py -3；Node应在PATH可用。

## 服务与端口

推荐预览4368、开发4369、回归4370/4371、固定截图4374、资产导出4376。脚本每次使用strictPort，端口占用则换端口，不终止其他项目服务。

`check`启动和关闭自己的Vite开发/生产服务，重写仅发生在输出tests下临时launcher，完成后删除。原测试断言保留，只添加跨平台Chrome选择与生产HUD下一帧等待；内置测试中的URL使用TEST_URL/PROD_URL注入。

## 常见故障

- 只见“原野暂时没有醒来”：查看console；确认WebGL2/硬件加速，保留实际错误信息，不换静态图兜底。
- 404：完整dist与assets未一起复制、file协议、错误根路径或旧服务；先浏览器Network核实。
- 复制后出现旧进度：localStorage按origin隔离。同端口可能沿用之前玩过的档；通过游戏确认重开或用新的测试context，不无声清用户存档。
- 生产Q断言偶发提前读取旧HUD：state动作同步，但DOM在下一帧update，包装器已补等待；断言内容和业务代码不变。
- 像素不一致但源码相同：检查浏览器版本、OS字体、DPR、GPU后端、viewport和时间/seed，再看diff；不要改代码去补偿不同字体的像素噪声。
- 截图工具固定时间：报告里的fps等可能是虚拟60，不允许当性能实测。
