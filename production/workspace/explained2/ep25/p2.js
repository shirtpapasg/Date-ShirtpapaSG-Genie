// p2.js: PART 2, "A Train That FLOATS? Cranes, Trains and a Magnet Toy": the recap, Family Day at the park by the pond (the magnetic fishing
// game), Round 1 (aluminium clips: what happens?), the answer, why an electromagnet? (look closer: the scrapyard crane; Mark Sentence 7.12a
// crane, Momo), the Showdown (Momo's magnet-car poster: like poles push), be a floating train, how can it float? (look closer: the maglev cut
// away, MAGLEV TRAIN, Pip; the hospital's MRI scanner, 7.13a strip, MRI SCANNER, Momo; Mark Sentence 7.12a maglev, Pip), interacting (7.14
// strip; INTERACTING, Basil), the chant, the water strider, THE P3 GOODBYE (7.13; thank you; count the magnets at home; no dare, no promised
// topic), the key words, "Now you know!". Segments 1-15 of ../p3_ep25_script.md section 5. One real place: the park (art25.js PARK25).
if (PART === 2) { (() => {
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([MK("coin2") - .1, 3, 1]);
const FOOT = "P3 · Making and Using Magnets · Magnets in everyday life";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const W0 = [1, 960, 540];
window.SHELF_AWAY = (t) => { const w = SCN.waitw; return ss(w.t0 + .3, w.t0 + .8, t) * (1 - ss(SCN.pullout.t1, SCN.pullout.t1 + .4, t)); };
const park = (t, cam, o = {}) => PARK25(t, o, cam);
// a cream book strip of several sentences, one sentence a line, the words appearing as Heart reads them
const strip3 = (t, id, y, keys) => { const ws = TL.lines[id].words.map((w) => w.w), cuts = [0]; ws.forEach((w, i) => { if (i > 0 && /[.!?]$/.test(ws[i - 1])) cuts.push(i); }); cuts.push(ws.length);
  let s = ""; for (let j = 0; j < cuts.length - 1; j++) s += bookCaption(t, id, ws.slice(cuts[j], cuts[j + 1]).join(" "), y + j * 64, { size: 30, off: cuts[j], keys }); return s; };
const MO = [720, 1076, 460], BA = [1180, 1076, 470], PI = [1620, 1070, 440];
const camRoom = camOn([960, 640], 1.0, 960, 560), camStall = camOn([320, 760], 1.35, 620, 560);
const pill2 = (t, t0, t1) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), lowerPill(60, 96, "A park in Singapore ·", "Family Day, Sunday morning"));

/* 1 · "Last time...": three pictures from Part 1, one at a time, centred and large, a gentle push-in, one label each */
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["The fridge door: a magnetic strip", "A whiteboard: a steel sheet", "Aluminium: not magnetic"], u = t - tb[i], z = 1 + .05 * eio(u / 4), k = ramp(t, tb[i], .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, TF(960, 520, z, `<g filter="url(#drop)"><rect x="-534" y="-314" width="1068" height="628" rx="40" fill="#FFF8EA"/></g><clipPath id="rcP"><rect x="-520" y="-300" width="1040" height="600" rx="30"/></clipPath><g clip-path="url(#rcP)">${recapP2_25(i, t)}</g>`))
    + OP(k, TF(960, 930, spring(t, tb[i] + .1, .4), tpill(0, 0, labs[i], 46, P.sun, P.ink, { w: 700 }))) + HUD(t); };
/* 2 · Family Day at the park: the camera glides in to the fishing stall; Momo points at the rod (rod); then on to the reeds (the game) */
const camReed = camOn([STRAT.intro[0], STRAT.intro[1] - 10], 1.6, 760, 480);
const camPark = (t) => { const s = SCN.park, a = eio((t - s.t0) / 1.6), c = eio((t - (s.t1 - 1.2)) / 1.2); return c > 0 ? camMix(camStall, camReed, c) : camMix(camRoom, camStall, a); };
SC.park = (t, s) => park(t, camPark(t), {}) + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .9, out: s.t1 - .6, ...watchO(BA[0], 320) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + 1.0, out: s.t1 - .5, ...watchO(PI[0], 320) })
  + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .3, out: s.t1 - .4, poses: [[s.t0, "sit"], [MK("rod") - .1, "pointing"], [MK("rod") + 1.8, "sit"]] }) + pill2(t, s.t0, s.t1 + 1.4) + HUD(t);
