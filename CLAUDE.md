# CLAUDE.md - nowa strona tomaszkwietniewski.pl

Stan na 2026-07-17. Ten plik to pełny kontekst projektu - utrzymuj go aktualnym po każdej większej zmianie.

## Czym jest ten projekt

Nowa wersja strony osobistej tomaszkwietniewski.pl, zastępująca WordPressa (szablon Kadence).
Trzy role strony: blog (sprawdzone treści: inwestowanie pasywne, technologie, tipy),
wizytówka osobista z sekcją projektów, baza newslettera (MailerLite - ta sama lista co dotąd).

Strona jest NA ŻYWO od 2026-07-17 (GitHub Pages, deploy automatyczny z push do main).
Stary WordPress dalej działa na SEOHost pod IP 188.210.222.8 - rollback to apex A z powrotem
na ten adres (szczegóły DNS i pułapka certyfikatu: pamięć projektu, `WDROZENIE.md`).

## Stan projektu (co już jest zrobione)

- Treść ZMIGROWANA z WordPressa przez REST API: 88 wpisów, 21 podstron, 448 mediów.
- Repo: https://github.com/tomasz-kwietniewski/tomaszkwietniewski-pl (PUBLICZNE, gałąź main;
  `docs/` z prywatnymi notatkami usunięte z repo i z historii przed upublicznieniem).
- Pages CMS podpięty i PRZETESTOWANY end-to-end (panel: app.pagescms.org, konto GitHub Tomasza).
  Save w panelu = commit do main = auto-publikacja.
- Pierwszy NOWY wpis (nie z migracji): `content/wpisy/2026-07-16-pstryk-...md`
  (slug: pstryk-czy-taryfa-strefowa). Źródło: repo `C:\Users\L857K\claude\zuzycie-pradu`.
- **BUILD GOTOWY (2026-07-17):** statyczny generator Eleventy 3 odtwarza design z handoffu
  Claude Design (paczka "Odświeżenie strony Tomasza.zip", handoff v2). Wszystkie 8 widoków
  zbudowane i przetestowane w przeglądarce (Playwright: 0 błędów konsoli, brak poziomego
  scrolla na mobile 375 px, filtr kategorii, donut, e-mail reveal, Pagefind, formularz ML).
  `npm run verify` (build + asercje) przechodzi. OPUBLIKOWANE 2026-07-17.
- **Sekcja "Polecam" (2026-07-31):** hub `/polecam/` (szablon `src/polecam.njk`, kafelki
  `.polecam-*` w style.css) + 7 podstron z polecankami przepisanych z HTML Kadence na czysty
  HTML: ksiazki, podcasty, kanaly-youtube, filmy-i-seriale, dobroczynnosc, polecane-komputery,
  polecane-telefony (adresy `/tematy/...` bez zmian - permalink z `url_stara`). Link "Polecam"
  w nav (po Projektach) i w stopce; przekierowanie `/tematy/` -> `/polecam/` (przekierowania.js).
  Burger nav od 1080 px (pełne menu z Polecam potrzebuje ~1050 px); `.nav__link` ma nowrap.
  verify_build.mjs pilnuje 7 kafelków na hubie; sanity ksiazki sprawdza `polecana-okladka`.
  Polecane telefony zaktualizowane merytorycznie (stan: lipiec 2026); polecane-komputery
  przeniesione 1:1 ze starego WP - jeszcze do aktualizacji merytorycznej.
- **Polityka prywatności PRZEPISANA (2026-07-17):** zgodna z faktycznym stanem strony
  (newsletter MailerLite, kontakt e-mail, logi GitHub Pages, transfer do USA wg Data Privacy
  Framework, disclaimer wg MAR zamiast uchylonego rozporządzenia MF z 2005). Strona NIE
  ustawia cookies i celowo NIE MA banera zgody - patrz konwencja "strona bez cookies" niżej.

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
- Obrazek przewodni (hero): layout wpisu renderuje pole `miniatura` jako duży obrazek na górze
  każdego wpisu (jak dawny featured image z WP). `wpisy.js` deduplikuje - usuwa wiodący obrazek
  z treści, gdy to ten sam plik co miniatura (nie wklejać hero ręcznie na początek treści; embed
  YouTube na starcie zostaje). Styl: `.wpis-obraz` w style.css.
