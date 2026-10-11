import sys, json, subprocess, os
from PIL import Image, ImageDraw
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
W="/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); tag=sys.argv[2]
page=f"{S}/ep{n}/preview.html" if os.path.exists(f"{S}/ep{n}/preview.html") else f"{S}/ep{n}/ep{n}b.html"
if len(sys.argv)>3: ts=[float(x) for x in sys.argv[3:]]
else:
    tl=json.load(open(f"{S}/ep{n}/tl.json")); ts=[]
    for sc in tl['scenes']:
        if sc['scene'] in ('welcome','close'): continue
        t=sc['t0']+1.0
        while t<sc['t1']: ts.append(round(t,1)); t+=3
pre=f"{W}/snaps/r{n}_{tag}"
env=dict(os.environ); env['NODE_PATH']=subprocess.check_output("npm root -g",shell=True,text=True).strip()
if not os.environ.get("NOSNAP"): subprocess.run(["node",f"{W}/snap.js",page,pre]+[str(t) for t in ts],env=env,check=True)
for g in range(0,len(ts),12):
    im=Image.new("RGB",(1920,1440),"white"); d=ImageDraw.Draw(im)
    for k,t in enumerate(ts[g:g+12]):
        f=Image.open(f"{pre}_{t}.jpg").resize((640,360)); x,y=(k%3)*640,(k//3)*360
        im.paste(f,(x,y)); d.text((x+5,y+5),str(t),fill="red")
    im.save(f"{pre}_grid{g//12}.jpg"); print(f"{pre}_grid{g//12}.jpg")
