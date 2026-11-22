"""todo_trial.py: the TRIAL staging of EP14 (teacher, 22 Nov: "pet buddies not having the colour circular background... blend in... bigger...
focus more on their dialogue"), per scene, for SCENES_TODO.md (make_todo.py reads it). SERIES_FORMAT.md section 1d + the teacher's 22 Nov
staging notes relayed during the trial rewrite:
  (a) buddies 1.5x their EP12-EP13 size at least, the speaker 45-55% of the frame height; balanced layouts, never bunched on one side;
  (b) when a line names or explains a board / card / object, the camera pushes in until it fills most of the frame (then eases back), the
      speaking buddy stays big beside it; a wide shot only for a moment at the start of a place;
  (c) look-closers: the thing fills the panel (no empty cream), a board being filled is LARGE beside the object, each named part gets its own
      push-in and big label, and one buddy's FACE peeks in from a lower corner (1/4-1/3 of the panel height) reacting on the beats;
      never semi-transparent ghost overlaps;
  (d) the hidden animal: real place -> smooth push-in -> iris wipe to the blue-violet starry game layout with the animal in a circle with a
      thick BLACK ring -> the game objects pop; the reveal uses the same circle; the animal changes its hiding place scene by scene;
  (e) lock-ins: ONE set of big numbered picture cards, never a separate row of 1/2/3 number cards.
Sizes: h = the sprite height passed to buddy() in px of the 1080-px frame (EP12-EP13 used about 205-225). Positions: x of the feet, L/C/R
and FG (foreground, feet near the bottom edge, often cropped at the knees in a close-up) / MG (mid-ground, standing on the floor / table /
ledge further back). Every buddy stands on something real with a soft contact shadow; NO aura discs (buddy(..., { aura: false }))."""

