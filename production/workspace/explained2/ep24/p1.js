// p1.js: PART 1, "Is Basil's Test FAIR? Change Only ONE Thing": EP23's dare answered (two, not fair), be a steel paper clip, the answer and
// VARIABLE (Pip), two things changed (look closer; 7.10; FAIR TEST, Momo; Mark Sentence 7.9, Momo), HOLD ON! (Momo's magnet race: the distance
// changed too; Basil's fix), make it fair (look closer: twenty turns each, only the nail changed; EXPERIMENT, Basil; Mark Sentence 7.8a,
// Basil), the woodlouse, the cliffhanger (Momo's plan). Segments 1-12 of ../p3_ep24_script.md section 4.
// One real place, the SCHOOL SCIENCE ROOM on Tuesday after school (sets23.js SR23 through art24.js SR24: its board IRON OR STEEL? at the
// home of EP23's HOW STRONG?). Basil's two set-ups hang from a small wooden rack over two trays of steel clips; the camera never cuts inside
// the place. Every pose has its reason; the buddy who got it wrong stays shy and the right ones confident through the whole fix (lib.js
// OUTCOMES `to`). In every close-up demonstration the buddies WATCH the object (watchO), and at most one buddy a scene glances with a wave.
if (PART === 1) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m803", "one") - .1, 2, 1]);
const FOOT = "P3 · Making and Using Magnets · A fair test";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { const a = W("m802", "cross") - .3, b = LE("m803") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
// the board's fills (they stay filled once made): in look-closer 2, the change (onlynail), the four "the same" ticks, "Now it's fair"
const BOARD = () => ({ change: MK("onlynail"), same: [MK("twenty") + 2.2, MK("samebat"), MK("samewire"), MK("sameclips")], fair: MK("boardfill") });
const sr = (t, cam, o = {}) => SR24(t, { boardO: BOARD(), ...o }, cam);
// Basil's rack: two set-ups hanging tip down over two trays (iron, 25 turns · steel, 8 turns), their holders on the bench
const TRX = [600, 840], TRY = 902, BENCHY = 872, NK = .5;
const rack = (t, o = {}) => { const lift = o.lift || 0, tipY = 858 - lift, ns = o.ns || [25, 8], cl = o.clips || [0, 0];
  let s = `<path d="M${TRX[0] - 90} ${BENCHY} V${tipY - 168} M${TRX[1] + 90} ${BENCHY} V${tipY - 168}" stroke="#8A6438" stroke-width="12" stroke-linecap="round"/><path d="M${TRX[0] - 110} ${tipY - 166} H${TRX[1] + 110}" stroke="#A87C4A" stroke-width="14" stroke-linecap="round"/>`;
  s += TRX.map((x) => trayClips22(t, x, TRY, .4, { n: 18 })).join("");
  [["iron", ns[0], cl[0], "iron · 25"], ["steel", ns[1], cl[1], "steel · 8"]].forEach(([kind, n, c, lab], i) => { const x = TRX[i];
    s += `<path d="M${x} ${tipY - 166} V${tipY - 143}" stroke="#5A4A3A" stroke-width="4"/>` + setup24(t, { x, y: tipY, k: NK, kind, n, batt: 1, clips: c, ct0: o.ct0, hx: i ? 250 : -250, hy: (BENCHY + 6 - tipY) / NK, hk: .6 })
      + (o.tags !== false ? TF(x + (i ? 70 : -70), tipY - 196, .62, tpill(0, 0, o.tagT ? o.tagT[i] : lab + " turns", 34, "#fff", P.ink, { w: 700 })) : ""); });
  return s; };
const CR = [1430, 852, .45];   // EP23's mini crane, at the bench's right end (its hook waits for the best nail)
const benchTop = (t, o = {}) => (o.crane === false ? "" : miniCrane23(t, CR[0], CR[1], CR[2], {})) + (o.rack === false ? "" : rack(t, o.rack || {}));
const BL = [330, 1076, 480], MR = [1760, 1076, 480], PM = [1530, 1010, 400];
const camRoom = camOn([960, 620], 1.06, 960, 600), camTips = camOn([720, 800], 1.55, 860, 560);
const pill1 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "A school science room, Singapore ·", "Tuesday after school"));

