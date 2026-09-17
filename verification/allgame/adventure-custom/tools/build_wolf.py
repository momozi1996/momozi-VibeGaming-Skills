"""Retexture and animate the verified CC0 OGA wolf; absent external photo refs are not used."""
import bpy,math,random
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];bpy.ops.wm.open_mainfile(filepath=str(R/'tools/wolf-source/wolf.blend'))

if bpy.context.object and bpy.context.object.mode!='OBJECT':bpy.ops.object.mode_set(mode='OBJECT')
mesh=bpy.data.objects['Wolf'];rig=bpy.data.objects['Armature']
mesh.hide_set(False);rig.hide_set(False)
for o in list(bpy.data.objects):
 if o not in [mesh,rig]:bpy.data.objects.remove(o,do_unlink=True)
# A new fur texture is created from scratch; original missing photos excluded.
import numpy as np
random.seed(31);n=512;a=np.zeros((n,n,4),dtype=np.float32)
for y in range(n):
 for x in range(n):
  noise=random.random()*.15;f=math.sin(x*.75+math.sin(y*.016)*3+random.random())*.06
  v=.36+noise+f;a[y,x]=[v*.92,v*.90,v*.81,1]
im=bpy.data.images.new('Original painted gray fur',width=n,height=n);im.pixels=a.ravel();im.filepath_raw=str(R/'public/assets/textures/wolf-fur.png');im.file_format='PNG';im.save()
m=bpy.data.materials.new('Gray wolf fur');m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Roughness'].default_value=.98;t=m.node_tree.nodes.new('ShaderNodeTexImage');t.image=im;m.node_tree.links.new(t.outputs['Color'],p.inputs['Base Color']);mesh.data.materials.clear();mesh.data.materials.append(m)
# UV unwrap the complete original mesh, then subdivide its anatomy.
bpy.ops.object.select_all(action='DESELECT');mesh.select_set(True);bpy.context.view_layer.objects.active=mesh
bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=1.15,island_margin=.03);bpy.ops.object.mode_set(mode='OBJECT')
for mod in list(mesh.modifiers):
 if mod.type not in ['ARMATURE']:bpy.ops.object.modifier_apply(modifier=mod.name)
mod=mesh.modifiers.new('Sculpted smooth anatomy','SUBSURF');mod.levels=2;bpy.ops.object.modifier_apply(modifier=mod.name)
for p in mesh.data.polygons:p.use_smooth=True
for pb in rig.pose.bones:
 for c in list(pb.constraints):pb.constraints.remove(c)
root=bpy.data.objects.new('WolfRoot',None);bpy.context.collection.objects.link(root)
rig.parent=root;root.scale=(.30,.30,.30)
# Idle, trot, bite and death are newly authored skeleton animations.
rig.animation_data_clear();bpy.context.scene.render.fps=30
for name,frames in [('Idle',60),('Run',24),('Attack',22),('Death',32)]:
 rig.animation_data_create();rig.animation_data.action=None
 for f in range(0,frames+1,2):
  t=f/frames;phase=t*math.tau
  for p in rig.pose.bones:p.rotation_mode='XYZ';p.rotation_euler=(0,0,0)
  if name=='Idle':rig.pose.bones['Head'].rotation_euler.z=math.sin(phase)*.04;rig.pose.bones['Tail1'].rotation_euler.y=math.sin(phase)*.14
  elif name=='Run':
   for side,s in [('L',1),('R',-1)]:
    rig.pose.bones['FrontShoulder_'+side].rotation_euler.x=math.sin(phase)*.42*s
    rig.pose.bones['FrontLeg1_'+side].rotation_euler.x=max(0,math.sin(phase)*s)*.36
    rig.pose.bones['BackLeg1_'+side].rotation_euler.x=-math.sin(phase)*.49*s
    rig.pose.bones['BackLeg2_'+side].rotation_euler.x=max(0,-math.sin(phase)*s)*.42
   rig.pose.bones['Head'].rotation_euler.x=math.sin(phase*2)*.055
  elif name=='Attack':
   q=math.sin(t*math.pi);rig.pose.bones['Neck1'].rotation_euler.x=-q*.25;rig.pose.bones['Head'].rotation_euler.x=q*.24;rig.pose.bones['Jaw1'].rotation_euler.x=q*.33
  else:rig.pose.bones['Bone'].rotation_euler.y=min(1,t*1.6)*1.48
  for p in rig.pose.bones:p.keyframe_insert('rotation_euler',frame=f)
 rig.animation_data.action.name=name;rig.animation_data.action.use_fake_user=True
rig.animation_data.action=None
for p in rig.pose.bones:p.rotation_euler=(0,0,0)
bpy.context.scene.frame_set(0);bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=str(R/'public/assets/models/wolf.glb'),export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='ACTIONS')
print('WOLF_EXPORTED',len(mesh.data.vertices))
# Render the same production model for its target-frame portrait.
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24;scene.render.resolution_x=256;scene.render.resolution_y=256;scene.render.resolution_percentage=100;scene.render.film_transparent=True
scene.world.color=(.18,.18,.18)
bpy.ops.object.camera_add(location=(1.8,-3,1.5));cam=bpy.context.object;aim=Vector((0,-.46,.96));cam.rotation_euler=(aim-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=.78;scene.camera=cam
for pos,power,size in [((2,-4,5),400,4),((-3,-1,3),180,3),((0,3,4),500,3)]:
 bpy.ops.object.light_add(type='AREA',location=pos);l=bpy.context.object;l.data.energy=power;l.data.size=size;l.rotation_euler=(aim-l.location).to_track_quat('-Z','Y').to_euler()
scene.render.filepath=str(R/'public/assets/ui/wolf-portrait.png');bpy.ops.render.render(write_still=True)
