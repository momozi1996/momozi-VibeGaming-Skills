"""Original surface/particle/cartographic artwork; CC0. Deterministic offline recipe."""
from PIL import Image,ImageDraw,ImageFilter
import numpy as np, random, math
from pathlib import Path
R=Path(__file__).resolve().parents[1];T=R/'public/assets/textures';U=R/'public/assets/ui'
rng=np.random.default_rng(46);random.seed(46)
# Weathered rock: multiscale mineral noise, broad patches and fine grain.
s=1024;field=np.zeros((s,s))
for size,weight in [(8,.44),(32,.29),(128,.18),(512,.09)]:
 a=rng.uniform(0,255,(size,size)).astype('uint8');field+=np.asarray(Image.fromarray(a).resize((s,s),Image.Resampling.BICUBIC))/255*weight
fine=rng.normal(0,3,(s,s));out=np.stack([field*85+63+fine,field*85+66+fine,field*76+60+fine],axis=2)
Image.fromarray(np.uint8(np.clip(out,0,255))).save(T/'rock.jpg',quality=90)
y,x=np.gradient(field);normal=np.dstack([-x*7,-y*7,np.ones_like(field)]);normal/=np.linalg.norm(normal,axis=2,keepdims=True)
Image.fromarray(np.uint8((normal*.5+.5)*255)).save(T/'rock-normal.jpg',quality=90)
# Character ground contact: smooth radial alpha, never an opaque rectangle.
y,x=np.mgrid[-1:1:256j,-1:1:256j];a=np.uint8(np.clip(1-np.sqrt(x*x+y*y),0,1)**2*170)
im=Image.new('RGBA',(256,256),(0,0,0,0));im.putalpha(Image.fromarray(a));im.save(T/'contact.png')
# Target and combat ring, with an engraved segmented outer band.
im=Image.new('RGBA',(512,512));d=ImageDraw.Draw(im)
for radius,width,col in [(225,5,(239,190,85,225)),(206,2,(242,201,111,205)),(234,2,(217,154,61,150))]:d.ellipse((256-radius,256-radius,256+radius,256+radius),outline=col,width=width)
for i in range(24):
 a=i*math.tau/24;rad=216;cx=256+math.cos(a)*rad;cy=256+math.sin(a)*rad;d.line((cx-math.sin(a)*4,cy+math.cos(a)*4,cx+math.sin(a)*4,cy-math.cos(a)*4),fill=(246,201,111,220),width=3)
im.save(T/'rune.png')
# Cartographic oak canopy: ink wash, tiny branches, and layered leaf clusters.
im=Image.new('RGBA',(160,160));d=ImageDraw.Draw(im)
d.ellipse((24,34,144,146),fill=(53,61,32,50));d.line((79,73,77,139),fill=(81,61,34,190),width=9)
for j in range(90):
 a=random.random()*math.tau;rr=math.sqrt(random.random())*55;x=79+math.cos(a)*rr;y=76+math.sin(a)*rr;r=random.randrange(8,17);shade=random.choice([(105,119,61,200),(116,129,73,210),(132,142,84,225),(145,153,92,230)])
 d.ellipse((x-r,y-r,x+r,y+r),fill=shade,outline=(74,85,46,180),width=1)
 d.arc((x-r+3,y-r+3,x+r-3,y+r-3),200,290,fill=(183,182,117,160),width=2)
im.resize((96,96),Image.Resampling.LANCZOS).save(U/'map-tree.png')
# A warm gravel path derived from the audited ambientCG soil, preserving grain.
a=np.asarray(Image.open(T/'ground.jpg').convert('L')).astype(float)
out=np.stack([a*.63+91,a*.50+70,a*.32+37],axis=2)
Image.fromarray(np.clip(out,0,255).astype('uint8')).save(T/'path.jpg',quality=91)
# Painted cloud panorama; the engine flips V to match the sphere builder's UVs.
w,h=2048,1024;arr=np.zeros((h,w))
for size,weight in [(8,.48),(16,.28),(32,.16),(96,.08)]:
 a=np.random.default_rng(size).uniform(0,255,(size,size*2)).astype('uint8');arr+=np.asarray(Image.fromarray(a).resize((w,h),Image.Resampling.BICUBIC))/255*weight
out=np.zeros((h,w,3),dtype='uint8')
for y in range(h):
 t=min(1,max(0,(y/h-.12)/.46));col=np.array([31,98,144])*(1-t)+np.array([154,189,190])*t
 cloud=np.clip((arr[y]-.48)*6,0,.93)*max(0,1-abs(y/h-.23)*3)
 out[y]=np.clip(col*(1-cloud[:,None])+np.array([233,232,207])*cloud[:,None],0,255)
Image.fromarray(out).save(T/'sky.jpg',quality=92)
print('Surface detail and cartographic artwork built.')
