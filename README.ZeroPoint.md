# ZeroPoint
This site uses [Eleventy](https://www.11ty.dev), [GitHub](https://github.com), and [Netlify](https://netlify.com).

# Start Right Now!
Create and edit your site **right from this readme file!**.

## Step 1: Content
<details>
  <summary>Click here to expand/collapse Step 1: Content</summary>

### Creating and editing site pages and content
#### Pages
Create your site's main content! Pages can be written in HTML or [Markdown](https://www.markdownguide.org/basic-syntax/)!
* [Edit the homepage](https://github.com/MWDelaney/ZeroPoint/edit/master/src/pages/index.njk)
* [Create a new page](https://github.com/MWDelaney/ZeroPoint/new/master/?filename=/src/pages/&value=---%0Atitle%3A%20Enter%20page%20title%20here%0A---)

<!--

---
#### Posts
Blog posts
* [Create a new post](https://github.com/MWDelaney/ZeroPoint/new/master/?filename=/src/posts/&value=----%0Atitle%3A%20%22Enter%20post%20title%22%0Adate%3A%20%222025-01-01%0A---)

-->

</details>

## Step 2: Look and Feel
<details>
  <summary>Click here to expand/collapse Step 2: Look and Feel</summary>

### Changing the look and feel
#### Navigation
Your site's navigation is how your users will get around! Edit the site's navigation menu in [JSON format](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)!
* [Edit the navigation](https://github.com/MWDelaney/ZeroPoint/edit/master/src/data/navigation.json)

#### Styles
Colors, spacing, and fonts, oh my! You can edit your branding and styles here using CSS, SCSS, and CSS variables! Remember adding styles on MySpace? Same thing!
* [Edit your branding](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/styles/_branding.scss)
* [Edit your overall styles](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/styles/styles.scss)

Learning CSS can be daunting but there are a ton of useful resources on the web. Check out [SmolCSS](https://smolcss.dev) to get started!

#### Javascript
**Optional!** Add javascript functionality to your site
* [Add Javascript](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/scripts/main.js)

</details>

## Step 3: Deploy ZeroPoint!
<details open>
  <summary>Click here to expand/collapse Step 3: Deploy!</summary>

### Launch your ZeroPoint on Netlify for Free!

Click here to launch your site on Netlify for free!

![Deploy this site to Netlify](https://www.netlify.com/img/deploy/button.svg)

</details>

---
# Get to Know ZeroPoint
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
│   ├── config/             # → Eleventy configuration
│   │   ├── collections.js  # → Add and configure collections (https://www.11ty.dev/docs/collections/)
│   │   ├── filters.js      # → Add and configure filters (https://www.11ty.dev/docs/filters/)
│   │   ├── passthroughs.js # → Add and configure passthroughs (https://www.11ty.dev/docs/copy/)
│   │   ├── plugins.js      # → Add and configure plugins (https://www.11ty.dev/docs/plugins/)
│   │   └── watchtargets.js # → Add and configure watch targets (https://www.11ty.dev/docs/watch-serve/)
│   ├── data                # → Customize site data (https://www.11ty.dev/docs/data/)
│   │   └── navigation.json # → Site navigation configuration
│   └── pages               # → Add "pages" collection items here
│       ├── index.md        # → Default index page
│       └── pages.json      # → Shared pages attributes
├── .eleventy.js            # → Core Eleventy config file
├── netlify.toml            # → Netlify deployment and plugin configuration (optional)
├── README.template               # → ZeroPoint readme (automatically removed when this template is used)
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
