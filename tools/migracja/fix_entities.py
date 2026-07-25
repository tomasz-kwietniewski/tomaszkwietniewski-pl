# -*- coding: utf-8 -*-
"""Dekoduje encje HTML (&#8211; itp.) w polach title i excerpt frontmattera."""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "content"
FIELD_RE = re.compile(r'^(title|excerpt): "(.*)"$')

changed = 0
for md in sorted(ROOT.rglob("*.md")):
    lines = md.read_text(encoding="utf-8").split("\n")
    dirty = False
    for i, line in enumerate(lines):
        m = FIELD_RE.match(line)
        if not m:
            continue
        # zdejmij YAML-owe escapowanie, zdekoduj encje, nałóż escapowanie z powrotem
        raw = m.group(2).replace('\\"', '"').replace("\\\\", "\\")
        decoded = html.unescape(raw)
        if decoded != raw:
            esc = decoded.replace("\\", "\\\\").replace('"', '\\"')
            lines[i] = f'{m.group(1)}: "{esc}"'
            dirty = True
    if dirty:
        md.write_text("\n".join(lines), encoding="utf-8")
        changed += 1
        print(f"poprawiono: {md.name}")

print(f"RAZEM zmienionych plikow: {changed}")
sys.stdout.reconfigure(encoding="utf-8")
