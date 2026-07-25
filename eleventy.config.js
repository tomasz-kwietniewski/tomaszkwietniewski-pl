import { cpSync, existsSync } from "node:fs";
import Image from "@11ty/eleventy-img";
import { SLUGI } from "./lib/kategorie.js";
import { OPCJE_IMG, zrodloObrazka, htmlObrazka, escapeHtml } from "./lib/obrazki.js";

export default function (eleventyConfig) {
  // Treść i media pozostają nietknięte w repo; do wyjścia kopiujemy tylko to, co publiczne.
  eleventyConfig.addPassthroughCopy({ "media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Miniatury YouTube pobrane w trakcie builda (lib/miniatury.js).
  eleventyConfig.addPassthroughCopy({ "_yt-cache": "media/yt" });
  // Warianty WebP wygenerowane przez shortcode "obrazek" - cache poza _site,
  // żeby czyszczenie _site nie wymuszało ponownego przetwarzania (CI cache'uje katalog).
  // Kopiowanie po buildzie, nie passthrough - passthrough kopiuje PRZED renderowaniem
  // szablonów, czyli zanim shortcode zdąży wygenerować pliki.
  eleventyConfig.on("eleventy.after", () => {
    if (existsSync("_img-cache")) cpSync("_img-cache", "_site/media/opt", { recursive: true });
  });
  // Domena własna dla GitHub Pages - plik CNAME w katalogu opublikowanej strony.
  eleventyConfig.addPassthroughCopy({ "CNAME.gotowy": "CNAME" });

  // Responsywny obrazek: warianty WebP + srcset + width/height (bez CLS).
  // Oryginały z WP na listach ważyły po 0,5-1,2 MB przy kaflu 180 px wysokości.
  // SVG (placeholdery) i adresy zewnętrzne przechodzą bez przetwarzania.
  // UWAGA: NIE działa wewnątrz {% include %} w pętli (async w Nunjucks renderuje
  // się pusto) - tam używać filtra kartaObrazek (dane liczone w src/_data/wpisy.js).
  eleventyConfig.addNunjucksAsyncShortcode("obrazek", async (src, opcje = {}) => {
    const zrodlo = zrodloObrazka(src);
    const atrybuty = {
      alt: opcje.alt || "",
      loading: opcje.loading || "lazy",
      decoding: "async",
    };
    if (opcje.klasa) atrybuty.class = opcje.klasa;
    if (opcje.styl) atrybuty.style = opcje.styl;
    if (opcje.fetchpriority) atrybuty.fetchpriority = opcje.fetchpriority;
    if (!zrodlo || zrodlo.endsWith(".svg")) return htmlObrazka(null, src, atrybuty);
    const metadata = await Image(zrodlo, { ...OPCJE_IMG, widths: opcje.szerokosci || [320, 480, 800] });
    return htmlObrazka(metadata, src, { ...atrybuty, sizes: opcje.sizes || "100vw" });
  });

  // Miniatura na karcie wpisu - synchroniczny filtr korzystający z metadanych
  // policzonych w src/_data/wpisy.js (obejście ograniczenia async w include+for).
  eleventyConfig.addFilter("kartaObrazek", (wpis) =>
    htmlObrazka(wpis.obrazekKarty, wpis.miniatura, {
      alt: "",
      class: "karta-wpisu__obrazek",
      sizes: "(max-width: 700px) calc(100vw - 48px), 400px",
      loading: "lazy",
      decoding: "async",
    })
  );

  // timeZone jawnie: bez tego data wyświetlana zależałaby od strefy procesu (runner CI = UTC).
  eleventyConfig.addFilter("dataPL", (d) =>
    new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Warsaw" }).format(new Date(d))
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  // Absolutny URL produkcyjny; encodeURI odtwarza formę %CC%A8 dla slugów ze znakami NFD.
  eleventyConfig.addFilter("absUrl", (p, base) => new URL(encodeURI(p), base || "https://tomaszkwietniewski.pl").href);
  eleventyConfig.addFilter("slugKategorii", (nazwa) => SLUGI[nazwa] || "");
  // Wpisy z danej kategorii (strony /blog/temat/<slug>/)
  eleventyConfig.addFilter("wTemacie", (wpisy, slug) => wpisy.filter((w) => w.kategorieSlugi.includes(slug)));
  eleventyConfig.addFilter("take", (tablica, n) => (tablica || []).slice(0, n));

  // 3 powiązane wpisy: najpierw ta sama kategoria główna, dopełnienie najnowszymi.
  eleventyConfig.addFilter("powiazane", (wpisy, slug) => {
    const aktualny = wpisy.find((w) => w.slug === slug);
    const glowna = aktualny ? aktualny.kategorieNowe[0] : null;
    const inne = wpisy.filter((w) => w.slug !== slug);
    const zTejKategorii = new Set(inne.filter((w) => glowna && w.kategorieNowe.includes(glowna)));
    const reszta = inne.filter((w) => !zTejKategorii.has(w));
    return [...zTejKategorii, ...reszta].slice(0, 3);
  });

  // content/ i lib/ leżą poza input (src/), a wpisy czytamy readdirSync w _data -
  // bez jawnego watch npm run dev nie widziałby edycji treści.
  eleventyConfig.addWatchTarget("content/");
  eleventyConfig.addWatchTarget("lib/");

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
}
