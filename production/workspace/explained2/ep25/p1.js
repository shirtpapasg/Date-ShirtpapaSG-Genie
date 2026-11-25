// p1.js: PART 1, "Why Does the Fridge Door STAY Shut? Magnets Hiding at Home": EP24's dare answered (two, a strip of magnet), be the magnetic
// strip, the answer and MAGNETIC STRIP (Pip), where is the magnet? (look closer: the door's edge cut away; Mark Sentence 7.12a fridge, Pip),
// HOLD ON! (Basil and the shiny aluminium window frame; Momo's fix), a whiteboard and a doorstop (look closer: the steel sheet, 7.12a strip;
// MAGNETIC WHITEBOARD, Momo; the doorstop: MAGNETIC DOORSTOP, Basil; Mark Sentence 7.12a doorstop, Basil), the honeybee, the cliffhanger
// (Pip's video of a floating train). Segments 1-12 of ../p3_ep25_script.md section 4. One real place: PIP'S HDB KITCHEN on Saturday morning
// (art25.js HOME25 over EP15's baked kitchen). Buddies big in the scene; the camera never cuts inside the place; they WATCH every
// demonstration (watchO), and at most one buddy a scene glances with a wave.
if (PART === 1) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("m803", "one") - .1, 2, 1]);
const FOOT = "P3 · Making and Using Magnets · Magnets in everyday life";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
const slamFit = (y, txt, col, k) => slamLine(y, txt, Math.min(170, 170 * 1720 / tw(txt, 170, 700, "Fredoka", 4)), col, k);
window.SHELF_AWAY = (t) => { const a = W("m802", "cross") - .3, b = LE("m803") + .4, w = SCN.waitw; return Math.max(ss(a, a + .35, t) * (1 - ss(b, b + .35, t)), ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t))); };
const home = (t, cam, o = {}) => HOME25(t, o, cam);
// a two-sentence cream book strip at the top of a look-closer panel: one sentence a line, the words appearing as Heart reads them
const strip2 = (t, id, y, keys) => { const ws = TL.lines[id].words.map((w) => w.w), i2 = ws.findIndex((w, i) => i > 0 && /[.!?]$/.test(ws[i - 1])); return bookCaption(t, id, ws.slice(0, i2).join(" "), y, { size: 30, keys }) + bookCaption(t, id, ws.slice(i2).join(" "), y + 62, { size: 30, off: i2, keys }); };
const BL = [300, 1076, 470], MO = [800, 1076, 470], PI = [1330, 1066, 450];
const camRoom = camOn([960, 640], 1.0, 960, 560), camFridge = camOn([1700, 700], 1.25, 1250, 560);
const camInv = (c, s) => [(s[0] + (c[0] - 1) * c[1]) / c[0], (s[1] + (c[0] - 1) * c[2]) / c[0]];
const pill1 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "An HDB flat, Singapore ·", "Saturday morning"));
// the fridge door's swing: Pip's push (push0), it swings shut by itself (shut0) and stays
const doorOpen = (t) => { const p = MK("push0"), s = MK("shut0"); return t < p - .8 ? .5 : t < p ? .5 + .08 * Math.sin(Math.PI * clamp((t - p + .8) / .8)) : .5 * (1 - eio(clamp((t - p) / Math.max(.6, s - p + .6)))); };

/* 1 · the cold open, SPEAKING from 0.8 s: Pip's kitchen on Saturday morning; the fridge door stands a little open; Pip gives it a gentle push
   (push0) and it swings shut by itself (shut0) and stays. Momo waves once at Heart's first words (hello), then watches; Basil watches */
const camCold = (t) => camMix(camRoom, camFridge, eio(clamp(t / (SCN.cold.t1 + 2))));
SC.cold = (t, s) => home(t, camCold(t), { open: doorOpen(t) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: -1, ...watchO(BL[0], 1700) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: -1, ...watchO(MO[0], 1700), poses: [[0, "sit"], ...glanceWave(.9)] })
  + bd("pip", PI[0], PI[1], PI[2], t, { in: -1, ...watchO(PI[0], 1700), poses: [[0, "sit"], [MK("push0") - .3, "pointing"], [MK("shut0") + 1.2, "sit"]] })
  + pill1(t, .2, 7.2) + HUD(t);
