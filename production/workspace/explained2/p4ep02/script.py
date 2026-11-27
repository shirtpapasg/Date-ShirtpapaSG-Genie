"""script.py: P4 EP2 "TheOneApp, Explained", "Help! I'm Wilting!" (the Plant System): the APPROVED script v2.1
(../p4/p4_ep02_script.md, 27 Nov 2026; the teacher, 27 Nov 2026: "OK to the EP2 script") as data. ONE video (P4 cap 8:00). Every spoken
line is word for word as in the script's beat table (section 5); the holds are the table's silent rows (each a ("mark", ...), ("wait", s)).
Format D, the Help Desk: the guest Chilli (a chilli-padi plant in a glossy pot, its face on the pot) and the villain GLITCH the Robot (the
series' ultimate boss; his signature sting "New knowledge acquired." is the very last shot, after the blooper). Uncle Lim: three Singlish lines.

SEQ items as EP1 v2: ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("unison", id, text, {opts}). Speakers: heart, pip, basil, momo, lim, chilli (new EP2 guest voice), glitch (new: a pompous, precise robot
with a light vocoder edge; opts "sting": the calm, lower, slower take of z1201, dry). Key words: MAKE FOOD (u407), ABSORB (x604),
TRANSPORT (j805)."""
import re, os
H, P, B, M, L, CH, G = "heart", "pip", "basil", "momo", "lim", "chilli", "glitch"
CUTS = set()
CHANT = [("System!", "Function!")]; CHANT_CAPS = ([1.0], [1.2])   # not used (no chant in P4); make_voice imports them
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
D = {"pre": .45, "post": .35}
def o(**k): return {**D, **k}
EXAM = ("The roots hold the plant firmly in the soil and absorb water and mineral salts. The stem holds the plant upright and transports water, "
        "mineral salts and food to all parts of the plant. The leaves make food for the plant. A plant is a system. When one part stops working, "
        "the whole plant is likely to be affected.")

def kwrecap(words, pron=None):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w); oo = {"pron": pron} if pron and any(x in w for x in pron) else {}
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0, **oo}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True, **oo})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 4.6)]
LOCK = lambda n, d=6.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SC_GAP = ("wait", .45)

