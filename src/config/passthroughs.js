/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

module.exports = {
  images: function () {
    let config = { 'src/assets/images': 'assets/images' }

    return config;
  },

  fonts: function () {
    let config = { 'src/assets/fonts': 'assets/fonts' }

    return config;
  }
}
