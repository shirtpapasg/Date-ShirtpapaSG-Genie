"""ep13/spr13.py: the buddies for EP13 -> ep13/spr13.js (window.SPR13: file, w, h, ax, ay, bh for each picture) and ep13/spr/.
Front views: the Explained series' current cast as used by EP27 (explained2/ep27/spr: Pip grey, Momo coral v2, Basil teal v2), referenced in place.
Back views (riding along, looking into the scene): the teacher's back paintings (explained2/characters/sprites/poses/momo_back.png,
basil_back.png, 22 Nov) are the OLD GREY art. Here they are recoloured to the v2 coral / teal by a luminance map (Basil's as P4 EP1 v2's
new_poses.py does). THE RULEBOOK SAYS NOT TO RECOLOUR GREY ART WITH CODE: these are stand-ins for the stills only, until the teacher
paints coloured backs (and Pip's back view, which does not exist yet). Pip rides in a front view (he speaks on the journey anyway).
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
PJ = json.load(open(os.path.join(EX, 'characters', 'sprites', 'poses', 'poses.json')))
for who in ('momo', 'basil'):
    im = np.array(Image.open(os.path.join(EX, 'characters', 'sprites', 'poses', f'{who}_back.png')).convert('RGBA')).astype(float)
    lum = np.clip((im[..., :3].mean(2) / 255 - .15) / .8, 0, 1); rgb = np.zeros(lum.shape + (3,)); st = STOPS[who]
    for (a0, ca), (b0, cb) in zip(st, st[1:]):
        sel = (lum >= a0) & (lum <= b0); u = ((lum - a0) / (b0 - a0))[sel][:, None]; rgb[sel] = np.array(ca) * (1 - u) + np.array(cb) * u
    out = Image.fromarray(np.dstack([rgb, im[..., 3]]).astype(np.uint8)); a = im[..., 3]
    anc = (PJ.get(who, {}).get('back') or {}).get('anchor')
    if not anc: ys = np.where(a.max(1) > 128)[0]; yb = ys[-1]; xs = np.where(a[yb - 6: yb + 1].max(0) > 128)[0]; anc = [float(xs.mean()), float(yb)]
    out = out.resize((round(out.width * K), round(out.height * K)), Image.LANCZOS); out.save(os.path.join(H, 'spr', f'{who}_back.png'), optimize=True)
    OUT[f'{who}_back'] = dict(file=f'spr/{who}_back.png', w=out.width, h=out.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1),
                              bh=float(round((np.where(a.max(1) > 128)[0][-1] - np.where(a.max(1) > 128)[0][0]) * K, 1)))   # body height = the painting's opaque height
open(os.path.join(H, 'spr13.js'), 'w').write('window.SPR13 = ' + json.dumps(OUT) + ';\n')
print(len(OUT), 'pictures;', {k: OUT[k] for k in ('momo_back', 'basil_back', 'pip_sit_closed', 'momo_sit_closed', 'basil_sit_closed')})
