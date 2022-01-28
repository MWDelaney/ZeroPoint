# ZeroPoint

This site uses [Eleventy](https://www.11ty.dev), [GitHub](https://github.com), and [Netlify](https://netlify.com).

## Start creating your site

Create and edit your site **right from this readme file!**.

## Step 1: Creating and editing site pages and content

### Pages

Create your site's main content! Pages can be written in HTML or [Markdown](https://www.markdownguide.org/basic-syntax/)!

* [Edit the homepage](https://github.com/MWDelaney/zeropoint/edit/master/src/pages/index.md)
* [Create a new page](https://github.com/MWDelaney/zeropoint/new/master/?filename=/src/pages/&value=---%0Atitle%3A%20Enter%20page%20title%20here%0A---)

Or edit your entire site in a web-based editor by [clicking here](https://github.dev/MWDelaney/zeropoint/). Your changes will be automatically saved to this GitHub repository and published to your site.

<!--

---
#### Posts
Blog posts
* [Create a new post](https://github.com/MWDelaney/zeropoint/new/master/?filename=/src/posts/&value=----%0Atitle%3A%20%22Enter%20post%20title%22%0Adate%3A%20%222025-01-01%0A---)

-->

## Step 2: Look and Feel

### Navigation

Your site's navigation is how your users will get around! Edit the site's navigation menu in [JSON format](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)!

* [Edit the navigation](https://github.com/MWDelaney/zeropoint/edit/master/src/data/navigation.json)

### Styles

Colors, spacing, and fonts, oh my! You can edit your branding and styles here using CSS, SCSS, and CSS variables! Remember adding styles on MySpace? Same thing!

* [Edit your branding](https://github.com/MWDelaney/zeropoint/edit/master/src/assets/styles/_branding.scss)
* [Edit your overall styles](https://github.com/MWDelaney/zeropoint/edit/master/src/assets/styles/styles.scss)

Learning CSS can be daunting but there are a ton of useful resources on the web. Check out [SmolCSS](https://smolcss.dev) to get started!

### Javascript

**Optional!** Add javascript functionality to your site

* [Add Javascript](https://github.com/MWDelaney/zeropoint/edit/master/src/assets/scripts/main.js)

## Step 3: Deploy ZeroPoint

### [Launch ZeroPoint on Netlify for Free!](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)

---

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
│   │   └── views/
│   │       └── layouts/
│   │       └── partials/
│   ├── config/             # → Eleventy configuration
│   │   ├── collections.js  # → Add and configure collections (https://www.11ty.dev/docs/collections/)
│   │   ├── filters.js      # → Add and configure filters (https://www.11ty.dev/docs/filters/)
│   │   ├── passthroughs.js # → Add and configure passthroughs (https://www.11ty.dev/docs/copy/)
│   │   ├── plugins.js      # → Add and configure plugins (https://www.11ty.dev/docs/plugins/)
│   │   ├── shortcodes.js   # → Add and configure shortcodes (https://www.11ty.dev/docs/shortcodes/)
│   │   ├── templateLanguages.js   # → Configure custom template languages (HINT: this is where ZeroPoint's Sass and Javascript pipelines are set up!) (https://www.11ty.dev/docs/languages/custom/)
│   │   └── watchtargets.js # → Add and configure watch targets (https://www.11ty.dev/docs/watch-serve/)
│   ├── data                # → Customize site data (https://www.11ty.dev/docs/data/)
│   │   └── navigation.json # → Site navigation configuration
│   └── pages               # → Add "pages" collection items here
│       ├── index.md        # → Default index page
│       └── pages.json      # → Shared pages attributes
├── .eleventy.js            # → Core Eleventy config file
├── netlify.toml            # → Netlify deployment and plugin configuration (optional)
├── README.template.md      # → ZeroPoint readme
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
npm run start
```

## Build for production

```bash
npm run production
```
