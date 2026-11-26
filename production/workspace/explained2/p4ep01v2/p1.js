// p1.js: P4 EP1 "TheOneApp, Explained", "The Great Bike Breakdown": the whole episode (one video), the beat table of the approved script
// (../p4/p4_ep01_script.md section 4, version 1, 25 Nov 2026). The void deck on a Saturday morning, the park connector, the rain tree, the
// Science Help Desk. The buddies stand IN the scene, big, with a contact shadow, drawn in screen space over the camera'd set (ep27's way: a
// buddy that belongs to the set is moved with camPt, bcam). Every action is drawn AT its mark (script.py). Pip wears his bike helmet all day
// (his P4 goggles sit on its brim); Basil wears his P4 LAB SCIENTIST badge; Momo her magnifier on a cord (lib.js itemsOf).
if (PART === 1) { (() => {
window.PIP_HELMET = true; P.chilli = "#D9402A";
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const bcam = (c, who, x, y, h, t, o = {}) => { const [X, Y] = camPt(c, [x, y]); return buddy(who, X, Y, h * c[0], t, o); };
const held = (who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [px, py] = pawPt(who, x, y, h, flip); return TF(px + (flip ? -dx : dx), py + dy, 1, flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const heldC = (c, who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [X, Y] = camPt(c, [x, y]); return held(who, X, Y, h * c[0], flip, TF(0, 0, c[0], inner), dy * c[0], dx * c[0]); };
const place = (name, inner, c) => CAM(bg(name) + inner, c[0], c[1], c[2]);
const FOOT = "Primary 4 Science · Systems · What is a system?";
SCORE.push([MK("coin1") - .05, 1, 1]);   // the fix pick: the viewers who picked 3, and Momo (who picked 3), each get a point at e1004
window.SHELF_AWAY = () => 0;
const GY = 1050;                          // the bike's ground line (the buddies' feet at 1062)
// Pip on the saddle of a bike drawn at (bx, by) scale bk (screen space unless c is given)
const SAD = (bx, by, bk) => [bx + bk * (BK.ST[0] + 34), by + bk * (BK.ST[1] + 74)];
const pipRide = (t, bx, by, bk, o = {}) => { const [x, y] = SAD(bx, by, bk); return bd("pip", x, y + (o.bob || 0), 330 * bk, t, { look: 3, ...o }); };

/* ---------------- the ride clock (story time): anchors [t, seconds left, roll seconds] ---------------- */
const CLK = [[0, 3600, .01], [MK("roll55"), 3300, .8], [LT("e401"), 2700, .8], [LT("e701"), 1500, .8], [LT("e707b"), 600, .8], [LT("e801"), 60, .8]];
function clockAt(t) { let v = CLK[0][1];
  for (let i = 0; i < CLK.length; i++) { const [ta, va, d] = CLK[i]; if (t < ta) break; const from = i ? Math.max(0, CLK[i - 1][1] - Math.max(0, ta - CLK[i - 1][0] - CLK[i - 1][2])) : va;
    v = t < ta + d ? lerp(from, va, eio((t - ta) / d)) : va - (t - ta - d); }
  return Math.max(0, v); }
const CLOCK_ON = { cold: 1, picks: 1, pedal: 1, rope: 1, chainfix: 1, brakes: 1, ride: 1 };
const clock = (t, s) => { const prev = (TL.scenes[TL.scenes.indexOf(s) - 1] || {}).name, kin = s.name === "cold" ? spring(t, MK("clock") - .1, .45) : (CLOCK_ON[prev] ? 1 : spring(t, s.t0 + .1, .45));
  const go = s.name === "ride" && t >= MK("go") ? 1 + (t - MK("go")) : 0, kout = s.name === "ride" ? 1 - ramp(t, LE("e801") + 1.6, .3) : 1;
  return rideClock(t, clockAt(t), kin * kout, 960, 62, go ? Math.max(.6, go) : 0); };
const HUDP = (t) => HUD(t);
const fineP = (t, t0, t1, txt) => OP(1 - ramp(t, t1, .3), finePrint(t, t0, txt, 560, 1030));

/* ================================================================ cold · THE PROBLEM ================================================================ */
// the void deck; Pip on his "Super-Light Racer" (no chain, no brake levers, no bell), helmet on; Momo left, Basil right; the box USELESS
// PARTS (lid closed) and the sign. Pip pedals: the pedals whizz, the bike does not move an inch; it leans and slowly tips over onto the soft
// grass (out of the picture plane: it lies down away from us); Pip rolls onto his back on the grass, legs in the air, sits up and giggles.
const CB = [860, GY], BOXC = [1230, 1058], SIGN = [1452, 1066];
const coldCam = (t) => { const s = SCN.cold, u = eio(clamp((t - s.t0) / (s.t1 - s.t0))); return camMix(camOn([900, 640], 1.0), camOn([920, 690], 1.07, 960, 560), u); };
SC.cold = (t, s) => { window._BUBAT = { pip: [1130, 215], basil: [1440, 470], momo: [560, 470] }; const c0 = coldCam(t), tip = MK("tip"), lay = MK("topple"), [jx, jy] = jolt(t, lay, 18), c = [c0[0], c0[1] - jx, c0[2] - jy];
  const p0 = MK("pedal0"), cr = t < p0 ? .4 : .4 + 15 * Math.min(t - p0, lay - p0) + 4 * Math.max(0, Math.min(t - lay, 1.2)), fall = eio(clamp((t - tip - .1) / (lay - tip - .1)));
  const bike = bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: cr, sh: 0, g2: 0, pedalBlur: t > p0 + .2 && t < lay ? 1 : 0, stand: fall < .05 });
  // the bike lying down: squashed towards the ground line, leaning back (it falls away from us onto the grass)
  const bikeG = `<g transform="translate(${CB[0]} ${CB[1]}) translate(0 ${n2(-20 * fall)}) scale(1 ${n2(1 - .74 * fall)}) skewX(${n2(-28 * fall)})">${bike}</g>`;
  const dust = t >= lay && t < lay + 1 ? `<ellipse cx="${CB[0] + 60}" cy="${GY + 10}" rx="${n2(200 + 260 * (t - lay))}" ry="${n2(30 + 30 * (t - lay))}" fill="#E8F3D8" opacity="${n2(.8 * (1 - (t - lay)))}" filter="url(#b4)"/>` : "";
  const set = bikeG + dust + TF(...BOXC, 1, boxP4(t)) + (t >= MK("sign") - .1 ? TF(SIGN[0], SIGN[1], .72 * spring(t, MK("sign") - .1, .45), signP4()) : "");
  // Pip: on the saddle, then falling with the bike, then on his back on the grass (legs pedalling the air), then sitting up, giggling
  const up = LT("e104b") - .4, sat = [1090, 1062]; let pip;
  if (t < tip) { const [x, y] = SAD(...CB, 1); pip = bcam(c, "pip", x, y + (t > p0 ? 4 * Math.sin(t * 30) : 0), 330, t, { poses: [[0, "sit"]], look: 3, jump: [[LT("e102p") + .2, 20]] }); }
  else if (t < up) { const [x0, y0] = SAD(...CB, 1), u = eio(clamp((t - tip - .1) / (lay - tip))), x = lerp(x0, 800, u), y = lerp(y0, 1046, u), rot = 86 * u + (t > lay ? 7 * Math.sin((t - lay) * 16) : 0);   // he falls forward, head first the way he goes (SERIES_FORMAT 6x)
    pip = bcam(c, "pip", x, y, 330, t, { poses: [[0, "sit"]], look: rot, still: true, noreact: true }); }
  else { const u = eio(clamp((t - up) / .45)); pip = bcam(c, "pip", lerp(800, sat[0], u), sat[1], lerp(330, 360, u), t, { poses: [[0, "sit"], [up + .5, "oops"], [LT("e106p") - .2, "sit"]], look: 86 * (1 - u), jump: [[MK("box") - .2, 18]] }); }
  return place("vdp4", set, c) + pip
    + bcam(c, "momo", 215, 1062, 420, t, { poses: [[0, "sit"], [LT("e105m") - .2, "sit"]], look: 4 })
    + bcam(c, "basil", 1712, 1062, 400, t, { flip: true, poses: [[0, "sit"], [LE("e106p") + .1, "worried"], [s.t1 + 1, "sit"]], look: -4 })
    + faceCam("basil", t, tip + .35, lay + 1.3, 1640, 330, 150, [[0, "surprised"], [lay + .9, "sit"]], { flip: true, noreact: true })
    + clock(t, s) + OP(ramp(t, .15, .4) * (1 - ramp(t, 6.0, .4)), lowerPill(60, 140, "An HDB void deck ·", "Saturday, 9 a.m.")) + logo(t); };

/* title: THE GREAT / BIKE / BREAKDOWN! over the blurred void deck; the chainless bike lying on the grass, the bell (it was never on) rolls away */
const slamP4 = (txt, y, size, col, k) => k <= 0 ? "" : TF(960, y, lerp(2.4, 1, eo(k)) * (1 + .05 * wob(k, 1, .4)), `<g transform="translate(0 6)" opacity=".7">${T(0, size * .35, txt, size, P.ink, { ls: 4 })}</g>` + T(0, size * .35 - 6, txt, size, col, { ls: 4 }));
SC.title = (t, s) => { const u = t - MK("title"), k1 = clamp(u / .16), k2 = clamp((u - .35) / .16), k3 = clamp((u - .7) / .16), bx = lerp(1180, 1560, eo(clamp((t - s.t0) / 2.2)));
  return `<g filter="url(#b10)">${place("vdp4", "", [1.05, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".5"/>`
    + TF(560, 1010, .62, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .4, sh: 0, g2: 0 })) + TF(bx, 1000, 2.4, `<g transform="rotate(${n2((bx - 1180) * 1.1)})">${bellP4()}</g>`)
    + slamP4("THE GREAT", 300, 120, "#fff", k1) + slamP4("BIKE", 470, 190, P.sun, k2) + slamP4("BREAKDOWN!", 650, 150, "#fff", k3) + logo(t); };

/* ================================================================ fixcards · THE FIX CARDS ================================================================ */
const CX3 = [560, 960, 1360], CARDY = 380, CARDK = .7, ROW = { pip: 560, basil: 960, momo: 1360 };
const cardsRow = (t, y, k, o = {}) => [1, 2, 3].map((n) => { const ti = o.tin ? o.tin[n - 1] : -9, kk = k * (ti > -9 ? spring(t, ti, .45) : 1); if (kk < .02) return "";
  const said = o.said ? pulse(t, o.said[n - 1], .04, .6) : 0; return TF(CX3[n - 1], y - 14 * said, kk * (1 + .05 * said), fixCardP4(t, n, { glow: o.glow ? o.glow(n) : said, stamp: o.stamp ? o.stamp(n) : null })); }).join("");
const sockInset = (t, t0, x, y) => t < t0 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t0 + 4.6, .3)), `<g filter="url(#dropS)"><circle r="104" fill="#FFF8EA" stroke="${P.pip}" stroke-width="8"/></g><path d="M-30 -66 h60 v70 q0 40 30 50 q20 10 10 30 h-90 q-30 0 -30 -40z" fill="#fff" stroke="${P.ink}" stroke-width="5"/>`
  + `<path d="M-26 30 q20 12 40 0 q20 -12 40 2" stroke="#2E3238" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-24 46 q20 10 40 0" stroke="#2E3238" stroke-width="6" fill="none" opacity=".7"/>` + T(0, 150, "Pip's sock", 34, "#fff", { w: 700 }));
