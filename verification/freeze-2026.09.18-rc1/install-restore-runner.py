from pathlib import Path
import json,tempfile,subprocess,sys,hashlib,os,shutil
root=Path.cwd();r=root/'verification/freeze-2026.09.18-rc1';tmp=Path(tempfile.mkdtemp(prefix='game-freeze-install-')).resolve();(r/'isolated-path.txt').write_text(str(tmp));results=[]
catalog=json.loads((root/'packages.json').read_text())
for row in catalog['packages']:
 id=row['id'];log=[]
 def run(cmd,required=True):
  p=subprocess.run(list(map(str,cmd)),text=True,capture_output=True);log.append({'command':[str(x) for x in cmd],'exit':p.returncode,'stdout':p.stdout,'stderr':p.stderr})
  if required and p.returncode:raise RuntimeError(p.stdout+p.stderr)
  return p
 run([sys.executable,root/'scripts/install_skill.py','--skill',id,'--skills-dir',tmp/'skills'])
 k=tmp/'skills'/id
 before={p.relative_to(k).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in k.rglob('*') if p.is_file()}
 source={p.relative_to(root/row['directory']).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in (root/row['directory']).rglob('*') if p.is_file()};assert before==source
 outputs=[]
 for family in (['racing','adventure'] if id=='allgame' else [None]):
  out=tmp/'projects'/(id+('-'+family if family else ''))
  if id in ['maomao3dgame','moshougame']:cmd=[sys.executable,k/'scripts/project.py','create','--mode','exact','--out',out]
  elif id=='allgame':cmd=[sys.executable,k/'scripts/game.py','create','--family',family,'--mode','exact','--out',out]
  elif id=='yimogame':cmd=[sys.executable,k/'scripts/reproduce.py','restore','--mode','exact','--out',out]
  else:cmd=[sys.executable,k/'scripts/game.py','create','--out',out]
  run(cmd);again=run(cmd,False);assert again.returncode!=0
  assert (out/'index.html').exists()
  unit=None;build=None;cache=None
  if (out/'package-lock.json').exists():
   cache_map={'maomao3dgame':'maomao-sakura','moshougame':'moshou-autumn','yimogame':'yimogame/project','quanwanggame':'quanwanggame/project','allgame':'allgame/'+('racing-custom' if family=='racing' else 'adventure-custom')}
   cache=root/'verification'/cache_map[id]
   assert (out/'package-lock.json').read_bytes()==(cache/'package-lock.json').read_bytes(),'Cached dependency lock differs'
   shutil.copytree(cache/'node_modules',out/'node_modules',symlinks=True)
  p=subprocess.run(['npm','test'],cwd=out,text=True,capture_output=True);unit={'exit':p.returncode,'stdout':p.stdout,'stderr':p.stderr};assert p.returncode==0,p.stdout+p.stderr
  if cache:
   p=subprocess.run(['npm','run','build'],cwd=out,text=True,capture_output=True);build={'exit':p.returncode,'stdout':p.stdout,'stderr':p.stderr};assert p.returncode==0,p.stdout+p.stderr
  outputs.append({'path':str(out),'family':family,'hasDist':(out/'dist/index.html').is_file(),'unit':unit,'build':build,'dependencies':'Copied existing local node_modules after verifying identical package-lock; not a cold npm ci' if cache else 'No npm dependencies'})
 results.append({'id':id,'installedFileCount':len(before),'allBytesMatch':True,'refusesOverwrite':True,'outputs':outputs})
 (r/(id+'-install-restore.json')).write_text(json.dumps(log,ensure_ascii=False,indent=2));print('PASS installed & restored',id,flush=True)
(r/'install-restore-summary.json').write_text(json.dumps({'success':True,'temporaryRoot':str(tmp),'skills':results,'note':'New local installer used for all 9; allgame restored both families. All 10 unit suites run; 6 source builds use copied previously installed dependencies with equal lockfiles, not cold npm ci. No global install.'},ensure_ascii=False,indent=2));print(tmp)
