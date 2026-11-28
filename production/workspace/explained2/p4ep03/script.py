"""script.py: P4 EP3 "TheOneApp, Explained", "The Case of the Mystery Leaf" (Read a Leaf Like a Scientist): the APPROVED script v2
(../p4/p4_ep03_script.md, Genie 3cbc25d, 28 Nov 2026; the teacher, 28 Nov 2026: "ok" to the script and its 20 questions, each answered
with the script's own recommendation) as data. ONE video (P4 cap 8:00). Every spoken line is word for word as in the script's beat table
(section 5); the holds are the table's silent rows (each a ("mark", ...), ("wait", s)).
Format A, the Case File: the mystery leaf from EP2's last shot; the villain GLITCH the Robot with his LEAF RETURN SERVICE (colour and size
only) and a roll of sticky tape; Uncle Lim one Singlish line; the witness: EP1's snail with its crown; the cactus cameo (wordless) links EP4.
SEQ items as EP2: ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("unison", id, text, {opts}). Speakers: heart, pip, basil, momo, lim, glitch (opts "sting": the calm take of z1301; EP3: speed .88, range
.38, a shade calmer than EP2's, the script's section 0c). Key words: LEAF BLADE (l602, Basil), LEAF STALK (l603, Pip), NET VEINS (j706,
Basil), PARALLEL VEINS (q802, Momo)."""
import re, os
H, P, B, M, L, G = "heart", "pip", "basil", "momo", "lim", "glitch"
CUTS = set()
CHANT = [("System!", "Function!")]; CHANT_CAPS = ([1.0], [1.2])   # not used (no chant in P4); make_voice imports them
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
D = {"pre": .45, "post": .35}
def o(**k): return {**D, **k}
EXAM = ("The main parts of a leaf are the leaf blade, the leaf stalk, the main vein and the smaller veins. The leaf stalk attaches the leaf "
        "to the stem. The veins can be arranged in a parallel pattern or a net pattern.")

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
 ("wait", 4.0)]
LOCK = lambda n, d=6.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SC_GAP = ("wait", .8)

