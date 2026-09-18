#!/usr/bin/env python3
"""Verify this independent skill, or create and play its complete frozen game."""
from pathlib import Path
import argparse, hashlib, json, subprocess, sys
KIT = Path(__file__).resolve().parents[1]

def verify():
    seal = KIT / 'MANIFEST.sha256.json'
    entries = json.loads(seal.read_text())['files']
    bad = []
    for rel, meta in entries.items():
        p = KIT / rel
        if p.is_symlink() or not p.is_file() or p.stat().st_size != meta['bytes'] or hashlib.sha256(p.read_bytes()).hexdigest() != meta['sha256']:
            bad.append(rel)
    actual = {p.relative_to(KIT).as_posix() for p in KIT.rglob('*') if p.is_file() and p != seal and p.name != '.DS_Store'}
    bad.extend(sorted(actual - entries.keys()))
    if bad:
        raise RuntimeError('Package differs: ' + ', '.join(bad[:30]))
    print(f'PASS: {len(entries)} package files intact', flush=True)

def port(text):
    n = int(text)
    if n != 0 and not 1024 <= n <= 65535:
        raise argparse.ArgumentTypeError('port must be 0 (automatic) or 1024..65535')
    return n

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('verify')
    for command in ('create', 'play'):
        p = sub.add_parser(command)
        p.add_argument('--out', required=True)
        if command == 'play':
            p.add_argument('--port', type=port, default=4496)
    args = parser.parse_args()
    try:
        verify()
        if args.command == 'verify':
            return 0
        subprocess.run([sys.executable, str(KIT/'scripts/materialize.py'), '--dest', args.out], check=True)
        if args.command == 'play':
            project = Path(args.out).expanduser().resolve()
            subprocess.run([sys.executable, str(project/'start-demo.py'), '--port', str(args.port), '--no-open'], check=True)
    except KeyboardInterrupt:
        return 130
    except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as e:
        print(f'ERROR: {e}', file=sys.stderr)
        return 1
    return 0

if __name__ == '__main__':
    sys.exit(main())
