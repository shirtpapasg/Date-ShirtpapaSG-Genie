import sys,glob,re
from PIL import Image,ImageDraw
W="/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
pre=sys.argv[1]
fs=[f for f in glob.glob(f"{W}/snaps/{pre}_*.jpg") if 'grid' not in f]
ts=sorted(float(re.search(r'_([\d.]+)\.jpg$',f).group(1)) for f in fs)
# only those that were in the 12-grid missing slots
miss=[t for i,t in enumerate(ts) if i%12>=9]
im=Image.new('RGB',(1920,1080),'white'); d=ImageDraw.Draw(im)
for i,t in enumerate(miss[:9]):
  s=str(t); f=Image.open(f"{W}/snaps/{pre}_{s}.jpg").resize((640,360)); x,y=(i%3)*640,(i//3)*360; im.paste(f,(x,y)); d.rectangle([x,y,x+60,y+22],fill='black'); d.text((x+3,y+5),s,fill='yellow')
im.save(f"{W}/snaps/{pre}_miss0.jpg")
if len(miss)>9:
  im=Image.new('RGB',(1920,1080),'white'); d=ImageDraw.Draw(im)
  for i,t in enumerate(miss[9:18]):
    s=str(t); f=Image.open(f"{W}/snaps/{pre}_{s}.jpg").resize((640,360)); x,y=(i%3)*640,(i//3)*360; im.paste(f,(x,y)); d.rectangle([x,y,x+60,y+22],fill='black'); d.text((x+3,y+5),s,fill='yellow')
  im.save(f"{W}/snaps/{pre}_miss1.jpg")
print(pre,miss)
