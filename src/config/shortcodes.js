/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
*/

import Image from "@11ty/eleventy-img";

export default {
  /**
   * Add date shortcode
   * By Stephanie Eckles
   * https://11ty.rocks/eleventyjs/dates/
   */
  year: async function (eleventyConfig) {
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  },

  /**
   * Add image shortcode (requires image plugin)
   * https://www.11ty.dev/docs/plugins/image/
   */
  image: async function (eleventyConfig) {
    async function imageShortcode(src, alt = "", className = "", style = "", sizes = "") {
      let options = {
        widths: [null],
        formats: [null],
        urlPath: "/assets/images/",
        outputDir: "./public/assets/images/"
      };

      // Prepend the src directory
      let srcPlusPath = "./src/" + src;

      // generate images, while this is async we don’t wait
      await Image(srcPlusPath, options);

      let imageAttributes = {
        class: className,
        style,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };
      // get metadata even the images are not fully generated
      let metadata = Image.statsSync(srcPlusPath, options);
      return Image.generateHTML(metadata, imageAttributes);
    }

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  }
}
