// p1.js: PART 1, "Read It or Make It? Which Mind Map Do You REMEMBER?" (the mind map special, P3 EP0): Pip reads a ready-made mind map, Basil
// makes his own; the one-week test; the word puzzle (Round 1); read it or make it? [LOOK CLOSER]: MAKE YOUR OWN, Mark Sentence 1; the memory
// test [LOOK CLOSER]: GENERATION EFFECT; HOLD ON! Momo copies the poster: MEMORY FIRST, Mark Sentence 2; the crow; the lock-in for Part 2.
// Segments 1-10 of ../p3_ep00_mindmap_script.md section 4 (approved 24 Nov 2026). One real place: the void deck study corner (sets00.js VDS).
// The buddies stand IN the scene, big; the camera drifts or pushes in smoothly (eased, continuous) and never cuts inside the place. Every pose
// has its reason (lib.js OUTCOMES: the corrected buddy stays shy through the whole fix, the right ones confident).
if (PART === 1) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);                 // Round 1: YOU +1, the Buddies +1 (Momo and Basil right)
SCORE.push([W("a703h", "one") - .1, 2, 1]);           // HOLD ON!: YOU +1
const FOOT = "Study Skills · P3 to P6 · Make your own mind map";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { const a = W("a702h", "cross") - .3, b = LE("a703h") + .4; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const CROW = { lamp: [756, 203, .46, {}], railing: [1236, 520, .36, { flip: true }], liz: [1660, 222, .52, {}] };
// the table's things: the poster on its easel (left), Basil's sheet with his map (right), the pencil box
const EAS = [650, 704];
const tableTop = (t, o = {}) => easelPoster(t, EAS[0], EAS[1], 1, o.turn || 0) + `<g transform="translate(1240 728) scale(1 .42) rotate(-4)">${sheet00(380, 280, { lines: false })}${o.map ? TF(0, 0, .3, handMap(t, MAPB.slice(0, o.map), {})) : ""}</g>`
  + `<g transform="translate(1440 722)"><rect x="-40" y="-14" width="80" height="22" rx="5" fill="#3F7FD0"/>${["#E2546A", "#F2C230", "#2FA35A", "#14B8A6"].map((c, i) => `<rect x="${-34 + i * 18}" y="-30" width="10" height="20" fill="${c}"/>`).join("")}</g>` + (o.extra || "");
const BX = { l: 300, r: 1640, m: 980 };
const world = (t, cam, o = {}) => VDS(t, { when: o.when || "day", crow: o.crow, top: tableTop(t, o.tt || { map: 2 }) + (o.top || ""), front: o.front, table: o.table, people: o.people }, cam);

/* 1 · cold open, Heart speaking at 0.30 s: the void deck study corner, Monday after school. Pip big at the left beside the poster (reading
   it: his eyes move along a branch; a calm smile); Basil big at the right at his sheet (thinking: he is working out his first branch); Momo
   mid-ground between them, looking from one to the other. The ONE-WEEK MEMORY TEST card on the notice board (HOME). The crow on top of the
   lamp post (intro spot). One slow push between the two from the first frame; tags joined to what they name */
const camVoid = (t) => camMix(camOn([960, 600], 1.02, 960, 560), camOn([960, 640], 1.1, 960, 580), eio(t / (SCN.plans.t1)));
SC.void = (t, s) => { const tP = MK("pipread"), tB = MK("basilmake"), cam = camVoid(t), pp = camPt(cam, [EAS[0], EAS[1] - 250]), bp = camPt(cam, [1240, 722]);
  return world(t, cam, { crow: CROW.lamp, tt: { map: 0 } })
    + bd("pip", BX.l, 1076, 500, t, { in: -1, poses: [[0, "sit"]], look: 4 }) + bd("momo", BX.m, 1010, 380, t, { in: -1, poses: [[0, "sit"]], look: 3 * Math.sin(t * .8) })
    + bd("basil", BX.r, 1076, 480, t, { in: -1, flip: true, poses: [[0, "sit"], [1.2, "thinking"]] })
    + linkChip(t, tP, pp[0] - 150, pp[1] - 70, pp[0] - 30, pp[1] + 20, "#8E82B8", "a ready-made map", 34)
    + linkChip(t, tB, bp[0] + 10, bp[1] - 250, bp[0], bp[1] - 10, "#E0A33A", "Basil's own map", 34)
    + OP(ramp(t, .2, .4) * (1 - ramp(t, s.t1 - .6, .4)), lowerPill(60, 96, "A void deck study corner, an HDB block, Singapore ·", "Monday after school")) + HUD(t); };
const TITLE = (k1, k2) => slamFit(400, "READ IT OR MAKE IT?", "#fff", k1) + slamFit(610, "WHO REMEMBERS MORE?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "void") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };
// Pip: a happy little hop by the poster (his plan; he believes it); Basil: a bold grin, a hop as he says it (his plan). The push continues
SC.plans = (t, s) => { const cam = camVoid(t), ep = camPt(cam, [EAS[0], EAS[1] - 120]);
  return world(t, cam, { crow: CROW.lamp, tt: { map: t > LT("a103b") ? 1 : 0 } })
    + bd("pip", BX.l, 1076, 500, t, { in: s.t0, poses: [[s.t0, "sit"]], jump: [[LT("a102p") + .2, 18]], look: 4 }) + bd("momo", BX.m, 1010, 380, t, { in: s.t0 + .05, poses: [[s.t0, "sit"]] })
    + bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], jump: [[LT("a103b") + .3, 22]] })
    + (t > LT("a102p") ? linkChip(t, LT("a102p") + .3, ep[0] + 200, ep[1] - 120, ep[0] + 60, ep[1] - 40, "#8E82B8", "read ×5", 34, LE("a102p") + 1.2) : "")
    + melt(t, s, "title", .3) + HUD(t); };

