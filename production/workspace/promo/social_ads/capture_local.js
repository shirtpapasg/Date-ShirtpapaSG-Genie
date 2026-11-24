// capture_local.js: REAL app screens, phone-sized (390 x 844 @3x), from the local copy of the app served read-only.
//   (cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1 &)
//   NODE_PATH=$(npm root -g) node capture_local.js [name ...]
// Nothing in /home/user/theoneapp is edited. Like ../film4/capture.js, the pupil's character and purse are set in this browser's
// storage (characters from ../film4/avatars.js), and first-visit tours are marked as seen so the page itself shows.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const AVS = (() => { const s = fs.readFileSync(path.join(__dirname, '../film4/avatars.js'), 'utf8'); const w = {}; new Function('window', s)(w); return w.AV; })();
const now = new Date(), day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
function purse(total, spent, owned) { return { v: 1, total, spent, owned, days: { [day]: { n: 0, login: true, keys: [] } }, log: [], first: true, how: {} }; }
const FIRST = ['shop:look-labcoat', 'shop:prop-testtube', 'shop:eyes-sparkle', 'shop:mouth-grin'];
const SEEN = { 'sm-seen-v1': 1, 'sm-welcome-v1': 1, 'sm-tour2-seen': 1, 'sm-tour2-done': 1, 'sm-mmtour-v1': { done: true }, 'sm-swipe-first-v1': 1, 'sm-swipe-hint-v2': 1 };
const ME = { 'sm-avatar-v1': AVS.you.cfg, 'sm-credits-v1': purse(120, 50, FIRST.concat(['shop:safetygoggles'])) };
const SHOTS = {
  home: { page: 'swipe.html', store: ME, wait: 3500 },
  videos: { page: 'videos.html', store: ME, wait: 3000 },
  mindmap: { page: 'mindmap.html', store: ME, wait: 2500, steps: async (p) => { await clickText(p, 'Light'); await p.waitForTimeout(6000); } },
  // the School Lab opens only on a tablet or laptop (a phone is told to use one), so these two are landscape, like an iPad
  lab: { page: 'labs/p3-5-1/index.html', store: ME, wait: 12000, land: true },
  darkbox: { page: 'labs/darkbox/index.html', store: ME, wait: 12000, land: true },
  mapland: { page: 'mindmap.html', store: ME, wait: 2500, land: true, steps: async (p) => { await clickText(p, 'Light'); await p.waitForTimeout(7000); const el = await p.$('text=Full screen'); if (el) { await el.click().catch(() => {}); await p.waitForTimeout(2500); } } },
  buddies: { page: 'buddies.html', store: ME, wait: 3500 },
  shop: { page: 'shop.html', store: { 'sm-avatar-v1': AVS.you0.cfg, 'sm-credits-v1': purse(50, 0, FIRST) }, wait: 2500, steps: async (p) => { await p.fill('#sp-q', 'goggles').catch(() => {}); await p.waitForTimeout(700); await clickText(p, 'Safety Goggles'); await p.waitForTimeout(1500); } },
  dress: { page: 'dressing.html', store: ME, wait: 2500, steps: async (p) => { await clickText(p, 'On The Head'); await p.waitForTimeout(1500); } },
  boss: { page: 'bossclash.html', store: ME, wait: 3000 },
};
async function clickText(p, txt) { const el = p.getByText(txt, { exact: false }).first(); try { await el.click({ timeout: 4000 }); } catch (e) { console.log('  no click on', txt); } }
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS);
  for (const n of names) { const S = SHOTS[n];
    const ctx = await b.newContext(S.land ? { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1.5, colorScheme: 'dark', hasTouch: true }
      : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: 'dark', isMobile: true, hasTouch: true });
    await ctx.addInitScript((st) => { try { if (!sessionStorage.getItem('_set')) { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, JSON.stringify(v)); localStorage.setItem('sm-sfx-v1', '"off"'); sessionStorage.setItem('_set', '1'); } } catch (e) {}
      document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = '#ft-card,.cr-toast,#cr-toast,#wn{display:none!important}'; document.head.appendChild(s); }); }, { ...SEEN, ...S.store });
    const p = await ctx.newPage(); p.on('pageerror', e => console.log('  PAGEERR', n, e.message.slice(0, 120)));
    await p.goto('http://127.0.0.1:8765/' + S.page, { waitUntil: 'load' }); await p.waitForTimeout(S.wait || 2500);
    if (S.steps) await S.steps(p);
    await p.waitForTimeout(400); await p.screenshot({ path: path.join(__dirname, 'shots', n + '.jpg'), type: 'jpeg', quality: 92, timeout: 120000 }); console.log('shot', n); await ctx.close(); }
  await b.close(); })();
