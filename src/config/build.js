// .eleventy.js
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

export default async function(config) {
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
};
