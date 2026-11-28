"""pron_check.py (P4 EP3): measures which pronunciation each clip in /dev/shm/p4ep03/pron carries: pocketsphinx makes a forced choice between two spellings
(a JSGF grammar of the two) and lists the phones it hears (allphone); a child / robot voice is first moved to an adult range (Praat Change gender).
Files named ep_<word>_<line>_<n>.wav are the episode's own uses (cut from voice/<line>.wav by their word times)."""
import os, sys, wave, subprocess, tempfile
from pocketsphinx import Decoder, get_model_path
MP = get_model_path(); D = "/dev/shm/p4ep03/pron"
VAR = {"pandan": {"PAN-dun (Kokoro)": "P AE N D AH N", "PAHN-dahn (Singapore)": "P AA N D AA N"},
       "hibiscus": {"HIB-is-kus (Kokoro)": "HH IH B IH S K AH S", "hy-BIS-kus (dictionary)": "HH AY B IH S K AH S"},
       "jagged": {"JAG-id (adjective)": "JH AE G IH D", "JAGD (one syllable)": "JH AE G D"}}
def norm(path):
    # a child or robot voice is moved to an adult range first (Praat "Change gender": formants x.86, pitch median 150 Hz), so the adult
    # acoustic model hears the vowels; the phonemes themselves are not changed
    import parselmouth, soundfile as sf
    from parselmouth.praat import call
    s = parselmouth.Sound(path); f0 = call(s.to_pitch(), "Get quantile", 0, 0, .5, "Hertz")
    if f0 and f0 == f0 and f0 > 180: s = call(s, "Change gender", 75, 600, .86, 150, 1.0, 1.0)
    t = tempfile.mktemp(suffix=".wav"); s.save(t, "WAV"); return t
def raw16(path):
    path = norm(path); t = tempfile.mktemp(suffix=".wav"); subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", path, "-af", "adelay=300,apad=pad_dur=0.3", "-ar", "16000", "-ac", "1", t], check=True)
    w = wave.open(t, "rb"); r = w.readframes(w.getnframes()); os.remove(t); return r
def choose(word, path):
    dic = tempfile.mktemp(suffix=".dict"); open(dic, "w").write("".join(f"v{i} {p}\n" for i, p in enumerate(VAR[word].values())))
    gram = tempfile.mktemp(suffix=".gram"); open(gram, "w").write("#JSGF V1.0;\ngrammar g;\npublic <s> = " + " | ".join(f"v{i}" for i in range(len(VAR[word]))) + ";\n")
    d = Decoder(hmm=os.path.join(MP, "en-us", "en-us"), dict=dic, jsgf=gram, loglevel="FATAL", samprate=16000)
    d.start_utt(); d.process_raw(raw16(path), full_utt=True); d.end_utt(); h = d.hyp()
    return list(VAR[word].keys())[int(h.hypstr[1:])] if h and h.hypstr else "?"
def allphone(path):
    d = Decoder(hmm=os.path.join(MP, "en-us", "en-us"), allphone=os.path.join(MP, "en-us", "en-us-phone.lm.bin"), lw=2.0, beam=1e-20, pbeam=1e-20, loglevel="FATAL", samprate=16000)
    d.start_utt(); d.process_raw(raw16(path), full_utt=True); d.end_utt(); return " ".join(s.word for s in d.seg() if s.word not in ("SIL", "+SPN+", "+NSN+"))
if __name__ == "__main__":
  for f, w in [("word_pandan_before.wav", "pandan"), ("word_pandan_after.wav", "pandan"), ("word_hibiscus_before.wav", "hibiscus"), ("word_hibiscus_after.wav", "hibiscus"), ("word_jagged_own.wav", "jagged")] + [(x, x.split("_")[1]) for x in sorted(os.listdir(D)) if x.startswith("ep_")]:
      p = os.path.join(D, f); print(f"{f:32s} heard as: {choose(w, p):26s} phones: {allphone(p)}")
