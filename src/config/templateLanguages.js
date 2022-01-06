/**
 * Add Eleventy template languages here
 * https://www.11ty.dev/docs/languages/custom/
*/

module.exports = {
  scss: function (eleventyConfig) {
    let sass = require("sass");
    let config = {
      outputFileExtension: "css",
      compile: function (contents, inputPath) {
        let includesPaths = [this.config.dir.includes];
        return (data) => {
          let result = sass.renderSync({
            file: inputPath,
            includesPaths,
            data: contents,
          });
          return result.css.toString("utf8");
        };
      }
    }

    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", config)
  },

  js: function(eleventyConfig) {
    let terser = require("terser");
    let config = {
      outputFileExtension: "js",
      compile: function (contents, inputPath) {
        return async (data) => {
          let result = await terser.minify(contents);
          return result.code;
        };
      }
    }

    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", config)
  }
}
