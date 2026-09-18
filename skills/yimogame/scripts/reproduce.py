#!/usr/bin/env python3
"""Portable, read-only-to-kit restoration and integrity checks (Python standard library)."""
import argparse, hashlib, json, os, pathlib, shutil, subprocess, sys, tarfile
ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = ROOT / 'assets/reference-project'

def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''): h.update(chunk)
    return h.hexdigest()

def within(path, parent):
    try: path.relative_to(parent); return True
    except ValueError: return False

def source_manifest():
    return json.loads((ROOT/'assets/project-manifest.json').read_text())['sourceFiles']

def verify_tree(root, entries, only_source=False):
    errors=[]; count=0
    for name, meta in entries.items():
        if only_source and (name.startswith('reports/') or name.startswith('dist/')): continue
        p=root/name; count+=1
        if p.is_symlink() or not p.is_file(): errors.append(f'missing/nonregular: {name}')
        elif p.stat().st_size != meta['bytes'] or digest(p) != meta['sha256']: errors.append(f'changed: {name}')
    if errors: raise RuntimeError('\n'.join(errors[:40]))
    return count

def verify():
    count=verify_tree(BASE,source_manifest())
    seal=ROOT/'MANIFEST.sha256.json'
    if seal.exists():
        data=json.loads(seal.read_text()); total=verify_tree(ROOT,data['files'])
        actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name!='.DS_Store' and p != seal}
        extras=actual-set(data['files'])
        if extras: raise RuntimeError('Unexpected kit files: '+', '.join(sorted(extras)[:20]))
        print(f'PASS: package {total} files + reference project {count} files intact')
    else: print(f'PASS: reference project {count} files intact; package seal not yet present')

def fresh_output(text):
    raw=pathlib.Path(text).expanduser().absolute()
    if raw.is_symlink(): raise RuntimeError('Output directory must not be a symbolic link')
    out=raw.resolve()
    if within(out, ROOT) or within(ROOT,out): raise RuntimeError('Output must not overlap the read-only skill directory')
    if out.exists() and (not out.is_dir() or any(out.iterdir())): raise RuntimeError('Output exists and is nonempty; refusing overwrite')
    out.mkdir(parents=True,exist_ok=True)
    return out

def restore(args):
    verify(); out=fresh_output(args.out)
    if args.mode=='exact': shutil.copytree(BASE,out,dirs_exist_ok=True)
    else:
        for name in ('package.json','package-lock.json','index.html','vite.config.js','.gitignore'):
            shutil.copy2(BASE/name,out/name)
        for name in ('public','tests'): shutil.copytree(BASE/name,out/name)
        (out/'src').mkdir(); (out/'reports').mkdir()
    (out/'REPRODUCTION.json').write_text(json.dumps({'mode':args.mode,'reference':'yimogame/assets/reference-project','sourceCopied':args.mode=='exact','tested':False,'note':'Use fresh test outputs; inherited reports are history, not proof of this run.'},indent=2))
    print(f'Created {args.mode}: {out}')
    if args.mode=='rebuild': print('src/ is empty. Model must implement all modules before this can run. This is source-visible reconstruction, not a blind benchmark.')

def install(args):
    out=pathlib.Path(args.project).expanduser().resolve()
    if within(out,ROOT) or within(ROOT,out): raise RuntimeError('Install project must not overlap the kit')
    if not (out/'package-lock.json').is_file(): raise RuntimeError('Missing package-lock.json')
    if not shutil.which('npm'): raise RuntimeError('Install Node.js and npm first; neither is bundled')
    if args.online:
        subprocess.run(['npm','ci','--no-audit','--no-fund'],cwd=out,check=True);return
    verify()
    archive=ROOT/'vendor/npm-cache.tar.gz';cache=out/'.yimo-npm-cache'
    if not archive.is_file(): raise RuntimeError('Offline cache missing; use --online only if network installation is intended')
    if cache.exists(): raise RuntimeError('Cache already exists. To retry, run npm ci --offline --cache .yimo-npm-cache inside the output project; kit never deletes existing data.')
    cache.mkdir()
    with tarfile.open(archive,'r:gz') as tar:
        for member in tar.getmembers():
            destination=(cache/member.name).resolve()
            if not within(destination,cache) or not (member.isfile() or member.isdir()): raise RuntimeError('Unsafe archive entry '+member.name)
        tar.extractall(cache)
    subprocess.run(['npm','ci','--offline','--cache',str(cache),'--no-audit','--no-fund'],cwd=out,check=True)
    print('Offline locked install complete. Runtime uses no remote art or fonts.')

def compare(args):
    out=pathlib.Path(args.project).expanduser().resolve()
    count=verify_tree(out,source_manifest(),only_source=not args.all)
    expected=set(source_manifest())
    additions=[]
    for folder in ('src','public','tests'):
        for p in (out/folder).rglob('*'):
            if p.is_file() and p.relative_to(out).as_posix() not in expected: additions.append(p.relative_to(out).as_posix())
    if additions: raise RuntimeError('Extra implementation files: '+', '.join(additions))
    print(f'PASS: {count} expected files byte-identical'+(' (all snapshot files)' if args.all else ' (reports/dist excluded; rebuild and environment may change them)'))

def serve(args):
    directory=(pathlib.Path(args.project).expanduser().resolve()/'dist') if args.project else BASE/'dist'
    if not (directory/'index.html').is_file(): raise RuntimeError('Missing dist/index.html')
    print(f'Offline preview: http://127.0.0.1:{args.port}',flush=True)
    subprocess.run([sys.executable,'-m','http.server',str(args.port),'--bind','127.0.0.1','--directory',str(directory)],check=True)

def port_number(text):
    value=int(text)
    if not 1024 <= value <= 65535: raise argparse.ArgumentTypeError('port must be 1024..65535')
    return value

def play(args):
    args.mode='exact'
    restore(args)
    args.project=args.out
    serve(args)

def main():
    p=argparse.ArgumentParser(description=__doc__);sub=p.add_subparsers(dest='command',required=True)
    sub.add_parser('verify')
    r=sub.add_parser('restore');r.add_argument('--out',required=True);r.add_argument('--mode',choices=['exact','rebuild'],default='exact')
    i=sub.add_parser('install');i.add_argument('--project',required=True);i.add_argument('--online',action='store_true')
    c=sub.add_parser('compare');c.add_argument('--project',required=True);c.add_argument('--all',action='store_true')
    s=sub.add_parser('serve');s.add_argument('--project');s.add_argument('--port',type=port_number,default=4368)
    go=sub.add_parser('play',help='Restore the complete game into a new directory and immediately serve bundled dist; no npm required');go.add_argument('--out',required=True);go.add_argument('--port',type=port_number,default=4493)
    a=p.parse_args()
    try:
        if a.command=='verify':verify()
        else:globals()[a.command](a)
    except (RuntimeError,subprocess.CalledProcessError,OSError) as e:
        print(f'ERROR: {e}',file=sys.stderr);return 1
    return 0
if __name__=='__main__':sys.exit(main())
