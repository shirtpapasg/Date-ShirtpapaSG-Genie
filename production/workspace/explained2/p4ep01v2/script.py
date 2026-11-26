"""script.py: P4 EP1 v2 "TheOneApp, Explained", "The Great Void Deck Race" (Systems: bike, body, tree): the APPROVED script
(../p4/p4_ep01_script.md, version 2 of 26 Nov 2026, Opus; the teacher, 26 Nov 2026: "OK to the EP1 v2 script") as data. ONE video (about
6:30). Every spoken line is word for word as in the script's beat table (section 5), with the decisions taken on its open questions
(section 14, the teacher did not object):
- FIX CARDS 2 AND 3 SWAPPED (section 14 item 8): card 2 is now "ALL THREE PARTS BACK" (Pip, the RIGHT answer) and card 3 "CHAIN + BRAKES
  (skip the bell)" (Momo, the near miss). Every reference follows: the pitches (Pip says "Fix two", Momo "Fix three"; Pip's pitch and the
  checklist tease now come before Momo's pitch, so the tease follows the checklist it teases), the picks (Basil 1, Pip 2, Momo 3), the
  lock-in, the stamps (card 2 READY TO RIDE!, card 3 NOT SAFE YET), Momo's "That's my fix three!", the score "Picked fix two?", the app
  moments and the chapters.
- The length is kept (about 6:30; no cuts); the slapstick, both talk-to-camera moments and Heart's movie-trailer voice are kept as written.
- Teacher's addition (26 Nov, via the coordinator): when Basil runs out of puff and slumps after losing the race, a tiny "toot" (sound
  only, nothing shown), then Momo: "Was that the bike?" Basil (deadpan): "Yes." (r703m, r703b; the only gag of that kind in EP1).

SEQ items as EP27: ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("unison", id, text, {opts}). say opt "trailer": Heart's movie-trailer voice (the same words, pitched down 3 semitones, a big hall reverb:
make_voice.py). Guest: Uncle Lim ("lim"), two lines, warm light Singlish (teacher 26 Nov: "lacking the singlish element"): "Slowly, slowly lah. Where got need to rush?" and "Aiyoh, boy. Slowly, slowly also can win one, mah. Every part working together!".
"""
import re, os
H, P, B, M, L = "heart", "pip", "basil", "momo", "lim"
CUTS = set()
CHANT = [("System!", "Function!")]; CHANT_CAPS = ([1.0], [1.2])   # not used (no chant in P4); make_voice imports them
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
D = {"pre": .45, "post": .35}
def o(**k): return {**D, **k}
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
SC_GAP = ("wait", .45)

