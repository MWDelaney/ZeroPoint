/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

module.exports = {
  /**
   * https://github.com/tannerdolby/eleventy-plugin-metagen
   */
  metagen: function (eleventyConfig) {
    let plugin = require('eleventy-plugin-metagen');
    eleventyConfig.addPlugin(plugin);
  }
}
