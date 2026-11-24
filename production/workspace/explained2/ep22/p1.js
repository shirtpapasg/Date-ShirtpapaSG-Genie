// p1.js: PART 1, "Stroke an Iron Nail Again and Again. Is It a MAGNET Now?": EP21's dare answered (two, the nail attracts the clips),
// be the iron nail (stroked head to tip, lifted up and away, again and again; carried to the clips, they jump up), the answer and STROKE
// METHOD (Basil), was it a magnet already? (Pip: iron nails always attract steel clips; a new nail over still clips; a magnet pulls it but it
// is not a magnet; Pip's nail with the magnet shut away: MAGNETISED; right card, wrong reason: no point; Mark Sentence 7.1), HOLD ON! (Basil
// tests his one-stroke nail with the magnet still in his paw; the book's step 4 on a strip), what can be magnetised? (copper wire, foil, a
// chopstick, a steel screwdriver: MAGNETIC OBJECT; Mark Sentence 7.2), the woodpecker, the cliffhanger (Basil's fast way: back and forth,
// both ends). Segments 1-13 of ../p3_ep22_script.md section 4 (version 1, 24 Nov 2026).
// STAGE 2 (drawn 2026-11-24): one real place, a HARDWARE SHOP at an HDB neighbourhood centre on Saturday morning (sets22.js HS22: the square
// with the angsana tree, the notice board, the pergola and the planter box; the frangipani; the shop front with its drawers, broom rack and
// wind chime; the pallets; the WOODEN FOLDING TABLE with OUR FISHING GAME at its HOME on the right end). The buddies stand IN the scene, big,
// with a contact shadow; a nail or a magnet a buddy holds is drawn at that buddy's paws (art22.js pawPt); the camera drifts or pushes in and
// never cuts inside the place. Every pose has its reason (SCENES_TODO.md, pose_reasons.json); the buddy who got it wrong stays shy and the
// right ones confident through the whole fix (lib.js OUTCOMES `to`). Every action is drawn AT its mark.
if (PART === 1) { (() => {
const L1 = "m501";
// the scores (script section 3): Round 1 1 : 0 (only Basil right for the right reason: Pip's card 2 had the wrong reason, so the Buddies do
// not score; a grey ? by the BUDDIES pill until the no-point pill), HOLD ON! 2 : 0 (nothing for the Buddies)
SCORE.push([MK("coin1") - .1, 1, 0]);
SCORE.push([W("m903", "one") - .1, 2, 0]);
const FOOT = "P3 · Making and Using Magnets · The stroke method";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { if (PART !== 1) return 0; const a = W("m902", "cross") - .3, b = LE("m903") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
// a thing held at a buddy's paws (drawn with its held end at the origin, reaching towards +x; mirrored for a buddy facing left)
const held = (who, x, y, h, flip, inner, dy = 0) => { const [px, py] = pawPt(who, x, y, h, flip); return TF(px, py + dy, 1, flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const NK = .62, nailH = (k = NK) => nail21(137 * k, 0, k);              // a nail held by its head (the head at the paw)
const tipOf = (who, x, y, h, flip, k = NK) => { const [px, py] = pawPt(who, x, y, h, flip); return [px + (flip ? -1 : 1) * 287 * k, py]; };
// the magnet stroking a held nail: the red end from the head to the tip, then lifted up and away back over the head (period per stroke)
const strokeHeld = (t, t0, n, per, k = NK) => { const u = t - t0; if (u < 0 || u >= n * per) return ""; const i = Math.floor(u / per), p = (u - i * per) / per, st = strokeAt(p, 22, -9 * k - 2, 270 * k, -9 * k - 2, 150, .5);
  return magAt(t, st.x, st.y, .4, st.rot) + (st.on ? motion22(st.x - 30, st.y - 40, 0, .5, "#fff") : ""); };
const strokeMarks = (t, t0, n, per, k = NK) => { let s = ""; for (let i = 0; i < n; i++) { const a = t0 + i * per; if (t < a) break; s += strokeArrow(t, a, 20, 26, 280 * k, 26, 7) + liftArc(t, a + per * .5, 285 * k, -18, 20, -18, 120, 5); } return s; };
// the shop with the table's props (the box's lid, the magnet in it, the tray's clip count) and the default camera
const W0 = [1, 960, 540];
const shop = (t, cam, o = {}) => HS22(t, { top: tableProps(t, o.tp || {}) + (o.top || ""), front: o.front, bird: o.bird, boardO: o.boardO }, cam);
const BX = { l: 300, r: 1700, m: 1440 };   // the buddies' usual places: big at the left / right (feet 1076), mid-ground (feet 1010)

/* 1 · the cold open, SPEAKING from 0.825 s (SERIES_FORMAT 11 item 1): the hardware shop on Saturday morning while Heart says "Last time, we
   asked: Pip strokes an iron nail with Basil's magnet, again and again, always the same way." Pip, big at the left, strokes the nail with
   Basil's magnet (stroke0: one stroke every 1.4 s, head to tip, lift up and away, as many as fit before the dare cards: five). budsIn (at the
   end of "Last time, we asked:"): Basil and Momo lean in (front views turned in); Momo waves hello. The woodpecker on the angsana's trunk (the
   intro spot). The place card from 0.2 s (about 7.5 s on screen). One slow push towards Pip's stroking paws over the whole scene */
const camCold = (t) => camMix(camOn([960, 600], 1.02, 960, 560), camOn([620, 760], 1.14, 700, 720), eio(t / SCN.cold.t1));
const NSTROKE0 = () => Math.max(3, Math.min(5, Math.floor((SCN.cold.t1 - MK("stroke0")) / 1.4)));   // sound_cues.js uses the same count
SC.cold = (t, s) => { const tb = MK("budsIn"), t0 = MK("stroke0");
  return shop(t, camCold(t), { tp: { lid: 0 } })
    + bd("basil", BX.r, 1076, 480, t, { in: tb, flip: true, poses: [[tb, "sit"]], look: -6 })
    + bd("momo", BX.m, 1010, 400, t, { in: tb + .15, flip: true, poses: [[tb + .15, "sit"], [tb + 1.0, "waving"], [tb + 3.0, "sit"]], look: -5, wave: true })
    + bd("pip", BX.l, 1076, 500, t, { in: -1, poses: [[0, "sit"]], look: 3 })
    + held("pip", BX.l, 1076, 500, false, nailH() + strokeMarks(t, t0, NSTROKE0(), 1.4) + strokeHeld(t, t0, NSTROKE0(), 1.4))
    + OP(ramp(t, .2, .4), lowerPill(60, 96, "A hardware shop, an HDB neighbourhood centre, Singapore ·", "Saturday morning")) + smallPrint(t, s.t0 + 2.4, NAIL_RULE); };

/* 2 · "Last time...": EP21's dare, word for word. ONE calm picture: the two dare cards side by side (EP21's own, ep21dare.js), a gentle
   push-in, the big ?, each card steps forward and lights while Heart says it (>= 2.5 s each) */
SC.lasttime = (t, s) => { const L = "m203", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard2(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i }, t)); });
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>`
      + qMark20(t, W("m202", "what") - .1, 960, 260)
      + TF(960, 1000, spring(t, W("m202", "what") - .1, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the table: Pip holds his stroked nail by its head above the tray (not lowered yet). Hold on to your answer!: Pip hides the nail
   behind his back with a hop (a secret), Basil a little hop, Momo a sure smile (no pose sprites). A slow drift that carries on under the title */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camOn([860, 760], 1.12, 900, 640), camOn([900, 740], 1.18, 900, 620), eio(u)); };
SC.back = (t, s) => { const th = LT("m204") + .3, hide = ss(th, th + .25, t);
  return shop(t, camBack(t), { tp: { lid: 1 } })
    + bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .05, flip: true, poses: [[s.t0, "sit"]], jump: [[LT("m204") + .5, 14]] }) + bd("momo", BX.m, 1010, 400, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"]] })
    + bd("pip", BX.l, 1076, 500, t, { in: s.t0, poses: [[s.t0, "sit"]], jump: [[th - .1, 26]] }) + OP(1 - hide, held("pip", BX.l, 1076, 500, false, nailH(), -30 * hide))
    + (t >= LT("m204") - .1 ? TF(960, 330, spring(t, LT("m204") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t); };
// the title slam over the dimmed table: STROKE IT AGAIN AND AGAIN. (white) then IS IT A MAGNET NOW? (sun yellow)
const TITLE = (k1, k2) => slamFit(400, "STROKE IT AGAIN AND AGAIN.", "#fff", k1) + slamFit(610, "IS IT A MAGNET NOW?", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 3 · today: the camera glides from Pip's nail to OUR FISHING GAME at its HOME (board: held about 2 s; rods: 3 rods · 1 magnet! glows as
   Momo says it), then on up to the angsana's trunk, where the game's push-in starts (one move). Momo big at the left talks, then points at
   3 rods · 1 magnet! after her line (showing it) */
const camBoard = camOn([1150, 600], 1.42, 1180, 470), camWin = camOn([WPAT.intro[0] - 10, WPAT.intro[1] - 30], 1.8, 700, 440);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.4), b = eio((t - (s.t1 - 1.6)) / 1.6); return b > 0 ? camMix(camBoard, camWin, b) : camMix(camBack(SCN.title.t1), camBoard, a); };
SC.today = (t, s) => { const out = s.t1 - 1.5, tR = MK("rods"), bp = camPt(camToday(t), [1150 + 70 * .8, 856 - 436 * .8]);
  return shop(t, camToday(t), { tp: { lid: 1 } }) + (t >= MK("board") ? OP(pulse(t, MK("board"), .05, .8), `<rect width="1920" height="1080" fill="#fff" opacity=".12"/>`) : "")
    + (t >= tR && t < out ? TF(bp[0], bp[1], 1, `<rect x="-120" y="-24" width="240" height="44" rx="22" fill="none" stroke="${P.sun}" stroke-width="7" opacity="${n2(.5 + .5 * Math.sin(t * 6))}"/>`) + linkChip(t, tR + .1, bp[0] - 60, 130, bp[0] - 40, bp[1] - 22, "#D84A3A", "3 rods · 1 magnet!", 40, out - .2) : "")
    + bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .1, out, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + bd("pip", 700, 1010, 370, t, { in: s.t0 + .15, out: out + .1, poses: [[s.t0, "sit"]] })
    + bd("momo", BX.l - 20, 1076, 500, t, { in: s.t0 + .2, out: out + .2, poses: [[s.t0, "sit"], [LE("m302m") + .1, "pointing"], [out - .1, "sit"]], look: 3 }) + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = WPAT.intro;
  return gameScene(t, s, ["m303", "m304b", "m305"], false, { world: (tt) => shop(tt, cE, { tp: { lid: 1 } }), A: camPt(cE, [p[0] - 10, p[1] - 30]), T: [680, 440], Z: 2.3, dim0: 0 }) + smallPrint(t, LT("m305"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["What magnetised means", ""], ["How to test the nail", ""], ["What can be magnetised", ""]], ["m401", "m402", "m403", "m404"], "pip");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 5 · Round 1: EP21's dare (a short 3 s ring). EP21's two cards as the ONE set of numbered picture cards; the clue labels an iron nail ·
   stroked again and again · the same way ON TOP of the ring; the ring's picture: the nail held by its head over the tray, the strokes shown.
   Basil leads (thinking after the question, worried through the countdown: lockN). Momo's pick: a small magnet slides away from a nail
   (away); Basil's pick: the uncle's screwdriver with a tiny screw on its tip (uncle); Basil points through the shop door after his line */
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .15 * i]), lead: "basil", csize: 32, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "what"), W(L1, "show")], ring0: MK("ring0_r1"), dur: 3, lock: "m502",
  pics: [0, 1].map((i) => darePic(i, t)), obj: ringP1_22, react: [[LE("m505b") + .1, "basil", "pointing"]],
  picks: [{ who: "momo", id: "m503m", word: "1" }, { who: "pip", id: "m504p", word: "2" }, { who: "basil", id: "m505b", word: "2" }] })
  + (t >= MKS("away") - .2 && t < LE("m503m") + .4 ? TF(1560, 320, spring(t, MKS("away") - .2, .4), awayPic(t, MKS("away"))) : "")
  + (t >= MKS("uncle") && t < s.t1 ? TF(1560, 320, spring(t, MKS("uncle"), .4), unclePic(t)) : "");

/* 6 · Be the iron nail! One glide down to a fresh nail lying on the table (no cut); the buddies wave the viewer off (goodbye), then each
   shrinks with a pop. The woodpecker on a branch of the frangipani by the shop, as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([1000, 720], 1.15, 960, 560), camOn([1056, 868], 5.2, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "m601", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["pip", "momo", "basil"].map((w, i) => { const x = [BX.l, BX.m, BX.r][i]; return bd(w, x, [1076, 1010, 1076][i], [490, 390, 470][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return shop(t, camWait(t), { tp: { lid: 1 } }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the iron nail!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#C99158", 960, 600); };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jclips") + .15, "surprised"], [m("jclips") + 2.3, "sit"]] }, nS = t < m("jagain") ? 1 : Math.min(4, 2 + Math.floor((t - m("jagain")) / 1.2));
  return nailJourney(t, s) + riders(t, s, { tin: m("jlie") + .6, h: 200, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: rp, jolts: [m("jhead") + .02, m("jback") + .02] })
    + youTag(t, MK("jlie"), "You: an iron nail") + feelTag(t, MK("jlie") + .8, MK("jstroke") - .2, "to scale: an iron nail", 160) + feelTag(t, MK("jslide"), MK("jlift") - .2, "one way", 160)
    + feelTag(t, MK("jlift"), MK("jagain") - .2, "lift up and away", 160) + feelTag(t, MK("jclips"), s.t1, "clips jump up!", 160)
    + (t >= m("jslide") && t < m("jcarry") ? TF(1560, 300, spring(t, m("jslide"), .45) * (1 + .06 * pulse(t, m("jagain") + (nS - 2) * 1.2, .03, .3)), tpill(0, 0, "stroke " + [1, 2, 3, 4].slice(0, nS).join(" · "), 34, "#fff", P.ink, { w: 700 })) : ""); };
// the pull back out: the table at normal size; Pip holds his nail by its head, a little bunch of clips hanging from its tip; the magnet in
// its box, the lid shut
const pipNail = (t, x, y, h, flip, n = 4, o = {}) => held("pip", x, y, h, flip, nailH()) + (() => { const [tx, ty] = tipOf("pip", x, y, h, flip); return clipBunch(t, tx, ty, n, { k: .62, ...o }); })();
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return shop(t, camMix(camOn([960, 640], 1.06, 960, 600), camOn([1056, 868], 5, 960, 560), u), { tp: { lid: 1 } })
    + bd("basil", BX.l - 20, 1076, 480, t, { in: s.t0 + .2 }) + bd("momo", BX.m, 1010, 380, t, { in: s.t0 + .25, flip: true }) + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .3, flip: true }) + (t > s.t0 + .35 ? pipNail(t, BX.r, 1076, 500, true) : "") + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 7 · the answer is two: the nail attracts the clips. EP21's two cards small at the top left (card 2 lit at ansglow; "not this one" on card 1);
   the coin YOU +1; by the BUDDIES pill a small grey ? (Pip's reason is tested next). The camera pushes to OUR FISHING GAME's Rod 1 box
   (rod1: Pip's nail drawn in it). Basil (right, for the right reason) confident, Momo (wrong) shy (OUTCOMES); Pip a pleased smile. Basil
   explains: STROKE METHOD; his cheer after his line (a key word learnt: achieved). The woodpecker on top of the notice board */
const camAns = (t) => { const r = MK("rod1"), a = eio((t - r + .4) / 1.1) * (1 - eio((t - r - 3.2) / 1.2)); return camMix(camOn([960, 640], 1.06, 960, 600), camOn([1051, 590], 1.7, 1150, 520), a); };
SC.answer = (t, s) => { window._BUBAT = { basil: [520, 330] }; const tA = MK("ansglow"), tK = MK("kw_stroke_method"), [ptx, pty] = tipOf("pip", BX.r, 1076, 500, true);
  return shop(t, camAns(t), { tp: { lid: 1 } })
    + `<g filter="url(#drop)"><rect x="30" y="40" width="470" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 230, 135, .42, dareCard2(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }, t))).join("")
    + tagAt(t, tA + .3, 150, 222, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 960, 330, "+1", "if you showed two fingers") + chipAt(t, MK("coin1") + .3, 1720, 150, NOPTC, "?", 30)
    + bd("basil", BX.l, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("basil", 470, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 530, 585, .7)
    + bd("momo", 800, 1010, 370, t, { in: s.t0 + .15, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .35 ? pickNum("momo", 960, 720, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1010, 665, .7)
    + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], noreact: true }) + pipNail(t, BX.r, 1076, 500, true) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "2") : "")
    + (t >= tK + .2 && t < tK + 2.4 ? pline(1300, 360, ptx + 40, pty - 20, ramp(t, tK + .2, .3), P.sun) : "")
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 8 · Pip at the table: "See? Iron nails always attract steel clips!" He holds up his nail with its clips; thinking after his line (Heart is
   about to test it). Momo still shy. The woodpecker on a post of the pergola. A push in towards the tray (straight into the look-closer) */
