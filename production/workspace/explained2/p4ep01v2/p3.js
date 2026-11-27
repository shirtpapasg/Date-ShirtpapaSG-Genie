// p3.js: P4 EP1 v2, the second half: LOOK CLOSER at Uncle Lim's "useless" bike (FUNCTION), BE THE THING (a link of his chain), the five
// pictures (INTERACT) and the Gruffalo turn, THE REVERSAL (brakes, chain + the think question, bell + Heart's hint #2), SYSTEM (finishing
// each other's sentence; the battle cry turned round), the victory lap, the body and the rain tree, the words that earn marks, the cosy end
// (the snail, the crown, the high-five that lands), the read-along, "Now you know!" (Chilli hops in, wordless), the blooper.

/* ================================================================ LCBIKE · LOOK CLOSER at Uncle Lim's bike ================================================================ */
// one cream panel over the softly blurred void deck; Uncle Lim's whole roadster BIG (drive side to camera, front at the right) with Uncle Lim
// standing beside it holding it upright, sipping; each named part glows and is joined by a colour-coded line to its label; the magnifier on
// the chain where a tooth sits in a gap; Pip big at the right (he explains: he picked right); Momo small at the left with her magnifier;
// Basil's face peeks in at the panel's lower-left corner, shy (his fix 1 is being corrected)
const PNL2 = { x: 330, y: 170, w: 1200, h: 760 };
const panelV2 = (k) => OP(k, `<g filter="url(#drop)"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40" fill="#FFF8EA"/></g>`);
const LCR = [960, 860], LCK = .74, LPT = (p) => [LCR[0] + LCK * p[0], LCR[1] + LCK * p[1]];
const magTooth2 = (t, th) => { const dx = -55 * th; let s = `<rect x="-160" y="-160" width="320" height="320" fill="#FFF3DC"/>`;
  s += `<path d="M-170 160 L-170 54 Q0 40 170 54 L170 160z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="5"/>`;
  for (let i = -3; i <= 3; i++) { const x = i * 110 + dx; s += `<path d="M${n2(x - 34)} 52 L${n2(x - 15)} -62 L${n2(x + 15)} -62 L${n2(x + 34)} 52z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="5"/>`; }
  for (let i = -3; i <= 2; i++) { const x = i * 110 + 55 + dx; s += `<rect x="${n2(x - 30)}" y="-14" width="170" height="58" rx="29" fill="none" stroke="#3B4149" stroke-width="7"/>`; }
  for (let i = -3; i <= 3; i++) { const x = i * 110 + 55 + dx; s += `<circle cx="${n2(x)}" cy="15" r="27" fill="#AEB6C0" stroke="#22262C" stroke-width="5"/>`; }
  return s; };
const x2inset = (t, t0, t1, x, y, title, pic, col) => { if (t < t0 - .05 || t > t1 + .35) return ""; const k = spring(t, t0, .45) * (1 - ramp(t, t1, .3));
  return TF(x, y, k, `<g filter="url(#dropS)"><rect x="-150" y="-110" width="300" height="220" rx="22" fill="#fff" stroke="${col}" stroke-width="7"/></g><clipPath id="ins${Math.round(x)}"><rect x="-140" y="-100" width="280" height="160" rx="16"/></clipPath><g clip-path="url(#ins${Math.round(x)})">${pic}</g>` + T(0, 92, title, 26, P.ink, { w: 700 })); };
