// p2.js: PART 2, "One Car, FOUR Materials! Why Not Just One?": one object, different materials; many materials, one object; suitable.
// Segments 1-15 of p3_ep12_script.md (version 1, 21 Nov 2026; the teacher's go-ahead in its section 12).
// STAGE 2 (drawn, 2026-11-22): the sets and props are in walk.js, the look-closer pictures in closer.js, the journey in shrink.js. (Stage 1 notes below.)
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, game, goals read by Pip, round card, the lock-in
// with its two clue labels on top of the ring, Mark Sentences read by Basil / Momo (with the tag "function = the job of a part"), the book
// strips, the board MATCH THE JOB as a functional placeholder (rows 3-7, the ticks), the LOOK-CLOSER frame, the Showdown's ring, stamp and picks
// with Momo's notes as a functional placeholder, the tip card, chant, score hand, the EP13 dare cards, read-along, "Now you know!"); every
// scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2 (Fable) draws them:
// see SCENES_TODO.md.
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([W("j507", "one", 2) - .1, 1, 1]);
SCORE.push([W("j1006", "two") - .1, 3, 1]);
const FOOT = "P3 · Diversity of Materials · Choosing materials";
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);

/* the car park (walk.js VP): the car, the trolley beside its boot, the folding table with the three bottles, the board beside it, the discs */
const BDX = 1640, BDY = PGROUND + 24, BDS = .32, CAM0 = [1, 960, 540], CAMC = [1.2, 760, 720], CREAM = "#FFF6D8";
const brd = (t, o, sc = BDS, x = BDX, y = BDY) => TF(x, y, sc, matchBoard(t, o));
const buds = (t, o = {}) => sPip(t, o.pip) + sBasil(t, o.basil) + sMomo(t, o.momo);
const V = (t, o = {}, cam) => VP(t, { ...o, items: (o.board === undefined ? "" : brd(t, o.board)) + (o.items || "") }, cam);
const BOOTBAGS = TF(-316, -96, .5, shopBag()) + TF(-286, -92, .5, shopBag("#FF8FB1"));

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each.
   (PURPOSE and PHYSICAL PROPERTIES are NOT put on Part 2's shelf: it holds only this part's new words.) */
