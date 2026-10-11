// "My mind map" phone: the episode's own map from TheOneApp's maker (780x1688 shot), ring on "Saved ✓", then scroll to show the whole map
(() => { const s = S.mindmap, B = window.MMPHONE; if (!s || !s.shot || !B) return;
  const k = 224 / 780, H = 1688 * k, WIN = 327;
  s.shot.setAttribute("href", B.href); s.shot.setAttribute("height", H);
  const D = Math.max(0, (B.map[1] + B.map[3] + 14) * k - WIN);
  const ring = el("rect", {fill: "none", stroke: "#f72585", "stroke-width": 4, rx: 9}, s.shot.parentNode);
  const cues = TL.cues.habit2 || {}, last = w => { let v = null; for (const key in cues) if (key === w || key.startsWith(w + "#")) v = Math.max(v ?? -1, cues[key]); return v; };
  const run0 = s.run;
  s.run = t => { run0(t); if (s.ring && s.ring.tagName === "rect") op(s.ring, 0);
    const t1 = SC.mindmap.t1, sv = C("habit2", "save"), mk = (last("tap") ?? (sv + 2.5)) - .2;
    const off = -122 - D * ramp(t, mk + .4, Math.min(t1 - .3, mk + 3)); set(s.shot, "y", off);
    set(ring, "x", -112 + B.saved[0] * k - 3); set(ring, "y", off + B.saved[1] * k - 3); set(ring, "width", B.saved[2] * k + 6); set(ring, "height", B.saved[3] * k + 6);
    op(ring, on(t, sv + .7, D > 0 ? mk + .4 : t1 + .5, .15) * (.6 + .4 * Math.sin(t * 8))); }; })();
