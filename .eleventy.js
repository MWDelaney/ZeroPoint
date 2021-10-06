const passthroughs = require('./src/config/passthroughs');
const collections = require('./src/config/collections');
const filters = require('./src/config/filters');
const watchtargets = require('./src/config/watchtargets');
const plugins = require('./src/config/plugins');

module.exports = function (eleventyConfig) {

  // Get passthroughs from /src/config/passthroughs.js
  Object.keys(passthroughs).forEach((passthroughName) => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]())
  });

  // Create collections from /src/config/collections.js
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });

  // Create filers from /src/config/filters.js
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Watch these files for changes from /src/config/watchTargets.js
  Object.keys(watchtargets).forEach((watchtargetName) => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]())
  });

  // Add Eleventy plugins from /src/config/plugins.js
  Object.keys(plugins).forEach((pluginName) => {
    eleventyConfig.addPlugin(plugins[pluginName]())
  });

  // BrowserSync config
   eleventyConfig.setBrowserSyncConfig({
      open: true
    });

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
