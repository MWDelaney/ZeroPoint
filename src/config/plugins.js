/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

module.exports = {
  /**
   * Metagen plugin
   * https://github.com/tannerdolby/eleventy-plugin-metagen
   */
  metagen: function (eleventyConfig) {
    // Require dependencies
    let plugin = require('eleventy-plugin-metagen');

    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(plugin);
  }
}
