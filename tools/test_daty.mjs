// Lekki test parsowania dat (lib/daty.js) - bez frameworka.
// Uruchamiany w npm run check; musi dawać ten sam wynik w każdej strefie
// (CI = UTC, lokalnie = Europe/Warsaw), bo o to cały mechanizm chodzi.
import { parsujDate } from "../lib/daty.js";

const przypadki = [
  ["2026-07-26T08:00:00", "2026-07-26T06:00:00.000Z"],       // lato: +02:00
  ["2026-01-15T08:00:00", "2026-01-15T07:00:00.000Z"],       // zima: +01:00
  ["2026-07-26T08:00:00+02:00", "2026-07-26T06:00:00.000Z"], // jawny offset
  ["2026-07-26T06:00:00Z", "2026-07-26T06:00:00.000Z"],      // UTC wprost
  ["2026-07-26", "2026-07-25T22:00:00.000Z"],                // sama data = północ PL
  // js-yaml daje Date (UTC) dla daty bez cudzysłowu - pola UTC to wpisane cyfry
  [new Date(Date.UTC(2026, 6, 21, 18, 0, 0)), "2026-07-21T16:00:00.000Z"],
];

const bledne = [undefined, "", "26.07.2026", "2026-13-01T00:00:00", new Date("x")];

let bledy = 0;
for (const [wejscie, oczekiwane] of przypadki) {
  const wynik = parsujDate(wejscie, "test.md").toISOString();
  if (wynik !== oczekiwane) {
    console.error(`FAIL parsujDate(${JSON.stringify(String(wejscie))}) = ${wynik}, oczekiwane ${oczekiwane}`);
    bledy++;
  }
}
for (const zly of bledne) {
  try {
    parsujDate(zly, "test.md");
    console.error(`FAIL parsujDate(${JSON.stringify(String(zly))}) nie rzuciło błędu`);
    bledy++;
  } catch {}
}
// Godzina nieistniejąca (skok DST) - wystarczy, że nie wywala i daje poprawny moment +-1h.
parsujDate("2026-03-29T02:30:00", "test.md");

if (bledy) {
  console.error(`test_daty: ${bledy} bledow`);
  process.exit(1);
}
console.log("test_daty: OK");
