# 06｜完整恢复步骤与环境

下面假设在本skill根目录执行。`SKILL=.`，输出`../quanwang-rebuilt`必须不存在。PowerShell用户可将路径替换为完整路径，不需要使用shell变量。

## 环境层级

| 目的 | 前置条件 |
|---|---|
| 直接运行成品 | Python3 + 现代浏览器/WebGL；dist已在包内；不用npm/联网 |
| 开发/构建/单测 | Node20.19+（或兼容22.12+ LTS）、npm；依赖tarball已在包内 |
| 浏览器自动测试 | 上述环境 + 本机Google Chrome；脚本channel=chrome |
| 素材重新导入/像素对比 | Python + Pillow；importer另需requests |

制作环境版本见environment.json；Node25.8.1/npm11.11.0为实测，不代表必须安装同一未来/非LTS版本。所有JS包已锁定；不要默认升级到最新版。

不包含Node/Python/Chrome安装器或系统字体。Python对比脚本需Pillow11.3.0，素材importer另需requests2.32.5；这些可选Python包未做离线wheel打包。即使它们缺失，成品播放、JS构建与玩法测试仍可做。

## 0. 验证交接包

```sh
python3 scripts/game.py verify
```

如果失败，先确认包未下载/复制完整。不要自行重新写manifest掩盖错误。MANIFEST.sha256.json包含整个复现包，manifest文件自身除外。

## 1. 看参考成品

```sh
python3 assets/reference-project/start-demo.py
```

默认随机端口并自动打开浏览器。使用Ctrl+C停止。要无GUI仅提供服务，加`--no-open`；端口可`--port 5210`，但先确认空闲。**不直接双击index.html**，ES Modules/绝对资源路径需要HTTP。

## 2. 恢复新项目

```sh
python3 scripts/materialize.py --dest ../quanwang-rebuilt
python3 scripts/verify.py --target ../quanwang-rebuilt --scope all
```

materialize先核对冻结项目，再复制；不覆盖现有目录、不安装依赖、不修改原项目。失败路径可换一个新目录，不要随意rm用户已有项目。

复制后的目录与原游戏结构相同，包含src/public/tools/tests/docs/dist。预编译产物可以立刻用目标的start-demo.py播放。

## 3. 安装锁定依赖（离线）

```sh
node scripts/install-offline.mjs ../quanwang-rebuilt
```

脚本在目标`.quanwang-npm-cache/`缓存已打包tarballs，用原lockfile执行`npm ci --offline --no-audit --no-fund`，跳过Playwright浏览器下载。所有85份tarball在读取时同时检查SHA256及锁文件SRI；包含多平台esbuild/rollup可选二进制，npm会按系统选择。

这一过程不修改package-lock，不设置全局registry，不依赖原游戏node_modules。项目缓存可保留方便重装，交付源码时可以排除。依赖生命周期脚本如esbuild安装会正常执行；这些软件包不是游戏CC0美术。

如果不使用随包离线依赖，也可在目标运行`npm ci --no-audit --no-fund`，但这需要网络，lockfile的resolved域名是npmmirror；`--registry`不一定能覆盖锁定的resolved URL。不要为了连网方便改版本或执行npm update。

## 4. 全部回归（推荐一条命令）

```sh
node scripts/run-checks.mjs ../quanwang-rebuilt
```

脚本执行：
1. 目标项目npm test（29项）；
2. npm run build（TypeScript+Vite）；
3. 启动目标start-demo.py，port0随机端口，no-open；
4. 生成临时测试副本，把旧硬编码5196/5197替换为这个独立服务，跑15项玩法和8项生产检查；
5. finally关闭自己启动的服务、删临时测试脚本，不关闭其它服务。

因此不会误测你机器上仍在运行的原Demo。运行日志可重定向到目标evidence/reproduce.log。原测试文件不会被改写。

如果环境Python命令不叫python3，可设置PYTHON为有效可执行文件路径。脚本依赖本机Google Chrome；缺少时可先运行单测/构建，不伪报浏览器测试通过。非Chrome环境可单独有记录地适配测试，但不是默认基准环境。

## 5. 生成稳定截图

先启动目标生产服务并保持运行：

```sh
python3 ../quanwang-rebuilt/start-demo.py --port 5210 --no-open
```

另一终端：

```sh
node scripts/capture.mjs \
  --project ../quanwang-rebuilt --url http://127.0.0.1:5210 \
  --out ../quanwang-rebuilt/evidence/deterministic
python3 scripts/compare-images.py \
  --baseline assets/baseline/deterministic \
  --actual ../quanwang-rebuilt/evidence/deterministic \
  --out ../quanwang-rebuilt/evidence/visual-diff
```

capture固定1280×800 DPR1，另有390×844移动截图；停止两个时钟、归零视觉时间、禁CSS动画。其脚本会访问现有debug字段和循环render；独立重写若内部不同需要提供等价测试适配，不能直接删除截图步骤。

RGB MAE默认门槛≤5/255是同环境诊断值，**不等于95%复现率**。同源同环境预期接近0。系统字体/GPU/浏览器不同造成差异需读图解释，不能调大阈值掩盖错角色/错布局。

## 6. 再次文件与部署检查

构建后可以`verify.py --scope core`验证源文件/素材仍与基线一致；`--scope dist`检验bundle也一致（不同构建环境可能不同，不默认等同逻辑失败）。若改了必要环境适配，单列差异。

项目部署假定站点根目录，引用为`/assets/...`。用静态服务器根目录指向dist，不能直接部署到未处理的子路径。不要打开发源码目录的Python服务当生产：TypeScript需要Vite或build。

## 7. 交付

保留README、src、public/assets、tools/source-cache、docs/licenses、package-lock、tests、dist、启动器和新验收报告。排除node_modules、npm缓存、临时浏览器数据。报告写真实环境、测试数、运行URL、截图、源/素材校验和已知差异。

如需制作新的可移植Skill，整体复制``；不能仅复制SKILL.md，否则其相对资产路径失效。此Skill不要求安装到任何特定系统目录，模型可直接读取；可按所用工具的技能目录机制安装完整文件夹。
