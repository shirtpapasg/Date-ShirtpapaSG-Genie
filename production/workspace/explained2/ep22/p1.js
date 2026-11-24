// p1.js: PART 1, "Stroke an Iron Nail Again and Again. Is It a MAGNET Now?": EP21's dare answered (two, the nail attracts the clips),
// be the iron nail (stroked head to tip, lifted up and away, again and again; carried to the clips, they jump up), the answer and STROKE
// METHOD (Basil), was it a magnet already? (Pip: iron nails always attract steel clips; a new nail over still clips; a magnet pulls it but it
// is not a magnet; Pip's nail with the magnet shut away: MAGNETISED; right card, wrong reason: no point; Mark Sentence 7.1), HOLD ON! (Basil
// tests his one-stroke nail with the magnet still in his paw; the book's step 4 on a strip), what can be magnetised? (copper wire, foil, a
// chopstick, a steel screwdriver: MAGNETIC OBJECT; Mark Sentence 7.2), the woodpecker, the cliffhanger (Basil's fast way: back and forth,
// both ends). Segments 1-13 of ../p3_ep22_script.md section 4 (version 1, 24 Nov 2026).
// STAGE 1 (setup): the shared routines are WIRED (the calm recap of EP21's dare with its TWO cards (ep21dare.js), the title slam, the game
// as ONE smooth push-in onto the woodpecker (common.js gameScene), the goals read by Pip, the countdown, Round 1's lock-in with the dare's two
// cards and the clue labels on top of the ring, the two Mark Sentences (Basil, Pip), the LOOK-CLOSER frames (lcPH inside the real
// lookCloser), the journey's tags and riders, OUR FISHING GAME's placeholder (tests.js fishBoardPH: it fills on its marks), the book strip
// 7.2 step 4 (common.js bookCaption), the score hand, the woodpecker's smooth reveal with its fun-fact panel, the read-along, "Now you
// know!"). Every scene with new art is a phScene placeholder. STAGE 2 (Fable) draws them: SCENES_TODO.md has the full staging per scene and line.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 0 (only Basil right for the right reason: Pip's card 2 had the wrong reason, so the Buddies do
// not score; a grey ? by the BUDDIES pill until the no-point pill), HOLD ON! 2 : 0 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("m903", "one") - .1, 2, 0]);
const FOOT = "P3 · Making and Using Magnets · The stroke method";
const ph = (title, ...notes) => (t, s) => phScene(t, s, title, notes.concat(["Full staging: SCENES_TODO.md."])) + HUD(t);
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const board = (t, x = 1620, y = 700, k = .5) => fishBoardPH(t, x, y, k);
// Pip's stroking at the folding table (stroke0 on): the magnet's red end slides head to tip, lifts up and away in an arc, back to the head;
// one stroke every 1.4 s. Returns the magnet and the green / gold stroke marks over a nail at (x, y), scale k
const stroking = (t, t0, x, y, k = .6, n = 3) => { const u = t - t0; if (u < 0) return nailArt(x, y, k);
  const i = Math.min(n - 1, Math.floor(u / 1.4)), p = u >= n * 1.4 ? 1 : (u % 1.4) / 1.4, slide = p < .55 ? p / .55 : 1, lift = p < .55 ? 0 : (p - .55) / .45;
  const mx = lerp(-150, 150, slide) * k + lerp(0, -300 * k, lift), my = -40 * k - Math.sin(lift * Math.PI) * 150 * k;
  return nailArt(x, y, k) + strokeArrow(t, t0 + i * 1.4, x - 140 * k, y + 40 * k, x + 140 * k, y + 40 * k, 8) + liftArc(t, t0 + i * 1.4 + .75, x + 150 * k, y - 50 * k, x - 150 * k, y - 50 * k, 120 * k, 6)
    + (u < n * 1.4 ? TF(x + mx + 80 * k, y + my - 30 * k, k * .7, bar20(t, { glint: false }), -20) : "") + TF(x - 260 * k, y - 120 * k, .7, tpill(0, 0, `stroke ${i + 1}`, 26, "#fff", P.ink, { w: 700 })); };

/* 1 · silent cold open: the hardware shop at an HDB neighbourhood centre on Saturday morning; Pip strokes an iron nail at the wooden folding
   table outside (stroke0: three strokes, each the same way); Basil and Momo lean in (budsIn, front views turned in); the clipboard empty */
