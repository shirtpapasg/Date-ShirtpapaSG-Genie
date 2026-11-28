// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP11 scenes (script.py): Part 1 lcclear, lcfrost · Part 2 lcdoor, lcthree, lcbox. They are in SHELF_HIDE (lib.js). EP11 Stage 1 wires them
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
const lcVerdict = (t, tv, txt, col, o = {}) => { if (tv === undefined || t < tv) return ""; const vx = o.vx || 960, w = tw(o.plain || txt, 70, 700, "Fredoka", 2) + 190, f = Math.min(1, 1600 / w), u = t - tv, k = (lerp(2.3, 1, eo(u / .16)) + .06 * wob(t, tv + .16, .45)) * f;   // EP9: a long verdict is drawn smaller so it fits the window. EP10: o.plain = the words without markup (for measuring), o.vx = its centre
  return (u < .5 ? `<circle cx="${vx}" cy="${LCW.y + LCW.h / 2}" r="${n2(160 + 700 * eo(u / .5))}" fill="none" stroke="${P.sun}" stroke-width="${n2(18 * (1 - u / .5))}" opacity="${n2(1 - u / .5)}"/>` : "")
    + TF(vx, LCW.y + LCW.h / 2 - 4, k, `<g transform="rotate(-1.5)"><g filter="url(#drop)"><rect x="${n2(-w / 2)}" y="-64" width="${n2(w)}" height="128" rx="64" fill="${col}"${o.edge ? ` stroke="${o.edge}" stroke-width="9"` : ""}/><rect x="${n2(-w / 2 + 9)}" y="-55" width="${n2(w - 18)}" height="110" rx="55" fill="none" stroke="${o.edge || "#fff"}" stroke-width="${o.edge ? 3 : 6}" opacity=".9"/></g>
      <g transform="translate(${n2(-w / 2 + 66)} 0)">${tickBadge(34)}</g>${T(40, 25, txt, 70, o.ink || "#fff", { ls: 2 })}</g>`); };   // EP11: o.ink / o.edge for the white NO LIGHT tag (dark-violet letters and border)
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
  return out + (o.over ? OP(op, o.over(t)) : "") + lcTag(t, tz + .1) + lcVerdict(t, o.tv, o.verdict[0], o.verdict[1], o.verdict[2] || {}) + logo(t); }
