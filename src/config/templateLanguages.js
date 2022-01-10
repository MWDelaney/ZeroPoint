/**
 * Add Eleventy template languages here
 * https://www.11ty.dev/docs/languages/custom/
*/

module.exports = {
  scss: function () {
    let path = require("path");
    let sass = require("sass");
    let config = {
      outputFileExtension: "css",
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

    return config;
  }
}
