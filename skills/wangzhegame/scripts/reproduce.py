#!/usr/bin/env python3
"""Restore/verify the frozen v0.1.1 reference with Python's standard library."""
import argparse
import hashlib
import json
import shutil
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parents[1]
REFERENCE = SKILL / 'assets/reference-project'
MANIFEST = SKILL / 'assets/reference-manifest.json'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def entries():
    return json.loads(MANIFEST.read_text(encoding='utf-8'))['files']


def compare(project, groups, exact_tree=False):
    failures, count = [], 0
    expected = set()
    for item in entries():
        if item['group'] not in groups:
            continue
        rel = item['path']
        expected.add(rel)
        path = project / rel
        count += 1
        if path.is_symlink():
            failures.append({'path': rel, 'error': 'symlink is not a frozen file'})
        elif not path.is_file():
            failures.append({'path': rel, 'error': 'missing'})
        elif path.stat().st_size != item['bytes'] or sha(path) != item['sha256']:
            failures.append({'path': rel, 'error': 'content mismatch'})
    if exact_tree:
        actual = {p.relative_to(project).as_posix() for p in project.rglob('*') if p.is_file()}
        for rel in sorted(actual - expected):
            failures.append({'path': rel, 'error': 'unexpected file in frozen reference'})
    return {'ok': not failures, 'checked': count, 'groups': sorted(groups), 'failures': failures}


def safe_output(raw):
    original = Path(raw).expanduser()
    if original.is_symlink():
        raise ValueError('Output must not be a symlink')
    out = original.resolve()
    if out == SKILL or SKILL in out.parents or out in SKILL.parents:
        raise ValueError('Output must be outside the skill and not its ancestor')
    if out.exists() and (not out.is_dir() or any(out.iterdir())):
        raise ValueError('Output exists and is nonempty; choose a NEW directory (no overwrite option)')
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('verify', help='Check all 189 frozen files and reject extra files')
    cp = sub.add_parser('compare', help='Check source/data/tests against the frozen manifest')
    cp.add_argument('--project', required=True)
    cp.add_argument('--all', action='store_true', help='Also compare shipped dist and historical evidence')
    restore = sub.add_parser('restore', help='Copy into a new/empty output directory')
    restore.add_argument('--out', required=True)
    restore.add_argument('--mode', choices=['exact', 'rebuild'], default='exact')
    args = parser.parse_args()
    if args.command == 'compare':
        result = compare(Path(args.project).expanduser().resolve(), {'reproduction', 'build', 'evidence'} if args.all else {'reproduction'})
    else:
        result = compare(REFERENCE, {'reproduction', 'build', 'evidence'}, exact_tree=True)
        if args.command == 'restore' and result['ok']:
            out = safe_output(args.out)
            if args.mode == 'exact':
                shutil.copytree(REFERENCE, out, dirs_exist_ok=True)
                result = compare(out, {'reproduction', 'build', 'evidence'}, exact_tree=True)
            else:
                # No source, prebuilt bundle, or old screenshots pretending to be fresh results.
                out.mkdir(parents=True, exist_ok=True)
                for item in entries():
                    rel = Path(item['path'])
                    if item['group'] != 'reproduction' or rel.parts[0] == 'src':
                        continue
                    target = out / rel
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(REFERENCE / rel, target)
                (out / 'src').mkdir(exist_ok=True)
                result = {'ok': True, 'sourceEmpty': True, 'warning': 'Rebuild scaffold only. Not a runnable or completed reproduction.'}
            result.update({'output': str(out), 'mode': args.mode})
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result['ok'] else 1


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError) as error:
        print(json.dumps({'ok': False, 'error': str(error)}, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)
