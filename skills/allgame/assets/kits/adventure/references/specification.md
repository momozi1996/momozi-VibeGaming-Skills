> 基线参考：exact 保持原参数；variant 可改变美术、场景、角色和任务，遵循新设计合同。下文“不改”指原样复现，不限制创作；旧历史测试不代表本轮通过。

# 冻结实现规范

**真值优先级：实际基准文件与成品素材 → 基准测试/受控截图 → 本文摘要。** 本文参数来自本包源码，不是原版魔兽地理/任务事实。需要完整细节时直接读 `assets/reference-project/src/`，不要反向猜测。

## 结构

| 文件/目录 | 职责 |
|---|---|
| `index.html`、`src/main.ts` | HTML载体、样式与游戏入口、顶层加载错误 |
| `src/app/game.ts` | 渲染初始化/循环、资源门禁、系统组装、动作路由 |
| `src/core/math.ts` | clamp、lerp、距离、最短角度插值、带种子随机 |
| `src/core/state.ts` | 存档域、状态事件、受伤/治疗/升级、任务进度 |
| `src/core/input.ts` | 键盘/鼠标，不直接判定战斗 |
| `src/world/terrain.ts` | 共用高度函数、纹理地形、道路 |
| `src/world/materials.ts` | 纹理/法线/透明裁切参数 |
| `src/world/geometry.ts` | box/quad/tube/cylinder构件及按材质合批 |
| `src/world/abbey.ts` | 多翼修道院、屋顶、尖拱、彩窗、碰撞体 |
| `src/world/vegetation.ts` | 带种子植物布置、thin instances、树干障碍 |
| `src/world/props.ts` | 旗帜、灯、栅栏、马车、道路设施等 |
| `src/actors/actor.ts`、`player.ts` | GLB实例/动作、角色移动/跳跃/相机跟随 |
| `src/data/content.ts` | 全部技能/NPC/狼/草药/任务中文文案 |
| `src/gameplay/combat.ts` | 目标、技能、AI、掉落、再生 |
| `src/presentation/audio.ts`、`effects.ts` | 环境音/音效、特效与选中反馈 |
| `src/ui/ui.ts`、`minimap.ts`、`style.css` | HUD、弹窗、动态地图、布局 |

## 视觉基准

第三人称、全屏世界、不添加网站导航或着陆页。主角位于下方中央，修道院位于中上，树林包围庭院。主视觉是**浅灰石墙 + 暖红瓦顶 + 绿金树林 + 蓝布金属战士 + 皮革/羊皮纸UI**。

### 场景与建筑

- 世界水平轴XZ，Y高度统一用 `heightAt(x,z)`；地形创建宽240、深250、细分160，z偏移8，顶点缓冲必须 `updatable:true`。
- 角色范围x[-70,70]、z[-88,60]；建筑碰撞为矩形+裕量、树干为圆，不是动态刚体系统。
- 建筑主堂block参数 `(x,z,w,d,h)=(0,24,13,31,11.7)`；屋檐12、坡顶高差7.2。
- 西翼 `(-12.1,26,10.8,23,7.4)`；东翼 `(12,29,10.8,17,6.5)`。
- 钟塔 `(-8.3,36.2,8,9,20.2)`，上层小塔与金属十字继续向上；入口门廊 `(0,6.7,9.5,4.6,9.2)`。
- 保留双坡/横向屋顶、四坡钟塔、檐线、扶壁、齿饰、阶梯、12块木门板与门环、尖拱与窗棂、16辐条玫瑰窗；不能仅用贴了石纹的一个大立方体代替整座建筑。
- 植被种子417；同种子但改变随机调用顺序仍会改变布局。树/草/花要保留透明纹理卡片与thin-instance方式。
- 环境建筑多数用 StandardMaterial + diffuse/normal，**不是每件物体都使用完整PBR通道**；glTF角色使用PBR/HDR。成品中有留存但未接入的roughness贴图，不能为了“更高级”在exact里改材质体系。

### 镜头与照明

| 项 | 固定值/规则 |
|---|---|
| 相机 | ArcRotateCamera；alpha构造为-π/2，标题流程后为-π/2+0.025；beta1.48；radius10.8；fov0.95 |
| 限制 | beta[0.38,1.54]；radius[4,23]；minZ0.12/maxZ340 |
| 跟随 | 目标=玩家位置+(0,1.7,0)，Lerp dt×10；setTarget必须保留alpha/beta/radius |
| 天空 | 直径600背面球+sky.jpg，vScale=-1/vOffset=1，非纯色背景 |
| 雾 | EXP2；density0.008；RGB(0.53,0.62,0.56) |
| 曝光/对比 | 1.08 / 1.09；toneMapping=true、type1 |
| 环境 | forest.hdr→HDRCubeTexture(size64)，environmentIntensity0.65 |
| 半球光 | intensity0.93；diffuse(0.87,0.94,0.96)；ground(0.38,0.42,0.25) |
| 太阳 | direction(-0.65,-1,0.47)，position(48,68,-35)，intensity1.85，diffuse(1,0.94,0.8) |
| 阴影 | 2048、PCF中质量、bias0.0015、normalBias0.025、darkness0.18 |
| 后期 | FXAA；SSAO2半分辨率、radius1.8、strength0.85、samples8、maxZ100 |
| 渲染缩放 | max(1,devicePixelRatio/1.2)，不要以改变DPR冒充优化 |

