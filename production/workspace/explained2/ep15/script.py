"""script.py: P3 EP15 "One mango seed to a tree full of mangoes: 3 stages" (Ch 4, Life Cycles of Plants, pp. 76-79; 5.16 from p. 93),
Part 1 ("We Planted a Mango SEED. What Grows FIRST?") and Part 2 ("The Mango or the Seed: Which Came FIRST?"): the script
(../p3_ep15_script.md, version 1 of 22 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 22 Nov: 1c the learner's seat, 1d big
buddies who teach, 4 the hidden animal moving + a fun fact at the reveal, 5 full human sentences, 6 talking = a moving mouth and reactions
follow the answer) as data. Every spoken line is word for word as in the script. make_voice.py records the lines; build_tl.py lays them
on the timeline.

The dare that opens Part 1 is EP14's closing dare ({NEXT_DARE} of ../ep14/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention for EP13's dare): DARE_Q1 + DARE_Q2 == that text. The dare into EP16 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW TERM (opts "term")
is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold 2.5 s after the
buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences, softer. LOOK CLOSER
(LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP14): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: boardsIn, budsIn, cutmango (cold open: the adult's knife lifts the big seed out), title; potin (the seed goes into the pot),
  soilpat (the hands pat the soil), water (a little water from the can); lcobserve: journal (the journal opens at Day 1), look / touch /
  smell (the three sense icons light, each AT the buddy's word), write (the pencil writes Day 1's line); lcseed: d1 (Day 1, the window in
  the pot: the seed in the soil), d10 / root (the root pokes out and grows down), d20 / shoot (the hooked shoot pushes up), d30 / leaves
  (two reddish leaves open), d45 / green (the leaves turn green), oldseed (a label line to the old seed at the base); the journey (dive,
  jseed, jswell, jroot, jshoot, jlight, jleaves, jyoung); rulerin (the ruler comes in), rtable / r20 (Basil's ruler on the table: 20 cm),
  rzero / rsoil (zero on the soil), r12 (12 cm); q, treein (the cliffhanger).
  Part 2: pic1 / pic2 / pic3 (recap); potdown (an adult carries our pot into the garden); lcadult: pairin, stem, trunk, flowers, tips,
  tagadult; the journey (dive, jflower, jbreeze, jpetals, jgreen, jbig, jseed, jripe, jnew); cutfruit (an adult's knife cuts a ripe mango:
  the seed inside); tseed / tyoung / tadult / tback (the board's tiles hop onto the loop; the last arrow back to the seed); l1 / l2 / l3
  (Momo's lines light), strike, bend (line 3 struck through, rewritten in green; its drawing bends from a row into a loop); lcbank:
  bankin, dry, jars, cold, again; pond (Momo points at the tadpoles), dareIn.

CUTS (script section 6, non-teaching, in order). Put a tag in CUTS to drop that beat, then rebuild the timeline.
  Part 1: title2 (the title's second slam hold), taste (g609p Pip's tasting rule: the small print stays), mangooops (g810m), sameway
  (g1206 Heart), handsome12 (g1205b Basil: his oops pose carries it; cut a Pip or Momo line with it).
  Part 2: pipoops (j509p), soybean (j808p), momooops (j908m), busloop (j805b), pond (j1300m), nextjoke (j1302).
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip, a buddy's explanation of a key word.
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"title2"}
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP14's dare into EP15 (../ep14/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP14_NEXT = "Next time: a mango! Inside it, there is one big seed. We plant the seed. What will it grow into first? One, a mango. Two, a flower. Three, a young plant. Lock in your answer!"
DARE_Q1, DARE_Q2 = "A mango! Inside it, there is one big seed. We plant the seed. What will it grow into first?", "One, a mango. Two, a flower. Three, a young plant."
assert "Next time: a mango! " + DARE_Q1[len("A mango! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP14_NEXT
DARE_CARDS = ["A mango", "A flower", "A young plant"]
DARE_LABEL = "What will the seed grow into first?"
DARE_SHORT = "What will the mango seed grow into first?"
DARE_CLUES = ["one big seed", "we plant it"]
# Block B: the dare into EP16 (plan row 16, "A chick looks like a hen. A tadpole doesn't look like a frog!")
NEXT_DARE = "Next time: a tadpole! It lives in water, and it has a tail. What will it grow into? One, a fish. Two, a frog. Three, a lizard. Lock in your answer!"
NEXT_CARDS = ["A fish", "A frog", "A lizard"]
NEXT_JOKE = "I hope it is three. The world needs more handsome lizards!"

# the chant (Part 2): call and response (EP7 / EP14 form), YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Seed, young plant!", "Adult plant!"), ("Flowers, fruits!", "Seeds inside!"), ("No first, no last!", "Round and round!")]
CHANT_CAPS = ([1.15, 1.05, 1.15], [1.1, 1.1, 1.25])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
Y2019 = {"2019": "twenty nineteen"}

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w)
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True})]
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
 # ---- 1 · silent cold open: an HDB kitchen, morning. A ripe mango on the board; an adult's knife lifts out the ONE big flat seed;
 #          EP14's three mango dare boards slide in low; the buddies pop in
 ("scene", "cold"), ("wait", 1.6), ("mark", "cutmango"), ("wait", 1.0), ("mark", "boardsIn"), ("wait", 1.6), ("mark", "budsIn"), ("wait", 1.8),
 # ---- 2 · "Last time...": EP14's dare, word for word (one calm picture: each board steps forward as Heart says its card), then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "g202", H, DARE_Q1, {"pre": .3}),
 ("say", "g203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "g204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "title2" in CUTS else 2.2),
 # ---- 3 · the game, and the hidden snail (named first; ONE smooth push-in from the kitchen onto the snail on the window ledge)
 ("scene", "game"),
 ("say", "g301a", H, "A little snail is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "g301b", B, "Snails love cool, damp places. It hides somewhere new each time, so look under the leaves!", {"pre": .3, "post": .1}),
 ("say", "g301r", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Momo reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", M, "Observing like a scientist.", {"pre": .3, "post": .3}),
 ("say", "g403", M, "What grows from a seed.", {"pre": .3, "post": .3}), ("say", "g404", M, "Measuring a plant.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP14's dare (a short 3 s ring: the answer was locked in at the end of EP14)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "g502", H, "Locked in!", {"pre": 0}),
 ("say", "g503", M, "One! A mango seed grows into a mango, of course!", {"pre": .5}),
 ("say", "g504", P, "Two. I think a pretty flower comes out first, and then the mango.", {"pre": .4}),
 ("say", "g505", B, "Three! Every big tree starts small, so I think it grows into a young plant first!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · how will we know? We plant the seed on the corridor ledge (an adult's hands; a little water)
 ("scene", "plant"),
 ("say", "g601m", M, "But a seed grows so slowly. How will we ever know what comes first?", {"pre": .5}),
 ("say", "g601", H, "We plant it, and we watch it like a scientist.", {"pre": .3, "kw": [["potin", "plant"], ["soilpat", "watch"]]}),
 ("wait", .4), ("mark", "water"), ("wait", .8),
 # ---- 7 · [LOOK CLOSER] observing like a scientist: Day 1 in the journal, the seed looked at, touched, smelt (OBSERVING pops)
 ("scene", "lcobserve"),
 ("say", "g602m", M, "I know! I will look at it once now, and once more when it is a big tree.", {"pre": 1.2, "kw": [["journal", "look", 0]]}),
 ("say", "g603p", P, "But then we will miss all the changes in between, Momo!", {"pre": .3}),
 ("say", "g604", H, "Look closer. A scientist observes again and again, and writes down what the senses tell us.", {**LC, "pre": .3}),
 ("say", "g605b", B, "I look at it. Our seed is brown, big and flat.", {"pre": .1, "kw": [["look", "look"]]}),
 ("say", "g606p", P, "I touch it gently. It feels hard, and a little bit hairy.", {"pre": .2, "kw": [["touch", "touch"]]}),
 ("say", "g607m", M, "And I smell it. It still smells of mango!", {"pre": .2, "kw": [["smell", "smell"]]}),
 ("say", "g608", H, "We use our senses, and we write it down every time. This is called observing.", {**LC, "pre": .3, "term": ["observing"], "kw": [["write", "write"], ["kw_observing", "observing"]]}),
 HOLD("kw_observing"),
 ("say", "g609b", B, "Observing means looking, touching and smelling carefully, again and again, like a plant detective!", {"pre": .2}),
 *cut("taste", [("say", "g609p", P, "We do not taste it, though. We only taste food that an adult says is safe.", {"pre": .3})]),
 *VERDICT("v_observe"),
 # ---- 8 · Mark Sentence 1 (Basil): 4.3, first sentence
 ("scene", "mark1"),
 ("say", "g701", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g702", B, "We can use our five senses to gather information about the life cycles of plants.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 9 · [LOOK CLOSER] the seed, day after day: a window in the pot (speeded up): root first, then the shoot, then red leaves (SEED pops)
 ("scene", "lcseed"), ("mark", "d1"),
 ("say", "g801", H, "Look closer. Here is our seed, under the soil. We made a window in the pot, so we can see it.", {**LC, "pre": 1.3, "term": ["seed"], "kw": [["kw_seed", "seed", 0]]}),
 HOLD("kw_seed"),
 ("say", "g802b", B, "Day ten! A tiny root pokes out first, and it grows down, down, down.", {"pre": .1, "kw": [["d10", "ten"], ["root", "root"]]}),
 ("wait", .3),
 ("say", "g803p", P, "Day twenty. Now a shoot pushes up, bent like a hook, towards the light.", {"pre": .1, "kw": [["d20", "twenty"], ["shoot", "shoot"]]}),
 ("wait", .3),
 ("say", "g804m", M, "Day thirty. Two leaves open! But they are red, not green. Is it sick?", {"pre": .1, "kw": [["d30", "thirty"], ["leaves", "leaves"]]}),
 ("say", "g805", H, "It is not sick. New mango leaves are red at first. Watch them turn green.", {**LC, "pre": .3, "kw": [["d45", "watch"], ["green", "green"]]}),
 ("wait", .6),
 ("say", "g806b", B, "And look! The old seed is still there, at the bottom of the stem, like a lunch box for the young plant!", {"pre": .1, "kw": [["oldseed", "seed"]]}),
 *VERDICT("v_seed"),
 ("scene", "seedans"),
 ("say", "g807", H, "The answer is three: a young plant! Three fingers? One finger up!", {"pre": .5, "kw": [["ansglow", "three", 0], ["coin1", "one"]]}),
 ("say", "g808", H, "A plant with a thin stem and a few leaves is called a young plant.", {"pre": .4, "term": ["young plant"], "kw": [["kw_young_plant", "young"]]}),
 HOLD("kw_young_plant"),
 ("say", "g809b", B, "A young plant is like a baby tree. It has no flowers and no fruits yet!", {"pre": .2}),
 *cut("mangooops", [("say", "g810m", M, "Oops! So the mango does not come first.", {"pre": .3, "post": .1})]),
 # ---- 10 · BE THE MANGO SEED (the first-person journey; the buddies ride along, shrunk)
 ("scene", "waitw"),
 ("say", "g901", H, "Be the mango seed! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jseed"),
 ("say", "g902", H, "You are a mango seed, under the soil. It is dark, cool and quiet.", {**SLOW, "pre": 0, "post": .8}),
 ("say", "g903", H, "Days go by. You swell, and a tiny root pushes out of you, and grows down.", {**SLOW, "pre": .2, "post": .8, "kw": [["jswell", "swell"], ["jroot", "root"]]}),
 ("say", "g904", H, "Then a shoot pushes up, up, up, through the soil, into the light!", {**SLOW, "pre": .2, "post": .8, "kw": [["jshoot", "shoot"], ["jlight", "light"]]}),
 ("say", "g905", H, "Your first leaves open, soft and red. You are a young plant now!", {**SLOW, "pre": .2, "kw": [["jleaves", "leaves"], ["jyoung", "young"]]}),
 ("wait", 1.0),
 # ---- 11 · pull back out to the corridor; Mark Sentence 2 (Momo): 4.4, first caption
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "mark2"),
 ("say", "g1001", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1002", M, "The seed grew into a young plant.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 12 · measuring a plant: Pip's ruler and the book's strip (4.3, second sentence)
 ("scene", "measure"),
 ("say", "g1101p", P, "Our young plant grows taller every week. Let's measure it with a ruler!", {"pre": .5, "kw": [["rulerin", "ruler"]]}),
 ("scene", "strip"),
 ("say", "g1102", H, "We can use simple tools, such as a ruler, to help us measure the height of plants.", {"pre": .5, "hold": STRIP, "post": .2}),
 # ---- 13 · HOLD ON! Basil measures from the table (a bad way to measure: the child crosses their arms)
 ("scene", "holdon"),
 ("say", "g1201", B, "My turn! I put the ruler on the table, under the pot. Our plant is twenty centimetres tall!", {"pre": .5, "post": .2, "kw": [["rtable", "table"], ["r20", "twenty"]]}),
 ("say", "g1202", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "g1203", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "g1204p", P, "The pot is not part of the plant. Put the zero of the ruler on the soil, where the stem comes out.", {"pre": .3, "post": .2, "kw": [["rzero", "zero"], ["rsoil", "soil"]]}),
 *cut("handsome12", [("say", "g1205b", B, "Oops! So our young plant is really twelve centimetres tall. Still very handsome!", {"pre": .3, "post": .2, "kw": [["r12", "twelve"]]})]),
 *cut("sameway", [("say", "g1206", H, "Yes! Measure from the soil, the same way every time, and write it down.", {"pre": .3, "post": .2})]),
 # ---- 14 · score hand, the snail (and its fun fact), the key words
 ("scene", "final"),
 ("say", "g1301", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "g1302", H, "Did you spot the snail? It was on the rim of our plant pot!", {"pre": .6, "post": .2}),
 ("say", "g1303", P, "Here is a fun fact! A snail has thousands of tiny teeth on its tongue. It scrapes up soft young leaves, so gardeners keep an eye on their young plants!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_teeth", "teeth"], ["ff_leaf", "leaves"]]}),
 ("say", "g1304", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Observing", "Seed", "Young plant"]),
 # ---- 15 · the cliffhanger: will our young plant ever grow mangoes?
 ("scene", "cliff"), ("wait", .3),
 ("say", "g1501", M, "Our young plant has no flowers and no mangoes yet. Will it ever grow mangoes?", {"pre": .3, "kw": [["q", "mangoes", 1]]}),
 ("say", "g1502", H, "Good question, Momo! The big old mango tree downstairs will show us.", {"pre": .3, "kw": [["treein", "tree"]]}),
 ("say", "g1503", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 16 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "observed" and "grew"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "j101", H, "Last time, we planted a mango seed, and we observed it like a scientist. It grew into a young plant. But will our young plant ever grow mangoes?", {"pre": .4, "post": 1.6, "gap": .75, "kw": [["pic2", "observed"], ["pic3", "grew"]]}),
 # ---- 2 · the community garden beside the block; the old mango tree; an adult carries our pot down; the game and the hidden weaver ant
 ("scene", "place"), ("mark", "potdown"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201a", H, "A little weaver ant is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "j201b", M, "It is very small, and it hides somewhere new each time. Look along the leaves and the branches!", {"pre": .3, "post": .2}),
 ("say", "j201c", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Pip reads the three cards; "3" said "three")
 ("scene", "goals"), ("say", "j301", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", P, "The 3 plant stages.", {"pre": .3, "post": .3, "pron": {"3": "three"}}),
 ("say", "j303", P, "No first or last stage.", {"pre": .3, "post": .3}), ("say", "j304", P, "Why seeds are saved.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the old tree is covered in tiny flowers. Which stage? (ring 6 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j401", H, "Round one. This old mango tree grew from a seed, many years ago. Now it is covered in tiny flowers. Which stage is it in? One, the seed. Two, the young plant. Three, the adult plant. Show me with your fingers.", {"pre": .3}),
 *LOCK("r1", 6.0),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", P, "Two. It still grows new leaves, so I think it is a young plant.", {"pre": .5}),
 ("say", "j404", B, "Three! Our young plant has no flowers, but this tree does. So it is an adult plant!", {"pre": .4}),
 ("say", "j405", M, "Three! A plant with flowers must be all grown up.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] our young plant beside the old tree; the book's strip (4.4, captions 2 and 3); ADULT PLANT pops
 ("scene", "lcadult"),
 ("say", "j501", H, "Look closer. Here is our young plant, beside the old tree.", {**LC, "pre": 1.2, "kw": [["pairin", "young"]]}),
 ("say", "j502m", M, "Our young plant has a thin stem and only a few leaves.", {"pre": .1, "kw": [["stem", "stem"]]}),
 ("say", "j503b", B, "And the old tree has a thick trunk, hundreds of leaves, and lots of tiny flowers!", {"pre": .2, "kw": [["trunk", "trunk"], ["flowers", "flowers"]]}),
 ("say", "j504p", P, "But look at the tips. The old tree has new red leaves too, so it is still growing.", {"pre": .2, "kw": [["tips", "tips"]]}),
 ("say", "j505", H, "Adult plants keep growing too. But only the adult plant has flowers and fruits.", {**LC, "pre": .3, "kw": [["tagadult", "only"]]}),
 ("say", "j506", H, "The young plant grew into an adult plant. The adult plant started to have flowers and fruits.", {**LC, "pre": .4, "hold": STRIP, "term": ["adult plant"], "kw": [["kw_adult_plant", "adult", 0]]}),
 HOLD("kw_adult_plant"),
 ("say", "j507b", B, "An adult plant is a grown-up plant. It is ready to have flowers and fruits!", {"pre": .2}),
 *VERDICT("v_adult"),
 ("scene", "adultans"),
 ("say", "j508", H, "The answer is three: the adult plant! Three fingers? One finger up!", {"pre": .5, "post": .2, "kw": [["ansglow", "three", 0], ["coin1", "one"]]}),
 *cut("pipoops", [("say", "j509p", P, "Oops! I picked two. Growing new leaves does not make it a young plant.", {"pre": .3, "post": .1})]),
 # ---- 6 · where do new seeds come from? Basil's guess (the roots); then BE A MANGO FLOWER (the journey: flower, fruit, seed inside)
 ("scene", "seeds"),
 ("say", "j601m", M, "But where do new mango seeds come from?", {"pre": .5}),
 ("say", "j602b", B, "From the roots! The tree pushes them out, under the ground.", {"pre": .3}),
 ("scene", "waitw"),
 ("say", "j603", H, "Let's find out. Be a mango flower! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jflower"),
 ("say", "j701", H, "You are a tiny flower on the big mango tree. A warm breeze shakes your branch.", {**SLOW, "pre": 0, "post": .8, "kw": [["jbreeze", "breeze"]]}),
 ("say", "j702", H, "Your petals fall, and you start to grow into a tiny green mango.", {**SLOW, "pre": .2, "post": .8, "kw": [["jpetals", "petals"], ["jgreen", "green"]]}),
 ("say", "j703", H, "Week after week, you grow bigger and heavier. Inside you, a seed grows, big and flat.", {**SLOW, "pre": .2, "post": .8, "kw": [["jbig", "bigger"], ["jseed", "seed"]]}),
 ("say", "j704", H, "You turn yellow and sweet. You are a ripe mango, with a new seed inside!", {**SLOW, "pre": .2, "kw": [["jripe", "yellow"], ["jnew", "new"]]}),
 ("wait", 1.0),
 # ---- 7 · pull back out; an adult's knife cuts a ripe mango: the seed inside; the board OUR MANGO'S LIFE CYCLE closes (THREE STAGES)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "fruitcut"), ("mark", "cutfruit"), ("wait", .6),
 ("say", "j801b", B, "Oops! The new seeds grow inside the fruits, not in the roots!", {"pre": .2}),
 ("say", "j802m", M, "And each new seed can grow into a new young plant. Round and round it goes!", {"pre": .2}),
 ("scene", "ring"),
 ("say", "j803p", P, "Let me put them on our board. The seed, then the young plant, then the adult plant, and its fruits bring new seeds.", {"pre": .5, "kw": [["tseed", "seed", 0], ["tyoung", "young"], ["tadult", "adult"], ["tback", "seeds"]]}),
 ("say", "j804", H, "So a plant's life cycle goes round and round, and it has three stages.", {"pre": .3, "term": ["three stages"], "kw": [["kw_three_stages", "three"]]}),
 HOLD("kw_three_stages"),
 *cut("busloop", [("say", "j805b", B, "Three stages, like three stops on a bus loop. The bus just keeps going round and round!", {"pre": .2})]),
 ("scene", "mark1"),
 ("say", "j806", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j807", B, "There are three stages in the life cycle of a plant. The stages are the seed, the young plant and the adult plant.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 *cut("soybean", [("say", "j808p", P, "My soybean plant at school has the same three stages. Its adult plant has pods full of soybeans!", {"pre": .2, "post": .2})]),
 # ---- 8 · Showdown: Momo's homework (double points); the fix: the book's strip 5.16
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j901", H, "Showdown! Double points. Momo's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("say", "j902", M, "Here is my homework! One: the seed grows into a young plant. Two: the young plant grows into an adult plant. Three: the adult plant is the last stage, and the cycle ends.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 6.0),
 ("say", "j903", H, "Locked in!", {"pre": 0}),
 ("say", "j904", B, "Three! The adult plant has fruits with new seeds, so round it goes again!", {"pre": .5}),
 ("say", "j905p", P, "Three. A life cycle goes round and round, so there is no last stage.", {"pre": .4, "post": .2}),
 ("scene", "fix"), ("wait", .3), ("mark", "strike"), ("wait", .5), ("mark", "bend"), ("wait", .6),
 ("say", "j906", H, "The stages in a life cycle are repeated. There is no first or last stage.", {"pre": .2, "hold": STRIP, "post": .2}),
 ("say", "j907", H, "Three fingers? Put up two more on your score hand!", {"pre": .2, "post": .3, "kw": [["coin2", "two"]]}),
 *cut("momooops", [("say", "j908m", M, "Oops! My cycle forgot the seeds inside the fruits!", {"pre": .3, "post": .2})]),
 # ---- 9 · why seeds are saved: Momo's question, Basil's guess; [LOOK CLOSER] Singapore's seed bank (SEED BANK pops); Mark Sentence 2 (Momo, 4.7)
 ("scene", "nomore"),
 ("say", "j1001m", M, "But what if a kind of plant had no more seeds at all?", {"pre": .5}),
 ("say", "j1002b", B, "Easy! Then we just buy more seeds at the shop!", {"pre": .3}),
 ("say", "j1004", H, "Life cycles repeat to ensure that living things continue to live. Without seeds, there are no new young plants, so that kind of plant could disappear.", {"pre": .4}),
 ("scene", "lcbank"),
 ("say", "j1005", H, "Look closer. In 2019, Singapore opened its first seed bank, at the Botanic Gardens.", {**LC, "pre": 1.3, "pron": Y2019, "term": ["seed bank"], "kw": [["bankin", "singapore"], ["kw_seed_bank", "seed"]]}),
 HOLD("kw_seed_bank"),
 ("say", "j1006p", P, "Scientists dry the seeds, and they keep them in jars with labels.", {"pre": .1, "kw": [["dry", "dry"], ["jars", "jars"]]}),
 ("say", "j1007b", B, "Then the jars go into a very cold room, like a giant freezer, so the seeds can wait for many years!", {"pre": .2, "kw": [["cold", "cold"]]}),
 ("say", "j1008m", M, "So if a plant is ever in trouble, its seeds are safe, ready to grow it again!", {"pre": .2, "kw": [["again", "again"]]}),
 *VERDICT("v_bank"),
 ("scene", "mark2"),
 ("say", "j1101", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j1102", M, "A seed bank stores seeds safely until they are needed.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the weaver ant (and its fun fact)
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1202", H, "Did you spot the weaver ant? It was on a leaf of the old mango tree!", {"pre": .5, "post": .2}),
 ("say", "j1203", B, "Here is a fun fact! Weaver ants sew leaves together to make their nest, and the sticky thread comes from their own babies! Some mango farmers even keep them as guards, to chase away insects that eat the mangoes.", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_nest", "nest"], ["ff_baby", "babies"], ["ff_guard", "guards"]]}),
 ("say", "j1204", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 12 · the dare for Episode 16 (the garden's little pond: tadpoles)
 ("scene", "dare"),
 *cut("pond", [("say", "j1300m", M, "Look! There are tiny tadpoles in the little pond!", {"pre": .3, "kw": [["pond", "tadpoles"]]})]),
 ("mark", "dareIn"), ("wait", .5),
 ("say", "j1301", H, NEXT_DARE, {"pre": 0}),
 *cut("nextjoke", [("say", "j1302", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Adult plant", "Three stages", "Seed bank"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
