const webpack = require('webpack');
const Reload = require('./plugins/html-webpack-plugin-reload');
const HtmlValidatePlugin = require('./plugins/html-webpack-plugin-validate');

module.exports = () => {
  return {
    devServer: {
      hot: true,
      before(app, server) {
        Reload.server = server;
      },
    },
    plugins: [
      new Reload(),
      new HtmlValidatePlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