/* 2 · the one-week test: the camera glides to the notice board (its card ONE-WEEK MEMORY TEST held about 2 s, readable), then on and out to
   the lamp post, where the game's push-in starts (one move). Momo big at the left by the board, pointing at the card (showing it) */
const camBoard = camOn([228, 330], 2.1, 1000, 430), camLamp = camOn([CROW.lamp[0], CROW.lamp[1] - 20], 1.9, 960, 420);
const camRules = (t) => { const s = SCN.rules, a = eio((t - s.t0) / 1.3), b = eio((t - (s.t1 - 1.3)) / 1.3); return b > 0 ? camMix(camBoard, camLamp, b) : camMix(camVoid(SCN.plans.t1), camBoard, a); };
SC.rules = (t, s) => { const cam = camRules(t), out = s.t1 - 1.2;
  return world(t, cam, { crow: CROW.lamp }) + (t >= MK("board") ? OP(pulse(t, MK("board"), .05, .8), `<rect width="1920" height="1080" fill="#fff" opacity=".1"/>`) : "")
    + bd("momo", 1500, 1076, 480, t, { in: s.t0 + .1, out, flip: true, poses: [[s.t0, "sit"], [LE("a201m") - 1.6, "pointing"], [out - .1, "sit"]] }) + HUD(t); };
