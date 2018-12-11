const {RawSource} = require('webpack-sources');

function replace(file, rules, assets) {
  let template = assets[file].source().toString();

  template = rules.reduce(
      (template, rule) => template.replace(
          rule.search,
          (typeof rule.replace === 'string' ? rule.replace : rule.replace.bind(global)),
      ),
      template,
  );

  assets[file] = new RawSource(template);
}

function ReplaceInFilePlugin({ root, rules = [] }) {
  this.options = rules.concat([
    {
      dir: root,
      test: /\.html$/,
      rules: [
        {
          search: /class=((?:[^"'][^>< /]+)|(?:"(?:.+?))")/g,
          replace: replaceHtml,
        },
      ],
    },
    {
      dir: root,
      test: /\.css/,
      rules: [
        {
          search: /([^'"{}]+?)\s*{/gm,
          replace: replaceCss,
        },
      ],
    },
  ]);
};

ReplaceInFilePlugin.prototype.apply = function(compiler) {
  const root = compiler.options.context;

  compiler.hooks.emit.tap('ReplaceInFilePlugin', compilation => {
    process(compilation);
  });

  // compilation.hooks.afterOptimizeAssets.tap('ReplaceInFilePlugin', );

  const process = (compilation) => {
    const assets = compilation.assets;
    const assetsFiles = Object.keys(assets);

    this.options.forEach(option => {

      if (option.files) {
        const files = option.files;
        if (Array.isArray(files) && files.length) {
          files.forEach(file => {
            compilation.assets[file] && replace(file, option.rules, assets);
          });
        }
      } else if (option.test) {
        const test = option.test;
        const testArray = Array.isArray(test) ? test : [test];
        const files = assetsFiles;

        files.forEach(file => {
          const match = testArray.some((test, index, array) => {
            return test.test(file);
          });

          if (!match) {
            return;
          }

          replace(file, option.rules, assets);
        });
      } else {
        const files = assetsFiles;
        files.forEach(file => {
          replace(file, option.rules, assets);
        });
      }
    });
  };
};

module.exports = ReplaceInFilePlugin;

const hash = require('sha256');

function replaceHtml(match, classes) {
  const fragments = classes.replace(/"/g, '').split(' ');

  const result = fragments.map(getHash).join(' ');
  return `class="${result}"`;
}

function replaceCss(match, selector) {
  return match.replace(
      selector, selector.replace(/\.([^,:.\s@>()]+)/gm, (match, className) => {
        return '.' + getHash(className);
      }),
  );
}

function getHash(string) {
  return '_' + hash(string).slice(0, 5);
}

