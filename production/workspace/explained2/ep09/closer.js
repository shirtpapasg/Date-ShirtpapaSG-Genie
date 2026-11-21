// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP9 scenes (script.py): Part 1 lcpaper, lcpull, lcdrop · Part 2 lcbend, lctubes. They are in SHELF_HIDE (lib.js). EP9 Stage 1 wires them
// with lcPH (tests.js): the real lookCloser frame with a placeholder art(); Stage 2 draws each art(t) (and its set) and keeps the frame.
const LCW = { x: 960, y: 565, w: 1660, h: 790 };                       // the close-up window on screen
const lcPrev = (s) => TL.scenes[TL.scenes.indexOf(s) - 1];
// the scene before, drawn without its HUD (the set we zoom in from)
const lcSet = (t, s, name) => { const p = name ? { ...lcPrev(s), name } : lcPrev(s); window._noHud = true; let v = ""; try { v = SC[p.name](t, p); } finally { window._noHud = false; } return v; };
// a plain label with a line to the exact part (art coordinates); o.fill / o.ink / o.size; t1 = when it goes
const lcLab = (t, t0, x, y, txt, px, py, o = {}) => { if (t < t0) return ""; const a = o.t1 === undefined ? 1 : 1 - ramp(t, o.t1, .25); if (a <= .01) return "";
  return OP(a, pline(x, y, px, py, ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, o.size || 46, o.fill || "#fff", o.ink || P.ink, { w: 700 }))); };
// the "LOOK CLOSER" tag with its little magnifying glass
const lcTag = (t, t0) => TF(960, 96, spring(t, t0, .45), `<g filter="url(#dropS)"><rect x="-266" y="-44" width="532" height="88" rx="44" fill="${P.ink}"/><rect x="-258" y="-36" width="516" height="72" rx="36" fill="none" stroke="${P.sun}" stroke-width="4"/></g>
  <g transform="translate(-208 -3) rotate(${n2(8 * Math.sin(t * 2.4))})"><path d="M14 14 L34 34" stroke="${P.sun}" stroke-width="11" stroke-linecap="round"/><circle r="20" fill="#DDF4FF" opacity=".35"/><circle r="20" fill="none" stroke="${P.sun}" stroke-width="7"/></g>${T(36, 19, "LOOK CLOSER", 52, "#fff", { ls: 4 })}`);
// the one verdict tag: lands with a slam on the window's lower edge
// txt = one line, or [line 1, line 2] for a long verdict (EP9: two lines, never a tiny tag); vo: { x (offset from the middle), sub (small print inside the tag) }
const lcVerdict = (t, tv, txt, col, vo = {}) => { if (tv === undefined || t < tv) return ""; const lines = Array.isArray(txt) ? txt : [txt], two = lines.length > 1, size = two ? 62 : 70, sub = vo.sub;
  const w = Math.max(...lines.map((l) => tw(l, size, 700, "Fredoka", 2))) + 190, f = Math.min(1, 1600 / w), u = t - tv, k = (lerp(2.3, 1, eo(u / .16)) + .06 * wob(t, tv + .16, .45)) * f, x = 960 + (vo.x || 0);
  const h = two ? 190 + (sub ? 40 : 0) : 128, cy = LCW.y + LCW.h / 2 - 4 - (two ? 46 + (sub ? 16 : 0) : 0), ly = two ? [-h / 2 + 76, -h / 2 + 146] : [25];
  return (u < .5 ? `<circle cx="${x}" cy="${LCW.y + LCW.h / 2}" r="${n2(160 + 700 * eo(u / .5))}" fill="none" stroke="${P.sun}" stroke-width="${n2(18 * (1 - u / .5))}" opacity="${n2(1 - u / .5)}"/>` : "")
    + TF(x, cy, k, `<g transform="rotate(-1.5)"><g filter="url(#drop)"><rect x="${n2(-w / 2)}" y="${-h / 2}" width="${n2(w)}" height="${h}" rx="${Math.min(64, h / 2)}" fill="${col}"/><rect x="${n2(-w / 2 + 9)}" y="${-h / 2 + 9}" width="${n2(w - 18)}" height="${h - 18}" rx="${Math.min(55, h / 2 - 9)}" fill="none" stroke="#fff" stroke-width="6" opacity=".9"/></g>
      <g transform="translate(${n2(-w / 2 + 66)} ${sub ? -18 : 0})">${tickBadge(34)}</g>${lines.map((l, i) => T(40, ly[i], l, size, "#fff", { ls: 2 })).join("")}${sub ? T(40, h / 2 - 26, sub, 32, "#fff", { w: 600 }) : ""}</g>`); };
/* the frame. o: fx, fy (the thing on screen, where the zoom goes), tz (the push-in starts), art(t) -> svg centred on (0, 0) inside +-830 x +-395
   (keep the top 110 px for the book strip and the bottom 80 px for the verdict), bgc (window colour), verdict [text, colour], tv, set(t) */
