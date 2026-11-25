"""script.py: P3 EP24 "Was that test fair? Change only one thing" (Ch 7, Making and Using Magnets, p. 118: How do we conduct a fair test?
Let's Think and Do: Designing investigations, the variables table; Let's Apply Q1 and Q2(b), pp. 123-124), Part 1 ("Is Basil's Test FAIR?
Change Only ONE Thing") and Part 2 ("Plan It, Test It, Count It AGAIN! Why Scientists Repeat"): the script (../p3_ep24_script.md, version 1 of
25 Nov 2026, Opus; the teacher's 25 Nov go-ahead: "Go ahead with all the rules, build episode 24, 25") as data. Every spoken line is word for
word as in the script's tables (sections 4 and 5). make_voice.py records the lines; build_tl.py lays them on the timeline. Line ids: m...
Part 1, n... Part 2.

The dare that opens Part 1 is EP23's closing dare ({NEXT_DARE} of ../ep23/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's convention): asserted below against ../ep23/script.py itself (NEXT_DARE and NEXT_CARDS). The dare into EP25 is NEXT_DARE.

THE RHYTHM OF EP1-EP10 (teacher, 25 Nov: "I prefer the rhythm and music of episode 1 to 10"; script section 0): about 110 spoken words a
minute (EP1-10 105-117; EP22-23 125-136), a voice about 70% of the time, a 0.6 s pause after most lines (`post` .6, EP1-10's mean), a
"think" wait of 1.0-1.5 s after every question put to the viewer, 5 s rings for every lock-in (6 s for the Showdown; no 3 s ring), scenes of
about 11 s. The music is the ORIGINAL series music (song.js), never Kampong Walk.

Pace (SERIES_FORMAT 3): Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a key word pops large and holds 2.0 s
(HOLD); Mark Sentence cards hold 2.5 s after the buddy's last word; a cream book strip stays up >= 3.5 s. Journeys (SLOW): Heart .85, 1.0 s
between sentences, softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"nextjoke", "momoclips", "sparrowtip", "basilfix"}   # Stage 1 (25 Nov): Part 2 came out at 5:46.8; section 6 "If a part must lose more", in order: sparrowtip, basilfix   # script section 6: in use from the start
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
EP23_NEXT = "Next time: Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair? One, yes. Two, no. Lock in your answer!"
_ep23 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep23", "script.py")
if os.path.exists(_ep23):
    _src = open(_ep23).read(); _m = re.search(r'^NEXT_DARE = "(.*)"$', _src, re.M)
    assert _m and _m.group(1) == EP23_NEXT, "EP23's NEXT_DARE changed: update Block A"
DARE_Q1 = "Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair?"
DARE_Q2 = "One, yes. Two, no."
assert "Next time: " + DARE_Q1 + " " + DARE_Q2 + " Lock in your answer!" == EP23_NEXT
DARE_CARDS = ["Yes", "No"]
if os.path.exists(_ep23):
    _c = re.search(r'^NEXT_CARDS = (\[.*\])$', _src, re.M)
    assert _c and eval(_c.group(1)) == DARE_CARDS, "EP23's NEXT_CARDS changed: update DARE_CARDS"
DARE_LABEL = "Is Basil's test fair?"
DARE_CLUES = ["iron nail · 25 turns", "steel nail · 8 turns", "one battery each"]
# Block B: the dare into EP25 (plan row 25; 7.12a's fridge sentence); EP25's answer: 2, a strip of magnet
NEXT_DARE = "Next time: Pip pushes his fridge door gently. It swings shut by itself, and stays closed. There is no lock and no catch. What keeps it closed? One, the cold air inside. Two, a strip of magnet. Three, sticky glue. Lock in your answer!"
NEXT_CARDS = ["The cold air inside", "A strip of magnet", "Sticky glue"]
NEXT_JOKE = "My fridge has a lock. It's called my mum!"

# the chant (Part 2): call and response, YOUR TURN! after each line
CHANT = [("Change?", "Only one thing!"), ("The others?", "Kept the same!"), ("Test it once?", "No! Repeat it!")]
CHANT_CAPS = ([1.0, 1.1, 1.15], [1.4, 1.4, 1.5])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
STRIP = 3.5
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
THINK = ("wait", 1.2)   # EP1-10's rhythm: time for the viewer to think after a question
# the book's sentences (definitions file rows 7.8a to 7.12; read exactly as printed; 7.9's brackets read as a pause, written as commas)
M78A = "When scientists plan and conduct an experiment, they answer a question or test a prediction."                       # 7.8a (Part 1 Mark Sentence 2)
M79 = "To conduct a fair test, scientists need to ensure that only one thing, called a variable, is changed. The other variables are kept the same."   # 7.9 (Part 1 Mark Sentence 1)
M710 = "If the experiment is not fair, we will not be sure which variable can explain the results."                          # 7.10 (Part 1 strip)
M711 = "It is also important to repeat the experiment a few times to ensure that the results are reliable."                  # 7.11 (Part 2 Mark Sentence 2)
M712P = "When we increase the number of batteries, the strength of the electromagnet will increase."                         # 7.12 prediction (Part 2 Mark Sentence 1)

def kwrecap(words, pron=None):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w); o = {"pron": pron} if pron and any(x in w for x in pron) else {}
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0, **o}), ("unison", "uk_" + k, w + ".", {"pre": .3, "post": .45, "quiet": True, **o})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 5.2)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .5}), ("wait", .8), ("chant", "c1003"), ("wait", .5)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .90})]
LOCK = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .6)]

SEQ1 = [
 # ---- 1 · the cold open, SPEAKING from 0.8 s: the school science room, Tuesday after school. Basil's two coiled nails (an iron nail with
 #          25 turns, a steel nail with 8) dip into two trays of clips (dip0, on "steel nail"); the dare cards come in at "Is"
 ("scene", "cold"), ("wait", .6),
 ("say", "m101", H, "Last time, we asked:", {"pre": .3}),
 ("say", "m102", H, DARE_Q1, {"pre": .4, "kw": [["dip0", "only"], ["ltIn", "is"]]}),
 ("scene", "lasttime", {"at": "ltIn", "d": -.3}),
 ("say", "m103", H, DARE_Q2, {"pre": .5, "gap": 1.5, "post": 1.9}),
 ("scene", "back"),
 ("say", "m104", H, "Hold on to your answer!", {"pre": .4, "post": .4}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.8),
 # ---- 2 · today: the best hook for the mini crane; the game and the hidden woodlouse (named first; one push-in onto the INTRO spot)
 ("scene", "today"),
 ("say", "m201b", B, "Our mini crane needs the strongest hook. So I am testing an iron nail and a steel nail!", {"pre": .5, "post": .5, "kw": [["hook", "hook"]]}),
 *cut("momoclips", [("say", "m202m", M, "Your iron nail picked up a lot more clips, Basil!", {"pre": .4, "post": .5, "kw": [["bunch", "clips"]]})]),
 ("scene", "game"),
 ("say", "m204", H, "A little woodlouse is hiding in this video. Can you spot it?", {"pre": .4, "post": .5}),
 *cut("lousetip", [("say", "m205p", P, "Woodlice love dark, damp corners. Look low!", {"pre": .3, "post": .3})]),
 ("say", "m206", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .4, "post": .5}),
 # ---- 3 · today's goals (Momo reads) and the countdown
 ("scene", "goals"), ("say", "m301m", M, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m302m", M, "What an experiment does.", {"pre": .3, "post": .4}),
 ("say", "m303m", M, "What a fair test is.", {"pre": .3, "post": .4}), ("say", "m304m", M, "How to spot an unfair test.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 4 · Round 1: EP23's dare (a 5 s ring, as EP1-10)
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "m401", H, "Round one! Is Basil's test fair? One, yes. Two, no. Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 5.0),
 ("say", "m402", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "m403b", B, "One! It's my test, and my iron nail picked up the most clips. Iron wins!", {"pre": .5, "post": .4}),
 ("say", "m404p", P, "Two. The iron nail has many more turns of wire. Maybe the turns did it.", {"pre": .4, "post": .4, "kw": [["longcoil", "turns"]]}),
 ("say", "m405m", M, "Two. Basil changed the nail, and he changed the turns too.", {"pre": .4, "post": .3, "kw": [["mnail", "nail"], ["mturns", "turns"]]}),
 ("wait", .3),
 # ---- 5 · BE A STEEL PAPER CLIP (the journey; quiet: only the micro-world pad). The buddies ride along on the tray's rim, watching the nails.
 ("scene", "waitw"),
 ("say", "m501", H, "Be a steel paper clip! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jlie"),
 ("say", "m502", H, "You are a steel paper clip, lying in a tray. Above you hangs Basil's iron nail, wrapped in many, many turns of wire.", {**SLOW, "pre": 0, "post": .9, "kw": [["jmany", "wrapped"]]}),
 ("say", "m503", H, "It pulls you up, hard! You cling to its tip with lots of other clips. Over there, the steel nail has only a few turns. Its pull is weak.", {**SLOW, "pre": .2, "post": .9, "kw": [["jpull", "pulls"], ["jweak", "over"]]}),
 ("say", "m504", H, "But you wonder. Was it the iron that pulled you? Or all those turns? You cannot tell!", {**SLOW, "pre": .2, "kw": [["jwonder", "wonder"], ["jiron", "iron"], ["jturns", "turns"]]}),
 ("wait", 1.2),
 # ---- 6 · pull back out; the answer (two, not fair); Pip and Momo right (the Buddies score too); Pip explains: VARIABLE
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m601", H, "The answer is two: Basil's test is not fair! Did you show two fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "m602p", P, "A variable is a thing that can change in a test, such as the kind of nail, or the number of turns!", {"pre": .4, "kw": [["kw_variable", "variable", 0], ["vnail", "nail"], ["vturns", "turns"]]}),
 HOLD("kw_variable"),
 # ---- 7 · Basil: why is that not fair? [LOOK CLOSER] two things changed; 7.10 on a cream strip; FAIR TEST (Momo); Mark Sentence 1 (Momo): 7.9
 ("scene", "lc1q"),
 ("say", "m701b", B, "But my iron nail picked up the most clips. Why is that not fair?", {"pre": .5, "post": .3}),
 ("scene", "lcunfair"),
 ("say", "m702", H, "Look closer. Basil changed two things. The kind of nail is different. And the number of turns is different too.", {**LC, "pre": 1.2, "post": .4, "kw": [["kind", "kind"], ["turns", "number"]]}),
 ("say", "m703", H, "The iron nail attracts more clips. Was it because of the iron? Or because of the twenty-five turns? We cannot be sure.", {**LC, "pre": .3, "post": .4, "kw": [["which", "was"], ["notsure", "cannot"]]}),
 ("mark", "strip"),
 ("say", "m704s", H, M710, {"pre": .4, "hold": STRIP + 1}),
 ("say", "m705m", M, "A fair test is a test where we change only one thing, and keep all the other things the same, such as changing only the kind of nail!", {"pre": .3, "kw": [["kw_fair_test", "fair", 0]]}),
 HOLD("kw_fair_test"),
 *VERDICT("v_two"),
 ("scene", "mark1"),
 ("say", "m706", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m707", M, M79, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · HOLD ON! Momo's magnet race (Let's Apply Q1): her magnet held close to the pins, Pip's held high; Basil's fix (the same height)
 ("scene", "holdon"),
 ("say", "m801m", M, "Pip, my magnet picked up more pins than yours! So my magnet is the stronger one!", {"pre": .5, "post": .3}),
 ("say", "m802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .4}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m803", H, "Arms crossed? One finger up!", {"pre": 0, "post": .3}),
 ("say", "m804b", B, "Momo held her magnet close to the pins, and Pip held his far away. The distance changed too! Hold them at the same height, over the same pins.", {"pre": .4, "post": .3, "kw": [["close", "close"], ["far", "far"], ["level", "hold"]]}),
 *cut("fairline", [("say", "m805p", P, "Now only the magnet is different. That is fair!", {"pre": .4, "post": .5, "kw": [["onlymag", "only"]]})]),
 # ---- 9 · Basil: how do I make it fair? [LOOK CLOSER] twenty turns each, the same battery, wire and clips, dipped the same way: only the
 #          nail changed (the result is NOT shown: script section 3, Facts 1); EXPERIMENT (Basil); Mark Sentence 2 (Basil): 7.8a
 ("scene", "lc2q"),
 ("say", "m901b", B, "Okay! How do I make my iron and steel test fair?", {"pre": .5, "post": .3}),
 ("scene", "lcfair"),
 ("say", "m902", H, "Look closer. Give both nails twenty turns of wire. Use the same kind of battery, the same wire, and the same steel clips.", {**LC, "pre": 1.2, "post": .4, "kw": [["twenty", "twenty"], ["samebat", "battery"], ["samewire", "wire", 1], ["sameclips", "clips"]]}),
 ("say", "m903", H, "Dip both tips the same way. Now only one thing is different: the kind of nail. If one nail attracts more clips, we know the nail did it!", {**LC, "pre": .3, "post": .4, "kw": [["dipfair", "dip"], ["onlynail", "only"]]}),
 ("say", "m904b", B, "An experiment is a test that we plan and do to answer a question, such as: which nail makes a stronger electromagnet?", {"pre": .3, "kw": [["kw_experiment", "experiment", 0]]}),
 HOLD("kw_experiment"),
 ("mark", "boardfill"),
 *VERDICT("v_fair"),
 ("scene", "mark2"),
 ("say", "m905", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m906", B, M78A, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · score hand, the woodlouse and its fun fact, the key words
 ("scene", "final"),
 ("say", "m1001", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .4, "post": .6}),
 ("scene", "liz"),
 ("say", "m1002", H, "Did you spot the woodlouse? It was under the cupboard door!", {"pre": .6, "post": .4}),
 ("say", "m1003b", B, "Here is a fun fact! A woodlouse is a cousin of crabs and prawns! And in a fair test, with a damp side and a dry side, woodlice crawl to the damp side!", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_crab", "cousin"], ["ff_damp", "fair"]]}),
 ("say", "m1004", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Variable", "Fair test", "Experiment"]),
 # ---- 11 · the cliffhanger: Momo's plan (more batteries)
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1101m", M, "My turn! I will test if more batteries make our electromagnet stronger!", {"pre": .3, "post": .3, "kw": [["twob", "batteries"]]}),
 ("say", "m1102", H, "Will Momo's plan be fair? Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .8),
 # ---- 12 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, Basil changed two things at once, so his test was not fair. In a fair test, we change only one thing.", {"pre": .4, "post": .3, "gap": .7, "kw": [["pic2", "in"]]}),
 ("mark", "pic3"), ("wait", 2.6),
 # ---- 2 · the science room on Wednesday after school: Momo's two set-ups X and Y; the game and the hidden sparrow
 ("scene", "lab"), ("wait", .4),
 ("say", "n201m", M, "Here is my plan! Set-up X and set-up Y.", {"pre": .3, "post": .5, "kw": [["xy", "x"]]}),
 ("scene", "game"),
 ("say", "n202", H, "A little sparrow is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 *cut("sparrowtip", [("say", "n203p", P, "Sparrows love ledges and railings. Look up high!", {"pre": .3, "post": .3})]),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .5}),
 # ---- 3 · today's goals (Pip reads)
 ("scene", "goals"), ("say", "n301p", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302p", P, "Plan a fair test.", {"pre": .3, "post": .4}),
 ("say", "n303p", P, "Measure one thing.", {"pre": .3, "post": .4}), ("say", "n304p", P, "Why we repeat.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: Momo's plan, X (one battery, ten turns) and Y (two batteries, twenty turns): fair? (the brief's quiz; ring 5 s)
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Here is Momo's plan. Set-up X has one battery and ten turns. Set-up Y has two batteries and twenty turns. Is her test fair? One, yes. Two, no, two things changed. Three, no, use a steel nail. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n403m", M, "One! X and Y are both electromagnets, so it is a fair race.", {"pre": .5, "post": .4}),
 ("say", "n404p", P, "Three. Basil's steel nail is still here. We should use it.", {"pre": .4, "post": .4}),
 ("say", "n405b", B, "Two! Momo changed the batteries and the turns. I did that too, last time!", {"pre": .4, "post": .3}),
 ("wait", .3),
 # ---- 5 · the answer (two); only Basil right (no Buddy point); Y's coil unwinds to ten turns; PREDICTION (Basil)
 ("scene", "r1ans"),
 ("say", "n501", H, "The answer is two! Did you show two fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 *cut("basilfix", [("say", "n502b", B, "Keep the turns the same, and change only the batteries!", {"pre": .3, "post": .4, "kw": [["unwind", "keep"]]})]),
 ("say", "n503b", B, "A prediction is what we think will happen, such as: more batteries will make our electromagnet stronger!", {"pre": .3, "kw": [["kw_prediction", "prediction", 0]]}),
 HOLD("kw_prediction"),
 # ---- 6 · Pip: so many things on the bench [LOOK CLOSER] the book's table (7.12), row by row; VARIABLE TO BE MEASURED (Momo);
 #          Mark Sentence 1 (Pip): the book's prediction
 ("scene", "lc1q"),
 ("say", "n601p", P, "There are so many things on the bench. How do we keep track of them all?", {"pre": .5, "post": .3}),
 ("scene", "lctable"),
 ("say", "n602", H, "Look closer. Here is our plan. The variable to be changed is the number of batteries.", {**LC, "pre": 1.2, "post": .5, "kw": [["row1", "variable"]]}),
 ("say", "n603", H, "The variables to be kept the same are the type of batteries, the type of steel clips, the type of iron nail, and the number of turns of wire around the iron nail.", {**LC, "pre": .3, "post": .5, "kw": [["row2", "variables"], ["k1", "batteries"], ["k2", "clips"], ["k3", "nail"], ["k4", "number"]]}),
 ("say", "n604", H, "The variable to be measured is the number of steel clips attracted.", {**LC, "pre": .3, "post": .4, "kw": [["row3", "variable"], ["counting", "number"]]}),
 ("say", "n605m", M, "The variable to be measured is the one thing we count or measure, such as the number of steel clips attracted!", {"pre": .3, "kw": [["kw_variable_to_be_measured", "measured", 0]]}),
 HOLD("kw_variable_to_be_measured"),
 *VERDICT("v_plan"),
 ("scene", "mark1"),
 ("say", "n606", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n607", P, M712P, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 7 · Showdown: Pip's plan card (double points); line 3 struck, rewritten in green
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "n701", H, "Showdown! Double points. Pip's plan card has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 ("say", "n702p", P, "One: change only the number of batteries. Two: keep everything else the same. Three: count the clips once, and we are done!", {"pre": .5, "post": .3, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 6.0),
 ("say", "n703", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n704b", B, "Three! One count is not enough. Scientists repeat the test a few times.", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .4),
 ("say", "n705", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .5, "kw": [["coin2", "two"]]}),
 # ---- 8 · BE A STEEL PAPER CLIP, COUNTED AGAIN AND AGAIN (the journey, quiet)
 ("scene", "waitw"),
 ("say", "n801", H, "Be a steel paper clip! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtray"),
 ("say", "n802", H, "You are a steel paper clip in the tray. The nail with two batteries comes down. You jump up, and cling to its tip!", {**SLOW, "pre": 0, "post": .9, "kw": [["jdown", "nail"], ["jup", "jump"]]}),
 ("say", "n803", H, "A giant hand counts you and the other clips. Then back you go into the tray, and up again. Count after count.", {**SLOW, "pre": .2, "post": .9, "kw": [["jcount", "giant"], ["jback", "back"], ["jagain", "up"]]}),
 ("say", "n804", H, "Nine clips. Then eight. Then nine again.", {**SLOW, "pre": .2, "kw": [["c1", "nine"], ["c2", "eight"], ["c3", "nine", 1]]}),
 ("wait", 1.2),
 # ---- 9 · Momo: which count is right? [LOOK CLOSER] one count can trick us; nine, eight, nine; five, six, five; RELIABLE (Pip); the crane
 #          gets the two-battery hook (READY!); Mark Sentence 2 (Basil): 7.11
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "lc2q"),
 ("say", "n901m", M, "But Pip counted only once, and got seven. Which count is right?", {"pre": .5, "post": .3}),
 ("scene", "lccount"),
 ("say", "n902", H, "Look closer. One count can trick us. A clip may slip off, or we may count too fast.", {**LC, "pre": 1.2, "post": .4, "kw": [["slip", "slip"], ["fast", "fast"]]}),
 ("say", "n903", H, "When we count again and again, the counts are close to each other. Nine, eight, nine. And with one battery: five, six, five. Our prediction was right!", {**LC, "pre": .3, "post": .4, "kw": [["counts2", "nine"], ["counts1", "five"], ["right", "prediction"]]}),
 ("say", "n904p", P, "Reliable means we can trust the results, because we get nearly the same results each time we repeat the test, such as nine, eight and nine clips!", {"pre": .3, "kw": [["kw_reliable", "reliable", 0]]}),
 HOLD("kw_reliable"),
 *VERDICT("v_rel"),
 ("scene", "crane"), ("wait", .5), ("mark", "carry"), ("wait", 1.8), ("mark", "drop"), ("wait", 1.6),
 ("scene", "mark2"),
 ("say", "n906", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n907", B, M711, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the sparrow (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the sparrow? It was on top of the door frame!", {"pre": .4, "post": .4}),
 ("say", "n1103p", P, "Here is a fun fact! A sparrow's heart beats hundreds of times in one minute! Scientists count it again and again, to be sure.", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_heart", "heart"], ["ff_count", "scientists"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 12 · the dare for Episode 25 (Pip's HDB kitchen: the fridge door swings shut; the cards BEFORE any answer)
 ("scene", "dare"),
 ("mark", "swing"), ("wait", 1.4), ("mark", "dareIn"), ("wait", .2),
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["push", "pushes"], ["shut", "swings"]]}),
 *cut("nextjoke", [("say", "n1202b", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 ("wait", .6),
 # ---- 13 · the key words
 *kwrecap(["Prediction", "Variable to be measured", "Reliable"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
