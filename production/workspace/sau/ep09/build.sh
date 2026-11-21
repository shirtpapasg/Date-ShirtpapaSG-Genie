#!/bin/bash
# ep09/build.sh [page]: sounds + scenes.js + timeline + page for EP09 (run from anywhere). Then ./render_all.sh ep09 ep09
set -e; cd "$(dirname "$0")/.."; PY=/home/user/heart-tts/venv/bin/python
ls sfx/ep09_plink.wav >/dev/null 2>&1 || $PY ep09/sfx_ep09.py
# scenes.js = scenes.src.js with two things copied in under our own names (prefix e9): the Sungei Buloh chain drawings of
# ep08/scenes.src.js (for last time's answer) and the series' pupil (krKid in ep02/coldopen.js)
python3 - <<'PYEOF'
import re
src = open('ep02/coldopen.js').read(); a = src.index('function krKid('); b = src.index('\nS.kidRoom', a)
kid = '// the pupil (copied from ep02/coldopen.js krKid): side view, facing right, feet at (0, 0)\n' + src[a:b].rstrip().replace('krKid', 'e9Kid')
e8 = open('ep08/scenes.src.js').read(); a = e8.index('const e8o'); b = e8.index('// ====', a)
lib = re.sub(r'(?<![#\w])e8', 'e9', e8[a:b].replace('/*KID*/', kid)).replace('E8NAME', 'E9NAME')
open('ep09/scenes.js', 'w').write(open('ep09/scenes.src.js').read().replace('/*LIB*/', '/* ---- copied from ep08/scenes.src.js (renamed e8 -> e9) ---- */\n' + lib))
PYEOF
[ "$1" = "page" ] || $PY build_tl.py ep09/ep09_segments.json ep09/aud ep09/ep09 | grep -v aligned
python3 build_page.py ep09/ep09_segments.json ep09/ep09_tl.json common.js,geo_map.js,ep09/scenes.js,ep09/pov.js ep09/ep09_page.html 1920x1080
