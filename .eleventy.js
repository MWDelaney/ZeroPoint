/**
 * Wait! Before you edit this file!
 * This Eleventy-based project abstracts the traditional `.eleventy.js` file to help keep things clean and tidy.
 * Consider editing the following files instead:
 *  - `src/config/collections.js`
 *  - `src/config/filters.js`
 *  - `src/config/passthroughs.js`
 *  - `src/config/plugins.js`
 *  - `src/config/shortcodes.js`
 *  - `src/config/watchtargets.js`
 *  - `src/config/templateLanguages.js`
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
 * Filters are defined as named exports in /src/config/filters.js
 */
const filters = require('./src/config/filters');

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
 * Any additional requirements can be added here
 */
const fs = require("fs");
const chalk = require("chalk");

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

  Object.keys(collections).forEach((collectionName, index, collections) => {
    let len = Object.keys(collections).length - 1;
    let pre = (index === len ? "└── " : "├── ");
    console.log(
      chalk.white("│       " + pre) +
      chalk.green(collectionName)
    );

    eleventyConfig.addCollection(collectionName, collections[collectionName])
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
  console.log("\n");

  /**
   * Add filters from /src/config/filters.js
   */
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

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
   * End pretty console output
   */
  console.log("\n");
  console.groupEnd();


  /**
   * Configure browsersync
   */
  eleventyConfig.setBrowserSyncConfig({
    open: true,
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('public/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
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
