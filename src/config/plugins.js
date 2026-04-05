/**
 * Add plugins here
 * https://www.11ty.dev/docs/plugins/
*/

import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
// import reusableComponents from "zeropoint-components";

export default {
  /**
   * Eleventy Image plugin
   * https://www.11ty.dev/docs/plugins/image/
   */
  async image (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      outputDir: 'public/assets/images',
      urlPath: '/assets/images/',
      extensions: 'html',
      formats: ['auto'],

      // Attributes assigned on <img> override these values.
      defaultAttributes: {
        loading: 'lazy',
        decoding: 'async',
      },
    });
  },

  /**
   * ZeroPoint Components plugin
   * https://github.com/MWDelaney/zeropoint-components
   */
  // async reusableComponents (eleventyConfig) {
  //   // Add plugin to eleventyConfig
  //   eleventyConfig.addPlugin(reusableComponents, {
  //     componentsDir: "src/assets/components/*.njk"
  //   });

  //   // Register CSS and JS component bundles
  //   eleventyConfig.addBundle("componentCss", {
  //     toFileDirectory: "assets/styles/",
  //   });

  //   eleventyConfig.addBundle("componentJs", {
  //     toFileDirectory: "assets/scripts/",
  //   });
  // }
};
