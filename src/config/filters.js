/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
*/

import markdownIt from 'markdown-it';

export default {
  /**
   * Markdown filter
   * Converts Markdown content to HTML.
  */
  async markdown(eleventyConfig) {
    const options = {
      html: true,
      breaks: true,
      linkify: true,
    };
    const markdownLib = markdownIt(options);
    eleventyConfig.addFilter('markdown', (value) => {
      return markdownLib.render(value);
    });
  },
};