const camClaim = (t) => { const s = SCN.pipclaim, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 640], 1.06, 960, 600), camOn([890, 830], 1.5, 960, 640), u); };
SC.pipclaim = (t, s) => shop(t, camClaim(t), { tp: { lid: 1 } })
  + bd("basil", BX.r, 1076, 480, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1080, 1010, 360, t, { in: s.t0 + .1, flip: true })
  + bd("pip", BX.l, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("m801p") + .1, "thinking"]], look: 3 }) + pipNail(t, BX.l, 1076, 500, false, 4, {}) + HUD(t);
/* [LOOK CLOSER] was it a magnet already? (lc22.js lcNailArt). Faces: Pip at the left (his idea is tested: thinking; OOPS from `still` and
   shy to the end of Mark Sentence 1: OUTCOMES); Basil at the right (a nod, eyes wide at the click; teaching MAGNETISED; pointing at Pip's
   nail after his line). The grey no-point pill by the BUDDIES score (nopoint) */
const peekFace = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved }); };
SC.lcnail = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camClaim(SCN.pipclaim.t1), p = camPt(cE, [890, 830]), tm = s.t0 + 1.2, tb = LT("m804") - .4, tNp = MK("nopoint");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcNailArt, bgc: "#FFF8EA", set: (tt) => shop(tt, cE, { tp: { lid: 1 } }), verdict: [`STROKED: NOW IT IS A MAGNET`, GOODC], tv: MK("v_magnetised"), peek: false,
    over: (tt) => peekFace("pip", "l", tt, tm, undefined, [[tm + .2, "thinking"]])
      + peekFace("basil", "r", tt, tb, undefined, [[LE("m806b") + .1, "pointing"], [LE("m806b") + 2.3, "sit"]])
      + (tt >= tNp - .6 ? OP(ramp(tt, tNp - .6, .3), scoreboard(tt)) + TF(1440, 180, spring(tt, tNp, .45), tpill(0, 0, "right card, wrong reason: no point", 38, NOPTC, "#fff", { w: 700 })) : "") }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m809", sayId: "m808", who: "basil", n: "1 of 2", text: TL.lines.m809.text, keys: ["magnetic", "object", "becomes", "magnet,", "magnetised."], size: 64, y: 250, footer: FOOT, achieved: true, poses: [[LE("m809") + .2, "cheer"], [LE("m809") + 2.0, "sit"]],
  under: markNails(t, 1250, 935, .74 * spring(t, s.t0 + .4, .5)) });

