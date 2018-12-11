const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const Paths = require('./constants/Paths');
const ReplaceInFileWebpackPlugin = require('./plugins/replace-in-file-webpack-plugin');

module.exports = () => {
  return {
    output: {
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              // progressive: false,
              qualitgy: 90
            },
            pngquant: {
              quality: '65-90',
              // speed: 4
            },
          },
          // Specify enforce: 'pre' to apply the loader
          // before url-loader/svg-url-loader
          // and not duplicate it in rules with them
          enforce: 'pre'
        }
      ]
    },
    plugins: [
      new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(Paths.source, '**/*.pug')),
      }),
      new ReplaceInFileWebpackPlugin({
        root: Paths.build
      }),
    ],
  };
};
