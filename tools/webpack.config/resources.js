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
            context: Paths.fonts,
            limit: 8192,
            mimetype: 'application/font-woff',
            outputPath: 'fonts/',
            name: '[path][name].[ext]'
          },
        },
        {
          test: /\.(eot|ttf|otf|)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: Paths.fonts,
                outputPath: 'fonts/',
                name: '[path][name].[ext]'
              },
            }],
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /inline/,
              loader: 'svg-inline-loader'
            },
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images/'
              },
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          // exclude: path.resolve(Paths.source, 'fonts') ,
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
