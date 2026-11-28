// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP10 scenes (script.py): Part 1 lcblocks, lcship, lcbowl · Part 2 lcdrip, lcwax. They are in SHELF_HIDE (lib.js). EP10 Stage 1 wires them
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
    + TF(vx, LCW.y + LCW.h / 2 - 4, k, `<g transform="rotate(-1.5)"><g filter="url(#drop)"><rect x="${n2(-w / 2)}" y="-64" width="${n2(w)}" height="128" rx="64" fill="${col}"/><rect x="${n2(-w / 2 + 9)}" y="-55" width="${n2(w - 18)}" height="110" rx="55" fill="none" stroke="#fff" stroke-width="6" opacity=".9"/></g>
      <g transform="translate(${n2(-w / 2 + 66)} 0)">${tickBadge(34)}</g>${T(40, 25, txt, 70, "#fff", { ls: 2 })}</g>`); };
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

/* ====================================================================================================================================
   EP10 STAGE 2: the five look-closers, drawn. Each art(t) is centred on (0, 0) inside +-830 x +-395; the verdict covers y > 327.
   ==================================================================================================================================== */
const slowTag = (t, t0, x = 668, y = -350) => TF(x, y, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="-128" y="-30" width="256" height="60" rx="30" fill="${P.ink}"/></g><path d="M-98 -11 l14 11 l-14 11z" fill="${P.sun}"/>${T(16, 12, "slow motion", 32, "#fff", { w: 600 })}`);
const lcTable = (y = 296) => `<rect x="-900" y="-450" width="1800" height="900" fill="#DFF1FB"/><rect x="-900" y="${y}" width="1800" height="200" fill="#EFE8DC"/><path d="M-900 ${y} H900" stroke="#fff" stroke-width="5"/>`;
const bubbles = (t, t0, x, y0, ys, n = 5, gap = .2, sp = 110, r = 7) => { let s = ""; for (let i = 0; i < n; i++) { const tb = t0 + i * gap; if (t < tb) continue; const y = y0(tb) - sp * (t - tb); if (y < ys + 6) continue; s += `<circle cx="${n2(x + (hash(i, 4) - .5) * 44 + 5 * Math.sin((t - tb) * 9 + i))}" cy="${n2(y)}" r="${n2(r * (.6 + .6 * hash(i, 6)))}" fill="#fff" opacity=".55" stroke="#fff" stroke-width="2"/>`; } return s; };
const CAMT = [1.12, 1060, 700], CAMX = [1.18, 1150, 700];                    // the table view the tub's look-closers zoom in from
if (PART === 1) { (() => {
/* ---------- 1 · the tub in slow motion: two blocks, then two spoons ---------- */
function blocksArt(t) { const a = "e502", b = "e503", c = "e504", tin = SCN.lcblocks.t0, tR1 = LT(a) - .1, tR2 = LT(b) - .15, tSp = MK("spoons"), tS1 = W(c, "wooden") - .25, tS2 = W(c, "metal") - .25, ys = TUB.ys, fl = TUB.fl, yh = -298, yr = ys - 27;
  // the wooden block: lowered, let go, dips, bobs up, settles half under the water
  const u1 = t - tR1, wby = t < tR1 ? lerp(yh, yr, eio((t - tin - .3) / Math.max(.3, tR1 - tin - .3))) : ys + 1 - 28 * Math.exp(-1.3 * u1) * Math.cos(5.6 * u1) + 2 * Math.sin(t * 1.9), wrot = t < tR1 ? 0 : 6 * Math.exp(-1.2 * u1) * Math.sin(5 * u1) + 1.5 * Math.sin(t * 1.3);
  // the metal block: lowered, let go, straight down, rests on the bottom
  const u2 = (t - tR2) / 1.5, yAt = (tt) => lerp(yr, fl - 22, Math.pow(clamp((tt - tR2) / 1.5), 1.25)), mby = t < tR2 ? lerp(yh, yr, eio((t - (tR2 - 1.1)) / 1.0)) : yAt(t) - (u2 > 1 ? 3 * wob(t, tR2 + 1.5, .3) : 0);
  const arm = (x, y, tRel, thing, dy) => t < tRel ? TF(x, y - dy, 1, holdDown(thing, dy)) : t < tRel + .8 ? TF(x, yr - dy - 6 - 460 * ei((t - tRel) / .8), 1, `<g transform="scale(.62)">${adultArm()}</g>`) : "";
  // the spoons
  const hs = (tt) => eio((tt - tSp - .1) / .7), us1 = t - tS1, wsy = t < tS1 ? lerp(yh, ys - 12, hs(t)) : ys + 3 - 12 * Math.exp(-2 * us1) * Math.cos(6 * us1) + 1.6 * Math.sin(t * 1.7 + 1);
  const syAt = (tt) => lerp(ys - 12, fl - 9, Math.pow(clamp((tt - tS2) / 1.4), 1.2)), msy = t < tS2 ? lerp(yh, ys - 12, hs(t)) : syAt(t), msr = t < tS2 ? 0 : 9 * Math.sin(Math.PI * clamp((t - tS2) / 1.4)) + 2;
  let inner = "";
  inner += t < tR2 ? "" : bubbles(t, tR2 + .12, TIN.mb[0], yAt, ys, 6, .2, 100, 5) + (u2 > 1 && u2 < 1.3 ? `<ellipse cx="${TIN.mb[0]}" cy="${fl}" rx="${n2(40 + 60 * (u2 - 1) / .3)}" ry="5" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(1 - (u2 - 1) / .3)}"/>` : "");
  inner += t < tR2 ? arm(TIN.mb[0], mby, tR2, blockM(), 22) : arm(TIN.mb[0], mby, tR2, "", 22) + TF(TIN.mb[0], mby, 1, blockM());
  inner += t < tR1 ? arm(TIN.wb[0], wby, tR1, blockW(), 22) : arm(TIN.wb[0], wby, tR1, "", 22) + TF(TIN.wb[0], wby, 1, blockW(), wrot);
  if (t >= tSp) { inner += (t >= tS2 ? bubbles(t, tS2 + .15, TIN.ms[0] - 40, syAt, ys, 4, .22, 100, 4) : "") + (t < tS2 ? TF(TIN.ms[0], msy - 8, 1, holdDown(spoonM(), 8)) : (t < tS2 + .8 ? TF(TIN.ms[0], ys - 26 - 460 * ei((t - tS2) / .8), 1, `<g transform="scale(.62)">${adultArm()}</g>`) : "") + TF(TIN.ms[0], msy, 1, spoonM(), msr))
      + (t < tS1 ? TF(TIN.ws[0], wsy - 8, 1, holdDown(spoonW(), 8)) : (t < tS1 + .8 ? TF(TIN.ws[0], ys - 26 - 460 * ei((t - tS1) / .8), 1, `<g transform="scale(.62)">${adultArm()}</g>`) : "") + TF(TIN.ws[0], wsy, 1, spoonW(), 1.5 * Math.sin(t * 1.1 + 1))); }
  const tg = (x, y, txt, t0, t1) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .4) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 38, "#fff", P.ink, { w: 700 }));
  return lcTable() + TF(0, 300, 2, tubSvg({ t, inner })) + slowTag(t, tin + .9)
    + tg(-360, -340, "wood", tin + .8, tR1 + .3) + tg(360, -340, "metal", tin + .9, tR2 + .2)
    + tg(360, -340, "wood", tSp + .5, tS1 + .5) + tg(-250, -340, "metal", tSp + .6, tS2 + .4) + tg(-620, -340, "same shape", tSp + .9, tS2 + .4)
    + lcLab(t, W(a, "it") - .1, -640, -246, "It floats", TIN.wb[0] * 2 - 70, 300 + ys * 2 - 6, { size: 46, fill: GOODC, ink: "#fff" }) + lcLab(t, W(b, "it") - .1, 640, -60, "It sinks", TIN.mb[0] * 2 + 70, 300 + (fl - 22) * 2, { size: 46, fill: WEAKC, ink: "#fff" }); }
