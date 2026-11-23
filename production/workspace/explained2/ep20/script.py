"""script.py: P3 EP20 "Magnets that float in mid-air: poles, pulls and pushes" (Ch 6, Properties of Magnets, pp. 105-109: two poles, the
strongest pull at the poles, attract and repel, unlike and like poles, the repel test), Part 1 ("Why Does This Magnet FLOAT? Two Poles, a Pull
and a Push") and Part 2 ("Flip It and It SNAPS! Like Poles, Unlike Poles, and Is It a Magnet?"): the script (../p3_ep20_script.md, version 1
of 23 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov) as data. Every spoken line is word for word as in the script's
tables (sections 3 to 5). make_voice.py records the lines; build_tl.py lays them on the timeline. Line ids as in the script's section 6:
m... Part 1, n... Part 2 (m<segment><nn>, a letter for a buddy line, s for a book strip).

The dare that opens Part 1 is EP19's closing dare ({NEXT_DARE} of ../ep19/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): asserted below against EP19_NEXT and, when it is there, against ../ep19/script.py itself. The dare into
EP21 is NEXT_DARE below.

Pace (SERIES_FORMAT 3): as EP15 to EP19. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a book strip stays up >= 3.5 s (opts "hold"). Journeys (SLOW): Heart .85, 1.0 s between sentences,
softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP16 to EP19): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Respellings: m1010 (Mark Sentence 6.9, Basil): the card and the caption print the book's "attract (pull) or repel (push)"; Basil SAYS
"attract, pull, or repel, push," (the brackets read as short pauses: script, Facts to check 10). Stage 1 test clip
../pron_clips/Heart_ep20_new_words.mp3: see STATE.md. No Singapore name is spoken.

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures).
  Part 1: ringsIn, budsIn, paw (cold open: Pip sets the pencil down; the buddies lean in; Basil's paw through the gap), title; board (today:
  THE POLES BOARD); press (Pip presses the ring in his pick); the journey (dive, jslide, jbelow, jslow, jpush, jstop, jpress, jharder,
  jspring, jgap); lcpoles: dip, lift, bunch, middle, north, red, blue, stars, shapes, ringpoles; holdon: try, flip, click, flipback;
  lcpushpull: roll, pull, click2, push, away, board2; cliff: pairs1, pairs2, blueends.
  Part 2: pic1 / pic2 / pic3 (recap); train (Basil brings the toy train); the journey (dive, jtrack, jengine, jroll, jaway, jnever, jturn,
  jclick, jsame); lclike: ns, sn, nn, ss, sstoo, rings, floats, flipr, snap; rule (6.14 written across the fridge card); l1 / l2 / l3 (Pip's
  homework lines light), strike, rewrite, qnail; lctest: bars, pullall, turn, push, never, bmagnet, note; dare: string, spin, dareIn, spinq.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back). "If a part must lose more" (section 6, in order): Part 1
  spidertip, titleslam, holdshort; Part 2 trainline, lizardtip, pipreason, showhold, then small pacing trims.
  Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip in use (6.7), the pauses around new terms, a buddy's
  explanation of a key word, the rings' payoff.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"momonudge", "basiloops", "pencilcase", "strip610", "strip611", "momofix", "nextjoke",   # script section 6: in use from the start, for length
        "spidertip", "titleslam", "holdshort",                  # Stage 1: Part 1 was 5:38.1, so section 6's "If a part must lose more" list for Part 1, in order
        "trainline", "lizardtip", "pipreason", "showhold"}      # Stage 1: Part 2 was 5:57.1, so section 6's list for Part 2, in full, in order (+ pacing trims below)
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP19's dare into EP20 (../ep19/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP19_NEXT = "Next time: two ring magnets on a pencil! The top one floats in mid-air, with no glue and no string. What holds it up? One, a pull. Two, a push. Lock in your answer!"
_ep19 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep19", "script.py")
if os.path.exists(_ep19):
    _m = re.search(r'^NEXT_DARE = "(.*)"$', open(_ep19).read(), re.M)
    assert _m and _m.group(1) == EP19_NEXT, "EP19's NEXT_DARE changed: update Block A"
DARE_Q1 = "Two ring magnets on a pencil! The top one floats in mid-air, with no glue and no string. What holds it up?"
DARE_Q2 = "One, a pull. Two, a push."
assert "Next time: two ring magnets on a pencil! " + DARE_Q1[len("Two ring magnets on a pencil! "):] + " " + DARE_Q2 + " Lock in your answer!" == EP19_NEXT
DARE_CARDS = ["A pull", "A push"]   # EP19's own two cards (NEXT_CARDS)
DARE_LABEL = "What holds it up?"
DARE_SHORT = "What holds up the top ring?"
DARE_CLUES = ["no glue", "no string", "a gap"]
# Block B: the dare into EP21 (plan row 21, "Hang a magnet and it points North-South. Every time."); EP21's answer: 2, the same way every time
NEXT_DARE = "Next time: Basil hangs his bar magnet on a string, so it can turn freely. He spins it again and again. Where does it stop? One, a different way every time. Two, the same way every time. Lock in your answer!"
NEXT_CARDS = ["A different way every time", "The same way every time"]
NEXT_JOKE = "I will spin it so fast, it gets dizzy!"

# the chant (Part 2): call and response, YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Unlike poles?", "Attract!"), ("Like poles?", "Repel!"), ("Does it repel a magnet?", "Then it is a magnet!")]
CHANT_CAPS = ([1.0, .9, 1.45], [.9, .8, 1.45])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
STRIP = 3.5
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# 6.9 read aloud: the brackets as short pauses (script, Facts to check 10); the card and caption keep the book's brackets
M69 = "Magnets can attract (pull) or repel (push) one another. This depends on which poles are facing each other."
M69_SAID = {"attract (pull) or repel (push) one": "attract, pull, or repel, push, one"}

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
 # ---- 1 · silent cold open: a school science room, Monday after school. THE POLES BOARD on the whiteboard, empty; the class stationery
 #          tray of steel paper clips, Basil's bar magnet, two round pencils on the front bench. Pip carries in his pencil in its lump of
 #          plasticine and sets it down (ringsIn): the top ring floats; Momo and Basil lean in (budsIn); Basil's paw through the gap (paw)
 ("scene", "cold"), ("wait", .8), ("mark", "ringsIn"), ("wait", 1.8), ("mark", "budsIn"), ("wait", 1.4), ("mark", "paw"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP19's dare, word for word, then the title
 ("scene", "lasttime"),
 ("say", "m201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "m202", H, DARE_Q1, {"pre": .3}),
 ("say", "m203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "m204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "titleslam" in CUTS else 2.2),
 # ---- 3 · today (the camera glides to THE POLES BOARD), the game, and the hidden spider (named first; ONE smooth push-in from the science
 #          room onto the spider in the window frame's top corner: the INTRO spot)
 ("scene", "today"),
 ("say", "m301", H, "Today, we find out where a magnet pulls the hardest, and how a magnet can push!", {"pre": .4, "post": .6, "kw": [["board", "where"]]}),
 ("scene", "game"),
 ("say", "m302", H, "A little spider is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "m303b", B, "Spiders love quiet corners. " + ("Look in the corners!" if "spidertip" in CUTS else "Look in the corners, and look for a thin silk thread!"), {"pre": .3, "post": .1}),
 ("say", "m304", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Basil reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "m401", B, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m402", B, "Two poles.", {"pre": .3, "post": .3}),
 ("say", "m403", B, "Where the pull is strongest.", {"pre": .3, "post": .3}), ("say", "m404", B, "Attract and repel.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP19's dare (a short 3 s ring: the answer was locked in at the end of EP19)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "m501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "m502", H, "Locked in!", {"pre": 0}),
 ("say", "m503m", M, "One, a pull! Magnets attract, and attract means pull. We learnt that last time!", {"pre": .5}),
 ("say", "m504p", P, "Two. When I press the top ring down, I can feel it pushing back up on my finger.", {"pre": .4, "kw": [["press", "press"]]}),
 ("say", "m505b", B, "Two, a push! A pull would bring it down onto the other ring. Something must be pushing it up!", {"pre": .4}),
 ("wait", .15),
 # ---- 6 · BE THE TOP RING MAGNET (the journey; the buddies ride along, shrunk, on the plasticine at the pencil's foot): the slide down
 #          the pencil, the slow stop in mid-air on a push, Pip presses you down (the push grows), you spring back, you look into the gap
 ("scene", "waitw"),
 ("say", "m601", H, "Be the top ring magnet! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jslide"),
 ("say", "m602", H, "You are a ring magnet, sliding down a pencil like a pole at the playground. Below you is another ring magnet.", {**SLOW, "pre": 0, "post": .8, "kw": [["jbelow", "below"]]}),
 ("say", "m603", H, "Closer, and you slow down. Something you cannot see is pushing up on you. You stop in mid-air, and bob gently.", {**SLOW, "pre": .2, "post": .8, "kw": [["jslow", "slow"], ["jpush", "pushing"], ["jstop", "stop"]]}),
 ("say", "m604", H, "Pip presses you down. The closer you get, the harder the push. He lets go, and up you spring!", {**SLOW, "pre": .2, "post": .8, "kw": [["jpress", "presses"], ["jharder", "harder"], ["jspring", "spring"]]}),
 ("say", "m605", H, "Look down. Between the rings is a gap with nothing in it. No glue, and no string. Just a push.", {**SLOW, "pre": .2, "kw": [["jgap", "gap"]]}),
 ("wait", 1.0),
 # ---- 7 · pull back out; the answer (two, a push); only Pip and Basil were right, so the Buddies score too; Pip explains
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m701", H, "The answer is two: a push! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "m702p", P, "The bottom ring pushes up on the top ring. So the top ring floats on the push!", {"pre": .3}),
 *cut("momonudge", [("say", "m705", H, "Momo, magnets do attract. But today, we will see that they can push too.", {"pre": .3})]),
 # ---- 8 · Basil's question (the middle pulls most?); [LOOK CLOSER] the class's steel paper clips bunch at the two ends: POLES (Pip),
 #          the strip 6.7 and ATTRACTION (Momo), every shape has two poles, the ring's on its flat sides; Mark Sentence 1 (Momo): 6.6 + 6.8
 ("scene", "bench"),
 ("say", "m801b", B, "Which part of a magnet pulls and pushes the most? I think it is the middle, because it is the biggest part!", {"pre": .5}),
 ("scene", "lcpoles"),
 ("say", "m802", H, "Look closer. Dip a bar magnet into the steel paper clips from our class stationery tray.", {**LC, "pre": 1.2, "kw": [["dip", "dip"]]}),
 ("say", "m803", H, "Lift it up. The clips hang in bunches at the two ends. The middle has hardly any.", {**LC, "pre": .3, "kw": [["lift", "lift"], ["bunch", "bunches"], ["middle", "middle"]]}),
 ("say", "m804", H, "These two ends are the magnet's poles.", {**LC, "pre": .3, "term": ["poles"], "kw": [["kw_poles", "poles"]]}),
 HOLD("kw_poles"),
 ("say", "m805p", P, "Every magnet has two poles: a North pole and a South pole. On this magnet, North is painted red, and South is painted blue!", {"pre": .2, "kw": [["north", "north"], ["red", "red"], ["blue", "blue"]]}),
 ("say", "m805s", H, "The bar magnet has the strongest pull or attraction at the two poles.", {**LC, "pre": .3, "hold": STRIP, "term": ["attraction"], "kw": [["kw_attraction", "attraction"]]}),
 HOLD("kw_attraction"),
 ("say", "m807m", M, "Attraction is another word for the pull. It is strongest at the two poles, not in the middle!", {"pre": .2, "kw": [["stars", "strongest"]]}),
 *cut("basiloops", [("say", "m806b", B, "Oops! Not the middle. The two poles pull the most!", {"pre": .2, "post": .1})]),
 ("say", "m808", H, "Every magnet has two poles, whatever its shape. A ring magnet's poles are on its two flat sides, one on top, and one underneath.", {**LC, "pre": .3, "kw": [["shapes", "shape"], ["ringpoles", "ring"]]}),
 *VERDICT("v_poles"),
 ("scene", "mark1"),
 ("say", "m809", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m810", M, "A magnet has two poles. It has a North pole and a South pole. A magnet has two poles where attraction is the strongest.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 9 · HOLD ON! Pip: "the top ring will not come down, so it must be broken"; Basil fixes it (turned over, it snaps down: a pull)
 ("scene", "holdon"),
 ("say", "m901p", P, "My turn! The top ring will not come down to touch the other ring. Magnets attract, so this ring must be broken!", {"pre": .5, "post": .2, "kw": [["try", "will"]]}),
 ("say", "m902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m903", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "m904b", B, "Watch! I turn the top ring over and let it go. Click! It snaps right down. It is not broken at all!", {"pre": .3, "post": .2, "kw": [["flip", "turn"], ["click", "click"]]}),
 ("say", "m905", H, "The floating ring was pushed, not broken." if "holdshort" in CUTS else "Turned over, the rings pull together. The floating ring was pushed, not broken.", {"pre": .3, "kw": [["flipback", "floating"]]}),
 # ---- 10 · Momo's question (push AND pull? how?); [LOOK CLOSER] two bar magnets on round pencils: they roll together; turned round, one
 #           rolls away: REPEL (Basil), "it depends which poles face" (Pip); the verdict; Mark Sentence 2 (Basil): 6.9
 ("scene", "pushpull"),
 ("say", "m1001m", M, "So the same two magnets can push and pull? How does that work?", {"pre": .5}),
 ("scene", "lcpushpull"),
 ("say", "m1002", H, "Look closer. Two bar magnets lie on round pencils, so they can roll.", {**LC, "pre": 1.2, "kw": [["roll", "roll"]]}),
 ("say", "m1003", H, "A red end and a blue end: they roll together and click, even before they touch.", {**LC, "pre": .3, "kw": [["pull", "red"], ["click2", "click"]]}),
 ("say", "m1004", H, "Now turn one round. Two red ends: one magnet rolls away. The gap never closes.", {**LC, "pre": .3, "kw": [["push", "turn"], ["away", "away"]]}),
 *cut("pencilcase", [("say", "m1006", H, "That is the pull that snaps a magnetic pencil case shut.", {**LC, "pre": .3})]),
 ("say", "m1005", H, "When magnets push each other away, we say they repel.", {**LC, "pre": .3, "term": ["repel"], "kw": [["kw_repel", "repel"]]}),
 HOLD("kw_repel"),
 ("say", "m1007b", B, "Repel means push! Magnets can push each other away, without even touching!", {"pre": .2}),
 ("say", "m1008p", P, "And it depends on which poles are facing each other!", {"pre": .2, "kw": [["board2", "depends"]]}),
 *VERDICT("v_pushpull"),
 ("scene", "mark2"),
 ("say", "m1009", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m1010", B, M69, {"pre": 0, "gap": .6, "pron": M69_SAID}),
 ("wait", 2.5),
 # ---- 11 · score hand, the spider (and its fun fact), the key words
 ("scene", "final"),
 ("say", "m1101", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "m1102", H, "Did you spot the spider? It was hanging on its silk thread, under the bench!", {"pre": .6, "post": .2}),
 ("say", "m1103b", B, "Here is a fun fact! Many baby spiders can fly with no wings. They let out long silk threads, and the wind lifts them up into the sky!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_grass", "baby"], ["ff_up", "wind"], ["ff_far", "sky"]]}),
 ("say", "m1104", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Poles", "Attraction", "Repel"]),
 # ---- 12 · the cliffhanger: Basil with two bar magnets: red to blue pulls (click), red to red pushes, two blue ends stop just apart: ?
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1201b", B, "A red end and a blue end pull. Two red ends push. But what about two blue ends? Is there a rule?", {"pre": .3, "kw": [["pairs1", "red", 0], ["pairs2", "two"], ["blueends", "blue", 1]]}),
 ("say", "m1202", H, "Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "top" and "turn"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we learnt that a magnet has two poles, where its pull is strongest. The top ring floats on a push. But turn it over, and it pulls!", {"pre": .4, "post": .6, "gap": .7, "kw": [["pic2", "top"], ["pic3", "turn"]], "post": .3}),   # Stage 1 trim for length: post .6 -> .3
 # ---- 2 · Pip's HDB kitchen that evening (WHICH POLES FACE? on the fridge door, empty): Basil brings his toy train; the game and the hidden
 #          lizard (ONE smooth push-in onto the lizard on the kitchen wall beside the ceiling light: the INTRO spot)
 ("scene", "kitchen"), ("wait", .5), ("mark", "train"), ("wait", .4),
 *cut("trainline", [("say", "n201b", B, "I brought my toy train! Its carriages join up with magnets.", {"pre": .2, "post": .2})]),
 ("scene", "game"),
 ("say", "n202", H, "A little lizard is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "n203m", M, ("" if "lizardtip" in CUTS else "Lizards love walls near a light, where little insects fly. ") + "Look up high!", {"pre": .3, "post": .2}),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Pip reads)
 ("scene", "goals"), ("say", "n301", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302", P, "Unlike and like poles.", {"pre": .3, "post": .3}),
 ("say", "n303", P, "Why the ring floats.", {"pre": .3, "post": .3}), ("say", "n304", P, "Is it a magnet?", {"pre": .3, "post": .7}),   # Stage 1: post .9 -> .7 for length
 # ---- 4 · Round 1: two magnets push apart; Basil turns one round. What happens? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Two bar magnets push apart. Basil turns one of them round. What happens? One, they still push apart. Two, they pull together. Three, nothing happens. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0}),
 ("say", "n403m", M, "Two! When Basil turned the ring over, the push became a pull.", {"pre": .5}),
 *cut("pipreason", [("say", "n404p", P, "Two. Turning it round puts its other pole in front.", {"pre": .4})]),
 ("say", "n405b", B, "One! It is the same magnet, just turned round. So it still pushes!", {"pre": .4}),
 ("wait", .15),   # Stage 1 trim (was .3)
 # ---- 5 · BE A TOY TRAIN CARRIAGE (the journey; the buddies ride along on the open wagon behind you): pushed away from the engine without
 #          touching; Basil turns you round; click, you pull together; only the end facing the engine changed
 ("scene", "waitw"),
 ("say", "n501", H, "Be a toy train carriage! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtrack"),
 ("say", "n502", H, "You are a toy train carriage, with a small magnet at each end. Ahead of you is the engine.", {**SLOW, "pre": 0, "post": .8, "kw": [["jengine", "engine"]]}),
 ("say", "n503", H, "Roll closer. The engine rolls away from you! You never touch it. Something is pushing it away.", {**SLOW, "pre": .2, "post": .8, "kw": [["jroll", "roll"], ["jaway", "rolls"], ["jnever", "never"]]}),
 ("say", "n504", H, "Basil turns you round. Now your other end faces the engine. Roll closer, and click! You pull together.", {**SLOW, "pre": .2, "post": .8, "kw": [["jturn", "turns"], ["jclick", "click"]]}),
 ("say", "n505", H, "Same carriage, same engine. Only the end facing the engine has changed.", {**SLOW, "pre": .2, "kw": [["jsame", "same"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (two, they pull together); Momo and Pip were right, so the Buddies score too
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "r1ans"),
 ("say", "n601", H, "The answer is two: they pull together! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 # ---- 7 · Momo's guess (two North poles?); [LOOK CLOSER] each pair of poles meets and the fridge card fills box by box: UNLIKE POLES
 #          (Pip), LIKE POLES (Basil, South and South too); the rings' payoff; the rule across the card; Mark Sentence 1 (Pip): 6.14
 ("scene", "fridge"),
 ("say", "n701m", M, "I know! When two magnets push apart, they must both be North poles. Right?", {"pre": .3}),   # Stage 1: pre .5 -> .3
 ("scene", "lclike"),
 ("say", "n702", H, "Look closer. Two bar magnets: North is red, and South is blue. North pole to South pole: they pull together.", {**LC, "pre": 1.2, "kw": [["ns", "north", 1], ["sn", "together"]]}),
 *cut("strip610", [("say", "n704s", H, "Unlike poles of two magnets attract each other. The North pole of a magnet will attract the South pole of another magnet.", {**LC, "pre": .3, "hold": STRIP})]),
 ("say", "n703p", P, "Unlike means not the same. A North pole and a South pole are unlike poles, so they attract!", {"pre": .2, "kw": [["kw_unlike_poles", "unlike", 0]]}),
 HOLD("kw_unlike_poles"),
 ("say", "n705", H, "North pole to North pole: they push apart. And South pole to South pole? They push apart too!", {**LC, "pre": .3, "kw": [["nn", "north"], ["ss", "south"], ["sstoo", "too"]]}),
 *cut("strip611", [("say", "n706s", H, "Like poles of two magnets repel each other. The North pole of a magnet will repel the North pole of another magnet. Similarly, the South pole of a magnet will repel the South pole of another magnet.", {**LC, "pre": .3, "hold": STRIP})]),
 ("say", "n707b", B, "Like means the same. North and North, or South and South, are like poles, so they repel!", {"pre": .2, "kw": [["kw_like_poles", "like", 0]]}),
 HOLD("kw_like_poles"),
 *cut("momofix", [("say", "n708m", M, "Oh! So two South poles push apart too, not only two North poles.", {"pre": .2})]),
 ("say", "n709", H, "Now look at Pip's rings. In our picture, the two faces that meet are both North poles. Like poles repel, so the top ring floats.", {**LC, "pre": .3, "kw": [["rings", "rings"], ["floats", "floats"]]}),
 ("say", "n710", H, "Turn it over, and a South pole meets a North pole. Unlike poles attract, so it snaps down.", {**LC, "pre": .3, "kw": [["flipr", "turn"], ["snap", "snaps"]]}),
 *VERDICT("v_like"),
 ("scene", "mark1"),
 ("say", "n711", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n712", P, "Unlike poles attract and like poles repel.", {"pre": 0, "gap": .6, "kw": [["rule", "unlike"]]}),
 ("wait", 2.5),
 # ---- 8 · Showdown: Pip's homework (double points); the fix (line 3 struck, rewritten in green; a ? by the nail)
 ("scene", "showcard"), ("wait", .8 if "showhold" in CUTS else 1.0),
 ("scene", "show"),
 ("say", "n801", H, "Showdown! Double points. Pip's homework has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),   # Stage 1: pre .5 -> .3
 ("say", "n802p", P, "One: a North pole attracted a South pole. Two: two South poles pushed apart. Three: my magnet attracted the iron nail, so the nail is a magnet.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "n803", H, "Locked in!", {"pre": 0}),
 ("say", "n804b", B, "Three! My magnet attracts iron nails and steel paper clips, and they are not magnets. Being attracted does not prove it!", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .4), ("mark", "qnail"), ("wait", .2),   # Stage 1 trims (were .3, .5, .5, .3)
 ("say", "n805", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 # ---- 9 · Pip's question (how can I prove it?); [LOOK CLOSER] Dad's two grey bars: both are attracted; turned round, bar B pushes the magnet
 #          away; THE REPEL TEST (Momo); the note card under the fridge card; Mark Sentence 2 (Basil): 6.13
 ("scene", "bars"),
 ("say", "n901p", P, "Then how can I prove that something is a magnet?", {"pre": .3}),   # Stage 1: pre .5 -> .3
 ("scene", "lctest"),
 ("say", "n902", H, "Look closer. These two grey bars look exactly the same. One is a magnet. The other is just a bar of iron.", {**LC, "pre": 1.2, "kw": [["bars", "grey"]]}),
 ("say", "n903", H, "Basil's magnet pulls both bars, at both ends. So being pulled does not tell us which one is the magnet.", {**LC, "pre": .3, "kw": [["pullall", "pulls"]]}),
 ("say", "n904", H, "Now turn Basil's magnet round. One end of bar B pushes it away! Bar A never pushes.", {**LC, "pre": .3, "kw": [["turn", "turn"], ["push", "pushes", 0], ["never", "never"]]}),
 ("say", "n905b", B, "Bar B repelled my magnet. So bar B is the magnet!", {"pre": .2, "kw": [["bmagnet", "magnet", 1]]}),
 ("say", "n906m", M, "That is the repel test! If it repels a magnet, it is a magnet. Being pulled is not enough.", {"pre": .2, "kw": [["kw_the_repel_test", "repel", 0], ["note", "enough"]]}),
 HOLD("kw_the_repel_test"),
 *VERDICT("v_test"),
 ("scene", "mark2"),
 ("say", "n907", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n908", B, "A magnet can attract or repel another magnet. You can confirm that an object is a magnet if it repels another magnet.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the lizard (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .3}),   # Stage 1: post .5 -> .3
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the lizard? It was upside down on the ceiling, above the fridge!", {"pre": .3, "post": .2}),   # Stage 1: pre .5 -> .3
 ("say", "n1103m", M, "Here is a fun fact! A lizard's toes are covered with tiny hairs, too small to see. They help it hold on, even upside down on the ceiling, with no glue and no magnet!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_toe", "hairs"], ["ff_ceiling", "ceiling"], ["ff_no", "glue"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .3}),   # Stage 1: post .5 -> .3
 # ---- 12 · the dare for Episode 21 (the kitchen: Basil hangs his bar magnet on a string; Pip spins it; the cards come in BEFORE it stops)
 ("scene", "dare"),
 ("mark", "string"), ("wait", .4), ("mark", "spin"), ("wait", .3), ("mark", "dareIn"), ("wait", .2),   # Stage 1 trims (were .6, .4)
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["spinq", "spins"]]}),
 *cut("nextjoke", [("say", "n1202", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Unlike poles", "Like poles", "The repel test"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP19, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
