# tomaszkwietniewski.pl - nowa strona

Repozytorium treści i (docelowo) kodu nowej wersji strony tomaszkwietniewski.pl.
Zastępuje WordPressa. Stan: treść zmigrowana, projekt graficzny w przygotowaniu (Claude Design).

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `content/wpisy/` | 87 wpisów blogowych (markdown: frontmatter YAML + treść) |
| `content/strony/` | 21 podstron (O mnie, Kontakt, zestawienia itd.) |
| `media/` | obrazki i pliki (przeniesione z wp-content/uploads, struktura RRRR/MM) |
| `.pages.yml` | konfiguracja panelu Pages CMS (https://pagescms.org) |
| `tools/export_wp.py` | skrypt eksportu ze starego WordPressa (do ewentualnego ponowienia) |

## Jak dodawać i edytować treści (Pages CMS)

1. Wejdź na https://app.pagescms.org i zaloguj się kontem GitHub.
2. Wybierz repozytorium `tomaszkwietniewski-pl`.
3. W menu masz kolekcje **Wpisy** i **Podstrony**: edycja, dodawanie, wgrywanie obrazków.
4. Zapis w panelu robi commit do tego repo. Gdy będzie podpięty deploy (GitHub Actions),
   każdy zapis automatycznie zaktualizuje stronę.

Uwagi:
- Przy nowym wpisie NAJPIERW uzupełnij tytuł i slug, dopiero potem kliknij Save -
  nazwa pliku powstaje przy pierwszym zapisie (na bazie sluga) i później się sama
  nie zmieni. Pole z nazwą pliku widać przy tworzeniu wpisu - można ją tam poprawić.
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

1. Projekt graficzny w Claude Design -> szablony (strona główna, wpis, lista wpisów, podstrona).
2. Generator/build strony statycznej z content/ + media/.
3. Workflow GitHub Actions: build + deploy na GitHub Pages.
4. Przekierowania 301 wg pola url_stara (jeśli zmieni się struktura adresów).
5. Podmiana DNS tomaszkwietniewski.pl na GitHub Pages (przed tym: świeży eksport WP
   skryptem tools/export_wp.py, żeby dograć wpisy dodane w międzyczasie).
6. Przełączenie repo na publiczne (wymóg GitHub Pages na darmowym planie) - przed startem.
