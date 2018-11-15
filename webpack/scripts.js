const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: '/node_modules/'
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false // set to true if you want JS source maps
        })
      ]
    }
  };
};
