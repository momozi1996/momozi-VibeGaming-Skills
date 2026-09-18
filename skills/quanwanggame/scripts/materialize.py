#!/usr/bin/env python3
"""Copy a verified frozen project into a NEW directory. No overwrite and no installs."""
from pathlib import Path
import argparse, shutil, json, hashlib
SKILL=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--dest',required=True,help='New project directory');args=p.parse_args()
src=SKILL/'assets/reference-project';raw=Path(args.dest).expanduser()
if raw.is_symlink():raise SystemExit('Destination must not be a symbolic link.')
dest=raw.resolve()
if dest.exists():raise SystemExit(f'Refusing existing destination: {dest}. Choose a new path; no files were overwritten.')
if SKILL==dest or SKILL in dest.parents:raise SystemExit('Destination must be outside the read-only skill package.')
manifest=json.loads((SKILL/'references/project-manifest.json').read_text())
for rel,meta in manifest['files'].items():
 f=src/rel
 if not f.is_file() or hashlib.sha256(f.read_bytes()).hexdigest()!=meta['sha256']:raise SystemExit(f'Frozen source corrupted: {rel}')
shutil.copytree(src,dest);print(f'Created {dest}\nVerified and copied {len(manifest["files"])} files. No npm install was performed.\nPreview: python3 "{dest}/start-demo.py"')
