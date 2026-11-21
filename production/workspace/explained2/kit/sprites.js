// sprites.js: draw our SVG rigs and props (Buddies.draw, kit/style.js: they return SVG strings) on the animation-studio
// plugin's canvas, deterministically.  How: a frame first runs its draw once as a "collect" pass that only lists the SVG
// sprites it needs; missing ones are decoded (async), then the real draw runs with every sprite ready. A sprite is keyed
// by its own SVG text, so the same t always gives the same picture, on any worker, in any order.
//   Sprites.install(drawFn)                 call once after Studio.film(...): wraps window.renderAt / probeAt
//   Sprites.draw(ctx, { svg, vb: [x, y, w, h], defs, still, key }, x, y, scale)
//        svg: inner SVG markup in its own units; vb: the box of it to rasterise; (x, y): where the SVG origin goes on the canvas.
//        still: true = a heavy static layer (blurs, grain): rasterised once to a bitmap and kept.
//   window.prepareAt(t)                     makes the sprites of frame t ready (the board/poster patches call it)
(function (root) {
  "use strict";
  const cache = new Map(); let pending = null, tick = 0, DEFS = "", collectCtx = null, drawFn = null;
  const KEEP = 90;      // prepared frames a moving sprite stays cached for (boards, QA sheets)
  function load(e, o) {
    const [vx, vy, vw, vh] = o.vb, s = o.px || 1;
    const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(vw * s)}" height="${Math.ceil(vh * s)}" viewBox="${vx} ${vy} ${vw} ${vh}">${o.defs === false ? "" : DEFS}${o.svg}</svg>`;
    const img = new Image();
    const p = new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("sprite failed: " + String(o.key || o.svg).slice(0, 80))); });
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(doc);
    return p.then(() => (img.decode ? img.decode().catch(() => {}) : null)).then(() => {
      if (o.still) { const c = document.createElement("canvas"); c.width = Math.ceil(vw * s); c.height = Math.ceil(vh * s); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); e.img = c; }
      else e.img = img;
      e.ready = true;
    });
  }
  function draw(ctx, o, x = 0, y = 0, scale = 1) {
    const key = o.key || o.svg; let e = cache.get(key);
    if (!e) { if (!pending) return false; e = { ready: false, still: !!o.still, used: tick }; cache.set(key, e); pending.push(load(e, o)); return false; }
    e.used = tick; if (!e.ready || ctx === collectCtx) return false;
    const [vx, vy, vw, vh] = o.vb; ctx.drawImage(e.img, x + vx * scale, y + vy * scale, vw * scale, vh * scale); return true;
  }
  // list (and load) what frame t needs; returns null when everything is already there (then drawing is synchronous)
  function prepare(t) {
    tick++; pending = [];
    if (!collectCtx) { const c = document.createElement("canvas"); c.width = c.height = 8; collectCtx = c.getContext("2d"); }
    collectCtx.setTransform(.005, 0, 0, .005, 0, 0);
    try { if (root.G && root.G.setTime) root.G.setTime(t); drawFn(collectCtx, t); } finally { const p = pending; pending = null;
      for (const [k, e] of cache) if (!e.still && tick - e.used > KEEP) cache.delete(k);
      return p.length ? Promise.all(p) : null; }   // eslint-disable-line no-unsafe-finally
  }
  function install(fn, { defs = "" } = {}) {
    drawFn = fn; DEFS = defs; let rAt = null, pAt = null;
    const wrap = (get) => function (t, ...a) { const p = prepare(t); return p ? p.then(() => get()(t, ...a)) : get()(t, ...a); };
    Object.defineProperty(root, "renderAt", { configurable: true, set: (v) => { rAt = v; }, get: () => (rAt ? wrap(() => rAt) : undefined) });
    Object.defineProperty(root, "probeAt", { configurable: true, set: (v) => { pAt = v; }, get: () => (pAt ? wrap(() => pAt) : undefined) });
    root.prepareAt = (t) => prepare(t) || Promise.resolve();
  }
  root.Sprites = { install, draw, prepare, isCollect: (ctx) => ctx === collectCtx, size: () => cache.size };
})(typeof window !== "undefined" ? window : globalThis);
