const path = require('path');
const Paths = require('./constants/Paths');
const WebpackMessages = require('webpack-messages');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');

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
    stats: 'errors-only',
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
      compress: true,
    },
    performance: {
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
      },
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: env,//JSON.stringify(process.env.NODE_ENV),
        DEBUG: false,
      }),
      new ProgressBarPlugin({
        format: chalk.green.bold('[:bar] '),
      }),
      new CaseSensitivePathsPlugin(),
      new WebpackMessages({
        name: 'client',
        logger: str => console.log(`>> ${str}`),
      }),
    ],
    resolveLoader: {
      modules: [path.join(Paths.app, 'node_modules'), 'node_modules'],
    }
  };
};
