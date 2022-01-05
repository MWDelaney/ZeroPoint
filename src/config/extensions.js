/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/languages/custom/
*/

module.exports = {
  scss: function (eleventyConfig) {
    let path = require("node:path");
    let sass = require("sass");
    let config = {
      outputFileExtension: "css",
      compile: function (inputContent, inputPath) {
        let parsed = path.parse(inputPath);
        if(parsed.name.startsWith("_")) {
          return;
        }
        let result = sass.compileString(inputContent, {
          style: "compressed",
          loadPaths: [
            parsed.dir || "."          ]
        });

        return (data) => {
          return result.css;
        };
      }
    }

    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", config)
  }
}
