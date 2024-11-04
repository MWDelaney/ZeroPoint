/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

import metagenPlugin from 'eleventy-plugin-metagen';

export default {
  /**
   * Metagen plugin
   * https://github.com/tannerdolby/eleventy-plugin-metagen
   */
  metagen: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(metagenPlugin);
  },
}
