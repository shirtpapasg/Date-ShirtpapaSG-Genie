"""script.py: P3 EP25 "Magnets are everywhere: fridges, cranes and floating trains" (Ch 7, Making and Using Magnets, pp. 119-126: magnets in
everyday life, the MRI scanner, interacting, What I Have Learnt, the concept map), Part 1 ("Why Does the Fridge Door STAY Shut? Magnets Hiding
at Home") and Part 2 ("A Train That FLOATS? Cranes, Trains and a Magnet Toy"): the script (../p3_ep25_script.md, version 1 of 25 Nov 2026,
Opus; the teacher's 25 Nov go-ahead) as data. THE LAST P3 EPISODE: Part 2 ends with a warm goodbye for the P3 year, no dare and no promised
topic. Line ids: m... Part 1, n... Part 2.

The dare that opens Part 1 is EP24's closing dare (../ep24/script.py NEXT_DARE), word for word, without "Next time:" and "Lock in your answer!".
THE RHYTHM OF EP1-EP10 (script section 0): about 110 words a minute, a voice about 70% of the time, `post` .6, a "think" wait after every
question to the viewer, 5 s rings (6 s for the Showdown). The ORIGINAL series music (song.js), never Kampong Walk.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"usbridge", "stridertip"}   # script section 6 (the parts run long at the EP1-10 pace)
cut = lambda tag, items: [] if tag in CUTS else items
EP24_NEXT = "Next time: Pip pushes his fridge door gently. It swings shut by itself, and stays closed. There is no lock and no catch. What keeps it closed? One, the cold air inside. Two, a strip of magnet. Three, sticky glue. Lock in your answer!"
_ep24 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ep24", "script.py")
if os.path.exists(_ep24):
    _src = open(_ep24).read(); _m = re.search(r'^NEXT_DARE = "(.*)"$', _src, re.M)
    assert _m and _m.group(1) == EP24_NEXT, "EP24's NEXT_DARE changed: update Block A"
DARE_Q1 = "Pip pushes his fridge door gently. It swings shut by itself, and stays closed. There is no lock and no catch. What keeps it closed?"
DARE_Q2 = "One, the cold air inside. Two, a strip of magnet. Three, sticky glue."
assert "Next time: " + DARE_Q1 + " " + DARE_Q2 + " Lock in your answer!" == EP24_NEXT
DARE_CARDS = ["The cold air inside", "A strip of magnet", "Sticky glue"]
if os.path.exists(_ep24):
    _c = re.search(r'^NEXT_CARDS = (\[.*\])$', _src, re.M)
    assert _c and eval(_c.group(1)) == DARE_CARDS, "EP24's NEXT_CARDS changed: update DARE_CARDS"
DARE_LABEL = "What keeps it closed?"
DARE_CLUES = ["swings shut", "no lock", "no catch"]
NEXT_DARE = None   # the last P3 episode: no dare
CHANT = [("The fridge door?", "A magnetic strip!"), ("The crane?", "An electromagnet!"), ("The floating train?", "Magnets that repel!")]
CHANT_CAPS = ([1.3, 1.0, 1.4], [1.5, 1.5, 1.6])
CHANT_TOGETHER = False
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}
LC = {"speed": .85, "gap": .8}
STRIP = 3.5
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
# the book's sentences (definitions file rows 7.12a, 7.13, 7.13a, 7.14; exactly as printed)
FRIDGE = "Strips of magnets can be found inside the doors of a refrigerator. These help to keep the door closed."
CRANE = "The crane has a large iron disc that becomes a powerful electromagnet. The electromagnet then attracts objects made of iron and steel."
BOARD = "Some whiteboards have steel sheets under the writing surfaces. These allow magnets to be attracted to the whiteboards."
DOORSTOP = "The magnet on a doorstop helps to hold the door in place and prevents it from closing suddenly."
MAGLEV = "The magnets on the train and the tracks repel one another."
TAKEAWAY = "Properties of magnets allow us to use magnets in everyday life."
MRI = "MRI is a safe and painless test."
INTERACT = "Magnets can attract other magnets or magnetic objects. Magnets can also repel each other. When this happens, the magnets are interacting with one another or other objects."
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
 # ---- 1 · the cold open, SPEAKING from 0.8 s: Pip's HDB kitchen on Saturday morning; Pip pushes the fridge door (push0), it swings shut by
 #          itself and stays (shut0); the dare cards come in at "One"
 ("scene", "cold"), ("wait", .6),
 ("say", "m101", H, "Last time, we asked:", {"pre": .3}),
 ("say", "m102", H, DARE_Q1, {"pre": .4, "kw": [["push0", "pushes"], ["shut0", "swings"]]}),
 ("scene", "lasttime"),
 ("say", "m103", H, DARE_Q2, {"pre": .4, "gap": 1.3, "post": 1.6}),
 ("scene", "back"),
 ("say", "m104", H, "Hold on to your answer!", {"pre": .4, "post": .4, "kw": [["tug", "hold"]]}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.8),
 # ---- 2 · today: the magnet hunt; the game and the hidden honeybee
 ("scene", "today"),
 ("say", "m201p", P, "Today is our magnet hunt! Where are the magnets hiding in my home?", {"pre": .5, "post": .5, "kw": [["card", "hunt"]]}),
 ("scene", "game"),
 ("say", "m204", H, "A little honeybee is hiding in this video. Can you spot it?", {"pre": .4, "post": .5}),
 *cut("beetip", [("say", "m205m", M, "Bees love flowers. Check near the window!", {"pre": .3, "post": .3})]),
 ("say", "m206", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .4, "post": .5}),
 # ---- 3 · goals (Basil reads) and the countdown
 ("scene", "goals"), ("say", "m301b", B, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m302b", B, "Magnets at home.", {"pre": .3, "post": .4}), ("say", "m303b", B, "Whiteboards and doorstops.", {"pre": .3, "post": .4}),
 ("say", "m304b", B, "Magnetic or not?", {"pre": .3, "post": .7}),
 *COUNT,
 # ---- 4 · Round 1: EP24's dare (5 s ring)
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "m401", H, "Round one! What keeps Pip's fridge door closed? One, the cold air inside. Two, a strip of magnet. Three, sticky glue. Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 5.0),
 ("say", "m402", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "m403b", B, "Three! The door is so hard to pull open. It must be glue!", {"pre": .5, "post": .4}),
 ("say", "m404p", P, "Two. My steel spoon sticks to the door's soft edge.", {"pre": .4, "post": .4, "kw": [["spoon", "spoon"]]}),
 ("say", "m405m", M, "Two. Glue would get messy, and cold air cannot hold a door.", {"pre": .4, "post": .3}),
 ("wait", .3),
 # ---- 5 · BE THE MAGNETIC STRIP (the journey, quiet)
 ("scene", "waitw"),
 ("say", "m501", H, "Be the magnetic strip! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jlie"),
 ("say", "m502", H, "You are a long, thin magnet, hidden inside the soft edge of the fridge door. You go all the way round the door.", {**SLOW, "pre": 0, "post": .9, "kw": [["jalong", "all"]]}),
 ("say", "m503", H, "The door swings. The fridge's steel body comes closer. You pull towards it, and the edge presses on it, snug.", {**SLOW, "pre": .2, "post": .9, "kw": [["jswing", "swings"], ["jsteel", "steel"], ["jpull", "pull"], ["jsnug", "snug"]]}),
 ("say", "m504", H, "The door stays closed. The cold air stays in.", {**SLOW, "pre": .2, "kw": [["jcold", "cold"]]}),
 ("wait", 1.2),
 # ---- 6 · pull back out; the answer; MAGNETIC STRIP (Pip)
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m601", H, "The answer is two: a strip of magnet! Did you show two fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "m602p", P, "A magnetic strip is a long, thin magnet, such as the strip hidden inside our fridge door's soft edge!", {"pre": .4, "kw": [["kw_magnetic_strip", "magnetic", 0]]}),
 HOLD("kw_magnetic_strip"),
 # ---- 7 · Basil: where is the magnet? [LOOK CLOSER] the door's edge cut away; Mark Sentence 1 (Pip): 7.12a fridge
 ("scene", "lc1q"),
 ("say", "m701b", B, "But where is the magnet? I can't see it!", {"pre": .5, "post": .3}),
 ("scene", "lcfridge"),
 ("say", "m702", H, "Look closer. Inside the door's soft edge is a long magnetic strip. It goes all the way round the door.", {**LC, "pre": 1.2, "post": .4, "kw": [["cut", "inside"], ["round", "round"]]}),
 ("say", "m703", H, "The fridge's body is made of steel. The strip is attracted to the steel, so the door stays closed, and the cold air stays in.", {**LC, "pre": .3, "post": .4, "kw": [["steelb", "steel"], ["close", "attracted"], ["seal", "cold"]]}),
 *VERDICT("v_edge"),
 ("scene", "mark1"),
 ("say", "m704", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m705", P, FRIDGE, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 8 · HOLD ON! Basil and the shiny window frame (aluminium)
 ("scene", "holdon"),
 ("say", "m801b", B, "Magnets stick to anything shiny! So my magnet will stick to this shiny window frame!", {"pre": .5, "post": .3}),
 ("say", "m802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .4}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m803", H, "Arms crossed? One finger up!", {"pre": 0, "post": .3}),
 ("say", "m804m", M, "The window frame is made of aluminium. Aluminium is not a magnetic material, so the magnet is not attracted to it.", {"pre": .4, "post": .3, "kw": [["slide", "aluminium"]]}),
 *cut("shinyline", [("say", "m805", H, "Shiny is not the clue. Only magnetic materials, like iron and steel, are attracted.", {"pre": .4, "post": .5, "kw": [["xframe", "shiny"]]})]),
 # ---- 9 · Basil: why does a magnet stick to a whiteboard? [LOOK CLOSER] the steel sheet (7.12a strip); MAGNETIC WHITEBOARD (Momo); the
 #          doorstop: MAGNETIC DOORSTOP (Basil); Mark Sentence 2 (Basil): 7.12a doorstop
 ("scene", "lc2q"),
 ("say", "m901b", B, "A whiteboard looks like plastic. So why does my magnet stick to it?", {"pre": .5, "post": .3}),
 ("scene", "lchome"),
 ("say", "m902", H, "Look closer. Under the white writing surface is a thin sheet of steel. The magnet is attracted to the steel sheet.", {**LC, "pre": 1.2, "post": .4, "kw": [["layers", "under"], ["sheet", "thin"], ["stick", "magnet", 0]]}),
 ("mark", "strip"),
 ("say", "m903s", H, BOARD, {"pre": .4, "hold": STRIP + .5}),
 ("say", "m904m", M, "A magnetic whiteboard is a whiteboard with a steel sheet under its writing surface, such as the little board on Pip's kitchen wall!", {"pre": .3, "kw": [["kw_magnetic_whiteboard", "magnetic", 0]]}),
 HOLD("kw_magnetic_whiteboard"),
 ("say", "m905", H, "And look at Pip's bedroom door. A gust of wind blows in, but the door does not slam. The magnet on the doorstop holds the door's steel plate.", {**LC, "pre": .5, "post": .4, "kw": [["door", "look"], ["gust", "gust"], ["held", "magnet"]]}),
 ("say", "m906b", B, "A magnetic doorstop is a doorstop with a magnet that holds the door open, such as the one by Pip's bedroom door!", {"pre": .3, "kw": [["kw_magnetic_doorstop", "magnetic", 0]]}),
 HOLD("kw_magnetic_doorstop"),
 *VERDICT("v_home"),
 ("scene", "mark2"),
 ("say", "m907", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m908", B, DOORSTOP, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · score hand, the honeybee and its fun fact, the key words
 ("scene", "final"),
 ("say", "m1001", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .4, "post": .6}),
 ("scene", "liz"),
 ("say", "m1002", H, "Did you spot the honeybee? It was on the edge of the curtain!", {"pre": .6, "post": .4}),
 ("say", "m1003m", M, "Here is a fun fact! Scientists think honeybees can feel the Earth's magnetism, a little like a compass inside them!", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_bee", "honeybees"], ["ff_compass", "compass"]]}),
 ("say", "m1004", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Magnetic strip", "Magnetic whiteboard", "Magnetic doorstop"]),
 # ---- 11 · the cliffhanger: Pip's video of a floating train
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1101p", P, "Look at this train! It floats above its track, with no wheels touching!", {"pre": .3, "post": .3, "kw": [["video", "train"]]}),
 ("say", "m1102", H, "How can a train float? Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .8),
 *NYK,
]

SEQ2 = [
 # ---- 1 · "Last time...": three pictures from Part 1, one at a time
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, we found magnets hiding at home: in the fridge door, the whiteboard, and the doorstop.", {"pre": .4, "post": .3, "kw": [["pic2", "whiteboard"], ["pic3", "doorstop"]]}),
 ("wait", 2.0),
 # ---- 2 · Family Day at the park by the pond: the magnetic fishing game; the game and the hidden water strider
 ("scene", "park"), ("wait", .4),
 ("say", "n201m", M, "A magnetic fishing game! The rod has a magnet, and every fish has a steel clip.", {"pre": .3, "post": .5, "kw": [["rod", "rod"]]}),
 ("scene", "game"),
 ("say", "n202", H, "A little water strider is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 *cut("stridertip", [("say", "n203b", B, "Look on top of the pond, not under it!", {"pre": .3, "post": .3})]),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .5}),
 # ---- 3 · goals (Momo reads)
 ("scene", "goals"), ("say", "n301m", M, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302m", M, "Cranes and trains.", {"pre": .3, "post": .4}),
 ("say", "n303m", M, "Magnets in hospitals.", {"pre": .3, "post": .4}), ("say", "n304m", M, "Design a magnet toy.", {"pre": .3, "post": .7}),
 # ---- 4 · Round 1: the aluminium clips (the brief's quiz; 5 s ring)
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "n401", H, "Round one. Basil swaps every steel clip for an aluminium clip. What happens now? One, the fish are caught as before. Two, no fish can be caught. Three, the fish are pushed away. Show me your fingers.", {"pre": .3}),
 *LOCK("r1", 5.0),
 ("say", "n402", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n403b", B, "One! A clip is a clip. I will catch them all!", {"pre": .5, "post": .4}),
 ("say", "n404p", P, "Two. Aluminium is not a magnetic material.", {"pre": .4, "post": .4}),
 ("say", "n405m", M, "Two. And the magnet will not push them away either. It just does nothing.", {"pre": .4, "post": .3}),
 ("wait", .3),
 # ---- 5 · the answer
 ("scene", "r1ans"),
 ("say", "n501", H, "The answer is two! Did you show two fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "n502p", P, "A magnet does not attract aluminium, and it does not push it away either.", {"pre": .3, "post": .4, "kw": [["still", "attract"], ["steelfish", "either"]]}),
 # ---- 6 · Basil: why an electromagnet? [LOOK CLOSER] the scrapyard crane; Mark Sentence 1 (Momo): 7.12a crane
 ("scene", "lc1q"),
 ("say", "n601b", B, "Why does a scrapyard crane use an electromagnet? Why not a big normal magnet?", {"pre": .5, "post": .3}),
 ("scene", "lccrane"),
 ("say", "n602", H, "Look closer. Switch the crane's disc on, and it attracts the iron and steel. The wood and the plastic stay behind.", {**LC, "pre": 1.2, "post": .4, "kw": [["on", "switch"], ["lift", "attracts"], ["stay", "wood"]]}),
 ("say", "n603", H, "Swing it over the lorry, and switch it off. The scrap drops. A normal magnet could never let go!", {**LC, "pre": .3, "post": .4, "kw": [["swing", "swing"], ["off", "switch"], ["normal", "normal"]]}),
 *cut("usbridge", [("say", "n604", H, "Scrapyards in Singapore and in the United States work the same way.", {"pre": .3, "post": .4})]),
 *VERDICT("v_switch"),
 ("scene", "mark1"),
 ("say", "n605", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n606", M, CRANE, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 7 · Showdown: Momo's magnet-car poster (6 s ring)
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "n701", H, "Showdown! Double points. Momo's toy design has one mistake. Line one, two, or three? Show me with your fingers.", {"pre": .3}),
 ("say", "n702m", M, "One: tape a bar magnet on a toy car. Two: hold another bar magnet behind it. Three: to push the car away, face a North pole to a South pole.", {"pre": .5, "post": .3, "kw": [["l1", "one"], ["l2", "two"], ["l3", "three"]]}),
 *LOCK("show", 6.0),
 ("say", "n703", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n704b", B, "Three! A North pole and a South pole attract. To push the car, face two North poles together. Like poles repel!", {"pre": .5, "kw": [["roll", "push"]]}),
 ("scene", "fix"), ("wait", .2), ("mark", "strike"), ("wait", .4), ("mark", "rewrite"), ("wait", .4),
 ("say", "n705", H, "Three fingers? Put up two more on your score hand!", {"pre": .3, "post": .5, "kw": [["coin2", "two"]]}),
 # ---- 8 · BE A FLOATING TRAIN (the journey, quiet)
 ("scene", "waitw"),
 ("say", "n801", H, "Be a floating train! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jtrack"),
 ("say", "n802", H, "You are a train, floating a little above your track. There are magnets on you, and magnets on the track.", {**SLOW, "pre": 0, "post": .9, "kw": [["jfloat", "floating"], ["jmag", "magnets"]]}),
 ("say", "n803", H, "They push away from each other, and hold you up. Nothing rubs on the track.", {**SLOW, "pre": .2, "post": .9, "kw": [["jpush", "push"], ["jgap", "nothing"]]}),
 ("say", "n804", H, "So you glide, smooth and very fast!", {**SLOW, "pre": .2, "kw": [["jfast", "glide"]]}),
 ("wait", 1.2),
 # ---- 9 · Pip: magnets push a whole train up? [LOOK CLOSER] the maglev cut away (MAGLEV TRAIN, Pip); the MRI scanner (7.13a strip; MRI
 #          SCANNER, Momo); Mark Sentence 2 (Pip): 7.12a maglev
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "lc2q"),
 ("say", "n901p", P, "So magnets can push a whole train up?", {"pre": .5, "post": .3}),
 ("scene", "lctrain"),
 ("say", "n902", H, "Look closer. In this maglev train, the magnets on the train and on the track push each other away. The train floats, so it can go very fast.", {**LC, "pre": 1.2, "post": .4, "kw": [["cutt", "maglev"], ["repel", "push"], ["floats", "floats"]]}),
 ("say", "n903p", P, "A maglev train is a train that floats above its track on magnets, such as this train in my video!", {"pre": .3, "kw": [["kw_maglev_train", "maglev", 0]]}),
 HOLD("kw_maglev_train"),
 ("say", "n904", H, "In a hospital, there is a giant magnet too. It takes pictures of the inside of the body.", {**LC, "pre": .5, "post": .4, "kw": [["mri", "hospital"], ["pics", "pictures"]]}),
 ("mark", "strip"),
 ("say", "n905s", H, MRI, {"pre": .3, "hold": STRIP}),
 ("say", "n906m", M, "An MRI scanner is a large round magnet with a tunnel in the centre, that takes pictures of the inside of the body!", {"pre": .3, "kw": [["kw_mri_scanner", "mri", 0]]}),
 HOLD("kw_mri_scanner"),
 *VERDICT("v_help"),
 ("scene", "mark2"),
 ("say", "n907", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n908", P, MAGLEV, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 # ---- 10 · interacting (7.14 strip; INTERACTING, Basil)
 ("scene", "interact"),
 ("mark", "strip2"),
 ("say", "n1001s", H, INTERACT, {"pre": .5, "hold": STRIP * 2, "kw": [["attract", "attract"], ["repelx", "repel"], ["inter", "interacting"]]}),
 ("say", "n1002b", B, "Interacting means acting on each other, such as two magnets pulling or pushing each other!", {"pre": .3, "kw": [["kw_interacting", "interacting", 0]]}),
 HOLD("kw_interacting"),
 # ---- 11 · the chant
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 12 · score hand, the water strider (and its fun fact)
 ("scene", "final"),
 ("say", "n1201", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "n1202", H, "Did you spot the water strider? It was by the stepping stone!", {"pre": .4, "post": .4}),
 ("say", "n1203b", B, "Here is a fun fact! A water strider stands on water and does not sink. Tiny hairs on its legs keep them dry. It floats like our train, with no magnets at all!", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_stand", "stands"], ["ff_hairs", "tiny"]]}),
 ("say", "n1204", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 # ---- 13 · the P3 goodbye: the takeaway (7.13), thank you for the year, count the magnets at home (no dare, no promised topic)
 ("scene", "bye"),
 ("mark", "map"),
 ("say", "n1301s", H, TAKEAWAY, {"pre": .6, "hold": STRIP}),
 ("say", "n1302", H, "And that is the end of our Primary Three science adventures! Thank you for playing with Pip, Basil and Momo all year.", {"pre": .6, "post": .5, "kw": [["badges", "end"], ["thanks", "thank"]]}),
 ("say", "n1303p", P, "Count the magnets in your home today, and tell someone how many you found!", {"pre": .4, "post": .6}),
 # ---- 14 · the key words; 15 · "Now you know!"
 *kwrecap(["Maglev train", "MRI scanner", "Interacting"]),
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
