"""highlights.py: qa/highlights.jpg, 14 labelled stills from the final renders (the places, the look-closers, the journeys, the reasons)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; ft = ImageFont.truetype(F, 34)
S = [(1, 3.0, "P1 0:03  Cold open, Heart speaking from 0.3 s: the void deck study corner; Pip reads, Basil makes"),
     (1, 62.8, "P1 1:03  The word puzzle: read three, work out three (Basil's pencil writes the letters in)"),
     (1, 116.0, "P1 1:56  Look closer: Pip's eyes slide over the poster; Basil stops, thinks, writes his own words"),
     (1, 172.0, "P1 2:52  The memory test: needle fades away; the answer; Pip shy, Momo and Basil confident"),
     (1, 198.5, "P1 3:18  HOLD ON! Momo copies the poster word for word"),
     (1, 218.0, "P1 3:38  The fix: the poster turned to the wall; MEMORY FIRST; Momo stays shy"),
     (1, 251.0, "P1 4:11  The crow on the letterboxes; fun fact: crows remember faces for years"),
     (2, 64.0, "P2 1:04  TheOneApp's real screens: Mind Maps, Make my own mind map"),
     (2, 81.0, "P2 1:21  Basil types his map from memory, poster closed (the app draws it)"),
     (2, 95.8, "P2 1:35  Look closer: every idea ticked, one poster idea missing"),
     (2, 99.8, "P2 1:40  Compare with the poster: Making a magnet"),
     (2, 157.0, "P2 2:37  Showdown fix: line 2 struck and rewritten; Pip shy"),
     (2, 191.5, "P2 3:11  Be an idea: on Tuesday the path clears"),
     (2, 240.8, "P2 4:00  Next Monday: two branches vs five; Basil surprised (he picked three)")]
import sys
W, Hh, N = 860, 484, 2
for PP in [int(a) for a in sys.argv[1:]] or [1, 2]:   # one sheet per part: qa/highlights_p<P>.jpg (python3 highlights.py 1 2)
  tiles = []
  for P, t, lab in [x for x in S if x[0] == PP]:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep00_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 18), fill=(30, 26, 60)); tiles.append(tl)
  os.remove(f"{H}/out/_hl.png")
  rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
  d.text((14, 14), f"EP0, the mind map special, Part {PP}: highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
  for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
  sh.save(f"{H}/qa/highlights_p{PP}.jpg", quality=86); print(PP, sh.size)
