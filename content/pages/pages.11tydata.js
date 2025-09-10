/**
 * Eleventy data file for pages - handles permalink generation
 */
export default {
  eleventyComputed: {
    // Generate permalink URLs for pages
    permalink: (data) => {
      // If the page has an explicit permalink, use it
      if (data.permalink) return data.permalink;

      // If no permalink is provided, generate permalink from title using slugify filter
      if (data.title) {
        const slug = data.eleventy.env.filters.slugify(data.title);
        return `/${slug}/`;
      }

      // If neither permalink nor title is provided, this page is not published
      return false;
    },
  },
};
