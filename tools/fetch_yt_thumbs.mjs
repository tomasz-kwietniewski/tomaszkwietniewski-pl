// Prebuild: pobiera miniatury YouTube do _yt-cache/ PRZED uruchomieniem Eleventy.
// Dzięki temu passthrough copy (_yt-cache -> media/yt) zawsze widzi komplet plików,
// niezależnie od kolejności faz Eleventy. Idempotentne - pobiera tylko brakujące.

import { readdirSync, readFileSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { md } from "../lib/markdown.js";
import { rewriteMediaUrls } from "../lib/media.js";
import { specMiniatury, YT_CACHE } from "../lib/miniatury.js";

const DIR = "content/wpisy";
const idy = new Set();

for (const plik of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const { content } = matter(readFileSync(path.join(DIR, plik), "utf8"));
  const bodyHtml = rewriteMediaUrls(md.render(content));
  const spec = specMiniatury(bodyHtml);
  if (spec.typ === "yt") idy.add(spec.id);
}

mkdirSync(YT_CACHE, { recursive: true });
let pobrane = 0;
let pominiete = 0;
let bledy = 0;

for (const id of idy) {
  const plik = `${YT_CACHE}/${id}.jpg`;
  if (existsSync(plik)) {
    pominiete++;
    continue;
  }
  try {
    const res = await fetch(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    if (res.ok) {
      writeFileSync(plik, Buffer.from(await res.arrayBuffer()));
      pobrane++;
    } else {
      bledy++;
      console.warn(`YT ${id}: HTTP ${res.status} - miniatura zastąpiona placeholderem`);
    }
  } catch (e) {
    bledy++;
    console.warn(`YT ${id}: ${e.message} - miniatura zastąpiona placeholderem`);
  }
}

console.log(`Miniatury YouTube: ${idy.size} unikalnych (pobrano ${pobrane}, z cache ${pominiete}, błędy ${bledy}).`);
