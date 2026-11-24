// p1.js: PART 1, "Spin a Hanging Magnet. Why Does It Stop the SAME Way?": EP20's dare answered (two, the same way every time), be the
// hanging magnet (spun, slowing, swinging back, stopping facing the rain tree, twice), the answer and Basil's two cones, which way? (Pip: the
// steel goalpost; the same line in three places: FREELY SUSPENDED, NORTH-SOUTH DIRECTION; Mark Sentence 6.17), HOLD ON! (Basil: "nobody is
// holding it, so it is free": the bench rubs; hung up, it turns freely), how does it know? (fly up to see the whole Earth: EARTH BEHAVES
// LIKE A MAGNET; Mark Sentence 6.16), the swallow, the cliffhanger (Momo's compass needle lines up with the cones: is it a magnet?).
// Segments 1-13 of ../p3_ep21_script.md section 4 (version 1, 24 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP20's dare with its TWO cards (ep20dare.js), the title slam, the game
// as ONE smooth push-in onto the swallow (common.js gameScene), the goals read by Momo, the countdown, Round 1's lock-in with the dare's two
// cards and the clue labels on top of the ring, the two Mark Sentences (Basil, Pip), the LOOK-CLOSER frames (lcPH inside the real
// lookCloser), the journey's tags and riders, THE SPIN CHART's placeholder (tests.js spinChartPH: it fills on its marks), the North-South
// line (tests.js nsLine), the score hand, the swallow's smooth reveal with its fun-fact panel, the read-along, "Now you know!"). Every scene
// with new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 1 (Pip and Basil right: the Buddies score too), HOLD ON! 2 : 1 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m903", "one") - .1, 2, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
// Basil's bar magnet on its string (EP20's own hangingMagnet, ep20dare.js): spun at t0 it turns, slows, swings past the line and back, and
// stops with its red end the same way (0 degrees here) every time
const spinAng = (t, t0) => { const u = t - t0; return u < 0 ? 0 : 720 * (1 - Math.exp(-u / 1.1)) + 34 * Math.exp(-u / 1.4) * Math.sin(u * 4.2); };
const hang = (t, t0, x = 960, y = 640, k = .5) => TF(x, y, k, `<path d="M-260 0 H260" stroke="#9A6A3A" stroke-width="22" stroke-linecap="round"/>` + hangingMagnet(t, spinAng(t, t0)));
const chart = (t, x = 330, y = 760, k = .42) => spinChartPH(t, x, y, k);
const cone = (x, y, k = 1) => TF(x, y, k, `<path d="M-34 0 L-10 -80 H10 L34 0z" fill="${CONEC}" stroke="#A85A12" stroke-width="4"/><rect x="-44" y="-6" width="88" height="12" rx="4" fill="${CONEC}" stroke="#A85A12" stroke-width="4"/><path d="M-22 -40 H22" stroke="#fff" stroke-width="8"/>`);
const cones = (t, x = 960, y = 1000, k = .8) => t < MKS("cones") ? "" : cone(x - 170, y, k * spring(t, MKS("cones"), .4)) + cone(x + 170, y, k * spring(t, MKS("cones") + .3, .4)) + nsLine(t, MKS("cones") + .6, x - 170, y - 40, x + 170, y - 40, 26);

/* 1 · silent cold open: the school field on Tuesday after school; Basil's bar magnet hangs level on its string from the broom handle across
   two plastic chairs; Basil gives it a gentle spin (spin0) and steps back; Momo and Pip lean in (budsIn, back views); it turns, slows */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: the hanging magnet on the school field (no voice)", ["A SCHOOL FIELD in Singapore on Tuesday after school: green grass, a red running track, white goalposts, two floodlight poles with a wire between them, a netball court with two hoops, a sports shed, a chain-link fence, the school block behind, a big RAIN TREE at the far end (every leaf cluster on a twig, on a branch, on the trunk). By a WOODEN BENCH: two plastic chairs back to back with a wooden broom handle across them; Basil's red-and-blue bar magnet hangs level from it on a thin string. THE SPIN CHART beside it (three empty rows).",
  "MK spin0: Basil gives the magnet a gentle spin with one claw-tip and steps back; it turns, slows. MK budsIn: Momo and Pip lean in (back views), watching it turn. Pill: A school field, Singapore · Tuesday after school. The swallow on the wire between the floodlight poles (before the game). One slow push towards the turning magnet; no cut."])
  + hang(t, MK("spin0"), 960, 700, .55) + chart(t, 1640, 800, .36);