SC.cold = (t, s) => phScene(t, s, "1 · Cold open: Pip strokes a nail outside the hardware shop (no voice)", ["A HARDWARE SHOP at an HDB neighbourhood centre on Saturday morning: the shop front on the five-foot way (coils of rope, stacked pails, a tall rack of brooms and mops with their wooden handles up, garden hoses, a wall of small wooden drawers NAILS · SCREWS · HOOKS, a wind chime, the cash counter inside; a plain sign HARDWARE). Outside: a WOODEN FOLDING TABLE, three plastic stools. Across the walkway the square: a big ANGSANA TREE (every leaf on a twig, on a branch, on the trunk), a wooden pergola, a wooden notice board, a frangipani tree by the shop, HDB blocks behind. On the table: a small brown paper bag of iron nails, Basil's bar magnet, a shallow tray of steel paper clips, OUR FISHING GAME on its little easel (boxes empty).",
  "MK stroke0: Pip strokes an iron nail with the magnet's red end from the flat head to the sharp tip, lifts the magnet up and away in an arc, comes back to the head (three strokes, the same way). MK budsIn: Basil and Momo lean in (front views turned in). Pill: A hardware shop, an HDB neighbourhood centre, Singapore · Saturday morning. Small print: Nails are sharp. The woodpecker on the angsana trunk (before the game). One slow push towards Pip's stroking paw; no cut."])
  + stroking(t, MK("stroke0"), 960, 720, .6) + clipTray(1240, 860, .6) + board(t, 1640, 760, .36) + smallPrint(t, s.t0 + .4, NAIL_RULE);

/* 2 · "Last time...": EP21's dare, word for word. ONE calm picture: the two dare cards side by side (EP21's own, ep21dare.js), a gentle
   push-in, the big ?, each card steps forward and lights while Heart says it (>= 2.5 s each). WIRED */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) }, t)); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("m202", "what") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + HUD(t); };
SC.back = (t, s) => phScene(t, s, "2 · Back at the hardware shop's table: Pip's nail over the clips", ["The folding table (the cold open's set): Pip holds the stroked nail by its head, above the tray of clips (not yet lowered); a slow drift round the nail that continues under the title. Pip hides the nail behind his back (a secret), Basil a secret fist, Momo a sure little smile (no pose sprites: listening). Pill: Hold on to your answer! (wired). The woodpecker still on the angsana trunk (before the game). Full staging: SCENES_TODO.md."])
  + nailArt(960, 640, .6) + clipTray(960, 860, .7) + (t >= LT("m204") - .1 ? TF(960, 470, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 40, P.sun, P.ink, { w: 700 })) : "");