# The owl's and the ladybird's hiding place in each scene where they can really be (teacher, 22 Nov: never one spot all episode).
# The reveal replays the spot Heart names ("on the tree outside the window" / "on a leaf of the young tree").
TR1 = {
 "cold": {
  "frame": "WIDE for the first 2 s only (the place), then the camera eases in. Pip MG-L on the sofa arm (h 340), Basil FG-C on the rug in front of the low table (h 380, the yawn), Momo MG-R on the window ledge inside the grille (h 340). EP13's three dare boards stand on the floor along the window wall, between Pip and Momo (each about 30% of the frame high). The globe on the low table beside Basil, about as tall as his head.",
  "camera": "0-2 s wide; 2-6 s a slow ease-in towards Basil and the window (x1.0 -> x1.25), so the yawn and the Sun's first edge are both in frame. No cut.",
  "poses": {"(no lines)": "Pip rubs his eyes, then a small stretch-hop; Basil's big yawn (sit, mouth wide, eyes shut), a blink; Momo leans to the window glass (thinking), ears up as the Sun's edge appears."},
  "hide": "The owl: on a LOW branch of the rain tree outside the window, right side, half behind a leaf cluster, asleep.",
  "keep": "flat14.js `VF` (the living room, the window, the fan, the clock, the curtains) + `BG.flat` (baked), `skyView`, `rainTree`, `owlArt`; p1.js `SC.cold`'s timing (camCold, yawnK, boards3); change `bd()` to no aura, the new sizes and places."},
 "lasttime": {
  "frame": "The calm recap card (unchanged): EP13's three boards large, centred. No buddies (one picture, no distractions).",
  "camera": "The wired gentle push-in; each board steps forward as Heart says its card.",
  "poses": {"g201-g203": "(no buddies)"},
  "hide": "Not in this scene (a card picture).",
  "keep": "All of p1.js `SC.lasttime` (real art, ep13dare.js)."},
 "back": {
  "frame": "Back in the room, closer than the cold open: Basil FG-L (h 420), Pip MG-C on the sofa (h 340), Momo MG-R on the ledge (h 340); the three boards behind them by the window wall.",
  "camera": "A slow drift right towards the window, continuing into the title (same shot).",
  "poses": {"g204": "Basil dozes and jerks awake on \"answer\"; Pip hides two fingers behind his back; Momo covers her mouth with a paw (thinking)."},
  "hide": "The owl: on the OUTER window ledge, tucked behind one grille bar, asleep (only its ear tufts and one wing show).",
  "keep": "p1.js `SC.back` (roomBack, budsBack: resize, no aura)."},
 "title": {
  "frame": "As `back`, dimmed, the title words over it.", "camera": "Holds the end of `back`'s drift.", "poses": {"(no lines)": "As `back`."},
  "hide": "As `back` (the ledge), dimmed.", "keep": "p1.js `SC.title` (TITLE, slamFit)."},
 "game": {
  "frame": "FIND first (g301a, g301m), THEN the rules (g301b). Find: from the room the camera pushes onto the owl (high fork of the rain tree), then the IRIS: a circle about 46% of the frame high, centre-left (x 720, y 470), the owl inside it with a thick BLACK ring (about 16 px); everything outside becomes the blue-violet starry game stage with the soft spotlight beam (EP7-EP11's game screen). The label *a little owl* under the circle, *Can you spot it?* to its right. Momo pops in FG-R (h 520, 48%), turned towards the circle, for her line. Rules: the circle shrinks to the upper left (h 30%); the score pill glides to top centre; the YOU answer hand and score hand pop at centre-left; Pip MG-C (h 340) and Basil MG-R (h 360) pop in beside Momo; the three spread across the right half, the hands and the pill in the left half.",
  "camera": "g301a: push-in onto the owl (1.1 s ease in-out), iris on \"owl\"; g301m: a gentle drift right to take in Momo beside the circle; g301b: a slow pull back so the hands, pill and buddies all fit. No cut.",
  "poses": {"g301a": "(Heart) the owl opens its eyes for about 1 s on its name, then closes them.", "g301m": "Momo pointing at the circle, then a hand over her eyes like a lookout, scanning left and right; a wink at the viewer on \"keep your eyes open\".", "g301b": "Basil cheer on \"Buddies!\"; Pip waving; on \"fingers\" all three hold up one, two, three fingers in turn (Pip 1, Basil 2, Momo 3); cheer on \"every point\"."},
  "hide": "The owl: the HIGH fork of the rain tree, in the leaves' shade (the game spot).",
  "keep": "common.js `gameScene` (now takes [find, buddy, rules] line ids; push-in, labels, hands, pill; REPLACE spotDim with the iris + black ring + blue-violet stage), p1.js `SC.game`'s world (VF) and `owlOpen`."},
 "goals": {
  "frame": "The goal card screen: Pip FG-L (h 520, 48%) beside the three chips, which stand large at centre-right (each about 18% high). Basil and Momo MG-R (h 330) at the far right edge, peeking at the chips.",
  "camera": "A small push onto each chip as Pip reads it (x1.0 -> x1.06), easing back between.",
  "poses": {"g401": "Pip waving (inviting).", "g402": "Pip pointing at chip 1.", "g403": "Pip a hop, pointing at chip 2.", "g404": "Pip thinking (it is a question), then cheer; Basil and Momo nod."},
  "hide": "Not in this scene (a card screen).", "keep": "common.js `goals3` (move Pip, add Basil and Momo at the right, sizes)."},
 "count": {"frame": "The countdown screen, the three buddies spread L / C / R (h 360 each).", "camera": "Static (the numbers pop).", "poses": {"h501": "A hop on each number; cheer on GO!"}, "hide": "Not in this scene.", "keep": "common.js `SC.count` (resize, no aura)."},
 "r1card": {"frame": "The round card.", "camera": "The slam.", "poses": {"(none)": "—"}, "hide": "Not in this scene.", "keep": "`roundCard`."},
 "r1": {
  "frame": "COUNTDOWN TAKES THE STAGE (teacher, 22 Nov): while the ring runs, the background clears to the blue-violet game stage; the ring with its picture is BIG and central (about half the frame height); the clue labels are large and readable on a phone (cap height >= 40 px at 1080p, dark text on cream or white on ink, on top of the ring's frame); only the question's elements stay (boards and props glide out); at most ONE buddy stays, big (h 420+), reacting at the side. Round 1 (a 3 s ring): the ring with the dawn skyline big at centre, its two clue labels *every evening: it goes* · *every morning: it comes back* large on top of its frame, and under it ONE set of three big numbered picture cards (each card = EP13's dare board picture + its big number + its words: 1 The Sun moves away · 2 The Earth turns · 3 Clouds hide the Sun; about 40% of the frame high each), the question above. No separate row of 1/2/3 number cards. During the ring only Basil stays, big at the right, eyes on the ring. After LOCKED IN! the ring shrinks away and the buddies stand under their picks, spread L / C / R: Momo under card 1 (L), Basil under card 2 (C), Pip under card 3 (R); the one speaking grows to h 500 as the camera goes to them, the others h 340.",
  "camera": "g501: on the three cards (wide); g503: ease to Momo and card 1; g504: ease right to Pip and card 3; g505: ease back to Basil and card 2 in the centre. Smooth moves, no cuts.",
  "poses": {"g501": "(Heart) the buddies thinking under the cards.", "g502": "All three hold up their fingers.", "g503": "Momo pointing up at the window / the sky (she has SEEN the Sun move).", "g504": "Pip thinking, paw on chin.", "g505": "Basil cheer, a big hop, spins on the spot like his globe."},
  "hide": "Not in this scene (the lock-in screen).",
  "keep": "`lockN` (rebuild its cards as ONE big numbered picture-card set, using `dareBoard` pictures); the clue labels on top of the ring."},
 "lcsky": {
  "frame": "[LOOK CLOSER] The window's view FILLS the panel (the far blocks, the sky, the junction; no cream margins). Under it, inside the panel's lower edge, the row of four small skies builds large (each about 12% of the panel high). One buddy FACE peeks from a lower corner, a third of the panel high, the one whose idea it is: Pip's face lower-LEFT (it is his clouds card) for g601-g605; Basil's face lower-RIGHT for g603b and g607b (he swaps in with a pop, Pip ducks down).",
  "camera": "The push-in to the window (1 s), then: g602p a slow push onto the Sun's first edge behind the blocks (soft, never on the Sun itself) and the label *day time*; g603b ease down onto the street lamps coming on and *nighttime*; g605 ease up into the clear starry sky, the labels *a clear sky* · *no clouds* · *no Sun* each popping big in turn; g607b ease back to the whole view + the row of four skies; the verdict.",
  "poses": {"g601": "Pip's face: curious, eyes wide.", "g602p": "Pip's face: nods along step by step, a small smile on \"day time\".", "g603b": "Basil's face pops in: a big yawn on \"pyjama time\", then grins.", "g605": "Pip's face pops back: looks up, searching; eyes wide on \"no clouds\"; then a slow nod, a little embarrassed smile (his card was wrong).", "g607b": "Basil's face: counting on his fingers \"day, night, day, night\", a proud grin on \"repeats\"."},
  "hide": "Not on screen (a look-closer).",
  "keep": "flat14.js `skyArt`, `skyHour`, `skyView` (all lights), `tinySky`; closer.js `lookCloser`, `lcVerdict`; tests.js `stepPill(CLOCK)`, `dnTag`. Make the panel full-bleed (no cream border space) and add the buddy-face corner (`peekFace(who, corner, expr)`: a crop of the sit sprite, head and shoulders)."},
 "curtains": {
  "frame": "Momo FG-L (h 540, 50%) beside the low table, looking up at the camera; the table with the globe and the torch C (the globe about as tall as Momo's head); Pip MG-R on the sofa (h 340), Basil MG-R on the floor by the table's far end (h 360). An adult's hands draw the curtains (behind) and press the red sticker on the globe.",
  "camera": "g701m on Momo (two-shot with the globe); g701 \"Look closer.\": a smooth push onto the globe and the sticker, flowing straight into the look-closer (no cut).",
  "poses": {"g701m": "Momo thinking, chin on paw, then arms out (\"but why?\").", "g701": "All three lean in towards the table; a small hop as the sticker lands."},
  "hide": "The owl: on the outer window ledge again but at the LEFT end, peeking round the edge of the curtain as it is drawn (visible in the closing gap for about 1 s).",
  "keep": "p1.js `SC.curtains` (curtain14, arm14, the sticker), resize the buddies, no aura."},
 "lcglobe": {
  "frame": "[LOOK CLOSER] The globe FILLS most of the panel (about 70% of its height), the torch at the left edge with its beam; the room dark. The labels pop big one by one (*our Earth* · *our Sun* · *Singapore* · *the torch stays still* · *the globe turns*). A buddy FACE in a lower corner, a third of the panel high, lit by the torch from one side: the face of whoever speaks swaps in with a pop (Pip lower-RIGHT for g703p, Basil lower-RIGHT for g704b and g706b, Momo lower-LEFT for g705m).",
  "camera": "g702: on the whole model, then a small push to the red dot on \"Singapore\"; g703p: ease left onto the torch and the pin mark on \"still\", then back to the globe on \"turns\"; g704b: push onto the red dot in the middle of the light (cream tag *the side that faces the Sun: day time* big); g705m: follow the dot across the edge into the shadow (cream tag *nighttime* big); g706b: follow it round into the light again; ease back for the verdict THE EARTH TURNS.",
  "poses": {"g702": "Momo's face lower-left: curious.", "g703p": "Pip's face: serious, careful, eyes following the globe.", "g704b": "Basil's face: a big grin, a little wave \"good morning\" to the red dot.", "g705m": "Momo's face: a gasp, paws to cheeks, as the dot goes dark.", "g706b": "Basil's face: a slow, satisfied nod and a grin as the light comes back."},
  "hide": "Not on screen (a look-closer).",
  "keep": "flat14.js `globeArt`, `globeTheta`, `globe14` (exactly half lit), `torch14`, `books4`, `arm14`; closer.js `lookCloser`."},
 "globeans": {
  "frame": "The curtains open; morning light floods in. The answer: ONE set of three big numbered picture cards (as Round 1) across the left 60% of the frame, card 2 glowing; Basil FG-R (h 560, 52%) for the rotation line, the globe on the table beside him (he can flick it); Momo MG-C (h 340) and Pip MG-C-R (h 340) between the cards and Basil, each with their small x chip.",
  "camera": "g707: on the three cards, push onto card 2 as it glows; g708: ease right to Basil and the globe as ROTATION pops; g709r: a two-shot of Basil and the spinning globe.",
  "poses": {"g707": "Basil cheer with a big hop (he was right); Momo surprised, then a good-sport smile; Pip oops, then a nod.", "g708": "Basil leans in, listening, then points at the globe (an inviting hop: he has no pointing pose).", "g709r": "Basil flicks the globe with his tail tip and it spins; he spins round once himself, then cheer."},
  "hide": "The owl: on the air-con ledge under the window outside (a typical HDB ledge), tucked against the wall, asleep.",
  "keep": "p1.js `SC.globeans` (camL14, dareBoard, tickChip / xChip, the curtains): rebuild the answer cards as one picture-card set; resize the buddies, no aura."},
 "momo": {
  "frame": "Momo FG-L (h 560, 52%), the framed picture (the window view with the dotted Sun path, and the small turning globe) on the floor C-R, about 45% of the frame high; Basil MG-R (h 340), Pip MG-R on the sofa (h 330).",
  "camera": "g801: a push onto Momo and the framed picture (two-shot); g802: hold, a tiny push onto the picture's \"...but WE are turning!\".",
  "poses": {"g801": "Momo surprised (paws up), then pointing at the dotted path.", "g802": "Momo cheer with a hop; Basil nods; Pip claps (cheer)."},
  "hide": "The owl: back in the rain tree, on the OTHER side (left branch), half behind a leaf cluster, asleep.",
  "keep": "p1.js `framePic`, `SC.momo` (resize, no aura)."},
 "waitw": {"frame": "The globe on the table C, large; the three buddies MG at the table's edge, spread L / C / R (h 340), waving the viewer off.", "camera": "One continuous glide into the red sticker, then the cream wipe.", "poses": {"g901": "Pip and Momo waving, Basil cheer, all three lean towards the globe."}, "hide": "Not in this scene (the glide fills the frame with the globe).", "keep": "p1.js `SC.waitw`."},
 "shrink": {"frame": "The journey (the child is the dot). No buddies.", "camera": "The camera IS the dot (one continuous swing).", "poses": {"g902-g905": "(no buddies)"}, "hide": "Not in this scene.", "keep": "flat14.js `dotJourney`; shrink.js helpers."},
 "pullout": {"frame": "Pull back to the room; the three buddies at the table's edge (h 340) L / C / R.", "camera": "One continuous pull back from the sticker.", "poses": {"(none)": "A hop each as they come into view."}, "hide": "Not visible (too short).", "keep": "p1.js `SC.pullout`."},
 "mark1": {
  "frame": "The Mark Sentence card large at centre-right (about 55% of the frame wide); Basil FG-L (h 540, 50%) for the card; under the card the small globe with its turning line and the 24-hour clock (each about 18% high). For g1003p Pip steps in FG-R (h 520) and the clock grows to about 35% of the frame between Pip and the card.",
  "camera": "g1001-g1002: on Basil and the card (each highlighted phrase gets a small push); g1003p: an ease right to Pip and the 24-hour clock (it fills the space between them), the clock's hand going round twice.",
  "poses": {"g1001": "Basil cheer + an inviting hop.", "g1002": "Basil sit (lip-sync), cheer after the last word.", "g1003p": "Pip pointing at the clock, counting round with his paw, then holding up one finger for \"one day and one night\"; Basil nods."},
  "hide": "Not in this scene (a card screen).",
  "keep": "common.js `markScene`, `markCard` (move the reader, add Pip and the clock; no aura)."},
 "cyclecheck": {
  "frame": "The board CYCLE CHECK LARGE at centre (about 60% of the frame high, on its low stand on the floor), Pip FG-L (h 520) beside its left edge for g1104p, Basil FG-R (h 540) beside its right edge for g1105b; Momo MG-C behind the board's top corner (h 330). The room behind in bright morning.",
  "camera": "g1104p: the board slides in; push onto the ring as the two tiles hop on, onto box IT CHANGES on \"changes\", along the arrows on \"again and again\", onto box IT REPEATS on \"repeats\" (each tick big); g1105b: ease right to Basil and the whole ring going round; g1101: hold the board, the green tag A CYCLE and the key-word pop CYCLE.",
  "poses": {"g1104p": "Pip pointing at each box in turn, a careful nod on each tick.", "g1105b": "Basil counts the days of the school week on his fingers, then throws his arms up on \"weekend\" (cheer), then points (an inviting hop) at the ring.", "g1101": "Momo cheer on \"cycle\"; Pip and Basil a hop together."},
  "hide": "The owl: on an HDB clothes-pole holder outside the window (the metal bracket), small, asleep, its tail feathers showing.",
  "keep": "tests.js `cycleBoard` + `CYC()` (the marks; redraw it as the real board), p1.js `SC.cyclecheck` (resize, no aura), flat14.js `tilePic`, `tinySky`."},
 "mark2": {
  "frame": "The card large at centre-left; Momo FG-R (h 540) for the card; under the card the board with its closed ring (about 25% high).",
  "camera": "On Momo and the card; a small push on each highlighted phrase; ease back as REPEATED PATTERN pops.",
  "poses": {"g1102": "Momo pointing (inviting).", "g1103": "Momo sit (lip-sync), cheer after the last word."},
  "hide": "Not in this scene (a card screen).", "keep": "common.js `markScene`."},
 "holdon": {
  "frame": "Basil FG-L (h 560, 52%) with his three pencils on the floor in front of him (each pencil at its real size beside him: the long one about as long as his arm); the board on its stand at centre-right, large (about 50% high), its two boxes and ring; For the countdown (g1202 to the bell): COUNTDOWN TAKES THE STAGE (teacher, 22 Nov): while the ring runs, the background clears to the blue-violet game stage; the ring with its picture is BIG and central (about half the frame height); the clue labels are large and readable on a phone (cap height >= 40 px at 1080p, dark text on cream or white on ink, on top of the ring's frame); only the question's elements stay (boards and props glide out); at most ONE buddy stays, big (h 420+), reacting at the side. the HOLD ON! ring with the three pencils big at centre, *IT CHANGES ✓* · *IT REPEATS ?* large on top of it, the crossed-arms YOU hand at its right; the board glides out to the right, Pip and Momo step out; Basil stays at the left, big, surprised. After the bell the board glides back to its HOME and Pip steps forward FG-R (h 500) for g1205p, Momo MG-R (h 340) beside the board.",
  "camera": "g1201: a push onto Basil and his pencils (two-shot); g1202: ease back so the ring and the YOU hand fit; g1203: hold; g1205p: ease right to Pip and the board as the pencil tiles settle in a ROW (penrow), the one tick (penchg) and NOT A CYCLE (pentag) each pushed in on.",
  "poses": {"g1201": "Basil cheer (proud), holding up the stub.", "g1202": "Basil surprised on \"not right\"; Pip and Momo arms crossed.", "g1203": "Pip and Momo cheer.", "g1205p": "Pip pointing at the empty IT REPEATS box; Basil oops (paw on head), then a sheepish grin (his line is cut: the poses carry it)."},
  "hide": "Not on screen (the room is dimmed for the game).",
  "keep": "p1.js `SC.holdon` (RG ring, pencil14, shavings14, the labels on top of the ring); resize and spread the buddies, no aura."},
 "pipdown": {
  "frame": "Pip FG-R (h 540) on the window ledge inside the grille, pointing down; through the window, the junction and its traffic light below (the traffic light about 20% of the frame high); Basil MG-L (h 340) and Momo MG-C (h 340) turning to look.",
  "camera": "g1301: on Pip and the window; on \"traffic light\" the camera starts gliding out through the window and down (into `lclight`, no cut).",
  "poses": {"g1301": "Pip pointing down, a hop on \"down\", then thinking on \"I think\"."},
  "hide": "The owl: on top of the street lamp by the junction (small, asleep), seen through the window as the camera glides down.",
  "keep": "p1.js `SC.pipdown`, flat14.js `trafficLight` (small)."},
 "lclight": {
  "frame": "[LOOK CLOSER] The traffic light FILLS most of the panel (about 75% of its height); each lamp's label pops BIG beside it as it lights. Pip's face lower-LEFT (a third of the panel) for the lamps (his idea); Basil's face pops in lower-RIGHT for g1304b; the small board at the lower centre grows to a third of the panel as its three tiles land (lighttiles).",
  "camera": "The glide down, then the push-in; on each lamp word a small push onto THAT lamp (green, amber, red, green again); g1304b: ease back to the whole light + the board.",
  "poses": {"g1302": "Pip's face: excited.", "g1303": "Pip's face: eyes go green, amber, red with the lamps; a gasp on \"green again\".", "g1304b": "Basil's face: a big nod, then a thumbs-up-like cheer."},
  "hide": "Not on screen (a look-closer).", "keep": "flat14.js `lightArt`, `trafficLight`; closer.js `lookCloser`."},
 "final": {"frame": "The score-hand screen: the hand large C; the buddies spread L / R (h 360).", "camera": "Static.", "poses": {"g1401": "Cheer and a jump on \"High five!\"."}, "hide": "Not in this scene.", "keep": "`finalScene` (resize, no aura)."},
 "liz": {
  "frame": "The reveal (same circle as the game): the score hand melts into the real room, the camera pushes in onto the rain tree, then the IRIS: the owl in its circle (about 46% high) with the thick BLACK ring, the blue-violet starry stage outside; the pills *It was on the tree outside the window!* · *Tell someone at home!* to its right; the three buddies pop in at the right (h 360), cheering.",
  "camera": "The melt, one push-in onto the owl, the iris; a tiny drift.",
  "poses": {"g1402": "The owl opens one eye, looks at us, closes it; the buddies cheer and wave at it on \"Tell someone at home\"."},
  "hide": "The REPLAY spot = the high fork of the rain tree (Heart: \"on the tree outside the window\").",
  "keep": "common.js `lizReveal` (replace the yellow ring with the iris + black ring + blue-violet stage), p1.js `SC.liz`."},
 "kwrecap": {"frame": "The read-along shelf large C; the buddies spread L / C / R in front (h 360).", "camera": "Static.", "poses": {"h860-h864": "Mouthing along, cheer on \"Well done!\"."}, "hide": "Not in this scene.", "keep": "common.js `SC.kwrecap` (resize, no aura)."},
 "cliff": {
  "frame": "Momo FG-C-L (h 560) on the rug; the small cream card *living and non-living things* with the big ? above her shoulder; the three picture cards (a hen, a chick, a teddy bear) slide in low on the floor at the right, each about 30% high; Pip MG-L (h 340) on the sofa, Basil MG-R (h 360) beside the cards.",
  "camera": "g1501: on Momo and the ?; g1502: ease right along the three cards as each is named (a small push on the teddy bear); g1503: hold for the PART 2 slam.",
  "poses": {"g1501": "Momo thinking, chin on paw, then arms out.", "g1502": "Momo a hop; Pip and Basil look at the teddy bear card and shrug (sit, then surprised on \"teddy bear\").", "g1503": "All three cheer."},
  "hide": "The owl: on the rain tree's TOP branch, seen through the window behind Momo's shoulder, asleep.",
  "keep": "p1.js `SC.cliff`, flat14.js `picCard14`."},
 "nyk": {"frame": "EP1's ending; the board CYCLE CHECK centred between the buddies, big enough to read; the buddies L / C / R (h 380), not bunched.", "camera": "The sunburst turns.", "poses": {"u1300-u1305": "The wired ending (waving, pointing, the jumps, cheer)."}, "hide": "Not in this scene.", "keep": "common.js `nykScene` (resize, no aura)."},
}

