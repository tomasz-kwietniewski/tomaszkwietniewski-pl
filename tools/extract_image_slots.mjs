// Wyodrębnia obrazki wgrane do slotów prototypu Claude Design
// (.image-slots.state.json: { "slot-id": { u: "data:image/webp;base64,...", x, y, s } })
// do zwykłych plików graficznych.
//
// Użycie: node tools/extract_image_slots.mjs <ścieżka-do-.image-slots.state.json> <katalog-docelowy>

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const [, , sidecarPath, outDir] = process.argv;
if (!sidecarPath || !outDir) {
  console.error("Użycie: node tools/extract_image_slots.mjs <sidecar.json> <katalog-docelowy>");
  process.exit(1);
}

const state = JSON.parse(readFileSync(sidecarPath, "utf8"));
mkdirSync(outDir, { recursive: true });

for (const [id, slot] of Object.entries(state)) {
  if (!slot || typeof slot.u !== "string") continue;
  const m = slot.u.match(/^data:image\/(\w+);base64,(.+)$/s);
  if (!m) {
    console.warn(`${id}: pominięte (brak data-URL)`);
    continue;
  }
  const [, ext, b64] = m;
  const file = join(outDir, `${id}.${ext}`);
  writeFileSync(file, Buffer.from(b64, "base64"));
  console.log(`${id}.${ext}  (kadrowanie: x=${slot.x} y=${slot.y} s=${slot.s})`);
}
