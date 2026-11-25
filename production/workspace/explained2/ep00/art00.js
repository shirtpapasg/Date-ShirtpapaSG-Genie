// art00.js: EP0's own art (the mind map special): small helpers, the two hidden animals, the mind maps, the puzzle, the boards and the props.
// Loaded after tests.js, before sets00.js, lc00.js, common.js, p1.js / p2.js.
// Helpers copied UNCHANGED from EP22's art22.js (hand15, camPt, eye16, blink16, xChip16, tickChip16, camOn, camMix, holdHand, melt, qMark20,
// fatArrow, linkChip, pawPt): EP22 is finished, so they are copied here, never edited there.
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   Part 1 a HOUSE CROW (the crow children see at void decks: a glossy black body, a smoky-grey neck and nape, a strong black beak, dark eyes
//   made big and glossy with a highlight; it tilts its head, blinks, fluffs its grey neck, hops), always perched or hopping on something solid.
//   Part 2 a COMMUNITY CAT (a short-haired tabby with white paws and a TIPPED LEFT EAR, the sign of a sterilised community cat in Singapore):
//   curled up asleep with a closed-eye smile, washing a paw, its striped tail showing, stretched out in the sun, sheltering from the rain.
//   It is never fed or touched by the buddies (small print "We look, and we let it rest.").
/* ================================================================ helpers (copied) ================================================================ */
const SKN = "#F2C29B", SKL = "#C98F66";
function hand15(o = {}) { const c = o.curl || 0, sl = o.sleeve || "#5B7BD6", sd = o.sleeveD || "#3A56A8", F = [[-29, 70], [-9, 80], [11, 74], [29, 58]];
  const fing = F.map(([y, L], i) => { const cc = o.point && i === 0 ? 0 : (o.point ? .75 : c), l = L * (1 - .6 * cc) + 10; return `<rect x="-10" y="${y - 10}" width="${n2(l)}" height="20" rx="10" transform="rotate(${n2((i - 1.5) * 4)} 0 ${y})"/>`; }).join("");
  return `<rect x="-330" y="-54" width="230" height="108" rx="20" fill="${sl}" stroke="${sd}" stroke-width="5"/><g fill="${SKN}" stroke="${SKL}" stroke-width="4" stroke-linejoin="round"><rect x="-118" y="-44" width="128" height="88" rx="34"/>${fing}<rect x="-70" y="-60" width="70" height="24" rx="12" transform="rotate(-26 -70 -48)"/></g>`
    + `<path d="M-6 -30 q6 2 0 6 M-6 -10 q6 2 0 6 M-6 10 q6 2 0 6" fill="none" stroke="${SKL}" stroke-width="2.5" opacity=".7"/>`; }
const camPt = (c, p) => [c[0] * p[0] - (c[0] - 1) * c[1], c[0] * p[1] - (c[0] - 1) * c[2]];
const INK16 = "#3A2E52";
const eye16 = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.white || "#fff"}" stroke="${o.line || INK16}" stroke-width="${n2(r * .18)}"/>` + (o.shut ? `<path d="M${n2(x - r * .7)} ${y} Q${x} ${n2(y + r * .5)} ${n2(x + r * .7)} ${y}" stroke="${INK16}" stroke-width="${n2(r * .22)}" fill="none" stroke-linecap="round"/>`
  : `<circle cx="${n2(x + (o.lx || 0) * r * .25)}" cy="${n2(y + r * .05)}" r="${n2(r * .58)}" fill="${INK16}"/><circle cx="${n2(x + (o.lx || 0) * r * .25 - r * .2)}" cy="${n2(y - r * .2)}" r="${n2(r * .2)}" fill="#fff"/>`);
const blink16 = (t, ph = 0) => ((t + ph) % 3.7) < .12;
const xChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
const camOn = (p, z, sx = 960, sy = 540) => Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, (z * p[0] - sx) / (z - 1), (z * p[1] - sy) / (z - 1)];
const camMix = (a, b, u) => { const z = lerp(a[0], b[0], u); const pa = [(960 - a[1]) * (a[0] - 1), (540 - a[2]) * (a[0] - 1)], pb = [(960 - b[1]) * (b[0] - 1), (540 - b[2]) * (b[0] - 1)];
  const ox = lerp(pa[0], pb[0], u), oy = lerp(pa[1], pb[1], u); return Math.abs(z - 1) < .001 ? [1, 960, 540] : [z, 960 - ox / (z - 1), 540 - oy / (z - 1)]; };
