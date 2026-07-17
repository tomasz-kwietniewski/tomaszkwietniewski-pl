// Jednorazowy backfill: wpisuje pole `miniatura` do frontmatteru wpisów na
// podstawie wyróżniających obrazków (featured images) z WordPressa.
// Źródło mapowania: export/raw/posts.json (featured_media) + media.json (id -> url).
// Pliki obrazków są już w media/. Uruchamiać z katalogu repo: node tools/backfill_miniatury.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PREFIX = "https://tomaszkwietniewski.pl/wp-content/uploads/";

const posts = JSON.parse(readFileSync(path.join(ROOT, "export/raw/posts.json"), "utf8"));
const media = JSON.parse(readFileSync(path.join(ROOT, "export/raw/media.json"), "utf8"));
const mediaById = {};
for (const m of media) mediaById[m.id] = m.source_url || "";

// slug -> /media/... (tylko gdy plik istnieje lokalnie)
const mapa = {};
for (const p of posts) {
  const fmId = p.featured_media || 0;
  if (!fmId) continue;
  const url = mediaById[fmId] || "";
  if (!url.startsWith(PREFIX)) continue;
  const rel = "media/" + url.slice(PREFIX.length).split("?")[0];
  if (existsSync(path.join(ROOT, rel))) mapa[p.slug] = "/" + rel;
}
// Nowy wpis (nie z WP) - miniatura z treści
mapa["pstryk-czy-taryfa-strefowa"] = "/media/2026/07/pstryk-vs-pge-taryfa-strefowa.jpg";

const DIR = path.join(ROOT, "content/wpisy");
let dodane = 0, pominiete = 0, bezMapy = 0;
for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const pełna = path.join(DIR, plik);
  const raw = readFileSync(pełna, "utf8");
  const { data: fm } = matter(raw);
  const slug = String(fm.slug || plik.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")).trim();
  const miniatura = mapa[slug];
  if (!miniatura) { bezMapy++; console.log("  bez mapy:", plik); continue; }
  if (/^miniatura:/m.test(raw.split("---")[1] || "")) { pominiete++; continue; }

  const nl = raw.includes("\r\n") ? "\r\n" : "\n";
  // Wstaw po linii slug: (albo po title:, gdyby slug nie było)
  const linia = `miniatura: "${miniatura}"`;
  let zmienione = raw.replace(/^(slug:.*)$/m, `$1${nl}${linia}`);
  if (zmienione === raw) zmienione = raw.replace(/^(title:.*)$/m, `$1${nl}${linia}`);
  if (zmienione === raw) { console.log("  NIE wstawiono (brak slug/title):", plik); continue; }
  writeFileSync(pełna, zmienione);
  dodane++;
}
console.log(`\nDodano miniatura: ${dodane} | juz mialy: ${pominiete} | bez mapowania: ${bezMapy}`);