SC.lcbike = (t, s) => { const k = ramp(t, s.t0, .45), tB = MK("lbell"), tK = MK("lbrk"), tC = MK("lchain"), tV = MK("v_chain"), tF = MK("kw_function"), tS = MK("scale"), tM = MK("miss2");
  // the camera pushes onto each part as it is named; holds on the chain; eases back for the verdict
  const foc = (p, a, b, z) => ss(a, a + .7, t) * (1 - ss(b - .6, b, t)) > 0 ? [p, z, ss(a, a + .7, t) * (1 - ss(b - .6, b, t))] : null;
  const F = foc(LPT([RD.HT[0] - 40, RD.HT[1] - 92]), tB - .2, tK - .1, 1.35) || foc(LPT([RD.HT[0] - 100, RD.HT[1] - 40]), tK - .2, tC - .2, 1.3) || foc(LPT([(RD.RA[0] + RD.BB[0]) / 2, RD.BB[1] - 30]), tC - .2, tV + .6, 1.35);
  const c = F ? camMix([1, 960, 540], camOn(F[0], F[1], 960, 520), F[2]) : [1, 960, 540];
  const cr = (t - s.t0) * .9, lit = { bell: t >= tB - .1 && t < tV ? .9 : 0, brakes: t >= tK - .1 && t < tV ? .9 : 0, chain: t >= tC - .1 && t < tF ? .9 : 0 };
  const lim = TF(1420, 900, .7, limStand(t, { sip: t > s.t0 + 1 && t < tB - .2 ? .5 + .5 * Math.sin((t - s.t0) * 1.4) : (t >= tM && t < tM + 1.2 ? 1 : 0), bag: true, nod: t > LT("l808") + .3 && t < LT("l808") + 1.2 ? .12 * Math.sin((t - LT("l808")) * 8) : 0 }));
  const bike = TF(...LCR, LCK, roadsterV2(t, { crank: cr, lit, stand: true, kopi: false }));
  let body = lim + bike;
  const L = (txt, x, y, p, a, b, col) => t >= a - .05 && t < b + .35 ? OP(spring(t, a, .4) * (1 - ramp(t, b, .3)), plabel(x, y, txt, ...camPt(c, LPT(p)), 36, col)) : "";
  const thumb = (x, y, a, b, pic) => t < a - .05 || t > b + .35 ? "" : TF(x, y, spring(t, a, .4) * (1 - ramp(t, b, .3)), `<g filter="url(#dropS)"><circle r="62" fill="#fff" stroke="${P.ink}" stroke-width="5"/></g><clipPath id="th${Math.round(x)}"><circle r="56"/></clipPath><g clip-path="url(#th${Math.round(x)})">${pic}</g>`);
  let labs = L("bell: warns people", 1000, 250, [RD.HT[0] - 40, RD.HT[1] - 104], tB, tC - .1, P.sun) + L("brakes: slow it down and stop it", 820, 400, [-222, -262], tK, tC - .1, "#FF9A8F")
    + thumb(760, 250, tB + .4, tC - .1, TF(0, 70, .24, buddy("basil", 0, 0, 380, t, { tag: false, shadow: false, noreact: true, poses: [[0, "deadpan"]] }) + TF(-20, -340, 1.0, pigeonV2(t, { ph: 2 }))))
    + thumb(480, 400, tK + .4, tC - .1, TF(30, 40, .2, iceBoxBackV2(t) + `<g transform="translate(-450 -10) scale(.75)">${bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .5 })}</g>` + iceBoxFrontV2(t)))
    + L("chain: turns the back wheel", 880, 905, [(RD.RA[0] + RD.BB[0]) / 2, RD.BB[1] + 10], tC, tF - .2, "#9FE7B0");
  // the magnifier: a gear tooth sitting between two rollers of the chain
  const MG = [560, 330]; let mag = "";
  if (t >= tC + .2 && t < tF) { const mk = spring(t, tC + .2, .45) * (1 - ramp(t, tF - .3, .3)), tip = camPt(c, LPT([RD.BB[0] - 30, RD.BB[1] - RD.r1])), th = .25 * Math.PI * ((t - tC) * .4 % 2);
    mag = OP(Math.min(1, mk), `<path d="M${n2(tip[0])} ${n2(tip[1])} L${MG[0] + 60} ${MG[1] + 100}" stroke="${P.ink}" stroke-width="5"/>`) + TF(...MG, mk * .8, `<circle r="150" fill="#FFF3DC" stroke="${P.ink}" stroke-width="12"/><clipPath id="mgV2"><circle r="140"/></clipPath><g clip-path="url(#mgV2)"><g transform="scale(.9)">${magTooth2(t, th)}</g></g>`) + OP(mk, tpill(MG[0], MG[1] + 152, "a tooth in each gap", 26, "#fff", P.ink, { w: 700 })); }
  // the two insets beside the labels: the pigeons on Basil's helmet; the bike stopped at the ice box
  const ins = "" && x2inset(t, tB + .4, tV - .1, 480, 300, "no bell: pigeons!", TF(0, 60, .32, buddy("basil", 0, 0, 380, t, { tag: false, shadow: false, noreact: true, poses: [[0, "deadpan"]] }) + TF(-20, -330, .9, pigeonV2(t, { ph: 2 }))), P.sun)
    + x2inset(t, tK + .4, tV - .1, 480, 540, "no brakes: the ice box", TF(0, 50, .26, iceBoxBackV2(t) + `<g transform="translate(-450 -10) scale(.75)">${bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .5 })}</g>` + iceBoxFrontV2(t)), "#FF9A8F");
  const verdict = t >= tV ? TF(860, 250, spring(t, tV, .45) * (1 - ramp(t, tF - .3, .3)), tpill(0, 0, "EVERY PART HAS A JOB", 46, P.leaf, "#fff", { w: 700 })) : "";
  // l807: the see-saw: the two bikes on a balance, Uncle Lim's side lower ("heavier"), the WINNER ribbon on it
  const seesaw = t >= tS - .1 && t < LE("l807") + .6 ? TF(870, 470, spring(t, tS - .1, .45) * (1 - ramp(t, LE("l807") + .2, .3)), (() => { const a = 9 * eo(clamp((t - tS) / .8));
    return `<g filter="url(#drop)"><rect x="-470" y="-230" width="940" height="430" rx="30" fill="#fff" stroke="${P.ink}" stroke-width="7"/></g><path d="M-40 170 L0 100 L40 170z" fill="#8C96A2" stroke="${P.ink}" stroke-width="5"/>`
      + `<g transform="translate(0 100) rotate(${n2(-a)})"><rect x="-400" y="-12" width="800" height="22" rx="8" fill="#C99A5B" stroke="#7A5226" stroke-width="5"/>${TF(-220, -12, .3, `<g transform="scale(1)">${bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .5 })}</g>`)}${TF(230, -12, .3, roadsterV2(t, { kopi: false }))}</g>`
      + tpill(-240, -170, "Basil's: lighter", 28, "#fff", P.ink, { w: 700 }) + tpill(240, -170, "Uncle Lim's: heavier", 28, P.sun, P.ink, { w: 700 }) + TF(300, -100, .9, `<path d="M-40 0 L40 0 L30 40 L0 26 L-30 40z" fill="#E5484D"/>` + T(0, 14, "WINNER", 18, "#fff")); })()) : "";
  window._BUBAT = { pip: [1500, 250], momo: [760, 640], basil: [880, 740] };
  const pk = (t >= tM - .05 && t < tM + 1.3);   // MISS 2: Pip and Basil go for the high-five; Momo's eyes follow the kopi bag; her paw is late
  return `<g filter="url(#b10)">${x2place("vdv2", "", [1.1, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(k, panelV2(1) + `<clipPath id="pnV2"><rect x="${PNL2.x}" y="${PNL2.y}" width="${PNL2.w}" height="${PNL2.h}" rx="40"/></clipPath><g clip-path="url(#pnV2)">${CAM(body, c[0], c[1], c[2])}</g>` + labs + mag + verdict)
    + OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 }))) + ins + seesaw
    + x2bd("momo", 140, 1076, 330, t, { mag: t >= LE("l803") + .05 && t < LE("l803") + 1.5, in: s.t0 - .5, ...watchO(140, 800), poses: [[s.t0, "sit"], [tC - .1, "pointing"], [LE("l803") + 1.5, "sit"], [tM, "hi5/cheer"], [tM + .5, "facepalm/oops"], [tM + 1.3, "sit"]], look: pk ? 0 : 6, flip: false })
    + x2bd("basil", 480, 1185, 400, t, { in: s.t0 - .5, peek: true, poses: [[s.t0, "oops"], [LT("l808") + .1, "oops"], [tM, "hi5/cheer"], [tM + .8, "oops"]], look: 8, tag: false })
    + x2bd("pip", 1745, 1076, 460, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tB - .1, "pointing"], [LT("l803") - .1, "sit"], [tF + .05, "cheer"], [tF + 2.0, "sit"], [MK("tok") - .05, "embarrassed/oops"], [MK("tok") + .45, "sit"], [tM, "hi5/cheer"], [tM + .6, "sit"]], look: -4 })
    + x2whiff(t, tM + .35, 330, 720) + x2HUD(t); };

/* ================================================================ BE THE THING: a link of Uncle Lim's chain ================================================================ */
// waitw: the look-closer's roadster stays; the camera pushes into the TOP run of his chain; the buddies pop out in turn (no fading)
SC.waitw = (t, s) => { const tS = MK("shrinkw"), z = 1 + 7 * ei(clamp((t - tS) / Math.max(.6, s.t1 - tS))), top = LPT([(RD.RA[0] + RD.BB[0]) / 2, RD.BB[1] - RD.r1 - 6]);
  const pic = TF(...LCR, LCK, roadsterV2(t, { crank: (t - SCN.lcbike.t0) * .9, stand: true, kopi: false })) + TF(1420, 900, .7, limStand(t, { bag: true })), c = camOn(top, z, 960, 540), u = eio(clamp((t - tS) / .8)), cc = camMix([1, 960, 540], c, u);
  return `<g filter="url(#b10)">${x2place("vdv2", "", [1.1, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + CAM(panelV2(1) + pic, cc[0], cc[1], cc[2])
    + OP(1 - ramp(t, tS, .3), TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + x2bd("momo", 140, 1076, 330, t, { ...watchO(140, 800), poses: [[0, "sit"]], out: MK("be") + 2.6, in: s.t0 - .5 })
    + x2bd("basil", 480, 1185, 400, t, { peek: true, poses: [[0, "sit"]], out: MK("be") + 2.8, in: s.t0 - .5, tag: false, look: 8 })
    + x2bd("pip", 1745, 1076, 460, t, { flip: true, poses: [[0, "sit"]], look: -4, out: MK("be") + 3.0, in: s.t0 - .5 })
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * ss(s.t1 - .5, s.t1, t))}"/>` + logo(t); };
// the journey: YOU are one link; the chain stands still, then the front gear's teeth fit into your gaps and pull you forward (you travel
// RIGHT along the top run towards the front gear: every link faces its travel); the camera pulls back on "tugs": the whole loop pulls the
// back gear round; the huge back wheel turns
const JS2 = (() => { const S = SCN.shrink, a = LT("j902"), g = MK("jgrab"), v = 250, Lt = JLOOP.Lt, s0 = Lt - v * (g - a) - JW.pitch * .5;
  return (t) => t < a ? s0 : s0 + v * (t - a) * ss(a, a + .6, t) + v * Math.max(0, t - a - .6) * 0; })();
function x2youLink(t, p) { const left = Math.cos(p.an * Math.PI / 180) < 0, an = left ? p.an - 180 : p.an;
  return `<g transform="translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(an)})">${TF(0, 0, left ? -1 : 1, `<!--FACES:right linkYou-->` + linkYouP4(t, JW.pitch, 120), 0, 1)}</g>`; }
SC.shrink = (t, s) => { const a = LT("j902"), sh = a + (t - a) > a ? 0 : 0, S_ = (() => { const g = MK("jgrab"), v = 250, s0 = JLOOP.Lt - v * Math.max(.6, g - a) - JW.pitch * .5; return t < a ? s0 : s0 + v * Math.max(0, t - a - .3) + v * .15 * ss(a, a + .3, t); })();
  const W_ = jWorld(t, S_, 0), you = W_.you, tT = MK("jtug"), zo = eio(clamp((t - tT + .4) / 2.4)), back = s.t1;
  const cIn = camOn([you.x + 120, you.y + 40], 1.12, 760, 600), cOut = camOn([1150, 60], .3, 960, 560), c = camMix(cIn, cOut, zo);
  const rw = S_ / JW.r2; let wheel = `<circle cx="0" cy="0" r="1980" fill="none" stroke="#2E2F33" stroke-width="110"/><circle cx="0" cy="0" r="1900" fill="none" stroke="#B9C1CB" stroke-width="40"/>`;
  for (let i = 0; i < 18; i++) { const an = rw + i * Math.PI / 9; wheel += `<path d="M0 0 L${n2(1880 * Math.cos(an))} ${n2(1880 * Math.sin(an))}" stroke="#8C96A2" stroke-width="16"/>`; }
  const world = `<rect x="-6000" y="-6000" width="14000" height="12000" fill="#1E2430"/><rect x="-6000" y="-6000" width="14000" height="12000" fill="url(#rimLight)" opacity=".5"/>` + OP(.85, wheel) + W_.s + x2youLink(t, you);
  const rider = (who, kk) => { const q = JLOOP.at(-kk * JW.pitch + S_ + JW.pitch / 2), [X, Y] = camPt(c, [q.x, q.y - 60]), left = q.seg === "bottom";
    return bd2(who, X, Y, 170 * c[0], t, { in: s.t0 + .8 + kk * .15, out: MK("jtug") - .5 + kk * .05, pose: who === "basil" ? "back" : undefined, poses: who === "momo" ? [[0, "sit"], [MK("wave"), "waving"], [MK("wave") + 1.0, "sit"]] : [[0, who === "basil" ? "back" : "sit"]], flip: who === "pip" ? !left : left, look: left ? -6 : 6, tag: false, shadow: false, noreact: true }); };
  const riders = c[0] > .5 ? rider("basil", 3.15) + rider("pip", 1.1) + rider("momo", 2.1) : "";   // Basil (his back) drawn first, a little further back: he never covers Momo's face as they ride round the gear
  const [yx, yy] = camPt(c, [you.x, you.y]);
  return OP(ramp(t, s.t0, 1.0), CAM(world, c[0], c[1], c[2]) + riders
    + OP(1 - ramp(t, MK("jgrab") + 2.5, .3), youTag(t, s.t0 + .6, "You: one link of a bike chain")) + TF(yx, yy - 120 * c[0] - 20, spring(t, s.t0 + .8, .45) * (zo > .3 ? 1.1 : .9), youPill(0, 0, 1))
    + (t >= MK("jgrab") - .1 && t < tT + .4 ? TF(1300, 220, spring(t, MK("jgrab") - .1, .4) * (1 - ramp(t, tT, .3)), tpill(0, 0, "the front gear's teeth fit into your gaps", 34, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tT - .1 ? TF(1240, 860, spring(t, tT - .1, .4) * (1 - ramp(t, back - .3, .3)), tpill(0, 0, "the chain tugs the back gear round", 36, "#fff", P.ink, { w: 700 })) : "")
    + (t >= MK("jwheel") - .1 ? TF(560, 300, spring(t, MK("jwheel") - .1, .4) * (1 - ramp(t, back - .2, .2)), tpill(0, 0, "back wheel: turning", 40, P.leaf, "#fff", { w: 700 })) : ""))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - ramp(t, s.t0, .6))}"/>`; };
const bd2 = (who, x, y, h, t, o) => buddy(who, x, y, h, t, o);
// the pull-out: back out to the void deck, ENDING on the next shot's layout (interact)
SC.pullout = (t, s) => { const u = eio((t - s.t0) / (s.t1 - s.t0)), c = camMix(camOn(ITB.top, 5.0), [1, 960, 540], u);
  return CAM(x2interactSet(t), c[0], c[1], c[2]) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * (1 - ramp(t, s.t0, .5)))}"/>` + logo(t); };

/* ================================================================ INTERACT · the five pictures, the Gruffalo turn ================================================================ */
// the void deck: Uncle Lim's roadster on its stand (its chain turning slowly as he turns a pedal by hand); Momo big at the left pointing
// along the row; five round pictures joined by arrows: PEDALS → FRONT GEAR → CHAIN → BACK GEAR → BACK WHEEL, each lighting up as she names
// it; INTERACT; then Basil turns round on the spot (the Gruffalo turn, determined)
const ITB = { bike: [1180, 1010], k: .62 }; ITB.top = [ITB.bike[0] + ITB.k * ((RD.RA[0] + RD.BB[0]) / 2), ITB.bike[1] + ITB.k * (RD.BB[1] - RD.r1)];
const x2interactSet = (t) => `<g filter="url(#b4)">${bg("vdv2")}</g>` + TF(...ITB.bike, ITB.k, roadsterV2(t, { crank: t * .9, stand: true }));
const x2fivePics = (t) => { const ids = ["p1", "p2", "p3", "p4", "p5"], lab = ["PEDALS", "FRONT GEAR", "CHAIN", "BACK GEAR", "BACK WHEEL"], xs = [560, 840, 1120, 1400, 1680];
  const pedal = `<g transform="translate(0 4) scale(1.25)"><circle cx="-22" cy="16" r="10" fill="#8C96A2" stroke="#2B2F36" stroke-width="4"/><path d="M-22 16 L16 -12" stroke="#2B2F36" stroke-width="13" stroke-linecap="round"/><path d="M-22 16 L16 -12" stroke="#8C96A2" stroke-width="7" stroke-linecap="round"/><rect x="-6" y="-21" width="44" height="17" rx="5" fill="#2B2F36"/><rect x="0" y="-17" width="32" height="8" rx="3" fill="#FFC83A"/></g>`;
  const chainIc = (tt) => { const n = 7, sp = 19, off = ((tt * 14) % (2 * sp)), x0 = -(n - 1) * sp / 2; let pl = "", ro = ""; for (let i = -1; i <= n; i++) { const a = x0 + i * sp + off - sp, b = a + sp; pl += `<path d="M${n2(a)} 0 L${n2(b)} 0" stroke="${i % 2 ? "#4A5058" : "#2E3238"}" stroke-width="17" stroke-linecap="round"/>`; ro += `<circle cx="${n2(a)}" cy="0" r="5.5" fill="#AEB6C0"/>`; }
    return `<g transform="rotate(-10)"><clipPath id="ciV2"><rect x="-62" y="-20" width="124" height="40"/></clipPath><g clip-path="url(#ciV2)">${pl}${ro}</g></g>`; };
  const pic = [() => pedal, (tt) => TF(0, 0, 1.3, gearP4(RD.r1, 32, tt * 2)), chainIc, (tt) => TF(0, 0, 2.0, gearP4(RD.r2, 14, tt * 4, { spider: false, hole: "#59616B" })), (tt) => TF(0, 0, .46, wheelP4(BK.R, tt * 3))];
  if (t < MK("p1") - .3 || t > MK("kw_interact") + 2.2) return ""; const k0 = ramp(t, MK("p1") - .3, .3) * (1 - ramp(t, MK("kw_interact") - .35, .3));
  return OP(k0, xs.map((x, i) => { const lit = t >= MK(ids[i]) - .05, g = lit ? pulse(t, MK(ids[i]), .03, .8) : 0;
    return TF(x, 230, 1 + .12 * g, `<g filter="url(#dropS)"><circle r="78" fill="#FFF8EA" stroke="${lit ? P.leaf : "#C9BFAE"}" stroke-width="${lit ? 10 : 6}"/></g><clipPath id="fpv${i}"><circle r="70"/></clipPath><g clip-path="url(#fpv${i})" opacity="${lit ? 1 : .45}">${pic[i](t)}</g>` + tpill(0, 122, lab[i], 26, lit ? P.leaf : P.ink, "#fff", { w: 700 }))
      + (i < 4 ? OP(lit ? 1 : .3, fatArrow(x + 88, 230, x + 192, 230, lit ? P.sun : "#fff", 14)) : ""); }).join("") + (t >= MK("acts") ? TF(1120, 430, spring(t, MK("acts"), .4), tpill(0, 0, "each part acts on the next one", 36, P.ink, "#fff", { w: 700 })) : "")); };
SC.interact = (t, s) => { const tT = MK("turn");
  window._BUBAT = { momo: [760, 600], basil: [1200, 560] };
  return x2interactSet(t) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.3 * ramp(t, MK("p1") - .4, .3) * (1 - ramp(t, MK("kw_interact") + 1.6, .4)))}"/>`
    + x2bd("momo", 300, 1076, 470, t, { in: s.t0 - 3, noStay: true, poses: [[0, "pointing"], [MK("kw_interact") + .05, "cheer"], [MK("kw_interact") + 2.0, "sit"]], look: 4 })
    + x2bd("pip", 1560, 1076, 330, t, { in: s.t0 - 3, noStay: true, flip: true, poses: [[0, "arms_crossed"], [tT + .6, "sit"]], look: -4 })
    + x2bd("basil", 860, 1076, 360, t, { in: s.t0 - 3, noStay: true, flip: t < tT + .25, poses: [[0, "sit"], [tT + .25, "arms_crossed"], [LT("j905") + .5, "arms_crossed"]], look: t < tT + .25 ? -3 : 6, twirl: [tT - .1], noreact: true })
    + x2fivePics(t) + x2HUD(t); };