/* 1 · the cold open, SPEAKING from 0.8 s: the science room on Tuesday after school; Basil's two set-ups over their trays; on "only" (dip0)
   the rack lowers a little and the clips jump: a big bunch on the iron nail, a small one on the steel nail. Pip turns to the viewer with a
   wave on Heart's first words (hello), then watches; Momo watches the tips. One slow push towards the tips */
const camCold = (t) => camMix(camRoom, camTips, eio(clamp(t / (SCN.cold.t1 + 3))));
const dipL = (t) => { const d = MK("dip0"); return t < d - .2 ? 0 : 26 * eio(clamp((t - d + .2) / .6)); };
SC.cold = (t, s) => { const d = MK("dip0"), cam = camCold(t);
  return sr(t, cam, { bench: benchTop(t, { rack: { lift: -dipL(t), clips: t >= d + .2 ? [8, 2] : [0, 0], ct0: d + .2 } }) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: -1, ...watchO(BL[0], 720) })
    + bd("pip", PM[0], PM[1], PM[2], t, { in: -1, ...watchO(PM[0], 720), poses: [[0, "sit"], ...glanceWave(.9)] })
    + bd("momo", MR[0], MR[1], MR[2], t, { in: -1, ...watchO(MR[0], 720) })
    + pill1(t, .2, 7.2) + smallPrint(t, s.t0 + 2.4, ADULT_RULE) + HUD(t); };