const holdHand = (k = 1, rot = 0) => TF(0, 0, k, TF(0, -84, 1, hand15({ curl: .62 }), 90), rot);
const melt = (t, s, name, d = .4) => meltScene(t, s, name, d);   // lib.js (teacher, 25 Nov 2026): the old frame melts, its buddies glide or pop out, never fade
const qMark20 = (t, t0, x, y, r = 50) => t < t0 ? "" : TF(x, y, spring(t, t0, .5) * (1 + .05 * Math.sin(t * 4)), `<g filter="url(#dropS)"><circle r="${r}" fill="url(#gSun)"/></g>${T(0, r * .52, "?", r * 1.56, P.ink)}`);
const fatArrow = (x1, y1, x2, y2, col, w = 22) => { const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, d = Math.hypot(x2 - x1, y2 - y1), hw = w * 1.4, hl = w * 1.6;
  const body = `M0 ${-w / 2} H${n2(d - hl)} V${n2(-hw)} L${n2(d)} 0 L${n2(d - hl)} ${n2(hw)} V${w / 2} H0z`;
  return `<g transform="translate(${n2(x1)} ${n2(y1)}) rotate(${n2(a)})"><path d="${body}" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><path d="${body}" fill="${col}" stroke="${P.ink}" stroke-width="3" stroke-linejoin="round"/></g>`; };
// a chip joined to the thing it describes by a short line (SERIES_FORMAT 6): col = its colour
const linkChip = (t, t0, x, y, px, py, col, txt, size = 32, t1, ink = "#fff") => { if (t < t0) return ""; const a = t1 === undefined ? 1 : 1 - ramp(t, t1, .25); if (a <= .01) return "";
  return OP(a, pline(x, y, px, py, ramp(t, t0, .2)) + TF(x, y, spring(t, t0, .45), tpill(0, 0, txt, size, col, ink, { w: 700 }))); };
const pawPt = (who, x, y, h, flip) => { const H = h * (SIZE_K[who] || 1); return [x + (flip ? -1 : 1) * H * ({ pip: .1, basil: .06, momo: .12 })[who], y - H * ({ pip: .36, basil: .35, momo: .42 })[who]]; };

/* ================================================================ THE ANIMALS ================================================================ */
// the HOUSE CROW in profile, perched: origin = its feet on the perch, facing right (o.flip: facing left). k = scale (1: about 120 px tall).
// Alive: a slow breath, a blink, a head tilt now and then, a neck-fluff, o.hop = a little hop at that time, o.caw = the beak opens at that time
function crow00(t, o = {}) { const ph = o.ph || 0, br = Math.sin((t + ph) * 2.4), tilt = 14 * Math.max(0, Math.sin((t + ph) * .9)) ** 6 - 8 * Math.max(0, Math.sin((t + ph) * .9 + 2.4)) ** 8,
  fl = (Math.sin((t + ph) * .55) > .93 ? 1 : 0) * Math.sin((t + ph) * 18) * 3, bl = blink16(t, ph), caw = o.caw !== undefined && t > o.caw && t < o.caw + .45 ? Math.sin(Math.PI * (t - o.caw) / .45) : 0;
  const hp = o.hop !== undefined ? hop(t, o.hop, .4, 26) : 0;
  return `<g transform="translate(0 ${n2(-hp)}) scale(${o.flip ? -1 : 1} 1)">
    <path d="M-8 -6 L-12 4 M-4 -6 L-2 4 M8 -6 L6 4 M12 -6 L14 4" stroke="#3A3536" stroke-width="5" stroke-linecap="round"/>
    <path d="M-66 -40 Q-92 -30 -112 -12 Q-86 -22 -60 -26z" fill="#1C1B22"/>
    <g transform="scale(${n2(1 + .015 * br)} ${n2(1 - .015 * br)})"><path d="M-70 -40 Q-62 -92 -6 -96 Q40 -98 44 -60 Q46 -22 6 -10 Q-40 2 -70 -40z" fill="#1E1D25"/>
      <path d="M-46 -58 Q-30 -84 6 -84 Q-24 -70 -36 -44z" fill="#3A3A48" opacity=".7"/><path d="M-54 -54 Q-20 -40 22 -44" stroke="#4C4D5E" stroke-width="3" fill="none" opacity=".6"/></g>
    <g transform="translate(26 -92) rotate(${n2(tilt)})"><path d="M-40 18 Q-44 -14 -16 -30 Q14 -40 30 -20 Q40 0 28 22 Q${n2(-6 + fl)} 34 -40 18z" fill="#6E6E7A"/>
      <circle cx="12" cy="-12" r="30" fill="#24232C"/><path d="M-10 -34 Q14 -46 36 -28 Q20 -30 8 -26z" fill="#3D3D4A" opacity=".8"/>
      <path d="M34 -16 L${n2(80)} ${n2(-6 - 2 * caw)} L36 ${n2(2 + 6 * caw)}z" fill="#18171C"/><path d="M36 -4 L${n2(74)} ${n2(-2 + 10 * caw)} L36 ${n2(4 + 6 * caw)}z" fill="#2C2B32"/>
      ${bl ? `<path d="M10 -16 Q20 -10 30 -16" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<circle cx="20" cy="-16" r="11" fill="#2B2A36"/><circle cx="20" cy="-16" r="8" fill="#0C0B10"/><circle cx="17" cy="-20" r="3.6" fill="#fff"/><circle cx="23" cy="-12" r="1.6" fill="#fff" opacity=".8"/>`}
      <path d="M2 4 Q12 10 22 6" stroke="#4A4A58" stroke-width="2.5" fill="none" opacity=".6"/></g></g>`; }
