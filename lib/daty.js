// Parsowanie dat frontmatter niezależne od strefy czasowej procesu.
// Konwencja projektu: data bez offsetu oznacza czas polski (Europe/Warsaw).
// Bez tego build lokalny (CET/CEST) i build na runnerze CI (UTC) dawałyby inne
// momenty publikacji - wpis zaplanowany przez Pages CMS (format bez offsetu)
// ukazywałby się z przesunięciem do doby.

const STREFA = "Europe/Warsaw";

const WZORZEC_ISO =
  /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?(Z|[+-]\d{2}:?\d{2})?$/;

export function parsujDate(wartosc, zrodlo) {
  if (wartosc === undefined || wartosc === null || wartosc === "") {
    throw new Error(`Brak daty we frontmatter: ${zrodlo} - uzupełnij pole date`);
  }

  // js-yaml robi obiekt Date z daty bez cudzysłowu i traktuje ją jako UTC.
  // Autor wpisał jednak czas polski, więc odzyskujemy wpisane cyfry z pól UTC
  // i interpretujemy je jako Europe/Warsaw. (Data bez cudzysłowu Z OFFSETEM
  // byłaby tu przesunięta - dlatego daty z offsetem zapisujemy w cudzysłowie.)
  if (wartosc instanceof Date) {
    if (isNaN(wartosc)) throw new Error(`Niepoprawna data we frontmatter: ${zrodlo}`);
    return zWarszawy(
      wartosc.getUTCFullYear(), wartosc.getUTCMonth() + 1, wartosc.getUTCDate(),
      wartosc.getUTCHours(), wartosc.getUTCMinutes(), wartosc.getUTCSeconds()
    );
  }

  const tekst = String(wartosc).trim();
  const m = tekst.match(WZORZEC_ISO);
  if (!m) {
    throw new Error(
      `Niepoprawna data "${tekst}" w ${zrodlo} - oczekiwany format RRRR-MM-DDTHH:MM:SS (opcjonalnie z offsetem, np. +02:00)`
    );
  }

  const [rok, mies, dzien, godz, min, sek] = [+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)];
  if (mies < 1 || mies > 12 || dzien < 1 || dzien > 31 || godz > 23 || min > 59 || sek > 59) {
    throw new Error(`Niepoprawna data "${tekst}" w ${zrodlo} - wartości poza zakresem`);
  }

  // Jawny offset (albo Z) - moment jednoznaczny, parsujemy wprost.
  if (m[7]) {
    const d = new Date(tekst.replace(" ", "T"));
    if (isNaN(d)) throw new Error(`Niepoprawna data "${tekst}" w ${zrodlo}`);
    return d;
  }

  return zWarszawy(rok, mies, dzien, godz, min, sek);
}

// Zamienia czas ścienny w Warszawie na moment UTC. Dwie iteracje wystarczą,
// bo offset może się zmienić najwyżej raz (przejście CET/CEST).
function zWarszawy(rok, mies, dzien, godz, min, sek) {
  const jakUtc = Date.UTC(rok, mies - 1, dzien, godz, min, sek);
  let t = jakUtc;
  for (let i = 0; i < 2; i++) t = jakUtc - offsetWarszawy(t);
  return new Date(t);
}

// Offset Warszawy (ms względem UTC) w danym momencie, liczony przez Intl -
// bez zewnętrznych zależności i bez tablic reguł DST.
function offsetWarszawy(moment) {
  const czesci = new Intl.DateTimeFormat("en-US", {
    timeZone: STREFA, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(new Date(moment));
  const p = {};
  for (const c of czesci) p[c.type] = c.value;
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - moment;
}
