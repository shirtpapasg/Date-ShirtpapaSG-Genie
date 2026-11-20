"""script.py: P3 EP3 "What living things can do", Part 1 and Part 2: the approved script (p3_ep03_script.md) as data.
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
# the chant: line 1 is three words on clap, clap, stomp; line 2 is one phrase
CHANT = [["Grow!", "Respond!", "Reproduce!"], "That's what living things can DO!"]
CHANT_CAPS = [.40, .42, .78]
# how the TTS should say a word (the caption/script text is unchanged)
PRON = {}
SLOW = {"speed": .9, "gap": .55}
slug = lambda w: w.lower().replace(" ", "_")

def kwrecap(words):
    out = [("scene", "kwrecap"), ("say", "h860", H, "Let's read today's key words together! Ready?", {"pre": .7, "post": .5})]
    for w in words:
        k = slug(w)
        out += [("say", "hk_" + k, H, w + ".", {"pre": 0}), ("unison", "uk_" + k, w + ".", {"pre": .25, "post": .55, "quiet": True})]
    return out + [("say", "h864", H, "Well done!", {"pre": .2, "post": .7})]
# the ending, exactly as EP1 round 3 (notes 14-16): "Say it with us!", 0.8 s, "Ready?", "One!", "two!", "Now you know!" 1.0 s apart, the blast, the outro
NYK = [("scene", "nyk"),
 ("unison", "u1300", "Say it with us!", {"pre": .7}), ("wait", .8),
 ("say", "h1304a", H, "Ready?", {"pre": 0}),
 ("say", "h1304o", H, "One!", {"pre": .45}),
 ("say", "h1304t", H, "two!", {"after": ["h1304o", 1.0]}),
 ("say", "h1305", H, "Now you know!", {"after": ["h1304t", 1.0], "shout": True}),
 ("unison", "u1305", "Now you know!", {"sync": True, "crowd": "h1305"}),
 ("wait", 5.8)]
CHANTSEQ = [("unison", "u1002", "Say it with us!", {"pre": .6}), ("wait", .8), ("chant", "c1003"), ("wait", .6)]
COUNT = [("scene", "count"), ("say", "h501", H, "Are you ready? Three! Two! One! Go!", {"pre": .3, "post": .5, "gap": .57, "speed": .94})]

SEQ1 = [
 # ---- 1 · silent cold open: the garden under the block (8 s)
 ("scene", "cold"), ("wait", 4.0), ("mark", "coldCard"), ("wait", 4.0),
 # ---- 2 · the callback and the dare
 ("scene", "callback"),
 ("say", "a201", H, "Last time, Basil touched this plant. And it folded up!", {"pre": .3}),
 ("say", "a202", B, "I think it's shy. It's hiding from me!", {"pre": .4, "post": .3}),
 ("scene", "title"),
 ("say", "a203", H, "Is it shy? Did you lock in your answer? Hold on to it.", {"pre": .6, "post": .5}),
 # ---- 3 · the field trip and the game
 ("scene", "trip"),
 ("say", "a301", H, "Today is a field trip. The hunt: what can living things do? Three stamps to collect. One here, in Toa Payoh. Two on a farm, in Kranji.", {"pre": .5, "post": .4}),
 ("scene", "game"),
 ("say", "a302", H, "It's You against the Buddies. You lock in first. One finger for every point. And a lizard is hiding. Find it!", {"pre": .5, "post": .4}),
 # ---- 4 · Round Zero: the rematch from Episode 2
 ("scene", "r0card"), ("wait", 1.1),
 ("scene", "r0"),
 ("say", "a401", H, "Round Zero. A rematch from last time! A plant does not eat. So how does it get its food? One, we feed it. Two, it makes its own. Three, it needs no food. Show me with your fingers.", {"pre": .1}),
 ("mark", "ring0_0"), ("wait", 5.0), ("mark", "bell_0"), ("wait", .55),
 ("say", "a402", H, "Locked in!", {"pre": 0}),
 ("unison", "u403", "Two!", {"pre": .5, "post": .1}),
 ("say", "a404", H, "Plants do not eat but they can make their own food when there is light.", {"pre": .45}),
 ("say", "a405", H, "Two fingers? One finger up!", {"pre": .5, "post": .6}),
 # ---- 5 · today's goals (no voice) and the countdown
 ("scene", "goals"), ("wait", 4.7),
 *COUNT,
 # ---- 6 · Round 1: what happens next?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "a601", H, "Round one. Basil touched one leaf, with one finger. Gently. It folded up. What happens next? One, it stays folded. Two, it opens again. Three, the leaf drops off. Show me with your fingers.", {"pre": .1}),
 ("mark", "ring0_1"), ("wait", 5.0), ("mark", "bell_1"), ("wait", .55),
 ("say", "a602", H, "Locked in!", {"pre": 0}),
 ("say", "a603", B, "One! It's shy. It will hide all day!", {"pre": .5}),
 ("say", "a604", M, "Two. Nothing is torn.", {"pre": .4}),
 ("say", "a605", P, "Two. All its other leaves are open.", {"pre": .4, "post": .5}),
 # ---- 7 · we wait, and shrink down onto the leaf
 ("scene", "waitw"),
 ("say", "a701", H, "Let's wait and watch. From very close. Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.5),
 ("say", "a702", H, "You are tiny now. You are standing on one of its leaves.", {**SLOW, "pre": 0, "post": 1.2}),
 ("mark", "touch"),
 ("say", "a703", H, "One gentle touch.", {**SLOW, "pre": 0}),
 ("mark", "fold"), ("wait", 1.6),
 ("say", "a704", H, "The little leaves fold inwards. Two by two.", {**SLOW, "pre": 0}),
 ("wait", 1.6), ("mark", "droop"),
 ("say", "a705", H, "Then the whole leaf droops.", {**SLOW, "pre": 0}),
 ("wait", 1.6), ("mark", "waiting"),
 ("say", "a706", H, "Now, we wait.", {**SLOW, "pre": 0}),
 ("wait", 3.0), ("mark", "reopen"),
 ("say", "a707", H, "A few minutes later, the leaves open again.", {**SLOW, "pre": 0}),
 ("wait", 1.6),
 # ---- 8 · the reveal: not shy. Responding!
 ("scene", "reveal"), ("mark", "pullout"), ("wait", 1.0),
 ("say", "a801", H, "The answer is two. The leaves opened again.", {"pre": 0}),
 ("say", "a802", H, "The mimosa plant is commonly called touch-me-not.", {"pre": .5}),
 ("wait", .3), ("mark", "kw_mimosa"), ("wait", 2.1),
 ("scene", "replay"),
 ("say", "a803", H, "The touch was a change. The mimosa folded its leaves. It responded.", {"pre": .4, "post": .5}),
 ("scene", "mark1"),
 ("say", "a804", B, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a805", H, "Living things respond to changes in the environment.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_respond"), ("wait", 2.1),
 ("scene", "notshy"),
 ("say", "a806", H, "The mimosa plant folds its leaves to protect itself from harm.", {"pre": .4}),
 ("say", "a807", B, "Not shy. Responding!", {"pre": .4}),
 ("mark", "stamp1"), ("wait", 1.3),
 ("say", "a808", H, "Two fingers? One finger up!", {"pre": .2, "post": .6}),
 # ---- 9 · you respond too
 ("scene", "eyes"),
 ("say", "a901", H, "You respond too. In bright sunlight, your eyelids shut at once. That protects your eyes.", {"pre": .5, "post": .5}),
 ("scene", "mark2"),
 ("say", "a902", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "a903", H, "The ability to respond to changes in our environment helps to protect us from danger and keeps us safe.", {"pre": 0}),
 ("wait", 2.0),
 ("scene", "ledge"),
 ("say", "a904", H, "Plants are also able to respond to changes in the environment.", {"pre": .6}),
 ("say", "a905", H, "Our plant on the window ledge grows towards the sunlight.", {"pre": .5, "post": .7}),
 # ---- 10 · HOLD ON! Pip's list
 ("scene", "listcard"), ("wait", 1.1),
 ("scene", "list"),
 ("say", "a1001", P, "My list. Three things that responded today. A snail pulled into its shell. An ice cream melted. A door banged shut.", {"pre": .6, "post": .5}),
 ("say", "a1002", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .3}),
 ("mark", "ring0_2"), ("wait", 5.0), ("mark", "bell_2"), ("wait", .6),
 ("say", "a1003", H, "Arms crossed? One finger up! The sun melted the ice cream. The wind pushed the door. They are non-living things. They changed. But they did not respond.", {"pre": 0, "post": .5}),
 ("scene", "snail"),
 ("say", "a1004", H, "The snail is a living thing. Momo touched it, and it pulled into its shell to protect itself. That is responding.", {"pre": .5}),
 ("say", "a1005", P, "So not everything that changes is responding!", {"pre": .4, "post": .6}),
 # ---- 11 · your turn: one finger, one leaf
 ("scene", "tryit"),
 ("say", "a1101", H, "Your turn. Find a mimosa on a grass patch. One finger, one leaf. The stem has tiny prickles. Never pull the plant. And wash your hands.", {"pre": .5, "post": .6}),
 # ---- 12 · score hand, the lizard, the key words
 ("scene", "final"),
 ("say", "a1201", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .7}),
 ("scene", "liz"),
 ("say", "a1202", H, "Did you spot the lizard? It was on the garden sign. A lizard runs away when you come close. Is that responding? Tell someone at home.", {"pre": .7, "post": .7}),
 *kwrecap(["Mimosa", "Respond to changes"]),
 # ---- 13 · the cliffhanger: five eggs in Kranji
 ("scene", "cliff"), ("wait", .6),
 ("say", "a1301", H, "Next stop: a farm in Kranji. This hen has kept five eggs warm for twenty-one days. Will every egg hatch? Find out in Part Two!", {"pre": .5}),
 ("mark", "eggtap"), ("wait", 1.3),
 # ---- 14 · "Now you know!" and the outro
 *NYK,
]

SEQ2 = [
 # ---- 1 · silent recap montage (five shots, about 1.2 s each)
 ("scene", "recap"), ("wait", 6.2),
 # ---- 2 · "Last time..."
 ("scene", "lasttime"),
 ("say", "b201", H, "Last time, Basil touched a mimosa, and its leaves folded up. It was not shy. It was responding to a change. Now we are on a farm in Kranji.", {"pre": .5, "post": .5}),
 # ---- 3 · today's goals (no voice) and the game
 ("scene", "goals"), ("wait", 4.7),
 ("scene", "game"),
 ("say", "b301", H, "It's You against the Buddies again. You lock in first. One finger for every point. And a new lizard is hiding. Find it!", {"pre": .5, "post": .5}),
 # ---- 4 · Round 1: will every egg hatch?
 ("scene", "r1card"), ("wait", 1.1),
 ("scene", "r1"),
 ("say", "b401", M, "Five eggs. So five chicks. Every egg hatches!", {"pre": .6}),
 ("say", "b402", H, "Round one. Is Momo right? Does every egg hatch? One, yes. Two, no. Show me with your fingers.", {"pre": .5}),
 ("mark", "ring0_1"), ("wait", 5.0), ("mark", "bell_1"), ("wait", .55),
 ("say", "b403", H, "Locked in!", {"pre": 0}),
 ("say", "b404", P, "One. The hen kept all five warm.", {"pre": .5}),
 ("say", "b405", B, "Two! Lizards lay eggs too. Grandma says not every egg hatches.", {"pre": .4, "post": .5}),
 ("scene", "hatch"),
 ("say", "b406", H, "Watch.", {"pre": .6}),
 ("mark", "crack1"), ("wait", 1.5),
 ("say", "b407", H, "A crack. A beak. One chick! Two. Three. Four!", {"pre": 0, "gap": .62}),
 ("mark", "still"), ("wait", 1.5),
 ("say", "b408", H, "One egg did not hatch. The answer is two. Not every egg hatches.", {"pre": 0, "post": .5}),
 ("scene", "after"),
 ("say", "b409", M, "Oh. Only four.", {"pre": .5}),
 ("say", "b410", H, "That happens, Momo. It is why some animals lay many eggs. A female mosquito lays one hundred to two hundred eggs at once!", {"pre": .45}),
 ("say", "b411", H, "Two fingers? One finger up!", {"pre": .5, "post": .6}),
 # ---- 5 · reproduce: more of them
 ("scene", "boards"),
 ("say", "b501", H, "Yesterday, one hen. Today, one hen and four chicks.", {"pre": .5, "post": .5}),
 ("scene", "mark1"),
 ("say", "b502", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b503", H, "When living things reproduce, there will be more of them.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_reproduce"), ("wait", 2.1),
 ("scene", "animals"),
 ("say", "b504", H, "Some animals reproduce by giving birth to their young alive.", {"pre": .5}),
 ("say", "b505", M, "Kittens! I was born like that too.", {"pre": .4}),
 ("say", "b506", H, "Other animals lay eggs and their young hatch out of the eggs.", {"pre": .6, "post": .6}),
 ("scene", "plants"),
 ("say", "b507", B, "But plants cannot lay eggs!", {"pre": .5}),
 ("say", "b508", H, "Some plants reproduce by producing seeds.", {"pre": .5}),
 ("say", "b509", H, "Like this tomato.", {"pre": .45, "post": .5}),
 ("say", "b510", H, "Other plants can reproduce through spores.", {"pre": .6}),
 ("say", "b511", H, "Like this fern. Look under the leaf.", {"pre": .45}),
 ("wait", .5), ("mark", "kw_spores"), ("wait", 2.1),
 # ---- 6 · why reproducing matters
 ("scene", "extinct"),
 ("say", "b601", H, "Why does reproducing matter? Without new young, a kind of living thing would disappear forever. Scientists call that extinct.", {"pre": .5}),
 ("wait", .2), ("mark", "kw_extinct"), ("wait", 2.1), ("mark", "defstrip"), ("wait", 3.2),
 ("scene", "mark2"),
 ("say", "b602", B, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b603", H, "The ability to reproduce is important to ensure the survival of all living things.", {"pre": 0}),
 ("wait", 2.0),
 ("scene", "stamp2"), ("wait", 2.0),
 # ---- 7 · grow: bigger AND more complex
 ("scene", "grow"),
 ("say", "b701", H, "And the four chicks? Now they will grow.", {"pre": .4}),
 ("say", "b702", M, "So a chick just gets bigger? A giant chick?", {"pre": .4}),
 ("say", "b703", H, "Not a giant chick. Look at the hen. Bigger, yes. But she also has wing feathers, a red comb and a tail.", {"pre": .5, "post": .6}),
 ("scene", "mark3"),
 ("say", "b704", M, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b705", H, "When living things grow, they increase in size. They also become more complex.", {"pre": 0}),
 ("wait", 2.0), ("mark", "kw_complex"), ("wait", 2.1),
 ("scene", "growline"),
 ("say", "b706", H, "You grow like that too. Bigger. And more complex: more hair, longer arms and legs, new teeth.", {"pre": .5, "post": .6}),
 ("scene", "pots"),
 ("say", "b707", H, "Like animals, plants also increase in size and become more complex as they grow.", {"pre": .5}),
 ("say", "b708", H, "A seed. A small plant. A bigger plant, with more leaves and flowers.", {"pre": .5}),
 ("wait", .4), ("mark", "stamp3"), ("wait", 1.9),
 # ---- 8 · Showdown: Basil's trail notes
 ("scene", "showcard"), ("wait", 1.2),
 ("scene", "show"),
 ("say", "b801", B, "My trail notes!", {"pre": .5}),
 ("say", "b802", B, "One. A hen reproduces by laying eggs. Two. A tomato plant, by producing seeds. Three. A fern, by producing seeds.", {"pre": .5, "post": .3}),
 ("say", "b803", H, "Showdown! Double points. One line has a mistake. Line one, two, or three? Show me with your fingers.", {"pre": .5}),
 ("mark", "ring0_2"), ("wait", 6.0), ("mark", "bell_2"), ("wait", .55),
 ("say", "b804", H, "Locked in!", {"pre": 0}),
 ("say", "b805", P, "Three. Those brown dots are spores.", {"pre": .5}),
 ("say", "b806", M, "Three! Spores, not seeds.", {"pre": .4}),
 ("say", "b807", B, "Oops!", {"pre": .4, "post": .4}),
 ("scene", "fixed"),
 ("say", "b808", B, "Fixed! A fern reproduces through spores.", {"pre": 1.5}),
 ("say", "b809", H, "Showed three fingers? Put up two more on your score hand!", {"pre": .5, "post": .7}),
 # ---- 9 · three stamps, and the chant
 ("scene", "stamps"),
 ("say", "b901", H, "Three stamps! Grow: the chicks. Respond: the mimosa. Reproduce: the hen.", {"pre": .5, "post": .5}),
 ("scene", "mark4"),
 ("say", "b902", P, "Say it with me!", {"pre": .8}), ("wait", .8),
 ("say", "b903", H, "Living things grow, respond to changes and reproduce.", {"pre": 0}),
 ("wait", 2.0),
 ("scene", "chant"),
 *CHANTSEQ,
 # ---- 10 · score hand and the lizard
 ("scene", "final"),
 ("say", "b1001", H, "Show me your score hand! More than two? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .7}),
 ("scene", "liz"),
 ("say", "b1002", H, "Did you spot the lizard? It was on the hen house wall. Does a lizard lay eggs, or give birth to its young alive? Tell someone at home.", {"pre": .7, "post": .7}),
 # ---- 11 · the dare for Episode 4
 ("scene", "dare"), ("wait", 1.7),
 ("say", "b1101", H, "A hen. A cat. A tomato plant. A fern. There are millions of kinds of living things! But scientists sort them into only four groups. Can you guess the four? Lock in your answer for next time.", {"pre": 0, "post": .9}),
 # ---- 12 · the key words
 *kwrecap(["Reproduce", "Spores", "Extinct", "More complex"]),
 # ---- 13 · "Now you know!" and the outro
 *NYK,
]
SEQS = {1: SEQ1, 2: SEQ2}
