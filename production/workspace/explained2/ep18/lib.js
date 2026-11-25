// lib.js: the engine's helpers (from EP1, adapted for EP5: key words; EP8: the new pace, a new term holds 2.0 s; EP10 to EP18: their key words). Everything returns SVG strings and is a pure function of its arguments (a frame depends only on t).
// Needs kit/style.js (P, defs, T, pill, G, groundShadow, logoPill, hand, teddy, leaf ...), tl.js (TL) and spr/manifest.js (SPR).
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), lerp = (a, b, u) => a + (b - a) * u;
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const eo = (u) => 1 - Math.pow(1 - clamp(u), 3), ei = (u) => clamp(u) ** 3, eio = (u) => ss(0, 1, u);
const ramp = (t, t0, d = .35) => eo((t - t0) / d);                       // 0 -> 1, ease-out arrival
const spring = (t, t0, d = .55) => { const u = (t - t0) / d; return u <= 0 ? 0 : 1 - Math.exp(-7.5 * u) * Math.cos(8 * u); };   // pop with overshoot
const wob = (t, t0, d = .5) => { const u = (t - t0) / d; return u <= 0 ? 0 : Math.exp(-4 * u) * Math.cos(10 * u + .5); };       // settle wobble after a hit
const pulse = (t, t0, a = .07, d = .3) => { const u = t - t0; return u < -a ? 0 : u < 0 ? ss(-a, 0, u) : Math.exp(-u / d * 3); };
const hop = (t, t0, d = .34, h = 1) => { const u = (t - t0) / d; return u <= 0 || u >= 1 ? 0 : 4 * u * (1 - u) * h; };          // an arc: up and down
const n2 = (v) => Math.round(v * 10000) / 10000;   /* 4 decimals (teacher 24 Nov: slow zooms stepped "bit by bit like lag" when scale() was rounded to 0.01) */
const hash = (i, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
const rndm = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
const rg = (id, stops, cx = .5, cy = .5, r = .5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</radialGradient>`;
const OP = (o, inner) => o <= .003 ? "" : o >= .997 ? inner : `<g opacity="${n2(o)}">${inner}</g>`;
const TF = (x, y, s, inner, rot = 0, sy) => `<g transform="translate(${n2(x)} ${n2(y)})${rot ? ` rotate(${n2(rot)})` : ""} scale(${n2(s)}${sy !== undefined ? " " + n2(sy) : ""})">${inner}</g>`;
// camera: zoom z about (cx, cy), then pan; depth scales the move (far 0.2, mid 1, near 1.6)
const CAM = (inner, z = 1, cx = 960, cy = 540, depth = 1) => { const k = 1 + (z - 1) * depth; return `<g transform="translate(${n2(960 + (960 - cx) * (k - 1))} ${n2(540 + (540 - cy) * (k - 1))}) scale(${n2(k * 1000) / 1000}) translate(-960 -540)">${inner}</g>`; };

/* ---------- the timeline ---------- */
const LN = (id) => TL.lines[id], LT = (id) => TL.lines[id].t, LE = (id) => TL.lines[id].end, MK = (n) => TL.marks[n];
const SCN = {}; TL.scenes.forEach((s) => { SCN[s.name] = s; });
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9-]/g, "");
function W(id, word, nth = 0) { const L = TL.lines[id]; if (!L) { console.error("no line", id); return 0; } const hits = L.words.filter((x) => norm(x.w) === word); if (!hits.length) { console.error("no word", word, "in", id); return L.t; } return (hits[nth] || hits[0]).a; }
function WE(id, word, nth = 0) { const L = TL.lines[id], hits = L.words.filter((x) => norm(x.w) === word); return hits.length ? (hits[nth] || hits[0]).b : L.end; }
const said = (id, t) => TL.lines[id].words.filter((w) => w.a <= t).length;    // how many words of the line have started
// the line a character is speaking at t (or null)
function speaking(who, t) { for (const id of TL.order) { const L = TL.lines[id]; if (L.who === who && t >= L.t - .04 && t < L.end + .05) return L; if (L.who === "chant" && who !== "heart" && t >= L.t && t < L.t + L.dur) return L; } return null; }
function mouthOf(who, t) { const L = speaking(who, t); if (!L) return 0; const tr = L.who === "chant" ? L.tracks[who] : L.mouth; const i = Math.floor((t - L.t) * 30 + 1 + 1e-6); return tr[i] || 0; }
function loud(who, t) { const L = speaking(who, t); if (!L || !L.open) return 0; const i = Math.floor((t - L.t) * 30 + 1e-6); return L.open[i] || 0; }
function nodOf(who, t) { const L = speaking(who, t); if (!L) return 0; let n = 0; if (L.who === "chant") { for (const w of L.words) n += pulse(t, w.a, .06, .22) * .5; return Math.min(n, 1.2); } for (const s of L.stress) n += pulse(t, s); return Math.min(n, 1.2); }

const PART = TL.PART || 1, HAS = (id) => !!TL.lines[id];
/* ---------- text ---------- */
const _cv = document.createElement("canvas").getContext("2d");
function tw(s, size, w = 700, fam = "Fredoka", ls = 0) { _cv.font = `${w} ${size}px "${fam}"`; return _cv.measureText(s).width + ls * s.length; }
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
// a soft pill sized to its text
function tpill(x, y, text, size = 32, fill = P.ink, ink = "#fff", o = {}) { const w = tw(text, size, o.w || 600, "Fredoka", o.ls || 0) + size * 1.5, h = size * 1.75;
  return `<g transform="translate(${n2(x)} ${n2(y)})" ${o.nosh ? "" : 'filter="url(#dropS)"'}><rect x="${n2(-w / 2)}" y="${-h / 2}" width="${n2(w)}" height="${h}" rx="${h / 2}" fill="${fill}" ${o.fo ? `opacity="${o.fo}"` : ""}/><rect x="${n2(-w / 2 + 6)}" y="${-h / 2 + 4}" width="${n2(w - 12)}" height="${h * .4}" rx="${h * .2}" fill="#fff" opacity=".14"/></g>` + T(n2(x), n2(y + size * .35), esc(text), size, ink, { w: o.w || 600, ls: o.ls }); }
// a label joined to its part by one plain line that touches it (style 7.8)
function label(x, y, text, px, py, size = 30) { return `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="6" fill="#fff"/>` + tpill(x, y, text, size, "#fff", P.ink); }
// location / tag pill: ink pill, sun dot, white then sun text
function lowerPill(x, y, a, b) { const wa = tw(a, 30, 600), wb = b ? tw(b, 30, 600) + 14 : 0, w = wa + wb + 86;
  return `<g filter="url(#dropS)"><rect x="${x}" y="${y}" width="${n2(w)}" height="62" rx="31" fill="${P.ink}" opacity=".9"/></g><circle cx="${x + 32}" cy="${y + 31}" r="9" fill="${P.sun}"/>` + T(x + 54, y + 41, `${esc(a)}${b ? `<tspan fill="${P.sun}" dx="14">${esc(b)}</tspan>` : ""}`, 30, "#fff", { a: "start", w: 600 }); }
// "speeded up" tag (time-lapse shots)
const speeded = (t, t0, t1, x = 1700, y = 1010) => OP(ramp(t, t0, .25) * (1 - ramp(t, t1, .25)), `<g transform="translate(${x} ${y})"><rect x="-128" y="-27" width="256" height="54" rx="27" fill="${P.ink}" opacity=".85"/><path d="M-98 -11 l14 11 l-14 11z M-82 -11 l14 11 l-14 11z" fill="${P.sun}"/>${T(18, 11, "speeded up", 30, "#fff", { w: 600 })}</g>`);

/* ---------- the buddies: the teacher's painted art as cut-out sprites ---------- */
// each buddy's SIGNATURE COLOUR (the teacher, 20 Nov: bright and saturated, not pastel; never green or blue: those mean LIVING / NON-LIVING)
P.pip = "#8B5CF6"; P.basil = "#14B8A6"; P.momo = "#FB7158";
const AURA = { pip: P.pip, basil: P.basil, momo: P.momo }, TINT = { pip: "#EDE4FF", basil: "#D5F7F2", momo: "#FFE3DC" }, BNAME = { pip: "Pip", basil: "Basil", momo: "Momo" };
// a small name tag: the name in white on the buddy's colour
const nameTag = (who, size = 32) => { const w = tw(BNAME[who], size, 700) + size * 1.5, h = size * 1.5; return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${P[who]}"/><rect x="${n2(-w / 2 + 3)}" y="${n2(-h / 2 + 3)}" width="${n2(w - 6)}" height="${n2(h - 6)}" rx="${n2(h / 2 - 3)}" fill="none" stroke="#fff" stroke-width="3" opacity=".85"/></g>` + T(0, n2(size * .35), BNAME[who], size, "#fff"); };
// EP15 v2 cast (prep_sprites.py): Momo v2 and Basil v2 have every pose (Basil also worried and laughing), so the old stand-ins are gone.
// Only "worried" (during a countdown, before the reveal) has no painting for Pip and Momo yet: it shows their thinking face.
const TRIAL = true;   // EP14 trial (teacher, 22 Nov): no aura discs; the buddies stand in the scene with a contact shadow
const POSE_SUB = { pip: { worried: "thinking" }, momo: { worried: "thinking" } };
const DISC_DX = { pip: -.06, basil: -.10, momo: -.08 };
/* v3 (teacher, 22 Nov: "no buddy ever frozen"): every buddy on screen reacts to every sentence someone else says. At each sentence start
   (Heart's or another buddy's) the buddy swaps to a reaction pose (squash, hard cut, overshoot, hop: never a cross-fade) chosen from what is
   said (a question: thinking; a "no / break / not": oops or surprised; an exclamation: cheer or surprised; else pointing / arms crossed or a
   nod-hop), holds it about 1.4 s, then pops back to the sitting (talking) sprite well before its own line. Explicit scene poses win: the
   auto reaction only runs while the scene's own pose is "sit". The three buddies are staggered so they never all pop on the same frame. */
const REACT_DLY = { pip: .12, basil: .27, momo: .42 };
let _trig = null;
function reactTriggers() { if (_trig) return _trig; const out = [];
  for (const id of TL.order) { const L = TL.lines[id]; if (!L || L.who === "chant" || !L.words || !L.words.length) continue; let st = true, cur = null;
    L.words.forEach((w, i) => { if (st) { cur = { t: w.a, who: L.who, id, txt: "" }; out.push(cur); } cur.txt += (cur.txt ? " " : "") + w.w; st = /[.!?]$/.test(w.w); }); }
  out.sort((a, b) => a.t - b.t); out.forEach((o, i) => { o.k = i; }); return (_trig = out); }
let _own = {};
function nextOwn(who, t) { const a = _own[who] || (_own[who] = TL.order.map((id) => TL.lines[id]).filter((L) => L && (L.who === who || (L.who === "chant"))).map((L) => L.t).sort((x, y) => x - y)); for (const x of a) if (x > t) return x; return 1e9; }
/* teacher, 22 Nov: "the pet buddies reactions [must] be logical and not random. The wrong answer should show shy face, whereas the
   correct one should be confident/smile. celebrate with hands high up only when achieved/learnt something new". */
let _learn = null;
function learnAt(t) { if (!_learn) { _learn = [];   // moments something new is learnt: a key word lands, a cycle/living tag lands, a mistake is fixed, "Now you know!"
    for (const [k, v] of Object.entries(TL.marks || {})) if (/^(kw_|v_|jfrog$|jmosq$|jagain$|rewrite$|plant$)/.test(k))   /* EP18: a key word, a verdict, the raindrop's last stops (three stages, four stages), the egg back at an egg, Momo's homework rewritten, the lime plants back (the loop goes on) */ _learn.push([v - .4, v + 4]);
    for (const s of TL.scenes || []) if (s.name === "nyk" || s.name === "kwrecap") _learn.push([s.t0, s.t1]); }
  return _learn.some(([a, b]) => t >= a && t < b); }
// EP18 (script section 3, OUTCOMES): Part 1 Round 1 (EP17's dare: answer 2, different) Pip right; Momo (1, the same) wrong at ansglow;
// Basil picked 2 for the WRONG reason (size): no point, never confident: he listens at ansglow and is shy at Heart's k804 ("Basil picked
// two, but size does not tell us about a life cycle"). HOLD ON! (Pip: frog and grasshopper exactly the same) Basil, Momo right / Pip wrong
// at k1003. Part 2 Round 1 (which came first? 3, neither) Pip, Momo right / Basil (1, the egg) wrong at ansglow; Showdown (Momo's homework,
// line 3) Basil, Pip right / Momo wrong at Basil's reveal d804b.
const OUTCOMES = (PART === 1 ? [{ at: "m:ansglow", right: ["pip"], wrong: ["momo"] }, { at: "l:k804", right: [], wrong: ["basil"] }, { at: "l:k1003", right: ["basil", "momo"], wrong: ["pip"] }]
  : [{ at: "m:ansglow", right: ["pip", "momo"], wrong: ["basil"] }, { at: "l:d804b", right: ["basil", "pip"], wrong: ["momo"] }]);
function outcomeAt(who, t) { for (const o of OUTCOMES) { const [k, id] = o.at.split(":"), t0 = k === "m" ? MK(id) : (HAS(id) ? LT(id) : undefined); if (t0 === undefined || t < t0 || t > t0 + 4) continue;
    if (o.wrong.includes(who)) return { t0, pose: "oops" };   // shy: paw on the head, a sheepish smile
    if (o.right.includes(who)) return { t0, pose: SPR[`${who}_arms_crossed`] ? "arms_crossed" : "sit" }; }   // confident smile
  return null; }
function reactPose(who, txt, k) {   // teacher, 22 Nov: "the pet buddies movement are really random in some scene". A pose swap now only
  // answers something in the line: a question -> thinking; a problem word -> oops/surprised; a celebration -> cheer. Anything else: a nod.
  // EP15 (teacher, 23 Nov: "every reaction must have a reason"): one job per pose. The only automatic pose left is "thinking", right after a
  // real question; the viewer prompts ("Are you ready?", "Three fingers?", "One finger or more?") are not questions to think about.
  // Surprise, shyness, confidence and cheers are staged by the scenes (and OUTCOMES), never guessed from words.
  const q = /\?$/.test(txt) && !/^(are you ready|ready|arms crossed|one finger|two fingers|three fingers|more than one|show me)/i.test(txt.trim()) && txt.split(/\s+/).length >= 4;
  return q ? "thinking" : null; }
// only ONE listener answers a line with a pose (they take turns); the other nods; and no buddy swaps pose more than once in 6 s
function reactChosen(g) { const L = ["pip", "basil", "momo"].filter((w) => w !== g.who); return L[g.k % L.length]; }
function reactPoseAt(tr, i, who) { const g = tr[i]; if (g.who === who || reactChosen(g) !== who) return null; const ps = reactPose(who, g.txt, g.k); if (!ps || (ps === "cheer" && !learnAt(g.t))) return null;
  for (let j = i - 1; j >= 0 && g.t - tr[j].t < 6; j--) { const h = tr[j]; if (h.who !== who && reactChosen(h) === who && reactPose(who, h.txt, h.k)) return null; } return ps; }
// -> { t0, t1, pose (null = a nod-hop) } of the reaction running at t, or null
function reactAt(who, t, tsw, nxt, o) { const S = window._S; if (!S || o.noreact || o.still) return null; const T0 = Math.max(S.t0 - .05, o.react0 !== undefined ? o.react0 : o.in !== undefined ? o.in + .6 : -9), d = REACT_DLY[who] || .2;
  const tr = reactTriggers(); let i = -1; for (let j = tr.length - 1; j >= 0; j--) { if (tr[j].t + d <= t) { i = j; break; } } if (i < 0) return null;
  for (; i >= 0; i--) { const g = tr[i]; if (g.t < T0) return null; if (g.who === who) continue; const t0 = g.t + d; if (t0 < tsw + .7) return null;
    let nt = 1e9; for (let j = i + 1; j < tr.length; j++) if (tr[j].who !== who) { nt = tr[j].t + d; break; }
    const t1 = Math.min(t0 + 1.45, nt - .08, nextOwn(who, g.t) - .3, nxt - .2); if (t1 - t0 < .55) { if (t < t0 + .4) return { t0, t1: t0 + .4, pose: null }; continue; }
    const pose = reactPoseAt(tr, i, who); return { t0, t1, pose: pose && SPR[`${who}_${pose}`] ? pose : null, txt: g.txt }; }
  return null; }
function blinkAt(who, t) { const per = 3.9, ph = { pip: .9, basil: 2.1, momo: 3.0 }[who]; const k = Math.floor((t + ph) / per), tb = k * per - ph + hash(k, who.length) * 1.4; return t >= tb && t < tb + .1; }
/* buddy(who, x, y, h, t, o): feet at (x, y), sitting body height h.
   o.poses = [[time, pose], ...] (pose swaps POP with a squash and a stretch, never a cross-fade; default pose "sit")
   o.in = pop-in time; o.out = pop-out time; o.flip; o.aura (disc); o.rim; o.jump = [[t, height]] hops; o.rock = side-to-side rock amp (deg)
   o.mouth (0..2) / o.eyes "shut": a yawn or a doze in the sit pose (EP14); o.look = lean in degrees; o.k = extra scale; o.shadow = false to hide; o.still = no idle */
const SIZE_K = { basil: .94 };   // teacher, 23 Nov: keep the three in proportion. EP15 v2 cast: Basil v2 is slimmer than the old Basil; at .94 his painted area (tail included) equals Pip's and Momo's and his crest sits level with Pip's head (qa/size_check.jpg)
/* teacher, 25 Nov 2026 (EP18 P2 1:45): "There is a glitch in the animations, where pet buddies appear and reappear again for this
   particular scene." SERIES_FORMAT: a buddy is never shown twice or half-faded in a scene change. A melt (the old scene's last frame
   fading over the new one: melt() and lizReveal's o.from) draws that old frame WITHOUT its buddies (capBuddies notes where each one
   stood). A buddy both scenes have GLIDES from its old spot and size to its new ones while the background melts (no second pop-in, no
   pose pop when the pose is the same, its name tag as before); a buddy only the old scene has pops out where it stood (opaque, the usual
   .2 s shrink). While the melt runs, the new scene's buddies are drawn ON TOP of the fading old frame (never washed out under it). QA: ../qa/buddy_ghost_scan.js steps through every scene change and lists any frame with a buddy twice or half-faded. */
let _BCAP = null, _BDRAW = false, _BALL = null; const _MELTM = {};
// f() with buddy() noting instead of drawing -> { svg, bud: { who: { x, y, h, o, t, hk, name } } } (the biggest copy of each buddy)
function capBuddies(f) { const prev = _BCAP, pall = _BALL, nh = window._noHud, keep = [window._BP, window._SAID, window._BUBAT]; _BCAP = {}; _BALL = []; let svg = "", bud, all;
  try { svg = f(); } finally { bud = _BCAP; all = _BALL; _BCAP = prev; _BALL = pall; window._noHud = nh; [window._BP, window._SAID, window._BUBAT] = keep; } return { svg, bud, all }; }
// the melt a scene opens with, { from, d } (found by a dry run of its first frame: melt() notes itself), or null
function meltOf(s) { const k = "@" + s.name; if (!(k in _MELTM)) { _MELTM[k] = null; if (SC[s.name]) capBuddies(() => SC[s.name](s.t0 + .02, s)); } return _MELTM[k]; }
// the old scene's last frame as a melt draws it (no HUD), its buddies taken out
function meltFrame(name) { return _MELTM["F" + name] || (_MELTM["F" + name] = capBuddies(() => { window._noHud = true; return SC[name](SCN[name].t1 - .04, SCN[name]); })); }
// the buddies a scene draws at time t
function budsAt(s, t) { const k = s.name + "@" + t.toFixed(3); return _MELTM[k] || (_MELTM[k] = capBuddies(() => SC[s.name](t, s)).bud); }
// melt(t, s, name, d): the old scene's last frame fades out over d s (buddies glide or pop out, never fade)
function meltScene(t, s, name, d = .4) { const k = "@" + s.name; if (!_MELTM[k]) _MELTM[k] = { from: name, d }; if (_BCAP) return "";
  const a = 1 - clamp((t - s.t0) / d); if (a <= .01) return ""; const F = meltFrame(name), now = capBuddies(() => SC[s.name](t, s)).all; let top = "";
  _BDRAW = true; try { for (const c of now) top += buddy(...c); } finally { _BDRAW = false; }   // the new scene's buddies, above the old frame
  return OP(a, F.svg) + meltOut(F.bud, budsAt(s, s.t0 + d), t, s.t0) + top; }
// lizReveal's o.from: the scene before fades out over .45 s, the same way
function meltFrom(t, s, f, a) { if (_BCAP) return ""; const F = _MELTM["L" + s.name] || (_MELTM["L" + s.name] = capBuddies(f)); return OP(a, F.svg) + meltOut(F.bud, budsAt(s, s.t0 + .45), t, s.t0); }
// the old scene's buddies the new one does not have: popped out where they stood
function meltOut(old, now, t, t0) { const k = 1 - eo((t - t0) / .2); if (k < .02) return ""; let out = "";
  for (const [who, c] of Object.entries(old)) if (!now[who] || c.o.peek || now[who].o.peek) out += buddy0(who, c.x, c.y, c.h, c.t, { ...c.o, k: (c.o.k || 1) * k }); return out; }
function buddy(who, x, y, h, t, o = {}) {
  if (_BCAP) { _BALL.push([who, x, y, h, t, o]); const P0 = window._POSE; window._POSE = []; let r; try { buddy0(who, x, y, h, t, o); r = window._POSE[0]; } finally { window._POSE = P0; }
    if (r && r.h > 2) { const c = _BCAP[who]; if (!c || r.h > c.hk) _BCAP[who] = { x, y, h, o, t, hk: r.h, name: r.name }; } return ""; }
  const S = window._S, M = S && !o.peek && t >= S.t0 && t < S.t1 ? meltOf(S) : null;
  if (M && !_BDRAW && t < S.t0 + M.d) return "";   // drawn by meltScene, above the fading old frame
  if (M) { const a = meltFrame(M.from).bud[who], b = budsAt(S, S.t0 + M.d)[who];
    if (a && b && !a.o.peek) { const u = eio((t - S.t0) / M.d), o2 = { ...o, in: S.t0 - 3, tagIn: o.in, react0: o.in !== undefined ? o.in + .6 : undefined };
      const pz = (n) => n.startsWith(who + "_sit") ? "sit" : n; const P0 = window._POSE; window._POSE = []; let r; try { buddy0(who, x, y, h, t, o2); r = window._POSE[0]; } finally { window._POSE = P0; }
      if (r && pz(r.name) === pz(a.name)) o2.calmTo = S.t0 + M.d;   // the same pose on both sides: no pose pop at the change
      if (u < 1) { o2.flip = u < .5 ? a.o.flip : o.flip; return buddy0(who, lerp(a.x, x, u), lerp(a.y, y, u), lerp(a.h, h, u), t, o2); }
      return buddy0(who, x, y, h, t, o2); } }
  return buddy0(who, x, y, h, t, o); }
function buddy0(who, x, y, h, t, o = {}) { h *= SIZE_K[who] || 1;
  if (location.search.includes("hide=" + who)) return "";   // thumbnails only
  let pose = o.pose || "sit", tsw = -99; const PS = (o.poses || []).slice().sort((a, b) => a[0] - b[0]);   // EP15: poses in time order
  for (const [tp, p] of PS) if (t >= tp) { pose = p; tsw = tp; }
  let why = o.pose ? "scene" : "scene";   // EP15 QA: where the pose came from (qa/buddy_faces, pose_audit.js)
  let nxt = 1e9; for (const [tp] of PS) if (tp > t) { nxt = tp; break; }
  // teacher, 22 Nov (EP14 P1 3:30): "both pip and basil mouth not moving". Pose paintings have no mouths, so a buddy SPEAKING always
  // shows its talking sprite (lip-sync + blinks), with the usual pose-swap pop at the start of the line; the pose returns after the line.
  { const spk = o.keepPose ? null : speaking(who, t);
    if (spk && pose !== "sit" && pose !== "back") { if (spk.t > tsw) tsw = spk.t; pose = "sit"; nxt = Math.min(nxt, spk.end + .05); }
    else if (!spk && pose !== "sit" && pose !== "back" && !o.keepPose) { for (const id of TL.order) { const L = TL.lines[id];   // back to the pose: pop again
      if (L.who === who && L.end + .05 > tsw && L.end + .05 <= t && t - L.end < 1.5) tsw = L.end + .05; } } }
  if (!speaking(who, t) && !o.keepPose) { const oc = outcomeAt(who, t);
    if (oc) { pose = oc.pose; why = "outcome"; if (oc.t0 > tsw) tsw = oc.t0; nxt = Math.min(nxt, oc.t0 + 4); }
    else if (pose === "cheer" && !learnAt(t) && !o.achieved) pose = "sit"; }   // hands up only when something is learnt or achieved (EP15: never a stand-in arms-crossed)
  let nodH = 0;
  if (pose === "sit" || pose === "back") { const R = reactAt(who, t, tsw, nxt, o);   // v3: never frozen
    if (R) { if (R.pose && pose === "sit") { if (t < R.t1) { pose = R.pose; why = "react:" + (R.txt || ""); tsw = R.t0; nxt = R.t1; } else if (t < R.t1 + .5) tsw = R.t1; }
      else if (!R.pose && t < R.t0 + .5) nodH = hop(t, R.t0, .36, 1); } }
  let k = o.k || 1; if (o.in !== undefined) { if (t < o.in) return ""; k *= spring(t, o.in, .5); } if (o.out !== undefined && t > o.out) { k *= 1 - eo((t - o.out) / .2); if (k < .02) return ""; }
  const ph = { pip: .9, basil: 0, momo: 1.9 }[who];
  let sy = 1, sx = 1, rot = 0, lift = 0;
  if (!o.still) { const br = Math.sin(2 * Math.PI * (t + ph) / 3); sy *= 1 + .012 * br; sx *= 1 - .004 * br; rot += .35 * Math.sin(2 * Math.PI * (t + ph) / 4.6); }
  if (o.in !== undefined) { const w = wob(t, o.in, .5); sy *= 1 + .09 * w; sx *= 1 - .07 * w; }
  // pose swap, as in the approved pose test: 3 frames of squash on the old picture, a hard cut to the new picture stretched tall,
  // an overshoot that settles in about 0.3 s, a tiny hop, a ring of sparkles and two dust puffs. Never a cross-fade.
  const ant = ss(nxt - .1, nxt, t); sy *= 1 - .10 * ant; sx *= 1 + .08 * ant; let fx = "";
  if (tsw > -90 && !(o.in !== undefined && Math.abs(tsw - o.in) < .3) && !(o.calmTo !== undefined && tsw <= o.calmTo)) { const u = t - tsw, w = Math.exp(-u * 9) * Math.cos(u * 23); sy *= 1 + .13 * w; sx *= 1 - .09 * w; lift -= 15 * Math.sin(Math.PI * clamp(u / .22)) * (h / 380);
    if (u >= 0 && u < .4 && !o.nofx) { const e = 1 - Math.pow(1 - u / .4, 2), cy = y - h * .52;
      for (let i = 0; i < 6; i++) { const an = (-90 + (i - 2.5) * 44 + 8 * (who.length % 3)) * Math.PI / 180, r = h * (.5 + .22 * e), sc = (i % 2 ? .55 : .8) * Math.pow(Math.sin(Math.PI * Math.min(u / .4, 1)), .6) * h / 380; fx += `<g transform="translate(${n2(x + Math.cos(an) * r * 1.05)} ${n2(cy + Math.sin(an) * r * .92)}) scale(${n2(sc)}) rotate(${n2(40 * u)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF3DC"/></g>`; }
      for (const sg of [-1, 1]) fx += `<ellipse cx="${n2(x + sg * h * (.3 + .22 * e))}" cy="${n2(y + 4 - 10 * e)}" rx="${n2((26 + 30 * e) * h / 380)}" ry="${n2((12 + 12 * e) * h / 380)}" fill="#DDD3FF" opacity="${n2(.42 * (1 - e))}" filter="url(#b4)"/>`; }
    // cheering: little hops with a squash on each landing; waving: a side-to-side rock with the whole body
    if (pose === "cheer" && !o.nohop) { const e = ss(.1, .22, u) * (1 - ss(1.9, 2.3, u)), sA = Math.abs(Math.sin(Math.PI * 2.6 * (u - .1))); lift -= 24 * sA * e * (h / 380); const q2 = (.05 * Math.pow(1 - sA, 3) - .03 * sA) * e; sy *= 1 - q2; sx *= 1 + .8 * q2; rot += 1.6 * Math.sin(Math.PI * 2.6 * (u - .1)) * e; }
    if (pose === "waving" || (who === "basil" && o.wave && pose === "cheer")) { const e = ss(.2, .4, u) * (1 - ss(1.9, 2.3, u)), sA = Math.sin(2 * Math.PI * 2.1 * u); rot += 4.6 * sA * e; sy *= 1 - .02 * Math.abs(sA) * e; } }
  const nod = nodOf(who, t), q = (pose === "sit" ? .016 : .022) * nod; sy *= 1 - q; sx *= 1 + .8 * q; rot += 1.1 * nod * (o.flip ? -1 : 1); if (pose !== "sit") lift -= 5 * nod;
  for (const [tj, hj] of o.jump || []) { lift -= hop(t, tj, .36) * hj; const a = ss(tj - .12, tj, t) * (t < tj ? 1 : 0); sy *= 1 - .08 * a; sx *= 1 + .06 * a; const w = wob(t, tj + .36, .35); if (t > tj + .36) { sy *= 1 - .08 * w; sx *= 1 + .06 * w; } }
  if (o.rock) rot += o.rock * Math.sin(2 * Math.PI * t / .7);
  let twk = 1; for (const tw0 of o.twirl || []) { const u = clamp((t - tw0) / .7); if (u > 0 && u < 1) { twk = Math.cos(2 * Math.PI * eio(u)); lift -= 18 * Math.sin(Math.PI * u) * (h / 380); } }   // a little twirl (EP14 Momo, "I have my colours now!")
  if (nodH) { lift -= nodH * h * .05; rot += 3 * nodH * (o.flip ? -1 : 1); sy *= 1 + .03 * nodH; }
  rot += o.look || 0;
  let name;
  if (pose === "sit") { const m = ["closed", "half", "wide"][o.mouth !== undefined && !speaking(who, t) ? o.mouth : mouthOf(who, t)], b = o.eyes === "shut" || blinkAt(who, t); name = `${who}_sit_` + (b ? (m === "closed" ? "blink" : m + "_blink") : m); }
  else name = `${who}_${POSE_SUB[who] && POSE_SUB[who][pose] && !SPR[`${who}_${pose}`] ? POSE_SUB[who][pose] : pose}`;
  const S = SPR[name] || SPR[`${who}_sit_closed`]; if (!SPR[name]) name = `${who}_sit_closed`;
  const s0 = h / S.bh * k, fl = o.flip ? -1 : 1;
  if (window._POSE) window._POSE.push({ who, name, x, y: y + lift, h: h * k, peek: !!o.peek, why });   // EP15 QA (qa/buddy_faces): which face is on screen, where
  let out = "";
  if (o.tag !== false || o.peek) (window._BP = window._BP || {})[who] = { x, y, h: h * k, flip: !!o.flip, peek: !!o.peek };
  if (o.aura && !TRIAL) { const R = h * .62 * Math.min(1, k), cx = x + DISC_DX[who] * h * fl; out += `<circle cx="${n2(cx)}" cy="${n2(y - h * .46)}" r="${n2(R)}" fill="${AURA[who]}" opacity="${o.auraO || .9}"/><circle cx="${n2(cx)}" cy="${n2(y - h * .46)}" r="${n2(R)}" fill="url(#gSpot)"/>`; }
  if (o.shadow !== false) out += `<ellipse cx="${n2(x)}" cy="${n2(y - h * .01)}" rx="${n2(h * .36 * sx * k * (1 + lift / 400))}" ry="${n2(h * .06 * k)}" fill="${P.ink}" opacity="${n2(.3 * (1 + lift / 200))}" filter="url(#b4)"/>`;
  out += `<g transform="translate(${n2(x)} ${n2(y + lift)}) rotate(${n2(rot)}) scale(${n2(s0 * sx * twk * fl * 1000) / 1000} ${n2(s0 * sy * 1000) / 1000}) translate(${-S.ax} ${-S.ay})" ${o.rim === false ? "" : `filter="url(#${o.rim || "rimB"})"`}><use href="#s_${name}"/></g>`;
  if (o.tag !== false) { const sp = speaking(who, t), tI = o.tagIn !== undefined ? o.tagIn : o.in, a = (tI !== undefined ? spring(t, tI + .15, .4) * (1 - ss(tI + 2.4, tI + 2.7, t)) : 0), b = sp ? spring(t, sp.t - .04, .35) : 0, kt = Math.max(a, b) * Math.min(1, k);
    if (kt > .03) { const size = clamp(h * .115, 26, 40); out += TF(x, Math.min(y + 4, 1080 - size * .95), kt, nameTag(who, size)); } }
  return out + fx;
}

/* v3 (teacher, 22 Nov: "this does not give me the 'hard knock' vibe… make use of Pip, Momo or Basil, showing an angry / shocked face"):
   every impact is FELT. jolt(t, t0, a) -> [dx, dy] a quick camera shake (a few frames); impactFX = a white flash, a cartoon burst with its
   word ("BONK!", "CLANG!", "THUD!") at the contact point, speed lines; faceCam = a buddy's face popping in big, in a round frame with the
   buddy's colour, reacting (poses swap with the usual pop). */
const jolt = (t, t0, a = 26) => { const u = t - t0; if (u < 0 || u > .5) return [0, 0]; const k = Math.exp(-u * 8); return [n2(a * k * Math.sin(u * 72)), n2(a * .7 * k * Math.cos(u * 57))]; };
const JOLT = (t, times, inner, a) => { let dx = 0, dy = 0; for (const t0 of times) { const [x, y] = jolt(t, t0, a); dx += x; dy += y; } return dx || dy ? `<g transform="translate(${dx} ${dy})">${inner}</g>` : inner; };
function impactFX(t, t0, x, y, word = "BONK!", o = {}) { const u = t - t0, d = o.d || .95; if (u < -.02 || u > d) return ""; const sc = o.s || 1, k = lerp(.4, 1, eo(u / .1)) * (1 + .08 * wob(t, t0 + .1, .35)), fade = 1 - ss(t0 + d - .3, t0 + d, t);
  let pts = ""; for (let i = 0; i < 24; i++) { const r = i % 2 ? 92 : 170 + 26 * hash(i, 5), an = i * Math.PI / 12 + .1; pts += `${n2(Math.cos(an) * r)},${n2(Math.sin(an) * r * .78)} `; }
  let lines = ""; for (let i = 0; i < 10; i++) { const an = i * Math.PI / 5 + .3, r0 = 200 + 160 * eo(u / .35), r1 = r0 + 90 * (1 - eo(u / .5)); lines += `<path d="M${n2(Math.cos(an) * r0)} ${n2(Math.sin(an) * r0 * .78)} L${n2(Math.cos(an) * r1)} ${n2(Math.sin(an) * r1 * .78)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`; }
  const flash = o.flash === false ? "" : `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.55 * pulse(t, t0 + .01, .01, .22))}"/>`;
  return flash + OP(fade, `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(k * sc)}) rotate(${o.rot === undefined ? -8 : o.rot})">${lines}<polygon points="${pts}" fill="${o.col || P.sun}" stroke="${P.ink}" stroke-width="10" stroke-linejoin="round"/>
    <text x="0" y="${n2(o.size ? o.size * .36 : 26)}" font-family="Fredoka" font-weight="700" font-size="${o.size || 74}" text-anchor="middle" letter-spacing="2" fill="#fff" stroke="${P.ink}" stroke-width="14" stroke-linejoin="round" paint-order="stroke">${word}</text></g>`); }
// a buddy's face close-up, popping in at t0 and out at t1, in a round frame (x, y = centre, r = radius). poses = [[t, pose], ...]
function faceCam(who, t, t0, t1, x, y, r, poses, o = {}) { if (t < t0 - .01 || t > t1 + .3) return ""; const k = spring(t, t0, .45) * (1 - ei((t - t1) / .25)); if (k < .02) return "";
  const h = r * 3.1, id = "fc" + who + Math.round(x) + Math.round(y);
  return `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(k)}) rotate(${o.rot || 0})"><g filter="url(#drop)"><circle r="${r + 12}" fill="${P[who]}"/></g><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="${TINT[who]}"/>
    <g clip-path="url(#${id})">${buddy(who, (o.dx || 0) * r, h * .93 - r * .25, h, t, { poses, tag: false, shadow: false, flip: o.flip, nofx: true, noreact: !!o.noreact })}</g><circle r="${r}" fill="none" stroke="#fff" stroke-width="6" opacity=".9"/></g>`; }
/* ---------- speech bubble: white pill, Fredoka 600; a ✗ chip at the START for an idea that is not right ---------- */
function bubble(x, y, lines, t, t0, t1, o = {}) {
  if (t < t0 || t > t1 + .25) return ""; const size = o.size || 40, k = spring(t, t0, .4) * (1 - eo((t - t1) / .2));
  const w = Math.max(...lines.map((l) => tw(l, size, 600))) + 70 + (o.x ? 64 : 0), h = lines.length * size * 1.22 + 40, tail = o.tail === undefined ? 0 : o.tail, td = o.down === false ? -1 : 1;
  const col = o.col; let s = `<g filter="url(#dropS)">${col ? `<path d="M${tail - 26} ${td * (h / 2 - 2)} L${tail + (o.tdx || 0)} ${td * (h / 2 + 44)} L${tail + 26} ${td * (h / 2 - 2)}z" fill="${col}"/><rect x="${n2(-w / 2 - 7)}" y="${-h / 2 - 7}" width="${n2(w + 14)}" height="${h + 14}" rx="${Math.min(h / 2, 44) + 7}" fill="${col}"/>` : ""}<rect x="${n2(-w / 2)}" y="${-h / 2}" width="${n2(w)}" height="${h}" rx="${Math.min(h / 2, 44)}" fill="#FFF8EA"/>${col ? "" : `<path d="M${tail - 20} ${td * (h / 2 - 3)} L${tail + (o.tdx || 0)} ${td * (h / 2 + 34)} L${tail + 20} ${td * (h / 2 - 3)}z" fill="#FFF8EA"/>`}</g>`;
  const tx0 = o.x ? 32 : 0;
  lines.forEach((l, i) => { let h2 = esc(l); const m = i === 0 && o.pick !== false && /^(One, water[.!]|Two, food[.!]|Three, air[.!])/.exec(l);
    if (m) h2 = `<tspan fill="${m[1][1] === "n" ? P.blueDeep : m[1][1] === "w" ? P.orangeDeep : "#4E93B4"}" font-weight="700">${m[1]}</tspan>` + esc(l.slice(m[1].length));
    s += T(tx0, (i - (lines.length - 1) / 2) * size * 1.22 + size * .35, h2, size, P.ink, { w: 600 }); });
  if (o.x) s += `<g transform="translate(${n2(-w / 2 + 46)} 0)"><circle r="27" fill="${P.paper}" stroke="${P.ink}" stroke-width="3" opacity=".95"/><path d="M-11 -11 L11 11 M11 -11 L-11 11" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/></g>`;
  return TF(x, y, k, s);
}
// the sentences of a line as bubble pages: each sentence shows while it is said
function sentPages(id) { const L = TL.lines[id], pages = []; let cur = [], t0 = L.t; L.words.forEach((w, i) => { if (!cur.length) t0 = w.a; cur.push(w.w); if (/[.!?]$/.test(w.w) || i === L.words.length - 1) { pages.push({ text: cur.join(" "), t0, t1: w.b }); cur = []; } }); pages.forEach((p, i) => { p.t1 = pages[i + 1] ? pages[i + 1].t0 - .02 : L.end + .45; }); return pages; }
function wrap(text, size, maxW, wgt = 600, fam = "Fredoka") { const out = []; let cur = ""; for (const w of text.split(" ")) { const tr = cur ? cur + " " + w : w; if (tw(tr, size, wgt, fam) > maxW && cur) { out.push(cur); cur = w; } else cur = tr; } if (cur) out.push(cur); return out; }
// a buddy's whole line as a bubble (sentence by sentence, exact words). o.merge = show the whole line at once
function say(id, x, y, t, o = {}) { const L = TL.lines[id]; if (!L) return ""; if (window._SAID) window._SAID[id] = 1; if (t < L.t - .05 || t > L.end + .8) return ""; let s = "";
  const pages = o.merge ? [{ text: L.text, t0: L.t, t1: L.end + .45 }] : sentPages(id);
  if (!o.merge) for (let i = pages.length - 1; i > 0; i--) if (pages[i].text.split(" ").length + pages[i - 1].text.split(" ").length <= 5) { pages[i - 1].text += " " + pages[i].text; pages[i - 1].t1 = pages[i].t1; pages.splice(i, 1); }
  pages.forEach((p, i) => { s += bubble(x, y, wrap(p.text, o.size || 40, o.maxW || 560), t, i ? p.t0 : L.t - .04, p.t1, { ...o, col: P[L.who], x: o.x && i === 0 }); }); return s; }

/* ---------- channel identity + scoreboard ---------- */
function logo(t, x = 44, y = 34, s = .86) { const b = 1 + .22 * loud("heart", t);
  return G(x, y, s, `<g filter="url(#dropS)"><rect x="0" y="0" width="372" height="64" rx="32" fill="${P.ink}"/></g><g transform="translate(34 32) scale(${n2(b)})"><circle r="19" fill="url(#gSun)"/><path d="M0 10 c-11-8-13-15-8-19 c4-3 7 0 8 3 c1-3 4-6 8-3 c5 4 3 11-8 19z" fill="${P.ink}"/></g>
  <text x="64" y="43" font-family="Fredoka" font-weight="700" font-size="29" fill="#fff">TheOneApp<tspan fill="${P.sun}">, Explained</tspan></text>`); }
// score over time: [[time, you, buddies], ...] filled in by the scenes file
const SCORE = [[0, 0, 0]];
function scoreAt(t) { let c = SCORE[0], tb = -9; for (const s of SCORE) if (t >= s[0]) { c = s; tb = s[0]; } return { you: c[1], bud: c[2], tb }; }
function scoreboard(t, x = 1640, y = 70, s = .62, o = {}) { const sc = scoreAt(t), bump = 1 + .12 * pulse(t, sc.tb, .01, .28) * (sc.tb > 0 ? 1 : 0);
  const you = o.you !== undefined ? o.you : sc.you, bud = o.bud !== undefined ? o.bud : sc.bud;
  return G(x, y, s * bump, `<g filter="url(#drop)"><rect x="-290" y="-52" width="580" height="104" rx="52" fill="${P.ink}"/>
  <rect x="-282" y="-44" width="258" height="88" rx="44" fill="url(#gSun)"/><rect x="24" y="-44" width="258" height="88" rx="44" fill="#CFC2FF"/></g>
  ${T(-200, 12, "YOU", 34, P.ink, { ls: 2 })}<rect x="-140" y="-34" width="92" height="68" rx="22" fill="${P.ink}"/>${T(-94, 20, you, 58, P.sun)}
  ${T(0, 14, "vs", 30, "#fff")}
  <rect x="48" y="-34" width="92" height="68" rx="22" fill="${P.ink}"/>${T(94, 20, bud, 58, "#DDD3FF")}${T(206, 12, "BUDDIES", 27, P.ink, { ls: 1 })}`); }
// teacher pause point: a small bell, top right, 3 s
function bellIcon(t, t0, x = 1408, y = 70) { const k = spring(t, t0, .4) * (1 - eo((t - t0 - 3) / .25)); if (k < .02) return ""; const r = 14 * wob(t, t0, .8);
  return TF(x, y, k, `<g filter="url(#dropS)"><circle r="34" fill="${P.ink}"/></g><g transform="rotate(${n2(r)})"><path d="M0 -20 C-12 -20 -14 -8 -14 2 L-20 12 H20 L14 2 C14 -8 12 -20 0 -20z" fill="${P.sun}"/><circle cy="17" r="5" fill="${P.sun}"/><circle cy="-21" r="3.5" fill="${P.sun}"/></g>`); }
// "+1" sun coin with a note
function coin(t, t0, x, y, txt = "+1", note = "") { const k = spring(t, t0, .45) * (1 - eo((t - t0 - 2.6) / .3)); if (k < .02) return "";
  return TF(x, y - 20 * eo((t - t0) / .5), k, `<g filter="url(#dropS)"><circle r="46" fill="url(#gSun)"/><circle r="46" fill="none" stroke="#fff" stroke-width="4" opacity=".5"/></g>${T(0, 17, txt, 48, P.ink)}` + (note ? tpill(0, 78, note, 28, P.ink, "#fff") : "")); }

/* ---------- YOU: hands ---------- */
const SKIN = "#FFDCC2", SKIN2 = "#F2B998";
// an open/counting hand seen from the back, fingers up. n = fingers shown (0..5). origin = the wrist
function countHand(n = 5, o = {}) { const fx = [-58, -30, 0, 30, 56], fl = [70, 96, 108, 98, 0], up = (i) => (o.set ? o.set[i] : (i < 4 ? i < Math.min(n, 4) : n >= 5)); let s = "";
  // order of raising: index, middle, ring, little, thumb
  const order = [1, 2, 3, 4, 0], isUp = [0, 0, 0, 0, 0]; for (let i = 0; i < n; i++) isUp[order[i]] = 1;
  s += `<rect x="-52" y="-10" width="104" height="150" rx="40" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"/>`;
  for (let i = 1; i < 5; i++) { const L = isUp[i] ? [0, 96, 110, 100, 78][i] : 26; s += `<rect x="${[0, -48, -22, 4, 30][i]}" y="${-94 - L + 80}" width="26" height="${L + 40}" rx="13" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"/>`; }
  s += isUp[0] ? `<rect x="-96" y="-6" width="74" height="30" rx="15" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5" transform="rotate(28 -30 10)"/>` : `<rect x="-50" y="34" width="62" height="28" rx="14" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5" transform="rotate(-12 -20 48)"/>`;
  s += `<rect x="-46" y="-2" width="92" height="120" rx="34" fill="${SKIN}"/><rect x="-46" y="118" width="92" height="120" rx="20" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5"/><rect x="-43" y="100" width="86" height="40" fill="${SKIN}"/>`;
  return s; }
// a pointing hand (points right); kit hand() in skin colours
const pointHand = () => `<g fill="${SKIN}" stroke="${SKIN2}" stroke-width="5" stroke-linejoin="round"><rect x="-190" y="-30" width="130" height="68" rx="20"/><rect x="-70" y="-34" width="92" height="76" rx="30"/><rect x="-10" y="-34" width="110" height="34" rx="17"/></g><rect x="-64" y="-28" width="60" height="64" rx="24" fill="${SKIN}"/>`;
const youPill = (x, y, s = 1) => TF(x, y, s, `<g filter="url(#dropS)"><rect x="-58" y="-28" width="116" height="56" rx="28" fill="url(#gSun)"/></g>${T(0, 13, "YOU", 36, P.ink, { ls: 3 })}`);
// crossed arms (two forearms crossing, seen from the front)
const crossedArms = () => `<g stroke="${SKIN2}" stroke-width="5" stroke-linejoin="round" fill="${SKIN}"><g transform="rotate(-32)"><rect x="-150" y="-30" width="300" height="60" rx="30"/><rect x="118" y="-40" width="74" height="80" rx="32"/></g><g transform="rotate(32)"><rect x="-150" y="-30" width="300" height="60" rx="30"/><rect x="-192" y="-40" width="74" height="80" rx="32"/></g></g>`;

/* ---------- game pieces ---------- */
// verdict tag: LIVING (blue) or NON-LIVING (orange), lands with a small bounce
function tag(t, t0, x, y, living, s = 1) { const k = spring(t, t0, .45); if (k < .02) return ""; const txt = living ? "LIVING" : "NON-LIVING", w = (living ? 250 : 370);
  return TF(x, y + (1 - eo((t - t0) / .25)) * -60, k * s, `<g filter="url(#drop)" transform="rotate(${living ? -3 : 3})"><rect x="${-w / 2}" y="-40" width="${w}" height="80" rx="40" fill="url(#${living ? "gGreen" : "gBlue"})"/><rect x="${-w / 2 + 8}" y="-34" width="${w - 16}" height="30" rx="15" fill="#fff" opacity=".2"/>${T(0, 16, txt, 44, "#fff", { ls: 6 })}</g>`); }
// the flip day counter (style 7.6). day can be fractional while it flips: pass the day shown and the time of the last flip
function counter(t, day, tflip = -9, x = 60, y = 110, s = 1, o = {}) { if (typeof s === 'object') { o = s; s = 1; } const f = clamp((t - tflip) / .2), sq = tflip > -5 ? 1 - .5 * Math.sin(Math.PI * f) * (f < 1 ? 1 : 0) : 1; let dots = "";
  for (let i = 0; i < 30; i++) { const d = i + 1, cx = 22 + (i % 10) * 24, cy = 276 + Math.floor(i / 10) * 24; dots += `<circle cx="${cx}" cy="${cy}" r="${d === day ? 9.5 : 6.5}" fill="${d <= day ? P.sun : "#fff"}" opacity="${d <= day ? 1 : .22}"/>`; }
  return G(x, y, s, `<g filter="url(#drop)"><rect x="0" y="0" width="240" height="232" rx="34" fill="${P.ink}"/><path d="M0 34 Q0 0 34 0 H206 Q240 0 240 34 V72 H0z" fill="url(#gSun)"/></g>${T(120, 54, "DAY", 46, P.ink, { ls: 12 })}
  <g transform="translate(120 152) scale(1 ${n2(sq)})">${T(0, 46, day, 130, "#fff")}</g><rect x="0" y="150" width="240" height="4" fill="#000" opacity=".25"/>
  ${o.nodots ? "" : `<rect x="0" y="250" width="240" height="134" rx="26" fill="${P.ink}" opacity=".6"/>` + dots + T(262, 334, "", 1) + `<text x="120" y="366" font-family="Fredoka" font-weight="500" font-size="27" fill="#fff" text-anchor="middle" opacity=".85">of 30</text>`}`); }
// which day shows at t, from a list of flips [[time, day], ...]
function dayAt(t, flips) { let d = flips[0][1], tf = -9; for (const [tt, dd] of flips) if (t >= tt) { d = dd; tf = tt; } return [d, tf]; }

/* ---------- the lock-in (style 7.1) ---------- */
const RING_R = 196;
// the ring timer: frac = fraction left (1..0), secs = number in the sun disc
function ringTimer(cx, cy, frac, secs, t, o = {}) { const R = o.R || RING_R, C = 2 * Math.PI * R, sw = o.sw || 30, tick = o.tick || 0;
  return `<circle cx="${cx}" cy="${cy}" r="${R + 34}" fill="${P.night}" opacity=".7"/><circle cx="${cx}" cy="${cy}" r="${R - 22}" fill="#fff" opacity=".1"/>${o.inner || ""}
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="${sw}"/>
  ${frac > .004 ? `<g transform="translate(${cx} ${cy}) scale(-1 1) rotate(-90)"><circle r="${R}" fill="none" stroke="${P.sun}" stroke-width="${sw + 12}" opacity="${n2(.45 + .3 * tick)}" filter="url(#b10)" stroke-dasharray="${n2(C * frac)} ${n2(C)}"/><circle r="${R}" fill="none" stroke="url(#gSunU)" stroke-width="${n2(sw + 4 * tick)}" stroke-linecap="round" stroke-dasharray="${n2(C * frac)} ${n2(C)}"/></g>` : `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${P.sun}" stroke-width="${sw}" opacity="${n2(o.shut || 0)}"/>`}
  ${secs === null ? "" : `<g transform="translate(${cx} ${cy + R}) scale(${n2((1 + .12 * tick) * (o.chg > -5 ? 1 + .45 * Math.exp(-Math.max(0, t - o.chg) * 9) * (t >= o.chg ? 1 : 0) : 1) * (o.ns || 1))})" filter="url(#dropS)"><circle r="54" fill="url(#gSun)"/><circle r="54" fill="none" stroke="${P.night}" stroke-width="8"/>${T(0, 24, secs, 70, P.ink)}</g>`}`; }
// ring ticks: soft wood ticks that speed up over the last 3 s (the same list drives the sound)
function ringTicks(t0, dur) { const out = []; for (let b = 0; b < dur; b++) { const left = dur - b, div = left > 3 ? 1 : left > 1 ? 2 : 4; for (let j = 0; j < div; j++) out.push(t0 + b + j / div); } return out; }
function ringState(t, t0, dur) { const e = t - t0, b = Math.floor(e), frac = clamp(lerp(Math.min(dur, dur - b + 1), dur - b, eo((e - b) / .35)) / dur), secs = Math.max(0, Math.ceil(dur - e - 1e-6)); let tick = 0; if (t >= t0 && t < t0 + dur) for (const tt of ringTicks(t0, dur)) tick = Math.max(tick, pulse(t, tt, .01, .12));   // v3: the ring drains one step per second, ON the tick, and the number pops as it changes
  return { frac: t < t0 ? 1 : frac, secs: t < t0 ? dur : secs, tick, chg: t >= t0 && t <= t0 + dur + .5 ? t0 + Math.min(dur, Math.max(0, b)) : -9 }; }
// a choice card (left blue / right orange / purple)
function choiceCard(x, y, kind, label, sub, o = {}) { const g = { green: ["gGreen", "#1F8A4C"], blue: ["gBlue", P.blueDeep], orange: ["gOrange", P.orangeDeep], purple: ["gPurple", "#6B3FD0"] }[kind], flip = o.flip || 1, w = o.w || 480, h = o.h || 430, pls = o.pulse || 0, dim = o.dim === undefined ? 1 : o.dim, lit = o.lit || 0;
  return `<g transform="translate(${x} ${y}) rotate(${flip * 2.2}) scale(${n2(1 + .03 * pls + .05 * lit)})" opacity="${n2(dim)}">${lit ? `<rect x="${-w / 2 - 14}" y="${-h / 2 - 22}" width="${w + 28}" height="${h + 36}" rx="64" fill="${P.sun}" opacity="${n2(.8 * lit)}" filter="url(#b10)"/>` : ""}<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="50" fill="${g[1]}"/><rect x="${-w / 2}" y="${-h / 2 - 12}" width="${w}" height="${h}" rx="50" fill="url(#${g[0]})"/></g>
    <rect x="${-w / 2 + 18}" y="${-h / 2 + 2}" width="${w - 36}" height="${h * .3}" rx="38" fill="#fff" opacity=".16"/>
    ${o.icon || `<g transform="translate(${-flip * 14} ${-h * .17}) scale(${-flip * 1.15} 1.15)" filter="url(#dropS)">${hand("#fff")}</g>`}
    ${T(0, h * .24, label, label.length > 7 ? 58 : 84, "#fff", { ls: label.length > 7 ? 9 : 12, x: 'style="font-variant-ligatures:none"' })}
    <g><rect x="-135" y="${h * .31}" width="270" height="52" rx="26" fill="${P.ink}" opacity=".35"/>${T(0, h * .31 + 37, sub, 30, "#fff", { w: 600, ls: 1 })}</g>
    ${lit > .5 ? `<g transform="translate(${w / 2 - 40} ${-h / 2 + 20}) scale(${n2(spring(lit, .5, .5))})"><circle r="42" fill="${P.leaf}" stroke="#fff" stroke-width="6"/><path d="M-18 2 L-5 15 L19 -13" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>` : ""}</g>`; }
// LOCKED IN! stamp
function stamp(t, t0, x = 960, y = 470, txt = "LOCKED IN!") { if (t < t0 || t > t0 + .95) return ""; const u = (t - t0) / .14, k = (u < 1 ? lerp(2.2, 1, eo(u)) : 1 + .06 * wob(t, t0 + .14, .4)) * (1 + .5 * ei((t - t0 - .72) / .22)), o = Math.min(1, u * 2) * (1 - ss(t0 + .72, t0 + .94, t));
  return OP(o, TF(x, y, k * 1.25, `<text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="124" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="22" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">${txt}</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="124" text-anchor="middle" letter-spacing="6" fill="url(#gSun)">${txt}</text>`, -6)); }
// a buddy's pick card: face down "?" until tflip, then the answer word in the choice colour
function pickCard(who, x, y, t, tflip, word, kind) { const u = clamp((t - tflip) / .22), sx = Math.abs(Math.cos(Math.PI * u)), face = u > .5, pop = 1 + .15 * pulse(t, tflip + .11, .02, .3) * (t > tflip ? 1 : 0);
  const fill = face ? { green: "url(#gGreen)", blue: "url(#gBlue)", orange: "url(#gOrange)", purple: "url(#gPurple)", sky: "url(#hSky)" }[kind] : P.ink, wd = face ? Math.max(96, tw(word, 30, 700, "Fredoka", 2) + 34) : 88;
  return `<g transform="translate(${x} ${y}) rotate(${face ? 4 : 8}) scale(${n2(Math.max(.05, sx) * pop)} ${n2(pop)})" filter="url(#dropS)"><rect x="${-wd / 2}" y="-56" width="${wd}" height="112" rx="18" fill="${fill}" stroke="${P[who]}" stroke-width="6"/>${face ? T(0, 12, word, 30, kind === "sky" ? P.ink : "#fff", { ls: 2 }) : T(0, 22, "?", 64, P[who])}</g>`; }

/* ---------- Mark Sentence card (style 7.5): words appear as Heart says them, highlights sweep in ---------- */
function markCard(t, o) { // o: {id (voice line), text, keys: [words], n: "1 of 3", t0 (card arrives), x, y, w, size, tab, footer, startWord}
  const size = o.size || 70, W_ = o.w || 1060, x0 = o.x || 620, y0 = o.y || 250, lh = size * 1.36, L = o.id ? TL.lines[o.id] : null;
  const toks = o.text.split(" "), sp = tw(" ", size, 700, "Atkinson Hyperlegible"); let lines = [[]], cx = 0;
  toks.forEach((w, i) => { const ww = tw(w, size, 700, "Atkinson Hyperlegible"); if (cx + ww > W_ - 130 && lines[lines.length - 1].length) { lines.push([]); cx = 0; } lines[lines.length - 1].push({ w, x: cx, ww, i }); cx += ww + sp; });
  const Hc = lines.length * lh + 210, k = spring(t, o.t0, .5), keys = (o.keys || []).map(norm); let body = "";
  const off = o.startWord || 0;
  lines.forEach((ln, li) => ln.forEach((it) => { const wt = L ? (L.words[it.i + off] ? L.words[it.i + off].a : L.end) : o.t0 + .3 + it.i * .05, a = ramp(t, wt - .06, .16); if (a <= 0) return; const y = 140 + li * lh;
    if (keys.includes(norm(it.w))) { const hw = eo((t - wt) / .35) * (it.ww + 12); body += `<rect x="${n2(60 + it.x - 6)}" y="${n2(y - size * .42)}" width="${n2(hw)}" height="${n2(size * .5)}" rx="6" fill="#FFD75A"/>`; }
    body += `<text x="${n2(60 + it.x)}" y="${n2(y + (1 - a) * 10)}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(a)}">${esc(it.w)}</text>`; }));
  return TF(x0 + W_ / 2, y0 + Hc / 2, k, `<g transform="rotate(-1) translate(${-W_ / 2} ${-Hc / 2})"><g filter="url(#drop)"><rect x="0" y="0" width="${W_}" height="${Hc}" rx="30" fill="url(#gPaper)"/><path d="M0 30 Q0 0 30 0 H22 V${Hc} H30 Q0 ${Hc} 0 ${Hc - 30}z" fill="${P.sun}"/><rect x="0" y="0" width="20" height="${Hc}" rx="10" fill="${P.sun}"/></g>
    <g transform="translate(40 -30)" filter="url(#dropS)"><rect x="0" y="0" width="${o.tab ? tw(o.tab, 34, 700, "Fredoka", 3) + 110 : 420}" height="66" rx="33" fill="url(#gSun)"/></g><g transform="translate(78 3)"><circle r="20" fill="${P.ink}"/><path d="M-9 0 L-2 7 L10 -7" fill="none" stroke="${P.sun}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>${T(112, 15, o.tab || "MARK SENTENCE", 34, P.ink, { a: "start", ls: 3 })}
    ${o.n ? T(W_ - 50, 56, o.n, 28, P.ink2, { a: "end", w: 600 }) : ""}${body}
    <path d="M60 ${Hc - 84} H${W_ - 60}" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".5"/>${T(60, Hc - 42, o.footer || "Primary 3 Science · Diversity · Living and non-living things", 27, P.ink2, { a: "start", w: 500 })}</g>`); }
// a key word chip that pops in
function keyword(t, t0, x, y, word) { const k = spring(t, t0, .45); if (k < .02) return ""; return TF(x, y, k, tpill(0, 0, word, 34, P.sun, P.ink, { w: 700, ls: 3 })); }

/* ---------- stages ---------- */
// colour wipe: a round blob in the next scene's colour grows from the point of interest, then clears
function wipe(t, tc, col, cx = 960, cy = 540) { const a = .3, b = .26; if (t < tc - a || t > tc + b) return ""; if (t < tc) return `<circle cx="${cx}" cy="${cy}" r="${n2(ei((t - (tc - a)) / a) * 2300)}" fill="${col}"/>`; return `<rect width="1920" height="1080" fill="${col}" opacity="${n2(1 - eo((t - tc) / b))}"/>`; }

/* ---------- the key-word shelf (top right, under the score pill): sun-yellow pills that stack downward ----------
   A NEW TERM pops large in the middle, holds KWHOLD = 2.0 s (the new pace, teacher 20 Nov: digest time), then flies to the shelf with a pop.
   The shelf slides off to the right during the first-person shrink and full-screen cards, and glows once at the end of the part as a recap.
   EP8: an entry may carry o.at = [x, y] (and o.size): it pops THERE without dimming the frame (SAP pops beside the Mark Sentence card). */
const KWHOLD = 2.0;
// EP18: Part 1 SIMILARITIES and DIFFERENCES (inside the look-closer lccompare, on Heart's "similarities" / "differences" in k603: two
// spots so the two never overlap), OBSERVABLE CHARACTERISTICS (on Heart's "observable" in answer); Part 2 REPEATED and NO FIRST OR LAST
// STAGE (inside lcloop, on Heart's "repeated" / "first" in d703), PHYSICAL FEATURES (inside lcbeetle on Heart's "physical"). All o.at (no
// dimming), 2.0 s, then they fly to the shelf. Move an o.at if the drawing needs it.
const KW = (PART === 1 ? [["SIMILARITIES", "kw_similarities", 1, null, { at: [560, 300], size: 84 }], ["DIFFERENCES", "kw_differences", 1, null, { at: [1360, 300], size: 84 }], ["OBSERVABLE CHARACTERISTICS", "kw_observable_characteristics", 1, null, { at: [960, 300], size: 70 }]]
  : [["REPEATED", "kw_repeated", 1, null, { at: [560, 300], size: 96 }], ["NO FIRST OR LAST STAGE", "kw_no_first_or_last_stage", 1, null, { at: [1240, 300], size: 70 }], ["PHYSICAL FEATURES", "kw_physical_features", 1, null, { at: [1300, 300], size: 84 }]]).map(([w, mk, big, from, o], i) => ({ w, t: MK(mk), big, from: from || (o && o.at) || [960, 470], i, o: o || {}, tl: MK(mk) + (big ? KWHOLD : 0) + .5 }));
const KWBIG = (w) => w.length > 20 ? 78 : w.length > 12 ? 104 : 130;
const SHELF_HIDE = { cold: 1, title: 1, r0card: 1, r1card: 1, r2card: 1, listcard: 1, showcard: 1, count: 1, shrink: 1, recap: 1, nyk: 1, final: 1, liz: 1, lccompare: 1, lcyoung: 1, lcloop: 1, lcbeetle: 1 };
function kwPill(w, size, glow = 0) { const ww = tw(w, size, 700, "Fredoka", size * .07) + size * 1.3, h = size * 1.55;
  return `<g ${glow > .05 ? 'filter="url(#glowS)"' : 'filter="url(#dropS)"'}><rect x="${n2(-ww / 2)}" y="${n2(-h / 2)}" width="${n2(ww)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="url(#gSun)"/><rect x="${n2(-ww / 2 + 5)}" y="${n2(-h / 2 + 4)}" width="${n2(ww - 10)}" height="${n2(h * .38)}" rx="${n2(h * .19)}" fill="#fff" opacity=".3"/></g>` + T(0, n2(size * .35), w, size, P.ink, { ls: n2(size * .07) }); }
const KWLINE = PART === 1 ? ["hk_similarities", "hk_differences", "hk_observable_characteristics"] : ["hk_repeated", "hk_no_first_or_last_stage", "hk_physical_features"];
function shelf(t, s) { const S = TL.scenes, si = S.indexOf(s), hid = SHELF_HIDE[s.name], prevHid = si > 0 && SHELF_HIDE[S[si - 1].name];
  let hide = hid ? (prevHid ? 1 : eo((t - s.t0) / .3)) : (prevHid ? 1 - eo((t - s.t0) / .35) : 0); let out = "", top = "";
  const away = window.SHELF_AWAY ? window.SHELF_AWAY(t) : 0; hide = Math.max(hide, away); const rc = s.name === "kwrecap" ? eio((t - s.t0) / .6) : 0;
  for (const k of KW) { if (t < k.t) continue; const size = 34, ww = tw(k.w, size, 700, "Fredoka", size * .07) + size * 1.3, sx = 1826 - ww / 2 + hide * (ww + 160), sy = 136 + k.i * 57, tf = k.tl - .5;
    if (k.big && t < tf) { // the new term, large, held KWHOLD (2.0 s)
      const a = clamp((t - k.t) / .2), kk = spring(t, k.t, .5); let rays = ""; for (let i = 0; i < 12; i++) { const an = i * 30 * Math.PI / 180 + (t - k.t) * .3; rays += `<path d="M${n2(960 + Math.cos(an) * 330)} ${n2(470 + Math.sin(an) * 150)} L${n2(960 + Math.cos(an) * (400 + 30 * kk))} ${n2(470 + Math.sin(an) * (190 + 20 * kk))}" stroke="${P.sun}" stroke-width="9" stroke-linecap="round" opacity="${n2(.8 * a)}"/>`; }
      if (k.o.at) { top += TF(k.o.at[0], k.o.at[1], kk * (1 + .02 * Math.sin((t - k.t) * 3)), kwPill(k.w, k.o.size || 110)) + OP(a, tpill(k.o.at[0], k.o.at[1] + (k.o.size || 110) * 1.15, "KEY WORD", 30, P.ink, P.sun, { w: 700, ls: 5 })); continue; }
      top += `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * a)}"/>` + rays + TF(960, 470, kk * (1 + .02 * Math.sin((t - k.t) * 3)), kwPill(k.w, KWBIG(k.w))) + OP(a, tpill(960, 640, "KEY WORD", 34, P.ink, P.sun, { w: 700, ls: 5 })); continue; }
    const u = clamp((t - tf) / .5);
    if (u < 1) { const e = eio(u), x0 = k.from[0], y0 = k.from[1], x = lerp(x0, sx, e), y = lerp(y0, sy, e) - 120 * Math.sin(Math.PI * e), sc = lerp(k.big ? (k.o.size || KWBIG(k.w)) / size : 1.5, 1, e) * (k.big ? 1 : Math.min(1, spring(t, tf, .25) + .2));
      top += OP(k.big ? 1 : Math.min(1, u * 5), TF(x, y, sc, kwPill(k.w, size)) ) + (k.big && !k.o.at ? `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(.5 * (1 - u))}"/>` : ""); continue; }
    if (rc > 0) { // the read-along: centre stage, big; each word lights up as it is said and stays lit
      const tl_ = LT(KWLINE[k.i]), lit = t >= tl_ - .05, g = lit ? pulse(t, tl_, .05, .8) : 0, cy = (KW.length > 3 ? 300 : 360) + k.i * (KW.length > 3 ? 138 : 170), sc = lerp(1, Math.min(KW.length > 3 ? 2.0 : 2.2, 1000 / Math.max(...KW.map((q) => tw(q.w, size, 700, "Fredoka", size * .07) + size * 1.3))), rc) * (1 + .1 * g + (lit ? .04 * Math.sin(t * 5) * (t < tl_ + 2.6 ? 1 : 0) : 0));
      out += OP(lit || rc < 1 ? 1 : .5, TF(lerp(sx, 960, rc), lerp(sy, cy, rc), sc, kwPill(k.w, size, lit && t < tl_ + 2.6 ? 1 : 0))); continue; }
    const land = pulse(t, k.tl, .02, .3);
    out += TF(sx, sy, 1 + .22 * land, kwPill(k.w, size)); }
  return out + top; }
window.OVER = (t, s) => (location.search.includes("noshelf") ? "" : shelf(t, s)) + (window.OVER2 ? OVER2(t, s) : "");

/* EP14 trial (SCENES_TODO rule 11): EVERY buddy line has its bubble beside the speaker's head. A scene that draws its own bubble (say) wins;
   otherwise main.js adds one here, beside the head of where that buddy was drawn this frame, towards the middle of the frame, inside it. */
function autoSay(t) { if (window._noAuto) return ""; let out = ""; const BP = window._BP || {};
  for (const id of TL.order) { const L = TL.lines[id]; if (!L || !BP[L.who] || (window._SAID || {})[id] || t < L.t - .05 || t > L.end + .8) continue;
    const b = BP[L.who], dir = b.x < 960 ? 1 : -1, size = 40, maxW = 600, ls = wrap(L.text.length > 60 ? L.text : L.text, size, maxW).length, bh = Math.min(4, ls) * size * 1.22 + 40;
    let by = b.y - b.h * 1.02 - bh / 2 - 30, bx = b.x + dir * b.h * .35;
    if (b.peek && Math.abs(b.x - 960) < 10) { bx = 520; by = 900; }
    if (by < 140 + bh / 2) { by = Math.max(140 + bh / 2, b.y - b.h * .8); bx = b.x + dir * (b.h * .45 + maxW / 2 + 40); }
    const ov = (window._BUBAT || {})[L.who] || (window._BUBAT || {})['*']; if (ov) { bx = ov[0]; by = ov[1]; }
    bx = clamp(bx, 360, 1560); out += say(id, bx, by, t, { size, maxW, tail: clamp(b.x - bx, -260, 260) * (by > b.y - b.h * .9 ? 0 : 1) }); }
  return out; }
