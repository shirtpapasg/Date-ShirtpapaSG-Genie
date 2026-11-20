"""talk_render.py: step 3 of the sprite pipeline. The teacher's paintings, animated as cut-out sprites.
  /home/user/heart-tts/venv/bin/python talk_render.py basil            -> basil_talk_test.mp4 (1920x1080, 30 fps)
  /home/user/heart-tts/venv/bin/python talk_render.py basil --frames 30 31 32   -> qa/basil_f0030.png ... (stills only)
Every frame is a pure function of t: frame(shot, t) reads only t, the sprite PNGs and the voice tracks made by talk_voice.py.

What moves (all small; the face is never bent, the head only turns as one rigid piece):
  mouth      closed/half/wide from the voice's loudness track (hysteresis + minimum hold, see talk_voice.mouth_track)
  blink      2-3 frames on the eyes-closed state, at set times; the lids sit on top of whatever the mouth is doing
  breathing  the body grows 1.2% taller from the hips, 3 s loop
  nod        on each stressed syllable the head dips about 1.5 degrees around the neck and the body squashes about 1.5%
  gestures   'shrug' (tilt + squash, the "oops"), 'shake' (a small "no"), 'tilt' (a curious head tilt), 'pop' (pop-in)
  shadow     a soft contact shadow that follows the squash; a warm rim light as in kit/style.js buddy()"""
import cv2, numpy as np, json, os, sys, subprocess, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); W, HH, FPS = 1920, 1080, 30
hexc = lambda h: np.float32([int(h[i:i + 2], 16) for i in (5, 3, 1)]) / 255          # '#RRGGBB' -> BGR 0..1
P = dict(ink="#2B2147", night="#120E2E", indigo="#221A57", violet="#3B2A8C", stage="#4A36B0", sun="#FFC83A", rim="#FFE9A8",
         basil="#7FE3C4", pip="#B9A6FF", momo="#FFB38A", lilac="#DDD3FF")
ss = lambda a, b, x: (lambda u: u * u * (3 - 2 * u))(np.clip((x - a) / (b - a), 0, 1))  # smoothstep
MOUTH = ["closed", "half", "wide"]

# ---------------------------------------------------------------- sprites
class Sprite:
    def __init__(self, name):
        self.name = name; self.meta = m = json.load(open(f"{H}/{name}_sit.json")); self.im = {}
        for s in ("closed", "half", "wide", "blink", "half_blink", "wide_blink"):
            a = cv2.imread(f"{H}/{name}_sit_{s}.png", -1).astype(np.float32) / 255; a[..., :3] *= a[..., 3:]; self.im[s] = a
        self.h, self.w = self.im["closed"].shape[:2]; A = m["anchors"]; self.hips = np.float32(A["hips"]); self.neck = np.float32(A["neck"])
        x0, y0, x1, y1 = m["states"]["closed"]["bbox"]; self.body_h = y1 - y0; self.top = y0
        yy, xx = np.mgrid[0:self.h, 0:self.w].astype(np.float32); self.xx, self.yy = xx, yy
        n0, n1 = A["neck_band"]                                             # head weight: 1 above the band, 0 below (and 0 on the tail side)
        wgt = 1 - ss(n0, n1, yy)
        if "head_xmin" in A: wgt = wgt * ss(A["head_xmin"][0], A["head_xmin"][1], xx)
        self.wh = wgt; self.wt = None
        if "tail" in A:                                                     # tail weight: 1 on the tail side of the band, 0 on the body
            T = A["tail"]; self.troot = np.float32(T["root"]); self.wt = ss(T["xband"][0], T["xband"][1], xx) * ss(T["ymin"][0], T["ymin"][1], yy)

    def pose(self, state, head_deg, tail_deg=0.0):
        """the state's picture with the head turned head_deg around the neck (rigid in the head, a soft bend in the neck band)
        and, if the buddy has a tail zone, the tail swung tail_deg around its root. Always resampled once, so sharpness never changes."""
        im = self.im[state]
        th = np.radians(head_deg) * self.wh; c, s = np.cos(th), np.sin(th); dx, dy = self.xx - self.neck[0], self.yy - self.neck[1]
        mx = self.neck[0] + c * dx + s * dy; my = self.neck[1] - s * dx + c * dy   # inverse rotation: where each output pixel comes from
        if self.wt is not None:
            th = np.radians(tail_deg) * self.wt; c, s = np.cos(th), np.sin(th); dx, dy = self.xx - self.troot[0], self.yy - self.troot[1]
            mx += (self.troot[0] + c * dx + s * dy) - self.xx; my += (self.troot[1] - s * dx + c * dy) - self.yy
        return np.clip(cv2.remap(im, mx.astype(np.float32), my.astype(np.float32), cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=0), 0, 1)