// the book's sentence inside the close-up (the cream strip at the top of the window)
const lcStrip = (t, id, text, o = {}) => bookCaption(t, id, text, 262, { size: 50, ...o });
// small helpers for the pictures
const lcFlame = (x, y, k, t, ph = 0) => k < .03 ? "" : TF(x, y, k, `<path d="M0 0 Q-34 -30 -16 -70 Q-10 -40 0 -${n2(108 + 14 * Math.sin(t * 13 + ph))} Q10 -40 18 -66 Q34 -30 0 0z" fill="#FF8A1E"/><path d="M0 -2 Q-18 -22 -6 -50 Q0 -30 2 -${n2(70 + 10 * Math.sin(t * 17 + ph))} Q12 -26 0 -2z" fill="#FFD75A"/>`);
const lcBricks = (x0, y0, w, h, bw = 74, bh = 40, a = "#B8543A", b = "#A8482E") => { let s = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#7A3220"/>`; for (let r = 0; r * bh < h; r++) for (let c = -1; c * bw < w; c++) { const x = x0 + c * bw + (r % 2) * bw / 2, y = y0 + r * bh; s += `<rect x="${x + 3}" y="${y + 3}" width="${bw - 6}" height="${bh - 6}" rx="4" fill="${(r * 3 + c) % 4 ? a : b}"/>`; } return s; };
const lcGlint = (x, y, r, t, ph = 0) => { const k = .35 + .65 * Math.max(0, Math.sin(t * 3.4 + ph)); return `<g transform="translate(${x} ${y}) scale(${n2(k)}) rotate(${n2(20 * Math.sin(t + ph))})"><path d="M0 -${r} Q${r * .16} -${r * .16} ${r} 0 Q${r * .16} ${r * .16} 0 ${r} Q-${r * .16} ${r * .16} -${r} 0 Q-${r * .16} -${r * .16} 0 -${r}z" fill="#fff"/></g>`; };
const lcStep = (x, y, n, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><circle r="34" fill="url(#gSun)"/></g>${T(0, 17, n, 48, P.ink)}`);
// "speeded up" inside the window, with a little clock whose hand spins
const lcClock = (t, t0, t1, x, y) => OP(ramp(t, t0, .25) * (1 - ramp(t, t1, .25)), `<g transform="translate(${x} ${y})"><g filter="url(#dropS)"><rect x="-190" y="-40" width="380" height="80" rx="40" fill="${P.ink}"/></g><circle cx="-146" cy="0" r="27" fill="#fff"/><path d="M-146 0 L${n2(-146 + 19 * Math.sin((t - t0) * 7))} ${n2(-19 * Math.cos((t - t0) * 7))}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M-146 0 L${n2(-146 + 12 * Math.sin((t - t0) * .6))} ${n2(-12 * Math.cos((t - t0) * .6))}" stroke="${P.coral}" stroke-width="5" stroke-linecap="round"/>${T(32, 14, "speeded up", 40, "#fff", { w: 600 })}</g>`);
// a small "slow motion" tag inside the window (EP10)
const slowTag = (t, t0, x = 668, y = -350) => TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-128" y="-30" width="256" height="60" rx="30" fill="${P.ink}"/></g><path d="M-98 -11 l14 11 l-14 11z" fill="${P.sun}"/>${T(16, 12, "slow motion", 32, "#fff", { w: 600 })}`);

/* ====================================================================================================================================
   EP11 STAGE 2: the five look-closer pictures. Each is the torch test seen large from the side (flat.js rig()), in a dim room so the
   soft pale beam shows, with every action on its own timeline mark (the sound sits on the same mark); then, with the torch OFF, an
   adult's hand sets the robot behind the sheet and the camera swings round to look straight through it (frontView()).
   NO SHADOW anywhere: the robot is behind a see-through sheet only while the torch is off.
   ==================================================================================================================================== */
const AR = 1.4, ARX = 20, ARY = 237, LCBG = "#3F3768", LCBGN = "#35315F";
const ap = (ac, rx, ry) => [(ARX + rx * AR - ac[1]) * ac[0], (ARY + ry * AR - ac[2]) * ac[0]];
const artSide = (t, ro, ac, dim, night) => `<g transform="scale(${n2(ac[0])}) translate(${n2(-ac[1])} ${n2(-ac[2])})">${roomBack(3000, 790, dim, night)}${TF(ARX, ARY, AR, rig(t, { night, ...ro, dim }))}</g>`;
const artFront = (t, kind, dim, night, o = {}) => roomBack(3000, 790, dim, night) + TF(0, ARY + 60, 1.22, frontView(kind, t, o));
// the camera swings round (a quick turn about the upright axis)
const swing = (t, t0, a, b) => { const u = (t - t0) / .5; return u <= 0 ? a() : u >= 1 ? b() : u < .5 ? `<g transform="scale(${n2(1 - 2 * u)} 1)">${a()}</g>` : `<g transform="scale(${n2(2 * u - 1)} 1)">${b()}</g>`; };
// before and after, side by side: two tests with the same torch (the left one a held picture). kinds, tags; dim; k = the tags' pop
const splitPic = (t, kinds, tags, dim, night, k = 1, id = "sp", sc = .8) => [0, 1].map((i) => { const x = i ? 415 : -415; return `<clipPath id="${id}${i}"><rect x="${x - 415}" y="-395" width="830" height="790"/></clipPath><g clip-path="url(#${id}${i})">${roomBack(3000, 790, dim, night)}${TF(x + 28, ARY, sc, rig(t, { sheet: kinds[i], on: 1, dim, id: id + "r" + i }))}</g>` + TF(x, -236, k, tpill(0, 0, tags[i], 38, "#fff", P.ink, { w: 700 })); }).join("") + `<path d="M0 -395 V395" stroke="#FFF8EA" stroke-width="12"/>`;
// a verdict in clear parts: pills in the three answer styles (k = 0 green, 1 blue, 2 white with a dark border, -1 plain dark), landing one after another
function verdictPills(t, tv, parts, size = 56) { if (tv === undefined || t < tv) return ""; const gap = 20, ws = parts.map(([x]) => tw(x, size, 700, "Fredoka", 2) + size * 1.3), tot = ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1) + 92, f = Math.min(1, 1560 / tot), u0 = t - tv; let x = -tot / 2 + 92, out = "";
  parts.forEach(([txt, k], i) => { const u = t - tv - i * .14, kk = u <= 0 ? 0 : lerp(2.2, 1, eo(u / .16)) + .06 * wob(t, tv + i * .14 + .16, .45);
    if (kk) out += TF(x + ws[i] / 2, 0, kk, k < 0 ? `<g filter="url(#dropS)"><rect x="${n2(-ws[i] / 2)}" y="${n2(-size * .75)}" width="${n2(ws[i])}" height="${n2(size * 1.5)}" rx="${n2(size * .75)}" fill="${P.ink}"/></g>` + T(0, n2(size * .35), txt, size, "#fff", { ls: 2 }) : ansTag(txt, k, size)); x += ws[i] + gap; });
  return (u0 < .5 ? `<circle cx="960" cy="${LCW.y + LCW.h / 2}" r="${n2(160 + 700 * eo(u0 / .5))}" fill="none" stroke="${P.sun}" stroke-width="${n2(18 * (1 - u0 / .5))}" opacity="${n2(1 - u0 / .5)}"/>` : "") + TF(960, LCW.y + LCW.h / 2 - 4, f, `<g transform="rotate(-1.5)">${TF(-tot / 2 + 40, 0, spring(t, tv, .4), tickBadge(34))}${out}</g>`); }
