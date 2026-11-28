#!/bin/bash
# ep10/sheet.sh name cols t1 t2 ... : stills of the EP09 page at those times, tiled into /tmp/ep10/<name>.png
cd "$(dirname "$0")/.."; N=$1; C=$2; shift 2; export NODE_PATH=$(npm root -g); rm -rf /tmp/ep10/$N; mkdir -p /tmp/ep10/$N
i=0; for t in "$@"; do A+=("$t"); done
node stills.js ep10/ep10_page.html /tmp/ep10/$N/s 1920 1080 "$@"
i=0; for t in "$@"; do mv /tmp/ep10/$N/s_$(printf '%06s' $t | tr ' ' 0).png /tmp/ep10/$N/f$(printf '%03d' $i).png; i=$((i+1)); done
R=$(( ($# + C - 1) / C ))
ffmpeg -y -loglevel error -i /tmp/ep10/$N/f%03d.png -vf "scale=${W:-640}:-1,tile=${C}x${R}" -frames:v 1 /tmp/ep10/$N.png && echo /tmp/ep10/$N.png
