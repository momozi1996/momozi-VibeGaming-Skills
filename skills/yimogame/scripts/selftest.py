#!/usr/bin/env python3
"""Regression tests for the reproduction toolkit, never modifying kit inputs."""
import argparse,json,pathlib,subprocess,sys,tempfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
def main():
    p=argparse.ArgumentParser();p.add_argument('--out',required=True);a=p.parse_args();report_path=pathlib.Path(a.out).resolve()
    if report_path.exists():raise SystemExit('Refusing to overwrite existing report')
    checks=[]
    def run(*args,ok=True):
        r=subprocess.run([sys.executable,str(ROOT/'scripts/reproduce.py'),*map(str,args)],text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
        if (r.returncode==0)!=ok:raise AssertionError(r.stdout)
        return r.stdout
    with tempfile.TemporaryDirectory(prefix='yimo-toolkit-selftest-') as t:
        d=pathlib.Path(t);output=d/'exact'
        run('verify');checks.append('frozen input verification')
        run('restore','--out',output,'--mode','exact');run('compare','--project',output,'--all');checks.append('exact restores all 66 files byte-for-byte')
        run('restore','--out',output,ok=False);checks.append('nonempty output refuses overwrite')
        run('restore','--out',ROOT/'assets/illegal-output',ok=False);assert not (ROOT/'assets/illegal-output').exists();checks.append('output inside kit rejected without mutation')
        run('restore','--out',ROOT.parent,ok=False);checks.append('output ancestor of kit rejected')
        link=d/'link'; real=d/'real';real.mkdir();link.symlink_to(real,target_is_directory=True)
        run('restore','--out',link,ok=False);assert not list(real.iterdir());kitlink=d/'kitlink';kitlink.symlink_to(ROOT,target_is_directory=True);run('restore','--out',kitlink/'illegal-output',ok=False);assert not (ROOT/'illegal-output').exists();checks.append('symlink output and symlink ancestor overlapping kit rejected without mutation')
        run('play','--out',d/'bad-port','--port','0',ok=False);assert not (d/'bad-port').exists();checks.append('invalid play port rejected before restoration')
        target=output/'src/state.js';original=target.read_bytes();target.write_bytes(original+b'\n// mutation\n');run('compare','--project',output,ok=False);target.write_bytes(original);checks.append('source corruption detected in output')
        extra=output/'src/extra.js';extra.write_text('export const x=1');run('compare','--project',output,ok=False);extra.unlink();checks.append('unexpected source file detected')
        rebuild=d/'rebuild';run('restore','--out',rebuild,'--mode','rebuild');assert not list((rebuild/'src').iterdir());assert (rebuild/'package-lock.json').exists() and (rebuild/'tests/state.test.mjs').exists();checks.append('rebuild is an honestly empty implementation with dependency/test scaffolding')
        # Known exact and changed RGB images test the PNG codec and pixel-diff exit status.
        import runpy
        mod=runpy.run_path(str(ROOT/'scripts/visual_diff.py'));write_png=mod['write_png'];g=d/'g';x=d/'x';g.mkdir();x.mkdir();rgb=bytearray([10,30,50]*100)
        write_png(g/'01-case.png',10,10,rgb);write_png(x/'01-case.png',10,10,rgb)
        r=subprocess.run([sys.executable,str(ROOT/'scripts/visual_diff.py'),'--golden',str(g),'--actual',str(x),'--out',str(d/'equal')]);assert r.returncode==0
        write_png(x/'01-case.png',10,10,bytearray([240,240,240]*100));r=subprocess.run([sys.executable,str(ROOT/'scripts/visual_diff.py'),'--golden',str(g),'--actual',str(x),'--out',str(d/'changed')]);assert r.returncode==1;checks.append('PNG diff passes identical image and fails changed image')
    report_path.parent.mkdir(parents=True,exist_ok=True);report_path.write_text(json.dumps({'passed':True,'checks':checks},indent=2));print(f'PASS {len(checks)} toolkit selftests');return 0
if __name__=='__main__':raise SystemExit(main())
