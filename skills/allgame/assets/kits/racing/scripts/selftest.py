#!/usr/bin/env python3
"""Exercise actual scaffold behavior in a temporary directory; no npm, browser, or input mutation."""
import json, subprocess, sys, tempfile, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SCRIPT=ROOT/'scripts/project.py'
def run(*args,good=True):
 p=subprocess.run([sys.executable,str(SCRIPT),*map(str,args)],capture_output=True,text=True)
 if (p.returncode==0)!=good:raise AssertionError(p.stdout+p.stderr)
 return json.loads(p.stdout if p.returncode==0 else p.stderr or p.stdout)
def main():
 results=[]
 def check(name,fn):fn();results.append({'name':name,'passed':True})
 with tempfile.TemporaryDirectory(prefix='game-skill-test-') as raw:
  t=Path(raw);exact=t/'exact';rebuild=t/'rebuild'
  check('sealed skill integrity',lambda:run('verify'))
  check('exact restoration',lambda:run('create','--mode','exact','--out',exact))
  check('exact bytes match',lambda:run('compare','--project',exact,'--exact'))
  check('nonempty output refused',lambda:run('create','--out',exact,good=False))
  check('skill input refused',lambda:run('create','--out',ROOT/'cannot-write-here',good=False))
  check('skill ancestor refused',lambda:run('create','--out',ROOT.parent,good=False))
  before=hashlib.sha256((exact/'package.json').read_bytes()).hexdigest()
  (t/'alias').symlink_to(exact,target_is_directory=True)
  check('symlink output refused',lambda:run('create','--out',t/'alias',good=False))
  assert hashlib.sha256((exact/'package.json').read_bytes()).hexdigest()==before
  check('unknown preset refused before creating output',lambda:run('create','--preset','missing','--out',t/'bad',good=False))
  assert not (t/'bad').exists()
  check('exact cannot accept preset',lambda:run('create','--mode','exact','--preset','autumn','--out',t/'bad',good=False))
  check('rebuild scaffold',lambda:run('create','--mode','rebuild','--out',rebuild))
  assert not list((rebuild/'src').rglob('*')) and (rebuild/'public').is_dir()
  check('rebuild preserves assets and tests',lambda:run('compare','--project',rebuild))
  for key in run('presets')['presets']:
   out=t/key
   check('materialize preset '+key,lambda:run('create','--mode','variant','--preset',key,'--out',out))
   check('preset retains baseline assets/tests '+key,lambda:run('compare','--project',out))
   assert list((out/'src').glob('theme.*')) and not (out/'dist').exists()
   diff=run('diff','--project',out);assert diff['differences'] and any('theme.' in p for p in diff['added'])
  (exact/'package.json').write_text('{}')
  check('detect changed baseline file',lambda:run('compare','--project',exact,'--exact',good=False))
  check('skill remains intact',lambda:run('verify'))
 print(json.dumps({'skill':ROOT.name,'passed':len(results),'checks':results},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
