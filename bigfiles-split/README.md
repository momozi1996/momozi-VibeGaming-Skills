# bigfiles-split 大文件分片说明

因 GitHub 单文件 100MB 限制，以下 3 个原始文件无法直接入库，已按 90MB 分片存放在本目录各子文件夹中。

## 还原方法

```bash
cd bigfiles-split
bash restore.sh   # 生成 .restored/ 目录，内含还原后的原始文件
```

## 文件清单与校验（SHA-256）

| 原始路径 | 大小 | SHA-256 | 分片 |
|---|---|---|---|
| quanwangGame.zip | 165MB | 5972dc1ce3e285899ad927bc27d06ba1ee4a12d6254d7604888cb5c1f61d7601 | 2 片 |
| yimoGame.zip | 163MB | aa32c3458cf0fa9884d51098b5d66233f31707f1d8364e92d2162be98ebfc73c | 2 片 |
| skills/yimogame/vendor/npm-cache.tar.gz | 134MB | d28efed94b8b1ade62ff466e9ce118cb645a1e4fed0b049eeed127a79968391b | 2 片 |

还原后请用 `shasum -a 256 -c` 校验与上表一致。
