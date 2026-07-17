import { SLUGI } from "./lib/kategorie.js";

export default function (eleventyConfig) {
  // Treść i media pozostają nietknięte w repo; do wyjścia kopiujemy tylko to, co publiczne.
  eleventyConfig.addPassthroughCopy({ "media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Miniatury YouTube pobrane w trakcie builda (lib/miniatury.js).
  eleventyConfig.addPassthroughCopy({ "_yt-cache": "media/yt" });
  // Domena własna dla GitHub Pages - plik CNAME w katalogu opublikowanej strony.
  eleventyConfig.addPassthroughCopy({ "CNAME.gotowy": "CNAME" });

  eleventyConfig.addFilter("dataPL", (d) =>
    new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d))
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  // Absolutny URL produkcyjny; encodeURI odtwarza formę %CC%A8 dla slugów ze znakami NFD.
  eleventyConfig.addFilter("absUrl", (p, base) => new URL(encodeURI(p), base || "https://tomaszkwietniewski.pl").href);
  eleventyConfig.addFilter("slugKategorii", (nazwa) => SLUGI[nazwa] || "");
  eleventyConfig.addFilter("take", (tablica, n) => (tablica || []).slice(0, n));

  // 3 powiązane wpisy: najpierw ta sama kategoria główna, dopełnienie najnowszymi.
  eleventyConfig.addFilter("powiazane", (wpisy, slug) => {
    const aktualny = wpisy.find((w) => w.slug === slug);
    const glowna = aktualny ? aktualny.kategorieNowe[0] : null;
    const inne = wpisy.filter((w) => w.slug !== slug);
    const zTejKategorii = inne.filter((w) => glowna && w.kategorieNowe.includes(glowna));
    const reszta = inne.filter((w) => !zTejKategorii.includes(w));
    return [...zTejKategorii, ...reszta].slice(0, 3);
  });

  eleventyConfig.setServerOptions({ showAllHosts: false });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false,
  };
}
