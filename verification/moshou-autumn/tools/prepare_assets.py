"""Prepare audited CC0 source textures and original deterministic game textures.
Original generated textures in this script are dedicated to CC0-1.0.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from pathlib import Path
import numpy as np, random, math, zipfile, shutil, hashlib, json, os
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public/assets'; SRC=Path(os.environ.get('NORTHSHIRE_SOURCE_DIR',str(ROOT/'tools/.sources')))
random.seed(411); rng=np.random.default_rng(411)
manifest=[]
def record(path,source,license='CC0-1.0',note=''):
 p=OUT/path
 manifest.append(dict(file=str(path),source=source,license=license,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),notes=note))
def save(im,name,source='Original procedural artwork: tools/prepare_assets.py',quality=91):
 p=OUT/'textures'/name;p.parent.mkdir(parents=True,exist_ok=True)
 im.save(p,quality=quality);record('textures/'+name,source)
def noise(im,amp=5):
 a=np.array(im).astype(np.float32);n=rng.normal(0,amp,a.shape[:2])[...,None]
 a[:,:,:3]=np.clip(a[:,:,:3]+n,0,255)
 return Image.fromarray(a.astype('uint8'))
def gradient(size,top,bottom):
 w,h=size; a=np.zeros((h,w,3),dtype=np.uint8)
 for y in range(h):a[y,:]=np.array(top)*(1-y/h)+np.array(bottom)*(y/h)
 return Image.fromarray(a)
# Real CC0 sources from verified archives.
for asset,out,sz in [('Ground037','ground',1024),('Wood051','wood',1024)]:
 zpath=next(SRC.glob(asset+'_*JPG.zip'))
 with zipfile.ZipFile(zpath) as z:
  for channel,suffix in [('Color',''),('NormalGL','-normal'),('Roughness','-rough')]:
   f=next(n for n in z.namelist() if n.endswith('_'+channel+'.jpg'))
   import io
   im=Image.open(io.BytesIO(z.read(f))).convert('RGB');im=im.resize((sz,sz),Image.Resampling.LANCZOS)
   if channel=='Color' and asset=='Ground037':im=ImageEnhance.Color(im).enhance(1.1)
   save(im,out+suffix+'.jpg','https://ambientcg.com/view?id='+asset)
# Brick wall: original painted limestone, mortared, chipped blocks.
s=1024;im=Image.new('RGB',(s,s),(94,96,85));d=ImageDraw.Draw(im)
for row in range(12):
 y=row*86
 for col in range(-1,9):
  x=col*145+(row%2)*72;w=140+random.randint(-4,4);h=80
  tone=random.randint(-12,13);base=(175+tone,177+tone,159+tone)
  d.rounded_rectangle((x+3,y+3,x+w,y+h),radius=5,fill=base)
  d.line([(x+7,y+8),(x+w-5,y+8)],fill=(210+tone,211+tone,187+tone),width=3)
  d.line([(x+7,y+8),(x+7,y+h-7)],fill=(189+tone,192+tone,170+tone),width=2)
  d.line([(x+7,y+h-2),(x+w-5,y+h-2),(x+w-2,y+8)],fill=(131+tone,137+tone,122+tone),width=4)
  for j in range(18):
   px=x+random.randint(9,w-7);py=y+random.randint(12,h-9)
   d.line((px,py,px+random.randint(2,16),py+random.randint(-2,2)),fill=(156+tone,161+tone,141+tone),width=1)
  if random.random()<.25:
   px=x+random.randint(20,100);d.line([(px,y+5),(px+3,y+23),(px-5,y+35)],fill=(120,129,112),width=1)
save(noise(im,4),'limestone.jpg')
# Normal map from shaded relief/height approximation.
a=np.array(im.convert('L').filter(ImageFilter.GaussianBlur(1.5)),dtype=float)/255
v,u=np.gradient(a);norm=np.dstack((-u*3,-v*3,np.ones_like(a)));norm/=np.linalg.norm(norm,axis=2,keepdims=True)
save(Image.fromarray(((norm*.5+.5)*255).astype('uint8')),'limestone-normal.jpg')
# Terracotta tile roof.
im=Image.new('RGB',(s,s),(56,34,28));d=ImageDraw.Draw(im)
for row in range(-1,14):
 y=row*80
 for col in range(-1,13):
  x=col*88+(row%2)*44;v=random.randint(-15,15)
  d.rounded_rectangle((x+2,y+2,x+84,y+91),radius=7,fill=(132+v,57+v//2,34+v//2))
  for k in range(10):
   xx=x+4+k*8;light=int(15*math.sin(k/10*math.pi));d.line((xx,y+10,xx-2,y+80),fill=(147+v+light,66+v//2+light//2,38+v//2),width=7)
  d.arc((x+3,y+62,x+84,y+95),0,180,fill=(201+v,103+v//2,58),width=4)
  d.line((x+9,y+11,x+9,y+75),fill=(185+v,87+v//2,45),width=2)
save(noise(im,4),'roof.jpg')
# Ground-to-path texture derived from CC0 soil detail, colored as sand/gravel.
a=np.asarray(Image.open(OUT/'textures/ground.jpg').convert('L')).astype(float)
b=np.stack([a*.64+88,a*.51+70,a*.34+43],axis=2);save(Image.fromarray(np.clip(b,0,255).astype('uint8')),'path.jpg','https://ambientcg.com/view?id=Ground037','91' if False else 91)
# Rough bark with fissures.
im=Image.new('RGB',(512,1024),(80,67,42));d=ImageDraw.Draw(im)
for i in range(95):
 x=random.randrange(512);pts=[]
 for y in range(-30,1060,25):x+=random.randint(-7,7);pts.append((x,y))
 c=random.choice([(44,40,26),(108,90,54),(119,100,62),(66,57,36)])
 d.line(pts,fill=c,width=random.randint(2,12))
save(noise(im,6),'bark.jpg')
# Metal, cloth and chainmail textures, not flat material swatches.
for name,base in [('steel',(126,142,144)),('gold',(166,126,56)),('leather',(75,46,27)),('cloth',(32,65,100)),('skin',(176,125,89))]:
 im=Image.new('RGB',(512,512),base);d=ImageDraw.Draw(im)
 for i in range(1200):
  x=random.randrange(512);y=random.randrange(512);v=random.randint(-18,18)
  c=tuple(max(0,min(255,k+v)) for k in base)
  d.line((x,y,x+random.randrange(2,22),y+random.randrange(-1,2)),fill=c,width=1)
 if name in ['cloth','leather']:
  for x in range(0,512,4):d.line((x,0,x,512),fill=tuple(int(k*.91) for k in base))
  for y in range(0,512,4):d.line((0,y,512,y),fill=tuple(int(k*1.06) for k in base))
 save(noise(im,3),name+'.jpg')
im=Image.new('RGB',(512,512),(48,58,57));d=ImageDraw.Draw(im)
for y in range(-10,520,14):
 for x in range(-10,520,15):
  xx=x+(y//14%2)*7;d.ellipse((xx,y,xx+13,y+18),outline=(114,125,123),width=3);d.arc((xx,y,xx+13,y+18),200,330,fill=(161,165,150),width=2)
save(noise(im,3),'chainmail.jpg')
# Leaf cluster alpha atlas: individually shaded, veined leaves on branching twigs.
im=Image.new('RGBA',(512,512));d=ImageDraw.Draw(im)
def leaf(cx,cy,angle,scale,col):
 ca,sa=math.cos(angle),math.sin(angle)
 def pt(x,y):return (cx+(x*ca-y*sa)*scale,cy+(x*sa+y*ca)*scale)
 pts=[pt(0,0),pt(-9,-10),pt(-11,-24),pt(-6,-37),pt(0,-47),pt(8,-32),pt(12,-17),pt(7,-6)]
 d.polygon(pts,fill=(*col,255));d.polygon([pt(0,0),pt(0,-47),pt(8,-32),pt(12,-17),pt(7,-6)],fill=(max(0,col[0]-13),max(0,col[1]-18),max(0,col[2]-10),255))
 d.line([pt(0,0),pt(0,-42)],fill=(col[0]+14,col[1]+14,col[2]+4,255),width=2)
for branch in range(9):
 angle=branch*2.399;end=(256+math.cos(angle)*random.randint(120,210),280+math.sin(angle)*random.randint(110,190))
 d.line([(256,310),end],fill=(99,91,40,255),width=3)
 for j in range(4):
  t=.28+j*.23;cx=256+(end[0]-256)*t;cy=310+(end[1]-310)*t
  leaf(cx,cy,angle+random.uniform(-1,1),random.uniform(.75,1.2),random.choice([(97,134,45),(117,155,56),(77,116,35),(144,167,64)]))
save(im,'leaves.png')
# Tufts are textured crossed cards, each individual blade drawn with lit rim.
im=Image.new('RGBA',(256,256));d=ImageDraw.Draw(im)
for i in range(55):
 x=random.randrange(25,231);height=random.randint(30,205);bend=random.randint(-45,45);w=random.randint(2,6)
 col=random.choice([(83,120,37,255),(106,140,42,255),(132,154,54,255),(65,103,30,255)])
 d.polygon([(x-w,255),(x+bend*.45-w*.5,255-height*.65),(x+bend,255-height),(x+bend*.45+w*.5,255-height*.55),(x+w,255)],fill=col)
 d.line([(x,255),(x+bend*.45,255-height*.65),(x+bend,255-height)],fill=(col[0]+15,col[1]+12,col[2]+3,255),width=1)
save(im,'grass.png')
# Wildflowers.
im=Image.new('RGBA',(256,256));d=ImageDraw.Draw(im)
for i in range(9):
 x=random.randint(24,230);y=random.randint(25,160);d.line([(128,256),(x,y)],fill=(52,98,33,255),width=3)
 for j in range(6):
  dx=math.cos(j*math.pi/3)*9;dy=math.sin(j*math.pi/3)*9;d.ellipse((x+dx-7,y+dy-5,x+dx+7,y+dy+5),fill=(233,222,174,255))
 d.ellipse((x-4,y-4,x+4,y+4),fill=(217,153,32,255))
save(im,'flowers.png')
# Ornate blue fabric standard with original sun/griffin-like emblem, no copied logo.
im=Image.open(OUT/'textures/cloth.jpg').resize((512,1024));d=ImageDraw.Draw(im)
for off in [17,26]:d.rectangle((off,off,512-off,1024-off),outline=(178,143,67),width=4)
d.line((48,0,48,1024),fill=(140,107,50),width=3);d.line((464,0,464,1024),fill=(140,107,50),width=3)
for r in [104,116]:d.ellipse((256-r,400-r,256+r,400+r),outline=(205,172,87),width=4)
for i in range(16):
 a=i*math.pi/8;d.line((256+math.cos(a)*122,400+math.sin(a)*122,256+math.cos(a)*145,400+math.sin(a)*145),fill=(205,172,87),width=6)
d.polygon([(256,310),(285,343),(282,370),(310,397),(285,437),(291,476),(256,463),(221,476),(227,437),(202,397),(230,370),(227,343)],fill=(208,172,83))
d.polygon([(240,351),(252,370),(236,381)],fill=(49,69,83));d.polygon([(272,351),(260,370),(276,381)],fill=(49,69,83));d.line([(243,420),(256,431),(269,420)],fill=(111,91,52),width=5)
save(noise(im,2),'banner.jpg')
# Stained glass, arched opacity mask and individual leaded pieces.
im=Image.new('RGBA',(256,512));d=ImageDraw.Draw(im)
colors=[(43,133,148,255),(47,83,130,255),(200,156,47,255),(97,164,147,255),(167,77,44,255)]
for y in range(-32,530,42):
 for x in range(-40,290,38):
  xx=x+(y//42%2)*19;d.polygon([(xx,y+21),(xx+19,y),(xx+38,y+21),(xx+19,y+42)],fill=random.choice(colors),outline=(36,48,42,255),width=3)
mask=Image.new('L',(256,512));md=ImageDraw.Draw(mask);md.rectangle((5,135,251,512),fill=255);md.polygon([(5,140),(25,85),(69,40),(128,3),(187,40),(231,85),(251,140)],fill=255);im.putalpha(mask)
save(im,'glass.png')
# Parchment & dark hide for textured UI backgrounds.
for name,base in [('parchment',(204,187,141)),('ui-hide',(24,29,26))]:
 im=Image.new('RGB',(512,512),base);im=noise(im,5)
 if name=='parchment':
  a=np.asarray(im).astype(float); yy,xx=np.mgrid[:512,:512];edge=np.clip((np.maximum(abs(xx-256),abs(yy-256))-160)/96,0,1);a*=1-edge[...,None]*.14;im=Image.fromarray(a.astype('uint8'))
 save(im,name+'.jpg')
# Audio from the audited archives; preserve the full source license texts.
for pack,files in [('rpg-audio.zip',['bookOpen.ogg','bookClose.ogg','cloth1.ogg','metalClick.ogg','handleCoins.ogg','knifeSlice.ogg','knifeSlice2.ogg','chop.ogg']),('impact-sounds.zip',['footstep_grass_000.ogg','footstep_grass_001.ogg','footstep_wood_000.ogg','impactMetal_heavy_000.ogg'])]:
 with zipfile.ZipFile(SRC/pack) as z:
  (ROOT/'docs'/('license-'+pack+'.txt')).write_bytes(z.read('License.txt'))
  for n in z.namelist():
   if Path(n).name in files:
    dest=OUT/'audio'/Path(n).name;dest.write_bytes(z.read(n));record('audio/'+dest.name,'https://kenney.nl/assets/'+('rpg-audio' if 'rpg' in pack else 'impact-sounds'))
shutil.copy(SRC/'forest-ambience.mp3',OUT/'audio/forest.mp3');record('audio/forest.mp3','https://opengameart.org/content/forest-ambience')
# UI border components from Kenney. Keep only the used artwork, not the example font.
with zipfile.ZipFile(SRC/'ui-borders.zip') as z:
 names=[n for n in z.namelist() if '/Default/Border/' in n and n.endswith('.png')]
 for n in names[:1]:
  dest=OUT/'ui'/Path(n).name;dest.write_bytes(z.read(n));record('ui/'+dest.name,'https://kenney.nl/assets/fantasy-ui-borders')
 (ROOT/'docs/license-fantasy-ui-borders.txt').write_bytes(z.read('License.txt'))
shutil.copy(SRC/'forest_slope_2k.hdr',OUT/'textures/forest.hdr')
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False))
print('Prepared',len(manifest),'verified/original assets')
