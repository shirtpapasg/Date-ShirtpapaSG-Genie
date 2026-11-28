// bugs.js: EP6's small animals, drawn true (the plan's realism notes): the ant (six legs, ALL joined to the middle part, the thorax; two
// elbowed feelers on the head; head, thorax and a segmented abdomen; a hard, glossy body), the garden spider (a St Andrew's cross spider in
// its web: eight legs, two body parts, no feelers), the grasshopper (two pairs of wings), the Aedes mosquito (one pair of wings), a
// butterfly, a moth, and the pigeon (feathers, two legs). Pure functions of their arguments.
const XDEFS7 = () => `${lg("antG", [[0, "#5C4338"], [.5, "#2E221E"], [1, "#16100E"]])}${lg("antL", [[0, "#6A5248"], [1, "#3A2C26"]])}
  ${lg("hopG", [[0, "#A6DE5A"], [1, "#4E9E2E"]])}${lg("hopW", [[0, "#F8E7C6", .85], [1, "#E8B9A0", .55]])}${lg("pigG", [[0, "#B6BECF"], [1, "#7E879C"]])}${lg("pigN", [[0, "#5FBF8A"], [.5, "#8A6AB8"], [1, "#6A7690"]], 1, 0)}
  ${lg("spCe", [[0, "#F4F4F8"], [1, "#B9BCC8"]])}${lg("bflyW", [[0, "#FFE58A"], [1, "#F2A93A"]])}${lg("mothW", [[0, "#C9A57E"], [1, "#8A6A4E"]])}`;

/* ---------- the ant, side view, facing right. origin = the ground under its thorax. Length about 640 px at k = 1.
   o: glow [6] (each leg 0..1, front to back: 1 near-front, 2 far-front, 3 near-middle, 4 far-middle, 5 near-hind, 6 far-hind),
      parts [3] (head, thorax, abdomen glow), feel (feelers glow), clean (0..1: the near front leg lifts to clean a feeler), walk (phase, radians),
      shine (0..1: a gloss sweeps from head to abdomen), cleanAnt (0..1 the near feeler bends down to be cleaned) ---------- */
const ANT_HIP = [[96, -126], [110, -132], [48, -120], [62, -126], [-4, -120], [10, -126]];
function antLegPts(i, o = {}) { const far = i % 2 === 1, pair = i >> 1, w = o.walk, tri = (i === 0 || i === 3 || i === 4) ? 0 : Math.PI;   // tripod gait
  const base = [[[172, -100], [218, 0]], [[192, -108], [250, -6]], [[78, -74], [64, 0]], [[100, -80], [98, -6]], [[-70, -82], [-150, 0]], [[-44, -88], [-116, -6]]][i];
  let [k, f] = base.map((p) => [...p]); if (w !== undefined) { const s = Math.sin(w + tri), lift = Math.max(0, Math.cos(w + tri)); f[0] += 26 * s; f[1] -= 16 * lift; k[0] += 12 * s; k[1] -= 10 * lift; }
  if (i === 0 && o.clean) { const c = eio(o.clean); k = [lerp(k[0], 214, c), lerp(k[1], -168, c)]; f = [lerp(f[0], 232, c), lerp(f[1], -232, c)]; }
  return { h: ANT_HIP[i], k, f, far }; }
