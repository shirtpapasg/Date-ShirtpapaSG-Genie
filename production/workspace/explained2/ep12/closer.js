// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js, EP11's five in ep11/closer.js, as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP12 scenes (script.py): Part 1 lcjob (a trolley doing its job), lcmetal (the loaded metal trolley: straight bars, the knock), lctank (the
// glass fish tank) · Part 2 lcbottles (three bottles, the tick table), lccar (the car, part by part). They are in SHELF_HIDE (lib.js). EP12
// Stage 1 wires them with lcPH (tests.js): the real lookCloser frame with a placeholder art(); Stage 2 draws each art(t) (and its set) and
// keeps the frame. EP11's five arts are in ep11/closer.js (models: the side view, the swing round, the split, the verdict pills).
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
   EP12 STAGE 2: the five look-closer pictures. Each art(t) is centred on (0, 0) inside +-830 x +-395 (the top 110 px are kept for the book's
   strip, the bottom 80 px for the verdict). No buddy, no score, no hidden animal inside the window.
   ==================================================================================================================================== */
const LOADED = { rice: 0, bot: [0, 0, 0, 0], tins: [0, 0, 0] };
const lcWall = (gy = 290) => `<rect x="-900" y="-420" width="1800" height="840" fill="#FFF1D6"/><rect x="-900" y="${gy}" width="1800" height="200" fill="#DCCBAA"/><path d="M-900 ${gy} H900" stroke="#B9A684" stroke-width="5"/>${[-700, -420, -140, 140, 420, 700].map((x) => `<path d="M${x} ${gy} l${x * .12} 130" stroke="#B9A684" stroke-width="3" opacity=".6"/>`).join("")}`;
// a thing that is lowered in and lands exactly at t0 (dy = how far above its place it still is)
const dropDy = (t, t0, h = 300, d = .45) => t < t0 - d ? undefined : t >= t0 ? 0 : -h * (1 - ei((t - (t0 - d)) / d));

/* 1 · lcjob: a trolley doing its job. The sack RICE 10 kg lands AT `rice` (the trolley dips on its wheels), four bottles from `bottles`
   (.18 s apart), tins from `tins` (.2 s apart); three plain labels; a hand takes the handle and pushes from `push` to `stop` */