SC.fixcards = (t, s) => { window._BUBAT = { pip: [560, 694], basil: [960, 694], momo: [1360, 694] }; const tc = [MK("c1"), MK("c2"), MK("c3")];
  // the camera pushes onto each card as it is named, then eases back to all three
  let z = 1, fx = 960; for (let i = 0; i < 3; i++) { const a = tc[i] - .1, b = i < 2 ? tc[i + 1] - .4 : LE("e203m") + .2, u = ss(a, a + .7, t) * (1 - ss(b - .6, b, t)); if (u > 0) { z = 1 + .14 * u; fx = lerp(960, CX3[i], u); } }
  const c = camOn([fx, 380], z, fx, 380), sp = (who) => t >= LT({ pip: "e201p", basil: "e202b", momo: "e203m" }[who]) - .1;
  return `<g filter="url(#b4)">${place("vdp4", "", [1.05, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".55"/>`
    + OP(ramp(t, s.t0 + .1, .3), T(960, 130, "THREE FIXES", 64, P.sun, { ls: 6 })) + CAM(cardsRow(t, CARDY, CARDK, { tin: tc.map((x) => x - .1), said: tc }), c[0], c[1], c[2])
    + sockInset(t, MK("sock") - .1, 175, 330)
    + bd("pip", ROW.pip, 1076, 300, t, { in: s.t0 + .05, poses: [[s.t0, "sit"]], look: 2 }) + (sp("basil") ? bd("basil", ROW.basil, 1076, 300, t, { in: LT("e202b") - .35, flip: true, poses: [[0, "sit"]], look: -2 }) : "")
    + (sp("momo") ? bd("momo", ROW.momo, 1076, 300, t, { in: LT("e203m") - .35, flip: true, poses: [[0, "sit"]], look: -2 }) : "")
    + (t >= MK("show") - .1 ? TF(1720, 940, spring(t, MK("show") - .1, .4), countHand(t < W("e205", "two") ? 1 : t < W("e205", "three") ? 2 : 3, {}) + youPill(0, -170, .9)) : "") + HUDP(t); };

/* the lock-in: the ring with the chainless drive in it is big and central (clue labels ON TOP of its frame); the three cards stay under it */
SC.lock = (t, s) => { const r0 = MK("ring0_fix"), bell = MK("bell_fix"), rs = ringState(t, r0, 6), inT = t >= r0 && t < bell, shut = pulse(t, bell, .01, .6), b = Math.floor(t - r0), RC = [960, 330], RR = 230;
  const inner = `<clipPath id="lkP4"><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}"/></clipPath><circle cx="${RC[0]}" cy="${RC[1]}" r="${RR - 26}" fill="#DFF3D2"/><g clip-path="url(#lkP4)"><rect x="700" y="${RC[1] + 110}" width="520" height="200" fill="#8CCB62"/>${TF(1050, RC[1] + 140, 1.05, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: t * 7, sh: 0, g2: 0, pedalBlur: inT ? .7 : 0 }))}</g>`;
  const ring = ringTimer(RC[0], RC[1], t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: RR, sw: 34, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.3, inner });
  const clues = [["no chain", 1460, 250, 1100, 300], ["pedals", 520, 430, 900, 430], ["back wheel", 470, 190, 790, 300]].map(([txt, x, y, px, py], i) => OP(ramp(t, s.t0 + .2 + i * .15, .3), `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` + clue3(x, y, txt, spring(t, s.t0 + .2 + i * .15, .4), 54, 520))).join("");
  return bg("stage") + OP(ramp(t, s.t0, .3), T(960, 64, "Which fix gets the bike moving?", 46, "#fff", { w: 600 })) + TF(...RC, spring(t, s.t0, .45) * (1 + .03 * (inT ? rs.tick : 0)), `<g transform="translate(${-RC[0]} ${-RC[1]})">${ring}</g>`) + clues
    + cardsRow(t, 850, .44, { said: [0, 0, 0].map((_, i) => inT && b % 3 === i ? t : -9), glow: (n) => (inT && b % 3 === n - 1 ? .5 + rs.tick * .5 : 0) })
    + OP(ramp(t, r0 - .15, .2) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(1640, 640, "LOCK IT IN!", 44, P.sun, { ls: 6 }))
    + (t >= bell + .05 ? stamp(t, bell + .05, 960, 330) : "")
    + bd("pip", 170, 1076, 430, t, { in: s.t0 - .5, poses: [[s.t0, "worried"], [bell + .4, "sit"]], look: 4, jump: [[r0 + 1.5, 14], [r0 + 3.5, 14], [r0 + 5.2, 10]] }) + HUDP(t); };

/* the picks: the cards rise to a row; each buddy stands under the card they picked (Pip 1, Basil 2, Momo 3), each with its own bubble space */
SC.picks = (t, s) => { window._BUBAT = { pip: [560, 590], basil: [960, 590], momo: [1360, 590] }; const up = eio((t - s.t0) / .6), y = lerp(850, 330, up), k = lerp(.44, .5, up), tp = { pip: LT("e206p"), basil: LT("e207b"), momo: LT("e208m") };
  return bg("stage") + cardsRow(t, y, k, { glow: (n) => [tp.pip, tp.basil, tp.momo][n - 1] <= t ? .6 : 0 })
    + bd("pip", CX3[0], 1076, 360, t, { in: s.t0 - .5, poses: [[s.t0, "sit"]], look: 2 }) + bd("basil", CX3[1], 1076, 360, t, { in: s.t0 + .25, poses: [[s.t0, "sit"]], look: 0 })
    + bd("momo", CX3[2], 1076, 360, t, { in: s.t0 + .4, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + clock(t, s) + HUDP(t); };

/* ================================================================ pedal · FIX 1: PEDAL HARDER ================================================================ */
// the void deck; the bike in profile; Basil (behind it) steadies it by the seat so nobody tips over this time; Momo right
const PB = [900, GY];
const pedalCam = (t) => camMix(camOn([900, 700], 1.0), camOn([760, 900], 1.25, 900, 760), eio(clamp((t - MK("pedalgo") - .4) / 4.5)));
const pedalCrank = (t) => { const a = LT("e302p") - .1, b = LE("e303m") + .3; return .4 + (t < a ? 0 : 16 * (Math.min(t, b) - a) - (t > a + .4 ? 0 : 16 * .4 * (1 - (t - a) / .4) ** 2 / 2)) + (t > b ? 4 * (1 - Math.exp(-(t - b))) : 0); };
SC.pedal = (t, s) => { const c = pedalCam(t), cr = pedalCrank(t), spin = t > LT("e302p") && t < LE("e303m") + .3, tS = MK("still");
  const set = TF(...PB, 1, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: cr, sh: 0, g2: 0, pedalBlur: spin ? 1 : 0 }))
    + (t >= tS - .2 ? OP(spring(t, tS - .2, .4), plabel(PB[0] - 360, PB[1] - 300, "still", PB[0] + BK.RA[0] - 40, PB[1] + BK.RA[1] - 40, 46, "#fff")) : "")
    + (spin ? [0, 1, 2].map((i) => `<path d="M${PB[0] + BK.BB[0] - 140 - i * 20} ${PB[1] + BK.BB[1] - 70 + i * 40} h-${60 - i * 10}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>`).join("") : "");
  const [sx, sy] = SAD(...PB, 1);
  return place("vdp4", bcamRaw(c, "basil", 560, GY - 14, 400, t, { poses: [[0, "sit"]], look: 5 }) + set, c)
    + bcam(c, "pip", sx, sy + (spin ? 4 * Math.sin(t * 34) : 0), 330, t, { poses: [[0, "sit"]], look: 3 })
    + bcam(c, "momo", 1450, 1062, 420, t, { flip: true, poses: [[0, "sit"], [tS + .5, "pointing"], [LT("e303m") - .1, "sit"]], look: -4 })
    + clock(t, s) + HUDP(t); };
// a buddy drawn INSIDE the camera group (so it sits behind the bike): world coordinates, no camera maths
function bcamRaw(c, who, x, y, h, t, o) { return buddy(who, x, y, h, t, o); }

