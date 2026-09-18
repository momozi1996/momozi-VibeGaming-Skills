#!/usr/bin/env python3
"""Verify a frozen reference or a reproduced project against recorded SHA256 values."""
from pathlib import Path
import argparse,hashlib,json,sys
SKILL=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--target',type=Path,default=SKILL/'assets/reference-project');p.add_argument('--scope',choices=['all','core','assets','dist'],default='all');p.add_argument('--report',type=Path);args=p.parse_args()
manifest=json.loads((SKILL/'references/project-manifest.json').read_text());bad=[];checked=0
for rel,meta in manifest['files'].items():
 if args.scope=='core' and (rel.startswith(('dist/','evidence/'))):continue
 if args.scope=='assets' and not rel.startswith('public/assets/'):continue
 if args.scope=='dist' and not rel.startswith('dist/'):continue
 checked+=1;f=args.target/rel
 if not f.is_file():bad.append({'path':rel,'reason':'missing'})
 elif hashlib.sha256(f.read_bytes()).hexdigest()!=meta['sha256']:bad.append({'path':rel,'reason':'sha256 differs'})
report={'target':str(args.target.resolve()),'scope':args.scope,'checked':checked,'passed':not bad,'differences':bad,'note':'Checks baseline files only. Extra files are not prohibited. Source equality is not an independent gameplay test.'}
if args.report:args.report.parent.mkdir(parents=True,exist_ok=True);args.report.write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2));sys.exit(bool(bad))
