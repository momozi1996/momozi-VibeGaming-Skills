from pathlib import Path
import subprocess,sys,tempfile,json
kit=Path(sys.argv[1]).resolve();report=Path(sys.argv[2]);checks=[]
def run(*args,ok=True):
 p=subprocess.run([sys.executable,str(kit/'scripts/game.py'),*map(str,args)],text=True,capture_output=True)
 assert (p.returncode==0)==ok,p.stdout+p.stderr
with tempfile.TemporaryDirectory(prefix='quanwang-tools-') as d:
 root=Path(d).resolve();dest=root/'game'
 run('create','--out',dest);assert (dest/'dist/index.html').exists() and (dest/'src/main.ts').exists();checks.append('create restores full runnable game')
 run('create','--out',dest,ok=False);checks.append('existing output refused')
 run('create','--out',kit/'illegal-output',ok=False);assert not (kit/'illegal-output').exists();checks.append('inside skill refused')
 link=root/'alias';link.symlink_to(root/'not-created',target_is_directory=True);run('create','--out',link,ok=False);assert not (root/'not-created').exists();checks.append('dangling symbolic link refused')
 alias=root/'kit-alias';alias.symlink_to(kit,target_is_directory=True);run('create','--out',alias/'illegal-output',ok=False);assert not (kit/'illegal-output').exists();checks.append('symlink ancestor into kit refused')
 run('play','--out',root/'invalid','--port','-1',ok=False);assert not (root/'invalid').exists();checks.append('invalid port refused before output')
 f=dest/'src/main.ts';f.write_bytes(f.read_bytes()+b'\n// changed\n');r=subprocess.run([sys.executable,str(kit/'scripts/verify.py'),'--target',str(dest)],capture_output=True);assert r.returncode!=0;checks.append('project source corruption detected')
report.write_text(json.dumps({'passed':True,'checks':checks},indent=2));print('PASS',len(checks),'tool checks')
