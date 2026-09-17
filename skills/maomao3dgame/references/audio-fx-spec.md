> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 音乐、音效与粒子

## 粒子

createEffects(scene) 不新增灯光。5组池化draw batch，最多约1344粒子/实例。沙尘、蓝/粉漂移火花、橙/青冲刺尾迹、拾取喷点和终点彩纸。只用标准Three材质，没有这层自定义shader。

从racer的position/yaw/speed/drift/boost/driftCharge/driftTier取状态。玩家发射强度大于AI，车辆前进+Z，尘土/尾焰须从后方发射而不是前方。

事件type为reset/restart/menu时立即清池和emitter。暂停不更新，完赛继续更新才能看到彩纸。多数对象复用，不能每帧new几百Mesh。原实现包含自生成soft/star粒子纹理，属于程序素材。

## WebAudio

createAudio()接口含unlock/update/event/setMuted/dispose。合成原创五声调性拨弦/轻打击/海浪底噪，以及引擎/漂移/冲刺/金币/倒计时等。没有外部mp3/版权歌曲，不需要音频下载。

26个瞬态voice slot + 5 persistent sources；有限voice池避免无限AudioNode堆积。master有动态压缩，music/sfx/vehicle/ambience分bus。基本gain .42/.58/.26/.18（各自还会乘master和状态包络），不是让所有声音相加到最大。

只在可信手势后create/resume AudioContext。setMuted不能绕过浏览器策略。hidden tab挂起，用户再手势恢复。暂停压低/消除车辆声音，可保留较小音乐。

Audio基于AudioContext时间，不应随着固定截图工具的performance.now伪时钟假装真的播了音。自动化能检验接口和静音状态，**必须人工试听才能确认听感**。

## 精确复现怎么做

直接保持audio.js/effects.js，旋律、envelope、颜色、池容量都在其中。文字“夏威夷音乐”不足以还原原旋律。如果是blind重建，功能/风格可以评估，不能承诺波形逐采样相同。
