"""qa_strip.py: crops of consecutive frames straight from the mp4, side by side.  qa_strip.py <mp4> <out.png> x0 y0 x1 y1 zoom f1 f2 ..."""
import cv2, numpy as np, sys
mp4, out = sys.argv[1:3]; x0, y0, x1, y1 = map(int, sys.argv[3:7]); z = float(sys.argv[7]); fr = list(map(int, sys.argv[8:]))
cap = cv2.VideoCapture(mp4); tiles = []
for f in fr:
    cap.set(cv2.CAP_PROP_POS_FRAMES, f); ok, im = cap.read(); c = cv2.resize(im[y0:y1, x0:x1], None, fx=z, fy=z, interpolation=cv2.INTER_CUBIC)
    cv2.putText(c, str(f), (6, 22), 0, .7, (0, 255, 255), 2); tiles.append(c)
n = len(tiles); cols = min(n, int(sys.argv[sys.argv.index("--cols") + 1]) if "--cols" in sys.argv else 6) if False else min(n, 6)
rows = [np.hstack(tiles[i:i + cols] + [np.zeros_like(tiles[0])] * (cols - len(tiles[i:i + cols]))) for i in range(0, n, cols)]
cv2.imwrite(out, np.vstack(rows))
