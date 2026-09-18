"""Reproducible CC0 asset import. Pillow + requests. Never uses ripped KOF assets."""
from pathlib import Path
from PIL import Image
import requests,zipfile,io,struct,zlib,json,hashlib
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public/assets'; CACHE=ROOT/'tools/source-cache';CACHE.mkdir(exist_ok=True)
SOURCES={
'human-fighter.gif':('https://opengameart.org/sites/default/files/human%20fighter.gif','https://opengameart.org/content/generic-woman-for-fighting-games-stardrinkers-style','Puffolotti'),
'karate.gif':('https://opengameart.org/sites/default/files/1_8.gif','https://opengameart.org/content/fighting-character-template-mustermann-2-a001aaaa001-karate','Puffolotti'),
'streets-of-fight.zip':('https://opengameart.org/sites/default/files/streets_of_fight_files.zip','https://opengameart.org/content/streets-of-fight','ansimuz'),
'fighter-icons.zip':('https://opengameart.org/sites/default/files/Icon%20assets%20%28fighter%29.zip','https://opengameart.org/content/game-icons-fighter-expansion','Kenney'),
'impact-sounds.zip':('https://kenney.nl/media/pages/assets/impact-sounds/87b4ddecda-1677589768/kenney_impact-sounds.zip','https://kenney.nl/assets/impact-sounds','Kenney'),
'voiceover-fighter.zip':('https://kenney.nl/media/pages/assets/voiceover-pack-fighter/6ceb77c6f1-1677589837/kenney_voiceover-pack-fighter.zip','https://kenney.nl/assets/voiceover-pack-fighter','Kenney')}
manifest=[]
for name,(url,page,author) in SOURCES.items():
 p=CACHE/name
 if not p.exists():
  temp=Path('/tmp/kof-asset-audit')/name
  if temp.exists():p.write_bytes(temp.read_bytes())
  else:
   r=requests.get(url,timeout=60);r.raise_for_status();p.write_bytes(r.content)
 manifest.append(dict(file=name,url=url,page=page,author=author,license='CC0-1.0',sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
(ROOT/'docs/asset-manifest.json').write_text(json.dumps(manifest,indent=2))
# Animation source indices are explicit. Each clip will be retimed by the 60Hz combat timeline.
def seq(a,b): return list(range(a,b+1)) if b>=a else list(range(a,b-1,-1))
clips={
'ava':dict(idle=seq(0,6)+seq(5,1),walk=seq(70,78),jump=seq(257,264),fall=seq(265,271),crouch=[256,360],guard=seq(375,381),hurt=seq(333,338),down=seq(339,348),win=seq(327,332),lp=seq(7,12),hp=seq(17,25),lk=seq(26,32),hk=seq(49,54)+[62],air=seq(300,307),low=seq(409,414)+[360],special=seq(33,43)+[31,32]),
'ren':dict(idle=seq(6,15)+seq(14,7),walk=seq(480,507),jump=seq(576,582),fall=seq(584,590),crouch=seq(826,829),guard=seq(475,480),hurt=seq(532,544),down=seq(978,988),win=seq(369,380),lp=seq(17,36),hp=seq(45,61),lk=seq(151,182),hk=seq(183,215),air=seq(749,776),low=seq(851,881),special=seq(360,380))}
for fighter,anim in clips.items():
 src=Image.open(CACHE/('human-fighter.gif' if fighter=='ava' else 'karate.gif'))
 # Preserve every source pixel. Trim transparent margins for packing ONLY; store root-relative
 # bounds per frame so trimming cannot introduce animation foot jitter. 2px texture gutters.
 anchor=(104,233) if fighter=='ava' else (104,222)
 scale=184/144 if fighter=='ava' else 184/152
 ids=sorted(set(sum(anim.values(),[])));lookup={};frames={};cells=[];x=y=row=0
 for idx,n in enumerate(ids):
  src.seek(n);img=src.convert('RGBA')
  if fighter=='ava':
   # Palette-only costume recolor (green top -> crimson), not resampling/AI upscaling.
   import colorsys
   px=img.load()
   for yy in range(img.height):
    for xx in range(img.width):
     r,g,b,a=px[xx,yy]
     if a and g>r*1.15 and g>b*1.12:
      h,sat,val=colorsys.rgb_to_hsv(r/255,g/255,b/255)
      if .20<h<.48:
       rr,gg,bb=colorsys.hsv_to_rgb(.98,sat,val);px[xx,yy]=(round(rr*255),round(gg*255),round(bb*255),a)
  box=img.getbbox();assert box
  cell=img.crop(box);w,h=cell.size
  if x+w+4>2048:x=0;y+=row;row=0
  frames[str(idx)]={'sourceFrame':n,'rect':[x+2,y+2,w,h],'bounds':[box[0]-anchor[0],box[1]-anchor[1],w,h]}
  cells.append((cell,(x+2,y+2)));lookup[n]=idx;x+=w+4;row=max(row,h+4)
 atlas=Image.new('RGBA',(2048,y+row))
 for cell,pos in cells:atlas.alpha_composite(cell,pos)
 atlas.save(OUT/'fighters'/f'{fighter}.png',optimize=True)
 timings={'lp':[2,3],'hp':[5,7],'lk':[3,4],'hk':[2,4],'air':[3,5],'low':[2,4],'special':[4,8]} if fighter=='ava' else {}
 meta=dict(scale=scale,sourceSize=list(src.size),sourceRoot=list(anchor),packing='trimmed-native-with-fixed-root',timings=timings,clips={k:[lookup[n] for n in v] for k,v in anim.items()},frames=frames)
 (OUT/'fighters'/f'{fighter}.json').write_text(json.dumps(meta))
 # Portraits kept at native resolution. The menu uses animated atlas frames, not blown-up crops.
 idx=lookup[anim['idle'][0]];cells[idx][0].save(OUT/'fighters'/f'{fighter}-portrait.png')
 print(f'{fighter}: {len(ids)} native frames, atlas {atlas.size}, scale {scale:.3f}')
(OUT/'credits.json').write_text(json.dumps(manifest,indent=2))
# Extract full-resolution stage from Aseprite source, excluding the unused asset palette below it.
z=zipfile.ZipFile(CACHE/'streets-of-fight.zip');b=z.read('Streets of Fight files/Aseprite/1stage.ase');pos=144
for i in range(struct.unpack_from('<H',b,134)[0]):
 length,typ=struct.unpack_from('<IH',b,pos);d=b[pos+6:pos+length];pos+=length
 if typ==0x2005:
  layer,x,y,opacity,ct=struct.unpack_from('<HhhBH',d);w,h=struct.unpack_from('<HH',d,16);img=Image.frombytes('RGBA',(w,h),zlib.decompress(d[20:]));canvas=Image.new('RGBA',(1200,624));canvas.alpha_composite(img,(x,y))
  if layer==1:canvas.crop((0,0,1200,176)).save(OUT/'stage/street.png')
  if layer==2:
   props=canvas.crop((0,0,1200,176));props.paste((0,0,0,0),(0,125,1200,176));props.paste((0,0,0,0),(110,0,195,25));props.save(OUT/'stage/props.png')
for name,dest in [('back.png','skyline.png'),('fore.png','foreground.png')]:
 (OUT/'stage'/dest).write_bytes(z.read('Streets of Fight files/Stage Layers/'+name))
for prop in ['car','hydrant']:(OUT/'stage'/f'{prop}.png').write_bytes(z.read(f'Streets of Fight files/Stage Layers/props/{prop}.png'))
(OUT/'stage/road.png').write_bytes(z.read('Streets of Fight files/Stage Layers/tileset.png'))
# Retain package licenses alongside copied assets.
(OUT/'stage/LICENSE.txt').write_bytes(z.read('Streets of Fight files/public-license.txt'))
for pack,names in [('impact-sounds.zip',['impactPunch_medium_000','impactPunch_heavy_000','impactSoft_heavy_000','footstep_concrete_000']),('voiceover-fighter.zip',['choose_your_character','round_1','round_2','round_3','fight','you_win','you_lose','winner','final_round'])]:
 z=zipfile.ZipFile(CACHE/pack)
 for name in names:
  n='Audio/'+name+'.ogg'
  if n in z.namelist():(OUT/'audio'/f'{name}.ogg').write_bytes(z.read(n))
  else:print('NOT FOUND',n)
 (OUT/'audio'/f'{pack}-LICENSE.txt').write_bytes(z.read('License.txt'))
z=zipfile.ZipFile(CACHE/'fighter-icons.zip')
for name in ['kick','punchHigh','kickLow']:(OUT/'icons'/f'{name}.png').write_bytes(z.read(f'PNG/White/2x/{name}.png'))
(OUT/'icons/LICENSE.txt').write_bytes(z.read('license.txt'))
print('Assets imported. Review docs/asset-manifest.json for source and SHA256.')