灯光、纹理色空间、曝光的组合会影响全部画面；首先保留原参数，再通过截图判断实现错误。

## 移动、动作、输入

- 初始(0,-27)，复活(0,-15)；走路4.6/s，Shift6.3/s，跳跃初速6.2、重力17；对角输入归一化。
- 建筑移动阻挡额外裕量0.35；树干r+0.32；XZ分别尝试，使玩家能沿墙滑动。
- 入口台阶额外高度来自player.ts同一区间，不能把所有高度改成0。
- 战士GLB含1个skin和6段骨骼动画，采用基准Actor命名/锁定行为；暂停时也暂停骨骼，不只是停止状态时间。实际狼GLB没有skin/动画，狼AI仍控制位置/朝向/伤害状态；Actor找不到动作时返回。不能把生产脚本写过动画当作成品包含动画。见references/materials/MODEL-METADATA.json。
- WASD/方向键移动；空格跳；鼠标拖动环绕，滚轮缩放；小于5像素的左键释放视为选中点击。
- Tab切目标；1/2/3/4技能；E交互；其他窗口/摄影快捷键以Game.key与UI说明为准，不自行改键。
- Esc处理优先于input/select焦点过滤；blur清空按键和拖拽状态；不让页面滚动干扰玩法。

## 数据与玩法

### 固定坐标

| 对象 | X | Z |
|---|---:|---:|
| 修道院守卫guard | -4.8 | -7 |
| 修道院军需官quartermaster | 10.1 | -3.8 |
| wolf-1 | 30 | -20 |
| wolf-2 | 40 | -31 |
| wolf-3 | 48 | -17 |
| wolf-4 | 35 | -39 |
| wolf-5 | 53 | -30 |
| herb-1 | 29 | -23 |
| herb-2 | 42 | -25 |
| herb-3 | 32 | -34 |

任务「林地的骚动」：`available → active → return → complete`。同时3狼+2宁神花才进入return；奖励80经验、15铜、2瓶药水，不能重复领奖。具体中文段落全部读取content.ts，不使用AI再润色。

### 技能与战斗

| 键/ID | 规则 |
|---|---|
| 1 attack 英勇打击 | 自动攻击开关，实际挥砍间隔1.05秒，18伤害，+12怒气；近战命中距离<3.15 |
| 2 shield 盾牌猛击 | 24伤害，15怒气，6秒CD，2秒stun；选中目标距离≤3.3 |
| 3 whirl 旋风斩 | 38伤害，25怒气，8秒CD；先检查选中目标，再命中周围<3.8敌人 |
| 4 potion 治疗药水 | 55回血，12秒CD；数量-1；满血/无药不消耗；背包暂停时也可使用 |

- 狼最大生命70；击杀30经验；每具尸体只能拾取一次3铜。
- Tab选45范围内活狼，并按距离排序循环。
- 狼警戒7.8，家距<19才追；追速2.65，近距2.0时每1.75秒造成10伤害；巡逻速度0.7。
- 尸体15秒后隐藏；死亡55秒且玩家距出生点>12可重生。
- 脱战9秒后每秒回2.5生命；12秒后怒气每秒减3；受击+伤害×0.6怒气，上限100。
- 军需官补满生命并使药水至少3。死亡不清任务、等级和奖励。

## 状态、保存、暂停

`SaveData`：version1、level/xp/hp/gold/potions/herbs/kills、quest、position{x,z}、elapsed。key=`northshire.save.v1`；初始level1/xp0/hp100/gold0/potions3/herbs0/kills0。

- maxHp=100+(level-1)×20；xpGoal=level×100；最多3级；升级满血。3狼90xp+交任务80xp→2级剩70xp。
- parseSave拒绝损坏JSON、未知version/stage、非有限/负数；数量与坐标限幅；localStorage抛异常不崩溃。
- 不把引擎对象、DOM、相机或临时敌人对象塞进存档。
- 模态窗口/页面后台/摄影停止玩法时间；摄影仍可转镜头，PNG来自真实世界canvas，不是预置图片。
- 重置要确认；先令started=false避免beforeunload再保存，再删存档并刷新。
- 画质/音量在当前实例里重开设置保留；不要凭这个推断所有设置都跨刷新持久化。

## UI

保留标题/加载/错误、左上肖像与生命怒气、目标框、右上圆小地图、右侧任务追踪、底部4技能与快捷窗口、经验条、日志、交互提示、伤害数字、死亡复活、地图/背包/任务/设置/授权面板。

皮革用ui-hide.jpg，羊皮纸用parchment.jpg，技能用实际PNG，边框用Kenney九宫格。CSS渐变/颜色用于状态条和覆盖效果，不以纯色块替代美术。地图为动态Canvas绘制+纹理/树图标，不是无交互静态截图。

中文字体依次使用本机NorthshireSerif/Songti SC/SimSun等；没有随包附带商业字体，不承诺跨操作系统字形度量相同。精确尺寸、z-index、响应式规则直接看style.css/index/UI。

## 测试接口

仅 `import.meta.env.DEV && URL带?test=1` 暴露 `window.__northshire`：game、state、teleport、snapshot、select、damage、camera。完整形状以game.ts为准。新的rebuild要兼容基准测试；生产同参数仍无debug。

## 明确不包含

联机/服务器、账号、修道院室内、原版全部地形比例、完整职业技能、商业游戏级动作、移动端承诺。复现这些未实现的内容不在本任务范围。
