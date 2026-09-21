# 画面 / 原生UI复现合同

## 对照位置

基线图在 `SKILL/assets/reference-project/artifacts/`。最新输入UI优先看：

- `controls/fixed-game.png`：修复后开发版场景。
- `controls/production-movement.png`、`controls/production-final.png`：真实生产出生点操作。
- `menu.png`、`spawn.png`、`shop.png`、`pause.png`、`combat.png`、`victory.png`：流程场景，部分为显式测试夹具。
- `production-menu.png / production-game.png / production-shop.png / production-pause.png`：生产画面。
- `expected-resource-error.png`：故意拦截资源后的错误帧，不是正常游戏目标。

本包根目录 `validation/fresh-run/artifacts/` 是打包后新输出，不是上面历史文件的改名复制。移植skill时只带skill目录也够用，历史参考图全部内置。

## 世界的视觉参数

| 项目 | 精确值 |
|---|---|
| renderer | antialias=true、alpha=false、powerPreference高性能 |
| DPR | min(devicePixelRatio,1.65) |
| 色彩/映射 | sRGB、ACESFilmicToneMapping、曝光1.08 |
| 背景/雾 | #14262d；FogExp2 #263d40 密度.006 |
| 相机 | Perspective42°、near.2、far360 |
| 相机位置 | (focus.x*.01,zoom,focus.z*.01+zoom*.78)，看向地面focus |
| zoom | 开局37、范围27..85，菜单80；app初始化45随后由菜单/开局改写 |
| focus | 跟随dt*9，x/z clamp2700..12300 |
| 半球光 | #c5e0eb / #3d5038，强度1.65 |
| 主方向光 | #ffe5b6，2.6，随focus移动；阴影2048，PCFSoft，范围±40，near1/far150，bias-.00015/normalBias.06 |
| 补光 | #6fbbe9，.8，位置(60,30,-50) |
| 地形 | 150×150渲染平面，(75,-.02,75)，2048CanvasTexture，粗糙度.97，normalScale(.18,.18) |
| 种子 | 98421；LCG `(seed*1664525+1013904223)>>>0` / 2^32；调用顺序同样影响结果 |

需要保留地面细纹/分层渐变/道路砖点、斜向河道与半透明3D水带、岩石法线、针叶alpha卡片、外沿立体断崖、基地台阶/水晶，不得用一张完整截图当作地面游戏。

## 程序化模型就是模型资产

`world.js`包含实际几何源码，不存在遗漏的“高模.glb”。原样恢复时这些字节已保留；重写时按每个part坐标/比例/材质/父子关系重建，而非只看一张截图猜。

- 共享几何box/sphere/ico/cone/cylinder/taper/crystal与material cache；石材/岩石/布料/金属按颜色表关联纹理。
- Garen：宽肩甲、巨剑、披风；Ashe：兜帽长发/弓弦；Annie：裙摆/双马尾/火球、整体.79；Lux：浅金护甲/法杖；Yi：绿护甲/多目镜/剑。
- heroModel的userData提供legs/arms/body/cape用于程序步态/攻击/旋转；移动依据manual、move、target和AI状态。不能只平移T-pose网格。
- structureModel含塔、水晶与枢纽；minionModel分近/远/炮车/超级；monsterModel分普通/boss/bear。
- 静态几何按材质合并，保留castShadow/receiveShadow；owned geometry按生命周期释放；重开清理models、fx、projectiles。
- 血条和姓名从实际世界投影，不能固定在屏幕假装跟随。

## 引擎内UI的精确含义

**只将#game放入DOM。** 内部创建离屏canvas绘文字/图标 → THREE.CanvasTexture → 正交相机平面；这是当前实现的“原生游戏界面”，不是操作系统原生控件，也不是HTML元素盖在3D画面上。

- 逻辑宽1600，高round(1600×innerHeight/innerWidth)，离屏栅格倍率1.2。
- UI transparent + depthTest/depthWrite=false；场景render后clearDepth再绘UI。纹理约20Hz更新，UI每帧显示。
- 字体栈：正文PingFang SC / Microsoft YaHei / sans-serif；serif Georgia / Songti SC / STSong / serif。系统字体不打包，不保证跨系统像素一致。
- 主金#cbb47a，亮字#eae5d6，次字#8eaaaf，蓝#72d3e9；深蓝黑渐变面板、细金框/四角、菱形装饰，不换成网页圆角卡片。
- hit区域存逻辑坐标，pointer从client按视口映射。视觉resize与命中resize一致。

## 布局锚点（完整以ui.js数值为准）

- 菜单：大插画从w*.25向右铺满，渐变遮罩；左标题/名字/描述/技能；底部五卡从x60开始每132，118×138，y=h−215；开始按钮在x=w−396、y=h−129，319×67；右侧两开局按钮。
- 顶部计分板：w/2−213处426×61；右上暂停和操作方案；左侧4个队友头像。
- 底部控制台：748×123，x=w/2−374−32，y=h−130；英雄头像、属性、4个57×57技能、召唤师、HP/MP/物品格、金币；上方回城/商店。
- 右下小地图复用同一LANES/BASES/墙/实体状态，带当前镜头范围；左右键有不同交互。
- 商店、战绩、暂停、终局覆盖绘制并有block命中，不点穿。技能未解锁/冷却/待选目标有真实状态反馈。

## 视觉验收不要误判

对照同浏览器、viewport1600×1000、DPR1、相同英雄/模式/相机/尽量同帧场景。先比菜单静态布局，再比出生点，再用相同fixture看战斗。运行时FPS、计时、血条变化是动态区域，不用PNG SHA差异直接判失败。

exact的代码/资产相同仍需查黑屏/资源/遮挡；rebuild需逐项列模型比例、道路/河道、灯光、布局、字体、操作反馈差异。现有画面是程序化3D风格，不声称已达到LOL原画质。
