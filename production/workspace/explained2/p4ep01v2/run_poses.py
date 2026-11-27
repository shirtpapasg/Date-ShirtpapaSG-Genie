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
# fix pass 7: frame B is registered to frame A by the HEAD (the paintings' heads differ a little in size and place): B's head is found in A's
# (template match over scales, upper body), then B's anchor and body height are set so that both heads land on the same screen pixels;
# no jump when A and B swap. (Pip's two frames already matched within 2 px; the same step is applied to every buddy with a B frame.)
import numpy as np, cv2
def gray(p): a = cv2.imread(p, -1); al = a[..., 3:] / 255.; return cv2.cvtColor((a[..., :3] * al + 255 * (1 - al)).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
for who in ("pip", "momo", "basil"):
    if not (f"{who}_run_a" in M and f"{who}_run_b" in M): continue
    A, B = gray(f"{O}/{who}_run_a.png"), gray(f"{O}/{who}_run_b.png"); h, w = A.shape
    tA = A[int(.04 * h):int(.42 * h), int(.08 * w):int(.75 * w)]; y0, x0 = int(.04 * h), int(.08 * w); best = None
    for k in np.linspace(.9, 1.1, 41):
        t = cv2.resize(tA, None, fx=k, fy=k)
        if t.shape[0] >= B.shape[0] or t.shape[1] >= B.shape[1]: continue
        r = cv2.matchTemplate(B, t, cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(r)
        if not best or mx > best[0]: best = (mx, k, loc)
    mx, k, (bx, by) = best; ea, eb = M[f"{who}_run_a"], M[f"{who}_run_b"]
    eb["ax"] = round(bx + (ea["ax"] - x0) * k, 1); eb["ay"] = round(by + (ea["ay"] - y0) * k, 1); eb["bh"] = round(ea["bh"] * k, 1)
    print(who, "B registered to A by the head: match", round(mx, 3), "scale", round(k, 3), "anchor", eb["ax"], eb["ay"])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