/* 2 · "Last time...": EP20's dare, word for word. ONE calm picture: the two dare cards side by side (EP20's own, ep20dare.js), a gentle
   push-in, the big ?, each card steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }, t)); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("m202", "where") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "where") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back on the school field: the magnet turning", ["The school field (the cold open's set): a slow drift round the hanging magnet, turning slowly on its string; the buddies big: Pip hides one paw behind his back, Basil a secret fist, Momo a sure little smile (no pose sprites: listening). Pill: Hold on to your answer! (wired). The swallow still on the floodlight wire (before the game). Full staging: SCENES_TODO.md."])
  + hang(t, s.t0 - 2.5, 960, 660, .5) + (t >= LT("m204") - .1 ? TF(960, 470, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed field: SPIN IT AGAIN AND AGAIN. (white) then WHERE DOES IT STOP? (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "SPIN IT AGAIN AND AGAIN.", "#fff", k1) + slamFit(610, "WHERE DOES IT STOP?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from the hanging magnet to THE SPIN CHART (its three empty rows, held about 2 s), then up to the floodlight
   wire; the game: ONE smooth push-in from the field straight onto the swallow on the wire (common.js gameScene). Stage 2: R.world = the
   drawn field, A = the swallow's spot in it (the INTRO spot: never used again). WIRED */
SC.today = (t, s) => phScene(t, s, "3 · Today: THE SPIN CHART on the field", ["The field: the camera glides from the hanging magnet to THE SPIN CHART (its three empty rows Spin 1 · Spin 2 · Spin 3, held about 2 s; MK chart: a bright two-note sting), then up to the floodlight wire (the game's push-in starts there).",
  "Basil big at the left (h ~480) by the chart, tapping it (showing it: no pose swap); Momo at the right; Pip mid-ground. The swallow on the floodlight wire (the intro spot; still before the game). Full staging: SCENES_TODO.md."])
  + (t >= MK("chart") ? chart(t, 960, 820, .4) : "") + HUD(t);
SC.game = (t, s) => gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => fieldPH(tt), A: SWALLOW, T: [680, 440], Z: 2.4, dim0: 0, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("m304"), LOOK_RULE);
SC.goals = (t, s) => goals3(t, s, [["A freely suspended magnet", ""], ["The North-South direction", ""], ["Earth is like a magnet", ""]], ["m401", "m402", "m403", "m404"], "momo");

/* 5 · Round 1: EP20's dare (a short 3 s ring). EP20's two cards as the ONE set of numbered picture cards; the clue labels a string · spin,
   spin, spin · free to turn ON TOP of the ring; the ring's picture: the magnet on its string, turning (EP20's hangingMagnet). Basil leads
   (worried through the countdown: lockN) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "where") + .15 * i]), lead: "basil", csize: 32, q: DARE_LABEL, tq: W(L1, "where") - .1,
  tc: [W(L1, "where"), W(L1, "stop")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1].map((i) => darePic(i, t)),
  obj: (tt) => TF(430, 330, .55, `<path d="M-200 0 H200" stroke="#9A6A3A" stroke-width="20" stroke-linecap="round"/>` + hangingMagnet(tt, tt * 140)),
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }] });

/* 6 · BE THE HANGING MAGNET (the journey; the buddies ride along, shrunk, on top of the magnet round the string's knot: common.js riders).
   Tags WIRED */
