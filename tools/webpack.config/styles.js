const Paths = require('./constants/Paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = env => {
  const publicPath = '../';

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: env === 'production'
    },
  };

  const minCssTextExtractPlugin = new ExtractTextPlugin({
    // allChunks: false,
    filename: 'styles/vendor.css',
    disable: false,
  });
  const cssTextExtractPlugin = new ExtractTextPlugin({
    publicPath: 'styles',
    filename: 'styles/index.css',
    disable: env !== 'production',
  });


  const postLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoPrefixer(),
        require('stylelint')({}),
        require('postcss-reporter')({
          clearReportedMessages: true
        })
      ],
      sourceMap: true
    },
  };

  return {
    module: {
      rules: [
        {
          test: /\.css$/i,
          oneOf: [
            {
              test: /\.min\./i,
              use: minCssTextExtractPlugin.extract({
                fallback: 'style-loader',
                publicPath,
                use: [{
                  loader: 'css-loader',
                  options: {
                  }
                }]
              })
            },
            {
              use: cssTextExtractPlugin.extract({
                fallback: 'style-loader',
                publicPath,
                use: [
                  cssLoader,
                  postLoader
                ],
              })
            }
          ],
          exclude: '/node_modules/'
        },
        {
          test: /\.sc|ass$/i,
          use: cssTextExtractPlugin.extract({
            publicPath,
            fallback: 'style-loader',
            use: [cssLoader, postLoader, {
              loader: "sass-loader",
              options: {
                includePaths: [Paths.source]
              }
            }]
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.styl$/i,
          use: cssTextExtractPlugin.extract({
            publicPath,
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'stylus-loader']
          }),
          // exclude: '/node_modules/'
        },
        {
          test: /\.less$/i,
          use: cssTextExtractPlugin.extract({
            publicPath,
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'less-loader']
          }),
          exclude: '/node_modules/'
        },
      ],
      // noParse: [/\.min\.css$/i]
    },
    plugins: [
      minCssTextExtractPlugin,
      cssTextExtractPlugin,
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin()
      ]
    }
  };
};
