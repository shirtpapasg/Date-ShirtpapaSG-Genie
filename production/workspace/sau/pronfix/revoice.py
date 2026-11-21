"""revoice.py: re-say only the sentences of a rendered TheOneApp, Explored video that contain a name on the teacher's
pronunciation list (explained2/sg_pron.py), and put them back without touching the picture.

    python pronfix/revoice.py ep03b ep03b        (episode)      python pronfix/revoice.py ep03b short1    (a Short)

Run from workspace/sau with the heart-tts venv. For each sentence that needs_fix():
1. Heart says it again with voice.py's recipe (pronfix/heart.py) and the approved phonemes, at the segment's old level
   (the same gain voice.py gave that segment, so it sits exactly where its neighbours are).
2. It goes into the old sentence's place in <video>_voice.wav. Only silence moves: the new sentence is shifted by at most
   a few tenths of a second to centre its words on the old word timings (the burnt-in captions), into the silent gaps
   either side. It must leave >= 0.40 s before and >= 0.30 s after it, or the script stops (the slot cannot hold it).
3. The audio is mixed exactly as render_all.sh does (voice loudnorm -16 LUFS + effects at 0.5), the finished mix brought
   to -16 LUFS with one fixed gain (a delay-compensated limiter shaves any peak it would push over -1.5 dB), and muxed with the old video stream copied bit for bit
   (no re-render), under flock /tmp/explained_render.lock.
4. Checks: LUFS, video stream unchanged, duration, the audio away from the fix unchanged, the level of the new sentence.
The originals are kept next to them as *.before_pron.{mp4,wav} (not in git); a re-run starts again from them.
Writes pronfix/<ep>_<video>_report.json.
"""
import json, os, re, sys, shutil, subprocess, numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from heart import heart, needs_fix, SR
import pocketsphinx
from pocketsphinx import Decoder

ep, v = sys.argv[1], sys.argv[2]; os.chdir(os.path.join(HERE, '..'))
AUD = f"{ep}/" + {"short1": "aud_s1", "short2": "aud_s2"}.get(v, "aud"); GAP = 0.57; B = ".before_pron"
spec = json.load(open(f"{ep}/{v}_segments.json")); tl = {s['id']: s for s in json.load(open(f"{ep}/{v}_tl.json"))['segs']}
def sents(t): return [p for p in re.split(r'(?<=[.!?])\s+', t.replace('TheOneApp', 'The One App')) if p.strip()]
def keep(f):
    b = f[:-4] + B + f[-4:]
    if not os.path.exists(b): shutil.copy2(f, b)
    return b
rd = lambda f: sf.read(f)[0].astype(np.float64)

