// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js, EP11's five in ep11/closer.js, EP12's five in ep12/closer.js, as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP13 scenes (script.py): Part 1 lcstraps (three straps over the back of a chair; the fabric strap lifts a bag full of books), lcbag (the
// school bag doing its job, then part by part), lcdraw (the drawing, and a material chosen for each part) · Part 2 lctest (the old strap's
// five weights, the new strap's nine), lcgoat (a goat home at a zoo: the wooden fence). They are in SHELF_HIDE (lib.js). EP13 Stage 1 wires
// them with lcPH (tests.js): the real lookCloser frame with a placeholder art(); Stage 2 draws each art(t) (and its set) and keeps the frame.
// EP12's five arts are in ep12/closer.js (models: the loaded trolley and the hands, the before / after with a guide line, the magnifier).
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
   STAGE 2 (drawn, 2026-11-22). EP13's five look-closer pictures. Each art(t) is centred on (0, 0) inside +-830 x +-395; the bottom 80 px are
   kept for the verdict. Every action happens AT its timeline mark (the same mark its sound is on).
   ==================================================================================================================================== */
const lcRoom = (gy = 300, fl = "#C9D6C4") => `<rect x="-900" y="-420" width="1800" height="840" fill="#FFF3DC"/><rect x="-900" y="${gy}" width="1800" height="200" fill="${fl}"/><path d="M-900 ${gy} H900" stroke="#9CAE98" stroke-width="5"/>`;
const lcTable = (y, x0 = -900, x1 = 900) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="260" fill="#E9CC96"/><rect x="${x0 - 10}" y="${y}" width="${x1 - x0 + 20}" height="26" rx="8" fill="url(#sDesk)" stroke="#B98F52" stroke-width="5"/>`;
const lcHit = (x, y, k, r = 34) => k < .03 ? "" : OP(Math.min(1, k * 1.4), `<g stroke="${P.ink}" stroke-width="7" stroke-linecap="round">${[-50, -15, 20, 55].map((a) => { const c = Math.cos(a * Math.PI / 180 - 1.2), s = Math.sin(a * Math.PI / 180 - 1.2), r0 = r * (1.2 - .4 * k), r1 = r * (2 - .5 * k); return `<path d="M${n2(x + c * r0)} ${n2(y + s * r0)} L${n2(x + c * r1)} ${n2(y + s * r1)}"/>`; }).join("")}</g>`);
const fadeAt = (t, t1, inner, d = .25) => OP(1 - ramp(t, t1, d), inner);
// the weave and the stitches, large, inside a magnifier's ring (origin = the ring's centre; r = its radius). kind "seam": the strap sewn to the bag; "weave": the strap alone
const weaveRing = (r, kind, id) => `<clipPath id="wr_${id}"><circle r="${r}"/></clipPath><g filter="url(#drop)"><circle r="${r + 10}" fill="#fff"/></g><g clip-path="url(#wr_${id})"><rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" fill="${kind === "seam" ? "#F58A2E" : "url(#sWvB)"}"/>
  ${kind === "seam" ? `<rect x="${-r * .5}" y="${-r}" width="${r}" height="${r * 1.25}" fill="url(#sWvB)" stroke="#8A3A06" stroke-width="6"/><rect x="${-r * .38}" y="${-r * .2}" width="${r * .76}" height="${r * .36}" fill="none" stroke="#FFF3DC" stroke-width="5" stroke-dasharray="10 8"/><path d="M${-r * .38} ${-r * .2} L${r * .38} ${r * .16} M${r * .38} ${-r * .2} L${-r * .38} ${r * .16}" stroke="#FFF3DC" stroke-width="5" stroke-dasharray="10 8"/>` : `<path d="M${-r * .62} ${-r} V${r} M${r * .62} ${-r} V${r}" stroke="#FFF3DC" stroke-width="5" stroke-dasharray="12 10"/>`}</g>
  <circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="12"/><path d="M${n2(r * .72)} ${n2(r * .72)} L${n2(r * 1.3)} ${n2(r * 1.3)}" stroke="#5E3F28" stroke-width="26" stroke-linecap="round"/><path d="M${-r * .6} ${-r * .4} q${r * .2} ${-r * .3} ${r * .5} ${-r * .34}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/>`;

/* 1 · lcstraps: the chair's rounded top rail (seen from just above the back of the chair); an adult's hands lay the three straps over it, one
   by one, left to right: the woven fabric strap drapes over and hangs down on both sides (lay1); the flat metal bar (lay2) and the wooden
   stick (lay3) rest across it like see-saws, straight, rocking once. Nothing is pushed or bent. clear: the bar and the stick are lifted
   away; clip: the fabric strap is clipped to the bag; books: five exercise books go in; lift: the bag is lifted by the new strap alone;
   notear: a magnifier on the seam: whole. */