SEQ1 = [
 # ---- cold · THE PROBLEM: the Help Desk's first customer (a voice in the first second)
 ("scene", "cold"), ("wait", .2),
 ("say", "c101", B, "The Science Help Desk is open! I'm an expert at everything!", {"pre": .1, "post": .2, "kw": [["tapfast", "open"], ["boast", "expert"]]}),
 ("mark", "hop1"), ("wait", .8),                                     # hold: Chilli's last hop onto the desk; DING!
 ("say", "c102", CH, "Excuse me. I'm watered every single day, in my beautiful new pot. So WHY am I wilting?", o(pre=.2, kw=[["sparkle", "beautiful"], ["wilt", "wilting"]])),
 ("say", "c103", B, "I know! You're just feeling... CHILLI! Get it?", o(kw=[["pun", "chilli"]])),
 ("mark", "flop1"), ("wait", 1.2),                                   # hold: nobody laughs; SAD TROMBONE 1
 ("say", "c104", CH, "I've heard that one.", o(pre=.1)),
 ("say", "c105", H, "Basil is not an expert at jokes.", o(post=.6)),
 SC_GAP,
 ("scene", "title"), ("mark", "title"),
 ("say", "c106", H, "Help! I'm wilting!", {"pre": .35, "post": .6}),
 # ---- fixcards · THE FIX CARDS (a huddle round Chilli)
 ("scene", "fixcards"),
 ("say", "f201", M, "Fix one: find out WHY. Check every part, even the parts we can't see.", o(pre=.3, kw=[["c1", "one"]])),
 ("say", "f202", B, "No time for WHY! Fix two: MORE WATER, MORE POWER!", o(kw=[["c2", "two"], ["cry1", "more"]])),
 ("say", "f203", P, "Fix three: feed it. I packed a balanced lunch.", o(kw=[["c3", "three"], ["box", "packed"]])),
 ("say", "f204", M, "Pip. Is that MY curry puff?", o()),
 ("say", "f205", P, "...It's for science.", o()),
 ("say", "f206", H, "Which fix helps Chilli? Show me one, two or three fingers!", o(post=.2, kw=[["show", "show"]])),
 # ---- lock · THE LOCK-IN (6 s ring)
 ("scene", "lock"), ("wait", .5), *LOCK("fix", 6.0), ("wait", .3),
 # ---- picks · Momo 1, Basil 2, Pip 3; high-five miss 1
 ("scene", "picks"), ("mark", "pk0"), ("wait", 1.2),
 ("say", "p207", P, "Team high-five!", o(pre=.2, post=.1)),
 ("mark", "miss1"), ("wait", 1.2),
 ("say", "p208", H, "Let's test them! Fix two first.", o()),
 SC_GAP,
 # ---- water · FIX 2, TESTED: WATER IT MORE; Momo's clue
 ("scene", "water"),
 ("say", "w301", B, "Stand back. I'm an expert at watering.", o(pre=.3)),
 ("mark", "pour"), ("wait", 1.6),
 ("say", "w302", P, "Um... Basil? The water isn't going down.", o(pre=.2)),
 ("say", "w303", B, "Because it's SO thirsty! More!", o(kw=[["more", "more"]])),
 ("mark", "spill"), ("wait", 1.8),
 ("say", "w304", CH, "Blub. I feel worse.", o(pre=.2)),
 ("mark", "flop2"), ("wait", 1.0),
 ("say", "w305", M, "Look! The water came out of the top. But WHY not out of the bottom?", o(kw=[["top", "top"], ["dry", "bottom"]])),
 ("say", "w306", H, "The water is not sinking in. The soil is already full of water, so more water cannot help.", o(kw=[["notsink", "sinking"], ["full", "full"]])),
 ("say", "w307", B, "In my defence, it looked very thirsty.", o(post=.5)),
 SC_GAP,
 # ---- lunch · FIX 3, TESTED: FEED IT (Pip's balanced lunch, and the pigeons)
 ("scene", "lunch"),
 ("say", "u401", P, "Fix three. One curry puff, in four neat pieces.", o(pre=.3, kw=[["lay", "four"]])),
 ("say", "u402", B, "You made a lunch. For a plant.", o()),
 ("say", "u403", P, "A BALANCED lunch.", o()),
 ("mark", "nothing"), ("wait", 1.2),                                 # hold: nothing happens; a cricket
 ("mark", "koo"), ("wait", 1.6),                                     # hold: KOO! FLAP-FLAP-FLAP! the pigeons land
 ("say", "u404", M, "Noooo! My curry puff!", o(pre=.1)),
 ("say", "u405", B, "Look, Pip. You made some new friends.", o()),
 ("mark", "kooroo"), ("wait", 1.3),                                  # hold: the helmet pigeon: KOO-ROO!
 ("mark", "liftoff"), ("wait", 1.6),                                 # hold: they lift off; the feather; SAD TROMBONE 3
 ("say", "u406", H, "A plant does not take in food from the soil. It makes its own food, in its leaves, using light.", o(kw=[["leafpic", "makes"]])),
 ("say", "u407", P, "So the leaves make the food. My lunch only fed the pigeons.", o(kw=[["kw_make_food", "make"]])),
 HOLD("kw_make_food"),
 SC_GAP,
 # ---- lcparts · [LOOK CLOSER 1] check every part, like a plant doctor
 ("scene", "lcparts"),
 ("say", "d501", H, "Look closer. Momo checks every part.", {**LC, **o(pre=.3)}),
 ("say", "d502", M, "The leaves are green, so they can make food. But they're drooping.", o(kw=[["leaves", "leaves"], ["droop", "drooping"]])),
 ("say", "d503", M, "The stem should hold the plant upright, so the leaves get light. This one is bending.", o(kw=[["stem", "stem"], ["bend", "bending"]])),
 ("say", "d504", B, "Now somebody has to feel the soil. Not Pip. Pip is scared of mushy things.", o(kw=[["soil", "soil"]])),
 ("say", "d505", P, "I am. But Chilli needs help.", o()),
 ("mark", "press"), ("wait", 1.4),                                   # hold: one fingertip; SQUELCH; the rude PFFRRRT; FREEZE-FRAME
 ("say", "d506", M, "Chilli?!", o(pre=.1, post=.1)),
 ("say", "d507", CH, "That was the SOIL!", o(pre=.2)),
 ("say", "d508", H, "It really was the soil. Soil this soggy is full of water.", o(kw=[["soak", "soggy"]])),
 ("mark", "win"), ("wait", .6),                                      # hold: the window opens on the pot's LOWER half
 ("mark", "winhold"), ("wait", 2.0),                                 # hold: inside: brown roots, a pool of water, NO HOLE
 ("say", "d509", M, "The roots are brown and mushy! And there's no hole at the bottom, so the water had nowhere to go!", o(kw=[["roots", "roots"], ["nohole", "hole"]])),
 ("say", "d510", B, "Pong! That's not a smell. That's a clue.", o(kw=[["clue", "clue"]])),
 SC_GAP,
 # ---- lcroots · [LOOK CLOSER 2] the twist: wet soil, thirsty plant
 ("scene", "lcroots"),
 ("say", "x601", B, "Wait. Chilli has loads of water. So why is it droopy?", o(pre=.3)),
 ("mark", "think0"), ("wait", 2.5),                                  # hold: the THINK card, three soft ticks
 ("say", "x602", H, "Roots need air, too. In soil this wet, the spaces between the bits of soil are filled with water, so there is no air. The roots go soft and brown, and rot.", {**LC, **o(kw=[["air", "air"], ["spaces", "spaces"], ["rot", "rot"]])}),
 ("say", "x603", H, "Rotting roots cannot take in water, so the leaves droop, even in wet soil.", o(kw=[["cannot", "cannot"], ["verdict", "droop"]])),
 ("say", "x604", M, "Healthy roots absorb water and mineral salts from the soil. To absorb means to take in. Chilli's roots couldn't.", o(kw=[["kw_absorb", "absorb"], ["salts", "mineral"]])),
 ("say", "x605", B, "Sorry, Chilli. My extra water made it worse.", o()),
 ("say", "x606", CH, "You were trying to help.", o(post=.5)),
 SC_GAP,
 # ---- system · THE PLANT IS A SYSTEM: finishing each other's sentence
 ("scene", "system"),
 ("say", "s651", M, "So the roots couldn't absorb water...", o(pre=.3, post=.2, kw=[["sr", "roots"]])),
 ("say", "s652", P, "...so the stem had no water to carry up...", o(pre=.2, post=.2, kw=[["ss", "stem"]])),
 ("say", "s653", B, "...so the leaves drooped! The plant is a system. One part stopped working, and the whole plant was affected!", o(pre=.2, kw=[["sl", "leaves"], ["sys", "system"]])),
 ("mark", "alarm"), ("wait", 1.0),                                   # hold: BEEP-BOOP! BEEP-BOOP!
 # ---- glitch · THE VILLAIN: GLITCH, won over by the evidence
 ("scene", "glitch"),
 ("say", "g451", G, "Seven o'clock. Watering time! One jug, every day, for maximum efficiency.", o(pre=.6, kw=[["seven", "seven"], ["jug", "jug"]])),
 ("say", "g452", B, "Wait. YOU water Chilli every day?", o()),
 ("say", "g453", G, "Correct. I also chose this pot. No holes, so no water is wasted.", o(kw=[["tap", "pot"], ["leaks", "holes"]])),
 ("say", "g454", B, "He's me, ten minutes ago.", o()),
 ("say", "g455", P, "Um... the water had nowhere to go, so the roots got no air.", o()),
 ("say", "g456", G, "Incorrect. Show me the data.", o(kw=[["data", "data"]])),
 ("mark", "scan"), ("wait", 2.4),                                    # hold: the evidence on GLITCH's chest screen; SCANNING...
 ("say", "g457", M, "Brown, mushy roots, and a pool of water with no way out.", o(pre=.2, kw=[["ev1", "brown"], ["ev2", "pool"], ["ev3", "way"]])),
 ("mark", "bzzt"), ("wait", 1.2),                                    # hold: BZZT! swirly eyes, sparks
 ("say", "g458", G, "Error. My plan was... not efficient.", o(pre=.1)),
 ("say", "g459", M, "You wanted to help Chilli. So did we. Let's fix it together.", o(kw=[["pat", "wanted"]])),
 ("say", "g460", G, "Updating! Lesson stored: roots need air. Drainage holes: required.", o(kw=[["upd", "updating"], ["stored", "stored"], ["req", "required"]], post=.6)),
 SC_GAP,
 # ---- repair · THE REAL FIX, with Uncle Lim; the polite turn-round
 ("scene", "repair"),
 ("say", "r701", M, "We need holes in the bottom, so the extra water can drain out.", o(pre=.3, kw=[["holes", "holes"]])),
 ("say", "r702", P, "And an adult must cut off the rotting roots, and add fresh soil.", o(kw=[["cut", "cut"]])),
 ("say", "r703", L, "Aiyoh. Uncle can help.", o()),
 ("say", "r704", CH, "Could everybody turn around, please?", o()),
 ("mark", "screen"), ("wait", 2.6),                                  # hold: BZZZT! SNIP! SNIP! SPLOSH! FLUMP.
 ("say", "r705", L, "Okay, can look already.", o(pre=.2)),
 ("say", "r706", B, "Now the water test.", o()),
 ("mark", "test"), ("wait", 2.2),                                    # hold: drip... drip... drip.
 ("say", "r707", B, "It drains! The water has somewhere to go now!", o(pre=.2)),
 ("say", "r708", G, "New rule saved: water only when the top of the soil is dry!", o(kw=[["rule", "rule"]], post=.5)),
 SC_GAP,
 # ---- wait · TWO WEEKS: "Slowly, slowly lah" and hint #3
 ("scene", "wait"), ("mark", "tapfast2"), ("wait", .9),               # silent: Basil taps FAST and stares at Chilli
 ("say", "t751", L, "Slowly, slowly lah. Plants cannot rush one.", o(pre=.2, post=.6)),
 ("say", "t752", H, "Two weeks later...", o(kw=[["weeks", "weeks"]])),
 ("mark", "lapse"), ("wait", 3.0),                                   # hold: the time-lapse
 ("say", "t753", CH, "I'm standing tall again! Thank you for listening. Nobody ever listens to a plant.", o(pre=.2)),
 ("say", "t754", H, "I know the feeling.", o(post=.4)),             # HEART MYSTERY HINT #3: nobody reacts
 # ---- waitw + shrink + pullout + transport · BE THE THING: a drop of water in Chilli's pot (quiet)
 ("scene", "waitw"),
 ("say", "j801", H, "Be a drop of water in Chilli's pot! Shrink down. Quietly.", o(pre=.3, post=.6, kw=[["be", "be"], ["shrinkw", "shrink"]])),
 ("scene", "shrink"), ("wait", 1.2),
 ("say", "j802", H, "You trickle down through the soil, past little pockets of air. Some mineral salts come along with you.", {**SLOW, "pre": 0, "post": .3, "kw": [["trickle", "trickle"], ["pockets", "pockets"], ["jsalts", "mineral"]]}),
 ("say", "j803", H, "A firm white root takes you in. You're inside the plant!", {**SLOW, "pre": .2, "post": .3, "kw": [["jroot", "root"], ["inside", "inside"]]}),
 ("say", "j804", H, "Up you go, through the stem, all the way to a leaf, where food is made.", {**SLOW, "pre": .2, "post": .4, "kw": [["jup", "up"], ["jstem", "stem"], ["jleaf", "leaf"], ["jfood", "food"]]}),
 ("scene", "pullout"), ("wait", 1.2),
 ("scene", "transport"),
 ("say", "j805", B, "So the stem carries water and mineral salts up, and food from the leaves to other parts. The stem transports them!", o(pre=.3, kw=[["up_arr", "up"], ["down_arr", "food"], ["kw_transport", "transports"]])),
 HOLD("kw_transport"),
 SC_GAP,
 # ---- words · THE WORDS THAT EARN MARKS (Momo reads)
 ("scene", "words"),
 ("say", "m901", H, "Now, here are the words that earn marks.", o(pre=.3, post=.1)),
 ("say", "m902", M, "Say it with me!", {"pre": .3}), ("wait", .8),
 ("say", "m903", M, EXAM, {"pre": 0, "gap": .35}), ("wait", 2.5),
 # ---- finish · THE COSY END: the callback, the sign, the high-five that lands
 ("scene", "finish"),
 ("say", "k1001", G, "Seven o'clock. A little top-up, Chilli?", o(pre=.6)),
 ("say", "k1002", CH, "Is the top of my soil dry?", o()),
 ("say", "k1003", G, "...No.", o(pre=.5, kw=[["wet", "no"]])),
 ("say", "k1004", CH, "Then, no.", o(pre=.2)),
 ("say", "k1005", G, "Rule saved.", o(pre=.3)),
 ("mark", "sign"), ("wait", 1.2),                                    # hold: Basil crosses out FAST, writes PROPERLY
 ("mark", "clap"), ("wait", 1.4),                                    # hold: THE HIGH-FIVE LANDS: CLAP!
 ("say", "k1006", H, "Picked fix one? You win a point, and so does Momo!", o(kw=[["coin1", "point"]])),
 # ---- next · the link to EP3: a leaf that is not Chilli's
 ("scene", "next"), ("mark", "leaf"), ("wait", 1.6),
 ("say", "n1101", H, "A mystery leaf! Next time, we open a case file.", o(pre=.1, kw=[["case", "case"]], post=.4)),
 # ---- kwrecap, "Now you know!", the outro (GLITCH rolls past and does NOT water a plant)
 *kwrecap(["Make food", "Absorb", "Transport"]),
 *NYK,
 # ---- blooper (after the end card)
 ("scene", "blooper"), ("wait", .4),
 ("say", "e1601b", B, "Fix two: MORE WATER, MORE POW...", {"pre": 0, "post": 0, "kw": [["splosh", "pow..."]]}),
 ("mark", "drip"), ("wait", 1.0),
 ("say", "e1602g", CH, "Now YOU'RE the droopy one.", {"pre": .3, "post": .1}),
 ("say", "e1603p", P, "Towel? Take two!", {"pre": .2, "post": .1}),
 ("mark", "take2"), ("wait", .5),
 # ---- glitchend · GLITCH ALONE: his signature ending (the very last shot)
 ("scene", "glitchend"), ("mark", "ge0"), ("wait", .6),
 ("mark", "stutter"), ("wait", 1.0),                                 # the hard digital stutter (his sprite only)
 ("mark", "silence"), ("wait", 1.8),                                 # TRUE SILENCE
 ("say", "z1201", G, "New knowledge acquired.", {"pre": 0, "post": 0, "sting": True, "kw": [["acq", "acquired"]]}),
 ("mark", "black"), ("wait", .5),                                    # cut to black
]
# PACING (as EP1 v2): a buddy or guest line with two or more sentences keeps .38 s between its sentences; think time after Heart's teaching lines
THINK_AFTER = {"w306": .4, "u406": .5, "d508": .3, "x602": .5, "x603": .5, "x604": .3, "s653": .2, "g455": .2, "g460": .3, "r702": .2, "j805": .3,
  "d503": .2, "d509": .3}
for _i, _it in enumerate(SEQ1):
    if _it[0] == "say" and _it[2] in (P, B, M, L, CH, G) and "gap" not in _it[4] and len(re.findall(r"[.!?:](?:\s|$)", _it[3].replace("...", "…"))) >= 2:
        _it[4]["gap"] = .38
    if _it[0] == "say" and _it[1] in THINK_AFTER: _it[4]["post"] = _it[4].get("post", .3) + THINK_AFTER[_it[1]]
SEQS = {1: SEQ1, 2: []}

if __name__ == "__main__":
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1}
    assert not dup, dup
    for part, s in SEQS.items():
        if not s: continue
        n = sum(len(it[3].split()) for it in s if it[0] == "say") + sum(len(it[2].split()) for it in s if it[0] == "unison")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L, CH, G)}
        words = {w: sum(len(it[3].split()) for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L, CH, G)}
        print(f"Part {part}: {n} words; lines per speaker {lines}; words {words}")
