# 文件、玩法、画面三层验收

## 基线／仅换肤的完整检查

```bash
python3 "<SKILL>/scripts/project.py" verify
# exact使用--exact；variant预设去掉--exact
python3 "<SKILL>/scripts/project.py" compare --project "<OUTPUT>" --exact
node "<SKILL>/scripts/run_acceptance.mjs" --project "<OUTPUT>" \
  --suite all --dev-port 4383 --prod-port 4384 --report-dir "<REPORT>"
```

前提：OUTPUT已经npm ci；Chrome已安装，非标准路径用环境变量 `CHROME_PATH` 指向可执行文件。macOS wrapper默认 `--angle metal`，其他系统default；可用 `--angle default|swiftshader|gl|vulkan|d3d11` 显式配置，截图工具同样支持。仅改变浏览器启动后端，不改游戏或断言。工具不下载浏览器，不结束未知端口服务。all=核心+playthrough+edges+production；core仅哈希/单元/构建；smoke=核心+production，不是全套通过。

工具使用技能内基准浏览器断言，适配的仅启动环境、端口、报告输出，不把待测项目的“总是成功”脚本当证据。以下数量是基线契约，不是未执行时可以直接填写的结果：

- 15单元；TypeScript与生产构建。
- 58项模型/纹理/UI/音频完整性；锁定依赖与tests保留。
- playthrough 18检查：真移动/跳跃/碰撞、接任务、战斗/药水、采集、奖励升级、保存继续、死亡/复活、镜头/界面。
- edges 9检查：GPU地形、镜头半径、焦点Esc、背包刷新、摄影PNG、重置确认与beforeunload、缺贴图阻断。
- production 6检查：实际构建能运行、界面/保存、无DEV debug、无外站素材请求。正常错误与故障注入预期404分开。

不要同时压满GPU运行多个3D浏览器测试。基线dt封顶0.05；低帧率时固定墙钟按W一秒可能没有足够模拟时长，移动断言会真实失败。记录FPS/GPU/负载，查硬件加速，串行重跑；不删断言或伪调状态让移动测试通过。

## 受控截图

另起OUTPUT开发服务后执行（REPORT2是新目录）：

```bash
node "<SKILL>/scripts/capture_views.mjs" --project "<OUTPUT>" \
  --url http://127.0.0.1:4302 --output "<REPORT2>"
python3 "<SKILL>/scripts/compare_images.py" --reference "<SKILL>/assets/golden" \
  --candidate "<REPORT2>" --output "<DIFF>"
```

截图固定6个机位、角色状态、骨骼帧、DPR1和AO随机seed。比图需要Pillow+NumPy；exact对照几何/材质/光照/中文界面，先排环境与字体差异，再定位实现。variant不要求与旧截图像素一致，而要检查新主题合同与细节完成度。capture含原机位、坐标与日志文本；新地图应在输出新建适配夹具，不改技能golden。

## 大幅变体

替换资产、存档key、坐标或玩法后，默认compare和旧E2E会指出真实变化。不要绕过结果宣称“基线全过”；保留diff，创建变体asset manifest/测试并逐条映射原回归能力。新任务要从接受到奖励再刷新继续，确保不能重复奖励；新地图必须真实移动验证阻挡与可达。

## 交付

新项目＋实际启动命令＋当前测试报告＋新截图＋来源许可＋差异表。写明未测系统／浏览器／真手机、狼无骨骼动作、声音未试听、性能本机样本及bundle警告。不要将以前的基线日期和日志复制成今天的结论。
