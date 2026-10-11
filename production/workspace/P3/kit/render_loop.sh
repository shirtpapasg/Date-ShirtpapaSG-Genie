#!/bin/bash
# render_loop.sh: render episodes queued in R/queue.txt (one number per line), in order; exits when the queue is empty
# and R/prep.log says PREP DONE, or stops taking new episodes after 95 minutes (background job limit is 2 h).
K=$(cd "$(dirname "$0")" && pwd); R=$(cd "${P3_ROOT:-$K/..}" && pwd); cd $R; start=$(date +%s)
while [ $(( $(date +%s) - start )) -lt 5700 ]; do
  n=$(head -n1 queue.txt 2>/dev/null)
  if [ -z "$n" ]; then grep -q "PREP DONE" prep.log 2>/dev/null && break; sleep 20; continue; fi
  sed -i 1d queue.txt; echo "ep$n start $(date +%T)" >> render_queue.log; $K/render_queue.sh $n
done
echo "render loop exit $(date +%T)" >> render_queue.log
