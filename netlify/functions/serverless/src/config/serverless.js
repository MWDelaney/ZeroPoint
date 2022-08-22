/**
 * Add Eleventy Serverless here
 * https://www.11ty.dev/docs/serverless/
*/

module.exports = {
  /**
   * Eleventy Serverless Bundler Plugin
   * https://www.11ty.dev/docs/plugins/eleventy-serverless-bundler-plugin/
   */

   search: function (eleventyConfig) {
    const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
    const fs = require("fs");

    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
      name: "serverless",
      functionsDir: "./netlify/functions/",
      copy: [
        // files/directories that start with a dot
        // are not bundled by default
        // { from: ".cache", to: ".cache" }
      ]
    });


    /**
     * Eleventy Serverless doesn't have access to collections.
     * We'll take advantage of that to generate our search index on build, or return that index when this function is hit by Serverless.
     */
    eleventyConfig.addCollection("allPosts", async (collections) => {
      /**
       * If collections.getAll() has no length, this is serverless; return the search index file.
       */
      if(!collections.getAll().length) {
        const localPosts = require("../data/localposts.js"); // This file is generated when the build is run.

        // Bail and return the search index as data.
        return [...localPosts];
      }


      /**
       * If collections.getAll() has length, this is not serverless; use Eleventy to write the search index file.
       */
      if(collections.getAll().length) {
      const posts = await collections.getFilteredByGlob(["**/*.md", "**/*.njk"]).map((post) => {
        // Basic test to see if this is a post with a permalink.
        if (post.data.permalink != false && post.data.title != false) {
          // Return whatever makes sense. This is very basic post data.
          return {
            url: post.url,
            title: post.data.title,
            content: post.template.frontMatter?.content.trim(),
          }
        }
      });


      /** Write seach inded as local data for 11ty */
      fs.writeFileSync(
        "./src/data/localposts.js",
        `/* Do not modify directlyy */\n\nmodule.exports = ${JSON.stringify(posts.filter(post => post != null))};`
      );

      // Return the search index as data.
      return [...posts];
      }
    });

    eleventyConfig.addFilter("results", (posts, term) => {
      var results = posts.filter(({ title, url, content }) => {
        const regex = RegExp(term, "i");
        if (title && regex.test(title)) return true;
        if (url && regex.test(url)) return true;
        if (content && regex.test(content)) return true;
      });

      return results;
    });

    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  }
}
