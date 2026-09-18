# 08｜复现常见错误与处理

| 症状 | 首先检查 | 正确处理 |
|---|---|---|
| 仍然是旧宣传网页 | 是否误用旧截图、旧dist、浏览器旧tab | 确认v2来源；core校验；build；访问副本新端口，必要时强刷 |
| 角色像马赛克 | 是否恢复ava-lee旧图集；REN是否resize到73×76 | 直接用public/assets高清PNG/JSON；不要用blur处理低清 |
| 裁帧后人物抖动 | 是否每帧bbox居中作为锚点 | 用frames.bounds转anchor，共享sourceRoot；不是atlas等格切片 |
| 击中判定先于/后于画面1帧 | age在tick末推进、Animator独立走时钟 | tick开头age++，新攻击age0；绘制和碰撞读同age |
| U在重拳命中停顿时失效 | 缓冲用真实frame寿命 | 用停顿时不增长的commandFrame；先录入再Hitstop return |
| 只能P1命中，不能同帧相杀 | resolve写伤害太早 | 先收集双向contacts和guard，再统一resolve |
| 一个特殊动画多次扣血 | 丢了connected/serial | 每次出招清connected，接触后设置；投射物hit即移除 |
| 特效有但角色不动 | 菜单状态、FixedLoop暂停、图片加载失败 | 看__ready和menu/phase；控制台/网络404；不要凭截图判断玩法 |
| 高清屏仍糊 | backing canvas还是960×540 | resolution取最终CSS宽/960×DPR；而非仅devicePixelRatio |
| 竖屏场景上下留黑 | 16:9 letterbox原本如此 | 保留完整世界，不伸高、不裁对手；建议横屏 |
| 390宽触控溢出 | 按钮尺寸/间隙被网页样式覆盖 | 恢复≤500和≤380媒体查询 |
| 所有assets 404 | file://或服务器根目录错误 | 用start-demo.py服务dist；开发用Vite；只支持站点根路径默认部署 |
| npm安装去联网/失败 | 用了npm install / 更新锁文件 | 使用附带install-offline.mjs；核验lock与tarballs SRI |
| esbuild/rollup平台错 | 复制了原机器node_modules | 删除的只能是自己输出的依赖目录，重新npm ci；使用附带跨平台tarballs |
| Chrome executable missing | 没装Google Chrome | 如实记录前置条件；先单测/构建/预编译运行，安装Chrome后重测 |
| 测试通过但新项目打不开 | 测到了旧5196/5197进程 | 用run-checks.mjs隔离随机端口；报告必须写对应目录 |
| 字标粗细/宽度不同 | 系统Impact是否存在 | 同系统字体比较；不添加不明字体或把差异伪称100% |
| 初始选人没有音效 | AudioContext未解锁 | 首次开始后才可响是目标逻辑；不能绕过浏览器权限 |
| K.O.没有喊声 | 源声音根本没有该独立文件 | 保留文字/合成音，不从商业游戏抓声音 |
| 素材重导入hash不同 | Pillow/zlib压缩版本 | 严格恢复用已导出的PNG；像素可另比，不重写基准 |
| 头像槽看起来小 | 它是游戏选择光标，不是立绘商品卡 | 不重新放大成网站卡片；左右动画才是人物主展示 |
| 对比雨线位置随机不同 | 两个时钟和CSS animation没停 | 用capture.mjs，不用waitForTimeout随机截图比像素 |

## 已知实现边界，不要在复现阶段“偷偷修”

- 角色精灵仍有原作者的像素笔触和有限色阶，不是商用逐帧高清重绘。
- 受击框按状态+招式阶段近似，不逐像素跟随整个轮廓。
- 按键Tab在输入模块被阻止，部分UI键盘可访问性不是完整标准；严格复制阶段保留，改进可单独记录。
- 场景/角色root没有联网插值，低刷新设备显示与60Hz模拟不同；不保证所有设备锁60渲染FPS。
- 当前CPU、guard、投射物等为原型规则，不擅自加入格斗大师级AI或商业规则。

发现真实运行缺陷先最小修复并记录与冻结版本差异；目标是复现既有项目，功能升级另建分支。

## 浏览器自动图标探测

冻结项目未提供favicon.ico。本轮Python服务日志出现浏览器自动请求`/favicon.ico`返回404；原有Playwright响应监听未计入这条浏览器自身探测。它不是游戏引用的素材，人物/背景/音频/JS均成功加载，页面异常为空。此非游戏资源404保留为原版本边界，不虚报HTTP日志绝对零404。若要消除，可在输出副本加一个自制图标并记录非玩法差异。
