# 分阶段重新实现的详细步骤

仅用于rebuild；exact直接恢复，不必重新造轮子。每阶段的源文件读路径都在 `assets/reference-project`，无需联网找库的另一个版本。

## 阶段0：冻结条件 / 起点

1. verify全包。观察golden/01-field、04-dex、07-mobile、08-mobile-map。
2. restore rebuild到新目录；src为空，入口暂时失败是预期。
3. 离线安装依赖，保留package-lock与Vite配置。
4. 写PROGRESS：模式、已做、未做、测试端口、文件、下一步。不要抄基线TEST-REPORT假装完成。

通过标准：Node可运行，资产和代码都可读，项目目录正确，不改KIT。

## 阶段1：数据、状态与统一地形

实现state.js的全部导出和terrain.js的5个导出。先让11项Node测试通过。数值照contract与原源，不凭经验将速度/半径“优化”。
必须理解捕捉ID和种类是两层数据，提交奖励只能一次，存档不保存capture/time/形态，恢复边界比运行边界更窄。数据规则与UI不耦合。

通过标准：npm test11项通过；再人工读数据、边界与序列化字段，测试覆盖不是“只写够11个断言”。

## 阶段2：最小可玩切片

main创建renderer/scene/camera、一个可移动人形、一只宠物、地面、近邻捕捉、状态文本。先实现WASD→位移→8m判定→1.5s捕捉→owned+库存→Q形态，再接风门条件。
灰盒仅中间步骤，不得当最终交付。输入归一化、blur/release、暂停和dt封顶从一开始做对。实现DEV桥，但production条件剥离。

通过标准：真按键推进状态，远距/已捕捉/paused被拒绝；E不能一帧刷多次奖励。

## 阶段3：镜头、地形、世界轮廓

按terrain构地面并更新法线，设精确相机参数与光照。先摆风门、河湾、远山、都市和明确定位大树。
控制变量拍同视口：主角在左下，小径纵深明确，天空留白与门/城位置接近golden；不要只缩小UI来掩盖世界尺度错。

通过标准：角色和地面高度一致，水/目标/门可达，镜头不能钻入地面。此时源资料允许查全world生成顺序。

## 阶段4：原有美术工艺

实现mat/ball/link/bake；探险家层次、四类宠物层次与动画；材质共享，静态部分合批，动态pivot保留。
按world原顺序接16万风草实例、白花/紫花、树冠CanvasTexture和sprigs、石头/灌木、云/水shader。保留seed及调用顺序，不用大批Mesh替代InstancedMesh造成性能下降。

通过标准：视图有真实3D遮挡/光影/动作，不是平面图；drawCalls/triangles量级接近基线，允许实现不同但不得出现成千上万draw calls。

## 阶段5：完整玩法与事件

把8个WILD实例接入，同state驱动隐藏、near、捕捉进度、自动选伙伴、跟随和形态速度。
Q合体→双跳/疾跑/水上能力需真实影响行为。门前E提交、完成一次、继续探索、确认重开。事件粒子与提示音只消费结算，不再额外改库存。

通过标准：状态11项+浏览器主链通过；同种第二实例不增加任务种类；暂时的capture不被异步setTimeout继续推进pause。

## 阶段6：完整UI

按ui.js和style.css保持主要结构/DOM ID，以便现有E2E定位。接地图canvas采样世界数据，图鉴用同模型渲染肖像，不外链图片；实现全部6个modal、toast、reveal、动作按钮、气泡标签。

摄影P冻结玩法但相机能动、导出canvas PNG。恢复renderer肖像渲染时改过的DPR、size、clear，否则真实场景会尺寸错误。

通过标准：map/dex/pause/reset/complete都可开闭；HUD来自同state；摄影PNG是实际文件，不只弹“已保存”。

## 阶段7：响应式、故障与生产

触控摇杆的pointerup/cancel/lostcapture都清输入。竖屏图鉴/地图重新排版，不裁成看不见按钮；modal/photo隐藏摇杆。
localStorage异常容错，资源/WebGL错误可见，beforeunload不会写回旧state。build生产后真实打开，确认DEV桥不存在。

通过标准：48项原玩法验收通过，触屏模拟有真实CDP输入；源码结构不同则比对API是否兼容，而非删测试。

## 阶段8：固定图校验与交付

运行capture，逐个与golden比较。先修构图/地标/比例，其次材质/草密度、最后UI微差。不把只改变抗锯齿/字体造成的像素噪声当必要源码修改。

提交实现路径、命令、新测试/截图、未实现项、直接复用范围、视觉差异。重写即使测试全过也不写“所有源码100%一致”。
