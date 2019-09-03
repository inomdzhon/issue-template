// paths
const { resolveApp } = require('./paths');

// configs
const pkg = require('../package.json');

// constants
const ENV = process.env.NODE_ENV || 'development';

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    background: resolveApp('src/entries/background/index.ts'),
    options: resolveApp('src/entries/options/index.ts'),
  },
  output: {
    pathinfo: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'cache-loader',
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /\.module.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            localIdentName: '[hash:base64:5]\[[name-local]\]',
          },
        }
      }],
    }, {
      test: /\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
      }],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: resolveApp('src/manifest.json'),
      transform: function (content, path) {
        const parsedContent = JSON.parse(content.toString());
        return Buffer.from(JSON.stringify({
          ...parsedContent,
          name: 'Issue Template',
          version: pkg.version,
          description: pkg.description,
          background: {
            scripts: ['background.js'],
          },
        }, null, 2))
      }
    }]),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['options'],
      template: resolveApp('src/entries/options/index.html'),
      chunksSortMode: 'none',
      filename: 'options.html',
    }),
  ],
};
