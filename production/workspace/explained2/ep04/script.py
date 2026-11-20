"""script.py: P3 EP4 "Millions of living things, only 4 groups", Part 1 and Part 2: the script (p3_ep04_script.md) as data.
Every spoken line is exactly as in the script. make_voice.py records the lines; build_tl.py lays them on the timeline.

SEQ items:
  ("scene", name)                      a new scene starts at the cursor
  ("say", id, who, text, {opts})       a spoken line. opts: pre = silence before it (s), post = silence after it (s)
  ("wait", seconds)                    picture-only time
  ("mark", name)                       name the cursor time (used by sound and picture)
  ("chant", id)                        the buddies' chant, call and response: a line, a bar for the viewers ("YOUR TURN!"), ... then all together
  ("unison", id, text, {opts})         the three buddies say a short line together (opts: pre, post, quiet)
"""
H, P, B, M = "heart", "pip", "basil", "momo"
# the chant: line 1 is the four groups, one word on each quarter of the bar; line 2 is one phrase
CHANT = [["Plants!", "Animals!", "Fungi!", "Bacteria!"], "Four main groups of living things!"]
CHANT_CAPS = [.42, .47, .45, .62]
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {}
SLOW = {"speed": .9, "gap": .55}
slug = lambda w: w.lower().replace(" ", "_")

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
 ("wait", 5.5)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .6}), ("wait", .8), ("chant", "ch01"), ("wait", .6)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .94})]