// the title slam over the dimmed table: STROKE IT AGAIN AND AGAIN. (white) then IS IT A MAGNET NOW? (sun yellow). WIRED
const TITLE = (k1, k2) => slamFit(400, "STROKE IT AGAIN AND AGAIN.", "#fff", k1) + slamFit(610, "IS IT A MAGNET NOW?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from Pip's nail to OUR FISHING GAME (board: held about 2 s; rods: 3 rods · 1 magnet! glows), then on up to
   the angsana tree; the game: ONE smooth push-in from the square straight onto the woodpecker on the trunk (common.js gameScene). Stage 2:
   R.world = the drawn neighbourhood centre, A = the woodpecker's spot in it (the INTRO spot: never used again). WIRED */
SC.today = (t, s) => phScene(t, s, "3 · Today: OUR FISHING GAME on the folding table", ["The table: the camera glides from Pip's nail to OUR FISHING GAME on its little easel (MK board: a bright two-note sting; held about 2 s): Friday's class party, a paper fish with a steel clip on its nose and a rod, 3 rods · 1 magnet!, three empty boxes Rod 1 · Rod 2 · Rod 3, Which can be magnetised? with five empty tick boxes. MK rods: 3 rods · 1 magnet! glows as Momo says three. Then on up to the angsana tree (the game's push-in starts there).",
  "Momo big at the left (h ~500) by the clipboard (talking; pointing at 3 rods · 1 magnet! AFTER her line); Basil at the right (h ~480 x0.88); Pip mid-ground. The woodpecker on the angsana trunk (the intro spot; still before the game). Full staging: SCENES_TODO.md."])
  + (t >= MKS("board") - .3 ? board(t, 1300, 640, .55) : "") + (t >= MKS("rods") ? TF(1370, 360, spring(t, MKS("rods"), .4), tpill(0, 0, "3 rods · 1 magnet!", 30, "#D84A3A", "#fff", { w: 700 })) : "") + HUD(t);
SC.game = (t, s) => gameScene(t, s, ["m303", "m304b", "m305"], false, { world: (tt) => shopPH(tt), A: WOODPECKER, T: [680, 440], Z: 2.4, dim0: 0, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("m305"), LOOK_RULE);
SC.goals = (t, s) => goals3(t, s, [["What magnetised means", ""], ["How to test the nail", ""], ["What can be magnetised", ""]], ["m401", "m402", "m403", "m404"], "pip");

/* 5 · Round 1: EP21's dare (a short 3 s ring). EP21's two cards as the ONE set of numbered picture cards; the clue labels an iron nail ·
   stroked again and again · the same way ON TOP of the ring; the ring's picture: Pip's paw holding the nail by its head over the tray, a
   curved arrow showing the strokes. Basil leads (worried through the countdown: lockN). Momo's pick: the magnet drawn small moving away
   (away); Basil's pick: the uncle's screwdriver with a tiny screw on the shop's counter (uncle) */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .15 * i]), lead: "basil", csize: 32, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1].map((i) => darePic(i, t)),
  obj: (tt) => nailArt(430, 420, .55) + liftArc(tt, -9, 520, 380, 340, 380, 90, 6) + clipTray(430, 560, .55),
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }] })
  + (t >= MKS("away") && t < LE("m503m") + .4 ? TF(560, 640, spring(t, MKS("away"), .4), `<g transform="translate(${n2(-120 * ramp(t, MKS("away"), 1.2))} 0)">${TF(0, 0, .35, bar20(t, { glint: false }))}</g>` + nailArt(40, 70, .3)) : "")
  + (t >= MKS("uncle") && t < LE("m505b") + .4 ? TF(1420, 640, spring(t, MKS("uncle"), .4), tpill(0, -70, "the uncle's screwdriver", 24, "#fff", P.ink, { w: 700 }) + `<rect x="-90" y="-10" width="120" height="20" rx="6" fill="#C9D1D8" stroke="${P.ink}" stroke-width="3"/><rect x="30" y="-18" width="70" height="36" rx="12" fill="#E8B020" stroke="${P.ink}" stroke-width="3"/>` + T(-110, 40, "(a tiny screw on its tip)", 18, P.ink, { w: 500 })) : "");

/* 6 · BE THE IRON NAIL (the journey; the buddies ride along, shrunk, on the table beside your flat head: common.js riders). Tags WIRED */
SC.waitw = ph("6 · Be the iron nail! (the glide down to a nail on the table)", "Pill Be the iron nail! The camera glides down to a fresh nail lying on the wooden table. The buddies wave the viewer off (goodbye), then shrink (a pop each) and follow. The shelf slides aside. The woodpecker on a branch of the frangipani tree by the shop's door, as the camera passes (new spot).");
SC.shrink = (t, s) => phScene(t, s, "6 · BE THE IRON NAIL (first person, present tense)", ["MK jlie: YOU are the iron nail (your own long grey body stretches away along the table to your sharp tip far ahead; your flat head under the bottom of the frame; the wood grain a wide brown field; the tray of steel clips a range of silver loops far off). MK jstroke: a giant red block comes down from above (the red half of Basil's bar magnet, white N; held by a giant adult's hand, four fingers and a thumb) and lands on your head (MK jhead). MK jslide: it slides ALL the way along you to your tip (a gold streak; tag one way; MK jtip: the tip). MK jlift: it lifts up and away in a big curve (a dotted gold arc; tag lift up and away); MK jback: down on your head again. MK jagain: again and again (a counter stroke 1 · 2 · 3; never sliding back). MK jcarry: the hand puts the magnet away (it FADES OUT COMPLETELY: into its box), picks you up by your head and carries you low over the tray. MK jclips: the clips shiver, tip up and JUMP, clinging to your tip, one hanging from another (tag clips jump up!).",
  "The three buddies ride along, shrunk (h ~170), sitting on the table beside your head at the lower edges (riders), ducking as the giant magnet whooshes over; when the hand lifts you, they hold on to the rim of your flat head. Calm pad, Heart soft. The camera IS the nail: never a cut. Full staging: SCENES_TODO.md."])
  + youTag(t, MK("jlie"), "You: an iron nail") + feelTag(t, MK("jlie") + .8, MK("jstroke") - .2, "to scale: an iron nail", 160) + feelTag(t, MK("jslide"), MK("jlift") - .2, "one way", 160)
  + feelTag(t, MK("jlift"), MK("jagain") - .2, "lift up and away", 160) + feelTag(t, MK("jclips"), s.t1, "clips jump up!", 160)
  + (t >= MK("jagain") && t < MK("jcarry") ? TF(1560, 300, spring(t, MK("jagain"), .45), tpill(0, 0, "stroke " + Math.min(3, 1 + Math.floor((t - MK("jagain")) / 1.2)), 32, "#fff", P.ink, { w: 700 })) : "")
  + riders(t, s, { tin: MK("jlie") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] } });