function strapsArt(t) { const t1 = MK("lay1"), t2 = MK("lay2"), t3 = MK("lay3"), tc = MK("clear"), tp = MK("clip"), tb = MK("books"), tl = MK("lift"), tn = MK("notear"), tS = MK("strongchip"), tv = MK("v_straps");
  const kB = ss(tp - .4, tp - .1, t); let A = "", B = "";
  if (kB < 1) { const RY = -40, X = [-400, 0, 400], gone = tp - .45;
    // the fabric strap: held by its middle, lowered until it rests on the rail (AT lay1); its two ends hang down on both sides
    const u1 = clamp((t - (t1 - .6)) / .6), py = RY - 54 - 250 * (1 - ei(u1)), sw = 12 * wob(t, t1, .9), on1 = t >= t1 - .6, x = X[0];
    const back = on1 ? ribbon([[x + 26, py + 8], [x + 26 + sw * .6, py + 8 + 262]], 58, { col: "#D9620C" }) : "";
    const front = on1 ? ribbon([[x - 8 + sw, py + 330], [x - 8, py + 6]], 62, { cap: "round" }) + `<path d="M${n2(x - 31 + sw)} ${n2(py + 330)} h62" stroke="#8A3A06" stroke-width="8" stroke-linecap="round"/>` : "";
    const h1 = on1 ? OP(1 - ramp(t, t1 + .12, .3), aHand(x + 10, py - 14 - 80 * ramp(t, t1 + .1, .3), 90, 1.25)) : "";
    // the metal bar and the wooden stick: laid across the rail like a see-saw (the far end is up the screen, the near end towards us)
    const plank = (kind, x0, t0) => { if (t < t0 - .6) return ""; const up = t >= tc ? ei((t - tc) / .5) : 0, dy = -260 * (1 - ei((t - (t0 - .6)) / .6)) - 320 * up, r = t >= t0 && t < tc ? wob(t, t0, 1.0) : 0, fx = x0 - 22, fy = RY - 200 + dy - 14 * r, nx = x0 + 30, ny = RY + 250 + dy + 26 * r;
      const fill = kind === "metal" ? "url(#sSteel)" : "url(#sWood)", ln = kind === "metal" ? "#66718D" : "#7A4C26";
      return OP(1 - ramp(t, tc + .25, .25), (t >= t0 ? `<ellipse cx="${x0 + 2}" cy="${RY - 36}" rx="48" ry="9" fill="${P.ink}" opacity=".25"/>` : "")
        + `<path d="M${n2(nx - 50)} ${n2(ny)} H${n2(nx + 50)} V${n2(ny + 18)} H${n2(nx - 50)}z" fill="${ln}"/><path d="M${n2(fx - 28)} ${n2(fy)} H${n2(fx + 28)} L${n2(nx + 50)} ${n2(ny)} H${n2(nx - 50)}z" fill="${fill}" stroke="${ln}" stroke-width="6" stroke-linejoin="round"/>`
        + (kind === "metal" ? `<path d="M${n2(fx - 10)} ${n2(fy + 14)} L${n2(nx - 22)} ${n2(ny - 14)}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>` : `<path d="M${n2(fx - 8)} ${n2(fy + 20)} L${n2(nx - 18)} ${n2(ny - 30)} M${n2(fx + 10)} ${n2(fy + 60)} L${n2(nx + 20)} ${n2(ny - 60)}" stroke="#7A4C26" stroke-width="3.5" stroke-linecap="round" opacity=".55"/>`)
        + OP(t < tc - .3 ? 1 - ramp(t, t0 + .12, .3) : ramp(t, tc - .3, .2), aHand(x0 + 58, RY + 60 + dy, 180, 1.2))); };
    const labs = lcLab(t, t1 + .5, -400, -320, "bends round it", -396, -112, { size: 42, t1: gone }) + lcLab(t, t2 + .5, 0, -340, "stays straight", -20, -246, { size: 42, t1: tc - .1 }) + lcLab(t, t3 + .5, 400, -340, "stays straight", 380, -246, { size: 42, t1: tc - .1 })
      + fadeAt(t, gone, chipAt(t, MK("flexchip"), -640, -160, "FLEXIBLE", 40));
    A = lcRoom(330) + `<path d="M-640 ${RY} V420 M640 ${RY} V420" stroke="#8E9AA8" stroke-width="44" stroke-linecap="round"/><path d="M-652 ${RY} V420 M628 ${RY} V420" stroke="#fff" stroke-width="8" opacity=".5"/><rect x="-690" y="230" width="1380" height="70" rx="35" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="7"/>`
      + back + `<rect x="-740" y="${RY - 48}" width="1480" height="96" rx="48" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="8"/><path d="M-690 ${RY - 22} H690" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".5"/>` + front + plank("metal", X[1], t2) + plank("wood", X[2], t3) + h1 + labs; }
  if (kB > 0) { const TY = 255, BX = -240, S = 1.5, uL = eio((t - tl) / .6), lift = 84 * uL, rot = -8 * uL + 6 * wob(t, tl + .45, 1.1) * (t >= tl ? 1 : 0), isNew = t >= tp;
    const up = eio((t - (tl - .35)) / .5), pull = t >= tl - .35 ? [lerp(165, 138, up), lerp(-150, -312, up)] : undefined, nb = [0, 1, 2, 3, 4].filter((i) => t >= tb + i * .3).length, open = ramp(t, tp + .15, .35);
    const a = rot * Math.PI / 180, W2 = (lx, ly) => [BX + S * (lx * Math.cos(a) - ly * Math.sin(a)), TY - lift + S * (lx * Math.sin(a) + ly * Math.cos(a))];
    let fly = "", stack = "";
    [0, 1, 2, 3, 4].forEach((i) => { const ti = tb + i * .3, u = clamp((t - (ti - .3)) / .3); if (t >= ti) return; if (u <= 0) { stack += TF(420 + (i % 2) * 8, TY - (4 - i) * 21, 1.5, bookFlat(i)); return; }
      const bx = lerp(420, BX, eio(u)), by = lerp(TY - 60, TY - 176 * S - 70, eio(u)) - 150 * Math.sin(Math.PI * u); fly += TF(bx, by, 1.15, bookC(i), -20 * (1 - u)) + aHand(bx + 40, by - 20, 160, 1.0); });
    const anchor = W2(56, -238), hp = pull ? W2(pull[0], pull[1]) : null;
    B = lcRoom(330) + lcTable(TY) + `<ellipse cx="${BX}" cy="${TY + 12}" rx="${n2(230 - 60 * uL)}" ry="${n2(16 - 5 * uL)}" fill="${P.ink}" opacity="${n2(.2 - .08 * uL)}" filter="url(#b4)"/>` + stack
      + `<g transform="translate(${BX} ${n2(TY - lift)}) rotate(${n2(rot)}) scale(${S})">${bag13({ strapR: isNew ? "new" : "torn", pull, open, books: nb, zip: 1, id: "ls" })}</g>` + fly
      + (t >= tp - .35 && t < tp + .5 ? OP(1 - ramp(t, tp + .2, .3), aHand(anchor[0] + 30, anchor[1] - 6, 180, 1.1)) + lcHit(anchor[0], anchor[1] - 30, pulse(t, tp, .02, .4)) : "")
      + (hp ? OP(ramp(t, tl - .35, .2), aHand(hp[0] + 6, hp[1] + 26, 90, 1.25)) : "")
      + (t >= tn ? pline(anchor[0] + 20, anchor[1], 360, -150, ramp(t, tn, .2)) + TF(480, -130, spring(t, tn, .45), weaveRing(150, "seam", "st")) : "")
      + lcLab(t, tn + .5, -590, 205, "a bag full of books", -380, 60, { size: 40 }) + lcLab(t, tn + .9, 590, 80, "no tear", 520, 10, { size: 46, fill: GOODC, ink: "#fff" })
      + chipAt(t, tS, 600, 190, "STRONG", 42) + chipAt(t, tv + .15, 350, 190, "FLEXIBLE", 42); }
  return kB <= 0 ? A : kB >= 1 ? B : A + OP(kB, B); }

