/**
 * Add Eleventy template languages here
 * https://www.11ty.dev/docs/languages/custom/
*/

module.exports = {
  /**
   * Compile Sass/scss files to CSS using Sass
   */
  scss: function () {
    // Require dependencies
    let path = require("path");
    let sass = require("sass");

    let config = {
      // Set the output file extension
      outputFileExtension: "css",

      // Compile should return a string
      compile: function (contents, inputPath) {
        let parsed = path.parse(inputPath);
        if(parsed.name.startsWith("_")) {
          return;
        }
        let includesPaths = [this.config.dir.includes];
        return (data) => {
          let result = sass.renderSync({
            file: inputPath,
            includesPaths,
            data: contents,
            outputStyle: "compressed",
          });
          return result.css.toString("utf8");
        };
      }
    }

    // Return the config to .eleventy.js
    return config;
  }
}
