/**
 * Eleventy data file for posts - handles dynamic permalink generation
 *
 * This file uses Eleventy's eleventyComputed feature to dynamically generate permalinks
 * for blog posts based on their frontmatter data. The permalink function runs at build time
 * and determines the final URL structure for each post.
 *
 * @see https://www.11ty.dev/docs/data-computed/ - eleventyComputed documentation
 * @see https://www.11ty.dev/docs/permalinks/ - permalink documentation
 *
 * Conditional logic:
 * 1. Future posts (date > today) are not published (returns false)
 * 2. Explicit permalink in frontmatter takes precedence
 * 3. Auto-generate from title using slugify filter: /blog/{slug}/
 * 4. Posts without title or permalink are not published
 */
export default {
  eleventyComputed: {
    // Generate permalink URLs for blog posts
    permalink: function(data) {

      // If the post date is in the future, do not publish
      if (data.date && new Date(data.date) > new Date()) {
        return false;
      }

      // If the post has an explicit permalink, use it
      if (data.permalink) return data.permalink;

      // If no permalink is provided, generate permalink from title using slugify filter
      if (data.title) {
        const slug = this.slugify(data.title);
        return `/blog/${slug}/`;
      }

      // If neither permalink nor title is provided, this post is not published
      return false;
    },
  },
};