/* "Last time...": EP23's own two cards (ep23dare.js, unchanged) over the room softly blurred; each steps forward as Heart says it */
const dareCard24 = (i, o = {}, t = 0) => choiceCard3(i + 1, DARE_CARDS[i], darePic23(i, t), { w: 420, h: 330, size: 40, ...o });
SC.lasttime = (t, s) => { const L = "m103", tc = [W(L, "one"), W(L, "two")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : (cur > i && i < 1 ? 1 - ss(tc[i + 1] - .15, tc[i + 1] + .25, t) : 0);
    cards += TF(740 + i * 440, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard24(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i }, t)); });
  return `<g filter="url(#b10)">${sr(t, camCold(SCN.cold.t1), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }), bug: false })}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>`
    + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>` + TF(960, 1000, spring(t, s.t0 + .2, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back at the bench: Basil holds up a paw by his two nails, proud (a hop); Momo watches the nails; Pip covers his eyes for a second (a small
   hop: fun suspense). A slow drift that carries on under the title */
const camBack = (t) => { const u = clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0)); return camMix(camTips, camOn([720, 800], 1.62, 860, 560), eio(u)); };
SC.back = (t, s) => sr(t, camBack(t), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], 720), jump: [[LT("m104") + .4, 22]] }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .1, ...watchO(PM[0], 720), jump: [[LT("m104") + .2, 16]] })
  + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0, ...watchO(MR[0], 720) })
  + (t >= LT("m104") - .1 ? TF(960, 330, spring(t, LT("m104") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t);
const TITLE = (k1, k2) => slamFit(400, "IS IT FAIR?", "#fff", k1) + slamFit(610, "CHANGE ONE THING!", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 2 · today: the camera glides from the tips to the mini crane's hook (on "hook"), then to the board IRON OR STEEL? at its home, then on
   to the sink, where the game's push-in starts (one move). Basil (big at the left) points at the hook, then at his rack */
const camHook = camOn([1180, 700], 1.22, 1060, 600), camSink = camOn([WLAT.intro[0], WLAT.intro[1] - 20], 1.6, 760, 480);
// one calm move from the tips to a view of the crane and the board together (held), then on to the sink as the game begins
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.8), c = eio((t - (s.t1 - 1.5)) / 1.5);
  return c > 0 ? camMix(camHook, camSink, c) : camMix(camBack(SCN.title.t1), camHook, a); };
SC.today = (t, s) => { const out = s.t1 - 1.4;
  return sr(t, camToday(t), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, out, poses: [[s.t0, "sit"], [MK("hook") + .1, "pointing"], [MK("hook") + 1.6, "sit"]] })
    + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, out: out + .1, flip: true, ...watchO(PM[0], 900) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .05, out: out + .2, flip: true, ...watchO(MR[0], 900) }) + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = WLAT.intro;
  return gameScene(t, s, ["m204", "m205p", "m206"], false, { world: (tt) => sr(tt, cE, { bench: benchTop(tt, { rack: { lift: -26, clips: [8, 2] } }) }), A: camPt(cE, [p[0], p[1] - 8]), T: [680, 440], Z: 2.8, dim0: 0, finder: "pip",
    poses: { pip: [[W("m204", "woodlouse") + .1, "surprised"], [W("m204", "woodlouse") + 1.8, "sit"]], basil: [[W("m206", "buddies") - .1, "waving"], [W("m206", "buddies") + 1.0, "sit"]] } }) + smallPrint(t, LT("m206"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["What an experiment does", ""], ["What a fair test is", ""], ["Spot an unfair test", ""]], ["m301m", "m302m", "m303m", "m304m"], "momo");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 4 · Round 1: EP23's dare (a 5 s ring, as EP1-10). EP23's two cards as the ONE set of numbered picture cards; the clue labels ON TOP of the
   ring; the ring's picture: Basil's two set-ups over their trays (no clips: no answer). Basil leads (worried through the countdown). Picks
   Basil 1, Pip 2, Momo 2; Pip points at the long coil after his line, Momo at each nail */
SC.r1 = (t, s) => { const L1 = "m401"; return lockN(t, { t0: LT(L1) - .1, cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "is") + .2 * i]), lead: "basil", csize: 40, q: DARE_LABEL, tq: W(L1, "is") - .1,
  tc: [W(L1, "one"), W(L1, "two")], ring0: MK("ring0_r1"), dur: 5, lock: "m402", pics: [0, 1].map((i) => darePic23(i, t)), obj: ringP1_24,
  react: [[LE("m404p") + .1, "pip", "pointing"], [LE("m405m") + .1, "momo", "pointing"]],
  picks: [{ who: "basil", id: "m403b", word: "1" }, { who: "pip", id: "m404p", word: "2" }, { who: "momo", id: "m405m", word: "2" }] }); };

/* 5 · Be a steel paper clip! One glide down into the iron nail's tray (no cut); the buddies wave the viewer off, then shrink with a pop */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([TRX[0], TRY - 30], 5.4, 960, 600), u * u); };
SC.waitw = (t, s) => { const L = "m501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "pip", "momo"].map((w, i) => { const X = [BL, PM, MR][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return sr(t, camWait(t), { bench: benchTop(t, { rack: { lift: 60 } }) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a steel paper clip!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#F4EFE6", 960, 600); };
// the riders: the three buddies, shrunk, on the tray's rim, WATCHING the nails above
const riders24 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { basil: [[m("jweak") + .3, "surprised"], [m("jweak") + 2.0, "sit"]], pip: glanceWave(m("jlie") + 2.2) };
  return clipJourney1(t, s) + riders24(t, s, { tin: m("jlie") + .6, h: 200, at: { pip: [210, 1044], basil: [1720, 1050], momo: [420, 1040] }, poses: rp, look: 700, jolts: [m("jpull") + .4] })
    + youTag(t, MK("jlie"), "You: a steel paper clip") + feelTag(t, MK("jlie") + .8, MK("jmany") - .2, "to scale: a paper clip", 160)
    + feelTag(t, MK("jpull"), MK("jweak") - .2, "a strong pull!", 160) + feelTag(t, MK("jweak") + .3, MK("jwonder") - .2, "a weak pull", 160); };
// the pull back out: the bench at normal size, the buddies already where `answer` has them
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return sr(t, camMix(camRoom, camOn([TRX[0], TRY - 30], 5, 960, 600), u), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .25, flip: true }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .3, flip: true }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: not fair. EP23's two cards small at the top left (card 2 lit; "not this one" on card 1); the coins YOU +1 and
   BUDDIES +1 (two of three were right). Pip and Momo confident, Basil shy (OUTCOMES). Pip teaches VARIABLE: lines to the two tags (the kind
   of nail) and the two coils (the number of turns); he cheers after his line (a key word learnt) */
const camAns = (t) => { const a = eio((t - MK("kw_variable") + .4) / 1.0) * (1 - eio((t - LE("m602p") - .6) / 1.2)); return camMix(camRoom, camOn([720, 760], 1.3, 820, 580), a); };
SC.answer = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_variable"), cam = camAns(t), tg = [camPt(cam, [TRX[0] - 70, 832 - 196]), camPt(cam, [TRX[1] + 70, 832 - 196])], co = [camPt(cam, [TRX[0], 760]), camPt(cam, [TRX[1], 800])];
  return sr(t, cam, { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
    + `<g filter="url(#drop)"><rect x="30" y="110" width="470" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1].map((i) => TF(150 + i * 230, 205, .42, dareCard24(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }, t))).join("")
    + tagAt(t, tA + .3, 150, 292, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1 }) + (t > s.t0 + .3 ? pickNum("basil", 520, 640, t, s.t0 + .3, "1") : "") + xChip16(t, tA + .25, 575, 585, .7)
    + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true, poses: [[s.t0, "sit"], [LE("m602p") + .05, "cheer"]], achieved: true }) + (t > s.t0 + .35 ? pickNum("pip", 1600, 700, t, s.t0 + .35, "2") : "") + tickChip16(t, tA + .2, 1650, 650, .7)
    + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .2, flip: true }) + (t > s.t0 + .4 ? pickNum("momo", 1880, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1840, 585, .7)
    + (t >= MK("vnail") - .1 && t < LE("m602p") + 1.6 ? pline(1000, 420, tg[0][0], tg[0][1], ramp(t, MK("vnail") - .1, .3), P.sun) + pline(1000, 420, tg[1][0], tg[1][1], ramp(t, MK("vnail"), .3), P.sun) : "")
    + (t >= MK("vturns") - .1 && t < LE("m602p") + 1.6 ? pline(1000, 420, co[0][0], co[0][1], ramp(t, MK("vturns") - .1, .3), CHANGEDC) + pline(1000, 420, co[1][0], co[1][1], ramp(t, MK("vturns"), .3), CHANGEDC) : "")
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Basil (big at the left, still shy): "But my iron nail picked up the most clips. Why is that not fair?" A push in on the two tips */
const camQ1 = (t) => { const s = SCN.lc1q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([720, 790], 1.5, 860, 600), u); };
SC.lc1q = (t, s) => sr(t, camQ1(t), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
  + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true, ...watchO(PM[0], 720) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 720) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], 720) }) + smallPrint(t, s.t0 + .3, MOMENT_RULE) + HUD(t);
