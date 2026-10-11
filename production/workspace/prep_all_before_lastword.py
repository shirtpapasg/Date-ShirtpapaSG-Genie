"""Add welcome intro + spoken goodbye + word fixes to P4 episodes. usage: python3 prep_all.py 1 2 3 ..."""
import json, os, re, shutil, subprocess, sys
S = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, S)
TTS = S + "/tts"

# (icon, on-screen label, spoken phrase) x3 per episode
GOALS = {
 1: [("⚙️", "What a system is", "what a system is"), ("🔧", "The function of each part", "what the function of each part means"), ("⚠️", "What happens when one part fails", "what happens when one part fails")],
 2: [("🍃", "What leaves do", "what leaves do"), ("🌿", "What the stem does", "what the stem does"), ("🥕", "What roots do", "what roots do")],
 3: [("🍃", "The 4 parts of a leaf", "the four parts of a leaf"), ("🌿", "Parallel and net veins", "parallel veins and net veins"), ("🔍", "How leaves are different", "how leaves can be different")],
 4: [("🌵", "Different kinds of stems", "different kinds of stems"), ("🦸", "Plants with superpowers", "plants with amazing superpowers"), ("🍠", "Different kinds of roots", "different kinds of roots")],
 5: [("🧩", "Why scientists use models", "why scientists use models"), ("🫁", "5 systems in your body", "the five systems in your body"), ("❤️", "What each system does", "what each system does")],
 6: [("🍎", "What digestion is", "what digestion is"), ("😋", "How the mouth starts it", "how your mouth starts digestion"), ("🥣", "The gullet and stomach", "what the gullet and stomach do")],
 7: [("🏁", "Where digestion ends", "where digestion ends"), ("🩸", "How food enters the blood", "how digested food gets into your blood"), ("🥦", "What the large intestine does", "what the large intestine does")],
 8: [("⚖️", "What matter is", "what matter is"), ("📏", "Mass and volume", "what mass and volume mean"), ("🎈", "Is air matter?", "how to prove that air is matter")],
 9: [("🧊", "What a solid is", "what a solid is"), ("💧", "What a liquid is", "what a liquid is"), ("💨", "What a gas is", "what a gas is, and which one can be squeezed")],
 10: [("⚖️", "Kilograms and grams", "kilograms and grams"), ("📟", "How to use a balance", "how to use an electronic balance"), ("🏀", "How to weigh air", "how to weigh air")],
 11: [("📦", "What volume is", "what volume is"), ("🧪", "Using a measuring cylinder", "how to use a measuring cylinder"), ("🪨", "The volume of a rock", "how to find the volume of a rock")],
 12: [("💡", "What a hypothesis is", "what a hypothesis is"), ("⚖️", "How to do a fair test", "how to do a fair test"), ("🔁", "When results surprise you", "what to do when results surprise you")],
 13: [("⚡", "What energy is", "what energy is"), ("💡", "What a light source is", "what a source of light is"), ("☀️", "Natural and man-made sources", "natural and man-made sources of light")],
 14: [("👀", "How we see", "how we see"), ("💡", "Seeing light sources", "how we see light sources"), ("🌙", "Why the Moon seems to shine", "why the Moon seems to shine")],
 15: [("👤", "What a shadow is", "what a shadow is"), ("➡️", "Light travels in straight lines", "how light travels"), ("🪟", "Opaque and translucent", "opaque and translucent objects")],
 16: [("🔦", "Distance from the light", "how the distance from the light matters"), ("🖼️", "Distance from the screen", "how the distance from the screen matters"), ("📐", "Predicting shadow size", "how to predict the size of a shadow")],
 17: [("🔺", "What shapes a shadow", "what decides the shape of a shadow"), ("🍦", "One cone, two shadows", "how one cone can cast two different shadows"), ("☀️", "Shadows during the day", "how shadows change during the day")],
 18: [("🌡️", "What temperature is", "what temperature is"), ("✋", "Why touch is not enough", "why your hands cannot measure it"), ("🧪", "Using thermometers", "how to use thermometers")],
 19: [("🔥", "What heat is", "what heat is"), ("🌡️", "Heat vs temperature", "how heat is different from temperature"), ("🥛", "Gaining and losing heat", "what happens when things gain or lose heat")],
 20: [("➡️", "Which way heat flows", "which way heat flows"), ("⏸️", "When heat stops flowing", "when heat stops flowing"), ("📈", "Reading a line graph", "how to read a line graph")],
 21: [("🥄", "Good conductors of heat", "good conductors of heat"), ("🪵", "Poor conductors of heat", "poor conductors of heat"), ("🧶", "How air keeps you warm", "how air keeps you warm")],
 22: [("↔️", "Expand and contract", "how things expand and contract"), ("🛣️", "Why roads have gaps", "why roads have gaps"), ("🧊", "Changes of state", "how heat changes the state of matter")],
}
SEGFIX = {2: [("roots2", "Watch out, because this trap catches lots of students.", "Here is an exam tip. Lots of students mix this up.")],
          4: [("turn", "Let's meet some plants that cheat.", "Let's meet some plants with superpowers."), ("climb", "So they cheat.", "So they use a superpower."), ("ridley", "without killing them", "without harming them")],
          14: [("myth", "Here is an exam trap.", "Here is an exam tip.")],
          18: [("hook", "Your touch is lying to you.", "Your sense of touch got mixed up!"), ("close", "So, is your touch lying? Yes,", "So, did your touch get mixed up? Yes,")]}
