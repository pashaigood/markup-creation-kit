const path = require('path');

module.exports = {
  root: process.cwd(),
  app: path.join(process.cwd(), 'tools'),
  source: path.join(process.cwd(), 'src'),
  build: path.join(process.cwd(), 'dist'),
};

module.exports.pages = path.join(module.exports.source, 'pages');
module.exports.fonts = path.join(module.exports.source, 'fonts');
