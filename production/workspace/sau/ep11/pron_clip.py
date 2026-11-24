"""ep11/pron_clip.py: the new-words test clip for the teacher (explained2/pron_clips/Heart_explored11_new_words.mp3).
Sentences 1-8 are cut from EP11's own recorded lines (ep11/aud/sent, made by voice.py); 9 and 10 are a test sentence for the
map label Tampines, before (Kokoro's own) and after the sg_pron fix, made with voice.py's recipe. 1.2 s between sentences.
    /home/user/heart-tts/venv/bin/python ep11/pron_clip.py      (from workspace/sau)"""
import os, sys, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
from kokoro_onnx import Kokoro
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(H, '..', '..', 'explained2'))
from sg_pron import speak_line
SR = 24000; A = os.path.join(H, 'aud', 'sent')
CUT = [("gpu_00", "Nvidia's famous chips are called GPUs, graphics processing units."),
       ("news_01", "Its founder, Jensen Huang, stepped down as its boss for a short time."),
       ("news_02", "Then, eleven days later, he came back as CEO."),
       ("hall_00", "An ordinary computer brain, a CPU, is like one very clever teacher, solving sums one after another."),
       ("switches_00", "A chip is made of tiny switches called transistors."),
       ("melt_00", "Sand is mostly silica, made of silicon and oxygen."),
       ("wafer_00", "You are sliced into thin round plates called wafers, thinner than a coin, and polished until you shine like a mirror."),
       ("where_00", "Nvidia designs its chips in the United States, and factories in Taiwan build the newest ones.")]
TEST = "Woodlands and Tampines are in Singapore."
D = os.environ.get('KOKORO_DIR', '/home/user/heart-tts'); k = Kokoro(D + '/kokoro.onnx', D + '/voices.bin')
def heart(a):   # voice.py's recipe: pitch swing x1.6 around the median, trimmed
    x = a.astype(np.float64); snd = parselmouth.Sound(x, SR); m = call(snd, 'To Manipulation', 0.01, 120, 500); pt = call(m, 'Extract pitch tier')
    med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), 'Get quantile', 0, 0, 0.5, 'Hertz')
    call(pt, 'Formula', f'{med} * 2 ^ (1.6 * log2(self / {med}))'); call([pt, m], 'Replace pitch tier')
    x = call(m, 'Get resynthesis (overlap-add)').values[0]; i = np.where(np.abs(x) > 0.01)[0]; return x[max(0, i[0] - 120): i[-1] + 240]
clips = [(sf.read(f"{A}/{f}.wav")[0], s) for f, s in CUT]
clips.append((heart(k.create(TEST, voice='af_heart', speed=0.94, lang='en-us')[0]), TEST + " (BEFORE: Kokoro's own 'TAM-pines'; test line, EP11 only shows the name on its map)"))
clips.append((heart(speak_line(k, TEST, voice='af_heart', speed=0.94)[0]), TEST + " (AFTER: sg_pron fix 'TAM-pin-ees')"))
out, t, rows = [np.zeros(int(SR * .4))], .4, []
for x, s in clips:
    x = x / max(1e-6, np.sqrt(np.mean(x[np.abs(x) > .003] ** 2))) * 10 ** (-21.7 / 20)
    rows.append((round(t, 2), s)); out += [np.clip(x, -.98, .98), np.zeros(int(SR * 1.2))]; t += len(x) / SR + 1.2
wav = '/tmp/explored11_clip.wav'; sf.write(wav, np.concatenate(out).astype(np.float32), SR)
mp3 = os.path.join(H, '..', '..', 'explained2', 'pron_clips', 'Heart_explored11_new_words.mp3')
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav, '-codec:a', 'libmp3lame', '-b:a', '96k', mp3], check=True); os.remove(wav)
for i, (t, s) in enumerate(rows, 1): print(f"| {i} | {t:.2f} s | {s} |")
