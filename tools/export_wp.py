# -*- coding: utf-8 -*-
"""
Eksport całej treści z tomaszkwietniewski.pl (WordPress REST API) do lokalnych plików.

Wynik (w katalogu export/):
  raw/        - surowe JSON-y z API (pełny backup: posts, pages, categories, media)
  wpisy/      - 1 plik .md na wpis (frontmatter YAML + treść HTML)
  strony/     - 1 plik .md na podstronę
  media/      - pobrane pliki z wp-content/uploads (struktura RRRR/MM zachowana)
  INDEX.md    - spis wszystkiego

Adresy obrazków w treściach są przepisywane na względne (media/...),
oryginalne adresy zostają w raw/.
"""
import json
import re
import sys
import time
from pathlib import Path

import requests

BASE = "https://tomaszkwietniewski.pl"
API = BASE + "/wp-json/wp/v2"
ROOT = Path(__file__).resolve().parent.parent / "export"
UPLOAD_PREFIX = BASE + "/wp-content/uploads/"

session = requests.Session()
session.headers["User-Agent"] = "tk-export/1.0 (wlasciciel strony)"


def fetch_all(endpoint, params=None):
    """Pobiera wszystkie rekordy z paginowanego endpointu."""
    items, page = [], 1
    while True:
        p = {"per_page": 100, "page": page}
        if params:
            p.update(params)
        r = session.get(f"{API}/{endpoint}", params=p, timeout=60)
        r.raise_for_status()
        batch = r.json()
        items.extend(batch)
        total_pages = int(r.headers.get("X-WP-TotalPages", "1"))
        if page >= total_pages:
            return items
        page += 1


def yaml_escape(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"') + '"'


def find_upload_urls(html):
    """Wszystkie adresy z wp-content/uploads użyte w treści (src, srcset, href)."""
    return set(re.findall(re.escape(UPLOAD_PREFIX) + r'[^\s"\'<>)]+', html))


def download_media(url, media_dir):
    """Pobiera plik uploads, zachowując podścieżkę. Zwraca ścieżkę względną lub None."""
    rel = url[len(UPLOAD_PREFIX):].split("?")[0]
    target = media_dir / rel
    if target.exists():
        return rel
    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        r = session.get(url, timeout=120)
        r.raise_for_status()
        target.write_bytes(r.content)
        return rel
    except requests.RequestException as e:
        print(f"  ! nie pobrano: {url} ({e})")
        return None


def rewrite_uploads(html):
    return html.replace(UPLOAD_PREFIX, "media/")


def save_item(item, out_dir, kind, cat_names):
    title = item["title"]["rendered"]
    slug = item["slug"]
    date = item["date"][:10]
    html = item["content"]["rendered"]
    lines = ["---"]
    lines.append(f"title: {yaml_escape(title)}")
    lines.append(f"slug: {yaml_escape(slug)}")
    lines.append(f"date: {yaml_escape(item['date'])}")
    lines.append(f"modified: {yaml_escape(item['modified'])}")
    lines.append(f"url_stara: {yaml_escape(item['link'])}")
    lines.append(f"typ: {yaml_escape(kind)}")
    if kind == "wpis":
        cats = [cat_names.get(c, str(c)) for c in item.get("categories", [])]
        lines.append("kategorie: [" + ", ".join(yaml_escape(c) for c in cats) + "]")
        excerpt = re.sub(r"<[^>]+>", "", item.get("excerpt", {}).get("rendered", "")).strip()
        if excerpt:
            lines.append(f"excerpt: {yaml_escape(excerpt)}")
    lines.append("---")
    lines.append("")
    lines.append(rewrite_uploads(html))
    fname = (f"{date}-{slug}.md" if kind == "wpis" else f"{slug}.md")
    (out_dir / fname).write_text("\n".join(lines), encoding="utf-8")
    return fname


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    raw_dir = ROOT / "raw"; raw_dir.mkdir(exist_ok=True)
    wpisy_dir = ROOT / "wpisy"; wpisy_dir.mkdir(exist_ok=True)
    strony_dir = ROOT / "strony"; strony_dir.mkdir(exist_ok=True)
    media_dir = ROOT / "media"; media_dir.mkdir(exist_ok=True)

    print("Pobieram kategorie...")
    categories = fetch_all("categories")
    cat_names = {c["id"]: c["name"] for c in categories}

    print("Pobieram wpisy...")
    posts = fetch_all("posts")
    print(f"  {len(posts)} wpisow")

    print("Pobieram strony...")
    pages = fetch_all("pages")
    print(f"  {len(pages)} stron")

    print("Pobieram liste mediow...")
    media = fetch_all("media")
    print(f"  {len(media)} pozycji w bibliotece")

    for name, data in [("posts", posts), ("pages", pages),
                       ("categories", categories), ("media", media)]:
        (raw_dir / f"{name}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")

    # adresy do pobrania: oryginaly z biblioteki + dokladne warianty uzyte w tresciach
    urls = set()
    for m in media:
        if m.get("source_url", "").startswith(UPLOAD_PREFIX):
            urls.add(m["source_url"])
    for item in posts + pages:
        urls |= find_upload_urls(item["content"]["rendered"])

    print(f"Pobieram media ({len(urls)} plikow)...")
    ok = 0
    for i, url in enumerate(sorted(urls), 1):
        if download_media(url, media_dir):
            ok += 1
        if i % 25 == 0:
            print(f"  {i}/{len(urls)}")
            time.sleep(0.2)
    print(f"  pobrano {ok}/{len(urls)}")

    print("Zapisuje wpisy i strony...")
    index = ["# Eksport tomaszkwietniewski.pl", "",
             f"Data eksportu: {time.strftime('%Y-%m-%d %H:%M')}", "",
             f"- Wpisy: {len(posts)}", f"- Strony: {len(pages)}",
             f"- Pliki media: {ok}", "", "## Wpisy", ""]
    for p in sorted(posts, key=lambda x: x["date"], reverse=True):
        fname = save_item(p, wpisy_dir, "wpis", cat_names)
        cats = ", ".join(cat_names.get(c, "?") for c in p.get("categories", []))
        index.append(f"- {p['date'][:10]} [{p['title']['rendered']}](wpisy/{fname}) ({cats})")
    index += ["", "## Strony", ""]
    for pg in sorted(pages, key=lambda x: x["slug"]):
        fname = save_item(pg, strony_dir, "strona", cat_names)
        index.append(f"- [{pg['title']['rendered']}](strony/{fname})")
    (ROOT / "INDEX.md").write_text("\n".join(index), encoding="utf-8")

    print("GOTOWE.")
    print(f"Eksport w: {ROOT}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
