import sys,json,subprocess,os
from PIL import Image,ImageDraw
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
W="/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); page=sys.argv[2]; tag=sys.argv[3]
ts=[float(x) for x in sys.argv[4:]] if len(sys.argv)>4 else None
if ts is None:
  tl=json.load(open(f"{S}/ep{n}/tl.json")); ts=[]
  for s in tl['scenes']:
    if s['scene'] in('welcome','close'): continue
    t=s['t0']+1
    while t<s['t1']: ts.append(round(t,1)); t+=3
pre=f"{W}/snaps/r{n}{tag}"
env=dict(os.environ); env['NODE_PATH']=subprocess.check_output("npm root -g",shell=True,text=True).strip()
subprocess.run(["node",f"{W}/snap.js",page,pre]+[str(t) for t in ts],env=env,check=True)
for g in range(0,len(ts),9):
  im=Image.new('RGB',(1920,1080),'white'); d=ImageDraw.Draw(im)
  for i,t in enumerate(ts[g:g+9]):
    f=Image.open(f"{pre}_{t}.jpg").resize((640,360)); x,y=(i%3)*640,(i//3)*360; im.paste(f,(x,y)); d.rectangle([x,y,x+60,y+22],fill='black'); d.text((x+3,y+5),str(t),fill='yellow')
  im.save(f"{pre}_grid{g//9}.jpg"); print(f"{pre}_grid{g//12}.jpg")