/* ================================================================ replay · THE SLOW-MOTION REPLAY ================================================================ */
SC.replay = (t, s) => { window._BUBAT = { pip: [1250, 320], basil: [700, 320] }; const t0 = MK("slow0"), sl = LT("e302p") - .1 + Math.max(0, t - t0) * .25, c = camOn([780, 910], 1.4, 800, 720), cr = pedalCrank(sl);
  const tF = MK("fgear"), tG = MK("gap"), tS = MK("stuck");
  let film = `<rect width="1920" height="110" fill="#111"/><rect y="970" width="1920" height="110" fill="#111"/>`; for (let i = 0; i < 24; i++) { const x = ((i * 90 - (t * 40) % 90) + 1920) % 1980 - 30; film += `<rect x="${n2(x)}" y="30" width="46" height="50" rx="8" fill="#EEE"/><rect x="${n2(x)}" y="1000" width="46" height="50" rx="8" fill="#EEE"/>`; }
  const rew = t < s.t0 + .45 ? 1 - (t - s.t0) / .45 : 0, glow = t >= tG ? .5 + .5 * Math.sin((t - tG) * 5) : 0;
  const set = TF(...PB, 1, bikeP4(sl, { chain: false, brakes: 0, bell: 0, crank: cr, sh: 0, g2: 0, pedalBlur: .5, gapGlow: glow }));
  const [sx, sy] = SAD(...PB, 1);
  let lab = ""; if (t >= tF - .1) { const [bx, by] = camPt(c, [PB[0] + BK.BB[0], PB[1] + BK.BB[1]]), [rx, ry] = camPt(c, [PB[0] + BK.RA[0], PB[1] + BK.RA[1]]);
    lab += OP(spring(t, tF - .1, .4), plabel(1150, 760, "front gear: turning", bx + 60, by + 40, 40, "#fff")) + OP(spring(t, tF + .5, .4), plabel(420, 820, "back gear: still", rx - 30, ry + 30, 40, "#fff")); }
  if (t >= tG) lab += OP(spring(t, tG, .4), tpill(800, 420, "nothing joins them", 40, P.sun, P.ink, { w: 700 }));
  return place("vdp4", bcamRaw(c, "basil", 560, GY - 14, 400, t, { poses: [[0, "sit"]], look: 5, still: true, noreact: true }) + set, c)
    + bcam(c, "pip", sx, sy + 3 * Math.sin(sl * 34), 330, t, { poses: [[0, "sit"]], look: 3 })
    + `<rect width="1920" height="1080" fill="#D9C7A0" opacity=".14"/>` + lab + film
    + TF(330, 170, spring(t, s.t0 + .1, .4), tpill(0, 0, "INSTANT REPLAY", 40, "#E5484D", "#fff", { w: 700 })) + (t >= t0 - .1 ? TF(1560, 170, spring(t, t0 - .1, .4), tpill(0, 0, "SLOW MOTION ×¼", 40, P.ink, P.sun, { w: 700 })) : "")
    + (t >= tS ? TF(1600, 560, spring(t, tS, .45) * (1 - ramp(t, s.t1 - .4, .3)), fixCardP4(t, 1, { k: .52, stamp: ["STILL STUCK", false, tS + .35] })) : "")
    + (rew > 0 ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * rew)}"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${(i * 197 + t * 2400) % 1080}" width="1920" height="10" fill="#fff" opacity=".6"/>`).join("") + T(960, 560, "◀◀", 160, "#fff") : "") + logo(t); };

/* ================================================================ rope · FIX 2: THE SKIPPING ROPE ================================================================ */
// the rope is looped round both gears and tied; the mechanic's test: Pip lifts the back of the bike (by its frame, behind the back wheel),
// Momo turns a pedal by hand; the rope slides over the teeth, the back wheel twitches once, the rope jumps off and flops onto Basil's head
const RB = [900, GY], RK = .9;
const liftA = (t, a, b) => -4.2 * ss(a, a + .5, t) * (1 - ss(b, b + .5, t));   // the bike tips back on its front wheel: the back wheel lifts
const bikeAt = (x, y, k, ang, inner) => `<g transform="translate(${n2(x + k * BK.FA[0] + k * BK.R * 0)} ${y}) rotate(${n2(ang)}) translate(${n2(-k * BK.FA[0])} 0) scale(${k})">${inner}</g>`;
SC.rope = (t, s) => { const tT = MK("tie"), tL = MK("lift"), tSl = MK("slide"), tF = MK("flop"), c = camMix(camOn([960, 700], 1.0), camOn([820, 880], 1.22, 900, 740), eio(clamp((t - tL - .2) / 1.4))), cc = camMix(c, camOn([960, 700], 1.0), eio(clamp((t - tF - .1) / 1.0)));
  const cr = .6 + 2.4 * eio(clamp((t - tSl) / 1.3)), on = ramp(t, tT - .1, .6), off = t >= tF - .45, tw = t > tSl + .6 && t < tSl + .9 ? .12 * Math.sin((t - tSl - .6) * 20) : 0;
  const bike = bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: cr, sh: 0, g2: tw, rope: off ? null : { on, slip: 6 * Math.sin(t * 18) * ss(tSl, tSl + .2, t) }, stand: t < tL });
  // the rope jumps off the gears (zzzip) and flops onto Basil's head (an arc, low): its handles dangle by his cheeks like earrings
  const BAS = [270, 1062, 420], head = [BAS[0] + 30, 1062 - BAS[2] * .94 * .98];
  let rope = ""; if (off && t < tF) { const u = eio((t - tF + .45) / .45), x = lerp(RB[0] - 120, head[0], u), y = lerp(RB[1] - 120, head[1], u) - 260 * Math.sin(Math.PI * u); rope = TF(x, y, .8, `<g transform="rotate(${n2(-300 * u)})">${ropeLoose(t, 1)}</g>`); }
  const ropeHead = t >= tF ? TF(...camPt(cc, head), .9 * cc[0], ropeLoose(t, 1.1)) : "";
  // Pip (behind the back wheel) lifts the back of the bike by its frame; Momo (behind the front gear) turns the far pedal by hand: the drive
  // side stays in full view in front of them
  return place("vdp4", bcamRaw(cc, "pip", 600, GY - 16, 370, t, { poses: [[0, "sit"]], look: 5, jump: [[tL - .15, 10]] }) + bikeAt(RB[0], RB[1], RK, liftA(t, tL, tF - .2), bike) + rope, cc)
    + bcam(cc, "momo", 1100, 1062, 330, t, { flip: true, poses: [[0, "sit"], [tL - .2, "pointing"], [tF + .3, "sit"]], look: -6 }) + bcam(cc, "basil", ...BAS, t, { poses: [[0, "sit"]], look: 4 }) + ropeHead
    + faceCam("basil", t, tF + .02, tF + 1.6, 1560, 320, 150, [[0, "surprised"], [tF + 1.2, "oops"]], { flip: true, noreact: true })
    + (t >= tF ? impactFX(t, tF, head[0] + 40, head[1] - 40, "FLOP!", { s: .42, flash: false, size: 56 }) : "") + clock(t, s) + HUDP(t); };

/* ================================================================ lcchain · LOOK CLOSER: the chain and the gear ================================================================ */
// the cream panel over the blurred void deck; the real chain BIG on the front gear; a magnifier on the spot where a tooth sits in a gap; then
// the whole drive (front gear, chain, back gear, back wheel) and, apart, a small side-by-side: a smooth rope on the teeth (✗ at its start)
const PNL = { x: 300, y: 180, w: 1260, h: 740 };
const panelP4 = (k) => OP(k, `<g filter="url(#drop)"><rect x="${PNL.x}" y="${PNL.y}" width="${PNL.w}" height="${PNL.h}" rx="40" fill="#FFF8EA"/></g>`);
const xChip = (x, y, txt, size = 36) => { const w = tw(txt, size, 600) + 110; return TF(x, y, 1, `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${-size * .9}" width="${n2(w)}" height="${size * 1.8}" rx="${size * .9}" fill="#fff" stroke="#E5484D" stroke-width="5"/></g><g transform="translate(${n2(-w / 2 + 40)} 0)"><circle r="22" fill="#E5484D"/><path d="M-9 -9 L9 9 M9 -9 L-9 9" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>` + T(n2(30), size * .35, txt, size, P.ink, { w: 600 })); };
// the whole drive as a picture (the bike's back half: back wheel, back gear, chain, front gear, crank), turning; origin = the bike's origin
const drivePic = (t, cr, o = {}) => bikeP4(t, { chain: 1, crank: cr, brakes: 0, bell: 0, saddle: false, stand: false, ...o });
// the magnifier's picture: a piece of the gear's rim (three teeth) with the chain on it: each roller sits in the gap between two teeth, each
// tooth stands in the space between two rollers, inside the link's side plates (drawn as outlines, so the tooth shows); it slides along a little
const magTooth = (t, th) => { const dx = -55 * th; let s = `<rect x="-160" y="-160" width="320" height="320" fill="#FFF3DC"/>`;
  s += `<path d="M-170 160 L-170 54 Q0 40 170 54 L170 160z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="5"/>`;
  for (let i = -3; i <= 3; i++) { const x = i * 110 + dx; s += `<path d="M${n2(x - 34)} 52 L${n2(x - 15)} -62 L${n2(x + 15)} -62 L${n2(x + 34)} 52z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="5"/>`; }
  for (let i = -3; i <= 2; i++) { const x = i * 110 + 55 + dx; s += `<rect x="${n2(x - 30)}" y="-14" width="${n2(170)}" height="58" rx="29" fill="none" stroke="#3B4149" stroke-width="7"/>`; }
  for (let i = -3; i <= 3; i++) { const x = i * 110 + 55 + dx; s += `<circle cx="${n2(x)}" cy="15" r="27" fill="#AEB6C0" stroke="#22262C" stroke-width="5"/>`; }
  return s; };
