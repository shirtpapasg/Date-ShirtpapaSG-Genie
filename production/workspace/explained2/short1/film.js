// THE FILM: "It walks. Is it ALIVE?" (P3 EP1 Short 1, 9:16). Draws frame t; everything is a pure function of t.
// Timings come from score.js only. The buddies are our own SVG rigs (lib/buddies.js) drawn through kit/sprites.js;
// the look is STYLE_GUIDE.md (kit/style.js palette and props); the motion helpers are kit/motion.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio, M = globalThis.Motion, Sprites = globalThis.Sprites, Props = globalThis.Props, X = globalThis.XUI, B = globalThis.Buddies;
  const { ev, vo, BEAT, steps, ticks, picks } = S;
  const { clamp, lerp, ease, prog, spring, kick, pulse } = M, TAU = Math.PI * 2;
  const W = G.W, H = G.H, SAFE = G.SAFE, CX = SAFE.x + SAFE.w / 2;      // 1080 x 1920; the safe box is x 60..940, y 221..1498
  let P = null;
  const FULL = [-160, -160, 1400, 2240];
  const keys = (t, a, e = ease.io3) => { if (t <= a[0][0]) return a[0][1]; for (let i = 1; i < a.length; i++) if (t < a[i][0]) return lerp(a[i - 1][1], a[i][1], (a[i][2] || e)((t - a[i - 1][0]) / (a[i][0] - a[i - 1][0]))); return a[a.length - 1][1]; };
  const wordT = (id, w, nth = 0) => { const L = vo[id], hits = L.words.filter((x) => x.w.toLowerCase().replace(/[^a-z-]/g, "") === w); return L.t + (hits[nth] || hits[0]).t; };
  const sentT = (id, i) => vo[id].t + vo[id].sents[i].t;
  const HITS = [[ev.land, .035], [ev.stamp, .04], [ev.popB, .018], [ev.popP, .018], [ev.popM, .018], [ev.tag, .035], [ev.coin, .02], [ev.end, .03]];

  /* ================= the wind-up robot's walk: every landing is a step in the score (and a tick in the song) ================= */
  const raw = (t) => {
    if (t < steps[0].t) return { j: -1, uu: 0, k: 1, pre: clamp((steps[0].t - t) / .2) };
    let j = 0; while (j + 1 < steps.length && steps[j + 1].t <= t) j++;
    if (steps[j].last) return { j: j - 1, uu: .55, k: steps[j - 1].k, frozen: true, since: t - steps[j].t, landed: 99 };
    const n = steps[j + 1], u = (t - steps[j].t) / (n.t - steps[j].t);
    return { j, uu: n.last ? .55 * ease.io(u) : u, k: steps[j].k, landed: t - steps[j].t };
  };
  const rockAt = (t) => { const r = raw(t); return r.j < 0 ? 0 : 5.5 * r.k * Math.cos(Math.PI * r.uu) * (r.j % 2 ? 1 : -1); };
  const walk = (t) => {
    const r = raw(t);
    if (r.j < 0) { const a = ease.io(1 - r.pre); return { prog: 0, o: { sy: 1 - .12 * Math.sin(Math.PI * a) * (1 - a * .0), bob: -4 * Math.sin(Math.PI * a), key: -6 * (1 - a), ant: 10 * (1 - a) } }; }   // the wind-up before the first stomp
    const sgn = r.j % 2 ? 1 : -1, mv = (r.j + 1) % 2, lift = Math.sin(Math.PI * r.uu) * r.k, sl = lerp(-9, 9, r.uu) * r.k;
    const rock = rockAt(t), wob = r.frozen ? kick(t, steps[steps.length - 1].t, 5, 7) : 0;
    const o = { liftL: mv === 0 ? lift : 0, liftR: mv === 1 ? lift : 0, slideL: mv === 0 ? sl : -sl, slideR: mv === 1 ? sl : -sl, rock,
      bob: 6 * r.k * Math.sin(Math.PI * r.uu), sy: 1 - .08 * r.k * Math.exp(-r.landed * 16),
      arm: 22 * r.k * Math.cos(Math.PI * r.uu) * sgn + wob * 8, head: -.5 * rockAt(t - .06), ant: 2.4 * (rockAt(t - .1) - rock) + wob * 16, key: (r.j + r.uu) * .9 };
    return { prog: r.j + r.uu, o, frozen: r.frozen };
  };
  const stepsBefore = (t) => { let n = 0; while (n < steps.length && steps[n].t <= t) n++; return n; };
  const N_RING = stepsBefore(ev.ring0 - 1e-3), N_BOX = stepsBefore(ev.cutBox - 1e-3);
  const RS = 1.45, RY = 1152;                                           // the robot's size and floor line in the box
  const robotX = (t) => (t < ev.cutBox ? 205 + 16.5 * Math.min(walk(t).prog, N_RING) : 520 + 15 * (walk(t).prog - N_BOX + 1));

  /* ================= the box world (scenes A, D, E, G) ================= */
  const DISH = [300, 1222], CARROT = [836, 1226], BEAN = [470, 1262], WORM2 = [690, 1214];
  const night = (t) => keys(t, [[ev.lapse0, 0], [ev.lapse0 + .7, 1], [ev.day2 - .75, 1], [ev.day2 - .05, 0]], ease.io);
  // the mealworm: still in its oats; during the speeded-up night it goes to the carrot, eats, and settles in a new spot
  const worm = (t) => {
    const a = ev.lapse0 + .35, b = ev.day2 - .35; if (t <= a) return { p: [DISH[0] + 6, DISH[1] - 30], bend: .25, bites: 0, u: 0 };
    const q = Math.floor(clamp((t - a) / (b - a)) * 14) / 14;      // time-lapse: it moves in jumps, like photos taken one by one
    const A = [DISH[0] + 6, DISH[1] - 30], C = [CARROT[0] - 150, CARROT[1] - 6];
    const p = q < .45 ? M.arc(A, C, ease.io(q / .45), 26) : q < .75 ? C : [lerp(C[0], WORM2[0], ease.io((q - .75) / .25)), lerp(C[1], WORM2[1], ease.io((q - .75) / .25))];
    return { p, bend: q >= 1 ? .2 : (Math.round(q * 14) % 2 ? .55 : -.15), bites: q < .52 ? 0 : q < .66 ? 1 : 2, u: q };
  };
  function boxWorld(ctx, t, cam, o = {}) {
    const nt = night(t), rb = walk(t), rx = robotX(t), w = worm(t);
    const layer = (depth, fn) => { ctx.save(); M.cam(ctx, cam, depth, W, H); fn(); ctx.restore(); };
    layer(.2, () => { X.sprite(ctx, Props.boxFar(0), FULL, 0, 0, 1, { still: true, key: "far0", px: 1 }); if (nt > .01) { ctx.globalAlpha = nt; X.sprite(ctx, Props.boxFar(1), FULL, 0, 0, 1, { still: true, key: "far1", px: 1 }); } });
    layer(1, () => {
      X.sprite(ctx, Props.boxBack(), FULL, 0, 0, 1, { still: true, key: "boxBack", px: 1.5 });
      // the robot (behind the things on the soil)
      ctx.save(); if (o.robotBlur) ctx.filter = `blur(${o.robotBlur * (G.scale || 1)}px)`;
      ctx.fillStyle = "rgba(43,33,71,.32)"; ctx.beginPath(); ctx.ellipse(rx, RY + 4, 118, 16, 0, 0, TAU); ctx.fill();
      const ro = { ...rb.o, win: o.win || 0, coil: o.coil == null ? 1 : o.coil, blink: o.blink || 0 };
      if (o.smearRobot && !Sprites.isCollect(ctx)) M.smear(ctx, t, (tt, k) => X.robot(ctx, robotX(tt) + (k ? -6 * k : 0), RY, RS, ro), { samples: 3, alpha: .25 });
      else X.robot(ctx, rx, RY, RS, ro);
      ctx.restore();
      // time-lapse ghosts: where the living thing was earlier in the night (non-living things leave no ghosts)
      if (t > ev.lapse0 && w.u > .5) { ctx.save(); ctx.globalAlpha = .22 * clamp((w.u - .5) * 6); X.sprite(ctx, Props.mealworm(.25), [-100, -50, 200, 60], DISH[0] + 6, DISH[1] - 30, .8); ctx.restore(); }
      if (t > ev.lapse0 && w.u > .8) { ctx.save(); ctx.globalAlpha = .38 * clamp((w.u - .8) * 8); X.sprite(ctx, Props.mealworm(.5), [-100, -50, 200, 60], CARROT[0] - 150, CARROT[1] - 6, .8); ctx.restore(); }
      X.sprite(ctx, Props.oats(), [-140, -60, 280, 80], DISH[0], DISH[1], .8);
      X.sprite(ctx, Props.carrot(w.bites, "cb" + w.bites), [-90, -110, 180, 130], CARROT[0], CARROT[1], .78);
      X.sprite(ctx, Props.mealworm(w.bend), [-100, -50, 200, 60], w.p[0], w.p[1], .8);
      X.sprite(ctx, Props.bean(), [-70, -84, 140, 104], BEAN[0], BEAN[1], .5, { px: 5 });
      if (o.inWorld) o.inWorld(ctx, rx);
    });
    if (nt > .01) { ctx.save(); ctx.globalCompositeOperation = "multiply"; ctx.fillStyle = `rgba(52,58,140,${.62 * nt})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    layer(1, () => X.sprite(ctx, Props.boxFront(), FULL, 0, 0, 1, { still: true, key: "boxFront", px: 1.5 }));
    // dust in the lamp light: drifts, never still
    layer(.7, () => { for (let i = 0; i < 22; i++) { const x = 120 + M.hash(i, 1) * 840 + M.noise(t * .12 + i, 3) * 40, y = 620 + ((M.hash(i, 2) * 520 + t * (6 + 8 * M.hash(i, 4))) % 520); ctx.fillStyle = `rgba(255,243,220,${(.12 + .3 * M.hash(i, 5)) * (1 - nt * .6)})`; ctx.beginPath(); ctx.arc(x, y, 2 + 2.5 * M.hash(i, 6), 0, TAU); ctx.fill(); } });
    if (!o.noNear) layer(1.6, () => X.sprite(ctx, Props.boxNear(), FULL, 0, 0, 1, { still: true, key: "boxNear", px: 1 }));
  }
  const toScreen = (cam, x, y) => { const z = cam.zoom || 1; return [W / 2 + (x - W / 2 - (cam.x || 0)) * z, H / 2 + (y - H / 2 - (cam.y || 0)) * z]; };
  const focus = (fx, fy, zoom, sy = H / 2) => ({ x: fx - W / 2, y: fy - H / 2 - (sy - H / 2) / zoom, zoom });   // put world (fx, fy) at screen (540, sy)

  /* ---------- scene A: the box. The robot marches past the still mealworm. ---------- */
  function sceneA(ctx, t) {
    const rx = robotX(t), z = keys(t, [[0, 1.42], [1.7, 1.0, ease.out5], [ev.ring0, 1.05, ease.lin]]) * M.punch(t, HITS);
    const cam = focus(lerp(rx + 40, 540 + (rx - 540) * .16, ease.out5(t / 1.7)), lerp(1010, 960, ease.out5(t / 1.7)), z);
    boxWorld(ctx, t, cam, { smearRobot: false });
    // step puffs: a little dust where each foot lands
    ctx.save(); M.cam(ctx, cam, 1, W, H);
    for (const s of steps) { const a = t - s.t; if (a < 0 || a > .32 || s.t >= ev.ring0) continue; const x = 205 + 16.5 * s.i + (s.i % 2 ? 26 : -30) * RS; ctx.globalAlpha = .5 * (1 - a / .32); ctx.fillStyle = "#E8C9A0";
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + (i - 1) * (12 + 50 * a), RY - 4 - 26 * a * (1 + i % 2), 7 * (1 - a) + 3, 0, TAU); ctx.fill(); } }
    ctx.restore();
    // the title slams in on the first stomp, then holds (a moving hold: it never freezes)
    const a = t - ev.land; if (a >= -.05) { const h = M.hold(t, 3, 1.2), sc = a < .14 ? lerp(2.3, 1, ease.out5(clamp((a + .05) / .19))) : 1 + .05 * kick(t, ev.land + .14, 3.2, 7);
      const beat = pulse(t, S.B(Math.floor((t - S.B(0)) / BEAT)), 9) * .03;
      const draw = (k) => { ctx.save(); ctx.translate(CX + h.x, 372 + h.y); ctx.rotate((-3 + h.rot) * Math.PI / 180); ctx.scale(sc + (k || 0) * .22, sc + (k || 0) * .22); ctx.globalAlpha *= clamp((a + .05) / .06);
        X.text(ctx, "IS IT", 0, -6, { size: 84, ls: 10, shadow: true }); ctx.save(); ctx.translate(0, 110); ctx.scale(1 + beat, 1 + beat); X.text(ctx, "ALIVE?", 0, 0, { size: 132, ls: 12, color: P.sun, shadow: true }); ctx.restore(); ctx.restore(); };
      if (a < .16) M.smear(ctx, t, (tt, k) => draw(k), { samples: 4, alpha: .22 }); else draw(0); }
    // the two choices slide in from their own sides as Heart names them
    tabs(ctx, t, 1335, 0);
  }
  function tabs(ctx, t, y, k) {
    [["L", ev.tabL, 270], ["R", ev.tabR, 730]].forEach(([side, t0, x]) => { if (t < t0 - .2) return; const dir = side === "L" ? -1 : 1, u = M.anticipate(t, t0 - .12, { ant: .06, back: .0, dur: .34, over: 2.2 });
      const px = x + dir * 620 * (1 - clamp(u, -1, 1.2)), poke = pulse(t, t0 + .1, 5) + .6 * pulse(t, t0 + .1 + BEAT, 6) + .4 * pulse(t, t0 + .1 + 2 * BEAT, 6);
      const d = (xx) => X.choice(ctx, side, xx, y, k, { poke });
      if (t < t0 + .1 && !Sprites.isCollect(ctx)) M.smear(ctx, t, (tt) => d(x + dir * 620 * (1 - clamp(M.anticipate(tt, t0 - .12, { ant: .06, back: 0, dur: .34, over: 2.2 }), -1, 1.2))), { samples: 4, shutter: .9, alpha: .28 }); else d(px); });
  }

  /* ================= the buddies: where each one stands, and how each one acts ================= */
  const ROW = { pip: [200, 1556, 215], basil: [500, 1556, 215], momo: [800, 1556, 215] };
  const SL = { L: [152, 1272, 236], C: [500, 1440, 400], R: [846, 1272, 236] };
  const tC = ev.popB - .62;                                             // the stage re-sets itself for the answers
  const SEATS = {   // [landing time, slot, hop height (0 = glide)]
    pip: [[-9, ROW.pip, 0], [tC + .45, SL.L, 0], [ev.popP, SL.C, 170], [ev.popM, SL.R, 70]],
    basil: [[-9, ROW.basil, 0], [ev.popB, SL.C, 150], [ev.popP, SL.L, 70]],
    momo: [[-9, ROW.momo, 0], [tC + .45, SL.R, 0], [ev.popM, SL.C, 170]] };
  const SEATS_F = { pip: SL.L, basil: SL.C, momo: SL.R };
  const UP = .36;
  function seat(who, t) {
    const mv = SEATS[who]; let i = 0; while (i + 1 < mv.length && mv[i + 1][0] <= t) i++;
    const cur = mv[i], nx = mv[i + 1]; let p = cur[1].slice(), hp = cur[2] ? M.hop(t, cur[0], { height: cur[2], up: UP }) : { y: 0, sx: 1, sy: 1, air: 0 }, moving = 0;
    if (nx) { const dur = nx[2] ? UP : .45, u = clamp((t - (nx[0] - dur)) / dur);
      if (u > 0) { const e = nx[2] ? ease.io(u) : ease.io3(u); p = [0, 1, 2].map((q) => lerp(cur[1][q], nx[1][q], e)); moving = Math.sin(Math.PI * u); }
      if (nx[2] && t > nx[0] - UP - .16) hp = M.hop(t, nx[0], { height: nx[2], up: UP }); }
    return { x: p[0], y: p[1] - hp.y, h: p[2], sx: hp.sx, sy: hp.sy, air: hp.air, moving, gx: p[0], gy: p[1] };
  }
  const speaker = (t) => { for (const L of Object.values(vo)) if (L.who !== "heart" && t >= L.t - .25 && t <= L.end + .3) return L; return null; };
  const said = (id, w, nth) => wordT(id, w, nth);
  // one buddy's performance at time t: pose-to-pose, with holds that keep moving, eye darts, and looks that lead the action
  function act(who, t, st, scene) {
    const sd = { pip: 1, basil: 2, momo: 3 }[who], sp = speaker(t), o = { seed: sd, pose: "sit" }, f = { sx: st.sx, sy: st.sy, rot: 0 };
    const h = M.hold(t, sd * 7, 1), br = M.breathe(t, 3 - sd * .3, sd);
    f.rot = h.rot * 1.4; o.tilt = h.rot * 3;
    const lookTo = (tx, strength = .8) => { const d = M.lookAt(st.gx, tx, 330) * strength; if (who === "basil") { o.facing = d < 0 ? "left" : "right"; o.look = clamp(.15 + .3 * Math.abs(M.dart(t, sd, { every: 1.1 }))); } else if (Math.abs(d) > .12) { o.facing = d < 0 ? "left" : "right"; o.look = clamp(Math.abs(d) + .12 * M.dart(t, sd, { every: .9 })); } else o.look = 0; };
    if (scene === "ring") {       // thinking while the ring drains: eyes dart between the robot and the cards
      const d = M.dart(t, sd * 3, { every: who === "basil" ? .7 : 1.05 });
      if (who === "pip") { o.expr = "thinking"; lookTo(st.gx + 240 * (d > 0 ? 1 : .3)); o.tilt += 4 * d; }
      if (who === "basil") { o.expr = "smug"; o.facing = d > -.2 ? "right" : "left"; o.look = .5 + .3 * d; const tk = ticks.filter((k) => k.strong && k.t <= t).pop(); if (tk) { const b = M.land(t, tk.t, .07, 3.4, 10); f.sx *= b.sx; f.sy *= b.sy; } }   // he bounces on every tick: he is SURE
      if (who === "momo") { o.expr = t > ev.bell - 1.7 ? "shocked" : "thinking"; lookTo(st.gx - 260 * (d > 0 ? 1 : .2)); o.tilt += 6 * Math.sin(t * 1.7); if (t > ev.bell - 1.7) o.gesture = "rest"; }
      if (t >= ev.bell) { const lag = sd * .045, b = M.hop(t, ev.bell + .2 + lag, { height: 34, up: .2, ant: .0 }); st.y -= b.y; f.sx *= b.sx; f.sy *= b.sy; o.expr = t < ev.stamp ? "shocked" : "happy"; o.gesture = "rest"; o.look = 0; delete o.facing; }
      if (t >= ev.stamp + .05) { o.expr = who === "basil" ? "smug" : "happy"; }
      return { o, f };
    }
    // answers and the score: one speaker in the middle, two listeners
    const mine = sp && sp.who === who, m = X.mouthOf(who, t);
    o.expr = "happy";
    if (mine) { o.mouth = m || 0; o.look = who === "basil" ? .75 : 0; f.rot += 1.2 * Math.sin(t * 7) * (m || 0); const up = 1 + .035 * (m || 0); f.sy *= up; f.sx /= Math.sqrt(up);   // the whole body speaks, not only the mouth
      if (sp.id === "b1") { if (t < sentT("b1", 1) - .05) { o.expr = "cheering"; o.mouth = Math.max(.25, m || 0); } else { o.expr = "smug"; o.gesture = t > said("b1", "moves") - .1 ? "thumbs" : "rest"; } }
      if (sp.id === "p1") { if (t < sentT("p1", 1) - .08) { o.expr = "thinking"; o.gesture = "cross"; } else { o.expr = "smug"; o.gesture = t > said("p1", "you") - .12 ? "pointL" : "rest"; if (o.gesture === "pointL") { const b = M.land(t, said("p1", "you") - .12, .1, 3, 9); f.sx *= b.sx; f.sy *= b.sy; f.rot -= 3 * pulse(t, said("p1", "you") - .12, 4); } } }
      if (sp.id === "m1") { if (t < sentT("m1", 1) - .08) { o.expr = "happy"; o.gesture = "thumbs"; } else { o.expr = "thinking"; o.tilt += 9 * ease.io(prog(t, sentT("m1", 1) - .08, .3)); } }
      if (sp.id === "b2") { if (t < sentT("b2", 1) - .05) { o.expr = "oops"; } else { o.expr = "laughing"; o.mouth = Math.max(.3, m || 0); } }
    } else if (sp) {              // listeners turn to the speaker a beat late (the eyes go first, then the head)
      lookTo(SL.C[0], .9);
      if (who === "basil" && sp.id === "p1") { const tb = said("p1", "basil") - .15, tw = said("p1", "wind") - .1; if (t > tb) { o.expr = "oops"; delete o.facing; o.look = .7; const b = M.land(t, tb, .16, 3.2, 8); f.sx *= b.sx; f.sy *= b.sy; } else if (t > tw) o.expr = "shocked"; }
      if (who === "pip" && sp.id === "b1" && t > sentT("b1", 1)) { o.expr = "thinking"; }
      if (who === "momo" && sp.id === "b1" && t > sentT("b1", 1) + .4) { o.expr = "thinking"; o.tilt += 7; }
      if (sp.id === "m1" && t > sentT("m1", 1) + .5) { o.expr = "thinking"; if (who === "basil") o.expr = "shocked"; }
      if (sp.id === "b2" && t > sentT("b2", 1)) o.expr = "laughing";
    } else if (scene === "score") { o.expr = "happy"; o.look = 0; }
    if (st.air > .15) { o.pose = "jump"; o.air = st.air; if (!mine) o.gesture = "rest"; o.expr = o.expr === "happy" ? "cheering" : o.expr; }
    const up = 1 + .018 * br; f.sy *= up; f.sx /= Math.sqrt(up);
    return { o, f };
  }
  function drawBuddy(ctx, who, t, st, a, extra = {}) {
    const d = (x, y) => X.buddy(ctx, who, x, y, st.h, t, a.o, { ...a.f, aura: extra.aura == null ? .9 : extra.aura, alpha: extra.alpha });
    d(st.x, st.y);
  }

  /* ---------- scenes B and C: the lock-in, then the buddies answer ---------- */
  function sceneLock(ctx, t) {
    const kC = ease.io3(prog(t, tC, .45)), z = keys(t, [[ev.ring0, 1], [ev.bell, 1.035, ease.lin], [ev.cutBox, 1.06, ease.lin]]) * M.punch(t, HITS);
    const cam = { zoom: z, x: 0, y: 0 };
    ctx.save(); M.cam(ctx, cam, .2, W, H); X.sprite(ctx, Props.stage(), FULL, 0, 0, 1, { still: true, key: "stage", px: 1 }); ctx.restore();
    ctx.save(); M.cam(ctx, cam, 1, W, H);
    const inT = t - ev.ring0, el = clamp(inT / (ev.bell - ev.ring0)), shut = t >= ev.bell;
    // the question
    const qa = clamp(inT / .2) * (1 - kC); if (qa > 0) { const p = spring(t, ev.ring0, 3, 8), tk = ticks.filter((k) => k.strong && k.t <= t).pop(), b = tk && !shut ? pulse(t, tk.t, 9) : 0;
      X.text(ctx, "Living or non-living?", CX, 392 - 30 * (1 - p), { size: 60, w: 600, alpha: qa, shadow: true });
      ctx.save(); ctx.translate(CX, 462); ctx.scale(1 + .07 * b, 1 + .07 * b); X.text(ctx, shut ? "TIME’S UP!" : "LOCK IT IN!", 0, 0, { size: 44, color: P.sun, ls: 8, alpha: qa }); ctx.restore(); }
    // the ring timer with the robot marching inside it
    const rcx = CX, rcy = lerp(722, 478, kC), rs = lerp(1, .64, kC), tk = ticks.filter((k) => k.t <= t).pop(), tp = tk && !shut ? pulse(t, tk.t, tk.strong ? 9 : 14) * (tk.strong ? 1 : .55) : 0;
    const secs = Math.max(1, Math.ceil(5 * (1 - el) - 1e-6)), nPop = shut ? pulse(t, ev.bell, 6) : pulse(t, ev.ring0 + (5 - secs) * 1.0, 8);
    const ringIn = spring(t, ev.ring0 - .02, 3.4, 9), bump = shut ? 1 + .09 * kick(t, ev.bell, 3.2, 8) + .05 * pulse(t, ev.bell, 10) : 1;
    ctx.save(); ctx.translate(rcx, rcy); ctx.scale(rs * ringIn * bump, rs * ringIn * bump);
    X.ring(ctx, 0, 0, 200, shut ? 1 : 1 - el, { pulse: tp, num: shut ? "tick" : secs, numPop: nPop, shut: shut ? pulse(t, ev.bell, 3) : 0,
      inside: (c) => { c.save(); c.beginPath(); c.arc(0, 0, 184, 0, TAU); c.clip(); c.fillStyle = "rgba(43,33,71,.5)"; c.beginPath(); c.ellipse(0, 122, 96, 15, 0, 0, TAU); c.fill(); X.robot(c, 0, 118, 1.02, walk(t).o, { rim: "rim" }); c.restore(); } });
    ctx.restore();
    // the two choices: full cards during the ring, slim tabs (with the buddies' dots) once the answers start
    const glowS = ev.ring0 + .1;
    [["L", 270], ["R", 730]].forEach(([side, x], i) => { const strong = ticks.filter((k) => k.strong && k.t <= t), n = strong.length, poke = !shut && n && (n % 2 === i) ? pulse(t, strong[n - 1].t, 7) : 0, pin = spring(t, glowS + i * .09, 3.2, 8);
      const tally = picks.filter((p) => p.side === side).map((p) => ({ c: P[p.who], a: spring(t, p.t + .42, 4, 9) }));
      ctx.save(); ctx.translate(x, lerp(1128, 676, kC)); ctx.scale(lerp(.7, 1, pin), lerp(.7, 1, pin)); ctx.globalAlpha *= clamp((t - glowS - i * .09) / .1);
      X.choice(ctx, side, 0, 0, 1 - kC, { poke, tally: kC > .5 ? tally : [] }); ctx.restore(); });
    // "LOCKED IN!": the stamp lands one beat after the bell, bounces once, then holds still
    if (t >= ev.stamp - .1 && kC < 1) { const a = t - ev.stamp, sc = a < 0 ? lerp(2.6, 1.0, ease.in3((a + .1) / .1)) : 1 + .1 * kick(t, ev.stamp, 3.4, 9) - .06 * pulse(t, ev.stamp, 18);
      const d = (k) => { ctx.save(); ctx.translate(rcx, rcy - 6); ctx.rotate(-6 * Math.PI / 180); const s2 = (sc + (k || 0) * .5) * (1 - .5 * kC); ctx.scale(s2, s2); ctx.globalAlpha *= clamp((a + .1) / .05) * (1 - kC);
        X.pill(ctx, 0, 0, 560, 150, P.ink, { r: 40, blur: 20, dy: 12, sa: .45, hi: false }); ctx.strokeStyle = P.sun; ctx.lineWidth = 9; X.rr(ctx, -264, -59, 528, 118, 28); ctx.stroke();
        X.text(ctx, "LOCKED IN!", 0, 29, { size: 82, color: P.sun, ls: 5 }); ctx.restore(); };
      if (a < .02 && !Sprites.isCollect(ctx)) M.smear(ctx, t, (tt, k) => d(k), { samples: 4, alpha: .25 }); else d(0);
      if (a >= 0 && a < .3) { ctx.save(); ctx.strokeStyle = P.sun; ctx.lineWidth = 10 * (1 - a / .3); ctx.globalAlpha = .7 * (1 - a / .3); ctx.beginPath(); ctx.ellipse(rcx, rcy - 6, 300 + 420 * ease.out3(a / .3), 90 + 150 * ease.out3(a / .3), -.1, 0, TAU); ctx.stroke(); ctx.restore(); } }
    // the buddies. Before the answers: a row at the bottom, picks face down. Then one by one to the middle.
    const order = ["pip", "basil", "momo"].map((who) => ({ who, st: seat(who, t) })).sort((a, b) => a.st.h - b.st.h || a.st.y - b.st.y);
    const sp = speaker(t);
    for (const { who, st } of order) {
      const scene = t < tC ? "ring" : "answers", a = act(who, t, st, scene), rise = spring(t, ev.ring0 + .25 + { pip: 0, basil: .08, momo: .16 }[who], 2.6, 7);
      st.y += (1 - rise) * 330;
      const pk = picks.find((p) => p.who === who), flip = clamp((t - (pk.t - .11)) / .22), k = st.h / 215;
      const d = (tt) => { const s2 = tt === t ? st : seat(who, tt); if (tt !== t) s2.y += (1 - rise) * 330; X.buddy(ctx, who, s2.x, s2.y, s2.h, t, a.o, { ...a.f, aura: .9 }); };
      if (st.moving > .25 && !Sprites.isCollect(ctx)) M.smear(ctx, t, d, { samples: 4, shutter: .8, alpha: .22 }); else d(t);
      // the pick card: held beside them, it flips exactly on their pop
      const big = clamp((st.h - 240) / 150), inAns = clamp((t - tC) / .45), side = st.gx < 400 ? -1 : st.gx > 600 ? 1 : 1, cx = st.x + lerp((who === "momo" ? -1 : 1) * .47, lerp(side * .3, .6, big), inAns) * st.h, cy = st.y - lerp(.5, lerp(1.02, .9, big), inAns) * st.h - 14 * pulse(t, pk.t, 5) * k, wig = t < ev.bell ? 3 * Math.sin(t * 2.2 + st.gx) : 0;
      X.pick(ctx, who, cx, cy, .82 * k * (1 + .25 * pulse(t, pk.t, 7)), flip, pk.side, (cx > st.x ? 8 : -8) + wig);
      if (flip >= 1 && t < pk.t + .42) { const u = ease.io(prog(t, pk.t + .1, .32)), slot = picks.filter((p) => p.side === pk.side).indexOf(pk), to = [(pk.side === "L" ? 270 : 730) - 200 + 34 + slot * 44, 676 - 50], p2 = M.arc([cx, cy], to, u, 120);
        ctx.save(); ctx.fillStyle = P[who]; ctx.strokeStyle = "#fff"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(p2[0], p2[1], 19, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
      if (t >= pk.t && t < pk.t + .3) { const u = (t - pk.t) / .3; ctx.save(); ctx.strokeStyle = "#fff"; ctx.globalAlpha = .8 * (1 - u); ctx.lineWidth = 8 * (1 - u); ctx.beginPath(); ctx.arc(cx, cy, 60 * k + 110 * ease.out3(u), 0, TAU); ctx.stroke(); ctx.restore(); }
    }
    // the speaker's words, in a bubble, as they are spoken
    picks.forEach((pk, i) => { const L = vo[pk.line], off = Math.min(L.end + .3, (picks[i + 1] ? picks[i + 1].t : ev.cutBox) - UP - .22); if (t < pk.t + .02 || t > off + .15) return;
      const pop = spring(t, pk.t + .04, 3.6, 9) * (1 - ease.in3(prog(t, off, .15)));
      X.bubble(ctx, CX - 40, 772, bubbleLines(L), t, { pop, tailX: 0, size: 48, cross: !pk.right, first: pk.side === "L" ? P.blueDeep : "#C4540A" }); });
    ctx.restore();
  }
  const bubbleLines = (L) => { let k = 0; return L.sents.map((s) => { const n = s.text.split(" ").length, ws = L.words.slice(k, k + n).map((w) => ({ w: w.w, t: L.t + w.t })); k += n; return ws; }); };

  /* ---------- scene D and E: the evidence in the box, then the verdict ---------- */
  const tH6 = vo.h6.t;
  function sceneEvidence(ctx, t) {
    const rx = robotX(t);
    const K = [[ev.cutBox, [rx, 1040, 1.22, 1040]], [ev.window - .12, [rx, 1040, 1.3, 1040]], [ev.window + .4, [rx + 4, 1085, 1.7, 1080]], [ev.lapse0 - .1, [rx + 4, 1085, 1.76, 1080]], [ev.lapse0 + .6, [540, 925, 1.1, 1000]],
      [tH6 - .15, [540, 925, 1.12, 1000]], [tH6 + .5, [rx - 130, 1030, 1.36, 1010]], [ev.card - .05, [rx - 130, 1030, 1.4, 1010]], [ev.card + .5, [rx, 1100, 1.3, 900]], [ev.score, [rx, 1100, 1.34, 900]]];
    const c4 = [0, 1, 2, 3].map((q) => keys(t, K.map(([tt, v]) => [tt, v[q]])));
    const cam = focus(c4[0], c4[1], c4[2] * M.punch(t, HITS), c4[3]);
    const winA = spring(t, ev.window, 3.4, 8), coil = t < ev.window + .5 ? 0 : keys(t, [[ev.window + .5, 0], [ev.window + 1.25, 1, ease.out3]]) - .12 * kick(t, ev.window + 1.25, 3, 6);
    boxWorld(ctx, t, cam, { win: t >= ev.window ? winA : 0, coil });
    // the last step: a clunk ring on the floor
    if (t >= ev.stop && t < ev.stop + .35) { const u = (t - ev.stop) / .35, p = toScreen(cam, rx, RY); ctx.save(); ctx.strokeStyle = "#fff"; ctx.globalAlpha = .6 * (1 - u); ctx.lineWidth = 6 * (1 - u); ctx.beginPath(); ctx.ellipse(p[0], p[1], 120 + 160 * ease.out3(u), 20 + 26 * ease.out3(u), 0, 0, TAU); ctx.stroke(); ctx.restore(); }
    // the label "spring": a plain line that touches it
    { const a = clamp((t - ev.window - .35) / .2) * clamp((ev.lapse0 - .1 - t) / .2), p = toScreen(cam, rx + 10, RY - 94 * RS + 7 * RS); X.label(ctx, "spring", 190, p[1] + 150, p[0] - 30, p[1] + 14, a, 40); }
    // the day counter, always top left; it flips when the night is over
    { const a = spring(t, ev.cutBox + .25, 3, 8), fl = clamp((t - (ev.day2 - .1)) / .2), day = t >= ev.day2 ? 2 : 1, b = 1 + .08 * kick(t, ev.day2, 3.4, 8), out = 1 - ease.in3(prog(t, ev.card - .1, .3));
      ctx.save(); ctx.globalAlpha *= clamp((t - ev.cutBox - .2) / .15) * out; X.dayTile(ctx, 172 - 300 * (1 - Math.min(1, a)) , 424, .78 * b, day, fl > 0 && fl < 1 ? fl : 0);
      const sa = clamp((t - ev.lapse0) / .2) * clamp((ev.day2 + .7 - t) / .25); if (sa > 0) { ctx.save(); ctx.globalAlpha *= sa; const px = 420; X.pill(ctx, px, 430, 300, 66, "rgba(27,20,64,.9)", { hi: .08 });
        const ph = (t * 3) % 1; ctx.fillStyle = P.sun; for (let i = 0; i < 2; i++) { ctx.globalAlpha = sa * (.5 + .5 * ((ph + i * .5) % 1)); ctx.beginPath(); const x0 = px - 122 + i * 22; ctx.moveTo(x0, 414); ctx.lineTo(x0 + 22, 430); ctx.lineTo(x0, 446); ctx.fill(); } ctx.globalAlpha = sa;
        X.text(ctx, "speeded up", px + 26, 443, { size: 36, w: 600 }); ctx.restore(); }
      ctx.restore(); }
    // "It does not need water, food or air": three small icons, each with a "no" dash, appear on their words
    const fade = 1 - ease.io(prog(t, ev.card - .1, .35));
    ev.icons.forEach((t0, i) => { const p = spring(t, t0, 3.6, 8); if (t < t0 || fade <= 0) return; const x = 190, y = 700 + i * 190, kind = ["water", "food", "air"][i];
      ctx.save(); ctx.globalAlpha *= fade; ctx.translate(x, y); ctx.scale(p, p); X.sprite(ctx, Props.icon(kind), [-70, -70, 140, 140], 0, 0, 1.4);
      const d = spring(t, t0 + .12, 4, 9); ctx.save(); ctx.translate(56, 46); ctx.scale(d, d); ctx.fillStyle = P.ink; ctx.beginPath(); ctx.arc(0, 0, 25, 0, TAU); ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 7; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(11, 0); ctx.stroke(); ctx.restore();
      X.pill(ctx, 0, 100, X.measure(ctx, kind, { size: 36, w: 600 }) + 44, 54, "rgba(27,20,64,.88)", { hi: false, shadow: false }); X.text(ctx, kind, 0, 112, { size: 36, w: 600 }); ctx.restore(); });
    // "It does not grow": the same height line on day 1 and day 2
    if (t >= ev.grow && fade > 0) { const u = ease.out3(prog(t, ev.grow, .35)), top = toScreen(cam, rx, RY - 264 * RS), x0 = top[0] - 150, x1 = lerp(x0, 800, u);
      ctx.save(); ctx.globalAlpha *= fade; ctx.strokeStyle = P.sun; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.setLineDash([2, 16]); ctx.beginPath(); ctx.moveTo(x0, top[1]); ctx.lineTo(x1, top[1]); ctx.stroke(); ctx.setLineDash([]);
      const a = spring(t, ev.grow + .22, 3.6, 8); ctx.translate(790, top[1] - 62); ctx.scale(a, a); X.pill(ctx, 0, 0, 250, 66, "#fff", { hi: false }); X.text(ctx, "same size", 0, 13, { size: 38, w: 600, color: P.ink }); ctx.restore(); }
    // the verdict: the cream card rises, the sentence appears as Heart says it, then the tag lands on the robot
    if (t >= ev.card - .02) { const u = M.anticipate(t, ev.card, { ant: 0, back: 0, dur: .42, over: 1.4 }), y = 1262 + 560 * (1 - u), hd = M.hold(t, 5, .6), L = vo.h7, out = ease.in3(prog(t, ev.score - .12, .2));
      const d = (yy) => X.card(ctx, CX + hd.x, yy + hd.y + out * 700, 850, 330, "NOW WE KNOW", (c) => {
        const lines = [L.words.slice(0, 4), L.words.slice(4)], size = 62; let hl = prog(t, wordT("h7", "non-living") - .05, .5);
        lines.forEach((ln, i) => { const tw = ln.reduce((q, w) => q + X.measure(c, w.w, { size, fam: X.ATK }), 0) + (ln.length - 1) * size * .3, y0 = -52 + i * 84; let x = -tw / 2 + 8;
          if (i === 1 && hl > 0) { c.fillStyle = "#FFD75A"; X.rr(c, x - 8, y0 - size * .5, (tw + 16) * ease.out3(hl), size * .62, 8); c.fill(); }
          ln.forEach((wd) => { const a = clamp((t - (L.t + wd.t) + .05) / .1); X.text(c, wd.w, x, y0, { size, fam: X.ATK, color: P.ink, align: "left", alpha: .1 + .9 * a }); x += X.measure(c, wd.w, { size, fam: X.ATK }) + size * .3; }); });
        c.strokeStyle = "rgba(43,33,71,.3)"; c.lineWidth = 4; c.setLineDash([2, 14]); c.lineCap = "round"; c.beginPath(); c.moveTo(-370, 92); c.lineTo(380, 92); c.stroke(); c.setLineDash([]);
        X.text(c, "Primary 3 Science  ·  Living and non-living things", -370, 132, { size: 27, w: 500, color: P.ink2, align: "left" }); });
      if (u < .9 && !Sprites.isCollect(ctx)) M.smear(ctx, t, (tt) => d(1262 + 560 * (1 - M.anticipate(tt, ev.card, { ant: 0, back: 0, dur: .42, over: 1.4 }))), { samples: 3, alpha: .2 }); else d(y); }
    if (t >= ev.tag - .2) { const a = t - ev.tag, p = toScreen(cam, rx, RY - 40 * RS), fall = a < 0 ? ease.in2((a + .2) / .2) : 1, sq = M.land(t, ev.tag, .22, 3.4, 9), out = ease.in3(prog(t, ev.score - .15, .2));
      const d = (f2, k) => { ctx.save(); ctx.translate(p[0] + 20, p[1] - 620 * (1 - f2) - out * 900); ctx.rotate((-6 + 5 * kick(t, ev.tag, 3.2, 7)) * Math.PI / 180); ctx.scale(sq.sx, sq.sy * (a < 0 ? 1.25 : 1));
        if (a >= 0) { ctx.save(); ctx.shadowColor = "rgba(255,152,56,.95)"; ctx.shadowBlur = (30 + 50 * pulse(t, ev.tag, 3)) * (G.scale || 1); ctx.fillStyle = "#F27A1E"; X.rr(ctx, -230, -56, 460, 112, 40); ctx.fill(); ctx.restore(); }
        X.pill(ctx, 0, 0, 470, 118, X.vgrad(ctx, -59, 59, "#FFB45C", "#F27A1E"), { r: 42, hi: .2, blur: 16, dy: 10, sa: .4 }); X.text(ctx, "NON-LIVING", 26, 21, { size: 60, ls: 5, shadow: "rgba(18,14,46,.25)" });
        X.tick(ctx, -196, 0, 30, a >= .05 ? 1 : 0); ctx.restore(); };
      if (a < 0 && !Sprites.isCollect(ctx)) M.smear(ctx, t, (tt) => d(ease.in2(clamp((tt - ev.tag + .2) / .2))), { samples: 5, shutter: .9, alpha: .25 }); else d(fall);
      if (a >= 0 && a < .45) { ctx.save(); for (let i = 0; i < 12; i++) { const an = i / 12 * TAU + .3, r = 250 * ease.out3(a / .45) + 40; ctx.fillStyle = i % 2 ? P.sun : "#fff"; ctx.globalAlpha = 1 - a / .45; ctx.beginPath(); ctx.arc(p[0] + 20 + Math.cos(an) * r * 1.5, p[1] + Math.sin(an) * r * .6, 9 * (1 - a / .45) + 2, 0, TAU); ctx.fill(); } ctx.restore(); } }
  }

  /* ---------- scene F: the score ---------- */
  function sceneScore(ctx, t) {
    const z = keys(t, [[ev.score, 1], [ev.cutBean, 1.04, ease.lin]]) * M.punch(t, HITS), cam = { zoom: z, x: 0, y: 0 };
    ctx.save(); M.cam(ctx, cam, .2, W, H); X.sprite(ctx, Props.stage(), FULL, 0, 0, 1, { still: true, key: "stage", px: 1 }); ctx.restore();
    ctx.save(); M.cam(ctx, cam, 1, W, H);
    const you = t >= ev.coin ? 1 : 0, bud = t >= ev.coin2 ? 1 : 0, u = M.anticipate(t, ev.score + .1, { ant: .1, back: .08, dur: .4 }), p = M.arc([754, 268], [CX, 520], clamp(u, 0, 1.06), -60), sc = lerp(.64, 1.42, u);
    const bump = 1 + .1 * kick(t, ev.coin, 3.4, 8) + .08 * kick(t, ev.coin2, 3.4, 8);
    X.scoreboard(ctx, p[0], p[1], sc * bump, you, bud, pulse(t, ev.coin, 6), pulse(t, ev.coin2, 6));
    // "+1 if you pointed right"
    { const a = spring(t, ev.score + .32, 3.4, 8), out = 1; ctx.save(); ctx.translate(CX, 668); ctx.scale(a, a); X.pill(ctx, 0, 0, 560, 84, "rgba(27,20,64,.9)", { hi: .08 });
      X.text(ctx, "if you pointed RIGHT", -34, 15, { size: 42, w: 600 }); X.hand(ctx, 226, 0, .34, 1, P.orange); ctx.restore(); }
    // the coins fly in arcs and land exactly on the beat
    const coin = (t0, from, to, fill, ink, lab) => { const a = (t - (t0 - .38)) / .38; if (a < 0 || t > t0 + .3) return;
      const d = (tt) => { const q = clamp((tt - (t0 - .38)) / .38), pos = M.arc(from, to, ease.in2(q) * .6 + q * .4, 150), s = t < t0 ? lerp(.6, 1.1, q) : 1.1 * (1 - ease.out3((t - t0) / .3)); if (s <= .02) return;
        ctx.save(); ctx.translate(pos[0], pos[1]); ctx.scale(s, s); ctx.shadowColor = "rgba(255,200,58,.9)"; ctx.shadowBlur = 24 * (G.scale || 1); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(0, 0, 46, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = "#fff"; ctx.lineWidth = 5; ctx.stroke();
        G.decor(() => X.text(ctx, lab, 0, 18, { size: 50, color: ink })); ctx.restore(); };
      if (t < t0 && !Sprites.isCollect(ctx)) M.smear(ctx, t, d, { samples: 5, shutter: .9, alpha: .28 }); else d(t);
      if (t >= t0) { const q = (t - t0) / .3; ctx.save(); ctx.strokeStyle = fill; ctx.globalAlpha = 1 - q; ctx.lineWidth = 9 * (1 - q); ctx.beginPath(); ctx.arc(to[0], to[1], 60 + 110 * ease.out3(q), 0, TAU); ctx.stroke(); ctx.restore(); } };
    coin(ev.coin, [CX + 226, 668], [CX - 94 * 1.42, 520], P.sun, P.ink, "+1"); coin(ev.coin2, [SL.L[0] + 60, SL.L[1] - 260], [CX + 94 * 1.42, 520], "#CFC2FF", P.ink, "+1"); coin(ev.coin2, [SL.R[0] - 60, SL.R[1] - 260], [CX + 94 * 1.42, 520], "#CFC2FF", P.ink, "+1");
    // the buddies: Pip and Momo were right (they jump on their point), Basil is a good sport
    for (const who of ["pip", "momo", "basil"]) { const sl = SEATS_F[who], rise = spring(t, ev.score + .12 + { basil: 0, pip: .08, momo: .16 }[who], 2.8, 7), jump = who === "basil" ? { y: 0, sx: 1, sy: 1, air: 0 } : M.hop(t, ev.coin2 + UP + .05 + (who === "momo" ? .08 : 0), { height: 110, up: UP });
      const st = { x: sl[0], y: sl[1] + (1 - rise) * 700 - jump.y, h: sl[2], sx: jump.sx, sy: jump.sy, air: jump.air, gx: sl[0], gy: sl[1] }, a = act(who, t, st, "score");
      if (who !== "basil" && t > ev.coin2 - .1 && t < vo.b2.t) { a.o.expr = "cheering"; }
      X.buddy(ctx, who, st.x, st.y, st.h, t, a.o, { ...a.f, aura: .9 }); }
    { const L = vo.b2; if (t > L.t - .08 && t < L.end + .4) { const pop = spring(t, L.t - .06, 3.6, 9) * (1 - ease.in3(prog(t, L.end + .25, .15))); X.bubble(ctx, CX, 790, bubbleLines(L), t, { pop, size: 48 }); } }
    ctx.restore();
  }

  /* ---------- scene G: the green bean, still. The picture asks the next question. ---------- */
  function sceneBean(ctx, t) {
    const a = t - ev.cutBean, cam = focus(BEAN[0] + 20, BEAN[1] - 34, lerp(3.5, 3.9, a / (ev.end - ev.cutBean)), 1010);
    boxWorld(ctx, t, cam, { noNear: true, robotBlur: 7, win: 0 });
    ctx.save(); const g = ctx.createRadialGradient(W / 2, 1010, 120, W / 2, 1010, 1000); g.addColorStop(0, "rgba(18,14,46,0)"); g.addColorStop(1, "rgba(18,14,46,.72)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    const p = toScreen(cam, BEAN[0], BEAN[1] - 18), gl = .5 + .5 * Math.sin(a * 2.4);
    ctx.save(); ctx.globalCompositeOperation = "screen"; const g2 = ctx.createRadialGradient(p[0], p[1], 20, p[0], p[1], 260); g2.addColorStop(0, `rgba(255,233,168,${.3 + .12 * gl})`); g2.addColorStop(1, "rgba(255,233,168,0)"); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H); ctx.restore();
    const hd = M.hold(t, 9, 1), l1 = spring(t, ev.cutBean + .12, 3.2, 8), l2 = spring(t, ev.cutBean + .12 + BEAT / 2, 3.2, 8);
    ctx.save(); ctx.translate(CX + hd.x, 470 + hd.y); ctx.rotate(-2 * Math.PI / 180);
    ctx.save(); ctx.scale(l1, l1); const w1 = X.measure(ctx, "So is ", { size: 92 }), w2 = X.measure(ctx, "THIS", { size: 92, ls: 4 }); const x0 = -(w1 + w2 + 30) / 2;
    X.text(ctx, "So is", x0, 0, { size: 92, align: "left", shadow: true }); ctx.fillStyle = P.sun; X.rr(ctx, x0 + w1 + 10, -84, w2 + 44, 108, 22); ctx.fill(); X.text(ctx, "THIS", x0 + w1 + 30, 0, { size: 92, align: "left", color: P.ink, ls: 4 }); ctx.restore();
    ctx.translate(0, 124); ctx.scale(l2, l2); X.text(ctx, "non-living?", 0, 0, { size: 104, shadow: true }); ctx.restore();
  }

  /* ---------- the end card ---------- */
  function sceneEnd(ctx, t) {
    const a = t - ev.end, z = (1 + .03 * a / 4) * M.punch(t, HITS), cam = { zoom: z, x: 0, y: 0 };
    ctx.save(); M.cam(ctx, cam, .2, W, H); X.sprite(ctx, Props.stage(), FULL, 0, 0, 1, { still: true, key: "stage", px: 1 }); ctx.restore();
    ctx.save(); M.cam(ctx, cam, 1, W, H);
    // the sun burst the wipe leaves behind
    const R = lerp(1500, 330, ease.out5(a / .5)) * (1 + .02 * Math.sin(a * 3)); ctx.save(); ctx.translate(CX, 640);
    ctx.save(); ctx.rotate(a * .12); ctx.globalAlpha = .16; ctx.fillStyle = P.sun; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 1400, i / 12 * TAU, (i + .5) / 12 * TAU); ctx.fill(); } ctx.restore();
    ctx.shadowColor = "rgba(255,200,58,.8)"; ctx.shadowBlur = 60 * (G.scale || 1); ctx.fillStyle = X.SUN(ctx, -R, R); ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill(); ctx.restore();
    const w1 = spring(t, ev.end + .08, 3.2, 8), w2 = spring(t, ev.end + .08 + BEAT / 2, 3.2, 8), w3 = spring(t, ev.end + BEAT * 1.5, 3.2, 8), hd = M.hold(t, 4, 1);
    ctx.save(); ctx.translate(CX + hd.x, 590 + hd.y); ctx.scale(w1, w1); X.text(ctx, "WATCH THE", 0, 0, { size: 70, color: P.ink, ls: 6 }); ctx.restore();
    ctx.save(); ctx.translate(CX + hd.x, 700 + hd.y); ctx.scale(w2, w2); X.text(ctx, "FULL EPISODE", 0, 0, { size: 84, color: P.ink, ls: 3 }); ctx.restore();
    ctx.save(); ctx.translate(CX, 1000); ctx.scale(w3, w3); X.pill(ctx, 0, 0, 640, 104, P.ink, { hi: .1 }); ctx.fillStyle = P.sun; ctx.beginPath(); ctx.arc(-262, 0, 12, 0, TAU); ctx.fill(); X.text(ctx, "The 30-Day Box", 14, 19, { size: 56 }); ctx.restore();
    ctx.save(); const lp = spring(t, ev.end + BEAT * 2, 3, 8); ctx.translate(CX, 290); ctx.scale(lp * 1.1, lp * 1.1); X.logo(ctx, -186, -32, 1, X.loud("heart", t)); ctx.restore();
    // the buddies wave goodbye; their hops land on the beats
    ["pip", "basil", "momo"].forEach((who, i) => { const x = [215, 500, 785][i], rise = spring(t, ev.end + .15 + i * .09, 2.8, 7), n = Math.floor((t - ev.end) / (BEAT * 2)), hb = M.hop(t, ev.end + (n + 1) * BEAT * 2 + i * .0, { height: i === 1 ? 46 : 30, up: .3, ant: .12 }), hb0 = n >= 0 ? M.hop(t, ev.end + n * BEAT * 2, { height: 30, up: .3 }) : { y: 0, sx: 1, sy: 1 };
      const use = t > ev.end + (n + 1) * BEAT * 2 - .44 ? hb : hb0, h = M.hold(t, i * 5, 1);
      X.buddy(ctx, who, x, 1440 + (1 - rise) * 600 - use.y, 270, t, { seed: i + 1, expr: i === 1 ? "cheering" : "happy", gesture: i === 1 ? undefined : "wave", pose: use.y > 8 ? "jump" : "sit", air: clamp(use.y / 40), facing: i === 0 ? "right" : i === 2 ? "left" : undefined, look: i === 1 ? .8 : 0 }, { sx: use.sx, sy: use.sy, rot: h.rot, aura: .9 }); });
    ctx.restore();
  }

  /* ================= the frame ================= */
  const wipe = (ctx, t, t0, x, y, color, dur = 10 / 30) => { const u = (t - (t0 - dur)) / dur; if (u <= 0 || u >= 1) return; ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 2300 * ease.in2(u) + 20, 0, TAU); ctx.fill(); ctx.restore(); };
  function draw(ctx, t) {
    if (t < ev.ring0) sceneA(ctx, t); else if (t < ev.cutBox) sceneLock(ctx, t); else if (t < ev.score) sceneEvidence(ctx, t); else if (t < ev.cutBean) sceneScore(ctx, t); else if (t < ev.end) sceneBean(ctx, t); else sceneEnd(ctx, t);
    // channel furniture: the logo pill (its heart beats with Heart's voice) and the scoreboard, always in the same place
    if (t < ev.end) { const li = t < ev.ring0 ? spring(t, 1.5, 2.8, 8) : 1; if (li > 0) X.logo(ctx, 60 - 420 * (1 - Math.min(li, 1.02)), 236, .8, X.loud("heart", t));
      const si = spring(t, ev.ring0 + .15, 3, 8); if (t >= ev.ring0 && (t < ev.score || t >= ev.cutBean)) X.scoreboard(ctx, 754 + 420 * (1 - Math.min(si, 1.02)), 268, .64, t >= ev.coin ? 1 : 0, t >= ev.coin2 ? 1 : 0); }
    // captions for Heart's lines (the buddies' lines live in their bubbles; the stamp and the card carry their own words)
    for (const s of S.subtitles) { if (s.who !== "heart" || t < s.t - .1 || t > s.end) continue; if (t >= vo.h3.t - .2 && t <= vo.h3.end + .3) continue; if (t >= ev.card - .08 && t <= vo.h7.end + .3) continue;
      X.caption(ctx, s, t, CX, t >= ev.end ? 1116 : 1446, { size: t >= ev.end ? 44 : 48 }); }
    // colour wipes (a round blob in the next scene's colour grows from the point of interest)
    wipe(ctx, t, ev.ring0, robotX(ev.ring0 - .2) * 1.0, 1010, "#3B2A8C"); wipe(ctx, t, ev.cutBox, CX, 478, "#2B1F6B"); wipe(ctx, t, ev.score, CX, 980, "#3B2A8C"); wipe(ctx, t, ev.end, 545, 990, "#FFC83A");
  }

  globalThis.CAST = {};
  Studio.film({
    draw, fadeOut: 0.5, post: { paper: 0, vignette: 0.3, grain: 0.05 },
    async init() {
      const src = await (await fetch("lib/style.js")).text();
      const kit = new Function(src + ";return { P, defs, grain, vignette, groundShadow, teddy, hamster, robot, leaf, moneyPlant, hand };")();
      Props.init(kit); P = kit.P;
      for (const [fam, file, w] of [["Fredoka", "fredoka-latin-500-normal.woff2", 500], ["Fredoka", "fredoka-latin-600-normal.woff2", 600], ["Fredoka", "fredoka-latin-700-normal.woff2", 700], ["Atkinson Hyperlegible", "atkinson-hyperlegible-latin-700-normal.woff2", 700]]) await Studio.loadFont(fam, "assets/fonts/" + file, w);
      Sprites.install(draw, { defs: Props.defs() });
    },
  });
})();
