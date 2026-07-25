import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { STARE_SLUGI_KATEGORII } from "../../lib/kategorie.js";
import { slugWpisu } from "../../lib/zrodla.js";
import { parsujDate } from "../../lib/daty.js";

// Stary adres -> nowy adres. GitHub Pages nie robi prawdziwych 301,
// więc generujemy strony z meta refresh + canonical na cel.
export default function () {
  const lista = [
    { od: "/start/", do: "/" },
    { od: "/wszystkie-wpisy/", do: "/blog/" },
    { od: "/tematy/", do: "/blog/" },
    { od: "/zapis-na-newsletter/", do: "/newsletter/" },
  ];

  // Stare adresy kategorii WordPressa (linkowane w treściach) -> realne strony
  // kategorii (działają bez JS i mają własny canonical, w przeciwieństwie do
  // dawnego celu /blog/?temat=..., który dla Google był jedną stroną /blog/).
  for (const [stary, nowy] of Object.entries(STARE_SLUGI_KATEGORII)) {
    lista.push({ od: `/category/${stary}/`, do: `/blog/temat/${nowy}/` });
  }

  // Wpisy ze slugiem w formie NFD (znaki rozłożone, spadek po WP): katalog na
  // dysku jest w NFD, więc adres wpisany ręcznie w normalnej formie NFC dawał
  // 404. Dokładamy przekierowanie NFC -> NFD. Wpisy zaplanowane pomijamy.
  const TERAZ = Date.now();
  for (const plik of readdirSync("content/wpisy").filter((f) => f.endsWith(".md"))) {
    const { data: fm } = matter(readFileSync(path.join("content/wpisy", plik), "utf8"));
    if (parsujDate(fm.date, plik).getTime() > TERAZ) continue;
    const slug = slugWpisu(fm, plik);
    const nfc = slug.normalize("NFC");
    if (nfc !== slug) lista.push({ od: `/${nfc}/`, do: `/${slug}/` });
  }

  return lista;
}
