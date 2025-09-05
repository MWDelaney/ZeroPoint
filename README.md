# 🪐ZeroPoint Starter

👉 Get your website project up to zero.

<a href="https://github.com/MWDelaney/ZeroPoint/generate">
  <img src="https://img.shields.io/badge/use%20this-template-blueviolet?logo=github&style=for-the-badge">
</a>

---
**⭐ If you just used this template repository ⭐**

Prepare your repository for use by removing ZeroPoint branding and replacing it with your own project name and description.

<details>
<summary>1. Allow GitHub Actions to write to your repository</summary>

1. Click "Settings" in the top right corner of your repository
2. Click "Actions/General" in the left sidebar
3. Under "Workflow permissions" choose "Read and write permissions"
4. Click "Save"
</details>
<details>
<summary>2. Run the "Remove ZeroPoint branding" action</summary>

1. Click the "Actions" tab in the top navigation of your repository
2. Click the "Remove ZeroPoint branding" workflow
3. Click the "Run workflow" button, choose the `main` branch, and click the green "Run workflow" button
</details>


## What is ZeroPoint?
Read more at [https://getzeropoint.com](https://getzeropoint.com)!

A free, new-user-friendly static website generator  starter project designed to get you "up to zero" building your site, letting you focus on your HTML, CSS, and Javascript rather than setting up your build tools.

Create, edit, and publish your content to the web for free.

With first-class support for GitHub Pages and Netlify, ZeroPoint has everything you need to get started building your website, including:

* 🗺️ A simple, easy-to-understand project structure powered by [Eleventy](https://11ty.dev)
* ⚒️ Modern Sass and JavaScript compilation with [esbuild](https://esbuild.github.io/)
* 🖼️ Automatic image optimization and responsive images
* 📱 Progressive Web App (PWA) manifest generation
* 🔍 SEO-friendly meta tag generation
* 🚀 Optional automated deployment to GitHub Pages or Netlify
* 📦 ES Modules throughout for modern JavaScript development

With ZeroPoint you can build your website with the tools you know and love, and deploy it to the platform of your choice with ease.

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
├── content/                # → Site content
│   ├── pages/              # → Site pages (Markdown/HTML)
│   ├── posts/              # → Blog posts (disabled by default)
│   ├── 404.njk             # → 404 error page
│   ├── blog.njk            # → Blog listing page (disabled by default)
│   ├── manifest.njk        # → Web app manifest
│   ├── redirects.njk       # → Netlify redirects
│   ├── robots.njk          # → Robots.txt
│   └── xml_sitemap.njk     # → XML sitemap
├── src/                    # → Source directory
│   ├── assets/             # → Site assets
│   │   ├── fonts/          # → Web fonts
│   │   ├── images/         # → Images and graphics
│   │   ├── scripts/        # → JavaScript files
│   │   │   └── main.js     # → Main JavaScript bundle
│   │   ├── styles/         # → Stylesheets (SCSS)
│   │   │   └── styles.scss # → Main stylesheet
│   │   └── views/          # → Templates and layouts
│   │       ├── layouts/    # → Page layouts
│   │       │   └── base.njk # → Base HTML template
│   │       └── partials/   # → Reusable template parts
│   ├── config/             # → Eleventy configuration (ES modules)
│   │   ├── build.js        # → esbuild configuration for assets
│   │   ├── collections.js  # → Content collections
│   │   ├── filters.js      # → Template filters
│   │   ├── passthroughs.js # → File passthroughs
│   │   ├── plugins.js      # → Eleventy plugins
│   │   ├── shortcodes.js   # → Template shortcodes
│   │   ├── templateLanguages.js # → Custom template languages
│   │   ├── transforms.js   # → Content transforms
│   │   ├── watchtargets.js # → File watch targets
│   │   └── config.json     # → Config file settings
│   └── data/               # → Global data files
│       ├── env.js          # → Environment variables
│       └── navigation.json # → Site navigation structure
├── .eleventy.js            # → Core Eleventy config file
├── README.ZeroPoint.md     # → Template documentation
└── README.md               # → Project readme
```

## Eleventy Configuration

Eleventy configuration is abstracted from the typical `.eleventy.js` file and moved to `/src/config/` for easy organization and configuration of collections, filters, passthroughs, etc. The project uses modern ES modules (import/export) for better maintainability.

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
