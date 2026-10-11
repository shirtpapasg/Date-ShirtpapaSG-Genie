# usage: vcheck.sh N  -> prints duration + parts, writes snaps/vN_grid.jpg (intro board, 1/3, 2/3, ending)
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad; W=/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
n=$1; NN=$(printf %02d $n); OUT=$(grep -o '\.\./P4_EP[^ ]*\.mp4' $S/ep$n/run_all.sh | tail -1); F=$S/${OUT#../}
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $F); W1=$(python3 -c "import json;w=[s for s in json.load(open('$S/ep$n/tl.json'))['segs'] if s['id']=='welcome'][0];print(round(w['t1']-0.5,1))")
i=0; for t in $W1 $(python3 -c "print(round($D/3,1), round(2*$D/3,1), round($D-1.2,1))"); do ffmpeg -loglevel error -y -ss $t -i $F -frames:v 1 -vf scale=960:540 $W/snaps/vc_$i.jpg; i=$((i+1)); done
python3 -c "
from PIL import Image
ims=[Image.open(f'$W/snaps/vc_{i}.jpg') for i in range(4)]
o=Image.new('RGB',(1920,1080));[o.paste(im,((i%2)*960,(i//2)*540)) for i,im in enumerate(ims)];o.save('$W/snaps/v${n}_grid.jpg',quality=75)"
printf "duration %s (%d:%02d)\n" $D $(python3 -c "d=round($D);print(d//60, d%60)"); ls $W/web2/ep${NN}_*.mp4
