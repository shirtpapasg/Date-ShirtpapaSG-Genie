// p1.js: PART 1, "Will a Magnet Pull a COPPER Wire? What a Magnet Really Is": EP18's dare answered (one, the steel pin), a brand-new theme
// (INTERACTIONS), what a magnet is (the lodestone 6.1; the cut-away: usually iron or steel; MAGNET; the six shapes; Mark Sentence 6.2), be a
// steel pin (the tug, the click, the copper wire that never moved), the answer, HOLD ON! (Momo: not lifted, so not attracted: Mum's iron wok;
// the fridge door), is a magnet sticky? (slow motion: ATTRACT, MAGNETIC MATERIALS; Mark Sentence 6.3), the pigeon, the cliffhanger (copper is
// a metal: why does the magnet ignore it?). Segments 1-13 of ../p3_ep19_script.md section 4 (version 1, 23 Nov 2026).
// STAGE 2 (drawn 2026-11-23): one real place, our block's VOID DECK on a Saturday afternoon (art19.js VD19: EP18's void deck turned to the
// afternoon light, the INTERACTIONS banner on EP18's easels, the grey pipe, the notice board, the lamp post and the bicycle rack outside, the big
// potted plant, the MAGNET TEST TABLE with its tray); the buddies stand IN the scene, big, with a contact shadow; the camera drifts or pushes in
// and never cuts inside a place. Every pose has its reason (SCENES_TODO.md); the buddy who got it wrong stays shy and the right ones confident
// through the whole fix (SERIES_FORMAT 5, 23 Nov). Every action is drawn AT its mark (the sound keys on them).
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 0 (only Momo right: the Buddies score nothing), HOLD ON! 2 : 0
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("m903", "one") - .1, 2, 0]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const melt = (t, s, name, d = .4) => { const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; window._noHud = true; let v = ""; try { v = SC[name](SCN[name].t1 - .04, SCN[name]); } finally { window._noHud = false; } return OP(a, v); };
const [TX, TY] = TABLE19;
// the things on the table's front strip (in front of the tray): the magnet, the steel pin, the copper wire
const MAGAT = [TX + 230, TY + 34], PINAT = [TX - 120, TY + 38], WIREAT = [TX + 20, TY + 44];
const magOnTable = (t, k = .42) => TF(MAGAT[0], MAGAT[1], k, magnet19(t));
const pinWire = (t, t0) => { if (t0 === undefined) return TF(PINAT[0], PINAT[1], .42, pin18()) + TF(WIREAT[0], WIREAT[1], .42, wire18());
  return [[PINAT, pin18, 0], [WIREAT, wire18, .3]].map(([p, f, d]) => { const a = t0 + d; if (t < a) return ""; const u = clamp((t - a) / .35); return TF(p[0], p[1] - 40 * (1 - eo(u)) * (u < 1 ? 1 : 0), .42, f()) + (u < 1 ? dust(p[0], p[1] + 8, u, .5) : ""); }).join(""); };
// EP18's three dare cards along the front of the table (world): they slide in low
const DCX = [TX - 300, TX, TX + 300], DCY = TY + 150;
const dcards = (t, t0) => [0, 1, 2].map((i) => { if (t0 === undefined) return TF(DCX[i], DCY, .36, dareCard3(i, { id: "dc" + i })); const a = t0 + i * .3; if (t < a) return ""; const [x, d] = slideX(t, a, .7, i ? 2400 : -500, DCX[i], DCY + 60); return d + TF(x, DCY, .36, dareCard3(i, { id: "dc" + i })); }).join("");
// the magnet held by a hand (four fingers and a thumb), END down, at (x, y) = its lower end; o.pin: the pin hangs from that end
const heldMagnet = (t, x, y, k = .42, o = {}) => TF(x, y, k, TF(0, -150, 1, `<g transform="rotate(90)">${magnet19(t, { glint: false })}</g>`) + holdHand(1.15, 0).replace("translate(0 0)", "translate(0 -250)") + (o.pin ? TF(-6, 96, 1, pin18(), 78) : ""));

/* 1 · silent cold open: the void deck, Saturday afternoon. One slow push towards the test table. magOff: a hand lifts Basil's magnet off the
   banner's metal frame (it held a card in EP18's dare) and sets it by the tray; pinIn: the pin and the wire are set down; cardsIn: EP18's three
   dare cards slide in low; budsIn: the buddies pop in (Momo waving hello). The pigeon on the grey pipe under the ceiling (before the game) */
