// Czyści katalog wyjściowy przed buildem. Bez tego artefakty z poprzednich
// uruchomień (np. podgląd ELEVENTY_PRZYSZLE=1) zostawały w _site i wyciekały
// do kolejnego builda/podglądu.
import { rmSync } from "node:fs";
rmSync("_site", { recursive: true, force: true });
