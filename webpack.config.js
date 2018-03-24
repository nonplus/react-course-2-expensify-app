const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const publicFolder = path.join(__dirname, 'public');
const distFolder = path.join(publicFolder, "dist");

module.exports = (env, argv) => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: './src/app.js',
    output: {
      path: distFolder,
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]            
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: publicFolder,      
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
