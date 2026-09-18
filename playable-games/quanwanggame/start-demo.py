#!/usr/bin/env python3
"""Run the prebuilt Demo without Node.js or npm. Python 3 standard library only."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
import argparse, webbrowser
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);parser.add_argument('--no-open',action='store_true');args=parser.parse_args()
root=Path(__file__).resolve().parent/'dist'
if not (root/'index.html').exists():raise SystemExit('Missing dist/. Run npm run build first, or use the complete release ZIP.')
server=ThreadingHTTPServer(('127.0.0.1',args.port),partial(SimpleHTTPRequestHandler,directory=str(root)))
url=f'http://127.0.0.1:{server.server_port}'
print(f'NEON IMPACT / 霓虹对决\n{url}\nCtrl+C to stop.',flush=True)
if not args.no_open:webbrowser.open(url)
try:server.serve_forever()
except KeyboardInterrupt:server.server_close()
