#!/usr/bin/env python3
"""Export a checked private freeze candidate without Git history, caches or local demos."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
sys.dont_write_bytecode = True
from audit_packages import ROOT, sha256

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--out', type=Path, required=True, help='New directory outside this repository')
    args = p.parse_args()
    raw = args.out.expanduser()
    if raw.is_symlink(): raise ValueError('Output must not be a symlink')
    out = raw.resolve()
    if out.exists(): raise ValueError('Output already exists; refusing overwrite')
    if out == ROOT or ROOT in out.parents or out in ROOT.parents:
        raise ValueError('Output must not overlap the repository')
    result = subprocess.run([sys.executable,str(ROOT/'scripts/audit_packages.py'),'--check-lock'],check=False)
    if result.returncode: return result.returncode
    lock = ROOT/'release-manifest.json'
    entries = json.loads(lock.read_text(encoding='utf-8'))['files']
    out.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.game-freeze-export-',dir=out.parent) as temp:
        stage = Path(temp)/'candidate';stage.mkdir()
        for name, meta in entries.items():
            source = ROOT/name
            if sha256(source) != meta['sha256']: raise ValueError('Content changed while exporting: '+name)
            dest = stage/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest)
            if sha256(dest) != meta['sha256']: raise ValueError('Export copy failed: '+name)
        shutil.copy2(lock,stage/lock.name)
        out.mkdir()  # Exclusive reservation, never replace a pre-existing output directory.
        try:
            for child in stage.iterdir(): shutil.move(str(child),str(out/child.name))
        except Exception:
            shutil.rmtree(out);raise  # Only our new output is rolled back.
    print('Exported private candidate:',out)
    print('No .git/verification/playable-games copied. This does NOT clear public licensing/privacy blockers.')
    return 0

if __name__ == '__main__':
    try: sys.exit(main())
    except (OSError,ValueError) as e: print('ERROR:',e,file=sys.stderr);sys.exit(1)
