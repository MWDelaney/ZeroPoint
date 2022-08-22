/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
*/

module.exports = {
  /**
   * Add date shortcode
   * By Stephanie Eckles
   * https://11ty.rocks/eleventyjs/dates/
   */
  year: function (eleventyConfig) {
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  },


  /**
   * Add image shortcode (requires image plugin)
   * https://www.11ty.dev/docs/plugins/image/
   */
  image: function (eleventyConfig) {
    // Require dependencies
    let Image = require("@11ty/eleventy-img");

    async function imageShortcode(src, alt, sizes) {
      let metadata = await Image(src, {
        widths: [300, 600],
        formats: ["webp", "jpg"],
        urlPath: "assets/images",
        outputDir: "./public/assets/images"
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      let htmlAttributes = {
        whitespaceMode: "inline"
      }

      // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes, htmlAttributes);
    }

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  }
}
