"""script.py: P3 EP10 "A metal ship floats but a metal spoon sinks. Why?", Part 1 ("A Metal Spoon SINKS. So How Does a Giant Metal Ship
FLOAT?") and Part 2 ("Raincoat vs School Shoe: Which One SOAKS UP the Rain?"): the script (../p3_ep10_script.md, version 1 of 21 Nov 2026, with
the teacher's go-ahead in its section 12: the wax goes on rubber-soled fabric BOOTS and is named "shoe wax"; the drop test still compares the
plastic raincoat with a fabric school shoe) as data. Every spoken line is word for word as in the script; a cell with two speakers is split into
one line per speaker. make_voice.py records the lines; build_tl.py lays them on the timeline.

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
                                       >= .65 s), kw: [[mark, word, nth]] (a mark at that word's onset: a key word pops there, or a picture beat),
                                       hold: s (the cursor goes on no earlier than the line's start + s), holdw: [word, s], after: [id, s]
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd)

Marks the picture and the sound use: kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), tick1..3 (a green
tick stamped on the board OUR 3 WATER TESTS), boardsIn / budsIn (cold open), title, spoons, hullwin, split, pour, toshoe, sock, drops (look-closer
beats), and the journey stops (dive, sea, door, room, shut, wall, floaton; dive, fall, coat, roll, soak, through).

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then make_voice is not needed; rebuild the timeline).
  Part 1: notwood (e805 Pip "Oh! Not wood. Air!"), momotwo (e706 Momo "Two!"), whyship (e1001 Heart "Why does a metal ship float?"),
          samesize (e506 Basil "Same size. Same shape. Different material!", last). (The title's second slam is a picture beat only: no time.)
  Part 2: hide (f1402 Basil "I can hide behind all three! Can I?"), nowater (f507 Momo), newprop (f905 Pip "The same fabric. A new property!"),
          notes (Basil reads only "My notes!" and line two; lines one and three are shown and lit, not read: f1101 is re-recorded short).
  If a Basil line is cut, cut one of Pip's or Momo's too (Basil keeps at least as many lines as either).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()   # nothing cut at Stage 1 (see STATE.md for the lengths and the cut candidates)
cut = lambda tag, items: [] if tag in CUTS else items

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer later in the same bar), YOUR TURN! after each line,
# no all-together bar (script segment 12). Basil's voice leads the first beat of each line (make_voice.py: his call is a little louder).
CHANT = [("Float or sink?", "The material matters!"), ("Metal ship!", "Trapped air inside!"), ("Waterproof!", "Does not absorb water at all!")]
CHANT_CAPS = ([1.1, .95, .95], [1.42, 1.42, 2.15])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word (the caption / script text is unchanged). No word of EP10 is on the pronunciation list (script section 10 H).
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
 # ---- 1 · silent cold open: a beach shelter at East Coast Park (6 s). 0:02 EP9's two dare boards slide in; 0:04 the buddies pop in
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP9 and its dare, word for word (two calm pictures), then OUR 3 WATER TESTS, then the title
 ("scene", "lasttime"),
 ("say", "e201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "e202", H, "A metal spoon sinks. But a giant metal ship floats! What is inside the ship that helps it to float? One, wood. Two, air. Three, more metal.", {"pre": .4, "post": .6}),
 ("scene", "tests"),
 ("say", "e203", H, "Hold on to your answer!", {"pre": .6, "post": .5}),
 ("scene", "title"), ("mark", "title"), ("wait", 2.4),
 # ---- 3 · the game, and the hidden otter (Heart names it; its picture pops)
 ("scene", "game"),
 ("say", "e301", H, "You against the Buddies! Lock in first. One finger for every point. A little otter is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (Basil reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "e401", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "e402", B, "Float or sink.", {"pre": .3, "post": .3}),
 ("say", "e403", B, "The material matters.", {"pre": .3, "post": .3}), ("say", "e404", B, "Why a metal ship floats.", {"pre": .3, "post": .9}),
 *COUNT,
 # ---- 5 · test one: DROP IT IN. Two blocks; [LOOK CLOSER] the tub (blocks, then spoons; FLOAT and SINK pop beside the blocks); the book's strip; tick 1
 ("scene", "blocks"),
 ("say", "e501", H, "Two blocks, the same size. One is wood. One is metal. Look closer.", {"pre": .4}),
 ("scene", "lcblocks"),
 ("say", "e502", H, "The wooden block bobs up. It floats.", {**LC, "pre": 1.2, "term": ["it floats"], "kw": [["kw_float", "floats"]]}),   # pre 1.2: the hands lower both blocks and let go
 HOLD("kw_float"),
 ("say", "e503", H, "The metal block goes straight down. It sinks.", {**LC, "pre": .4, "term": ["it sinks"], "kw": [["kw_sink", "sinks"]]}),
 HOLD("kw_sink"), ("mark", "spoons"),
 ("say", "e504", H, "Now two spoons. The wooden spoon floats. The metal spoon sinks.", {**LC, "pre": .8}),
 ("wait", 1.0),   # the metal spoon comes to rest beside the metal block
 *VERDICT("v_wood"),
 ("scene", "woodstrip"),
 ("say", "e505", H, "Most types of wood float on water. Most metals sink in water.", {"pre": .4, "hold": STRIP}),
 *cut("samesize", [("say", "e506", B, "Same size. Same shape. Different material!", {"pre": .4})]),
 ("mark", "tick1"), ("wait", .9),
 # ---- 6 · HOLD ON! Momo's rule (the child crosses their arms); Mark Sentence 1 (Momo)
 ("scene", "holdon"),
 ("say", "e601", M, "Is this the rule? Heavy things sink, and light things float!", {"pre": .5, "post": .3}),
 ("say", "e602", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .6),
 ("say", "e603", H, "Arms crossed? One finger up! The giant ship is very heavy, and it floats. The little spoon is light, and it sinks.", {"pre": 0, "post": .4}),
 ("scene", "mark1"),
 ("say", "e604", H, "Here is the rule.", {"pre": .4}),
 ("say", "e605", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "e606", M, "The material of an object affects the ability of the object to float or sink.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 7 · Round 1: the dare from EP9 (a short 3 s ring: the answer was locked in at the end of EP9)
 ("scene", "puzzle"),
 ("say", "e701", P, "But a ship is metal. And metal sinks!", {"pre": .5, "post": .4}),
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "e702", H, "Round one: the question from last time! What is inside the ship? Wood, air, or more metal? Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "e703", H, "Locked in!", {"pre": 0}),
 ("say", "e704", P, "One. Wood floats, so there must be wood inside.", {"pre": .5}),
 ("say", "e705", B, "Two! Air! My swimming float is full of air!", {"pre": .4}),
 *cut("momotwo", [("say", "e706", M, "Two!", {"pre": .4})]),
 ("wait", .3),
 # ---- 8 · [LOOK CLOSER] inside the ship: the cut-away window, then the solid metal block beside it; the answer
 ("scene", "lcship"),
 ("say", "e801", H, "Look closer. Here is the giant metal ship. Part of it sits under the water.", {**LC, "pre": .8}),
 ("say", "e802", H, "A window opens in its side. Look inside. Big rooms. Tall spaces. All full of air.", {**LC, "pre": .8, "kw": [["hullwin", "opens"]]}),
 ("wait", .6), ("mark", "split"),
 ("say", "e803", H, "Now the metal block. Solid metal. No air inside. It sank.", {**LC, "pre": .8}),
 ("wait", .6),
 *VERDICT("v_air"),
 ("scene", "shipans"),
 ("say", "e804", H, "The answer is two. Air!", {"pre": .3}),
 *cut("notwood", [("say", "e805", P, "Oh! Not wood. Air!", {"pre": .4})]),
 ("say", "e806", H, "Two fingers? One finger up!", {"pre": .4, "post": .4}),
 # ---- 9 · BE THE AIR (the first-person journey)
 ("scene", "waitw"),
 ("say", "e901", H, "Be the air! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "sea"),
 ("say", "e902", H, "You are air, drifting over the sea.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "door"),
 ("say", "e903", H, "You float in through a door, into a giant metal ship.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "room"),
 ("say", "e904", H, "A huge room. Metal walls all around you.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "shut"),
 ("say", "e905", H, "The door shuts. You are trapped air!", {**SLOW, "pre": .4, "post": 1.0}),   # pre .4: the door swings shut first
 ("mark", "wall"),
 ("say", "e906", H, "Outside the wall: deep water. Inside: you.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "floaton"),
 ("say", "e907", H, "The ship floats on. You are helping!", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 10 · pull back out; Mark Sentence 2: trapped air (Basil). TRAPPED AIR pops BESIDE the card as he reads it (lib.js o.at)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 *cut("whyship", [("say", "e1001", H, "Why does a metal ship float?", {"pre": 0, "post": .3})]),
 ("scene", "mark2"),
 ("say", "e1002", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "e1003", B, "This is because there is a lot of trapped air inside the ship. The trapped air helps the ship to float on water.", {"pre": 0, "gap": .6, "kw": [["kw_trapped_air", "trapped"]]}),
 ("wait", 2.5), HOLD("kw_trapped_air"),
 # ---- 11 · the metal bowl; [LOOK CLOSER] it floats, water pours in, it sinks
 ("scene", "bowl"),
 ("say", "e1101", H, "Now, a metal bowl. Look closer.", {"pre": .5}),
 ("scene", "lcbowl"),
 ("say", "e1102", H, "It floats, like a little ship. Air is inside it.", {**LC, "pre": .8}),
 ("mark", "pour"),
 ("say", "e1103", H, "Now water pours in. The water takes the place of the air.", {**LC, "pre": .8}),
 ("say", "e1104", H, "The bowl sits lower. And lower. It sinks!", {**LC, "pre": .8}),
 ("wait", 1.2),   # the bowl goes down, level, and rests on the bottom beside the metal block
 *VERDICT("v_bowl"),
 # ---- 12 · score hand, the otter, the key words
 ("scene", "final"),
 ("say", "e1201", H, "Show me your score hand! More than one? You beat the Buddies. Two fingers? High five!", {"pre": .5, "post": .6}),
 ("scene", "liz"),
 ("say", "e1202", H, "Did you spot the otter? It was swimming by the rocks! Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Float", "Sink", "Trapped air"]),
 # ---- 13 · the cliffhanger: rain
 ("scene", "cliff"), ("wait", .5),
 ("say", "e1301", B, "Rain! Oh no, my school shoes!", {"pre": .3}),
 ("say", "e1302", H, "A plastic raincoat. A fabric school shoe. Rain falls on both. Which one does the water soak into?", {"pre": .4}),
 ("say", "e1303", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time
 ("scene", "lasttime"),
 ("say", "f101", H, "Last time, wood floated and metal sank: the material matters. A giant metal ship floats, because of the trapped air inside. Now, test two: the rain!", {"pre": .4, "post": 1.6}),   # post 1.6: the third picture holds 2.5 s
 # ---- 2 · the new place (the void deck in the rain), the game, and the hidden snail
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "f201", H, "Lock in first. A little snail is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals (Momo reads the three cards)
 ("scene", "goals"), ("say", "f301", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "f302", M, "What waterproof means.", {"pre": .3, "post": .3}),
 ("say", "f303", M, "Waterproof or not waterproof.", {"pre": .3, "post": .3}), ("say", "f304", M, "Wax makes fabric waterproof.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the raincoat or the shoe? (Part 1's cliffhanger, scored)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "f401", H, "Round one. A plastic raincoat, and a fabric school shoe. One drop of water lands on each. Which one does the water soak into? One, the raincoat. Two, the shoe. Three, both. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1"),
 ("say", "f402", H, "Locked in!", {"pre": 0}),
 ("say", "f403", M, "Three! Both! Rain makes everything wet!", {"pre": .5}),
 ("say", "f404", B, "Two! My socks were wet all day!", {"pre": .4}),
 ("say", "f405", P, "Two.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · test two: DRIP ON IT. [LOOK CLOSER] the slow drop test (raincoat, then the school shoe; ABSORB pops beside the shoe); the answer; tick 2
 ("scene", "lcdrip"),
 ("say", "f501", H, "Look closer. A drop lands on the raincoat. It sits on top, round like a bead.", {**LC, "pre": .8}),
 ("say", "f502", H, "Tilt it. The drop rolls off. The plastic is dry.", {**LC, "pre": .8}),
 ("wait", .4), ("mark", "toshoe"),
 ("say", "f503", H, "Now the shoe. The drop soaks in, between the threads. A wet patch spreads.", {**LC, "pre": 1.0}),
 ("say", "f504", H, "The fabric absorbs the water.", {**LC, "pre": .6, "term": ["absorbs"], "kw": [["kw_absorb", "absorbs"]]}),
 HOLD("kw_absorb"), ("mark", "sock"),
 ("say", "f505", H, "And look inside. The water passes through. A wet sock!", {**LC, "pre": .6}),
 ("wait", .4),
 *VERDICT("v_absorb"),
 ("scene", "dripans"),
 ("say", "f506", H, "The answer is two. The shoe!", {"pre": .3}),
 *cut("nowater", [("say", "f507", M, "Oh! No water went into the raincoat!", {"pre": .4})]),
 ("say", "f508", H, "Two fingers? One finger up!", {"pre": .4, "post": .3}),
 ("mark", "tick2"), ("wait", .9),
 # ---- 6 · Mark Sentence 1: waterproof (Pip); then WATERPROOF pops; the two trays and the book's fabric sentences
 ("scene", "mark1"),
 ("say", "f601", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "f602", P, "Materials that do not absorb water at all are waterproof.", {"pre": 0}),
 ("wait", 2.5), ("mark", "kw_waterproof"), HOLD("kw_waterproof"),
 ("scene", "trays"),
 ("say", "f603", H, "Fabric absorbs water and allows water to pass through it. It is not a waterproof material.", {"pre": .5, "hold": STRIP}),
 # ---- 7 · BE A RAINDROP (the first-person journey)
 ("scene", "waitw"),
 ("say", "f701", H, "Be a raindrop! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "fall"),
 ("say", "f702", H, "You are a raindrop, falling past the flats.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "coat"),
 ("say", "f703", H, "Splat! You land on a plastic raincoat.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "roll"),
 ("say", "f704", H, "You cannot get in. You roll off, onto a fabric shoe.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "soak"),
 ("say", "f705", H, "Now you soak in, between the threads.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "through"),
 ("say", "f706", H, "The fabric absorbs you. You pass right through!", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 8 · pull back out; four waterproof materials (3.18a) on the green tray
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 ("scene", "four"),
 ("say", "f801", H, "Rubber, plastic, glass and metals do not absorb water and do not allow water to pass through them. They are waterproof materials.", {"pre": .3, "hold": STRIP}),
 # ---- 9 · test three: WAX IT. [LOOK CLOSER] shoe wax on one of two fabric boots (WAX pops beside the boots); one drop on each; tick 3
 ("scene", "wax"),
 ("say", "f901", H, "Can a fabric boot keep water out? Look closer.", {"pre": .5}),
 ("scene", "lcwax"),
 ("say", "f902", H, "Two fabric boots. A hand rubs shoe wax over one. A thin layer.", {**LC, "pre": .8, "term": ["shoe wax"], "kw": [["kw_wax", "wax"]]}),
 HOLD("kw_wax"), ("mark", "drops"),
 ("say", "f903", H, "One drop on each. On the plain boot, it soaks in.", {**LC, "pre": .6}),
 ("say", "f904", H, "On the boot with wax, it sits on top. It rolls off!", {**LC, "pre": .8}),
 ("wait", .5),
 *VERDICT("v_wax"),
 ("scene", "waxans"),
 *cut("newprop", [("say", "f905", P, "The same fabric. A new property!", {"pre": .4})]),
 ("mark", "tick3"), ("wait", .9),
 # ---- 10 · Mark Sentence 2: wax (Basil); the treatment strip (3.14)
 ("scene", "mark2"),
 ("say", "f1001", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "f1002", B, "Fabric absorbs water. However, it can be made waterproof by applying a layer of wax over it.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 ("scene", "treated"),
 ("say", "f1003", H, "The physical property of a material can change according to how the material is treated.", {"pre": .5, "hold": STRIP}),
 # ---- 11 · Showdown: Basil's notes (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "f1101", B, "My notes! Two: my T-shirt dries fast, so it is waterproof." if "notes" in CUTS else "My notes! One: glass is waterproof. Two: my T-shirt dries fast, so it is waterproof. Three: wax makes fabric waterproof.", {"pre": .6, "post": .3}),
 ("say", "f1102", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "f1103", H, "Locked in!", {"pre": 0}),
 ("say", "f1104", P, "Two. A T-shirt is fabric. Fabric absorbs water.", {"pre": .5}),
 ("say", "f1105", M, "Two!", {"pre": .4}),
 ("say", "f1106", B, "Oops!", {"pre": .4, "post": .3}),
 ("scene", "fix"),
 ("say", "f1107", H, "Waterproof means it does not absorb water at all. A T-shirt absorbs water!", {"pre": .5}),
 ("say", "f1108", H, "Two fingers? Put up two more on your score hand!", {"pre": .5, "post": .4}),
 # ---- 12 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 13 · score hand and the snail
 ("scene", "final"),
 ("say", "f1301", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "f1302", H, "Did you spot the snail? It was on the big flower pot! Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 14 · the dare for Episode 11
 ("scene", "dare"), ("wait", .5),
 ("say", "f1401", H, "Next time, light! Which one lets only some light pass through? One, clear glass. Two, frosted glass. Three, a wooden door. Lock in your answer!", {"pre": 0}),
 *cut("hide", [("say", "f1402", B, "I can hide behind all three! Can I?", {"pre": .4, "post": .6})]),
 # ---- 15 · the key words
 *kwrecap(["Absorb", "Waterproof", "Wax"]),
 # ---- 16 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
