/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

export default {
  /**
   * All Pages (includes all languages)
   */
  pages(eleventyConfig) {
    eleventyConfig.addCollection('pages', (collectionApi) => {
      return collectionApi.getFilteredByGlob(['content/pages/**/*.md', 'content/*/pages/**/*.md']);
    });
  },

  /**
   * All Posts (includes all languages)
   */
  // posts(eleventyConfig) {
  //   eleventyConfig.addCollection('posts', (collectionApi) => {
  //     return collectionApi.getFilteredByGlob(['content/posts/**/*.md', 'content/*/posts/**/*.md']);
  //   });
  // },

  // /**
  //  * English-only Pages
  //  * A collection of just English pages
  //  */
  // pagesEn(eleventyConfig) {
  //   eleventyConfig.addCollection('pagesEn', (collectionApi) => {
  //     return collectionApi.getFilteredByGlob('content/pages/**/*.md');
  //   });
  // },
};
