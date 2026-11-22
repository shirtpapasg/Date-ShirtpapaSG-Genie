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
  const wide = lcWall(GY) + TF(CX + 26 * S, GY, S, bayRow(2))
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

/* Part 2's three calm recap pictures (Part 1's own drawings, held): the knock in the bay, the fish tank, the three bottles in the trolley */
const recapPic = (i, t) => i === 0 ? lcWall(290) + TF(185 + 39, 290, 1.5, bayRow(2)) + TF(-40, 290, 1.5, trolleyS({ load: LOADED, dip: 3 })) + aHand(-40 - 282, 290 - 405, 8, 1.1)
  : i === 1 ? `<rect x="-900" y="-420" width="1800" height="840" fill="#E6F6FF"/><rect x="-900" y="330" width="1800" height="100" fill="#DCCBAA"/>` + TF(0, 330, 1.25, tankSvg(t, { id: "rc" }))
  : `<rect x="-900" y="-420" width="1800" height="840" fill="#DCCBAA"/>${Array.from({ length: 17 }, (_, k) => `<path d="M${-880 + k * 110} -420 V420" stroke="#B9A684" stroke-width="3" opacity=".5"/>`).join("")}${Array.from({ length: 8 }, (_, k) => `<path d="M-900 ${-390 + k * 110} H900" stroke="#B9A684" stroke-width="3" opacity=".5"/>`).join("")}` + TF(40, 40, 1.5, trolleyTop()) + BKINDS.map((k, j) => TF(40 + 1.5 * (-266 + j * 62), 40 + 156, 1.17, bottleSvg(k, { id: "rc" + j }))).join("");

/* 4 · lcbottles: three bottles (the same height and shape, full, closed) and their tick table, a row at a time. The only thing dropped is the
   closed plastic bottle, from knee height (let go .42 s before `land`; it lands on its side AT the mark). The glass bottle is never dropped. */
const crossBadge = (r = 30) => `<circle r="${r}" fill="#7A869E" stroke="#fff" stroke-width="${n2(r * .16)}"/><path d="M${n2(-r * .38)} ${n2(-r * .38)} L${n2(r * .38)} ${n2(r * .38)} M${n2(r * .38)} ${n2(-r * .38)} L${n2(-r * .38)} ${n2(r * .38)}" stroke="#fff" stroke-width="${n2(r * .26)}" stroke-linecap="round"/>`;
const BROWL = ["WATERPROOF", "SEE THE WATER", "DOES NOT BREAK EASILY"], BCX = [-330, -110, 110], BRY = [76, 144, 212], BSC = 1.05;
// the tick table: tr[r] = when row r's label appears; tm[r][c] = [time, tick (1) or cross (0)] for each mark
const tickTable = (t, tr, tm) => { let s = `<g filter="url(#dropS)"><rect x="-814" y="38" width="1060" height="212" rx="20" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="5"/></g>` + [110, 178].map((y) => `<path d="M-800 ${y} H232" stroke="${P.ink}" stroke-width="2" opacity=".25"/>`).join("") + [-440, -220, 0].map((x) => `<path d="M${x} 48 V240" stroke="${P.ink}" stroke-width="2" opacity=".25"/>`).join("");
  BROWL.forEach((l, r) => { if (t >= tr[r]) s += OP(ramp(t, tr[r], .3), T(-794, BRY[r] + 10, l, r === 2 ? 27 : 30, P.ink, { a: "start", ls: 1 })); tm[r].forEach((m, c) => { if (m && t >= m[0]) s += TF(BCX[c], BRY[r], spring(t, m[0], .35), m[1] ? tickBadge(24) : crossBadge(24)); }); }); return s; };
