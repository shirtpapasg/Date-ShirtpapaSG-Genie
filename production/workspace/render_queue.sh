#!/bin/bash
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
W=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/web2; mkdir -p $W
for n in "$@"; do NN=$(printf %02d $n); cd $S/ep$n
  rm -f part*.mp4; bash run_all.sh > run.log 2>&1
  OUT=$(grep -o '\.\./P4_EP[^ ]*\.mp4' run_all.sh | tail -1); F=$S/${OUT#../}
  python3 $S/split_web.py $F $W ep$NN >> $S/render_queue.log 2>&1 || echo "ep$NN SPLIT FAIL" >> $S/render_queue.log
  echo "ep$NN done $(date +%T) $(tail -1 run.log)" >> $S/render_queue.log
done
