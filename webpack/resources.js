const Paths = require('./constants/Paths');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/',
                name: '[name].[ext]',
              },
            }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/',
              },
            }],
        },
      ],
    },
    plugins: [
      /*new FaviconsWebpackPlugin({
        prefix: 'images/logo/',
        persistentCache: true,
        logo: path.join(Paths.source, 'images', 'favicon.jpg'),
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }),*/
    ],
  };
};