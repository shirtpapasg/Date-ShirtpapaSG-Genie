// f6.js: the three Fable moments of P3 EP6 "Count the legs!" (PART 1 = the cold open, 2 = the journey, 3 = the ending). The words: SCRIPT.md / script.py.
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
const feelTag = (t, t0, t1, txt, y = 790, x = 960, size = 46) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, size, "#fff", P.ink, { w: 700 }));
const bigLine = (y, txt, size, col, k, ls = 4) => k ? `<g transform="translate(960 ${y}) scale(${n2(k)})"><text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" letter-spacing="${ls}" fill="${col}" stroke="${P.ink}" stroke-width="${n2(size * .17)}" stroke-linejoin="round" paint-order="stroke" filter="url(#dropS)">${txt}</text></g>` : "";
const slamK = (t, t0) => { const k = clamp((t - t0) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(t, t0 + .16, .4); };
// a dashed group tile with a number badge (the same tiles as EP5's dare)
const groupTile = (nm, n, k, lit = 0, done = 0, col = "#8A6FD6") => k < .02 ? "" : TF(0, 0, k * (1 + .08 * lit), `<g filter="url(#${lit > .2 ? "glowS" : "dropS"})"><rect x="-150" y="-70" width="300" height="140" rx="32" fill="${done ? col : "#fff"}" stroke="${col}" stroke-width="7" ${done ? "" : 'stroke-dasharray="14 10"'}/></g>${T(0, 14, nm, 40, done ? "#fff" : P.ink, { ls: 1 })}<g transform="translate(124 -60)">${done ? tickBadge(28) : `<circle r="30" fill="url(#gSun)" stroke="#fff" stroke-width="4"/>${T(0, 15, n, 42, P.ink)}`}</g>`);

/* =====================================================================================================================
   MOMENT 1 · THE COLD OPEN
   ===================================================================================================================== */
if (PART === 1) { (() => {
const WEB = [1668, 470], tDrop = 1.5, tUp = 3.7;
// the spider: sits at the hub; at tDrop it lets itself down on a thread, hangs, then climbs back
const spY = (t) => t < tDrop ? 0 : t < tUp ? 190 * (eo((t - tDrop) / .5) + .06 * wob(t, tDrop + .5, .6)) : 190 * (1 - eio((t - tUp) / 1.2));
const liveSet = (t) => { let ants = ""; for (let i = 0; i < 5; i++) { const y = 930 - ((t * 62 + i * 172) % 860), x = 196 + 30 * Math.sin(y / 80 + i); if (y > 60) ants += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(-90 + 8 * Math.cos(y / 80 + i) + 4 * Math.sin(t * 22 + i))}) scale(.3)">${ant()}</g>`; }
  const dy = spY(t), tr = 3 * Math.sin(t * 2.1);
  return ants + `<g stroke="#fff" stroke-width="3" opacity=".8"><path d="M${WEB[0]} ${WEB[1]} L1497 338 M${WEB[0]} ${WEB[1]} L1890 372 M${WEB[0]} ${WEB[1]} L1846 650 M${WEB[0]} ${WEB[1]} L1512 640"/></g><g transform="translate(${WEB[0]} ${n2(WEB[1] + tr * .3)})">${web(150)}</g>`
    + (dy > 1 ? `<path d="M${WEB[0]} ${WEB[1]} V${n2(WEB[1] + dy)}" stroke="#fff" stroke-width="3" opacity=".9"/>` : "") + `<g transform="translate(${WEB[0]} ${n2(WEB[1] + dy + tr * .3)}) rotate(${n2(-90 + 5 * Math.sin(t * 3))}) scale(.46)">${spider()}</g>`; };
const view = (t, z) => CAM(bg("gardens") + liveSet(t), z, 960, 600);
const zAt = (t) => 1.03 + .05 * eio(t / 5.6);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return view(4.2, 1.06);
  return view(t, zAt(t))
    + buddy("basil", 1210, 1058, 270, t, { aura: true, in: .5, poses: [[.5, "sit"], [tDrop + .25, "surprised"], [tUp + .2, "arms_crossed"]], jump: [[tDrop + .22, 40]] })
    + buddy("pip", 560, 1058, 250, t, { aura: true, flip: true, in: 2.5, poses: [[2.5, "pointing"], [4.6, "sit"]] })
    + buddy("momo", 940, 1062, 230, t, { aura: true, in: 3.4, poses: [[3.4, "waving"], [5.0, "sit"]], wave: true })
    + OP(ramp(t, .5, .4) * (1 - ramp(t, 5.1, .3)), lowerPill(60, 60, "Singapore Botanic Gardens,", "by the Bandstand")); };

/* ---- the callback to EP5's dare, Basil's bold guess, Pip's careful fix: the title ---- */
const BX = [668, 1196], BY = 806, BS = .9;
const boards = (t, o = {}) => { const tA = W("c101", "ant") - .25, tSp = W("c101", "spider") - .25, pic = (inner) => `<rect x="-300" y="-300" width="600" height="600" fill="#F1E9D2"/>` + inner;
  return (t >= tA ? TF(BX[0], BY, BS * spring(t, tA, .45) * (1 + .04 * (o.p0 || 0)), wboard(pic(TF(0, 0, 1.2, ant())), 420, 330, "an", { lab: "ant", size: 40 })) : "")
    + (t >= tSp ? TF(BX[1], BY, BS * spring(t, tSp, .45) * (1 + .04 * (o.p1 || 0)), wboard(pic(TF(10, 0, 1.2, spider())), 420, 330, "sp", { lab: "spider", size: 40 })) : ""); };
SC.callback = (t, s) => { const a = "c101", b = "c102", c = "c103", d = "c104", tO = W(a, "only") - .1, tBoth = W(b, "both") - .05, tSm = W(c, "small") - .05, tCt = W(c, "count") - .12, tL = LT(d) - .1, tHold = W(d, "hold") - .1;
  const u = t - s.t0, alt = t >= tL ? Math.floor((t - tL) / .7) % 2 : -1;
  let out = view(t, 1.08 + .02 * clamp(u / 16)) + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * clamp(u / .4))}"/>`;
  out += boards(t, { p0: Math.max(pulse(t, W(b, "small") - .1, .05, .5), alt === 0 ? .8 : 0), p1: Math.max(pulse(t, W(b, "crawl") - .1, .05, .5), alt === 1 ? .8 : 0) });
  // Basil's guess: a teal "insect?" tag on both boards; Pip's fix knocks them off
  BX.forEach((x, i) => { const k = spring(t, tBoth + i * .12, .4), off = clamp((t - tSm - i * .1) / .5); if (k > .02 && off < 1) out += OP(1 - off, TF(x + 96, BY - 372 + 380 * off * off, k, `<g transform="rotate(${n2(-8 + 60 * off)})"><g filter="url(#dropS)"><rect x="-108" y="-36" width="216" height="72" rx="36" fill="${P.basil}"/><rect x="-102" y="-30" width="204" height="60" rx="30" fill="none" stroke="#fff" stroke-width="4"/></g>${T(0, 15, "insect?", 44, "#fff")}</g>`)); });
  // "?" badges: only one is an insect
  if (t >= tO && t < tCt + 3) BX.forEach((x, i) => { out += TF(x - 182, BY - 378, spring(t, tO + i * .1, .4) * (1 + .1 * Math.sin(t * 5 + i)), `<g transform="rotate(-10)"><circle r="40" fill="url(#gSun)" stroke="#fff" stroke-width="5"/>${T(0, 20, "?", 58, P.ink)}</g>`); });
  // top: the dare, then the title
  out += OP(ramp(t, LT(a) - .1, .3) * (1 - ramp(t, tCt - .1, .2)), TF(960, 120, 1, tpill(0, 0, "LAST TIME’S DARE", 38, P.sun, P.ink, { w: 700, ls: 4 })));
  if (t >= tO && t < tCt) out += bigLine(262, `Only <tspan fill="${P.sun}">ONE</tspan> is an insect!`, 104, "#fff", slamK(t, tO));
  if (t >= tCt) { out += bigLine(250, "COUNT THE LEGS!", 170, P.sun, slamK(t, tCt), 6) + OP(pulse(t, tCt, .02, .5), `<circle cx="960" cy="200" r="${n2(200 + 900 * eo((t - tCt) / .5))}" fill="none" stroke="#fff" stroke-width="14"/>`);
    // a magnifying glass goes over the ant's legs, then the spider's (no numbers yet: the count is the viewer's)
    const mu = clamp((t - tCt - .5) / 1.2), mv = clamp((t - tL - .1) / 1.0), mx = lerp(lerp(900, BX[0] - 30, eio(mu)), BX[1] - 30, eio(mv)), my = lerp(700, BY - 210, eio(mu)) - 60 * Math.sin(Math.PI * (mu < 1 ? mu : mv)) + 8 * Math.sin(t * 3);
    out += TF(mx, my, .95 * spring(t, tCt + .4, .4), magnifier(96)); }
  if (t >= tL) out += TF(960, 392, spring(t, tL, .45), tpill(0, 0, t >= tHold ? "Hold on to your answer!" : "Did you lock in your answer?", 46, P.ink, "#fff", { w: 600 }))
    + youPill(596, 392, 1.1 * spring(t, tL + .1, .4));
  out += buddy("pip", 232, 1062, 280, t, { aura: true, poses: [[s.t0, "sit"], [W(b, "both"), "surprised"], [LT(c) - .15, "sit"], [tCt, "pointing"], [tL + .2, "sit"]] })
    + buddy("momo", 932, 1066, 180, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [tO, "thinking"], [tCt + .1, "surprised"], [tL, "thinking"]] })
    + buddy("basil", 1690, 1062, 280, t, { aura: true, flip: true, poses: [[s.t0, "arms_crossed"], [LT(b) - .15, "sit"], [LE(b) + .2, "cheer"], [tSm + .3, "oops"], [tCt + .5, "sit"]], wave: true })
    + say(b, 1660, 640, t, { size: 40, tail: 30, maxW: 420, x: true }) + say(c, 236, 640, t, { size: 40, tail: -10, maxW: 370 });
  return out + OP(clamp(u / .3), logo(t)); };