SC.lasttime = (t, s) => { const L = "j101", tb = [s.t0, W(L, "the", 1) - .2, W(L, "now") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The trolley: metal, strong", "The fish tank: glass, transparent and waterproof", "Three bottles: which one for school?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)"><g filter="url(#drop)"><rect x="392" y="182" width="1136" height="676" rx="44" fill="#FFF8EA"/></g><clipPath id="ltc"><rect x="410" y="200" width="1100" height="640" rx="30"/></clipPath><g clip-path="url(#ltc)"><g transform="translate(960 520) scale(.72)">${recapPic(i, t)}</g></g></g>`
      + (i === 2 ? qMark(t, tb[2] + .3, 790, 330, 56) : "") + (i === 0 ? TF(1010, 330, 1, propChip("STRONG", 40)) : "") + TF(960, 960, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* 2 · the new place (the car park beside the HDB block), the game and the hidden squirrel; 3 · goals (Pip reads) */
const trolBag = TF(210, PGROUND + 30 - 96, .8, shopBag("#FF8FB1"));
SC.place = (t, s) => V(t, { car: { boot: 1, bags: BOOTBAGS }, board: {}, items: trolBag }, [1.03 - .03 * eio((t - s.t0) / 2), 960, 540]) + buds(t)
  + TF(960, 1010, spring(t, s.t0 + .2, .45), tpill(0, 0, "The car park of an HDB block, Singapore", 40, P.ink, "#fff", { w: 700 })) + carRules(t, s.t0 + .3) + HUD(t);
// teacher, 22 Nov: no cut to the purple stage: the car park stays, the camera pushes straight in on the squirrel on its branch
const PLACEV = { car: { boot: 1, bags: BOOTBAGS }, board: {}, items: trolBag };
SC.game = (t, s) => gameScene(t, s, "j201", false, { world: (tt) => V(tt, PLACEV), A: [SQ[0] - 6, SQ[1] - 36], T: [1360, 500], Z: 2.6, ly: -190,
  pre: (tt) => buds(tt) + TF(960, 1010, 1, tpill(0, 0, "The car park of an HDB block, Singapore", 40, P.ink, "#fff", { w: 700 })) + carRules(tt, SCN.place.t0 + .3) });
SC.goals = (t, s) => goals3(t, s, [["One object, different materials", ""], ["Many materials, one object", ""], ["Choosing a suitable material", ""]], ["j301", "j302", "j303", "j304"], "pip");

/* 4 · Round 1: a bottle for school (clue labels must not break when dropped · see the water inside on top of the ring, kept through the countdown) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const r1labels = (t) => [["must not break when dropped", W(L1, "must") - .1], ["see the water inside", W(L1, "see") - .1]].map(([l, tq], i) => t < tq ? "" : TF(430 + (i ? 150 : -120), 470 - RING_R - 14 - (i ? 0 : 50), spring(t, tq, .4), tpill(0, 0, l, 28, "#fff", P.ink, { w: 700 }))).join("");
SC.r1 = (t, s) => lockN(t, { cards: ["Plastic", "Glass", "Metal"], labels: r1labels, q: "Which bottle for school?", tq: W(L1, "water") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: (tt) => TF(410, 590, 1.12, bagS({ pocket: true })), picks: [{ who: "momo", id: "j403", word: "3", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "pip", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "momo", "thinking"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] three bottles, one of each material: the tick table (WATERPROOF, SEE THE WATER, DOES NOT BREAK EASILY); the book's strip */
const CAMB = [1.25, 1250, 700];
SC.lcbottles = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 1020, fy: 720, bgc: "#EAF6FF", art: (tt) => bottleArt(tt, s), set: (tt) => V(tt, { car: { boot: 1, bags: BOOTBAGS }, board: {}, sq: false, items: trolBag }, CAMB), verdict: VSTYLE("FOR SCHOOL: THE PLASTIC BOTTLE", 0), tv: MK("v_bottle"),
  over: (tt) => lcStrip(tt, "j506", "Glass is not as strong as plastic or metal.", { keys: ["not", "as", "strong"] }) });
/* the answer is one: plastic; Momo's correction; the third row fills on the board (row3) */
SC.bottleans = (t, s) => { const L = "j507", tA = W(L, "one") - .1, tOne = W(L, "one", 2) - .1, hm = HAS("j508");
  return VP(t, { dim: 1, car: { boot: 1, bags: BOOTBAGS }, items: trolBag })
    + ["Plastic", "Glass", "Metal"].map((c, i) => TF(700 + i * 290, 400, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 58, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, tOne, 1680, 380, "+1", "if you showed one finger") + brd(t, { row: t >= MK("row3") ? 2 : -1 }, .56, 1230, 1050)
    + buddy("momo", 300, 1060, 290, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "surprised"], [hm ? LT("j508") - .12 : tA + 1, "sit"]], jump: [[hm ? LE("j508") + .1 : tA + 1.2, 20]] })
    + (hm ? say("j508", 360, 600, t, { size: 40, tail: -60, maxW: 480 }) : (t >= tA + .8 ? TF(420, 600, spring(t, tA + .8, .4), tpill(0, 0, "Strong, but we cannot see the water", 36, "#fff", P.ink, { w: 700 })) : "")) + carRules(t) + HUD(t); };

/* 6 · Mark Sentence 1 (Basil): 3.26; USE pops right after "use" (lib.js o.at) */
SC.mark1 = (t, s) => markScene(t, s, { id: "j602", sayId: "j601", who: "basil", n: "1 of 2", text: "An object can be made from different materials. The choice of materials depends on the use of the object.", keys: ["different", "materials.", "depends", "on", "use"], size: 62, y: 250, footer: FOOT,
  extra: TF(1250, 1002, .27 * spring(t, s.t0 + .4, .5), bottlePic()) });

