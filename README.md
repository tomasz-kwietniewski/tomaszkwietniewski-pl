# tomaszkwietniewski.pl - nowa strona

Repozytorium treści i kodu nowej wersji strony tomaszkwietniewski.pl. Zastępuje WordPressa.
Statyczny generator **Eleventy 3** + treść w markdown/HTML, hosting docelowo GitHub Pages.

## Uruchomienie lokalne

```
npm install
npm run dev      # podgląd z live reload (Eleventy)
npm run build    # produkcyjny build do _site/ + indeks wyszukiwarki Pagefind
npm run verify   # build + asercje poprawności (tools/verify_build.mjs)
```

Publikacja: patrz `WDROZENIE.md`.

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `content/wpisy/` | wpisy blogowe (markdown: frontmatter YAML + treść HTML) |
| `content/strony/` | podstrony (O mnie, Kontakt, zestawienia itd.) |
| `media/` | obrazki i pliki (przeniesione z wp-content/uploads, struktura RRRR/MM) |
| `.pages.yml` | konfiguracja panelu Pages CMS (https://pagescms.org) |
| `eleventy.config.js`, `src/`, `lib/` | generator strony (szablony, dane, logika) |
| `tools/export_wp.py` | skrypt eksportu ze starego WordPressa (do ewentualnego ponowienia) |
| `tools/verify_build.mjs` | asercje poprawności builda (odpalane też w CI) |

`content/` i `media/` nie są ruszane przez build - Pages CMS działa na nich bez zmian.

## Jak dodawać i edytować treści (Pages CMS)

1. Wejdź na https://app.pagescms.org i zaloguj się kontem GitHub.
2. Wybierz repozytorium `tomaszkwietniewski-pl`.
3. W menu masz kolekcje **Wpisy** i **Podstrony**: edycja, dodawanie, wgrywanie obrazków.
4. Zapis w panelu robi commit do tego repo. Gdy będzie podpięty deploy (GitHub Actions),
   każdy zapis automatycznie zaktualizuje stronę.

Uwagi:
- Przy nowym wpisie wystarczy wpisać TYTUŁ - nazwa pliku (i z niej adres URL) generuje
  się z tytułu automatycznie przy zapisie: małe litery, bez polskich znaków, spacje
  jako myślniki. Późniejsza zmiana tytułu NIE zmienia już nazwy pliku (i słusznie -
  adres opublikowanego wpisu nie powinien się zmieniać).
- Pole "Slug" zostaw zwykle puste. Reguła dla builda strony: adres wpisu = frontmatter
  slug, a gdy pusty - nazwa pliku bez daty i rozszerzenia.
- Przy nowych wpisach używaj NOWYCH kategorii (górna część listy). Stare nazwy kategorii
  są na liście tylko po to, żeby dało się edytować zmigrowane wpisy.
- Stare wpisy mają treść w HTML z WordPressa (bloki Gutenberga). Edytor Pages CMS może
  przy zapisie uprościć ich znaczniki (np. usunąć klasy wp-block-...) - na nowej stronie
  te klasy i tak nie są używane, więc to niegroźne. Nowe wpisy zapisują się czysto.
- Pole `url_stara` zostawiaj bez zmian - to mapa do przekierowań 301 ze starych adresów.

## Zasady treści

- Zachowujemy slugi i daty publikacji ze starego WordPressa (SEO + porządek w archiwum).
- Przy treściach inwestycyjnych obowiązkowy disclaimer "to nie jest porada inwestycyjna".
- Interpunkcja: zwykły dywiz, bez długich myślników.

## Do zrobienia (kolejność)

Build gotowy. Pozostała publikacja - pełna instrukcja w `WDROZENIE.md`:

1. Usunąć `docs/` z repo i historii gita (prywatne notatki) przed upublicznieniem.
2. Świeży eksport ze starego WP (`tools/export_wp.py`) + `npm run verify`.
3. Włączyć Pages (Source: GitHub Actions), odkomentować `push:` w workflow.
4. Domena: passthrough `CNAME.gotowy` + rekordy A/AAAA GitHuba w DNS (apex).
5. Przełączenie repo na publiczne (wymóg GitHub Pages na darmowym planie).