const DK = [820, 720], DKK = 1.05, DPT = (p) => [DK[0] + DKK * p[0], DK[1] + DKK * p[1]];   // the drive picture's place in the panel
SC.lcchain = (t, s) => { const k = ramp(t, s.t0, .45), tG = MK("gaps"), tT = MK("tooth"), tP = MK("pulls"), tD = MK("drive"), tR = MK("rope"), tV = MK("v_chain"), tK = MK("kw_function");
  const th = .25 * Math.PI * eio(clamp((t - tP + .3) / 2.2)), whole = ramp(t, tD - .2, .5);
  let body = "";
  // 1: the chain on the gear, big; the magnifier on a tooth sitting in a gap of the chain
  if (whole < 1) { const G = [760, 700], r = 250; let b = TF(...G, 1, bigChainGear(r, 24, th)) + T(560, 250, "the chain from the box", 34, P.ink2, { w: 600 });
    const tip = [G[0] + r * Math.cos(-Math.PI / 2 + .18), G[1] + r * Math.sin(-Math.PI / 2 + .18)], MG = [1280, 470];
    if (t >= tG - .2) { const mk = spring(t, tG - .2, .45); b += `<path d="M${n2(tip[0])} ${n2(tip[1])} L${MG[0] - 140} ${MG[1] + 20}" stroke="${P.ink}" stroke-width="5" opacity="${n2(Math.min(1, mk))}"/>` + TF(...MG, mk, `<circle r="160" fill="#FFF3DC" stroke="${P.ink}" stroke-width="12"/><clipPath id="mgP4"><circle r="150"/></clipPath><g clip-path="url(#mgP4)">${magTooth(t, th)}</g><path d="M-60 -120 a130 130 0 0 1 96 -26" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>`); }
    if (t >= tT - .1) b += OP(spring(t, tT - .1, .4), plabel(1300, 760, "tooth", MG[0] + 4, MG[1] - 40, 40, "#fff"));
    if (t >= tG + .3) b += OP(spring(t, tG + .3, .4), plabel(1180, 250, "gap in the chain", MG[0] - 110, MG[1] - 20, 38, "#fff"));
    body += OP(1 - whole, b); }
  // 2: the whole drive, turning (front gear, chain, back gear, back wheel), plain labels; apart, the smooth rope on the teeth (a small inset)
  if (whole > 0) { const cr = (t - tD) * 2.2; let b = TF(...DK, DKK, drivePic(t, cr));
    const L = (txt, x, y, p, d) => t >= tD + d ? OP(spring(t, tD + d, .4) * (1 - ramp(t, tV - .35, .3)), plabel(x, y, txt, ...DPT(p), 34, "#fff")) : "";
    b += L("front gear", 1010, 900, [BK.BB[0] + 20, BK.BB[1] + 40], 0) + L("chain", 720, 880, [-150, -86], .4) + L("back gear", 470, 600, [BK.RA[0] - 10, BK.RA[1] + 6], .8) + L("back wheel", 560, 300, [BK.RA[0] - 30, BK.RA[1] - BK.R + 8], 1.2);
    if (t >= tR - .1) { const kk = spring(t, tR - .1, .45) * (1 - ramp(t, tK - .3, .3)), rr = (t - tR) * 3;
      b += TF(1360, 470, kk, `<g filter="url(#dropS)"><rect x="-150" y="-120" width="300" height="230" rx="24" fill="#fff" stroke="#E5484D" stroke-width="6"/></g>` + TF(0, -6, 1.6, gearP4(BK.r1, BK.n1, rr)) + `<path d="M-130 -84 L 0 -84" stroke="#F28AB2" stroke-width="10" stroke-linecap="round"/><path d="M${n2(-14 + 6 * Math.sin(t * 20))} -84 a90 90 0 0 1 ${n2(78)} ${n2(20)}" stroke="#F28AB2" stroke-width="10" fill="none" stroke-linecap="round"/>`) + OP(kk, xChip(1340, 640, "a smooth rope: the teeth slip", 28)); }
    body += OP(whole, b); }
  if (t >= tV) body += TF(930, 860, spring(t, tV, .45), tpill(0, 0, "THE CHAIN JOINS THEM", 46, P.leaf, "#fff", { w: 700 }));
  window._BUBAT = { momo: [1300, 990], basil: [700, 990], pip: [700, 990] };
  return `<g filter="url(#b10)">${place("vdp4", "", [1.1, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(k, panelP4(1) + body)
    + OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + bd("pip", 360, 1076, 280, t, { in: s.t0 - .5, ...watchO(360, 960), poses: [[s.t0, "sit"]] }) + bd("basil", 160, 1076, 320, t, { in: s.t0 - .5, ...watchO(160, 960), poses: [[s.t0, "sit"]] })
    + bd("momo", 1730, 1076, 470, t, { in: s.t0 - .5, flip: true, poses: [[s.t0, "sit"], [tK + .05, "cheer"], [tK + 2.0, "sit"]], look: -4 }) + HUDP(t); };

/* ================================================================ waitw · "Be one little link of the bike chain! Shrink down. Quietly." ================================================================ */
// the look-closer's drive picture stays; the camera pushes into the TOP run of the chain; the buddies pop out in turn (no fading)
SC.waitw = (t, s) => { const tS = MK("shrinkw"), z = 1 + 7 * ei(clamp((t - tS) / Math.max(.6, s.t1 - tS))), top = DPT([-150, -128]), cr = (t - MK("drive")) * 2.2;
  const pic = TF(...DK, DKK, drivePic(t, cr)), c = camOn(top, z, 960, 540), u = eio(clamp((t - tS) / .8)), cc = camMix([1, 960, 540], c, u);
  return `<g filter="url(#b10)">${place("vdp4", "", [1.1, 960, 600])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + CAM(panelP4(1) + pic, cc[0], cc[1], cc[2])
    + OP(1 - ramp(t, tS, .3), TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + bd("pip", 360, 1076, 280, t, { ...watchO(360, 960), poses: [[0, "sit"]], out: MK("be") + .5 }) + bd("basil", 160, 1076, 320, t, { ...watchO(160, 960), poses: [[0, "sit"]], out: MK("be") + .7 })
    + bd("momo", 1730, 1076, 470, t, { flip: true, poses: [[0, "sit"]], look: -4, out: MK("be") + .9 })
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * ss(s.t1 - .5, s.t1, t))}"/>` + logo(t); };

/* ================================================================ shrink · BE THE THING: a link of the chain ================================================================ */
// micro-world mode: no logo, no score, only the YOU tag and the scale pill. The camera rides with YOU (link 0). The chain stands still, then
// the pedals are pushed: the chain (and you) moves RIGHT along the top, the front gear's teeth grab you; the camera pulls back to see the whole
// loop tugging the back gear and the huge back wheel round; then (speeded up) round the front gear, back underneath (LEFT), round the back
// gear and up into the top again.
const JS = (() => { const S = SCN.shrink, a = MK("jpush"), g = MK("jgrab"), e5 = LT("e605"), end = S.t1, v = 250, Lt = JLOOP.Lt;
  const s0 = Lt - v * (g - a - .25);   // you reach the front gear's teeth on "grab"
  return (t) => { if (t < a) return s0; let s = s0 + v * Math.max(0, t - a - .25) + v * .25 * ss(a, a + .5, t) * 0; if (t > e5) s += 3 * v * (t - e5) * ss(e5, e5 + .6, t); return s; }; })();
function youLink(t, p, k) { const left = Math.cos(p.an * Math.PI / 180) < 0, an = left ? p.an - 180 : p.an;
  return `<g transform="translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(an)})">${TF(0, 0, left ? -1 : 1, linkYouP4(t, JW.pitch, 120), 0, 1)}</g>`; }
SC.shrink = (t, s) => { const sh = JS(t), W_ = jWorld(t, sh, 0), you = W_.you, tW = LT("e604"), zo = eio(clamp((t - tW - .2) / 2.2)), back = LT("e605") + 2.2;
  // the camera: on you (a little behind, so the front gear ahead shows), then pulled back over the whole loop
  const cIn = camOn([you.x + 120, you.y + 40], 1.12, 760, 600), cOut = camOn([1150, 60], .3, 960, 560), c = camMix(cIn, cOut, zo);
  // the huge back wheel round the back gear (rim and spokes), turning with it
  const rw = sh / JW.r2; let wheel = `<circle cx="0" cy="0" r="1980" fill="none" stroke="#2E2F33" stroke-width="110"/><circle cx="0" cy="0" r="1900" fill="none" stroke="#B9C1CB" stroke-width="40"/>`;
  for (let i = 0; i < 18; i++) { const a = rw + i * Math.PI / 9; wheel += `<path d="M0 0 L${n2(1880 * Math.cos(a))} ${n2(1880 * Math.sin(a))}" stroke="#8C96A2" stroke-width="16"/>`; }
  const world = `<rect x="-6000" y="-6000" width="14000" height="12000" fill="#1E2430"/><rect x="-6000" y="-6000" width="14000" height="12000" fill="url(#rimLight)" opacity=".5"/>` + OP(.85, wheel) + W_.s + youLink(t, you, 1);
  // the riders: the three buddies sit on the links just behind you, small, watching the way you go
  const rider = (who, kk, dy) => { const q = JLOOP.at(-kk * JW.pitch + sh + JW.pitch / 2), [X, Y] = camPt(c, [q.x, q.y - 60]); const left = q.seg === "bottom";
    return bd(who, X, Y + dy * c[0], 170 * c[0], t, { in: s.t0 + .8 + kk * .15, poses: who === "momo" ? [[0, "sit"], [MK("wave"), "waving"], [MK("wave") + 1.0, "sit"]] : [[0, "sit"]], flip: left, look: left ? -6 : 6, tag: false, shadow: false, noreact: true }); };
  const riders = c[0] > .5 ? rider("pip", 1.0, 0) + rider("momo", 1.9, 0) + rider("basil", 2.8, 0) : "";   // they ride along while we are close; tiny when the camera pulls back, so they are left out then
  const [yx, yy] = camPt(c, [you.x, you.y]);
  return OP(ramp(t, s.t0, 1.0), CAM(world, c[0], c[1], c[2]) + riders
    + youTag(t, s.t0 + .6, "You: one link of a bike chain") + TF(yx, yy - 120 * c[0] - 20, spring(t, s.t0 + .8, .45) * (zo > .3 ? 1.1 : .9), youPill(0, 0, 1))
    + (t >= MK("jgrab") - .1 && t < tW + .4 ? TF(1300, 220, spring(t, MK("jgrab") - .1, .4) * (1 - ramp(t, tW, .3)), tpill(0, 0, "the front gear's teeth grab you", 36, "#fff", P.ink, { w: 700 })) : "")
    + (t >= MK("jwheel") - .1 && t < back ? TF(560, 300, spring(t, MK("jwheel") - .1, .4) * (1 - ramp(t, back - .3, .3)), tpill(0, 0, "back wheel: turning", 40, P.leaf, "#fff", { w: 700 })) : "")
    + (t >= MK("jtug") - .1 && t < back ? TF(1240, 860, spring(t, MK("jtug") - .1, .4) * (1 - ramp(t, back - .3, .3)), tpill(0, 0, "the chain tugs the back gear round", 36, "#fff", P.ink, { w: 700 })) : "")
    + speeded(t, LT("e605") + .1, s.t1, 1640, 1010))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - ramp(t, s.t0, .6))}"/>`; };