/* 7 · the shopping goes into the car (bagin2, bootshut); [LOOK CLOSER] one car, part by part */
SC.boot = (t, s) => { const tI = MK("bagin2"), tS = MK("bootshut"), u = eio((t - (tI - .4)) / .4), bx = lerp(210, CARX - 300, u), by = lerp(PGROUND - 66, PGROUND - 96, u) - 130 * Math.sin(Math.PI * u), boot = 1 - eio((t - (tS - .35)) / .35);
  const cam = camL(CAM0, CAMC, eio((t - (LT("j701") - .2)) / 1.0));
  return V(t, { car: { boot, bags: BOOTBAGS + (t >= tI ? TF(-300, -90, .5, shopBag("#FF8FB1")) : "") }, board: {}, items: (t < tI ? TF(bx, by, .8, shopBag("#FF8FB1")) + (t >= tI - .5 ? aHand(bx, by - 96, 90, .8) : "") : "") + (t >= tS - .5 && t < tS + .4 ? aHand(CARX - 345 - 40 * boot, PGROUND - 250 - 190 * boot, 90, .6) : "") }, cam) + buds(t) + carRules(t) + HUD(t); };
SC.lccar = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 930, fy: 700, bgc: "#DDF1FF", art: carArt, set: (tt) => V(tt, { board: {}, sq: false }, CAMC), verdict: VSTYLE("ONE CAR · FOUR MATERIALS", 0), tv: MK("v_car") });

/* 8 · Mark Sentence 2 (Momo): 3.27, the tag "function = the job of a part" for the whole card; Heart's plain re-say (j803): each part pulses (p1..p4) */
SC.mark2 = (t, s) => { const parts = [["tyres", "STRONG"], ["seats", "FLEXIBLE"], ["windscreen", "WATERPROOF"], ["body", "STRONG"]], g = parts.map((_, i) => pulse(t, MK("p" + (i + 1)), .05, .9));
  return markScene(t, s, { id: "j802", sayId: "j801", who: "momo", n: "2 of 2", text: "The materials are selected for the different functions of the parts based on their physical properties.", keys: ["different", "functions", "physical", "properties."], size: 62, y: 230, footer: FOOT,
    extra: (t >= s.t0 + .6 ? TF(1150, 790, spring(t, s.t0 + .6, .4), tpill(0, 0, "function = the job of a part", 34, "#FFF8EA", P.ink, { w: 700 })) : "")
      + TF(880, 1062, .52 * spring(t, s.t0 + .4, .5), carSide({ lit: g, dim: Math.max(...g) * .5 }))
      + parts.map(([p, c], i) => { const x = 1200 + (i % 2) * 380, y = 900 + (i >> 1) * 96; return TF(x, y, 1 + .2 * g[i], tpill(0, 0, p, 30, g[i] > .1 ? P.sun : "#fff", P.ink, { w: 700 })) + TF(x + 30, y + 42, 1 + .2 * g[i], propChip(c, 20)); }).join("") }); };

