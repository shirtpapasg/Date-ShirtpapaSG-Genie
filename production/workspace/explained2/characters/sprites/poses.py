"""poses.py: the teacher's extra poses (poses_inbox/*.jpg) -> cut-out sprites on the same scale and foot line as each buddy's
sitting sprite, so a pose swap never changes the buddy's size or where it stands.
  /home/user/heart-tts/venv/bin/python poses.py        -> poses/<buddy>_<pose>.png + poses/poses.json + qa/poses_<buddy>.png
How: cutout.cutout() (border flood: bellies stay opaque, the ground shadow floods away), then
  scale  = sitting body height (feet to top of head, from <buddy>_sit.json) / this pose's height * ADJ[pose]
           (ADJ corrects poses whose top is not the head: raised paws, or a pose painted with a bigger head)
  anchor = (body-centre x, feet bottom y): body centre = the middle of the widest run of the silhouette across the belly rows
           (so the tail does not pull it), shifted by the same offset the sitting sprite's hips have from ITS body centre.
Each PNG is resampled once to the sitting sprite's pixel scale; poses.json gives its anchor [x, y] (feet line) in that PNG."""
import cv2, numpy as np, json, os, sys
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from cutout import cutout, on
IN = f"{H}/poses_inbox"
POSES = {  # buddy: {pose: (file, crop or None)}
  "pip": {"cheer": ("pip_cheer_mouth_open_eyes_closed.jpg", None), "oops": ("pip_oops.jpg", None), "thinking": ("pip_thinking.jpg", None),
          "surprised": ("pip_surprised.jpg", None), "arms_crossed": ("pip_arms_crossed.jpg", None), "waving": ("pip_waving.jpg", None),
          "pointing": ("pointing_draft2_sheet.jpg", (440, 15, 815, 432)), "back": ("pip_back.jpg", None)},
  "momo": {"cheer": ("momo_cheer_mouth_open.jpg", None), "oops": ("momo_oops.jpg", None), "thinking": ("momo_thinking.jpg", None),
           "surprised": ("momo_surprised.jpg", None), "arms_crossed": ("momo_arms_crossed.jpg", None), "pointing": ("momo_pointing.jpg", None),
           "waving": ("momo_waving.jpg", None), "back": ("momo_back.jpg", None)},
  "basil": {"cheer": ("basil_cheer_mouth_wide.jpg", None), "oops": ("basil_oops.jpg", None), "surprised": ("basil_surprised.jpg", None),
            "arms_crossed": ("basil_arms_crossed.jpg", None), "back": ("basil_back.jpg", None)},
}
POSES["basil_c"] = {  # Basil in colour (teal, from EP14): his own poses, on his coloured sitting set (basil_c_sit.json)
  "oops": ("basil_c_oops.jpg", None), "waving": ("basil_c_waving.jpg", None), "thinking": ("basil_c_thinking.jpg", None),
  "surprised": ("basil_c_surprised.jpg", None), "pointing": ("basil_c_pointing.jpg", None),
  "cheer": ("basil_c_sheet_sit_cheer.jpg", (512, 505, 1024, 950))}   # from a 2x2 sheet: small, upscaled 2x (softer)
POSES["momo_c"] = {  # Momo in colour (coral, from EP14)
  "oops": ("momo_c_oops.jpg", None), "waving": ("momo_c_waving.jpg", None), "thinking": ("momo_c_thinking.jpg", None),
  "surprised": ("momo_c_surprised.jpg", None), "cheer": ("momo_c_cheer.jpg", None), "arms_crossed": ("momo_c_arms_crossed.jpg", None),
  "pointing": ("momo_c_pointing.jpg", None)}   # uncropped re-send (22 Nov) replaced the cropped one. Was:
                                                # where her tail side is hidden (off-frame, behind a prop, waist-up); an uncropped one is asked for
POSES["momo_v2"] = {  # Momo in Pip's style (Gemini, 23 Nov): one model, one style for all three buddies
  "oops": ("momo_v2_oops_final.jpg", None), "waving": ("momo_v2_waving.jpg", None), "thinking": ("momo_v2_thinking.jpg", None),
  "surprised": ("momo_v2_surprised.jpg", None), "cheer": ("momo_v2_cheer.jpg", None), "pointing": ("momo_v2_pointing.jpg", None),
  "arms_crossed": ("momo_v2_talk_closed.jpg", None), "back": ("momo_back.jpg", None)}
POSES["momo_nk"] = {  # Momo with the teal polka-dot NECKERCHIEF and a gold medal, painted by the teacher (27 Nov 2026,
  # characters/teacher_momo_neckerchief_2026-11-27/): on momo_v2's sitting set (same scale and feet line as momo_v2_*)
  "arms_crossed": ("momo_nk_arms_crossed.jpg", None), "thinking": ("momo_nk_thinking.jpg", None), "pointing": ("momo_nk_pointing.jpg", None),
  "cheer": ("momo_nk_cheer.jpg", None), "surprised": ("momo_nk_surprised.jpg", None)}
