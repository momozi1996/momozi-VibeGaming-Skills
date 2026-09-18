# UI、操作和响应式合同

精确字体与像素参照 `src/style.css`；完整HTML模板和中文文案在 `src/ui.js`。不要把本页摘要替代所有原代码。

## 视觉系统

系统字体优先 Noto Sans SC / PingFang SC / Microsoft YaHei / sans-serif，但**不加载外部webfont**。本机macOS实际使用PingFang SC，其他OS可能文本宽度不同。
主体白#fffdf0，墨绿#344b43，奶油#faf8ef，薄荷#d8ead3。HUD细白线、柔和阴影、透明背景，不做大块不透明后台面板。根#ui pointer-events:none，仅按钮、模态允许交互。

场景是底层#world WebGL canvas；UI是DOM，不能把整个画面拍成图充当交互。

## 桌面默认1440×900锚点

| 组件 | 位置与表现 |
|---|---|
| 圆小地图 | 左32/上27，146px直径；canvas310²；上方N，下方天气和09:41装饰文案 |
| 区域标题 | 顶29、水平50%，“AEDEL / 艾德尔大陆”“风栖原野”“每一次相遇，都是新的开始” |
| 右上品牌和工具 | 右33/上28；伊莫/ANIIMO；图鉴B、地图M、摄影P、设置Esc |
| 任务追踪 | 左35/上242，约288~320宽；星形图标、种类进度、提示 |
| 探索计数 | 左72/上376 |
| 伙伴列 | 右31/上26%，4个61px圆头像，间16；锁定半透明，已选亮环 |
| 野生名字 | world→clip→screen投影，目标上方；Lv.02、名称/属性、细绿条 |
| 玩家状态 | 左35/底70，49px罗盘徽章，姓名、固定满值条、实际步数 |
| 底中提示 | 底42/中50%，合体提示+键位提示 |
| 技能 | 右39/底89；感知/联结各53px，捕捉78px，球库存 |
| 原型声明 | 左35/底21；“非官方风格原型 · 单人探索” |

没有背包物品网格、联网聊天、商店。库存只有联结球；地图天气时间09:41是固定氛围文字，不是时钟玩法。

## 输入映射

WASD或摇杆→归一化move，Shift→sprint，Space→jump。拖拽dx×-.004，dy×-.003控制相机；滚轮deltaY×.007缩放。鼠标pointer捕获、右键菜单阻止；按键repeat不重复触发动作。

E capture/portal；Q twine；C scan；M map；B dex；P photo；1..4 select0..3；Esc关闭photo/窗口或打开pause。Tab仅preventDefault，没有Tab菜单功能，不要因Steam截图有Tab就新增。

## 地图实际渲染

地图不是静态图。minimap canvas310²，zoom2.4，以玩家为中心；大图850×680，zoom5.4，中心(0,-10)。采样同一个heightAt得到HSL地色；叠轮廓线、小径、riverX、未捕捉点、风门、玩家朝向三角。大图地名为风语林地/映蓝河湾/初遇花甸/日光小径。

## 窗口清单

- **dex**：“每个相遇，都值得珍藏”；左大模型/编号/属性/名称，右4卡片和物种说明、联结能力。卡片切换详情，不自动获得；已拥有可选为伙伴。
- **map**：“下一段故事，去哪里？”；动态地图、当前位置/野生/风门图例、种类进度和继续探索。
- **pause**：“不妨，停下来听听风”；音效开关、质量切换、摄影、重新开始、操作说明、回原野。
- **quest**：“与原野的伊莫成为伙伴”；4头像、两步任务、奖励说明、我准备好了。
- **complete**：“最好的旅途，是有人同行”；300星屑、10球，继续漫游/重开。
- **reset**：“重新出发？”；明确清空本机进度，确认重开/保留。

共同模态max-width1080，max-height92vh，backdrop模糊12px，浅奶绿面板；escape及X关闭。完成/reset最大800。进入窗口state.paused=true且release输入，关闭恢复state。

## 状态反馈

- toast：顶20%，最多85vw，3.3秒后隐藏；所有字符串在源码。
- capture-reveal：顶19%，左头像/新羁绊/加入旅途，4.2秒。
- 捕捉进度：circle r46，strokeDasharray289，offset=289×(1-progress)。
- 目标可捕捉则主按钮亮，靠门且已够3种则主按钮文案“启程”。
- 隐藏/切换人物、地面环、粒子由main真实state控制，不允许UI自己“+1”。

## 摄影与触屏

摄影仅隐藏HUD，world仍真实渲染，显示边框、位置文案、保存/退出。PNG只导canvas，不含DOM。

断点：min1600、max1100、max750、pointer:coarse、max500且portrait。不要只在桌面缩放整体网页。
触屏：左摇杆94px，内部38px；位移半径34，视觉移动26；右额外跳跃按钮。摇杆指针抬起、cancel和lostpointercapture全部清零。
390×844竖屏时标题居中、右上2×2工具、右侧头像、底部动作，地图/图鉴改布局。窗口打开通过`.modal-open .touch-controls{display:none!important}`隐藏触控；photo也隐藏，避免遮挡按钮。

相关golden：07-mobile、08-mobile-map。不得以电脑模拟截图通过声称所有物理手机性能已达标。
