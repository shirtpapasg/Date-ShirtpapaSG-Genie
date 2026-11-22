"""script.py: P3 EP13 "Design a school bag like an engineer", Part 1 ("A METAL Strap? Design a School Bag Like an ENGINEER") and Part 2
("We TESTED Our New Strap. Then We Designed a ZOO Home!"): the script (../p3_ep13_script.md, version 1 of 21 Nov 2026, with the teacher's
go-ahead in its section 12: (a) the five design steps unnumbered, Heart says only "First" and "Last"; (b) fabric straps and body, a metal zip,
a plastic base; (c) nothing tears on screen (the old strap = a held picture, the new strap stops at 9); (d) testing is "After designing,
engineers test their product", not a sixth step; (e) a goat home with a wooden fence at "a zoo in Singapore", unnamed; (f) D3 answered with
the extinction sentence 1.22 + "So we take care of every kind."; (g) butterfly and frog; (h) key words TEST, DIVERSITY, EXTINCT; (i) EP14's
dare card one "the Sun moves away"; (j) on upload EP13 replaces the classic _gRJ0NwV6p0; (k) no School Lab line; (l) no extra test clips
unless a problem is heard) as data. Every spoken line is word for word as in the script, with the dare names of section 3 resolved
({DARE_Q}, {DARE_SHORT}, {CARD2_PICK}, {CARD3_PICK}: Block A; {NEXT_DARE}, {NEXT_JOKE}: Block B); a cell with two speakers is split into one
line per speaker. make_voice.py records the lines; build_tl.py lays them on the timeline.

One cell is split in two lines of ONE speaker (words unchanged, in order): {DARE_Q} = g202 (the question, .5 s between sentences) + g203 (the
three cards, 1.8 s between them and 2.0 s after), so each of EP12's boards is forward >= 2.5 s while Heart says its card without 1.8 s gaps
inside the question (EP12 said its shorter dare as one line).

Pace (SERIES_FORMAT.md section 3, teacher 2026-11-20): Heart speed .90, .5 s between sentences; buddies 12% slower; a sentence that says a
NEW TERM (opts "term") is said a little slower and followed by at least .65 s; a key word pops large and holds 2.0 s ("hold" item: the next
line waits until the pop has held 2.0 s and at least .6 s after the line); Mark Sentence cards hold 2.5 s after the buddy's last word; book
sentences on cream strips stay up at least 3.5 s each (opts "hold"). The journeys: Heart .85, 1.0 s between sentences, softer. LOOK CLOSER:
Heart .85 with .8 s between sentences, each moment ends on ONE verdict tag (mark v_*) held 2.5 s. The counted weights (j502, j503) have .35 s
between the numbers so each "tok" lands on its number about 0.9 s apart (script section 10 H).

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre / post = silence before / after (s; build_tl scales them by .75),
                                       speed, gap (Heart and buddies: silence between sentences), soft, term (substrings: said slowly, then
                                       >= .65 s), kw: [[mark, word, nth]] (a mark at that word's onset: a key word pops there, or a picture beat),
                                       hold: s (the cursor goes on no earlier than the line's start + s), holdw: [word, s], after: [id, s]
                                       pron: {text: spoken as} for this line only (the caption keeps the script's words). EP13: j902 "macaw" is
                                       re-spelt "mcaw" (Kokoro says mˈækɔː "MAK-aw"; "mcaw" gives məkˈɔː "muh-KAW", the script's sound).
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd, pron)

Marks the picture and the sound use (EP10 Stage 3's lesson: every sound lands on the action, so the picture and the sound key on the SAME mark):
  kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), boardsIn / budsIn (cold open), title.
  Part 1: lay1 / lay2 / lay3 (the fabric strap, the metal bar, the wooden stick laid over the chair's rail), flexchip, clear (the bar and the
  stick lifted away), clip (the fabric strap clipped to the bag), books (five exercise books in, .35 s apart), lift (the bag lifted by the new
  strap), notear (the magnifier on the weave), strongchip, boardtags (SUITABLE / NOT FOR THIS JOB on EP12's boards); planIn (the board OUR DESIGN
  PLAN slides in), box1 (the first box glows); booksin, zip1 (the zip closed), hang (the bag hung on the chair), fill1 (box 1 filled), glow23,
  p_straps / p_body / p_zip / p_base (each part lit as Heart names it), u_straps / u_body / u_zip / u_base (each part doing its job: hanging,
  the top opened, the zip run, the bag set down on the floor), fill23; fabhop / fabback (four fabric tiles hop to the last box and back);
  wetpic (Basil's wet canteen floor); paper, glow4, pencil (the drawing, speeded up), fill4, glow5, drop1 (the drop on plastic), drop2 (the drop
  on fabric), plastichop, wpchip, zo1 / zc1 / zo2 / zc2 (the zip open, close, open, close), ziphop, zipchip, fabhop2, flexchip2, strongchip2, fill5
  (the last box filled: five ticks); the journey (dive; jin, jzip, jzipclose, jstraps, jtight, jup, jbase, jbump, jwater, wpglow); testcard (the
  card THEN: TEST IT slides in), q (the big ? over the new strap).
  Part 2: pic1 / pic2 / pic3 (the recap pictures); rulerL / rulerW (same length, same width), w1..w9 (each weight slides on: ON its number),
  link5 (the line across to the old strap's counter at five), lens9 (the magnifier on the weave), side (old strap: 5 · new strap: 9),
  testtick (a tick on THEN: TEST IT); the journey (dive; jhang, jpull, jw1, jw2, jtight, jcount, jw6..jw9, strongchip); wipe (the bag's five
  tiles hop off the board), goatcard, zfill1..zfill4, zglow5; goatwalk, push1 / push2 (the goat pushes the rail: side, then forehead),
  strongchip, glide (the camera glides to the gap between two rails), seegoats; woodtile (the wood tile hops onto the last box; five ticks),
  glasstag (NOT FOR THIS JOB on the glass wall picture); l1 / l2 / l3 (Basil's map lines light as he reads; from j902's words), dfly (the
  dragonfly hops down to the new green line 4); zones (the full zoo map's six zones pop), glowall (a soft glow round all twelve animals).

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then rebuild the timeline; make_voice only for "map").
  Part 1: title2 (the title's second slam: a picture beat only, no time), ouch (g606 Basil "Oops. A metal bar on my shoulder? Ouch!": he does
          the oops pose in silence), shoulder (g603's last sentence "No good on a shoulder!": g603 is re-recorded without it; the labels
          *stays straight* and the blue tags still show), thousand (g1401 shortened to "Our design is done!"; Heart's "Not yet, Basil!"
          stays), soak (g1006 Pip "Oh! A fabric base would soak up the water!", last of all: then the tag *Fabric soaks up water* shows
          beside the wet fabric tile instead, wired).
  Part 2: wings (j908 Basil "Oops. The wings fooled me!": the oops pose in silence), map (Basil reads only "My zoo map!" and line two; lines
          one and three are shown and lit without being read: j902 is re-recorded short, about 6 s), variety (j1001 shortened to "A great
          variety of living things!"), notglass (j706 Basil "Not glass! A goat's knock could break it!": the picture card and its blue tag
          still show), nap (j1302 Basil's {NEXT_JOKE}, last).
  Never cut: "After designing, engineers test their product." (j505) and "So we take care of every kind." (j1005).
  If a Basil line is cut, cut one of Momo's or Pip's as well (Basil keeps at least as many lines as either).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()   # nothing cut at Stage 1 (see STATE.md for the lengths and the cut candidates)
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3) ----
# Block A: EP12's dare, as written in p3_ep12_script.md section 3 Block B (and EP12's script.py NEXT_DARE), without "Next time:" and "Lock in your answer!"
DARE_Q = "A school bag! Its strap must bend, and it must not tear. Which material would you choose? One, fabric. Two, metal. Three, wood."
DARE_Q1, DARE_Q2 = "A school bag! Its strap must bend, and it must not tear. Which material would you choose?", "One, fabric. Two, metal. Three, wood."
assert DARE_Q1 + " " + DARE_Q2 == DARE_Q
DARE_CARDS = ["Fabric", "Metal", "Wood"]
DARE_LABEL = "Which material would you choose?"
DARE_SHORT = "Fabric, metal, or wood?"
DARE_CLUES = ["must bend", "must not tear"]
CARD2_PICK = "Two! Metal! Nothing can tear that!"
CARD3_PICK = "Three! Wood is strong!"
# Block B: the dare into EP14 (plan row 14, "Why does the Sun come back every morning? Cycles"); the teacher's answer (i): card one "the Sun moves away"
NEXT_DARE = "Next time: the Sun! Every evening, it goes. Every morning, it comes back. Why? One, the Sun moves away. Two, the Earth turns. Three, clouds hide the Sun. Lock in your answer!"
NEXT_CARDS = ["The Sun moves away", "The Earth turns", "Clouds hide the Sun"]
NEXT_JOKE = "Easy! The Sun needs a nap, like me!"

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer on the stomp), YOUR TURN! after each line, no
# all-together bar (script segment 11). One line for each thing an engineer does, in order: design, choose, test (line 1: the first four boxes
# of OUR DESIGN PLAN flash; line 2: the last box, with the green tag SUITABLE; line 3: the card THEN: TEST IT). Basil's voice leads the first
# beat of each line (make_voice.py: his call is a little louder).
CHANT = [("Design it!", "Part by part!"), ("Choose it!", "A suitable material!"), ("Test it!", "Then you know!")]
CHANT_CAPS = ([1.0, 1.0, .9], [1.2, 1.5, 1.2])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word for every line (the caption / script text is unchanged). EP13: none for every line; one line's own respelling
# (j902 "macaw" -> "mcaw") is its opts "pron". "use" (the noun) is Kokoro's own jˈuːs ("yooss"); "engineers" ˌɛndʒɪnˈɪɹz; "diversity"
# daɪvˈɜːsᵻɾi (the British "dy", as in EP1); "extinct" ɛkstˈɪŋkt; "salamander" sˈælɐmˌændɚ (STATE.md, qa/new_words_check.m4a).
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journeys: softer and slower
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER: Heart describes what we SEE, slowly
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)            # a new term's pop: 2.0 s on screen; Heart waits at least .6 s
STRIP = 3.5                                         # a book sentence's cream strip: at least 3.5 s on screen
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]  # a look-closer's one verdict tag, held 2.5 s before the pull back

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
 # ---- 1 · silent cold open: a Primary 3 classroom after school (6 s). 0:02 EP12's three dare boards slide in; 0:04 the buddies pop in
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP12's dare, word for word (one calm picture: each board steps forward as Heart says its card, >= 2.5 s each), then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "g202", H, DARE_Q1, {"pre": .3}),
 ("say", "g203", H, DARE_Q2, {"pre": .4, "gap": 1.8, "post": 2.4}),   # gap 1.8 / post 2.0: each board is forward >= 2.5 s (checked on the timeline)
 ("scene", "back"),
 ("say", "g204", H, "Hold on to your answer!", {"pre": .4, "post": .3}),
 ("scene", "title"), ("mark", "title"), ("wait", 2.2),
 # ---- 3 · the game, and the hidden butterfly (Heart names it; its picture pops)
 ("scene", "game"),
 ("say", "g301", H, "You against the Buddies! Lock in first. One finger for every point. A little butterfly is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (Basil reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", B, "What engineers do.", {"pre": .3, "post": .3}),
 ("say", "g403", B, "The design steps.", {"pre": .3, "post": .3}), ("say", "g404", B, "Design a school bag.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 5 · Round 1: the dare from EP12 (a short 3 s ring: the answer was locked in at the end of EP12)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g501", H, "Round one: the question from last time! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "g502", H, "Locked in!", {"pre": 0}),
 ("say", "g503", B, CARD2_PICK, {"pre": .5}),
 ("say", "g504", M, CARD3_PICK, {"pre": .4}),
 ("say", "g505", P, "One. My strap bends over my shoulder.", {"pre": .4}),
 ("wait", .3),
 # ---- 6 · [LOOK CLOSER] three straps over the back of a chair; the fabric strap lifts a bag full of books; FABRIC: FLEXIBLE AND STRONG
 ("scene", "lcstraps"),
 ("say", "g601", H, "Look closer. Three straps, over the back of a chair.", {**LC, "pre": 1.2}),   # pre 1.2: the push-in to the chair's rail
 ("wait", .2),
 ("say", "g602", H, "The fabric strap bends round it. Fabric is flexible.", {**LC, "pre": 0, "kw": [["lay1", "fabric"], ["flexchip", "flexible"]]}),   # lay1: the fabric strap is laid over the rail and drapes
 ("wait", .2),
 ("say", "g603", H, "The metal bar stays straight. The wooden stick stays straight." + ("" if "shoulder" in CUTS else " No good on a shoulder!"), {**LC, "pre": 0, "kw": [["lay2", "metal"], ["lay3", "wooden"]]}),   # each rests across the rail and rocks once
 ("wait", .4), ("mark", "clear"), ("wait", .7), ("mark", "clip"), ("wait", .8), ("mark", "books"), ("wait", 1.6),   # the bar and the stick lifted away; the fabric strap clipped to the bag; five books in (.3 s apart)
 ("say", "g604", H, "Now the fabric strap lifts a bag full of books. No tear! Fabric is strong.", {**LC, "pre": 0, "kw": [["lift", "lifts"], ["notear", "no"], ["strongchip", "strong"]]}),
 ("wait", .5),
 *VERDICT("v_straps"),
 ("scene", "strapans"), ("mark", "boardtags"),   # back in the classroom: SUITABLE lands on EP12's fabric board, NOT FOR THIS JOB on the other two
 ("say", "g605", H, "The answer is one. Fabric! One finger? One finger up!", {"pre": .5, "post": .3}),
 *cut("ouch", [("say", "g606", B, "Oops. A metal bar on my shoulder? Ouch!", {"pre": .3, "post": .2})]),
 # ---- 7 · what engineers do (ENGINEERS pops on "engineers"), and Mark Sentence 1 (Basil, 3.29; DESIGN pops after the last word)
 ("scene", "engineers"),
 ("say", "g701", H, "We did not guess. We checked the properties. That is what engineers do!", {"pre": .3, "term": ["engineers"], "kw": [["kw_engineers", "engineers"]]}),
 HOLD("kw_engineers"),
 ("say", "g702", M, "So we are engineers too!", {"pre": .2}),
 ("say", "g703", H, "Engineers design and make new products.", {"pre": .4, "post": .2}),
 ("scene", "mark1"),
 ("say", "g704", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g705", B, "Knowing the physical properties of a material is important when designing and making new products.", {"pre": 0}),
 ("wait", .3), ("mark", "kw_design"), ("wait", 2.2), HOLD("kw_design"),   # DESIGN pops after the last word; the card holds 2.5 s
 # ---- 8 · the plan (OUR DESIGN PLAN slides in; the first box glows); [LOOK CLOSER] a school bag doing its job, then part by part
 ("scene", "plan"), ("mark", "planIn"),
 ("say", "g801", H, "Engineers follow a plan. First: what is the object for?", {"pre": .8, "kw": [["box1", "first"]]}),   # pre .9: the board slides in first
 ("scene", "lcbag"),
 ("say", "g802", H, "Look closer. Books go in. A school bag is for carrying books to school.", {**LC, "pre": 1.2, "kw": [["booksin", "books"]]}),
 ("wait", .3), ("mark", "zip1"), ("wait", .8), ("mark", "hang"), ("wait", .9), ("mark", "fill1"), ("wait", .4),   # the zip closed; the bag lifted and hung on the chair; the first box filled
 ("say", "g803", H, "Then: its parts. Straps. A body. A zip. A base.", {**LC, "pre": 0, "kw": [["glow23", "then"], ["p_straps", "straps"], ["p_body", "body"], ["p_zip", "zip"], ["p_base", "base"]]}),
 ("wait", .2),
 ("say", "g804", H, "And what each part must do: its intended use.", {**LC, "pre": 0, "term": ["intended use"], "kw": [["kw_intended_use", "intended"]]}),
 HOLD("kw_intended_use"),
 ("say", "g805", H, "The straps carry the bag. The body holds the books. The zip opens and closes. The base sits on the floor.", {**LC, "pre": 0, "kw": [["u_straps", "straps"], ["u_body", "body"], ["u_zip", "zip"], ["u_base", "base"]]}),
 ("wait", .6),
 ("mark", "v_bag"), ("wait", 1.0), ("mark", "fill23"), ("wait", 1.5),   # the verdict (2.5 s); on the board (small, at the window's edge) boxes 2 and 3 are filled
 # ---- 9 · HOLD ON! Pip: "So I will make every part of fabric!" (a bad rule: the child crosses their arms); Basil's wet canteen floor
 ("scene", "holdon"),
 ("say", "g901", P, "Fabric is flexible and strong. So I will make every part of fabric!", {"pre": .5, "post": .2, "kw": [["fabhop", "every"]]}),
 ("say", "g902", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "g903", H, "Arms crossed? One finger up! Each part has its own use. So we choose part by part.", {"pre": 0, "post": .3, "kw": [["fabback", "each"]]}),
 ("scene", "wetfloor"),
 ("say", "g904", B, "Hold on, Pip! My bag sits on a wet canteen floor!", {"pre": .5, "post": .3, "kw": [["wetpic", "wet"]]}),
 # ---- 10 · draw it, then choose: [LOOK CLOSER] the drawing, and a material for each part (each property shown happening)
 ("scene", "draw"), ("mark", "paper"),
 ("say", "g1001", H, "Now we draw the design. Look closer.", {"pre": .6, "kw": [["glow4", "draw"]]}),
 ("scene", "lcdraw"),
 ("wait", 1.2), ("mark", "pencil"), ("wait", 2.8), ("mark", "fill4"), ("wait", .4),   # the push-in; the pencil draws body, straps, zip, base (speeded up) and four label lines; the fourth box is filled
 ("say", "g1002", H, "Last, we choose. Part by part.", {**LC, "pre": 0, "kw": [["glow5", "choose"]]}),
 ("wait", .15),
 ("say", "g1003", H, "The base: plastic. The drop of water stays on top. Plastic is waterproof.", {**LC, "pre": 0, "kw": [["drop1", "drop"], ["drop2", "top"], ["plastichop", "plastic", 1], ["wpchip", "waterproof"]]}),
 ("wait", .15),
 ("say", "g1004", H, "The zip: metal. Open, close, open, close. No break. Metal is strong.", {**LC, "pre": 0, "kw": [["zo1", "open", 0], ["zc1", "close", 0], ["zo2", "open", 1], ["zc2", "close", 1], ["ziphop", "metal", 1], ["zipchip", "strong"]]}),
 ("wait", .15),
 ("say", "g1005", H, "The straps and the body: fabric. Flexible and strong.", {**LC, "pre": 0, "kw": [["fabhop2", "fabric"], ["flexchip2", "flexible"], ["strongchip2", "strong"]]}),
 ("wait", .6),
 ("mark", "v_draw"), ("wait", 1.0), ("mark", "fill5"), ("wait", 1.5),   # the verdict (2.5 s); on the board the last box is filled: five ticks
 ("scene", "pipfix"),
 *(cut("soak", [("say", "g1006", P, "Oh! A fabric base would soak up the water!", {"pre": .4, "post": .3})]) or [("wait", 2.6)]),
 # ---- 11 · Mark Sentence 2 (Pip, 3.27; the tag "function = the job of a part" for the whole card)
 ("scene", "mark2"),
 ("say", "g1101", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g1102", P, "The materials are selected for the different functions of the parts based on their physical properties.", {"pre": 0}),
 ("wait", 2.5),
 # ---- 12 · BE A BOOK (the first-person journey): inside the bag; the metal zip closes; the fabric straps lift; the plastic base on a wet floor
 ("scene", "waitw"),
 ("say", "g1201", H, "Be a book! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jin"),
 ("say", "g1202", H, "You are a book, inside the school bag.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "jzip"),
 ("say", "g1203", H, "Zip! The metal zip closes above you.", {**SLOW, "pre": .2, "post": 1.0, "kw": [["jzipclose", "zip"]]}),
 ("mark", "jstraps"),
 ("say", "g1204", H, "The fabric straps pull tight. Up you go!", {**SLOW, "pre": .2, "post": 1.0, "kw": [["jtight", "tight"], ["jup", "up"]]}),
 ("mark", "jbase"),
 ("say", "g1205", H, "Bump! A wet floor. The plastic base keeps the water out. You stay dry!", {**SLOW, "pre": .2, "kw": [["jbump", "bump"], ["jwater", "water"], ["wpglow", "dry"]]}),
 ("wait", 1.0),
 # ---- 13 · pull back out; the score hand, the butterfly, the key words
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "final"),
 ("say", "g1301", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "g1302", H, "Did you spot the butterfly? It was on the plant by the window! Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Engineers", "Design", "Intended use"]),
 # ---- 14 · the cliffhanger: will the new strap really hold? (THEN: TEST IT slides in on "Not yet"; a big ? over the new strap)
 ("scene", "cliff"), ("wait", .3),
 ("say", "g1401", B, "Our design is done!" if "thousand" in CUTS else "Our design is done! Let's make a thousand bags!", {"pre": .3}),
 ("say", "g1402", H, "Not yet, Basil! Will the new strap really hold? Engineers do not guess. They test!", {"pre": .3, "kw": [["testcard", "not"], ["q", "will"]]}),
 ("say", "g1403", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .7),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "Fabric" and "But"; each >= 2.5 s)
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "j101", H, "Last time, we designed a school bag, like engineers. Fabric straps. A metal zip. A plastic base. But will the new strap hold?", {"pre": .4, "post": 1.6, "kw": [["pic2", "fabric"], ["pic3", "but"]]}),   # post 1.6: the third picture holds 2.5 s
 # ---- 2 · the new place (the school's eco-garden), the game, and the hidden frog
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201", H, "Lock in first. A little frog is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals (Momo reads the three cards)
 ("scene", "goals"), ("say", "j301", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", M, "Test your design.", {"pre": .3, "post": .3}),
 ("say", "j303", M, "Design a zoo home.", {"pre": .3, "post": .3}), ("say", "j304", M, "Keep the great variety.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: how many weights? (Part 1's cliffhanger, scored; ring 6 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j401", H, "Round one. The old strap held five weights. Then it tore. How many will the new strap hold? One, fewer than five. Two, five. Three, more than five. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1", 6.0),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", M, "Two! A strap is a strap!", {"pre": .5}),
 ("say", "j404", B, "Three! Thicker fabric!", {"pre": .4}),
 ("say", "j405", P, "Three.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] the test: the old strap (a held picture: 5, torn) and the new strap (live: 1..9, no tear); TEST pops on "test"
 ("scene", "lctest"),
 ("say", "j501", H, "Look closer. Same length, same width: a fair test.", {**LC, "pre": 1.2, "kw": [["rulerL", "length"], ["rulerW", "width"]]}),
 ("wait", .5),
 ("say", "j502", H, "One. Two. Three. Four. Five. The old strap tore here.", {**LC, "gap": .35, "pre": 0, "kw": [["w1", "one"], ["w2", "two"], ["w3", "three"], ["w4", "four"], ["w5", "five"], ["link5", "the"]]}),   # each weight slides on ON its number
 ("wait", .5),
 ("say", "j503", H, "Six. Seven. Eight. Nine! No tear.", {**LC, "gap": .35, "pre": 0, "kw": [["w6", "six"], ["w7", "seven"], ["w8", "eight"], ["w9", "nine"], ["lens9", "no"]]}),
 ("wait", .4),
 ("say", "j504", H, "The new strap holds more weights. It is stronger. Now we know!", {**LC, "pre": 0, "kw": [["side", "more"]]}),
 ("wait", .3),
 ("say", "j505", H, "After designing, engineers test their product.", {**LC, "pre": 0, "term": ["test"], "kw": [["kw_test", "test"]]}),
 HOLD("kw_test"),
 ("mark", "v_test"), ("wait", 1.2), ("mark", "testtick"), ("wait", 1.3),   # the verdict (2.5 s); a tick lands on the card THEN: TEST IT
 ("scene", "testans"),
 ("say", "j506", H, "The answer is three. More than five! Three fingers? One finger up!", {"pre": .5, "post": .3}),
 # ---- 6 · BE THE NEW STRAP (the first-person journey): hanging; pulled; 6, 7, 8, 9; no tear
 ("scene", "waitw"),
 ("say", "j601", H, "Be the new strap! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jhang"),
 ("say", "j602", H, "You are the new strap, hanging from the stand.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "jpull"),
 ("say", "j603", H, "A weight pulls you down. Then another. You are pulled tight.", {**SLOW, "pre": .2, "post": 1.0, "kw": [["jw1", "weight"], ["jw2", "another"], ["jtight", "tight"]]}),
 ("mark", "jcount"),
 ("say", "j604", H, "Six. Seven. Eight. Nine! You do not tear. You are strong!", {**SLOW, "gap": .7, "pre": .2, "kw": [["jw6", "six"], ["jw7", "seven"], ["jw8", "eight"], ["jw9", "nine"], ["strongchip", "strong"]]}),
 ("wait", 1.5),
 # ---- 7 · the plan again: a goat home (the board is wiped and filled again); [LOOK CLOSER] a goat home at the zoo; Basil: "Not glass!"
 ("scene", "zooplan"), ("wait", .3), ("mark", "wipe"),
 ("say", "j701", H, "Now, the same plan, for a zoo! Design a home for the goats.", {"pre": .9, "kw": [["goatcard", "goats"]]}),   # pre .9: the five tiles hop off first
 ("say", "j702", H, "What is it for? To keep the goats safe, and to let visitors see them.", {"pre": .3, "kw": [["zfill1", "keep"]]}),
 ("wait", .3), ("mark", "zfill2"), ("wait", .5), ("mark", "zfill3"), ("wait", .5), ("mark", "zfill4"), ("wait", .5), ("mark", "zglow5"), ("wait", .8),   # the next three boxes fill quickly, without a word; the last glows, a ? on the drawing's fence
 ("scene", "lcgoat"),
 ("say", "j703", H, "Look closer. A goat home, at the zoo.", {**LC, "pre": 1.2}),
 ("wait", .3), ("mark", "goatwalk"), ("wait", 1.0),   # one small goat walks up to the middle rail
 ("say", "j704", H, "A goat pushes the wooden fence. No break. Wood is strong.", {**LC, "pre": 0, "kw": [["push1", "pushes"], ["push2", "no"], ["strongchip", "strong"]]}),   # its side, then its forehead; the rail does not move
 ("wait", .5), ("mark", "glide"), ("wait", 1.0),   # the camera glides to the gap between two rails
 ("say", "j705", H, "Between the rails, we can see the goats.", {**LC, "pre": 0, "kw": [["seegoats", "see"]]}),
 ("wait", .6),
 *VERDICT("v_goat"),
 ("scene", "notglass"), ("wait", .3), ("mark", "woodtile"), ("wait", .8),   # back in the garden: the wood tile hops onto the last box; five ticks
 *(cut("notglass", [("say", "j706", B, "Not glass! A goat's knock could break it!", {"pre": .2, "post": .3, "kw": [["glasstag", "glass"]]})]) or [("mark", "glasstag"), ("wait", 2.0)]),
 # ---- 8 · Mark Sentence 1 (Basil, 3.30 item 3, both sentences; the chapter map of p. 70 under the card, silent)
 ("scene", "mark1"),
 ("say", "j801", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j802", B, "The physical properties of a material allow it to be used in certain ways. It is important to choose a material whose physical property is suitable for the intended use of the object.", {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 9 · Showdown: Basil's zoo map (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j901", H, "A zoo puts its animals in groups, so visitors can learn their similarities and differences.", {"pre": .5}),
 ("say", "j902", B, "My zoo map! Two: birds. Flamingo, macaw and dragonfly." if "map" in CUTS else "My zoo map! One: fish. Goldfish and koi. Two: birds. Flamingo, macaw and dragonfly. Three: amphibians. Frog and salamander.", {"pre": .4, "post": .3, "pron": {"macaw": "mcaw"}}),
 ("say", "j903", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "j904", H, "Locked in!", {"pre": 0}),
 ("say", "j905", P, "Two. A dragonfly has six legs. It is an insect!", {"pre": .5}),
 ("say", "j906", M, "Two! Birds have feathers. A dragonfly has none!", {"pre": .4, "post": .3}),
 ("scene", "fix"), ("wait", .3), ("mark", "dfly"), ("wait", 1.0),   # the dragonfly hops down off line 2 onto a new green line 4: INSECTS: dragonfly, beetle
 ("say", "j907", H, "Two fingers? Put up two more on your score hand!", {"pre": .2, "post": .3}),
 *cut("wings", [("say", "j908", B, "Oops. The wings fooled me!", {"pre": .3, "post": .3})]),
 # ---- 10 · a great variety (DIVERSITY pops on "diversity"; the question D3 on a cream strip), and Mark Sentence 2 (Momo, 1.22; EXTINCT pops after the last word)
 ("scene", "zoomap"), ("mark", "zones"),
 ("say", "j1001", H, "A great variety of living things!" if "variety" in CUTS else "Six groups. So many kinds of living things! A great variety.", {"pre": .9}),   # pre .9: the six zones pop first
 ("say", "j1002", H, "Why is it important to maintain diversity?", {"pre": .4, "term": ["diversity"], "hold": STRIP, "kw": [["kw_diversity", "diversity"]]}),
 HOLD("kw_diversity"),
 ("scene", "mark2"),
 ("say", "j1003", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j1004", M, "Living things that are not able to survive will become extinct. This means that they will all die out.", {"pre": 0, "gap": .6}),
 ("wait", .3), ("mark", "kw_extinct"), ("wait", 2.2), HOLD("kw_extinct"),   # EXTINCT pops after the last word; the card holds 2.5 s
 ("say", "j1005", H, "So we take care of every kind.", {"pre": .2, "post": .4, "kw": [["glowall", "every"]]}),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand and the frog
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1202", H, "Did you spot the frog? It was on the lily pad in the pond! Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 13 · the dare for Episode 14
 ("scene", "dare"), ("wait", .5),
 ("say", "j1301", H, NEXT_DARE, {"pre": 0}),
 *cut("nap", [("say", "j1302", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Test", "Diversity", "Extinct"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
