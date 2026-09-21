#!/usr/bin/env python3
"""Exercise restore safety, full integrity, corruption detection and rebuild scaffold."""
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

SKILL = Path(__file__).resolve().parents[1]
results = []


def call(script, *args, expected=0):
    done = subprocess.run([sys.executable, str(script), *map(str, args)], capture_output=True, text=True)
    if done.returncode != expected:
        raise AssertionError(f'{args}: expected {expected}, got {done.returncode}\n{done.stdout}\n{done.stderr}')
    return done


def check(name, condition):
    if not condition:
        raise AssertionError(name)
    results.append(name)


def main():
    script = SKILL / 'scripts/reproduce.py'
    check('Frozen 189-file verification', json.loads(call(script, 'verify').stdout)['checked'] == 189)
    with tempfile.TemporaryDirectory(prefix='wangzhe-note-selftest-') as temporary:
        temp = Path(temporary)
        out = temp / 'exact'
        check('Exact restore checks every file', json.loads(call(script, 'restore', '--out', out).stdout)['checked'] == 189)
        check('Exact compare including dist/history', json.loads(call(script, 'compare', '--project', out, '--all').stdout)['ok'])
        sentinel = out / 'user-data.txt'
        sentinel.write_text('keep', encoding='utf-8')
        call(script, 'restore', '--out', out, expected=1)
        check('Nonempty output refuses overwrite and preserves user data', sentinel.read_text() == 'keep')
        call(script, 'restore', '--out', SKILL / 'never-created-selftest-output', expected=1)
        check('Refuses writing inside skill', not (SKILL / 'never-created-selftest-output').exists())
        damaged = out / 'src/controls.js'
        damaged.write_text(damaged.read_text() + '\n// test corruption\n', encoding='utf-8')
        result = json.loads(call(script, 'compare', '--project', out, expected=1).stdout)
        check('Detects exact damaged source path', result['failures'] == [{'path': 'src/controls.js', 'error': 'content mismatch'}])
        rebuilt = temp / 'rebuild'
        call(script, 'restore', '--mode', 'rebuild', '--out', rebuilt)
        check('Rebuild has empty src and no fake dist/evidence', (rebuilt / 'src').is_dir() and not list((rebuilt / 'src').iterdir()) and not (rebuilt / 'dist').exists() and not (rebuilt / 'artifacts').exists())
        check('Rebuild preserves actual assets, lock and tests', all((rebuilt / name).read_bytes() == (SKILL / 'assets/reference-project' / name).read_bytes() for name in ['public/assets/Garen.png', 'public/assets/textures/ground.jpg', 'package-lock.json', 'tests/controls-production.mjs']))
        clone = temp / 'independent-skill'
        # Copy only runtime dependencies for reproduce.py, so no reliance on the original workspace.
        (clone / 'scripts').mkdir(parents=True)
        shutil.copy2(script, clone / 'scripts/reproduce.py')
        shutil.copytree(SKILL / 'assets', clone / 'assets')
        call(clone / 'scripts/reproduce.py', 'verify')
        check('Portable script + assets works at another path', True)
        broken = clone / 'assets/reference-project/public/assets/Garen.png'
        broken.write_bytes(b'corrupt')
        call(clone / 'scripts/reproduce.py', 'restore', '--out', temp / 'must-not-exist', expected=1)
        check('Corrupt baseline blocks restore before output creation', not (temp / 'must-not-exist').exists())
        missing = temp / 'missing-project'
        call(SKILL / 'scripts/check.py', '--project', missing, '--out', temp / 'unused-report', expected=1)
        check('Runner rejects absent source/dependencies without fake report', not (temp / 'unused-report').exists())
    print(json.dumps({'ok': True, 'checks': results, 'count': len(results), 'scope': 'Packaging helper behavior, not game browser acceptance'}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
