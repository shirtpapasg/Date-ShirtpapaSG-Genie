// art23.js: EP23's own art, part A (drawn 2026-11-25): the electromagnet rig (an iron nail, a long plastic-covered wire coiled round it,
// the battery holder with one or two AA batteries, the leads, the ON / OFF tag, the soft gold glow of electricity, the clips), the scrap
// (steel bottle caps, aluminium ring-pulls, plastic caps, the steel bolt), the mini crane and its paper lorry, the two boards, Momo's poster,
// the wall socket, the school's old electric bell (and its cut-away), the scrapyard's crane, the two hidden animals, the drinks-stall
// auntie, and the WATCHING helper for the buddies. Loaded after tests.js / ep21dare.js / ep22dare.js / art22.js, before sets23.js, lc23.js.
// REALISM (script section 3; every drawing checked against it):
//  * the electromagnet is ONE iron nail (grey, a flat round head and a sharp point; the SAME grey on and off), a long PLASTIC-COVERED wire
//    (orange-red) coiled in neat side-by-side turns, its two short bare copper ends joined to the clips of a battery holder. The pull is
//    shown ONLY by the clips (they cling at the TIP, one hanging from another); no field lines, no tiny magnets, no sparks, never "current".
//  * electricity: a soft gold glow travelling from the battery, along the wire, round the nail and back, ONLY while both ends are joined.
//  * two batteries "in a row": the + of one touching the - of the next, in one holder.
//  * the scrapyard crane's big round grey disc hangs from chains on the crane's arm; it lifts iron and steel scrap and lets it go.
//  * the bell: a silver dome (the gong), a small hammer on a springy iron strip, a coil with MANY turns of thin copper wire round an iron core.
//  * the wall socket: white, three pins, its switch; nobody brings the wire near it.

/* ================================================================ geometry ================================================================ */
// a local point (lx, ly) of a thing drawn with TF(x, y, k, inner, rot) -> its point on screen
const LP = (x, y, k, rot, lx, ly) => { const a = (rot || 0) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [x + k * (lx * c - ly * s), y + k * (lx * s + ly * c)]; };

/* ================================================================ WATCHING (teacher, 25 Nov 2026) ================================================================ */
// "The pet buddies should look towards the magnet during this close up demonstration, not the audience. Unless you want only one random pet
// buddy wave at the audience" (SERIES_FORMAT 6, "Buddies watch the demonstration"). watchO(x, ox) -> buddy() options that turn the buddy at
// screen x towards the object at screen x ox. When the teacher's watching paintings arrive (characters/sprites/poses: <buddy>_watch_closed /
// _watch_ooh; prep_sprites.py copies them into spr/ by name), lib.js buddy0 swaps them in for the sitting pose automatically (o.watch); until
// then the buddy's own sitting painting is turned (flipped) to face the object and leans towards it.
const watchO = (x, ox, extra = {}) => ({ watch: ox, flip: ox < x, look: (ox < x ? -1 : 1) * 5, ...extra });
// one buddy, now and then (at most once a scene, never during the key teaching moment), glances at the viewer with a 1 s wave
const glanceWave = (t0) => [[t0, "waving"], [t0 + 1.05, "sit"]];

/* ================================================================ THE ELECTROMAGNET RIG ================================================================ */
// drawn in a VERTICAL frame: the nail's TIP at (0, 0), the nail hanging point down, its flat head at (0, -287). Every option:
//  n turns (10), sp (11 px a turn: ten turns cover half the shank, twenty the whole of it), nt: turns shown so far (the coiling, fractional),
//  y0: where the coil starts below the head (-252), layer2: extra turns laid as a second layer (EP24's twenty-five turns)
//  hold [hx, hy]: the battery holder's bottom middle (default left of the nail), batt: 1 or 2 AA batteries, hk: the holder's scale,
//  hA: the holder's presence 0..1 (0 = taken away and gone: never a ghost), hdx/hdy: its offset while it is lifted away,
//  jA, jB: each lead joined to the holder 0..1 (0 = its end apart, a clear gap), flow 0..1 (the gold glow, only when both are joined),
//  free: [[x, y], [x, y]]: where the two bare ends lie when there is no holder; tag: "on" / "off" (beside the holder, joined by a line)
//  clips: [n, {t0, from, drop, to}] the bunch at the tip (art22.js clipBunch); noNail: the coil only
const BARE = (x, y, a) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(a)})"><path d="M0 0 L16 0" stroke="#8A4A1E" stroke-width="7" stroke-linecap="round"/><path d="M0 0 L16 0" stroke="${COPC}" stroke-width="3.6" stroke-linecap="round"/></g>`;
const leadPath = (x1, y1, x2, y2, bend = 60) => `M${n2(x1)} ${n2(y1)} C${n2(x1 - bend * .3)} ${n2(y1 + bend)} ${n2(x2)} ${n2(y2 + bend * 1.2)} ${n2(x2)} ${n2(y2)}`;
const wireStroke = (d, o = {}) => `<path d="${d}" stroke="${WIRED}" stroke-width="${o.w || 10}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${WIREC}" stroke-width="${(o.w || 10) * .6}" fill="none" stroke-linecap="round"/>`;
// the gold glow along a path: a soft wide gold stroke + bright dashes moving along it (direction: from the battery, along the wire)
const glowStroke = (d, t, a, ph = 0, rev = false) => a <= .01 ? "" : OP(a, `<path d="${d}" stroke="${FLOWC}" stroke-width="22" fill="none" stroke-linecap="round" opacity=".35" filter="url(#b4)"/><path d="${d}" stroke="#FFF3B0" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="14 26" stroke-dashoffset="${n2((rev ? 1 : -1) * ((t * 60 + ph) % 40))}"/>`);
function battHolder23(t, n = 1, o = {}) {   // origin = the holder's bottom middle; clips at x = -W/2 (the "-" end) and +W/2 (the "+" end), y -45
  if (n === 1) return battery22d(0, 0, 1);
  // TWO AA batteries in a row in one holder (+ of one touching - of the next)
  const cell = (cx) => `<rect x="${cx - 86}" y="-62" width="140" height="46" rx="10" fill="#3A3A44"/><rect x="${cx + 54}" y="-62" width="26" height="46" rx="8" fill="#D9A43A"/><rect x="${cx + 80}" y="-48" width="8" height="18" rx="3" fill="#C9C9C9"/><path d="M${cx - 76} -54 H${cx + 44}" stroke="#6A6A76" stroke-width="4" opacity=".7"/>`
    + `<text x="${cx + 67}" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#3A2E16">+</text><text x="${cx - 66}" y="-31" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#fff">−</text>`;
  return `<rect x="-206" y="-78" width="412" height="78" rx="12" fill="#2E2E36" stroke="#16161C" stroke-width="4"/>` + cell(-96) + cell(92)
    + `<rect x="-212" y="-60" width="10" height="30" rx="3" fill="#C9CED4" stroke="#6E7882" stroke-width="2"/><rect x="202" y="-60" width="10" height="30" rx="3" fill="#C9CED4" stroke="#6E7882" stroke-width="2"/>`
    + `<text x="-96" y="-84" font-family="Fredoka" font-weight="700" font-size="20" text-anchor="middle" fill="#5A5A66">AA</text><text x="92" y="-84" font-family="Fredoka" font-weight="700" font-size="20" text-anchor="middle" fill="#5A5A66">AA</text>`; }
