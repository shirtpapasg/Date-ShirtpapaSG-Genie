import sys,subprocess,os,json
from PIL import Image, ImageDraw
S='/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
W='/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
n=int(sys.argv[1]); page=sys.argv[2]; tag=sys.argv[3]; ts=sys.argv[4:]
if not ts:
  d=json.load(open(f'{S}/ep{n}/tl.json'))
  for s in d['scenes']:
    if s['scene'] in('welcome','close'):continue
    t=s['t0']+1.0
    while t<s['t1']: ts.append('%.1f'%t); t+=3
pre=f'{W}/snaps/r{n:02d}_{tag}'
npm=subprocess.check_output('npm root -g',shell=True,text=True).strip()
if not os.environ.get('NOSNAP'): subprocess.run(['node',f'{W}/snap.js',page,pre]+ts,env=dict(os.environ,NODE_PATH=npm),check=True)
for g in range(0,len(ts),12):
  im=Image.new('RGB',(1920,1440),'white');dr=ImageDraw.Draw(im)
  for i,t in enumerate(ts[g:g+12]):
    f=Image.open(f'{pre}_{t}.jpg').resize((640,360));x,y=(i%3)*640,(i//3)*360
    im.paste(f,(x,y))
    dr.rectangle([x,y,x+60,y+18],fill='yellow');dr.text((x+2,y+2),t,fill='black')
  im.save(f'{pre}_grid{g//12}.jpg');print(f'{pre}_grid{g//12}.jpg')
