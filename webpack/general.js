const path = require('path');
const Paths = require('./constants/Paths');
const WebpackMessages = require('webpack-messages');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = (env) => {
  return {
    resolve: {
      modules: [path.resolve(Paths.source), 'node_modules'],
      extensions: ['.pug', '.js', '.css', '.scss', '.less', '.styl', '.json'],
    },
    output: {
      path: Paths.build,
      filename: 'scripts/[name].js',
      publicPath: '/',
    },
    stats: "errors-only",
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    devServer: {
      open: true,
      quiet: true,
      overlay: true,
      contentBase: Paths.build,
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new WebpackMessages({
        name: 'client',
        logger: str => console.log(`>> ${str}`)
      })
    ]
  }
};