const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    options: './src/options.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'js')
  }
};