SC.pullout = ph("6 · Pull back out to the table", "Whoosh out to the table, normal size (0.6 s): Pip holding his nail by its head, a little bunch of clips hanging from its tip; the magnet in its small box, the lid shut. The buddies pop back (a hop each).");

/* 7 · the answer: two, the nail attracts the clips. Only Basil was right for the right reason: YOU +1, a grey ? by the BUDDIES pill (Pip's
   reason is tested next). Basil explains and names STROKE METHOD (lib.js o.at). WIRED: EP21's two cards small along the top, the tick, the
   clipboard's Rod 1 box (rod1) */
SC.answer = (t, s) => ph("7 · The answer is two: the nail attracts the clips; STROKE METHOD", "The table, OUR FISHING GAME at its HOME (the right end of the table, about 40% of the frame high: the same in today, answer, pipclaim, holdon, lcq2, cliff, nyk). EP21's two cards small along the top (wired): card 2 lights at ansglow; an x chip on card 1. The coin YOU +1; by the BUDDIES pill a small grey ? chip (wired: Pip's reason is tested next). MK rod1: Pip's nail drawn in the Rod 1 box with attracts clips ✓. Basil big at the left (h ~480 x0.88) (arms crossed: right, OUTCOMES, to the end of the scene; talking, miming one stroke in the air before his line); Pip big at the right (h ~500) holding his nail with its clips (a pleased little smile: his reason is not tested yet, no pose swap); Momo mid-ground (oops: wrong, OUTCOMES, shy until the end of Mark Sentence 1). STROKE METHOD pops on Basil's line. The woodpecker on top of the wooden notice board (new spot).")(t, s)
  + [0, 1].map((i) => TF(810 + i * 300, 175, .42, dareCard2(i, { lit: i === 1 && t >= MK("ansglow") ? 1 : 0 }, t))).join("")
  + tagAt(t, MK("ansglow") + .3, 810, 280, 1, "not this one", 26) + chipAt(t, MK("coin1") + .2, 1720, 150, NOPTC, "?", 30)
  + board(t) + nailArt(1080, 640, .5) + clipsHang(t, 1080 + 75, 640, 3, .9);

/* 8 · Pip's claim (iron nails always attract steel clips), then [LOOK CLOSER] was it a magnet already? a new nail from the same bag (new)
   over still clips (still); Basil's magnet pulls it (pull), but it is not a magnet (notmag); the magnet shut away in its box (boxed); Pip's
   nail over the tray: the clips jump (pipjump); MAGNETISED pops on Heart's word (lib.js o.at); the verdict; the grey no-point pill by the
   BUDDIES score (nopoint); Mark Sentence 1 (Basil, 7.1) */
