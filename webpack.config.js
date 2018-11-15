const devserver = require('./webpack/devserver');
const clean = require('./webpack/clean');
const merge = require('webpack-merge');
const path = require('path');
const pages = require('./webpack/pages');
const Paths = require('./webpack/constants/Paths');
const styles = require('./webpack/styles');
const scripts = require('./webpack/scripts');
const resources = require('./webpack/resources');

module.exports = (env) => {
  const common = merge([
    {
      mode: env,
    },
    {
      resolve: {
        modules: [path.resolve(Paths.source), 'node_modules'],
        extensions: ['.pug', '.js', '.css', '.scss', '.less', '.styl', '.json'],
      },
      output: {
        path: Paths.build,
        filename: 'scripts/[name].js',
        publicPath: '/',
      },
    },
    pages(),
    styles(env),
    scripts(env),
    resources(env),
  ]);

  if (env === 'production') {
    return merge([
      common,
      {
        output: {
          publicPath: './',
        },
      },
    ]);
  }

  if (env === 'development') {
    return merge(
        [
          common,
          devserver(),
        ],
    );
  }
};