/* ---- today's big dare: which group is Basil in? ---- */
SC.dare = (t, s) => { const m = "c105", h = "c106", b = "c107", p = "c108", b2 = "c109", u = t - s.t0, tCnt = W(m, "count") - .1, tDare = W(h, "todays") - .15, tw3 = [W(h, "insect") - .1, W(h, "reptile") - .1, W(h, "mammal") - .1], tQ = W(h, "which") - .12, tLk = MK("lockit");
  let out = view(t, 1.1) + `<rect width="1920" height="1080" fill="#FFF8EA" opacity="${n2(.62 * clamp(u / .3))}"/>` + wipe(t, s.t0 + .02, P.sun, 960, 800);
  // three tiles, numbered for the viewer's fingers
  ["INSECTS", "REPTILES", "MAMMALS"].forEach((nm, i) => { const lit = Math.max(pulse(t, tw3[i], .05, 1.0), t >= tLk ? (Math.floor((t - tLk) / .55) % 3 === i ? .9 : 0) : 0); out += `<g transform="translate(${490 + i * 470} 262) scale(1.3)">${groupTile(nm, i + 1, spring(t, tw3[i] - .1, .45), lit)}</g>`; });
  if (t >= tDare) out += TF(960, 96, slamK(t, tDare), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-290" y="-44" width="580" height="88" rx="44" fill="${P.coral}"/><rect x="-282" y="-36" width="564" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 18, "TODAY’S BIG DARE", 50, "#fff", { ls: 4 })}</g>`);
  if (t >= tQ) out += bigLine(486, `Which group is <tspan fill="${P.basil}">Basil</tspan> in?`, 92, P.ink, slamK(t, tQ)).replace(`stroke="${P.ink}"`, 'stroke="#fff"');
  out += buddy("basil", 960, 1056, 420, t, { aura: true, in: s.t0 + .1, poses: [[s.t0, "sit"], [tCnt + .5, "surprised"], [tDare + .3, "sit"], [tQ, "arms_crossed"], [LT(b) - .12, "sit"], [LE(b) + .15, "arms_crossed"], [LE(p) - .5, "oops"], [LT(b2) - .12, "sit"], [LE(b2) + .1, "cheer"]], jump: [[tCnt + .5, 30]], wave: true })
    + buddy("pip", 330, 1060, 270, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ + .2, "thinking"], [LT(p) - .12, "sit"], [LE(p) + .2, "arms_crossed"], [LE(b2) + .2, "surprised"]] })
    + buddy("momo", 1590, 1060, 270, t, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [LE(m) + .15, "pointing"], [tDare + .2, "sit"], [tQ + .3, "thinking"], [LT(b) - .1, "surprised"], [LE(b2), "waving"]], wave: true })
    + say(m, 1540, 640, t, { size: 42, tail: 40, maxW: 440 }) + say(b, 960, 590, t, { size: 54, tail: 0, merge: true }) + say(p, 350, 640, t, { size: 42, tail: -30, maxW: 440 }) + say(b2, 960, 590, t, { size: 54, tail: 0, merge: true });
  // Momo's magnifying glass slides low along the ground to Basil's feet
  { const mu = clamp((t - tCnt) / 1.1), gone = ramp(t, tDare - .1, .3), x = lerp(1400, 1150, eio(mu)), y = 930 - 26 * Math.abs(Math.sin(mu * Math.PI * 3)) * (mu < 1 ? 1 : 0) + 5 * Math.sin(t * 4);
    if (t >= tCnt - .2 && gone < 1) out += OP(1 - gone, TF(x, y, 1.25 * spring(t, tCnt - .2, .4), `<g transform="scale(-1 1)">${magnifier(90)}</g>`)); }
  // the viewer's hand: one, two or three fingers
  { const nf = t >= tLk ? Math.floor((t - tLk) / .55) % 3 + 1 : t >= tw3[2] ? 3 : t >= tw3[1] ? 2 : 1, k = spring(t, tw3[0] - .15, .45); if (k > .02) out += TF(1764, 470, k, `<circle cy="-10" r="128" fill="${P.ink}" opacity=".8"/>` + youPill(0, -150, 1.05) + `<g transform="translate(0 4) scale(.56)" filter="url(#dropS)">${countHand(nf)}</g>`); }
  if (t >= tLk) out += TF(1764, 650, spring(t, tLk, .4) * (1 + .05 * Math.sin(t * 8)), tpill(0, 0, "Lock it in!", 40, P.sun, P.ink, { w: 700 }));
  return out + logo(t); };
})(); }

/* =====================================================================================================================
   MOMENT 2 · BE THE THING: you are one scale on a lizard's back
   ===================================================================================================================== */
