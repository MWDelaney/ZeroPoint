const passthroughs = require('./src/config/passthroughs');
const collections = require('./src/config/collections');
const filters = require('./src/config/filters');
const watchtargets = require('./src/config/watchtargets');
const plugins = require('./src/config/plugins');
const shortcodes = require('./src/config/shortcodes');

module.exports = function (eleventyConfig) {

  console.group("\n", "🪐 —");
  
  // Create collections from /src/config/collections.js
  console.group("📚 Collections (/src/config/collections.js)");
  Object.keys(collections).forEach((collectionName) => {
    console.log(" · " + collectionName);
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });
  console.groupEnd();
  console.log("\n");

  // Add Eleventy plugins from /src/config/plugins.js
  console.group("🔌 Plugins (/src/config/plugins.js)");
  Object.keys(plugins).forEach((pluginName) => {
    console.log(" · " + pluginName);
    plugins[pluginName](eleventyConfig);
  });
  console.groupEnd();

  // Add shortcodes from /src/config/shortcodes.js
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Create filers from /src/config/filters.js
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Get passthroughs from /src/config/passthroughs.js
  Object.keys(passthroughs).forEach((passthroughName) => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]())
  });

  // Watch these files for changes from /src/config/watchTargets.js
  Object.keys(watchtargets).forEach((watchtargetName) => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]())
  });
  
  console.log("\n");
  console.groupEnd();

  // BrowserSync config
  eleventyConfig.setBrowserSyncConfig({
    open: true
  });

  // Enable quiet mode
  eleventyConfig.setQuietMode(true);

  // Always return
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
