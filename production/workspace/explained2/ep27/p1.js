// p1.js: P3 EP27, the P3-to-P4 Bridge (P3 Finale / P4 Pilot), "The Great Ice Cream Rescue": the whole episode (one video). Segments 1-16
// of ../p3_ep27_bridge_script.md section 4 (version 1, 25 Nov 2026, Opus). One estate on a hot afternoon: the mama shop, the sunny path,
// the covered walkway, the void deck. The buddies stand IN the scene, big, with a contact shadow, drawn in screen space over the camera'd
// set (ep22's way): when the camera pushes, a buddy that belongs to the set is moved with camPt (bcam). Every action is drawn AT its mark.
if (PART === 1) { (() => {
const bd = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, o);
const bcam = (c, who, x, y, h, t, o = {}) => { const [X, Y] = camPt(c, [x, y]); return buddy(who, X, Y, h * c[0], t, o); };
const held = (who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [px, py] = pawPt(who, x, y, h, flip); return TF(px + (flip ? -dx : dx), py + dy, 1, flip ? `<g transform="scale(-1 1)">${inner}</g>` : inner); };
const heldC = (c, who, x, y, h, flip, inner, dy = 0, dx = 0) => { const [X, Y] = camPt(c, [x, y]); return held(who, X, Y, h * c[0], flip, TF(0, 0, c[0], inner), dy * c[0], dx * c[0]); };
const place = (name, inner, c) => CAM(bg(name) + inner, c[0], c[1], c[2]);
const FOOT = "P3 to P4 · Heat · Good and poor conductors of heat";
// the score (script section 3): the fix pick; the viewers who picked 3 and Basil (who picked 3) each get a point at e1105
SCORE.push([MK("coin1") - .05, 1, 1]);
window.SHELF_AWAY = () => 0;

/* ---------------- the party clock (story time): anchors [t, seconds left, roll seconds] ---------------- */
const CLK = [[SCN.cold.t0, 1200, .01], [SCN.run.t0, 1140, .7], [SCN.fan.t0, 1020, .7], [SCN.scarf.t0, 900, .7], [SCN.test.t0, 840, .7], [MK("lapse"), 540, MK("lapse1") - MK("lapse")],
  [SCN.walk.t0, 515, .5], [SCN.walk.t0 + .6, 200, SCN.walk.t1 - SCN.walk.t0 - .8], [SCN.party.t0, 60, .7]];
function clockAt(t) { let v = CLK[0][1];
  for (let i = 0; i < CLK.length; i++) { const [ta, va, d] = CLK[i]; if (t < ta) break; const from = i ? Math.max(0, CLK[i - 1][1] - Math.max(0, ta - CLK[i - 1][0] - CLK[i - 1][2])) : va;
    v = t < ta + d ? lerp(from, va, eio((t - ta) / d)) : va - (t - ta - d); }
  return Math.max(0, v); }
const CLOCK_ON = { cold: 1, run: 1, fan: 1, scarf: 1, test: 1, wool: 1, walk: 1, drain: 1, party: 1 };
const clock = (t, s, k0 = 1) => { const tIn = s.name === "cold" ? MK("clock") - .1 : s.t0, prevOn = CLOCK_ON[(TL.scenes[TL.scenes.indexOf(s) - 1] || {}).name], kin = s.name === "cold" ? spring(t, tIn, .45) : (prevOn ? 1 : spring(t, s.t0 + .1, .45));
  const kout = s.name === "party" ? 1 - ramp(t, LE("e1102m") + .4, .3) : 1; return clockPill(t, clockAt(t), k0 * kin * kout, 960, 62); };
const HUD27 = (t) => HUD(t);

/* ================================================================ 1 · THE PROBLEM ================================================================ */
// the mama shop; the freezer at x 690..1110 (its glass top at y 614); the box on it at (900, 618); the thermometer on the pillar (1195, 440)
const BOXP = [900, 618], MS = { pip: [330, 1062, 470], basil: [1450, 1062, 440], momo: [1710, 1062, 430] };
const msCam = (t) => camMix(camOn([960, 560], 1.0), camOn([1000, 600], 1.07), eio(clamp((t - SCN.cold.t0) / Math.max(1, SCN.cold.t1 - SCN.cold.t0))));
const msLive = (t, c, o = {}) => shimmer27(t, 1300, 2080, 920, 9, .55) + TF(1195, 440, .82, therm27(33, 1, o.thermGlow || 0)) + (o.box === false ? "" : TF(BOXP[0], BOXP[1], 1, iceBox27(t, o.boxO || {})));
SC.cold = (t, s) => { const c = msCam(t), tT = MK("therm"), tb = LE("e105b") + .05;
  return place("ms27", msLive(t, c, { thermGlow: pulse(t, tT, .04, 1.2), boxO: { sweat: .3 * ramp(t, tT, 2) } }) + (t >= tT ? TF(1195, 250, spring(t, tT, .4), tempTag(0, 0, "33 °C", true)) : ""), c)
    + bcam(c, "pip", ...MS.pip, t, { poses: [[0, "sit"], [LE("e104p") + .1, "sit"]], look: 3 })
    + bcam(c, "basil", ...MS.basil, t, { flip: true, poses: [[0, "sit"], [tb, "worried"], [s.t1 + 1, "sit"]], look: -5 })
    + bcam(c, "momo", ...MS.momo, t, { flip: true, poses: [[0, "sit"]], look: -5 })
    + clock(t, s) + OP(ramp(t, .15, .4) * (1 - ramp(t, 6.5, .4)), lowerPill(60, 140, "A mama shop at the foot of an HDB block ·", "the last day of P3")) + logo(t); };

/* title: THE GREAT ICE CREAM RESCUE (slam), the sun and a melting cup */
const slam27 = (txt, y, size, col, k) => k <= 0 ? "" : TF(960, y, lerp(2.4, 1, eo(k)) * (1 + .05 * wob(k, 1, .4)), `<g transform="translate(0 6)" opacity=".7">${T(0, size * .35, txt, size, P.ink, { ls: 4 })}</g>` + T(0, size * .35 - 6, txt, size, col, { ls: 4 }));
SC.title = (t, s) => { const u = t - MK("title"), k1 = clamp(u / .16), k2 = clamp((u - .35) / .16), k3 = clamp((u - .7) / .16);
  return bg("stage2") + sun27(t, 1640, 220, 90) + TF(330, 900, 1.25 + .03 * Math.sin(t * 3), cup27(t, { melt: .25 + .1 * Math.sin(t * 2) })) + TF(1600, 960, .95, iceBox27(t, { wrap: 1 }))
    + slam27("THE GREAT", 300, 120, "#fff", k1) + slam27("ICE CREAM", 470, 190, P.sun, k2) + slam27("RESCUE!", 650, 150, "#fff", k3) + HUD27(t); };

/* ================================================================ 2 · THE FIX CARDS ================================================================ */
const CX3 = [560, 960, 1360];
const cardsRow = (t, y, k, o = {}) => [1, 2, 3].map((n) => { const ti = o.tin ? o.tin[n - 1] : -9, kk = k * (ti > -9 ? spring(t, ti, .45) : 1); if (kk < .02) return "";
  const said = o.said ? pulse(t, o.said[n - 1], .04, .6) : 0; return TF(CX3[n - 1], y - 18 * said, kk * (1 + .06 * said), fixCard27(t, n, { glow: o.glow ? o.glow(n) : said, stamp: o.stamp ? o.stamp(n) : null, dim: o.dim ? o.dim(n) : 0 })); }).join("");
SC.fixcards = (t, s) => { const L = "e201p", tc = [MK("c1"), MK("c2"), MK("c3")];
  return `<g filter="url(#b4)">${place("ms27", msLive(t, null), [1.05, 960, 560])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".55"/>`
    + OP(ramp(t, s.t0 + .1, .3), T(960, 130, "PIP'S THREE FIXES", 64, P.sun, { ls: 6 })) + cardsRow(t, 560, .78, { tin: tc.map((x) => x - .1), said: tc })
    + bd("pip", 160, 1076, 400, t, { in: s.t0 + .05, poses: [[s.t0, "sit"], [LE(L) + .1, "pointing"], [LT("e202") + 1.2, "sit"]], look: 4 })
    + (t >= MK("show") - .1 ? TF(1760, 960, spring(t, MK("show") - .1, .4), countHand(3, {})) : "") + HUD27(t); };

/* the lock-in: the three cards stay (one set, numbered); the ring with the problem in it is big and central; one buddy (Pip) worried */
SC.lock = (t, s) => { const r0 = MK("ring0_fix"), bell = MK("bell_fix"), rs = ringState(t, r0, 6), inT = t >= r0 && t < bell, shut = pulse(t, bell, .01, .6), b = Math.floor(t - r0);
  const ring = ringTimer(960, 300, t < bell ? rs.frac : 0, t < bell ? rs.secs : 0, t, { R: 190, sw: 32, tick: rs.tick, shut, chg: inT || (t >= bell && t < bell + .5) ? (t >= bell ? bell : rs.chg) : -9, ns: 1.2,
    inner: `<clipPath id="lk27"><circle cx="960" cy="300" r="166"/></clipPath><circle cx="960" cy="300" r="166" fill="#BFE6FF"/><g clip-path="url(#lk27)">${sun27(t, 1050, 200, 40)}${TF(960, 420, .62, iceBox27(t, { sweat: .5 }))}${TF(870, 250, .9, tempTag(0, 0, "33 °C", true))}</g>` });
  return bg("stage") + OP(ramp(t, s.t0, .3), T(960, 70, "Which fix gets the ice cream there still frozen?", 46, "#fff", { w: 600 })) + TF(960, 300, spring(t, s.t0, .45) * (1 + .03 * (inT ? rs.tick : 0)), `<g transform="translate(-960 -300)">${ring}</g>`)
    + cardsRow(t, 790, .62, { said: [0, 0, 0].map((_, i) => inT && b % 3 === i ? t : -9), glow: (n) => (inT && b % 3 === n - 1 ? .5 + rs.tick * .5 : 0) })
    + OP(ramp(t, r0 - .15, .2) * (t < bell ? .75 + .25 * Math.sin(t * 9) : 1), T(1500, 300, "LOCK IT IN!", 44, P.sun, { ls: 6 }))
    + (t >= bell + .05 ? stamp(t, bell + .05, 960, 300) : "")
    + bd("pip", 190, 1076, 420, t, { in: s.t0 - 1, poses: [[s.t0 - 1, "worried"], [bell + .4, "sit"]], look: 4, jump: [[r0 + 1.5, 14], [r0 + 3.5, 14]] }) + HUD27(t); };

/* the picks: the cards rise to a top row; each buddy stands under the card they pick (Pip 1, Momo 2, Basil 3) */
SC.picks = (t, s) => { window._BUBAT = { pip: [330, 600], momo: [960, 590], basil: [1600, 600] }; const up = eio((t - s.t0) / .6), y = lerp(790, 345, up), k = lerp(.62, .64, up), tp = { pip: LT("e203p"), momo: LT("e204m"), basil: LT("e205b") };
  const pick = (who, n) => t >= tp[who] - .1 ? TF(CX3[n - 1], 640, spring(t, tp[who] - .1, .4), `<path d="M0 -70 V30" stroke="${P[who]}" stroke-width="10" stroke-linecap="round"/><circle cx="0" cy="-70" r="18" fill="${P[who]}" stroke="#fff" stroke-width="5"/>`) : "";
  return bg("stage") + cardsRow(t, y, k, { glow: (n) => [tp.pip, tp.momo, tp.basil][n - 1] <= t ? .6 : 0 }) 
    + bd("pip", CX3[0], 1075, 360, t, { in: s.t0 + .1, poses: [[s.t0, "sit"]], look: 2 }) + bd("momo", CX3[1], 1075, 360, t, { in: s.t0 + .25, poses: [[s.t0, "sit"]], look: 0 })
    + bd("basil", CX3[2], 1075, 360, t, { in: s.t0 + .4, flip: true, poses: [[s.t0, "sit"]], look: -3 }) + HUD27(t); };

/* ================================================================ 3 · FIX 1, RUN ================================================================ */
// the sunny path; Basil and Momo at the left, watching; Pip dashes right with the box, slows, wobbles, flops on the kerb (x 1380) in the
// sun and hugs the box to his tummy. Heart's correction: heat arrows from Pip's tummy into the box (warmer -> colder)
const pathLive = (t, sign) => sun27(t, 1780, 150, 95) + shimmer27(t, -100, 2000, 980, 12, .5) + (sign ? signpost27() : "");
const PX0 = 860, PX1 = 1380;
const runX = (t) => { const z = MK("zoom") + .2, f = MK("flop"); if (t < z) return PX0; if (t < f) { const u = clamp((t - z) / (f - z)); return lerp(PX0, PX1, 1 - Math.pow(1 - u, 2.4)); } return PX1; };
SC.run = (t, s) => { const z = MK("zoom") + .2, f = MK("flop"), tC = LT("e305") + .2, c = t < tC ? [1, 960, 540] : camMix([1, 960, 540], camOn([1320, 820], 1.22, 1240, 600), eio((t - tC) / 1.2)), back = ramp(t, MK("v_run") - .2, .9), cc = camMix(c, [1, 960, 540], back);
  const x = runX(t), moving = t > z && t < f, wob_ = t > f - .5 && t < f ? Math.sin((t - f) * 30) * 6 : 0, ph = Math.max(0, f - .1);
  const melt = clamp((t - LT("e304p")) / 9) * .8, hugBox = t > MK("hug") - .2;
  let fx = ""; if (moving) for (let i = 0; i < 4; i++) fx += `<path d="M${n2(x - 160 - i * 50)} ${n2(860 + i * 40)} h${-80 + i * 10}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/>`;
  if (t > z - .1 && t < z + .8) fx += `<ellipse cx="${PX0 - 40}" cy="1050" rx="${n2(60 + 120 * (t - z))}" ry="${n2(20 + 30 * (t - z))}" fill="#EADBB8" opacity="${n2(.8 * (1 - (t - z) / .9))}" filter="url(#b4)"/>`;
  if (t >= f && t < f + 1) fx += `<ellipse cx="${PX1}" cy="1060" rx="${n2(80 + 140 * (t - f))}" ry="${n2(18 + 24 * (t - f))}" fill="#EADBB8" opacity="${n2(.8 * (1 - (t - f)))}" filter="url(#b4)"/>`;
  // puffing: little clouds from Pip and sweat drops
  let puff = ""; if (t > f && t < LT("e303m")) for (let i = 0; i < 3; i++) { const u = ((t - f) * .9 + i / 3) % 1; puff += `<circle cx="${n2(x + 60 + 80 * u)}" cy="${n2(700 - 60 * u)}" r="${n2(14 + 20 * u)}" fill="#fff" opacity="${n2(.7 * (1 - u))}"/>`; }
  const boxArt = iceBox27(t, { melt, sweat: .6 }), fl = t > f + .8, pp = camPt(cc, [x, 1062]), ph_ = 470 * cc[0];
  // the box: held at Pip's paws (never mirrored: its words stay readable); hugged to his tummy from `hug`; set down on the path at the verdict
  const [pxw, pyw] = pawPt("pip", pp[0], pp[1], ph_, fl), down = ramp(t, MK("v_run") - .25, .3), bxc = lerp(pxw + (fl ? -1 : 1) * (hugBox ? 20 : 40), pp[0] + (fl ? -1 : 1) * ph_ * .42, down), byc = lerp(pyw + (hugBox ? 70 : 40), pp[1] - 4, down);
  // the heat explanation: arrows from Pip's warm tummy and chest INTO the box (warmer -> colder); the two tags
  let lc = ""; const tO = MK("outflow") - .1, tL = MK("loses"), tG = MK("gains"), bs = .62 * cc[0], bw = 150 * bs, bh = 190 * bs;
  if (t >= tO && t < MK("v_run") + .2) { const a = 1 - ramp(t, MK("v_run") - .3, .3), sd = fl ? -1 : 1;
    lc += OP(a, heatArrow(bxc - bw * .4, byc - bh - 110, bxc - bw * .4, byc - bh - 12, 16, clamp((t - tO) / .8)) + heatArrow(bxc + bw * .35, byc - bh - 120, bxc + bw * .35, byc - bh - 12, 16, clamp((t - tO - .2) / .8))
      + heatArrow(bxc + sd * (bw + 110), byc - bh * .5, bxc + sd * (bw + 14), byc - bh * .5, 16, clamp((t - tO - .4) / .8))
      + (t >= tL ? TF(bxc - 40, byc - bh - 190, spring(t, tL, .4), tempTag(0, 0, "Pip: warmer", true)) : "") + (t >= tG ? TF(bxc - 330, byc - 20, spring(t, tG, .4), tempTag(0, 0, "ice cream: colder", false)) : "")); }
  const pip = bd("pip", pp[0], pp[1] + (t > f && t < f + .3 ? 10 * Math.sin((t - f) * 20) : 0), ph_, t, { poses: [[0, "sit"]], look: moving ? 8 : -3, flip: fl, jump: moving ? [[z + .3, 18], [z + .65, 16], [z + 1.0, 12]] : [] });
  return place("path27", pathLive(t, true), cc) + fx
    + bcam(cc, "basil", 200, 1062, 440, t, { poses: [[0, "sit"]], look: 6 }) + bcam(cc, "momo", 570, 1062, 420, t, { poses: [[0, "sit"]], look: 6 })
    + `<g transform="rotate(${n2(wob_)} ${n2(pp[0])} ${n2(pp[1])})">` + pip + TF(bxc, byc, bs, boxArt) + `</g>` + puff + lc
    + (t >= MK("v_run") ? TF(1560, 330, spring(t, MK("v_run"), .45) * (1 - ramp(t, MK("v_run") + 3.6, .3)), fixCard27(t, 1, { k: .55, stamp: ["MELTING!", false, MK("v_run") + .35] })) : "")
    + clock(t, s) + HUD27(t); };

/* ================================================================ 4 · FIX 2, FAN ================================================================ */
// the same path (the camera stays; a soft melt): the box sits on a low wall (x 1130); Momo fans it from the left; Pip (shy) and Basil
const WALL = [1130, 930];
const wall27 = `<rect x="-200" y="-40" width="400" height="80" rx="10" fill="#C9BFAE" stroke="#9E9483" stroke-width="5"/><rect x="-200" y="-40" width="400" height="18" rx="8" fill="#DDD4C4"/>`;
const fanSwing = (t, t0, rate) => t < t0 ? 70 : 70 + 22 * Math.sin((t - t0) * rate);
SC.fan = (t, s) => { const c = camMix([1, 960, 540], camOn([1000, 800], 1.12, 960, 560), eio((t - s.t0) / 6)), tf = MK("fanon"), td = MK("drip"), melt = clamp((t - td + .8) / 4) * .7;
  const mx = 700, sw = fanSwing(t, tf, 13);
  return place("path27", pathLive(t, true) + TF(...WALL, 1, wall27) + TF(WALL[0], WALL[1] - 40, .8, iceBox27(t, { melt, sweat: .7 })) + (t > tf ? wind27(t, 860, 760, 260, 1, 4) : "") + (t >= td && t < td + .9 ? impactFX(t, td, 1290, 700, "DRIP!", { s: .5, flash: false, size: 60 }) : ""), c)
    + bcam(c, "momo", mx, 1062, 450, t, { poses: [[0, "sit"]], look: 6 }) + heldC(c, "momo", mx, 1062, 450, false, TF(0, 0, .8, fan27(1, sw)), 30, 70)
    + bcam(c, "basil", 260, 1062, 430, t, { poses: [[0, "sit"]], look: 6 }) + bcam(c, "pip", 1640, 1062, 440, t, { flip: true, poses: [[0, "sit"]], look: -6 })
    + clock(t, s) + HUD27(t) + melt27(t, s, "run"); };
function melt27(t, s, name, d = .5) { return melt(t, s, name, d); }

/* ================================================================ 5 · THE SLOW-MOTION REPLAY ================================================================ */
// a film border, INSTANT REPLAY · SLOW MOTION ×¼; the fan swing and the drip at a quarter speed; Momo's "Oh no!" stretched and low
SC.replay = (t, s) => { const t0 = MK("slow0"), sl = MK("drip") - 1.2 + Math.max(0, t - t0) * .25, c = camOn([1060, 760], 1.35, 960, 600), melt = clamp((sl - MK("drip") + .8) / 4) * .7, sw = fanSwing(sl, MK("fanon"), 13);
  const dripY = sl > MK("drip") ? 40 + 400 * Math.min(1, (sl - MK("drip")) * .9) : -1;
  let film = `<rect width="1920" height="110" fill="#111"/><rect y="970" width="1920" height="110" fill="#111"/>`; for (let i = 0; i < 24; i++) { const x = ((i * 90 - (t * 40) % 90) + 1920) % 1980 - 30; film += `<rect x="${n2(x)}" y="30" width="46" height="50" rx="8" fill="#EEE"/><rect x="${n2(x)}" y="1000" width="46" height="50" rx="8" fill="#EEE"/>`; }
  const rew = t < s.t0 + .45 ? 1 - (t - s.t0) / .45 : 0;
  return place("path27", pathLive(sl, true) + TF(...WALL, 1, wall27) + TF(WALL[0], WALL[1] - 40, .8, iceBox27(sl, { melt, sweat: .7 })) + (dripY > 0 ? `<ellipse cx="1012" cy="${n2(WALL[1] - 40 + dripY * .4)}" rx="9" ry="13" fill="#F7B8CB" stroke="#D9849E" stroke-width="2"/>` : "") + wind27(sl, 860, 760, 260, 1, 4), c)
    + bcam(c, "momo", 700, 1062, 450, t, { poses: [[0, "sit"]], look: 6, still: true }) + heldC(c, "momo", 700, 1062, 450, false, TF(0, 0, .8, fan27(1, sw)), 30, 70)
    + `<rect width="1920" height="1080" fill="#D9C7A0" opacity=".16"/>` + film
    + TF(330, 170, spring(t, s.t0 + .1, .4), tpill(0, 0, "INSTANT REPLAY", 40, "#E5484D", "#fff", { w: 700 })) + (t >= t0 - .1 ? TF(1560, 170, spring(t, t0 - .1, .4), tpill(0, 0, "SLOW MOTION ×¼", 40, P.ink, P.sun, { w: 700 })) : "")
    + (rew > 0 ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * rew)}"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${(i * 197 + t * 2400) % 1080}" width="1920" height="10" fill="#fff" opacity=".6"/>`).join("") + T(960, 560, "◀◀", 160, "#fff") : "") + logo(t); };

/* ================================================================ 6 · LOOK CLOSER: the fan ================================================================ */
// the cream panel over the blurred path; the fan (left) pushing WARM air (33 °C) at the cup (right, about -18 °C); heat arrows into the cup;
// a magnifier on the cup's side shows the melting; verdict MELTS FASTER. Basil big at the right (he explains), Momo shy at the lower left
SC.lcfan = (t, s) => { const k = ramp(t, s.t0, .45), tP = MK("push"), t33 = MK("t33"), t18 = MK("t18"), tA = MK("arrows"), tM = MK("more"), tV = MK("v_fan");
  const melt = .15 + .55 * clamp((t - tA) / 8), fast = t > tM ? 2.6 : 1.4;
  let air = ""; for (let i = 0; i < 6; i++) { const u = ((t * .5 * fast + i / 6) % 1), x = 560 + 380 * u, y = 560 + (i % 3 - 1) * 80; air += OP(.85 * Math.sin(Math.PI * u) * ramp(t, tP, .4), fatArrow(x - 90, y, x, y, "#FFC79A", 16)); }
  const panel = `<g filter="url(#drop)"><rect x="160" y="190" width="1440" height="720" rx="40" fill="#FFF8EA"/></g>`;
  let body = TF(330, 640, 1.3, fan27(1, 62 + 14 * Math.sin(t * 9))) + air + TF(1130, 860, 1.5, cup27(t, { melt }));
  if (t >= t33) body += TF(420, 300, spring(t, t33, .4), tempTag(0, 0, "warm air: 33 °C", true));
  if (t >= t18) body += TF(1130, 300, spring(t, t18, .4), tempTag(0, 0, "ice cream: about −18 °C", false));
  if (t >= tA) body += [0, 1, 2].map((i) => heatArrow(900, 520 + i * 70, 1030, 560 + i * 40, 22, clamp((t - tA - i * .25) / .7))).join("") + OP(ramp(t, tA + .8, .3), tpill(960, 420, "heat flows in", 36, "#FF6A2E", "#fff", { w: 700 }));
  if (t >= tM && t < tV + .9) { const mk = spring(t, tM, .45) * (1 - ramp(t, tV + .45, .3)); body += `<path d="M1200 620 L1330 500" stroke="${P.ink}" stroke-width="5"/>` + TF(1400, 430, mk, `<circle r="110" fill="#FFF3DC" stroke="${P.ink}" stroke-width="10"/><clipPath id="mg27"><circle r="100"/></clipPath><g clip-path="url(#mg27)">${TF(-60, 380, 1.9, cup27(t, { melt: melt + .2 }))}</g>`) + OP(mk, tpill(1400, 570, "melting!", 32, "#E5484D", "#fff", { w: 700 })); }
  if (t >= tV) body += TF(880, 860, spring(t, tV, .45), tpill(0, 0, "MELTS FASTER", 52, "#E5484D", "#fff", { w: 700 }));
  return `<g filter="url(#b10)">${place("path27", pathLive(t), [1.1, 960, 560])}</g><rect width="1920" height="1080" fill="${P.night}" opacity=".25"/>` + OP(k, panel + body)
    + OP(k, TF(960, 120, 1, tpill(0, 0, "LOOK CLOSER", 46, P.ink, P.sun, { w: 700 })))
    + bd("basil", 1700, 1076, 470, t, { in: s.t0 + .2, flip: true, poses: [[s.t0, "sit"]], look: -6 }) + bd("momo", 200, 1076, 340, t, { in: s.t0 + .3, poses: [[s.t0, "sit"]], look: 6 })
    + (t >= tV + .6 ? TF(1560, 330, spring(t, tV + .6, .45) * (1 - ramp(t, s.t1 - .4, .3)), fixCard27(t, 2, { k: .5, stamp: ["MELTS FASTER", false, tV + .9] })) : "") + HUD27(t); };

/* ================================================================ 7 · FIX 3, THE SCARF ================================================================ */
// back at the mama shop's freezer: Pip pulls out his wool scarf and wraps the box (wrap 0 -> 1); Momo worried
const SCF = { pip: [470, 1062, 470], momo: [1420, 1062, 440], basil: [1740, 1062, 440] };
SC.scarf = (t, s) => { window._BUBAT = { pip: [430, 370], momo: [1560, 330], basil: [1560, 330] }; const tw_ = MK("wrap"), wr = clamp((t - tw_) / 1.6), c = camMix(camOn([960, 600], 1.04), camOn([900, 660], 1.14), eio((t - tw_ + .5) / 1.5));
  return place("ms27", msLive(t, c, { box: false }) + TF(BOXP[0], BOXP[1], 1, iceBox27(t, { wrap: wr, sweat: .3 * (1 - wr) })), c)
    + bcam(c, "pip", ...SCF.pip, t, { poses: [[0, "sit"]], look: 5 }) + (t < tw_ + 1.6 && t > LT("e702p") - .3 ? heldC(c, "pip", ...SCF.pip, false, TF(0, 0, .8 * (1 - .7 * wr), scarfHeld27(t)), -20, 10) : "")
    + bcam(c, "momo", ...SCF.momo, t, { flip: true, poses: [[0, "sit"], [LT("e701m") - .2, "sit"], [LE("e701m") + .1, "worried"], [LT("e703m") - .1, "sit"]], look: -6 })
    + bcam(c, "basil", ...SCF.basil, t, { flip: true, poses: [[0, "sit"]], look: -5 })
    + clock(t, s) + HUD27(t) + melt27(t, s, "lcfan", .5); };

/* "Be a tiny bit of air, trapped inside the wool! Shrink down. Quietly.": the camera pushes into the scarf; the buddies pop out in turn */
SC.waitw = (t, s) => { const tB = MK("be"), tS = MK("shrinkw"), z = 1 + 5 * ei(clamp((t - tS) / Math.max(.6, s.t1 - tS))), c = camOn([BOXP[0] - 60, BOXP[1] - 110], Math.max(1.14, 1.14 * z));
  const out = (who, d) => tB + d;
  return place("ms27", msLive(t, c, { box: false }) + TF(BOXP[0], BOXP[1], 1, iceBox27(t, { wrap: 1 })), c)
    + bcam(camOn([900, 660], 1.14), "pip", ...SCF.pip, t, { out: out("pip", .4), poses: [[0, "sit"]] })
    + bcam(camOn([900, 660], 1.14), "momo", ...SCF.momo, t, { flip: true, out: out("momo", .6), poses: [[0, "sit"]] })
    + bcam(camOn([900, 660], 1.14), "basil", ...SCF.basil, t, { flip: true, out: out("basil", .8), poses: [[0, "sit"]] })
    + OP(ramp(t, tS, .3), `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.6 * ss(s.t1 - .5, s.t1, t))}"/>`) + logo(t); };

