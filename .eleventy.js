/**
 * Wait! Before you edit this file!
 * This Eleventy-based project abstracts the traditional `.eleventy.js` file to help keep things clean and tidy.
 * Consider editing the following files instead:
 *  - `src/config/collections.js`
 *  - `src/config/passthroughs.js`
 *  - `src/config/plugins.js`
 *  - `src/config/shortcodes.js`
 *  - `src/config/watchtargets.js`
 *  - `src/config/templateLanguages.js`
 *  - `src/config/filters.js`
 */

/**
 * Passthroughs and file copies are defined as named exports in /src/config/passthroughs.js
 */
const passthroughs = require('./src/config/passthroughs');

/**
 * Collections are defined as named exports in /src/config/collections.js
 */
const collections = require('./src/config/collections');

/**
 * Watch targets are defined as named exports in /src/config/watchtargets.js
 */
const watchtargets = require('./src/config/watchtargets');

/**
 * Plugins are defined as named exports in /src/config/plugins.js
 */
const plugins = require('./src/config/plugins');

/**
 * Shortcodes are defined as named exports in /src/config/shortcodes.js
 */
const shortcodes = require('./src/config/shortcodes');

/**
 * Custom template languages are defined as named exports in /src/config/templateLanguages.js
 */
const templateLanguages = require('./src/config/templateLanguages');

/**
 * Filters are defined as named exports in /src/config/filters.js
 */
const filters = require('./src/config/filters');

/**
 * Any additional requirements can be added here
 */
const fs = require("fs");
const chalk = require("chalk");
const htmlmin = require("html-minifier");

/**
 * Eleventy configuration
 * https://www.11ty.dev/docs/config/
 */
module.exports = function (eleventyConfig) {

  /**
   * Start pretty console output
   */
  console.group("\n", "   🪐");
  console.log(chalk.white("  |"));

  /**
   * Echo the registered collections in the terminal
   * Create collections from /src/config/collections.js
   */
  console.group(
    chalk.white("  ├── ") +
    chalk.yellow("📚 Collections ") +
    chalk.gray("(/src/config/collections.js)")
  );

  Object.keys(collections).forEach((collectionName, index) => {
    let len = Object.keys(collections).length - 1;
    let pre = (index === len ? "└── " : "├── ");
    console.log(
      chalk.white("│       " + pre) +
      chalk.green(collectionName)
    );

    collections[collectionName](eleventyConfig);
  });

  console.groupEnd();
  console.log(chalk.white("  |"));

  /**
   * Echo the registered collections in the terminal
   * Add Eleventy plugins from /src/config/plugins.js
   */
  console.group(
    chalk.white("  ├── ") +
    chalk.yellow("🔌 Plugins ") +
    chalk.gray("(/src/config/plugins.js)")
  );

  Object.keys(plugins).forEach((pluginName, index) => {
    let len = Object.keys(plugins).length - 1;
    let pre = (index == len ? "└── " : "├── ");
    console.log(
      chalk.white("│       " + pre) +
      chalk.green(pluginName)
    );

    plugins[pluginName](eleventyConfig);
  });

  console.groupEnd();
  console.log(chalk.white("  |"));
  /**
   * Echo the registered shortcodes in the terminal
   * Add shortcodes from /src/config/shortcodes.js
   */
  console.group(
    chalk.white("  └── ") +
    chalk.yellow("⏩ Shortcodes ") +
    chalk.gray("(/src/config/shortcodes.js)")
  );

  Object.keys(shortcodes).forEach((shortcodeName, index) => {
    let len = Object.keys(shortcodes).length - 1;
    let pre = (index === len ? "└── " : "├── ");
    console.log(
      chalk.white("        " + pre) +
      chalk.green(shortcodeName)
    );

    shortcodes[shortcodeName](eleventyConfig);
  });

  console.groupEnd();

  /**
   * Add passthrough copy from /src/config/passthroughs.js
   */
  Object.keys(passthroughs).forEach((passthroughName) => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]())
  });

  /**
   * Add watch targets from /src/config/watchtargets.js
   */
  Object.keys(watchtargets).forEach((watchtargetName) => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]())
  });

  /**
  * Add template languages from /src/config/templateLanguages.js
  */
  Object.keys(templateLanguages).forEach((templateLanguageName) => {
    eleventyConfig.addTemplateFormats(templateLanguageName);
    eleventyConfig.addExtension(templateLanguageName, templateLanguages[templateLanguageName]())
  });

  /**
  * Add filters from /src/config/filters.js
  */
  Object.keys(filters).forEach((filterName) => {
    filters[filterName](eleventyConfig);
  });

  /**
   * End pretty console output
   */
  console.log("\n");
  console.groupEnd();

  /**
   * Minify HTML output
   */
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  /**
   * Minify XML output
   */
  eleventyConfig.addTransform("xmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (this.outputPath && this.outputPath.endsWith(".xml")) {
      let minified = htmlmin.minify(content, {
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });


  /**
  * Configure dev server
  * https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server
  */
  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  /**
   * Enable quiet mode
   */
  eleventyConfig.setQuietMode(true);


  /**
   * Return the config to Eleventy
   */
  return {
    dir: {
      input: "src",
      output: "public",
      includes: 'assets/views',
      layouts: 'assets/views/layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md', '11ty.js'],
  };
};
