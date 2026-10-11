#!/bin/bash
# render_queue.sh N ...: render each prepped episode (R/epN/run_all.sh -> R/P3_EPNN_<Name>.mp4) and split it into
# review-board parts of <= ~14 MB in W/web3/epNN_<i>.mp4. Log: R/render_queue.log.
K=$(cd "$(dirname "$0")" && pwd); R=$(cd "${P3_ROOT:-$K/..}" && pwd)
WEB=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/web3; mkdir -p $WEB
for n in "$@"; do NN=$(printf %02d $n); D=$R/ep$n
  if ! bash $K/run_all.sh $D > $D/run.log 2>&1; then echo "ep$NN RENDER FAIL $(date +%T): $(tail -1 $D/run.log)" >> $R/render_queue.log; continue; fi
  F=$(python3 -c "import json;print(json.load(open('$D/meta.json'))['out'])")
  python3 $K/split_web.py $F $WEB ep$NN >> $R/render_queue.log 2>&1 || echo "ep$NN SPLIT FAIL" >> $R/render_queue.log
  echo "ep$NN done $(date +%T) $(tail -1 $D/run.log)" >> $R/render_queue.log
done
