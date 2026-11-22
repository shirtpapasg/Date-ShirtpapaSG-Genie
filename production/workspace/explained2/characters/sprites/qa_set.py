"""qa_set.py: QA for a talking/blink sprite set made by align_set.py (or any <name>_sit.json set).
  /home/user/heart-tts/venv/bin/python qa_set.py basil_c [--mp4]
Writes (all on the dark purple QA background used by the other qa/ sheets):
  qa/<name>_states.png  the six states, whole body (top) and the head at 2x (bottom)
  qa/<name>_seams.png   the head at 2x with each mouth patch edge (yellow = half, orange = wide) and the lid patches (cyan)
  qa/<name>_cycle.png   closed > half > wide > half > closed > blink, head at 1.5x, and under each step what changed from the
                        previous frame (white = changed pixel): only the face may light up, never the body, the outline or the tail
  qa/<name>_edges.png   the mouth patch edge at 4x on the dark and on white (look for a seam, a step in the outline, a white fringe)
  qa/<name>_poseswap.png  sit, then each pose from poses/poses.json placed on the SAME anchor (hips on the feet line), with the
                        sitting sprite's outline (yellow) over it: the feet line and the size must match, only the pose changes
  qa/<name>_headturn.png  talk_render.Sprite.pose(): wide mouth with the head turned +-5 deg and the tail swung -+8 deg (checks the
                        neck / tail anchors: no tear at the neck, the tail tip not dragged by the head), and the head (white) / tail (red) weights
  --mp4: also work/<name>/cycle.mp4 (silent, 30 fps, 6 s; not committed)"""
import cv2, numpy as np, json, os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H); from cutout import on
BG = (0x8C, 0x2A, 0x3B)
ORDER = ("closed", "half", "wide", "blink", "half_blink", "wide_blink")

def label(im, t, y=30, s=.9): cv2.putText(im, t, (10, y), 0, s, (255, 255, 255), 2); return im

def main(name, mp4=False):
    meta = json.load(open(f"{H}/{name}_sit.json")); im = {s: cv2.imread(f"{H}/{name}_sit_{s}.png", -1) for s in ORDER}
    x0, y0, x1, y1 = meta["states"]["closed"]["bbox"]; E = meta["eyes"]
    hx0 = max(0, min(e["c"][0] - e["r"][0] for e in E.values()) - 150); hx1 = min(1024, max(e["c"][0] + e["r"][0] for e in E.values()) + 110)
    hy0 = max(0, min(e["c"][1] - e["r"][1] for e in E.values()) - 90); hy1 = min(1024, meta["anchors"].get("neck", [0, 430])[1] + 40)
    head = lambda a, z=2: cv2.resize(on(a, BG)[hy0:hy1, hx0:hx1], None, fx=z, fy=z, interpolation=cv2.INTER_CUBIC)
    # states sheet
    full = [label(cv2.resize(on(im[s], BG)[y0 - 20:y1 + 20, x0 - 20:x1 + 20], None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA).copy(), s, 22, .6) for s in ORDER]
    top = np.hstack(full); heads = [label(head(im[s], 1).copy(), s) for s in ORDER]; bot = np.hstack(heads)
    bot = cv2.resize(bot, (top.shape[1], int(bot.shape[0] * top.shape[1] / bot.shape[1])), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f"{H}/qa/{name}_states.png", np.vstack([top, bot]))
    # seams
    wk = f"{H}/work/{name}"; o = on(im["closed"], BG).copy()
    if os.path.exists(f"{wk}/seams.npy"):
        seams = np.load(f"{wk}/seams.npy", allow_pickle=True).item()
        for s, col in (("half", (0, 255, 255)), ("wide", (0, 160, 255))): cv2.polylines(o, [np.int32(seams[s])], True, col, 1, cv2.LINE_AA)
        lid = np.load(f"{wk}/lids.npy"); cs, _ = cv2.findContours(lid.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); cv2.drawContours(o, cs, -1, (255, 255, 0), 1)
        cv2.imwrite(f"{H}/qa/{name}_seams.png", cv2.resize(o[hy0:hy1, hx0:hx1], None, fx=2, fy=2, interpolation=cv2.INTER_NEAREST))
        # edges at 4x: the seam's two ends where it crosses the outline matter most; show the whole patch box on dark and white
        ss = np.vstack([seams["half"], seams["wide"]]); bx0, by0 = ss.min(0).astype(int) - 12; bx1, by1 = ss.max(0).astype(int) + 12
        rows = []
        for s in ("half", "wide"):
            a = im[s]; wbg = (a[..., :3] * (a[..., 3:] / 255.) + 255 * (1 - a[..., 3:] / 255.)).astype(np.uint8)
            rows.append(np.hstack([label(cv2.resize(on(a, BG)[by0:by1, bx0:bx1], None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC).copy(), s + " on dark"),
                                   label(cv2.resize(wbg[by0:by1, bx0:bx1], None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC).copy(), s + " on white")]))
        cv2.imwrite(f"{H}/qa/{name}_edges.png", np.vstack(rows))
    # cycle + what changed
    seq = ["closed", "half", "wide", "half", "closed", "blink", "closed"]; tiles = []; prev = None
    for s in seq:
        t = label(head(im[s], 1.5).copy(), s)
        if prev is None: d = np.zeros_like(t)
        else:
            dd = (np.abs(im[s].astype(int) - im[prev].astype(int)).max(2) > 0).astype(np.uint8) * 255
            d = cv2.cvtColor(cv2.resize(dd[hy0:hy1, hx0:hx1], None, fx=1.5, fy=1.5, interpolation=cv2.INTER_NEAREST), cv2.COLOR_GRAY2BGR)
            ys, xs = np.where(dd); label(d, f"changed vs {prev}: y {ys.min()}-{ys.max()}" if len(ys) else "no change", 30, .6)
            cv2.putText(d, f"body below neck: {int(dd[meta['anchors'].get('neck', [0, 430])[1]:].astype(bool).sum())} px", (10, 60), 0, .6, (0, 255, 0), 2)
        tiles.append(np.vstack([t, d])); prev = s
    cv2.imwrite(f"{H}/qa/{name}_cycle.png", cv2.resize(np.hstack(tiles), None, fx=.6, fy=.6, interpolation=cv2.INTER_AREA))
    if mp4:
        fr = f"{wk}/frames"; os.makedirs(fr, exist_ok=True)
        seq = ["closed"] * 8 + ["half"] * 3 + ["wide"] * 4 + ["half"] * 3 + ["closed"] * 6 + ["half", "half", "wide", "wide", "wide", "half", "half", "closed", "closed"] * 4 \
              + ["closed"] * 10 + ["blink"] * 3 + ["closed"] * 20 + ["half", "half", "wide", "wide_blink", "wide_blink", "wide", "half"] * 3 + ["closed"] * 20
        for i, s in enumerate(seq):
            c = np.full((2200, 1920, 3), BG, np.uint8); a = im[s]; ox, oy = 960 - 512, 1040 - meta["anchors"]["ground_y"]
            al = a[..., 3:] / 255.; roi = c[oy:oy + 1024, ox:ox + 1024]; roi[:] = (a[..., :3] * al + roi * (1 - al)).astype(np.uint8); c = c[:1080].copy()
            cv2.putText(c, s, (40, 60), 0, 1.2, (255, 255, 255), 2); cv2.imwrite(f"{fr}/{i:04d}.png", c)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "30", "-i", f"{fr}/%04d.png", "-pix_fmt", "yuv420p", "-crf", "18", f"{wk}/cycle.mp4"], check=True)
        for f in os.listdir(fr): os.remove(f"{fr}/{f}")
        os.rmdir(fr); print("wrote", f"{wk}/cycle.mp4")

