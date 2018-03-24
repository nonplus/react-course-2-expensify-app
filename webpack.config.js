const path = require('path');

const publicFolder = path.join(__dirname, 'public');

module.exports = {
  entry: './src/app.js',
  output: {
    path: publicFolder,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: publicFolder,
    historyApiFallback: true
  }
};