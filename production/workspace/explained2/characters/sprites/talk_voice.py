"""talk_voice.py: the buddies' lines with the Character Voice Kit voices (voice_maker.py, copied from the kit) + lip-sync tracks.
  /home/user/heart-tts/venv/bin/python talk_voice.py
Writes voice/<id>.wav (48 kHz mono, about -16 LUFS by RMS) and voice/<id>.json:
  {fps, dur, open: loudness envelope 0..1 per frame (motion_test/make_voice.py's envelope()), mouth: 0/1/2 per frame
   (closed/half/wide, with hysteresis and a minimum hold), stress: [times of the stressed syllables, s]}"""
import os, sys, json, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H); sys.path.insert(0, os.path.join(H, "..", "..", "motion_test"))
FPS = 30; D = "/home/user/heart-tts"
LINES = {  # id: (character, text)
  "basil1": ("basil", "Living! It moves, so it's living!"),
  "basil2": ("basil", "Aww. So moving is not the clue!"),
  "pip1": ("pip", "Non-living. I saw you wind it up, Basil."),
  "momo1": ("momo", "Non-living. Does it ever get hungry?"),
}

def envelope(x, sr, fps=FPS):
    """the envelope from motion_test/make_voice.py (same maths; that file runs its TTS on import, so the function lives here too)"""
    hop = sr // fps; n = int(np.ceil(len(x) / hop)); x = np.concatenate([x, np.zeros(n * hop - len(x) + hop)])
    rms = []
    for i in range(n):
        w = x[max(0, i * hop - hop // 2): i * hop + hop + hop // 2]; rms.append(np.sqrt(np.mean(w ** 2) + 1e-12))
    rms = np.array(rms); db = 20 * np.log10(rms + 1e-9); top = np.percentile(db[db > -55], 95) if (db > -55).any() else -20
    lv = np.clip((db - (top - 26)) / 26, 0, 1); gate = lv > .18; raw = np.where(gate, lv ** .8, 0)
    op = np.zeros(n); v = 0.0
    for i in range(n):
        tgt = raw[i]; v = v + (tgt - v) * (.85 if tgt > v else .42); op[i] = v
    return np.where(op < .06, 0, op), lv

def level(x, sr, op, fps=FPS):
    """how wide: the plain (linear) loudness per frame against the line's loud syllables, gated by the envelope above.
    The dB envelope says WHEN he is speaking; the linear one keeps the dips between syllables, so the mouth works."""
    hop = sr // fps; n = len(op); x = np.concatenate([x, np.zeros((n + 2) * hop)])
    r = np.array([np.sqrt(np.mean(x[max(0, i * hop - hop // 4): i * hop + hop + hop // 4] ** 2)) for i in range(n)])
    r = np.clip(r / np.percentile(r[r > 1e-4], 92), 0, 1); out = np.zeros(n); v = 0.0
    for i in range(n): v = r[i] if r[i] > v else v + (r[i] - v) * .85; out[i] = v * (op[i] > 0)
    return out

def mouth_track(op, up=(.20, .62), down=(.11, .45), hold=2):
    """closed/half/wide per frame. Hysteresis: a level opens at `up` and only closes again below `down`; and a state is kept
    for at least `hold` frames, so the mouth never flickers. Purely a function of the audio."""
    st, since, out = 0, 99, []
    for v in op:
        want = st
        if st == 0: want = 2 if v > up[1] else (1 if v > up[0] else 0)
        elif st == 1: want = 2 if v > up[1] else (0 if v < down[0] else 1)
        else: want = (0 if v < down[0] else 1) if v < down[1] else 2
        if want != st and (since >= hold or (want == 0 and v == 0 and since >= 2)): st, since = want, 0
        since += 1; out.append(st)
    # no single-frame visits
    for i in range(1, len(out) - 1):
        if out[i - 1] == out[i + 1] != out[i]: out[i] = out[i - 1]
    return out

def stresses(lv, fps=FPS, min_gap=.22):
    """stressed syllables = the local peaks of the loudness, at least min_gap apart, loudest first"""
    s = np.convolve(lv, np.ones(3) / 3, "same"); pk = [i for i in range(1, len(s) - 1) if s[i] >= s[i - 1] and s[i] > s[i + 1] and s[i] > .62]
    keep = []
    for i in sorted(pk, key=lambda i: -s[i]):
        if all(abs(i - j) >= min_gap * fps for j in keep): keep.append(i)
    return [round(i / fps, 3) for i in sorted(keep)]

if __name__ == "__main__":
    import voice_maker as vm
    os.makedirs(f"{H}/voice", exist_ok=True); k = None
    for id, (ch, text) in LINES.items():
        f = f"{H}/voice/{id}.wav"
        if not os.path.exists(f):
            k = k or vm.load(D + "/kokoro.onnx", D + "/voices.bin")
            x, sr = vm.speak(k, text, dict(vm.CHARACTERS[ch]), gap=.16, para_gap=0)
            idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
            sp = x[np.abs(x) > .003]; x = np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98)
            if sr != 48000:
                n = int(len(x) * 48000 / sr); x = np.interp(np.arange(n) * sr / 48000, np.arange(len(x)), x); sr = 48000
            sf.write(f, x.astype(np.float32), sr, subtype="PCM_16")
        x, sr = sf.read(f); op, lv = envelope(x, sr); lvl = level(x, sr, op); m = mouth_track(lvl)
        json.dump({"fps": FPS, "dur": round(len(x) / sr, 3), "text": text, "open": [round(float(v), 3) for v in op], "level": [round(float(v), 3) for v in lvl], "mouth": m, "stress": stresses(lv)}, open(f"{H}/voice/{id}.json", "w"))
        print(id, round(len(x) / sr, 2), "s  mouth:", "".join(".oO"[q] for q in m), " stress", stresses(lv))
