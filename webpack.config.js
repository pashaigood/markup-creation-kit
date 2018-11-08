const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./webpack/constants/Paths');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const styles = require('./webpack/styles');
const pages = require('./webpack/pages');

const common = merge([
  {
    resolve: {
      modules: [path.resolve(Paths.source), 'node_modules'],
      extensions: ['.pug', '.js', '.css', 'scss', '.json']
    },
    output: {
      path: Paths.build,
      filename: 'scripts/[name].js',
      publicPath: '/',
    }
  },
  pages(),
  styles()
]);

module.exports = (env, argv) => {
  const mode = { mode: env };
  if (env === 'production') {
    return merge([mode, common]);
  }

  if (env === 'development') {
    return merge(
        [
          mode,
          common,
          devserver(),
        ],
    );
  }
};
