# 许可说明（分层授权）

本仓库采用**分层授权**：不同内容适用不同许可，请按内容类别确认。任何文件未在
其所在目录或本文件明确授权前，不视为授予使用、修改或再分发权利。

---

## 第一部分 · 自有代码与原创内容（MIT 许可）

以下内容由仓库维护者原创，依据 **MIT License** 授权（Copyright (c) 2026
<你的姓名 / 组织名>），用户可自由使用、复制、修改、合并、发布、分发、再许可及
出售副本，前提是保留上述版权声明与许可文本：

- `skills/*` 下由本仓库编写或生成的技能指令、脚本、说明文档
- 各包中**标记为原创**的程序化几何、贴图、字体、合成声音与工具脚本
- 根目录的打包工具、校验脚本、CI 配置、贡献/安全说明

```text
MIT License

Copyright (c) 2026 <你的姓名 / 组织名>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 第二部分 · 随包第三方内容（按各自许可）

以下内容不属于 MIT，适用其各自附带或引用的许可，请在使用前阅读对应文件：

| 包 | 内容 | 许可依据 |
|---|---|---|
| moshougame / survivorgame / towerdefensegame / platformgame / farmgame / csgame / huochegame | 工程源码与素材 | 各自 `assets/**/LICENSE`、`THIRD_PARTY.md`、`references/rights.md` |
| maomao3dgame / yimogame / quanwanggame | 原工程源码、字体、依赖 | 各自 `references/provenance.md`、`references/rights.md` 及捆绑依赖的 LICENSE |
| 全部包 | 第三方 npm 依赖 | 各包 `package-lock.json` 对应 LICENSE / NOTICE |

> 未单独授权的内容**不能**从"文件随包存在"或"部分文件为 MIT"推导出授权。

---

## 第三部分 · 明确不在 MIT 授权范围内

以下内容**不随第一部分授权**，禁止未经权利人许可进行商用、再分发或二次创作：

1. **wangzhegame（峡谷演武）** 中的英雄插画、头像、技能/装备图标、JSON 及任何
   Riot 专有内容与派生素材 —— 仅供本地演示与学习，不构成 Riot Games 的任何授权。
2. 各包内的**研究参考图 / 官方截图**（如 abbey-gameplay、Steam 图、官网保存页等）。
3. **游戏品牌、人物、世界观名称**（如 CS / Counter-Strike、Riot / 英雄联盟 等商标）。

---

## 维护者待办（公开冻结前必须完成）

- [ ] 在"第一部分"填入真实版权名（姓名或组织）
- [ ] 逐一确认自有源码/美术/文档的权属，删除任何非自有内容
- [ ] 为 yimo / quanwang / maomao 原工程补齐或移除来源不明的素材与参考图
- [ ] 决定 wangzhegame 等致敬包是保留（并显著标注演示性质）还是从公开版移除
- [ ] 处理文档中的机器路径 / 历史元数据后，再发布正式版本

---

*本文件不构成法律意见。具体使用范围以权利人实际授权及适用法律为准。*
