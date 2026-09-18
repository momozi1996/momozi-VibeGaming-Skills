#!/bin/bash
# 还原 bigfiles-split 中的大文件
set -e
cd "$(dirname "$0")"
mkdir -p .restored
cat "quanwangGame.zip/quanwangGame.zip.part-00" "quanwangGame.zip/quanwangGame.zip.part-01" > .restored/quanwangGame.zip
cat "yimoGame.zip/yimoGame.zip.part-00" "yimoGame.zip/yimoGame.zip.part-01" > .restored/yimoGame.zip
cat "npm-cache.tar.gz/npm-cache.tar.gz.part-00" "npm-cache.tar.gz/npm-cache.tar.gz.part-01" > .restored/npm-cache.tar.gz
echo "还原完成，校验 SHA-256："
shasum -a 256 .restored/*
echo "期望值："
echo "5972dc1ce3e285899ad927bc27d06ba1ee4a12d6254d7604888cb5c1f61d7601  .restored/quanwangGame.zip"
echo "aa32c3458cf0fa9884d51098b5d66233f31707f1d8364e92d2162be98ebfc73c  .restored/yimoGame.zip"
echo "d28efed94b8b1ade62ff466e9ce118cb645a1e4fed0b049eeed127a79968391b  .restored/npm-cache.tar.gz"
