const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: true
    },
  };

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
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              cssLoader,
              postLoader
            ],
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'sass-loader']
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'stylus-loader']
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'less-loader']
          }),
          exclude: '/node_modules/'
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'styles/index.css',
        disable: env !== 'production'
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin()
      ]
    }
  };
};
