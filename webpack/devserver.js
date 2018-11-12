const Paths = require('./constants/Paths');

module.exports = () => {
  return {
    devServer: {
      overlay: true,
      contentBase: Paths.build,
      watchContentBase: true,
      publicPath: "/",
      stats: 'errors-only',
      port: 9000
    }
  }
}