const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./constants/Paths');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = (env) => {

  const pagesNames = walkSync(path.join(Paths.source, '/pages'));
  const pages = pagesNames.map((pageName) => {
    return new HtmlWebpackPlugin({
      filename: pageName.replace('pug', 'html'),
      template: path.join(Paths.source, 'pages/' + pageName),
    });
  });

  return {
    entry: {
      index: path.join(Paths.source, 'scripts/index.js'),
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      ...pages,
      new HtmlBeautifyPlugin(),
    ],
  };
};

function walkSync(dir, filelist) {
  let fs = require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });

  return filelist;
}
