"""script.py: P3 EP21 "Hang a magnet and it points North-South. Every time." (Ch 6, Properties of Magnets, pp. 110-112: a freely
suspended magnet comes to rest in the North-South direction; Earth behaves like a magnet; the compass), Part 1 ("Spin a Hanging Magnet. Why
Does It Stop the SAME Way?") and Part 2 ("Bring a Magnet Near a Compass. What Does the Needle DO?"): the script (../p3_ep21_script.md,
version 1 of 24 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov) as data. Every spoken line is word for word as in the
script's tables (sections 3 to 5), except the two noun definitions (below). make_voice.py records the lines; build_tl.py lays them on the
timeline. Line ids as in the script's section 6: m... Part 1, n... Part 2 (m<segment><nn>, a letter for a buddy line).

The dare that opens Part 1 is EP20's closing dare ({NEXT_DARE} of ../ep20/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): asserted below against EP20_NEXT and, when it is there, against ../ep20/script.py itself. The dare into
EP22 is NEXT_DARE below.

Definitions (the teacher's EP20 pattern "X means ..., such as ..."): FREELY SUSPENDED (Momo, m805m), NORTH-SOUTH DIRECTION (Basil,
m806b) and TELL THE DIRECTION (Pip, n905p) keep it. For the two NOUN key words the main session asked for natural English, "A compass is a
tool that ..., such as ..." (Momo, n704m) and "The needle is the small magnet inside a compass, such as ..." (Basil, n602b), instead of the
script's "Compass means ..." / "The needle means ...": an open point for the teacher (STATE.md).

Pace (SERIES_FORMAT 3): as EP15 to EP20. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word. Journeys (SLOW): Heart .85, 1.0 s between sentences, softer. LOOK CLOSER (LC): Heart .85, .8 s between
sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s. No cream book strip is read in this episode (script "Rules bent" 4).

SEQ items (as EP16 to EP20): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: spin0, budsIn (cold open: Basil spins the hanging magnet; Momo and Pip lean in), title; chart (today: THE SPIN CHART); the journey
  (dive, jspin, jfinger, jslow, jswing, jback, jstop, jagain, jstop2); chart1 (an arrow in each row), cones (the two PE cones); lcplaces:
  field, room, basin, sameline, nsline, endN, endS; holdon: tangle, try, rubs, hangup, freeturn; lcearth: up, earth, everywhere, poles2,
  chartEarth; cliff: compass, qneedle.
  Part 2: pic1 / pic2 / pic3 (recap); boat (the buddies step off the bumboat); the journey (dive, jpin, jsettle, jnorth, jpush, jturn,
  jpull, jback, jns); needle (r1ans: the compass held up); lcuse: turn, still, setN, rose, route (the trail map's route lights: the reveal);
  l1 / l2 / l3 (Momo's checklist lines light), strike, rewrite; lcnight: ship, clouds, shipneedle, fog, hiker; dare: stroke, dareIn, strokeq.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back). "If a part must lose more" (section 6, in order): Part 1
  titleslam, swallowtip, momotouch, todayline, then small pacing trims (coldtrim, ...); Part 2 turtletip, phonesline, roundround, showhold,
  checklist. Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, the pauses around new terms, a buddy's explanation of a key
  word, the Earth picture, the bar magnet near the needle.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"pipwhy", "lcfloat", "ubinhello", "n7spoon", "basilrepel", "nextjoke"}   # script section 6: in use from the start, for length
# Stage 1: with section 6's cuts the real lines came out SHORTER than the script's estimate (Part 1 5:24.7, Part 2 5:29.6, inside the 5:15-5:35
# target), so no "lose more" cut is needed. `basiltangle` (m905) is back: section 6 names it "first to come back if Part 1 has 3 s" (Part 1
# -> 5:28). Part 2's first to come back, `ubinhello` (n201), stays out: it says "Pulau Ubin" aloud, and "Ubin" is a new Singapore name that
# needs the teacher's approved test clip first (script section 10 G; SERIES_FORMAT "Say names right").
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP20's dare into EP21 (../ep20/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP20_NEXT = "Next time: Basil hangs his bar magnet on a string, so it can turn freely. He spins it again and again. Where does it stop? One, a different way every time. Two, the same way every time. Lock in your answer!"
_ep20 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep20", "script.py")
if os.path.exists(_ep20):
    _m = re.search(r'^NEXT_DARE = "(.*)"$', open(_ep20).read(), re.M)
    assert _m and _m.group(1) == EP20_NEXT, "EP20's NEXT_DARE changed: update Block A"
DARE_Q1 = "Basil hangs his bar magnet on a string, so it can turn freely. He spins it again and again. Where does it stop?"
DARE_Q2 = "One, a different way every time. Two, the same way every time."
assert "Next time: " + DARE_Q1 + " " + DARE_Q2 + " Lock in your answer!" == EP20_NEXT
DARE_CARDS = ["A different way every time", "The same way every time"]   # EP20's own two cards (NEXT_CARDS)
if os.path.exists(_ep20):
    _c = re.search(r'^NEXT_CARDS = (\[.*\])$', open(_ep20).read(), re.M)
    assert _c and eval(_c.group(1)) == DARE_CARDS, "EP20's NEXT_CARDS changed: update DARE_CARDS"
DARE_LABEL = "Where does it stop?"
DARE_SHORT = "Where does Basil's magnet stop?"
DARE_CLUES = ["a string", "spin, spin, spin", "free to turn"]
# Block B: the dare into EP22 (plan row 22, "Turn a nail into a magnet (the stroke method)"); EP22's answer: 2, the nail attracts the clips
NEXT_DARE = "Next time: Pip strokes an iron nail with Basil's magnet, again and again, always the same way. Then he holds the nail near some steel paper clips. What happens? One, nothing happens. Two, the nail attracts the clips. Lock in your answer!"
NEXT_CARDS = ["Nothing happens", "The nail attracts the clips"]
NEXT_JOKE = "Stroke it gently, Pip. The way you stroke my fur!"

# the chant (Part 2): call and response, YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Hang it freely?", "North-South!"), ("A compass needle?", "A small magnet!"), ("Why North-South?", "Earth behaves like a magnet!")]
CHANT_CAPS = ([1.1, 1.2, 1.2], [.95, 1.0, 1.5])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# the book's sentences (definitions file; read exactly as printed)
M617 = "A freely suspended magnet comes to rest in the North-South direction."
M616 = "Earth behaves like a magnet with its own North and South poles. It interacts with a freely suspended magnet. This causes the freely suspended magnet to always point in the North-South direction."
M615 = "A compass can help us to find the direction. When the needle inside the compass stops moving, it always points in the North-South direction of the Earth."
M616H = "Hence, a freely suspended magnet can be used to tell the direction."

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
 # ---- 1 · silent cold open: a school field, Tuesday after school. Basil's bar magnet hangs on a string from a broom handle across two
 #          plastic chairs by the wooden bench; THE SPIN CHART beside it, empty. Basil gives it a gentle spin (spin0); Momo and Pip lean in
 #          (budsIn); it turns, slows
 ("scene", "cold"), ("wait", .6), ("mark", "spin0"), ("wait", 1.6), ("mark", "budsIn"), ("wait", 3.8 if "coldtrim" not in CUTS else 2.8),
 # ---- 2 · "Last time...": EP20's dare, word for word, then the title
 ("scene", "lasttime"),
 ("say", "m201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "m202", H, DARE_Q1, {"pre": .3}),
 ("say", "m203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "m204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "titleslam" in CUTS else 2.2),
 # ---- 3 · today (the camera glides to THE SPIN CHART), the game, and the hidden swallow (named first; ONE smooth push-in from the field
 #          onto the swallow on the wire between the floodlight poles: the INTRO spot)
 ("scene", "today"),
 *([("wait", .8), ("mark", "chart"), ("wait", 1.4)] if "todayline" in CUTS else
   [("say", "m301", H, "Today, we find out where a hanging magnet stops, and why!", {"pre": .4, "post": .6, "kw": [["chart", "where"]]})]),
 ("scene", "game"),
 ("say", "m302", H, "A little swallow is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "m303b", B, ("" if "swallowtip" in CUTS else "Swallows swoop low over a field, catching tiny insects. ") + "Look high, and look low!", {"pre": .3, "post": .1}),
 ("say", "m304", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Momo reads the three cards) and the countdown
 ("scene", "goals"), ("say", "m401", M, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m402", M, "A freely suspended magnet.", {"pre": .3, "post": .3}),
 ("say", "m403", M, "The North-South direction.", {"pre": .3, "post": .3}), ("say", "m404", M, "Earth is like a magnet.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP20's dare (a short 3 s ring: the answer was locked in at the end of EP20)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "m501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "m502", H, "Locked in!", {"pre": 0}),
 ("say", "m503m", M, "One! My spinning top falls over a different way every time. So will the magnet!", {"pre": .5, "kw": [["top", "spinning"]]}),
 ("say", "m504p", P, "Two. Magnets follow rules. Unlike poles attract every single time.", {"pre": .4}),
 ("say", "m505b", B, "Two! I tried it at home. The red end always stopped facing my bedroom window!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · BE THE HANGING MAGNET (the journey; the buddies ride along, shrunk, on top of the magnet round the string's knot): spun round and
 #          round, slowing, swinging past a line and back, turned gently back by something you cannot see, stopping facing the rain tree;
 #          spun again, the rain tree again
 ("scene", "waitw"),
 ("say", "m601", H, "Be the hanging magnet! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jspin"),
 ("say", "m602", H, "You are a bar magnet, hanging on a string. A giant finger spins you round and round!", {**SLOW, "pre": 0, "post": .8, "kw": [["jfinger", "finger"]]}),
 ("say", "m603", H, "Slower now. You swing past a line, and back again. Something you cannot see turns you gently back.", {**SLOW, "pre": .2, "post": .8, "kw": [["jslow", "slower"], ["jswing", "swing"], ["jback", "turns"]]}),
 ("say", "m604", H, "You stop, with your red end facing the big rain tree. A spin again! Slower, and slower. You stop. The rain tree again!", {**SLOW, "pre": .2, "kw": [["jstop", "stop", 0], ["jagain", "spin"], ["jstop2", "stop", 1]]}),
 ("wait", 1.0),
 # ---- 7 · pull back out; the answer (two, the same way every time); Pip and Basil were right, so the Buddies score too; Basil explains
 #          and marks the line with two cones
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m701", H, "The answer is two: the same way every time! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["chart1", "same"], ["coin1", "one"]]}),
 ("say", "m702b", B, "Every time, it comes to rest with its red end facing the rain tree. Let's mark the line with two cones!", {"pre": .3, "kw": [["cones", "cones"]]}),
 *cut("pipwhy", [("say", "m706", P, "So it is not a spinning top. Magnets really do follow a rule!", {"pre": .3})]),
 # ---- 8 · Pip's guess (the steel goalpost turns it); [LOOK CLOSER] the same line in three places (the field far from the goalpost, the
 #          classroom, a lid in a basin of water): FREELY SUSPENDED (Momo), NORTH-SOUTH DIRECTION (Basil); Mark Sentence 1 (Basil): 6.17
 ("scene", "goal"),
 ("say", "m801p", P, "I think I know why. The red end faces the goalpost. Magnets attract steel, so the goalpost turns it.", {"pre": .5}),
 ("scene", "lcplaces"),
 ("say", "m802", H, "Look closer. Hang it in the middle of the field, far from the goalpost.", {**LC, "pre": 1.2, "kw": [["field", "middle"]]}),
 ("say", "m803", H, "Hang it in the classroom. Float it on a plastic lid in a basin of water.", {**LC, "pre": .3, "kw": [["room", "classroom"], ["basin", "float"]]}),
 *cut("lcfloat", [("say", "m807", M, "Even floating on water, it turns to the same line!", {"pre": .2})]),
 ("say", "m804", H, "Every time, it comes to rest along the same line. This line runs North and South.", {**LC, "pre": .3, "kw": [["sameline", "same"], ["nsline", "north"]]}),
 ("say", "m805m", M, "Freely suspended means hanging so that it can turn freely, such as a magnet on a string!", {"pre": .3, "kw": [["kw_freely_suspended", "freely", 0]]}),
 HOLD("kw_freely_suspended"),
 ("say", "m806b", B, "The North-South direction means the line from North to South, such as the line between our cones. One end faces North, and the other end faces South.", {"pre": .2, "kw": [["kw_north_south_direction", "north-south"], ["endN", "faces", 0], ["endS", "faces", 1]]}),
 HOLD("kw_north_south_direction"),
 *VERDICT("v_places"),
 ("scene", "mark1"),
 ("say", "m808", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m809", B, M617, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 9 · HOLD ON! Basil: "nobody is holding it, so it is free"; Pip fixes it (the bench rubs; hung up, it turns freely again)
 ("scene", "holdon"),
 ("say", "m901b", B, "My turn! My string got tangled, so I laid the magnet on the bench. Nobody is holding it, so it is free! But it stops a different way every time.", {"pre": .5, "post": .2, "kw": [["tangle", "tangled"], ["try", "laid"]]}),
 ("say", "m902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m903", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "m904p", P, "Watch. The bench rubs on the magnet and stops it turning. I hang it up, and it turns freely again!", {"pre": .3, "post": .2, "kw": [["rubs", "rubs"], ["hangup", "hang"], ["freeturn", "freely"]]}),
 ("say", "m906", H, "A freely suspended magnet must be free to turn.", {"pre": .3}),
 *cut("basiltangle", [("say", "m905", B, "Oops! Free to turn, not just free from my paws.", {"pre": .2, "post": .1})]),
 # ---- 10 · Momo's question (how does it know?), Basil's half-right guess; [LOOK CLOSER] fly up until you see the whole Earth: little hanging
 #           magnets all over the world come to rest North-South; EARTH BEHAVES LIKE A MAGNET (Heart, the book's term; Basil says what it
 #           means); Mark Sentence 2 (Pip): 6.16
 ("scene", "earthq"),
 ("say", "m1001m", M, "But how does the magnet know which way is North?" + ("" if "momotouch" in CUTS else " Nothing is touching it!"), {"pre": .5}),
 ("say", "m1002b", B, "Maybe a giant magnet is hiding somewhere, turning it round!", {"pre": .3}),
 ("scene", "lcearth"),
 ("say", "m1003", H, "Look closer. Fly up, above Singapore, until you can see the whole Earth.", {**LC, "pre": 1.2, "kw": [["up", "fly"], ["earth", "earth"]]}),
 ("say", "m1004", H, "All over the world, freely suspended magnets come to rest in the North-South direction.", {**LC, "pre": .3, "kw": [["everywhere", "all"]]}),
 ("say", "m1005", H, "Basil is nearly right. Earth behaves like a magnet, with its own North and South poles.", {**LC, "pre": .3, "term": ["behaves like a magnet"], "kw": [["kw_earth_behaves_like_a_magnet", "earth"], ["poles2", "poles"]]}),
 HOLD("kw_earth_behaves_like_a_magnet"),
 ("say", "m1006b", B, "So the Earth turns my magnet round, without even touching it!", {"pre": .2, "kw": [["chartEarth", "touching"]]}),
 *VERDICT("v_earth"),
 ("scene", "mark2"),
 ("say", "m1007", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m1008", P, M616, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 11 · score hand, the swallow (and its fun fact), the key words
 ("scene", "final"),
 ("say", "m1101", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "m1102", H, "Did you spot the swallow? It was on the rim of the netball hoop!", {"pre": .6, "post": .2}),
 ("say", "m1103b", B, "Here is a fun fact! Every year, swallows fly to Singapore from far away. Many birds can feel the Earth's magnet, and it helps them find their way!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_map", "swallows"], ["ff_earth", "feel"], ["ff_way", "way"]]}),
 ("say", "m1104", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Freely suspended", "North-South direction", "Earth behaves like a magnet"]),
 # ---- 12 · the cliffhanger: Momo's hiking compass; its needle lines up with Basil's cones too. Is the needle a magnet?
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1201m", M, "Look! My compass needle lines up with Basil's cones too. Is the needle a magnet?", {"pre": .3, "kw": [["compass", "compass"], ["qneedle", "is"]]}),
 ("say", "m1202", H, "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "North-South" and "Earth"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we learnt that a freely suspended magnet comes to rest in the North-South direction, every time. That is because Earth behaves like a magnet.", {"pre": .4, "post": .6, "gap": .7, "kw": [["pic2", "north-south"], ["pic3", "earth"]]}),
 # ---- 2 · Pulau Ubin on Saturday morning: the jetty, THE TRAIL MAP (its compass rose empty); the buddies step off a bumboat (boat); the game
 #          and the hidden sea turtle (ONE smooth push-in onto the turtle's head beside a jetty pillar: the INTRO spot)
 ("scene", "jetty"), ("wait", .5), ("mark", "boat"), ("wait", .6),
 *cut("ubinhello", [("say", "n201", M, "Welcome to Pulau Ubin! My compass will help us find the way to the beach.", {"pre": .2, "post": .2})]),
 ("scene", "game"),
 ("say", "n202", H, "A little sea turtle is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 *cut("turtletip", [("say", "n203b", B, "Turtles pop up to breathe. Watch the water!", {"pre": .3, "post": .2})]),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads)
 ("scene", "goals"), ("say", "n301", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302", B, "How a compass works.", {"pre": .3, "post": .3}),
 ("say", "n303", B, "A magnet near a compass.", {"pre": .3, "post": .3}), ("say", "n304", B, "Telling the direction.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: Basil brings his bar magnet close to Momo's compass. What happens? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Basil brings his bar magnet close to Momo's compass. What happens? One, nothing happens. Two, the needle turns. Three, the needle spins " + ("" if "roundround" in CUTS else "round and round, ") + "forever. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0}),
 ("say", "n403p", P, "One. A compass needle always points North and South. Nothing can change that.", {"pre": .5}),
 ("say", "n404m", M, "Two! I think the needle is a tiny magnet. Then Basil's magnet can attract it, or repel it.", {"pre": .4}),
 ("say", "n405b", B, "Two! My magnet pulls and pushes other magnets. The needle will turn!", {"pre": .4}),
 ("wait", .15),
 # ---- 5 · BE THE COMPASS NEEDLE (the journey; the buddies ride along on the rim of the dial inside the case): balanced on a pin, you
 #          settle North; a bar magnet comes: your red end is pushed away; turned round, it is pulled in; it goes, you swing back North-South
 ("scene", "waitw"),
 ("say", "n501", H, "Be the compass needle! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jpin"),
 ("say", "n502", H, "You are the needle inside a compass, balanced on a tiny pin. You can turn freely.", {**SLOW, "pre": 0, "post": .8, "kw": [["jfree", "freely"]]}),
 ("say", "n503", H, "You swing, and slow, and stop. Your red end points to the North.", {**SLOW, "pre": .2, "post": .8, "kw": [["jsettle", "swing"], ["jnorth", "north"]]}),
 ("say", "n504", H, "Here comes a bar magnet! Your red end is pushed away. The magnet turns round, and now your red end is pulled in.", {**SLOW, "pre": .2, "post": .8, "kw": [["jcome", "comes"], ["jpush", "pushed"], ["jturn", "turns"], ["jpull", "pulled"]]}),
 ("say", "n505", H, "The magnet goes away. You swing back to the North-South direction.", {**SLOW, "pre": .2, "kw": [["jback", "goes"], ["jns", "north-south"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (two, the needle turns); Momo and Basil were right, so the Buddies score too; NEEDLE (Basil)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "r1ans"),
 ("say", "n601", H, "The answer is two: the needle turns towards or away from the magnet! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "n602b", B, "The needle is the small magnet inside a compass, such as this thin red one. My magnet attracted one end, and repelled the other!", {"pre": .3, "kw": [["kw_needle", "needle", 0], ["needle", "attracted"]]}),
 HOLD("kw_needle"),
 *cut("basilrepel", [("say", "n603", B, "It repelled my magnet, so the needle is a magnet. The repel test!", {"pre": .2})]),
 # ---- 7 · Basil's guess (the needle turns with the compass); [LOOK CLOSER] turn the compass under the still needle; put the N under the
 #          red end; COMPASS (Momo); the trail map's rose fills and the route lights (the reveal); Mark Sentence 1 (Momo): 6.15
 ("scene", "trail"),
 ("say", "n701b", B, "Easy! The needle points to the letter N. If I turn the compass round, the needle turns round with it!", {"pre": .3}),
 ("scene", "lcuse"),
 ("say", "n702", H, "Look closer. Turn the compass round. The letters turn, but the needle does not!", {**LC, "pre": 1.2, "kw": [["turn", "turn", 0], ["still", "not"]]}),
 ("say", "n703", H, "So turn the compass until the N sits under the needle's red end. Now you know which way is North!", {**LC, "pre": .3, "kw": [["setN", "sits"], ["rose", "north"]]}),
 ("say", "n704m", M, "A compass is a tool that helps us find the direction, such as my hiking compass!", {"pre": .2, "kw": [["kw_compass", "compass", 0]]}),
 HOLD("kw_compass"),
 *cut("n7spoon", [("say", "n705", H, "Long ago in China, people made a compass shaped like a spoon. The spoon was a magnet. On a smooth plate, it could turn freely, and it came to rest in the North-South direction.", {**LC, "pre": .3})]),
 *VERDICT("v_use"),
 ("scene", "mark1"),
 ("say", "n706", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n707", M, M615, {"pre": 0, "gap": .6, "kw": [["route", "find"]]}),
 ("wait", 2.5),
 # ---- 8 · Showdown: Momo's compass checklist (double points); the fix (line 3 struck, rewritten in green)
 ("scene", "showcard"), ("wait", .8 if "showhold" in CUTS else 1.0),
 ("scene", "show"),
 ("say", "n801", H, "Showdown! Double points. Momo's compass checklist has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 ("say", "n802m", M, "One, two, three." if "checklist" in CUTS else "One: hold the compass flat, so the needle can turn freely. Two: wait until the needle stops moving. Three: keep Basil's magnet right next to the compass, to help it.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "n803", H, "Locked in!", {"pre": 0}),
 ("say", "n804b", B, "Three! My magnet attracts and repels the needle. Then the needle cannot show the North-South direction!", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .3),
 ("say", "n805", H, "Three fingers? Put up two more on your score hand!" + ("" if "phonesline" in CUTS else " Keep magnets and phones away from your compass."), {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 9 · Pip's question (night?); [LOOK CLOSER] a ship in the Singapore Strait at night, a hiker in fog in the United States; TELL THE
 #          DIRECTION (Pip); Mark Sentence 2 (Pip): 6.16's "Hence" line
 ("scene", "bwalk"),
 ("say", "n901p", P, "But what if it is night, and we cannot see the Sun? Will a compass still work?", {"pre": .3}),
 ("scene", "lcnight"),
 ("say", "n902", H, "Look closer. At night, a ship sails in the Singapore Strait. Clouds hide the stars.", {**LC, "pre": 1.2, "kw": [["ship", "ship"], ["clouds", "clouds"]]}),
 ("say", "n903", H, "But the needle in the ship's compass still comes to rest in the North-South direction.", {**LC, "pre": .3, "kw": [["shipneedle", "rest"]]}),
 ("say", "n904", H, "Far away in the United States, a hiker is lost in thick fog. Her compass works there too!", {**LC, "pre": .3, "kw": [["fog", "far"], ["hiker", "works"]]}),
 ("say", "n905p", P, "Tell the direction means find out which way is North, South, East or West, such as on a ship at night!", {"pre": .2, "kw": [["kw_tell_the_direction", "tell", 0]]}),
 HOLD("kw_tell_the_direction"),
 *VERDICT("v_night"),
 ("scene", "mark2"),
 ("say", "n906", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n907", P, M616H, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the sea turtle (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .3}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the sea turtle? It was in the seagrass, at the end of the boardwalk!", {"pre": .3, "post": .2}),
 ("say", "n1103p", P, "Here is a fun fact! Sea turtles can feel the Earth's magnet. It helps them find their way across the ocean, back to the beach where they hatched!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_baby", "turtles"], ["ff_ocean", "ocean"], ["ff_home", "hatched"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .3}),
 # ---- 12 · the dare for Episode 22 (the jetty: Pip strokes an iron nail with Basil's magnet, always the same way; the cards come in BEFORE
 #           the nail reaches the clips)
 ("scene", "dare"),
 ("mark", "stroke"), ("wait", .6), ("mark", "dareIn"), ("wait", .2),
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["strokeq", "strokes"]]}),
 *cut("nextjoke", [("say", "n1202", M, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Needle", "Compass", "Tell the direction"]),   # the order the words were learnt (the shelf order: NEEDLE pops first; the script table lists Compass first)
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP20, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