/* ================================================================ THE REVERSAL ================================================================ */
// (reverse) the top of the ramp, the same framing as the forward stop: the brake levers go back on (speeded up), Basil squeezes, the pads
// grip; Pip ticks his checklist. The refrain TURNED ROUND. Small print: "No brakes? Push it, don't ride it." / "...Ask an adult to help."
const x2tickAt = (t, a) => clamp((t - a) / .35);
SC.reverse = (t, s) => { const c = camOn([560, 620], 1.15, 900, 560), fit = eio(clamp((t - s.t0 - .2) / 1.4)), sq = pulse(t, MK("rbrk") + .1, .02, .3);
  window._BUBAT = { basil: [520, 320] };
  return x2place("rampv2", TF(RPB[0], 760, RPK, bikeP4(t, { chain: false, brakes: fit, bell: 0, crank: .6, sh: 0, g2: 0, stand: true })), c) + CAM(rampFront(), c[0], c[1], c[2])
    + x2bc(c, "basil", 20, 762, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [MK("rbrk") - .1, "pointing"], [LE("v1001") + .1, "sit"]], look: 4, ...x2grease(t) })
    + x2bc(c, "pip", 900, rampAt(900) + 4, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "arms_crossed"]], look: -6 }) + x2held(c, "pip", 900, rampAt(900) + 4, 360, true, x2unflip(.5, clipboardV2(t, { brakes: x2tickAt(t, MK("tick1") - .6) }, { hi: t < MK("tick1") ? "brakes" : null })), 10, 40)
    + x2bc(c, "momo", 1240, rampAt(1240) + 4, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -6 })
    + OP(sq, `<g transform="translate(${n2(camPt(c, [RPB[0] + RPK * (BK.HT[0] - 80), 0])[0])} ${n2(camPt(c, [0, 760 + RPK * (BK.HT[1] - 40)])[1])})"><path d="M-34 -26 l-20 -14 M-40 0 h-26 M34 -26 l20 -14 M40 0 h26" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`)
    + x2refrain(t, "v1001", LE("v1001") + .7, { tag: "TURNED ROUND", tagCol: P.leaf, col: P.leaf }) + speeded(t, s.t0 + .1, s.t0 + 1.7, 1700, 1010)
    + x2fine(t, s.t0 + .1, LT("v1001") + 2.2, "No brakes? Push it, don't ride it.") + x2fine(t, LT("v1001") + 2.4, s.t1, "Fixing brakes or a chain? Ask an adult to help.") + x2HUD(t); };
