const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  };

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader],
          }),
          exclude: '/node_modules/',
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, 'sass-loader'],
          }),
          exclude: '/node_modules/',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'styles.css', disable: true })
    ]
  };
};