#!/bin/bash
# usage: setup_ep.sh <n> <prev n> <voice> <speed> <OutputName>
S=/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad
N=$1; P=$2; V=$3; SP=$4; OUT=$5; NN=$(printf "%02d" $N); PP=$(printf "%02d" $P)
mkdir -p $S/ep$N/aud $S/ep$N/st && cd $S/ep$N
cp ../ep$P/align1.py ../ep$P/build_tl.py ../ep$P/sfx.py ../ep$P/render_par.js ../ep$P/stills.js ../ep$P/run_all.sh ../ep$P/build_page.py .
cp ../ep1/oneapp_mind.png . ; ln -sf ../ep1/fonts fonts
sed -i "s#ep${PP}_segments.json#ep${NN}_segments.json#; s#align_ep$P.json#align_ep$N.json#" align1.py
sed -i "s#align_ep$P.json#align_ep$N.json#" build_tl.py
sed -i "s#ep${P}b.html#ep${N}b.html#; s#\.\./P4_EP${PP}_[A-Za-z]*_[A-Za-z]*#../$OUT#g" run_all.sh
python3 -c "
import json,re,os,pocketsphinx
dic=set(l.split()[0].split('(')[0] for l in open(os.path.join(pocketsphinx.get_model_path(),'en-us','cmudict-en-us.dict')))
for s in json.load(open('$S/p4/ep${NN}_segments.json')):
  ws=re.findall(r\"[a-z']+\", s['text'].replace('TheOneApp','the one app').lower()); o=sorted(set(w for w in ws if w not in dic))
  if o: print('OOV', s['id'],o)"
cd $S/tts && nice -n 5 ./venv/bin/python batch.py model_q8.onnx voices.npz $S/p4/ep${NN}_segments.json $V $S/ep$N/aud $SP 2>&1 | grep -v -i warn | awk '{s+=$2} END{print "narration seconds",s}'
grep -o "\.\./P4_EP[^ ]*mp4" $S/ep$N/run_all.sh | head -2
