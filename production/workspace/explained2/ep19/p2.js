// p2.js: PART 2, "Copper Is a METAL. So Why Won't a Magnet Pull It?": the recycling corner (two rinsed cans), Round 1 (which can will the
// magnet pull? two, the steel food tin), be an aluminium can (the blue bin, a recycling plant, the giant magnet lifts the steel tins, you roll
// on), not all metals (the book's eight objects, NON-MAGNETIC MATERIALS, the METALS family board; Mark Sentence 6.4), the Showdown (Basil's
// homework: the foil is shiny and grey, so magnetic?), the theme's word (a swing; I0.1; INTERACT) and how magnets interact (6.4a; CLASSIFY;
// the test table's halves get the book's names; Mark Sentence 6.5), the chant, the snail, the dare into EP20 (two ring magnets on a pencil).
// Segments 1-14 of ../p3_ep19_script.md section 5 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): our block's void deck after a shower (art19.js VD19 with the blue recycling bin, the wet floor, drips, the planter
// of wet plants), the playground's swing (PG19), the MAGNET TEST TABLE and its tray (tray19: the halves fill on their marks and get the book's
// names at `groups`); the buddies stand IN the scene, big; the wrong buddy stays shy and the right ones confident through every fix.
if (PART === 2) { (() => {
const L1 = "n401";
// the scores (script section 3): Round 1 1 : 1 (Pip and Basil right: the Buddies score), Showdown 3 : 1 (built on Basil's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const CANS = ["The drink can", "The food tin", "Both"];
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const [TX, TY] = TABLE19;
const MAGAT = [TX - 250, TY + 34], TINAT = [TX + 120, TY + 50], CANAT = [TX + 250, TY + 50];
const magT = (t) => TF(MAGAT[0], MAGAT[1], .42, magnet19(t));
const heldMagnet = (t, x, y, k = .42, o = {}) => TF(x, y, k, TF(0, -150, 1, `<g transform="rotate(90)">${magnet19(t, { glint: false })}</g>`) + holdHand(1.15, 0).replace("translate(0 0)", "translate(0 -250)") + (o.tin ? TF(0, 330, 1, tin19(1, t)) : "") + (o.pin ? TF(-6, 96, 1, pin18(), 78) : ""));
// the two rinsed cans on the table's front strip (they come in at `cans`, leave into the tray at ansglow)
const cansOn = (t, o = {}) => { const a = MK("cans"); if (t < a) return ""; const out = []; if (!o.noTin) out.push(TF(TINAT[0], TINAT[1] - 30 * (1 - eo(clamp((t - a - .4) / .3))), .4, tin19(1, t))); if (!o.noCan) out.push(TF(CANAT[0], CANAT[1] - 30 * (1 - eo(clamp((t - a - .7) / .3))), .4, can19(1, t))); return out.join(""); };
// the book's other objects in a row on the table's front strip (until they go into the blue half at v_metals)
const ROWK = ["towel", "foil", "ruler", "bowl", "eraser", "bottle", "cup"];
const rowOn = (t) => t >= MK("v_metals") ? "" : ROWK.map((kd, i) => TF(TX - 300 + i * 100, TY + 58, .42, OBJ[kd](t))).join("");

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["A magnet: usually iron or steel", "Attracted: iron and steel", "Copper is a metal. Why not?"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · the recycling corner after a shower: a slow drift from the blue bin to the test table; Basil sets down two clean empty cans he rinsed
   at home (cans) and points at them after his line. The snail on the side of the blue bin (the intro spot: the game pushes in here) */
const camPlace = (t) => { const s = SCN.place, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([BIN19[0] - 40, 640], 1.45, 960, 520), camOn([TX + 160, TY - 40], 1.3, 960, 640), u); };
const placeWorld = (t, cam, o = {}) => VD19(t, { top: magT(t) + cansOn(t), ...o }, cam);
SC.place = (t, s) => placeWorld(t, camPlace(t))
  + bd("basil", 260, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n201b") + .1, "pointing"]] })
  + bd("pip", 1440, 1010, 380, t, { in: s.t0 + .2, flip: true }) + bd("momo", 1720, 1076, 480, t, { in: s.t0 + .3, flip: true })
  + OP(ramp(t, s.t0 + .3, .5), lowerPill(60, 96, "A recycling corner, Singapore ·", "after the rain")) + melt(t, s, "lasttime", .5) + HUD(t);
SC.game = (t, s) => { const cE = camPlace(SCN.place.t1), p = SNAT.game;
  return gameScene(t, s, ["n202", "n203b", "n204"], false, { world: (tt) => placeWorld(tt, cE, { snail: p }), A: camPt(cE, [p[0] + 10, p[1] - 30]), T: [680, 440], Z: 2.8, dim0: 0 }) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Not all metals", ""], ["How magnets interact", ""], ["Test, do not guess", ""]], ["n301", "n302", "n303", "n304"], "momo");

/* 4 · Round 1: which can will the magnet pull? THREE big numbered picture cards (the drink can · the food tin · both); the clue labels both are
   metal · both are shiny ON TOP of the ring; in the ring the bar magnet above the two cans. Basil leads (thinking, then worried) */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "which") - .35, cards: CANS, clues: [["both are metal", W(L1, "one")], ["both are shiny", W(L1, "two")]], csize: 36, lead: "basil",
  pics: [0, 1, 2].map((i) => canPic(i, t)), q: "Which can will the magnet pull?", tq: W(L1, "which") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", obj: ringP2,
  react: [[LE("n404p") + .1, "pip", "pointing"], [LE("n404p") + 2.0, "pip", "sit"], [LE("n405b") + .05, "basil", "sit"]],
  picks: [{ who: "momo", id: "n403m", word: "3" }, { who: "pip", id: "n404p", word: "2" }, { who: "basil", id: "n405b", word: "2" }] });

/* 5 · Be an aluminium can! One glide from the test table to the blue bin's round opening; the buddies wave the viewer off (goodbye) and shrink
   (a pop each). The snail on a wet fallen leaf on the path as the camera passes */
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([TX + 100, TY - 60], 1.15, 960, 640), camOn([BIN19[0] - 60, BIN19[1] - 250], 5, 960, 540), u * u); };
const wetLeaf = (x, y, k = 1) => TF(x, y, k, `<path d="M-50 6 Q-10 -26 50 -4 Q10 26 -50 6z" fill="#7A9A3A" stroke="#4E6A22" stroke-width="4"/><path d="M-46 5 Q0 0 46 -3" stroke="#4E6A22" stroke-width="3"/><circle cx="20" cy="-6" r="5" fill="#E6F6FF" stroke="#9FCFE8" stroke-width="1.5"/>`, -8);
SC.waitw = (t, s) => { const L = "n501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1, sn = SNAT.waitw;
  const buds = ["momo", "basil", "pip"].map((w, i) => { const x = [280, 560, 1720][i]; return bd(w, x, 1076, [460, 440, 460][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return VD19(t, { items0: wetLeaf(sn[0] + 4, sn[1] + 2, 1.1), top: magT(t) + cansOn(t) + rowOn(t) }, camWait(t)) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be an aluminium can!", 72, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#0E1A3A", 960, 540); };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jclang") + .1, "surprised"], [m("jclang") + 2.2, "sit"]] };
  return canJourney(t, s) + riderBox(t, 300, 1066, .9) + riderBox(t, 1700, 1070, .7)
    + riders(t, s, { tin: m("jbin") + .6, h: 200, at: { pip: [210, 1044], basil: [1700, 1050], momo: [400, 1040] }, poses: rp })
    + youTag(t, MK("jbin"), "You: an aluminium can") + speeded(t, MK("jtruck") - .2, MK("jbelt") + 1.5); };
// the pull back out: a hand brings Basil's magnet near the two cans: the food tin slides over and holds on; the drink can stays
const HP = [TX + 120, TY - 120];
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return VD19(t, { top: heldMagnet(t, HP[0], HP[1], .42, { tin: true }) + cansOn(t, { noTin: true }) + magT(t) + rowOn(t) }, camMix(camOn([TX + 100, TY - 60], 1.35, 960, 640), camOn([TX + 100, TY - 60], 3.5, 960, 640), u))
    + bd("basil", 240, 1076, 480, t, { in: s.t0 + .2 }) + bd("momo", 1330, 1000, 380, t, { in: s.t0 + .25, flip: true }) + bd("pip", 1700, 1076, 500, t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer: two, the steel food tin. The magnet holds the tin; at ansglow the tin goes into the green half and the drink can into the
   blue half. The three cards small at the top left (card 2 lit; "not pulled" on 1 and 3); the coin (the Buddies also score). Pip and Basil
   (right) confident, Momo (wrong) shy through the whole answer. The snail on the leg of the stone table */
const camTin = (t) => camOn([TX + 40, TY - 60], 1.32, 960, 640);
SC.tinans = (t, s) => { window._BUBAT = { '*': [960, 300] }; const tA = MK("ansglow"), off = eio(clamp((t - tA - .1) / .6));
  return VD19(t, { top: (t < tA + .7 ? heldMagnet(t, HP[0], HP[1] - 600 * off, .42, { tin: t < tA }) : "") + cansOn(t, { noTin: true, noCan: t >= tA }) + magT(t) + rowOn(t) }, camTin(t))
    + `<g filter="url(#drop)"><rect x="30" y="40" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + CANS.map((c, i) => TF(150 + i * 200, 135, .42, choiceCard3(i + 1, c, canPic(i, t), { w: 400, h: 330, size: 36, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "ta" + i }))).join("")
    + [0, 2].map((i) => tagAt(t, tA + .3 + .15 * i, 150 + i * 200, 222, 1, "not pulled", 22)).join("")
    + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed two fingers")
    + bd("basil", 240, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tA, "arms_crossed"]] }) + (t > s.t0 + .3 ? pickNum("basil", 400, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 460, 585, .7)
    + bd("momo", 1330, 1000, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tA, "oops"]] }) + (t > s.t0 + .35 ? pickNum("momo", 1210, 720, t, s.t0 + .35, "3") : "") + xChip16(t, tA + .25, 1260, 665, .7)
    + bd("pip", 1700, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tA, "arms_crossed"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1870, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1850, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Momo at the test table: "Why does the magnet ignore them?" The book's other objects in a row in front of the tray; the camera pushes in on
   the row (into the look-closer). Momo talks, then thinks (her real question). The snail on the tiled base of pillar A */
const camRow = (t) => { const s = SCN.table, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([TX, TY - 60], 1.2, 960, 640), camOn([TX, TY + 40], 1.8, 960, 660), u); };
const rowWorld = (t, cam) => VD19(t, { top: magT(t) + rowOn(t) }, cam);
SC.table = (t, s) => rowWorld(t, camRow(t))
  + bd("momo", 290, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n701m") + .1, "thinking"]], look: 3 })
  + bd("pip", 1340, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1690, 1076, 480, t, { in: s.t0 + .2, flip: true }) + melt(t, s, "tinans", .3) + HUD(t);
/* [LOOK CLOSER] not all metals (art19.js metalsArt). Faces: Momo at the right the whole time (her pick, both cans, is tested: thinking;
   surprised ON metals; then shy through the rest: her idea is the one corrected; she speaks her fix in her talking sprite, no cheer);
   at the left Basil (teaching non-magnetic; confident after his line: he was right) then Pip (teaching the surprise; confident after it) */
const peekFace = (who, side, t, tin, tout, poses) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true }); };
SC.lcmetals = (t, s) => { window._BUBAT = { basil: [760, 905], pip: [700, 905], momo: [1220, 905] }; const cE = camRow(SCN.table.t1), p = camPt(cE, [TX, TY + 50]), tm = s.t0 + 1.2, tM = MK("metals"), tb = LT("n704b") - .5, tp = LT("n705p") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: metalsArt, bgc: "#FFF8EA", set: (tt) => rowWorld(tt, cE), verdict: [`NOT ALL METALS ARE MAGNETIC`, GOODC], tv: MK("v_metals"), peek: false,
    over: (tt) => peekFace("momo", "r", tt, tm, undefined, [[tm + .2, "thinking"], [tM + .1, "surprised"], [tM + 2.0, "oops"]]) + peekFace("basil", "l", tt, tb, tp - .2, [[LE("n704b") + .1, "arms_crossed"]]) + peekFace("pip", "l", tt, tp, undefined, [[LE("n705p") + .1, "arms_crossed"]]) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n709", sayId: "n708", who: "pip", n: "1 of 2", text: "Objects that are not attracted to magnets are made of non-magnetic materials. Non-magnetic materials include ceramic, fabric, glass, plastic, rubber and wood. Metals such as aluminium and copper are also non-magnetic.", keys: ["not", "attracted", "non-magnetic", "materials", "aluminium", "copper"], size: 44, y: 215, footer: FOOT, achieved: true, poses: [[LE("n709") + .2, "cheer"], [LE("n709") + 2.0, "sit"]],
  under: tray19(t, 1320, 935, .6 * spring(t, s.t0 + .4, .5), [["pin", 0, 0], ["tin", 0, 0], ["wire", 1, 0], ["can", 1, 0], ["towel", 1, 0], ["foil", 1, 0], ["ruler", 1, 0], ["bowl", 1, 0], ["eraser", 1, 0], ["bottle", 1, 0], ["cup", 1, 0]]) });

/* 8 · Showdown: Basil's homework on his easel beside the test table (art19.js basilSheet, drawn to match his spoken lines). The lines light as he
   reads them (l1, l2, l3). The YOU ring (5 s) big on the blue stage, the sheet big beside it; only Basil at the side (worried). LOCKED IN!;
   Momo reveals (OUTCOMES at n804m: Momo and Pip confident, Basil shy, through the whole fix). The snail on the foot of Basil's easel */
const EAS = [700, 1078, .62];
const hwLit = (t) => { const ms = [MK("l1"), MK("l2"), MK("l3"), LE("n802b") + .2]; return [0, 1, 2].map((i) => ss(ms[i] - .1, ms[i] + .3, t) * (1 - ss(ms[i + 1] - .2, ms[i + 1] + .2, t))); };
const camShow = (t) => { const e = eio((t - LT("n802b") + .6) / 1.2) * (1 - eio((t - MK("ring0_show") + 1) / .8)); return camMix(camOn([TX - 100, TY - 200], 1.05, 960, 600), camOn([EAS[0], EAS[1] - 330], 1.5, 760, 540), e); };
const showWorld = (t, cam, o = {}) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), sn = !o.noSnail && (t < r0 - 1 || t > bell + 1) ? SNAT.show : false;
  return VD19(t, { snail: o.snail !== undefined ? o.snail : sn, top: magT(t) + (o.top || ""), front: TF(EAS[0], EAS[1], EAS[2], basilSheet(t, o.sheet || { lit: hwLit(t) })) }, cam); };
SC.show = (t, s) => { window._BUBAT = { basil: [1500, 230], momo: [1330, 250], pip: [1330, 250] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("n803") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tM = LT("n804m");
  return showWorld(t, camShow(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>` + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(640, 1100, .86, basilSheet(t, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 210, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [r0 - .3, "worried"], [bell + .35, "sit"], [tM, "oops"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1450, 1020, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"], [tM, "arms_crossed"]] }) + (t > bell + .6 ? pickNum("pip", 1330, 700, t, bell + .6, "3") : "")
    + bd("momo", 1720, 1076, 500, t, { in: bell + .3, flip: true, poses: [[bell + .3, "sit"], [tM, "arms_crossed"]] }) + (t > bell + .5 ? pickNum("momo", 1580, 640, t, tM - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
/* the fix: line 3 struck (strike) and rewritten in green (rewrite); test: a hand passes the magnet over the foil on the table: it does not move
   (a blue tag tested, joined to the foil); the coin +2 (coin2). Basil shy through the whole fix; Momo and Pip confident. The snail on the edge of
   the planter of wet plants by the open side */
const FOILAT = [TX + 40, TY + 46];
SC.fix = (t, s) => { window._BUBAT = { '*': [1330, 250] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t), e = eio((t - s.t0) / 1), tT = MK("test"), u = clamp((t - tT) / 1.6);
  const cam = camMix(camOn([EAS[0] + 100, EAS[1] - 330], 1.2, 860, 560), camOn([TX - 120, TY - 120], 1.15, 960, 600), eio(clamp((t - tT + .3) / .8)));
  const pass = t > tT - .3 && t < tT + 2 ? heldMagnet(t, lerp(FOILAT[0] - 160, FOILAT[0] + 160, eio(u)), FOILAT[1] - 30, .4) : "";
  const fp = camPt(cam, FOILAT);
  return showWorld(t, cam, { noSnail: true, snail: SNAT.fix, top: TF(FOILAT[0], FOILAT[1], .4, foil19(1, t)) + pass, sheet: { strike: st, fix: fx, lit: [0, 0, 0] } })
    + linkChip(t, tT + .6, fp[0] + 230, fp[1] - 230, fp[0], fp[1] - 10, 1, "tested: not attracted", 38)
    + coin(t, MK("coin2") - .1, 1560, 330, "+2", "line 3")
    + bd("basil", 210, 1076, 480, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] }) + bd("pip", 1450, 1020, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + bd("momo", 1720, 1076, 500, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + HUD(t); };

/* 9 · our new theme: Interactions. The playground beside the void deck (wet, bright): Pip gives an empty swing a gentle push (swing) and it
   swings away; then ONE glide back to the test table (the two places side by side: no cut). The book's I0.1 on its cream strip (Heart reads
   it); INTERACT pops (lib.js o.at). Pip teaches it: a hand holds the magnet over a pin and the pin jumps up to it on "pulls". The snail on the
   leg of the swing frame */
const camIA = (t) => { const a = MK("kw_interact") - .8, u = eio(clamp((t - a) / 1.6)); return [u, camMix([1.0, 960, 540], camOn([TX, TY - 100], 1.35, 960, 620), u)]; };
const PINT = [TX - 60, TY + 50];
SC.interact = (t, s) => { window._BUBAT = { pip: [760, 300] }; const [u, cam] = camIA(t), tw0 = MK("swing"), tPu = W("n903p", "pulls") - .1, jp = eio(clamp((t - tPu) / .4));
  const pg = PG19(t, { push: tw0, items: snail19At(t, 588, 700, .26, -76, 1) }), push = t > tw0 - .4 && t < tw0 + 1.2 ? OP(1 - ss(tw0 + .8, tw0 + 1.2, t), `<path d="M420 640 L600 660" stroke="${P.sun}" stroke-width="14" stroke-linecap="round"/><path d="M584 638 L612 662 L578 684" fill="none" stroke="${P.sun}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`) : "";
  const deck = VD19(t, { snail: false, top: magT(t) + (t >= LT("n903p") - .5 ? heldMagnet(t, PINT[0] + 8, PINT[1] - 130, .42, { pin: jp > .99 }) + (jp < .99 ? TF(PINT[0], lerp(PINT[1], PINT[1] - 110, jp), .42, pin18(), lerp(0, 78, jp)) : "") : TF(PINT[0], PINT[1], .42, pin18())) }, cam);
  return `<g transform="translate(${n2(1920 * u)} 0)">${pg + push}</g><g transform="translate(${n2(-1920 * (1 - u))} 0)">${deck}</g>`
    + bookCaption(t, "n902", "Magnets interact with other objects too.", 470, { size: 50 })
    + bd("pip", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n903p") + .1, "pointing"], [LE("n903p") + 1.8, "sit"]], jump: [[tw0 - .3, 22]] })
    + bd("basil", 1350, 1000, 380, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1720, 1076, 480, t, { in: s.t0 + .2, flip: true }) + melt(t, s, "fix", .4) + HUD(t); };
/* [LOOK CLOSER] how magnets interact (art19.js interactArt): the tray fills the panel; the magnet meets each object; CLASSIFY pops; the halves
   get the book's names (groups). Faces: Momo at the left (auto: she teaches; pointing at the two halves after her line); Basil at the right
   nodding along (listening) */
SC.lcinteract = (t, s) => { window._BUBAT = { '*': [960, 250] }; const cE = camIA(SCN.interact.t1)[1], p = camPt(cE, [TX, TY - 46]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: interactArt, bgc: "#FFF8EA", set: (tt) => VD19(tt, { snail: false, top: magT(tt) }, cE), verdict: [`TWO GROUPS: MAGNETIC AND NON-MAGNETIC`, GOODC], tv: MK("v_classify"), peekH: 470,
    peekEv: [[LE("n906m") + .1, "momo", "pointing"], [LE("n906m") + 2.0, "momo", "sit"]],
    over: (tt) => peekFace("basil", "r", tt, tm) + lcStrip(tt, "n905", "One of the ways to classify these materials is to observe how they interact with a magnet.", { t1: LT("n906m") + 1.0, size: 38 }) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n908", sayId: "n907", who: "basil", n: "2 of 2", text: "A magnet can interact with objects that are made of magnetic materials.", keys: ["interact", "magnetic", "materials"], size: 64, y: 240, footer: FOOT, achieved: true, poses: [[LE("n908") + .2, "cheer"], [LE("n908") + 2.0, "sit"]], under: tray19(t, 1320, 935, .6 * spring(t, s.t0 + .4, .5)) });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 50, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 640, .86, chantBoard19(tt, flash)) });

/* 11 · score hand, the snail (lizReveal onto a wet leaf of the potted plant by pillar A: the REVEAL spot, never the intro bin) and Basil's fun
   fact: the deep sea and its hot spring (ff_deep), the scaly-foot snail (ff_snail), a magnet gives it a little tug (ff_magnet). Pip points at
   the snail as it is ringed; Momo surprised ON ff_magnet */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = SNAT.liz, tc = W(L, "snail");
  return lizReveal(t, s, L, VD19(t, { top: magT(t) }), c[0], c[1] - 20, tq, "It was on a wet leaf of the potted plant!", -120, 160, 80, 3.2, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 700, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103b", at: [1270, 400], w: 900, h: 440, items: [["ff_deep", "deep in the sea", ffDeep19], ["ff_snail", "iron in its shell", ffSnail19], ["ff_magnet", "a magnet can attract it!", ffTug19]], cols: ["#5B6BD6", "#3A3A46", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("pip", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .1, "pointing"], [LT("n1103b") - .3, "sit"]] })
    + bd("momo", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_magnet") + .1, "surprised"], [MK("ff_magnet") + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the dare for Episode 20: the test table, complete. A pencil stands upright in a lump of plasticine; Pip slides on two ring magnets (rings):
   the top one stops in mid-air and FLOATS above the bottom one, a clear gap (float). ONE set of TWO big numbered cards slides in low (dareIn):
   1 A pull · 2 A push. Pip a proud smile; Basil and Momo think on "What holds it up?" (a question; no hints) */
const PEN = [TX + 250, TY + 64];
SC.dare = (t, s) => { const a = "n1201", tR = MK("rings"), tF = MK("float"), tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1], tL = W(a, "lock") - .1;
  const n = t < tR ? 0 : t < tR + .5 ? 1 : 1 + eio(clamp((t - tR - .5) / (tF - tR - .5))), e1 = eio(clamp((t - tR) / 1.2)), e2 = eio(clamp((t - tQ + .6) / 1.4));
  const cam = camMix(camMix(camOn([TX, TY - 60], 1.2, 960, 640), camOn([PEN[0], PEN[1] - 170], 2.3, 960, 520), e1), camOn([TX, TY - 120], 1.25, 960, 520), e2);
  return VD19(t, { snail: false, top: magT(t) + TF(PEN[0], PEN[1], .5, pencilRings(t, { n })) }, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.3 * e2)}"/>`
    + NEXT_CARDS.map((c, i) => { const t0 = Math.max(MK("dareIn") + .5, tQ) + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 600 + i * 370, 1020);
      return d + TF(x, 860, .8, choiceCard3(i + 1, c, nextPic(i), { w: 400, h: 330, size: 40, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · What holds it up?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("pip", 230, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], jump: [[tF + .1, 20]] })
    + bd("basil", 1560, 1060, 400, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] })
    + bd("momo", 1790, 1066, 400, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .4, "thinking"]] }) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, tray19(t, 960, 820, .85), { bx: [230, 1720, 1420], hx: 470 });
})(); }
