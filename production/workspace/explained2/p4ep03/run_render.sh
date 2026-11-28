#!/bin/bash
# P4 EP3 full render (28 Nov 2026): queue on the shared lock; retry the render (finished 10 s chunks are kept) up to 4 times; chunks and the
# joined video in RAM (RENDER_OUT=/dev/shm/p4ep03/render: the disk is tight, keep >= 3 GB free); then finish.sh (mux with out/mix_p1.wav,
# 30 stills, srt, decode / loudness / true-peak checks) -> /dev/shm/p4ep03/p4ep03.mp4; the chunks deleted at once
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g) RENDER_OUT=/dev/shm/p4ep03/render FINAL=/dev/shm/p4ep03; mkdir -p $RENDER_OUT
flock /tmp/explained_render.lock bash -c 'for i in 1 2 3 4; do node render.js 1 3 >> out/render.log 2>&1 && break; echo "retry $i" >> out/render.log; sleep 5; done; rm -rf $RENDER_OUT/chunks_p1; df -BM --output=avail / | tail -1 >> out/render.log; ./finish.sh 1 > out/finish.log 2>&1; rm -f $RENDER_OUT/video_p1.mp4; echo FINISHED >> out/finish.log'