const HOLDW = (n) => n === 2 ? 207 : 113;   // half the holder's width (where its clips are)
const onTag = (on, k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-58" y="-26" width="116" height="52" rx="26" fill="${on ? ONC : OFFC}"/></g>` + (on ? `<rect x="-66" y="-34" width="132" height="68" rx="34" fill="none" stroke="#9BF5B4" stroke-width="5" opacity=".7"/>` : "") + T(0, 12, on ? "ON" : "OFF", 34, "#fff", { ls: 3 }));
function rig23(t, o = {}) { const n = o.n || 10, sp = o.sp || 11, y0 = o.y0 === undefined ? -252 : o.y0, nt = o.nt === undefined ? n : clamp(o.nt, 0, n), nb = Math.floor(nt), fr = nt - nb, hw = 16;
  const flow = o.flow || 0, l2 = o.layer2 || 0, yEnd = y0 + n * sp;
  let back = "", front = "", glow = "";
  for (let i = 0; i < Math.ceil(nt); i++) { const y = y0 + i * sp, part = i < nb ? 1 : fr;
    back += `<path d="M${hw} ${n2(y + sp * .5)} Q0 ${n2(y + sp * .8)} ${-hw} ${n2(y + sp)}" stroke="#8A3A16" stroke-width="7" fill="none" stroke-linecap="round" opacity="${n2(part)}"/>`;
    const d = `M${-hw} ${n2(y)} Q0 ${n2(y + sp * .1)} ${n2(-hw + 2 * hw * part)} ${n2(y + sp * .5 * part)}`;
    front += `<path d="${d}" stroke="${WIRED}" stroke-width="9.5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${WIREC}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${-hw + 4} ${n2(y + 1)} q6 0 10 2" stroke="#FFC9A0" stroke-width="2" fill="none" opacity=".8"/>`;
    if (flow > .01) front += OP(flow * clamp(Math.sin((t * 5 - i * .45)) * .5 + .7), `<path d="${d}" stroke="#FFF3B0" stroke-width="4" fill="none" stroke-linecap="round"/>`); }
  for (let i = 0; i < l2; i++) { const y = y0 + i * sp * 1.6 + 6, d = `M${-hw - 6} ${n2(y)} Q0 ${n2(y + 2)} ${hw + 6} ${n2(y + sp * .8)}`; front += `<path d="${d}" stroke="${WIRED}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#F58A42" stroke-width="6.4" fill="none" stroke-linecap="round"/>`; }
  if (flow > .01 && nt > 0) glow += `<rect x="${-hw - 14}" y="${y0 - 6}" width="${2 * hw + 28}" height="${n2(nt * sp + 12)}" rx="20" fill="${FLOWC}" opacity="${n2(.22 * flow)}" filter="url(#b4)"/>`;
  const nail = o.noNail ? "" : nail22d(0, -150, 1, 90);
  // the two ends: A from the top of the coil, B from the bottom of the coil
  const A = [-hw, y0], B = [-hw, y0 + Math.max(1, nt) * sp];
  let leads = "", hold = "";
  if (o.hold && (o.hA === undefined || o.hA > .01) && nt >= n - .01) { const hn = o.batt || 1, hk = o.hk || .8, hx = o.hold[0] + (o.hdx || 0), hy = o.hold[1] + (o.hdy || 0), W2 = HOLDW(hn) * hk, ha = o.hA === undefined ? 1 : o.hA;
    const cA = [hx - W2 - 4, hy - 45 * hk], cB = [hx + W2 + 4, hy - 45 * hk], jA = o.jA === undefined ? 1 : o.jA, jB = o.jB === undefined ? 1 : o.jB;
    const eA = [lerp(cA[0] - 46, cA[0], jA), lerp(cA[1] + 60, cA[1], jA)], eB = [lerp(cB[0] + 40, cB[0], jB), lerp(cB[1] + 70, cB[1], jB)];
    const dA = leadPath(A[0], A[1], eA[0], eA[1], 70), dB = leadPath(B[0], B[1], eB[0], eB[1], 50);
    leads += wireStroke(dA) + wireStroke(dB) + BARE(eA[0], eA[1], jA > .5 ? 0 : 120) + BARE(eB[0], eB[1], jB > .5 ? 180 : 60);
    if (jA > .9 && jB > .9 && flow > .01) glow += glowStroke(dB, t, flow, 0, true) + glowStroke(dA, t, flow, 20);
    hold = OP(ha, TF(hx, hy, hk, battHolder23(t, hn)) + `<g transform="translate(${n2(cA[0])} ${n2(cA[1])})"><rect x="-8" y="-10" width="16" height="20" rx="4" fill="#C9CED4" stroke="#6E7882" stroke-width="2.5"/></g><g transform="translate(${n2(cB[0])} ${n2(cB[1])})"><rect x="-8" y="-10" width="16" height="20" rx="4" fill="#C9CED4" stroke="#6E7882" stroke-width="2.5"/></g>`);
    if (o.tag) { const tx = hx, ty = hy + 52 * hk + 10; hold += OP(ha, `<path d="M${n2(tx)} ${n2(hy + 4)} V${n2(ty - 26)}" stroke="#fff" stroke-width="5"/>` + TF(tx, ty, .9, onTag(o.tag === "on"))); } }
  else if (nt >= .99) { const F = o.free || [[A[0] - 70, A[1] + 120], [B[0] - 50, B[1] + 90]]; const dA = leadPath(A[0], A[1], F[0][0], F[0][1], 60), dB = leadPath(B[0], B[1], F[1][0], F[1][1], 40);
    leads += wireStroke(dA) + wireStroke(dB) + BARE(F[0][0], F[0][1], 110) + BARE(F[1][0], F[1][1], 80); }
  else if (o.reel) { const dR = `M${A[0]} ${A[1]} C-80 ${y0 - 40} ${o.reel[0] + 60} ${o.reel[1] - 80} ${o.reel[0]} ${o.reel[1]}`, dT = `M${n2(-hw + 2 * hw * fr)} ${n2(y0 + nb * sp + sp * .5 * fr)} C${hw + 60} ${n2(y0 + nb * sp + 30)} ${o.reel[0] + 80} ${o.reel[1] + 40} ${o.reel[0] + 20} ${o.reel[1] + 10}`;
    leads += wireStroke(dR) + wireStroke(dT); }
  const clips = o.clips ? clipBunch(t, 0, 2, o.clips[0], { k: o.ck || .9, ...(o.clips[1] || {}) }) : "";
  return glow + back + nail + leads + front + hold + clips; }
// the rig's useful points (vertical frame): tip, head, the holder's middle
const RIG_TIP = [0, 0];

/* ================================================================ THE SCRAP ================================================================ */
// a steel bottle cap (a crown cap: silver-grey, crimped edge; origin = its middle, about 46 across)
const steelCap23 = (x, y, a = 0, k = 1) => TF(x, y, k, `<circle r="23" fill="#B9C0C6" stroke="#5E666E" stroke-width="3"/>` + [...Array(14)].map((_, i) => { const an = i * Math.PI / 7; return `<circle cx="${n2(Math.cos(an) * 22)}" cy="${n2(Math.sin(an) * 22)}" r="4" fill="#A7AFB6" stroke="#5E666E" stroke-width="1.6"/>`; }).join("") + `<circle r="15" fill="#D3D9DE"/><circle cx="-5" cy="-6" r="5" fill="#fff" opacity=".7"/>`, a);
// an aluminium ring-pull (a small silver ring with a tab; brighter and lighter than steel)
const ringPull23 = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="M-22 -12 Q-30 0 -22 12 Q-8 20 6 12 L22 8 Q30 0 22 -8 L6 -12 Q-8 -20 -22 -12z" fill="#EEF2F6" stroke="#8C98A4" stroke-width="3"/><ellipse cx="-10" cy="0" rx="9" ry="7" fill="#F7F9FB" stroke="#8C98A4" stroke-width="2.4"/><circle cx="14" cy="0" r="3" fill="#B6C0CA"/>`, a);
// a plastic bottle cap (bright colour, ridged)
const plasticCap23 = (x, y, col = "#3A8DFF", a = 0, k = 1) => TF(x, y, k, `<rect x="-20" y="-14" width="40" height="28" rx="6" fill="${col}" stroke="${P.ink}" stroke-width="2.6" opacity=".95"/>` + [-12, -4, 4, 12].map((dx) => `<path d="M${dx} -12 V12" stroke="#fff" stroke-width="2" opacity=".35"/>`).join("") + `<rect x="-18" y="-12" width="36" height="6" rx="3" fill="#fff" opacity=".35"/>`, a);
// the steel bolt: a short grey bolt with a hex head, chunky (origin = its middle, head at the LEFT; about 120 x 56 at k 1)
const bolt23 = (x, y, a = 0, k = 1) => TF(x, y, k, `<path d="M-60 -28 L-34 -28 L-26 -14 V14 L-34 28 L-60 28 L-68 14 V-14z" fill="#9AA3AB" stroke="#3E464E" stroke-width="4" stroke-linejoin="round"/><path d="M-58 -20 H-36 M-58 0 H-30 M-58 20 H-36" stroke="#CDD3D8" stroke-width="3"/>`
  + `<rect x="-26" y="-15" width="86" height="30" rx="5" fill="url(#gNail)" stroke="#3E464E" stroke-width="4"/>` + [...Array(8)].map((_, i) => `<path d="M${-18 + i * 10} -15 l6 30" stroke="#5E666E" stroke-width="2.4"/>`).join(""), a);
// the SCRAP TRAY (a shallow box lid; origin = its front middle, 360 wide at k 1): steel caps, steel clips, aluminium ring-pulls, plastic caps
// and (o.bolt !== false) the steel bolt; o.steel = false: the steel caps and clips are gone (lifted away)
function scrapTray23(t, x, y, k = 1, o = {}) { let s = `<ellipse cx="0" cy="6" rx="196" ry="16" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M-180 -64 H180 L168 0 H-168z" fill="#D8B27E" stroke="#8A6438" stroke-width="5" stroke-linejoin="round"/><path d="M-164 -54 H164 L156 -8 H-156z" fill="#C49A62"/>`;
  const R = [[-120, -32, 20], [-40, -40, -30], [60, -30, 50], [130, -38, 10]], PC = [[-80, -22, "#3A8DFF"], [100, -18, "#FFC83A"], [20, -44, "#E0453A"]], SC_ = [[-140, -20], [-10, -24], [140, -16]], CL = [[-100, -44, 30], [40, -20, -40], [-60, -34, 80]];
  R.forEach(([a, b, r]) => { s += ringPull23(a, b, r, .9); }); PC.forEach(([a, b, c]) => { s += plasticCap23(a, b, c, 10, .9); });
  if (o.steel !== false) { SC_.forEach(([a, b], i) => { s += steelCap23(a, b, i * 30, .9); }); CL.forEach(([a, b, r]) => { s += clip22d(a, b, r, .8); }); }
  if (o.bolt !== false) s += bolt23(o.boltX || -20, o.boltY || -34, -8, .62);
  return TF(x, y, k, s); }

