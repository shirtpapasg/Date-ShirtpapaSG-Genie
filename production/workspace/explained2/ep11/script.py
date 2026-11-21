"""script.py: P3 EP11 "See-through, blurry or blocked? Light and materials", Part 1 ("The TORCH Test: Which Glass Lets Only SOME Light
Through?") and Part 2 ("It Is WHITE. So Can Light Pass Through a Wooden Door?"): the script (../p3_ep11_script.md, version 1 of 21 Nov 2026,
with the teacher's go-ahead in its section 12: transparency taught last, the HOLD ON! on an unfair test, the door painted white, the "cloudy"
plastic box, OPAQUE white with a dark border, goldfish and moth, FROSTED GLASS a key word, the EP12 dare glass / metal / fabric) as data.
Every spoken line is word for word as in the script; a cell with two speakers is split into one line per speaker. make_voice.py records the
lines; build_tl.py lays them on the timeline.

Pace (SERIES_FORMAT.md section 3, teacher 2026-11-20): Heart speed .90, .5 s between sentences; buddies 12% slower; a sentence that says a
NEW TERM (opts "term") is said a little slower and followed by at least .65 s; a key word pops large and holds 2.0 s ("hold" item: the next
line waits until the pop has held 2.0 s and at least .6 s after the line); Mark Sentence cards hold 2.5 s after the buddy's last word; book
sentences on cream strips stay up at least 3.5 s each (opts "hold"). The journeys: Heart .85, 1.0 s between sentences, softer. LOOK CLOSER:
Heart .85 with .8 s between sentences, each moment ends on ONE verdict tag (mark v_*) held 2.5 s.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre / post = silence before / after (s; build_tl scales them by .75),
                                       speed, gap (Heart and buddies: silence between sentences), soft, term (substrings: said slowly, then
                                       >= .65 s), kw: [[mark, word, nth]] (a mark at that word's onset: a key word pops there, or a picture beat),
                                       hold: s (the cursor goes on no earlier than the line's start + s), holdw: [word, s], after: [id, s]
                                       pron: {text: spoken as} for this line only (the caption keeps the script's words; Stage 3: Pip's
                                       "opaque" in j602 came out "oh-pack" with Kokoro's own oʊpˈeɪk, "oh-pake" = ˈoʊpˈeɪk decodes as opaque)
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd)

Marks the picture and the sound use (EP10 Stage 3: every sound lands on the action, so the picture and the sound key on the SAME mark):
  kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), boardsIn / budsIn (cold open), title, row1..row3
  (a tile hops onto the board OUR TORCH TEST and its word is stamped), heading (TRANSPARENCY stamped across the board's top);
  torch actions: on1..on4 (the torch is switched on), off1..off3 (switched off, the room light comes up), robot1..robot3 (the robot is set
  behind the sheet / seen through it), spot1 (the bright spot lands), glow2 (the soft glow), split / split2 (the frame splits, before and
  after), behind (the camera slides behind the door), lift (the door is lifted: the robot is there), c1..c3 (the three cards light),
  bracket (How much light?), swap (the hands change the boxes), push / back (Basil's torch slides off / back to the TORCH MARK), swap1 (the
  frosted sheet goes in), doorIn (the white door goes in, cliffhanger), mat / tray (the doormat and the tray go in), and the journey stops
  (dive; torch, glass, card, again, frost | dive; lamp, door, frost, clear).

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then make_voice is not needed; rebuild the timeline).
  Part 1: (the title's second slam: a picture beat only, no time), button (g605 Momo "I can see every button!"), blurry (g1006 Pip "Oh! Only
          some light. And a blurry robot!"), bookwords (g701 Heart "Here are the book's words."), oops (g804 Basil "Oops! Same torch. Same
          place.", last: the three tags over the table say it).
  Part 2: snacks (j1402 Basil "A glass trolley! I could see all my snacks!"), both (j1104 Heart "Both boxes are plastic!"), notes (Pip reads
          only "My notes!" and line two; lines one and three are shown and lit, not read: j1001 is re-recorded short), colour (j505 Momo "Oh!
          White is only its colour!", last of all: if it goes, the tag "White is only its colour" must show instead).
  If a Basil line is cut, cut one of Pip's or Momo's too (Basil keeps at least as many lines as either).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()   # nothing cut at Stage 1 (see STATE.md for the lengths and the cut candidates)
cut = lambda tag, items: [] if tag in CUTS else items

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer later in the same bar), YOUR TURN! after each line,
# no all-together bar (script segment 12). One line per row of the board: the amount of light, then its word. Basil's voice leads the first
# beat of each line (make_voice.py: his call is a little louder).
CHANT = [("Most light!", "Transparent!"), ("Only some light!", "Translucent!"), ("No light!", "Opaque!")]
CHANT_CAPS = ([1.0, 1.3, .95], [1.4, 1.4, 1.2])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word (the caption / script text is unchanged). The four new words use Kokoro's own sounds (script section 12 (k):
# the test clip pron_clips/Heart_ep11_new_words.m4a was sent on 21 Nov and no change was asked); no word of EP11 is on the pronunciation list.
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys: softer and slower
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER: Heart describes what we SEE, slowly
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)            # a new term's pop: 2.0 s on screen; Heart waits at least .6 s
STRIP = 3.5                                         # a book sentence's cream strip: at least 3.5 s on screen
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]  # a look-closer's one verdict tag, held 2.5 s before the pull back
VERDICT3 = lambda mk: [("mark", mk), ("wait", 2.8)]  # Stage 3: three verdict pills land one after another (.44 s): the last one also gets 2.5 s

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w)
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .4, "quiet": True})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
# the ending, exactly as EP1 round 3 (notes 14-16): "Say it with us!", 0.8 s, "Ready?", "One!", "two!", "Now you know!" 1.0 s apart, the blast, the outro
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
 # ---- 1 · silent cold open: the living room of an HDB flat at dusk (6 s). 0:02 EP10's three dare boards slide in; 0:04 the buddies pop in
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP10's dare, word for word (one calm picture: each board steps forward as Heart says its card, >= 2.5 s each),
 #          then the board OUR TORCH TEST, then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "g202", H, "Which one lets only some light pass through? One, clear glass. Two, frosted glass. Three, a wooden door.", {"pre": .4, "gap": 1.3, "post": 1.6}),   # gap 1.3 / post 1.6: each board is forward >= 2.5 s
 ("scene", "tests"),
 ("say", "g203", H, "Hold on to your answer!", {"pre": 1.2, "post": .5}),   # pre 1.2: the board slides in first
 ("scene", "title"), ("mark", "title"), ("wait", 2.4),
 # ---- 3 · the game, and the hidden goldfish (Heart names it; its picture pops)
 ("scene", "game"),
 ("say", "g301", H, "You against the Buddies! Lock in first. One finger for every point. A little goldfish is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (Pip reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", P, "The torch test.", {"pre": .3, "post": .3}),
 ("say", "g403", P, "Transparent.", {"pre": .3, "post": .3}), ("say", "g404", P, "Translucent.", {"pre": .3, "post": .9}),
 *COUNT,
 # ---- 5 · the torch test is set up (three things; the safety rule); Basil's robot
 ("scene", "setup"),
 ("say", "g501", H, "Here is our torch test. A torch. A sheet. A white card behind it.", {"pre": .5}),
 ("say", "g502", H, "Never shine a torch at anyone's eyes.", {"pre": .6, "post": .5}),
 ("scene", "robot"),
 ("say", "g503", B, "I am too big to hide. So my robot will hide for me!", {"pre": .7, "post": .4}),   # pre .7: the robot slides in low first
 # ---- 6 · sheet one: clear glass; [LOOK CLOSER] the torch on clear glass (the bright spot; the robot seen clearly)
 ("scene", "sheet1"),
 ("say", "g601", H, "Sheet one: clear glass. Look closer.", {"pre": 1.0}),   # pre 1.0: the hands lift the clear glass and set it in the holder
 ("scene", "lcclear"),
 ("say", "g602", H, "Torch on. The light goes into the glass, and out the other side.", {**LC, "pre": 1.2, "kw": [["on1", "on"]]}),   # pre 1.2: the push-in
 ("say", "g603", H, "A bright spot lands on the card. Most of the light passed through.", {**LC, "pre": .8, "kw": [["spot1", "lands"]]}),
 ("wait", 1.0), ("mark", "off1"), ("wait", 1.0), ("mark", "robot1"), ("wait", 1.4),   # the torch goes off, the room light comes up; a hand sets the robot behind the glass; the camera swings round to look through
 ("say", "g604", H, "Now the robot stands behind the glass. We can see it clearly.", {**LC, "pre": 0}),
 ("wait", .8),
 *VERDICT("v_clear"),
 ("scene", "clearans"),
 *cut("button", [("say", "g605", M, "I can see every button!", {"pre": .5, "post": .3})]),
 ("wait", .6),
 # ---- 7 · Mark Sentence 1: transparent (Momo); TRANSPARENT pops beside the card after its last word; row 1 of the board; the book's strip
 ("scene", "mark1"),
 *cut("bookwords", [("say", "g701", H, "Here are the book's words.", {"pre": .4})]),
 ("say", "g702", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g703", M, "Some materials allow most light to pass through them. These materials are transparent.", {"pre": 0, "gap": .6}),
 ("mark", "kw_transparent"), ("wait", 2.5), HOLD("kw_transparent"),
 ("scene", "row1"), ("mark", "row1"),
 ("say", "g704", H, "You can clearly see objects placed behind transparent materials.", {"pre": 1.0, "hold": STRIP}),   # pre 1.0: the tile hops, TRANSPARENT is stamped
 # ---- 8 · HOLD ON! Basil moves the torch (an unfair test: the child crosses their arms)
 ("scene", "holdon"), ("mark", "swap1"),
 ("say", "g801", B, "Frosted glass next! I will push the torch right up close!", {"pre": 1.2, "post": .2}),   # pre 1.2: the hands change the sheets
 ("mark", "push"), ("wait", 1.2),   # the torch slides off the TORCH MARK, almost to the sheet
 ("say", "g802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .6),
 ("say", "g803", H, "Arms crossed? One finger up! The torch moved. In a good test, we change one thing only: the sheet.", {"pre": 0, "post": .3}),
 ("scene", "fixtorch"), ("mark", "back"),
 *(cut("oops", [("say", "g804", B, "Oops! Same torch. Same place.", {"pre": .8, "post": .5})]) or [("wait", 2.4)]),   # pre .8: the torch slides back first
 # ---- 9 · Round 1: the dare from EP10 (a short 3 s ring: the answer was locked in at the end of EP10)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g901", H, "Round one: the question from last time! Which one lets only some light pass through? Clear glass, frosted glass, or a wooden door? Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "g902", H, "Locked in!", {"pre": 0}),
 ("say", "g903", P, "Three. Light comes in under my bedroom door.", {"pre": .5}),
 ("say", "g904", M, "Two! Pip, that light goes under your door, not through it!", {"pre": .4}),
 ("say", "g905", B, "Two! Our bathroom window glows at night!", {"pre": .4}),
 ("wait", .3),
 # ---- 10 · [LOOK CLOSER] the torch on frosted glass (FROSTED GLASS pops); beside the clear glass; the blurry robot; the answer
 ("scene", "lcfrost"),
 ("say", "g1001", H, "Look closer. The frosted glass. Torch on.", {**LC, "pre": 1.2, "term": ["frosted glass"], "kw": [["kw_frosted_glass", "frosted"], ["on2", "on"]]}),
 HOLD("kw_frosted_glass"),
 ("say", "g1002", H, "The light goes in. On the card: only a soft, dim glow.", {**LC, "pre": .2, "kw": [["glow2", "only"]]}),
 ("wait", .5), ("mark", "split"), ("wait", .6),   # the frame splits: the clear glass's bright spot (held) beside the frosted glass's soft glow
 ("say", "g1003", H, "Beside the clear glass, it is much dimmer. Only some of the light passed through.", {**LC, "pre": .2}),
 ("wait", .8), ("mark", "off2"), ("wait", 1.0), ("mark", "robot2"), ("wait", 1.4),   # the torch goes off; a hand sets the robot behind the frosted glass; the camera swings round
 ("say", "g1004", H, "And the robot? A blurry shape. We cannot see it clearly.", {**LC, "pre": 0}),
 ("wait", .8),
 *VERDICT("v_frost"),
 ("scene", "frostans"),
 ("say", "g1005", H, "The answer is two. Frosted glass!", {"pre": .3}),
 *cut("blurry", [("say", "g1006", P, "Oh! Only some light. And a blurry robot!", {"pre": .4})]),
 ("say", "g1007", H, "Two fingers? One finger up!", {"pre": .4, "post": .4}),
 # ---- 11 · Mark Sentence 2: translucent (Basil); TRANSLUCENT pops beside the card; row 2 of the board; the book's strip
 ("scene", "mark2"),
 ("say", "g1101", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1102", B, "Some materials allow only some light to pass through them. These materials are translucent.", {"pre": 0, "gap": .6}),
 ("mark", "kw_translucent"), ("wait", 2.5), HOLD("kw_translucent"),
 ("scene", "row2"), ("mark", "row2"),
 ("say", "g1103", H, "You cannot clearly see the objects placed behind translucent materials.", {"pre": 1.0, "hold": STRIP}),
 # ---- 12 · BE THE LIGHT (the first-person journey): from the torch through the clear glass, and again through the frosted glass
 ("scene", "waitw"),
 ("say", "g1201", H, "Be the light! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "torch"),
 ("say", "g1202", H, "You are light, inside a torch. Click! Out you fly.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "glass"),
 ("say", "g1203", H, "Clear glass ahead. You pass straight through.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "card"),
 ("say", "g1204", H, "You land on the card: a bright spot!", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "again"),
 ("say", "g1205", H, "Again! Now, frosted glass.", {**SLOW, "pre": .3, "post": 1.0}),   # pre .3: the soft blink back into the torch
 ("mark", "frost"),
 ("say", "g1206", H, "Only some of you pass through. A soft glow.", {**SLOW, "pre": 0}),
 ("wait", 1.5),
 # ---- 13 · pull back out; the score hand, the goldfish, the key words
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 ("scene", "final"),
 ("say", "g1301", H, "Show me your score hand! More than one? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .6}),
 ("scene", "liz"),
 ("say", "g1302", H, "Did you spot the goldfish? It was in the glass tank, on the shelf! Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Transparent", "Frosted glass", "Translucent"]),
 # ---- 14 · the cliffhanger: the white door
 ("scene", "cliff"), ("wait", .4), ("mark", "doorIn"), ("wait", 1.0),   # the hands set the piece of the white door in the holder; the robot slides behind it
 ("say", "g1401", B, "My robot is hiding behind the door now!", {"pre": .3}),
 ("say", "g1402", H, "A wooden door, painted white. Torch on! How much light will pass through? Most, some, or none?", {"pre": .4}),
 ("say", "g1403", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "Frosted" and "Now"; each >= 2.5 s)
 ("scene", "lasttime"),
 ("say", "j101", H, "Last time, clear glass let most light pass through: transparent. Frosted glass let only some light pass through: translucent. Now, the white wooden door!", {"pre": .4, "post": 1.6}),   # post 1.6: the third picture holds 2.5 s
 # ---- 2 · the new place (the corridor at night), the game, and the hidden moth
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201", H, "Lock in first. A little moth is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals (Basil reads the three cards)
 ("scene", "goals"), ("say", "j301", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", B, "Opaque.", {"pre": .3, "post": .3}),
 ("say", "j303", B, "What transparency is.", {"pre": .3, "post": .3}), ("say", "j304", B, "Transparent, translucent, opaque.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: the white wooden door (Part 1's cliffhanger, scored)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j401", H, "Round one. A wooden door, painted white. The torch shines on it. How much light will pass through? One, most. Two, only some. Three, none. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1"),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", M, "Two! It is white, and white is bright!", {"pre": .5}),
 ("say", "j404", B, "Three! Nobody found my robot behind that door!", {"pre": .4}),
 ("say", "j405", P, "Three.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] the torch on the white wooden door: the bright front, nothing behind; the robot hidden; the answer
 ("scene", "lcdoor"),
 ("say", "j501", H, "Look closer. Torch on. The front of the door is bright.", {**LC, "pre": 1.2, "kw": [["on3", "on"]]}),
 ("wait", .4), ("mark", "behind"), ("wait", 1.2),   # the camera slides slowly along the table to the far side of the door
 ("say", "j502", H, "Now look behind it. No bright spot. No glow. No light passed through.", {**LC, "pre": 0}),
 ("wait", .6), ("mark", "off3"), ("wait", 1.4),   # the torch goes off, the corridor light comes up; the camera swings round to the door's front
 ("say", "j503", H, "And the robot? It is still behind the door. We cannot see it.", {**LC, "pre": 0, "kw": [["lift", "cannot"]]}),
 ("wait", 1.6),   # an adult's hand lifts the door: there is the robot; the door goes back
 *VERDICT("v_door"),
 ("scene", "doorans"),
 ("say", "j504", H, "The answer is three. None!", {"pre": .3}),
 *cut("colour", [("say", "j505", M, "Oh! White is only its colour!", {"pre": .4})]),
 ("say", "j506", H, "Three fingers? One finger up!", {"pre": .4, "post": .4}),
 # ---- 6 · Mark Sentence 1: opaque (Pip); OPAQUE pops beside the card; row 3: the door, a rubber mat and a metal tray; the book's strips
 ("scene", "mark1"),
 ("say", "j601", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j602", P, "Some materials do not allow any light to pass through them. These materials are opaque.", {"pre": 0, "gap": .6, "pron": {"are opaque.": "are oh-pake."}}),
 ("mark", "kw_opaque"), ("wait", 2.5), HOLD("kw_opaque"),
 ("scene", "row3"), ("mark", "row3"),
 ("say", "j603", H, "A rubber mat. A metal tray. Torch on: no light passes through.", {"pre": 1.4, "kw": [["mat", "rubber"], ["tray", "metal"], ["on5", "on"]]}),   # pre 1.4: the door's tile hops, OPAQUE is stamped
 ("say", "j604", H, "Rubber, wood and metal are opaque materials. You cannot see objects placed behind opaque materials.", {"pre": .6, "hold": 2 * STRIP}),
 # ---- 7 · [LOOK CLOSER] three sheets, three cards (watched, not scored)
 ("scene", "lcthree"),
 ("say", "j701", H, "Three sheets. The same torch. Look closer.", {**LC, "pre": 1.2}),
 ("say", "j702", H, "Most light. Only some light. No light.", {**LC, "pre": .2, "kw": [["c1", "most"], ["c2", "only"], ["c3", "no"]]}),
 ("say", "j703", H, "How much light can pass through? That has a name.", {**LC, "pre": .3, "kw": [["bracket", "how"]]}),
 ("wait", .6),
 *VERDICT3("v_three"),
 # ---- 8 · Mark Sentence 2: transparency (Basil); TRANSPARENCY pops beside the card on "transparency"; the heading is stamped on the board
 ("scene", "mark2"),
 ("say", "j801", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j802", B, "The transparency of a material refers to how much light can pass through it.", {"pre": 0, "kw": [["kw_transparency", "transparency"]]}),
 ("wait", 2.5), HOLD("kw_transparency"),
 ("scene", "heading"), ("wait", .5), ("mark", "heading"), ("wait", 1.6),
 # ---- 9 · BE THE LIGHT OF THE LAMP (the first-person journey): the door, the frosted window, the clear window (none to most)
 ("scene", "waitw"),
 ("say", "j901", H, "Be the light! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "lamp"),
 ("say", "j902", H, "You are light from a lamp, in a flat at night.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "door"),
 ("say", "j903", H, "A wooden door. You stop. You cannot pass through.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "frost"),
 ("say", "j904", H, "A frosted window. Only some of you pass through.", {**SLOW, "pre": .3, "post": 1.0}),
 ("mark", "clear"),
 ("say", "j905", H, "A clear glass window. Most of you pass through, out into the night!", {**SLOW, "pre": .3}),
 ("wait", 1.5),
 # ---- 10 · Showdown: Pip's notes (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j1001", P, "My notes! Two: this box is plastic, so it is transparent." if "notes" in CUTS else "My notes! One: a metal tray is opaque. Two: this box is plastic, so it is transparent. Three: frosted glass is translucent.", {"pre": .6, "post": .3}),
 ("say", "j1002", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "j1003", H, "Locked in!", {"pre": 0}),
 ("say", "j1004", M, "Two! I cannot see clearly into that box.", {"pre": .5}),
 ("say", "j1005", B, "Two! My lunch looks blurry in there!", {"pre": .4}),
 ("say", "j1006", P, "Oops!", {"pre": .4, "post": .3}),
 # ---- 11 · [LOOK CLOSER] a clear plastic box and a cloudy plastic box under the torch; the two tiles, the strip, the fix, +2
 ("scene", "lcbox"),
 ("say", "j1101", H, "Let's test it. Look closer.", {**LC, "pre": 1.0}),   # pre 1.0: the hands set the clear box in the holder, on its side
 ("wait", .5), ("mark", "on4"), ("wait", .6),
 ("say", "j1102", H, "A clear plastic box. A bright spot: most light.", {**LC, "pre": 0}),
 ("wait", .4), ("mark", "swap"), ("wait", 1.4),   # the hands change the boxes; the torch stays on its mark
 ("say", "j1103", H, "The cloudy plastic box. A soft glow: only some light.", {**LC, "pre": 0}),
 ("wait", .4), ("mark", "split2"), ("wait", .6),   # the frame splits: the clear box and its bright spot, the cloudy box and its soft glow
 *cut("both", [("say", "j1104", H, "Both boxes are plastic!", {**LC, "pre": 0})]),
 ("wait", .6),
 *VERDICT3("v_box"),
 ("scene", "fix"),
 ("say", "j1105", H, "Glass and some plastics are transparent. Frosted glass and some plastics are translucent.", {"pre": 1.0, "hold": 2 * STRIP}),   # pre 1.0: the two tiles hop onto the board
 ("say", "j1106", H, "Two fingers? Put up two more on your score hand!", {"pre": .5, "post": .4}),
 # ---- 12 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 13 · score hand and the moth
 ("scene", "final"),
 ("say", "j1301", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1302", H, "Did you spot the moth? It was by the corridor lamp! Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 14 · the dare for Episode 12
 ("scene", "dare"), ("wait", .5),
 ("say", "j1401", H, "Next time: a supermarket trolley! Which material would you choose to make it? One, glass. Two, metal. Three, fabric. Lock in your answer!", {"pre": 0}),
 *cut("snacks", [("say", "j1402", B, "A glass trolley! I could see all my snacks!", {"pre": .4, "post": .6})]),
 # ---- 15 · the key words
 *kwrecap(["Opaque", "Transparency"]),
 # ---- 16 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