SC.lcblocks = (t, s) => lookCloser(t, s, { tz: s.t0, fx: gx(CAMT, BX.tub), fy: gy(CAMT, TYB - 90), art: blocksArt, bgc: "#DFF1FB", tv: MK("v_wood"),
  verdict: [`WOOD <tspan fill="#8FF0A4">FLOATS</tspan> · METAL <tspan fill="#9FD8FF">SINKS</tspan>`, "#3B2A8C", { plain: "WOOD FLOATS · METAL SINKS" }] });

/* ---------- 2 · inside the ship: the see-through window in its hull; then the solid metal block beside it ---------- */
function shipArt(t) { const a = "e801", b = "e802", c = "e803", tW = MK("hullwin"), tS = MK("split"), k = ss(tW, tW + 1.4, t), sp = eio((t - tS) / .9), S = lerp(1.2, .58, sp), sx = lerp(0, -410, sp), sy = lerp(110, 40, sp), tAir = W(b, "all") - .15;
  const airs = [[-85, -66], [150, 22], [376, -66]].map(([x, y], i) => t < tAir + i * .28 ? "" : TF(sx + x * S, sy + y * S, spring(t, tAir + i * .28, .4) * lerp(1, .6, sp), tpill(0, 0, "air", 44, "#fff", "#1F6FB0", { w: 700 }))).join("");
  const boom = t >= tW && t < tW + .7 ? `<rect x="${n2(sx + SWIN.x0 * S)}" y="${n2(sy + SWIN.y0 * S)}" width="${n2((SWIN.x1 - SWIN.x0) * S)}" height="${n2((SWIN.y1 - SWIN.y0) * S)}" rx="30" fill="none" stroke="${P.sun}" stroke-width="${n2(16 * (1 - (t - tW) / .7))}" opacity="${n2(1 - (t - tW) / .7)}" transform="translate(${n2(sx + 70 * S)} ${n2(sy)}) scale(${n2(1 + .25 * (t - tW) / .7)}) translate(${n2(-sx - 70 * S)} ${n2(-sy)})"/>` : "";
  // the right half: the solid metal block on the bottom of the tub, with a little window that shows metal all the way through
  let hatch = ""; for (let i = -6; i <= 6; i++) hatch += `<path d="M${i * 22 - 70} 70 L${i * 22 + 70} -70" stroke="#8E9AA8" stroke-width="5"/>`;
  const rp = sp <= 0 ? "" : `<g transform="translate(${n2(lerp(900, 0, sp))} 0)"><rect x="14" y="-450" width="900" height="900" fill="#DFF1FB"/><rect x="14" y="-236" width="900" height="500" fill="url(#wWater)"/><rect x="14" y="-236" width="900" height="500" fill="#8FD0F2" opacity=".25"/><path d="M14 -236 q50 -8 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0" fill="none" stroke="#fff" stroke-width="6"/>
      <rect x="14" y="252" width="900" height="16" fill="#9CC9E2"/><rect x="14" y="266" width="900" height="200" fill="#EFE8DC"/><g transform="translate(430 166)"><g transform="scale(3.9)">${blockM()}</g>
      <clipPath id="lcSolid"><circle r="56"/></clipPath><circle r="56" fill="#B9C3CF"/><g clip-path="url(#lcSolid)">${hatch}</g><circle r="56" fill="none" stroke="#FFF8EA" stroke-width="9"/><circle r="61" fill="none" stroke="#2B2147" stroke-width="3" opacity=".6"/></g>
      ${[[150, 60, 9], [690, -40, 12], [720, 120, 7], [200, -120, 6]].map(([x, y, r], i) => `<circle cx="${x}" cy="${n2(y - 6 * Math.sin(t * 1.4 + i))}" r="${r}" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>`).join("")}<rect x="2" y="-450" width="16" height="900" fill="#FFF8EA"/></g>`;
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#BFE6FF"/><ellipse cx="-520" cy="-320" rx="150" ry="34" fill="#fff" opacity=".9"/><ellipse cx="420" cy="-350" rx="190" ry="30" fill="#fff" opacity=".8"/>
    <g transform="translate(${n2(sx)} ${n2(sy + 2 * Math.sin(t * .8))}) scale(${n2(S)})">${shipSide()}${seaOver(t, 3200, 900)}${shipInside(k, t)}</g>` + boom + airs
    + lcLab(t, W(a, "part") - .1, -470, 330, "part of it is under the water", -600, 110 + 70, { size: 40, t1: tS - .15 }) + rp
    + (sp > 0 ? lcLab(t, tS + .7, -410, 236, "lots of air inside", -410, sy + 80 * .58, { size: 40 }) + lcLab(t, W(c, "solid") - .1, 430, -330, "solid metal · no air inside", 430, 104, { size: 40 }) : ""); }
SC.lcship = (t, s) => lookCloser(t, s, { tz: s.t0, fx: 960, fy: 600, set: (tt) => seaView(tt, { q: 1 - ss(s.t0 + .2, s.t0 + .6, tt) }), art: shipArt, bgc: "#BFE6FF", verdict: ["TRAPPED AIR INSIDE", "#3B2A8C"], tv: MK("v_air") });

/* ---------- 3 · the metal bowl: it floats (air inside); water pours in; it sits lower, and lower; it sinks ---------- */
function bowlArt(t) { const a = "e1102", b = "e1103", c = "e1104", tP = MK("pour"), tAir = W(a, "air") - .1, t0f = LT(b) + .15, tFull = W(c, "sinks") - .3, f = clamp((t - t0f) / (tFull - t0f)), us = clamp((t - tFull) / 1.5), ysA = 300 + TUB.ys * 2, flA = 300 + TUB.fl * 2, BXc = -96, D = 130;
  const tSw = W(c, "lower", 1) - .1, rimUp = lerp(50, 5, f), baseAt = (tt) => lerp(ysA + D - 5, flA, Math.pow(clamp((tt - tFull) / 1.5), 1.3)), base = t < tFull ? ysA + D - rimUp + 3 * Math.sin(t * 1.8) * (1 - f) : baseAt(t) - (us >= 1 ? 4 * wob(t, tFull + 1.5, .3) : 0), tilt = t < tFull ? 1.3 * Math.sin(t * 1.2) * (1 - f) : 0;
  const yl = -12 - 118 * (t < tFull ? f : 1), jr = -64 * ss(tP, tP + .7, t) * (1 - ss(tFull, tFull + .6, t)), JX = 250, JY = -208, jk = 1.5, ra = jr * Math.PI / 180, spx = JX + (-58 * Math.cos(ra) + 148 * Math.sin(ra)) * jk, spy = JY + (-58 * Math.sin(ra) - 148 * Math.cos(ra)) * jk;
  const pour = t >= t0f - .25 && t < tFull + .15, ly = base + yl, sw = 11 * Math.min(1, (t - t0f + .25) / .25) * (1 - ss(tFull - .1, tFull + .15, t));
  const bowl = `<g transform="translate(${BXc} ${n2(base)}) rotate(${n2(tilt)})"><path d="M-165 -130 Q-160 -20 -60 0 H60 Q160 -20 165 -130z" fill="url(#cSteel)" stroke="#5E6B7C" stroke-width="5" stroke-linejoin="round"/>
      <clipPath id="lcBw"><path d="M-151 -130 Q-146 -30 -56 -13 H56 Q146 -30 151 -130z"/></clipPath><path d="M-151 -130 Q-146 -30 -56 -13 H56 Q146 -30 151 -130z" fill="${t >= tFull ? "#9FD4F2" : "#FFFDF4"}"/>
      <g clip-path="url(#lcBw)"><rect x="-160" y="${n2(yl)}" width="320" height="140" fill="#6CBDEC"/><path d="M-160 ${n2(yl)} q20 ${n2(-5 + 3 * Math.sin(t * 6))} 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="4"/></g>
      <path d="M-151 -130 Q-146 -30 -56 -13 H56 Q146 -30 151 -130" fill="none" stroke="#5E6B7C" stroke-width="3"/><path d="M-168 -130 H168" stroke="#EEF2F6" stroke-width="9" stroke-linecap="round"/><path d="M-168 -130 H168" stroke="#5E6B7C" stroke-width="2.5" opacity=".6"/></g>`;
  const stream = !pour || sw <= .3 ? "" : `<path d="M${n2(spx)} ${n2(spy)} Q${n2(spx - 26)} ${n2(spy + 60)} ${n2(BXc + 30)} ${n2(ly)}" fill="none" stroke="#6CBDEC" stroke-width="${n2(sw)}" stroke-linecap="round"/><path d="M${n2(spx - 2)} ${n2(spy)} Q${n2(spx - 28)} ${n2(spy + 60)} ${n2(BXc + 28)} ${n2(ly)}" fill="none" stroke="#fff" stroke-width="${n2(sw * .3)}" stroke-linecap="round" opacity=".8"/><ellipse cx="${n2(BXc + 30)}" cy="${n2(ly)}" rx="${n2(16 + 8 * Math.sin(t * 14))}" ry="5" fill="#fff" opacity=".8"/>`;
  const over = f > .93 && us < .5 ? [-1, 1].map((sd) => `<path d="M${BXc + sd * 168} ${n2(base - 130)} q${sd * 16} 4 ${sd * 18} ${n2(30 * Math.min(1, (f - .93) / .07 + us))}" fill="none" stroke="#6CBDEC" stroke-width="8" stroke-linecap="round"/>`).join("") : "";
  const jug = `<g transform="translate(${JX} ${JY}) rotate(${n2(jr)}) scale(${jk})"><g transform="translate(86 -78) rotate(${n2(-jr + 16)}) scale(.5)">${adultArm()}</g>${jugSvg(lerp(.78, .3, f))}</g>`;
  const inner = TF(TIN.mb[0], TIN.mb[1], 1, blockM());
  return lcTable() + TF(0, 300, 2, tubSvg({ t, inner, lx: 138, ly: -92 })) + (t >= tFull ? bubbles(t, tFull + .1, BXc, (tt) => baseAt(tt) - 120, ysA, 8, .16, 150, 9) : "") + bowl + over + stream + jug
    + lcLab(t, tAir, -640, -270, "air inside", BXc - 50, base - 64, { size: 46, t1: tSw }) + lcLab(t, tSw, -640, -270, "water inside", BXc - 50, base - 50, { size: 46, fill: WEAKC, ink: "#fff" }); }
SC.lcbowl = (t, s) => lookCloser(t, s, { tz: s.t0, fx: gx(CAMT, BX.tub), fy: gy(CAMT, TYB - 90), art: bowlArt, bgc: "#DFF1FB", verdict: ["THE AIR IS GONE: IT SINKS", WEAKC], tv: MK("v_bowl") });
})(); }
if (PART === 2) { (() => {
const CAMDR = [1.5, 640, 780], DRA = [DKX.coat[0] + COATSL[0] * .74, DKX.coat[1] + COATSL[1] * .74], DRB = [DKX.shoe[0] + SHWET[0] * .46, DKX.shoe[1] + (SHWET[1] - 14) * .46];
// the set the drop test zooms in from: the raincoat and the school shoe on the table, a dropper held above each by an adult's hands
const dripSet = (tt, s) => { const dn = eo((tt - s.t0 + .5) / .6), dr = (x, y) => TF(x, y - 26 - (1 - dn) * 400, .62, dropper(.8) + `<g transform="translate(0 -196) scale(.6)">${adultArm()}</g>`); return deckView(tt, { front: dr(DRA[0], DRA[1]) + dr(DRB[0], DRB[1]) }, CAMDR); };
const lens = (x, y, r, k, inner, id) => k < .02 ? "" : TF(x, y, k, `<clipPath id="${id}"><circle r="${r}"/></clipPath><path d="M${n2(r * .7)} ${n2(r * .7)} L${n2(r * 1.36)} ${n2(r * 1.36)}" stroke="#5E3F28" stroke-width="${n2(r * .22)}" stroke-linecap="round"/><circle r="${r + 6}" fill="#fff"/><g clip-path="url(#${id})">${inner}</g><circle r="${r}" fill="none" stroke="${P.ink}" stroke-width="${n2(r * .1)}"/><path d="M${n2(-r * .6)} ${n2(-r * .46)} q${n2(r * .2)} ${n2(-r * .3)} ${n2(r * .55)} ${n2(-r * .34)}" fill="none" stroke="#fff" stroke-width="${n2(r * .07)}" stroke-linecap="round" opacity=".8"/>`);
// the plain weave, large (inside a lens of radius r): threads over and under; wet = 0..1 the water goes in between and along the threads
function weaveBig(r, wet, t) { const C = 74, n = Math.ceil(r / C) + 1; let v = "", h = "", top = "", w = "";
  for (let i = -n; i <= n; i++) { v += `<rect x="${i * C + C * .14}" y="${-r - 20}" width="${C * .72}" height="${2 * r + 40}" rx="16" fill="${hexL("#EEF2F8", "#B9D3EA", wet)}" stroke="#A9B4CC" stroke-width="4"/>`; h += `<rect x="${-r - 20}" y="${i * C + C * .14}" width="${2 * r + 40}" height="${C * .72}" rx="16" fill="${hexL("#FFFFFF", "#C6DDF0", wet)}" stroke="#A9B4CC" stroke-width="4"/>`; }
  for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) { if ((i + j) % 2 === 0) top += `<rect x="${i * C + C * .14}" y="${j * C - 4}" width="${C * .72}" height="${C + 8}" fill="${hexL("#EEF2F8", "#B9D3EA", wet)}"/><path d="M${i * C + C * .14} ${j * C - 4} v${C + 8} M${i * C + C * .86} ${j * C - 4} v${C + 8}" stroke="#A9B4CC" stroke-width="4"/>`;
    if (wet > .02) { const k = clamp(wet * 1.6 - hash(i * 7 + j, 3) * .6); if (k > 0) w += `<circle cx="${i * C}" cy="${j * C}" r="${n2(15 * k)}" fill="#3E9BD4"/>`; } }
  return `<rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" fill="${hexL("#5E6B84", "#2E6FA8", wet)}"/>${v}${h}${top}${w}`; }