RING = lambda n, d=5.0: [("mark", f"ring0_{n}"), ("wait", d), ("mark", f"bell_{n}"), ("wait", .55)]
SEQ1 = [
 # ---- 1 · silent cold open: the farm in Kranji, four crates with "?" (7 s)
 ("scene", "cold"), ("wait", 3.5), ("mark", "coldCard"), ("wait", 3.5),
 # ---- 2 · the callback to EP3's dare, the title
 ("scene", "callback"),
 ("say", "c201", H, "Last time, we left you a dare. Millions of kinds of living things. But scientists sort them into only four groups.", {"pre": .3}),
 ("say", "c202", B, "Easy! Big ones, small ones, green ones, and scary ones!", {"pre": .4, "post": .3}),
 ("scene", "title"),
 ("say", "c203", H, "Hmm. Is Basil right? Did you lock in your four? Let's open the crates and find out.", {"pre": .6, "post": .5}),
 # ---- 3 · the game
 ("scene", "game"),
 ("say", "c301", H, "It's You against the Buddies. You lock in first. One finger for every point. And a lizard is hiding. Find it!", {"pre": .5, "post": .4}),
 # ---- 4 · why scientists classify
 ("scene", "why"),
 ("say", "c401", H, "Look around this farm. A hen. A cat. A tomato plant. A fern. A mushroom. So many living things! How can scientists study them all?", {"pre": .5, "gap": .5}),
 ("say", "c402", P, "Put the ones that are alike together!", {"pre": .4}),
 ("say", "c403", H, "Yes, Pip! Scientists look for what is the same, and what is different.", {"pre": .4, "post": .5}),
 ("scene", "mark1"),
 ("say", "c404", M, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "c405", H, "The grouping of living things based on their similarities and differences is called classification.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_class"), ("wait", 1.9),
 # ---- 5 · today's goals (no voice) and the countdown
 ("scene", "goals"), ("wait", 4.3),
 *COUNT,
 # ---- 6 · Round 1: where does a mushroom go?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "c601", H, "Round one. Scientists classify living things into four main groups. Crate one: plants. Crate two: animals. So where does a mushroom go? One, with the plants. Two, with the animals. Three, in a group of its own. Show me with your fingers.", {"pre": .1}),
 *RING(1),
 ("say", "c602", H, "Locked in!", {"pre": 0}),
 ("say", "c603", M, "One. It grows from the ground, like a plant.", {"pre": .5}),
 ("say", "c604", B, "Two! It has no leaves. So it must be an animal!", {"pre": .4}),
 ("say", "c605", P, "Three. It has no leaves. And it cannot walk.", {"pre": .4, "post": .5}),
 ("scene", "open3"),
 ("say", "c606", H, "The answer is three. A mushroom is not a plant: it does not make its own food. And it is not an animal. Mushrooms belong to a group called fungi.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_fungi"), ("wait", 1.9),
 ("say", "c607", H, "Three fingers? One finger up!", {"pre": .3, "post": .6}),
 # ---- 7 · crate four, and the shrink (BE THE THING: as tiny as bacteria)
 ("scene", "crate4"),
 ("say", "c701", H, "Three crates are open. Plants. Animals. Fungi. Now, crate four.", {"pre": .5}),
 ("say", "c702", B, "It's empty! Just a scoop of soil.", {"pre": .5}),
 ("say", "c703", H, "Look closer, Basil. Much closer. Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.3),
 ("say", "c704", H, "You are getting smaller. As small as an ant.", {**SLOW, "pre": 0, "post": 1.3}),
 ("mark", "sand"),
 ("say", "c705", H, "Smaller. As small as a grain of sand.", {**SLOW, "pre": 0, "post": 1.3}),
 ("mark", "bact"),
 ("say", "c706", H, "Smaller still.", {**SLOW, "pre": 0}),
 ("wait", 1.6),
 ("say", "c707", H, "Now you can see them. Tiny living things, all around you.", {**SLOW, "pre": 0}),
 ("wait", 1.0), ("mark", "shapes"),
 ("say", "c708", H, "Some are shaped like rods. Some are round. Some are spirals.", {**SLOW, "pre": 0, "gap": .8}),
 ("wait", 1.4),
 ("say", "c709", H, "They are too small to see with your eyes alone. But they are living things.", {**SLOW, "pre": 0}),
 ("wait", 1.6),
 # ---- 8 · the reveal: bacteria; four main groups
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "c801", H, "Crate four is not empty. These tiny living things are bacteria.", {"pre": 0}),
 ("say", "c802", H, "Bacteria are tiny living things and they come in different shapes and sizes.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_bacteria"), ("wait", 1.9),
 ("scene", "mark2"),
 ("say", "c804", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "c805", H, "Living things can be classified into four main groups: plants, animals, fungi and bacteria.", {"pre": 0}),
 ("wait", 2.0),
 ("scene", "notsize"),
 ("say", "c806", B, "So not big, small, green and scary?", {"pre": .5}),
 ("say", "c807", H, "No, Basil. Size and colour do not decide the group.", {"pre": .4, "post": .5}),
 # ---- 9 · what makes a plant a plant
 ("scene", "plant"),
 ("say", "c902", H, "Plants are living things that usually have leaves, stems and roots. They are able to make their own food when there is light.", {"pre": .5, "post": .5}),
 ("scene", "animal"),
 ("say", "c903", H, "Animals are unable to make their own food. They depend on other living things for food.", {"pre": .5, "post": .6}),
 # ---- 10 · HOLD ON! Pip's rule
 ("scene", "listcard"), ("wait", 1.1),
 ("scene", "list"),
 ("say", "c1001", P, "My rule. If it is green, it is a plant. A tomato plant: green. A fern: green. A grasshopper: green!", {"pre": .6, "post": .5}),
 ("say", "c1002", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 *RING(2)[:-1], ("wait", .6),
 ("say", "c1003", H, "Arms crossed? One finger up! A grasshopper is green. But it is an animal. It is unable to make its own food. It eats leaves.", {"pre": 0, "post": .5}),
 ("say", "c1004", P, "So colour is not the clue! I will ask: can it make its own food?", {"pre": .4, "post": .6}),
 # ---- 11 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "c1201", H, "Show me your score hand! More than one? You beat the Buddies. Two fingers? High five!", {"pre": .5, "post": .7}),
 ("scene", "liz"),
 ("say", "c1202", H, "Did you spot the lizard? It was on the water pipe. Which crate does a lizard go in? Tell someone at home.", {"pre": .7, "post": .7}),
 *kwrecap(["Classification", "Fungi", "Bacteria"]),
 # ---- 12 · the Part 2 tease: the chilli plant
 ("scene", "cliff"), ("wait", .4),
 ("say", "c1301", H, "The plants crate is full. But scientists sort plants again, into two groups.", {"pre": .5}),
 ("say", "c1302", M, "Look! This chilli plant has no flowers today. Not one!", {"pre": .5}),
 ("say", "c1303", H, "No flowers today. So is it a flowering plant? Find out in Part Two!", {"pre": .5}),
 ("wait", 1.0),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · silent recap montage (five shots, 1 s each)
 ("scene", "recap"), ("wait", 5.0),
 # ---- 2 · "Last time..."
 ("scene", "lasttime"),
 ("say", "d201", H, "Last time, we opened four crates: plants, animals, fungi and bacteria. Now we are back in our community garden, with the plants crate.", {"pre": .5, "post": .5}),
 # ---- 3 · today's goals (no voice) and the game
 ("scene", "goals"), ("wait", 3.9),
 ("scene", "game"),
 ("say", "d301", H, "Lock in first. And find the new lizard!", {"pre": .5, "post": .5}),
 # ---- 4 · two groups of plants; Round 1: the chilli plant
 ("scene", "two"),
 ("say", "d401", H, "Plants can be classified into two groups: flowering plants and non-flowering plants.", {"pre": .5, "post": .6}),
 ("scene", "r1card"), ("wait", 1.0),
 ("scene", "r1"),
 ("say", "d402", M, "This chilli plant has no flowers today. So it is a non-flowering plant!", {"pre": .6}),
 ("say", "d403", H, "Round one. Is Momo right? No flowers today. Only green chillies, with seeds inside. One, it is a flowering plant. Two, it is a non-flowering plant. Show me with your fingers.", {"pre": .5}),
 *RING(1),
 ("say", "d404", H, "Locked in!", {"pre": 0}),
 ("say", "d405", B, "One! One is my lucky number.", {"pre": .5}),
 ("say", "d406", P, "One. A chilli is a fruit. And fruits come from flowers.", {"pre": .4, "post": .5}),
 ("scene", "grow"),
 ("say", "d407", H, "Watch this chilli plant. Speeded up.", {"pre": .6}),
 ("mark", "fl1"), ("wait", 1.4),
 ("say", "d408", H, "A small white flower. The petals drop. A tiny green chilli grows where the flower was.", {"pre": 0, "gap": .9}),
 ("wait", 1.2),
 ("say", "d409", H, "The answer is one. The flower developed into a fruit. And inside the fruit: seeds.", {"pre": 0, "post": .5}),
 ("scene", "lucky"),
 ("say", "d411", H, "A lucky number is not a reason, Basil. No point!", {"pre": .5}),
 ("say", "d412", H, "One finger? One finger up!", {"pre": .5, "post": .5}),
 # ---- 5 · flowering plants
 ("scene", "mark1"),
 ("say", "d501", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "d502", H, "Flowering plants bear flowers. They reproduce from seeds. The flowers in flowering plants develop into fruits. The seeds are found in the fruits.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_flowering"), ("wait", 1.9),
 # ---- 6 · the fern, and the shrink (BE THE THING: you are a spore)
 ("scene", "fern"),
 ("say", "d601", M, "And this one? No flowers. No fruits.", {"pre": .5}),
 ("say", "d602", H, "That is a bird's nest fern, Momo. It never has flowers. So how does it make new plants? Look under a leaf. Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.3),
 ("say", "d603", H, "You are tiny now. You are under a fern leaf.", {**SLOW, "pre": 0, "post": 1.2}),
 ("say", "d604", H, "Above you: brown spore bags, in neat rows.", {**SLOW, "pre": 0}),
 ("wait", 1.2), ("mark", "open"),
 ("say", "d605", H, "One bag opens.", {**SLOW, "pre": 0}),
 ("wait", 1.2),
 ("say", "d606", H, "Out come the spores. As fine as dust. And you are one of them.", {**SLOW, "pre": 0}),
 ("wait", .8), ("mark", "wind"),
 ("say", "d607", H, "The wind carries you away.", {**SLOW, "pre": 0}),
 ("wait", 2.0), ("mark", "land"),
 ("say", "d608", H, "You land on damp soil.", {**SLOW, "pre": 0}),
 ("wait", 1.4), ("mark", "sprout"),
 ("say", "d609", H, "In time, a new fern grows here.", {**SLOW, "pre": 0}),
 ("wait", 2.2),
 # ---- 7 · the reveal: non-flowering plants
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "d701", H, "No flowers. No seeds. A fern reproduces from spores, kept in spore bags.", {"pre": 0}),
 ("wait", .3), ("mark", "kw_sporebags"), ("wait", 1.9),
 ("scene", "mark2"),
 ("say", "d702", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "d703", H, "Non-flowering plants do not bear flowers. They reproduce from spores that may be found in spore bags.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_nonflowering"), ("wait", 1.9),
 ("scene", "fungus"),
 ("say", "d704", B, "Spores? Mushrooms have spores too! So a fern is a fungus?", {"pre": .5}),
 ("say", "d705", H, "Good thinking, Basil. But a fern makes its own food when there is light. So it is a plant.", {"pre": .5, "post": .5}),
 # ---- 8 · Showdown: Pip's plant notes
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "d801", P, "My plant notes!", {"pre": .5}),
 ("say", "d802", P, "One. Hibiscus: a flowering plant. Two. Bird's nest fern: a non-flowering plant. Three. Grass: a non-flowering plant.", {"pre": .5, "post": .3}),
 ("say", "d803", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 *RING(2, 6.0),
 ("say", "d804", H, "Locked in!", {"pre": 0}),
 ("say", "d805", B, "Three! I hide in long grass. It has tiny flowers on top.", {"pre": .5}),
 ("say", "d806", M, "Three! Me too.", {"pre": .4}),
 ("say", "d807", P, "Oops!", {"pre": .4, "post": .4}),
 ("scene", "fixed"),
 ("say", "d808", H, "Grass is a flowering plant. Its flowers are tiny. The grass-cutter usually cuts them off before we see them.", {"pre": .7}),
 ("say", "d809", P, "Fixed! Grass: a flowering plant.", {"pre": .5}),
 ("say", "d810", H, "Showed three fingers? Put up two more on your score hand!", {"pre": .5, "post": .5}),
 # ---- 9 · the chant: the four main groups
 ("scene", "chant"),
 ("say", "d901", H, "Plants are one of the four main groups. Remember all four?", {"pre": .5}),
 *CHANTSEQ,
 # ---- 10 · score hand and the lizard
 ("scene", "final"),
 ("say", "d1001", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "d1002", H, "Did you spot the lizard? It was on the tree trunk, under the fern. Does a new lizard come from a seed, a spore, or an egg? Tell someone at home.", {"pre": .5, "post": .5}),
 # ---- 11 · your turn, and the dare for Episode 5
 ("scene", "tryit"),
 ("say", "d1101", H, "Your turn. Find one flowering plant and one non-flowering plant near your home. Look. Do not pick.", {"pre": .5, "post": .5}),
 ("scene", "dare"), ("wait", .5),
 ("say", "d1102", H, "Next time: animals! A frog. A bird. A fish. Feathers, scales, or moist skin? Lock in your answer for next time.", {"pre": 0, "post": .6}),
 # ---- 12 · the key words
 *kwrecap(["Flowering plants", "Spore bags", "Non-flowering plants"]),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
