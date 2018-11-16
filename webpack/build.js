const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = () => {
  return {
    output: {
      publicPath: '',
    },
    plugins: [
      new ImageminPlugin()
    ]
  };
};