/* 2 · lcbag: the school bag doing its job, then part by part. booksin: five books slide in; zip1: the zip is closed; hang: the bag is hung on
   the back of the chair; p_*: each part lights with its name while the rest is dimmed; u_*: each part does its job AT its mark */
function bagArt(t) { const S = 1.35, TY = 200, FY = 318, CH = [300, FY + 12, 1.45], RAILY = CH[1] - 322 * CH[2], tb = MK("booksin"), tz = MK("zip1"), th = MK("hang"), tp = ["p_straps", "p_body", "p_zip", "p_base"].map(MK), tu = ["u_straps", "u_body", "u_zip", "u_base"].map(MK), tv = MK("v_bag");
  const P0 = [-520, TY], P1 = [CH[0], RAILY + 44 + 250 * S], P2 = [-70, FY], uh = eio((t - th) / .8), ud = eio((t - (tu[3] - .75)) / .75);
  const bx = ud > 0 ? lerp(P1[0], P2[0], ud) : lerp(P0[0], P1[0], uh), by = ud > 0 ? lerp(P1[1], P2[1], ud) - 50 * Math.sin(Math.PI * ud) : lerp(P0[1], P1[1], uh) - 150 * Math.sin(Math.PI * uh), hung = uh >= .93 && ud <= .07;
  const nb = [0, 1, 2, 3, 4].filter((i) => t >= tb + .1 + i * .22).length;
  const zo = t < tz ? 1 : t < tu[1] ? 1 - eio((t - tz) / .5) : t < tu[2] ? ramp(t, tu[1], .4) : 1 - eio((t - tu[2]) / .6);
  let lit = null; tp.forEach((x, i) => { if (t >= x && t < (i < 3 ? tp[i + 1] : x + 2.4)) lit = ["straps", "body", "zip", "base"][i]; });
  const rot = hung ? 3 * wob(t, th + .8, 1.2) + 4 * wob(t, tu[0], 1.1) * (t >= tu[0] ? 1 : 0) : 0, sq = t >= tu[3] ? 1 - .05 * wob(t, tu[3], .4) : 1;
  // the straps over the rail while it hangs
  const hs = hung ? [-1, 1].map((sd) => ribbon([[bx + sd * 58 * S, by - 236 * S], [bx + sd * 62, RAILY - 30]], 28, sd > 0 ? {} : { plain: true, col: "#F58A2E", edge: BAGL }) + `<path d="M${bx + sd * 62 - 18} ${n2(RAILY - 31)} h36" stroke="${sd > 0 ? "#8A3A06" : BAGL}" stroke-width="10" stroke-linecap="round"/>`).join("") : "";
  const bag = `<g transform="translate(${n2(bx)} ${n2(by)}) rotate(${n2(rot)}) scale(${S} ${n2(S * sq)})">${bag13({ strapR: hung ? "none" : "new", strapL: hung ? "none" : "ok", zip: zo, open: zo, books: nb, lit, id: "lb" })}</g>`;
  const hsL = hung ? (lit === "straps" ? `<g filter="url(#glowS)">${hs}</g>` : lit ? OP(.28, hs) : hs) : "";
  // the books on the table, sliding in one by one
  let fly = "", stack = ""; [0, 1, 2, 3, 4].forEach((i) => { const ti = tb + .1 + i * .22, u = clamp((t - (ti - .22)) / .22); if (t >= ti) return; if (u <= 0) { stack += TF(-250 + (i % 2) * 8, TY - (4 - i) * 19, 1.35, bookFlat(i)); return; }
    const x = lerp(-250, P0[0], eio(u)), y = lerp(TY - 50, TY - 176 * S - 60, eio(u)) - 90 * Math.sin(Math.PI * u); fly += TF(x, y, 1.0, bookC(i), 20 * (1 - u)) + aHand(x + 36, y - 20, 160, .9); });
  // the hands
  const zp = qbz(ZA[0], ZA[1], ZA[2], 1 - zo * .92), zx = bx + S * zp[0], zy = by + S * zp[1], hv = (a, b) => ramp(t, a, .2) * (1 - ramp(t, b, .25));
  const hands = OP(hv(tz - .3, tz + .6), aHand(zx + 4, zy - 4, 110, .9)) + OP(hv(th - .25, th + .95), aHand(bx - 60 * S, by - 256 * S, 70, .95) + aHand(bx + 60 * S, by - 256 * S, 110, .95))
    + OP(hv(tu[1] - .2, tu[1] + 1.0), aHand(bx - 104 * S, by - 196 * S, 20, .9) + aHand(bx + 104 * S, by - 196 * S, 160, .9)) + OP(hv(tu[2] - .2, tu[2] + .8), aHand(zx + 4, zy - 4, 110, .9))
    + OP(hv(tu[3] - .85, tu[3] + .3), aHand(bx - 60 * S, by - 256 * S, 70, .95) + aHand(bx + 60 * S, by - 256 * S, 110, .95));
  const H = [P1[0], P1[1]], names = [["straps", -60, -175, H[0] - 70, RAILY + 30], ["body", -60, 112, H[0] - 132, 110], ["zip", -60, 20, H[0] - 124, 14], ["base", -60, 222, H[0] - 138, 218]];
  const uses = [["straps · carry the bag", -200, -175, H[0] - 70, RAILY + 30], ["body · holds the books", -200, 112, H[0] - 132, 110], ["zip · opens and closes", -200, 20, H[0] - 124, 14], ["base · sits on the floor", 500, 200, P2[0] + 140, FY - 30]];
  let labs = lcLab(t, th + .75, -330, 60, "to carry books to school", H[0] - 140, 90, { size: 40, t1: tp[0] - .25 });
  names.forEach(([w, x, y, px, py], i) => { labs += lcLab(t, tp[i], x, y, w, px, py, { size: 46, t1: (i < 3 ? tp[i + 1] : tp[3] + 2.4) - .2 }); });
  uses.forEach(([w, x, y, px, py], i) => { labs += lcLab(t, tu[i] + (i === 3 ? .2 : .1), x, y, w, px, py, { size: 38, t1: i < 3 ? tu[i + 1] - .2 : undefined }); });
  return lcRoom(FY) + lcTable(TY, -900, -300) + `<rect x="-330" y="${TY + 26}" width="22" height="${FY - TY - 26}" fill="#8E9AA8"/>` + stack
    + `<ellipse cx="${P2[0]}" cy="${FY + 6}" rx="${n2(190 * ud)}" ry="${n2(12 * ud)}" fill="${P.ink}" opacity=".18" filter="url(#b4)"/>` + TF(CH[0], CH[1], CH[2], chairS()) + bag + hsL + fly + hands + lcHit(P2[0] + 150, FY - 8, pulse(t, tu[3], .02, .35), 26) + labs; }