/* ================================================================ pullout + chainfix · FIX 3: THE CHAIN, TESTED ================================================================ */
// the pull-out ends on chainfix's layout (the buddies exactly where chainfix has them). The chain goes back on (speeded up); the mechanic's
// test: Pip lifts the back of the bike, Momo turns the pedal once; the chain moves, the back gear and the back wheel turn; freewheel ticking
const CF = { pip: [600, 1034, 370], momo: [1100, 1062, 330], basil: [1680, 1062, 410] };   // Pip and Momo stand BEHIND the bike (drawn before it)
const cfCam = (t) => { const tL = MK("lift3"), tB = LT("e704m") - .3; return camMix(camMix(camOn([960, 700], 1.0), camOn([800, 880], 1.24, 900, 740), eio(clamp((t - tL) / 1.2))), camOn([960, 700], 1.0), eio(clamp((t - tB) / 1.0))); };
// the drive during the test: the crank turns once from `crank`; the back wheel keeps spinning (freewheel) and slows
const cfDrive = (t) => { const a = MK("crank"), d = 1.4, u = clamp((t - a) / d), cr = .6 + 2 * Math.PI * eio(u), sh = BK.r1 * (cr - .6), w0 = sh / BK.r2, om = BK.r1 * 2 * Math.PI / d / BK.r2 * 1.0;
  const rw = t < a + d ? w0 : w0 + om * 2.6 * (1 - Math.exp(-(t - a - d) / 2.6)), spin = t < a + d ? om * eio(u) * 0 + (u > .1 && u < .9 ? om : 0) : om * Math.exp(-(t - a - d) / 2.6);
  return { cr, sh, rw, blur: clamp(spin / 9) }; };
SC.pullout = (t, s) => { const u = eio((t - s.t0) / (s.t1 - s.t0)), c = camMix(camOn([RB[0] - 40, RB[1] - 120], 4.5), cfCam(s.t1), u);
  return place("vdp4", bcamRaw(c, "pip", ...CF.pip, t, { in: s.t1 - .55, poses: [[0, "sit"]], look: 5 }) + bikeAt(RB[0], RB[1], RK, 0, bikeP4(t, { chain: false, brakes: 0, bell: 0, crank: .6, sh: 0, g2: 0 })), c) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * (1 - ramp(t, s.t0, .5)))}"/>`
    + bcam(c, "momo", ...CF.momo, t, { in: s.t1 - .45, flip: true, poses: [[0, "sit"]], look: -6 }) + bcam(c, "basil", ...CF.basil, t, { in: s.t1 - .35, flip: true, poses: [[0, "sit"]], look: -4 }) + logo(t); };
const fourPics = (t) => { const ids = ["p1", "p2", "p3", "p4"], lab = ["PEDALS", "FRONT GEAR", "CHAIN", "BACK WHEEL"], xs = [420, 780, 1140, 1500];
  const pic = [(tt) => TF(0, 10, 1.3, `<path d="M0 0 L40 -30" stroke="#2B2F36" stroke-width="12" stroke-linecap="round"/><rect x="22" y="-40" width="44" height="16" rx="4" fill="#2B2F36"/><rect x="28" y="-36" width="32" height="8" rx="2" fill="#FFC83A"/>`),
    (tt) => TF(0, 0, 1.45, gearP4(BK.r1, BK.n1, tt * 2)), (tt) => TF(-60, 18, 1, `<g transform="scale(.5 .45)">${chainLoose(220, 70, tt)}</g>`), (tt) => TF(0, 0, .5, wheelP4(BK.R, tt * 3))];
  if (t < MK("p1") - .3 || t > MK("kw_interact") + 2.2) return ""; const k0 = ramp(t, MK("p1") - .3, .3) * (1 - ramp(t, MK("kw_interact") + 1.75, .3));   // gone before INTERACT flies to the shelf
  return OP(k0, xs.map((x, i) => { const lit = t >= MK(ids[i]) - .05, g = lit ? pulse(t, MK(ids[i]), .03, .8) : 0;
    return TF(x, 200, 1 + .12 * g, `<g filter="url(#dropS)"><circle r="78" fill="#FFF8EA" stroke="${lit ? P.leaf : "#C9BFAE"}" stroke-width="${lit ? 10 : 6}"/></g><clipPath id="fp${i}"><circle r="70"/></clipPath><g clip-path="url(#fp${i})" opacity="${lit ? 1 : .45}">${pic[i](t)}</g>` + tpill(0, 126, lab[i], 30, lit ? P.leaf : P.ink, "#fff", { w: 700 }))
      + (i < 3 ? OP(lit ? 1 : .3, fatArrow(x + 96, 200, x + 264, 200, lit ? P.sun : "#fff", 16)) : ""); }).join("")); };
SC.chainfix = (t, s) => { window._BUBAT = { pip: [430, 430], momo: [1200, 640], basil: [1500, 520] }; const c = cfCam(t), tF = MK("fit"), tL = MK("lift3"), tS = MK("spins"), D = cfDrive(t), on = eio(clamp((t - tF + .1) / 1.6));
  const bike = bikeP4(t, { chain: on, brakes: 0, bell: 0, crank: D.cr, sh: D.sh, rw: D.rw, g2: D.sh / BK.r2, blur: D.blur, stand: t < tL });
  const dark = OP(.35 * ramp(t, MK("p1") - .4, .3) * (1 - ramp(t, LE("e705m") + .3, .3)), `<rect width="1920" height="1080" fill="${P.night}"/>`);
  return place("vdp4", bcamRaw(c, "pip", ...CF.pip, t, { poses: [[0, "sit"], [tS - .1, "surprised"], [LT("e703p") - .05, "sit"]], look: 5 }) + bikeAt(RB[0], RB[1], RK, liftA(t, tL, LT("e704m") - .6), bike), c) + speeded(t, tF - .1, tF + 1.6, 1700, 1010)
    + bcam(c, "momo", ...CF.momo, t, { flip: true, poses: [[0, "sit"], [MK("lift3") - .2, "pointing"], [MK("spins") - .05, "sit"]], look: -6 }) + bcam(c, "basil", ...CF.basil, t, { flip: true, poses: [[0, "sit"]], look: -4 })
    + fineP(t, tF + .2, LT("e703p"), "Fixing a chain? Ask an adult to help.")
    + (t >= tS - .1 ? TF(1560, 400, spring(t, tS - .1, .45) * (1 - ramp(t, LE("e703p") + .6, .3)), fixCardP4(t, 3, { k: .5, stamp: ["IT TURNS!", true, tS + .25] })) : "")
    + dark + fourPics(t) + clock(t, s) + HUDP(t); };

/* ================================================================ brakes · THE TWIST: can it stop? ================================================================ */
const BR = [900, GY], BRK = .9;
const brCam = (t) => { const tq = MK("squeeze") - .3, tb = LT("e710") - .2; return camMix(camMix(camOn([960, 640], 1.0), camOn([BR[0] + BRK * BK.HT[0] - 60, BR[1] + BRK * BK.HT[1] - 20], 1.5, 1060, 520), eio(clamp((t - tq) / 1.0))), camOn([960, 640], 1.0), eio(clamp((t - tb) / 1.2))); };
const insetP4 = (t, t0, x, y, title, pic, col, px, py, c, t1) => { if (t < t0) return ""; const k = spring(t, t0, .45) * (1 - ramp(t, t1, .3)); if (k < .02) return ""; const [X, Y] = camPt(c, [px, py]);
  return OP(Math.min(1, k), `<path d="M${x} ${y + 120} L${n2(X)} ${n2(Y)}" stroke="#fff" stroke-width="6" stroke-dasharray="2 12" stroke-linecap="round"/><circle cx="${n2(X)}" cy="${n2(Y)}" r="12" fill="#fff"/>`) + TF(x, y, k, `<g filter="url(#drop)"><rect x="-230" y="-150" width="460" height="300" rx="28" fill="#FFF8EA" stroke="${col}" stroke-width="8"/></g>${pic}` + wrap(title, 30, 420, 700).map((l, i, a) => T(0, 112 + (i - (a.length - 1) / 2) * 34, l, 30, P.ink, { w: 700 })).join("")); };