// the crow at a spot: [x, y, k, {flip, hop, caw}]
const crowAt = (t, x, y, k = 1, o = {}) => TF(x, y, k, crow00(t, o));
// the COMMUNITY CAT: a tabby (warm grey-brown with darker stripes), white paws and chest, the LEFT ear tipped (a small flat cut on its tip).
// o.pose: "sleep" (curled up, a closed-eye smile; it breathes, an ear twitches, one eye opens and shuts), "wash" (sitting, licking a raised
// white paw), "tail" (only the striped tail showing from behind something: it curls and flicks), "sun" (stretched out on its side), "sit"
// (sitting with its tail curled round its paws, blinking). Origin = the ground under it; k: 1 = about 140 px long.
const CATC = { fur: "#B79A7A", furD: "#8C6D50", str: "#6F5139", wh: "#FFF8EE", nose: "#E89A9A", ink: "#4A3A2E" };
function catHead(t, o = {}) { const bl = o.shut || blink16(t, o.ph || 0), tw = o.twitch ? 8 * Math.max(0, Math.sin(t * 3)) ** 12 : 0, oe = o.peek ? (Math.sin(t * .7) > .82 ? 1 : 0) : 0;
  return `<path d="M-30 -18 L-34 -52 L-10 -32z" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M-34 -52 L-26 -45" stroke="${CATC.wh}" stroke-width="6"/>
    <g transform="rotate(${n2(tw)} 22 -30)"><path d="M10 -32 L32 -54 L34 -18z" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M28 -44 L31 -32 L20 -34z" fill="#E9B8A8"/></g>
    <ellipse cx="0" cy="-8" rx="38" ry="32" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3"/><path d="M-12 -38 q4 10 0 16 M0 -40 q2 10 0 18 M12 -38 q-4 10 0 16" stroke="${CATC.str}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="6" rx="20" ry="14" fill="${CATC.wh}"/><path d="M-4 -2 L4 -2 L0 3z" fill="${CATC.nose}"/><path d="M0 3 Q-6 9 -11 5 M0 3 Q6 9 11 5" stroke="${CATC.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    ${bl && !oe ? `<path d="M-22 -10 Q-14 -2 -6 -10 M6 -10 Q14 -2 22 -10" stroke="${CATC.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`
      : `<ellipse cx="-14" cy="-10" rx="7.5" ry="9" fill="#2E2A22"/><circle cx="-16" cy="-13" r="3" fill="#fff"/>` + (oe && bl ? `<path d="M6 -10 Q14 -2 22 -10" stroke="${CATC.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>` : `<ellipse cx="14" cy="-10" rx="7.5" ry="9" fill="#2E2A22"/><circle cx="12" cy="-13" r="3" fill="#fff"/>`)}
    <path d="M-26 2 h-16 M-26 8 h-14 M26 2 h16 M26 8 h14" stroke="${CATC.ink}" stroke-width="1.6" opacity=".6"/>`; }
function cat00(t, o = {}) { const p = o.pose || "sleep", br = Math.sin(t * 1.9 + (o.ph || 0));
  const tail = (ang) => `<path d="M0 0 Q${n2(40 + 10 * Math.sin(t * 1.3))} ${n2(-30 + ang)} ${n2(70 + 8 * Math.sin(t * 1.7))} ${n2(-70 + ang)}" stroke="${CATC.fur}" stroke-width="18" fill="none" stroke-linecap="round"/>`
    + [.3, .55, .8].map((u) => `<circle cx="${n2(lerp(0, 70, u) + 8 * Math.sin(u * 3))}" cy="${n2(lerp(0, -70 + ang, u) - 6 * Math.sin(u * 3))}" r="8" fill="${CATC.str}" opacity=".85"/>`).join("") + `<circle cx="${n2(70 + 8 * Math.sin(t * 1.7))}" cy="${n2(-70 + ang)}" r="9" fill="${CATC.str}"/>`;
  if (p === "tail") return TF(0, 0, 1, tail(-20 * Math.sin(t * 1.1)));
  if (p === "sleep") return `<ellipse cx="0" cy="2" rx="86" ry="12" fill="#3A2E28" opacity=".22"/><g transform="scale(${n2(1 + .02 * br)} ${n2(1 - .025 * br)})">
      <path d="M-70 0 Q-80 -60 -10 -66 Q60 -70 76 -20 Q84 6 50 4z" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3"/>${[-30, -6, 18, 42].map((x) => `<path d="M${x} -64 q6 22 -2 40" stroke="${CATC.str}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}
      <path d="M50 4 Q90 4 80 -26 Q70 -44 40 -30" stroke="${CATC.fur}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M58 -2 l10 -2 M74 -16 l10 -6" stroke="${CATC.str}" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="-34" cy="-2" rx="16" ry="9" fill="${CATC.wh}" stroke="${CATC.ink}" stroke-width="2"/><ellipse cx="-12" cy="0" rx="15" ry="8" fill="${CATC.wh}" stroke="${CATC.ink}" stroke-width="2"/></g>
      <g transform="translate(-56 -26) rotate(-12) scale(.95)">${catHead(t, { shut: true, twitch: true, peek: o.peek })}</g>`;
  if (p === "sun") return `<ellipse cx="0" cy="2" rx="110" ry="12" fill="#3A2E28" opacity=".2"/><g transform="scale(${n2(1 + .02 * br)} ${n2(1 - .03 * br)})"><path d="M-80 0 Q-86 -52 -10 -52 Q70 -54 88 -14 Q92 4 60 2z" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3"/>${[-40, -14, 12, 38].map((x) => `<path d="M${x} -50 q6 18 -2 34" stroke="${CATC.str}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}
      <path d="M-40 0 l-22 8 M-10 0 l-14 10 M40 0 l14 10 M64 0 l22 6" stroke="${CATC.wh}" stroke-width="14" stroke-linecap="round"/></g><g transform="translate(96 -8)">${tail(40)}</g><g transform="translate(-92 -30) rotate(-20)">${catHead(t, { shut: true, twitch: true })}</g>`;
  if (p === "wash" || p === "sit") { const lk = p === "wash" ? Math.max(0, Math.sin(t * 4)) : 0, paw = p === "wash" ? -38 - 10 * lk : 0;
    return `<ellipse cx="0" cy="2" rx="60" ry="10" fill="#3A2E28" opacity=".22"/><g transform="translate(10 0)">${tail(p === "sit" ? 50 : 10)}</g>
      <path d="M-40 0 Q-46 -70 0 -78 Q46 -70 40 0z" fill="${CATC.fur}" stroke="${CATC.ink}" stroke-width="3"/>${[-20, 0, 20].map((x) => `<path d="M${x} -72 q-4 20 2 34" stroke="${CATC.str}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}
      <path d="M-16 -20 Q0 -48 16 -20 Q18 0 0 0 Q-18 0 -16 -20z" fill="${CATC.wh}"/><ellipse cx="-16" cy="-2" rx="12" ry="8" fill="${CATC.wh}" stroke="${CATC.ink}" stroke-width="2"/>
      <g transform="translate(16 ${n2(paw * .6)})"><ellipse cx="0" cy="-2" rx="12" ry="9" fill="${CATC.wh}" stroke="${CATC.ink}" stroke-width="2"/></g>
      <g transform="translate(0 -96) rotate(${n2(p === "wash" ? 10 * lk : 4 * Math.sin(t))})">${catHead(t, { shut: p === "wash" && lk > .2, ph: 1.3 })}${p === "wash" && lk > .3 ? `<path d="M0 12 q4 8 10 4" fill="#E88A9A"/>` : ""}</g>`; }
  return ""; }
