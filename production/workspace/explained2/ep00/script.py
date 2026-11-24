"""script.py: P3 EP0, the study-skills special (P3 to P6) "Make your own mind map", Part 1 ("Read It or Make It? Which Mind Map Do You
REMEMBER?") and Part 2 ("One Week, One Blank Page. Who Remembers MORE?"): the script (../p3_ep00_mindmap_script.md, version 1 of 24 Nov 2026,
Opus; APPROVED by the teacher 24 Nov 2026: "OK to the mind map script", every recommendation of its section 13 accepted) as data. Every
spoken line is word for word as in the script's tables (sections 4 and 5). make_voice.py records the lines; build_tl.py lays them on the
timeline. Line ids as in the script's section 6: a<segment><nn><speaker> Part 1, b<segment><nn><speaker> Part 2 (h Heart, p Pip, b Basil,
m Momo).

The teacher's decisions (24 Nov 2026, section 13): two parts; GENERATION EFFECT kept as a shelf key word and Heart's "spaced practice" said
once; "one day, three days and a week" kept; the journey "Be an idea" kept; the four Mark Sentences approved as written; Magnets as the
worked example (the poster's "Electrical method" on the Compare screen is fine); the old video zxerWQ9zGII stays public, out of the
playlist, with a NEW VERSION line (upload time); the crow and the community cat are fine; approve-before-render applies to this special.

Definitions (1d, "X means ..., such as ..."): MAKE YOUR OWN (Momo, a503m), GENERATION EFFECT (Basil, a606b), MEMORY FIRST (Basil, a705b),
CHECK AND FIX (Basil, b508b), SPACE IT OUT (Momo, b802m). Heart names the scientists' terms once each: the generation effect (through
Basil's line, after Heart's "Scientists have a name for this."), spaced practice (b801h); retrieval practice only in the cut line a706h.

Pace (SERIES_FORMAT 3): as EP15 to EP22. Heart speed .90, .5 s between sentences; buddies 12% slower (make_voice.py); a key word pops
large and holds 2.0 s (HOLD); Mark Sentence cards hold 2.5 s after the buddy's last word. The journey (SLOW): Heart .85, 1.0 s between
sentences, softer. LOOK CLOSER (LC): Heart .85, .8 s between sentences; each ends on ONE verdict tag (mark v_*) held 2.5 s.
A voice within the first second (SERIES_FORMAT 11.1): Part 1 Heart at 0.30 s over the void deck; Part 2 Heart's "Last time..." at 0.30 s.

SEQ items (as EP16 to EP22): ("scene", name[, {"at": mark, "d": s}]) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) ·
("hold", mark, secs, gap) · ("chant", id) · ("unison", id, text, {opts}). say opts: pre / post (s; build_tl scales by .75), speed, gap,
soft, term, kw [[mark, word, nth]], hold, after [id, s], pron {text: spoken as} (the caption keeps the script's words).

CUTS (script section 6). The three lines kept out of the tables (a706h, b510b, b1202p) are cut from the start; section 6's "if a part runs
over" lists are tags here (applied in order only if a part is over).
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"a706h", "b510b", "b1202p"}   # script section 6: "Lines kept here, out of the tables, that can come back if a part has room"
# Part 2 over 5:46 at Stage 1? cut in this order (none of it teaching): "b406h" (Heart's "Let's watch the week!"), "lockshort" (Heart's
# "Lock in first with your fingers..." -> "One finger for every point."), "posterread" (Pip's poster read -> "Line one, line two, line
# three"), "pagesquiet" (the pages' drawing quiet 3.0 -> 2.0 s). Part 1 over 5:30: "titleslam", "crowtip" (Basil's crow tip),
# "laterline" (Heart's "We will test your memory later. No scrolling back!" becomes the on-screen tag only).
cut = lambda tag, items: [] if tag in CUTS else items

PRON = {"TheOneApp": "The One App"}   # as EP1 (ep01/script.py): "the one app", the series plan's spoken form

# the chant (Part 2): call and response, YOUR TURN! after each line (script segment 10). Each chanted line is split at its beat: the call on
# the bar line, the rest on the stomp.
CHANT = [("Make it", "yourself!"), ("Memory first,", "then check!"), ("One day, three days,", "a week!")]
CHANT_CAPS = ([1.0, 1.1, 1.5], [1.1, 1.1, 1.0])
CHANT_TOGETHER = False
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# the four Mark Sentences (our own words: script section 10 A; approved by the teacher word for word, 24 Nov 2026)
MS1 = "A mind map you make yourself helps you remember more than a map you only read."
MS2 = "Draw your map from memory first, with the poster closed."
MS3 = "Then check your map, and fix what you missed."
MS4 = "Draw your map again from memory after one day, three days and a week."
FOOT = "Study Skills · P3 to P6 · Make your own mind map"
# the puzzle (Part 1 Round 1): read pairs and work-out pairs (script section 3)
PUZ_READ = [("push", "pull"), ("compass", "needle"), ("glass", "wood")]
PUZ_WORK = [("attract", "repel", "re_el", "p"), ("North", "South", "S_uth", "o"), ("magnetic", "iron", "i_on", "r")]
R1_CARDS_1 = ["The words I read", "The words I worked out", "Both the same"]
NEXT_CARDS = ["Pip", "Basil", "Both the same"]

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
 # ---- 1 · cold open, Heart speaking at 0.30 s over THE VOID DECK STUDY CORNER (Monday after school): Pip at the printed Magnets poster on its
 #          easel (reading it), Basil at his blank sheet (thinking), Momo between them; the ONE-WEEK MEMORY TEST card on the notice board
 #          (HOME, top left); the crow on top of the lamp post outside (its intro spot). One slow push between the two from the first frame.
 ("scene", "void"),
 ("say", "a101h", H, "Pip reads a ready-made mind map. Basil makes his own, from memory. One week later, who will remember more?", {"pre": .4, "post": .3, "kw": [["pipread", "pip"], ["basilmake", "basil"], ["oneweek", "one"]]}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.6 if "titleslam" in CUTS else 2.2),
 ("scene", "plans"),
 ("say", "a102p", P, "I will read the poster five times. Reading feels safe!", {"pre": .5}),
 ("say", "a103b", B, "And I will make my own map. Let's see who remembers more!", {"pre": .3, "post": .2}),
 # ---- 2 · the one-week test (the camera glides to the notice board, about 2 s on the card), the hidden crow (named first; ONE push-in from
 #          the void deck onto the crow on the lamp post), the rules
 ("scene", "rules"),
 ("say", "a201m", M, "Our Magnets quiz is next Monday. Let's find out whose way works best!", {"pre": .5, "post": .3, "kw": [["board", "magnets"], ["ways", "whose"]]}),
 ("scene", "game"),
 ("say", "a202h", H, "A little crow is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 *cut("crowtip", [("say", "a203b", B, "Look up high, on the railings and the lamp posts!", {"pre": .3, "post": .1})]),
 ("say", "a204h", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Basil reads the three cards) and the countdown
 ("scene", "goals"), ("say", "a301b", B, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "a302b", B, "Make your own map.", {"pre": .3, "post": .3}),
 ("say", "a303b", B, "Work it out to remember it.", {"pre": .3, "post": .3}), ("say", "a304b", B, "Memory first.", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 4 · Round 1: the word puzzle (the viewer reads three pairs and works out three; the cards go under a cloth; which will you remember?)
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "puzzle"),
 ("say", "a401h", H, "Round one is a word puzzle. Play it with the Buddies!", {"pre": .3, "post": .2}),
 ("say", "a402h", H, "Read the three words on the left. On the right, three words have letters missing. Work them out!", {"pre": .3, "kw": [["left", "left"], ["right", "right"]]}),
 ("wait", 3.2), ("mark", "fill1"), ("wait", .7), ("mark", "fill2"), ("wait", .7), ("mark", "fill3"), ("wait", .5),
 ("say", "a403m", M, "Repel, South and iron! I worked them all out!", {"pre": .3, "post": .2}),
 ("scene", "r1"), ("mark", "cloth"),
 ("say", "a404h", H, "Later in this video, which words will you remember better? One, the words you read. Two, the words you worked out. Three, both the same. Show me your fingers!", {"pre": .4}),
 *LOCK("r1", 5.0),
 ("say", "a405h", H, "Locked in!", {"pre": 0}),
 ("say", "a406p", P, "One. The words on the left were clear and easy, so they will stay in my head.", {"pre": .5}),
 ("say", "a407m", M, "Two. When I work out a riddle, I never forget it!", {"pre": .4}),
 ("say", "a408b", B, "Two! I had to think hard for those words, so my brain held on to them.", {"pre": .4, "kw": [["hard", "hard"]]}),
 ("scene", "later"),
 *([("wait", .5), ("mark", "latertag"), ("wait", 2.2)] if "laterline" in CUTS else
   [("say", "a409h", H, "We will test your memory later. No scrolling back!", {"pre": .4, "post": .3, "kw": [["latertag", "later"]]})]),
 # ---- 5 · Read it or make it? [LOOK CLOSER]: Pip's eyes slide over the ready-made poster; Basil stops, thinks and chooses his own words;
 #          MAKE YOUR OWN (Momo); Mark Sentence 1 (Momo)
 ("scene", "lcmaps"),
 ("say", "a501h", H, "Look closer. Pip reads the ready-made Magnets poster. His eyes slide along the branches, again and again.", {**LC, "pre": 1.2, "kw": [["slide", "slide"], ["again", "again", 0]]}),
 ("say", "a502h", H, "Basil makes his own map. He stops, he thinks, and he chooses his own words for every branch.", {**LC, "pre": .3, "kw": [["bmake", "basil"], ["stops", "stops"], ["thinks", "thinks"], ["chooses", "chooses"]]}),
 ("say", "a503m", M, "Making your own map means you work out every branch yourself, such as Basil's Two poles branch, with North pole and South pole!", {"pre": .2, "kw": [["kw_make_your_own", "making"], ["twopoles", "two"]]}),
 HOLD("kw_make_your_own"),
 *VERDICT("v_make"),
 ("scene", "mark1"),
 ("say", "a504m", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "a505m", M, MS1, {"pre": 0}),
 ("wait", 2.5),
 # ---- 6 · the memory test (a 4 s quiet: the viewer says the words) and [LOOK CLOSER]: what Pip and Basil still have (needle fades away
 #          completely from Pip's list); the answer (two, the words you worked out); GENERATION EFFECT (Basil)
 ("scene", "memtest"),
 ("say", "a601h", H, "Time for the memory test! Without looking back, say the six words from the right side of each card. Think!", {"pre": .5, "kw": [["think", "think"]]}),
 ("mark", "quiet0"), ("wait", 4.0), ("mark", "quiet1"),
 ("scene", "lcmem"),
 ("say", "a602h", H, "Look closer at what Pip remembered, and what Basil remembered.", {**LC, "pre": 1.2, "kw": [["pipl", "pip"], ["basl", "basil"]]}),
 ("wait", 1.6), ("mark", "needle"), ("wait", 1.4), ("mark", "lift"), ("wait", .6),
 ("say", "a603h", H, "Did you remember more of the words you worked out? Many people do. Scientists have tested this many times, with grown-ups and with children, and the worked-out words are remembered better. So the answer is two! Did you show two fingers? Put one finger up!", {**LC, "pre": .3, "kw": [["many", "many", 0], ["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "a604p", P, "Oh! I still have repel, South and iron. But needle, a word I did not work out, is gone!", {"pre": .3, "kw": [["gone", "gone"]]}),
 ("say", "a605h", H, "Scientists have a name for this.", {"pre": .3, "post": .2, "kw": [["aname", "name"]]}),
 ("say", "a606b", B, "The generation effect means you remember something better when you work it out yourself, such as the missing words in our puzzle!", {"pre": .2, "kw": [["kw_generation_effect", "generation"]]}),
 HOLD("kw_generation_effect"),
 *VERDICT("v_gen"),
 # ---- 7 · HOLD ON! Momo "makes her own" map by copying the poster word for word; Pip turns the poster to face the wall and slides her a
 #          blank sheet; MEMORY FIRST (Basil); Mark Sentence 2 (Basil)
 ("scene", "holdon"),
 ("say", "a701m", M, "My turn! I'm making my own map too. I copy each branch from the poster, word for word.", {"pre": .5, "post": .2, "kw": [["try", "copy"], ["wordfor", "word", 0]]}),
 ("say", "a702h", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "a703h", H, "Arms crossed? One finger up!", {"pre": 0, "post": .1}),
 ("say", "a704p", P, "Momo, copying is not remembering. Close the poster first, and draw what you remember. Then you can check.", {"pre": .3, "post": .2, "kw": [["turn", "close"], ["sheet", "draw"]]}),
 ("say", "a705b", B, "Memory first means you draw your map from memory before you look, such as my map, with the poster closed!", {"pre": .2, "kw": [["kw_memory_first", "memory", 0]]}),
 HOLD("kw_memory_first"),
 *cut("a706h", [("say", "a706h", H, "Pulling an idea out of your memory makes it stick. Scientists call this retrieval practice.", {"pre": .2, "post": .3, "term": ["retrieval practice"]})]),
 ("scene", "mark2"),
 ("say", "a707b", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "a708b", B, MS2, {"pre": 0}),
 ("wait", 2.5),
 # ---- 8 · score hand, the crow (and its fun fact), the key words
 ("scene", "final"),
 ("say", "a801h", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .3, "post": .5}),
 ("scene", "liz"),
 ("say", "a802h", H, "Did you spot the crow? It was on top of the letterboxes in the void deck!", {"pre": .6, "post": .2}),
 ("say", "a803m", M, "Here is a fun fact! Crows can remember a person's face for years. Scientists wore masks near crows, and years later, the crows still knew the masks!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_mask", "scientists"], ["ff_years", "years", 1], ["ff_us", "knew"]]}),
 ("say", "a804h", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Make your own", "Generation effect", "Memory first"]),
 # ---- 9 · the lock-in for Part 2: who will remember more? (the void deck at dusk; the dare banner with THREE numbered picture cards)
 ("scene", "cliff"),
 ("say", "a901p", P, "Tonight, I will read the poster five times, all at once.", {"pre": .4}),
 ("say", "a902b", B, "And I will draw my map again from memory, on Tuesday and on Thursday.", {"pre": .3, "kw": [["tuethu", "tuesday"]]}),
 ("scene", "nextq"),
 ("say", "a903h", H, "Next Monday, a blank page each. Who draws more of the Magnets map? One, Pip. Two, Basil. Three, both the same. Lock in your answer, and find out in Part Two!", {"pre": .3, "kw": [["c1", "one"], ["c2", "two", 0], ["c3", "three"], ["part2", "part"]]}),
 ("wait", .5),
 # ---- 10 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": a calm recap, three pictures from Part 1, one at a time (each >= 2.5 s), Heart speaking at 0.30 s
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "b101h", H, "Last time, we found that a mind map you make yourself helps you remember more than one you only read. And you draw it from memory first.", {"pre": .4, "post": .4, "gap": .7, "kw": [["pic2", "remember"], ["pic3", "and", 0]]}),
 # ---- 2 · the void deck at night (Monday evening) and the hidden cat (ONE push-in onto the cat asleep under the stone bench: the intro spot)
 ("scene", "week"), ("mark", "kw_carry"), ("wait", .4), ("mark", "weekIn"), ("wait", 1.3),   # kw_carry: Part 1's MAKE YOUR OWN on the shelf (script "Rules bent" 5)
 ("scene", "game"),
 ("say", "b201h", H, "A little cat is hiding in this video. Can you spot it?", {"pre": .4, "post": .2}),
 ("say", "b202m", M, "Cats love a quiet corner. Check under the benches!", {"pre": .3, "post": .2}),
 ("say", "b203h", H, ("One finger for every point." if "lockshort" in CUTS else "Lock in first with your fingers. One finger for every point."), {"pre": .3, "post": .4}),
 # ---- 3 · today's goals (Momo reads)
 ("scene", "goals"), ("say", "b301m", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "b302m", M, "Make one in TheOneApp.", {"pre": .3, "post": .3}),
 ("say", "b303m", M, "Check and fix.", {"pre": .3, "post": .3}), ("say", "b304m", M, "Space it out.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: your answer from Part 1 (a short 3 s ring: the answer was locked in at the end of Part 1); the picks
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "b401h", H, "Round one! Next Monday, a blank page each. Who draws more of the map, Pip or Basil? Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 3.0),
 ("say", "b402h", H, "Locked in!", {"pre": 0}),
 ("say", "b403p", P, "Two. Basil will practise pulling it out of his memory. I will only read mine.", {"pre": .5}),
 ("say", "b404m", M, "Two! Basil will check his map and fix the gaps, every time.", {"pre": .4}),
 ("say", "b405b", B, "Three! Pip will read his map five times. That's more than my three!", {"pre": .4, "post": .3}),
 *cut("b406h", [("say", "b406h", H, "Let's watch the week!", {"pre": .3, "post": .3})]),
 ("mark", "seeyou"), ("wait", .4 if "b406h" in CUTS else 0),
 # ---- 5 · make one together in TheOneApp (its REAL screens, captured from /home/user/theoneapp), the check [LOOK CLOSER]: Mark my mind map,
 #          Compare with the poster, add the missing branch; CHECK AND FIX (Basil); Mark Sentence 1 (Pip)
 ("scene", "app1"),
 ("say", "b501h", H, "Monday evening. Let's make one together in TheOneApp. Tap Mind Maps, then Make my own mind map.", {"pre": .5, "kw": [["tapmm", "tap"], ["tapmine", "make", 1]]}),
 ("scene", "app2"),
 ("say", "b502h", H, "Pick the chapter, Magnets, and tap Start a new mind map. The middle word is already there.", {"pre": .4, "kw": [["pickch", "pick"], ["tapstart", "start"], ["middle", "middle"]]}),
 ("scene", "app3"),
 ("say", "b503b", B, "Poster closed! Two poles: North pole and South pole. Poles together: unlike poles attract, and like poles repel.", {"pre": .4, "kw": [["br1", "two"], ["br2", "together"]]}),
 ("say", "b504b", B, "Magnetic materials: iron and steel, not copper or aluminium. And a magnet can pull, and push!", {"pre": .3, "kw": [["br3", "magnetic"], ["br4", "and", 1]]}),
 ("say", "b505h", H, "Now the check. Tap Mark my mind map.", {"pre": .4, "kw": [["tapmark", "tap"]]}),
 ("scene", "lccheck"),
 ("say", "b506h", H, "Look closer. A green tick pops onto every idea. But one big idea from the poster is missing.", {**LC, "pre": 1.2, "kw": [["ticks", "green"], ["missing", "missing"]]}),
 ("say", "b507h", H, "Tap Compare with the poster. There it is: Making a magnet. Tap Back to my mind map, and add it in your own words.", {**LC, "pre": .3, "kw": [["compare", "compare"], ["thereitis", "there"], ["backto", "back"], ["addit", "add"]]}),
 ("say", "b508b", B, "Check and fix means you check your map, then add what you missed, such as my Making a magnet branch, with the stroke method!", {"pre": .2, "kw": [["kw_check_and_fix", "check", 0]]}),
 HOLD("kw_check_and_fix"),
 ("say", "b509h", H, "Mark it again. Every idea is right, and the map is complete!", {"pre": .2, "kw": [["mark2", "mark"], ["complete", "complete"]]}),
 *VERDICT("v_fix"),
 *cut("b510b", [("say", "b510b", B, "The stroke method! I missed it. Now I will remember it, because I found the gap and fixed it myself.", {"pre": .2})]),
 ("scene", "mark3"),
 ("say", "b511p", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b512p", P, MS3, {"pre": 0}),
 ("wait", 2.5),
 # ---- 6 · Showdown: Pip's steps poster (double points); line 2 struck, Basil's green rewrite; the +2 coin
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "b601p", P, "I made a poster of the steps for our class. " + ("Line one, line two, line three." if "posterread" in CUTS else "Line one: make your own map in TheOneApp. Line two: tap Compare with the poster first, and copy it. Line three: tap Mark my mind map, and fix what you missed."), {"pre": .4, "post": .2, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 ("say", "b602h", H, "Showdown! Double points. Pip's poster has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 *LOCK("show", 5.0),
 ("say", "b603h", H, "Locked in!", {"pre": 0}),
 ("scene", "fix"),
 ("say", "b604b", B, "Line two! If you look at the poster first, you are copying, not remembering. Memory first, then compare!", {"pre": .5, "kw": [["strike", "two"], ["rewrite", "memory"]]}),
 ("say", "b605h", H, "Two fingers? Put up two more on your score hand!", {"pre": .3, "post": .3, "kw": [["coin2", "two", 1]]}),
 # ---- 7 · BE AN IDEA (the journey through the week; a picture of Basil's memory, a garden of paths): the grass grows over the path between
 #          the days; on Tuesday and Thursday Basil pulls the idea out from memory and the path gets clearer
 ("scene", "waitw"),
 ("say", "b701h", H, "Be an idea! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "garden"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "gin"),
 ("say", "b702h", H, "You are an idea: like poles repel. You live in a picture of Basil's memory. It looks like a garden full of paths.", {**SLOW, "pre": 0, "post": .6, "kw": [["sign", "like"], ["memory", "memory"], ["paths", "garden"]]}),
 ("say", "b703h", H, "A day goes by. Grass starts to grow over your path. On Tuesday, Basil draws his map from memory, and walks the path to find you. Now it is clearer!", {**SLOW, "pre": .2, "post": .6, "kw": [["grow1", "day"], ["tue", "tuesday"], ["walk1", "walks"], ["clear1", "clearer"]]}),
 ("say", "b704h", H, "Two more days. The grass grows a little. On Thursday, Basil finds you again. The path is wide and easy to find.", {**SLOW, "pre": .2, "post": .4, "kw": [["grow2", "two"], ["thu", "thursday"], ["walk2", "finds"], ["wide", "wide"]]}),
 ("scene", "pullout"), ("mark", "pullout"),
 ("say", "b705h", H, "There is no real garden in your head. It is a picture of what scientists found.", {**SLOW, "pre": .5, "post": .3}),
 # ---- 8 · SPACE IT OUT (Momo); Mark Sentence 2 (Basil)
 ("scene", "space"),
 ("say", "b801h", H, "Scientists call this spaced practice.", {"pre": .4, "post": .4, "term": ["spaced practice"], "kw": [["spaced", "spaced"]]}),
 ("say", "b802m", M, "Space it out means you draw your map again after a few days, not all at once, such as on Tuesday and Thursday, like Basil!", {"pre": .2, "kw": [["kw_space_it_out", "space"], ["rowtue", "tuesday"]]}),
 HOLD("kw_space_it_out"),
 ("scene", "mark4"),
 ("say", "b803b", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "b804b", B, MS4, {"pre": 0}),
 ("wait", 2.5),
 # ---- 9 · next Monday: two blank pages [LOOK CLOSER] (Round 1's answer)
 ("scene", "pages"),
 ("say", "b901h", H, "Next Monday. A blank page each. Draw the Magnets map from memory!", {"pre": .4}),
 ("mark", "draw0"), ("wait", 2.0 if "pagesquiet" in CUTS else 3.0), ("mark", "draw1"),
 ("scene", "lcpages"),
 ("say", "b902h", H, "Pip's page has two branches. Basil's page has all five! The answer is two: Basil. Did you show two fingers? Put one finger up!", {**LC, "pre": 1.2, "kw": [["pipp", "pip's"], ["basp", "basil's"], ["ansglow", "two", 1], ["coin1", "one"]]}),
 ("say", "b903p", P, "Reading it five times felt easy, but it did not stick. Next time, I'm making my own!", {"pre": .3}),
 *VERDICT("v_week"),
 # ---- 10 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 11 · score hand, the cat (and its fun fact)
 ("scene", "final"),
 ("say", "b1101h", H, "Show me your score hand! Three fingers? You beat the Buddies. High five!", {"pre": .5, "post": .3}),
 ("scene", "liz"),
 ("say", "b1102h", H, "Did you spot the cat? It was curled up on the doormat, by the lift!", {"pre": .3, "post": .2}),
 ("say", "b1103m", M, "Here is a fun fact! A pet cat can learn its own name. It can tell its name apart from other words, even when a stranger says it!", {"pre": .3, "post": .2, "kw": [["ff_in", "fun"], ["ff_name", "name", 0], ["ff_stranger", "stranger"]]}),
 ("say", "b1104h", H, "Tell someone at home!", {"pre": .3, "post": .3}),
 # ---- 12 · your dare (three cards, each a small picture of TheOneApp's real screen)
 ("scene", "dare"),
 ("say", "b1201h", H, "Your dare: make your own Magnets map in TheOneApp today. Tomorrow, start a new map, and draw it again from memory. Then tap Mark my mind map. How much will you remember?", {"pre": .4, "kw": [["d1", "today"], ["d2", "tomorrow"], ["d3", "then"]]}),
 *cut("b1202p", [("say", "b1202p", P, "Next week, I'm making my own map, of Life Cycles. Basil, will I remember more than you?", {"pre": .4}), ("say", "b1203b", B, "Game on!", {"pre": .3})]),
 ("wait", .3),
 # ---- 13 · the key words
 *kwrecap(["Make your own", "Check and fix", "Space it out"]),
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
