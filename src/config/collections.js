/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

module.exports = {
  // /**
  // * Blog posts
  // */
  // posts: function (collection) {
  //  // Get all `.md` files in the `src/posts` directory
  //  let result = collection.getFilteredByGlob('./src/posts/*.md');
  //
  //  // Return the config to .eleventy.js
  //  return result;
  // },


  /**
   * Pages
   */
  pages: function (collection) {
    // Get all `.md` files in the `src/pages` directory
    let result = collection.getFilteredByGlob("src/pages/*.md");

    // Return the config to .eleventy.js
    return result;
  }
}