# ---------------------------------------------------------------- the stage (static, drawn once)
def stage(actors):
    yy, xx = np.mgrid[0:HH, 0:W].astype(np.float32)
    r = np.sqrt(((xx - 960) / 1250) ** 2 + ((yy - 470) / 900) ** 2)
    bg = hexc(P["stage"]) * (1 - ss(0, 1, r))[..., None] + hexc(P["night"]) * ss(0, 1, r)[..., None]
    gy = max(a["y"] for a in actors); hor = gy - 150                           # floor: a lighter violet plane with a soft horizon
    fl = ss(hor - 6, hor + 6, yy) * (.55 + .45 * ss(hor, HH, yy)); floor = hexc(P["violet"]) * .85 + hexc(P["stage"]) * .15
    bg = bg * (1 - fl[..., None] * .7) + floor * fl[..., None] * .7
    pool = np.exp(-(((xx - 960) / 760) ** 2 + ((yy - gy - 10) / 120) ** 2) * 1.6) * ss(hor, hor + 40, yy)   # the spotlight's pool on the floor
    bg = bg + pool[..., None] * hexc(P["lilac"]) * .16
    for a in actors:                                                        # aura disc behind each buddy (style.js buddy()): r = .62 h
        h = a["h"]; cx, cy, R = a["x"] + a.get("disc_dx", 0) * h, a["y"] - h * .46, h * .62
        d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2); m = (1 - ss(R - 1.2, R + 1.2, d)) * .9
        spot = np.clip(1 - d / R, 0, 1) * .5; col = hexc(P[a["char"]])
        disc = col * (1 - spot[..., None]) + spot[..., None]
        bg = bg * (1 - m[..., None]) + disc * m[..., None]
    return np.clip(bg, 0, 1)

def finish(img):
    """one grade for everything: vignette + fine grain (fixed seed)"""
    if not hasattr(finish, "v"):
        yy, xx = np.mgrid[0:HH, 0:W].astype(np.float32); r = np.sqrt(((xx - 960) / 960) ** 2 + ((yy - 540) / 540) ** 2) / 1.44
        finish.v = (ss(.62, 1, r) * .55)[..., None]; g = np.random.default_rng(11).normal(0, 1, (HH, W)).astype(np.float32)
        finish.g = cv2.GaussianBlur(g, (0, 0), .7)[..., None] * .022
    img = img * (1 - finish.v) + hexc(P["night"]) * finish.v
    return np.clip(img + finish.g * (1 - np.abs(2 * img - 1)) * 2, 0, 1)

# ---------------------------------------------------------------- motion (pure functions of t)
def pulse(t, t0, att=.07, dec=.30):
    u = t - t0
    return 0.0 if u < -att else (float(ss(-att, 0, u)) if u < 0 else float(np.exp(-u / dec * 3) * (1 - .0 * u)))
def env(t, t0, dur, a=.18, r=.3):
    return float(ss(t0, t0 + a, t) * (1 - ss(t0 + dur - r, t0 + dur, t)))

