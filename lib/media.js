// Przepisywanie adresów w wyrenderowanym HTML treści.
// Pliki źródłowe w content/ pozostają nietknięte - to działa tylko na wyjściu builda.

export function rewriteMediaUrls(html) {
  // src/href/poster wskazujące relatywnie na media/ (też ./media/) -> absolutnie /media/
  html = html.replace(/(\s(?:src|href|poster)=(["']))(?:\.\/)?media\//g, "$1/media/");

  // srcset: każdy kandydat w wartości atrybutu
  html = html.replace(/(\ssrcset=")([^"]*)(")/g, (m, przed, wartosc, po) =>
    przed + wartosc.replace(/(^|,\s*)(?:\.\/)?media\//g, "$1/media/") + po
  );

  // Linki absolutne do własnej domeny -> relatywne (działają lokalnie i na stagingu,
  // a wewnętrzna nawigacja nie prowadzi do starego WordPressa przed podmianą DNS).
  // Lookahead pilnuje granicy hosta (nie łapie np. tomaszkwietniewski.pl.przyklad.com).
  html = html.replace(/(\s(?:href|src)=")https?:\/\/(?:www\.)?tomaszkwietniewski\.pl(?=[/"?#])\/?/g, "$1/");

  // YouTube bez ciasteczek
  html = html.replace(/https?:\/\/(?:www\.)?youtube\.com\/embed\//g, "https://www.youtube-nocookie.com/embed/");

  return html;
}

// Owija tabele z treści w przewijany kontener - tabela zachowuje semantykę
// (colspan, układ kolumn), a na wąskich ekranach przewija się tylko wrapper.
// Zakłada brak zagnieżdżonych tabel (treści z WP ich nie mają).
export function opakujTabele(html) {
  return html
    .replace(/<table\b/g, '<div class="tabela-przewijana"><table')
    .replace(/<\/table>/g, "</table></div>");
}

// Usuwa iframe'y inne niż YouTube (polityka "strona bez cookies"). Zmigrowane
// wpisy mają oEmbedy WP (inwestomat.eu itp.) - iframe jest niewidoczny bez
// skryptu WP (style visibility:hidden), a mimo to ładuje zewnętrzne zasoby.
// Fallback zostaje: WP zapisuje obok <blockquote class="wp-embedded-content">
// ze zwykłym linkiem do źródła.
export function usunObceOsadzenia(html) {
  return html.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>|<iframe\b[^>]*\/?>/gi, (tag) =>
    /src="https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be)\//i.test(tag) ? tag : ""
  );
}
