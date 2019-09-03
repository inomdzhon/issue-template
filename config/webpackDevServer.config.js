const { resolveApp } = require('./paths');

module.exports = {
  progress: true,
  compress: true,
  clientLogLevel: 'none',
  contentBase: resolveApp('dist'),
  watchContentBase: true,
  hot: true,
  publicPath: '/',
  quiet: true,
};