/* 3 · lcdraw: the paper fills the window. pencil: an adult's hand with an ordinary pencil draws the bag, part by part (speeded up), and four
   plain label lines; then a sample is tried right beside the part it is for: drop1 / drop2 (a drop on plastic stays a bead; on fabric it
   sinks in), plastichop; the short metal zip run open, close, open, close (zo1..zc2), ziphop; fabhop2 (the fabric tile and the strap) */
function drawArt(t) { const tp = MK("pencil"), tf4 = MK("fill4"), d1 = MK("drop1"), d2 = MK("drop2"), tph = MK("plastichop"), tzm = ["zo1", "zc1", "zo2", "zc2"].map(MK), tzh = MK("ziphop"), tfh = MK("fabhop2"), tv = MK("v_draw");
  const DX = -60, DY = 215, DS = 1.4, k = clamp((t - tp) / (tf4 - tp - .15)), L2W = (x, y) => [DX + DS * x, DY + DS * y];
  const hopTo = (t0, a, b, d = .45) => { const u = clamp((t - t0) / d); return [lerp(a[0], b[0], eio(u)), lerp(a[1], b[1], eio(u)) - 130 * Math.sin(Math.PI * u), u]; };
  const mat = { base: ramp(t, tph + .38, .2), zip: ramp(t, tzh + .38, .2), fab: ramp(t, tfh + .38, .2) }, tags = { base: mat.base, zip: mat.zip, straps: mat.fab, body: mat.fab };
  // the pencil's tip
  const PP = [[-100, -40], [-100, -200], [-40, -250], [100, -170], [-58, -124], [-152, -112], [152, -112], [96, -176], [104, -14], [-235, -250], [-235, -185], [-235, -110], [-235, -10]], pi = k * (PP.length - 1), i0 = Math.min(PP.length - 2, Math.floor(pi)), pt = L2W(lerp(PP[i0][0], PP[i0 + 1][0], pi - i0) + 5 * Math.sin(t * 31), lerp(PP[i0][1], PP[i0 + 1][1], pi - i0) + 5 * Math.cos(t * 27));
  const pen = OP(ramp(t, tp - .4, .3) * (1 - ramp(t, tf4 + .1, .3)), TF(pt[0], pt[1], 1.1, pencilHand()));
  // BASE: the plastic tile and the fabric tile, the dropper and its two drops
  const ta = LT("g1003") - .2, PL = [410, 175], FB = [610, 175], sl = 700 * (1 - ramp(t, ta, .45)), out = t >= tzm[0] - 2.0 ? 700 * ei((t - (tzm[0] - 2.0)) / .5) : 0;
  const hp = hopTo(tph, PL, L2W(0, -22)), dropTile = t < tph + .45 ? TF(hp[0] + sl, hp[1], 1.15 * (1 - .55 * hp[2]), sampleTile("plastic", { bead: t >= d1 ? spring(t, d1, .3) : 0 })) : "";
  const fabTile = out < 690 ? TF(FB[0] + sl + out, FB[1], 1.15, sampleTile("fabric", { wet: ramp(t, d2, .6) })) : "";
  const dx = t < d1 + .25 ? PL[0] + 6 : lerp(PL[0] + 6, FB[0] + 6, eio((t - d1 - .25) / .5)), dq = Math.max(pulse(t, d1 - .32, .1, .3), pulse(t, d2 - .32, .1, .3)), dvis = ramp(t, ta + .5, .3) * (1 - ramp(t, d2 + .5, .3));
  const fall = (td, x) => t >= td - .3 && t < td ? TF(x, lerp(40, 150, ei((t - (td - .3)) / .3)), 1, waterDrop(11)) : "";
  const drp = OP(dvis, TF(dx, 22 - 120 * (1 - ramp(t, ta + .5, .4)) - 200 * ramp(t, d2 + .4, .4), 1.3, dropper(dq))) + fall(d1, PL[0] + 6) + fall(d2, FB[0] + 6) + (t >= d1 && t < d1 + .4 ? lcHit(PL[0] + 6, PL[1] - 20, pulse(t, d1, .02, .3), 20) : "");
  // ZIP: the short metal zip, run open and closed by one hand (AT zo1, zc1, zo2, zc2)
  const tz0 = LT("g1004") - .2, ZP = [500, -50], zs = 700 * (1 - ramp(t, tz0, .45)), zu = t < tzm[0] ? 0 : t < tzm[1] ? eio((t - tzm[0]) / .34) : t < tzm[2] ? 1 - eio((t - tzm[1]) / .34) : t < tzm[3] ? eio((t - tzm[2]) / .3) : 1 - eio((t - tzm[3]) / .34);
  const zh = hopTo(tzh, ZP, L2W(0, -158)), zipS = t >= tz0 && t < tzh + .45 ? TF(zh[0] + zs, zh[1], 1.3 * (1 - .4 * zh[2]), zipShort(zu)) + OP(ramp(t, tz0 + .4, .25) * (1 - ramp(t, tzm[3] + .5, .3)), aHand(ZP[0] + 1.3 * lerp(120, -120, zu) - 30, ZP[1] - 6, 100, 1.0)) : "";
  // STRAPS AND BODY: the fabric tile's dry twin and the strap from before
  const tf0 = LT("g1005") - .2, F2 = [400, -255], SP = [600, -200], fs = 700 * (1 - ramp(t, tf0, .45)), fh = hopTo(tfh, F2, L2W(0, -150)), sh = hopTo(tfh + .08, SP, L2W(150, -150));
  const fab = t >= tf0 && t < tfh + .55 ? TF(fh[0] + fs, fh[1], 1.15 * (1 - .5 * fh[2]), sampleTile("fabric")) + TF(sh[0] + fs, sh[1], 1 - .5 * sh[2], strapBand("fabric", 300, 34), -14) : "";
  const chips = chipAt(t, MK("wpchip"), 450, 178, "WATERPROOF", 38) + chipAt(t, MK("zipchip"), 480, -50, "STRONG", 38) + chipAt(t, MK("flexchip2"), 440, -262, "FLEXIBLE", 38) + chipAt(t, MK("strongchip2"), 500, -186, "STRONG", 38);
  return `<rect x="-900" y="-420" width="1800" height="840" fill="#E3C594"/>${wgrain(-880, 880, -300, 6, 3)}${wgrain(-880, 880, 300, 6, 9)}` + TF(-250, 0, 1, paperS(990, 690)) + TF(DX, DY, DS, bagDrawing(k, { mat, tags, left: true, fs: 36 }))
    + fabTile + dropTile + drp + zipS + fab + chips + pen; }

