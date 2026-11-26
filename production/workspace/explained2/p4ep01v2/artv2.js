// artv2.js: P4 EP1 v2 "The Great Void Deck Race" art (drawn 26 Nov 2026, Opus). Loaded after artp4.js (bikeP4, BK, gearP4, wheelP4,
// chainLoop, chainOn, bellP4, caliper, rainTreeP4, BG.vdp4), before common.js and p1.js.
// THE PLACES: the void deck on a Saturday morning (v1's back wall, now with a paved floor, the drinks stall and its ice box on castors, a
// chalk START / FINISH line, a cardboard crown on a stool), the path by the garden (the left of the void deck), the top of the wheelchair
// ramp (a gentle slope with handrails down to the floor), the runaway track (a long scrolling void deck for the chase).
// NEW CAST (code-drawn, simple and warm, in the series' flat outlined style): UNCLE LIM (sixties, round face, kind eyes behind glasses,
// short white hair under a white helmet, buckled; a short-sleeved checked shirt, shorts, sandals; four fingers and a thumb on each hand),
// his ROADSTER (an old black upright bike, rust spots, wicker basket with his kopi in a clear plastic bag with a straw, mudguards, a chrome
// bell, rim brakes with levers, the chain visible: no chain guard), the SNAIL (a garden snail: brown spiral shell, eyes on its tentacles,
// a small smile, a shiny trail), the PIGEONS (rock pigeons: grey, iridescent necks, pink feet), the ICE BOX, the plastic STOOLS, a rubber
// BALL, the cardboard CROWN, Pip's CLIPBOARD and starter FLAG, the race number PLATE (taped to Basil's handlebar for the race: it hides his
// legs in the head-on shot, so his sitting painting reads as sitting on the saddle), Basil's bike HEAD-ON and from BEHIND.
// THE SCIENCE IN THE PICTURES (SERIES_FORMAT 6, script sections 2 and 7): every bike is drawn true: the front gear on the pedal cranks, the
// back gear on the back wheel's hub, the chain one loop on both gears (never to the front wheel), rim brakes at both rims with levers and
// cables, a bell on the handlebar. Head-on: the front wheel, fork, handlebar with grips, levers and bell, the pedals at both sides moving up
// and down opposite each other. From behind: the back wheel, mudguard, reflector, saddle, the pedals at both sides.
// FACES notes (SERIES_FORMAT 6x): roadsterV2 FACES right · limRideV2 FACES right · snailV2 FACES right · pigeonV2 FACES right (walking and
// flying) · bikeP4 FACES right (artp4.js) · the head-on bikes (bikeFrontV2, limFrontRideV2) FACE the camera (they move only towards it or
// stand) · the rear views (bikeRearV2, limRearRideV2) FACE away (they move only away, getting smaller) · ballV2 / stoolV2 roll or spin.

const XDEFSV2 = () => `${lg("ibBody", [[0, "#3FA9E0"], [1, "#2477B8"]])}${lg("ibIce", [[0, "#F4FCFF"], [1, "#BFE6F7"]])}${lg("rdFrame", [[0, "#3A3D44"], [1, "#16181C"]])}
  ${lg("limShirt", [[0, "#9FD3F2"], [1, "#6FB3DE"]])}${lg("rampTop", [[0, "#D9D1C2"], [1, "#BFB5A2"]])}${lg("floorV2", [[0, "#E4DCCD"], [1, "#C9BEAA"]])}${lg("helmW", [[0, "#FFFFFF"], [1, "#D9DEE6"]])}
  ${lg("crownG", [[0, "#FFE27A"], [1, "#E8A92E"]])}${rg("snailShell", [[0, "#E8B77A"], [.6, "#B9783F"], [1, "#7A4A24"]], .4, .4, .7)}${lg("plateG", [[0, "#FFF8EA"], [1, "#F1E2C4"]])}`;

/* ================================================================ small helpers ================================================================ */
const SKINL = "#F2C9A0", SKINL2 = "#C98F62", INKL = "#3A2A22";
// a human hand: four fingers and a thumb (SERIES_FORMAT 6), palm towards us, scale k, rot
const handL = (x, y, k = 1, rot = 0, flip = 1) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)}) scale(${n2(k * flip)} ${n2(k)})"><path d="M-12 0 Q-14 -16 -12 -24 L-12 -36 Q-11 -42 -7 -41 Q-4 -40 -4 -34 L-4 -40 Q-3 -46 1 -45 Q5 -44 5 -38 L5 -38 Q6 -44 10 -43 Q14 -42 13 -35 L13 -30 Q15 -35 18 -34 Q21 -32 19 -25 L16 -6 Q14 6 2 8 Q-10 9 -12 0z" fill="${SKINL}" stroke="${SKINL2}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-12 -8 Q-22 -16 -24 -22 Q-25 -27 -20 -26 Q-14 -22 -8 -16" fill="${SKINL}" stroke="${SKINL2}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-4 -34 V-22 M5 -38 V-22 M13 -32 V-20" stroke="${SKINL2}" stroke-width="1.6" opacity=".7"/></g>`;
// a lizard's paw (Basil's teal, four fingers), palm towards us
const lizPaw = (x, y, k = 1, rot = 0, flip = 1) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)}) scale(${n2(k * flip)} ${n2(k)})"><ellipse cx="0" cy="0" rx="22" ry="18" fill="#6FA59C" stroke="#1E3442" stroke-width="4"/>${[-14, -5, 5, 14].map((dx, i) => `<path d="M${dx * .6} -10 L${dx} -32" stroke="#1E3442" stroke-width="11" stroke-linecap="round"/><path d="M${dx * .6} -10 L${dx} -32" stroke="#6FA59C" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>`;
// the kopi: a clear plastic bag tied by its loop, brown kopi inside, a straw
const kopiBag = (k = 1, sip = 0) => TF(0, 0, k, `<path d="M-6 -66 q6 -16 12 0" stroke="#E8E8E8" stroke-width="4" fill="none"/><path d="M-22 -50 Q-30 0 -16 22 Q0 30 16 22 Q30 0 22 -50 Q0 -60 -22 -50z" fill="#EAF6FF" opacity=".55" stroke="#9FB6C8" stroke-width="3"/><path d="M-24 -18 Q-28 6 -16 20 Q0 28 16 20 Q28 6 24 -18 Q0 -14 -24 -18z" fill="#A9703F" opacity=".92"/><path d="M-10 -44 Q-12 -10 -8 16" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/><path d="M6 -40 L14 -92" stroke="#E5484D" stroke-width="5" stroke-linecap="round"/><path d="M14 -92 l6 -6" stroke="#E5484D" stroke-width="5" stroke-linecap="round"/>${sip ? `<path d="M-14 -30 h28" stroke="#A9703F" stroke-width="2"/>` : ""}`);

/* ================================================================ comic-book sound words ================================================================ */
// big hand-lettered word, pops in with a squash (lerp 1.8 -> 1, a wobble), then fades over .6-.9 s; never over a face or a label (the
// scenes place it beside its source). o: size, col, rot, d (life), tiny (lower-case, small, no burst)
function comicWord(t, t0, x, y, txt, o = {}) { const d = o.d || .85, u = t - t0; if (u < 0 || u > d) return ""; const size = o.size || 92, col = o.col || P.sun, rot = o.rot === undefined ? -8 : o.rot;
  const k = lerp(1.8, 1, eo(u / .12)) * (1 + .06 * wob(t, t0 + .12, .35)), a = 1 - ss(d - .25, d, t), sx = 1 + .18 * Math.max(0, 1 - u / .1);
  let burst = ""; if (!o.tiny) { const w = tw(txt, size, 700) * .6 + 60; for (let i = 0; i < 14; i++) { const an = i * Math.PI / 7, r1 = (i % 2 ? .72 : 1) * w; burst += `${i ? "L" : "M"}${n2(Math.cos(an) * r1)} ${n2(Math.sin(an) * r1 * .55)} `; }
    burst = `<path d="${burst}Z" fill="#fff" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round" opacity=".95"/>`; }
  return OP(a, TF(x, y, k, `<g transform="rotate(${rot}) scale(${n2(sx)} ${n2(2 - sx)})">${burst}<text x="0" y="${n2(size * .35)}" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" fill="${col}" stroke="${P.ink}" stroke-width="${o.tiny ? 6 : 12}" stroke-linejoin="round" paint-order="stroke" letter-spacing="2">${esc(txt)}</text></g>`)); }
// the battle-cry letters (LIGHTER IS FASTER!), slammed in behind Basil; o.wobble (the third time), o.k size factor, o.col
function battleCry(t, t0, x, y, txt, o = {}) { if (t < t0 - .02) return ""; const d = o.d || 1.6, u = t - t0, a = 1 - ss(t0 + d - .3, t0 + d, t); if (a <= 0) return ""; const k = (o.k || 1) * lerp(2.6, 1, eo(u / .14)) * (1 + .05 * wob(t, t0 + .14, .4));
  const wb = o.wobble ? 6 * Math.sin(u * 14) * Math.min(1, u * 2) : 0, lines = txt.split("|");
  let s = ""; lines.forEach((ln, i) => { const yy = (i - (lines.length - 1) / 2) * 118; s += `<text x="0" y="${yy + 40}" font-family="Fredoka" font-weight="700" font-size="118" text-anchor="middle" fill="${i % 2 ? P.sun : (o.col || "#FF6A3D")}" stroke="${P.ink}" stroke-width="20" stroke-linejoin="round" paint-order="stroke" letter-spacing="4" transform="skewX(-10)">${esc(ln)}</text>`; });
  let lines2 = ""; for (let i = 0; i < 16; i++) { const an = i * Math.PI / 8 + .2, r0 = 420, r1 = 980; lines2 += `<path d="M${n2(Math.cos(an) * r0)} ${n2(Math.sin(an) * r0 * .5)} L${n2(Math.cos(an + .03) * r1)} ${n2(Math.sin(an + .03) * r1 * .5)}" stroke="#fff" stroke-width="10" opacity=".35"/>`; }
  return OP(a, TF(x, y, k, `<g transform="rotate(${n2(-6 + wb)})">${o.noLines ? "" : lines2}${s}</g>`)); }
