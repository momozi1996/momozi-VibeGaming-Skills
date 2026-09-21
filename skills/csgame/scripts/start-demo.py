#!/usr/bin/env python3
"""Serve this project's bundled dist on localhost. No npm or network assets required."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

def serve(project, port):
    dist = Path(project).resolve() / 'dist'
    if not (dist / 'index.html').is_file():
        raise ValueError('dist/index.html missing. Restore the complete project or run npm run build.')
    if not 0 <= port <= 65535:
        raise ValueError('Port must be in 0..65535; 0 selects an available port')
    handler = partial(SimpleHTTPRequestHandler, directory=str(dist))
    with ThreadingHTTPServer(('127.0.0.1', port), handler) as server:
        print(f'COUNTERLINE ready: http://127.0.0.1:{server.server_port}/', flush=True)
        print('Keep this terminal running. Click DEPLOY TO SITE; use desktop keyboard/mouse. Ctrl+C stops.', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4410)
    args = parser.parse_args()
    serve(Path(__file__).resolve().parent, args.port)

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError) as e:
        print(f'ERROR: {e}', file=sys.stderr)
        sys.exit(1)