const dareCard25 = (i, o = {}, t = 0) => choiceCard3(i + 1, DARE_CARDS[i], darePic24(i, t), { w: 380, h: 330, size: 30, ...o });
SC.lasttime = (t, s) => { const L = "m103", tc = [W(L, "one"), W(L, "two"), W(L, "three")], z = 1 + .04 * eio((t - s.t0) / 8), k = ramp(t, s.t0 + .05, .5), cur = tc.filter((x) => t >= x - .15).length - 1;
  let cards = ""; [0, 1, 2].forEach((i) => { const fw = cur === i ? ss(tc[i] - .15, tc[i] + .25, t) : 0; cards += TF(560 + i * 400, 600 + 14 * (1 - spring(t, s.t0 + .2 + i * .15, .45)), .95 * (1 + .1 * fw), dareCard25(i, { pulse: cur === i ? .9 : pulse(t, tc[i], .04, .9), id: "lt" + i }, t)); });
  return `<g filter="url(#b10)">${home(t, camCold(SCN.cold.t1), { bug: false })}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".45"/>` + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${cards}</g>` + TF(960, 1000, spring(t, s.t0 + .2, .4), tpill(0, 0, DARE_LABEL, 40, P.sun, P.ink, { w: 700 }))) + melt(t, s, "cold", .5) + HUD(t); };
/* back: Basil tugs the door (tug): it opens with a soft thup (a hop); Pip covers his eyes for a second (fun suspense) */
const camBack = (t) => camMix(camFridge, camOn([1700, 700], 1.3, 1250, 560), eio(clamp((t - SCN.back.t0) / (SCN.title.t1 - SCN.back.t0))));
SC.back = (t, s) => { const tg = MK("tug"), op = t < tg + .2 ? 0 : .18 * Math.sin(Math.PI * clamp((t - tg - .2) / 1.4));
  return home(t, camBack(t), { open: op }) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], 1700), jump: [[tg + .2, 22]] }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0, ...watchO(MO[0], 1700) })
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .1, ...watchO(PI[0], 1700), jump: [[tg + .1, 16]] })
    + (t >= LT("m104") - .1 ? TF(960, 330, spring(t, LT("m104") - .1, .4), tpill(0, 0, "Hold on to your answer!", 56, P.sun, P.ink, { w: 700 })) : "") + melt(t, s, "lasttime", .5) + HUD(t); };
const TITLE = (k1, k2) => slamFit(400, "MAGNETS", "#fff", k1) + slamFit(610, "AT HOME?!", P.sun, k2);
SC.title = (t, s) => { const u = t - MK("title"), dim = clamp(u / .2); return lcSet(t, s, "back") + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.78 * dim)}"/>` + TITLE(slamK(u, .05), slamK(u, .55)) + HUD(t); };

/* 2 · today: the camera glides to the MAGNET HUNT card on the freezer door (card), then on to the window's plant (the game's push-in) */
const camCard = camOn([1700, 420], 1.5, 1200, 520), camPlant = camOn([BEEAT.intro[0], BEEAT.intro[1] - 10], 1.6, 760, 480);
const camToday = (t) => { const s = SCN.today, a = eio((t - s.t0) / 1.8), c = eio((t - (s.t1 - 1.5)) / 1.5); return c > 0 ? camMix(camCard, camPlant, c) : camMix(camBack(SCN.title.t1), camCard, a); };
SC.today = (t, s) => { const out = s.t1 - 1.4; return home(t, camToday(t), {}) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1, out, ...watchO(BL[0], 1700) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .15, out: out + .1, ...watchO(MO[0], 1700) })
  + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .05, out: out + .2, poses: [[s.t0, "sit"], [MK("card") + .1, "pointing"], [MK("card") + 1.8, "sit"]] }) + HUD(t); };
