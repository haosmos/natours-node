require('esbuild')
    .build({
      entryPoints: [ './src/public/js/index.js' ],
      outfile: './dist/src/public/js/bundle.js',
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      platform: 'node',
      loader: { '.ts': 'ts' },
      logLevel: 'info',
      target: 'node16',
    })
    .then(() => console.log('⚡ Done'))
    .catch(() => process.exit(1))
