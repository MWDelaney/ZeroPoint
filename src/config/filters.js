/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
*/

import markdownIt from "markdown-it";

export default {
  // Markdown filter
  markdown: async function (eleventyConfig) {
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
