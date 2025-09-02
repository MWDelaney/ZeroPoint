/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

export default {
  /**
   * Copy fonts to the `public` directory
   */
  fonts: async function (eleventyConfig) {
    let config = { 'src/assets/fonts': 'assets/fonts' }

    eleventyConfig.addPassthroughCopy(config);
  }
}
