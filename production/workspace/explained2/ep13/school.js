// school.js: EP13's sets and props, Part 1 (Stage 2, drawn 2026-11-22). Loaded after pics.js, before garden13.js and tests.js.
// Sets (baked in bg/): BG.classroom / BG.classroomD (a Primary 3 classroom after school, mid-afternoon; D = dimmed). View: VC(t, o, cam).
// Props: the real school bag (bag13: plain ORANGE fabric, two padded straps, a metal zip, a moulded plastic base, a blank name-tag window;
// front view, as on EP12's dare boards), the exercise books (bookC, bookFlat), the three candidate straps (strapBand), the classroom chair seen
// from behind (chairS), the teacher's table (tTable), an adult's hand (aHand), the paper and the pencil drawing (bagDrawing), the sample tiles
// (sampleTile), the dropper, the short metal zip (zipShort), the hard-hat card, the wet-floor picture, the hidden butterfly (butterfly).
const XDEFS13 = () => `${lg("sBag", [[0, "#FFA64D"], [1, "#F27A12"]])}${lg("sPocket", [[0, "#FFC07A"], [1, "#FFA347"]])}${lg("sBase", [[0, "#66739A"], [1, "#39435A"]])}${lg("sSteel", [[0, "#F4F7FB"], [.5, "#B9C3D4"], [1, "#8490A8"]])}
  ${lg("sWood", [[0, "#D9A56A"], [1, "#A9703C"]])}${lg("sChair", [[0, "#7DB7E8"], [1, "#4C8CCB"]])}${lg("sWall", [[0, "#FFF6E0"], [1, "#FBE7C4"]])}${lg("sWall2", [[0, "#FBEBCB"], [1, "#F3DAB0"]])}${lg("sFloor", [[0, "#D9E2D2"], [1, "#B5C4B0"]])}
  ${lg("sSky", [[0, "#8FD0FF"], [1, "#E6F6FF"]])}${lg("sDesk", [[0, "#F2D7A6"], [1, "#DDB97C"]])}${lg("vdSteel", [[0, "#F2F5F9"], [.5, "#C9D1DC"], [1, "#9AA5B4"]], 1, 0)}${lg("vdBrass", [[0, "#F5D27A"], [1, "#C9922E"]])}${lg("vdGlove", [[0, "#FFD76A"], [1, "#F0A93A"]])}
  ${lg("gSkyG", [[0, "#8FD0FF"], [.7, "#DDF2FF"], [1, "#F4FBFF"]])}${lg("gGrass", [[0, "#9FDB7F"], [1, "#6FBF5E"]])}${lg("gPond", [[0, "#8FD6F2"], [1, "#4FA8D8"]])}${lg("gEarth", [[0, "#E7CFA2"], [1, "#CFAE78"]])}${lg("gRail", [[0, "#E0B07A"], [.5, "#C48A4E"], [1, "#9A6535"]])}
  ${lg("gDusk", [[0, "#5B4B9E"], [.5, "#F08A5D"], [1, "#FFD08A"]])}${lg("gRoof", [[0, "#E8785E"], [1, "#C4553F"]])}
  <pattern id="sWv" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 3.5 H14 M0 10.5 H14" stroke="#A84808" stroke-width="2.2" opacity=".5"/><path d="M3.5 0 V14 M10.5 0 V14" stroke="#FFD9A8" stroke-width="2.2" opacity=".65"/></pattern>
  <pattern id="sWvB" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#F47A14"/><path d="M0 11 H44 M0 33 H44" stroke="#B4500A" stroke-width="7" opacity=".5"/><path d="M11 0 V44 M33 0 V44" stroke="#FFD9A8" stroke-width="7" opacity=".6"/></pattern>`;
const cam3 = (inner, c) => c ? CAM(inner, c[0], c[1], c[2]) : inner;
const camL = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const ptsPath = (pts, close = true) => pts.map((p, i) => (i ? "L" : "M") + n2(p[0]) + " " + n2(p[1])).join(" ") + (close ? "z" : "");
const dropDy = (t, t0, h = 300, d = .45) => t < t0 - d ? undefined : t >= t0 ? 0 : -h * (1 - ei((t - (t0 - d)) / d));
const qbz = (a, b, c, u) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * b[0] + u * u * c[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * b[1] + u * u * c[1]];
/* an adult's hand and sleeve (trail.js adultHand: the fingers point right, the tips near (90, 0)); x, y = the fingertips */
const aHand = (x, y, rot = 0, sc = 1, flip = false) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)}) scale(${flip ? -sc : sc} ${sc}) translate(-90 0)">${adultHand()}</g>`;

/* ====================================================================================================================================
   THE REAL SCHOOL BAG (front view; origin = the middle of its base; body 200 wide, 250 tall; the straps show at both sides).
   o.strapR / o.strapL: "ok" (the bag's own padded strap) | "torn" (torn off at its top end, hanging from the bottom) | "new" (the woven fabric
   strap, clipped on) | "none"; o.pull = [x, y]: the right strap pulled tight to that point (the lift); o.zip 0..1 = how far the zip is OPEN;
   o.open 0..1 = the top held open (the books' tops show); o.books = how many books stand inside (seen when open); o.lit = "straps" | "body" |
   "zip" | "base" (that part glows, the rest is dimmed); o.tag: false = no name-tag window
   ==================================================================================================================================== */