// (rchain) the path by the garden, the same framing as the forward stop: the chain goes back on both gears (speeded up); the mechanic's
// test: Pip (behind the bike) lifts the back wheel by the saddle, Momo turns a pedal (pointing at it), the back wheel spins; the snail passes
// in the background, still on its way; Momo's "Race time!" + high-five MISS 3 (Pip's paws are on his clipboard); Pip: "Wait. Checklist.";
// "Ring, ring?" (a pigeon lands on Basil's helmet); THE THINK CARD (3.5 s of silence); "It can still move, but it is not as safe!"; the
// same bike twice; card 3 stamped NOT SAFE YET
const liftA2 = (t, a, b) => -4.2 * ss(a, a + .5, t) * (1 - ss(b, b + .5, t));
const bikeAt2 = (x, y, k, ang, inner) => `<g transform="translate(${n2(x + k * BK.FA[0])} ${y}) rotate(${n2(ang)}) translate(${n2(-k * BK.FA[0])} 0) scale(${k})">${inner}</g>`;
SC.rchain = (t, s) => { const tC = MK("rch"), tSp = MK("spin"), tK = MK("think"), tK0 = MK("think0"), tK1 = MK("think1"), tSd = MK("side"), tM = MK("miss3"), tF = MK("fix3");
  const c = camMix(camOn([900, 640], 1.0), camOn([CHB[0] - 60, 860], 1.25, 900, 640), eio(clamp((t - tC + .2) / 1.0)) * (1 - eio(clamp((t - LT("v1003") + .3) / 1.0))));
  const on = eio(clamp((t - s.t0 - .2) / 1.4)), lift = liftA2(t, tSp - .9, LT("v1003") - .4), cr = .6 + 2 * Math.PI * eio(clamp((t - tSp) / 1.2)), sh = BK.r1 * (cr - .6), rw = sh / BK.r2 + (t > tSp + 1.2 ? 3 * (1 - Math.exp(-(t - tSp - 1.2))) : 0);
  const bike = bikeAt2(CHB[0], CHB[1], CHK, lift, bikeP4(t, { chain: on, brakes: 1, bell: 0, crank: cr, sh, rw, g2: sh / BK.r2, stand: lift > -.5, blur: t > tSp && t < tSp + 3 ? .4 : 0 }));
  const snail = TF(lerp(1350, 1620, (t - s.t0) / 33), 960, .45, `<!--FACES:right snail-->` + snailV2(t));
  // the think card: the bike with no bell; two choices drawn big; card 3 beside it; three soft ticks, no ring
  const think = t >= tK - .1 && t < LE("v1007") + .4 ? (() => { const k = spring(t, tK - .1, .45) * (1 - ramp(t, LE("v1007") + .1, .3)), lit = t >= LT("v1007") + .6;
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * Math.min(1, k))}"/>` + TF(860, 500, k, `<g filter="url(#drop)"><rect x="-600" y="-330" width="1200" height="660" rx="44" fill="#FFF8EA" stroke="${P.ink}" stroke-width="8"/></g>`
      + `<g transform="translate(-430 -262)">${tpill(0, 0, "THINK!", 40, P.sun, P.ink, { w: 700 })}</g>` + T(80, -250, "Without a bell,", 44, P.ink, { w: 700 }) + T(80, -194, "can the bike still move?", 44, P.ink, { w: 700 })
      + TF(-40, 50, .42, bikeP4(t, { chain: 1, brakes: 1, bell: 0, crank: .6 }) + x2ghostBell(1.3, "#E5484D"))
      + [["moves", -270, P.leaf], ["cannot move", 270, "#E5484D"]].map(([w, x, col], i) => TF(x, 210, 1 + (lit && !i ? .06 * Math.sin(t * 6) : 0), `<g filter="url(#dropS)"><rect x="-220" y="-80" width="440" height="160" rx="30" fill="${lit && !i ? "#E9F9EE" : "#fff"}" stroke="${col}" stroke-width="${lit && !i ? 12 : 8}"/></g>` + T(0, 16, w, 48, col) + (lit && !i ? T(0, 62, "but less safe", 30, "#E89A2E", { w: 700 }) : ""))).join(""))
      + TF(1640, 520, k * .9, x2fixCard(t, 3, { k: .42 })) + (t >= tK0 && t < tK1 ? T(860, 960, ["●○○", "●●○", "●●●"][Math.min(2, Math.floor((t - tK0) / 1.17))], 60, "#fff") : ""); })() : "";
  const side = t >= tSd - .1 && t < s.t1 + .1 ? (() => { const k = spring(t, tSd - .1, .45);
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * Math.min(1, k))}"/>` + [["no chain: cannot move", 520, false, 1], ["no bell: moves, but less safe", 1240, 1, 0]].map(([w, x, ch, bl], i) => TF(x, 500, k, `<g filter="url(#drop)"><rect x="-340" y="-240" width="680" height="480" rx="34" fill="#FFF8EA" stroke="${i ? P.sun : "#E5484D"}" stroke-width="8"/></g>` + TF(0, 120, .55, bikeP4(t, { chain: ch, bell: 0, brakes: 1, crank: i ? t * 2.5 : .6, sh: i ? BK.r1 * t * 2.5 : 0, rw: i ? BK.r1 * t * 2.5 / BK.r2 : 0, fw: i ? BK.r1 * t * 2.5 / BK.r2 : 0, stand: !i })
      + (i ? x2ghostBell(1.3, "#E5484D") + [0, 1, 2].map((j) => `<path d="M${-420 - j * 10} ${-260 + j * 70} h-90" stroke="#5B6B80" stroke-width="12" stroke-linecap="round" opacity=".6"/>`).join("") : x2ghostChain().replace(/#fff/g, "#E5484D"))) + T(0, 206, w, 34, P.ink, { w: 700 }))).join("")
      + TF(1750, 520, k, x2fixCard(t, 3, { k: .5, stamp: ["NOT SAFE YET", false, MK("likely") + .3] })); })() : "";
  const pigLand = LT("v1005") + .3, pig = t >= pigLand - .5 ? x2held(c, "basil", 560, 1066, 400, false, TF(-20, -262 - 180 * (1 - eo(clamp((t - pigLand + .5) / .5))), .95, pigeonV2(t, { fly: t < pigLand ? 1 : 0, ph: 3 })), 0, 0) : "";
  window._BUBAT = think || side ? { pip: [1460, 900], momo: [1460, 900] } : { basil: [640, 320], momo: [1180, 330], pip: [1500, 300] };
  const clipT = { brakes: 1, chain: x2tickAt(t, tSp + 1.4), bell: 0 };
  return x2place("gardenv2", snail + bike, c)
    + x2bc(c, "basil", 560, 1066, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [tF + .2, "hi5/cheer"], [tM + .5, "sit"], [LE("v1005") + .1, "shrug/oops"], [LT("v1006") + .3, "thinking"], [tK1, "sit"]], look: 5, ...x2grease(t) }) + pig
    + x2bc(c, "momo", 1250, 1066, 340, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [tSp - .4, "pointing"], [tSp + .6, "surprised"], [LT("v1003") - .1, "sit"], [tF + .1, "hi5/cheer"], [tM + .4, "sit"], [LT("v1006") + .3, "thinking"], [tK1, "sit"]], look: -8 })
    + x2bc(c, "pip", 1650, 1066, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "arms_crossed"], [LT("v1003") - .1, "sit"], [LT("v1006") + .3, "thinking"], [tK1, "sit"], [LE("v1007") + .1, "arms_crossed"]], look: -6 })
    + x2held(c, "pip", 1650, 1066, 360, true, x2unflip(.5, clipboardV2(t, clipT, { hi: t >= LT("v1004") && t < LE("v1004") + .6 ? "bell" : null })), 10, 40)
    + x2whiff(t, tM, ...camPt(c, [1020, 520]))
    + (t >= tF - .1 && t < LT("v1004") ? TF(1560, 250, spring(t, tF - .1, .45) * (1 - ramp(t, LT("v1004") - .3, .3)), x2fixCard(t, 3, { k: .36 })) : "")
    + x2refrain(t, "v1002", LE("v1002") + .5, { tag: "TURNED ROUND", tagCol: P.leaf, col: P.leaf }) + speeded(t, s.t0 + .1, s.t0 + 1.7, 1700, 1010)
    + (t >= LT("v1004") && t < LE("v1004") + .6 ? TF(960, 500, spring(t, LT("v1004"), .4) * (1 - ramp(t, LE("v1004") + .3, .2)), `<g transform="scale(1.4)">${clipboardV2(t, clipT, { hi: "bell", order: ["brakes", "chain", "bell"] })}</g>`) : "")
    + think + side + x2HUD(t); };
