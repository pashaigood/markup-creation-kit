const path = require('path');
const Paths = require('./constants/Paths');
const WebpackMessages = require('webpack-messages');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

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
      quiet: true,
      overlay: true,
      compress: true
    },
    plugins: [
      new ProgressBarPlugin({
        format: chalk.green.bold('[:bar] '),
      }),
      new CaseSensitivePathsPlugin(),
      new WebpackMessages({
        name: 'client',
        logger: str => console.log(`>> ${str}`)
      })
    ]
  }
};