const BAGL = "#B4500A", BOOKC = ["#5B8DEF", "#43BF6C", "#FFC83A", "#FF8FB1", "#9B6BFF"];
const ZA = [[-96, -176], [0, -138], [96, -176]];   // the zip's arc
function bagStrap(sd, kind, pull) { if (kind === "none") return "";
  if (kind === "tornflat") return `<path d="M${sd * 100} -34 Q${sd * 132} -90 ${sd * 114} -150" fill="none" stroke="#C97A3A" stroke-width="22" stroke-linecap="round"/><path d="M${sd * 100} -34 Q${sd * 132} -90 ${sd * 114} -150" fill="none" stroke="#F7B77C" stroke-width="15" stroke-linecap="round"/>
    <path d="M${sd * 114} -150 l${sd * 6} -16 M${sd * 112} -152 l${sd * -6} -14 M${sd * 116} -148 l${sd * 16} -8" stroke="#C97A3A" stroke-width="4" stroke-linecap="round"/><path d="M${sd * 60} -240 l${sd * 14} -12 M${sd * 62} -238 l${sd * 18} -2" stroke="#C97A3A" stroke-width="4" stroke-linecap="round"/>`;
  if (kind === "torn") return `<path d="M${sd * 100} -34 Q${sd * 150} -52 ${sd * 178} -8" fill="none" stroke="#C97A3A" stroke-width="22" stroke-linecap="round"/><path d="M${sd * 100} -34 Q${sd * 150} -52 ${sd * 178} -8" fill="none" stroke="#F7B77C" stroke-width="15" stroke-linecap="round"/>
    <path d="M${sd * 178} -8 l${sd * 16} -8 M${sd * 178} -6 l${sd * 18} 4 M${sd * 176} -2 l${sd * 12} 12 M${sd * 172} -12 l${sd * 10} -14" stroke="#C97A3A" stroke-width="4" stroke-linecap="round"/>
    <path d="M${sd * 56} -238 l${sd * 22} -2" stroke="#F7B77C" stroke-width="15" stroke-linecap="round"/><path d="M${sd * 78} -240 l${sd * 12} -8 M${sd * 80} -238 l${sd * 14} 2 M${sd * 78} -236 l${sd * 10} 10" stroke="#C97A3A" stroke-width="4" stroke-linecap="round"/>`;
  const d = pull ? `M${sd * 56} -238 L${n2(pull[0])} ${n2(pull[1])} L${sd * 102} -32` : `M${sd * 56} -238 Q${sd * 182} -206 ${sd * 152} -112 Q${sd * 136} -62 ${sd * 102} -32`;
  if (kind === "new") return `<path d="${d}" fill="none" stroke="#8A3A06" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#F47A14" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="url(#sWv)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${sd * 56 - 15}" y="-250" width="30" height="20" rx="5" fill="url(#sSteel)" stroke="#66718D" stroke-width="4"/>`;
  return `<path d="${d}" fill="none" stroke="${BAGL}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#F58A2E" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#FFD9A8" stroke-width="3" stroke-dasharray="6 9" stroke-linecap="round"/>`; }
function bag13(o = {}) { const zo = clamp(o.zip || 0), op = clamp(o.open || 0), nb = o.books || 0, id = o.id || "b";
  const straps = bagStrap(-1, o.strapL || "ok") + bagStrap(1, o.strapR || "ok", o.pull);
  const mouth = Math.max(op, zo * .25);   // how far the top gapes
  let books = ""; if (op > .05 && nb) { for (let i = 0; i < nb; i++) books += `<rect x="${-68 + i * 28}" y="${n2(-262 - 6 * (i % 2) + 70 * (1 - op))}" width="24" height="130" rx="4" fill="${BOOKC[i]}" stroke="${P.ink}" stroke-width="3"/><rect x="${-63 + i * 28}" y="${n2(-250 - 6 * (i % 2) + 70 * (1 - op))}" width="14" height="10" rx="2" fill="#fff" opacity=".85"/>`; }
  const body = `<path d="M-28 -246 Q0 -292 28 -246" fill="none" stroke="${BAGL}" stroke-width="13" stroke-linecap="round"/><path d="M-100 -40 V-170 Q-100 -250 -40 -250 H40 Q100 -250 100 -170 V-40z" fill="url(#sBag)" stroke="${BAGL}" stroke-width="7" stroke-linejoin="round"/><path d="M-84 -170 Q-84 -232 -40 -236" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".4"/>
    ${mouth > .03 ? `<path d="M-96 -176 Q0 -138 96 -176 Q0 ${n2(-176 - 62 * mouth)} -96 -176z" fill="#7A3606"/>` : ""}
    ${books ? `<clipPath id="bk_${id}"><path d="M-110 -176 Q0 -138 110 -176 V-420 H-110z"/></clipPath><g clip-path="url(#bk_${id})">${books}</g>` : ""}
    <rect x="-58" y="-124" width="116" height="74" rx="14" fill="url(#sPocket)" stroke="${BAGL}" stroke-width="6"/><path d="M-46 -106 H46" stroke="#fff" stroke-width="4" stroke-dasharray="5 8" stroke-linecap="round" opacity=".8"/>${o.tag === false ? "" : `<rect x="-30" y="-92" width="60" height="30" rx="5" fill="#FFF8EA" stroke="${BAGL}" stroke-width="4"/>`}`;
  const zp = qbz(ZA[0], ZA[1], ZA[2], 1 - zo * .92), d1 = `M-96 -176 Q0 -138 96 -176`;
  const zip = `<path d="${d1}" fill="none" stroke="#5E6B7C" stroke-width="12" stroke-linecap="round"/><path d="${d1}" fill="none" stroke="#E6ECF4" stroke-width="7" stroke-dasharray="4 5"/>
    <g transform="translate(${n2(zp[0])} ${n2(zp[1])})"><rect x="-9" y="-9" width="18" height="18" rx="5" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="4"/><path d="M0 8 V20" stroke="#5E6B7C" stroke-width="5" stroke-linecap="round"/><rect x="-7" y="18" width="14" height="20" rx="6" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="4"/></g>`;
  const base = `<path d="M-104 -44 H104 V-14 Q104 0 90 0 H-90 Q-104 0 -104 -14z" fill="url(#sBase)" stroke="#2B2147" stroke-width="6" stroke-linejoin="round"/><path d="M-90 -32 H90" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/><path d="M-70 -14 H-40 M-15 -14 H15 M40 -14 H70" stroke="#2B2147" stroke-width="5" stroke-linecap="round" opacity=".6"/>`;
  const all = straps + body + base + zip;
  if (!o.lit) return all;
  const part = { straps, body, zip, base }[o.lit];
  return OP(.28, all) + `<g filter="url(#glowS)">${part}</g>`; }