/* 4 · lctest: left, the HELD PICTURE of the old strap (a photo card, "before the video": thin and worn, torn across just under the clamp,
   WEIGHTS: 5); right, the new strap, live: an adult's gloved hand slides the weights onto its hanger, one AT each mark w1..w9, low over the
   padded tray. NOTHING tears on screen; the new strap stops at nine. */
function testArt(t) { const NX = 300, OX = -330, Y0 = -306, Y1 = 30, HS = 1.9, tw9 = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => MK("w" + i)), tL = MK("rulerL"), tW = MK("rulerW"), t5 = MK("link5"), tn = MK("lens9"), tsd = MK("side"), tt = MK("testtick");
  let n = 0, sl = null; tw9.forEach((x, i) => { if (t >= x) n = i + 1; else if (t >= x - .45 && sl === null) sl = [i, (t - (x - .45)) / .45]; });
  const ck = n ? pulse(t, tw9[n - 1], .02, .3) : 0, lk = pulse(t, t5, .05, 1.2), dip = n ? 5 * wob(t, tw9[n - 1], .35) : 0;
  // the gloved hand holds the weight that is sliding on, then lets go and draws back; at lens9 it opens, empty
  const wy = Y1 + dip + HS * (104 - 4 - 4.75 - (sl ? sl[0] : n) * 9.5), hx = sl ? NX + HS * lerp(190, 0, eio(sl[1])) + 60 : NX + 130 + 420 * eio((t - (n ? tw9[n - 1] : 0)) / .35), hop = t >= tn ? ramp(t, tn, .3) : 0;
  const hand = t >= tw9[0] - .9 ? OP(ramp(t, tw9[0] - .9, .3) * (1 - ramp(t, tsd - .3, .4)), TF(hx, wy, 1.05, glovePinch(sl ? 0 : Math.max(hop, .5)))) : "";
  const bar = `<rect x="-760" y="-350" width="1520" height="26" rx="13" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="4"/>` + [OX, NX].map((x) => `<rect x="${x - 70}" y="-338" width="140" height="64" rx="12" fill="#39435A" stroke="#2B2147" stroke-width="5"/><rect x="${x - 58}" y="-286" width="116" height="18" rx="6" fill="#6C7A98"/><circle cx="${x}" cy="-310" r="14" fill="${P.sun}" stroke="#2B2147" stroke-width="4"/>`).join("");
  const card = TF(OX, -296, 1, oldStrapCard(330, 560)) + OP(.7 * ramp(t, tL, .3), `<rect x="${OX - 34}" y="${Y0 + 40}" width="68" height="${Y1 - Y0 - 40}" fill="none" stroke="#8A7458" stroke-width="4" stroke-dasharray="12 10"/>`);
  const strap = newStrap(NX, Y0, Y1 + dip, 68) + TF(NX, Y1 + dip, HS, hangerSvg(n, { slide: sl ? [sl[0], sl[1]] : undefined }));
  const tray = `<rect x="${NX - 240}" y="262" width="480" height="30" rx="15" fill="#FF9E8A" stroke="#C8604E" stroke-width="5"/><path d="M${NX - 220} 272 H${NX + 220}" stroke="#fff" stroke-width="5" opacity=".45" stroke-linecap="round"/><rect x="-900" y="292" width="1800" height="200" fill="#C9A06A"/><path d="M-900 292 H900" stroke="#7A4C26" stroke-width="5"/>`;
  const rule = OP(ramp(t, tL, .3) * (1 - ramp(t, tw9[0] - .4, .3)), `<path d="M-560 ${Y0 + 40} H520 M-560 ${Y1} H520" stroke="${P.ink}" stroke-width="5" stroke-dasharray="16 12" opacity=".7"/>` + TF(-15, (Y0 + Y1) / 2 + 20, spring(t, tL, .4), tpill(0, 0, "same length", 40, "#fff", P.ink, { w: 700 })))
    + OP(ramp(t, tW, .3) * (1 - ramp(t, tw9[0] - .4, .3)), [OX, NX].map((x) => `<path d="M${x - 34} ${Y0 + 64} V${Y0 + 104} M${x + 34} ${Y0 + 64} V${Y0 + 104} M${x - 34} ${Y0 + 84} H${x + 34}" stroke="${P.coral}" stroke-width="6" stroke-linecap="round"/>`).join("") + TF(-15, (Y0 + Y1) / 2 + 100, spring(t, tW, .4), tpill(0, 0, "same width", 40, "#fff", P.ink, { w: 700 })));
  const cnt = OP(ramp(t, tw9[0] - .5, .3), T(-15, -206, "old strap", 30, P.ink, { w: 600 }) + TF(-15, -160, 1.15, counterPill(5, lk)) + (t >= t5 ? `<path d="M-15 -122 V${n2(lerp(-122, -52, ramp(t, t5, .25)))}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>` : "") + T(-15, -56 + 44, "", 1) + TF(-15, -10, 1.15, counterPill(n, Math.max(ck, lk))) + T(-15, 58, "new strap", 30, P.ink, { w: 600 }));
  const lens = t >= tn ? pline(NX + 34, -80, 520, -50, ramp(t, tn, .2)) + TF(630, -40, spring(t, tn, .45), weaveRing(112, "weave", "tt")) + lcLab(t, tn + .5, 660, 150, "no tear", 640, 70, { size: 44, fill: GOODC, ink: "#fff" }) + lcLab(t, tn + .25, 600, 240, "9 weights", NX + 78, 200, { size: 40 }) : "";
  const side = t >= tsd ? TF(-15, 130, spring(t, tsd, .4), tpill(0, 0, "old strap: 5", 40, P.ink, "#fff", { w: 700 })) + TF(-15, 208, spring(t, tsd + .2, .4), tpill(0, 0, "new strap: 9", 40, GOODC, "#fff", { w: 700 })) : "";
  const tcard = TF(-690, -150, 1, `<g filter="url(#dropS)"><rect x="-96" y="-76" width="192" height="152" rx="18" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>${T(0, -22, "THEN:", 34, P.ink, { ls: 2 })}${T(0, 20, "TEST", 42, P.coral, { ls: 2 })}${T(0, 56, "IT", 36, P.coral, { ls: 2 })}` + (t >= tt ? TF(84, -66, spring(t, tt, .35), tickBadge(34)) + lcHit(84, -66, pulse(t, tt, .02, .4), 30) : ""));
  return `<rect x="-900" y="-420" width="1800" height="840" fill="#DDF2D0"/><circle cx="-700" cy="330" r="260" fill="#BFE5A8"/><circle cx="760" cy="300" r="300" fill="#C9EAB4"/>` + tray + bar + card + strap + hand + rule + cnt + lens + side + tcard; }

