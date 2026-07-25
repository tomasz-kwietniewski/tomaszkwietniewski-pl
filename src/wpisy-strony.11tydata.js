// Dane wpisu przekazywane funkcjami, nie stringami szablonu we front matter.
// String "{{ wpis.title }}" przechodził przez Nunjucksa: tytuł z "&" byłby
// podwójnie escapowany, a "{{" w tytule wykonałoby się jako kod szablonu.
export default {
  layout: "layouts/wpis.njk",
  ogTyp: "article",
  klasaBody: "widok-wpis",
  eleventyComputed: {
    permalink: (data) => data.wpis.permalink,
    title: (data) => data.wpis.title,
    opisSEO: (data) => data.wpis.metaDescription,
    ogObrazek: (data) => data.wpis.miniatura,
  },
};