// (rbell) the bicycle bay, the same framing as stop 1: the bell goes back on; Basil RINGS IT for real; on the second ring the camera is
// pushed in on the bell and for 6 frames its chrome dome reflects the logo-pill heart (HEART MYSTERY HINT #2: unexplained, unmentioned)
const HINT2 = () => MK("ring2") + .04;
SC.rbell = (t, s) => { const tR = MK("rbell"), r1 = MK("ring1"), r2 = MK("ring2"), on = eio(clamp((t - s.t0 - .3) / 1.0)), c = camOn([980, 640], 1.0);
  const ring = Math.max(pulse(t, r1, .02, .25), pulse(t, r2, .02, .25)), h0 = HINT2(), heart = t >= h0 && t < h0 + .2 ? 1 : 0;
  const pigOff = clamp((t - r1 - .1) / .6);
  window._BUBAT = { basil: [640, 320] };
  return x2place("vdv2", TF(...BLB, BLK, bikeP4(t, { chain: 1, brakes: 1, bell: on, crank: .6, ring, heart })), c)
    + x2bc(c, "basil", 640, 1066, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [tR - .1, "pointing"], [LE("v1009") + .1, "laugh"]], look: 5, ...x2grease(t) })
    + (pigOff < 1 ? x2held(c, "basil", 640, 1066, 400, false, TF(-20 + 200 * pigOff, -262 - 120 * Math.sin(Math.PI * pigOff), .95, pigeonV2(t, { fly: pigOff > 0 ? 1 : 0, ph: 3 })), 0, 0) : "")
    + x2bc(c, "pip", 1430, 1066, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "arms_crossed"], [r2 + .3, "cheer"]], look: -6, achieved: true }) + (t < r2 + .3 ? x2held(c, "pip", 1430, 1066, 370, true, x2unflip(.5, clipboardV2(t, { brakes: 1, chain: 1, bell: x2tickAt(t, r1) })), 10, 40) : "")
    + x2bc(c, "momo", 1800, 1066, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -9 })
    + x2refrain(t, "v1009", LE("v1009") + .4, { tag: "TURNED ROUND", tagCol: P.leaf, col: P.leaf }) + speeded(t, s.t0 + .1, s.t0 + 1.4, 1700, 1010)
    + x2bellClose(t, r1, s.t1, ring, heart, on)
    + comicWord(t, r1, 1240, 170, "ting!", { size: 56, tiny: true, col: "#BFE6F7", d: .5 }) + comicWord(t, r2, 1700, 170, "ting!", { size: 56, tiny: true, col: "#BFE6F7", d: .5 })
    + x2HUD(t); };

// the round close-up of the bell (the camera pushed in on it): it rings twice; on the second ring its chrome dome shows the heart for 6 frames
function x2bellClose(t, t0, t1, ring, heart, on) { if (t < t0 - .25) return ""; const k = spring(t, t0 - .25, .4) * (1 - eo(clamp((t - t1 + .25) / .2))), R = 230;
  return TF(1460, 360, k, `<g filter="url(#drop)"><circle r="${R + 12}" fill="#fff"/></g><clipPath id="bcV2"><circle r="${R}"/></clipPath><g clip-path="url(#bcV2)"><rect x="-${R}" y="-${R}" width="${2 * R}" height="${2 * R}" fill="#EFE6D6"/><path d="M-${R} 40 Q0 20 ${R} 60" stroke="#59616B" stroke-width="40" fill="none"/>${TF(0, 30, 8.5, bellP4(ring, heart))}</g><circle r="${R}" fill="none" stroke="${P.basil}" stroke-width="8"/>`); }

/* ================================================================ SYSTEM · finishing each other's sentence ================================================================ */
// a tight three-shot round the complete bike, the trio leaning in (a huddle again); each part lights up; Pip starts, Momo carries it on,
// Basil finishes it: SYSTEM (all three cheer: each learnt it); card 2 stamped READY TO RIDE!; then THE BATTLE CRY TURNED ROUND: all three
// strike the heroic pose together, ALL PARTS, WORKING TOGETHER! (no wobble; the sting resolves this time)
SC.system = (t, s) => { const c = camOn([960, 720], 1.0 + .08 * eio(clamp((t - s.t0) / 8)), 960, 600), tK = MK("kw_system"), tc = MK("cry4"), lit = ramp(t, LT("v1010") + .4, .5);
  window._BUBAT = { pip: [480, 330], momo: [1420, 330], basil: [1180, 420] };
  x2said("v1013");
  return x2place("vdv2", TF(1130, 990, .74, bikeP4(t, { chain: 1, brakes: 1, bell: 1, crank: .6, lit: lit * .8 })), c)
    + x2bc(c, "pip", 360, 1076, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("v1010") + .05, "pointing"], [tK + .05, "cheer"], [tK + 2.0, "sit"], [tc - .05, "hero/arms_crossed"]], look: 8 })
    + x2bc(c, "basil", 700, 1090, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [tK + .05, "cheer"], [tK + 2.0, "sit"], [tc - .1, "hero/arms_crossed"]], look: 0, ...x2grease(t) })
    + x2bc(c, "momo", 1570, 1076, 370, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("v1011") + .05, "pointing"], [tK + .05, "cheer"], [tK + 2.0, "sit"], [tc - .05, "hero/arms_crossed"]], look: -8 })
    + (t >= tK + 1.2 && t < tc ? TF(1660, 420, spring(t, tK + 1.2, .45), x2fixCard(t, 2, { k: .4, stamp: ["READY TO RIDE!", true, tK + 1.6] })) : "")
    + battleCry(t, tc - .05, 960, 300, "ALL PARTS,|WORKING TOGETHER!", { d: 1.8, k: .72, col: P.leaf }) + windV2(t, 960, 700, 900, ss(tc - .1, tc + .1, t)) + flare(1200, 360, ss(tc, tc + .2, t) * (1 - ss(s.t1 - .4, s.t1, t)))
    + x2HUD(t); };

