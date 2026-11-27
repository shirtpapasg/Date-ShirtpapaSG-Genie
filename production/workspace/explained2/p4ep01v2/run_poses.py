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
    # (fix pass 8) SIFT features of the HEAD (top 38 % of A) matched in B, a scale + shift fitted with RANSAC: robust where the arms change
    sf = cv2.SIFT_create(); ka, da = sf.detectAndCompute(A.astype(np.uint8), None); kb, db = sf.detectAndCompute(B.astype(np.uint8), None)
    good = [m_ for m_, n_ in cv2.BFMatcher().knnMatch(da, db, k=2) if m_.distance < .7 * n_.distance and ka[m_.queryIdx].pt[1] < .38 * h]
    pa = np.float32([ka[g.queryIdx].pt for g in good]); pb = np.float32([kb[g.trainIdx].pt for g in good])
    T_, inl = cv2.estimateAffinePartial2D(pa, pb, method=cv2.RANSAC, ransacReprojThreshold=3); k = float(np.hypot(T_[0, 0], T_[1, 0])); mx = float(inl.mean())
    ea, eb = M[f"{who}_run_a"], M[f"{who}_run_b"]
    eb["ax"] = round(float(T_[0, 0] * ea["ax"] + T_[0, 1] * ea["ay"] + T_[0, 2]), 1); eb["ay"] = round(float(T_[1, 0] * ea["ax"] + T_[1, 1] * ea["ay"] + T_[1, 2]), 1); eb["bh"] = round(ea["bh"] * k, 1)
    # the landing frame stands ON the ground: its lowest opaque row is the feet line (a few px of head bob between the frames, not a sink)
    ab = cv2.imread(f"{O}/{who}_run_b.png", -1)[..., 3]; eb["ay"] = float(np.where(ab.max(1) > 128)[0].max())
    print(who, "B registered to A by the head: inliers", round(mx, 3), len(good), "scale", round(k, 3), "anchor", eb["ax"], eb["ay"])
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
