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
          22: [("ball", "Solids expand and contract.", "Solids expand and contract. You can try this yourself in The One App. Open the School Lab, experiment seven point three, and press, Let's test it now!")],
          19: [("habit1", "Like, heat is energy, temperature is a measure.", "Like this. Heat is a form of energy, and temperature is a measure of how hot or cold an object is.")],
          18: [("lab", "Using a lab thermometer takes three steps.", "Using a lab thermometer takes four steps."),
               ("lab", "Read at eye level, from the bottom of the curved surface.", "Read at eye level, from the bottom of the curved surface. Four. Keep the bulb away from the sides and bottom of the container, or you will measure the container instead of the liquid."),
               ("hook", "Your touch is lying to you.", "Your sense of touch got mixed up!"), ("close", "So, is your touch lying? Yes,", "So, did your touch get mixed up? Yes,")]}
TOPIC = {1: "Systems", 2: "Plant Parts", 3: "Leaves", 4: "Plant Superpowers", 5: "Body Systems", 6: "Digestion (Part 1)", 7: "Digestion (Part 2)",
         8: "Is Air Matter?", 9: "States of Matter", 10: "Weighing Air", 11: "Volume", 12: "Mass", 13: "Light Sources", 14: "Light and the Moon",
         15: "Shadows", 16: "Shadow Size", 17: "Shadow Shapes", 18: "Temperature", 19: "Heat vs Temperature", 20: "Heat Flow", 21: "Heat Conductors", 22: "Effects of Heat"}