SC.pipclaim = ph("8 · \"Iron nails always attract steel clips!\" (Pip at the table)", "The table, OUR FISHING GAME (HOME, Rod 1 filled). Pip big at the left (h ~500) holding up his nail with its clips (talking, sure: his idea; thinking AFTER his line: Heart is about to test it); Basil big at the right (h ~480 x0.88); Momo mid-ground, still shy. A push in on Pip's nail. The woodpecker on a post of the wooden pergola in the square (new spot).");
const pipclaim0 = SC.pipclaim; SC.pipclaim = (t, s) => pipclaim0(t, s) + board(t) + nailArt(760, 640, .5) + clipsHang(t, 760 + 75, 640, 3, .9);
SC.lcnail = (t, s) => lcPH(t, s, { title: "Was it a magnet already? A new nail, and Pip's nail", v: "v_magnetised", verdict: [`STROKED: NOW IT IS A MAGNET`, GOODC], fx: 760, fy: 640,
  beats: [["new", "a paw takes a NEW nail out of the paper bag (tag a new nail: not stroked) and holds it by its head over the tray"], ["still", "nothing moves: a long, still hold; the magnifier shows a gap between the tip and the nearest clip (no clips)"], ["pull", "Basil's bar magnet comes close: the new nail swings and clicks onto its red end (a magnetic material: attracted to a magnet)"], ["notmag", "taken off, held over the clips again: still nothing (but not a magnet)"], ["boxed", "the magnet goes into its small box at the far end of the table and the lid shuts (the magnet is away)"], ["pipjump", "Pip's stroked nail over the tray: the clips shiver and JUMP, clinging to its tip (the magnifier on the bunch; clips!)"], ["kw_magnetised", "MAGNETISED pops; a gold magnetised tag points to Pip's nail (the SAME grey as the new nail)"], ["v_magnetised", "the verdict"], ["nopoint", "the grey pill right card, wrong reason: no point by the BUDDIES score"]],
  notes: ["Three beats, each filling the panel in turn: the new nail over still clips; the magnet pulling the new nail; Pip's nail with the magnet shut away. A magnifier circle on the tip and the clips. Pip's nail and the new nail are the SAME grey (being magnetised does not show; only the clips do). No number of clips is ever drawn as a number.",
    "A buddy's FACE peeks in from a lower corner: Pip first (thinking: his idea is tested; OOPS from `still` and SHY to the end of Mark Sentence 1, a small nod at the verdict and at the no-point pill: the 23 Nov rule), Basil (a small nod, eyes wide at the click; teaching MAGNETISED, pointing at Pip's nail; a big smile and a nod: he cheers at his Mark Sentence)."],
  over: (tt) => chipAt(tt, MKS("kw_magnetised") + 2.2, 1160, 760, MAGC, "magnetised", 30) + chipAt(tt, MKS("nopoint"), 1560, 150, NOPTC, "right card, wrong reason: no point", 26) });
SC.mark1 = (t, s) => markScene(t, s, { id: "m809", sayId: "m808", who: "basil", n: "1 of 2", text: TL.lines.m809.text, keys: ["magnetic", "object", "becomes", "magnet,", "magnetised."], size: 64, y: 250, footer: FOOT, achieved: true, poses: [[LE("m809") + .2, "cheer"], [LE("m809") + 2.0, "sit"]] });

/* 9 · HOLD ON! Basil tests his one-stroke nail with the magnet still in his paw (Stage 2: model ../ep16/p1.js SC.holdon and ../ep21's HOLD
   ON!: the HOLD ON! stamp, the YOU ring 5 s with crossed arms, the clue labels one stroke · the magnet is still here · where are the clips?
   ON TOP of the ring, the bell, the coin; then Pip points at the clips on the magnet (onmag), shuts the magnet in its box (boxit), the green
   chip on the clipboard (chipfar); the book's step 4 on a cream strip (strip: WIRED bookCaption) */
SC.holdon = ph("9 · HOLD ON! Basil tests his nail with the magnet still in his paw", "MK try: Basil grabs a new nail, gives it ONE quick stroke with the red end, and with the bar magnet STILL in his other paw dips both towards the tray at once. MK jumpmag: a bunch of clips jumps up and clings to the MAGNET's red end (drawn clearly: the clips hang from the magnet, the nail's tip is bare beside it). His note card on the clipboard's Rod 2 box: 1 stroke: done! (wired). The HOLD ON! stamp; the YOU ring (5 s, crossed arms) big and central with Basil's two paws over the tray as its picture and the clue labels one stroke · the magnet is still here · where are the clips? on top; only Basil at the side (thinking: Heart's line is a question to him). After the bell (m903), Basil OOPS (shy) through the WHOLE fix and the strip; Pip and Momo arms crossed through it. MK onmag: a magenta chip the clips are on the magnet!. MK boxit: Pip takes the magnet gently from Basil's paw and shuts it in its box at the far end of the table (the lid claps; the magnet is gone from the shot); a small jolt and a clink as the clips come off into the tray. MK chipfar: the green chip on the clipboard Test it with the magnet far away! (wired). MK strip: the cream strip 7.2 step 4 across the lower third (wired). As the lid claps, a big close-up of Momo's face, a nod and a smile. The woodpecker on top of a stack of wooden pallets beside the shop (new spot); not in the ring.");
const holdon0 = SC.holdon; SC.holdon = (t, s) => holdon0(t, s) + smallPrint(t, MK("try"), PHONE_RULE) + board(t) + chipAt(t, MKS("onmag") + .3, 640, 560, "#D9468F", "the clips are on the magnet!")
  + (t < MKS("boxit") + .3 ? TF(820, 700, .45, bar20(t, { glint: false })) + clipsHang(t, 820 - 70, 720, t >= MKS("jumpmag") ? 3 : 0, .9) : magBox(t, 1180, 880, .45, 1)) + nailArt(1000, 700, .45)
  + (t >= MKS("strip") ? stripTwo(t) : "");
