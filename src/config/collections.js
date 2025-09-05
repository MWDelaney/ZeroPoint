/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

export default {
  /**
   * Pages
   */
  pages(eleventyConfig) {
    // Get all `.md` files in the `src/pages` directory
    eleventyConfig.addCollection('pages', (collectionApi) => {
      return collectionApi.getFilteredByGlob('src/content/pages/**/*.md');
    });
  },

  // /**
  // * Blog posts
  // */
  // posts: function (eleventyConfig) {
  // eleventyConfig.addCollection('posts', function(collectionApi) {
  //    return collectionApi.getFilteredByGlob('src/content/posts/*.md');
  //  });
  // },
};
