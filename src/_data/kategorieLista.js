import { NOWE, SLUGI } from "../../lib/kategorie.js";

// Lista kategorii do paginacji stron /blog/temat/<slug>/ (src/blog-temat.njk).
// Realne strony HTML zamiast filtrowania tylko w JS: działają bez JS,
// indeksują się i dają cel przekierowaniom /category/... ze starego WP.
const OPISY = {
  "Finanse i emerytura":
    "Inwestowanie pasywne, IKE i IKZE, obligacje - budowanie prywatnej emerytury bez mitów i sprzedażowego szumu.",
  "Technologie i dom":
    "Fotowoltaika, pompy ciepła, automatyka domowa i technologie, które sam testuję we własnym domu.",
  "Polecam":
    "Sprawdzone kanały, książki, filmy i narzędzia, które uznałem za warte Twojego czasu.",
  "Tipy ułatwiające życie":
    "Praktyczne triki i rozwiązania, które oszczędzają czas, pieniądze i nerwy.",
  "Ciekawostki / świat":
    "Geopolityka, świat i ciekawostki, które poszerzają perspektywę.",
};

export default NOWE.map((nazwa) => ({
  nazwa,
  slug: SLUGI[nazwa],
  opis: OPISY[nazwa],
}));
