S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; cd $S
for n in "$@"; do NODE_PATH=$(npm root -g) node audit.js $S/ep$n/ep${n}b.html $S/audit/ep$n.json & while [ $(jobs -r | wc -l) -ge 4 ]; do sleep 1; done; done; wait
