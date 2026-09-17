"""Original hand-layered raster skill icons and painted sky. CC0-1.0."""
from PIL import Image,ImageDraw,ImageFilter
import numpy as np,random,math
from pathlib import Path
R=Path(__file__).resolve().parents[1];P=R/'public/assets/ui';random.seed(30)
for name,base in [('sword',(42,73,91)),('shield',(35,62,96)),('whirl',(32,83,77)),('potion',(80,27,36)),('herb',(42,80,35)),('book',(89,62,30)),('bag',(59,42,28)),('coin',(98,65,21))]:
 s=256;im=Image.new('RGB',(s,s));a=np.zeros((s,s,3),dtype=np.uint8)
 for y in range(s):
  for x in range(s):
   f=max(0,1-math.hypot(x-128,y-114)/165);v=random.randint(-6,6);a[y,x]=np.clip(np.array(base)*(0.35+f*.9)+v,0,255)
 im=Image.fromarray(a).convert('RGBA');d=ImageDraw.Draw(im)
 # subtle flecks and radial brush strokes behind painted equipment.
 for j in range(40):
  ang=random.random()*math.tau;rr=random.randrange(45,115);x=128+math.cos(ang)*rr;y=128+math.sin(ang)*rr
  d.line((x,y,x+math.cos(ang)*15,y+math.sin(ang)*15),fill=(*[min(255,c+random.randrange(12,35)) for c in base],180),width=random.randrange(1,4))
 if name=='sword':
  d.polygon([(64,197),(78,207),(197,66),(197,31),(167,44)],fill=(37,43,43),outline=(225,216,163),width=2)
  d.polygon([(79,180),(92,191),(197,66),(197,31)],fill=(139,166,170));d.polygon([(79,180),(65,167),(167,44),(197,31)],fill=(218,231,219))
  d.line((81,176,186,49),fill=(244,248,218),width=4)
  d.line((50,167,98,209),fill=(63,41,20),width=16);d.line((48,162,98,207),fill=(194,151,65),width=12)
  d.line((59,191,32,224),fill=(64,40,24),width=16)
  for k in range(5):d.line((48-k*4,200+k*4,58-k*4,209+k*4),fill=(187,143,63),width=3)
  d.ellipse((21,219,43,240),fill=(207,163,77),outline=(245,219,133),width=3)
 elif name=='shield':
  pts=[(128,22),(224,60),(208,153),(174,198),(128,236),(77,199),(46,154),(31,60)]
  d.polygon(pts,fill=(194,157,84));d.polygon([(128,36),(209,69),(194,148),(163,188),(128,218),(89,187),(61,148),(47,69)],fill=(19,46,78))
  d.polygon([(128,43),(201,74),(186,146),(158,181),(128,207)],fill=(40,90,122))
  d.line((128,52,128,194),fill=(216,183,98),width=9);d.line((73,109,183,109),fill=(216,183,98),width=9)
  d.ellipse((112,94,144,127),fill=(226,192,105),outline=(255,226,159),width=3)
  for x,y in [(60,73),(195,73),(65,141),(190,141),(100,193),(157,193)]:d.ellipse((x-4,y-4,x+4,y+4),fill=(247,211,140))
 elif name=='whirl':
  for j in range(3):
   pts=[]
   for i in range(100):
    t=i/100*math.pi*1.5+j*math.tau/3;rad=100-i*.75;pts.append((128+math.cos(t)*rad,128+math.sin(t)*rad))
   d.line(pts,fill=(80,178,176),width=15);d.line(pts,fill=(196,237,211),width=5)
  d.polygon([(110,174),(126,183),(158,57),(148,32),(130,52)],fill=(185,208,204));d.polygon([(126,183),(158,57),(148,32),(147,175)],fill=(84,120,119));d.line((91,179,157,194),fill=(223,180,84),width=13)
 elif name=='potion':
  d.ellipse((71,211,203,235),fill=(22,15,18));d.polygon([(102,70),(102,100),(70,143),(64,201),(91,221),(169,221),(194,202),(186,142),(156,99),(154,69)],fill=(67,85,86),outline=(201,204,175),width=4)
  d.polygon([(78,146),(80,197),(96,209),(168,209),(180,196),(177,146)],fill=(147,24,41));d.ellipse((78,137,178,160),fill=(201,42,55));d.arc((82,138,179,208),0,165,fill=(255,122,93),width=6)
  d.line((93,116,83,137,81,183),fill=(218,228,201),width=7);d.line((168,166,167,192),fill=(232,126,97),width=5)
  d.rounded_rectangle((98,43,157,77),radius=4,fill=(146,104,55),outline=(217,165,90),width=4)
  for y in [82,89]:d.line((100,y,157,y),fill=(195,169,104),width=5)
 elif name=='herb':
  for x,y in [(87,71),(174,82),(129,43),(56,122),(190,136)]:
   d.line((129,231,x,y),fill=(95,146,59),width=6)
   for j in range(6):
    a=j*math.tau/6;xx=x+math.cos(a)*16;yy=y+math.sin(a)*16;d.ellipse((xx-11,yy-9,xx+11,yy+9),fill=(231,219,169))
   d.ellipse((x-8,y-8,x+8,y+8),fill=(223,164,50))
  d.polygon([(128,203),(69,162),(52,130),(93,149)],fill=(122,164,65));d.polygon([(130,180),(171,168),(201,156),(180,196)],fill=(78,143,61))
 elif name=='book':
  d.polygon([(53,46),(178,31),(211,195),(84,228),(45,203)],fill=(65,37,22),outline=(210,173,103),width=4)
  d.polygon([(63,55),(172,44),(199,190),(87,217)],fill=(128,48,36),outline=(190,129,69),width=4)
  d.line((75,58,100,207),fill=(222,165,83),width=5);d.ellipse((104,104,167,161),outline=(222,185,99),width=5)
  d.polygon([(133,107),(149,129),(136,153),(119,132)],fill=(223,182,94))
 elif name=='bag':
  d.arc((91,22,173,113),180,359,fill=(180,121,66),width=18);d.rounded_rectangle((57,70,205,227),radius=28,fill=(99,62,33),outline=(190,138,74),width=5)
  d.rounded_rectangle((56,72,205,141),radius=18,fill=(139,89,43),outline=(207,153,81),width=4)
  for x in [90,166]:
   d.rectangle((x,73,x+15,216),fill=(62,42,29));d.rectangle((x-4,130,x+19,154),outline=(219,176,85),width=4)
  for y in range(158,210,8):d.line((64,y,69,y+3),fill=(198,152,93),width=2);d.line((193,y,198,y+3),fill=(198,152,93),width=2)
 elif name=='coin':
  for ox,oy in [(0,35),(-23,18),(25,0)]:
   d.ellipse((52+ox,61+oy,184+ox,176+oy),fill=(145,88,24),outline=(235,181,78),width=6);d.ellipse((64+ox,69+oy,174+ox,160+oy),fill=(208,150,51),outline=(245,205,115),width=5)
   d.polygon([(118+ox,78+oy),(132+ox,108+oy),(161+ox,118+oy),(132+ox,130+oy),(119+ox,154+oy),(105+ox,130+oy),(77+ox,118+oy),(105+ox,108+oy)],fill=(250,212,120))
 im=im.resize((128,128),Image.Resampling.LANCZOS);im.save(P/(name+'.png'))
# Painted atmospheric sky panorama, multiscale clouds with no external images.
w,h=2048,1024;random.seed(14)
noise=Image.new('L',(w,h))
arr=np.zeros((h,w),dtype=float)
for size,weight in [(16,.45),(32,.3),(64,.17),(128,.08)]:
 a=np.random.default_rng(size).uniform(0,255,(size,size*2)).astype('uint8');res=np.asarray(Image.fromarray(a).resize((w,h),Image.Resampling.BICUBIC))/255;arr+=res*weight
out=np.zeros((h,w,3),dtype='uint8')
for y in range(h):
 t=min(1,y/(h*.61));color=np.array([63,113,138])*(1-t)+np.array([178,194,179])*t
 cloud=np.clip((arr[y]-.5)*6,0,.9)*max(0,1-abs(y/h-.30)*3)
 out[y]=np.clip(color[None,:]*(1-cloud[:,None])+np.array([233,228,200])*cloud[:,None],0,255)
Image.fromarray(out).save(R/'public/assets/textures/sky.jpg',quality=90)
print('UI artwork built')
