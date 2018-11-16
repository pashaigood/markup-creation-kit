const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.min\.js$/,
          use: 'imports-loader?exports=>undefined,define=>undefined,module=>undefined,this=>window',
          exclude: '/node_modules/'
        },
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: '/node_modules/'
        },
      ],
      noParse: [/\.min\.js$/i]
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
