/**
 * Add Eleventy watch targets here
 * https://www.11ty.dev/docs/watch-serve/
*/

module.exports = {
  /**
   * Watch for changes to files in the assets directory
   */
  assets: function () {
    let config = "./src/assets";

    // Return the config to .eleventy.js
    return config;
  }
}