/* ================================================================ THE MINI CRANE (Recycling Week) ================================================================ */
// a cardboard tower on a shoebox base, a yellow pencil arm on top, a string from the arm's tip with the coiled nail tied on by its head as the
// hook (point down); the battery holder sits on the base, its two leads taped up the tower, along the arm and down the string.
// origin = the base's bottom middle (about 260 wide, 520 tall at k 1). o.a: the arm's swing (0 = over the scrap tray on the LEFT, 1 = over
// the lorry on the RIGHT); o.drop: how far the hook hangs below the arm (px, default 150); o.rig: options for the hook's rig23 (turns, clips,
// flow); o.load: svg hanging under the hook's tip (local to the tip); o.batt (1/2); o.on (the battery joined: the ON tag on the base)
function miniCrane23(t, x, y, k = 1, o = {}) { const a = o.a || 0, L = 250, ang = Math.PI * (1 - a), tipX = Math.cos(ang) * L, tipY = -470 - Math.sin(ang) * 30, drop = o.drop === undefined ? 150 : o.drop, hk = o.hk || .55;
  let s = `<ellipse cx="0" cy="6" rx="170" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-140" y="-90" width="280" height="90" rx="6" fill="#D8C9B2" stroke="#8A7A62" stroke-width="5"/><rect x="-140" y="-90" width="280" height="22" fill="#C7B79E"/>` + T(0, -32, "shoebox", 22, "#8A7A62", { w: 600 })
    + `<path d="M-34 -90 L-26 -470 H26 L34 -90z" fill="#C99A62" stroke="#7A5230" stroke-width="5" stroke-linejoin="round"/>` + [-380, -300, -220, -140].map((yy) => `<path d="M-30 ${yy} H30" stroke="#A8804E" stroke-width="3"/><path d="M-30 ${yy} L28 ${yy + 80}" stroke="#A8804E" stroke-width="2.4" opacity=".6"/>`).join("");
  // the battery holder on the base
  s += TF(70, -96, .5, battHolder23(t, o.batt || 1)) + (o.on !== undefined ? TF(70, -150, .55, onTag(!!o.on)) : "");
  // the arm (a pencil): drawn behind the tower when it points away
  const arm = `<g transform="translate(0 -476)"><path d="M0 0 L${n2(tipX)} ${n2(tipY + 476)}" stroke="#3A2E52" stroke-width="22" stroke-linecap="round"/><path d="M0 0 L${n2(tipX)} ${n2(tipY + 476)}" stroke="#FFC83A" stroke-width="16" stroke-linecap="round"/><path d="M0 -3 L${n2(tipX * .96)} ${n2((tipY + 476) * .96 - 3)}" stroke="#FFE38A" stroke-width="4"/><circle r="16" fill="#E0453A" stroke="#7A2A1E" stroke-width="4"/></g>`;
  s += arm;
  // the leads: up the tower, along the arm, down the string (taped)
  const sx = tipX, sy = tipY, hy = sy + drop;
  s += `<path d="M60 -110 C40 -200 20 -300 12 -470 L${n2(sx + 6)} ${n2(sy)} V${n2(hy - 300 * hk)}" stroke="${WIRED}" stroke-width="5" fill="none"/><path d="M80 -110 C60 -200 30 -300 18 -470 L${n2(sx + 12)} ${n2(sy)} V${n2(hy - 280 * hk)}" stroke="${WIREC}" stroke-width="4" fill="none"/>`;
  s += `<path d="M${n2(sx)} ${n2(sy)} V${n2(hy - 287 * hk - 8)}" stroke="#F4F0E6" stroke-width="4"/><path d="M${n2(sx)} ${n2(sy)} V${n2(hy - 287 * hk - 8)}" stroke="#B8AE98" stroke-width="1.6"/>`
    + [.3, .6].map((u) => `<rect x="${n2(sx - 10)}" y="${n2(lerp(sy, hy - 287 * hk, u) - 6)}" width="26" height="12" rx="3" fill="#E8E2D0" opacity=".9"/>`).join("");
  // the hook: the coiled nail, tied by its head, point down
  s += TF(sx, hy, hk, rig23(t, { n: 10, ...(o.rig || {}), free: [[-30, -200], [-14, -120]] })) + (o.load ? TF(sx, hy, 1, o.load) : "");
  return TF(x, y, k, s); }