SC.game = (t, s) => { const cE = camPark(SCN.park.t1), p = STRAT.intro;
  return gameScene(t, s, ["n202", HAS("n203b") ? "n203b" : "n202", "n204"], false, { world: (tt) => park(tt, cE, {}), A: camPt(cE, [p[0], p[1] - 4]), T: [680, 440], Z: 2.6, dim0: 0, finder: "basil",
    poses: { momo: [[W("n202", "strider") + .1, "surprised"], [W("n202", "strider") + 1.8, "sit"]], pip: [[LT("n204") - .1, "waving"], [LT("n204") + 1.0, "sit"]] } }) + pill2(t, SCN.park.t0, s.t0 + .9) + smallPrint(t, LT("n204"), LOOK_RULE); };
SC.goals = (t, s) => goals3(t, s, [["Cranes and trains", ""], ["Magnets in hospitals", ""], ["Design a magnet toy", ""]], ["n301m", "n302m", "n303m", "n304m"], "momo");
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
/* 4 · Round 1: the aluminium clips (THREE big numbered picture cards; the ring: the rod's magnet over fish with silver aluminium clips).
   Basil leads (worried). Picks Basil 1, Pip 2, Momo 2 */
const R1 = ["Caught as before", "No fish can be caught", "Pushed away"], L1 = "n401";
SC.r1 = (t, s) => lockN(t, { t0: LT(L1) - .1, cards: R1, clues: [["a magnet on the rod", W(L1, "aluminium") - .6], ["aluminium clips", W(L1, "aluminium")], ["What happens?", W(L1, "what")]], csize: 30, lead: "basil", q: "What happens now?", tq: W(L1, "what") - .1,
  tc: [W(L1, "one"), W(L1, "two"), W(L1, "three")], ring0: MK("ring0_r1"), dur: 5, lock: "n402", pics: [0, 1, 2].map((i) => cardP2_25(i, t)), obj: ringP2_25,
  react: [[LE("n405m") + .1, "momo", "pointing"]],
  picks: [{ who: "basil", id: "n403b", word: "1" }, { who: "pip", id: "n404p", word: "2" }, { who: "momo", id: "n405m", word: "2" }] });
/* 5 · the answer is two: the rod lowers over the aluminium-clip fish: nothing moves (no pull, no push) (still); over a steel-clip fish: it
   lifts (steelfish). YOU +1, BUDDIES +1; Pip and Momo confident, Basil shy */
const camAns = (t) => camMix(camRoom, camStall, eio(clamp((t - MK("still") + .6) / 1.2)));
SC.r1ans = (t, s) => { const tA = MK("ansglow"), cam = camAns(t), lift = t >= MK("steelfish") ? eio(clamp((t - MK("steelfish") - .2) / .8)) : 0;
  const rod = (tt) => { const rx = 330, ry = lerp(700, 640, lift); return `<path d="M${rx} 520 V${n2(ry)}" stroke="#555" stroke-width="3"/>` + TF(rx, ry + 20, .35, bar20(tt, { glint: false })) + (lift > .02 ? fishP(rx + 20, ry + 64, .5, FISHC[1], false) : "") + TF(rx + 140, 560, 1, chip24(t >= MK("steelfish") ? "steel clip: caught!" : "aluminium: nothing moves", t >= MK("steelfish") ? GOODC : "#7E8A96", 22)); };
  return park(t, cam, { front: t >= MK("still") - .4 ? rod(t) : "" }) + `<g filter="url(#drop)"><rect x="30" y="110" width="660" height="200" rx="24" fill="#FFF8EA" opacity=".92"/></g>` + [0, 1, 2].map((i) => TF(140 + i * 205, 205, .42, choiceCard3(i + 1, R1[i], cardP2_25(i, t), { w: 400, h: 330, size: 30, id: "ra" + i, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + tagAt(t, tA + .3, 140, 292, 1, "not this one", 20) + tagAt(t, tA + .4, 550, 292, 1, "not this one", 20) + coin(t, MK("coin1") - .1, 860, 400, "+1", "if you showed two fingers") + coin(t, MK("coin1") + .2, 1640, 200, "+1", "Buddies")
    + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1 }) + (t > s.t0 + .3 ? pickNum("momo", 900, 640, t, s.t0 + .3, "2") : "") + tickChip16(t, tA + .2, 955, 585, .7)
    + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .15 }) + (t > s.t0 + .35 ? pickNum("basil", 1360, 640, t, s.t0 + .35, "1") : "") + xChip16(t, tA + .25, 1415, 585, .7)
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .2, poses: [[s.t0, "sit"], [LE("n502p") + .05, "pointing"], [LE("n502p") + 1.6, "sit"]] }) + (t > s.t0 + .4 ? pickNum("pip", 1790, 640, t, s.t0 + .4, "2") : "") + tickChip16(t, tA + .3, 1845, 585, .7)
    + melt(t, s, "r1", .3) + HUD(t); };

