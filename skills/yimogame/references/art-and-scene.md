# 画面与美术生成合同

本页定位最容易让“类似”偏离1:1的参数。全部shader与几何点数据以`assets/reference-project/src/world.js`、`actors.js`为真值。

## 渲染 / 构图

- WebGLRenderer：antialias true，alpha false，preserveDrawingBuffer true，high-performance。
- PixelRatio=min(devicePixelRatio,1.7)，PCFSoftShadowMap、ACESFilmic、exposure1.12、SRGB输出。
- PerspectiveCamera：FOV52°，near.1，far1000。
- 默认yaw .02、pitch .105rad、distance8.6m。
- 相机yaw/pitch不等于角色yaw；角色初始π。
- 人形target水平肩偏1.15m（随相机yaw旋转），targetY=playerY+2.65；合体肩偏.35、targetY=playerY+2.1。
- cameraPos=target + [sin(yaw)cos(pitch)d,sin(pitch)d,cos(yaw)cos(pitch)d]；相机高度不低于heightAt(cameraXZ)+1.2。
- 相机收敛系数1-exp(-dt×10)；pitch拖动范围[.08,1.1]；距离[4,19]。
- 构图：人物在画面下方偏左，白花沿前景小径两侧，左中景风门，右中景河湾，右上浮空城。不要把人物放屏幕中心、俯视看地或占据半屏。

## 场景配色和光照

天空底#9adbea，雾#bbdef0，FogExp2密度.0037。实际天空是半径700 BackSide sphere+shader渐变和fbm云，不是天空照片。
半球光天空#e6f6ff/地面#849b60，强度1.7。太阳方向(-45,75,40)，色#fff4dc，强度2.5。
2048²阴影，near1 far190，左右上下±65，bias-.0003，normalBias.045，radius3。

## 地形必须统一

```
riverX(z)=31+sin(z*.039)*10+sin(z*.095)*3
riverDist=abs(x-riverX(z))
base=1.15+sin(x*.038+.4)*1.5+cos(z*.043)*1.1+sin(x*.078+z*.045)*.55
cut=exp(-riverDist^2/70)*4
hills=max(0,-z-62)*(.13+.065*sin(x*.031))+max(0,abs(x)-62)*.11
heightAt=base-cut+hills
path center x=-3+sin(z*.045)*5
```

地面360×360，240×240细分，平面旋转-X90°。顶点高度和法线真实更新；顶点色区分小径#baac79、河岸#b3be8a、草地#779d48，并叠少量正弦/随机变化、fragment噪点纹理。不要仅修改CPU height却不改顶点。

## Seed与生成顺序

world使用自定义rng seed**2489**；terrain.rng默认9918但world显式覆盖。算法见源码，不能替换Math.random。**即使seed相同，只要改变先后消耗顺序，也会改变树、花、石与城的位置**。

原生成顺序：地面色→草→花→水→踏石→叶片纹理→树冠→sprigs→近景石/灌木→崖壁/远山→浮空城→门→漂浮微粒→材质合批。UUID随机和事件粒子用Math.random；截图工具另外seed19427固定它们，不改正式玩法。

## 草与花

- 草最大**160000**实例，最多max×1.4采样尝试；较近分布在120×140，较远280×280范围。
- 单草5顶点、3三角形；窄根部±.034，顶部(.035,.64,.11)；顶点normal朝上，double-sided。
- 避让低地h<.35、小径距离<1.5（指定z区段）和风门4m圆。
- scale .45~1.10；实例HSL约h=.2~.235,s=.45~.57,l=.34~.50。
- vertex shader依worldBase与time摆动；fragment按叶高从暗绿到亮黄绿，不能去掉渐变后仅用纯色竖三角。
- quality低档将grass.count减半并DPR<=1、阴影1024²；植被生成布局不重随机。
- 白雏菊最多6000，5片椭圆petal+花蕊+细stem，三套InstancedMesh；避让低地/路径/门，正弦密度形成斑块。左侧林地部分花瓣改紫。

## 树、灌木、岩石

树干分枝为圆锥柱link；树冠由多组Icosahedron(1,1)团块，不是单一锥树。
- 8棵明确定位树：(-28,-22)size2.4，(-28,7)1.25，(48,-10)1.9，(47,34)1.65，(-40,40)2，(-48,-55)2.2，(11,-67)1.65，(-52,-7)1.6。
- 再尝试生成48个远景树位置，避让河流和门。
- 树冠材质底#d4e8a7乘实例颜色与本地CanvasTexture：512²、4600个旋转叶片笔触，重复2×1.5。
- 每冠额外13片instanced sprigs，保留轮廓细节。
- 125次近景灌木/石头散布，小径5m和河流8m内避让；石头兼XZ圆形障碍。
- 远崖40个dodecahedron，远山22个9边cone+蓝色雾。这是简化原型造型，不应描述成原作高精度岩壁。

## 水与城

河流网格沿riverX分布，z=-180..180，宽16，y=.26，shader随时间波纹/闪光/岸缘淡泡沫，opacity约.9。踏石8个，x=21+i×2.3,z=19+sin(i)×.5。

浮空城：group position(64,39,-208)，scale.7；倒锥岛、白色平台、28个散布塔楼、中央塔与锥顶、torus轨道。轨道rotation.z=time×.035。另有4个小悬浮倒锥。只作远景不可进入，不能声称这是第二张完整地图。

## 风之门与效果

group(-13,heightAt(-13,-33),-33)：底座圆台、主torus r3.1/tube.38、发光内圈r2.77/tube.065、透明shader圆面r2.72，环心Y3.55，门柱X±3.15。
门柱参与碰撞，门洞可穿行。主视觉不是网页按钮或2D环。

300个花粉Points(size.075)轻旋，captureOrb为发光球；捕捉近邻脚下环半径.75；事件粒子Octahedron、小速度和淡出。

## 人物

粉色帽/外套、奶白内搭、深蓝短裤、蓝背包、棕黑马尾、奶白袜与鞋。脸有眼睛/高光/鼻/嘴/腮红；背包有前袋、扣带、侧水瓶；鞋有鞋带。全部sphere/cylinder/torus层叠，没有外部模型。
头pivot约Y1.98，torso1.24，手臂pivot(±.39,1.57)，腿pivot(±.18,1.02)。整体脚底原点Y0附近，最高帽约2.4。
行走腿sin(t×10)×.64、手臂相反×.45；capture右臂X=-1.25；body轻微起伏；马尾跟随摆。静态部分bake，不能把整个人物全部合成一块再丢失四肢动画。

## 四种生物

- 绵云：奶白毛团、青色脸/耳/足、卷曲角、黑眼和粉腮红；毛团不是单一白球。
- 焰尾：橙色、奶白胸和口鼻、长耳、尾巴奶白尖。
- 泡泡：蓝青圆身、浅色腹、侧部紫粉三瓣鳍、顶冠与尾鳍。
- 芽芽：绿身奶白腹、黄色嘴/足、顶部两叶芽、小翅。

全部makePet(index)共享动画接口，body呼吸t×2.3幅.035，z摇摆t×1.7幅.025，移动时额外跳动/摆腿。野生绘制最终scale1，伙伴.8，合体1.6。
`createPortraits`在同一renderer中360×360离屏渲染4种头像，恢复原renderer尺寸/DPR/clear；头像不是从Steam剪下来的。
