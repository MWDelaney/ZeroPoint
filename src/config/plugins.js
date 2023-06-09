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
  },


  /**
   * Render plugin
   */
  render: function (eleventyConfig) {
    let { EleventyRenderPlugin } = require("@11ty/eleventy");
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  },


  /**
   * WebC plugin
   */
  webc: function (eleventyConfig) {
    let plugin = require("@11ty/eleventy-plugin-webc");
    eleventyConfig.addPlugin(plugin, {
      components: "src/assets/views/components/**/*.webc",
    });
  },


  /**
   * Rollup plugin to bundle JavaScript
   * https://github.com/Snapstromegon/eleventy-plugin-rollup
   */
   rollup: function(eleventyConfig) {
    let plugin = require('eleventy-plugin-rollup');
    let { terser } = require("rollup-plugin-terser");
    let { nodeResolve } = require("@rollup/plugin-node-resolve");
    let replace = require("@rollup/plugin-replace");
    let commonjs = require("@rollup/plugin-commonjs");

    let config = {
      // Set a more descriptive shortcode
      shortcode: "script",
      // Configure the output
      rollupOptions: {
        output: {
          format: "esm",
          sourcemap: true,
          dir: 'public/assets/scripts'
        },

        // Configure the plugins
        plugins: [
          replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          }),
          nodeResolve(),
          terser(),
          commonjs(),
        ],
      }
    };

    // Add the plugin to the Eleventy config
    eleventyConfig.addPlugin(plugin, config)
  },
}
