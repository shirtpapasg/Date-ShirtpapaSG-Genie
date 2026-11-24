import sys, subprocess, numpy as np, json, os
from rapidocr_onnxruntime import RapidOCR
src, out = sys.argv[1], sys.argv[2]; fps = 4
W, H, X0, Y0 = 1200, 200, 360, 860
ocr = RapidOCR()
p = subprocess.Popen(["ffmpeg","-v","error","-i",src,"-vf",f"fps={fps},crop={W}:{H}:{X0}:{Y0}","-f","rawvideo","-pix_fmt","rgb24","-"], stdout=subprocess.PIPE)
res = []; i = 0; prev = None; last = None; n = 0
while True:
    b = p.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    a = np.frombuffer(b, np.uint8).reshape(H, W, 3); t = i / fps; i += 1
    ai = a.astype(np.int16); mx = ai.max(2); mn = ai.min(2)
    m = ((mx > 140) & (mx - mn < 70)) | ((ai[...,0] > 200) & (ai[...,1] > 160) & (ai[...,2] < 130))
    if prev is not None and (m ^ prev).sum() < 1200: res.append({"t": t, "items": last}); continue
    prev = m; n += 1
    r, _ = ocr(a[:, :, ::-1].copy())
    last = [(round(box[0][1]), round(box[0][0]), txt) for box, txt, sc in sorted(r or [], key=lambda z: (z[0][0][1], z[0][0][0])) if float(sc) > .6]
    res.append({"t": t, "items": last})
json.dump(res, open(out, "w")); print(out, n, "ocr calls of", i)
