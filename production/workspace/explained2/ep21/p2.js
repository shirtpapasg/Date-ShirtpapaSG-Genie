// p2.js: PART 2, "Bring a Magnet Near a Compass. What Does the Needle DO?": Pulau Ubin on Saturday morning (the jetty, THE TRAIL MAP with
// its empty compass rose), Round 1 (a bar magnet near a compass: two, the needle turns), be the compass needle (balanced on a pin; pushed
// away, then pulled in; back to North-South), the answer and NEEDLE, how do you use a compass? (turn the compass, not the needle: COMPASS;
// the rose fills and the route lights; Mark Sentence 6.15), the Showdown (Momo's compass checklist: keep the magnet next to it?), night and
// far away (a ship in the Singapore Strait, a hiker in fog in the United States: TELL THE DIRECTION; Mark Sentence 6.16's "Hence" line), the
// chant, the sea turtle, the dare into EP22 (an iron nail stroked with a magnet, then held near steel paper clips).
// Segments 1-14 of ../p3_ep21_script.md section 5 (version 1, 24 Nov 2026).
// STAGE 2 (drawn 2026-11-24): PULAU UBIN (sets21.js UB21: the jetty's end platform, the bumboats, the far arm of the jetty and its pillars,
// the mangroves, the ships at anchor, THE TRAIL MAP at its home on the right; BW21: the boardwalk over the seagrass shallows); the buddies
// stand IN the scene, big; the camera drifts or pushes in, never a jump cut inside a place. Every pose has its reason (SCENES_TODO.md,
// pose_reasons.json); OUTCOMES `to` keeps the corrected buddy shy and the right ones confident through the whole fix.
if (PART === 2) { (() => {
const L1 = "n401";
// the scores (script section 3): Round 1 1 : 1 (Momo and Basil right: the Buddies score), Showdown 3 : 1 (built on Momo's mistake: no point)
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Interactions · Properties of Magnets";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const R1 = ["Nothing happens", "The needle turns", "It spins and spins"];   // card 3 shortened to fit (SCENES_TODO allows it; the spoken line is unchanged)
const jetty = (t, cam, o = {}) => UB21(t, o, cam), shore = (t, cam, o = {}) => BW21(t, o, cam);
// Momo's compass on the trail map's wooden ledge (Round 1), Basil's bar magnet a little way along the wood
const LEDGE_C = [UB.map[0] - 140, UB.ledge[1] + 4], LEDGE_M = [UB.map[0] + 120, UB.ledge[1] - 4];
const ledgeProps = (t, o = {}) => TF(LEDGE_C[0], LEDGE_C[1] - 8, .2, compass21(t, o.nd || 0, 0, { sy: .45 })) + (o.mag === false ? "" : TF(o.mx || LEDGE_M[0], (o.my || LEDGE_M[1]) - 12, .26, bar20(t, { glint: false })));
window.SHELF_AWAY = (t) => { if (PART !== 2) return 0; const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
// a compass in a buddy's paws (screen space): flat, tilted away (sy), the needle at nd, the case turned cd
const pawCompass = (t, x, y, k, nd = 0, cd = 0) => TF(x, y, k, compass21(t, nd, cd, { sy: .5 }));

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each (>= 2.5 s each) */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Spin it: the same way every time", "The North-South direction", "Earth behaves like a magnet"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };

/* 2 · Pulau Ubin, Saturday morning: the jetty. The camera drifts from the bumboat towards the jetty's far arm, where the game's push-in starts
   (one move). boat: the three buddies step off the bumboat (a hop each); Momo holds up her hiking compass. The turtle beside a jetty pillar */
const TI = TTAT.intro, camJ0 = camOn([900, 640], 1.08, 960, 560), camJ1 = camOn([TI[0], TI[1] - 20], 1.5, 820, 470);
const camJetty = (t) => camMix(camJ0, camJ1, eio((t - SCN.jetty.t0) / (SCN.jetty.t1 - SCN.jetty.t0 + .2)));
const ubPill = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "Pulau Ubin, Singapore ·", "Saturday morning"));
SC.jetty = (t, s) => { const tb = MK("boat"); return jetty(t, camJetty(t))
  + bd("momo", 330, 1076, 500, t, { in: tb - .2, poses: [[tb - .2, "sit"]], jump: [[tb, 24]] }) + pawCompass(t, 470, 880, .36, 3 * Math.sin(t * 3))
  + bd("pip", 1400, 1010, 400, t, { in: tb, flip: true, jump: [[tb + .15, 20]] }) + bd("basil", 1730, 1076, 480, t, { in: tb + .1, flip: true, jump: [[tb + .3, 20]] })
  + ubPill(t, s.t0 + .1, 99) + smallPrint(t, s.t0 + .2, HIKE_RULE) + HUD(t); };
SC.game = (t, s) => { const cE = camJetty(SCN.jetty.t1), p = TI;
  return gameScene(t, s, HAS("n203b") ? ["n202", "n203b", "n204"] : ["n202", "n204"], false, { world: (tt) => jetty(tt, cE), A: camPt(cE, [p[0] + 70 * p[2], p[1] - 30 * p[2]]), T: [680, 440], Z: 2.6, dim0: 0 })
    + ubPill(t, s.t0 - 1, s.t0 + 1.6) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["How a compass works", ""], ["A magnet near a compass", ""], ["Telling the direction", ""]], ["n301", "n302", "n303", "n304"], "basil");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");

/* 4 · Round 1: Basil brings his bar magnet close to Momo's compass. THREE big numbered picture cards; the clue labels a compass at rest · a
   magnet comes close ON TOP of the ring; in the ring Momo's compass flat on the trail map's wooden ledge, Basil's bar magnet coming towards it
   along the wood (a gap, never touching). Basil leads (thinking after the question, worried through the countdown). Momo points at the needle
   in the ring after her line (showing it) */
SC.r1 = (t, s) => lockN(t, { t0: W(L1, "what") - .35, cards: R1, clues: [["a compass at rest", W(L1, "brings")], ["a magnet comes close", W(L1, "close")]], csize: 32, lead: "basil",
  pics: [0, 1, 2].map((i) => r1Pic(i, t)), q: "What happens?", tq: W(L1, "what") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", obj: ringP2,
  react: [[LE("n404m") + .1, "momo", "pointing"], [LE("n404m") + 1.9, "momo", "sit"]],
  picks: [{ who: "pip", id: "n403p", word: "1" }, { who: "momo", id: "n404m", word: "2" }, { who: "basil", id: "n405b", word: "2" }] }) + smallPrint(t, W(L1, "close"), CLOSE_RULE);

/* 5 · Be the compass needle! The camera glides down into Momo's compass on the ledge (through its clear lid); the buddies wave the viewer off
   (goodbye), then shrink. The turtle by the orange buoy near the bumboat as the camera passes */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camOn([1320, 640], 1.15, 960, 520), camOn([LEDGE_C[0], LEDGE_C[1] - 14], 7.0, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "n501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "pip", "basil"].map((w, i) => { const x = [300, 1400, 1730][i]; return bd(w, x, [1076, 1010, 1076][i], [480, 390, 470][i], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: x > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return jetty(t, camWait(t), { ledge: ledgeProps(t) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the compass needle!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#DDF4FF", 960, 600); };
