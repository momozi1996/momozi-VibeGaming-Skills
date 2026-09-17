"""Original skinned hero model and reusable equipment. CC0-1.0."""
import bpy, math, random, os
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];T=R/'public/assets/textures';O=R/'public/assets/models'
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
random.seed(18)
def material(name,texture,metal=0,rough=.7):
 m=bpy.data.materials.new(name);m.use_nodes=True;b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Metallic'].default_value=metal;b.inputs['Roughness'].default_value=rough
 t=m.node_tree.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(T/texture));m.node_tree.links.new(t.outputs['Color'],b.inputs['Base Color']);return m
mats={
 'steel':material('Forged silver','steel.jpg',.64,.49),'gold':material('Aged bronze','gold.jpg',.65,.4),
 'cloth':material('Northshire blue cloth','cloth.jpg',0,.9),'chain':material('Chain mail','chainmail.jpg',.55,.63),
 'leather':material('Worn leather','leather.jpg',0,.89),'skin':material('Skin','skin.jpg',0,.88),
 'wood':material('Shield oak backing','wood.jpg',0,.88),
 'banner':material('Embroidered tabard','banner.jpg',0,.92)}
parts=[]
def finish(o,mat,bone):
 o.data.materials.append(mats[mat]);bpy.context.view_layer.objects.active=o;o.select_set(True)
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bone:o.vertex_groups.new(name=bone).add(list(range(len(o.data.vertices))),1,'REPLACE')
 for p in o.data.polygons:p.use_smooth=True
 parts.append(o);o.select_set(False);return o
def ell(name,pos,size,mat,bone,seg=20):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=12,radius=1,location=pos);o=bpy.context.object;o.name=name;o.scale=size;return finish(o,mat,bone)
def box(name,pos,size,mat,bone,bevel=.025):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.name=name;o.scale=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Rounded crafted edge','BEVEL');mod.width=bevel;mod.segments=3;bpy.ops.object.modifier_apply(modifier=mod.name)
 return finish(o,mat,bone)
def rod(name,a,b,r1,r2,mat,bone):
 a,b=Vector(a),Vector(b);v=b-a;bpy.ops.mesh.primitive_cone_add(vertices=20,radius1=r1,radius2=r2,depth=v.length,location=(a+b)*.5);o=bpy.context.object;o.name=name;o.rotation_euler=v.to_track_quat('Z','Y').to_euler();return finish(o,mat,bone)
def torus(name,pos,major,minor,mat,bone,rot=(math.pi/2,0,0)):
 bpy.ops.mesh.primitive_torus_add(major_radius=major,minor_radius=minor,major_segments=32,minor_segments=8,location=pos,rotation=rot);o=bpy.context.object;o.name=name;return finish(o,mat,bone)
def prism(name,points,depth,mat,bone):
 # points are x,y,z frontal silhouette, extrude on +Y.
 verts=points+[(x,y+depth,z) for x,y,z in points];n=len(points);faces=[]
 faces.append(tuple(reversed(range(n))));faces.append(tuple(range(n,n*2)))
 for i in range(n):j=(i+1)%n;faces.append((i,j,j+n,i+n))
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update();o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o)
 bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project();bpy.ops.object.mode_set(mode='OBJECT');o.select_set(False)
 return finish(o,mat,bone)
