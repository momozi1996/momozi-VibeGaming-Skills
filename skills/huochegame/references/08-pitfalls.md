# 08 · 原项目实际踩坑与复现排查

| 现象 | 原因 / 修正 |
|---|---|
| 初始化报Cannot access state before initialization | 世界中的码头函数与玩法停靠都叫dock，同名声明提升覆盖。码头用makeDock，状态停靠用dock，不在state建立前调用玩法函数。 |
| 岩岛几乎黑色、像倒锥阴影 | 合批丢失vertexColors的color attribute。必须复制顶点color，缺失时填白；同时检查法线和三角顶点顺序，不靠曝光把整场景漂白。 |
| 岩壳外面缺面/反光异常 | 索引顺序需(a,b,c,b,d,c)，检查外法线。 |
| 手机横转竖后布局仍844px宽 | renderer.setSize默认写inline canvas尺寸，触发移动layout viewport缩放循环。用documentElement clientWidth/clientHeight且第三参false，让CSS控制画布。 |
| 自动触摸第一次没按上 | 测试在加载遮罩淡出前开始；等#loading detached，而不是删真实按键断言。 |
| 复制渲染代码人物不能走向门 | 居民被batchStatic吞掉；动态对象独立组。 |
| 玻璃像灰板，看不到人 | opacity/depthWrite/双面和排序不对；参考.19透明、depthWrite=false，窗框与玻璃分开。 |
| 车轨速度时快时慢 | 用了getPoint而非getPointAt；控制点参数并非弧长。 |
| 弯道侧倾反转/上坡鼻子朝下 | 坐标基r=(t.z,0,-t.x)、n=t×r；车头+Z、pitch=-asin(t.y)，不要照搬另引擎手性。 |
| 到第二站后永远不返程 | distance误取模或legEnd没加下一圈；total distance保持单调。 |
| 大力驶过车站也拿+75 | 未区分高速越线安全制动；先置broken再结算，正常奖励只在实际开门时发生一次。 |
| 进工坊回来重复拿车费 | 工坊恢复docked不能再次调用奖励；rewarded与开门事件同属state。 |
| 暂停时门仍在开、钱在加 | setTimeout驱动玩法；改为统一simulation时间。CSS过渡与声音需定义暂停行为。 |
| 重开后踩着油门 | resetInput漏了DOM按下态/blur/lostcapture；所有退出路径清输入。 |
| 用图片差分发现大量差 | 先对齐视口、DPR、时间、相机、存档、平台字体，别直接随机调材质。 |
| Linux Chrome启动失败 | 不要强制Metal；CHROME_PATH需指向真的Chrome可执行文件。工具自动只在macOS使用Metal。 |
| UI数字等于报告但车没走 | 测试适配伪造了state；回归必须访问实际render/physics同一对象。 |

## 原版仍应披露的限制

snapshot、UI和动画不是高级交通物理系统。世界渲染以可运行为目标，有少量装饰桥架和远岛视觉简化。车顶第一阶段没有单独叶片，窗户为近似玻璃，下车无完整寻路。未经用户要求不要“修复”成另一个画风后还宣称1:1。

当文字规范与冻结代码不一致时，exact以文件为准，rebuild以冻结成品可观察行为为准，差异列入报告。
