import json,sys,os
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); new=json.load(open(sys.argv[2]))
p=f"{S}/fixes/ep{n}.json"; fx=json.load(open(p)) if os.path.exists(p) else []
h=open(f"{S}/ep{n}/ep{n}b.html").read()
for a,b,*k in fx:
  if not (b in h and (a in b or h.count(a)==0)): h=h.replace(a,b)
for e in new:
  c=h.count(e[0]); want=e[2] if len(e)>2 else 1
  assert c==want,(c,e[0])
  h=h.replace(e[0],e[1])
fx+=new; tmp=p+".tmp"; json.dump(fx,open(tmp,"w"),indent=1,ensure_ascii=False); os.replace(tmp,p); print(len(fx))
