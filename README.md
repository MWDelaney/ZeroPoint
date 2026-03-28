# 🪐ZeroPoint Website Starter Kit
![starter-logo](https://github.com/user-attachments/assets/86aa94e9-88a9-4902-a622-b74f8e4216ea)

👉 Get your website project up to zero.

<a href="https://github.com/MWDelaney/ZeroPoint/generate">
  <img src="https://img.shields.io/badge/use%20this-template-blueviolet?logo=github&style=for-the-badge" alt="Use this template">
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

## What You Get

* 🚀 **Deploy anywhere** - Ready for [GitHub Pages](https://pages.github.com/), [Netlify](https://netlify.com/), [Cloudflare Pages](https://pages.cloudflare.com/), or your own server
* 🔍 **Built-in search** - Full-text search with [Pagefind](https://pagefind.app/) already working at `/search/`
* 📝 **Blog-ready** - Complete blog system ready to enable when you need it
* 🖼️ **Image optimization** - Automatic image resizing and responsive images with [Eleventy Image](https://www.11ty.dev/docs/plugins/image/)
* 🎯 **SEO features** - Meta tags, XML sitemap, and robots.txt included
* ⚒️ **Modern tools** - Sass and JavaScript compilation with fast builds
* 🗺️ **Clean code** - Organized project structure with modern JavaScript
* 🎨 **Developer experience** - Live reload, code formatting, and intuitive configuration
* 🔧 **Easy to extend** - Add your own components, filters, and plugins

## Get started: Use This Template

Start your project with ZeroPoint by clicking the "Use this template" button below:

<a href="https://github.com/MWDelaney/ZeroPoint/generate">
  <img src="https://img.shields.io/badge/use%20this-template-blueviolet?logo=github&style=for-the-badge" alt="Use this template">
</a>

## Quick Start

Once you've created your repository from the template, get your local development environment running:

```bash
# Clone your new repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your site will be available at `http://localhost:8080` with live reload - any changes you make will automatically refresh the browser.

### What happens when you run `npm run dev`:
- Builds your Sass stylesheets and JavaScript
- Starts a dev server in watch mode  
- Launches a local web server with live reload
- Generates search index with Pagefind

### Ready to make changes?
- Edit content in the `content/` folder
- Customize styles in `src/assets/styles/`
- Add images to `src/assets/images/`
- Modify layouts and templates in `src/assets/views/`

## Deploy Your Site

Choose your preferred deployment platform:

<details open>
 <summary><strong>GitHub Pages</strong></summary>

### Deploy to GitHub Pages

Deploy your ZeroPoint site for **free** with GitHub Pages:

1. Push your code to a GitHub repository
2. Go to your repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The included `.github/workflows/deploy.yml` will automatically deploy your site

 </details>

<details>
 <summary><strong>Deploy to Netlify</strong></summary>

### Deploy to Netlify

Deploy ZeroPoint to [Netlify](https://netlify.com) for **free**!

1. Fork or create a new repository from this template
2. Connect your repository to Netlify or use the deploy button below:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MWDelaney/ZeroPoint/)

 </details>

<details>
 <summary><strong>Deploy to Cloudflare Pages</strong></summary>

### Deploy to Cloudflare Pages

Deploy ZeroPoint to [Cloudflare Pages](https://pages.cloudflare.com/) for global edge performance:

1. Fork or create a new repository from this template
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run production`
4. Set output directory: `public`

 </details>

## Optional Features

ZeroPoint includes additional features that are disabled by default. Enable them when you need them:

### 📝 Blog System

* Full blog functionality with templates and collections
* Enable by uncommenting the posts collection in `src/config/collections.js`
* Includes pagination, SEO, and individual post templates

### 🔍 Full-Text Search

* Client-side search powered by [Pagefind](https://pagefind.app/)
* Already working at `/search/` - no setup required
* Lightweight and fast

### 🧩 Component System

* Reusable components via [zeropoint-components](https://github.com/MWDelaney/zeropoint-components)
* Enable by uncommenting the plugin in `src/config/plugins.js`

*See the [CHANGELOG](CHANGELOG.md) for complete details on these features.*

## Project Structure

```text
example.com                 # → Root of your ZeroPoint project
├── content/                # → Site content
│   ├── pages/              # → Site pages (Markdown/HTML)
│   ├── posts/              # → Blog posts (disabled by default)
│   ├── 404.njk             # → 404 error page
│   ├── blog.njk            # → Blog listing page
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
├── public/                 # → Built site (generated)
├── .eleventy.js            # → BuildAwesome config file
├── README.ZeroPoint.md     # → Template documentation
└── README.md               # → Project readme
```