function antLeg(i, o = {}) { const { h, k, f, far } = antLegPts(i, o), g = (o.glow || [])[i] || 0, col = far ? "url(#antL)" : "url(#antG)", w1 = far ? 12 : 15, w2 = far ? 9 : 11;
  const t1 = [lerp(k[0], f[0], .72), lerp(k[1], f[1], .72)];
  return (g > .02 ? `<path d="M${h[0]} ${h[1]} L${n2(k[0])} ${n2(k[1])} L${n2(f[0])} ${n2(f[1])}" fill="none" stroke="${P.sun}" stroke-width="${n2(30 + 10 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
    + `<path d="M${h[0]} ${h[1]} L${n2(k[0])} ${n2(k[1])}" stroke="${col}" stroke-width="${w1}" stroke-linecap="round"/><path d="M${n2(k[0])} ${n2(k[1])} L${n2(t1[0])} ${n2(t1[1])}" stroke="${col}" stroke-width="${w2}" stroke-linecap="round"/>
    <path d="M${n2(t1[0])} ${n2(t1[1])} L${n2(f[0])} ${n2(f[1])}" stroke="${col}" stroke-width="${w2 - 3}" stroke-linecap="round" stroke-dasharray="11 4"/><circle cx="${n2(k[0])}" cy="${n2(k[1])}" r="${w1 * .55}" fill="${far ? "#4A3A32" : "#3A2C26"}"/>
    ${far ? "" : `<path d="M${h[0] + 3} ${h[1] - 2} L${n2(k[0] + 2)} ${n2(k[1] - 3)}" stroke="#A88A78" stroke-width="3" stroke-linecap="round" opacity=".5"/>`}`; }
function antFeeler(far, o = {}) { const c = o.cleanAnt || 0, b = far ? [188, -212] : [206, -210], e = far ? [228, -322] : [250, -318];
  const tip = far ? [332, -300] : [lerp(366, 262, c), lerp(-280, -216, c)], mid = far ? [290, -320] : [lerp(320, 268, c), lerp(-312, -270, c)];
  const g = o.feel || 0, d = `M${b[0]} ${b[1]} L${e[0]} ${e[1]} Q${n2(mid[0])} ${n2(mid[1])} ${n2(tip[0])} ${n2(tip[1])}`;
  return (g > .02 ? `<path d="${d}" fill="none" stroke="${P.sun}" stroke-width="${n2(26 + 8 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
    + `<path d="${d}" fill="none" stroke="${far ? "#4A3A32" : "#2A201C"}" stroke-width="${far ? 7 : 9}" stroke-linecap="round" stroke-linejoin="round"/>` + `<circle cx="${n2(tip[0])}" cy="${n2(tip[1])}" r="${far ? 6 : 8}" fill="${far ? "#4A3A32" : "#2A201C"}"/>`; }
function antBig(o = {}) { const p = o.parts || [0, 0, 0], sh = o.shine === undefined ? -1 : o.shine, gl = (x) => sh < 0 ? 0 : Math.exp(-Math.pow((x - lerp(260, -330, sh)) / 70, 2));
  const pg = (cx, cy, rx, ry, a, rot = 0) => a > .02 ? `<ellipse cx="${cx}" cy="${cy}" rx="${n2(rx + 26)}" ry="${n2(ry + 26)}" fill="${P.sun}" opacity="${n2(.75 * a)}" filter="url(#b10)" transform="rotate(${rot} ${cx} ${cy})"/>` : "";
  let s = `<ellipse cx="20" cy="4" rx="300" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>`;
  s += [1, 3, 5].map((i) => antLeg(i, o)).join("") + antFeeler(true, o);
  s += pg(-200, -150, 128, 90, p[2], 10) + pg(40, -150, 90, 50, p[1]) + pg(186, -168, 72, 60, p[0]);
  // abdomen (gaster) in segments, the waist (petiole), the thorax, the head
  s += `<g transform="rotate(10 -200 -150)"><ellipse cx="-200" cy="-150" rx="128" ry="90" fill="url(#antG)"/>${[-130, -190, -250].map((x, i) => `<path d="M${x} ${-226 + i * 6} Q${x - 26} -150 ${x} ${-74 - i * 6}" fill="none" stroke="#120C0A" stroke-width="5" opacity=".55"/><path d="M${x + 4} ${-222 + i * 6} Q${x - 18} -186 ${x - 14} -168" fill="none" stroke="#9A7E70" stroke-width="3" opacity=".35"/>`).join("")}
    <ellipse cx="-190" cy="-200" rx="70" ry="22" fill="#fff" opacity="${n2(.18 + .55 * gl(-200))}" transform="rotate(-8 -190 -200)"/></g>
  <ellipse cx="-62" cy="-140" rx="22" ry="28" fill="url(#antG)"/><path d="M-80 -130 Q-62 -110 -40 -128" fill="none" stroke="#120C0A" stroke-width="4" opacity=".5"/>
  <path d="M-46 -130 Q-34 -180 30 -186 Q100 -188 120 -160 Q124 -126 84 -116 Q12 -108 -42 -114z" fill="url(#antG)"/><path d="M-20 -164 Q30 -184 96 -176" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${n2(.16 + .55 * gl(40))}"/>
  <path d="M112 -150 Q130 -160 140 -150" fill="none" stroke="#2E221E" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="186" cy="-168" rx="72" ry="60" fill="url(#antG)" transform="rotate(-8 186 -168)"/><ellipse cx="206" cy="-186" rx="17" ry="21" fill="#0E0A08"/><ellipse cx="200" cy="-194" rx="6" ry="7" fill="#fff" opacity=".7"/>
  <ellipse cx="170" cy="-206" rx="34" ry="12" fill="#fff" opacity="${n2(.16 + .55 * gl(186))}" transform="rotate(-14 170 -206)"/>
  <path d="M248 -150 Q282 -146 290 -122 Q270 -130 250 -126z M240 -134 Q270 -120 272 -98 Q252 -110 236 -118z" fill="#3A2C26" stroke="#120C0A" stroke-width="3" stroke-linejoin="round"/>`;
  s += [0, 2, 4].map((i) => antLeg(i, o)).join("") + antFeeler(false, o);
  return s; }
// the leg tips and knees (for numbers and labels), in ant coordinates
const antLegTip = (i, o = {}) => antLegPts(i, o).f, antLegKnee = (i, o = {}) => antLegPts(i, o).k;
// a small walking ant (the line of ants along the path): k = scale, ph = walk phase
const antSmall = (ph) => antBig({ walk: ph });

/* ---------- the garden spider (a St Andrew's cross spider), seen from the front/top, head up. origin = where its two body parts meet.
   o: glow [8] legs (1-4 on its left, top to bottom; 5-8 on its right), parts [2] (head-and-body part, abdomen), id (for the clip) ---------- */
const SP_DIR = [[-122, -26], [-150, -14], [165, 14], [128, 24]];   // [first segment angle, bend] for the legs on its left (mirrored on the right)
function spiderLegPts(i) { const sd = i < 4 ? -1 : 1, j = i % 4, [a0, bend] = SP_DIR[j], hip = [sd * 40, -86 + j * 20];
  const a = (sd < 0 ? a0 : 180 - a0) * Math.PI / 180, b = (sd < 0 ? a0 + bend : 180 - a0 - bend) * Math.PI / 180, L1 = [150, 150, 140, 150][j], L2 = [190, 170, 150, 180][j];
  const k = [hip[0] + Math.cos(a) * L1, hip[1] + Math.sin(a) * L1 - 30], f = [k[0] + Math.cos(b) * L2, k[1] + Math.sin(b) * L2 + (j < 2 ? 10 : 20)];
  return { h: hip, k, f }; }
function spiderBig(o = {}) { const id = o.id || "sp", p = o.parts || [0, 0]; let legs = "";
  for (let i = 0; i < 8; i++) { const { h, k, f } = spiderLegPts(i), g = (o.glow || [])[i] || 0, d = `M${n2(h[0])} ${n2(h[1])} L${n2(k[0])} ${n2(k[1])} L${n2(f[0])} ${n2(f[1])}`;
    legs += (g > .02 ? `<path d="${d}" fill="none" stroke="${P.sun}" stroke-width="${n2(32 + 8 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
      + `<path d="${d}" fill="none" stroke="#2A2220" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#E8C24A" stroke-width="8" stroke-linecap="butt" stroke-linejoin="round" stroke-dasharray="26 18"/><circle cx="${n2(k[0])}" cy="${n2(k[1])}" r="8" fill="#2A2220"/>`; }
  const pg = (cy, rx, ry, a) => a > .02 ? `<ellipse cx="0" cy="${cy}" rx="${rx + 26}" ry="${ry + 26}" fill="${P.sun}" opacity="${n2(.75 * a)}" filter="url(#b10)"/>` : "";
  return legs + pg(-60, 50, 56, p[0]) + pg(100, 86, 108, p[1])
    + `<clipPath id="ab_${id}"><ellipse cx="0" cy="100" rx="86" ry="108"/></clipPath><ellipse cx="0" cy="100" rx="86" ry="108" fill="#F4D23A" stroke="#3A2E1E" stroke-width="5"/>
    <g clip-path="url(#ab_${id})">${[30, 70, 112, 152, 190].map((y, i) => `<path d="M-100 ${y} Q0 ${y + 24} 100 ${y}" fill="none" stroke="${i % 2 ? "#F8F4E8" : "#2A2220"}" stroke-width="${i % 2 ? 12 : 16}"/>`).join("")}<ellipse cx="-30" cy="60" rx="24" ry="40" fill="#fff" opacity=".3"/></g>
    <ellipse cx="0" cy="-60" rx="50" ry="56" fill="url(#spCe)" stroke="#5A5A66" stroke-width="5"/><path d="M0 -104 V-20 M-26 -70 Q0 -52 26 -70" fill="none" stroke="#8A8A98" stroke-width="5" stroke-linecap="round"/>
    ${[[-12, -96], [12, -96], [-22, -86], [22, -86]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#1A1416"/>`).join("")}<path d="M-12 -112 q-4 12 2 18 M12 -112 q4 12 -2 18" fill="none" stroke="#3A2E2A" stroke-width="7" stroke-linecap="round"/>`; }
const spiderLegTip = (i) => spiderLegPts(i).f;
// the web: radial threads, a spiral, and the white zig-zag cross the St Andrew's cross spider is named for. origin = the hub
function spiderWeb(R = 330, t = 0, o = {}) { let s = "", sp = ""; const N = 18, op = o.op || .75;
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2 + .1, rr = R * (.86 + .14 * hash(i, 5)); s += `<path d="M0 0 L${n2(Math.cos(a) * rr)} ${n2(Math.sin(a) * rr)}"/>`; }
  for (let k = 0; k < 13 * N; k++) { const a = k / N * Math.PI * 2 + .1, rr = 50 + (R - 70) * k / (13 * N); sp += `${k ? "L" : "M"}${n2(Math.cos(a) * rr)} ${n2(Math.sin(a) * rr + 2 * Math.sin(t * 1.3 + k))}`; }
  let zz = ""; for (const a of [-135, -45, 45, 135]) { const r = a * Math.PI / 180, nx = -Math.sin(r), ny = Math.cos(r); let d = ""; for (let j = 0; j <= 14; j++) { const u = 60 + j * 14, w = (j % 2 ? 12 : -12); d += `${j ? "L" : "M"}${n2(Math.cos(r) * u + nx * w)} ${n2(Math.sin(r) * u + ny * w)}`; } zz += `<path d="${d}"/>`; }
  return `<g fill="none" stroke="#fff" stroke-width="${o.w || 2.4}" opacity="${op}">${s}<path d="${sp}"/></g><g fill="none" stroke="#fff" stroke-width="${(o.w || 2.4) * 2.6}" stroke-linejoin="round" opacity="${n2(op * .95)}">${zz}</g>`; }

/* ---------- insects seen from above, wings open, head up, so the wings and all SIX legs (three each side, all from the thorax) show.
   origin = the thorax. o.flap (radians) flutters the wings a little ---------- */
const legPair = (hy, kx, ky, fx, fy, col, w = 9, band) => [-1, 1].map((sd) => `<path d="M${sd * 14} ${hy} L${sd * kx} ${ky} L${sd * fx} ${fy}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` + (band ? `<path d="M${sd * 14} ${hy} L${sd * kx} ${ky} L${sd * fx} ${fy}" fill="none" stroke="#fff" stroke-width="${w * .8}" stroke-dasharray="5 22"/>` : "")).join("");
// the grasshopper: TWO pairs of wings (narrow green front wings, broad see-through back wings), big jumping back legs
function grasshopper(o = {}) { const f = Math.sin(o.flap || 0) * 4;
  const hw = (sd) => `<g transform="scale(${sd} 1) rotate(${n2(f)})"><path d="M8 -20 Q140 -150 300 -70 Q310 40 220 110 Q100 120 8 30z" fill="url(#hopW)" stroke="#C88A6A" stroke-width="4"/>${[-60, -20, 20, 60, 90].map((y) => `<path d="M10 4 Q150 ${y * .4} 260 ${y}" fill="none" stroke="#C88A6A" stroke-width="2.5" opacity=".7"/>`).join("")}</g>`;
  const fw = (sd) => `<g transform="scale(${sd} 1) rotate(${n2(-f)})"><path d="M10 -36 Q160 -110 300 -150 Q316 -128 300 -110 Q160 -40 12 0z" fill="#7DB84A" stroke="#3E7A2A" stroke-width="4"/><path d="M14 -18 Q160 -84 300 -130" fill="none" stroke="#3E7A2A" stroke-width="2.5" opacity=".7"/>${[0, 1, 2, 3, 4].map((i) => `<circle cx="${80 + i * 46}" cy="${n2(-58 - i * 16)}" r="5" fill="#4E8A2E" opacity=".6"/>`).join("")}</g>`;
  return hw(-1) + hw(1) + fw(-1) + fw(1)
    + legPair(-60, 70, -110, 96, -160, "#5EA634", 11) + legPair(-34, 84, -40, 116, -6, "#5EA634", 11)
    + [-1, 1].map((sd) => `<path d="M${sd * 16} -10 L${sd * 92} 120 L${sd * 54} 250" fill="none" stroke="#3E7A2A" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sd * 16} -10 L${sd * 92} 120 L${sd * 54} 250" fill="none" stroke="#8CCB4A" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/>${[0, 1, 2].map((i) => `<path d="M${sd * (34 + i * 18)} ${20 + i * 28} l${sd * 14} -8" stroke="#3E7A2A" stroke-width="3"/>`).join("")}`).join("")
    + `<path d="M-26 0 Q-30 150 0 230 Q30 150 26 0z" fill="url(#hopG)" stroke="#3E7A2A" stroke-width="5"/>${[50, 90, 130, 170].map((y) => `<path d="M-22 ${y} Q0 ${y + 10} 22 ${y}" fill="none" stroke="#3E7A2A" stroke-width="3" opacity=".5"/>`).join("")}
    <path d="M-34 -80 Q0 -96 34 -80 L30 0 Q0 10 -30 0z" fill="#8CCB4A" stroke="#3E7A2A" stroke-width="5"/><ellipse cx="0" cy="-122" rx="34" ry="44" fill="url(#hopG)" stroke="#3E7A2A" stroke-width="5"/><ellipse cx="-24" cy="-132" rx="10" ry="15" fill="#3A2E1A"/><ellipse cx="24" cy="-132" rx="10" ry="15" fill="#3A2E1A"/>
    <path d="M-12 -162 Q-50 -230 -90 -250 M12 -162 Q50 -230 90 -250" fill="none" stroke="#4E8E2E" stroke-width="5" stroke-linecap="round"/>`; }
// the Aedes mosquito: ONE pair of see-through wings; long striped legs; a long mouthpart
function mosquito(o = {}) { const f = Math.sin((o.flap || 0) * 12) * 6;
  const wing = (sd) => `<g transform="scale(${sd} 1) rotate(${n2(28 + f)})"><path d="M6 -10 Q120 -40 250 -10 Q260 10 240 22 Q120 30 6 10z" fill="#E8F4FF" fill-opacity=".65" stroke="#9AB0C8" stroke-width="3.5"/>${[-6, 4, 14].map((y) => `<path d="M10 ${y / 3} Q120 ${y} 236 ${y}" fill="none" stroke="#9AB0C8" stroke-width="2"/>`).join("")}</g>`;
  return legPair(-30, 110, -130, 150, -250, "#1E1A1C", 7, 1) + legPair(-14, 130, -10, 230, 70, "#1E1A1C", 7, 1) + legPair(4, 90, 110, 160, 280, "#1E1A1C", 7, 1) + wing(-1) + wing(1)
    + `<path d="M-14 10 Q-20 140 0 230 Q20 140 14 10z" fill="#2A2426"/>${[50, 90, 130, 170].map((y) => `<path d="M-14 ${y} Q0 ${y + 6} 14 ${y}" fill="none" stroke="#fff" stroke-width="6"/>`).join("")}
    <ellipse cx="0" cy="-20" rx="30" ry="38" fill="#2A2426"/><path d="M0 -50 V0 M-10 -40 Q0 -30 10 -40" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="0" cy="-70" r="20" fill="#2A2426"/><circle cx="-10" cy="-74" r="7" fill="#5A4A50"/><circle cx="10" cy="-74" r="7" fill="#5A4A50"/>
    <path d="M0 -86 V-190" stroke="#2A2426" stroke-width="5" stroke-linecap="round"/><path d="M-6 -86 Q-40 -140 -50 -170 M6 -86 Q40 -140 50 -170" fill="none" stroke="#3A3236" stroke-width="3"/>${[0, 1, 2].map((i) => `<path d="M${-14 - i * 10} ${-104 - i * 18} l-10 -2 M${14 + i * 10} ${-104 - i * 18} l10 -2" stroke="#3A3236" stroke-width="2"/>`).join("")}`; }
// a butterfly, wings open: TWO pairs (big front wings, rounded back wings); six thin legs; clubbed feelers
function butterfly(o = {}) { const fl = o.flap === undefined ? 0 : .5 + .5 * Math.sin(o.flap * 5), sq = lerp(1, .4, fl);
  const w = (sd) => `<g transform="scale(${n2(sd * sq)} 1)"><path d="M8 -20 Q60 -230 250 -220 Q300 -150 220 -40 Q120 0 8 0z" fill="url(#bflyW)" stroke="#2A2220" stroke-width="7" stroke-linejoin="round"/><path d="M250 -220 Q300 -150 220 -40" fill="none" stroke="#2A2220" stroke-width="22"/>${[[250, -180], [262, -130], [240, -84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff"/>`).join("")}<path d="M10 -10 L200 -190 M10 -10 L230 -120 M10 -10 L190 -50" stroke="#2A2220" stroke-width="4"/>
    <path d="M8 6 Q200 20 210 120 Q170 210 70 200 Q10 150 8 30z" fill="#F7B54A" stroke="#2A2220" stroke-width="7" stroke-linejoin="round"/><path d="M10 14 L170 150 M10 14 L110 190 M10 14 L200 80" stroke="#2A2220" stroke-width="4"/>${[[150, 180], [196, 134]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff"/>`).join("")}</g>`;
  return w(-1) + w(1) + legPair(-34, 60, -50, 80, -60, "#3A2E2A", 5) + legPair(-14, 66, -6, 92, 10, "#3A2E2A", 5) + legPair(4, 56, 40, 74, 70, "#3A2E2A", 5)
    + `<ellipse cx="0" cy="80" rx="14" ry="100" fill="#3A2E2A"/><ellipse cx="0" cy="-20" rx="20" ry="36" fill="#4A3A34"/><circle cx="0" cy="-66" r="18" fill="#3A2E2A"/><circle cx="-9" cy="-70" r="5" fill="#8A7A70"/><circle cx="9" cy="-70" r="5" fill="#8A7A70"/>
    <path d="M-6 -80 Q-40 -170 -60 -200 M6 -80 Q40 -170 60 -200" fill="none" stroke="#3A2E2A" stroke-width="4"/><circle cx="-61" cy="-202" r="8" fill="#3A2E2A"/><circle cx="61" cy="-202" r="8" fill="#3A2E2A"/>`; }

/* ---------- a moth resting flat (top view), feathery feelers. origin = its middle ---------- */
const moth = (t = 0) => `<g transform="rotate(${n2(2 * Math.sin(t * 3))})"><path d="M0 -10 Q-70 -30 -110 40 Q-60 60 0 30z M0 -10 Q70 -30 110 40 Q60 60 0 30z" fill="url(#mothW)" stroke="#5E4632" stroke-width="4"/><path d="M-20 4 Q-60 0 -84 30 M20 4 Q60 0 84 30" fill="none" stroke="#5E4632" stroke-width="3" opacity=".6"/><circle cx="-52" cy="18" r="7" fill="#5E4632" opacity=".6"/><circle cx="52" cy="18" r="7" fill="#5E4632" opacity=".6"/>
  <ellipse cx="0" cy="12" rx="10" ry="30" fill="#7A5E44"/><circle cx="0" cy="-20" r="10" fill="#7A5E44"/><path d="M-4 -26 Q-24 -60 -40 -64 M4 -26 Q24 -60 40 -64" fill="none" stroke="#7A5E44" stroke-width="4"/>${[0, 1, 2, 3].map((i) => `<path d="M${n2(-10 - i * 8)} ${n2(-36 - i * 7)} l-8 4 M${n2(10 + i * 8)} ${n2(-36 - i * 7)} l8 4" stroke="#7A5E44" stroke-width="2"/>`).join("")}</g>`;

/* ---------- the pigeon (a rock pigeon), side view, facing right: grey feathers, a shiny green-and-purple neck, two dark wing bars, two pink legs ---------- */
function pigeon(o = {}) { const b = o.bob || 0;
  return `<ellipse cx="0" cy="4" rx="140" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-10 -60 L-20 -14 L-34 0 M-20 -14 L-6 0 M-20 -14 L-24 2 M30 -60 L36 -14 L22 0 M36 -14 L50 0 M36 -14 L34 2" fill="none" stroke="#E86A7A" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-190 -120 L-120 -100 L-110 -130z" fill="#5E667A"/><path d="M-190 -120 L-150 -110" stroke="#2A2E3A" stroke-width="10"/>
  <ellipse cx="0" cy="-100" rx="120" ry="64" fill="url(#pigG)"/><path d="M-120 -110 Q-40 -170 70 -130 Q20 -90 -120 -96z" fill="#9AA2B6" stroke="#6E7690" stroke-width="3"/><path d="M-50 -132 q30 -4 56 -10 M-40 -116 q30 -4 56 -10" fill="none" stroke="#2E3240" stroke-width="9" stroke-linecap="round"/>
  ${[0, 1, 2, 3].map((i) => `<path d="M${-80 + i * 30} -128 q14 8 26 0" fill="none" stroke="#6E7690" stroke-width="3" opacity=".7"/>`).join("")}
  <g transform="translate(0 ${n2(b)})"><path d="M60 -130 Q70 -186 104 -196 Q140 -192 138 -156 Q130 -116 96 -100z" fill="url(#pigN)"/><circle cx="118" cy="-200" r="30" fill="#6A7690"/><circle cx="110" cy="-212" r="12" fill="#fff" opacity=".12"/><circle cx="128" cy="-202" r="8" fill="#F28A2A"/><circle cx="129" cy="-203" r="3.5" fill="${P.ink}"/>
  <path d="M148 -196 L176 -188 L148 -182z" fill="#3A3A44"/><ellipse cx="150" cy="-196" rx="7" ry="5" fill="#F0EEE8"/></g>`; }
