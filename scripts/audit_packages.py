#!/usr/bin/env python3
"""Offline package/ZIP/source/links audit. Does not install or run game code."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]

def sha256(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def catalog(root=ROOT):
    return json.loads((root / 'packages.json').read_text(encoding='utf-8'))

def safe_member(name, skill):
    p = PurePosixPath(name)
    return (not p.is_absolute() and '\\' not in name and ':' not in name
            and '..' not in p.parts and p.parts and p.parts[0] == skill
            and p.as_posix() == name.rstrip('/')
            and all(c not in name for c in '\x00\r\n'))

def check_package(row, root=ROOT, compare_source=True):
    errors = []
    id = row['id']
    if not re.fullmatch(r'[a-z0-9-]+', id):
        return {'id': id, 'passed': False, 'errors': ['Invalid skill ID']}
    if row['directory'] != 'skills/' + id or Path(row['zip']).name != row['zip']:
        return {'id': id, 'passed': False, 'errors': ['Unsafe catalog path']}
    kit, archive = root / row['directory'], root / row['zip']
    checksum = archive.with_name(archive.name + '.sha256')
    if not archive.is_file():
        return {'id': id, 'passed': False, 'errors': ['ZIP missing (download complete release or Git LFS objects)']}
    if archive.stat().st_size != row['bytes'] or sha256(archive) != row['sha256']:
        return {'id': id, 'passed': False, 'errors': ['ZIP size/hash differs from packages.json (possibly a Git LFS pointer)']}
    fields = checksum.read_text().split() if checksum.is_file() else []
    if fields != [row['sha256'], row['zip']]:
        errors.append('SHA-256 sidecar differs from catalog')
    names, files = set(), {}
    try:
        with zipfile.ZipFile(archive) as z:
            for info in z.infolist():
                if info.filename in names:
                    errors.append('Duplicate ZIP entry: ' + info.filename)
                names.add(info.filename)
                if not safe_member(info.filename, id) or stat.S_ISLNK(info.external_attr >> 16):
                    errors.append('Unsafe ZIP entry: ' + info.filename)
                    continue
                if info.is_dir():
                    continue
                rel = PurePosixPath(info.filename).relative_to(id).as_posix()
                if any(x in PurePosixPath(rel).parts for x in ('.git', 'node_modules', '__pycache__', '.DS_Store')):
                    errors.append('Unwanted bundled file: ' + rel)
                # Bound memory; hash every decompressed byte and let ZIP CRC validation run.
                h = hashlib.sha256()
                with z.open(info) as f:
                    for chunk in iter(lambda: f.read(1024 * 1024), b''):
                        h.update(chunk)
                files[rel] = {'bytes': info.file_size, 'sha256': h.hexdigest()}
            skill_files = [n for n in files if PurePosixPath(n).name == 'SKILL.md']
            if skill_files != ['SKILL.md']:
                errors.append('Archive must have exactly one root SKILL.md')
            text = z.read(id + '/SKILL.md').decode('utf-8')
            if not re.search(r'^name:\s*' + re.escape(id) + r'\s*$', text, re.M):
                errors.append('SKILL name differs from ID')
            if not text.startswith('---\n') or not re.search(r'^description:\s*\S', text, re.M):
                errors.append('SKILL frontmatter missing name/description')
            ui = z.read(id + '/agents/openai.yaml').decode('utf-8')
            if '$' + id not in ui:
                errors.append('Agent default prompt lacks trigger ID')
    except (zipfile.BadZipFile, KeyError, UnicodeDecodeError) as e:
        errors.append('Invalid archive: ' + str(e))
    if compare_source:
        actual = {p.relative_to(kit).as_posix() for p in kit.rglob('*') if p.is_file() or p.is_symlink()}
        if actual != set(files):
            errors.append('Source and ZIP paths differ: ' + repr(sorted(actual ^ set(files))[:20]))
        for rel, meta in files.items():
            p = kit / rel
            if p.is_symlink() or not p.is_file() or p.stat().st_size != meta['bytes'] or sha256(p) != meta['sha256']:
                errors.append('Source differs from ZIP: ' + rel)
    return {'id': id, 'passed': not errors, 'files': len(files), 'zip_bytes': row['bytes'], 'sha256': row['sha256'], 'errors': errors}

def markdown_links(root):
    """Check maintained navigation, not frozen upstream manuals/historical reports."""
    paths = [root/'README.md', root/'CONTRIBUTING.md', root/'SECURITY.md', root/'LICENSE.md']
    paths += list((root/'docs').glob('*.md'))
    failures = []
    for p in paths:
        if not p.is_file():
            failures.append(str(p.relative_to(root)) + ': missing')
            continue
        # Remove fenced command examples; check local link targets, not HTTP or anchors.
        text = re.sub(r'```.*?```', '', p.read_text(encoding='utf-8'), flags=re.S)
        for link in re.findall(r'!?\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)', text):
            if re.match(r'^[a-zA-Z]+:', link) or link.startswith('#'):
                continue
            from urllib.parse import unquote
            target = unquote(link.split('#', 1)[0])
            if target and not (p.parent / target).exists():
                failures.append(p.relative_to(root).as_posix() + ': ' + link)
    return failures

def release_paths(root):
    """Only intentional distributable content; never git state, local reports or demos."""
    files = set()
    top = ['README.md','使用说明.md','CONTRIBUTING.md','SECURITY.md','LICENSE.md','CHANGELOG.md',
           'packages.json','.gitignore','.gitattributes']
    for name in top:
        if (root/name).is_file(): files.add(name)
    for p in root.iterdir():
        if p.is_file() and (p.suffix in ('.md','.jpg','.zip','.sha256')):
            files.add(p.name)
    for folder in ('docs', 'scripts', '.github', 'skills'):
        for p in (root/folder).rglob('*'):
            if p.is_file() and not any(x in p.parts for x in ('__pycache__','.DS_Store')):
                files.add(p.relative_to(root).as_posix())
    return sorted(files)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--report', type=Path)
    parser.add_argument('--check-lock', action='store_true')
    parser.add_argument('--write-lock', action='store_true', help='Maintainer only: explicitly establish a new candidate file inventory')
    args = parser.parse_args()
    root = args.root.resolve()
    data = catalog(root)
    results = [check_package(row, root) for row in data['packages']]
    errors = markdown_links(root)
    ids = [p['id'] for p in data['packages']]
    if len(set(ids)) != len(ids) or len(ids) != 9:
        errors.append('Expected 9 unique catalog entries')
    entries = {p.name for p in (root/'skills').iterdir() if p.name != '.DS_Store'}
    if entries != set(ids):
        errors.append('Unexpected/missing skills entry: ' + repr(sorted(entries ^ set(ids))))
    for row in data['packages']:
        if '$' + row['id'] not in (root/'README.md').read_text(encoding='utf-8'):
            errors.append('README missing trigger: ' + row['id'])
        if not (root/row['guide']).is_file():
            errors.append('Guide missing: ' + row['guide'])
    lock = root/'release-manifest.json'
    if args.check_lock:
        if not lock.is_file(): errors.append('release-manifest.json missing')
        else:
            old = json.loads(lock.read_text(encoding='utf-8'))
            if old['release'] != data['release']: errors.append('Release name differs')
            expected = old['files']
            if set(release_paths(root)) != set(expected): errors.append('Release file set differs from freeze manifest')
            for name, meta in expected.items():
                p = root/name
                if not p.is_file() or p.is_symlink() or p.stat().st_size != meta['bytes'] or sha256(p) != meta['sha256']:
                    errors.append('Freeze content differs: ' + name)
    ok = all(r['passed'] for r in results) and not errors
    if args.write_lock:
        if not ok: errors.append('Refusing to seal a failing audit')
        else:
            content = {name:{'bytes':(root/name).stat().st_size,'sha256':sha256(root/name)} for name in release_paths(root)}
            lock.write_text(json.dumps({'schema':1,'release':data['release'],'status':data['status'],
                'scope':'Intentional release files; excludes .git, local verification, generated playable-games, and this manifest. Not a legal approval or signature.',
                'files':content},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    report = {'passed':ok,'release':data['release'],'packages':results,'errors':errors,
              'scope':'Integrity, archive safety, README navigation. Not a gameplay, legal, vulnerability or privacy certification.'}
    if args.report:
        args.report.parent.mkdir(parents=True,exist_ok=True)
        args.report.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))
    return 0 if ok else 1

if __name__ == '__main__':
    sys.exit(main())
