const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require('glob');

module.exports = {
  mode: 'production',
  entry: {
    options: './src/options.js',
    popup: './src/popup.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'js'),
    assetModuleFilename: 'fonts/[name][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }).concat(
        glob.sync(`${path.join(__dirname, '*.html')}`, { nodir: true })
      ),
      only: ['options', 'popup', 'background'], // Specify the keys from the entry object you want to purge
    }),
  ],
};