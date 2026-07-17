import { existsSync } from "node:fs";
import { SLUGI } from "./kategorie.js";

// Wpisy nie mają featured image we frontmatter. Decyzja o miniaturze (wspólna dla
// builda i dla prebuildu pobierającego miniatury YouTube) jest czysta - bez IO.
// Łańcuch: 1) pierwszy lokalny obrazek z treści, 2) miniatura YouTube z pierwszego
// embedu, 3) placeholder SVG kategorii.

export const YT_CACHE = "_yt-cache";

export function znajdzYoutubeId(html) {
  const m =
    html.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/) ||
    html.match(/youtu\.be\/([\w-]{11})/);
  return m ? m[1] : null;
}

// Zwraca specyfikację miniatury bez sięgania do sieci ani dysku.
export function specMiniatury(bodyHtml) {
  const img = bodyHtml.match(/<img[^>]*\ssrc="(\/media\/[^"]+)"/i);
  if (img) return { typ: "img", src: img[1] };
  const yt = znajdzYoutubeId(bodyHtml);
  if (yt) return { typ: "yt", id: yt };
  return { typ: "placeholder" };
}

// Rozwiązuje spec do konkretnego adresu (miniatura YT tylko jeśli pobrana do cache).
export function wyznaczMiniature(bodyHtml, kategorieNowe) {
  const spec = specMiniatury(bodyHtml);
  if (spec.typ === "img") return spec.src;
  if (spec.typ === "yt" && existsSync(`${YT_CACHE}/${spec.id}.jpg`)) return `/media/yt/${spec.id}.jpg`;
  const kat = kategorieNowe[0] || "Ciekawostki / świat";
  return `/assets/img/placeholder-${SLUGI[kat]}.svg`;
}
