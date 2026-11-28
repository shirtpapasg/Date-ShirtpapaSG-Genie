import cv2, numpy as np, sys
sys.path.insert(0,'.'); from cutout import on
seams=np.load('work/seams.npy',allow_pickle=True).item()
def crop(s,seam=False,box=(380,120,900,540),z=2):
    im=on(cv2.imread(f'basil_sit_{s}.png',-1)); 
    if seam:
        for q in seams:
            if s.startswith(q): cv2.polylines(im,[np.int32(seams[q])],True,(0,255,255),1)
    x0,y0,x1,y1=box; return cv2.resize(im[y0:y1,x0:x1],None,fx=z,fy=z,interpolation=cv2.INTER_CUBIC)
for s in sys.argv[1:]:
    cv2.imwrite(f'qa/z_{s}.png',crop(s)); 
cv2.imwrite('qa/z_seams.png',np.hstack([crop('half',True,z=1),crop('wide',True,z=1)]))
