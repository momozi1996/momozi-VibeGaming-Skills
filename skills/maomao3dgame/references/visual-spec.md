> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 视觉、渲染与镜头

## 总构图

这是全屏游戏，不是普通网站。1920/1600 宽屏菜单左侧约 40% 文字，右侧为真正渲染的猫咪车。下方一排 6 头像卡片，右下大“开始比赛”。顶部左侧 ALOHA RACING CLUB + SUMMER CIRCUIT，右上帮助/音量/设置。可见海岸、起点拱门、椰树、船、阴影。

奶油/薄荷/珊瑚/深蓝绿；禁止替换成暗色赛博朋克、黑色柏油路、紫色渐变、方块小人。标题 ALOHA 深蓝绿，KART 珊瑚色，粗斜体窄体、约 -5° 旋转，有竞速条纹。不要外部下载另一套 UI。

## CSS 色值与字体

`--ak-cream #fff6e5, paper #f5edda, navy #173d45, muted #587477, mint #b7e4d2, coral #ec7963, yellow #f1cd78`。
标题优先 Barlow Condensed，本地 800/900 normal/italic；body Avenir Next/Avenir/Trebuchet MS/PingFang SC/Microsoft YaHei 回退。原项目没有打包中文字体，不同系统汉字和 Canvas 标牌会有差异。

完整 CSS 是 exact 依据。重建时保留菜单左侧奶油透明渐变、清爽底部区，而不是覆盖一整层高不透明度白卡片。HUD 中间保持空，名次/圈数左上、计时/币右上、道具右侧、小地图左下、速度右下、按键底中。

## 渲染参数

- WebGLRenderer antialias=true, alpha=false, powerPreference='high-performance', preserveDrawingBuffer=true。
- outputColorSpace SRGBColorSpace；ACESFilmicToneMapping exposure=1.12。
- fogExp2 `#b8e4e9`, density=.00165。
- HemisphereLight sky `#c4f1ff`, ground `#c49867`, intensity=1.7。
- DirectionalLight `#fff1d5`, intensity=2.9；每帧玩家位置+(-75,120,-55)，target 玩家。
- PCFSoftShadowMap，high 2048²，camera left/right ±65, top/bottom ±65, near=5,far=320；normalBias=.055,bias=-.00015,radius=3。
- RoomEnvironment → PMREM sigma=.025，environmentIntensity=.32。
- 天空半径1300，顶色 #399fde、地平线 #b1dfeb，sunDirection normalize(-.35,.48,-.6)。20 组云，每组6球。
- bloom strength=.16,radius=.4,threshold=1.35；后接暗角/冲刺光线 ShaderPass，最后 OutputPass。
- near=.15,far=1900，初始 PerspectiveCamera fov48；实际 fov 由状态更新。
- high DPR 上限1.5；balanced1.1，shadow1024；low .85、关闭 shadows/bloom。DPR 还会受真实 devicePixelRatio 限制。

## 菜单镜头（最常见失败点）

hero = createKart(selected)，位置 sample(.006,-1)，朝向 sample.yaw。桌面 scale=1.52，宽<700 scale=1.15。

以 hero 的 forward=(sin yaw,0,cos yaw)，right=(cos yaw,0,-sin yaw)：

- desktop camera = hero + forward*12.4 + right*(8+sin(time*.11)*.75) + y6.6。
- look = hero + right*(-5.1) + y1.8；fov44。
- mobile camera forward12.5,y7.8，look right*(-.7),y1.7；fov57。

**目标点故意左移**，让猫在画面右边；不是把摄像机对准原点。保留猫的正脸、耳朵、花朵、花环、方向盘和车轮。

## 比赛镜头

C 循环3种：默认 back8.3/y4.7/fov58；远景15.5/8.8；车手视角1.5/3.05/fov79。手机非车手视角 fov73。Look 前方11米+y1.05（车手20米+y1.8）。漂移时沿 right 偏移 -steer*1.2。

boost 额外 fov8，速度额外 min(speed,40)*.075；fov damp3。位置指数平滑6，look8。

**必须先把玩家当帧位移加到 camera/smoothLook，再平滑相对镜头**，不然高速时误差=速度/平滑系数，车会远离镜头。重开/切模式/窗口尺寸变化重置 cameraSettled；test.step(dt>1) 同理。

playerMarker='YOU'，y+4.15，Sprite 2.2×1.1，depthTest/depthWrite false。玩家后方 -15<behind<-2.5 且 |side|<4.2 的 AI 在普通驾驶镜头可见性剔除；保留其模拟/碰撞，不是删除车。

## 明信片模式

P 或设置：冻结比赛，隐藏 #ui-root，启用 OrbitControls，min3,max180,maxPolar≈.485π；工具条“保存明信片 / 返回游戏”。PNG 从实际 canvas 导出；退回恢复之前比赛态。不要把截图按钮只做 toast。

## 响应式和证据

桌面 canonical 1600×1000/DPR1；手机390×844/touch=true。原历史截图并非全都同一代码阶段。优先对照固定帧 canonical 和 08-live-race。不要拿天空粒子随机帧作像素绝对阈值；渲染必须同浏览器/同时间步/同字体先对齐。