SEQ1 = [
 # ---- cold · THE PROBLEM: the freeze-frame (Basil in the ice box, three minutes before the race)
 ("scene", "cold"), ("wait", .25),
 ("say", "c101", H, "This is Basil. Basil is sitting in an ice box.", {"pre": .1, "post": .1, "kw": [["frz", "box"]]}),
 ("wait", 1.0),
 ("say", "c102", B, "Yep, that's me. You're probably wondering how I got here.", o(kw=[["thaw", "here"]])),
 ("say", "c103", M, "Basil! Your race with Uncle Lim starts in three minutes!", o(kw=[["clock", "three"]])),
 ("say", "c104", P, "And your bike has no bell, no chain and no brakes!", o(kw=[["ob", "bell"], ["oc", "chain"], ["obr", "brakes"]])),
 ("say", "c105", B, "Because LIGHTER IS FASTER!", o(kw=[["cry1", "lighter"]])),
 ("say", "c106", H, "Basil is not an expert at bicycles.", o(post=.6)),
 SC_GAP,
 ("scene", "title"), ("mark", "title"),
 ("say", "c107", H, "The Great Void Deck Race!", {"pre": .35, "post": .6}),
 # ---- fixcards · THE FIX CARDS (a huddle). Cards 2 and 3 swapped (see the docstring)
 ("scene", "fixcards"),
 ("say", "f201", H, "Three minutes! Which fix gets Basil racing?", o(pre=.3)),
 ("say", "f202", B, "Fix one: no fixing. I just pedal faster!", o(kw=[["c1", "one"]])),
 ("say", "f203", P, "Fix two: put all three parts back. I made a checklist.", o(kw=[["c2", "two"], ["clip", "checklist"]])),
 ("say", "f205", B, "You always make a checklist.", o()),
 ("say", "f206", P, "And you never read it.", o()),
 ("say", "f204", M, "Fix three: put the chain and the brakes back, and skip the bell. A bell can't make you go!", o(kw=[["c3", "three"]])),
 ("say", "f207", H, "Show me one, two or three fingers!", o(post=.2, kw=[["show", "show"]])),
 # ---- lock · THE LOCK-IN (6.5 s ring)
 ("scene", "lock"), ("wait", .5), *LOCK("fix", 6.0), ("wait", .3),
 # ---- picks · each buddy under their own card; high-five miss 1
 ("scene", "picks"), ("mark", "pk0"), ("wait", 1.2),
 ("say", "p208", M, "Team high-five!", o(pre=.2, post=.1)),
 ("mark", "miss1"), ("wait", 1.2),
 ("say", "p209", H, "Let's test them! But first: ten minutes earlier...", o(kw=[["rew", "ten"]])),
 # ---- bay · TEN MINUTES EARLIER: the bicycle bay
 ("scene", "bay"), ("wait", 1.4),
 ("say", "s301", B, "Uncle Lim's old bike is full of useless parts. Mine won't be. LIGHTER IS FASTER!", o(pre=.2, kw=[["cry2", "lighter"]])),
 # ---- bell · STOP 1: THE BELL
 ("scene", "bell"),
 ("say", "b401", B, "Who needs a bell? I'm faster as well!", o(pre=.3, kw=[["flick", "bell"]])),
 ("say", "b402", P, "Um... but what does THAT part do?", o()),
 ("say", "b403", B, "It goes ring. That's all.", o()),
 ("say", "b404", M, "But WHY does it go ring?", o()),
 ("say", "b405", B, "Nobody knows. Off it comes!", o(post=.2, kw=[["clink", "off"]])),
 ("mark", "rideoff"), ("wait", 2.6),
 ("say", "b406", B, "Ring, ring!", {"pre": 0, "post": .1}),
 ("mark", "flap"), ("wait", 2.0),
 ("say", "b407", H, "A bell warns people, and pigeons, that you are coming. Basil is not an expert at bells.", o(kw=[["warn", "warns"], ["notexp", "basil"]])),
 ("say", "b408", B, "I have made some new friends.", o(post=.5)),
 SC_GAP,
 # ---- chain · STOP 2: THE CHAIN (the snail-cam), the replay, the snail tease
 ("scene", "chain"),
 ("say", "n501", B, "Who needs a chain? It's a greasy pain!", o(pre=.3, kw=[["grease", "greasy"]])),
 ("say", "n502", P, "Um...", o(post=0)),
 ("mark", "yt2"), ("wait", 1.8),
 ("say", "n503", B, "It goes round and round. That's all.", o(pre=.3)),
 ("say", "n504", M, "But WHY does it go round and round?", o()),
 ("say", "n505", B, "To make my tail greasy. Off it comes!", o(post=.2, kw=[["sproing", "off"]])),
 ("scene", "snailcam"), ("mark", "pedalc"), ("wait", 2.2),
 ("say", "n506", H, "Without a chain, the pedals cannot turn the back wheel.", o(pre=.1, post=.2, kw=[["pedt", "pedals"], ["bwst", "back"]])),
 ("mark", "ovt"), ("wait", 2.6),
 ("scene", "replay"),
 ("say", "n507", H, "The slowest overtake in history. Let's see it again, in slow motion.", o(pre=.2, post=.1, kw=[["slow0", "motion"]])),
 ("mark", "rp0"), ("wait", 2.6),
 ("scene", "tease"),
 ("say", "n508", M, "Basil, you just lost to a snail.", o(pre=.3)),
 ("say", "n509", B, "Because it's LIGHTER!", o(post=.5, kw=[["cry3", "lighter"]])),
 SC_GAP,
 # ---- brakes · STOP 3: THE BRAKES (top of the ramp)
 ("scene", "brakes"),
 ("say", "k601", B, "To the ramp! Who needs brakes? Speed is all it takes!", o(pre=.3, kw=[["sqz", "brakes"]])),
 ("say", "k602", P, "Um...", o(post=0)),
 ("mark", "yt3"), ("wait", 1.8),
 ("say", "k603", P, "What they said.", o(pre=.2)),
 ("say", "k604", B, "Brakes slow you down. Winners never slow down!", o()),
 ("say", "k605", M, "But WHY would anybody want to slow down?", o()),
 ("say", "k606", B, "Exactly! Off they come!", o(post=.1, kw=[["clang", "off"]])),
 ("mark", "lean"), ("wait", 1.2), ("mark", "click"), ("wait", 1.4),
 # ---- runaway · THE SET PIECE
 ("scene", "runaway"),
 ("say", "k607", P, "The bike! It's rolling away!", o(pre=.1, post=.1)),
 ("mark", "chainrx"), ("wait", 2.4),
 ("say", "k608", M, "Basil! Squeeze the brakes!", o(pre=.2, post=.1)),
 ("say", "k609", B, "It hasn't GOT any brakes!", o(pre=.3, post=.1)),
 ("say", "k610", P, "Then nothing can slow its wheels down. It can't stop!", o(pre=.3, kw=[["noslow", "nothing"]])),
 ("say", "k611", M, "We need something big to stop it! The ice box!", o(pre=.3, post=.1, kw=[["icebox", "ice"]])),
 ("mark", "push"), ("wait", .9), ("mark", "bonk"), ("wait", .6), ("mark", "splash"), ("wait", 1.4),
 ("say", "k612", H, "Brakes help a bike slow down and stop safely. Basil is fine. Basil is a little cold.", o(kw=[["brkl", "brakes"], ["cold", "fine"]])),
 ("say", "k613", P, "Don't do this at home. Seriously.", o(post=.6)),
 SC_GAP,
 # ---- race · FIX 1, TESTED: THE RACE (the twist), the toot (teacher's addition)
 ("scene", "race"),
 ("say", "r701", H, "In a world... where one lizard thought a bell was too heavy... one race decides everything.", o(pre=.3, trailer=True, kw=[["tr1", "world"], ["tr2", "where"], ["tr3", "one", 1]])),
 ("say", "r702", P, "Helmets on. Ready, steady, GO!", o(pre=.5, post=0, kw=[["helm", "helmets"], ["go", "go"]])),
 ("mark", "racego"), ("wait", 5.4),
 ("say", "r703", L, "Slowly, slowly lah. Where got need to rush?", o(pre=.2, post=.4)),
 ("mark", "slump"), ("wait", .9), ("mark", "toot"), ("wait", .75),
 ("say", "r703m", M, "Was that the bike?", o(pre=0, post=.1)),
 ("say", "r703b", B, "Yes.", o(pre=.3, post=.7)),
 ("say", "r704", B, "I let him win.", o(pre=.2)),
 ("say", "r705", M, "Your bike didn't even move.", o()),
 ("say", "r706", B, "I let it not move.", o(post=.5)),
 ("say", "r707", H, "Basil's pedals turn, but nothing joins them to the back wheel. Pedalling faster cannot do the chain's job.", o(kw=[["gap", "nothing"], ["stuck", "pedalling"]])),
 ("say", "r708", M, "But WHY did the old, heavy bike win?", o(post=.4)),
 SC_GAP,
 # ---- lcbike · LOOK CLOSER at Uncle Lim's "useless" bike (FUNCTION, Pip)
 ("scene", "lcbike"),
 ("say", "l801", H, "Look closer at Uncle Lim's bike.", {**LC, **o(pre=.3)}),
 ("say", "l802", P, "His bell warns people that he is coming. His brakes slow him down at the corner.", o(kw=[["lbell", "bell"], ["lbrk", "brakes"]])),
 ("say", "l803", M, "And his chain turns the back wheel when he pedals!", o(kw=[["lchain", "chain"]])),
 ("mark", "v_chain"),
 ("say", "l804", P, "Every part has its own special job, called its function.", o(post=.1, kw=[["kw_function", "function"]])),
 HOLD("kw_function"),
 ("say", "l805", B, "So my useless parts all had functions.", o()),
 ("say", "l806", P, "I told you s... Nice try, Basil.", o(pron={"s...": "sss..."}, kw=[["tok", "s"]])),
 ("say", "l807", H, "His bike is heavier, but it won, because all its parts work together.", o(kw=[["scale", "heavier"]])),
 ("say", "l808", B, "Sorry, bike.", o(post=.2)),
 ("mark", "miss2"), ("wait", 1.4),
 # ---- waitw + shrink + pullout · BE THE THING: a link of Uncle Lim's chain (quiet)
 ("scene", "waitw"),
 ("say", "j901", H, "Be one little link of Uncle Lim's chain! Shrink down. Quietly.", o(pre=.3, post=.6, kw=[["be", "be"], ["shrinkw", "shrink"]])),
 ("scene", "shrink"), ("wait", 1.5),
 ("say", "j902", H, "The front gear's teeth fit into your gaps, and pull you forward. The whole chain moves, and tugs the back gear round.", {**SLOW, "pre": 0, "post": .3, "kw": [["jgrab", "teeth"], ["jpull", "pull"], ["jtug", "tugs"]]}),
 ("mark", "wave"), ("wait", .6),
 ("say", "j903", H, "The back wheel turns!", {**SLOW, "pre": .3, "post": .5, "kw": [["jwheel", "wheel"]]}),
 ("scene", "pullout"), ("wait", 1.3),
 # ---- interact · the five pictures (INTERACT, Momo); the Gruffalo turn
 ("scene", "interact"),
 ("say", "j904", M, "Pedals, front gear, chain, back gear, wheel. Each part acts on the next one. Scientists say the parts interact.", o(pre=.4, kw=[["p1", "pedals"], ["p2", "front"], ["p3", "chain"], ["p4", "back"], ["p5", "wheel"], ["acts", "acts"], ["kw_interact", "interact"]])),
 HOLD("kw_interact"),
 ("say", "j905", B, "Okay. I want my parts back.", o(post=.6, kw=[["turn", "okay"]])),
 SC_GAP,
 # ---- reverse · THE REVERSAL (fixes 3 and 2, tested)
 ("scene", "reverse"),
 ("say", "v1001", B, "Every part has a job. Brakes, stop me. No more mistakes!", o(pre=.6, kw=[["rbrk", "brakes"]])),
 ("mark", "tick1"), ("wait", 1.0),
 ("scene", "rchain"),
 ("say", "v1002", B, "Every part has a job. Chain, turn my wheel again!", o(pre=.3, kw=[["rch", "chain"]])),
 ("mark", "spin"), ("wait", 1.4),
 ("say", "v1003", M, "Chain and brakes! That's my fix three! Race time!", o(pre=.2, post=0, kw=[["fix3", "three"]])),
 ("mark", "miss3"), ("wait", 1.0),
 ("say", "v1004", P, "Wait. Checklist. Ring the bell.", o(pre=.2)),
 ("say", "v1005", B, "Ring, ring?", o(post=.3)),
 ("say", "v1006", H, "Quick question! Without a bell, can the bike still move? Think about it.", o(post=.1, kw=[["think", "quick"]])),
 ("mark", "think0"), ("wait", 3.5), ("mark", "think1"),
 ("say", "v1007", P, "It can still move, but it is not as safe!", o()),
 ("say", "v1008", H, "Yes! When one part stops working, the whole bike is likely to be affected.", o(kw=[["side", "when"], ["likely", "likely"]])),
 ("scene", "rbell"),
 ("say", "v1009", B, "Every part has a job. Bell, you warn them well!", o(pre=.5, kw=[["rbell", "bell"]])),
 ("mark", "ring1"), ("wait", .45), ("mark", "ring2"), ("wait", 1.2),
 # ---- system · SYSTEM: finishing each other's sentence; the battle cry turned round
 ("scene", "system"),
 ("say", "v1010", P, "So a system is made up of different parts...", o(pre=.3, post=.2)),
 ("say", "v1011", M, "...each part has its own function...", o(pre=.2, post=.2)),
 ("say", "v1012", B, "...and the parts interact. My bike is a system!", o(pre=.2, post=.1, kw=[["kw_system", "system"]])),
 HOLD("kw_system"),
 ("say", "v1013", B, "ALL PARTS, WORKING TOGETHER!", o(post=.6, kw=[["cry4", "all"]])),
 SC_GAP,
 # ---- ride · the victory lap; the body; the rain tree
 ("scene", "ride"), ("wait", 3.2),
 ("say", "e1101", M, "Basil, you're puffing! But WHY?", o(pre=.2, post=.3)),
 ("scene", "inbasil"),
 ("say", "e1102", H, "Look closer. Your bones and muscles move your legs. Your heart beats faster, and you breathe faster. Your body is made up of systems too.", {**LC, **o(pre=.3), "kw": [["lcin", "look"], ["bones", "bones"], ["muscles", "muscles"], ["heart", "heart"], ["breath", "breathe"], ["bsys", "body"]]}),
 ("scene", "tree"), ("wait", 1.2),
 ("say", "e1103", P, "And the rain tree is a system. Its roots, stem and leaves each have a function.", o(pre=.2, post=.5, kw=[["rts", "roots"], ["stm", "stem"], ["lv", "leaves"]])),
 SC_GAP,
 # ---- words · THE WORDS THAT EARN MARKS (Basil)
 ("scene", "words"),
 ("say", "w1201", H, "Now, here are the words that earn marks.", o(pre=.3, post=.1)),
 ("say", "w1202", B, "Say it with me!", {"pre": .3}), ("wait", .8),
 ("say", "w1203", B, EXAM, {"pre": 0, "gap": .35}), ("wait", 2.5),
 # ---- finish · THE COSY END: the snail, the crown, the high-five
 ("scene", "finish"),
 ("say", "e1301", H, "But wait. Somebody is still racing!", o(pre=.3)),
 ("unison", "e1302", "Go, snail, go!", {"pre": .3, "post": .1}),
 ("mark", "cross"), ("wait", 2.4),
 ("say", "e1303", L, "Aiyoh, boy. Slowly, slowly also can win one, mah. Every part working together!", o(pre=.2)),
 ("mark", "clap"), ("wait", 1.6),
 ("say", "e1304", H, "Picked fix two? You win a point, and so does Pip!", o(post=.5, kw=[["coin1", "point"]])),
 # ---- kwrecap, "Now you know!", the outro (Chilli hops in, wordless)
 *kwrecap(["Function", "Interact", "System"]),
 *NYK,
 # ---- blooper (after the end card)
 ("scene", "blooper"), ("wait", .4),
 ("say", "e1601b", B, "LIGHTER IS FAST...", {"pre": 0, "post": 0, "kw": [["landp", "fast"]]}),
 ("mark", "frozen"), ("wait", 1.0),
 ("say", "e1602b", B, "I'll keep the bell.", {"pre": .2, "post": .1}),
 ("say", "e1603m", M, "Take two!", {"pre": .2, "post": .2}),
 ("mark", "take2"), ("wait", 1.0),
]
# PACING (P4 README section 4; v1's measured lesson: the recorded buddies speak at about 3.3 words a second): .85 s between lines (D),
# about 1.4 s between scenes, a buddy line with two or more sentences keeps .38 s between its sentences, think time after Heart's
# teaching sentences (THINK_AFTER).
THINK_AFTER = {"b407": .4, "n506": .2, "k612": .4, "r707": .6, "l802": .3, "l803": .3, "l807": .5, "j904": .2, "v1008": .6, "e1102": .4, "e1103": .3,
  "f204": .2, "c104": .2}
for _i, _it in enumerate(SEQ1):
    if _it[0] == "say" and _it[2] in (P, B, M, L) and "gap" not in _it[4] and "slowof" not in _it[4] and len(re.findall(r"[.!?](?:\s|$)", _it[3].replace("...", "…"))) >= 2:
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
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L)}
        words = {w: sum(len(it[3].split()) for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M, L)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}; words {words}")
