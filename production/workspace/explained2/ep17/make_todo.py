"""make_todo.py: tl_p1.json + tl_p2.json + the staging below -> SCENES_TODO.md (the artist's list for Stage 2 of EP17).
  python3 make_todo.py      Re-run after any timeline change, so the times in the list are always the timeline's.
Each scene: what to draw, the frame (who stands where, how big, the main prop), the camera, a pose for every line WITH ITS REASON (the
one-job-per-pose table, SERIES_FORMAT 5, 23 Nov: a pose with no reason is replaced by listening), where the hidden animal is (a new spot in
every scene, never the intro spot again), the small life in the background, the light, the place's ambience and foley ON the marks, the
marks (from the timeline) and the lines with their times. The staging follows ../p3_ep17_script.md sections 4 and 5, with the Stage 1
corrections listed in HDR ("Changed from the script's tables")."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
fm = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
LIME = "the garden's lime-plant side (`VL(t, o)`; bake the static parts as `BG.lime17`)"
CORNER = "the garden's far corner after rain (`VC(t, o)`; bake as `BG.corner17`)"
CARD = "A card screen (EP1's stage): keep the stage's warm spotlight and the soft bokeh drifting."
LCF = "WIRED: `lcPH` (tests.js) inside the real `lookCloser` frame (closer.js). Stage 2 replaces `lcPH` with `lookCloser(t, s, { tz, fx, fy, art, set, verdict, tv, over })` and draws `art(t)` (centred on 0, 0 inside +-830 x +-395; keep the bottom 80 px for the verdict), keeping the wired `over`. The thing FILLS the panel; each named part gets its own push-in and a big label joined to it, colour-coded; the speaking buddy's FACE peeks in from a lower corner (closer.js `lcPeekAuto`, wired) and reacts. Models: ../ep16 `lceggs` / `lcskin` once drawn, ../ep15/garden15.js `adultArt`, ep13 straps (`../reference/lookcloser_good_ep13_straps.webp`)."
LISTEN = "listening (smile, blinks, a small nod): nothing in the line asks for a pose"
# name: (title, draw, frame, camera, poses {line id: "pose: who does what (reason: ...)"}, hidden, life, light, sound)
P1 = {
 "cold": ("1 · Silent cold open: the lime plant at dawn (no voice)",
   LIME[0].upper() + LIME[1:] + ": EP15 / EP16's community garden beside the HDB block at dawn (the void deck behind with its square pillars and letterboxes, planter beds, the bench, the little pond far off). The LIME PLANT in its big glazed pot at the garden's edge fills most of the frame: glossy leaves, one leaf edge chewed away. `munch`: a plump GREEN CATERPILLAR (lime butterfly larva: green with a pale band, a big round head end) munches the leaf edge, bites appearing; a tiny pale round egg on a younger leaf's tip (it closes the loop later). `cardsIn`: EP16's two dare cards slide in low along the pot's rim (WIRED: `ep16dare.js`; copy EP16's real card art in at Stage 2). `budsIn`: the buddies pop in. Location pill *A community garden, Singapore · dawn*. No title.",
   "Pip big at the left on the garden path (h ~520), nose towards the caterpillar; Momo at the right on the bench end (h ~400, further back); Basil centre-right on the low wall of a planter bed (h ~380 before SIZE_K .94).",
   "One slow push towards the caterpillar over 6 s; no cut.",
   {"*": "Pip: sit, leaning in to the caterpillar (reason: curious; no strong pose). Momo: waving as she pops in (reason: hello). Basil: sit, settles with a small hop (reason: arriving; no strong pose)."},
   "Moth: resting flat on the void deck's pillar behind the garden (small, brown-grey, wings like a little triangle). This is BEFORE the game: the game's push-in goes here, and after that it is never shown here again.",
   "The caterpillar chews; leaves stir; a bulbul hops on the fence; dew drips.", "Dawn: cool blue turning gold from the right, dew shine on the leaves.",
   "Garden bed at dawn (R.garden: a bulbul's call, far traffic); a soft steady munch ON `munch`; a leaf rustle; two card slides ON `cardsIn` (wired: two of the three slides); three pops ON `budsIn` (wired). No music."),
 "lasttime": ("2 · \"Last time...\": EP16's dare (ONE calm picture)", "WIRED with EP16's two dare cards (1 *Yes, a nymph* · 2 *No*); each card steps forward and lights while Heart says it (>= 2.5 s each), the ? on \"Is\", the label *Is the caterpillar a nymph?*. Draw the cards' pictures big (or copy EP16's): card 1 a caterpillar beside a grasshopper nymph with a ?; card 2 a caterpillar alone.", "No buddies (the calm recap).", "The wired gentle push-in (x1.04 over 8 s).", {}, "Not in this picture.", "The caterpillar on card 2 wiggles once on its number.", "The stage, calm.", "Wired: a soft pop per card; calm bed."),
 "back": ("2 · Back at the lime plant", "The lime plant (the cold open's set): the caterpillar takes another bite; EP16's two cards along the pot's rim (wired); pill *Hold on to your answer!* (wired).", "Pip big at the left (h ~500), Momo right (h ~400), Basil centre-right (h ~380).", "A slow drift along the pot that continues under the title.",
   {"a204": "Pip: hides two fingers behind his back with a small hop (an acted moment, sit: keeping his answer secret); Basil: holds up a secret fist (sit); Momo: " + LISTEN + "."},
   "Moth: on the void deck's pillar (as `cold`: the same shot continues, still before the game).", "The caterpillar munches; a leaf drops.", "As the cold open, a touch brighter.", "Garden bed continues; munching."),
 "title": ("2 · Title slam", "WIRED: the scene before, dimmed + **IS IT A NYMPH?** (white) then **THE CATERPILLAR'S SECRET** (sun yellow).", "As `back`, dimmed.", "Holds `back`'s drift.", {}, "As `back`.", "As `back`, dimmed.", "Dimmed to .78.", "Wired: whoosh, two slams."),
 "game": ("3 · The game, and the hidden moth (ONE smooth push-in)", "WIRED (`gameScene`): from the dimmed garden the camera pushes straight in (1.1 s) onto the moth on the void deck's pillar; the iris closes to the black-ringed circle on the blue-violet stage; then the score pill, the YOU hands, *You lock in first*, the buddies, the label *a little moth* and *Can you spot it?* pop out. Pass the drawn garden as `R.world` (now `limePH`) and the moth's spot as `MOTH` (the INTRO spot).",
   "Basil (the finder) big at the right (h ~530); Pip and Momo smaller as gameScene's POS.", "One push-in, then hold; everything pops OVER this shot.",
   {"a301a": "Momo: surprised (paws up) on \"moth\" (reason: a real surprise, the animal is named and shown). Pip, Basil: " + LISTEN + ".",
    "a301b": "Basil talks (talking sprite), then pointing at the walls on \"walls\" (reason: showing a specific place to look). Pip, Momo: " + LISTEN + ".",
    "a301r": "Pip: waving on \"Buddies\" (reason: hello to the viewer, the game starts). Basil, Momo: a nod on \"point\" (no pose: listening)."},
   "Moth: inside the circle (the push-in target: THE INTRO SPOT, never used again). It twitches its feathery feelers and shuffles its wings once (cute: big round eyes, a fuzzy body).", "The moth's feelers twitch.", "Soft dawn light on the pillar's paint.", "Wired: a whoosh on the push-in, a curious pluck on \"moth\"; add a soft wing flutter ON the moth's name; the game groove."),
 "goals": ("4 · Today's goals (Pip reads)", "WIRED (`goals3`): Pip reads **The 4-stage life cycle** (he says \"four\") · **Larva and pupa** · **What prolegs are**; each card lifts and glows.", "Pip big at the left (h ~520).", "Static card screen.",
   {"a401": "Pip talking (reason: he is speaking).", "a402": "Pip: pointing at card 1 after the line (reason: showing the card he read).", "a403": "Pip talking, a small hop, then sit (reason: speaking; no new pose: one swap per 6 s).", "a404": "Pip: a smile and a nod after the last card, NOT cheer (reason: nothing is learnt yet; the cards are only set)."}, "—", "Bokeh drifting.", CARD, "Wired: a soft pop per card."),
 "count": ("4 · The countdown", "WIRED (common.js `SC.count`).", "As wired.", "Static.", {}, "—", "—", CARD, "Wired: drums on three, two, one; a cymbal on Go."),
 "r1card": ("5 · Round card", "WIRED: ROUND 1 · YOUR ANSWER FROM LAST TIME.", "—", "The wired slam.", {}, "—", "—", CARD, "Wired."),
 "r1": ("5 · Round 1: EP16's dare (a short 3 s ring)", "WIRED (`lockN`): EP16's two cards as the ONE set of numbered picture cards (1 *Yes, a nymph* · 2 *No*), the clue labels *long, soft body* · *chews leaves* ON TOP of the ring, the 3 s ring, LOCKED IN!, the picks Basil 1, Pip 2, Momo 2. Draw the ring's picture (replace `ringPH`): the green caterpillar, big, munching its lime leaf.", "The ring big and central (half the frame height); Basil (the lead) big at the side through the countdown; the others join for the reveal.", "The wired small zoom-out as the buddies answer.",
   {"a501": "Basil (the lead): thinking after the question, then worried through the ring (reason: a countdown, before the answer; wired in `lockN`). Pip, Momo: off screen until the picks.",
    "a502": "All: " + LISTEN + ".",
    "a503": "Basil talking (a confident hop on \"One!\": he does not know yet), then pointing at card 1 (reason: showing his pick).",
    "a504": "Pip talking (talking sprite: NOT thinking while he speaks), then pointing at card 2 (reason: showing his pick).",
    "a505": "Momo talking, then pointing at card 2 (reason: showing her pick); then a calm smile (sit) while she waits."},
   "Not in the ring.", "The ring's caterpillar chews and wiggles.", CARD, "Wired: ring ticks speeding up, the bell, LOCKED IN!, a pop per pick."),
 "answer1": ("6 · The answer is two: no, it is not a nymph", "The lime plant: `pair` a picture card of a lime BUTTERFLY (black with cream-yellow patches, a red-and-blue eyespot near each tail end, no tails) slides in low beside the real caterpillar, the two side by side, a big orange ≠ between them. EP16's two cards small along the top (wired): card 2 the green tick at `ansglow`, an x chip on card 1 and by Basil; the coin at `coin1` (the Buddies score too: two of three were right; the score pill shows 1 : 1).", "Pip big at the left (h ~520), Momo big at the right (h ~500), Basil mid-ground centre (h ~380, further back).", "A slow push to the caterpillar-and-butterfly pair, then ease back.",
   {"a601": "At `ansglow`: Pip and Momo arms crossed, a confident smile (reason: OUTCOMES, they were right); Basil oops, paw on his head (reason: OUTCOMES, he was wrong). Only Pip and Momo explained it (in their picks); nobody speaks here but Heart."},
   "Moth: on the bench's backrest (new spot).", "The caterpillar chews; the butterfly card's wings flutter once.", "Early morning sun.", "Garden bed; a sting on the answer, the coin (wired); a soft slide ON `pair`."),
 "lime": ("7 · \"Is it a worm?\" (close on the lime plant)", "Close on the lime plant: the caterpillar crawls slowly along a twig (a ripple of its body). Momo's wrong idea as HER thought bubble (wired `thought`: Stage 2 draws a pink earthworm with a ? on it: an idea, never a fact); it pops away as the look-closer opens.", "Momo big at the left (h ~520) on the pot's rim side; Basil big at the right (h ~480 before SIZE_K); the caterpillar between them.", "A slow push to the caterpillar, then into the look-closer (its own push-in).",
   {"a701m": "Momo talking, then thinking (reason: she has just asked a real question; her worm idea is a guess). Basil, Pip: " + LISTEN + "."},
   "Moth: under a lime leaf at the top of the plant (new spot).", "The caterpillar crawls; a leaf trembles under it.", "Morning sun through the leaves.", "Garden bed low; a soft bubble pop as Momo's thought appears."),
 "lclegs": ("7 · [LOOK CLOSER] The caterpillar's legs (PROLEGS pops)", LCF + " Inside: the caterpillar FILLS the panel, side view, crawling along a lime twig. `front`: push in on the front end: THREE PAIRS of small, pointed, jointed legs light up one pair at a time, label *six legs* (teal, joined by lines to all six). `stumps`: a pan to the back half: the chubby PROLEGS (four pairs in the middle + one pair at the tail end), label *prolegs* (orange, joined by lines). `kw_prolegs`: PROLEGS pops (lib.js o.at). `hooks`: a magnifier circle (joined by a plain line) on one proleg's flat bottom: a ring of TINY HOOKS (label *tiny hooks*, violet). `grip`: the hooks grip the twig and the caterpillar walks along it (a little wave of prolegs, back to front). The book's strip (wired) during the six-legs line. Verdict AN INSECT, NOT A WORM (green) at `v_legs`. Small print *We look, and we do not pick it up.* (wired).",
   "The panel fills the frame; the speaker's face in a lower corner (Pip, then Basil); Momo's face first.", "The push-in from the twig (1 s), a push to the front legs, a pan to the prolegs, a push into the magnifier, ease back for the walk.",
   {"a702": "Momo's face: thinking (reason: her guess is being tested).",
    "a703p": "Pip's face talking, a nod per pair (counting); Momo's face: oops (reason: OUTCOMES, her guess was wrong: a worm has no legs).",
    "a704": "Pip's face: " + LISTEN + ".",
    "a705": "Basil's face: leans in, eyes on the stumps (no pose swap: he cheers at the Mark Sentence 15 s later, so no surprise here).",
    "a706b": "Basil's face talking (teaching; he explains a term, not an answer); a confident smile as the hooks grip."},
   "Not on screen (a look-closer).", "The prolegs ripple as it walks; the twig bends a little.", "Warm morning light, a soft green bounce from the leaves.", "LOOK CLOSER bed low; a soft tick per leg pair ON `front`; a tiny click-click ON `hooks` / `grip`; the key-word chime (wired); the stamp and a chime on the verdict (wired)."),
 "mark1": ("7 · Mark Sentence 1 (Basil): 5.9", "WIRED (`markScene`): Basil says \"Say it with me!\" with an inviting hop, 0.8 s, then reads the card; highlights *Prolegs*, *false legs*, *move*. Under the card: the caterpillar's back half with its prolegs gripping the twig, small (Stage 2).", "Basil big at the left (half the frame), the card large at the right (`../reference/scene_good_ep13_marksentence.webp`).", "Static card screen.",
   {"a707": "Basil: pointing at the viewer (reason: inviting the class to read along).", "a708": "Basil talking (lip-sync), then cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small prolegs grip and let go.", CARD, "Wired: a soft pop on \"Say it with me!\", the chime after the card."),
 "waitw": ("8 · Be a butterfly egg! (the glide in)", "Pill **Be a butterfly egg!**; the camera glides in to a young lime leaf's tip; a soft green wipe. The shelf slides aside (SHELF_HIDE).", "The buddies at the edges wave the viewer off, then shrink (a pop each) and follow.", "One glide (no cut).",
   {"a801": "Pip, Momo, Basil: waving (reason: goodbye as the viewer shrinks), NOT cheer (nothing is learnt yet)."},
   "Moth: on the garden's fence post as the camera passes (new spot).", "Leaves sway; a bee passes.", "Morning sun on the leaves.", "Wonder pad; a whoosh and the shrink sound (wired)."),
 "shrink": ("8 · BE A BUTTERFLY EGG (the journey; first person, present tense)", "`jegg`: YOU are a tiny round pale egg stuck on a lime leaf: the leaf is a huge green field with veins like roads; the *You: a butterfly egg* tag (wired). `jhatch`: the shell cracks open around you (light pours in): you are a tiny caterpillar (your little front legs at the bottom edge of the frame); tag *a caterpillar* (wired). `jmunch`: you bite the leaf's edge (bites appear, the leaf shrinks). `jtight`: the frame's edges squeeze in (*too tight!*, wired); you wriggle out of your old skin (it slides away below). `jbig`: the leaf looks smaller: you are bigger (*speeded up*, wired; *you moult a few times* small). `jhang`: you stop eating; the world turns upside down as you hang from a stem by your tail end (a small silk pad and a thin silk girdle, true for a swallowtail). `jsplit`: your skin splits one last time from the head down. `jpupa`: a hard, smooth, green case closes round the view (soft green and quiet); tag *a pupa* (wired). NO silk cocoon (a butterfly makes none).",
   "The three buddies ride along, shrunk (h ~170), sitting on the next lime leaf at the lower left and right edges (`riders`, wired), never covering the middle.", "The camera IS the egg, then the caterpillar: gentle swaying with the leaf; turning upside down when you hang; never a cut.",
   {"a802": "Riders: Momo surprised as the shell cracks at `jhatch` (reason: a real surprise, you hatch). Pip, Basil: smile and lean in.",
    "a803": "Riders: Basil munches along with you (an acted moment, sit: NOT laughing, the line is not a joke); Pip pushes at the squeezing edge at `jtight` (acted, sit).",
    "a804": "Riders: Pip thinking as you stop eating (reason: a question forms: why stop?).",
    "a805": "Riders: Pip surprised at the hard case at `jpupa` (reason: an unexpected result); Basil and Momo lean in, eyes wide (sit: Momo was surprised at the hatch and cheers at LARVA in a few seconds; Basil cheered at the Mark Sentence)."},
   "Not on screen (a journey).", "The leaf sways; light flickers through the leaves; a raindrop rolls past.", "Green-gold light through the leaf, then soft green inside the case.", "Wonder pad, Heart soft; a tiny crack ON `jhatch`; munching ON `jmunch`; a tight creak ON `jtight`; a soft split ON `jsplit`; a hush ON `jpupa`."),
 "pullout": ("8 · Pull back out", "Whoosh out to the lime plant, normal size: a green pupa hangs from a stem where the caterpillar was (0.6 s).", "The buddies pop back to full size (a hop each).", "One continuous pull back.", {}, "—", "Leaves stir.", "Morning.", "Wired: whoosh out."),
 "larva": ("9 · LARVA: the young that looks nothing like the adult", "The lime plant: the pupa hanging from its stem at the left; at the right a picture card of the caterpillar (*the larva*) with three plain label lines *eats a lot* · *moults many times* · *looks nothing like the adult*. LARVA pops on Heart's term (lib.js o.at). The book's words on a cream strip (wired, >= 3.5 s).", "Momo big at the left (h ~520) beside the caterpillar card; Pip and Basil mid-ground at the right (h ~400 / ~380).", "A push to the caterpillar card as LARVA lands; ease back.",
   {"a901": "Momo: cheer when LARVA lands (reason: a key word is learnt). Pip, Basil: " + LISTEN + ".",
    "a902m": "Momo talking, a paw out to the caterpillar card; pointing after the line (reason: showing the larva).",
    "a903": "Pip, Basil: a nod (listening); Momo: " + LISTEN + "."},
   "Moth: on the watering can by the pot (new spot).", "The pupa sways a little in the breeze.", "Mid-morning.", "Garden bed; the key-word chime (wired); a soft chime on the strip."),
 "holdon": ("10 · HOLD ON! Pip: the pupa is just resting; PUPA", "Model: ../ep16/p1.js `SC.holdon` (or ../ep15/p1.js): the HOLD ON! stamp, the YOU ring 5 s with crossed arms, clue labels ON TOP of the ring, the bell, the coin. `pupastill`: Pip's own board on a low easel by the pot: the pupa drawn with a sleepy *zzz*, titled *JUST RESTING!*. Ring picture: Pip's board. Clue labels *does not move* · *does not eat*. After the bell: the zzz pops away; a small glow appears inside the pupa drawing (a hint of the look-closer). PUPA pops on Heart's term (lib.js o.at).", "Pip big at the left (h ~520) with his easel; during the countdown the ring takes the stage (half the frame) and only Pip stays, big, at the side; Basil big at the right for his fix.", "Push in on the board as Pip reads it; the countdown on the blue stage; back to the board.",
   {"a1001p": "Pip talking, then pointing at his board (reason: showing his idea; he believes it).",
    "a1002": "Pip: thinking on \"not right\", then worried through the ring (reason: a countdown, before the answer; his thinking face stands in for worried, POSE_SUB). Basil, Momo: off screen during the countdown.",
    "a1003": "Pip: oops (reason: OUTCOMES, he was wrong); Basil and Momo: arms crossed, confident (reason: OUTCOMES, they were right).",
    "a1004b": "Basil talking, pointing at the glow in the pupa drawing (reason: showing it); Pip: a nod.",
    "a1005": "Basil: cheer when PUPA lands (reason: a key word is learnt; his fix is right). Pip: a small smile (listening)."},
   "Moth: on top of Pip's easel's frame (new spot); NOT in the ring.", "The easel's paper flutters; the real pupa sways.", "Mid-morning / the blue stage for the countdown.", "The HOLD ON! stamp (wired), ring ticks and bell, the coin (wired); paper rustle ON `pupastill`; the key-word chime."),
 "lcpupa": ("11 · [LOOK CLOSER] Inside the pupa: changing into a butterfly", LCF + " Inside: the pupa FILLS the panel, hanging from its stem (a small silk pad at its tail end, a thin silk girdle; no cocoon). `case`: label *pupal case* (purple, the book-term colour) joined to the hard shell. `window`: a cut-away window opens in the case (a see-through panel with a cream frame, like EP1's robot window): inside, a soft glow. `form`: a simple picture model inside the window: folded WINGS, long FEELERS and thin LEGS slowly take shape (each its own label and colour: *wings* · *feelers* · *legs*), small arrows (*changing*), a *speeded up* tag and a day counter WITHOUT numbers (dots filling). The book's strip (wired) during its line. `dark`: the whole case slowly darkens; black and cream-yellow wing colours show through the thin shell. `split`: the case splits at the top; `out`: the butterfly crawls out and hangs on the empty case, wings crumpled and small; `wings`: the wings slowly pump out flat; `fly`: it flaps once, twice and flies off over the garden. Verdict THE PUPA IS BUSY CHANGING (green) at `v_pupa`. Never 'sleeping' or 'dead'; no 'cells', no 'metamorphosis'.",
   "The panel fills the frame; the speaker's face in a lower corner (Momo, then Basil); Pip's face first.", "The push-in (1 s), a slow push into the window, ease back for the case going dark, a gentle follow as the butterfly comes out.",
   {"a1101": "Pip's face: thinking (reason: is anything happening in there? his own question).",
    "a1102": "Pip's face: a slow nod as the shapes form (listening, learning: no pose swap).",
    "a1103m": "Momo's face talking, a happy smile on \"cake\" (no pose: the line is a picture, not a joke).",
    "a1105": "Momo's face: surprised as the case splits at `split` (reason: a real surprise, the butterfly comes out).",
    "a1106b": "Basil's face talking; laughing on \"bedsheet\" (reason: the line is meant to be funny), then a smile as the wings spread."},
   "Not on screen (a look-closer).", "A soft pulse of light in the window; the wings' pumping.", "Warm green-gold light; the butterfly in the sun at `fly`.", "LOOK CLOSER bed low; a soft heartbeat-like pulse in the window (the picture model); a gentle crackle ON `split`; a soft unfolding rustle ON `wings`; a flutter ON `fly`; the stamp and a chime on the verdict (wired)."),
 "ring": ("12 · The board OUR BUTTERFLY'S LIFE CYCLE (its HOME)", "A cream board on a low stand beside the lime plant's pot, centre-right, about 55% of the frame high (the same in `mark2`, `nyk` and Part 2's recap): curved arrows all running ONE way; four round picture slots: `ltegg` a tiny egg on a lime leaf (*the egg*) · `ltlarva` the caterpillar (*the larva*) · `ltpupa` the green pupa (*the pupa*) · `ltadult` the butterfly (*the adult*); `ltback` the last arrow lights from the butterfly back to the egg, then the arrows run round. NO numbers, no START, no END (5.16). The book's 5.8 on a cream strip (wired).",
   "Basil big at the left (h ~480) beside the board; Pip and Momo mid-ground at the right (h ~400).", "Push in on the board as the tiles land; ease back at `ltback`.",
   {"a1201": "Basil: pointing at each tile as it lands (reason: showing the stage being named). Pip, Momo: " + LISTEN + " (no cheer: Momo cheers at her Mark Sentence seconds later)."},
   "Moth: on the board stand's leg (new spot).", "The arrows glow round; a leaf drifts down.", "Late morning.", "A soft pop per tile ON `ltegg`, `ltlarva`, `ltpupa`, `ltadult`; the arrows' whoosh round ON `ltback`."),
 "mark2": ("12 · Mark Sentence 2 (Momo): 5.6a", "WIRED (`markScene`): Momo, \"Say it with me!\", 0.8 s, reads the card; highlights *four stages*, *young*, *do not look like the adult*. Under the card: the butterfly loop board, small (Stage 2).", "Momo big at the left, the card large at the right.", "Static.",
   {"a1202": "Momo: pointing at the viewer (reason: inviting).", "a1203": "Momo talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small loop's arrows glow round.", CARD, "Wired."),
 "final": ("13 · Score hand", "WIRED (`finalScene`).", "As wired.", "As wired.", {"a1301": "As wired (the buddies clap, smile and nod: the high five is the class's)."}, "—", "—", CARD, "Wired: a sting, a high-five slap."),
 "liz": ("13 · The moth and its fun fact", "WIRED (`lizReveal`: the score hand melts into the garden, ONE push-in, the iris, the ring on \"moth\"; *It was on the side of the lime plant's pot!*; Pip's fun-fact panel (`funFact`) with its pictures on their marks: `ff_cocoon` a moth caterpillar inside a soft white silk cocoon on a twig (cute, cosy), a small cut-away: *a pupa inside*; `ff_silk` a silkworm moth's cocoon beside a silk scarf (label *silk*); *Tell someone at home!*). Small print *We look, and we let it fly away.* (wired).",
   "Pip big at the right of the panel (funFact's own buddy).", "The push-in, then hold.",
   {"a1302": "Basil: pointing at the moth (reason: showing where it was). Momo: " + LISTEN + ".",
    "a1303": "Pip: surprised, then talking (wired; reason: a fun fact is a real surprise).",
    "a1304": "Basil: waving at the viewer (reason: goodbye to this part's game, \"tell someone at home\")."},
   "Moth: on the side of the lime plant's big pot (the REVEAL spot: new; never the intro pillar), its feelers twitching.", "The moth opens and closes its wings once.", "Late morning.", "Wired: a whoosh, a sparkle on \"moth\"; pops for the fun-fact pictures (wired); a soft wing flutter."),
 "kwrecap": ("13 · The key words", "WIRED (`SC.kwrecap`): PROLEGS · LARVA · PUPA (\"Prolegs\" said PRO-legs: ../sg_pron.py).", "As wired.", "As wired.", {}, "—", "—", CARD, "Wired: glows, a sparkle."),
 "cliff": ("14 · The cliffhanger: something wriggling in a pail of rainwater", "The garden's far corner by the tap (Part 2's set: " + CORNER + "): `pail` an old plastic PAIL full of rainwater (a few leaves floating, the surface flat and still); `wrig` tiny thin dark things wriggle down and up in it (simple, not scary), a ? pops (wired). PART 2 slams in (wired). Small print *We look; we do not touch the water.* (wired).",
   "Basil big at the left (h ~480), leaning over the pail; Momo and Pip at the right, leaning in (back views `poses/momo_back.png`, Pip front: never speaking in a back view).", "A push from Basil to the pail's still surface (one move).",
   {"a1401b": "Basil talking; surprised at `wrig` (reason: an unexpected thing in the pail); thinking after his question ends (reason: a real question), at least 3 s later.",
    "a1402": "All: a hopeful smile and a small hop, NO cheer (reason: nothing is learnt yet)."},
   "Not shown (it was revealed).", "Rings spread on the pail's surface; a leaf turns slowly.", "Late morning, soft clouds after rain.", "Drips; a soft plip of water ON `pail`; a low drum (wired); the PART 2 slam (wired)."),
 "nyk": ("15 · \"Now you know!\"", "WIRED (`nykScene`): the butterfly loop board at its home, between the buddies (Stage 2: draw it in place of the card).", "As wired.", "As wired.", {"h1305": "All: cheer (wired; reason: \"Now you know!\": learnt)."}, "—", "—", "The sunburst.", "Wired."),
}
P2 = {
 "lasttime": ("1 · \"Last time...\": a calm recap", "WIRED frame: three pictures, one at a time, centred, large, a gentle push-in, one label each: `pic1` *The caterpillar is a larva* (the caterpillar on its leaf) · `pic2` *The pupa became a butterfly* (the empty pupal case and the butterfly beside it) · `pic3` *Something wriggling in a pail* (the pail of rainwater with a ?). Draw them from Part 1's art.", "No buddies.", "Gentle push-in on each (x1.05 over 4 s).", {}, "—", "Each picture: one small move (the caterpillar chews, the butterfly's wings open, a ring on the pail).", "The stage, calm.", "A soft pop per picture (wired); calm bed."),
 "place": ("2 · The garden's far corner after rain, mid-morning", CORNER[0].upper() + CORNER[1:] + ": wet leaves, a puddle drying on the path, the old PAIL of rainwater by the tap, a flower pot on a little plate holding water, a watering can, a planter bed with BAMBOO STAKES, the bench, the block behind. `rain`: a last drip falls into the pail (a ring spreads). Location pill *A community garden, Singapore · after rain*.", "No buddies yet.", "A slow drift along the planter bed to the pail.", {},
   "Dragonfly: perched on the tip of a bamboo stake in the planter bed (small, red body, four clear wings held flat). BEFORE the game: the push-in goes here, and it is never shown here again.", "Drips from the leaves; rings on the pail; a bird shakes its feathers.", "Bright, washed light after rain; wet shine.", "Drips after rain, a far bus, birds; a plip ON `rain`."),
 "game": ("2 · The game, and the hidden dragonfly (ONE smooth push-in)", "WIRED (`gameScene`): from the garden the camera pushes straight in onto the dragonfly on its stake; the iris; the game's things pop out. Pass the drawn corner as `R.world` (now `cornerPH`) and the dragonfly's spot as `DRAGONFLY` (the INTRO spot). Small print *We look, and we let it fly away.* (wired).", "Basil (the finder) big at the right (h ~520); Pip and Momo smaller.", "One push-in, then hold.",
   {"b201a": "Momo: surprised on \"dragonfly\" (reason: a real surprise, the animal is named and shown).", "b201b": "Basil talking, then pointing at a stake on \"sticks\" (reason: showing where to look).", "b201c": "Pip: waving (reason: hello, the game starts); a nod from the others on \"point\"."},
   "Dragonfly: inside the circle (THE INTRO SPOT). It tilts its big round head (huge shiny eyes); its wings shimmer.", "The dragonfly's wings shimmer.", "Sunny after rain.", "Wired: whoosh, curious pluck; a soft wing buzz ON \"dragonfly\"; the game groove."),
 "goals": ("3 · Today's goals (Basil reads)", "WIRED (`goals3`): **The mosquito's life cycle** · **Mosquitoes and dengue** · **Why we tip out still water**.", "Basil big at the left (h ~480).", "Static.",
   {"b301": "Basil talking.", "b302": "Basil: pointing at card 1 (reason: showing the card he read).", "b303": "Basil talking, a hop, then sit (one swap per 6 s).", "b304": "Basil: a smile and a nod, NOT cheer (reason: nothing learnt yet)."}, "—", "Bokeh.", CARD, "Wired."),
 "r1card": ("4 · Round card", "WIRED: ROUND 1.", "—", "Wired.", {}, "—", "—", CARD, "Wired."),
 "r1": ("4 · Round 1: what comes after the wriggler?", "WIRED (`lockN`) with THREE big numbered picture cards: 1 *An egg* (a tiny egg) · 2 *A pupa* (a comma-shaped mosquito pupa) · 3 *An adult* (a mosquito, drawn small and not scary); Stage 2 draws each card's picture (the difference obvious at a glance). The ring's picture (replace `ringPH`): the pail's surface with three wrigglers hanging from it, big; clue labels *young mosquitoes* · *in still water* ON TOP of the ring (wired). Picks Momo 3, Basil 2, Pip 2.", "The ring central; Basil (the lead) big at the side through the countdown; the others join for the reveal.", "The wired zoom-out as the buddies answer.",
   {"b401": "Basil (the lead): thinking after the question, then worried through the ring (reason: a countdown before the answer; only Basil has a painted worried face).", "b402": "All: " + LISTEN + ".",
    "b403": "Momo talking (a happy hop on \"fly away\": her pick; she does not know yet), then pointing at card 3 (reason: showing her pick).", "b404": "Basil talking (NOT thinking while he speaks), then pointing at card 2 (reason: showing his pick).", "b405": "Pip talking, then pointing at card 2 (reason: showing his pick)."},
   "Not in the ring.", "The ring's wrigglers twitch at the surface.", CARD, "Wired: ticks, bell, LOCKED IN!, a pop per pick."),
 "lcwriggler": ("5 · [LOOK CLOSER] The wrigglers (WRIGGLER pops)", LCF + " Inside: a cut-away side view of the pail's water FILLS the panel (the surface a bright line near the top). `hang`: three WRIGGLERS hang head-down from just under the surface (thin, segmented, a bigger head end, little bristles; the tail end touching the surface), label *the water's surface*. `tube`: a magnifier (joined by a line) on one tail end: a little TUBE poking up through the surface (label *a little tube*; a tiny air bubble above it). `dive` (no line now: section 6 cut `shadow`): a soft shadow passes over the water and the wrigglers jerk down in S-shaped wriggles; `up`: they wriggle back up and hang again. `kw_wriggler`: WRIGGLER pops (lib.js o.at). Verdict THE LARVA: A WRIGGLER (green) at `v_wriggler`. Small print *We look; we do not touch the water.* (wired).",
   "The panel fills the frame; the speaker's face in a lower corner (Pip, then Basil); Momo's face first.", "The push-in (1 s), a push to the tube, ease back for the dive.",
   {"b501": "Momo's face: thinking (reason: her pick (straight to the adult) is being tested).", "b502p": "Pip's face talking, then pointing at the tube (reason: showing it).",
    "b505": "Basil's face: eyes wide, then a big smile as WRIGGLER lands (no separate cheer: his wriggle in the next line is the celebration).", "b506b": "Basil's face talking; laughing as he wriggles on \"like this!\" (reason: the line is meant to be funny)."},
   "Not on screen (a look-closer).", "The wrigglers bob; a speck drifts past.", "Cool green-blue water light, the bright surface above.", "LOOK CLOSER bed; still-water hush; a tiny plink ON `hang` and `up`; a soft swish ON `dive`; the key-word chime; the stamp on the verdict (wired)."),
 "waitw": ("6 · Be a mosquito egg! (the glide in)", "Pill **Be a mosquito egg!**; the camera glides down to the pail's still surface; a soft blue wipe. The shelf slides aside.", "The buddies wave, then shrink (a pop each) and follow.", "One glide down.",
   {"b601": "All three: waving (reason: goodbye as the viewer shrinks)."},
   "Dragonfly: on the pail's rim as the camera passes (new spot).", "Rings on the water.", "Mid-morning.", "Wonder pad; whoosh; the shrink sound (wired)."),
 "shrink": ("6 · BE A MOSQUITO EGG (the journey; first person, present tense)", "`jegg`: YOU are a tiny dark egg on the flat, still surface; the water is a huge shining floor, the pail's wall a cliff; the *You: a mosquito egg* tag (wired). `jhatch`: you slip out underneath; tag *a wriggler* (wired): you hang head-down under the surface (the bright surface above the frame's top edge, your own tail end poking up at the top). `jeat`: tiny bits drift past and you eat them (little dots disappear). `jbig`: a tight squeeze, a moult (an old skin drifts away below), you are bigger (*speeded up*, wired). `jpupa`: you curl up: the view rounds like a comma; tag *a pupa* (wired); you tumble gently (you can still move, but you do not eat). `jsplit`: at the surface your case splits along the back; light pours in. `jfly`: you climb out onto the surface, your new wings dry and unfold at the edges of the frame; tag *an adult* (wired). Never scary; no biting.",
   "Riders: the three buddies, shrunk (h ~170), on a floating leaf at the lower left and right edges (`riders`), bobbing gently.", "The camera IS the egg, then the wriggler: a gentle bob at the surface; never a cut.",
   {"b602": "Riders: Momo surprised as you hatch at `jhatch` (reason: an unexpected change).", "b603": "Riders: Pip pointing at the drifting old skin at `jbig` (reason: showing the moult).",
    "b604": "Riders: Momo thinking as you curl up (reason: she wonders: is this the answer to Round 1?).", "b605": "Riders: Pip surprised at the wings at `jfly` (reason: an unexpected result). Basil, Momo: smile and lean in (Basil laughed seconds ago; Momo was surprised at the hatch)."},
   "Not on screen (a journey).", "Specks drift; the surface shimmers above; the leaf raft bobs.", "Blue-green under the surface, then bright air.", "Wonder pad, Heart soft; a tiny pop ON `jhatch`; underwater hush; tiny nibbles ON `jeat`; a soft split ON `jsplit`; a thin soft whine of new wings ON `jfly` (never scary)."),
 "pullout": ("6 · Pull back out", "Whoosh back out to the garden's corner, normal size (0.6 s): the pail, wrigglers and two comma-shaped pupae at the surface.", "The buddies pop back (a hop each).", "One pull back.", {}, "—", "Rings on the pail.", "Mid-morning.", "Wired: whoosh out."),
 "mosqans": ("7 · The answer is two: the pupa", "The pail at its spot: the wrigglers and two comma-shaped pupae at the surface. The three numbered cards small along the top (wired): card 2 glows (`ansglow`), an x chip on card 3 and by Momo; the coin (`coin1`; the Buddies also score: two of three were right; the score pill shows 1 : 1).", "Pip big at the right (h ~520), Basil big at the left (h ~480), Momo mid-ground right (h ~380).", "Gentle push to card 2, then to a pupa at the surface, back.",
   {"b701": "At `ansglow`: Basil and Pip arms crossed, confident (reason: OUTCOMES, right); Momo oops (reason: OUTCOMES, wrong: she forgot the pupa). Only Basil and Pip explained it (in their picks)."},
   "Dragonfly: on the garden tap (new spot).", "A pupa tumbles once at the surface.", "Mid-morning.", "Wired: a sting, the coin."),
 "mark1": ("7 · Mark Sentence 1 (Pip): 5.11, second half", "WIRED (`markScene`): Pip, \"Say it with me!\", 0.8 s, reads the card; highlights *four stages*, *egg*, *larva*, *pupa*, *adult*. Under the card: a small mosquito loop (eggs on still water · a wriggler · a pupa · an adult, curved arrows, no numbers) beside Part 1's butterfly loop, small (Stage 2).", "Pip big at the left, the card large at the right.", "Static.",
   {"b705": "Pip: pointing at the viewer (reason: inviting).", "b706": "Pip talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small loops' arrows glow round.", CARD, "Wired."),
 "showcard": ("8 · Showdown card", "WIRED.", "—", "Wired.", {}, "—", "—", CARD, "Wired."),
 "show": ("8 · Showdown: Basil's homework on the mosquito", "Model: ../ep16/p2.js `SC.show` (or ../ep15/p2.js). Basil's homework sheet on an easel by the bench, LARGE: three ruled lines, each with a small cute drawing: 1 *It has four stages.* (a small four-tile loop) · 2 *Its larva is a wriggler.* (a wriggler) · 3 *All mosquitoes spread dengue.* (a row of five small mosquitoes, each with a red warning badge). The lines light as Basil reads them (`l1`, `l2`, `l3`). The YOU ring takes the stage (5 s) with the three line numbers as the ONE set of numbered choice cards. LOCKED IN!; Pip reveals. Mosquitoes small, simple and never scary.", "Basil big at the left with his easel (h ~480); during the countdown the ring is central, only Basil at the side.", "Push in on the easel as he reads; the countdown on the blue stage.",
   {"b801": "Basil: pointing at his homework, proud (reason: showing his work; NOT waving: waving is only hello and goodbye).",
    "b802b": "Basil talking, pointing at each line as it lights (reason: showing the line he reads); then worried through the ring (reason: a countdown before the answer).",
    "b803": "Basil: worried until the stamp, then sit (wired lead pose).",
    "b804p": "Pip talking, then arms crossed after his line; Momo arms crossed (reason: OUTCOMES, both right); Basil oops (reason: OUTCOMES, wrong: his homework)."},
   "Dragonfly: on the easel's top (new spot); NOT in the ring or the countdown.", "The sheet flutters.", "Mid-morning / the blue stage.", "Paper rustle; ring ticks, bell, LOCKED IN! (wired)."),
 "fix": ("8 · The fix (the book's 5.10a on a strip); DENGUE", "`strike`: line 3 struck through; `rewrite`: rewritten in green *Most mosquitoes do not spread diseases, but some do.*, and its drawing changes: only one of the five mosquitoes keeps a small badge. Heart reads the cream strip (wired; the two names in italics; the names spoken from ../sg_pron.py). DENGUE pops on Heart's term (lib.js o.at). Momo's line: a calm picture beside her, a child in bed with a thermometer (cared for), and a mosquito with a ? on its badge (*only some carry it*). The coin +2 (`coin2`).", "Basil big at the left by his easel; Pip and Momo at the right.", "Push in on line 3, ease to the strip, back.",
   {"b806": "Pip, Momo: a nod; Momo: cheer when DENGUE lands (reason: a key word is learnt).",
    "b807m": "Momo talking, a paw on the thermometer picture; pointing after the line (reason: showing who carries it).",
    "b808": "Basil: a nod and a smile at the green rewrite (his mistake fixed: a smile, not a cheer; he cheers at Mark Sentence 2 within the minute)."},
   "Dragonfly: on the bench's armrest (new spot).", "The rewrite's ink dries with a little shine.", "Mid-morning.", "A strike scratch ON `strike`; a soft green chime ON `rewrite`; the key-word chime; the coin (wired)."),
 "plate": ("9 · \"How does the life cycle keep us safe?\" (an HDB corridor)", "**The HDB corridor** outside a flat on a high floor, late morning (draw new: `corridor17.js`): potted plants along the railing, each on a little plate; a vase of flowers by the door; a pail upside down; the estate and sky beyond the railing; a neighbour's shoes at the next door; a shoe rack, a gate grille. Location pill *An HDB corridor, Singapore*. Pip's wrong idea as HIS thought bubble (wired `thought`: a tiny plate with a crossed-out mosquito and a ?).", "Momo big at the left (h ~500), Pip big at the right (h ~500) by the potted plants; Basil mid-ground centre (h ~380).", "A move from Momo to Pip (ease, no cut), then the push into the plate.",
   {"b901m": "Momo talking, then thinking (reason: she has asked a real question).", "b902p": "Pip talking, then pointing at the plate (reason: showing it); a confident smile (his idea; nobody knows yet that it is wrong)."},
   "Dragonfly: on the corridor railing (new spot).", "A fan turns in a window; a curtain stirs; a far lift.", "Late morning, bright sky beyond the railing, the corridor in soft shade.", "The HDB corridor: a fan from a flat, a far lift ding, a neighbour's radio low; a bubble pop as Pip's thought appears."),
 "lcplate": ("9 · [LOOK CLOSER] The flower-pot plate (STAGNANT WATER pops)", LCF + " Inside: the flower-pot PLATE fills the panel, close: a thin layer of still water with a few fallen leaves. `water`: label *still water* (blue). `wrigglers` (on \"days\"): a magnifier (joined by a line) into the water: tiny wrigglers hanging at the surface. `kw_stagnant_water`: STAGNANT WATER pops (lib.js o.at). Then the why as a picture model on the right half: the mosquito loop (four tiles, no numbers) with a small water-drop icon beside the egg tile (*needs still water*). `tip`: an ADULT's hand (four fingers and a thumb) tips the plate out into the drain (a splash); `dim`: the loop's tiles go dim one by one (the egg, the wriggler, the pupa, the adult, each with a small *no ...* tag). Then three small life pictures pop along the bottom: a plate tipped out, `pail2` a pail turned over, `vase` a vase with fresh water. Verdict NO STILL WATER, NO NEW MOSQUITOES (green) at `v_plate`. Small print *Ask an adult to help.* (wired).",
   "The panel fills the frame; the speaker's face in a lower corner (Basil, then Momo); Pip's face first.", "The push-in (1 s), a push into the magnifier, ease right for the loop.",
   {"b903": "Pip's face: thinking as the magnifier opens (reason: his guess is being tested), then oops at `wrigglers` (reason: OUTCOMES, he was wrong: wrigglers in a tiny plate).",
    "b904": "Basil's face: surprised at the wrigglers in so little water (reason: a real surprise).",
    "b905b": "Basil's face talking, teaching, a confident smile (STAGNANT WATER is cheered once, at Mark Sentence 2).",
    "b906": "Basil's face: a slow nod as the tiles go dim (listening, learning).",
    "b907m": "Momo's face talking, then pointing at each life picture (reason: showing it)."},
   "Not on screen (a look-closer).", "Leaves turn slowly on the still water; the wrigglers bob.", "Soft corridor shade, a glint on the water.", "LOOK CLOSER bed; still-water hush; a soft splash ON `tip`; a soft 'off' tone per dimming tile from `dim`; the key-word chime; the stamp on the verdict (wired)."),
 "mark2": ("9 · Mark Sentence 2 (Basil): p. 89", "WIRED (`markScene`): Basil, \"Say it with me!\", 0.8 s, reads the card; highlights *reduce*, *removing their breeding spots*, *schools and homes*. Under the card: the three life pictures (plate tipped out, pail turned over, fresh vase), small (Stage 2).", "Basil big at the left, the card large at the right.", "Static.",
   {"b908": "Basil: pointing at the viewer (reason: inviting).", "b909": "Basil talking; cheer after the last word (reason: a book sentence is learnt)."}, "—", "The small pictures pulse once each.", CARD, "Wired."),
 "chant": ("10 · The chant", "WIRED (`chantScene`): \"Say it with us!\" + 0.8 s; three lines with YOUR TURN!: *Egg, larva, pupa, adult! Four stages!* · *The pupa does not eat! It changes inside!* · *Still water? Tip it out!* (common.js `PHR`). Draw the board at the right: the butterfly loop and the mosquito loop (four tiles each, curved arrows, no numbers) and a tipped plate; flash per line (`flash`: line 1 all four tiles of both loops; line 2 both pupae; line 3 the tipped plate).", "The three buddies left to centre (as wired), the board at the right.", "Static, a small bounce on the stomps.", {"c1003": "All three chant (talking tracks, wired); a small bounce on the stomps; no strong pose."}, "—", "The board's tiles flash on their line.", CARD, "Wired: clap-clap-stomp, YOUR TURN!."),
 "final": ("11 · Score hand", "WIRED (`finalScene`).", "As wired.", "As wired.", {"b1101": "As wired (the buddies clap, smile and nod)."}, "—", "—", CARD, "Wired: a sting, a slap."),
 "liz": ("11 · The dragonfly and its fun fact", "WIRED (`lizReveal` + Momo's `funFact` panel): the score hand melts into the garden's corner, ONE push-in onto the dragonfly on the watering can's handle, the iris, the ring on \"dragonfly\"; *It was on the handle of the watering can!*; the panel's pictures on their marks: `ff_nymph` a dragonfly nymph underwater among pond weeds (cute: big eyes, six legs, no wings); `ff_gobble` the nymph snapping up a wriggler (a quick cartoon gulp, not scary). *Tell someone at home!*. Small print *We look, and we let it fly away.* (wired).",
   "Momo big at the right of the panel (funFact's own buddy).", "The push-in, then hold.",
   {"b1102": "Pip: pointing at the dragonfly (reason: showing where it was).", "b1103m": "Momo: surprised, then talking (reason: a fun fact is a real surprise).", "b1104": "Pip: waving at the viewer (reason: goodbye)."},
   "Dragonfly: on the handle of the watering can (the REVEAL spot: new; never the intro stake), wings shimmering.", "The dragonfly's wings shimmer; it lifts off at the end.", "Late morning.", "Wired: a whoosh, a sparkle; pops for the pictures; a soft wing buzz."),
 "dare": ("12 · The dare for Episode 18", "Model: ../ep16/p2.js `SC.dare`. The VOID DECK beside the garden (its square pillars, a stone table and stools, letterboxes behind): the frog loop (EP16) and a mosquito loop on two small boards side by side on the stone table. `dareIn`: ONE set of TWO big numbered picture cards slides in low (wired as plain cards): 1 *Yes, the same* (the two loops with a big =) · 2 *No, different* (the two loops with a big ≠); the banner *NEXT · Frog and mosquito: the same life cycle?*, *Lock in your answer!*.", "Basil big at the left (h ~480); Momo and Pip at the right.", "A push from the two loops to the cards.",
   {"b1401": "Momo and Pip: thinking (reason: a question has just been asked; no hints). Basil: a big hopeful smile (sit: no hint)."},
   "Not shown (revealed).", "A ceiling fan turns in the void deck; a pigeon walks past.", "Shade of the void deck, bright garden beyond.", "Void deck: a ceiling fan's hum, far footsteps; two slides (wired); a sting on \"Lock in your answer!\" (wired)."),
 "kwrecap": ("13 · The key words", "WIRED (`SC.kwrecap`): WRIGGLER · DENGUE · STAGNANT WATER.", "As wired.", "As wired.", {}, "—", "—", CARD, "Wired: glows, a sparkle."),
 "nyk": ("14 · \"Now you know!\"", "WIRED (`nykScene`): the butterfly and mosquito loops between the buddies (Stage 2: draw them in place of the card).", "As wired.", "As wired.", {"h1305": "All: cheer (wired; reason: learnt)."}, "—", "—", "The sunburst.", "Wired."),
}
HDR = """# EP17 · SCENES TO DRAW (Stage 2) · big buddies in the scene, teaching