const peek24 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
/* [LOOK CLOSER] two things changed (lc24.js lcUnfairArt), then the cream strip 7.10. Faces: Basil at the lower left (shy: his own test is
   tested; OUTCOMES), Momo at the lower right (teaching FAIR TEST; cheer after her line). Both WATCH the panel */
SC.lcunfair = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), p = camPt(cE, [720, 790]), tm = s.t0 + 1.2, tM = LT("m705m") - .5, tS = MK("strip");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcUnfairArt, bgc: "#FFF6E6", set: (tt) => sr(tt, cE, { bench: benchTop(tt, { rack: { lift: -26, clips: [8, 2] } }) }), verdict: ["TWO THINGS CHANGED: NOT FAIR", "#D84A3A"], tv: MK("v_two"), peek: false,
    over: (tt) => peek24("basil", "l", tt, tm, undefined, []) + peek24("momo", "r", tt, tM, undefined, [[LE("m705m") + .1, "cheer"], [LE("m705m") + 2.2, "sit"]], { achieved: true })
      + (tt >= tS - .1 && tt < LE("m704s") + 1.6 ? OP(1 - ramp(tt, LE("m704s") + 1.2, .3), bookCaption(tt, "m704s", TL.lines.m704s.text, 236, { size: 34, keys: ["not", "fair,", "not", "sure", "variable"] })) : "") }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m707", sayId: "m706", who: "momo", n: "1 of 2", tab: "A fair test", text: TL.lines.m707.text, keys: ["only", "one", "thing,", "variable,", "kept", "same."], size: 52, y: 230, footer: FOOT, poses: [[LE("m707") + .2, "sit"]],
  under: markFair24(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 8 · HOLD ON! Momo's magnet race (Let's Apply Q1): Momo (big at the left) holds her bar magnet just above her tray of steel pins (a big
   bunch), Pip (mid, by the board) holds his high above his tray (a few pins). The ring with the two magnets at two heights takes the stage
   (5 s; the clue labels ON TOP; only Momo at the side). After the bell: Momo shy through the WHOLE fix; Basil and Pip confident. The fix: a
   ruler stands up between the trays and both magnets glide to the same height (level) */
