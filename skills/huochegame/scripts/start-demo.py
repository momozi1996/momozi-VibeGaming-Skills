#!/usr/bin/env python3
"""Run the bundled game on localhost. No Node/npm or network downloads."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

def serve(project, port):
    root = Path(project).resolve()
    entry = root / 'cloudline.html'
    if not entry.is_file(): raise ValueError('Game entry missing. Restore a complete project or rebuild it.')
    if not 0 <= port <= 65535: raise ValueError('Port must be in 0..65535')
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    with ThreadingHTTPServer(('127.0.0.1', port), handler) as server:
        print(f'CLOUDLINE ready: http://127.0.0.1:{server.server_port}/cloudline.html', flush=True)
        print('Keep this terminal running; Ctrl+C stops. Port 0 selects an available port.', flush=True)
        try: server.serve_forever()
        except KeyboardInterrupt: pass

if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__); p.add_argument('--port', type=int, default=4430)
    try: serve(Path(__file__).resolve().parent, p.parse_args().port)
    except (OSError, ValueError) as e:
        print(f'ERROR: {e}', file=sys.stderr); sys.exit(1)
