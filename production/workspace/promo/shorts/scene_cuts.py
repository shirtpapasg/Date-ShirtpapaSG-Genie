"""scene_cuts.py: the film's scene changes, for writing a crop plan (make_short.py). Mean frame difference on a 96 x 54 grey
copy of every frame; prints the peaks (time in s : strength). Hard cuts are strong (> 15); the films' dissolves and flashes
show as weaker peaks.     python3 scene_cuts.py ../revoice/film1_v2.mp4"""
import subprocess, sys, numpy as np
W, H = 96, 54
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True).stdout
a = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.abs(np.diff(a, axis=0)).mean(axis=(1, 2))
print(' '.join(f'{(i + 1) / 60:.2f}:{d[i]:.0f}' for i in range(len(d)) if d[i] > 2.5 and d[i] == d[max(0, i - 20):i + 21].max()))