# Torso and layered armor.
ell('Chainmail torso',(0,0,1.38),(.35,.20,.36),'chain','chest')
ell('Breastplate',(0,-.075,1.45),(.345,.19,.285),'steel','chest')
box('Waist leather',(0,0,1.09),(.49,.34,.16),'leather','hips')
box('Embroidered breast tabard',(0,-.249,1.41),(.37,.019,.41),'banner','chest',.018)
box('Heavy belt',(0,-.015,1.10),(.56,.40,.07),'leather','hips',.018)
box('Belt buckle',(0,-.229,1.10),(.11,.025,.095),'gold','hips',.01)
box('Buckle inset',(0,-.246,1.10),(.065,.005,.05),'steel','hips',.005)
prism('Tabard skirt',[(-.225,-.221,1.06),(.225,-.221,1.06),(.24,-.20,.73),(0,-.25,.68),(-.24,-.20,.73)],.028,'cloth','hips')
for side in [-1,1]:
 # Anatomical layered legs.
 x=side*.158;suf='L' if side<0 else 'R'
 rod('Upper leg '+suf,(x,0,.98),(x,.008,.55),.122,.15,'chain','thigh.'+suf)
 ell('Thigh cuisse '+suf,(x,-.068,.82),(.135,.118,.235),'steel','thigh.'+suf)
 ell('Knee guard '+suf,(x,-.111,.535),(.125,.075,.13),'steel','shin.'+suf)
 torus('Knee bronze trim '+suf,(x,-.17,.55),.074,.008,'gold','shin.'+suf)
 rod('Greave '+suf,(x,0,.16),(x,.01,.48),.089,.115,'steel','shin.'+suf)
 box('Leather boot '+suf,(x,-.08,.11),(.20,.36,.19),'leather','foot.'+suf,.06)
 box('Boot toe cap '+suf,(x,-.20,.13),(.21,.19,.15),'steel','foot.'+suf,.05)
 # Arms: broad sculpted pauldrons, layered lames and rivets.
 ax=side*.37
 ell('Pauldron '+suf,(ax,0,1.665),(.23,.245,.15),'steel','upper.'+suf)
 ell('Pauldron gold inset '+suf,(ax,-.06,1.752),(.145,.145,.045),'gold','upper.'+suf)
 for k in range(3):
  ell('Shoulder lames '+suf,(side*(.43+k*.025),.0,1.64-k*.055),(.185-k*.012,.20-k*.007,.055),'steel','upper.'+suf)
 for a in [-1,0,1]:ell('Pauldron rivet',(ax+a*.11,-.209,1.672),(.018,.012,.018),'gold','upper.'+suf,12)
 rod('Upper chain sleeve '+suf,(side*.43,0,1.58),(side*.51,0,1.30),.115,.135,'chain','upper.'+suf)
 ell('Elbow cop '+suf,(side*.51,-.014,1.30),(.12,.13,.12),'steel','fore.'+suf)
 rod('Vambrace '+suf,(side*.54,-.04,1.07),(side*.51,0,1.30),.085,.108,'steel','fore.'+suf)
 torus('Wrist trim '+suf,(side*.54,-.04,1.085),.079,.014,'gold','fore.'+suf,rot=(0,0,0))
 ell('Gauntlet '+suf,(side*.54,-.057,1.00),(.092,.092,.102),'leather','hand.'+suf)
# Neck/head and open faced helmet.
rod('Neck',(0,0,1.70),(0,0,1.86),.095,.103,'skin','neck')
ell('Face',(0,-.021,1.946),(.145,.126,.185),'skin','head')
ell('Helmet dome',(0,.017,2.018),(.18,.161,.163),'steel','head')
# visible forehead, cheekguards and nasal ridge, no featureless face.
box('Brow band',(0,-.137,2.009),(.282,.052,.046),'gold','head',.019)
for s in [-1,1]:
 box('Cheek guard',(s*.137,-.098,1.913),(.058,.081,.16),'steel','head',.018)
 box('Brow',(s*.071,-.146,1.979),(.077,.02,.012),'leather','head',.005)
 ell('Eye',(s*.069,-.149,1.958),(.025,.010,.010),'cloth','head',12)
 ell('Nostril',(s*.019,-.164,1.906),(.019,.018,.010),'skin','head',12)
ell('Nose',(0,-.149,1.93),(.027,.036,.046),'skin','head')
box('Mouth',(0,-.143,1.867),(.072,.013,.009),'leather','head',.003)
ell('Short beard',(0,-.080,1.818),(.10,.081,.042),'leather','head')
# Helmet longitudinal crest.
prism('Helmet ridge',[(-.015,-.128,2.07),(-.015,-.065,2.18),(-.015,.085,2.17),(-.015,.16,2.025)],.035,'gold','head')
# Cloth cape, UV-mapped continuous sculpted surface.
verts=[];uv=[];faces=[]
for j in range(13):
 t=j/12
 for i in range(11):
  u=i/10;x=(u-.5)*(.53+t*.10);y=.255+t*.10+math.sin(u*math.pi*6)*.021*t;z=1.69-t*.85
  verts.append((x,y,z));uv.append((u,1-t))
for j in range(12):
 for i in range(10):a=j*11+i;faces.append((a,a+1,a+12,a+11))
