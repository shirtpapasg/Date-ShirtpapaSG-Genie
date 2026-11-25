"""script.py: P3 EP27, the P3-to-P4 Bridge, "The Great Ice Cream Rescue" (P3 Finale / P4 Pilot): the script (../p3_ep27_bridge_script.md,
version 1 of 25 Nov 2026, Opus) as data. ONE video (about 6 minutes, the P4 plan's 4-6 min): one continuous story against one deadline (the
party in twenty minutes), so a split would break the clock. Every spoken line is word for word as in the script's tables.

THE P4 STYLE (teacher, 25 Nov 2026; ../../../../secondbrain Plans/videos/P4-new-direction.md): format B, THE FIX-IT (comedy with a deadline).
The problem is the hook inside the first 20 s (no introductions); the viewer PICKS THE FIX out of three fix cards (run faster / fan it / wrap
it in Pip's wool scarf), locks it in with think time (a 6 s ring), then the story tests the three fixes: fix 1 fails (Pip runs out of puff and
hugs the box: "the cold is going into my tummy" -> heat flows OUT of Pip into the ice cream), fix 2 fails (the fan: the misconception "wind is
cool"; the slow-motion replay; LOOK CLOSER: 33 degrees vs minus 18 degrees, HOTTER TO COLDER), fix 3 is the twist (wool "is warm"; the journey
into the trapped air; POOR CONDUCTOR OF HEAT), then the real solution TESTED (a fair test, P3 EP24's skill: FAIR TEST) and used (the scarf +
the covered walkway), a P3 callback (the magnet fishes the steel bottle opener out of the drain; the aluminium ring pull stays), the party
(the fan callback joke), the words that earn marks, the P3 year, the P4 level-up and teaser, the read-along, "Now you know!", a blooper.

Line ids: e<segment><nn>, a letter for a buddy line (p, b, m). Marks the picture and the sound share are listed in ../p3_ep27_bridge_script.md
section 6. SEQ items as EP16 to EP22: ("scene", name) · ("say", id, who, text, {opts}) · ("wait", s) · ("mark", name) · ("hold", mark, secs,
gap) · ("unison", id, text, {opts}). EP27 adds say opt "slowof": [id, stretch, semitones]: the line is made from another line's recording,
slowed and pitched down (the slow-motion replay); make_voice.py.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = set()
cut = lambda tag, items: [] if tag in CUTS else items
CHANT = [("Hot to cold!", "Heat flows!")]; CHANT_CAPS = ([1.0], [1.2])   # not used in EP27 (no chant: see the script's header); make_voice imports them
PRON = {}
SLOW = {"speed": .85, "gap": 1.0, "soft": True}   # the journey
LC = {"speed": .85, "gap": .8}                     # LOOK CLOSER
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
FIX_CARDS = ["Run faster", "Fan it", "Wrap it in wool"]
# the words that earn marks (P4 Ch 6-7 wording, the way accepted in PSLE): heat flows from a hotter to a colder place; a poor conductor of heat
# slows down the heat flowing (gained) from the warmer surroundings
EXAM = "Heat flows from a hotter place to a colder place. Wool is a poor conductor of heat. It slows down the heat flowing from the warmer surroundings to the ice cream."

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
 ("wait", 4.6)]
LOCK = lambda n, d=6.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]

SEQ1 = [
 # ---- 1 · THE PROBLEM, speaking from 0.6 s: the mama shop at the foot of an HDB block, 2 pm, the last day of P3. The buddies at the
 #          shop's ice-cream freezer with the class's box of ice-cream cups; the shop's thermometer reads 33 degrees; the party clock pill
 #          PARTY IN 20:00 pops on "twenty". No introductions: the deadline IS the first line.
 ("scene", "cold"), ("wait", .45),
 ("say", "e101", H, "It's the last day of Primary 3, and the class party at the void deck starts in twenty minutes!", {"pre": .2, "post": .2, "kw": [["clock", "twenty"]]}),
 ("say", "e102m", M, "But the ice cream is still here at the mama shop, and it's thirty-three degrees outside!", {"pre": .25, "post": .2, "kw": [["therm", "thirty-three"]]}),
 ("say", "e103b", B, "Ice cream against the Singapore sun. The sun always wins.", {"pre": .3, "post": .3}),
 ("say", "e104p", P, "Don't worry. I've got a plan! Actually, I've got three plans!", {"pre": .3, "post": .1, "kw": [["three", "three"]]}),
 ("say", "e105b", B, "Oh no.", {"pre": .35, "post": .2}),
 ("scene", "title"), ("mark", "title"),
 ("say", "e106", H, "The Great Ice Cream Rescue!", {"pre": .35, "post": .7}),
 # ---- 2 · THE FIX CARDS: the viewer picks the fix (three cards, big and numbered; the lock-in takes the stage)
 ("scene", "fixcards"),
 ("say", "e201p", P, "Plan one, I run super fast. Plan two, we fan it all the way. Plan three, I wrap it in my wool scarf!", {"pre": .4, "post": .4, "kw": [["c1", "one"], ["c2", "two"], ["c3", "three"]]}),
 ("say", "e202", H, "Which fix gets the ice cream to the party still frozen? Show me one, two or three fingers!", {"pre": .4, "post": .2, "kw": [["show", "show"]]}),
 ("scene", "lock"), *LOCK("fix", 6.0),
 ("scene", "picks"),
 ("say", "e203p", P, "One! Speed is my thing!", {"pre": .2, "post": .2}),
 ("say", "e204m", M, "Two! Wind is nice and cool!", {"pre": .3, "post": .2}),
 ("say", "e205b", B, "Three. The scarf.", {"pre": .3, "post": .3}),
 ("say", "e206m", M, "Wool? Wool is warm, Basil! You'll melt it!", {"pre": .25, "post": .3}),
 ("say", "e207", H, "Three fixes. Let's test them, one by one!", {"pre": .4, "post": .5}),
 # ---- 3 · FIX 1, RUN (slapstick, gentle): the sunny path from the shop to the void deck. Pip zooms off, comes back puffing, flops onto the
 #          kerb in the sun and hugs the box to his tummy. The misconception "the cold is going into my tummy" is corrected at once.
 ("scene", "run"), ("mark", "zoom"),
 ("say", "e301", H, "Fix one. Pip runs!", {"pre": .3, "post": 1.6}),
 ("mark", "flop"), ("wait", .5),
 ("say", "e302p", P, "Phew! Too far! I'll just hug it close, to keep it warm and safe.", {"pre": .2, "post": .2, "kw": [["hug", "hug"]]}),
 ("say", "e303m", M, "Warm? Pip, it's ice cream!", {"pre": .25, "post": .2}),
 ("say", "e304p", P, "Brr! My tummy feels cold! The cold is going into my tummy!", {"pre": .3, "post": .3}),
 ("say", "e305", H, "Not quite, Pip. Nothing cold is flowing. Your tummy is warmer than the ice cream, so heat flows out of your tummy into the ice cream. Your tummy loses heat, and the ice cream gains heat and melts!", {"pre": .35, "post": .3, "kw": [["outflow", "out"], ["loses", "loses"], ["gains", "gains"]]}),
 *VERDICT("v_run"),
 ("say", "e306b", B, "Speed, amazing. Stamina, chinchilla.", {"pre": .1, "post": .5}),
 # ---- 4 · FIX 2, FAN: Momo fans the box on the same path (her pick); the cups sweat and drip; the plan-goes-wrong sting
 ("scene", "fan"),
 ("say", "e401", H, "Fix two. Momo fans the ice cream!", {"pre": .3, "post": .2}),
 ("mark", "fanon"),
 ("say", "e402m", M, "Fan, fan, fan! Cool wind for my ice cream!", {"pre": .3, "post": .5}),
 ("mark", "drip"), ("wait", .5),
 ("say", "e403m", M, "Oh no! It's dripping!", {"pre": .1, "post": .5}),
 # ---- 5 · THE SLOW-MOTION REPLAY: "Let's look at that again, in slow motion." (film border, SLOW MOTION tag, the drip in slow motion and
 #          Momo's "Oh no!" stretched and low)
 ("scene", "replay"),
 ("say", "e501", H, "Let's look at that again, in slow motion.", {"pre": .3, "post": .1}),
 ("mark", "slow0"),
 ("say", "e403s", M, "Oh no! It's dripping!", {"pre": .2, "post": .3, "slowof": ["e403m", 2.4, -6]}),
 # ---- 6 · [LOOK CLOSER] the fan: a fan cannot make air cold; 33 vs minus 18; HOTTER TO COLDER (Basil, who was right); heat arrows in
 ("scene", "lcfan"),
 ("say", "e601", H, "Look closer. A fan cannot make air cold. It only pushes the air along. This air is thirty-three degrees, and the ice cream is about minus eighteen degrees Celsius.", {**LC, "pre": .3, "post": .3, "kw": [["push", "pushes"], ["t33", "thirty-three"], ["t18", "minus"]]}),
 ("say", "e602b", B, "Heat flows from a hotter place to a colder place. So heat flows from the warm air into the cold ice cream!", {"pre": .4, "post": .1, "kw": [["kw_hotter_to_colder", "hotter"], ["arrows", "so"]]}),
 HOLD("kw_hotter_to_colder"),
 ("say", "e603", H, "Yes! The fan pushes more warm air past the ice cream, so more heat flows in, and it melts faster.", {**LC, "pre": .3, "post": .2, "kw": [["more", "more"]]}),
 *VERDICT("v_fan"),
 ("say", "e604b", B, "So the fan is a heat delivery service.", {"pre": .1, "post": .4}),
 # ---- 7 · FIX 3, THE SCARF (the twist): back at the shop door; fifteen minutes left; Pip wraps the box in his wool scarf
 ("scene", "scarf"),
 ("say", "e701m", M, "We only have fifteen minutes left! This is a snack emergency!", {"pre": .3, "post": .3, "kw": [["clock15", "fifteen"]]}),
 ("say", "e702p", P, "Fix three! My wool scarf, for the cold air-con on the train. I wrap up the whole box!", {"pre": .3, "post": .3, "kw": [["wrap", "wrap"]]}),
 ("say", "e703m", M, "But wool keeps you warm. Won't it warm up the ice cream?", {"pre": .3, "post": .5}),
 ("scene", "waitw"),
 ("say", "e704", H, "Let's find out. Be a tiny bit of air, trapped inside the wool! Shrink down. Quietly.", {"pre": .3, "post": .6, "kw": [["be", "be"], ["shrinkw", "shrink"]]}),
 # ---- 8 · BE THE THING: the journey into the scarf (quiet; the journey pad only)
 ("scene", "shrink"), ("wait", 1.0),
 ("say", "e801", H, "You are a tiny bit of air, trapped between the curly wool fibres. They wrap around you like soft ropes.", {**SLOW, "pre": 0, "post": .3}),
 ("say", "e802", H, "On one side is the hot afternoon air. On the other side is the frozen box.", {**SLOW, "pre": .3, "post": .3, "kw": [["jhot", "hot"], ["jcold", "frozen"]]}),
 ("say", "e803", H, "Heat flows in from the hot side. But heat does not flow easily through wool, or through trapped air like you.", {**SLOW, "pre": .3, "post": .3, "kw": [["jin", "heat"], ["jblock", "does"]]}),
 ("say", "e804", H, "So the heat creeps in, very, very slowly.", {**SLOW, "pre": .3, "post": .6, "kw": [["jslow", "creeps"]]}),
 ("scene", "pullout"), ("wait", 1.2),
 # ---- 9 · POOR CONDUCTOR OF HEAT (Basil, right from the start); wool does not make heat; the same scarf slows heat both ways
 ("scene", "wool"),
 ("say", "e805b", B, "A poor conductor of heat is a material that heat does not flow through easily, such as wool, and the air trapped inside it.", {"pre": .3, "post": .1, "kw": [["kw_poor_conductor_of_heat", "poor"]]}),
 HOLD("kw_poor_conductor_of_heat"),
 ("say", "e806m", M, "So wool does not make any heat at all?", {"pre": .2, "post": .3}),
 ("say", "e807", H, "No, wool does not make heat. On a cold day, a scarf slows the heat flowing out of your neck. Today, it slows the heat flowing in.", {"pre": .35, "post": .2, "kw": [["neck", "cold"], ["today", "today"]]}),
 *VERDICT("v_wool"),
 ("say", "e808b", B, "Same scarf. It slows heat both ways.", {"pre": .1, "post": .5}),
 # ---- 10 · THE REAL SOLUTION, TESTED: a fair test (P3 EP24's skill): change only the wrapper; same cups, same sun, same five minutes;
 #           measure the melted part (measuring cups, in millilitres)
 ("scene", "test"),
 ("say", "e901m", M, "Okay, but I want proof!", {"pre": .3, "post": .2}),
 ("say", "e902b", B, "Then we do a fair test, like in Primary 3. The big box waits in the freezer.", {"pre": .3, "post": .3, "kw": [["freezer", "freezer"]]}),
 ("say", "e903m", M, "A fair test means we change only one thing, the wrapper, and keep everything else the same!", {"pre": .3, "post": .1, "kw": [["kw_fair_test", "fair"], ["wrapper", "wrapper"]]}),
 HOLD("kw_fair_test"),
 ("say", "e904p", P, "Three cups of the same ice cream, in the same sun, for the same five minutes.", {"pre": .3, "post": .2}),
 ("say", "e905b", B, "Cup one gets no wrapper, cup two gets a thin plastic bag, and cup three gets the wool scarf. Then we measure how much has melted.", {"pre": .3, "post": .3, "kw": [["cup1", "one"], ["cup2", "two"], ["cup3", "three"], ["measure", "measure"]]}),
 ("say", "e906", H, "Which cup will have the least melted? Think about it.", {"pre": .3, "post": .1, "kw": [["think", "think"]]}),
 ("wait", 1.8), ("mark", "lapse"), ("wait", 3.0), ("mark", "lapse1"),
 ("say", "e907", H, "Five minutes later, the buddies pour out the melted part of each cup.", {"pre": .2, "post": .3, "kw": [["pour", "pour"]]}),
 ("mark", "r1"), ("wait", .9), ("mark", "r2"), ("wait", .9), ("mark", "r3"), ("wait", .8),
 ("say", "e908p", P, "The wool cup melted the least! Only five millilitres!", {"pre": .1, "post": .2}),
 ("say", "e909", H, "The thick wool, full of trapped air, slowed the heat flowing in the most.", {"pre": .35, "post": .2}),
 *VERDICT("v_test"),
 ("say", "e910m", M, "Okay, okay. The scarf is a hero.", {"pre": .1, "post": .4}),
 # ---- 11 · THE RESCUE: the scarf + the covered walkway; the P3 callback at the drain (a magnet on a string: the steel bottle opener comes
 #           up, the aluminium ring pull stays)
 ("scene", "walk"),
 ("say", "e1001", H, "Now for the real rescue, under the covered walkway, out of the sun!", {"pre": .3, "post": .4, "kw": [["shade", "covered"]]}), ("wait", 1.6),
 ("scene", "drain"),
 ("mark", "clink"), ("wait", .5),
 ("say", "e1002m", M, "Oh no! Our bottle opener fell into the drain!", {"pre": .1, "post": .2}),
 ("say", "e1003p", P, "Don't worry, I've got a plan!", {"pre": .25, "post": .1}),
 ("say", "e1004b", B, "No more plans, Pip. I've got a magnet.", {"pre": .25, "post": .3}),
 ("mark", "lower"), ("wait", 1.0),
 ("say", "e1005b", B, "The bottle opener is made of steel, and magnets attract iron and steel.", {"pre": .1, "post": .2, "kw": [["snap", "steel"]]}),
 ("mark", "liftup"), ("wait", .6),
 ("say", "e1006p", P, "My aluminium ring pull is still down there!", {"pre": .1, "post": .2}),
 ("say", "e1007b", B, "Aluminium is not a magnetic material. Goodbye, ring pull.", {"pre": .3, "post": .5}),
 # ---- 12 · THE PARTY: the void deck, one minute to spare; still frozen; the fan callback; the score
 ("scene", "party"),
 ("say", "e1101", H, "With one minute to spare, they open the box!", {"pre": .3, "post": .2, "kw": [["open", "open"]]}),
 ("say", "e1102m", M, "It's still frozen hard! Snack emergency, solved!", {"pre": .3, "post": .3, "kw": [["solved", "solved"]]}),
 ("mark", "fanclick"), ("wait", .8),
 ("say", "e1103b", B, "Who switched on the heat delivery service?", {"pre": .1, "post": .2}),
 ("mark", "turnfan"),
 ("say", "e1104p", P, "Fan on us, not on the ice cream!", {"pre": .2, "post": .3}),
 ("say", "e1105", H, "Did you pick fix three, the wool scarf? Then you win a point, and so does Basil!", {"pre": .3, "post": .4, "kw": [["coin1", "point"]]}),
 # ---- 13 · THE WORDS THAT EARN MARKS (a card read by Pip: "Say it with me!" + 0.8 s)
 ("scene", "words"),
 ("say", "e1201", H, "Now, here are the words that earn marks.", {"pre": .3, "post": .1}),
 ("say", "e1202p", P, "Say it with me!", {"pre": .3}), ("wait", .8),
 ("say", "e1203p", P, EXAM, {"pre": 0, "gap": .35}), ("wait", 2.5),
 # ---- 14 · THE P3 YEAR, LEVEL UP, THE P4 TEASER (Heart mystery hint #1: her logo heart flickers once on "See you in Primary 4!")
 ("scene", "year"),
 ("say", "e1301", H, "What a year! In Primary 3, you sorted living things, tested materials, followed life cycles, and made magnets.", {"pre": .3, "post": .3, "kw": [["y1", "living"], ["y2", "materials"], ["y3", "life"], ["y4", "magnets"]]}),
 ("say", "e1302b", B, "And now, we level up.", {"pre": .3, "post": .2, "kw": [["lvl", "level"]]}),
 ("mark", "items"), ("wait", 1.6),
 ("scene", "p4"),
 ("say", "e1303", H, "In Primary 4, get ready for systems, matter, light, shadows and heat!", {"pre": .3, "post": .3, "kw": [["p1", "systems"], ["p2", "matter"], ["p3", "light"], ["p4", "shadows"], ["p5", "heat"]]}),
 ("say", "e1304", H, "See you in Primary 4!", {"pre": .2, "post": .6, "excited": True, "kw": [["glitch", "4"]]}),
 # ---- 15 · the key words, "Now you know!", the outro
 *kwrecap(["Hotter to colder", "Poor conductor of heat", "Fair test"]),
 *NYK,
 # ---- 16 · THE BLOOPER (after the end card, about 9 s)
 ("scene", "blooper"), ("wait", .6),
 ("say", "e1601p", P, "Wool is a poor conductor of meat!", {"pre": 0, "post": .2}),
 ("say", "e1602b", B, "Meat?", {"pre": .2, "post": .2}),
 ("say", "e1603m", M, "Did somebody say meat?", {"pre": .2, "post": .3}),
 ("mark", "take2"), ("wait", 1.6),
]
SEQS = {1: SEQ1, 2: []}

if __name__ == "__main__":
    ids = [it[1] for s in SEQS.values() for it in s if it[0] in ("say", "unison", "chant")]
    dup = {i for i in ids if ids.count(i) > 1}
    assert not dup, dup
    for part, s in SEQS.items():
        if not s: continue
        n = sum(len(it[3].split()) for it in s if it[0] == "say")
        lines = {w: sum(1 for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        words = {w: sum(len(it[3].split()) for it in s if it[0] == "say" and it[2] == w) for w in (H, P, B, M)}
        print(f"Part {part}: {n} words in say lines; lines per speaker {lines}; words {words}")