// where the crane's hook tip is (screen), for things hanging from it
const craneTip = (x, y, k, o = {}) => { const a = o.a || 0, ang = Math.PI * (1 - a), tipX = Math.cos(ang) * 250, tipY = -470 - Math.sin(ang) * 30; return [x + k * tipX, y + k * (tipY + (o.drop === undefined ? 150 : o.drop))]; };
// the PAPER LORRY (origin = its wheels' middle on the table; about 300 x 170 at k 1): a folded-paper cab and a tipper body; o.load: svg inside
const paperLorry23 = (t, x, y, k = 1, o = {}) => TF(x, y, k, `<ellipse cx="0" cy="4" rx="160" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="-150" y="-118" width="200" height="86" rx="6" fill="#7FC6F2" stroke="#2E6E9A" stroke-width="5"/>`
  + `<path d="M-150 -118 L-140 -150 H40 L50 -118" fill="#A8DAF8" stroke="#2E6E9A" stroke-width="4" stroke-linejoin="round"/>` + (o.load || "") + `<path d="M-146 -80 H46" stroke="#2E6E9A" stroke-width="3" opacity=".5"/>`
  + `<path d="M56 -32 V-110 H112 L142 -70 V-32z" fill="#FFB34A" stroke="#A8641E" stroke-width="5" stroke-linejoin="round"/><path d="M70 -100 H106 L126 -72 H70z" fill="#E6F6FF" stroke="#A8641E" stroke-width="3"/>`
  + `<rect x="-156" y="-34" width="306" height="16" rx="6" fill="#5A5A66"/>` + [-100, -20, 100].map((wx) => `<circle cx="${wx}" cy="-8" r="24" fill="#3A3A44" stroke="#1E1E26" stroke-width="4"/><circle cx="${wx}" cy="-8" r="9" fill="#C9CED4"/>`).join("")
  + T(-50, -64, "LORRY", 24, "#2E6E9A", { w: 700 }));

/* ================================================================ THE BOARDS ================================================================ */
// a little wooden easel (Pip's, from EP22) with a card on it: origin = the feet on the table, the card w x h above
const easel23 = (w, h, inner) => `<ellipse cx="0" cy="4" rx="${w * .42}" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w * .36} 0 L${-w * .2} ${-h - 70} M${w * .36} 0 L${w * .2} ${-h - 70} M0 0 L0 ${-h - 80}" stroke="#7A5230" stroke-width="12" stroke-linecap="round"/>`
  + `<rect x="${-w * .44}" y="-58" width="${w * .88}" height="14" rx="5" fill="#9A6A3A"/><g transform="translate(0 ${-h - 50})"><g filter="url(#drop)"><rect x="${-w / 2}" y="0" width="${w}" height="${h}" rx="14" fill="#FFF8EA" stroke="#C9A878" stroke-width="5"/></g>${inner}</g>`;
const boxTick = (x, y, on, s = 1) => `<rect x="${x - 14 * s}" y="${y - 14 * s}" width="${28 * s}" height="${28 * s}" rx="5" fill="#fff" stroke="${P.ink}" stroke-width="3"/>` + (on > .02 ? `<path d="M${x - 9 * s} ${y} L${x - 2 * s} ${y + 8 * s} L${x + 12 * s} ${y - 10 * s}" stroke="${GOODC}" stroke-width="${6 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(Math.min(1, on))}"/>` : "");
// OUR MINI CRANE (Part 1): w 520 x h 470 card on the easel. o.box1 / o.box2 / o.box3 (times they fill), o.need (the four ticks), o.all
function boardCrane23(t, x, y, k = 1, o = {}) { const W = 520, Hh = 470, at = (tt) => tt === undefined ? 0 : (o.all ? 1 : ramp(t, tt, .35));
  let c = T(0, 46, "OUR MINI CRANE", 40, P.ink, { ls: 2 }) + T(0, 78, "Recycling Week", 24, "#8A6438", { w: 600 });
  // the drawing: a little crane over a tray, a lorry
  c += `<g transform="translate(-120 172) scale(.26)">${miniCrane23(t, 0, 120, 1, { drop: 130 })}</g>` + `<g transform="translate(-160 196) scale(.3)">${scrapTray23(t, 0, 0, 1, {})}</g>` + `<g transform="translate(30 200) scale(.32)">${paperLorry23(t, 0, 0, 1)}</g>`;
  c += T(150, 128, "Lift: steel ✓", 24, "#2F8048", { w: 700 }) + T(150, 160, "Leave:", 22, "#8A5A36", { w: 700 }) + T(150, 186, "aluminium, plastic", 20, "#8A5A36", { w: 600 });
  // the three boxes
  const BXS = [["1 The magnet", o.box1, "Momo's electromagnet ✓"], ["2 Drop it", o.box2, "switch off to drop ✓"], ["3 Stay safe", o.box3, ""]];
  BXS.forEach(([lab, tt, fill], i) => { const bx = -170 + i * 170, by = 240, a = at(tt);
    c += `<rect x="${bx - 78}" y="${by}" width="156" height="96" rx="10" fill="${a > .5 ? "#EAF8EC" : "#fff"}" stroke="${a > .5 ? GOODC : "#C9A878"}" stroke-width="4"/>` + T(bx, by + 24, lab, 19, P.ink, { w: 700 });
    if (a > .01 && fill) c += OP(a, wrap(fill, 17, 140, 700).map((l, j) => T(bx, by + 52 + j * 20, l, 17, "#2F8048", { w: 700 })).join(""));
    if (i === 2 && o.icons) o.icons.forEach((ti, j) => { if (t >= ti || o.all) c += TF(bx - 46 + j * 46, by + 64, spring(t, ti, .4) * (o.all ? 1 : 1), safeIcon23(j, .55)); }); });
  c += T(-226, 370, "What we need:", 22, P.ink, { a: "start", w: 700 });
  ["iron nail", "long wire", "battery", "both ends joined"].forEach((w, i) => { const bx = -220 + (i % 2) * 250, by = 400 + Math.floor(i / 2) * 36, a = o.need === undefined ? 0 : (o.all ? 1 : ramp(t, o.need + i * .25, .3));
    c += boxTick(bx + 10, by, a, .8) + T(bx + 32, by + 7, w, 20, P.ink, { a: "start", w: 600 }); });
  return TF(x, y, k, easel23(W, Hh, c)); }
// the three WARNING icons (7.5): 0 a clock with wiggly heat lines (not for too long: hot), 1 a hand by bare wire ends, crossed, 2 the wall socket, crossed
function safeIcon23(i, k = 1) { const X = `<path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#D84A3A" stroke-width="9" stroke-linecap="round"/>`;
  const bgc = `<circle r="40" fill="#fff" stroke="${P.ink}" stroke-width="4"/>`;
  if (i === 0) return TF(0, 0, k, bgc + `<circle cx="-6" cy="6" r="20" fill="#fff" stroke="${P.ink}" stroke-width="4"/><path d="M-6 6 V-6 M-6 6 L4 10" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>` + [12, 22, 32].map((dx) => `<path d="M${dx} -4 q-4 -6 0 -12 q4 -6 0 -12" stroke="#E0453A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`).join(""));
  if (i === 1) return TF(0, 0, k, bgc + `<g transform="translate(-6 8) scale(.42) rotate(-20)">${hand15({ sleeve: "#C9A878", sleeveD: "#8A6438" })}</g>` + BARE(8, -16, -30) + BARE(10, -4, -10) + X);
  return TF(0, 0, k, bgc + TF(0, 0, .42, socket23(0, 0, 1)) + X); }
