import json,os,sys
S='/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
n=int(sys.argv[1]); new=json.load(open(sys.argv[2]))
p=f'{S}/fixes/ep{n}.json'; fx=json.load(open(p))
h=open(f'{S}/ep{n}/preview.html').read()
for e in new:
  c=h.count(e[0]); want=e[2] if len(e)>2 else 1
  assert c==want,(c,e[0][:100])
fx+=new; tmp=p+'.tmp'
json.dump(fx,open(tmp,'w'),indent=1,ensure_ascii=False); os.replace(tmp,p); print('added',len(new),'total',len(fx))
