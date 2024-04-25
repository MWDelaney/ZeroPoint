// .eleventy.js
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

module.exports = config => {
  config.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["src/assets/styles/styles.scss", "src/assets/scripts/main.js"],
      outdir: "public/assets",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
      plugins: [sassPlugin()]
    });
  });
};
