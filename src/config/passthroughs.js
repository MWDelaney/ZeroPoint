/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

module.exports = {
  /**
   * Copy images to the `public` directory
   */
  images: function () {
    let config = { 'src/assets/images': 'assets/images' }

    // Return the config to .eleventy.js
    return config;
  },


  /**
   * Copy fonts to the `public` directory
   */
  fonts: function () {
    let config = { 'src/assets/fonts': 'assets/fonts' }

    // Return the config to .eleventy.js
    return config;
  }
}