function jobArt(t) { const S = 2.15, GY = 300, tr = MK("rice"), tb = MK("bottles"), tt = MK("tins"), tp = MK("push"), ts = MK("stop"), X0 = -330, X1 = 150;
  const u = eio((t - tp) / (ts - tp)), x = lerp(X0, X1, u), rot = (x - X0) / (17 * S) * 57.3;
  const load = { rice: dropDy(t, tr, 330, .5), bot: [0, 1, 2, 3].map((i) => dropDy(t, tb + i * .18, 260, .3)), tins: [0, 1, 2].map((i) => dropDy(t, tt + i * .2, 220, .28)) };
  const dip = t < tr ? 0 : 3 + 9 * wob(t, tr, .5) + 3 * pulse(t, tb, .02, .3) + 2 * pulse(t, tt, .02, .3);
  // the hands: lowering the sack (until it lands), then one hand on the handle for the push
  const sy = load.rice === undefined ? -999 : GY + S * (-196 + load.rice), up = ramp(t, tr + .1, .4), hs = t < tr - .5 ? "" : OP(1 - ramp(t, tr + .3, .3), aHand(x - 110, sy - 200 * up, 90, 1.3) + aHand(x + 20, sy - 200 * up, 90, 1.3));
  const hk = ramp(t, tp - .55, .4) * (1 - ramp(t, ts + .5, .4)), hp = hk < .02 ? "" : aHand(x - 188 * S - 160 * (1 - hk), GY - 270 * S, 8, 1.4);
  const tl = tt + 1.0, t1 = tp - .3, bx = x, lab = lcLab(t, tl, -330, -340, "handle: to push", bx - 170 * S, GY - 268 * S, { size: 40, t1 }) + lcLab(t, tl + .25, 440, -200, "basket: holds the groceries", bx + 60 * S, GY - 200 * S, { size: 40, t1 }) + lcLab(t, tl + .5, 420, 200, "wheels: roll", bx + 78 * S + 30, GY - 30, { size: 40, t1 });
  const lines = u > .02 && u < .98 ? [0, 1, 2].map((i) => `<path d="M${n2(x - 420 - i * 60)} ${GY - 120 - i * 90} h${-70 - i * 20}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${n2(.8 * Math.sin(Math.PI * u))}"/>`).join("") : "";
  return lcWall(GY) + `<ellipse cx="${n2(x)}" cy="${GY + 4}" rx="${200 * S * .6}" ry="16" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + lines + TF(x, GY, S, trolleyS({ load, dip, rot })) + hs + hp + lab; }

/* 2 · lcmetal: the loaded metal trolley. bars / line: the bottom bars before and after, side by side, along ONE plain straight guide line;
   pullbk: the whole trolley and the bay; clang: the knock (AT the mark), a small bounce back; slowmo: once more, slowly; closeup: where metal
   met metal: smooth, whole. No dent, no crack, no sparks. The word "rigid" is never used. */
const barPanel = (t, x, title, sack, kLine) => { const w = 700, h = 430; let rods = ""; for (let i = 0; i < 9; i++) rods += `<circle cx="${-300 + i * 75}" cy="96" r="13" fill="url(#wSteel)" stroke="${METD}" stroke-width="4"/>`; let up = ""; for (let i = 0; i < 9; i++) up += `<path d="M${-300 + i * 75} 70 V-220" stroke="${MET}" stroke-width="7" opacity=".55"/>`;
  return TF(x, 20, 1, `<clipPath id="bp${sack ? 1 : 0}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26"/></clipPath><g filter="url(#dropS)"><rect x="${-w / 2 - 8}" y="${-h / 2 - 8}" width="${w + 16}" height="${h + 16}" rx="32" fill="#fff"/></g><g clip-path="url(#bp${sack ? 1 : 0})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#F3E6CC"/>${up}
      ${sack ? `<path d="M-250 70 Q-290 -40 -250 -230 H250 Q290 -40 250 70 Q0 84 -250 70z" fill="#FFF6DE" stroke="#C9A772" stroke-width="7"/><path d="M-262 -150 H262" stroke="#E8604E" stroke-width="12"/>${T(0, -30, "RICE", 96, "#C4502E", { ls: 6 })}${T(0, 30, "10 kg", 40, "#8A6A3A", { w: 600 })}` : ""}
      <rect x="-360" y="70" width="720" height="28" rx="14" fill="url(#wSteel)" stroke="${METD}" stroke-width="5"/><path d="M-340 78 H340" stroke="#fff" stroke-width="5" opacity=".8"/>${rods}
      ${kLine > .01 ? `<path d="M-330 136 H${n2(-330 + 660 * kLine)}" stroke="${P.coral}" stroke-width="7" stroke-dasharray="22 12"/>` : ""}</g>`
    + TF(0, -h / 2 - 2, 1, tpill(0, 0, title, 36, P.ink, "#fff", { w: 700 }))); };
function metalArt(t) { const tB = MK("bars"), tL = MK("line"), tP = MK("pullbk"), tC = MK("clang"), tS = MK("slowmo"), tU = MK("closeup"), tV = MK("v_metal"), GY = 290, XC = -40, S = 1.5, L = "g804";
  if (t < tB) { const u = eio((t - (tB - 2.6)) / 2.2), z = lerp(1.7, 3.6, u); return lcWall(292) + `<g transform="translate(0 ${n2(lerp(292, 300 + 98 * z, u))}) scale(${n2(z)})">${trolleyS({ load: LOADED, dip: 3 })}</g>`; }
  if (t < tP) { const kl = eo((t - tL) / .7), a = ramp(t, tB, .3) * (1 - ramp(t, tP - .25, .25));
    return lcWall(292) + OP(a, barPanel(t, -400, "basket empty", false, kl) + barPanel(t, 400, "with the heavy sack", true, kl)
      + (t >= tB + .4 ? pline(0, -150, -200, 100, ramp(t, tB + .4, .2)) + pline(0, -150, 200, 100, ramp(t, tB + .4, .2)) + TF(0, -150, spring(t, tB + .4, .4), tpill(0, 0, "metal bars", 40, "#fff", P.ink, { w: 700 })) : "")
      + (t >= tL + .5 ? TF(0, 262, spring(t, tL + .5, .4), tpill(0, 0, "still straight", 44, P.ink, "#fff", { w: 700 })) : "")); }
  // the wide view: the bay on the right, the loaded trolley pushed in at walking pace; XC = where its middle is when its front meets the last trolley
  const slow = t >= tS, t0 = slow ? tS + .8 : tC, tm = slow ? (t - t0) / 2.4 : t - t0;   // tm = time since the knock (slow motion: 2.4 x slower)
  const xa = slow ? XC - 190 * clamp((t0 - t) / .8) : XC - 190 * (tC - t), x = tm < 0 ? Math.max(-640, xa) : XC - 18 * Math.sin(Math.PI * clamp(tm / .5)) * Math.exp(-tm * 1.2) - 6 * (1 - Math.exp(-tm * 3));
  const rat = tm < 0 ? 0 : 6 * Math.exp(-tm * 3) * Math.cos(tm * 34), close = ss(tU, tU + .6, t), CX = XC + 150 * S, CY = GY - 170 * S;
  const wide = lcWall(GY) + TF(690, GY, .78, baySign()) + TF(CX + 26 * S, GY, S, bayRow(2))
    + `<ellipse cx="${n2(x)}" cy="${GY + 4}" rx="230" ry="14" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(x, GY, S, trolleyS({ load: LOADED, dip: 3, rot: x * 2.3, rat })) + (tm < .5 || (slow && t < tU) ? aHand(x - 188 * S, GY - 270 * S, 8, 1.1) : OP(1 - ramp(t, t0 + .5, .3), aHand(x - 188 * S - 60 * ramp(t, t0 + .5, .3), GY - 270 * S, 8, 1.1)));
  const view = wide;
  // the close-up: where metal met metal (the front of our basket against the back bar of the next one): smooth and whole
  const cu = close < .02 ? "" : OP(close, `<rect x="-900" y="-420" width="1800" height="840" fill="${P.night}" opacity=".45"/>` + pline(420, -40, CX - 20, CY + 60, close) + TF(470, -60, .6 + .4 * close, `<clipPath id="mcu"><circle r="250"/></clipPath><g filter="url(#drop)"><circle r="262" fill="#fff"/></g><g clip-path="url(#mcu)"><rect x="-260" y="-260" width="520" height="520" fill="#F3E6CC"/>
      <rect x="-300" y="-60" width="300" height="120" rx="60" fill="url(#wSteel)" stroke="${METD}" stroke-width="8"/><path d="M-280 -28 H-40" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".85"/>
      <rect x="-4" y="-300" width="120" height="600" rx="50" fill="url(#wSteelH)" stroke="${METD}" stroke-width="8"/><path d="M30 -240 V240" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".8"/>${lcGlint(-30, -70, 30, t)}${lcGlint(84, 110, 22, t, 2)}</g><circle r="250" fill="none" stroke="${P.ink}" stroke-width="10"/>`)
      + lcLab(t, tU + .5, -420, -260, "a hard knock", 440, -60, { size: 42 }) + (t >= W(L, "no") - .1 ? TF(-580, -160, spring(t, W(L, "no") - .1, .4), tpill(0, 0, "no crack", 44, "#fff", P.ink, { w: 700 })) : "") + (t >= W(L, "no", 1) - .1 ? TF(-320, -160, spring(t, W(L, "no", 1) - .1, .4), tpill(0, 0, "no break", 44, "#fff", P.ink, { w: 700 })) : "")
      + chipAt(t, W(L, "strong") - .1, 470, 230, "STRONG", 44)
      + (t >= tV - .5 ? picBoard("trMetal", -560, 130, spring(t, tV - .5, .45), { sc: .66, id: "lcm" }) + (t >= MK("goodtag") ? TF(-560, 10 - 60 * (1 - eo((t - MK("goodtag")) / .25)), spring(t, MK("goodtag"), .45), jobTag(t, 0, 26)) : "") : ""));
  return OP(ramp(t, tP - .05, .3), view) + (slow && t < tU + .3 ? OP(1 - ramp(t, tU, .3), slowTag(t, tS)) : "") + cu; }

