// Encje nazwane spotykane w treściach z WordPressa. Numeryczne (&#8222;, &#x2026;)
// dekoduje fromCodePoint; nieznane nazwane zamieniamy na spację (jak dawniej).
const ENCJE = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "-", mdash: "-", hellip: "...", laquo: "«", raquo: "»",
  bdquo: "„", rdquo: "”", ldquo: "“", rsquo: "’", lsquo: "‘",
  oacute: "ó", Oacute: "Ó", eacute: "é", uuml: "ü", ouml: "ö", auml: "ä",
  copy: "©", reg: "®", trade: "™", deg: "°", shy: "", zwnj: "", zwj: "",
};

function dekodujEncje(tekst) {
  return tekst
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(+num))
    .replace(/&([a-zA-Z]+);/g, (m, nazwa) => (nazwa in ENCJE ? ENCJE[nazwa] : " "));
}

export function tekstZHtml(html) {
  const bezTagow = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return dekodujEncje(bezTagow)
    .replace(/\s+/g, " ")
    .trim();
}

export function czasCzytania(html) {
  const slowa = tekstZHtml(html).split(/\s+/).filter(Boolean).length;
  const min = Math.max(1, Math.round(slowa / 200));
  return `${min} min czytania`;
}
