"""pose_test.py: the pose-switching test, "Round one. The wind-up robot!" -> pose_test_robot_round.mp4 (1920x1080, 30 fps).
  PY=/home/user/heart-tts/venv/bin/python
  $PY poses.py; node pose_test_ui.js            (once: the pose cut-outs and the drawn UI pieces)
  $PY pose_test.py                              render (4 workers, in-progress files in work/)
  $PY pose_test.py --frames 95 96 97            stills -> qa/pt_f0095.png ...
  $PY pose_test.py --sheet NAME 3.0 3.5 [x0 y0 x1 y1]   every frame in a time range, cropped, on one sheet -> qa/pt_NAME.png
  $PY pose_test.py --audio                      only the sound mix -> work/pose_test_mix.wav
Built on talk_render.py (Sprite, stage, finish, draw_actor) and talk_voice.py's voice tracks. Every frame is a pure function of t.

Pose swaps: 3 frames of squash on the old picture (anticipation), a hard cut to the new picture stretched tall, an overshoot that
settles in about 0.3 s, a tiny hop, a ring of sparkles and two dust puffs. Two pictures are never mixed (no cross-fade).
Talking: the sitting sprites lip-sync with their painted mouths (talk_render). A pose with one face talks with a small drawn
mouth that opens under its painted smile (MOUTHS) plus a bounce on the stressed syllables."""
import cv2, numpy as np, json, os, sys, subprocess, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import talk_render as TR
from talk_render import Sprite, stage, finish, draw_actor, ss, hexc, P, pulse, env, W, HH, FPS
DUR = 22.4; N = int(round(DUR * FPS)); UI = f"{H}/work/ui"

# ------------------------------------------------------------------ the timeline (seconds)
T_VO = .5                                   # Heart: "Round one. The wind-up robot!"
T_ROBOT, T_SLOW, T_DECEL, T_STOP = 2.6, 4.9, 15.95, 16.75
T_RING, T_BELL, T_STAMP_OUT = 5.2, 8.2, 8.9
L_BASIL1, L_PIP1, L_MOMO1, L_BASIL2 = 9.15, 11.2, 14.1, 17.3
T_SURPRISED, T_OOPS = 16.8, 17.3 + .58      # "Aww." is said in the surprised pose (its mouth is open); the swap sits in the pause after it
T_TAG, T_SCORE, T_CHEER = 19.5, 19.95, 20.1
ROBOT_X0, ROBOT_X1, ROBOT_Y = -150.0, 1215.0, 1016.0
ACTORS = [
  dict(char="pip", x=400, y=862, h=380, shadow_rx=.30, disc_dx=-.06, phase=.9, nod_deg=1.2,
       poses=[(0, "cheer"), (2.95, "thinking"), (11.08, "sit"), (14.22, "arms_crossed"), (T_CHEER, "cheer")],
       lines=[("pip1", L_PIP1)], blinks=[13.0],
       gestures=[dict(kind="pop", t=.2, dur=.55), dict(kind="hop", t=.55, dur=2.3, amp=16, f=2.4), dict(kind="watch", t=3.2, dur=7.6),
                 dict(kind="shake", t=L_PIP1, dur=.84, deg=2.0, period=.42), dict(kind="hop", t=T_CHEER + .12, dur=2.3, amp=26, f=2.6)]),
  dict(char="basil", x=930, y=862, h=372, shadow_rx=.36, shadow_dx=-.02, disc_dx=-.10,
       poses=[(0, "cheer"), (3.07, "sit"), (8.95, "arms_crossed"), (T_SURPRISED, "surprised"), (T_OOPS, "oops"), (T_CHEER + .1, "cheer")],
       lines=[("basil1", L_BASIL1), ("basil2", L_BASIL2)], blinks=[4.3, 6.9],
       gestures=[dict(kind="pop", t=.5, dur=.55), dict(kind="rock", t=1.0, dur=1.9, deg=4.2, f=1.9), dict(kind="watch", t=3.3, dur=5.4),
                 dict(kind="lean", t=9.0, dur=2.3, deg=-2.2), dict(kind="jump", t=T_SURPRISED, amp=34),
                 dict(kind="lean", t=T_OOPS, dur=2.0, deg=-3.0), dict(kind="hop", t=T_CHEER + .22, dur=2.2, amp=24, f=2.6)]),
  dict(char="momo", x=1500, y=862, h=380, shadow_rx=.30, disc_dx=.08, phase=1.9, nod_deg=1.2, flip=True,
       poses=[(0, "waving"), (3.19, "thinking"), (T_CHEER + .2, "cheer")],
       lines=[("momo1", L_MOMO1)],
       gestures=[dict(kind="pop", t=.8, dur=.55), dict(kind="rock", t=1.25, dur=1.75, deg=5.0, f=2.2), dict(kind="watch", t=3.4, dur=10.5),
                 dict(kind="lean", t=L_MOMO1 + 1.0, dur=1.4, deg=3.2), dict(kind="hop", t=T_CHEER + .32, dur=2.1, amp=26, f=2.6)]),
]
BUBBLES = [("b_basil1", 930, 345, L_BASIL1 - .1, L_BASIL1 + 1.95), ("b_pip1", 452, 345, L_PIP1 - .1, L_PIP1 + 2.8),
           ("b_momo1", 1450, 345, L_MOMO1 - .1, L_MOMO1 + 2.4), ("b_basil2", 930, 345, L_BASIL2 - .1, L_BASIL2 + 2.1)]

