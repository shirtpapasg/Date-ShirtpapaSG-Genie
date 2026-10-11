
const STAGES = [["scripted","Scripted"],["rendered","Rendered"],["approved","Approved"],["uploaded","Uploaded"],["live","Live"]];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let db = null, eps = [];

const NEXT = {"scripted": "Next: Claude renders the video.", "rendered": "Next: watch it here, then press Approve.", "approved": "Next: upload to YouTube as Unlisted and paste the link below.", "uploaded": "Next: link it from TheOneApp.", "live": "Done: live in TheOneApp."};
function stageOf(e){ if (e.live) return "live"; if (e.approved && e.youtubeUrl) return "uploaded"; if (e.approved) return "approved"; return e.rendered ? "rendered" : "scripted"; }
function renderPipe(){
  const c = Object.fromEntries(STAGES.map(([k]) => [k, 0])); eps.forEach(e => c[stageOf(e)]++);
  $("#pipe").innerHTML = STAGES.map(([k, n]) => `<span class="pill"><span class="dot" style="background:var(--s-${k})"></span>${n} <span class="n">${c[k]}</span></span>`).join("");
}
const when = iso => { try { return new Date(iso).toLocaleString(undefined, {day: "numeric", month: "short", hour: "numeric", minute: "2-digit"}); } catch (e) { return ""; } };
const needsReview = e => !e.pending && e.videoUpdatedAt && (!e.reviewedAt || e.reviewedAt < e.videoUpdatedAt);
function reviewBadge(e){
  const list = (e.changes || []).length ? `<ul>${e.changes.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : "";
  if (e.pending) return `<div class="rv wip" role="status"><b>⏳ Update in progress</b><span class="when">Changes are being made. Wait for the green badge before reviewing.</span>${list}</div>`;
  if (needsReview(e)) return `<div class="rv new" role="status"><b>🆕 New version: ready to review</b><span class="when">Updated ${esc(when(e.videoUpdatedAt))}</span>${list}<button data-act="reviewed">✓ Mark reviewed</button></div>`;
  if (e.videoUpdatedAt) return `<div class="rv seen"><b>✓ Reviewed</b><span class="when">Version of ${esc(when(e.videoUpdatedAt))}</span></div>`;
  return ""; }
function renderList(){
  if (!eps.length) { $("#list").innerHTML = `<div class="empty">No episodes yet. Claude adds each episode here as it is scripted.</div>`; renderPipe(); return; }
  const nr = eps.filter(needsReview).length, nw = eps.filter(e => e.pending).length;
  const sum = nr || nw ? `<div class="revsum" role="status">${nr ? `🆕 ${nr} episode${nr > 1 ? "s" : ""} ready to review` : ""}${nr && nw ? " · " : ""}${nw ? `⏳ ${nw} being updated` : ""}</div>` : "";
  $("#list").innerHTML = sum + eps.map(e => { const st = stageOf(e); const label = STAGES.find(s => s[0] === st)[1];
    const v = (e.narrator || "").toLowerCase();
    return `<article class="ep" data-id="${esc(e.id)}">
      <div class="vcol">${e.parts && e.parts.length ? `<button class="tw" data-act="play" aria-label="Play episode ${esc(e.no)}">${e.thumb ? `<img class="thumb" src="${esc(e.thumb)}" alt="">` : `<div class="thumb">video</div>`}<span class="play"><span>▶</span></span></button>` : (e.thumb ? `<img class="thumb" src="${esc(e.thumb)}" alt="Thumbnail for episode ${esc(e.no)}">` : `<div class="thumb">thumbnail<br>coming</div>`)}
      ${reviewBadge(e)}</div>
      <div class="meta">
        <div class="top"><span class="no">EP ${String(e.no).padStart(2, "0")}</span>${e.narrator ? `<span class="tag ${v}">${esc(e.narrator)}</span>` : ""}${e.runtime ? `<span class="no">${esc(e.runtime)}</span>` : ""}</div>
        <ol class="track" aria-label="Stage: ${label}">${STAGES.map(([k, n], i) => { const ci = STAGES.findIndex(x => x[0] === st); const lab = `${i < ci ? "✓ " : ""}${n}`; return `<li class="${i <= ci ? "on" : ""}${i === ci ? " cur" : ""}"${i <= ci ? ` style="background:var(--s-${k})"` : ""}>${k === "approved" && e.rendered ? `<button class="tb" data-act="approve" title="${e.approved ? "Undo approval" : "Approve this episode"}">${lab}</button>` : lab}</li>`; }).join("")}</ol>
        <div class="nextstep">${NEXT[st]}</div>
        <h2 class="title">${esc(e.title)}</h2>
        <div class="sub">${esc(e.chapter)}${e.ytTitle ? ` · YouTube title: “${esc(e.ytTitle)}”` : ""}</div>
        <div class="row">
          ${e.parts && e.parts.length ? `<button class="pl" data-act="play">▶ Play episode</button>` : ""}
          <label class="sr" for="u-${esc(e.id)}" hidden>YouTube link</label>
          <input type="url" id="u-${esc(e.id)}" placeholder="Paste the Unlisted YouTube link" value="${esc(e.youtubeUrl)}">
          ${e.youtubeUrl ? `<a class="yt" href="${esc(e.youtubeUrl)}" target="_blank" rel="noopener">Watch ↗</a>` : ""}
          <button class="${e.approved ? "" : "ok"}" data-act="approve" ${e.rendered ? "" : "disabled title='The video is not ready yet'"}>${e.approved ? "Undo approval" : "Approve"}</button>
          <span class="saved" id="s-${esc(e.id)}"></span>
        </div>
        <textarea id="n-${esc(e.id)}" placeholder="Notes for Claude (changes you want)">${esc(e.notes)}</textarea>
      </div></article>`; }).join("");
  renderPipe();
}
async function save(id, patch){
  if (!db) { const s = $("#s-" + id); if (s) s.textContent = "Open in Claude to save"; return; }
  try { await db.doc("episodes/" + id).update({...patch, updatedAt: new Date().toISOString()}); const s = $("#s-" + id); if (s) s.textContent = "Saved"; }
  catch (err) { const s = $("#s-" + id); if (s) s.textContent = err && err.code === "not_granted" ? "You can view but not edit" : "Not saved, try again"; }
}
document.addEventListener("change", ev => { const a = ev.target.closest(".ep"); if (!a) return; const id = a.dataset.id;
  if (ev.target.type === "url") { const url = ev.target.value.trim(); if (url && !/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) { $("#s-" + id).textContent = "Paste a youtube.com or youtu.be link"; return; } save(id, {youtubeUrl: url}); }
  if (ev.target.tagName === "TEXTAREA") save(id, {notes: ev.target.value}); });
let cur = null, idx = 0, durs = [], seeking = false, pendingT = null;
const fmt = t => { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };
const offs = i => durs.slice(0, i).reduce((a, b) => a + (b || 0), 0);
const total = () => durs.reduce((a, b) => a + (b || 0), 0);
function probe(e){ durs = e.parts.map(() => 0); e.parts.forEach((u, i) => { const m = document.createElement("video"); m.preload = "metadata"; m.muted = true;
  m.onloadedmetadata = () => { if (cur === e) { durs[i] = m.duration; tick(); } m.removeAttribute("src"); m.load(); }; m.src = u; }); }
function tick(){ const v = $("#pv"); if (!cur) return; if (v.duration && !durs[idx]) durs[idx] = v.duration;
  const T = total(), now = offs(idx) + (v.currentTime || 0);
  if (!seeking) $("#pseek").value = T ? Math.round(now / T * 1000) : 0;
  $("#ptime").textContent = `${fmt(seeking ? $("#pseek").value / 1000 * T : now)} / ${fmt(T)}`; $("#pplay").textContent = v.paused ? "▶" : "❚❚"; }
function loadPart(i, autoplay, at){ idx = i; $("#pdone").hidden = true; const v = $("#pv"); pendingT = at || null; v.src = cur.parts[i]; $("#ppart").textContent = "";
  const n = cur.parts[i + 1]; const pn = $("#pnext"); if (n) { pn.src = n; pn.load(); } else pn.removeAttribute("src");
  if (autoplay) v.play().catch(() => {}); tick(); }
function seekTo(t){ const v = $("#pv"); let i = 0; while (i < durs.length - 1 && t >= offs(i + 1)) i++;
  const local = Math.max(0, t - offs(i)); if (i === idx && v.src) { v.currentTime = local; $("#pdone").hidden = true; } else loadPart(i, !v.paused || !$("#pdone").hidden, local); }
$("#pv").addEventListener("loadedmetadata", () => { const v = $("#pv"); durs[idx] = v.duration; if (pendingT) { v.currentTime = Math.min(pendingT, v.duration - .05); pendingT = null; } tick(); });
["timeupdate","play","pause"].forEach(k => $("#pv").addEventListener(k, tick));
$("#pv").addEventListener("click", () => { const v = $("#pv"); v.paused ? v.play().catch(() => {}) : v.pause(); });
$("#pplay").addEventListener("click", () => { const v = $("#pv"); if (!$("#pdone").hidden) { loadPart(0, true); return; } v.paused ? v.play().catch(() => {}) : v.pause(); });
$("#pseek").addEventListener("input", () => { seeking = true; tick(); });
$("#pseek").addEventListener("change", () => { seeking = false; seekTo($("#pseek").value / 1000 * total()); });
$("#pfull").addEventListener("click", () => { const w = $(".vwrap"); (w.requestFullscreen ? w.requestFullscreen() : Promise.reject()).catch(() => { const v = $("#pv"); if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); }); });
function openPlayer(e){ cur = e; $("#ptitle").textContent = `EP ${String(e.no).padStart(2, "0")} · ${e.ytTitle || e.title}`; const d = $("#player"); if (!d.open) d.showModal(); probe(e); loadPart(0, true); }
$("#pv").addEventListener("ended", () => { if (!cur) return; if (idx + 1 < cur.parts.length) { loadPart(idx + 1, true); return; }
  const nx = eps.find(x => x.no === cur.no + 1 && x.parts && x.parts.length); $("#pnextep").hidden = !nx; $("#pdone").hidden = false; tick(); });
$("#preplay").addEventListener("click", () => { if (cur) loadPart(0, true); });
$("#pnextep").addEventListener("click", () => { const nx = cur && eps.find(x => x.no === cur.no + 1 && x.parts && x.parts.length); if (nx) openPlayer(nx); });
$("#pclose").addEventListener("click", () => $("#player").close());
$("#player").addEventListener("close", () => { const v = $("#pv"); v.pause(); v.removeAttribute("src"); v.load(); $("#pnext").removeAttribute("src"); cur = null; });
document.addEventListener("click", ev => { const p = ev.target.closest("[data-act=play]"); if (p) { const e = eps.find(x => x.id === p.closest(".ep").dataset.id); if (e) openPlayer(e); return; } });
document.addEventListener("click", ev => { const b = ev.target.closest("button[data-act=reviewed]"); if (!b) return; save(b.closest(".ep").dataset.id, {reviewedAt: new Date().toISOString()}); });
document.addEventListener("click", ev => { const b = ev.target.closest("button[data-act=approve]"); if (!b) return; const id = b.closest(".ep").dataset.id; const e = eps.find(x => x.id === id); save(id, {approved: !e.approved}); });

(async () => { try { db = window.claude ? await window.claude.use("db") : null; } catch (e) { db = null; }
  if (!db) { $("#empty").textContent = "This board saves inside Claude. Open it from your Claude account to see and edit episodes."; return; }
  db.collection("episodes").orderBy("no").onSnapshot(snap => { eps = snap.docs.map(d => ({id: d.id, ...d.data()})); renderList(); },
    () => { $("#empty").textContent = "Couldn't load the episodes. Refresh the page to try again."; });
})();
