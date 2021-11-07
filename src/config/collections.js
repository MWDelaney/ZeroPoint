/**
 * Add Eleventy collections here
*/

module.exports = {
  // posts: function (collection) {
  //     return collection.getFilteredByGlob("src/posts/*.md")
  // },

  pages: function (collection) {
    return collection.getFilteredByGlob("src/pages/*.md")
  }
}
