// capture.js: the REAL app screens composited into the film ("Now showing" panels), from a local copy served read-only.
//   (cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1 &)   NODE_PATH=$(npm root -g) node capture.js [name ...]
// The members-only check (/api/access) cannot reach a server here, so each page opens as its own catch() allows ("server unreachable:
// let the room open"). Nothing in /home/user/theoneapp is edited: the pupil's character, purse and pet are set in this browser's storage.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const AVS = (() => { const s = fs.readFileSync(path.join(__dirname, 'avatars.js'), 'utf8'); const w = {}; new Function('window', s)(w); return w.AV; })();
const now = new Date(), day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
function purse(total, spent, owned) { return { v: 1, total, spent, owned, days: { [day]: { n: 0, login: true, keys: [] } }, log: [], first: true, how: {} }; }
const FIRST = ['shop:look-labcoat', 'shop:prop-testtube', 'shop:eyes-sparkle', 'shop:mouth-grin'];
const SHOTS = {
  shop: { page: 'shop.html', store: { 'sm-avatar-v1': AVS.you0.cfg, 'sm-credits-v1': purse(50, 0, FIRST) }, steps: async (p) => { await p.fill('#sp-q', 'goggles'); await p.waitForTimeout(700); await clickText(p, 'Safety Goggles'); await p.waitForTimeout(1500); } },
  dress: { page: 'dressing.html', store: { 'sm-avatar-v1': AVS.you0.cfg, 'sm-credits-v1': purse(50, 0, FIRST) }, steps: async (p) => { await clickText(p, 'On The Head'); await p.waitForTimeout(1500); } },
  dress2: { page: 'dressing.html', store: { 'sm-avatar-v1': AVS.you.cfg, 'sm-credits-v1': purse(50, 50, FIRST.concat(['shop:safetygoggles'])) }, steps: async (p) => { await clickText(p, 'On The Head'); await p.waitForTimeout(1500); } },
  shop2: { page: 'shop.html', store: { 'sm-avatar-v1': AVS.you0.cfg, 'sm-credits-v1': purse(50, 0, FIRST) }, steps: async (p) => { await p.fill('#sp-q', 'goggles'); await p.waitForTimeout(700); await clickText(p, 'Safety Goggles'); await p.waitForTimeout(900); await clickText(p, 'Buy for 50'); await p.waitForTimeout(2500); } },
  boss: { page: 'bossclash.html', store: { 'sm-avatar-v1': AVS.you.cfg, 'sm-credits-v1': purse(50, 50, FIRST.concat(['shop:safetygoggles'])) }, steps: async (p) => { await p.waitForTimeout(1500); } },
  boss2: { page: 'bossclash.html', store: { 'sm-avatar-v1': AVS.you.cfg, 'sm-credits-v1': purse(50, 50, FIRST.concat(['shop:safetygoggles'])), 'sm-bossclash-mine-v1': 1 }, steps: async (p) => { await clickText(p, 'Story Mode'); await p.waitForTimeout(2500); } },
  claw: { page: 'claw.html', store: { 'sm-avatar-v1': AVS.you.cfg, 'sm-credits-v1': purse(60, 50, FIRST.concat(['shop:safetygoggles'])) }, steps: async (p) => { await p.waitForTimeout(2500); await p.evaluate(() => window.startVsPet && window.startVsPet()); await p.waitForTimeout(1200); await p.evaluate(() => { const b = [...document.querySelectorAll('button')].filter(x => /Normal/.test(x.textContent) && x.getClientRects().length); if (b.length) b[b.length - 1].click(); }); await p.waitForTimeout(6000); } },
};
async function clickText(p, txt) { const el = p.getByText(txt, { exact: false }).first(); try { await el.click({ timeout: 4000 }); } catch (e) { console.log('  no click on', txt, e.message.split('\n')[0]); } }
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] }); const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS);
  for (const n of names) { const S = SHOTS[n]; const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5, colorScheme: 'dark' });
    await ctx.addInitScript((st) => { try { if (!sessionStorage.getItem('_set')) { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, JSON.stringify(v)); localStorage.setItem('sm-sfx-v1', 'off'); sessionStorage.setItem('_set', '1'); } } catch (e) {} }, S.store);
    const p = await ctx.newPage(); p.on('pageerror', e => console.log('  PAGEERR', n, e.message.slice(0, 160)));
    await p.goto('http://127.0.0.1:8765/' + S.page, { waitUntil: 'load' }); await p.waitForTimeout(2500);
    // the daily "+1 credit for coming back today" toast covers the top of every page: wait it out, or hide it for the still
    await S.steps(p); await p.addStyleTag({ content: '.cr-toast,#cr-toast,[class*="toast"]{display:none!important}' }).catch(() => {});
    await p.waitForTimeout(400); const png = path.join(__dirname, 'shots', n + '.png'); await p.screenshot({ path: png }); execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-q:v', '3', png.replace(/png$/, 'jpg')]); fs.unlinkSync(png); console.log('shot', n, p.url()); await ctx.close(); }
  await b.close(); })();