/* 9 · HOLD ON! Basil (big, by the tray) grabs a new nail, gives it ONE quick stroke with the red end (try) and, with the magnet STILL in his
   other paw, dips both towards the tray: the clips jump up and cling to the MAGNET's red end (jumpmag); his note card on Rod 2. The HOLD ON!
   stamp; the countdown takes the stage (the ring big and central with his nail and magnet, the clue labels one stroke · the magnet is still
   here · where are the clips? ON TOP of the ring; only Basil at the side, thinking: it is his own idea on trial). After the bell Basil stays
   shy through the WHOLE fix and the strip; Pip and Momo confident (OUTCOMES). Pip points at the clips on the magnet (before his line), the
   magenta chip (onmag); the magnet slides along the table into its box at the far end and the lid claps (boxit: a jolt, the clips fall off
   back into the tray; Momo's face close-up, a nod); the green chip (chipfar); the cream strip 7.2 step 4 (strip). The woodpecker on the
   pallets (not during the countdown) */
const BH = [330, 1076, 470], BOXH = [1185, 892], TRH = [640, 1010];   // TRH: the tray in front of Basil (screen)   // Basil by the tray; the magnet's box at the far (right) end of the table
const holdThings = (t) => { const tr = MK("try"), tj = MK("jumpmag"), tb = MK("boxit"), [px, py] = pawPt("basil", BH[0], BH[1], BH[2], false), up = t < tj ? 0 : eio(clamp((t - tj - .4) / .6)), dip = t >= tj - .6 && t < tj + .4 ? Math.sin(Math.PI * clamp((t - tj + .6))) * 30 : 0;
  const ny = py - 90 * up + dip, mxE = px + 340, my = py - 30 - 90 * up + dip, NKH = .9;   // the nail at his paw; the magnet held upright beside its tip, red end down
  let s = trayClips22(t, TRH[0], TRH[1], .95, { n: t >= tj ? 16 : 22 }) + (t >= tr - .6 ? TF(px, ny, 1, nailH(NKH)) : "");
  if (t >= tr - .6 && t < tr + .8) { const p = clamp((t - tr) / .8); if (t >= tr) { const st = strokeAt(p, px + 30, ny - 10, px + 240, ny - 10, 150, .55); s += magAt(t, st.x, st.y, .6, st.rot); } else s += magAt(t, px + 30, ny - 160, .6, -100); }
  else if (t >= tr + .8 && t < tb) s += magAt(t, mxE, my + 40, .6, -90);
  else if (t >= tb && t < tb + 1.0) { const u = eio((t - tb) / .8), bx = camPt(camHold(t), BOXH); s += OP(1 - clamp((t - tb - .7) / .3), magAt(t, lerp(mxE, bx[0] - 30, u), lerp(my + 40, bx[1] - 60, u) - 120 * Math.sin(Math.PI * u), .6 * lerp(1, .6, u), -90)); }
  // the clips on the magnet's red end (jump at jumpmag, fall back into the tray as the magnet is taken away at boxit)
  if (t >= tj - .1) s += clipBunch(t, mxE, my + 44, 7, { k: 1.0, t0: tj, from: [mxE, TRH[1] - 50], drop: tb + .05, to: [TRH[0] + 40, TRH[1] - 40] });
  if (t >= tr + .8 && t < SCN.holdon.t1) { const tx = px + 287 * NKH; s += t > tj + .8 && t < tb ? linkChip(t, tj + .9, tx - 120, ny - 150, tx, ny - 4, "#fff", "the nail's tip: no clips", 34, MK("ring0_hold") - 1.4, P.ink) : ""; }
  return s; };
