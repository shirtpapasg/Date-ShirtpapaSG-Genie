// style.js: the "Explained 2" look as code. Palette, shared defs (light, grain, shadows) and drawn props.
// Everything returns SVG strings and depends on nothing but its arguments (deterministic).
const P = {
  ink: "#2B2147", ink2: "#4A3F6B", paper: "#FFF8EA", white: "#FFFFFF",
  // light scenes
  cream: "#FFF3DC", peach: "#FFD3AE", sky: "#BFE6FF", mint: "#C4F1DC", lilac: "#DDD3FF",
  // dark scenes
  night: "#120E2E", indigo: "#221A57", violet: "#3B2A8C", deepTeal: "#0D3547",
  // accents
  sun: "#FFC83A", sunDeep: "#F59E0B", coral: "#FF6F61", aqua: "#2EC4B6", blue: "#3A8DFF", blueDeep: "#1F5FD0",
  orange: "#FF9838", orangeDeep: "#E36A12", leaf: "#43BF6C", leafDeep: "#1F8A4C", pink: "#FF8FB1", purple: "#9B6BFF",
  // buddy auras
  pip: "#B9A6FF", basil: "#7FE3C4", momo: "#FFB38A", you: "#FFC83A"
};
const PET = { pip: "chin", basil: "liz", momo: "cat" };
const PETDIR = "../characters/app/";

function defs() { return `
<defs>
  <filter id="grainF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
  <filter id="b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="b4" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="b10" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="b30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="b60" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="60"/></filter>
  <filter id="drop" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#2B2147" flood-opacity=".28"/></filter>
  <filter id="dropS" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#2B2147" flood-opacity=".3"/></filter>
  <filter id="rim" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#FFE9A8" flood-opacity=".95"/></filter>
  <filter id="rimC" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#BFE6FF" flood-opacity=".9"/></filter>
  <linearGradient id="gSun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#FFB52E"/></linearGradient>
  <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FB0FF"/><stop offset="1" stop-color="#2C6FE8"/></linearGradient>
  <linearGradient id="gOrange" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB45C"/><stop offset="1" stop-color="#F27A1E"/></linearGradient>
  <linearGradient id="gPaper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFDF6"/><stop offset="1" stop-color="#FFF1D6"/></linearGradient>
  <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7BE08F"/><stop offset="1" stop-color="#249A55"/></linearGradient>
  <linearGradient id="gLeafLit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9F77A"/><stop offset=".55" stop-color="#6FD86B"/><stop offset="1" stop-color="#2FA65A"/></linearGradient>
  <linearGradient id="gPot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F29A6B"/><stop offset="1" stop-color="#C9623A"/></linearGradient>
  <linearGradient id="gTeddy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDA06C"/><stop offset="1" stop-color="#B9774A"/></linearGradient>
  <linearGradient id="gHam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD9A0"/><stop offset="1" stop-color="#F0B26A"/></linearGradient>
  <linearGradient id="gBot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FE0D2"/><stop offset="1" stop-color="#1FA89C"/></linearGradient>
  <linearGradient id="gMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEF2FA"/><stop offset="1" stop-color="#AAB3CC"/></linearGradient>
  <radialGradient id="gSpot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="gVig" cx=".5" cy=".5" r=".72"><stop offset=".62" stop-color="#120E2E" stop-opacity="0"/><stop offset="1" stop-color="#120E2E" stop-opacity=".55"/></radialGradient>
</defs>`; }