SC.game = (t, s) => { const cE = camRules(SCN.rules.t1), p = CROW.lamp;
  return gameScene(t, s, ["a202h", ...(HAS("a203b") ? ["a203b"] : []), "a204h"], false, { world: (tt) => world(tt, cE, { crow: CROW.lamp }), A: camPt(cE, [p[0], p[1] - 26]), T: [680, 440], Z: 1.5, dim0: 0 }) + smallPrint(t, LT("a204h"), CROW_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Make your own map", ""], ["Work it out to remember it", ""], ["Memory first", ""]], ["a301b", "a302b", "a303b", "a304b"], "basil");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "THE WORD PUZZLE");

/* 4 · the word puzzle: the stone table seen from above, big; six cream cards in two columns (READ · WORK IT OUT), each a pair joined by a
   line (readable on a phone). Hold, then Basil's teal pencil writes the missing letters in, one card at a time (fill1..3), each with a tick.
   The buddies at the table's edges, leaning in, each thinking over the right column (a puzzle has just been set); Momo pleased after her line */
const PZ = { x: 960, y: 590, k: .8 };
const puzzleView = (t, o = {}) => `<rect width="1920" height="1080" fill="#B9B1A3"/>` + TF(PZ.x, PZ.y + 10, 1, stoneTop(1880, 1000)) + TF(PZ.x, PZ.y, PZ.k, puzzleCards(t, { fill: [MK("fill1"), MK("fill2"), MK("fill3")], cloth: o.cloth }));
SC.puzzle = (t, s) => { const tq = LE("a401h") + .2;
  return puzzleView(t) + bd("momo", 150, 1076, 420, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tq, "thinking"], [LT("a403m") - .3, "sit"]], look: 5 })
    + bd("basil", 1780, 1076, 420, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tq + .2, "thinking"], [MK("fill1") - .3, "sit"]], look: -5 })
    + bd("pip", 1560, 1090, 300, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tq + .4, "thinking"], [LT("a403m"), "sit"]] })
    + (t >= MK("fill1") - .4 && t < MK("fill3") + .6 ? (() => { const i = t < MK("fill2") - .3 ? 0 : t < MK("fill3") - .3 ? 1 : 2, x = PZ.x + 380 * PZ.k + 20, y = PZ.y + [-230, 0, 230][i] * PZ.k - 10; return TF(x, y, 1, pencil00(8 * Math.sin(t * 16))); })() : "")
    + (t > LE("a402h") ? TF(1700, 200, spring(t, LE("a402h"), .4), tpill(0, 0, "your turn!", 40, P.sun, P.ink, { w: 700 })) : "") + HUD(t); };
/* the lock-in: the cards slide under a cloth (no peeking!) as the ring takes the stage; ONE set of THREE numbered picture cards; clue labels
   ON TOP of the ring: read · worked out · later. Basil leads (thinking after the question, worried through the countdown: lockN) */
const L1 = "a404h";
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: R1C, clues: [["read", W(L1, "read")], ["worked out", W(L1, "worked")], ["later", W(L1, "show")]], csize: 30, lead: "basil", q: "Which words will you remember better?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "a405h", pics: [0, 1, 2].map((i) => r1CardPic(i)),
  obj: (tt) => TF(430, 470, .27, puzzleCards(tt, { fill: [0, 0, 0], cloth: 1 }) ) + TF(430, 470 - 70, 1, tpill(0, 0, "no peeking!", 34, "#fff", P.ink, { w: 700 })),
  picks: [{ who: "pip", id: "a406p", word: "1" }, { who: "momo", id: "a407m", word: "2" }, { who: "basil", id: "a408b", word: "2" }], react: [[LE("a408b") + .1, "basil", "pointing"]] })
  + (t < LT(L1) + .9 ? OP(1 - clamp((t - s.t0 - .3) / .6), puzzleView(t, { cloth: clamp((t - s.t0) / .8) })) : "");
const R1C = ["The words I read", "The words I worked out", "Both the same"];
SC.later = (t, s) => puzzleView(t, { cloth: 1 }) + TF(960, 520, spring(t, MK("latertag") - .1, .45), `<g transform="rotate(-4)">${tpill(0, 0, "memory test: later!", 64, P.sun, P.ink, { w: 700 })}</g>`)
  + bd("pip", 180, 1076, 400, t, { in: s.t0 + .1 }) + bd("basil", 1760, 1076, 400, t, { in: s.t0 + .15, flip: true }) + HUD(t);

