import sys, json, subprocess, os
from PIL import Image, ImageDraw
# usage: grid.py N tag step [t0 t1]
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
P="/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); tag=sys.argv[2]; step=float(sys.argv[3])
tl=json.load(open(f"{S}/ep{n}/tl.json")); END=tl["END"]
t0=float(sys.argv[4]) if len(sys.argv)>4 else 2.0; t1=float(sys.argv[5]) if len(sys.argv)>5 else END-1
ts=[]; t=t0
while t<=t1: ts.append(round(t,2)); t+=step
d=f"{P}/snaps/ep{n}_{tag}"; os.makedirs(d,exist_ok=True)
env=dict(os.environ); env["NODE_PATH"]=subprocess.check_output("npm root -g",shell=True,text=True).strip()
subprocess.run(["node",f"{P}/snap.js",f"{S}/ep{n}/ep{n}b.html",f"{d}/f"]+[str(x) for x in ts],check=True,env=env,stdout=subprocess.DEVNULL)
fs=sorted([f for f in os.listdir(d) if f.startswith("f_")],key=lambda f:float(f[2:-4]))
for g in range(0,len(fs),12):
  im=Image.new("RGB",(1920,1080))
  for i,f in enumerate(fs[g:g+12]):
    x=Image.open(f"{d}/{f}").resize((640,360)); ImageDraw.Draw(x).text((5,5),f[2:-4],fill="yellow")
    im.paste(x,((i%3)*640,(i//3)*360)) if i<9 else None
  # 12 per 3x4 => 1920x1440
  im=Image.new("RGB",(1920,1440))
  for i,f in enumerate(fs[g:g+12]):
    x=Image.open(f"{d}/{f}").resize((640,360)); dr=ImageDraw.Draw(x); dr.rectangle((0,0,60,16),fill="black"); dr.text((3,3),f[2:-4],fill="yellow")
    im.paste(x,((i%3)*640,(i//3)*360))
  out=f"{P}/snaps/ep{n}_{tag}_g{g//12}.jpg"; im.save(out,quality=80); print(out)
