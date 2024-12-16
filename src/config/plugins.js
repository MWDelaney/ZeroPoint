/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

import metagenPlugin from 'eleventy-plugin-metagen';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default {
  /**
   * Metagen plugin
   * https://github.com/tannerdolby/eleventy-plugin-metagen
   */
  metagen: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(metagenPlugin);
  },

  /**
   * Eleventy Image plugin
   * https://www.11ty.dev/docs/plugins/image/
   */
  image: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      outputDir: "./public/assets/images",
      urlPath: "/assets/images/",
      extensions: "html",
      formats: ["auto"],

      // Attributes assigned on <img> override these values.
      defaultAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    });
  }
}
