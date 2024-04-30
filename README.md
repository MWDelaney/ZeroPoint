# 🪐ZeroPoint

A free, new-user-friendly static website generator  starter project designed to get you "up to zero" building your site, letting you focus on your HTML, CSS, and Javascript rather than setting up your build tools.

With first-class support for GitHub Pages and Netlify, ZeroPoint has everything you need to get started building your website, including:

* 🗺️ A simple, easy-to-understand project structure powered by [Eleventy](https://11ty.dev)
* ⚒️ Sass and JavaScript compilation and minification
* 🚀 Optional automated deployment to GitHub Pages or Netlify

With ZeroPoint you can build your website with the tools you know and love, and deploy it to the platform of your choice with ease.

Read more at [https://getzeropoint.com](https://getzeropoint.com)!

## Get started: Use This Template

Get started with ZeroPoint one of the following ways:

✨ ZeroPoint will automatically remove its own branding and replace it with your own project name and description. See details [here](https://github.com/MWDelaney/ZeroPoint/blob/main/.github/workflows/zeropoint-template.yml).

<details>
 <summary><strong>Start with GitHub (recommended)</strong></summary>

### Start with GitHub

Start your project with ZeroPoint by clicking the "Use this template" button below:

<a href="https://github.com/MWDelaney/ZeroPoint/generate">
  <img src="https://img.shields.io/badge/use%20this-template-blueviolet?logo=github&style=for-the-badge">
</a>
 </details>

<details>
 <summary><strong>Start with Netlify</strong></summary>

### Start with Netlify

Create a copy of ZeroPoint and deploy it straight to [Netlify](https://netlify.com) for **free**!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MWDelaney/ZeroPoint/)

 </details>

<details>
 <summary><strong>Start with GitHub CLI (https://cli.github.com)</strong></summary>

### Start with GitHub CLI

Get started from your command line

 ```sh
  gh repo create example.com --template MWDelaney/ZeroPoint
 ```

</details>

## Get to Know ZeroPoint

Ready to go deeper? Here's how ZeroPoint is laid out:

```sh
example.com                 # → Root of your ZeroPoint-based project
├── src/                    # → Source directory
│   ├── assets/             # → Site assets
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── scripts/
│   │   ├── styles/
│   │   ├── views/
│   │   │   └── layouts/
│   │   │   └── partials/
│   │   └── assets.json     # → Shared attributes for files in the assets directory
│   ├── config/             # → Eleventy configuration
│   │   ├── build.js        # → Javascript and CSS build and bundler configuration 
│   │   ├── collections.js  # → Add and configure collections (https://www.11ty.dev/docs/collections/)
│   │   ├── filters.js      # → Add and configure filters (https://www.11ty.dev/docs/filters/)
│   │   ├── passthroughs.js # → Add and configure passthroughs (https://www.11ty.dev/docs/copy/)
│   │   ├── plugins.js      # → Add and configure plugins (https://www.11ty.dev/docs/plugins/)
│   │   ├── shortcodes.js   # → Add and configure shortcodes (https://www.11ty.dev/docs/shortcodes/)
│   │   ├── templateLanguages.js   # → Configure custom template languages (https://www.11ty.dev/docs/languages/custom/)
│   │   ├── watchtargets.js # → Add and configure watch targets (https://www.11ty.dev/docs/watch-serve/)
│   │   └── config.json     # → Shared attributes for files in the config directory
│   ├── content             # → A nice, organized, recommended place for all site content
│   │   └── pages           # → Add "pages" collection items here
│   └── data                # → Customize site data (https://www.11ty.dev/docs/data/)
│       ├── navigation.json # → Site navigation configuration
│       └── site.json       # → Site branding configuration
├── .eleventy.js            # → Core Eleventy config file
├── netlify.toml            # → Netlify deployment and plugin configuration (optional)
├── README.ZeroPoint.md      # → ZeroPoint readme
└── README.md               # → Your project's readme (automatically generated when this template is used)
```

## Eleventy Configuration

Eleventy configuration is abstracted from the typical `.eleventy.js` file and moved to `/src/config/` for easy organization and configuration of collections, filters, passthroughs, etc.

## Install project dependencies

```bash
npm i
```

## Run the project locally

```bash
npm run dev
```

## Build for staging

(The same as production except every page is flagged `noindex`)

```bash
npm run staging
```

## Build for production

```bash
npm run production
```
