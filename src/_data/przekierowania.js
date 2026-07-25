import { STARE_SLUGI_KATEGORII } from "../../lib/kategorie.js";

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

  return lista;
}
