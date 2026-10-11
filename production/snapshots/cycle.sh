#!/bin/bash
# usage: cycle.sh N  -> prep, audit, sheet
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
O=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps
export NODE_PATH=$(npm root -g)
n=$1
python3 $S/prep_all.py $n || exit 1
node $S/audit.js $S/ep$n/ep${n}b.html $S/audit/ep$n.json > $O/ep${n}_audit.txt 2>&1
node $S/sheet.js $S/ep$n/ep${n}b.html $S/audit/ep$n.json $O/ep${n}_sheet.jpg > /dev/null 2>&1
echo "ep$n done"; tail -3 $O/ep${n}_audit.txt
