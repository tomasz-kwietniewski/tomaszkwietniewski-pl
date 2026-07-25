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
