#!/bin/bash
# prep every episode (name, fixes, scene enlargement) and queue it for rendering
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; cd $S
for n in "$@"; do
  rm -f fills/ep$n.json
  if python3 prep_all.py $n >> prep2.log 2>&1 && NODE_PATH=$(npm root -g) node fill_measure.js $S/ep$n/ep${n}b.html $S/fills/ep${n}_box.json >> prep2.log 2>&1 \
     && python3 fill_calc.py $n >> prep2.log 2>&1 && python3 prep_all.py $n >> prep2.log 2>&1; then
    echo $n >> queue.txt; echo "ep$n prepped $(date +%T)" >> prep2.log
  else echo "ep$n PREP FAIL $(date +%T)" >> prep2.log; fi
done
echo "PREP DONE $(date +%T)" >> prep2.log