// a lens flare (the battle-cry pose)
const flare = (x, y, k) => k <= .02 ? "" : OP(k, `<g transform="translate(${x} ${y})"><circle r="70" fill="#FFF7D6" opacity=".8" filter="url(#b10)"/><path d="M-260 0 H260 M0 -160 V160" stroke="#FFF7D6" stroke-width="8" opacity=".8" stroke-linecap="round"/><path d="M-120 -120 L120 120 M-120 120 L120 -120" stroke="#FFF7D6" stroke-width="4" opacity=".5"/><circle cx="220" cy="120" r="26" fill="none" stroke="#FFE27A" stroke-width="5" opacity=".6"/><circle cx="300" cy="170" r="12" fill="#FFE27A" opacity=".5"/></g>`);
// wind lines across the battle-cry pose
const windV2 = (t, x, y, w = 420, k = 1) => k <= .02 ? "" : OP(k, [...Array(6)].map((_, i) => { const u = ((t * 1.8 + i / 6) % 1), yy = y + (i - 2.5) * 46, x0 = x + w * (.6 - u * 1.4); return `<path d="M${n2(x0)} ${n2(yy)} h${n2(160 - 40 * (i % 3))}" stroke="#fff" stroke-width="${7 - (i % 3)}" stroke-linecap="round" opacity="${n2(.8 * Math.sin(Math.PI * u))}"/>`; }).join(""));

/* ================================================================ Uncle Lim ================================================================ */
// his head, origin = the middle of the neck's top; o: look (-1..1 turns the face), blink, sip (mouth on the straw), smile 0..1, helmet, laugh
function limHead(o = {}) { const lk = (o.look || 0) * 10, b = o.blink, sm = o.smile === undefined ? .7 : o.smile; let s = "";
  s += `<ellipse cx="0" cy="-60" rx="58" ry="64" fill="${SKINL}" stroke="${INKL}" stroke-width="5"/>`;
  s += `<ellipse cx="-56" cy="-56" rx="11" ry="16" fill="${SKINL}" stroke="${INKL}" stroke-width="4"/><ellipse cx="56" cy="-56" rx="11" ry="16" fill="${SKINL}" stroke="${INKL}" stroke-width="4"/>`;
  s += `<path d="M-52 -86 Q-50 -120 0 -124 Q50 -120 52 -86 Q44 -106 0 -108 Q-44 -106 -52 -86z" fill="#F4F4F4" stroke="#C9C9C9" stroke-width="3"/>`;   // white hair
  s += `<g transform="translate(${lk} 0)"><path d="M-36 -86 q14 -8 26 0 M10 -86 q14 -8 26 0" stroke="#BDBDBD" stroke-width="6" fill="none" stroke-linecap="round"/>`;   // eyebrows
  for (const ex of [-22, 22]) { s += b ? `<path d="M${ex - 9} -66 q9 6 18 0" stroke="${INKL}" stroke-width="4" fill="none" stroke-linecap="round"/>` : o.laugh ? `<path d="M${ex - 9} -64 q9 -9 18 0" stroke="${INKL}" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<ellipse cx="${ex}" cy="-66" rx="6" ry="7" fill="${INKL}"/><circle cx="${ex + 2}" cy="-69" r="2.2" fill="#fff"/>`;
    s += `<circle cx="${ex}" cy="-66" r="17" fill="#fff" fill-opacity=".18" stroke="#5B4A3A" stroke-width="4"/>`; }
  s += `<path d="M-5 -66 h10" stroke="#5B4A3A" stroke-width="4"/><path d="M0 -58 q-6 14 2 18" stroke="${SKINL2}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="-34" cy="-40" rx="9" ry="5" fill="#F29A8A" opacity=".55"/><ellipse cx="34" cy="-40" rx="9" ry="5" fill="#F29A8A" opacity=".55"/>`;
  s += o.sip ? `<ellipse cx="2" cy="-26" rx="6" ry="5" fill="#7A3E2A"/>` : o.laugh ? `<path d="M-18 -30 Q0 -8 18 -30z" fill="#7A3E2A" stroke="${INKL}" stroke-width="3"/>` : `<path d="M-16 -30 q16 ${n2(10 * sm + 2)} 32 0" stroke="${INKL}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M-30 -20 q4 6 10 6 M30 -20 q-4 6 -10 6" stroke="${SKINL2}" stroke-width="2.5" fill="none" opacity=".6"/></g>`;   // smile lines
  if (o.helmet !== false) s += `<path d="M-64 -82 Q-66 -150 0 -156 Q66 -150 64 -82 Q0 -96 -64 -82z" fill="url(#helmW)" stroke="${INKL}" stroke-width="5"/><path d="M-30 -150 Q-34 -118 -30 -92 M0 -156 V-96 M30 -150 Q34 -118 30 -92" stroke="#B9C3CF" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-64 -82 Q0 -96 64 -82" stroke="#2BA58E" stroke-width="8" fill="none"/>`
    + `<path d="M-58 -78 Q-60 -40 -30 -16 M58 -78 Q60 -40 30 -16" stroke="#3B4149" stroke-width="5" fill="none"/><rect x="-10" y="-18" width="20" height="10" rx="3" fill="#3B4149"/>`;
  return s; }
