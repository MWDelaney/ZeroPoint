/**
 * Add Eleventy transforms here
 * https://www.11ty.dev/docs/transforms/
*/
import beautify from 'js-beautify';

export default {

  /**
   * Beautify HTML output
   */
  async beautify(eleventyConfig) {
    eleventyConfig.addTransform('beautify', async function (content) {
      const types = [
        '.html',
      ];

      if (this.page.outputPath) {
        for (const type of types) {
          if (this.page.outputPath.endsWith(type)) {
            return beautify.html(content, {
              indent_size: (process.env.ELEVENTY_ENV === 'production' ? 0 : 2),
              indent_char: ' ',
              max_preserve_newlines: 1,
              preserve_newlines: false,
              indent_inner_html: true,
              end_with_newline: true,
              wrap_line_length: 120,
              extra_liners: ['head', 'body', '/html'],
            });
          }
        }
      }

      return content;
    });
  },
};
