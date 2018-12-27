require('../common/services/init');
const general = require('./general');
const devserver = require('./devserver');
const merge = require('webpack-merge');
const pages = require('./pages');
const styles = require('./styles');
const scripts = require('./scripts');
const resources = require('./resources');
const build = require('./build');

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
