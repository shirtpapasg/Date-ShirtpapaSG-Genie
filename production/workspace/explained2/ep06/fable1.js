// fable1.js: the Fable redraw of EP6 (teacher, 21 Nov: "I prefer this video"). Shared pieces + PART 1's scenes, on ep06's own voices and timeline.
//   Shared: the goals read aloud by a buddy, the bead close-up and the YOU magnifier window, the cream book card, the key-word pictures.
//   Part 1: the cold open and the callback (restaged), BE A SCALE (the back of a Malayan water monitor seen from behind; the PLACE / LIZARD
//   thermometers; the warm rock; the lake), the pull-out, the cold-blooded card (the YOU thermometer stays the same), the read-along, the outro.
// Loaded after p1.js / p2.js: a scene defined here replaces the one of the same name.

/* ---------- small shared tools ---------- */
const fTag = (t, t0, t1, txt, y = 790, x = 960, size = 46, fill = "#fff", ink = P.ink) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, size, fill, ink, { w: 700 }));
const fYou = (t, t0, txt, t1 = 1e9) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .3)), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
const fSub = (t, t0, t1, txt) => OP(ramp(t, t0, .4) * (1 - ramp(t, t1, .4)), TF(60 + tw(txt, 28, 600) / 2 + 22, 146, 1, tpill(0, 0, txt, 28, "#fff", P.ink, { w: 600 })));
// the integral of f from t0 to t (a pure function of t), and a value that follows f late (time constant tau)
const integ = (f, t0, t, dt = .05) => { let s = 0; for (let x = t0; x < t; x += dt) s += f(x + dt / 2) * Math.min(dt, t - x); return s; };
const lagged = (f, t0, t, tau, dt = .05) => { let v = f(t0); for (let x = t0; x < t; x += dt) { const h = Math.min(dt, t - x); v += (f(x + h) - v) * (1 - Math.exp(-h / tau)); } return v; };
// the centre of the free space between discs/props (the teacher's rule, 21 Nov: a prop is centred in the free space, never behind or under a disc)
const discR = (h) => h * .62;

/* ---------- today's goals, READ ALOUD by a buddy (rulebook section 11, step 3): each card lifts and glows while its line is read ---------- */
function goalsRead(t, s, goals, who, ids) { const cols = ["gBlue", "gPurple", "gOrange"], t0 = LT(ids[0]);
  let out = bg("stage2") + OP(ramp(t, s.t0 + .1, .3), TF(1060, 200, 1 + .05 * pulse(t, t0, .05, .9), T(0, 0, "Today you’ll learn…", 80, "#fff", { w: 600 })));
  goals.forEach(([g, ic], i) => { const tin = s.t0 + .25 + i * .14, k = spring(t, tin, .5); if (k < .02) return; const a = LT(ids[i + 1]) - .12, b = LE(ids[i + 1]) + .25, on = ss(a, a + .25, t) * (1 - ss(b, b + .3, t)), done = t > b ? 1 : 0, x = 560 + i * 500, y = 600 - 46 * on + (1 - eo((t - tin) / .3)) * -200, ls = wrap(g, 44, 400, 700);
    out += TF(x, y, k * (1 + .09 * on), `<g transform="rotate(${[-2, 1.5, -1.5][i] * (1 - on)})" opacity="${n2(.62 + .38 * Math.max(on, done * .9))}"><g filter="url(#${on > .3 ? "glowS" : "drop"})"><rect x="-225" y="-190" width="450" height="400" rx="46" fill="url(#gPaper)"/><rect x="-225" y="-190" width="450" height="150" rx="46" fill="url(#${cols[i]})"/><rect x="-225" y="-90" width="450" height="50" fill="url(#${cols[i]})"/></g><g transform="translate(0 -112)">${ic}</g>${ls.map((l, j) => T(0, 66 + j * 54 - (ls.length - 1) * 22, l, 44, P.ink)).join("")}${done ? TF(180, -172, spring(t, b, .4), tickBadge(26)) : ""}</g>`); });
  const hops = ids.slice(1).map((id) => [LT(id) - .14, 18]);
  return out + buddy(who, 190, 1050, 300, t, { aura: true, in: s.t0 + .15, poses: who === "basil" ? [[s.t0, "sit"], [LE(ids[3]) + .15, "cheer"]] : [[s.t0, "pointing"], [t0 - .12, "sit"], [LE(ids[3]) + .15, "cheer"]], jump: hops, wave: true }) + HUD(t); }