const camCold = (t) => camMix([1, 960, 540], camOn([TX, TY - 40], 1.22, 960, 660), eio(t / 6));
const magCold = (t) => { const a = MK("magOff"), u = clamp((t - a) / 1.4);
  if (t < a) return TF(BAN[0] - 300, 236, .3, magnet19(t)) + `<g transform="translate(${BAN[0] - 300} 250) rotate(-3)"><rect x="-56" y="0" width="112" height="80" rx="8" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="3"/>${T(0, 32, "NEXT TIME:", 16, P.ink)}${T(0, 58, "magnets!", 20, "#C4581E")}</g>`;
  if (u < .45) { const v = eio(u / .45); return TF(lerp(BAN[0] - 300, BAN[0] - 300, v), lerp(236, -120, v), .3, magnet19(t) + TF(0, -10, 1.2, holdHand(1, 0))); }
  if (u < 1) { const v = eio((u - .45) / .55); return TF(lerp(MAGAT[0], MAGAT[0], v), lerp(-200, MAGAT[1], v), .42, magnet19(t) + TF(0, -10, .9, holdHand(1, 0))); }
  return magOnTable(t) + (t < a + 1.8 ? TF(MAGAT[0], lerp(MAGAT[1], -300, eio((t - a - 1.4) / .4)), .42, TF(0, -10, .9, holdHand(1, 0))) : ""); };
const budsDeck = (t, tp, o = {}) => bd("basil", 250, 1076, 480, t, { in: tp, poses: [[tp, "sit"]], look: 3, jump: o.jb || [] })
  + bd("pip", 1395, 1030, 380, t, { in: tp + .2, flip: true, poses: [[tp, "sit"]], jump: o.jp || [] })
  + bd("momo", 1720, 1076, 480, t, { in: tp + .4, flip: true, poses: o.momo || [[tp + .4, "waving"], [tp + 2.3, "sit"]], wave: true });
SC.cold = (t, s) => { const tp = MK("budsIn");
  return VD19(t, { items: "", top: magCold(t) + pinWire(t, MK("pinIn")), front: dcards(t, MK("cardsIn")), child: .8 }, camCold(t)) + budsDeck(t, tp)
    + OP(ramp(t, .5, .5), lowerPill(60, 96, "A void deck, Singapore ·", "Saturday afternoon")); };

/* 2 · "Last time...": EP18's dare, word for word. ONE calm picture: the three dare cards side by side, a gentle push-in, the big ?, each card
   steps forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 2 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard3(i, { id: "lt" + i, pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9) })); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark(t, W("m202", "which") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "which") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the void deck: the camera drifts on along the table (it carries on under the title and into the theme: no cut). Pip keeps his
   answer to himself (a small hop), Basil a secret fist (a hop), Momo a sure little smile: no pose sprites */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camOn([TX - 60, TY - 40], 1.22, 960, 660), camOn([TX + 60, TY - 50], 1.26, 960, 660), eio(u)); };
const backWorld = (t) => VD19(t, { top: magOnTable(t) + pinWire(t), front: dcards(t) }, camBack(t)) + budsDeck(t, SCN.back.t0 - 3, { momo: [[0, "sit"]], jp: [[LT("m204") + .3, 26]], jb: [[LT("m204") + .5, 14]] });
SC.back = (t, s) => backWorld(t) + (t >= LT("m204") - .1 ? TF(960, 330, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
// the title slam over the dimmed void deck: WHICH ONE WILL IT PULL? (white) then MAGNET VS COPPER WIRE (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "WHICH ONE WILL IT PULL?", "#fff", k1) + slamFit(610, "MAGNET VS COPPER WIRE", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return backWorld(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · a brand-new theme: the camera glides up to the INTERACTIONS banner (its two questions readable for about 3 s; a small magnet spins once by
   its title), then down towards the grey pipe, where the game's push-in starts. Pip big at the right looking up; Basil and Momo at the left */
const camBan = camOn([BAN[0], BAN[1] - 20], 1.62, 960, 400), camPipe = camOn([1120, 200], 1.35, 960, 420);
const camTheme = (t) => { const s = SCN.theme, a = eio((t - s.t0) / 1.2), b = eio((t - (s.t1 - 1.3)) / 1.3); return b > 0 ? camMix(camBan, camPipe, b) : camMix(camBack(SCN.title.t1), camBan, a); };
SC.theme = (t, s) => { const dimT = 1 - clamp((t - s.t0) / .35);
  return VD19(t, { top: magOnTable(t) + pinWire(t), front: dcards(t), icon: MK("theme") }, camTheme(t))
    + (dimT > .01 ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dimT)}"/>` + OP(dimT, TITLE(1, 1)) : "")
    + bd("basil", 190, 1076, 440, t, { in: s.t0 + .2, poses: [[s.t0, "sit"]], look: -4 }) + bd("momo", 420, 1070, 400, t, { in: s.t0 + .3, poses: [[s.t0, "sit"]], look: -4 })
    + bd("pip", 1740, 1076, 500, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]], look: 5 }) + HUD(t); };
