# 10 · 素材完整性与许可

## 实际资产分类

| 素材 | 实体路径 / 生成入口 | 使用方式 |
|---|---|---|
| Three.js r160 | assets/reference-project/src/three.inline.js | 可直接复制内嵌；MIT声明在LICENSE.txt和HTML |
| 全世界几何 | game.js 的island/house/tree/lighthouse/makeDock/platform | 可执行程序化源，不是远程资源 |
| 铁路 | controlPoints/frame/tubePath/railway生成段 | 同轨道数据给车与镜头使用 |
| 电车 | makeTram/archGeometry | 返回动态部件，不导入模型 |
| 乘客与Oliver | resident/passengerModels | 基本体、衣色、帽子与行李变体 |
| 工坊 | workshopScene/workStatic/workTram | 独立场景，复用造型函数 |
| 牌匾 | textureLabel/sign | CanvasTexture，系统Georgia字体 |
| 窗户、灯、海天云 | M.glow、ShaderMaterial、cloudGeo | 材质与顶点，不需贴图文件 |
| 光晕 | glowTexture/halo | 内存Canvas渐变sprite |
| 轨声、电机、铃 | initAudio/tone/playBell/updateAudio | WebAudio振荡器，无mp3 |
| UI | src/shell.html + src/style.css | CSS、文字、Unicode符号，无图标库 |
| 原版截图 | screenshots/01..10 | 参考素材，不能铺底冒充游戏 |
| 固定状态截图 | assets/canonical | 新制作、参数见metadata.json |

原版文件SHA-256完整清单见`assets/baseline-manifest.json`；包自身清单另在`SKILL-MANIFEST.json`。没有GLB/FBX/OBJ/Blender文件，不生成空文件假装素材齐全。

## 版权说明

Three.js使用其已有MIT许可证，保留作者与许可文本。本项目模型、场景、UI、程序音效为此次生成代码；未拷贝吉卜力/塞尔达实际美术、角色、音乐或商标资产，不给这些原作素材虚构授权。

新复现包工具、说明和原项目输出不重新冒充第三方项目；保留原LICENSE.txt。若你额外引入字体/图片/模型，必须另记来源和授权；exact模式不引入新外部素材。

## 查看素材的正确顺序

先开HTML→看截图→读相关生成函数与数值表。程序化模型不一定能直接拿到独立3D软件里；如果你想导出GLB/OBJ，那属于后续任务，不是本包宣称已附的资产。