/* 6 · Basil (big at the left, still shy) by the stall's poster "Recycling: where does our scrap go?" (a crane drawing): "Why does a scrapyard
   crane use an electromagnet? Why not a big normal magnet?" */
const poster25 = (t) => `<g transform="translate(1360 560)"><rect x="-150" y="-110" width="300" height="220" rx="12" fill="#FFFDF4" stroke="#8A6A4A" stroke-width="6"/>${T(0, -76, "Recycling: where", 22, P.ink, { w: 700 })}${T(0, -50, "does our scrap go?", 22, P.ink, { w: 700 })}${TF(10, 100, .2, yardCrane23(t, { sw: 0, lift: .8, on: true }))}</g><path d="M1360 670 V1000" stroke="#8A6A4A" stroke-width="10"/>`;
const camQ1 = (t) => camMix(camRoom, camOn([1360, 640], 1.4, 1100, 560), eio(clamp((t - SCN.lc1q.t0) / (SCN.lc1q.t1 - SCN.lc1q.t0))));
SC.lc1q = (t, s) => park(t, camQ1(t), { front: poster25(t) }) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], 1360) }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .15, flip: true, ...watchO(PI[0], 1360) })
  + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .05, ...watchO(BA[0], 1360) }) + HUD(t);
const peek25 = (who, side, t, tin, tout, poses, o = {}) => { if (t < tin - .05 || (tout !== undefined && t > tout + .3)) return ""; const W_ = LCW, x = side === "l" ? W_.x - W_.w / 2 + 200 : W_.x + W_.w / 2 - 200;
  return bd(who, x, W_.y + W_.h / 2 + 470 * .42 + (1 - eo((t - tin) / .45)) * 350, 470, t, { in: tin, out: tout, poses: [[tin, "sit"], ...(poses || [])], peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, achieved: o.achieved, watch: W_.x }); };
SC.lccrane = (t, s) => { window._BUBAT = { '*': [960, 905] }; const cE = camQ1(SCN.lc1q.t1), p = camPt(cE, [1360, 560]), tm = s.t0 + 1.2;
  return lookCloser(t, s, { tz: s.t0, fx: p[0], fy: p[1], art: lcCraneArt, bgc: "#FFF6E6", set: (tt) => park(tt, cE, { front: poster25(tt) }), verdict: ["IT CAN SWITCH OFF", GOODC], tv: MK("v_switch"), peek: false,
    over: (tt) => peek25("basil", "l", tt, tm, undefined, []) + lcPrint(tt, [[s.t0 + 1.4, MK("v_switch") - .4, "Scrapyards are for workers only. We watch from outside."]]) }); };
