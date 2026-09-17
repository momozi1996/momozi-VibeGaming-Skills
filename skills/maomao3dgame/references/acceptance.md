# 真正验收，不以“能打开”代替游戏

## 自动检查

```bash
python3 "<SKILL>/scripts/project.py" verify
python3 "<SKILL>/scripts/project.py" compare --project "<OUTPUT>" --exact
# 上行仅exact使用；variant用不带--exact的compare检查保留的资产、测试与依赖
python3 "<SKILL>/scripts/project.py" diff --project "<OUTPUT>"
cd "<OUTPUT>"
npm test
npm run build
node "<SKILL>/scripts/browser_verify.mjs" --project "<OUTPUT>" --out "<REPORT>"
```

Browser runner从目标node_modules加载Playwright，自动选择空闲loopback端口启动/关闭自己的Vite。默认Chrome；可用 `--browser chromium`（需已安装Playwright Chromium）。macOS默认ANGLE Metal；其他平台默认系统，可明确 `--angle default|swiftshader|gl|vulkan|d3d11`。软件渲染不能证明设备真实性能。

- 模拟测试基线16项：手动输入、漂移、道具、碰撞、检查点反作弊、暂停、全赛与AI等。
- Browser基础13检查组；加 `--gallery` 有额外六角色画廊组。覆盖六猫菜单、手动驾驶、暂停、3圈/8成绩、重开、真实PNG、手机触控和错误检查。
- 测试显式设置物品/时间与自动驾驶以缩短赛程；这不代表人工完整驾驶3圈或真机性能测试。
- UI标签、角色数量、玩法改动后旧测试可能不适用；按remix.md新增变体断言，不改技能内基准来迁就失败。

## 生产与视觉必须另看

browser_verify默认验证开发版固定帧；构建后可加 `--preview` 对实际dist执行同一套13组浏览器回归（输出另用新目录），不会自动构建。`npm run preview -- --host 127.0.0.1 --port 4303 --strictPort` 后实际检查菜单、开赛、转向、暂停、结束/重开、摄影；保留console和network记录。不使用源码截图冒充生产运行。

查看新REPORT的菜单/驾驶/暂停/结果/手机/摄影截图。exact可与assets/golden相应文件比对（截图夹具/环境需一致）；variant观察新主题：主角轮廓、前脸、追逐镜头、道路可读性、地标、UI配色、视线遮挡和触控。主题变化不应该“通过”旧图相似度。

可选像素工具：`python3 "<SKILL>/scripts/compare_images.py" --help`，先按其参数配对同尺寸图；需要Pillow+NumPy。指标是辅助，不能证明跨设备1:1。不要重拍覆盖技能golden。

## 输出报告字段

模式／主题、实际项目路径、继承与修改文件、Node/npm/OS/浏览器/GPU、命令及退出码、测试JSON、新截图、性能实测方式、缺陷和未验证项。Vite大于500kB警告如实记录，不提高阈值假装优化。音频初始化不等于真人听感验收，移动端模拟不等于真机全适配。
