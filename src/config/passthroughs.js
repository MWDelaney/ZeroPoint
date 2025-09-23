/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

export default {
  /**
   * Copy fonts to the `public` directory
   */
  async fonts(eleventyConfig) {
    const config = { 'src/assets/fonts': 'assets/fonts' };

    eleventyConfig.addPassthroughCopy(config);
  },

  /**
   * Copy images to the `public` directory
   *
   * Note: Images directly associated with content should be saved
   * in the `content` directory alongside the content file where
   * HTML transforms will optimize them automatically.
   *
   * https://www.11ty.dev/docs/plugins/image/#html-transform
   */
  images: async function (eleventyConfig) {
    let config = { 'src/assets/images': 'assets/images' }

    eleventyConfig.addPassthroughCopy(config);
  }
};