def actor_state(a, t, voices):
    """everything about one buddy at time t: which picture, head angle, body transform"""
    # mouth + stressed syllables from the voice tracks
    mouth, nod = 0, 0.0
    for vid, t0 in a.get("lines", []):
        v = voices[vid]; i = int(np.floor((t - t0) * FPS + 1e-6))
        if 0 <= i < len(v["mouth"]): mouth = v["mouth"][i]
        for ts in v["stress"]: nod += pulse(t, t0 + ts)
    nod = min(nod, 1.2)
    blink = any(0 <= t - tb < a.get("blink_len", 3) / FPS - 1e-6 for tb in a.get("blinks", []))
    state = MOUTH[mouth] + ("_blink" if blink else ""); state = "blink" if state == "closed_blink" else state
    # body
    br = np.sin(2 * np.pi * (t + a.get("phase", 0)) / 3.0)
    ph = a.get("phase", 0); sy = 1 + .012 * br; sx = 1 - .004 * br; rot = .35 * np.sin(2 * np.pi * (t + ph) / 4.6); lift = 0.0; k = 1.0
    head = .45 * np.sin(2 * np.pi * (t + ph) / 3.7 + 1.0); tail = 1.3 * np.sin(2 * np.pi * (t + ph) / 2.6) + .5 * np.sin(2 * np.pi * (t + ph) / 1.1)
    q = .014 * nod; head += a.get("nod_deg", 1.5) * nod                      # the nod: head dips forward, body squashes a touch
    for g in a.get("gestures", []):
        kind, t0 = g["kind"], g["t"]
        if kind == "pop":
            u = (t - t0) / g.get("dur", .55)
            if u <= 0: k = 0.0
            else:
                k = float(1 - np.exp(-7.5 * u) * np.cos(8.0 * u)); wob = float(np.exp(-4.0 * u) * np.cos(10.0 * u + .5))
                sy *= 1 + .09 * wob; sx *= 1 - .07 * wob; tail += 5 * wob
        elif kind == "shrug":                                               # the "oops": lean away, sink, head tips the other way
            e = env(t, t0, g["dur"], .16, .35); rot += g.get("deg", -3.0) * e; q += g.get("squash", .03) * e; head += g.get("head", 3.0) * e
            lift += -6 * float(np.sin(np.pi * np.clip((t - t0) / .22, 0, 1)))   # a tiny hop of surprise first
        elif kind == "shake":
            u = t - t0
            if 0 <= u <= g["dur"]: head += g.get("deg", 2.0) * float(np.sin(2 * np.pi * u / g.get("period", .42)) * np.sin(np.pi * u / g["dur"]) ** .6)
        elif kind == "tilt":
            head += g.get("deg", 3.5) * env(t, t0, g["dur"], .25, .35); rot += g.get("body", 0.0) * env(t, t0, g["dur"], .25, .35)
    sy *= 1 - q; sx *= 1 + .8 * q
    tail += 2.5 * nod
    return dict(state=state, head=head, tail=tail, sx=sx * k, sy=sy * k, rot=rot, lift=lift, k=k, q=q)

def draw_actor(img, sp, a, st):
    if st["k"] <= .002: return img
    s0 = a["h"] / sp.body_h; flip = -1 if a.get("flip") else 1
    src = sp.pose(st["state"], st["head"], st["tail"])
    th = np.radians(st["rot"]); c, s = np.cos(th), np.sin(th)
    A = np.array([[c, -s], [s, c]]) @ np.diag([s0 * st["sx"] * flip, s0 * st["sy"]])
    tr = np.array([a["x"], a["y"] + st["lift"]]) - A @ sp.hips; M = np.float32(np.hstack([A, tr[:, None]]))
    # contact shadow (on the floor, under the hips; wider when he squashes, fainter in the air)
    rx = a["h"] * a.get("shadow_rx", .40) * st["sx"] * (1 + 2 * st["q"]); ry = rx * .16; o = .34 * st["k"] * (1 + st["lift"] / 60)
    x0, x1, y0, y1 = int(a["x"] - rx * 1.6), int(a["x"] + rx * 1.6), int(a["y"] - ry * 4), int(a["y"] + ry * 4)
    x0, y0, x1, y1 = max(x0, 0), max(y0, 0), min(x1, W), min(y1, HH); yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32)
    d = ((xx - a["x"] - a.get("shadow_dx", 0) * a["h"]) / rx) ** 2 + ((yy - a["y"] + 2) / ry) ** 2
    sh = (np.exp(-d * 1.5) * o)[..., None]; img[y0:y1, x0:x1] = img[y0:y1, x0:x1] * (1 - sh) + hexc(P["ink"]) * sh
    # the sprite
    spr = np.clip(cv2.warpAffine(src, M, (W, HH), flags=cv2.INTER_CUBIC), 0, 1); al = spr[..., 3]
    ys, xs = np.where(al > .003)
    if len(ys) == 0: return img
    y0, y1, x0, x1 = max(ys.min() - 30, 0), min(ys.max() + 31, HH), max(xs.min() - 30, 0), min(xs.max() + 31, W)
    al = al[y0:y1, x0:x1]; rim = np.clip(cv2.GaussianBlur(al, (0, 0), 5) * 1.25, 0, 1) * .8 * (1 - al)      # warm rim light around him
    roi = img[y0:y1, x0:x1]; roi = roi * (1 - rim[..., None]) + hexc(P["rim"]) * rim[..., None]
    img[y0:y1, x0:x1] = roi * (1 - al[..., None]) + spr[y0:y1, x0:x1, :3]
    return img