LAB = {22: ("ball", "try", "7.3", "Heat gain and heat loss", "Part (a): A metal ball and a ring")}
# teacher fact-check (full MOE definitions) + "Try it in TheOneApp" School Lab links, 10 Oct 2026
def _lab(lead, num): return f" {lead} Open the School Lab, experiment {num}, and press, Let's test it now!"
FACT = {
 1: [("tree", "firmly in the ground and take in water.", "firmly in the ground, and absorb water and mineral salts."),
     ("body2", "later in this series.", "later in this series." + _lab("Want to explore this? You can try it yourself in The One App.", "two point one"))],
 2: [("dinner", "And celery? That is a stem.", "And asparagus? That is a stem."),
     ("roots2", "Roots only absorb water and mineral salts.", "Roots absorb water and mineral salts, not food." + _lab("You can try this yourself in The One App.", "one point two")),
     ("tryit", "travels up the stem,", "travels up the stalk,")],
 3: [("hook", "Every leaf has the same four parts.", "Most leaves have the same four parts."),
     ("diverse2", "in the place where it grows.", "in the place where it grows." + _lab("Want a closer look? Try it in The One App.", "one point three"))],
 5: [("dig", "It breaks your food down into simpler substances that your body can use.", "It breaks down food into simpler substances that can be absorbed into the blood."),
     ("dig", "in the next two episodes.", "in the next two episodes." + _lab("Want to explore all five systems? You can try it in The One App.", "two point one")),
     ("exam", "The skeletal system gives the body shape and protects important parts.", "The skeletal system supports the body, gives it shape, and protects important parts.")],
 6: [("what", "Digestion is the process of breaking food down into simpler substances, so your body can use them.", "Digestion is the process of breaking down food into simpler substances that can be absorbed into the blood."),
     ("saliva", "Saliva softens the food, and it contains digestive juices.", "Saliva is a digestive juice, and it softens the food."),
     ("stomach", "turns into a thick, soupy mixture.", "turns into a thick, soupy mixture." + _lab("Want to follow the food yourself? Try it in The One App.", "two point two"))],
 7: [("small2", "The food is now broken down into simple substances your body can use.", "The food is now broken down into simpler substances that can be absorbed into the blood."),
     ("team", "even when they eat enough.", "even when they eat enough." + _lab("What if a part stopped working? Try it yourself in The One App.", "two point three"))],
 8: [("non", "They have no mass, and they do not take up space.", "Light, shadows, heat and sound are not matter, because they have no mass and do not take up space."),
     ("verdict", "even though you cannot see it.", "even though you cannot see it." + _lab("Is it matter, or not? You can try it yourself in The One App.", "three point one"))],
 9: [("liquid2", "Pour a full jug into a small cup, and it overflows, because liquids cannot be compressed. Pour it into a huge teapot, and it does not fill it up. That is why",
                 "Pour a full jug into a small cup, and it overflows, because a liquid has a definite volume. Pour it into a huge teapot, and it does not fill it up. And liquids cannot be compressed. That is why"),
     ("gas2", "squeezes into a smaller space.", "squeezes into a smaller space." + _lab("Want to squeeze a solid, a liquid and a gas? You can try it in The One App.", "three point two"))],
 10: [("units", "A one litre bottle of water has a mass", "One litre of water has a mass"),
      ("air", "You just weighed air!", "You just weighed air!" + _lab("Want to weigh things yourself? Try it in The One App.", "three point three"))],
 11: [("rock2", "Ten cubic centimetres!", "Ten cubic centimetres!" + _lab("Want to measure volume yourself? You can try it in The One App.", "three point three"))],
 12: [("hyp", "We know that mass is the amount of matter.", "We know that mass is the amount of matter in an object."),
      ("wrong", "and try again.", "and try again." + _lab("Want to plan your own fair test? You can try it in The One App.", "three point four"))],
 13: [("exam", "A source of light is an object that gives off light.", "A source of light is an object that gives off its own light."),
      ("edison", "Early light bulbs were too big or too bright for homes. Thomas Edison and his team kept testing, again and again, until they made a bulb that was practical for homes.",
                 "Early light bulbs burned out too quickly. Thomas Edison and his team kept testing, again and again, until they made a bulb that lasted long enough for homes."),
      ("need", "Light helps us see, find things, and stay safe.", "Light helps us see, find things, and stay safe." + _lab("What happens when the lights go out? Try it yourself in The One App.", "four point one"))],
 14: [("blackout", "Now you can see it!", "Now you can see it!" + _lab("Lights out, lights on! You can try it yourself in The One App.", "four point one"))],
 15: [("block", "and its shadow is less dark.", "and its shadow is less dark." + _lab("Do all materials form shadows? Try it yourself in The One App.", "five point one"))],
 16: [("hook", "Or a tiny one, smaller than your hand?", "Or a small one, about the size of the ball?"),
      ("close", "then make it tiny.", "then make it as small as you can."),
      ("move", "Moving the ball changes both distances at once.", "Moving the ball changes both distances at once." + _lab("Want to move the light yourself? Try it in The One App.", "five point two"))],
 17: [("cone", "because the round base blocks the light.", "because the round base blocks the light." + _lab("Want to turn a cone yourself? You can try it in The One App.", "five point four"))],
 18: [("lab", "Three. Read at eye level, from the bottom of the curved surface.", "Three. Read at eye level, where the red liquid stops."),
      ("types", "An infrared thermometer measures the surface of things, from far away.", "An infrared thermometer measures the temperature of a surface, without touching it."),
      ("logger", "and even draws a graph for you.", "and even draws a graph for you." + _lab("Touch, or thermometer? You can try it yourself in The One App.", "six point one"))],
 19: [("fix", "Or, my body gained heat.", "Or, my body gained heat." + _lab("Want to see heat and temperature side by side? Try it in The One App.", "six point three"))],
 20: [("door", "The warm air outside is not leaking cold. Heat flows from the warm air into the cold fridge!", "The cold is not leaking out. Heat flows from the warm room into the cold fridge!"),
      ("stop", "until both reach thirty-five degrees.", "until both reach the same temperature."),
      ("stop", "heat stops flowing.", "heat stops flowing." + _lab("Want to watch heat move? You can try it yourself in The One App.", "seven point one")),
      ("source", "An object with a higher temperature than its surroundings is called a source of heat.", "Anything that gives off heat is a source of heat."),
      ("source", "The Sun is our biggest natural source of heat.", "The Sun is our main source of heat.")],
 21: [("wax2", "and slowest through wood.", "and slowest through wood." + _lab("Ready for the melting race? Try it yourself in The One App.", "seven point two"))],
 22: [("state", "Water gains more heat and turns into steam. And the other way round, steam loses heat", "Water gains more heat and turns into water vapour. And the other way round, water vapour loses heat"),
      ("define", "and its volume gets smaller.", "and its volume gets smaller. Its mass stays the same.")],
 4: [("roots2", "so the plant can use it later.", "so the plant can use it later." + _lab("Want to compare plants? You can try it in The One App.", "one point three"))],
}
for _n, _v in FACT.items(): SEGFIX.setdefault(_n, []).extend(_v)
LAB.update({1: ("body2", "try", "2.1", "The systems inside you", "Part (a): Five systems"),
            2: ("roots2", "try", "1.2", "What each part of a plant does", "Part (b): What each part does"),
            3: ("diverse2", "try", "1.3", "Looking closely at plants", "Part (a): Plant cards"),
            4: ("roots2", "try", "1.3", "Looking closely at plants", "Part (b): Two plants, side by side"),
            6: ("stomach", "try", "2.2", "Where your food goes", "Part (b): Follow the food"),
            7: ("team", "try", "2.3", "What if a part stopped working?", "Part (a): Switch a part off"),
            8: ("verdict", "try", "3.1", "Is it matter?", "Part (c): Matter or not?"),
            9: ("gas2", "try", "3.2", "Solids, liquids and gases side by side", "Part (c): A gas"),
            10: ("air", "try", "3.3", "Weighing and measuring things", "Part (a): Measuring mass"),
            11: ("rock2", "try", "3.3", "Weighing and measuring things", "Part (b): Measuring volume"),
            12: ("wrong", "try", "3.4", "Plan and run a fair test", "Part (a): Plan it"),
            13: ("need", "try", "4.1", "Seeing in the dark", "Part (a): Lights out"),
            14: ("blackout", "try", "4.1", "Seeing in the dark", "Part (b): Lights on"),
            15: ("block", "try", "5.1", "How shadows form", "Part (b): Do all materials form shadows?"),
            16: ("move", "try", "5.2", "Big shadow, small shadow", "Part (a): Move the light"),
            17: ("cone", "try", "5.4", "The shape of a shadow", "Part (b): Solid objects"),
            18: ("logger", "try", "6.1", "Touch or thermometer?", "Part (b): Using a thermometer"),
            19: ("fix", "try", "6.3", "Heat is not temperature", "Part (b): Count the energy"),
            20: ("stop", "try", "7.1", "Heat on the move", "Part (a): Hot cup, cool water"),
            21: ("wax2", "try", "7.2", "Good and poor conductors", "Part (d): The melting race"),
            5: ("dig", "try", "2.1", "The systems inside you", "Part (a): Five systems")})
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
    intro = f"Hi there, and welcome to The One App, Explained! I'm so happy you're here. Today, you will learn three big ideas. First, {G[0][2]}. Second, {G[1][2]}. And third, {G[2][2]}. Let's get started!"
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
    bad = [l for l in out.splitlines() if "MISMATCH" in l]
    if bad:   # tolerate only a final word the aligner missed (it gets timed from its neighbour below)
        alc = {sg["id"]: sg["words"] for sg in json.load(open(f"{D}/align_ep{n}.json"))}
        bad = [l for l in bad if not (all(w["a"] is not None for w in alc[l.split()[0]][:-1]) and alc[l.split()[0]][-1]["a"] is None)]
        assert not bad, bad
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
                    '        g = GAP_SAME if al[i-1]["scene"] == s["scene"] else GAP_SCENE\n        if s["scene"] == "end": g = 1.2\n        if al[i-1]["id"] == "quiz1" and s["id"] == "quiz2": g = 4.9   # 4-second countdown to think before the answer\n', 1)
    bt = bt.replace('END = round(t + OUTRO, 3)', 'END = round(segs[-1]["t0"] + 3.6 if segs[-1]["scene"] == "end" else t + OUTRO, 3)', 1)
    bt = bt.replace('    if not scenes or scenes[-1]["scene"] != s["scene"]', '    if s["scene"] == "end": continue\n    if not scenes or scenes[-1]["scene"] != s["scene"]', 1)
    if n == 18: bt = bt.replace('cues["hook"]["lying"]', 'cues["hook"]["mixed"]')
    if n == 18:  # teacher: full names
        for o, nw in [('"DIGITAL", "#06d6a0"', '"DIGITAL THERMOMETER", "#06d6a0"'), ('"INFRARED", "#7209b7"', '"INFRARED THERMOMETER", "#7209b7"'), ('"LAB THERMOMETER": "LAB", ', '')]:
            assert o in bt, ("ep18 kw", o); bt = bt.replace(o, nw)
    if n == 19:  # teacher fact-check: key words must be correct definitions-in-brief
        for o, nw in [('("heat", "energy", "HEAT = ENERGY", "#f77f00")', '("heat", "energy", "HEAT: A FORM OF ENERGY", "#f77f00")'),
                      ('"TEMPERATURE = MEASURE", "#7209b7"', '"TEMP: HOW HOT OR COLD", "#7209b7"'),
                      ('"TEMPERATURE = MEASURE": "TEMP = MEASURE", ', '"HEAT: A FORM OF ENERGY": "HEAT: FORM OF ENERGY", ')]:
            assert o in bt, ("ep19 kw", o); bt = bt.replace(o, nw)
    if n == 3:   # teacher: all three skills are key words
        k = '("ask", "questions", "ASK QUESTIONS", "#f72585")'; assert k in bt, "ep3 kw"
        bt = bt.replace(k, '("ask", "observe", "OBSERVE", "#3a86ff"), ("ask", "ask", "ASK", "#f72585"), ("ask", "investigation", "INVESTIGATE", "#06d6a0")')
    if n == 14: bt = bt.replace('("myth", "trap", "EXAM TRAP", "#e63946")', '("myth", "tip", "EXAM TIP", "#f77f00")').replace('"EXAM TRAP"', '"EXAM TIP"')
    assert bt.count('if s["scene"] == "end"') == 2 and bt.count("g = 4.9") == 1
    open(f"{D}/build_tl.py", "w").write(bt)
    run(["python3", "-I", "build_tl.py"], cwd=D, stdout=subprocess.DEVNULL)
    tl = json.load(open(f"{D}/tl.json"))   # spoken "The One App" shows on screen as the brand name "TheOneApp"
    C = tl["caps"]; flat = [(ci, w) for ci, cp in enumerate(C) for w in cp["w"]]
    for i in range(len(flat) - 2):
        (c0, w0), (c1, w1), (c2, w2) = flat[i:i + 3]
        if [w0["t"], w1["t"]] == ["The", "One"] and w2["t"].startswith("App"):   # may straddle two caption lines: keep it on the first
            w0.update(t="TheOne" + w2["t"], b=w2["b"]); w1["drop"] = w2["drop"] = 1; C[c0]["t1"] = max(C[c0]["t1"], w2["b"])
    for cp in C: cp["w"] = [w for w in cp["w"] if not w.get("drop")]
    tl["caps"] = [cp for cp in C if cp["w"]]
    json.dump(tl, open(f"{D}/tl.json", "w"))
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
    import re   # series name (10 Oct 2026): "TheOneApp, Explained - <topic>" in the top-left tag, sized to its text
    h, k = re.subn(r'(<text x="70" y="73" font-size=")27(" font-weight="700" fill="#fff" letter-spacing=")1(">\S+ )P4 SCIENCE · EP \d+(</text>)', lambda m: m.group(1) + "25" + m.group(2) + "0" + m.group(3) + "TheOneApp, Explained - " + TOPIC[n] + m.group(4), h); assert k == 1, (n, "tag")
    a = 'op($("tag"), '; assert h.count(a) == 1, (n, "tag op")
    h = h.replace(a, '{ const tg = $("tag"); tg.querySelector("rect").setAttribute("width", tg.querySelector("text").getComputedTextLength() + 62); } ' + a)
    import fit_patch; h = fit_patch.apply(h)
    if n in LAB:   # "Try it in TheOneApp" School Lab card
        sid, word, code, title, part = LAB[n]
        h = h.replace("window.render = function (t) {", "window.LABCARD = " + json.dumps({"seg": sid, "word": word, "code": code, "title": title, "part": part}) + ";\n" + open(f"{S}/labcard.js").read() + "\nwindow.render = function (t) {", 1)
        h = h.replace("drawConfetti(t); drawKW(t); drawCaps(t);", "drawConfetti(t); drawKW(t); drawCaps(t); drawLC(t);", 1)
    cdjs = open(f"{S}/countdown.js").read(); a = "window.render = function (t) {"; assert h.count(a) == 1
    h = h.replace(a, cdjs + "\n" + a); a = "drawConfetti(t); drawKW(t); drawCaps(t);"; assert h.count(a) == 1, (n, "draw hook")
    h = h.replace(a, a + " drawCD(t);")
    fl = f"{S}/fills/ep{n}.json"   # per-scene enlargement into the empty space (fill_measure.js + fill_calc.py)
    if os.path.exists(fl):
        a = "window.render = function (t) {"; assert h.count(a) == 1, (n, "render hook")
        h = h.replace(a, "const FILL = " + json.dumps(json.load(open(fl))) + '; for (const k in FILL) if (S[k]) S[k].stage.setAttribute("transform", FILL[k]);\n' + a)
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