const MH = [330, 1060, 480], PH = [1660, 1010, 420];
// each bar magnet hangs on a short thread from its owner's paw (nothing floats); the trays sit on the bench under the paws
const camInv = (c, s) => [(s[0] + (c[0] - 1) * c[1]) / c[0], (s[1] + (c[0] - 1) * c[2]) / c[0]];   // screen point -> world point under camera c
const pawM = () => camInv(camRoom, pawPt("momo", MH[0], MH[1], MH[2], false)), pawP = () => camInv(camRoom, pawPt("pip", PH[0], PH[1], PH[2], true));
const camHold = (t) => camRoom;   // still (the race hangs from the buddies' paws, which the camera does not move)
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { momo: [760, 230], basil: [960, 230], pip: [1250, 260] }; const b = "m802", c = "m803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, cam = camHold(t);
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, lv = eio(clamp((t - MK("level")) / 1.0));
  const [mx, my] = pawM(), [qx, qy] = pawP(), TPX = [mx + 190, qx - 210], yM = lerp(838, 790, lv), yP = lerp(690, 790, lv), nM = Math.round(lerp(8, 5, lv)), nP = Math.round(lerp(2, 5, lv));
  const hang = (x0, y0, x, y) => `<path d="M${n2(x0)} ${n2(y0)} L${n2(x)} ${n2(y - 18)}" stroke="#5A4A3A" stroke-width="3"/>`;
  const trays = pinTray24(t, TPX[0], 902, .5, { n: 16 }) + pinTray24(t, TPX[1], 902, .5, { n: 18 });
  const race = `<path d="M${n2(mx + 30)} ${n2(my - 10)} Q${n2(TPX[0])} ${n2(my - 120)} ${n2(TPX[0])} ${n2(yM - 18)}" stroke="#5A4A3A" stroke-width="3" fill="none"/><path d="M${n2(qx - 30)} ${n2(qy - 10)} Q${n2(TPX[1])} ${n2(qy - 120)} ${n2(TPX[1])} ${n2(yP - 18)}" stroke="#5A4A3A" stroke-width="3" fill="none"/>` + heldBar24(t, TPX[0], yM, .45, nM) + heldBar24(t, TPX[1], yP, .45, nP, { flip: true })
    + (lv > .02 ? OP(lv, ruler24((TPX[0] + TPX[1]) / 2, 902, 200, 1) + `<path d="M${TPX[0] - 80} ${n2(yM)} H${TPX[1] + 80}" stroke="${SAMEC}" stroke-width="5" stroke-dasharray="16 10"/>`) : "");
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1] + 5}) scale(.75) translate(-430 -540)">${ringHold24(t)}</g></g>`;
  const labels = [["the same magnets", 420, 250, -1], ["the same pins", 1500, 250, 1], ["Momo's is closer", 1500, 560, 1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3);
  const world = sr(t, cam, { bench: benchTop(t, { rack: false, crane: false }) + trays, bug: t < r0 - 1 || t > bell + 1 ? WLAT.holdon : false });
  return world
    + (t >= MK("close") && t < LE("m804b") + 1 ? linkChip(t, MK("close"), 300, 560, ...camPt(cam, [TPX[0] - 60, yM + 10]), "#fff", "close", 36, undefined, P.ink) : "")
    + (t >= MK("far") && t < LE("m804b") + 1 ? linkChip(t, MK("far"), 1300, 420, ...camPt(cam, [TPX[1] - 60, yP]), "#fff", "far", 36, undefined, P.ink) : "")
    + (t >= MK("level") + .6 ? linkChip(t, MK("level") + .6, 960, 600, ...camPt(cam, [(TPX[0] + TPX[1]) / 2, yM]), SAMEC, "the same height", 38) : "")
    + (t >= MK("onlymag") ? TF(760, 380, spring(t, MK("onlymag"), .4), tpill(0, 0, "Only the magnet is different", 46, SAMEC, "#fff", { w: 700 })) : "")
    + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("basil", 900, 1076, 420, t, { in: LT(c) + .3, ...watchO(900, 700) })
    + bd("pip", PH[0], PH[1], PH[2], t, { in: s.t0 + .15, flip: true, watch: 0, look: -5 })
    + bd("momo", MH[0], MH[1], MH[2], t, { in: s.t0 + .1, rock: inT ? 2.2 : 0, poses: [[s.t0, "sit"], [W(b, "something") + .2, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 30]], nohop: true })
    + (ring && st > .99 ? "" : OP(ring ? 1 - st : 1, CAM(race, ...cam))) + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + HUD(t); };