Generated by `python3 make_todo.py` from `tl_p1.json` / `tl_p2.json` (the real timeline, voices recorded 23 Nov) and the staging in
`make_todo.py`. Words: `../p3_ep17_script.md` and `script.py` (the source of every line).

## Read first: the standing rules (all from `../SERIES_FORMAT.md`; EP15 / EP16's `SCENES_TODO.md` rules apply unchanged)

1. **No aura discs; buddies IN the scene, BIG** (1d): contact shadow, the scene's light on them; the speaker 45-55% of the frame height,
   every other buddy on screen at least h 330; balanced layouts (speaker one side, the others the other side, the prop between).
2. **The buddies stay in proportion** (5, 23 Nov): lib.js `SIZE_K` basil **.94** (as EP15 / EP16's v2 cast; the script's "x0.88" is the
   rulebook's older figure); same depth = same size, further back = smaller, nobody more than ~15% bigger than another at the same depth.
   The heights below are BEFORE SIZE_K.
3. **The camera frames whoever talks and pushes in on what is named**, then eases back; never a jump cut inside a place.
4. **Talking = a moving mouth**: a speaking buddy is ALWAYS in its talking sprite (lip-sync, blinks) and pops back to its pose after the line.
5. **Every reaction has a reason, or it goes numb** (5, 23 Nov). ONE job per pose; most of the time the buddies just listen. Each pose below
   names its reason; a pose with no reason is replaced by listening. Strong poses (cheer, surprised, laughing, worried) about once a minute
   per buddy at most (the journeys and look-closers spread them over different buddies).

   | Pose | Only when |
   |---|---|
   | talking sprite | the buddy is speaking |
   | smile / nod (sit) | listening; the default |
   | thinking | a question has just been asked, before the answer |
   | worried | during a countdown or a guess, before the answer is revealed (Pip and Momo: their thinking face stands in, lib.js POSE_SUB) |
   | oops (shy) | this buddy just got it wrong |
   | arms crossed (confident) | this buddy just got it right |
   | surprised | a real surprise: a fun fact, an unexpected result |
   | cheer (hands up) | something is learnt or achieved: a key word lands, a mistake is fixed, "Now you know!" (lib.js `learnAt`) |
   | laughing | a line that is meant to be funny (Basil has a painting; Momo / Pip: none, use sit) |
   | pointing | showing a specific thing on screen |
   | waving | hello and goodbye only |
6. **Reactions follow the answer** (lib.js `OUTCOMES`, set for EP17): Part 1 Round 1 Pip, Momo right / Basil wrong (at `ansglow`); the
   look-closer guess Momo wrong (a worm) at a703p; HOLD ON! Basil, Momo right / Pip wrong (at a1003). Part 2 Round 1 Basil, Pip right /
   Momo wrong (at `ansglow`); Showdown Pip, Momo right / Basil wrong (at b804p); the look-closer guess Pip wrong (too little water) at the
   mark `wrigglers` (b903). Only a buddy who got it right explains the right answer (the script already does).
7. **Look-closers**: the thing fills the panel, each named part its own push-in and big label, one buddy FACE in a lower corner reacting;
   one verdict at its `v_*` mark held 2.5 s. **Countdowns take the stage** (ring half the frame, clue labels >= 40 px on top of the ring,
   blue stage, one big buddy). **ONE set of big numbered picture cards** per lock-in (Part 1's Round 1 and the dare have TWO; Part 2's
   Round 1 THREE).
8. **The hidden animal moves** (4, 23 Nov): a new fair spot in EVERY scene (listed per scene below), never back at the spot where the game's
   push-in introduced it (Part 1: the void deck's pillar; Part 2: the tip of a bamboo stake), never twice in one spot; the reveal is at a NEW
   spot and Heart's reveal line names THAT spot (Part 1 a1302: *the side of the lime plant's pot*; Part 2 b1102: *the handle of the watering
   can*: checked at Stage 1). Not on screen in a look-closer, a journey or a countdown. Part 1 spots in order: void deck pillar (cold, back,
   title, game) · bench backrest · under a lime leaf at the top · fence post · watering can by the pot · top of Pip's easel · the board
   stand's leg · REVEAL the side of the lime plant's pot. Part 2: bamboo stake tip (place, game) · the pail's rim · the garden tap · the top
   of Basil's easel · the bench's armrest · the corridor railing · REVEAL the watering can's handle (a different can, in the far corner).
9. **The journeys bring company**: a *You: a ...* tag (wired) and the viewer's own body at the frame's edge (little front legs; a tail end
   poking up; new wings), the three buddies shrunk riding along (`riders`), reacting at each stop, never covering the view.
10. **Real animals, cute AND alive, true shapes** (script section 3, Realism): the lime butterfly's egg tiny, round, pale yellow, alone on
   a young leaf's tip; the caterpillar three pairs of small pointed true legs at the front, prolegs on the back half (four middle pairs +
   one tail pair), the late lime caterpillar green with a pale band; the pupa green and smooth, hanging by a silk pad with a thin girdle
   (NO cocoon), darkening before the butterfly comes out; the adult lime butterfly black with cream-yellow patches, a red-and-blue eyespot
   near each tail end, no tails, crumpled wings that pump flat; the wriggler hangs head-down, a tube at its tail end at the surface; the
   mosquito pupa comma-shaped, tumbling; the adult mosquito small, simple, never scary or biting; stagnant water flat with fallen leaves;
   the moth brown-grey, wings like a triangle, feathery feelers; the dragonfly red, four clear wings held flat, huge eyes; its nymph
   underwater, six legs, no wings. Loops never have numbers, a START or an END (5.16). No "cells", no "metamorphosis".
