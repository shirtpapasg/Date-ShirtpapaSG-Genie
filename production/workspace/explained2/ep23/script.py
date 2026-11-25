"""script.py: P3 EP23 "The magnet you can switch off: electromagnets (the electrical method)" (Ch 7, Making and Using Magnets, pp. 115-117:
the electrical method, its three steps, the electromagnet and the WARNING box p. 115; more turns of wire p. 116; more batteries and the
takeaway p. 117; Let's Apply Q2(a) p. 124), Part 1 ("Take the Battery Away. Do the Clips STAY or DROP?") and Part 2 ("Ten Turns or Twenty?
Make the STRONGEST Electromagnet"): the script (../p3_ep23_script.md, version 1 of 24 Nov 2026, Opus; approved by the teacher 25 Nov 2026,
"OK to the EP23 script") as data. Every spoken line is word for word as in the script's tables (sections 4 and 5). make_voice.py records the
lines; build_tl.py lays them on the timeline. Line ids as in the script's section 6: m... Part 1, n... Part 2 (m<segment><nn>, a letter for a
buddy line, s for a book strip read by Heart).

The dare that opens Part 1 is EP22's closing dare ({NEXT_DARE} of ../ep22/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): asserted below against EP22_NEXT and against ../ep22/script.py itself (NEXT_DARE and NEXT_CARDS). The dare
into EP24 is NEXT_DARE below (script section 3, Block B; Let's Apply Q2(b)).

Definitions (the teacher's pattern): a describing word "X means ..., such as ..." (COIL, Basil, m905b); a thing "A ... is a ... that ...,
such as ..." (ELECTRICAL METHOD, Momo, m603m; ELECTROMAGNET, Pip, m706p; TURNS OF WIRE, Basil, n602b; STRENGTH, Momo, n704m; NUMBER OF
BATTERIES, Pip, n904p).

Pace (SERIES_FORMAT 3): as EP15 to EP22. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a key word pops large
and holds 2.0 s (HOLD); Mark Sentence cards hold 2.5 s after the buddy's last word; a cream book strip stays up >= 3.5 s a line (7.5, three
lines, in Part 1's HOLD ON! fix; 7.8 in Part 2's Showdown fix). Journeys (SLOW): Heart .85, 1.0 s between sentences, softer. LOOK CLOSER
(LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

Opening (EP22's pattern, SERIES_FORMAT 11 item 1): Part 1 speaks at 0.825 s over the cold open ("Last time, we asked:"), the coffee shop stays
on screen under the dare's first sentences (they describe exactly what the picture shows), the dare cards come in .3 s before "Then" (ltIn).
Part 2's recap speaks at 0.30 s.

Marks the picture and the sound share (every action sound lands ON its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures),
  strip (the cream book strip).
  Part 1: coil0, join0, clips0, budsIn, ltIn, title; board, lorry, caps (today); stroked, crane (the picks' pictures); the journey (dive,
  jlie, jcoil, jon, jpull, jjump, joff, jgone, jdrop); box1 (answer); lcon: away, dipn, stay, on1, off1, loses, crane2, craneon, craneoff;
  box2; holdon: idea, stop, never2, mains; lcparts: alone1, alone2, one, nothing, both, flow, becomes, need; cliff: lift, nobatt.
  Part 2: pic1 / pic2 / pic3 (recap); ring (the school bell); the journey (dive, jtray, jrings, jten, jtip, jslip, jtwenty, jjump, jstay);
  rows (r1ans: the board's rows 1 and 2); lcturns: same, only, dip, why, bell, fast; l1 / l2 / l3 (Momo's poster lines), strike, rewrite;
  swing, slip (lc2q); lcbatt: one1, two2, dip2, flow2, chart; carry, drop (crane: the bolt reaches the lorry); dare: coil, dareIn, coilq.

CUTS (script section 6, non-teaching; the words are kept there so a line can come back). In use from the start: Part 1 `sevenone23` (m602h),
`momooops` (m806m), `basilcaps` (m203b's second half), `pipcrane` (m706p's crane example); Part 2 `cricktip` (n203m), `usbridge` (n708h),
`nextjoke` (n1202b). "If a part must lose more" (section 6, in order): Part 1 `piptip` (m205p), `titleslam` (the title's hold 1.8 -> 1.2 s),
`mainsline` (m805 becomes the on-screen tag only); Part 2 `bellline` (n201b), `craneline` (n905 becomes picture and sound only), `r1trim`,
`showhold`.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"sevenone23", "momooops", "basilcaps", "pipcrane", "cricktip", "usbridge", "nextjoke"}   # script section 6: in use from the start
CUTS |= {"bellline"}   # Stage 1 (25 Nov): Part 2 came out at 5:46.3 (over the 5:45 the script allows), so section 6's "If a part must lose more"
                       # list was applied IN ORDER: Part 2 `bellline` (Basil's "Hear that? Our school bell has an electromagnet inside!"; the bell
                       # is still seen and heard ringing at the scene's start and explained in look-closer 1). Part 1 (5:36.0) needed nothing.
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP22's dare into EP23 (../ep22/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP22_NEXT = "Next time: Momo coils a long wire round a new iron nail, and joins its two ends to a battery. The nail attracts some steel paper clips. Then she takes the battery away. What happens to the clips? One, they stay on the nail. Two, they drop off. Lock in your answer!"
_ep22 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep22", "script.py")
if os.path.exists(_ep22):
    _m = re.search(r'^NEXT_DARE = "(.*)"$', open(_ep22).read(), re.M)
    assert _m and _m.group(1) == EP22_NEXT, "EP22's NEXT_DARE changed: update Block A"
DARE_Q1 = "Momo coils a long wire round a new iron nail, and joins its two ends to a battery. The nail attracts some steel paper clips. Then she takes the battery away. What happens to the clips?"
DARE_Q2 = "One, they stay on the nail. Two, they drop off."
assert "Next time: " + DARE_Q1 + " " + DARE_Q2 + " Lock in your answer!" == EP22_NEXT
DARE_CARDS = ["They stay on the nail", "They drop off"]   # EP22's own two cards (NEXT_CARDS)
if os.path.exists(_ep22):
    _c = re.search(r'^NEXT_CARDS = (\[.*\])$', open(_ep22).read(), re.M)
    assert _c and eval(_c.group(1)) == DARE_CARDS, "EP22's NEXT_CARDS changed: update DARE_CARDS"
DARE_LABEL = "What happens to the clips?"
DARE_SHORT = "Momo takes the battery away. What happens to the clips?"
DARE_CLUES = ["a wire coiled round a new nail", "joined to a battery", "the battery is taken away"]
# Block B: the dare into EP24 (plan row 24, "Was that test fair? Change only one thing"; Let's Apply Q2(b)); EP24's answer: 2, no
NEXT_DARE = "Next time: Basil tests which makes a stronger electromagnet, an iron nail or a steel nail. He coils twenty-five turns round the iron nail, but only eight turns round the steel nail. Is his test fair? One, yes. Two, no. Lock in your answer!"
NEXT_CARDS = ["Yes", "No"]
NEXT_JOKE = "Eight turns was all the wire I had left!"

# the chant (Part 2): call and response, YOUR TURN! after each line (script segment 10)
CHANT = [("More turns of wire?", "A stronger electromagnet!"), ("More batteries?", "A stronger electromagnet!"), ("The wall socket?", "Never! Batteries only!")]
CHANT_CAPS = ([1.25, 1.1, 1.15], [1.5, 1.5, 1.5])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
STRIP = 3.5                                        # a cream book strip stays up >= 3.5 s (a line)
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# the book's sentences (definitions file rows 7.1, 7.4 to 7.8; read exactly as printed; 7.6's misprint "increasingthe" read "increasing the")
M71A = "A magnetic object can be made into a magnet using the stroke method or the electrical method."   # 7.1, first sentence (cut: `sevenone23`)
M74 = "A magnet made by this method is called an electromagnet."                                      # 7.4 (Part 1 Mark Sentence 1)
M74_3 = "Coil a long piece of wire around an iron nail. Connect the ends of the wires to a battery. Test the iron nail by placing it near some steel clips."   # 7.4's three steps (Part 1 Mark Sentence 2)
M75 = "Do not connect the electromagnet to the battery for too long as the objects may become hot. Do not touch the exposed wires with your bare hands. Do not connect the electromagnet to the main electrical supply."   # 7.5, the WARNING box (Part 1, HOLD ON!'s strip)
M76 = "We can increase the strength of an electromagnet by increasing the number of turns of wire around the iron nail."   # 7.6 (Part 2 Mark Sentence 1)
M77 = "We can also increase the strength of an electromagnet by increasing the number of batteries used."   # 7.7 (Part 2 Mark Sentence 2)
M78 = "Objects made of iron and steel can be made into magnets using the stroke method or the electrical method."   # 7.8 (Part 2, the Showdown's strip)

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
 # ---- 1 · the cold open, SPEAKING from 0.825 s: a coffee shop in an industrial estate on Saturday morning, across the road from a scrap metal
 #          yard. At the round table Momo coils the long wire round a new iron nail (coil0), clips its two bare ends to the battery holder's
 #          leads on "joins" (join0), and lowers the nail: the clips jump to its tip on "attracts" (clips0); the dare cards come in at "Then".
 ("scene", "cold"), ("wait", .6), ("mark", "coil0"),
 ("say", "m101", H, "Last time, we asked:", {"pre": .3}),
 ("mark", "budsIn"),
 ("say", "m102", H, DARE_Q1, {"pre": .3, "kw": [["join0", "joins"], ["clips0", "attracts"], ["ltIn", "then"]]}),
 ("scene", "lasttime", {"at": "ltIn", "d": -.3}),
 ("say", "m103", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "m104", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.2 if "titleslam" in CUTS else 1.8),
 # ---- 2 · today: the mini crane for Recycling Week (the camera glides from Momo's coil to OUR MINI CRANE, then to the cardboard crane);
 #          Basil's bar magnet that never lets go; the game and the hidden millipede (named first; ONE smooth push-in onto the millipede on
 #          the potted plant's rim by the pillar: the INTRO spot)
 ("scene", "today"),
 ("say", "m201m", M, "We are building a mini crane for Recycling Week. It must lift the steel scrap into the lorry.", {"pre": .4, "post": .2, "kw": [["board", "building"], ["lorry", "lorry"]]}),
 ("say", "m203b", B, "My bar magnet picks up the steel caps. But it never lets them go!" + ("" if "basilcaps" in CUTS else " I have to pull them off, one by one."), {"pre": .3, "post": .2, "kw": [["caps", "caps"]]}),
 ("scene", "game"),
 ("say", "m204", H, "A little millipede is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 *cut("piptip", [("say", "m205p", P, "Look low, near the plants and the floor!", {"pre": .3, "post": .1})]),
 ("say", "m206", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads the three cards) and the countdown
 ("scene", "goals"), ("say", "m301b", B, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m302b", B, "The electrical method.", {"pre": .3, "post": .3}),
 ("say", "m303b", B, "On and off.", {"pre": .3, "post": .3}), ("say", "m304b", B, "Stay safe.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 4 · Round 1: EP22's dare (a short 3 s ring: the answer was locked in at the end of EP22)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "m401", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "m402", H, "Locked in!", {"pre": 0}),
 ("say", "m403b", B, "One! Pip's stroked nail stayed a magnet. So Momo's nail will stay a magnet too!", {"pre": .5, "kw": [["stroked", "stroked"]]}),
 ("say", "m404p", P, "Two. I watched the crane across the road. Its big disc drops the scrap all by itself.", {"pre": .4, "kw": [["crane", "crane"]]}),
 ("say", "m405m", M, "Two. The clips jumped up when I joined the battery, so they will drop without it.", {"pre": .4}),
 ("wait", .15),
 # ---- 5 · BE THE IRON NAIL, IN A COIL (the journey; the buddies ride along, shrunk, on the table beside your flat head): the wire wraps
 #          round you in neat turns; the ends are joined: a pull at your tip, the clips jump; the battery is taken away: the clips drop
 ("scene", "waitw"),
 ("say", "m501", H, "Be the iron nail! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jlie"),
 ("say", "m502", H, "You are a new iron nail, lying on the table. A long wire wraps round you, round and round, in neat turns.", {**SLOW, "pre": 0, "post": .8, "kw": [["jcoil", "wire"]]}),
 ("say", "m503", H, "The wire's two ends are joined to the battery. Now you feel a pull at your tip! The steel clips jump up, and cling to you.", {**SLOW, "pre": .2, "post": .8, "kw": [["jon", "joined"], ["jpull", "pull"], ["jjump", "jump"]]}),
 ("say", "m504", H, "Then the battery is taken away. The pull is gone. The clips let go, and drop back into the tray!", {**SLOW, "pre": .2, "kw": [["joff", "taken"], ["jgone", "gone"], ["jdrop", "drop"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (two, the clips drop off); Pip and Momo right (the Buddies score too); Momo explains: ELECTRICAL METHOD
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m601", H, "The answer is two: the clips drop off! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["box1", "drop"], ["coin1", "one"]]}),
 *cut("sevenone23", [("mark", "strip0"), ("say", "m602h", H, M71A, {"pre": .3, "hold": STRIP})]),
 ("say", "m603m", M, "The electrical method is a way to make a magnet that uses electricity from a battery, such as my long wire and my battery!", {"pre": .3, "kw": [["kw_electrical_method", "electrical", 0]]}),
 HOLD("kw_electrical_method"),
 # ---- 7 · Basil: is it still a little magnet? [LOOK CLOSER] battery away, dipped: the clips stay; on, off, on, off; the crane across the
 #          road; ELECTROMAGNET (Pip); Mark Sentence 1 (Momo): 7.4
 ("scene", "lc1q"),
 ("say", "m701b", B, "Is Momo's nail still a little magnet, like Pip's stroked nail?", {"pre": .5}),
 ("scene", "lcon"),
 ("say", "m702", H, "Look closer. The battery is away. Dip the nail into the steel clips. The clips stay in the tray.", {**LC, "pre": 1.2, "kw": [["away", "away"], ["dipn", "dip"], ["stay", "stay"]]}),
 ("say", "m703", H, "Join the battery again, and the clips jump up. Take it away, and they drop.", {**LC, "pre": .3, "kw": [["on1", "join"], ["off1", "take"]]}),
 ("say", "m704", H, "Without electricity, the nail loses most of its magnetism.", {**LC, "pre": .3, "kw": [["loses", "loses"]]}),
 ("say", "m705", H, "The crane across the road works the same way. Switched on, its big round disc lifts the scrap. Switched off, it lets go!", {**LC, "pre": .3, "kw": [["crane2", "crane"], ["craneon", "switched", 0], ["craneoff", "switched", 1]]}),
 ("say", "m706p", P, "An electromagnet is a magnet that is made with electricity, such as Momo's coiled nail" + ("!" if "pipcrane" in CUTS else ", or the crane's big disc!"), {"pre": .2, "kw": [["kw_electromagnet", "electromagnet", 0]]}),
 HOLD("kw_electromagnet"),
 *VERDICT("v_onoff"),
 ("scene", "mark1"), ("mark", "box2"),
 ("say", "m707", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m708", M, M74, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · HOLD ON! Momo and the wall socket (she only points; nobody brings the wire near it); Basil's fix; the main electrical supply;
 #          the WARNING strip (7.5, all three sentences, Heart), the three icons on the board
 ("scene", "holdon"),
 ("say", "m801m", M, "One battery makes a magnet. So the wall socket will make a super magnet! Let's join our wire to it!", {"pre": .5, "post": .2, "kw": [["idea", "super"]]}),
 ("say", "m802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m803", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "m804b", B, "Stop, Momo! Electricity from the wall socket is far too strong. It can hurt you very badly. We only use batteries!", {"pre": .3, "post": .2, "kw": [["stop", "stop"], ["never2", "only"]]}),
 *([("mark", "mains"), ("wait", 1.2)] if "mainsline" in CUTS else
   [("say", "m805", H, "Wall sockets give us the main electrical supply.", {"pre": .3, "kw": [["mains", "main"]]})]),
 ("mark", "strip"),
 ("say", "m805s", H, M75, {"pre": .3, "hold": STRIP * 3}),
 *cut("momooops", [("say", "m806m", M, "Oops! Batteries only, and only for a moment.", {"pre": .2, "post": .1})]),
 # ---- 9 · Pip: the battery is a magnet? [LOOK CLOSER] the battery alone, the nail alone, one end joined, both ends joined: electricity from
 #          the battery, round the nail and back; COIL (Basil); the board's list ticked; Mark Sentence 2 (Basil): 7.4's three steps
 ("scene", "lc2q"),
 ("say", "m901p", P, "I think the battery is a magnet, and the wire just joins it to the nail.", {"pre": .5}),
 ("scene", "lcparts"),
 ("say", "m902", H, "Look closer. The battery alone attracts no clips. The iron nail alone attracts no clips.", {**LC, "pre": 1.2, "kw": [["alone1", "battery"], ["alone2", "iron"]]}),
 ("say", "m903", H, "Coil the wire round the nail, and join just one end to the battery. Still nothing.", {**LC, "pre": .3, "kw": [["one", "one"], ["nothing", "nothing"]]}),
 ("say", "m904", H, "Now join both ends. Electricity flows from the battery, round the nail, and back. The nail becomes a magnet!", {**LC, "pre": .3, "kw": [["both", "both"], ["flow", "flows"], ["becomes", "becomes"]]}),
 ("say", "m905b", B, "Coil means wind round and round, in neat turns, such as the long wire round Momo's nail!", {"pre": .2, "kw": [["kw_coil", "coil", 0]]}),
 HOLD("kw_coil"),
 ("mark", "need"),
 *VERDICT("v_both"),
 ("scene", "mark2"),
 ("say", "m906", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m907", B, M74_3, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · score hand, the millipede (and its fun fact), the key words
 ("scene", "final"),
 ("say", "m1001", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "m1002", H, "Did you spot the millipede? It was on the kerb, by the bicycle rack!", {"pre": .6, "post": .2}),
 ("say", "m1003p", P, "Here is a fun fact! A scared millipede coils up tight, like our wire round the nail! And most millipedes have far fewer than a thousand legs!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_coil", "coils"], ["ff_legs", "fewer"]]}),
 ("say", "m1004", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Electrical method", "Electromagnet", "Coil"]),
 # ---- 11 · the cliffhanger: the ten-turn hook cannot lift the steel bolt, and there are no more batteries
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1101p", P, "Our crane cannot lift the steel bolt. And we have no more batteries, so it can never get stronger.", {"pre": .3, "kw": [["lift", "lift"], ["nobatt", "no"]]}),
 ("say", "m1102", H, "Can the crane get stronger without another battery? Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 12 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (each >= 2.5 s; the third, "Batteries only", while
 #          Heart's last words fade and after)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we made an electromagnet by the electrical method. Take the battery away, and the clips drop off.", {"pre": .4, "post": .2, "gap": .7, "kw": [["pic2", "take"]]}),
 ("mark", "pic3"), ("wait", 2.5),   # each picture >= 2.5 s (SERIES_FORMAT 2): the third, "Batteries only", after Heart's last word
 # ---- 2 · the school science room on Monday after school: the old electric bell on the corridor wall rings (ring), the camera glides in;
 #          Basil names it; the game and the hidden cricket (ONE smooth push-in onto the cricket on the windowsill: the INTRO spot)
 ("scene", "lab"), ("wait", .3), ("mark", "ring"),
 *([("wait", 2.2)] if "bellline" in CUTS else [("wait", .6), ("say", "n201b", B, "Hear that? Our school bell has an electromagnet inside!", {"pre": .3, "post": .3}), ("wait", .6)]),
 ("scene", "game"),
 ("say", "n202", H, "A little cricket is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 *cut("cricktip", [("say", "n203m", M, "Crickets love quiet corners. Check near the window!", {"pre": .3, "post": .2})]),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Pip reads)
 ("scene", "goals"), ("say", "n301p", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302p", P, "More turns of wire.", {"pre": .3, "post": .3}),
 ("say", "n303p", P, "More batteries.", {"pre": .3, "post": .3}), ("say", "n304p", P, "Iron and steel, not wood.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: ten turns or twenty, one battery each: which attracts more steel clips? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Momo's nail has ten turns" + ("" if "r1trim" in CUTS else " of wire") + ", and Basil's has twenty. " + ("" if "r1trim" in CUTS else "Each has one battery. ") + "Which nail attracts more steel clips? One, ten turns. Two, twenty turns. Three, both the same. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0}),
 ("say", "n403p", P, "Three. They both have one battery, and only batteries make an electromagnet stronger.", {"pre": .5}),
 ("say", "n404b", B, "Two! More turns is like more strokes. More turns, more pull!", {"pre": .4}),
 ("say", "n405m", M, "Two. Every turn of wire helps a little, so twenty turns help more.", {"pre": .4}),
 ("wait", .15),
 # ---- 5 · BE A STEEL BOLT (the journey; the buddies ride along on the scrap round you): the ten-turn hook tips you up and you slip back;
 #          the twenty-turn hook lifts you; the ring-pulls stay behind
 ("scene", "waitw"),
 ("say", "n501", H, "Be a steel bolt! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtray"),
 ("say", "n502", H, "You are a steel bolt in our mini scrapyard, the heaviest scrap of all. Aluminium ring-pulls and plastic caps lie around you.", {**SLOW, "pre": 0, "post": .8, "kw": [["jrings", "aluminium"]]}),
 ("say", "n503", H, "Momo's hook with ten turns comes down. You tip up a little, and then you slip back down.", {**SLOW, "pre": .2, "post": .8, "kw": [["jten", "momo's"], ["jtip", "tip"], ["jslip", "slip"]]}),
 ("say", "n504", H, "Here comes Basil's hook with twenty turns. You jump up, and cling to its tip! The ring-pulls stay behind.", {**SLOW, "pre": .2, "kw": [["jtwenty", "comes"], ["jjump", "jump"], ["jstay", "stay"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (two, twenty turns); Basil and Momo right, so the Buddies score too; Basil explains: TURNS OF WIRE
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "r1ans"),
 ("say", "n601", H, "The answer is two: Basil's twenty turns! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["rows", "twenty"], ["coin1", "one"]]}),
 ("say", "n602b", B, "A turn of wire is one time the wire goes round the nail, such as the twenty turns round my nail!", {"pre": .3, "kw": [["kw_turns_of_wire", "turn", 0]]}),
 HOLD("kw_turns_of_wire"),
 # ---- 7 · Pip: the same battery, so how can more turns help? [LOOK CLOSER] the same nails, wire and battery; only the turns differ; each
 #          turn adds a little pull; STRENGTH (Momo); the school bell cut away; Mark Sentence 1 (Basil): 7.6
 ("scene", "lc1q"),
 ("say", "n701p", P, "But it is the same battery. How can more turns make it stronger?", {"pre": .5}),
 ("scene", "lcturns"),
 ("say", "n702", H, "Look closer. The same nails, the same wire, and one battery each. Only the number of turns is different.", {**LC, "pre": 1.2, "kw": [["same", "same", 0], ["only", "only"]]}),
 ("say", "n703", H, "The nail with twenty turns attracts more steel clips. Each turn of wire adds a little more pull.", {**LC, "pre": .3, "kw": [["dip", "attracts"], ["why", "each"]]}),
 ("say", "n704m", M, "The strength of an electromagnet is how strongly it pulls, such as how many steel clips it can attract!", {"pre": .2, "kw": [["kw_strength", "strength", 0]]}),
 HOLD("kw_strength"),
 ("say", "n705", H, "Our school bell has an electromagnet inside, with many turns of wire. It switches on and off very fast, so a little hammer hits the bell again and again!", {**LC, "pre": .3, "kw": [["bell", "bell", 0], ["fast", "fast"]]}),
 *VERDICT("v_turns"),
 ("scene", "mark1"),
 ("say", "n706", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n707", B, M76, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 *cut("usbridge", [("say", "n708h", H, "Children in the United States build the same electromagnet, with a nail, a wire and a battery from a science kit.", {"pre": .3})]),
 # ---- 8 · Showdown: Momo's poster (double points); the fix (line 3 struck, rewritten in green); the book's takeaway 7.8 on a cream strip
 ("scene", "showcard"), ("wait", .8 if "showhold" in CUTS else 1.0),
 ("scene", "show"),
 ("say", "n801", H, "Showdown! Double points. Momo's poster for Recycling Week has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 ("say", "n802m", M, "One: coil a long wire round the iron nail. Two: join both ends to the battery. Three: electricity is stronger, so a light wooden chopstick works too!", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "n803", H, "Locked in!", {"pre": 0}),
 ("say", "n804b", B, "Three! A wooden chopstick cannot be made into a magnet, even with electricity. Wood is not a magnetic material.", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .3),
 ("say", "n805", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 ("mark", "strip"),
 ("say", "n806s", H, M78, {"pre": .2, "hold": STRIP}),
 # ---- 9 · Basil: the bolt slips off on the swing, and the wire is used up; [LOOK CLOSER] twenty turns each, one battery and two batteries:
 #          NUMBER OF BATTERIES (Pip); the crane carries the bolt to the lorry (the reveal); Mark Sentence 2 (Pip): 7.7
 ("scene", "lc2q"), ("wait", .2), ("mark", "swing"), ("wait", 1.1), ("mark", "slip"),
 ("say", "n901b", B, "We have used up all our wire. How else can we make our crane stronger?", {"pre": .3}),
 ("scene", "lcbatt"),
 ("say", "n902", H, "Look closer. Two nails, each with twenty turns. One is joined to one battery. The other is joined to two batteries, in a row.", {**LC, "pre": 1.2, "kw": [["one1", "one", 0], ["two2", "two", 1]]}),
 ("say", "n903", H, "The nail with two batteries attracts more steel clips. More batteries make more electricity flow round the coil.", {**LC, "pre": .3, "kw": [["dip2", "attracts"], ["flow2", "flow"]]}),
 ("say", "n904p", P, "The number of batteries is how many batteries we join together, such as one battery, or two batteries in a row!", {"pre": .2, "kw": [["kw_number_of_batteries", "number", 0]]}),
 HOLD("kw_number_of_batteries"),
 *VERDICT("v_batt"),
 ("scene", "crane"), ("mark", "chart"),
 *([("wait", .6), ("mark", "carry"), ("wait", 2.2), ("mark", "drop"), ("wait", 1.4)] if "craneline" in CUTS else
   [("say", "n905", H, "Watch! Our crane carries the steel bolt to the lorry, and drops it in!", {"pre": .5, "post": .6, "kw": [["carry", "carries"], ["drop", "drops"]]})]),
 ("scene", "mark2"),
 ("say", "n906", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n907", P, M77, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the cricket (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .3}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the cricket? It was on the ledge, right under the school bell!", {"pre": .3, "post": .2}),
 ("say", "n1103m", M, "Here is a fun fact! A cricket's ears are on its front legs, just below its knees! So when our school bell rings, the cricket hears it with its legs!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_ear", "ears"], ["ff_bell", "rings"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .3}),
 # ---- 12 · the dare for Episode 24 (the science room: Basil with an iron nail of 25 turns and a steel nail of 8 turns; the cards come in
 #           BEFORE any clips are seen)
 ("scene", "dare"),
 ("mark", "coil"), ("wait", .6), ("mark", "dareIn"), ("wait", .2),
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["coilq", "coils"]]}),
 *cut("nextjoke", [("say", "n1202b", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Turns of wire", "Strength", "Number of batteries"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP22, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
