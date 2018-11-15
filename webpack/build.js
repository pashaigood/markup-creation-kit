const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = () => {
  return {
    output: {
      publicPath: './',
    },
    plugins: [
      new ProgressBarPlugin({
        format: chalk.green.bold('[:bar] '),
      }),
    ],
  };
}
