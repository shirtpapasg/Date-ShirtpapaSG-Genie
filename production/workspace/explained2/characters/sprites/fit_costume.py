"""Run from the TheOneApp checkout root: /home/user/heart-tts/venv/bin/python <this file> chin doctor sit=a.jpg happy=b.jpg stand=c.jpg
fit_costume.py <frames> <costume> <pose>=<painting.jpg> ...: cut a costume painting out of its white background and fit it over the
app's own picture pets/<frames>-<pose>.png (same 360x360 canvas, same top-to-feet height, same centre), -> pets/costumes/<frames>-<costume>-<pose>.png"""
import sys, cv2, numpy as np
sys.path.insert(0, '/home/user/Date-ShirtpapaSG-Genie/production/workspace/explained2/characters/sprites')
from cutout import cutout
from PIL import Image
fr, cos = sys.argv[1], sys.argv[2]
for arg in sys.argv[3:]:
    pose, src = arg.split('=', 1)
    rgba = cutout(cv2.imread(src))                      # BGRA
    im = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    a = np.asarray(im)[..., 3]; ys, xs = np.where(a > 128); im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    o = np.asarray(Image.open(f'pets/{fr}-{pose}.png').convert('RGBA'))[..., 3]; oy, ox = np.where(o > 128)
    H = oy.max() - oy.min() + 1; k = H / im.height; W = round(im.width * k)
    if W > 352: k = 352 / im.width; W = 352; H = round(im.height * k)
    im = im.resize((W, H), Image.LANCZOS)
    cx = (ox.min() + ox.max()) / 2; x0 = int(round(cx - W / 2)); x0 = max(4, min(356 - W, x0)); y0 = oy.max() + 1 - H
    out = Image.new('RGBA', (360, 360), (0, 0, 0, 0)); out.alpha_composite(im, (x0, y0))
    out.save(f'pets/costumes/{fr}-{cos}-{pose}.png', optimize=True); print(pose, 'scale', round(k, 3), 'box', x0, y0, W, H)
