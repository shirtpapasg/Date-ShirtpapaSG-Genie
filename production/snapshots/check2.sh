# usage: check2.sh N -> snaps/c2_N.jpg (countdown, lab card, mind-map phone) + audio format + tick check
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; W=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
n=$1; OUT=$(grep -o '\.\./P4_EP[^ ]*\.mp4' $S/ep$n/run_all.sh | tail -1); F=$S/${OUT#../}
read T1 T2 T3 T0 <<< $(python3 -c "
import json; tl=json.load(open('$S/ep$n/tl.json')); g={s['id']:s for s in tl['segs']}; c=tl['cues']
q=g['quiz1']['t1']; lab=[v for k,v in tl['cues'].items()]
import re
h=open('$S/ep$n/ep${n}b.html').read(); m=re.search(r'window.LABCARD = (\{.*?\});',h); L=json.loads(m.group(1)); seg=g[L['seg']]
print(round(q+2.5,2), round(seg['t1']-0.3,2), round(c['habit2']['save']+1.2,2), round(q+.5,2))")
i=0; for t in $T1 $T2 $T3; do ffmpeg -loglevel error -y -ss $t -i $F -frames:v 1 -vf scale=960:540 $W/snaps/c2tmp_$i.jpg; i=$((i+1)); done
python3 -c "
from PIL import Image
ims=[Image.open(f'$W/snaps/c2tmp_{i}.jpg') for i in range(3)]
o=Image.new('RGB',(2880,540));[o.paste(im,(i*960,0)) for i,im in enumerate(ims)];o.resize((1920,360)).save('$W/snaps/c2_$n.jpg',quality=80)"
ffprobe -v error -select_streams a -show_entries stream=sample_rate,channels -of csv=p=0 $F
ffmpeg -hide_banner -ss $T0 -t 4.2 -i $F -af "volumedetect" -f null - 2>&1 | grep -o "max_volume: [-0-9.]* dB"
