"""new_poses.py (P4 EP1 v2, 26 Nov 2026): the teacher's NEW emotion paintings drop in without code changes.
For every name in NEW (script section 6), if the painting exists in ../characters/sprites/poses/ as <who>_<pose>.png (or the v2 cast's
<who>_v2_<pose>.png), it is scaled like every other pose (x .75, prep_sprites.py) into spr/<who>_<pose>.png and added to spr/manifest.js
(anchor from poses.json when the teacher's pose tool listed it, else the middle of the painting's lowest opaque row). The scenes ask for
these names; lib.js NEWPOSE_FALLBACK shows today's painting until the new one is here. Also copies the teacher's coloured back views (26 Nov)
into spr/<who>_back.png (Basil's is used for the rear-view rides).
Run: python3 new_poses.py   (re-run when new paintings arrive; then re-render)"""
import os, json, re
import numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); S = f"{H}/../characters/sprites"; O = f"{H}/spr"; K = .75
NEW = ["pip_embarrassed", "pip_panic", "pip_dizzy", "pip_proud", "pip_angry", "pip_ride", "momo_facepalm", "momo_laugh", "momo_unimpressed",
       "momo_horrified", "basil_deadpan", "basil_shocked", "basil_laugh", "basil_shrug", "basil_hero", "pip_squeamish"]   # pip_squeamish: P4 EP2 (27 Nov)
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
BH = {w: M[f"{w}_sit_closed"]["bh"] for w in ("pip", "basil", "momo")}
PJ = json.load(open(f"{S}/poses/poses.json")) if os.path.exists(f"{S}/poses/poses.json") else {}
SET = {"pip": ["pip"], "basil": ["basil_v2", "basil"], "momo": ["momo_v2", "momo"]}
found = []
for name in NEW:
    who, pose = name.split("_", 1); f = None; anc = None
    for st in SET[who]:
        for cand in (f"{S}/poses/{st}_{pose}.png", f"{S}/poses/{who}_{pose}.png"):
            if os.path.exists(cand): f = cand; anc = (PJ.get(st, {}).get(pose) or {}).get("anchor"); break
        if f: break
    if not f: M.pop(name, None); continue
    im = Image.open(f).convert("RGBA"); a = np.array(im)[..., 3]
    if not anc:
        ys = np.where(a.max(1) > 128)[0]; yb = ys[-1]; xs = np.where(a[yb - 6: yb + 1].max(0) > 128)[0]; anc = [float(xs.mean()), float(yb)]
    im2 = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS); im2.save(f"{O}/{name}.png")
    M[name] = dict(file=f"spr/{name}.png", w=im2.width, h=im2.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1), bh=BH[who]); found.append(name)
# the back views (teacher, 26 Nov 2026: the NEW coloured paintings; the old grey ones are *_back_grey.png): copied as they are, the anchor
# from poses.json (the v2 cast's own entry first). Only Basil's is used in P4 EP1 v2 (riding away, from behind).
for who, sets in (("basil", ("basil_v2", "basil")), ("momo", ("momo_v2", "momo")), ("pip", ("pip",))):
    for st in sets:
        f = f"{S}/poses/{st}_back.png"
        if not os.path.exists(f): continue
        anc = (PJ.get(st, {}).get("back") or {}).get("anchor")
        im = Image.open(f).convert("RGBA")
        if not anc:
            a_ = np.array(im)[..., 3]; ys = np.where(a_.max(1) > 128)[0]; yb = ys[-1]; xs = np.where(a_[yb - 6: yb + 1].max(0) > 128)[0]; anc = [float(xs.mean()), float(yb)]
        im2 = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS); im2.save(f"{O}/{who}_back.png")
        M[f"{who}_back"] = dict(file=f"spr/{who}_back.png", w=im2.width, h=im2.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1), bh=BH[who]); break
open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
BH = {w: M[f"{w}_sit_closed"]["bh"] for w in ("pip", "basil", "momo")}
PJ = json.load(open(f"{S}/poses/poses.json")) if os.path.exists(f"{S}/poses/poses.json") else {}
SET = {"pip": ["pip"], "basil": ["basil_v2", "basil"], "momo": ["momo_v2", "momo"]}
found = []
for name in NEW:
    who, pose = name.split("_", 1); f = None; anc = None
    for st in SET[who]:
        for cand in (f"{S}/poses/{st}_{pose}.png", f"{S}/poses/{who}_{pose}.png"):
            if os.path.exists(cand): f = cand; anc = (PJ.get(st, {}).get(pose) or {}).get("anchor"); break
        if f: break
    if not f: M.pop(name, None); continue
    im = Image.open(f).convert("RGBA"); a = np.array(im)[..., 3]
    if not anc:
        ys = np.where(a.max(1) > 128)[0]; yb = ys[-1]; xs = np.where(a[yb - 6: yb + 1].max(0) > 128)[0]; anc = [float(xs.mean()), float(yb)]
    im2 = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS); im2.save(f"{O}/{name}.png")
    M[name] = dict(file=f"spr/{name}.png", w=im2.width, h=im2.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1), bh=BH[who]); found.append(name)
# Basil's back view, recoloured to the v2 teal
b = f"{S}/poses/basil_back.png"
if os.path.exists(b):
    im = np.array(Image.open(b).convert("RGBA")).astype(float); lum = np.clip((im[..., :3].mean(2) / 255 - .15) / .8, 0, 1)
    stops = [(0, (22, 40, 52)), (.25, (40, 72, 80)), (.5, (78, 122, 122)), (.7, (112, 156, 150)), (.85, (150, 190, 180)), (1, (205, 225, 215))]; rgb = np.zeros(lum.shape + (3,))
    for (a0, ca), (b0, cb) in zip(stops, stops[1:]):
        sel = (lum >= a0) & (lum <= b0); u = ((lum - a0) / (b0 - a0))[sel][:, None]; rgb[sel] = np.array(ca) * (1 - u) + np.array(cb) * u
    out = Image.fromarray(np.dstack([rgb, im[..., 3]]).astype(np.uint8)); anc = (PJ.get("basil", {}).get("back") or {}).get("anchor", [629, 815])
    out = out.resize((round(out.width * K), round(out.height * K)), Image.LANCZOS); out.save(f"{O}/basil_back.png")
    M["basil_back"] = dict(file="spr/basil_back.png", w=out.width, h=out.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1), bh=BH["basil"])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
print("new paintings found:", found or "none yet", "| back views:", [k for k in M if k.endswith("_back")])
