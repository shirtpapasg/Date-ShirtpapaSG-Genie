#!/bin/bash
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; cd $S
: > $S/queue.txt
nohup ./render_daemon.sh >> render_daemon.out 2>&1 &
for n in $(seq 1 22); do
  if python3 prep_all.py $n >> voice3_prep.log 2>&1; then echo $n >> $S/queue.txt; echo "ep$n prepped $(date +%T)" >> voice3_prep.log
  else echo "ep$n PREP FAIL" >> voice3_prep.log; fi
done
echo END >> $S/queue.txt
