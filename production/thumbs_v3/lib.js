/* Shared drawing helpers for scenes.js. Everything returns an SVG string on a 1280x720 canvas. */
const K = '#1b1b3a', Y = '#ffd23f';
let uid = 0;
const id = p => p + (++uid);

const em = (ch, x, y, s, rot = 0, extra = '') =>
  `<text class="em" x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central" ${rot ? `transform="rotate(${rot} ${x} ${y})"` : ''} ${extra}>${ch}</text>`;

// big outlined word/symbol drawn inside the scene (use sparingly)
const word = (t, x, y, s, fill = '#fff', anchor = 'middle', rot = 0) =>
  `<g font-weight="700" font-size="${s}" text-anchor="${anchor}" stroke-linejoin="round" ${rot ? `transform="rotate(${rot} ${x} ${y})"` : ''}>` +
  `<text x="${x}" y="${y + 6}" fill="${K}" stroke="${K}" stroke-width="${s * 0.26}">${t}</text>` +
  `<text x="${x}" y="${y}" fill="${K}" stroke="${K}" stroke-width="${s * 0.2}">${t}</text><text x="${x}" y="${y}" fill="${fill}">${t}</text></g>`;

function vgrad(stops) {
  const g = id('g');
  return [g, `<linearGradient id="${g}" x1="0" x2="0" y1="0" y2="1">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`];
}
function rgrad(stops, cx = .5, cy = .5, r = .5) {
  const g = id('r');
  return [g, `<radialGradient id="${g}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</radialGradient>`];
}
const sky = stops => { const [g, d] = vgrad(stops); return `<defs>${d}</defs><rect width="1280" height="720" fill="url(#${g})"/>`; };
// soft spotlight behind the hero + dark vignette at the edges
function spot(cx, cy, r, c = '#fff', a = .55) {
  const [g, d] = rgrad([[0, c, a], [1, c, 0]]);
  return `<defs>${d}</defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${g})"/>`;
}
function vignette(a = .45, c = '#0b0b25') {
  const [g, d] = rgrad([[0.55, c, 0], [1, c, a]], .5, .5, .75);
  return `<defs>${d}</defs><rect width="1280" height="720" fill="url(#${g})"/>`;
}
const blurred = s => `<g filter="url(#bgblur)">${s}</g>`;
const sticker = s => `<g filter="url(#sticker)">${s}</g>`;
const shadow = s => `<g filter="url(#shadow)">${s}</g>`;

