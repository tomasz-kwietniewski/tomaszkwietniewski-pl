import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { md } from "../../lib/markdown.js";
import { rewriteMediaUrls } from "../../lib/media.js";
import { tekstZHtml } from "../../lib/czytanie.js";
import { parsujDate } from "../../lib/daty.js";
import { ZASTEPOWANE, permalinkStrony, skroc } from "../../lib/zrodla.js";

const DIR = "content/strony";

export default function () {
  const generyczne = [];
  const zajetePermalinki = new Map();

  for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
    if (ZASTEPOWANE.has(plik)) continue;

    const { data: fm, content } = matter(readFileSync(path.join(DIR, plik), "utf8"));
    const slug = String(fm.slug || plik.replace(/\.md$/, "")).trim();
    const permalink = permalinkStrony(fm, `${DIR}/${plik}`);

    if (zajetePermalinki.has(permalink)) {
      throw new Error(`Zduplikowany permalink "${permalink}": ${zajetePermalinki.get(permalink)} i ${plik}`);
    }
    zajetePermalinki.set(permalink, plik);

    const bodyHtml = rewriteMediaUrls(md.render(content));

    generyczne.push({
      plik,
      slug,
      permalink,
      title: String(fm.title || slug),
      date: fm.date ? parsujDate(fm.date, `${DIR}/${plik}`) : null,
      modified: fm.modified ? parsujDate(fm.modified, `${DIR}/${plik}`) : null,
      metaDescription: skroc(tekstZHtml(bodyHtml), 160),
      bodyHtml,
    });
  }

  return { generyczne };
}
