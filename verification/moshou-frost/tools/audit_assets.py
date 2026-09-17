"""Generate the shipped-asset provenance/hash manifest, or verify it with --check."""
from pathlib import Path
import hashlib,json,sys
R=Path(__file__).resolve().parents[1];A=R/'public/assets'
manifest=A/'manifest.json'
if '--check' in sys.argv:
 rows=json.loads(manifest.read_text());actual={str(p.relative_to(A)) for p in A.rglob('*') if p.is_file() and p!=manifest}
 assert actual=={r['file'] for r in rows},'Manifest and packaged files differ'
 for r in rows:
  p=A/r['file'];assert r['license']=='CC0-1.0';assert hashlib.sha256(p.read_bytes()).hexdigest()==r['sha256'],r['file'];assert p.stat().st_size==r['bytes']
 print('PASS',len(rows),'CC0 runtime asset records; every packaged file and SHA-256 matches')
 raise SystemExit
old={r['file']:r for r in json.loads(manifest.read_text())}
rows=[]
for p in sorted(A.rglob('*')):
 if not p.is_file() or p==manifest:continue
 name=str(p.relative_to(A));previous=old.get(name);note='';evidence='ASSETS-LICENSE.md';author='Original artwork authored for this demo'
 if name.startswith('textures/ground') or name=='textures/path.jpg':
  source='https://ambientcg.com/view?id=Ground037';author='ambientCG';evidence='docs/licenses/ambientcg-license.html';note='Resized source; path is a color-graded derivative. Normal map retained.'
 elif name.startswith('textures/wood'):
  source='https://ambientcg.com/view?id=Wood051';author='ambientCG';evidence='docs/licenses/ambientcg-license.html';note='Resized source PBR texture channels; the runtime scenery uses diffuse maps.'
 elif name=='textures/forest.hdr':
  source='https://polyhaven.com/a/forest_slope';author='Poly Haven contributors';evidence='docs/licenses/polyhaven-license.html';note='Local HDR environment lighting for glTF PBR materials.'
 elif name=='audio/forest.mp3':
  source='https://opengameart.org/content/forest-ambience';author='TinyWorlds';evidence='docs/licenses/forest-ambience.html'
 elif name.startswith('audio/'):
  pack='impact-sounds' if any(k in p.name for k in ['footstep','impactMetal']) else 'rpg-audio';source='https://kenney.nl/assets/'+pack;author='Kenney';evidence='docs/license-'+pack+'.zip.txt'
 elif name.startswith('ui/panel-border'):
  source='https://kenney.nl/assets/fantasy-ui-borders';author='Kenney';evidence='docs/license-fantasy-ui-borders.txt';note='Used as the nine-sliced modal frame.'
 elif name in ['models/wolf.glb','ui/wolf-portrait.png']:
  source='https://opengameart.org/content/wolf-1';author='Micket + original demo refinements';evidence='docs/licenses/wolf.html';note='CC0 wolf geometry; new subdivision, UVs, fur, animations, and portrait. No missing photo-reference assets used.'
 else:
  if name=='models/knight.glb' or name=='ui/portrait.png':source='tools/build_knight.py'
  elif name=='textures/wolf-fur.png':source='tools/build_wolf.py'
  elif p.name in ['rock.jpg','rock-normal.jpg','rune.png','contact.png','sky.jpg','map-tree.png']:source='tools/build_surface_details.py'
  elif name.startswith('ui/'):source='tools/build_ui.py'
  else:source='tools/prepare_assets.py'
  note='Original offline-generated artwork, dedicated to CC0. Not a Blizzard asset.'
 rows.append({'file':name,'source':source,'author':author,'license':'CC0-1.0','licenseEvidence':evidence,'verifiedDate':'2026-09-14','bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'notes':note})
manifest.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Recorded',len(rows),'assets:',sum(r['bytes'] for r in rows),'bytes')