11. **Things never float**; the easels and the loop boards stand on the ground; the pail and the plates sit on the ground / corridor floor;
   every picture labelled; every tag joined to what it describes; labels inside the frame; nothing in the bottom fifth at the end.
12. **Every place sounds alive** (9): sound_cues.js is a GENERIC Stage 1 plan (rituals and beds); add each place's ambience and the foley ON
   the marks (the Sound line of each scene below). song.js's garden bed says "no hens" (EP15): right for EP17 too.

### Changed from the script's tables (Stage 1, to keep one job per pose)
- `r1` (both parts): a buddy who is SPEAKING is in the talking sprite, never "thinking" (the script had Pip / Basil thinking mid-line).
- Part 1 `lclegs`: Basil's face no longer "surprised" at the stumps (he cheers at Mark Sentence 1 fifteen seconds later).
- Part 1 `shrink`: Basil munches along (acted, not laughing: Heart's line is not a joke); Pip (not all three) surprised at the hard case.
- Part 1 `liz`: Basil points at the moth only (Pip's fun fact is the surprise).
- Part 2 `show`: Basil points at his homework (the script said "waving": waving is only hello and goodbye).
- Part 2 `shrink`: only Pip surprised at the wings (not all three).

### The places: real Singapore places, visited from dawn to late morning
- **The community garden beside an HDB block** (EP15 / EP16's garden, so the story carries on). Borrow from ../ep15/garden15.js
  (`BG.garden15`, `VG15`) and ../ep16's garden sets once drawn (`pond16.js` / `art16.js`: the lime plant in its pot is EP16's dare spot)
  rather than drawing from zero; put EP17's sets in new files (e.g. `lime17.js`, `corner17.js`, `corridor17.js`) loaded after
  ep16dare.js in page.html; main.js already calls `XDEFS17()` if it exists.
  - **The lime-plant side** (Part 1: cold, back, answer1, lime, larva, holdon, ring, liz): the lime plant in its big glazed pot at the
    garden's edge, a watering can by the pot, the bench, a fence post, the void deck behind (square pillars, letterboxes, a notice board).
  - **The far corner by the tap** (Part 1: cliff; Part 2: place, mosqans, show, fix, liz): the tap on its pipe, the old pail of rainwater,
    a flower pot on its plate, a watering can, a planter bed with bamboo stakes, the bench; after rain in Part 2.
  - **The void deck** (Part 2: dare): a stone table and stools, a ceiling fan, letterboxes.
- **An HDB corridor** on a high floor of the same block (Part 2: plate, lcplate's setting): potted plants on plates along the railing, a vase
  by the door, a pail turned over, a gate grille, shoes, the estate and sky beyond.

### Homes of recurring props
- **EP16's two dare cards** (`ep16dare.js`; copy EP16's card art in): along the pot's rim (cold, back), the pictures of Round 1's cards,
  small along the top in `answer1`.
- **The loop board OUR BUTTERFLY'S LIFE CYCLE**: centre-right beside the lime plant's pot, about 55% high (ring, mark2's small picture,
  nyk; Part 2's recap and chant board, beside the mosquito loop).
- **Pip's easel** (Part 1 holdon: JUST RESTING!) by the pot; **Basil's easel** (Part 2 show, fix: his mosquito homework) by the bench.
- **The pail of rainwater** by the tap: cliff (P1), lasttime pic3, place, lcwriggler, waitw, mosqans (P2); always the same pail and spot.

### How the engine is set up
- Copied from `../ep16/` (its live engine; EP16 copied EP15's v2-cast lib.js: SIZE_K basil .94, POSE_SUB worried -> thinking for Pip and
  Momo, the one-job-per-pose routines): lib.js, common.js (`gameScene`, `lizReveal`, `funFact`, `riders`, `chantScene`, `markScene`,
  `goals3`, `lockN`, `finalScene`, `nykScene`, `thought`), closer.js (`lookCloser`, `lcStrip`), shrink.js (`youTag`, `feelTag`), song.js,
  render.js, finish.sh, bake.js. EP16's scene art (art16.js, pond16.js, garden15.js, home15.js, its p1/p2, tests.js, ep15dare.js) is NOT copied.
- `ep16dare.js`: EP16's two dare cards (stub until EP16's art exists). `tests.js`: EP17 data and placeholders (`HIDDEN`, `MOTH` / `MOTH_R`,
  `DRAGONFLY` / `DRAGONFLY_R` (intro / reveal spots), `limePH`, `cornerPH`, `lcPH`, `ringPH`, `smallPrint` + the five small-print rules,
  the part colours `LEGC` / `PROLEGC` / `HOOKC` / `CASEC`, `ffPH` / `FF`).
- lib.js: EP17 `KW` (Part 1 PROLEGS, LARVA, PUPA; Part 2 WRIGGLER, DENGUE, STAGNANT WATER, all `o.at`), `KWLINE`, `SHELF_HIDE`
  (+ lclegs, lcpupa, lcwriggler, lcplate), `OUTCOMES`, `learnAt` (kw_*, v_*, ltback, rewrite, jpupa, jfly). common.js: the chant `PHR`.
- Scores (p1.js / p2.js `SCORE`): Part 1 Round 1 1 : 1, HOLD ON! 2 : 1; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- finish.sh's contact-sheet marks and compare_ep1.py's scenes already point at EP17.
- Build: `./build_part.sh 1|2` (timeline, cues, song, render in 10 s chunks under the shared lock, finish.sh).
"""
def block(name, sc, S, L, marks):
    title, draw, frame, cam, poses, hid, life, light, snd = sc[name]
    out = [f"### {fm(S['t0'])} – {fm(S['t1'])} · `{name}` · {title} ({S['t1'] - S['t0']:.1f} s)", "",
           f"- **Draw:** {draw}", f"- **Frame (who, where, how big; the main prop):** {frame}", f"- **Camera:** {cam}"]
    ids = [i for i in L["order"] if L["lines"][i].get("scene") == name or (L["lines"][i]["who"] == "chant" and S["t0"] <= L["lines"][i]["t"] < S["t1"])]
    if "*" in poses or ids:
        out.append("- **Poses per line (each with its reason):**")
        if "*" in poses: out.append(f"  - (whole scene): {poses['*']}")
        for i in ids:
            if i in poses: out.append(f"  - `{i}`: {poses[i]}")
            elif L["lines"][i]["who"] in ("pip", "basil", "momo"): out.append(f"  - `{i}`: the speaker talks (talking sprite); listeners: {LISTEN}.")
            else: out.append(f"  - `{i}`: listeners: {LISTEN} (the automatic reaction in lib.js reactPose only where the line asks a question or names a problem).")
    out += [f"- **Hidden animal:** {hid}", f"- **Life:** {life}", f"- **Light:** {light}", f"- **Sound (ambience and foley, on the marks):** {snd}"]
    mk = [f"`{k}` {fm(v)}" for k, v in sorted(marks.items(), key=lambda x: x[1]) if S["t0"] <= v < S["t1"]]
    if mk: out.append("- **Marks:** " + ", ".join(mk))
    if ids:
        out.append("- **Lines:**")
        for i in ids:
            x = L["lines"][i]; out.append(f"  - `{i}` {fm(x['t'])} {x['who'].upper()}: {x['text']}")
    return "\n".join(out) + "\n"
TITLES = {1: "Is a Caterpillar a NYMPH? The Butterfly's Secret Stage", 2: "What's WRIGGLING in This Pail of Rainwater?"}
doc = [HDR]
for part, sc in ((1, P1), (2, P2)):
    L = json.load(open(f"{H}/tl_p{part}.json")); doc.append(f"\n## Part {part} · \"{TITLES[part]}\" · {fm(L['END'])}\n")
    for S in L["scenes"]:
        if S["name"] not in sc: doc.append(f"### {fm(S['t0'])} · `{S['name']}` · (no staging written: add it)\n"); continue
        doc.append(block(S["name"], sc, S, L, L["marks"]))
open(f"{H}/SCENES_TODO.md", "w").write("\n".join(doc)); print("SCENES_TODO.md", sum(len(x) for x in doc), "chars")
