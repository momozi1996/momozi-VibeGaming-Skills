#!/usr/bin/env python3
"""Portable, dependency-free skill project generator. Never writes into the installed skill."""
from pathlib import Path
import argparse, json, shutil, hashlib, sys
ROOT=Path(__file__).resolve().parents[1]
TEMPLATE=ROOT/'assets'/'project'
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def verify():
 manifest=json.loads((ROOT/'assets'/'manifest.json').read_text())
 errors=[]
 for rel,expected in manifest['files'].items():
  path=ROOT/rel
  if not path.is_file() or path.is_symlink() or digest(path)!=expected:errors.append(rel)
 known=set(manifest['files'])|{'assets/manifest.json'}
 extras=[str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and str(p.relative_to(ROOT)) not in known and '__pycache__' not in p.parts and p.name!='.DS_Store']
 errors.extend('unexpected: '+v for v in extras)
 return {'ok':not errors,'checked':len(manifest['files']),'errors':errors}
def main():
 p=argparse.ArgumentParser(description='Create a complete, offline-playable game from this independent skill')
 sub=p.add_subparsers(dest='command',required=True)
 sub.add_parser('verify');sub.add_parser('themes')
 c=sub.add_parser('create');c.add_argument('--out',required=True);c.add_argument('--theme');c.add_argument('--title')
 args=p.parse_args()
 if args.command=='verify':
  result=verify();print(json.dumps(result,ensure_ascii=False,indent=2));return 0 if result['ok'] else 1
 cfg=json.loads((TEMPLATE/'game-config.json').read_text())
 if args.command=='themes':print(json.dumps({k:{'title':v['title'],'label':v['label']} for k,v in cfg['themes'].items()},ensure_ascii=False,indent=2));return 0
 result=verify()
 if not result['ok']:raise ValueError('Skill integrity failed: '+', '.join(result['errors']))
 selected=args.theme or cfg.get('defaultTheme') or next(iter(cfg['themes']))
 if selected not in cfg['themes']:raise ValueError('Unknown theme. Choose: '+', '.join(cfg['themes']))
 if args.title is not None:
  if not args.title.strip() or len(args.title)>50 or any(ord(x)<32 for x in args.title):raise ValueError('Title must be 1..50 printable characters')
  cfg['themes'][selected]['title']=args.title.strip()
 cfg['defaultTheme']=selected
 raw=Path(args.out).expanduser().absolute()
 if any(q.is_symlink() for q in [raw,*raw.parents]):raise ValueError('Symlink output paths are not supported')
 out=raw.resolve()
 if out==ROOT or ROOT in out.parents or out in ROOT.parents:raise ValueError('Output must not overlap this skill')
 if out.exists() and (not out.is_dir() or any(out.iterdir())):raise ValueError('Output must be absent or an empty directory')
 if out.exists():out.rmdir()
 shutil.copytree(TEMPLATE,out,ignore=shutil.ignore_patterns('__pycache__','.DS_Store','*.pyc'))
 (out/'game-config.json').write_text(json.dumps(cfg,ensure_ascii=False,indent=2)+'\n')
 (out/'GENERATION.json').write_text(json.dumps({'skill':ROOT.name,'theme':selected,'tested':False,'note':'Complete playable starting game. Theme/title selection does not implement arbitrary new maps or mechanics.'},ensure_ascii=False,indent=2)+'\n')
 (out/'CREATIVE-BRIEF.md').write_text('# 创作记录\n\n- 本轮主题：'+cfg['themes'][selected]['title']+'\n- 继承：完整玩法与本地美术。\n- 用户新增目标：待 Agent 根据本轮请求填写并实现。\n- 修改文件与已完成内容：待记录。\n- 未完成与运行状态：本次生成尚未启动验证。\n')
 print(json.dumps({'ok':True,'project':str(out),'theme':selected,'run':['python3',str(out/'start.py'),'--port','4310'],'url':'http://127.0.0.1:4310','networkRequired':False},ensure_ascii=False,indent=2));return 0
if __name__=='__main__':
 try:sys.exit(main())
 except (ValueError,OSError,KeyError,json.JSONDecodeError) as e:print('Error: '+str(e),file=sys.stderr);sys.exit(1)
