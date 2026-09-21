# 环境、启动与便携

## 最低工具

- 复制/验收辅助：Python **3.9+**，只用标准库；推荐3.11+。
- 源码构建：Node.js **20.19+**，建议22 LTS；npm。`npm ci` 使用锁文件，不运行 `npm update`。
- 浏览器：支持 WebGL2 的桌面 Chrome / Chromium / Edge；有 GPU 为宜。浏览器测试使用项目本地 Playwright。
- macOS、Linux、Windows 都可恢复源码；本包**本轮实际验收平台见新 summary.json**，未在三系统逐一实测。跨平台字体和 ANGLE 会影响画面。
- 不打包 node_modules/npm缓存/浏览器安装包，首次构建需网络或缓存；运行美术和 dist 已全在包内。

## 只想打开已构建游戏

先 exact 恢复到新目录，在项目根运行：

```sh
python3 -m http.server 4422 --bind 127.0.0.1 --directory dist
```

打开 `http://127.0.0.1:4422`。断网也能加载随包美术；Python服务必须保持运行。macOS随包 `启动游戏.command` 为原工程便捷脚本，需要合适执行权限与可用默认端口。

## 修改 / 重建

```sh
npm ci --no-audit --no-fund
npm run dev -- --port 4421
npm run build
npm run preview -- --port 4422
```

Vite脚本默认host为127.0.0.1，默认dev4411/preview4412，strictPort。占用时选新端口，不擅自kill别人的服务。原 vite.config 使用 `base:'./'`，但运行请求有 `/assets/...`，**仍需部署在HTTP根路径**；不要假定直接放 `/games/foo/` 子目录就能加载。

## check.py 浏览器选择

```sh
python3 "<SKILL>/scripts/check.py" --project "<OUTPUT>" --out "<NEW_REPORT>" --suite all
# 系统Chrome/Edge（Playwright channel）：
python3 "<SKILL>/scripts/check.py" --project "<OUTPUT>" --out "<NEW_REPORT>" --channel chrome
# 任意Chromium明确路径：
python3 "<SKILL>/scripts/check.py" --project "<OUTPUT>" --out "<NEW_REPORT>" --executable "/path/to/chrome"
# 无GPU时可以尝试，非原画面性能环境：
python3 "<SKILL>/scripts/check.py" --project "<OUTPUT>" --out "<NEW_REPORT>" --software
```

macOS默认 `channel=chrome + --use-angle=metal`，符合冻结测试环境；其他系统默认Playwright Chromium、不强制Metal。Windows使用 `python` 而非 `python3` 也可；路径用引号。macOS没Chrome时，安装bundled Chromium后通过 `--executable` 指向它（或安装Chrome）：

```sh
# 在 OUTPUT 内执行，需要下载浏览器：
npx playwright install chromium
node --input-type=module -e "import {chromium} from 'playwright'; console.log(chromium.executablePath())"
```

Linux如提示缺少系统依赖，按Playwright报错补齐后重试；本脚本不会静默提权安装系统包。`--software` 改变GPU环境，不能把帧率当成原始硬件表现。

## 常见问题与处理

| 症状 | 先查 |
|---|---|
| HTML打开黑屏/资源失败 | 是否file://？是否在项目root HTTP服务？`/assets/champions.json`能否200？ |
| 看到旧键位或仍不能移动 | URL是否旧4411/4412？刷新；核对src hash和实际新dist；不要只改UI文案 |
| 开始能动，切窗口后不动 | 失焦暂停是设计；点继续再测，按键不应粘连 |
| 点击技能无效果 | 等级解锁、法力/冷却、是否指向技能待选目标、艾希Q是否4普攻、鼠标是否UI上 |
| 检测不到 `__RIFT` | 生产版本来禁止；开发测试只能dev，生产测试不能依赖它 |
| Python输出目录拒绝 | 安全保护：目录须新/空；report须新且与project/skill分开 |
| 构建>500KB警告 | Three chunk体积已知，不是失败；不提高阈值伪装消失 |
| npm安装失败 | 网络/registry缓存/Node版本；不要改版本号蒙混通过 |
| 原文档素材上游目录不存在 | 上游路径仅为来源记录；运行文件已内置，不需要原allgame |
| 字体不同/PNG hash不同 | 记录OS/浏览器/GPU/字体；核对布局和模型，不机械当成逻辑失败 |

check会只停止自己启动的Vite进程，并清理自己新建的临时测试目录。测试失败写summary/log后非零退出，不覆盖已有报告。不对外公开服务或自动部署。