const catAt = (t, x, y, k = 1, o = {}) => TF(x, y, k, o.flip ? `<g transform="scale(-1 1)">${cat00(t, o)}</g>` : cat00(t, o));

/* ================================================================ MIND MAPS (drawn the way children draw them) ================================================================ */
// the layout TheOneApp draws (mymap-core.js): the topic in the middle, branches in different colours curving out, sub-branches off them.
// MAPB: Basil's map (script section 3): four branches from memory, then Making a magnet added after the check. Branch colours = the app's
// own first five swatches for his branches (orange, green, yellow, coral, teal), the ink a pencil's.
const MAPC = ["#F28A2E", "#2FA35A", "#E0A33A", "#E2546A", "#1BA39C", "#3F7FD0"];
const MAPB = [{ t: "Two poles", k: ["North pole", "South pole"], a: -25 }, { t: "Poles together", k: ["Unlike poles attract", "Like poles repel"], a: 32 },
  { t: "Magnetic materials", k: ["Iron and steel", "Not copper or aluminium"], a: 148 }, { t: "A magnet can", k: ["Pull", "Push"], a: 205 }, { t: "Making a magnet", k: ["Stroke method", "Same pole, same direction"], a: 270 }];
// the reading of each piece of the map: "c" (the middle), "b0" a branch, "b0.1" its second sub-branch
const mapKeys = (B) => ["c", ...B.flatMap((b, i) => ["b" + i, ...b.k.map((_, j) => "b" + i + "." + j)])];
/* handMap(t, B, o): a hand-drawn map centred on (0, 0) about 1000 x 640. o.at = {key: time it is drawn}; o.d = how long a stroke takes; o.glow =
   {key: time it glows gold (his own words)}; o.fade = {key: time it fades out COMPLETELY}; o.ticks = {key: time a green tick pops}; o.size =
   word size; o.centre; o.pencil = [key, t] where the pencil is; o.stop = [t0, t1] the pencil stops and thinks (a magnifier circle on it) */