// exercise books: the cover (96 x 128, origin = its centre) and lying flat, seen from the side (128 x 14, origin = its bottom middle)
const bookC = (i, sc = 1) => TF(0, 0, sc, `<rect x="-48" y="-64" width="96" height="128" rx="7" fill="${BOOKC[i % 5]}" stroke="${P.ink}" stroke-width="4"/><rect x="-48" y="-64" width="16" height="128" rx="6" fill="${P.ink}" opacity=".22"/><rect x="-20" y="-40" width="56" height="34" rx="5" fill="#fff"/><path d="M-12 -28 H28 M-12 -17 H16" stroke="${P.ink}" stroke-width="3" opacity=".5" stroke-linecap="round"/>`);
const bookFlat = (i) => `<rect x="-64" y="-14" width="128" height="14" rx="4" fill="${BOOKC[i % 5]}" stroke="${P.ink}" stroke-width="3.5"/><path d="M-58 -5 H58" stroke="#fff" stroke-width="3" opacity=".7"/>`;
// five books that have slid out of the bag: a loose fan on the table. origin = the table top under the first one
const booksOut = () => [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${i * 46} ${-i * 3}) rotate(${-6 + i * 5})">${bookFlat(i)}</g>`).join("");
const bookStack = (n = 5) => { let s = ""; for (let i = 0; i < n; i++) s += TF((i % 2) * 6 - 3, -i * 14, 1, bookFlat(i)); return s; };

/* ---------- the three candidate straps, the same length and width. strapBand(kind, len, w): lying flat, centred on (0, 0), along x ---------- */
function strapBand(kind, len = 520, w = 30) { const x = -len / 2, y = -w / 2;
  if (kind === "metal") return `<rect x="${x}" y="${y}" width="${len}" height="${w}" rx="4" fill="url(#sSteel)" stroke="#66718D" stroke-width="5"/><path d="M${x + 14} ${y + w * .3} H${-x - 14}" stroke="#fff" stroke-width="${n2(w * .14)}" opacity=".85" stroke-linecap="round"/>`;
  if (kind === "wood") return `<rect x="${x}" y="${y}" width="${len}" height="${w}" rx="${n2(w * .28)}" fill="url(#sWood)" stroke="#7A4C26" stroke-width="5"/>${wgrain(x + 10, -x - 10, 0, 7, 4, "#7A4C26", .5)}`;
  return `<rect x="${x}" y="${y}" width="${len}" height="${w}" rx="5" fill="#F47A14" stroke="#8A3A06" stroke-width="5"/><rect x="${x + 3}" y="${y + 3}" width="${len - 6}" height="${w - 6}" rx="3" fill="url(#sWv)"/><path d="M${x + 8} ${y + 5} H${-x - 8} M${x + 8} ${-y - 5} H${-x - 8}" stroke="#FFE3BF" stroke-width="2.5" stroke-dasharray="7 7"/>`; }
// a strap as a ribbon along a list of points (the fabric strap draped over the rail; the straps on the stand). w = width
const ribbon = (pts, w = 30, o = {}) => { const d = pts.map((p, i) => (i ? "L" : "M") + n2(p[0]) + " " + n2(p[1])).join(" "), sm = `stroke-linecap="${o.cap || "butt"}" stroke-linejoin="round"`;
  return `<path d="${d}" fill="none" stroke="${o.edge || "#8A3A06"}" stroke-width="${w + 8}" ${sm}/><path d="${d}" fill="none" stroke="${o.col || "#F47A14"}" stroke-width="${w}" ${sm}/>${o.plain ? "" : `<path d="${d}" fill="none" stroke="url(#${o.pat || "sWv"})" stroke-width="${w}" ${sm}/>`}`; };

/* ---------- the classroom chair, seen from behind (origin = the floor under its middle): steel legs, a blue seat, a rounded top rail.
   CHAIR.rail = the top rail's middle (local) ---------- */
const CHAIR = { rail: [0, -322], rw: 190, rh: 44 };
const chairS = () => `<ellipse cx="0" cy="4" rx="120" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-78 0 V-170 M78 0 V-170 M-62 -8 V-150 M62 -8 V-150" stroke="#8E9AA8" stroke-width="12" stroke-linecap="round"/>
  <path d="M-78 -160 V-316 M78 -160 V-316" stroke="url(#vdSteel)" stroke-width="14" stroke-linecap="round"/><path d="M-78 -160 V-316 M78 -160 V-316" stroke="#6E7A88" stroke-width="14" stroke-linecap="round" opacity=".35"/>
  <rect x="-96" y="-184" width="192" height="26" rx="12" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="5"/><rect x="-84" y="-256" width="168" height="30" rx="13" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="5"/>
  <rect x="${-CHAIR.rw / 2}" y="${CHAIR.rail[1] - CHAIR.rh / 2}" width="${CHAIR.rw}" height="${CHAIR.rh}" rx="${CHAIR.rh / 2}" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="5"/><path d="M${-CHAIR.rw / 2 + 22} ${CHAIR.rail[1] - 10} H${CHAIR.rw / 2 - 22}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>`;