# word timings (pocketsphinx, as build_tl.py) to centre the new sentence on the old captions
DIC = set(l.split()[0].split('(')[0] for l in open(os.path.join(pocketsphinx.get_model_path(), 'en-us', 'cmudict-en-us.dict')))
EXTRA = {"pulau": "P UW L AW", "thirty-five": "TH ER T IY F AY V", "singapore's": "S IH NG AH P AO R Z"}
def words_at(x, text, semakau):
    raw = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    raw = np.interp(np.arange(0, len(raw), SR / 16000), np.arange(len(raw)), raw).astype(np.int16).tobytes()
    ws = [w for t in text.split() for w in re.findall(r"[a-z'][a-z'\-]*[a-z]|[a-z]", t.lower())]
    d = Decoder(samprate=16000, loglevel="FATAL"); ex = dict(EXTRA, semakau=semakau)
    for w in set(ws):
        if w not in DIC and w in ex: d.add_word(w, ex[w], True)
    try:
        d.set_align_text(" ".join(ws)); d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
        al = [x.start_frame / 100 for x in d.seg() if x.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
    except Exception: return None
    return al if len(al) == len(ws) else None

old_voice = rd(keep(f"{ep}/{v}_voice.wav")); track = old_voice.copy(); nz = np.abs(old_voice) > 1e-4
old_mp4 = keep(f"{ep}/{v}.mp4"); report = {"video": f"{ep}/{v}", "lines": []}
for s in spec['segments']:
    if s.get('silent'): continue
    ss = sents(s['text']); fix = [i for i, p in enumerate(ss) if needs_fix(p)]
    if not fix: continue
    W = [rd(keep(f"{AUD}/sent/{s['id']}_{i:02d}.wav")) for i in range(len(ss))]
    parts = []
    for x in W: parts += [x, np.zeros(int(SR * GAP))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]; g = 10 ** (-21.7 / 20) / np.sqrt(np.mean(sp ** 2))
    if s.get('excited'): sys.exit(f"{s['id']}: an excited segment, not handled here")
    seg_old = rd(keep(f"{AUD}/{s['id']}.wav"))
    assert len(seg_old) == len(x) and np.max(np.abs(np.clip(x * g, -.98, .98) - seg_old)) < 1e-4, "sentence files do not rebuild the segment"
    # where the segment sits in the voice track (build_tl rounds t0 to the millisecond: search +-60 ms)
    g0 = int(tl[s['id']]['t0'] * SR); n = len(seg_old)
    off = min(range(g0 - 1440, g0 + 1440), key=lambda o: np.sum((old_voice[o:o + n] - seg_old) ** 2))
    assert np.max(np.abs(old_voice[off:off + n] - seg_old)) < 1e-4, "segment not found in the voice track"
    pos = off; W2 = list(W)
    for i in range(len(ss)):
        if i in fix:
            new = heart(ss[i]).astype(np.float64); a, b = pos, pos + len(W[i])
            prev_end = np.flatnonzero(nz[:a])[-1] + 1 if nz[:a].any() else 0
            nxt = np.flatnonzero(nz[b:]); next_start = b + nxt[0] if len(nxt) else len(track)
            wo, wn = words_at(W[i], ss[i], "S EH M AH K AW"), words_at(new, ss[i], "S ER M AA K AW")
            if wo and wn:
                dr = [y - z for z, y in zip(wo, wn)]; o = -(max(dr) + min(dr)) / 2
            else: dr, o = None, 0.0
            lo, hi = prev_end + int(.40 * SR), next_start - int(.30 * SR) - len(new)   # allowed start samples
            if hi < lo: sys.exit(f"{s['id']} sentence {i}: the slot cannot hold the new line ({len(new) / SR:.2f} s); re-time needed")
            st = int(np.clip(a + o * SR, lo, hi))
            track[a:b] = 0; track[st:st + len(new)] = np.clip(new * g, -.98, .98)
            lev = lambda y: 20 * np.log10(np.sqrt(np.mean(y[np.abs(y) > 0.003] ** 2)))
            others = [lev(W[j] * g) for j in range(len(ss)) if j not in fix]
            ln = {"segment": s['id'], "sentence": i, "text": ss[i], "t_old": round(a / SR, 3), "t_new": round(st / SR, 3),
                  "dur_old": round(len(W[i]) / SR, 3), "dur_new": round(len(new) / SR, 3),
                  "silence_before": round((st - prev_end) / SR, 3), "silence_after": round((next_start - st - len(new)) / SR, 3),
                  "caption_drift_s": None if dr is None else [round(float(min(dr) + (st - a) / SR), 3), round(float(max(dr) + (st - a) / SR), 3)],
                  "speech_dB_new": round(float(lev(new * g)), 2), "speech_dB_old": round(float(lev(W[i] * g)), 2),
                  "speech_dB_same_segment": [round(float(z), 2) for z in others]}
            report['lines'].append(ln); print(json.dumps(ln, ensure_ascii=False))
            W2[i] = new.astype(np.float32); sf.write(f"{AUD}/sent/{s['id']}_{i:02d}.wav", W2[i], SR)
        pos += len(W[i]) + int(SR * GAP)
    parts = []
    for x in W2: parts += [x, np.zeros(int(SR * GAP))]
    sf.write(f"{AUD}/{s['id']}.wav", np.clip(np.concatenate(parts[:-1]) * g, -.98, .98).astype(np.float32), SR, subtype='PCM_16')
if not report['lines']: sys.exit("nothing to fix in " + v)
sf.write(f"{ep}/{v}_voice.wav", track.astype(np.float32), SR, subtype='PCM_16')

# mix as render_all.sh, video copied from the old render
MIX = ("[1:a]aresample=48000,loudnorm=I=-16:TP=-1.5,aresample=48000[v];[2:a]aresample=48000,volume=0.5[s];"
       "[v][s]amix=inputs=2:duration=first:normalize=0,aformat=sample_rates=48000:channel_layouts=stereo[a]")
# render_all's mix lands between -16 and -18 LUFS (the effects are added after the voice is levelled), so the finished
# mix is then brought to -16 LUFS with one fixed gain; if that would push a peak over -1.5 dB, a limiter (delay compensated)
# shaves just those peaks. Checked below: LUFS, sync, and that away from the fix the audio is the old one times that gain.
IN = ["-i", old_mp4, "-i", f"{ep}/{v}_voice.wav", "-i", f"{ep}/{v}_sfx.wav"]
def ln_json(err): return json.loads(err[err.rindex('{'):err.rindex('}') + 1])
m1 = ln_json(subprocess.run(["ffmpeg", "-nostats", "-hide_banner"] + IN + ["-filter_complex", MIX + ";[a]loudnorm=I=-16:TP=-1.5:LRA=50:print_format=json[o]",
                            "-map", "[o]", "-f", "null", "-"], capture_output=True, text=True).stderr)
G = -16 - float(m1['input_i']); LIM = float(m1['input_tp']) + G > -1.5
FIN = f"{MIX};[a]volume={G:.2f}dB" + (f",alimiter=limit={10 ** (-1.7 / 20):.4f}:attack=2:release=60:level=false:latency=true" if LIM else "") + "[o]"
r2 = subprocess.run(["flock", "/tmp/explained_render.lock", "ffmpeg", "-loglevel", "error", "-y"] + IN + ["-filter_complex", FIN,
                     "-map", "0:v", "-map", "[o]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", f"{ep}/{v}.mp4"],
                    capture_output=True, text=True)
assert r2.returncode == 0, r2.stderr[-2000:]
report['final_gain'] = {"mix_before_gain_LUFS": float(m1['input_i']), "mix_true_peak": float(m1['input_tp']), "gain_dB": round(G, 2), "peak_limiter": LIM}

# checks
def lufs(f):
    e = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-map", "0:a", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", e)[-1])