# ------------------------------------------------------------------ pose sprites
# a drawn mouth for poses with one painted face. line: points along the painted mouth line (sprite px); span: the part that opens
# (x from, x to); n: which way "down" is for this head; depth: opening in px for half / wide.
INK_M, DARK_M, TONGUE_M = (98, 68, 75), (84, 52, 82), (160, 146, 226)       # BGR: line, inside of the mouth, tongue
MOUTHS = {
  ("basil", "arms_crossed"): dict(line=[(442, 246), (480, 252), (520, 250), (560, 238), (600, 222), (640, 206), (680, 195), (715, 186), (735, 172)],
                                  span=(476, 708), n=(.26, .97), depth=(15, 30), lw=5.5),
  ("basil", "oops"): dict(line=[(465, 245), (500, 250), (550, 248), (600, 232), (650, 210), (700, 202), (740, 215), (765, 202)],
                          span=(500, 728), n=(.2, .98), depth=(15, 30), lw=5.5),
  ("momo", "thinking"): dict(ellipse=(489, 343), rx=15, ang=-18, depth=(7, 13), lw=4.5),
}

def premult(path):
    a = cv2.imread(path, -1).astype(np.float32) / 255; a[..., :3] *= a[..., 3:]; return a

def draw_mouth(im, m, level):
    """im: premultiplied float sprite; returns a copy with the mouth open at level 1 (half) or 2 (wide). Drawn 4x and shrunk (smooth edges)."""
    K = 4; h, w = im.shape[:2]; D = m["depth"][level - 1]
    if "line" in m:
        px = np.array(m["line"], np.float32); x0, x1 = m["span"]; xs = np.linspace(x0, x1, 40); ys = np.interp(xs, px[:, 0], px[:, 1])
        ys = cv2.GaussianBlur(ys.reshape(-1, 1).astype(np.float32), (1, 0), 2, borderType=cv2.BORDER_REPLICATE).ravel() if False else ys
        u = (xs - x0) / (x1 - x0); prof = np.sin(np.pi * u) ** .7; n = np.float32(m["n"]); top = np.stack([xs, ys], 1)
        low = top + n * (D * prof)[:, None]; mid = top + n * (D * prof * .52)[:, None]
        poly = np.vstack([top, low[::-1]]); tongue = np.vstack([mid[6:-6] + n * 0, low[6:-6][::-1] - n * 2.0])
        bx0, by0, bx1, by1 = int(poly[:, 0].min() - 12), int(poly[:, 1].min() - 12), int(poly[:, 0].max() + 12), int(poly[:, 1].max() + 12)
    else:
        cx, cy = m["ellipse"]; bx0, by0, bx1, by1 = cx - 40, cy - 40, cx + 40, cy + 40
    cv_ = np.zeros(((by1 - by0) * K, (bx1 - bx0) * K, 4), np.uint8); sh = lambda p: ((np.asarray(p, np.float32) - (bx0, by0)) * K).round().astype(np.int32)
    if "line" in m:
        cv2.fillPoly(cv_, [sh(poly)], DARK_M + (255,), cv2.LINE_AA); cv2.fillPoly(cv_, [sh(tongue)], TONGUE_M + (255,), cv2.LINE_AA)
        cv2.polylines(cv_, [sh(low)], False, INK_M + (255,), int(m["lw"] * K), cv2.LINE_AA); cv2.polylines(cv_, [sh(top)], False, INK_M + (255,), int(m["lw"] * K), cv2.LINE_AA)
    else:
        c = tuple(sh((cx, cy + D * .55))); ax = (int(m["rx"] * K * (.8 + .1 * level)), int(D * K))
        cv2.ellipse(cv_, c, ax, m["ang"], 0, 360, DARK_M + (255,), -1, cv2.LINE_AA)
        t = np.zeros_like(cv_); cv2.ellipse(t, (c[0], c[1] + int(D * K * .75)), (int(ax[0] * .8), int(D * K * .7)), m["ang"], 0, 360, TONGUE_M + (255,), -1, cv2.LINE_AA)
        msk = cv_[..., 3:] > 0; cv_ = np.where((t[..., 3:] > 0) & msk, t, cv_)
        cv2.ellipse(cv_, c, ax, m["ang"], 0, 360, INK_M + (255,), int(m["lw"] * K), cv2.LINE_AA)
    o = cv2.resize(cv_, (bx1 - bx0, by1 - by0), interpolation=cv2.INTER_AREA).astype(np.float32) / 255; o[..., :3] *= o[..., 3:]
    out = im.copy(); roi = out[by0:by1, bx0:bx1]; a = o[..., 3:] * (roi[..., 3:] > .5)      # only on the buddy, never outside the silhouette
    roi[..., :3] = roi[..., :3] * (1 - a) + o[..., :3] * (roi[..., 3:] > .5); return out

