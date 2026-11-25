"""script.py: P4 EP1 "TheOneApp, Explained", "The Great Bike Breakdown" (Systems: bike, body, tree): the APPROVED script
(../p4/p4_ep01_script.md, version 1 of 25 Nov 2026, Opus; the teacher, 25 Nov 2026: "ok for the first script") as data. ONE video (about
6:40): one story on one clock (RIDE IN 60:00 -> 1:00). Every spoken line is word for word as in the script's beat table (section 4).

THE P4 STYLE (teacher, 25 Nov 2026; SecondBrain Plans/videos/P4-new-direction.md; ../p4/README.md): format B, THE FIX-IT. The problem is the
first line; three fix cards (1 pedal harder / 2 tie on a skipping rope / 3 put back the chain), the lock-in (a 6 s ring), the picks (Pip 1,
Basil 2, Momo 3); fix 1 fails (slow-motion replay), fix 2 fails (the rope flops onto Basil's head), LOOK CLOSER at the chain and the gear
(FUNCTION), BE THE THING (a link of the chain), fix 3 TESTED the mechanic's way (lift the back wheel, turn the pedal: INTERACT), the twist (no
brakes; the think card "If the bell falls off...": likely to be affected; SYSTEM), the ride (the body and a rain tree are systems too), the
words that earn marks (Basil), the callback joke and Heart mystery hint #2 (the bell's reflection), the link to EP2 (Chilli), the read-along,
"Now you know!", the blooper.

PACING (P4 README section 4; the teacher: "the rhythm of P3 EP1-10"): Heart speed .90 with .5 s between sentences, buddies 12% slower
(make_voice.py, as EP27); about .55 s between lines (pre .45 / post .3 -> build_tl lays .34 + .23) and about 1.0 s between scenes; the holds
as written; the lock-in ring 6 s; one more silent think pause of 3.5 s on the bell question.

Line ids as the script. SEQ items as EP27: ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark,
secs, gap) · ("unison", id, text, {opts}). say opt "slowof": [id, stretch, semitones] (the slow-motion replay, from EP27).
"""
import re, os
H, P, B, M, G = "heart", "pip", "basil", "momo", "chilli"
CUTS = set()
CHANT = [("System!", "Function!")]; CHANT_CAPS = ([1.0], [1.2])   # not used (no chant in P4: script section 0); make_voice imports them
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
D = {"pre": .65, "post": .55}                      # the P3 EP1-10 gap between lines (build_tl lays .49 + .38: about .85 s; see PACING)
def o(**k): return {**D, **k}
# the words that earn marks (script section 7; e903b, Basil)
EXAM = "A system is made up of different parts. Each part has its own function. The parts interact to perform a function. When one part stops working, the whole system is likely to be affected."

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
SC_GAP = ("wait", .6)    # with the lines' own pre/post: about 1.4 s between scenes