// the cream strip 7.2 step 4 (two sentences): two lines, the words appearing as Heart says them (bookCaption, off = the second sentence's first word)
const stripTwo = (t) => { const tx = TL.lines.m905s.text, a = tx.slice(0, tx.indexOf(". ") + 1), b = tx.slice(tx.indexOf(". ") + 2);
  return bookCaption(t, "m905s", a, 860, { size: 38, keys: ["test", "near", "steel", "clips."] }) + bookCaption(t, "m905s", b, 960, { size: 38, off: a.split(" ").length, keys: ["attracts", "steel", "clips."] }); };

/* 10 · Momo's idea (stroke anything enough and it becomes a magnet), then [LOOK CLOSER] four things (things), checked first (check), each
   stroked the same way (stroke), the magnet away (away2), tested (test: only the steel screwdriver); steel is a magnetic material (steel);
   MAGNETIC OBJECT pops (lib.js o.at); the clipboard list ticked (list, seen as the panel eases back); Mark Sentence 2 (Pip, 7.2) */
SC.lcq2 = ph("10 · \"Even my wooden chopstick!\" (Momo with four things)", "The table, OUR FISHING GAME (HOME, its Which can be magnetised? list empty). Momo has brought four things from the shop and the provision shop next door, laid in a row with name tags: a coil of thin COPPER WIRE, a folded strip of ALUMINIUM FOIL, a WOODEN CHOPSTICK, a new STEEL SCREWDRIVER. MK chop: she holds up the chopstick. Momo big at the left (h ~500) with the four things (talking, sure: her idea; thinking AFTER her line: she is about to test it); Pip big at the right (h ~500); Basil mid-ground. A push along the row. The woodpecker on the edge of the wooden planter box by the walkway (new spot).");
const lcq20 = SC.lcq2; SC.lcq2 = (t, s) => lcq20(t, s) + board(t) + smallPrint(t, s.t0 + .3, NAIL_RULE);
SC.lcthings = (t, s) => lcPH(t, s, { title: "What can be magnetised? Copper, foil, wood, steel", v: "v_only", verdict: [`ONLY MAGNETIC OBJECTS CAN BE MAGNETISED`, GOODC], fx: 760, fy: 760,
  beats: [["things", "the four things FILL the panel as four tall columns, each with its name big at the top (copper wire · aluminium foil · wooden chopstick · steel screwdriver), the tray of steel clips along the bottom"], ["check", "each held over the clips in turn: nothing (a small grey no clips under each)"], ["stroke", "the magnet's red end strokes each one from end to end, lifting away, the same way (a counter the same number of strokes ticks the same in every column)"], ["away2", "the magnet goes into its box (the magnet is away)"], ["test", "each lowered over the clips again: copper x, foil x, chopstick x; the screwdriver's steel tip: the clips jump up and cling (green tick, clips!; the magnifier on its tip)"], ["steel", "a chip iron and steel: magnetic materials with lines to the screwdriver and to Pip's nail (small at the side)"], ["kw_magnetic_object", "MAGNETIC OBJECT pops, lines to the screwdriver and the nail"], ["v_only", "the verdict"]],
  notes: ["The screwdriver is NEW and checked first (no clips before stroking); the strokes run along its steel shaft to the tip. Copper orange-brown, the foil silver and crinkled, the chopstick plain wood. As the panel eases back: the clipboard's list ticked (iron nail ✓ · steel screwdriver ✓ · copper wire ✗ · aluminium foil ✗ · wooden chopstick ✗) at `list`.",
    "A buddy's FACE peeks in from a lower corner: Momo first (thinking: her idea is tested; OOPS from `test` as the chopstick attracts no clips, SHY to the end of Mark Sentence 2: the 23 Nov rule), Basil (surprised at `test` as the clips jump to the screwdriver: the uncle's trick with his own eyes), Pip (teaching MAGNETIC OBJECT, pointing at the screwdriver, then the nail; cheer: his first this part)."] });
