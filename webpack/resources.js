const Paths = require('./constants/Paths');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env) => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            outputPath: 'fonts/',
            name: '[name].[ext]'
          },
        },
        {
          test: /\.(eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/',
                name: '[name].[ext]'
              },
            }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images/'
              },
            }],
        },
      ],
    },
    plugins: [
      new FaviconsWebpackPlugin({
        prefix: 'images/',
        // persistentCache: true,
				// emitStats: false,
				logo: path.join(Paths.source, 'images', 'favicon.png'),
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
      }),
    ],
  };
};
