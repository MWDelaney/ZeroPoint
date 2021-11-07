  /**
   * Add Eleventy plugins here
  */

module.exports = {
  metagen: function (eleventyConfig) {
    /**
     * https://github.com/tannerdolby/eleventy-plugin-metagen
     */
    let plugin = require('eleventy-plugin-metagen');
    eleventyConfig.addPlugin(plugin);
  },

  svgContents: function(eleventyConfig) {
    /**
     * https://github.com/brob/eleventy-plugin-svg-contents
     */
    let plugin = require("eleventy-plugin-svg-contents");

    eleventyConfig.addPlugin(plugin);
  }
}
