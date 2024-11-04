/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

export default {
  /**
   * Copy images to the `public` directory
   */
  images: async function () {
    let config = { 'src/assets/images': 'assets/images' }

    // Return the config to .eleventy.js
    return config;
  },


  /**
   * Copy fonts to the `public` directory
   */
  fonts: async function () {
    let config = { 'src/assets/fonts': 'assets/fonts' }

    // Return the config to .eleventy.js
    return config;
  }
}
