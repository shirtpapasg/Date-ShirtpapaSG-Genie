#!/bin/bash
# usage: grid.sh N name t1 t2 ... -> snaps/epN_name_gK.jpg (12 per grid, 3 cols)
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
O=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps
export NODE_PATH=$(npm root -g)
n=$1; name=$2; shift 2
mkdir -p $O/raw
node /tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snap.js $S/ep$n/ep${n}b.html $O/raw/ep${n}_$name "$@"
python3 - "$O" "$n" "$name" "$@" <<'PY'
import sys
from PIL import Image, ImageDraw
O,n,name,*ts=sys.argv[1:]
for k in range(0,len(ts),12):
    ch=ts[k:k+12]; rows=(len(ch)+2)//3
    G=Image.new("RGB",(1920,360*rows),"black")
    for i,t in enumerate(ch):
        im=Image.open(f"{O}/raw/ep{n}_{name}_{t}.jpg").resize((640,360))
        d=ImageDraw.Draw(im); d.rectangle([0,0,70,22],fill="black"); d.text((4,4),t,fill="yellow")
        G.paste(im,((i%3)*640,(i//3)*360))
    G.save(f"{O}/ep{n}_{name}_g{k//12}.jpg",quality=80); print(f"{O}/ep{n}_{name}_g{k//12}.jpg")
PY