/* ================================================================ 8 · BE THE THING: inside the wool ================================================================ */
SC.shrink = (t, s) => { const tH = MK("jhot"), tC = MK("jcold"), tI = MK("jin"), tB = MK("jblock"), tSl = MK("jslow"), k = ramp(t, s.t0, 1.0);
  const c = [1 + .03 * Math.sin(t * .3), 960, 540];
  let w = woolWorld27(t, { hot: .9 * ramp(t, tH, 1), cold: .9 * ramp(t, tC, 1) }) + TF(960, 560, 1, airYou27(t, 140));
  w += heatStream27(t, tI, 560, 470, 1500, { n: 6, slow: 55 });
  const riders = bd("pip", 700, 960, 150, t, { in: s.t0 + .8, poses: [[0, "sit"]], look: -6, flip: true, tag: false }) + bd("momo", 1180, 950, 150, t, { in: s.t0 + 1.0, poses: [[0, "sit"]], look: -6, flip: true, tag: false })
    + bd("basil", 1380, 960, 146, t, { in: s.t0 + 1.2, poses: [[0, "sit"]], look: -6, flip: true, tag: false });
  return OP(k, CAM(w, c[0], c[1], c[2]) + riders
    + TF(960, 360, spring(t, s.t0 + .6, .45), tpill(0, 0, "You: a bit of trapped air", 40, P.sun, P.ink, { w: 700 }))
    + (t >= tH ? TF(260, 200, spring(t, tH, .4), tempTag(0, 0, "hot air: 33 °C", true)) : "") + (t >= tC ? TF(1640, 200, spring(t, tC, .4), tempTag(0, 0, "frozen box: −18 °C", false)) : "")
    + (t >= tB ? TF(700, 820, spring(t, tB, .4), tpill(0, 0, "wool and air: heat passes slowly", 34, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tSl ? TF(1280, 680, spring(t, tSl, .4), tpill(0, 0, "very, very slowly…", 36, "#FF6A2E", "#fff", { w: 700 })) : ""))
    + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(1 - ramp(t, s.t0, .6))}"/>` + logo(t); };
/* the pull-out: back out of the wool to the shop; it ends on the layout of `wool` (the next scene), so nothing moves at the change */
const WOOLB = { pip: [470, 1062, 470], momo: [1150, 1062, 420], basil: [1720, 1062, 450] };
const woolCam = camOn([900, 640], 1.1);
SC.pullout = (t, s) => { const u = eio((t - s.t0) / (s.t1 - s.t0)), c = camMix(camOn([BOXP[0] - 60, BOXP[1] - 110], 5), woolCam, u);
  return place("ms27", msLive(t, c, { box: false }) + TF(BOXP[0], BOXP[1], 1, iceBox27(t, { wrap: 1 })), c) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * (1 - ramp(t, s.t0, .5)))}"/>`
    + bd("pip", ...WOOLB.pip, t, { in: s.t1 - .55, poses: [[0, "sit"]], look: 5 }) + bd("momo", ...WOOLB.momo, t, { in: s.t1 - .45, flip: true, poses: [[0, "sit"]], look: -5 }) + bd("basil", ...WOOLB.basil, t, { in: s.t1 - .35, flip: true, poses: [[0, "sit"]], look: -5 })
    + `<rect width="1920" height="1080" fill="#fff" opacity="0"/>` + logo(t); };

