function IsChange(handleChange) {
  this.handleChange = handleChange;
}

IsChange.prototype.apply = apply;

function apply(compiler) {
  const cache = {};
  const plugin = {
    name: 'HtmlWebpackPluginIsChange',
  };

  compiler.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName];
      const html = data.html.source();

      if (orig !== html) {
        this.handleChange({compiler, compilation, data, html});
        cache[data.outputName] = html;
      }
    });
  });
}

module.exports = IsChange;
