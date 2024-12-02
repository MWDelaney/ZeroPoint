/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
*/

export default {
  /**
   * Add date shortcode
   * By Stephanie Eckles
   * https://11ty.rocks/eleventyjs/dates/
   */
  year: async function (eleventyConfig) {
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  }
}
