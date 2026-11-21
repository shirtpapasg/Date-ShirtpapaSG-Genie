#!/bin/bash
# patch_v3.sh P: the hidden animal named at the start (picture in the mystery disc + "A little duck/frog is hiding!") and the new reveal line.
# Renders ONLY the changed spans with the new timeline (EP_OUT=v3) and splices them between untouched spans of the live v2 render
# (v2/out/video_pP.mp4). Cuts are on 300-frame chunk boundaries of the v2 render (keyframes); each line's length change was snapped to whole
# frames (script.py "post"), so the untouched spans copy across unchanged, only shifted. v1 and v2 files are not touched.
cd "$(dirname "$0")/.."; export NODE_PATH=$(npm root -g); export EP_OUT=v3; P=$1; O=v2/out/video_p$P.mp4; D=v3/out/patch_p$P; rm -rf $D; mkdir -p $D; L=$D/list.txt; : > $L
if [ "$P" = 1 ]; then NEW="20 39.8 259.8 268.833333"; else NEW="20 29.833333 259.833333 268.833333"; fi; OLD="0 20 40 260 270"; [ "$P" = 2 ] && OLD="0 20 30 260 270"
render() { flock /tmp/explained_render.lock node render.js $P 3 $1 $2 | tail -1; mv v3/out/clip_$1_v.mp4 $D/new_$1.mp4; rm -f v3/out/clip_$1.mp4; echo "file '$(pwd)/$D/new_$1.mp4'" >> $L; }
old() { echo "file '$(pwd)/$O'"$'\n'"inpoint $1" >> $L; [ -n "$2" ] && echo "outpoint $2" >> $L; }
n=($NEW); o=($OLD)
old ${o[0]} ${o[1]}; render ${n[0]} ${n[1]}; old ${o[2]} ${o[3]}; render ${n[2]} ${n[3]}; old ${o[4]}
ffmpeg -y -loglevel error -f concat -safe 0 -i $L -c copy v3/out/video_p$P.mp4
ffprobe -v error -count_packets -select_streams v -show_entries stream=nb_read_packets -of csv=p=0 v3/out/video_p$P.mp4
flock /tmp/explained_render.lock ./finish.sh $P