/* 5 · [LOOK CLOSER] read it or make it? (lc00.js lcMapsArt) The faces: Pip at the lower left while Heart speaks about him (listening, a
   little unsure: his round is not answered yet), Basil at the lower right for a moment (thinking: he is working out a branch), then Momo for
   her line (teaching MAKE YOUR OWN, pointing at Basil's Two poles branch; her first cheer at the end: a key word learnt) */
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
SC.lcmaps = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camVoid(SCN.plans.t1), p = camPt(cE, [960, 640]), tm = s.t0 + 1.2, tb = LT("a502h") + .3, tmo = LT("a503m") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcMapsArt, bgc: "#FFF8EA", set: (tt) => world(tt, cE, { tt: { map: 2 } }), verdict: ["MAKE IT YOURSELF", GOODC], tv: MK("v_make"), peek: false,
    over: (tt) => peekFace("pip", "l", tt, tm, LT("a502h") + 4.5) + peekFace("basil", "r", tt, tb, tmo - .2, [[tb + .3, "thinking"]])
      + peekFace("momo", "r", tt, tmo, undefined, [[MK("twopoles") + .1, "pointing"], [LE("a503m") + .1, "cheer"], [LE("a503m") + 2.0, "sit"]], { achieved: true }) }); };
// Mark Sentence 1 (Momo): under it, the poster (read) and Basil's map (made) side by side
const markReadMade = (t, x, y, k) => k < .02 ? "" : TF(x, y, k, `<g transform="translate(-230 0)">${sheet00(360, 250, { lines: false })}${appImg("posterP", -170, -118, 340, 240)}</g>` + TF(-230, 150, 1, tpill(0, 0, "read", 30, "#8E82B8", "#fff", { w: 700 }))
  + `<g transform="translate(230 0)">${sheet00(360, 250, { lines: false })}${TF(0, 0, .3, handMap(t, MAPB.slice(0, 4), {}))}</g>` + TF(230, 150, 1, tpill(0, 0, "made", 30, "#E0A33A", "#fff", { w: 700 })));
SC.mark1 = (t, s) => markScene(t, s, { id: "a505m", sayId: "a504m", who: "momo", n: "1 of 2", text: TL.lines.a505m.text, keys: ["make", "yourself", "remember", "more", "only", "read."], size: 62, y: 220, footer: FOOT,
  under: markReadMade(t, 1250, 900, .78 * spring(t, s.t0 + .4, .5)) });

/* 6 · the memory test: the stone table, the cloth still over the six cards; a big THINK! tag; a 4 s quiet (no ring, no ticks, the music down to
   silent) for the child to say the words; the three buddies round the table, eyes shut, thinking (a question has just been asked) */
SC.memtest = (t, s) => { const tk = MK("think");
  return puzzleView(t, { cloth: 1 }) + bd("momo", 160, 1076, 420, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tk, "thinking"]] }) + bd("basil", 1770, 1076, 420, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tk + .1, "thinking"]] })
    + bd("pip", 1520, 1090, 300, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tk + .2, "thinking"]] })
    + (t >= tk ? TF(960, 300, spring(t, tk, .45) * (1 + .04 * Math.sin(t * 4)), `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-200" y="-80" width="400" height="160" rx="40" fill="url(#gSun)"/></g>${T(0, 34, "THINK!", 100, P.ink, { ls: 6 })}</g>`) : "")
    + (t >= MK("quiet0") ? TF(960, 820, spring(t, MK("quiet0"), .4), tpill(0, 0, "Say the six words, out loud!", 44, P.ink, "#fff", { w: 700 })) : "") + HUD(t); };
/* [LOOK CLOSER] the memory test (lc00.js lcMemArt): a face close-up of Pip at the lower left when "needle" fades away (a big feeling: a real
   surprise, his own word gone; oops from the answer: OUTCOMES), then Basil's face at the lower right teaching GENERATION EFFECT (his first
   cheer at the end: a key word learnt). The coin YOU +1; the Buddies +1 */
