"""align_words.py: word times for the Shorts' captions, from the clean per-line voice files that mix.py placed in film<N>_v2.mp4.
Each line's voice (revoice/voice/f<N>_<k>.wav, or f<N>_<k>_<j>.wav per part) was put at new_start / part_starts at tempo 1.0,
so a word's time in the film = that placement + the word's time in its own file (faster-whisper small.en, word stamps).
    <venv with faster-whisper>/bin/python align_words.py 1 2 3   -> words_film<N>.json"""
import json, os, sys, re, subprocess, numpy as np
from faster_whisper import WhisperModel
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(H, '..', 'revoice')
m = WhisperModel('small.en', device='cpu', compute_type='int8')
def load(f):   # 16 kHz mono float32 via ffmpeg (the venv's PyAV is too old for faster-whisper's own loader)
    return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32)
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower())
for N in sys.argv[1:]:
    J = json.load(open(f'{R}/lines_film{N}.json')); out = []
    for k, ln in enumerate(J['lines']):
        parts = ln.get('parts') or [[ln['text'], ln['start']]]
        starts = ln.get('part_starts') or [ln['new_start']]
        assert abs(ln.get('tempo', 1) - 1) < 1e-3, 'tempo != 1: stretch the stamps'
        words = []
        for j, (text, _) in enumerate(parts):
            f = f'{R}/voice/f{N}_{k:02d}.wav' if len(parts) == 1 else f'{R}/voice/f{N}_{k:02d}_{j}.wav'
            segs, _ = m.transcribe(load(f), word_timestamps=True, language='en', initial_prompt=text, beam_size=5)
            heard = [w for s in segs for w in s.words]
            # the caption's own words, each given the time of the matching heard word (in order); gaps are interpolated
            mine = text.split(); times = [None] * len(mine); h = 0
            for i, w in enumerate(mine):
                for q in range(h, min(h + 3, len(heard))):
                    if norm(heard[q].word) and (norm(heard[q].word) == norm(w) or norm(w).startswith(norm(heard[q].word)) or norm(heard[q].word).startswith(norm(w))):
                        times[i] = (starts[j] + heard[q].start, starts[j] + heard[q].end); h = q + 1; break
            t0, t1 = starts[j], (ln['new_end'] if j == len(parts) - 1 else starts[j + 1] - .1)
            for i in range(len(mine)):      # fill unmatched words evenly between their neighbours
                if times[i] is None:
                    a = times[i - 1][1] if i and times[i - 1] else t0
                    nb = next((times[q][0] for q in range(i + 1, len(mine)) if times[q]), t1)
                    gap = [q for q in range(i, len(mine)) if times[q] is None and all(times[r] is None for r in range(i, q + 1))]
                    step = (nb - a) / (len(gap)); times[i] = (a, a + step)
                words.append({'w': mine[i], 's': round(times[i][0], 3), 'e': round(times[i][1], 3)})
            print(N, k, j, ' '.join(f"{w['w']}@{w['s']:.2f}" for w in words[-len(mine):]), '| heard:', ''.join(x.word for x in heard))
        out.append({'speaker': ln['speaker'], 'text': ln['text'], 'start': ln['new_start'], 'end': ln['new_end'], 'words': words})
    json.dump({'film': int(N), 'lines': out}, open(f'{H}/words_film{N}.json', 'w'), indent=1)
