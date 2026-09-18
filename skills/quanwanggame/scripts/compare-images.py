#!/usr/bin/env python3
"""Simple reproducible pixel metric. Not a claim of perceptual/functional similarity."""
from pathlib import Path
from PIL import Image,ImageChops,ImageStat
import argparse,json,sys
p=argparse.ArgumentParser();p.add_argument('--baseline',type=Path,required=True);p.add_argument('--actual',type=Path,required=True);p.add_argument('--out',type=Path,required=True);p.add_argument('--max-mae',type=float,default=5.0);a=p.parse_args();a.out.mkdir(parents=True,exist_ok=True);rows=[]
for base in sorted(a.baseline.glob('*.png')):
 actual=a.actual/base.name
 if not actual.exists():rows.append(dict(file=base.name,passed=False,reason='missing'));continue
 x=Image.open(base).convert('RGB');y=Image.open(actual).convert('RGB')
 if x.size!=y.size:rows.append(dict(file=base.name,passed=False,reason='dimensions differ',baseline=x.size,actual=y.size));continue
 diff=ImageChops.difference(x,y);mae=sum(ImageStat.Stat(diff).mean)/3
 diff.save(a.out/('diff-'+base.name));rows.append(dict(file=base.name,mae=mae,maxMAE=a.max_mae,passed=mae<=a.max_mae))
r=dict(passed=bool(rows) and all(r['passed'] for r in rows),images=rows,note='RGB MAE 0..255; NOT a percentage fidelity score. Review images and gameplay separately.')
(a.out/'report.json').write_text(json.dumps(r,indent=2));print(json.dumps(r,indent=2));sys.exit(not r['passed'])