SC.lcmem = (t, s) => { window._BUBAT = { pip: [700, 905], basil: [1100, 905], '*': [960, 905] }; const p = [960, 600], tN = MK("needle"), tb = LT("a606b") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcMemArt, bgc: "#F3F6FA", set: (tt) => puzzleView(tt, { cloth: 1 }), verdict: ["WORKED OUT: REMEMBERED BETTER", GOODC], tv: MK("v_gen"), peek: false,
    over: (tt) => faceCam("pip", tt, tN + .1, LE("a604p") + .3, 300, 860, 150, [[tN + .1, "surprised"]], { noreact: true })
      + peekFace("basil", "r", tt, tb, undefined, [[MK("kw_generation_effect") + .2, "pointing"], [LE("a606b") + .1, "cheer"], [LE("a606b") + 2.0, "sit"]], { achieved: true })
      + coin(tt, MK("coin1") - .1, 960, 330, "+1", "if you showed two fingers") }); };

/* 7 · HOLD ON! Momo at the table with her own sheet, the poster on its easel right beside it: eyes to the poster, pencil copies Two poles;
   eyes to the poster, copies North pole (a small eye-line arrow from the poster to her sheet each time: look · copy · look · copy). The
   HOLD ON! stamp; the countdown takes the stage (her sheet and the poster side by side with the eye-line; clue labels poster open · word for
   word · her own? ON TOP of the ring; only Momo at the side). After the bell: a face close-up of Momo (oops: a big feeling); Momo shy to the
   end of Mark Sentence 2; Pip and Basil confident. Pip turns the poster on its easel to face the wall (turn) and slides Momo a blank sheet
   (sheet); Basil holds up his own map (MEMORY FIRST). The crow on the playground's railing, seen past the pillars (a new spot) */
