const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./constants/Paths');

module.exports = () => {
  return {
    entry: path.join(Paths.source, 'scripts/index.js'),
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: Paths.source + '/pages/index.pug',
        hash: true
      })
    ]
  };
}