const LL = (t, ac, t0, x, y, txt, rx, ry, t1) => { const [px, py] = ap(ac, rx, ry); return lcLab(t, t0, x, y, txt, px, py, { t1, size: 40 }); };

/* Part 1 · the torch on clear glass: the beam goes in and out, a bright spot with a clean edge; then the robot, sharp */
function clearArt(t) { const on1 = MK("on1"), sp = MK("spot1"), off = MK("off1"), rb = MK("robot1"), on = t >= on1 && t < off, e = eio((t - (sp - 1.0)) / .8), ac = [lerp(1.2, 1, e), lerp(-250, 0, e), lerp(50, 0, e)], dim = lerp(.85, .4, ss(off, off + .6, t)), tS = rb + 1.15;
  const side = () => artSide(t, { sheet: "clear", on, id: "lca", ring: pulse(t, sp + .1, .02, .6), finger: pressAny(t, on1, off), robot: t >= rb ? { hand: setHand(t, rb, .6) } : 0 }, ac, dim);
  return swing(t, tS, side, () => artFront(t, "clear", dim)) + LL(t, ac, W("g602", "goes") - .1, -330, -250, "the light goes in", -190, AX, sp - 1.0) + LL(t, ac, W("g602", "out") - .1, 470, -250, "the light comes out", 150, AX, sp - 1.0)
    + LL(t, ac, sp + .2, 300, -236, "a bright spot", CARDX - 8, AX - 20, off) + (t >= tS + .5 ? lcLab(t, W("g604", "clearly") - .25, 540, -150, "We see it clearly", 150, -40, { size: 40 }) : ""); }
/* Part 1 · the torch on frosted glass: the sheet itself glows, only a wide soft glow on the card; beside the clear glass; the robot a blur */
function frostArt(t) { const on2 = MK("on2"), gl = MK("glow2"), sp = MK("split"), off = MK("off2"), rb = MK("robot2"), on = t >= on2 && t < off, e = eio((t - (gl - .9)) / .8), ac = [lerp(1.2, 1, e), lerp(-250, 0, e), lerp(50, 0, e)], dim = lerp(.85, .4, ss(off, off + .6, t)), tS = rb + 1.15, s1 = off - .45, spl = t >= sp && t < s1;
  const side = () => artSide(t, { sheet: "frost", on, id: "lcf", finger: pressAny(t, on2, off), robot: t >= rb ? { hand: setHand(t, rb, .6) } : 0 }, ac, dim);
  return (spl ? splitPic(t, ["clear", "frost"], ["clear glass · a bright spot", "frosted glass · a soft glow"], .85, false, spring(t, sp + .25, .4), "lcs") : swing(t, tS, side, () => artFront(t, "frost", dim, false, { id: "lcff" })))
    + dipIn(t, sp) + dipIn(t, s1) + (spl || t >= s1 ? "" : LL(t, ac, W("g1002", "goes") - .1, -330, -250, "the light goes in", -190, AX, gl - .9) + LL(t, ac, gl + .15, 300, -236, "a soft, dim glow", CARDX - 8, AX - 30, sp))
    + (t >= tS + .5 ? lcLab(t, W("g1004", "blurry") - .15, 540, -150, "a blurry shape", 120, -40, { size: 40 }) : ""); }
const dipIn = (t, tc, d = .22) => { const a = 1 - Math.abs(t - tc) / d; return a <= 0 ? "" : `<rect x="-840" y="-400" width="1680" height="800" fill="#FFF8EA" opacity="${n2(ss(0, 1, a))}"/>`; };
/* Part 2 · the torch on the white wooden door: its front is brightly lit and the beam ENDS there; behind it no spot and no glow; the robot
   is still behind it (an adult's hand lifts the door for a moment) */
