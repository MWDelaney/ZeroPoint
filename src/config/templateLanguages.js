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
      compile: function (inputContents, inputPath) {
        let parsed = path.parse(inputPath);
        if(parsed.name.startsWith("_")) {
          return;
        }

        return (data) => {
          // Include scss from anywhere in the project
          let includesPaths = [this.config.dir.includes];

          // Legacy function, but still supported
          let result = sass.renderSync({
            file: inputPath,
            includesPaths,
            data: inputContents,
            outputStyle: "compressed",
          });

          // Return the rendered CSS as a string
          return result.css.toString("utf8");
        };
      }
    }

    // Return the config to .eleventy.js
    return config;
  },


  /**
   * Compile and minify Javascript using Rollup
   */
  js: function () {
    // Require dependencies
    let path = require("path");
    let { rollup } = require("rollup");
    let { terser } = require("rollup-plugin-terser");
    let { nodeResolve } = require("@rollup/plugin-node-resolve");
    let commonjs = require("@rollup/plugin-commonjs");

    let config = {
      // Set the output file extension
      outputFileExtension: "js",

      // Compile should return a string
      compile: function (inputContents, inputPath) {
        // Currently we only support one entry point, `src/assets/scripts/main.js`
        // Skip other javascript files in the assets directories
        let parsed = path.parse(inputPath);
        if(parsed.name !== "main") {
          return;
        }

        // Create a rollup config
        let bundle = async () => {
          let bundle = await rollup({
            input: inputPath,
            plugins: [
              nodeResolve(),
              terser(),
              commonjs(),
            ],
          });

          // Generate a bundle
          let { output } = await bundle.generate({
            format: "cjs",
            name: "main",
            sourcemap: true,
          });

          // Return the bundle as a string
          return (data) => {
            return output[0].code;
          }
        };

        // Return the string to the Eleventy compiler
        return bundle();
      }
    }

    // Return the config to .eleventy.js
    return config;
  }
}