/* ================================================================ 9 · POOR CONDUCTOR OF HEAT; the scarf slows heat both ways ================================================================ */
// a child's neck in a scarf on a cold day (heat arrows OUT, thin through the wool) | the wrapped box today (heat arrows IN, thin through the wool)
const child27 = (t) => `<path d="M-150 160 Q-150 40 0 40 Q150 40 150 160z" fill="#3A8DFF"/><rect x="-40" y="-30" width="80" height="80" fill="#F2C29B"/><circle cx="0" cy="-110" r="100" fill="#F2C29B"/><path d="M-100 -130 Q-90 -230 0 -220 Q100 -230 100 -130 Q60 -170 0 -165 Q-60 -170 -100 -130z" fill="#3A2E2A"/><circle cx="-36" cy="-110" r="10" fill="#2B2147"/><circle cx="36" cy="-110" r="10" fill="#2B2147"/><path d="M-26 -60 q26 18 52 0" stroke="#B5534A" stroke-width="6" fill="none" stroke-linecap="round"/>`
  + `<rect x="-90" y="-10" width="180" height="56" rx="26" fill="url(#woolA)" stroke="#5B3FB8" stroke-width="5"/><path d="M40 30 q20 60 0 120" stroke="#8B5CF6" stroke-width="40" stroke-linecap="round" fill="none"/>`;