SC.mark1 = (t, s) => markScene(t, s, { id: "n606", sayId: "n605", who: "momo", n: "1 of 2", tab: "The scrapyard crane", text: TL.lines.n606.text, keys: ["large", "iron", "disc", "powerful", "electromagnet.", "iron", "steel."], size: 48, y: 230, footer: FOOT, poses: [[LE("n606") + .2, "sit"]],
  under: markCrane25(t, 1250, 930, .7 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 7 · Showdown: Momo's toy poster on an easel by the stall (LARGE); the 6 s ring (as EP1-10's Showdowns); only Momo at the side. Then Basil
   reveals line 3; the fix: strike, green rewrite, the toy car rolls away from the magnet behind it (like poles push; the car faces its way) */
const EAS = [700, 1050, .95];
const camShow = (t) => camMix(camRoom, camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), eio(clamp((t - SCN.show.t0) / 1.2)));
const showWorld = (t, cam, o = {}) => park(t, cam, { bug: o.bug, front: toyPoster25(t, EAS[0], EAS[1], EAS[2], { lit: [MK("l1"), MK("l2"), MK("l3")], strike: MKS("strike"), rewrite: MKS("rewrite") }) + (o.car || "") });
SC.show = (t, s) => { window._BUBAT = { basil: [1150, 175], momo: [1150, 175], pip: [1250, 300] }; const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("n703") - .08, inT = t >= r0 && t < bell, R = [1440, 430], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3, tB = LT("n704b");
  return showWorld(t, camShow(t), { bug: t < r0 - 1 || t > bell + 1 ? STRAT.show : false }) + OP(st, bg("stage"))
    + (st > .01 ? OP(st, TF(680, 1100, .82, toyPoster25(t, 0, 0, 1, { lit: [0, 0, 0] })) + TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/><clipPath id="shC"><circle cx="${R[0]}" cy="${R[1]}" r="${RR - 30}"/></clipPath><g clip-path="url(#shC)"><g transform="translate(${R[0]} ${R[1]}) scale(.8) translate(-430 -440)">${ringShow25(t)}</g></g>` })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 48, P.ink, "#fff", { w: 700 })) + TF(R[0] + 260, 640 + bob * .3, .7, `<g filter="url(#dropS)">${countHand(nf)}</g>`)) : "")
    + bd("momo", 230, 1076, 480, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "sit"], [LT("n702m") - .3, "pointing"], [LE("n702m") + .1, "sit"], [r0 - .3, "thinking"], [bell + .35, "sit"]], jump: [[bell + .02, 26]] })
    + bd("pip", 1360, 1020, 380, t, { in: bell + 1.1, flip: true, poses: [[bell + 1.1, "sit"]] }) + (t > bell + 1.3 ? pickNum("pip", 1240, 700, t, tB - .1, "3") : "")
    + bd("basil", 1720, 1076, 470, t, { in: bell + 1.0, flip: true, poses: [[bell + 1.0, "sit"]] }) + (t > bell + 1.2 ? pickNum("basil", 1580, 640, t, tB - .1, "3") : "")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + melt(t, s, "showcard", .3) + HUD(t); };
SC.showcard = (t, s) => roundCard(t, s, "SHOWDOWN", "DOUBLE POINTS", P.sun);
SC.fix = (t, s) => { window._BUBAT = { basil: [1250, 250], '*': [1250, 250] }; const cam = camMix(camOn([EAS[0], EAS[1] - 330], 1.35, 760, 560), camOn([960, 600], 1.06, 960, 580), eio(clamp((t - MK("coin2") + .4) / 1.2)));
  const rl = MKS("roll") !== undefined && t >= MK("roll") ? eio(clamp((t - MK("roll")) / 1.6)) : 0, car = TF(1080 + 260 * rl, 1000, .55, toyCar25(t, { roll: rl * 1.5 })) + TF(860, 966, .3, bar20(t, { glint: false, flip: true })) + (rl > .05 && rl < .95 ? fatArrow(1100 + 260 * rl, 940, 1180 + 260 * rl, 940, "#D84A3A", 8) : "");
  return showWorld(t, cam, { car }) + bd("momo", 230, 1076, 480, t, { in: s.t0 + .1 }) + bd("pip", 1360, 1020, 380, t, { in: s.t0 + .15, flip: true }) + bd("basil", 1720, 1076, 470, t, { in: s.t0 + .1, flip: true })
    + coin(t, MK("coin2") - .1, 1700, 470, "+2", "Showdown: double points") + smallPrint(t, s.t0 + .3, "Keep small magnets away from your mouth and from little brothers and sisters.") + HUD(t); };

/* 8 · Be a floating train! A glide into Pip's tablet screen (the video from Part 1); the buddies wave the viewer off, then shrink */
const camWait = (t) => { const s = SCN.waitw, u = eio((t - s.t0) / (s.t1 - s.t0)); return camMix(camRoom, camOn([1500, 700], 4.0, 960, 560), u * u); };
SC.waitw = (t, s) => { const L = "n801", tP = W(L, "be") - .15, sh = W(L, "shrink") - .1;
  const buds = ["momo", "basil", "pip"].map((w, i) => { const X = [MO, BA, PI][i]; return bd(w, X[0], X[1], X[2], t, { in: s.t0 + .1 + .05 * i, out: sh + .2 * i + .3, flip: X[0] > 960, poses: [[s.t0, "sit"], [tP + .2 + .15 * i, "waving"]], wave: true }); }).join("");
  return park(t, camWait(t), { front: TF(1500, 700, .5, tablet25(t, 1)) }) + OP(1 - ss(s.t1 - 1.0, s.t1 - .5, t), buds + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a floating train!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, "#BFE6FF", 960, 600); };
const riders25 = (t, s, o) => { let out = ""; for (const who of ["momo", "pip", "basil"]) { const [x, y] = o.at[who]; out += buddy(who, x, y, o.h || 200, t, { in: o.tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), ...watchO(x, o.look || 960) }); } return out; };
SC.shrink = (t, s) => { const m = MK, rp = { momo: [[m("jfast") + .2, "surprised"], [m("jfast") + 2.0, "sit"]], basil: glanceWave(m("jtrack") + 2.0) };
  return trainJourney(t, s) + riders25(t, s, { tin: m("jtrack") + .6, h: 170, at: { pip: [340, 990], basil: [1580, 990], momo: [560, 990] }, poses: rp, look: 960 })
    + youTag(t, MK("jtrack"), "You: a floating train") + feelTag(t, MK("jfloat"), MK("jpush") - .2, "up you float", 160) + feelTag(t, MK("jfast"), s.t1, "smooth and fast!", 160); };
SC.pullout = (t, s) => { const u = 1 - eo((t - s.t0) / .6);
  return park(t, camMix(camRoom, camOn([1500, 700], 4, 960, 560), u), {}) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .2 }) + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .25 }) + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .3 }) + wipe(t, s.t0, "#FFFFFF") + HUD(t); };

/* 9 · Pip (holding his tablet): "So magnets can push a whole train up?" */
SC.lc2q = (t, s) => { const [px, py] = pawPt("pip", PI[0], PI[1], PI[2], false);
  return park(t, camRoom, {}) + bd("momo", MO[0], MO[1], MO[2], t, { in: s.t0 + .1, ...watchO(MO[0], px) }) + bd("basil", BA[0], BA[1], BA[2], t, { in: s.t0 + .15, ...watchO(BA[0], px) })
    + bd("pip", PI[0], PI[1], PI[2], t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE("n901p") + .05, "thinking"]] }) + TF(px - 60, py - 150, .8, tablet25(t, 1)) + HUD(t); };
SC.lctrain = (t, s) => { window._BUBAT = { '*': [960, 905] }; const [px, py] = pawPt("pip", PI[0], PI[1], PI[2], false);
  return lookCloser(t, s, { tz: s.t0, fx: px - 60, fy: py - 150, art: lcTrainArt, bgc: "#E8F4FB", set: (tt) => park(tt, camRoom, {}), verdict: ["MAGNETS LIFT, HOLD, PUSH AND HELP", GOODC], tv: MK("v_help"), peek: false,
    over: (tt) => peek25("pip", "l", tt, s.t0 + 1.2, MK("mri") + .2, [[LE("n903p") + .1, "cheer"], [LE("n903p") + 2.2, "sit"]], { achieved: true }) + peek25("momo", "r", tt, MK("mri") + .4, undefined, [[LE("n906m") + .1, "cheer"], [LE("n906m") + 2.2, "sit"]], { achieved: true })
      + (tt >= MK("strip") - .1 && tt < LE("n905s") + 1.4 ? OP(1 - ramp(tt, LE("n905s") + 1.0, .3), bookCaption(tt, "n905s", TL.lines.n905s.text, 206, { size: 36, keys: ["safe", "painless"] })) : "") }); };
SC.mark2 = (t, s) => markScene(t, s, { id: "n908", sayId: "n907", who: "pip", n: "2 of 2", tab: "The floating train", text: TL.lines.n908.text, keys: ["magnets", "train", "tracks", "repel"], size: 60, y: 250, footer: FOOT, poses: [[LE("n908") + .2, "sit"]],
  under: markTrain25(t, 1250, 930, .66 * spring(t, s.t0 + .4, .5)), extra: bd("basil", 1790, 1076, 300, t, { in: s.t0 + .3, flip: true }) });

/* 10 · interacting: three pictures (attract · repel · a magnetic object) and the cream strip 7.14 (Heart); Basil teaches INTERACTING */
SC.interact = (t, s) => { const L = "n1001s", k = spring(t, s.t0 + .2, .5);
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 120, "Magnets interact", 60, "#fff", { w: 700 })) + TF(960, 400, 1.0 * k, interPics25(t, 1))
    + [W(L, "attract"), W(L, "repel"), W(L, "objects")].map((tt, i) => t >= tt - .1 && t < tt + 1.4 ? TF(-560 + 960 + i * 560, 400, 1, `<rect x="-235" y="-160" width="470" height="320" rx="30" fill="none" stroke="${P.sun}" stroke-width="10" opacity="${n2(1 - ramp(t, tt + 1.0, .3))}"/>`) : "").join("")
    + strip3(t, L, 700, ["attract", "repel", "interacting"])
    + bd("basil", 1750, 1076, 400, t, { in: s.t0 + .3, flip: true, poses: [[s.t0, "sit"], [LE("n1002b") + .05, "cheer"]], achieved: true }) + HUD(t); };
/* 11 · the chant */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 38, x: 620, y0: 250, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1240, ty: 600, sayX: 640, sayY: 620, board: (tt, flash) => chantBoard25(tt, flash) });
/* 12 · score hand, the water strider (ONE push-in onto the strider by the stepping stone: the REVEAL spot); Basil's fun fact */
SC.final = (t, s) => { const L = "n1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "two") - .1, null, 2], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "n1202", tq = W(L, "it") - .1, c = STRAT.liz, tc = W(L, "strider");
  return lizReveal(t, s, L, park(t, W0, { bug: c }), c[0], c[1] - 6, tq, "It was by the stepping stone!", -120, 160, 80, 2.8, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 1000, qy: 724, tx: 960, ty: 985, tell: "n1204",
    fact: { id: "n1203b", at: [1250, 400], w: 760, h: 440, items: [["ff_stand", "it stands on water", ffStand25], ["ff_hairs", "tiny hairs keep it dry", ffHairs25]], cols: ["#2F6FD6", "#2FA35A"], sx: 1300, sy: 860, poses: [[MK("ff_in") - .4, "surprised"], [MK("ff_in") + .3, "sit"]] } })
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + .6, poses: [[s.t0 + .6, "sit"], [tc + .4, "pointing"], [LT("n1203b") - .3, "sit"]] })
    + bd("pip", 390, 1076, 330, t, { in: s.t0 + .7, poses: [[s.t0 + .7, "sit"], [MK("ff_hairs") + .2, "surprised"], [MK("ff_hairs") + 1.6, "sit"]] }) + smallPrint(t, s.t0 + .5, LOOK_RULE); };
/* 13 · THE P3 GOODBYE: the two hunt cards join into one big map MAGNETS EVERYWHERE! (the eight finds); the takeaway 7.13 on a cream strip;
   the series' P3 topics as small round badges (living things, materials, life cycles, magnets); the buddies together by the pond, happy
   (smiles; Momo waves once at the end: goodbye). No dare, no promised next topic */
const BADGES = [["living things", "🌱"], ["materials", "🧱"], ["life cycles", "🦋"], ["magnets", "🧲"]];
SC.bye = (t, s) => { const tm = MK("map"), tb = MK("badges"), tth = MK("thanks");
  return `<g filter="url(#b10)">${park(t, camRoom, { bug: false })}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".35"/>` + TF(960, 420, .8, mapEverywhere25(t, tm + .2))
    + bookCaption(t, "n1301s", TL.lines.n1301s.text, 770, { size: 36, keys: ["everyday", "life."] })
    + (t >= tb ? BADGES.map(([lab, em], i) => { const tt = tb + .2 + i * .25; if (t < tt) return ""; return TF(450 + i * 300, 870, spring(t, tt, .4), `<g filter="url(#dropS)"><rect x="-130" y="-34" width="260" height="68" rx="34" fill="#FFF8EA"/></g>` + T(-88, 13, em, 34, P.ink) + T(22, 11, lab, 28, P.ink, { w: 700 })); }).join("") : "")
    + bd("momo", 170, 1076, 330, t, { in: s.t0 + .3, poses: [[s.t0, "sit"], [LE("n1303p") - .2, "waving"], [LE("n1303p") + 1.2, "sit"]], wave: true })
    + bd("basil", 1620, 1076, 330, t, { in: s.t0 + .4, flip: true, jump: [[tth + .4, 18]] }) + bd("pip", 1810, 1076, 320, t, { in: s.t0 + .5, flip: true, poses: [[s.t0, "sit"], [LT("n1303p") - .2, "pointing"], [LE("n1303p") + .2, "sit"]] }) + HUD(t); };
/* 15 · "Now you know!": the MAGNETS EVERYWHERE! map */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 600, .62, mapEverywhere25(t, -9)), { bx: [230, 1730, 1500], hx: 470 });
})(); }
