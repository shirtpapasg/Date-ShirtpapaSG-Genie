#!/bin/bash
# shots.sh OUTDIR t1 t2 ... : rebuild the EP04 page, save stills at these times and tile them into OUTDIR/sheet.png (a test loop, one browser)
cd "$(dirname "$0")/.."; OUT=$1; shift; mkdir -p $OUT; rm -f $OUT/s_*.png
python3 build_page.py ep04/ep04_segments.json ep04/ep04_tl.json common.js,geo_map.js,ep04/scenes.js,ep04/pov.js ep04/ep04_page.html 1920x1080 >/dev/null
NODE_PATH=$(npm root -g) node stills.js ep04/ep04_page.html $OUT/s 1920 1080 "$@"
N=$#; C=${COLS:-4}; R=$(( (N + C - 1) / C ))
ffmpeg -y -loglevel error -pattern_type glob -i "$OUT/s_*.png" -vf "scale=${SW:-640}:-1,tile=${C}x${R}" -frames:v 1 $OUT/sheet.png
