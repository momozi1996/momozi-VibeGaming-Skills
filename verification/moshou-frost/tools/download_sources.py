"""Optional offline art rebuild prerequisites. Only pinned, audited CC0 downloads.
Game launch does not need this: all runtime assets are already in public/assets.
"""
from pathlib import Path
import urllib.request,json,hashlib,zipfile,os
R=Path(__file__).resolve().parents[1];out=Path(os.environ.get('NORTHSHIRE_SOURCE_DIR',str(R/'tools/.sources')));out.mkdir(parents=True,exist_ok=True)
needed={'Ground037_2K-JPG.zip','Wood051_1K-JPG.zip','rpg-audio.zip','impact-sounds.zip','ui-borders.zip','forest-ambience.mp3','forest_slope_2k.hdr'}
for item in json.loads((R/'docs/download-audit.json').read_text()):
 if item['file'] not in needed:continue
 dest=out/item['file'];expected=item['sha256']
 if dest.exists() and hashlib.sha256(dest.read_bytes()).hexdigest()==expected:print('Cached',dest.name);continue
 request=urllib.request.Request(item['url'],headers={'User-Agent':'Northshire-art-rebuild/1.0'})
 with urllib.request.urlopen(request,timeout=120) as response:data=response.read()
 if hashlib.sha256(data).hexdigest()!=expected:raise RuntimeError('Source changed: re-audit license and hash before use: '+item['file'])
 dest.write_bytes(data)
 if dest.suffix=='.zip':
  with zipfile.ZipFile(dest) as z:assert z.testzip() is None
 print('Verified',dest.name,len(data),'bytes')
