# Wdrożenie strony na GitHub Pages

Strona jest zbudowana i przetestowana lokalnie. Publikacja to kilka kroków, w tej kolejności.

## 1. Przed upublicznieniem repo (WYMÓG: Pages na darmowym planie działa tylko z repo publicznym)

- **Usuń `docs/` z repo I Z HISTORII gita** (to prywatne notatki robocze):
  ```
  git rm -r --cached docs
  git commit -m "Usuniecie prywatnych notatek docs/ przed upublicznieniem"
  # oraz z historii:
  git filter-repo --path docs --invert-paths
  ```
  (albo `git filter-branch` / BFG, jeśli `git-filter-repo` niedostępne)
- Sprawdź, że w repo nie ma innych prywatnych plików (CLAUDE.md projektu jest ok - opisuje projekt, nie zawiera sekretów).

## 2. Świeży eksport ze starego WordPressa (dogranie wpisów dodanych w międzyczasie)

```
python tools/export_wp.py
```
Potem `npm run verify`, żeby potwierdzić, że wszystko dalej się buduje.

## 3. Włączenie Pages i workflow

- GitHub: repo -> Settings -> Pages -> Source: **GitHub Actions**.
- W `.github/workflows/deploy-pages.yml` odkomentuj blok `push: branches: [main]`
  (wtedy każdy zapis z Pages CMS = publikacja). Zostaw `workflow_dispatch` do ręcznego odpalania.
- Pierwszy deploy: zakładka Actions -> "Deploy na GitHub Pages" -> Run workflow.

## 4. Domena własna (CNAME)

- **Dopiero na tym etapie** wgraj plik `CNAME` do katalogu, który trafia do published site.
  Najprościej: dodaj do `eleventy.config.js` passthrough:
  ```js
  eleventyConfig.addPassthroughCopy({ "CNAME.gotowy": "CNAME" });
  ```
  (plik `CNAME.gotowy` z treścią `tomaszkwietniewski.pl` jest już w repo)
- DNS: `tomaszkwietniewski.pl` to domena apex - potrzebne rekordy **A/AAAA** na adresy GitHuba
  (nie CNAME, bo to apex). Aktualne adresy A GitHub Pages:
  185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  (+ rekordy AAAA na 2606:50c0:8000..8003::153). Panel DNS ma Tomasz.
- Po propagacji DNS: Settings -> Pages -> Custom domain -> `tomaszkwietniewski.pl`, zaznacz "Enforce HTTPS".

## 5. Po podmianie DNS

- Sprawdź na produkcji: strona główna, kilka wpisów, `/feed.xml`, wpis ze slugiem NFD
  (`/wojna-energetyczna-czy-polska-jest-bezpieczna-piotr-maciążek-wywiad/`), stary adres kategorii
  (`/category/inwestowanie/` -> ma przekierować na `/blog/?temat=finanse-i-emerytura`).
- Zgłoś nową sitemap w Google Search Console.

## Uwaga o `site.url`

`src/_data/site.js` ma `url: https://tomaszkwietniewski.pl` na sztywno - canonicale i OG
wskazują produkcję nawet przy podglądzie na `*.github.io`, co chroni SEO. Nie zmieniaj tego.
