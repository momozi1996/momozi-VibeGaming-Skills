#!/usr/bin/env python3
"""Compare same-frame browser PNGs, no Pillow/numpy dependencies. PNG RGB/RGBA8 only."""
import argparse,json,pathlib,struct,zlib,binascii,math

def read_png(path):
    data=path.read_bytes()
    if data[:8]!=b'\x89PNG\r\n\x1a\n':raise ValueError('Not a PNG')
    off=8; compressed=b''
    while off<len(data):
        n=struct.unpack('>I',data[off:off+4])[0];tag=data[off+4:off+8];chunk=data[off+8:off+8+n];off+=n+12
        if tag==b'IHDR':w,h,depth,typ,_,_,interlace=struct.unpack('>IIBBBBB',chunk)
        elif tag==b'IDAT':compressed+=chunk
        elif tag==b'IEND':break
    if depth!=8 or typ not in (2,6) or interlace:raise ValueError('Need noninterlaced RGB/RGBA8 PNG')
    bpp=3 if typ==2 else 4;stride=w*bpp;raw=zlib.decompress(compressed);prev=bytearray(stride);out=bytearray();pos=0
    for _ in range(h):
        filt=raw[pos];pos+=1;row=bytearray(raw[pos:pos+stride]);pos+=stride
        for x in range(stride):
            a=row[x-bpp] if x>=bpp else 0;b=prev[x];c=prev[x-bpp] if x>=bpp else 0
            if filt==1:p=a
            elif filt==2:p=b
            elif filt==3:p=(a+b)//2
            elif filt==4:
                q=a+b-c;pa,pb,pc=abs(q-a),abs(q-b),abs(q-c);p=a if pa<=pb and pa<=pc else b if pb<=pc else c
            elif filt==0:p=0
            else:raise ValueError('Unknown PNG filter')
            row[x]=(row[x]+p)&255
        if bpp==3:out.extend(row)
        else:
            for x in range(0,stride,4):
                alpha=row[x+3]/255;out.extend(round(row[x+c]*alpha+255*(1-alpha)) for c in range(3))
        prev=row
    return w,h,out

def write_png(path,w,h,rgb):
    def chunk(tag,payload):return struct.pack('>I',len(payload))+tag+payload+struct.pack('>I',binascii.crc32(tag+payload)&0xffffffff)
    rows=b''.join(b'\0'+rgb[y*w*3:(y+1)*w*3] for y in range(h))
    path.write_bytes(b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(rows))+chunk(b'IEND',b''))

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--golden',required=True);p.add_argument('--actual',required=True);p.add_argument('--out',required=True);p.add_argument('--pixel-tolerance',type=int,default=8);a=p.parse_args()
    out=pathlib.Path(a.out)
    if out.exists() and any(out.iterdir()):raise SystemExit('Use empty output directory')
    out.mkdir(parents=True,exist_ok=True);reports=[]
    for g in sorted(pathlib.Path(a.golden).glob('[0-9][0-9]-*.png')):
        candidate=pathlib.Path(a.actual)/g.name
        if not candidate.exists():reports.append({'name':g.name,'passed':False,'error':'missing'});continue
        w,h,x=read_png(g);ww,hh,y=read_png(candidate)
        if (w,h)!=(ww,hh):reports.append({'name':g.name,'passed':False,'error':'different resolution'});continue
        diff=bytearray(len(x));changed=0;total=0
        for i in range(0,len(x),3):
            ds=[abs(x[i+c]-y[i+c]) for c in range(3)];total+=sum(ds);v=max(ds);changed+=v>a.pixel_tolerance
            diff[i:i+3]=bytes([min(255,v*6),min(255,v*2),0])
        ratio=changed/(w*h);mae=total/len(x)/255;ok=ratio<=.05 and mae<=.015
        write_png(out/(g.stem+'-diff.png'),w,h,diff)
        reports.append({'name':g.name,'width':w,'height':h,'normalizedMAE':mae,'pixelsWithinTolerance':1-ratio,'passed':ok})
        print(g.name,'PASS' if ok else 'REVIEW',f'MAE={mae:.6f}',f'within-tolerance={(1-ratio)*100:.3f}%')
    result={'metricWarning':'These are pixel diagnostics, NOT semantic quality or a 95% game-completeness score. Same OS/GPU/browser/fonts/time/viewport required. All gameplay checks and human visual review also required.','pixelTolerance':a.pixel_tolerance,'screenshots':reports,'allPassed':bool(reports) and all(r['passed'] for r in reports)}
    (out/'visual-diff.json').write_text(json.dumps(result,indent=2));return 0 if result['allPassed'] else 1
if __name__=='__main__':raise SystemExit(main())
