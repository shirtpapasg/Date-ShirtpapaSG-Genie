#!/bin/bash
# remux.sh N: redo the audio mix of an already-rendered episode (48 kHz stereo) and re-split the web parts
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; W=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/web2
n=$1; NN=$(printf %02d $n); cd $S/ep$n
OUT=$(grep -o '\.\./P4_EP[^ ]*\.mp4' run_all.sh | tail -1)
bash -c "$(grep -m1 '^ffmpeg .*video_noaudio.mp4 -i voice.wav' run_all.sh)" && rm -f $W/ep${NN}_*.mp4 && python3 $S/split_web.py $S/${OUT#../} $W ep$NN
