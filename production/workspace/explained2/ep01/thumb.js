// thumb.js: a thumbnail in the teacher-approved style (BRIEF.md, THUMBNAILS): a bright frame of the episode, the words right-aligned on
// the bright right side (white lines, then sun-yellow lines, thick dark-violet stroke), a tilted raspberry PART badge bottom-left.
//   node thumb.js <frame.png> <out.jpg> <part> "WHITE LINE|WHITE LINE" "YELLOW LINE|YELLOW LINE" [topY]
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const [frame, out, part, white, yellow, topY, sW, sY] = process.argv.slice(2); const F = path.resolve(__dirname, '../fonts/node_modules/@fontsource/nunito/files/nunito-latin-900-normal.woff2');
  const lines = [...white.split('|').map((l) => [l, '#FFFFFF']), ...yellow.split('|').map((l) => [l, '#FFC83A'])]; let y = +(topY || 250), tx = '';
  for (const [l, c] of lines) { const size = c === '#FFFFFF' ? +(sW || 150) : +(sY || 124); tx += `<text x="1850" y="${y}" text-anchor="end" font-family="NunitoB" font-weight="900" font-size="${size}" fill="${c}" stroke="#2B2147" stroke-width="26" stroke-linejoin="round" paint-order="stroke" letter-spacing="-2">${l.replace(/&/g, '&amp;')}</text>`; y += size * .96; }
  const html = `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:NunitoB;font-weight:900;src:url(file://${F})}html,body{margin:0}</style>
  <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#2B2147" flood-opacity=".35"/></filter></defs>
  <image href="file://${path.resolve(frame)}" width="1920" height="1080"/>${tx}
  <g transform="translate(340 925) rotate(-6)" filter="url(#sh)"><rect x="-268" y="-98" width="536" height="196" rx="40" fill="#fff"/><rect x="-254" y="-84" width="508" height="168" rx="30" fill="#E8375A"/>
  <text x="0" y="46" text-anchor="middle" font-family="NunitoB" font-weight="900" font-size="130" fill="#fff" stroke="#8E1F3C" stroke-width="10" stroke-linejoin="round" paint-order="stroke">PART ${part}</text></g></svg>`;
  const tmp = path.join(__dirname, 'qa', 'th', `_t${part}.html`); fs.writeFileSync(tmp, html); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.load('900 40px NunitoB').then(() => document.fonts.ready)); await p.screenshot({ path: out, type: 'jpeg', quality: 93 }); await b.close(); console.log(out); })();
