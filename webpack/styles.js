const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');

module.exports = env => {
  const extractCSS = new ExtractTextPlugin({
    filename: 'styles/index.css',
    disable: false//env !== 'production',
  });

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  };

  const postLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoPrefixer(),
      ],
      sourceMap: true,
    },
  };

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader],
          }),
          exclude: '/node_modules/',
        },
        {
          test: /\.scss$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'sass-loader'],
          }),
          exclude: '/node_modules/',
        },
        {
          test: /\.styl$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'stylus-loader'],
          }),
          exclude: '/node_modules/',
        },
        {
          test: /\.less$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'less-loader'],
          }),
          exclude: '/node_modules/',
        },
      ],
    },
    plugins: [
      extractCSS
    ],
  };
};