"""script.py: P3 EP22 "Turn a nail into a magnet (the stroke method)" (Ch 7, Making and Using Magnets, pp. 113-114: magnetised, the stroke
method and its steps, the test with steel clips, more strokes make a stronger magnet), Part 1 ("Stroke an Iron Nail Again and Again. Is It
a MAGNET Now?") and Part 2 ("Back and Forth, or One Way? Make the STRONGEST Nail Magnet"): the script (../p3_ep22_script.md, version 1 of
24 Nov 2026, Opus, written to SERIES_FORMAT.md as it stands on 23 Nov) as data. Every spoken line is word for word as in the script's
tables (sections 3 to 5). make_voice.py records the lines; build_tl.py lays them on the timeline. Line ids as in the script's section 6:
m... Part 1, n... Part 2 (m<segment><nn>, a letter for a buddy line, s for a book strip read by Heart).

The dare that opens Part 1 is EP21's closing dare ({NEXT_DARE} of ../ep21/script.py), word for word, without "Next time:" and "Lock in your
answer!" (EP14's own convention): asserted below against EP21_NEXT and, when it is there, against ../ep21/script.py itself (NEXT_DARE and
NEXT_CARDS). The dare into EP23 is NEXT_DARE below.

Definitions (the teacher's pattern): a buddy who defines a describing word says "X means ..., such as ..." (MAGNETISED, Basil, m806b; SAME
DIRECTION, Momo, n705m; SAME POLE, Basil, n806b); a buddy who defines a thing says "A ... is a ... that ..., such as ..." (STROKE METHOD,
Basil, m704b; MAGNETIC OBJECT, Pip, m1005p; STRONGER MAGNET, Pip, n905p). As written in the script.

Pace (SERIES_FORMAT 3): as EP15 to EP21. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a sentence with a NEW
TERM (opts "term") is said a little slower and followed by >= .65 s; a key word pops large and holds 2.0 s (HOLD); Mark Sentence cards hold
2.5 s after the buddy's last word; a cream book strip stays up >= 3.5 s (opts "hold": STRIP; 7.2 step 4 in Part 1's HOLD ON!, 7.2 step 3
in Part 2's Showdown fix). Journeys (SLOW): Heart .85, 1.0 s between sentences, softer. LOOK CLOSER (LC): Heart .85, .8 s between
sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items (as EP16 to EP21): ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs, gap) ·
("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap, soft, term, kw [[mark, word, nth]],
hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

Marks the picture and the sound share (every action sound lands ON its mark; Stage 2 draws each action AT its mark):
  all: kw_* (key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), ansglow / coin1 / coin2, ff_* (fun-fact pictures),
  strip (the cream book strip).
  Part 1: stroke0, budsIn (cold open: Pip strokes the nail at the folding table; Basil and Momo lean in), title; board, rods (today: OUR
  FISHING GAME); away, uncle (the Round 1 picks' pictures); the journey (dive, jlie, jstroke, jslide, jtip, jlift, jback, jagain, jcarry,
  jclips); rod1 (the clipboard's Rod 1 box filled); lcnail: new, still, pull, notmag, boxed, pipjump; nopoint (the grey no-point pill);
  holdon: try, jumpmag, onmag, boxit, chipfar; lcthings: chop, things, check, stroke, away2, test, steel, list; cliff: rub, flip, qnail.
  Part 2: pic1 / pic2 / pic3 (recap); pondIn (the maker space, THE FISHING POND); the journey (dive, jtray, jnail1, jbasil, jwobble, jstill,
  jgone, jpip, jjump, jfriend); pipnail, basnail (r1ans); lcway: pole1, slide, lift, never, again, compare; l1 / l2 / l3 (Pip's poster
  lines light), strike, rewrite; fishdip, slip (lc2q); lcmore: count, same, away, dip, bunch; bigfish, chart (pond: the reveal); dare: coil,
  dareIn, coilq.

CUTS (script section 6, non-teaching). Put a tag in CUTS to drop that beat, then rebuild the timeline. Those in use from the start are set
  below (section 6 of the script keeps the words so a line can come back). "If a part must lose more" (section 6, in order): Part 1
  titleslam, woodtip, todayline, nopointline, then small pacing trims (coldtrim, backtrim, clifftrim); Part 2 anttip, fishline, onepole,
  showhold, posterread. Never cut: a [LOOK CLOSER], a journey step, a Mark Sentence card, a book strip that is in use (7.2's steps 4 and
  3), the pauses around new terms, a buddy's explanation of a key word, the new nail over still clips, the four things' check before
  stroking, the magnet being put away before every test.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"basilwhy", "momofix", "basiloops", "lcnone", "sevenone", "basilgotit", "usbridge", "nextjoke",   # script section 6: in use from the start, for length
        "titleslam", "woodtip", "anttip", "fishline"}   # Stage 1: section 6's "lose more" list, in order, until each part is inside 5:35
# Stage 1: with section 6's cuts in use the timelines gave Part 1 5:36.9 and Part 2 5:39.6 (inside the 5:46 the teacher accepted, but over
# the 5:15-5:35 target). Section 6's "If a part must lose more" list was applied IN ORDER until each part was inside 5:35: Part 1
# `titleslam` (the title's second slam: the hold 2.2 -> 1.6 s) and `woodtip` (Basil's tip -> "Listen for a tap, tap, tap!"); Part 2
# `anttip` (Basil's ant tip, n202b) and `fishline` (Heart's "Watch! The hook with thirty strokes lifts the big fish out of the pond!" becomes
# picture and sound only: the reel's click and the pluck on `bigfish`, the FISH CAUGHT row on `chart`). Nothing that teaches was cut.
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP21's dare into EP22 (../ep21/script.py NEXT_DARE), without "Next time:" and "Lock in your answer!", word for word
EP21_NEXT = "Next time: Pip strokes an iron nail with Basil's magnet, again and again, always the same way. Then he holds the nail near some steel paper clips. What happens? One, nothing happens. Two, the nail attracts the clips. Lock in your answer!"
_ep21 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep21", "script.py")
if os.path.exists(_ep21):
    _m = re.search(r'^NEXT_DARE = "(.*)"$', open(_ep21).read(), re.M)
    assert _m and _m.group(1) == EP21_NEXT, "EP21's NEXT_DARE changed: update Block A"
DARE_Q1 = "Pip strokes an iron nail with Basil's magnet, again and again, always the same way. Then he holds the nail near some steel paper clips. What happens?"
DARE_Q2 = "One, nothing happens. Two, the nail attracts the clips."
assert "Next time: " + DARE_Q1 + " " + DARE_Q2 + " Lock in your answer!" == EP21_NEXT
DARE_CARDS = ["Nothing happens", "The nail attracts the clips"]   # EP21's own two cards (NEXT_CARDS)
if os.path.exists(_ep21):
    _c = re.search(r'^NEXT_CARDS = (\[.*\])$', open(_ep21).read(), re.M)
    assert _c and eval(_c.group(1)) == DARE_CARDS, "EP21's NEXT_CARDS changed: update DARE_CARDS"
DARE_LABEL = "What happens?"
DARE_SHORT = "Pip's nail meets the steel paper clips. What happens?"
DARE_CLUES = ["an iron nail", "stroked again and again", "the same way"]
# Block B: the dare into EP23 (plan row 23, "The magnet you can switch off: electromagnets"); EP23's answer: 2, they drop off
NEXT_DARE = "Next time: Momo coils a long wire round a new iron nail, and joins its two ends to a battery. The nail attracts some steel paper clips. Then she takes the battery away. What happens to the clips? One, they stay on the nail. Two, they drop off. Lock in your answer!"
NEXT_CARDS = ["They stay on the nail", "They drop off"]
NEXT_JOKE = "A magnet with an off switch? I need one for my snack box!"

# the chant (Part 2): call and response, YOUR TURN! after each line. Left as written (a chant).
CHANT = [("Which way?", "The same direction!"), ("Which end?", "The same pole!"), ("More strokes?", "A stronger magnet!")]
CHANT_CAPS = ([1.0, 1.0, 1.2], [1.35, 1.2, 1.4])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
STRIP = 3.5                                        # a cream book strip stays up >= 3.5 s
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# the book's sentences (definitions file rows 7.1 to 7.3; read exactly as printed)
M71A = "A magnetic object can be made into a magnet using the stroke method or the electrical method."   # 7.1, first sentence (cut: `sevenone`, EP23's)
M71 = "When a magnetic object becomes a magnet, we say that it has been magnetised."                  # 7.1, second sentence (Part 1 Mark Sentence 1)
M72 = "We can turn a magnetic object into a magnet by stroking it with a strong magnet."              # 7.2 (Part 1 Mark Sentence 2)
M72_12 = "Stroke the iron nail with one pole of a bar magnet. Repeat the strokes in the same direction each time."   # 7.2 steps 1, 2 (Part 2 Mark Sentence 1)
M72_3 = "Make sure to stroke the iron nail with the same pole."                                       # 7.2 step 3 (Part 2, the Showdown's strip)
M72_4 = "Test the magnetised iron nail by placing it near some steel clips. Observe if the iron nail attracts any steel clips."   # 7.2 step 4 (Part 1, the HOLD ON!'s strip)
M73 = "The iron nail will become a stronger magnet when it is stroked more times with the magnet."    # 7.3 (Part 2 Mark Sentence 2)

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
 # ---- 1 · silent cold open: a hardware shop at an HDB neighbourhood centre, Saturday morning. At the wooden folding table outside, Pip
 #          strokes an iron nail with Basil's magnet's red end, head to tip, lifting away each time (stroke0: three strokes); Basil and Momo
 #          lean in (budsIn)
 ("scene", "cold"), ("wait", .6), ("mark", "stroke0"), ("wait", 1.6), ("mark", "budsIn"), ("wait", 3.8 if "coldtrim" not in CUTS else 2.8),
 # ---- 2 · "Last time...": EP21's dare, word for word, then the title
 ("scene", "lasttime"),
 ("say", "m201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "m202", H, DARE_Q1, {"pre": .3}),
 ("say", "m203", H, DARE_Q2, {"pre": .4, "gap": 1.45, "post": 1.9}),
 ("scene", "back"),
 ("say", "m204", H, "Hold on to your answer!", {"pre": .4, "post": .3 if "backtrim" not in CUTS else .1}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "titleslam" in CUTS else 2.2),
 # ---- 3 · today (the camera glides to OUR FISHING GAME on its little easel: 3 rods · 1 magnet!), the game, and the hidden woodpecker
 #          (named first; ONE smooth push-in from the square onto the woodpecker on the angsana trunk: the INTRO spot)
 ("scene", "today"),
 *([("wait", .6), ("mark", "board"), ("wait", .6)] if "todayline" in CUTS else
   [("say", "m301", H, "Today, we find out what the strokes did to Pip's nail!", {"pre": .4, "post": .3, "kw": [["board", "what"]]})]),
 ("say", "m302m", M, "Our fishing game needs three hooks to catch paper fish. But we only have one magnet!", {"pre": .3, "post": .3, "kw": [["rods", "three"]]}),
 ("scene", "game"),
 ("say", "m303", H, "A little woodpecker is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "m304b", B, "Listen for a tap, tap, tap" + ("!" if "woodtip" in CUTS else ", on the trees and the wooden poles!"), {"pre": .3, "post": .1}),
 ("say", "m305", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 4 · today's goals (Pip reads the three cards) and the countdown
 ("scene", "goals"), ("say", "m401", P, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m402", P, "What magnetised means.", {"pre": .3, "post": .3}),
 ("say", "m403", P, "How to test the nail.", {"pre": .3, "post": .3}), ("say", "m404", P, "What can be magnetised.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: EP21's dare (a short 3 s ring: the answer was locked in at the end of EP21)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "m501", H, "Round one! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "m502", H, "Locked in!", {"pre": 0}),
 ("say", "m503m", M, "One. The magnet has gone away now, so the nail is just a nail again.", {"pre": .5, "kw": [["away", "away"]]}),
 ("say", "m504p", P, "Two. An iron nail is made of a magnetic material, so it always attracts steel clips.", {"pre": .4}),
 ("say", "m505b", B, "Two! The hardware shop uncle strokes his screwdriver with a magnet. Then it holds tiny screws!", {"pre": .4, "kw": [["uncle", "uncle"]]}),
 ("wait", .15),
 # ---- 6 · BE THE IRON NAIL (the journey; the buddies ride along, shrunk, on the table beside your flat head): the giant magnet lands on
 #          your head, slides to your tip, lifts up and away, comes back to your head, again and again; carried to the clips, they jump up
 ("scene", "waitw"),
 ("say", "m601", H, "Be the iron nail! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jlie"),
 ("say", "m602", H, "You are an iron nail, lying on a wooden table. A giant magnet comes down, onto your flat head.", {**SLOW, "pre": 0, "post": .8, "kw": [["jstroke", "giant"], ["jhead", "flat"]]}),
 ("say", "m603", H, "It slides all the way along you, to your sharp tip. Then it lifts up and away, and comes back down on your head.", {**SLOW, "pre": .2, "post": .8, "kw": [["jslide", "slides"], ["jtip", "sharp"], ["jlift", "lifts"], ["jback", "comes"]]}),
 ("say", "m604", H, "Again, and again, always the same way. Now a giant hand carries you down to the steel clips. They jump up, and cling to your tip!", {**SLOW, "pre": .2, "kw": [["jagain", "again", 0], ["jcarry", "carries"], ["jclips", "jump"]]}),
 ("wait", 1.0),
 # ---- 7 · pull back out; the answer (two, the nail attracts the clips); only Basil was right for the right reason (Pip's reason is tested
 #          next: a grey ? by the BUDDIES score); Basil explains and names the book's method (STROKE METHOD)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m701", H, "The answer is two: the nail attracts the clips! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["rod1", "attracts"], ["coin1", "one"]]}),
 *cut("basilwhy", [("say", "m703b", B, "Pip stroked the nail with my magnet, and now the nail attracts clips, just like the uncle's screwdriver!", {"pre": .3})]),
 ("say", "m704b", B, "The stroke method is a way to make a magnet that uses a strong magnet, such as my bar magnet stroking Pip's iron nail!", {"pre": .3, "kw": [["kw_stroke_method", "stroke", 0]]}),
 HOLD("kw_stroke_method"),
 # ---- 8 · Pip's claim (iron nails always attract steel clips); [LOOK CLOSER] was it a magnet already? a new nail from the same bag over
 #          still clips; the magnet pulls it, but it is not a magnet; Pip's nail with the magnet shut away: the clips jump: MAGNETISED (Heart
 #          names the book's word, Basil says what it means); Pip's right card, wrong reason: no point; Mark Sentence 1 (Basil): 7.1
 ("scene", "pipclaim"),
 ("say", "m801p", P, "See? Iron nails always attract steel clips!", {"pre": .5}),
 ("scene", "lcnail"),
 ("say", "m802", H, "Look closer. Here is a new nail from the same bag. Nobody has stroked it.", {**LC, "pre": 1.2, "kw": [["new", "new"]]}),
 ("say", "m803", H, "Hold it over the steel clips. Not one clip jumps up.", {**LC, "pre": .3, "kw": [["still", "not"]]}),
 ("say", "m804", H, "Basil's magnet pulls the new nail, because iron is a magnetic material. But the new nail is not a magnet.", {**LC, "pre": .3, "kw": [["pull", "pulls"], ["notmag", "not"]]}),
 ("say", "m805", H, "Now Pip's nail, with the magnet shut away in its box. The clips jump up! Pip's nail has been magnetised.", {**LC, "pre": .3, "term": ["magnetised"], "kw": [["boxed", "shut"], ["pipjump", "jump"], ["kw_magnetised", "magnetised"]]}),
 HOLD("kw_magnetised"),
 ("say", "m806b", B, "Magnetised means made into a magnet, such as Pip's nail after all those strokes!", {"pre": .2}),
 *cut("momofix", [("say", "m806m", M, "Oh! The magnet went away, but Pip's nail stayed a magnet.", {"pre": .2})]),
 *VERDICT("v_magnetised"),
 *([("mark", "nopoint"), ("wait", 1.6)] if "nopointline" in CUTS else
   [("say", "m807", H, "Pip had the right card for the wrong reason, so the Buddies get no point.", {"pre": .1, "post": .2, "kw": [["nopoint", "right"]]})]),
 ("scene", "mark1"),
 ("say", "m808", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m809", B, (M71 if "sevenone" in CUTS else M71A + " " + M71), {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 9 · HOLD ON! Basil tests his one-stroke nail with the magnet still in his paw: the clips are on the magnet; Pip fixes it (put the
 #          magnet away first); the book's step 4 on a cream strip (Heart)
 ("scene", "holdon"),
 ("say", "m901b", B, "My turn! I made Rod Two's hook with just one stroke. Look, the steel clips jump up!", {"pre": .5, "post": .2, "kw": [["try", "one"], ["jumpmag", "jump"]]}),
 ("say", "m902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m903", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "m904p", P, "Look where the clips are, Basil. They are on your magnet, not on your nail! Put the magnet away first, then test the nail.", {"pre": .3, "post": .2, "kw": [["onmag", "magnet", 0], ["boxit", "away"], ["chipfar", "test"]]}),
 ("mark", "strip"),
 ("say", "m905s", H, M72_4, {"pre": .3, "hold": STRIP}),
 *cut("basiloops", [("say", "m906b", B, "Oops! I was testing my magnet, not my nail.", {"pre": .2, "post": .1})]),
 # ---- 10 · Momo's idea (stroke anything enough and it becomes a magnet); [LOOK CLOSER] copper wire, aluminium foil, a wooden chopstick and
 #           a new steel screwdriver: checked, stroked the same way, tested with the magnet away: only the screwdriver; MAGNETIC OBJECT (Pip);
 #           Mark Sentence 2 (Pip): 7.2
 ("scene", "lcq2"),
 ("say", "m1001m", M, "If we stroke anything enough times, it will become a magnet. Even my wooden chopstick!", {"pre": .5, "kw": [["chop", "chopstick"]]}),
 ("scene", "lcthings"),
 ("say", "m1002", H, "Look closer. A copper wire, aluminium foil, a wooden chopstick and a new steel screwdriver. Before stroking, none of them attracts any clips.", {**LC, "pre": 1.2, "kw": [["things", "copper"], ["check", "before"]]}),
 ("say", "m1003", H, "Stroke each one the same way, the same number of times. " + ("" if "lcnone" in CUTS else "The copper wire, the foil and the chopstick still attract no clips. ") + "Now only the steel screwdriver attracts the clips.", {**LC, "pre": .3, "kw": [["stroke", "stroke"], ["away2", "times"], ["test", "only"]]}),
 ("say", "m1004", H, "Steel is a magnetic material, like iron.", {**LC, "pre": .3, "kw": [["steel", "steel"]]}),
 ("say", "m1005p", P, "A magnetic object is an object that is made of a magnetic material, such as an iron nail or a steel screwdriver.", {"pre": .2, "kw": [["kw_magnetic_object", "magnetic", 0]]}),
 HOLD("kw_magnetic_object"),
 ("mark", "list"),
 *VERDICT("v_only"),
 ("scene", "mark2"),
 ("say", "m1006", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m1007", P, M72, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 11 · score hand, the woodpecker (and its fun fact), the key words
 ("scene", "final"),
 ("say", "m1101", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "m1102", H, "Did you spot the woodpecker? It was on the handle of a broom, outside the hardware shop!", {"pre": .6, "post": .2}),
 ("say", "m1103m", M, "Here is a fun fact! A woodpecker pecks again and again, many times every second, like super-fast strokes! And its tongue is so long, it wraps round the back of its head!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_peck", "pecks"], ["ff_nail", "strokes"], ["ff_tongue", "tongue"]]}),
 ("say", "m1104", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Stroke method", "Magnetised", "Magnetic object"]),
 # ---- 12 · the cliffhanger: Basil's fast way (a new nail rubbed back and forth, then with the blue end too)
 ("scene", "cliff"), ("wait", .3 if "clifftrim" not in CUTS else .1),
 ("say", "m1201b", B, "My way is faster! Back and forth, with both ends of the magnet. My hook will be the strongest!", {"pre": .3, "kw": [["rub", "back"], ["flip", "both"], ["qnail", "strongest"]]}),
 ("say", "m1202", H, "Will Basil's fast way work? Find out in Part Two!", {"pre": .3}),
 ("mark", "cliffend"), ("wait", .7 if "clifftrim" not in CUTS else .4),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "magnetised" and "Only"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we learnt that an iron nail can be magnetised by the stroke method. Only a magnetic object can be made into a magnet.", {"pre": .4, "post": .6, "gap": .7, "kw": [["pic2", "magnetised"], ["pic3", "only"]]}),
 # ---- 2 · the school maker space on Monday after school: THE FISHING POND on the near bench (pondIn); the game and the hidden ant (ONE
 #          smooth push-in onto the ant beside a biscuit crumb on the window ledge, by Basil's snack box: the INTRO spot)
 ("scene", "maker"), ("wait", .4), ("mark", "pondIn"), ("wait", 1.2),
 ("scene", "game"),
 ("say", "n201", H, "A little ant is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 *cut("anttip", [("say", "n202b", B, "Ants love crumbs! Check near my snack box.", {"pre": .3, "post": .2})]),
 ("say", "n203", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Momo reads)
 ("scene", "goals"), ("say", "n301", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302", M, "One way, one pole.", {"pre": .3, "post": .3}),
 ("say", "n303", M, "The same pole.", {"pre": .3, "post": .3}), ("say", "n304", M, "More strokes, stronger.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: Basil's back-and-forth nail or Pip's one-way nail, the same number of strokes: which attracts more steel clips? (ring 5 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Basil rubbed his nail back and forth, with both ends of the magnet. Pip stroked his one way, " + ("" if "onepole" in CUTS else "with one pole, ") + "the same number of times. Which nail attracts more steel clips? One, Basil's. Two, Pip's. Three, both the same. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0}),
 ("say", "n403b", B, "One! Back and forth is twice the rubbing. So my nail is twice as strong!", {"pre": .5}),
 ("say", "n404p", P, "Two. I lifted the magnet away after every stroke, so I never rubbed it the wrong way.", {"pre": .4}),
 ("say", "n405m", M, "Two! Rubbing back, or with the other end, can undo the stroke before.", {"pre": .4}),
 ("wait", .15),
 # ---- 5 · BE A STEEL PAPER CLIP (the journey; the buddies ride along on the clips round you): Basil's nail hardly pulls you; Pip's nail
 #          pulls you up, and a friend clings to you
 ("scene", "waitw"),
 ("say", "n501", H, "Be a steel paper clip! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtray"),
 ("say", "n502", H, "You are a steel paper clip, lying in a tray with your friends. A giant nail comes down from above.", {**SLOW, "pre": 0, "post": .8, "kw": [["jnail1", "giant"]]}),
 ("say", "n503", H, "It is Basil's nail. You wobble a little, and then you lie still. It hardly pulls you at all.", {**SLOW, "pre": .2, "post": .8, "kw": [["jbasil", "basil's"], ["jwobble", "wobble"], ["jstill", "still"], ["jgone", "hardly"]]}),
 ("say", "n504", H, "Here comes Pip's nail. You slide, you tip up, and you jump! You cling to its tip, and a friend clings to you!", {**SLOW, "pre": .2, "kw": [["jpip", "comes"], ["jjump", "jump"], ["jfriend", "friend"]]}),
 ("wait", 1.0),
 # ---- 6 · pull back out; the answer (two, Pip's nail); Pip and Momo were right, so the Buddies score too; Momo explains
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "r1ans"),
 ("say", "n601", H, "The answer is two: Pip's nail! Did you show two fingers? Put one finger up!", {"pre": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "n602m", M, "Pip's strokes all went the same way, so every stroke helped. Basil's back and forth undid his own work!", {"pre": .3, "kw": [["pipnail", "pip's"], ["basnail", "basil's"]]}),
 # ---- 7 · Basil's question (how do I get back to the head?); [LOOK CLOSER] the stroke slowed down: one pole on the head, slide to the
 #          tip, lift up and away in a big curve, back to the head; the one-way arrows stack; SAME DIRECTION (Momo); Mark Sentence 1 (Pip):
 #          7.2 steps 1 and 2
 ("scene", "ask"),
 ("say", "n701b", B, "So how do I get back to the head of the nail, without rubbing it the wrong way?", {"pre": .3}),
 ("scene", "lcway"),
 ("say", "n702", H, "Look closer. Put one pole of the magnet on the head of the nail. Slide it all the way to the tip.", {**LC, "pre": 1.2, "kw": [["pole1", "pole"], ["slide", "slide"]]}),
 ("say", "n703", H, "Then lift it up and away, in a big curve, back to the head. Never slide it back along the nail.", {**LC, "pre": .3, "kw": [["lift", "lift"], ["never", "never"]]}),
 ("say", "n704", H, "Stroke after stroke, the magnet moves the same way.", {**LC, "pre": .3, "kw": [["again", "stroke", 0], ["compare", "same"]]}),
 ("say", "n705m", M, "Same direction means the same way every time, such as from the head of the nail to its tip, stroke after stroke!", {"pre": .2, "kw": [["kw_same_direction", "same", 0]]}),
 HOLD("kw_same_direction"),
 *VERDICT("v_way"),
 ("scene", "mark1"),
 ("say", "n706", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n707", P, M72_12, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 *cut("basilgotit", [("say", "n708b", B, "Lift it up and away. Got it! No more back and forth for me.", {"pre": .2})]),
 *cut("usbridge", [("say", "n709h", H, "Children in the United States learn the same steps, with a nail and a bar magnet from a science kit.", {"pre": .3})]),
 # ---- 8 · Showdown: Pip's poster (double points); the fix (line 3 struck, rewritten in green); SAME POLE (Basil); the book's step 3 on a
 #          cream strip (Heart)
 ("scene", "showcard"), ("wait", .8 if "showhold" in CUTS else 1.0),
 ("scene", "show"),
 ("say", "n801", H, "Showdown! Double points. Pip's poster for the class party has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 ("say", "n802p", P, "One, two, three." if "posterread" in CUTS else "One: stroke from the head to the tip, with the red end. Two: lift the magnet away, back to the head. Three: halfway, turn the magnet round and use the blue end too, for more strength.", {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 5.0),
 ("say", "n803", H, "Locked in!", {"pre": 0}),
 ("say", "n804b", B, "Three! Switching to the other end undoes the strokes, just like my back and forth did.", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .3),
 ("say", "n805", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two"]]}),
 ("say", "n806b", B, "Same pole means the same end of the magnet every time, such as the red North pole, for every single stroke!", {"pre": .2, "kw": [["kw_same_pole", "same", 0]]}),
 HOLD("kw_same_pole"),
 ("mark", "strip"),
 ("say", "n807s", H, M72_3, {"pre": .2, "hold": STRIP}),
 # ---- 9 · Momo's question (the big fish has two clips: how do we make a hook strong enough?); [LOOK CLOSER] three new nails, the same,
 #          ten, twenty and thirty strokes, the magnet away, dipped into the clips: the more strokes, the more clips; STRONGER MAGNET (Pip);
 #          the thirty-stroke hook lifts the big fish (the reveal); Mark Sentence 2 (Basil): 7.3
 ("scene", "lc2q"), ("wait", .2), ("mark", "fishdip"),
 ("say", "n901m", M, "Our big fish has two clips on its nose. How do we make a hook strong enough to catch it?", {"pre": .3, "kw": [["slip", "two"]]}),
 ("scene", "lcmore"),
 ("say", "n902", H, "Look closer. Three new nails, all the same, get ten, twenty and thirty strokes.", {**LC, "pre": 1.2, "kw": [["same", "same"], ["count", "ten"]]}),
 ("say", "n903", H, "Put the magnet away. Then dip each nail into the steel clips.", {**LC, "pre": .3, "kw": [["away", "away"], ["dip", "dip"]]}),
 ("say", "n904", H, "The more strokes a nail gets, the more steel clips it attracts.", {**LC, "pre": .3, "kw": [["bunch", "more", 1]]}),
 ("say", "n905p", P, "A stronger magnet is a magnet that attracts more steel clips, such as the nail with thirty strokes!", {"pre": .2, "kw": [["kw_stronger_magnet", "stronger", 0]]}),
 HOLD("kw_stronger_magnet"),
 *VERDICT("v_more"),
 ("scene", "pond"),
 *([("wait", .4), ("mark", "bigfish"), ("wait", 1.6), ("mark", "chart"), ("wait", 1.2)] if "fishline" in CUTS else
   [("say", "n906", H, "Watch! The hook with thirty strokes lifts the big fish out of the pond!", {"pre": .3, "post": .4, "kw": [["bigfish", "lifts"], ["chart", "pond"]]})]),
 ("scene", "mark2"),
 ("say", "n907", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n908", B, M73, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the ant (and its fun fact)
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .3}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the ant? It was on the edge of the sink, leading a little line of ants!", {"pre": .3, "post": .2}),
 ("say", "n1103b", B, "Here is a fun fact! When an ant finds food, it leaves a smell path on its way home. More ants follow the same path, again and again, and the smell gets stronger!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_food", "finds"], ["ff_follow", "follow"], ["ff_strong", "stronger"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .3}),
 # ---- 12 · the dare for Episode 23 (the maker space: Momo coils a wire round a NEW iron nail and joins it to a battery: clips jump to its
 #           tip; the cards come in BEFORE the battery is taken away)
 ("scene", "dare"),
 ("mark", "coil"), ("wait", .6), ("mark", "dareIn"), ("wait", .2),
 ("say", "n1201", H, NEXT_DARE, {"pre": 0, "kw": [["coilq", "coils"]]}),
 *cut("nextjoke", [("say", "n1202b", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 13 · the key words
 *kwrecap(["Same direction", "Same pole", "Stronger magnet"]),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}

if __name__ == "__main__":
    # a quick self-check: unique ids, the dare matches EP21, lines per speaker
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1 and not i.startswith(("h", "u", "hk_", "uk_", "c1003"))}
    assert not dup, dup
    for part, s in SEQS.items():
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}")
