/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

module.exports = {
  // posts: function (collection) {
  //     return collection.getFilteredByGlob("src/posts/*.md")
  // },

  pages: function (collection) {
    let result = collection.getFilteredByGlob("src/pages/*.md");

    return result;
  }
}
