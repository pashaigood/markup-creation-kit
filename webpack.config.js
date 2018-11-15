const general = require('./webpack/general')
const devserver = require('./webpack/devserver');
const merge = require('webpack-merge');
const pages = require('./webpack/pages');
const styles = require('./webpack/styles');
const scripts = require('./webpack/scripts');
const resources = require('./webpack/resources');
const build = require('./webpack/build');

module.exports = (env) => {
  const common = merge([
    {
      mode: env,
    },
    general(env),
    pages(),
    styles(env),
    scripts(env),
    resources(env),
  ]);

  if (env === 'production') {
    return merge([
      common,
      build(),
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