mesh=bpy.data.meshes.new('Cape');mesh.from_pydata(verts,[],faces);mesh.uv_layers.new()
for p in mesh.polygons:
 for li in p.loop_indices:mesh.uv_layers.active.data[li].uv=uv[mesh.loops[li].vertex_index]
o=bpy.data.objects.new('Folded blue cape',mesh);bpy.context.collection.objects.link(o);finish(o,'banner','chest')
# Sword: central fuller, cutting edge, separate guard and leather grip.
rod('Sword grip',(.54,-.06,.93),(.54,-.06,1.10),.025,.025,'leather','hand.R')
ell('Sword pommel',(.54,-.06,1.12),(.047,.045,.045),'gold','hand.R',16)
box('Sword crossguard',(.54,-.06,.91),(.27,.055,.045),'gold','hand.R',.017)
prism('Forged sword blade',[(.49,-.072,.90),(.59,-.072,.90),(.584,-.072,.24),(.54,-.072,.13),(.496,-.072,.24)],.03,'steel','hand.R')
box('Blade fuller',(.54,-.089,.60),(.013,.008,.50),'gold','hand.R',.003)
# Kite shield, polished border and inset blue field.
x=-.60;y=-.16;z=1.05
shape=[(x-.24,y,z+.34),(x,y,z+.39),(x+.24,y,z+.34),(x+.22,y,z-.10),(x,y,z-.39),(x-.22,y,z-.10)]
prism('Shield bronze rim',shape,.065,'gold','fore.L')
pts=[(x+(xx-x)*.88,yy-.012,z+(zz-z)*.88) for xx,yy,zz in shape];prism('Shield face',pts,.01,'cloth','fore.L')
torus('Shield emblem ring',(x,y-.031,z+.04),.13,.011,'gold','fore.L')
prism('Shield sun emblem',[(x,y-.05,z+.16),(x+.07,y-.05,z+.045),(x,y-.05,z-.08),(x-.07,y-.05,z+.045)],.01,'gold','fore.L')
# Shield backing has an oak field and real leather straps, not a blank metal slab.
back=[(x+(xx-x)*.87,yy+.068,z+(zz-z)*.87) for xx,yy,zz in shape]
prism('Shield oak inner planks',back,.012,'wood','fore.L')
for zz in [z-.13,z+.14]:box('Shield leather arm strap',(x,y+.11,zz),(.27,.04,.057),'leather','fore.L',.015)
for xx in [x-.18,x+.18]:
 for zz in [z+.26,z-.07]:ell('Shield back rivet',(xx,y+.095,zz),(.02,.013,.02),'gold','fore.L',12)
# Bronze brow encircles the helmet and rear pauldron rivets catch the rim light.
torus('Helmet circlet',(0,.016,2.022),.168,.009,'gold','head',rot=(0,0,0))
for side in [-1,1]:
 for a in [-1,0,1]:ell('Rear pauldron rivet',(side*.37+a*.10,.201,1.67),(.015,.012,.015),'gold','upper.'+('L' if side<0 else 'R'),12)
# Skeleton with rigid weights on articulated pieces; joined into one skinned mesh.
bpy.ops.object.select_all(action='DESELECT')
for p in parts:p.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();body=bpy.context.object;body.name='Northshire Guard | Skinned'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
bpy.ops.object.select_all(action='DESELECT');armdata=bpy.data.armatures.new('Guard skeleton');rig=bpy.data.objects.new('GuardRig',armdata);bpy.context.collection.objects.link(rig);bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
def bone(n,a,b,parent=None):
 e=armdata.edit_bones.new(n);e.head=a;e.tail=b
 if parent:e.parent=armdata.edit_bones[parent]
bone('root',(0,0,0),(0,0,.25));bone('hips',(0,0,1.03),(0,0,1.2),'root');bone('chest',(0,0,1.2),(0,0,1.68),'hips');bone('neck',(0,0,1.68),(0,0,1.82),'chest');bone('head',(0,0,1.82),(0,0,2.13),'neck')
for s in [-1,1]:
 suf='L' if s<0 else 'R'
 bone('upper.'+suf,(s*.37,0,1.65),(s*.51,0,1.30),'chest');bone('fore.'+suf,(s*.51,0,1.30),(s*.54,-.04,1.07),'upper.'+suf);bone('hand.'+suf,(s*.54,-.04,1.07),(s*.54,-.06,.95),'fore.'+suf)
 bone('thigh.'+suf,(s*.158,0,1.03),(s*.158,.008,.55),'hips');bone('shin.'+suf,(s*.158,.008,.55),(s*.158,0,.15),'thigh.'+suf);bone('foot.'+suf,(s*.158,0,.15),(s*.158,-.23,.10),'shin.'+suf)
