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

  collapse: function (eleventyConfig) {
    // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
    eleventyConfig.addPairedShortcode("collapse", function(title, content) {
        return `
          <details>
            <summary>${title}</summary>
            ${content}
          </details>
        `;
      });
  }
}
