const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const configServer = require('../config/webpackDevServer.config');
const configDev = require('../config/webpack.config.dev');
const path = require('path');

var compiler = webpack(configDev);

var server = new WebpackDevServer(compiler, configServer);

server.listen(8080, err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  // openBrowser(urls.localUrlForBrowser);
});
