// p2.js: PART 2, "Back and Forth, or One Way? Make the STRONGEST Nail Magnet": the school maker space on Monday after school (THE FISHING
// POND and its FISH CAUGHT whiteboard), Round 1 (Basil's back-and-forth nail or Pip's one-way nail: two, Pip's nail), be a steel paper clip
// (Basil's nail hardly pulls you; Pip's nail pulls you up, a friend with you), the answer (Momo), how do I get back to the head? (the stroke
// slowed down: one pole, slide, lift up and away: SAME DIRECTION; Mark Sentence 7.2 steps 1 and 2), the Showdown (Pip's poster: halfway, use
// the blue end too? SAME POLE; the book's step 3 on a strip), more strokes? (ten, twenty, thirty strokes: STRONGER MAGNET; the thirty-stroke
// hook lifts the big fish; Mark Sentence 7.3), the chant, the ant, the dare into EP23 (a wire coiled round a new nail, joined to a battery).
// Segments 1-14 of ../p3_ep22_script.md section 5 (version 1, 24 Nov 2026).
// STAGE 2 (drawn 2026-11-24): one real place, a SCHOOL MAKER SPACE on Monday after school (sets22.js MS22: the window onto the school garden,
// the ledge with Basil's snack box, the pegboard, the poster MAKE · TEST · IMPROVE, the 3D printer, the back workbench, the sink, the fans,
// the NEAR WORKBENCH with THE FISHING POND and the FISH CAUGHT whiteboard at their HOME). The buddies stand IN the scene, big; a thing a buddy
// holds is drawn at its paws (art22.js pawPt); the camera drifts or pushes in and never cuts inside the room; the wrong buddy stays shy and
// the right ones confident through every fix (lib.js OUTCOMES `to`). Every action is drawn AT its mark.
if (PART === 2) { (() => {
const L1 = "n401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Momo right: the Buddies score), Showdown 3 : 1 (built on Pip's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Making and Using Magnets · The stroke method";
const R1 = ["Basil's nail", "Pip's nail", "Both the same"];
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
// "One, Basil's": the "one" said as the card's number (the line also says "one way" and "one pole" before it)
const oneCard = () => { const ws = TL.lines[L1].words, i = ws.findIndex((w, j) => norm(w.w) === "one" && ws[j + 1] && norm(ws[j + 1].w) === "basils"); return i < 0 ? W(L1, "one") : ws[i].a; };
const held = (who, x, y, h, flip, inner, dy = 0) => { const [px, py] = pawPt(who, x, y, h, flip); return TF(px, py + dy, 1, flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
// the bench's own props (world): the tray of steel clips in front of the whiteboard
const TRAY2 = [790, 872];
const room = (t, cam, o = {}) => MS22(t, { bench: (o.tray === false ? "" : trayClips22(t, TRAY2[0], TRAY2[1], .55, { n: o.trayN })) + (o.bench || ""), front: o.front, ant: o.ant, pondO: o.pondO, wbO: o.wbO }, cam);
const camRoom = camOn([960, 600], 1.04, 960, 560);
const BX = { l: 300, r: 1700, m: 1440 };
// Pip holds the two nails side by side, points down (Basil's on the left, bare; his own with a little bunch of clips on its tip)
const twoNails = (t, x, y, h, flip, o = {}) => { const [px, py] = pawPt("pip", x, y, h, flip); let s = "";
  [[-62, "Basil's", 0], [62, "Pip's", 1]].forEach(([dx, lab, c]) => { const nx = px + (flip ? -1 : 1) * 30 + dx; s += nail21(nx, py + 100, .72, 90) + (c ? clipBunch(t, nx, py + 208, 5, { k: .8 }) : "") + TF(nx, py - 40, 1, tpill(0, 0, lab, 26, c ? "#B9A6FF" : P.basil, P.ink, { w: 700 }));
    if (o.hl === c) s += `<ellipse cx="${nx}" cy="${py + 160}" rx="80" ry="160" fill="none" stroke="${P.sun}" stroke-width="8" opacity="${n2(.6 + .4 * Math.sin(t * 6))}"/>`; });
  return s; };

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Stroked: it attracts clips", "Magnetised: made into a magnet", "Only magnetic objects"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2_22(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the school maker space, Monday after school: a slow drift from the door to THE FISHING POND at its HOME (pondIn), that carries on into
   the game's push-in onto the ant beside the biscuit crumb on the window ledge (the intro spot) */
const camMaker = (t) => { const s = SCN.maker, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([1100, 640], 1.12, 1060, 600), camOn([900, 640], 1.06, 960, 600), u); };
SC.maker = (t, s) => room(t, camMaker(t))
  // popfix (teacher, 25 Nov 2026: "pet buddies popping out and gone"): a 1.6 s establishing shot shows the PLACE only; the buddies used to
  // pop in here and vanish with the cut to the game. They arrive once, in the game.
  + OP(ramp(t, s.t0 + .1, .3), lowerPill(60, 96, "A school maker space, Singapore ·", "Monday after school")) + smallPrint(t, s.t0 + .2, NAIL_RULE) + melt(t, s, "lasttime", .45) + HUD(t);
SC.game = (t, s) => { const cE = camMaker(SCN.maker.t1), p = ANTAT.intro;
  return gameScene(t, s, HAS("n202b") ? ["n201", "n202b", "n203"] : ["n201", "n203"], false, { world: (tt) => room(tt, cE), A: camPt(cE, [p[0], p[1] - 10]), T: [680, 440], Z: 3.0, dim0: 0 }) + smallPrint(t, LT("n203"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["One way, one pole", ""], ["The same pole", ""], ["More strokes, stronger", ""]], ["n301", "n302", "n303", "n304"], "momo");

/* 4 · Round 1: Basil rubbed his nail back and forth with both ends; Pip stroked his one way, with one pole, the same number of times. Which
   nail attracts more steel clips? THREE big numbered picture cards; the clue labels back and forth · one way · the same number of strokes
   ON TOP of the ring; in the ring the two nails hanging side by side above the tray. Basil leads (thinking, then worried); Momo points at
   card 1's arrows after her line */
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: R1, clues: [["back and forth", W(L1, "basil")], ["one way", W(L1, "pip")], ["the same number of strokes", W(L1, "number")]], csize: 32, lead: "basil",
  pics: [0, 1, 2].map((i) => r1Pic22(i, t)), q: "Which attracts more clips?", tq: W(L1, "which") - .1,
  tc: [oneCard(), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", obj: ringP2_22,
  picks: [{ who: "basil", id: "n403b", word: "1" }, { who: "pip", id: "n404p", word: "2" }, { who: "momo", id: "n405m", word: "2" }] }) + smallPrint(t, W(L1, "basil"), NAIL_RULE);

/* 5 · Be a steel paper clip! One glide down into the tray of clips on the bench (no cut); the buddies wave the viewer off (goodbye) and shrink
   (a pop each). The ant on the rim of the cardboard pond, as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([TRAY2[0], TRAY2[1] - 20], 6, 960, 600), u * u); };
SC.waitw = (t, s) => { const L = "n501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "basil", "pip"].map((w, i) => { const x = [BX.l, BX.m, BX.r][i]; return bd(w, x, [1076, 1010, 1076][i], [490, 390, 490][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return room(t, camWait(t)) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a steel paper clip!", 72, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#C8D0D6", 960, 600); };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jjump") + .1, "surprised"], [m("jjump") + 2.3, "sit"]] };
  return clipJourney(t, s) + riders(t, s, { tin: MK("jtray") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: rp, jolts: [m("jjump") + .35] })
    + youTag(t, MK("jtray"), "You: a steel paper clip") + feelTag(t, MK("jtray") + .8, MK("jnail1") - .2, "to scale: a steel paper clip", 160) + feelTag(t, MK("jbasil"), MK("jstill") - .2, "Basil's nail: back and forth, both ends", 160)
    + feelTag(t, MK("jstill"), MK("jpip") - .2, "hardly a pull", 160) + feelTag(t, MK("jpip"), MK("jjump") - .2, "Pip's nail: one way, one pole", 160) + feelTag(t, MK("jfriend"), s.t1, "pulled up!", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return room(t, camMix(camRoom, camOn([TRAY2[0], TRAY2[1] - 20], 5, 960, 600), u))
    + bd("momo", BX.l, 1076, 500, t, { in: s.t0 + .2 }) + bd("basil", 960, 1010, 400, t, { in: s.t0 + .25 }) + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .3, flip: true }) + (t > s.t0 + .35 ? twoNails(t, BX.r, 1076, 500, true) : "") + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: Pip's nail. The three cards small at the top left (card 2 lit at ansglow; "not this one" on card 1); the coins YOU
   +1 and BUDDIES +1. Pip and Momo (right) confident, Basil (wrong) shy (OUTCOMES). Momo explains; each nail glows as she names it (pipnail,
   basnail). The ant walking along the bottom of the pegboard's frame */
SC.r1ans = (t, s) => { window._BUBAT = { momo: [560, 330] }; const tA = MK("ansglow"), hl = t >= MK("basnail") - .2 ? 0 : t >= MK("pipnail") - .2 ? 1 : -1;
  return room(t, camRoom)
    + `<g filter="url(#drop)"><rect x="30" y="40" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + R1.map((c, i) => TF(150 + i * 200, 135, .42, choiceCard3(i + 1, c, r1Pic22(i, t), { w: 400, h: 330, size: 34, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "ra" + i }))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 960, 330, "+1", "if you showed two fingers")
    + bd("momo", BX.l, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("momo", 470, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 520, 585, .7)
    + bd("basil", 960, 1010, 400, t, { in: s.t0 + .15, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("basil", 1110, 700, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1160, 645, .7)
    + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + twoNails(t, BX.r, 1076, 500, true, { hl }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1860, 580, .7)
    + (hl === 1 ? TF(1250, 540, spring(t, MK("pipnail"), .4), tpill(0, 0, "every stroke helped", 34, GOODC, "#fff", { w: 700 })) : "") + (hl === 0 ? TF(1250, 540, spring(t, MK("basnail"), .4), tpill(0, 0, "back and forth: undone", 34, "#D84A3A", "#fff", { w: 700 })) : "")
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Basil (still shy: his way is the one corrected) holds a new nail and the magnet, the red end at the nail's tip, unsure which way to go:
   "So how do I get back to the head of the nail, without rubbing it the wrong way?" A push in (straight into the look-closer). The ant on the
   wooden ruler on the bench */
const camAsk = (t) => { const s = SCN.ask, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([700, 820], 1.3, 760, 640), u); };
SC.ask = (t, s) => { const [px, py] = pawPt("basil", BX.l, 1076, 480, false), wig = 14 * Math.sin(t * 3);
  return room(t, camAsk(t)) + bd("pip", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("momo", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true })
    + bd("basil", BX.l, 1076, 480, t, { in: s.t0 + .05, look: 3 }) + TF(px, py, 1, nail21(137 * .9, 0, .9)) + magAt(t, px + 255 + wig * .4, py - 12, .6, -90 + wig) + TF(px + 255, py - 230, 1, `<g opacity="${n2(.7 + .3 * Math.sin(t * 4))}">` + T(-50, 0, "←", 64, P.ink) + T(40, 0, "?", 64, P.ink) + `</g>`)
    + smallPrint(t, s.t0 + .3, NAIL_RULE) + HUD(t); };
/* [LOOK CLOSER] how do you get back to the head? (lc22.js lcWayArt). Faces: Basil at the left (still SHY: OUTCOMES to the end of Mark Sentence
   1), Momo at the right (teaching SAME DIRECTION; cheer after her line: a key word learnt, achieved) */
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
SC.lcway = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camAsk(SCN.ask.t1), tm = s.t0 + 2.3, tmo = LT("n705m") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: 760, fy: 640, art: lcWayArt, bgc: "#FFF8EA", set: (tt) => room(tt, cE), verdict: [`ONE WAY: LIFT UP, NEVER SLIDE BACK`, GOODC], tv: MK("v_way"), peek: false,
    over: (tt) => peekFace("basil", "l", tt, tm) + peekFace("momo", "r", tt, tmo, undefined, [[LE("n705m") + .1, "cheer"], [LE("n705m") + 2.2, "sit"]], { achieved: true }) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n707", sayId: "n706", who: "pip", n: "1 of 2", text: TL.lines.n707.text, keys: ["one", "pole", "Repeat", "strokes", "same", "direction", "each", "time."], size: 58, y: 240, footer: FOOT, achieved: true, poses: [[LE("n707") + .2, "cheer"], [LE("n707") + 2.0, "sit"]],
  under: markWay(t, 1250, 935, .72 * spring(t, s.t0 + .4, .5)) });

/* 8 · Showdown: Pip's poster on a small easel by the pond (art22.js poster22). The lines light as he reads them (l1, l2, l3). The YOU ring
   (5 s) big on the blue stage, the poster big beside it; only Pip at the side (thinking stands in for worried). LOCKED IN!; Basil reveals
   (OUTCOMES at n804b: Basil and Momo confident, Pip shy, through the whole fix). The ant on the leg of Pip's easel */
const EAS = [760, 1074, .78];
const hwLit = (t) => { const ms = [MK("l1"), MK("l2"), MK("l3"), LE("n802p") + .2]; return [0, 1, 2].map((i) => ss(ms[i] - .1, ms[i] + .3, t) * (1 - ss(ms[i + 1] - .2, ms[i + 1] + .2, t))); };
const camShow = (t) => { const e = eio((t - LT("n802p") + .6) / 1.2) * (1 - eio((t - MK("ring0_show") + 1) / .8)); return camMix(camOn([960, 560], 1.04, 960, 540), camOn([EAS[0], EAS[1] - 300], 1.7, 1060, 540), e); };
const showWorld = (t, cam, o = {}) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), a = o.ant !== undefined ? o.ant : (t < r0 - 1 || t > bell + 1 ? ANTAT[(window._S || {}).name] : false);
  return room(t, cam, { ant: a, front: TF(EAS[0], EAS[1], EAS[2], poster22(t, 0, 0, 1, o.sheet || { lit: hwLit(t) })) }); };
SC.show = (t, s) => { window._BUBAT = { basil: [1500, 230], momo: [1330, 250], pip: [520, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("n803") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n804b");
  return showWorld(t, camShow(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".04"/>` + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(680, 1100, .88, poster22(t, 0, 0, 1, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("pip", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [W("n801", "pips") + .2, "pointing"], [LT("n802p") - .3, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("momo", 1360, 1020, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"]] }) + (t > bell + .6 ? pickNum("momo", 1240, 700, t, tB - .1, "3") : "")
    + bd("basil", BX.r, 1076, 480, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"], [r0 - .3, "worried"]] }) + (t > bell + .5 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
/* the fix: line 3 struck through (strike, kept) and the green rewrite (rewrite) with its picture (the red end on the head, three one-way
   arrows); the coin +2 (coin2); SAME POLE (Basil: a cheer after his line, achieved, over his confident pose for 1.5 s); the cream strip 7.2
   step 3 (strip). Pip shy through the whole fix; Basil and Momo confident. The ant on the rim of the craft bin under the bench */
SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 250], '*': [1250, 250] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), tCh = LE("n806b") + .1;
  const cam = camMix(camOn([EAS[0], EAS[1] - 300], 1.55, 980, 560), camOn([960, 600], 1.06, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2)));
  const basil = t >= tCh && t < tCh + 1.6 ? bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[tCh, "cheer"]], keepPose: true, achieved: true }) : bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] });
  return showWorld(t, cam, { ant: ANTAT.fix, sheet: { strike: st, fix: fx, lit: [0, 0, 0] } })
    + coin(t, MK("coin2") - .1, 960, 330, "+2", "line 3")
    + bd("pip", 230, 1076, 480, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] }) + bd("momo", 1360, 1020, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + basil
    + (t >= MK("strip") ? bookCaption(t, "n807s", TL.lines.n807s.text, 960, { size: 42, keys: ["same", "pole."] }) : "") + HUD(t); };