// the teacher's table (origin = the middle of its top surface; w wide; legs to y = +h)
const tTable = (w = 600, h = 230) => `<ellipse cx="0" cy="${h + 4}" rx="${w * .52}" ry="14" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M${-w / 2 + 30} 20 V${h} M${w / 2 - 30} 20 V${h}" stroke="#8E9AA8" stroke-width="16" stroke-linecap="round"/>
  <rect x="${-w / 2 + 16}" y="22" width="${w - 32}" height="92" fill="#E9CC96" stroke="#B98F52" stroke-width="5"/><rect x="${-w / 2 + 60}" y="44" width="150" height="50" rx="6" fill="#DDB97C" stroke="#B98F52" stroke-width="4"/><circle cx="${-w / 2 + 135}" cy="69" r="6" fill="#8E9AA8"/>
  <rect x="${-w / 2}" y="0" width="${w}" height="24" rx="8" fill="url(#sDesk)" stroke="#B98F52" stroke-width="5"/><path d="M${-w / 2 + 16} 7 H${w / 2 - 16}" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/>`;
// a pupil's desk with its chair behind it and a bag hook at the side (small, for the rows). origin = the floor under its middle
const deskS = () => `<path d="M-52 0 V-92 M52 0 V-92" stroke="#9AA6B4" stroke-width="9" stroke-linecap="round"/><rect x="-44" y="-170" width="88" height="26" rx="12" fill="url(#sChair)" stroke="#2F6CA8" stroke-width="4"/><path d="M-36 -146 V-110 M36 -146 V-110" stroke="#9AA6B4" stroke-width="7"/>
  <rect x="-58" y="-88" width="116" height="34" fill="#E9CC96" stroke="#B98F52" stroke-width="4"/><rect x="-66" y="-104" width="132" height="18" rx="6" fill="url(#sDesk)" stroke="#B98F52" stroke-width="4"/><path d="M66 -92 h10 v14 q0 8 -8 8" fill="none" stroke="#6E7A88" stroke-width="5" stroke-linecap="round"/>`;

/* ====================================================================================================================================
   THE HIDDEN BUTTERFLY (Part 1): a plain tiger, cute and alive. butterfly(t, o): origin = its body's middle; about 150 wide with open wings.
   o.open (0..1) overrides the slow open-and-close loop; o.up = px it has fluttered up
   ==================================================================================================================================== */
function butterfly(t, o = {}) { const op = o.open === undefined ? .55 + .45 * Math.sin(t * 2.1) : o.open, sx = .22 + .78 * clamp(op), bob = 2 * Math.sin(t * 2.1 + 1);
  const wing = (sd) => `<g transform="scale(${n2(sd * sx)} 1)"><path d="M4 -8 Q30 -64 74 -52 Q92 -30 70 -6 Q40 4 4 -2z" fill="#FF8A1F" stroke="#2B2147" stroke-width="5" stroke-linejoin="round"/><path d="M52 -54 Q80 -52 84 -30 Q80 -14 68 -8 Q76 -32 52 -54z" fill="#2B2147"/><circle cx="72" cy="-36" r="4" fill="#fff"/><circle cx="76" cy="-22" r="3.4" fill="#fff"/><circle cx="62" cy="-46" r="3" fill="#fff"/>
    <path d="M4 0 Q34 4 56 22 Q58 46 36 50 Q14 40 4 6z" fill="#FFA347" stroke="#2B2147" stroke-width="5" stroke-linejoin="round"/><circle cx="46" cy="38" r="3.4" fill="#fff"/><circle cx="34" cy="42" r="3" fill="#fff"/><path d="M10 -8 Q34 -38 60 -40 M10 6 Q30 14 44 28" fill="none" stroke="#2B2147" stroke-width="3" opacity=".55"/></g>`;
  return `<g transform="translate(0 ${n2(bob - (o.up || 0))})">${wing(-1)}${wing(1)}<ellipse cx="0" cy="8" rx="8" ry="26" fill="#3B2A5C" stroke="#2B2147" stroke-width="3"/><circle cx="0" cy="-22" r="15" fill="#3B2A5C" stroke="#2B2147" stroke-width="3"/>
    <path d="M-6 -34 Q-16 -56 -24 -58 M6 -34 Q16 -56 24 -58" fill="none" stroke="#2B2147" stroke-width="3.5" stroke-linecap="round"/><circle cx="-24" cy="-58" r="3.6" fill="#2B2147"/><circle cx="24" cy="-58" r="3.6" fill="#2B2147"/>
    ${cuteEye(-6, -24, 5.2, t)}${cuteEye(6, -24, 5.2, t, .2)}<path d="M-5 -14 Q0 -9 5 -14" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>`; }
const butterflyArt = (t) => TF(0, 10, 1.55, butterfly(t));

/* ====================================================================================================================================
   THE CLASSROOM (static, baked): the front wall with the whiteboard (left), the side wall with two glass louvre windows (right; the corridor's
   ledge with potted plants beyond), two rows of pupils' desks, the teacher's table and chair, a vinyl floor. Live: the two ceiling fans, the
   butterfly on the nearest plant outside the first window (BFLY).
   ==================================================================================================================================== */
