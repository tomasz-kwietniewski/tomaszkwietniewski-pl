# Wdrożenie i runbook awaryjny

Strona jest WDROŻONA i live od 2026-07-17 (GitHub Pages, deploy automatyczny
z push do main). Ten plik to runbook na wypadek awarii - kroki wdrożeniowe
zostały wykonane i NIE należy ich powtarzać (historia: git log, pamięć projektu).

## Stan produkcji

- Hosting: GitHub Pages, repo publiczne `tomasz-kwietniewski/tomaszkwietniewski-pl`,
  workflow `.github/workflows/deploy-pages.yml` (push do main + cron 2x dziennie + ręcznie).
- Domena: apex `tomaszkwietniewski.pl`, rekordy A w panelu DNS SEOHost na adresy GitHuba:
  185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  (+ AAAA 2606:50c0:8000..8003::153). Plik CNAME przez passthrough `CNAME.gotowy` -> `CNAME`.
- Stary WordPress DZIAŁA dalej na SEOHost pod IP **188.210.222.8** (zapas do rollbacku).

## Rollback (strona na Pages padła / trzeba wrócić do WP)

1. Panel DNS SEOHost: usuń rekordy A GitHuba dla apexu i ustaw **A -> 188.210.222.8**.
2. Poczekaj na propagację (TTL; zwykle do godziny).
3. PUŁAPKA CERTYFIKATU: po powrocie na SEOHost sprawdź, czy certyfikat SSL dla
   domeny na hostingu jest ważny (szczegóły: pamięć projektu, notatka o certyfikatach).
   ACME na SEOHost wystawia i odnawia automatycznie - ale po okresie wskazywania
   na GitHub walidacja mogła nie przebiegać.
4. Stary WP ma treści tylko do daty migracji (2026-07) - nowsze wpisy istnieją
   wyłącznie w tym repo.

## Awaria builda / deployu (strona stoi, deploy nie przechodzi)

- Zakładka Actions -> ostatni run "Deploy na GitHub Pages" -> logi kroku
  "Weryfikacja builda" (asercje `tools/verify_build.mjs` mówią wprost, co pękło).
- Deploy można odpalić ręcznie: Actions -> Run workflow (workflow_dispatch).
- UWAGA CRON: GitHub wyłącza harmonogramy (schedule) w repo bez commitów przez
  60 dni. Po dłuższej przerwie w publikowaniu wpis zaplanowany może się nie
  opublikować - wtedy ręczny Run workflow (i to od razu resetuje licznik).

## Kontrola po zmianach DNS / większych zmianach

- Strona główna, kilka wpisów, `/feed.xml`, wpis ze slugiem NFD
  (`/wojna-energetyczna-czy-polska-jest-bezpieczna-piotr-maciążek-wywiad/`),
  stary adres kategorii (`/category/inwestowanie/` - ma przekierować).
- `https://` wymuszone (Settings -> Pages -> Enforce HTTPS).
- Search Console: sitemap zgłoszony 2026-07-17.

## Uwaga o `site.url`

`src/_data/site.js` ma `url: https://tomaszkwietniewski.pl` na sztywno - canonicale
i OG wskazują produkcję nawet przy podglądzie na `*.github.io`, co chroni SEO.
Nie zmieniaj tego.
