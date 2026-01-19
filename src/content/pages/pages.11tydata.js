/**
 * Eleventy data file for pages - handles dynamic permalink generation
 *
 * This file uses Eleventy's eleventyComputed feature to dynamically generate permalinks
 * for static pages based on their frontmatter data. The permalink function runs at build time
 * and determines the final URL structure for each page.
 *
 * @see https://www.11ty.dev/docs/data-computed/ - eleventyComputed documentation
 * @see https://www.11ty.dev/docs/permalinks/ - permalink documentation
 *
 * Conditional logic:
 * 1. Explicit permalink in frontmatter takes precedence
 * 2. Auto-generate from title using slugify filter: /{slug}/
 * 3. Pages without title or permalink are not published
 */
export default {
  eleventyComputed: {
    // Generate permalink URLs for pages
    permalink: function(data) {
      // If the page has an explicit permalink, use it
      if (data.permalink) return data.permalink;

      // If no permalink is provided, generate permalink from title using slugify filter
      if (data.title) {
        const slug = this.slugify(data.title);
        return `/${slug}/`;
      }

      // If neither permalink nor title is provided, this page is not published
      return false;
    },
  },
};
