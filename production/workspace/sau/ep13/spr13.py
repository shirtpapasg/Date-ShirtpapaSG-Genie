"""ep13/spr13.py: the buddies for EP13 -> ep13/spr13.js (window.SPR13: file, w, h, ax, ay, bh for each picture) and ep13/spr/.
Front views: the Explained series' current cast as used by EP27 (explained2/ep27/spr: Pip grey, Momo coral v2, Basil teal v2), referenced in place.
Back views (riding along, looking into the scene) are SWITCHABLE: for each buddy the first of these that exists is used:
  1. the teacher's coloured back painting, cut out by explained2/characters/sprites/poses.py on the sitting scale and feet line
     (poses/pip_back.png, poses/momo_v2_back.png, poses/basil_v2_back.png; teacher's paintings of 26 Nov 2026), drawn at the sitting body height;
  2. a stand-in: the old grey back painting (poses/<who>_back_grey.png) recoloured by a luminance map (only if no coloured one exists);
  3. none (Pip before 26 Nov): the scenes then show the front view.
A painting counts as coloured when its opaque pixels are clearly saturated, so a grey file dropped in by mistake still gets the stand-in.
    python3 ep13/spr13.py        (from workspace/sau)"""
import os, json, numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); EX = os.path.join(H, '..', '..', 'explained2'); E27 = os.path.join(EX, 'ep27', 'spr')
src = open(os.path.join(E27, 'manifest.js')).read(); M = json.loads(src[src.index('=') + 1: src.rindex(';')])
OUT = {}
for k, v in M.items():
    if any(k.startswith(w + '_') for w in ('pip', 'momo', 'basil')):
        OUT[k] = dict(v, file='../../explained2/ep27/' + v['file'])
os.makedirs(os.path.join(H, 'spr'), exist_ok=True); K = .75 * .5      # the series' .75 sprite scale, then half size (they ride small)
STOPS = {"basil": [(0, (22, 40, 52)), (.25, (40, 72, 80)), (.5, (78, 122, 122)), (.7, (112, 156, 150)), (.85, (150, 190, 180)), (1, (205, 225, 215))],
         "momo": [(0, (70, 28, 22)), (.25, (160, 62, 40)), (.5, (222, 100, 70)), (.7, (243, 140, 100)), (.85, (250, 188, 150)), (1, (255, 236, 214))]}
P = os.path.join(EX, 'characters', 'sprites', 'poses'); PJ = json.load(open(os.path.join(P, 'poses.json')))
def coloured(im):
    a = im[..., 3] > 128; rgb = im[..., :3][a] / 255.; return float((rgb.max(1) - rgb.min(1)).mean()) > .12
SRC = {}
for who, st in (("pip", "pip"), ("momo", "momo_v2"), ("basil", "basil_v2")):
    f = os.path.join(P, f'{st}_back.png')
    if os.path.exists(f) and st in PJ and 'back' in PJ[st]:
        im = np.array(Image.open(f).convert('RGBA')).astype(float)
        if who == "pip" or coloured(im):     # Pip is grey by design (teacher, 22 Nov): his painting is always the real one
            out = Image.open(f).convert('RGBA'); out = out.resize((round(out.width * K), round(out.height * K)), Image.LANCZOS)
            out.save(os.path.join(H, 'spr', f'{who}_back.png'), optimize=True); anc = PJ[st]['back']['anchor']
            OUT[f'{who}_back'] = dict(file=f'spr/{who}_back.png', w=out.width, h=out.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1),
                                      bh=round(PJ[st]['_sit']['body_h'] * K, 1)); SRC[who] = f'teacher coloured painting ({st}_back.png)'; continue
    g = os.path.join(P, f'{who}_back_grey.png')
    if who in STOPS and os.path.exists(g):     # stand-in: the grey painting recoloured (only until a coloured one exists)
        im = np.array(Image.open(g).convert('RGBA')).astype(float)
        lum = np.clip((im[..., :3].mean(2) / 255 - .15) / .8, 0, 1); rgb = np.zeros(lum.shape + (3,)); stp = STOPS[who]
        for (a0, ca), (b0, cb) in zip(stp, stp[1:]):
            sel = (lum >= a0) & (lum <= b0); u = ((lum - a0) / (b0 - a0))[sel][:, None]; rgb[sel] = np.array(ca) * (1 - u) + np.array(cb) * u
        out = Image.fromarray(np.dstack([rgb, im[..., 3]]).astype(np.uint8)); a = im[..., 3]
        ys = np.where(a.max(1) > 128)[0]; yb = ys[-1]; xs = np.where(a[yb - 6: yb + 1].max(0) > 128)[0]; anc = [float(xs.mean()), float(yb)]
        out = out.resize((round(out.width * K), round(out.height * K)), Image.LANCZOS); out.save(os.path.join(H, 'spr', f'{who}_back.png'), optimize=True)
        OUT[f'{who}_back'] = dict(file=f'spr/{who}_back.png', w=out.width, h=out.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1),
                                  bh=float(round((ys[-1] - ys[0]) * K, 1))); SRC[who] = 'stand-in (grey painting recoloured)'
    else: SRC[who] = 'none (front view)'
print('back views:', SRC)
open(os.path.join(H, 'spr13.js'), 'w').write('window.SPR13 = ' + json.dumps(OUT) + ';\n')
print(len(OUT), 'pictures;', {k: OUT[k] for k in ('momo_back', 'basil_back', 'pip_sit_closed', 'momo_sit_closed', 'basil_sit_closed')})
