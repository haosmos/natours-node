const { nodeExternalsPlugin } = require('esbuild-node-externals');

require('esbuild')
    .build({
      entryPoints: [ './public/js/index.js' ],
      outfile: './public/js/bundle.js',
      format: 'esm',
      // banner: {
      //   js: 'import { createRequire as topLevelCreateRequire } from
      // \'module\';\n const require = topLevelCreateRequire(import.meta.url);'
      // },
      bundle: true,
      watch: {
        onRebuild(error, result) {
          if (error) {
            console.error('watch build failed:', error)
          } else {
            console.log('watch build succeeded:', result)
          }
        },
      },
      platform: 'browser',
      // loader: { '.ts': 'ts' },
      logLevel: 'info',
      target: 'node16',
      minify: true,
      plugins: [
        nodeExternalsPlugin({
          packagePath: './package.json',
          dependencies: false,
          devDependencies: true,
        })
      ],
    })
    .then(result => {
      console.log('watching...')
    })
    .catch(() => process.exit(1));