const camHold = (t) => { const a = eio((t - MK("try") + .8) / 1.2) * (1 - eio((t - W("m902", "cross") + .6) / .8)), b = eio((t - MK("onmag") + 1.2) / 1.2) * (1 - eio((t - MK("strip") + .2) / 1)); return camMix(camMix(camOn([960, 640], 1.06, 960, 600), camOn([880, 820], 1.3, 900, 640), a), camOn([1000, 820], 1.22, 960, 640), b); };
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { basil: [1250, 260], momo: [1250, 260], pip: [1150, 300] }; const b = "m902", c = "m903", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, tB = MK("boxit"), cam = camHold(t);
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, lidK = t < tB + .55 ? 0 : eo(clamp((t - tB - .55) / .3));
  // 24 Nov (the EP20 HOLD ON! fix, applied here too): the picture is centred on the ring and clipped to its inner circle (its own cream disc
  // used to sit 40 px lower and spill over the track); smaller and re-centred so both hands (on the nail, on the magnet) stay inside the circle,
  // all of it above the number badge
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1] + 5}) scale(.7) translate(-395 -470)">${ringHold22(t)}</g></g>`;
  const labels = [["one stroke", 420, 250, -1], ["the magnet is still here", 1500, 250, 1], ["where are the clips?", 1500, 560, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  const world = JOLT(t, [tB + .6], HS22(t, { bird: t < r0 - 1 || t > bell + 1 ? WPAT.holdon : false, top: tableProps(t, { box: false, bag: false, tray: false }) + magBox22(t, BOXH[0], BOXH[1], .42, { lid: lidK, mag: t >= tB + .7 && lidK < .95 }) }, cam), 18);
  return world + `<rect width="1920" height="1080" fill="${P.night}" opacity=".04"/>`
    + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + (t >= MK("onmag") ? linkChip(t, MK("onmag") + .2, 760, 560, pawPt("basil", BH[0], BH[1], BH[2], false)[0] + 340, pawPt("basil", BH[0], BH[1], BH[2], false)[1] + 20, "#D9468F", "the clips are on the magnet!", 40, tB + .4) : "")
    + (t >= MK("chipfar") ? linkChip(t, MK("chipfar") + .2, 1150, 470, camPt(cam, [1150, 640])[0], camPt(cam, [1150, 640])[1], GOODC, "Test it with the magnet far away!", 42, MK("strip") + 1.2) : "")
    + bd("momo", 1490, 1010, 360, t, { in: LT(c) + .45, flip: true, poses: [[tB + .6, "arms_crossed"]], jump: [[tB + .65, 22]] })   /* teacher 24 Nov: no face close-up for a calm "told you so"; Momo nods in place */
    + bd("pip", 1770, 1076, 500, t, { in: LT(c) + .3, flip: true })
    + bd("basil", BH[0], 1076, BH[2], t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, look: inT ? 6 : 0, poses: [[s.t0, "sit"], [W(b, "something") + .9, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 30]], nohop: true }) + (ring ? "" : holdThings(t))
    + (t >= MK("strip") ? stripTwo(t) : "")
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + smallPrint(t, MK("try"), PHONE_RULE) + HUD(t); };
// the cream strip 7.2 step 4 (two sentences): two lines, the words appearing as Heart says them (bookCaption, off = the second sentence's first word)
const stripTwo = (t) => { const tx = TL.lines.m905s.text, a = tx.slice(0, tx.indexOf(". ") + 1), b = tx.slice(tx.indexOf(". ") + 2);
  return bookCaption(t, "m905s", a, 860, { size: 38, keys: ["test", "near", "steel", "clips."] }) + bookCaption(t, "m905s", b, 960, { size: 38, off: a.split(" ").length, keys: ["attracts", "steel", "clips."] }); };