SC.game = (t, s) => { const cE = camToday(SCN.today.t1), p = BEEAT.intro;
  return gameScene(t, s, ["m204", "m205m", "m206"], false, { world: (tt) => home(tt, cE, {}), A: camPt(cE, [p[0], p[1] - 6]), T: [680, 440], Z: 2.6, dim0: 0, finder: "momo",
    poses: { pip: [[W("m204", "honeybee") + .1, "surprised"], [W("m204", "honeybee") + 1.8, "sit"]], basil: [[W("m206", "buddies") - .1, "waving"], [W("m206", "buddies") + 1.0, "sit"]] } }) + smallPrint(t, LT("m206"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Magnets at home", ""], ["Whiteboards and doorstops", ""], ["Magnetic or not?", ""]], ["m301b", "m302b", "m303b", "m304b"], "basil");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1", "YOUR ANSWER FROM LAST TIME");

/* 4 · Round 1: EP24's dare (5 s): EP24's three cards (ep24dare.js) as the ONE set of numbered picture cards; the ring: the fridge door just
   shut, a "?"; Basil leads (worried). Picks Basil 3 (he tugs the door), Pip 2 (a steel spoon by the door's edge), Momo 2 */
SC.r1 = (t, s) => { const L1 = "m401"; return lockN(t, { t0: LT(L1) - .1, cards: DARE_CARDS, clues: DARE_CLUES.map((c, i) => [c, W(L1, "what") + .2 * i]), lead: "basil", csize: 30, q: DARE_LABEL, tq: W(L1, "what") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "m402", pics: [0, 1, 2].map((i) => darePic24(i, t)), obj: ringP1_25,
  react: [[LE("m404p") + .1, "pip", "pointing"]],
  picks: [{ who: "basil", id: "m403b", word: "3" }, { who: "pip", id: "m404p", word: "2" }, { who: "momo", id: "m405m", word: "2" }] })
  + (t >= MKS("spoon") - .2 && t < LE("m404p") + .4 ? TF(1560, 330, spring(t, MKS("spoon") - .2, .4), `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="220" rx="24" fill="#FFF8EA"/></g><rect x="-110" y="-90" width="40" height="170" rx="10" fill="#fff" stroke="#8C98A4" stroke-width="4"/>` + `<g transform="translate(10 -10) rotate(-20)"><ellipse cx="0" cy="-50" rx="22" ry="30" fill="#C9D2DA" stroke="#5C6872" stroke-width="4"/><rect x="-6" y="-20" width="12" height="100" rx="6" fill="#C9D2DA" stroke="#5C6872" stroke-width="3"/></g>` + T(20, 92, "a steel spoon", 24, P.ink)) : ""); };

/* 5 · Be the magnetic strip! One glide into the fridge door's soft edge; the buddies wave the viewer off, then shrink */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([1540, 700], 5.0, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "m501", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["basil", "momo", "pip"].map((w, i) => { const X = [BL, MO, PI][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return home(t, camWait(t), {}) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be the magnetic strip!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#F7F9FA", 960, 600); };
const riders25 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { pip: [[m("jsnug") + .1, "surprised"], [m("jsnug") + 1.8, "sit"]], basil: glanceWave(m("jlie") + 2.0) };
  return stripJourney(t, s) + riders25(t, s, { tin: m("jlie") + .6, h: 190, at: { pip: [200, 1044], basil: [1760, 1050], momo: [420, 1040] }, poses: rp, look: 1400, jolts: [m("jsnug")] })
    + youTag(t, MK("jlie"), "You: the magnetic strip in the fridge door") + feelTag(t, MK("jlie") + .8, MK("jalong") - .2, "inside the soft edge", 160) + feelTag(t, MK("jpull"), MK("jsnug") - .2, "pulled to the steel", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return home(t, camMix(camRoom, camOn([1540, 700], 5, 960, 560), u), {}) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .2 }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .25 }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .3 }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 6 · the answer is two: a strip of magnet. EP24's cards small at the top left (card 2 lit); YOU +1 and BUDDIES +1; Pip and Momo confident,
   Basil shy (OUTCOMES). Pip teaches MAGNETIC STRIP (a line round the door's soft edge) and cheers */
const camAns = (t) => camMix(camRoom, camOn([1500, 700], 1.15, 1150, 580), eio(clamp((t - MK("kw_magnetic_strip") + .5) / 1.2)));
SC.answer = (t, s) => { const tA = MK("ansglow"), tK = MK("kw_magnetic_strip"), cam = camAns(t), e = camPt(cam, [1540, 700]);
  return home(t, cam, {}) + `<g filter="url(#drop)"><rect x="30" y="110" width="660" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(140 + i * 205, 205, .42, dareCard25(i, { id: "an" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }, t))).join("")
    + tagAt(t, tA + .3, 140, 292, 1, "not this one", 20) + tagAt(t, tA + .4, 550, 292, 1, "not this one", 20) + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .1 }) + (t > s.t0 + .3 ? pickNum("basil", 480, 640, t, s.t0 + .3, "3") : "") + xChip16(t, tA + .25, 535, 585, .7)
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .15 }) + (t > s.t0 + .35 ? pickNum("momo", 980, 640, t, s.t0 + .35, "2") : "") + tickChip16(t, tA + .2, 1035, 585, .7)
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [LE("m602p") + .05, "cheer"]], achieved: true }) + (t > s.t0 + .4 ? pickNum("pip", 1500, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1555, 585, .7)
    + (t >= tK + .2 && t < tK + 2.6 ? pline(1000, 400, e[0], e[1], ramp(t, tK + .2, .3), P.sun) : "") + melt(t, s, "pullout", .3) + HUD(t); };

/* 7 · Basil (big at the left, still shy) peers at the door's edge: "But where is the magnet? I can't see it!" A push in on the door's edge */
const camQ1 = (t) => camMix(camRoom, camOn([1560, 700], 1.4, 1250, 600), eio(clamp((t - SCN.lc1q.t0) / (SCN.lc1q.t1 - SCN.lc1q.t0))));
SC.lc1q = (t, s) => home(t, camQ1(t), {}) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], 1600) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .15, ...watchO(PI[0], 1600) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], 1600) }) + HUD(t);
const peek25 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
/* [LOOK CLOSER] where is the magnet? (lc25.js lcFridgeArt). Faces: Basil lower left (shy), Pip lower right (listening; he read the answer) */
SC.lcfridge = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), p = camPt(cE, [1560, 700]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcFridgeArt, bgc: "#FFF6E6", set: (tt) => home(tt, cE, {}), verdict: ["A MAGNET HIDES IN THE DOOR'S EDGE", GOODC], tv: MK("v_edge"), peek: false,
    over: (tt) => peek25("basil", "l", tt, tm, undefined, []) + peek25("pip", "r", tt, tm + .3, undefined, []) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "m705", sayId: "m704", who: "pip", n: "1 of 2", tab: "The fridge door", text: TL.lines.m705.text, keys: ["strips", "magnets", "keep", "door", "closed."], size: 54, y: 240, footer: FOOT, poses: [[LE("m705") + .2, "sit"]],
  under: markFridge25(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 8 · HOLD ON! Basil climbs onto the counter and holds a fridge magnet against the shiny window frame (aluminium). The ring takes the stage
   (5 s; the clue labels ON TOP; only Basil at the side). After the bell: Basil shy through the WHOLE fix; Pip and Momo confident. The fix: the
   magnet slides off the frame into Basil's paw (slide); the tag aluminium: not magnetic; the hunt card's line ✗ */
const BC = [1200, 752, 460];   // Basil on the counter (feet on the counter top), by the window's lower right corner
const camHold = camOn([1250, 560], 1.25, 1000, 520);
const RG = [960, 420], RR = 215;
SC.holdon = (t, s) => { window._BUBAT = { basil: [900, 220], momo: [900, 220], pip: [900, 220] }; const b = "m802", c = "m803", r0 = MK("ring0_hold"), bell = MK("bell_hold"), rs = ringState(t, r0, 5), tX = W(b, "cross") - .15, tH = W(b, "hold") - .1, tOne = W(c, "one") - .1, inT = t >= r0 && t < bell, cam = camHold;
  const st = ss(tX - .1, tX + .4, t) * (1 - ss(LE(c) + .1, LE(c) + .6, t)), ring = st > .01, sl = t >= MK("slide") ? eio(clamp((t - MK("slide")) / .7)) : 0;
  const [px, py] = pawPt("basil", BC[0], BC[1], BC[2], false), magS = TF(px + 55, lerp(py - 92, py + 20, sl), .3, bar20(t, { glint: false }));
  const inner = `<clipPath id="hoC"><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}"/></clipPath><circle cx="${RG[0]}" cy="${RG[1]}" r="${RR - 24}" fill="#FFFDF6"/><g clip-path="url(#hoC)"><g transform="translate(${RG[0]} ${RG[1] + 5}) scale(.75) translate(-430 -430)">${ringHold25(t)}</g></g>`;
  const labels = [["shiny", 420, 250, -1], ["metal", 1500, 250, 1], ["the window frame", 420, 560, -1]].map(([l, x, y, sd], i) => { const t0 = tX + .2 + i * .15; return t < t0 ? "" : pline(x - sd * 190, y + 40, RG[0] + sd * RR * .8, RG[1] + (i === 2 ? RR * .4 : -RR * .6), ramp(t, t0, .2)) + clue3(x, y, l, spring(t, t0, .4), 50, 520); }).join("");
  const bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 6 * Math.sin(t * 3), fr = camPt(cam, [1500, 520]);
  return home(t, cam, { bug: t < r0 - 1 || t > bell + 1 ? BEEAT.holdon : false })
    + (t >= MK("slide") ? linkChip(t, MK("slide") + .5, 1500, 260, fr[0], fr[1], "#7E8A96", "aluminium: not magnetic", 38) : "")
    + (ring ? OP(st, bg("stage")) + OP(st, TF(RG[0], RG[1], spring(t, tX, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-RG[0]} ${-RG[1]})">${ringTimer(RG[0], RG[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 5 : t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.25, inner })}</g>`)
      + labels + TF(1700, 800 + bob, .9 * spring(t, tX + .1, .4), `<g filter="url(#dropS)">${crossedArms()}</g>`) + youPill(1700, 640 + bob * .6, 1.2) + TF(1700, 990, spring(t, tX + .2, .4), tpill(0, 0, "cross your arms", 38, P.ink, "#fff", { w: 700 }))) : "")
    + bd("momo", 420, 1076, 460, t, { in: LT(c) + .3, ...watchO(420, 1360) }) + bd("pip", 800, 1066, 440, t, { in: LT(c) + .4, ...watchO(800, 1360) })
    // Basil stands on the counter with the magnet; while the countdown has the stage he pops out and stands at the side, big (SERIES_FORMAT 4:
    // only the question's elements and one buddy at the side), then pops back onto the counter for the fix
    + bd("basil", BC[0], BC[1], BC[2], t, { in: s.t0 + .1, out: tX - .25, poses: [[s.t0, "sit"], [W(b, "something") + .2, "thinking"]], nohop: true, watch: 1480, look: 5 })
    + bd("basil", 1660, 1076, 440, t, { in: tX + .15, out: LE(c) + .2, flip: true, rock: inT ? 2.2 : 0, poses: [[tX, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 26]], nohop: true })
    + bd("basil", BC[0], BC[1], BC[2], t, { in: LE(c) + .45, poses: [[LE(c) + .45, "sit"]], nohop: true, watch: 1480, look: 5 }) + (t > tX - .25 && t < LE(c) + .45 ? "" : magS)
    + stamp(t, tH, 960, 560, "HOLD ON!") + bellIcon(t, r0) + coin(t, tOne, 960, 330, "+1", "arms crossed") + HUD(t); };

/* 9 · Basil (still on the counter's left end, by the little whiteboard): "A whiteboard looks like plastic. So why does my magnet stick to it?"
   (a question; no longer shy: the HOLD ON! ended) */
const camQ2 = (t) => camMix(camRoom, camOn([300, 520], 1.4, 600, 520), eio(clamp((t - SCN.lc2q.t0) / (SCN.lc2q.t1 - SCN.lc2q.t0))));
SC.lc2q = (t, s) => home(t, camQ2(t), {}) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], 230) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .15, ...watchO(PI[0], 230) })
  + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, poses: [[s.t0, "pointing"], [LE("m901b") + .05, "thinking"]] }) + HUD(t);
