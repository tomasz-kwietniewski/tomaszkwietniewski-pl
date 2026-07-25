// Jak wpisy-strony.11tydata.js - wartości funkcjami zamiast stringów szablonu.
export default {
  layout: "layouts/podstrona.njk",
  eleventyComputed: {
    permalink: (data) => data.strona.permalink,
    title: (data) => data.strona.title,
    opisSEO: (data) => data.strona.metaDescription,
  },
};