const grain = (o = .16) => `<rect width="1920" height="1080" filter="url(#grainF)" opacity="${o}" style="mix-blend-mode:soft-light"/>`;
const vignette = (o = 1) => `<rect width="1920" height="1080" fill="url(#gVig)" opacity="${o}"/>`;
const G = (x, y, s, inner, extra = "") => `<g transform="translate(${x} ${y}) scale(${s})" ${extra}>${inner}</g>`;
const groundShadow = (x, y, rx, ry = rx * .22, o = .28) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${P.ink}" opacity="${o}" filter="url(#b10)"/>`;

// text: display = Fredoka, reading = Atkinson Hyperlegible
const T = (x, y, s, size, fill = P.ink, o = {}) => `<text x="${x}" y="${y}" font-family="${o.read ? "Atkinson Hyperlegible" : "Fredoka"}" font-weight="${o.w || 700}" font-size="${size}" fill="${fill}" text-anchor="${o.a || "middle"}" ${o.ls ? `letter-spacing="${o.ls}"` : ""} ${o.x || ""}>${s}</text>`;
// chip: a soft pill, no dark outline; depth from a soft shadow and a top highlight
function pill(x, y, w, h, fill, label, size, ink = P.white, o = {}) {
  return `<g transform="translate(${x} ${y})" filter="url(#dropS)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>
  <rect x="${-w / 2 + 6}" y="${-h / 2 + 5}" width="${w - 12}" height="${h * .42}" rx="${h * .21}" fill="#fff" opacity=".18"/></g>` + T(x, y + size * .35, label, size, ink, o);
}
// channel identity: the logo pill
function logoPill(x, y, s = 1) {
  return G(x, y, s, `<g filter="url(#dropS)"><rect x="0" y="0" width="372" height="64" rx="32" fill="${P.ink}"/><circle cx="34" cy="32" r="19" fill="url(#gSun)"/>
  <path d="M34 42 c-11-8-13-15-8-19 c4-3 7 0 8 3 c1-3 4-6 8-3 c5 4 3 11-8 19z" fill="${P.ink}"/></g>
  <text x="64" y="43" font-family="Fredoka" font-weight="700" font-size="29" fill="#fff">TheOneApp<tspan fill="${P.sun}">, Explained</tspan></text>`);
}

// a buddy from the app art (placeholder until the SVG rigs are approved): aura disc + soft shadow + rim light
function buddy(who, pose, x, y, h, o = {}) {
  const w = h * 258 / 265, flip = o.flip ? -1 : 1;
  return (o.aura === false ? "" : `<circle cx="${x}" cy="${y - h * .46}" r="${h * .62}" fill="${P[who]}" opacity="${o.auraO || .9}"/><circle cx="${x}" cy="${y - h * .46}" r="${h * .62}" fill="url(#gSpot)"/>`) +
    groundShadow(x, y - h * .04, h * .36) +
    `<g transform="translate(${x} ${y}) scale(${flip} 1)" filter="url(#${o.rim || "rim"})"><image href="${PETDIR}${PET[who]}-${pose}.png" x="${-w / 2}" y="${-h}" width="${w}" height="${h}"/></g>`;
}

/* ---------- props: soft gradient fill + self-coloured line (a darker shade of the fill, never black) ---------- */
function teddy() { const L = "#7A4A2B"; return `
  <g stroke="${L}" stroke-width="5" stroke-linejoin="round">
  <ellipse cx="-58" cy="62" rx="30" ry="24" fill="url(#gTeddy)"/><ellipse cx="58" cy="62" rx="30" ry="24" fill="url(#gTeddy)"/>
  <ellipse cx="-66" cy="0" rx="22" ry="34" fill="url(#gTeddy)" transform="rotate(24 -66 0)"/><ellipse cx="66" cy="0" rx="22" ry="34" fill="url(#gTeddy)" transform="rotate(-24 66 0)"/>
  <ellipse cx="0" cy="22" rx="62" ry="64" fill="url(#gTeddy)"/>
  <circle cx="-50" cy="-112" r="24" fill="url(#gTeddy)"/><circle cx="50" cy="-112" r="24" fill="url(#gTeddy)"/>
  <circle cx="0" cy="-70" r="62" fill="url(#gTeddy)"/></g>
  <circle cx="-50" cy="-112" r="11" fill="#F3D2AC"/><circle cx="50" cy="-112" r="11" fill="#F3D2AC"/>
  <ellipse cx="0" cy="28" rx="36" ry="40" fill="#F3D2AC"/><ellipse cx="0" cy="-52" rx="30" ry="24" fill="#F3D2AC"/>
  <circle cx="-24" cy="-80" r="7.5" fill="${P.ink}"/><circle cx="24" cy="-80" r="7.5" fill="${P.ink}"/><circle cx="-21.5" cy="-82.5" r="2.4" fill="#fff"/><circle cx="26.5" cy="-82.5" r="2.4" fill="#fff"/>
  <ellipse cx="0" cy="-60" rx="9" ry="6.5" fill="${L}"/><path d="M0-54 v8 M-10-42 q10 9 20 0" fill="none" stroke="${L}" stroke-width="4" stroke-linecap="round"/>
  <path d="M-16 88 l32 0" stroke="${L}" stroke-width="3" stroke-dasharray="5 6" opacity=".6"/>
  <ellipse cx="-58" cy="66" rx="14" ry="11" fill="#F3D2AC"/><ellipse cx="58" cy="66" rx="14" ry="11" fill="#F3D2AC"/>
  <path d="M-30-118 q30-18 60 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".35"/>`; }

function hamster() { const L = "#A86A2A"; return `
  <g stroke="${L}" stroke-width="5" stroke-linejoin="round">
  <circle cx="-36" cy="-58" r="17" fill="#F7B58E"/><circle cx="36" cy="-58" r="17" fill="#F7B58E"/>
  <ellipse cx="0" cy="0" rx="74" ry="64" fill="url(#gHam)"/></g>
  <ellipse cx="0" cy="22" rx="46" ry="38" fill="#FFF8EC"/>
  <ellipse cx="-44" cy="6" rx="15" ry="11" fill="#FF9CA8" opacity=".55"/><ellipse cx="44" cy="6" rx="15" ry="11" fill="#FF9CA8" opacity=".55"/>
  <circle cx="-26" cy="-16" r="9" fill="${P.ink}"/><circle cx="26" cy="-16" r="9" fill="${P.ink}"/><circle cx="-23" cy="-19" r="3" fill="#fff"/><circle cx="29" cy="-19" r="3" fill="#fff"/>
  <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#F0708A"/><path d="M0 4 v6 M-8 12 q8 6 16 0" fill="none" stroke="${L}" stroke-width="3.5" stroke-linecap="round"/>
  <g stroke="${L}" stroke-width="4" fill="#FFE3C2"><ellipse cx="-20" cy="36" rx="10" ry="8"/><ellipse cx="20" cy="36" rx="10" ry="8"/><ellipse cx="-30" cy="62" rx="14" ry="8"/><ellipse cx="30" cy="62" rx="14" ry="8"/></g>
  <path d="M-36-50 q34-22 72 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".4"/>`; }

function cage(inner = "") { let bars = ""; for (let i = -150; i <= 150; i += 30) bars += `<path d="M${i} 80 V${-80 - Math.sqrt(Math.max(0, 1 - (i / 170) ** 2)) * 40}"/>`;
  return `<path d="M-170 80 V-70 Q-170-140 0-140 Q170-140 170-70 V80z" fill="#fff" opacity=".16"/>
  <g transform="translate(86 4)"><circle r="54" fill="none" stroke="#FF8FB1" stroke-width="9"/><circle r="54" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/><path d="M-54 0H54M0-54V54M-38-38L38 38M38-38L-38 38" stroke="#FF8FB1" stroke-width="3" opacity=".6"/><circle r="8" fill="#E0607F"/></g>
  <g transform="translate(-134 -40)"><rect x="-13" y="-46" width="26" height="62" rx="10" fill="#BFE6FF" stroke="#5E9BD6" stroke-width="3"/><rect x="-13" y="-18" width="26" height="34" rx="8" fill="#6FC3FF" opacity=".8"/><path d="M0 16 l16 22" stroke="#AAB3CC" stroke-width="6" stroke-linecap="round"/></g>
  ${inner}
  <g stroke="#C9D2E8" stroke-width="5" stroke-linecap="round" fill="none" opacity=".95">${bars}<path d="M-170 80 V-70 Q-170-140 0-140 Q170-140 170-70 V80"/><path d="M-170-20 H170"/></g>
  <path d="M0-140 v-18" stroke="#C9D2E8" stroke-width="6"/><circle cx="0" cy="-166" r="11" fill="none" stroke="#C9D2E8" stroke-width="5"/>
  <rect x="-186" y="72" width="372" height="40" rx="16" fill="${P.aqua}" stroke="#188A80" stroke-width="5"/><rect x="-176" y="78" width="352" height="10" rx="5" fill="#fff" opacity=".3"/>`; }

function robot(step = 0) { const L = "#147A72"; return `
  <g transform="translate(64 -10)"><rect x="0" y="-7" width="30" height="14" rx="5" fill="url(#gMetal)" stroke="#7F89A8" stroke-width="4"/>
    <g fill="url(#gSun)" stroke="#C98200" stroke-width="4" stroke-linejoin="round"><ellipse cx="46" cy="-20" rx="15" ry="20"/><ellipse cx="46" cy="20" rx="15" ry="20"/></g></g>
  <g stroke="${L}" stroke-width="5" stroke-linejoin="round">
  <rect x="${-46 + step * 8}" y="60" width="36" height="34" rx="10" fill="#FF8A66" stroke="#C4502E"/><rect x="${10 - step * 8}" y="${60 - step * 10}" width="36" height="34" rx="10" fill="#FF8A66" stroke="#C4502E"/>
  <rect x="-86" y="-22" width="26" height="56" rx="12" fill="url(#gMetal)" stroke="#7F89A8" transform="rotate(${-14 * step} -73 -20)"/>
  <rect x="-62" y="-38" width="124" height="106" rx="24" fill="url(#gBot)"/>
  <rect x="-52" y="-128" width="104" height="80" rx="22" fill="url(#gBot)"/>
  <path d="M0-128 v-22" stroke="#7F89A8"/></g><circle cx="0" cy="-158" r="11" fill="${P.coral}" stroke="#C4502E" stroke-width="4"/>
  <rect x="-38" y="-112" width="76" height="46" rx="14" fill="${P.ink}"/>
  <rect x="-26" y="-100" width="18" height="22" rx="6" fill="#FFE27A"/><rect x="8" y="-100" width="18" height="22" rx="6" fill="#FFE27A"/>
  <rect x="-40" y="-18" width="80" height="50" rx="12" fill="#fff" opacity=".9"/><circle cx="-20" cy="7" r="9" fill="${P.coral}"/><circle cx="4" cy="7" r="9" fill="${P.sun}"/><rect x="20" y="-6" width="12" height="26" rx="4" fill="${P.blue}"/>
  <path d="M-40-118 q40-12 80 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/>`; }

// a money plant leaf (heart-shaped, pointed tip, yellow streaks), tip pointing down; r = half width
function leaf(r = 50, lit = false, streak = true) { const k = r / 50;
  return `<g transform="scale(${k})"><path d="M0-34 C-22-62 -64-40 -52 2 C-44 32 -16 52 0 78 C16 52 44 32 52 2 C64-40 22-62 0-34z" fill="url(#${lit ? "gLeafLit" : "gLeaf"})" stroke="#1F7F47" stroke-width="${4 / Math.max(k, .6)}" stroke-linejoin="round"/>
  ${streak ? `<path d="M-30-20 q8 22 4 40 M24-26 q-4 20 6 34 M-12 20 q6 12 2 26" stroke="#E9F58A" stroke-width="7" stroke-linecap="round" fill="none" opacity=".75"/>` : ""}
  <path d="M0-30 V70 M0-6 L-30-16 M0 14 L30 0 M0 30 L-22 26 M0 46 L16 40" stroke="#D8F6C8" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".8"/></g>`; }

function moneyPlant() { const lf = (x, y, r, a, lit) => `<g transform="translate(${x} ${y}) rotate(${a})">${leaf(r, lit)}</g>`;
  return `<g fill="none" stroke="#2C9A55" stroke-width="7" stroke-linecap="round"><path d="M-10-60 Q-70-90 -96-30 Q-110 20 -92 70"/><path d="M10-60 Q60-120 96-80"/><path d="M0-60 Q-10-130 -36-160"/><path d="M6-60 Q30-110 20-170"/><path d="M14-58 Q90-50 104 10 Q112 60 100 110"/></g>
  ${lf(-96, 64, 30, 12)}${lf(-98, -8, 34, 40)}${lf(100, 104, 28, -10)}${lf(104, 26, 34, -34)}${lf(-56, -92, 40, 60, true)}${lf(88, -92, 40, -70)}${lf(-38, -176, 42, 150, true)}${lf(22, -188, 44, 190, true)}${lf(36, -110, 38, -120)}${lf(-8, -112, 36, 100)}
  <path d="M-62-62 H62 L48 56 Q0 70 -48 56z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/><rect x="-72" y="-78" width="144" height="30" rx="12" fill="url(#gPot)" stroke="#9C4423" stroke-width="5"/>
  <path d="M-58-70 h60" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>`; }

// pointing hand (points right; flip for left)
function hand(fill = "#fff") { return `<g fill="${fill}"><rect x="-70" y="-34" width="92" height="76" rx="30"/><rect x="-10" y="-34" width="110" height="34" rx="17"/><rect x="-78" y="-10" width="30" height="46" rx="14" opacity=".85"/></g>`; }

if (typeof module !== "undefined") module.exports = { P };
