/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
*/

module.exports = {
  images: function () {
    return { 'src/assets/images': 'assets/images' }
  },

  fonts: function () {
    return { 'src/assets/fonts': 'assets/fonts' }
  }
}
