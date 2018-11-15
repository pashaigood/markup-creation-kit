const webpack = require('webpack');

module.exports = () => {
  return {
    devServer: {
      hot: true,
      before(app, server) {
        Reload.server = server;
      },
    },
    plugins: [
      new Reload(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

function Reload() {}

Reload.prototype.apply = reloadHtml;

function reloadHtml(compiler) {
  const cache = {};
  const plugin = {
    name: 'CustomHtmlReloadPlugin',
  };

  compiler.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName];
      const html = data.html.source();

      if (orig && orig !== html) {
        Reload.server.sockWrite(Reload.server.sockets, 'content-changed');
      }

      cache[data.outputName] = html;
    });
  });
}