SC.game = (t, s) => { const cE = camPipe, p = PIGAT.game;
  return gameScene(t, s, ["m302", "m303b", "m304"], false, { world: (tt) => VD19(tt, { top: magOnTable(tt) + pinWire(tt), front: dcards(tt), pig: p }, cE), A: camPt(cE, [p[0], p[1] - 22]), T: [1400, 470], Z: 2.6, dim0: 0, ly: -150, qx: 1730, qy: 430 }) + smallPrint(t, LT("m304"), PIGEON_RULE); };
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");
SC.goals = (t, s) => goals3(t, s, [["What a magnet is", ""], ["What attract means", ""], ["Magnetic materials", ""]], ["m401", "m402", "m403", "m404"], "pip");

/* 5 · Round 1: EP18's dare (a short 3 s ring). EP18's three cards as the ONE set of numbered picture cards; the clue labels both are metal ·
   a bar magnet ON TOP of the ring; in the ring the bar magnet above the pin and the wire, big. Basil leads */
SC.r1 = (t, s) => lockN(t, { cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "which") + .15 * i]), lead: "basil", csize: 36, q: DARE_LABEL, tq: W(L1, "which") - .1,
  tc: [W(L1, "which"), W(L1, "pull"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1, 2].map((i) => darePic(i)), obj: ringP1,
  react: [[LE("m504p") + .1, "pip", "pointing"], [LE("m504p") + 2.0, "pip", "sit"]],
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "3" }] });

/* 6 · Momo at the test table: "Is it made of plastic?" The camera pushes in on Basil's magnet on the table (straight into the look-closer: no
   cut). Momo talks, then thinks (her real question). The pigeon on the ledge above the letterboxes */
const camTable = (t) => { const s = SCN.table, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([TX, TY - 60], 1.2, 960, 640), camOn(MAGAT, 1.9, 1000, 700), u); };
const tableWorld = (t, cam) => VD19(t, { top: magOnTable(t) + pinWire(t), front: "" }, cam);
SC.table = (t, s) => tableWorld(t, camTable(t))
  + bd("momo", 290, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m601m") + .1, "thinking"]], look: 3 })
  + bd("pip", 1340, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1690, 1076, 480, t, { in: s.t0 + .2, flip: true, jump: [[s.t0 + 1.2, 16]] })
  + melt(t, s, "r1", .45) + HUD(t);
/* [LOOK CLOSER] what is a magnet? (art19.js magnetArt: the lodestone story, the cut-away, the six shapes). Faces: the speakers at the left
   (auto: Pip teaches the lodestone, Basil the shapes and cheers at the verdict: a key word learnt); Momo at the right (her guess, plastic, is
   tested: thinking, surprised at the grey metal inside, then shy through the rest: her guess was wrong) */
const peekFace = (who, side, t, tin, tout, poses) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true }); };
SC.lcmagnet = (t, s) => { window._BUBAT = { '*': t < LT("m607b") - .5 ? [960, 870] : [960, 250] }; const cE = camTable(SCN.table.t1), p = camPt(cE, MAGAT), tm = s.t0 + 1.2, tI = MK("inside");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: magnetArt, bgc: "#FFF8EA", set: (tt) => tableWorld(tt, cE), verdict: [`A MAGNET: USUALLY IRON OR STEEL`, GOODC], tv: MK("v_magnet"), peekH: 470,
    peekEv: [[MK("v_magnet") + .1, "basil", "cheer"], [MK("v_magnet") + 2.3, "basil", "sit"]],
    over: (tt) => peekFace("momo", "r", tt, tm, undefined, [[tm + .2, "thinking"], [tI + .3, "surprised"], [tI + 1.8, "oops"]]) + lcStrip(tt, "m603", "A natural magnet is also called a lodestone.", { t1: LT("m604p") + 1.5 }) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m609", sayId: "m608", who: "basil", n: "1 of 2", text: "A magnet is an object that is usually made of iron or steel.", keys: ["object", "usually", "made", "iron", "steel"], size: 70, y: 250, footer: FOOT,
  under: TF(1240, 935, .9 * spring(t, s.t0 + .4, .5), `<g filter="url(#dropS)"><rect x="-620" y="-100" width="1240" height="200" rx="30" fill="#FFF8EA"/></g>` + SHAPES.map((nm, i) => TF(-520 + i * 208, -10, .62, shape19(i)) + T(-520 + i * 208, 76, nm, 26, P.ink)).join("")) });

