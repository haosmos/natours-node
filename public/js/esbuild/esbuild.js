const { nodeExternalsPlugin } = require('esbuild-node-externals');

require('esbuild')
    .build({
      entryPoints: [ './public/js/index.js' ],
      outfile: './public/js/bundle.js',
      format: 'esm',
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      platform: 'browser',
      
      plugins: [
        nodeExternalsPlugin({
          packagePath: './package.json',
          dependencies: false,
          devDependencies: true,
        })
      ],
      logLevel: 'info',
      target: 'node18',
    })
    .then(() => console.log('⚡ Done'))
    .catch(() => process.exit(1));