/* 10 · Momo's idea: "If we stroke anything enough times, it will become a magnet. Even my wooden chopstick!" The four things in a row on the
   table, each with its name tag (copper wire, aluminium foil, wooden chopstick, a new steel screwdriver); chop: she holds up the chopstick.
   Thinking after her line (she is about to test it). A push along the row (straight into the look-closer). The woodpecker on the planter's edge */
const ROW = [[620, "copper wire", 0], [770, "aluminium foil", 1], [930, "wooden chopstick", 2], [1090, "steel screwdriver", 3]];
const rowTop = (t) => ROW.map(([x, w, j]) => (j === 2 && t >= MKS("chop") ? "" : thingArt(j, x, 866, .42).replace("rotate(90)", "rotate(4)")) + TF(x, 912, 1, tpill(0, 0, w, 18, "#fff", P.ink, { w: 700 }))).join("");
const camRow = (t) => { const s = SCN.lcq2, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([700, 820], 1.35, 760, 640), camOn([1000, 840], 1.55, 1000, 640), u); };
SC.lcq2 = (t, s) => shop(t, camRow(t), { tp: { tray: true, bag: false, nails: false, lid: 1 }, top: rowTop(t) })
  + bd("basil", 1420, 1010, 370, t, { in: s.t0 + .15, flip: true }) + bd("pip", BX.r, 1076, 500, t, { in: s.t0 + .2, flip: true })
  + bd("momo", BX.l, 1076, 500, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("m1001m") + .1, "thinking"]], look: 3 })
  + (t >= MKS("chop") ? held("momo", BX.l, 1076, 500, false, chopstick22(150 * .6, 0, .6, -30), -10 * spring(t, MKS("chop"), .4)) : "") + smallPrint(t, s.t0 + .3, NAIL_RULE) + HUD(t);
