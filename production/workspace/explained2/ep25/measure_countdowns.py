"""measure_countdowns.py P: measures every countdown in the RENDERED ep25_partP.mp4 (SERIES_FORMAT 10.6: the numbers step once per second
exactly with the ticks, the bell lands on 0). Picture: the ring's number badge is cropped at every frame from 0.6 s before the ring starts to
0.6 s after the bell, and the frames where it changes are found (frame difference). Sound: onsets in the rendered file's audio (the tick and the bell
are the loudest short transients there; the music is ducked out under countdowns). Prints both lists and the offsets from the timeline."""
import sys, json, subprocess, numpy as np, wave
P = sys.argv[1]; tl = json.load(open(f'tl_p{P}.json')); M = tl['marks']; FPS = 30
CD = {'1': [('Round 1', 'ring0_r1', 5, (960, 640)), ('HOLD ON!', 'ring0_hold', 5, (960, 645))], '2': [('Round 1', 'ring0_r1', 5, (960, 640)), ('Showdown', 'ring0_show', 6, (1440, 640))]}[P]
def frames(t0, t1, cx, cy, s=90):
    cmd = ['ffmpeg', '-v', 'error', '-ss', f'{t0:.3f}', '-i', f'ep25_part{P}.mp4', '-t', f'{t1 - t0:.3f}', '-vf', f'crop={2*s}:{2*s}:{cx-s}:{cy-s},format=gray', '-f', 'rawvideo', '-']
    raw = subprocess.run(cmd, capture_output=True).stdout; n = len(raw) // (4 * s * s); return np.frombuffer(raw[:n * 4 * s * s], np.uint8).reshape(n, 2 * s, 2 * s).astype(float)
def mixonsets(t0, t1):
    sr = 48000; x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t0:.3f}', '-i', f'ep25_part{P}.mp4', '-t', f'{t1 - t0:.3f}', '-vn', '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'], capture_output=True).stdout, np.int16).astype(float)
    hop = int(sr * .005); e = np.array([np.sqrt(np.mean(x[k:k + hop] ** 2)) for k in range(0, len(x) - hop, hop)]) + 1; on = []; k = 12
    while k < len(e):
        if e[k] > 2.2 * e[k - 12:k - 2].mean() and e[k] > np.percentile(e, 55): on.append(t0 + k * hop / sr); k += int(.12 / .005)
        else: k += 1
    return on
for name, mk, dur, (cx, cy) in CD:
    r0 = M[mk]; F = frames(r0 - .6, r0 + dur + .6, cx, cy); diff = np.abs(np.diff(F, axis=0)).mean((1, 2)); ch = []
    for i in range(1, len(diff) - 1):   # a change of number pops the badge much harder than a tick's pulse: the big peaks only
        if diff[i] >= diff[i - 1] and diff[i] >= diff[i + 1] and diff[i] > .45 * diff.max() and (not ch or i - ch[-1][0] > 12): ch.append((i, diff[i]))
    tv = [round(r0 - .6 + (i + 1) / FPS, 3) for i, _ in ch]
    # and for each whole second of the ring (where a number must change), the frame with the biggest change near it and how big it is vs a tick's pulse
    near = []
    for k in range(dur + 1):
        lo, hi = int((.6 + k - .2) * FPS), int((.6 + k + .25) * FPS); i = lo + int(np.argmax(diff[lo:hi])); near.append((round(r0 - .6 + (i + 1) / FPS, 3), round(float(diff[i]), 1)))
    on = [round(t, 3) for t in mixonsets(r0 - .3, r0 + dur + .3)]
    print(f'P{P} {name}: ring starts {r0:.3f}, bell (timeline) {r0 + dur:.3f}')
    print('  number changes (video):', [t for t, _ in near], '-> steps', [round(b[0] - a[0], 3) for a, b in zip(near, near[1:])], '(change sizes', [d for _, d in near], ')')
    print('  sound onsets (mix):   ', on)
