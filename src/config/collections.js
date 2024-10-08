/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/
let _ = require("lodash");

module.exports = {
  /**
  * Blog posts
  */
  posts: function (eleventyConfig) {
  eleventyConfig.addCollection("posts", function(collectionApi) {
     return collectionApi.getFilteredByGlob("src/content/posts/*.md");
   });
  },


  /**
   * Blog posts, paginated and by tag
   */
  postsByTag: function (eleventyConfig) {
    eleventyConfig.addCollection("postsByTag", function(collection) {

      // Get unique list of all tags currently in use
      const tagSet = new Set(collection.getAllSorted().flatMap((post) => post.data.tags || []));

      // Get each item that matches the tag and add it to the tag's array, chunked by paginationSize
      let paginationSize = 2;
      let tagMap = [];
      let tagArray = [...tagSet];
      for(let tagName of tagArray) {

        let tagItems = collection.getFilteredByTag(tagName).reverse();
        let pagedItems = _.chunk(tagItems, paginationSize);
        for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
          tagMap.push({
            slug: tagName,
            totalPages: (max - 1),
            pageNumber: pageNumber,
            posts: pagedItems[pageNumber]
          });
        }
      }

      // Return a two-dimensional array of items, chunked by paginationSize
      return tagMap;
    });
  },


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
