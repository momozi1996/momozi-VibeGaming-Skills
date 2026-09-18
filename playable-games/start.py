#!/usr/bin/env python3
"""Serve this game locally; Python standard library only."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import argparse
p=argparse.ArgumentParser(description='Start your playable game locally')
p.add_argument('--port',type=int,default=4310)
a=p.parse_args()
if not 1024<=a.port<=65535:p.error('port must be 1024..65535')
root=Path(__file__).resolve().parent
server=ThreadingHTTPServer(('127.0.0.1',a.port),partial(SimpleHTTPRequestHandler,directory=str(root)))
print(f'Game ready: http://127.0.0.1:{a.port}  (Ctrl+C to stop)',flush=True)
try:server.serve_forever()
except KeyboardInterrupt:pass
finally:server.server_close()
