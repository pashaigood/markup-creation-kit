const path = require('path');
const Paths = require('./webpack/constants/Paths');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const styles = require('./webpack/styles');
const pages = require('./webpack/pages');
const resources = require('./webpack/resources');



module.exports = (env) => {
  const common = merge([
    { mode: env },
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
    resources(),
  ]);

  if (env === 'production') {
    return merge([common]);
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
