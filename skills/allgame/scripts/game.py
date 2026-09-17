#!/usr/bin/env python3
"""allGame: validate, restore and theme two fully local game foundations. No pip/network required."""
import argparse, hashlib, importlib.util, json, math, os, re, shutil, sys
from pathlib import Path
sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
FAMILIES = {'racing': {'engine': 'Three.js 0.180.0 / Vite 6.3.5', 'presets': ['sakura','sunset'], 'default': 'sakura'},
            'adventure': {'engine': 'Babylon.js 9.26.0 / TypeScript 7.0.2 / Vite 8.3.0', 'presets':['autumn','frost'], 'default':'autumn'}}
RECIPES = {'kart-racing':'racing', 'time-trial':'racing', 'delivery-driving':'racing',
           'quest-adventure':'adventure', 'exploration':'adventure', 'collectathon':'adventure', 'arena-combat':'adventure'}

def read(p):
    if Path(p).stat().st_size > 2_000_000: raise ValueError('JSON exceeds 2 MB')
    return json.loads(Path(p).read_text(encoding='utf-8'), parse_constant=lambda x: (_ for _ in ()).throw(ValueError('Nonfinite JSON: '+x)))

def module(family, name):
    p=ROOT/'assets/kits'/family/'scripts'/(name+'.py')
    spec=importlib.util.spec_from_file_location('allgame_'+family+'_'+name,p)
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def text(value, label, limit=200):
    if not isinstance(value,str) or not value.strip() or len(value)>limit: raise ValueError(label+' must be a nonempty string <= '+str(limit))
    if any(ord(c)<32 for c in value): raise ValueError(label+' must be a single line')
    return value

def safe_label(value, label, limit=48):
    text(value,label,limit)
    # Labels are installed into baseline HTML/JS strings. Accept natural text, not executable markup.
    if any(c in value for c in '<>&\'"`\\${}') or '\u2028' in value or '\u2029' in value:
        raise ValueError(label+' contains markup/code delimiters; use plain display text')

def strings(v,label):
    if not isinstance(v,list) or not 1<=len(v)<=30:raise ValueError(label+' needs 1..30 text entries')
    for s in v:text(s,label,500)

def brief(data):
    allowed={'schemaVersion','title','family','recipe','style','coreLoop','keep','change','targetDevices','acceptance','nonGoals'}
    if not isinstance(data,dict) or set(data)-allowed:raise ValueError('Unknown brief fields or non-object')
    required={'schemaVersion','title','family','recipe','style','coreLoop','keep','change','targetDevices','acceptance','nonGoals'}
    if set(data)!=required:raise ValueError('Brief fields required: '+', '.join(sorted(required-set(data))))
    if type(data['schemaVersion']) is not int or data['schemaVersion']!=1:raise ValueError('Brief schemaVersion must be 1')
    if data['family'] not in FAMILIES:raise ValueError('Unknown brief family')
    if data['recipe'] not in RECIPES or RECIPES[data['recipe']]!=data['family']:raise ValueError('Recipe/family mismatch')
    for k in ['title','style']:text(data[k],k)
    for k in ['coreLoop','keep','change','targetDevices','acceptance','nonGoals']:strings(data[k],k)
    return data

def merge_theme(base, patch, trail='theme'):
    if not isinstance(patch,dict):raise ValueError(trail+' must be an object')
    for k,v in patch.items():
        if k not in base:raise ValueError('Unknown theme field: '+trail+'.'+k)
        if isinstance(base[k],dict):merge_theme(base[k],v,trail+'.'+k)
        else:base[k]=v
    return base

