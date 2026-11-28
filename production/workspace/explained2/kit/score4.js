// kit/score4.js: the FOUR-FACE score bar of the P4 videos (from P4 EP3, 28 Nov 2026). The teacher chose option A of the EP3 script's
// question 9: the in-video score matches Pet Buddy Quest's bar (journal 27 Nov 2026: "instead of VS buddies, put each of the characters in
// with their own scores"): YOU plus Pip, Momo and Basil, each with their own face and their own score, instead of "YOU vs BUDDIES". A buddy
// gets +1 when they pick the right card for the right reason; everyone starts the episode at 0; a 0 stays visible with no mark against it
// (positive language: no cross). GLITCH challenges in the game keep "YOU vs GLITCH"; EP1 and EP2 keep their old pill.
// Use (an episode's page loads this after lib.js and items_options.js; it replaces lib.js scoreboard(), so HUD() draws the new bar):
//   SCORE4.push([time, you, pip, momo, basil])      the totals from that time on (the scene that awards a point pushes one entry)
//   scoreboard4(t, x, y, s)                          the bar, its RIGHT edge at x, centred on y; s = scale (1 = 76 px tall at 1080p)
// Needs (load order): kit/style.js (T, P, the #drop filter, the gSun gradient), the episode's lib.js (TF, n2, pulse, SPR, scoreboard,
// itemsOf for the helmets) and spr/manifest.js with <who>_sit_closed; then this file; then the scenes. Nothing else.
// Optional: scoreboard4(t, x, y, s, { v: [you, pip, momo, basil] }) draws fixed numbers (a thumbnail, a still).
// The faces are the teacher's sitting paintings (spr <who>_sit_closed) cropped into a round chip, wearing their P4 items (helmets), the
// score a sun-yellow badge on the chip's lower right (the game's phone layout). The number that changes pops (a bump), as in the game.
window.SCORE4 = [[0, 0, 0, 0, 0]];
const S4FACE = { pip: [540, 230, 190], momo: [418, 222, 170], basil: [440, 232, 190] };   // the face's centre and radius in the sit painting (px)
function score4At(t) { let c = SCORE4[0]; const tb = [-9, -9, -9, -9]; for (const s of SCORE4) if (t >= s[0]) { for (let i = 0; i < 4; i++) if (s[i + 1] !== c[i + 1]) tb[i] = s[0]; c = s; } return { v: c.slice(1), tb }; }
function s4chip(who, t, r) { const [fx, fy, fr] = S4FACE[who], S = SPR[`${who}_sit_closed`]; if (!S) return ""; const k = r / fr, id = "s4" + who;
  const it = typeof itemsOf === "function" ? itemsOf(who, `${who}_sit_closed`, 1, {}) : "";
  return `<clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r + 5}" fill="${P[who] || "#888"}"/><circle r="${r}" fill="#FFF1D6"/>`
    + `<g clip-path="url(#${id})"><g transform="scale(${n2(k)}) translate(${-fx} ${-fy})"><use href="#s_${who}_sit_closed"/>${it}</g></g>`; }
function scoreboard4(t, x = 1888, y = 66, s = 1, o = {}) { const sc = score4At(t), v = o.v || sc.v, bump = (i) => 1 + .35 * pulse(t, sc.tb[i], .01, .3) * (sc.tb[i] > 0 ? 1 : 0);
  const H = 76, r = 28, gap = 92, youW = 150, W = youW + 3 * gap + 20, x0 = -W;
  let g = `<g filter="url(#drop)"><rect x="${x0}" y="${-H / 2}" width="${W}" height="${H}" rx="${H / 2}" fill="${P.ink}"/></g>`
    + `<rect x="${x0 + 8}" y="${-H / 2 + 8}" width="${youW - 6}" height="${H - 16}" rx="${(H - 16) / 2}" fill="url(#gSun)"/>` + T(x0 + 58, 11, "YOU", 30, P.ink, { ls: 2 })
    + TF(x0 + 116, 0, bump(0), `<rect x="-24" y="-24" width="48" height="48" rx="14" fill="${P.ink}"/>` + T(0, 15, v[0], 42, P.sun));
  ["pip", "momo", "basil"].forEach((who, i) => { const cx = x0 + youW + 30 + i * gap;
    g += TF(cx, 0, 1, s4chip(who, t, r)) + TF(cx + 26, 18, bump(i + 1), `<rect x="-17" y="-16" width="34" height="32" rx="10" fill="url(#gSun)" stroke="${P.ink}" stroke-width="4"/>` + T(0, 10, v[i + 1], 26, P.ink)); });
  return TF(x, y, s, g); }
if (typeof scoreboard === "function") scoreboard = (t) => scoreboard4(t);   // lib.js HUD() -> the four-face bar
