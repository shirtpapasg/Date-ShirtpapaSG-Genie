"""build_page.py: one HTML page per video from engine.html + the episode's scenes + its timeline.

    python build_page.py ep01/ep01_segments.json ep01/ep01_tl.json ep01/scenes.js ep01/ep01_page.html 1920x1080
    (a Short: ... ep01/short1_page.html 1080x1920)
"""
import json, sys, os
spec_f, tl_f, scenes_f, out, size = sys.argv[1:6]
W, H = map(int, size.split('x')); spec = json.load(open(spec_f))
cfg = {k: v for k, v in spec.items() if k != 'segments'}; cfg.update(W=W, H=H)
if H > W:  # a Short's header: the question, wrapped to two lines
    words, lines, cur = spec['title'].split(), [], ''
    for w in words:
        if len(cur) + len(w) > 18 and cur: lines.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    lines.append(cur); cfg['headLines'] = lines
here = os.path.dirname(os.path.abspath(__file__))
fonts = os.path.relpath(os.path.join(here, 'fonts/node_modules/@fontsource/fredoka/files'), os.path.dirname(os.path.abspath(out)))
h = open(os.path.join(here, 'engine.html')).read()
h = h.replace('FONTS/', fonts + '/').replace('__CFG__', json.dumps(cfg, ensure_ascii=False)).replace('__TL__', open(tl_f).read()).replace('__SCENES__', open(scenes_f).read())
open(out, 'w').write(h); print('wrote', out, W, 'x', H)
