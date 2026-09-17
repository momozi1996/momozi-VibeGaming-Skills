"""Install explicit editable theme hooks into a verified baseline, never into the skill."""
import json
DEFAULT_PRESET = 'sakura'

def apply(out, theme):
    def edit(name, pairs, header=''):
        p=out/name; s=p.read_text(encoding='utf-8')
        for old,new in pairs:
            if old not in s: raise ValueError('Baseline hook missing: '+name+' '+old)
            s=s.replace(old,new)
        p.write_text(header+s,encoding='utf-8')
    colors = {
        'main.js': {'#a1dfe9':'horizon','#b8e4e9':'fog','#399fde':'sky','#b1dfeb':'horizon','#c4f1ff':'ambient','#c49867':'bounce','#fff1d5':'sun'},
        'track.js': {'#edcc96':'sandTexture','#f8dba9':'sand','#c8cdac':'wetSand','#85b867':'grass','#f6dca9':'road','#4b9460':'leaves','#347754':'leavesDark','#78ab55':'leavesLight','#ed8c70':'accent'},
    }
    for name, mapping in colors.items():
        pairs=[("'"+old+"'",'THEME.colors.'+key) for old,key in mapping.items()]
        if name=='track.js':
            pairs += [('seed=6202611','seed=THEME.seed')]
            s=(out/'src/track.js').read_text(); start=s.index('const points=')+len('const points='); end=s.index('.map(([x,z])',start)
            pairs += [(s[start:end],'THEME.trackPoints')]
        edit('src/'+name,pairs,"import { THEME } from './theme.js';\n")
    # Title substitutions affect only presentation. Stable IDs and physics remain unchanged.
    for name in ['src/ui.js','index.html','src/track.js']:
        p=out/name;s=p.read_text(encoding='utf-8')
        for old,new in [('ALOHA',theme['brand']),('夏日猫猫大奖赛',theme['title']),('SUMMER CIRCUIT',theme['season']),('夏日，出发！',theme['tagline'])]: s=s.replace(old,new)
        p.write_text(s,encoding='utf-8')
    (out/'src/theme.js').write_text('// Editable palette, seed and XZ control points. Mechanics remain in simulation.js.\nexport const THEME = '+json.dumps(theme,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    css='\n/* Variant presentation; no full-canvas CSS filter. */\n:root {\n'+''.join('  --ak-'+k+': '+v+';\n' for k,v in theme['ui'].items())+'}\n'
    with (out/'src/ui.css').open('a',encoding='utf-8') as f:f.write(css)
