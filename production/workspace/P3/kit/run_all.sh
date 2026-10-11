#!/bin/bash
# run_all.sh EPDIR: render EPDIR's page (from meta.json, written by prep_p3.py) at 60 fps in 4 parallel parts,
# build the sfx track, mix voice + sfx to 48 kHz stereo AAC, and write the episode mp4 named in meta.json.
# Env: WORKERS (default 4), NICE (default 10). Waits while another render (P3 or P4) is running.
set -euo pipefail
K=$(cd "$(dirname "$0")" && pwd); D=$(cd "$1" && pwd); cd "$D"
meta() { python3 -c "import json,sys;print(json.load(open('meta.json'))[sys.argv[1]])" "$1"; }
PAGE=$(meta page); OUT=$(meta out); END=$(meta END); FPS=60; W=${WORKERS:-4}
while pgrep -f "^node .*render_par" >/dev/null; do sleep 20; done
N=$(python3 -c "import math;print(math.ceil($END*$FPS))"); CH=$(( (N + W - 1) / W ))
export NODE_PATH=$(npm root -g)
rm -f part*.mp4
for i in $(seq 0 $((W-1))); do a=$((i*CH)); b=$(( (i+1)*CH < N ? (i+1)*CH : N ))
  nice -n ${NICE:-10} node $K/render_par.js $PAGE $D/part$i.mp4 $a $b $FPS > log$i.txt 2>&1 & done; wait
for i in $(seq 0 $((W-1))); do [ -s part$i.mp4 ] || { echo "part$i.mp4 missing: see $D/log$i.txt"; exit 1; }; done
if grep -l PAGEERR log*.txt; then echo "page errors while rendering (see logs above)"; exit 1; fi
for i in $(seq 0 $((W-1))); do echo "file 'part$i.mp4'"; done > parts.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i parts.txt -c copy video_noaudio.mp4
python3 -I $K/sfx.py $D
ffmpeg -loglevel error -y -i video_noaudio.mp4 -i voice.wav -i sfx.wav -filter_complex "[1:a]aresample=48000,loudnorm=I=-16:TP=-1.5,aresample=48000[v];[2:a]aresample=48000,volume=0.55[s];[v][s]amix=inputs=2:duration=first:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart "$OUT"
ffprobe -hide_banner "$OUT" 2>&1 | grep -E "Duration|Stream"
