import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { md } from "../../lib/markdown.js";
import { rewriteMediaUrls } from "../../lib/media.js";
import { czasCzytania, tekstZHtml } from "../../lib/czytanie.js";

const DIR = "content/strony";

// Strony zastąpione nowym designem (mają własne szablony w src/ albo przekierowanie)
const ZASTEPOWANE = new Set([
  "start.md",           // -> / (nowa strona główna)
  "wszystkie-wpisy.md", // -> /blog/
  "tematy.md",          // -> /blog/
  "o-mnie.md",          // -> nowy /o-mnie/
  "kontakt.md",         // -> nowy /kontakt/
  "wsparcie.md",        // -> nowy /wsparcie/
  "zapis-na-newsletter.md", // -> nowy /newsletter/
]);

export default function () {
  const generyczne = [];

  for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
    if (ZASTEPOWANE.has(plik)) continue;

    const { data: fm, content } = matter(readFileSync(path.join(DIR, plik), "utf8"));
    const slug = String(fm.slug || plik.replace(/\.md$/, "")).trim();

    // Ścieżka wyjściowa z url_stara zachowuje zagnieżdżenia typu /tematy/ksiazki/ (SEO bez przekierowań)
    let permalink = `/${slug}/`;
    if (fm.url_stara) {
      permalink = decodeURIComponent(new URL(fm.url_stara).pathname);
      if (!permalink.endsWith("/")) permalink += "/";
    }

    const bodyHtml = rewriteMediaUrls(md.render(content));

    generyczne.push({
      plik,
      slug,
      permalink,
      title: String(fm.title || slug),
      date: fm.date ? new Date(fm.date) : null,
      modified: fm.modified ? new Date(fm.modified) : null,
      metaDescription: skroc(tekstZHtml(bodyHtml), 160),
      bodyHtml,
    });
  }

  return { generyczne };
}

function skroc(tekst, max) {
  if (tekst.length <= max) return tekst;
  const ciety = tekst.slice(0, max);
  return ciety.slice(0, Math.max(ciety.lastIndexOf(" "), 0)) + "...";
}
