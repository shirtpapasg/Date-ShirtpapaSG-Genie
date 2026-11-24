"""check_shorts.py: check every Short made by make_short.py and make its previews.
    python3 check_shorts.py [names...]      (default: film1_short film2_short film3_short and the *_short60 ad cuts)
For each: decodes end to end (errors counted), frame count and stream durations (A/V within one frame), the audio's offset
against the film it came from (cross-correlation in each kept range: 0 ms = in sync), loudness (EBU R128 integrated, true
peak), then a 720 x 1280 preview under 15 MB and a contact sheet (one frame every 3 s) in the scratchpad. Prints a table."""
import json, os, re, subprocess, sys, importlib.util
import numpy as np
from PIL import Image, ImageDraw

H = os.path.dirname(os.path.abspath(__file__)); REV = os.path.join(H, '..', 'revoice')
SCR = os.environ.get('SHORTS_SCRATCH', '/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/shorts')
FPS = 60
def run(cmd): return subprocess.run(cmd, capture_output=True, text=True)
def pcm(f, ss, d, sr=8000):
    b = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{ss:.3f}', '-t', f'{d:.3f}', '-i', f, '-ac', '1', '-ar', str(sr), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(b, np.float32)
def lag_ms(a, b, sr=8000, maxlag=0.12):
    n = min(len(a), len(b)); a, b = a[:n] - a[:n].mean(), b[:n] - b[:n].mean(); m = int(maxlag * sr)
    c = [np.dot(a[max(0, k):n + min(0, k)], b[max(0, -k):n - max(0, k)]) for k in range(-m, m + 1)]
    return (int(np.argmax(c)) - m) / sr * 1000

def plan(n):
    s = importlib.util.spec_from_file_location('p', os.path.join(H, f'plan_film{n}.py')); p = importlib.util.module_from_spec(s); s.loader.exec_module(p); return p

names = sys.argv[1:] or [f'film{n}_short{c}' for n in (1, 2, 3) for c in ('', '60')]
rows = []
for name in names:
    f = os.path.join(H, name + '.mp4')
    if not os.path.exists(f): print('missing', f); continue
    n = int(re.search(r'film(\d)', name).group(1)); src = os.path.join(REV, f'film{n}_v2.mp4'); cut = name.endswith('60')
    pr = json.loads(run(['ffprobe', '-v', 'error', '-count_frames', '-show_entries', 'stream=codec_name,profile,width,height,r_frame_rate,nb_read_frames,duration,bit_rate,sample_rate,channels',
                         '-show_entries', 'format=duration,size', '-of', 'json', f]).stdout)
    v = next(s for s in pr['streams'] if s['codec_name'] == 'h264'); a = next(s for s in pr['streams'] if s['codec_name'] == 'aac')
    dec = run(['ffmpeg', '-v', 'error', '-i', f, '-f', 'null', '-']); errs = len([l for l in dec.stderr.splitlines() if l.strip()])
    eb = run(['ffmpeg', '-hide_banner', '-nostats', '-i', f, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', eb)[-1]); TP = float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', eb)[-1])
    # A/V sync: the Short's sound against the film's own sound, in the middle of each kept range
    P = plan(n); keep = [(round(x * FPS) / FPS, round(y * FPS) / FPS) for x, y in P.CUT] if cut else [(0, float(v['duration']))]
    lags, o = [], 0.0
    for (x, y) in keep:
        mid = (y - x) / 2; d = min(4.0, (y - x) - 0.4)
        if d > 1: lags.append(lag_ms(pcm(f, o + mid - d / 2, d), pcm(src, x + mid - d / 2, d)))
        o += y - x
    rows.append(dict(name=name, res=f"{v['width']}x{v['height']}", fps=v['r_frame_rate'], prof=v['profile'], frames=int(v['nb_read_frames']),
                     vdur=float(v['duration']), adur=float(a['duration']), size=int(pr['format']['size']) / 1e6, errs=errs, I=I, TP=TP,
                     lag=max(lags, key=abs) if lags else None, abr=int(a.get('bit_rate', 0)) // 1000))
    # 720 x 1280 preview, capped well under 15 MB
    prev = os.path.join(SCR, name + '_720.mp4'); vdur = float(v['duration']); kbps = int(min(1400, 13.5 * 8e3 / vdur - 96))
    run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-vf', 'scale=720:1280:flags=lanczos', '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'medium',
         '-b:v', f'{kbps}k', '-maxrate', f'{kbps}k', '-bufsize', f'{2 * kbps}k', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', prev])
    rows[-1]['prev'] = os.path.getsize(prev) / 1e6
    # contact sheet: one frame every 3 s
    ts = list(np.arange(0, vdur - 0.05, 3.0)); tw, th = 216, 384; cols = 10
    sheet = Image.new('RGB', (cols * (tw + 4), ((len(ts) + cols - 1) // cols) * (th + 4)), 'white')
    for k, t in enumerate(ts):
        b = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', f, '-frames:v', '1', '-vf', f'scale={tw}:{th}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
        im = Image.frombytes('RGB', (tw, th), b); d = ImageDraw.Draw(im); d.rectangle([0, 0, 40, 13], fill='black'); d.text((2, 1), f'{int(t)//60}:{int(t)%60:02d}', fill='yellow')
        sheet.paste(im, ((k % cols) * (tw + 4), (k // cols) * (th + 4)))
    sheet.save(os.path.join(SCR, name + '_contact.jpg'), quality=85)
print(f"{'file':16} {'res':9} {'fps':5} {'frames':>6} {'video s':>8} {'audio s':>8} {'MB':>6} {'dec err':>7} {'LUFS':>6} {'TP dB':>6} {'A/V ms':>6} {'aac k':>5} {'720p MB':>7}")
for r in rows:
    print(f"{r['name']:16} {r['res']:9} {r['fps']:5} {r['frames']:6d} {r['vdur']:8.3f} {r['adur']:8.3f} {r['size']:6.1f} {r['errs']:7d} {r['I']:6.1f} {r['TP']:6.1f} {r['lag']:6.1f} {r['abr']:5d} {r['prev']:7.1f}")
json.dump(rows, open(os.path.join(SCR, 'checks.json'), 'w'), indent=1)
