#!/bin/bash
# P4 EP3 v2 (28 Nov 2026: the detective hat instead of the helmet, no bike helmets, the director's shots (10-second rule), the edge trace,
# GLITCH spacing, Uncle Lim only for his line, high-contrast titles). A FULL render (the hat and the new shots touch almost every chunk),
# in RAM under the shared lock; then the video is muxed with the LIVE file's audio stream copied bit for bit (no re-encode), so the sound
# is identical to KLHY6W_dTR4: /dev/shm/p4ep03/p4ep03_v2.mp4. The live cut /dev/shm/p4ep03/p4ep03.mp4 is kept.
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g) RENDER_OUT=/dev/shm/p4ep03/render_v2; mkdir -p $RENDER_OUT
flock /tmp/explained_render.lock bash -c 'for i in 1 2 3 4; do node render.js 1 3 >> out/render_v2.log 2>&1 && break; echo "retry $i" >> out/render_v2.log; sleep 5; done
  ffmpeg -y -loglevel error -i $RENDER_OUT/video_p1.mp4 -i /dev/shm/p4ep03/p4ep03.mp4 -map 0:v:0 -map 1:a:0 -c copy -movflags +faststart /dev/shm/p4ep03/_v2.mp4 && mv /dev/shm/p4ep03/_v2.mp4 /dev/shm/p4ep03/p4ep03_v2.mp4
  rm -rf $RENDER_OUT/chunks_p1; df -BM --output=avail / | tail -1 >> out/render_v2.log; echo FINISHED >> out/render_v2.log'