/* 9 · Momo dips Rod 1 (Pip's nail) at the big gold fish (fishdip): the nail touches a clip and lifts the fish's nose; it slips off and falls
   back (slip: a little paper splash). "Our big fish has two clips on its nose. How do we make a hook strong enough to catch it?" Thinking
   after her line (her own real question). The ant on the window frame's side post */
const RODM = [300, 1076, 500];   // Momo with a rod, by the pond (the big gold fish lies at the pond's left end)
const bigFishSpot = () => [POND[0] - 250 * POND[2], POND[1] - 130 * POND[2]];
// Momo's rod: its tip right above the big fish's nose; lift 0 (the hook touches the nose) .. 1 (raised high)
const momoRod = (t, o = {}) => { const [px, py] = pawPt("momo", RODM[0], RODM[1], RODM[2], false), f = bigFishSpot(), nose = f[0] - 58 * POND[2], L = (nose - px) / Math.cos(35 * Math.PI / 180), lift = o.lift || 0, ang = -35 - 12 * lift, a = ang * Math.PI / 180, tx = px + Math.cos(a) * L, ty = py + Math.sin(a) * L;
  return rod22(t, px, py, ang, L, { hook: "nail", str: Math.max(20, f[1] - 4 - ty - 96 - 60 * lift * 0), fish: o.fish, clips: o.clips, label: o.label }); };
