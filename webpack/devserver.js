const Paths = require('./constants/Paths');

module.exports = () => {
  return {
    devServer: {
      overlay: true,
      hot: true,
      contentBase: Paths.build,
      publicPath: '/',
      stats: 'errors-only',
      port: 9000,
      before(app, server) {
        Reload.server = server
      }
    },
    plugins: [
      new Reload(),
    ],
  };
};

function Reload() {}
Reload.prototype.apply = reloadHtml;

function reloadHtml(compiler) {
  const cache = {};
  const plugin = { name: 'CustomHtmlReloadPlugin' };
  compiler.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName];
      const html = data.html.source();
      // plugin seems to emit on any unrelated change?
      if (orig && orig !== html) {
        Reload.server.sockWrite(Reload.server.sockets, 'content-changed');
      }
      cache[data.outputName] = html;
    });
  });
}