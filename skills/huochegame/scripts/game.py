#!/usr/bin/env python3
"""Verify, restore and play this complete game with Python's standard library."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path, PurePosixPath
import shutil
import sys
import tempfile
sys.dont_write_bytecode = True
KIT = Path(__file__).resolve().parents[1]
BASE = KIT / 'assets/reference-project'
DEFAULT_PORT = 4430

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''): h.update(chunk)
    return h.hexdigest()

def verify():
    manifest = json.loads((KIT / 'SKILL-MANIFEST.json').read_text(encoding='utf-8'))['files']
    actual = {p.relative_to(KIT).as_posix() for p in KIT.rglob('*')
              if (p.is_file() or p.is_symlink()) and '__pycache__' not in p.parts and p.name != '.DS_Store'}
    if actual != set(manifest) | {'SKILL-MANIFEST.json'}:
        raise ValueError('Skill file set differs from manifest')
    for name, meta in manifest.items():
        rel = PurePosixPath(name)
        p = KIT / name
        if rel.is_absolute() or '..' in rel.parts or p.is_symlink() or not p.resolve().is_relative_to(KIT):
            raise ValueError('Unsafe file: ' + name)
        if p.stat().st_size != meta['bytes'] or sha(p) != meta['sha256']:
            raise ValueError('Skill content differs: ' + name)
    print(f'Verified {len(manifest)} skill files', flush=True)
    return manifest

def create(value):
    records = verify()
    raw = Path(value).expanduser()
    out = raw.resolve()
    if raw.is_symlink() or out.exists():
        raise ValueError('Output must not exist. Restart existing projects with start-demo.py; no overwrite option.')
    if out == KIT or KIT in out.parents or out in KIT.parents:
        raise ValueError('Output must be outside the skill and its ancestors')
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f'.{out.name}-stage-', dir=out.parent) as temp:
        stage = Path(temp) / 'project'
        shutil.copytree(BASE, stage)
        shutil.copy2(KIT / 'scripts/start-demo.py', stage / 'start-demo.py')
        (stage / 'tooling').mkdir()
        for name in ['package.json', 'package-lock.json']:
            shutil.copy2(KIT / name, stage / 'tooling' / name)
        for name, meta in records.items():
            if name.startswith('assets/reference-project/'):
                p = stage / name.removeprefix('assets/reference-project/')
                if not p.is_file() or sha(p) != meta['sha256']: raise ValueError('Copy mismatch: ' + name)
        out.mkdir()  # Atomic destination reservation; never overwrite a concurrent creator.
        try:
            for child in stage.iterdir(): shutil.move(str(child), str(out / child.name))
        except Exception:
            shutil.rmtree(out)  # Only the directory reserved by this invocation.
            raise
    print(f'Created complete project: {out}', flush=True)
    return out

def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command', required=True)
    sub.add_parser('verify')
    for name in ['create', 'play']:
        command = sub.add_parser(name); command.add_argument('--out', required=True)
        if name == 'play': command.add_argument('--port', type=int, default=DEFAULT_PORT)
    a = p.parse_args()
    if a.command == 'verify': verify(); return
    if a.command == 'play' and not 0 <= a.port <= 65535: raise ValueError('Port must be in 0..65535')
    out = create(a.out)
    if a.command == 'play':
        spec = importlib.util.spec_from_file_location('game_start', KIT / 'scripts/start-demo.py')
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        module.serve(out, a.port)
    else: print(f'Restart: python3 "{out / "start-demo.py"}" --port {DEFAULT_PORT}')

if __name__ == '__main__':
    try: main()
    except (OSError, ValueError, KeyError) as e:
        print(f'ERROR: {e}', file=sys.stderr); sys.exit(1)
