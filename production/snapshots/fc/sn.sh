#!/bin/bash
# usage: sn.sh N tag seg:word[:off] ...
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
W=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
n=$1; tag=$2; shift 2
ts=$(python3 - "$S/ep$n/tl.json" "$@" <<'PY'
import json,sys
tl=json.load(open(sys.argv[1])); out=[]
for a in sys.argv[2:]:
    p=a.split(":"); 
    if p[1]=="END": t=next(s for s in tl["segs"] if s["id"]==p[0])["t1"]
    else: t=tl["cues"][p[0]][p[1]]
    t+=float(p[2]) if len(p)>2 else 0
    out.append(f"{t:.2f}")
print(" ".join(out))
PY
)
cd $W; NODE_PATH=$(npm root -g) node $W/snap.js $S/ep$n/ep${n}b.html $W/snaps/fc${n}_$tag $ts
fs=""; for t in $ts; do fs="$fs $W/snaps/fc${n}_${tag}_$t.jpg"; done
python3 $W/fc/grid.py $W/snaps/fc${n}_${tag}_grid.jpg $fs; echo $W/snaps/fc${n}_${tag}_grid.jpg $ts