- **Bogaty esej SKŁADANY SKRYPTEM (od 2026-08-06):** wpis
  `2026-08-06-finanse-polskiej-pilki.md` nie jest pisany ręcznie - powstaje z
  `docs/artykuly/2026-08-06-finanse-polskiej-pilki/` (`styl.css` + `tresc.html` ze
  znacznikami wykresów + `narzedzia/wykresy.py` generujące SVG z CSV) przez
  `narzedzia/zloz.py`. To odpowiedź na pułapkę rozjazdu CSS z eseju o sporcie: skoro
  `.md` jest artefaktem, nie da się go rozjechać ze źródłem. `zloz.py` blokuje zapis,
  gdy w treści są puste linie wewnątrz `.esej`, długie myślniki albo nie zgadza się
  bilans `<div>`. **Nie edytować tego `.md` ręcznie ani przez Pages CMS.**
  Wykresy SVG w tym eseju są w kontenerze `.plotno` (przewijanie w poziomie) - bez tego
  wykres 720 px zgnieciony do 240 px na telefonie ma etykiety wielkości 3 px.
- Osadzenia YouTube: build przepisuje `youtube.com/embed` na `youtube-nocookie.com`
  (`lib/media.js`) - film nie zapisuje cookies, dopóki użytkownik nie kliknie play.
  Iframe'y INNE niż YouTube są wycinane z treści w buildzie (`usunObceOsadzenia` -
  oEmbedy WP ładowały zewnętrzne zasoby; zostaje fallback-link z blockquote).
- **Obrazki responsywne (2026-07-25):** shortcode `{% obrazek %}` + filtr `kartaObrazek`
  (`lib/obrazki.js`, @11ty/eleventy-img) generują warianty WebP z srcset/width/height
  do `_img-cache/` (kopiowane po buildzie do `/media/opt/`; cache w CI). UWAGA: async
  shortcode NIE działa w `{% include %}` w pętli (Nunjucks renderuje pusto) - dlatego
  karty używają filtra, a metadane liczy `wpisy.js`. Tabele z treści build owija
  w `.tabela-przewijana` (`opakujTabele`).
- **Strony kategorii:** `/blog/temat/<slug>/` (paginacja `src/blog-temat.njk` po
  `src/_data/kategorieLista.js`) - działają bez JS; filtr JS na /blog/ to nakładka.
  Przekierowania `/category/...` i tagi wpisów celują w te strony.
- Disclaimer inwestycyjny automatyczny pod wpisami "Finanse i emerytura" + w portfelu na O mnie.
- Newsletter: formularz POST na endpoint MailerLite z dawnego embedu (fetch w site.js, sukces
  -> `/dziekuje-bardzo/`). RSS `/feed.xml` + fallback `/feed/`. Wyszukiwarka Pagefind (modal).
  Fonty self-hosted (woff2, `src/assets/fonts/`). Postaw kawę: buycoffee.to/tomaszkwietniewski.
- Komendy: `npm run dev` (podgląd z live reload), `npm run build` (clean + Eleventy + Pagefind),
  `npm run check` (test dat + asercje `tools/verify_build.mjs` + kontrola treści
  `tools/sprawdz_wpis.mjs`), `npm run verify` (build + check).
  Podgląd statyczny: launch config `strona-static` (python http.server na `_site`, port 8771).
- **Daty (2026-07-25):** parser `lib/daty.js` - data bez offsetu we frontmatter oznacza
  czas polski (Europe/Warsaw) niezależnie od strefy procesu (runner CI = UTC); brak/błąd
  daty i zduplikowany slug wysadzają build z nazwą pliku. Pages CMS może zapisywać daty
  bez offsetu - parser to obsługuje. Nie pisać dat YAML bez cudzysłowu z offsetem.
- **Publikacja zaplanowana:** wpis z przyszłą datą (frontmatter `date`) jest pomijany
  w buildzie (`src/_data/wpisy.js`) - ukryty (brak strony, /blog/, sitemap, RSS) do czasu.
  Cron w `deploy-pages.yml` (`20 6,12 * * *` = 08:20 i 14:20 CEST; drugi przebieg to zapas
  na zgubiony run) przebudowuje stronę i ujawnia wpis. Podgląd zaplanowanych lokalnie:
  `ELEVENTY_PRZYSZLE=1 npx @11ty/eleventy`. `verify_build.mjs` liczy tylko opublikowane
  i pilnuje, że zaplanowane NIE wyciekły do `_site`. Publikacja natychmiastowa = data
  bieżąca/przeszła. UWAGA: GitHub wyłącza cron po 60 dniach bez commitów - po dłuższej
  przerwie przed zaplanowaniem wpisu odpalić ręcznie Run workflow (szczegóły: WDROZENIE.md).
- Lokalny subagent do stress-testu: `.claude/agents/website-stress-tester.md` (poza gitem).

## Struktura

