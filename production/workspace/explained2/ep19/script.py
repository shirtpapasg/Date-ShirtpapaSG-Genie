"""script.py: P3 EP19 "Why a magnet ignores a copper wire" (the Interactions theme opens, p. 99; Ch 6, Properties of Magnets, pp. 100-104:
the lodestone, what a magnet is, magnetic and non-magnetic materials, "metals can be magnetic or non-magnetic", classifying by how materials
interact with a magnet), Part 1 ("Will a Magnet Pull a COPPER Wire? What a Magnet Really Is") and Part 2 ("Copper Is a METAL. So Why Won't a
Magnet Pull It?"): the script (../p3_ep19_script.md, version 1 of 23 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov) as
data. Every spoken line is word for word as in the script's tables (sections 3 to 5). make_voice.py records the lines; build_tl.py lays them
on the timeline. Line ids as in the script's section 6: m... Part 1, n... Part 2 (m<segment><nn>, a letter for a buddy line).

The dare that opens Part 1 is EP18's closing dare ({NEXT_DARE} of ../ep18/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): asserted below against EP18_NEXT and, when it is there, against ../ep18/script.py itself. The dare into
EP20 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): as EP15 to EP18. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences,
softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP16 to EP18): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Respellings: none. Stage 1 test clip ../pron_clips/Heart_ep19_new_words.mp3: "aluminium" is Kokoro's own British "al-yoo-MIN-ee-um"
(ˌæljʊmˈɪniəm: the British spelling gives the British sound, so no sg_pron entry); lodestone, ceramic, non-magnetic, U-shaped, magnetism,
horseshoe, interact, classify, wok, pigeon are Kokoro's own; the verb "lives" (n1103b "Deep in the sea lives a snail") is "leevz" through
../sg_pron.py (the teacher's existing entry). No Singapore name is spoken.

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: magOff, pinIn, cardsIn, budsIn (cold open: Basil lifts his magnet off the banner's metal frame; the pin and the wire are set down;
  EP18's three dare cards slide in), title; theme (the INTERACTIONS banner); lcmagnet: rock (the lodestone story), lodestone, inside (the
  cut-away), shapes; the journey (dive, jtable, jfar, jtug, jclick, jlift); answer: trayPin, trayWire (into the tray's halves); holdon: wok,
  letgo, fridge; lcattract: slow, gap, steel, iron; cliff: wire, metal (the cliffhanger).
  Part 2: pic1 / pic2 / pic3 (recap); cans (Basil sets the two cans on the test table); the journey (dive, jbin, jclunk, jtruck, jbelt,
  jmagnet, jclang, jroll); lcmetals: pass, metals (the METALS family board); l1 / l2 / l3 (Basil's homework lines light), strike, rewrite,
  test; interact: swing; lcinteract: near, groups (the halves' labels flip); dare: rings (the top ring floats), dareIn.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back).
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip, the pauses around new terms, a buddy's explanation of a key
  word.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"momofix", "tape", "basiloops", "door", "basilfix", "coin", "whiteboard", "nextjoke",   # script section 6: in use from the start, for length
        "bothmetal", "snailtip", "showhold"}   # Stage 1: Part 2 was 5:39.7, so section 6's "If a part must lose more" list for Part 2, in order
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP18's dare into EP19 (../ep18/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP18_NEXT = "Next time: a magnet, a steel pin and a copper wire! The pin and the wire are both metal. Which one will the magnet pull? One, the steel pin. Two, the copper wire. Three, both. Lock in your answer!"
_ep18 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep18", "script.py")
if os.path.exists(_ep18):
    _m = re.search(r'^NEXT_DARE = "(.*)"$', open(_ep18).read(), re.M)
    assert _m and _m.group(1) == EP18_NEXT, "EP18's NEXT_DARE changed: update Block A"
DARE_Q1 = "A magnet, a steel pin and a copper wire! The pin and the wire are both metal. Which one will the magnet pull?"
DARE_Q2 = "One, the steel pin. Two, the copper wire. Three, both."
assert "Next time: a magnet, a steel pin and a copper wire! " + DARE_Q1[len("A magnet, a steel pin and a copper wire! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP18_NEXT
DARE_CARDS = ["The steel pin", "The copper wire", "Both"]   # EP18's own three cards (NEXT_CARDS)
DARE_LABEL = "Which will the magnet pull?"
DARE_SHORT = "Which one will the magnet pull?"
DARE_CLUES = ["both are metal", "a bar magnet"]
# Block B: the dare into EP20 (plan row 20, "Magnets that float in mid-air: poles, pulls and pushes"); EP20's answer: 2, a push
NEXT_DARE = "Next time: two ring magnets on a pencil! The top one floats in mid-air, with no glue and no string. What holds it up? One, a pull. Two, a push. Lock in your answer!"
NEXT_CARDS = ["A pull", "A push"]
NEXT_JOKE = "No glue and no string? I am checking for invisible string!"

# the chant (Part 2): call and response, YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Iron and steel?", "Magnetic!"), ("Copper and aluminium?", "Non-magnetic!"), ("Do not guess!", "Test it with a magnet!")]
CHANT_CAPS = ([1.0, 1.45, 1.0], [1.05, 1.2, 1.45])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]

def kwrecap(words, pron=None):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w); o = {"pron": pron} if pron and any(x in w for x in pron) else {}
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0, **o}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True, **o})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
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
 # ---- 1 · silent cold open: our block's void deck, Saturday afternoon (EP18's void deck). EP18's LIFE CYCLE DAY board is down; its easels and
 #          metal frame carry the new banner OUR NEW THEME: INTERACTIONS (I1, I2 printed small). The MAGNET TEST TABLE: a shallow tray in two
 #          empty halves, ATTRACTED (green) / NOT ATTRACTED (blue), a basket of the book's objects. Basil lifts his bar magnet off the banner's
 #          metal frame (magOff); a steel pin and a copper wire are set down (pinIn); EP18's three dare cards slide in (cardsIn); buddies pop in
 ("scene", "cold"), ("wait", 1.2), ("mark", "magOff"), ("wait", 1.0), ("mark", "pinIn"), ("wait", 1.0), ("mark", "cardsIn"), ("wait", 1.3), ("mark", "budsIn"), ("wait", 1.5),
 # ---- 2 · "Last time...": EP18's dare, word for word, then the title
 ("scene", "lasttime"),
 ("say", "m201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "m202", H, DARE_Q1, {"pre": .3}),
 ("say", "m203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "m204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 2.2),
 # ---- 3 · a new theme (the INTERACTIONS banner, its two questions readable ~3 s), the game, and the hidden pigeon (named first; ONE smooth
 #          push-in from the void deck onto the pigeon on the ceiling pipe: the INTRO spot)
 ("scene", "theme"), ("mark", "theme"),
 ("say", "m301", H, "Today, a brand-new theme begins, and it starts with magnets!", {"pre": .4, "post": .6}),
 ("scene", "game"),
 ("say", "m302", H, "A little pigeon is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "m303b", B, "Pigeons love our void deck. Look up high, on the ledges and the pipes!", {"pre": .3, "post": .1}),
 ("say", "m304", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Pip reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "m401", P, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m402", P, "What a magnet is.", {"pre": .3, "post": .3}),
 ("say", "m403", P, "What attract means.", {"pre": .3, "post": .3}), ("say", "m404", P, "Magnetic materials.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP18's dare (a short 3 s ring: the answer was locked in at the end of EP18)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "m501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "m502", H, "Locked in!", {"pre": 0}),
 ("say", "m503m", M, "One! In Grandma's sewing box, a magnet picks up the steel pins. I have seen it!", {"pre": .5}),
 ("say", "m504p", P, "Two. The copper wire is thinner and lighter, so it should be easier to pull.", {"pre": .4}),
 ("say", "m505b", B, "Three, both! They are both metal, and my magnet pulls metal. Easy!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · Momo's question at the test table (is it plastic?); [LOOK CLOSER] what is a magnet: the lodestone (6.1 on a strip, Pip teaches),
 #          the cut-away (grey metal under the paint), MAGNET pops on Heart's term, the six shapes (Basil); Mark Sentence 1 (Basil): 6.2
 ("scene", "table"),
 ("say", "m601m", M, "Basil, your magnet is smooth and painted, like a toy. Is it made of plastic?", {"pre": .5}),
 ("scene", "lcmagnet"),
 ("say", "m602", H, "Look closer. Long ago, people found a special kind of rock that pulls on iron.", {**LC, "pre": 1.2, "kw": [["rock", "rock"]]}),
 ("say", "m603", H, "A natural magnet is also called a lodestone.", {**LC, "pre": .3, "hold": STRIP, "kw": [["lodestone", "lodestone"]]}),
 ("say", "m604p", P, "A lodestone is a magnet that comes from the ground. Nobody made it!", {"pre": .2}),
 ("say", "m605", H, "Now look inside Basil's magnet. Under the paint, it is made of metal, usually iron or steel.", {**LC, "pre": .3, "term": ["magnet"], "kw": [["inside", "inside"], ["kw_magnet", "magnet"]]}),
 HOLD("kw_magnet"),
 *cut("momofix", [("say", "m606m", M, "So it is not plastic at all! The paint just makes it look like a toy.", {"pre": .2})]),
 ("say", "m607b", B, "And magnets come in lots of shapes: bar, U-shaped, button, rod, ring and horseshoe!", {"pre": .2, "kw": [["shapes", "shapes"]]}),
 *VERDICT("v_magnet"),
 ("scene", "mark1"),
 ("say", "m608", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m609", B, "A magnet is an object that is usually made of iron or steel.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 7 · BE A STEEL PIN (the journey; the buddies ride along on the eraser): the magnet comes near, a tug, a slide across the gap, click;
 #          lifted up, you look down at the copper wire that never moved
 ("scene", "waitw"),
 ("say", "m701", H, "Be a steel pin! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtable"),
 ("say", "m702", H, "You are a steel pin, lying on the test table. Beside you, the copper wire looks like a big orange pipe.", {**SLOW, "pre": 0, "post": .8, "kw": [["jpipe", "pipe"]]}),
 ("say", "m703", H, "Here comes the magnet, like a giant red and blue tower. It is still far away, so nothing happens.", {**SLOW, "pre": .2, "post": .8, "kw": [["jfar", "magnet"]]}),
 ("say", "m704", H, "Closer, and closer. You feel a tug. Then whoosh! You slide across the gap, and click onto the magnet.", {**SLOW, "pre": .2, "post": .8, "kw": [["jtug", "tug"], ["jslide", "whoosh"], ["jclick", "click"]]}),
 ("say", "m705", H, "The magnet lifts you up. Look down. The copper wire and the eraser have not moved at all.", {**SLOW, "pre": .2, "kw": [["jlift", "lifts"], ["jlook", "look"]]}),
 ("wait", 1.0),
 # ---- 8 · pull back out; the answer (only Momo, who was right, explains); Heart tells Pip why light is not the reason; Basil's wrong idea
 #          ("my magnet pulls metal") is left open on purpose (the cliffhanger)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m801", H, "The answer is one: the steel pin! Did you show one finger? Put one finger up!", {"pre": .4, "kw": [["ansglow", "one", 0], ["coin1", "one", 2]]}),
 ("say", "m802m", M, "The magnet pulled the steel pin across the gap. But the copper wire did not move at all!", {"pre": .3, "kw": [["trayPin", "pin"], ["trayWire", "wire"]]}),
 ("say", "m803", H, "Pip, the copper wire is very light, but the magnet still did not pull it. So being light is not the reason.", {"pre": .3}),
 *cut("basiloops", [("say", "m804b", B, "Oops! Both are metal, but only the pin moved. I wonder why...", {"pre": .2, "post": .1})]),
 # ---- 9 · HOLD ON! Momo: "the magnet could not lift the wok, so the wok is not attracted"; Pip fixes it (it holds on: attracted, too heavy)
 ("scene", "holdon"),
 ("say", "m901m", M, "My turn! I tested Mum's iron wok. The magnet could not lift it, so the wok is not attracted to the magnet!", {"pre": .5, "post": .2, "kw": [["wok", "wok"]]}),
 ("say", "m902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m903", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "m904p", P, "Watch. When I let go, the magnet holds on to the side of the wok. The wok is attracted. It is just too heavy to lift!", {"pre": .3, "post": .2, "kw": [["letgo", "let"]]}),
 ("say", "m905", H, "A fridge magnet cannot lift your fridge either, but it holds on to the fridge door.", {"pre": .3, "kw": [["fridge", "fridge"]]}),
 # ---- 10 · Basil's question (is a magnet sticky?); [LOOK CLOSER] slow motion: the pin moves before it touches; ATTRACT (Basil fixes his own
 #           idea) and MAGNETIC MATERIALS (Pip); the verdict; Mark Sentence 2 (Momo): 6.3
 ("scene", "sticky"),
 ("say", "m1001b", B, "So my magnet sticks to the wok, like glue! Is my magnet sticky?", {"pre": .5}),
 ("scene", "lcattract"),
 ("say", "m1002", H, "Look closer, in slow motion. The pin starts to move before it touches the magnet. It jumps across the gap.", {**LC, "pre": 1.2, "kw": [["slow", "slow"], ["gap", "gap"]]}),
 *cut("tape", [("say", "m1003", H, "Sticky tape picks up this scrap of paper. The magnet does not. So a magnet is not sticky.", {**LC, "pre": .3, "kw": [["tape", "tape"]]})]),
 ("say", "m1004", H, "The magnet pulls the pin towards it. We say the magnet attracts the pin.", {**LC, "pre": .3, "term": ["attracts"], "kw": [["kw_attract", "attracts"]]}),
 HOLD("kw_attract"),
 ("say", "m1005b", B, "Attract means pull! My magnet pulls the pin, even before they touch. So it is not sticky at all!", {"pre": .2}),
 ("say", "m1006", H, "The pin is made of steel, and the nail is made of iron. They are made of magnetic materials.", {**LC, "pre": .3, "term": ["magnetic materials"], "kw": [["steel", "steel"], ["iron", "iron"], ["kw_magnetic_materials", "magnetic"]]}),
 HOLD("kw_magnetic_materials"),
 ("say", "m1007p", P, "Magnetic materials are the materials that a magnet attracts. Iron and steel are magnetic materials!", {"pre": .2}),
 *VERDICT("v_attract"),
 ("scene", "mark2"),
 ("say", "m1008", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m1009", M, "Magnets attract objects made of magnetic materials. Magnetic materials include iron and steel.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 11 · score hand, the pigeon (and its fun fact), the key words
 ("scene", "final"),
 ("say", "m1101", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "m1102", H, "Did you spot the pigeon? It was on top of the bicycle rack!", {"pre": .6, "post": .2}),
 ("say", "m1103m", M, "Here is a fun fact! Scientists think pigeons can sense the Earth's magnetism. It helps them find their way home, even from far away!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_fly", "pigeons"], ["ff_sense", "magnetism"], ["ff_home", "home"]]}),
 ("say", "m1104", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Magnet", "Attract", "Magnetic materials"]),
 # ---- 12 · the cliffhanger: Basil holds his magnet over the copper wire in the blue half; it does not move. Copper is a metal too
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1201b", B, "Wait! Copper is a metal, just like iron and steel. So why does my magnet ignore the copper wire?", {"pre": .3, "kw": [["wire", "wait"], ["metal", "metal"]]}),
 ("say", "m1202", H, "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "attracts" and "ignored"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we learnt that a magnet is usually made of iron or steel, and it attracts the steel pin. But it ignored the copper wire, and copper is a metal!", {"pre": .4, "post": .6, "gap": .7, "kw": [["pic2", "attracts"], ["pic3", "ignored"]]}),
 # ---- 2 · the recycling corner at the void deck's edge, after a shower: Basil brings two rinsed cans to the test table; the game and the
 #          hidden snail (ONE smooth push-in onto the snail on the side of the blue recycling bin: the INTRO spot)
 ("scene", "place"), ("wait", .5), ("mark", "cans"), ("wait", .4),   # Stage 1 trims for length (were .8, .6; the recap's post 1.0 -> .6)
 ("say", "n201b", B, "We rinsed two empty cans for recycling." + ("" if "bothmetal" in CUTS else " Both of them are metal!"), {"pre": .2, "post": .2}),   # Stage 1 cut "bothmetal": the ring's clue label says it
 ("scene", "game"),
 ("say", "n202", H, "A little snail is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "n203b", B, ("" if "snailtip" in CUTS else "Snails come out after rain. ") + "Look low, where it is wet!", {"pre": .3, "post": .2}),   # Stage 1 cut "snailtip" (section 6)
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Momo reads)
 ("scene", "goals"), ("say", "n301", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302", M, "Not all metals.", {"pre": .3, "post": .3}),
 ("say", "n303", M, "How magnets interact.", {"pre": .3, "post": .3}), ("say", "n304", M, "Test, do not guess.", {"pre": .3, "post": .7}),   # Stage 1: post .9 -> .7 for length
 # ---- 4 · Round 1: the drink can or the food tin? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Which can will the magnet pull? One, the drink can. Two, the food tin. Three, both. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0}),
 ("say", "n403m", M, "Three! They are both metal cans, and they are both shiny and silver.", {"pre": .5}),
 ("say", "n404p", P, "Two. At home, a fridge magnet held on to a food tin like this. I tested it.", {"pre": .4}),
 ("say", "n405b", B, "Two! Dad says drink cans like this are made of aluminium. And aluminium is not iron or steel!", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · BE AN ALUMINIUM CAN (the journey; the buddies ride along on a flattened paper box): the blue bin, the truck, the recycling plant's
 #          belt, the giant magnet lifts the steel tins, you roll on
 ("scene", "waitw"),
 ("say", "n501", H, "Be an aluminium can! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jbin"),
 ("say", "n502", H, "You are an empty drink can, made of aluminium. Clunk! You drop into the blue recycling bin.", {**SLOW, "pre": 0, "post": .8, "kw": [["jclunk", "clunk"]]}),
 ("say", "n503", H, "A truck takes you to a recycling plant. You ride a moving belt, with steel food tins and plastic bottles.", {**SLOW, "pre": .2, "post": .8, "kw": [["jtruck", "truck"], ["jbelt", "belt"]]}),
 ("say", "n504", H, "Above the belt hangs a giant magnet. Clang! The steel tins jump up onto it.", {**SLOW, "pre": .2, "post": .8, "kw": [["jmagnet", "magnet"], ["jclang", "clang"]]}),
 ("say", "n505", H, "But you roll right on. The magnet does not pull you, even though you are a metal.", {**SLOW, "pre": .2, "kw": [["jroll", "roll"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (Pip and Basil, who were right, gave their reasons in their picks); the test is shown (test, do not guess)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "tinans"),
 ("say", "n601", H, "The answer is two: the steel food tin! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 # ---- 7 · Momo's question (two metals, both ignored); [LOOK CLOSER] the book's eight objects, nothing moves; NON-MAGNETIC MATERIALS (Basil);
 #          the surprise: copper and aluminium (Pip), the METALS family board; Momo fixes her own idea; Mark Sentence 1 (Pip): 6.4
 ("scene", "table"),
 ("say", "n701m", M, "But the drink can and the copper wire are both metal. Why does the magnet ignore them?", {"pre": .5}),
 ("scene", "lcmetals"),
 ("say", "n702", H, "Look closer. Basil's magnet passes every object on our table, and not one of them moves.", {**LC, "pre": 1.2, "kw": [["pass", "passes"]]}),
 ("say", "n703", H, "These objects are made of non-magnetic materials.", {**LC, "pre": .3, "term": ["non-magnetic materials"], "kw": [["kw_non_magnetic_materials", "non-magnetic"]]}),
 HOLD("kw_non_magnetic_materials"),
 ("say", "n704b", B, "Non means not. Non-magnetic materials are the ones a magnet does not attract, like wood, glass and plastic!", {"pre": .2}),
 ("say", "n705p", P, "Here is the surprise. Copper and aluminium are metals, but they are non-magnetic too!", {"pre": .2, "kw": [["metals", "surprise"]]}),
 ("say", "n706m", M, "So being a metal is not enough! Only some metals, like iron and steel, are magnetic.", {"pre": .2}),
 *cut("coin", [("say", "n707c", P, "Here is another surprise. Singapore coins have steel inside, so a magnet attracts them, even the copper-coloured ones! Test it, do not guess by the colour.", {"pre": .2})]),
 *VERDICT("v_metals"),
 ("scene", "mark1"),
 ("say", "n708", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n709", P, "Objects that are not attracted to magnets are made of non-magnetic materials. Non-magnetic materials include ceramic, fabric, glass, plastic, rubber and wood. Metals such as aluminium and copper are also non-magnetic.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · Showdown: Basil's homework (double points); the fix (line 3 struck, rewritten in green; the magnet passes over the foil)
 ("scene", "showcard"), ("wait", .8 if "showhold" in CUTS else 1.0),   # Stage 1 cut "showhold": the card's hold to .8 s (section 6)
 ("scene", "show"),
 ("say", "n801", H, "Showdown! Double points. Basil's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "n802b", B, "One: the iron nail is attracted, so it is magnetic. Two: the wooden ruler is not attracted, so it is non-magnetic. Three: the foil is shiny and grey, like steel, so it is magnetic.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "n803", H, "Locked in!", {"pre": 0}),
 ("say", "n804m", M, "Three! We cannot tell by looking. The magnet did not attract the foil, so the foil is non-magnetic.", {"pre": .5}),
 *cut("basilfix", [("say", "n806b", B, "Oops! I guessed by its colour. Next time, I will test it with my magnet.", {"pre": .3, "post": .2})]),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .4), ("mark", "test"), ("wait", .2),   # Stage 1 trims (were .5, .5, .3)
 ("say", "n805", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 9 · the theme's word: the playground's swing (I0.1 on a strip; INTERACT, Pip); [LOOK CLOSER] the magnet meets each object: two groups
 #          (6.4a on a strip; CLASSIFY, Momo); the test table's halves get the book's names; Mark Sentence 2 (Basil): 6.5
 ("scene", "interact"),
 ("say", "n901", H, "Our new theme is called Interactions. When you push a swing, it moves away from you." + ("" if "door" in CUTS else " You pull a door, and it opens."), {"pre": .5, "kw": [["swing", "swing"]]}),
 ("say", "n902", H, "Magnets interact with other objects too.", {"pre": .3, "hold": STRIP, "term": ["interact"], "kw": [["kw_interact", "interact"]]}),
 HOLD("kw_interact"),
 ("say", "n903p", P, "Interact means one thing acts on another. The magnet pulls the pin, and the pin moves!", {"pre": .2}),
 ("scene", "lcinteract"),
 ("say", "n904", H, "Look closer. Bring the magnet near each object, and watch how they interact.", {**LC, "pre": 1.2, "kw": [["near", "near"]]}),
 ("say", "n905", H, "One of the ways to classify these materials is to observe how they interact with a magnet.", {**LC, "pre": .3, "hold": STRIP, "term": ["classify"], "kw": [["kw_classify", "classify"]]}),
 HOLD("kw_classify"),
 ("say", "n906m", M, "To classify is to sort things into groups. The magnet sorts them into two groups: magnetic and non-magnetic!", {"pre": .2, "kw": [["groups", "groups", 1]]}),
 *VERDICT("v_classify"),
 ("scene", "mark2"),
 ("say", "n907", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n908", B, "A magnet can interact with objects that are made of magnetic materials.", {"pre": 0, "gap": .6}),
 *cut("whiteboard", [("say", "n909m", M, "That is why the magnets on our class whiteboard can hold up our work!", {"pre": .3})]),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the snail (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the snail? It was on a wet leaf of the potted plant!", {"pre": .5, "post": .2}),
 ("say", "n1103b", B, "Here is a fun fact! Deep in the sea lives a snail with iron in its shell. A magnet can attract this snail!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_deep", "deep"], ["ff_snail", "iron"], ["ff_magnet", "magnet"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 12 · the dare for Episode 20 (the test table: two ring magnets on a pencil in plasticine; the top one floats)
 ("scene", "dare"),
 ("mark", "rings"), ("wait", .4), ("mark", "dareIn"), ("wait", .2),   # Stage 1 trims (were .6, .3)
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["float", "floats"]]}),
 *cut("nextjoke", [("say", "n1202", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Non-magnetic materials", "Interact", "Classify"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP18, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
