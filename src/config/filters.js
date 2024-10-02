/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
*/

module.exports = {
  // Markdown filter
  markdown: function (eleventyConfig) {
    let markdownIt = require("markdown-it");
    let options = {
      html: true,
      breaks: true,
      linkify: true
    };
    let markdownLib = markdownIt(options);
    eleventyConfig.addFilter("markdown", function (value) {
      return markdownLib.render(value);
    });
  }
}
