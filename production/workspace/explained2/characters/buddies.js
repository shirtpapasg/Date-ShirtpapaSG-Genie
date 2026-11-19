// buddies.js: SVG character rigs for TheOneApp's three pet buddies, redrawn from the app art (characters/app/*.png).
//   Pip the chinchilla, Basil the lizard, Momo the cat.
// Everything returns an SVG string and depends only on its arguments (deterministic: same t, same picture).
// No defs, filters, gradients or ids are needed, so a buddy can be drawn any number of times on a page.
//
//   Buddies.draw(who, x, y, h, t, o)      who: "pip" | "basil" | "momo";  (x, y) = the spot between the feet;  h = height in px
//   Buddies.pip(x, y, h, t, o), Buddies.basil(...), Buddies.momo(...)       shorthands
//   o = { pose: "sit" | "stand" | "lean" | "jump",                 default "sit"
//         expr: "happy" | "cheering" | "shocked" | "thinking" | "smug" | "oops" | "laughing" | "sulking",   default "happy"
//               more: "amazed" | "dreamy" | "shy" | "stern" | "blep" | "zen" | "hyper"   (Buddies.EXTRA_EXPRESSIONS)
//         gesture: "rest" | "pointL" | "pointR" | "wave" | "pawHead" | "cross" | "thumbs" | "cheer" | "chin" | "flare",
//               more: "idea" | "listen" | "peekaboo" | "salute" | "tada" | "please" | "cheek" | "shy"   (Buddies.EXTRA_GESTURES)
//                  default: the expression's own (cheering: cheer, thinking: chin, sulking: cross, oops: pawHead, shocked: flare)
//                  pointL / pointR are SCREEN directions, whatever the facing.
//         hand: "L" | "R"          which screen-side arm does a one-arm gesture (default: the buddy's own habit)
//         facing: "left" | "right" default "right"
//         talking: true            mouth shapes run from t;   mouth: 0..1 sets the opening yourself (e.g. from the voice loudness)
//         blink: false             switches blinking off (default on);   breathe: false switches idle breathing off
//         look: -1..1              Basil: 0 = three-quarter view (far eye on the far top corner of the head), 1 = front view
//                                  (eyes on the upper left and right edges of the head). Default 0; .7 when talking.
//                                  Pip, Momo: how far the face turns to the facing side ( 0 = straight at the viewer, the default
//                                  when talking or when no facing is given; .5 when a facing is given)
//         air: 0..1                jump height for pose "jump" (default: a hop loop from t);   tilt: extra head tilt in degrees
//         shadow: false            no ground shadow;   seed: number, shifts the blink / talk timing so buddies don't move in step }
(function (root) {
  "use strict";
  // engine helpers (same definitions as sau/engine.html; kept inside this closure so nothing clashes on a page)
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = k => { k = clamp(k); return k * k * (3 - 2 * k); };
  const TAU = Math.PI * 2, DEG = Math.PI / 180;
  const n = v => Math.round(v * 10) / 10;
  const hash = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  const LW = 4.5;                     // line weight in rig units (a rig is about 310 units tall)
  const TONGUE = "#F58FA0", MOUTH = "#70364A", GOLD = "#FFD75A";

  /* ---------- drawing primitives ---------- */
  const P = (d, fill, stroke, w = LW, x = "") => `<path d="${d}" fill="${fill || "none"}" ${stroke ? `stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"` : ""} ${x}/>`;
  const E = (cx, cy, rx, ry, fill, stroke, w = LW, x = "") => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill || "none"}" ${stroke ? `stroke="${stroke}" stroke-width="${w}"` : ""} ${x}/>`;
  const Gt = (tr, inner) => `<g transform="${tr}">${inner}</g>`;
  // several shapes as one silhouette: the outline goes round the union
  const U = (shapes, fill, stroke) => `<g fill="${stroke}" stroke="${stroke}" stroke-width="${LW * 2}" stroke-linejoin="round">${shapes}</g><g fill="${fill}">${shapes}</g>`;
  const bez = (p, k) => { const m = 1 - k; return [m * m * m * p[0][0] + 3 * m * m * k * p[1][0] + 3 * m * k * k * p[2][0] + k * k * k * p[3][0], m * m * m * p[0][1] + 3 * m * m * k * p[1][1] + 3 * m * k * k * p[2][1] + k * k * k * p[3][1]]; };
  const sample = (segs, per = 10) => { const pts = []; segs.forEach((s, i) => { for (let j = i ? 1 : 0; j <= per; j++) pts.push(bez(s, j / per)); }); return pts; };
  // a tapering tube along a list of points; wf(k) = half-width at k = 0..1
  function tube(pts, wf, k0 = 0, k1 = 1) {
    const N = pts.length - 1, L = [], R = []; const i0 = Math.round(k0 * N), i1 = Math.round(k1 * N);
    for (let i = i0; i <= i1; i++) { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)], d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = -(b[1] - a[1]) / d, ny = (b[0] - a[0]) / d, w = wf(i / N); L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); R.push([pts[i][0] - nx * w, pts[i][1] - ny * w]); }
    const w1 = wf(i1 / N), f = q => `${n(q[0])} ${n(q[1])}`;
    return `M${L.map(f).join(" L")} A${n(w1)} ${n(w1)} 0 0 0 ${f(R[R.length - 1])} L${R.reverse().map(f).join(" L")}`;
  }
  const star = (x, y, r, fill = GOLD) => `<path transform="translate(${n(x)} ${n(y)})" d="M0 ${-r} Q${r * .18} ${-r * .18} ${r} 0 Q${r * .18} ${r * .18} 0 ${r} Q${-r * .18} ${r * .18} ${-r} 0 Q${-r * .18} ${-r * .18} 0 ${-r}Z" fill="${fill}" stroke="#E0A200" stroke-width="2" stroke-linejoin="round"/>`;

  /* ---------- the three buddies: colours sampled from the app art, shapes in rig units, feet at (0,0), y up = negative ---------- */
  const SPEC = {
    /* Pip: soft grey-lavender chinchilla; huge round ears, bead eyes, white belly, bushy tail, pink nose. Drawn facing the viewer. */
    pip: { H: 330, native: 1, lift: 20, hand: "R", seed: 0.0,
      line: "#646884", fur: "#ADB0C2", shade: "#9497AE", light: "#CBCCD9", belly: "#F5F3F1", paw: "#E0DDE6", lid: "#9C9FB4", inner: "#9998B1", pink: "#F29C9C", eye: "#37324C",
      head: { cx: 0, cy: -192, rx: 106, ry: 82 }, chinY: -112,
      eyes: [{ x: -45, y: -196, r: 16 }, { x: 45, y: -196, r: 16 }], brow: 22,
      mouth: { x: 0, y: -163, hw: 14, cusp: true, oh: 15, rot: 0 }, happyOpen: 0,
      sh: { L: [-80, -112], R: [80, -112] }, armW: 27, reach: 92,
      rest: { sit: { L: [-30, -92], R: [30, -92], bend: 10 }, stand: { L: [-30, -92], R: [30, -92], bend: 10 } },
      chin: { L: [-34, -132], R: [34, -132] }, legs: [[-46, 24], [46, 24]] },
    /* Basil: pale lavender-grey lizard, drawn from the teacher's reference sheet (characters/basil_ref). Three-quarter view, snout to
       the right: the FAR eye sits on the far top corner of the head above the short round snout, the NEAR eye is big and set back,
       a wide flat-topped dome with small bumps runs behind them. look = 1 turns it to the front view (see basilTurn). */
    basil: { H: 300, native: 1, lift: 18, hand: "R", seed: 1.7,
      line: "#6B6486", fur: "#DAD3E2", shade: "#B4AAC6", light: "#EBE5EC", belly: "#F1ECF0", paw: "#DAD3E2", lid: "#C6BDD2", inner: "#B4AAC6", pink: "#F2AEB4", eye: "#3A3349",
      head: { cx: 0, cy: -238, rx: 86, ry: 60 }, chinY: -180,
      eyes: [{ x: -18, y: -251, r: 19.5, sx: 1 }, { x: 57, y: -265, r: 14.5, sx: .68 }], brow: 20, browGap: 10, browK: .8,
      mouth: { x: 40, y: -205, hw: 56, cusp: false, oh: 20, rot: 0, B: [-41, -226], D: [22, -210], F: [72, -236] }, happyOpen: 0,
      sh: { L: [-50, -140], R: [66, -138] }, armW: 24, reach: 88,
      rest: { sit: { L: [-4, -98], R: [36, -102], bend: -16 }, stand: { L: [-4, -98], R: [36, -102], bend: -16 } },
      chin: { L: [-30, -182], R: [46, -180] }, chest: [10, -128], legs: [[-40, 24], [44, 22]] },
    /* Momo: grey-white tabby kitten; pink inner ears, big sparkly eyes, forehead and cheek stripes, white muzzle, chest and paws, striped tail with a white tip. */
    momo: { H: 310, native: 1, lift: 24, hand: "R", seed: 3.1,
      line: "#5F5A78", fur: "#D3CDD5", shade: "#A39DB1", light: "#E2DCE1", belly: "#FAF7F1", paw: "#FAF7F1", lid: "#BDB7C5", inner: "#F0A3AE", pink: "#F08FA0", eye: "#423D5E",
      head: { cx: 0, cy: -194, rx: 106, ry: 80 }, chinY: -116,
      eyes: [{ x: -43, y: -196, r: 23 }, { x: 43, y: -196, r: 23 }], brow: 20,
      mouth: { x: 0, y: -160, hw: 13, cusp: true, oh: 15, rot: 0 }, happyOpen: .38,
      sh: { L: [-36, -98], R: [36, -98] }, shUp: { L: [-64, -104], R: [64, -104] }, armW: 31, reach: 98,
      rest: { sit: { L: [-30, -16], R: [30, -16], bend: 0 }, stand: { L: [-26, -74], R: [26, -74], bend: 12 } },
      chin: { L: [-36, -130], R: [36, -130] }, legs: [[-44, 30], [44, 30]] }
  };

  /* ---------- parts: tails ---------- */
  const TAIL = {
    pip(sp, t) { const a = 2.5 * Math.sin(TAU * t / 2.9);
      return Gt(`rotate(${n(a)} -80 -40)`, P("M-70 -22 C-96 -6 -128 -2 -150 -10 C-160 0 -184 -6 -186 -26 C-206 -30 -216 -54 -204 -70 C-220 -86 -214 -114 -198 -124 C-198 -146 -176 -160 -158 -152 C-140 -158 -122 -140 -134 -122 C-148 -112 -148 -94 -128 -86 C-104 -78 -84 -90 -70 -108 Z", sp.fur, sp.line) + P("M-80 -34 C-110 -18 -160 -22 -178 -52 C-160 -40 -120 -44 -96 -66 Z", sp.shade, null, 0, 'opacity=".55"') +
        P("M-182 -70 C-182 -50 -166 -34 -142 -32 M-160 -92 C-158 -76 -146 -66 -128 -64", null, sp.line, 3, 'opacity=".45"')); },
    // thick curled tail with rows of scales (short arcs), as on the reference sheet
    basil(sp, t) { const a = 1.6 * Math.sin(TAU * t / 3.3);
      const pts = sample([[[34, -40], [-30, -27], [-112, -15], [-152, -42]], [[-152, -42], [-190, -70], [-186, -136], [-146, -152]], [[-146, -152], [-116, -164], [-88, -152], [-87, -124]]], 12);
      const N = pts.length - 1, wf = k => lerp(29, 7, Math.pow(k, 1.9)); let sc = "", edge = "";
      for (let i = 4; i < N - 1; i++) { const a0 = pts[i - 1], b0 = pts[i + 1], d = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), tx = (b0[0] - a0[0]) / d, ty = (b0[1] - a0[1]) / d, nx = -ty, ny = tx, w = wf(i / N), c = pts[i];
        (i % 2 ? [-.52, .08, .62] : [-.24, .36]).forEach(q => { const hw = w * .26, cx = c[0] + nx * w * q, cy = c[1] + ny * w * q;
          sc += `M${n(cx - nx * hw)} ${n(cy - ny * hw)} Q${n(cx + tx * hw * 1.5)} ${n(cy + ty * hw * 1.5)} ${n(cx + nx * hw)} ${n(cy + ny * hw)} `; });
        if (i % 2 && i > 6) { const hw = 4.5, cx = c[0] + nx * (w - 1), cy = c[1] + ny * (w - 1); edge += `<path d="M${n(cx - tx * hw)} ${n(cy - ty * hw)} L${n(cx + nx * 6)} ${n(cy + ny * 6)} L${n(cx + tx * hw)} ${n(cy + ty * hw)}Z"/>`; } }
      return Gt(`rotate(${n(a)} 30 -30)`, U(edge + `<path d="${tube(pts, wf)}"/>`, sp.fur, sp.line) + P(tube(pts, k => wf(k) * .5, .08, .9), sp.light, null, 0, 'opacity=".55"') + P(sc, null, sp.shade, 2.6, 'opacity=".9"')); },
    momo(sp, t) { const a = 3 * Math.sin(TAU * t / 2.6);
      const pts = sample([[[-40, -24], [-110, -2], [-176, -34], [-160, -92]], [[-160, -92], [-152, -122], [-128, -134], [-116, -118]]], 12);
      const wf = k => lerp(19, 15, k); let st = "";
      [.3, .44, .58].forEach(k => { const i = Math.round(k * (pts.length - 1)), a0 = pts[i - 1], b0 = pts[i + 1], d = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), nx = -(b0[1] - a0[1]) / d, ny = (b0[0] - a0[0]) / d, w = wf(k) - 3, c = pts[i]; st += `M${n(c[0] + nx * w)} ${n(c[1] + ny * w)} L${n(c[0] - nx * w * .2)} ${n(c[1] - ny * w * .2)} `; });
      return Gt(`rotate(${n(a)} -40 -24)`, P(tube(pts, wf), sp.fur, sp.line) + P(tube(pts, wf, .72, 1) + "Z", sp.belly) + P(st, null, sp.shade, 7) + P(tube(pts, wf), null, sp.line)); }
  };

  /* ---------- parts: body (the trunk, drawn in the lifted group) and feet (on the ground) ---------- */
  const BODY = {
    pip(sp) { return E(0, -92, 108, 94, sp.fur, sp.line) + P("M-92 -52 C-70 -4 70 -4 92 -52 C70 -22 -70 -22 -92 -52Z", sp.shade, null, 0, 'opacity=".5"') +
        P("M-58 -112 C-74 -70 -62 -18 -30 -8 C-10 -3 10 -3 30 -8 C62 -18 74 -70 58 -112 C44 -128 30 -122 20 -130 C10 -122 -10 -122 -20 -130 C-30 -122 -44 -128 -58 -112Z", sp.belly); },
    // chubby pear body, pale belly turned a little to the snout side
    basil(sp) { return P("M-30 -186 C-56 -166 -70 -122 -77 -76 C-82 -30 -62 -8 -30 -4 C0 0 42 0 66 -6 C92 -16 92 -70 82 -104 C74 -142 58 -168 36 -186 Z", sp.fur, sp.line) +
        P("M-70 -50 C-56 -10 50 -6 78 -40 C60 -22 -50 -24 -70 -50Z", sp.shade, null, 0, 'opacity=".4"') +
        E(20, -88, 47, 78, sp.belly) + E(22, -100, 30, 50, "#fff", null, 0, 'opacity=".45"'); },
    momo(sp) { return P("M-50 -140 C-98 -112 -96 -22 -74 -6 C-40 2 40 2 74 -6 C96 -22 98 -112 50 -140 Z", sp.fur, sp.line) +
        P("M-88 -84 q16 2 26 12 M-90 -60 q18 0 30 10 M-86 -36 q16 0 26 8 M88 -84 q-16 2 -26 12 M90 -60 q-18 0 -30 10 M86 -36 q-16 0 -26 8", null, sp.shade, 7) +
        P("M-40 -128 C-52 -98 -46 -72 -30 -60 L-22 -68 L-12 -48 L0 -60 L12 -48 L22 -68 L30 -60 C46 -72 52 -98 40 -128 Z", sp.belly); }
  };
  const FEET = {
    pip(sp, lift) { const f = s => E(s * 46, -8, 25, 11, sp.paw, sp.line) + P(`M${s * 40} -4 v-7 M${s * 52} -4 v-7`, null, sp.line, 3, 'opacity=".6"'); return f(-1) + f(1); },
    basil(sp, lift) { const fan = `<ellipse cx="-42" cy="-9" rx="19" ry="10"/><path d="M-56 -8 L-68 -1 M-50 -6 L-56 3 M-40 -6 L-38 4 M-30 -8 L-20 0" stroke-width="${9 + LW * 2}" stroke-linecap="round"/>`;
      const foot = `<g stroke="${sp.line}" fill="${sp.line}" stroke-width="${LW * 2}">${fan}</g><g stroke="${sp.fur}" fill="${sp.fur}" stroke-width="0">${fan.replace(/stroke-width="[\d.]+"/, 'stroke-width="9"')}</g>`;
      return (lift ? "" : E(-46, -46, 31, 33, sp.fur, sp.line) + P("M-66 -62 q7 7 14 0 M-50 -62 q7 7 14 0 M-58 -48 q7 7 14 0 M-42 -48 q7 7 14 0 M-66 -34 q7 7 14 0 M-50 -34 q7 7 14 0", null, sp.shade, 2.6)) + foot; },
    momo(sp, lift) { const f = s => E(s * 70, -9, 25, 12, sp.paw, sp.line) + P(`M${s * 64} -5 v-7 M${s * 76} -5 v-7`, null, sp.line, 3, 'opacity=".5"'); return f(-1) + f(1); }
  };
  // Basil's far leg: a hip bump and a foot that peek out behind the body
  function basilFar(sp, lift) { const toes = `<ellipse cx="74" cy="-10" rx="18" ry="9"/><path d="M84 -12 L99 -12 M84 -8 L98 -3 M80 -6 L90 2" stroke-width="${8 + LW * 2}" stroke-linecap="round"/>`;
    return (lift ? "" : E(70, -46, 24, 30, sp.shade, sp.line)) + `<g stroke="${sp.line}" fill="${sp.line}" stroke-width="${LW * 2}">${toes}</g><g stroke="${sp.fur}" fill="${sp.fur}" stroke-width="0">${toes.replace(/stroke-width="[\d.]+"/, 'stroke-width="8"')}</g>`; }
  // short legs that show when a buddy stands up
  function legs(sp, lift) { if (!lift) return ""; return sp.legs.map(([x, w]) => `<path d="M${x} ${-lift - 14} V-10" stroke="${sp.line}" stroke-width="${w + LW * 2}" stroke-linecap="round"/><path d="M${x} ${-lift - 14} V-10" stroke="${sp.fur}" stroke-width="${w}" stroke-linecap="round"/>`).join(""); }

  /* ---------- Basil's head outline: 12 points, clockwise from the snout tip (three-quarter, S) / the right cheek (front, F) ---------- */
  const BH = {
    S: [[86, -241], [78, -263], [61, -284], [34, -293], [2, -298], [-36, -293], [-66, -273], [-82, -240], [-72, -204], [-36, -183], [18, -178], [66, -196]],
    F: [[90, -224], [77, -257], [54, -282], [27, -294], [0, -299], [-27, -294], [-54, -282], [-77, -257], [-90, -224], [-62, -190], [0, -179], [62, -190]],
    // bump size on the stretch after each point
    bS: [0, 0, 3, 4, 4.6, 6, 7, 7, 6, 3.4, 0, 0],
    bF: [5.5, 0, 3, 4, 4, 3, 0, 5.5, 6.5, 3.4, 3.4, 6.5],
    spots: [[[22, -283], [10, -286], 5], [[0, -287], [-10, -285], 5.5], [[-22, -281], [0, -272], 4.5], [[36, -272], [14, -264], 3.6], [[10, -271], [-13, -264], 3.6], [[-46, -266], [0, -258], 4]] };
  // a smooth closed curve through points, as cubic segments
  function spline(A) { const N = A.length, g = i => A[(i + N) % N], segs = [];
    for (let i = 0; i < N; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2); segs.push([p1, [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], p2]); }
    return segs; }
  const segPath = segs => `M${n(segs[0][0][0])} ${n(segs[0][0][1])}` + segs.map(s => ` C${n(s[1][0])} ${n(s[1][1])} ${n(s[2][0])} ${n(s[2][1])} ${n(s[3][0])} ${n(s[3][1])}`).join("");

  /* ---------- parts: head without the face ---------- */
  const HEAD = {
    pip(sp) { const ear = s => E(s * 90, -270, 55, 58, sp.fur, sp.line) + E(s * 88, -266, 40, 43, sp.inner) + E(s * 82, -256, 26, 28, "#BFA9B8", null, 0, 'opacity=".55"') +
        P(`M${s * 50} -238 C${s * 54} -252 ${s * 62} -260 ${s * 72} -262 C${s * 68} -254 ${s * 72} -248 ${s * 80} -246 C${s * 72} -240 ${s * 70} -234 ${s * 74} -226 C${s * 64} -226 ${s * 56} -230 ${s * 50} -238Z`, sp.belly, sp.line, 2.5);
      return ear(-1) + ear(1) + E(0, -192, 106, 82, sp.fur, sp.line) + E(0, -164, 48, 30, sp.light); },
    // Basil's head. One smooth closed curve through 12 points (BH.S three-quarter, BH.F front view; sp.turn blends them), small soft
    // bumps along the crown and the back of the head, the pale throat under the smile, crown spots, eye sockets, nostrils.
    basil(sp) { const f = sp.turn || 0, jaw = sp.jaw || 0, M = sp.mouth, L2 = (a, b) => [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
      const A = BH.S.map((p, i) => { const q = L2(p, BH.F[i]); if (i >= 9) q[1] += jaw * (i === 10 ? 1 : .6); return q; });
      const segs = spline(A), d = segPath(segs); let fr = "";
      segs.forEach((s, i) => { const z = lerp(BH.bS[i], BH.bF[i], f); if (z < 1.2) return;
        [.17, .5, .83].forEach(k => { const p = bez(s, k), q = bez(s, k + .02), tl = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1, tx = (q[0] - p[0]) / tl, ty = (q[1] - p[1]) / tl, nx = -ty, ny = tx, b = z * 1.25, h = z * .95;
          fr += `<path d="M${n(p[0] - tx * b - nx * 2)} ${n(p[1] - ty * b - ny * 2)} L${n(p[0] + nx * h)} ${n(p[1] + ny * h)} L${n(p[0] + tx * b - nx * 2)} ${n(p[1] + ty * b - ny * 2)}Z"/>`; }); });
      let out = U(fr + `<path d="${d}Z"/>`, sp.fur, sp.line);
      // pale throat: from the smile line down to just inside the jaw
      const B = M.B, D = M.D, Fp = M.F, C = [2 * D[0] - (B[0] + Fp[0]) / 2, 2 * D[1] - (B[1] + Fp[1]) / 2], ins = (p, k = .88) => [n(p[0] * k), n(-238 + (p[1] + 238) * k)];
      const i8 = ins(A[8], .86), i9 = ins(A[9]), i10 = ins(A[10]), i11 = ins(A[11]), i0 = ins(A[0], .9);
      out += P(`M${n(B[0] - 14)} ${n(B[1] - 2)} L${n(B[0])} ${n(B[1])} Q${n(C[0])} ${n(C[1])} ${n(Fp[0])} ${n(Fp[1])} Q${lerp(i0[0], i0[0], f)} ${i0[1]} ${i11[0]} ${i11[1]} Q${n((i11[0] + i10[0]) / 2 + 6)} ${n(i10[1] + 3)} ${i10[0]} ${i10[1]} Q${n((i9[0] + i10[0]) / 2 - 8)} ${n(i10[1] + 2)} ${i9[0]} ${i9[1]} Q${i8[0]} ${i8[1]} ${n(B[0] - 14)} ${n(B[1] - 2)}Z`, sp.belly, null, 0, 'opacity=".85"');
      // light snout top, crown spots, the darker ear spot at the back
      out += E(lerp(52, 0, f), lerp(-250, -240, f), lerp(24, 26, f), lerp(11, 12, f), sp.light, null, 0, `opacity="${n(lerp(.8, .4, f))}"`);
      BH.spots.forEach(([a, b, r]) => { const p = L2(a, b); out += E(p[0], p[1], r, r * .7, sp.shade, null, 0, 'opacity=".7"'); });
      out += E(lerp(-62, -84, f), lerp(-246, -240, f), lerp(6, 2, f), 9, sp.shade, null, 0, `opacity="${n(.85 * (1 - f))}"`);
      // eye sockets (a paler rim) and the brow ridge over each eye
      sp.eyes.forEach(e => { const rx = e.r * (e.sx || 1); out += E(e.x, e.y, rx + 4, e.r + 4, sp.light) + P(`M${n(e.x - rx - 5)} ${n(e.y - e.r * .5)} Q${n(e.x)} ${n(e.y - e.r * 1.75)} ${n(e.x + rx + 5)} ${n(e.y - e.r * .5)}`, null, sp.shade, 3, 'opacity=".8"'); });
      const n1 = L2([60, -241], [13, -227]), n2 = L2([38, -235], [-13, -227]);
      return out + E(n1[0], n1[1], lerp(1.8, 2.6, f), 2.6, sp.line) + E(n2[0], n2[1], 2.6, 2.6, sp.line); },
    momo(sp) { const ear = s => P(`M${s * 100} -212 C${s * 100} -250 ${s * 96} -286 ${s * 88} -304 Q${s * 84} -312 ${s * 76} -306 C${s * 54} -292 ${s * 34} -278 ${s * 20} -262 Z`, sp.fur, sp.line) +
        P(`M${s * 90} -232 C${s * 90} -256 ${s * 88} -276 ${s * 83} -290 C${s * 66} -280 ${s * 50} -268 ${s * 40} -256 Z`, sp.inner);
      return ear(-1) + ear(1) + P("M-70 -262 C-100 -242 -110 -208 -102 -182 L-116 -170 L-98 -162 C-84 -128 -42 -114 0 -114 C42 -114 84 -128 98 -162 L116 -170 L102 -182 C110 -208 100 -242 70 -262 C40 -278 -40 -278 -70 -262 Z", sp.fur, sp.line) +
        P("M0 -271 L-5 -244 L5 -244Z M-24 -268 L-25 -246 L-16 -248Z M24 -268 L25 -246 L16 -248Z", sp.shade, sp.shade, 5) +
        P("M-102 -200 L-78 -196 M-100 -182 L-80 -182 M102 -200 L78 -196 M100 -182 L80 -182", null, sp.shade, 7) +
        P("M-46 -158 C-46 -180 -20 -186 0 -182 C20 -186 46 -180 46 -158 C46 -134 20 -124 0 -124 C-20 -124 -46 -134 -46 -158Z", sp.belly); }
  };

  /* ---------- parts: paws, drawn at the end of an arm; +x points along the arm ---------- */
  const PAW = {
    pip(sp, f) { if (f.point) return U(`<circle cx="3" cy="0" r="13"/><rect x="6" y="-5" width="24" height="10" rx="5"/>`, sp.paw, sp.line);
      if (f.pad) return U(`<circle cx="4" cy="0" r="14"/><circle cx="17" cy="-10" r="5"/><circle cx="21" cy="-2" r="5"/><circle cx="20" cy="7" r="5"/><circle cx="14" cy="14" r="5"/>`, sp.paw, sp.line) + E(6, 0, 6, 6, sp.pink, null, 0, 'opacity=".7"');
      return E(3, 0, 13.5, 13, sp.paw, sp.line) + P("M11 -5 h6 M11 4 h6", null, sp.line, 2.6, 'opacity=".6"'); },
    basil(sp, f) { const fin = (a, len) => `<path d="M${n(8 * Math.cos(a * DEG))} ${n(8 * Math.sin(a * DEG))} L${n((10 + len) * Math.cos(a * DEG))} ${n((10 + len) * Math.sin(a * DEG))}" stroke-linecap="round"/>`;
      const fs = f.point ? fin(-38, 5) + fin(0, 24) + fin(34, 5) + fin(62, 4) : f.pad ? fin(-62, 15) + fin(-22, 19) + fin(18, 19) + fin(58, 15) : fin(-42, 10) + fin(-14, 13) + fin(14, 13) + fin(42, 10);
      return `<g stroke="${sp.line}" stroke-width="${9 + LW * 2}" fill="${sp.line}"><circle cx="2" cy="0" r="10.5"/>${fs}</g><g stroke="${sp.fur}" stroke-width="9" fill="${sp.fur}"><circle cx="2" cy="0" r="10.5"/>${fs}</g>` +
        (f.pad ? E(3, 0, 5, 5, sp.pink, null, 0, 'opacity=".8"') + [[-62, 15], [-22, 19], [18, 19], [58, 15]].map(([a, l]) => E((9 + l) * Math.cos(a * DEG), (9 + l) * Math.sin(a * DEG), 2.6, 2.6, sp.pink, null, 0, 'opacity=".8"')).join("") : ""); },
    momo(sp, f) { if (f.pad) return E(6, 0, 19, 18, sp.paw, sp.line) + E(2, 0, 7.5, 9, sp.pink) + E(14, -10, 3.6, 4.2, sp.pink) + E(18, -1, 3.6, 4.2, sp.pink) + E(15, 9, 3.6, 4.2, sp.pink);
      if (f.point) return U(`<ellipse cx="6" cy="0" rx="18" ry="15"/><ellipse cx="22" cy="-2" rx="11" ry="7.5"/>`, sp.paw, sp.line);
      return E(5, 0, 18, 16, sp.paw, sp.line) + P("M15 -6 h7 M15 5 h7", null, sp.line, 2.6, 'opacity=".5"'); }
  };
  function arm(sp, who, S, Pw, bend, f = {}) {
    const dx = Pw[0] - S[0], dy = Pw[1] - S[1], L = Math.hypot(dx, dy) || 1, C = [(S[0] + Pw[0]) / 2 - dy / L * bend, (S[1] + Pw[1]) / 2 + dx / L * bend];
    const d = `M${n(S[0])} ${n(S[1])} Q${n(C[0])} ${n(C[1])} ${n(Pw[0])} ${n(Pw[1])}`, ang = Math.atan2(Pw[1] - C[1], Pw[0] - C[0]) / DEG, w = sp.armW;
    // the last bit of a cat's leg is white (a sock); a fur blob hides the shoulder end of the outline
    return `<path d="${d}" fill="none" stroke="${sp.line}" stroke-width="${w + LW * 2}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${sp.fur}" stroke-width="${w}" stroke-linecap="round"/>` +
      E(S[0] * .9, S[1] + 3, w / 2 + LW, w / 2 + LW, sp.fur) + Gt(`translate(${n(Pw[0])} ${n(Pw[1])}) rotate(${n(ang)}) scale(${f.big || 1})`, PAW[who](sp, f));
  }

  /* ---------- gestures: where each paw goes. s = -1 for the screen-left arm of the unflipped rig, +1 for the right ---------- */
  const GEST = {
    point: (sp, S, s) => ({ P: [S[0] + s * sp.reach, S[1] - 20], bend: s * -5, f: { point: 1 } }),
    wave: (sp, S, s, t) => { const a = (34 + 17 * Math.sin(TAU * 2.1 * t)) * DEG; return { P: [S[0] + s * sp.reach * Math.sin(a), S[1] - sp.reach * Math.cos(a)], bend: s * 10, f: { pad: 1 } }; },
    pawHead: (sp, S, s) => ({ P: [s * sp.head.rx * .46 + (sp.head.cx || 0), sp.head.cy - sp.head.ry * .8], bend: s * -34, front: 1, f: {} }),
    cross: (sp, S, s) => ({ P: [-S[0] * .5, S[1] + 28 + s * 6], bend: s * -8, front: 1, f: {} }),
    thumbs: (sp, S, s, t) => ({ P: [S[0] + s * sp.reach * .8, S[1] - sp.reach * .52], bend: s * 12, f: { pad: 1, big: 1.25 }, star: 1 }),
    cheer: (sp, S, s, t) => ({ P: [S[0] + s * sp.reach * .62, S[1] - sp.reach * .82 - 5 * Math.sin(TAU * 2.4 * t + s)], bend: s * 8, f: { pad: 1 } }),
    chin: (sp, S, s) => ({ P: sp.chin[s < 0 ? "L" : "R"], bend: s * 22, front: 1, f: {} }),
    flare: (sp, S, s) => ({ P: [S[0] + s * sp.reach * .72, S[1] - 14], bend: s * 4, f: { pad: 1 } }),
    // from the teacher's second reference sheets
    idea: (sp, S, s) => ({ P: [S[0] + s * sp.reach * .42, S[1] - sp.reach * .98], bend: s * 12, f: { point: 1 }, star: 1 }),
    listen: (sp, S, s) => ({ P: [sp.head.cx + s * (sp.head.rx + 4), sp.head.cy + 4], bend: s * 16, f: { pad: 1 } }),
    peekaboo: (sp, S, s) => { const e = sp.eyes[s < 0 ? 0 : 1]; return { P: [e.x - s * 2, e.y + 6], bend: s * 30, front: 1, f: { pad: 1, big: 1.15 } }; },
    salute: (sp, S, s) => { const e = sp.eyes[s < 0 ? 0 : 1]; return { P: [e.x + s * e.r * .5, e.y - e.r - 9], bend: s * 34, front: 1, f: {} }; },
    tada: (sp, S, s, t) => ({ P: [S[0] + s * sp.reach * .92, S[1] - sp.reach * .5 - 3 * Math.sin(TAU * 1.2 * t + s)], bend: s * 8, f: { pad: 1 } }),
    please: (sp, S, s) => { const c = sp.chest || [0, S[1] + 18]; return { P: [c[0] + s * 9, c[1]], bend: s * -16, front: 1, f: {} }; },
    cheek: (sp, S, s) => { const c = sp.chin[s < 0 ? "L" : "R"]; return { P: [c[0] + s * 16, c[1] - 10], bend: s * 20, front: 1, f: { pad: 1 } }; },
    shy: (sp, S, s) => ({ P: [sp.mouth.x + s * 13, sp.mouth.y + (sp.mouth.B ? 4 : 10)], bend: s * 24, front: 1, f: {} })
  };
  const BOTH = { cross: 1, cheer: 1, flare: 1, tada: 1, please: 1, shy: 1 };

  /* ---------- expressions ---------- */
  // eyes: type open | arc | squeeze | wide; lid 0..1; slant >0 cross, <0 worried; brows [left, right] as [angle, raise] or null
  const EXPR = {
    happy:    { eyes: { type: "open" }, mouth: "smile", tilt: 0 },
    cheering: { eyes: { type: "arc" }, mouth: "laugh", m: .75, tilt: -2, gesture: "cheer", blush: 1, stars: 1 },
    shocked:  { eyes: { type: "wide" }, brows: [[-8, 9], [-8, 9]], mouth: "o", m: .8, tilt: 0, gesture: "flare", dashes: 1 },
    thinking: { eyes: { type: "open", lid: .16, dx: .28, dy: -.3 }, brows: [[4, 0], [-14, 8]], mouth: "flat", tilt: 6, gesture: "chin" },
    smug:     { eyes: { type: "open", lid: .46 }, brows: [[6, -2], [-12, 5]], mouth: "smirk", tilt: -5 },
    oops:     { eyes: { type: "open", lid: .12, slant: -10, right: "squeeze" }, brows: [[-16, 4], [-16, 4]], mouth: "wobble", tilt: 5, gesture: "pawHead", sweat: 1, blush: 1 },
    laughing: { eyes: { type: "squeeze" }, mouth: "laugh", m: 1, tilt: -4, shake: 1, blush: 1 },
    sulking:  { eyes: { type: "open", lid: .4, slant: 16, dx: -.25, dy: .1 }, brows: [[18, -3], [18, -3]], mouth: "pout", tilt: 5, gesture: "cross", puff: 1 },
    // extras, from the teacher's reference sheets
    amazed:   { eyes: { type: "open", dy: -.2 }, brows: [[-6, 8], [-6, 8]], mouth: "laugh", m: .8, tilt: -3, gesture: "wave" },
    dreamy:   { eyes: { type: "closed" }, mouth: "smile", tilt: -3, gesture: "cheek", blush: 1 },
    shy:      { eyes: { type: "open", lid: .1, dx: .3, dy: .5 }, mouth: "smile", tilt: 6, gesture: "shy", blush: 1 },
    stern:    { eyes: { type: "open", lid: .3, slant: 16 }, brows: [[18, -3], [18, -3]], mouth: "line", tilt: 0, gesture: "cross" },
    blep:     { eyes: { type: "open" }, mouth: "blep", tilt: 7, blush: 1 },
    zen:      { eyes: { type: "closed" }, mouth: "smile", tilt: 0 },
    hyper:    { eyes: { type: "open" }, brows: [[-6, 8], [-6, 8]], mouth: "laugh", m: 1, tilt: 0, gesture: "tada", shake: 1, dashes: 1, blush: 1 }
  };
  // Basil's own head tilt per expression, in degrees (minus = snout up), as on his reference sheet
  const BT = { happy: 0, cheering: -9, shocked: -5, thinking: -11, smug: -5, oops: 6, laughing: -9, sulking: 5, amazed: -11, dreamy: -4, shy: 9, stern: 2, blep: -3, zen: 0, hyper: -4 };

  const EYE = {
    pip: (sp, r) => E(0, 0, r, r, sp.eye) + E(-r * .3, -r * .36, r * .32, r * .32, "#fff") + E(r * .34, r * .32, r * .15, r * .15, "#fff", null, 0, 'opacity=".8"'),
    basil: (sp, r) => E(0, 0, r, r, sp.eye, sp.line, 3.5) + E(0, 0, r * .68, r * .68, null, "#7A6676", r * .16, 'opacity=".8"') + E(-r * .3, -r * .34, r * .3, r * .3, "#fff") + E(r * .36, r * .3, r * .13, r * .13, "#fff", null, 0, 'opacity=".85"'),
    momo: (sp, r) => E(0, 0, r, r, sp.eye, sp.line, 3.5) + P(`M${-r * .78} ${r * .28} Q0 ${r * .02} ${r * .78} ${r * .28} Q${r * .5} ${r * .92} 0 ${r * .92} Q${-r * .5} ${r * .92} ${-r * .78} ${r * .28}Z`, "#9DB9D6", null, 0, 'opacity=".9"') +
      E(-r * .3, -r * .36, r * .33, r * .33, "#fff") + E(r * .38, r * .12, r * .14, r * .14, "#fff") + E(r * .1, r * .58, r * .08, r * .08, "#fff") + E(-r * .34, r * .5, r * .06, r * .06, "#fff") + E(r * .2, -r * .56, r * .07, r * .07, "#DDEBFF")
  };
  function eye(sp, who, e, s, st, blinkK) {
    const r = e.r; let type = (s > 0 && st.right) || st.type || "open", lid = Math.max(st.lid || 0, type === "open" || type === "wide" ? blinkK : 0), out = "";
    const lw = LW * 1.15;
    if (type === "arc") out = P(`M${-r * .95} ${r * .3} Q0 ${-r * 1.0} ${r * .95} ${r * .3}`, null, sp.line, lw);
    else if (type === "squeeze") out = P(s < 0 ? `M${-r * .8} ${-r * .6} L${r * .7} 0 L${-r * .8} ${r * .6}` : `M${r * .8} ${-r * .6} L${-r * .7} 0 L${r * .8} ${r * .6}`, null, sp.line, lw);
    else if (lid >= .9 || type === "closed") out = P(`M${-r * .95} ${r * .05} Q0 ${r * .75} ${r * .95} ${r * .05}`, null, sp.line, lw);
    else {
      if (type === "wide") { const R = Math.max(r * 1.12, 17); out = E(0, 0, R, R, "#fff", sp.line, 3.5) + E(0, 0, R * .5, R * .5, sp.eye) + E(-R * .16, -R * .18, R * .16, R * .16, "#fff"); }
      else out = Gt(`translate(${n((st.dx || 0) * r * .35)} ${n((st.dy || 0) * r * .35)})`, EYE[who](sp, r));
      if (lid > .02) { const R = (type === "wide" ? Math.max(r * 1.12, 17) : r) + 2.4, y = -R + 2 * R * lid, hw = Math.sqrt(Math.max(0, R * R - y * y));
        out += Gt(`rotate(${n(-s * -(st.slant || 0))})`, P(`M${n(-hw)} ${n(y)} A${n(R)} ${n(R)} 0 ${lid > .5 ? 1 : 0} 1 ${n(hw)} ${n(y)} Z`, sp.lid, sp.line, 3.2)); }
    }
    return Gt(`translate(${n(e.x)} ${n(e.y)})` + (e.sx && e.sx !== 1 ? ` scale(${e.sx.toFixed(3)} 1)` : ""), out);
  }
  function brow(sp, e, s, b) { if (!b) return ""; const len = Math.max(e.r * .95, 13) * (e.sx ? Math.max(e.sx, .8) : 1), y = -Math.max(e.r, 15) - (sp.browGap || 9) - b[1] * (sp.browK || 1);
    return Gt(`translate(${n(e.x)} ${n(e.y + y)}) rotate(${n(s * -b[0])})`, P(`M${-len} 0 Q0 -4 ${len} 0`, null, sp.line, LW)); }

  // Basil's mouth: a wide smile line from the back corner B through the low point D to the front corner F (head units)
  function basilMouth(sp, type, m) { const M = sp.mouth, f = sp.turn || 0, B = M.B, D = M.D, F = M.F, mid = [(B[0] + F[0]) / 2, (B[1] + F[1]) / 2], C = [2 * D[0] - mid[0], 2 * D[1] - mid[1]];
    const at = k => [lerp(B[0], F[0], k), lerp(B[1], F[1], k)], q = (a, c, b) => `M${n(a[0])} ${n(a[1])} Q${n(c[0])} ${n(c[1])} ${n(b[0])} ${n(b[1])}`;
    const tickB = ` M${n(B[0] + 2)} ${n(B[1] + 2)} q-6 -2 -7 -9`, tickF = f > .45 ? ` M${n(F[0] - 2)} ${n(F[1] + 2)} q6 -2 7 -9` : "", smile = q(B, C, F) + tickB + tickF;
    const tongue = (x, y, rx, ry) => E(x, y, rx, ry, TONGUE);
    if (type === "open" || type === "laugh") { const H = type === "laugh" ? 9 + m * M.oh * 1.15 : 4 + m * M.oh, Cu = [lerp(C[0], mid[0], .3), lerp(C[1], mid[1], .3)], Du = [(Cu[0] + mid[0]) / 2, (Cu[1] + mid[1]) / 2], Cl = [C[0], C[1] + H * 2];
      return P(`${q(B, Cu, F)} Q${n(Cl[0])} ${n(Cl[1])} ${n(B[0])} ${n(B[1])}Z`, MOUTH, sp.line, 3.8) + (m > .4 || type === "laugh" ? tongue(lerp(Du[0], F[0], .08), Du[1] + H * .68, Math.abs(F[0] - B[0]) * .2, H * .26) : "") + P(q(B, Cu, F) + tickB + tickF, null, sp.line); }
    if (type === "o") { const p = [lerp(D[0], F[0], .32 * (1 - f)), lerp(D[1], F[1], .32 * (1 - f)) - 1]; return E(p[0], p[1], 8 + 3 * m, 9 + 6 * m, MOUTH, sp.line, 3.5); }
    if (type === "smirk") return P(`M${n(B[0])} ${n(B[1] - 5)} Q${n(lerp(C[0], mid[0], .35))} ${n(lerp(C[1], mid[1], .35) + 2)} ${n(F[0])} ${n(F[1])} M${n(B[0] + 2)} ${n(B[1] - 3)} q-7 -3 -7 -11`, null, sp.line);
    if (type === "pout") { const a = at(.2), b = at(.86); return P(q([a[0], a[1] + 12], [mid[0] + 4, mid[1] - 3], [b[0], b[1] + 12]), null, sp.line); }
    if (type === "wobble") { const a = at(.14), b = at(.88), w = (b[0] - a[0]) / 4, sl = (b[1] - a[1]) / 4; let dd = `M${n(a[0])} ${n(a[1] + 9)}`; for (let i = 0; i < 4; i++) dd += ` q${n(w / 2)} ${n(sl / 2 + (i % 2 ? 8 : -8))} ${n(w)} ${n(sl)}`; return P(dd, null, sp.line); }
    if (type === "line") { const a = at(.16), b = at(.86); return P(`M${n(a[0])} ${n(a[1] + 9)} L${n(b[0])} ${n(b[1] + 9)}`, null, sp.line); }
    if (type === "flat") return P(q(B, [lerp(C[0], mid[0], .5), lerp(C[1], mid[1], .5) + 1], at(.9)) + tickB, null, sp.line);   // thoughtful: a small closed smile
    if (type === "blep") { const k = lerp(.62, .5, f), u = 1 - k, p = [u * u * B[0] + 2 * u * k * C[0] + k * k * F[0], u * u * B[1] + 2 * u * k * C[1] + k * k * F[1]];
      return P(`M${n(p[0] - 8)} ${n(p[1] - 1)} C${n(p[0] - 9)} ${n(p[1] + 15)} ${n(p[0] + 9)} ${n(p[1] + 15)} ${n(p[0] + 8)} ${n(p[1] - 1)}Z`, TONGUE, "#D97A80", 2.6) + P(smile, null, sp.line); }
    return P(smile, null, sp.line); }
  function mouth(sp, type, m) {
    if (sp.mouth.B) return basilMouth(sp, type, m);
    if (type === "line") type = "flat";
    const M = sp.mouth, hw = M.hw, c = M.cusp; let out = "";
    const smile = c ? `M${-hw} -2 Q${-hw / 2} ${hw * .62} 0 0 Q${hw / 2} ${hw * .62} ${hw} -2` : `M${-hw} -3 Q${-hw * .1} ${hw * .34} ${hw} -9 q7 -1 8 -9`;
    const tongue = (cy, rx, ry) => E(0, cy, rx, ry, TONGUE);
    if (type === "open") { const H = 5 + m * M.oh, a = c ? hw * .66 : hw * .92;
      out = c ? P(`M${-a} 3 Q0 ${3 + H * 2.1} ${a} 3 Q0 ${hw * .2} ${-a} 3Z`, MOUTH, sp.line, 3.5) + (m > .45 ? tongue(3 + H * .68, a * .36, H * .2) : "") + P(smile, null, sp.line)
        : P(`M${-hw} -3 Q${-hw * .1} ${hw * .34} ${hw} -9 Q${hw * .1} ${hw * .34 + H * 2.1} ${-hw} -3Z`, MOUTH, sp.line, 3.5) + (m > .45 ? Gt(`translate(${-hw * .05} 0)`, tongue(hw * .12 + H * .78, hw * .34, H * .2)) : "") + P(smile, null, sp.line); }
    else if (type === "laugh") { const D = 10 + m * M.oh * 1.25, a = c ? hw * 1.05 : hw * .9, y0 = c ? 2 : -4;
      out = P(`M${-a} ${y0} Q0 ${y0 + 5} ${a} ${y0 - (c ? 0 : 4)} C${a} ${y0 + D * 1.1} ${a * .5} ${y0 + D * 1.25} 0 ${y0 + D * 1.25} C${-a * .5} ${y0 + D * 1.25} ${-a} ${y0 + D * 1.1} ${-a} ${y0}Z`, MOUTH, sp.line, 3.8) + tongue(y0 + D * .98, a * .5, D * .22) + (c ? "" : P(`M${hw * .9} -8 q7 -1 8 -9`, null, sp.line)); }
    else if (type === "o") { const rx = (c ? 6 : 9) + 3 * m, ry = (c ? 8 : 10) + 6 * m; out = Gt(`translate(${c ? 0 : -hw * .45} ${c ? 9 : 4})`, E(0, 0, rx, ry, MOUTH, sp.line, 3.5)) + (c ? "" : ""); }
    else if (type === "smirk") out = P(c ? `M${-hw * .8} 4 Q${hw * .2} 10 ${hw * 1.1} -6` : `M${-hw} -1 Q${hw * .3} 4 ${hw} -12 q8 -2 8 -11`, null, sp.line);
    else if (type === "pout") out = P(c ? `M-10 10 Q0 1 10 10` : `M${-hw} 2 Q${-hw * .2} ${-hw * .2} ${hw * .9} 0`, null, sp.line);
    else if (type === "wobble") { const q = (c ? hw * 1.6 : hw * 1.8) / 4; out = P(`M${-2 * q} ${c ? 6 : 0} q${q / 2} -7 ${q} 0 t${q} 0 t${q} 0 t${q} 0`, null, sp.line); }
    else if (type === "flat") out = P(c ? `M-4 7 L12 5` : `M${-hw * .9} -2 L${hw * .7} -5`, null, sp.line);
    else if (type === "blep") out = P(`M-6 ${c ? 5 : 4} C-7 ${c ? 19 : 18} 7 ${c ? 19 : 18} 6 ${c ? 5 : 4}Z`, TONGUE, "#D97A80", 2.4) + P(smile, null, sp.line);
    else out = P(smile, null, sp.line);
    // the nose stem of a cat mouth
    return Gt(`translate(${M.x} ${M.y}) rotate(${M.rot})`, out);
  }
  // talking: a run of mouth openings, about 5.5 a second, held then snapped, with short rests
  function talkM(t, seed) { const u = t * 5.6 + seed * 3.7, i = Math.floor(u), f = u - i, L = [.2, .6, 1, .4, .85, 0, .7, .3, .95, .1];
    const lv = j => (hash(Math.floor(j / 9) + seed) < .22 && j % 9 > 6) ? 0 : L[Math.floor(hash(j * 1.3 + seed) * L.length)];
    return lerp(lv(i), lv(i + 1), ease((f - .55) / .45)); }
  const blinkK = (t, seed) => { const T = 3.3 + (seed % 1) * .9, u = ((t + seed * 1.37) % T + T) % T, d = .15; const second = (u > .34 && u < .34 + d && hash(Math.floor((t + seed * 1.37) / T) + seed) > .7);
    return u < d ? Math.sin(Math.PI * u / d) : second ? Math.sin(Math.PI * (u - .34) / d) : 0; };

  // which mouth shape, and how open, at time t
  function mouthState(sp, ex, t, o) { let mt = ex.mouth, m = ex.m || 0;
    if (mt === "smile" && sp.happyOpen) { mt = "open"; m = sp.happyOpen; }
    const tm = o.mouth != null ? clamp(o.mouth) : o.talking ? talkM(t, o.seed) : null;
    if (tm != null) { if (tm < .1) { if (mt === "open" || mt === "laugh" || mt === "o") mt = "smile"; } else if (ex.mouth === "laugh") { m = .35 + tm * .65; } else if (ex.mouth === "o") { m = tm; }
      else { mt = (hash(Math.floor(t * 5.6 + o.seed * 3.7) * 2.1) < .2 && o.mouth == null) ? "o" : "open"; m = tm; } }
    return [mt, m]; }
  function face(sp, who, ex, t, o) {
    const E0 = sp.eyes, st = ex.eyes, bk = o.blink === false ? 0 : (blinkK(t, o.seed) > .5 ? 1 : blinkK(t, o.seed) * 1.6);
    const [mt, m] = mouthState(sp, ex, t, o);
    let out = "";
    // cheeks
    const bl = ex.blush ? .62 : .38, by = sp.mouth.y - 8;
    if (who === "basil") { const f = sp.turn || 0; out += E(lerp(-52, -70, f), lerp(-218, -214, f), 12, 7, sp.pink, null, 0, `opacity="${bl}"`) + (f > .3 ? E(70, -214, 12, 7, sp.pink, null, 0, `opacity="${n(bl * (f - .3) / .7)}"`) : ""); }
    else out += E(-sp.eyes[1].x - 24, by, 15, 9, sp.pink, null, 0, `opacity="${bl}"`) + E(sp.eyes[1].x + 24, by, 15, 9, sp.pink, null, 0, `opacity="${bl}"`);
    if (ex.puff) out += who === "basil" ? "" : "";
    out += eye(sp, who, E0[0], -1, st, bk) + eye(sp, who, E0[1], 1, st, bk);
    if (ex.brows) out += brow(sp, E0[0], -1, ex.brows[0]) + brow(sp, E0[1], 1, ex.brows[1]);
    // nose and whiskers
    if (who === "pip") out += P("M-7 -176 Q0 -179 7 -176 Q4 -168 0 -167 Q-4 -168 -7 -176Z", sp.pink, "#D97A80", 2) + P("M0 -167 V-163", null, sp.line, 3.5) +
      P("M-58 -172 L-104 -180 M-58 -166 L-106 -164 M-58 -160 L-100 -148 M58 -172 L104 -180 M58 -166 L106 -164 M58 -160 L100 -148", null, "#fff", 2.4, 'opacity=".9"');
    if (who === "momo") out += P("M-8 -174 Q0 -177 8 -174 Q4 -165 0 -164 Q-4 -165 -8 -174Z", sp.pink, "#D0707E", 2) + P("M0 -164 V-160", null, sp.line, 3.5) +
      P("M-52 -164 L-122 -170 M-52 -156 L-118 -150 M52 -164 L122 -170 M52 -156 L118 -150", null, sp.line, 2.2, 'opacity=".55"');
    out += mouth(sp, mt, m);
    return out;
  }

  // Basil turning from the three-quarter view (f = 0) to the front view (f = 1): the far eye comes round from the top corner to the
  // upper right edge, the near eye slides to the upper left edge, the smile widens across the whole face, the nostrils meet in the middle
  function basilTurn(sp, f, jaw) { const L = (a, b) => lerp(a, b, f), L2 = (a, b) => [L(a[0], b[0]), L(a[1], b[1])], M = sp.mouth;
    return Object.assign({}, sp, { turn: f, jaw: jaw || 0,
      eyes: [{ x: L(-18, -47), y: L(-251, -257), r: L(19.5, 19), sx: L(1, .84) }, { x: L(57, 47), y: L(-265, -257), r: L(14.5, 19), sx: L(.68, .84) }],
      mouth: Object.assign({}, M, { x: L(40, 0), y: L(-205, -200), B: L2(M.B, [-66, -228]), D: L2(M.D, [0, -205]), F: L2(M.F, [66, -228]) }),
      chin: { L: L2(sp.chin.L, [-34, -182]), R: L2(sp.chin.R, [34, -182]) }, chest: L2(sp.chest, [4, -128]) }); }
  /* ---------- the rig ---------- */
  function draw(who, x, y, h, t, o) {
    let sp = SPEC[who]; if (!sp) return ""; o = Object.assign({}, o); t = +t || 0;
    o.seed = (o.seed || 0) + sp.seed;
    const ex = EXPR[o.expr] || EXPR.happy;
    if (who === "basil") { const ms = mouthState(sp, ex, t, o); sp = basilTurn(sp, o.look != null ? clamp(Math.abs(o.look)) : (o.talking || o.mouth != null) ? .7 : 0, ms[0] === "open" || ms[0] === "laugh" ? 3 + ms[1] * 6 : 0); }
    const pose = o.pose || "sit", s = h / sp.H;
    const facing = o.facing === "left" ? -1 : 1, flip = facing !== sp.native, br = o.breathe === false ? 0 : Math.sin(TAU * t / 3 + o.seed);
    // pose
    let lift = pose === "stand" ? sp.lift : pose === "lean" ? sp.lift * .5 : pose === "jump" ? sp.lift * .6 : 0, lean = 0, jy = 0, sy = 1, air = 0;
    if (pose === "lean") lean = sp.native * 9;
    if (pose === "jump") { if (o.air != null) air = clamp(o.air); else { const p = ((t + o.seed * .21) % .9 + .9) % .9 / .9; air = p < .12 ? 0 : Math.sin(Math.PI * (p - .12) / .88); }
      jy = air * sp.H * .26; sy = lerp(.92, 1.05, clamp(air * 3)); }
    const sx = 1 / Math.sqrt(sy);
    // gestures: which paw goes where
    let g = o.gesture || ex.gesture || (pose === "jump" ? "cheer" : "rest"), side = null;
    if (g === "pointL" || g === "pointR") { side = (g === "pointL") !== flip ? "L" : "R"; g = "point"; }
    else if (!BOTH[g] && g !== "rest") { side = o.hand ? ((o.hand === "L") !== flip ? "L" : "R") : sp.hand; }
    const rp = sp.rest[pose === "sit" ? "sit" : "stand"]; const arms = { back: "", front: "" }; let extras = "";
    const UP = { wave: 1, thumbs: 1, cheer: 1, pawHead: 1 };   // Momo's raised paw starts wider, so it clears her big head, and stays in front of it
    ["L", "R"].forEach(k => { const sg = k === "L" ? -1 : 1, act = g !== "rest" && GEST[g] && (BOTH[g] || side === k), S = (act && UP[g] && sp.shUp ? sp.shUp : sp.sh)[k]; let a;
      if (act) { a = GEST[g](sp, S, sg, t); if (sp.shUp && UP[g]) a.front = 1; } else a = { P: rp[k], bend: sg * rp.bend, front: 1, f: {} };
      const str = arm(sp, who, S, a.P, a.bend, a.f); if (a.front) arms.front += str; else arms.back += str;
      if (a.star) { const tw = 1 + .25 * Math.sin(TAU * 1.5 * t); extras += star(a.P[0] + sg * 34, a.P[1] - 30, 13 * tw) + star(a.P[0] + sg * 52, a.P[1] - 4, 7 * (2 - tw)); } });
    // head motion
    const shake = ex.shake ? 3 * Math.sin(TAU * 4.5 * t) : 0, nod = o.talking ? 1.4 * Math.sin(TAU * 1.6 * t + o.seed) : 0;
    const tilt = (who === "basil" ? (BT[o.expr] || 0) * (1 - .55 * sp.turn) : (ex.tilt || 0) * sp.native) + (o.tilt || 0) + nod, hy = -1.8 * br + shake + (pose === "lean" ? 3 : 0), hx = pose === "lean" ? sp.native * 9 : 0;
    const look = who === "basil" ? 0 : (o.look != null ? clamp(o.look, -1, 1) : o.facing && !o.talking ? .5 : 0) * 7;
    // extras fixed to the head
    let hEx = ""; const hd = sp.head;
    if (ex.sweat) hEx += Gt(`translate(${-sp.native * (hd.rx * .78) + (who === "basil" ? 30 : 0)} ${hd.cy - hd.ry * .62}) rotate(${-sp.native * 18})`, P("M0 -16 C10 -2 10 9 0 9 C-10 9 -10 -2 0 -16Z", "#AEDDF8", "#5E9FCF", 3));
    if (ex.dashes) hEx += P([-28, 0, 28].map(a => { const c = Math.sin(a * DEG), d = -Math.cos(a * DEG), r0 = hd.ry + (who === "pip" ? 62 : who === "momo" ? 56 : 30), cx = who === "basil" ? 10 : 0; return `M${n(cx + c * r0)} ${n(hd.cy + d * r0)} L${n(cx + c * (r0 + 20))} ${n(hd.cy + d * (r0 + 20))}`; }).join(" "), null, sp.line, 5);
    if (ex.stars) { const tw = 1 + .25 * Math.sin(TAU * 1.5 * t); extras += star(-hd.rx - 34, hd.cy - hd.ry - 10, 11 * tw) + star(hd.rx + 40, hd.cy - hd.ry + 6, 9 * (2 - tw)); }
    const head = Gt(`translate(${n(hx)} ${n(hy)}) rotate(${n(tilt)} ${hd.cx} ${sp.chinY})`, HEAD[who](sp) + Gt(`translate(${n(look)} 0)`, face(sp, who, ex, t, o)) + hEx);
    const upper = Gt(`translate(0 ${-lift})`, Gt(`scale(1 ${n(1 + .02 * br)})`, BODY[who](sp)) + arms.back + head + arms.front + extras);
    const feetUp = pose === "jump" ? -air * 6 : 0;
    const feet = Gt(`translate(0 ${n(feetUp)})`, FEET[who](sp, lift));
    // Pip's feet peek out from under his body; Basil's thigh and Momo's hind paws sit in front of theirs
    const fig = Gt(`translate(0 ${n(-jy)}) rotate(${lean}) scale(${n(sx)} ${n(sy)})`, Gt(`translate(0 ${-lift * .5})`, TAIL[who](sp, t)) + legs(sp, lift) + (who === "basil" ? basilFar(sp, lift) : "") + (who === "pip" ? feet + upper : upper + feet));
    const shW = (who === "basil" ? 120 : 112) * (1 - air * .35);
    const shadow = o.shadow === false ? "" : `<ellipse cx="${who === "basil" ? -30 : -10}" cy="2" rx="${n(shW)}" ry="${n(shW * .13)}" fill="#2B2147" opacity="${n(.2 * (1 - air * .5))}"/>`;
    return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(flip ? -s : s)} ${n(s)})">${shadow}${fig}</g>`;
  }
  const api = { draw, SPEC, LW,
    pip: (x, y, h, t, o) => draw("pip", x, y, h, t, o), basil: (x, y, h, t, o) => draw("basil", x, y, h, t, o), momo: (x, y, h, t, o) => draw("momo", x, y, h, t, o),
    EXPRESSIONS: Object.keys(EXPR), GESTURES: ["rest", "pointL", "pointR", "wave", "pawHead", "cross", "thumbs", "cheer", "chin", "flare"], POSES: ["sit", "stand", "lean", "jump"],
    EXTRA_EXPRESSIONS: ["amazed", "dreamy", "shy", "stern", "blep", "zen", "hyper"], EXTRA_GESTURES: ["idea", "listen", "peekaboo", "salute", "tada", "please", "cheek", "shy"],
    // heights that keep the app's relative sizes when the three stand together (multiply by one common size)
    REL: { pip: .9, basil: 1, momo: 1 }, talkM, blinkK };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Buddies = api;
})(typeof window !== "undefined" ? window : globalThis);