/* 5 · lcgoat: a goat home at a zoo. Three wooden rails fill most of the window; goatwalk: one small goat walks up behind the fence; push1:
   it pushes its side against the middle rail, the way goats rub; push2: then its forehead: the rail does not move; glide: the camera glides to
   the gap between two rails and looks through; seegoats: the three goats, their hay, their water trough, their shelter. Nobody touches or feeds them. */
function goatArt(t) { const tw_ = MK("goatwalk"), p1 = MK("push1"), p2 = MK("push2"), tg = MK("glide"), ts = MK("seegoats"), RL = [-90, 130, 350], GY = 388, GS = 1.8, GX = -150;
  const ug = eio((t - tg) / 2.2), z = lerp(1, 2.5, ug), cx = lerp(0, 330, ug), cy = lerp(0, 22, ug);
  // the near goat: it walks up, rubs its side on the middle rail (push1), lowers its head and pushes with its forehead (push2), then trots back to the others
  const uw = clamp((t - tw_) / (p1 - .3 - tw_)), away = eio((t - (tg + .1)) / 2.0), walking = (t >= tw_ && uw < 1) || (away > 0 && away < 1);
  const rub = t >= p1 && t < p2 - .5 ? 16 * Math.sin((t - p1) * 9) * Math.exp(-(t - p1) * 1.3) : 0, head = t >= p2 - .5 && t < tg ? 38 * (ss(p2 - .5, p2 - .12, t) - .0) * (1 - .25 * pulse(t, p2, .05, .5)) : 0, butt = t >= p2 - .12 && t < tg ? 14 * pulse(t, p2, .1, .5) : 0;
  const gx = away > 0 ? lerp(GX, 120, away) : lerp(-1050, GX, uw) + rub + butt, gy = away > 0 ? lerp(GY, 98, away) : GY, gs = away > 0 ? lerp(GS, .58, away) : GS * (1 + .04 * pulse(t, p1, .12, .6));
  const near = t >= tw_ ? `<g transform="translate(${n2(gx)} ${n2(gy)}) scale(${n2(gs)})">${goatS(t, { ...GOATS[0], walk: walking ? t * 2.4 : undefined, head })}</g>` : "";
  const far = TF(600, 46, .5, shelterS()) + TF(250, 96, -.58, goatS(t, GOATS[1]), 0, .58) + TF(455, 100, -.6, goatS(t, { ...GOATS[2], head: 24 + 8 * Math.sin(t * 2) }), 0, .6) + TF(352, 104, .45, hayHeap()) + TF(600, 106, .5, trough());
  const world = `<rect x="-1400" y="-500" width="2800" height="440" fill="url(#gSkyG)"/>${[-900, -560, -220, 120, 460, 800, 1140].map((x, i) => `<circle cx="${x}" cy="-100" r="${150 + (i % 2) * 30}" fill="${i % 2 ? "#43BF6C" : "#2F9A57"}"/>`).join("")}<rect x="-1400" y="-70" width="2800" height="700" fill="url(#gEarth)"/>${penFence(-1400, 1400, [-78, -52], { th: 10, step: 170, bot: -30 })}
    <ellipse cx="-300" cy="250" rx="260" ry="20" fill="#C9A76E" opacity=".6"/><ellipse cx="500" cy="300" rx="200" ry="16" fill="#C9A76E" opacity=".6"/>` + far + near + penFence(-1400, 1400, RL, { th: 46, step: 1120, off: 840, bot: 520 })
    + lcHit(GX + 40, RL[1] - 40, pulse(t, p1, .02, .4), 30) + lcHit(GX + 250, RL[1] - 46, pulse(t, p2, .02, .4), 30);
  const gone = tg - .1, labs = lcLab(t, p1 + .4, -560, -250, "a wooden fence", -520, -112, { size: 42, t1: gone }) + lcLab(t, p1 + .8, 420, 250, "the goat pushes", 60, 190, { size: 42, t1: gone }) + lcLab(t, p2 + .4, 480, -40, "no break", 250, 110, { size: 46, fill: GOODC, ink: "#fff", t1: gone })
    + fadeAt(t, gone, chipAt(t, MK("strongchip"), 560, 60, "STRONG", 42)) + (t >= ts ? TF(0, -330, spring(t, ts, .4), tpill(0, 0, "we can see the goats", 46, "#fff", P.ink, { w: 700 })) : "") + chipAt(t, MK("v_goat") + .15, 600, 225, "STRONG", 42);
  return `<g transform="scale(${n2(z)}) translate(${n2(-cx)} ${n2(-cy)})">${world}</g>` + labs; }