function bottleArt(t, s) { const tDry = MK("dry"), tK = MK("ticks1"), tBk = MK("backlight"), tS = [MK("see1"), MK("see2"), MK("see3")], tLand = MK("land"), tT3 = MK("tick3"), tRest = MK("rest"), tNo = MK("noglass"), tV = MK("v_bottle"), tJ4 = LT("j504"), tJ6 = LT("j506"), BY = 10, GY = 270, DX = 520;
  const glow = ramp(t, tBk, .6) * (1 - ramp(t, tJ4 - .2, .4));
  // the plastic bottle's trip: table -> held at knee height over the ground -> let go -> lands on its side, bounces once, rolls -> picked up, turned -> back on the table
  const tGo = tLand - .42, tPick = tLand + .75, tBack = tT3 + .5; let px = BCX[0], py = BY, pr = 0, hand = "";
  if (t >= tJ4 + .2 && t < tBack + .7) { const HY = 30;
    if (t < tGo) { const u = eio((t - tJ4 - .2) / .9); px = lerp(BCX[0], DX, u); py = lerp(BY, HY, u) - 120 * Math.sin(Math.PI * u); pr = 90 * eio((t - tJ4 - 1.0) / .7); hand = aHand(px + 20, py - 62, 90, 1.0); }
    else if (t < tLand) { const u = (t - tGo) / .42; px = DX; py = lerp(HY, GY - 42, u * u); pr = 90; hand = aHand(DX + 20, HY - 62 - 30 * clamp(u * 3), 90, 1.0); }
    else if (t < tPick) { const v = t - tLand, b = v < .34 ? 46 * Math.sin(Math.PI * v / .34) : v < .52 ? 12 * Math.sin(Math.PI * (v - .34) / .18) : 0; px = DX + 70 * (1 - Math.exp(-v * 2.6)); py = GY - 42 - b; pr = 90 + 40 * (1 - Math.exp(-v * 2.6)); hand = OP(ramp(t, tPick - .3, .25), aHand(px + 10, py - 50 - 160 * (1 - ramp(t, tPick - .3, .3)), 90, 1.0)); }
    else if (t < tBack) { const u = eio((t - tPick) / .6), x0 = DX + 70 * .86; px = lerp(x0, DX, u); py = lerp(GY - 42, 60, u); pr = lerp(126, 0, u) + 12 * Math.sin((t - tPick - .6) * 5) * ramp(t, tPick + .6, .2); hand = aHand(px + 46, py - 100, 180, 1.0); }
    else { const u = eio((t - tBack) / .7); px = lerp(DX, BCX[0], u); py = lerp(60, BY, u) - 110 * Math.sin(Math.PI * u); hand = OP(1 - ramp(t, tBack + .6, .1), aHand(px + 46, py - 100, 180, 1.0)); } }
  const pb = `<g transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(pr)} 0 -44) scale(${BSC})">${bottleSvg("plastic", { glow, id: "lb0" })}</g>`;
  const best = t >= tV ? `<ellipse cx="${BCX[0]}" cy="${BY - 108}" rx="${n2(92 + 6 * Math.sin(t * 5))}" ry="146" fill="none" stroke="${GOODC}" stroke-width="10" opacity="${n2(ramp(t, tV, .3))}"/>` : "";
  // row 1: the camera's little glide along the table under the bottles: dry
  const gk = ramp(t, tDry - .2, .3) * (1 - ramp(t, tK + 1.0, .3)), gx = lerp(BCX[0] - 40, BCX[2] + 40, eio((t - tDry) / (tK - tDry - .3))), glide = gk < .02 ? "" : OP(gk, `<circle cx="${n2(gx)}" cy="${BY - 4}" r="62" fill="#fff" opacity=".35"/><circle cx="${n2(gx)}" cy="${BY - 4}" r="62" fill="none" stroke="${P.ink}" stroke-width="8"/><path d="M${n2(gx + 44)} ${BY + 40} l44 44" stroke="${P.ink}" stroke-width="16" stroke-linecap="round"/>` + TF(gx, BY + 40 - 130, 1, tpill(0, 0, "dry", 34, "#fff", P.ink, { w: 700 })));
  const seeL = ["the water", "the water", "cannot see inside"].map((l, i) => t < tS[i] ? "" : OP(1 - ramp(t, tJ4 - .3, .3), pline(BCX[i] + (i - 1) * 70, -300, BCX[i], BY - 150, ramp(t, tS[i], .2)) + TF(BCX[i] + (i - 1) * 70, -300, spring(t, tS[i], .4), tpill(0, 0, l, 34, "#fff", P.ink, { w: 700 })))).join("");
  const rest = t >= tRest - .4 ? OP(ramp(t, tRest - .4, .3) * (1 - ramp(t, tJ6 - .5, .3)), aHand(BCX[1], BY - 222 - 120 * (1 - eo((t - (tRest - .4)) / .4)), 90, 1.0)) : "";
  const tm = [[0, 1, 2].map((i) => [tK + i * .3, 1]), [[tS[0], 1], [tS[1], 1], [tS[2], 0]], [[tT3, 1], [MK("xg"), 0], [MK("tm"), 1]]];
  return `<rect x="-900" y="-420" width="1800" height="840" fill="#EAF6FF"/><rect x="-900" y="${GY}" width="1800" height="200" fill="#8D8FA6"/><path d="M-900 ${GY} H900" stroke="#6E7089" stroke-width="5"/>`
    + (glow > .02 ? OP(glow, `<ellipse cx="-110" cy="${BY - 110}" rx="480" ry="190" fill="#FFF7C8" filter="url(#b30)"/>`) : "") + `<rect x="-470" y="${BY}" width="720" height="24" rx="10" fill="#F4F7FB" stroke="#7A869E" stroke-width="5"/>`
    + tickTable(t, [s.t0 + 2.2, tBk - .3, tJ4], tm) + best + TF(BCX[1], BY, BSC, bottleSvg("glass", { glow, id: "lb1" })) + TF(BCX[2], BY, BSC, bottleSvg("metal")) + glide + pb + hand + rest + seeL
    + (t >= tJ4 + 1.0 && t < tBack ? TF(DX + 30, -300, spring(t, tJ4 + 1.0, .4) * (1 - ramp(t, tBack - .3, .25)), tpill(0, 0, t < tLand ? "a drop, from knee height" : t < tT3 ? "it bounces" : "no crack · no leak", 32, "#fff", P.ink, { w: 700 })) : "")
    + (t >= tNo ? TF(BCX[1], BY - 62, spring(t, tNo, .4), tpill(0, 0, GLASS_RULE, 26, P.ink, "#fff", { w: 600 })) : "")
    + (t >= tV + .5 ? TF(560, -120, spring(t, tV + .5, .4), tpill(0, 0, "At home, on a table: glass is fine.", 26, "#fff", P.ink, { w: 700 })) + TF(560, -66, spring(t, tV + .65, .4), tpill(0, 0, "Handle it carefully.", 26, "#fff", P.ink, { w: 700 })) : ""); }
