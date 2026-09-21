#!/usr/bin/env python3
"""Tests restore/prepare/hash rejection without overwriting an existing project."""
import hashlib,json,subprocess,sys,tempfile
from pathlib import Path
S=Path(__file__).resolve().parents[1];pack=S/'scripts/pack.py'
results=[]
def run(*args,code=0):
    p=subprocess.run([sys.executable,str(pack),*args],capture_output=True,text=True)
    assert p.returncode==code,(args,p.returncode,p.stdout,p.stderr)
    return p
with tempfile.TemporaryDirectory(prefix='huoche-pack-selftest-') as d:
    d=Path(d);exact=d/'exact';rebuild=d/'rebuild'
    run('verify');results.append({'name':'input integrity','pass':True})
    run('restore','--out',str(exact));run('compare','--project',str(exact));results.append({'name':'exact copies all pinned files','pass':True})
    subprocess.run(['node',str(exact/'build.mjs')],check=True,capture_output=True)
    run('compare','--project',str(exact));results.append({'name':'rebuild exact HTML stays byte identical','pass':True})
    run('restore','--out',str(exact),code=1);results.append({'name':'nonempty output refused','pass':True})
    (exact/'src/game.js').write_text('// intentional corruption\n');run('compare','--project',str(exact),code=1);results.append({'name':'modified source rejected','pass':True})
    run('prepare','--out',str(rebuild));assert not (rebuild/'cloudline.html').exists();assert len((rebuild/'src/game.js').read_bytes())<300
    assert not (rebuild/'src/shell.html').read_bytes()==(S/'assets/reference-project/src/shell.html').read_bytes()
    subprocess.run(['node',str(rebuild/'build.mjs')],check=True,capture_output=True);assert (rebuild/'cloudline.html').exists();results.append({'name':'rebuild has dependency only, no game implementation','pass':True})
    run('prepare','--out',str(S/'assets/disallowed-test'),code=1);results.append({'name':'reference inputs protected','pass':True})
print(json.dumps({'ok':True,'results':results},indent=2))