TR2 = {
 "lasttime": {"frame": "The calm recap: three pictures one at a time, centred and large. No buddies.", "camera": "The wired gentle push-in on each.", "poses": {"j101": "(no buddies)"}, "hide": "Not in this scene.", "keep": "p2.js `SC.lasttime`."},
 "place": {
  "frame": "WIDE for its 2 s only (the place): the garden, the young tree, the tall old tree, the bench, the hen and chicks; the buddies spread along the path: Pip MG-L by the bench (h 330), Basil MG-C (h 350), Momo MG-R by the planter bed (h 330), well away from the chickens.",
  "camera": "A gentle drift across the garden that flows into the game's push-in (no cut).",
  "poses": {"(no lines)": "Pip waving, Momo pointing at the chicks, Basil cheer."},
  "hide": "The ladybird: on a LOW leaf of the young tree, walking.",
  "keep": "garden14.js `VG` + `BG.garden14` (baked), `chicken14`, `rooster14`, `ladybird14`, `leaf14`, `fruit14`; p2.js `placePill`; replace `gardenPH`."},
 "game": {
  "frame": "FIND first (j201a, j201b), THEN the rules (j201c). Find: the push-in onto the ladybird, the IRIS (circle about 46% high, centre-left, thick BLACK ring), the blue-violet starry stage outside; *a little ladybird* under it, *Can you spot it?* beside it. Basil pops in FG-R (h 540, 50%) for j201b, peering at the circle. Rules: the circle shrinks to the upper left; the score pill, the YOU hand and ring, *You lock in first* pop at centre-left; Pip MG-C (h 340) and Momo MG-R (h 340) pop in beside Basil.",
  "camera": "j201a: the push-in (1.1 s) and the iris; j201b: a drift right to Basil beside the circle; j201c: a slow pull back so everything fits. No cut.",
  "poses": {"j201a": "(Heart) the ladybird lifts its wing cases once.", "j201b": "Basil leans in, squinting, a hand over his eyes on \"leaf\", turns to a flower on \"flower\", then a wink at the viewer on \"keep looking\".", "j201c": "On \"fingers\" the three hold up one, two, three fingers in turn; cheer on \"every point\"."},
  "hide": "The ladybird: a leaf near the TOP of the young tree (the game spot).",
  "keep": "common.js `gameScene` (array of line ids; iris + black ring + blue-violet stage in place of spotDim), the drawn garden as `R.world`, `LADY`."},
 "goals": {"frame": "Basil FG-L (h 540) beside the three chips (centre-right, large); Pip and Momo MG-R (h 330) peeking.", "camera": "A small push onto each chip as Basil reads it.", "poses": {"j301": "Basil an inviting hop.", "j302": "Basil a hop at chip 1.", "j303": "Basil a hop at chip 2.", "j304": "Basil cheer; Pip and Momo nod."}, "hide": "Not in this scene.", "keep": "`goals3`."},
 "r1card": {"frame": "The round card.", "camera": "The slam.", "poses": {"(none)": "—"}, "hide": "Not in this scene.", "keep": "`roundCard`."},
 "r1": {
  "frame": "COUNTDOWN TAKES THE STAGE (teacher, 22 Nov): while the ring runs, the background clears to the blue-violet game stage; the ring with its picture is BIG and central (about half the frame height); the clue labels are large and readable on a phone (cap height >= 40 px at 1080p, dark text on cream or white on ink, on top of the ring's frame); only the question's elements stay (boards and props glide out); at most ONE buddy stays, big (h 420+), reacting at the side. Round 1 (a 6 s ring): the old photo in the ring big at centre (held by an adult's hand), its four clue labels *a boy* · *a young tree* · *a teddy bear* · *long ago* large on top of its frame; under it ONE set of three big numbered picture cards (1 The boy and the tree: the boy and the tree drawn; 2 All three: the boy, the tree, the teddy bear; 3 Only the tree; about 40% high each), the question above. No separate 1/2/3 number row. During the ring only Momo stays, big at the right, thinking. After LOCKED IN! the ring shrinks away and the buddies under their picks: Basil under card 1 (L), Momo under card 2 (C), Pip beside Basil under card 1 (L-C); the speaker grows to h 500 as the camera goes to them.",
  "camera": "j401: the photo pushed in on \"Tree Planting Day\", then ease to the three cards; j403: ease to Momo / card 2; j404: ease left to Basil / card 1; j405: hold on Pip beside him.",
  "poses": {"j401": "The buddies thinking under the cards.", "j402": "Fingers up.", "j403": "Momo cheer (confident), arms wide (\"everything!\").", "j404": "Basil cheer, a hop, then taps the teddy bear's picture.", "j405": "Pip pointing at card 1, a careful nod."},
  "hide": "The ladybird: on the white BORDER of the old photo, bottom corner (it landed on the photo), small.",
  "keep": "`lockN` (rebuild as one big picture-card set), garden14.js `photo14`."},
 "lcthen": {
  "frame": "[LOOK CLOSER] THEN and NOW side by side FILL the panel (each half the panel, no empty cream). Each pair lights with its own big moment: the camera pushes onto it, its label pops big (*taller* · *taller* · *fruits* · *the same size*), the height line draws. A buddy FACE in a lower corner, a third of the panel high, swaps with the speaker: Basil lower-RIGHT (j502b, j507b), Pip lower-LEFT (j503p, j505p), Momo lower-LEFT (j504m).",
  "camera": "j501: both pictures; j502b: push onto the boy and the man (the line rises); j503p: pan to the young tree and the tall tree (fruits); j504m: pan down to the two teddy bears (the flat line, a small hold); j505p: ease back to both pictures as LIVING / NON-LIVING land and GROW pops; j507b: hold on the man and the tree (the rising lines glow).",
  "poses": {"j501": "Momo's face: curious.", "j502b": "Basil's face: jaw drops, \"Whoa!\".", "j503p": "Pip's face: a careful nod.", "j504m": "Momo's face: puzzled, head tilted, a paw scratching her head.", "j505p": "Pip's face: explaining, a small smile.", "j507b": "Basil's face: stretches up tall, proud."},
  "hide": "Not on screen (a look-closer).",
  "keep": "garden14.js `thenArt`, `scene14`, `person14`, `photo14`, `worn14`; closer.js `lookCloser` (replace p2.js `lcPH`)."},
 "thenans": {
  "frame": "The garden; the THEN / NOW picture board on the bench C (about 40% high); Momo FG-L (h 500), Basil MG-R (h 360), Pip MG-R (h 330); the answer card 1 glowing at the upper left (one card of the picture-card set).",
  "camera": "j506: a push onto card 1 as it glows, then ease to Momo.",
  "poses": {"j506": "Momo surprised (her x), then a nod and a hop (a good sport); Basil cheer; Pip a quiet nod."},
  "hide": "The ladybird: on the TIP of Basil's tail (he has not noticed), small.",
  "keep": "p2.js `SC.thenans` (the answer card), `VG`."},
 "lcchick": {
  "frame": "[LOOK CLOSER] The chick FILLS most of the panel (the low garden behind blurred); the four week pictures dissolve in ONE place (never two chicks overlapping as ghosts: each dissolve is quick and clean); the labels big (*the same chick* · *bigger* · *an adult chicken* · *the adult* · *its young*). A buddy FACE in a lower corner, a third of the panel high: Momo lower-LEFT for j602m and j606m, Pip lower-RIGHT for j602p, Basil lower-RIGHT for j603b and j606b.",
  "camera": "j601: the low glide and push-in, then a small push onto the pale patch on \"chick\"; j602m: hold on the adult; j602p: follow her as she walks to the bush (nestwalk) and settles; j603b: ease back as she walks out with three chicks (chicksout), push onto the chicks on \"young\"; j604: hold, REPRODUCE pops; j606m-j606b: ease back so the hen and all her chicks fill the panel.",
  "poses": {"j601": "Momo's face: soft \"aww\".", "j602m": "Momo's face: eyes wide, amazed at the size.", "j602p": "Pip's face: a sure nod.", "j603b": "Basil's face: a gasp, then a huge grin, counting the chicks.", "j604": "Momo's face: thinking (a new word).", "j606m": "Momo's face: head tilted, asking.", "j606b": "Basil's face: proud, explaining, a wink."},
  "hide": "Not on screen (a look-closer).",
  "keep": "garden14.js `chickArt`, `chicken14` (ages 0-3, o.patch), `nest14`, `egg14`; closer.js `lookCloser`."},
 "strip": {"frame": "The cream strip C0.2 (shown 3.5 s, not read: script section 6's cut) over the softly dimmed garden; the NOW picture and the hen with her chicks under it; the three buddies at the edges L / R (h 330), nodding.", "camera": "Static.", "poses": {"(no lines)": "Sit and nod; Momo a small cheer."}, "hide": "The ladybird: on the bench's armrest.", "keep": "p2.js `SC.strip` (`bookCaption` when read)."},
 "waitw": {"frame": "The bush with the nest C, large; the buddies at the edges L / R (h 340), waving.", "camera": "One continuous glide into one egg.", "poses": {"j701": "Pip and Momo waving, Basil cheer."}, "hide": "The ladybird: on a leaf of the bush above the nest.", "keep": "garden14.js `nest14`; replace the p2.js `phScene`."},
 "shrink": {"frame": "The journey (the child is the chick). No buddies.", "camera": "The camera IS the chick, rising with the weeks.", "poses": {"j702-j706": "(no buddies)"}, "hide": "Not in this scene.", "keep": "garden14.js `chickJourney`."},
 "pullout": {"frame": "Pull back to the garden; the buddies by the board L / C / R (h 340).", "camera": "One continuous pull back.", "poses": {"(none)": "A hop each."}, "hide": "Not visible (too short).", "keep": "Replace the p2.js `phScene`."},
 "ring": {
  "frame": "The board CYCLE CHECK LARGE at centre (about 60% high) by the bench; Pip FG-L (h 520) placing the tiles' order with his words; Basil MG-R (h 360), Momo MG-R (h 340).",
  "camera": "j801p: a push onto the ring; each tile hop pushed in on as Pip names it (egg, chick, adult chicken, egg again); j801: ease back to the whole ring going round, the two ticks, A CYCLE + A LIFE CYCLE, LIFE CYCLE pops.",
  "poses": {"j801p": "Pip pointing at each tile in turn (step by step), surprised on \"egg again\".", "j801": "Momo pointing along the arrows, cheer; Basil cheer with a hop on the tag."},
  "hide": "The ladybird: on the top edge of the board's stand.",
  "keep": "tests.js `cycleBoard` (marks tegg / tchick / tadult / tback / tick1 / tick2 / tagcycle), garden14.js `egg14`, `chicken14`; replace p2.js `SC.ring`'s stage note."},
 "mark1": {"frame": "The card large C-R; Basil FG-L (h 540); under the card the ring with its tiles (25% high).", "camera": "On Basil and the card; a small push on each highlighted phrase.", "poses": {"j802": "Basil cheer + inviting hop.", "j803": "Basil sit (lip-sync), cheer after."}, "hide": "Not in this scene.", "keep": "`markScene`."},
 "showcard": {"frame": "The round card.", "camera": "The slam.", "poses": {"(none)": "—"}, "hide": "Not in this scene.", "keep": "`roundCard`."},
 "show": {
  "frame": "Pip's easel MY NOTES LARGE at centre (about 60% high), standing on the grass; Pip FG-L (h 520) beside it; for the countdown: COUNTDOWN TAKES THE STAGE (teacher, 22 Nov): while the ring runs, the background clears to the blue-violet game stage; the ring with its picture is BIG and central (about half the frame height); the clue labels are large and readable on a phone (cap height >= 40 px at 1080p, dark text on cream or white on ink, on top of the ring's frame); only the question's elements stay (boards and props glide out); at most ONE buddy stays, big (h 420+), reacting at the side. the easel glides into the ring's place, big at centre (its three lines and drawings large, the lines >= 40 px cap height), the YOU ring and counting hand beside it; only Pip stays, big at the left, nervous (thinking). After LOCKED IN! the easel glides back to its HOME and Basil FG-R (h 500) and Momo MG-R (h 360) for their reasons.",
  "camera": "j901: on the easel; j902: push onto line 2 as Pip reads it (lines 1 and 3 lit without reading); j904: ease right to Basil; j905: to Momo.",
  "poses": {"j901": "Pip pointing at his notes, proud.", "j902": "Pip sit (lip-sync), thinking during the ring.", "j903": "All fingers up.", "j904": "Basil cheer, draws a circle in the air with his tail.", "j905": "Momo cheer, a spin (round and round)."},
  "hide": "The ladybird: on the easel's top-right corner.",
  "keep": "tests.js `notesEasel` (redraw it, keep lit / strike / fix), p2.js `SC.show`."},
 "fix": {"frame": "The easel large C; line 2 pushed in on; Pip FG-L (h 540).", "camera": "A slow push onto line 2 as it is struck and bends into a ring.", "poses": {"j906": "Pip oops (paw on head), surprised as the row bends, then cheer with a hop; Basil and Momo clap (cheer)."}, "hide": "The ladybird: on Pip's paper clip at the top of the notes.", "keep": "p2.js `SC.fix` (resize, no aura)."},
 "lchens": {
  "frame": "[LOOK CLOSER] The three chickens at the water dish FILL the panel side by side (each about a third of its width); each label pops big as it is named. Basil's face lower-RIGHT (j1001b), Momo's face lower-LEFT (j1001m).",
  "camera": "j1001: the low glide and push-in; j1001b: a slow drift grandmother -> mother -> chick, a small push on each as it is named; j1001m: ease back as all three lift their heads together.",
  "poses": {"j1001": "Momo's face: curious.", "j1001b": "Basil's face: grinning like at a family photo (\"say cheese\").", "j1001m": "Momo's face: a soft, happy \"aww\", eyes shining."},
  "hide": "Not on screen (a look-closer).", "keep": "garden14.js `hensArt`; closer.js `lookCloser` (replace `lcPH`)."},
 "mark2": {"frame": "The card large C-L; Momo FG-R (h 540); under the card the three chickens (25% high); the tag *ensure = make sure*.", "camera": "On Momo and the card; a small push on \"ensure\" as its tag shows.", "poses": {"j1002": "Momo pointing (inviting).", "j1003": "Momo sit (lip-sync), cheer after."}, "hide": "Not in this scene.", "keep": "`markScene`."},
 "chant": {"frame": "The board with its TWO closed rings large at centre behind; the buddies in a row in front, spread L / C / R (h 400), not bunched.", "camera": "Static, a tiny pulse on each stomp.", "poses": {"u1002-c1003": "Claps and stomp hops; Basil leads each line (a bigger hop)."}, "hide": "Not in this scene.", "keep": "`chantScene`, `cycleBoard({two})`."},
 "final": {"frame": "The score-hand screen; buddies L / R (h 360).", "camera": "Static.", "poses": {"j1201": "Cheer and a jump on \"High five!\"."}, "hide": "Not in this scene.", "keep": "`finalScene`."},
 "liz": {"frame": "The reveal: the push-in onto the young tree, the IRIS (the ladybird in its circle, thick BLACK ring, the blue-violet stage outside), the pills to its right, the buddies popping in at the right (h 360).", "camera": "The melt, the push-in, the iris; follow its little flight inside the circle.", "poses": {"j1202": "The ladybird lifts its wing cases and flies a hand's width to the next leaf; the buddies cheer."}, "hide": "The REPLAY spot = a leaf of the young tree (Heart: \"on a leaf of the young tree\").", "keep": "common.js `lizReveal` (iris + black ring), `LADY`."},
 "dare": {
  "frame": "ONE set of three big numbered picture cards (the three mango boards: a mango cut open with its seed + a small mango / a flower / a young plant; each about 40% high), across the frame; Basil FG-L (h 500), Pip MG-C (h 340), Momo MG-R (h 340) spread under them.",
  "camera": "j1301: on \"mango\" a push onto the cut mango's seed; ease along the three cards as Heart names each; ease back for \"Lock in your answer!\".",
  "poses": {"j1301": "Basil cheer on \"mango\", rubbing his tummy (his joke is cut: the pose carries it); Pip thinking; Momo pointing at the seed."},
  "hide": "The ladybird: on a flower in the planter bed behind the cards.",
  "keep": "garden14.js `mangoCut`, `mangoBg` (PIC.mangoA / B / C), p2.js `SC.dare` (replace its `phScene`)."},
 "kwrecap": {"frame": "The read-along shelf C; buddies L / C / R (h 360).", "camera": "Static.", "poses": {"h860-h864": "Mouthing along, cheer."}, "hide": "Not in this scene.", "keep": "`SC.kwrecap`."},
 "nyk": {"frame": "EP1's ending; the board's two rings centred between the buddies L / C / R (h 380).", "camera": "The sunburst turns.", "poses": {"u1300-u1305": "The wired ending."}, "hide": "Not in this scene.", "keep": "`nykScene`."},
}
TRIAL = {1: TR1, 2: TR2}

