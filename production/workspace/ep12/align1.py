import json, re, wave, subprocess, os, pocketsphinx
S = os.path.dirname(os.path.abspath(__file__))
segs = json.load(open(S + "/../p4/ep12_segments.json"))
dic = set(l.split()[0].split('(')[0] for l in open(os.path.join(pocketsphinx.get_model_path(), 'en-us', 'cmudict-en-us.dict')))
from pocketsphinx import Decoder
out = []
for s in segs:
    toks = s["text"].split()
    spoken = []  # (tokidx, word)
    for i, t in enumerate(toks):
        t2 = t.replace("TheOneApp", "the one app")
        for w in re.findall(r"[a-z']+", t2.lower()): spoken.append((i, w))
    oov = sorted(set(w for _, w in spoken if w not in dic))
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{S}/aud/{s['id']}.wav", "-ar", "16000", "-ac", "1", f"{S}/aud/{s['id']}_16k.wav"], check=True)
    d = Decoder(samprate=16000, loglevel="FATAL")
    extra = {"whoosh": "W UW SH", "windpipe": "W IH N D P AY P", "nai": "N AY", "bai": "B AY", "pandan": "P AE N D AE N", "hibiscus": "HH AY B IH S K AH S", "labelling": "L EY B AH L IH NG", "baobab": "B EY OW B AE B", "creepers": "K R IY P ER Z", "creeper": "K R IY P ER", "toothache": "T UW TH EY K", "undigested": "AH N D AY JH EH S T IH D", "kangkong": "K AA NG K AO NG", "litre": "L IY T ER", "tare": "T EH R"}
    for w in oov:
        if w in extra: d.add_word(w, extra[w], True)
    d.set_align_text(" ".join(w for _, w in spoken))
    wv = wave.open(f"{S}/aud/{s['id']}_16k.wav", "rb"); data = wv.readframes(wv.getnframes())
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    al = [(x.word, x.start_frame / 100, (x.end_frame + 1) / 100) for x in d.seg() if x.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
    ok = len(al) == len(spoken)
    tw = {}
    for (ti, w), (aw, a, b) in zip(spoken, al):
        if ti not in tw: tw[ti] = [a, b]
        else: tw[ti][1] = b
    out.append({"id": s["id"], "scene": s["scene"], "words": [{"t": t, "a": tw.get(i, [None])[0], "b": tw.get(i, [None, None])[1]} for i, t in enumerate(toks)]})
    print(s["id"], "OOV", oov, "aligned", len(al), "/", len(spoken), "OK" if ok else "MISMATCH")
json.dump(out, open(S + "/align_ep12.json", "w"))
