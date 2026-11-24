#!/bin/bash
# ep11/sheet.sh page W H name cols t1 t2 ... : stills of an EP11 page at those times, tiled into /tmp/ep11/<name>.png
cd "$(dirname "$0")/.."; P=$1; W=$2; H=$3; N=$4; C=$5; shift 5; export NODE_PATH=$(npm root -g); rm -rf /tmp/ep11/$N; mkdir -p /tmp/ep11/$N
node stills.js ep11/$P /tmp/ep11/$N/s $W $H "$@" | grep -v "^no page errors"
i=0; for t in "$@"; do mv /tmp/ep11/$N/s_$(printf '%06s' $t | tr ' ' 0).png /tmp/ep11/$N/f$(printf '%03d' $i).png; i=$((i+1)); done
R=$(( ($# + C - 1) / C ))
ffmpeg -y -loglevel error -i /tmp/ep11/$N/f%03d.png -vf "scale=${SW:-640}:-1,tile=${C}x${R}" -frames:v 1 /tmp/ep11/$N.png && echo /tmp/ep11/$N.png