// HOW STRONG? (Part 2): a small whiteboard on a stand (origin = the stand's feet on the bench; the board 520 x 400). rows fill at o.r1 / o.r2
// / o.r3 with a drawn bunch of clips each (no numbers: small, bigger, biggest); o.ready: READY FOR RECYCLING WEEK!
function howStrong23(t, x, y, k = 1, o = {}) { const W = 520, Hh = 400, at = (tt) => tt === undefined ? 0 : (o.all ? 1 : ramp(t, tt, .35));
  let c = `<rect x="${-W / 2}" y="0" width="${W}" height="${Hh}" rx="10" fill="#FDFEFF" stroke="#8A949E" stroke-width="8"/>` + T(0, 52, "HOW STRONG?", 44, "#2E6E9A", { ls: 2 }) + T(0, 84, "our crane magnet", 24, "#5A6A7A", { w: 600 });
  [["10 turns · 1 battery", o.r1, 3], ["20 turns · 1 battery", o.r2, 6], ["20 turns · 2 batteries", o.r3, 10]].forEach(([lab, tt, nc], i) => { const ry = 130 + i * 86, a = at(tt);
    c += `<path d="M${-W / 2 + 20} ${ry + 64} H${W / 2 - 20}" stroke="#D4DCE4" stroke-width="3"/>` + T(-W / 2 + 30, ry + 40, lab, 26, P.ink, { a: "start", w: 700 }) + `<rect x="120" y="${ry + 4}" width="120" height="58" rx="8" fill="none" stroke="#C9D2DA" stroke-width="3" stroke-dasharray="7 6"/>`;
    if (a > .01) { let b = ""; for (let j = 0; j < nc; j++) b += clip22d(140 + (j % 5) * 20, ry + 18 + Math.floor(j / 5) * 22 + (j % 2) * 6, 70 + j * 23, .5); c += OP(a, b); } });
  if (o.ready !== undefined && (t >= o.ready || o.all)) c += TF(0, Hh - 12, spring(t, o.ready, .45), `<g transform="rotate(-3)"><rect x="-230" y="-26" width="460" height="52" rx="26" fill="${GOODC}"/>${T(0, 12, "READY FOR RECYCLING WEEK!", 28, "#fff", { ls: 1 })}</g>`);
  return TF(x, y, k, `<ellipse cx="0" cy="4" rx="170" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-120 0 L-80 -110 M120 0 L80 -110" stroke="#6E7882" stroke-width="10" stroke-linecap="round"/><rect x="-14" y="-130" width="28" height="130" fill="#8A949E"/><g transform="translate(0 ${-Hh - 110})"><g filter="url(#drop)">${c}</g></g>`); }
// Momo's poster (Part 2's Showdown): "How to make our crane magnet", three ruled lines, each with a small drawing. o.lit [t1, t2, t3],
// o.strike (line 3 struck through, kept), o.rewrite (the green rewrite below it). origin = the easel's feet
function poster23(t, x, y, k = 1, o = {}) { const W = 600, Hh = 560, L = ["Coil a long wire round the iron nail.", "Join both ends to the battery.", "Electricity is stronger, so a light wooden chopstick works too!"];
  let c = T(0, 50, "How to make our crane magnet", 32, P.momo, { w: 700 });
  L.forEach((ln, i) => { const ly = 100 + i * 130, lit = o.lit && o.lit[i] !== undefined ? (t >= o.lit[i] ? 1 - .6 * ss(o.lit[i] + 2.6, o.lit[i] + 3, t) : 0) : 0;
    if (lit > .02) c += `<rect x="-282" y="${ly - 6}" width="564" height="112" rx="14" fill="${P.sun}" opacity="${n2(.35 * lit)}"/>`;
    c += TF(-262, ly + 26, .9, `<circle r="20" fill="${P.momo}"/>` + T(0, 9, i + 1, 26, "#fff")) + wrap(ln, 26, 330, 600).map((l, j) => T(-232, ly + 34 + j * 30, l, 26, P.ink, { a: "start", w: 600 })).join("")
      + `<path d="M-240 ${ly + 104} H280" stroke="#E3C9A8" stroke-width="2.4"/>`;
    // the small drawings
    const px = 200, py = ly + 52;
    if (i === 0) c += TF(px, py, .26, rig23(t, { n: 10, nt: 10, free: [[-40, -150], [-30, -60]] }), -90 + 90) ;
    if (i === 1) c += TF(px - 20, py + 40, .2, rig23(t, { n: 10, hold: [-200, 20], jA: 1, jB: 1 }));
    if (i === 2) c += TF(px - 10, py + 10, .62, chopstick22(0, 0, .5, 0) + `<g transform="translate(-30 0)">${[...Array(6)].map((_, j) => `<path d="M${-20 + j * 9} -10 q4 10 0 20" stroke="${WIREC}" stroke-width="5" fill="none"/>`).join("")}</g>` + `<path d="M50 -30 q20 -30 40 -10 q-14 0 -40 10z" fill="#fff" stroke="#8A949E" stroke-width="2"/>`);
    if (i === 2 && o.strike !== undefined && t >= o.strike) { const u = eo((t - o.strike) / .4); c += `<path d="M-240 ${ly + 50} L${n2(-240 + 520 * u)} ${n2(ly + 46)}" stroke="#D84A3A" stroke-width="8" stroke-linecap="round"/>`; } });
  if (o.rewrite !== undefined && t >= o.rewrite) c += OP(ramp(t, o.rewrite, .3), `<rect x="-282" y="${Hh - 92}" width="564" height="78" rx="12" fill="#EAF8EC" stroke="${GOODC}" stroke-width="4"/>` + T(-150, Hh - 60, "Use an iron nail.", 26, "#2F8048", { w: 700 }) + T(-90, Hh - 28, "Wood cannot become a magnet.", 24, "#2F8048", { w: 700 })
    + TF(200, Hh - 52, .2, rig23(t, { n: 10, clips: [3, {}], free: [[-40, -150], [-30, -60]] })));
  return TF(x, y, k, easel23(W, Hh, c)); }