SC.waitw = ph("6 · Be the hanging magnet! (the glide down to the magnet)", "Pill Be the hanging magnet! The camera glides down to the magnet on its string. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The swallow on the edge of the sports shed's roof as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "6 · BE THE HANGING MAGNET (first person, present tense)", ["MK jspin: YOU are the bar magnet (your own red end at the bottom left, your blue end at the bottom right; the string goes up from your middle to the broom handle, a tall wooden beam high above). The field whirls round you (the goalposts, the school block, the rain tree). MK jfinger: a giant finger (an adult's, four fingers and a thumb) gives the push and FADES OUT COMPLETELY. MK jslow / jswing: the world slows; you swing past a faint dashed gold line on the grass far below, and back, each swing smaller. MK jback: soft gold ripples nudge you back (tag something turns you back). MK jstop: you stop: past your red end, the big rain tree. MK jagain: the finger spins you again; the world whirls, slows, swings. MK jstop2: you stop: the rain tree again (tag same way!); a counter spin 1 ✓ · spin 2 ✓.",
  "The three buddies ride along, shrunk (h ~170), sitting on top of you round the string's knot at the lower edges (riders). Calm pad, Heart soft. The camera IS the magnet: a spin, a slowing, a swing, a stop; never a cut. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jspin"), "You: a bar magnet on a string") + feelTag(t, MK("jfinger"), MK("jslow") - .2, "to scale: a bar magnet", 160) + feelTag(t, MK("jback"), MK("jstop") - .2, "something turns you back", 160)
  + feelTag(t, MK("jstop"), MK("jagain") - .2, "the rain tree", 160) + feelTag(t, MK("jstop2"), s.t1, "same way!", 160)
  + (t >= MK("jstop2") ? TF(1560, 300, spring(t, MK("jstop2") + .3, .45), tpill(0, 0, "spin 1 ✓ · spin 2 ✓", 32, "#fff", P.ink, { w: 700 })) : "")
  + riders(t, s, { tin: MK("jspin") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("6 · Pull back out to the field", "Whoosh out to the field, normal size (0.6 s): the magnet still, its red end towards the rain tree. The buddies pop back (a hop each).");

/* 7 · the answer: two, the same way every time. Basil (right) explains and sets two cones under the magnet's ends (cones). WIRED: EP20's two
   cards small along the top, the tick, THE SPIN CHART's arrows (chart1) */
SC.answer = (t, s) => ph("7 · The answer is two: the same way every time; the two cones", "The field: the bench and THE SPIN CHART at its HOME (left, about 40% of the frame high: the same in cold, today, answer, goal, holdon, earthq, cliff, nyk). EP20's two cards small along the top (wired): card 2 lights at ansglow; an x chip on card 1; the coins YOU +1 and BUDDIES +1 (two of three were right). MK chart1: an arrow lands in each row, all the same way, and the same way every time!. MK cones: Basil sets two orange PE cones on the grass, one under each end of the still magnet (the red end's cone towards the rain tree). Pip and Basil arms crossed (right, OUTCOMES, through the whole scene); Momo oops (wrong), shy until the scene ends. The swallow on the top of the chain-link fence (new spot).")(t, s)
  + [0, 1].map((i) => TF(810 + i * 300, 175, .42, dareCard2(i, { lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }, t))).join("")
  + tagAt(t, MK("ansglow") + .3, 810, 280, 1, "not this one", 26) + chart(t) + hang(t, -9, 1180, 640, .42) + cones(t, 1180, 1010, .7);

/* 8 · Pip's guess (the steel goalpost turns it), then [LOOK CLOSER] which way? the same magnet in three places (field, room, basin), the same
   line (sameline), named North and South (nsline); FREELY SUSPENDED (Momo) and NORTH-SOUTH DIRECTION (Basil) pop (lib.js o.at); the end
   tags (endN, endS); Mark Sentence 1 (Basil, 6.17) */
SC.goal = (t, s) => ph("8 · \"The goalpost turns it!\" (Pip at the magnet)", "The field: the bench and THE SPIN CHART (HOME, its three arrows); behind the hanging magnet, small, the white goalpost the red end happens to face; the two cones under it. Pip big at the left (h ~500) pointing past the magnet to the goalpost (talking, sure: his idea; thinking AFTER his line: a real question); Basil big at the right (h ~480); Momo mid-ground. A push along the magnet to the goalpost. The swallow on the goalpost's crossbar (new spot: in plain sight while Pip points there).")(t, s)
  + chart(t) + hang(t, -9, 1180, 640, .42) + cones(t, 1180, 1010, .7);
SC.lcplaces = (t, s) => lcPH(t, s, { title: "Which way? The same line in three places", v: "v_places", verdict: [`SAME LINE EVERY TIME: NORTH–SOUTH`, GOODC], fx: 1180, fy: 640,
  beats: [["field", "the field: the magnet on its string from the broom handle in the middle of the field, the goalpost small and far behind (far from the goalpost); it stops; a dashed gold line under it"], ["room", "the classroom: hung from a wooden ruler across two stacks of books on a plastic-topped table in the middle of the room; the window shows the rain tree (in the classroom); it stops along a parallel line"], ["basin", "the basin: a plastic basin of water on the floor, the magnet on a round plastic lid floating in it, turning slowly (floating on a lid); it stops along the same line"], ["sameline", "the three dashed lines glow together"], ["nsline", "one big dashed gold line runs across all three panels: N at the rain-tree end, S at the other (the same line every time)"], ["kw_freely_suspended", "FREELY SUSPENDED pops (sun yellow), lines to the string and the lid"], ["kw_north_south_direction", "NORTH–SOUTH DIRECTION pops, a line to the big dashed line"], ["endN", "tag this end faces North (by the red end)"], ["endS", "tag this end faces South (by the blue end)"]],
  notes: ["Three panels side by side, each filling a third, each with the magnet BIG, turning then stopping; the red end points the same way in all three (match it to the window's view of the rain tree). Then one big N – S line across all three. The arrows of THE SPIN CHART are wiped and rewritten as the field · the classroom · the basin (seen when the panel eases back).",
    "A buddy's FACE peeks in from a lower corner: Pip first (thinking: his goalpost idea is tested; OOPS as the field magnet stops far from the goalpost and SHY to the verdict, a small nod at the verdict: the 23 Nov rule), Basil (surprised as all three stop on one line), Momo (teaching FREELY SUSPENDED, pointing at the string, then the lid; cheer: her first this part), Basil (teaching NORTH–SOUTH DIRECTION; a big smile and a nod: he cheers at his Mark Sentence)."],
  over: (tt) => nsLine(tt, MKS("nsline"), 300, 820, 1620, 820, 34) + (tt >= MKS("endN") ? TF(380, 900, spring(tt, MKS("endN"), .45), tpill(0, 0, "this end faces North", 28, NSC, "#fff", { w: 700 })) : "") + (tt >= MKS("endS") ? TF(1540, 900, spring(tt, MKS("endS"), .45), tpill(0, 0, "this end faces South", 28, NSC, "#fff", { w: 700 })) : "") });
SC.mark1 = (t, s) => markScene(t, s, { id: "m809", sayId: "m808", who: "basil", n: "1 of 2", text: "A freely suspended magnet comes to rest in the North-South direction.", keys: ["freely", "suspended", "magnet", "comes", "rest", "North-South", "direction"], size: 66, y: 250, footer: FOOT, achieved: true, poses: [[LE("m809") + .2, "cheer"], [LE("m809") + 2.0, "sit"]] });

/* 9 · HOLD ON! Basil: "nobody is holding it, so it is free" (Stage 2: model ../ep16/p1.js SC.holdon and ../ep20's HOLD ON!: the HOLD ON!
   stamp, the YOU ring 5 s with crossed arms, the clue labels on the bench · nobody holding it · free? ON TOP of the ring, the bell, the coin;
   then Pip hangs it back up (hangup): it turns freely and stops on the cones' line (freeturn)) */
SC.holdon = ph("9 · HOLD ON! Basil: \"nobody is holding it, so it is free\"", "MK tangle: Basil holds up a tangled knot of string (a funny tangle). MK try: he lays the magnet flat on the WOODEN BENCH and spins it with a claw-tip: it scrapes round and stops; again: another way; a third time: another way. Three small chalk arrows on the bench, three different ways. His note card on THE SPIN CHART's tray: On the bench: a different way every time!. The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with the magnet on the bench as its picture and the clue labels on the bench · nobody holding it · free? on top; only Basil at the side (thinking: Heart's line is a question to him). After the bell (m903), Basil OOPS (shy) through the WHOLE fix; Pip and Momo arms crossed through it. MK rubs: a magenta chip on the bench the bench rubs: not free to turn. MK hangup: Pip untangles the string, ties it round the magnet's middle and hangs it back from the broom handle; MK freeturn: it turns freely, slows, and stops along the cones' line again (green chip free to turn!; a soft settle chime and a gentle camera nudge as it stops). The swallow on the handle of the PE equipment trolley by the sports shed (new spot); not in the ring.");
const holdon0 = SC.holdon; SC.holdon = (t, s) => holdon0(t, s) + smallPrint(t, MK("try"), PHONE_RULE) + ppChip(t, MKS("rubs") + .3, 600, 640, 1, "the bench rubs: not free to turn") + ppChip(t, MKS("freeturn") + .3, 1300, 640, 0, "free to turn!")
  + chart(t) + (t >= MKS("hangup") ? hang(t, MKS("hangup") + .6, 1180, 680, .42) : "") + cones(t, 1180, 1010, .7);

/* 10 · Momo's question (how does it know?), Basil's half-right guess, then [LOOK CLOSER] fly up until you see the whole Earth (up, earth);
   little hanging magnets all over the world come to rest North-South (everywhere); EARTH BEHAVES LIKE A MAGNET pops (lib.js o.at) with its
   own North and South poles (poles2); Basil says what it means; the small Earth on THE SPIN CHART (chartEarth); Mark Sentence 2 (Pip, 6.16) */
SC.earthq = ph("10 · \"How does the magnet know?\" (Momo at the magnet)", "The field: the magnet on its string between the cones, THE SPIN CHART (HOME). Momo big at the left (h ~500) looking from the magnet to the sky (talking, then thinking AFTER her line: a real question); Basil big at the right (h ~480) (talking, a bold paw up: his guess); Pip mid-ground. Push in on the still magnet. The swallow on the top edge of THE SPIN CHART's frame (new spot).");
const earthq0 = SC.earthq; SC.earthq = (t, s) => earthq0(t, s) + chart(t) + hang(t, -9, 1180, 640, .42) + cones(t, 1180, 1010, .7);
SC.lcearth = (t, s) => lcPH(t, s, { title: "How does it know? Fly up and see the whole Earth", v: "v_earth", verdict: [`THE EARTH TURNS IT: NO TOUCHING`, GOODC], fx: 1180, fy: 600,
  beats: [["up", "from Basil's magnet the view rises in ONE smooth move: the field and its cones, the school, the HDB blocks, the whole of Singapore (a small green island), the sea, Malaysia above it"], ["earth", "the whole round EARTH in dark space fills the panel: North at the top, South at the bottom (white place words); blue seas, green and sand-brown land, white cloud; NO red or blue patches, nothing inside it"], ["everywhere", "little hanging magnets pop on, one after another: Singapore (labelled), Japan, Australia, Africa, South America, the United States; each turns, then comes to rest along a faint line from North to South (red ends all towards North); soft gold ripples from the Earth to each (interacts)"], ["kw_earth_behaves_like_a_magnet", "EARTH BEHAVES LIKE A MAGNET pops beside the Earth"], ["poles2", "its own North and South poles under it, two thin lines to the top and bottom of the Earth"], ["chartEarth", "ease back: the small Earth drawn at the bottom of THE SPIN CHART with Why? Earth behaves like a magnet"]],
  notes: ["NEVER said or drawn: which magnetic pole of the Earth is where, red or blue on the Earth, a bar magnet inside it (the teacher's caution, script Facts to check 1). No little magnets near the poles (they dip there). Ripples, not arrows or field lines.",
    "A buddy's FACE peeks in from a lower corner: Momo first (thinking: her question is answered; eyes wide as the whole Earth appears: listening, no pose swap), at EARTH BEHAVES LIKE A MAGNET Basil surprised (his wild guess was close) and Momo cheer (a key word learnt; over a minute after her last), then Basil talking (teaching what it means, pointing from the Earth to Singapore's little magnet), a big smile after."] });
SC.mark2 = (t, s) => markScene(t, s, { id: "m1008", sayId: "m1007", who: "pip", n: "2 of 2", text: "Earth behaves like a magnet with its own North and South poles. It interacts with a freely suspended magnet. This causes the freely suspended magnet to always point in the North-South direction.", keys: ["Earth", "behaves", "like", "its", "own", "North", "South", "poles.", "interacts", "always", "point", "North-South", "direction."], size: 50, y: 225, footer: FOOT, achieved: true, poses: [[LE("m1008") + .2, "cheer"], [LE("m1008") + 2.0, "sit"]] });

/* 11 · score hand, the swallow (lizReveal: the score hand melts into the field, ONE push-in onto the swallow perched on the rim of the netball
   hoop (the REVEAL spot, never the intro floodlight wire); Basil's fun-fact panel: a map of Asia with a dotted route of little swallows from
   the far north to Singapore (ff_map), a small glowing Earth with a tiny swallow over it (ff_earth), a swallow flying beside a tiny compass
   rose (ff_way)) */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, fieldPH(t, SWALLOW_R), SWALLOW_R[0], SWALLOW_R[1], tq, "It was on the netball hoop!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "m1104",
    fact: { id: "m1103b", at: [1300, 560], w: 960, h: 420, items: FF([["ff_map", "from far away", "DRAW: a map of Asia with a dotted route of little swallows flying from the far north down to Singapore"], ["ff_earth", "they feel the Earth's magnet", "DRAW: a small Earth with a soft glow and a tiny swallow over it (no red or blue on the Earth)"], ["ff_way", "it helps them find the way", "DRAW: a swallow flying, a tiny compass rose beside it"]]) } }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Momo holds her clear hiking compass flat over the cones (compass); its needle swings, slows and settles along the
   cones' line, red end towards the rain tree; a big ? by the needle (qneedle); PART 2 */
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1; return phScene(t, s, "12 · The cliffhanger: is the needle a magnet?", ["The field: the cones, the hanging magnet, THE SPIN CHART (HOME). MK compass: Momo holds her clear hiking compass flat over the cones; its thin red-and-white needle swings, slows, and settles along the cones' line, red end towards the rain tree (a dashed gold line from the needle to the cones). MK qneedle: a big ? pops by the needle. Momo big at the left (h ~500) with the compass (pointing at the needle before her line, thinking after it: her own question); Basil and Pip at the right, watching the needle (front views turned in). A push from Momo's paws to the needle. Small print Keep magnets away from phones and compasses. PART 2 slams in (wired)."])
  + TF(960, 900, .5, compassPH(settle(t, MKS("compass"), 110, 1.0, 5), 0)) + cones(t, 960, 1040, .5) + qMark(t, MK("qneedle") + .2, 1130, 820)
  + smallPrint(t, s.t0 + .3, PHONE_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 13 · "Now you know!": THE SPIN CHART and the hanging magnet over its cones between the buddies (Stage 2: draw them; the placeholders now) */
SC.nyk = (t, s) => nykScene(t, s, spinChartPH(t, 760, 800, .42) + hang(t, -9, 1180, 700, .36) + cones(t, 1180, 1020, .55), { bx: [230, 1720, 1420], hx: 470 });
})(); }
