#!/bin/bash
# usage: grid_ep.sh N tag [step]
N=$1; TAG=$2; STEP=${3:-5}
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
P=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
export NODE_PATH=$(npm root -g)
END=$(python3 -c "import json;print(json.load(open('$S/ep$N/tl.json'))['END'])")
TS=$(python3 -c "import numpy" 2>/dev/null; python3 -c "
e=$END;s=$STEP;t=2.0;o=[]
while t<e-0.5: o.append('%.1f'%t); t+=s
print(' '.join(o))")
mkdir -p $P/snaps/g$N
rm -f $P/snaps/g$N/*.jpg
node $P/snap.js $S/ep$N/ep${N}b.html $P/snaps/g$N/f $TS
python3 - <<PY
from PIL import Image, ImageDraw
import glob,os
fs=sorted(glob.glob('$P/snaps/g$N/f_*.jpg'),key=lambda f:float(os.path.basename(f)[2:-4]))
for k in range(0,len(fs),12):
    G=Image.new('RGB',(1920,1440),'black'); d=ImageDraw.Draw(G)
    for i,f in enumerate(fs[k:k+12]):
        im=Image.open(f).resize((640,360)); x=(i%3)*640; y=(i//3)*360
        G.paste(im,(x,y)); d.rectangle([x,y,x+70,y+16],fill='black'); d.text((x+3,y+2),os.path.basename(f)[2:-4],fill='yellow')
    G.save('$P/snaps/ep${N}_${TAG}_grid%d.jpg'%(k//12))
PY