SC.shrink = (t, s) => { const m = MK, rp = { pip: [[m("jpin") + 1, "thinking"], [m("jpin") + 3, "sit"]], momo: [[m("jpush") + .1, "surprised"], [m("jpush") + 2.2, "sit"]] }, a = needleAng(t) * Math.PI / 180, tip = [NP[0] + NL * Math.sin(a), NP[1] - NL * .44 * Math.cos(a)];
  return needleJourney(t, s) + riders(t, s, { tin: m("jpin") + .6, h: 200, at: { pip: [150, 1050], basil: [1760, 1052], momo: [320, 1046] }, poses: rp })
    + youTag(t, m("jpin"), "You: a compass needle") + feelTag(t, m("jpin") + .8, m("jsettle") - .2, "to scale: a compass needle", 180) + feelTag(t, m("jnorth"), m("jcome") - .2, "North", 180)
    + linkChip(t, m("jpush") + .3, 700, 540, tip[0], tip[1], 1, "pushed away", 44, m("jturn")) + linkChip(t, m("jpull") + .3, 1250, 300, tip[0], tip[1], 0, "pulled in", 44, m("jback")) + feelTag(t, m("jns"), s.t1, "North–South again", 180); };
// the pull back out: the jetty at normal size; the compass on the ledge; Basil's magnet lifted away from it
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return jetty(t, camMix(camOn([1300, 640], 1.15, 960, 560), camOn([LEDGE_C[0], LEDGE_C[1] - 14], 7.0, 960, 560), u), { ledge: ledgeProps(t, { mx: LEDGE_M[0] + 80, my: LEDGE_M[1] - 40 }) })
    + bd("momo", 300, 1076, 500, t, { in: s.t0 + .2 }) + bd("pip", 1730, 1076, 500, t, { in: s.t0 + .25, flip: true }) + bd("basil", 1180, 1010, 420, t, { in: s.t0 + .3 }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: the needle turns. The three cards small at the top left (card 2 lit at ansglow; "not this one" on card 1); the coins.
   Momo and Basil confident, Pip shy to the END of the scene (OUTCOMES `to`). NEEDLE pops on Basil's line; needle: Momo's compass held up big
   between the buddies, its needle joined by label lines to "the needle" and "a small magnet". The turtle among the mangrove roots */
const camAns2 = (t) => camMix(camOn([1000, 620], 1.08, 960, 560), camOn([900, 560], 1.18, 960, 560), eio((t - SCN.r1ans.t0) / 6));
SC.r1ans = (t, s) => { window._BUBAT = { basil: [1250, 300] }; const tA = MK("ansglow"), tN = MKS("needle"), up = eio(clamp((t - tN + .6) / .8)), cx = lerp(470, 760, up), cy = lerp(880, 640, up), ck = lerp(.36, .95, up);
  return jetty(t, camAns2(t), { ledge: "" })
    + `<g filter="url(#drop)"><rect x="30" y="40" width="660" height="190" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + R1.map((c, i) => TF(140 + i * 220, 132, .45, choiceCard3(i + 1, c, r1Pic(i, t), { w: 420, h: 330, size: 30, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "ra" }))).join("")
    + tagAt(t, tA + .3, 140, 222, 1, "not this one", 22) + coin(t, MK("coin1") - .1, 1560, 400, "+1", "if you showed two fingers")
    + bd("momo", 300, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .3 ? pickNum("momo", 470, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 530, 585, .7)
    + bd("basil", 1180, 1010, 420, t, { in: s.t0 + .15, poses: [[s.t0, "sit"]] }) + TF(1290, 860, .3, bar20(t)) + (t > s.t0 + .35 ? pickNum("basil", 1310, 700, t, s.t0 + .35, "2") : "") + tickChip16(t, tA + .25, 1370, 645, .7)
    + bd("pip", 1730, 1076, 500, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1880, 640, t, s.t0 + .4, "1") : "") + xChip16(t, tA + .3, 1860, 580, .7)
    + pawCompass(t, cx, cy, ck, 4 * Math.sin(t * 2.5))
    + (t >= tN ? linkChip(t, tN + .1, cx - 300, cy - 190, cx, cy - 40, 2, "the needle", 40) + linkChip(t, tN + .5, cx + 320, cy - 200, cx + 10, cy - 60, 2, "a small magnet", 40) : "")
    + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Basil at the trail map: "The needle points to the letter N. If I turn the compass round, the needle turns round with it!" (sure: his idea;
   then thinking: he is about to test it). He turns the compass in his paws. The turtle beside a rock in the shallows below the trail map */
const camTrail = (t) => { const s = SCN.trail, u = eio((t - s.t0 - .3) / (s.t1 - s.t0 - .3)); return camMix(camOn([1300, 600], 1.12, 1000, 560), camOn([1240, 760], 1.4, 1000, 600), u); };
const trailComp = (t) => { const s = SCN.trail, cd = 50 * Math.sin((t - s.t0) * 1.2); return pawCompass(t, 560, 830, .5 + .08 * eio((t - s.t0) / 5), cd * .1, cd); };
SC.trail = (t, s) => jetty(t, camTrail(t)) + bd("basil", 330, 1076, 480, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n701b") + .05, "thinking"]], look: 3 }) + trailComp(t)
  + bd("pip", 1420, 1010, 380, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1730, 1076, 500, t, { in: s.t0 + .2, flip: true }) + HUD(t);
/* [LOOK CLOSER] turn the compass, not the needle (lc21.js lcUseArt). Faces: Basil at the right the whole time (his idea is tested: thinking;
   OOPS ON `still`, shy to the verdict, a small nod at the verdict); Momo at the left from just before setN (pointing at the N under the red
   end; teaching COMPASS; a big smile and a nod: she cheers at her Mark Sentence) */
SC.lcuse = (t, s) => { window._BUBAT = { '*': [960, 912] }; const p = [560, 790], tm = s.t0 + 1.2, tK = MK("kw_compass"), tN = MK("setN");
  const kwLine = (tt) => tt > tK + .3 && tt < tK + 3.2 ? pline(620, 340, ...lcXY(tt, s, LCU[0] + 60, LCU[1] - 120), ramp(tt, tK + .3, .3) * (1 - ramp(tt, tK + 2.9, .3))) : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcUseArt, bgc: "#E9DCC0", set: (tt) => jetty(tt, camTrail(SCN.trail.t1)) + trailComp(SCN.trail.t1), verdict: [`TURN THE COMPASS, NOT THE NEEDLE`, GOODC], tv: MK("v_use"), peek: false,
    over: (tt) => kwLine(tt) + peekFace("basil", "r", tt, tm, undefined, [[tm + .2, "thinking"], [MK("still") + .1, "oops"], [MK("v_use"), "sit"]])
      + peekFace("momo", "l", tt, tN - .6, undefined, [[tN + .1, "pointing"], [LT("n704m") - .2, "sit"]]) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n707", sayId: "n706", who: "momo", n: "1 of 2", text: "A compass can help us to find the direction. When the needle inside the compass stops moving, it always points in the North-South direction of the Earth.", keys: ["find", "direction.", "needle", "stops", "moving,", "North-South", "Earth."], size: 54, y: 235, footer: FOOT, achieved: true, poses: [[LE("n707") + .2, "cheer"], [LE("n707") + 2.0, "sit"]],
  under: markMap(t, 1250, 900, .7 * spring(t, s.t0 + .4, .5)) });

/* 8 · Showdown: Momo's compass checklist on a small easel on the boardwalk ("Using my compass"). The lines light as she reads them (l1, l2,
   l3). The YOU ring (5 s) big on the blue stage, the checklist big beside it; Basil at the side, worried (the countdown before the answer).
   LOCKED IN!; Basil reveals (OUTCOMES at n804b: Basil and Pip confident, Momo shy, through the whole fix). The turtle by the boardwalk's posts */
const EAS = [600, 1160, .52];
const chkLit = (t) => { const ms = [MK("l1"), MK("l2"), MK("l3"), LE("n802m") + .2]; return [0, 1, 2].map((i) => ss(ms[i] - .1, ms[i] + .3, t) * (1 - ss(ms[i + 1] - .2, ms[i + 1] + .2, t))); };
const camShow = (t) => { const e = eio((t - LT("n802m") + .6) / 1.2) * (1 - eio((t - MK("ring0_show") + 1) / .8)); return camMix(camOn([900, 620], 1.06, 960, 560), camOn([EAS[0], EAS[1] - 280], 1.75, 960, 500), e); };
const showWorld = (t, cam, o = {}) => { const r0 = MK("ring0_show"), bell = MK("bell_show"); return shore(t, cam, { turtle: o.turtle !== undefined ? o.turtle : (t < r0 - 1 || t > bell + 1 ? BWAT.show : false), front: TF(EAS[0], EAS[1], EAS[2], momoSheet(t, o.sheet || { lit: chkLit(t) })) }); };
SC.show = (t, s) => { window._BUBAT = { basil: [1250, 260], momo: [1480, 300], pip: [1250, 260] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 5), tS = LT("n803") - .08, inT = t >= r0 && t < bell, R = [1340, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n804b");
  return showWorld(t, camShow(t)) + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(560, 560, .78, momoSheet(t, { lit: [0, 0, 0], board: true })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 }))) : "")
    + bd("momo", 230, 1076, 480, t, { in: s.t0 + .1, out: r0 - .7, poses: [[s.t0, "sit"], [s.t0 + .2, "pointing"], [s.t0 + 2.8, "sit"]] }) + bd("momo", 230, 1076, 480, t, { in: bell + .3, poses: [[bell + .3, "sit"]] })
    + bd("basil", 1720, 1076, 480, t, { in: r0 - .7, flip: true, rock: inT ? 2 : 0, poses: [[r0 - .7, "worried"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] }) + (t > bell + .5 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + bd("pip", 1440, 1010, 380, t, { in: bell + .4, flip: true, poses: [[bell + .4, "sit"]] }) + (t > bell + .6 ? pickNum("pip", 1320, 700, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
/* the fix: line 3 struck (strike, kept as a strike-through) and rewritten in green (rewrite: keep magnets and phones away from the compass);
   the coin +2 (coin2). Momo shy through the whole fix; Basil and Pip confident. The turtle beside the boardwalk's wooden ladder */
SC.fix = (t, s) => { window._BUBAT = { '*': [1250, 260] }; const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("rewrite"), MK("rewrite") + .8, t);
  const cam = camMix(camOn([EAS[0] + 40, EAS[1] - 230], 1.8, 960, 470), camOn([900, 640], 1.1, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.4)));
  return showWorld(t, cam, { turtle: BWAT.fix, sheet: { strike: st, fix: fx, lit: [0, 0, 0] } }) + coin(t, MK("coin2") - .1, 1560, 330, "+2", "line 3")
    + bd("momo", 230, 1076, 480, t, { in: s.t0 + .05, poses: [[s.t0, "oops"]] }) + bd("pip", 1440, 1010, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] }) + bd("basil", 1720, 1076, 480, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "arms_crossed"]] })
    + smallPrint(t, s.t0 + .3, PHONE_RULE) + HUD(t); };

/* 9 · Pip on the boardwalk, looking out at the ships: "But what if it is night, and we cannot see the Sun? Will a compass still work?"
   (talks, then thinks: his own real question). The camera pushes in past him to the ships (straight into the look-closer). The turtle in the
   shadow under the boardwalk between two far posts */
const camBw = (t) => { const s = SCN.bwalk, u = eio((t - s.t0 - .3) / (s.t1 - s.t0 - .3)); return camMix(camOn([960, 600], 1.04, 960, 560), camOn([1300, 400], 1.6, 1100, 420), u); };
SC.bwalk = (t, s) => shore(t, camBw(t)) + bd("pip", 300, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [LE("n901p") + .05, "thinking"]], look: -3 })
  + bd("basil", 1420, 1010, 400, t, { in: s.t0 + .15, flip: true }) + bd("momo", 1730, 1076, 500, t, { in: s.t0 + .2, flip: true }) + pawCompass(t, 1600, 900, .3, 2 * Math.sin(t * 3)) + HUD(t);
/* [LOOK CLOSER] night and far away (lc21.js lcNightArt). Faces: Pip at the left the whole time (his question is answered: thinking; eyes wide
   as the ship's compass card rests: listening; he teaches TELL THE DIRECTION; cheer after his line: achieved); Momo at the right from the fog
   (listening, a small nod) */
SC.lcnight = (t, s) => { window._BUBAT = { '*': [960, 912] }; const cE = camBw(SCN.bwalk.t1), p = camPt(cE, [1300, 380]), tm = s.t0 + 1.2, tK = MK("kw_tell_the_direction");
  const kwLines = (tt) => tt > tK + .3 && tt < tK + 3.4 ? [lcXY(tt, s, -520, -180), lcXY(tt, s, 560, -150)].map(([x, y]) => pline(960, 340, x, y, ramp(tt, tK + .3, .3) * (1 - ramp(tt, tK + 3.1, .3)))).join("") : "";
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcNightArt, bgc: "#0B1033", set: (tt) => shore(tt, cE), verdict: [`DAY OR NIGHT, NEAR OR FAR: IT TELLS THE DIRECTION`, GOODC], tv: MK("v_night"), peek: false,
    over: (tt) => kwLines(tt) + peekFace("pip", "l", tt, tm, undefined, [[tm + .2, "thinking"], [MK("shipneedle") - .3, "sit"], [LE("n905p") + .1, "cheer"], [LE("n905p") + 2.2, "sit"]], { achieved: true })
      + peekFace("momo", "r", tt, MK("fog") - .4, tK - .2) }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n907", sayId: "n906", who: "pip", n: "2 of 2", text: "Hence, a freely suspended magnet can be used to tell the direction.", keys: ["freely", "suspended", "magnet", "tell", "direction."], size: 70, y: 260, footer: FOOT, achieved: true, poses: [[LE("n907") + .2, "sit"]],
  under: markTwo(t, 1250, 880, .68 * spring(t, s.t0 + .4, .5)) });
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 42, x: 600, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1290, ty: 560, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1640, 600, .72, chantBoard21(tt, flash)) });

/* 11 · score hand; the sea turtle (lizReveal onto the turtle in the seagrass at the end of the boardwalk: the REVEAL spot, never the intro
   pillar); Pip's fun fact: a baby turtle scrambling down the beach into the sea (ff_baby), the turtle crossing the ocean on a dotted route
   under a small glowing Earth (ff_ocean), a grown turtle back on the same beach (ff_home). Basil points at the turtle once it is ringed; Momo
   is surprised ON ff_home (a real surprise); Basil waves goodbye at "Tell someone at home!" */
SC.final = (t, s) => { const L = "n1101"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1102", tq = W(L, "it") - .1, c = BWAT.liz, tc = W(L, "turtle");
  return lizReveal(t, s, L, shore(t, null, { turtle: c }), c[0] - 70 * c[2], c[1] - 30 * c[2], tq, "It was in the seagrass!", -120, 160, 80, 3.4, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1104",
    fact: { id: "n1103p", at: [1270, 400], w: 900, h: 440, items: [["ff_baby", "a baby turtle", ffBaby21], ["ff_ocean", "the Earth's magnet", ffOcean21], ["ff_home", "years later: back home", ffHome21]], cols: ["#E8A23A", "#5B6BD6", "#4BA862"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "sit"]] } })
    + bd("basil", 170, 1076, 310, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .2, "pointing"], [LT("n1103p") - .3, "sit"], [LT("n1104") - .1, "waving"], [LE("n1104") + 1.6, "sit"]], wave: true })
    + bd("momo", 400, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_home") + .1, "surprised"], [MK("ff_home") + 2.2, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 12 · the dare for Episode 22: the jetty, THE TRAIL MAP complete. Pip at the wooden bench by the map with an ordinary iron nail and Basil's
   bar magnet: the magnet strokes the nail from its head to its tip with its red end, lifts up and away in an arc, and strokes again the SAME
   way (a counter 1, 2, 3...); a little pile of steel paper clips waits in a tray on the bench. The cards (EP22's own pictures of EP21's dare,
   ep21dare.js) slide in BEFORE the nail reaches the clips: no answer shown, and nothing says "magnet" about the nail */
const BEN = [1060, 1050, .74], NAILP = [BEN[0] - 40, BEN[1] - 112];
const strokeAt = (t) => { const t0 = MK("stroke"), P_ = 1.5, u = (t - t0) / P_; if (u < 0) return { x: -160, y: -40, n: 0 }; const n = Math.floor(u) + 1, f = u % 1;
  return f < .6 ? { x: lerp(-130, 120, eio(f / .6)), y: -24, n, on: true } : { x: lerp(120, -130, eio((f - .6) / .4)), y: -24 - 110 * Math.sin(Math.PI * (f - .6) / .4), n }; };
const dareWorld = (t, cam) => { const st = strokeAt(t); return jetty(t, cam, { map: { all: true }, turtle: false,
  deck: TF(BEN[0], BEN[1], BEN[2], bench21(560)) + `<rect x="${BEN[0] + 60}" y="${BEN[1] - 122}" width="150" height="26" rx="6" fill="#E7ECEF" stroke="#8A96A0" stroke-width="3"/>` + clipPile21(BEN[0] + 135, BEN[1] - 122, .5)
    + nail21(NAILP[0], NAILP[1], .62) + TF(NAILP[0] + st.x * .62, NAILP[1] + st.y * .62 - 20, .2, bar20(t, { glint: false }), -90)
    + (st.on ? `<path d="M${n2(NAILP[0] - 80)} ${NAILP[1] - 22} H${n2(NAILP[0] + st.x * .62)}" stroke="#fff" stroke-width="4" opacity=".5" stroke-dasharray="6 8"/>` : "") }); };
SC.dare = (t, s) => { const a = "n1201", tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1], tL = W(a, "lock") - .1, e2 = eio(clamp((t - MK("dareIn") - .4) / 1.6)), st = strokeAt(t);
  const cam = camMix(camOn([NAILP[0], NAILP[1] - 20], 2.6, 980, 420), camOn([NAILP[0], NAILP[1] - 10], 1.9, 980, 330), e2), np = camPt(cam, [NAILP[0], NAILP[1] - 70]);
  return dareWorld(t, cam) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.25 * e2)}"/>`
    + (st.n > 0 ? TF(np[0] + 330, np[1] - 140, 1 + .1 * pulse(t, MK("stroke") + (st.n - 1) * 1.5, .03, .3), tpill(0, 0, "stroke " + [...Array(Math.min(st.n, 3))].map((_, i) => i + 1).join(", ") + (st.n >= 3 ? "…" : ""), 38, "#fff", P.ink, { w: 700 })) : "")
    + (t < MK("dareIn") + 3 ? OP(1 - ramp(t, MK("dareIn") + 2.6, .3), TF(np[0] - 300, np[1] - 140, spring(t, MK("stroke") + .2, .45), tpill(0, 0, "always the same way", 34, P.pip, "#fff", { w: 700 }))) : "")
    + NEXT_CARDS.map((c, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 2 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, 760 + i * 440, 1020);
      return d + TF(x, 840, 1, choiceCard3(i + 1, c, darePic21(i, t), { w: 420, h: 330, size: 32, pulse: pl, id: "dr" })); }).join("")
    + (t >= tQ ? TF(1000, 150, spring(t, tQ, .45), tpill(0, 0, "NEXT · What happens?", 52, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tL ? TF(1000, 1030, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bd("pip", 250, 1076, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], noreact: true })
    + bd("momo", 1560, 1060, 400, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .3, "thinking"]] })
    + bd("basil", 1790, 1066, 400, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ + .45, "thinking"]] }) + melt(t, s, "liz", .4) + HUD(t); };
SC.nyk = (t, s) => nykScene(t, s, nykP2(t), { bx: [230, 1760, 1560], hx: 420 });
})(); }