SC.brakes = (t, s) => { const c = brCam(t), tQ = MK("squeeze"), tR = MK("refit"), tK = MK("think"), tK1 = MK("think1"), tSd = MK("side"), tSy = LT("e714b") - .2;
  const fit = eio(clamp((t - tR - .2) / 2.0)), lit = ramp(t, MK("kw_system") - .2, .5) * (1 - ramp(t, s.t1 - .6, .3));
  const bike = bikeP4(t, { chain: 1, brakes: t < tR ? 0 : fit, bell: t < tR ? 0 : ss(.5, 1, fit), crank: .6, sh: 0, g2: 0, lit: lit * .9 });
  let fx = ""; if (t > tQ - .1 && t < LE("e708p") - 1.2) { const [gx, gy] = camPt(c, [BR[0] + BRK * (BK.HT[0] - 75), BR[1] + BRK * (BK.HT[1] - 54)]); for (let i = 0; i < 2; i++) { const p = pulse(t, tQ + i * .75, .03, .4); fx += OP(p, `<g transform="translate(${n2(gx)} ${n2(gy)}) scale(${n2(c[0])})"><path d="M-34 -26 l-20 -14 M-40 0 h-26 M-34 26 l-20 14 M34 -26 l20 -14 M40 0 h26" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`); } }
  // e710: what each part does (insets joined by lines to where the part goes on the bike)
  const brPic = TF(-90, -20, 1.6, `<path d="M-40 -10 q30 -20 60 -6" stroke="#59616B" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="-60" y="-24" width="36" height="16" rx="7" fill="#2B2F36"/>`) + TF(90, -10, 2.2, caliper(0, 0, 0) + `<path d="M-30 14 A40 40 0 0 1 30 14" stroke="#C9D1DA" stroke-width="6" fill="none"/>`);
  const ins = insetP4(t, MK("brk") - .1, 420, 330, "brakes: help the bike stop safely", brPic, "#E5484D", BR[0] + BRK * 200, BR[1] + BRK * -224, c, MK("refit") + 2.4)
    + insetP4(t, MK("bellw") - .1, 1500, 330, "bell: warns people", TF(0, -10, 4.2, bellP4(.3 * Math.max(0, Math.sin(t * 20)))), P.sun, BR[0] + BRK * (BK.HT[0] - 24), BR[1] + BRK * (BK.HT[1] - 66), c, MK("refit") + 2.4);
  // the think card: a bell rolling away; two choices drawn big
  const think = t >= tK - .1 && t < LE("e712p") + .4 ? (() => { const k = spring(t, tK - .1, .45) * (1 - ramp(t, LE("e712p") + .1, .3)), rx = 140 * ((t - tK) % 3) / 3;
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * Math.min(1, k))}"/>` + TF(960, 520, k, `<g filter="url(#drop)"><rect x="-560" y="-330" width="1120" height="660" rx="44" fill="#FFF8EA" stroke="${P.ink}" stroke-width="8"/></g>`
      + `<g transform="translate(-400 -262)">${tpill(0, 0, "THINK!", 40, P.sun, P.ink, { w: 700 })}</g>` + T(80, -250, "If the bell falls off on the ride,", 42, P.ink, { w: 700 }) + T(80, -196, "can the bike still move?", 42, P.ink, { w: 700 })
      + TF(-60 + rx, -96, 2.6, `<g transform="rotate(${n2(rx * 2)})">${bellP4()}</g>`) + `<path d="M-300 -36 h600" stroke="#C9BFAE" stroke-width="6"/>`
      + [["moves", -260, P.leaf], ["cannot move", 260, "#E5484D"]].map(([w, x, col], i) => TF(x, 140, 1, `<g filter="url(#dropS)"><rect x="-230" y="-120" width="460" height="230" rx="30" fill="#fff" stroke="${col}" stroke-width="8"/></g>` + TF(0, 10, .32, bikeP4(t, { chain: 1, crank: i ? .6 : t * 3, sh: i ? 0 : BK.r1 * t * 3, bell: 0, rw: i ? 0 : BK.r1 * t * 3 / BK.r2 })) + (i ? `<path d="M-90 -60 L90 60 M90 -60 L-90 60" stroke="#E5484D" stroke-width="0"/>` : "") + T(0, 92, w, 42, col))).join(""))
      + (t >= tK1 - 3.5 && t < tK1 ? T(960, 940, ["●○○", "●●○", "●●●"][Math.min(2, Math.floor((t - tK1 + 3.5) / 1.17))], 60, "#fff") : ""); })() : "";
  // e713: the same bike twice, side by side
  const side = t >= tSd - .1 && t < tSy ? (() => { const k = spring(t, tSd - .1, .45) * (1 - ramp(t, tSy - .2, .3));
    return `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.45 * Math.min(1, k))}"/>` + [["no chain: cannot move", 560, false, 1], ["no bell: moves, but less safe", 1360, 1, 0]].map(([w, x, ch, bl], i) => TF(x, 520, k, `<g filter="url(#drop)"><rect x="-370" y="-260" width="740" height="520" rx="34" fill="#FFF8EA" stroke="${i ? P.sun : "#E5484D"}" stroke-width="8"/></g>` + TF(0, 130, .62, bikeP4(t, { chain: ch, bell: bl, brakes: 1, crank: i ? t * 2.5 : .6, sh: i ? BK.r1 * t * 2.5 : 0, rw: i ? BK.r1 * t * 2.5 / BK.r2 : 0, fw: i ? BK.r1 * t * 2.5 / BK.r2 : 0, stand: !i })
      + (i ? `<circle cx="${BK.HT[0] - 24}" cy="${BK.HT[1] - 66}" r="40" fill="none" stroke="#E5484D" stroke-width="7" stroke-dasharray="12 10"/>` + [0, 1, 2].map((j) => `<path d="M${-420 - j * 10} ${-260 + j * 70} h-90" stroke="#5B6B80" stroke-width="12" stroke-linecap="round" opacity=".6"/>`).join("")
         : `<ellipse cx="${(BK.RA[0] + BK.BB[0]) / 2}" cy="${(BK.RA[1] + BK.BB[1]) / 2}" rx="160" ry="60" fill="none" stroke="#E5484D" stroke-width="7" stroke-dasharray="12 10"/>`)) + T(0, 220, w, 36, P.ink, { w: 700 }))).join(""); })() : "";
  window._BUBAT = t >= tK - .1 && t < LE("e712p") + .4 ? { pip: [1200, 960] } : {};
  return place("vdp4", TF(...BR, BRK, bike), c) + fx
    + bcam(c, "pip", ...SAD(BR[0], BR[1], BRK), 330 * BRK, t, { poses: [[0, "sit"], [LE("e711") - 2.4, "thinking"], [LT("e712p") - .1, "sit"]], look: 3 })
    + bcam(c, "basil", 300, 1062, 430, t, { poses: [[0, "sit"]], look: 4 }) + bcam(c, "momo", 1620, 1062, 420, t, { flip: true, poses: [[0, "sit"], [LE("e708p") + .1, "surprised"], [LT("e709m") - .05, "sit"]], look: -4 })
    + ins + speeded(t, tR, tR + 2.6, 1700, 1010) + fineP(t, tR + .2, tK - .2, "Check your brakes before every ride.") + think + side + clock(t, s) + HUDP(t); };

/* ================================================================ ride · THE RIDE ================================================================ */
// the park connector; Pip rides RIGHT (front wheel leading), the camera tracks with him; Momo and Basil jog alongside on the grass verge;
// other children of the class ride far off (the same way)
const RIDEV = 430, RIDEK = .78;
SC.ride = (t, s) => { const u = t - s.t0, cx = RIDEV * u, bx = 740 + 30 * Math.sin(u * .7), by = 980, om = RIDEV / (BK.R * RIDEK), whl = om * u, cr = whl * BK.r2 / BK.r1;
  const kids = [[200, "#3AA6E8", "#FF6F61", .3], [1250, "#43BF6C", "#FFC83A", .28], [1650, "#9B6BFF", "#3AA6E8", .26]].map(([x0, col, hel, k], i) => TF(n2(x0 + 18 * u), 806 + i * 4, k, kidRiderP4(t + i, col, hel))).join("");
  const bike = TF(bx, by, RIDEK, bikeP4(t, { chain: 1, crank: cr, sh: BK.r1 * cr, rw: whl, fw: whl, brakes: 1, bell: 1, stand: false, blur: .35, fblur: .35 }));
  let puff = ""; if (t > LT("e802m") - .6) for (let i = 0; i < 3; i++) { const v = ((t * .9 + i / 3) % 1), [px, py] = SAD(bx, by, RIDEK); puff += `<circle cx="${n2(px + 120 + 70 * v)}" cy="${n2(py - 200 - 50 * v)}" r="${n2(12 + 18 * v)}" fill="#fff" opacity="${n2(.7 * (1 - v))}"/>`; }
  const step = (ph) => [...Array(20)].map((_, i) => [s.t0 + .2 + i * .42 + ph, 14]);
  return pcSet(t, cx) + kids + bike + pipRide(t, bx, by, RIDEK, { poses: [[0, "sit"]], bob: 3 * Math.sin(u * 9), look: 5 }) + puff
    + bd("momo", 1440, 1072, 350, t, { poses: [[0, "sit"]], look: 6, jump: step(0) }) + bd("basil", 1720, 1072, 360, t, { poses: [[0, "sit"]], look: 6, jump: step(.2) })
    + OP(ramp(t, s.t0 + .2, .4) * (1 - ramp(t, s.t0 + 5, .4)), lowerPill(60, 140, "The park connector ·", "the class bike ride")) + clock(t, s) + HUDP(t); };