/* 9 · BE A DROP OF WATER: the glide up to the spout of the watering can, held by an adult's hand above the windscreen (the journey is SC.shrink) */
const CANP = [CARX + 340, PGROUND - 340], SPOUT = [CANP[0] - 138, CANP[1] - 94];
const canItem = TF(CANP[0], CANP[1], .8, canW()) + aHand(CANP[0] + 100, CANP[1] - 46, 25, .8, true);
SC.waitw = (t, s) => { const L = "j901", dive = ei((t - (s.t1 - 1.5)) / 1.5), e = eio((t - s.t0) / 1.2), m = Math.max(e * .5, dive), cam = [1 + .22 * e + 3.8 * dive, lerp(960, SPOUT[0], m), lerp(540, SPOUT[1], m)], tP = W(L, "be") - .2;
  return V(t, { board: {}, items: OP(ramp(t, s.t0 + .1, .4), canItem) }, cam) + OP(1 - dive * 1.6, buds(t, { pip: { poses: [[s.t0, "sit"], [tP, "cheer"]] } })
    + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a drop of water!", 76, P.sun, P.ink, { w: 700 })) : "") + carRules(t) + HUD(t)) + wipe(t, s.t1, CREAM, 960, 540); };

/* 10 · Showdown: Momo's notes (double points): the notes on an easel, each line with its small drawing; each line lights as Momo reads it and
   the three lines stay through the countdown; the YOU ring with a counting hand (6 s), LOCKED IN!, the picks */
const NOTES = ["Rubber tyres, because rubber is strong.", "A glass windscreen, because glass is made from sand.", "Fabric seats, because fabric is flexible."], NOTEFIX = "A glass windscreen, because glass is waterproof and transparent.";
const NOTEPIC = [() => `<circle r="34" fill="#2A2A36" stroke="#15151E" stroke-width="4"/><circle r="16" fill="#C9D1DC" stroke="#7A869E" stroke-width="4"/>`,
  (fix) => `<path d="M-40 26 L-26 -30 H26 L40 26z" fill="#EAF8FF" stroke="#7FB6D6" stroke-width="6" stroke-linejoin="round"/><path d="M-16 -18 L-22 10" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` + (fix ? `<path d="M-10 -34 q4 10 0 14 q-6 -6 0 -14z M12 -32 q4 10 0 14 q-6 -6 0 -14z" fill="#4DB8F0"/>` : `<path d="M44 30 q20 -40 44 0z" fill="#E8D3A2" stroke="#B89A5A" stroke-width="4"/>`),
  () => `<rect x="-14" y="-38" width="26" height="20" rx="8" fill="url(#wWeave)" stroke="#51477A" stroke-width="4"/><path d="M-22 -14 Q-28 28 -14 30 H26 Q30 4 16 -16z" fill="url(#wWeave)" stroke="#51477A" stroke-width="4" stroke-linejoin="round"/>`];
// Momo's notes on an easel standing on the ground. o.lit [3]; o.rub 0..1 (line 2 rubbed out), o.fix 0..1 (rewritten in green). origin = the feet
function momoNotes(t, o = {}) { const lit = o.lit || [0, 0, 0]; let s = "";
  NOTES.forEach((ln, i) => { const y = -590 + i * 130; if (lit[i] > .02) s += `<rect x="-570" y="${y - 56}" width="1140" height="112" rx="18" fill="${P.sun}" opacity="${n2(.4 * lit[i])}"/>`;
    s += `<path d="M-560 ${y + 58} H560" stroke="#8FB8E8" stroke-width="3" opacity=".7"/><circle cx="-520" cy="${y}" r="30" fill="${P.momo || P.coral}"/>` + T(-520, y + 15, (i + 1) + "", 42, "#fff") + TF(-420, y, 1, NOTEPIC[i](i === 1 && (o.fix || 0) > .5))
      + (i === 1 && (o.rub || o.fix) ? OP(1 - (o.rub || 0), T(-330, y + 12, ln, 33, P.ink, { a: "start", w: 600 })) + ((o.rub || 0) > 0 && (o.rub || 0) < 1 ? `<rect x="${n2(-330 + 860 * (o.rub || 0))}" y="${y - 30}" width="70" height="56" rx="10" fill="#FF8FB1" stroke="#C4547A" stroke-width="4" transform="rotate(-8 ${n2(-330 + 860 * (o.rub || 0))} ${y})"/>` : "") + OP(o.fix || 0, T(-330, y + 12, NOTEFIX, 29.5, "#1F8A4C", { a: "start", w: 700 })) : T(-330, y + 12, ln, 33, P.ink, { a: "start", w: 600 })); });
  return `<path d="M-300 0 L-140 -330 M300 0 L140 -330 M0 -20 V-330" stroke="#8A5A36" stroke-width="20" stroke-linecap="round"/><rect x="-640" y="-214" width="1280" height="26" rx="10" fill="#9A6535" stroke="#7A4C26" stroke-width="4"/><g filter="url(#drop)"><rect x="-610" y="-790" width="1220" height="580" rx="24" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g><circle cx="0" cy="-776" r="16" fill="#E8604E" stroke="#B8402E" stroke-width="4"/>`
    + T(-560, -690, "Momo’s notes", 48, P.momo || P.coral, { a: "start" }) + T(540, -690, "Why this material?", 44, P.ink, { a: "end" }) + s; }
const noteLit = (t) => { const L = "j1001", ws = ["one", "two", "three"].map((w) => TL.lines[L].words.some((x) => norm(x.w) === w) ? W(L, w) : 1e9), r0 = MK("ring0_show");
  return [0, 1, 2].map((i) => { const a = ws[i], b = i < 2 ? ws[i + 1] : LE(L); return t >= a - .1 && t < Math.min(b, LE(L) + .2) ? 1 : t >= r0 && t < MK("bell_show") ? .45 : 0; }); };
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j1003") - .08, R = [1640, 330];
  const picks = [["basil", "j1004", "2", 960], ["pip", "j1005", "2", 1320]];
  return VP(t, { dim: 1, car: false, table: false, trolley: false }) + TF(760, 900, .88, momoNotes(t, { lit: noteLit(t) }))
    + (t >= LT("j1002") ? TF(R[0], R[1], spring(t, LT("j1002"), .4), `<g transform="scale(.6)">${ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { tick: rs.tick, shut: pulse(t, bell, .01, .6), inner: TF(0, 0, .85, `<g filter="url(#dropS)">${countHand(3)}</g>`) })}</g>` + youPill(-130, -140, .9)) : "")
    + buddy("momo", 210, 1060, 240, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [LT("j1001") - .12, "sit"], [LE("j1001") + .2, "pointing"], [LT("j1004") - .1, "oops"]] }) + (t < LE("j1001") + .5 ? say("j1001", 700, 840, t, { size: 34, tail: -260, maxW: 760 }) : "")
    + picks.map(([w, id, n, x]) => buddy(w, x + 300, 1060, 230, t, { aura: true, in: r0 - .3, poses: [[r0 - .3, w === "basil" ? "arms_crossed" : "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, w === "basil" ? "cheer" : "pointing"]], flip: true }) + (t > r0 ? pickNum(w, x + 300 - 150, 900, t, LT(id) - .1, n) : "") + say(id, x + 100, 790, t, { size: 34, maxW: 520, tail: 140 })).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 2 rubbed out and rewritten in green (rub), the tip card (tip) with its two plain lines and small picture, +2 */
const rainPic = (t) => `<rect x="-120" y="-80" width="240" height="160" rx="18" fill="#DDF1FF" stroke="#7FB6D6" stroke-width="5"/><path d="M-90 60 L-60 -50 H60 L90 60z" fill="#EAF8FF" stroke="#1F5FA0" stroke-width="6" stroke-linejoin="round"/><rect x="-34" y="-20" width="26" height="20" rx="7" fill="url(#wWeave)"/><rect x="10" y="-20" width="26" height="20" rx="7" fill="url(#wWeave)"/><path d="M-40 4 H-4 V50 H-44z M4 4 H40 L44 50 H4z" fill="url(#wWeave)"/>${[0, 1, 2, 3, 4].map((i) => { const v = ((t * .9 + i * .23) % 1); return `<path d="M${-80 + i * 40} ${n2(-76 + 50 * v)} l-4 14" stroke="#4DB8F0" stroke-width="5" stroke-linecap="round" opacity="${n2(1 - v * .5)}"/>`; }).join("")}`;
SC.fix = (t, s) => { const rb = MK("rub"), rub = ss(rb, rb + .5, t), fix = ss(rb + .4, rb + 1.2, t), tip = MK("tip"), [tx, td] = slideX(t, tip, .6, 2500, 1500, 1040);
  return VP(t, { dim: 1, car: false, table: false, trolley: false }) + TF(640, 900, .8, momoNotes(t, { rub, fix, lit: [0, fix * .6, 0] }))
    + (t >= tip ? td + TF(tx, 0, 1, `<path d="M-200 1040 L-170 950 M200 1040 L170 950" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-340" y="430" width="680" height="530" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>${T(-300, 510, "1 Name the property.", 46, P.ink, { a: "start" })}${T(-300, 700, "2 Link it to the job.", 46, P.ink, { a: "start" })}`
      + (t >= tip + .7 ? `<path d="M-40 528 V560 H40 V580" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` + TF(40, 606, spring(t, tip + .7, .4), propChip("WATERPROOF", 30)) : "")
      + (t >= tip + 1.1 ? `<path d="M190 718 V750 H130 V770" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` + TF(60, 850, spring(t, tip + 1.1, .4), rainPic(t)) + TF(-190, 850, spring(t, tip + 1.2, .4), tpill(0, 0, "rain outside,", 26, "#fff", P.ink, { w: 700 })) + TF(-190, 900, spring(t, tip + 1.3, .4), tpill(0, 0, "dry seats inside", 26, "#fff", P.ink, { w: 700 })) : "")) : "")
    + coin(t, W("j1006", "two") - .1, 1700, 300, "+2", "line 2") + HUD(t); };
/* the board MATCH THE JOB, all seven rows, a green tick at the end of each (ticks); the book's strip 3.30 item 3; SUITABLE pops (lib.js o.at) */
SC.board = (t, s) => { const L = "j1008";
  return VP(t, { dim: 1, car: false, table: false, trolley: false }) + brd(t, {}, .94, 975, 1066)
    + bookCaption(t, L, "It is important to choose a material whose physical property", 306, { size: 43, keys: ["physical", "property"] }) + bookCaption(t, L, "is suitable for the intended use of the object.", 388, { size: 43, off: 10, keys: ["suitable", "intended", "use"] }) + HUD(t); };   // Stage 3: both lines 70 px lower (the SUITABLE shelf pill covered the end of "property")

/* 11 · the chant: call and response (common.js chantScene); the board MATCH THE JOB stands behind the buddies, centred, its PURPOSE /
   PROPERTY / MATERIAL columns flashing on their lines; the green tag SUITABLE by the MATERIAL column on line 3 */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 54, x: 500, y0: 290, dy: 108, xs: [135, 390, 645], bh: 200, tx: 1400, ty: 425, sayX: 420, sayY: 690, board: (tt, flash) => TF(1375, 1066, .68, matchBoard(tt, { flash, good: flash[2] > .05 ? Math.min(1, flash[2] * 3) : 0 })) });

/* 12 · score hand, the squirrel (lizReveal in common.js): it runs along the branch, sits up and flicks its tail */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1, u = clamp((t - (s.t0 + 1.4)) / .9), run = 150 * (1 - eio(u)) * (t >= s.t0 + 1.4 ? 1 : 1);
  return lizReveal(t, s, L, V(t, { board: {}, sq: { run: t < s.t0 + 1.4 ? 150 : run, up: ss(s.t0 + 2.4, s.t0 + 2.8, t), flick: t > s.t0 + 2.8 ? 22 * Math.sin((t - s.t0) * 9) : 0 } }), SQ[0] - 6 + (t < s.t0 + 1.4 ? 150 : run), SQ[1] - 36, tq, "It was on the tree by the cars!", 0, 190, 78, 1.9, { from: () => SC.final(SCN.final.t1 - .04, SCN.final) }); };

/* 13 · the dare for Episode 13: the SAME school bag three times, its strap torn off at one end, each with a new strap lying beside it
   (PIC.bagFabric / bagMetal / bagWood: EP13 opens with these same boards and cards) */
const DRX = [560, 960, 1360];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "which") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, hb = HAS("j1302");
  const boards = NEXT_CARDS.map((m, i) => { const t0 = s.t0 + .3 + i * .25; if (t < t0) return ""; const [x, d] = slideX(t, t0, .7, 2500, DRX[i], 660); return d + picBoard("bag" + m, x, 640, 1, { sc: .8, id: "dr" + i }); }).join("");
  // teacher, 22 Nov: no jump cut out of the squirrel's reveal: the camera pulls back from the branch to the whole car park while it dims
  const pu = eio((t - s.t0) / .8), back = pu >= 1 ? "" : OP(1 - ss(.55, 1, pu), `<g transform="translate(960 540) scale(${n2(lerp(1.9, 1, pu))}) translate(${n2(-lerp(SQ[0] - 6, 960, pu))} ${n2(-lerp(SQ[1] - 36 + 190, 540, pu))})">${V(t, { board: {}, sq: { up: 1 - pu } })}</g>`);
  return VP(t, { dim: 1, car: false, table: false, trolley: false }) + back + boards
    + TF(960, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · Design a school bag!", 50, P.ink, P.sun, { w: 700 }))
    + NEXT_CARDS.map((txt, i) => TF(DRX[i], 800, .46 * spring(t, tc[i], .45), ansCard(i + 1, txt, { w: 430, h: 290, size: 58, pulse: Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0) }))).join("")
    + qMark(t, tQ, 960, 262, 44) + (t >= tL ? TF(1250, 950, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + buddy("basil", 200, 1060, 230, t, { aura: true, in: s.t0 + .1, poses: hb ? [[s.t0, "sit"], [LT("j1302") - .12, "sit"], [LE("j1302") + .1, "cheer"]] : [[s.t0, "sit"], [tL, "cheer"]], nohop: true }) + (hb ? say("j1302", 520, 950, t, { size: 38, tail: -160, maxW: 480 }) : "") + carRules(t) + HUD(t); };

/* 15 · "Now you know!": the board MATCH THE JOB, complete and ticked, centred in the free space between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(868, 1040, .78, matchBoard(t)), { bx: [125, 1800, 1578], bh: 220, hx: 125, sayY: 360 });
})(); }
