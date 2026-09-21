#!/bin/zsh
cd "${0:A:h}"
if ! command -v python3 >/dev/null; then
  echo '需要 Python 3。也可在终端运行 npm ci && npm run dev。'
  read '?按回车退出'; exit 1
fi
if [[ ! -f dist/index.html ]]; then
  echo '未找到生产构建。请先 npm ci && npm run build。'
  read '?按回车退出'; exit 1
fi
PORT=4413
while lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do ((PORT++)); done
(sleep 1; open "http://127.0.0.1:$PORT") &
echo "峡谷演武：http://127.0.0.1:$PORT"
echo '关闭此终端或按 Ctrl+C 停止。'
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory dist