/* ================================================================ inpip · LOOK CLOSER: inside Pip ================================================================ */
// a see-through window on Pip's leg: off-white bones, pink muscles; then a window on his chest: a red heart beating faster, pink lungs filling
// faster. Nothing purple; no system names (P4 EP5 teaches them)
const legWin = (t, k) => `<g filter="url(#dropS)"><circle r="96" fill="#FFE9DD" stroke="${P.ink}" stroke-width="8"/></g><clipPath id="lwP4"><circle r="90"/></clipPath><g clip-path="url(#lwP4)"><g transform="rotate(${n2(18 + 6 * Math.sin(t * 5))})"><ellipse cx="-34" cy="0" rx="34" ry="92" fill="#F28B8B" stroke="#C2565C" stroke-width="4"/><ellipse cx="34" cy="6" rx="30" ry="84" fill="#F4A1A1" stroke="#C2565C" stroke-width="4"/>`
  + `<path d="M-6 -86 Q-20 -96 -10 -110 Q6 -116 8 -98 L8 98 Q22 108 10 120 Q-8 124 -8 104z" fill="#F7F1E3" stroke="#B8AE98" stroke-width="5"/></g></g>`;
const chestWin = (t, k, beat, breath) => { const hb = 1 + .1 * Math.pow(Math.max(0, Math.sin(t * beat)), 6), lb = 1 + .08 * Math.sin(t * breath);
  return `<g filter="url(#dropS)"><rect x="-170" y="-130" width="340" height="260" rx="60" fill="#FFE9DD" stroke="${P.ink}" stroke-width="8"/></g>`
    + TF(-78, -6, lb, `<path d="M0 -90 Q-60 -80 -66 0 Q-70 80 -10 90 Q20 60 22 -60 Q20 -92 0 -90z" fill="#F4A1B4" stroke="#C25A75" stroke-width="5"/>`) + TF(78, -6, lb, `<path d="M0 -90 Q60 -80 66 0 Q70 80 10 90 Q-20 60 -22 -60 Q-20 -92 0 -90z" fill="#F4A1B4" stroke="#C25A75" stroke-width="5"/>`)
    + TF(6, 30, hb, `<path d="M-30 -40 Q-52 -30 -48 6 Q-42 44 0 66 Q40 46 46 6 Q50 -34 22 -40 Q6 -44 0 -30 Q-10 -46 -30 -40z" fill="#D93A46" stroke="#8E1E2A" stroke-width="5"/><path d="M-6 -40 v-26 M14 -42 q6 -20 20 -24" stroke="#8E1E2A" stroke-width="10" stroke-linecap="round" fill="none"/>`); };
SC.inpip = (t, s) => { const k = ramp(t, s.t0, .45), tB = MK("bones"), tM = MK("muscles"), tH = MK("heart"), tBr = MK("breath"), tW = MK("widen");
  const PX = [760, 900, 600], bob = 6 * Math.sin(t * 4.2);
  let body = ""; const lw = [PX[0] + 190, PX[1] - 50 + bob], cw = [PX[0] + 10, PX[1] - 210 + bob];
  if (t >= tB - .3) body += TF(...lw, .9 * spring(t, tB - .3, .45), legWin(t, 1)) + (t >= tB ? OP(spring(t, tB, .4), plabel(1250, 880, "bones", lw[0] + 10, lw[1] + 20, 40, "#fff")) : "") + (t >= tM ? OP(spring(t, tM, .4), plabel(1250, 770, "muscles", lw[0] + 50, lw[1] - 30, 40, "#fff")) : "");
  if (t >= tH - .3) body += TF(...cw, .72 * spring(t, tH - .3, .45), chestWin(t, 1, t > tW ? 13 : 9, t > tW ? 6 : 4)) + OP(spring(t, tH, .4), plabel(1250, 650, "heart: beats faster", cw[0] + 20, cw[1] + 26, 38, "#fff")) + (t >= tBr ? OP(spring(t, tBr, .4), plabel(1250, 540, "lungs: breathe faster", cw[0] + 70, cw[1] - 20, 38, "#fff")) : "");
  window._BUBAT = { basil: [1260, 1000] };
  return `<g filter="url(#b10)">${pcSet(t, 3200)}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(k, panelP4(1))
    + OP(k, TF(960, 110, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + bd("pip", PX[0], PX[1] + bob, PX[2], t, { in: s.t0 - .5, poses: [[s.t0, "sit"], [W("e805b", "very") - .1, "oops"], [LE("e805b") + .6, "sit"]], tag: false, noreact: true, look: 2 }) + OP(k, body)
    + bd("momo", 1560, 1076, 330, t, { in: s.t0 - .5, ...watchO(1560, 760), poses: [[s.t0, "sit"]] }) + bd("basil", 1790, 1076, 340, t, { in: s.t0 - .5, ...watchO(1790, 760), poses: [[s.t0, "sit"]] }) + HUDP(t); };

/* ================================================================ tree · A TREE IS A SYSTEM TOO ================================================================ */
const treeCam = (t) => camMix(camOn([960, 860], 1.18, 960, 700), camOn([960, 560], 1.0), eio(clamp((t - SCN.tree.t0) / 4.0)));
const parkedRow = (t) => TF(690, 850, .26, bikeP4(t, { chain: 1, crank: 1, sh: 0, brakes: 1, bell: 1 }).replace(/url\(#bkFrame\)/g, "#3AA6E8")) + TF(1290, 846, .25, bikeP4(t, { chain: 1, crank: 2, sh: 0, brakes: 1, bell: 1 }).replace(/url\(#bkFrame\)/g, "#43BF6C"));
const TB = { pip: [190, 1062, 380], momo: [420, 1062, 360], basil: [1700, 1062, 400] };
SC.tree = (t, s) => { const c = treeCam(t), tl = (mk, txt, x, y, px, py) => t >= MK(mk) - .1 ? OP(spring(t, MK(mk) - .1, .4), plabel(x, y, txt, ...camPt(c, [px, py]), 44, "#fff")) : "";
  return place("rtp4", parkedRow(t) + TF(1230, 1040, .85, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1 })), c)
    + bcam(c, "pip", ...TB.pip, t, { ...watchO(190, 960), poses: [[0, "sit"]] }) + bcam(c, "momo", ...TB.momo, t, { ...watchO(420, 960), poses: [[0, "sit"]] }) + bcam(c, "basil", ...TB.basil, t, { flip: true, poses: [[0, "sit"]], look: -4 })
    + tl("lv", "leaves", 1240, 250, 1260, 230) + tl("stm", "stem", 620, 600, 935, 560) + tl("rts", "roots", 640, 700, 830, 785)
    + HUDP(t); };

/* ================================================================ words · THE WORDS THAT EARN MARKS ================================================================ */
const recap = (t, t0) => OP(ramp(t, t0, .4), [["cannot move", 760, { chain: false, bell: 0, brakes: 0 }, "#E5484D"], ["it turns", 1180, { chain: 1, bell: 0, brakes: 0 }, P.leaf], ["less safe", 1600, { chain: 1, bell: 0, brakes: 1 }, "#E89A2E"]].map(([w, x, o, col]) =>
  TF(x, 985, .32, bikeP4(t, { crank: .6, sh: 0, ...o })) + tpill(x, 1030, w, 28, col, "#fff", { w: 700 })).join(""));
SC.words = (t, s) => markScene(t, s, { id: "e903b", sayId: "e902b", who: "basil", tab: "WORDS THAT EARN MARKS", text: TL.lines.e903b.text, keys: ["system", "parts", "function", "interact", "likely", "affected"], size: 50, y: 170, footer: FOOT, achieved: true, poses: [[LE("e903b") + .2, "sit"]], bin: s.t0 - .5, extra: recap(t, s.t0 + 1.2) });

/* ================================================================ callback · THE CALLBACK JOKE, THE BELL (Heart's hint #2), THE SCORE ================================================================ */
// under the rain tree: Pip (a spanner in his paw) eyes Basil's tail; Basil, arms crossed; Pip rings his restored bell (the camera pushes onto
// it): HEART MYSTERY HINT #2, for 6 frames the bell's chrome dome reflects the logo-pill heart; the score
const CBK = [900, GY], CBKK = .85, BELLW = [CBK[0] + CBKK * (BK.HT[0] - 24), CBK[1] + CBKK * (BK.HT[1] - 66)];
const HINT0 = () => W("e1003p", "ring", 1) + .08;   // the second "ring": 6 frames (0.2 s)
SC.callback = (t, s) => { const tR = MK("ring"), tB = LT("e1004") - .2, c = camMix(camMix(camOn([960, 640], 1.0), camOn(BELLW, 4.2, 960, 560), eio(clamp((t - tR + .5) / .9))), camOn([960, 640], 1.0), eio(clamp((t - tB) / 1.0)));
  const ring = Math.max(pulse(t, W("e1003p", "ring"), .02, .25), pulse(t, W("e1003p", "ring", 1), .02, .25)), h0 = HINT0(), heart = t >= h0 && t < h0 + .2 ? 1 : 0;
  const bike = TF(...CBK, CBKK, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1, ring, heart }));
  window._BUBAT = { pip: [560, 400], basil: [1250, 400], momo: [1450, 420] };
  return place("rtp4", parkedRow(t) + bike, c)
    + bcam(c, "pip", 290, 1062, 420, t, { poses: [[0, "sit"]], look: 5 }) + (t < tR + .2 || t > tB ? heldC(c, "pip", 290, 1062, 420, false, TF(0, 0, .9, spannerP4()), -10, 20) : "")
    + bcam(c, "basil", 1450, 1062, 400, t, { flip: true, poses: [[0, "sit"], [LE("e1001p") + .1, "arms_crossed"], [LT("e1002b") - .05, "sit"], [LE("e1002b") + .1, "arms_crossed"], [tR, "sit"]], look: -4 })
    + bcam(c, "momo", 1760, 1062, 370, t, { flip: true, poses: [[0, "sit"], [MK("coin1"), "cheer"], [MK("coin1") + 2.2, "sit"]], look: -4, achieved: true })
    + (t >= MK("coin1") ? coin(t, MK("coin1"), 1640, 160) : "") + HUDP(t); };

/* ================================================================ next · THE LINK TO EP2: the Science Help Desk; Chilli hops in ================================================================ */
// Chilli the chilli-padi plant (a guest for EP2): a terracotta pot with a face, wet dark soil, thin stems with narrow leaves hanging LIMP
// (wilting), a few small upright chilli padi fruits; origin = the bottom of the pot. droop 0..1
/* FACES: none */ function chilliP4(t, o = {}) { const d = o.droop === undefined ? 1 : o.droop, look = o.look || 0; let s = `<ellipse cx="0" cy="4" rx="96" ry="14" fill="#2B2147" opacity=".22"/>`;
  const stems = [[-40, -230, -6], [0, -270, 0], [40, -235, 6], [-18, -200, -3], [22, -205, 4]];
  for (const [x, y, r] of stems) s += `<path d="M0 -150 Q${x * .4} ${(y - 150) / 2} ${x} ${y}" stroke="#5E8F3A" stroke-width="7" fill="none"/>`;
  for (const [i, [x, y]] of stems.entries()) for (let j = 0; j < 3; j++) { const sd = j % 2 ? 1 : -1, a = (sd * (40 + 70 * d) + 90 * d * (sd < 0 ? -1 : 1) * .3), bx = x * (.5 + .25 * j), by = y + (150 + y) * -.25 * j - 10;
    s += `<g transform="translate(${n2(bx)} ${n2(by)}) rotate(${n2(sd * (35 + 95 * d))})"><path d="M0 0 Q22 -8 64 0 Q22 10 0 0z" fill="${["#6DB548", "#5E9E3E", "#7FC85A"][(i + j) % 3]}" stroke="#3F7A2A" stroke-width="2"/></g>`; }
  for (const [x, y] of [[-30, -190], [26, -214], [8, -244]]) s += `<path d="M${x} ${y + 26} q0 -10 2 -16" stroke="#5E8F3A" stroke-width="4"/><path d="M${x - 6} ${y + 10} Q${x} ${y - 30} ${x + 6} ${y + 10}z" fill="#E5333B" stroke="#9E1E24" stroke-width="2"/>`;
  s += `<path d="M-90 -160 L90 -160 L70 0 L-70 0z" fill="#C8683F" stroke="#8E4426" stroke-width="5"/><rect x="-100" y="-176" width="200" height="30" rx="8" fill="#D9794D" stroke="#8E4426" stroke-width="5"/><ellipse cx="0" cy="-170" rx="88" ry="10" fill="#4A3324"/>`;
  s += `<g transform="translate(${look * 10} 0)"><ellipse cx="-28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><ellipse cx="28" cy="-92" rx="11" ry="${n2(14 - 5 * d)}" fill="#2B2147"/><circle cx="-24" cy="-96" r="3.5" fill="#fff"/><circle cx="32" cy="-96" r="3.5" fill="#fff"/><path d="M-16 -58 q16 -10 32 0" stroke="#2B2147" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-44" cy="-70" rx="12" ry="7" fill="#F28B8B" opacity=".6"/><ellipse cx="44" cy="-70" rx="12" ry="7" fill="#F28B8B" opacity=".6"/></g>`;
  return s; }
