"""script.py: P3 EP16 "A chick looks like a hen. A tadpole doesn't look like a frog!" (Ch 5, Life Cycles of Animals, pp. 80-85),
Part 1 ("Fish, Frog or Lizard? What Does a TADPOLE Become?") and Part 2 ("Why Did This Grasshopper Leave Its SKIN Behind?"): the script
(../p3_ep16_script.md, version 1 of 23 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands after 22 Nov: 1 the journeys with "You: a ..."
and the buddies riding along, 1b/1c two look-closers per part walked from the learner's seat, 1d big buddies who teach the terms, 4 the
hidden animal moving + a surprising fun fact at the reveal, 5 full human sentences, 6 talking = a moving mouth and reactions follow the answer)
as data. Every spoken line is word for word as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.
Written BEFORE Stage 1: this file holds only the lines; the engine (make_voice.py, build_tl.py, lib.js ...) is copied in at Stage 1.

The dare that opens Part 1 is EP15's closing dare ({NEXT_DARE} of ../ep15/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): DARE_Q1 + DARE_Q2 == that text. The dare into EP17 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): as EP15. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW TERM
(opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences,
softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP15): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Respellings: "moult", "moults", "moulting" are the book's British spelling; Kokoro is en-us, so each line that says one is spoken from the
US spelling (opts "pron" MOULT), which sounds the same ("mohlt"). Check it in the Stage 1 test clip. "lives" (verb) goes through sg_pron
("leev") on its own. Goal cards: "3" is said "three".

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: wriggle, cardsIn, budsIn (cold open: the pond at dawn, tadpoles wriggle past the egg clump; EP15's three dare cards slide in), title;
  lceggs: clump, dots (the magnifier on one egg), fish (a little fish nibbles and slides off), sun (the sun on the jelly: it stays wet);
  the journey (dive, jegg, jhatch, jtadpole, jback, jfront, jtail, jpad, jfrog); holdon: board (Pip's row of four pictures), bracket (the tadpole
  and the tadpole with legs get one bracket "the young"; Stage 1: renamed from "legs", which lcchick also uses); ring: tegg / tyoung / tadult / tback (the frog board's tiles hop onto the loop;
  the last arrow from the frog back to the eggs); henIn (the hen and chicks walk in); lcchick: beak, wings, legs, peck, pairs (the
  side-by-side: chick+hen LOOKS LIKE THE ADULT, tadpole+frog DOES NOT); hop, skin (the cliffhanger).
  Part 2: pic1 / pic2 / pic3 (recap); hop (the little grasshopper hops onto a blade of grass); lcnymph: pairin, legs, feelers, jump, wings;
  lcskin: split, hollow, tight (the picture model: the nymph grows inside its hard skin, arrows push out); the journey (dive, jnymph, jeat,
  jtight, jsplit, jout, jhard, jagain, jwings); l1 / l2 / l3 (Pip's homework lines light), strike, rewrite; case (the egg case pops in the
  fix's loop); board4 (the four three-stage loops: frog, chicken, grasshopper, cockroach); caterpillar, dareIn.

CUTS (script section 6, non-teaching, in order). Put a tag in CUTS to drop that beat, then rebuild the timeline. All of these are in use
  from the start (the estimate was 6:12 / 6:14 with every line; section 6 of the script keeps the words so a line can come back).
  Part 1: title2 (the title's second slam hold), momooops (e606m: Basil's line already corrects her), sago (e608m), lizoops (e804b),
  pipoops (e908p), roundgoes (e906 Heart: the loop's last arrow still lights, on a wait), chicknot (e1109 Heart: the 2x2 and the verdict
  still show it), hencount (e1110p Pip: the chicken's three stages), cliffq (e1502's first sentence).
  Part 2: basiloops (f506b), caption (f507, the nymph's caption strip; Momo's f701m then asks "how does a nymph get its wings?"),
  shirt (f706b), eww (f1103m), cater (f1400m), nextjoke (f1402).
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip, a buddy's explanation of a key word.
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"title2", "sago", "momooops", "lizoops", "pipoops", "roundgoes", "chicknot", "hencount", "cliffq", "basiloops", "caption", "shirt", "eww", "cater", "nextjoke"}   # script section 6: in use from the start, for length
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP15's dare into EP16 (../ep15/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP15_NEXT = "Next time: a tadpole! It lives in water, and it has a tail. What will it grow into? One, a fish. Two, a frog. Three, a lizard. Lock in your answer!"
DARE_Q1, DARE_Q2 = "A tadpole! It lives in water, and it has a tail. What will it grow into?", "One, a fish. Two, a frog. Three, a lizard."
assert "Next time: a tadpole! " + DARE_Q1[len("A tadpole! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP15_NEXT
DARE_CARDS = ["A fish", "A frog", "A lizard"]
DARE_LABEL = "What will the tadpole grow into?"
DARE_SHORT = "What will the tadpole grow into?"
DARE_CLUES = ["lives in water", "has a tail"]
# Block B: the dare into EP17 (plan row 17, "The caterpillar that becomes a butterfly: 4 stages")
NEXT_DARE = "Next time: a caterpillar! One day, it will become a butterfly. Is the caterpillar a nymph, like the young grasshopper? One, yes. Two, no. Lock in your answer!"
NEXT_CARDS = ["Yes, a nymph", "No"]
NEXT_JOKE = "Whatever it is, I hope the butterfly is as handsome as me!"

# the chant (Part 2): call and response (EP7 / EP14 / EP15 form), YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Egg, young, adult!", "Three stages!"), ("Chicks look like hens!", "Tadpoles don't!"), ("Skin too tight?", "Moult and grow!")]
CHANT_CAPS = ([1.15, 1.15, 1.05], [1.05, 1.1, 1.15])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
MOULT = {"moulting": "molting", "Moulting": "Molting", "moults": "molts", "Moults": "Molts", "moulted": "molted"}
THREE = {"3": "three"}

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
 # ---- 1 · silent cold open: the community garden's little pond at dawn (EP15's garden). A clump of frog eggs among the lily pads,
 #          tadpoles wriggle past; EP15's three dare cards slide in low; the buddies pop in
 ("scene", "cold"), ("wait", 1.6), ("mark", "wriggle"), ("wait", 1.0), ("mark", "cardsIn"), ("wait", 1.6), ("mark", "budsIn"), ("wait", 1.8),
 # ---- 2 · "Last time...": EP15's dare, word for word (each card steps forward as Heart says it), then the title
 ("scene", "lasttime"),
 ("say", "e201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "e202", H, DARE_Q1, {"pre": .3}),
 ("say", "e203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "e204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "title2" in CUTS else 2.2),
 # ---- 3 · the game, and the hidden tree frog (named first; ONE smooth push-in from the pond onto the tree frog on a leaf above it)
 ("scene", "game"),
 ("say", "e301a", H, "A little tree frog is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "e301b", B, "Tree frogs have sticky toes, so they climb up high. Look on the leaves, not just in the water!", {"pre": .3, "post": .1}),
 ("say", "e301r", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Basil reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "e401", B, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "e402", B, "The 3-stage life cycle.", {"pre": .3, "post": .3, "pron": THREE}),
 ("say", "e403", B, "Young that look different.", {"pre": .3, "post": .3}), ("say", "e404", B, "Why frog eggs have jelly.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP15's dare (a short 3 s ring: the answer was locked in at the end of EP15)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "e501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "e502", H, "Locked in!", {"pre": 0}),
 ("say", "e503", P, "One. It lives in water and swims with a tail, just like a fish.", {"pre": .5}),
 ("say", "e504", B, "Three! It has a long tail like me, so it must grow into a handsome lizard!", {"pre": .4}),
 ("say", "e505", M, "Two. Frogs sing at this pond every night, so I think it grows into a frog.", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · where do tadpoles come from? Pip asks; Momo's guess (born like kittens); Heart: watch from the very start
 ("scene", "pond"),
 ("say", "e601p", P, "But where do the tadpoles come from?", {"pre": .5}),
 ("say", "e602m", M, "I know! A mother frog has baby tadpoles, just like my mum had kittens!", {"pre": .3}),
 # ---- 7 · [LOOK CLOSER] the frog eggs: a clump of clear jelly with dark dots; the why (a fish slides off; the sun, the jelly stays wet);
 #          the book's strip 5.3; JELLY-LIKE COVERING pops; Basil teaches it
 ("scene", "lceggs"),
 ("say", "e604", H, "Look closer. Among the lily pads is a clump of clear jelly, full of tiny dark dots.", {**LC, "pre": 1.2, "kw": [["clump", "clump"]]}),
 ("say", "e605b", B, "Each dark dot is an egg! So the mother frog lays eggs, in the water.", {"pre": .1, "kw": [["dots", "egg"]]}),
 *cut("momooops", [("say", "e606m", M, "Oops! So frogs do not have babies the way cats do. They lay eggs!", {"pre": .2})]),
 ("say", "e607p", P, "But why are the eggs inside all this slippery jelly?", {"pre": .2}),
 ("say", "e608", H, "Frog eggs have a jelly-like covering. The covering protects the eggs from being eaten by other animals. It also keeps the eggs from drying out.", {**LC, "pre": .4, "hold": STRIP, "term": ["jelly-like covering"], "kw": [["kw_jelly_like_covering", "jelly-like", 0], ["fish", "eaten"], ["sun", "drying"]]}),
 HOLD("kw_jelly_like_covering"),
 ("say", "e609b", B, "The jelly is slippery, so a hungry fish finds it hard to grab an egg. And it holds water, so the eggs stay wet!", {"pre": .2}),
 *cut("sago", [("say", "e608m", M, "It looks just like the sago in my favourite dessert!", {"pre": .3})]),
 *VERDICT("v_eggs"),
 # ---- 8 · BE A FROG EGG (the first-person journey; the buddies ride along, shrunk): hatch, tadpole, legs, the tail shrinks, a frog
 ("scene", "waitw"),
 ("say", "e701", H, "Be a frog egg! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jegg"),
 ("say", "e702", H, "You are a tiny egg, inside the soft, clear jelly. A fish swims by, but you are safe.", {**SLOW, "pre": 0, "post": .8}),
 ("say", "e703", H, "Days go by. You wriggle out of the jelly. You are a tadpole, with a round body and a long tail!", {**SLOW, "pre": .2, "post": .8, "kw": [["jhatch", "wriggle"], ["jtadpole", "tadpole"]]}),
 ("say", "e704", H, "Weeks go by. Two back legs grow out, and then two front legs.", {**SLOW, "pre": .2, "post": .8, "kw": [["jback", "back"], ["jfront", "front"]]}),
 ("say", "e705", H, "Your tail shrinks away. You climb onto a lily pad, and you breathe the air. You are a frog!", {**SLOW, "pre": .2, "kw": [["jtail", "tail"], ["jpad", "lily"], ["jfrog", "frog"]]}),
 ("wait", 1.0),
 # ---- 9 · pull back out; the answer (only Momo, who was right, explains); TADPOLE pops; the book's caption strip
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "frogans"),
 ("say", "e801", H, "The answer is two: a frog! Two fingers? One finger up!", {"pre": .5, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "e802", H, "The young of the frog is called a tadpole.", {"pre": .4, "term": ["tadpole"], "kw": [["kw_tadpole", "tadpole"]]}),
 HOLD("kw_tadpole"),
 ("say", "e803m", M, "A tadpole is a young frog. It grew legs, and its tail shrank away, so now it hops like its parents!", {"pre": .2}),
 ("say", "e805", H, "It lives in water. It has a tail and does not look like the adult.", {"pre": .4, "hold": STRIP, "post": .2}),
 *cut("lizoops", [("say", "e804b", B, "Oops! It grew legs like me, but then its tail went away. So it is a frog, not a lizard.", {"pre": .3, "post": .1})]),
 # ---- 10 · HOLD ON! Pip counts five stages (every new look a new stage); Basil fixes it; the loop board closes (three stages)
 ("scene", "holdon"),
 ("say", "e901p", P, "My turn! I drew every change: egg, tadpole, tadpole with legs, and frog. That is four stages!", {"pre": .5, "post": .2, "kw": [["board", "egg"]]}),
 ("say", "e902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "e903", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "e904b", B, "A tadpole with legs is still the young. It is still growing into the adult, so the frog has three stages!", {"pre": .3, "post": .2, "kw": [["bracket", "legs"], ["tegg", "three"]]}),
 *cut("pipoops", [("say", "e908p", P, "Oops! The legs are just the young growing up.", {"pre": .3, "post": .1})]),
 ("scene", "ring"), ("mark", "tyoung"), ("wait", .6), ("mark", "tadult"), ("wait", .6),
 *(cut("roundgoes", [("say", "e906", H, "And the adult frog lays new eggs, so round and round it goes.", {"pre": .3, "kw": [["tback", "eggs"]]})]) or [("mark", "tback"), ("wait", 1.2)]),
 # ---- 11 · Mark Sentence 1 (Basil): 5.2, exact
 ("scene", "mark1"),
 ("say", "e1001", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "e1002", B, "A life cycle with three stages includes the egg, the young and the adult.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 12 · does every young animal look so different? A hen and her chicks walk by the garden. [LOOK CLOSER] chick and hen
 #           (Basil's colour rule; the body parts; CHICK pops on the book's 5.1 sentence); the side-by-side verdict
 ("scene", "hen"),
 ("say", "e1101p", P, "Does every young animal look so different from its parents?", {"pre": .5}),
 ("say", "e1102", H, "Look, a hen and her chicks! Some chickens walk freely near HDB blocks.", {"pre": .3, "kw": [["henIn", "hen"]]}),
 ("say", "e1103b", B, "Those chicks look nothing like the hen! They are small, yellow and fluffy, and she is big and brown.", {"pre": .3}),
 ("scene", "lcchick"),
 ("say", "e1104", H, "Look closer. Do not look only at the colour. Look at the body parts.", {**LC, "pre": 1.2}),
 ("say", "e1105p", P, "The chick has a beak, two wings and two legs, just like the hen.", {"pre": .1, "kw": [["beak", "beak"], ["wings", "wings"], ["legs", "legs"]]}),
 ("say", "e1106m", M, "And it pecks at the ground, just like its mum. It is a smaller, fluffier copy!", {"pre": .2, "kw": [["peck", "pecks"]]}),
 ("say", "e1107", H, "The young of the chicken is called a chick.", {**LC, "pre": .3, "term": ["chick"], "kw": [["kw_chick", "chick"]]}),
 HOLD("kw_chick"),
 ("say", "e1108b", B, "Oops! I only looked at the colour. A chick looks like the adult, the way a kitten looks like a cat!", {"pre": .2}),
 *(cut("chicknot", [("say", "e1109", H, "So a chick looks like the adult, but a tadpole does not.", {**LC, "pre": .3, "kw": [["pairs", "chick"]]})]) or [("mark", "pairs"), ("wait", 1.0)]),
 *cut("hencount", [("say", "e1110p", P, "And the chicken has three stages too: the egg, the chick and the adult chicken.", {"pre": .2})]),
 *VERDICT("v_chick"),
 # ---- 13 · Mark Sentence 2 (Pip): 5.0, exact
 ("scene", "mark2"),
 ("say", "e1201", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "e1202", P, "Some animals have three stages in their life cycles. Some of the young animals look like their parents, while some do not.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 14 · score hand, the tree frog (and its fun fact), the key words
 ("scene", "final"),
 ("say", "e1301", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "e1302", H, "Did you spot the tree frog? It was on the garden tap, beside the pond!", {"pre": .6, "post": .2}),
 ("say", "e1303", M, "Here is a fun fact! This tree frog lays its eggs in a ball of foam, on a leaf above the pond. When the tadpoles hatch, they drop into the water!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_foam", "foam"], ["ff_drop", "drop"]]}),
 ("say", "e1304", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Jelly-like covering", "Tadpole", "Chick"]),
 # ---- 15 · the cliffhanger: a little grasshopper with no wings, and an empty grasshopper on the grass
 ("scene", "cliff"), ("wait", .3),
 ("say", "e1501m", M, "Look! A little grasshopper with no wings. And what is this empty grasshopper on the grass?", {"pre": .3, "kw": [["hop", "grasshopper"], ["skin", "empty"]]}),
 ("say", "e1502", H, ("" if "cliffq" in CUTS else "Good eyes, Momo! Something strange happened here. ") + "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 16 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "tadpole" and "chick"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "f101", H, "Last time, a tadpole grew into a frog. It does not look like the adult, but a chick does. Then Momo found something strange in the grass!", {"pre": .4, "post": 1.0, "gap": .7, "kw": [["pic2", "it"], ["pic3", "then"]]}),
 # ---- 2 · the grassy corner of the garden; the little grasshopper; the game and the hidden praying mantis
 ("scene", "place"), ("mark", "hop"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "f201a", H, "A little praying mantis is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "f201b", B, "It is green, and it keeps very still. Look for two folded front legs!", {"pre": .3, "post": .2}),
 ("say", "f201c", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Momo reads)
 ("scene", "goals"), ("say", "f301", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "f302", M, "Young that look alike.", {"pre": .3, "post": .3}),
 ("say", "f303", M, "What moulting is.", {"pre": .3, "post": .3, "pron": MOULT}), ("say", "f304", M, "The cockroach's life cycle.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the little grasshopper has no wings. Which stage? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "f401", H, "Round one. This little grasshopper has no wings. Is it the young or the adult? One, the young. Two, the adult. Show me with your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "f402", H, "Locked in!", {"pre": 0}),
 ("say", "f403", B, "Two! It has six legs and feelers, like a big grasshopper. It is just a tiny adult!", {"pre": .5}),
 ("say", "f404", P, "One. It is small, with no wings yet, so I think it is the young.", {"pre": .4}),
 ("say", "f405", M, "One! Grown-up grasshoppers have long wings, and this one has none.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] the young beside an adult; NYMPH pops; Pip teaches it; the book's caption strip (it raises "moults")
 ("scene", "lcnymph"),
 ("say", "f501", H, "Look closer. Here is the little grasshopper, beside an adult.", {**LC, "pre": 1.2, "kw": [["pairin", "little"]]}),
 ("say", "f502p", P, "They both have six legs, two feelers, and big back legs for jumping.", {"pre": .1, "kw": [["legs", "legs"], ["feelers", "feelers"], ["jump", "jumping"]]}),
 ("say", "f503m", M, "But the adult has long wings, and the little one has none at all.", {"pre": .2, "kw": [["wings", "wings"]]}),
 ("say", "f504", H, "A young grasshopper is called a nymph.", {**LC, "pre": .3, "term": ["nymph"], "kw": [["kw_nymph", "nymph"]]}),
 HOLD("kw_nymph"),
 ("say", "f505p", P, "A nymph looks like the adult, only smaller, and it has no wings yet.", {"pre": .2}),
 *cut("basiloops", [("say", "f506b", B, "Oops! So looking like the adult does not make it an adult.", {"pre": .2})]),
 *cut("caption", [("say", "f507", H, "It looks like the adult. It does not have wings. It moults several times as it grows and becomes an adult.", {**LC, "pre": .4, "hold": STRIP, "pron": MOULT})]),
 *VERDICT("v_nymph"),
 ("scene", "nymphans"),
 ("say", "f508", H, "The answer is one: the young! One finger? One finger up!", {"pre": .5, "post": .2, "kw": [["ansglow", "one", 0], ["coin1", "one"]]}),
 # ---- 6 · Mark Sentence 1 (Momo): 5.4, exact
 ("scene", "mark1"),
 ("say", "f601", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "f602", M, "The life cycle of a grasshopper has three stages. The stages are the egg, the young and the adult. The young of the grasshopper is called a nymph.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 7 · "moults"? Momo's guess about the empty grasshopper (dried up); [LOOK CLOSER] the empty skin: the split, hollow legs and
 #          feelers; the why (a hard outer skin that cannot stretch: a picture model)
 ("scene", "skin"),
 ("say", "f701m", M, ("What does moults mean? " if "caption" not in CUTS else "But how does a nymph get its wings? ") + "And look at this. Did a grasshopper dry up in the sun?", {"pre": .5, "pron": MOULT}),
 ("scene", "lcskin"),
 ("say", "f702", H, "Look closer. It is empty inside, and there is a long split down its back.", {**LC, "pre": 1.2, "kw": [["split", "split"]]}),
 ("say", "f703b", B, "Even the legs and the feelers are empty, like an old jacket that somebody took off!", {"pre": .1, "kw": [["hollow", "empty"]]}),
 ("say", "f704p", P, "But why would a grasshopper take off its skin?", {"pre": .2}),
 ("say", "f705", H, "Its outer skin is hard, and it cannot stretch. So when the nymph grows, the old skin gets too tight.", {**LC, "pre": .3, "kw": [["tight", "tight"]]}),
 *cut("shirt", [("say", "f706b", B, "Like my old school shirt! I grew bigger, so it did not fit me any more.", {"pre": .2})]),
 *VERDICT("v_skin"),   # Stage 1: the look-closer's verdict THE OLD SKIN IS TOO TIGHT (script segment 6) had no mark
 # ---- 8 · BE THE NYMPH (the journey: the moult lived from inside; the buddies ride along on the next blade of grass)
 ("scene", "waitw"),
 ("say", "f801", H, "Be the nymph! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jnymph"),
 ("say", "f802", H, "You are a grasshopper nymph, on a blade of grass. You munch the leaves, and you grow.", {**SLOW, "pre": 0, "post": .8, "kw": [["jeat", "munch"]]}),
 ("say", "f803", H, "Your skin feels tight. You hold on, and your old skin splits open, down your back.", {**SLOW, "pre": .2, "post": .8, "kw": [["jtight", "tight"], ["jsplit", "splits"]]}),
 ("say", "f804", H, "You wriggle out, soft and pale, and a little bigger. Soon, your new skin turns hard.", {**SLOW, "pre": .2, "post": .8, "kw": [["jout", "wriggle"], ["jhard", "hard"]]}),
 ("say", "f805", H, "You do this several times. The last time, you come out with wings. You are an adult!", {**SLOW, "pre": .2, "kw": [["jagain", "several"], ["jwings", "wings"]]}),
 ("wait", 1.0),
 # ---- 9 · pull back out; MOULTING pops; Momo fixes her guess; Mark Sentence 2 (Basil): 5.5, exact
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "moult"),
 ("say", "f901", H, "Shedding the old outer skin to grow bigger has a name. It is called moulting.", {"pre": .5, "term": ["moulting"], "pron": MOULT, "kw": [["kw_moulting", "moulting"]]}),
 HOLD("kw_moulting"),
 ("say", "f902m", M, "Oops! It did not dry up. It moulted, and it hopped away bigger!", {"pre": .2, "pron": MOULT}),
 ("scene", "mark2"),
 ("say", "f1001", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "f1002", B, "As a young insect grows bigger, it sheds its outer skin and grows a new one. This process is called moulting.", {"pre": 0, "gap": .6, "pron": MOULT}),
 ("wait", 2.5),
 # ---- 10 · Showdown: Pip's homework on the cockroach (double points); the fix: the book's strip 5.6; EGG CASE pops; Basil teaches it
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "f1101", H, "Showdown! Double points. Pip's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "f1102p", P, "My homework is on the cockroach! One: it has three stages. Two: its eggs are found in an egg case. Three: its young does not look like the adult.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three", 1]]}),
 *cut("eww", [("say", "f1103m", M, "Eww, a cockroach! But I will be brave and look.", {"pre": .3})]),
 *LOCK("show", 5.0),
 ("say", "f1104", H, "Locked in!", {"pre": 0}),
 ("say", "f1105b", B, "Three! A cockroach nymph looks like a small adult, only with no wings yet.", {"pre": .5}),
 ("say", "f1106m", M, "Three. Only the tadpole looked different. The chick and the two nymphs all look like their parents.", {"pre": .4, "post": .2}),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .5), ("mark", "rewrite"), ("wait", .6),
 ("say", "f1107", H, "The young of the cockroach is called a nymph.", {"pre": .2, "hold": STRIP, "post": .2}),
 ("say", "f1108", H, "Its eggs are found in an egg case.", {"pre": .3, "term": ["egg case"], "kw": [["case", "egg"], ["kw_egg_case", "case"]]}),
 HOLD("kw_egg_case"),
 ("say", "f1109b", B, "An egg case is like a tiny brown purse, with lots of eggs lined up inside!", {"pre": .2}),
 ("say", "f1110", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 11 · the four three-stage loops; the book's line (5.11, first half) on a strip; the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand, the praying mantis (and its fun fact)
 ("scene", "final"),
 ("say", "f1301", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "f1302", H, "Did you spot the praying mantis? It was on a sunflower, keeping very still!", {"pre": .5, "post": .2}),
 ("say", "f1303b", B, "Here is a fun fact! The praying mantis is a close cousin of the cockroach. Its eggs are in an egg case too, and lots of tiny nymphs hatch out together!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_cousin", "cousin"], ["ff_case", "case"], ["ff_babies", "nymphs"]]}),
 ("say", "f1304", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 13 · the dare for Episode 17 (the lime plant at the garden's edge: a caterpillar)
 ("scene", "dare"),
 *cut("cater", [("say", "f1400m", M, "Look! A caterpillar is munching the leaves of the lime plant.", {"pre": .3, "kw": [["caterpillar", "caterpillar"]]})]),
 ("mark", "dareIn"), ("wait", .5),
 ("say", "f1401", H, NEXT_DARE, {"pre": 0}),
 *cut("nextjoke", [("say", "f1402", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Nymph", "Moulting", "Egg case"], pron=MOULT),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, Heart never in a buddy's wrong idea, the dare matches EP15
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
