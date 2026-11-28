"""script.py: P3 EP9 "Snap it or bend it: strong vs flexible", Part 1 ("Paper vs Fabric: We Hung Weights Until One TORE!") and Part 2
("Rubber Band vs Ice-Cream Stick: Which One SNAPS?"): the script (../p3_ep09_script.md, version 1 of 21 Nov 2026, with the teacher's answers
in its section 12) as data. Every spoken line is word for word as in the script; a cell with two speakers is split into one line per speaker.
make_voice.py records the lines; build_tl.py lays them on the timeline.

Pace (SERIES_FORMAT.md section 3, teacher 2026-11-20): Heart speed .90, .5 s between sentences; buddies 12% slower; a sentence that says a
NEW TERM (opts "term") is said a little slower and followed by at least .65 s; a key word pops large and holds 2.0 s ("hold" item: the next
line waits until the pop has held 2.0 s and at least .6 s after the line); Mark Sentence cards hold 2.5 s after the buddy's last word; book
sentences on cream strips stay up at least 3.5 s (opts "hold"). The journeys: Heart .85, 1.0 s between sentences, softer. LOOK CLOSER: Heart
.85 with .8 s between sentences (the script: "about 0.85 ... about 0.8 to 1.0 s between sentences"), each moment ends on ONE verdict tag
(mark v_*) held 2.5 s (EP8 Stage 3).

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre / post = silence before / after (s; build_tl scales them by .75),
                                       speed, gap (Heart and buddies: silence between sentences), soft, term (substrings: said slowly, then
                                       >= .65 s), kw: [[mark, word, nth]] (a mark at that word's onset: a key word pops there),
                                       hold: s (the cursor goes on no earlier than the line's start + s), holdw: [word, s], after: [id, s]
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd)

Marks the picture and the sound use: kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), tick1..3 (a green
tick stamped on the board OUR 3 TESTS), boardsIn / budsIn (cold open), title, and the journey stops (dive, weave, cross, books, lift, hold, home;
dive, hook, picked, packet, ride, home, flexible).

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then make_voice is not needed; rebuild the timeline).
  Part 1: firsttwo (g508 "Today: the first two!"), sorrycup (g1004 Basil "Oops. Sorry, cup!"), piptwo (g605 Pip "Two."), sizesame (g706 Momo).
  Part 2: hungry (j807 Basil "Now I am hungry!"), snapped (j504 Pip "Oh! It snapped!"), tiles (j703 the rubber / ceramic tile line), million (j1302).
  (The title's second slam is a picture beat only: no time.)
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()   # nothing cut at Stage 1 (see STATE.md for the lengths and the cut candidates)
cut = lambda tag, items: [] if tag in CUTS else items

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer later in the same bar), YOUR TURN! after each line,
# no all-together bar (script segment 11). Basil's voice leads the first beat of each line (make_voice.py: his call is a little louder).
CHANT = [("Physical property!", "Measure or observe!"), ("Strength!", "Pull it, push it: no break, no tear!"), ("Flexibility!", "Bend without breaking!")]
CHANT_CAPS = ([1.3, .72, 1.12], [1.42, 2.15, 1.42])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word (the caption / script text is unchanged). "fragile" is fixed by ../sg_pron.py (FRAJ-ile), not here.
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys: softer and slower
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER: Heart describes what we SEE, slowly
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)            # a new term's pop: 2.0 s on screen; Heart waits at least .6 s
STRIP = 3.5                                         # a book sentence's cream strip: at least 3.5 s on screen
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]  # a look-closer's one verdict tag, held 2.5 s before the pull back

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w)
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
# the ending, exactly as EP1 round 3 (notes 14-16): "Say it with us!", 0.8 s, "Ready?", "One!", "two!", "Now you know!" 1.0 s apart, the blast, the outro
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 5.2)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .5}), ("wait", .8), ("chant", "c1003"), ("wait", .4)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .90})]
LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]

SEQ1 = [
 # ---- 1 · silent cold open: the void deck of an HDB block (6 s). 0:02 EP8's two boards slide in; 0:04 the buddies pop in
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP8 and its dare (two calm pictures), then OUR 3 TESTS, then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we met the seven materials. And we asked: a rubber band, and a wooden ice-cream stick. Which one can bend without breaking?", {"pre": .4, "post": .6}),
 ("scene", "tests"),
 ("say", "g202", B, "Snap it, or bend it? Let's test them!", {"pre": .4}),
 ("say", "g203", H, "Hold on to your answer! We have three tests. Test one: pull!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 2.4),
 # ---- 3 · the game, and the hidden spider (Heart names it; its picture pops)
 ("scene", "game"),
 ("say", "g301", H, "You against the Buddies! Lock in first. One finger for every point. A little spider is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (Momo reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", M, "What a physical property is.", {"pre": .3, "post": .3}),
 ("say", "g403", M, "What strength means.", {"pre": .3, "post": .3}), ("say", "g404", M, "Strong or fragile.", {"pre": .3, "post": .9}),
 *COUNT,
 # ---- 5 · what is a physical property? the paper strip; [LOOK CLOSER] observe, then measure; Mark Sentence 1 (Pip); the five properties
 ("scene", "strip"),
 ("say", "g501", H, "Here is a strip of paper. Look closer.", {"pre": .4}),
 ("scene", "lcpaper"),
 ("say", "g503", H, "Watch. A finger pushes the strip. It bends. We can observe that.", {**LC, "pre": .6}),
 ("say", "g504", H, "Now one weight hangs on it. The strip holds. We count: one. We can measure that.", {**LC, "pre": .6}),
 *VERDICT("v_property"),
 ("scene", "mark1"),
 ("say", "g505", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g506", P, "The physical property of a material is something that you can measure or observe.", {"pre": 0}),
 ("wait", 2.5), ("mark", "kw_property"), HOLD("kw_property"),
 ("scene", "five"),
 ("say", "g507", H, "The physical properties you will learn are strength, flexibility, the ability to float or sink in water, waterproof and transparency.", {"pre": .3}),
 *cut("firsttwo", [("say", "g508", H, "Today: the first two!", {"pre": .4, "post": .4})]),
 # ---- 6 · Round 1: paper or fabric?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g601", H, "Round one. Two strips, paper and fabric. Same length, same thickness: a fair test. We hang weights on each. Which one holds more? One, paper. Two, fabric. Three, the same. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1"),
 ("say", "g602", H, "Locked in!", {"pre": 0}),
 ("say", "g603", M, "Three! Same size, so they hold the same!", {"pre": .5}),
 ("say", "g604", B, "Two! My school bag is fabric. It carries ten books!", {"pre": .4}),
 *cut("piptwo", [("say", "g605", P, "Two.", {"pre": .4})]),
 ("wait", .3),
 # ---- 7 · test one: PULL. [LOOK CLOSER] the slow pull test (paper tears at 3, fabric holds 8), the two bars, the verdict
 ("scene", "lcpull"),
 ("say", "g701", H, "Look closer. One weight. Two. Three.", {**LC, "pre": .6}),
 ("say", "g702", H, "Watch the edge. A tiny tear! It runs across. The paper tears.", {**LC, "pre": .6}),
 ("say", "g703", H, "Now the fabric. Three. Four. Five. Six. Seven. Eight!", {**LC, "pre": .8}),
 ("say", "g704", H, "The threads pull tight. But the fabric holds.", {**LC, "pre": .6}),
 ("mark", "bars"),
 ("say", "g705", H, "More weights before it tears means a stronger material. Fabric is stronger than paper.", {"pre": .8}),
 *VERDICT("v_stronger"),
 ("scene", "pullans"),
 *cut("sizesame", [("say", "g706", M, "Oh! The size was the same. The material was not!", {"pre": .5})]),
 ("say", "g707", H, "Two fingers? One finger up!", {"pre": .4, "post": .4}),
 # ---- 8 · BE A THREAD (the first-person journey)
 ("scene", "waitw"),
 ("say", "g801", H, "Be a thread! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "weave"),
 ("say", "g802", H, "You are one thread in a fabric bag.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "cross"),
 ("say", "g803", H, "Many threads cross over you, and under you.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "books"),
 ("say", "g804", H, "Five heavy books drop in!", {**SLOW, "pre": 0, "post": 2.0}),   # post 2.0: the five books land one after another
 ("mark", "lift"),
 ("say", "g805", H, "The handles lift. You are pulled tight.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "hold"),
 ("say", "g806", H, "You do not break. You do not tear.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "home"),
 ("say", "g807", H, "The bag holds, all the way home.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 9 · pull back out; Mark Sentence 2: strength (Basil); tick 1 PULL
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 ("say", "g901", H, "Pulled, without breaking or tearing. That is strength!", {"pre": 0, "post": .3}),
 ("scene", "mark2"),
 ("say", "g902", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g903", B, "The strength of a material is its ability to be pulled or pushed without breaking or tearing.", {"pre": 0}),
 ("wait", 2.5), ("mark", "kw_strength"), HOLD("kw_strength"), ("mark", "tick1"), ("wait", .8),
 # ---- 10 · test two: DROP, and HOLD ON! (Basil's unsafe wish; the child crosses their arms)
 ("scene", "drop"),
 ("say", "g1001", B, "Test two: drop! I'll throw this glass cup on the floor!", {"pre": .6, "post": .3}),
 ("say", "g1002", H, "Something is not safe. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .6),
 ("say", "g1003", H, "Arms crossed? One finger up! Never break things to test them. Broken glass is sharp.", {"pre": 0, "post": .4}),
 *cut("sorrycup", [("say", "g1004", B, "Oops. Sorry, cup!", {"pre": .4, "post": .4})]),
 # ---- 11 · the drop box: an adult tests it safely; [LOOK CLOSER] the metal cup bounces, the glass cup breaks; the book's pair; tick 2 DROP
 ("scene", "dropbox"),
 ("say", "g1101", H, "An adult tests it safely, in a box.", {"pre": .5}),
 ("scene", "lcdrop"),
 ("say", "g1102", H, "Look closer. The metal cup falls. Clang! It bounces.", {**LC, "pre": .6}),
 ("say", "g1103", H, "The glass cup falls. Crack! It breaks.", {**LC, "pre": 1.0}),
 *VERDICT("v_fragile"),
 ("scene", "fragile"),
 # FRAGILE pops on "fragile" and STRONG on "strong", each BESIDE the strip (lib.js o.at: no dimming, 2.0 s each), so Heart reads on
 ("say", "g1104", H, "Glass is fragile, but metal is strong. A glass cup breaks easily when it is dropped, but a metal cup does not.", {"pre": .4, "term": ["glass is fragile"], "kw": [["kw_fragile", "fragile"], ["kw_strong", "strong"]], "hold": STRIP}),
 HOLD("kw_strong"), ("mark", "tick2"), ("wait", .8),
 # ---- 12 · score hand, the spider, the key words
 ("scene", "final"),
 ("say", "g1201", H, "Show me your score hand! More than one? You beat the Buddies. Two fingers? High five!", {"pre": .5, "post": .6}),
 ("scene", "liz"),
 ("say", "g1202", H, "Did you spot the spider? It was on its thread, by the letterboxes! Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Physical property", "Strength", "Strong", "Fragile"]),
 # ---- 13 · the cliffhanger: test three
 ("scene", "cliff"), ("wait", .5),
 ("say", "g1301", H, "Two tests done. Test three: bend! The rubber band, or the ice-cream stick?", {"pre": .3}),
 ("say", "g1302", B, "Snap it, or bend it?", {"pre": .4}),
 ("say", "g1303", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time
 ("scene", "lasttime"),
 ("say", "j101", H, "Last time, we pulled two strips. Fabric held more weights: it is stronger than paper. A glass cup broke easily: glass is fragile. Now, test three: bend!", {"pre": .4, "post": 1.6}),   # post 1.6: the third picture holds 2.5 s
 # ---- 2 · the new place (the playground beside the block), the game, and the hidden caterpillar
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201", H, "Lock in first. A little caterpillar is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals (Pip reads the three cards)
 ("scene", "goals"), ("say", "j301", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", P, "What flexibility means.", {"pre": .3, "post": .3}),
 ("say", "j303", P, "Flexible or rigid.", {"pre": .3, "post": .3}), ("say", "j304", P, "Strong is not the same as flexible.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the dare from EP8 (a short 3 s ring: the answer was locked in at the end of EP8)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j401", H, "Round one: the question from last time! Which one can bend without breaking? One, the rubber band. Two, the ice-cream stick. Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", P, "Two. The stick. Wood is strong, so it will not break.", {"pre": .5}),
 ("say", "j404", B, "One! I bend rubber bands all day!", {"pre": .4}),
 ("say", "j405", M, "One!", {"pre": .4, "post": .4}),
 # ---- 5 · test three: BEND. [LOOK CLOSER] the slow bend test; the answer; tick 3 BEND
 ("scene", "lcbend"),
 ("say", "j501", H, "Look closer. The rubber band bends. In half. Into a twist. No crack. It does not break.", {**LC, "pre": .8}),
 ("say", "j502", H, "Now the ice-cream stick. It bends, just a little. Listen. A crack opens. Snap! It breaks.", {**LC, "pre": 1.0}),
 *VERDICT("v_bend"),
 ("scene", "bendans"),
 ("say", "j503", H, "The answer is one. The rubber band!", {"pre": .3}),
 *cut("snapped", [("say", "j504", P, "Oh! It snapped!", {"pre": .4})]),
 ("say", "j505", H, "One finger? One finger up!", {"pre": .4}),
 ("mark", "tick3"), ("wait", 1.0),
 # ---- 6 · Mark Sentence 1: flexibility (Basil)
 ("scene", "mark1"),
 ("say", "j601", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j602", B, "The flexibility of a material is its ability to bend without breaking.", {"pre": 0}),
 ("wait", 2.5), ("mark", "kw_flexibility"), HOLD("kw_flexibility"),
 # ---- 7 · Mark Sentence 2: flexible or rigid (Momo; the two trays). FLEXIBLE and RIGID pop BESIDE the card as she reads them (o.at)
 ("scene", "mark2"),
 ("say", "j701", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j702", M, "Materials that bend easily without breaking are flexible. Materials that break easily when bent are rigid.", {"pre": 0, "gap": .6, "kw": [["kw_flexible", "flexible"], ["kw_rigid", "rigid"]]}),
 ("wait", 2.5), HOLD("kw_rigid"),
 *cut("tiles", [("scene", "tiles"), ("say", "j703", H, "A rubber tile bends: flexible. A ceramic tile breaks when it is bent: rigid.", {"pre": .3, "post": .3})]),
 # ---- 8 · BE A RUBBER BAND (the first-person journey)
 ("scene", "waitw"),
 ("say", "j801", H, "Be a rubber band! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "hook"),
 ("say", "j802", H, "You are a rubber band, at the chicken rice stall.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "picked"),
 ("say", "j803", H, "Fingers pick you up. They bend you in half.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "packet"),
 ("say", "j804", H, "They loop you round a packet of rice. You bend at every corner.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "ride"), ("wait", 1.0),   # a short dark ride: the inside of a plastic bag, swaying
 ("mark", "home"),
 ("say", "j805", H, "At home, fingers pull you off. You bend again.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "flexible"),
 ("say", "j806", H, "No crack. No snap. You are flexible!", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 *cut("hungry", [("say", "j807", B, "Now I am hungry!", {"pre": 0, "post": .4})]),
 # ---- 9 · [LOOK CLOSER] three tubes: most and least flexible; the book's two sentences; the verdict
 ("scene", "lctubes"),
 ("say", "j901", H, "Look closer. Three tubes. The same weight hangs on each. The rubber tube bends the most. The metal tube bends the least.", {**LC, "pre": .8}),
 ("say", "j902", H, "Rubber tubes can bend more than plastic tubes without breaking. Plastic tubes can bend more than metal tubes without breaking.", {"pre": .6, "hold": STRIP}),
 *VERDICT("v_tubes"),
 # ---- 10 · Showdown: Momo's notes (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j1001", M, "My notes! One: rubber bends the most, so it is the most flexible. Two: paper bends easily, so paper is strong. Three: metal bends the least, so it is the least flexible.", {"pre": .6, "post": .3}),
 ("say", "j1002", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "j1003", H, "Locked in!", {"pre": 0}),
 ("say", "j1004", B, "Two! Paper bends. But it tore with only three weights!", {"pre": .5}),
 ("say", "j1005", P, "Two. Bending and tearing are different tests.", {"pre": .4}),
 ("say", "j1006", M, "Oops!", {"pre": .4, "post": .3}),
 ("scene", "fix"),
 ("say", "j1007", H, "Paper bends easily: it is flexible. But it tears easily: it is not strong. Strong and flexible are two different properties.", {"pre": .5, "gap": .6}),
 ("say", "j1008", H, "Two fingers? Put up two more on your score hand!", {"pre": .5, "post": .4}),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand and the caterpillar
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1202", H, "Did you spot the caterpillar? It was on the handrail of the slide, bending along! Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 13 · the dare for Episode 10
 ("scene", "dare"), ("wait", .5),
 ("say", "j1301", H, "Next time, water! A metal spoon sinks. But a giant metal ship floats! What is inside the ship that helps it to float? One, wood. Two, air. Three, more metal. Lock in your answer!", {"pre": 0}),
 *cut("million", [("say", "j1302", B, "A ship is heavier than a million spoons! How?", {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Flexibility", "Flexible", "Rigid"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
