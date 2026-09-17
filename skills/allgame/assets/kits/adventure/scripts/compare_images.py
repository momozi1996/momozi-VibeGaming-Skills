#!/usr/bin/env python3
"""Pixel-difference aid; requires Pillow+NumPy. Never blesses/replaces reference images."""
from pathlib import Path
import argparse,json,sys
try:
 import numpy as np
 from PIL import Image
except ImportError:
 sys.exit('Optional visual diff requires Pillow and NumPy. Core reproduction does not need them.')
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--reference',required=True);p.add_argument('--candidate',required=True);p.add_argument('--output',required=True);p.add_argument('--max-mae',type=float,default=3);p.add_argument('--max-changed-ratio',type=float,default=.02);p.add_argument('--pixel-threshold',type=int,default=18);a=p.parse_args()
ref=Path(a.reference).resolve();cand=Path(a.candidate).resolve();out=Path(a.output).resolve()
if out in [ref,cand] or ref in out.parents or cand in out.parents:sys.exit('Output must not overwrite either image set')
if out.exists() and any(out.iterdir()):sys.exit('Use a new output directory; previous comparison evidence is preserved')
if not(0<=a.pixel_threshold<=255 and a.max_mae>=0 and 0<=a.max_changed_ratio<=1):sys.exit('Invalid comparison thresholds')
out.mkdir(parents=True,exist_ok=True);rows=[];failed=False
for f in sorted(ref.glob('*.png')):
 c=cand/f.name
 if not c.exists():rows.append({'file':f.name,'status':'missing'});failed=True;continue
 x=np.asarray(Image.open(f).convert('RGB')).astype(np.int16);y=np.asarray(Image.open(c).convert('RGB')).astype(np.int16)
 if x.shape!=y.shape:rows.append({'file':f.name,'status':'size-mismatch','expected':x.shape,'actual':y.shape});failed=True;continue
 diff=np.abs(x-y);mae=float(diff.mean());ratio=float(np.mean(diff.max(axis=2)>a.pixel_threshold));ok=mae<=a.max_mae and ratio<=a.max_changed_ratio;failed|=not ok
 Image.fromarray(np.minimum(diff*4,255).astype('uint8')).save(out/(f.stem+'-diff.png'))
 combined=Image.new('RGB',(x.shape[1]*2,x.shape[0]));combined.paste(Image.fromarray(x.astype('uint8')),(0,0));combined.paste(Image.fromarray(y.astype('uint8')),(x.shape[1],0));combined.save(out/(f.stem+'-side-by-side.jpg'),quality=92)
 rows.append({'file':f.name,'meanAbsoluteRGBDifference':mae,'changedPixelRatio':ratio,'withinReviewThreshold':ok})
if not rows:sys.exit('No reference PNG files')
report={'note':'Numerical aid, not a guarantee of 1:1 rendering across GPUs/fonts. Inspect images. Do not loosen thresholds to hide geometry or layout differences.','thresholds':{'maxMae':a.max_mae,'maxChangedRatio':a.max_changed_ratio,'perPixel':a.pixel_threshold},'results':rows,'passed':not failed}
(out/'comparison.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2));sys.exit(1 if failed else 0)
