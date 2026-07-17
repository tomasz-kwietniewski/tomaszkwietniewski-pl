import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { md } from "../../lib/markdown.js";
import { rewriteMediaUrls } from "../../lib/media.js";
import { mapujKategorie, SLUGI } from "../../lib/kategorie.js";
import { wyznaczMiniature } from "../../lib/miniatury.js";
import { czasCzytania, tekstZHtml } from "../../lib/czytanie.js";

const DIR = "content/wpisy";

export default function () {
  const wpisy = [];

  for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
    const { data: fm, content } = matter(readFileSync(path.join(DIR, plik), "utf8"));

    // Reguła sluga: frontmatter slug, a gdy pusty - nazwa pliku bez daty i .md.
    // decodeURIComponent: wpis ze znakami NFD ma slug w formie %cc%a8 - katalog
    // wyjściowy musi mieć zdekodowane znaki (GitHub Pages dopasowuje po dekodowaniu).
    const surowySlug = String(fm.slug || plik.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")).trim();
    const slug = decodeURIComponent(surowySlug);

    const kategorieNowe = mapujKategorie(fm.kategorie, plik);
    const bodyHtml = rewriteMediaUrls(md.render(content));
    const excerpt = String(fm.excerpt || "").trim();

    wpisy.push({
      plik,
      slug,
      permalink: `/${slug}/`,
      title: String(fm.title || slug),
      date: new Date(fm.date),
      modified: fm.modified ? new Date(fm.modified) : new Date(fm.date),
      urlStara: fm.url_stara || null,
      kategorieNowe,
      kategorieSlugi: kategorieNowe.map((k) => SLUGI[k]),
      excerpt,
      metaDescription: excerpt ? skroc(excerpt, 160) : skroc(tekstZHtml(bodyHtml), 160),
      bodyHtml,
      miniatura: wyznaczMiniature(bodyHtml, kategorieNowe),
      czasCzytania: czasCzytania(bodyHtml),
      disclaimer: kategorieNowe.includes("Finanse i emerytura"),
    });
  }

  wpisy.sort((a, b) => b.date - a.date);
  return wpisy;
}

function skroc(tekst, max) {
  if (tekst.length <= max) return tekst;
  const ciety = tekst.slice(0, max);
  return ciety.slice(0, Math.max(ciety.lastIndexOf(" "), 0)) + "...";
}