SEQ1 = [
 # ---- cold · THE PROBLEM (speaking from 0.6 s): the void deck, Saturday 9 a.m.; Pip's bike (no chain, no brake levers, no bell), the box
 #      USELESS PARTS; RIDE IN 60:00 pops on "one hour" and ticks
 ("scene", "cold"), ("wait", .45),
 ("say", "e101", H, "The class bike ride starts in one hour!", {"pre": .2, "post": .3, "kw": [["clock", "one"]]}),
 ("say", "e102p", P, "Ta-da! My Super-Light Racer! I took off every part that does nothing. Lighter bike, faster bike!", o(kw=[["sign", "super-light"]])),
 ("say", "e103p", P, "Ready, steady... whoa, whoa, whoa!", o(post=.1, kw=[["pedal0", "ready"], ["tip", "whoa"]])),
 ("mark", "topple"), ("wait", 2.2),
 ("say", "e104b", B, "Lightest bike in Singapore. Also the slowest.", o()),
 ("say", "e105m", M, "Pip! Which parts did you take off?", o()),
 ("say", "e106p", P, "Only the boring ones. Don't worry, I've got a plan!", o(kw=[["box", "boring"]])),
 ("say", "e107b", B, "That's how this started.", o(post=.4)),
 SC_GAP,
 ("scene", "title"), ("mark", "title"),
 ("say", "e108", H, "The Great Bike Breakdown!", {"pre": .35, "post": .6}),
 # ---- fixcards · THE FIX CARDS (one set of three big numbered picture cards)
 ("scene", "fixcards"),
 ("say", "e201p", P, "Plan one: I pedal harder. Much, much harder!", o(kw=[["c1", "one"]])),
 ("say", "e202b", B, "Plan two: we loop Momo's skipping rope round the gears.", o(kw=[["c2", "two"]])),
 ("say", "e203m", M, "Plan three: put back the chain you took off.", o(kw=[["c3", "three"]])),
 ("say", "e204p", P, "The chain? It just goes round and round, and it makes my socks black!", o(kw=[["sock", "socks"]])),
 ("say", "e205", H, "Which fix gets the bike moving? Show me one, two or three fingers!", o(post=.2, kw=[["show", "show"]])),
 # ---- lock · THE LOCK-IN (the countdown takes the stage; a 6 s ring)
 ("scene", "lock"), ("wait", .3), *LOCK("fix", 6.0),
 # ---- picks · each buddy stands under their own card
 ("scene", "picks"),
 ("say", "e206p", P, "One! My legs are super strong!", o(pre=.3)),
 ("say", "e207b", B, "Two. A loop is a loop.", o()),
 ("say", "e208m", M, "Three. If it was on the bike, maybe it had a job.", o()),
 ("say", "e209", H, "Three fixes. Let's test them!", o(post=.5, kw=[["roll55", "three"]])),
 SC_GAP,
 # ---- pedal · FIX 1: PEDAL HARDER (Basil holds the bike up by the seat)
 ("scene", "pedal"),
 ("say", "e301", H, "Fix one. Pip pedals harder!", o(pre=.3, kw=[["pedalgo", "pedals"]])),
 ("say", "e302p", P, "Faster, faster, FASTER!", o(post=.1)),
 ("mark", "still"), ("wait", 2.4),
 ("say", "e303m", M, "The pedals spin, but the back wheel isn't moving!", o(post=.4)),
 # ---- replay · THE SLOW-MOTION REPLAY (running gag)
 ("scene", "replay"),
 ("say", "e304", H, "Let's look at that again, in slow motion.", o(pre=.3, post=.1)),
 ("mark", "slow0"),
 ("say", "e302s", P, "Faster, faster, FASTER!", {"pre": .2, "post": .3, "slowof": ["e302p", 2.4, -6]}),
 ("say", "e305", H, "The front gear turns, but nothing joins it to the back wheel. Pushing harder on one part cannot do another part's job.", o(kw=[["fgear", "front"], ["gap", "nothing"], ["stuck", "pushing"]])),
 ("say", "e306b", B, "Strong legs. Going nowhere.", o(post=.5)),
 SC_GAP,
 # ---- rope · FIX 2: THE SKIPPING ROPE (the second try; the mechanic's test; the rope flops onto Basil's head)
 ("scene", "rope"),
 ("say", "e401", H, "Fix two. The skipping rope goes round both gears.", o(pre=.3, kw=[["tie", "skipping"]])),
 ("say", "e402b", B, "Lift the back wheel, turn the pedal, and watch the magic.", o(post=.1, kw=[["lift", "lift"], ["turn", "turn"]])),
 ("mark", "slide"), ("wait", 1.5), ("mark", "flop"), ("wait", 1.7),
 ("say", "e403m", M, "The magic is on your head, Basil.", o(post=.5)),
 SC_GAP,
 # ---- lcchain · [LOOK CLOSER] the chain and the gear (FUNCTION, Momo: she picked right)
 ("scene", "lcchain"),
 ("say", "e501", H, "Look closer. Here is the chain from Pip's box of useless parts.", {**LC, **o(pre=.3), "kw": [["chain", "chain"]]}),
 ("say", "e502m", M, "See the gaps in the chain? Each tooth of the gear fits into one, so when the gear turns, it pulls the chain along.", o(kw=[["gaps", "gaps"], ["tooth", "tooth"], ["pulls", "pulls"]])),
 ("say", "e503", H, "The chain pulls the back gear, and the back wheel turns. A smooth rope has no gaps, so the teeth slip.", {**LC, **o(), "kw": [["drive", "back"], ["rope", "smooth"]]}),
 ("mark", "v_chain"),
 ("say", "e504m", M, "So the chain has a function. A function is a part's special job. The chain's job is to turn the back wheel when you pedal.", o(post=.1, kw=[["kw_function", "function"]])),
 HOLD("kw_function"),
 ("say", "e505b", B, "So my rope had no function. Noted.", o(post=.5)),
 # ---- waitw + shrink + pullout · BE THE THING: a link of the chain (quiet: the micro-world pad only)
 ("scene", "waitw"),
 ("say", "e601", H, "Be one little link of the bike chain! Shrink down. Quietly.", o(pre=.3, post=.6, kw=[["be", "be"], ["shrinkw", "shrink"]])),
 ("scene", "shrink"), ("wait", 1.5),
 ("say", "e602", H, "You are a link at the top of the chain, between the two gears.", {**SLOW, "pre": 0, "post": .3, "kw": [["jtop", "top"]]}),
 ("mark", "wave"), ("wait", 1.0),
 ("say", "e603", H, "Someone pushes the pedals. The front gear's teeth grab you and pull you forward.", {**SLOW, "pre": .3, "post": .3, "kw": [["jpush", "pushes"], ["jgrab", "grab"]]}),
 ("say", "e604", H, "The whole chain moves with you, and tugs the back gear round. The back wheel turns!", {**SLOW, "pre": .3, "post": .3, "kw": [["jtug", "tugs"], ["jwheel", "wheel"]]}),
 ("say", "e605", H, "Round the front gear you go, back underneath, and round again.", {**SLOW, "pre": .3, "post": .4, "kw": [["jround", "round"], ["junder", "underneath"]]}),
 ("scene", "pullout"), ("wait", 1.2),
 # ---- chainfix · FIX 3: THE CHAIN, TESTED (the mechanic's way; INTERACT)
 ("scene", "chainfix"),
 ("say", "e701", H, "Fix three. The chain goes back on.", o(pre=.3, kw=[["fit", "chain"]])),
 ("say", "e702m", M, "Lift the back wheel, and turn the pedal...", o(post=.1, kw=[["lift3", "lift"], ["turn3", "turn"]])),
 ("mark", "crank"), ("wait", 2.0),
 ("say", "e703p", P, "It spins! The back wheel spins!", o(kw=[["spins", "spins"]])),
 ("say", "e704m", M, "Pedals, gear, chain, wheel. Each part acts on the next one.", o(kw=[["p1", "pedals"], ["p2", "gear"], ["p3", "chain"], ["p4", "wheel"], ["acts", "acts"]])),
 ("say", "e705m", M, "Scientists say the parts interact: they act on one another.", o(post=.1, kw=[["kw_interact", "interact"]])),
 HOLD("kw_interact"),
 ("say", "e706b", B, "Even I can't argue with a spinning wheel.", o(post=.5)),
 SC_GAP,
 # ---- brakes · THE TWIST: can it stop? (the tense bed to e710; the think card; likely to be affected; SYSTEM)
 ("scene", "brakes"),
 ("say", "e707b", B, "Pip, before you ride, squeeze the brakes.", o(pre=.3, kw=[["clock10", "before"]])),
 ("say", "e708p", P, "Squeeze... squeeze... Oh. I took those off too.", o(kw=[["squeeze", "squeeze"], ["ohno", "oh"]])),
 ("say", "e709m", M, "Pip! A bike that cannot stop is not safe!", o()),
 ("say", "e710", H, "The brakes help the bike stop safely, and the bell warns people. Every part has its own function.", o(post=.1, kw=[["brk", "brakes"], ["bellw", "bell"], ["every", "every"]])),
 ("mark", "refit"), ("wait", 2.6),
 ("say", "e711", H, "Quick question! If the bell falls off on the ride, can the bike still move? Think about it.", o(post=.1, kw=[["think", "quick"]])),
 ("mark", "think0"), ("wait", 3.5), ("mark", "think1"),
 ("say", "e712p", P, "It can still move, but it is not as safe!", o()),
 ("say", "e713", H, "Yes! When one part stops working, the whole system is likely to be affected.", o(kw=[["side", "when"], ["likely", "likely"]])),
 ("say", "e714b", B, "So the bike is a system. A system is made up of different parts, and each part has its own special function.", o(post=.1, kw=[["kw_system", "system"], ["parts", "parts"]])),
 HOLD("kw_system"),
 ("wait", .3), SC_GAP,
 # ---- ride · THE RIDE (the park connector), then the look-closer inside Pip, then the rain tree
 ("scene", "ride"),
 ("say", "e801", H, "With one minute to spare, Pip makes the ride!", o(pre=.3, kw=[["go", "makes"]])),
 ("say", "e802m", M, "Pip, you're puffing! Is something inside you broken too?", o(post=.4)),
 ("scene", "inpip"),
 ("say", "e803", H, "Nothing is broken. Look closer. Pip's bones and muscles move his legs. His heart beats faster, and he breathes faster.", {**LC, **o(pre=.3), "kw": [["lcin", "look"], ["bones", "bones"], ["muscles", "muscles"], ["heart", "heart"], ["breath", "breathes"]]}),
 ("mark", "widen"), ("wait", 3.0),
 ("say", "e805b", B, "So Pip's body is made of systems too. Very furry ones.", o(post=.5)),
 ("scene", "tree"),
 ("say", "e807", H, "And the ride ends under a giant rain tree.", o(pre=.3, kw=[["rain", "rain"]])),
 ("say", "e808b", B, "And a tree is a system too. Its leaves, its stem and its roots each have their own function.", o(post=.5, kw=[["lv", "leaves"], ["stm", "stem"], ["rts", "roots"]])),
 SC_GAP,
 # ---- words · THE WORDS THAT EARN MARKS (Basil: "Say it with me!" + 0.8 s, then he reads the card)
 ("scene", "words"),
 ("say", "e901", H, "Now, here are the words that earn marks.", o(pre=.3, post=.1)),
 ("say", "e902b", B, "Say it with me!", {"pre": .3}), ("wait", .8),
 ("say", "e903b", B, EXAM, {"pre": 0, "gap": .35}), ("wait", 2.5),
 # ---- callback · THE CALLBACK JOKE, the bell (HEART MYSTERY HINT #2), the score
 ("scene", "callback"),
 ("say", "e1001p", P, "Basil, your tail doesn't pedal, and it doesn't ring. Lighter lizard, faster lizard?", o(pre=.3, kw=[["tail", "tail"]])),
 ("say", "e1002b", B, "My tail helps me balance. Every part has a function, Pip.", o()),
 ("say", "e1003p", P, "Ring, ring! My bell works!", o(kw=[["ring", "ring"]])),
 ("say", "e1004", H, "Picked the chain? You win a point, and so does Momo!", o(post=.5, kw=[["coin1", "point"]])),
 # ---- next · THE LINK TO EP2: the Science Help Desk; Chilli hops in
 ("scene", "next"), ("wait", .5), ("mark", "hop"), ("wait", 1.5),
 ("say", "e1102g", G, "Excuse me. I'm watered every single day. So why am I wilting?", o(pre=.2)),
 ("say", "e1103", H, "Next time, at the Plant Help Desk!", o(post=.6)),
 # ---- kwrecap, "Now you know!", the outro
 *kwrecap(["System", "Function", "Interact"]),
 *NYK,
 # ---- blooper (after the end card)
 ("scene", "blooper"), ("wait", .4),
 ("say", "e1601p", P, "Lighter bike, faster bike!", {"pre": 0, "post": .1, "kw": [["boing", "faster"]]}),
 ("say", "e1602b", B, "Lighter bike.", {"pre": .3, "post": .1}),
 ("say", "e1603m", M, "Not faster.", {"pre": .2, "post": .2}),
 ("mark", "take2"), ("wait", 1.0),
]
# PACING (measured 25 Nov on the first timeline: 5:43, 130 words a minute, voice on 76%: the recorded buddies speak at about 3.3 words a
# second, faster than the script's 2.7 estimate). The P4 README's fix: "lengthen the holds and think pauses (never add words)". So the gap
# between lines is .85 s (D), between scenes about 1.4 s, the holds a little longer, a buddy line with two or more sentences keeps .38 s
# between its sentences (gap), and Heart's teaching sentences get a beat of think time after them (THINK_AFTER).
THINK_AFTER = {"e305": .9, "e503": .9, "e713": .9, "e710": .5, "e604": .9, "e803": .4, "e808b": .5, "e1004": .4, "e209": .3, "e504m": .2,
  # second round (6:10, 120 words a minute, voice on 72%): room to look at each card, the magnifier, the journey, the riding shots
  "e101": .4, "e102p": .3, "e108": .4, "e201p": .5, "e202b": .5, "e203m": .5, "e206p": .4, "e207b": .4, "e208m": .4, "e302s": .4, "e401": .4,
  "e501": .5, "e502m": .8, "e602": .5, "e603": .5, "e605": .5, "e703p": .3, "e704m": .5, "e712p": .3, "e801": .6, "e807": .6, "e1003p": .5}
for _i, _it in enumerate(SEQ1):
    if _it[0] == "say" and _it[2] in (P, B, M, G) and "gap" not in _it[4] and "slowof" not in _it[4] and len(re.findall(r"[.!?](?:\s|$)", _it[3].replace("...", "\u2026"))) >= 2:
        _it[4]["gap"] = .38
    if _it[0] == "say" and _it[1] in THINK_AFTER: _it[4]["post"] = _it[4].get("post", .3) + THINK_AFTER[_it[1]]
SEQS = {1: SEQ1, 2: []}

if __name__ == "__main__":
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1}
    assert not dup, dup
    for part, s in SEQS.items():
        if not s: continue
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, G)}
        words = {w: sum(len(it[3].split()) for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, G)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}; words {words}")