/* ---------- 4 · the slow drop test: the raincoat's sleeve, then the toe of the school shoe, then a cut view with the sock ---------- */
function dripArt(t) { const a = "f501", b = "f502", c = "f503", e5 = "f505", tin = SCN.lcdrip.t0, tTo = MK("toshoe"), tSk = MK("sock"), s1 = eio((t - tTo) / .9), s2 = eio((t - tSk) / .9), SY = 70, DX = -230, R = 46;
  // A · the raincoat
  const tLand = W(a, "lands") - .05, tMag = W(a, "sits") + .5, tTilt = W(b, "tilt") - .1, tRoll = W(b, "rolls") - .3, tDry = W(b, "dry") - .1, tilt = 8 * ss(tTilt, tTilt + .6, t), ur = clamp((t - tRoll) / 1.5), ue = Math.min(1, ur / .78), uf = clamp((ur - .78) / .22);
  const bxy = t < tLand ? [DX, lerp(-360, SY - R * .7, ei((t - tLand + .65) / .65))] : [DX + 850 * ue * ue + 150 * uf, SY - R * .7 + 620 * uf * uf];
  const wb = t < tLand ? 0 : Math.exp(-2.2 * (t - tLand)) * Math.cos(11 * (t - tLand)) * (t < tRoll ? 1 : 0);
  const drop1 = t < tLand - .65 ? "" : t < tLand ? TF(bxy[0], bxy[1], 1, tear(22)) : uf >= 1 ? "" : TF(bxy[0], bxy[1], 1, `<g transform="rotate(${n2(ue * 300)})">${bead(R, wb * 1.6)}</g>`);
  const sleeve = `<g transform="rotate(${n2(tilt)} ${DX} ${SY})"><path d="M-1100 ${SY} H560 Q616 ${SY} 620 ${SY + 60} V470 H-1100z" fill="url(#wCoat)" stroke="#C98A0A" stroke-width="7" stroke-linejoin="round"/><path d="M-1000 ${SY + 34} H520" stroke="#FFF3B0" stroke-width="16" stroke-linecap="round" opacity=".9"/><path d="M500 ${SY + 6} V470" stroke="#C98A0A" stroke-width="5" opacity=".6"/><path d="M-1100 ${SY + 200} Q-200 ${SY + 170} 500 ${SY + 210}" fill="none" stroke="#E0A418" stroke-width="6" opacity=".6"/>${drop1}</g>`;
  const A = `<rect x="-900" y="-450" width="1800" height="900" fill="#DCE4EC"/>` + (t < tMag ? TF(DX, -214 - 300 * (1 - eo((t - tin - .5) / .6)), 1.25, dropper(.8)) : "")
    + sleeve + (t >= tTilt - .3 ? TF(-640 - 300 * (1 - eo((t - tTilt + .3) / .4)), SY - 6 - 86 * ss(tTilt, tTilt + .6, t), 1.2, adultHand(), 8) : "")
    + lens(380, -120, 158, spring(t, tMag, .5) * (1 - ramp(t, tTilt - .25, .25)), `<rect x="-170" y="-170" width="340" height="340" fill="url(#wCoatH)"/><path d="M-170 -60 Q0 -110 170 -50" fill="none" stroke="#FFF6C8" stroke-width="30" opacity=".8"/><path d="M-170 70 Q0 30 170 80" fill="none" stroke="#FFF6C8" stroke-width="12" opacity=".6"/>`, "lzA")
    + (t >= tMag + .5 && t < tTilt ? TF(380, 96, spring(t, tMag + .5, .4) * (1 - ramp(t, tTilt - .25, .25)), tpill(0, 0, "smooth · no gaps", 40, "#fff", P.ink, { w: 700 })) : "")
    + lcLab(t, W(a, "round") - .1, -560, -210, "a round bead", DX - 30, SY - 50, { size: 44, t1: tTilt }) + lcLab(t, tDry, -520, -210, "dry", DX, SY + 14, { size: 54, fill: GOODC, ink: "#fff" });
  // B · the toe of the white school shoe
  const tL2 = W(c, "drop") + .15, wet = ss(tL2, tL2 + 2.8, t), tMag2 = W(c, "between") - .3, TOE = [-90, 60], SK = 3, wm = ss(tMag2 + .3, tMag2 + 2.6, t);
  const drop2 = t < tL2 - .65 ? "" : t < tL2 ? TF(TOE[0], lerp(-330, TOE[1] - 26, ei((t - tL2 + .65) / .65)), 1, tear(22)) : t < tL2 + .5 ? TF(TOE[0], TOE[1] - 8, 1, `<ellipse rx="${n2(30 + 70 * (t - tL2) / .5)}" ry="${n2(22 * (1 - (t - tL2) / .5))}" fill="#8FD3F8" stroke="#3E9BD4" stroke-width="4" opacity="${n2(1 - (t - tL2) / .5)}" transform="rotate(26)"/>`) : "";
  const B = t < tTo ? "" : `<rect x="-900" y="-450" width="1800" height="900" fill="#DCE4EC"/><rect x="-900" y="330" width="1800" height="130" fill="#EFE8DC"/>` + TF(TOE[0] - SHWET[0] * SK, TOE[1] - SHWET[1] * SK, SK, shoeWet(wet)) + drop2 + (t < tL2 + .4 ? TF(TOE[0], -230, 1.25, dropper(.8)) : "")
    + (wm > 0 ? pline(404, 110, TOE[0] + 60, TOE[1] + 14, ramp(t, tMag2, .3)) : "") + lens(540, 130, 150, spring(t, tMag2, .5), weaveBig(150, wm, t), "lzB") + lcLab(t, W(c, "soaks") - .1, -540, -250, "The water goes in", TOE[0] - 30, TOE[1] - 16, { size: 44 });
  // C · the cut view: the shoe from the side, a sock inside; the water passes through
  const X0 = -80, Y0 = 318, K = 2.5, tP = W(e5, "passes") - .2, sp = ss(tP, tP + 1.6, t), sx = (x) => X0 + x * K, sy = (y) => Y0 + y * K;
  let ribs = ""; for (let i = 0; i < 9; i++) ribs += `<path d="M${-60 + i * 20} -150 L${-72 + i * 20} -50" stroke="#fff" stroke-width="2.5" opacity=".7"/>`;
  const dots = t < tP ? "" : [0, 1, 2].map((i) => { const v = ((t - tP) * .8 + i / 3) % 1; return `<circle cx="${n2(84 - 3 * v)}" cy="${n2(-90 + 22 * v)}" r="3.4" fill="#3E9BD4" opacity="${n2(Math.sin(Math.PI * v))}"/>`; }).join("");
  const cut = `<clipPath id="lcCut"><path d="M-78 -164 L124 -68 Q142 -58 138 -48 H-78z"/></clipPath><path d="M-78 -164 L124 -68 Q142 -58 138 -48 H-78z" fill="#D5DCE8"/><g clip-path="url(#lcCut)"><path d="M-90 -148 L96 -64 Q118 -52 96 -50 H-90z" fill="#8CC6EA" stroke="#4E93C4" stroke-width="3"/>${ribs}<path d="M-90 -148 L96 -64" stroke="#fff" stroke-width="4" opacity=".7"/>
      ${sp > .02 ? `<g transform="translate(74 -68) rotate(25)"><ellipse rx="${n2(30 * sp)}" ry="${n2(10 * sp)}" fill="#3A7FB8"/></g>` : ""}</g><path d="M-78 -164 L124 -68 Q142 -58 138 -48" fill="none" stroke="#9AA6C0" stroke-width="7" stroke-linecap="round"/><path d="M52 -103 L112 -74" stroke="#6F8CB0" stroke-width="7" stroke-linecap="round"/>${dots}
      <path d="M-78 -164 L124 -68 Q142 -58 138 -48 H-78z" fill="none" stroke="#FFF8EA" stroke-width="3.5" stroke-dasharray="8 6"/>`;
  const C = t < tSk ? "" : `<rect x="-900" y="-450" width="1800" height="900" fill="#DCE4EC"/><rect x="-900" y="${Y0 - 4}" width="1800" height="140" fill="#EFE8DC"/>` + TF(X0, Y0, K, shoeWet(1) + cut)
    + lcLab(t, tP + .1, 440, -250, "It passes through", sx(86), sy(-84), { size: 44 }) + lcLab(t, W(e5, "wet") - .1, 520, -90, "a wet sock", sx(84), sy(-64), { size: 44, fill: WEAKC, ink: "#fff" }) + lcLab(t, tSk + 1.0, -520, -280, "the sock, inside", sx(-30), sy(-100), { size: 40 });
  return TF(-1800 * s1, 0, 1, s1 < 1 ? A : "") + (t >= tTo ? TF(1800 * (1 - s1) - 1800 * s2, 0, 1, s2 < 1 ? B : "") : "") + (t >= tSk ? TF(1800 * (1 - s2), 0, 1, C) : "") + slowTag(t, tin + .9, -668, -350); }