const inset27 = (t, x, y, k, title, inner, col) => TF(x, y, k, `<g filter="url(#drop)"><rect x="-300" y="-250" width="600" height="500" rx="30" fill="#FFF8EA" stroke="${col}" stroke-width="8"/></g>` + T(0, -190, title, 40, P.ink) + inner);
SC.wool = (t, s) => { const c = woolCam, tN = MK("neck") - .1, tT = MK("today") - .1, tV = MK("v_wool");
  let ins = "";
  if (t >= tN) ins += inset27(t, 560, 412, spring(t, tN, .45) * .76, "On a cold day", TF(0, 90, .9, child27(t)) + [0, 1].map((i) => heatArrow(0 + (i ? 60 : -60), 60, (i ? 1 : -1) * 250, 90, 12, clamp((t - tN - .5) / 1.6))).join("") + T(0, 225, "the scarf slows heat flowing OUT", 30, P.ink, { w: 600 }), "#3A8DFF");
  if (t >= tT) ins += inset27(t, 1360, 412, spring(t, tT, .45) * .76, "Today", TF(0, 140, .75, iceBox27(t, { wrap: 1 })) + [0, 1].map((i) => heatArrow((i ? 1 : -1) * 270, 40, (i ? 1 : -1) * 140, 60, 12, clamp((t - tT - .5) / 1.6))).join("") + T(0, 225, "the scarf slows heat flowing IN", 30, P.ink, { w: 600 }), "#FF6A3D");
  const dim = ramp(t, tN - .2, .4) * (1 - ramp(t, LT("e808b") + .3, .4));
  return place("ms27", msLive(t, c, { box: false }) + TF(BOXP[0], BOXP[1], 1, iceBox27(t, { wrap: 1 })), c) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.35 * dim)}"/>` + OP(1 - ramp(t, LT("e808b") + .3, .4), ins)
    + bd("pip", ...WOOLB.pip, t, { poses: [[0, "sit"]], look: 5 }) + bd("momo", ...WOOLB.momo, t, { flip: true, poses: [[0, "sit"], [LE("e806m") + .1, "thinking"], [LT("e807") + 1.4, "sit"]], look: -5 })
    + bd("basil", ...WOOLB.basil, t, { flip: true, poses: [[0, "sit"]], look: -5 })
    + (t >= tV ? TF(900, 168, spring(t, tV, .45) * (1 - ramp(t, LT("e808b") + .6, .3)), tpill(0, 0, "WOOL SLOWS THE HEAT FLOW", 42, P.leaf, "#fff", { w: 700 })) : "") + clock(t, s) + HUD27(t); };

