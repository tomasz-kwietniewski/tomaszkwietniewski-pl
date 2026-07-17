export function tekstZHtml(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function czasCzytania(html) {
  const slowa = tekstZHtml(html).split(/\s+/).filter(Boolean).length;
  const min = Math.max(1, Math.round(slowa / 200));
  return `${min} min czytania`;
}
