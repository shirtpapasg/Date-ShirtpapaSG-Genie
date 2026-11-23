// pond16.js: EP16's animals and the two sets (Stage 2, drawn 2026-11-23). Loaded after home15.js / garden15.js (EP15's garden helpers).
// THE ANIMALS (true shapes from the script's section 3 Realism, drawn in the buddies' warm, rounded, big-eyed style; every one moves):
//   frog eggs in their clear jelly (eggClump), the tadpole at each stage (tadpole16: no legs, back legs, four legs with the tail shrinking),
//   the young frog (frog16: four legs, webbed back feet, moist shiny skin, a pale stripe along each side, no tail), the hen and her chicks
//   (hen16 / chick16: both peck), the grasshopper (hopper16: the nymph with NO wings, the adult with long wings folded along its back, the
//   empty skin: pale, see-through, hollow, split down the back), the cockroach in Pip's drawings (roach16, cute and clean; eggCase16 the brown
//   purse with two rows of eggs), the four-lined tree frog (treeFrog16, Part 1's hidden animal) and its foam nest, the praying mantis (mantis16,
//   Part 2's hidden animal) and its egg case, the lime butterfly caterpillar (caterpillar16, the dare).
// THE SETS: BG.pond16 (the garden's little pond, morning; baked) + VP16(t, o, cam) live (the light, ripples, the egg clump, tadpoles, a
//   dragonfly, drips, the tree frog in its spot); BG.grass16 (the grassy corner by the void deck; baked) + VG16(t, o, cam) live (the grass
//   sways, the hen and chicks, the grasshopper and its skin, a butterfly, a bird, the mantis in its spot).

const XDEFS16 = () => `${lg("p16Water", [[0, "#5FB7C9"], [1, "#2F7F94"]])}${lg("p16Deep", [[0, "#3E9AB0"], [1, "#1E5E70"]])}${lg("p16Dawn", [[0, "#7E8FD6"], [.55, "#F7B98A"], [1, "#FFE2B0"]])}
  ${lg("p16Stone", [[0, "#C9C2B6"], [1, "#9A9184"]])}${lg("p16UW", [[0, "#9ED9C4"], [.5, "#4FA39A"], [1, "#24665F"]])}${rg("p16Jelly", [[0, "#FFFFFF", .75], [.7, "#E4F6F0", .4], [1, "#BFE3DA", .55]], .4, .35, .6)}
  ${lg("p16Hen", [[0, "#C9783A"], [1, "#8E4A1F"]])}${rg("p16Chick", [[0, "#FFF6C8"], [1, "#F7D86A"]], .4, .35, .7)}${lg("p16Hop", [[0, "#9ED65A"], [1, "#5FA83A"]])}${lg("p16Roach", [[0, "#B46A38"], [1, "#7A3E1C"]])}
  ${lg("p16Sky", [[0, "#7CC8FF"], [.7, "#D6F0FF"], [1, "#F6FBEF"]])}${lg("p16Grass", [[0, "#9ED877"], [1, "#5FAE4E"]])}`;

/* ---------------------------------------------------------------- the animals ---------------------------------------------------------------- */
const INK16 = "#3A2E52";
const eye16 = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.white || "#fff"}" stroke="${o.line || INK16}" stroke-width="${n2(r * .18)}"/>` + (o.shut ? `<path d="M${n2(x - r * .7)} ${y} Q${x} ${n2(y + r * .5)} ${n2(x + r * .7)} ${y}" stroke="${INK16}" stroke-width="${n2(r * .22)}" fill="none" stroke-linecap="round"/>`
  : `<circle cx="${n2(x + (o.lx || 0) * r * .25)}" cy="${n2(y + r * .05)}" r="${n2(r * .58)}" fill="${INK16}"/><circle cx="${n2(x + (o.lx || 0) * r * .25 - r * .2)}" cy="${n2(y - r * .2)}" r="${n2(r * .2)}" fill="#fff"/>`);
const blink16 = (t, ph = 0) => ((t + ph) % 3.7) < .12;

