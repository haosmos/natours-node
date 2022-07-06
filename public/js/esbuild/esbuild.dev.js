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
      watch: true,
      platform: 'browser',
      // loader: { '.ts': 'ts' },
      logLevel: 'info',
      target: 'node16',
    })
    .then(() => console.info('⚡ Done'))
    .catch(() => process.exit(1))