# ---------------------------------------------------------------- shots
def fid(i): return i / FPS
SHOTS = {
  "basil": dict(out="basil_talk_test.mp4", dur=7.6, actors=[dict(
      char="basil", x=1020, y=930, h=610, shadow_rx=.36, shadow_dx=-.02, disc_dx=-.10,
      lines=[("basil1", 1.0), ("basil2", 3.95)], blinks=[3.25, 6.55], blink_len=3,
      gestures=[dict(kind="pop", t=.3, dur=.6), dict(kind="shrug", t=3.92, dur=1.25, deg=-3.2, squash=.03, head=3.0)])]),
  "pip": dict(out="pip_talk_test.mp4", dur=6.0, actors=[dict(
      char="pip", x=1000, y=930, h=590, shadow_rx=.30, disc_dx=-.06,
      lines=[("pip1", 1.0)], blinks=[2.02, 4.75], blink_len=3, nod_deg=1.2,
      gestures=[dict(kind="pop", t=.3, dur=.6), dict(kind="shake", t=1.0, dur=.84, deg=2.0, period=.42)])]),      # a small "no" on "Non-living"
  "momo": dict(out="momo_talk_test.mp4", dur=6.0, actors=[dict(
      char="momo", x=1000, y=930, h=590, shadow_rx=.30, disc_dx=-.08,
      lines=[("momo1", 1.0)], blinks=[1.72, 4.7], blink_len=3, nod_deg=1.2,
      gestures=[dict(kind="pop", t=.3, dur=.6), dict(kind="tilt", t=1.98, dur=1.75, deg=3.6, body=.8)])]),         # curious tilt on the question
  "lineup": dict(out="buddies_lineup_test.mp4", dur=8.8, actors=[
      dict(char="pip", x=440, y=915, h=420, shadow_rx=.30, disc_dx=-.06, phase=.9, lines=[("pip1", 3.25)], blinks=[1.6, 2.72, 6.5], nod_deg=1.2,
           gestures=[dict(kind="pop", t=.55, dur=.6), dict(kind="shake", t=3.25, dur=.84, deg=2.0, period=.42)]),
      dict(char="basil", x=990, y=915, h=410, shadow_rx=.36, shadow_dx=-.02, disc_dx=-.10, lines=[("basil1", 1.25)], blinks=[3.6, 7.1],
           gestures=[dict(kind="pop", t=.3, dur=.6)]),
      dict(char="momo", x=1480, y=915, h=420, shadow_rx=.30, disc_dx=-.08, phase=1.9, lines=[("momo1", 6.2)], blinks=[2.3, 5.2, 6.92], nod_deg=1.2,
           gestures=[dict(kind="pop", t=.8, dur=.6), dict(kind="tilt", t=7.18, dur=1.4, deg=3.6, body=.8)])]),
}

class Shot:
    def __init__(self, name):
        self.c = c = SHOTS[name]; self.name = name; self.sp = {}; self.voices = {}
        for a in c["actors"]:
            self.sp.setdefault(a["char"], Sprite(a["char"]))
            for vid, _ in a.get("lines", []): self.voices[vid] = json.load(open(f"{H}/voice/{vid}.json"))
        self.bg = stage(c["actors"]); self.n = int(round(c["dur"] * FPS))
    def frame(self, t):
        img = self.bg.copy()
        for a in self.c["actors"]: img = draw_actor(img, self.sp[a["char"]], a, actor_state(a, t, self.voices))
        return (finish(img) * 255 + .5).astype(np.uint8)
    def audio(self):
        x = np.zeros(int(self.c["dur"] * 48000) + 48000, np.float32)
        for a in self.c["actors"]:
            for vid, t0 in a.get("lines", []):
                y, sr = sf.read(f"{H}/voice/{vid}.wav"); i = int(t0 * 48000); x[i:i + len(y)] += y.astype(np.float32)
        return x[:int(self.c["dur"] * 48000)]

if __name__ == "__main__":
    name = sys.argv[1]; sh = Shot(name); os.makedirs(f"{H}/qa", exist_ok=True)
    if "--frames" in sys.argv:
        for i in map(int, sys.argv[sys.argv.index("--frames") + 1:]): cv2.imwrite(f"{H}/qa/{name}_f{i:04d}.png", sh.frame(fid(i)))
        sys.exit()
    wav = f"{H}/voice/_{name}_mix.wav"; sf.write(wav, sh.audio(), 48000, subtype="PCM_16"); out = f"{H}/{sh.c['out']}"
    tmp = f"{H}/work/_{name}_render.mp4"; os.makedirs(f"{H}/work", exist_ok=True)       # in-progress file lives in work/, never next to the deliverables
    ff = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{HH}", "-r", str(FPS), "-i", "-",
                           "-i", wav, "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
                           "-movflags", "+faststart", "-shortest", tmp], stdin=subprocess.PIPE)
    for i in range(sh.n):
        ff.stdin.write(sh.frame(fid(i)).tobytes())
        if i % 30 == 0: print(f"{name} frame {i}/{sh.n}", flush=True)
    ff.stdin.close(); ff.wait(); os.replace(tmp, out); print("wrote", out)