class PoseSprite:
    """one of the teacher's extra poses, on the sitting sprite's scale; the same interface as talk_render.Sprite for draw_actor()"""
    def __init__(self, who, pose, sit, meta):
        m = meta[who][pose]; im = premult(f"{H}/{m['file']}"); self.im = {0: im}; self.talks = (who, pose) in MOUTHS
        if self.talks: self.im[1] = draw_mouth(im, MOUTHS[(who, pose)], 1); self.im[2] = draw_mouth(im, MOUTHS[(who, pose)], 2)
        self.hips = np.float32([m["anchor"][0], m["anchor"][1] - meta[who]["_sit"]["hips_above_feet"]]); self.body_h = sit.body_h
    def pose(self, state, head, tail): return self.im[state]

# ------------------------------------------------------------------ small pieces
def blit(img, spr, cx, cy, s=1.0, rot=0.0, sx=1.0, sy=1.0, alpha=1.0, anchor=None):
    """put a premultiplied RGBA piece on the frame: its anchor (default: its centre) at (cx, cy), scaled and turned"""
    if s * sx <= .01 or s * sy <= .01 or alpha <= .003: return
    h, w = spr.shape[:2]; ax, ay = anchor if anchor else (w / 2, h / 2); th = np.radians(rot); c, sn = np.cos(th), np.sin(th)
    A = np.array([[c, -sn], [sn, c]]) @ np.diag([s * sx, s * sy]); tr = np.array([cx, cy]) - A @ np.array([ax, ay])
    cs = (A @ np.array([[0, w, w, 0], [0, 0, h, h]], np.float64)).T + tr
    x0, y0 = np.floor(cs.min(0)).astype(int) - 1; x1, y1 = np.ceil(cs.max(0)).astype(int) + 2
    x0, y0, x1, y1 = max(x0, 0), max(y0, 0), min(x1, W), min(y1, HH)
    if x1 <= x0 or y1 <= y0: return
    M = np.float32(np.hstack([A, (tr - (x0, y0))[:, None]]))
    o = cv2.warpAffine(spr, M, (x1 - x0, y1 - y0), flags=cv2.INTER_AREA if s * min(sx, sy) < .7 else cv2.INTER_LINEAR) * alpha
    img[y0:y1, x0:x1] = img[y0:y1, x0:x1] * (1 - o[..., 3:]) + o[..., :3]

def blob(img, cx, cy, rx, ry, col, o):
    """a soft round puff (dust, shadow)"""
    if o <= .003: return
    x0, x1, y0, y1 = max(int(cx - rx * 2), 0), min(int(cx + rx * 2) + 1, W), max(int(cy - ry * 2), 0), min(int(cy + ry * 2) + 1, HH)
    if x1 <= x0 or y1 <= y0: return
    yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32); a = (np.exp(-(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) * 1.6) * o)[..., None]
    img[y0:y1, x0:x1] = img[y0:y1, x0:x1] * (1 - a) + col * a

def popk(u, dur=.3):
    """0 -> 1 with one overshoot: for things that pop in"""
    u = u / dur
    return 0.0 if u <= 0 else float(1 - np.exp(-6.5 * u) * np.cos(7.5 * u))
def shown(t, t0, t1, out=.12):
    """pop in at t0, shrink away quickly at t1"""
    return popk(t - t0) * float(1 - ss(t1, t1 + out, t))

