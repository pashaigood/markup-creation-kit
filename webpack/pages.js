const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./constants/Paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
  return {
    entry: path.join(Paths.source, 'scripts/index.js'),
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: Paths.source + '/pages/index.pug',
        hash: true
      })
    ]
  };
};

/*

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

module.exports = () => {
  const pagesNames = walkSync('./src/pages');

  return {
    // entry: pagesNames.reduce((pages, pageName) => {
    //   pages[pageName] = path.join('src/pages/', pageName, 'index.js');
    //   return pages;
    // }, {}),
    plugins: pagesNames.map((pageName) => {
      return new HtmlWebpackPlugin({
        filename: pageName + '.html',
        template: path.join(Paths.pages, pageName + '.pug'),
      });
    }),
  };
};*/
