"""Theme hooks retain textured geometry, animation and gameplay contracts."""
import json
DEFAULT_PRESET = 'autumn'

def apply(out, theme):
    def edit(name,pairs,header=''):
        p=out/name;s=p.read_text(encoding='utf-8')
        for old,new in pairs:
            if old not in s: raise ValueError('Baseline hook missing: '+name+' '+old)
            s=s.replace(old,new)
        p.write_text(header+s,encoding='utf-8')
    edit('src/app/game.ts',[
        ('new Color3(0.53, 0.62, 0.56)','Color3.FromHexString(THEME.fog)'),
        ('this.scene.fogDensity = 0.008','this.scene.fogDensity = THEME.fogDensity'),
        ('this.scene.imageProcessingConfiguration.exposure = 1.08','this.scene.imageProcessingConfiguration.exposure = THEME.exposure'),
        ('sun.intensity = 1.85','sun.intensity = THEME.sunIntensity'),
        ('sun.diffuse = new Color3(1, 0.94, 0.8)','sun.diffuse = Color3.FromHexString(THEME.sun)'),
    ],'import { THEME } from "../theme";\n')
    edit('src/world/terrain.ts',[
        ('mat.diffuseColor = new Color3(0.67, 0.88, 0.45)','mat.diffuseColor = Color3.FromHexString(THEME.ground)')
    ],'import { THEME } from "../theme";\n')
    tint='\n'.join(f'  {k}.diffuseColor = Color3.FromHexString(THEME.materials.{k});' for k in theme['materials'])
    edit('src/world/materials.ts',[('  return {',tint+'\n  return {')],'import { THEME } from "../theme";\n')
    edit('src/world/vegetation.ts',[('seeded(417)','seeded(THEME.seed)')],'import { THEME } from "../theme";\n')
    # Keep quest IDs/labels and save namespace for baseline regression compatibility.
    # Agent should localize the complete narrative and namespace for a released derivative.
    for name in ['src/ui/ui.ts','index.html']:
        p=out/name;s=p.read_text(encoding='utf-8').replace('北郡',theme['title']).replace('NORTHSHIRE',theme['brand'])
        p.write_text(s,encoding='utf-8')
    (out/'src/theme.ts').write_text('// Editable atmosphere/material tints and vegetation seed, not a complete biome swap.\nexport const THEME = '+json.dumps(theme,ensure_ascii=False,indent=2)+' as const;\n',encoding='utf-8')