bpy.ops.object.mode_set(mode='OBJECT');body.parent=rig;mod=body.modifiers.new('Skin','ARMATURE');mod.object=rig
bpy.context.scene.render.fps=30
for name,frames in [('Idle',60),('Run',24),('Attack',26),('Block',28),('Hit',18),('Death',40)]:
 rig.animation_data_create();rig.animation_data.action=None
 for f in range(0,frames+1,2):
  t=f/frames;phase=t*math.tau
  for p in rig.pose.bones:p.rotation_mode='XYZ';p.rotation_euler=(0,0,0);p.location=(0,0,0)
  hips=rig.pose.bones['hips'];ch=rig.pose.bones['chest']
  if name=='Idle':ch.rotation_euler.x=math.sin(phase)*.014;rig.pose.bones['head'].rotation_euler.z=math.sin(phase)*.035
  if name=='Run':
   hips.location.y=abs(math.sin(phase))*.04;ch.rotation_euler.x=.08
   for s,suf in [(1,'L'),(-1,'R')]:
    rig.pose.bones['thigh.'+suf].rotation_euler.x=math.sin(phase)*.61*s
    rig.pose.bones['shin.'+suf].rotation_euler.x=max(0,-math.sin(phase)*s)*.70
    rig.pose.bones['upper.'+suf].rotation_euler.x=-math.sin(phase)*.37*s
    rig.pose.bones['fore.'+suf].rotation_euler.x=-.17
  if name=='Attack':
   pulse=math.sin(t*math.pi);ch.rotation_euler.z=math.sin(t*math.tau)*.30
   rig.pose.bones['upper.R'].rotation_euler.x=-pulse*2.05;rig.pose.bones['upper.R'].rotation_euler.y=math.sin(t*math.tau)*.42
   rig.pose.bones['fore.R'].rotation_euler.x=-pulse*.75
  if name=='Block':rig.pose.bones['upper.L'].rotation_euler.x=-math.sin(t*math.pi)*1.1;ch.rotation_euler.z=-math.sin(t*math.pi)*.18
  if name=='Hit':ch.rotation_euler.x=-math.sin(t*math.pi)*.25
  if name=='Death':
   q=min(1,t*1.7);rig.pose.bones['root'].rotation_euler.x=-q*1.5;rig.pose.bones['root'].location.y=-q*.15
  for p in rig.pose.bones:
   p.keyframe_insert('rotation_euler',frame=f);p.keyframe_insert('location',frame=f)
 rig.animation_data.action.name=name;rig.animation_data.action.use_fake_user=True
rig.animation_data.action=None
for p in rig.pose.bones:p.rotation_euler=(0,0,0);p.location=(0,0,0)
bpy.context.scene.frame_set(0)
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);rig.select_set(True)
bpy.ops.wm.save_as_mainfile(filepath=str(R/'tools/knight-source.blend'))
bpy.ops.export_scene.gltf(filepath=str(O/'knight.glb'),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS')
# Offline portrait render, genuine model render rather than a placeholder illustration.
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24;scene.render.resolution_x=320;scene.render.resolution_y=320;scene.render.resolution_percentage=100;scene.render.film_transparent=True
scene.world.color=(.18,.18,.18)
bpy.ops.object.camera_add(location=(2,-4,2.4));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,1.61))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=1.22;scene.camera=cam
for pos,power,size in [((2,-4,5),450,4),((-3,-1,3),180,3),((0,3,4),650,3)]:
 bpy.ops.object.light_add(type='AREA',location=pos);l=bpy.context.object;l.data.energy=power;l.data.shape='DISK';l.data.size=size;l.rotation_euler=(Vector((0,0,1.4))-l.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(R/'public/assets/ui/portrait.png');bpy.ops.render.render(write_still=True)
print('KNIGHT_EXPORTED',len(body.data.vertices),list(bpy.data.actions.keys()))
