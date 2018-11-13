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
              loader: 'html-loader',
              options: {
                interpolate: true
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                interpolate: true
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: Paths.source + '/pages/index.html'
      })
    ]
  };
};