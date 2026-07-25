// Asercje po buildzie (_site/). Uruchamiane lokalnie i w CI: node tools/verify_build.mjs
// Kończy się kodem 1 przy pierwszej klasie błędów.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parsujDate } from "../lib/daty.js";
import { ZASTEPOWANE, slugWpisu, permalinkStrony } from "../lib/zrodla.js";

const SITE = "_site";
let bledy = 0;
const blad = (msg) => { console.error("BŁĄD: " + msg); bledy++; };
const ok = (msg) => console.log("OK: " + msg);

// ---------- 1. Każdy wpis i podstrona ma plik wyjściowy ----------
const wpisyPliki = readdirSync("content/wpisy").filter((f) => f.endsWith(".md"));
const TERAZ = Date.now();
let wpisowOk = 0, zaplanowane = 0;
for (const plik of wpisyPliki) {
  const { data: fm } = matter(readFileSync(path.join("content/wpisy", plik), "utf8"));
  const slug = slugWpisu(fm, plik);
  const wyjscie = path.join(SITE, slug, "index.html");
  // Wpisy zaplanowane na przyszłość nie są budowane (patrz src/_data/wpisy.js).
  // Asercja negatywna: gdyby taki wpis MIAŁ plik wyjściowy, to wyciek (np. artefakt
  // po podglądzie ELEVENTY_PRZYSZLE=1 bez wyczyszczenia _site).
  if (parsujDate(fm.date, plik).getTime() > TERAZ) {
    zaplanowane++;
    if (existsSync(wyjscie)) blad(`wpis zaplanowany ${plik} wyciekł do builda (${wyjscie} istnieje)`);
    continue;
  }
  if (existsSync(wyjscie)) wpisowOk++;
  else blad(`brak pliku wyjściowego dla wpisu ${plik} (oczekiwano ${wyjscie})`);
}
const opublikowane = wpisyPliki.length - zaplanowane;
if (wpisowOk === opublikowane) ok(`wpisy: ${wpisowOk}/${opublikowane} zbudowane${zaplanowane ? ` (+${zaplanowane} zaplanowane)` : ""}`);

const stronyPliki = readdirSync("content/strony").filter((f) => f.endsWith(".md") && !ZASTEPOWANE.has(f));
let stronOk = 0;
for (const plik of stronyPliki) {
  const { data: fm } = matter(readFileSync(path.join("content/strony", plik), "utf8"));
  const sciezka = permalinkStrony(fm, plik);
  const wyjscie = path.join(SITE, sciezka, "index.html");
  if (existsSync(wyjscie)) stronOk++;
  else blad(`brak pliku wyjściowego dla podstrony ${plik} (oczekiwano ${wyjscie})`);
}
if (stronOk === stronyPliki.length) ok(`podstrony: ${stronOk}/${stronyPliki.length} zbudowane`);

// Widoki główne + techniczne
for (const p of ["index.html", "blog/index.html", "projekty/index.html", "o-mnie/index.html", "newsletter/index.html", "wsparcie/index.html", "kontakt/index.html", "404.html", "feed.xml", "feed/index.html", "sitemap.xml", "robots.txt", "CNAME"]) {
  if (!existsSync(path.join(SITE, p))) blad(`brak ${p}`);
}
ok("widoki główne i pliki techniczne obecne");

// ---------- 2. Odwołania do /media/ i /assets/ wskazują istniejące pliki ----------
function htmlPliki(dir) {
  const wynik = [];
  for (const el of readdirSync(dir)) {
    const pelna = path.join(dir, el);
    if (statSync(pelna).isDirectory()) wynik.push(...htmlPliki(pelna));
    else if (el.endsWith(".html")) wynik.push(pelna);
  }
  return wynik;
}

