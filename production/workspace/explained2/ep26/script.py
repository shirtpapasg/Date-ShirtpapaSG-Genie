"""script.py: P3 EP26 (exam-skills special) "How to answer open-ended questions, the way accepted in PSLE": Part 1 ("Why Did Basil LOSE
Marks? Meet the CECL Genie") and Part 2 ("Your Turn! Fix the Answer, Part by Part"): the script (../p3_ep26_script.md, version 1 of 25 Nov
2026, Opus; the teacher's 25 Nov request through the coordinator; pre-approved to go live) as data. The CECL Genie as TheOneApp has it:
Choice, Evidence, Concept, Link (index.html, genie/index.html, api/_marking-prompt.js on origin/main). Original questions on topics the
series taught (magnets, fair tests, life cycles). No textbook rows: the Mark Sentences are our own words. Line ids: m... Part 1, n... Part 2.
THE RHYTHM OF EP1-EP10 (as EP24, EP25), with a 6 s "your turn" ring before each model-answer part. The ORIGINAL series music.
"""
import re, os
H, P, B, M = "heart", "pip", "basil", "momo"
CUTS = {"anttip"}   # the parts run long at the EP1-10 pace with time to try: the finder's tip goes first
cut = lambda tag, items: [] if tag in CUTS else items
NEXT_DARE = None
CHANT = [("Choice?", "Only if you pick!"), ("Evidence?", "From the question!"), ("Concept?", "The rule I know!"), ("And the Link?", "Thus, answer it!")]
CHANT_CAPS = ([1.0, 1.1, 1.0, 1.1], [1.4, 1.5, 1.4, 1.5])
CHANT_TOGETHER = False
PRON = {"CECL": "C, E, C, L"}   # say the four letters (the app's own way of saying it)
SLOW = {"speed": .85, "gap": 1.0, "soft": True}
LC = {"speed": .85, "gap": .8}
STRIP = 3.5
slug = lambda w: re.sub(r"[^a-z0-9]+", "_", w.lower()).strip("_")
HOLD = lambda mk: ("hold", mk, 2.0, .6)
VERDICT = lambda mk: [("mark", mk), ("wait", 2.5)]
TRY = lambda n: [("mark", f"try{n}"), ("wait", 6.0)]   # "your turn": a 6 s ring with soft ticks before each model-answer part
Q1 = "Mei Ling hangs two metal bars, X and Y, from strings. She brings the North pole of a magnet near each bar. Bar X moves away from the magnet. Bar Y moves towards the magnet. Which bar is a magnet? Explain your answer."
Q2 = "Ali wants to find out if more batteries make an electromagnet stronger. Set-up A has an iron nail, ten turns of wire and one battery. Set-up B has a steel nail, twenty turns of wire and two batteries. Explain why Ali's experiment is not a fair test."
Q3 = "Siti says that a cockroach has the same life cycle as a butterfly. Do you agree? Explain."
Q4 = "Explain why the door of a refrigerator stays closed."
MS1 = "A full answer has four parts: Choice, Evidence, Concept and Link."
MS2 = "Evidence is what the question shows you. Concept is the science rule you remember."
MS3 = "Give a Choice only when the question asks you to pick."
MS4 = "The Link joins the rule to what the question asks. It often starts with Thus."
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
 ("scene", "cold"), ("wait", .6),
 ("say", "m101", H, "Thursday after school. The quiz papers are back.", {"pre": .3, "post": .4, "kw": [["papers", "papers"]]}),
 ("say", "m102b", B, "One mark out of three? But my answer was right!", {"pre": .4, "post": .5, "kw": [["mark13", "one"]]}),
 ("scene", "title"), ("mark", "title"), ("wait", 1.8),
 ("scene", "today"),
 ("say", "m201m", M, "My answers used to lose marks too. Then I met the Genie in TheOneApp.", {"pre": .5, "post": .5, "kw": [["lamp", "genie"]]}),
 ("scene", "game"),
 ("say", "m202", H, "A little dragonfly is hiding in this video. Can you spot it?", {"pre": .4, "post": .5}),
 ("say", "m203p", P, "Dragonflies love windows and plants. Look outside!", {"pre": .3, "post": .3}),
 ("say", "m204", H, "You against the Buddies! Lock in first with your fingers. One finger for every point.", {"pre": .4, "post": .5}),
 ("scene", "goals"), ("say", "m301p", P, "Today you'll learn:", {"pre": .7, "post": .3}),
 ("say", "m302p", P, "The four parts of a full answer.", {"pre": .3, "post": .4}), ("say", "m303p", P, "Evidence from the question.", {"pre": .3, "post": .4}),
 ("say", "m304p", P, "The concept you remember.", {"pre": .3, "post": .7}),
 *COUNT,
 ("scene", "question"),
 ("say", "m401", H, "Here is the question. " + Q1, {"pre": .5, "post": 1.2, "kw": [["qx", "x"], ["qaway", "away"], ["qtowards", "towards"], ["qwhich", "which"]]}),
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "m402", H, "Round one. Which answer gets full marks? One, Basil's. Two, Pip's. Three, Momo's. Show me your fingers!", {"pre": .1}),
 *LOCK("r1", 5.0),
 ("say", "m403", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "m404b", B, "One! I wrote X. X is right!", {"pre": .5, "post": .4}),
 ("say", "m405p", P, "Two. Mine says like poles repel. That is the science!", {"pre": .4, "post": .4}),
 ("say", "m406m", M, "Three. Mine has all four parts.", {"pre": .4, "post": .3}),
 ("wait", .3),
 ("scene", "waitw"),
 ("say", "m501", H, "Be an answer! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jline"),
 ("say", "m502", H, "You are an empty answer line in a quiz paper. A red piece floats down and clicks into place. Bar X is a magnet.", {**SLOW, "pre": 0, "post": .9, "kw": [["jred", "red"]]}),
 ("say", "m503", H, "Then a blue piece: what the question shows you. A yellow piece: the science rule. And last, a green piece that joins them all to the question.", {**SLOW, "pre": .2, "post": .9, "kw": [["jblue", "blue"], ["jyellow", "yellow"], ["jgreen", "green"]]}),
 ("say", "m504", H, "The marker's pen comes down. Tick. Tick. Tick. Full marks!", {**SLOW, "pre": .2, "kw": [["jpen", "pen"], ["jtick", "tick"], ["jfull", "full"]]}),
 ("wait", 1.2),
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "answer"),
 ("say", "m601", H, "The answer is three: Momo's answer! Did you show three fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "three", 0], ["coin1", "one"]]}),
 ("say", "m602", H, "Meet the CECL Genie. It shows us the four parts of a full answer.", {"pron": PRON, "pre": .4, "post": .6, "kw": [["genie", "genie"], ["tiles", "four"]]}),
 ("scene", "lc1q"),
 ("say", "m701b", B, "So what did my answer miss?", {"pre": .5, "post": .3}),
 ("scene", "lcbasil"),
 ("say", "m702", H, "Look closer. Basil gave a Choice: bar X. That is the red part.", {**LC, "pre": 1.2, "post": .4, "kw": [["cred", "choice"]]}),
 ("say", "m703", H, "But it moved is not enough. Which way did bar X move? Away from the magnet. That is the Evidence, and it comes from the question.", {**LC, "pre": .3, "post": .4, "kw": [["eway", "which"], ["eblue", "evidence"]]}),
 ("say", "m704b", B, "An open-ended question is a question you answer in your own sentences, such as: which bar is a magnet? Explain your answer.", {"pre": .3, "kw": [["kw_open_ended_question", "open", 0]]}),
 HOLD("kw_open_ended_question"),
 ("say", "m705", H, "Your turn. What science rule explains why bar X moved away? Think.", {**LC, "pre": .4, "post": .2}),
 *TRY(1),
 ("say", "m706m", M, "Evidence is what the question shows you, such as: bar X moved away from the magnet!", {"pre": .3, "kw": [["kw_evidence", "evidence", 0]]}),
 HOLD("kw_evidence"),
 *VERDICT("v_basil"),
 ("scene", "mark1"),
 ("say", "m707", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m708", M, MS1, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 ("scene", "holdon"),
 ("say", "m801p", P, "I know my Concept! Bar X moves away from the magnet.", {"pre": .5, "post": .3}),
 ("say", "m802", H, "Something is not right. If you can spot it, cross your arms. Hold on!", {"pre": .4}),
 *LOCK("hold")[:-1], ("wait", .5),
 ("say", "m803", H, "Arms crossed? One finger up!", {"pre": 0, "post": .3}),
 ("say", "m804b", B, "Pip, that is the question's own words! That is Evidence. The Concept is the rule you remember: like poles repel.", {"pre": .4, "post": .3, "kw": [["own", "own"], ["rule", "rule"]]}),
 ("scene", "lc2q"),
 ("say", "m901p", P, "So how does Momo's answer fit together?", {"pre": .5, "post": .3}),
 ("scene", "lcbuild"),
 ("say", "m902", H, "Look closer. Choice, in red: Bar X is a magnet.", {**LC, "pre": 1.2, "post": .5, "kw": [["b1", "choice"]]}),
 ("say", "m903", H, "Evidence, in blue: When the North pole of the magnet was brought near bar X, bar X moved away.", {**LC, "pre": .3, "post": .5, "kw": [["b2", "evidence"]]}),
 ("say", "m904", H, "Concept, in yellow: Like poles repel. Only a magnet can be repelled by another magnet.", {**LC, "pre": .3, "post": .5, "kw": [["b3", "concept"]]}),
 ("say", "m905", H, "Link, in green: Thus, bar X was repelled, so bar X is a magnet.", {**LC, "pre": .3, "post": .5, "kw": [["b4", "link"]]}),
 ("say", "m906p", P, "A concept is the science rule you remember, that is true every time, such as: like poles repel!", {"pre": .3, "kw": [["kw_concept", "concept", 0]]}),
 HOLD("kw_concept"),
 ("say", "m907m", M, "Bar Y moved towards it, but a magnet attracts magnetic materials too, so that does not show Y is a magnet.", {"pre": .4, "post": .3, "kw": [["ybonus", "y"]]}),
 *VERDICT("v_full"),
 ("scene", "mark2"),
 ("say", "m908", B, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "m909", B, MS2, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 ("scene", "final"),
 ("say", "m1001", H, "Show me your score hand! Two fingers? You beat the Buddies. High five!", {"pre": .4, "post": .6}),
 ("scene", "liz"),
 ("say", "m1002", H, "Did you spot the dragonfly? It was on a twig of the tree outside!", {"pre": .6, "post": .4}),
 ("say", "m1003b", B, "Here is a fun fact! A dragonfly's huge eyes can see almost all the way round its head. It gathers evidence from every side!", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_eyes", "eyes"], ["ff_side", "evidence"]]}),
 ("say", "m1004", H, "Tell someone at home!", {"pre": .3, "post": .6}),
 *kwrecap(["Open-ended question", "Evidence", "Concept"]),
 ("scene", "cliff"), ("wait", .3),
 ("say", "m1101b", B, "Now I want to try a new question, all by myself!", {"pre": .3, "post": .3}),
 ("say", "m1102", H, "Can you build a full answer too? Find out in Part Two!", {"pre": .4}),
 ("mark", "cliffend"), ("wait", .8),
 *NYK,
]

SEQ2 = [
 ("scene", "lasttime"), ("mark", "pic1"),
 ("say", "n101", H, "Last time, the CECL Genie showed us the four parts of a full answer: Choice, Evidence, Concept and Link.", {"pron": PRON, "pre": .4, "post": .3, "kw": [["pic2", "choice"], ["pic3", "link"]]}),
 ("wait", 2.0),
 ("scene", "home"), ("wait", .4),
 ("say", "n201b", B, "Homework time! The Genie is ready.", {"pre": .3, "post": .5}),
 ("scene", "game"),
 ("say", "n202", H, "A little ant is hiding in this video. Can you spot it?", {"pre": .4, "post": .4}),
 *cut("anttip", [("say", "n203m", M, "Ants love sweet things. Check the counter!", {"pre": .3, "post": .3})]),
 ("say", "n204", H, "Lock in first with your fingers. One finger for every point.", {"pre": .3, "post": .5}),
 ("scene", "goals"), ("say", "n301b", B, "Today you'll learn:", {"pre": .7, "post": .3}), ("say", "n302b", B, "Choice: only when you must pick.", {"pre": .3, "post": .4}),
 ("say", "n303b", B, "The Link: answer what was asked.", {"pre": .3, "post": .4}), ("say", "n304b", B, "Try it yourself.", {"pre": .3, "post": .7}),
 ("scene", "question"),
 ("say", "n401", H, "Question one. " + Q2, {"pre": .5, "post": 1.2}),
 ("scene", "r1card"), ("wait", 1.2),
 ("scene", "r1"),
 ("say", "n402", H, "Round one. Does this answer need a Choice? One, yes. Two, no. Show me your fingers.", {"pre": .1}),
 *LOCK("r1", 5.0),
 ("say", "n403", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n404p", P, "One. Every answer starts with a Choice!", {"pre": .5, "post": .4}),
 ("say", "n405b", B, "Two! The question says explain. There is nothing to pick.", {"pre": .4, "post": .4}),
 ("say", "n406m", M, "Two. A Choice is only for questions like which, or do you agree.", {"pre": .4, "post": .3}),
 ("wait", .3),
 ("scene", "r1ans"),
 ("say", "n501", H, "The answer is two! Did you show two fingers? Put one finger up!", {"pre": .4, "post": .4, "kw": [["ansglow", "two", 0], ["coin1", "one"]]}),
 ("say", "n502b", B, "A choice is the answer you pick when the question asks you to pick, such as: yes, I agree, or bar X!", {"pre": .3, "kw": [["kw_choice", "choice", 0]]}),
 HOLD("kw_choice"),
 ("scene", "lc1q"),
 ("say", "n601p", P, "So where do we start?", {"pre": .5, "post": .3}),
 ("scene", "lcfair"),
 ("say", "n602", H, "Look closer. Start with the Evidence. What did Ali change? Your turn.", {**LC, "pre": 1.2, "post": .2}),
 *TRY(1),
 ("say", "n603", H, "Ali changed the type of nail, the number of turns of wire, and the number of batteries.", {**LC, "pre": .2, "post": .5, "kw": [["e1", "changed"]]}),
 ("say", "n604", H, "Now the Concept, the rule for a fair test.", {**LC, "pre": .3, "post": .2}),
 ("say", "n605", H, "In a fair test, only one variable is changed. The other variables are kept the same.", {**LC, "pre": .2, "post": .5, "kw": [["c1", "fair"]]}),
 ("say", "n606", H, "And the Link. Your turn.", {**LC, "pre": .3, "post": .2}),
 *TRY(3),
 ("say", "n607", H, "Thus, Ali cannot be sure that the number of batteries made the electromagnet stronger.", {**LC, "pre": .2, "post": .5, "kw": [["l1", "thus"]]}),
 *VERDICT("v_fair"),
 ("scene", "mark1"),
 ("say", "n608", P, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n609", P, MS3, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 ("scene", "showcard"), ("wait", 1.0),
 ("scene", "show"),
 ("say", "n701", H, "Question two. " + Q3, {"pre": .3, "post": .8}),
 ("say", "n702", H, "Showdown! Double points. Basil's answer is missing one part. Is it one, the Choice, two, the Evidence, three, the Concept, or four, the Link?", {"pre": .3, "kw": [["l1s", "one"], ["l2s", "two"], ["l3s", "three"], ["l4s", "four"]]}),
 *LOCK("show", 6.0),
 ("say", "n703", H, "Locked in!", {"pre": 0, "post": .2}),
 ("say", "n704m", M, "Four! Basil never says what the question asked: is it the same life cycle?", {"pre": .5}),
 ("scene", "fix"), ("wait", .2), ("mark", "rewrite"), ("wait", 1.0),
 ("say", "n705", H, "Thus, the cockroach and the butterfly do not have the same life cycle.", {"pre": .2, "post": .4}),
 ("say", "n706", H, "Four fingers? Put up two more on your score hand!", {"pre": .3, "post": .5, "kw": [["coin2", "two"]]}),
 ("scene", "waitw"),
 ("say", "n801", H, "Be the Link! Shrink down. Quietly.", {"pre": .5, "post": .5}),
 ("scene", "shrink"), ("mark", "dive"), ("wait", 2.0),
 ("mark", "jgreen"),
 ("say", "n802", H, "You are a short green sentence. On one side, the science rule. On the other side, the question.", {**SLOW, "pre": 0, "post": .9, "kw": [["jrule", "one"], ["jq", "other"]]}),
 ("say", "n803", H, "You stretch out, and join them together. Thus, the cockroach and the butterfly do not have the same life cycle.", {**SLOW, "pre": .2, "post": .9, "kw": [["jstretch", "stretch"], ["jthus", "thus"]]}),
 ("say", "n804", H, "Click! The answer is whole.", {**SLOW, "pre": .2, "kw": [["jclick", "click"]]}),
 ("wait", 1.2),
 ("scene", "pullout"), ("mark", "pullout"), ("wait", .6),
 ("scene", "lc2q"),
 ("say", "n901p", P, "Here is my answer to the fridge question. Magnets attract steel.", {"pre": .5, "post": .3, "kw": [["q4", "fridge"]]}),
 ("scene", "lcfridge"),
 ("say", "n902", H, "Look closer. " + Q4 + " Pip wrote a true Concept. But it is only one part. Your turn: what does the question show? And what does it ask?", {**LC, "pre": 1.2, "post": .2, "kw": [["onlyone", "only"]]}),
 *TRY(4),
 ("say", "n903", H, "Evidence: there is a strip of magnet inside the edge of the door, and the body of the refrigerator is made of steel.", {**LC, "pre": .2, "post": .5, "kw": [["fe", "evidence"]]}),
 ("say", "n904", H, "Link: Thus, the magnetic strip is attracted to the steel body, and this keeps the door closed.", {**LC, "pre": .3, "post": .5, "kw": [["fl", "link"]]}),
 ("say", "n905m", M, "A link is the sentence that joins the science rule to what the question asks, such as: thus, this keeps the door closed!", {"pre": .3, "kw": [["kw_link", "link", 0]]}),
 HOLD("kw_link"),
 ("say", "n906", H, "If you help with one thing, help with the Link.", {**LC, "pre": .4, "post": .4, "kw": [["help", "help"]]}),
 *VERDICT("v_link"),
 ("scene", "mark2"),
 ("say", "n907", M, "Say it with me!", {"pre": .6}), ("wait", .8),
 ("say", "n908", M, MS4, {"pre": 0, "gap": .6}),
 ("wait", 2.5),
 ("scene", "chant"),
 *CHANTSEQ,
 ("scene", "final"),
 ("say", "n1101", H, "Show me your score hand! Two fingers or more? You beat the Buddies. Three fingers? High five!", {"pre": .5, "post": .5}),
 ("scene", "liz"),
 ("say", "n1102", H, "Did you spot the ant? It was on the window ledge!", {"pre": .4, "post": .4}),
 ("say", "n1103p", P, "Here is a fun fact! An ant leaves a smell trail from the food to its nest, and the other ants follow it. It is a link!", {"pre": .3, "post": .3, "kw": [["ff_in", "fun"], ["ff_trail", "trail"], ["ff_link", "link"]]}),
 ("say", "n1104", H, "Tell someone at home!", {"pre": .3, "post": .5}),
 ("scene", "genie"),
 ("say", "n1201", H, "You can learn the CECL way with the Genie in TheOneApp. Open TheOneApp, tap Questions, then the CECL Genie. The Genie is for members.", {"pron": PRON, "pre": .5, "post": .4, "kw": [["tapq", "tap"], ["tapg", "then"], ["members", "members"]]}),
 ("say", "n1202b", B, "CECL means Choice, Evidence, Concept and Link, such as Momo's full answer about bar X!", {"pron": PRON, "pre": .3, "kw": [["kw_cecl", "cecl", 0]]}),
 HOLD("kw_cecl"),
 *kwrecap(["Choice", "Link", "CECL"], pron=PRON),
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