// his body standing, front view, origin = between his feet on the ground; total height about 560 at k 1. o: sip (kopi to the mouth),
// wave, nod (rad), laugh, arms: "rest" | "hold" (holding something at the side, the bag in his right hand) | "hips"
/* FACES: none (front view, he never travels in it) */ function limStand(t, o = {}) { const nod = o.nod || 0, sip = o.sip || 0, bob = 2 * Math.sin(t * 2.2); let s = "";
  s += `<ellipse cx="0" cy="4" rx="96" ry="14" fill="#2B2147" opacity=".22"/>`;
  for (const sx of [-1, 1]) s += `<path d="M${sx * 26} -150 L${sx * 30} -12" stroke="${SKINL}" stroke-width="30" stroke-linecap="round"/><path d="M${sx * 26} -150 L${sx * 30} -12" stroke="${SKINL2}" stroke-width="2" opacity=".0"/>`
    + `<path d="M${sx * 30 - 26} 2 Q${sx * 30} -18 ${sx * 30 + 26} 2z" fill="#6B4A33" stroke="${INKL}" stroke-width="3"/><path d="M${sx * 30 - 18} -6 h36" stroke="#3A2A22" stroke-width="5"/>`;
  s += `<path d="M-62 -250 L62 -250 L66 -140 L8 -132 L0 -150 L-8 -132 L-66 -140z" fill="#7C8A6A" stroke="${INKL}" stroke-width="5" stroke-linejoin="round"/>`;   // shorts (khaki)
  s += `<g transform="translate(0 ${n2(bob)})"><path d="M-74 -420 Q-80 -330 -66 -246 L66 -246 Q80 -330 74 -420 Q0 -440 -74 -420z" fill="url(#limShirt)" stroke="${INKL}" stroke-width="5" stroke-linejoin="round"/>`;
  for (let i = -3; i <= 3; i++) s += `<path d="M${i * 22} -428 V-250" stroke="#fff" stroke-width="4" opacity=".55"/>`; for (let j = 0; j < 7; j++) s += `<path d="M-74 ${-410 + j * 26} H74" stroke="#4E8FBF" stroke-width="3" opacity=".45"/>`;   // the checks
  s += `<path d="M-18 -426 L0 -398 L18 -426" fill="none" stroke="${INKL}" stroke-width="5"/><circle cx="0" cy="-370" r="4" fill="#fff" stroke="${INKL}" stroke-width="2"/><circle cx="0" cy="-330" r="4" fill="#fff" stroke="${INKL}" stroke-width="2"/>`;
  // arms: sleeves, then skin
  const arm = (sx, ang, ang2, hand) => { const sh = [sx * 70, -410], el = [sh[0] + sx * 18 * Math.sin(ang) + 0, sh[1] + 90 * Math.cos(ang)], wr = [el[0] + 86 * Math.sin(ang2), el[1] + 86 * Math.cos(ang2)];
    return `<path d="M${sh[0]} ${sh[1]} L${n2(el[0])} ${n2(el[1])} L${n2(wr[0])} ${n2(wr[1])}" stroke="${INKL}" stroke-width="31" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sh[0]} ${sh[1]} L${n2(el[0])} ${n2(el[1])} L${n2(wr[0])} ${n2(wr[1])}" stroke="${SKINL}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      + `<path d="M${sh[0] - sx * 6} ${sh[1] - 18} L${n2(sh[0] + sx * 20)} ${sh[1] + 50}" stroke="url(#limShirt)" stroke-width="44" stroke-linecap="round"/>` + (hand ? hand(wr) : handL(wr[0], wr[1] + 12, .9, 180, sx)); };
  const L_ = o.wave ? arm(-1, Math.PI * .95, Math.PI * (.95 + .08 * Math.sin(t * 9)), (w) => handL(w[0], w[1] - 10, .95, 0, -1)) : arm(-1, .12, -.05);
  const R_ = sip > 0 ? arm(1, Math.PI * (.62 + .1 * sip), Math.PI * (.62 + .45 * sip), (w) => TF(w[0], w[1] + 30, .9, kopiBag(1, 1)) + handL(w[0], w[1] + 8, .9, 200, 1))
    : o.bag ? arm(1, .2, .1, (w) => TF(w[0], w[1] + 78, .9, kopiBag(1)) + handL(w[0], w[1] + 10, .9, 180, 1)) : arm(1, .12, -.05);
  s += L_ + R_;
  s += `<g transform="translate(0 -430) rotate(${n2(nod * 57)})">${limHead({ sip: sip > .7, smile: o.smile, laugh: o.laugh, blink: o.blink || (Math.floor(t * .3 + .4) !== Math.floor(t * .3 + .43)), helmet: o.helmet, look: o.look })}</g></g>`;
  return s; }

/* ================================================================ the roadster (Uncle Lim's bike) ================================================================ */
// side view, drive side to camera, front at the right, origin = ground midway between the wheels; a little bigger than Basil's bike (an
// adult's bike: wheel R 140). o: crank, sh, rw, fw (wheel angles), ring, lit (0..1 the named part glows: { bell, brakes, chain }), stand
const RD = { R: 140, RA: [-300, -140], FA: [300, -140], BB: [-50, -112], SC: [-120, -400], ST: [-138, -450], HT: [210, -380], HB: [228, -312], r1: 52, r2: 22, n1: 44, n2: 18, crank: 72, pitch: 7.43 };
const RDLOOP = chainLoop(RD.RA, RD.r2, RD.BB, RD.r1);
const RG1OFF = RDLOOP.at0 - (RDLOOP.Lt / RD.r1) - .5 * RD.pitch / RD.r1, RG2OFF = RDLOOP.ab - ((RDLOOP.Lt + RDLOOP.A1 + RDLOOP.Lb) / RD.r2) - .5 * RD.pitch / RD.r2;
const rtube = (a, b, w = 15) => `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#0E0F12" stroke-width="${w + 5}" stroke-linecap="round"/><path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="url(#rdFrame)" stroke-width="${w}" stroke-linecap="round"/>`;
const rust = (pts) => pts.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .6}" fill="#A0522D" opacity=".75"/><circle cx="${x + r * .3}" cy="${y - 1}" r="${r * .35}" fill="#C46A35" opacity=".8"/>`).join("");
/* FACES: right */ function roadsterV2(t, o = {}) { const cr = o.crank || 0, sh = o.sh === undefined ? RD.r1 * cr : o.sh, rw = o.rw !== undefined ? o.rw : sh / RD.r2, fw = o.fw !== undefined ? o.fw : rw, L = o.lit || {};
  const cpt = (a, Ln) => V2.add(RD.BB, V2.pol(Ln, a)); let s = "";
  const glow = (k, inner) => k > .02 ? `<g opacity="${n2(k)}" filter="url(#rim)">${inner}</g>` : "";
  { const p = cpt(cr + Math.PI, RD.crank); s += `<path d="M${RD.BB[0]} ${RD.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#2B2F36" stroke-width="12" stroke-linecap="round"/><rect x="${n2(p[0] - 18)}" y="${n2(p[1] - 6)}" width="36" height="12" rx="3" fill="#1E2025"/>`; }
  s += TF(...RD.RA, 1, wheelP4(RD.R, rw, o.blur || 0)) + TF(...RD.FA, 1, wheelP4(RD.R, fw, o.fblur || 0));
  // mudguards
  s += `<path d="M${RD.RA[0] - 150} ${RD.RA[1] + 20} A154 154 0 0 1 ${RD.RA[0] + 120} ${RD.RA[1] - 92}" stroke="#16181C" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M${RD.FA[0] - 110} ${RD.FA[1] - 104} A154 154 0 0 1 ${RD.FA[0] + 152} ${RD.FA[1] + 26}" stroke="#16181C" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  s += rtube(RD.RA, RD.SC, 12) + rtube(RD.RA, RD.BB, 12) + rtube(RD.BB, RD.SC, 17) + rtube(RD.SC, [RD.HT[0] - 4, RD.HT[1] + 6], 16) + rtube(RD.BB, [RD.HB[0] - 2, RD.HB[1] - 6], 19) + rtube(RD.HT, RD.HB, 20);
  s += `<path d="M${RD.HB[0]} ${RD.HB[1]} Q${RD.HB[0] + 50} ${RD.HB[1] + 90} ${RD.FA[0]} ${RD.FA[1]}" stroke="#0E0F12" stroke-width="19" fill="none" stroke-linecap="round"/><path d="M${RD.HB[0]} ${RD.HB[1]} Q${RD.HB[0] + 50} ${RD.HB[1] + 90} ${RD.FA[0]} ${RD.FA[1]}" stroke="url(#rdFrame)" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  s += rust([[-200, -270, 9], [60, -330, 7], [130, -230, 8], [-90, -180, 6], [RD.HT[0] + 2, RD.HT[1] + 30, 6]]);
  // seat post + a sprung leather saddle; a tall stem and upright swept-back bars with grips
  s += `<path d="M${RD.SC[0]} ${RD.SC[1]} L${RD.ST[0] + 4} ${RD.ST[1] + 12}" stroke="#8C96A2" stroke-width="11"/><path d="M${RD.ST[0] - 52} ${RD.ST[1] + 2} Q${RD.ST[0] - 46} ${RD.ST[1] - 16} ${RD.ST[0]} ${RD.ST[1] - 14} L${RD.ST[0] + 46} ${RD.ST[1] - 6} Q${RD.ST[0] + 48} ${RD.ST[1] + 8} ${RD.ST[0] + 22} ${RD.ST[1] + 12} Q${RD.ST[0] - 12} ${RD.ST[1] + 16} ${RD.ST[0] - 52} ${RD.ST[1] + 2}z" fill="#6B3E22" stroke="#2B1A10" stroke-width="3"/><path d="M${RD.ST[0] - 30} ${RD.ST[1] + 12} q-4 10 4 14 q-8 6 0 12 M${RD.ST[0] + 2} ${RD.ST[1] + 14} q-4 10 4 14 q-8 6 0 12" stroke="#8C96A2" stroke-width="4" fill="none"/>`;
  s += `<path d="M${RD.HT[0]} ${RD.HT[1]} L${RD.HT[0] - 4} ${RD.HT[1] - 60} Q${RD.HT[0] - 6} ${RD.HT[1] - 74} ${RD.HT[0] - 40} ${RD.HT[1] - 76} L${RD.HT[0] - 96} ${RD.HT[1] - 70}" stroke="#8C96A2" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="${RD.HT[0] - 128}" y="${RD.HT[1] - 80}" width="38" height="20" rx="9" fill="#2B2F36"/>`;
  // the brakes: levers, cables, calipers at both rims
  s += `<path d="M${RD.HT[0] - 90} ${RD.HT[1] - 64} q-6 24 -30 32" stroke="#59616B" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${RD.HT[0] - 92} ${RD.HT[1] - 62} Q${RD.HT[0] - 60} ${RD.HT[1] - 10} ${RD.SC[0] + 70} ${RD.SC[1] + 8} L${RD.SC[0] + 8} ${RD.SC[1] + 8} Q-190 -330 -214 -270" stroke="#2B2F36" stroke-width="3.5" fill="none"/><path d="M${RD.HT[0] - 20} ${RD.HT[1] - 56} Q${RD.HT[0] + 34} ${RD.HT[1] - 30} 248 -278" stroke="#2B2F36" stroke-width="3.5" fill="none"/>` + caliper(-222, -262, -36) + caliper(248, -270, 28);
  if (L.brakes) s += glow(L.brakes, caliper(-222, -262, -36) + caliper(248, -270, 28) + `<path d="M${RD.HT[0] - 90} ${RD.HT[1] - 64} q-6 24 -30 32" stroke="#59616B" stroke-width="6" fill="none" stroke-linecap="round"/>`);
  // the wicker basket on the front, the kopi bag in it (o.kopi === false: in his hand)
  const BX = RD.HT[0] + 58, BY = RD.HT[1] - 40; s += o.kopi === false ? "" : TF(BX + 6, BY - 30, .75, kopiBag(1));
  s += `<path d="M${RD.HT[0] + 4} ${RD.HT[1] - 30} L${BX - 40} ${BY + 6} M${RD.HB[0]} ${RD.HB[1] - 10} L${BX - 30} ${BY + 70}" stroke="#59616B" stroke-width="5"/><path d="M${BX - 50} ${BY} L${BX + 60} ${BY} L${BX + 50} ${BY + 78} L${BX - 40} ${BY + 78}z" fill="#C99A5B" stroke="#7A5226" stroke-width="5" stroke-linejoin="round"/>`
    + [0, 1, 2, 3].map((i) => `<path d="M${BX - 46 + i * 2} ${BY + 18 + i * 18} H${BX + 56 - i * 2}" stroke="#7A5226" stroke-width="3"/>`).join("") + [0, 1, 2, 3, 4].map((i) => `<path d="M${BX - 36 + i * 22} ${BY + 2} L${BX - 30 + i * 20} ${BY + 76}" stroke="#A8783F" stroke-width="3"/>`).join("");
  // the headlamp, the bell
  s += `<g transform="translate(${RD.HT[0] + 18} ${RD.HT[1] + 30})"><path d="M0 -14 h26 a16 16 0 0 1 0 32 h-26z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><rect x="24" y="-10" width="8" height="24" rx="3" fill="#FFF6C8"/></g>`;
  s += TF(RD.HT[0] - 40, RD.HT[1] - 92, 1.1, bellP4(o.ring || 0, 0)); if (L.bell) s += glow(L.bell, TF(RD.HT[0] - 40, RD.HT[1] - 92, 1.1, bellP4(o.ring || 0, 0)));
  // the drive: back gear, front gear (a big chainring), the chain (no chain guard), the near crank and pedal
  s += TF(...RD.RA, 1, gearP4(RD.r2, RD.n2, (o.g2 !== undefined ? o.g2 : sh / RD.r2) + RG2OFF, { spider: false, hole: "#59616B" })) + TF(...RD.BB, 1, gearP4(RD.r1, RD.n1, cr + RG1OFF));
  s += chainOn(RDLOOP, sh, 1, { pitch: RD.pitch, w: 6.5 }); if (L.chain) s += glow(L.chain, `<path d="${RDLOOP.d}" stroke="#FFE27A" stroke-width="12" fill="none" opacity=".7"/>` + chainOn(RDLOOP, sh, 1, { pitch: RD.pitch, w: 6.5 }));
  { const p = cpt(cr, RD.crank); s += `<path d="M${RD.BB[0]} ${RD.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#2B2F36" stroke-width="15" stroke-linecap="round"/><path d="M${RD.BB[0]} ${RD.BB[1]} L${n2(p[0])} ${n2(p[1])}" stroke="#8C96A2" stroke-width="9" stroke-linecap="round"/><circle cx="${RD.BB[0]}" cy="${RD.BB[1]}" r="9" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/><rect x="${n2(p[0] - 22)}" y="${n2(p[1] - 7)}" width="44" height="14" rx="4" fill="#2B2F36"/>`; }
  if (o.stand !== false) s += `<path d="M${RD.BB[0] - 80} ${RD.BB[1] - 8} L${RD.BB[0] - 124} -2" stroke="#59616B" stroke-width="9" stroke-linecap="round"/>`;
  return s; }

// Uncle Lim riding the roadster, side view, FACES right: his seat on the saddle, his feet on the pedals (a two-bone leg solved for each
// pedal), his hands on the grips, upright; k = scale of the whole; o: crank, sh, ring (paw on the bell), sip (stopped only)
/* FACES: right */ function limRideV2(t, o = {}) { const cr = o.crank || 0; let s = "";
  const hip = [RD.ST[0] + 6, RD.ST[1] - 18], leg = (a, near) => { const p = V2.add(RD.BB, V2.pol(RD.crank, a)), ft = [p[0], p[1] - 10], L1 = 200, L2 = 200, dx = ft[0] - hip[0], dy = ft[1] - hip[1], dd = Math.min(L1 + L2 - 1, Math.hypot(dx, dy));
    const a0 = Math.atan2(dy, dx), b = Math.acos((L1 * L1 + dd * dd - L2 * L2) / (2 * L1 * dd)), kn = [hip[0] + L1 * Math.cos(a0 - b), hip[1] + L1 * Math.sin(a0 - b)];
    const col = near ? SKINL : "#E0B48A";
    return `<path d="M${n2(hip[0])} ${n2(hip[1])} L${n2(kn[0])} ${n2(kn[1])}" stroke="#7C8A6A" stroke-width="54" stroke-linecap="round"/><path d="M${n2(kn[0])} ${n2(kn[1])} L${n2(ft[0])} ${n2(ft[1])}" stroke="${INKL}" stroke-width="31" stroke-linecap="round"/><path d="M${n2(kn[0])} ${n2(kn[1])} L${n2(ft[0])} ${n2(ft[1])}" stroke="${col}" stroke-width="25" stroke-linecap="round"/>`
      + `<path d="M${n2(ft[0] - 22)} ${n2(ft[1] + 12)} Q${n2(ft[0])} ${n2(ft[1] - 10)} ${n2(ft[0] + 34)} ${n2(ft[1] + 10)}z" fill="#6B4A33" stroke="${INKL}" stroke-width="3"/>`; };
  s += leg(cr + Math.PI, false);   // the far leg (behind the bike)
  s += roadsterV2(t, { ...o, stand: o.stand === undefined ? false : o.stand });
  // body, upright, leaning a little forward; arms to the grips
  const sh = [hip[0] + 36, hip[1] - 230], grip = [RD.HT[0] - 110, RD.HT[1] - 70];
  s += `<path d="M${n2(hip[0] - 50)} ${n2(hip[1] + 10)} L${n2(hip[0] + 60)} ${n2(hip[1] + 10)} L${n2(sh[0] + 62)} ${n2(sh[1] + 10)} Q${n2(sh[0])} ${n2(sh[1] - 20)} ${n2(sh[0] - 66)} ${n2(sh[1] + 10)}z" fill="url(#limShirt)" stroke="${INKL}" stroke-width="5" stroke-linejoin="round"/>`;
  for (let j = 0; j < 7; j++) s += `<path d="M${n2(hip[0] - 46 + j * 3)} ${n2(hip[1] - 20 - j * 30)} H${n2(hip[0] + 58 + j * 1)}" stroke="#4E8FBF" stroke-width="3" opacity=".45"/>`;
  s += `<path d="M${n2(hip[0] - 50)} ${n2(hip[1] - 4)} L${n2(hip[0] + 66)} ${n2(hip[1] - 4)} L${n2(hip[0] + 70)} ${n2(hip[1] + 30)} L${n2(hip[0] - 54)} ${n2(hip[1] + 30)}z" fill="#7C8A6A" stroke="${INKL}" stroke-width="4"/>`;
  s += leg(cr, true);   // the near leg (in front)
  if (o.sip) { const el = [sh[0] + 70, sh[1] + 120], hd = [sh[0] + 30, sh[1] - 40]; s += `<path d="M${n2(sh[0] + 20)} ${n2(sh[1] + 20)} L${n2(el[0])} ${n2(el[1])} L${n2(hd[0])} ${n2(hd[1])}" stroke="${SKINL}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + TF(hd[0] + 4, hd[1] + 60, .8, kopiBag(1, 1)) + handL(hd[0], hd[1] + 8, .85, 200); }
  else { const rg = o.ring ? [RD.HT[0] - 44, RD.HT[1] - 92] : grip, el = [(sh[0] + rg[0]) / 2 + 10, (sh[1] + rg[1]) / 2 + 40];
    s += `<path d="M${n2(sh[0] + 20)} ${n2(sh[1] + 20)} L${n2(el[0])} ${n2(el[1])} L${n2(rg[0])} ${n2(rg[1])}" stroke="${INKL}" stroke-width="31" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${n2(sh[0] + 20)} ${n2(sh[1] + 20)} L${n2(el[0])} ${n2(el[1])} L${n2(rg[0])} ${n2(rg[1])}" stroke="${SKINL}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${n2(sh[0] + 4)} ${n2(sh[1] + 4)} L${n2(sh[0] + 40)} ${n2(sh[1] + 70)}" stroke="url(#limShirt)" stroke-width="42" stroke-linecap="round"/>` + handL(rg[0] + 6, rg[1] + 12, .85, 100); }
  s += `<g transform="translate(${n2(sh[0] + 6)} ${n2(sh[1] - 4)}) rotate(4)">${limHead({ look: .9, sip: o.sip > .7, blink: o.blink, smile: .8 })}</g>`;
  return s; }

/* ================================================================ head-on and rear views ================================================================ */
// Basil's bike, HEAD-ON (it faces the camera), origin = the ground under the front wheel; the front wheel is nearer, so it is a little
// bigger; o: crank (pedals: up/down at both sides, opposite), bell, brakes, plate (the race number plate), blur (the pedals a cartoon blur)
/* FACES: camera */ function bikeFrontV2(t, o = {}) { const cr = o.crank || 0, R = 128, bl = o.bell === undefined ? 1 : o.bell, br = o.brakes === undefined ? 1 : o.brakes, col = o.col || "url(#bkFrame)", dk = o.dark || "#7A2214"; let s = "";
  // the back wheel (behind, smaller) and the saddle
  s += `<rect x="-10" y="${-2 * R * .9}" width="20" height="${2 * R * .9}" rx="10" fill="#2E2F33" opacity=".85"/>`;
  s += `<path d="M-40 -392 Q0 -408 40 -392 Q44 -378 0 -374 Q-44 -378 -40 -392z" fill="#2B2F36"/><path d="M0 -374 V-320" stroke="#8C96A2" stroke-width="10"/>`;
  // the pedals, cranks seen edge-on: each moves up and down (opposite)
  const ped = (sx, a) => { const y = -100 + 70 * Math.sin(a), x = sx * (70 + 8 * Math.cos(a)); return `<path d="M${sx * 26} -100 L${n2(x)} ${n2(y)}" stroke="#2B2F36" stroke-width="12" stroke-linecap="round"/><rect x="${n2(x - (sx > 0 ? 0 : 40))}" y="${n2(y - 8)}" width="40" height="16" rx="4" fill="#2B2F36"/><rect x="${n2(x - (sx > 0 ? -6 : 34))}" y="${n2(y - 4)}" width="28" height="7" rx="2" fill="#FFC83A"/>`; };
  s += ped(-1, cr) + ped(1, cr + Math.PI);
  if (o.blur) s += OP(o.blur, [-1, 1].map((sx) => `<ellipse cx="${sx * 80}" cy="-100" rx="34" ry="78" fill="none" stroke="#fff" stroke-width="14" opacity=".55"/>`).join(""));
  s += `<rect x="-26" y="-120" width="52" height="40" rx="12" fill="${col}" stroke="${dk}" stroke-width="5"/>`;   // the bottom bracket shell
  // the front wheel (a tyre seen head-on), the fork, the head tube, the stem and the wide handlebar
  s += `<rect x="-16" y="${-2 * R}" width="32" height="${2 * R}" rx="16" fill="#2E2F33"/><rect x="-6" y="${-2 * R + 8}" width="12" height="${2 * R - 16}" rx="6" fill="#45474D"/><circle cx="0" cy="${-R}" r="12" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/>`;
  s += `<path d="M-30 ${-R} Q-34 -230 -18 -300 M30 ${-R} Q34 -230 18 -300" stroke="${dk}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-30 ${-R} Q-34 -230 -18 -300 M30 ${-R} Q34 -230 18 -300" stroke="${col}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="-20" y="-350" width="40" height="70" rx="10" fill="${col}" stroke="${dk}" stroke-width="5"/>`;
  if (br > .01) s += OP(br, [-1, 1].map((sx) => `<path d="M${sx * 40} ${-R - 100} h${sx * -14} M${sx * -36} ${-R - 110} q${sx * 10} -6 ${sx * 30} 0" stroke="#59616B" stroke-width="6" fill="none"/>`).join("") + `<path d="M-30 ${-R - 112} Q0 ${-R - 130} 30 ${-R - 112}" stroke="#59616B" stroke-width="7" fill="none"/><rect x="-36" y="${-R - 114}" width="10" height="20" rx="3" fill="#22252A"/><rect x="26" y="${-R - 114}" width="10" height="20" rx="3" fill="#22252A"/>`);
  s += `<path d="M0 -350 V-384 M-180 -372 Q-90 -394 0 -386 Q90 -394 180 -372" stroke="#59616B" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="-218" y="-384" width="48" height="24" rx="11" fill="#2B2F36"/><rect x="170" y="-384" width="48" height="24" rx="11" fill="#2B2F36"/>`;
  if (br > .01) s += OP(br, `<path d="M-150 -372 q-30 14 -52 10 M150 -372 q30 14 52 10" stroke="#59616B" stroke-width="7" fill="none" stroke-linecap="round"/>`);
  if (bl > .01) s += OP(bl, TF(-120, -404, 1.1, bellP4(o.ring || 0, 0)));
  if (o.plate) s += `<g transform="translate(0 -300) rotate(${n2(1.5 * Math.sin(t * 7))})"><path d="M-22 -60 v16 M22 -60 v16" stroke="#C9B48A" stroke-width="9"/><rect x="-118" y="-48" width="236" height="150" rx="16" fill="url(#plateG)" stroke="#8A6233" stroke-width="6"/><path d="M14 -30 L-34 32 L4 32 L-14 86 L44 14 L8 14 L26 -30z" fill="#FFC83A" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><rect x="-118" y="-48" width="236" height="22" rx="10" fill="#E5484D" opacity=".85"/></g>`;
  return s; }
// Uncle Lim on the roadster, HEAD-ON (towards the camera), origin = the ground under the front wheel. o: crank, sip, ring, approach
/* FACES: camera */ function limFrontRideV2(t, o = {}) { const cr = o.crank || 0, R = 150; let s = "";
  s += `<rect x="-11" y="${-2 * R * .9}" width="22" height="${2 * R * .9}" rx="11" fill="#2E2F33" opacity=".85"/>`;
  // legs: knees out at both sides, going up and down with the pedals
  for (const [sx, a] of [[-1, cr], [1, cr + Math.PI]]) { const py = -112 + 78 * Math.sin(a), kx = sx * 74, ky = -260 + 30 * Math.sin(a), px = sx * 70;
    s += `<path d="M${sx * 40} -400 L${kx} ${n2(ky)}" stroke="#7C8A6A" stroke-width="56" stroke-linecap="round"/><path d="M${kx} ${n2(ky)} L${px} ${n2(py)}" stroke="${INKL}" stroke-width="31" stroke-linecap="round"/><path d="M${kx} ${n2(ky)} L${px} ${n2(py)}" stroke="${SKINL}" stroke-width="25" stroke-linecap="round"/><path d="M${px - 26} ${n2(py + 6)} h52 v10 h-52z" fill="#6B4A33" stroke="${INKL}" stroke-width="3"/>`; }
  // the front mudguard, wheel, fork, the headlamp, the basket (it hides the stem), the bars, the bell
  s += `<rect x="-18" y="${-2 * R}" width="36" height="${2 * R}" rx="18" fill="#2E2F33"/><path d="M-24 ${-2 * R + 10} Q0 ${-2 * R - 16} 24 ${-2 * R + 10} V${-R} H-24z" fill="#16181C"/><circle cx="0" cy="${-R}" r="12" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/>`;
  s += `<path d="M-34 ${-R} Q-38 -250 -20 -330 M34 ${-R} Q38 -250 20 -330" stroke="#0E0F12" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-34 ${-R} Q-38 -250 -20 -330 M34 ${-R} Q38 -250 20 -330" stroke="url(#rdFrame)" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  // body (behind the basket)
  s += `<path d="M-78 -620 Q-86 -520 -70 -400 L70 -400 Q86 -520 78 -620 Q0 -640 -78 -620z" fill="url(#limShirt)" stroke="${INKL}" stroke-width="5"/>` + [...Array(6)].map((_, j) => `<path d="M-76 ${-600 + j * 34} H76" stroke="#4E8FBF" stroke-width="3" opacity=".45"/>`).join("");
  // arms down and out to the grips
  for (const sx of [-1, 1]) s += `<path d="M${sx * 70} -600 L${sx * 132} -500 L${sx * 186} -452" stroke="${INKL}" stroke-width="31" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sx * 70} -600 L${sx * 132} -500 L${sx * 186} -452" stroke="${SKINL}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sx * 66} -612 L${sx * 98} -548" stroke="url(#limShirt)" stroke-width="44" stroke-linecap="round"/>`;
  s += `<path d="M-200 -446 Q-100 -470 0 -460 Q100 -470 200 -446" stroke="#8C96A2" stroke-width="11" fill="none" stroke-linecap="round"/><rect x="-232" y="-458" width="46" height="24" rx="11" fill="#2B2F36"/><rect x="186" y="-458" width="46" height="24" rx="11" fill="#2B2F36"/>`;
  for (const sx of [-1, 1]) s += handL(sx * 200, -440, .8, sx * 90, sx);
  s += TF(-140, -476, 1.15, bellP4(o.ring || 0, 0));
  s += `<g transform="translate(0 -360)"><path d="M-110 -50 L110 -50 L96 60 L-96 60z" fill="#C99A5B" stroke="#7A5226" stroke-width="6" stroke-linejoin="round"/>${[0, 1, 2].map((i) => `<path d="M-106 ${-30 + i * 30} H106" stroke="#7A5226" stroke-width="3"/>`).join("")}${[...Array(8)].map((_, i) => `<path d="M${-96 + i * 27} -48 L${-86 + i * 24} 58" stroke="#A8783F" stroke-width="3"/>`).join("")}${o.kopi === false ? "" : TF(60, -40, .7, kopiBag(1))}</g>`;
  s += `<g transform="translate(0 -250)"><path d="M-30 0 h60 l-8 30 h-44z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><ellipse cx="0" cy="6" rx="22" ry="10" fill="#FFF6C8"/></g>`;
  s += `<g transform="translate(0 -630)">${limHead({ blink: o.blink, sip: o.sip, smile: .8 })}</g>`;
  return s; }
// a bike from BEHIND (it rides away), origin = the ground under the back wheel; o: crank, col
/* FACES: away */ function bikeRearV2(t, o = {}) { const cr = o.crank || 0, R = 118, col = o.col || "url(#bkFrame)", dk = o.dark || "#7A2214"; let s = "";
  s += `<rect x="-9" y="${-2 * R * .85}" width="18" height="${2 * R * .85}" rx="9" fill="#2E2F33" opacity=".8"/>`;   // the front wheel, farther
  s += `<path d="M0 -330 V-372 M-160 -390 Q0 -404 160 -390" stroke="#59616B" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="-196" y="-400" width="40" height="20" rx="9" fill="#2B2F36"/><rect x="156" y="-400" width="40" height="20" rx="9" fill="#2B2F36"/>`;
  const ped = (sx, a) => { const y = -92 + 64 * Math.sin(a), x = sx * (66 + 8 * Math.cos(a)); return `<path d="M${sx * 24} -92 L${n2(x)} ${n2(y)}" stroke="#2B2F36" stroke-width="11" stroke-linecap="round"/><rect x="${n2(x - (sx > 0 ? 0 : 38))}" y="${n2(y - 7)}" width="38" height="14" rx="4" fill="#2B2F36"/>`; };
  s += ped(-1, cr) + ped(1, cr + Math.PI);
  s += `<rect x="-15" y="${-2 * R}" width="30" height="${2 * R}" rx="15" fill="#2E2F33"/><rect x="-5" y="${-2 * R + 8}" width="10" height="${2 * R - 16}" rx="5" fill="#45474D"/>`;
  s += `<path d="M-28 ${-R} L-16 -330 M28 ${-R} L16 -330" stroke="${dk}" stroke-width="15" stroke-linecap="round"/><path d="M-28 ${-R} L-16 -330 M28 ${-R} L16 -330" stroke="${col}" stroke-width="9" stroke-linecap="round"/>`;
  s += `<path d="M-22 ${-2 * R + 4} Q0 ${-2 * R - 22} 22 ${-2 * R + 4} V${-R - 30} H-22z" fill="#2B2F36"/><rect x="-14" y="${-R - 70}" width="28" height="30" rx="6" fill="#E5484D" stroke="#8E1E2A" stroke-width="3"/><rect x="-10" y="${-R - 66}" width="20" height="8" rx="3" fill="#FF9A8F"/>`;
  s += `<path d="M0 -330 V-366" stroke="#8C96A2" stroke-width="10"/><path d="M-46 -372 Q0 -392 46 -372 Q40 -352 0 -350 Q-40 -352 -46 -372z" fill="#2B2F36"/>`;
  return s; }
// Uncle Lim on the roadster from BEHIND (riding away), origin = ground under the back wheel
/* FACES: away */ function limRearRideV2(t, o = {}) { const cr = o.crank || 0; let s = bikeRearV2(t, { crank: cr, col: "url(#rdFrame)", dark: "#0E0F12" });
  for (const [sx, a] of [[-1, cr], [1, cr + Math.PI]]) { const py = -100 + 70 * Math.sin(a), kx = sx * 70, ky = -250 + 26 * Math.sin(a);
    s += `<path d="M${sx * 36} -420 L${kx} ${n2(ky)}" stroke="#7C8A6A" stroke-width="54" stroke-linecap="round"/><path d="M${kx} ${n2(ky)} L${sx * 66} ${n2(py)}" stroke="${INKL}" stroke-width="30" stroke-linecap="round"/><path d="M${kx} ${n2(ky)} L${sx * 66} ${n2(py)}" stroke="${SKINL}" stroke-width="24" stroke-linecap="round"/>`; }
  s += `<path d="M-60 -440 Q0 -456 60 -440 L64 -400 L-64 -400z" fill="#7C8A6A" stroke="${INKL}" stroke-width="5"/><path d="M-80 -640 Q-88 -540 -66 -436 L66 -436 Q88 -540 80 -640 Q0 -660 -80 -640z" fill="url(#limShirt)" stroke="${INKL}" stroke-width="5"/>` + [...Array(6)].map((_, j) => `<path d="M-78 ${-620 + j * 32} H78" stroke="#4E8FBF" stroke-width="3" opacity=".45"/>`).join("");
  for (const sx of [-1, 1]) s += `<path d="M${sx * 72} -620 L${sx * 132} -500 L${sx * 172} -400" stroke="${INKL}" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M${sx * 72} -620 L${sx * 132} -500 L${sx * 172} -400" stroke="${SKINL}" stroke-width="23" fill="none" stroke-linecap="round"/>`;
  s += `<g transform="translate(0 -650)"><ellipse cx="0" cy="-60" rx="58" ry="62" fill="${SKINL}" stroke="${INKL}" stroke-width="5"/><path d="M-56 -70 Q-58 -20 -30 -6 Q0 0 30 -6 Q58 -20 56 -70 Q0 -60 -56 -70z" fill="#F4F4F4" stroke="#C9C9C9" stroke-width="3"/><path d="M-64 -82 Q-66 -150 0 -156 Q66 -150 64 -82 Q0 -70 -64 -82z" fill="url(#helmW)" stroke="${INKL}" stroke-width="5"/><path d="M-30 -150 Q-34 -118 -30 -84 M0 -156 V-72 M30 -150 Q34 -118 30 -84" stroke="#B9C3CF" stroke-width="7" fill="none"/></g>`;
  return s; }

/* ================================================================ animals ================================================================ */
// the garden snail, side view, FACES right, origin = its foot's middle on the ground; o: glide (0..1 phase of the body ripple), look
/* FACES: right */ function snailV2(t, o = {}) { const rp = Math.sin(t * 5 + (o.ph || 0)), st = 1 + .04 * rp; let s = "";
  s += `<ellipse cx="-10" cy="4" rx="70" ry="9" fill="#2B2147" opacity=".18"/>`;
  s += `<path d="M-70 2 Q-60 -14 -20 -16 L60 -20 Q86 -22 92 -44 Q98 -70 88 -76 Q74 -84 70 -60 Q66 -40 40 -36 L-40 -30 Q-74 -26 -80 -4z" fill="#C9A67E" stroke="#6B4A2E" stroke-width="4" stroke-linejoin="round" transform="scale(${n2(st)} 1)"/>`;
  s += `<path d="M-60 -4 Q0 -12 50 -24" stroke="#E6CDA9" stroke-width="5" fill="none" opacity=".7"/>`;
  // tentacles with eyes
  const ey = (x0, y0, x1, y1, r) => `<path d="M${x0} ${y0} Q${(x0 + x1) / 2 + 4} ${(y0 + y1) / 2} ${x1} ${y1}" stroke="#B8936A" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="${r}" fill="#2B2147"/><circle cx="${x1 + 2}" cy="${y1 - 2}" r="${r * .38}" fill="#fff"/>`;
  s += ey(84, -70, 96 + 3 * Math.sin(t * 2), -112, 7) + ey(76, -68, 80 + 3 * Math.sin(t * 2 + 1), -104, 6);
  s += `<path d="M82 -50 q6 5 11 0" stroke="#5A3A22" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="74" cy="-46" rx="5" ry="3" fill="#F29A8A" opacity=".6"/>`;
  // the shell: a brown spiral
  s += `<g transform="translate(-6 -64) rotate(${n2(3 * rp)})"><circle r="52" fill="url(#snailShell)" stroke="#5A3416" stroke-width="5"/><path d="M0 0 m-6 4 a8 8 0 1 1 12 -6 a18 18 0 1 1 -24 22 a30 30 0 1 1 42 -40" stroke="#5A3416" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-30 -30 q14 -14 30 -12" stroke="#fff" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/></g>`;
  if (o.crown) s += `<g transform="translate(-6 -126) rotate(-8) scale(.42)">${crownV2()}</g>`;
  return s; }
// its shiny trail from x0 to x (world), at y
const snailTrail = (x0, x, y) => x <= x0 ? "" : `<path d="M${n2(x0)} ${y + 2} H${n2(x - 60)}" stroke="#E8F4FF" stroke-width="7" stroke-linecap="round" opacity=".55"/><path d="M${n2(x0)} ${y} H${n2(x - 60)}" stroke="#fff" stroke-width="2" opacity=".7"/>`;
// a rock pigeon, side view, FACES right, origin = its feet. o: peck (0..1), fly (0..1 wings up), walk phase, coo (puffed)
/* FACES: right */ function pigeonV2(t, o = {}) { const pk = o.peck || 0, fl = o.fly || 0, ph = o.ph || 0, bob = o.walk ? 3 * Math.abs(Math.sin(t * 8 + ph)) : 0; let s = "";
  if (!fl) s += `<ellipse cx="0" cy="3" rx="34" ry="6" fill="#2B2147" opacity=".18"/>`;
  s += fl ? "" : `<path d="M-6 -20 l-4 20 M8 -20 l2 20" stroke="#E8708A" stroke-width="5" stroke-linecap="round"/><path d="M-16 0 h12 M-2 0 h14" stroke="#E8708A" stroke-width="4" stroke-linecap="round"/>`;
  s += `<g transform="translate(0 ${n2(-bob)})"><path d="M-58 -44 L-34 -38 L-30 -26 L-60 -30z" fill="#4A5260" stroke="#2B2F36" stroke-width="3"/>`;   // tail
  s += `<ellipse cx="-8" cy="-38" rx="40" ry="24" fill="#9AA3B2" stroke="#2B2F36" stroke-width="4"/>`;
  // wing: folded, or up / down when flying
  const wa = fl ? -60 + 110 * (.5 + .5 * Math.sin(t * 26 + ph)) : 0;
  s += `<g transform="translate(-10 -46) rotate(${n2(wa)})"><path d="M0 0 Q-30 -6 -50 6 Q-30 16 0 10z" fill="#7F8898" stroke="#2B2F36" stroke-width="3"/><path d="M-36 2 h10 M-24 4 h8" stroke="#2B2F36" stroke-width="5" stroke-linecap="round"/></g>`;
  // neck and head (pecking tips it down)
  s += `<g transform="translate(22 -52) rotate(${n2(60 * pk)})"><path d="M-10 6 Q0 -16 6 -24 L18 -14 Q14 4 6 12z" fill="#5F8F7E" stroke="#2B2F36" stroke-width="3"/><path d="M-6 0 Q2 -10 8 -16" stroke="#B57AC9" stroke-width="5" opacity=".8"/><circle cx="12" cy="-28" r="13" fill="#7F8898" stroke="#2B2F36" stroke-width="3"/><path d="M23 -30 l12 3 l-12 3z" fill="#3B4149"/><circle cx="14" cy="-31" r="3.4" fill="#E86A2E"/><circle cx="14.6" cy="-31.6" r="1.4" fill="#2B2147"/></g></g>`;
  return s; }
const featherV2 = (k = 1) => TF(0, 0, k, `<path d="M0 0 Q-10 -30 4 -60 Q18 -30 0 0z" fill="#B9C1CC" stroke="#59616B" stroke-width="3"/><path d="M0 0 L3 -54" stroke="#59616B" stroke-width="2"/>`);

/* ================================================================ props ================================================================ */
// the drinks stall's ice box on castors, origin = the middle of its bottom; o.basil: a lid line so a body can sit in it (the front wall
// is drawn by iceBoxFrontV2 OVER whatever sits in it); o.splash
const IB = { w: 360, h: 170 };
function iceBoxBackV2(t, o = {}) { const { w, h } = IB; let s = `<ellipse cx="0" cy="6" rx="${w * .58}" ry="14" fill="#2B2147" opacity=".22"/>`;
  s += `<path d="M${-w / 2 + 10} ${-h - 4} L${-w / 2 - 6} ${-h - 120} L${w / 2 - 30} ${-h - 140} L${w / 2 - 10} ${-h - 6}z" fill="#E9F6FF" stroke="#2477B8" stroke-width="6" stroke-linejoin="round"/>`;   // the open lid, propped back
  s += `<rect x="${-w / 2}" y="${-h - 14}" width="${w}" height="30" rx="10" fill="#2477B8"/><rect x="${-w / 2 + 14}" y="${-h - 6}" width="${w - 28}" height="40" fill="url(#ibIce)"/>`;
  // ice and cans inside (behind whoever sits there)
  for (let i = 0; i < 9; i++) { const x = -w / 2 + 34 + i * 38, y = -h + 4 + (i % 2) * 8; s += i % 3 === 1 ? `<rect x="${x - 12}" y="${y - 28}" width="24" height="36" rx="5" fill="${["#43BF6C", "#E5484D", "#3AA6E8"][i % 3]}" stroke="#2B2F36" stroke-width="2.5"/><rect x="${x - 12}" y="${y - 28}" width="24" height="6" rx="3" fill="#C9D1DA"/>` : `<rect x="${x - 14}" y="${y - 14}" width="26" height="22" rx="5" fill="#fff" stroke="#9FD0EA" stroke-width="2.5" transform="rotate(${(i * 23) % 40 - 20} ${x} ${y})"/>`; }
  return s; }
function iceBoxFrontV2(t, o = {}) { const { w, h } = IB; let s = "";
  s += `<path d="M${-w / 2} ${-h} L${w / 2} ${-h} L${w / 2 - 8} -22 L${-w / 2 + 8} -22z" fill="url(#ibBody)" stroke="#1B4F86" stroke-width="6" stroke-linejoin="round"/><rect x="${-w / 2 - 6}" y="${-h - 12}" width="${w + 12}" height="24" rx="10" fill="#5FC1F0" stroke="#1B4F86" stroke-width="5"/>`;
  s += `<rect x="-70" y="${-h + 50}" width="140" height="46" rx="10" fill="#fff" opacity=".9"/>` + T(0, -h + 83, "ICE BOX", 28, "#2477B8", { w: 700 });
  for (let i = 0; i < 5; i++) { const x = -w / 2 + 40 + i * 70, y = -h + 6; s += `<rect x="${x - 15}" y="${y - 12}" width="28" height="22" rx="5" fill="#fff" stroke="#9FD0EA" stroke-width="2.5" transform="rotate(${(i * 37) % 50 - 25} ${x} ${y})"/>`; }   // ice over the rim
  for (const x of [-w / 2 + 34, w / 2 - 34]) s += `<path d="M${x} -22 v8" stroke="#59616B" stroke-width="8"/><circle cx="${x}" cy="-8" r="10" fill="#2B2F36"/><circle cx="${x}" cy="-8" r="4" fill="#8C96A2"/>`;   // castors
  return s; }
// a stack of plastic stools (n), or one stool rotated; origin = bottom middle
const stoolV2 = (col = "#E5484D") => `<path d="M-46 -90 L46 -90 L40 -80 L-40 -80z" fill="${col}" stroke="#7A1E22" stroke-width="4"/><path d="M-38 -80 L-48 0 M38 -80 L48 0 M-30 -80 L-20 0 M30 -80 L20 0" stroke="${col}" stroke-width="10"/><path d="M-38 -80 L-48 0 M38 -80 L48 0" stroke="#7A1E22" stroke-width="3" opacity=".6"/><ellipse cx="0" cy="-92" rx="48" ry="9" fill="${col}" stroke="#7A1E22" stroke-width="4"/>`;
const ballV2 = (rot = 0) => `<g transform="rotate(${n2(rot)})"><circle r="34" fill="#FFC83A" stroke="#B7791F" stroke-width="5"/><path d="M-34 0 Q0 -16 34 0 M0 -34 Q-14 0 0 34" stroke="#E5484D" stroke-width="7" fill="none"/></g>`;
// the cardboard crown "KING OF THE VOID DECK", origin = its bottom middle
const crownV2 = () => `<path d="M-90 0 L-96 -86 L-58 -50 L-30 -104 L0 -56 L30 -104 L58 -50 L96 -86 L90 0z" fill="url(#crownG)" stroke="#8A5A1E" stroke-width="6" stroke-linejoin="round"/><circle cx="-30" cy="-104" r="8" fill="#E5484D"/><circle cx="30" cy="-104" r="8" fill="#3AA6E8"/><circle cx="-96" cy="-86" r="7" fill="#43BF6C"/><circle cx="96" cy="-86" r="7" fill="#43BF6C"/><rect x="-88" y="-34" width="176" height="28" rx="4" fill="#FFF3C8" opacity=".9"/>${T(0, -14, "KING OF THE", 15, "#8A5A1E", { w: 700 })}`;
const crownStoolV2 = (on = 1) => `<rect x="-60" y="-120" width="120" height="16" rx="6" fill="#B9B2A5" stroke="#8A8274" stroke-width="3"/><path d="M-50 -104 L-58 0 M50 -104 L58 0 M-20 -104 L-24 0 M20 -104 L24 0" stroke="#A39B8C" stroke-width="9"/>` + (on ? `<g transform="translate(0 -120) scale(.62)">${crownV2()}</g><g transform="translate(0 -178)">${tpill(0, 0, "KING OF THE VOID DECK", 16, P.ink, "#fff", { w: 700 })}</g>` : "");
// Pip's clipboard: BELL / BRAKES / CHAIN boxes; ticks = { bell, brakes, chain } (0..1 the tick is drawn); o.order
function clipboardV2(t, ticks = {}, o = {}) { const rows = o.order || ["bell", "brakes", "chain"], lab = { bell: "BELL", brakes: "BRAKES", chain: "CHAIN" }; let s = `<g filter="url(#dropS)"><rect x="-110" y="-150" width="220" height="290" rx="14" fill="#C99A5B" stroke="#7A5226" stroke-width="5"/></g><rect x="-92" y="-118" width="184" height="240" rx="6" fill="#fff"/><rect x="-40" y="-166" width="80" height="34" rx="8" fill="#8C96A2" stroke="#59616B" stroke-width="4"/>`;
  s += T(0, -86, "CHECKLIST", 26, P.ink, { w: 700 });
  rows.forEach((r, i) => { const y = -36 + i * 62, k = ticks[r] || 0, hi = o.hi === r ? .5 + .5 * Math.sin(t * 8) : 0;
    s += (hi ? `<rect x="-86" y="${y - 28}" width="172" height="52" rx="8" fill="${P.sun}" opacity="${n2(.35 + .3 * hi)}"/>` : "") + `<rect x="-76" y="${y - 18}" width="36" height="36" rx="6" fill="#fff" stroke="${P.ink}" stroke-width="5"/>` + T(-28, y + 11, lab[r], 28, P.ink, { a: "start", w: 700 });
    if (k > 0) { const L = 70 * k; s += `<path d="M-70 ${y} l12 14 l26 -34" stroke="${P.leaf}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${n2(L)} 80"/>`; } });
  return s; }
// the starter flag (chequered), origin = the bottom of its stick; wave 0..1
const flagV2 = (t, wave = 0) => { const w = 10 * wave * Math.sin(t * 14); let sq = ""; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2 === 0) sq += `<rect x="${i * 24}" y="${j * 24}" width="24" height="24" fill="${P.ink}"/>`;
  return `<path d="M0 0 V-170" stroke="#8A5A2B" stroke-width="8" stroke-linecap="round"/><g transform="translate(0 -170) skewY(${n2(w)})"><rect width="96" height="72" fill="#fff" stroke="${P.ink}" stroke-width="4"/>${sq}</g>`; };
// the finish ribbon between two posts, broken (0..1)
const ribbonV2 = (x0, x1, y, brk = 0) => brk <= 0 ? `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y + 20} ${x1} ${y}" stroke="#E5484D" stroke-width="8" fill="none"/>`
  : `<path d="M${x0} ${y} Q${x0 + 40} ${y + 60 * brk} ${n2(x0 + 30 + 40 * (1 - brk))} ${n2(y + 120 * brk)}" stroke="#E5484D" stroke-width="8" fill="none"/><path d="M${x1} ${y} Q${x1 - 40} ${y + 60 * brk} ${n2(x1 - 30 - 40 * (1 - brk))} ${n2(y + 120 * brk)}" stroke="#E5484D" stroke-width="8" fill="none"/>`;

/* ================================================================ the places ================================================================ */
// THE VOID DECK v2 (baked `vdv2`): v1's back wall (pillars 214, letterboxes, notice board, the bicycle bay), now with the paved floor in
// front (they race on it), the drinks stall against the back wall (counter, awning DRINKS, a small radio), the chalk START / FINISH line
// across the floor at x 520 and the chalk words. The ice box, the crown stool, the stools and everything that moves are drawn live.
BG.vdv2 = () => { let s = BG.vdp4();
  // the drinks stall, in front of the round table's spot (v1's table is covered by it)
  s += `<g transform="translate(1000 560)"><rect x="-260" y="-70" width="520" height="60" rx="6" fill="#E5484D" stroke="#9E2A2E" stroke-width="5"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${-260 + i * 65} -10 q32 34 65 0" fill="${i % 2 ? "#fff" : "#E5484D"}" stroke="#9E2A2E" stroke-width="4"/>`).join("")}${T(0, -28, "DRINKS", 40, "#fff")}
    <rect x="-240" y="30" width="480" height="230" fill="#F2E2C4" stroke="#B89B6E" stroke-width="5"/><rect x="-240" y="30" width="480" height="26" fill="#D9C39A"/><path d="M-200 -10 V30 M200 -10 V30" stroke="#B89B6E" stroke-width="8"/>
    <rect x="120" y="-2" width="70" height="40" rx="6" fill="#59616B"/><circle cx="140" cy="18" r="12" fill="#2B2F36"/><rect x="158" y="8" width="24" height="6" fill="#C9D1DA"/><path d="M180 -2 l20 -30" stroke="#59616B" stroke-width="3"/>
    <rect x="-200" y="-2" width="60" height="34" rx="4" fill="#fff" stroke="#B89B6E" stroke-width="3"/>${T(-170, 22, "$1", 22, "#E5484D")}</g>`;
  // the paved floor in front (no grass verge any more)
  s += `<rect x="-200" y="900" width="2320" height="320" fill="url(#floorV2)"/><path d="M-200 900 H2120" stroke="#B5AA95" stroke-width="5"/>`;
  for (let i = 0; i < 26; i++) s += `<path d="M${-200 + i * 100} 900 L${-520 + i * 140} 1210" stroke="#C2B8A4" stroke-width="3" opacity=".65"/>`;
  for (const y of [960, 1040, 1130]) s += `<path d="M-200 ${y} H2120" stroke="#C2B8A4" stroke-width="3" opacity=".65"/>`;
  // the chalk START / FINISH line, across the floor (it recedes up and to the left)
  s += `<path d="M560 1210 L470 900" stroke="#fff" stroke-width="20" opacity=".85" stroke-linecap="round" stroke-dasharray="40 6"/><g transform="translate(360 1160) rotate(-4)" opacity=".85">${T(0, 0, "START", 40, "#fff", { w: 700 })}</g><g transform="translate(690 1160) rotate(-4)" opacity=".85">${T(0, 0, "FINISH", 40, "#fff", { w: 700 })}</g>`;
  return s; };
// THE RAMP (baked `rampv2`): the void deck's wheelchair ramp: a gentle slope with handrails, from the landing at the left (top, y 760)
// down to the floor at the right (y 1000); the void deck's pillars and wall behind; ramp line y(x) = RAMPY(x)
const RAMPY = (x) => x < 560 ? 760 : x > 1460 ? 1000 : 760 + (x - 560) * 240 / 900;
BG.rampv2 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#vdWall)"/><rect x="-200" y="-120" width="2320" height="150" fill="#E6DCCA"/><rect x="-200" y="26" width="2320" height="12" fill="#D4C8B2"/>`;
  s += [0, 1, 2, 3, 4].map((i) => `<rect x="${-60 + i * 480}" y="-20" width="230" height="16" rx="8" fill="#fff"/>`).join("");
  s += `<rect x="1500" y="120" width="620" height="560" fill="url(#vdSky)"/>` + hdbBlock27(1560, 220, 260, 420, "#EAD9F0", "#E58A6B") + `<rect x="1500" y="600" width="620" height="80" fill="url(#vdGrass)"/>` + tree27(1900, 650, .5);
  for (const x of [200, 900, 1440]) s += `<rect x="${x}" y="30" width="120" height="760" fill="#EFE6D6" stroke="#CFC3AD" stroke-width="5"/><g transform="translate(${x + 60} 250)"><rect x="-44" y="-30" width="88" height="60" rx="8" fill="#2B5F8F"/>${T(0, 14, "214", 38, "#fff")}</g>`;
  s += `<g transform="translate(420 340)"><rect width="380" height="250" rx="8" fill="#9AA6B6" stroke="#6D788C" stroke-width="5"/>${[...Array(24)].map((_, i) => `<rect x="${12 + (i % 6) * 60}" y="${12 + Math.floor(i / 6) * 58}" width="52" height="48" rx="4" fill="#C7D0DB" stroke="#7D8896" stroke-width="2"/>`).join("")}</g>`;
  // the floor below, the ramp (its side wall), the landing
  s += `<rect x="-200" y="980" width="2320" height="240" fill="url(#floorV2)"/>`;
  s += `<path d="M-200 760 L560 760 L1460 1000 L2120 1000 L2120 1220 L-200 1220z" fill="url(#rampTop)"/><path d="M-200 760 L560 760 L1460 1000 L2120 1000" stroke="#A39B8C" stroke-width="6" fill="none"/>`;
  s += `<path d="M-200 790 L560 790 L1460 1030 L2120 1030 L2120 1220 L-200 1220z" fill="#CFC5B2"/>`;
  for (let i = 0; i < 9; i++) { const x = 600 + i * 100; s += `<path d="M${x} ${RAMPY(x) + 30} L${x - 60} 1220" stroke="#B9AE98" stroke-width="3" opacity=".6"/>`; }
  // handrails (the back one)
  const rail = (dy, w, c) => `<path d="M-200 ${700 + dy} L560 ${700 + dy} L1460 ${940 + dy} L2120 ${940 + dy}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  s += rail(-40, 10, "#8C96A2") + [0, 300, 560, 860, 1160, 1460, 1800].map((x) => `<path d="M${x} ${RAMPY(x) - 4} V${RAMPY(x) - 104}" stroke="#8C96A2" stroke-width="8"/>`).join("") + rail(-104 + 64, 8, "#B9C1CB");
  s += `<g transform="translate(150 700)"><rect x="-60" y="-80" width="120" height="70" rx="8" fill="#2B5F8F"/><path d="M-20 -60 a12 12 0 1 1 1 0 M-20 -42 v18 h20 l10 16 M-30 -36 a22 22 0 1 0 34 20" stroke="#fff" stroke-width="5" fill="none"/></g>`;
  return s; };
// the ramp's FRONT handrail (drawn over the buddies and the bike, so they are on the ramp, behind it)
const rampFront = () => `<path d="M-200 820 L560 820 L1460 1060 L2120 1060" stroke="#8C96A2" stroke-width="11" fill="none" stroke-linecap="round" opacity=".9"/>` + [80, 420, 760, 1100, 1440].map((x) => `<path d="M${x} ${RAMPY(x) + 60} V${RAMPY(x) + 170}" stroke="#8C96A2" stroke-width="9" opacity=".9"/>`).join("");

// THE GARDEN PATH (baked `gardenv2`): the path by the garden at the edge of the void deck: a low hedge, flowers, the rain trees beyond,
// the path tiles; ground y 1050
BG.gardenv2 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#vdSky)"/>` + hdbBlock27(-120, 120, 360, 560, "#F2E2C4", "#7BB0E0") + hdbBlock27(1640, 100, 380, 580, "#EAD9F0", "#E58A6B") + hdbBlock27(1300, 260, 260, 420, "#DCEBD9", "#43BF6C");
  s += `<rect x="-200" y="620" width="2320" height="320" fill="url(#vdGrass)"/>` + tree27(380, 680, .9) + tree27(980, 660, 1.05) + tree27(1500, 690, .8);
  s += `<path d="M-200 820 Q960 780 2120 820 L2120 900 L-200 900z" fill="#3F8A37"/>` + [...Array(40)].map((_, i) => `<circle cx="${n2(-180 + i * 58)}" cy="${n2(818 - 14 * Math.sin(i * 1.3))}" r="${26 + (i % 3) * 6}" fill="${i % 2 ? "#4E9E44" : "#5DAF4D"}"/>`).join("");
  for (let i = 0; i < 26; i++) { const x = -160 + i * 90 + hash(i, 2) * 40, y = 860 + hash(i, 4) * 30; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="9" fill="${["#FF8FB1", "#FFC83A", "#fff", "#FF6F61"][i % 4]}"/><circle cx="${n2(x)}" cy="${n2(y)}" r="3.5" fill="#FFE27A"/>`; }
  s += `<rect x="-200" y="900" width="2320" height="320" fill="url(#vdPath)"/><path d="M-200 900 H2120" stroke="#A39B8C" stroke-width="5"/>` + [...Array(24)].map((_, i) => `<path d="M${-200 + i * 100} 900 L${-500 + i * 130} 1220" stroke="#A39B8C" stroke-width="3" opacity=".7"/>`).join("") + [990, 1100].map((y) => `<path d="M-200 ${y} H2120" stroke="#A39B8C" stroke-width="3" opacity=".7"/>`).join("");
  return s; };