def head_turn(name):
    from talk_render import Sprite
    sp = Sprite(name); t = []
    for hd, tl in ((0, 0), (5, -8), (-5, 8)):
        p = sp.pose("wide", hd, tl); a = p[..., 3:]; rgb = np.where(a > 1e-4, p[..., :3] / np.maximum(a, 1e-4), 0)
        t.append(label(on((np.clip(np.dstack([rgb, a]), 0, 1) * 255).astype(np.uint8), BG).copy(), f"head {hd:+d} tail {tl:+d}"))
    w = np.dstack([sp.wh * 255] * 3).astype(np.uint8)
    if sp.wt is not None: w[..., 2] = np.maximum(w[..., 2], (sp.wt * 255).astype(np.uint8))
    t.append(label(w, "head / tail weight"))
    cv2.imwrite(f"{H}/qa/{name}_headturn.png", cv2.resize(np.hstack(t), None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA))

def pose_swap(name):
    pj = f"{H}/poses/poses.json"
    if not os.path.exists(pj) or name not in json.load(open(pj)): return
    P = json.load(open(pj))[name]; meta = json.load(open(f"{H}/{name}_sit.json")); hx, hy = meta["anchors"]["hips"]
    def place(a, ax, ay):                                             # anchor -> (450, 900) on a 900 x 960 tile
        return cv2.warpAffine(a, np.float32([[1, 0, 450 - ax], [0, 1, 900 - ay]]), (900, 960))
    sit = place(cv2.imread(f"{H}/{name}_sit_closed.png", -1), hx, hy)
    cs, _ = cv2.findContours((sit[..., 3] > 128).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    def tile(a, t):
        o = on(a, BG).copy(); cv2.drawContours(o, cs, -1, (0, 255, 255), 2); cv2.line(o, (0, 900), (900, 900), (60, 220, 255), 1)
        cv2.line(o, (0, 900 - meta["anchors"]["ground_y"] + meta["states"]["closed"]["bbox"][1]), (900, 900 - meta["anchors"]["ground_y"] + meta["states"]["closed"]["bbox"][1]), (60, 220, 255), 1)
        return label(o, t)
    tiles = [tile(sit, "sit (closed)")]
    for pose, v in P.items():
        if pose.startswith("_"): continue
        tiles.append(tile(place(cv2.imread(f"{H}/{v['file']}", -1), *v["anchor"]), pose))
    while len(tiles) % 4: tiles.append(np.zeros_like(tiles[0]))
    sheet = np.vstack([np.hstack(tiles[i:i + 4]) for i in range(0, len(tiles), 4)])
    cv2.imwrite(f"{H}/qa/{name}_poseswap.png", cv2.resize(sheet, None, fx=.5, fy=.5, interpolation=cv2.INTER_AREA))

if __name__ == "__main__":
    for n in [a for a in sys.argv[1:] if not a.startswith("--")]:
        main(n, "--mp4" in sys.argv); pose_swap(n)
        if "neck" in json.load(open(f"{H}/{n}_sit.json"))["anchors"]: head_turn(n)   # only sets with talk_render anchors (not momo_c)
