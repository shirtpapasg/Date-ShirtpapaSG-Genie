"""nk_poses.py (P4 EP1 v2, 27 Nov 2026): the teacher's PAINTED Momo with the neckerchief and gold medal ("i got the pose of the collar fixed",
characters/teacher_momo_neckerchief_2026-11-27/, cut out by ../characters/sprites/poses.py as poses/momo_nk_<pose>.png on momo_v2's scale and
feet line). Scaled like every pose here (x .75) into spr/momo_nk_<pose>.png; spr/manifest.js's momo_<pose> entries now point at them (the
old v2 sprites spr/momo_<pose>.png stay on disk, unused). Poses with no painting yet (sit, oops, waving, back) keep the v2 sprite and the
code-drawn neckerchief (items_options.js option N, with the painting's gold medal).   Run: python3 nk_poses.py; then re-render."""
import os, json
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); S = f"{H}/../characters/sprites"; O = f"{H}/spr"; K = .75
PAINTED = ["arms_crossed", "thinking", "pointing", "cheer", "surprised"]
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")]); PJ = json.load(open(f"{S}/poses/poses.json"))
for p in PAINTED:
    im = Image.open(f"{S}/poses/momo_nk_{p}.png").convert("RGBA"); anc = PJ["momo_nk"][p]["anchor"]
    im2 = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS); im2.save(f"{O}/momo_nk_{p}.png")
    M[f"momo_{p}"] = dict(file=f"spr/momo_nk_{p}.png", w=im2.width, h=im2.height, ax=round(anc[0] * K, 1), ay=round(anc[1] * K, 1), bh=M["momo_sit_closed"]["bh"])
    print(p, M[f"momo_{p}"])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