/* ================================================================ RIDE · the victory lap ================================================================ */
// from BEHIND: Basil (his back view on the saddle) rides a lap AWAY round the void deck, helmet buckled, beside Uncle Lim (from behind);
// he rings at the pigeons (they hop aside), both brake gently at the corner; Pip and Momo cheer from the line (if a pip_ride painting is
// added, Pip rides alongside: lib.js SPR.pip_ride). Then they pull up under the rain tree: "Basil, you're puffing! But WHY?"
SC.ride = (t, s) => { const tE = LT("e1101") - .5, ride = t < tE;
  if (ride) { const u = clamp((t - s.t0) / (tE - s.t0)), d = eio(u), cr = (t - s.t0) * 6;
    let w = `<g transform="translate(960 300) scale(.9) translate(-960 -480)">${bg("vdv2")}</g><rect y="760" width="1920" height="320" fill="url(#floorV2)"/>` + [...Array(16)].map((_, i) => `<path d="M${960 + (i - 7.5) * 60} 760 L${960 + (i - 7.5) * 260} 1080" stroke="#C2B8A4" stroke-width="3" opacity=".7"/>`).join("");
    let pg = ""; for (let i = 0; i < 4; i++) { const px = 900 + i * 40, near = d > .55, hop_ = near ? 30 * Math.abs(Math.sin(t * 8 + i)) : 0; pg += TF(px + (near ? (i < 2 ? -80 : 80) : 0), 810 - hop_, .3, i < 2 ? `<g transform="scale(-1 1)"><!--FACES:right pigeon-->${pigeonV2(t, { ph: i })}</g>` : pigeonV2(t, { ph: i })); }
    const bx = lerp(820, 900, d), by = lerp(1180, 860, d), k = lerp(1.0, .42, d), lx = lerp(1180, 1010, d), lk = lerp(.95, .4, d);
    const lim = TF(lx, lerp(1170, 860, d), lk, `<!--FACES:away limRear-->` + limRearRideV2(t, { crank: cr * .7 }));
    const pip = SPR.pip_ride ? TF(lerp(560, 840, d), lerp(1180, 860, d), k * .9, bikeRearV2(t, { crank: cr, col: "#3AA6E8" }) + buddy("pip", 0, -330, 300, t, { pose: "ride", tag: false, shadow: false, noreact: true })) : "";
    return w + pg + lim + pip + x2backRider(t, bx, by, k, cr)
      + comicWord(t, s.t0 + 1.6, 1040, 700, "ring ring!", { size: 40, tiny: true, col: "#fff", d: .7 }) + comicWord(t, s.t0 + 2.6, 1100, 720, "squeak", { size: 34, tiny: true, col: "#fff", d: .5 })
      + x2bd("momo", 170, 1076, 330, t, { in: s.t0 - .5, poses: [[0, "cheer"]], achieved: true, look: 4, tag: false }) + x2bd("pip", 1760, 1076, 330, t, { in: s.t0 - .5, flip: true, poses: [[0, "cheer"]], achieved: true, look: -4, tag: false })
      + OP(ramp(t, s.t0 + .2, .4) * (1 - ramp(t, s.t0 + 2.4, .4)), TF(960, 200, 1, tpill(0, 0, "THE VICTORY LAP", 40, P.sun, P.ink, { w: 700, ls: 4 }))) + x2HUD(t); }
  const c = camOn([960, 600], 1.0);
  window._BUBAT = { momo: [560, 330] };
  let puff = ""; for (let i = 0; i < 3; i++) { const v = ((t * .9 + i / 3) % 1); puff += `<circle cx="${n2(960 + 70 * v)}" cy="${n2(560 - 60 * v)}" r="${n2(12 + 18 * v)}" fill="#fff" opacity="${n2(.7 * (1 - v))}"/>`; }
  return x2place("rtp4", TF(1240, 1040, .7, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1 })), c) + puff
    + x2bd("basil", 820, 1076, 400, t, { in: tE - 3, noStay: true, poses: [[0, "sit"], [LE("e1101") + .1, "surprised"]], look: 3, jump: [[tE + .4, 6], [tE + .9, 6], [tE + 1.4, 6]], ...x2grease(t) })
    + x2bd("momo", 330, 1076, 370, t, { in: tE - 3, noStay: true, poses: [[0, "sit"]], look: 6 })
    + x2bd("pip", 1770, 1076, 360, t, { in: tE - 3, noStay: true, flip: true, poses: [[0, "sit"]], look: -6 }) + x2HUD(t); };

/* ================================================================ INBASIL · LOOK CLOSER: Basil's body ================================================================ */
// a see-through window on Basil's leg: off-white bones, pink muscles; then a window on his chest: a red heart beating faster, pink lungs
// filling faster. Nothing purple; no system names (P4 EP5 teaches them). Pip and Momo watch the window (flipped and leaning).
const legWin2 = (t) => `<g filter="url(#dropS)"><circle r="96" fill="#FFE9DD" stroke="${P.ink}" stroke-width="8"/></g><clipPath id="lwV2"><circle r="90"/></clipPath><g clip-path="url(#lwV2)"><g transform="rotate(${n2(18 + 6 * Math.sin(t * 5))})"><ellipse cx="-34" cy="0" rx="34" ry="92" fill="#F28B8B" stroke="#C2565C" stroke-width="4"/><ellipse cx="34" cy="6" rx="30" ry="84" fill="#F4A1A1" stroke="#C2565C" stroke-width="4"/>`
  + `<path d="M-6 -86 Q-20 -96 -10 -110 Q6 -116 8 -98 L8 98 Q22 108 10 120 Q-8 124 -8 104z" fill="#F7F1E3" stroke="#B8AE98" stroke-width="5"/></g></g>`;
const chestWin2 = (t, beat, breath) => { const hb = 1 + .1 * Math.pow(Math.max(0, Math.sin(t * beat)), 6), lb = 1 + .08 * Math.sin(t * breath);
  return `<g filter="url(#dropS)"><rect x="-170" y="-130" width="340" height="260" rx="60" fill="#FFE9DD" stroke="${P.ink}" stroke-width="8"/></g>`
    + TF(-78, -6, lb, `<path d="M0 -90 Q-60 -80 -66 0 Q-70 80 -10 90 Q20 60 22 -60 Q20 -92 0 -90z" fill="#F4A1B4" stroke="#C25A75" stroke-width="5"/>`) + TF(78, -6, lb, `<path d="M0 -90 Q60 -80 66 0 Q70 80 10 90 Q-20 60 -22 -60 Q-20 -92 0 -90z" fill="#F4A1B4" stroke="#C25A75" stroke-width="5"/>`)
    + TF(6, 30, hb, `<path d="M-30 -40 Q-52 -30 -48 6 Q-42 44 0 66 Q40 46 46 6 Q50 -34 22 -40 Q6 -44 0 -30 Q-10 -46 -30 -40z" fill="#D93A46" stroke="#8E1E2A" stroke-width="5"/><path d="M-6 -40 v-26 M14 -42 q6 -20 20 -24" stroke="#8E1E2A" stroke-width="10" stroke-linecap="round" fill="none"/>`); };
