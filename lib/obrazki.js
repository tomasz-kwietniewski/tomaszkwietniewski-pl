// Warianty responsywne obrazków (@11ty/eleventy-img, WebP).
// Dwie drogi:
// - async shortcode "obrazek" (eleventy.config.js) dla obrazków wpisanych
//   wprost w szablonach,
// - metadaneObrazka() wywoływane w warstwie danych (src/_data/wpisy.js)
//   + synchroniczny filtr dla miniatur na kartach. Powód: async shortcode
//   wewnątrz {% include %} w pętli {% for %} renderuje się PUSTO
//   (ograniczenie async w Nunjucks) - warstwa danych omija problem.

import Image from "@11ty/eleventy-img";

export const OPCJE_IMG = {
  formats: ["webp"],
  outputDir: "_img-cache",
  urlPath: "/media/opt/",
};

// Mapowanie publicznego adresu obrazka na plik źródłowy w repo.
export function zrodloObrazka(src) {
  const czysty = decodeURIComponent(String(src || "").split("?")[0].split("#")[0]);
  if (czysty.startsWith("/media/yt/")) return czysty.replace("/media/yt/", "_yt-cache/");
  if (czysty.startsWith("/media/")) return czysty.slice(1);
  if (czysty.startsWith("/assets/")) return "src" + czysty;
  return null; // adres zewnętrzny - nie przetwarzamy
}

// Metadane wariantów; null dla SVG (placeholdery) i adresów zewnętrznych.
export async function metadaneObrazka(src, szerokosci) {
  const zrodlo = zrodloObrazka(src);
  if (!zrodlo || zrodlo.endsWith(".svg")) return null;
  return Image(zrodlo, { ...OPCJE_IMG, widths: szerokosci });
}

export const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// Buduje tag <img> z metadanych; bez metadanych (SVG/zewnętrzny) zwykły <img>.
export function htmlObrazka(metadata, src, atrybuty) {
  const { alt = "", ...reszta } = atrybuty;
  if (!metadata) {
    const attrs = Object.entries({ ...reszta, sizes: undefined })
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
      .join("");
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${attrs}>`;
  }
  return Image.generateHTML(metadata, { alt: escapeHtml(alt), ...reszta });
}