POSES["pip_run"] = {  # Pip's two-frame RUN cycle, painted by the teacher (27 Nov 2026, characters/teacher_run_2026-11-27/): side view facing right,
  # worried, helmet and goggles painted in; on Pip's sitting set (same scale and feet line as pip_sit)
  "run_a": ("pip_run_a.jpg", None), "run_b": ("pip_run_b.jpg", None)}
POSES["basil_v2"] = {  # Basil in Pip's style (Gemini, 23 Nov)
  "oops": ("basil_v2_oops.jpg", None), "waving": ("basil_v2_waving.jpg", None), "thinking": ("basil_v2_thinking.jpg", None),
  "worried": ("basil_v2_worried.jpg", None), "surprised": ("basil_v2_surprised.jpg", None), "pointing": ("basil_v2_pointing.jpg", None),
  "cheer": ("basil_v2_cheer.jpg", None), "arms_crossed": ("basil_v2_arms_crossed.jpg", None), "laughing": ("basil_v2_laugh_eyes_shut.jpg", None), "back": ("basil_back.jpg", None)}
SITREF = {"momo_nk": "momo_v2", "pip_run": "pip"}   # which sitting sprite sets the scale and foot line (default: the buddy's own; basil_c / momo_c: their coloured sets, *_c_sit.json, from align_set.py)
SEAL = {("pip", "cheer"): 4, ("pip", "waving"): 4}   # Pip's cheer: the outline has a small break, the flood would empty the white belly
HOLES = {("pip", "waving"): [(150, 590)], ("basil_c", "waving"): [(768, 342)], ("basil_v2", "cheer"): [(221, 473), (183, 303)]}   # paper showing through a closed gap (between tail and body): seed points in the output PNG
FLIPX = {("momo_nk", "cheer")}   # painted facing the other way (tail on her left, knot on the right): mirrored to match momo_v2_cheer and her other poses
SHADOW_T = 138
ADJ = {}      # (buddy, pose): extra scale, set by eye from qa/poses_<buddy>.png
DX = {}       # (buddy, pose): anchor nudge in source px
# (buddy, pose): the feet line in source px, when something else (a tail, seen from behind, lying towards the camera) hangs lower.
# Back views (teacher, 26 Nov 2026): the COLOURED back paintings (characters/teacher_backs_2026-11-26/, copied to poses_inbox/<who>_back.jpg),
# measured from the cut-outs: Pip's haunches end at 900 (tail to 956), Momo's at 912 (tail to 1000), Basil's feet at 784 (tail to 989).
# The old grey back paintings are kept as poses_inbox/<who>_back_grey.png and poses/<who>_back_grey.png (history).
FEET = {("pip", "back"): 900, ("momo", "back"): 912, ("basil", "back"): 784, ("momo_v2", "back"): 912, ("basil_v2", "back"): 784}
try: exec(open(f"{H}/poses_adj.py").read())
except FileNotFoundError: pass

def body_cx(alpha, y0, y1):
    """middle of the widest unbroken run of the silhouette, median over the belly rows (55%..80% of the height)"""
    cs = []
    for y in range(int(y0 + .55 * (y1 - y0)), int(y0 + .80 * (y1 - y0))):
        r = (alpha[y] > 128).astype(np.int8); d = np.diff(np.concatenate([[0], r, [0]])); a = np.where(d == 1)[0]; b = np.where(d == -1)[0]
        if len(a): i = np.argmax(b - a); cs.append((a[i] + b[i] - 1) / 2)
    return float(np.median(cs))

def bbox(alpha):
    ys, xs = np.where(alpha > 128); return xs.min(), ys.min(), xs.max(), ys.max()