/* [LOOK CLOSER] what can be magnetised? (lc22.js lcThingsArt). Faces: Momo at the left (her idea is tested: thinking; OOPS from `test`, shy
   to the end of Mark Sentence 2: OUTCOMES); Basil at the right for a moment ON `test` (surprised: the uncle's trick with his own eyes); then
   Pip at the right (teaching MAGNETIC OBJECT; cheer after his line: a key word learnt, achieved) */
SC.lcthings = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camRow(SCN.lcq2.t1), p = camPt(cE, [860, 860]), tm = s.t0 + 1.2, tE = MK("test"), tp = LT("m1005p") - .5;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcThingsArt, bgc: "#FFF8EA", set: (tt) => shop(tt, cE, { tp: { bag: false, nails: false, lid: 1 }, top: rowTop(tt) }), verdict: [`ONLY MAGNETIC OBJECTS CAN BE MAGNETISED`, GOODC], tv: MK("v_only"), peek: false,
    over: (tt) => peekFace("momo", "l", tt, tm, undefined, [[tm + .2, "thinking"]])
      + faceCam("basil", tt, tE + .1, tE + 2.4, 1650, 330, 140, [[tE + .15, "surprised"]], { noreact: true })
      + peekFace("pip", "r", tt, tp, undefined, [[LE("m1005p") + .1, "cheer"], [LE("m1005p") + 2.2, "sit"]], { achieved: true }) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m1007", sayId: "m1006", who: "pip", n: "2 of 2", text: TL.lines.m1007.text, keys: ["magnetic", "object", "magnet", "stroking", "strong", "magnet."], size: 64, y: 250, footer: FOOT, achieved: true, poses: [[LE("m1007") + .2, "sit"]],
  under: markThings(t, 1250, 935, .74 * spring(t, s.t0 + .4, .5)) });