# ------------------------------------------------------------------ the robot (a pure function of t)
V1 = 215.0; _d_fast = V1 * (T_SLOW - T_ROBOT)
V2 = (ROBOT_X1 - ROBOT_X0 - _d_fast - V1 * .3) / (.3 + (T_DECEL - T_SLOW - .6) + (T_STOP - T_DECEL) / 2)
STEP = (ROBOT_X1 - ROBOT_X0) / 26.5                                         # it stops in mid-step
def robot_d(t):
    """distance marched: fast, easing down to a slow march (the spring running down), then slowing to a stop"""
    if t <= T_ROBOT: return 0.0
    d = V1 * (min(t, T_SLOW) - T_ROBOT)
    if t > T_SLOW: u = min(t, T_SLOW + .6) - T_SLOW; d += V1 * u + (V2 - V1) * u * u / 1.2
    if t > T_SLOW + .6: d += V2 * (min(t, T_DECEL) - T_SLOW - .6)
    if t > T_DECEL: u = min(t, T_STOP) - T_DECEL; d += V2 * u - V2 * u * u / (2 * (T_STOP - T_DECEL))
    return d
def tick_times():
    ts = np.arange(0, DUR, 1 / 960); ph = np.array([robot_d(t) for t in ts]) / STEP
    return [float(ts[i]) for i in range(1, len(ts)) if int(ph[i]) != int(ph[i - 1])]

# ------------------------------------------------------------------ actors
def pose_at(a, t):
    i = max(j for j, (ts, _) in enumerate(a["poses"]) if t >= ts); return i, a["poses"][i][1]

def actor_state(a, t, voices, sprites):
    i, pose = pose_at(a, t); sp = sprites[(a["char"], pose)]; sit = pose == "sit"
    mouth, nod = 0, 0.0
    for vid, t0 in a.get("lines", []):
        v = voices[vid]; j = int(np.floor((t - t0) * FPS + 1e-6))
        if 0 <= j < len(v["mouth"]): mouth = v["mouth"][j]
        for ts in v["stress"]: nod += pulse(t, t0 + ts)
    nod = min(nod, 1.2)
    if sit:
        blink = any(0 <= t - tb < 3 / FPS - 1e-6 for tb in a.get("blinks", []))
        state = TR.MOUTH[mouth] + ("_blink" if blink else ""); state = "blink" if state == "closed_blink" else state
    else: state = mouth if sp.talks else 0
    ph = a.get("phase", 0); br = np.sin(2 * np.pi * (t + ph) / 3.0)
    sy = 1 + .012 * br; sx = 1 - .004 * br; rot = .45 * np.sin(2 * np.pi * (t + ph) / 4.6); lift = 0.0; k = 1.0
    head = .45 * np.sin(2 * np.pi * (t + ph) / 3.7 + 1.0); tail = 1.3 * np.sin(2 * np.pi * (t + ph) / 2.6) + .5 * np.sin(2 * np.pi * (t + ph) / 1.1)
    q = (.014 if sit else .022) * nod; head += a.get("nod_deg", 1.5) * nod
    if not sit: lift -= 5 * nod                                              # a pose with one face: the whole buddy bounces on the stressed syllables
    # pose swaps: squash before, stretch and overshoot after (the picture itself changes in one frame)
    for j, (ts, _) in enumerate(a["poses"]):
        if j == 0: continue
        if t < ts: an = float(ss(ts - 3 / FPS - 1e-6, ts, t)); sy *= 1 - .10 * an; sx *= 1 + .08 * an
        else:
            u = t - ts; w = float(np.exp(-u * 9) * np.cos(u * 23)); sy *= 1 + .13 * w; sx *= 1 - .09 * w
            lift -= 15 * float(np.sin(np.pi * np.clip(u / .22, 0, 1)))
    fl = -1 if a.get("flip") else 1
    for g in a.get("gestures", []):
        kind, t0 = g["kind"], g["t"]
        if kind == "pop":
            u = (t - t0) / g.get("dur", .55)
            if u <= 0: k = 0.0
            else:
                k = float(1 - np.exp(-7.5 * u) * np.cos(8.0 * u)); wob = float(np.exp(-4.0 * u) * np.cos(10.0 * u + .5))
                sy *= 1 + .10 * wob; sx *= 1 - .08 * wob; tail += 5 * wob
        elif kind == "rock":                                                # a wave with the whole body: side to side, with a little dip at each end
            e = env(t, t0, g["dur"], .2, .3); s = float(np.sin(2 * np.pi * g["f"] * (t - t0))); rot += g["deg"] * s * e; q += .02 * abs(s) * e
        elif kind == "hop":                                                 # cheering: little hops, squash on each landing
            e = env(t, t0, g["dur"], .12, .35); s = abs(float(np.sin(np.pi * g["f"] * (t - t0)))); lift -= g["amp"] * s * e
            q += (.05 * (1 - s) ** 3 - .03 * s) * e; rot += 1.6 * float(np.sin(np.pi * g["f"] * (t - t0))) * e
        elif kind == "watch":                                               # eyes on the robot: lean (and, sitting, turn the head) towards it
            e = env(t, t0, g["dur"], .4, .5); dx = float(np.clip((ROBOT_X0 + robot_d(t) - a["x"]) / 800, -1, 1)) * fl
            rot += 2.2 * dx * e * fl; head += 3.0 * dx * e
        elif kind == "lean": e = env(t, t0, g["dur"], .22, .35); rot += g["deg"] * e
        elif kind == "jump":
            u = t - t0
            if 0 <= u < .34: lift -= g["amp"] * float(np.sin(np.pi * u / .34))
        elif kind == "shake":
            u = t - t0
            if 0 <= u <= g["dur"]: head += g.get("deg", 2.0) * float(np.sin(2 * np.pi * u / g.get("period", .42)) * np.sin(np.pi * u / g["dur"]) ** .6)
    sy *= 1 - q; sx *= 1 + .8 * q; tail += 2.5 * nod
    return sp, dict(state=state, head=head, tail=tail, sx=sx * k, sy=sy * k, rot=rot, lift=lift, k=k, q=max(q, 0))