if __name__ == "__main__":
    os.makedirs(f"{H}/poses", exist_ok=True); os.makedirs(f"{H}/qa", exist_ok=True); meta = {}
    ONLY = set(sys.argv[1:])            # e.g. "python poses.py back": only those poses, merged into the existing poses.json, no QA sheet rewrite
                                        # (+ env WHO=<set>: only that buddy's set, e.g. WHO=momo_nk python poses.py arms_crossed cheer ...)
    if ONLY:
        old = json.load(open(f"{H}/poses/poses.json"))
        POSES = {w: {p: v for p, v in ps.items() if p in ONLY} for w, ps in POSES.items()}
        if os.environ.get("WHO"): POSES = {w: (ps if w == os.environ["WHO"] else {}) for w, ps in POSES.items()}   # WHO=momo_nk: that set only
    for who, poses in POSES.items():
        ref = SITREF.get(who, who); sit = json.load(open(f"{H}/{ref}_sit.json")); sim = cv2.imread(f"{H}/{ref}_sit_closed.png", -1)
        sx0, sy0, sx1, sy1 = sit["states"]["closed"]["bbox"]; sit_h = sy1 - sy0; hips = sit["anchors"]["hips"]
        off = hips[0] - body_cx(sim[..., 3], sy0, sy1)                       # the sitting sprite's hips, relative to its body centre
        foot = sy1 - hips[1]                                                 # hips sit this far above the lowest pixel
        meta[who] = dict(old.get(who, {})) if ONLY else {}; tiles = []
        def tile(rgba, ax, ay, label):                                       # QA: every pose on the same canvas, anchors on one cross
            c = np.zeros((1000, 900, 4), np.uint8); M = np.float32([[1, 0, 450 - ax], [0, 1, 940 - ay]])
            w = cv2.warpAffine(rgba, M, (900, 1000)); o = on(w, (0x8C, 0x2A, 0x3B)).copy()
            cv2.line(o, (0, 940), (900, 940), (60, 220, 255), 1); cv2.line(o, (450, 0), (450, 1000), (60, 220, 255), 1)
            cv2.line(o, (0, 940 - sit_h), (900, 940 - sit_h), (60, 220, 255), 1); cv2.putText(o, label, (10, 30), 0, .9, (255, 255, 255), 2); return o
        tiles.append(tile(sim, hips[0], sy1, "sit"))
        for pose, (fn, crop) in poses.items():
            im = cv2.imread(f"{IN}/{fn}")
            if (who, pose) in FLIPX: im = cv2.flip(im, 1)
            if crop: x0, y0, x1, y1 = crop; im = cv2.copyMakeBorder(im[y0:y1, x0:x1], 12, 12, 12, 12, cv2.BORDER_CONSTANT, value=(255, 255, 255))
            k0 = 1.0
            if crop: im = cv2.resize(im, None, fx=2, fy=2, interpolation=cv2.INTER_LANCZOS4); k0 = 2.0
            cut = cutout(im, seal=SEAL.get((who, pose), 0)); x0, y0, x1, y1 = bbox(cut[..., 3])
            Tm = np.full(im.shape[:2], 175, np.float32); Tm[int(y1 - .09 * (y1 - y0)):] = SHADOW_T   # second pass: the shadow under the feet is darker than the paper
            cut = cutout(im, T=Tm, seal=SEAL.get((who, pose), 0)); x0, y0, x1, y1 = bbox(cut[..., 3])
            yf = FEET.get((who, pose), y1)                                   # feet line (normally the lowest pixel)
            s = sit_h / (yf - y0) * ADJ.get((who, pose), 1.0)
            ax = body_cx(cut[..., 3], y0, yf) + off / s + DX.get((who, pose), 0); ay = float(yf)
            # resample once to the sitting scale, tight canvas + margin
            m = 24; w, h = int((x1 - x0) * s) + 2 * m, int((y1 - y0) * s) + 2 * m
            M = np.float32([[s, 0, m - x0 * s], [0, s, m - y0 * s]])
            pm = cut.astype(np.float32); pm[..., :3] *= pm[..., 3:] / 255          # premultiplied resampling: no fringe
            out = cv2.warpAffine(pm, M, (w, h), flags=cv2.INTER_AREA if s < 1 else cv2.INTER_CUBIC)
            a = np.clip(out[..., 3:], 0, 255); out[..., :3] = np.where(a > 0, out[..., :3] / np.maximum(a, 1) * 255, 0); out = np.clip(out, 0, 255).astype(np.uint8)
            for seed in HOLES.get((who, pose), []):
                lightm = ((out[..., :3].min(2) > 205) & (out[..., 3] > 0)).astype(np.uint8); pad = np.pad(lightm, 1); cv2.floodFill(pad, None, (seed[0] + 1, seed[1] + 1), 2)
                hole = cv2.dilate((pad[1:-1, 1:-1] == 2).astype(np.uint8), np.ones((3, 3), np.uint8), iterations=2)
                soft = cv2.GaussianBlur(hole.astype(np.float32), (0, 0), 1.0); out[..., 3] = (out[..., 3] * (1 - np.clip(soft * 1.6, 0, 1))).astype(np.uint8)
            A = [round(float(m + (ax - x0) * s), 1), round(float(m + (ay - y0) * s), 1)]
            cv2.imwrite(f"{H}/poses/{who}_{pose}.png", out)
            meta[who][pose] = dict(file=f"poses/{who}_{pose}.png", src=fn, anchor=A, scale=round(float(s * k0), 4), size=[w, h])
            tiles.append(tile(out, A[0], A[1], f"{pose} x{s * k0:.2f}"))
            print(who, pose, "scale", round(s * k0, 3), "anchor", A, "size", w, h)
        meta[who]["_sit"] = dict(body_h=sit_h, hips_above_feet=foot)
        if ONLY:
            if len(tiles) > 1: cv2.imwrite(f"{H}/qa/poses_{who}_{'_'.join(sorted(ONLY))}.png", cv2.resize(np.hstack(tiles), None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA))
            continue
        while len(tiles) % 4: tiles.append(np.zeros_like(tiles[0]))
        sheet = np.vstack([np.hstack(tiles[i:i + 4]) for i in range(0, len(tiles), 4)])
        cv2.imwrite(f"{H}/qa/poses_{who}.png", cv2.resize(sheet, None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA))
    json.dump(meta, open(f"{H}/poses/poses.json", "w"), indent=1)
