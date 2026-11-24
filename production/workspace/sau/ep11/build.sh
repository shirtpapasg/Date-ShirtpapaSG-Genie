#!/bin/bash
# ep11/build.sh [page]: scenes.js + timeline + pages for EP11 and its Shorts (run from anywhere). Then ./render_all.sh ep11
# scenes.js = scenes.src.js with the series' pupil copied in under our own name (krKid in ep02/coldopen.js -> kKid).
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
python3 - <<'PYEOF'
src = open('ep02/coldopen.js').read(); a = src.index('function krKid('); b = src.index('\nS.kidRoom', a)
kid = '// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)\n' + src[a:b].rstrip().replace('krKid', 'kKid')
open('ep11/scenes.js', 'w').write(open('ep11/scenes.src.js').read().replace('/*LIB*/', kid))
PYEOF
[ -f ep11/geo11.js ] || python3 ep11/geo11.py
LIBS=common.js,ep11/geo11.js,ep11/scenes.js,ep11/pov.js
if [ "$1" != "page" ]; then for V in ep11 short1 short2; do [ -f ep11/${V}_segments.json ] && A=$([ $V = ep11 ] && echo aud || echo aud_s${V#short}) && $PY build_tl.py ep11/${V}_segments.json ep11/$A ep11/$V | grep -E "PROPORTIONAL|WARN|END"; done; fi
python3 build_page.py ep11/ep11_segments.json ep11/ep11_tl.json $LIBS ep11/ep11_page.html 1920x1080
for V in short1 short2; do [ -f ep11/${V}_tl.json ] && python3 build_page.py ep11/${V}_segments.json ep11/${V}_tl.json $LIBS,ep11/short_extra.js ep11/${V}_page.html 1080x1920; done; true
