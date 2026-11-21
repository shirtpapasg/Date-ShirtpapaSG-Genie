"""script.py: P3 EP12 "Why isn't a trolley made of glass? Choosing materials", Part 1 ("A GLASS Trolley? Why Supermarket Trolleys Are Made
of METAL") and Part 2 ("One Car, FOUR Materials! Why Not Just One?"): the script (../p3_ep12_script.md, version 1 of 21 Nov 2026, with the
teacher's go-ahead in its section 12: fabric stays the trolley dare's third card (section 3, Block A, the fabric version), "rigid" stays out,
the windscreen shows WATERPROOF and TRANSPARENT, no glass breaks, the school bottle answer is plastic, the fish tank, mynah and squirrel, the
HDB car park, the EP13 dare fabric / metal / wood, and EP12 replaces nothing) as data. Every spoken line is word for word as in the script,
with the dare names of section 3 resolved ({DARE_Q}, {DARE_SHORT}, {CARD3_PICK}, {CARD3_TEST}, {CARD3_REACT}: Block A, fabric; {NEXT_DARE},
{NEXT_JOKE}: Block B); a cell with two speakers is split into one line per speaker. make_voice.py records the lines; build_tl.py lays them
on the timeline.

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
                                       pron: {text: spoken as} for this line only (the caption keeps the script's words; EP11 Stage 3: Pip's
                                       "opaque" in j602 was re-spelt "oh-pake"). EP12 needs none (see make_voice.py and STATE.md).
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("hold", mark, secs, gap)            the next line waits until mark + secs and at least gap after the cursor (a new term's pop)
  ("chant", id)                        the buddies' chant, call and response (CHANT below)
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet, sync, crowd, pron)

Marks the picture and the sound use (EP10 Stage 3's lesson: every sound lands on the action, so the picture and the sound key on the SAME mark):
  kw_* (shelf key words), ring0_* / bell_* (lock-in timers), v_* (look-closer verdicts), boardsIn / budsIn (cold open), boardIn (MATCH THE
  JOB slides in), title, the board's rows: row1o (the trolley's tile hops on), row1p (its purpose is written), row1m (metal + STRONG), row2
  (the fish tank's row), row3 (the school bottle's row), carrows (the car and its four rows), ticks (a green tick at the end of each row);
  Part 1 actions: rice / bottles / tins (the hands load the trolley), push (a hand pushes: it rolls), stop (it stops), towel / scissors /
  raincoat (lifted from the basket), bars (the before / after of the bottom bars), line (the guide line), pullbk (the camera pulls back to
  the bay), clang (the knock), slowmo (the slow-motion replay), closeup (where metal met metal), goodtag (RIGHT FOR THE JOB on the metal
  board), ep9 (EP9's drop-box picture), badglass / badfabric (NOT FOR THIS JOB), bagin / baglift / bagdown / fold (Pip's fabric bag),
  slideout / slideback (the glass card), turn (the camera turns to the aquarium shop), lens (the magnifier on one fish), glide (down to the
  shelf), dry, the journey stops (dive; jbar, jrice, jthump, jroll, jknock, jclang, strongchip), the cliffhanger bottles (b1, b2, b3, q);
  Part 2 actions: dry (the glide under the bottles), ticks1 (three ticks), backlight, see1..see3, land (the plastic bottle lands; the hand
  lets go .42 s before), tick3, rest (the hand rests on the glass bottle), xg / tm (the cross under glass, the tick under metal), bagin2 /
  bootshut (the last bag, the boot), tyre, palm, seats, press, screen, pour, body, knock, allfour, p1..p4 (each part pulses), the journey
  stops (dive; jspout, jglass, jsplash, jseats, jslope, jtyre, jground), rub (line 2 of Momo's notes rewritten), tip (the tip card).

CUTS: script section 6 (non-teaching, in its order). Put a tag in CUTS to drop that beat (then make_voice is not needed; rebuild the timeline).
  Part 1: title2 (the title's second slam: a picture beat only, no time), snacks (g806 Basil "Oops. Bye-bye, snacks!": he does the oops pose in
          silence), things (g603 Heart "A towel. Scissors. A raincoat. Each has its own purpose.": the three things and their tags still show,
          in silence; the scene keeps 4.5 s), sameglass (g1105 Momo "Oh! The same glass. A different use!", last of all: if it goes, the tag
          "The same glass. A different use." must show instead).
  Part 2: notes (Momo reads only "My notes!" and line two; lines one and three are shown and lit, not read: j1001 is re-recorded short,
          about 6 s), water (j508 Momo "Oh! Strong, but I cannot see my water!": she nods in silence and the tag "Strong, but we cannot see
          the water" shows instead), tip (j1007 Heart "Name the property. Then link it to the job.": only if the tip card then holds 3.5 s in
          silence), metalstrap (j1302 Basil's joke, last). j803 ("Each part has its own job...") is NOT to be cut (it explains "functions").
  If a Basil line is cut, cut one of Momo's or Pip's as well (Basil keeps at least as many lines as either).
"""
import re
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()   # nothing cut at Stage 1 (see STATE.md for the lengths and the cut candidates)
cut = lambda tag, items: [] if tag in CUTS else items

