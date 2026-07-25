// Wspólne reguły źródeł treści - jedna definicja dla builda (src/_data/*)
// i weryfikacji (tools/verify_build.mjs). Wcześniej były skopiowane w obu
// miejscach i zdążyły się rozjechać (np. .trim() tylko po jednej stronie).

// Strony zastąpione nowym designem (mają własne szablony w src/ albo przekierowanie)
export const ZASTEPOWANE = new Set([
  "start.md",           // -> / (nowa strona główna)
  "wszystkie-wpisy.md", // -> /blog/
  "tematy.md",          // -> /blog/
  "o-mnie.md",          // -> nowy /o-mnie/
  "kontakt.md",         // -> nowy /kontakt/
  "wsparcie.md",        // -> nowy /wsparcie/
  "zapis-na-newsletter.md", // -> nowy /newsletter/
]);

// Reguła sluga wpisu: frontmatter slug, a gdy pusty - nazwa pliku bez daty i .md.
// decodeURIComponent: wpis ze znakami NFD ma slug w formie %cc%a8 - katalog
// wyjściowy musi mieć zdekodowane znaki (GitHub Pages dopasowuje po dekodowaniu).
export function slugWpisu(fm, plik) {
  const surowy = String(fm.slug || plik.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")).trim();
  return decodeURIComponent(surowy);
}

// Ścieżka wyjściowa podstrony: z url_stara zachowuje zagnieżdżenia typu
// /tematy/ksiazki/ (SEO bez przekierowań), inaczej /slug/.
export function permalinkStrony(fm, plik) {
  if (fm.url_stara) {
    let sciezka;
    try {
      sciezka = decodeURIComponent(new URL(fm.url_stara).pathname);
    } catch {
      throw new Error(`Niepoprawny url_stara "${fm.url_stara}" w ${plik}`);
    }
    return sciezka.endsWith("/") ? sciezka : sciezka + "/";
  }
  const slug = String(fm.slug || plik.replace(/\.md$/, "")).trim();
  return `/${slug}/`;
}

// Skraca tekst do max znaków (z wielokropkiem wliczonym w limit), tnąc na
// granicy słowa. Gdy w tekście nie ma sensownej spacji (długi URL, zbitka),
// tnie twardo zamiast zwracać samo "...".
export function skroc(tekst, max) {
  if (tekst.length <= max) return tekst;
  const ciety = tekst.slice(0, max - 3);
  const spacja = ciety.lastIndexOf(" ");
  return (spacja > 40 ? ciety.slice(0, spacja) : ciety) + "...";
}
