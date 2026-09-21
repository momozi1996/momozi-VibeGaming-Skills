# 05 · UI、输入、文字

完整CSS和DOM是1:1布局真值，不用本摘要替代精确样式。所有DOM id可在 `world-data.json.uiIds` 查；为了复用测试，保留id或提供语义相同的真实适配。

## 视觉语法

根色：cream #fff4d9 / ink #264847 / mint #b7d8ac / yellow #f0ca84。字体是本地系统栈：Avenir Next/Trebuchet MS/PingFang SC/Microsoft YaHei/sans-serif；英文目的地Georgia/Times New Roman。没有附外部字体，Windows和macOS字形不同属平台差异，不暗称像素相同。

全屏画布、细微渐变暗角；HUD父级pointer-events:none、按钮auto；按钮3–5px小圆角，而不是大卡片堆叠。纸色欢迎/工坊卡片有轻透明、柔和阴影，避免科技荧光。

## 桌面锚点（1440×1000）

- header top30/left38/right36；logo含圆形符号、18px字、3px tracking，小字“云 间 慢 行”。
- destination top124/left40；9px线路眉题、11px下一站标签和距离胶囊，39px serif站名，中文副标题；货币/连胜一行。
- weather right39/top122；location tag right40/top47%。
- welcome left40/bottom220/width304、padding24；标题“把日子，开慢一点。”，启程按钮和“先去 Oliver 的工坊”。
- route-panel left50%/bottom164/width400，舒适度细条与双站名连线，车标按真实里程移动。
- footer left40/right40/bottom42：速度187宽、大数字57；中间乘客/路况；右侧142宽两个踏板。
- toast上方中央，subtitle底243；到站按钮bottom240，避免字幕按钮重叠。
- 工坊label左45/top55，Cloudworks字号55；右44、width315的纸色卡片。

## 响应式

断点1600、900、600；横屏低高度650也有样式。390×844：

- logo左20/top20；按钮31；destination左21/top88、站名29。
- 欢迎卡左20、width calc(100%-40px)、max330、bottom278；不能遮住下方舒适度。
- route-panel width calc(100%-44px)、bottom208。
- footer左右21、bottom45，两列；速度与人数/路况第一行，两踏板第二行；快捷键提示底部。
- 工坊卡左右20、bottom30、height自然，标题与说明缩短，场景车体位于上半部分。
- `renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight, false)`，CSS控制canvas宽高。第三参数false很重要：曾修复从横屏回竖屏后inline宽度锁死导致页面844px溢出的真实问题。

## 真实文字与数值

- 欢迎：`A LITTLE JOURNEY, ABOVE THE SEA` / `把日子，开慢一点。` / `海风正好，乘客已坐好。` / `握住动力，把这一车温柔送到下一座岛。`
- 目的地：Mango Tide、Saltlight Terminus；“芒果潮汐 · 海风与晚归的人”“盐光始发站 · 归家的灯火”。
- 舒适>80舒适惬意，>56有些摇晃，否则请温柔驾驶；bar颜色>75薄荷、>50金色、否则杏粉。
- 速度数字补两位，条宽kmh/60；>36提示松开动力，距离<65优先进站请减速。
- 工坊：`OLIVER'S HOMETOWN ISLAND` / `Cloudworks` / `云上工坊` / `一点手艺，很多心意。`；两项和字幕按主提示词。
- M静音、V视角、E车门、Esc/P暂停；W/↑动力，S/↓/空格制动。keyup使用code，阻止滚动键默认行为。
- 触屏pointerdown抓取pointer capture，pointerup/cancel/lostcapture释放。失焦清全部键，运行中的游戏暂停；可同时按两个踏板。
- 声音开启按钮必须由实际state驱动小圆点，不能只有静态图标。

## 暂停/重开

Pause overlay有“让风景等一会儿。”、继续旅程、重新开始本次旅程；帮助包含操作和进站技巧。暂停期间保持画面，不推进距离、舒适度、boarding和workshop。继续重置输入，防止按键粘连。
