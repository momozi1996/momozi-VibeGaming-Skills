# 从完整MOBA创作变体

默认恢复成品，不先生成空src。先进入一局并验证角色移动/商店，原样复刻使用完整v0.1.1；自创题材在OUT修改，不能改skill基线后重签旧哈希。

## 联动修改表

| 目标 | 文件/符号 | 必须一起处理 |
|---|---|---|
| 沙漠/冰原/机械都市峡谷 | src/config.js: WORLD/BASES/SPAWNS/LANES/WALLS，src/world.js: buildWorld | 碰撞navigable/route、兵线与营地、出生点、建筑坐标和ui小地图；装饰墙不能与通路冲突 |
| 英雄轮廓与动画 | src/world.js: heroModel/WorldView | 朝向、攻击与技能事件、命中反馈、投影拾取半径；不是把插画当3D模型 |
| 新英雄/技能 | config.CHAMPIONS、simulation.Match.cast/skillInfo、champions.json | 四技能分支、等级/资源/CD、目标类型、world事件、ui描述与图标、键盘/点击按钮两条输入 |
| 新塔/兵/怪与数值 | config与simulation的spawnWave/protected/attack/die/step | 三路导航、建筑保护、经济与胜负；维持有限实体生命周期 |
| 新装备/成长 | config.ITEMS、Match.buy/addXp、ui.shop | 售价、条件、属性应用、背包反馈；不能只换图标而遗漏实际效果 |
| UI布局 | src/ui.js: GameUI绘制与hits | 同一canvas内坐标、缩放、命中矩形；弹层拦截、防止点穿与右键购买 |
| 控制体验 | src/controls.js、main的aimAt/targeted | 默认WASD+1–4与经典QWER并存，C切换时同步帮助和键帽；失焦释放 |
| 换音效 | src/main.js的音频生成 | 真实用户手势、静音和异常回退，不引入必需CDN |

具体机制见mechanics.md，状态接口见architecture.md。没有预制通用皮肤开关；新地图与新英雄需要真实实现。

## 美术达到完整效果的顺序

先保持原透视镜头、英雄可辨轮廓与地表路径对比；再做近景塔/兵、河道与阵营地标，最后粒子、受击反馈与HUD材质。所有菜单、技能面板和胜负界面要同一视觉体系，不只美化首屏。UI纹理重绘与3D渲染解耦，避免每帧重建几何或加载图片。

## 原创化不是换标题

本包包含Riot英雄插画、头像、技能/物品图标与原始JSON。原创发布版本需要授权替代这整组资产，维护新manifest、champions数据、文件引用、角色文案与衍生UI，并重建dist；旧public/dist/历史截图和证据仍含Riot内容，不能连原参考档案打出去却标“全原创”。Three及纹理许可证独立保留。许可详见assets-and-rights.md。

## 运行、构建和交付

在OUT `npm ci --no-audit --no-fund` 后运行dev或 `npm run build`，start-demo.py始终服务dist，务必刷新新构建。保留完整菜单→对局→升级/购买→推塔→枢纽胜负→重开链。地图/AI改变后用自然模拟对局检查仍可结束；模拟加速不是真人全程操作证明。生产版不能加入__RIFT作弊接口来通过测试。

至少验证真实出生点WASD位移、点地移动、技能、商店、暂停/失焦、三路战场和重开。交付新截图、项目/启动地址、操作及已知限制。若扩大到联网/触屏/全迷雾，明确它们原版没有、需另行实现，不因“完整单机5v5”就承诺官方MOBA功能。
