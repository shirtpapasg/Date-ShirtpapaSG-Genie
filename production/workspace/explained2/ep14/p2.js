// p2.js: PART 2, "The Boy GREW. The Tree GREW. Why Not the TEDDY BEAR?": cycles in living things, what a life cycle is, why life cycles
// matter. Segments 1-15 of p3_ep14_script.md (version 1, 22 Nov 2026; the teacher's go-ahead and the 22 Nov full-sentence change in section 12).
// STAGE 2 (drawn 2026-11-22, the trial: big buddies standing in the garden, no discs, the buddies teach; every scene in the community garden
// (garden14.js VG) with its life (the hen and chicks, the leaves, a butterfly, clouds); the ladybird hides somewhere new each scene).
// STAGE 1 (setup): the shared routines are wired (the calm three-picture recap with its labels, the game as ONE smooth push-in from the garden
// onto the ladybird (common.js gameScene, EP12 v2), goals read by Basil, round card, the lock-in with its four clue labels on top of the ring,
// the answer, the book's strip C0.2, the board CYCLE CHECK as a functional placeholder (the chicken's three tiles, the last arrow back to the
// egg, two ticks, A CYCLE, A LIFE CYCLE; two closed rings side by side for the chant and the ending), Mark Sentences read by Basil / Momo (the
// tag ensure = make sure), the Showdown's ring, stamp and picks with Pip's notes as a functional placeholder (lines light as he reads; line 2
// struck through and rewritten in green), chant, score hand, the ladybird's smooth reveal, the EP15 dare cards and banner, read-along, "Now you
// know!"); every scene with new art is a phScene placeholder (and each [LOOK CLOSER] an lcPH placeholder inside the real frame). STAGE 2
// (Fable) draws them: see SCENES_TODO.md (what each buddy does, how the camera moves, the small life in the background and the light).
if (PART === 2) { (() => {
const L1 = "j401";
// the scores (script section 3): Round 1 1 : 1, Showdown 3 : 1
SCORE.push([MK("coin1") - .1, 1, 1]);
SCORE.push([W("j906", "two") - .1, 3, 1]);
const FOOT = "P3 · Cycles · Life cycles of plants and animals";
const stageNote = (txt, y = 1000) => T(960, y, "(Stage 2: " + txt + ")", 24, "#fff", { w: 500 });
const qMark = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const henRule = (t, t0 = -9, t1) => t1 !== undefined ? OP(1 - ramp(t, t1, .3), smallPrint(t, t0, HEN_RULE)) : smallPrint(t, t0, HEN_RULE);   // "We look. We do not chase or touch the chickens." whenever the chickens are in the picture
const card = (x, y, txt, k = 1) => TF(x, y, k, `<g filter="url(#drop)"><rect x="-140" y="-120" width="280" height="240" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g>` + T(0, 12, txt, 34, P.ink));

/* 1 · "Last time...": three calm pictures from Part 1, one at a time, each >= 2.5 s, centred and large, a gentle push-in, one label each
   (switch on "and" and "But": pic2, pic3). ROTATION, CYCLE and REPEATED PATTERN are NOT put on Part 2's shelf: it holds only this part's words. */
const globePic = (t) => `<g filter="url(#drop)"><rect x="-560" y="-330" width="1120" height="620" rx="36" fill="#141B48"/></g>` + [...Array(18)].map((_, i) => `<circle cx="${n2((hash(i, 3) - .5) * 1060)}" cy="${n2((hash(i, 5) - .5) * 560)}" r="${n2(2 + 2 * hash(i, 7))}" fill="#fff" opacity=".7"/>`).join("")
  + `<path d="M-300 -30 L120 -230 L120 230 L-300 30z" fill="#FFF3B8" opacity=".28"/>` + TF(-380, 40, 1.5, torch14(1)) + TF(200, 0, 1, globe14(210, SGLL[0] + 10 - t * 6, { lit: 1, dot: true, id: "rcg", dotR: 14 }))
  + T(-380, 200, "the torch: our Sun", 34, "#fff", { w: 600 }) + T(200, 270, "the globe: our Earth", 34, "#fff", { w: 600 });
SC.lasttime = (t, s) => { const tb = [s.t0, MK("pic2") - .2, MK("pic3") - .2], i = t >= tb[2] ? 2 : t >= tb[1] ? 1 : 0, labs = ["Day and night: a cycle", "It repeats because the Earth turns", "Do living things have cycles too?"];
  const z = 1 + .05 * eio((t - tb[i]) / 4), k = ramp(t, tb[i] + .05, .5);
  const pic = i === 0 ? TF(960, 900, .82, cycleBoard(t, { show: "daynight" })) : i === 2 ? ["hen", "chick", "teddy"].map((c, j) => TF(600 + j * 360, 560, 1.15 * spring(t, tb[2] + .1 + j * .15, .45), picCard14(c, t))).join("") + qMark(t, tb[2] + .5, 960, 250)
    : TF(960, 520, 1, globePic(t));
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "Last time…", 60, "#fff", { w: 600 }))
    + OP(k, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${pic}</g>` + TF(960, 975, spring(t, tb[i] + .3, .4), tpill(0, 0, labs[i], 46, "#fff", P.ink, { w: 700 }))) + HUD(t); };

/* the garden (garden14.js VG) in the light of its moment; the buddies stand on the path and the lawn; G = VG + an optional camera; the
   ladybird's spot for each scene (teacher, 22 Nov: it hides somewhere new each time; never in a look-closer) */
const LB = { place: [168, 650, 0], thenans: [820, 702, 0], strip: [1226, 530, -90], waitw: [1645, 690, 30], pullout: [1645, 690, 30], ring: [1226, 476, -90], show: [1092, 922, 0], fix: [1092, 922, 0], dare: [1655, 318, 60], chant: [168, 650, 0] };
const G = (t, o = {}, cam) => VG(t, { lady: o.lady !== undefined ? o.lady : (LB[(window._S || {}).name] ? { at: LB[window._S.name] } : {}), ...o }, cam);
const bp = (who, x, h, t, o = {}) => buddy(who, x, o.y || 1076, h, t, o);

/* 2 · the new place (a wide establishing look, a slow push), the game and the hidden ladybird (ONE smooth push-in from the garden onto the
   ladybird on its leaf, then the iris; common.js gameScene); 3 · goals (Basil reads) */
const placePill = () => lowerPill(60, 96, "A community garden, Singapore ·", "morning");
SC.place = (t, s) => G(t, {}, [1 + .04 * eio((t - s.t0) / 2.5), 1200, 600]) + OP(ramp(t, s.t0 + .3, .4), placePill()) + henRule(t, s.t0 + .3) + HUD(t);
SC.game = (t, s) => gameScene(t, s, ["j201a", "j201b", "j201c"], false, { world: (tt) => VG(tt, { lady: { open: ss(W("j201a", "ladybird") - .1, W("j201a", "ladybird") + .3, tt) * (1 - ss(W("j201a", "ladybird") + 1, W("j201a", "ladybird") + 1.4, tt)) } }, [1.04, 1200, 600]),
  A: LADY, T: [700, 440], Z: 3.4, pre: () => placePill() }) + henRule(t, -9, SCN.game.t0 + 1.0);
SC.goals = (t, s) => goals3(t, s, [["Cycles in living things", ""], ["What a life cycle is", ""], ["Why life cycles matter", ""]], ["j301", "j302", "j303", "j304"], "basil");

/* 4 · Round 1: which ones are bigger today? In the ring: the old photo Tree Planting Day; four clue labels on top of the ring frame, kept through
   the countdown; ONE set of big numbered picture cards (the boy and the tree / all three / only the tree, each with an up arrow) */
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const upA = (x, y, k = 1) => TF(x, y, k, `<path d="M0 40 V-30" stroke="#2FA35A" stroke-width="12" stroke-linecap="round"/><path d="M-22 -10 L0 -36 L22 -10" fill="none" stroke="#2FA35A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`);
const tinyTree = (k = 1) => TF(0, 0, k, `<path d="M0 0 Q-4 -60 2 -120" fill="none" stroke="#8A5E3A" stroke-width="10" stroke-linecap="round"/>` + [[-20, -120], [16, -134], [-2, -96], [22, -104], [-24, -88]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="13" transform="rotate(${-30 + i * 25} ${x} ${y})" fill="${i % 2 ? "#6CC27A" : "#58B56C"}" stroke="#2F8048" stroke-width="3"/>`).join(""));
const cardPic = (i) => { const boy = TF(-70, 80, .5, person14(230)), tree = TF(30, 80, 1, tinyTree(1)), ted = TF(105, 62, .3, teddy());
  return `<rect x="-200" y="-140" width="400" height="280" fill="#DFF3D2"/>` + (i === 0 ? boy + tree + upA(-70, -70, .8) + upA(30, -70, .8) : i === 1 ? boy + tree + ted + upA(-70, -70, .8) + upA(30, -70, .8) + upA(105, -20, .8) : tree + upA(30, -70, .8)); };
SC.r1 = (t, s) => lockN(t, { cards: ["The boy and the tree", "All three", "Only the tree"], clues: [["a boy", W(L1, "today") - .1], ["a young tree", W(L1, "today")], ["a teddy bear", W(L1, "today") + .1], ["long ago", W(L1, "today") + .2]], csize: 34, lead: "momo",
  pics: [0, 1, 2].map(cardPic), q: "Today, which ones are bigger?", tq: W(L1, "today") - .1, tc: [W(L1, "one", 1), W(L1, "two"), W(L1, "three", 1)], ring0: MK("ring0_r1"), dur: 6, lock: "j402",
  obj: (tt) => TF(430, 462, .33, photo14(tt), -2),
  picks: [{ who: "momo", id: "j403", word: "2", x: true }, { who: "basil", id: "j404", word: "1" }, { who: "pip", id: "j405", word: "1" }],
  react: [[LE("j403") + .1, "momo", "cheer"], [LE("j404") + .1, "basil", "cheer"], [LE("j405") + .1, "pip", "pointing"]] });

/* 5 · [LOOK CLOSER] then and now (garden14.js thenArt: THEN the old photo, NOW the same place today; three pairs light, each with its height
   line: it rises, rises steeply, is FLAT; LIVING on the man and the tree, NON-LIVING on the teddy bear; GROW pops). The speaker's face peeks in */
const gardenSoft = (t) => G(t, { lady: false }, [1.1, 960, 700]);
SC.lcthen = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 560, art: thenArt, bgc: "#FFF3DC", verdict: [`LIVING THINGS GROW OVER TIME`, GOODC], tv: MK("v_then"), set: gardenSoft, peekSide: "c", peekH: 430 });
/* the answer is one: the boy and the tree. The THEN / NOW pictures stand on the bench; the three cards above; Momo big at the left (her guess was
   three: surprised, then a good-sport nod); coin */
const photoPair = (t, k = 1) => TF(-150, 0, .3 * k, photo14(t, 0, "pp1"), -3) + TF(150, -6, .3 * k, `<g filter="url(#drop)"><rect x="-394" y="-324" width="788" height="648" rx="26" fill="#fff"/></g>` + scene14(true, t, 0, "pp2"), 2);
SC.thenans = (t, s) => { const tA = MK("ansglow") - .1, u = eio((t - s.t0) / 1.2);
  return G(t, {}, [lerp(1.35, 1.05, u), 900, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".18"/>` + TF(900, 640, spring(t, s.t0 + .1, .5), photoPair(t)) + TF(745, 455, 1, tpill(0, 0, "THEN", 30, P.ink, "#fff", { w: 700 })) + TF(1050, 455, 1, tpill(0, 0, "NOW", 30, P.sun, P.ink, { w: 700 }))
    + ["The boy and the tree", "All three", "Only the tree"].map((c, i) => TF(640 + i * 300, 260, .5 * spring(t, s.t0 + .1 + i * .08, .4), ansCard(i + 1, c, { w: 430, h: 290, size: 48, lit: i === 0 && t >= tA ? spring(t, tA, .45) : 0 }))).join("")
    + coin(t, MK("coin1") - .1, 1200, 520, "+1", "if you showed one finger")
    + bp("momo", 300, 500, t, { in: s.t0 + .1, poses: [[s.t0, "surprised"], [tA + 1, "oops"], [tA + 2.4, "sit"]], jump: [[tA + 1.2, 20]] })
    + bp("basil", 1480, 380, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [tA + .2, "cheer"]] }) + bp("pip", 1760, 350, t, { in: s.t0 + .3, flip: true, poses: [[s.t0, "sit"], [tA + .3, "cheer"]] }) + henRule(t) + HUD(t); };

/* 6 · [LOOK CLOSER] one chick, week after week (garden14.js chickArt: the same chick at weeks 1, 6, 12, 24; the nest; three chicks of its own;
   REPRODUCE pops); then the strip C0.2 over the garden */
SC.lcchick = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 1300, fy: 860, art: chickArt, bgc: "#BFE6F7", verdict: [`IT GROWS · THEN IT HAS YOUNG`, GOODC], tv: MK("v_chick"), set: (tt) => G(tt, {}, [1.05, 1200, 700]), peekSide: "r", peekH: 470,
  over: (tt) => henRule(tt, s.t0 + 1.2) + stepPill(tt, WEEKS, 390, 960) + speeded(tt, MK("wk1") + .5, MK("chicksout") + 1, 1660, 160) });
SC.strip = (t, s) => { const L = "j605", txt = "Cycles in living things happen when living things grow and have young. Their life cycles follow a repeated pattern of change.";
  return G(t, {}, [1.05, 1200, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".35"/>`
    + (HAS(L) ? [txt.split(". ")[0] + ".", txt.split(". ")[1]].map((p, i) => bookCaption(t, L, p, 330 + i * 120, { size: 44, off: i ? txt.split(". ")[0].split(" ").length : 0, keys: ["grow", "have", "young", "repeated", "pattern", "change"] })).join("")
      : OP(ramp(t, s.t0, .3), [txt.split(". ")[0] + ".", txt.split(". ")[1]].map((p, i) => `<g filter="url(#dropS)"><rect x="${n2(960 - tw(p, 46, 700, "Atkinson Hyperlegible") / 2 - 44)}" y="${248 + i * 130}" width="${n2(tw(p, 46, 700, "Atkinson Hyperlegible") + 88)}" height="84" rx="20" fill="url(#gPaper)"/></g>` + T(960, 305 + i * 130, p, 46, P.ink, { fam: "Atkinson Hyperlegible", w: 700 })).join("")))
    + bp("pip", 300, 420, t, { in: s.t0 + .1, poses: [[s.t0, "thinking"], [s.t0 + 1.6, "pointing"]] }) + bp("momo", 1640, 420, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"], [s.t0 + 2, "cheer"]] }) + henRule(t) + HUD(t); };

/* 7 · Be a chick! The buddies wave us off; ONE glide to the nest under the bush and into one egg (a soft cream wipe); the first-person journey
   (garden14.js chickJourney) with the three buddies shrunk down riding along and reacting at each stop; one pull back out */
const camNest = (t, s) => { const d = ei((t - (s.t1 - 1.6)) / 1.6), e = eio((t - s.t0) / 1.2); return [1 + .15 * e + 6 * d, lerp(1000, NESTW[0], Math.max(e * .4, d)), lerp(600, NESTW[1], Math.max(e * .4, d))]; };
SC.waitw = (t, s) => { const L = "j701", tP = LT(L) - .1, dive = ei((t - (s.t1 - 1.4)) / 1.4);
  return G(t, { nest: { n: 4 } }, camNest(t, s)) + OP(1 - dive * 1.7, bp("pip", 260, 360, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [tP + .2, "waving"]], wave: true }) + bp("momo", 620, 340, t, { in: s.t0 + .15, poses: [[s.t0, "cheer"], [tP + .5, "waving"]], wave: true })
    + bp("basil", 1740, 380, t, { in: s.t0 + .1, flip: true, poses: [[s.t0, "sit"], [tP + .35, "cheer"]], wave: true })
    + (t >= tP ? TF(960, 250, spring(t, tP, .45), tpill(0, 0, "Be a chick!", 76, P.sun, P.ink, { w: 700 })) : "") + HUD(t)) + wipe(t, s.t1, CREAM14, 960, 540); };
const wingTips = (t, t0, t1) => { const a = ramp(t, t0, .5) * (1 - ramp(t, t1, .4)); if (a < .02) return ""; const fl = 6 * Math.sin(t * 7);
  return OP(a, [-1, 1].map((sd) => `<g transform="translate(${960 + sd * 360} ${n2(1120 - 10 * Math.abs(Math.sin(t * 3)))}) scale(${sd * 1.2} 1.2) rotate(${n2(-14 + fl)})"><path d="M-60 0 Q-96 -110 -40 -176 Q-6 -210 30 -186 Q22 -160 48 -150 Q40 -122 66 -112 Q58 -84 82 -72 Q90 -30 70 0z" fill="#FBDC70" stroke="#C99A3A" stroke-width="6" stroke-linejoin="round"/><path d="M-30 -40 Q-36 -110 -6 -150 M4 -30 Q4 -90 30 -118 M30 -24 Q36 -62 58 -80" stroke="#E8B54A" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-30" cy="-120" rx="14" ry="26" fill="#fff" opacity=".35" transform="rotate(20 -30 -120)"/></g>`).join("") + youPill(960, 1010 - 6 * Math.abs(Math.sin(t * 3)), 1.3)); };
SC.shrink = (t, s) => { const e = (S2) => MK(S2), rp = (w, extra) => [[e("jcrack"), "surprised"], [e("jout") + .2, "cheer"], [e("jrise") + .3, w === "basil" ? "pointing" : "thinking"], [e("jnest") + .2, "sit"], [e("jnew") + .1, "cheer"], ...(extra || [])];
  return chickJourney(t, s) + wingTips(t, e("jout") - .2, e("jadult")) + riders(t, s, { tin: e("jegg") - .4, h: 170, at: { pip: [200, 1044], basil: [1720, 1050], momo: [380, 1040] }, poses: { pip: rp("pip"), basil: rp("basil"), momo: rp("momo") }, jolts: [e("jcrack"), e("jnew")] })
    + feelTag(t, e("jegg") + .3, e("jhatch") - .1, "You: a chick · inside an egg", 160) + feelTag(t, e("jout"), e("jgrow") - .1, "you hatch", 160) + feelTag(t, e("jrise"), e("jadult") - .1, "you grow", 160)
    + feelTag(t, e("jlay") - .1, e("jagain") - .1, "an adult chicken · an egg", 160) + feelTag(t, e("jnew"), e("jnew") + 2.4, "a new chick · again", 160); };
SC.pullout = (t, s) => { const u = eo((t - s.t0) / .6); return G(t, { nest: { n: 4 } }, [lerp(4, 1.05, u), NESTW[0], NESTW[1]]) + bp("pip", 260, 360, t, { in: s.t0 + .2, poses: [[s.t0 + .2, "cheer"]] }) + bp("basil", 1740, 380, t, { in: s.t0 + .25, flip: true, poses: [[s.t0 + .25, "cheer"]] }) + wipe(t, s.t0, CREAM14) + HUD(t); };

/* 8 · the ring closes on the board CYCLE CHECK at its home by the bench (tegg, tchick, tadult, tback, two ticks, A CYCLE + A LIFE CYCLE);
   LIFE CYCLE pops. Pip big at the left reads the ring; Momo and Basil at the right; the hen and her chicks behind */
const boardHome = (t, o = {}) => TF(1150, 1070, .8, cycleBoard(t, o));
SC.ring = (t, s) => G(t, {}, [1 + .04 * eio((t - s.t0) / 8), 1150, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".12"/>` + boardHome(t)
  + bp("pip", 300, 500, t, { in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("tback"), "surprised"], [LE("j801p") + .2, "pointing"], [MK("tagcycle"), "cheer"]] }) + bp("momo", 1580, 340, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [MK("tagcycle"), "cheer"]] })
  + bp("basil", 1800, 360, t, { flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [MK("tagcycle"), "cheer"]], jump: [[MK("tagcycle"), 30]] }) + say("j801p", 620, 300, t, { size: 40, tail: -200, maxW: 600 }) + henRule(t) + HUD(t);
/* Mark Sentence 1 (Basil): 4.2; under the card: the ring with its three tiles, the arrows going round */
SC.mark1 = (t, s) => markScene(t, s, { id: "j803", sayId: "j802", who: "basil", n: "1 of 2", text: "A life cycle is a repeated pattern of change as a living thing grows over time and reproduces.", keys: ["repeated", "pattern", "change", "grows", "over", "time", "reproduces"], size: 62, y: 240, footer: FOOT,
  under: TF(1180, 1060, .32, cycleBoard(t, { small: true })) });

/* 9 · Showdown: Pip's notes (double points). Pip's easel MY NOTES at its home in the garden; Pip big at the left reads it; for the countdown the
   garden gives way to the blue game stage: the easel (the question) stays, the ring is big at the right with the counting YOU hand, Pip fidgets;
   then Basil and Momo pop in for their picks */
const EAS = [880, 980, .78];
window.SHELF_AWAY = (t) => { const a = MK("ring0_show") - .6, b = MK("bell_show") + .5; return ss(a, a + .35, t) * (1 - ss(b, b + .35, t)); };
const noteLit = (t) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), L = "j902", ks = ["l1", "l2", "l3"], has = ks.map((k) => TL.marks[k] !== undefined), ends = [MKS("l2"), MKS("l3") < 1e8 ? MKS("l3") : LE(L) + .2, LE(L) + .2];
  return [0, 1, 2].map((i) => { if (has[i] && t >= MK(ks[i]) - .1 && t < ends[i]) return 1; if (!has[i] && t >= LT(L) && t < bell) return .45; return t >= r0 && t < bell ? .45 : 0; }); };
SC.show = (t, s) => { const r0 = MK("ring0_show"), bell = MK("bell_show"), rs = ringState(t, r0, 6), tS = LT("j903") - .08, inT = t >= r0 && t < bell, R = [1520, 420], RR = 200;
  const st = ss(r0 - .6, r0 - .1, t) * (1 - ss(bell + .6, bell + 1.1, t)), bob = inT ? 16 * Math.sin((t - r0) * Math.PI * 2) : 0, nf = inT ? (Math.floor(t - r0) % 3) + 1 : 3;
  const picks = [["basil", "j904", "2", 1420], ["momo", "j905", "2", 1760]];
  return G(t, { hens: true }, [1 + .03 * eio((t - s.t0) / 10), 900, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + OP(st, bg("stage"))
    + TF(EAS[0], EAS[1], EAS[2], notesEasel(t, { lit: noteLit(t) }))
    + (t >= r0 - .6 ? OP(st, TF(R[0], R[1], spring(t, r0 - .6, .45) * (1 + .035 * (inT ? rs.tick : 0)), `<g transform="translate(${-R[0]} ${-R[1]})">${ringTimer(R[0], R[1], t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? 6 : t < bell ? rs.secs : 0, t, { R: RR, sw: 32, tick: rs.tick, shut: pulse(t, bell, .01, .6), chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
      inner: `<circle cx="${R[0]}" cy="${R[1]}" r="${RR - 24}" fill="#FFF8EA"/>` + TF(R[0], R[1] + 30 + bob * .3, .75, `<g filter="url(#dropS)">${countHand(nf)}</g>`) })}</g>`) + youPill(R[0] - 230, R[1] - 170, 1.1) + TF(R[0], 760, 1, tpill(0, 0, "line 1, 2 or 3?", 40, P.ink, "#fff", { w: 700 }))) : "")
    + bp("pip", 260, 500, t, { in: s.t0 + .1, rock: inT ? 2 : 0, poses: [[s.t0, "pointing"], [LT("j902") - .12, "sit"], [LE("j902") + .2, "thinking"], [bell - 1.6, "oops"], [bell, "surprised"], [LT("j904") - .1, "oops"]], jump: [[bell + .02, 26]] })
    + say("j902", 560, 230, t, { size: 38, tail: -200, maxW: 700 })
    + picks.map(([w, id, n, x]) => bp(w, x, 380, t, { in: bell + .3, flip: true, poses: [[bell + .3, w === "basil" ? "arms_crossed" : "thinking"], [LT(id) - .12, "sit"], [LE(id) + .1, "cheer"]] }) + (t > bell + .5 ? pickNum(w, x - 170, 900, t, LT(id) - .1, n) : "") + say(id, x - 240, 520, t, { size: 38, maxW: 520, tail: 200 })).join("")
    + stamp(t, tS, 960, 460) + bellIcon(t, r0) + HUD(t); };
/* the fix: line 2 struck through once (strike), rewritten under it in green; its drawing bends from a row into a ring (bend); +2; Pip surprised, then cheer */
SC.fix = (t, s) => { const st = ss(MK("strike"), MK("strike") + .4, t), fx = ss(MK("bend"), MK("bend") + .8, t);
  return G(t, {}, [1.03, 900, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>` + TF(EAS[0], EAS[1], EAS[2], notesEasel(t, { strike: st, fix: fx, lit: [0, fx * .6, 0] })) + coin(t, MK("coin2") - .1, 1560, 520, "+2", "line 2")
    + bp("pip", 260, 500, t, { in: s.t0 + .05, poses: [[s.t0, "oops"], [MK("bend"), "surprised"], [MK("bend") + 1.6, "cheer"]] })
    + bp("basil", 1500, 360, t, { flip: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [MK("bend") + .2, "cheer"]] }) + bp("momo", 1780, 350, t, { flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [MK("bend") + .35, "cheer"]] }) + HUD(t); };

/* 10 · [LOOK CLOSER] three chickens together at the water dish (garden14.js hensArt); Mark Sentence 2 (Momo): 4.1, third sentence ("live" =
   "leev"), with the tag ensure = make sure; under the card: the three chickens */
SC.lchens = (t, s) => (window._BUBAT = { '*': [1480, 260] }, "") + lookCloser(t, s, { tz: s.t0, fx: 1010, fy: 930, art: hensArt, bgc: "#CDEBB8", verdict: [`THE SAME KIND, AGAIN AND AGAIN`, GOODC], tv: MK("v_hens"), set: (tt) => G(tt, {}, [1.05, 1000, 800]), peekSide: "r", peekH: 470,
  over: (tt) => finePrint(tt, s.t0 + 1.2, HEN_RULE, 420, 1046) });   // (the small print at the bottom: at the top it hid the label "a grandmother hen")
const threeHens = (t) => [[-170, 3, .5, "#D9C7A8"], [10, 3, .5, null], [170, 0, 1.1, null]].map(([x, age, k, pale], i) => TF(x, 0, k, chicken14(t, { age, act: "peck", ph: i * 1.3, patch: i === 1 }))).join("")
  + T(-170, 50, "grandmother hen", 22, "#fff", { w: 600 }) + T(10, 50, "mother hen", 22, "#fff", { w: 600 }) + T(170, 50, "chick", 22, "#fff", { w: 600 });
SC.mark2 = (t, s) => markScene(t, s, { id: "j1003", sayId: "j1002", who: "momo", n: "2 of 2", text: "Life cycles ensure that living things of the same kind can continue to live on Earth.", keys: ["same", "kind", "continue", "to", "live", "on", "earth"], size: 64, y: 240, footer: FOOT,
  extra: (t >= s.t0 + .6 ? TF(1450, 790, spring(t, s.t0 + .6, .4), tpill(0, 0, "ensure = make sure", 36, "#FFF8EA", P.ink, { w: 700 })) : ""), under: TF(980, 960, spring(t, s.t0 + .5, .5), threeHens(t)) });

/* 11 · the chant: call and response (common.js chantScene); the board CYCLE CHECK with its TWO closed rings at the right, each line's part flashing */
SC.chant = (t, s) => chantScene(t, s, "c1003", { sayId: "u1002", size: 52, x: 620, y0: 260, dy: 110, xs: [230, 560, 890], bh: 360, tx: 1180, ty: 520, sayX: 620, sayY: 600,
  board: (tt, flash) => TF(1460, 1066, .5, cycleBoard(tt, { two: true, flash, small: true })) });

/* 12 · score hand, the ladybird (lizReveal: the score hand melts into the real garden, ONE push-in onto the ladybird, the iris, the ring on its
   name; Pip's fun fact with its pictures: a larva like a tiny crocodile, a pupa, a ladybird) */
SC.final = (t, s) => { const L = "j1201"; return finalScene(t, s, L, 1, [[s.t0, null, 1], [W(L, "three") - .1, null, 3]]); };
SC.liz = (t, s) => { const L = "j1202", tq = W(L, "it") - .1, tR = W(L, HIDDEN[0]) + .1;
  return lizReveal(t, s, L, VG(t, { lady: { open: ss(tR + .3, tR + .6, t) * (1 - ss(tR + 1.8, tR + 2.2, t)) } }), LADY[0], LADY[1], tq, "It was on a leaf of the young tree!", 0, 170, 76, 3.4, { from: () => SC.final(SCN.final.t1 - .04, SCN.final), qx: 560, qy: 770, tx: 560, ty: 900, tell: "j1204",
    fact: { id: "j1203", w: 820, items: [["ff_larva", "larva", ffLarva], ["ff_pupa", "pupa", ffPupa], [W("j1203", "ladybird"), "ladybird", ffLady]], cols: ["#3B3550", "#C9741E", "#D8352A"] } }); };

/* 13 · the dare for Episode 15: a mango, one big seed. ONE set of three big numbered picture boards (garden14.js PIC.mangoA / B / C), the ?,
   the banner; Basil big at the left (a juicy squish on "mango", he rubs his tummy), Pip and Momo at the right */
const DRX = [640, 990, 1340];
SC.dare = (t, s) => { const a = "j1301", tQ = W(a, "what") - .15, tc = [W(a, "one") - .1, W(a, "two") - .1, W(a, "three") - .1], tL = W(a, "lock") - .1, tM = W(a, "mango") - .1;
  return G(t, {}, [1.04, 1080, 700]) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".3"/>`
    + ["mangoA", "mangoB", "mangoC"].map((nm, i) => { const t0 = MK("dareIn") + .5 + i * .25, pl = Math.max(pulse(t, tc[i], .04, .6), t >= tL ? (Math.floor((t - tL) / .5) % 3 === i ? .8 : 0) : 0); if (t < t0) return ""; const [x, d] = slideX(t, t0, .6, 2400, DRX[i], 860);
      return d + TF(x, 640, .9 * (1 + .05 * pl), picBoard(nm, 0, 0, 1, { sc: 1.0, lab: NEXT_CARDS[i].toLowerCase(), size: 34, id: "dr" + i, t })) + numBadge(t, tc[i] - .05, x - 135, 514, i + 1, .9); }).join("")
    + TF(1080, 150, spring(t, s.t0 + .2, .45), tpill(0, 0, "NEXT · What will the seed grow into first?", 46, P.ink, P.sun, { w: 700 }))
    + qMark(t, tQ, 990, 330, 44) + (t >= tL ? TF(990, 990, spring(t, tL, .45), tpill(0, 0, "Lock in your answer!", 44, P.sun, P.ink, { w: 700 })) : "")
    + bp("basil", 260, 500, t, { in: s.t0 + .1, poses: [[s.t0, "cheer"], [tM + .3, "sit"], [tL, "cheer"]], jump: [[tM + .1, 22]], nohop: true })
    + bp("momo", 1575, 330, t, { flip: true, in: s.t0 + .2, poses: [[s.t0, "thinking"], [tM + .3, "surprised"], [tc[1] + .3, "pointing"], [tL + .2, "cheer"]], jump: [[tM + .15, 20]] })
    + bp("pip", 1800, 320, t, { flip: true, in: s.t0 + .3, poses: [[s.t0, "thinking"], [tc[2] + .3, "pointing"]] }) + HUD(t); };

/* 15 · "Now you know!": the board CYCLE CHECK with its two closed rings, their arrows going round, centred between the buddies */
SC.nyk = (t, s) => nykScene(t, s, TF(860, 1040, .5, cycleBoard(t, { two: true })), { bx: [220, 1720, 1400], hx: 470 });
})(); }
