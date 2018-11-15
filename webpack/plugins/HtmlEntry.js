class HtmlPlugin {
  constructor(options) {

  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin('this-compilation', (compilation) => {
      compilation.plugin('normal-module-loader', (loaderContext, module) => {
        // console.log(loaderContext, module)
      });

      compilation.plugin('optimize-tree', (chunks, modules, callback) => {
        chunks.forEach(chunk => {
          // Explore each module within the chunk (built inputs):
          for(const module of chunk.modulesIterable) {
            console.log(module.resource, 'resource')
            if (module.resource && module.resource.match(/index\.html/)) {
              console.log('html')
              // console.log(module)
              console.log(module._source);
              module._source._value = '// -----------'
            }
          }

          // chunk.forEachModule(function(module) {
          //   // Explore each source file path that was included into the module:
          //   // module.fileDependencies.forEach(function(filepath) {
          //   //   // we've learned a lot about the source structure now...
          //   //   console.log(filepath)
          //   // });
          // });

          // Explore each asset filename generated by the chunk:
          chunk.files.forEach(function(filename) {
            // Get the asset source for each file generated by the chunk:
            const source = compilation.assets[filename].source();
            console.log(source, 'src');
          });
        });

        callback();
      });
      compilation.plugin('additional-assets', (callback) => {

        callback();
      });
    });
  }
}

module.exports = HtmlPlugin;