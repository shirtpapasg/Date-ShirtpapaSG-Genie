import json,sys,os,subprocess
from PIL import Image, ImageDraw
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
W="/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); tag=sys.argv[2]
page=f"{S}/ep{n}/preview.html" if os.path.exists(f"{S}/ep{n}/preview.html") else f"{S}/ep{n}/ep{n}b.html"
if len(sys.argv)>3: ts=[float(x) for x in sys.argv[3:]]
else:
  tl=json.load(open(f"{S}/ep{n}/tl.json")); ts=[]
  for s in tl['scenes']:
    if s['scene'] in('welcome','close'): continue
    t=s['t0']+1.0
    while t<s['t1']: ts.append(round(t,1)); t+=3
os.makedirs(f"{W}/snaps",exist_ok=True)
pre=f"{W}/snaps/r{n}_{tag}"
env=dict(os.environ,NODE_PATH=subprocess.check_output("npm root -g",shell=True,text=True).strip())
0 if os.environ.get('NOSNAP') else subprocess.run(["node",f"{W}/snap.js",page,pre]+[str(t) for t in ts],env=env,check=True)
for gi in range(0,len(ts),12):
  im=Image.new("RGB",(1920,1080),"white"); d=ImageDraw.Draw(im)
  for k,t in enumerate(ts[gi:gi+12]):
    f=Image.open(f"{pre}_{t}.jpg").resize((640,360)); x,y=(k%3)*640,(k//3)*270
    im.paste(f.resize((640,270)) if False else f.resize((480,270)),((k%4)*480,(k//4)*270)); d.text(((k%4)*480+5,(k//4)*270+5),str(t),fill="red")
  out=f"{pre}_grid{gi//12}.jpg"; im.save(out,quality=80); print(out)