const camHold = (t) => { const a = eio((t - SCN.holdon.t0) / 1.4) * (1 - eio((t - W("a702h", "cross") + .6) / .8)), b = eio((t - MK("turn") + 1.0) / 1.2); return camMix(camMix(camOn([960, 620], 1.05, 960, 580), camOn([820, 700], 1.35, 860, 600), a), camOn([900, 680], 1.18, 940, 600), b); };
const copySheet = (t, n, blank) => `<g transform="scale(1 .5) rotate(3)">${sheet00(380, 300, { lines: false })}${blank ? "" : TF(0, 0, .32, handMap(t, MAPB.slice(0, 1), { at: { c: -9, b0: n > 0 ? -9 : 1e9, "b0.0": n > 1 ? -9 : 1e9, "b0.1": n > 2 ? -9 : 1e9 } }))}</g>`;
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { momo: [1250, 260], pip: [1250, 260], basil: [1120, 880] };   /* Basil's bubble low: MEMORY FIRST pops at the top */ const b = "a702h", c = "a703h", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, cam = camHold(t);
  const tTry = MK("try"), nCopy = t < tTry - 1.2 ? 0 : t < tTry ? 1 : t < MK("wordfor") ? 2 : 3, turn = eio(clamp((t - MK("turn")) / .8)), blank = t >= MK("sheet") + .6;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  const look = t > tTry - 2 && t < MK("turn") ? Math.floor((t - tTry + 2) / .9) % 2 : 0;   // eyes to the poster / to the sheet
  const top = `<g transform="translate(${blank ? 980 : 980} 724)">${copySheet(t, nCopy, blank)}</g>` + (blank ? "" : "")
    + (t > tTry - 2 && t < MK("turn") && look ? fatArrow(EAS[0] + 120, EAS[1] - 120, 930, 700, "#8E82B8", 14) : "");
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1]})">`
    + TF(-75, 30, .82, easelPoster(t, 0, 150, 1)) + TF(95, 80, 1.9, `<g transform="scale(1 .7)">${sheet00(140, 120, { lines: false })}${TF(0, 0, .13, handMap(t, MAPB.slice(0, 1), { size: 44 }))}</g>`) + fatArrow(-20, -40, 70, 50, "#8E82B8", 12) + `</g></g>`;
  const labels = [["poster open", 420, 250, -1], ["word for word", 1500, 250, 1], ["her own?", 1500, 560, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  const w = world(t, cam, { crow: t < r0 - 1 || t > bell + 1 ? CROW.railing : false, tt: { turn, map: 4, extra: top } });
  return w + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + (t > tTry - 1 && t < tX - .3 ? linkChip(t, tTry - .6, 1060, 470, camPt(cam, [930, 690])[0], camPt(cam, [930, 690])[1], "#8E82B8", "look · copy · look · copy", 36) : "")
    + (t >= MK("turn") ? linkChip(t, MK("turn") + .6, 520, 330, camPt(cam, [EAS[0], EAS[1] - 140])[0], camPt(cam, [EAS[0], EAS[1] - 140])[1], "#2E5C8A", "poster closed", 38, LT("a705b") + 1) : "")
    + (ring ? "" : bd("basil", 1660, 1076, 470, t, { in: LT(c) + .3, flip: true }) + bd("pip", 1260, 1010, 380, t, { in: LT(c) + .45, flip: true, poses: [[MK("turn") - .2, "pointing"], [MK("turn") + 1.0, "sit"]] }))
    + bd("momo", 330, 1076, 490, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LE("a701m") + .1, "thinking"], [r0 - .2, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 30]], nohop: true })
    + faceCam("momo", t, tOne - .1, tOne + 2.2, 330, 300, 140, [[tOne - .1, "oops"]], { noreact: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + smallPrint(t, MK("turn") + .3, MISTAKE_RULE) + HUD(t); };
// Mark Sentence 2 (Basil): under it, Momo's copied sheet with the eye-line (grey) and Basil's map with the poster's back behind it (gold)
const markCopyOwn = (t, x, y, k) => k < .02 ? "" : TF(x, y, k, `<g transform="translate(-240 0)">${TF(-40, -20, .55, easelPoster(t, 0, 130, 1))}<g transform="translate(60 40)">${sheet00(220, 160, { lines: false })}${TF(0, 0, .2, handMap(t, MAPB.slice(0, 1)))}</g>${fatArrow(-30, -40, 30, 10, "#9A96A8", 9)}</g>` + TF(-240, 150, 1, tpill(0, 0, "copied", 28, "#9A96A8", "#fff", { w: 700 }))
  + `<g transform="translate(240 0)">${TF(-60, -30, .55, easelPoster(t, 0, 130, 1, 1))}<g transform="translate(40 40)">${sheet00(260, 190, { lines: false })}${TF(0, 0, .22, handMap(t, MAPB.slice(0, 4)))}</g></g>` + TF(240, 150, 1, tpill(0, 0, "from memory", 28, "#E0A33A", "#fff", { w: 700 })));
SC.mark2 = (t, s) => markScene(t, s, { id: "a708b", sayId: "a707b", who: "basil", n: "2 of 2", text: TL.lines.a708b.text, keys: ["from", "memory", "first,", "poster", "closed."], size: 64, y: 240, footer: FOOT, achieved: true,
  under: markCopyOwn(t, 1250, 900, .78 * spring(t, s.t0 + .4, .5)) + bd("momo", 1800, 1076, 300, t, { in: s.t0 + .2, flip: true }) });

/* 8 · score hand, the crow (lizReveal: ONE push-in onto the crow perched on top of the wall of letterboxes: the reveal spot, new); Momo's
   fun fact (ff_mask, ff_years, ff_us); Basil points at the crow once it is ringed; Pip waves on "Tell someone at home!" */
SC.final = (t, s) => finalScene(t, s, "a801h", 1, [[s.t0, null, 1], [W("a801h", "two") - .1, null, 2]]);
SC.liz = (t, s) => { const L = "a802h", tq = W(L, "it") - .1, c = CROW.liz, tc = W(L, "crow");
  return lizReveal(t, s, L, world(t, [1, 960, 540], { crow: [c[0], c[1], c[2], { hop: tc + .4 }] }), c[0], c[1] - 30, tq, "It was on the letterboxes!", -120, 160, 80, 2.4, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), ix: 1420, iy: 400, qx: 1120, qy: 700, tx: 960, ty: 985, tell: "a804h",
    fact: { id: "a803m", at: [640, 420], w: 900, h: 440, sx: 700, sy: 790, items: [["ff_mask", "a plain mask", ffMask], ["ff_years", "years later", ffYears], ["ff_us", "crows remember!", ffUs]], cols: ["#5B6BD6", "#2FA35A", "#C2577A"], poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .8, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("a803m") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_years") + .1, "surprised"], [MK("ff_years") + 1.6, "sit"], [LT("a804h") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, CROW_RULE); };

/* 9 · the lock-in for Part 2: the void deck at dusk, the lights coming on; Pip at the left with the poster beside him on its easel (read ×5
   tonight; a hopeful smile), Basil at the right with his map and a little calendar card Tue · Thu on the table (a bold grin). Then the
   banner NEXT · Who remembers more? with THREE numbered picture cards (1 Pip · 2 Basil · 3 Both the same); PART 2 slams in */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 620], 1.05, 960, 580), camOn([960, 660], 1.14, 960, 600), u); };
