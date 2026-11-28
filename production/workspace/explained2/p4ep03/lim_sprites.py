"""lim_sprites.py (P4 EP1 v2, 27 Nov 2026): the teacher's painted Uncle Lim (cut out by ../characters/lim/cut_lim.py) into spr/lim_<view>.png
and spr/manifest.js entries lim_<view>: w, h, ax/ay = the pixel that is the local origin (side views: the roadster's local origin, so the
painted wheels sit on RD's wheel centres and ground; others: between the feet / under the wheel, on the ground), scale = local units per
pixel (one helmet width in every view), wheels (side views: centre, inner and outer tyre radius, px), face (the face box, px, for QA).
Run: python3 lim_sprites.py (after cut_lim.py); then re-render."""
import os, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); C = f"{H}/../characters/lim/cut"; O = f"{H}/spr"
M_ = json.load(open(f"{C}/lim.json")); src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
for k, m in M_.items():
    shutil.copy(f"{C}/lim_{k}.png", f"{O}/lim_{k}.png")
    M[f"lim_{k}"] = dict(file=f"spr/lim_{k}.png", w=m["w"], h=m["h"], ax=round(m["ox"], 1), ay=round(m["oy"], 1), bh=0, scale=round(m["scale"], 4),
                         wheels=m.get("wheels"), face=m.get("face"))
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";"); print(sorted(k for k in M if k.startswith("lim_")))
