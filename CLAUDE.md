# CLAUDE.md - nowa strona tomaszkwietniewski.pl

Stan na 2026-07-16. Ten plik to pełny kontekst projektu - utrzymuj go aktualnym po każdej większej zmianie.

## Czym jest ten projekt

Nowa wersja strony osobistej tomaszkwietniewski.pl, zastępująca WordPressa (szablon Kadence).
Trzy role strony: blog (sprawdzone treści: inwestowanie pasywne, technologie, tipy),
wizytówka osobista z sekcją projektów, baza newslettera (MailerLite - ta sama lista co dotąd).

Stara strona WCIĄŻ DZIAŁA na WordPressie i będzie działać do podmiany DNS (ostatni krok).

## Stan projektu (co już jest zrobione)

- Treść ZMIGROWANA z WordPressa przez REST API (2026-07-16): 87 wpisów, 21 podstron, 445 mediów.
- Repo: https://github.com/tomasz-kwietniewski/tomaszkwietniewski-pl (PRYWATNE, gałąź main).
- Pages CMS podpięty i PRZETESTOWANY end-to-end (panel: app.pagescms.org, konto GitHub Tomasza).
- Brief treści i architektury: `docs/wyciag-tresci.md` (architektura stron, sekcja Projekty,
  mapowanie kategorii, ton, czego nie umieszczać - CZYTAJ PRZED projektowaniem podstron).
- Czeka na: projekt graficzny z Claude Design (Tomasz zrobi handoff do tego folderu).

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

1. Handoff z Claude Design (Tomasz wrzuci pliki do tego folderu) -> szablony:
   strona główna, pojedynczy wpis, lista wpisów/kategorii, podstrona.
2. Build strony statycznej z content/ + media/. Preferencja Tomasza: lekkie rozwiązania,
   bez ciężkich frameworków. Markdown z HTML w środku musi się renderować 1:1.
3. GitHub Actions: build + deploy na GitHub Pages. Playbook Tomasza:
   `C:\Users\L857K\.claude\playbooks\deploy-github-pages.md` (+ starter w templates/).
4. Elementy obowiązkowe na stronie: formularz MailerLite (embed, ta sama lista),
   disclaimer "to nie jest porada inwestycyjna" przy treściach inwestycyjnych,
   RSS (stary WP ma /feed/ - zadbać o odpowiednik lub przekierowanie).
5. Przekierowania 301 wg pola `url_stara` tam, gdzie adres się zmieni (przy zachowaniu
   slugów pod domeną zmian nie będzie). Uwaga: GitHub Pages nie robi prawdziwych 301 -
   jeśli potrzebne, meta refresh + canonical.
6. **PRZED upublicznieniem repo** (wymóg GitHub Pages na darmowym planie):
   usunąć `docs/` z repo I Z HISTORII GITA (git filter-repo) - to prywatne notatki.
7. Świeży eksport ze starego WP (`tools/export_wp.py` - dogra wpisy dodane w międzyczasie).
8. Podmiana DNS tomaszkwietniewski.pl na GitHub Pages (panel DNS ma Tomasz).
   Subdomeny najlepsipilkarze.* i momentum.* już działają na tym wzorcu.

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
