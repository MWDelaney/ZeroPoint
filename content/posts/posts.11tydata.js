/**
 * Eleventy data file for posts - handles permalink generation
 */
export default {
  eleventyComputed: {
    // Generate permalink URLs for blog posts
    permalink: (data) => {

      // If the post date is in the future, do not publish
      if (data.date && new Date(data.date) > new Date()) {
        return false;
      }

      // If the post has an explicit permalink, use it
      if (data.permalink) return data.permalink;

      // If no permalink is provided, generate permalink from title using slugify filter
      if (data.title) {
        const slug = data.eleventy.env.filters.slugify(data.title);
        return `/blog/${slug}/`;
      }

      // If neither permalink nor title is provided, this post is not published
      return false;
    },
  },
};