function clouds(list) {
  return list.map(([x, y, s]) => `<g transform="translate(${x},${y}) scale(${s})" fill="#fff" opacity=".9"><ellipse cx="0" cy="0" rx="70" ry="30"/><circle cx="-30" cy="-18" r="30"/><circle cx="12" cy="-28" r="38"/><circle cx="48" cy="-10" r="24"/></g>`).join('');
}
function hdb(x, y, w, h, c) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  for (let yy = y + 14; yy < y + h - 10; yy += 22) for (let xx = x + 10; xx < x + w - 14; xx += 20) s += `<rect x="${xx}" y="${yy}" width="11" height="12" fill="#fff" opacity=".55"/>`;
  return s;
}
function bokeh(list, c = '#fff') {
  return list.map(([x, y, r, a]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${a}"/>`).join('');
}
function stars(n, seed = 7, ymax = 520) {
  let s = '', r = seed;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) s += `<circle cx="${(rnd() * 1280).toFixed(0)}" cy="${(rnd() * ymax).toFixed(0)}" r="${(1 + rnd() * 2.6).toFixed(1)}" fill="#fff" opacity="${(.4 + rnd() * .6).toFixed(2)}"/>`;
  return s;
}

// thick arrow with dark outline; bend > 0 curves it
function arrow(x1, y1, x2, y2, { c = '#ff3b3b', w = 18, bend = 0, ol = K, head = 2.5 } = {}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  const cx = mx - dy / L * bend, cy = my + dx / L * bend;
  let ex = x2 - cx, ey = y2 - cy; const el = Math.hypot(ex, ey); ex /= el; ey /= el;
  const hl = w * head, hw = w * head * 0.62, bx = x2 - ex * hl, by = y2 - ey * hl;
  const shaft = `M${x1} ${y1} Q${cx} ${cy} ${bx + ex * 3} ${by + ey * 3}`;
  const hp = `M${x2} ${y2} L${bx - ey * hw} ${by + ex * hw} L${bx + ey * hw} ${by - ex * hw} Z`;
  return `<g stroke-linecap="round" stroke-linejoin="round"><path d="${shaft}" fill="none" stroke="${ol}" stroke-width="${w + 13}"/><path d="${hp}" fill="${ol}" stroke="${ol}" stroke-width="13"/>` +
    `<path d="${shaft}" fill="none" stroke="${c}" stroke-width="${w}"/><path d="${hp}" fill="${c}" stroke="${c}" stroke-width="2"/></g>`;
}

// torch pointing right, lens centre at (x,y)
function torch(x, y, s = 1, rot = 0, c = '#19b5a5') {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" stroke="${K}" stroke-width="7" stroke-linejoin="round">
    <rect x="-215" y="-30" width="150" height="60" rx="16" fill="${c}"/>
    <rect x="-180" y="-30" width="18" height="60" fill="#0e8377" stroke="none"/><rect x="-150" y="-30" width="18" height="60" fill="#0e8377" stroke="none"/>
    <rect x="-215" y="-30" width="150" height="60" rx="16" fill="none"/>
    <rect x="-128" y="-44" width="34" height="16" rx="6" fill="#ff5a5a"/>
    <path d="M-70 -30 L-8 -56 L-8 56 L-70 30 Z" fill="#0fa091"/>
    <ellipse cx="-6" cy="0" rx="15" ry="56" fill="#fff6b0"/>
  </g>`;
}
const beam = (pts, a = 1) => `<polygon points="${pts}" fill="url(#beamG)" opacity="${a}"/>`;

// cartoon hand: fingers point right, wrist at (x,y); arm runs off to the left (armLen)
function hand(x, y, s = 1, rot = 0, fill = '#ffcf9e', armLen = 400, sleeve = null) {
  const f = (yy, len) => `<rect x="78" y="${yy}" width="${len}" height="24" rx="12" fill="${fill}"/>`;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" stroke="${K}" stroke-width="7" stroke-linejoin="round">
    <rect x="${-armLen}" y="-34" width="${armLen + 30}" height="68" rx="20" fill="${fill}"/>
    ${sleeve ? `<rect x="${-armLen}" y="-44" width="${armLen - 150}" height="88" rx="14" fill="${sleeve}"/>` : ''}
    <rect x="22" y="-86" width="30" height="66" rx="15" fill="${fill}" transform="rotate(28 37 -30)"/>
    ${f(-50, 78)}${f(-25, 92)}${f(0, 86)}${f(25, 66)}
    <rect x="0" y="-52" width="104" height="104" rx="34" fill="${fill}"/>
  </g>`;
}

// lab thermometer (vertical). level 0..1
function thermo(x, y, h, level, w = 44) {
  const top = y, bot = y + h, by = bot - 10, r = w * 0.85;
  const ly = by - r - (h - r * 2 - 30) * level;
  let ticks = '';
  for (let i = 0; i <= 10; i++) { const ty = by - r - 8 - (h - r * 2 - 40) * i / 10; ticks += `<line x1="${x + w / 2 + 2}" y1="${ty}" x2="${x + w / 2 + (i % 5 ? 14 : 24)}" y2="${ty}" stroke="${K}" stroke-width="5" stroke-linecap="round"/>`; }
  return `<g stroke="${K}" stroke-width="7"><rect x="${x - w / 2}" y="${top}" width="${w}" height="${h - r}" rx="${w / 2}" fill="#fff"/><circle cx="${x}" cy="${by - r + 6}" r="${r}" fill="#fff"/></g>
    <circle cx="${x}" cy="${by - r + 6}" r="${r - 9}" fill="#ff3b3b"/><rect x="${x - w / 2 + 12}" y="${ly}" width="${w - 24}" height="${by - r - ly}" rx="6" fill="#ff3b3b"/>${ticks}`;
}

// electronic balance; top of pan at y, centre x
function ebal(x, y, w, reading) {
  return `<g stroke="${K}" stroke-width="7" stroke-linejoin="round">
    <rect x="${x - w / 2}" y="${y + 26}" width="${w}" height="78" rx="16" fill="#eef1f8"/>
    <rect x="${x - w / 2 + 14}" y="${y}" width="${w - 28}" height="20" rx="8" fill="#b9c2d8"/>
    <rect x="${x - 20}" y="${y + 18}" width="40" height="12" fill="#8d97b3" stroke-width="5"/>
    <rect x="${x - w * 0.34}" y="${y + 42}" width="${w * 0.68}" height="48" rx="9" fill="#12243a"/></g>
    <text x="${x}" y="${y + 81}" font-size="42" font-weight="700" text-anchor="middle" fill="#7dffb0">${reading}</text>`;
}

// yellow highlight ring that says "look here"
const ring = (cx, cy, rx, ry = rx, c = Y) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${K}" stroke-width="20"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-width="10"/>`;

module.exports = { K, Y, id, em, word, vgrad, rgrad, sky, spot, vignette, blurred, sticker, shadow, clouds, hdb, bokeh, stars, arrow, torch, beam, hand, thermo, ebal, ring };