function lookCloser(t, s, o) { const tz = o.tz, e = eio((t - tz) / 1.0), op = eio((t - tz - .3) / .8), W_ = LCW, x0 = W_.x - W_.w / 2, y0 = W_.y - W_.h / 2;
  const z = 1 + .9 * e, set = o.set ? o.set(t) : lcSet(t, s);
  let out = `<g transform="translate(${n2(o.fx)} ${n2(o.fy)}) scale(${n2(z)}) translate(${n2(-o.fx)} ${n2(-o.fy)})">${set}</g><rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.66 * e)}"/>`;
  if (op > 0) { const cx = lerp(o.fx, W_.x, op), cy = lerp(o.fy, W_.y, op), push = 1 + .055 * clamp((t - tz - 1) / Math.max(1, s.t1 - tz - 1));
    out += `<clipPath id="lcA"><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" rx="44"/></clipPath><clipPath id="lcB"><circle cx="${n2(cx)}" cy="${n2(cy)}" r="${n2(40 + 1160 * op)}"/></clipPath>
      <g clip-path="url(#lcB)"><g filter="url(#drop)"><rect x="${x0 - 14}" y="${y0 - 14}" width="${W_.w + 28}" height="${W_.h + 28}" rx="56" fill="#FFF8EA"/></g><g clip-path="url(#lcA)"><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" fill="${o.bgc || "#FFF3DC"}"/>
        <g transform="translate(${W_.x} ${W_.y}) scale(${n2(push * 1000) / 1000})">${o.art(t)}</g></g><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" rx="44" fill="none" stroke="${P.ink}" stroke-width="5" opacity=".25"/></g>`
      + (op < 1 ? `<circle cx="${n2(cx)}" cy="${n2(cy)}" r="${n2(40 + 1160 * op)}" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * (1 - op))}"/>` : ""); }
  return out + (o.over ? OP(op, o.over(t)) : "") + lcTag(t, tz + .1) + lcVerdict(t, o.tv, o.verdict[0], o.verdict[1], o.verdict[2]) + (o.top ? OP(op, o.top(t)) : "") + logo(t); }
