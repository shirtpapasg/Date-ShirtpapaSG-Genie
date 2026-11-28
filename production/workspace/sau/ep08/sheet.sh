#!/bin/bash
# ep08/sheet.sh name cols t1 t2 ... : stills of the EP08 page at those times, tiled into /tmp/ep08/<name>.png
cd "$(dirname "$0")/.."; N=$1; C=$2; shift 2; export NODE_PATH=$(npm root -g); rm -rf /tmp/ep08/$N; mkdir -p /tmp/ep08/$N
i=0; for t in "$@"; do A+=("$t"); done
node stills.js ep08/ep08_page.html /tmp/ep08/$N/s 1920 1080 "$@"
i=0; for t in "$@"; do mv /tmp/ep08/$N/s_$(printf '%06s' $t | tr ' ' 0).png /tmp/ep08/$N/f$(printf '%03d' $i).png; i=$((i+1)); done
R=$(( ($# + C - 1) / C ))
ffmpeg -y -loglevel error -i /tmp/ep08/$N/f%03d.png -vf "scale=${W:-640}:-1,tile=${C}x${R}" -frames:v 1 /tmp/ep08/$N.png && echo /tmp/ep08/$N.png