/* ================================================================ 10 · THE FAIR TEST ================================================================ */
// the sunny path: three cups on the low wall (1 no wrapper, 2 a thin plastic bag, 3 the wool scarf); THINK; speeded up; pour into measuring
// cups (30 ml, 20 ml, 5 ml); WOOL WINS; the three fix cards with their stamps
const CUPX = [760, 960, 1160], ML = [30, 20, 5], MELT = [.8, .55, .12];
const testCam = (t) => { const tP = MK("pour"); return t < tP - .3 ? camMix([1, 960, 540], camOn([960, 760], 1.1), eio((t - SCN.test.t0) / 4)) : camMix(camOn([960, 760], 1.1), camOn([960, 870], 1.3, 960, 672), eio((t - tP + .3) / 1.2)); };
SC.test = (t, s) => { window._BUBAT = { pip: [1080, 405], basil: [1180, 405], momo: [640, 380] }; const c = testCam(t), tL = MK("lapse"), tL1 = MK("lapse1"), lu = clamp((t - tL) / (tL1 - tL)), tc = [MK("cup1"), MK("cup2"), MK("cup3")], tP = MK("pour"), tr = [MK("r1"), MK("r2"), MK("r3")], tV = MK("v_test");
  let set = pathLive(t) + TF(960, 930, 1, `<rect x="-360" y="-40" width="720" height="80" rx="10" fill="#C9BFAE" stroke="#9E9483" stroke-width="5"/><rect x="-360" y="-40" width="720" height="18" rx="8" fill="#DDD4C4"/>`);
  CUPX.forEach((x, i) => { const k = t >= LT("e904p") ? spring(t, LT("e904p") + .2 + i * .15, .45) : 0; if (k < .02) return; const m = MELT[i] * lu, wrap = t >= tc[i] ? [null, "bag", "wool"][i] : null;
    set += TF(x, 890, .62 * k, cup27(t, { melt: m, wrap, n: i + 1 })); });
  if (t >= tP - .2) CUPX.forEach((x, i) => { const k = spring(t, tP - .2 + i * .1, .45); set += TF(x, 1085, .6 * k, jug27(ML[i], clamp((t - tr[i]) / .7), i + 1)); if (t >= tr[i] - .5 && t < tr[i] + .7) set += `<path d="M${x - 20} 860 Q${x} 940 ${x + 4} 1000" stroke="#F7B8CB" stroke-width="10" fill="none" stroke-linecap="round" opacity="${n2(Math.sin(Math.PI * clamp((t - tr[i] + .5) / 1.2)))}"/>`; });
  if (t >= tV) set += TF(CUPX[2], 1150, spring(t, tV, .45), tpill(0, 0, "WOOL WINS!", 40, P.leaf, "#fff", { w: 700 }));
  const think = t >= MK("think") - .1 && t < tL + .3 ? TF(960, 300, spring(t, MK("think") - .1, .4) * (1 - ramp(t, tL, .3)), `<g filter="url(#dropS)"><rect x="-260" y="-70" width="520" height="140" rx="70" fill="#FFF8EA" stroke="${P.ink}" stroke-width="6"/></g>` + T(0, 22, "Which cup melts least?", 46, P.ink) + [1, 2, 3].map((n, i) => TF(-120 + i * 120, 130, .8, `<circle r="40" fill="${P.sun}" stroke="${P.ink}" stroke-width="5"/>` + T(0, 16, String(n), 46, P.ink))).join("")) : "";
  const lapse = lu > 0 && lu < 1 ? speeded(t, tL, tL1, 1700, 980) + TF(960, 200, 1, tpill(0, 0, "five minutes in the sun", 40, P.ink, P.sun, { w: 700 })) : "";
  const fcards = t >= tV + 1.0 ? OP(1 - ramp(t, LT("e910m") + .4, .3), `<rect width="1920" height="1080" fill="${P.night}" opacity=".35"/>` + [1, 2, 3].map((n) => TF(CX3[n - 1], 420, spring(t, tV + 1.0 + n * .15, .45) * .5, fixCard27(t, n, { stamp: [["MELTED", false], ["MELTED FASTER", false], ["WINNER!", true]][n - 1].concat([tV + 1.4 + n * .2]) }))).join("")) : "";
  return place("path27", set, c)
    + bcam(c, "momo", 340, 1062, 440, t, { poses: [[0, "sit"]], look: 6 }) + bcam(c, "pip", 1470, 1062, 440, t, { flip: true, poses: [[0, "sit"]], look: -6 }) + bcam(c, "basil", 1740, 1062, 440, t, { flip: true, poses: [[0, "sit"]], look: -6 })
    + think + lapse + fcards + clock(t, s) + HUD27(t); };

