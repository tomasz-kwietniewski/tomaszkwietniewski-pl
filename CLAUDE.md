# CLAUDE.md - nowa strona tomaszkwietniewski.pl

Stan na 2026-07-17. Ten plik to pełny kontekst projektu - utrzymuj go aktualnym po każdej większej zmianie.

## Czym jest ten projekt

Nowa wersja strony osobistej tomaszkwietniewski.pl, zastępująca WordPressa (szablon Kadence).
Trzy role strony: blog (sprawdzone treści: inwestowanie pasywne, technologie, tipy),
wizytówka osobista z sekcją projektów, baza newslettera (MailerLite - ta sama lista co dotąd).

Stara strona WCIĄŻ DZIAŁA na WordPressie i będzie działać do podmiany DNS (ostatni krok).

## Stan projektu (co już jest zrobione)

- Treść ZMIGROWANA z WordPressa przez REST API: 88 wpisów, 21 podstron, 448 mediów.
- Repo: https://github.com/tomasz-kwietniewski/tomaszkwietniewski-pl (PRYWATNE, gałąź main).
- Pages CMS podpięty i PRZETESTOWANY end-to-end (panel: app.pagescms.org, konto GitHub Tomasza).
- Brief treści i architektury: `docs/wyciag-tresci.md` (architektura stron, sekcja Projekty,
  mapowanie kategorii, ton, czego nie umieszczać - CZYTAJ PRZED projektowaniem podstron).
- Pierwszy NOWY wpis (nie z migracji): `content/wpisy/2026-07-16-pstryk-...md`
  (slug: pstryk-czy-taryfa-strefowa). Źródło: repo `C:\Users\L857K\claude\zuzycie-pradu`.
- **BUILD GOTOWY (2026-07-17):** statyczny generator Eleventy 3 odtwarza design z handoffu
  Claude Design (paczka "Odświeżenie strony Tomasza.zip", handoff v2). Wszystkie 8 widoków
  zbudowane i przetestowane w przeglądarce (Playwright: 0 błędów konsoli, brak poziomego
  scrolla na mobile 375 px, filtr kategorii, donut, e-mail reveal, Pagefind, formularz ML).
  `npm run verify` (build + asercje) przechodzi. Zostaje: publikacja (patrz `WDROZENIE.md`).

## Jak to zbudowane (Eleventy 3, technologia)

- Silnik: **Eleventy 3.x** (ESM, `eleventy.config.js`), markdown-it z `html:true` renderuje
  HTML wpisów z WP 1:1. Zero frameworków front-end; cały JS strony w `src/assets/js/site.js`.
- **content/ i media/ NIETKNIĘTE** (Pages CMS działa bez zmian). Wpisy i strony czytane jako
  dane globalne (`src/_data/wpisy.js`, `strony.js` przez gray-matter), HTML generują szablony
  paginacyjne (`src/wpisy-strony.njk`, `podstrony.njk`, `przekierowanie.njk`; layouty w
  `src/_includes/`). Logika slug/kategorie/miniatury/media w `lib/*`.
- URL wpisu: slug z frontmatter (fallback nazwa pliku bez daty) -> `/slug/`. Podstrony: ścieżka
  z `url_stara` (zachowuje `/tematy/ksiazki/`). Slug NFD (`%cc%a8`) dekodowany do znaków.
- Kategorie: 5 nowych, mapowanie starych w `lib/kategorie.js` (nieznana = błąd builda).
- Miniatury list (brak w frontmatter): pierwszy `<img>` -> miniatura YouTube (pobierana w build
  do `_yt-cache/`, potem `/media/yt/`) -> placeholder SVG kategorii.
- Disclaimer inwestycyjny automatyczny pod wpisami "Finanse i emerytura" + w portfelu na O mnie.
- Newsletter: formularz POST na endpoint MailerLite z dawnego embedu (fetch w site.js, sukces
  -> `/dziekuje-bardzo/`). RSS `/feed.xml` + fallback `/feed/`. Wyszukiwarka Pagefind (modal).
  Fonty self-hosted (woff2, `src/assets/fonts/`). Postaw kawę: buycoffee.to/tomaszkwietniewski.
- Komendy: `npm run dev` (podgląd z live reload), `npm run build` (Eleventy + Pagefind),
  `npm run check` (asercje `tools/verify_build.mjs`), `npm run verify` (build + check).
  Podgląd statyczny: launch config `strona-static` (python http.server na `_site`, port 8771).
- Lokalny subagent do stress-testu: `.claude/agents/website-stress-tester.md` (poza gitem).

## Struktura

| Ścieżka | Co to |
|---|---|
| `content/wpisy/` | wpisy blogowe, format: `RRRR-MM-DD-slug.md` (frontmatter YAML + treść HTML z WP) |
| `content/strony/` | podstrony (o-mnie, kontakt, zestawienia typu ksiazki/podcasty) |
| `media/` | obrazki z wp-content/uploads, struktura RRRR/MM; treści linkują względnie `media/...` |
| `.pages.yml` | konfiguracja panelu Pages CMS |
| `tools/export_wp.py` | ponowny eksport ze starego WP (odpalić przed podmianą DNS!) |
| `tools/fix_entities.py` | dekodowanie encji HTML w title/excerpt |
| `docs/` | prywatne notatki robocze (NIE publikować - patrz TODO przed upublicznieniem) |

