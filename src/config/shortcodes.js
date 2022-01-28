/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
*/

module.exports = {
  image: function (eleventyConfig) {
    const Image = require("@11ty/eleventy-img");

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