if (PART === 2) { (() => {
const td = MK("dive"), tCo = MK("cool"), tW = MK("walk"), tS = MK("sun"), tC = MK("cloud"), tP = MK("pullout"), LZ0 = [540, 936, .8];
// how far the lizard has walked (in "body lengths"): slowly in the shade, then a steady crawl into the sun, then it settles on the rock
const dist = (t) => .07 * (Math.min(t, tW) - td) + (t > tW ? .62 * (Math.min(t, tS) - tW) : 0) + (t > tS ? .62 * .6 * (1 - Math.exp(-(t - tS) / .6)) : 0);
const ZR = dist(tS) + .12;                       // where the rock begins
const sunOn = (t) => ss(tS - 1.1, tS + .2, t), cover = (t) => ss(tC + .2, tC + 1.7, t) * (1 - ss(tP + 3.2, tP + 5.2, t));
const placeT = (t) => .2 + .66 * sunOn(t) * (1 - .78 * cover(t));
// the lizard's own temperature follows the place, a little late
const lizT = (t) => { const a = follow(t, tS - .7, .2, .86, 1.5); if (t < tC + .5) return a; const b = follow(t, tC + .5, follow(tC + .5, tS - .7, .2, .86, 1.5), .34, 1.6); if (t < tP + 3.6) return b; return follow(t, tP + 3.6, follow(tP + 3.6, tC + .5, follow(tC + .5, tS - .7, .2, .86, 1.5), .34, 1.6), .86, 1.6); };
const HZ = 396, yOf = (rel) => HZ + 262 / rel;
// the wide view: the lake bank, the cloud, the lizard
const lakeView = (t, o = {}) => { const cv = o.cover || 0, cx = lerp(1080, 1560, eio(o.cin === undefined ? cv : o.cin)) + 700 * (o.cout || 0) + 14 * Math.sin(t * .4);
  return bg("lake") + `<circle cx="1620" cy="96" r="300" fill="url(#sunG)" opacity="${n2(1 - .6 * cv)}"/><circle cx="1620" cy="96" r="70" fill="#FFF6C8"/>`
    + OP(cv > .01 || o.cloud ? 1 : 0, `<g transform="translate(${n2(cx)} 100)" filter="url(#dropS)"><ellipse cx="0" cy="0" rx="210" ry="62" fill="#fff"/><ellipse cx="-110" cy="20" rx="120" ry="48" fill="#F1F5FA"/><ellipse cx="110" cy="24" rx="130" ry="46" fill="#F1F5FA"/><ellipse cx="20" cy="-40" rx="110" ry="54" fill="#fff"/></g>`)
    + (o.liz ? TF(o.liz[0], o.liz[1], o.liz[2] || 1, monitor(o.lz || {})) : "")
    + `<rect width="1920" height="1080" fill="#3B5E9A" opacity="${n2(.2 * cv)}" style="mix-blend-mode:multiply"/>`; };
const tongueAt = (t, per = 2.7, ph = 0) => { const u = ((t + ph) % per) / .5; return u < 1 ? Math.sin(Math.PI * u) : 0; };

SC.waitw = (t, s) => { const b = "j200", h = "j201", tz = LT(h) - .1, z = 1 + .9 * ei(clamp((t - tz) / (s.t1 - tz)));
  return CAM(lakeView(t, { liz: LZ0, lz: { warm: .2, breathe: Math.sin(t * 2), tongue: tongueAt(t, 2.4, .6), blink: (t % 3.1) < .12 } }), z, LZ0[0] - 20, LZ0[1] - 90)
    + OP(1 - ramp(t, tz + .5, .4), buddy("basil", 1660, 1056, 290, t, { aura: true, flip: true, in: .15, poses: [[0, "sit"], [LE(b) + .15, "cheer"]], wave: true }) + say(b, 1480, 600, t, { size: 46, tail: 150, maxW: 520, merge: true }))
    + OP(ramp(t, .4, .4) * (1 - ramp(t, tz, .3)), lowerPill(60, 60, "Singapore Botanic Gardens,", "early morning"))
    + (t >= tz ? TF(960, 250, spring(t, tz, .45), tpill(0, 0, "Shrink down… quietly", 50, P.ink, "#fff", { w: 600 })) : ""); };

/* ---- the micro-world: the camera rides on the monitor lizard's back, behind its shoulders, looking forward along the long neck to the small head.
   Anatomy from the teacher's photos (20 Nov): a broad, gently arched back; a long, thick, tapering neck; a slim, low wedge of a head with small eyes on
   the sides; short thick front legs that bend OUT at the elbow and then go DOWN to the ground, long curved claws (a push-up, never arms held out);
   skin of thousands of very small beads, dark grey-brown, with rows of small pale yellowish spots (a Malayan water monitor). YOU are one bead. ---- */
const YOU_Y = 904, hwAt = (y) => lerp(lerp(70, 132, clamp((y - 430) / 190)), 330 + 800 * Math.pow(clamp((y - 690) / 390), 1.35), ss(612, 704, y)), szAt = (y) => 6 + 25 * Math.pow(clamp((y - 440) / 640), 1.25);
const skin = (T_) => ({ base: hexL("#4E4F48", "#655C42", T_), mid: hexL("#5B5C53", "#756A4A", T_), dark: hexL("#35362F", "#463F2D", T_), gap: hexL("#22231F", "#2D281C", T_), spot: hexL("#D2CB94", "#F4E08C", T_), line: "#191A16" });
// the beads seen very close up (the opening view, and the round window): a honeycomb of small round scales; the one in the middle is YOU
function beadsClose(t, T_, R, n, glowT) { const c = skin(T_), dx = R * 2.08, dy = R * 1.8; let s = "";
  for (let j = -n; j <= n; j++) for (let i = -n - 1; i <= n + 1; i++) { const x = (i + (j & 1 ? .5 : 0)) * dx, y = j * dy, h = hash(i * 13 + j * 57, 3), me = i === 0 && j === 0, sp = !me && ((j + 400) % 5 === 2) && ((i + 400) % 4 === 1), r = R * (.9 + .1 * hash(i * 7 + j * 3, 9));
    if (me) continue; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="${sp ? c.spot : h < .2 ? c.dark : h > .7 ? c.mid : c.base}" stroke="${c.line}" stroke-width="${n2(R * .09)}"/><path d="M${n2(x - r * .5)} ${n2(y - r * .36)} q${n2(r * .44)} ${n2(-r * .36)} ${n2(r * .94)} ${n2(-r * .06)}" stroke="#fff" stroke-width="${n2(R * .1)}" stroke-linecap="round" fill="none" opacity="${n2(.12 + .3 * glowT)}"/>`; }
  const gl = .5 + .5 * Math.sin(t * 3);
  return `<rect x="${-(n + 2) * dx}" y="${-(n + 1) * dy}" width="${(n + 2) * dx * 2}" height="${(n + 1) * dy * 2}" fill="${c.gap}"/>` + s
    + `<circle r="${n2(R * .96)}" fill="${hexL(c.base, hexL("#6FA8F5", "#FFB03A", T_), .55)}" stroke="${P.sun}" stroke-width="${n2(R * .16)}"/><circle r="${n2(R * 1.06)}" fill="none" stroke="#fff" stroke-width="${n2(R * .05)}" opacity="${n2(.4 + .6 * gl)}"/><path d="M${n2(-R * .5)} ${n2(-R * .36)} q${n2(R * .44)} ${n2(-R * .36)} ${n2(R * .94)} ${n2(-R * .06)}" stroke="#fff" stroke-width="${n2(R * .11)}" stroke-linecap="round" fill="none" opacity=".6"/>`; }
function pov(t) { const d = dist(t), ph = 2 * Math.PI * d / .34, moving = clamp((t - td - .6) / .8), sway = 20 * Math.sin(ph) * moving, hsw = -34 * Math.sin(ph - .7) * moving, sun = sunOn(t), cv = cover(t), lit = sun * (1 - cv), T_ = lizT(t), rockRel = ZR - d;
  const br = Math.sin(t * 2.2), look = t > tS + .5 ? 9 * Math.sin((t - tS) * .9) * (1 - cv * .6) : 0, c = skin(T_);
  // --- far: sky, sun, the cloud, the blurred garden
  let far = `<rect x="-300" y="-300" width="2520" height="${HZ + 300}" fill="url(#gdSky)"/><circle cx="1330" cy="130" r="${n2(360 + 30 * Math.sin(t))}" fill="url(#sunG)" opacity="${n2(.25 + .75 * lit)}"/><circle cx="1330" cy="130" r="64" fill="#FFF8D2" opacity="${n2(.5 + .5 * sun)}"/>`;
  { const cx = lerp(640, 1330, eio(cv)); if (t >= tC - .6) far += OP(ramp(t, tC - .6, .5), `<g transform="translate(${n2(cx)} 132)"><ellipse cx="0" cy="0" rx="290" ry="84" fill="#fff"/><ellipse cx="-150" cy="26" rx="170" ry="64" fill="#EEF3F9"/><ellipse cx="160" cy="30" rx="180" ry="62" fill="#EEF3F9"/><ellipse cx="30" cy="-56" rx="150" ry="70" fill="#fff"/></g>`); }
  let bok = ""; for (let i = 0; i < 16; i++) { const x = ((i * 173 - d * 150 * (1 + (i % 3) * .3)) % 2400 + 2400) % 2400 - 240; bok += `<circle cx="${n2(x)}" cy="${n2(HZ - 40 - 70 * hash(i, 2))}" r="${n2(120 + 90 * hash(i, 4))}" fill="${i % 3 ? "#4FA765" : "#3A8F55"}"/>`; }
  far += `<g filter="url(#b10)">${bok}</g>`;
  { const cs = clamp((ZR - d) / (ZR - dist(tW))); if (cs > 0) { let lv = ""; for (let i = 0; i < 12; i++) lv += `<ellipse cx="${n2(-100 + i * 190)}" cy="${n2(-40 + 90 * hash(i, 6))}" rx="${n2(210 + 60 * hash(i, 8))}" ry="${n2(120 + 40 * hash(i, 9))}" fill="${i % 2 ? "#236B42" : "#2E7D4C"}"/>`; far += `<g transform="translate(0 ${n2(-420 * (1 - cs) * (1 - cs))}) scale(1 ${n2(1 + .5 * (1 - cs))})" filter="url(#b4)">${lv}</g>`; } }
  // --- the ground: grass, then the rock; bands and blades come towards you as the lizard walks
  let gr = `<rect x="-300" y="${HZ}" width="2520" height="900" fill="url(#gdLawn)"/>`;
  if (rockRel < 9) { const ye = rockRel > .3 ? yOf(rockRel) : 1300; gr += `<path d="M-300 ${HZ + 2} H2220 V${n2(ye)} Q960 ${n2(ye + (ye - HZ) * .1)} -300 ${n2(ye)}z" fill="url(#gdRock)"/><path d="M-300 ${HZ + 2} H2220 V${n2(Math.min(ye, HZ + 90))} H-300z" fill="#FFF3C9" opacity="${n2(.55 * (1 - cv))}"/>` + (ye < 1200 ? `<path d="M-300 ${n2(ye)} Q960 ${n2(ye + (ye - HZ) * .1)} 2220 ${n2(ye)}" stroke="#6E685C" stroke-width="${n2(3 + (ye - HZ) * .02)}" fill="none"/>` : ""); }
  for (let k = 0; k < 26; k++) { const z = k * .3, rel = z - d; if (rel < .36 || rel > 7) continue; const y = yOf(rel), rk = z > ZR; gr += `<path d="M-300 ${n2(y)} Q960 ${n2(y + (y - HZ) * .08)} 2220 ${n2(y)}" stroke="${rk ? "#8C8576" : "#3F9A52"}" stroke-width="${n2(2 + 5 / rel)}" fill="none" opacity="${n2(.35 * clamp((7 - rel) / 3))}"/>`; }
  const items = []; for (let i = 0; i < 44; i++) { const z = .5 + i * .16 + .1 * hash(i, 3), rel = z - d; if (rel < .2 || rel > 6) continue; items.push([rel, i, z]); } items.sort((a, b) => b[0] - a[0]);
  let near = "";
  for (const [rel, i, z] of items) { const side = i % 2 ? 1 : -1, lat = 420 + 620 * hash(i, 5), x = 960 + side * lat / rel + sway * .2, y = yOf(rel), sc = 1 / rel, fade = clamp((6 - rel) / 2) * clamp((rel - .2) / .12);
    if (z < ZR - .1) { const h = (260 + 240 * hash(i, 7)) * sc, w = 22 * sc, bend = (30 * Math.sin(t * 1.3 + i) + side * 40) * sc; const s1 = `<path d="M${n2(x - w)} ${n2(y)} Q${n2(x - w * .6 + bend * .4)} ${n2(y - h * .6)} ${n2(x + bend)} ${n2(y - h)} Q${n2(x + w * .6 + bend * .4)} ${n2(y - h * .6)} ${n2(x + w)} ${n2(y)}z" fill="${i % 3 ? "#3F9A52" : "#56B45E"}" stroke="#2F7F45" stroke-width="${n2(Math.min(8, 3 * sc))}" opacity="${n2(fade)}"/>`; if (rel < .75) near += s1; else gr += s1; }
    else if (z > ZR + .15) gr += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(26 * sc * (1 + hash(i, 9)))}" ry="${n2(9 * sc)}" fill="#6E685C" opacity="${n2(.45 * fade)}"/>`; }
  // --- the centre line of the animal: the back sways one way, the neck and head the other
  const cxAt = (y) => 960 + lerp(hsw, sway, ss(470, 800, y));
  // a fine bead pattern for the far parts (neck, head, legs)
  const pat = `<pattern id="bdP" width="13" height="11.4" patternUnits="userSpaceOnUse"><rect width="13" height="11.4" fill="${c.gap}"/><circle cx="3.2" cy="2.9" r="2.9" fill="${c.base}"/><circle cx="9.7" cy="2.9" r="2.9" fill="${c.mid}"/><circle cx="0" cy="8.6" r="2.9" fill="${c.mid}"/><circle cx="6.5" cy="8.6" r="2.9" fill="${c.base}"/><circle cx="13" cy="8.6" r="2.9" fill="${c.mid}"/></pattern>`;
  // --- the front legs: out sideways to the elbow, then down to the ground, like a push-up; long curved claws
  const foot = (sd) => { const st = Math.sin(ph + (sd > 0 ? 0 : Math.PI)), fwd = Math.max(0, st) * moving, bx = cxAt(700), sx = bx + sd * 270, ex = bx + sd * (452 + 10 * fwd), ey = 612 - 8 * fwd + 3 * br, fx = bx + sd * (500 + 12 * fwd), fy = 790 - 46 * fwd;
    let cl = ""; [-34, -12, 10, 32, 54].forEach((a, i) => { const an = (-90 + sd * (30 + a * .9)) * Math.PI / 180, tx = fx + Math.cos(an) * 62, ty = fy + Math.sin(an) * 40 - 6, cx2 = tx + Math.cos(an) * 34 + sd * 8, cy2 = ty + Math.sin(an) * 22 + 12;
      cl += `<path d="M${n2(fx)} ${n2(fy)} L${n2(tx)} ${n2(ty)}" stroke="${c.line}" stroke-width="30" stroke-linecap="round"/><path d="M${n2(fx)} ${n2(fy)} L${n2(tx)} ${n2(ty)}" stroke="url(#bdP)" stroke-width="21" stroke-linecap="round"/><path d="M${n2(tx)} ${n2(ty)} Q${n2(tx + Math.cos(an) * 30)} ${n2(ty + Math.sin(an) * 22 - 8)} ${n2(cx2)} ${n2(cy2)}" stroke="#14110F" stroke-width="9" stroke-linecap="round" fill="none"/>`; });
    return `<ellipse cx="${n2(fx + sd * 20)}" cy="${n2(fy + 26)}" rx="120" ry="24" fill="#1B1430" opacity="${n2(.3 - .12 * fwd)}" filter="url(#b4)"/>` + cl
      + `<path d="M${n2(sx)} 676 L${n2(ex)} ${n2(ey)} L${n2(fx)} ${n2(fy)}" stroke="${c.line}" stroke-width="112" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M${n2(sx)} 676 L${n2(ex)} ${n2(ey)} L${n2(fx)} ${n2(fy)}" stroke="url(#bdP)" stroke-width="98" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M${n2(ex - sd * 30)} ${n2(ey - 40)} Q${n2(ex + sd * 22)} ${n2(ey - 44)} ${n2(ex + sd * 44)} ${n2(ey + 6)}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity="${n2(.1 + .25 * lit)}"/><path d="M${n2(ex + sd * 2)} ${n2(ey + 34)} L${n2(fx - sd * 4)} ${n2(fy - 30)}" stroke="#000" stroke-width="40" stroke-linecap="round" opacity=".16"/>`; };
  // --- the head: a slim, low wedge far ahead, small eyes on its sides; the forked tongue flicks
  const hx = cxAt(430), hy = 432 + 3 * br, tg = tongueAt(t, t > tS ? 1.7 : 3.1, .3) * moving;
  const head = `<g transform="translate(${n2(hx)} ${n2(hy)}) rotate(${n2(hsw * .1 + look)}) scale(1.12 1.34)">
    ${tg > .02 ? `<path d="M0 -116 v${n2(-40 * tg)} l${n2(-9 * tg)} ${n2(-18 * tg)} M0 ${n2(-116 - 40 * tg)} l${n2(9 * tg)} ${n2(-18 * tg)}" stroke="#D9577A" stroke-width="6" stroke-linecap="round" fill="none"/>` : ""}
    <path d="M-70 30 Q-80 -22 -66 -48 Q-46 -92 -24 -110 Q0 -124 24 -110 Q46 -92 66 -48 Q80 -22 70 30z" fill="url(#bdP)"/><path d="M-72 22 Q-80 -22 -66 -48 Q-46 -92 -24 -110 Q0 -124 24 -110 Q46 -92 66 -48 Q80 -22 72 22" fill="none" stroke="${c.line}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M-70 -30 q-10 6 -6 20 M70 -30 q10 6 6 20" stroke="${c.line}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-66" cy="-40" rx="6" ry="10" fill="#E8D48A" stroke="${c.line}" stroke-width="3"/><ellipse cx="66" cy="-40" rx="6" ry="10" fill="#E8D48A" stroke="${c.line}" stroke-width="3"/>
    <path d="M0 -112 V4" stroke="#000" stroke-width="5" opacity=".14"/><path d="M-26 -84 Q0 -100 26 -84" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity="${n2(.1 + .3 * lit)}"/></g>`;
  // --- the body from behind: the long tapering neck widening into the broad, gently arched back
  const ys = []; for (let y = 430; y <= 1120; y += 18) ys.push(y); const L_ = ys.map((y) => `${n2(cxAt(y) - hwAt(y))} ${y}`), R_ = ys.slice().reverse().map((y) => `${n2(cxAt(y) + hwAt(y))} ${y}`), sil = `M${L_.join(" L")} L${R_.join(" L")}z`;
  let rows = {}, you = null, ri = 0; const add = (k, s) => { rows[k] = (rows[k] || "") + s; };
  for (let y = 1104; y > 596; ri++) { const s = szAt(y), hw = hwAt(y) - s * .2, cx = cxAt(y), n = Math.floor(hw / s) + 1, off = (ri & 1) ? .5 : 0, band = ri % 8 === 3;
    for (let k = -n; k <= n; k++) { const x = (k + off) * s; if (Math.abs(x) > hw) continue; const h = hash(k * 31 + ri * 77, 3), me = ri === you_row && k === 0, key = me ? null : band && ((k + 600 + (ri >> 3)) % 4 === 0) ? "spot" : h < .22 ? "dark" : h > .72 ? "mid" : "base";
      if (me) you = [cx + x, y, s]; else add(key, `<circle cx="${n2(cx + x)}" cy="${n2(y)}" r="${n2(s * .47)}"/>`); }
    y -= s * .86; }
  const arch = `<path d="${sil}" fill="url(#archG)"/><path d="M${n2(cxAt(1100))} 1100 ${[1000, 900, 800, 700, 620, 540, 460].map((y) => `L${n2(cxAt(y))} ${y}`).join(" ")}" stroke="#fff" stroke-width="60" stroke-linecap="round" fill="none" opacity="${n2(.05 + .1 * lit)}" filter="url(#b10)"/>`;
  let folds = ""; [480, 516, 552, 588].forEach((y, i) => { const w = hwAt(y) * .86, x = cxAt(y); folds += `<path d="M${n2(x - w)} ${y} Q${n2(x)} ${y + 15} ${n2(x + w)} ${y}" stroke="#000" stroke-width="4" fill="none" opacity=".2"/>`; });
  const back = `<defs>${pat}<linearGradient id="archG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="bkC"><path d="${sil}"/></clipPath></defs>`
    + `<path d="${sil}" fill="url(#bdP)" stroke="${c.line}" stroke-width="9" stroke-linejoin="round"/><g clip-path="url(#bkC)"><rect x="-300" y="600" width="2520" height="520" fill="${c.gap}"/><rect x="-300" y="560" width="2520" height="60" fill="${c.gap}" opacity=".5"/>`
    + ["base", "mid", "dark", "spot"].map((k) => `<g fill="${c[k]}">${rows[k] || ""}</g>`).join("") + folds + arch + `</g>`
    + (you ? `<circle cx="${n2(you[0])}" cy="${n2(you[1])}" r="${n2(you[2] * .47)}" fill="${hexL(c.base, hexL("#6FA8F5", "#FFB03A", T_), .6)}" stroke="${P.sun}" stroke-width="3.5"/><circle cx="${n2(you[0])}" cy="${n2(you[1])}" r="${n2(you[2] * .5 + 9 + 4 * Math.sin(t * 3))}" fill="none" stroke="${P.sun}" stroke-width="4" opacity=".9"/>` : "");
  // --- light: cool blue in the shade, warm gold in the sun; the cloud's shadow sweeps over
  let light = `<rect x="-300" y="-300" width="2520" height="1700" fill="#3F66B0" opacity="${n2(.3 * (1 - lit))}" style="mix-blend-mode:multiply"/><rect x="-300" y="-300" width="2520" height="1700" fill="#FFC95A" opacity="${n2(.3 * lit)}" style="mix-blend-mode:soft-light"/>`;
  if (lit > .05) { for (let i = 0; i < 5; i++) light += `<path d="M1330 130 L${n2(300 + i * 330 + 40 * Math.sin(t * .4 + i))} 1100 L${n2(480 + i * 330 + 40 * Math.sin(t * .4 + i))} 1100z" fill="#FFF3B8" opacity="${n2(.1 * lit * (.6 + .4 * Math.sin(t * .9 + i * 2)))}"/>`;
    for (let i = 0; i < 9; i++) { const v = ((t * .32 + hash(i, 41)) % 1), x = 140 + hash(i, 43) * 1640, y = 1000 - 520 * v; light += `<path d="M${n2(x)} ${n2(y)} q16 -22 0 -44 q-16 -22 0 -44" stroke="#FFF3C9" stroke-width="7" stroke-linecap="round" fill="none" opacity="${n2(.5 * lit * Math.sin(Math.PI * v) * clamp(T_ * 1.4 - .3))}"/>`; }
    for (let i = 0; i < 12; i++) { const life = 1.2 + hash(i, 51), v = ((t + hash(i, 53) * 3) % life) / life, x = 360 + hash(i, 55) * 1200 + sway, y = 780 + hash(i, 57) * 280; light += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(.55 * Math.sin(Math.PI * v) * lit)}) rotate(${n2(60 * v)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF8D2"/></g>`; } }
  return { world: far + gr, body: `<defs>${pat}</defs>` + foot(-1) + foot(1) + near + back + head, light, you, T_, lit, sway }; }
const you_row = 9;

SC.shrink = (t, s) => { const u = t - td, p = pov(t), bob = 4 * Math.sin(t * 2.2) + 2 * Math.sin(2 * Math.PI * dist(t) / .17), tOut = W("j203", "all") - .5, e = eio((t - tOut) / 2.0), [yx, yy, ys] = p.you || [960, YOU_Y, 20];
  // the way in ends VERY close: the screen is full of small round scales, and one of them is you. On "All around you, more scales" the camera
  // pulls back, and you are one bead among thousands on a monitor lizard's back.
  const Z = lerp(118 / (ys * .47), 1, e), ax = lerp(960, 960, e), ay = lerp(600, 540 + bob, e), tx = lerp(yx, 960, e), ty = lerp(yy, 540, e);
  let out = `<g transform="translate(${n2(ax)} ${n2(ay)}) scale(${n2(Z * 1000) / 1000}) translate(${n2(-tx)} ${n2(-ty)})">${p.world}${p.body}${p.light}</g>`;
  if (e < 1) { const a = 1 - ss(.02, .4, e), R = 118 * lerp(1, .5, e); if (a > 0) out += OP(a, `<g transform="translate(960 600) rotate(${n2(1.2 * Math.sin(t * .6))}) scale(${n2(1 + .012 * Math.sin(t * 2.2))})">${beadsClose(t, p.T_, R, 6, 0)}</g><rect width="1920" height="1080" fill="#3F66B0" opacity=".26" style="mix-blend-mode:multiply"/><rect width="1920" height="1080" fill="url(#gVig)"/>`); }
  // the way in: the wide view rushes past and clears
  if (u < 1.0) { const q = ei(u / 1.0); out += OP(1 - ss(.35, 1.0, u), CAM(lakeView(t, { liz: LZ0, lz: { warm: .2 } }), 1.9 + 9 * q, LZ0[0] - 20, LZ0[1] - 90)) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.8 * pulse(u, .62, .3, .5))}"/>`; }
  // YOU, close up: a pill joined to your scale by one plain line
  { const a = ramp(t, LT("j202") - .2, .4) * (1 - ramp(t, tOut - .1, .4)); out += OP(a, `<path d="M640 470 L880 566" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="880" cy="566" r="8" fill="#fff"/>` + youPill(560, 430, 1.4) + TF(560, 506, 1, tpill(0, 0, "one tiny scale", 36, P.ink, "#fff", { w: 600 }))); }
  // after the pull-back: a round window keeps your scale in view, joined to the real one (one small bead among thousands) by a plain line
  { const k = spring(t, tOut + 1.5, .5); if (k > .02) { const LX = 226, LY = 852, LR = 196, sx = 960 + (yx - 960), sy = 540 + bob + (yy - 540), an = Math.atan2(sy - LY, sx - LX);
    out += OP(Math.min(1, k), `<path d="M${n2(LX + Math.cos(an) * LR)} ${n2(LY + Math.sin(an) * LR)} L${n2(sx - 16)} ${n2(sy - 3)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`)
      + TF(LX, LY, k, `<clipPath id="lnC"><circle r="${LR}"/></clipPath><g filter="url(#drop)"><circle r="${LR + 10}" fill="#fff"/></g><g clip-path="url(#lnC)">${beadsClose(t, p.T_, 37, 5, p.lit)}<rect x="-240" y="-240" width="480" height="480" fill="#3F66B0" opacity="${n2(.26 * (1 - p.lit))}" style="mix-blend-mode:multiply"/><rect x="-240" y="-240" width="480" height="480" fill="#FFC95A" opacity="${n2(.3 * p.lit)}" style="mix-blend-mode:soft-light"/></g><circle r="${LR + 5}" fill="none" stroke="${P.ink}" stroke-width="7"/>` + youPill(0, -LR - 26, 1.15)); } }
  // what you feel, in the words Heart uses
  out += feelTag(t, W("j203", "dry") - .15, tOut - .1, "dry", 860, 760, 60) + feelTag(t, W("j203", "moist") - .1, tOut - .1, "not moist", 860, 1140, 46) + feelTag(t, tOut + 1.3, tCo - .2, "dry, scaly skin", 760, 960, 54)
    + feelTag(t, W("j204", "cool") - .15, tW - .1, "cool shade", 250, 560, 46) + feelTag(t, W("j204", "cool", 1) - .15, tW - .1, "the lizard is cool too", 760, 960, 46)
    + feelTag(t, W("j206", "warm") - .15, tC - .3, "warm rock", 330, 1300, 46) + feelTag(t, W("j206", "warms") - .3, tC - .3, "the lizard warms up!", 760, 960, 50)
    + feelTag(t, W("j207", "cool") - .15, s.t1 - .5, "you cool down again", 760, 960, 46);
  // two plain thermometers: the place, and the lizard. They rise and fall together.
  { const k = spring(t, tCo - .5, .5), pl = placeT(t), lz = p.T_, ch = Math.max(pulse(t, tS, .2, 1.6), pulse(t, tC + .9, .2, 1.6)); out += thermo(1640, 700, pl, "PLACE", { k, H: 290, glow: ch }) + thermo(1800, 700, lz, "LIZARD", { k: spring(t, tCo - .3, .5), H: 290, glow: ch, fill: P.basil });
    out += OP(ramp(t, tCo - .2, .4), tpill(1720, 420, "warm", 24, "#FF5A3C", "#fff", { w: 700, nosh: 1 }) + tpill(1720, 640, "cool", 24, "#3A8DFF", "#fff", { w: 700, nosh: 1 })); }
  out += youTag(t, LT("j202") - .3, "You are a scale") + OP(ramp(t, LT("j202") + .6, .4) * (1 - ramp(t, tOut + .2, .5)), TF(60 + 150, 146, 1, tpill(0, 0, "seen very close up", 28, "#fff", P.ink, { w: 600 }))) + OP(ramp(t, tOut + 1.6, .4), TF(60 + 196, 146, 1, tpill(0, 0, "on a monitor lizard’s back", 28, "#fff", P.ink, { w: 600 }))) + speeded(t, tS + .2, tC + 3.5, 190, 216);
  return out; };

/* ---- back out to normal size: the book's words name what you just lived through ---- */
const DEF = ["Reptiles are cold-blooded animals.", "This means that they do not have a constant", "body temperature like humans.", "Their body temperature changes with the", "environment that they are in."], KEYS = ["cold-blooded", "changes", "environment"];
function defCard(t, id, t0, t1) { const L = TL.lines[id], size = 53, lh = 72, fam = "Atkinson Hyperlegible", Wc = 1200, Hc = DEF.length * lh + 120, a0 = spring(t, t0, .5) * (1 - ramp(t, t1, .25)); if (a0 <= .01) return ""; let tx = "", wi = 0;
  DEF.forEach((ln, li) => { let cx = 0; ln.split(" ").forEach((w) => { const wt = L.words[wi] ? L.words[wi].a : L.end, a = ramp(t, wt - .05, .16), ww = tw(w, size, 700, fam), y = 150 + li * lh; wi++;
    if (a > 0) { if (KEYS.includes(norm(w))) tx += `<rect x="${n2(54 + cx - 6)}" y="${n2(y - size * .78)}" width="${n2(eo((t - wt) / .35) * (ww + 12))}" height="${n2(size * 1.0)}" rx="8" fill="#FFD75A"/>`; tx += `<text x="${n2(54 + cx)}" y="${n2(y + (1 - a) * 8)}" font-family="${fam}" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(a)}">${esc(w)}</text>`; }
    cx += ww + tw(" ", size, 700, fam); }); });
  return TF(70 + Wc / 2, 150 + Hc / 2, a0, `<g transform="rotate(-.6) translate(${-Wc / 2} ${-Hc / 2})"><g filter="url(#drop)"><rect width="${Wc}" height="${Hc}" rx="28" fill="url(#gPaper)"/><rect width="18" height="${Hc}" rx="9" fill="${P.sun}"/></g><g transform="translate(40 -28)" filter="url(#dropS)"><rect width="330" height="62" rx="31" fill="url(#gSun)"/></g>${T(74, 14, "FROM YOUR BOOK", 30, P.ink, { a: "start", ls: 3 })}${tx}</g>`); }
SC.reveal = (t, s) => { const L = "j208", B = "j209", u = t - tP, e = eo(u / 1.2), tK = MK("kw_cold"), tHum = W(L, "humans") - .5, tCh = W(L, "changes") - .2, pl = placeT(t), lz = lizT(t), tDry = W(B, "dry") - .1, tCb = W(B, "cold-blooded") - .1, tMe = W(B, "me") - .15, tRep = W(B, "reptile") - .15, LZ = [ROCK[0] + 50, ROCK[1] - 6, .72];
  let out = CAM(lakeView(t, { cover: cover(t), cin: 1, cout: ss(tP + 3.2, tP + 5.6, t), cloud: 1, liz: LZ, lz: { warm: lz, breathe: Math.sin(t * 2), tongue: tongueAt(t, 2.9, 1), blink: (t % 3.3) < .12 } }), lerp(3.4, 1, e), LZ[0] - 40, LZ[1] - 120);
  if (u < 1.1) { const p = pov(t); out += OP(1 - ss(.05, .5, u), `<g transform="translate(${n2(lerp(960, LZ[0] - 40, e))} ${n2(lerp(540, LZ[1] - 120, e))}) scale(${n2(lerp(1, .12, e))}) translate(-960 -540)">${p.world}${p.body}${p.light}</g>`); }
  // sunshine on the rock when the cloud has passed
  out += `<ellipse cx="${ROCK[0]}" cy="${ROCK[1] - 60}" rx="520" ry="230" fill="#FFE48A" opacity="${n2(.22 * (1 - cover(t)) * e)}" filter="url(#b30)"/>`;
  out += defCard(t, L, tP + 1.0, tK - .15);
  // the thermometers stay: the place and the lizard move together; YOU stay the same
  { const k = e, ch = pulse(t, tP + 4.4, .3, 2.2), yk = spring(t, tHum, .5), X = [1500, 1650, 1800], gone = 1 - ramp(t, tK - .2, .25) + ramp(t, tK + 2.6, .3), YB = 566, capO = 1 - ramp(t, tK - .25, .2);
    out += OP(clamp(gone), (yk > .02 ? thermo(X[0], YB, .62, "YOU", { k: yk, H: 250, fill: P.sun, ink: P.ink, glow: pulse(t, tHum + .5, .2, 1.2) }) + OP(ramp(t, tHum + .5, .3) * capO, TF(X[0] - 30, 172, 1, tpill(0, 0, "stays the same", 28, "#fff", P.ink, { w: 600 }))) : "")
      + thermo(X[1], YB, pl, "PLACE", { k, H: 250, glow: ch }) + thermo(X[2], YB, lz, "LIZARD", { k, H: 250, glow: ch, fill: P.basil })
      + (t >= tCh ? OP(capO, TF((X[1] + X[2]) / 2 + 10, 172, spring(t, tCh, .45), tpill(0, 0, "change together", 28, "#fff", P.ink, { w: 600 }))) : "")); }
  // Basil's big moment
  const cheer = [[LE(B) + .1, 80], [LE(B) + .8, 50], [LE(B) + 1.5, 50]];
  out += buddy("basil", 330, 1056, 330, t, { aura: true, in: tP + .7, poses: [[tP, "sit"], [tHum, "surprised"], [tHum + 1.6, "sit"], [tK, "cheer"], [LT(B) - .12, "sit"], [LE(B) + .1, "cheer"]], jump: cheer, wave: true })
    + say(B, 520, 600, t, { size: 46, tail: -120, maxW: 560 });
  [["dry, scaly skin", tDry], ["cold-blooded", tCb]].forEach(([tx, tt], i) => { if (t >= tt) out += TF(1010, 470 + i * 96, spring(t, tt, .45), `<g transform="translate(${n2(-tw(tx, 46, 700) / 2 - 62)} 0)">${tickBadge(30)}</g>` + tpill(0, 0, tx, 46, "#fff", P.ink, { w: 700 })); });
  if (t >= tMe) out += OP(pulse(t, tMe, .05, .8), `<circle cx="300" cy="900" r="${n2(230 + 200 * eo((t - tMe) / .6))}" fill="none" stroke="${P.basil}" stroke-width="12"/>`);
  if (t >= tRep) { const k = (t - tRep) / .14 < 1 ? lerp(2.4, 1, eo((t - tRep) / .14)) : 1 + .06 * wob(t, tRep + .14, .4); out += TF(1010, 276, k, `<g transform="rotate(-4)"><g filter="url(#drop)"><rect x="-430" y="-84" width="860" height="168" rx="84" fill="${P.basil}"/><rect x="-418" y="-72" width="836" height="144" rx="72" fill="none" stroke="#fff" stroke-width="6"/></g>${T(0, 30, "Basil is a REPTILE!", 84, "#fff", { ls: 2 })}</g>`);
    const v = t - tRep, cols = [P.coral, P.sun, P.purple, "#fff", P.pink, P.basil]; for (let i = 0; i < 46; i++) { const an = hash(i, 11) * Math.PI * 2, sp = 300 + hash(i, 13) * 700, x = 1010 + Math.cos(an) * sp * (1 - Math.exp(-v * 2.4)), y = 276 + Math.sin(an) * sp * .5 * (1 - Math.exp(-v * 2.4)) + 220 * v * v, o = clamp(1.5 - v * .55); if (o <= 0 || y > 1100) continue; out += `<rect x="-11" y="-6" width="22" height="12" rx="3" fill="${cols[i % 6]}" opacity="${n2(Math.min(1, o))}" transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(hash(i, 17) * 360 + v * (200 + hash(i, 19) * 500))})"/>`; }
    out += buddy("pip", 1420, 1060, 230, t, { aura: true, in: tRep + .25, pose: "cheer", poses: [[tRep + .25, "cheer"]], jump: cheer.map(([a, b]) => [a + .1, b * .6]) }) + buddy("momo", 1700, 1060, 230, t, { aura: true, flip: true, in: tRep + .4, poses: [[tRep + .4, "cheer"]], jump: cheer.map(([a, b]) => [a + .2, b * .6]) }); }
  return out + OP(e, logo(t)); };
})(); }

/* =====================================================================================================================
   MOMENT 3 · THE ENDING
   ===================================================================================================================== */
if (PART === 3) { (() => {
// small pictures that stand beside the key words while they are read
const kwIcon = (i, t, lit) => { const th = (lv) => `<g transform="scale(.3) translate(0 130)">${thermo(0, 0, lv, "", { H: 230 })}</g>`;
  if (i === 0) return `<g transform="translate(10 24) scale(.098)">${monitor({ warm: .7, tongue: lit ? .5 + .5 * Math.sin(t * 6) : 0 })}</g>`;
  if (i === 1) return th(.5 + .4 * Math.sin(t * 2.4));
  if (i === 2) return `<g fill="#B98A62" stroke="#7A5438" stroke-width="4"><ellipse cx="0" cy="14" rx="26" ry="22"/><circle cx="-30" cy="-14" r="11"/><circle cx="-11" cy="-30" r="12"/><circle cx="12" cy="-30" r="12"/><circle cx="31" cy="-13" r="11"/></g>`;
  return th(.62); };
const baseKw = SC.kwrecap;
SC.kwrecap = (t, s) => { let out = baseKw(t, s); const rc = eio((t - s.t0) / .6);
  KWLINE.forEach((id, i) => { const tl_ = LT(id), k = spring(t, tl_ - .05, .45); if (k > .02) out += TF(1368, 300 + i * 138, k * (1 + .08 * pulse(t, tl_, .05, .8)), `<g filter="url(#dropS)"><circle r="56" fill="${P.paper}" stroke="${P.sun}" stroke-width="6"/></g>${kwIcon(i, t, t < tl_ + 2.4)}`); });
  return out; };
SC.next = (t, s) => { const L = "e301", M_ = "e302", B = "e304", H2 = "e303", u = t - s.t0, tMu = W(L, "mushroom") - .3, tSoil = W(L, "soil") - .2, tStay = W(L, "stays") - .15, tQ = W(L, "so") - .1, tLv = W(M_, "leaves") - .2, tLegs = W(B, "legs") - .15, tLock = LT(H2) - .1, MX = 600, PX = 1250, GY = 840;
  let out = bg("daystage") + wipe(t, s.t0 + .02, P.sun, 960, 500);
  out += TF(960, 110, slamK(t, s.t0 + .25), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-200" y="-44" width="400" height="88" rx="44" fill="${P.coral}"/><rect x="-192" y="-36" width="384" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 18, "NEXT TIME", 52, "#fff", { ls: 5 })}</g>`);
  // the mushroom, and a pot plant to compare it with
  if (t >= tMu) { const k = spring(t, tMu, .5), wig = 1 + .03 * pulse(t, tStay, .05, .6); out += `<ellipse cx="${MX}" cy="${GY + 6}" rx="230" ry="26" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(MX, GY, 1.25 * k, `<g transform="scale(${n2(wig)} ${n2(2 - wig)})">${mushroom()}</g>`) + TF(MX, GY + 76, k, tpill(0, 0, "mushroom", 40, "#fff", P.ink, { w: 700 })); }
  if (t >= tQ - .5) { const k = spring(t, tQ - .5, .5); out += `<ellipse cx="${PX}" cy="${GY + 6}" rx="170" ry="22" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(PX, GY, 1.5 * k, potPlant({ sway: Math.sin(t * 1.4) * .6 })) + TF(PX, GY + 76, k, tpill(0, 0, "plant", 40, "#fff", P.ink, { w: 700 }))
    + (t >= tLv ? OP(pulse(t, tLv + .1, .1, 2.2), `<circle cx="${PX}" cy="${GY - 250}" r="${n2(215 + 10 * Math.sin(t * 6))}" fill="none" stroke="${P.leaf}" stroke-width="10" stroke-dasharray="26 16"/>`) + TF(PX, GY - 500, spring(t, tLv, .45), tpill(0, 0, "leaves", 40, P.leaf, "#fff", { w: 700 })) + TF(MX, GY - 470, spring(t, tLv + .5, .45), tpill(0, 0, "no leaves?", 40, P.ink, "#fff", { w: 700 })) : ""); }
  if (t >= tSoil && t < tQ - .3) out += TF(MX + 400, GY - 30, spring(t, tSoil, .45) * (1 - ramp(t, tQ - .7, .25)), tpill(0, 0, "grows in the soil", 42, P.ink, "#fff", { w: 600 }));
  if (t >= tStay && t < tQ - .3) out += TF(MX + 440, GY - 250, spring(t, tStay, .45) * (1 - ramp(t, tQ - .7, .25)), tpill(0, 0, "stays in one place", 42, P.ink, "#fff", { w: 600 }));
  if (t >= tQ) out += bigLine(262, `Is a mushroom a <tspan fill="${P.leafDeep}">PLANT</tspan>?`, 104, P.ink, slamK(t, tQ)).replace(`stroke="${P.ink}"`, 'stroke="#fff"');
  if (t >= tLock) { const alt = Math.floor((t - tLock) / .6) % 2; out += TF(925, 620, spring(t, tLock, .45), [["1", "Yes", -62], ["2", "No", 62]].map(([n, w, x], i) => `<g transform="translate(0 ${x}) scale(${alt === i ? 1.1 : 1})"><g filter="url(#${alt === i ? "glowS" : "dropS"})"><rect x="-120" y="-50" width="240" height="100" rx="26" fill="url(#gPaper)" stroke="${P.sun}" stroke-width="6"/></g><circle cx="-70" cy="0" r="32" fill="url(#gSun)"/>${T(-70, 16, n, 46, P.ink)}${T(30, 17, w, 50, P.ink)}</g>`).join(""))
    + TF(925, 0, spring(t, tLock + .15, .4), youPill(0, 468, 1.1) + tpill(0, 786, "Lock it in!", 38, P.ink, "#fff", { w: 700 })); }
  out += buddy("basil", 250, 1058, 290, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tQ, "arms_crossed"], [LT(B) - .12, "sit"], [LE(B) + .1, "cheer"], [tLock + .6, "sit"]], wave: true })
    + buddy("momo", 1690, 1058, 290, t, { aura: true, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tQ, "thinking"], [LT(M_) - .12, "sit"], [LE(M_) + .15, "thinking"], [tLock + .6, "sit"]] })
    + say(M_, 1650, 650, t, { size: 42, tail: 40, maxW: 380 }) + say(B, 300, 650, t, { size: 42, tail: -40, maxW: 400 });
  return out + logo(t); };
// "Now you know!": behind the buddies, today's lizard warm on its rock; on the blast each buddy gets its own group
SC.nyk = (t, s) => { const t0 = Math.floor(TL.lines.h1305.know * 30 + 1e-6) / 30;
  let out = nykScene(t, s, `<ellipse cx="780" cy="1046" rx="330" ry="34" fill="#8C8576"/><path d="M470 1046 Q470 968 600 958 Q780 940 960 960 Q1090 972 1090 1046z" fill="url(#gdRock)" stroke="#6E685C" stroke-width="6"/>` + TF(800, 960, .62, monitor({ warm: .85, breathe: Math.sin(t * 2), tongue: ((t + .4) % 2.6) < .5 ? Math.sin(Math.PI * ((t + .4) % 2.6) / .5) : 0, blink: ((t + 1) % 3.1) < .12 })));
  if (t >= t0 + .5) [["pip", 300, "MAMMAL", P.pip], ["momo", 1275, "MAMMAL", P.momo], ["basil", 1650, "REPTILE", P.basil]].forEach(([w, x, g, col], i) => { const tt = t0 + .5 + i * .22, k = spring(t, tt, .45); if (k < .02) return; const ww = tw(g, 38, 700, "Fredoka", 3) + 64;
    out += TF(x - 20, 620 - 8 * Math.abs(Math.sin((t - tt) * 2.6)), k, `<g transform="rotate(${[-4, 3, -3][i]})"><g filter="url(#dropS)"><rect x="${n2(-ww / 2)}" y="-32" width="${n2(ww)}" height="64" rx="32" fill="${col}"/><rect x="${n2(-ww / 2 + 5)}" y="-27" width="${n2(ww - 10)}" height="54" rx="27" fill="none" stroke="#fff" stroke-width="4"/></g>${T(0, 14, g, 38, "#fff", { ls: 3 })}</g>`); });
  return out; };
})(); }
