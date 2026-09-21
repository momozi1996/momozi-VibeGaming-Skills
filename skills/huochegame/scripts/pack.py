#!/usr/bin/env python3
"""Standard-library-only, non-destructive restoration / rebuild preparation."""
import argparse, hashlib, json, shutil, sys
from pathlib import Path
SKILL = Path(__file__).resolve().parents[1]
BASE = SKILL / 'assets/reference-project'
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def manifest(): return json.loads((SKILL/'assets/baseline-manifest.json').read_text())['files']
def audit(root, files):
    errors=[]
    for rel, expected in files.items():
        p=root/rel
        if not p.is_file(): errors.append({'file':rel,'error':'missing'})
        elif p.stat().st_size!=expected['bytes'] or digest(p)!=expected['sha256']:
            errors.append({'file':rel,'error':'content differs','actual_sha256':digest(p)})
    return errors
def verify():
    errors=audit(BASE,manifest())
    whole=SKILL/'SKILL-MANIFEST.json'
    if whole.exists(): errors+=audit(SKILL,json.loads(whole.read_text())['files'])
    else: errors.append({'file':'SKILL-MANIFEST.json','error':'missing complete skill manifest'})
    return {'ok':not errors,'baseline_files':len(manifest()),'package_manifest':whole.exists(),'errors':errors}
def fresh(path):
    p=Path(path).expanduser().resolve()
    if p==SKILL or SKILL in p.parents: raise ValueError('Output must be outside this Skill, not inside reference inputs.')
    if p.exists() and (not p.is_dir() or any(p.iterdir())): raise ValueError('Refusing nonempty output: '+str(p))
    p.mkdir(parents=True,exist_ok=True);return p
def seed_tools(out):
    (out/'tooling').mkdir(exist_ok=True)
    for name in ['package.json','package-lock.json']: shutil.copy2(SKILL/name,out/'tooling'/name)

def copy_file(rel,out):
    dest=out/rel;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(BASE/rel,dest)
def restore(out):
    result=verify()
    if not result['ok']: raise ValueError('Input integrity failed: '+json.dumps(result,ensure_ascii=False))
    p=fresh(out)
    for rel in manifest(): copy_file(rel,p)
    seed_tools(p)
    (p/'REPRODUCTION.json').write_text(json.dumps({'mode':'exact','method':'byte-for-byte restoration','independently_rewritten':False,'source_html_sha256':digest(BASE/'cloudline.html')},indent=2)+'\n')
    return {'ok':True,'mode':'exact','output':str(p),'files':len(manifest()),'errors':audit(p,manifest())}
def prepare(out):
    if not verify()['ok']: raise ValueError('Input integrity failed')
    p=fresh(out)
    seed_tools(p)
    for rel in ['src/three.inline.js','LICENSE.txt','build.mjs']: copy_file(rel,p)
    (p/'src/shell.html').write_text('''<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CLOUDLINE · 重建起点</title><style>/*__CSS__*/</style></head>
<body><div id="scene"></div><div id="loading">重建起点：尚未实现游戏。</div>
<script>/*__THREE__*/</script><script>/*__GAME__*/</script></body></html>
''')
    (p/'src/style.css').write_text('/* Re-author the full responsive UI. This starter contains no finished design. */\nbody{margin:0;background:#294f50;color:#fff4d9;font-family:system-ui}#loading{padding:40px}\n')
    (p/'src/game.js').write_text('/* REBUILD STARTER: implement the complete game here; no original implementation copied. */\n"use strict";\n')
    (p/'package.json').write_text(json.dumps({'name':'huoche-rebuild','version':'0.0.0','private':True,'type':'module','scripts':{'build':'node build.mjs'}},indent=2)+'\n')
    (p/'PROGRESS.md').write_text('# CLOUDLINE rebuild\n\nMode: rebuild, with full source reference allowed (not a blind evaluation).\n\n## Completed\n- Embedded MIT Three.js, license, basic HTML skeleton and build script.\n\n## Not implemented\n- Game simulation, world, tram, UI, workshop, sound, persistence, testing adapter.\n\n## Next\n- Read the reproduction Skill and implement the minimum playable rail/stop loop.\n\n## Provenance\n- Directly copied: engine, license, build script only.\n- Baseline HTML and game implementation not copied.\n')
    (p/'REPRODUCTION.json').write_text(json.dumps({'mode':'rebuild','implementation_complete':False,'copied':['src/three.inline.js','LICENSE.txt','build.mjs'],'reference_access':'full source allowed; not blind'},indent=2)+'\n')
    return {'ok':True,'mode':'rebuild','output':str(p),'implementation_complete':False}
def main():
    ap=argparse.ArgumentParser(description=__doc__);sub=ap.add_subparsers(dest='cmd',required=True)
    sub.add_parser('verify')
    for mode in ['restore','prepare']: sub.add_parser(mode).add_argument('--out',required=True)
    sub.add_parser('compare').add_argument('--project',required=True)
    a=ap.parse_args()
    try:
        if a.cmd=='verify': result=verify()
        elif a.cmd=='restore': result=restore(a.out)
        elif a.cmd=='prepare': result=prepare(a.out)
        else:
            p=Path(a.project).resolve();errors=audit(p,manifest());result={'ok':not errors,'project':str(p),'checked':len(manifest()),'errors':errors,'note':'Additional generated files do not invalidate original-file hashes.'}
        print(json.dumps(result,ensure_ascii=False,indent=2));return 0 if result['ok'] else 1
    except (ValueError,OSError) as e: print(json.dumps({'ok':False,'error':str(e)},ensure_ascii=False),file=sys.stderr);return 1
if __name__=='__main__':sys.exit(main())
