// motion.js: the motion helpers of "TheOneApp, Explained" (first used in short1, the EP1 Short).
// Every helper is a pure function of time: no state, no randomness without a seed, so any frame can be drawn in
// any order by any render worker. Works in the page (window.Motion) and in node (require). See MOTION_GUIDE.md.
//
//   timing      prog, ease.*, spring, kick, pulse, stagger, anticipate
//   bodies      squash, hop, land, arc, drag, follow, vel, speed
//   life        breathe, hold (moving hold), dart (eye darts), lookAt, mouth (lip-sync from a loudness envelope)
//   camera      punch (beat hits without shake), cam (push + parallax)
//   blur        smear (sub-frame motion trail), streak
(function (root) {
  "use strict";
  const TAU = Math.PI * 2;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const remap = (x, a, b, c, d) => c + (d - c) * clamp((x - a) / (b - a));
  const hash = (...xs) => { let h = 2166136261; for (const x of xs) { h ^= Math.round(x * 1000) | 0; h = Math.imul(h, 16777619); h ^= h >>> 13; } return ((h >>> 0) % 100000) / 100000; };
  const noise = (x, seed = 0) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i, seed), hash(i + 1, seed), u) * 2 - 1; };   // smooth, -1..1

  const ease = {
    lin: (k) => clamp(k),
    in2: (k) => clamp(k) ** 2, out2: (k) => 1 - (1 - clamp(k)) ** 2,
    in3: (k) => clamp(k) ** 3, out3: (k) => 1 - (1 - clamp(k)) ** 3,
    io: (k) => { k = clamp(k); return k * k * (3 - 2 * k); },
    io3: (k) => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; },
    out5: (k) => 1 - (1 - clamp(k)) ** 5,                       // a sharp arrival: fast, then a long soft stop
    back: (k, s = 1.7) => { k = clamp(k) - 1; return 1 + k * k * ((s + 1) * k + s); },      // overshoot, then settle (about 8% at s = 1.7)
    inBack: (k, s = 1.7) => { k = clamp(k); return k * k * ((s + 1) * k - s); },             // dips back first: anticipation in one curve
  };
  // 0..1 through [t0, t0 + dur]
  const prog = (t, t0, dur) => clamp((t - t0) / dur);
  // a spring that goes 0 -> 1 and rings: the arrival of anything with weight (cards, pills, heads). freq in Hz.
  const spring = (t, t0, freq = 3.2, damp = 7) => { const x = t - t0; if (x <= 0) return 0; const w = TAU * freq; return 1 - Math.exp(-damp * x) * (Math.cos(w * x) + (damp / w) * Math.sin(w * x)); };
  // a hit that starts at 0, swings and dies away: follow-through of ears, tails, antennae, a wobble after a landing
  const kick = (t, t0, freq = 4, decay = 6) => { const x = t - t0; return x <= 0 ? 0 : Math.sin(TAU * freq * x) * Math.exp(-decay * x); };
  // 1 at the hit, dying away: glows, rim flashes, scale bumps
  const pulse = (t, t0, decay = 8) => (t < t0 ? 0 : Math.exp(-(t - t0) * decay));
  const stagger = (t, i, gap) => t - i * gap;
  // anticipation -> action -> overshoot -> settle, as one 0..1 value. It first goes NEGATIVE (the wind-up).
  //   ant: seconds of wind-up before t0, back: how far it pulls back, dur: seconds of the move itself
  const anticipate = (t, t0, { ant = .16, back = .14, dur = .32, over = 1.7 } = {}) => {
    if (t < t0 - ant) return 0;
    if (t < t0) return -back * Math.sin(Math.PI * .5 * ease.out2((t - (t0 - ant)) / ant));
    return lerp(-back, 1, ease.back((t - t0) / dur, over));
  };

  // squash (k < 0) and stretch (k > 0) that keep the volume: use as ctx.scale(sx, sy) about the feet
  const squash = (k) => { const sy = 1 + k; return { sx: 1 / Math.sqrt(Math.max(.2, sy)), sy }; };
  // a full hop that LANDS at t0 (so the landing can sit on a beat): crouch, stretch up, arc, squash, settle.
  //   returns { y (px above the ground, >= 0), sx, sy, air (0..1) }
  const hop = (t, t0, { height = 120, up = .34, ant = .14, crouch = .16, squashAmt = .2, settle = 5.5 } = {}) => {
    const a = t0 - up, x = t - a;                         // leaves the ground at a, lands at t0
    if (t < a - ant || height <= 0) return { y: 0, sx: 1, sy: 1, air: 0 };
    if (t < a) { const k = -crouch * Math.sin(Math.PI * .5 * ((t - (a - ant)) / ant)); return { y: 0, ...squash(k), air: 0 }; }
    if (t < t0) { const u = x / up, y = 4 * height * u * (1 - u), v = Math.abs(1 - 2 * u); return { y, ...squash(.14 * v), air: Math.sin(Math.PI * u) }; }
    const k = -squashAmt * Math.exp(-(t - t0) * settle * 1.6) * Math.cos(TAU * settle * .55 * (t - t0));
    return { y: 0, ...squash(k), air: 0 };
  };
  // the squash-and-ring after a landing at t0 (use when the fall itself is drawn elsewhere)
  const land = (t, t0, amt = .2, freq = 3.2, decay = 9) => squash(t < t0 ? 0 : -amt * Math.exp(-(t - t0) * decay) * Math.cos(TAU * freq * (t - t0)));
  // a point on an arc from a to b (things travel in arcs, never straight lines); lift = how high the arc bows (px, up = +)
  const arc = (a, b, u, lift = 80) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - lift * 4 * u * (1 - u)];
  // overlapping action: a part that follows the body `lag` seconds late
  const follow = (fn, t, lag = .08) => fn(t - lag);
  // drag: how far a soft part trails behind, from the body's own motion (ears lean back when the head jumps forward)
  const drag = (fn, t, lag = .07, gain = 1) => (fn(t - lag) - fn(t)) * gain;
  const vel = (fn, t, dt = 1 / 60) => (fn(t + dt) - fn(t - dt)) / (2 * dt);
  // pixels per frame of a moving point: decide when to smear
  const speed = (fn, t, fps = 30) => { const a = fn(t), b = fn(t - 1 / fps); return Math.hypot(a[0] - b[0], a[1] - b[1]); };

  // idle life
  const breathe = (t, rate = 3, seed = 0) => Math.sin(TAU * t / rate + seed);          // -1..1; scale the chest by 1 + .02 * breathe
  // a moving hold: nothing is ever frozen; a held pose still drifts a few px and degrees. Returns { x, y, rot }
  const hold = (t, seed = 0, amp = 1) => ({ x: noise(t * .45, seed) * 3 * amp, y: noise(t * .38, seed + 9) * 2.4 * amp, rot: noise(t * .33, seed + 17) * .5 * amp });
  // eye darts: the eyes jump to a new spot, hold, jump again (saccades), never glide. Returns -1..1.
  const dart = (t, seed = 0, { every = 1.3, snap = .07, amount = 1 } = {}) => {
    const i = Math.floor(t / every + hash(seed) * 7), f = (t / every + hash(seed) * 7) - i;
    const a = (hash(i, seed) * 2 - 1), b = (hash(i + 1, seed) * 2 - 1), k = ease.out3((f - (1 - snap / every)) / (snap / every));
    return lerp(a, b, f > 1 - snap / every ? k : 0) * amount;
  };
  // look from one point at another: -1..1 for a rig's `look`
  const lookAt = (fromX, toX, range = 400) => clamp((toX - fromX) / range, -1, 1);
  // lip-sync: the mouth opening (0..1) at time t from a loudness envelope sampled at env.fps, for a line that starts at t0.
  // lead: the mouth opens a little BEFORE the sound (one frame reads as "in sync", late reads as dubbed).
  const mouth = (env, t, t0, lead = 1 / 30) => {
    const x = (t - t0 + lead) * env.fps; if (x < 0 || x >= env.open.length) return 0;
    const i = Math.floor(x), f = x - i; return lerp(env.open[i] || 0, env.open[i + 1] || 0, f);
  };
  const talking = (env, t, t0) => t >= t0 - .05 && t <= t0 + env.dur + .05;

  // camera: hits bump the zoom and die away (no shake, no flash: the style guide forbids both).
  //   hits: [[t, amount]], returns a zoom factor around 1
  const punch = (t, hits, decay = 7) => 1 + hits.reduce((s, [h, a]) => s + (t >= h ? a * Math.exp(-(t - h) * decay) * Math.cos((t - h) * 9) : 0), 0);
  // apply a camera { x, y, zoom } to a canvas layer at a depth: far 0.2, mid 1, near 1.6 (the style guide's parallax)
  const cam = (ctx, c, depth, W, H) => { const z = 1 + ((c.zoom || 1) - 1) * depth; ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2 - (c.x || 0) * depth, -H / 2 - (c.y || 0) * depth); };

  // motion blur for one fast element: draws it `samples` times along the last `shutter` of a frame, oldest faintest, the
  // newest at full strength (a trail that reads as blur and keeps the subject crisp). draw(tt, k) must draw the element at time tt.
  const smear = (ctx, t, draw, { samples = 5, shutter = .6, fps = 30, alpha = .3 } = {}) => {
    for (let k = samples - 1; k >= 0; k--) {
      const tt = t - (k / samples) * shutter / fps;
      ctx.save(); ctx.globalAlpha *= k === 0 ? 1 : alpha * (1 - k / samples); draw(tt, k); ctx.restore();
    }
  };
  // speed streaks behind something that just arrived from direction (dx, dy): n soft lines that fade in 0.25 s
  const streak = (ctx, t, t0, x, y, dx, dy, { n = 5, len = 160, color = "#fff", w = 6, life = .25, spread = 60, seed = 1 } = {}) => {
    const u = (t - t0) / life; if (u < 0 || u > 1) return;
    ctx.save(); ctx.strokeStyle = color; ctx.lineCap = "round"; const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    for (let i = 0; i < n; i++) { const o = (hash(i, seed) - .5) * spread * 2, l = len * (.5 + hash(i + 9, seed)) * (1 - u);
      ctx.globalAlpha = .55 * (1 - u); ctx.lineWidth = w * (.5 + hash(i + 3, seed));
      const px = x - uy * o - ux * (30 + 120 * u), py = y + ux * o - uy * (30 + 120 * u);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - ux * l, py - uy * l); ctx.stroke(); }
    ctx.restore();
  };

  const api = { TAU, clamp, lerp, remap, hash, noise, ease, prog, spring, kick, pulse, stagger, anticipate, squash, hop, land, arc, follow, drag, vel, speed,
    breathe, hold, dart, lookAt, mouth, talking, punch, cam, smear, streak };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Motion = api;
})(typeof window !== "undefined" ? window : globalThis);
