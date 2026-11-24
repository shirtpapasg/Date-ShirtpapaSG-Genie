#!/bin/bash
# ep11/check.sh [videos]: decode every mp4 end to end, compare frame counts with the timelines, loudness, and a contact sheet
# (1 frame every 5 s) per video: ep11/sheet_<video>.jpg
cd "$(dirname "$0")"
for V in ${1:-ep11 short1 short2}; do
  [ -f $V.mp4 ] || { echo "$V.mp4 missing"; continue; }
  E=$(ffmpeg -v error -i $V.mp4 -f null - 2>&1 | head -3); [ -z "$E" ] && echo "$V decodes end to end: OK" || echo "$V DECODE ERRORS: $E"
  N=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 $V.mp4)
  X=$(python3 -c "import json,math;print(math.ceil(json.load(open('${V}_tl.json'))['END']*30))")
  D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $V.mp4); S=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $V.mp4)
  L=$(ffmpeg -i $V.mp4 -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | xargs)
  echo "$V: $S, ${D}s, frames $N (expected $X), $L, $(du -h $V.mp4 | cut -f1)"
  case $V in short*) W=216; C=6;; *) W=384; C=8;; esac
  R=$(python3 -c "import math;print(math.ceil(math.ceil($D/5)/$C))")
  ffmpeg -v error -y -i $V.mp4 -vf "fps=1/5,scale=$W:-1,tile=${C}x${R}" -frames:v 1 -q:v 4 sheet_$V.jpg && echo "  contact sheet: sheet_$V.jpg"
done