const CL = { floor: 690, tx: 660, ty: 770, tw: 540, chx: 1020, chy: 1004, bx: 1470, by: 1040, bs: .43 }, BFLY = [1262, 398];
const potted = (x, y, k = 1, seed = 1) => { let lv = ""; for (let i = 0; i < 7; i++) { const a = -160 + i * 23 + 8 * hash(i, seed), L = 46 + 24 * hash(i, seed + 2); lv += `<g transform="translate(0 -46) rotate(${n2(a + 90)})"><path d="M0 0 Q${n2(L * .5)} -16 ${n2(L)} 0 Q${n2(L * .5)} 14 0 0z" fill="${i % 2 ? "#43BF6C" : "#2F9A57"}" stroke="#1F7A44" stroke-width="2.5" transform="rotate(-90)"/></g>`; }
  return TF(x, y, k, `<path d="M-30 0 L-36 -48 H36 L30 0z" fill="#D9824E" stroke="#9A5226" stroke-width="4" stroke-linejoin="round"/><rect x="-40" y="-56" width="80" height="14" rx="5" fill="#E89A66" stroke="#9A5226" stroke-width="4"/>${lv}`); };
function classWindow(x, y, w, h, plants) { const ly = y + h * .72; let s = `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="6" fill="#DDE3EA" stroke="#8E9AA8" stroke-width="5"/><clipPath id="cw${x}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#cw${x})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#sSky)"/>
    <circle cx="${x + w * .2}" cy="${ly - 40}" r="90" fill="#6FD08A"/><circle cx="${x + w * .55}" cy="${ly - 20}" r="110" fill="#43BF6C"/><circle cx="${x + w * .9}" cy="${ly - 50}" r="80" fill="#6FD08A"/><ellipse cx="${x + w * .7}" cy="${y + 60}" rx="90" ry="22" fill="#fff" opacity=".8"/>
    <rect x="${x}" y="${ly}" width="${w}" height="${h}" fill="#E8DFCF"/><rect x="${x}" y="${ly}" width="${w}" height="14" fill="#F8F2E6"/><path d="M${x} ${ly + 14} H${x + w}" stroke="#B9AD98" stroke-width="3"/>`;
  for (const [px, k, sd] of plants) s += potted(x + px, ly + 2, k, sd);
  s += `</g>`; const n = 6, bh = h / n; for (let i = 0; i < n; i++) s += `<path d="M${x} ${n2(y + i * bh + 6)} H${x + w}" stroke="#fff" stroke-width="7" opacity=".55"/><path d="M${x} ${n2(y + i * bh + 12)} H${x + w}" stroke="#9FC4DC" stroke-width="3" opacity=".7"/>`;
  return s + `<rect x="${x + w / 2 - 5}" y="${y}" width="10" height="${h}" fill="#DDE3EA" stroke="#8E9AA8" stroke-width="2"/>`; }
BG.classroom = () => { const F = CL.floor; let tiles = ""; for (let i = -6; i <= 30; i++) tiles += `<path d="M${-192 + i * 110} ${F} L${n2(960 + (-192 + i * 110 - 960) * 1.7)} 1190" stroke="#9CAE98" stroke-width="3" opacity=".5"/>`;
  [0, 1, 2, 3].forEach((j) => { const y = F + 50 + j * j * 28 + j * 50; tiles += `<path d="M-192 ${y} H2112" stroke="#9CAE98" stroke-width="3" opacity=".5"/>`; });
  let desks = ""; [[1010, 748, .56], [1200, 748, .56], [1390, 748, .56], [1580, 748, .56], [1770, 748, .56], [1960, 748, .56]].forEach(([x, y, k]) => { desks += TF(x, y, k, deskS()); });
  let desks2 = ""; [[1130, 830, .74], [1380, 830, .74], [1630, 830, .74], [1880, 830, .74]].forEach(([x, y, k]) => { desks2 += TF(x, y, k, deskS()); });
  return `<rect x="-192" y="-108" width="2304" height="1296" fill="url(#sWall)"/><rect x="880" y="-108" width="1232" height="${F + 108}" fill="url(#sWall2)"/><path d="M880 -108 V${F}" stroke="#E3CDA2" stroke-width="5"/>
    <rect x="-192" y="-108" width="2304" height="110" fill="#F3EBDD"/><path d="M-192 2 H2112" stroke="#D9C8A4" stroke-width="6"/>
    <g filter="url(#dropS)"><rect x="110" y="180" width="700" height="350" rx="10" fill="#DDE3EA" stroke="#8E9AA8" stroke-width="5"/></g><rect x="128" y="198" width="664" height="314" rx="4" fill="#FCFEFF"/><path d="M150 230 L320 400" stroke="#EEF3F8" stroke-width="40" opacity=".9"/><path d="M360 216 L520 376" stroke="#EEF3F8" stroke-width="22" opacity=".9"/>
    <rect x="300" y="530" width="320" height="16" rx="5" fill="#C9D2DC" stroke="#8E9AA8" stroke-width="3"/><rect x="330" y="518" width="46" height="14" rx="4" fill="#3A8DFF"/><rect x="390" y="518" width="46" height="14" rx="4" fill="#FF6F61"/><rect x="520" y="512" width="70" height="20" rx="4" fill="#4A5670"/>
    <circle cx="720" cy="110" r="46" fill="#fff" stroke="#8E9AA8" stroke-width="6"/><path d="M720 110 V80 M720 110 L742 122" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>
    <rect x="-140" y="210" width="190" height="250" rx="8" fill="#D9B98A" stroke="#B98F52" stroke-width="5"/><rect x="-120" y="232" width="70" height="90" rx="4" fill="#FFF8EA"/><rect x="-40" y="232" width="70" height="60" rx="4" fill="#CFE9FB"/><rect x="-120" y="336" width="150" height="100" rx="4" fill="#FFE9A8"/>
    ${classWindow(1010, 200, 380, 340, [[70, .95, 3], [252, 1.1, 5], [340, .8, 9]])}${classWindow(1500, 200, 380, 340, [[90, 1, 7], [260, .9, 2]])}
    <rect x="-192" y="${F - 26}" width="2304" height="26" fill="#E3CDA2"/><rect x="-192" y="${F}" width="2304" height="${1188 - F}" fill="url(#sFloor)"/>${tiles}<path d="M-192 ${F} H2112" stroke="#9CAE98" stroke-width="5"/>
    <path d="M1040 ${F + 30} L1400 ${F + 30} L1560 ${F + 150} L1100 ${F + 150}z M1560 ${F + 30} L1900 ${F + 30} L2112 ${F + 150} L1740 ${F + 150}z" fill="#fff" opacity=".22"/>
    ${desks}${desks2}${TF(CL.tx, CL.ty, 1, tTable(CL.tw, CL.chy - CL.ty))}${TF(CL.chx, CL.chy, 1, chairS())}`; };
