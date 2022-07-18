/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

module.exports = {
  // /**
  // * Blog posts
  // */
  // posts: function (eleventyConfig) {
  // eleventyConfig.addCollection("posts", function(collectionApi) {
  //    return collectionApi.getFilteredByGlob("src/content/posts/*.md");
  //  });
  // },


  /**
   * Pages
   */
  pages: function (eleventyConfig) {
    // Get all `.md` files in the `src/pages` directory
    eleventyConfig.addCollection("pages", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/content/pages/*.njk");
    });
  }
}
