> 基线参考：以下原样参数／禁改要求仅用于 exact 或同款重建。variant 可按新设计修改外观、场景和角色；数学／生命周期等工程约束仍适用。

# 六只猫咪与卡丁车

## 必须原样保持的角色表

| id | name / 中文副标题 | kart color | fur | accent | eyes |
|---|---|---|---|---|---|
| mochi | Mochi / 奶油团子 · 椰风领航员 | #81d8bd | #fff0d3 | #ff8e91 | #657d67 |
| mango | Mango / 橘子汽水 · 阳光冲浪手 | #ff956f | #eda555 | #ffdc72 | #548b7b |
| luna | Luna / 月光乌龙 · 星夜追风者 | #a7a1e5 | #393b50 | #ffdb85 | #b6c6ed |
| oreo | Oreo / 黑糖奶盖 · 海盐小队长 | #79bee9 | #333741 | #8ce0da | #c6a968 |
| sakura | Sakura / 樱花三色 · 花岛漫游家 | #eea5b5 | #ffedcf | #ee789d | #829374 |
| coco | Coco / 可可布丁 · 椰林探险家 | #e3bf85 | #dfbd92 | #6dc9be | #79cbd7 |

完整 muzzle/ear/number 值见 project-spec.json。注意 UI 自己的头像色彩不是3D角色metadata：不要把 UI 芒果头像黄底误当车辆必须黄色。

## 形体

每辆未缩放整车约宽2.53、长3.70、高3.30（XYZ约[2.53345,3.29771,3.69488]，为初始可见几何包围盒）；origin=轮胎接地位置，+Z朝前。头大身小、圆润收藏玩具感，不做方块猫和写实毛发 groom。轮子4个，猫必须真的坐在车上，双爪接近方向盘。大耳朵/内耳粉、脸颊、吻部、鼻子、胡须、眼睛高光、尾巴、花环/花饰等配件。

菜单看正脸，竞速看背部；尾巴、耳朵、配色与配件要从背面也可辨。Mochi 奶油猫+花饰，Mango 橘斑/护目风格，Luna 深色猫，Oreo 黑白猫，Sakura 三花与粉车，Coco 暖色/暹罗式面部。**想严格还原形体，必须参考原 racers.js 的 createCat / makeBody 等逐个几何坐标**；文字描述本身无法保证每个网格一样。

## 车辆工艺

圆润车壳、奶油前面板、彩色车身、侧面编号、前保险杠、双灯、尾灯、4轮胎/胎纹/轮毂、方向盘、座椅衬垫、排气筒、底盘。Mochi 默认薄荷车。避免引入悬浮赛车、摩托车或完全不同的轮径比例。

材质为 MeshPhysicalMaterial：
- chrome color#dde9e6,metalness.82,roughness.22,clearcoat.65。
- rubber #252c34,roughness.84。
- ivory #fff2d9,roughness.38,clearcoat.6。
- eye #171b28,roughness.15,clearcoat1,clearcoatRoughness.08。
- seat #eacba5,roughness.8；leather #58464b,roughness.74。

## 批次 / 动画 / 共享

原模型将静态几何通过 Sculpt 按材质焊接为批次。几何库中 sphere24×16、small sphere10×7、torus8×40、cylinder24段。单车约55–60 mesh，角色变体有差异；不要以为是55个物理刚体。

animate 包含轮胎转动、前轮转向、方向盘、呼吸/摆头、眨眼、耳朵动作、尾巴摆动、漂移车身倾斜、冲刺尾焰。time/dt必须为秒，speed为m/s。root负责世界位置/yaw，动画不能重置root使赛车不走。

多个 createKart 共享静态 geometry/material/texture。dispose 是实例级 detach，不能销毁缓存导致其他AI变黑。测试同角色创建两台、各自改变steer时不串动画。

## 提示词重点

“高质量猫咪”太含糊：用参考截图、精确角色表、车身包围盒、原几何实现共同约束。重建先单独验证六猫正面、侧面、背面，再接模拟。不要为了追求更多细节而整体变小、挡住HUD或使手机不可跑。
