#!/bin/bash
S=$(cd "$(dirname "$0")" && pwd); cd $S
while pgrep -f "^node render_par" >/dev/null; do sleep 20; done
END=$(python3 -c "import json;print(json.load(open('tl.json'))['END'])"); FPS=60
N=$(python3 -c "import math;print(math.ceil($END*$FPS))"); W=4; CH=$(( (N + W - 1) / W ))
for i in $(seq 0 $((W-1))); do a=$((i*CH)); b=$(( (i+1)*CH < N ? (i+1)*CH : N )); NODE_PATH=$(npm root -g) node render_par.js $S/ep5b.html $S/part$i.mp4 $a $b $FPS > log$i.txt 2>&1 & done; wait
printf "file 'part%d.mp4'\n" 0 1 2 3 > parts.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i parts.txt -c copy video_noaudio.mp4
python3 -I sfx.py
ffmpeg -loglevel error -y -i video_noaudio.mp4 -i voice.wav -i sfx.wav -filter_complex "[1:a]aresample=48000,loudnorm=I=-16:TP=-1.5,aresample=48000[v];[2:a]aresample=48000,volume=0.55[s];[v][s]amix=inputs=2:duration=first:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart ../P4_EP05_BodySystems_Heart.mp4
ffprobe -hide_banner ../P4_EP05_BodySystems_Heart.mp4 2>&1 | grep -E "Duration|Stream"
