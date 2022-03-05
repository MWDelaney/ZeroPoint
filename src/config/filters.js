/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
*/

module.exports = {
  /**
   * Markdown filter configuration
   */
  markdown: function (value) {
    // Require dependencies
    let markdown = require('markdown-it')({
      html: true
    });

    // Get the result of the markdown parsing
    let result = markdown.render(value);

    // Return the config to .eleventy.js
    return result;
  }
}