def vmd5(f): return subprocess.check_output(["ffmpeg", "-loglevel", "error", "-i", f, "-map", "0:v", "-c", "copy", "-f", "md5", "-"], text=True).strip()
def probe(f): return json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,duration,start_time", "-of", "json", f]))['streams']
def pcm(f): return np.frombuffer(subprocess.check_output(["ffmpeg", "-loglevel", "error", "-i", f, "-map", "0:a", "-ac", "1", "-ar", "48000", "-f", "f32le", "-"]), np.float32)
new_mp4 = f"{ep}/{v}.mp4"; A, Bn = pcm(old_mp4), pcm(new_mp4); m = min(len(A), len(Bn))
mask = np.ones(m, bool)
for ln in report['lines']:
    a = int((min(ln['t_old'], ln['t_new']) - 3) * 48000); b = int((max(ln['t_old'] + ln['dur_old'], ln['t_new'] + ln['dur_new']) + 3) * 48000)
    mask[max(a, 0):b] = False
Am, Bm = A[:m][mask].astype(np.float64), Bn[:m][mask].astype(np.float64); k_ = np.dot(Am, Bm) / np.dot(Bm, Bm)
r = Am - k_ * Bm                                    # away from the fix the new mix is the old one times one fixed gain
c0 = int(10 * 48000); cc = [np.dot(A[c0:c0 + 480000], Bn[c0 + l:c0 + l + 480000]) for l in range(-480, 481)]   # sync: best lag
win = lambda X, t0, t1: float(20 * np.log10(np.sqrt(np.mean(X[int(t0 * 48000):int(t1 * 48000)].astype(np.float64) ** 2)) + 1e-9))
for ln in report['lines']:     # in the final mix: the new sentence vs the old one, and the 4 s of speech either side, old vs new
    ln['mix_dB_new_sentence'] = round(win(Bn, ln['t_new'], ln['t_new'] + ln['dur_new']), 2)
    ln['mix_dB_old_sentence'] = round(win(A, ln['t_old'], ln['t_old'] + ln['dur_old']), 2)
    ln['mix_dB_neighbours_old_new'] = [round(win(A, ln['t_old'] - 4.5, ln['t_old'] - .5), 2), round(win(Bn, ln['t_old'] - 4.5, ln['t_old'] - .5), 2),
                                       round(win(A, ln['t_new'] + ln['dur_new'] + .5, ln['t_new'] + ln['dur_new'] + 4.5), 2),
                                       round(win(Bn, ln['t_new'] + ln['dur_new'] + .5, ln['t_new'] + ln['dur_new'] + 4.5), 2)]
report['checks'] = {"lufs_old": lufs(old_mp4), "lufs_new": lufs(new_mp4), "video_stream_identical": vmd5(old_mp4) == vmd5(new_mp4),
                    "streams_old": probe(old_mp4), "streams_new": probe(new_mp4),
                    "audio_away_from_fix_residual_dB": round(float(10 * np.log10(np.mean(r ** 2) / np.mean(Am ** 2))), 1),
                    "fixed_gain_dB": round(float(-20 * np.log10(k_)), 2), "audio_lag_ms": (int(np.argmax(cc)) - 480) / 48}
print(json.dumps(report['final_gain'])); print(json.dumps(report['checks']))
json.dump(report, open(os.path.join(HERE, f"{ep}_{v}_report.json"), "w"), indent=1, ensure_ascii=False)
