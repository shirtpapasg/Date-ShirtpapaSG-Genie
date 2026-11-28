"""make_todo.py: tl_p1.json + tl_p2.json + the staging below -> SCENES_TODO.md (the artist's list for Stage 2 of EP18).
  python3 make_todo.py      Re-run after any timeline change, so the times in the list are always the timeline's.
Each scene: what to draw, the frame (who stands where, how big, the main prop), the camera, a pose for every line WITH ITS REASON (the
one-job-per-pose table, SERIES_FORMAT 5, 23 Nov: few strong poses, listening is the default; a pose with no reason is replaced by
listening), where the hidden animal is (a new spot in every scene, never the intro spot again, never twice in one spot), the small life in
the background, the light, the place's ambience and foley ON the marks, the marks (from the timeline) and the lines with their times."""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
fm = lambda t: f"{int(t // 60)}:{t % 60:04.1f}"
DECK = "our block's void deck on LIFE CYCLE DAY (`VD(t, o)`; bake the static parts as `BG.deck18`)"
EDGE = "the community garden's edge by the void deck (`VGE(t, o)`; bake as `BG.edge18`)"
CARD = "A card screen (EP1's stage): keep the stage's warm spotlight and the soft bokeh drifting."
LCF = "WIRED: `lcPH` (tests.js) inside the real `lookCloser` frame (closer.js). Stage 2 replaces `lcPH` with `lookCloser(t, s, { tz, fx, fy, art, set, verdict, tv, over })` and draws `art(t)` (centred on 0, 0 inside +-830 x +-395; keep the bottom 80 px for the verdict), keeping the wired `over` chips. The thing FILLS the panel; each named part gets its own push-in and a big label; the speaking buddy's FACE peeks in from a lower corner (closer.js `lcPeekAuto`, wired: it listens; a pose only through `peekEv` with the reason below). Models: ../ep16 `lcchick` (two halves side by side), ../ep15/garden15.js `adultArt`, ep13 straps (`../reference/lookcloser_good_ep13_straps.webp`)."
LISTEN = "listening (smile, blinks, a small nod): nothing in the line asks for a pose"
# name: (title, draw, frame, camera, poses {line id or "*": "pose: who does what (reason: ...)"}, hidden, life, light, sound)
P1 = {
 "cold": ("1 · Silent cold open: LIFE CYCLE DAY at the void deck (no voice)",
   "Our block's VOID DECK on a Saturday morning beside the community garden: square pillars, stone tables and round stools, the letterboxes on the back wall, a ceiling fan turning, a notice board; just outside, the RAIN TREE and, beyond it, EP15 to EP17's garden (the pond, the lime plant, the planter beds). The buddies' **LIFE CYCLE DAY** board fills most of the frame: a big cork board on two easels (feet on the floor), a hand-made banner, every loop card from EP14 to EP17 pinned on it (mango · frog · chicken · grasshopper · cockroach · butterfly · mosquito; each a small loop of tiles, curved arrows all one way, NO numbers, no START, no END) and at its centre the **COMPARE FRAME** (two big windows side by side; under them two empty strips, SAME in green and DIFFERENT in orange). `loopsIn`: the frog loop and the mosquito loop slide into the two windows. `cardsIn`: EP17's two dare cards slide in low along the stone table (WIRED; `ep17dare.js`: copy EP17's card art in at Stage 2). `budsIn`: the buddies pop in. Location pill *A void deck, Singapore · Saturday morning*.",
   "Basil big at the left on a stone stool (h ~480 x .94); Momo big at the right by the easel (h ~480); Pip centre-right at the table's end (h ~400, a step further back, so a little smaller). The board between them; nothing bunched.",
   "One slow push towards the COMPARE FRAME over 6 s; no cut.",
   {"*": "Momo: waving as she pops in (reason: hello). Basil, Pip: " + LISTEN + " (they settle with a small hop)."},
   "Cicada: on the trunk of the rain tree just outside the void deck (small, green-brown, clear wings folded like a tent, big wide-set eyes). This is BEFORE the game: the game's push-in goes here, and after that it is never shown here again.",
   "The fan turns; a child cycles past outside; leaves of the rain tree stir; a mynah hops on the grass.", "Saturday morning: warm light from the open side, cool shade under the void deck's ceiling, sun patches on the floor.",
   "Void deck bed (new: a fan's soft hum, children's voices far off, a bicycle bell once, a far bus) + a cicada's buzz from the rain tree that fades as we look for it; two board slides ON `loopsIn`; two card slides ON `cardsIn` (wired); three pops ON `budsIn` (wired). No music."),
 "lasttime": ("2 · \"Last time...\": EP17's dare (ONE calm picture)", "WIRED with EP17's two dare cards (1 *Yes, the same*: the frog loop and the mosquito loop with a big = · 2 *No, different*: the same two loops with a big ≠); each card steps forward while Heart says it (>= 2.5 s each), the ? on \"Are\", the label *Frog and mosquito: the same life cycle?*. Draw nothing new (copy EP17's card art into `ep17dare.js`).", "No buddies (the calm recap).", "The wired gentle push-in (x1.04 over 8 s).", {}, "Not in this picture.", "The cards' little animals: the frog blinks, the mosquito's wings blur, once each.", CARD, "Wired: a soft pop per card; calm bed."),
 "back": ("2 · Back at the void deck: the COMPARE FRAME", "The void deck (the cold open's set): a slow drift along the LIFE CYCLE DAY board to the COMPARE FRAME; EP17's two cards on the table (wired); pill *Hold on to your answer!* (wired).", "As `cold`.", "A slow drift along the board that continues under the title.",
   {"k204": "Pip hides two fingers behind his back with a small hop; Basil makes a secret fist; Momo a big sure smile. No pose sprite for any of them (reason: keeping your answer secret is the line's own game; a hop and a smile are enough): " + LISTEN + "."},
   "Cicada: on the rain tree's trunk (as `cold`: the same shot continues, still before the game).", "The fan; a leaf drifts down outside.", "As `cold`.", "Void deck bed continues."),
 "title": ("2 · Title slam", "WIRED: the scene before, dimmed + **SAME OR DIFFERENT?** (white) then **FROG VS MOSQUITO** (sun yellow).", "As `back`, dimmed.", "Holds `back`'s drift.", {}, "As `back`.", "As `back`, dimmed.", "Dimmed to .78.", "Wired: whoosh, two slams."),
 "game": ("3 · The game, and the hidden cicada (ONE smooth push-in)", "WIRED (`gameScene`): from the dimmed void deck the camera pushes straight in (1.1 s) onto the cicada on the rain tree's trunk; the iris closes to the black-ringed circle on the blue-violet stage; then the score pill, the YOU hands, *You lock in first*, the buddies, the label *a little cicada* and *Can you spot it?* pop out. Pass the drawn void deck as `R.world` (now `deckPH`) and the cicada's spot as `CICADA` (the INTRO spot). Small print *We look, and we do not touch.* (wired).",
   "Basil (the finder) big at the right (h ~520 x .94); Pip and Momo smaller as gameScene's POS.", "One push-in, then hold; everything pops OVER this shot.",
   {"k301a": "Pip, Basil, Momo: " + LISTEN + " (the circle and the label show the animal; no surprise pose needed).",
    "k301b": "Basil talks (talking sprite), then pointing at the cicada in its circle for 2.5 s (wired in gameScene; reason: showing where to look). Pip, Momo: " + LISTEN + ".",
    "k301r": "Pip, Basil, Momo: " + LISTEN + " (a nod on \"point\")."},
   "Cicada: inside the circle (the push-in target: THE INTRO SPOT, never used again). It blinks and its belly gives a little buzz-wobble.", "Its clear wings catch the light; a leaf shadow passes.", "Soft morning light on the bark.", "Wired: a whoosh on the push-in, a curious pluck on \"cicada\"; add a short cicada buzz ON the cicada's name; the game groove."),
 "goals": ("4 · Today's goals (Momo reads)", "WIRED (`goals3`): Momo reads **How to compare** · **Count the stages** · **Look at the young**; each card lifts and glows.", "Momo big at the left (h ~520).", "Static card screen.",
   {"k401": "Momo talking (reason: she is speaking).", "k402": "Momo talking; she listens between cards (wired).", "k403": "Momo talking.", "k404": "Momo talking, then a smile and a nod, NOT cheer (reason: nothing is learnt yet; the cards are only set)."}, "—", "Bokeh drifting.", CARD, "Wired: a soft pop per card."),
 "count": ("4 · The countdown", "WIRED (common.js `SC.count`).", "As wired (one size at one depth).", "Static.", {}, "—", "—", CARD, "Wired: drums on three, two, one; a cymbal on Go."),
 "r1card": ("5 · Round card", "WIRED: ROUND 1 · YOUR ANSWER FROM LAST TIME.", "—", "The wired slam.", {}, "—", "—", CARD, "Wired."),
 "r1": ("5 · Round 1: EP17's dare (a short 3 s ring)", "WIRED (`lockN`): EP17's two cards as the ONE set of numbered picture cards (1 *Yes, the same* · 2 *No, different*), the clue labels *eggs in water* · *young unlike the adult* ON TOP of the ring, the 3 s ring, LOCKED IN!, the picks Momo 1, Basil 2, Pip 2. Draw the ring's picture (replace `ringPH`): the frog loop (three tiles) and the mosquito loop (four tiles) side by side, big, drawn in the same style.", "The ring big and central (half the frame height); Basil (the lead) big at the side, then the three pick in turn.", "The wired small zoom-out as the buddies answer.",
   {"k501": "Basil (the lead): thinking right after the question, WORRIED through the countdown, listening after the bell (wired in lockN; reason: a question, then a countdown before the answer). Pip, Momo pop in for the picks, listening.",
    "k503": "Momo talking, a sure smile in her voice (her pick; no pose: right or wrong is shown only at the reveal).", "k504": "Basil talking, a bold hop on \"Two!\" (no pose).", "k505": "Pip talking (no pose: he is speaking; thinking and pointing would fight the talking sprite)."},
   "Not in the ring or the countdown.", "The ring ticks; the clue labels bob on the beat.", CARD, "Wired: ticks that speed up, the bell, LOCKED IN!, a pop per pick."),
 "board": ("6 · \"But I found two things that are the same!\" (Momo at the board)", "The void deck: the COMPARE FRAME at its HOME (the centre of the LIFE CYCLE DAY board, about 55% of the frame high: the same in `lccompare`, `answer`, `mark1`, `nyk` and Part 2's recap). The frog loop and the mosquito loop in its two windows; the SAME and DIFFERENT strips still empty.", "Momo big at the left (h ~520) by the board; Pip and Basil at the right (h ~420 each; same depth = same size, Basil x .94).", "Push in on the COMPARE FRAME as Momo speaks; it carries straight into the look-closer (no cut).",
   {"k601m": "Momo talking, then thinking after her question (reason: she has just asked a real question: how can they be different?). Pip, Basil: " + LISTEN + "."},
   "Cicada: on a void deck pillar near the letterboxes, low down (new spot).", "The fan; a neighbour walks past with a shopping trolley outside.", "As `cold`.", "Void deck bed; a soft board tap as Momo touches the frame."),
 "lccompare": ("6 · [LOOK CLOSER] the COMPARE FRAME: SIMILARITIES and DIFFERENCES", LCF + " Inside: the COMPARE FRAME FILLS the panel: LEFT the frog loop (eggs in jelly · a tadpole · a frog), RIGHT the mosquito loop (eggs on still water · a wriggler · a pupa · a mosquito), both big, curved arrows, NO numbers; under them the green SAME strip and the orange DIFFERENT strip. `frame`: push in. SIMILARITIES pops on Heart's term (lib.js o.at, left) and DIFFERENCES (right): draw a line from each to its strip's label. `same1`: a water-drop icon joins the frog's eggs and the mosquito's eggs by two green lines; the chip *eggs in water* lands on SAME (wired `over`). `same2`: the tadpole and the wriggler light, each beside its adult with an orange ≠; the chip *young unlike the adult* lands on SAME (wired). `count`: a pointer stands ready at the frog's first tile (the count begins in the journey). Verdict SAME AND DIFFERENT: LOOK FOR BOTH (green) at `v_compare`.",
   "The panel fills the frame; one buddy FACE in a lower corner (Momo, then Basil, then Momo).", "The push-in (1 s), a push on each chip as it lands, ease back for the verdict.",
   {"k602": "Momo's face: " + LISTEN + " (her pick is being tested, but Heart's line is not a question to her).",
    "k603": "Basil's face: cheer as DIFFERENCES lands (`kw_differences`; reason: key words learnt; lib.js learnAt).",
    "k604b": "Basil's face: talking (teaching the two words).",
    "k605": "Momo's face: surprised, then a happy smile (reason: a real surprise: her two similarities are real after all).",
    "k606": "Momo's face: thinking (reason: Heart asks a real question: is there a difference?)."},
   "Not on screen (a look-closer).", "Each chip lands with a little bounce; the loops' small animals move once (the tadpole wriggles, the wriggler bobs).", "Cream panel, soft light; the set blurred behind.", "LOOK CLOSER: the calm bed low; a soft tick as each chip lands on the SAME strip (`same1`, `same2`); the key-word chime twice (wired); the stamp on the verdict (wired)."),
 "waitw": ("7 · Be a raindrop! (the glide up into the rain)", "Pill **Be a raindrop!**; a soft rain shower starts over the garden; the camera glides up into the grey sky and falls with the rain. The shelf slides aside.", "The three buddies at the void deck's edge (h ~420 each), then each shrinks with a pop and follows.", "One glide (no cut).",
   {"k701": "Pip, Basil, Momo: waving (reason: goodbye as they shrink and come along)."},
   "Cicada: on the low wall of a planter bed as the camera passes (new spot).", "The first raindrops darken the paving; the rain tree's leaves shiver.", "The light greys as the shower comes.", "Rain starting (a soft patter, then steady); the shrink swoosh (wired)."),
 "shrink": ("7 · BE A RAINDROP (first person, present tense)", "The camera IS the raindrop (the *You: a raindrop* tag is wired; the viewer's own presence: a round drop-shaped lens edge and drops sliding off it). `jpond`: you fall into the garden pond right beside a clump of FROG EGGS in clear jelly (ripples). `jtadpole`: *speeded up* (wired): tadpoles wriggle out. Legs grow, the tail shrinks; `jfrog`: a frog climbs onto a lily pad. `jsplash`: a raindrop splash lifts you out across the path and you land in a FLOWER-POT PLATE of still water: tiny mosquito eggs on the surface. `jwrig`: wrigglers hang from the surface. `jpupa`: each curls into a comma-shaped pupa. `jmosq`: a mosquito climbs out and flies, small and not scary. WIRED: the two dot counters at the top right (the frog: three dots filling on `jpond`, `jtadpole`, `jfrog`; the mosquito: four dots filling on `jsplash`, `jwrig`, `jpupa` (glows: one more stage!), `jmosq`), never numbers on the tiles; tags *three stages*, *one more stage!*, *four stages*.",
   "The three buddies ride along, shrunk (h 200, wired `riders`), on a floating leaf at the lower left and right edges, never covering the view.", "The camera IS the raindrop: a fall, a soft bob on the water, a splash across; never a cut.",
   {"k702": "Riders: " + LISTEN + ".", "k703": "Riders: " + LISTEN + ".", "k704": "Riders: " + LISTEN + " (the splash carries them along).",
    "k705": "Basil (rider): surprised at `jpupa` (reason: an unexpected result: one more stage!). Pip, Momo: " + LISTEN + "."},
   "Not on screen (a journey).", "Bubbles, ripples, a water boatman skating; the frog's throat pulses; the mosquito's wings blur.", "Underwater green-gold in the pond; bright grey sky in the plate.", "Calm wonder pad, Heart soft (wired); a plop into the pond ON `jpond`; frogs calling ON `jfrog`; a splash ON `jsplash`; a thin soft whine ON `jmosq` (not scary); rain patter low throughout."),
 "pullout": ("7 · Pull back out to the garden", "Whoosh out to the garden, normal size (0.6 s): the frog on its lily pad; the plate on the path (an adult hand tips it out a moment later in the background: EP17's safety habit, no line).", "The buddies pop back to full size (a hop each).", "One pull back.", {}, "—", "The rain stops; drips.", "Bright after the shower.", "Wired whoosh-out; drips."),
 "answer": ("8 · The answer is two: they are different (OBSERVABLE CHARACTERISTICS)", "The void deck: the COMPARE FRAME at its home, the two dot counters beside the loops (`three` ●●● under the frog, `four` ●●●● under the mosquito, the mosquito's pupa tile glows; wired dots). EP17's two cards small along the top (wired): card 2 lit at `ansglow`; an x chip on card 1 by Momo; a small ? chip by Basil (right card, wrong reason); the coin at `coin1` (only YOU: the Buddies do not score). A chip *the number of stages* lands on the DIFFERENT strip (wired). OBSERVABLE CHARACTERISTICS pops on Heart's term (lib.js o.at) with two small icons by it: an eye (*see it*) and 1-2-3 (*count it*).",
   "Pip big at the right (h ~500) by the counters; Basil big at the left (h ~500 x .94); Momo mid-ground centre (h ~400, further back).", "A push to the counters as Pip explains; ease back for the key word.",
   {"k802": "At `ansglow` (lib.js OUTCOMES): Pip arms crossed (confident: right for the right reason); Momo oops (shy: wrong). Basil: " + LISTEN + " (his card is right but his reason is not: never confident).",
    "k803p": "Pip talking (the only one who explains the right answer).",
    "k804": "Basil: oops (shy) on this line (lib.js OUTCOMES at k804; reason: right card, wrong reason, no point).",
    "k806": "Pip: cheer as OBSERVABLE CHARACTERISTICS lands (reason: a key word learnt; learnAt). Momo, Basil: " + LISTEN + ".",
    "k807p": "Pip talking (teaching the term)."},
   "Cicada: on the side of the letterboxes, half behind a flyer (new spot).", "The fan; a postman's trolley rattles past outside.", "As `cold`, brighter after the rain.", "Void deck bed; a sting on the answer; the coin; the key-word chime (wired); two soft dot-pops ON `three` and `four`."),
 "mark1": ("8 · Mark Sentence 1 (Pip): 5.14", "WIRED (`markScene`): Pip, \"Say it with me!\", 0.8 s, reads the card; highlights on the key words. Under the card (Stage 2): the COMPARE FRAME small with both strips filled.", "Pip big at the left, the card large at the right.", "Static.",
   {"k901": "Pip: pointing at the card in the 0.8 s pause (wired; reason: showing the sentence).", "k902": "Pip talking; a smile and a nod after the last word (no second cheer: he cheered seconds ago)."}, "—", "—", CARD, "Wired: a soft pop on \"Say it with me!\", the chime after the card."),
 "holdon": ("9 · HOLD ON! Pip: \"exactly the same!\"", "Model: ../ep16/p1.js `SC.holdon` (once drawn) and ../ep15/p1.js `SC.holdon`. `pipboard`: Pip's own sheet on a low easel at the void deck: the frog loop and the grasshopper loop side by side, a big = between them and his title *THE SAME!*; under it one green chip *3 stages*. The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central on the blue stage with Pip's sheet as its picture and the clue labels *3 stages and 3 stages* · *the same?* ON TOP of the ring; the bell; the coin. After the bell: an empty orange chip *the young?* pops on his sheet beside the =.",
   "Pip big at the left (h ~520) with his easel; during the countdown the ring takes the stage and only Pip stays, big, at the side; Basil big at the right (h ~500 x .94) for his fix; Momo mid-ground.", "Push in on the sheet; the countdown on the blue stage; back to the sheet.",
   {"k1001p": "Pip talking, then pointing at his sheet after the line (reason: showing his idea; he believes it).",
    "k1002": "Pip: thinking through Heart's line and the countdown (reason: \"something is not right\" is a question to him; Pip has no worried painting, so his thinking face stands in: lib.js POSE_SUB).",
    "k1003": "At k1003 (lib.js OUTCOMES): Pip oops (shy: wrong); Basil and Momo arms crossed (confident: right).",
    "k1004b": "Basil talking (he was right: he explains). Pip: oops held from k1003 (his own mistake on screen), then listening."},
   "Cicada: on top of Pip's easel's frame (new spot); NOT in the ring or the countdown.", "Pip's sheet flutters a little in the fan's breeze.", "As `answer`.", "The HOLD ON! stamp (wired); the ring's ticks, the bell (wired); the coin; a soft pop for the empty chip."),
 "lcyoung": ("10 · [LOOK CLOSER] the young beside their parents", LCF + " Inside, two halves both BIG, the same layout: LEFT `tad` a tadpole (round body, long tail, NO legs, in water) beside a frog, labels *a tail* · *no legs* · *in water*, an orange ≠ between them (*looks nothing like the adult*); RIGHT `nymph` a grasshopper nymph (six legs on the middle of the body, two feelers, big back legs, NO wings, no wing pads) beside an adult with long wings, labels *six legs* · *two feelers* joined to BOTH, a green = (*looks like the adult*) and a dashed outline *no wings yet*. `same3`: across the top the green chip *both: 3 stages* (wired); `diff3`: across the bottom the orange chip *the young: different* (wired). Verdict ONE SAME, ONE DIFFERENT (green) at `v_young`.",
   "The halves fill the panel; one buddy FACE in a lower corner (Pip, Momo, Basil, Pip).", "The push-in, a push on each pair as it is named, ease back for the verdict.",
   {"k1101": "Pip's face: " + LISTEN + " (his rule is tested; he already showed oops at k1003).",
    "k1102m": "Momo's face: talking.", "k1103b": "Basil's face: talking.",
    "k1104": "Pip's face: a slow nod (listening: he sees what he missed; no second oops)."},
   "Not on screen (a look-closer).", "The tadpole wriggles; the nymph's feelers twitch; the adult grasshopper flicks a wing.", "Cream panel.", "LOOK CLOSER: the pond and the grass low (a frog's croak ON `tad`, a grasshopper's click ON `nymph`); a tick ON `same3`, a soft bong ON `diff3`; the stamp (wired)."),
 "mark2": ("10 · Mark Sentence 2 (Momo): 5.12, the first sentence", "WIRED (`markScene`): Momo, \"Say it with me!\", 0.8 s, reads the card. Under the card (Stage 2): the COMPARE FRAME small with its SAME and DIFFERENT strips.", "Momo big at the left, the card large at the right.", "Static.",
   {"k1106": "Momo: pointing at the card in the 0.8 s pause (wired; reason: showing the sentence).", "k1107": "Momo talking; a smile and a nod after the last word (wired)."}, "—", "—", CARD, "Wired."),
 "final": ("11 · The score hand", "WIRED (`finalScene`).", "As wired.", "Static.", {"k1201": "The buddies: " + LISTEN + " (the high five is the class's)."}, "—", "—", CARD, "Wired: a sting, a high-five slap."),
 "liz": ("11 · The cicada's reveal and its fun fact", "WIRED (`lizReveal` + Basil's `funFact` panel): the score hand melts into the void deck (now `deckPH`), ONE push-in onto the cicada on the leg of the LIFE CYCLE DAY board's easel (`CICADA_R`, the REVEAL spot), the iris, the ring on \"cicada\"; *It was on the leg of our board's easel!*; the panel's pictures on their marks (replace the `ffPH` placeholders): `ff_three` a small cicada loop (eggs on a twig · a nymph · an adult; curved arrows, no numbers) beside the grasshopper's loop; `ff_under` a cute cicada nymph underground among tree roots, big digging front legs; `ff_17` a calendar of seventeen little suns flipping, and a small map outline labelled *America*. *Tell someone at home!*. Small print *We look, and we do not touch.* (wired).",
   "Basil big at the right of the panel.", "The push-in, then hold.",
   {"k1202": "Pip: pointing at the cicada as it is ringed (reason: showing it).",
    "k1203b": "Basil talking (the teller). Momo: surprised on \"seventeen\" (reason: a fun fact is a real surprise).", "k1204": "The buddies: " + LISTEN + "."},
   "Cicada: on the leg of the big board's easel (the REVEAL spot; new, never used before), a tiny buzz-wobble.", "The cicada's wings shiver; the fan turns behind.", "As `cold`.", "Wired: a whoosh, a sparkle on \"cicada\", pops for the pictures; add a short cicada buzz ON the ring."),
 "kwrecap": ("11 · The key words", "WIRED (`SC.kwrecap`): SIMILARITIES · DIFFERENCES · OBSERVABLE CHARACTERISTICS.", "As wired.", "Static.", {}, "—", "—", CARD, "Wired: glows."),
 "cliff": ("12 · The cliffhanger: the hen on her eggs", "The garden's edge by the void deck: `hen` EP16's brown HEN (red comb and wattles) sits on a nest of straw under a low bush; `nest` she shifts and three pale EGGS show under her; a ? pops (wired). PART 2 slams in (wired). Small print *We watch from a distance.* (wired).",
   "Basil big at the left (h ~480 x .94), crouched, looking at the hen; Momo and Pip at the right in their BACK views (poses/momo_back.png; Pip has no back painting yet: his sit sprite, turned three-quarters), watching the nest.", "A push from Basil to the nest (one move).",
   {"k1301b": "Basil talking; pointing at the nest on \"hen\" is NOT used while he talks; after his question: thinking (reason: his tricky question is asked and stays open until Part 2). Momo (back view), Pip: watching the nest (the back view's job: looking into the scene with the viewer).",
    "k1302": "All three: a hopeful smile and a small hop (listening: nothing learnt yet, no cheer)."},
   "Not shown (it was revealed).", "The hen's head turns; a feather lifts; a bee passes.", "Mid-morning sun through the bush, dappled.", "A hen's soft clucks ON `hen` and `nest`; a low drum and the PART 2 slam (wired). Song.js's garden bed says \"no hens\" (EP15): this one HAS the hen."),
 "nyk": ("13 · \"Now you know!\"", "WIRED (`nykScene`): the LIFE CYCLE DAY board with the COMPARE FRAME (both strips filled), centred between the buddies (replace the placeholder card).", "As wired.", "Static, the sunburst turning.", {"*": "All three: cheer on \"Now you know!\" (wired; reason: \"Now you know!\")."}, "—", "—", CARD, "Wired: drums 1.0 s apart, the blast, music fades over about 4 s."),
}
P2 = {
 "lasttime": ("1 · \"Last time...\": a calm recap (three pictures)", "WIRED frame (`pic1`, `pic2`, `pic3`): three pictures, one at a time, centred, large, a gentle push-in, one label each: *Frog and mosquito: same and different* (the COMPARE FRAME with both strips filled) · *Three stages and four* (the two dot counters ●●● and ●●●● beside the loops) · *Which came first?* (the hen on her nest with a ?). Replace the placeholders with Part 1's own art.", "No buddies.", "Gentle push-in on each.", {}, "—", "—", CARD, "Wired: a soft pop per picture; calm bed."),
 "place": ("2 · The garden's edge by the void deck, mid-morning", "`henIn`: the hen stands, turns her eggs with her beak, and sits again, on her straw nest under a low bush. A planter bed of IXORA (red and orange flower clusters), EP17's LIME PLANT in its big glazed pot (glossy leaves, small white flowers), the bench, a watering can, the void deck and the LIFE CYCLE DAY board behind. Location pill *A community garden, Singapore · morning*.", "No buddies yet.", "A slow drift from the board to the nest.", {},
   "Honeybee: on an ixora flower in the planter bed (small, golden-brown with dark stripes, fuzzy, see-through wings). This is BEFORE the game: the game's push-in goes here, and after that it is never shown here again.",
   "Bees hum among the ixora; a bulbul hops; the hen's head bobs.", "Bright mid-morning, dappled under the bush.", "Garden bed (birds, bees humming low among the flowers, a far bus) + the hen's soft clucks ON `henIn`."),
 "game": ("2 · The game, and the hidden honeybee (ONE smooth push-in)", "WIRED (`gameScene`): from the garden the camera pushes straight in onto the honeybee on its ixora flower; the iris; the game's things pop out. Pass the drawn garden as `R.world` (now `gardenPH`) and the bee's spot as `BEE` (the INTRO spot). Small print *We look, and we do not touch.* (wired).",
   "Basil (the finder) big at the right (h ~520 x .94); Pip and Momo smaller.", "One push-in, then hold.",
   {"d201a": "The buddies: " + LISTEN + ".", "d201b": "Basil talks, then pointing at the bee in its circle for 2.5 s (wired; reason: showing where to look).", "d201c": "The buddies: " + LISTEN + "."},
   "Honeybee: inside the circle (THE INTRO SPOT, never used again): it wiggles its feelers and its wings buzz in a blur.", "Pollen dust on its legs.", "Warm.", "Wired whoosh; a soft buzz ON \"honeybee\"; the game groove."),
 "goals": ("3 · Today's goals (Basil reads)", "WIRED (`goals3`): **No first or last stage** · **Same stages, still different** · **Why life cycles matter**.", "Basil big at the left (h ~520 x .94).", "Static.",
   {"d301": "Basil talking.", "d302": "Basil talking.", "d303": "Basil talking.", "d304": "Basil talking, then a smile (no cheer: nothing learnt yet)."}, "—", "Bokeh.", CARD, "Wired: a soft pop per card."),
 "r1card": ("4 · Round card", "WIRED: ROUND 1.", "—", "The wired slam.", {}, "—", "—", CARD, "Wired."),
 "r1": ("4 · Round 1: which came first?", "WIRED (`lockN`) with THREE big numbered picture cards: 1 *The egg* (a big egg) · 2 *The chicken* (a hen) · 3 *Neither: it goes round* (a small loop egg → chick → hen → egg, curved arrows, no numbers); the clue labels *every egg came from a hen* · *every hen came from an egg* ON TOP of the ring; the 5 s ring; the picks Basil 1, Pip 3, Momo 3. Draw the card pictures and the ring's picture (replace `ringPH`): the hen on her nest with the eggs showing.", "The ring central; Basil (the lead) big at the side; one buddy big at the side per pick.", "The wired zoom-out as the buddies answer.",
   {"d401": "Basil (the lead): thinking after the question, WORRIED through the countdown (wired; reason: a question, then a countdown; it is also his own question).", "d403": "Basil talking (no pose until the reveal).", "d404": "Pip talking.", "d405": "Momo talking."},
   "Not in the ring or the countdown.", "The ring ticks.", CARD, "Wired: ticks, the bell, LOCKED IN!, a pop per pick."),
 "waitw": ("5 · Be an egg! (the glide in under the hen)", "Pill **Be an egg!**; the camera glides down under the hen's warm feathers; a soft golden wipe. The shelf slides aside.", "The buddies by the nest (h ~420 each), then each shrinks with a pop and follows.", "One glide (no cut).",
   {"d601": "Pip, Basil, Momo: waving (reason: goodbye as they shrink)."},
   "Honeybee: on a flower of the low bush over the nest as the camera passes (new spot).", "The hen ruffles her feathers to let us in.", "Warm golden.", "The shrink swoosh (wired); a warm hush."),
 "shrink": ("5 · BE AN EGG (first person, present tense)", "`jegg`: YOU are an egg in the nest: warm golden light through the hen's feathers above, straw all round, two other eggs like hills beside you; the *You: an egg* tag (wired). `jhatch`: crack! light pours in (*speeded up*, wired). `jchick`: you are a fluffy chick (your own little yellow wings at the edges of the frame: first person), the hen's big friendly face above you; tag *a chick* (wired). `jhen`: you peck and grow, fluffy wings turn to feathers, the world gets smaller round you: tag *an adult hen* (wired). `jlay`: one morning, in the nest, a new egg lies under you: tag *a new egg* (wired). `jagain`: the view glides down to the new egg and a soft golden circle of arrows draws itself round the frame and keeps turning (no number, no start).",
   "The three buddies ride along, shrunk (h 200, wired `riders`), tucked in the straw at the lower left and right edges, peeping out.", "The camera IS the egg, then the chick, then the hen: a gentle bob; never a cut.",
   {"d602": "Momo (rider): surprised at `jhatch` (reason: a real surprise: crack!). Pip, Basil: " + LISTEN + ".", "d603": "Riders: " + LISTEN + ".", "d604": "Riders: " + LISTEN + " (the golden circle says it).",
    "d605": "Pip (rider): thinking (reason: Heart asks a real question: so where did it start?)."},
   "Not on screen (a journey).", "Straw stirs; the hen's heartbeat-like hush; the chick's fluff.", "Warm golden through feathers, then morning daylight.", "Calm wonder pad, Heart soft (wired); a crack ON `jhatch`; peeps ON `jchick`; a cluck ON `jhen`; a soft rustle ON `jlay`; a gentle whoosh round the circle ON `jagain`."),
 "pullout": ("5 · Pull back out to the garden", "Whoosh back out to the garden (0.6 s): the hen on her nest.", "The buddies pop back (a hop each).", "One pull back.", {}, "—", "—", "Mid-morning.", "Wired whoosh-out."),
 "eggans": ("6 · The answer is three: neither", "The garden: the hen on her nest. The three numbered cards small along the top (wired): card 3 lit at `ansglow`; an x chip on card 1 and by Basil; the coin (`coin1`: the Buddies also score, two of three were right).", "Pip big at the right (h ~500), Momo big at the left (h ~500), Basil mid-ground centre (h ~400 x .94, a step back).", "Gentle push to card 3, back.",
   {"d406": "At `ansglow` (lib.js OUTCOMES): Pip and Momo arms crossed (confident: right); Basil oops (shy: wrong)."},
   "Honeybee: on the bench's armrest, resting (new spot).", "The hen settles; a bee passes.", "Mid-morning.", "Garden bed; a sting on the answer; the coin (wired)."),
 "lcloop": ("7 · [LOOK CLOSER] the loop: REPEATED, NO FIRST OR LAST STAGE", LCF + " Inside: the CHICKEN'S LOOP from the LIFE CYCLE DAY board FILLS the left two thirds: an egg · a chick · a hen, curved arrows all one way, NO numbers. `finger`: a child's hand (four fingers and a thumb) touches the loop at the chick and follows the arrows round, back to the chick; then touches at the hen, round again (a soft glowing trail). `daynight`: at the right third EP14's DAY-AND-NIGHT loop (a sun and a moon on a turning circle; reuse its art from ../ep14/) turns beside it. REPEATED pops on Heart's term (a small ↻ by it), then NO FIRST OR LAST STAGE (lib.js o.at), with a grey *Stage 1* tag that pops and is crossed out at its start. Verdict NO FIRST OR LAST STAGE (green) at `v_loop`.",
   "The panel fills the frame; one buddy FACE in a lower corner (Basil, Momo, Pip, Basil).", "The push-in (1 s), a slow follow of the finger round the loop, ease right for the day-and-night loop.",
   {"d701": "Basil's face: " + LISTEN + " (his idea is tested; he showed oops at `ansglow`).", "d702m": "Momo's face: talking, a happy smile as day and night turn.",
    "d703": "Pip's face: cheer as NO FIRST OR LAST STAGE lands (`kw_no_first_or_last_stage`; reason: key words learnt).", "d704p": "Pip's face: talking (teaching). Basil's face: a nod (listening: learning)."},
   "Not on screen (a look-closer).", "The finger's trail glows; the sun and the moon swap.", "Cream panel; the day-and-night loop's light shifts warm to cool.", "LOOK CLOSER: the calm bed low; a soft tick as the finger lands ON `finger` and a gentle whoosh round the arrows; day birds then night crickets ON `daynight`; the key-word chime twice; the stamp (wired)."),
 "mark1": ("7 · Mark Sentence 1 (Basil): 5.16", "WIRED (`markScene`): Basil, \"Say it with me!\", 0.8 s, reads the card. Under the card (Stage 2): the chicken's loop and the day-and-night loop, small, both turning.", "Basil big at the left, the card large at the right.", "Static.",
   {"d705": "Basil: pointing at the card in the 0.8 s pause (wired).", "d706": "Basil talking; cheer after the last word (reason: his own mistake is fixed: the egg is not the first stage; pass `o.achieved` so lib.js allows it)."}, "—", "—", CARD, "Wired."),
 "showcard": ("8 · Showdown card", "WIRED: SHOWDOWN.", "—", "The wired slam.", {}, "—", "—", CARD, "Wired."),
 "show": ("8 · Showdown: Momo's homework, the mosquito and the mealworm beetle (double points)", "Model: ../ep16/p2.js `SC.show` (once drawn) and ../ep15/p2.js `SC.show`. Momo's homework sheet on an easel by the void deck, LARGE, titled *The mosquito and the mealworm beetle*, the two loops small at the top (the mosquito's four tiles; the beetle's loop with its PUPA tile faint and easy to miss: a pale, still pupa). Three ruled lines, each with a small drawing: 1 *In both, the young do not look like the adult.* (a wriggler ≠ a mosquito; a mealworm ≠ a beetle) · 2 *The mosquito larva lives near the water surface, but the beetle larva lives on land.* (a wriggler at a water line; a mealworm on bran) · 3 *The mosquito has four stages, but the beetle has three.* (●●●● and ●●●). The lines light as Momo reads them (`l1`, `l2`, `l3`). The YOU ring (5 s) big and central on the blue stage with the three line numbers as the ONE set of numbered choice cards. LOCKED IN!; Basil reveals.",
   "Momo big at the left (h ~520) with her easel; during the countdown the ring central and only Momo at the side; Basil big at the right (h ~500 x .94) for the reveal; Pip mid-ground.", "Push in on the easel; the countdown on the blue stage; back.",
   {"d801": "Momo: pointing at her homework sheet (reason: showing her work; she is proud of it). Basil, Pip: " + LISTEN + ".",
    "d802m": "Momo talking (reading her lines). In the countdown that follows: Momo thinking (her face stands in for worried: POSE_SUB; reason: a countdown before the answer).",
    "d803": "The buddies: " + LISTEN + " (Basil leans in).",
    "d804b": "Basil talking; at d804b (lib.js OUTCOMES) Basil and Pip arms crossed (confident: right), Momo oops (shy: her mistake)."},
   "Honeybee: on top of Momo's easel (new spot); NOT in the ring or the countdown.", "The sheet's corner lifts in the breeze.", "Void deck shade.", "The Showdown card, ticks, the bell, LOCKED IN! (wired); a page rustle ON `l1`."),
 "fix": ("8 · The fix", "`strike`: line 3 struck through; `rewrite`: rewritten in green *Both have four stages: the egg, the larva, the pupa and the adult.*; the beetle's faint pupa tile glows bright (●●●●). The coin +2 (`coin2`).", "Momo big at the left by her easel; Basil and Pip at the right.", "Push in on line 3, then the glowing pupa tile, back.",
   {"d806": "Momo: a nod and a smile at the green rewrite (listening: her cheer comes at the verdict of the next look-closer). Basil, Pip: " + LISTEN + "."},
   "Honeybee: on the watering can's spout by the easel (new spot).", "—", "Void deck shade.", "A marker strike ON `strike`, a squeak of the green marker ON `rewrite`; the coin (wired)."),
 "beetle": ("9 · \"So how are they different?\" (the class mealworm tub)", "The void deck table: a small clear tub of oat bran with MEALWORMS in it (golden-brown, shiny, segmented; the lid with air holes), beside a card of a jar of still water with a wriggler drawn on it (no real mosquito water at the void deck). Small print *Kept with food and air holes, and returned to class.* (wired).", "Momo big at the left (h ~500) by the tub; Basil big at the right (h ~500 x .94); Pip mid-ground.", "Push in on the tub.",
   {"d901m": "Momo talking (fixing her own count: the word \"Oops\" carries it; no pose while talking), then thinking after her question (reason: a real question: so how are they different?)."},
   "Honeybee: on the rim of the mealworm tub's lid (new spot).", "The mealworms wriggle in the bran.", "Void deck shade.", "A plastic tub of bran rustling ON the scene start; LOOK CLOSER whoosh."),
 "lcbeetle": ("9 · [LOOK CLOSER] same stages, still different: PHYSICAL FEATURES", LCF + " Inside, two halves both BIG: LEFT the mosquito's young: a wriggler hanging at the water surface (a cut-away of still water); RIGHT the beetle's young: a MEALWORM crawling on bran (golden-brown, shiny, hard, segmented, six tiny legs at the front). `pupa`: first a band across the top: both loops with four tiles each (●●●● and ●●●●) and the green chip *same number of stages* (wired). PHYSICAL FEATURES pops on Heart's term (lib.js o.at). `wrig`: labels on the wriggler *thin* · *hangs at the water surface* (blue, joined by lines); `meal`: labels on the mealworm *golden and hard* · *crawls on land* (brown, joined by lines); an orange ≠ between them. Verdict SAME STAGES, STILL DIFFERENT (green) at `v_beetle`.",
   "The halves fill the panel; one buddy FACE in a lower corner (Momo, Basil, Momo).", "The push-in, a push on each larva as it is named.",
   {"d902": "Momo's face: thinking held from her question (reason: her question is still open).", "d904b": "Basil's face: talking (teaching). Then Momo's face: cheer at `v_beetle` (reason: her mistake is fixed and a term learnt; learnAt)."},
   "Not on screen (a look-closer).", "The wriggler bobs at the surface; the mealworm crawls.", "Cream panel.", "LOOK CLOSER: still water (a soft drip) ON `wrig` and dry bran (a rustle) ON `meal`; the key-word chime; the stamp (wired)."),
 "mark2": ("9 · Mark Sentence 2 (Pip): 5.12, the second sentence", "WIRED (`markScene`): Pip, \"Say it with me!\", 0.8 s, reads the card. Under the card (Stage 2): the two larvae side by side, small.", "Pip big at the left, the card large at the right.", "Static.",
   {"d905": "Pip: pointing at the card in the 0.8 s pause (wired).", "d906": "Pip talking; a smile and a nod after the last word (he cheered at REPEATED less than two minutes ago; one strong pose is enough)."}, "—", "—", CARD, "Wired."),
 "closure": ("10 · Why life cycles matter: the butterfly lays an egg (the Cycles theme closes)", "The lime plant in its big pot in the garden (EP17's): `butterfly` the LIME BUTTERFLY (black with cream-yellow patches, a red-and-blue eyespot near each tail end, no tails) flutters in and lands on a young leaf; `lay` she curls her body and leaves ONE tiny round egg on the leaf's tip (EP17's cold-open egg: the loop goes round). The book's 5.17 on a cream strip (WIRED, >= 3.5 s). `fewer`: a small picture model: the butterfly loop beside a row of lime plants; plants fade away one by one and the loop's tiles dim (never crossed out); `plant`: new lime plants pop up in pots and the loop glows and turns again. `theme`: the buddies' **OUR CYCLES THEME** board slides in at the left (feet on the ground): *C1. What makes up a cycle?* → *a repeated pattern of change* · *C2. How does a cycle help us predict events and processes?* → *we know what comes next (night after day; a pupa after a wriggler)* · *C3. Why are cycles important to life?* → *living things of the same kind can continue*; the three answers light one by one.",
   "Momo big at the left (h ~500), Pip big at the right (h ~500), Basil mid-ground (h ~400 x .94).", "A push to the leaf as the egg is laid; ease back for the strip and the model; a slow drift to the theme board.",
   {"d1001": "Momo: pointing at the butterfly as it lays the egg (reason: showing it).", "d1003": "The buddies: " + LISTEN + " (the strip is read).",
    "d1006m": "Momo talking. Basil: cheer as the loop glows again at `plant` (reason: something achieved: the cycle keeps going; learnAt)."},
   "Honeybee: on the rim of the lime plant's big pot (new spot).", "The butterfly's wings open and close; leaves stir.", "Bright late morning.", "Garden bed; a soft flutter ON `butterfly`; a tiny tick ON `lay`; a warm chime as the board's three answers light ON `theme`."),
 "chant": ("11 · The chant", "WIRED (`chantScene`): \"Say it with us!\" + 0.8 s; three lines with YOUR TURN!: *Same or different? Compare them both!* · *Count the stages! Three or four!* · *Round and round! No first, no last!*. Draw the board at the right (replace the placeholder): the COMPARE FRAME (frog and mosquito) above, the chicken's loop below; it flashes per line (line 1 the SAME and DIFFERENT strips; line 2 the counters ●●● ●●●●; line 3 the arrows going round).", "The three buddies left to centre (as wired), the board at the right.", "Static, a small bounce on the stomps.", {"*": "All three: the chant's own bounce (wired; no extra poses)."}, "—", "—", CARD, "Wired: clap-clap-stomp; YOUR TURN! pauses."),
 "final": ("12 · The score hand", "WIRED (`finalScene`).", "As wired.", "Static.", {"d1201": "The buddies: " + LISTEN + "."}, "—", "—", CARD, "Wired."),
 "liz": ("12 · The honeybee's reveal and its fun fact", "WIRED (`lizReveal` + Pip's `funFact` panel): the score hand melts into the garden (now `gardenPH`), ONE push-in onto the honeybee on a small white flower of the lime plant (`BEE_R`, the REVEAL spot), the iris, the ring on \"honeybee\"; *It was on a flower of the lime plant!*; the panel's pictures on their marks (replace the placeholders): `ff_queen` a queen honeybee (a longer body, a tiny crown sticker for fun) on a honeycomb; `ff_eggs` the comb's cells filling with tiny eggs one after another, a counter rising past *1000* with a little sun icon (*in one day*). Small print *We look, and we do not touch.* (wired).",
   "Pip big at the right of the panel.", "The push-in, then hold.",
   {"d1202": "Basil: pointing at the honeybee as it is ringed (reason: showing it).", "d1203p": "Pip talking (the teller). Momo: surprised on \"thousand\" (reason: a fun fact is a real surprise).", "d1204": "The buddies: " + LISTEN + "."},
   "Honeybee: on a white flower of the lime plant (the REVEAL spot; new, never used before).", "The bee's wings blur; the flower nods.", "Late morning.", "Wired: a whoosh, a sparkle and a soft buzz ON \"honeybee\", pops for the pictures."),
 "dare": ("13 · The dare for Episode 19", "Model: ../ep17/p2.js `SC.dare` (once drawn). The void deck: the LIFE CYCLE DAY board's metal frame; Basil's red-and-blue BAR MAGNET holds a card on it. On the table: a STEEL PIN and a short piece of shiny orange COPPER WIRE. `dareIn`: ONE set of THREE big numbered cards slides in low (wired): 1 *The steel pin* · 2 *The copper wire* · 3 *Both* (draw a picture on each: the pin, the wire, both side by side); the banner *NEXT · Which will the magnet pull?*, *Lock in your answer!*.",
   "Basil big at the left (h ~480 x .94), by his magnet; Momo and Pip at the right (h ~420 each).", "A push from the magnet on the board to the pin and the wire, then to the cards.",
   {"d1301": "Momo and Pip: thinking (reason: a question has just been asked; no hints). Basil: " + LISTEN + " (a proud smile by his magnet: no pose sprite)."},
   "Not shown (revealed).", "The fan turns; the card under the magnet flutters but holds.", "Void deck shade.", "Void deck bed; a magnet's soft clack ON `dareIn`; three slides (wired); a sting on \"Lock in your answer!\" (wired)."),
 "kwrecap": ("14 · The key words", "WIRED: REPEATED · NO FIRST OR LAST STAGE · PHYSICAL FEATURES.", "As wired.", "Static.", {}, "—", "—", CARD, "Wired: glows."),
 "nyk": ("15 · \"Now you know!\"", "WIRED (`nykScene`): the LIFE CYCLE DAY board, complete, between the buddies (replace the placeholder card).", "As wired.", "Static.", {"*": "All three: cheer on \"Now you know!\" (wired)."}, "—", "—", CARD, "Wired."),
}
HDR = """# SCENES_TODO: P3 EP18 "Frog vs mosquito: same or different? How to compare" (Stage 2, the drawing)

Generated by `make_todo.py` from the timelines (`tl_p1.json`, `tl_p2.json`) and the staging in `make_todo.py`. Re-run after any timeline
change. The script: `../p3_ep18_script.md` (sections 3 and 11 first). Every line's words: `script.py`.

## Read first: the standing rules (all from `../SERIES_FORMAT.md`; EP15 to EP17's `SCENES_TODO.md` rules apply unchanged)

1. **No aura discs; buddies IN the scene, BIG** (1d): contact shadow, the scene's light on them; the speaker 45-55% of the frame height,
   every other buddy on screen at least h 330; balanced layouts (speaker one side, the others the other side, the prop between).
2. **The buddies stay in proportion** (5, 23 Nov): lib.js `SIZE_K` basil .94 (the v2 cast); same depth = same size, further back =
   smaller, nobody more than ~15% bigger than another at the same depth. The heights below are BEFORE SIZE_K.
3. **The camera frames whoever talks and pushes in on what is named**, then eases back; never a jump cut inside a place.
4. **Talking = a moving mouth**: a speaking buddy is ALWAYS in its talking sprite (lip-sync, blinks) and pops back to its pose after the
   line. So no pose (thinking, pointing) is ever asked for DURING a buddy's own line: before it or after it only.
5. **Every reaction has a reason, or it goes numb** (5, 23 Nov; EP15 went from 160 pose moments to 75). ONE job per pose; most of the
   time the buddies just listen. Each pose below names its reason; a pose with no reason is replaced by listening. Strong poses (cheer,
   surprised, laughing, worried) about once a minute per buddy at most. EP18 asks for about 30 pose moments per part, most of them wired.

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
   | laughing | a line that is meant to be funny (EP18 has none: no laughing) |
   | pointing | showing a specific thing on screen |
   | waving | hello and goodbye only |
6. **Reactions follow the answer** (lib.js `OUTCOMES`, set for EP18): Part 1 Round 1 at `ansglow` Pip right (confident) / Momo wrong
   (shy); **Basil picked the right card for the WRONG reason (size): no point and never confident**: he listens at `ansglow` and is shy at
   Heart's k804 ("Basil picked two, but size does not tell us about a life cycle"). HOLD ON! at k1003 Basil, Momo right / Pip wrong. Part 2
   Round 1 at `ansglow` Pip, Momo right / Basil wrong; Showdown at d804b Basil, Pip right / Momo wrong. Only a buddy who got it right
   explains the right answer (the script already does).
7. **Look-closers**: the thing fills the panel, each named part its own push-in and big label, one buddy FACE in a lower corner reacting;
   one verdict at its `v_*` mark held 2.5 s. **Countdowns take the stage** (ring half the frame, clue labels >= 40 px on top of the ring,
   blue stage, one big buddy). **ONE set of big numbered picture cards** per lock-in (Part 1 Round 1: TWO, EP17's own; Part 2 Round 1 and
   the dare: THREE).
8. **The hidden animal moves** (4, 23 Nov): a new fair spot in EVERY scene where it is on screen (listed per scene below), never back at
   the spot where the game's push-in introduced it (Part 1: the rain tree's trunk; Part 2: an ixora flower), never twice in one spot; the
   reveal is at a NEW spot (Part 1: the leg of the LIFE CYCLE DAY board's easel; Part 2: a white flower of the lime plant; Heart's reveal
   lines say so). Not on screen in a look-closer, a journey or a countdown. Spots in order: Part 1 rain-tree trunk (cold, back: before the
   game) → void deck pillar (board) → planter-bed wall (waitw) → letterboxes (answer) → top of Pip's easel (holdon) → leg of the board's
   easel (liz, the reveal). Part 2 ixora flower (place: before the game) → the bush over the nest (waitw) → the bench's armrest (eggans) →
   top of Momo's easel (show) → the watering can's spout (fix) → the mealworm tub's lid (beetle) → the lime plant's pot rim (closure) → a
   white flower of the lime plant (liz, the reveal).
9. **The journeys bring company**: a *You: a ...* tag (wired) and the viewer's own presence at the frame's edge (a raindrop's lens edge;
   the chick's own little wings), the three buddies shrunk riding along (`riders`), reacting only where a reason is listed, never covering
   the view. Counters are rows of DOTS (wired `dots` in tests.js), never numbers on a loop's tiles.
10. **Real animals, cute AND alive, true shapes** (script section 3, Realism): loops drawn identically in style so the differences are
   real (three tiles against four); the tadpole a tail and no legs; the nymph wingless with six legs and two feelers; the mosquito's
   larva and pupa at a water surface; the mealworm golden-brown, shiny, hard, segmented, six tiny legs at the front, on oat bran; the
   beetle's pupa pale, still, curled, with little bumps; the adult beetle dark with hard wing covers; EP16's brown hen (red comb), pale
   eggs, a fluffy pale-yellow chick; EP17's lime butterfly lays ONE tiny round egg on a young leaf's tip; the cicada green-brown, clear
   wings folded like a tent, big wide-set eyes, its nymph with big digging front legs; the honeybee small, golden-brown with dark stripes,
   fuzzy, see-through wings (the queen longer). **Loops never have numbers, a START or an END (5.16).**
11. **Things never float**: the board, the easels and the theme board stand on the floor; chips slide along the strips; the butterfly,
   the bee and the mosquito fly (as they really do). Every picture labelled; every tag joined to what it describes; labels inside the
   frame; nothing in the bottom fifth at the end. Colours: SAME green, DIFFERENT orange, everywhere (tests.js `SAMEC`, `DIFFC`); the
   wriggler blue (`WRIGC`), the mealworm brown (`MEALC`).
12. **Every place sounds alive** (9): sound_cues.js is a GENERIC Stage 1 plan (rituals and beds); add each place's ambience and the foley
   ON the marks (the Sound line of each scene below). song.js's garden bed says "no hens" (EP15): EP18's garden edge HAS the hen; add a
   void deck bed (a fan's hum, far children's voices, a bicycle bell, a far bus).

### The places: ONE real Singapore place, a Saturday morning
Our block's **void deck** beside EP15 to EP17's **community garden**, so the story carries on:
- **The void deck** (Part 1: cold, back, board, answer, holdon; Part 2: show, fix, beetle, dare): square pillars, stone tables and round
  stools, letterboxes, a ceiling fan, a notice board; the RAIN TREE just outside; the LIFE CYCLE DAY board in the middle.
- **The garden's edge by the void deck** (Part 1: waitw, pullout, cliff; Part 2: place, waitw, pullout, eggans, closure, liz): EP16's hen
  on her straw nest under a low bush, a planter bed of ixora, EP17's lime plant in its big glazed pot, the bench, the watering can, the
  pond and the flower-pot plate on the path (Part 1's journey).
- Borrow from ../ep15/garden15.js (`BG.garden15`, `VG15`) and EP16 / EP17's garden art once drawn rather than drawing from zero; put
  EP18's sets in new files (e.g. `deck18.js`, `edge18.js`) loaded after ep17dare.js in page.html; main.js already calls `XDEFS18()` if
  it exists.

### Homes of recurring props
- **The LIFE CYCLE DAY board and its COMPARE FRAME**: the centre of the void deck, about 55% of the frame high, the same in every board
  scene (cold, back, board, answer, mark1's small copy, nyk; Part 2's recap pic1; the chant board; the dare's metal frame).
- **EP17's two dare cards** (`ep17dare.js`, `DARE_PICS` empty until EP17's art is copied): along the stone table (cold, back), the
  pictures of Round 1's cards, small along the top in `answer`.
- **Pip's easel** (holdon) and **Momo's easel** (show, fix): low easels at the void deck's edge, left of the board.
- **The hen's nest**: under the low bush at the garden's edge (cliff; Part 2 place, waitw, pullout, eggans; recap pic3).
- **The lime plant**: in its big glazed pot at the garden's edge (Part 2 place, closure, liz).

### How the engine is set up
- Copied from `../ep15/` (the newest finished engine: the v2-cast lib.js with SIZE_K basil .94 and POSE_SUB worried -> thinking for Pip
  and Momo, one job per pose: reactPose only "thinking" after a real question, cheer only when learnt or `o.achieved`; common.js
  `gameScene`, `lizReveal`, `funFact`, `riders`, `chantScene`, `markScene`, `goals3`, `lockN`, `finalScene`, `nykScene`, `thought`;
  closer.js `lookCloser`, `lcStrip`, `lcPeekAuto` (faces listen; poses only via `peekEv`); shrink.js `youTag`, `feelTag`; song.js,
  render.js, finish.sh, bake.js; the QA tools pose_audit.js, faces_sheet.js/.py, make_preview.sh). EP15's scene art (home15.js,
  garden15.js, its p1/p2, tests.js, ep14dare.js) is NOT copied.
- `ep17dare.js`: EP17's two dare cards (a STUB until EP17's card art exists). `tests.js`: EP18 data and placeholders (`HIDDEN`, `CICADA`
  / `CICADA_R`, `BEE` / `BEE_R` (intro / reveal spots), `deckPH`, `gardenPH`, `lcPH`, `ringPH`, `smallPrint` + the four small-print
  rules, `SAMEC` / `DIFFC` / `WRIGC` / `MEALC`, `cmpChip`, `dots`, `ffPH` / `FF`).
- lib.js: EP18 `KW` (Part 1 SIMILARITIES, DIFFERENCES, OBSERVABLE CHARACTERISTICS; Part 2 REPEATED, NO FIRST OR LAST STAGE, PHYSICAL
  FEATURES; all `o.at`), `KWLINE`, `SHELF_HIDE` (+ lccompare, lcyoung, lcloop, lcbeetle), `OUTCOMES`, `learnAt` (kw_*, v_*, jfrog, jmosq,
  jagain, rewrite, plant). common.js: the chant `PHR`.
- Scores (p1.js / p2.js `SCORE`): Part 1 Round 1 1 : 0, HOLD ON! 2 : 0; Part 2 Round 1 1 : 1, Showdown 3 : 1.
- finish.sh's contact-sheet marks and compare_ep1.py's scenes already point at EP18; make_preview.sh's spans are still EP15's (set them
  after the render).
- Build: `./build_part.sh 1|2` (timeline, cues, song, render in 10 s chunks under the shared lock, finish.sh).

### Changed from the script's tables (one job per pose; SCENES_TODO is the one to follow)
- No pose during a buddy's own line (the talking sprite): Pip's "thinking, then pointing" inside k505, Momo's "pointing at each line"
  inside d802m, Basil's pointing inside k301b / k1004b / k1301b, Pip's pointing inside k807p: moved before or after the line, or dropped.
- Dropped as having no reason: Momo surprised and Pip waving in both games (the circle names the animal; waving is hello and goodbye
  only), Pip's counting fingers on the raindrop leaf (no painting; the dots count), Momo's surprise at the splash, Basil's peep, the
  clapping at both score hands, Pip waving at "Tell someone at home!" and Momo waving at Part 2's (not a goodbye: the part goes on), Basil
  "a sure hop" pose, Pip's oops in lcyoung (he was shy at k1003 seconds before), Momo's cheer after Mark Sentence 2 of Part 1, Pip's cheer
  after Mark Sentence 2 of Part 2 (each kept to about one strong pose a minute).
- Basil in Part 1 Round 1: the script's "a confident smile at first (his card is right)" is dropped: he is never confident for a wrong
  reason; he listens at `ansglow` and shows shy at k804.
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
            else: out.append(f"  - `{i}`: listeners: {LISTEN} (the automatic reaction in lib.js reactPose only where the line asks a question).")
    out += [f"- **Hidden animal:** {hid}", f"- **Life:** {life}", f"- **Light:** {light}", f"- **Sound (ambience and foley, on the marks):** {snd}"]
    mk = [f"`{k}` {fm(v)}" for k, v in sorted(marks.items(), key=lambda x: x[1]) if S["t0"] <= v < S["t1"]]
    if mk: out.append("- **Marks:** " + ", ".join(mk))
    if ids:
        out.append("- **Lines:**")
        for i in ids:
            x = L["lines"][i]; out.append(f"  - `{i}` {fm(x['t'])} {x['who'].upper()}: {x['text']}")
    return "\n".join(out) + "\n"
TITLES = {1: "Frog vs Mosquito: SAME or DIFFERENT? Count the Stages!", 2: "Which Came First, the Chicken or the EGG?"}
doc = [HDR]
for part, sc in ((1, P1), (2, P2)):
    L = json.load(open(f"{H}/tl_p{part}.json")); doc.append(f"\n## Part {part} · \"{TITLES[part]}\" · {fm(L['END'])}\n")
    for S in L["scenes"]:
        if S["name"] not in sc: doc.append(f"### {fm(S['t0'])} · `{S['name']}` · (no staging written: add it)\n"); continue
        doc.append(block(S["name"], sc, S, L, L["marks"]))
open(f"{H}/SCENES_TODO.md", "w").write("\n".join(doc)); print("SCENES_TODO.md", sum(len(x) for x in doc), "chars")
