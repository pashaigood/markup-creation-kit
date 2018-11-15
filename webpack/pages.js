const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./constants/Paths');
const HtmlEntry = require('./plugins/HtmlEntry');

module.exports = () => {
  const htmlLoader = {
    loader: 'html-loader',
    options: {
      interpolate: true,
      attrs: [
        ':src',
        ':href',
      ],
    },
  };

  return {
    entry: {
      index: [
        path.join(Paths.source, 'pages/index.html'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.html/,
          use: [
            // 'file-loader?name=[name].html',
            // 'extract-loader',
            htmlLoader,
          ],
        },
        {
          test: /\.pug$/,
          use: [
            htmlLoader,
            {
              loader: 'pug-html-loader',
              options: {
                basedir: Paths.source,
                pretty: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlEntry(),
      // new HtmlWebpackPlugin({
      //   template: Paths.source + '/pages/index.html',
      // }),
    ],
  };
};