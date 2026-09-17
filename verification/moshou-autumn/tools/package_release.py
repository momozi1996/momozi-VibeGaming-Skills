"""Bundle the offline-playable build and reproducible source without node_modules."""
from pathlib import Path
import zipfile,json,hashlib
R=Path(__file__).resolve().parents[1];out=R/'release';out.mkdir(exist_ok=True)
include={'src','public','docs','tests','tools'}
root_files={'README.md','LICENSE','ASSETS-LICENSE.md','THIRD_PARTY_NOTICES.md','package.json','package-lock.json','index.html','tsconfig.json','.gitignore'}
source=out/'northshire-source.zip'
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED,6) as z:
 for p in sorted(R.rglob('*')):
  if not p.is_file():continue
  rel=p.relative_to(R)
  if rel.parts[0] not in include and str(rel) not in root_files:
   if rel.parts[0]!='screenshots' or (p.suffix!='.json' and p.name!='preview.jpg'):continue
  if any(k in rel.parts for k in ['node_modules','.sources','regressions','__pycache__']):continue
  if p.suffix in ['.log','.blend1']:continue
  z.write(p,'northshire/'+str(rel))
prod=out/'northshire-web-build.zip'
with zipfile.ZipFile(prod,'w',zipfile.ZIP_DEFLATED,6) as z:
 for p in sorted((R/'dist').rglob('*')):
  if p.is_file():z.write(p,'northshire-web/'+str(p.relative_to(R/'dist')))
 z.writestr('northshire-web/START.txt','Northshire — unofficial single-player demo\n\nServe this directory at the site root over HTTP, e.g.\n  python3 -m http.server 8080\nThen open http://localhost:8080\n\nA desktop browser with WebGL and JavaScript is required.\nNo external art downloads or account/API key are needed.\nSee licenses/ and assets/manifest.json for art/software licenses.\n')
rows=[]
for p in [source,prod]:
 with zipfile.ZipFile(p) as z:assert z.testzip() is None
 rows.append({'file':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(out/'checksums.json').write_text(json.dumps(rows,indent=2))
print(json.dumps(rows,indent=2))
