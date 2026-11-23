"""script.py: P3 EP18 "Frog vs mosquito: same or different? How to compare" (Ch 5, Life Cycles of Animals, pp. 90-98: comparing, the
day-and-night story, Let's Apply, What I Have Learnt, the concept map; the Cycles theme closes here), Part 1 ("Frog vs Mosquito: SAME or
DIFFERENT? Count the Stages!") and Part 2 ("Which Came First, the Chicken or the EGG?"): the script (../p3_ep18_script.md, version 1 of
23 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov: 1 the journeys with "You: a ..." and the buddies riding along, 1b/1c
two look-closers per part walked from the learner's seat, 1d big buddies who teach the terms, 4 the hidden animal never back at its intro
spot + a surprising fun fact at the reveal, 5 full human sentences, 6 talking = a moving mouth, reactions follow the answer and every pose
has a reason) as data. Every spoken line is word for word as in the script. make_voice.py records the lines; build_tl.py lays them on the
timeline. Written BEFORE Stage 1: this file holds only the lines; the engine is copied in at Stage 1.

The dare that opens Part 1 is EP17's closing dare ({NEXT_DARE} of ../ep17/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): DARE_Q1 + DARE_Q2 == that text (asserted below). The dare into EP19 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): as EP15 to EP17. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences,
softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP16): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Respellings: "larvae" "LAR-vee", "pupae" "PEW-pee" (LARVAE). Check "observable" ("ob-ZER-vuh-bul") and "cicada" ("sih-KAH-duh") in the Stage 1
test clip. No new Singapore name is spoken.

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: loopsIn, cardsIn, budsIn (cold open: the void deck, the LIFE CYCLE DAY board; the frog loop and the mosquito loop slide into the
  COMPARE FRAME; EP17's two dare cards slide in), title; lccompare: frame (the two loops fill the panel), same1 / same2 (Momo's two
  similarities tick onto the SAME strip), count (the counting begins); the journey (dive, jpond, jtadpole, jfrog, jsplash, jwrig, jpupa,
  jmosq); tip (Basil tips out the plate); answer: three, four (the dots beside each loop: three, four); holdon: pipboard (Pip's sheet: frog
  and grasshopper, SAME!); lcyoung: tad (the tadpole beside the frog), nymph (the nymph beside the grasshopper), same3, diff3; hen, nest
  (the cliffhanger).
  Part 2: pic1 / pic2 / pic3 (recap); henIn (the hen on her nest under the bush); lcloop: finger (a finger touches the loop anywhere),
  daynight (the day-and-night loop from EP14 turns beside it); the journey (dive, jegg, jhatch, jchick, jhen, jlay, jagain); l1 / l2 / l3
  (Momo's homework lines light), strike, rewrite; lcbeetle: pupa (the beetle's pupa lights: four stages), wrig, meal (the two larvae side by
  side: the water surface and the bran); butterfly, lay (the butterfly from EP17 lays an egg on the lime plant), feet, fewer (the loop dims
  with too few plants), plant (a new lime plant: the loop glows again), theme (the CYCLES board: three questions, three answers); dareIn.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back).
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip, a buddy's explanation of a key word.
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"title2", "tipit", "pipoops", "basiloops", "feet", "gardens", "nextjoke", "fewer", "eggoops", "noplants", "pipshow"}   # script section 6: in use from the start, for length
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP17's dare into EP18 (../ep17/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP17_NEXT = "Next time: a frog and a mosquito! Both lay their eggs in water, and both have young that look nothing like the adult. Are their life cycles the same? One, yes. Two, no. Lock in your answer!"
DARE_Q1 = "A frog and a mosquito! Both lay their eggs in water, and both have young that look nothing like the adult. Are their life cycles the same?"
DARE_Q2 = "One, yes. Two, no."
assert "Next time: a frog and a mosquito! " + DARE_Q1[len("A frog and a mosquito! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP17_NEXT
DARE_CARDS = ["Yes, the same", "No, different"]   # EP17's own two cards (NEXT_CARDS)
DARE_LABEL = "Frog and mosquito: the same life cycle?"
DARE_SHORT = "Are their life cycles the same?"
DARE_CLUES = ["eggs in water", "young unlike the adult"]
# Block B: the dare into EP19 (plan row 19, "Why a magnet ignores a copper wire"; the Interactions theme opens)
NEXT_DARE = "Next time: a magnet, a steel pin and a copper wire! The pin and the wire are both metal. Which one will the magnet pull? One, the steel pin. Two, the copper wire. Three, both. Lock in your answer!"
NEXT_CARDS = ["The steel pin", "The copper wire", "Both"]
NEXT_JOKE = "My magnet holds up our whole board. Surely it can pull anything!"

# the chant (Part 2): call and response, YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Same or different?", "Compare them both!"), ("Count the stages!", "Three or four!"), ("Round and round!", "No first, no last!")]
CHANT_CAPS = ([1.0, 1.1, 1.0], [1.05, 1.05, 1.15])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
LARVAE = {"larvae": "larvee", "pupae": "pew-pee"}

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
 # ---- 1 · silent cold open: our block's void deck on a Saturday morning, beside the community garden. The buddies' LIFE CYCLE DAY board
 #          (every loop card from EP14 to EP17 pinned on a big cork board on two easels) and its COMPARE FRAME; the frog loop and the
 #          mosquito loop slide into the frame's two windows; EP17's two dare cards slide in low; the buddies pop in
 ("scene", "cold"), ("wait", 1.6), ("mark", "loopsIn"), ("wait", 1.0), ("mark", "cardsIn"), ("wait", 1.6), ("mark", "budsIn"), ("wait", 1.8),
 # ---- 2 · "Last time...": EP17's dare, word for word, then the title
 ("scene", "lasttime"),
 ("say", "k201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "k202", H, DARE_Q1, {"pre": .3}),
 ("say", "k203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "k204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "title2" in CUTS else 2.2),
 # ---- 3 · the game, and the hidden cicada (named first; ONE smooth push-in from the void deck onto the cicada on the rain tree's trunk)
 ("scene", "game"),
 ("say", "k301a", H, "A little cicada is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "k301b", B, "Cicadas sing loudly, but they hide well. Look on the tree trunks!", {"pre": .3, "post": .1}),
 ("say", "k301r", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Momo reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "k401", M, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "k402", M, "How to compare.", {"pre": .3, "post": .3}),
 ("say", "k403", M, "Count the stages.", {"pre": .3, "post": .3}), ("say", "k404", M, "Look at the young.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP17's dare (a short 3 s ring: the answer was locked in at the end of EP17)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "k501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "k502", H, "Locked in!", {"pre": 0}),
 ("say", "k503", M, "One! They both lay eggs in water, and both babies look nothing like their parents. So they are the same!", {"pre": .5}),
 ("say", "k504", B, "Two! A frog is big and green, and a mosquito is tiny and buzzy. They are totally different!", {"pre": .4}),
 ("say", "k505", P, "Two. I counted the stages on our board. The frog has three, but the mosquito has four.", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · Momo's question (she found two things that are the same); [LOOK CLOSER] the COMPARE FRAME: what is the same, what is different;
 #          SIMILARITIES and DIFFERENCES pop; Pip teaches them; Momo's two similarities are real (green ticks)
 ("scene", "board"),
 ("say", "k601m", M, "But I found two things that are the same! How can their life cycles be different?", {"pre": .5}),
 ("scene", "lccompare"),
 ("say", "k602", H, "Look closer. When we compare, we look for what is the same, and what is different.", {**LC, "pre": 1.2, "kw": [["frame", "compare"]]}),
 ("say", "k603", H, "What is the same are similarities. What is different are differences.", {**LC, "pre": .3, "term": ["similarities", "differences"], "kw": [["kw_similarities", "similarities"], ["kw_differences", "differences"]]}),
 HOLD("kw_differences"),
 ("say", "k604b", B, "Similarities are the things both life cycles have in common. Differences are the ways they are not the same.", {"pre": .2}),
 ("say", "k605", H, "Momo found two real similarities. Both lay their eggs in water, and in both, the young do not look like the adult.", {**LC, "pre": .3, "kw": [["same1", "eggs"], ["same2", "young"]]}),
 ("say", "k606", H, "But is there a difference? Let's count the stages.", {**LC, "pre": .3, "kw": [["count", "count"]]}),
 *VERDICT("v_compare"),
 # ---- 7 · BE A RAINDROP (the journey; the buddies ride along on a floating leaf): the pond (frog: three stages), then a flower-pot plate
 #          (mosquito: one more stage, the pupa: four)
 ("scene", "waitw"),
 ("say", "k701", H, "Be a raindrop! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jpond"),
 ("say", "k702", H, "You fall into the garden pond, beside some frog eggs. Days go by. Out wriggles a tadpole, the young.", {**SLOW, "pre": 0, "post": .8, "kw": [["jtadpole", "tadpole"]]}),
 ("say", "k703", H, "It grows legs, and its tail shrinks away. Out hops a frog. Egg, young, adult: three stages.", {**SLOW, "pre": .2, "post": .8, "kw": [["jfrog", "frog"]]}),
 ("say", "k704", H, "Splash! You land in a flower-pot plate, beside tiny mosquito eggs. Out come the wrigglers, the larvae.", {**SLOW, "pre": .2, "post": .8, "pron": LARVAE, "kw": [["jsplash", "splash"], ["jwrig", "wrigglers"]]}),
 ("say", "k705", H, "Each one curls into a pupa, one more stage! Then out comes a mosquito. Egg, larva, pupa, adult: four stages.", {**SLOW, "pre": .2, "kw": [["jpupa", "pupa", 0], ["jmosq", "mosquito"]]}),
 ("wait", 1.0),
 # ---- 8 · pull back out; Basil tips out the plate (EP17's lesson); the answer (only Pip, who counted, explains); Basil was right for the
 #          wrong reason (no point); OBSERVABLE CHARACTERISTICS pops; Pip teaches it; Mark Sentence 1 (Pip): 5.14, the book's model answer
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 *cut("tipit", [("say", "k801b", B, "And now, that plate gets tipped out. No more mosquitoes from there!", {"pre": .3, "kw": [["tip", "tipped"]]})]),
 ("say", "k802", H, "The answer is two: no, they are different! Two fingers? One finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "k803p", P, "The frog has three stages, and the mosquito has four. The mosquito has a pupa, and the frog does not.", {"pre": .3, "kw": [["three", "three"], ["four", "four"]]}),
 ("say", "k804", H, "Basil picked two, but size does not tell us about a life cycle. So only Pip scores a point.", {"pre": .3}),
 *cut("basiloops", [("say", "k805b", B, "Oops! I compared their sizes. Next time, I will count the stages, like Pip.", {"pre": .2, "post": .1})]),
 ("say", "k806", H, "We can see the stages, and count them. They are observable characteristics.", {"pre": .3, "term": ["observable characteristics"], "kw": [["kw_observable_characteristics", "observable"]]}),
 HOLD("kw_observable_characteristics"),
 ("say", "k807p", P, "Observable means we can see it, or count it. The number of stages is one. What the young looks like is another!", {"pre": .2}),
 ("scene", "mark1"),
 ("say", "k901", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "k902", P, "The life cycles of the frog and the mosquito are similar because the young do not look like the adults. However, the life cycles are different because the frog has three stages in its life cycle, while the mosquito has four stages in its life cycle.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · HOLD ON! Pip compares the frog and the grasshopper by the number of stages only (the same!); Basil fixes it
 ("scene", "holdon"),
 ("say", "k1001p", P, "My turn! The frog and the grasshopper both have three stages. So their life cycles are exactly the same!", {"pre": .5, "post": .2, "kw": [["pipboard", "frog"]]}),
 ("say", "k1002", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "k1003", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "k1004b", B, "The number of stages is the same, but you forgot to look at the young!", {"pre": .3, "post": .2}),
 # ---- 11 · [LOOK CLOSER] the young beside the adults: the tadpole and the frog; the nymph and the grasshopper; Momo and Basil teach the
 #           difference; the verdict; Mark Sentence 2 (Momo): 5.12, the first sentence (how to compare, for any two life cycles)
 ("scene", "lcyoung"),
 ("say", "k1101", H, "Look closer at the young, beside their parents.", {**LC, "pre": 1.2}),
 ("say", "k1102m", M, "The tadpole has a tail and no legs, and it lives in water. It looks nothing like a frog!", {"pre": .1, "kw": [["tad", "tadpole"]]}),
 ("say", "k1103b", B, "But the nymph has six legs and two feelers, just like a grasshopper. It only has no wings yet!", {"pre": .2, "kw": [["nymph", "nymph"]]}),
 *cut("pipoops", [("say", "k1105p", P, "Oops! I only looked at one thing. I need to look at the young too.", {"pre": .2})]),
 ("say", "k1104", H, "One thing is the same, and one thing is different. Always look at both!", {**LC, "pre": .3, "kw": [["same3", "same"], ["diff3", "different"]]}),
 *VERDICT("v_young"),
 ("scene", "mark2"),
 ("say", "k1106", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "k1107", M, "When we compare, we can use observable characteristics to identify similarities and differences between the life cycles of the animals.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 12 · score hand, the cicada (and its fun fact), the key words
 ("scene", "final"),
 ("say", "k1201", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "k1202", H, "Did you spot the cicada? It was on the leg of our board's easel!", {"pre": .6, "post": .2}),
 ("say", "k1203b", B, "Here is a fun fact! Cicadas have three stages, like grasshoppers. But in America, some cicada nymphs live underground for seventeen years!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_three", "three"], ["ff_under", "underground"], ["ff_17", "seventeen"]]}),
 ("say", "k1204", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Similarities", "Differences", "Observable characteristics"]),
 # ---- 13 · the cliffhanger: the hen from EP16, sitting on her nest under a bush by the garden
 ("scene", "cliff"), ("wait", .3),
 ("say", "k1301b", B, "Look, the hen is sitting on her eggs! So which came first, the chicken or the egg?", {"pre": .3, "kw": [["hen", "hen"], ["nest", "eggs"]]}),
 ("say", "k1302", H, "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "mosquito has four" and "Basil"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "d101", H, "Last time, we compared the frog and the mosquito. In both, the young look nothing like the adult, but the frog has three stages, and the mosquito has four. Then Basil asked a tricky question!", {"pre": .4, "post": 1.0, "gap": .7, "kw": [["pic2", "frog", 1], ["pic3", "basil"]]}),
 # ---- 2 · the garden's edge by the void deck: the hen on her nest; the game and the hidden honeybee
 ("scene", "place"), ("mark", "henIn"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "d201a", H, "A little honeybee is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "d201b", B, "Bees fly from flower to flower. Look for a fuzzy, striped body!", {"pre": .3, "post": .2}),
 ("say", "d201c", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads)
 ("scene", "goals"), ("say", "d301", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "d302", B, "No first or last stage.", {"pre": .3, "post": .3}),
 ("say", "d303", B, "Same stages, still different.", {"pre": .3, "post": .3}), ("say", "d304", B, "Why life cycles matter.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: Basil's tricky question. Which came first? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "d401", H, "Round one. Which came first? One, the egg. Two, the chicken. Three, neither: it goes round and round. Show me with your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "d402", H, "Locked in!", {"pre": 0}),
 ("say", "d403", B, "One, the egg! The egg is always the first word when we say the stages.", {"pre": .5}),
 ("say", "d404", P, "Three. Every egg came from a hen, and every hen came from an egg. It just goes round.", {"pre": .4}),
 ("say", "d405", M, "Three! A loop goes round and round, so nothing comes first.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · BE AN EGG (the journey; the buddies ride along, tucked in the nest's straw): egg, chick, hen, a new egg, round again
 ("scene", "waitw"),
 ("say", "d601", H, "Be an egg! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jegg"),
 ("say", "d602", H, "You are an egg, warm under the mother hen. Days go by. Crack! You hatch. You are a fluffy chick.", {**SLOW, "pre": 0, "post": .8, "kw": [["jhatch", "crack"], ["jchick", "chick"]]}),
 ("say", "d603", H, "You eat, and you grow, and your feathers grow. Weeks go by. You are an adult hen.", {**SLOW, "pre": .2, "post": .8, "kw": [["jhen", "adult"]]}),
 ("say", "d604", H, "One morning, you lay an egg of your own. It hatches into a chick, and round it goes again.", {**SLOW, "pre": .2, "post": .8, "kw": [["jlay", "lay"], ["jagain", "round"]]}),
 ("say", "d605", H, "So where did it start? You joined in at the egg, but you could have joined anywhere.", {**SLOW, "pre": .2}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (Pip and Momo, who were right, explained it in their picks); Basil fixes his own idea
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "eggans"),
 ("say", "d406", H, "The answer is three: neither! Three fingers? One finger up!", {"pre": .4, "kw": [["ansglow", "three", 0], ["coin1", "one"]]}),
 *cut("eggoops", [("say", "d407b", B, "Oops! We say the egg first, but that does not make it the first stage.", {"pre": .2, "post": .2})]),
 # ---- 7 · [LOOK CLOSER] the loop: a finger can start anywhere; the day-and-night loop (EP14) turns beside it; REPEATED and NO FIRST OR
 #          LAST STAGE pop; Pip teaches; Mark Sentence 1 (Basil): 5.16
 ("scene", "lcloop"),
 ("say", "d701", H, "Look closer. Put your finger anywhere on the loop, and follow the arrows round. You always come back.", {**LC, "pre": 1.2, "kw": [["finger", "finger"]]}),
 ("say", "d702m", M, "It is like day and night! Which comes first? Neither. They just keep going round.", {"pre": .2, "kw": [["daynight", "day"]]}),
 ("say", "d703", H, "The stages in a life cycle are repeated. So there is no first or last stage.", {**LC, "pre": .3, "term": ["repeated", "no first or last stage"], "kw": [["kw_repeated", "repeated"], ["kw_no_first_or_last_stage", "first"]]}),
 HOLD("kw_no_first_or_last_stage"),
 ("say", "d704p", P, "Repeated means it happens again and again. So we never put numbers on the stages, because none of them is first!", {"pre": .2}),
 *VERDICT("v_loop"),
 ("scene", "mark1"),
 ("say", "d705", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "d706", B, "The stages in a life cycle are repeated. There is no first or last stage.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · Showdown: Momo's homework, the mosquito and the mealworm beetle (double points); the fix
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "d801", H, "Showdown! Double points. Momo's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "d802m", M, "My homework! One: in both, the young do not look like the adult. Two: the mosquito larva lives near the water surface, but the beetle larva lives on land. Three: the mosquito has four stages, but the beetle has three.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "d803", H, "Locked in!", {"pre": 0}),
 ("say", "d804b", B, "Three! The mealworm turns into a pupa before it becomes a beetle. So the beetle has four stages too!", {"pre": .5}),
 *cut("pipshow", [("say", "d805p", P, "Three. Both have the egg, the larva, the pupa and the adult.", {"pre": .4, "post": .2})]),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .5), ("mark", "rewrite"), ("wait", .6),
 ("say", "d806", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 9 · Momo's question (why she missed it); [LOOK CLOSER] the beetle's loop and the mosquito's: four and four; the two larvae side by
 #          side; PHYSICAL FEATURES pops; Basil teaches it; Mark Sentence 2 (Pip): 5.12, the second sentence
 ("scene", "beetle"),
 ("say", "d901m", M, "Oops! The beetle's pupa lies so still that I forgot to count it. So how are they different?", {"pre": .5}),
 ("scene", "lcbeetle"),
 ("say", "d902", H, "Look closer. The stages are the same, so now we compare their physical features.", {**LC, "pre": 1.2, "term": ["physical features"], "kw": [["pupa", "stages"], ["kw_physical_features", "physical"]]}),
 HOLD("kw_physical_features"),
 ("say", "d904b", B, "Physical features are the parts we can see. The wriggler is thin, and hangs at the water surface. The mealworm is golden and hard, and crawls on land!", {"pre": .2, "kw": [["wrig", "wriggler"], ["meal", "mealworm"]]}),
 *VERDICT("v_beetle"),
 ("scene", "mark2"),
 ("say", "d905", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "d906", P, "Observable characteristics include the number of stages and the physical features of the animals.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · why do life cycles matter? (the Cycles theme closes) The butterfly from EP17 lays an egg on the lime plant; the book's 5.17 and
 #           5.17a on strips; the CYCLES board answers the theme's three questions (on screen)
 ("scene", "closure"),
 ("say", "d1001", H, "Why do life cycles matter? Look! The butterfly from last time is laying an egg on the lime plant.", {"pre": .5, "kw": [["butterfly", "butterfly"], ["lay", "laying"]]}),
 *cut("feet", [("say", "d1002b", B, "She tastes the leaf with her feet first, to check that it is the right plant!", {"pre": .2, "kw": [["feet", "feet"]]})]),
 ("say", "d1003", H, "Life cycles ensure that living things of the same kind can continue to live on Earth.", {"pre": .3, "hold": STRIP}),
 *cut("noplants", [("say", "d1004m", M, "But what if there were no lime plants for her eggs?", {"pre": .3})]),
 *(cut("fewer", [("say", "d1005", H, "When there are not enough plants for butterflies to lay their eggs on, there will be fewer larvae. This will result in fewer pupae and adult butterflies.", {"pre": .3, "hold": STRIP, "pron": LARVAE, "kw": [["fewer", "fewer"]]})]) or []),
 ("say", "d1006m", M, "With too few lime plants, there would be fewer larvae, fewer pupae and fewer butterflies. So we plant more, and the cycle keeps going!", {"pre": .2, "pron": LARVAE, "kw": [["fewer", "fewer"], ["plant", "plant"]]}),
 *cut("gardens", [("say", "d1007b", B, "That is why some schools and parks in Singapore plant butterfly gardens!", {"pre": .2})]),
 ("mark", "theme"), ("wait", 1.5),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand, the honeybee (and its fun fact)
 ("scene", "final"),
 ("say", "d1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "d1202", H, "Did you spot the honeybee? It was on a flower of the lime plant!", {"pre": .5, "post": .2}),
 ("say", "d1203p", P, "Here is a fun fact! A queen honeybee can lay more than a thousand eggs in a single day. That keeps the bees' life cycle going!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_queen", "queen"], ["ff_eggs", "thousand"]]}),
 ("say", "d1204", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 13 · the dare for Episode 19 (the void deck board: Basil's magnet holds a card on the metal frame; a steel pin and a copper wire)
 ("scene", "dare"),
 ("mark", "dareIn"), ("wait", .5),
 ("say", "d1301", H, NEXT_DARE, {"pre": 0}),
 *cut("nextjoke", [("say", "d1302", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Repeated", "No first or last stage", "Physical features"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP17, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
