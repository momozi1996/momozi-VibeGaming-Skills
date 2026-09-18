#!/usr/bin/env python3
"""Install one complete, checksum-verified local skill. Never overwrite or download."""
import argparse
import os
from pathlib import Path
import shutil
import stat
import sys
import tempfile
import zipfile
sys.dont_write_bytecode = True
from audit_packages import ROOT, catalog, check_package

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--skill', choices=[r['id'] for r in catalog()['packages']], required=True)
    p.add_argument('--skills-dir', type=Path, required=True, help='Your agent skill directory; explicit, no assumed global path')
    p.add_argument('--dry-run', action='store_true')
    args = p.parse_args()
    row = next(r for r in catalog()['packages'] if r['id'] == args.skill)
    result = check_package(row, compare_source=False)
    if not result['passed']: raise ValueError('\n'.join(result['errors']))
    parent = args.skills_dir.expanduser().resolve()
    target = parent/args.skill
    if target.exists() or target.is_symlink():
        raise ValueError('Destination exists; refusing overwrite. Back up/move the old installation yourself: ' + str(target))
    if parent == ROOT or ROOT in parent.parents or parent in ROOT.parents:
        raise ValueError('Install outside this repository and its ancestors')
    if args.dry_run:
        print('Verified; would install', args.skill, 'to', target)
        return 0
    parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.game-skill-install-', dir=parent) as temp:
        with zipfile.ZipFile(ROOT/row['zip']) as z:
            z.extractall(temp)  # All names, links and package hash validated before extraction.
            if os.name != 'nt':
                for info in z.infolist():
                    mode = info.external_attr >> 16
                    if mode and not info.is_dir():
                        (Path(temp)/info.filename).chmod(stat.S_IMODE(mode) & 0o777)
        stage = Path(temp)/args.skill
        # Reserve destination atomically; no user files existed before this mkdir.
        target.mkdir()
        try:
            for child in stage.iterdir():
                shutil.move(str(child), str(target/child.name))
        except Exception:
            shutil.rmtree(target)  # Only the just-created directory is rolled back.
            raise
    print('Installed complete skill:',target)
    print('Refresh your agent skill list, then use $'+args.skill+' in chat. No game or global dependency was executed.')
    return 0

if __name__ == '__main__':
    try: sys.exit(main())
    except (OSError, ValueError, zipfile.BadZipFile) as e:
        print('ERROR:',e,file=sys.stderr);sys.exit(1)