const html = htmlPliki(SITE);
let brakujaceMedia = 0;
let relatywneMedia = 0;
const sprawdzone = new Set();
for (const plik of html) {
  const tresc = readFileSync(plik, "utf8");
  // relatywne "media/ w atrybutach = przegapione przez rewrite
  if (/\s(?:src|href|poster)="media\//.test(tresc)) {
    blad(`relatywny adres "media/..." w ${plik}`);
    relatywneMedia++;
  }
  const adresy = [...tresc.matchAll(/\s(?:src|href|poster)="(\/(?:media|assets)\/[^"]+)"/g)].map((m) => m[1]);
  const zSrcset = [...tresc.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) =>
    m[1].split(",").map((c) => c.trim().split(/\s+/)[0]).filter((u) => u.startsWith("/media/") || u.startsWith("/assets/"))
  );
  for (const adres of [...adresy, ...zSrcset]) {
    const czysty = decodeURIComponent(adres.split("?")[0].split("#")[0]);
    if (sprawdzone.has(czysty)) continue;
    sprawdzone.add(czysty);
    if (!existsSync(path.join(SITE, czysty))) {
      blad(`brak pliku: ${czysty} (użyty m.in. w ${plik})`);
      brakujaceMedia++;
    }
  }
}
if (!brakujaceMedia && !relatywneMedia) ok(`media+assets: ${sprawdzone.size} unikalnych adresów - wszystkie istnieją`);

// ---------- 3. Sanity 1:1 - charakterystyczne fragmenty treści przeszły przez markdown-it ----------
const sanity = [
  { plik: "pocket/index.html", fragment: "wp-block-paragraph" },
  { plik: "pstryk-czy-taryfa-strefowa/index.html", fragment: "<table" },
  { plik: "tematy/ksiazki/index.html", fragment: "wp-block-kadence-iconlist" },
];
for (const s of sanity) {
  const p = path.join(SITE, s.plik);
  if (!existsSync(p)) { blad(`sanity: brak ${s.plik}`); continue; }
  const tresc = readFileSync(p, "utf8");
  if (!tresc.includes(s.fragment)) blad(`sanity: w ${s.plik} brak fragmentu "${s.fragment}" - treść zmanglowana?`);
}
// wykrycie zmanglowanego HTML: <p> zamienione na code block
let zCodeBlokiem = 0;
for (const plik of html) {
  const tresc = readFileSync(plik, "utf8");
  const m = tresc.match(/<pre><code>\s*&lt;(p|div|figure|style)/);
  if (m) { blad(`markdown-it zamienił HTML w code block: ${plik}`); zCodeBlokiem++; }
}
if (!zCodeBlokiem) ok("sanity 1:1 treści przeszło");

// ---------- 4. Feed i sitemap ----------
const feed = readFileSync(path.join(SITE, "feed.xml"), "utf8");
if (!feed.startsWith("<?xml")) blad("feed.xml nie zaczyna się od deklaracji XML");
const itemy = (feed.match(/<item>/g) || []).length;
// Feed bierze take(20) najnowszych opublikowanych - dokładna liczba, nie próg.
const oczekiwaneItemy = Math.min(20, opublikowane);
if (itemy !== oczekiwaneItemy) blad(`feed.xml ma ${itemy} pozycji, oczekiwano ${oczekiwaneItemy}`);
const niedomkniete = (feed.match(/<item>/g) || []).length !== (feed.match(/<\/item>/g) || []).length;
if (niedomkniete) blad("feed.xml: niedomknięte <item>");
if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(feed)) blad("feed.xml: niezaescapowany znak & - XML może się nie parsować");
ok(`feed.xml: ${itemy} pozycji`);

const sitemapa = readFileSync(path.join(SITE, "sitemap.xml"), "utf8");
const loce = (sitemapa.match(/<loc>/g) || []).length;
if (loce < opublikowane + stronyPliki.length + 7) blad(`sitemap.xml ma ${loce} adresów - za mało`);
else ok(`sitemap.xml: ${loce} adresów`);

// ---------- 5. Pagefind ----------
if (!existsSync(path.join(SITE, "pagefind", "pagefind-ui.js"))) blad("brak indeksu Pagefind (uruchom npm run build, nie sam eleventy)");
else ok("indeks Pagefind obecny");

// ---------- Wynik ----------
if (bledy) {
  console.error(`\n${bledy} błędów weryfikacji.`);
  process.exit(1);
}
console.log("\nWeryfikacja builda: wszystko OK.");
