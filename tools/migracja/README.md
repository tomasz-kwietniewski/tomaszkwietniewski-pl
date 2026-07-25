# Skrypty migracyjne (archiwalne)

Jednorazowe narzędzia z migracji WordPress -> Eleventy (lipiec 2026).
Nie są używane przez build ani CI - zostają jako dokumentacja procesu
i na wypadek ponownego eksportu (stary WP dalej działa pod 188.210.222.8).

- `export_wp.py` - eksport wpisów/stron/mediów przez WP REST API
- `fix_entities.py` - dekodowanie encji HTML w title/excerpt po eksporcie
- `extract_image_slots.mjs` - analiza miejsc na obrazki w treściach
- `backfill_miniatury.mjs` - jednorazowe uzupełnienie pola miniatura we frontmatter
