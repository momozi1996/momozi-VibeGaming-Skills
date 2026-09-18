# 09｜独立skill文件地图

本文件相对于SKILL.md的根目录，不需要原quanwang-note的外层文件。

```text
quanwanggame/
  SKILL.md / AGENTS.md / agents/openai.yaml
  MANIFEST.sha256.json                全包清单
  prompts/                           完整复刻、分阶段、重写、验收与改造
  references/                        玩法、美术、战斗数据、依赖环境和源文件清单
  scripts/
    game.py                          全包校验；create/play一键生成运行
    materialize.py / verify.py        原工程恢复和分范围哈希校验
    install-offline.mjs               离线安装85个锁定tarball中的适用依赖
    run-checks.mjs / capture.mjs / compare-images.py
  assets/
    reference-project/               完整源码、public、dist、tests、tools、docs、启动器
    baseline/                        原始参考截图/历史报告
    npm-tarballs/                    离线npm包及manifest
```

## 原工程入口

- `src/main.ts`：初始化、菜单、输入/时钟/渲染编排。
- `src/combat/{types,Match,FixedLoop}.ts`：数据结构、权威战斗状态、固定60Hz。
- `src/input/{KeyboardInput,CommandBuffer,CPU}.ts`：按键/触控、指令与CPU。
- `src/fighters/{definitions,FighterFSM}.ts`：人物数值与动作状态机。
- `src/collision/boxes.ts`：判定框。
- `src/animation/Animator.ts`：动画时序与固定根锚点。
- `src/rendering/Renderer.ts`：Pixi渲染、场景、角色和反馈。
- `src/audio/AudioSystem.ts`、`src/ui/{UI.ts,styles.css}`、`src/debug/DebugView.ts`。
- `public/assets/`：角色PNG/JSON/头像，街景PNG、OGG音效、图标和许可。
- `tools/prepare-assets.py`与`tools/source-cache/`：原GIF/ZIP和导入工艺。
- `tools/{browser-test,refresh-test}.mjs`、`tests/*.test.ts`：实际验证。
- `docs/ASSETS.md`、`docs/asset-manifest.json`、`docs/licenses/`：来源及权利。
- `package-lock.json`与`dist/`：锁定开发依赖与直接可玩的成品。
- `start-demo.py`：以dist为根绑定本机HTTP，随机空闲端口或显式端口。

原`.gitignore`忽略dist/source-cache是历史Git习惯，不代表交付时可以删除它们。恢复后evidence中的新报告与skill的历史baseline分开。