/* ================================================================ 11 · THE RESCUE: the walkway and the drain ================================================================ */
// the buddies walk RIGHT under the covered walkway (front views, not mirrored: they face the way they go); Pip carries the wrapped box
const walkX = (t, x0) => x0 + 760 * clamp((t - SCN.walk.t0 - .3) / (SCN.walk.t1 - SCN.walk.t0 + 1.2));
SC.walk = (t, s) => { const step = (ph) => [[0, 0]].concat([...Array(14)].map((_, i) => [s.t0 + .4 + i * .5 + ph, 10]));
  const xp = walkX(t, 420), xb = walkX(t, -10), xm = walkX(t, 850);
  return place("walk27", "", [1, 960, 540])
    + bd("basil", xb, 1062, 430, t, { poses: [[0, "sit"]], look: 6, jump: step(.25) }) + bd("pip", xp, 1062, 450, t, { poses: [[0, "sit"]], look: 6, jump: step(0) }) + held("pip", xp, 1062, 450, false, TF(20, 30, .55, iceBox27(t, { wrap: 1 })))
    + bd("momo", xm, 1062, 420, t, { poses: [[0, "sit"]], look: 6, jump: step(.12) })
    + OP(ramp(t, s.t0 + .3, .4), lowerPill(60, 140, "The covered walkway ·", "out of the sun")) + clock(t, s) + HUD27(t); };
// the drain: a cut-away under the grating (the steel opener and the aluminium ring pull lying at the bottom); Basil lowers his magnet on a
// string; the opener jumps up to it and is lifted out; the ring pull does not move
const DR = { x: 900, top: 740 }, TIP = [1150, 700];
// a cut-away of the walkway's edge: the paving slab with the steel grating in it, the concrete drain under it (a little water at the bottom),
// the steel bottle opener and the aluminium ring pull lying there. Basil's fishing rod from EP22's fishing game: the bar magnet on its line
SC.drain = (t, s) => { window._BUBAT = { pip: [520, 380], momo: [600, 380], basil: [1330, 380] }; const tc = MK("clink"), tl = MK("lower"), tsn = MK("snap"), tu = MK("liftup");
  const LMAX = 150, L = t < tl ? 0 : t < tsn ? LMAX * eio((t - tl) / 1.0) : t < tu ? LMAX : LMAX - 470 * eio((t - tu) / 1.2);   // L: how far the magnet is let down below the grating
  const magY = DR.top - 150 + L;   // the magnet's top (it hangs 144 px)
  const fall = t < tc ? 0 : eo(clamp((t - tc) / .5)), opBot = [DR.x - 40, DR.top + 222];
  const opY = t < tsn ? lerp(DR.top - 120, opBot[1], fall) : lerp(opBot[1], magY + 218, eo(clamp((t - tsn) / .2))), opX = t < tsn ? lerp(560, opBot[0], fall) : lerp(opBot[0], DR.x, eo(clamp((t - tsn) / .2)));
  let sec = `<g filter="url(#drop)"><rect x="470" y="${DR.top - 30}" width="860" height="320" rx="24" fill="#8C8577"/></g><rect x="500" y="${DR.top}" width="800" height="40" fill="#CFC8BA"/>`
    + `<rect x="640" y="${DR.top + 40}" width="520" height="210" fill="#2C2A2E"/><rect x="620" y="${DR.top + 40}" width="20" height="230" fill="#9E9686"/><rect x="1160" y="${DR.top + 40}" width="20" height="230" fill="#9E9686"/><rect x="620" y="${DR.top + 250}" width="560" height="20" fill="#9E9686"/>`
    + `<path d="M640 ${DR.top + 238} q260 ${n2(6 * Math.sin(t * 2))} 520 0 v12 h-520z" fill="#5E8FA8" opacity=".7"/>` + TF(1060, DR.top + 232, .9, ringPull27());
  sec += TF(opX, opY, .9, `<g transform="rotate(${n2(t < tsn ? 30 * fall : 90)})">${opener27()}</g>`);
  sec += TF(DR.x, DR.top + 10, 1, `<g transform="scale(.62 .4)">${grating27(520)}</g>`);
  sec += TF(DR.x, DR.top + 318, 1, tpill(0, 0, "inside the drain", 28, P.ink, "#fff", { w: 700 }));
  if (t >= tl - .3) sec += `<path d="M${TIP[0]} ${TIP[1]} L${DR.x} ${n2(magY)}" stroke="#5B4636" stroke-width="4"/>` + TF(DR.x, magY, 1, magnetOnString(4, 0));
  if (t >= tsn && t < tsn + .8) sec += impactFX(t, tsn, DR.x + 70, magY + 160, "CLICK!", { s: .42, flash: false, size: 56 });
  const ru = t >= LT("e1006p") ? TF(1130, DR.top + 175, spring(t, LT("e1006p"), .4), tpill(0, 0, "aluminium: not magnetic", 30, "#fff", P.ink, { w: 700 })) : "";
  const sk = t >= tsn ? TF(DR.x - 150, DR.top + 80, spring(t, tsn, .4), tpill(0, 0, "steel: magnetic", 32, P.leaf, "#fff", { w: 700 })) : "";
  const [bpx, bpy] = pawPt("basil", 1560, 1062, 470, true), rod = t >= tl - .3 ? `<path d="M${n2(bpx)} ${n2(bpy)} L${TIP[0]} ${TIP[1]}" stroke="#8A5A2B" stroke-width="12" stroke-linecap="round"/>` : "";
  return bg("walk27") + `<rect width="1920" height="1080" fill="${P.night}" opacity=".18"/>` + sec + sk + ru
    + bd("momo", 470, 1062, 420, t, { poses: [[0, "sit"], [tc + .1, "surprised"], [LT("e1002m") - .1, "sit"]], look: 6 }) + bd("pip", 150, 1062, 380, t, { poses: [[0, "sit"]], look: 6 })
    + bd("basil", 1560, 1062, 470, t, { flip: true, poses: [[0, "sit"]], look: -6 }) + rod
    + clock(t, s) + HUD27(t); };

