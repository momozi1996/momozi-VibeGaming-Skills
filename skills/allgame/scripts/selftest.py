#!/usr/bin/env python3
"""Exercise allGame's actual CLI in temporary outputs; no npm, GPU, or network required."""
import hashlib,json,subprocess,sys,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SCRIPT=ROOT/'scripts/game.py'
def call(*args,ok=True):
    p=subprocess.run([sys.executable,str(SCRIPT),*map(str,args)],capture_output=True,text=True)
    if (p.returncode==0)!=ok:raise AssertionError(p.stdout+p.stderr)
    return json.loads(p.stdout or p.stderr)
def main():
    checks=[]
    def check(name,fn):fn();checks.append({'name':name,'pass':True})
    with tempfile.TemporaryDirectory(prefix='allgame-test-') as tmp:
        t=Path(tmp)
        check('sealed package',lambda:call('verify'))
        check('family and recipe listing',lambda:call('list'))
        for family in ['racing','adventure']:
            exact=t/(family+'-exact')
            check(family+' exact',lambda:call('create','--family',family,'--mode','exact','--out',exact))
            check(family+' exact byte match',lambda:call('compare','--family',family,'--project',exact,'--exact'))
            assert not (exact/'GENERATION.json').exists()
            check(family+' nonempty protection',lambda:call('create','--family',family,'--out',exact,ok=False))
            p=exact/'package.json';before=hashlib.sha256(p.read_bytes()).hexdigest()
            assert before==hashlib.sha256((ROOT/'assets/kits'/family/'assets/reference-project/package.json').read_bytes()).hexdigest()
            rebuild=t/(family+'-rebuild')
            check(family+' rebuild',lambda:call('create','--family',family,'--mode','rebuild','--out',rebuild))
            assert not list((rebuild/'src').rglob('*'))
            check(family+' rebuild retains art and tests',lambda:call('compare','--family',family,'--project',rebuild))
            for key in call('list')['families'][family]['presets']:
                out=t/key
                check(family+' preset '+key,lambda:call('create','--family',family,'--preset',key,'--out',out))
                assert not (out/'dist').exists()
                check(family+' preset pins '+key,lambda:call('compare','--family',family,'--project',out))
            out=t/(family+'-custom')
            check(family+' validate design brief',lambda:call('validate-brief','--brief',ROOT/'assets/examples'/(family+'-brief.json')))
            check(family+' custom theme and brief',lambda:call('create','--brief',ROOT/'assets/examples'/(family+'-brief.json'),'--theme-json',ROOT/'assets/examples'/(family+'-theme.json'),'--out',out))
            theme=json.loads((out/'THEME-SOURCE.json').read_text());patch=json.loads((ROOT/'assets/examples'/(family+'-theme.json')).read_text())
            assert theme['title']==patch['title']
            assert json.loads((out/'GENERATION.json').read_text())['tested'] is False
            assert '需要继续实现' in (out/'GAME-CONTRACT.md').read_text()
            assert patch['brand'] in (out/'index.html').read_text()
            check(family+' custom variant reports differences',lambda:call('diff','--family',family,'--project',out))
            p.write_text('{}')
            check(family+' detects altered baseline',lambda:call('compare','--family',family,'--project',exact,'--exact',ok=False))
        check('requires family',lambda:call('create','--out',t/'missing-family',ok=False))
        check('reject cross-family preset',lambda:call('create','--family','racing','--preset','frost','--out',t/'bad-preset',ok=False))
        check('reject exact theme',lambda:call('create','--family','racing','--mode','exact','--preset','sakura','--out',t/'bad-exact',ok=False))
        check('reject exact design brief',lambda:call('create','--mode','exact','--brief',ROOT/'assets/examples/racing-brief.json','--out',t/'bad-brief',ok=False))
        check('reject family/brief mismatch',lambda:call('create','--family','racing','--brief',ROOT/'assets/examples/adventure-brief.json','--out',t/'conflict',ok=False))
        for label,dest in [('root',ROOT),('ancestor',ROOT.parent),('sibling-kit',ROOT/'assets/kits/adventure/new-output')]:
            check('protect '+label,lambda:call('create','--family','racing','--out',dest,ok=False))
        (t/'alias').symlink_to(ROOT/'references',target_is_directory=True)
        check('symlink destination',lambda:call('create','--family','racing','--out',t/'alias',ok=False))
        check('symlink ancestor into package',lambda:call('create','--family','racing','--out',t/'alias/new-game',ok=False))
        cases=[('unknown',{'unsupported':1}),('color',{'colors':{'sky':'red'}}),('code',{'brand':'${alert(1)}'}),
               ('markup',{'title':'<script>'}),('boolean-seed',{'seed':True}),('degenerate-track',{'trackPoints':[[0,0],[1,0],[2,0],[3,0]]}),
               ('coincident-track',{'trackPoints':[[0,0],[0,0],[20,30],[-30,20]]}),('NaN',{'seed':float('nan')})]
        for label,patch in cases:
            p=t/(label+'.json');p.write_text(json.dumps(patch));out=t/('bad-'+label)
            check('reject theme '+label,lambda:call('create','--family','racing','--theme-json',p,'--out',out,ok=False));assert not out.exists()
        # Direct helper invocation must not bypass the whole-package read-only boundary.
        p=subprocess.run([sys.executable,str(ROOT/'assets/kits/racing/scripts/project.py'),'create','--mode','exact','--out',str(ROOT/'assets/kits/adventure/rejected')],capture_output=True,text=True)
        assert p.returncode!=0;checks.append({'name':'nested kit protects sibling inputs','pass':True})
        check('package stays intact',lambda:call('verify'))
    print(json.dumps({'skill':'allgame','passed':len(checks),'checks':checks},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