BG.classroomD = () => BG.classroom() + `<rect x="-192" y="-108" width="2304" height="1296" fill="${P.night}" opacity=".62"/>`;
const fanLive = (t, x, y = 96) => `<rect x="${x - 5}" y="-10" width="10" height="${y + 10}" fill="#9AA6B4"/><ellipse cx="${x}" cy="${y + 4}" rx="${n2(190 + 5 * Math.sin(t * 7))}" ry="24" fill="#fff" opacity=".4"/>${ceilingFan(x, y, t * 150).replace(/<rect[^>]*\/>/, "")}`;
// the butterfly where it sits (world): o = false (hidden) or { open, up } for the reveal
const bflyAt = (t, o) => o === false ? "" : TF(BFLY[0], BFLY[1], .5, butterfly(t, o || {}), -14);
/* the classroom, live. o.dim; o.bfly (false | {open, up}); o.items (world svg in front of the set); cam = [zoom, cx, cy] */
function VC(t, o = {}, cam) { return cam3(bg(o.dim ? "classroomD" : "classroom") + OP(o.dim ? .45 : 1, fanLive(t, 470) + fanLive(t, 1440)) + OP(o.dim ? .5 : 1, bflyAt(t, o.bfly)) + (o.items || ""), cam); }

/* ====================================================================================================================================
   The paper and the pencil drawing of the bag (front view, as the real bag). bagDrawing(k, o): origin = the bag's base middle on the paper;
   k 0..1 = how much is drawn (body, straps, zip, base, then the four label lines and words); o.mat = { base, zip, fab } 0..1: that part takes
   its material's colour (the sample has hopped onto it); o.words: false = no label words (small copies)
   ==================================================================================================================================== */
