"""script.py: P3 EP17 "The caterpillar that becomes a butterfly: 4 stages" (Ch 5, Life Cycles of Animals, pp. 86-89),
Part 1 ("Is a Caterpillar a NYMPH? The Butterfly's Secret Stage") and Part 2 ("What's WRIGGLING in This Pail of Rainwater?"): the script
(../p3_ep17_script.md, version 1 of 23 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov: 1 the journeys with "You: a ..."
and the buddies riding along, 1b/1c two look-closers per part walked from the learner's seat, 1d big buddies who teach the terms, 4 the
hidden animal never back at its intro spot + a surprising fun fact at the reveal, 5 full human sentences, 6 talking = a moving mouth,
reactions follow the answer and every pose has a reason) as data. Every spoken line is word for word as in the script. make_voice.py
records the lines; build_tl.py lays them on the timeline.
Written BEFORE Stage 1: this file holds only the lines; the engine (make_voice.py, build_tl.py, lib.js ...) is copied in at Stage 1.

The dare that opens Part 1 is EP16's closing dare ({NEXT_DARE} of ../ep16/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): DARE_Q1 + DARE_Q2 == that text (asserted below). The dare into EP18 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): as EP15 and EP16. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences,
softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP16): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Respellings: "moult", "moults", "moulted" (the book's British spelling) are spoken from the US spelling (MOULT), as EP16. "4" in the goal
card is said "four". "larvae" (plural) is "LAR-vee" (pron LARVAE). Aedes albopictus / Aedes aegypti (the book's names, on the strip) are
spoken from ../sg_pron.py (Stage 1, 23 Nov: Kokoro said "eeds", and the respelling "Ay-ee-deez" came out "EYE-ee-deez"): "ay-EE-deez
al-boh-PIK-tus" / "ay-EE-deez ee-JIP-tie"; "prolegs" too ("PRO-legs": Kokoro's own swallowed the "legs"). "pupae" is Kokoro's own (PEW-pee).
Test clip ../pron_clips/Heart_ep17_new_words.m4a (waiting for the teacher's listen).

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: munch, cardsIn, budsIn, ltIn (cold open, speaking from 0.825 s: the lime plant at dawn, the caterpillar munches, EP16's two dare cards slide in), title;
  pair (the caterpillar beside a butterfly picture: the answer); lclegs: front (the three pairs of pointed legs light), stumps (the prolegs),
  hooks (the magnifier on one proleg's tiny hooks), grip (the caterpillar grips a twig and walks); the journey (dive, jegg, jhatch, jmunch,
  jtight, jbig, jhang, jsplit, jpupa); holdon: pupastill (Pip's board: the pupa with "zzz"); lcpupa: case, window (the cut-away opens),
  form (the wing shapes, feelers and legs take shape), dark (the case darkens; the wing colours show through); split, out, wings, fly (the
  butterfly comes out, pumps its wings flat and flies); ltegg / ltlarva / ltpupa / ltadult / ltback (the board's tiles hop onto the loop;
  the last arrow back to the egg); pail, wrig (the cliffhanger).
  Part 2: pic1 / pic2 / pic3 (recap); rain (the pail and the plate after rain); lcwriggler: hang (the wrigglers hang from the surface),
  tube (the magnifier on the tail's little tube), dive (a shadow: they wriggle down), up (they wriggle back up); the journey (dive, jegg,
  jhatch, jeat, jbig, jpupa, jsplit, jfly); l1 / l2 / l3 (Basil's homework lines light), strike, rewrite; plate (the corridor: the plate under
  a pot); lcplate: water, eggs, wrigglers (the magnifier in the plate), tip (an adult tips the plate out), dim (the loop's tiles go dim one by
  one); vase, pail2 (back to the child's life: change the vase water, turn the pail over); dareIn.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back).
  Part 1: title2 (the title's second slam hold), basiloops (a604b), wormoops (a708m), mealworm (a909m), cake (a1107m), pipoops (a1006p).
  Part 2: momooops (b704m), feetup (b505b), vaseline (b1007m), nextjoke (b1402).
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip, a buddy's explanation of a key word.
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"title2", "basiloops", "wormoops", "pipoops", "buddypt", "mealworm", "cake", "momooops", "buddypt2", "basilexp", "feetup", "shadow", "dragonair", "nextjoke"}   # script section 6: in use from the start, for length
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP16's dare into EP17 (../ep16/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP16_NEXT = "Next time: a caterpillar! One day, it will become a butterfly. Is the caterpillar a nymph, like the young grasshopper? One, yes. Two, no. Lock in your answer!"
DARE_Q1, DARE_Q2 = "A caterpillar! One day, it will become a butterfly. Is the caterpillar a nymph, like the young grasshopper?", "One, yes. Two, no."
assert "Next time: a caterpillar! " + DARE_Q1[len("A caterpillar! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP16_NEXT
DARE_CARDS = ["Yes, a nymph", "No"]          # EP16's own two cards (NEXT_CARDS)
DARE_LABEL = "Is the caterpillar a nymph?"
DARE_SHORT = "Is the caterpillar a nymph?"
DARE_CLUES = ["long, soft body", "chews leaves"]
# Block B: the dare into EP18 (plan row 18, "Frog vs mosquito: same or different? How to compare")
NEXT_DARE = "Next time: a frog and a mosquito! Both lay their eggs in water, and both have young that look nothing like the adult. Are their life cycles the same? One, yes. Two, no. Lock in your answer!"
NEXT_CARDS = ["Yes, the same", "No, different"]
NEXT_JOKE = "I vote for the frog. It does not bite!"

# the chant (Part 2): call and response (EP7 / EP14 / EP15 / EP16 form), YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Egg, larva, pupa, adult!", "Four stages!"), ("The pupa does not eat!", "It changes inside!"), ("Still water?", "Tip it out!")]
CHANT_CAPS = ([1.25, 1.2, .9], [1.0, 1.15, 1.0])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
MOULT = {"moults": "molts", "Moults": "Molts", "moult": "molt", "moulted": "molted"}
FOUR = {"4": "four"}
LARVAE = {"larvae": "larvee"}
AEDES = {}   # Stage 1: the respelling came out "EYE-ee-deez"; the names are now in ../sg_pron.py (phonemes; test clip ../pron_clips/Heart_ep17_new_words.m4a)

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
 # ---- 1 · the cold open, SPEAKING (SERIES_FORMAT 11 item 1; teacher 24 Nov 2026: "Not speaking for the first few seconds"; the v2 of the
 #          live episode, EP22's approach): the community garden at dawn (EP15/EP16's garden). The lime plant in its big pot at the garden's
 #          edge (EP16's dare spot): a plump green caterpillar munches a leaf (munch); Heart's "Last time, we asked:" starts at 0.825 s;
 #          EP16's two dare cards slide in low (cardsIn, after it); the buddies pop in at "One day" (budsIn). The lime plant stays on screen
 #          UNDER "A caterpillar! One day, it will become a butterfly." (it shows exactly that); "lasttime" starts .45 s before "Is" (ltIn;
 #          build_tl's ("scene", name, {"at": mark, "d": s})). Was: 6.0 s of picture and ambience before the first word (6.3 s); now 5.475 s shorter.
 ("scene", "cold"), ("wait", .6), ("mark", "munch"),
 # ---- 2 · "Last time...": EP16's dare, word for word, then the title
 ("say", "a201", H, "Last time, we asked:", {"pre": .3}),
 ("mark", "cardsIn"),
 ("say", "a202", H, DARE_Q1, {"pre": .3, "kw": [["budsIn", "one"], ["ltIn", "is"]]}),
 ("scene", "lasttime", {"at": "ltIn", "d": -.45}),
 ("say", "a203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "a204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "title2" in CUTS else 2.2),
 # ---- 3 · the game, and the hidden moth (named first; ONE smooth push-in from the garden onto the moth on the void deck's pillar)
 ("scene", "game"),
 ("say", "a301a", H, "A little moth is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "a301b", B, "Moths rest in the daytime. Look on the walls, and under the leaves!", {"pre": .3, "post": .1}),
 ("say", "a301r", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Pip reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "a401", P, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "a402", P, "The 4-stage life cycle.", {"pre": .3, "post": .3, "pron": FOUR}),
 ("say", "a403", P, "Larva and pupa.", {"pre": .3, "post": .3}), ("say", "a404", P, "What prolegs are.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP16's dare (a short 3 s ring: the answer was locked in at the end of EP16)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "a501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "a502", H, "Locked in!", {"pre": 0}),
 ("say", "a503", B, "One! It is a young insect that munches leaves, just like the grasshopper nymph. So it must be a nymph!", {"pre": .5}),
 ("say", "a504", P, "Two. A nymph looks like a small adult. But this caterpillar looks nothing like a butterfly.", {"pre": .4}),
 ("say", "a505", M, "Two! A butterfly has big wings. This caterpillar is just a long, green tube that eats!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · the answer: no (the caterpillar beside the butterfly it will become). Only Pip and Momo, who were right, explained it
 ("scene", "answer1"),
 ("say", "a601", H, "The answer is two: no, it is not a nymph! Two fingers? One finger up!", {"pre": .4, "kw": [["pair", "nymph"], ["ansglow", "two", 0], ["coin1", "one"]]}),
 *cut("basiloops", [("say", "a604b", B, "Oops! It munches like a nymph, but it does not look like its parents at all.", {"pre": .3})]),
 *cut("buddypt", [("say", "a602", H, "Two of you were right, so the Buddies score a point too.", {"pre": .3, "post": .2})]),
 # ---- 7 · Momo's guess (a worm?); [LOOK CLOSER] the caterpillar's legs: six pointed legs at the front (an insect), prolegs at the back;
 #          the book's strip ("Like all insects, caterpillars have six legs."); PROLEGS pops; Basil teaches it; Mark Sentence 1 (Basil)
 ("scene", "lime"),
 ("say", "a701m", M, "Then what is it? It is long and soft, and it wriggles. Is it a worm?", {"pre": .5}),
 ("scene", "lclegs"),
 ("say", "a702", H, "Look closer. Count the legs at the front. Then look at the little stumps at the back.", {**LC, "pre": 1.2, "kw": [["front", "front"], ["stumps", "stumps"]]}),
 ("say", "a703p", P, "One, two, three pairs of pointed legs at the front. That is six legs, so it is an insect!", {"pre": .1}),
 ("say", "a704", H, "Like all insects, caterpillars have six legs.", {**LC, "pre": .3, "hold": STRIP}),
 ("say", "a705", H, "The stumps at the back are not real legs. They are called prolegs.", {**LC, "pre": .3, "term": ["prolegs"], "kw": [["kw_prolegs", "prolegs"]]}),
 HOLD("kw_prolegs"),
 ("say", "a706b", B, "Prolegs are pretend legs with tiny hooks. The hooks grip the twig, so the caterpillar can hold on and crawl along!", {"pre": .2, "kw": [["hooks", "hooks"], ["grip", "grip"]]}),
 *cut("wormoops", [("say", "a708m", M, "Oops! A worm has no legs at all, so a caterpillar is not a worm.", {"pre": .2})]),
 *VERDICT("v_legs"),
 ("scene", "mark1"),
 ("say", "a707", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "a708", B, "Prolegs are false legs that help the caterpillars to move.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · BE A BUTTERFLY EGG (the first-person journey; the buddies ride along, shrunk): the egg on a lime leaf, the caterpillar munches
 #          and moults, it hangs still, its skin splits, and a hard case is left: the pupa
 ("scene", "waitw"),
 ("say", "a801", H, "Be a butterfly egg! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jegg"),
 ("say", "a802", H, "You are a tiny round egg, stuck on a lime leaf. Days go by, and you hatch. You are a little caterpillar!", {**SLOW, "pre": 0, "post": .8, "kw": [["jhatch", "hatch"]]}),
 ("say", "a803", H, "You munch the leaf, and munch, and munch. Your skin gets tight, so you moult, and you grow bigger.", {**SLOW, "pre": .2, "post": .8, "pron": MOULT, "kw": [["jmunch", "munch"], ["jtight", "tight"], ["jbig", "bigger"]]}),
 ("say", "a804", H, "One day, you stop eating. You hang very still from a stem.", {**SLOW, "pre": .2, "post": .8, "kw": [["jhang", "hang"]]}),
 ("say", "a805", H, "Your skin splits one last time. Underneath, there is a hard case. You are a pupa!", {**SLOW, "pre": .2, "kw": [["jsplit", "splits"], ["jpupa", "pupa", 0]]}),
 ("wait", 1.0),
 # ---- 9 · pull back out; LARVA pops (the book's 5.8 note, exact); Momo teaches it; the larva's job (the book's words, said by Heart)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "larva"),
 ("say", "a901", H, "The butterfly larva is also called a caterpillar.", {"pre": .5, "term": ["larva"], "kw": [["kw_larva", "larva"]]}),
 HOLD("kw_larva"),
 ("say", "a902m", M, "So the caterpillar is the butterfly's larva. A larva is the young, and it looks nothing like the adult!", {"pre": .2}),
 ("say", "a903", H, "The larva eats a lot and moults many times as it grows.", {"pre": .4, "hold": STRIP, "pron": MOULT}),
 *cut("mealworm", [("say", "a909m", M, "The mealworms some classes keep are larvae too. They are the young of a beetle!", {"pre": .3, "pron": LARVAE})]),
 # ---- 10 · HOLD ON! Pip's rule: the pupa does not move or eat, so nothing is happening; Basil fixes it; PUPA pops
 ("scene", "holdon"),
 ("say", "a1001p", P, "Now it does not move, and it does not eat. So nothing is happening in there. It is just resting!", {"pre": .5, "post": .2, "kw": [["pupastill", "move"]]}),
 ("say", "a1002", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "a1003", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "a1004b", B, "It does not eat, but it is alive and very busy. Inside its case, it is changing into a butterfly!", {"pre": .3, "post": .2}),
 ("say", "a1005", H, "This stage is called the pupa.", {"pre": .3, "term": ["pupa"], "kw": [["kw_pupa", "pupa"]]}),
 HOLD("kw_pupa"),
 *cut("pipoops", [("say", "a1006p", P, "Oops! Still on the outside does not mean nothing is happening inside.", {"pre": .2})]),
 # ---- 11 · [LOOK CLOSER] inside the pupa: a cut-away window; the wing shapes form; the case darkens and the colours show through; the
 #           book's strip; Momo's picture (a cake in the oven); then the butterfly comes out
 ("scene", "lcpupa"),
 ("say", "a1101", H, "Look closer. On the outside, the pupa hardly moves. But inside the pupal case, the body is changing.", {**LC, "pre": 1.2, "kw": [["case", "pupal"], ["window", "inside", 0]]}),
 ("say", "a1102", H, "It does not eat. It continues to develop into an adult in the pupal case.", {**LC, "pre": .4, "hold": STRIP, "kw": [["form", "develop"]]}),
 ("say", "a1103m", M, "So the pupa is busy, like a cake in the oven. You cannot see it change, but it is changing inside!", {"pre": .2}),
 ("mark", "dark"), ("wait", 1.2),
 ("say", "a1105", H, "Then the pupal case splits, and out comes the adult: a butterfly!", {**LC, "pre": .3, "kw": [["split", "splits"], ["out", "out"]]}),
 ("mark", "wings"), ("wait", 1.0),
 ("say", "a1106b", B, "Its wings are all crumpled, like my bedsheet in the morning. Now they are spreading out flat!", {"pre": .2}),
 *cut("cake", [("say", "a1107m", M, "It is the most beautiful cake I have ever seen!", {"pre": .2})]),
 ("mark", "fly"), *VERDICT("v_pupa"),
 # ---- 12 · the loop board OUR BUTTERFLY'S LIFE CYCLE (four tiles, no numbers); the book's 5.8 on a strip; Mark Sentence 2 (Momo): 5.6a
 ("scene", "ring"), ("mark", "ltegg"), ("wait", .5),
 ("say", "a1201", H, "The butterfly has four stages in its life cycle. The stages are the egg, the larva, the pupa and the adult.", {"pre": .3, "hold": STRIP, "kw": [["ltlarva", "larva"], ["ltpupa", "pupa"], ["ltadult", "adult"]]}),
 ("mark", "ltback"), ("wait", .8),
 ("scene", "mark2"),
 ("say", "a1202", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "a1203", M, "Some animals have four stages in their life cycles. The young of these animals do not look like the adult.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 13 · score hand, the moth (and its fun fact), the key words
 ("scene", "final"),
 ("say", "a1301", H, "Show me your score hand! More than one finger? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "a1302", H, "Did you spot the moth? It was on the side of the lime plant's pot!", {"pre": .6, "post": .2}),
 ("say", "a1303", P, "Here is a fun fact! Many moth caterpillars spin a silk cocoon, and become a pupa inside it. The silk for silk clothes comes from a moth's cocoon!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_cocoon", "cocoon"], ["ff_silk", "silk", 2]]}),
 ("say", "a1304", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Prolegs", "Larva", "Pupa"]),
 # ---- 14 · the cliffhanger: an old pail of rainwater at the garden's edge; tiny things wriggle up and down in it
 ("scene", "cliff"), ("wait", .3),
 ("say", "a1401b", B, "Look in this old pail of rainwater! Tiny things are wriggling up and down. What are they?", {"pre": .3, "kw": [["pail", "pail"], ["wrig", "wriggling"]]}),
 ("say", "a1402", H, "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "pupa" and "pail"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "b101", H, "Last time, the caterpillar turned out to be a larva. It became a pupa, then a butterfly. Then Basil found something wriggling in an old pail!", {"pre": .4, "post": 1.0, "gap": .7, "kw": [["pic2", "pupa"], ["pic3", "wriggling"]]}),
 # ---- 2 · the garden's corner after rain (the pail, a flower-pot plate); the game and the hidden dragonfly
 ("scene", "place"), ("mark", "rain"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "b201a", H, "A little dragonfly is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "b201b", B, "Dragonflies love to perch on the tips of sticks. Keep your eyes open!", {"pre": .3, "post": .2}),
 ("say", "b201c", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads)
 ("scene", "goals"), ("say", "b301", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "b302", B, "The mosquito's life cycle.", {"pre": .3, "post": .3}),
 ("say", "b303", B, "Mosquitoes and dengue.", {"pre": .3, "post": .3}), ("say", "b304", B, "Why we tip out still water.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the wrigglers are young mosquitoes. What do they turn into next? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "b401", H, "Round one. These wriggly things are young mosquitoes. What comes next? One, an egg. Two, a pupa. Three, an adult. Show me with your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "b402", H, "Locked in!", {"pre": 0}),
 ("say", "b403", M, "Three! They are baby mosquitoes, so next they fly away as mosquitoes!", {"pre": .5}),
 ("say", "b404", B, "Two! The caterpillar became a pupa first. I bet the mosquito does that too!", {"pre": .4}),
 ("say", "b405", P, "Two. They look nothing like a mosquito, so I think they change inside a pupa first.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] the wrigglers: they hang from the water's surface (a little tube at the tail); a shadow: they wriggle down, then up;
 #          WRIGGLER pops (the book's 5.10 note, exact); Basil teaches it; the book's words: near the water surface
 ("scene", "lcwriggler"),
 ("say", "b501", H, "Look closer. Each one hangs upside down, just under the water's surface.", {**LC, "pre": 1.2, "kw": [["hang", "hangs"]]}),
 ("say", "b502p", P, "There is a little tube at its tail. It pokes up through the surface, like a snorkel, to get air!", {"pre": .1, "kw": [["tube", "tube"]]}),
 *(cut("shadow", [("say", "b503m", M, "But why do they all swim down when my shadow goes over the pail?", {"pre": .2, "kw": [["dive", "down"]]}),
 ("say", "b504", H, "They wriggle down to hide. Soon, they wriggle back up to the surface.", {**LC, "pre": .3, "kw": [["up", "back"]]})]) or [("mark", "dive"), ("wait", .8), ("mark", "up"), ("wait", .4)]),
 ("say", "b505", H, "The mosquito larva is also called a wriggler.", {**LC, "pre": .3, "term": ["wriggler"], "kw": [["kw_wriggler", "wriggler"]]}),
 HOLD("kw_wriggler"),
 ("say", "b506b", B, "It is called a wriggler because it wriggles, like this! It is the mosquito's larva, its young.", {"pre": .2}),
 *cut("feetup", [("say", "b505b", B, "And it hangs upside down, like a bat at the zoo!", {"pre": .2})]),
 *VERDICT("v_wriggler"),
 # ---- 6 · BE A MOSQUITO EGG (the journey; the buddies ride along on a floating leaf): egg, wriggler, pupa, adult
 ("scene", "waitw"),
 ("say", "b601", H, "Be a mosquito egg! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jegg"),
 ("say", "b602", H, "You are a tiny egg, laid on still water. Days go by. You hatch, and you are a wriggler!", {**SLOW, "pre": 0, "post": .8, "kw": [["jhatch", "hatch"]]}),
 ("say", "b603", H, "You hang from the surface. You eat tiny bits in the water, you moult, and you grow bigger.", {**SLOW, "pre": .2, "post": .8, "pron": MOULT, "kw": [["jeat", "eat"], ["jbig", "bigger"]]}),
 ("say", "b604", H, "Then you curl up into a pupa. You do not eat, but you keep changing inside.", {**SLOW, "pre": .2, "post": .8, "kw": [["jpupa", "pupa"]]}),
 ("say", "b605", H, "Your case splits at the surface. You climb out, and you dry your wings. You are an adult mosquito!", {**SLOW, "pre": .2, "kw": [["jsplit", "splits"], ["jfly", "adult"]]}),
 ("wait", 1.0),
 # ---- 7 · pull back out; the answer (Basil and Pip, who were right, explain); Mark Sentence 1 (Pip): 5.11 second half
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "mosqans"),
 ("say", "b701", H, "The answer is two: the pupa! Two fingers? One finger up!", {"pre": .5, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 *cut("basilexp", [("say", "b702b", B, "After the wriggler comes the pupa, and then the adult mosquito. It has four stages, just like the butterfly!", {"pre": .3})]),
 *cut("buddypt2", [("say", "b703", H, "Two of you were right, so the Buddies score a point too.", {"pre": .3, "post": .2})]),
 *cut("momooops", [("say", "b704m", M, "Oops! I forgot the pupa. The wriggler cannot fly yet!", {"pre": .3})]),
 ("scene", "mark1"),
 ("say", "b705", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b706", P, "A life cycle with four stages includes the egg, the larva, the pupa and the adult.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · Showdown: Basil's homework on the mosquito (double points); the fix: the book's 5.10a on a strip; DENGUE pops; Momo teaches it
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "b801", H, "Showdown! Double points. Basil's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "b802b", B, "My homework is on the mosquito! One: it has four stages. Two: its larva is a wriggler. Three: all mosquitoes spread dengue.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "b803", H, "Locked in!", {"pre": 0}),
 ("say", "b804p", P, "Three. Most mosquitoes do not spread any disease. Only some kinds do.", {"pre": .5, "post": .2}),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .5), ("mark", "rewrite"), ("wait", .6),
 ("say", "b806", H, "Most of the mosquitoes do not spread diseases, but some do. For example, Aedes albopictus and Aedes aegypti spread dengue.", {"pre": .2, "hold": 6.0, "post": .2, "term": ["dengue"], "kw": [["kw_dengue", "dengue"]]}),
 HOLD("kw_dengue"),
 ("say", "b807m", M, "Dengue is a sickness that gives people a high fever. Only some mosquitoes carry it, and they pass it on when they bite.", {"pre": .2}),
 ("say", "b808", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 9 · how does knowing the life cycle keep us safe? Pip's guess (too little water). [LOOK CLOSER] the flower-pot plate in the HDB
 #          corridor: STAGNANT WATER pops; Basil teaches it; the loop goes dim when the water is tipped out; Mark Sentence 2 (Basil): p. 89
 ("scene", "plate"),
 ("say", "b901m", M, "But how does the life cycle help to keep us safe?", {"pre": .5}),
 ("say", "b902p", P, "This flower-pot plate has only a little water. Surely that is too small for mosquitoes.", {"pre": .3}),
 ("scene", "lcplate"),
 ("say", "b903", H, "Look closer. This little bit of water has sat still for days.", {**LC, "pre": 1.2, "kw": [["water", "water"], ["wrigglers", "days"]]}),
 ("say", "b904", H, "Mosquito eggs are laid in stagnant water.", {**LC, "pre": .3, "term": ["stagnant water"], "kw": [["kw_stagnant_water", "stagnant"]]}),
 HOLD("kw_stagnant_water"),
 ("say", "b905b", B, "Stagnant water is still water that nobody changes. Even a tiny plate of it is enough for mosquitoes!", {"pre": .2}),
 ("say", "b906", H, "So, tip the water out. No still water means no eggs, no wrigglers and no pupae.", {**LC, "pre": .3, "kw": [["tip", "tip"], ["dim", "eggs"]]}),
 ("say", "b907m", M, "And no new mosquitoes! At home, we tip out the plates, turn the pails over, and change the water in the vases.", {"pre": .2, "kw": [["pail2", "pails"], ["vase", "vases"]]}),
 *VERDICT("v_plate"),
 ("scene", "mark2"),
 ("say", "b908", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b909", B, "We can reduce the number of mosquitoes breeding by removing their breeding spots in our schools and homes.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the dragonfly (and its fun fact)
 ("scene", "final"),
 ("say", "b1101", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "b1102", H, "Did you spot the dragonfly? It was on the handle of the watering can!", {"pre": .5, "post": .2}),
 ("say", "b1103m", M, "Here is a fun fact! A baby dragonfly is a nymph that lives underwater, and it gobbles up mosquito wrigglers!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_nymph", "underwater"], ["ff_gobble", "gobbles"]]}),
 *cut("dragonair", [("say", "b1105b", B, "And grown-up dragonflies catch mosquitoes in the air. Go, dragonflies!", {"pre": .3, "post": .2, "kw": [["ff_air", "air"]]})]),
 ("say", "b1104", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 12 · the dare for Episode 18 (the void deck: the buddies' frog loop and mosquito loop, side by side)
 ("scene", "dare"),
 ("mark", "dareIn"), ("wait", .5),
 ("say", "b1401", H, NEXT_DARE, {"pre": 0}),
 *cut("nextjoke", [("say", "b1402", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Wriggler", "Dengue", "Stagnant water"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP16, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