SC.inbasil = (t, s) => { const k = ramp(t, s.t0, .45), tB = MK("bones"), tM = MK("muscles"), tH = MK("heart"), tBr = MK("breath"), tSy = MK("bsys");
  const PX = [760, 900, 600], bob = 6 * Math.sin(t * 4.2); let body = ""; const lw = [PX[0] + 150, PX[1] - 70 + bob], cw = [PX[0] + 30, PX[1] - 250 + bob];
  if (t >= tB - .3) body += TF(...lw, .85 * spring(t, tB - .3, .45), legWin2(t)) + (t >= tB ? OP(spring(t, tB, .4), plabel(1250, 880, "bones", lw[0] + 10, lw[1] + 20, 40, "#fff")) : "") + (t >= tM ? OP(spring(t, tM, .4), plabel(1250, 770, "muscles", lw[0] + 50, lw[1] - 30, 40, "#fff")) : "");
  if (t >= tH - .3) body += TF(...cw, .7 * spring(t, tH - .3, .45), chestWin2(t, t > tBr ? 13 : 9, t > tBr ? 6 : 4)) + OP(spring(t, tH, .4), plabel(1250, 640, "heart: beats faster", cw[0] + 20, cw[1] + 26, 38, "#fff")) + (t >= tBr ? OP(spring(t, tBr, .4), plabel(1250, 530, "lungs: breathe faster", cw[0] + 70, cw[1] - 20, 38, "#fff")) : "");
  return `<g filter="url(#b10)">${x2place("rtp4", "", [1.05, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(k, panelV2(1))
    + OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + x2bd("basil", PX[0], PX[1] + bob, PX[2], t, { in: s.t0 - .5, poses: [[s.t0, "surprised"], [tH + .4, "laugh"]], tag: false, noreact: true, look: 2, ...x2grease(t) }) + OP(k, body)
    + (t >= tSy ? TF(960, 230, spring(t, tSy, .45), tpill(0, 0, "your body: systems working together", 38, P.leaf, "#fff", { w: 700 })) : "")
    + x2bd("momo", 175, 1076, 330, t, { in: s.t0 - .5, ...watchO(175, 760), poses: [[s.t0, "sit"]] }) + x2bd("pip", 1745, 1076, 340, t, { in: s.t0 - .5, ...watchO(1745, 760), poses: [[s.t0, "sit"]] }) + x2HUD(t); };

/* ================================================================ TREE · a rain tree is a system ================================================================ */
const treeCam2 = (t) => camMix(camOn([960, 860], 1.18, 960, 700), camOn([960, 560], 1.0), eio(clamp((t - SCN.tree.t0) / 3.0)));
SC.tree = (t, s) => { const c = treeCam2(t), tl = (mk, txt, x, y, px, py) => t >= MK(mk) - .1 ? OP(spring(t, MK(mk) - .1, .4), plabel(x, y, txt, ...camPt(c, [px, py]), 44, "#fff")) : "";
  window._BUBAT = { pip: [1240, 460] };
  return x2place("rtp4", TF(1110, 1050, .55, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1 })), c)
    + x2bc(c, "pip", 1400, 1062, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("e1103") + .3, "pointing"], [LE("e1103") + .1, "sit"]], look: -4 }) + x2bc(c, "momo", 380, 1062, 340, t, { in: s.t0 - .5, ...watchO(380, 960), poses: [[0, "sit"]] }) + x2bc(c, "basil", 1800, 1062, 380, t, { in: s.t0 - .5, ...watchO(1800, 960), poses: [[0, "sit"]], ...x2grease(t) })
    + tl("rts", "roots", 640, 780, 830, 785) + tl("stm", "stem (trunk)", 640, 560, 935, 560) + tl("lv", "leaves", 1240, 250, 1260, 230) + x2HUD(t); };

/* ================================================================ WORDS · THE WORDS THAT EARN MARKS ================================================================ */
const recapV2 = (t, t0) => OP(ramp(t, t0, .4), [["cannot move", 760, TF(0, 0, .3, bikeP4(t, { chain: false, bell: 0, brakes: 0, crank: .6 })), "#E5484D"], ["cannot stop safely", 1180, TF(0, 0, .3, bikeP4(t, { chain: 1, bell: 0, brakes: 0, crank: .6 })), "#E89A2E"], ["cannot warn", 1600, TF(0, -10, .6, pigeonV2(t, { ph: 1 })) + TF(40, -16, 1.6, bellP4()), P.ink2]].map(([w, x, pic, col]) =>
  TF(x, 985, 1, pic) + tpill(x, 1030, w, 26, col, "#fff", { w: 700 })).join(""));
SC.words = (t, s) => markScene(t, s, { id: "w1203", sayId: "w1202", who: "basil", tab: "WORDS THAT EARN MARKS", text: TL.lines.w1203.text, keys: ["system", "parts", "function", "interact", "likely", "affected"], size: 50, y: 170, footer: FOOT, achieved: true, poses: [[LE("w1203") + .2, "sit"]], bin: s.t0 - .5, extra: recapV2(t, s.t0 + 1.2) });

/* ================================================================ FINISH · THE COSY END ================================================================ */
// back at the START / FINISH line, low and close at snail level: everyone together (the trio, Uncle Lim with his kopi) round the line; the
// snail a hand's length from the chalk line, facing it; the crown on its stool. "Go, snail, go!"; the snail crosses the line, last; Basil
// places the cardboard crown on its shell; confetti; "Slowly, slowly. Every part working."; THE HIGH-FIVE LANDS: CLAP!, sparkles, and
// everyone laughs together; the score
SC.finish = (t, s) => { const tX = MK("cross"), tCl = MK("clap"), c = camMix(camOn([780, 980], 1.45, 960, 760), camOn([960, 720], 1.0), eio(clamp((t - LT("e1303") + .3) / 2.0)));
  const sx = lerp(420, 600, clamp((t - s.t0) / (tX + 1.2 - s.t0))), crownOn = t >= tX + 1.0, crU = clamp((t - tX - .3) / .7);
  const crownStool = TF(700, 1000, .9, crownStoolV2(!crownOn && crU <= 0 ? 1 : 0)), crownFly = crU > 0 && !crownOn ? TF(lerp(700, sx, eio(crU)), lerp(888, 980, crU) - 90 * Math.sin(Math.PI * crU), .55 * (1 - .25 * crU), crownV2()) : "";
  const conf = t >= tX + 1.0 && t < tX + 2.4 ? [...Array(26)].map((_, i) => { const u = t - tX - 1.0, an = hash(i, 3) * Math.PI * 2, r = 200 * (1 - Math.exp(-u * 3)); return `<rect x="-7" y="-4" width="14" height="8" rx="2" fill="${[P.coral, P.aqua, P.sun, P.pink, P.leaf][i % 5]}" transform="translate(${n2(sx + Math.cos(an) * r)} ${n2(900 + Math.sin(an) * r * .6 + 160 * u * u)}) rotate(${n2(i * 40 + u * 300)})" opacity="${n2(clamp(1.4 - u))}"/>`; }).join("") : "";
  const set = crownStool + TF(sx, 1050, .7, `<!--FACES:right snail-->` + snailV2(t, { crown: crownOn })) + snailTrail(250, sx, 1052) + crownFly + conf;
  const laugh = t >= tCl;
  window._BUBAT = { pip: [520, 380], momo: [1440, 380], basil: [960, 330] };
  return x2place("vdv2", set, c)
    + CAM(TF(1620, 1070, .78, limStand(t, { bag: true, laugh: laugh, wave: t >= tCl - .3 && t < tCl + 1.2, sip: t > s.t0 + .5 && t < LT("e1301") ? .6 : 0, nod: laugh ? .06 * Math.sin(t * 9) : 0 })), c[0], c[1], c[2])
    + (t >= LT("e1303") - .05 ? x2limSay("e1303", Math.min(1560, camPt(c, [1500, 520])[0]), Math.max(300, camPt(c, [1500, 520])[1]), t) : "")
    + x2bc(c, "pip", 240, 1076, 360, t, { in: s.t0 - .5, poses: [[0, "sit"], [LT("e1301") + .4, "surprised"], [LT("e1302") - .1, "cheer"], [tX + 1.5, "sit"], [tCl - .3, "hi5/cheer"], [tCl + .6, "proud/cheer"], [LT("e1304") + .4, "proud/arms_crossed"]], look: 6, achieved: true })
    + x2bc(c, "basil", 1040, 1090, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [LT("e1301") + .5, "surprised"], [LT("e1302") - .1, "cheer"], [tX + .2, "pointing"], [tX + 1.4, "sit"], [LE("e1303") - .6, "laugh"], [tCl - .3, "hi5/cheer"], [tCl + .6, "laugh"]], look: -4, achieved: true, ...x2grease(t) })
    + x2bc(c, "momo", 1330, 1076, 360, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LT("e1301") + .6, "surprised"], [LT("e1302") - .1, "cheer"], [tX + 1.6, "sit"], [tCl - .3, "hi5/cheer"], [tCl + .6, "laugh/cheer"], [LT("e1304") + .2, "sit"]], look: -6, achieved: true })
    + (t >= LT("e1301") ? OP(spring(t, LT("e1301"), .4) * (1 - ramp(t, tX + .2, .3)), plabel(...camPt(c, [430, 860]), "still racing", ...camPt(c, [sx + 20, 990]), 34, "#fff")) : "")
    + comicWord(t, tX + .05, ...camPt(c, [sx + 60, 900]), "squelch.", { size: 34, tiny: true, col: "#E8F4FF", d: .8 })
    + (t >= tCl ? comicWord(t, tCl, 960, 430, "CLAP!", { size: 110, d: 1.1 }) + popSpark(t, tCl, 960, 520, 160) : "")
    + (t >= MK("coin1") ? coin(t, MK("coin1"), 1640, 160) : "") + x2HUD(t); };

/* ================================================================ "Now you know!" (the prop: the complete bike, the snail wearing the crown); the outro: Chilli ================================================================ */
// the link to EP2, WORDLESS (script section 12): after "Now you know!", at the side, the SCIENCE HELP DESK appears; Chilli the chilli plant
// hops in low along the ground (small hops, dust puffs), droops and rings the desk bell. Nothing in the bottom fifth of the frame.
const deskV2 = (t, ding) => `<rect x="-200" y="0" width="400" height="24" rx="6" fill="url(#deskTop)" stroke="#A39B8C" stroke-width="4"/><path d="M-180 24 L-196 150 M180 24 L196 150" stroke="#8C96A2" stroke-width="9"/>`
  + `<g transform="translate(120 0)"><rect x="-34" y="-10" width="68" height="12" rx="4" fill="#59616B"/><path d="M-26 -10 Q-26 -40 0 -40 Q26 -40 26 -10z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><rect x="-4" y="${n2(-52 + 6 * ding)}" width="8" height="12" rx="3" fill="#2B2F36"/></g>`
  + `<g transform="translate(-70 -64) rotate(-3)"><g filter="url(#dropS)"><rect x="-120" y="-44" width="240" height="92" rx="10" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -8, "SCIENCE", 30, "#D9402A")}${T(0, 30, "HELP DESK", 30, P.ink)}</g>`;
SC.nyk = (t, s) => { const kn = TL.lines.h1305.know, th = kn + 1.0, u = clamp((t - th) / 1.6), hx = lerp(2050, 1270, u), hopY = u < 1 ? -50 * Math.abs(Math.sin(u * Math.PI * 4)) : 0, ding = pulse(t, th + 2.2, .02, .3);
  P.chilli = "#D9402A";
  const outro = t >= kn + .6 ? OP(ramp(t, kn + .6, .3), TF(1170, 800, .62, deskV2(t, ding)) + (t >= th ? TF(hx, 800 + hopY, .46, `<!--FACES:none chilli-->` + chilliP4v2(t, { droop: .6 + .4 * ss(th + 1.6, th + 2.1, t), look: -1 })) : "")) : "";
  return nykScene(t, s, TF(960, 640, .34, rainTreeP4(0, 0, 1)) + TF(820, 1000, .78, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1 })) + TF(1160, 1040, .7, snailV2(t, { crown: true })) + outro, { bx: [250, 1795, 1470], hx: 470 }); };
