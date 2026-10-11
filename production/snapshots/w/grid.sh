#!/bin/bash
# grid.sh N step [start] [end] -> snaps/epN_gridK.jpg
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
P=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
N=$1; STEP=$2; TAG=${5:-grid}
END=$(python3 -c "import json;print(json.load(open('$S/ep$N/tl.json')).get('END',0))")
A=${3:-2}; B=${4:-$END}
TS=$(python3 -c "
import numpy as np
print(' '.join('%.2f'%x for x in np.arange($A,$B,$STEP)))")
mkdir -p $P/w/f$N; rm -f $P/w/f$N/*
NODE_PATH=$(npm root -g) node $P/snap.js $S/ep$N/ep${N}b.html $P/w/f$N/s $TS >/dev/null 2>&1
python3 - <<PY
from PIL import Image, ImageDraw
import glob,re
fs=sorted(glob.glob('$P/w/f$N/s_*.jpg'),key=lambda f: float(re.search(r's_([\d.]+)\.jpg',f).group(1)))
for k in range(0,len(fs),12):
    g=Image.new('RGB',(1920,1440))
    for j,f in enumerate(fs[k:k+12]):
        im=Image.open(f).resize((640,360)); d=ImageDraw.Draw(im); t=re.search(r's_([\d.]+)\.jpg',f).group(1)
        d.rectangle([0,0,70,18],fill='black'); d.text((3,3),t,fill='yellow'); g.paste(im,((j%3)*640,(j//3)*360))
    g.save('$P/snaps/ep${N}_${TAG}%d.jpg'%(k//12)); print('$P/snaps/ep${N}_${TAG}%d.jpg'%(k//12))
PY
