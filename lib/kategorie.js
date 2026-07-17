// 5 nowych kategorii strony + mapowanie starych kategorii WordPressa.
// Mapowanie wg docs/wyciag-tresci.md pkt 5.

export const NOWE = [
  "Finanse i emerytura",
  "Technologie i dom",
  "Polecam",
  "Tipy ułatwiające życie",
  "Ciekawostki / świat",
];

export const SLUGI = {
  "Finanse i emerytura": "finanse-i-emerytura",
  "Technologie i dom": "technologie-i-dom",
  "Polecam": "polecam",
  "Tipy ułatwiające życie": "tipy-ulatwiajace-zycie",
  "Ciekawostki / świat": "ciekawostki-swiat",
};

const MAPA = {
  "Inwestowanie": "Finanse i emerytura",
  "Prywatna emerytura": "Finanse i emerytura",
  "Nowe technologie": "Technologie i dom",
  "Cyberbezpieczeństwo": "Technologie i dom",
  "Ekologia": "Technologie i dom",
  "Polecane kanały YT": "Polecam",
  "Filmy i seriale": "Polecam",
  "Polecane komputery": "Polecam",
  "Polecane telefony": "Polecam",
  "Ciekawostki": "Ciekawostki / świat",
  "Geopolityka": "Ciekawostki / świat",
};
for (const n of NOWE) MAPA[n] = n;

const IGNOROWANE = new Set(["Uncategorized"]);

// Stare slugi kategorii WP (linkowane w treściach) -> slug nowej kategorii (filtr bloga)
export const STARE_SLUGI_KATEGORII = {
  "ciekawostki": "ciekawostki-swiat",
  "geopolityka": "ciekawostki-swiat",
  "cyberbezpieczenstwo": "technologie-i-dom",
  "ekologia": "technologie-i-dom",
  "nowe-technologie": "technologie-i-dom",
  "filmy-i-seriale": "polecam",
  "polecane-kanaly-yt": "polecam",
  "inwestowanie": "finanse-i-emerytura",
  "prywatna-emerytura": "finanse-i-emerytura",
  "wlasna-emerytura": "finanse-i-emerytura",
  "tipy": "tipy-ulatwiajace-zycie",
};

export function mapujKategorie(stare, zrodlo) {
  const wynik = [];
  for (const k of stare || []) {
    if (IGNOROWANE.has(k)) continue;
    const nowa = MAPA[k];
    if (!nowa) throw new Error(`Nieznana kategoria "${k}" w ${zrodlo} - uzupełnij mapowanie w lib/kategorie.js`);
    if (!wynik.includes(nowa)) wynik.push(nowa);
  }
  wynik.sort((a, b) => NOWE.indexOf(a) - NOWE.indexOf(b));
  return wynik;
}
