#!/bin/bash
# render_all.sh epNN : renders the episode (1920x1080) and its two Shorts (1080x1920) at 30 fps, then mixes voice + sound effects.
set -e; S=$(cd "$(dirname "$0")" && pwd); EP=$1; cd $S/$EP; FPS=30; export NODE_PATH=$(npm root -g)
one() { V=$1; W=$2; H=$3; N=$4
  END=$(python3 -c "import json;print(json.load(open('${V}_tl.json'))['END'])"); F=$(python3 -c "import math;print(math.ceil($END*$FPS))"); CH=$(( (F + N - 1) / N ))
  for i in $(seq 0 $((N-1))); do a=$((i*CH)); b=$(( (i+1)*CH < F ? (i+1)*CH : F )); node $S/render.js ${V}_page.html ${V}_part$i.mp4 $a $b $FPS $W $H > ${V}_log$i.txt 2>&1 & done; wait
  for i in $(seq 0 $((N-1))); do echo "file '${V}_part$i.mp4'"; done > ${V}_parts.txt
  ffmpeg -loglevel error -y -f concat -safe 0 -i ${V}_parts.txt -c copy ${V}_noaudio.mp4
  ffmpeg -loglevel error -y -i ${V}_noaudio.mp4 -i ${V}_voice.wav -i ${V}_sfx.wav -filter_complex "[1:a]aresample=48000,loudnorm=I=-16:TP=-1.5,aresample=48000[v];[2:a]aresample=48000,volume=0.5[s];[v][s]amix=inputs=2:duration=first:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart ${V}.mp4
  rm -f ${V}_part*.mp4 ${V}_noaudio.mp4; ffprobe -hide_banner ${V}.mp4 2>&1 | grep -E "Duration|Stream" ; }
# ./render_all.sh epNN [list]: the list picks what to render (default: the episode and both Shorts), e.g. "epNN" alone after a fix
for V in ${2:-$EP short1 short2}; do case $V in short*) one $V 1080 1920 2;; *) one $V 1920 1080 4;; esac; done; echo RENDER_DONE
