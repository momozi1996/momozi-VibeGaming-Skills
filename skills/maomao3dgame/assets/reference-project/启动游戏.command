#!/bin/zsh
cd "$(dirname "$0")"
if ! command -v npm >/dev/null 2>&1; then
  echo '需要先安装 Node.js（包含 npm），然后重新打开本文件。'
  read -r '?按回车退出'; exit 1
fi
if [ ! -d node_modules ]; then
  npm ci --no-audit --no-fund || exit 1
fi
npm run dev -- --open
