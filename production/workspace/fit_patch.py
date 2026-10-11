# generic page fixes: size every pill/box to its real (measured) text once fonts are loaded
def apply(h):
    reps = [
     ('const NS = "http://www.w3.org/2000/svg";', 'const NS = "http://www.w3.org/2000/svg";\nconst CHIPS = [];'),
     ('  tx(g, {x: 0, y: fs * .36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: opts.ink || "#fff"}, label);\n  return g;',
      '  tx(g, {x: 0, y: fs * .36, "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: opts.ink || "#fff"}, label);\n  CHIPS.push([g, fs, !!opts.w]);\n  return g;'),
     ('document.fonts.ready.then(() => { window.READY = true; });',
      '''function fitPill(g, pad) { const r = g.querySelector("rect"), t = g.querySelector("text"); if (!r || !t) return 0;
  const need = t.getBBox().width + pad, w = +r.getAttribute("width");
  if (need > w) { const cx = +r.getAttribute("x") + w / 2; set(r, "width", need); set(r, "x", cx - need / 2); } return Math.max(need, w); }
function shrinkText(g, fs) { const r = g.querySelector("rect"), t = g.querySelector("text"); const w = +r.getAttribute("width") - fs * 1.1, bw = t.getBBox().width;
  if (bw > w) set(t, "font-size", fs * w / bw); }
document.fonts.ready.then(() => {
  CHIPS.forEach(([g, fs, fixed]) => fixed ? shrinkText(g, fs) : fitPill(g, fs * 1.3));
  KW.forEach(K => { fitPill(K.big, 70); K.sw = fitPill(K.small, 36); });
  CAPS.forEach(({g}) => fitPill(g, 64));
  window.READY = true; });'''),
    ]
    for a, b in reps:
        assert h.count(a) == 1, a[:50]
        h = h.replace(a, b)
    return h
