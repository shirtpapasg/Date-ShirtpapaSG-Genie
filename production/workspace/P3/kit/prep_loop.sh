#!/bin/bash
# prep_loop.sh N ...: prep each episode (kit/prep_p3.py) and queue the good ones for rendering.
# Log: R/prep.log ("epN prepped" / "epN PREP FAIL" / "PREP DONE"); queue: R/queue.txt (read by render_loop.sh).
K=$(cd "$(dirname "$0")" && pwd); R=$(cd "${P3_ROOT:-$K/..}" && pwd); cd $R
for n in "$@"; do
  if P3_ROOT=$R python3 $K/prep_p3.py $n >> prep.log 2>&1; then echo $n >> queue.txt; echo "ep$n prepped $(date +%T)" >> prep.log
  else echo "ep$n PREP FAIL $(date +%T)" >> prep.log; fi
done
echo "PREP DONE $(date +%T)" >> prep.log
