import json, re, wave, sys
from pocketsphinx import Decoder
scripts = json.load(open("scripts.json"))
out = {}
for k, t in scripts.items():
    d = Decoder(samprate=16000, loglevel="FATAL")
    d.add_word("kalimantan", "K AE L IH M AE N T AE N", True)
    d.add_word("smoulders", "S M OW L D ER Z", True)
    text = " ".join(re.findall(r"[a-z']+", t.lower()))
    d.set_align_text(text)
    w = wave.open(f"asr/{k}.wav", "rb"); data = w.readframes(w.getnframes())
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    words = [(s.word, s.start_frame / 100, (s.end_frame + 1) / 100) for s in d.seg() if s.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
    hyp = d.hyp()
    out[k] = words
    print(k, "aligned", len(words), "score", hyp.score if hyp else None)
    print("  ", " ".join(f"{w}@{a:.1f}" for w, a, b in words))
json.dump(out, open("align.json", "w"))