SEQ1 = [
 # ---- cold · THE PROBLEM: a leaf with no owner, and a robot with sticky tape (a voice in the first second)
 ("scene", "cold"), ("wait", .15),
 ("say", "c101", B, "A leaf with no owner! Finally, a case for Detective Basil. I'm an expert at detecting.", {"pre": .1, "post": .25, "kw": [["cap", "finally"], ["expert", "expert"]]}),
 ("say", "c104", M, "But WHY is it on our desk? It isn't Chilli's leaf.", o(pre=.3, kw=[["chilliinset", "chilli's"]])),
 ("mark", "skr"), ("wait", 1.0),                                     # hold: SKRRRITCH! GLITCH rolls in with his tape; his fanfare
 ("say", "c105", G, "Fallen leaf detected. Colour: green. Size: big. Owner: the mango tree.", o(pre=.2, kw=[["colourscan", "colour"], ["sizescan", "size"], ["owner", "owner"]])),
 ("mark", "koo"), ("wait", .8),                                      # hold: the pigeon on the mango tree: KOO!
 ("say", "c106", M, "GLITCH! Did you tape THAT leaf onto the pandan?", o(pre=.1, kw=[["whip", "tape"]])),
 ("say", "c107", G, "Correct. Lost property must be returned. Efficiently.", o(kw=[["rip1", "efficiently"]])),
 ("say", "c108", B, "Hold it! Nobody tapes anything until Detective Basil cracks the case!", o(kw=[["holdit", "hold"]], post=.5)),
 ("scene", "title"), ("mark", "title"),
 ("say", "c109", H, "The Case of the Mystery Leaf!", {"pre": .35, "post": .6}),
 # ---- witness · THE WITNESS (the hidden animal, back for the Case File)
 ("scene", "witness"),
 ("say", "a201", H, "Every case needs a witness. Our old friend the snail saw everything. It's hiding in this video. Can you spot it?", o(pre=.3, kw=[["snailin", "snail"], ["spot", "spot"]])),
 ("say", "a202", B, "The King of the Void Deck. He still has my crown.", o(post=.5)),
 # ---- fixcards · THE FIX CARDS: how do we find the leaf's real owner? (a huddle round the leaf)
 ("scene", "fixcards"),
 ("say", "f201", M, "Clue one: the colour. Let's match its exact green.", o(pre=.3, kw=[["c1", "one"], ["swatches", "match"]])),
 ("say", "f202", P, "Clue two: the size. Careful scientists measure!", o(kw=[["c2", "two"], ["tools", "measure"]])),
 ("say", "f203", B, "Clue three: read the leaf. Every part is a clue. Leaf it to me!", o(kw=[["c3", "three"], ["pun", "it"]])),
 ("mark", "flop1"), ("wait", 1.2),                                   # hold: nobody laughs; SAD TROMBONE 1
 ("say", "f204", G, "Joke detected. Laughter: zero.", o(pre=.1, kw=[["zero", "zero"]])),
 ("say", "f205", H, "Which clue cracks the case? Show me one, two or three fingers!", o(post=.2, kw=[["show", "show"]])),
 # ---- lock · THE LOCK-IN (6 s ring)
 ("scene", "lock"), ("wait", .5), *LOCK("fix", 6.0), ("wait", .3),
 # ---- picks · Momo 1, Pip 2, Basil 3; high-five miss 1
 ("scene", "picks"), ("mark", "pk0"), ("wait", 1.2),
 ("say", "p301", M, "Team high-five!", o(pre=.2, post=.1)),
 ("mark", "miss1"), ("wait", 1.2),
 ("say", "p302", H, "Let's test them! Clue one first.", o()),
 SC_GAP,
 # ---- colour · CLUE 1, TESTED: MATCH THE COLOUR (Momo), and GLITCH's maths
 ("scene", "colour"), ("mark", "swatch"), ("wait", 2.2),             # hold: the leaf against each plant; the same green three times
 ("say", "o402", M, "Green. Green. And... green. They're ALL green!", o(pre=.2, kw=[["allgreen", "all"]])),
 ("mark", "flop2"), ("wait", 1.0),                                   # hold: SAD TROMBONE 2
 ("say", "o403", G, "Recalculating. The leaf belongs to all three plants.", o(pre=.1, kw=[["three3", "three"]])),
 ("say", "o404", P, "Um... a leaf can only come from one plant.", o()),
 ("say", "o405", H, "Most leaves are green, so colour alone cannot tell these three apart.", o(kw=[["notenough", "colour"]])),
 ("say", "o406", B, "Every suspect has the same alibi.", o(post=.5)),
 SC_GAP,
 # ---- size · CLUE 2, TESTED: MEASURE THE SIZE (Pip), with the slow-motion replay
 ("scene", "size"),
 ("say", "s501", P, "Clue two. The mango tree is the biggest plant, so it must have the biggest leaves.", o(pre=.3)),
 ("say", "s502", G, "Agreed. Big tree, big leaf.", o()),
 ("say", "s503", P, "...Oh no. GLITCH agrees with me.", o()),
 ("mark", "measure"), ("wait", 2.2),                                 # hold: bigger, smaller
 ("say", "s504", P, "One is bigger. One is smaller. Um... that doesn't help.", o(pre=.2)),
 ("mark", "flop3"), ("wait", 2.0),                                   # hold: the pandan leaf flops over Pip's helmet: FLOP! SAD TROMBONE 3
 ("say", "s505", M, "Pip! The little pandan plant has the longest leaves of all!", o(pre=.1)),
 ("say", "s506", H, "Let's look at that again, in slow motion.", o(kw=[["replay", "slow"]])),
 ("mark", "slow0"), ("wait", 2.0),                                   # hold: the replay at a quarter speed; the ruler
 ("say", "s507", H, "Leaves on one plant come in different sizes, and a small plant can have long leaves. So size is a weak clue.", o(pre=.2, kw=[["weak", "weak"]])),
 SC_GAP,
 # ---- lcleaf · [LOOK CLOSER] read the leaf like a scientist (Basil leads)
 ("scene", "lcleaf"),
 ("say", "l601", H, "Look closer, the way a scientist does.", {**LC, **o(pre=.3)}),
 ("say", "l602", B, "The flat, wide part is the leaf blade. It's usually the biggest part of a leaf, and its edge gives the leaf its shape.", o(kw=[["kw_leaf_blade", "blade"], ["edge", "edge"]])),
 HOLD("kw_leaf_blade"),
 ("say", "l603", P, "This thin part is the leaf stalk. The leaf stalk attaches the leaf to the stem.", o(kw=[["kw_leaf_stalk", "stalk"], ["attach", "attaches"]])),
 HOLD("kw_leaf_stalk"),
 ("say", "l604", H, "From the leaf stalk, the main vein runs down the middle, and it branches into smaller veins.", {**LC, **o(kw=[["mainv", "main"], ["smallv", "smaller"]])}),
 ("say", "l605", M, "But WHERE do all the little veins go? They're everywhere!", o(kw=[["magv", "where"]], post=.5)),
 # ---- dive + journey + pullout · BE THE THING: a drop of water in a leaf (quiet)
 ("scene", "dive"),
 ("say", "j701", H, "Be a drop of water, on your way into a leaf. Shrink down. Quietly.", o(pre=.3, post=.6, kw=[["be", "be"], ["shrinkw", "shrink"]])),
 ("scene", "journey"), ("wait", 1.0),
 ("say", "j702", H, "Last time, you rode up a stem. This time, you slide into the leaf stalk, a narrow green tunnel.", {**SLOW, "pre": 0, "post": .3, "kw": [["jstalk", "slide"]]}),
 ("say", "j703", H, "Now you are in the main vein, the widest path, running down the middle.", {**SLOW, "pre": .2, "post": .3, "kw": [["jmain", "main"]]}),
 ("say", "j704", H, "Paths branch off on both sides. You take one, then a smaller one, then a smaller one still.", {**SLOW, "pre": .2, "post": .3, "kw": [["jbranch", "branch"], ["jwave", "take"]]}),
 ("say", "j705", H, "They split and join, all over the leaf blade, like a net.", {**SLOW, "pre": .2, "post": .4, "kw": [["jnet", "net"]]}),
 ("scene", "pullout"), ("wait", 1.2),
 ("scene", "netveins"),
 ("say", "j706", B, "So veins that split and join like a net are called net veins!", o(pre=.3, kw=[["kw_net_veins", "called"]])),
 HOLD("kw_net_veins"),
 SC_GAP,
 # ---- suspects · THE SUSPECTS, cleared one by one (and Basil's too-early CASE CLOSED)
 ("scene", "suspects"),
 ("say", "q801", B, "Suspect one: the pandan plant. Its veins run side by side, from one end to the other.", o(pre=.3, kw=[["pan", "pandan"], ["sbs", "side"]])),
 ("say", "q802", M, "Like the lanes on a running track! Veins like that are called parallel veins.", o(kw=[["lanes", "lanes"], ["kw_parallel_veins", "parallel"]])),
 HOLD("kw_parallel_veins"),
 ("say", "q803", H, "Our mystery leaf has net veins, so the pandan plant is cleared.", o(kw=[["clr1", "cleared"]])),
 ("say", "q804", M, "And it smells like pandan cake. Sorry, pandan. You're free to go.", o(kw=[["sniff", "smells"]])),
 ("say", "q805", P, "Suspect two: the mango tree. Its leaves have net veins too!", o(kw=[["mango", "mango"], ["both", "net"]])),
 ("say", "q806", B, "Net veins! The mango tree did it! CASE CLOSED!", o(kw=[["rush", "case"]])),
 ("say", "q807", G, "Mango. As I calculated.", o(pre=.2)),
 ("say", "q808", P, "Um... Basil? Two suspects have net veins. And you're agreeing with GLITCH.", o(kw=[["agree", "agreeing"]])),
 ("mark", "freeze"), ("wait", 1.2),                                  # hold: the stamp frozen in mid-air; record scratch
 ("say", "q809", H, "Basil is not an expert at waiting.", o(pre=.1)),
 ("say", "q810", B, "Case... not closed. Good catch, Pip.", o()),
 ("say", "q811", M, "But WHY does the mango leaf feel smooth all the way round, and ours feels bumpy?", o(kw=[["feel", "feel"]])),
 ("mark", "think0"), ("wait", 3.0),                                  # hold: THINK card: spot the difference, look at the edges
 ("say", "q812", H, "The mango leaf has a straight edge. The mystery leaf has a jagged edge, like tiny teeth. The mango tree is cleared.", o(pre=.2, kw=[["straight", "straight"], ["jagged", "jagged"], ["clr2", "cleared"]])),
 ("say", "q813", B, "Suspect three: the hibiscus. Net veins, a jagged edge, and the same oval shape with a pointed tip.", o(kw=[["hib", "hibiscus"], ["tk1", "net"], ["tk2", "jagged"], ["tk3", "oval"]])),
 ("mark", "match"), ("wait", 2.0),                                   # hold: the two leaves side by side, three ticks glowing
 ("say", "q814", H, "Every clue matches. The hibiscus dropped the mystery leaf!", o(pre=.2)),
 ("say", "q815", B, "NOW it's case closed!", o(kw=[["stamp", "closed"]])),
 ("mark", "clap"), ("wait", 1.4),                                    # hold: THE HIGH-FIVE LANDS: CLAP!
 # ---- glitch · THE VILLAIN: "Show me the data", and the peace
 ("scene", "glitch"),
 ("say", "g901", G, "Incorrect. My scan said mango. Show me the data.", o(pre=.6, kw=[["data", "data"]])),
 ("say", "g902", B, "Here's the data.", o()),
 ("mark", "scan"), ("wait", 2.4),                                    # hold: the evidence on GLITCH's chest panel; SCANNING...
 ("say", "g903", P, "Pandan: parallel veins. Mango: a straight edge. Hibiscus: every clue matches.", o(pre=.2, kw=[["ev1", "pandan"], ["ev2", "mango"], ["ev3", "hibiscus"]])),
 ("mark", "bzzt"), ("wait", 1.2),                                    # hold: BZZT! swirly eyes, sparks
 ("say", "g904", G, "Error. Colour: the same. Size: different. Owner... hibiscus.", o(pre=.1)),
 ("say", "g905", B, "You rushed. I rushed too. A good detective reads every clue.", o(kw=[["pat", "rushed"]])),
 ("say", "g906", G, "Updating! Lesson stored: read a leaf by its parts. Colour and size: weak clues.", o(kw=[["upd", "updating"], ["stored", "stored"], ["weakc", "weak"]], post=.6)),
 ("say", "g907", G, "Returning lost property to the hibiscus!", o(kw=[["tape2", "returning"]])),
 ("say", "g908", L, "Aiyoh. Leaf drop already, cannot stick back one lah. The plant grows new leaves. Slowly, slowly.", o(kw=[["newleaves", "grows"]])),
 ("say", "g909", G, "...Removing tape.", o(pre=.3)),
 ("mark", "peel"), ("wait", 2.4),                                    # hold: GLITCH peels each taped leaf off; SKRITCH! SKRITCH!
 # ---- reveal · THE WITNESS REVEAL
 ("scene", "reveal"),
 ("say", "r951", H, "Did you spot the snail? Just now, it was under a hibiscus leaf!", o(pre=.3, kw=[["rsnail", "snail"]])),
 ("say", "r952", M, "Snails eat leaves, and a snail's tongue has thousands of tiny teeth!", o(kw=[["ff_in", "tongue"]])),
 ("say", "r953", B, "Our witness was sitting on the answer all along.", o()),
 ("say", "r954", H, "Tell someone at home!", o(post=.4)),
 # ---- words · THE WORDS THAT EARN MARKS (Pip reads)
 ("scene", "words"),
 ("say", "m1001", H, "Now, here are the words that earn marks.", o(pre=.3, post=.1)),
 ("say", "m1002", P, "Say it with me!", {"pre": .3}), ("wait", .8),
 ("say", "m1003", P, EXAM, {"pre": 0, "gap": .35}), ("wait", 2.5),
 # ---- finish · THE COSY END: GLITCH's new rule, the callback, the score
 ("scene", "finish"),
 ("say", "k1101", G, "Fallen leaf detected.", o(pre=.6)),
 ("say", "k1102", M, "And whose is it?", o()),
 ("say", "k1103", G, "Net veins. Jagged edge. Hibiscus. And it stays on the ground.", o(kw=[["stays", "stays"]])),
 ("say", "k1104", P, "Basil, am I shorter than a pandan leaf?", o(pre=.5)),
 ("say", "k1105", B, "Case closed.", o(pre=.3)),
 ("say", "k1106", H, "Picked clue three? You win a point, and so does Basil!", o(pre=.6, kw=[["coin1", "point"]])),
 # ---- next · the link to EP4: a prickly customer (wordless)
 ("scene", "next"), ("mark", "ding"), ("wait", 1.6),                # hold: DING! the cactus hops up onto the desk
 ("mark", "turn"), ("wait", 1.4),                                    # hold: all three turn slowly to GLITCH
 ("say", "n1201", G, "...Not me.", o(pre=0)),
 ("say", "n1202", H, "Next time, a prickly customer at the Help Desk!", o(post=.4)),
 # ---- kwrecap, "Now you know!", the outro (GLITCH scans a fallen leaf and leaves it on the ground)
 *kwrecap(["Leaf blade", "Leaf stalk", "Net veins", "Parallel veins"]),
 *NYK,
 # ---- blooper (after the end card)
 ("scene", "blooper"), ("wait", .4),
 ("say", "e1701", B, "Case closed!", {"pre": 0, "post": 0, "kw": [["slap", "closed"]]}),
 ("mark", "flutter"), ("wait", 1.0),
 ("say", "e1702", M, "Basil. The evidence.", {"pre": .2, "post": .1}),
 ("say", "e1703", B, "...Case reopened.", {"pre": .2, "post": .1}),
 ("say", "e1704", P, "Take two!", {"pre": .2, "post": .1}),
 ("mark", "take2"), ("wait", .5),
 # ---- glitchend · GLITCH ALONE: his signature ending (the very last shot)
 ("scene", "glitchend"), ("mark", "ge0"), ("wait", .6),
 ("mark", "stutter"), ("wait", 1.0),                                 # the hard digital stutter (his sprite only)
 ("mark", "silence"), ("wait", 1.8),                                 # TRUE SILENCE
 ("say", "z1301", G, "New knowledge acquired.", {"pre": 0, "post": 0, "sting": True, "kw": [["acq", "acquired"]]}),
 ("mark", "black"), ("wait", .5),                                    # cut to black
]
# PACING (as EP2): a buddy or guest line with two or more sentences keeps .38 s between its sentences; think time after Heart's teaching lines
THINK_AFTER = {"o405": .5, "s507": .5, "l604": .3, "q803": .3, "q812": .4, "q814": .2, "g903": .2, "g906": .3, "g908": .3, "j706": .2,
  "l602": .2, "l603": .2, "q802": .2, "a201": .3}
for _i, _it in enumerate(SEQ1):
    if _it[0] == "say" and _it[2] in (P, B, M, L, G) and "gap" not in _it[4] and len(re.findall(r"[.!?:](?:\s|$)", _it[3].replace("...", "…"))) >= 2:
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
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L, G)}
        words = {w: sum(len(it[3].split()) for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L, G)}
        print(f"Part {part}: {n} words; lines per speaker {lines}; words {words}")
