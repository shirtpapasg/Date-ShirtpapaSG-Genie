// closer.js: the LOOK-CLOSER frame (from EP8; EP8's seven moments are in ep08/closer.js, EP11's five in ep11/closer.js, EP12's and EP13's five in ep12/ and ep13/closer.js, as models) (teacher, 2026-11-21, SERIES_FORMAT section 1b: "a stronger emphasis to the theme... like episode 1's
// zoom-in shot and description of the wind-up robot, the seed growth, the plant responding").
// Each one: the camera pushes in slowly on the real thing (the set dims; score and shelf are away), a large close-up window opens on it and
// the evidence is shown HAPPENING (a cut-away, a magnifying glass, a time-lapse, before / after, plain label lines), Heart describes what we
// see and then says it in the book's words, the close-up holds 6-10 s, and ONE verdict tag lands at the end (mark v_*).
// EP14 scenes (script.py): Part 1 lcsky (the sky from our window, two days, speeded up), lcglobe (the globe and the torch), lclight (the
// traffic light at the junction below) · Part 2 lcthen (then and now), lcchick (one chick, week after week), lchens (three chickens
// together). They are in SHELF_HIDE (lib.js). EP14 Stage 1 wires them with lcPH (tests.js): the real lookCloser frame with a placeholder
// art(); Stage 2 draws each art(t) (and its set) and keeps the frame. EP13's five arts are in ep13/closer.js, EP12's in ep12/closer.js
// (models: the hands, the before / after with a guide line, the magnifier, the speeded-up clock).
const LCW = { x: 960, y: 572, w: 1800, h: 866 };                       // the close-up window on screen (EP14 trial: the panel fills the frame)                       // the close-up window on screen
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
        <g transform="translate(${W_.x} ${W_.y}) scale(${n2(push * (o.as || 1.06) * 1000) / 1000})">${o.art(t)}</g>${lcPeekAuto(t, s, o)}</g><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" rx="44" fill="none" stroke="${P.ink}" stroke-width="5" opacity=".25"/></g>`
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

/* EP14 trial (teacher, 22 Nov: "insert one of the pet buddies in, focusing on its face, looking shocked / agreeing"; the buddies teach inside
   the look-closers): the FACE of the buddy who speaks (or spoke last, or speaks next) peeks in from a lower corner of the panel, about a third
   of its height, reacting on the beats by itself (lib.js reactAt: never frozen); a new speaker pops in with a squash. o.peekSide "l" / "r" or
   a function of t; o.peekWho to force a buddy. Its bubble comes from autoSay (lib.js), beside the face. */
function lcPeekAuto(t, s, o) { if (o.peek === false) return ""; const ids = TL.order.filter((id) => { const L = TL.lines[id]; return L && ["pip", "basil", "momo"].includes(L.who) && L.t >= s.t0 - .1 && L.t < s.t1; });
  let who = o.peekWho, tin = s.t0 + 1.2, cur = null; if (!who) { if (!ids.length) return ""; for (const id of ids) if (TL.lines[id].t - .5 <= t) cur = id; if (!cur) cur = ids[0]; who = TL.lines[cur].who;
    const k = ids.indexOf(cur); let j = k; while (j > 0 && TL.lines[ids[j - 1]].who === who) j--; tin = Math.max(tin, j > 0 ? TL.lines[ids[j]].t - .5 : tin); }
  if (t < tin - .05) return ""; const W_ = LCW, x0 = W_.x - W_.w / 2, y1 = W_.y + W_.h / 2, side = typeof o.peekSide === "function" ? o.peekSide(t) : (o.peekSide || "l"), h = o.peekH || 520;
  const up = eo((t - tin) / .45), x = side === "l" ? x0 + 200 : side === "c" ? W_.x : x0 + W_.w - 200, y = y1 + h * .42 + (1 - up) * h * .75, L = cur ? TL.lines[cur] : null;
  const poses = [[tin, "sit"]]; /* EP15: the face listens; a pose only where the scene names its reason (o.peekEv) */ if (o.peekEv) for (const e of o.peekEv) if (e[1] === who) poses.push([e[0], e[2]]); poses.sort((a, b) => a[0] - b[0]);
  return buddy(who, x, y, h, t, { in: tin, poses, peek: true, tag: false, shadow: false, flip: side === "r", nohop: true, watch: o.peekWatch === false ? undefined : W_.x, achieved: o.peekAch }); }   /* EP23: the face WATCHES the thing in the panel (teacher, 25 Nov) */