// the runaway track (live, scrolling): the void deck's floor and back wall seen side-on, repeating (pillars, letterboxes, a notice
// board), parallax: the wall moves at .5 of the floor. cx = how far the camera has moved right (floor px). Ground y 1040.
function trackV2(t, cx) { const W_ = (x, w) => ((x % w) + w) % w; let s = `<rect width="1920" height="1080" fill="url(#vdWall)"/><rect width="1920" height="120" fill="#E6DCCA"/>`;
  for (let i = -1; i < 6; i++) { const x = i * 420 - W_(cx * .5, 420); s += `<rect x="${n2(x)}" y="-4" width="200" height="14" rx="7" fill="#fff"/>`; }
  for (let i = -1; i < 4; i++) { const x = i * 840 - W_(cx * .5, 840); s += `<rect x="${n2(x + 40)}" y="120" width="110" height="700" fill="#EFE6D6" stroke="#CFC3AD" stroke-width="5"/><g transform="translate(${n2(x + 95)} 300)"><rect x="-40" y="-28" width="80" height="56" rx="8" fill="#2B5F8F"/>${T(0, 12, "214", 34, "#fff")}</g>`
    + (i % 2 ? `<g transform="translate(${n2(x + 260)} 330)"><rect width="340" height="230" rx="8" fill="#9AA6B6" stroke="#6D788C" stroke-width="5"/>${[...Array(18)].map((_, j) => `<rect x="${12 + (j % 6) * 54}" y="${12 + Math.floor(j / 6) * 70}" width="46" height="58" rx="4" fill="#C7D0DB" stroke="#7D8896" stroke-width="2"/>`).join("")}</g>` : `<g transform="translate(${n2(x + 300)} 300)"><rect width="260" height="190" rx="8" fill="#B88A5E" stroke="#8A5A2B" stroke-width="5"/><rect x="12" y="12" width="236" height="166" fill="#D9B98C"/><rect x="30" y="26" width="90" height="70" fill="#fff"/><rect x="140" y="30" width="90" height="120" fill="#FFF3B8"/></g>`); }
  s += `<rect y="820" width="1920" height="260" fill="url(#floorV2)"/><path d="M0 820 H1920" stroke="#B5AA95" stroke-width="5"/>`;
  for (let i = -1; i < 22; i++) { const x = i * 100 - W_(cx, 100); s += `<path d="M${n2(x)} 820 L${n2(x - 160)} 1080" stroke="#C2B8A4" stroke-width="3" opacity=".7"/>`; }
  for (const y of [880, 960]) s += `<path d="M0 ${y} H1920" stroke="#C2B8A4" stroke-width="3" opacity=".65"/>`;
  return s; }