def theme_check(family, theme):
    def number(k,lo,hi,integer=False):
        v=theme[k]
        if isinstance(v,bool) or not isinstance(v,(int,float)) or not math.isfinite(v) or not lo<=v<=hi or (integer and type(v)is not int):
            raise ValueError(k+' outside allowed range/type')
    def colors(obj):
        for k,v in obj.items():
            if not isinstance(v,str) or not re.fullmatch(r'#[0-9a-fA-F]{6}',v):raise ValueError(k+' must be #RRGGBB')
    safe_label(theme['title'],'title',32);safe_label(theme['brand'],'brand',24)
    number('seed',0,4294967295,True)
    if family=='racing':
        for k in ['season','tagline']:safe_label(theme[k],k,48)
        colors(theme['colors']);colors(theme['ui'])
        pts=theme['trackPoints']
        if not isinstance(pts,list) or not 4<=len(pts)<=64:raise ValueError('trackPoints requires 4..64 XZ pairs')
        for p in pts:
            if not isinstance(p,list) or len(p)!=2 or any(isinstance(x,bool) or not isinstance(x,(int,float)) or not math.isfinite(x) or abs(x)>1000 for x in p):raise ValueError('Invalid track point')
        for a,b in zip(pts,pts[1:]+pts[:1]):
            if math.dist(a,b)<1:raise ValueError('Adjacent track points must be at least 1 metre apart')
        area=abs(sum(a[0]*b[1]-a[1]*b[0] for a,b in zip(pts,pts[1:]+pts[:1])))/2
        if area<100:raise ValueError('Degenerate track polygon')
    else:
        colors({k:theme[k] for k in ['fog','sun','ground']});colors(theme['materials'])
        number('fogDensity',0,.05);number('exposure',.2,3);number('sunIntensity',0,6)
    return theme

def safe_output(raw):
    p=Path(raw).expanduser()
    if p.is_symlink():raise ValueError('Output may not be a symlink')
    p=p.resolve()
    if p==ROOT or ROOT in p.parents or p in ROOT.parents:raise ValueError('Output overlaps allGame inputs or their ancestors')
    if p.exists() and (not p.is_dir() or any(p.iterdir())):raise ValueError('Output must be new or empty; no overwrite')
    return p

def package_errors():
    p=ROOT/'assets/package-manifest.json'
    if not p.is_file():return ['Package seal is missing']
    m=module('racing','project')
    return m.verify(ROOT,read(p))

def default_brief(family,mode):
    return dict(schemaVersion=1,title='New '+family+' game',family=family,
        recipe='kart-racing' if family=='racing' else 'quest-adventure',
        style='沿用基线；由agent按用户需求更新',coreLoop=['沿用基线完整可玩循环'],
        keep=['保留完整输入、暂停、重开和验证能力'],change=['由agent填写本轮主题或功能变更'],
        targetDevices=['桌面WebGL2浏览器'],acceptance=['运行本轮单元、构建、浏览器流程并查看截图'],
        nonGoals=['不自动添加联机或后端'])

