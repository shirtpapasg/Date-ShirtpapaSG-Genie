"""measure_ring.py P: checks every countdown in the RENDERED part against its own sound (teacher, 22 Nov: "The countdown timer rhythm is off!").
For each ring: the tick onsets heard in the mix (an energy-rise detector on the 2-8 kHz band, where the wood tick lives) vs the planned ticks, and
the frames where the number in the ring's sun disc changes (pixel change of the badge) vs the whole-second ticks; the bell vs the frame where
the ring empties.   python3 measure_ring.py 1|2"""
import sys, json, subprocess, numpy as np, os
H = os.path.dirname(os.path.abspath(__file__)); P = sys.argv[1] if len(sys.argv) > 1 else "1"; V = f"{H}/ep13_part{P}.mp4"
tl = json.load(open(f"{H}/tl_p{P}.json")); M = tl["marks"]
def ticks(t0, dur):
    out = []
    for b in range(dur):
        left = dur - b; div = 1 if (left > 3 or b == 0) else (2 if left > 1 else 4)
        out += [t0 + b + j / div for j in range(div)]
    return out
# rings: (name, r0, dur, badge box in 1080p pixels: the sun disc under the ring)
RINGS = (lambda: {"1": [("Round 1", M["ring0_r1"], 3, (500, 500 + 196 * 1.2, 1.2)), ("HOLD ON!", M["ring0_hold"], 5, (700, 480 + 196 * 1.25, 1.25))],
         "2": [("Round 1", M["ring0_r1"], 6, (500, 520 + 196 * 1.2, 1.2)), ("Showdown", M["ring0_show"], 6, (1560, 400 + 196 * .95, .95))]}[P] if P == "2" else [("Round 1", M["ring0_r1"], 3, (500, 500 + 196 * 1.2, 1.2)), ("HOLD ON!", M["ring0_hold"], 5, (700, 480 + 196 * 1.25, 1.25))])()
SR = 48000
def audio(a, b):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{a}", "-t", f"{b - a}", "-i", V, "-ac", "1", "-ar", str(SR), "-af", "highpass=f=1800,lowpass=f=8000", "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)
def onsets(x, a):
    hop = 240; e = np.array([np.sqrt(np.mean(x[i:i + 480] ** 2)) for i in range(0, len(x) - 480, hop)]); d = np.diff(e, prepend=e[0]); thr = max(d.max() * .25, 1e-4); out = []; last = -1
    for i, v in enumerate(d):
        if v > thr and (i - last) * hop / SR > .09: out.append(a + i * hop / SR); last = i
    return out
def badge_changes(a, b, x, y, sc):
    r = int(54 * sc + 6); w = h = 2 * r
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{a}", "-t", f"{b - a}", "-i", V, "-vf", f"crop={w}:{h}:{int(x - r)}:{int(y - r)}", "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(float); diffs = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)); out = []
    thr = max(6, diffs.max() * .35)
    for i, v in enumerate(diffs):
        if v > thr and (not out or (i + 1) / 30 + a - out[-1] > .5): out.append(a + (i + 1) / 30)
    return out
rep = []
for name, r0, dur, (bx, by, sc) in RINGS:
    a, b = r0 - .4, r0 + dur + .6; x = audio(a, b); heard = onsets(x, a); plan = ticks(r0, dur) + [r0 + dur]
    match = [min(heard, key=lambda h: abs(h - p)) - p if heard else None for p in plan]
    ch = badge_changes(r0 - .2, r0 + dur + .3, bx, by, sc); whole = [r0 + k for k in range(1, dur + 1)]
    cm = [min(ch, key=lambda c: abs(c - w)) - w if ch else None for w in whole]
    rep.append(f"{name}: ring0 {r0:.2f} s, {dur} s. Ticks planned {len(plan) - 1} + bell; heard onsets {len(heard)}; |tick - heard| max {max(abs(m) for m in match if m is not None) * 1000:.0f} ms, mean {np.mean([abs(m) for m in match if m is not None]) * 1000:.0f} ms. "
               f"Number changes seen at {', '.join(f'{c:.2f}' for c in ch)}; vs the whole-second ticks {', '.join(f'{w:.2f}' for w in whole)}: max offset {max(abs(c) for c in cm if c is not None) * 1000:.0f} ms (1 frame = 33 ms).")
print("\n".join(rep)); open(f"{H}/qa/ring_check_p{P}.txt", "w").write("\n".join(rep) + "\n")
