const WebpackCleanPlugin = require('webpack-clean');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Paths = require('./constants/Paths');
const path = require('path');

// the path(s) that should be cleaned
let pathsToClean = [
  'dist',
  'build',
];

// the clean options to use
let cleanOptions = {
  root: '/full/webpack/root/path',
  exclude: ['shared.js'],
  verbose: true,
  dry: false,
};

module.exports = () => {
  return {
    plugins: [
      new WebpackCleanPlugin({
        on: 'emit',
        path: [Paths.build],
      }),
    ],
  };
};