# ---- the dare blocks (script section 3; the teacher's answer (a): keep fabric = Block A as written) ----
DARE_Q = "A supermarket trolley! Which material would you choose to make it? One, glass. Two, metal. Three, fabric."
DARE_CARDS = ["Glass", "Metal", "Fabric"]
DARE_LABEL = "Which material would you choose to make it?"
DARE_SHORT = "Glass, metal, or fabric?"
CARD3_PICK = "Three. My fabric bag carries heavy books, and it does not tear."
CARD3_TEST = "And fabric? Pip's bag holds the rice. But it folds flat: fabric is flexible."
CARD3_REACT = "Oh! A trolley must not bend!"
NEXT_DARE = "Next time: a school bag! Its strap must bend, and it must not tear. Which material would you choose? One, fabric. Two, metal. Three, wood. Lock in your answer!"
NEXT_CARDS = ["Fabric", "Metal", "Wood"]
NEXT_JOKE = "A metal strap! Nothing can tear that!"

# the chant (Part 2): call and response, EP7's form (a call on the bar line, its answer on the stomp), YOUR TURN! after each line, no
# all-together bar (script segment 11). One line per step of choosing a material (the board's PURPOSE, PROPERTY, MATERIAL columns flash).
# Basil's voice leads the first beat of each line (make_voice.py: his call is a little louder).
CHANT = [("What is it for?", "The purpose!"), ("What can it do?", "The property!"), ("So choose!", "A suitable material!")]
CHANT_CAPS = ([1.25, 1.25, 1.0], [1.15, 1.2, 1.5])   # longest each call / answer may be (s)
CHANT_TOGETHER = False
# how the TTS should say a word (the caption / script text is unchanged). EP12: none needed. "fragile" comes from the approved sound through
# ../sg_pron.py (FRAJ-ile); "use" (the noun) is Kokoro's own juːs ("yooss") in every line and voice (checked: STATE.md, qa/new_words_check.m4a).
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
 # ---- 1 · silent cold open: the covered walkway in front of a neighbourhood supermarket (6 s). 0:02 EP11's three dare boards slide in; 0:04 the buddies pop in
 ("scene", "cold"), ("wait", 2.0), ("mark", "boardsIn"), ("wait", 2.0), ("mark", "budsIn"), ("wait", 2.0),
 # ---- 2 · "Last time...": EP11's dare, word for word (one calm picture: each board steps forward as Heart says its card, >= 2.5 s each),
 #          then the board MATCH THE JOB, then the title
 ("scene", "lasttime"),
 ("say", "g201", H, "Last time, we asked:", {"pre": .4}),
 ("say", "g202", H, DARE_Q, {"pre": .4, "gap": 1.8, "post": 2.0}),   # gap 1.8 / post 2.0: each board is forward >= 2.5 s (checked on the timeline)
 ("scene", "board"), ("mark", "boardIn"),
 ("say", "g203", H, "Hold on to your answer!", {"pre": 1.2, "post": .5}),   # pre 1.2: the board slides in first
 ("scene", "title"), ("mark", "title"), ("wait", 2.4),
 # ---- 3 · the game, and the hidden mynah (Heart names it; its picture pops)
 ("scene", "game"),
 ("say", "g301", H, "You against the Buddies! Lock in first. One finger for every point. A little mynah is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 4 · today's goals (Momo reads the three cards, word for word) and the countdown
 ("scene", "goals"), ("say", "g401", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "g402", M, "Objects have purposes.", {"pre": .3, "post": .3}),
 ("say", "g403", M, "Properties decide uses.", {"pre": .3, "post": .3}), ("say", "g404", M, "Why a trolley is metal.", {"pre": .3, "post": .9}),
 *COUNT,
 # ---- 5 · what is a trolley for? (the OBJECT column glows, the trolley's tile hops on); [LOOK CLOSER] a trolley doing its job; PURPOSE
 ("scene", "trolley"), ("wait", .3), ("mark", "row1o"),
 ("say", "g501", H, "First: what is a trolley for? Look closer.", {"pre": .6}),
 ("scene", "lcjob"),
 ("say", "g502", H, "A bag of rice goes in. Bottles. Tins. It is heavy now.", {**LC, "pre": 1.2, "kw": [["rice", "rice"], ["bottles", "bottles"], ["tins", "tins"]]}),   # pre 1.2: the push-in
 ("wait", 1.0),   # the labels basket / handle / wheels; hold
 ("say", "g503", H, "A push, and it all rolls along.", {**LC, "pre": 0, "kw": [["push", "push"]]}),
 ("wait", 1.2), ("mark", "stop"), ("wait", .6),   # the loaded trolley rolls across the frame and stops
 ("say", "g504", H, "A trolley is for carrying heavy groceries. That is its purpose.", {**LC, "pre": 0, "term": ["purpose"], "kw": [["kw_purpose", "purpose"]]}),
 HOLD("kw_purpose"),
 *VERDICT("v_job"),
 # ---- 6 · Mark Sentence 1: objects and purposes (Pip); the trolley's row gets its purpose; the towel, the scissors, the raincoat
 ("scene", "mark1"),
 ("say", "g601", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g602", P, "Materials are used to make objects. Objects are things you use for different purposes.", {"pre": 0, "gap": .6}),
 ("wait", 1.0), ("mark", "row1p"), ("wait", 1.5),   # the card holds 2.5 s; on the board the trolley's row gets its purpose (a pencil scribble)
 ("scene", "things"),
 *(cut("things", [("say", "g603", H, "A towel. Scissors. A raincoat. Each has its own purpose.", {"pre": 1.0, "post": .3, "kw": [["towel", "towel"], ["scissors", "scissors"], ["raincoat", "raincoat"]]})])
   or [("wait", .9), ("mark", "towel"), ("wait", 1.0), ("mark", "scissors"), ("wait", 1.0), ("mark", "raincoat"), ("wait", 1.6)]),   # pre 1.0: the basket slides in first
 # ---- 7 · Round 1: the dare from EP11 (a short 3 s ring: the answer was locked in at the end of EP11)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "g701", H, "Round one: the question from last time! " + DARE_SHORT + " Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "g702", H, "Locked in!", {"pre": 0}),
 ("say", "g703", B, "One! Glass! I can see all my snacks!", {"pre": .5}),
 ("say", "g704", P, CARD3_PICK, {"pre": .4}),
 ("say", "g705", M, "Two! The trolleys here are all metal!", {"pre": .4}),
 ("wait", .3),
 # ---- 8 · [LOOK CLOSER] the loaded metal trolley: the bars stay straight; the knock in the trolley bay; METAL: STRONG
 ("scene", "lcmetal"),
 ("say", "g801", H, "Look closer. The metal trolley, full of heavy groceries.", {**LC, "pre": 1.2}),   # pre 1.2: the push-in down to the bottom bars
 ("mark", "bars"), ("wait", .6),   # before and after, side by side
 ("say", "g802", H, "The metal bars stay straight. They do not bend.", {**LC, "pre": 0, "kw": [["line", "straight"]]}),
 ("wait", 1.0), ("mark", "pullbk"), ("wait", 1.2),   # the camera pulls back to the whole trolley and the trolley bay
 ("say", "g803", H, "Now it rolls into the trolley bay. Clang! A hard knock.", {**LC, "pre": 0, "kw": [["clang", "clang"]]}),
 ("wait", .4), ("mark", "slowmo"), ("wait", 2.4), ("mark", "closeup"), ("wait", .6),   # the knock once more in slow motion; the close-up where metal met metal
 ("say", "g804", H, "No crack. No break. Metal is strong.", {**LC, "pre": 0}),
 ("wait", .8),
 ("mark", "v_metal"), ("wait", 1.2), ("mark", "goodtag"), ("wait", 1.3),   # the verdict METAL: STRONG (2.5 s); RIGHT FOR THE JOB lands on the metal trolley's board
 # ---- 8b · glass: the book's sentence with EP9's drop-box picture (no glass breaks in this episode); fabric: Pip's bag
 ("scene", "glass"), ("mark", "ep9"),
 ("say", "g805", H, "Glass is fragile, but metal is strong. A glass cup breaks easily when it is dropped, but a metal cup does not.", {"pre": 1.0, "hold": 2 * STRIP}),   # pre 1.0: the glass trolley's board steps forward, EP9's picture
 ("mark", "badglass"), ("wait", .5),
 *cut("snacks", [("say", "g806", B, "Oops. Bye-bye, snacks!", {"pre": .3, "post": .3})]),
 ("scene", "fabric"), ("wait", .3), ("mark", "bagin"), ("wait", 1.0),   # an adult's hands lower a small bag of rice into Pip's fabric bag
 ("say", "g807", H, CARD3_TEST, {"pre": 0, "kw": [["baglift", "holds"], ["bagdown", "but"], ["fold", "folds"]]}),
 ("wait", .3), ("mark", "badfabric"), ("wait", .5),
 ("say", "g808", P, CARD3_REACT, {"pre": .3, "post": .2}),
 ("scene", "metalans"),
 ("say", "g809", H, "The answer is two. Metal! Two fingers? One finger up!", {"pre": .3, "post": .3}),
 ("mark", "row1m"), ("wait", .8),   # the trolley's row is completed: the metal tile and the chip STRONG
 # ---- 9 · Mark Sentence 2: properties decide uses (Basil); PHYSICAL PROPERTIES pops after the first sentence
 ("scene", "mark2"),
 ("say", "g901", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "g902", B, "Every material has physical properties. The physical properties of a material allow it to be used in certain ways.", {"pre": 0, "gap": .6, "kw": [["kw_physical_properties", "the"]]}),
 ("wait", 2.5), HOLD("kw_physical_properties"),
 # ---- 10 · HOLD ON! Momo: "So glass is a bad material!" (a bad rule: the child crosses their arms)
 ("scene", "holdon"), ("mark", "slideout"),
 ("say", "g1001", M, "So glass is a bad material! Never use glass for anything!", {"pre": .5, "post": .2}),
 ("say", "g1002", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .6),
 ("say", "g1003", H, "Arms crossed? One finger up! Glass is not a bad material. It depends on the use.", {"pre": 0, "post": .3}),
 ("scene", "fishnext"), ("mark", "turn"),
 ("say", "g1004", B, "Hold on, Momo! The fish tank next door is glass!", {"pre": .5, "post": .3, "kw": [["slideback", "fish"]]}),
 # ---- 11 · [LOOK CLOSER] a glass fish tank: every fish seen clearly (transparent), the shelf under it dry (waterproof)
 ("scene", "lctank"),
 ("say", "g1101", H, "Look closer. A glass fish tank, full of water.", {**LC, "pre": 1.2}),
 ("wait", .6),
 ("say", "g1102", H, "We can see every fish clearly. Glass is transparent.", {**LC, "pre": 0, "kw": [["lens", "every"]]}),
 ("wait", .8), ("mark", "glide"), ("wait", 1.4),   # the camera glides slowly down the glass to the shelf under the tank
 ("say", "g1103", H, "The shelf under it is dry. No water passes through. Glass is waterproof.", {**LC, "pre": 0, "kw": [["dry", "dry"]]}),
 ("wait", .6),
 ("say", "g1104", H, "For a fish tank, glass is the right material!", {**LC, "pre": 0}),
 ("wait", .6),
 *VERDICT("v_tank"),
 ("scene", "tankrow"), ("wait", .3), ("mark", "row2"),
 *(cut("sameglass", [("say", "g1105", M, "Oh! The same glass. A different use!", {"pre": 1.0, "post": .3})]) or [("wait", 3.0)]),   # pre 1.0: the row's four hops first
 # ---- 12 · BE THE METAL (the first-person journey): a bar at the bottom of the trolley; loaded, rolled, knocked
 ("scene", "waitw"),
 ("say", "g1201", H, "Be the metal! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jbar"),
 ("say", "g1202", H, "You are a metal bar, at the bottom of the trolley.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "jrice"),
 ("say", "g1203", H, "A heavy bag of rice lands on you. You do not bend.", {**SLOW, "pre": .3, "post": 1.0, "kw": [["jthump", "lands"]]}),   # pre .3: the sack comes down first
 ("mark", "jroll"),
 ("say", "g1204", H, "The wheels roll. The floor rushes past.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "jknock"),
 ("say", "g1205", H, "Clang! A hard knock. You do not break. You are strong!", {**SLOW, "pre": .3, "kw": [["jclang", "clang"], ["strongchip", "strong"]]}),   # pre .3: the next trolley rushes up
 ("wait", 1.5),
 # ---- 13 · pull back out; the score hand, the mynah, the key words
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .8),
 ("scene", "final"),
 ("say", "g1301", H, "Show me your score hand! One finger or more? You beat the Buddies. Two fingers? High five!", {"pre": .3, "post": .6}),
 ("scene", "liz"),
 ("say", "g1302", H, "Did you spot the mynah? It was on the trolley bay sign! Tell someone at home.", {"pre": .6, "post": .6}),
 *kwrecap(["Purpose", "Physical properties"]),
 # ---- 14 · the cliffhanger: three water bottles in the trolley
 ("scene", "cliff"), ("wait", .4),
 ("say", "g1401", B, "Look! Three water bottles in our trolley!", {"pre": .3}),
 ("say", "g1402", H, "One plastic. One glass. One metal. The same object, three materials! Which one is right for school?", {"pre": .4, "kw": [["b1", "plastic"], ["b2", "glass"], ["b3", "metal"], ["q", "which"]]}),
 ("say", "g1403", H, "Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .9),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (switch on "The fish" and "Now"; each >= 2.5 s)
 ("scene", "lasttime"),
 ("say", "j101", H, "Last time, the trolley was metal: strong. The fish tank was glass: transparent and waterproof. Now: three water bottles!", {"pre": .4, "post": 1.6}),   # post 1.6: the third picture holds 2.5 s
 # ---- 2 · the new place (the car park beside the block), the game, and the hidden squirrel
 ("scene", "place"), ("wait", 2.0),
 ("scene", "game"),
 ("say", "j201", H, "Lock in first. A little squirrel is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 # ---- 3 · today's goals (Pip reads the three cards)
 ("scene", "goals"), ("say", "j301", P, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "j302", P, "One object, different materials.", {"pre": .3, "post": .3}),
 ("say", "j303", P, "Many materials, one object.", {"pre": .3, "post": .3}), ("say", "j304", P, "Choosing a suitable material.", {"pre": .3, "post": .9}),
 # ---- 4 · Round 1: a bottle for school (Part 1's cliffhanger, scored; ring 6 s)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "j401", H, "Round one. A water bottle for school. It must not break when dropped, and you want to see the water inside. One, plastic. Two, glass. Three, metal. Show me with your fingers.", {"pre": .1}),
 *LOCK("r1", 6.0),
 ("say", "j402", H, "Locked in!", {"pre": 0}),
 ("say", "j403", M, "Three! Metal is strong!", {"pre": .5}),
 ("say", "j404", B, "One! I drop mine every PE lesson. Not one crack!", {"pre": .4}),
 ("say", "j405", P, "One.", {"pre": .4}),
 ("wait", .3),
 # ---- 5 · [LOOK CLOSER] three bottles, one of each material: the tick table (waterproof, see the water, does not break easily)
 ("scene", "lcbottles"),
 ("say", "j501", H, "Look closer. Three bottles, full of water.", {**LC, "pre": 1.2}),
 ("wait", .4),
 ("say", "j502", H, "No drips. Plastic, glass and metal are all waterproof.", {**LC, "pre": 0, "kw": [["dry", "no"], ["ticks1", "waterproof"]]}),   # dry: the glide under the bottles; ticks1: three ticks, .3 s apart
 ("wait", .6), ("mark", "backlight"), ("wait", .5),   # a soft light from behind the bottles
 ("say", "j503", H, "Can we see the water? Plastic, yes. Glass, yes. Metal, no.", {**LC, "pre": 0, "kw": [["see1", "yes", 0], ["see2", "yes", 1], ["see3", "no"]]}),
 ("wait", .8),
 ("say", "j504", H, "Now, a drop. The plastic bottle bounces. No break!", {**LC, "pre": 0, "kw": [["land", "bounces"], ["tick3", "no"]]}),   # the hand lets go .42 s before land; it bounces once and rolls
 ("wait", .6),
 ("say", "j505", H, "The glass bottle? We do not drop glass.", {**LC, "pre": 0, "kw": [["rest", "glass"], ["noglass", "we"]]}),   # rest: the hand rests on the glass bottle; noglass: the small print
 ("say", "j506", H, "Glass is not as strong as plastic or metal.", {"pre": .5, "hold": STRIP, "kw": [["xg", "plastic"], ["tm", "metal"]]}),   # the book's strip
 ("wait", .6),
 *VERDICT("v_bottle"),
 ("scene", "bottleans"),
 ("say", "j507", H, "The answer is one. Plastic! One finger? One finger up!", {"pre": .3}),
 ("mark", "row3"),   # the third row fills on the board (the school bottle: four quick low hops) while Momo speaks
 *(cut("water", [("say", "j508", M, "Oh! Strong, but I cannot see my water!", {"pre": .4, "post": .3})]) or [("wait", 2.4)]),
 # ---- 6 · Mark Sentence 1: one object, different materials (Basil); USE pops after "use"
 ("scene", "mark1"),
 ("say", "j601", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j602", B, "An object can be made from different materials. The choice of materials depends on the use of the object.", {"pre": 0, "gap": .6, "kw": [["kw_use", "of", 1]]}),
 ("wait", 2.5), HOLD("kw_use"),
 # ---- 7 · the shopping goes into the car; [LOOK CLOSER] one car, part by part
 ("scene", "boot"), ("wait", .4), ("mark", "bagin2"), ("wait", .9), ("mark", "bootshut"), ("wait", .5),   # the last bag into the boot; the boot closed gently
 ("say", "j701", H, "Now look closer. A parked car.", {"pre": .3}),
 ("scene", "lccar"),
 ("say", "j702", H, "The tyres: rubber. They carry the whole car. Rubber is strong.", {**LC, "pre": 1.2, "kw": [["tyre", "tyres"], ["palm", "rubber", 1]]}),
 ("wait", .7),
 ("say", "j703", H, "The seats: fabric. Press, and they bend. Fabric is flexible.", {**LC, "pre": 0, "kw": [["seats", "seats"], ["press", "press"]]}),
 ("wait", .7),
 ("say", "j704", H, "The windscreen: glass. Water cannot pass through, and we can see through it clearly.", {**LC, "pre": 0, "kw": [["screen", "windscreen"], ["pour", "glass"]]}),
 ("wait", .7),
 ("say", "j705", H, "The body: metal. Strong, to protect the people inside.", {**LC, "pre": 0, "kw": [["body", "body"], ["knock", "metal"]]}),
 ("wait", .7), ("mark", "allfour"), ("wait", .8),   # pull back: the whole car, all four parts lit at once
 ("say", "j706", H, "One car. Four parts. Four materials!", {**LC, "pre": 0, "term": ["parts"], "kw": [["kw_parts", "parts"]]}),
 HOLD("kw_parts"),
 ("mark", "v_car"), ("wait", 1.0), ("mark", "carrows"), ("wait", 1.5),   # the verdict (2.5 s); on the board, the car's picture hops on with its four short rows (the pull back)
 # ---- 8 · Mark Sentence 2: many materials, one object (Momo); the tag "function = the job of a part"; Heart's plain re-say
 ("scene", "mark2"),
 ("say", "j801", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "j802", M, "The materials are selected for the different functions of the parts based on their physical properties.", {"pre": 0}),
 ("wait", 2.5),   # the card holds 2.5 s, then stays while Heart re-says it in plain words (the car under it: each part pulses with its chip)
 ("say", "j803", H, "Each part has its own job. So each part gets its own material.", {"pre": .3, "post": .3, "kw": [["p1", "each", 0], ["p2", "job"], ["p3", "each", 1], ["p4", "material"]]}),
 # ---- 9 · BE A DROP OF WATER (the first-person journey): the spout, the glass, the seats seen through it, the metal, the tyre, the ground
 ("scene", "waitw"),
 ("say", "j901", H, "Be a drop of water! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jspout"),
 ("say", "j902", H, "You are a drop of water, falling from a watering can.", {**SLOW, "pre": 0, "post": 1.0}),
 ("mark", "jglass"),
 ("say", "j903", H, "Splash! You land on the glass. You cannot pass through.", {**SLOW, "pre": .3, "post": 1.0, "kw": [["jsplash", "splash"]]}),   # pre .3: the windscreen comes up from below
 ("mark", "jseats"),
 ("say", "j904", H, "Through the glass, you see the fabric seats, dry inside.", {**SLOW, "pre": 0, "post": 1.0}),
 ("say", "j905", H, "You roll over the metal, past the rubber tyre, to the ground.", {**SLOW, "pre": .3, "kw": [["jslope", "metal"], ["jtyre", "rubber"], ["jground", "ground"]]}),
 ("wait", 1.5),
 # ---- 10 · Showdown: Momo's notes (double points)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "j1001", M, "My notes! Two: a glass windscreen, because glass is made from sand." if "notes" in CUTS else "My notes! One: rubber tyres, because rubber is strong. Two: a glass windscreen, because glass is made from sand. Three: fabric seats, because fabric is flexible.", {"pre": .6, "post": .3}),
 ("say", "j1002", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .4}),
 *LOCK("show", 6.0),
 ("say", "j1003", H, "Locked in!", {"pre": 0}),
 ("say", "j1004", B, "Two! Sand is where glass comes from. It is not a property!", {"pre": .5}),
 ("say", "j1005", P, "Two. Glass is waterproof!", {"pre": .4, "post": .3}),
 ("scene", "fix"), ("wait", .3), ("mark", "rub"), ("wait", 1.4), ("mark", "tip"),   # line 2 rubbed out and rewritten in green; the tip card slides in
 ("say", "j1006", H, "Two fingers? Put up two more on your score hand!", {"pre": .4, "post": .3}),
 *(cut("tip", [("say", "j1007", H, "Name the property. Then link it to the job.", {"pre": .3, "post": .3})]) or [("wait", 2.4)]),
 ("scene", "board"), ("wait", .3), ("mark", "ticks"), ("wait", 1.0),   # the board MATCH THE JOB, seven rows; a green tick at the end of each (.14 s apart)
 ("say", "j1008", H, "It is important to choose a material whose physical property is suitable for the intended use of the object.", {"pre": .2, "term": ["suitable"], "hold": STRIP, "kw": [["kw_suitable", "suitable"]]}),
 HOLD("kw_suitable"),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand and the squirrel
 ("scene", "final"),
 ("say", "j1201", H, "Show me your score hand! More than one? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "j1202", H, "Did you spot the squirrel? It was on the tree by the cars! Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 13 · the dare for Episode 13
 ("scene", "dare"), ("wait", .5),
 ("say", "j1301", H, NEXT_DARE, {"pre": 0}),
 *cut("metalstrap", [("say", "j1302", B, NEXT_JOKE, {"pre": .4, "post": .6})]),
 # ---- 14 · the key words
 *kwrecap(["Use", "Parts", "Suitable"]),
 # ---- 15 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
