# 素材与授权审计

核查与下载：2026-09-18。完整来源 URL、原页、作者、SHA256 见 `asset-manifest.json`；运行时复制为 `/assets/credits.json`。

| 素材 | 作者 | 授权依据 | 本项目处理 |
|---|---|---|---|
| Generic Woman for Fighting Games (Stardrinkers Style) | Puffolotti | OpenGameArt 原页明确 CC0，原页保存于 `licenses/ava-hires-source-page.html` | 替换原低分辨率 Ava Lee 图集；保留 246×254 原帧像素，只裁透明边并记录固定根锚点；绿色上衣调色为绯红；游戏别名 AVA / 赤燕 |
| Mustermann 2 Karate | Puffolotti | OpenGameArt 原页明确 CC0 | 从 229×238、997 帧动画 GIF 中选择动作；不再降采样，保留原像素并在渲染时匹配人物高度；游戏别名 REN / 玄武 |
| Streets of Fight | ansimuz / Luis Zuno | OpenGameArt 原页 CC0，包内 public-license.txt 允许修改再分发 | 读取原始 Aseprite 图层，只导出街景/道路/道具；不用该包中不完整的敌人充数 |
| Impact Sounds | Kenney | 包内 CC0 License.txt | 拳击、落地声音，保持原文件 |
| Voiceover Pack Fighter | Kenney | 包内 CC0 License.txt | Round / Fight / 胜负等播报；原包没有独立 K.O. 语音 |
| Game Icons Fighter Expansion | Kenney | 包内 CC0 license.txt | 拳脚图标，预留可复用图标文件 |

源码中原创界面布局、程序粒子、合成节拍不模仿现有歌曲；本项目作者新增的这些美术/音乐表达部分以 CC0-1.0 提供。系统字体来自用户设备，不随包分发。PixiJS/Vite 等软件依赖采用各自的软件授权，不作为“CC0 美术素材”宣称。

## 核查原则

- “免费”≠ CC0，站点名也不等于授权。Game-Icons.net 默认 CC BY 3.0，因此本项目改用 Kenney 的 CC0 图标包。
- 不使用 Unsplash/Pixabay 图片，因为没有确认所需图片的 CC0 依据；不把其自有许可冒充 CC0。
- 不使用 KOF/SNK 拆包精灵或原声。许可证声明不会自动消除第三方权利，因此不选择明显对应现成知名人物的 Armin 资源。
- 本次原文件下载成功且 ZIP 验证通过，不等同于全国网络长期稳定性验证；全部素材本地打包，同源交付消除运行时的外站依赖。
- 保留原包的授权文本。角色图集原页授权证据保存于 `docs/licenses/`。

## 判定资料

- https://www.dustloop.com/w/Hitboxes ：攻击/受击/推挤框、扩展受击框、同帧相杀。
- https://www.dustloop.com/w/Using_Frame_Data ：启动/有效/恢复、不同启动帧记数约定。

以上用于核对通用格斗概念，不是本作招式参数的来源，更不是 KOF 原始判定框。

## 角色清晰度更新

- 旧版 AVA 站姿人体约 46 像素高；新版 CC0 替代素材约 144 像素高，外观也有所变化。
- REN 恢复原素材约 152 像素高的人体细节，删除了先缩小至 73×76、再 4 倍放大的导入步骤。
- 两者均按约 184 个逻辑像素的人体高度绘制（约 1.28× / 1.21×），未使用 AI 补绘或模糊滤镜。
- 透明裁边仅用于打包；每帧记录源坐标系中的 bounds/root，避免裁边引起脚底漂移。图集 2px 留白防止纹理串色，均小于 4096×4096。
- 高分辨率角色纹理用线性采样处理非整数缩放；背景仍为最近邻像素画。最终画布按 CSS 显示尺寸 × DPR 分配，渲染分辨率上限为逻辑尺寸的 4 倍，避免超大屏占用过多显存。
- 源 GIF 本身的像素化笔触、色阶和轮廓仍然存在；这次修复的是丢失源细节与错误缩放，不宣称提升为商业级高清重绘。