/* 7 · Be a steel pin! The camera glides down from the wide void deck to the steel pin on the test table (one glide, no cut); the buddies wave
   the viewer off (goodbye), then each shrinks with a pop. The pigeon on top of the lamp post outside as the camera passes */
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("m902", "cross") - .3, b = LE("m903") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix([1.02, 960, 540], camOn([PINAT[0], PINAT[1] - 4], 4.2, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "m701", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "pip", "basil"].map((w, i) => { const x = [300, 1450, 1700][i]; return bd(w, x, [1076, 1030, 1076][i], [470, 380, 470][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return VD19(t, { top: magOnTable(t) + pinWire(t) }, camWait(t)) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a steel pin!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#E9E1D2", 960, 600); };
SC.shrink = (t, s) => { const m = MK, lift = ss(m("jlift"), m("jlook") + .6, t), dy = 380 * lift, kk = 1 - .35 * lift;
  const rp = { basil: [[m("jfar") + .1, "pointing"], [m("jfar") + 2.3, "sit"]], momo: [[m("jclick") + .1, "surprised"], [m("jclick") + 2.2, "sit"]] };
  return pinJourney(t, s) + riders(t, s, { tin: m("jtable") + .6, h: 200 * kk, at: { pip: [210, 1040 + dy * .2], basil: [1700, 1050 + dy * .2], momo: [400, 1034 + dy * .2] }, poses: rp })
    + youTag(t, MK("jtable"), "You: a steel pin") + feelTag(t, MK("jfar") + .3, MK("jtug") - .2, "to scale: a pin", 160) + feelTag(t, MK("jclick"), MK("jlift") - .1, "click!", 160); };
// the pull back out: the pin hangs from the END of the magnet (held by a hand); the copper wire still on the table
const HOLDP = [TX - 140, TY - 110];
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return VD19(t, { top: TF(WIREAT[0], WIREAT[1], .42, wire18()) + heldMagnet(t, HOLDP[0], HOLDP[1], .42, { pin: true }) }, camMix(camOn(HOLDP, 1.3, 960, 640), camOn(HOLDP, 4, 960, 640), u))
    + bd("momo", 1700, 1076, 500, t, { in: s.t0 + .2, flip: true }) + bd("pip", 1350, 1000, 380, t, { in: s.t0 + .25, flip: true }) + bd("basil", 240, 1076, 480, t, { in: s.t0 + .3 }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 8 · the answer is one: the steel pin. The pin hangs from the magnet's END over the green half and drops into it (trayPin); the copper wire is
   slid into the blue half (trayWire). EP18's three cards small along the top (card 1 lit at ansglow; "not pulled" on cards 2 and 3); the coin
   (only YOU). Momo (right) explains; Pip and Basil (wrong) stay shy through the whole answer, Momo confident (SERIES_FORMAT 5, 23 Nov). The
   pigeon on top of the notice board */
const camAns = (t) => { const a = eio((t - LT("m802m") + .4) / 1.2) * (1 - eio((t - LT("m803") - 1.2) / 1.4)); return camMix(camOn([TX, TY - 60], 1.3, 960, 640), camOn([TX, TY - 50], 1.75, 960, 620), a); };
SC.answer = (t, s) => { window._BUBAT = { momo: [1400, 300] }; const tA = MK("ansglow"), tPn = MK("trayPin"), tW = MK("trayWire");
  const hand = t < tPn + .9 ? heldMagnet(t, lerp(HOLDP[0], TX - 196 * .52, eio(clamp((t - s.t0) / 2))), lerp(HOLDP[1], TY - 130, eio(clamp((t - s.t0) / 2))) - 500 * eio(clamp((t - tPn - .2) / .7)), .42, { pin: t < tPn }) : "";
  const wire = t < tW ? TF(lerp(WIREAT[0], TX + 140, eio(clamp((t - tW + .6) / .6))), lerp(WIREAT[1], TY - 40, eio(clamp((t - tW + .6) / .6))), .42, wire18()) : "";
  return VD19(t, { titems: TRAY1, top: wire + hand }, camAns(t))
    + `<g filter="url(#drop)"><rect x="30" y="40" width="640" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(150 + i * 200, 135, .42, dareCard3(i, { id: "an" + i, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + [1, 2].map((i) => tagAt(t, tA + .3 + .15 * i, 150 + i * 200, 222, 1, "not pulled", 22)).join("")
    + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed one finger")
    + bd("basil", 240, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tA, "oops"]] }) + (t > s.t0 + .3 ? pickNum("basil", 400, 640, t, s.t0 + .3, "3") : "") + xChip16(t, tA + .2, 460, 585, .7)
    + bd("pip", 1330, 1000, 380, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [tA, "oops"]] }) + (t > s.t0 + .35 ? pickNum("pip", 1210, 720, t, s.t0 + .35, "2") : "") + xChip16(t, tA + .25, 1260, 665, .7)
    + bd("momo", 1700, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tA, "arms_crossed"], [LE("m802m") + .1, "pointing"], [LE("m802m") + 2.0, "arms_crossed"]] }) + (t > s.t0 + .4 ? pickNum("momo", 1870, 640, t, s.t0 + .4, "1") : "") + tickChip16(t, tA + .3, 1850, 580, .7)
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 9 · HOLD ON! Momo: "the magnet could not lift the wok, so the wok is not attracted". Mum's iron wok on the test table on a folded towel; her note
   card on a small easel. The HOLD ON! stamp; the countdown takes the stage (the blue game stage, the ring big and central with the magnet on
   the wok, the clue labels too heavy to lift · not attracted? ON TOP of the ring, YOU cross your arms; only Momo at the side, her thinking face
   standing in for worried). After the bell (m903) Momo stays shy through the whole fix; Pip and Basil confident. letgo: a hand holds the
   magnet against the side of the wok and lets go: it holds on (attracted!). fridge: the HDB kitchen inset. The pigeon on top of the banner's
   left easel (never in the ring) */
const WOK = [TX, TY + 10], NOTE = [600, 1078, .48], MSIDE = [TX + 170, TY - 6];
const wokItems = (t, o = {}) => { const tw0 = MK("wok"), u = clamp((t - tw0 + 1.2) / 1.2), lt = MK("letgo"), tryLift = t > tw0 && t < tw0 + 3.2 ? 1 : 0, strain = tryLift * 3 * Math.sin(t * 34);
  let s = TF(lerp(WOK[0] + 700, WOK[0], eio(u)), WOK[1] + 46, .55, towel19(1.9)) + TF(lerp(WOK[0] + 700, WOK[0], eio(u)) + strain, WOK[1] - 10, .55, wok19(1, t));
  if (t < lt - 1.6) { if (t > tw0) s += TF(WOK[0] + strain, WOK[1] - 30, .42, magnet19(t)) + (tryLift ? TF(WOK[0], WOK[1] - 40 - 6 * Math.abs(Math.sin(t * 6)), .55, holdHand(1, 0)) : ""); }
  else if (t < lt + .8) { const v = eio(clamp((t - lt + 1.6) / 1)), x = lerp(WOK[0], MSIDE[0], v), y = lerp(WOK[1] - 30, MSIDE[1], v), off = eio(clamp((t - lt) / .7)); s += TF(x, y, .42, magnet19(t), 90 * v) + TF(x + 40 * v + 300 * off, y - 30 - 120 * off, .5, holdHand(1, -40 * v)); }
  else s += TF(MSIDE[0], MSIDE[1], .42, magnet19(t), 90);
  return s; };
const camHold = (t) => { const a = eio((t - MK("wok") + .6) / 1.4) * (1 - eio((t - W("m902", "cross") + .8) / .8)), b = eio((t - MK("letgo") + 1.8) / 1.2) * (1 - eio((t - MK("fridge") - .2) / 1.2) * .5);
  return camMix(camMix(camOn([TX, TY - 60], 1.2, 960, 640), camOn([WOK[0], WOK[1] - 30], 1.9, 960, 620), a), camOn([MSIDE[0] - 60, MSIDE[1]], 2.1, 900, 600), b); };
const holdWorld = (t, cam) => { const r0 = MK("ring0_hold"), bell = MK("bell_hold"); return VD19(t, { pig: t < r0 - 1 || t > bell + 1 ? PIGAT.holdon : false, items: TF(NOTE[0], NOTE[1], NOTE[2], momoNote(t)), top: wokItems(t) }, cam); };
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { pip: [1330, 260], momo: [700, 280] }; const b = "m902", c = "m903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01;
  const inner = `<circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g transform="translate(${RG[0]} ${RG[1] + 40}) scale(1.05) translate(-430 -470)">${ringWok(t)}</g>`;
  const labels = [["too heavy to lift", 420, 250, -1], ["not attracted?", 1500, 250, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] - RR * .6, ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 54, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3), tF = MK("fridge");
  return holdWorld(t, camHold(t)) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".08"/>` + (ring ? OP(st, bg("stage")) : "")
    + (ring ? OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 640 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 470 + bob * .6, 1.2) + TF(1700, 860, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + (t >= MK("letgo") + .5 ? linkChip(t, MK("letgo") + .6, 980, 380, camPt(camHold(t), MSIDE)[0], camPt(camHold(t), MSIDE)[1] - 30, 0, "attracted!", 44) : "")
    + (t >= tF - .1 ? TF(1360, 360, spring(t, tF - .1, .45), fridgeInset(t)) : "")
    + bd("basil", 1420, 1000, 380, t, { in: LT(c) + .3, flip: true, poses: [[LT(c) + .3, "arms_crossed"]] })
    + bd("pip", 1720, 1076, 500, t, { in: LT(c) + .45, flip: true, poses: [[LT(c) + .45, "arms_crossed"], [LE("m904p") + .1, "pointing"], [LE("m904p") + 1.8, "arms_crossed"]] })
    + bd("momo", 230, 1076, 500, t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [LT("m901m") - .9, "pointing"], [LT("m901m") - .1, "sit"], [LE(b) - .2, "thinking"], [r0 - .2, "worried"], [bell + .35, "sit"], [LT(c), "oops"]], jump: [[bell + .02, 30]], nohop: true })
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 1420, 470, "+1", "arms crossed") + smallPrint(t, MK("wok"), KITCHEN_RULE) + melt(t, s, "answer", .4) + HUD(t); };

/* 10 · Basil at the wok: "Is my magnet sticky?" The magnet still holds on to the side of the wok; the camera pushes in on it (straight into the
   look-closer). Basil talks, then thinks (his real question). The pigeon on the rim of the big flower pot by the pillar */
const camSticky = (t) => { const s = SCN.sticky, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camHold(SCN.holdon.t1), camOn(MSIDE, 2.4, 1000, 600), u); };
const stickyWorld = (t, cam) => VD19(t, { items: TF(NOTE[0], NOTE[1], NOTE[2], momoNote(t)), top: wokItems(t) }, cam);
SC.sticky = (t, s) => stickyWorld(t, camSticky(t))
  + bd("basil", 260, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1001b") + .1, "thinking"]], look: 5 })
  + bd("momo", 1440, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("pip", 1720, 1076, 480, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] is a magnet sticky? (art19.js attractArt: slow motion, the gap, the click onto the END; ATTRACT and MAGNETIC MATERIALS pop:
   lib.js o.at). Faces: Basil at the right the whole time (his idea is tested: thinking, surprised ON gap, then shy through the rest: his idea
   is the one being corrected; he teaches "attract means pull" in his talking sprite); Pip at the left from his line (teaching magnetic
   materials; cheer at the verdict: a key word learnt) */
SC.lcattract = (t, s) => { window._BUBAT = { '*': [960, 600] }; const cE = camSticky(SCN.sticky.t1), p = camPt(cE, MSIDE), tm = s.t0 + 1.2, tG = MK("gap"), tp = LT("m1007p") - .5, tV = MK("v_attract");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: attractArt, bgc: "#FFF8EA", set: (tt) => stickyWorld(tt, cE), verdict: [`ATTRACT MEANS PULL`, GOODC], tv: tV, peek: false,
    over: (tt) => peekFace("basil", "r", tt, tm, undefined, [[tm + .2, "thinking"], [tG + .1, "surprised"], [tG + 2.0, "oops"]]) + peekFace("pip", "l", tt, tp, undefined, [[tV + .1, "cheer"], [tV + 2.3, "sit"]])
      + slowTag(tt, MK("slow"), 668, 240) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m1009", sayId: "m1008", who: "momo", n: "2 of 2", text: "Magnets attract objects made of magnetic materials. Magnetic materials include iron and steel.", keys: ["attract", "magnetic", "materials", "iron", "steel"], size: 60, y: 235, footer: FOOT, achieved: true, poses: [[LE("m1009") + .2, "cheer"], [LE("m1009") + 2.0, "sit"]],
  under: tray19(t, 1300, 930, .62 * spring(t, s.t0 + .4, .5), TRAY1B) });

/* 11 · score hand, the pigeon (lizReveal: the score hand melts into the void deck, ONE push-in onto the pigeon on top of the BICYCLE RACK: the
   REVEAL spot, never the intro pipe); Momo's fun fact: a pigeon far from home (ff_fly), the Earth's magnetism (ff_sense), home again (ff_home).
   Basil points at the pigeon as it is ringed; Basil surprised ON ff_sense */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1, c = PIGAT.liz, tc = W(L, "pigeon");
  return lizReveal(t, s, L, VD19(t, { titems: TRAY1B }), c[0], c[1] - 20, tq, "It was on top of the bicycle rack!", -120, 160, 80, 3.0, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 700, tx: 960, ty: 985, tell: "m1104",
    fact: { id: "m1103m", at: [1270, 400], w: 900, h: 440, items: [["ff_fly", "far from home", ffFly19], ["ff_sense", "the Earth's magnetism", ffSense19], ["ff_home", "home again!", ffHome19]], cols: ["#E8A23A", "#5B6BD6", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .1, "pointing"], [LT("m1103m") - .3, "sit"], [MK("ff_sense") + .1, "surprised"], [MK("ff_sense") + 2.2, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"]] }) + smallPrint(t, s.t0 + .5, PIGEON_RULE); };

/* 12 · the cliffhanger: a hand holds Basil's magnet right over the copper wire in the blue half and wiggles it (wire): the wire does not move at
   all; a ?; a chip copper: a metal by the wire, next to the green half's steel and iron (metal); PART 2. Basil big at the left (pointing at the
   wire before his line, thinking after it); Momo and Pip at the right, turned in to watch the wire (front views: there is no back view of Pip) */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / 3); return camMix(camOn([TX, TY - 60], 1.4, 960, 600), camOn([TX + 100, TY - 70], 1.95, 1000, 600), u); };
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1, tw0 = MK("wire"), cam = camCliff(t), wig = t > tw0 && t < tw0 + 4 ? 40 * Math.sin((t - tw0) * 7) : 0, wireP = [TX + 102, TY - 46 - 20], q = camPt(cam, [wireP[0] + 60, wireP[1] - 160]);
  const mag = t >= tw0 - .6 ? heldMagnet(t, wireP[0] + wig, lerp(wireP[1] - 400, wireP[1] - 40, eio(clamp((t - tw0 + .6) / .6))), .42) : "";
  const wpS = camPt(cam, [wireP[0], wireP[1] + 10]), stS = camPt(cam, [TX - 150, TY - 66]), irS = camPt(cam, [TX - 60, TY - 66]);
  return VD19(t, { pig: false, titems: TRAY1B, top: mag }, cam) + qMark(t, tw0 + .6, q[0], q[1])
    + linkChip(t, MK("metal"), wpS[0] + 120, wpS[1] + 170, wpS[0], wpS[1], 1, "copper: a metal", 40) + linkChip(t, MK("metal") + .25, stS[0] - 150, stS[1] + 170, stS[0], stS[1], 0, "steel", 40) + linkChip(t, MK("metal") + .4, irS[0] - 20, irS[1] + 260, irS[0], irS[1], 0, "iron", 40)
    + bd("basil", 280, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("m1201b") + .1, "thinking"]], look: 4 })
    + bd("momo", 1480, 1076, 440, t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .2, 20]] })
    + bd("pip", 1760, 1070, 440, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -6, jump: [[LT("m1202") + .35, 20]] })
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 13 · "Now you know!": the MAGNET TEST TABLE's tray (steel and iron attracted, the copper wire not), centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, tray19(t, 960, 820, .85, TRAY1B), { bx: [230, 1720, 1420], hx: 470 });
})(); }
