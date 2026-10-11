#!/bin/bash
# render queued episodes; stop taking new ones after 95 minutes (background job limit is 2 h)
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; cd $S; start=$(date +%s)
while [ $(( $(date +%s) - start )) -lt 5700 ]; do
  n=$(head -n1 queue.txt 2>/dev/null)
  if [ -z "$n" ]; then grep -q "PREP DONE" prep2.log 2>/dev/null && break; sleep 20; continue; fi
  sed -i 1d queue.txt; echo "ep$n start $(date +%T)" >> render_queue.log; ./render_queue.sh $n
done
echo "render loop exit $(date +%T)" >> render_queue.log