function doorArt(t) { const on3 = MK("on3"), bh = MK("behind"), off = MK("off3"), lf = MK("lift"), on = t >= on3 && t < off, e = eio((t - bh) / 1.4) * (1 - eio((t - off) / .5)), ac = [lerp(1.06, 1.3, e), lerp(-110, 330, e), lerp(20, 40, e)], dim = lerp(.8, .4, ss(off, off + .6, t)), tS = off + .7, up = ss(lf, lf + .4, t) * (1 - ss(lf + .9, lf + 1.3, t));
  const side = () => artSide(t, { sheet: "door", on, id: "lcd", finger: pressAny(t, on3, off), robot: 1 }, ac, dim, true);
  return swing(t, tS, side, () => artFront(t, "door", dim, true, { lift: up })) + LL(t, ac, W("j501", "front") - .1, -360, -250, "the front is bright", -14, AX - 50, bh)
    + LL(t, ac, W("j502", "no") - .1, 600, -210, "no bright spot", CARDX + 10, AX - 40, off) + LL(t, ac, W("j502", "no", 1) - .1, 610, 110, "no glow", CARDX + 14, AX + 60, off)
    + (t >= tS + .5 && (t < lf - .1 || t >= lf + 1.4) ? lcLab(t, t < lf ? tS + .7 : lf + 1.4, 560, -170, "We cannot see the robot", 120, -40, { size: 40 }) : ""); }
/* Part 2 · three sheets, the same torch, three cards: a bright spot, a soft glow, nothing. How much light? */
function threeArt(t) { const c = [MK("c1"), MK("c2"), MK("c3")], br = MK("bracket"), s0 = SCN.lcthree.t0, kinds = ["clear", "frost", "door"], tags = ["clear glass", "frosted glass", "wooden door"], caps = ["a bright spot", "a soft glow", "no spot, no glow"], Y = [-90, 94, 278];
  let s = `<rect x="-840" y="-400" width="1680" height="800" fill="${LCBGN}"/>` + Y.map((y) => `<rect x="-840" y="${y - 8}" width="1680" height="44" fill="#77719A" opacity=".55"/>`).join("");
  kinds.forEach((k, i) => { const a = lerp(.55, 1, ss(c[i] - .2, c[i] + .1, t)), p = pulse(t, c[i], .03, .8);
    s += OP(a, TF(-150, Y[i], .5, rig(t, { sheet: k, on: 1, dim: .85, night: true, id: "l3" + i }))) + (p > .02 ? `<ellipse cx="38" cy="${Y[i] - 84}" rx="${n2(52 + 40 * (1 - p))}" ry="${n2(84 + 40 * (1 - p))}" fill="none" stroke="${P.sun}" stroke-width="${n2(7 * p + 1)}" opacity="${n2(p)}"/>` : "")
      + lcLab(t, s0 + 1.2 + i * .35, -620, Y[i] - 84, tags[i], -196, Y[i] - 84, { size: 36 }) + (t >= c[i] ? TF(246, Y[i] - 84, spring(t, c[i] + .05, .4), tpill(0, 0, caps[i], 32, "#fff", P.ink, { w: 700 })) : ""); });
  if (t >= br) { const k = ramp(t, br, .5), y0 = Y[0] - 170, y1 = Y[2] + 2; s += `<path d="M392 ${y0} h24 V${n2(lerp(y0, y1, k))}${k >= 1 ? " h-24" : ""}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` + TF(622, 10, spring(t, br + .35, .45), tpill(0, 0, "How much light?", 36, P.sun, P.ink, { w: 700 })); }
  return s; }
/* Part 2 · two plastic lunch boxes, the same torch, the same place: the clear one gives a bright spot, the cloudy one a soft glow */
function boxArt(t) { const s0 = SCN.lcbox.t0, on4 = MK("on4"), sw = MK("swap"), sp = MK("split2"), on = t >= on4, st = t < sw ? { sheet: "boxC", hand: setHand(t, s0 - .05, .55) } : swapSheet(t, sw, "boxC", "boxF", .3, 1.0), ac = [1, 0, 0], spl = t >= sp, busy = t >= sw - .1 && t < sw + 1.2;
  if (spl) return splitPic(t, ["boxC", "boxF"], ["plastic · a bright spot", "plastic · a soft glow"], .8, true, spring(t, sp + .25, .4), "lcx") + dipIn(t, sp);
  return artSide(t, { ...st, on, id: "lcb", ring: pulse(t, on4 + .35, .02, .6), finger: pressAny(t, on4) }, ac, .8, true) + dipIn(t, sp)
    + (busy ? "" : LL(t, ac, t < sw ? s0 + 1.7 : sw + 1.2, 40, -250, "plastic", 6, -246, 1e9)) + LL(t, ac, s0 + 2.3, -520, -236, "same torch · same place", TORX, AX - 34, 1e9)
    + LL(t, ac, W("j1102", "bright") - .1, 520, -236, "a bright spot", CARDX - 8, AX - 20, sw) + LL(t, ac, W("j1103", "soft") - .1, 520, -236, "a soft glow", CARDX - 8, AX - 30, 1e9); }