# Each recurring board / prop keeps ONE home position and size across consecutive scenes (teacher, 22 Nov); when it must move or resize it
# glides there in view, never jumps between scenes.
HOMES = [
 ("The board CYCLE CHECK (Part 1, the living room)", "HOME: centre-right, x 1180, its feet on the floor, about 55% of the frame high (`cyclecheck`, after the HOLD ON! bell in `holdon`, `nyk`). It glides out to the right for the HOLD ON! countdown and back after; in `lclight` and under Mark Sentence 2 it is a PICTURE of the board (an inset), always at the lower right of the panel / card."),
 ("The board CYCLE CHECK (Part 2, the garden)", "HOME: centre-right by the bench, x 1180, about 55% high (`ring`, `chant`, `nyk`: in the chant and the ending it stays there and the buddies stand to its left and right). Under Mark Sentence 1 of Part 2 it is a picture inset at the lower right of the card."),
 ("The globe and the torch", "HOME: on the low table at the room's centre (flat14.js `GLB` = 1050, 686; the torch on its books at `TOR`), the same in `cold`, `back`, `curtains`, `globeans`, `momo`, `waitw`, `pullout`; the look-closer pushes in on it there (no jump)."),
 ("EP13's three dare boards", "HOME: on the floor along the window wall, left to right (cold, back, title, game's first second); in Round 1 and the answer they are the pictures of the ONE set of big numbered cards, always in the same order 1 · 2 · 3."),
 ("The framed picture (Momo's scene)", "On the floor centre-right, about 45% high; only in `momo`."),
 ("Pip's easel MY NOTES", "HOME: centre on the grass, about 60% high (`show`, `fix`); it glides into the ring's place for the countdown and back."),
 ("The THEN / NOW picture board", "On the bench at centre (`thenans`); in `lcthen` the same two pictures fill the panel (the push-in goes from the bench into them)."),
 ("The mango boards (EP15 dare)", "Across the frame as the ONE set of three big numbered picture cards (`dare`)."),
]