SC.cliff = (t, s) => { const cam = camCliff(t), ep = camPt(cam, [EAS[0], EAS[1] - 120]), cp = camPt(cam, [1350, 720]);
  return world(t, cam, { when: "dusk", tt: { map: 4, extra: `<g transform="translate(1350 712)"><rect x="-60" y="-30" width="120" height="60" rx="6" fill="#fff" stroke="#D84A3A" stroke-width="4"/>${T(0, 10, "Tue · Thu", 24, P.ink, { w: 700 })}</g>` } })
    + bd("pip", BX.l, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], look: 4 }) + bd("momo", BX.m, 1010, 380, t, { in: s.t0 + .15 })
    + bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], jump: [[LT("a902b") + .3, 20]] })
    + linkChip(t, LT("a901p") + .4, ep[0] + 220, ep[1] - 150, ep[0] + 60, ep[1] - 40, "#8E82B8", "read ×5 tonight", 34)
    + (t > MK("tuethu") ? linkChip(t, MK("tuethu"), cp[0] - 40, cp[1] - 200, cp[0], cp[1] - 20, "#E0A33A", "draw it again", 34) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
SC.nextq = (t, s) => { const tP = MK("part2"), tc = [MK("c1"), MK("c2"), MK("c3")], cur = tc.filter((x) => t >= x - .15).length - 1;
  let out = bg("stage2") + TF(960, 130, spring(t, s.t0 + .1, .45), `<g filter="url(#drop)"><rect x="-470" y="-56" width="940" height="112" rx="56" fill="${P.ink}"/></g>` + T(-300, 20, "NEXT", 54, P.sun, { ls: 6 }) + T(110, 20, "Who remembers more?", 54, "#fff", { w: 700 }));
  ["Pip", "Basil", "Both the same"].forEach((l, i) => { const k = spring(t, s.t0 + .3 + i * .15, .45); out += TF(470 + i * 490, 560, 1.15 * k * (1 + .07 * (cur === i ? pulse(t, tc[i], .04, .9) : 0)), choiceCard3(i + 1, l, nextCardPic(i, t), { w: 400, h: 400, size: 44, pulse: cur === i ? 1 : 0, id: "n" + i })); });
  out += TF(960, 900, spring(t, s.t0 + .6, .4), tpill(0, 0, "Next Monday, a blank page each.", 44, P.sun, P.ink, { w: 700 }));
  return out + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1000, .62, sheet00(760, 560, { lines: false }) + TF(0, 0, .66, handMap(t, MAPB.slice(0, 4), { size: 40 }))) + TF(1500, 560, .9, `<rect x="-160" y="-170" width="320" height="320" rx="10" fill="#C99A62"/>` + `<g transform="translate(-228 -344)">${noticeCard(t)}</g>`), { bx: [230, 1730, 1500], hx: 470 });
})(); }