function handMap(t, B, o = {}) { const at = o.at || {}, d = o.d || .45, R = o.R || 250, sz = o.size || 34, glow = o.glow || {}, ticks = o.ticks || {}, fade = o.fade || {};
  const vis = (k) => at[k] === undefined ? 1 : clamp((t - at[k]) / d), fo = (k) => fade[k] === undefined ? 1 : 1 - clamp((t - fade[k]) / .6);
  let lines = "", words = "";
  const word = (k, x, y, txt, col, size, wt = 700) => { const v = vis(k) * fo(k); if (v <= .01) return; const g = glow[k] !== undefined && t >= glow[k] ? pulse(t, glow[k], .05, 1.6) : 0, wd = tw(txt, size, wt) + 26;
    words += OP(Math.min(1, v * 1.6), (g > .02 ? `<rect x="${n2(x - wd / 2 - 8)}" y="${n2(y - size * .9)}" width="${n2(wd + 16)}" height="${n2(size * 1.5)}" rx="${n2(size * .5)}" fill="#FFD75A" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
      + `<text x="${n2(x)}" y="${n2(y)}" font-family="Fredoka" font-weight="${wt}" font-size="${size}" text-anchor="middle" fill="${col}" ${v < 1 ? `clip-path="none"` : ""}>${esc(txt)}</text>`
      + (ticks[k] !== undefined && t >= ticks[k] ? TF(x + wd / 2 + 4, y - size * .55, spring(t, ticks[k], .35), tickBadge(size * .42)) : "")); };
  const stroke = (k, path, col, w, len = 400) => { const v = vis(k) * fo(k); if (v <= .01) return; lines += `<path d="${path}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-dasharray="${n2(len * Math.min(1, vis(k) * 1.4))} ${len}" opacity="${n2(fo(k))}"/>`; };
  B.forEach((b, i) => { const a = b.a * Math.PI / 180, col = b.c || MAPC[i % MAPC.length], ex = Math.cos(a) * R * 1.25, ey = Math.sin(a) * R * .9, k = "b" + i, cx0 = Math.cos(a) * 92, cy0 = Math.sin(a) * 62;
    stroke(k, `M${n2(cx0)} ${n2(cy0)} Q${n2(ex * .5 + Math.sin(a) * 30)} ${n2(ey * .5 - Math.cos(a) * 20)} ${n2(ex)} ${n2(ey)}`, col, 14, 420);
    word(k, ex, ey + (ey < 0 ? -18 : 40), b.t, col, sz * 1.02);
    b.k.forEach((s, j) => { const sa = a + (j ? .42 : -.42) * (Math.cos(a) < 0 ? -1 : 1), sx = ex + Math.cos(sa) * R * .78, sy = ey + Math.sin(sa) * R * .5 + (j ? 34 : -34), kk = k + "." + j;
      stroke(kk, `M${n2(ex)} ${n2(ey)} Q${n2((ex + sx) / 2)} ${n2((ey + sy) / 2 - 10)} ${n2(sx)} ${n2(sy)}`, col, 7, 260);
      word(kk, sx + (Math.cos(a) < 0 ? -10 : 10), sy + 12, s, INK16, sz * .78, 600); }); });
  const cv = vis("c"); let c = "";
  if (cv > .01) c = OP(cv, `<ellipse rx="${n2(110 * Math.min(1, cv * 1.3))}" ry="${n2(70 * Math.min(1, cv * 1.3))}" fill="#FFF3C4" stroke="${INK16}" stroke-width="7"/>` + T(0, sz * .42, o.centre || "Magnets", sz * 1.25, INK16, { w: 700 }));
  let pen = ""; if (o.pencil) { const [px, py, pt] = o.pencil; pen = TF(px, py, 1, pencil00(pt || 0)); }
  return lines + c + words + pen; }
// a pencil (Basil's teal pencil), its tip at the origin, leaning back to the upper right
const pencil00 = (wig = 0, col = "#14B8A6") => `<g transform="rotate(${n2(-40 + wig)})"><path d="M0 0 L14 -30 H-14z" fill="#F2D2A2"/><path d="M0 0 L5 -10 H-5z" fill="#333"/><rect x="-14" y="-170" width="28" height="140" fill="${col}"/><rect x="-14" y="-170" width="9" height="140" fill="#fff" opacity=".25"/><rect x="-14" y="-194" width="28" height="24" rx="4" fill="#E88A9A"/><rect x="-14" y="-176" width="28" height="8" fill="#C9CED4"/></g>`;
// paper: a sheet with a soft shadow; w, h centred on (0, 0)
const sheet00 = (w, h, o = {}) => `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="6" fill="${o.fill || "#FFFDF6"}"/></g>${o.lines !== false ? [...Array(Math.floor(h / 60))].map((_, i) => `<path d="M${-w / 2 + 20} ${-h / 2 + 50 + i * 60} H${w / 2 - 20}" stroke="#DCE7F2" stroke-width="2"/>`).join("") : ""}`;
// the TheOneApp poster's printed look (a crop of the real poster) is appImg("posterP"); a smaller readable stand-in is never used for it.

/* ================================================================ the word puzzle (Part 1 Round 1) ================================================================ */
// six cream cards, each a PAIR joined by a short line; left column READ (printed in full, grey ink), right column WORK IT OUT (blank boxes;
// the letters written in by Basil's teal pencil at fill1..fill3). o.fill = [t1, t2, t3]; o.cloth (0..1 the cloth over them); o.fade(word) ->
// opacity; card centre positions: left x -380, right x 380, rows y -230, 0, 230 (k scales)
function puzzleCards(t, o = {}) { const rows = [-230, 0, 230], s = []; const READ = [["push", "pull"], ["compass", "needle"], ["glass", "wood"]], WORK = [["attract", "re", "p", "el"], ["North", "S", "o", "uth"], ["magnetic", "i", "r", "on"]];
  const card = (x, y, inner, col) => `<g transform="translate(${x} ${y})"><g filter="url(#drop)"><rect x="-330" y="-90" width="660" height="180" rx="22" fill="#FFF8E6" stroke="${col}" stroke-width="6"/></g>${inner}</g>`;
  READ.forEach(([a, b], i) => s.push(card(-380, rows[i], `<text x="-175" y="22" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#6E6A7E">${a}</text><path d="M-40 4 H30" stroke="#9A96A8" stroke-width="6" stroke-linecap="round"/><text x="170" y="22" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#6E6A7E" opacity="${o.fade ? n2(o.fade(b)) : 1}">${b}</text>`, "#B9B4C8")));
  WORK.forEach(([a, p0, miss, p1], i) => { const ft = (o.fill || [])[i], done = ft !== undefined && t >= ft, wl = spring(t, ft || 1e9, .3), x0 = 165 - (tw(p0 + "W" + p1, 62, 700) + 30) / 2;
    const w0 = tw(p0, 62, 700), wm = 52, txt = `<text x="${n2(x0)}" y="22" font-family="Fredoka" font-weight="700" font-size="62" fill="${INK16}">${p0}</text><rect x="${n2(x0 + w0 + 6)}" y="-34" width="${wm}" height="68" rx="8" fill="#fff" stroke="#14B8A6" stroke-width="4" stroke-dasharray="${done ? "0" : "8 6"}"/>`
      + (done ? `<text x="${n2(x0 + w0 + 6 + wm / 2)}" y="22" font-family="Fredoka" font-weight="700" font-size="${n2(62 * wl)}" text-anchor="middle" fill="#0E8C80">${miss}</text>` : "") + `<text x="${n2(x0 + w0 + wm + 12)}" y="22" font-family="Fredoka" font-weight="700" font-size="62" fill="${INK16}">${p1}</text>`;
    s.push(card(380, rows[i], `<text x="-195" y="22" font-family="Fredoka" font-weight="700" font-size="52" text-anchor="middle" fill="${INK16}">${a}</text><path d="M-55 4 H-15" stroke="${INK16}" stroke-width="6" stroke-linecap="round"/>` + txt + (done ? TF(300, -60, spring(t, ft + .1, .35), tickBadge(24)) : ""), "#14B8A6")); });
  let out = s.join("");
  out += TF(-380, -360, 1, tpill(0, 0, "READ", 40, "#8E82B8", "#fff", { w: 700, ls: 4 })) + TF(380, -360, 1, tpill(0, 0, "WORK IT OUT", 40, "#E0A33A", "#fff", { w: 700, ls: 3 }));
  if (o.cloth) { const c = eio(o.cloth); out += `<g transform="translate(0 ${n2(-760 * (1 - c))})"><path d="M-780 -330 Q0 -370 780 -330 L800 330 Q0 380 -800 330z" fill="#5B7BD6"/>${[...Array(9)].map((_, i) => `<path d="M${-700 + i * 175} -330 Q${-690 + i * 175} 0 ${-710 + i * 175} 330" stroke="#4A66B8" stroke-width="10" fill="none" opacity=".6"/>`).join("")}<path d="M-780 -330 Q0 -370 780 -330" stroke="#3E57A0" stroke-width="10" fill="none"/></g>`; }
  return out; }
// the stone table seen from above (a round terrazzo top) for the puzzle / the memory test
const stoneTop = (w = 1760, h = 940) => `<ellipse cx="0" cy="30" rx="${w / 2 + 30}" ry="${h / 2 + 40}" fill="#7D776E"/><ellipse cx="0" cy="0" rx="${w / 2}" ry="${h / 2}" fill="#C9C3B8"/>` + [...Array(90)].map((_, i) => `<circle cx="${n2((hash(i, 3) - .5) * w * .9)}" cy="${n2((hash(i, 5) - .5) * h * .85)}" r="${n2(3 + 5 * hash(i, 7))}" fill="${["#A8A196", "#E2DDD3", "#B9B2A6"][i % 3]}"/>`).join("");

/* ================================================================ the tablet (TheOneApp's REAL screens, captured by capture.js) ================================================================ */
// a plain tablet with no brand, landscape, on a small stand: its screen shows `name` (an app/*.jpg). x, y = the screen's centre; w = the
// screen's width (the app's 1180 x 820 view). o.tap = [fx, fy, t0] a tap ripple at that point of the screen (fractions); o.stand (true)
function tablet00(t, name, x, y, w, o = {}) { const h = w * 820 / 1180, bz = w * .045; let s = "";
  if (o.stand !== false) s += `<path d="M${n2(x - w * .18)} ${n2(y + h / 2 + bz * .6)} L${n2(x - w * .26)} ${n2(y + h / 2 + bz + 70)} H${n2(x + w * .26)} L${n2(x + w * .18)} ${n2(y + h / 2 + bz * .6)}z" fill="#5C6470"/>`;
  s += `<g filter="url(#drop)"><rect x="${n2(x - w / 2 - bz)}" y="${n2(y - h / 2 - bz)}" width="${n2(w + 2 * bz)}" height="${n2(h + 2 * bz)}" rx="${n2(bz * 1.3)}" fill="#22252C"/></g><circle cx="${n2(x + w / 2 + bz * .5)}" cy="${n2(y)}" r="${n2(bz * .18)}" fill="#3A3F48"/>`;
  s += `<clipPath id="tbc${Math.round(x)}"><rect x="${n2(x - w / 2)}" y="${n2(y - h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(bz * .4)}"/></clipPath><g clip-path="url(#tbc${Math.round(x)})"><rect x="${n2(x - w / 2)}" y="${n2(y - h / 2)}" width="${n2(w)}" height="${n2(h)}" fill="#fff"/>`
    + (typeof name === "function" ? name(x - w / 2, y - h / 2, w, h) : appImg(name, x - w / 2, y - h / 2, w, h)) + `</g>`;
  if (o.tap) { const [fx, fy, t0] = o.tap, u = t - t0; if (u > -.25 && u < .8) { const px = x - w / 2 + fx * w, py = y - h / 2 + fy * h;
    s += (u < 0 ? "" : `<circle cx="${n2(px)}" cy="${n2(py)}" r="${n2(18 + 70 * eo(u / .6))}" fill="none" stroke="#fff" stroke-width="${n2(8 * (1 - u / .8))}" opacity="${n2(1 - u / .8)}"/><circle cx="${n2(px)}" cy="${n2(py)}" r="${n2(26 * (1 - u / .8))}" fill="#14B8A6" opacity=".45"/>`); } }
  return s; }
// a box on an app screen (from app/shots.json: [x, y, w, h] fractions) -> its centre as fractions
const boxC = (shot, key) => { const b = ((APP[shot] || {}).boxes || {})[key]; return b ? [b[0] + b[2] / 2, b[1] + b[3] / 2] : [.5, .5]; };
// a glow ring round a box of an app screen shown at (x0, y0, w, h)
const boxGlow = (t, t0, shot, key, x0, y0, w, h, col = P.sun) => { const b = ((APP[shot] || {}).boxes || {})[key]; if (!b || t < t0) return ""; const k = spring(t, t0, .4);
  return OP(Math.min(1, k), `<rect x="${n2(x0 + b[0] * w - 10)}" y="${n2(y0 + b[1] * h - 10)}" width="${n2(b[2] * w + 20)}" height="${n2(b[3] * h + 20)}" rx="18" fill="none" stroke="${col}" stroke-width="${n2(7 + 3 * Math.sin(t * 6))}"/>`); };

// an app screen with its sharp close-up laid exactly over its own place (the hi crop from capture.js), for smooth push-ins that stay crisp
const screenAt = (name) => (x, y, w, h) => { const hi = APP[name + "_hi"]; let s = appImg(name, x, y, w, h); if (hi && hi.at) s += appImg(name + "_hi", x + hi.at[0] * w, y + hi.at[1] * h, hi.at[2] * w, hi.at[3] * h); return s; };
// a part of an app screen (a box in fractions: [x, y, w, h]) shown in (x, y, w, h)
const appCrop = (name, b, x, y, w, h) => { const A = APP[name]; return `<svg x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" viewBox="${n2(b[0] * A.w)} ${n2(b[1] * A.h)} ${n2(b[2] * A.w)} ${n2(b[3] * A.h)}" preserveAspectRatio="xMidYMid slice"><use href="#ap_${name}"/></svg>`; };
