#!/usr/bin/env python3
"""Portable self-contained game scaffold. Python 3.9+, no pip packages required."""
import argparse, hashlib, json, os, shutil, sys
from pathlib import Path
sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/reference-project'
PROTECTED = next((p for p in [ROOT, *ROOT.parents] if (p / 'SKILL.md').is_file()), ROOT)

def load(p):
    return json.loads(p.read_text(encoding='utf-8'))

def digest(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def inside(p, root):
    return p == root or root in p.parents

def verify(base, records):
    errors = []
    for row in records:
        rel = Path(row['path']); p = base / rel
        if rel.is_absolute() or '..' in rel.parts or p.is_symlink() or not inside(p.resolve(), base):
            errors.append('unsafe: ' + str(rel))
        elif not p.is_file(): errors.append('missing: ' + str(rel))
        elif p.stat().st_size != row['bytes'] or digest(p) != row['sha256']:
            errors.append('changed: ' + str(rel))
    return errors

def safe_output(raw):
    p = Path(raw).expanduser()
    if p.is_symlink(): raise ValueError('Output may not be a symlink')
    p = p.resolve()
    if inside(p, PROTECTED) or inside(PROTECTED, p):
        raise ValueError('Output must be outside this skill and its ancestors')
    if p.exists() and (not p.is_dir() or any(p.iterdir())):
        raise ValueError('Output must be new or empty; nothing overwritten')
    return p

def copy_baseline(out, records, mode):
    for row in records:
        name = row['path']
        if mode == 'rebuild' and not (name.startswith(('public/', 'tests/')) or name in {
            'package.json','package-lock.json','tsconfig.json','LICENSE','ASSETS-LICENSE.md','THIRD_PARTY_NOTICES.md','.gitignore'}):
            continue
        # Do not hand a new variant stale builds/screenshots or historical "passed" JSON.
        if mode == 'variant' and (name.startswith(('dist/','screenshots/')) or name == 'tests/browser-report.json'):
            continue
        dst = out / name; dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(BASE / name, dst)
    if mode == 'rebuild': (out / 'src').mkdir(exist_ok=True)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('verify', help='Verify all packaged files against sealed SHA-256 records')
    p = sub.add_parser('create', help='Copy reference or materialize a themed game; never installs dependencies')
    p.add_argument('--out', required=True)
    p.add_argument('--mode', choices=['exact','variant','rebuild'], default='variant')
    p.add_argument('--preset', help='Name listed by presets command; variant only')
    sub.add_parser('presets')
    p = sub.add_parser('compare', help='Baseline comparison; default checks assets, immutable tests and dependency pins')
    p.add_argument('--project', required=True); p.add_argument('--exact', action='store_true')
    p = sub.add_parser('diff', help='Report differences, not a pass/fail test of a derivative')
    p.add_argument('--project', required=True)
    args = parser.parse_args(); rows = load(ROOT / 'assets/baseline-manifest.json')
    result = {'command': args.command}
    if args.command == 'presets':
        result['presets'] = [p.stem for p in sorted((ROOT / 'assets/presets').glob('*.json'))]
    elif args.command == 'verify':
        errors = verify(BASE, rows)
        seal = ROOT / 'assets/skill-manifest.json'
        if not seal.is_file(): errors.append('missing package seal: assets/skill-manifest.json')
        else: errors += verify(ROOT, load(seal))
        result.update(checkedBaselineFiles=len(rows), errors=errors, ok=not errors)
    elif args.command == 'create':
        if args.mode != 'variant' and args.preset: raise ValueError('--preset is only for variant')
        # Fail before touching destination on corrupt input or invalid preset.
        errors = verify(BASE, rows)
        if errors: raise ValueError('Corrupt baseline: ' + str(errors[:8]))
        preset = None
        if args.mode == 'variant':
            from adapt import DEFAULT_PRESET, apply
            key = args.preset or DEFAULT_PRESET
            if key not in [p.stem for p in (ROOT / 'assets/presets').glob('*.json')]:
                raise ValueError('Unknown preset; run presets')
            preset = load(ROOT / 'assets/presets' / (key + '.json'))
        out = safe_output(args.out); out.mkdir(parents=True, exist_ok=True)
        copy_baseline(out, rows, args.mode)
        if preset is not None: apply(out, preset)
        if args.mode != 'exact':
            (out / 'GENERATION.json').write_text(json.dumps({
                'skill': ROOT.name, 'mode': args.mode, 'preset': args.preset or (DEFAULT_PRESET if preset else None),
                'baselineManifestSha256': digest(ROOT/'assets/baseline-manifest.json'),
                'tested': False, 'notice': 'Inherited docs/reports describe the baseline, not this new game. Run fresh tests.'
            }, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
        result.update(ok=True, out=str(out), mode=args.mode,
                      next='npm ci --no-audit --no-fund; npm test; npm run build (rebuild requires implementation first)')
    else:
        target = Path(args.project).expanduser().resolve()
        if not target.is_dir(): raise ValueError('Project does not exist')
        chosen = rows
        if args.command == 'compare' and not args.exact:
            chosen = [r for r in rows if r['path'].startswith(('public/','tests/')) and r['path'] != 'tests/browser-report.json'
                      or r['path'] in ['package.json','package-lock.json','tsconfig.json']]
        errors = verify(target, chosen)
        result.update(project=str(target), checked=len(chosen), differences=errors)
        if args.command == 'compare': result['ok'] = not errors
        else:
            known = {r['path'] for r in rows}; extras=[]
            for parent, dirs, files in os.walk(target, followlinks=False):
                dirs[:] = [d for d in dirs if d not in ['node_modules','.git','__pycache__','dist']]
                for f in files:
                    rel = (Path(parent)/f).relative_to(target).as_posix()
                    if rel not in known: extras.append(rel)
            result.update(added=sorted(extras), notice='Intentional variants differ; this is not a gameplay test.')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result.get('ok', True) else 1

if __name__ == '__main__':
    try: sys.exit(main())
    except (ValueError, OSError, KeyError) as e:
        print(json.dumps({'ok':False,'error':str(e)},ensure_ascii=False), file=sys.stderr); sys.exit(1)