SC.mark2 = (t, s) => markScene(t, s, { id: "m1007", sayId: "m1006", who: "pip", n: "2 of 2", text: TL.lines.m1007.text, keys: ["magnetic", "object", "magnet", "stroking", "strong", "magnet."], size: 64, y: 250, footer: FOOT, achieved: true, poses: [[LE("m1007") + .2, "sit"]] });

/* 11 · score hand, the woodpecker (lizReveal: the score hand melts into the shop front, ONE push-in onto the woodpecker clinging to the
   wooden handle of a broom in the shop's tall rack (the REVEAL spot, never the intro angsana trunk); Momo's fun-fact panel: a woodpecker
   pecking a trunk with motion lines (ff_peck), Pip's stroke counter beside it (ff_nail), a cut-away of a woodpecker's head with its long
   tongue as a thin pink band curving round the back of the head, no gore (ff_tongue)) */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1;
  return lizReveal(t, s, L, shopPH(t, WOODPECKER_R), WOODPECKER_R[0], WOODPECKER_R[1], tq, "It was on a broom handle!", -120, 160, 80, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), tell: "m1104",
    fact: { id: "m1103m", at: [1300, 560], w: 960, h: 420, items: FF([["ff_peck", "again and again, very fast", "DRAW: a woodpecker pecking a tree trunk, motion lines, a small tap tap tap tap"], ["ff_nail", "again and again: like our strokes", "DRAW: Pip's nail with the stroke counter 1 · 2 · 3 and the green one-way arrows"], ["ff_tongue", "its tongue wraps round", "DRAW: a simple cut-away of a woodpecker's head, its long tongue a thin pink band curving round the back of the head (no gore)"]]) } }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Basil takes a new nail and rubs the magnet's red end quickly BACK AND FORTH along it (rub), then flips the magnet
   and rubs with the BLUE end (flip); a big ? by his nail (qnail); PART 2 */
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1; return phScene(t, s, "12 · The cliffhanger: Basil's fast way", ["The table, OUR FISHING GAME (HOME, Rod 1 filled; Rod 2 and Rod 3 empty). MK rub: Basil takes a new nail and rubs the magnet's red end quickly BACK AND FORTH along it (head to tip, tip to head, never lifting; motion lines; tag back and forth · both ends). MK flip: he flips the magnet round and rubs with the BLUE end, back and forth. MK qnail: a big ? pops by his nail. Basil big at the left (h ~480 x0.88) with his nail (talking, a bold grin: his idea); Pip and Momo at the right, watching (Pip thinking AFTER Basil's line: will it work?). A push from Basil's rubbing paws to the nail. Small print Nails are sharp. PART 2 slams in (wired)."])
  + nailArt(760, 760, .55) + backForth(t, MKS("rub"), 760, 700, 300) + (t >= MKS("rub") ? TF(760 + 120 * Math.sin((t - MKS("rub")) * 9), 650, .4, bar20(t, { glint: false, flip: t >= MKS("flip") })) : "")
  + (t >= MKS("rub") ? TF(760, 580, spring(t, MKS("rub") + .2, .4), tpill(0, 0, "back and forth · both ends", 26, "#fff", P.ink, { w: 700 })) : "") + qMark(t, MK("qnail") + .2, 980, 640)
  + board(t) + smallPrint(t, s.t0 + .3, NAIL_RULE) + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
/* 13 · "Now you know!": OUR FISHING GAME and Pip's nail with its clips between the buddies (Stage 2: draw them; the placeholders now) */
SC.nyk = (t, s) => nykScene(t, s, fishBoardPH(t, 760, 790, .5) + nailArt(1180, 820, .45) + clipsHang(t, 1180 + 68, 820, 3, .8), { bx: [230, 1720, 1420], hx: 470 });
})(); }
