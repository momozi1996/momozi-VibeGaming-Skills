> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 常见失败与具体处置

| 症状 | 检查 / 修复 |
|---|---|
| 页面空白 | 先查JS/module/Shader错误与404；不要先调颜色 |
| Import找不到 | 锁文件npm ci；three/addons路径和当前版本一致 |
| file:// CORS | 使用Vite或HTTP静态服务 |
| 顶部看不见沙地/道路 | 顶点绕序+Y法线，不只是doubleSide蒙混过去 |
| 海面变成白灰板 | WebGL shader log、linear/output pass、灯光/雾，不擅自换贴图 |
| 角色朝后/转向反 | +Z车头，yaw=atan2(tx,tz)，normal=(tz,0,-tx) |
| 地图和实体偏离 | getPointAt与getPoint误混，闭环wrap与unwrapped progress混用 |
| HUD速度变成实际的3.6倍 | snapshot.speed已是km/h，仅racers[i].speed需要×3.6 |
| holding W自动过弯 | 默认误启assist；真人heading应该保留世界方向 |
| player被后车挡住 | 跟随镜头先加玩家位移，再平滑；保持原遮挡剔除 |
| 切猫后其他车变黑 | 误dispose共享geometry/material；只处理实例 |
| 道具状态有但看不到 | simulation不是renderer；main投射物/护盾mesh未同步 |
| 暂停时间在跑 | UI自己计时，或模拟pause还推进pickup/projectile |
| 重开有彩纸/油门锁死 | effects reset / keys.clear / touch release漏了 |
| 声音不响 | 第一次用户手势、AudioContext state、系统音量；不能通过强制autoplay来宣称修好 |
| 等ready超时 | waitForFunction使用rAF，在测试夹具中已冻结；用Node有超时poll+manual tick |
| 大步模拟截图镜头错 | step后至少一帧render，dt>1触发cameraSettled=false |
| Playwright navigation context destroyed | early commit后短暂重试evaluate，有限deadline；不要无限重试其他异常 |
| Chrome/Metal启动失败 | 确认已安装浏览器；换参数--browser / --angle；只macOS可用metal |
| 端口“自动换下一个” | 用--strictPort，runner预分配端口；检查读到的title确是ALOHA |
| 整机卡顿 | 检查自己遗留的headless进程；只清理本次runner拥有的pid，不杀其他项目 |
| 截图文字不同 | 缺字体/系统中文字体回退，检查fonts.css和TTF；记录平台差异 |
| npm install改lock | exact使用npm ci；恢复锁文件后重装，不静默接受最新版 |

原renderer.info的fps是动画dt累积值，帧间dt被clamp；测试还会固定时间。**不能以该字段单独证明真实硬件吞吐率**。测性能需正常rAF、实际wall-clock/GPU工具、注明设备。