# ------------------------------------------------------------------ the film
class Film:
    def __init__(self):
        meta = json.load(open(f"{H}/poses/poses.json")); self.sp = {}; self.voices = {}
        for a in ACTORS:
            sit = Sprite(a["char"]); self.sp[(a["char"], "sit")] = sit
            for _, p in a["poses"]:
                if p != "sit" and (a["char"], p) not in self.sp: self.sp[(a["char"], p)] = PoseSprite(a["char"], p, sit, meta)
            for vid, _ in a.get("lines", []): self.voices[vid] = json.load(open(f"{H}/voice/{vid}.json"))
        bg = stage(ACTORS); rng = np.random.default_rng(9)                   # the lock-in stage + a few stars + the spotlight shaft
        for _ in range(46):
            x, y, r, o = rng.uniform(0, W), rng.uniform(0, 640), rng.uniform(1.5, 4), rng.uniform(.12, .4); blob(bg, x, y, r, r, np.float32([1, 1, 1]), o)
        yy, xx = np.mgrid[0:HH, 0:W].astype(np.float32); half = 110 + (yy / 860) * 520
        shaft = np.clip(1 - np.abs(xx - 960) / half, 0, 1) ** 1.5 * (1 - ss(700, 900, yy)) * .10
        self.bg = np.clip(bg + shaft[..., None] * hexc(P["rim"]), 0, 1)
        self.ui = {n: premult(f"{UI}/{n}.png") for n in json.load(open(f"{UI}/ui.json"))}
        self.swaps = [(a, ts) for a in ACTORS for j, (ts, _) in enumerate(a["poses"]) if j > 0]

    def fx(self, img, t):
        """sparkles and dust at each pose swap; a sparkle burst while they cheer"""
        star = self.ui["star"]
        for a, ts in self.swaps:
            u = t - ts
            if not 0 <= u < .40: continue
            e = 1 - (1 - u / .40) ** 2; cx, cy = a["x"], a["y"] - a["h"] * .52
            for i in range(6):
                ang = np.radians(-90 + (i - 2.5) * 44 + 8 * (hash(a["char"]) % 3)); r = a["h"] * (.50 + .22 * e)
                blit(img, star, cx + np.cos(ang) * r * 1.05, cy + np.sin(ang) * r * .92, s=(.55 if i % 2 else .8) * float(np.sin(np.pi * min(u / .40, 1)) ** .6), rot=40 * u)
            for sgn in (-1, 1):
                blob(img, a["x"] + sgn * a["h"] * (.30 + .22 * e), a["y"] + 4 - 10 * e, 26 + 30 * e, 12 + 12 * e, hexc(P["lilac"]), .42 * (1 - e))
        u = t - T_CHEER
        if u > 0:
            for i in range(26):
                r = np.random.default_rng(100 + i); x0 = r.uniform(140, 1780); t0 = r.uniform(0, 1.5); life = r.uniform(.5, .9); v = (u - t0) / life
                if 0 < v < 1: blit(img, star, x0 + 20 * np.sin(6 * v + i), r.uniform(170, 500) + 60 * v, s=r.uniform(.45, 1.0) * float(np.sin(np.pi * v)), rot=90 * v + 20 * i)

    def robot(self, img, t):
        d = robot_d(t)
        if d <= 0: return
        x = ROBOT_X0 + d; ph = d / STEP; s = abs(np.sin(np.pi * ph)); spr = self.ui[f"robot_{int(round(4 * s))}_{int(d / 34) % 4}"]
        blob(img, x, ROBOT_Y + 2, 84, 13, hexc(P["ink"]), .42)
        blit(img, spr, x, ROBOT_Y - 5 * s, rot=2.6 * np.sin(np.pi * ph), anchor=(150, 296))

    def frame(self, t):
        img = self.bg.copy(); U = self.ui
        # the ring timer sits behind the buddies' heads line, above them
        k = shown(t, T_RING - .3, T_STAMP_OUT)
        if k > 0:
            i = int(np.clip(np.floor((t - T_RING) * FPS + 1e-6), 0, 90)); snap = 1 + .10 * pulse(t, T_BELL, .03, .25)
            blit(img, U[f"ring_{i:02d}"], 960, 322, s=k * snap)
        for a in (ACTORS[0], ACTORS[2], ACTORS[1]):
            sp, st = actor_state(a, t, self.voices, self.sp); img = draw_actor(img, sp, a, st)
        self.robot(img, t); self.fx(img, t)
        # UI
        blit(img, U["logo"], 204, 66)
        blit(img, U["round"], 960, 62, s=popk(t - T_VO))
        qa = float(ss(T_VO + 1.15, T_VO + 1.5, t)); qo = float(1 - ss(T_BELL + .5, T_BELL + .8, t))
        blit(img, U["question"], 960, 136 + 14 * (1 - qa), alpha=qa * qo)
        k = shown(t, T_BELL, T_STAMP_OUT)
        if k > 0: blit(img, U["stamp"], 960, 318, s=.74 * k * (1 + .5 * float(np.exp(-(t - T_BELL) * 16))))
        for n, x, y, t0, t1 in BUBBLES:
            k = shown(t, t0, t1)
            if k > 0: h, w = U[n].shape[:2]; blit(img, U[n], x, y + 112, s=k, anchor=(w / 2, h / 2 + 112))      # grows out of its tail
        if t >= T_TAG:                                                       # the tag drops onto the robot, squashes and settles
            u = t - T_TAG; fall = min(u / .2, 1.0) ** 2; y = -120 + (716 + 120) * fall; w = float(np.exp(-(u - .2) * 9) * np.cos((u - .2) * 24)) if u > .2 else 0.0
            blit(img, U["tag"], ROBOT_X1, y + 74, s=.86, sx=1 + .16 * w, sy=1 - .2 * w, anchor=(230, 95 + 74))
        sb = "sb11" if t >= T_SCORE else "sb00"; bump = 1 + .12 * float(np.sin(np.pi * np.clip((t - T_SCORE) / (8 / FPS), 0, 1)))
        blit(img, U[sb], 1690, 70, s=bump)
        for dx in (-96, 96):
            u = t - T_SCORE
            if 0 <= u < .8: blit(img, U["plus1"], 1690 + dx, 150 - 34 * popk(u, .3) + 0, s=.8 * popk(u, .25) * float(1 - ss(.62, .8, u)))
        return (finish(img) * 255 + .5).astype(np.uint8)