SC.lcdrip = (t, s) => lookCloser(t, s, { tz: s.t0, fx: gx(CAMDR, (DRA[0] + DRB[0]) / 2), fy: gy(CAMDR, 740), set: (tt) => dripSet(tt, s), art: dripArt, bgc: "#DCE4EC", verdict: ["FABRIC ABSORBS WATER", WEAKC], tv: MK("v_absorb") });

/* ---------- 5 · shoe wax on one boot; one drop on each ---------- */
function waxArt(t) { const a = "f902", b = "f903", c = "f904", tin = SCN.lcwax.t0, tR0 = W(a, "rubs") - .5, tDr = MK("drops"), tR1 = tDr - .5, wax = ss(tR0 + .5, tR1 - .2, t), K = 2.5, BY = 322, LX = -400, RX_ = 400, VY = BY + BOOTV[1] * K;
  const tLand = W(b, "each") + .1, wet = ss(tLand, tLand + 2.6, t), tRoll = W(c, "rolls") - .25, ur = clamp((t - tRoll) / 1.3), Rb = 40;
  const rub = t >= tR0 - .5 && t < tR1 + .6, rin = eo((t - tR0 + .5) / .5) * (1 - ei((t - tR1) / .6)), rx = RX_ + 96 * Math.sin((t - tR0) * 4.4), ry = VY + 8 + 22 * Math.sin((t - tR0) * 2.2);
  const hand = !rub ? "" : TF(rx + 300 * (1 - rin), ry - 40 - 300 * (1 - rin), 1, `<g transform="rotate(24)"><g transform="translate(0 -78) scale(1.25)">${adultArm()}</g><g transform="scale(1.9)">${waxBlock()}</g><rect x="-58" y="-128" width="34" height="56" rx="16" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"/><rect x="30" y="-128" width="34" height="56" rx="16" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"/></g>`);
  const drp = (x) => t < tDr || t > tLand + .5 ? "" : TF(x, -214 - 300 * (1 - eo((t - tDr) / .5)), 1.25, dropper(.8));
  const fall = (x) => t < tLand - .6 || t >= tLand ? "" : TF(x, lerp(-200, VY - 26, ei((t - tLand + .6) / .6)), 1, tear(20));
  const splat = t < tLand || t > tLand + .5 ? "" : TF(LX, VY, 1, `<ellipse rx="${n2(30 + 80 * (t - tLand) / .5)}" ry="${n2(24 * (1 - (t - tLand) / .5))}" fill="#8FD3F8" stroke="#3E9BD4" stroke-width="4" opacity="${n2(1 - (t - tLand) / .5)}"/>`);
  const wb = t < tLand ? 0 : Math.exp(-1.8 * (t - tLand)) * Math.cos(10 * (t - tLand)) + (t < tRoll ? .25 * Math.sin(t * 5) : 0);
  const beadR = t < tLand || ur >= 1 ? "" : TF(RX_ + 30 * ur, VY - Rb * .7 + 480 * ur * ur, 1, `<g transform="rotate(${n2(ur * 200)})">${bead(Rb, wb)}</g>`);
  const glints = wax > .5 ? lcGlint(RX_ - 70, VY - 40, 22 * wax, t, 0) + lcGlint(RX_ + 84, VY + 30, 16 * wax, t, 2) : "";
  const tg = (x, y, txt, t0, fill = "#fff", ink = P.ink) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, 40, fill, ink, { w: 700 }));
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#DCE4EC"/><rect x="-900" y="${BY + 6}" width="1800" height="130" fill="#EFE8DC"/><path d="M-900 ${BY + 6} H900" stroke="#fff" stroke-width="5"/>`
    + TF(LX, BY, K, bootFront({ wet, id: "wl" })) + TF(RX_, BY, K, bootFront({ wax, id: "wr" })) + glints + splat + fall(LX) + fall(RX_) + beadR + drp(LX) + drp(RX_) + hand
    + tg(-706, -300, "plain", tin + .9) + tg(706, -300, "with wax", W(a, "wax") + .3)
    + lcLab(t, W(a, "thin") - .1, 700, -150, "a thin layer", RX_ + 150, VY - 30, { size: 40, t1: tDr })
    + lcLab(t, W(b, "soaks") - .1, 0, 70, "soaks in", LX + 110, VY + 6, { size: 46, fill: WEAKC, ink: "#fff" }) + lcLab(t, W(c, "rolls") - .05, 0, 200, "rolls off", RX_ - 120, VY + 60, { size: 46, fill: GOODC, ink: "#fff" }); }
SC.lcwax = (t, s) => lookCloser(t, s, { tz: s.t0, fx: gx(CAMX, DKX.boots[0]), fy: gy(CAMX, DKX.boots[1] - 80), art: waxArt, bgc: "#DCE4EC", verdict: ["WITH WAX: WATERPROOF", GOODC, { vx: 1210 }], tv: MK("v_wax"),
  over: (tt) => finePrint(tt, s.t0 + .2, "An adult rubs on cold shoe wax. No candles. No flame.", 960, 208) });
})(); }