HTMLFIX = {6: [(open(f"{S}/mouth6_old.js").read(), open(f"{S}/mouth6_new.js").read())],
           2: [('"⚠ EXAM TRAP!"', '"💡 EXAM TIP!"')],
           3: [('"Plants that cheat:"', '"Plants with superpowers:"')],
           4: [('"font-size": 120, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 14}, "PLANTS THAT CHEAT 😎"', '"font-size": 96, "font-weight": 700, fill: "#ffe14d", class: "out", "stroke-width": 12}, "PLANTS WITH SUPERPOWERS 😎"'),
               ('a("cheat")', 'a("superpowers")'), ('a("killing")', 'a("harming")')],
           14: [('"⚠️ EXAM TRAP"', '"💡 EXAM TIP"'), ('a("trap")', 'a("tip")')],
           18: [('"🤥 Your touch is LYING!"', '"🤔 Your touch got MIXED UP!"'), ('a("lying")', 'a("mixed")')]}

def run(cmd, **kw): return subprocess.run(cmd, check=True, **kw)

def prep(n):
    NN = f"{n:02d}"; D = f"{S}/ep{n}"; B = f"{S}/bak_v1/ep{n}"; os.makedirs(B, exist_ok=True)
    voice, speed = ("af_heart", "0.88") if n % 2 else ("bm_george", "0.9")
    segp = f"{S}/p4/ep{NN}_segments.json"
    # pristine sources (backed up once)
    for f in [segp, f"{D}/ep{n}.html", f"{D}/build_tl.py", f"{D}/tl.json"]:
        dst = f"{B}/{os.path.basename(f)}"
        if not os.path.exists(dst): shutil.copy(f, dst)
    segs = json.load(open(f"{B}/ep{NN}_segments.json"))
    segs = [s for s in segs if s["id"] not in ("welcome", "bye")]
    changed = []
    for sid, a, b in SEGFIX.get(n, []):
        s = next(x for x in segs if x["id"] == sid); assert a in s["text"], (n, sid, a); s["text"] = s["text"].replace(a, b); changed.append(sid)
    G = GOALS[n]
    intro = f"Hi there, and welcome to Primary Four Science, Explained! I'm so happy you're here. Today, you will learn three big ideas. First, {G[0][2]}. Second, {G[1][2]}. And third, {G[2][2]}. Let's get started!"
    bye = "Thanks for watching! See you soon. Bye!" if n == 22 else "Thanks for watching! See you next time. Bye!"
    assert segs[0]["id"] == "hook"
    segs.insert(1, {"id": "welcome", "scene": "welcome", "text": intro})
    segs.append({"id": "bye", "scene": "end", "text": bye})
    json.dump(segs, open(segp, "w"), indent=1)
    # voice 3 for every episode: Heart, expressive (storyteller pacing + 1.6x pitch range); cached per segment text
    cache = f"{D}/aud/voice3_cache.json"; done = json.load(open(cache)) if os.path.exists(cache) else {}
    todo = [s for s in segs if done.get(s["id"]) != s["text"] or not os.path.exists(f"{D}/aud/{s['id']}.wav")]
    if todo:
        json.dump(todo, open(f"{D}/new_segs.json", "w"))
        run([f"{TTS}/venv/bin/python", "expressive_batch.py", "model_q8.onnx", "voices.npz", f"{D}/new_segs.json", f"{D}/aud", "1.6"], cwd=TTS, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for s in todo: done[s["id"]] = s["text"]
        json.dump(done, open(cache, "w"))
    byedur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"{D}/aud/bye.wav"]))
    assert byedur <= 3.15, ("bye too long", byedur)
    out = subprocess.run(["python3", "-I", "align1.py"], cwd=D, capture_output=True, text=True, check=True).stdout
    bad = [l for l in out.splitlines() if "MISMATCH" in l]; assert not bad, bad
    oov = [l for l in out.splitlines() if l.split()[0] in ["welcome", "bye"] + changed and "OOV []" not in l]
    if oov: print("  OOV note", oov)
    # digits get no timing from the aligner: borrow the neighbours' times
    alp = f"{D}/align_ep{n}.json"; al = json.load(open(alp))
    for sg in al:
        W = sg["words"]
        for i, w in enumerate(W):
            if w["a"] is None:
                prev = next((W[j]["b"] for j in range(i - 1, -1, -1) if W[j]["b"] is not None), 0.0)
                nxt = next((W[j]["a"] for j in range(i + 1, len(W)) if W[j]["a"] is not None), prev + .3)
                w["a"], w["b"] = prev, nxt
    json.dump(al, open(alp, "w"))
    # timeline builder: goodbye plays over the end card
    bt = open(f"{B}/build_tl.py").read().replace(f"{B}", D)
    bt = bt.replace('INTRO, GAP_SAME, GAP_SCENE, OUTRO = 0.5, 0.35, 0.8, 4.0', 'INTRO, GAP_SAME, GAP_SCENE, OUTRO = 0.5, 0.55, 1.0, 4.0', 1); assert 'GAP_SCENE, OUTRO = 0.5, 0.55, 1.0' in bt
    bt = bt.replace('        g = GAP_SAME if al[i-1]["scene"] == s["scene"] else GAP_SCENE\n',
                    '        g = GAP_SAME if al[i-1]["scene"] == s["scene"] else GAP_SCENE\n        if s["scene"] == "end": g = 1.2\n', 1)
    bt = bt.replace('END = round(t + OUTRO, 3)', 'END = round(segs[-1]["t0"] + 3.6 if segs[-1]["scene"] == "end" else t + OUTRO, 3)', 1)
    bt = bt.replace('    if not scenes or scenes[-1]["scene"] != s["scene"]', '    if s["scene"] == "end": continue\n    if not scenes or scenes[-1]["scene"] != s["scene"]', 1)
    if n == 18: bt = bt.replace('cues["hook"]["lying"]', 'cues["hook"]["mixed"]')
    if n == 14: bt = bt.replace('("myth", "trap", "EXAM TRAP", "#e63946")', '("myth", "tip", "EXAM TIP", "#f77f00")').replace('"EXAM TRAP"', '"EXAM TIP"')
    assert bt.count('if s["scene"] == "end"') == 2
    open(f"{D}/build_tl.py", "w").write(bt)
    run(["python3", "-I", "build_tl.py"], cwd=D, stdout=subprocess.DEVNULL)
    # page
    h = open(f"{B}/ep2_newplant.html" if n == 2 else f"{B}/ep{n}.html").read()
    for a, b in HTMLFIX.get(n, []):
        assert a in h, (n, a); h = h.replace(a, b)
    fx = f"{S}/fixes/ep{n}.json"   # per-episode layout fixes: [[old, new], ...] applied to the scene code
    if os.path.exists(fx):
        for a, b, *k in json.load(open(fx)):   # optional 3rd item: how many matches to expect (default 1)
            assert h.count(a) == (k[0] if k else 1), (n, "fix must match the expected number of times", a[:80]); h = h.replace(a, b)
    old_id = 'const id = "g" + Math.round(rnd() * 1e9);'
    assert h.count(old_id) == 1, (n, "bg id")
    h = h.replace(old_id, 'const id = "g" + Math.round(rnd() * 1e9) + "_" + (bg.n = (bg.n || 0) + 1);')
    import fit_patch; h = fit_patch.apply(h)
    cfg = "window.INTRO = " + json.dumps({"goals": [[g[0], g[1], c] for g, c in zip(G, ["first", "second", "third"])]}, ensure_ascii=False) + ";\n"
    assert "S.welcome" not in h
    h = h.replace("/* ---------- confetti", cfg + open(f"{S}/intro_scene.js").read() + "\n/* ---------- confetti", 1)
    open(f"{D}/ep{n}.html", "w").write(h)
    open(f"{D}/ep{n}b.html", "w").write(h.replace("__TL__", open(f"{D}/tl.json").read()))
    sc = f"{D}/scenes_ep{n}.js"
    if os.path.exists(sc):
        j = open(sc).read()
        for a, b in HTMLFIX.get(n, []): j = j.replace(a, b)
        open(sc, "w").write(j)
    tl = json.load(open(f"{D}/tl.json"))
    w = next(s for s in tl["segs"] if s["id"] == "welcome")
    print(f"ep{n}: END {tl['END']:.1f}s  welcome {w['t0']:.1f}-{w['t1']:.1f}  bye {byedur:.2f}s  fixed {changed}")

if __name__ == "__main__":
    for a in sys.argv[1:]: prep(int(a))
