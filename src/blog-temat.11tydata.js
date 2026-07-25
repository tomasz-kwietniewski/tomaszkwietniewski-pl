// Dane strony kategorii funkcjami (jak wpisy-strony.11tydata.js).
export default {
  eleventyComputed: {
    permalink: (data) => `/blog/temat/${data.kat.slug}/`,
    title: (data) => data.kat.nazwa,
    opisSEO: (data) => data.kat.opis,
  },
};
