#!/bin/bash
# P4 EP3 v2 splice (28 Nov 2026): after the final bubble layout, re-render only the 10 s chunks whose bubbles moved (10-40 s, 280-300 s,
# 330-360 s), cut the v2 video at its chunk boundaries (every 300 frames = a key frame: each chunk is encoded on its own), swap those
# chunks in (stream copy) and mux the LIVE audio again (copied). Under the shared render lock, in RAM.
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g) RENDER_OUT=/dev/shm/p4ep03/render_v2; S=/dev/shm/p4ep03/splice_v2; rm -rf $S; mkdir -p $S/old $S/new
flock /tmp/explained_render.lock bash -c '
  for r in "10 40" "280 300" "330 360"; do set -- $r; node render.js 1 3 $1 $2 >> out/render_v2.log 2>&1 || exit 1; ffmpeg -v error -y -i $RENDER_OUT/clip_$1_v.mp4 -c copy -f segment -segment_frames 300,600 -reset_timestamps 1 '"$S"'/new/c$1_%02d.mp4; done
  ffmpeg -v error -y -i /dev/shm/p4ep03/p4ep03_v2.mp4 -map 0:v -c copy -f segment -segment_frames $(seq -s, 300 300 13500) -reset_timestamps 1 '"$S"'/old/s_%02d.mp4
  python3 - <<P
import os, glob
S = "'"$S"'"; old = sorted(glob.glob(S + "/old/s_*.mp4")); rep = {}
for a in (10, 280, 330):
    for f in sorted(glob.glob(f"{S}/new/c{a}_*.mp4")): rep[a // 10 + int(f[-6:-4])] = f
print("replacing chunks", sorted(rep))
open(S + "/list.txt", "w").write("".join(f"file \x27{rep.get(i, f)}\x27\n" for i, f in enumerate(old)))
P
  ffmpeg -v error -y -f concat -safe 0 -i '"$S"'/list.txt -c copy '"$S"'/video.mp4
  ffmpeg -v error -y -i '"$S"'/video.mp4 -i /dev/shm/p4ep03/p4ep03.mp4 -map 0:v:0 -map 1:a:0 -c copy -movflags +faststart /dev/shm/p4ep03/_v2.mp4 && mv /dev/shm/p4ep03/_v2.mp4 /dev/shm/p4ep03/p4ep03_v2.mp4
  rm -rf '"$S"'/old '"$S"'/new $RENDER_OUT/clipchunks $RENDER_OUT/clip_*; echo SPLICED >> out/render_v2.log'