SC.lc2q = (t, s) => { const d = MK("fishdip"), sl = MK("slip"), lift = t < d ? 0 : t < sl ? .35 * eio(clamp((t - d) / .5)) : .35 * (1 - eio(clamp((t - sl) / .6))), on = t >= d + .2 && t < sl, fall = t >= sl ? clamp((t - sl) / .4) : 1, f = bigFishSpot();
  return room(t, camRoom, { pondO: { big: !on && fall >= 1 } }) + (t >= sl && fall < 1 ? TF(f[0], lerp(f[1] - 90, f[1], fall * fall), POND[2], fishP(0, 0, 1, "#FFC83A", true)) : "") + (t >= sl + .4 && t < sl + .9 ? `<g opacity="${n2(1 - (t - sl - .4) / .5)}">${[0, 1, 2, 3].map((i) => `<path d="M${f[0] - 40 + i * 26} ${f[1] - 20} l${(i - 1.5) * 10} -24" stroke="#BFE6FF" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>` : "")
    + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true }) + bd("basil", 1420, 1010, 380, t, { in: s.t0 + .15, flip: true })
    + bd("momo", RODM[0], RODM[1], RODM[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n901m") + .1, "thinking"]] }) + momoRod(t, { lift, fish: on ? "big" : undefined, label: "Rod 1" }) + HUD(t); };
/* [LOOK CLOSER] more strokes? (lc22.js lcMoreArt). Faces: Momo at the left (her question is answered: thinking; then eyes wide, listening),
   Pip at the right (teaching STRONGER MAGNET; a big smile and a nod: he cheers at the big fish) */
SC.lcmore = (t, s) => { window._BUBAT = { '*': [960, 905] }; const tm = s.t0 + 2.3, tp = LT("n905p") - .5, f = bigFishSpot();
  return lookCloser(t, s, { tz: s.t0, fx: f[0], fy: f[1] - 60, art: lcMoreArt, bgc: "#FFF8EA", set: (tt) => room(tt, camRoom), verdict: [`MORE STROKES: A STRONGER MAGNET`, GOODC], tv: MK("v_more"), peek: false,
    over: (tt) => peekFace("momo", "l", tt, tm, undefined, [[tm + .2, "thinking"], [MK("dip") - .1, "sit"]]) + peekFace("pip", "r", tt, tp) }); };
/* the thirty-stroke hook lifts the big fish (bigfish: the reveal, achieved: Momo and Pip cheer; Basil a big grin); the FISH CAUGHT whiteboard
   fills (chart: Rod 3 · 30 strokes · the big fish!, Part 1's three Rod boxes small in its corner, all filled). Picture and sound only */
SC.pond = (t, s) => { const b = MK("bigfish"), up = t < b ? 0 : eio(clamp((t - b) / 1.0)), cam = camMix(camRoom, camOn([1000, 700], 1.25, 1000, 600), eio(clamp((t - s.t0) / 1.2)) * (1 - eio(clamp((t - MK("chart") + .3) / 1))));
  return room(t, cam, { pondO: { big: t < b + .05 } })
    + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [b + .1, "cheer"]] }) + bd("basil", 1350, 1010, 380, t, { in: s.t0 + .15, flip: true, jump: [[b + .2, 20]] })
    + bd("momo", RODM[0], RODM[1], RODM[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [b + .1, "cheer"]] }) + momoRod(t, { lift: up, fish: t >= b + .05 ? "big" : undefined, label: "Rod 3" })
    + (t >= b + .4 ? TF(1150, 300, spring(t, b + .4, .45), tpill(0, 0, "thirty strokes: the big fish!", 44, GOODC, "#fff", { w: 700 })) : "") + popSpark(t, b + .3, 1150, 400, 160) + HUD(t); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n908", sayId: "n907", who: "basil", n: "2 of 2", text: TL.lines.n908.text, keys: ["stronger", "magnet", "stroked", "more", "times"], size: 60, y: 240, footer: FOOT, achieved: true, poses: [[LE("n908") + .2, "sit"]],
  under: markMore(t, 1250, 920, .84 * spring(t, s.t0 + .4, .5)) });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 46, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1570, 700, .8, chantBoard22(tt, flash)) });

/* 11 · score hand, the ant (lizReveal onto the ant on the edge of the small sink, leading a little line of ants: the REVEAL spot, never the
   intro window ledge) and Basil's fun fact: a smell path home (ff_food), more ants follow it (ff_follow), a stronger path (ff_strong). Momo
   points at the ant once it is ringed, then waves goodbye; Pip surprised ON ff_strong (a real surprise); Basil laughs after his line (the
   crumb was his) */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = ANTAT.liz, tc = W(L, "ant");
  return lizReveal(t, s, L, room(t, W0()), c[0] + 6, c[1] - 12, tq, "It was on the edge of the sink!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103b", at: [1250, 400], w: 1000, h: 440, items: [["ff_food", "a smell path", ffFood22], ["ff_follow", "again and again", ffFollow22], ["ff_strong", "a stronger path", ffStrong22]], cols: ["#E8A23A", "#C2577A", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"], [LE("n1103b") + .1, "laughing"]] } })
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + 2.4, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("n1103b") - .3, "sit"], [LT("n1104") - .1, "waving"]], wave: true })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + 2.5, poses: [[s.t0 + .7, "sit"], [MK("ff_strong") + .1, "surprised"], [MK("ff_strong") + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE) + smallPrint(t, s.t0 + .5, CRUMB_RULE, 1); };
const W0 = () => [1, 960, 540];

/* 12 · the dare for Episode 23: Momo, beside the pond, holds a NEW iron nail with a long plastic-covered wire coiled round it, its two bare
   ends touched to ONE AA battery in its holder on the bench (coil: a tiny click); the nail over the tray: clips jump up and cling to its tip;
   her paw reaches for the wire and the picture goes to the cards BEFORE the wire comes off (no answer shown). ONE set of TWO big numbered
   cards (dareIn: ep22dare.js darePic22); NEXT · What happens?; Lock in your answer! Pip and Basil thinking (a question; no hints) */
SC.dare = (t, s) => { const a = "n1201", tc = [W(a, "one") - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, tQ = W(a, "what") - .15, tIn = tc[0] - 1.0, e2 = eio(clamp((t - tIn) / 1.2)), [px, py] = pawPt("momo", 560, 1076, 500, false);
  const K = 1.1, tipX = px + 287 * K, BAT = [px + 210, 1040], cs = MK("coil"), tJ = cs + 1.6;
  const coil = coilNail22d(px + 137 * K, py, K, 0, { ends: [[-120, 70], [140, 70]] }) + `<path d="M${n2(px + 137 * K - 120 * K)} ${n2(py + 70 * K)} Q${BAT[0] - 160} ${BAT[1] - 30} ${BAT[0] - 92} ${BAT[1] - 48}" stroke="#F29A3A" stroke-width="7" fill="none"/><path d="M${n2(px + 137 * K + 140 * K)} ${n2(py + 70 * K)} Q${BAT[0] + 160} ${BAT[1] - 30} ${BAT[0] + 92} ${BAT[1] - 48}" stroke="#F29A3A" stroke-width="7" fill="none"/>` + battery22d(BAT[0], BAT[1], .85);
  const labs = t < tIn ? linkChip(t, cs + .8, px + 60, py - 260, px + 120, py - 30, "#fff", "a new iron nail", 36, tIn, P.ink) + linkChip(t, cs + 1.8, px + 560, py - 170, px + 250, py - 10, "#F29A3A", "a long wire, coiled round it", 36, tIn) + linkChip(t, cs + 2.8, px + 620, 1000, BAT[0] + 100, BAT[1] - 50, P.ink, "one AA battery", 36, tIn) : "";
  return room(t, camMix(camRoom, camOn([900, 640], 1.1, 960, 520), e2)) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * e2)}"/>`
    + bd("basil", 1480, 1010, 380, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] }) + bd("pip", BX.r, 1076, 480, t, { in: s.t0 + .3, flip: true, poses: [[s.t0, "sit"], [tQ + .45, "thinking"]] })
    + bd("momo", 560, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], noreact: true }) + OP(1 - e2 * .6, coil + trayClips22(t, tipX - 10, 1074, .7, { n: 12 }) + (t >= tJ - .1 ? clipBunch(t, tipX, py, 5, { k: .9, t0: tJ, from: [tipX, 1030] }) : "")) + labs
    + (t >= tJ + .3 && t < tIn ? TF(tipX + 200, py - 150, spring(t, tJ + .3, .4), tpill(0, 0, "clips jump up!", 36, GOODC, "#fff", { w: 700 })) : "")
    + NEXT_CARDS.map((c, i) => { const t0 = tIn + .3 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 760 + i * 440, 1020);
      return d + TF(x, 830, 1, choiceCard3(i + 1, c, darePic22(i, t), { w: 420, h: 330, size: 32, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · What happens?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + smallPrint(t, cs + .2, BATT_RULE) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1030, .95, pond22(t, 0, 0, 1, { big: false, rods: [[1, "nail", -64, "big"]] })) + TF(1260, 700, .6, wb22(t, 0, 0, 1, { all: true }))
  + (t >= s.t0 + .5 ? TF(560, 760, spring(t, s.t0 + .5, .4), `<g transform="rotate(-4)"><rect x="-190" y="-50" width="380" height="100" rx="10" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>${T(0, 16, "READY FOR FRIDAY!", 40, "#D84A3A")}</g>`) : ""), { bx: [220, 1720, 1430], hx: 470 });
})(); }
