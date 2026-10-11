#!/bin/bash
# renders episodes listed (one per line) in queue.txt, in order; stops at a line "END"
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
while true; do
  n=$(head -n1 $S/queue.txt 2>/dev/null)
  if [ -z "$n" ]; then sleep 20; continue; fi
  sed -i 1d $S/queue.txt
  [ "$n" = "END" ] && break
  echo "ep$n start $(date +%T)" >> $S/render_queue.log
  $S/render_queue.sh $n
done