/* ================================================================ THE WALL SOCKET, THE BELL, THE SCRAPYARD CRANE ================================================================ */
// a white three-pin wall socket with its switch (origin = its middle, 150 x 110 at k 1; Singapore style, three rectangular holes)
const socket23 = (x, y, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="-75" y="-55" width="150" height="110" rx="12" fill="#F7F5F0" stroke="#A8A49A" stroke-width="4"/></g><rect x="-62" y="-42" width="72" height="84" rx="8" fill="#EFEDE6" stroke="#C9C5BA" stroke-width="2"/>`
  + `<rect x="-32" y="-30" width="12" height="20" rx="2" fill="#2E2E36"/><rect x="-54" y="8" width="20" height="11" rx="2" fill="#2E2E36"/><rect x="-18" y="8" width="20" height="11" rx="2" fill="#2E2E36"/>`
  + `<rect x="24" y="-26" width="36" height="52" rx="6" fill="#fff" stroke="#A8A49A" stroke-width="3"/><rect x="30" y="-20" width="24" height="20" rx="3" fill="#E0453A" opacity=".7"/>`);
// the school's OLD ELECTRIC BELL on the wall (origin = the dome's middle; about 200 x 220 at k 1): a black box behind, a silver dome gong, a
// small hammer on an arm below it. o.ring: 0..1 (the hammer a blur: ringing); o.hit: the hammer's position (0 rest .. 1 on the gong)
function bell23(t, o = {}) { const ring = o.ring || 0, hit = ring > .5 ? .5 + .5 * Math.sin(t * 90) : (o.hit || 0), hx = 0, hy = 92 - 26 * hit;
  return `<rect x="-60" y="40" width="120" height="96" rx="10" fill="#2E2E36" stroke="#16161C" stroke-width="4"/><rect x="-50" y="48" width="100" height="20" rx="5" fill="#45454F"/><circle cx="-44" cy="124" r="5" fill="#8A8A96"/><circle cx="44" cy="124" r="5" fill="#8A8A96"/>`
    + `<path d="M-96 30 Q-96 -76 0 -80 Q96 -76 96 30 Z" fill="#C9D0D6" stroke="#5E666E" stroke-width="5"/><path d="M-70 4 Q-66 -56 -10 -64" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/><rect x="-100" y="24" width="200" height="14" rx="7" fill="#A7B0B8" stroke="#5E666E" stroke-width="4"/><circle cy="-80" r="10" fill="#8E979F" stroke="#5E666E" stroke-width="3"/>`
    + `<path d="M0 136 L${hx} ${n2(hy)}" stroke="#6E7882" stroke-width="7"/>` + (ring > .5 ? `<circle cx="${hx}" cy="${n2(hy - 6)}" r="20" fill="#5E666E" opacity=".35"/><circle cx="${hx}" cy="${n2(hy + 14)}" r="20" fill="#5E666E" opacity=".35"/>` : "") + `<circle cx="${hx}" cy="${n2(hy)}" r="16" fill="#5E666E" stroke="#2E343A" stroke-width="3"/>`
    + (ring > .1 ? OP(ring, [0, 1, 2].map((i) => { const u = ((t * 2.2 + i / 3) % 1); return `<path d="M${n2(110 + 60 * u)} ${n2(-40 - 20 * u)} q14 30 0 60" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="${n2(1 - u)}"/><path d="M${n2(-110 - 60 * u)} ${n2(-40 - 20 * u)} q-14 30 0 60" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="${n2(1 - u)}"/>`; }).join("")) : ""); }
// the bell's CUT-AWAY (look-closer 1 of Part 2): the black box opened: a coil with MANY turns of thin copper wire round an iron core (one
// grey iron bar), a springy iron strip carrying the hammer, the gong above. on 0..1: the coil pulls the strip (the hammer hits the gong).
// origin = the gong's middle; about 700 x 640 at k 1. o.flow: the glow round the coil while it is on
function bellCut23(t, o = {}) { const on = o.on || 0, sx = 120, ang = -14 * on;
  let s = `<path d="M-230 -20 Q-230 -250 0 -260 Q230 -250 230 -20 Z" fill="#C9D0D6" stroke="#5E666E" stroke-width="7"/><path d="M-170 -60 Q-160 -200 -30 -220" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".7"/><rect x="-240" y="-30" width="480" height="26" rx="13" fill="#A7B0B8" stroke="#5E666E" stroke-width="6"/>`;
  // the box, opened (a dark back, its cut edge)
  s += `<rect x="-300" y="40" width="600" height="380" rx="20" fill="#3A3A44" stroke="#16161C" stroke-width="6"/><rect x="-280" y="60" width="560" height="340" rx="14" fill="#55555F"/><path d="M-300 40 L-260 10 H340 L300 40" fill="#2E2E36" stroke="#16161C" stroke-width="5" stroke-linejoin="round"/>`;
  // the iron core and its coil (many turns of thin copper wire), lying across the box
  s += `<rect x="-220" y="210" width="280" height="60" rx="8" fill="url(#gNail)" stroke="#3E464E" stroke-width="5"/>`;
  for (let i = 0; i < 34; i++) { const x = -200 + i * 7.2; s += `<path d="M${x} 194 Q${x + 4} 240 ${x} 286" stroke="#8A4A1E" stroke-width="6" fill="none"/><path d="M${x} 194 Q${x + 4} 240 ${x} 286" stroke="${COPC}" stroke-width="3.4" fill="none"/>`; }
  if (o.flow) s += OP(o.flow * on, `<rect x="-210" y="186" width="260" height="108" rx="20" fill="${FLOWC}" opacity=".35" filter="url(#b4)"/>`);
  // the springy iron strip, hinged at the right, carrying the hammer up to the gong
  s += `<g transform="translate(${sx + 140} 340) rotate(${n2(ang)})"><path d="M0 0 L-230 0" stroke="#7E8890" stroke-width="16" stroke-linecap="round"/><path d="M0 -5 L-226 -5" stroke="#C9D0D6" stroke-width="4"/><path d="M-200 0 L-200 -300" stroke="#6E7882" stroke-width="10"/><circle cx="-200" cy="-300" r="30" fill="#5E666E" stroke="#2E343A" stroke-width="5"/></g>`
    + `<rect x="${sx + 128}" y="320" width="34" height="50" rx="6" fill="#2E2E36"/><path d="M${sx + 150} 370 q20 20 0 40" stroke="#C9D0D6" stroke-width="5" fill="none"/>`;
  // wires from the coil to the box's terminals
  s += `<path d="M-200 286 Q-240 330 -250 380 M60 286 Q90 340 120 390" stroke="${COPC}" stroke-width="5" fill="none"/>`;
  if (on > .5) s += `<path d="M-60 -40 l30 -50 M0 -50 v-60 M60 -40 l-30 -50" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="${n2((on - .5) * 2)}" transform="translate(-80 0)"/>`;
  return s; }
// the SCRAPYARD's CRANE (a crawler material-handling crane; origin = its tracks' middle on the ground; about 520 wide, its arm reaching up
// and LEFT): o.sw 0..1 the arm's swing (0 = the disc over the scrap heap, 1 = over the tipper lorry to the left), o.lift 0..1 (the disc's
// height: 0 down on the heap), o.on: the scrap tangle clings under the disc; o.fall: the time the scrap was let go (it falls into the lorry)
function yardCrane23(t, o = {}) { const sw = o.sw || 0, lift = o.lift === undefined ? 1 : o.lift, bx = -40, by = -150, Lb = 470, ang = (-128 - 26 * sw) * Math.PI / 180;
  const tx = bx + Math.cos(ang) * Lb, ty = by + Math.sin(ang) * Lb, dy = lerp(380, 170, lift), dx = tx, dyy = ty + dy;
  let s = `<rect x="-260" y="-40" width="520" height="56" rx="28" fill="#3A3A44" stroke="#16161C" stroke-width="5"/>` + [...Array(9)].map((_, i) => `<circle cx="${-220 + i * 55}" cy="-12" r="16" fill="#55555F" stroke="#16161C" stroke-width="3"/>`).join("")
    + `<path d="M-200 -40 H200 V-150 H-60 V-200 H-200z" fill="#F2B233" stroke="#8A5A10" stroke-width="5" stroke-linejoin="round"/><rect x="-190" y="-190" width="120" height="70" rx="6" fill="#BFE6FF" stroke="#8A5A10" stroke-width="4"/><rect x="60" y="-130" width="120" height="16" fill="#3A3A44"/>`
    + `<path d="M${bx} ${by} L${n2(tx)} ${n2(ty)}" stroke="#C98A1E" stroke-width="30" stroke-linecap="round"/><path d="M${bx} ${by} L${n2(tx)} ${n2(ty)}" stroke="#F2B233" stroke-width="20" stroke-linecap="round"/>` + [.2, .4, .6, .8].map((u) => `<circle cx="${n2(lerp(bx, tx, u))}" cy="${n2(lerp(by, ty, u))}" r="5" fill="#8A5A10"/>`).join("")
    + `<path d="M${n2(tx)} ${n2(ty)} L${n2(dx - 50)} ${n2(dyy - 30)} M${n2(tx)} ${n2(ty)} L${n2(dx + 50)} ${n2(dyy - 30)} M${n2(tx)} ${n2(ty)} L${n2(dx)} ${n2(dyy - 30)}" stroke="#4E4E58" stroke-width="5" stroke-dasharray="9 4"/>`
    + `<ellipse cx="${n2(dx)}" cy="${n2(dyy)}" rx="96" ry="30" fill="#6E7680" stroke="#2E343A" stroke-width="5"/><ellipse cx="${n2(dx)}" cy="${n2(dyy - 8)}" rx="96" ry="26" fill="#9AA3AB" stroke="#2E343A" stroke-width="4"/><rect x="${n2(dx - 20)}" y="${n2(dyy - 44)}" width="40" height="20" rx="4" fill="#4E4E58"/>`;
  // the scrap tangle under the disc (only while it is ON), or falling (from o.fall)
  const tangle = (cx, cy, a = 0) => TF(cx, cy, 1, `<path d="M-70 0 L60 18 M-50 26 L70 -4 M-30 -6 L20 44 M10 4 L-40 40" stroke="#8A4A2A" stroke-width="12" stroke-linecap="round"/><path d="M-70 0 L60 18 M-50 26 L70 -4" stroke="#B86A3A" stroke-width="5" stroke-linecap="round"/><circle cx="40" cy="30" r="18" fill="none" stroke="#6E5A4E" stroke-width="8"/><rect x="-60" y="10" width="40" height="22" rx="4" fill="#7A6A5E" transform="rotate(20)"/>`, a);
  if (o.on) s += tangle(dx, dyy + 40);
  if (o.fall !== undefined && t >= o.fall) { const u = clamp((t - o.fall) / .7); if (u < 1) s += tangle(dx, dyy + 40 + 260 * u * u, 30 * u); }
  return s; }

/* ================================================================ THE HIDDEN ANIMALS ================================================================ */
// the MILLIPEDE, side view: origin = between its feet on the ground, head to the RIGHT (o.flip: left). Rusty brown with darker rings, a long
// round body of many rings, two short legs per ring rippling in a wave, two short feelers, a rounded head with big friendly eyes.
// o.walk: the legs ripple and it creeps; o.coil 0..1: it curls into a tight flat spiral (the reveal)
/* FACES: right */ function millipede23(t, o = {}) { const ph = o.ph || 0, N = 14, cl = o.coil || 0, sh = blink16(t, ph + .7), wv = o.walk ? t * 7 + ph : ph;
  let body = "", legs = "", pts = [];
  for (let i = 0; i < N; i++) { const u = i / (N - 1);   // 0 = the tail, 1 = the head
    const sx = -150 + u * 160, sy = -14 + 2 * Math.sin(wv * .3 + i * .7);
    const R = 30 * (1 - u * .85) + 4, an = u * Math.PI * 3.2 - Math.PI * .5, cx = -40 + Math.cos(an) * R, cy = -40 + Math.sin(an) * R;
    pts.push([lerp(sx, cx, eio(cl)), lerp(sy, cy, eio(cl))]); }
  pts.forEach(([x, y], i) => { if (cl < .5) for (const sd of [0, 1]) { const sw = 4 * Math.sin(wv - i * .9 + sd * 1.2); legs += `<path d="M${n2(x + sd * 3)} ${n2(y + 6)} l${n2(sw)} 9" stroke="${sd ? "#4A2814" : "#6A3A1E"}" stroke-width="2.4" stroke-linecap="round"/>`; } });
  for (let i = 0; i < pts.length - 1; i++) { const [x, y] = pts[i]; body += `<circle cx="${n2(x)}" cy="${n2(y)}" r="10.5" fill="${i % 2 ? "#9A4E26" : "#B8622E"}" stroke="#4A2814" stroke-width="2.4"/><path d="M${n2(x - 4)} ${n2(y - 9)} q4 -2 8 0" stroke="#E8955A" stroke-width="2" fill="none" opacity=".8"/>`; }
  const [hx, hy] = pts[pts.length - 1], fw = 3 * Math.sin(t * 3 + ph);
  body += `<circle cx="${n2(hx)}" cy="${n2(hy)}" r="13" fill="#B8622E" stroke="#4A2814" stroke-width="2.6"/>` + eye16(n2(hx + 5), n2(hy - 3), 5.6, { shut: sh, lx: 1, line: "#3A1E0E" })
    + `<path d="M${n2(hx + 8)} ${n2(hy - 10)} q8 ${n2(-10 + fw)} 16 ${n2(-8 + fw)} M${n2(hx + 11)} ${n2(hy - 6)} q10 ${n2(-4 - fw)} 18 ${n2(-1 - fw)}" stroke="#4A2814" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M${n2(hx + 6)} ${n2(hy + 6)} q4 3 8 0" stroke="#FFB3A8" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return legs + body; }
// the millipede at a spot (x, y = its feet), scale k. FACES: right (o.flip: left, mirrored with a negative x-scale only). It walks ON THE
// SPOT (its legs ripple, it does not slide): the teacher's 25 Nov rule (SERIES_FORMAT 6x) says a moving thing faces its travel, and a
// slide sideways would read as walking backwards half the time
const millipedeAt = (t, x, y, k = .34, o = {}) => { const cr = 0; return TF(x + cr * k, y, (o.flip ? -1 : 1) * k, millipede23(t, { walk: true, ...o }), o.rot || 0, k); };
// the CRICKET, side view: origin = between its feet, head to the RIGHT. A brown field cricket: a round head with long feelers, big friendly
// eyes, folded wings, big jumping back legs, front legs with a small pale oval just below each knee (o.ear: drawn and ringed only for the
// fun fact). o.clean: now and then it cleans a feeler; o.hop: small hops
/* FACES: right; it hops straight up and down on the spot (no travel) */ function cricket23(t, o = {}) { const ph = o.ph || 0, sh = blink16(t, ph + .3), fw = Math.sin(t * 4 + ph), cyc = (t + ph) % 3.4, hp = o.hop ? 16 * (cyc < .3 ? Math.sin(cyc / .3 * Math.PI) : 0) : 0, cln = o.clean && cyc > 1.6 && cyc < 2.4 ? Math.sin((cyc - 1.6) / .8 * Math.PI) : 0;
  let s = `<g transform="translate(0 ${n2(-hp)})">`;
  s += `<path d="M-30 -22 L-62 -62 L-80 0" stroke="#5A3A1E" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-30 -22 L-62 -62" stroke="#8A5A2E" stroke-width="13" stroke-linecap="round"/>`;
  s += `<ellipse cx="-14" cy="-28" rx="42" ry="17" fill="#6E4A26" stroke="#3A2410" stroke-width="3"/><path d="M-52 -32 Q-12 -46 26 -34 L22 -24 Q-14 -34 -50 -22z" fill="#8A6034" stroke="#3A2410" stroke-width="2.4"/><path d="M-44 -30 H16" stroke="#B88A54" stroke-width="2" opacity=".7"/>`;
  s += `<path d="M6 -16 L10 0 M-12 -14 L-16 0" stroke="#4A2E16" stroke-width="4" stroke-linecap="round"/><g transform="rotate(${n2(-40 * cln)} 26 -16)"><path d="M26 -16 L32 -4 L38 0" stroke="#4A2E16" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${o.ear ? `<ellipse cx="31" cy="-6" rx="3.4" ry="2.2" fill="#F4E6C8"/>` : ""}</g>`;
  s += `<circle cx="36" cy="-36" r="17" fill="#7A5228" stroke="#3A2410" stroke-width="3"/>` + eye16(43, -40, 7, { shut: sh, lx: 1, line: "#2E1A0A" }) + `<path d="M44 -28 q4 3 8 0" stroke="#FFB3A8" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + `<path d="M44 -50 Q70 ${n2(-90 + 6 * fw)} ${n2(110 + 6 * fw)} ${n2(-96 + 8 * fw)}" stroke="#3A2410" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M40 -52 Q${n2(56 - 30 * cln)} ${n2(-100 + 40 * cln)} ${n2(94 - 60 * cln)} ${n2(-118 + 70 * cln)}" stroke="#3A2410" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  return s + `</g>`; }
/* FACES: right (o.flip: left, negative x-scale only); hops in place */ const cricketAt = (t, x, y, k = .32, o = {}) => TF(x, y, (o.flip ? -1 : 1) * k, cricket23(t, { hop: true, ...o }), o.rot || 0, k);

/* ================================================================ PEOPLE ================================================================ */
// the drinks-stall AUNTIE (background; kind; origin = her waist at the counter; about 120 x 180): an apron, short hair, a kopi cup
const auntie23 = (t) => { const b = 2 * Math.sin(t * 1.6); return `<g transform="translate(0 ${n2(b)})"><path d="M-46 0 Q-50 -90 0 -96 Q50 -90 46 0z" fill="#5BA8D6" stroke="#2E5E7E" stroke-width="3"/><path d="M-26 -60 H26 V0 H-26z" fill="#FFF6E6" stroke="#C9B89A" stroke-width="2"/>`
  + `<circle cx="0" cy="-124" r="30" fill="#F2C29B" stroke="#C98F66" stroke-width="3"/><path d="M-32 -128 Q-30 -164 0 -160 Q30 -164 32 -128 Q20 -146 0 -144 Q-20 -146 -32 -128z" fill="#3A2E2A"/><path d="M-10 -124 v4 M10 -124 v4" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round"/><path d="M-8 -110 q8 6 16 0" stroke="#A8584A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  + `<g transform="translate(40 -40) rotate(${n2(6 * Math.sin(t * .9))})"><rect x="-12" y="-16" width="24" height="26" rx="4" fill="#fff" stroke="#8A7A62" stroke-width="2"/><path d="M12 -8 q10 0 10 8 q0 8 -10 8" stroke="#8A7A62" stroke-width="2.4" fill="none"/></g></g>`; };

/* ================================================================ THE RIG IN THE WORLD (held at a paw, the holder on the table) ================================================================ */
// rigW(t, o): the same coiled nail as rig23, placed by its HEAD at o.head [x, y] (a buddy's paw), pointing in direction o.ang (deg; 90 =
// straight down, 0 = to the right), scale o.k; the battery holder stands on the table at o.hold [x, y] (its bottom middle, world, upright),
// scale o.hk; its two leads run from the coil's two ends to the holder's clips. o: n, nt, reel [x, y] (world: the wire still coming off its
// reel while it is coiled), batt, hA (0 = gone), hdx / hdy, jA / jB, flow, tag ("on" / "off"), clips [n, opts] (world; at the tip)
function rigW(t, o = {}) { const n = o.n || 10, sp = 11, y0 = -252, nt = o.nt === undefined ? n : clamp(o.nt, 0, n), nb = Math.floor(nt), fr = nt - nb, hw = 16, k = o.k || .5, th = (o.ang === undefined ? 90 : o.ang) - 90, [hx, hy] = o.head;
  const L = (lx, ly) => LP(hx, hy, k, th, lx, ly + 287), flow = o.flow || 0;
  let back = "", front = "";
  for (let i = 0; i < Math.ceil(nt); i++) { const y = y0 + i * sp, part = i < nb ? 1 : fr;
    back += `<path d="M${hw} ${n2(y + sp * .5)} Q0 ${n2(y + sp * .8)} ${-hw} ${n2(y + sp)}" stroke="#8A3A16" stroke-width="7" fill="none" stroke-linecap="round" opacity="${n2(part)}"/>`;
    const d = `M${-hw} ${n2(y)} Q0 ${n2(y + sp * .1)} ${n2(-hw + 2 * hw * part)} ${n2(y + sp * .5 * part)}`;
    front += `<path d="${d}" stroke="${WIRED}" stroke-width="9.5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${WIREC}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    if (flow > .01) front += OP(flow * clamp(Math.sin((t * 5 - i * .45)) * .5 + .7), `<path d="${d}" stroke="#FFF3B0" stroke-width="4" fill="none" stroke-linecap="round"/>`); }
  const body = `<g transform="translate(${n2(hx)} ${n2(hy)}) rotate(${n2(th)}) scale(${n2(k)}) translate(0 287)">` + (flow > .01 ? `<rect x="${-hw - 14}" y="${y0 - 6}" width="${2 * hw + 28}" height="${n2(nt * sp + 12)}" rx="20" fill="${FLOWC}" opacity="${n2(.22 * flow)}" filter="url(#b4)"/>` : "") + back + nail22d(0, -150, 1, 90) + front + `</g>`;
  const A = L(-hw, y0), B = L(-hw, y0 + Math.max(1, nt) * sp);
  let leads = "", hold = "", glow = "";
  if (o.hold && nt >= n - .01) { const hn = o.batt || 1, hk = o.hk || .45, ha = o.hA === undefined ? 1 : o.hA, X = o.hold[0] + (o.hdx || 0), Y = o.hold[1] + (o.hdy || 0), W2 = HOLDW(hn) * hk, jA = o.jA === undefined ? 1 : o.jA, jB = o.jB === undefined ? 1 : o.jB;
    const cA = [X - W2 - 3, Y - 45 * hk], cB = [X + W2 + 3, Y - 45 * hk], eA = [lerp(cA[0] - 40 * hk * 2, cA[0], jA), lerp(cA[1] + 40, cA[1], jA)], eB = [lerp(cB[0] + 40 * hk * 2, cB[0], jB), lerp(cB[1] + 40, cB[1], jB)];
    const dA = `M${n2(A[0])} ${n2(A[1])} C${n2(A[0] - 30)} ${n2(A[1] + 50)} ${n2(eA[0] - 30)} ${n2(eA[1] + 40)} ${n2(eA[0])} ${n2(eA[1])}`, dB = `M${n2(B[0])} ${n2(B[1])} C${n2(B[0] - 20)} ${n2(B[1] + 60)} ${n2(eB[0] + 30)} ${n2(eB[1] + 50)} ${n2(eB[0])} ${n2(eB[1])}`;
    leads = wireStroke(dA, { w: 7 }) + wireStroke(dB, { w: 7 }) + BARE(eA[0], eA[1], jA > .5 ? 0 : 120) + BARE(eB[0], eB[1], jB > .5 ? 180 : 60);
    if (jA > .9 && jB > .9 && flow > .01) glow = glowStroke(dA, t, flow * .8) + glowStroke(dB, t, flow * .8, 20, true);
    hold = OP(ha, TF(X, Y, hk, battHolder23(t, hn)) + (o.tag ? TF(X, Y + 40 * hk + 22, .62, onTag(o.tag === "on")) : "")); }
  else if (nt >= .99) { const F = o.free || [[A[0] - 40, A[1] + 50], [B[0] - 30, B[1] + 40]]; leads = wireStroke(`M${n2(A[0])} ${n2(A[1])} Q${n2(A[0] - 30)} ${n2(A[1] + 40)} ${n2(F[0][0])} ${n2(F[0][1])}`, { w: 7 }) + wireStroke(`M${n2(B[0])} ${n2(B[1])} Q${n2(B[0] - 20)} ${n2(B[1] + 30)} ${n2(F[1][0])} ${n2(F[1][1])}`, { w: 7 }); }
  else if (o.reel) { const T0 = L(-hw + 2 * hw * fr, y0 + nb * sp + sp * .5 * fr); leads = wireStroke(`M${n2(A[0])} ${n2(A[1])} Q${n2(A[0] - 40)} ${n2(A[1] + 30)} ${n2(A[0] - 50)} ${n2(A[1] + 60)}`, { w: 7 }) + wireStroke(`M${n2(T0[0])} ${n2(T0[1])} Q${n2(T0[0] + 60)} ${n2(T0[1] + 10)} ${n2(o.reel[0])} ${n2(o.reel[1] - 20)}`, { w: 7 })
    + `<g transform="translate(${n2(o.reel[0])} ${n2(o.reel[1])})"><ellipse cx="0" cy="0" rx="40" ry="26" fill="${WIREC}" stroke="${WIRED}" stroke-width="5"/><ellipse cx="0" cy="-4" rx="14" ry="9" fill="#C9A06E" stroke="#8A6438" stroke-width="3"/></g>`; }
  const tip = L(0, 0), clips = o.clips ? clipBunch(t, tip[0], tip[1] + 2, o.clips[0], { k: o.ck || .55, ...(o.clips[1] || {}) }) : "";
  return glow + leads + hold + body + clips; }
const rigTip = (o) => LP(o.head[0], o.head[1], o.k || .5, (o.ang === undefined ? 90 : o.ang) - 90, 0, 287);