/* 9 · Basil (big at the left, keen): "Okay! How do I make my iron and steel test fair?" A push in on the rack */
const camQ2 = (t) => { const s = SCN.lc2q, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([720, 790], 1.5, 860, 600), u); };
SC.lc2q = (t, s) => sr(t, camQ2(t), { bench: benchTop(t, { rack: { lift: -26, clips: [8, 2] } }) })
  + bd("pip", PM[0], PM[1], PM[2], t, { in: s.t0 + .15, flip: true, ...watchO(PM[0], 720) }) + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0 + .1, flip: true, ...watchO(MR[0], 720) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("m901b") + .05, "thinking"]] }) + HUD(t);
/* [LOOK CLOSER] make it fair (lc24.js lcFairArt). Faces: Basil at the lower left (keen; teaching EXPERIMENT, cheer after his line), Pip at
   the lower right (listening). As the panel eases back the board shows the plan filled (BOARD) */
SC.lcfair = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ2(SCN.lc2q.t1), p = camPt(cE, [720, 790]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcFairArt, bgc: "#FFF6E6", set: (tt) => sr(tt, cE, { bench: benchTop(tt, { rack: { ns: [20, 20], tagT: ["iron nail", "steel nail"] } }) }), verdict: ["ONLY ONE THING CHANGED: FAIR", GOODC], tv: MK("v_fair"), peek: false,
    over: (tt) => peek24("pip", "r", tt, tm, undefined, []) + peek24("basil", "l", tt, LT("m904b") - .5, undefined, [[LE("m904b") + .1, "cheer"], [LE("m904b") + 2.2, "sit"]], { achieved: true })
      + lcPrint(tt, [[MK("dipfair"), MK("v_fair") - .4, MOMENT_RULE]]) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m906", sayId: "m905", who: "basil", n: "2 of 2", tab: "An experiment", text: TL.lines.m906.text, keys: ["experiment,", "answer", "question", "test", "prediction."], size: 56, y: 240, footer: FOOT, poses: [[LE("m906") + .2, "sit"]],
  under: markExp24(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)), extra: bd("pip", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 10 · score hand, the woodlouse (lizReveal: ONE push-in onto the woodlouse under the cupboard door: the REVEAL spot; it rolls into a ball
   for a moment and unrolls); Basil's fun fact (cousins of crabs and prawns; the damp side in a fair test) */
SC.final = (t, s) => { const L = "m1001"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1002", tq = W(L, "it") - .1, c = WLAT.liz, tc = W(L, "woodlouse"), rb = W(L, "cupboard"), ball = t >= rb && t < rb + 2.4 ? Math.sin(Math.PI * clamp((t - rb) / 2.4)) : 0;
  return lizReveal(t, s, L, sr(t, W0, { bench: benchTop(t, { crane: false, rack: { ns: [20, 20], tagT: ["iron nail", "steel nail"] } }), bug: [c[0], c[1], c[2], { ...c[3], ball, walk: ball < .05 }] }), c[0], c[1] - 10, tq, "It was under the cupboard door!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1004",
    fact: { id: "m1003b", at: [1250, 400], w: 760, h: 440, items: [["ff_crab", "cousins of crabs and prawns", ffCrab24], ["ff_damp", "the damp side", ffDamp24]], cols: ["#E0663A", "#2E6E9A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("m1003b") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_damp") + .2, "surprised"], [MK("ff_damp") + 1.6, "sit"], [LT("m1004") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 11 · the cliffhanger: Momo (big at the right) holds up a holder with TWO batteries from the cupboard's tray (twob), beside two coils on the
   bench (a short one and a long one: her plan, not yet named). Basil and Pip watch the batteries. Heart: Will Momo's plan be fair? */
const camCliff = (t) => { const s = SCN.cliff; return camMix(camRoom, camOn([1200, 760], 1.3, 1100, 600), eio(clamp((t - s.t0) / (s.t1 - s.t0)))); };
SC.cliff = (t, s) => { const cam = camCliff(t), [px, py] = pawPt("momo", MR[0], MR[1], MR[2], true), tb = MK("twob");
  const coils = setup24(t, { x: 1040, y: 860, k: .38, kind: "iron", n: 10, holder: false }) + setup24(t, { x: 1110, y: 860, k: .38, kind: "iron", n: 20, holder: false });
  return sr(t, cam, { bench: benchTop(t, { rack: { ns: [20, 20], tagT: ["iron nail", "steel nail"] } }) + coils })
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], px) }) + bd("pip", PM[0] - 80, PM[1], PM[2], t, { in: s.t0 + .1, flip: true, ...watchO(PM[0] - 80, px - 120) })
    + bd("momo", MR[0], MR[1], MR[2], t, { in: s.t0, flip: true, poses: [[s.t0, "sit"], [tb - .2, "pointing"], [tb + 1.4, "sit"]] })
    + (t >= tb - .4 ? TF(px - 120, py - 60 - 20 * spring(t, tb - .4, .4), .5 * spring(t, tb - .4, .4), battHolder23(t, 2)) + linkChip(t, tb, px - 420, py - 300, px - 120, py - 100, "#fff", "two batteries", 36, undefined, P.ink) : "")
    + (t >= W("m1102", "fair") - .1 ? TF(700, 330, spring(t, W("m1102", "fair") - .1, .45), tpill(0, 0, "Fair?", 70, P.sun, P.ink, { w: 700 })) : "") + smallPrint(t, s.t0 + .3, ADULT_RULE) + HUD(t); };
/* 12 · "Now you know!": the board, filled (IRON OR STEEL? our fair test, Now it's fair: let's test!) */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1060, 1.08, fairBoard24(t, 0, 0, 1, { all: true, change: 0, same: [0, 0, 0, 0], fair: 0 })), { bx: [230, 1730, 1500], hx: 470 });
})(); }