## Frontmatter wpisu

```yaml
title: "..."           # tytuł
slug: "..."            # OPCJONALNY - zwykle brak; regułę patrz niżej
date: "2026-05-02T09:15:13"     # oryginalna data publikacji - NIE nadpisywać
modified: "..."
url_stara: "https://tomaszkwietniewski.pl/slug/"  # do mapy przekierowań 301
typ: "wpis"            # albo "strona"
kategorie: ["..."]     # stare wpisy mają stare nazwy kategorii
excerpt: "..."         # zajawka na listy wpisów
```

## REGUŁA SLUGA (kluczowa dla builda)

Adres URL wpisu = frontmatter `slug`, a gdy pusty - **nazwa pliku bez daty i .md**
(np. `2026-05-02-jak-za-1150-zl-...md` -> `/jak-za-1150-zl-.../`). Wpisy są bezpośrednio
pod domeną (bez prefiksu /blog/), tak jak na starym WP - zachowuje SEO bez przekierowań.

## Pages CMS - zasady i pułapki (sprawdzone w praktyce i w kodzie źródłowym)

- Nazwa pliku generuje się PRZY ZAPISIE z tytułu, slugifikowana automatycznie
  (slugify lower+strict, transliteracja polskich znaków). Szablon: `{year}-{month}-{day}-{fields.title}.md`.
- **PUŁAPKA: nigdy nie dodawaj `field: create` do filename** - panel zamraża wtedy nazwę
  pliku w chwili otwarcia formularza (pusty tytuł -> plik `2026-07-16-.md`). Przerobione
  na własnej skórze, 2x. Czysty szablon string = generowanie przy zapisie.
- Przepływ Tomasza dla nowego wpisu: tytuł + treść + kategorie + Save. Nic więcej.
- Kategorie w .pages.yml: 5 NOWYCH (Finanse i emerytura, Technologie i dom, Polecam,
  Tipy ułatwiające życie, Ciekawostki / świat) do nowych wpisów + 9 starych z WP,
  żeby dało się edytować zmigrowane wpisy. Mapowanie starych na nowe: docs/wyciag-tresci.md pkt 5.
- Stare wpisy mają treść HTML (bloki Gutenberga) - edytor rich-text może przy zapisie
  uprościć znaczniki (klasy wp-block-*). Niegroźne, nowa strona ich nie używa.
- Zapis w panelu = commit do repo. Po podpięciu deployu każdy Save publikuje stronę.

## Plan dalszy (kolejność)

Kroki 1-5 ZROBIONE (build Eleventy odtwarza design, szablony wszystkich widoków, formularz
MailerLite, disclaimer, RSS, przekierowania meta-refresh dla starych adresów kategorii).
Pozostała PUBLIKACJA - pełna instrukcja krok po kroku w `WDROZENIE.md`. W skrócie:

1. **PRZED upublicznieniem repo** (wymóg GitHub Pages na darmowym planie):
   usunąć `docs/` z repo I Z HISTORII GITA (git filter-repo) - to prywatne notatki.
2. Świeży eksport ze starego WP (`tools/export_wp.py` - dogra wpisy dodane w międzyczasie),
   potem `npm run verify`.
3. Włączyć Pages (Source: GitHub Actions), odkomentować `push:` w `.github/workflows/deploy-pages.yml`.
4. Domena: passthrough `CNAME.gotowy` -> `CNAME`; DNS apex tomaszkwietniewski.pl na rekordy
   A/AAAA GitHuba (panel DNS ma Tomasz). Szczegóły w `WDROZENIE.md`.
5. Po podmianie DNS: sprawdzić produkcję (wpisy, feed, slug NFD, stare adresy kategorii),
   zgłosić sitemap w Search Console.

## Konwencje (obowiązują w całym projekcie)

- Interpunkcja: zwykły dywiz `-`, NIGDY długie myślniki (em/en dash), bez strzałek,
  wielokropków-znaków; pełna polszczyzna z diakrytykami. (Szczegóły: globalny CLAUDE.md.)
- Zachowywać oryginalne daty publikacji i slugi zmigrowanych treści.
- Treści o inwestowaniu: obowiązkowy disclaimer.
- Ton tekstów: prosto, po ludzku, bez patosu i sprzedażowego języka.
- Weryfikacja przed "gotowe": realne uruchomienie + testy w przeglądarce (asercje DOM,
  konsola bez błędów), nie tylko "kompiluje się".

## Ekosystem (linki powiązane ze stroną)

github.com/tomasz-kwietniewski | misjamada.pl | najlepsipilkarze.tomaszkwietniewski.pl |
pedalowaniezsensem.tomaszkwietniewski.pl (archiwum 2014; domena pedalowaniezsensem.pl WYGASŁA) |
przeglad.tomaszkwietniewski.pl | momentum.tomaszkwietniewski.pl (niedopracowane - linkować ostrożnie) |
Google Play: aplikacja "Hormon Wzrostu Dawkowanie" | kontakt@tomaszkwietniewski.pl
