// .eleventy.js
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { execSync } from 'child_process';

export default async function(config) {

  /**
   * Build Sass and JavaScript assets with esbuild
   */
  config.on('afterBuild', () => {
    return esbuild.build({
      entryPoints: ['src/assets/styles/styles.scss', 'src/assets/scripts/main.js'],
      outdir: 'public/assets',
      bundle: true,
      minify: false,
      sourcemap: false,
      plugins: [sassPlugin({
        quietDeps: true,
        loadPaths: ['node_modules'],
      })],
    });
  });

  /**
   * Run Pagefind to generate search index
   */
  config.on('eleventy.after', ({ dir, _results, _runMode, _outputMode }) => {
    const outputDir = dir.output;
    execSync(`./node_modules/.bin/pagefind --site ${outputDir} --output-path ${outputDir}/assets/search --glob "**/*.html"`, { encoding: 'utf-8' });
  });
};