// the book's sentence inside the close-up (the cream strip at the top of the window)
const lcStrip = (t, id, text, o = {}) => bookCaption(t, id, text, 262, { size: 50, ...o });
// small helpers for the pictures
const lcFlame = (x, y, k, t, ph = 0) => k < .03 ? "" : TF(x, y, k, `<path d="M0 0 Q-34 -30 -16 -70 Q-10 -40 0 -${n2(108 + 14 * Math.sin(t * 13 + ph))} Q10 -40 18 -66 Q34 -30 0 0z" fill="#FF8A1E"/><path d="M0 -2 Q-18 -22 -6 -50 Q0 -30 2 -${n2(70 + 10 * Math.sin(t * 17 + ph))} Q12 -26 0 -2z" fill="#FFD75A"/>`);
const lcBricks = (x0, y0, w, h, bw = 74, bh = 40, a = "#B8543A", b = "#A8482E") => { let s = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#7A3220"/>`; for (let r = 0; r * bh < h; r++) for (let c = -1; c * bw < w; c++) { const x = x0 + c * bw + (r % 2) * bw / 2, y = y0 + r * bh; s += `<rect x="${x + 3}" y="${y + 3}" width="${bw - 6}" height="${bh - 6}" rx="4" fill="${(r * 3 + c) % 4 ? a : b}"/>`; } return s; };
const lcGlint = (x, y, r, t, ph = 0) => { const k = .35 + .65 * Math.max(0, Math.sin(t * 3.4 + ph)); return `<g transform="translate(${x} ${y}) scale(${n2(k)}) rotate(${n2(20 * Math.sin(t + ph))})"><path d="M0 -${r} Q${r * .16} -${r * .16} ${r} 0 Q${r * .16} ${r * .16} 0 ${r} Q-${r * .16} ${r * .16} -${r} 0 Q-${r * .16} -${r * .16} 0 -${r}z" fill="#fff"/></g>`; };
const lcStep = (x, y, n, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><circle r="34" fill="url(#gSun)"/></g>${T(0, 17, n, 48, P.ink)}`);
// "speeded up" inside the window, with a little clock whose hand spins
const lcClock = (t, t0, t1, x, y) => OP(ramp(t, t0, .25) * (1 - ramp(t, t1, .25)), `<g transform="translate(${x} ${y})"><g filter="url(#dropS)"><rect x="-190" y="-40" width="380" height="80" rx="40" fill="${P.ink}"/></g><circle cx="-146" cy="0" r="27" fill="#fff"/><path d="M-146 0 L${n2(-146 + 19 * Math.sin((t - t0) * 7))} ${n2(-19 * Math.cos((t - t0) * 7))}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M-146 0 L${n2(-146 + 12 * Math.sin((t - t0) * .6))} ${n2(-12 * Math.cos((t - t0) * .6))}" stroke="${P.coral}" stroke-width="5" stroke-linecap="round"/>${T(32, 14, "speeded up", 40, "#fff", { w: 600 })}</g>`);

/* ====================================================================================================================================
   EP9 STAGE 2: the five look-closer pictures. Each art(t) is centred on (0, 0) inside +-830 x +-395.
   ==================================================================================================================================== */
// small helpers: the "slow motion" tag (with a little snail-paced clock), the adult's small print, a round magnifying lens with a picture inside
const lcSlow = (t, t0, x = 640, y = -338) => TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-150" y="-34" width="300" height="68" rx="34" fill="${P.ink}"/></g><circle cx="-110" cy="0" r="22" fill="#fff"/><path d="M-110 0 L${n2(-110 + 15 * Math.sin((t - t0) * 1.2))} ${n2(-15 * Math.cos((t - t0) * 1.2))}" stroke="${P.coral}" stroke-width="5" stroke-linecap="round"/><circle cx="-110" cy="0" r="3.5" fill="${P.ink}"/>${T(28, 13, "slow motion", 36, "#fff", { w: 600 })}`);
const lcAdult = (t, t0, a, b, x = -630, y = -318) => TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-190" y="-58" width="380" height="116" rx="24" fill="${P.ink}"/></g>${T(0, -10, a, 30, "#fff", { w: 600 })}${T(0, 34, b, 36, P.sun)}`);
const lcLens = (x, y, r, k, inner, id, px, py) => k < .02 ? "" : (px !== undefined ? pline(x, y, px, py, k, P.ink) : "") + TF(x, y, k, `<clipPath id="${id}"><circle r="${r}"/></clipPath><g filter="url(#drop)"><circle r="${r + 10}" fill="${P.ink}"/></g><path d="M${n2(r * .72)} ${n2(r * .72)} L${n2(r * 1.3)} ${n2(r * 1.3)}" stroke="#5E3F28" stroke-width="${n2(r * .2)}" stroke-linecap="round"/><circle r="${r}" fill="#FFF8EA"/><g clip-path="url(#${id})">${inner}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="10"/><path d="M${n2(-r * .62)} ${n2(-r * .5)} q${n2(r * .2)} ${n2(-r * .3)} ${n2(r * .5)} ${n2(-r * .34)}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>`);
const eyeIcon = (lit = 1) => `<circle r="44" fill="${lit > .5 ? P.sun : "#fff"}" stroke="${P.ink}" stroke-width="5"/><path d="M-30 0 Q0 -26 30 0 Q0 26 -30 0z" fill="#fff" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><circle r="10" fill="${P.ink}"/><circle cx="3" cy="-3" r="3" fill="#fff"/>`;
const counterIcon = (lit = 1, n = 1) => `<circle r="44" fill="${lit > .5 ? P.sun : "#fff"}" stroke="${P.ink}" stroke-width="5"/><rect x="-28" y="-20" width="56" height="40" rx="9" fill="${P.ink}"/>${T(0, 13, n, 34, "#fff")}<path d="M-14 -20 v-9 M0 -20 v-9 M14 -20 v-9" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>`;
const wordChip = (x, y, ic, word, lit, t) => TF(x, y, 1 + .1 * lit, OP(.45 + .55 * Math.min(1, lit * 3 + (lit > 0 ? 1 : 0)), (lit > .05 ? `<circle r="70" fill="${P.sun}" opacity="${n2(.6 * lit)}" filter="url(#b10)"/>` : "") + TF(0, 0, 1.35, ic) + tpill(0, 92, word, 44, lit > 0 ? P.ink : "#fff", lit > 0 ? "#fff" : P.ink, { w: 700 })));
// the top of the stand in a close-up: the cross bar, the upright rod, and a clamp at each x
const lcBar = (xs, y = -330, rodX = 0) => `<rect x="${rodX - 11}" y="${y - 10}" width="22" height="900" rx="8" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="3" opacity=".9"/><rect x="-1400" y="${y - 12}" width="2800" height="24" rx="12" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="3"/><circle cx="${rodX}" cy="${y}" r="20" fill="#4A5670" stroke="#2B2147" stroke-width="4"/>`
  + xs.map((x) => `<rect x="${x - 64}" y="${y - 4}" width="128" height="62" rx="12" fill="#39435A" stroke="#2B2147" stroke-width="4"/><rect x="${x - 54}" y="${y + 42}" width="108" height="18" rx="6" fill="#6C7A98"/><circle cx="${x}" cy="${y + 22}" r="13" fill="${P.sun}" stroke="#2B2147" stroke-width="4"/>`).join("");

/* ---------- 1 · the paper strip: observe (a finger pushes it: it bends), then measure (one weight hangs on it: it holds; we count 1) ---------- */
function paperArt(t) { const a = "g503", b = "g504", tF = W(a, "finger") - .5, tP = W(a, "pushes") - .1, tB = W(a, "bends") - .1, tO = W(a, "observe") - .1, tUp = LE(a) + .2, tN = LT(b) - .2, tWt = W(b, "weight") - .45, tH = W(b, "holds") - .1, tC = W(b, "one", 1) - .05, tM = W(b, "measure") - .1;
  const push = eio((t - tP) / .9) * (1 - eo((t - tUp) / .14)), bend = 58 * push + (t > tUp ? 16 * wob(t, tUp, .5) : 0), so = { x: 0, y0: -306, y1: 60, w: 104, bend };
  const settle = t > tWt + .45 ? 5 * wob(t, tWt + .45, .4) : 0, su = (t - tWt) / .5, on = su >= 1 ? 1 : 0, hx = stripOff(so, 60);
  const fx = lerp(520, 54 - bend, eo((t - tF) / .6)) + 900 * ei((t - tUp) / .5), fing = t >= tF && t < tUp + .6 ? TF(fx, -128, 1, gloveFinger(), 22) : "";
  const hang = `<g transform="translate(${n2(hx)} ${n2(60 + settle)}) scale(1.5)">${hangerSvg(on, { rod: 84, slide: su > 0 && su < 1 ? [0, su] : null })}</g>` + (su > 0 && su < 1.7 ? TF(lerp(285, 0, eio(su)) + 56 + 900 * ei((su - 1.1) / .6), 60 + 120 - 6, 1, glovePinch(su > 1 ? 1 : 0), 14) : "");
  return lcBar([0], -344, 250) + stripSvg("paper", so) + hang + fing
    + wordChip(-560, -170, eyeIcon(t >= tO ? 1 : 0), "observe", t >= tO ? .35 + .65 * pulse(t, tO, .05, 1.2) : 0, t) + wordChip(560, -170, counterIcon(t >= tM ? 1 : 0, t >= tC ? 1 : 0), "measure", t >= tM ? .35 + .65 * pulse(t, tM, .05, 1.2) : 0, t)
    + lcLab(t, tB, -400, 60, "It bends", -62 - bend * .8, -110, { size: 50, t1: tN - .1 }) + (t >= tN ? TF(-330, 130, spring(t, tN, .4), counterPill(t >= tC ? 1 : 0, pulse(t, tC, .03, .4), 1.25)) : "")
    + lcLab(t, tH, 480, 110, "It holds 1 weight", 62, 176, { size: 46 }); }

/* ---------- 2 · the slow pull test: the paper tears at 3 weights, the fabric holds 8; the two counters become two bars ---------- */
const PX = 450, PULLY = { y0: -296, y1: 30, w: 96, plate: 186, mat: 226 };
// inside the lens: the paper's left edge, the tear opening and running across; then the two pieces apart
function tearLens(tear, drop) { const jag = (y, sg) => Array.from({ length: 14 }, (_, i) => [-60 + i * 22, y + sg * ((i % 2 ? 7 : -3) + 6 * hash(i, 3))]);
  const piece = (ya, yb) => { let l = ""; for (let y = -150; y <= 170; y += 46) if (y > ya + 6 && y < yb - 6) l += `<path d="M-60 ${y} H226" stroke="${PAPERL}" stroke-width="6"/>`; return l + `<path d="M-22 ${ya} V${yb}" stroke="#F58DA0" stroke-width="5"/>`; };
  if (tear >= 1) { const g = 16 + 46 * drop; return `<rect x="-200" y="-200" width="400" height="400" fill="#E9DCC0"/><path d="${ptsPath([[-60, -200], [226, -200], ...jag(-g / 2, -1).reverse()])}" fill="#fff" stroke="#9AA6C0" stroke-width="5" stroke-linejoin="round"/>${piece(-200, -g / 2 - 8)}
    <path d="${ptsPath([...jag(g / 2, 1), [226, 200], [-60, 200]])}" fill="#fff" stroke="#9AA6C0" stroke-width="5" stroke-linejoin="round"/>${piece(g / 2 + 8, 200)}`; }
  const tip = -60 + 300 * Math.min(1, tear / .3), hw = 15 * Math.min(1, tear * 6);
  return `<rect x="-200" y="-200" width="400" height="400" fill="#E9DCC0"/><rect x="-60" y="-200" width="300" height="400" fill="#fff" stroke="#9AA6C0" stroke-width="5"/>${piece(-200, 200)}` + (tear > 0 ? `<path d="M-66 ${-hw} L${n2(tip)} 0 L-66 ${hw}z" fill="#E9DCC0"/><path d="M-60 ${-hw} L${n2(tip)} 0 L-60 ${hw}" fill="none" stroke="#7C8898" stroke-width="5" stroke-linejoin="round" stroke-dasharray="9 5"/>` : ""); }
// inside the lens: the fabric's edge. Its threads (over and under) draw tight and straight under the weights, and stay whole
function weaveLens(taut, t) { const C = 62, wav = 9 * (1 - taut); let v = "", h = "", top = "";
  const vth = (i) => { let d = ""; for (let j = 0; j <= 14; j++) { const y = -210 + j * 30; d += (j ? "L" : "M") + n2(-170 + i * C + wav * Math.sin(j * .9 + i * 1.7)) + " " + y + " "; } return d; };
  for (let i = 0; i < 5; i++) v += `<path d="${vth(i)}" fill="none" stroke="#A88C55" stroke-width="${n2(44 - 4 * taut)}" stroke-linecap="round"/><path d="${vth(i)}" fill="none" stroke="#F3E4C0" stroke-width="${n2(36 - 4 * taut)}" stroke-linecap="round"/><path d="${vth(i)}" fill="none" stroke="#fff" stroke-width="6" opacity=".7" transform="translate(-8 0)"/>`;
  for (let j = 0; j < 7; j++) { const y = -186 + j * C; h += `<rect x="-230" y="${y - 19}" width="340" height="38" rx="19" fill="#E6D2A4" stroke="#A88C55" stroke-width="4"/><path d="M-220 ${y - 7} H100" stroke="#fff" stroke-width="5" opacity=".55"/>`;
    for (let i = 0; i < 5; i++) if ((i + j) % 2 === 0) { const x = -170 + i * C; top += `<rect x="${n2(x - 18 + 2 * taut)}" y="${y - 24}" width="${n2(36 - 4 * taut)}" height="48" fill="#F3E4C0"/><path d="M${n2(x - 18 + 2 * taut)} ${y - 24} v48 M${n2(x + 18 - 2 * taut)} ${y - 24} v48" stroke="#A88C55" stroke-width="4"/><path d="M${x - 8} ${y - 24} v48" stroke="#fff" stroke-width="6" opacity=".7"/>`; } }
  const pull = taut > .05 ? [-170, -46, 78].map((x, i) => `<path d="M${x + 31} ${n2(120 + 26 * Math.sin(t * 5 + i))} v34 l-9 -10 m9 10 l9 -10" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.5 * taut)}"/>`).join("") : "";
  return `<rect x="-220" y="-220" width="440" height="440" fill="#E9DCC0"/>${h}${v}${top}${pull}`; }
function pullArt(t) { const a = "g701", b = "g702", c = "g703", d = "g704", e = "g705", P_ = PULLY, tB = MK("bars");
  const tp = [W(a, "one"), W(a, "two"), W(a, "three")], np = tp.filter((x) => t >= x).length, tE = W(b, "edge") - .3, tT = W(b, "tiny") - .1, tR = W(b, "runs") - .05, tA = W(b, "across") + .45, tTe = W(b, "tears") - .1;
  const tear = t < tT ? 0 : t < tR ? .2 * eo((t - tT) / .7) : lerp(.2, 1, eio((t - tR) / (tA - tR))), drop = ei((t - tA) / .32), gap = (P_.mat - P_.plate - 6) * drop;
  const tf = [LT(c) + .25, LT(c) + .6, W(c, "three"), W(c, "four"), W(c, "five"), W(c, "six"), W(c, "seven"), W(c, "eight")], nf = tf.filter((x) => t >= x).length, tTh = W(d, "threads") - .3, taut = eio((t - (W(d, "pull") - .1)) / .9), tHo = W(d, "holds") - .1;
  const slide = (ts, n) => { const i = ts.findIndex((x) => t < x && t >= x - .42); return i < 0 ? null : [i, (t - ts[i] + .42) / .42]; }, bump = (ts) => Math.max(0, ...ts.map((x) => pulse(t, x, .02, .3)));
  // the camera: on the paper strip, across to the fabric strip, then back a little for the chart
  const tS = LT(c) - .5, u1 = eio((t - tS) / 1.3), u2 = eio((t - tB) / 1.0), z = lerp(1.32, .84, u2), cx = lerp(lerp(-PX - 70, PX + 70, u1), 250, u2), cy = lerp(-45, -6, u2);
  const rig = (kind, x, n, o) => { const so = { x, y0: P_.y0, y1: P_.y1, w: P_.w, ...o }; return stripSvg(kind, so) + `<g transform="translate(${x} ${n2(P_.y1 + ((o.tear || 0) >= 1 ? (o.gap || 0) + P_.w * .06 : 0))}) scale(1.5)">${hangerSvg(n, { rod: 100, slide: o.slide })}</g>`; };
  const sp = slide(tp, np), sf = slide(tf, nf), hand = (x, sl) => sl ? TF(x + lerp(285, 0, eio(sl[1])) + 58, P_.y1 + 150 - 6 - 7.5 - sl[0] * 15, 1, glovePinch(0), 8) : "";
  const fly = (x0, y0, x1, y1, n, ck) => { const u = eio((t - tB - .25) / .7), g = eio((t - tB - .95) / .7); return g >= 1 ? "" : TF(lerp(x0, x1, u), lerp(y0, y1, u) - 60 * Math.sin(Math.PI * u), 1 - g, counterPill(n, ck, 1.15)); };
  // the chart: two bars made from the counters
  const CH = [930, -20], unit = 42, g = eio((t - tB - .95) / .8), bar = (dx, n, kind, lab) => { const h = unit * n * g, x = CH[0] + dx, by = CH[1] + 196;
    return `<clipPath id="bc${kind}"><rect x="${x - 56}" y="${n2(by - h)}" width="112" height="${n2(h)}" rx="8"/></clipPath><rect x="${x - 56}" y="${n2(by - h)}" width="112" height="${n2(h)}" rx="8" fill="${kind === "paper" ? "#fff" : FABC}" stroke="${kind === "paper" ? "#7C8898" : "#A88C55"}" stroke-width="5"/><g clip-path="url(#bc${kind})">${kind === "paper" ? Array.from({ length: 12 }, (_, i) => `<path d="M${x - 56} ${by - 14 - i * 28} h112" stroke="${PAPERL}" stroke-width="4"/>`).join("") : `<rect x="${x - 56}" y="${by - 360}" width="112" height="360" fill="url(#vdWeave)"/>`}</g>`
      + T(x, by + 48, lab, 40, P.ink) + (g > .9 ? TF(x, by - h - 44, spring(t, tB + .95 + .72, .4), `<circle r="36" fill="${P.sun}" stroke="${P.ink}" stroke-width="5"/>${T(0, 16, n, 46, P.ink)}`) : ""); };
  let grid = ""; for (let i = 0; i <= 8; i++) grid += `<path d="M${CH[0] - 170} ${CH[1] + 196 - i * unit} H${CH[0] + 180}" stroke="${P.ink2}" stroke-width="${i ? 2 : 6}" opacity="${i ? .25 : 1}" stroke-linecap="round"/>` + (i % 2 === 0 ? T(CH[0] - 190, CH[1] + 206 - i * unit, i, 26, P.ink2, { w: 600 }) : "");
  const chart = t < tB ? "" : TF(CH[0], CH[1], spring(t, tB + .1, .5), `<g transform="translate(${-CH[0]} ${-CH[1]})"><g filter="url(#drop)"><rect x="${CH[0] - 250}" y="${CH[1] - 300}" width="500" height="630" rx="30" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="6"/></g>${T(CH[0], CH[1] - 244, "number of weights", 38, P.ink)}${grid}${bar(-80, 3, "paper", "paper")}${bar(84, 8, "fabric", "fabric")}${T(CH[0], CH[1] + 306, "our strips, our test", 28, P.ink2, { w: 500 })}</g>`);
  const lensO = 1 - ramp(t, tB - .2, .3);
  const world = lcBar([-PX, PX], -330, 0) + `<rect x="-760" y="${P_.mat}" width="1520" height="26" rx="13" fill="#FF9E8A" stroke="#C8604E" stroke-width="4"/><rect x="-800" y="${P_.mat + 24}" width="1600" height="200" rx="16" fill="#4A5670" stroke="#2B2147" stroke-width="5"/>${T(0, P_.mat + 84, "OUR TEST STAND", 44, "#fff", { ls: 4 })}`
    + rig("paper", -PX, np, { tear, gap, slide: sp }) + rig("fabric", PX, nf, { taut, slide: sf }) + hand(-PX, sp) + hand(PX, sf)
    + OP(lensO, TF(-PX - 250, -282, 1, tpill(0, 0, "paper", 40, "#fff", P.ink, { w: 700 })) + TF(PX + 250, -282, 1, tpill(0, 0, "fabric", 40, "#fff", P.ink, { w: 700 })))
    + OP(lensO, lcLens(-PX - 280, 90, 150, spring(t, tE, .45), `<g transform="scale(.75)">${tearLens(tear, drop)}</g>`, "lnP", -PX - P_.w / 2, lerp(P_.y0, P_.y1, .36)) + lcLens(PX + 280, 90, 150, spring(t, tTh, .45), `<g transform="scale(.75) scale(-1 1)">${weaveLens(taut, t)}</g>`, "lnF", PX + P_.w / 2, -90))
    + (t < tB + .25 ? TF(-PX - 250, -210, 1, counterPill(np, bump(tp), 1.15)) + (t >= tS + .6 ? TF(PX + 250, -210, spring(t, tS + .6, .4), counterPill(nf, bump(tf), 1.15)) : "") : fly(-PX - 250, -210, CH[0] - 80, CH[1] + 60, 3, 0) + fly(PX + 250, -210, CH[0] + 84, CH[1] - 60, 8, 0))
    + OP(lensO, (t >= tTe ? TF(-PX - 250, -138, spring(t, tTe, .4), tpill(0, 0, "It tears", 44, WEAKC, "#fff", { w: 700 })) : "") + (t >= tHo ? TF(PX + 250, -138, spring(t, tHo, .4), tpill(0, 0, "It holds", 44, GOODC, "#fff", { w: 700 })) : "")) + chart;
  return `<g transform="scale(${n2(z)}) translate(${n2(-cx)} ${n2(-cy)})">${world}</g>` + lcSlow(t, LT(a) + .3, 640, -338); }

/* ---------- 3 · the drop box: an adult's gloved hands let go; the metal cup bounces (strong), the glass cup breaks into big pieces (fragile) ---------- */
function dropArt(t) { const a = "g1102", b = "g1103", FL = 286, XM = -210, XG = 300, CS = 1.35, Y0 = -150;
  const tM0 = W(a, "falls") - .25, tMc = W(a, "clang"), tG0 = W(b, "falls") - .25, tGc = W(b, "crack"), tBr = tGc + .5;
  // the metal cup: falls, hits the bottom (clang), bounces once, tips over, rolls a little and rests on its side, whole
  let mx = XM, my = Y0, mr = 0; if (t >= tM0 && t < tMc) my = lerp(Y0, FL, Math.pow((t - tM0) / (tMc - tM0), 2));
  else if (t >= tMc) { const u = (t - tMc) / 1.0; if (u < 1) { my = FL - 150 * 4 * u * (1 - u); mx = XM + 50 * u; mr = -90 * eio(u * 1.1); } else { const v = clamp((t - tMc - 1) / 1.1); mx = XM + 50 + 40 * eo(v); mr = -90 - 8 * Math.sin(v * 9) * (1 - v); my = FL; } }
  const mcup = `<g transform="translate(${n2(mx)} ${n2(my - (mr < -45 ? 52 * CS * Math.min(1, (-mr - 45) / 45) : 0))}) rotate(${n2(mr)} 0 ${n2(-60 * CS * 0)}) scale(${CS})">${metalCup()}</g>`;
  const ring = [0, .22, .44].map((dl) => { const u = (t - tMc - dl) / .7; return u > 0 && u < 1 ? `<ellipse cx="${XM}" cy="${FL}" rx="${n2(60 + 190 * u)}" ry="${n2(14 + 30 * u)}" fill="none" stroke="${P.sun}" stroke-width="${n2(8 * (1 - u))}" opacity="${n2(1 - u)}"/>` : ""; }).join("");
  // the glass cup: falls, a crack runs up its side, it breaks into five big pieces that stay in the box
  const gy = t < tG0 ? Y0 : t < tGc ? lerp(Y0, FL, Math.pow((t - tG0) / (tGc - tG0), 2)) : FL, crack = clamp((t - tGc) / .45), k = eo((t - tBr) / .7);
  const gcup = `<g transform="translate(${XG} ${n2(gy)}) scale(${CS})">${t < tBr ? glassCup(crack) : glassPieces(k)}</g>`;
  const handAt = (x, t0) => { const op = clamp((t - t0) / .2), lift = 60 * eio((t - t0 - .3) / .8); return TF(x + 52, Y0 - 124 * CS + 18 - lift, 1, glovePinch(op), -90); };
  const mNB = tMc + 2.0, tSt = tMc + 2.5;
  return `<rect x="-900" y="${FL + 4}" width="1800" height="200" fill="#D9CFBF"/><path d="M-900 ${FL + 4} H900" stroke="#B5A995" stroke-width="5"/>`
    + TF(45, FL + 6, 1, dropBox(`<g transform="translate(-45 ${-FL - 6})">${ring}${mcup}${gcup}</g>`, 1080, 420)) + handAt(XM, tM0) + handAt(XG, tG0)
    + lcAdult(t, LT(a) - .2, "An adult does this test.", "Never try it.") + lcSlow(t, LT(a) + .3)
    + lcLab(t, mNB, XM, 40, "not broken", XM, FL - 120, { size: 46 }) + (t >= tSt ? TF(XM, -38, spring(t, tSt, .4), tpill(0, 0, "STRONG", 44, GOODC, "#fff", { w: 700, ls: 3 })) : "")
    + lcLab(t, tBr + .5, XG + 40, 60, "broken", XG + 20, FL - 70, { size: 46 }); }

/* ---------- 4 · the slow bend test: the rubber band bends in half and into a twist, and is whole; the ice-cream stick bows, cracks on the outside of the bend, and snaps ---------- */
function bendArt(t) { const a = "j501", b = "j502", CY = -70, TRY = 262, REST = [[0, 190], [0, 192]], FIN = [[-400, 40], [400, 70]];
  const tA = W(a, "bends") - .25, tHf = W(a, "in") - .15, tUn = W(a, "into") - .55, tTw = W(a, "into") - .1, tNc = W(a, "no") - .2, tLet = W(a, "it") - .1, tSw = LT(b) - .25;
  const tBd = W(b, "bends") - .15, tCk = W(b, "crack") - .15, tSn = W(b, "snap") - .02, tBk = W(b, "breaks") - .25, fin = eio((t - tBk - .75) / .6);
  const f = t < tHf ? .32 * eio((t - tA) / .7) : lerp(.32, 1, eio((t - tHf) / .8)) * (1 - eio((t - tUn) / .4)), w = eio((t - tTw) / .8) * (1 - eo((t - tLet) / .25)), wb = t > tLet ? .12 * wob(t, tLet, .6) : 0;
  const sw = eio((t - tSw) / .8), bx = lerp(lerp(0, REST[0][0], sw), FIN[0][0], fin), by = lerp(lerp(CY, REST[0][1], sw), FIN[0][1], fin), bs = lerp(lerp(1, .6, sw), 1, fin), pts = bandPts(f, w), pR = pts[0], pL = pts[36];
  const band = `<g transform="translate(${n2(bx)} ${n2(by)}) scale(${n2(bs * (1 + wb))} ${n2(bs * (1 - wb) * lerp(lerp(1, .5, sw), .82, fin))})">${bandSvg(f, w)}</g>`;
  // the stick: from the tray to the hands, bowed a little, the crack opens on the outside (top) of the bend, snap, the two pieces go back to the tray
  const up = eio((t - tSw - .1) / .8), dn = eio((t - tBk) / .7);
  const deg = t < tCk ? 20 * eio((t - tBd) / 1.3) + 1.2 * Math.sin(t * 30) * pulse(t, W(b, "listen"), .1, .8) : lerp(20, 27, eio((t - tCk) / 1.2)), crack = clamp((t - tCk) / 1.3), snap = t >= tSn ? eo((t - tSn) / .16) : 0;
  const sk = t < tBk ? up : 1 - dn, sx = lerp(lerp(REST[1][0], 0, sk), FIN[1][0], fin), sy = lerp(lerp(REST[1][1], CY, sk), FIN[1][1], fin), ss_ = lerp(lerp(.6, 1, sk), 1, fin);
  const stick = `<g transform="translate(${n2(sx)} ${n2(sy)}) scale(${n2(ss_)})">${stickSvg({ bend: Math.max(.01, deg * sk), crack: snap ? 0 : crack, snap })}</g>`;
  // the adult's gloved hands: on the two ends of the band, then on the two ends of the stick
  const hb = t < tSw + .15, kap = Math.max(.0001, deg * Math.PI / 180) / 520, ex = Math.sin(kap * 260) / kap, ey = (1 - Math.cos(kap * 260)) / kap * .5;
  const open = hb ? clamp((t - tLet) / .2) : clamp((t - tBk + .1) / .2), away = hb ? 700 * ei((t - tLet - .25) / .5) : 700 * (1 - eo((t - tSw - .55) / .5)) + 700 * ei((t - tBk - .05) / .5);
  const hR = hb ? [pR[0] + 14, CY + pR[1]] : [ex - 8, CY + ey + (snap ? 30 * snap : 0)], hL = hb ? [pL[0] - 14, CY + pL[1]] : [-ex + 8, CY + ey + (snap ? 30 * snap : 0)], tilt = hb ? 0 : deg * .5 + 16 * snap;
  const hands = away < 690 ? TF(hR[0] + away, hR[1], 1, glovePinch(open), tilt) + `<g transform="translate(${n2(hL[0] - away)} ${n2(hL[1])}) rotate(${n2(-tilt)}) scale(-1 1)">${glovePinch(open)}</g>` : "";
  // (Stage 3: the band's "no crack" pill sits BESIDE the band on the tray, not under the stick that is about to crack)
  // the magnifying lens: on the band's tightest bend (smooth, whole), then on the OUTSIDE of the stick's bend (a pale crack opens)
  const lensB = lcLens(440, -215, 124, spring(t, tNc, .45) * (1 - ramp(t, tSw - .1, .25)), `<rect x="-200" y="-200" width="400" height="400" fill="#FFF3DC"/><g transform="scale(2.4) translate(-150 0)">${bandSvg(0, 1)}</g>`, "lnB", 150, CY - 40);
  const tLs = tBd + .5, lensS = lcLens(440, -215, 124, spring(t, tLs, .45) * (1 - ramp(t, tSn + .9, .25)), `<rect x="-200" y="-200" width="400" height="400" fill="#FFF3DC"/><g transform="scale(3.2) translate(0 ${n2(22 + (snap ? 10 : 0))})">${stickSvg({ bend: Math.max(.01, deg), crack: snap ? 0 : crack, snap: snap * .22 })}</g>`, "lnS", 20, CY - 34);
  return `<rect x="-900" y="${TRY - 2}" width="1800" height="200" fill="#C9A06A"/>` + TF(0, TRY, 1, trayBase(1620, "#F4F7FA", "#8E9AA8")) + (fin > .02 ? `<ellipse cx="${FIN[0][0]}" cy="${FIN[0][1]}" rx="290" ry="170" fill="${GOODC}" opacity="${n2(.4 * fin * (.7 + .3 * Math.sin(t * 4)))}" filter="url(#b10)"/>` : "")
    + (hb ? stick + band : band + stick) + hands + lensB + lensS + lcAdult(t, LT(a) - .2, "An adult does the test.", "Just watch!") + lcSlow(t, LT(a) + .3)
    + (t >= tNc + .3 && t < tSw ? TF(440, -52, spring(t, tNc + .3, .4) * (1 - ramp(t, tSw - .1, .2)), tpill(0, 0, "no crack", 46, GOODC, "#fff", { w: 700 })) : "")
    + (t >= tSw + .7 ? TF(lerp(REST[0][0] - 330, FIN[0][0], fin), lerp(REST[0][1] + 4, FIN[0][1] - 170, fin), spring(t, tSw + .7, .4), tpill(0, 0, "no crack", 42, GOODC, "#fff", { w: 700 })) : "")
    + (t >= tBk + .5 ? TF(lerp(REST[1][0], FIN[1][0], fin), lerp(REST[1][1] - 100, FIN[1][1] - 150, fin), spring(t, tBk + .5, .4), tpill(0, 0, "It breaks", 42, WEAKC, "#fff", { w: 700 })) : ""); }

/* ---------- 5 · three tubes, the same length and thickness, each clamped at one end with the same weight on the free end ---------- */
const TUBES = [["rubber", -650, 62], ["plastic", -140, 20], ["metal", 370, 2.5]];
function tubesArt(t) { const a = "j901", b = "j902", LV = -122, L = 330, tT = W(a, "three") - .2, tWt = [W(a, "same") - .1, W(a, "same") + .3, W(a, "same") + .6], tMo = W(a, "most") - .5, tLe = W(a, "least") - .5, tS = LT(b) - .35, tv = MK("v_tubes");
  const hi = [Math.max(pulse(t, W(b, "rubber") - .05, .08, 1.2), 0), Math.max(pulse(t, W(b, "plastic") - .05, .08, 1.0), pulse(t, W(b, "plastic", 1) - .05, .08, 1.2)), pulse(t, W(b, "metal") - .05, .08, 1.2)]; let s = "";
  TUBES.forEach(([kind, x, dmax], i) => { const k = t >= tWt[i] ? spring(t, tWt[i] + .05, .9) : 0, deg = dmax * k, tb = tubeSvg(kind, L, deg), ex = x + tb.end[0], ey = LV + tb.end[1], hu = (t - tWt[i] + .35) / .35;
    s += (hi[i] > .05 ? `<ellipse cx="${n2(x + L * .45)}" cy="${n2(LV + tb.end[1] * .5)}" rx="${L * .62}" ry="${n2(70 + tb.end[1] * .5)}" fill="${P.sun}" opacity="${n2(.4 * hi[i])}" filter="url(#b30)"/>` : "")
      + TF(x, LV, 1, tubeClamp(262 - LV) + tb.svg) + TF(x - 48, LV + 92, spring(t, tT + .15 + i * .15, .4), tpill(0, 0, kind, 38, "#fff", P.ink, { w: 700 }))
      + (t >= tWt[i] - .35 ? TF(ex - 14 * Math.sin(deg * Math.PI / 180), ey + 10 - 160 * (1 - eo(hu)), 1, hookWeight()) : "")
      + (hu > 0 && hu < 2.2 ? TF(ex + 18, ey + 60 - 160 * (1 - eo(hu)) - 300 * ei((hu - 1.1) / .9), 1, glovePinch(hu > 1 ? 1 : 0), -35) : "")
      + (k > .5 && tb.end[1] > 14 ? `<path d="M${n2(x + L)} ${LV} V${n2(ey)}" stroke="${P.ink}" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round" opacity=".55"/><path d="M${n2(x + L - 14)} ${n2(ey)} h28" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" opacity=".55"/>` : ""); });
  return `<rect x="-900" y="262" width="1800" height="200" fill="#A8743C"/><path d="M-900 262 H900" stroke="#7A4C26" stroke-width="5"/><path d="M-810 ${LV} H800" stroke="${P.ink2}" stroke-width="4" stroke-dasharray="14 12" opacity=".45"/>` + s
    + (t >= tT + .5 && t < tS ? TF(0, -300, spring(t, tT + .5, .4) * (1 - ramp(t, tS - .25, .2)), tpill(0, 0, "same length · same thickness", 44, P.ink, "#fff", { w: 700 })) : "")
    + lcLab(t, tMo, -530, 205, "bends the most", -470, 60, { size: 42, t1: tv - .15 }) + lcLab(t, tLe, 590, 20, "bends the least", 650, -100, { size: 42, t1: tv - .15 }); }