/* [LOOK CLOSER] a whiteboard and a doorstop (lc25.js lcHomeArt), the cream strip 7.12a. Faces: Momo lower right (teaching MAGNETIC WHITEBOARD;
   her smile and nod), then Basil lower left (teaching MAGNETIC DOORSTOP; cheer) */
SC.lchome = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ2(SCN.lc2q.t1), p = camPt(cE, [230, 440]), tS = MK("strip");
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcHomeArt, bgc: "#FFF6E6", set: (tt) => home(tt, cE, {}), verdict: ["STEEL SHEET · STEEL PLATE: MAGNETS HOLD ON", GOODC], tv: MK("v_home"), peek: false,
    over: (tt) => peek25("momo", "r", tt, s.t0 + 1.2, MK("door") + .4, [[LE("m904m") + .1, "cheer"], [LE("m904m") + 2.2, "sit"]], { achieved: true }) + peek25("basil", "l", tt, MK("door") + .6, undefined, [[LE("m906b") + .1, "cheer"], [LE("m906b") + 2.2, "sit"]], { achieved: true })
      + (tt >= tS - .1 && tt < LE("m903s") + 1.4 ? OP(1 - ramp(tt, LE("m903s") + 1.0, .3), strip2(tt, "m903s", 196, ["steel", "sheets", "attracted"])) : "") }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "m908", sayId: "m907", who: "basil", n: "2 of 2", tab: "The doorstop", text: TL.lines.m908.text, keys: ["magnet", "doorstop", "hold", "door", "place", "closing", "suddenly."], size: 52, y: 240, footer: FOOT, poses: [[LE("m908") + .2, "sit"]],
  under: markDoor25(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("pip", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 10 · score hand, the honeybee (ONE push-in onto the bee on the curtain's edge: the REVEAL spot); Momo's fun fact */
SC.final = (t, s) => { const L = "m1001"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2]]); };
SC.liz = (t, s) => { const L = "m1002", tq = W(L, "it") - .1, c = BEEAT.liz, tc = W(L, "honeybee");
  return lizReveal(t, s, L, home(t, W0, { bug: c }), c[0], c[1] - 6, tq, "It was on the edge of the curtain!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "m1004",
    fact: { id: "m1003m", at: [1250, 400], w: 760, h: 440, items: [["ff_bee", "honeybees", ffBee25], ["ff_compass", "the Earth's magnetism", ffEarth25]], cols: ["#D9A21B", "#2F6FD6"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("basil", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("m1003m") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_compass") + .2, "surprised"], [MK("ff_compass") + 1.6, "sit"], [LT("m1004") - .1, "waving"], [s.t1, "sit"]], wave: true }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };

/* 11 · the cliffhanger: Pip holds up his tablet (video): a sleek train gliding above its track; the others lean in to watch the screen */
SC.cliff = (t, s) => { const [px, py] = pawPt("pip", PI[0], PI[1], PI[2], false), tv = MK("video");
  return home(t, camRoom, {}) + bd("basil", BL[0], BL[1], BL[2], t, { in: s.t0 + .05, ...watchO(BL[0], px) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], px) })
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0, poses: [[s.t0, "sit"], [LE("m1101p") + .1, "surprised"], [LE("m1101p") + 1.6, "sit"]] })
    + TF(px - 330, py - 260 - 30 * spring(t, tv - .4, .4), 1.0 * spring(t, tv - .4, .4), tablet25(t, 1))
    + (t >= W("m1102", "float") - .1 ? TF(700, 300, spring(t, W("m1102", "float") - .1, .45), tpill(0, 0, "Float?!", 70, P.sun, P.ink, { w: 700 })) : "") + HUD(t); };
/* 12 · "Now you know!": the MAGNET HUNT card, filled */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 1040, 1.25, huntCard25(t, 0, -380, 1, { items: HUNT1(), all: true, sub: "Pip's home" })), { bx: [230, 1730, 1500], hx: 470 });
})(); }
