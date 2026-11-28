#!/bin/bash
# ep06/sheet.sh OUT COLS t1 t2 ... : stills at the given times, tiled into OUT.png (run from sau/)
OUT=$1; COLS=$2; shift 2; D=$(dirname $OUT)/_s_$(basename $OUT .png); rm -rf $D; mkdir -p $D; export NODE_PATH=$(npm root -g)
node stills.js ep06/ep06_page.html $D/s 1920 1080 "$@"
i=0; for t in "$@"; do f=$(printf "$D/s_%s.png" $(printf "%6s" $t | tr ' ' '0')); mv $f $(printf "$D/f%03d.png" $i); i=$((i+1)); done
R=$(( (i + COLS - 1) / COLS )); ffmpeg -y -loglevel error -i $D/f%03d.png -vf "scale=640:-1,tile=${COLS}x${R}" -frames:v 1 $OUT