def write_contract(out, data, mode, theme):
    (out/'GAME-BRIEF.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    sections=['# allGame 设计与验收合同', '', '**这是设计目标，不是已实现功能清单。**',
              '生成模式：'+mode+'；起点：'+data['family']+'；目标玩法：'+data['recipe'],
              '主题：'+data['title']+' / '+data['style'],
              '本次自动操作：'+('复制依赖／素材／测试，不含游戏实现。' if mode=='rebuild' else '复制完整基线，并接入主题配色；没有自动实现新玩法／新地标。')]
    for k,label in [('coreLoop','期望核心循环'),('keep','保留'),('change','需要继续实现'),('targetDevices','设备'),('acceptance','验收'),('nonGoals','不做')]:
        sections+=['','## '+label,*['- '+v for v in data[k]]]
    sections+=['','## 实现状态','- [ ] 核心循环符合目标','- [ ] 场景、角色与UI同步','- [ ] 输入／暂停／重开／持久化回归','- [ ] 新测试和截图','- [ ] 已知限制与许可清单']
    (out/'GAME-CONTRACT.md').write_text('\n'.join(sections)+'\n',encoding='utf-8')
    (out/'PROGRESS.md').write_text('# 实施进度\n\n刚生成 '+mode+' 起点。尚未安装依赖、运行本次测试或完成需求改造。\n下一步：读 GAME-CONTRACT.md，验证基线，再实现最小可玩增量。\n',encoding='utf-8')
    if theme is not None:(out/'THEME-SOURCE.json').write_text(json.dumps(theme,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def main():
    p=argparse.ArgumentParser(description=__doc__); sub=p.add_subparsers(dest='command',required=True)
    sub.add_parser('list');sub.add_parser('verify')
    q=sub.add_parser('validate-brief');q.add_argument('--brief',required=True)
    q=sub.add_parser('create');q.add_argument('--family',choices=FAMILIES);q.add_argument('--out',required=True)
    q.add_argument('--mode',choices=['exact','variant','rebuild'],default='variant');q.add_argument('--preset');q.add_argument('--theme-json');q.add_argument('--brief')
    for command in ['compare','diff']:
        q=sub.add_parser(command);q.add_argument('--family',choices=FAMILIES,required=True);q.add_argument('--project',required=True)
        if command=='compare':q.add_argument('--exact',action='store_true')
    a=p.parse_args()
    if a.command=='list':return {'families':FAMILIES,'recipes':RECIPES,'recipeNotice':'Only kart-racing and quest-adventure are built-in complete gameplay. Other recipes are agent implementation guides, not prebuilt games.'}
    if a.command=='verify':
        errors=package_errors();return {'ok':not errors,'errors':errors,'checkedFiles':len(read(ROOT/'assets/package-manifest.json')) if (ROOT/'assets/package-manifest.json').exists() else 0}
    if a.command=='validate-brief':return {'ok':True,'brief':brief(read(a.brief))}
    if a.command in ['compare','diff']:
        # Keep the family baseline comparison unchanged; fresh runtime tests are a separate step.
        import subprocess
        argv=[sys.executable,str(ROOT/'assets/kits'/a.family/'scripts/project.py'),a.command,'--project',str(Path(a.project).expanduser().resolve())]
        if a.command=='compare' and a.exact:argv+=['--exact']
        r=subprocess.run(argv,check=False,capture_output=True,text=True)
        if r.returncode and not r.stdout:raise ValueError(r.stderr)
        return json.loads(r.stdout)
    data=brief(read(a.brief)) if a.brief else None
    family=a.family or (data['family'] if data else None)
    if not family:raise ValueError('Choose --family or provide a brief with family')
    if data and data['family']!=family:raise ValueError('--family conflicts with brief')
    if a.mode!='variant' and (a.preset or a.theme_json):raise ValueError('Theme/preset are variant-only')
    if a.mode=='exact' and data:raise ValueError('Exact restores bytes, not a new design; use variant for briefs')
    preset=a.preset or FAMILIES[family]['default'];theme=None
    if a.mode=='variant':
        if preset not in FAMILIES[family]['presets']:raise ValueError('Preset is not available for this family')
        theme=read(ROOT/'assets/kits'/family/'assets/presets'/(preset+'.json'))
        if a.theme_json:theme=merge_theme(theme,read(a.theme_json))
        theme_check(family,theme)
    errors=package_errors()
    if errors:raise ValueError('Corrupt allGame package: '+str(errors[:5]))
    m=module(family,'project');rows=m.load(m.ROOT/'assets/baseline-manifest.json')
    errors=m.verify(m.BASE,rows)
    if errors:raise ValueError('Corrupt source: '+str(errors[:5]))
    out=safe_output(a.out);out.mkdir(parents=True,exist_ok=True)
    m.copy_baseline(out,rows,a.mode)
    if theme is not None:module(family,'adapt').apply(out,theme)
    if a.mode!='exact':
        write_contract(out,data or default_brief(family,a.mode),a.mode,theme)
        generation=dict(skill='allgame',family=family,mode=a.mode,preset=preset if theme else None,
            customTheme=bool(a.theme_json),baselineManifestSha256=m.digest(m.ROOT/'assets/baseline-manifest.json'),
            tested=False,notice='Design goals are not implementation; inherited docs/reports are historical.')
        (out/'GENERATION.json').write_text(json.dumps(generation,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return {'ok':True,'out':str(out),'family':family,'mode':a.mode,'recipe':data['recipe'] if data else None,
            'implemented':'frozen baseline' if a.mode=='exact' else 'themed baseline only' if theme else 'dependency/assets/tests scaffold only',
            'next':'Implement requested changes, npm ci, npm test, npm run build, then fresh browser checks. No dependencies were installed.'}

if __name__=='__main__':
    try:
        result=main();print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(0 if result.get('ok',True) else 1)
    except (ValueError,OSError,KeyError,TypeError) as e:
        print(json.dumps({'ok':False,'error':str(e)},ensure_ascii=False),file=sys.stderr);sys.exit(1)
