"""highlights.py: qa/highlights.jpg, 14 labelled stills from the final renders (the places, the look-closers, the journeys, the reasons)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; ft = ImageFont.truetype(F, 34)
S = [(1, 3.4, "P1 0:03  Cold open, Heart speaking from 0.8 s: the hardware shop; Pip strokes the nail"),
     (1, 99.0, "P1 1:39  Be the iron nail: the giant magnet's red end lands on your head"),
     (1, 117.1, "P1 1:57  The clips jump up and cling to your tip"),
     (1, 150.5, "P1 2:30  Look closer: a new nail clicks onto the magnet, but it is not a magnet"),
     (1, 162.5, "P1 2:42  Pip's nail, the magnet shut away: clips!; Pip shy (right card, wrong reason)"),
     (1, 199.5, "P1 3:19  HOLD ON! countdown: the clips hang from the MAGNET; Basil thinking"),
     (1, 245.5, "P1 4:05  Look closer: only the steel screwdriver attracts the clips; Momo shy"),
     (2, 93.5, "P2 1:33  Be a steel paper clip: you jump to Pip's nail (a gold ripple)"),
     (2, 106.0, "P2 1:46  The answer: Momo and Pip confident, Basil shy"),
     (2, 131.0, "P2 2:11  Look closer: lift up and away, never slide back; the arrows stack"),
     (2, 189.0, "P2 3:09  The fix: line 3 struck and rewritten; Pip shy, Basil and Momo confident"),
     (2, 226.0, "P2 3:46  Look closer: ten, twenty, thirty strokes: more clips"),
     (2, 233.0, "P2 3:53  The thirty-stroke hook lifts the big gold fish"),
     (2, 305.0, "P2 5:05  The dare: a coiled nail and a battery. What happens to the clips?")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep23_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 18), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP23 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
