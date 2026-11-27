"""run_poses.py (P4 EP1 v2 fix pass 6, 27 Nov 2026): the teacher's two-frame RUN paintings (characters/teacher_run_2026-11-27/<who>_run_<a|b>.jpg,
cut out by ../characters/sprites/poses.py as poses/<who>_run_run_<a|b>.png on the buddy's sitting scale and feet line) -> spr/<who>_run_<a|b>.png
(x .75, as every pose here) + manifest entries. lib.js buddy0 { run: "left"|"right" } shows them, A/B alternating. Pip's arrived first;
Momo's and Basil's are picked up here as soon as their cut-outs exist.   Run: python3 run_poses.py; then re-render."""
import os, json
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); S = f"{H}/../characters/sprites"; O = f"{H}/spr"; K = .75
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")]); PJ = json.load(open(f"{S}/poses/poses.json"))
for who in ("pip", "momo", "basil"):
    st = PJ.get(f"{who}_run", {})
    for f in ("a", "b"):
        e = st.get(f"run_{f}")
        if not e: continue
        im = Image.open(f"{S}/{e['file']}").convert("RGBA"); im2 = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS); im2.save(f"{O}/{who}_run_{f}.png")
        M[f"{who}_run_{f}"] = dict(file=f"spr/{who}_run_{f}.png", w=im2.width, h=im2.height, ax=round(e["anchor"][0] * K, 1), ay=round(e["anchor"][1] * K, 1), bh=M[f"{who}_sit_closed"]["bh"])
        print(who, f, M[f"{who}_run_{f}"])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