| Ścieżka | Co to |
|---|---|
| `content/wpisy/` | wpisy blogowe, format: `RRRR-MM-DD-slug.md` (frontmatter YAML + treść HTML z WP) |
| `content/strony/` | podstrony (o-mnie, kontakt, zestawienia typu ksiazki/podcasty) |
| `media/` | obrazki z wp-content/uploads, struktura RRRR/MM; treści linkują względnie `media/...` |
| `docs/` | **warsztat artykułów - POZA GITEM** (`.gitignore`): źródła, recenzje, notatki. Schemat: `docs/README.md` |
| `.pages.yml` | konfiguracja panelu Pages CMS |
| `tools/sprawdz_wpis.mjs` | kontrola treści w `npm run check`: offset w datach (pułapka Pages CMS), interpunkcja nowych wpisów, bogate eseje (puste linie w `.esej`, `<pre><code>`, 1x h1) + ostrzeżenie o zmianie `<style>` |
| `tools/export_wp.py` | ponowny eksport ze starego WP (historyczny; stary WP żyje pod 188.210.222.8) |
| `tools/fix_entities.py` | dekodowanie encji HTML w title/excerpt |

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
  żeby dało się edytować zmigrowane wpisy. Mapowanie starych na nowe: `lib/kategorie.js`.
- Stare wpisy mają treść HTML (bloki Gutenberga) - edytor rich-text może przy zapisie
  uprościć znaczniki (klasy wp-block-*). Niegroźne, nowa strona ich nie używa.
- Zapis w panelu = commit do main = od razu publikacja na produkcję.

## Publikacja - ZROBIONA (2026-07-17)

Strona live na GitHub Pages: repo publiczne (docs/ wycięte z historii), workflow
`.github/workflows/deploy-pages.yml` (trigger: push do main), domena przez passthrough
`CNAME.gotowy` -> `CNAME`, DNS apex na rekordy A GitHuba (panel SEOHost). Rollback,
szczegóły DNS i pułapka certyfikatu HTTPS: pamięć projektu + `WDROZENIE.md`.
Sitemap zgłoszony w Search Console (2026-07-17). Robots.txt też na niego wskazuje.

## Konwencje (obowiązują w całym projekcie)

- Interpunkcja: zwykły dywiz `-`, NIGDY długie myślniki (em/en dash), bez strzałek,
  wielokropków-znaków; pełna polszczyzna z diakrytykami. (Szczegóły: globalny CLAUDE.md.)
- Zachowywać oryginalne daty publikacji i slugi zmigrowanych treści.
- Treści o inwestowaniu: obowiązkowy disclaimer.
- **STRONA BEZ COOKIES:** zero analityki, trackerów i skryptów zewnętrznych. Nie osadzać
  iframe'ów zapisujących cookies (playery Spotify/anchor.fm podmienione na linki 2026-07-17;
  YouTube tylko przez nocookie - robi to build). Każda nowa integracja zbierająca dane
  (analityka, komentarze, osadzenia) = obowiązkowa aktualizacja polityki prywatności
  i pytanie o baner zgody (unikać - brak banera to atut strony).
- **Warsztat artykułu idzie do `docs/`, NIGDY do `content/`.** `content/wpisy/` zawiera
  wyłącznie pliki `.md` (to katalog kolekcji Pages CMS, a repo jest publiczne - materiały
  źródłowe i raporty PDF nie mogą tam trafić). Jeden folder w `docs/artykuly/` = jeden wpis,
  nazwa folderu = nazwa pliku `.md` bez rozszerzenia; tematy bez daty publikacji w
  `docs/pomysly/`. Schemat i mapa zawartości: `docs/README.md`.
- Ton tekstów: prosto, po ludzku, bez patosu i sprzedażowego języka.
- Weryfikacja przed "gotowe": realne uruchomienie + testy w przeglądarce (asercje DOM,
  konsola bez błędów), nie tylko "kompiluje się".

## Ekosystem (linki powiązane ze stroną)

github.com/tomasz-kwietniewski | misjamada.pl | najlepsipilkarze.tomaszkwietniewski.pl |
pedalowaniezsensem.tomaszkwietniewski.pl (archiwum 2014; domena pedalowaniezsensem.pl WYGASŁA) |
przeglad.tomaszkwietniewski.pl | momentum.tomaszkwietniewski.pl (dopracowane, kafelek na Projektach od 2026-07-18) |
finansezsensem.pl (usługa konsultacji finansowych, live od 2026-07-20; kafelek na Projektach,
wzmianka na /tematy/prywatna-emerytura/ i link w "Kim jestem" na stronie głównej) |
Google Play: aplikacja "Hormon Wzrostu Dawkowanie" | kontakt@tomaszkwietniewski.pl
