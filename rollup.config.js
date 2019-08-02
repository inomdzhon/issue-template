// rollup plugins
const copy = require('rollup-plugin-copy');
const typescript = require('rollup-plugin-typescript2');

module.exports = {
  input: {
    background: 'src/index.ts',
    options: 'src/options.js',
  },
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].js',
    exports: 'named',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/manifest.json', dest: 'dist' },
        { src: 'src/options.html', dest: 'dist' },
      ],
    }),
    typescript(),
  ],
}