const PEN = "#5A5470";
// EP13 v2: one colour per part of the bag (never the answer green / blue or the YOU yellow), used on the drawing, its labels and its chips
const PARTC = { straps: "#7C3AED", zip: "#DB2777", body: "#B45309", base: "#334155" };
function bagDrawing(k = 1, o = {}) { const m = o.mat || {}, seg = (i, n = 9) => clamp(k * n - i), st = (u) => `pathLength="1" stroke-dasharray="1" stroke-dashoffset="${n2(1 - u)}"`, pen = `fill="none" stroke="${PEN}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const bodyD = `M-100 -40 V-170 Q-100 -250 -40 -250 H40 Q100 -250 100 -170 V-40`, baseD = `M-104 -44 H104 V-14 Q104 0 90 0 H-90 Q-104 0 -104 -14z`, sR = `M56 -238 Q182 -206 152 -112 Q136 -62 102 -32`, sL = `M-56 -238 Q-182 -206 -152 -112 Q-136 -62 -102 -32`, zD = `M-96 -176 Q0 -138 96 -176`;
  let s = "";
  if (m.fab > .02) s += OP(m.fab, `<path d="${sR}" fill="none" stroke="#F47A14" stroke-width="22" stroke-linecap="round"/><path d="${sL}" fill="none" stroke="#F47A14" stroke-width="22" stroke-linecap="round"/><path d="${bodyD}z" fill="url(#sBag)"/>`);
  if (m.base > .02) s += OP(m.base, `<path d="${baseD}" fill="url(#sBase)"/>`);
  if (m.zip > .02) s += OP(m.zip, `<path d="${zD}" fill="none" stroke="#C9D2E0" stroke-width="13" stroke-linecap="round"/>`);
  s += `<path d="${bodyD}" ${pen} ${st(seg(0))}/><path d="M-28 -246 Q0 -292 28 -246" ${pen} ${st(seg(1))}/><rect x="-58" y="-124" width="116" height="74" rx="14" ${pen} ${st(seg(1))}/><path d="${sL}" ${pen} stroke-width="14" opacity=".9" ${st(seg(2))}/><path d="${sR}" ${pen} stroke-width="14" opacity=".9" ${st(seg(3))}/>
    <path d="${zD}" ${pen} stroke-dasharray="${seg(4) >= 1 ? ".03 .03" : "1"}" ${seg(4) >= 1 ? `pathLength="1"` : st(seg(4))}/><path d="${baseD}" ${pen} ${st(seg(5))}/>`;
  // EP13 v2 (teacher, 22 Nov: "Which is flexible, strong and waterproof? ... consider colour coding"): o.cc = each part outlined in its own
  // colour (PARTC) as its label appears; the label's part word in the same colour
  if (o.cc) { const lu = (i) => clamp(k * 9 - 6 - i * .7), cs = (d, c, a, w = 9) => a > .01 ? `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(a)}"/>` : "";
    s += cs(bodyD, PARTC.body, lu(2)) + cs(sL, PARTC.straps, lu(0), 12) + cs(sR, PARTC.straps, lu(0), 12) + cs(zD, PARTC.zip, lu(1), 10) + cs(baseD, PARTC.base, lu(3)); }
  if (o.words !== false) { const tg = o.tags || {}, labs = o.left ? [["straps", -150, -150, -235, -250, "end", "fabric"], ["zip", -70, -160, -235, -185, "end", "metal"], ["body", -100, -100, -235, -110, "end", "fabric"], ["base", -104, -22, -235, -10, "end", "plastic"]]
      : [["straps", 178, -210, 300, -250, "start", "fabric"], ["body", -100, -100, -250, -130, "end", "fabric"], ["zip", 60, -158, 300, -120, "start", "metal"], ["base", -104, -22, -250, -10, "end", "plastic"]];
    labs.forEach(([w, px, py, lx, ly, an, mat], i) => { const u = clamp(k * 9 - 6 - i * .7); if (u <= 0) return; const fs = o.fs || 44, on = (tg[w] || 0) > .5;
      s += `<path d="M${px} ${py} L${n2(lerp(px, lx, u))} ${n2(lerp(py, ly, u))}" stroke="${PEN}" stroke-width="4" stroke-linecap="round"/>` + OP(clamp(u * 2 - 1), `<text x="${lx + (an === "start" ? 12 : -12)}" y="${ly + fs * .32}" font-family="Fredoka" font-weight="600" font-size="${fs}" fill="${PEN}" text-anchor="${an}">${o.cc ? `<tspan fill="${PARTC[w]}" font-weight="700">${w}</tspan>` : w}${on ? ` · <tspan fill="${o.cc ? P.ink : "#1F8A4C"}" font-weight="700">${mat}</tspan>` : ""}</text>`); }); }
  return s; }
const paperS = (w, h) => `<g filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="#FFFDF4" stroke="#E3D6B8" stroke-width="5"/></g>`;
// the finished drawing as a small picture (paper + drawing + materials). origin = its centre; 760 x 560 at sc = 1
const drawingPic = (o = {}) => o.words === false ? paperS(760, 560) + TF(0, 190, 1.25, bagDrawing(o.k === undefined ? 1 : o.k, o)) : paperS(1180, 560) + TF(o.left ? 150 : 0, 190, 1.2, bagDrawing(o.k === undefined ? 1 : o.k, o));
const MATALL = { base: 1, zip: 1, fab: 1 };
// an ordinary pencil in an adult's hand: the tip at (0, 0), the hand up to the right
const pencilHand = () => `<g transform="rotate(-52)"><rect x="18" y="-9" width="230" height="18" rx="3" fill="#FFC83A" stroke="#C98200" stroke-width="4"/><path d="M0 0 L20 -9 V9z" fill="#F2D7A6" stroke="#C98200" stroke-width="3" stroke-linejoin="round"/><path d="M0 0 L8 -3.6 V3.6z" fill="${P.ink}"/><rect x="236" y="-9" width="22" height="18" rx="4" fill="#FF8FB1" stroke="#C4547A" stroke-width="3"/></g>${aHand(96, -70, 150, 1.05)}`;
/* the sample tiles (palm-sized, 150 x 110; origin = centre): "fabric" (the bag's orange fabric), "plastic" (a clear-ish dark sheet), "wood".
   o.wet 0..1 (fabric: a dark wet patch that has sunk in), o.bead 0..1 (plastic: a round drop that stays on top) */
function sampleTile(kind, o = {}) { const base = kind === "fabric" ? `<rect x="-75" y="-55" width="150" height="110" rx="10" fill="#F47A14" stroke="#8A3A06" stroke-width="5"/><rect x="-71" y="-51" width="142" height="102" rx="8" fill="url(#sWv)"/>`
    : kind === "plastic" ? `<rect x="-75" y="-55" width="150" height="110" rx="14" fill="url(#sBase)" stroke="#2B2147" stroke-width="5"/><path d="M-58 -36 H20" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/><path d="M-58 -18 H-20" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>`
    : `<rect x="-75" y="-55" width="150" height="110" rx="10" fill="url(#sWood)" stroke="#7A4C26" stroke-width="5"/>${wgrain(-64, 64, -28, 3, 2)}${wgrain(-64, 64, 0, 3, 5)}${wgrain(-64, 64, 28, 3, 8)}`;
  const wet = o.wet > .02 ? `<ellipse cx="6" cy="4" rx="${n2(44 * o.wet)}" ry="${n2(30 * o.wet)}" fill="#7A2E00" opacity=".55"/>` : "";
  const bead = o.bead > .02 ? TF(6, 0, o.bead, `<ellipse cx="0" cy="8" rx="24" ry="7" fill="${P.ink}" opacity=".3"/><path d="M-24 4 Q-24 -22 0 -24 Q24 -22 24 4 Q24 12 0 12 Q-24 12 -24 4z" fill="#9BD8FF" stroke="#3A8DFF" stroke-width="3"/><ellipse cx="-9" cy="-10" rx="7" ry="4.5" fill="#fff" opacity=".9"/>`) : "";
  return base + wet + bead; }
// a dropper (origin = its tip, pointing down); sq 0..1 = the bulb squeezed
const dropper = (sq = 0) => `<path d="M-5 0 L-9 -70 H9 L5 0z" fill="#DDF4FF" stroke="#7FB4D6" stroke-width="4" stroke-linejoin="round"/><path d="M-6 -30 L-8 -62 H8 L6 -30z" fill="#9BD8FF"/><rect x="-16" y="-84" width="32" height="16" rx="5" fill="#C9D2DC" stroke="#8E9AA8" stroke-width="4"/><ellipse cx="0" cy="-112" rx="${n2(20 - 6 * sq)}" ry="30" fill="#FF8A7A" stroke="#C4502E" stroke-width="4"/>`;
const waterDrop = (r = 12) => `<path d="M0 ${-r * 1.7} Q${r} ${-r * .2} ${r} ${r * .3} A${r} ${r} 0 1 1 ${-r} ${r * .3} Q${-r} ${-r * .2} 0 ${-r * 1.7}z" fill="#9BD8FF" stroke="#3A8DFF" stroke-width="3"/>`;
// a short metal zip on its cloth tape, lying flat (origin = its centre; 300 long). u 0..1 = how far it is OPEN (the pull runs right to left)
function zipShort(u = 0) { const px = lerp(120, -120, clamp(u)), gap = 26 * clamp(u); let teeth = "";
  for (let i = 0; i < 17; i++) { const x = -128 + i * 16, open = x > px ? gap * clamp((x - px) / 60) : 0; teeth += `<rect x="${x - 4}" y="${n2(-9 - open)}" width="8" height="9" rx="2" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="2"/><rect x="${x + 4}" y="${n2(open)}" width="8" height="9" rx="2" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="2"/>`; }
  return `<path d="M-150 -34 H150 V-6 Q${n2(px + 60)} ${n2(-6 - gap)} ${n2(px)} -4 H-150z" fill="#F8B26A" stroke="#B4500A" stroke-width="4" stroke-linejoin="round"/><path d="M-150 34 H150 V6 Q${n2(px + 60)} ${n2(6 + gap)} ${n2(px)} 4 H-150z" fill="#F8B26A" stroke="#B4500A" stroke-width="4" stroke-linejoin="round"/>${teeth}
    <g transform="translate(${n2(px)} 0)"><rect x="-17" y="-15" width="30" height="30" rx="8" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="4"/><rect x="-46" y="-8" width="34" height="16" rx="7" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="4"/><circle cx="-36" cy="0" r="3.4" fill="#5E6B7C"/></g>`; }
// the small cream card by the straps: an engineer's hard hat, a pencil and a ruler (origin = the card's foot)
const hardHatCard = () => `<g filter="url(#dropS)"><rect x="-110" y="-190" width="220" height="186" rx="16" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><path d="M-70 0 l14 -8 M70 0 l-14 -8" stroke="#8A5A36" stroke-width="8" stroke-linecap="round"/>
  <path d="M-62 -92 Q-62 -160 0 -160 Q62 -160 62 -92z" fill="#FFC83A" stroke="#C98200" stroke-width="6" stroke-linejoin="round"/><path d="M-12 -158 V-110 M12 -158 V-110" stroke="#C98200" stroke-width="5"/><rect x="-78" y="-98" width="156" height="18" rx="9" fill="#FFD75A" stroke="#C98200" stroke-width="6"/>
  <g transform="translate(-36 -44) rotate(-12)"><rect x="-40" y="-7" width="70" height="14" rx="3" fill="#43BF6C" stroke="#1F8A4C" stroke-width="3.5"/><path d="M30 -7 L46 0 L30 7z" fill="#F2D7A6" stroke="#1F8A4C" stroke-width="3"/></g>
  <g transform="translate(38 -40) rotate(8)"><rect x="-44" y="-9" width="88" height="18" rx="3" fill="#DDF4FF" stroke="#3A8DFF" stroke-width="3.5"/><path d="M-32 -9 v8 M-16 -9 v6 M0 -9 v8 M16 -9 v6 M32 -9 v8" stroke="#3A8DFF" stroke-width="3"/></g>`;
// a small easel (origin = its feet's middle); the picture sits at (0, -h/2 - 90)
const easelS = (inner, w = 400, h = 300) => `<ellipse cx="0" cy="4" rx="${w * .42}" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w * .32} 0 L${-w * .1} ${-h - 110} M${w * .32} 0 L${w * .1} ${-h - 110} M0 -40 V${-h - 120}" stroke="#8A5A36" stroke-width="14" stroke-linecap="round"/><rect x="${-w * .44}" y="-92" width="${w * .88}" height="14" rx="6" fill="#A9703C" stroke="#7A4C26" stroke-width="4"/>${TF(0, -92 - h / 2, 1, inner)}`;
// Basil's picture: a school bag standing on a wet canteen floor, a yellow wet-floor sign behind it (origin = centre; 460 x 320)
const wetFloorPic = (t = 0) => `<g filter="url(#drop)"><rect x="-236" y="-166" width="472" height="332" rx="22" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/></g><clipPath id="wfp"><rect x="-216" y="-146" width="432" height="292" rx="12"/></clipPath><g clip-path="url(#wfp)"><rect x="-216" y="-146" width="432" height="292" fill="#EAF3F8"/><rect x="-216" y="40" width="432" height="110" fill="#C9D6DC"/>
  <path d="M-216 40 H216 M-110 40 L-150 150 M0 40 V150 M110 40 L150 150" stroke="#A9B8C0" stroke-width="3"/><ellipse cx="-20" cy="104" rx="170" ry="26" fill="#9BD8FF" opacity=".75"/><ellipse cx="-60" cy="98" rx="60" ry="7" fill="#fff" opacity=".8"/><ellipse cx="70" cy="112" rx="40" ry="5" fill="#fff" opacity=".7"/>
  <g transform="translate(120 96)"><path d="M-44 0 L-8 -150 H8 L44 0z" fill="#FFD60A" stroke="#C98200" stroke-width="5" stroke-linejoin="round"/><path d="M0 -112 L-20 -72 H20z" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M0 -100 V-86" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-78" r="2.6" fill="${P.ink}"/>${T(0, -36, "WET", 22, P.ink)}${T(0, -14, "FLOOR", 18, P.ink)}</g>
  ${TF(-60, 104, .78, bag13({ strapR: "new" }))}<path d="M-130 ${n2(60 + 30 * ((t * .9) % 1))} q5 8 0 14 q-5 -6 0 -14z" fill="#3A8DFF" opacity="${n2(1 - ((t * .9) % 1))}"/></g>`;