/* ================================================================ 12 · THE PARTY ================================================================ */
const VD = { pip: [300, 1062, 450], momo: [640, 1062, 430], basil: [1720, 1062, 450] }, FANX = 1420, TBL = [980, 640];
const fanDir = (t) => { const a = MK("turnfan"); return t < a ? -1 : lerp(-1, 1, eio((t - a) / .5)); };   // -1: the fan's face turned left (at the ice cream), 1: right (at Basil)
const vdLive = (t, o = {}) => bunting27(t) + balloon27(t, 520, 260, "#FF6F61", 0) + balloon27(t, 560, 300, "#FFC83A", 1) + balloon27(t, 1480, 260, "#43BF6C", 2) + balloon27(t, 1530, 300, "#9B6BFF", 3) + TF(TBL[0], TBL[1], 1, table27(820))
  + (o.box !== false ? TF(TBL[0], TBL[1], .85, iceBox27(t, o.boxO || { wrap: 1 })) : "");
SC.party = (t, s) => { window._BUBAT = { basil: [1300, 430], momo: [700, 400], pip: [480, 420] }; const tO = MK("open"), tF = MK("fanclick"), fd = fanDir(t), wr = 1 - clamp((t - tO) / .8), op = clamp((t - tO - .6) / .6), fr = ramp(t, tO + 1, .6);
  const spin = t < tF ? 0 : (t - tF) * 900;
  const fan = TF(FANX, 1000, 1, `<g transform="scale(${n2(Math.abs(fd) < .05 ? .05 : fd)} 1)">${standFan27(spin)}</g>`) + (t > tF + .2 ? wind27(t, FANX + 40 * fd, 600, 330, fd < 0 ? -1 : 1, 4, fd < 0) : "");
  return bg("vd27") + vdLive(t, { boxO: { wrap: wr, open: op, frost: fr } }) + fan + (t >= LT("e1102m") ? TF(TBL[0] + 330, 420, spring(t, LT("e1102m"), .45) * (1 - ramp(t, MK("fanclick"), .3)), tpill(0, 0, "still frozen!", 46, "#3AA6E8", "#fff", { w: 700 })) : "")
    + bd("pip", ...VD.pip, t, { poses: [[0, "sit"]], look: 5, jump: [[MK("turnfan") - .3, 30]] }) + bd("momo", ...VD.momo, t, { poses: [[0, "sit"], [MK("solved"), "cheer"], [MK("solved") + 2.2, "sit"]], look: 4 })
    + bd("basil", ...VD.basil, t, { flip: true, poses: [[0, "sit"]], look: -5 })
    + (t >= MK("coin1") ? coin(t, MK("coin1"), 1640, 160) : "") + OP(ramp(t, s.t0 + .2, .4) * (1 - ramp(t, s.t0 + 6, .4)), lowerPill(60, 140, "Our void deck ·", "the class party")) + clock(t, s) + HUD27(t); };

/* ================================================================ 13 · THE WORDS THAT EARN MARKS ================================================================ */
SC.words = (t, s) => markScene(t, s, { id: "e1203p", sayId: "e1202p", who: "pip", tab: "WORDS THAT EARN MARKS", text: TL.lines.e1203p.text, keys: ["hotter", "colder.", "poor", "conductor", "heat.", "slows", "warmer"], size: 54, y: 190, footer: FOOT, achieved: true, poses: [[LE("e1203p") + .2, "sit"]] });

/* ================================================================ 14 · THE P3 YEAR, LEVEL UP, THE P4 TEASER ================================================================ */
const polaroid = (t, x, y, t0, rot, title, inner) => t < t0 ? "" : TF(x, y, spring(t, t0, .45), `<g transform="rotate(${rot})"><g filter="url(#drop)"><rect x="-130" y="-150" width="260" height="300" rx="8" fill="#fff"/></g><rect x="-110" y="-130" width="220" height="200" fill="#E6F4FF"/>${inner}${T(0, 120, title, 28, P.ink)}<circle cx="0" cy="-150" r="10" fill="#E5484D"/></g>`);
const memories = (t) => polaroid(t, 560, 330, MK("y1") - .1, -4, "Living things", TF(-30, 40, .5, `<circle cx="0" cy="-60" r="70" fill="#43BF6C"/><rect x="-10" y="0" width="20" height="90" fill="#8A5A3B"/>`) + TF(50, 60, .5, `<circle r="50" fill="#FB7158"/><path d="M-40 -30 l15 -40 l15 30 M40 -30 l-15 -40 l-15 30" fill="#FB7158"/><circle cx="-16" cy="-6" r="7" fill="#2B2147"/><circle cx="16" cy="-6" r="7" fill="#2B2147"/>`))
  + polaroid(t, 830, 320, MK("y2") - .1, 3, "Materials", `<rect x="-90" y="-80" width="70" height="70" fill="#C98F66"/><rect x="-10" y="-80" width="70" height="70" fill="#9AA3AE"/><rect x="-50" y="-10" width="70" height="60" fill="#3A8DFF" opacity=".7"/>`)
  + polaroid(t, 1100, 330, MK("y3") - .1, -3, "Life cycles", `<circle r="70" fill="none" stroke="${P.ink}" stroke-width="5" stroke-dasharray="14 10"/><ellipse cx="0" cy="-70" rx="16" ry="12" fill="#FFF3DC" stroke="${P.ink}" stroke-width="3"/><rect x="50" y="-10" width="50" height="18" rx="9" fill="#43BF6C"/><path d="M-80 0 q-30 -40 0 -40 q30 0 0 40 q-30 40 0 40 q30 0 0 -40z" fill="#FF9838"/>`)
  + polaroid(t, 1370, 320, MK("y4") - .1, 4, "Magnets", `<rect x="-90" y="-40" width="180" height="56" rx="8" fill="#9AA3AE"/><rect x="-88" y="-38" width="88" height="52" rx="6" fill="#F0453A"/><rect x="0" y="-38" width="88" height="52" rx="6" fill="#3A8DFF"/><path d="M-80 30 q0 30 20 30 M80 30 q0 30 -20 30" stroke="#7F8791" stroke-width="6" fill="none"/>`);
