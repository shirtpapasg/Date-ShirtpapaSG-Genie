"""nk_talk.py (P4 EP1 v2, fix pass 6, 27 Nov 2026): Momo's TALKING set (spr/momo_sit_<state>.png: closed, half, wide, blink, half_blink,
wide_blink: her arms-crossed painting with the mouth shapes for lip-sync) gets the teacher's PAINTED neckerchief and medal. The teacher's
momo_nk_arms_crossed is the same painting as momo_v2_arms_crossed (momo_v2_talk_closed.jpg) plus the neckerchief: the pixels where the two
differ (the scarf, its knot and tails, the medal) are cut from the painting and laid on every talking state at the place the v2 painting
matches inside the talking canvas (template match, same scale, correlation .998). -> spr/momo_nkt_sit_<state>.png; the manifest's
momo_sit_<state> entries point at them (the old files stay). Run: python3 nk_talk.py (after nk_poses.py)."""
import cv2, numpy as np, json, os
H = os.path.dirname(os.path.abspath(__file__)); O = f"{H}/spr"
def gray(a): al = a[..., 3:] / 255.; return cv2.cvtColor((a[..., :3] * al + 255 * (1 - al)).astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
v2 = cv2.imread(f"{O}/momo_arms_crossed.png", -1); nk = cv2.imread(f"{O}/momo_nk_arms_crossed.png", -1)[:, :v2.shape[1]]
src = open(f"{O}/manifest.js").read(); M = json.loads(src[src.index("=") + 1: src.rindex(";")])
# the scarf: where the painting differs from its v2 twin, in the neck band
d = np.abs(nk[..., :3].astype(int) - v2[..., :3].astype(int)).max(2); da = np.abs(nk[..., 3].astype(int) - v2[..., 3].astype(int))
m = ((d > 45) & (nk[..., 3] > 60)) | (da > 60); m[:262] = False; m[460:] = False   # (rows above 262: the mouth, which differs a hair between the two paintings)
n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8)); keep = np.zeros_like(m)
for i in range(1, n):
    if st[i, 4] > 1500: keep |= lab == i   # the scarf (band, knot, triangle, strap and medal): big pieces only, no stray outline differences
keep = cv2.morphologyEx(keep.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8)); keep = cv2.dilate(keep, np.ones((5, 5), np.uint8))
soft = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.2)[..., None]
ref = cv2.imread(f"{O}/momo_sit_closed.png", -1); res = cv2.matchTemplate(gray(ref), gray(v2)[20:260, 60:440], cv2.TM_CCOEFF_NORMED); _, mx, _, loc = cv2.minMaxLoc(res)
ox, oy = loc[0] - 60, loc[1] - 20; print("v2 painting inside the talking canvas at", (ox, oy), "match", round(mx, 3), "scarf px", int(keep.sum()))
for st_ in ["closed", "half", "wide", "blink", "half_blink", "wide_blink"]:
    k = f"momo_sit_{st_}"; S = cv2.imread(f"{O}/momo_sit_{st_}.png", -1).astype(np.float32)
    h, w = nk.shape[:2]; reg = S[oy:oy + h, ox:ox + w]; a = soft[: reg.shape[0], : reg.shape[1]]; src_ = nk[: reg.shape[0], : reg.shape[1]].astype(np.float32)
    # premultiplied over: the scarf pixels replace the talking sprite's (with the painting's own alpha at the knot's tails)
    sa = src_[..., 3:] / 255 * a; da_ = reg[..., 3:] / 255; outa = sa + da_ * (1 - sa)
    reg[..., :3] = (src_[..., :3] * sa + reg[..., :3] * da_ * (1 - sa)) / np.maximum(outa, 1e-6); reg[..., 3:] = outa * 255
    S[oy:oy + h, ox:ox + w] = reg; cv2.imwrite(f"{O}/momo_nkt_sit_{st_}.png", np.clip(S, 0, 255).astype(np.uint8))
    M[k] = dict(M[k], file=f"spr/momo_nkt_sit_{st_}.png")
# the two poses with no painting (oops: paw on her head; waving): the same painted scarf, placed by each pose's chin (items_options MOMOH:
# arms_crossed chin [270, 254]; oops [318, 262] -> (+48, +8); waving: (+14, +20), set by eye so the medal hangs at the middle of her chest)
for p, (dx, dy) in {"oops": (48, 8), "waving": (14, 20)}.items():
    S = cv2.imread(f"{O}/momo_{p}.png", -1).astype(np.float32); h, w = nk.shape[:2]; H_, W_ = S.shape[:2]
    x0, y0, x1, y1 = max(0, dx), max(0, dy), min(W_, dx + w), min(H_, dy + h); reg = S[y0:y1, x0:x1]
    a = soft[y0 - dy:y1 - dy, x0 - dx:x1 - dx]; src_ = nk[y0 - dy:y1 - dy, x0 - dx:x1 - dx].astype(np.float32)
    sa = src_[..., 3:] / 255 * a; da_ = reg[..., 3:] / 255; outa = sa + da_ * (1 - sa)
    reg[..., :3] = (src_[..., :3] * sa + reg[..., :3] * da_ * (1 - sa)) / np.maximum(outa, 1e-6); reg[..., 3:] = outa * 255
    S[y0:y1, x0:x1] = reg; cv2.imwrite(f"{O}/momo_nkt_{p}.png", np.clip(S, 0, 255).astype(np.uint8)); M[f"momo_{p}"] = dict(M[f"momo_{p}"], file=f"spr/momo_nkt_{p}.png")
open(f"{O}/manifest.js", "w").write("window.SPR=" + json.dumps(M) + ";")
