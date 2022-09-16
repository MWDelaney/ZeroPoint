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
    const Image = require("@11ty/eleventy-img");
    const path = require("path");

    async function imageShortcode(src, alt = "", className = "", style = "", sizes = "") {
      let options = {
        widths: [null],
        formats: [null],
        urlPath: "/assets/images/",
        outputDir: path.join(eleventyConfig.dir.output, "assets", "images"),
        dryRun: (process.env.ELEVENTY_SERVERLESS) ? true : false,
      };

      let srcPlusPath = "./src/" + src;

      // generate images, while this is async we don’t wait
      Image(srcPlusPath, options);

      let imageAttributes = {
        class: className,
        style,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };
      // get metadata even the images are not fully generated
      // Prepend the src directory
      let metadata = Image.statsSync(srcPlusPath, options);
      return Image.generateHTML(metadata, imageAttributes);
    }

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  }
}
