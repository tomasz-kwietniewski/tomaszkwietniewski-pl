// Dane wpisu przekazywane funkcjami, nie stringami szablonu we front matter.
// String "{{ wpis.title }}" przechodził przez Nunjucksa: tytuł z "&" byłby
// podwójnie escapowany, a "{{" w tytule wykonałoby się jako kod szablonu.
const BAZA = "https://tomaszkwietniewski.pl";

export default {
  layout: "layouts/wpis.njk",
  ogTyp: "article",
  klasaBody: "widok-wpis",
  eleventyComputed: {
    permalink: (data) => data.wpis.permalink,
    title: (data) => data.wpis.title,
    opisSEO: (data) => data.wpis.metaDescription,
    ogObrazek: (data) => data.wpis.miniatura,
    // JSON-LD budowany w JS i serializowany tutaj ("<" escapowane, żeby treść
    // nie mogła zamknąć tagu <script>); head-seo.njk tylko wypisuje string.
    jsonLd: (data) => {
      const w = data.wpis;
      const obiekt = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: w.title,
        description: w.metaDescription,
        datePublished: w.date.toISOString(),
        dateModified: w.modified.toISOString(),
        author: { "@type": "Person", name: "Tomasz Kwietniewski", url: `${BAZA}/o-mnie/` },
        mainEntityOfPage: BAZA + encodeURI(w.permalink),
      };
      if (w.miniatura && !w.miniatura.endsWith(".svg")) obiekt.image = BAZA + encodeURI(w.miniatura);
      return JSON.stringify(obiekt).replace(/</g, "\\u003c");
    },
  },
};