// Chilli (the EP2 guest, drawn as in v1: a terracotta pot with a face, thin stems, limp leaves, small chilli padi fruits)
/* FACES: none */ function chilliP4v2(t, o = {}) { const d = o.droop === undefined ? 1 : o.droop, look = o.look || 0; let s = `<ellipse cx="0" cy="4" rx="96" ry="14" fill="#2B2147" opacity=".22"/>`;
  const stems = [[-40, -230], [0, -270], [40, -235], [-18, -200], [22, -205]];
  for (const [x, y] of stems) s += `<path d="M0 -150 Q${x * .4} ${(y - 150) / 2} ${x} ${y}" stroke="#5E8F3A" stroke-width="7" fill="none"/>`;
  for (const [i, [x, y]] of stems.entries()) for (let j = 0; j < 3; j++) { const sd = j % 2 ? 1 : -1, bx = x * (.5 + .25 * j), by = y + (150 + y) * -.25 * j - 10; s += `<g transform="translate(${n2(bx)} ${n2(by)}) rotate(${n2(sd * (35 + 95 * d))})"><path d="M0 0 Q22 -8 64 0 Q22 10 0 0z" fill="${["#6DB548", "#5E9E3E", "#7FC85A"][(i + j) % 3]}" stroke="#3F7A2A" stroke-width="2"/></g>`; }
  for (const [x, y] of [[-30, -190], [26, -214], [8, -244]]) s += `<path d="M${x} ${y + 26} q0 -10 2 -16" stroke="#5E8F3A" stroke-width="4"/><path d="M${x - 6} ${y + 10} Q${x} ${y - 30} ${x + 6} ${y + 10}z" fill="#E5333B" stroke="#9E1E24" stroke-width="2"/>`;
  s += `<path d="M-90 -160 L90 -160 L70 0 L-70 0z" fill="#C8683F" stroke="#8E4426" stroke-width="5"/><rect x="-100" y="-176" width="200" height="30" rx="8" fill="#D9794D" stroke="#8E4426" stroke-width="5"/><ellipse cx="0" cy="-170" rx="88" ry="10" fill="#4A3324"/>`;
  s += `<g transform="translate(${look * 10} 0)"><ellipse cx="-28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><ellipse cx="28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><circle cx="-24" cy="-96" r="3.5" fill="#fff"/><circle cx="32" cy="-96" r="3.5" fill="#fff"/><path d="M-16 -58 q16 -10 32 0" stroke="#2B2147" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  return s; }

/* ================================================================ BLOOPER (after the end card) ================================================================ */
// the bicycle bay; the clapperboard BLOOPER / TAKE 2; Basil mid battle cry ("LIGHTER IS FAST...") when a pigeon lands on his raised paw and
// another on his helmet; frozen in the pose; "I'll keep the bell."; Pip laughing behind his clipboard; Momo: "Take two!"; the clapper snaps
SC.blooper = (t, s) => { const tk = MK("take2"), tl = MK("landp"), c = [1, 960, 540];
  const pg1 = clamp((t - tl + .5) / .5), pg2 = clamp((t - tl - .1) / .5);
  return bg("stage") + `<rect width="1920" height="1080" fill="#000" opacity=".2"/>` + TF(960, 250, spring(t, s.t0 + .05, .4), clapper27(t > tk ? 1 - ramp(t, tk, .12) : (t < s.t0 + .4 ? 1 : 0)))
    + OP(ramp(t, s.t0, .3), T(960, 470, "(bloopers)", 40, "#fff", { w: 500 }))
    + x2bd("basil", 880, 1076, 420, t, { in: s.t0 - .5, poses: [[0, "hero/arms_crossed"], [MK("frozen"), "deadpan"]], look: 0, still: t > MK("frozen") && t < LT("e1602b"), noreact: true })
    + (pg1 > 0 ? x2held(c, "basil", 880, 1076, 420, false, TF(20 - 200 * (1 - pg1), -120 - 160 * (1 - pg1), .9, pigeonV2(t, { fly: pg1 < 1 ? 1 : 0, ph: 1 })), 0, 0) : "")
    + (pg2 > 0 ? x2held(c, "basil", 880, 1076, 420, false, TF(-20 + 220 * (1 - pg2), -262 - 140 * (1 - pg2), .95, `<g transform="scale(-1 1)"><!--FACES:right pigeon-->${pigeonV2(t, { fly: pg2 < 1 ? 1 : 0, ph: 2 })}</g>`), 0, 0) : "")
    + battleCry(t, MK("landp") - .5, 470, 640, "LIGHTER|IS FAST...", { d: 1.0, k: .55, noLines: true }) + x2said("e1601b")
    + x2bd("pip", 1350, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("e1602b") - .2, "embarrassed/oops"]], look: -3 }) + x2held(c, "pip", 1350, 1076, 380, true, x2unflip(.5, clipboardV2(t, { bell: 1, brakes: 1, chain: 1 })), -60, 30)
    + x2bd("momo", 1730, 1076, 380, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"], [LE("e1603m") - .05, "laugh/cheer"]], look: -3 })
    + comicWord(t, tl + .2, 640, 520, "FLAP.", { size: 50, tiny: true, col: "#fff", d: .8 }) + logo(t); };
