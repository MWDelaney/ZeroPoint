const passthroughs = require('./src/config/passthroughs');
const collections = require('./src/config/collections');
const filters = require('./src/config/filters');
const watchtargets = require('./src/config/watchtargets');
const plugins = require('./src/config/plugins');
const shortcodes = require('./src/config/shortcodes');
const fs = require("fs");

/**
 * Eleventy configuration
 * https://www.11ty.dev/docs/config/
 */
module.exports = function (eleventyConfig) {

  /**
   * Start pretty console output
   */
  console.group("\n", "🪐 —");

  /**
   * Echo the registered collections in the terminal
   * Create collections from /src/config/collections.js
   */
  console.group("📚 Collections (/src/config/collections.js)");
  Object.keys(collections).forEach((collectionName) => {
    console.log(" · " + collectionName);
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });
  console.groupEnd();
  console.log("\n");

  /**
   * Echo the registered collections in the terminal
   * Add Eleventy plugins from /src/config/plugins.js
   */
  console.group("🔌 Plugins (/src/config/plugins.js)");
  Object.keys(plugins).forEach((pluginName) => {
    console.log(" · " + pluginName);
    plugins[pluginName](eleventyConfig);
  });
  console.groupEnd();

  /**
   * Add shortcodes from /src/config/shortcodes.js
   */
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

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
