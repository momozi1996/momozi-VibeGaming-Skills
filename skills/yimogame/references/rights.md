# 许可与外部资料边界

## 当前项目

本复现包由用户要求制作，包含本轮对话完成的风栖原野源代码、派生原创模型、界面与素材生成工艺。它不是原游戏官方客户端，不代表Pawprint Studio授权/认可。

品牌“伊莫/Aniimo”、艾德尔设定及Steam宣传截图属于相关权利人；本包不授予这些第三方商业权利。若对外公开/商用，确认原授权或替换品牌与第三方研究图。

## 官方资料

快照references目录来自用户给出的 `https://store.steampowered.com/app/4126040/_/` 公开API/图片和 `https://www.aniimo.com/` HTML，已记录日期、原URL、实际下载文件SHA-256。仅供设计研究，不是CC0，也不是3D资产授权。

官方图片没有作为纹理、背景、UI头像进入运行代码；dist不包含它们。

## 软件依赖

Three.js 0.180.0采用MIT，原许可证在reference-project/public/licenses/THREE-LICENSE.txt并随dist复制。Vite、Playwright及传递依赖遵循各自npm包许可证；锁定tarballs完整保留原LICENSE/NOTICE，不声称所有依赖均同一许可。

`vendor/npm-cache.tar.gz`仅将锁定公开npm包内容及缓存索引归档，未包含账号令牌、用户npm配置或浏览器状态。

## 不随包分发

Node/npm、Python、Chrome二进制、macOS/Windows系统字体和驱动。相关产品自行安装使用其许可。没有从原游戏提取模型或运行代码，没有绕过鉴权/DRM。
