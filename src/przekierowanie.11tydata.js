// Permalink funkcją zamiast stringa szablonu (spójnie z resztą paginacji).
export default {
  eleventyComputed: {
    permalink: (data) => data.przek.od,
  },
};
