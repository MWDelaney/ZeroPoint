# ZeroPoint
This site uses [Eleventy](https://www.11ty.dev), [GitHub](https://github.com), and [Netlify](https://netlify.com).

# Start Right Now!
Gets started **right from this readme file!**.

## Step 1: Content
### Pages
Create your site's main content! Pages can be written in HTML or [Markdown](https://www.markdownguide.org/basic-syntax/)!
* [Edit the homepage](https://github.com/MWDelaney/ZeroPoint/edit/master/src/pages/index.njk)
* [Create a new page](https://github.com/MWDelaney/ZeroPoint/new/master/?filename=/src/pages/&value=---%0Atitle%3A%20Enter%20page%20title%20here%0A---)

<!--

---
### Posts
Blog posts
* [Create a new post](https://github.com/MWDelaney/ZeroPoint/new/master/?filename=/src/posts/&value=----%0Atitle%3A%20%22Enter%20post%20title%22%0Adate%3A%20%222025-01-01%0A---)

-->
---
## Step 2: Look and Feel
### Navigation
Getting there from here
* [Edit the navigation](https://github.com/MWDelaney/ZeroPoint/edit/master/src/data/navigation.json)

### Styles
Colors, spacing, and fonts, oh my!
* [Edit your branding](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/styles/_branding.scss)
* [Edit your overall styles](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/styles/styles.scss)

### Javascript
**Optional!** Add javascript functionality to your site
* [Add Javascript](https://github.com/MWDelaney/ZeroPoint/edit/master/src/assets/scripts/main.js)

---
## Step 3: Deploy!
Launch your new ZeroPoint powered site to Netlify for free by clicking here:

![Deploy this site to Netlify](https://www.netlify.com/img/deploy/button.svg)

---
# Get to Know ZeroPont
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