// the three bottles with their finished tick table (the small picture under Mark Sentence 1)
const bottlePic = () => `<rect x="-470" y="10" width="720" height="24" rx="10" fill="#F4F7FB" stroke="#7A869E" stroke-width="5"/>` + tickTable(1e6, [0, 0, 0], [[[0, 1], [0, 1], [0, 1]], [[0, 1], [0, 1], [0, 0]], [[0, 1], [0, 0], [0, 1]]]) + BKINDS.map((k, i) => TF(BCX[i], 10, BSC, bottleSvg(k, { id: "bp" + i }))).join("");

/* 5 · lccar: one car, part by part (each close-up about 6 s): a front tyre and a palm (it does not give); the seats through the open door and
   a hand (the fabric dips and comes back); the windscreen with water running off it, the seats behind sharp and dry; the door panel and two
   knuckle knocks; then the whole car, all four parts lit. Parked, switched off, empty. No accident shown or named. */
const carLab = (t, t0, x, y, part, mat, px, py, t1) => lcLab(t, t0, x, y, part + " · " + mat, px, py, { size: 44, t1 });
function carArt(t) { const tT = MK("tyre"), tPm = MK("palm"), tSe = MK("seats"), tPr = MK("press"), tSc = MK("screen"), tPo = MK("pour"), tBo = MK("body"), tKn = MK("knock"), tAll = MK("allfour");
  const ph = t < tSe ? 0 : t < tSc ? 1 : t < tBo ? 2 : t < tAll ? 3 : 4, t0 = [tT, tSe, tSc, tBo, tAll][ph], a = ph === 0 ? 1 : ramp(t, t0, .35);
  const bgc = `<rect x="-900" y="-420" width="1800" height="840" fill="#DDF1FF"/><rect x="-900" y="300" width="1800" height="140" fill="#8D8FA6"/>`;
  let v = "";
  if (ph === 0) { const pu = t < tPm - .3 ? 0 : t < tPm ? eio((t - (tPm - .3)) / .3) : 1 - .25 * ramp(t, tPm + 1.2, .4), sh = 4 * pulse(t, tPm, .01, .25);
    v = bgc + `<path d="M-900 -420 H900 V-150 Q500 -190 330 -40 Q270 40 250 120 H-560 Q-580 40 -640 -40 Q-760 -170 -900 -160z" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="10"/>
      <g transform="translate(${n2(-150 + sh)} 30)"><path d="M-268 0 A268 268 0 1 1 268 0 Q268 150 200 268 H-200 Q-268 150 -268 0z" fill="#2A2A36" stroke="#15151E" stroke-width="10"/>${Array.from({ length: 22 }, (_, i) => { const an = (i / 22) * Math.PI * 2; return `<path d="M${n2(Math.cos(an) * 222)} ${n2(Math.sin(an) * 222)} L${n2(Math.cos(an + .1) * 262)} ${n2(Math.sin(an + .1) * 262)}" stroke="#4A4A5A" stroke-width="12" stroke-linecap="round"/>`; }).join("")}
        <circle r="206" fill="none" stroke="#3A3A48" stroke-width="8"/><circle r="130" fill="#C9D1DC" stroke="#7A869E" stroke-width="10"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${n2(Math.cos(i * 1.257) * 78)}" cy="${n2(Math.sin(i * 1.257) * 78)}" r="20" fill="#7A869E"/>`).join("")}<circle r="30" fill="#7A869E"/><path d="M-120 -150 Q-170 -100 -180 -30" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".25"/></g>`
      + (pu > 0 ? aHand(lerp(520, 132, pu), 40, 0, 1.5, true) : "")
      + carLab(t, tT + .5, -520, -300, "tyres", "rubber", -300, -120) + (t >= tPm + .3 ? TF(480, 220, spring(t, tPm + .3, .4), tpill(0, 0, "it does not give", 36, "#fff", P.ink, { w: 700 })) : "") + chipAt(t, W("j702", "strong") - .1, 520, -180, "STRONG", 50); }
  else if (ph === 1) { const pr = t < tPr - .3 ? 0 : t < tPr ? eio((t - (tPr - .3)) / .3) : t < tPr + 1.0 ? 1 : 1 - eio((t - tPr - 1.0) / .5), dp = 44 * pr, hy = lerp(-330, 96, Math.min(1, pr * 1.0)) + (t >= tPr + 1.0 ? 0 : 0);
    v = `<rect x="-900" y="-420" width="1800" height="840" fill="#3B3560"/><path d="M-900 -420 H900 V420 H-900z M-640 -330 Q-660 -350 -600 -356 H420 Q560 -350 600 -200 L660 330 H-640z" fill="url(#wCar)" fill-rule="evenodd" stroke="#1F5FA0" stroke-width="10"/>
      <rect x="-250" y="-330" width="230" height="130" rx="46" fill="url(#wWeave)" stroke="#51477A" stroke-width="9"/><path d="M-330 -180 Q-360 60 -300 120 H-20 Q30 60 0 -180 Q-160 -210 -330 -180z" fill="url(#wWeave)" stroke="#51477A" stroke-width="9" stroke-linejoin="round"/>
      <path d="M-350 150 Q-360 110 -300 110 Q-50 ${n2(100 + dp * .3)} 150 ${n2(112 + dp * 2.2)} Q330 ${n2(100 + dp * .3)} 470 120 Q520 130 510 190 L490 300 H-330z" fill="url(#wWeave)" stroke="#51477A" stroke-width="9" stroke-linejoin="round"/><path d="M-300 150 Q0 ${n2(140 + dp)} 460 160" stroke="#A69BD0" stroke-width="6" fill="none" opacity=".7"/>
      <circle cx="430" cy="-150" r="96" fill="none" stroke="#2B2147" stroke-width="26"/><path d="M430 -150 V-54 M340 -150 H520" stroke="#2B2147" stroke-width="16"/>`
      + (pr > 0 || t >= tPr - .3 ? aHand(150, 112 + dp * 2.2 - 14 - 300 * (1 - Math.min(1, pr * 1.0)) * (t < tPr ? 1 : 1), 90, 1.5) : "")
      + carLab(t, tSe + .5, -560, -60, "seats", "fabric", -300, -40) + (t >= tPr + 1.6 ? TF(480, 250, spring(t, tPr + 1.6, .4), tpill(0, 0, "it bends, then comes back", 34, "#fff", P.ink, { w: 700 })) : "") + chipAt(t, W("j703", "flexible") - .1, 560, 60, "FLEXIBLE", 50); }
  else if (ph === 2) { const u = t - tPo, gl = "M-520 190 L-400 -250 Q-390 -280 -350 -280 H350 Q390 -280 400 -250 L520 190 Q0 150 -520 190z"; let wat = "";
    if (u > 0 && u < 3.2) { for (let i = 0; i < 9; i++) { const x0 = -330 + i * 82 + 20 * Math.sin(i * 7), d = (u - i * .05) * 300, y1 = Math.min(190, -270 + d), y0 = Math.max(-270, -270 + d - 420 - (u > 2.2 ? (u - 2.2) * 500 : 0)), sp = (y) => x0 * (1 + (y + 270) / 460 * .28) + 8 * Math.sin(y * .03 + i); if (y1 <= y0 || y0 > 190) continue;
        wat += `<path d="M${n2(sp(y0))} ${n2(y0)} Q${n2(sp((y0 + y1) / 2) + 6)} ${n2((y0 + y1) / 2)} ${n2(sp(y1))} ${n2(y1)}" stroke="#7FD0F5" stroke-width="${12 + (i % 3) * 5}" stroke-linecap="round" fill="none" opacity=".85"/><circle cx="${n2(sp(y1))}" cy="${n2(y1)}" r="${11 + (i % 3) * 3}" fill="#BDEBFF" stroke="#5FB8E6" stroke-width="3"/>`; }
      for (let i = 0; i < 7; i++) { const v2 = ((u * 1.6 + i / 7) % 1); if (u > 1.0 && u < 3.0) wat += `<circle cx="${n2(-480 + i * 160 + 20 * v2)}" cy="${n2(200 + 150 * v2 * v2)}" r="${n2(9 - 4 * v2)}" fill="#7FD0F5" opacity="${n2(1 - v2)}"/>`; } }
    const tip = ramp(t, tPo - .5, .5) * (1 - ramp(t, tPo + 2.5, .5)), seat = (x) => `<rect x="${x - 70}" y="-200" width="140" height="84" rx="30" fill="url(#wWeave)" stroke="#51477A" stroke-width="7"/><path d="M${x - 116} -96 Q${x - 130} 150 ${x - 100} 170 H${x + 100} Q${x + 130} 150 ${x + 116} -96 Q${x} -120 ${x - 116} -96z" fill="url(#wWeave)" stroke="#51477A" stroke-width="7"/>`;
    v = bgc + `<path d="M-430 -300 Q-420 -360 -350 -366 H350 Q420 -360 430 -300z" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="10"/><path d="M-640 420 L-600 230 Q-580 180 -520 180 Q0 140 520 180 Q580 180 600 230 L640 420z" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="10"/>
      <path d="${gl}" fill="#3B3560"/>${seat(-200)}${seat(200)}<circle cx="-200" cy="110" r="74" fill="none" stroke="#2B2147" stroke-width="18"/><path d="${gl}" fill="#DDF4FF" opacity=".28"/><path d="M-330 -230 L-390 60 M-270 -240 L-300 -100" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".55"/>
      ${wat}<path d="${gl}" fill="none" stroke="#1F5FA0" stroke-width="12" stroke-linejoin="round"/><path d="M-360 176 L-80 120 M40 172 L330 116" stroke="#2B2147" stroke-width="9" stroke-linecap="round"/>`
      + OP(ramp(t, tSc + .2, .3) * (1 - ramp(t, tPo + 2.9, .4)), `<g transform="translate(330 -262) rotate(${n2(-28 * tip)}) scale(.8)">${canW()}</g>` + aHand(440, -300, 180, .9))
      + carLab(t, tSc + .4, -590, -330, "windscreen", "glass", -380, -200) + (t >= tPo + 2.0 ? pline(560, 300, 200, 60, ramp(t, tPo + 2.0, .2)) + TF(560, 300, spring(t, tPo + 2.0, .4), tpill(0, 0, "the seats: dry", 36, "#fff", P.ink, { w: 700 })) : "")
      + chipAt(t, W("j704", "cannot") - .1, -640, 40, "WATERPROOF", 40) + chipAt(t, W("j704", "see") - .1, -640, 130, "TRANSPARENT", 40); }
  else if (ph === 3) { const k1 = pulse(t, tKn, .02, .2), k2 = pulse(t, tKn + .25, .02, .2), kn = Math.max(k1, k2), hin = ramp(t, tKn - .5, .35) * (1 - ramp(t, tKn + .9, .4));
    v = `<rect x="-900" y="-420" width="1800" height="840" fill="url(#wCar)"/><path d="M-900 -250 H900" stroke="#1F5FA0" stroke-width="10"/><path d="M-560 -420 V420 M620 -420 V420" stroke="#1F5FA0" stroke-width="10" opacity=".8"/><path d="M-900 -40 H900" stroke="#fff" stroke-width="12" opacity=".3"/><rect x="330" y="-190" width="210" height="50" rx="25" fill="#D6E9FA" stroke="#1F5FA0" stroke-width="8"/><path d="M-480 -200 L-380 -200 M-480 -170 L-420 -170" stroke="#fff" stroke-width="14" stroke-linecap="round" opacity=".5"/>`
      + [k1, k2].map((k, i) => k > .02 ? `<circle cx="-40" cy="80" r="${n2(40 + 90 * (1 - k))}" fill="none" stroke="#fff" stroke-width="7" opacity="${n2(k * .8)}"/>` : "").join("")
      + (hin > .02 ? OP(Math.min(1, hin * 2), `<g transform="translate(${n2(40 + 200 * (1 - hin) + 26 * (1 - kn))} ${n2(96 + 14 * (1 - kn))}) scale(-1.5 1.5)"><g stroke="${typeof SKIN2 !== "undefined" ? SKIN2 : "#E0A070"}" stroke-width="5" fill="${SKIN}"><rect x="-190" y="-34" width="150" height="70" rx="22"/><rect x="-66" y="-46" width="96" height="92" rx="34"/></g><rect x="-260" y="-44" width="100" height="90" rx="16" fill="#5B7BD6" stroke="#3A56A8" stroke-width="5"/></g>`) : "")
      + carLab(t, tBo + .4, -520, -330, "body", "metal", -300, -120) + (t >= tKn + .6 ? TF(480, 250, spring(t, tKn + .6, .4), tpill(0, 0, "knock, knock: solid", 36, "#fff", P.ink, { w: 700 })) : "") + chipAt(t, W("j705", "strong") - .1, 540, -300, "STRONG", 50); }
  else { const S = 1.55, CY = 300, P4 = [["tyres", "rubber", "STRONG", 600, 190], ["seats", "fabric", "FLEXIBLE", -240, -330], ["windscreen", "glass", "WATERPROOF", 600, -30], ["body", "metal", "STRONG", -640, 20]];
    v = bgc + `<ellipse cx="0" cy="${CY + 4}" rx="560" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>` + TF(0, CY, S, carSide({ lit: [0, 1, 2, 3].map((i) => .9 * ramp(t, tAll + .3 + i * .25, .3)) }))
      + P4.map(([p, m, c, x, y], i) => { const t1 = tAll + .3 + i * .25; return t < t1 ? "" : pline(x, y, CARPT[i][0] * S, CY + CARPT[i][1] * S, ramp(t, t1, .2)) + TF(x, y, spring(t, t1, .4), tpill(0, 0, p + " · " + m, 38, "#fff", P.ink, { w: 700 })) + TF(x, y + 58, spring(t, t1 + .1, .4), propChip(c, 26)); }).join(""); }
  return OP(a, v); }
