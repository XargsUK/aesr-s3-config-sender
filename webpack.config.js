const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    options: './src/options.js',
    materialize: './node_modules/materialize-css/dist/js/materialize.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'js')
  }
};
