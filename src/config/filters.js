/**
 * Add Eleventy filters here
*/

module.exports = {
  markdown: function (value) {
    let markdown = require('markdown-it')({
      html: true
    });

    return markdown.render(value);
  }
}
