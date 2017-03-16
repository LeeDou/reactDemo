var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015','react']
      }
    },
    ]
  }

}