const YR = { pip: [330, 1062, 450], momo: [960, 1062, 420], basil: [1600, 1062, 450] };
// the P4 items: Pip's goggles up on his forehead, Basil's lab badge on his chest, Momo's magnifier in her paw (all pop in with sparkles on
// `items`; the buddies keep their sitting pose here so the items sit right: noreact)
const items27 = (t, B) => { const ti = MK("items"); if (t < ti) return ""; const k = spring(t, ti, .45);
  const [px, py, ph] = B.pip, [bx, by, bh] = B.basil, [mx, my, mh] = B.momo, bH = bh * SIZE_K.basil;
  return TF(px + ph * .05, py - ph * .9, k * ph / 470, goggles27()) + TF(bx + bH * .02, by - bH * .52, k * .85 * bh / 450, badge27("basil")) + held("momo", mx, my, mh, false, TF(10, -40, k * .8 * mh / 420, magnifier27()))
    + [B.pip, B.basil, B.momo].map(([x, y, h], i) => popSpark(t, ti + i * .05, x, y - h * .6, h * .5)).join(""); };
SC.year = (t, s) => (window._BUBAT = { basil: [1620, 560] }, "") + bg("vd27") + vdLive(t, { boxO: { open: 1 } }) + `<rect width="1920" height="1080" fill="${P.night}" opacity=".2"/>` + memories(t)
  + bd("pip", ...YR.pip, t, { poses: [[0, "sit"]], look: 4, noreact: true, jump: [[MK("items") - .2, 40]] }) + bd("momo", ...YR.momo, t, { poses: [[0, "sit"]], look: 0, noreact: true, jump: [[MK("items") - .15, 40]] })
  + bd("basil", ...YR.basil, t, { flip: true, poses: [[0, "sit"]], look: -4, noreact: true, jump: [[MK("items") - .1, 40]] }) + items27(t, YR)
  + (t >= MK("lvl") ? TF(960, 585, spring(t, MK("lvl"), .45), tpill(0, 0, "LEVEL UP: PRIMARY 4!", 50, P.sun, P.ink, { w: 700 })) : "") + HUD27(t);
/* the P4 teaser: five tiles (systems, matter, light, shadows, heat); "See you in Primary 4!" (the buddies wave). HEART MYSTERY HINT #1: on
   "four" the heart in the logo pill flickers for a few frames (a cyan and magenta double, a sliver offset), unexplained */
const tile27 = (t, x, t0, title, inner, col) => t < t0 ? "" : TF(x, 330, spring(t, t0, .45), `<g filter="url(#drop)"><rect x="-150" y="-150" width="300" height="300" rx="30" fill="#FFF8EA" stroke="${col}" stroke-width="8"/></g>${inner}${T(0, 115, title, 40, P.ink)}`);
const P4T = (t) => tile27(t, 240, MK("p1") - .1, "Systems", `${[[-40, -40, 50], [40, -10, 40], [-10, 30, 34]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#8C9BB0" stroke-width="16" stroke-dasharray="10 8"/>`).join("")}`, "#8C9BB0")
  + tile27(t, 600, MK("p2") - .1, "Matter", `<ellipse cx="-50" cy="-10" rx="44" ry="54" fill="#FF8FB1"/><path d="M-50 44 v40" stroke="#666" stroke-width="3"/><path d="M30 -60 q30 40 30 60 a30 30 0 0 1 -60 0 q0 -20 30 -60z" fill="#3A8DFF"/><rect x="10" y="20" width="70" height="50" rx="10" fill="#9AA3AE"/>`, "#FF8FB1")
  + tile27(t, 960, MK("p3") - .1, "Light", `<circle cx="0" cy="-20" r="50" fill="#FFE27A" stroke="#F59E0B" stroke-width="6"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${n2(70 * Math.cos(i * Math.PI / 4))} ${n2(-20 + 70 * Math.sin(i * Math.PI / 4))} L${n2(95 * Math.cos(i * Math.PI / 4))} ${n2(-20 + 95 * Math.sin(i * Math.PI / 4))}" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>`).join("")}`, "#F59E0B")
  + tile27(t, 1320, MK("p4") - .1, "Shadows", `<path d="M-80 -40 L20 -70 L20 30z" fill="#FFE27A" opacity=".7"/><g transform="translate(-100 -40) rotate(-8)"><rect x="-30" y="-14" width="44" height="28" rx="6" fill="#5B6B80"/><path d="M14 -20 L30 -24 L30 24 L14 20z" fill="#8C9BB0"/></g><rect x="-6" y="-50" width="36" height="70" rx="8" fill="#43BF6C"/><path d="M30 -48 L120 -30 L120 40 L30 20z" fill="#2B2147" opacity=".65"/>`, "#2B2147")
  + tile27(t, 1680, MK("p5") - .1, "Heat", TF(-30, -10, .4, therm27(60)) + `<path d="M40 40 q-30 -40 0 -90 q10 30 30 40 q20 30 0 50z" fill="#FF6A2E"/>`, "#FF6A2E");
const glitch27 = (t) => { const g = MK("glitch"); if (!(t >= g + .02 && t < g + .14) && !(t >= g + .27 && t < g + .31)) return ""; const dx = (t < g + .1 ? 5 : -4);
  return `<g filter="url(#glitchC)" opacity=".7" transform="translate(${dx} 0)">${logo(t)}</g><g filter="url(#glitchM)" opacity=".6" transform="translate(${-dx} 1)">${logo(t)}</g><rect x="40" y="${t < g + .1 ? 52 : 40}" width="150" height="4" fill="#fff" opacity=".7"/>`; };
SC.p4 = (t, s) => { const tS = LT("e1304");
  return bg("stage2") + OP(ramp(t, s.t0, .3), T(960, 110, "COMING UP IN PRIMARY 4", 58, P.sun, { ls: 5 })) + P4T(t)
    + bd("pip", 330, 1076, 400, t, { in: s.t0 + .1, poses: [[0, "sit"], [tS, "waving"]], noreact: true, keepPose: false }) + bd("momo", 960, 1076, 380, t, { in: s.t0 + .2, poses: [[0, "sit"], [tS + .1, "waving"]], noreact: true })
    + bd("basil", 1600, 1076, 400, t, { in: s.t0 + .3, flip: true, poses: [[0, "sit"], [tS + .2, "waving"]], noreact: true, wave: true })
    + (t >= tS ? TF(960, 640, spring(t, tS, .45), tpill(0, 0, "See you in Primary 4!", 64, P.sun, P.ink, { w: 700 })) : "") + HUD27(t) + glitch27(t); };

/* ================================================================ 15 · "Now you know!" (the prop: the rescued box, open, on the table) ================================================================ */
SC.nyk = (t, s) => nykScene(t, s, TF(960, 900, 1.1, iceBox27(t, { open: 1, frost: .6 })), { bx: [300, 1650, 1275], hx: 470 });

/* ================================================================ 16 · THE BLOOPER ================================================================ */
SC.blooper = (t, s) => { const tk = MK("take2");
  return bg("stage") + `<rect width="1920" height="1080" fill="#000" opacity=".25"/>` + TF(960, 250, spring(t, s.t0 + .05, .4), clapper27(t > tk ? 1 - ramp(t, tk, .12) : (t < s.t0 + .4 ? 1 : 0)))
    + bd("pip", 420, 1076, 440, t, { in: s.t0 + .1, poses: [[0, "sit"], [LE("e1601p") + .2, "oops"]], look: 3 }) + bd("basil", 1180, 1076, 430, t, { in: s.t0 + .15, flip: true, poses: [[0, "sit"], [LE("e1602b") + .1, "laughing"]], look: -3 })
    + bd("momo", 1620, 1076, 420, t, { in: s.t0 + .2, flip: true, poses: [[0, "sit"]], look: -3 }) + OP(ramp(t, s.t0, .3), T(960, 470, "(bloopers)", 40, "#fff", { w: 500 })) + logo(t); };
})(); }
