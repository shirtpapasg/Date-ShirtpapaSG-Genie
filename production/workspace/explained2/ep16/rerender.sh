#!/bin/bash
# rerender.sh P chunkStart...: re-render only the given 10 s chunks of a part (frame numbers, as in out/chunks_pP/c_NNNNNN.mp4), then re-join
# the video frame-exactly (render.js renders only the missing chunks and concatenates all of them) and re-mux with the same mix (finish.sh).
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g); P=$1; shift; B=out/old_chunks_p$P; mkdir -p $B
for f in "$@"; do n=$(printf "out/chunks_p%s/c_%06d.mp4" $P $f); [ -f $n ] && mv $n $B/; done
flock /tmp/explained_render.lock node render.js $P 3 | tail -1; flock /tmp/explained_render.lock ./finish.sh $P