# ------------------------------------------------------------------ sound (all synthesised here; seeded, the same on every run)
SR = 48000
def _env(n, a=.004, d=.2): t = np.arange(n) / SR; return np.minimum(t / a, 1) * np.exp(-t / d)
def tone(f, dur, d=.2, a=.004, harm=((1, 1.0),)):
    n = int(dur * SR); t = np.arange(n) / SR; f = np.broadcast_to(np.asarray(f, np.float64), (n,)) if np.ndim(f) else np.full(n, float(f))
    ph = 2 * np.pi * np.cumsum(f) / SR; return sum(g * np.sin(h * ph) for h, g in harm) * _env(n, a, d)
def noise(dur, d, seed, lo=None, hi=None):
    n = int(dur * SR); x = np.random.default_rng(seed).normal(0, 1, n); X = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    if lo: X[fr < lo] = 0
    if hi: X[fr > hi] = 0
    return np.fft.irfft(X, n) * _env(n, .002, d)
def s_pop(p=1.0): return tone(np.linspace(380 * p, 980 * p, int(.11 * SR)), .11, .05) * .5
def s_swap(p=1.0): return np.concatenate([tone(np.linspace(520 * p, 300 * p, int(.07 * SR)), .07, .2, .01) * .22, tone(np.linspace(420 * p, 1150 * p, int(.13 * SR)), .13, .06) * .5])
def s_tick(i): return (tone(2300 if i % 2 else 1750, .05, .012) * .5 + noise(.04, .008, 5 + i % 2, 2500, 9000) * .5) * .6
def s_wood(p=1.0): return tone(820 * p, .09, .025, .001, ((1, 1), (2.7, .35))) * .5
def s_bell(): return sum(tone(1318.5 * h, 1.6, d, .002) * g for h, g, d in ((1, 1, .55), (2.0, .5, .4), (2.76, .35, .3), (5.4, .2, .16), (8.9, .1, .08))) * .34
def s_thud(): return tone(np.linspace(170, 70, int(.22 * SR)), .22, .07, .002) * .8 + noise(.12, .03, 3, 200, 3000) * .25
def s_coin(): return np.concatenate([tone(1318.5, .07, .05, .002, ((1, 1), (2, .3), (3, .15))), tone(1975.5, .4, .14, .002, ((1, 1), (2, .3), (3, .15)))]) * .3
def s_gasp(): return tone(np.linspace(300, 900, int(.16 * SR)), .16, .1, .02, ((1, 1), (2, .25))) * .3
def mar(f, dur=.3, d=.11): return tone(f, dur, d, .003, ((1, 1), (4, .22), (2, .12)))
NOTE = lambda n: 440 * 2 ** ((n - 69) / 12)
def bed():
    """a light bouncy bed: marimba plucks on the off-beats over a round bass, 112 bpm, C major (I vi IV V), with a soft shaker"""
    x = np.zeros(int((DUR + 2) * SR)); b = 60 / 112; chords = [(48, (64, 67, 72)), (45, (64, 69, 72)), (41, (65, 69, 72)), (43, (62, 67, 71))]; i = 0; t = .12
    def add(y, t, g=1.0):
        k = int(t * SR)
        if k < len(x): y = y[:len(x) - k]; x[k:k + len(y)] += y * g
    mel = [76, 79, 84, 79, 76, 72, 74, 79]
    while t < DUR + .5:
        root, ch = chords[(i // 4) % 4]; beat = i % 4
        add(tone(NOTE(root if beat != 2 else root + 7), .34, .16, .006, ((1, 1), (2, .3))), t, .50)
        add(sum(mar(NOTE(n), .26, .08) for n in ch), t + b / 2, .15)
        if beat in (0, 3): add(mar(NOTE(mel[(i // 2 + i // 8) % 8]), .4, .14), t + (b / 2 if beat == 3 else 0), .20)
        for h in (0, .5): add(noise(.05, .012, 40 + i % 3, 5000, 11000), t + h * b, .05 if h else .03)
        t += b; i += 1
    return x[:int(DUR * SR)]

def audio():
    n = int(DUR * SR); vo = np.zeros(n + SR); fxb = np.zeros(n + SR)
    def put(buf, y, t, g=1.0):
        k = int(t * SR)
        if 0 <= k < len(buf): y = y[:len(buf) - k]; buf[k:k + len(y)] += y * g
    def voice(f, t, g=1.0):
        y, sr = sf.read(f)
        if sr != SR: m = int(len(y) * SR / sr); y = np.interp(np.arange(m) * sr / SR, np.arange(len(y)), y)
        put(vo, y, t, g)
    voice(f"{H}/voice/heart_r1.wav", T_VO, 10 ** (3.8 / 20))
    for a in ACTORS:
        for vid, t0 in a["lines"]: voice(f"{H}/voice/{vid}.wav", t0)
        for g in a["gestures"]:
            if g["kind"] == "pop": put(fxb, s_pop({"pip": 1.25, "basil": .85, "momo": 1.1}[a["char"]]), g["t"], .9)
        for j, (ts, p) in enumerate(a["poses"]):
            if j: put(fxb, s_swap({"pip": 1.2, "basil": .85, "momo": 1.08}[a["char"]]), ts - .07, .55 if ts < T_CHEER else .7)
    for i, t in enumerate(tick_times()): put(fxb, s_tick(i), t, .55)
    for i in range(3): put(fxb, s_wood(1 + .12 * i), T_RING + i, .8)
    put(fxb, s_pop(.8), T_RING - .3, .6); put(fxb, s_bell(), T_BELL); put(fxb, s_thud(), T_BELL + .02, .7)
    put(fxb, s_gasp(), T_SURPRISED, .8)
    for _, _, _, t0, _ in BUBBLES: put(fxb, s_pop(1.5), t0, .35)
    put(fxb, s_thud(), T_TAG + .2, .8); put(fxb, mar(NOTE(79), .5, .2), T_TAG + .22, .4); put(fxb, s_coin(), T_SCORE, .9)
    for i, nt in enumerate((72, 76, 79, 84, 88)): put(fxb, mar(NOTE(nt), .6, .22), T_CHEER + .1 + .09 * i, .34)
    for i in range(10): put(fxb, tone(NOTE(96 + (i * 7) % 12), .25, .07) * .12, T_CHEER + .3 + i * .17)
    # the bed: down to a whisper during the ring (only the woodblock and the robot), ducked under every voice
    t = np.arange(n) / SR; e = np.abs(vo[:n]); w = int(.12 * SR); e = np.convolve(e, np.ones(w) / w, "same"); e = np.convolve(np.clip(e / .03, 0, 1), np.ones(w) / w, "same")
    g = (1 - .62 * e) * (1 - .75 * ss(T_RING - .4, T_RING, t) * (1 - ss(T_BELL + .7, T_BELL + 1.1, t))) * ss(0, .3, t) * (1 - ss(DUR - .7, DUR - .05, t))
    g *= 1 + .45 * ss(T_CHEER, T_CHEER + .3, t)
    mix = vo[:n] + fxb[:n] * .5 * (1 - .3 * e) + bed() * g * .23
    return np.clip(np.tanh(mix * 1.15) / np.tanh(1.15) * .95, -1, 1).astype(np.float32)

# ------------------------------------------------------------------ main
def enc(path, audio_path=None):
    cmd = ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{HH}", "-r", str(FPS), "-i", "-"]
    return subprocess.Popen(cmd + ["-c:v", "libx264", "-preset", "medium", "-crf", "15", "-pix_fmt", "yuv420p", path], stdin=subprocess.PIPE)

if __name__ == "__main__":
    os.makedirs(f"{H}/qa", exist_ok=True); os.makedirs(f"{H}/work", exist_ok=True); av = sys.argv
    if "--audio" in av: sf.write(f"{H}/work/pose_test_mix.wav", audio(), SR, subtype="PCM_16"); print("wrote work/pose_test_mix.wav"); sys.exit()
    if "--frames" in av:
        f = Film()
        for i in map(int, av[av.index("--frames") + 1:]): cv2.imwrite(f"{H}/qa/pt_f{i:04d}.png", f.frame(i / FPS))
        sys.exit()
    if "--sheet" in av:
        j = av.index("--sheet"); name, t0, t1 = av[j + 1], float(av[j + 2]), float(av[j + 3]); box = list(map(int, av[j + 4:j + 8])) or [0, 0, W, HH]
        f = Film(); tiles = []
        for i in range(int(round(t0 * FPS)), int(round(t1 * FPS)) + 1):
            c = f.frame(i / FPS)[box[1]:box[3], box[0]:box[2]].copy(); cv2.putText(c, str(i), (8, 28), 0, .9, (0, 255, 255), 2); tiles.append(c)
        cols = int(av[j + 8]) if len(av) > j + 8 else 6
        while len(tiles) % cols: tiles.append(np.zeros_like(tiles[0]))
        sheet = np.vstack([np.hstack(tiles[i:i + cols]) for i in range(0, len(tiles), cols)]); k = min(1, 2000 / sheet.shape[1])
        cv2.imwrite(f"{H}/qa/pt_{name}.png", cv2.resize(sheet, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)); sys.exit()
    if "--part" in av:                                                      # one worker: frames a..b -> work/_pt_part<k>.mp4
        j = av.index("--part"); k, a, b = int(av[j + 1]), int(av[j + 2]), int(av[j + 3]); f = Film(); ff = enc(f"{H}/work/_pt_part{k}.mp4")
        for i in range(a, b):
            ff.stdin.write(f.frame(i / FPS).tobytes())
            if (i - a) % 30 == 0: print(f"part {k}: frame {i}/{b}", flush=True)
        ff.stdin.close(); ff.wait(); sys.exit()
    NW = 4; cuts = [round(N * i / NW) for i in range(NW + 1)]; wav = f"{H}/work/pose_test_mix.wav"; sf.write(wav, audio(), SR, subtype="PCM_16")
    ps = [subprocess.Popen([sys.executable, __file__, "--part", str(k), str(cuts[k]), str(cuts[k + 1])], stdout=open(f"{H}/work/_pt_part{k}.log", "w")) for k in range(NW)]
    assert all(p.wait() == 0 for p in ps), "a worker failed: see work/_pt_part*.log"
    open(f"{H}/work/_pt_list.txt", "w").write("".join(f"file '_pt_part{k}.mp4'\n" for k in range(NW)))
    tmp = f"{H}/work/_pose_test_render.mp4"
    subprocess.check_call(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", f"{H}/work/_pt_list.txt", "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                           "-movflags", "+faststart", "-shortest", tmp])
    os.replace(tmp, f"{H}/pose_test_robot_round.mp4"); print("wrote pose_test_robot_round.mp4", N, "frames")