/* 3 · lctank: the planted glass tank fills the window. lens: a magnifier holds on one fish (sharp: fan tail, eye, fins); glide: the camera
   glides down the glass to the bottom edge and the stand's shelf; dry: dry wood, no drip. Nobody taps. */
function tankArt(t) { const S = 1.5, FY = 470, tLn = MK("lens"), tG = MK("glide"), tD = MK("dry"), back = LT("g1104") - .3, g = eio((t - tG) / 2.0) * (1 - eio((t - back) / 1.0)), z = 1 + .4 * g, ty = lerp(0, 60 - (FY - 220 * S) * 1.4, g);
  const [fx, fy] = guppyAt(0, t), mx = fx * S, my = FY + fy * S, lk = ramp(t, tLn, .35) * (1 - ramp(t, tG - .2, .3));
  const lens = lk < .02 ? "" : OP(lk, `<path d="M${n2(mx + 105)} ${n2(my + 105)} l80 80" stroke="${P.ink}" stroke-width="26" stroke-linecap="round"/><clipPath id="tkl"><circle cx="${n2(mx)}" cy="${n2(my)}" r="140"/></clipPath><g clip-path="url(#tkl)"><rect x="${n2(mx - 150)}" y="${n2(my - 150)}" width="300" height="300" fill="#BFEAFB"/><g transform="translate(${n2(mx)} ${n2(my)}) scale(${4.2 * guppyAt(0, t)[2]} 4.2) translate(8 0)">${guppy(0, t)}</g></g><circle cx="${n2(mx)}" cy="${n2(my)}" r="140" fill="none" stroke="${P.ink}" stroke-width="12"/><circle cx="${n2(mx)}" cy="${n2(my)}" r="140" fill="none" stroke="${P.sun}" stroke-width="5"/>`);
  const tA = W("g1101", "glass") - .1, tE = W("g1102", "every") - .2, tT = W("g1102", "transparent") - .1, tW = W("g1103", "waterproof") - .1, a1 = { size: 40, t1: tG - .2 };
  const dryMark = t >= tD ? OP(ramp(t, tD, .3), `<g transform="translate(0 ${FY - 205 * S})">${[-200, -60, 80, 220].map((x, i) => `<g transform="translate(${x} 0) scale(${n2(.6 + .4 * Math.sin(t * 3 + i))})"><path d="M0 -12 Q2 -2 12 0 Q2 2 0 12 Q-2 2 -12 0 Q-2 -2 0 -12z" fill="#fff"/></g>`).join("")}</g>`) : "";
  const scene = lcWall(FY) + `<rect x="-900" y="-420" width="1800" height="${FY + 420}" fill="#E6F6FF"/><path d="M-900 ${FY} H900" stroke="#B9A684" stroke-width="5"/>` + TF(0, FY, S, tankSvg(t, { id: "lc" })) + dryMark;
  return `<g transform="translate(0 ${n2(ty)}) scale(${n2(z)})">${scene}${lens}</g>`
    + lcLab(t, tA, -620, 40, "glass", -258 * S, 40, a1) + lcLab(t, tE, -590, -250, "We see every fish clearly", -250, -150, { size: 36, t1: tG - .2 }) + OP(1 - ramp(t, tG - .2, .25) * (1 - ramp(t, MK("v_tank") - .6, .3)), chipAt(t, tT, -610, 180, "TRANSPARENT", 40))
    + lcLab(t, tD - .9, -620, -220, "full of water", -300, -120, { size: 40, t1: back }) + lcLab(t, tD + .1, 560, 250, "the shelf: dry", 300, 86, { size: 42, t1: back }) + OP(1 - ramp(t, back, .25) * (1 - ramp(t, MK("v_tank") - .6, .3)), chipAt(t, tW, 620, t < MK("v_tank") - .6 ? -160 : 180, "WATERPROOF", 40)); }
