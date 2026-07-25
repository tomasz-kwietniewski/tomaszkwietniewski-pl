import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { md } from "../../lib/markdown.js";
import { rewriteMediaUrls, opakujTabele, usunObceOsadzenia } from "../../lib/media.js";
import { mapujKategorie, SLUGI } from "../../lib/kategorie.js";
import { wyznaczMiniature } from "../../lib/miniatury.js";
import { czasCzytania, tekstZHtml } from "../../lib/czytanie.js";
import { parsujDate } from "../../lib/daty.js";
import { slugWpisu, skroc } from "../../lib/zrodla.js";
import { metadaneObrazka } from "../../lib/obrazki.js";

const DIR = "content/wpisy";

export default async function () {
  const wpisy = [];
  // Publikacja zaplanowana: wpis z datą w przyszłości jest pomijany do jej nadejścia.
  // Cron w .github/workflows/deploy-pages.yml przebudowuje stronę codziennie rano, więc
  // taki wpis pojawia się sam. Podgląd zaplanowanych lokalnie: ELEVENTY_PRZYSZLE=1 npm run build.
  const TERAZ = Date.now();
  const POKAZ_PRZYSZLE = process.env.ELEVENTY_PRZYSZLE === "1";

  // Wykrywanie kolizji slugów z czytelnym komunikatem (Eleventy też by się wywalił,
  // ale jego błąd nie wskazuje, które pliki .md kolidują).
  const zajeteSlugi = new Map();

  for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
    const { data: fm, content } = matter(readFileSync(path.join(DIR, plik), "utf8"));

    // Data bez offsetu = czas polski; parser jest deterministyczny niezależnie od
    // strefy procesu (CI działa w UTC) i failuje głośno na braku/błędzie daty.
    const data = parsujDate(fm.date, `${DIR}/${plik}`);

    // Wpis zaplanowany na przyszłość - pomijamy, dopóki data publikacji nie nadejdzie.
    if (!POKAZ_PRZYSZLE && data.getTime() > TERAZ) continue;

    const slug = slugWpisu(fm, plik);

    if (zajeteSlugi.has(slug)) {
      throw new Error(`Zduplikowany slug "${slug}": ${zajeteSlugi.get(slug)} i ${plik} - zmień slug w jednym z nich`);
    }
    zajeteSlugi.set(slug, plik);

    const kategorieNowe = mapujKategorie(fm.kategorie, plik);
    const rawBody = usunObceOsadzenia(opakujTabele(rewriteMediaUrls(md.render(content))));
    // Miniatura: 1) jawne pole z frontmatter (featured image z WP / ustawione w CMS),
    // 2) fallback (pierwszy obrazek z treści -> miniatura YouTube -> placeholder).
    const miniatura = normalizujMiniature(fm.miniatura) || wyznaczMiniature(rawBody, kategorieNowe);
    // Obrazek przewodni renderuje layout wpisu z pola miniatura. Jeśli treść zaczyna się
    // od tego samego obrazka, usuwamy go z treści, by nie dublować (hero + ten sam <img>).
    const bodyHtml = usunWiodacaMiniature(rawBody, miniatura);
    const excerpt = String(fm.excerpt || "").trim();

    wpisy.push({
      plik,
      slug,
      permalink: `/${slug}/`,
      title: String(fm.title || slug),
      date: data,
      modified: fm.modified ? parsujDate(fm.modified, `${DIR}/${plik}`) : data,
      urlStara: fm.url_stara || null,
      kategorieNowe,
      kategorieSlugi: kategorieNowe.map((k) => SLUGI[k]),
      excerpt,
      metaDescription: excerpt ? skroc(excerpt, 160) : skroc(tekstZHtml(bodyHtml), 160),
      bodyHtml,
      miniatura,
      czasCzytania: czasCzytania(bodyHtml),
      disclaimer: kategorieNowe.includes("Finanse i emerytura"),
    });
  }

  wpisy.sort((a, b) => b.date - a.date);

  // Warianty WebP miniatur do kart na listach - liczone tu, w warstwie danych,
  // bo async shortcode w partialu włączanym w pętli renderuje się pusto
  // (ograniczenie Nunjucks). Filtr kartaObrazek w eleventy.config.js buduje tag.
  await Promise.all(
    wpisy.map(async (w) => {
      w.obrazekKarty = await metadaneObrazka(w.miniatura, [320, 480, 800]);
    })
  );

  return wpisy;
}

// Normalizuje wartość pola miniatura z frontmatter do adresu absolutnego.
function normalizujMiniature(wartosc) {
  const v = String(wartosc || "").trim();
  if (!v) return null;
  if (/^https?:\/\//.test(v) || v.startsWith("/")) return v;
  return "/" + v.replace(/^\.?\//, "");
}

// Usuwa wiodący obrazek z treści, gdy jest tym samym plikiem co miniatura (pole
// frontmatter). Layout wpisu renderuje miniaturę jako hero na górze - bez tego
// ten sam obrazek pojawiłby się dwa razy. Dotyczy tylko obrazka na samym początku
// (opakowanego w <p> z markdown ![]() albo w <figure> z bloku obrazka WP); embed
// YouTube na starcie nie jest ruszany, bo miniatura to osobny plik (thumbnail).
function usunWiodacaMiniature(html, mini) {
  if (!mini || !mini.startsWith("/media/")) return html;
  const esc = mini.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    "^\\s*(?:" +
      '<p>\\s*<img\\b[^>]*\\bsrc="' + esc + '"[^>]*>\\s*</p>' +
      "|" +
      '<figure\\b[^>]*>\\s*<img\\b[^>]*\\bsrc="' + esc + '"[^>]*>\\s*(?:<figcaption\\b[^>]*>[\\s\\S]*?</figcaption>\\s*)?</figure>' +
    ")\\s*"
  );
  return html.replace(re, "");
}
