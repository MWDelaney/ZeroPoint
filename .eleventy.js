const siteName = "ZeroPoint";

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
 *  - `src/config/transforms.js`
 */

/**
 * Passthroughs and file copies are defined as named exports in /src/config/passthroughs.js
 */
import passthroughs from './src/config/passthroughs.js';

/**
 * Collections are defined as named exports in /src/config/collections.js
 */
import collections from './src/config/collections.js';

/**
 * Watch targets are defined as named exports in /src/config/watchtargets.js
 */
import watchtargets from './src/config/watchtargets.js';

/**
 * Plugins are defined as named exports in /src/config/plugins.js
 */
import plugins from './src/config/plugins.js';

/**
 * Shortcodes are defined as named exports in /src/config/shortcodes.js
 */
import shortcodes from './src/config/shortcodes.js';

/**
 * Custom template languages are defined as named exports in /src/config/templateLanguages.js
 */
import templatelanguages from './src/config/templateLanguages.js';

/**
 * Filters are defined as named exports in /src/config/filters.js
 */
import filters from './src/config/filters.js';

/**
 * Import the bundler configuration from /src/config/build.js
 */
import build from './src/config/build.js';

/**
 * Import transforms from /src/config/transforms.js
 */
import transforms from './src/config/transforms.js';

/**
 * Any additional requirements can be added here
 */
import chalk from 'chalk';

/**
 * Eleventy configuration
 * https://www.11ty.dev/docs/config/
 */
export default function(eleventyConfig) {

  // An array of the tasks to be run, in order, with an icon and a pretty name for each
  // Put the tasks in the order you want them to run, and set echo to false if you don't want to log the task to the console
  let tasks = [
    {
      icon: "📚",
      name: "Collections",
      config: collections,
      echo: true,
    },
    {
      icon: "🔌",
      name: "Plugins",
      config: plugins,
      echo: true,
    },
    {
      icon: "⏩",
      name: "Shortcodes",
      config: shortcodes,
      echo: true,
    },
    {
      icon: "🎛️ ",
      name: "Filters",
      config: filters,
      echo: true,
    },
    {
      icon: "🚗",
      name: "Transforms",
      config: transforms,
      echo: true,
    },
    {
      icon: "📂",
      name: "Passthroughs",
      config: passthroughs,
      echo: false,
    },
    {
      icon: "📜",
      name: "Template Languages",
      config: templatelanguages,
      echo: false,
    },
    {
      icon: "👀",
      name: "Watch Targets",
      config: watchtargets,
      echo: false,
    }
  ];

  /**
   * Start pretty console output
   */
  console.group("\n", "   🪐", chalk.magenta(siteName));
  console.log(chalk.white("  │"));

  for (let task of tasks) {
    let tree = tasks.indexOf(task) === tasks.length - 1;

    // If the next tasks's echo is false, don't log the tree
    tree = (tasks[tasks.indexOf(task) + 1] && !tasks[tasks.indexOf(task) + 1].echo);

    if(task.echo) {
      console.group(
        chalk.white((tree)  ? "  └── " : "  ├── ") +
        chalk.yellow(task.icon) +
        chalk.yellow(" " + task.name) +
        chalk.gray(" (/src/config/" + task.name.toLowerCase().replace(/\s/g, '') + ".js)")
      );
    }

    Object.keys(task.config).forEach((taskName, index) => {
      let len = Object.keys(task.config).length - 1;
      let pre = (index === len ? "└── " : "├── ");

      let branch = tasks.indexOf(task) === tasks.length - 1;
      branch = (tasks[tasks.indexOf(task) + 1] && !tasks[tasks.indexOf(task) + 1].echo);
      if(task.echo) {
        console.log(
          chalk.white((branch) ? "       " : "│      ") + pre +
          chalk.green(taskName)
        );
      }

      // Run the task
      task.config[taskName](eleventyConfig);
    });

    if(task.echo) {
      if(!tree) {
        console.log(chalk.white("│"));
      }
      console.groupEnd();
    }
  }

  console.log("\n");
  console.groupEnd();
  /**
   * End pretty console output
   */


  /**
   * Add build configuration from /src/config/build.js
   */
  build(eleventyConfig);


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
}