/* 11 · score hand, the woodpecker (lizReveal: the score hand melts into the shop front, ONE push-in onto the woodpecker clinging to the
   wooden handle of a broom in the shop's rack: the REVEAL spot, never the intro angsana trunk); Momo's fun fact: a woodpecker pecking a trunk
   (ff_peck), Pip's strokes, again and again (ff_nail), its long tongue wraps round the back of its head (ff_tongue). Basil points at the
   woodpecker once it is ringed; Pip waves goodbye on "Tell someone at home!" */
SC.final = (t, s) => { const L = "m1101"; return finalScene(t, s, L, 0, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1102", tq = W(L, "it") - .1, c = WPAT.liz, tc = W(L, "woodpecker");
  return lizReveal(t, s, L, shop(t, W0, { bird: c, tp: { lid: 1 } }), c[0] - 8, c[1] - 26, tq, "It was on a broom handle!", -120, 160, 80, 2.6, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1104",
    fact: { id: "m1103m", at: [1250, 400], w: 1000, h: 440, items: [["ff_peck", "very fast taps", ffPeck22], ["ff_nail", "like our strokes", ffNail22], ["ff_tongue", "tongue wraps round", ffTongue22]], cols: ["#8A5A36", "#2FA35A", "#C2577A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("m1103m") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [LT("m1104") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the cliffhanger: Basil takes a new nail and rubs the magnet's red end quickly BACK AND FORTH along it (rub: never lifting), then
   flips the magnet and rubs with the BLUE end (flip); back and forth · both ends; a big ? by his nail (qnail). PART 2. Basil big at the left
   (talks: a bold grin); Pip and Momo at the right, turned in to watch (Pip thinking after Basil's line: will it work?) */
const camCliff = (t) => { const s = SCN.cliff, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([960, 640], 1.08, 960, 600), camOn([860, 800], 1.3, 900, 640), u); };
SC.cliff = (t, s) => { const tP = W("m1202", "part") - .1, tr = MK("rub"), tf = MK("flip"), X = BH, [px, py] = pawPt("basil", X[0], X[1], X[2], false);
  let mag = ""; if (t >= tr - .3) { const sw = t >= tf && t < tf + .5 ? (t - tf) / .5 : 0, fl = t >= tf + .25, r = rubAt(t, px + 30, py - 10, px + 240, py - 10, 11);
    mag = OP(sw > 0 ? Math.abs(Math.cos(Math.PI * sw)) : 1, magAt(t, r.x, r.y - 70 * Math.sin(Math.PI * sw), .6, r.rot, { flip: fl })) + (sw > 0 ? "" : motion22(r.x, r.y - 30, 0, .6, "#fff") + motion22(r.x, r.y - 30, 180, .6, "#fff")); }
  return shop(t, camCliff(t), { tp: { lid: 0 } })
    + bd("momo", 1430, 1010, 380, t, { in: s.t0 + .15, flip: true, look: -6, jump: [[LT("m1202") + .2, 20]] })
    + bd("pip", BX.r + 20, 1076, 480, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [LE("m1201b") + .1, "thinking"]], look: -6, jump: [[LT("m1202") + .35, 20]] })
    + bd("basil", X[0], X[1], X[2], t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], look: 3 }) + TF(px, py, 1, nailH(.9)) + mag
    + (t >= tr ? backForth(t, tr + .1, px + 135, py + 50, 260) + TF(px + 95, py - 150, spring(t, tr + .2, .4), tpill(0, 0, "back and forth · both ends", 32, "#fff", P.ink, { w: 700 })) : "")
    + qMark20(t, MK("qnail") + .2, px + 330, py - 60, 56) + smallPrint(t, s.t0 + .3, NAIL_RULE)
    + (t >= tP ? slamFit(330, "PART 2", P.sun, slamK(t - tP, 0)) : "") + melt(t, s, "kwrecap", .4) + HUD(t); };
/* 13 · "Now you know!": OUR FISHING GAME (Rod 1 filled, the list ticked) and Pip's nail with its clips between the buddies */
SC.nyk = (t, s) => nykScene(t, s, fishBoard22(t, 960, 1080, 1.12), { bx: [230, 1730, 1500], hx: 470 });
})(); }
