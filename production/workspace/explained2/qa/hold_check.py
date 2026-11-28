#!/usr/bin/env python3
"""hold_check.py <video.mp4> [--fps 4] [--max 10] [--thr 0.30] [--csv out.csv]

The series' 10-second rule (teacher, 28 Nov 2026, P4 EP3: "not to have still frames or same scene for more than 10 seconds"):
every <= 10 s the PICTURE must change meaningfully (a cut, a new angle or set, a close-up, a camera move, a full-frame insert).
Bubbles, captions, mouth flaps and blinks must NOT count as a change.

How it measures: every frame (at --fps) is shrunk to 96x54 grey and blurred, so small things (a bubble's text, a mouth, a blink)
hardly register. A "shot" starts at an anchor frame; each later frame is compared with that ANCHOR (not with the frame before it),
so a slow push-in or pan adds up until it differs enough. When more than --thr of the pixels differ by more than 14 grey levels
from the anchor, the picture has changed: that frame becomes the new anchor. A speech bubble covers well under 10 % of the frame,
so it can never reset the anchor on its own; a cut, a close-up or a camera move of about 8 % zoom does.
Prints every hold longer than --max seconds and the longest hold; exit code 1 when any hold is longer than --max.
"""
import sys, subprocess, argparse
import numpy as np

ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--fps', type=float, default=4); ap.add_argument('--max', type=float, default=10)
ap.add_argument('--thr', type=float, default=.30); ap.add_argument('--csv'); ap.add_argument('--t0', type=float, default=0); ap.add_argument('--t1', type=float, default=1e9)
a = ap.parse_args()
W, H = 96, 54
cmd = ['ffmpeg', '-v', 'error', '-i', a.video, '-vf', f'fps={a.fps},scale={W}:{H}:flags=area,gblur=sigma=1.2,format=gray', '-f', 'rawvideo', '-']
raw = subprocess.run(cmd, capture_output=True, check=True).stdout
F = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.int16)
n = len(F); ts = np.arange(n) / a.fps
anchors = [0]; diffs = np.zeros(n)
for i in range(1, n):
    d = np.mean(np.abs(F[i] - F[anchors[-1]]) > 14); diffs[i] = d
    if d > a.thr: anchors.append(i)
anchors.append(n - 1)
holds = [(ts[anchors[k]], ts[anchors[k + 1]]) for k in range(len(anchors) - 1)]
holds = [(x, y) for x, y in holds if y > a.t0 and x < a.t1]
L = sorted(holds, key=lambda h: h[1] - h[0], reverse=True)
over = [h for h in holds if h[1] - h[0] > a.max]
print(f'{a.video}: {n} frames at {a.fps} fps ({n / a.fps:.1f} s); {len(anchors) - 2} picture changes; mean hold {np.mean([y - x for x, y in holds]):.1f} s')
print(f'longest hold: {L[0][1] - L[0][0]:.2f} s ({L[0][0]:.2f} - {L[0][1]:.2f})')
print('top 8 holds:', ', '.join(f'{y - x:.1f} s @ {x:.1f}' for x, y in L[:8]))
print(f'holds over {a.max:g} s: {len(over)}' + (''.join(f'\n  {x:7.2f} - {y:7.2f}  ({y - x:.1f} s)' for x, y in over)))
if a.csv:
    with open(a.csv, 'w') as f:
        f.write('t0,t1,len\n' + ''.join(f'{x:.2f},{y:.2f},{y - x:.2f}\n' for x, y in holds))
sys.exit(1 if over else 0)
