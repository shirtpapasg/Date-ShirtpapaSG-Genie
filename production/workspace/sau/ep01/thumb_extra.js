// EP01 thumbnail: the region map on a globe seen from space, centred on Singapore, with haze drifting from Sumatra and Kalimantan
const s = S.wind, NS = 'http://www.w3.org/2000/svg', st = s.stage, v = document.getElementById('v');
const add = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); (p || st).appendChild(e); return e; };
[s.l1, s.l2, s.l3, s.cloud].forEach(e => e && e.setAttribute('opacity', 0)); s.sw.concat(s.ne).forEach(r => r.g.setAttribute('opacity', 0));
// space behind the globe
const bg = s.g.querySelector('rect'); bg.setAttribute('fill', '#020817'); s.g.querySelectorAll(':scope > circle').forEach(c => c.setAttribute('opacity', 0));
let sd = 5; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
for (let i = 0; i < 140; i++) add('circle', {cx: r() * 1920, cy: r() * 1080, r: .8 + r() * 2.2, fill: '#fff', opacity: .3 + r() * .6}, s.g).parentNode.insertBefore(s.g.lastChild, st);
const glow = add('circle', {cx: 960, cy: 600, r: 530, fill: '#4cc9f0', opacity: .35, filter: 'url(#blur)'}, s.g); s.g.insertBefore(glow, st);
// clip the map to a globe around Singapore (stage units: centre 612,418, radius 417)
const cp = document.createElementNS(NS, 'clipPath'); cp.id = 'globe'; const cc = document.createElementNS(NS, 'circle'); cc.setAttribute('cx', 612); cc.setAttribute('cy', 418); cc.setAttribute('r', 417); cp.appendChild(cc); v.querySelector('defs').appendChild(cp);
st.setAttribute('clip-path', 'url(#globe)');
// haze: layered brown-grey plumes along the wind, thickest over Singapore
[[300, 580, 220, 90, .5], [420, 510, 210, 90, .55], [530, 465, 190, 100, .6], [612, 425, 170, 120, .65], [880, 610, 200, 90, .45], [760, 510, 190, 90, .5]]
  .forEach(([x, y, rx, ry, o]) => add('ellipse', {cx: x, cy: y, rx, ry, fill: '#8d7f6a', opacity: o, filter: 'url(#blur)'}));
// curved grid lines on the globe, then shading at the edge for roundness
for (let i = -3; i <= 3; i++) add('path', {d: `M150 ${418 + i * 110} Q612 ${418 + i * 110 - 60 * Math.sign(i || 1) * 0} 1070 ${418 + i * 110}`, fill: 'none', stroke: '#fff', 'stroke-width': 1.5, opacity: .2});
for (let i = -3; i <= 3; i++) add('ellipse', {cx: 612, cy: 418, rx: Math.abs(i) * 140 || 1, ry: 417, fill: 'none', stroke: '#fff', 'stroke-width': 1.5, opacity: .18});
const rg = document.createElementNS(NS, 'radialGradient'); rg.id = 'shade'; rg.setAttribute('cx', '.42'); rg.setAttribute('cy', '.38');
[['0.55', '#000', 0], ['1', '#000', .65]].forEach(([o, c, a]) => { const t = document.createElementNS(NS, 'stop'); t.setAttribute('offset', o); t.setAttribute('stop-color', c); t.setAttribute('stop-opacity', a); rg.appendChild(t); }); v.querySelector('defs').appendChild(rg);
add('circle', {cx: 612, cy: 418, r: 417, fill: 'url(#shade)'});
// Singapore and the fires on top
const sg = st.querySelector('g[transform="translate(612 418)"]'); st.appendChild(sg); sg.querySelector('text').setAttribute('font-size', 40);
add('circle', {cx: 612, cy: 418, r: 34, fill: 'none', stroke: '#fff', 'stroke-width': 6}); add('circle', {cx: 612, cy: 418, r: 56, fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: .6});
s.fires.forEach(f => { st.appendChild(f); f.setAttribute('opacity', 1); f.setAttribute('font-size', 58); });
s.smk.forEach(d => d.e.setAttribute('opacity', 0));
