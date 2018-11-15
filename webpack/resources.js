const Paths = require('./constants/Paths');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env) => {
  const publicPath = env === 'production' ? '.' : '';
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
          options: {
            publicPath,
            outputPath: '/fonts/',
            name: '[name].[ext]'
          },
        },
        {
          test: /\.(eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath,
                outputPath: '/fonts/',
                name: '[name].[ext]'
              },
            }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader?limit=8192',
              options: {
                publicPath,
                name: '[name].[ext]',
                outputPath: '/images/'
              },
            }],
        },
      ],
    },
    plugins: [
      new FaviconsWebpackPlugin({
        prefix: 'images/logo/',
        persistentCache: true,
				emitStats: false,
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