// frog eggs: a clump of clear jelly balls, each with its dark egg (origin = the clump's middle). o.n eggs, o.r size, o.wob
function eggClump(t, o = {}) { const n = o.n || 46, r = o.r || 13, R = o.R || 90; let s = `<ellipse rx="${R * 1.1}" ry="${R * .62}" fill="#E8F6F2" opacity=".45" stroke="#BFE3DA" stroke-width="3"/>`;
  for (let i = 0; i < n; i++) { const a = hash(i, 11) * Math.PI * 2, d = Math.sqrt(hash(i, 13)) * R, x = Math.cos(a) * d * 1.05 + 2 * Math.sin(t * 1.3 + i), y = Math.sin(a) * d * .58 + 1.5 * Math.sin(t * 1.1 + i * 2);
    s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${r}" fill="url(#p16Jelly)" stroke="#A9D6CC" stroke-width="1.6"/><circle cx="${n2(x + r * .1)}" cy="${n2(y + r * .05)}" r="${n2(r * .38)}" fill="#2E2A36"/><circle cx="${n2(x - r * .35)}" cy="${n2(y - r * .4)}" r="${n2(r * .2)}" fill="#fff" opacity=".85"/>`; }
  return s; }
// a tadpole (origin = its body's middle, facing right). stage 0: no legs; 1: two back legs; 2: four legs, the tail shrinking (o.tail 0..1)
function tadpole16(t, stage = 0, o = {}) { const ph = o.ph || 0, w = (o.swim === false ? 3 : 10) * Math.sin(t * 9 + ph), tl = o.tail === undefined ? (stage >= 2 ? .45 : 1) : o.tail, c = o.col || "#5E5844", d = "#3E3A2C", L = 78 * tl;
  let s = "";
  if (tl > .02) s += `<path d="M-14 -6 Q${n2(-14 - L * .45)} ${n2(-10 + w * .5)} ${n2(-14 - L)} ${n2(w)} Q${n2(-14 - L * .45)} ${n2(12 + w * .5)} -14 8z" fill="#8C866E" opacity=".75" stroke="${d}" stroke-width="2.5"/><path d="M-14 0 Q${n2(-14 - L * .5)} ${n2(w * .5)} ${n2(-14 - L * .95)} ${n2(w)}" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (stage >= 1) { const k = 4 * Math.sin(t * 6 + ph); s += `<path d="M-12 8 q-10 12 -22 ${n2(14 + k)} l-8 4 M-6 10 q-6 14 -16 ${n2(18 - k)} l-8 3" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
  if (stage >= 2) s += `<path d="M14 10 q4 10 0 16 l6 2 M6 12 q0 10 -6 14 l6 3" stroke="${c}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="2" cy="0" rx="${stage >= 2 ? 24 : 22}" ry="${stage >= 2 ? 15 : 17}" fill="${c}" stroke="${d}" stroke-width="3"/><ellipse cx="4" cy="7" rx="13" ry="7" fill="#A8A288" opacity=".7"/>`
    + eye16(13, -6, 5.5, { shut: blink16(t, ph) }) + `<path d="M18 4 q4 2 6 -1" stroke="${d}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return s; }
// the young pond frog (origin = under its feet, facing right): green-brown, a pale stripe along each side, webbed back feet, moist and
// shiny, no tail; its throat pulses; o.hop 0..1 (a little jump), o.blink
function frog16(t, o = {}) { const th = 1 + .12 * Math.max(0, Math.sin(t * 4.5 + (o.ph || 0))), hp = o.hop || 0, b = "#7E9A48", d = "#4E6428", st = "#EDE6A6";
  return `<g transform="translate(0 ${n2(-30 * hp)})"><path d="M-60 0 Q-96 -6 -84 -26 Q-70 -40 -38 -30 L-22 -6z" fill="${b}" stroke="${d}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M-62 0 l-26 2 l8 -8 l-10 -4 l14 -2 l-4 -8 l18 8z" fill="#9DB866" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-46 -48 Q-40 -92 12 -90 Q58 -88 64 -50 Q66 -20 40 -8 Q0 4 -36 -6 Q-56 -18 -46 -48z" fill="${b}" stroke="${d}" stroke-width="4"/>
    <path d="M-40 -40 Q0 -54 52 -46" stroke="${st}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="-18" rx="30" ry="12" fill="#D8DDA0" opacity=".8"/>
    <ellipse cx="46" cy="-16" rx="${n2(15 * th)}" ry="${n2(10 * th)}" fill="#E6E6B6"/>
    <path d="M30 -14 Q38 2 30 4 l-10 2 l10 -4 l-4 6 l12 -4 l6 4 l-2 -6" fill="${b}" stroke="${d}" stroke-width="3.5" stroke-linejoin="round"/>
    ${[[-26, -76, 4], [8, -82, 3], [-10, -62, 3.5], [36, -70, 2.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#5E7834"/>`).join("")}
    <ellipse cx="-10" cy="-78" rx="16" ry="6" fill="#fff" opacity=".45" transform="rotate(-12 -10 -78)"/><ellipse cx="44" cy="-62" rx="7" ry="3" fill="#fff" opacity=".5"/>
    ${eye16(34, -86, 15, { shut: o.blink === undefined ? blink16(t, 1.3) : o.blink, white: "#F4E8B0" })}<path d="M50 -44 Q60 -40 66 -48" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`; }
// the four-lined tree frog (Part 1's hidden animal; origin = under its toes, facing right): slim, brown-beige, darker stripes down the back,
// big round toe pads; o.lift 0..1 lifts one sticky front foot; the throat pulses
function treeFrog16(t, o = {}) { const th = 1 + .1 * Math.max(0, Math.sin(t * 5 + (o.ph || 0))), lf = o.lift || 0, b = "#D3B07A", d = "#7A5A34", s2 = "#9A7446";
  return `<path d="M-54 0 Q-78 -8 -70 -24 Q-60 -34 -36 -26 L-24 -4z" fill="${b}" stroke="${d}" stroke-width="3.5"/>${[[-76, 2], [-64, 4], [-52, 4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#E9CFA0" stroke="${d}" stroke-width="2"/>`).join("")}
    <path d="M-52 -36 Q-46 -74 6 -76 Q52 -76 60 -44 Q62 -20 40 -10 Q0 0 -36 -8 Q-58 -18 -52 -36z" fill="${b}" stroke="${d}" stroke-width="3.5"/>
    <path d="M-44 -46 Q0 -70 50 -60 M-46 -30 Q0 -52 50 -40" stroke="${s2}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>
    <ellipse cx="42" cy="-16" rx="${n2(13 * th)}" ry="${n2(8 * th)}" fill="#F3E3C0"/>
    <g transform="rotate(${n2(-40 * lf)} 30 -12)"><path d="M28 -12 Q36 0 30 4" stroke="${b}" stroke-width="9" fill="none" stroke-linecap="round"/>${[[24, 6], [32, 7], [40, 4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#E9CFA0" stroke="${d}" stroke-width="2"/>`).join("")}</g>
    ${eye16(32, -72, 12, { shut: o.blink === undefined ? blink16(t, .4) : o.blink, white: "#F6DE9C" })}<path d="M46 -38 Q54 -34 58 -42" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`; }
const treeFrogAt = (t, x, y, k = .42, o = {}) => TF(x, y, k * (o.flip ? -1 : 1), treeFrog16(t, o), o.rot || 0, k);
// the praying mantis (Part 2's hidden animal; origin = where its feet hold the stem, upright, facing right): green, a long body, a small
// triangle head with big eyes that turns, two front legs folded in front like hands; it sways like a leaf
function mantis16(t, o = {}) { const sw = (o.sway === undefined ? 1 : o.sway) * 3 * Math.sin(t * 1.4 + (o.ph || 0)), hd = (o.turn || 0) * 18 + 6 * Math.sin(t * .9), g = "#7CC84A", d = "#3F7F2A";
  return `<g transform="rotate(${n2(sw)})"><path d="M-6 -40 Q-40 -10 -54 30 M-2 -40 Q-20 0 -34 34 M2 -60 Q-30 -60 -44 -36 M4 -60 Q-10 -40 -20 -20" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-8 -30 Q-34 10 -30 54 Q-22 70 -12 52 Q-2 10 6 -26z" fill="${g}" stroke="${d}" stroke-width="3.5"/><path d="M-10 -20 Q-26 14 -22 48" stroke="#A9DE7A" stroke-width="5" fill="none" opacity=".8"/>
    <path d="M-2 -36 Q0 -100 6 -126 Q12 -130 14 -124 Q12 -96 8 -36z" fill="${g}" stroke="${d}" stroke-width="3.5"/>
    <path d="M10 -112 Q36 -110 44 -90 Q40 -70 22 -68 Q34 -80 30 -94z" fill="${g}" stroke="${d}" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 -68 Q10 -60 12 -46 Q20 -56 28 -60" fill="${g}" stroke="${d}" stroke-width="3.5"/>
    <g transform="translate(10 -134) rotate(${n2(hd)}) scale(1.3)"><path d="M-22 -10 L22 -10 L2 20z" fill="${g}" stroke="${d}" stroke-width="3.5" stroke-linejoin="round"/>${eye16(-14, -10, 9, { white: "#D9F5B8", shut: blink16(t, 2.1) })}${eye16(14, -10, 9, { white: "#D9F5B8", shut: blink16(t, 2.1) })}<path d="M-4 8 q4 3 8 0" stroke="${d}" stroke-width="2" fill="none"/><path d="M-6 -16 Q-20 -46 -34 -54 M6 -16 Q16 -46 30 -56" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></g>`; }
const mantisAt = (t, x, y, k = .4, o = {}) => TF(x, y, k * (o.flip ? -1 : 1), mantis16(t, o), o.rot || 0, k);
// the hen (origin = under her feet, facing right): glossy brown, a red comb and wattles, two legs; o.peck 0..1 (the head goes down)
function hen16(t, o = {}) { const pk = o.peck || 0, wk = o.walk ? Math.sin(t * 7) : 0, b = "url(#p16Hen)", d = "#6E3814";
  const head = `<g transform="translate(${n2(70 + 30 * pk)} ${n2(-150 + 110 * pk)}) rotate(${n2(60 * pk)})"><path d="M-10 -36 q4 -16 12 -6 q6 -18 14 -4 q8 -14 12 4 q4 10 -6 14z" fill="#E0402E" stroke="#9A2A1E" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="6" cy="-10" r="28" fill="#B5652E" stroke="${d}" stroke-width="4"/><path d="M30 -16 L52 -8 L30 0z" fill="#F2B23A" stroke="#B8761C" stroke-width="3" stroke-linejoin="round"/><path d="M26 2 q8 16 -2 20 q-8 -8 -4 -18z" fill="#E0402E" stroke="#9A2A1E" stroke-width="2.5"/>${eye16(14, -16, 7, { shut: blink16(t, .7), white: "#FFE7A8" })}</g>`;
  return `<path d="M-14 -40 l${n2(-6 + 6 * wk)} 40 l-14 0 m14 0 l10 -2 M16 -40 l${n2(4 - 6 * wk)} 40 l-12 2 m12 -2 l12 0" stroke="#E8A33A" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${[-30, -10, 10].map((a, i) => `<path d="M-80 -110 Q-130 -150 -118 -200 Q-90 -190 -70 -130z" fill="${i % 2 ? "#5E2A10" : "#7A3A16"}" stroke="${d}" stroke-width="3.5" stroke-linejoin="round" transform="rotate(${a} -80 -110)"/>`).join("")}
    <path d="M-100 -90 Q-110 -150 -40 -160 Q30 -170 66 -140 Q90 -110 70 -70 Q40 -36 -20 -38 Q-80 -40 -100 -90z" fill="${b}" stroke="${d}" stroke-width="4.5"/>
    <path d="M-60 -110 Q-10 -130 30 -100 Q0 -70 -50 -80z" fill="#9A5222" stroke="${d}" stroke-width="3.5"/><path d="M-44 -100 q14 -8 30 -2 M-40 -88 q16 -6 30 0" stroke="#C9803E" stroke-width="3" fill="none"/>
    <path d="M40 -140 Q62 -160 ${n2(72 + 30 * pk)} ${n2(-148 + 100 * pk)}" stroke="#B5652E" stroke-width="40" fill="none" stroke-linecap="round"/>` + head; }
// a chick (origin = under its feet, facing right): small, pale yellow, fluffy, two legs, a small beak; o.peck 0..1
function chick16(t, o = {}) { const pk = o.peck || 0, ph = o.ph || 0, fl = [...Array(9)].map((_, i) => { const a = i / 9 * Math.PI * 2; return `<circle cx="${n2(-6 + 40 * Math.cos(a))}" cy="${n2(-46 + 32 * Math.sin(a))}" r="9" fill="#FFF1A8"/>`; }).join("");
  return `<path d="M-10 -16 v16 l-8 2 M-10 0 l8 0 M8 -16 v16 l-8 2 M8 0 l8 0" stroke="#E8A33A" stroke-width="4.5" fill="none" stroke-linecap="round"/>${fl}<ellipse cx="-6" cy="-46" rx="42" ry="34" fill="url(#p16Chick)" stroke="#D9B44A" stroke-width="3"/><path d="M-30 -52 Q-50 -40 -34 -30 Q-24 -36 -22 -46z" fill="#F7D86A" stroke="#D9B44A" stroke-width="2.5"/>
    <g transform="translate(${n2(22 + 14 * pk)} ${n2(-74 + 50 * pk)}) rotate(${n2(50 * pk)})"><circle r="24" fill="url(#p16Chick)" stroke="#D9B44A" stroke-width="3"/><path d="M-4 -24 q4 -10 8 0" stroke="#F7D86A" stroke-width="4" fill="none"/><path d="M20 -4 L34 2 L20 8z" fill="#F29A2E" stroke="#B8661C" stroke-width="2.5" stroke-linejoin="round"/>${eye16(8, -4, 6, { shut: blink16(t, ph) })}<circle cx="2" cy="8" r="4" fill="#FFB4A0" opacity=".7"/></g>`; }
// pecking: a quick dip every so often, out of step per bird (k = which bird)
const peckAt = (t, k, every = 1.9) => { const u = ((t + k * .73) % every) / every; return u < .22 ? Math.sin(Math.PI * u / .22) : 0; };
// the grasshopper (origin = under its feet, facing right). o.adult: long wings folded along its back; o.skin: the empty old skin (pale,
// see-through, hollow, split down the back, no eyes); o.feel 0..1 feelers twitch; o.lit: { legs, feelers, jump, wings } 0..1 pulses
function hopper16(t, o = {}) { const ad = !!o.adult, sk = !!o.skin, li = o.lit || {}, g = sk ? "#F4E9C8" : ad ? "#8CC84E" : "#9CD65E", d = sk ? "#BFA978" : "#3F7F2A", fo = sk ? .55 : 1, tw_ = (o.feel === undefined ? 1 : o.feel) * 6 * Math.sin(t * 5 + (o.ph || 0));
  const lw = (k, base) => base + 4 * (li[k] || 0), lc = (k) => li[k] > .05 ? mixC(d, ["#0F766E", "#E36A12", "#7C3AED", "#1F8A4C"][["legs", "feelers", "jump", "wings"].indexOf(k)], li[k]) : d;
  const blen = ad ? 1 : .92, hx = ad ? 74 : 66;
  let s = "";
  // the far-side back leg (behind the body), then (after the body) the near back leg: a thick thigh from the middle of the body angled up
  // and back along the abdomen, the shin folded under it, the foot on the ground under the abdomen
  const hind = (dx, op) => `<g opacity="${n2(fo * op)}" transform="translate(${dx} 0)"><path d="M12 -40 Q-20 -84 -78 -82 Q-92 -76 -80 -66 Q-36 -58 0 -28z" fill="${g}" stroke="${lc("jump")}" stroke-width="${lw("jump", 3.5)}" stroke-linejoin="round"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${-10 - i * 13} ${-48 - i * 5} l-8 -10" stroke="${d}" stroke-width="2" opacity=".55"/>`).join("")}<path d="M-82 -72 L-36 -6 l14 0" stroke="${lc("jump")}" stroke-width="${lw("jump", 5)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += hind(-6, .55);
  // the four smaller legs on the middle of the body
  s += `<g stroke="${lc("legs")}" stroke-width="${lw("legs", 4.5)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${fo}"><path d="M28 -34 l8 18 l10 16 l8 0"/><path d="M12 -32 l-4 16 l-6 16 l-8 0"/></g>`;
  // the body: abdomen (segments) to the left, the thorax saddle, the head with its big eye on the right
  s += `<path d="M${n2(-86 * blen)} -40 Q${n2(-84 * blen)} -64 -40 -62 L20 -66 Q40 -44 20 -26 L-40 -24 Q${n2(-80 * blen)} -24 ${n2(-86 * blen)} -40z" fill="${g}" fill-opacity="${fo}" stroke="${d}" stroke-width="3.5"/>`
    + [0, 1, 2, 3, 4].map((i) => `<path d="M${-30 - i * 11} -62 Q${-34 - i * 11} -44 ${-30 - i * 11} -25" stroke="${d}" stroke-width="2" fill="none" opacity=".6"/>`).join("")
    + `<path d="M8 -70 Q36 -80 52 -66 Q56 -40 40 -26 Q20 -22 8 -30z" fill="${sk ? g : "#86C24C"}" fill-opacity="${fo}" stroke="${d}" stroke-width="3.5"/>`
    + `<path d="M48 -72 Q${hx + 18} -82 ${hx + 22} -56 Q${hx + 20} -30 ${hx - 4} -26 Q48 -30 46 -46z" fill="${g}" fill-opacity="${fo}" stroke="${d}" stroke-width="3.5"/>`
    + `<path d="M${hx + 14} -30 q4 8 -2 12" stroke="${d}" stroke-width="3" fill="none"/>`;
  s += hind(0, 1);
  // feelers: two, from the head, forwards and up
  s += `<path d="M${hx + 6} -76 Q${hx + 40} ${n2(-120 + tw_)} ${hx + 90} ${n2(-128 + tw_ * 1.6)} M${hx} -78 Q${hx + 26} ${n2(-130 - tw_)} ${hx + 64} ${n2(-150 - tw_)}" stroke="${lc("feelers")}" stroke-width="${lw("feelers", 3.5)}" fill="none" stroke-linecap="round" opacity="${fo}"/>`;
  // the front leg (in front of the body)
  s += `<path d="M44 -32 l10 16 l6 16 l8 0" stroke="${lc("legs")}" stroke-width="${lw("legs", 4.5)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${fo}"/>`;
  if (ad) s += `<path d="M40 -66 Q-30 -82 -122 -54 Q-118 -42 -96 -44 Q-20 -54 36 -48z" fill="#78AE44" stroke="${lc("wings")}" stroke-width="${lw("wings", 3.5)}" stroke-linejoin="round"/><path d="M30 -60 Q-40 -68 -112 -50 M20 -54 Q-40 -58 -100 -46" stroke="#4E7F2A" stroke-width="2" fill="none" opacity=".7"/>`;
  if (sk) s += `<path d="M58 -74 Q30 -70 6 -68 Q-20 -64 -40 -62" stroke="#A88E5E" stroke-width="4" fill="none" stroke-dasharray="10 6"/>`;
  else s += eye16(hx + 4, -60, 10, { shut: blink16(t, (o.ph || 0) + .8), white: "#EAF6C8" }) + `<path d="M${hx + 6} -38 q6 3 10 -2" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  return s; }
// a cockroach as Pip draws it (origin = its middle, seen from above, facing right): glossy brown, big friendly eyes, long feelers, six legs;
// o.adult: two wings with a line down the middle; the nymph is smaller, rounder, no wings
function roach16(t, o = {}) { const ad = !!o.adult, k = ad ? 1 : .78, w = 3 * Math.sin(t * 6 + (o.ph || 0)), d = "#5A2A10";
  return `<g transform="scale(${k})"><g stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round">${[-24, 0, 24].map((x, i) => `<path d="M${x} -26 l${-6 + i * 3} -22 l-8 -6 M${x} 26 l${-6 + i * 3} 22 l-8 6"/>`).join("")}</g>
    <path d="M56 -10 Q100 ${n2(-50 + w)} 140 ${n2(-56 + w)} M56 10 Q100 ${n2(50 - w)} 140 ${n2(56 - w)}" stroke="${d}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="-6" cy="0" rx="62" ry="36" fill="url(#p16Roach)" stroke="${d}" stroke-width="4"/>${ad ? `<path d="M-60 0 H34" stroke="${d}" stroke-width="3"/><path d="M34 -30 Q-20 -40 -66 -6 M34 30 Q-20 40 -66 6" stroke="#5A2A10" stroke-width="2.5" fill="none" opacity=".6"/>` : [-30, -14, 2].map((x) => `<path d="M${x} -32 Q${x - 6} 0 ${x} 32" stroke="${d}" stroke-width="2.5" fill="none" opacity=".55"/>`).join("")}
    <ellipse cx="-20" cy="-14" rx="26" ry="8" fill="#fff" opacity=".35"/><ellipse cx="46" cy="0" rx="22" ry="24" fill="#C98A52" stroke="${d}" stroke-width="4"/>${eye16(50, -10, 9)}${eye16(50, 10, 9)}<path d="M62 -4 q4 4 0 8" stroke="${d}" stroke-width="2.5" fill="none"/></g>`; }
// the cockroach's egg case (origin = its middle): a small brown purse with a ridge along the top; o.cut 0..1 opens a window on two neat rows of eggs
function eggCase16(o = {}) { const c = o.cut || 0;
  let s = `<path d="M-90 -34 Q-96 30 -60 40 H60 Q96 30 90 -34z" fill="#9A5A2A" stroke="#5A2A10" stroke-width="5" stroke-linejoin="round"/><path d="M-92 -34 H92" stroke="#5A2A10" stroke-width="7" stroke-linecap="round"/>${[...Array(15)].map((_, i) => `<path d="M${-84 + i * 12} -40 v12" stroke="#7A3E1C" stroke-width="4"/>`).join("")}`
    + [...Array(7)].map((_, i) => `<path d="M${-66 + i * 22} -24 Q${-70 + i * 22} 8 ${-66 + i * 22} 32" stroke="#7A3E1C" stroke-width="2.5" fill="none" opacity=".6"/>`).join("") + `<ellipse cx="-40" cy="-16" rx="30" ry="7" fill="#fff" opacity=".25"/>`;
  if (c > .02) s += OP(c, `<rect x="-76" y="-22" width="152" height="54" rx="14" fill="#FFF1D6" stroke="#5A2A10" stroke-width="4"/>` + [0, 1].map((r) => [...Array(7)].map((_, i) => `<ellipse cx="${-60 + i * 20}" cy="${-6 + r * 24}" rx="8" ry="10" fill="#F2D28A" stroke="#B88A3A" stroke-width="2"/>`).join("")).join(""));
  return s; }
// the tree frog's foam nest on a leaf (origin = the foam's middle): a white ball of froth with tiny eggs inside
const foamNest16 = (t, k = 1) => TF(0, 0, k, [...Array(26)].map((_, i) => { const a = hash(i, 5) * Math.PI * 2, d = Math.sqrt(hash(i, 7)) * 58, r = 10 + 8 * hash(i, 9) + 1.5 * Math.sin(t * 2 + i); return `<circle cx="${n2(Math.cos(a) * d)}" cy="${n2(Math.sin(a) * d * .8)}" r="${n2(r)}" fill="#FFFFFF" stroke="#DCE8EE" stroke-width="2"/>`; }).join("")
  + [...Array(10)].map((_, i) => `<circle cx="${n2(-36 + 72 * hash(i, 21))}" cy="${n2(-24 + 48 * hash(i, 23))}" r="4" fill="#E9D7A8" stroke="#B89A5A" stroke-width="1.2"/>`).join("") + `<ellipse cx="-20" cy="-30" rx="18" ry="8" fill="#fff" opacity=".9"/>`);
// the mantis's egg case on a twig (origin = its middle): pale, foamy-looking, ridged
const mantisCase16 = (k = 1) => TF(0, 0, k, `<path d="M-70 -30 Q-80 30 -20 44 Q50 50 72 0 Q70 -44 10 -46 Q-40 -46 -70 -30z" fill="#E9DDB8" stroke="#A8946A" stroke-width="4"/>${[...Array(8)].map((_, i) => `<path d="M${-56 + i * 16} -38 Q${-62 + i * 16} 0 ${-56 + i * 16} 40" stroke="#C9B888" stroke-width="3" fill="none"/>`).join("")}<path d="M-60 -36 Q0 -60 66 -20" stroke="#F8F2DC" stroke-width="6" fill="none" opacity=".8"/>`);
// the lime butterfly's caterpillar (origin = under its middle, facing right): plump, green, a pale band, little prolegs; it chews and wiggles
function caterpillar16(t, o = {}) { const ch = Math.sin(t * 8), wg = Math.sin(t * 2.4); let s = "";
  for (let i = 0; i < 7; i++) { const x = -96 + i * 26, y = -24 - 4 * Math.sin(i * .9 + t * 2.4) * (1 + .3 * wg), r = 22 - Math.abs(i - 3) * 1.2;
    s += `<path d="M${x - 6} -4 l-2 6 M${x + 6} -4 l2 6" stroke="#3E7A2A" stroke-width="5" stroke-linecap="round"/><circle cx="${x}" cy="${n2(y)}" r="${n2(r)}" fill="${i === 3 || i === 4 ? "#F2F4E2" : "#8FCB4E"}" stroke="#3E7A2A" stroke-width="3"/>`; }
  s += `<path d="M-30 -40 Q-10 -52 14 -40" stroke="#5E9A34" stroke-width="3" fill="none"/><circle cx="-90" cy="-40" r="4" fill="#F2F4E2"/><circle cx="-60" cy="-46" r="4" fill="#F2F4E2"/><g transform="translate(${n2(96 + 2 * ch)} -22)"><circle r="20" fill="#A6D86A" stroke="#3E7A2A" stroke-width="3"/>${eye16(6, -6, 6)}<path d="M10 8 q${n2(4 + 3 * ch)} 4 8 -2" stroke="#3E7A2A" stroke-width="2.5" fill="none"/></g>`;
  return s; }

/* ---------------------------------------------------------------- THE POND SIDE ---------------------------------------------------------------- */
// the pond fills most of the frame; the HDB block and its void deck behind, the old mango tree's crown at the right edge, the bench at the
// left, the garden tap on its pipe beside the pond (left front), the big elephant-ear leaf leaning over the water (right back), a reed clump
// (far side, left), a flower pot by the pond (right), Basil's flat stone (right front)
const PD = { cx: 1040, cy: 800, rx: 760, ry: 230 }, LEAF16 = [1430, 330], TAP16 = [330, 500], POTP = [1600, 580], REED16 = [640, 470], BENCH16 = [40, 790];
BG.pond16 = () => { let s = `<rect x="-200" y="-120" width="2320" height="700" fill="url(#p16Sky)"/>`;
  s += `<g opacity=".6">${farBlocks(-160, 2120, 330, 21, .9)}</g>`;
  // the HDB block close behind: its void deck (pillars, shade), the lift lobby
  s += `<rect x="-200" y="-120" width="1260" height="560" fill="#FFF4E2"/><rect x="1040" y="-120" width="30" height="560" fill="#E3CFAE"/>`;
  for (let r = 0; r < 4; r++) { const y = -60 + r * 104; s += `<rect x="-200" y="${y + 62}" width="1240" height="22" fill="${["#F6A38F", "#8FD3C8", "#B9A6FF", "#FFC38A"][r]}"/>`; for (let c = 0; c < 10; c++) { const x = -150 + c * 118; s += `<rect x="${x}" y="${y}" width="74" height="56" rx="5" fill="#9DB8CC"/><rect x="${x + 4}" y="${y + 4}" width="31" height="48" rx="3" fill="#CFE6F4"/>`; } }
  s += `<rect x="-200" y="356" width="1240" height="150" fill="#7C88A8"/><rect x="-200" y="356" width="1240" height="150" fill="#2B2147" opacity=".3"/><rect x="-200" y="342" width="1274" height="20" fill="#E3CFAE"/>${[...Array(7)].map((_, i) => `<rect x="${-140 + i * 180}" y="362" width="46" height="144" fill="#F2E4C8"/>`).join("")}`;
  // the mango tree's crown at the right edge (EP15's old tree, seen from its side)
  s += `<path d="M1780 520 Q1800 300 1760 120 H1880 Q1860 300 1900 520z" fill="url(#g14Trunk)" stroke="#5E3F28" stroke-width="5"/>`;
  [[1560, 40, 260, 140, "#2F8048"], [1820, -20, 300, 170, "#3E9E5A"], [1700, 140, 240, 110, "#3E9E5A"], [1980, 120, 200, 130, "#2F8048"], [1640, -60, 220, 110, "#58B56C"]].forEach(([x, y, rx, ry, c]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}"/>`; });
  // grass all round, a paved path at the front left
  s += `<rect x="-200" y="470" width="2320" height="740" fill="url(#p16Grass)"/><path d="M-200 478 Q500 456 1100 474 T2120 466 V500 H-200z" fill="#B7E58F"/>`;
  for (let i = 0; i < 9; i++) s += `<circle cx="${1080 + i * 120}" cy="${n2(482 + 10 * hash(i, 2))}" r="${n2(40 + 22 * hash(i, 5))}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`;
  // the bench at the left (its end by the pond: Momo's seat)
  { const [bx, by] = BENCH16; s += `<ellipse cx="${bx}" cy="${by + 96}" rx="260" ry="16" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${bx - 200} ${by + 96} V${by + 10} M${bx + 180} ${by + 96} V${by + 10}" stroke="#7E4F27" stroke-width="16" stroke-linecap="round"/><rect x="${bx - 240}" y="${by - 70}" width="480" height="20" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="${bx - 240}" y="${by - 42}" width="480" height="20" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M${bx - 216} ${by - 70} V${by} M${bx + 196} ${by - 70} V${by}" stroke="#7E4F27" stroke-width="12" stroke-linecap="round"/><rect x="${bx - 250}" y="${by - 6}" width="500" height="26" rx="10" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="${bx + 196}" y="${by - 46}" width="54" height="16" rx="6" fill="#8E5E30" stroke="#7E4F27" stroke-width="3"/>`; }
  // the pond: a stone rim, the water, darker deep water, the far bank's reflections
  s += `<ellipse cx="${PD.cx}" cy="${PD.cy + 14}" rx="${PD.rx + 34}" ry="${PD.ry + 30}" fill="url(#p16Stone)"/>`;
  for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; s += `<ellipse cx="${n2(PD.cx + Math.cos(a) * (PD.rx + 24))}" cy="${n2(PD.cy + 10 + Math.sin(a) * (PD.ry + 22))}" rx="${n2(44 + 14 * hash(i, 3))}" ry="${n2(22 + 6 * hash(i, 4))}" fill="${["#CFC8BA", "#B9B1A2", "#DAD3C6"][i % 3]}" stroke="#8E8576" stroke-width="3"/>`; }
  s += `<ellipse cx="${PD.cx}" cy="${PD.cy}" rx="${PD.rx}" ry="${PD.ry}" fill="url(#p16Water)"/><ellipse cx="${PD.cx + 40}" cy="${PD.cy + 40}" rx="${PD.rx * .7}" ry="${PD.ry * .6}" fill="url(#p16Deep)" opacity=".6"/>`
    + `<ellipse cx="${PD.cx - 180}" cy="${PD.cy - 150}" rx="420" ry="40" fill="#BDEBF5" opacity=".35"/><ellipse cx="${PD.cx + 300}" cy="${PD.cy - 120}" rx="200" ry="22" fill="#fff" opacity=".2"/>`;
  // the reed clump on the far side (left)
  { const [rx, ry] = REED16; for (let i = 0; i < 14; i++) { const x = rx - 90 + i * 13, h = 150 + 90 * hash(i, 31), b = 20 * (hash(i, 33) - .5); s += `<path d="M${x} ${ry + 70} Q${n2(x + b * .5)} ${n2(ry + 70 - h * .6)} ${n2(x + b)} ${n2(ry + 70 - h)}" stroke="${i % 2 ? "#4FA866" : "#6CC36E"}" stroke-width="7" fill="none" stroke-linecap="round"/>`; if (i % 4 === 1) s += `<rect x="${n2(x + b - 7)}" y="${n2(ry + 70 - h - 10)}" width="14" height="44" rx="7" fill="#8A5A36"/>`; } }
  // the flower pot by the pond (right; a bougainvillea in it)
  { const [px, py] = POTP; s += `<ellipse cx="${px}" cy="${py + 4}" rx="80" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${px - 62} ${py} L${px - 76} ${py - 96} H${px + 76} L${px + 62} ${py}z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="5" stroke-linejoin="round"/><rect x="${px - 84}" y="${py - 110}" width="168" height="22" rx="8" fill="#D9774A" stroke="#9A4A2A" stroke-width="5"/>`;
    for (let i = 0; i < 12; i++) { const a = -Math.PI * (.1 + .8 * hash(i, 41)), d = 40 + 60 * hash(i, 43); s += `<circle cx="${n2(px + Math.cos(a) * d)}" cy="${n2(py - 120 + Math.sin(a) * d * .9)}" r="${n2(20 + 8 * hash(i, 45))}" fill="${i % 3 ? "#4FA866" : "#E85A9A"}"/>`; } }
  // the garden tap on its pipe (left front, beside the pond)
  { const [tx, ty] = TAP16; s += `<rect x="${tx - 10}" y="${ty}" width="20" height="190" fill="#9AA4B2" stroke="#5E6B7C" stroke-width="4"/><rect x="${tx - 26}" y="${ty + 184}" width="52" height="16" rx="6" fill="#7C8696"/><path d="M${tx} ${ty + 8} H${tx + 44} Q${tx + 60} ${ty + 8} ${tx + 60} ${ty + 30} V${ty + 44}" stroke="#B9C2CE" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M${tx} ${ty + 8} H${tx + 44} Q${tx + 60} ${ty + 8} ${tx + 60} ${ty + 30} V${ty + 44}" stroke="#5E6B7C" stroke-width="3" fill="none"/><rect x="${tx - 6}" y="${ty - 26}" width="12" height="22" fill="#7C8696"/><path d="M${tx - 30} ${ty - 30} H${tx + 30}" stroke="#D9433A" stroke-width="12" stroke-linecap="round"/>`; }
  // Basil's flat stone (right front, by the water)
  s += `<ellipse cx="1690" cy="1000" rx="200" ry="46" fill="#9A9184"/><ellipse cx="1690" cy="984" rx="190" ry="40" fill="#C9C2B6" stroke="#8E8576" stroke-width="4"/><ellipse cx="1650" cy="974" rx="80" ry="12" fill="#fff" opacity=".25"/>`;
  // grass tufts in front
  for (let i = 0; i < 30; i++) { const x = -160 + hash(i, 3) * 2240, y = 1040 + hash(i, 7) * 140; s += `<path d="M${n2(x)} ${n2(y)} q4 -22 0 -32 M${n2(x + 9)} ${n2(y)} q8 -16 12 -26 M${n2(x - 8)} ${n2(y)} q-6 -14 -12 -22" stroke="#4E9A44" stroke-width="5" stroke-linecap="round" fill="none"/>`; }
  return s; };
// the big elephant-ear leaf leaning over the water (live: it sways; the tree frog's intro spot is on its blade at LEAF16)
const elephantLeaf = (t) => { const sw = 2 * Math.sin(t * .8); return `<path d="M1520 560 Q1500 440 1460 380" stroke="#4E9A44" stroke-width="16" fill="none" stroke-linecap="round"/><g transform="rotate(${n2(sw)} 1470 380)"><path d="M1470 380 Q1380 250 1260 300 Q1240 380 1330 420 Q1400 440 1470 380z" fill="#58B56C" stroke="#2F7A45" stroke-width="5" stroke-linejoin="round"/><path d="M1470 380 Q1380 330 1290 330 M1400 352 l-30 -40 M1360 342 l-40 30 M1420 366 l10 40" stroke="#2F7A45" stroke-width="3" fill="none" opacity=".7"/><ellipse cx="1340" cy="320" rx="40" ry="10" fill="#fff" opacity=".25" transform="rotate(-20 1340 320)"/></g>`; };
// lily pads (live: they bob), with a pink water lily
const LILY = [[700, 720, 66], [860, 660, 52], [1200, 690, 62], [1380, 790, 74], [800, 870, 62], [1120, 890, 56], [520, 800, 48], [1560, 720, 44]];
const lilyPad = (t, x, y, r, i) => { const b = 2 * Math.sin(t * 1.1 + i); return `<g transform="translate(${x} ${n2(y + b)})"><ellipse cx="0" cy="6" rx="${r}" ry="${n2(r * .36)}" fill="#1E5E70" opacity=".35"/><path d="M0 0 L${r} ${n2(-r * .06)} A${r} ${n2(r * .38)} 0 1 1 ${n2(r * .9)} ${n2(r * .16)}z" fill="#58B56C" stroke="#2F8048" stroke-width="4"/><path d="M0 0 L${n2(-r * .6)} ${n2(-r * .2)} M0 0 L${n2(-r * .3)} ${n2(r * .26)} M0 0 L${n2(r * .4)} ${n2(r * .22)}" stroke="#2F8048" stroke-width="2" opacity=".5"/></g>`; };
// the frogs' calls at dawn are heard, not seen; a dragonfly darts; drips fall from the big leaf
const dragonfly = (t, x, y) => { const f = Math.abs(Math.sin(t * 40)); return TF(x, y, 1, `<ellipse cx="-8" cy="${n2(-10 * f)}" rx="26" ry="7" fill="#DDF4FF" opacity=".8" stroke="#8FB8D6" stroke-width="1.5"/><ellipse cx="8" cy="${n2(-10 * f)}" rx="26" ry="7" fill="#DDF4FF" opacity=".8" stroke="#8FB8D6" stroke-width="1.5" transform="rotate(10)"/><rect x="-30" y="-3" width="56" height="6" rx="3" fill="#2F7FB0"/><circle cx="28" cy="0" r="7" fill="#1F5F90"/>`); };
// the tree frog's spot in each pond scene (SERIES_FORMAT 4: a new fair spot every scene; the intro spot (cold, back, title, game: the big
// leaf) never again; the reveal at the tap). [x, y, k, flip, rot]
const FROGAT = { cold: [1400, 352, .42, 0, -8], back: [1400, 352, .42, 0, -8], title: [1400, 352, .42, 0, -8], game: [1400, 352, .42, 0, -8],
  pond: [676, 330, .4, 0, 0], waitw: [1380, 772, .4, 1, 0], frogans: null, holdon: null, ring: [1600, 474, .42, 1, 0], liz: [TAP16[0] - 6, TAP16[1] - 34, .44, 0, 0] };
// VP16: the live pond side. o: dawn 0..1, eggs (the clump on), tad (number of tadpoles), frog (the young frog on its lily pad: { x, y, k, hop }),
// frogAt ([x, y, k, flip, rot] | false), items (svg over the set), front (svg in front of the leaf), dim, cam [z, cx, cy]
function VP16(t, o = {}, cam) { let s = bg("pond16");
  [[300, 90, 1], [1250, 60, .8]].forEach(([x, y, k], i) => { const cx = (x + t * (7 + 2 * i) + 400) % 2500 - 300; s += TF(cx, y, k, `<g opacity=".9"><ellipse rx="130" ry="34" fill="#fff"/><ellipse cx="-50" cy="-26" rx="62" ry="40" fill="#fff"/><ellipse cx="34" cy="-36" rx="76" ry="50" fill="#fff"/></g>`); });
  // ripples
  s += [0, 1, 2].map((i) => { const u = ((t * .35 + i / 3) % 1), x = [900, 1250, 620][i], y = [760, 900, 860][i]; return `<ellipse cx="${x}" cy="${y}" rx="${n2(14 + 90 * u)}" ry="${n2(5 + 26 * u)}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(.6 * (1 - u))}"/>`; }).join("");
  LILY.forEach(([x, y, r], i) => { s += lilyPad(t, x, y, r, i); });
  s += `<g transform="translate(1180 ${n2(668 + 2 * Math.sin(t * 1.1 + 2))})">${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="0" cy="-12" rx="9" ry="20" fill="${i % 2 ? "#FF9EC4" : "#FFC3DA"}" transform="rotate(${i * 30 - 75})"/>`).join("")}<circle cx="0" cy="-10" r="8" fill="#FFD75A"/></g>`;
  // the clump of frog eggs among the lily pads, half under the surface
  if (o.eggs !== false) s += TF(980 + 3 * Math.sin(t * .7), 740, o.eggK || .9, `<ellipse cx="0" cy="14" rx="110" ry="30" fill="#1E5E70" opacity=".25"/>` + eggClump(t, { n: 60, r: 11, R: 92 }));
  // tadpoles (under the surface, a little blurred by the water)
  const nt = o.tad === undefined ? 4 : o.tad; for (let i = 0; i < nt; i++) { const u = ((t * .06 + hash(i, 3)) % 1), x = 460 + 1100 * u, y = 820 + 70 * Math.sin(i * 2 + t * .5) + 40 * hash(i, 5); s += `<g opacity=".8">${TF(x, y, .55, tadpole16(t, 0, { ph: i * 1.3 }), 6 * Math.sin(t + i))}</g>`; }
  if (o.frog) { const f = o.frog; s += TF(f.x, f.y, f.k || .8, frog16(t, { hop: f.hop || 0 }), 0); }
  s += elephantLeaf(t) + drips15(t, [[1300, 398, 0, 300], [1380, 418, 1.1, 300], [1250, 330, 1.9, 380]]);
  s += dragonfly(t, 900 + 400 * Math.sin(t * .37), 470 + 60 * Math.sin(t * .9));
  if (o.items) s += o.items;
  const fa = o.frogAt === undefined ? FROGAT[(window._S || {}).name] : o.frogAt; if (fa) s += treeFrogAt(t, fa[0], fa[1], fa[2], { flip: fa[3], rot: fa[4] || 0, lift: o.lift || 0 });
  if (o.front) s += o.front;
  // the light: dawn (cool blue turning gold from the right) or plain morning
  if (o.dawn) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="#3E4C9A" opacity="${n2(.28 * o.dawn)}" style="mix-blend-mode:multiply"/><rect x="-200" y="-120" width="2320" height="1320" fill="url(#p16Dawn)" opacity="${n2(.3 * o.dawn)}" style="mix-blend-mode:soft-light"/><ellipse cx="1900" cy="200" rx="700" ry="500" fill="#FFD9A0" opacity="${n2(.3 * o.dawn)}" filter="url(#b60)"/><rect x="-200" y="560" width="2320" height="120" fill="#fff" opacity="${n2(.18 * o.dawn)}" filter="url(#b16)"/>`;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }

/* ---------------------------------------------------------------- THE GRASSY CORNER ---------------------------------------------------------------- */
// by the void deck: the block and its void deck behind (left), the bench (centre back), the planter bed with a sunflower, a hibiscus and
// lemongrass (right of centre), the lime plant in its big pot at the right edge, long grass in front (live)
const PLANTER = [1020, 640], SUNF = [1250, 300], LIMEP = [1760, 760], BENCHG = [520, 600];
BG.grass16 = () => { let s = `<rect x="-200" y="-120" width="2320" height="760" fill="url(#p16Sky)"/><g opacity=".6">${farBlocks(700, 2120, 420, 33, 1)}</g>`;
  s += `<rect x="-200" y="-120" width="980" height="700" fill="#FFF4E2"/><rect x="760" y="-120" width="30" height="700" fill="#E3CFAE"/>`;
  for (let r = 0; r < 4; r++) { const y = -40 + r * 110; s += `<rect x="-200" y="${y + 64}" width="960" height="22" fill="${["#8FD3C8", "#B9A6FF", "#FFC38A", "#F6A38F"][r]}"/>`; for (let c = 0; c < 8; c++) { const x = -150 + c * 118; s += `<rect x="${x}" y="${y}" width="74" height="58" rx="5" fill="#9DB8CC"/><rect x="${x + 4}" y="${y + 4}" width="31" height="50" rx="3" fill="#CFE6F4"/>`; } }
  s += `<rect x="-200" y="420" width="980" height="180" fill="#7C88A8"/><rect x="-200" y="420" width="980" height="180" fill="#2B2147" opacity=".3"/><rect x="-200" y="404" width="1000" height="20" fill="#E3CFAE"/>${[...Array(6)].map((_, i) => `<rect x="${-130 + i * 170}" y="426" width="46" height="174" fill="#F2E4C8"/>`).join("")}<rect x="240" y="470" width="120" height="110" rx="8" fill="#9DB8CC" stroke="#5E6B7C" stroke-width="4"/>${T(300, 458, "LIFT", 22, "#fff")}`;
  s += `<rect x="-200" y="580" width="2320" height="640" fill="url(#p16Grass)"/><path d="M-200 588 Q400 570 960 584 T2120 578 V612 H-200z" fill="#B7E58F"/>`;
  for (let i = 0; i < 8; i++) s += `<circle cx="${800 + i * 170}" cy="${n2(588 + 8 * hash(i, 2))}" r="${n2(44 + 22 * hash(i, 5))}" fill="${i % 2 ? "#5FB56C" : "#7CC97A"}"/>`;
  // the bench
  { const [bx, by] = BENCHG; s += `<ellipse cx="${bx}" cy="${by + 96}" rx="230" ry="14" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${bx - 170} ${by + 96} V${by + 10} M${bx + 170} ${by + 96} V${by + 10}" stroke="#7E4F27" stroke-width="14" stroke-linecap="round"/><rect x="${bx - 210}" y="${by - 64}" width="420" height="18" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><rect x="${bx - 210}" y="${by - 38}" width="420" height="18" rx="8" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/><path d="M${bx - 190} ${by - 64} V${by} M${bx + 190} ${by - 64} V${by}" stroke="#7E4F27" stroke-width="10" stroke-linecap="round"/><rect x="${bx - 220}" y="${by - 4}" width="440" height="24" rx="10" fill="url(#f14Wood)" stroke="#7E4F27" stroke-width="4"/>`; }
  // the planter bed: a low brick wall, soil, lemongrass, a hibiscus (red flowers), herbs (the sunflower is live: it nods)
  { const [px, py] = PLANTER; s += `<ellipse cx="${px + 200}" cy="${py + 64}" rx="420" ry="18" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><rect x="${px - 200}" y="${py - 10}" width="800" height="70" rx="8" fill="#C97A5A" stroke="#8A4A2E" stroke-width="5"/>${[...Array(10)].map((_, i) => `<path d="M${px - 200 + i * 80} ${py - 10} v70" stroke="#8A4A2E" stroke-width="3" opacity=".5"/>`).join("")}<path d="M${px - 200} ${py + 24} H${px + 600}" stroke="#8A4A2E" stroke-width="3" opacity=".5"/><rect x="${px - 190}" y="${py - 26}" width="780" height="22" rx="8" fill="url(#g14Soil)"/>`;
    for (let i = 0; i < 16; i++) { const x = px - 170 + i * 11, h = 130 + 50 * hash(i, 51); s += `<path d="M${x} ${py - 20} Q${n2(x - 20 + 40 * hash(i, 53))} ${n2(py - 20 - h * .6)} ${n2(x - 30 + 60 * hash(i, 55))} ${n2(py - 20 - h)}" stroke="${i % 2 ? "#8CC86A" : "#6FAE54"}" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    s += `<g transform="translate(${px + 420} ${py - 20})"><ellipse cx="0" cy="-90" rx="110" ry="90" fill="#3E9E5A"/><ellipse cx="-50" cy="-120" rx="60" ry="50" fill="#58B56C"/><ellipse cx="50" cy="-70" rx="60" ry="46" fill="#4FA866"/>${[[-60, -130], [40, -150], [70, -70], [-20, -60]].map(([x, y]) => `<g transform="translate(${x} ${y})">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-16" rx="12" ry="18" fill="#E8403A" transform="rotate(${k * 72})"/>`).join("")}<circle r="6" fill="#FFD75A"/></g>`).join("")}</g>`;
    for (let i = 0; i < 8; i++) s += `<g transform="translate(${px + 120 + i * 28} ${py - 22})"><ellipse cx="-8" cy="-14" rx="9" ry="16" fill="#58B56C" transform="rotate(-24 -8 -14)"/><ellipse cx="8" cy="-14" rx="9" ry="16" fill="#43A85C" transform="rotate(24 8 -14)"/></g>`; }
  // the lime plant in its big pot (right edge)
  { const [lx, ly] = LIMEP; s += `<ellipse cx="${lx}" cy="${ly + 6}" rx="150" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${lx - 120} ${ly} L${lx - 140} ${ly - 170} H${lx + 140} L${lx + 120} ${ly}z" fill="url(#p15Pot)" stroke="#9A4A2A" stroke-width="6" stroke-linejoin="round"/><rect x="${lx - 152}" y="${ly - 196}" width="304" height="34" rx="10" fill="#D9774A" stroke="#9A4A2A" stroke-width="6"/><path d="M${lx} ${ly - 190} Q${lx - 10} ${ly - 300} ${lx} ${ly - 380}" stroke="#7A5230" stroke-width="16" fill="none"/>`;
    for (let i = 0; i < 26; i++) { const a = hash(i, 61) * Math.PI * 2, d = 40 + 110 * Math.sqrt(hash(i, 63)); s += `<g transform="translate(${n2(lx + Math.cos(a) * d * 1.1)} ${n2(ly - 420 + Math.sin(a) * d * .8)}) rotate(${n2(360 * hash(i, 65))})">${leaf15(52, 22, i % 2 ? "#3E9E5A" : "#58B56C", "#2A6E3E")}</g>`; } }
  for (let i = 0; i < 40; i++) { const x = -160 + hash(i, 3) * 2240, y = 640 + hash(i, 7) * 540; s += `<path d="M${n2(x)} ${n2(y)} q4 -18 0 -26 M${n2(x + 9)} ${n2(y)} q8 -14 10 -22 M${n2(x - 8)} ${n2(y)} q-6 -12 -10 -18" stroke="#58A84E" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`; }
  return s; };
// the sunflower in the planter bed (live: it nods); origin = its stem's foot. The mantis's reveal spot is on its stem under the flower head
const sunflower = (t, x, y, h = 360) => { const nd = 3 * Math.sin(t * .9); return `<g transform="translate(${x} ${y}) rotate(${n2(nd)})"><path d="M0 0 Q-10 ${-h * .5} 0 ${-h}" stroke="#4E9A44" stroke-width="12" fill="none"/><g transform="translate(-6 ${n2(-h * .45)}) rotate(-30)">${leaf15(80, 30, "#58B56C", "#2F7A45")}</g><g transform="translate(4 ${n2(-h * .65)}) rotate(200)">${leaf15(70, 26, "#4FA866", "#2F7A45")}</g>`
  + `<g transform="translate(0 ${-h})">${[...Array(16)].map((_, i) => `<ellipse cx="0" cy="-58" rx="16" ry="34" fill="${i % 2 ? "#FFC83A" : "#FFB01E"}" stroke="#D98A0E" stroke-width="2" transform="rotate(${i * 22.5})"/>`).join("")}<circle r="44" fill="#7A4A22" stroke="#5A3214" stroke-width="4"/>${[...Array(10)].map((_, i) => `<circle cx="${n2(26 * Math.cos(i))}" cy="${n2(26 * Math.sin(i * 1.7))}" r="4" fill="#4A2A10"/>`).join("")}</g></g>`; };
// a flower stem in the planter bed (a small pink cosmos): the mantis's INTRO spot
const cosmos = (t, x, y) => { const sw = 3 * Math.sin(t * 1.2 + 1); return `<g transform="translate(${x} ${y}) rotate(${n2(sw)})"><path d="M0 0 Q6 -110 0 -220" stroke="#4E9A44" stroke-width="7" fill="none"/><g transform="translate(0 -230)">${[...Array(8)].map((_, i) => `<ellipse cx="0" cy="-22" rx="11" ry="22" fill="#F49BC4" stroke="#C9608E" stroke-width="2" transform="rotate(${i * 45})"/>`).join("")}<circle r="11" fill="#FFD75A"/></g></g>`; };
// one tall blade of grass (live: it sways); origin = its foot; returns its tip position too when asked
const blade = (t, x, y, h, lean, col = "#6FBF4E", w = 16, ph = 0) => { const sw = lean + 10 * Math.sin(t * 1.3 + ph); return `<path d="M${x - w / 2} ${y} Q${n2(x + sw * .3)} ${n2(y - h * .6)} ${n2(x + sw)} ${n2(y - h)} Q${n2(x + sw * .3 + w * .3)} ${n2(y - h * .55)} ${x + w / 2} ${y}z" fill="${col}" stroke="#3F8A3A" stroke-width="2.5"/>`; };
const bladeTip = (t, x, y, h, lean, ph = 0, u = 1) => { const sw = lean + 10 * Math.sin(t * 1.3 + ph); return [x + sw * (u * u * .7 + u * .3), y - h * u]; };
// the long grass in front (live)
const grassFront = (t, y0 = 1090, n = 34, ph = 0) => { let s = ""; for (let i = 0; i < n; i++) { const x = -60 + i * 62 + 20 * hash(i, 71), h = 120 + 120 * hash(i, 73); s += blade(t, x, y0 + 20 * hash(i, 75), h, 30 * (hash(i, 77) - .5), i % 3 ? "#7CC85A" : "#5FAE46", 14, i + ph); } return s; };
// the mantis's spot in each grassy-corner scene (never back at the intro stem; never twice in one spot) [x, y, k, flip, rot]
const MANTISAT = { place: [880, 410, .4, 0, 0], game: [880, 410, .4, 0, 0], nymphans: [1500, 560, .36, 1, 0], skin: [1146, 474, .36, 0, -10], waitw: [140, 560, .4, 0, 0], moult: null, show: null, fix: null, dare: [1630, 568, .36, 0, 0], liz: [SUNF[0] + 4, SUNF[1] + 74, .4, 0, 0] };
// VG16: the live grassy corner. o: hens ([[x, y, k, flip, kind, ph], ...] kind 0 hen, 1 chick), hop ({ x, y, k, adult, hop }), skin ({ x, y, k }),
// mantisAt ([..] | false), items, front (over the front grass), noFront, dim, cam
function VG16(t, o = {}, cam) { let s = bg("grass16");
  [[300, 90, 1], [1250, 60, .8], [1850, 150, .7]].forEach(([x, y, k], i) => { const cx = (x + t * (7 + 2 * i) + 400) % 2500 - 300; s += TF(cx, y, k, `<g opacity=".95"><ellipse rx="130" ry="34" fill="#fff"/><ellipse cx="-50" cy="-26" rx="62" ry="40" fill="#fff"/><ellipse cx="34" cy="-36" rx="76" ry="50" fill="#fff"/></g>`); });
  s += cosmos(t, 870, PLANTER[1] - 18) + cosmos(t, 930, PLANTER[1] - 18) + sunflower(t, SUNF[0], PLANTER[1] - 20, PLANTER[1] - 20 - SUNF[1]);
  s += TF(160 + 50 * Math.sin(t * .2), 1000, 1, bird15(t, 1.1, 0));
  if (o.hens) o.hens.forEach(([x, y, k, fl, kind, ph]) => { const pk = peckAt(t, ph || 0, kind ? 1.3 : 2.1); s += TF(x, y, k * (fl ? -1 : 1), (kind ? chick16 : hen16)(t, { peck: pk, ph: ph || 0, walk: o.walk }), 0, k); });
  if (o.items) s += o.items;
  if (o.skin) { const k = o.skin; s += blade(t, k.bx, k.by, k.bh, k.lean || 10, "#6FBF4E", 18, 2) + TF(...bladeTip(t, k.bx, k.by, k.bh, k.lean || 10, 2, k.u || .62), k.k || .7, hopper16(t, { skin: true }), k.rot || -70); }
  if (o.hop) { const h = o.hop; s += blade(t, h.bx, h.by, h.bh, h.lean || -10, "#7CC85A", 18, 4) + TF(...bladeTip(t, h.bx, h.by, h.bh, h.lean || -10, 4, h.u || .7), h.k || .7, hopper16(t, { adult: h.adult, ph: 1 }), h.rot || -64); }
  const ma = o.mantisAt === undefined ? MANTISAT[(window._S || {}).name] : o.mantisAt; if (ma) s += mantisAt(t, ma[0], ma[1], ma[2], { flip: ma[3], rot: ma[4] || 0, turn: o.turn || 0 });
  // a butterfly passes
  const bu = ((t / 9) % 1), bx = 2000 - 2200 * bu, by = 520 + 60 * Math.sin(bu * 14), fl = Math.abs(Math.sin(t * 16)); s += TF(bx, by, 1, `<ellipse cx="${n2(-9 * fl)}" cy="-4" rx="${n2(12 * fl + 2)}" ry="14" fill="#FFB36B" stroke="#C97A2A" stroke-width="2"/><ellipse cx="${n2(9 * fl)}" cy="-4" rx="${n2(12 * fl + 2)}" ry="14" fill="#FFB36B" stroke="#C97A2A" stroke-width="2"/><rect x="-2" y="-12" width="4" height="20" rx="2" fill="#2B2147"/>`);
  if (o.noFront !== true) s += grassFront(t);
  if (o.front) s += o.front;
  if (o.dim) s += `<rect x="-200" y="-120" width="2320" height="1320" fill="${P.night}" opacity="${n2(o.dim)}"/>`;
  return cam ? CAM(s, cam[0], cam[1], cam[2]) : s; }
