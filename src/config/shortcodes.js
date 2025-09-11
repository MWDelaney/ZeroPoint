/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
*/

export default {
  /**
   * Add year shortcode
   * By Stephanie Eckles
   * https://11ty.rocks/eleventyjs/dates/
   */
  async year(eleventyConfig) {
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  },
};
