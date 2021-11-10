/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
*/

module.exports = {
  markdown: function (value) {
    let markdown = require('markdown-it')({
      html: true
    });

    return markdown.render(value);
  }
}