/* ---------- the monitor lizard's skin: thousands of very small beads, dark grey-brown, rows of small pale yellow spots (the teacher's photos) ---------- */
const fSkin = (T_, wet = 0) => { const w = (c) => hexL(c, "#2F5560", wet * .45); return { base: w(hexL("#4E4F48", "#655C42", T_)), mid: w(hexL("#5B5C53", "#756A4A", T_)), dark: w(hexL("#35362F", "#463F2D", T_)), gap: w(hexL("#22231F", "#2D281C", T_)), spot: w(hexL("#D2CB94", "#F4E08C", T_)), line: "#191A16" }; };
// the beads seen very close up (the opening view, and the round window): a honeycomb of small round scales; the one in the middle is YOU
function beadsClose(t, T_, R, n, glowT, wet = 0) { const c = fSkin(T_, wet), dx = R * 2.08, dy = R * 1.8; let s = "";
  for (let j = -n; j <= n; j++) for (let i = -n - 1; i <= n + 1; i++) { const x = (i + (j & 1 ? .5 : 0)) * dx, y = j * dy, h = hash(i * 13 + j * 57, 3), me = i === 0 && j === 0, sp = !me && ((j + 400) % 5 === 2) && ((i + 400) % 4 === 1), r = R * (.9 + .1 * hash(i * 7 + j * 3, 9));
    if (me) continue; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="${sp ? c.spot : h < .2 ? c.dark : h > .7 ? c.mid : c.base}" stroke="${c.line}" stroke-width="${n2(R * .09)}"/><path d="M${n2(x - r * .5)} ${n2(y - r * .36)} q${n2(r * .44)} ${n2(-r * .36)} ${n2(r * .94)} ${n2(-r * .06)}" stroke="#fff" stroke-width="${n2(R * .1)}" stroke-linecap="round" fill="none" opacity="${n2(.12 + .3 * glowT + .25 * wet)}"/>`; }
  const gl = .5 + .5 * Math.sin(t * 3);
  return `<rect x="${-(n + 2) * dx}" y="${-(n + 1) * dy}" width="${(n + 2) * dx * 2}" height="${(n + 1) * dy * 2}" fill="${c.gap}"/>` + s
    + `<circle r="${n2(R * .96)}" fill="${hexL(c.base, hexL("#6FA8F5", "#FFB03A", T_), .55)}" stroke="${P.sun}" stroke-width="${n2(R * .16)}"/><circle r="${n2(R * 1.06)}" fill="none" stroke="#fff" stroke-width="${n2(R * .05)}" opacity="${n2(.4 + .6 * gl)}"/><path d="M${n2(-R * .5)} ${n2(-R * .36)} q${n2(R * .44)} ${n2(-R * .36)} ${n2(R * .94)} ${n2(-R * .06)}" stroke="#fff" stroke-width="${n2(R * .11)}" stroke-linecap="round" fill="none" opacity=".6"/>`; }
// the YOU magnifier window: a round window that keeps your own tiny part in view, joined to the real one by one plain line
function youLens(k, LX, LY, LR, sx, sy, inner, o = {}) { if (k < .02) return ""; const an = Math.atan2(sy - LY, sx - LX), id = o.id || "lnC";
  return OP(Math.min(1, k), `<path d="M${n2(LX + Math.cos(an) * LR)} ${n2(LY + Math.sin(an) * LR)} L${n2(sx - Math.cos(an) * 16)} ${n2(sy - Math.sin(an) * 16)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`)
    + TF(LX, LY, k, `<clipPath id="${id}"><circle r="${LR}"/></clipPath><g filter="url(#drop)"><circle r="${LR + 10}" fill="#fff"/></g><g clip-path="url(#${id})">${inner}</g><circle r="${LR + 5}" fill="none" stroke="${P.ink}" stroke-width="7"/><path d="M${n2(-LR * .7)} ${n2(-LR * .5)} Q${n2(-LR * .4)} ${n2(-LR * .86)} ${n2(LR * .1)} ${n2(-LR * .9)}" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".35"/>` + youPill(0, -LR - 26, 1.15)); }

/* ---------- the cream book card: the book's sentence appears word by word as Heart reads it, key words get a highlighter stroke.
   o: x, y (top left), w, size, lh, tab (the sun tab's words), count ("2 of 2"), footer, tilt ---------- */
function bookCard(t, id, LINES, KEYS, t0, t1, o = {}) { const L = TL.lines[id], size = o.size || 53, lh = o.lh || 72, fam = "Atkinson Hyperlegible", Wc = o.w || 1200, Hc = LINES.length * lh + (o.footer ? 176 : 120), a0 = spring(t, t0, .5) * (1 - ramp(t, t1, .25)); if (a0 <= .01) return ""; let tx = "", wi = 0;
  LINES.forEach((ln, li) => { let cx = 0; ln.split(" ").forEach((w) => { const wt = L.words[wi] ? L.words[wi].a : L.end, a = ramp(t, wt - .05, .16), ww = tw(w, size, 700, fam), y = 150 + li * lh; wi++;
    if (a > 0) { if (KEYS.includes(norm(w))) tx += `<rect x="${n2(54 + cx - 6)}" y="${n2(y - size * .78)}" width="${n2(eo((t - wt) / .35) * (ww + 12))}" height="${n2(size * 1.0)}" rx="8" fill="#FFD75A"/>`; tx += `<text x="${n2(54 + cx)}" y="${n2(y + (1 - a) * 8)}" font-family="${fam}" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(a)}">${esc(w)}</text>`; }
    cx += ww + tw(" ", size, 700, fam); }); });
  const tab = o.tab || "FROM YOUR BOOK", tabW = tw(tab, 30, 700, "Fredoka", 3) + 76;
  return TF((o.x === undefined ? 70 : o.x) + Wc / 2, (o.y === undefined ? 150 : o.y) + Hc / 2, a0, `<g transform="rotate(${o.tilt === undefined ? -.6 : o.tilt}) translate(${-Wc / 2} ${-Hc / 2})"><g filter="url(#drop)"><rect width="${Wc}" height="${Hc}" rx="28" fill="url(#gPaper)"/><rect width="18" height="${Hc}" rx="9" fill="${P.sun}"/></g><g transform="translate(40 -28)" filter="url(#dropS)"><rect width="${n2(tabW)}" height="62" rx="31" fill="url(#gSun)"/></g>${T(40 + tabW / 2, 14, tab, 30, P.ink, { ls: 3 })}
    ${o.count ? T(Wc - 50, 50, o.count, 30, P.ink2, { a: "end", w: 600 }) : ""}${tx}${o.footer ? `<path d="M54 ${Hc - 84} H${Wc - 54}" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".45"/>` + T(54, Hc - 40, o.footer, 27, P.ink2, { a: "start", w: 600 }) : ""}</g>`); }

/* ---------- the read-along with pictures: a small picture pops beside each key word as it is read (the Fable ending) ---------- */
function kwPictures(t, s, icons) { const n = KWLINE.length; let out = "";
  KWLINE.forEach((id, i) => { const tl_ = LT(id), k = spring(t, tl_ - .05, .45); if (k < .02) return; const cy = (n > 3 ? 300 : 360) + i * (n > 3 ? 138 : 170);
    out += TF(1392, cy, k * (1 + .08 * pulse(t, tl_, .05, .8)), `<g filter="url(#dropS)"><circle r="60" fill="${P.paper}" stroke="${P.sun}" stroke-width="6"/></g><clipPath id="kwi${i}"><circle r="55"/></clipPath><g clip-path="url(#kwi${i})">${icons[i](t, t < tl_ + 2.4)}</g>`); });
  return out; }
const kwThermo = (lv) => `<g transform="scale(.3) translate(0 130)">${thermoF(0, 0, lv, "", { H: 230 })}</g>`;

/* =====================================================================================================================
   PART 1
   ===================================================================================================================== */
if (PART === 1) { (() => {
const ST = () => ({ 3: MK("stampIns") + .02, 4: MK("stampRep") + .02 });
const BD = [1550, 1062, .5], BAS = 440, PIP = 1262, MOM = 1838;   // the cold open's places: board clear of every disc
const gx = (cam, x) => camX(cam, x), gy = (cam, y) => camY(cam, y);
const antLine = (t, n = 7) => { let s = ""; for (let i = 0; i < n; i++) { const x = 800 + ((i * 54 + t * 20) % 378), ph = t * 9 + i * 1.7, e = Math.min(1, (x - 800) / 30, (1178 - x) / 30); s += OP(clamp(e), TF(x, 898 - (i % 2) * 5 + 1.5 * Math.sin(ph * 2), .092, antSmall(ph) + (i % 3 === 0 ? `<path d="M250 -330 q60 -90 150 -40 q-50 80 -150 40z" fill="#7CCB5E" stroke="#3E9A4A" stroke-width="14"/>` : ""))); } return s; };
// the garden spider in its web; it lets itself down on a thread and climbs back (drop 0..1)
const webSpider = (t, drop = 0) => TF(GD.web[0], GD.web[1], .28, spiderWeb(330, t, { op: .85, w: 3.4 }) + `<path d="M0 0 V${n2(520 * drop)}" stroke="#fff" stroke-width="5" opacity=".85"/><g transform="translate(0 ${n2(520 * drop)}) rotate(${n2(1.5 * Math.sin(t * .8) + 8 * Math.sin(t * 5) * drop * (1 - drop) * 4)})">${spiderBig({ id: "lk" })}</g>`);

/* ============ 1 · the silent cold open: the lake at the Singapore Botanic Gardens ============ */
const THUMB1 = (t) => macroBg(1, { ground: false, sky: "#DDF4D4" }) + `<circle cx="1500" cy="160" r="520" fill="url(#fSun)" opacity=".9"/>`
  + TF(700, 560, .98, spiderWeb(330, 0, { op: .95, w: 3.5 }) + spiderBig({ id: "th", glow: [.9, .9, .9, .9, .9, .9, .9, .9] }))
  + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const f = spiderLegTip(i), d = Math.hypot(f[0], f[1] - 20); return numPop(9, 0, 700 + (f[0] + f[0] / d * 58) * .98, 560 + (f[1] + (f[1] - 20) / d * 58) * .98, i + 1, .86); }).join("")
  + TF(1560, 820, 1, `<g filter="url(#drop)"><circle r="190" fill="${P.paper}"/></g><circle r="174" fill="#EAF6E8"/>` + TF(8, 62, .4, antBig({})) + TF(0, -214, 1, tpill(0, 0, "6 legs", 46, P.sun, P.ink, { w: 700 })))
  + buddy("basil", 190, 1030, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.cold = (t, s) => { if (location.search.includes("thumb")) return THUMB1(t); const tb = MK("coldCard"), e = eio(t / 6.2), cam = [lerp(1.42, 1.03, e), lerp(470, 960, e), lerp(760, 565, e)];
  const tDrop = 1.5, tUp = 4.0, drop = eio((t - tDrop) / .7) * (1 - eio((t - tUp) / 1.1)), [cx, cd] = slideX(t, tb, .75, 2300, BD[0], 1062);
  return lakeView(t, { web: false, ants: false, items: webSpider(t, drop) + antLine(t) }, cam) + motes(t, 26, 4) + `<g transform="translate(${n2(-80 * (1 - e))} ${n2(-40 * (1 - e))})">${nearLeaves(t, 80, 40, 1.6)}${nearLeaves(t + 1, 1900, -20, 1.4, -1)}</g>`
    + cd + (t >= tb ? TF(cx, 1062, BD[2], sixBoard(t)) : "")
    // Basil: bends to the ants; jumps when the spider lets itself down beside him; looks from one to the other; crosses his arms: which one?
    + buddy("basil", BAS, 1064, 190, t, { aura: true, tag: false, in: .5, poses: [[.5, "sit"], [1.0, "surprised"], [tDrop + .35, "oops"], [tDrop + 1.5, "surprised"], [tUp + .6, "arms_crossed"], [6.2, "sit"]], jump: [[tDrop + .3, 44]], look: t < tDrop + .3 ? 7 : t < tUp + .6 ? -7 : 0 })
    + buddy("pip", PIP, 1064, 165, t, { aura: true, tag: false, in: tb + .7, poses: [[tb + .7, "pointing"], [tb + 2.3, "sit"]] }) + buddy("momo", MOM, 1062, 160, t, { aura: true, tag: false, flip: true, in: tb + 1.1, poses: [[tb + 1.1, "waving"], [tb + 2.8, "sit"]], wave: true })
    + OP(ramp(t, .3, .4) * (1 - ramp(t, s.t1 - .5, .3)), lowerPill(60, 60, "Singapore Botanic Gardens,", "by the lake")); };

/* ============ 2 · the callback to Episode 5's dare ============ */
SC.callback = (t, s) => { const a = "e201", b = "e202", CAMW = [1.03, 960, 565], tw_ = [W(a, "amphibians"), W(a, "birds"), W(a, "fish")], t3 = W(a, "three", 1), tM = LT(b) - .5, big = eio((t - s.t0) / .6) * (1 - eio((t - tM + .5) / .5));
  const late = eio((t - tM + .5) / .5), at = [lerp(lerp(BD[0], 1215, late), 1010, big), lerp(BD[1], 1046, big), lerp(lerp(BD[2], .42, late), .92, big)], fl = [0, 1, 2].map((i) => pulse(t, tw_[i] - .05, .05, .9)).concat([0, 0, 0]), pl = [0, 0, 0].concat([0, 1, 2].map((i) => pulse(t, t3 + i * .35, .05, .8) + (t > t3 + 1.4 && t < tM ? .4 + .3 * Math.sin(t * 5 + i) : 0)));
  const tA = W(b, "ant") - .15, tS = W(b, "spider") - .15, gA = pulse(t, tA, .1, 1.6), gS = pulse(t, tS, .1, 1.6), side = big > .05;
  // the ant and the spider, each in a round window, as Momo names them
  const win = (x, y, tt, inner, lab) => t < tt ? "" : TF(x, y, spring(t, tt, .45), `<g filter="url(#drop)"><circle r="150" fill="${P.paper}"/></g><circle r="138" fill="#EAF6E8"/><clipPath id="cw${x}"><circle r="138"/></clipPath><g clip-path="url(#cw${x})">${inner}</g>` + TF(0, 176, 1, tpill(0, 0, lab, 40, "#fff", P.ink, { w: 700 })) + `<g transform="translate(108 -108)"><circle r="32" fill="url(#gSun)" stroke="#fff" stroke-width="4"/>${T(0, 15, "?", 44, P.ink)}</g>`);
  return lakeView(t, { web: false, ants: false, items: webSpider(t, 0) + antLine(t) }, CAMW) + glowDisc(gx(CAMW, 990), gy(CAMW, 890), 110, gA) + glowDisc(gx(CAMW, GD.web[0]), gy(CAMW, GD.web[1]), 120, gS) + motes(t, 18, 5)
    + buddy("basil", side ? 250 : BAS, 1064, 190, t, { aura: true, tag: false, poses: [[s.t0, "sit"], [t3 - .1, "cheer"], [t3 + 1.3, "sit"], [tA, "surprised"], [tS + .9, "arms_crossed"]], look: t > tA && t < tS ? 6 : t >= tS ? -6 : 0 })
    + (big < .05 && t < tM ? buddy("pip", PIP, 1064, 165, t, { aura: true, tag: false }) + buddy("momo", MOM, 1062, 160, t, { aura: true, tag: false, flip: true, out: tM - .1 }) : "")
    + (big < .05 && t >= tM ? buddy("pip", 1262, 1064, 165, t, { aura: true, tag: false, out: tM + .05 }) : "")
    + TF(at[0], at[1], at[2], sixBoard(t, {}, { flash: fl, pulse: pl }))
    + win(760, 470, tA, TF(8, 52, .3, antBig({ walk: t * 6 })), "ant") + win(1130, 470, tS, TF(0, 6, .33, spiderWeb(330, t, { op: .9, w: 4 }) + spiderBig({ id: "cb" })), "spider")
    + buddy("momo", 1640, 1056, 300, t, { aura: true, flip: true, in: tM, poses: [[tM, "thinking"], [LT(b) - .12, "sit"], [LE(b) + .1, "thinking"]], look: t < tS ? -5 : 5 })
    + say(b, 1560, 250, t, { size: 46, tail: 80, maxW: 640 }) + HUD(t); };

/* ============ 5 · today's goals, read aloud by Basil ============ */
SC.goals = (t, s) => goalsRead(t, s, [["How to spot an insect", TF(0, 34, .17, antBig({ walk: t * 6 }))], ["How to spot a reptile", TF(-24, 40, .17, monitor({ t, tongue: tongueAt(t, 0, 3) }))], ["What cold-blooded means", TF(0, 62, .34, thermoF(0, 0, .5 + .34 * Math.sin(t * 1.5), "", { H: 200 }))]], "basil", ["e5g0", "e5g1", "e5g2", "e5g3"]);

/* ============ 11 · BE A SCALE ============ */
const td = MK("dive"), tShade = MK("shade"), tSun = MK("sun"), tNoon = MK("noon"), tLand = W("e1104", "lands") - .1, tWarm = W("e1104", "warm") - .15, tHot = W("e1105", "hot") - .1, tSp = W("e1105", "splash") - .05, tCool = W("e1105", "cool", 1) - .1, tOutEnd = SCN.pullout.t1;
const MONW = [GD.liz[0], GD.liz[1], .34], BACK = [MONW[0] - 40 * MONW[2], MONW[1] - 128 * MONW[2]];
// how fast the lizard moves (body lengths a second): hardly at all in the cool shade; a steady crawl into the sun; still on the warm rock; a rush into the lake; a slow swim
const speedL = (t) => t < tSun ? .045 * ss(tShade - 1, tShade + 1, t) + .02 : t < tSp - .7 ? .045 + .5 * ss(tSun, tSun + .7, t) * (1 - ss(tLand + .2, tLand + 1.3, t)) : .9 * ss(tSp - .7, tSp - .2, t) * (1 - .62 * ss(tSp, tSp + .8, t));
const distL = (t) => integ(speedL, td, t), ZR = distL(tLand + 1.3) + .1;                // where the warm rock begins
const sunOn = (t) => ss(tSun + .5, tLand + .1, t), noonK = (t) => ss(tNoon - .2, tNoon + .9, t), wetK = (t) => ss(tSp, tSp + .35, t);
// the PLACE: cool in the shade, warm in the sun, hot at noon, cool in the lake. The LIZARD follows its place, a little late.
const placeT = (t) => .2 + .46 * sunOn(t) + .27 * noonK(t) - .68 * ss(tSp, tSp + .6, t);
const lizT = (t) => lagged(placeT, td, t, 1.25);
const HZ2 = 396, yOf = (rel) => HZ2 + 262 / rel, YOU_ROW = 9;
const hwAt = (y) => lerp(lerp(70, 132, clamp((y - 430) / 190)), 330 + 800 * Math.pow(clamp((y - 690) / 390), 1.35), ss(612, 704, y)), szAt = (y) => 6 + 25 * Math.pow(clamp((y - 440) / 640), 1.25);

/* ---- the micro-world: the camera rides on the monitor lizard's back, behind its shoulders, looking forward along the long neck to the small head.
   From the teacher's photos (refs/monitor_back): a broad, gently arched back; a long, thick, tapering neck; a slim, low wedge of a head with small
   eyes on its sides; short thick front legs that bend OUT at the elbow and then go DOWN to the ground, long curved claws (a push-up, never arms
   held out); skin of thousands of very small beads, dark grey-brown, with rows of small pale yellowish spots. YOU are one bead. ---- */
function pov(t) { const d = distL(t), ph = 2 * Math.PI * d / .34, wet = wetK(t), moving = clamp(speedL(t) / .3), sway = (20 * Math.sin(ph) * moving + 12 * Math.sin(t * 3.1) * wet), hsw = -34 * Math.sin(ph - .7) * moving - 20 * Math.sin(t * 3.1 - .8) * wet, sun = sunOn(t), noon = noonK(t), lit = sun * (1 - wet), T_ = lizT(t), rockRel = ZR - d;
  const br = Math.sin(t * 2.2), look = t > tLand + 1.4 && !wet ? 9 * Math.sin((t - tLand) * .9) : 0, c = fSkin(T_, wet);
  // --- far: the sky, the sun climbing to noon, the blurred garden; the tree's shade overhead at first
  const sx = lerp(1500, 1040, noon), sy = lerp(150, 70, noon);
  let far = `<rect x="-300" y="-300" width="2520" height="${HZ2 + 300}" fill="url(#gdSky)"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="${n2(360 + 30 * Math.sin(t) + 120 * noon)}" fill="url(#fSun)" opacity="${n2(.25 + .75 * sun)}"/><circle cx="${n2(sx)}" cy="${n2(sy)}" r="${n2(64 + 14 * noon)}" fill="#FFF8D2" opacity="${n2(.5 + .5 * sun)}"/>`;
  let bok = ""; for (let i = 0; i < 16; i++) { const x = ((i * 173 - d * 150 * (1 + (i % 3) * .3)) % 2400 + 2400) % 2400 - 240; bok += `<circle cx="${n2(x)}" cy="${n2(HZ2 - 40 - 70 * hash(i, 2))}" r="${n2(120 + 90 * hash(i, 4))}" fill="${i % 3 ? "#4FA765" : "#3A8F55"}"/>`; }
  far += `<g filter="url(#b10)">${bok}</g>`;
  { const cs = 1 - sun; if (cs > 0) { let lv = ""; for (let i = 0; i < 12; i++) lv += `<ellipse cx="${n2(-100 + i * 190)}" cy="${n2(-40 + 90 * hash(i, 6))}" rx="${n2(210 + 60 * hash(i, 8))}" ry="${n2(120 + 40 * hash(i, 9))}" fill="${i % 2 ? "#236B42" : "#2E7D4C"}"/>`; far += `<g transform="translate(0 ${n2(-420 * (1 - cs) * (1 - cs))}) scale(1 ${n2(1 + .5 * (1 - cs))})" filter="url(#b4)">${lv}</g>`; } }
  // --- the ground: grass, then the warm rock; bands and blades come towards you as the lizard walks
  let gr = `<rect x="-300" y="${HZ2}" width="2520" height="900" fill="url(#gdLawn)"/>`;
  if (rockRel < 9) { const ye = rockRel > .3 ? yOf(rockRel) : 1300; gr += `<path d="M-300 ${HZ2 + 2} H2220 V${n2(ye)} Q960 ${n2(ye + (ye - HZ2) * .1)} -300 ${n2(ye)}z" fill="url(#fRock)"/><path d="M-300 ${HZ2 + 2} H2220 V${n2(Math.min(ye, HZ2 + 90))} H-300z" fill="#FFF3C9" opacity=".55"/>` + (ye < 1200 ? `<path d="M-300 ${n2(ye)} Q960 ${n2(ye + (ye - HZ2) * .1)} 2220 ${n2(ye)}" stroke="#6E685C" stroke-width="${n2(3 + (ye - HZ2) * .02)}" fill="none"/>` : "");
    // beyond the rock: the lake
    gr += `<rect x="-300" y="${HZ2 - 4}" width="2520" height="34" fill="#7CC4D4"/><path d="M-300 ${HZ2 + 30} H2220" stroke="#fff" stroke-width="3" opacity=".6"/>`; }
  for (let k = 0; k < 40; k++) { const z = k * .3, rel = z - d; if (rel < .36 || rel > 7) continue; const y = yOf(rel), rk = z > ZR; gr += `<path d="M-300 ${n2(y)} Q960 ${n2(y + (y - HZ2) * .08)} 2220 ${n2(y)}" stroke="${rk ? "#8C8576" : "#3F9A52"}" stroke-width="${n2(2 + 5 / rel)}" fill="none" opacity="${n2(.35 * clamp((7 - rel) / 3))}"/>`; }
  const items = []; for (let i = 0; i < 70; i++) { const z = .5 + i * .16 + .1 * hash(i, 3), rel = z - d; if (rel < .2 || rel > 6) continue; items.push([rel, i, z]); } items.sort((a, b) => b[0] - a[0]);
  let near = "";
  for (const [rel, i, z] of items) { const side = i % 2 ? 1 : -1, lat = 420 + 620 * hash(i, 5), x = 960 + side * lat / rel + sway * .2, y = yOf(rel), sc = 1 / rel, fade = clamp((6 - rel) / 2) * clamp((rel - .2) / .12);
    if (z < ZR - .1) { const h = (260 + 240 * hash(i, 7)) * sc, w = 22 * sc, bend = (30 * Math.sin(t * 1.3 + i) + side * 40) * sc; const s1 = `<path d="M${n2(x - w)} ${n2(y)} Q${n2(x - w * .6 + bend * .4)} ${n2(y - h * .6)} ${n2(x + bend)} ${n2(y - h)} Q${n2(x + w * .6 + bend * .4)} ${n2(y - h * .6)} ${n2(x + w)} ${n2(y)}z" fill="${i % 3 ? "#3F9A52" : "#56B45E"}" stroke="#2F7F45" stroke-width="${n2(Math.min(8, 3 * sc))}" opacity="${n2(fade)}"/>`
        + (sun < .6 && i % 2 ? `<circle cx="${n2(x + bend * .6)}" cy="${n2(y - h * .62)}" r="${n2(13 * sc)}" fill="#E8F6FF" stroke="#fff" stroke-width="${n2(3 * sc)}" opacity="${n2(.85 * fade * (1 - sun))}"/>` : ""); if (rel < .75) near += s1; else gr += s1; }
    else if (z > ZR + .15) gr += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(26 * sc * (1 + hash(i, 9)))}" ry="${n2(9 * sc)}" fill="#6E685C" opacity="${n2(.45 * fade)}"/>`; }
  // --- under the water: green-brown lake water, the bright surface above, water weeds drifting past
  let under = "";
  if (wet > .01) { let weeds = ""; for (let i = 0; i < 12; i++) { const rel = ((i * .55 + 6 - d * 1.6) % 6 + 6) % 6 + .4, side = i % 2 ? 1 : -1, x = 960 + side * (500 + 500 * hash(i, 5)) / rel, y = yOf(rel) + 40, sc = 1 / rel, sw = 30 * Math.sin(t * 1.4 + i) * sc; weeds += `<path d="M${n2(x)} ${n2(y)} Q${n2(x + sw)} ${n2(y - 260 * sc)} ${n2(x - sw)} ${n2(y - 520 * sc)}" stroke="${i % 3 ? "#2F7F5A" : "#3F9A6A"}" stroke-width="${n2(26 * sc)}" stroke-linecap="round" fill="none" opacity="${n2(clamp((6 - rel) / 2))}"/>`; }
    under = OP(wet, `<rect x="-300" y="-300" width="2520" height="1700" fill="#2F7F86"/><rect x="-300" y="-300" width="2520" height="${HZ2 + 300}" fill="#8FD6CC"/><rect x="-300" y="${HZ2 - 60}" width="2520" height="200" fill="#5FB4AE" filter="url(#b30)"/><path d="M-300 ${HZ2 - 150} Q330 ${n2(HZ2 - 190 + 16 * Math.sin(t * 2))} 960 ${HZ2 - 150} T2220 ${HZ2 - 150}" stroke="#fff" stroke-width="8" fill="none" opacity=".7"/>` + uwRays(t, "#E8FFF4", .2) + weeds); }
  // --- the centre line of the animal: the back sways one way, the neck and head the other
  const cxAt = (y) => 960 + lerp(hsw, sway, ss(470, 800, y));
  const pat = `<pattern id="bdP" width="13" height="11.4" patternUnits="userSpaceOnUse"><rect width="13" height="11.4" fill="${c.gap}"/><circle cx="3.2" cy="2.9" r="2.9" fill="${c.base}"/><circle cx="9.7" cy="2.9" r="2.9" fill="${c.mid}"/><circle cx="0" cy="8.6" r="2.9" fill="${c.mid}"/><circle cx="6.5" cy="8.6" r="2.9" fill="${c.base}"/><circle cx="13" cy="8.6" r="2.9" fill="${c.mid}"/></pattern>`;
  // --- the front legs: out sideways to the elbow, then down to the ground, like a push-up; long curved claws. In the water they fold back along the body.
  const foot = (sd) => { const st = Math.sin(ph + (sd > 0 ? 0 : Math.PI)), fwd = Math.max(0, st) * moving * (1 - wet), bx = cxAt(700), sx2 = bx + sd * 270, ex = lerp(bx + sd * (452 + 10 * fwd), bx + sd * 420, wet), ey = lerp(612 - 8 * fwd + 3 * br, 700, wet), fx = lerp(bx + sd * (500 + 12 * fwd), bx + sd * 440, wet), fy = lerp(790 - 46 * fwd, 900, wet);
    let cl = ""; if (wet < .9) [-34, -12, 10, 32, 54].forEach((a) => { const an = (-90 + sd * (30 + a * .9)) * Math.PI / 180, tx = fx + Math.cos(an) * 62, ty = fy + Math.sin(an) * 40 - 6, cx2 = tx + Math.cos(an) * 34 + sd * 8, cy2 = ty + Math.sin(an) * 22 + 12;
      cl += `<path d="M${n2(fx)} ${n2(fy)} L${n2(tx)} ${n2(ty)}" stroke="${c.line}" stroke-width="30" stroke-linecap="round"/><path d="M${n2(fx)} ${n2(fy)} L${n2(tx)} ${n2(ty)}" stroke="url(#bdP)" stroke-width="21" stroke-linecap="round"/><path d="M${n2(tx)} ${n2(ty)} Q${n2(tx + Math.cos(an) * 30)} ${n2(ty + Math.sin(an) * 22 - 8)} ${n2(cx2)} ${n2(cy2)}" stroke="#14110F" stroke-width="9" stroke-linecap="round" fill="none"/>`; });
    return OP(1 - wet, `<ellipse cx="${n2(fx + sd * 20)}" cy="${n2(fy + 26)}" rx="120" ry="24" fill="#1B1430" opacity="${n2(.3 - .12 * fwd)}" filter="url(#b4)"/>`) + OP(1 - wet, cl)
      + `<path d="M${n2(sx2)} 676 L${n2(ex)} ${n2(ey)} L${n2(fx)} ${n2(fy)}" stroke="${c.line}" stroke-width="112" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M${n2(sx2)} 676 L${n2(ex)} ${n2(ey)} L${n2(fx)} ${n2(fy)}" stroke="url(#bdP)" stroke-width="98" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M${n2(ex - sd * 30)} ${n2(ey - 40)} Q${n2(ex + sd * 22)} ${n2(ey - 44)} ${n2(ex + sd * 44)} ${n2(ey + 6)}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity="${n2(.1 + .25 * lit)}"/><path d="M${n2(ex + sd * 2)} ${n2(ey + 34)} L${n2(fx - sd * 4)} ${n2(fy - 30)}" stroke="#000" stroke-width="40" stroke-linecap="round" opacity=".16"/>`; };
  // --- the head: a slim, low wedge far ahead, small eyes on its sides; the forked tongue flicks
  const hx = cxAt(430), hy = 432 + 3 * br - 26 * wet, tg = tongueAt(t, .3, t > tSun ? 1.7 : 3.1) * (1 - wet);
  const head = `<g transform="translate(${n2(hx)} ${n2(hy)}) rotate(${n2(hsw * .1 + look)}) scale(1.12 1.34)">
    ${tg > .02 ? `<path d="M0 -116 v${n2(-40 * tg)} l${n2(-9 * tg)} ${n2(-18 * tg)} M0 ${n2(-116 - 40 * tg)} l${n2(9 * tg)} ${n2(-18 * tg)}" stroke="#D9577A" stroke-width="6" stroke-linecap="round" fill="none"/>` : ""}
    <path d="M-70 30 Q-80 -22 -66 -48 Q-46 -92 -24 -110 Q0 -124 24 -110 Q46 -92 66 -48 Q80 -22 70 30z" fill="url(#bdP)"/><path d="M-72 22 Q-80 -22 -66 -48 Q-46 -92 -24 -110 Q0 -124 24 -110 Q46 -92 66 -48 Q80 -22 72 22" fill="none" stroke="${c.line}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M-70 -30 q-10 6 -6 20 M70 -30 q10 6 6 20" stroke="${c.line}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-66" cy="-40" rx="6" ry="10" fill="#E8D48A" stroke="${c.line}" stroke-width="3"/><ellipse cx="66" cy="-40" rx="6" ry="10" fill="#E8D48A" stroke="${c.line}" stroke-width="3"/>
    <path d="M0 -112 V4" stroke="#000" stroke-width="5" opacity=".14"/><path d="M-26 -84 Q0 -100 26 -84" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity="${n2(.1 + .3 * lit)}"/></g>`;
  // --- the body from behind: the long tapering neck widening into the broad, gently arched back
  const ys = []; for (let y = 430; y <= 1120; y += 18) ys.push(y); const L_ = ys.map((y) => `${n2(cxAt(y) - hwAt(y))} ${y}`), R_ = ys.slice().reverse().map((y) => `${n2(cxAt(y) + hwAt(y))} ${y}`), sil = `M${L_.join(" L")} L${R_.join(" L")}z`;
  let rows = {}, you = null, ri = 0; const add = (k, s) => { rows[k] = (rows[k] || "") + s; };
  for (let y = 1104; y > 596; ri++) { const s = szAt(y), hw = hwAt(y) - s * .2, cx = cxAt(y), n = Math.floor(hw / s) + 1, off = (ri & 1) ? .5 : 0, band = ri % 8 === 3;
    for (let k = -n; k <= n; k++) { const x = (k + off) * s; if (Math.abs(x) > hw) continue; const h = hash(k * 31 + ri * 77, 3), me = ri === YOU_ROW && k === 0, key = me ? null : band && ((k + 600 + (ri >> 3)) % 4 === 0) ? "spot" : h < .22 ? "dark" : h > .72 ? "mid" : "base";
      if (me) you = [cx + x, y, s]; else add(key, `<circle cx="${n2(cx + x)}" cy="${n2(y)}" r="${n2(s * .47)}"/>`); }
    y -= s * .86; }
  const arch = `<path d="${sil}" fill="url(#archG)"/><path d="M${n2(cxAt(1100))} 1100 ${[1000, 900, 800, 700, 620, 540, 460].map((y) => `L${n2(cxAt(y))} ${y}`).join(" ")}" stroke="#fff" stroke-width="60" stroke-linecap="round" fill="none" opacity="${n2(.05 + .1 * lit + .1 * wet)}" filter="url(#b10)"/>`;
  let folds = ""; [480, 516, 552, 588].forEach((y) => { const w = hwAt(y) * .86, x = cxAt(y); folds += `<path d="M${n2(x - w)} ${y} Q${n2(x)} ${y + 15} ${n2(x + w)} ${y}" stroke="#000" stroke-width="4" fill="none" opacity=".2"/>`; });
  const back = `<defs>${pat}<linearGradient id="archG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="bkC"><path d="${sil}"/></clipPath></defs>`
    + `<path d="${sil}" fill="url(#bdP)" stroke="${c.line}" stroke-width="9" stroke-linejoin="round"/><g clip-path="url(#bkC)"><rect x="-300" y="600" width="2520" height="520" fill="${c.gap}"/><rect x="-300" y="560" width="2520" height="60" fill="${c.gap}" opacity=".5"/>`
    + ["base", "mid", "dark", "spot"].map((k) => `<g fill="${c[k]}">${rows[k] || ""}</g>`).join("") + folds + arch + `</g>`
    + (you ? `<circle cx="${n2(you[0])}" cy="${n2(you[1])}" r="${n2(you[2] * .47)}" fill="${hexL(c.base, hexL("#6FA8F5", "#FFB03A", T_), .6)}" stroke="${P.sun}" stroke-width="3.5"/><circle cx="${n2(you[0])}" cy="${n2(you[1])}" r="${n2(you[2] * .5 + 9 + 4 * Math.sin(t * 3))}" fill="none" stroke="${P.sun}" stroke-width="4" opacity=".9"/>` : "");
  // --- light: cool blue in the shade, warm gold in the sun, white at noon, green under the water
  let light = `<rect x="-300" y="-300" width="2520" height="1700" fill="#3F66B0" opacity="${n2(.3 * (1 - sun) * (1 - wet))}" style="mix-blend-mode:multiply"/><rect x="-300" y="-300" width="2520" height="1700" fill="#FFC95A" opacity="${n2(.3 * lit)}" style="mix-blend-mode:soft-light"/><rect x="-300" y="-300" width="2520" height="1700" fill="#FFF6DC" opacity="${n2(.2 * noon * (1 - wet))}"/>`;
  if (lit > .05) { for (let i = 0; i < 5; i++) light += `<path d="M${n2(sx)} ${n2(sy)} L${n2(300 + i * 330 + 40 * Math.sin(t * .4 + i))} 1100 L${n2(480 + i * 330 + 40 * Math.sin(t * .4 + i))} 1100z" fill="#FFF3B8" opacity="${n2(.1 * lit * (.6 + .4 * Math.sin(t * .9 + i * 2)))}"/>`;
    for (let i = 0; i < 9; i++) { const v = ((t * .32 + hash(i, 41)) % 1), x = 140 + hash(i, 43) * 1640, y = 1000 - 520 * v; light += `<path d="M${n2(x)} ${n2(y)} q16 -22 0 -44 q-16 -22 0 -44" stroke="#FFF3C9" stroke-width="7" stroke-linecap="round" fill="none" opacity="${n2(.5 * lit * Math.sin(Math.PI * v) * clamp(T_ * 1.4 - .3))}"/>`; }
    for (let i = 0; i < 12; i++) { const life = 1.2 + hash(i, 51), v = ((t + hash(i, 53) * 3) % life) / life, x = 360 + hash(i, 55) * 1200 + sway, y = 780 + hash(i, 57) * 280; light += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(.55 * Math.sin(Math.PI * v) * lit)}) rotate(${n2(60 * v)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF8D2"/></g>`; } }
  if (wet > .01) { let bub = ""; for (let i = 0; i < 30; i++) { const v = ((t - tSp) * (.3 + .4 * hash(i, 3)) + hash(i, 5)) % 1, x = 120 + hash(i, 7) * 1680 + 30 * Math.sin(t * 2 + i), y = 1120 - v * 1240, r = 6 + 20 * hash(i, 9); bub += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="none" stroke="#E8FFF4" stroke-width="${n2(2 + r * .12)}" opacity="${n2(.75 * Math.sin(Math.PI * v))}"/><circle cx="${n2(x - r * .3)}" cy="${n2(y - r * .3)}" r="${n2(r * .25)}" fill="#fff" opacity="${n2(.6 * Math.sin(Math.PI * v))}"/>`; }
    light += OP(wet, `<rect x="-300" y="-300" width="2520" height="1700" fill="#2F8F8A" opacity=".3" style="mix-blend-mode:multiply"/>` + bub); }
  return { world: far + gr + under, body: `<defs>${pat}</defs>` + foot(-1) + foot(1) + OP(1 - wet, near) + back + head, light, you, T_, lit, sway, wet, noon }; }

const lakeW = (t, o = {}, cam) => lakeView(t, o, cam);
SC.waitw = (t, s) => { const L = "e1101", tz = W(L, "shrink") - .15, z = 1.1 + 1.5 * ei(clamp((t - tz) / (s.t1 - tz))), cam = [z, lerp(940, BACK[0], ss(tz, s.t1, t)), lerp(600, BACK[1], ss(tz, s.t1, t))], tP = LT(L) - .1;
  return lakeW(t, { mon: { warm: 0 } }, cam) + motes(t, 16, 8)
    + OP(1 - ramp(t, tz + .3, .4), buddy("basil", 1640, 1056, 290, t, { aura: true, flip: true, in: s.t0 + .15, poses: [[s.t0, "sit"], [tP + .2, "cheer"]], wave: true }) + HUD(t))
    + (t >= tP && t < tz ? TF(960, 240, spring(t, tP, .45) * (1 - ramp(t, tz - .25, .2)), tpill(0, 0, "Be a scale!", 78, P.sun, P.ink, { w: 700 })) : "")
    + (t >= tz ? TF(960, 240, spring(t, tz, .45), tpill(0, 0, "Shrink down… quietly", 52, P.ink, "#fff", { w: 600 })) : ""); };

SC.shrink = (t, s) => { const u = t - td, p = pov(t), bob = 4 * Math.sin(t * 2.2) + 2 * Math.sin(2 * Math.PI * distL(t) / .17), tOut = W("e1102", "monitor") - .5, e = eio((t - tOut) / 2.0), [yx, yy, ys] = p.you || [960, 904, 20];
  // the way in ends VERY close: the screen is full of small round scales, and one of them is you. On "on a monitor lizard's back" the camera
  // pulls back, and you are one bead among thousands on its back.
  const tip = ss(tSp - .45, tSp + .1, t) * (1 - ss(tSp + .1, tSp + .9, t)), Z = lerp(118 / (ys * .47), 1, e), ay = lerp(600, 540 + bob + 60 * tip, e), tx = lerp(yx, 960, e), ty = lerp(yy, 540, e);
  let out = `<g transform="translate(960 ${n2(ay)}) rotate(${n2(-3 * tip)}) scale(${n2(Z * 1000) / 1000}) translate(${n2(-tx)} ${n2(-ty)})">${p.world}${p.body}${p.light}</g>`;
  if (e < 1) { const a = 1 - ss(.02, .4, e), R = 118 * lerp(1, .5, e); if (a > 0) out += OP(a, `<g transform="translate(960 600) rotate(${n2(1.2 * Math.sin(t * .6))}) scale(${n2(1 + .012 * Math.sin(t * 2.2))})">${beadsClose(t, p.T_, R, 6, 0)}</g><rect width="1920" height="1080" fill="#3F66B0" opacity=".26" style="mix-blend-mode:multiply"/><rect width="1920" height="1080" fill="url(#gVig)"/>`); }
  // the way in: the wide view rushes past and clears
  if (u < 1.0) { const q = ei(u / 1.0); out += OP(1 - ss(.35, 1.0, u), lakeW(t, { mon: { warm: 0 } }, [2.6 + 9 * q, BACK[0], BACK[1]])) + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.8 * pulse(u, .62, .3, .5))}"/>`; }
  // the splash: white water bursts across the view as the lizard slides into the lake
  if (t > tSp - .1 && t < tSp + 1.1) { const v = t - tSp; let dr = ""; for (let i = 0; i < 34; i++) { const an = hash(i, 3) * Math.PI * 2, r = (120 + 900 * hash(i, 5)) * eo(v / .7); dr += `<circle cx="${n2(960 + Math.cos(an) * r)}" cy="${n2(600 + Math.sin(an) * r * .7)}" r="${n2((10 + 26 * hash(i, 7)) * clamp(1 - v))}" fill="#fff" opacity=".9"/>`; } out += `<rect width="1920" height="1080" fill="#EFFFFA" opacity="${n2(.85 * pulse(v, 0, .08, .4))}"/>` + (v > 0 ? dr : ""); }
  // YOU, close up: a pill joined to your scale by one plain line
  { const a = ramp(t, LT("e1102") - .2, .4) * (1 - ramp(t, tOut - .1, .4)); out += OP(a, `<path d="M640 470 L880 566" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="880" cy="566" r="8" fill="#fff"/>` + youPill(560, 430, 1.4) + TF(560, 506, 1, tpill(0, 0, "one tiny scale", 36, P.ink, "#fff", { w: 600 }))); }
  // after the pull-back: the YOU magnifier window keeps your scale in view, joined to the real one (one small bead among thousands)
  { const k = spring(t, tOut + 1.5, .5), LR = 196; out += youLens(k, 226, 852, LR, 960 + (yx - 960), 540 + bob + (yy - 540), beadsClose(t, p.T_, 37, 5, p.lit, p.wet) + `<rect x="-240" y="-240" width="480" height="480" fill="#3F66B0" opacity="${n2(.26 * (1 - sunOn(t)) * (1 - p.wet))}" style="mix-blend-mode:multiply"/><rect x="-240" y="-240" width="480" height="480" fill="#FFC95A" opacity="${n2(.3 * p.lit)}" style="mix-blend-mode:soft-light"/>`
      + (p.wet > .01 ? OP(p.wet, `<rect x="-240" y="-240" width="480" height="480" fill="#2F8F8A" opacity=".3" style="mix-blend-mode:multiply"/>` + [0, 1, 2, 3, 4].map((i) => { const v = ((t * .5 + i * .23) % 1); return `<circle cx="${n2(-140 + i * 70 + 12 * Math.sin(t * 3 + i))}" cy="${n2(200 - 400 * v)}" r="${10 + i * 3}" fill="none" stroke="#E8FFF4" stroke-width="4" opacity="${n2(.8 * Math.sin(Math.PI * v))}"/>`; }).join("")) : "")); }
  // what you feel, in the words Heart uses
  const tDry = W("e1102", "dry") - .15, tTough = W("e1102", "tough") - .15;
  out += fTag(t, tDry, tShade - .25, "dry", 760, 560, 56) + fTag(t, tTough, tShade - .25, "tough", 760, 760, 56)
    + fTag(t, W("e1103", "air") - .15, tSun - .15, "cool shade", 250, 560, 46, "#DCEBFF") + fTag(t, W("e1103", "cool", 1) - .15, tSun - .15, "you are cool too", 760, 990, 46) + fTag(t, W("e1103", "slow") - .2, tSun - .15, "the lizard is slow", 850, 990, 40, P.ink, "#fff")
    + fTag(t, tLand + .9, tNoon - .2, "warm rock", 330, 1300, 46, "#FFE9A8") + fTag(t, tWarm, tNoon - .2, "you warm up!", 760, 990, 52)
    + (t >= tHot && t < tSp + .2 ? TF(1300, 250, spring(t, tHot, .45) * (1 - ramp(t, tSp - .1, .25)), `<g transform="translate(-150 0) rotate(${n2(t * 25)})">${sunHeat()}</g>` + tpill(20, 0, "too hot", 50, "#fff", P.ink, { w: 700 })) : "")
    + fTag(t, W("e1105", "lake") - .5, s.t1 - .35, "cool lake", 250, 620, 46, "#C9F2EC") + fTag(t, tCool - .2, s.t1 - .35, "you cool down", 760, 990, 50);
  // two plain thermometers: the place, and the lizard. They rise and fall together (the lizard a little late).
  { const k = spring(t, tShade - .5, .5), pl = placeT(t), lz = p.T_, ch = Math.max(pulse(t, tLand, .2, 1.6), pulse(t, tNoon + .3, .2, 1.4), pulse(t, tSp + .3, .2, 1.6)); out += thermoF(1640, 700, pl, "PLACE", { k, H: 290, glow: ch }) + thermoF(1800, 700, lz, "LIZARD", { k: spring(t, tShade - .3, .5), H: 290, glow: ch, fill: P.basil });
    out += OP(ramp(t, tShade - .2, .4), tpill(1720, 420, "warm", 24, "#FF5A3C", "#fff", { w: 700, nosh: 1 }) + tpill(1720, 640, "cool", 24, "#3A8DFF", "#fff", { w: 700, nosh: 1 })); }
  out += fYou(t, LT("e1102") - .3, "You are a scale") + fSub(t, LT("e1102") + .6, tOut + .2, "seen very close up") + fSub(t, tOut + 1.6, 1e9, "on a monitor lizard’s back") + speeded(t, tSun + .2, tSp - .2, 190, 216);
  return out + wipe(t, s.t1, "#BFE6FF"); };

/* ---- back out to normal size: the monitor swims in the lake, head up, tail sweeping; the two thermometers have come down together ---- */
const swimMon = (t, x, y, k) => `<g>${TF(x, y, k, monitor({ pose: "swim", t }))}<rect x="${x - 900 * k}" y="${y}" width="${1500 * k}" height="${200 * k}" fill="#4FA3B5" opacity=".55"/><path d="M${n2(x - 660 * k)} ${y + 2} Q${x} ${y - 10} ${n2(x + 460 * k)} ${y + 2}" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>${[0, 1, 2].map((i) => { const u = ((t) * .8 + i / 3) % 1; return `<ellipse cx="${n2(x - 600 * k - 120 * u)}" cy="${y + 4}" rx="${n2(40 + 160 * u)}" ry="${n2(8 + 14 * u)}" fill="none" stroke="#fff" stroke-width="4" opacity="${n2(.7 * (1 - u))}"/>`; }).join("")}</g>`;
SC.pullout = (t, s) => { const e = eo((t - s.t0) / 1.2), cam = [lerp(3.2, 1.2, e), lerp(800, 900, e), lerp(640, 600, e)];
  return lakeW(t, { mon: false, items: swimMon(t, 800, 640, .5) }, cam) + fTag(t, s.t0 + 1.0, s.t1, "in the sun: warm", 250, 520, 46, "#FFE27A") + fTag(t, s.t0 + 1.5, s.t1, "in the water: cool", 250, 1080, 46, "#BFE6FF")
    + thermoF(1640, 700, placeT(t), "PLACE", { k: e, H: 290 }) + thermoF(1800, 700, lizT(t), "LIZARD", { k: e, H: 290, fill: P.basil }) + wipe(t, s.t0, "#BFE6FF") + OP(e, HUD(t)); };

/* ============ 12 · cold-blooded: the book's words name what you just lived through ============ */
const DEF = ["Reptiles are cold-blooded animals.", "This means that they do not have a constant", "body temperature like humans.", "Their body temperature changes with the", "environment that they are in."], DKEYS = ["cold-blooded", "constant", "body", "temperature", "changes", "environment"];
SC.mark2 = (t, s) => { const L = "e1202", B = "e1201", tK = MK("kw_cold"), tHum = W(L, "humans") - .5, tCh = W(L, "changes") - .2, LZ = [ROCKW[0] + 40, ROCKW[1] - 4, .3];
  // the lizard has climbed out onto its rock; a cloud covers the sun; on "changes" the cloud moves off and the sun warms the rock again
  const cv = 1 - ss(tCh - .2, tCh + 1.6, t), pl = (x) => .26 + .5 * (1 - (1 - ss(tCh - .2, tCh + 1.6, x))), lz = lagged(pl, s.t0, t, 1.3), cx = lerp(1010, 420, eio(1 - cv)), cam = [1.5, 1080, 640];
  let out = lakeW(t, { mon: { x: LZ[0], y: LZ[1], k: LZ[2], tongue: tongueAt(t, 1, 2.9) }, back: `<g transform="translate(${n2(cx)} 250)" opacity=".96">${cloudF(.8)}</g>` }, cam)
    + `<rect width="1920" height="1080" fill="#3B5E9A" opacity="${n2(.22 * cv)}" style="mix-blend-mode:multiply"/><ellipse cx="${gx(cam, ROCKW[0])}" cy="${gy(cam, ROCKW[1] - 30)}" rx="420" ry="190" fill="#FFE48A" opacity="${n2(.3 * (1 - cv))}" filter="url(#b30)"/>`;
  out += bookCard(t, L, DEF, DKEYS, s.t0 + .15, tK - .15, { tab: "✓ MARK SENTENCE", count: "2 of 2", footer: "From your book · P3 Science · Diversity · Classification of living things", x: 60, y: 150, w: 1210, size: 52, lh: 70 });
  // the thermometers stay: the place and the lizard move together; YOU stay the same
  { const k = spring(t, s.t0 + .3, .5), ch = pulse(t, tCh + .6, .3, 2.2), yk = spring(t, tHum, .5), X = [1440, 1610, 1780], gone = clamp(1 - ramp(t, tK - .2, .25) + ramp(t, tK + 2.6, .3)), YB = 620, capO = 1 - ramp(t, tK - .25, .2);
    out += OP(gone, (yk > .02 ? thermoF(X[0], YB, .62, "YOU", { k: yk, H: 250, fill: P.sun, ink: P.ink, glow: pulse(t, tHum + .5, .2, 1.2) }) + OP(ramp(t, tHum + .5, .3) * capO, TF(X[0], 716, 1, tpill(0, 0, "stays the same", 28, "#fff", P.ink, { w: 600 }))) : "")
      + thermoF(X[1], YB, pl(t), "PLACE", { k, H: 250, glow: ch }) + thermoF(X[2], YB, lz, "LIZARD", { k, H: 250, glow: ch, fill: P.basil })
      + (t >= tCh ? OP(capO, TF((X[1] + X[2]) / 2, 716, spring(t, tCh, .45), tpill(0, 0, "change together", 28, "#fff", P.ink, { w: 600 }))) : "")); }
  const S = TL.lines[B];
  out += buddy("basil", 250, 1060, 300, t, { aura: true, in: s.t0 + .15, poses: [[s.t0, "cheer"], [S.t - .12, "sit"], [S.end + .15, "cheer"], [S.end + 1.2, "sit"], [tHum, "surprised"], [tHum + 1.6, "sit"], [tK, "cheer"]], jump: [[S.t - .1, 26]], nohop: true, wave: true })
    + say(B, 420, 690, t, { size: 44, tail: -100 });
  return out + HUD(t); };

/* ============ 13 · the read-along, with a picture beside each word ============ */
const baseKw = SC.kwrecap;
SC.kwrecap = (t, s) => baseKw(t, s) + kwPictures(t, s, [
  (tt) => TF(4, 20, .17, antBig({ walk: tt * 6 })),
  (tt) => TF(4, 20, .17, antBig({ parts: [.6 + .4 * Math.sin(tt * 4), .6 + .4 * Math.sin(tt * 4 - 1), .6 + .4 * Math.sin(tt * 4 - 2)] })),
  (tt, lit) => TF(22, 26, .1, monitor({ t: tt, tongue: lit ? .5 + .5 * Math.sin(tt * 6) : 0 })),
  (tt) => kwThermo(.5 + .4 * Math.sin(tt * 2.4))]);

/* ============ 15 · "Now you know!": the board stands in the middle of the free space between Pip and Momo, 30% taller, clear of every disc ============ */
SC.nyk = (t, s) => nykScene(t, s, TF(786, 1052, .47, sixBoard(t, ST())));
})(); }
