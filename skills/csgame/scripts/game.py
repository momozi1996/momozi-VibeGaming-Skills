#!/usr/bin/env python3
"""Restore and play the complete Counterline FPS without npm. Standard library only."""
import argparse
import importlib.util
from pathlib import Path
import shutil
import sys
import tempfile
sys.dont_write_bytecode = True
import repro

KIT = Path(__file__).resolve().parents[1]

def create(value):
    repro.verify()
    raw = Path(value).expanduser()
    out = raw.resolve()
    if raw.is_symlink() or out.exists():
        raise ValueError('Output must not exist; refusing to overwrite. Restart existing projects with start-demo.py.')
    if out == KIT or KIT in out.parents or out in KIT.parents:
        raise ValueError('Output must be outside the skill and its ancestors')
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f'.{out.name}-stage-', dir=out.parent) as staging:
        stage = Path(staging) / 'project'
        shutil.copytree(repro.BASE, stage)
        shutil.copy2(KIT / 'scripts/start-demo.py', stage / 'start-demo.py')
        errors = repro.check(stage, repro.entries(repro.MANIFEST))
        if errors:
            raise ValueError('Restored files differ from baseline')
        out.mkdir()  # Reserve atomically; a concurrent creator must never be overwritten.
        try:
            for child in stage.iterdir():
                shutil.move(str(child), str(out / child.name))
        except Exception:
            shutil.rmtree(out)  # Only our newly reserved directory.
            raise
    print(f'Created complete project: {out}', flush=True)
    return out

def serve(project, port):
    spec = importlib.util.spec_from_file_location('counterline_start_demo', KIT / 'scripts/start-demo.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.serve(project, port)

def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command', required=True)
    sub.add_parser('verify', help='Verify baseline and every packaged skill file')
    for name in ['create', 'play']:
        command = sub.add_parser(name)
        command.add_argument('--out', required=True, help='New project directory outside the skill')
        if name == 'play':
            command.add_argument('--port', type=int, default=4410)
    a = p.parse_args()
    if a.command == 'verify':
        repro.verify()
        return
    if a.command == 'play' and not 0 <= a.port <= 65535:
        raise ValueError('Port must be in 0..65535')
    out = create(a.out)
    if a.command == 'play':
        serve(out, a.port)
    else:
        print(f'Restart: python3 "{out / "start-demo.py"}" --port 4410')

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, KeyError) as e:
        print(f'ERROR: {e}', file=sys.stderr)
        sys.exit(1)
