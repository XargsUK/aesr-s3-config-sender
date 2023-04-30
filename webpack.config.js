const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.js',
    options: './src/options.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
