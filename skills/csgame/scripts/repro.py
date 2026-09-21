#!/usr/bin/env python3
"""Verify, restore, scaffold and compare the bundled Counterline baseline. No third-party Python dependencies."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import sys
import tempfile

SKILL = Path(__file__).resolve().parents[1]
PACKAGE = SKILL
BASE = SKILL / 'assets/project'
MANIFEST = SKILL / 'assets/BASELINE-MANIFEST.json'

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def entries(path):
    return json.loads(path.read_text(encoding='utf-8'))['files']

def child(root, relative):
    p = root / relative
    if Path(relative).is_absolute() or '..' in Path(relative).parts or p.is_symlink():
        raise ValueError(f'Unsafe manifest path: {relative}')
    resolved = p.resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ValueError(f'Path escapes root: {relative}')
    return p

def check(root, records):
    errors = []
    for e in records:
        p = child(root, e['path'])
        if not p.is_file():
            errors.append({'path': e['path'], 'reason': 'missing'})
        elif p.stat().st_size != e['bytes'] or sha(p) != e['sha256']:
            errors.append({'path': e['path'], 'reason': 'content mismatch'})
    return errors

def verify(baseline_only=False):
    records = entries(MANIFEST)
    errors = check(BASE, records)
    print(f'Baseline: {len(records)} files, {len(errors)} mismatches')
    pm = SKILL / 'SKILL-MANIFEST.json'
    if not baseline_only and not pm.is_file():
        raise ValueError('SKILL-MANIFEST.json missing; obtain the complete skill package')
    if not baseline_only:
        bundle_records = entries(pm)
        bundle_errors = check(PACKAGE, bundle_records)
        print(f'Package: {len(bundle_records)} files, {len(bundle_errors)} mismatches')
        errors += bundle_errors
        expected = {e['path'] for e in bundle_records} | {'SKILL-MANIFEST.json'}
        actual = {p.relative_to(SKILL).as_posix() for p in SKILL.rglob('*')
                  if (p.is_file() or p.is_symlink()) and '__pycache__' not in p.parts and p.name != '.DS_Store'}
        errors += [{'path': p, 'reason': 'unexpected/missing skill file'} for p in sorted(actual ^ expected)]
    if errors:
        print(json.dumps(errors, ensure_ascii=False, indent=2))
        raise ValueError('Verification failed. Do not rewrite the manifests to bypass this failure.')
    return len(records)

def safe_output(value):
    raw = Path(value).expanduser()
    if raw.is_symlink():
        raise ValueError('Refusing a symlink output')
    out = raw.resolve()
    # Standalone installed skill and original package inputs both stay read-only.
    forbidden = SKILL
    if out == forbidden or out.is_relative_to(forbidden):
        raise ValueError('Output must be outside the reference package/skill')
    if out.exists() and (not out.is_dir() or any(out.iterdir())):
        raise ValueError(f'Refusing non-empty output: {out}')
    out.parent.mkdir(parents=True, exist_ok=True)
    return out

def materialize(value, scaffold=False, seed_art=False):
    verify()
    out = safe_output(value)
    temp = Path(tempfile.mkdtemp(prefix=f'.{out.name}-staging-', dir=out.parent))
    try:
        if not scaffold:
            shutil.copytree(BASE, temp, dirs_exist_ok=True)
        else:
            for name in ['package.json', 'package-lock.json', '.gitignore', 'LICENSE', 'THIRD_PARTY.md']:
                shutil.copy2(BASE / name, temp / name)
            shutil.copytree(BASE / 'tests', temp / 'tests')
            (temp / 'src').mkdir()
            (temp / 'artifacts').mkdir()
            if seed_art:
                for name in ['world.js', 'models.js', 'audio.js']:
                    shutil.copy2(BASE / 'src' / name, temp / 'src' / name)
            (temp / 'REPROGRESS.md').write_text(
                '# REPROGRESS\n\nMode: rebuild' + (' + seed-art' if seed_art else '') +
                '\nStatus: scaffold only; not playable or tested yet.\n' +
                'Copied: package files, original test contracts, licenses' +
                (', world.js/models.js/audio.js' if seed_art else '') +
                '.\nNext: implement index.html, style.css, main.js, map.js and simulation.js' +
                ('.\n' if seed_art else ', world.js, models.js and audio.js.\n') +
                'No historical reports copied. Read the skill references for the complete contract.\n', encoding='utf-8')
        if out.exists():
            out.rmdir()  # only an empty output directory is accepted above
        os.replace(temp, out)
    finally:
        if temp.exists():
            shutil.rmtree(temp)  # only our own temporary staging directory
    print(('Scaffolded' if scaffold else 'Restored') + f': {out}')
    if not scaffold:
        result = compare(out, 'all')
        if result['mismatches']:
            raise ValueError('Post-copy verification failed')

def compare(value, scope):
    root = Path(value).expanduser().resolve()
    if not root.is_dir():
        raise ValueError('Project must exist')
    records = entries(MANIFEST)
    if scope == 'source':
        records = [e for e in records if not e['path'].startswith(('dist/', 'artifacts/'))]
    errors = check(root, records)
    known = {e['path'] for e in entries(MANIFEST)}
    extra = []
    for p in root.rglob('*'):
        rel = p.relative_to(root)
        if 'node_modules' in rel.parts or '.git' in rel.parts or p.name == '.DS_Store':
            continue
        if p.is_file() and rel.as_posix() not in known:
            if scope == 'source' and rel.parts[0] in ('dist', 'artifacts'):
                continue
            extra.append(rel.as_posix())
    result = {'scope': scope, 'checked': len(records), 'mismatches': errors, 'extraFilesNotAudited': sorted(extra)}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result

def main():
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command', required=True)
    v = sub.add_parser('verify', help='Verify baseline and the standalone skill manifest')
    v.add_argument('--baseline-only', action='store_true')
    r = sub.add_parser('restore', help='Restore every baseline file without changing bytes')
    r.add_argument('--out', required=True)
    s = sub.add_parser('scaffold', help='Create a rebuild scaffold; no implementation by default')
    s.add_argument('--out', required=True)
    s.add_argument('--seed-art', action='store_true', help='Explicitly reuse world.js/models.js/audio.js')
    c = sub.add_parser('compare', help='Compare a restored project against baseline hashes')
    c.add_argument('--project', required=True)
    c.add_argument('--scope', choices=['all', 'source'], default='source')
    a = p.parse_args()
    try:
        if a.command == 'verify': verify(a.baseline_only)
        elif a.command == 'restore': materialize(a.out)
        elif a.command == 'scaffold': materialize(a.out, True, a.seed_art)
        elif compare(a.project, a.scope)['mismatches']: return 1
        return 0
    except (ValueError, OSError, KeyError, json.JSONDecodeError) as e:
        print(f'ERROR: {e}', file=sys.stderr)
        return 1

if __name__ == '__main__':
    sys.exit(main())