const deskP4 = (t, ding) => `<rect x="-260" y="0" width="520" height="28" rx="6" fill="url(#deskTop)" stroke="#A39B8C" stroke-width="4"/><path d="M-230 28 L-250 200 M230 28 L250 200 M-230 28 L-190 200 M230 28 L190 200" stroke="#8C96A2" stroke-width="9"/>`
  + `<g transform="translate(150 0)"><rect x="-40" y="-10" width="80" height="12" rx="4" fill="#59616B"/><path d="M-30 -10 Q-30 -46 0 -46 Q30 -46 30 -10z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><rect x="-4" y="${n2(-58 + 6 * ding)}" width="8" height="12" rx="3" fill="#2B2F36"/></g>`
  + `<g transform="translate(-100 -70) rotate(-3)"><g filter="url(#dropS)"><rect x="-150" y="-50" width="300" height="104" rx="10" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -10, "SCIENCE", 34, "#D9402A")}${T(0, 34, "HELP DESK", 34, P.ink)}</g><path d="M-160 -18 v18 M-40 -18 v18" stroke="#8A5A2B" stroke-width="6"/>`;
SC.next = (t, s) => { const th = MK("hop"), tA = th + 1.5, u = clamp((t - th) / 1.5), x = lerp(2080, 1500, u), hopY = u < 1 ? -60 * Math.abs(Math.sin(u * Math.PI * 4)) : 0, droop = .7 + .3 * ss(tA, tA + .6, t), ding = pulse(t, LT("e1102g") - .15, .02, .3);
  const c = camMix(camOn([960, 640], 1.0), camOn([1350, 800], 1.18, 1050, 640), eio(clamp((t - tA) / 3)));
  let dust = ""; if (u > 0 && u < 1.1) for (let i = 1; i <= 4; i++) { const ti = th + i * 1.5 / 4, v = t - ti; if (v > 0 && v < .6) dust += `<ellipse cx="${n2(lerp(2080, 1500, i / 4))}" cy="1050" rx="${n2(40 + 80 * v)}" ry="${n2(10 + 10 * v)}" fill="#E8DCC7" opacity="${n2(.8 * (1 - v / .6))}" filter="url(#b4)"/>`; }
  const set = `<rect x="-200" y="-120" width="2320" height="1320" fill="#FFB866" opacity=".12"/>` + TF(1150, 860, 1, deskP4(t, ding)) + dust + (t >= th ? TF(x, 1058 + hopY, .95, chilliP4(t, { droop, look: u < 1 ? -1 : -.4 })) : "");
  window._BUBAT = { pip: [520, 420], momo: [700, 420], basil: [900, 420] };
  const sur = LT("e1102g") - .3;
  return place("vdp4", set, c) + bcam(c, "pip", 260, 1062, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [sur, "surprised"], [sur + 2.4, "sit"]], look: 4 }) + bcam(c, "momo", 520, 1062, 370, t, { in: s.t0 - .5, poses: [[0, "sit"], [sur + .1, "surprised"], [sur + 2.5, "sit"]], look: 4 })
    + bcam(c, "basil", 780, 1062, 380, t, { in: s.t0 - .5, poses: [[0, "sit"], [sur + .2, "surprised"], [sur + 2.6, "sit"]], look: 4 })
    + (t >= LT("e1102g") - .05 ? say("e1102g", ...camPt(c, [1500, 600]), t, { size: 40, maxW: 560, tail: 40 }) : "")
    + OP(ramp(t, s.t0 + .1, .4) * (1 - ramp(t, s.t0 + 4.5, .4)), lowerPill(60, 140, "The void deck ·", "that afternoon")) + logo(t); };

/* ================================================================ "Now you know!" (the prop: the fixed bike, bell and brakes on, the rain tree behind) ================================================================ */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 640, .34, rainTreeP4(0, 0, 1)) + TF(880, 1000, .8, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1 })), { bx: [250, 1700, 1400], hx: 470 });

/* ================================================================ blooper ================================================================ */
// Pip, beside his bike, rings the bell proudly: the seat pops off with a "boing" and lands low on the grass beside him
SC.blooper = (t, s) => { const tk = MK("take2"), tb = MK("boing"), BKB = [940, GY], up = t < tb ? 0 : clamp((t - tb) / .9);
  const seat = up > 0 ? (() => { const x0 = BKB[0] + .9 * BK.ST[0], y0 = BKB[1] + .9 * BK.ST[1], x = lerp(x0, x0 - 260, up), y = lerp(y0, 1040, up) - 220 * Math.sin(Math.PI * up); return TF(x, y, .9, `<g transform="rotate(${n2(-200 * up)})"><path d="M-46 2 Q-40 -14 0 -12 L42 -4 Q44 8 20 10 Q-10 14 -46 2z" fill="#2B2F36"/><path d="M0 10 v20" stroke="#8C96A2" stroke-width="10"/></g>`); })() : "";
  return bg("stage") + `<rect width="1920" height="1080" fill="#000" opacity=".2"/>` + TF(960, 250, spring(t, s.t0 + .05, .4), clapper27(t > tk ? 1 - ramp(t, tk, .12) : (t < s.t0 + .4 ? 1 : 0)))
    + TF(...BKB, .9, bikeP4(t, { chain: 1, crank: .6, sh: 0, brakes: 1, bell: 1, saddle: t < tb, ring: pulse(t, LT("e1601p") + .1, .02, .25) })) + seat
    + (t >= tb && t < tb + .8 ? impactFX(t, tb, BKB[0] - 100, 700, "BOING!", { s: .4, flash: false, size: 56 }) : "")
    + bd("pip", 1290, 1076, 400, t, { in: s.t0 - .5, poses: [[0, "sit"], [tb + .3, "oops"]], look: -3 }) + bd("basil", 330, 1076, 420, t, { in: s.t0 - .5, poses: [[0, "sit"], [LE("e1602b") + .05, "laughing"]], look: 3 })
    + bd("momo", 1660, 1076, 400, t, { in: s.t0 - .5, flip: true, poses: [[0, "sit"]], look: -3 }) + OP(ramp(t, s.t0, .3), T(960, 470, "(bloopers)", 40, "#fff", { w: 500 })) + logo(t); };
})(); }
