import json, urllib.request, concurrent.futures, pathlib, hashlib
P=pathlib.Path(__file__).parent/'public/assets'; V='16.18.1'
ids=['Garen','Ashe','Annie','Lux','MasterYi']
records=[]
def fetch(url,name):
 p=P/name
 for i in range(3):
  try:
   b=urllib.request.urlopen(url,timeout=35).read();p.write_bytes(b)
   records.append(dict(file=name,url=url,bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),rights='Riot Games; proprietary; not CC0; no commercial license granted'))
   return b
  except Exception:
   if i==2: raise
champions={}
for id in ids:
 raw=fetch(f'https://ddragon.leagueoflegends.com/cdn/{V}/data/zh_CN/champion/{id}.json',id+'.json')
 champions[id]=json.loads(raw)['data'][id]
tasks=[]
for id,c in champions.items():
 tasks += [(f'https://ddragon.leagueoflegends.com/cdn/{V}/img/champion/{id}.png',id+'.png'),(f'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{id}_0.jpg',id+'-splash.jpg')]
 for s in c['spells']:
  tasks.append((f'https://ddragon.leagueoflegends.com/cdn/{V}/img/spell/'+s['image']['full'],s['image']['full']))
for i in [1036,1052,1001,1028,1042,1029,3031,3089,2003]:
 tasks.append((f'https://ddragon.leagueoflegends.com/cdn/{V}/img/item/{i}.png',f'item-{i}.png'))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as e:
 list(e.map(lambda a: fetch(*a),tasks))
(P/'champions.json').write_text(json.dumps(champions,ensure_ascii=False))
(P/'manifest.json').write_text(json.dumps({'version':V,'source':'Riot Data Dragon','assets':records},ensure_ascii=False,indent=2))
print('Downloaded',len(records),'assets. Version',V)
