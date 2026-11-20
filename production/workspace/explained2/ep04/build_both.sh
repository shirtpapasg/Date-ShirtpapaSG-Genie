#!/bin/bash
# build_both.sh: Part 1 then Part 2 (see build_part.sh); logs in out/build1.log and out/build2.log
cd "$(dirname "$0")"; ./build_part.sh 1 > out/build1.log 2>&1; ./build_part.sh 2 > out/build2.log 2>&1
